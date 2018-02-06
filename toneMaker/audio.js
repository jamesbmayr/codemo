window.addEventListener("load", function() {
	/*** globals ***/
		window.instrument = {}
		audio = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext)()
		master = audio.createGain()
		master.connect(audio.destination)
		master.gain.setValueAtTime(1, audio.currentTime)
	
	/*** buildInstrument ***/
		function buildInstrument(parameters) {
			// parameters & nodes
				var i = {
					parameters: {
						voices: [0]
					},
					power: audio.createGain(),
					volume: audio.createGain(),
					effects: {},
					envelopes: {},
					tones: {}
				}

				i.power.connect(master)
				i.volume.connect(i.power)

			/* setParameters */
				i.setParameters = function(parameters) {
					var now = audio.currentTime

					for (var p in parameters) {
						switch (p) {
							// meta
								case "name":
									i.parameters.name = parameters.name
								break

								case "power":
									parameters.power = Math.floor(parameters.power || 0)
									i.power.gain.setValueAtTime(parameters.power, now)
								break

								case "volume":
									parameters.volume = Math.max(0, Math.min(1, parameters.volume ))
									i.volume.gain.setValueAtTime(parameters.volume, now)
								break

							// polysynth
								case "polysynth":
									var tone = Math.max(-12, Math.min(12, Object.keys(parameters.polysynth)[0]))
									if (parameters.polysynth[tone]) {
										if (!i.parameters.voices.includes(tone)) {
											i.parameters.voices.push(tone)
										}
									}
									else {
										if (i.parameters.voices.includes(tone)) {
											i.parameters.voices = i.parameters.voices.filter(function (t) {
												return t !== tone
											})
										}
									}
								break

							// oscillator
								case "wave":
									i.parameters.imag = new Float32Array(parameters.wave || 4096)
									i.parameters.real = new Float32Array(i.parameters.imag.length)
									i.parameters.wave = audio.createPeriodicWave(i.parameters.real, i.parameters.imag)
								break

								case "harmonic":
									var harmonic = Object.keys(parameters.harmonic)[0]
									i.parameters.imag[harmonic] = Math.max(0, Math.min(1, parameters.harmonic[harmonic]))
									i.parameters.wave   = audio.createPeriodicWave(i.parameters.real, i.parameters.imag)
								break

								case "envelope":
									i.parameters.attack  = Math.max(0, Math.min(1, parameters.envelope.attack ))
									i.parameters.decay   = Math.max(0, Math.min(1, parameters.envelope.decay  ))
									i.parameters.sustain = Math.max(0, Math.min(1, parameters.envelope.sustain))
									i.parameters.release = Math.max(0, Math.min(1, parameters.envelope.release))
								break

							// effects
								case "echo":
									i.parameters.delay    = Math.max(0, Math.min(1, parameters.echo.delay    ))
									i.parameters.feedback = Math.max(0, Math.min(1, parameters.echo.feedback ))

									if (!i.effects.echo || !i.effects.feedback) {
										i.effects.echo = audio.createDelay()
										i.effects.feedback = audio.createGain()
										
										i.effects.echo.connect(i.effects.feedback)
										i.effects.feedback.connect(i.effects.echo)
										i.effects.feedback.connect(i.volume)
									}

									if (i.parameters.delay && i.parameters.feedback) {
										i.effects.echo.delayTime.setValueAtTime(i.parameters.delay, now)	
										i.effects.feedback.gain.setValueAtTime(i.parameters.feedback, now)
									}
									else {
										i.effects.feedback.gain.cancelScheduledValues(now)
									}
								break
						}
					}
				}
				
			// effects ?
				// filter
				// i.filter = audio.createBiquadFilter()
				// i.setFilter = function(filter) {
				// 	i.filter.connect(i.volume)
				// 	if (parameters.echo) { i.filter.connect(i.echo) }

				// 	var cutoff = Math.max(16.35, Math.min(8869.84, filter.cutoff))
				// 	i.filter.frequency.setValueAtTime(filter.cutoff, audio.currentTime)
				// 	i.filter.type = filter.type
				// }

				// compressor
				// i.compressor = audio.createDynamicsCompressor()
				// i.setCompressor = function(compressor) {
				// 	if (parameters.filter)    { i.compressor.connect(i.filter) }
				// 	else if (parameters.echo) { i.compressor.connect(i.echo) }
				// 	else                      { i.compressor.connect(i.volume) }

				// 	i.compressor.threshold.value = compressor.threshold
				// 	i.compressor.knee.value = compressor.knee
				// 	i.compressor.ratio.value = Math.max(1, Math.min(20, compressor.ratio))
				// 	i.compressor.attack.value = compressor.attack
				// 	i.compressor.release.value = compressor.release
				// }

			/* press */
				i.press = function(pitch) {
					// info
						var pitch = Math.max(16.35, Math.min(8869.84, pitch))
						var now   = audio.currentTime

					// nodes
						i.envelopes[pitch] = audio.createGain()
						i.envelopes[pitch].connect(i.volume)

						if (i.parameters.delay && i.parameters.feedback) {
							i.envelopes[pitch].connect(i.effects.echo)
						}

					// oscillator
						for (var v = 0; v < i.parameters.voices.length; v++) {
							var distance = i.parameters.voices[v]
							var multiplier = Math.pow(1.05946309436, distance)

							i.tones[pitch + "_" + distance] = audio.createOscillator()
							i.tones[pitch + "_" + distance].connect(i.envelopes[pitch])
							i.tones[pitch + "_" + distance].frequency.setValueAtTime(pitch * multiplier, now)
							i.tones[pitch + "_" + distance].setPeriodicWave(i.parameters.wave)
							i.tones[pitch + "_" + distance].start(now)
						}

					// envelopes
						i.envelopes[pitch].gain.setValueAtTime(0, now)
						i.envelopes[pitch].gain.linearRampToValueAtTime(1, now + (i.parameters.attack || 0))
						i.envelopes[pitch].gain.exponentialRampToValueAtTime((i.parameters.sustain || 0) + 0.001, now + (i.parameters.attack || 0) + (i.parameters.decay || 0))
				}

			/* lift */
				i.lift = function(pitch) {
					// info
						var pitch = Math.max(16.35, Math.min(8869.84, pitch))
						var now   = audio.currentTime

					// envelope
						i.envelopes[pitch].gain.cancelScheduledValues(now)
						i.envelopes[pitch].gain.setValueAtTime(i.envelopes[pitch].gain.value, now)
						i.envelopes[pitch].gain.exponentialRampToValueAtTime(0.001, now + (i.parameters.release || 0))
						delete i.envelopes[pitch]
					
					// oscillators
						Object.keys(i.tones).forEach(function (t) {
							if (t.split("_")[0] == pitch) {
								i.tones[t].stop(now + (i.parameters.release || 0))
								delete i.tones[t]
							}
						})
				}
			
			// start
				parameters = parameters || {}
				parameters.volume = 0.75
				parameters.power  = 1
				
				i.setParameters(parameters)
				return i
		}

	/*** ensemble ***/
		window.instrument = buildInstrument({
			name: "synthesizer",
			wave: [0, (1/1),0,(1/3),0, (1/5),0,(1/7),0, (1/9),0,(1/11),0, (1/13),0,(1/15),0, (1/17),0,(1/19),0, (1/21),0,(1/23),0, (1/25),0,(1/27),0, (1/29),0,(1/31),0, (1/33)],
			envelope: {
				attack: 0.4,
				decay: 0.6,
				sustain: 0.5,
				release: 0.6
			},
			echo: {
				delay: 0.1,
				feedback: 0.8
			},
			// filter: {
			// 	cutoff: 1000,
			// 	type: "lowpass"
			// },
			// compressor: {
			// 	threshold: -50,
			// 	knee: 40,
			// 	ratio: 12,
			// 	attack: 0,
			// 	release: 0.25
			// }
		})
			// var ensemble = {}
			// ensemble.bass = buildInstrument({
			// 	name: "bass",
			// 	wave: [0, (1/1),0,(1/3),0, (1/5),0,(1/7),0, (1/9),0,(1/11),0, (1/13),0,(1/15),0, (1/17),0,(1/19),0, (1/21),0,(1/23),0, (1/25),0,(1/27),0, (1/29),0,(1/31),0, (1/33)],
			// 	envelope: {
			// 		attack: 0.1,
			// 		decay: 0.5,
			// 		sustain: 0.1,
			// 		release: 0.25
			// 	},
			// 	echo: {
			// 		delay: 0.3,
			// 		feedback: 0.5
			// 	},
			// 	filter: {
			// 		cutoff: 1000,
			// 		type: "lowpass"
			// 	},
			// 	compressor: {
			// 		threshold: -50,
			// 		knee: 40,
			// 		ratio: 12,
			// 		attack: 0,
			// 		release: 0.25
			// 	}
			// })
			// ensemble.drums = buildInstrument({
			// 	name: "drums",
			// 	wave: [0, 1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0],
			// 	envelope: {
			// 		attack: 0.01,
			// 		decay: 0.02,
			// 		sustain: 0.2,
			// 		release: 1,
			// 	},
			// 	echo: {
			// 		delay: 0.2,
			// 		feedback: 0.8,
			// 	},
			// 	filter: {
			// 		cutoff: 1000,
			// 		type: "notch"
			// 	}
			// })
			// ensemble.saxophone = buildInstrument({
			// 	name: "saxophone",
			// 	wave: [0, (1/1),0,(1/9),0, (1/25),0,(1/49),0, (1/81),0,(1/121),0, (1/169),0,(1/225),0, (1/289),0,(1/361),0, (1/441),0,(1/529),0, (1/625),0,(1/729),0, (1/841),0,(1/961),0, (1/1089)],
			// 	envelope: {
			// 		attack: 0.1,
			// 		decay: 0.2,
			// 		sustain: 0.8,
			// 		release: 0.7,
			// 	},
			// 	echo: {
			// 		delay: 0.01,
			// 		feedback: 0.333333,
			// 	}
			// })
			// ensemble.keyboard = buildInstrument({
			// 	name: "keyboard",
			// 	wave: [0, (1/1),(1/2),(1/3),(1/4), (1/5),(1/6),(1/7),(1/8), (1/9),(1/10),(1/11),(1/12), (1/13),(1/14),(1/15),(1/16), (1/17),(1/18),(1/19),(1/20), (1/21),(1/22),(1/23),(1/24), (1/25),(1/26),(1/27),(1/28), (1/29),(1/30),(1/31),(1/32), (1/33)],
			// 	envelope: {
			// 		attack: 0.1,
			// 		decay: 0.5,
			// 		sustain: 0.9,
			// 		release: 0.1,
			// 	},
			// 	filter: {
			// 		cutoff: 2000,
			// 		type: "lowpass"
			// 	},
			// 	echo: {
			// 		delay: 0.2,
			// 		feedback: 0.8,
			// 	}
			// })

})