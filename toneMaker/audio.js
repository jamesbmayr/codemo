window.addEventListener("load", function() {
	/*** globals ***/
		var audio, master, buffers = {}

	/*** buildAudio ***/
		buildAudio()
		function buildAudio() {
			// audio context
				audio = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext)()
			
			// master volume
				master = audio.createGain()
				master.connect(audio.destination)
				master.gain.setValueAtTime(1, audio.currentTime)

			// noise
				buffers.white = audio.createScriptProcessor(1024, 1, 1)
				buffers.white.onaudioprocess = function(event) {
					var output = event.outputBuffer.getChannelData(0)
					for (var i = 0; i < 1024; i++) {
						output[i] = Math.random() * 2 - 1
					}
				}

				var lastOut = 0.0
				buffers.brown = audio.createScriptProcessor(1024, 1, 1)
				buffers.brown.onaudioprocess = function(event) {
					var output = event.outputBuffer.getChannelData(0)
					for (var i = 0; i < 1024; i++) {
						output[i] = (lastOut + (0.02 * (Math.random() * 2 - 1))) / 1.02
						lastOut = output[i]
						output[i] *= 3.5
					}
				}

				var b0,  b1,  b2,  b3,  b4,  b5,  b6
					b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0
				buffers.pink = audio.createScriptProcessor(1024, 1, 1)
				buffers.pink.onaudioprocess = function(event) {
					var output = event.outputBuffer.getChannelData(0)
					for (var i = 0; i < 1024; i++) {
						var random = Math.random() * 2 - 1
						b0 = 0.99886 * b0 + random * 0.0555179
						b1 = 0.99332 * b1 + random * 0.0750759
						b2 = 0.96900 * b2 + random * 0.1538520
						b3 = 0.86650 * b3 + random * 0.3104856
						b4 = 0.55000 * b4 + random * 0.5329522
						b5 = -0.7616 * b5 - random * 0.0168980
						output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + random * 0.5362) * 0.11
						b6 = random * 0.115926
					}
				}
		}

	/*** buildInstrument ***/
		window.buildInstrument = buildInstrument
		function buildInstrument(parameters) {
			// parameters & nodes
				var i = {
					parameters: {
						polysynth: {},
						noise:        {},
						imag:         new Float32Array([0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
						real:         new Float32Array(34),
						wave:         null,
						envelope: {
							attack:   0,
							decay:    0,
							sustain:  1,
							release:  0,
						},
						filters:      {},
						bitcrusher:   {
							bits: 0,
							norm: 0,
							step: 0,
							wait: 0,
							hold: 0
						},
						echo: {
							delay:    0,
							feedback: 0
						}
					},
					tones:       {},
					buffers:     {},
					envelopes:   {},
					bitcrushers: {},
					filters:   {
						"0": audio.createBiquadFilter(),
						"1": audio.createBiquadFilter(),
						"2": audio.createBiquadFilter(),
						"3": audio.createBiquadFilter(),
						"4": audio.createBiquadFilter()
					},
					effects:   {
						delay:    audio.createDelay(),
						feedback: audio.createGain()
					},
					volume:    audio.createGain(),
					power:     audio.createGain()
				}

			// default values
				for (var x = 0; x <= 4; x++) {
					i.filters[x].type = "peaking"
					i.filters[x].gain.setValueAtTime(0, audio.currentTime)
				}

				i.effects.feedback.gain.setValueAtTime(0, audio.currentTime)
				i.volume.gain.setValueAtTime(0.5, audio.currentTime)	
				i.power.gain.setValueAtTime(1, audio.currentTime)

			// connections
				i.parameters.wave = audio.createPeriodicWave(i.parameters.real, i.parameters.imag)

				i.filters["0"].connect(i.filters["1"])
				i.filters["1"].connect(i.filters["2"])
				i.filters["2"].connect(i.filters["3"])
				i.filters["3"].connect(i.filters["4"])
				i.filters["4"].connect(i.effects.delay)
				i.filters["4"].connect(i.volume)

				i.effects.delay.connect(i.effects.feedback)
				i.effects.feedback.connect(i.effects.delay)
				i.effects.feedback.connect(i.volume)

				i.volume.connect(i.power)
				i.power.connect(master)

			/* setParameters */
				i.setParameters = function(parameters) {
					try {

						var now = audio.currentTime

						var keys = Object.keys(parameters)
						for (var k = 0; k < keys.length; k++) {
							switch (keys[k]) {
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
										for (var x in parameters.polysynth) {
											var tone = Math.max(-12, Math.min(12, x))
											if (parameters.polysynth[tone] && !i.parameters.polysynth[tone]) {
												i.parameters.polysynth[tone] = true
											}
											else if (!parameters.polysynth[tone] && i.parameters.polysynth[tone]) {
												delete i.parameters.polysynth[tone]
											}
										}
									break

								// oscillator
									case "imag":
										i.parameters.imag = new Float32Array(34)
										i.parameters.real = new Float32Array(34)
										for (var x = 1; x < i.parameters.imag.length; x++) {
											i.parameters.imag[x] = parameters.imag[x] || 0
										}
										i.parameters.wave = audio.createPeriodicWave(i.parameters.real, i.parameters.imag)
									break

									case "harmonic":
										var harmonic = Object.keys(parameters.harmonic)[0]
										i.parameters.imag[harmonic] = Math.max(0, Math.min(1, parameters.harmonic[harmonic]))
										i.parameters.wave   = audio.createPeriodicWave(i.parameters.real, i.parameters.imag)
									break

								// noise
									case "noise":
										for (var color in parameters.noise) {
											var value = Math.min(1, Math.max(0, parameters.noise[color]))
											if (value) {
												i.parameters.noise[color] = value
											}
											else {
												if (Object.keys(i.parameters.noise).includes(color)) {
													delete i.parameters.noise[color]
												}
											}
										}
									break

								// envelope
									case "envelope":
										i.parameters.envelope.attack  = Math.max(0, Math.min(1, parameters.envelope.attack ))
										i.parameters.envelope.decay   = Math.max(0, Math.min(1, parameters.envelope.decay  ))
										i.parameters.envelope.sustain = Math.max(0, Math.min(1, parameters.envelope.sustain))
										i.parameters.envelope.release = Math.max(0, Math.min(1, parameters.envelope.release))
									break

								// filter
									case "filters":
										for (var f in parameters.filters) {
											var low  = Math.max(1, Math.min(20000, parameters.filters[f].low ))
											var mid  = Math.max(1, Math.min(20000, parameters.filters[f].mid ))
											var high = Math.max(1, Math.min(20000, parameters.filters[f].high))
											var gain = Math.max(-50,  Math.min(50, parameters.filters[f].gain))

											var type = ((mid < 65) ? "lowshelf" : (mid > 4000) ? "highshelf" : "peaking")
											if (Math.abs(gain) < 2) {
												gain = 0
												type = "peaking"
											}
											
											i.parameters.filters[f] = {
												low: low,
												mid: mid,
												high: high,
												type: type,
												frequency: ((type == "lowshelf") ? high : (type == "highshelf") ? low : mid),
												q:    mid / (high - low),
												gain: gain
											}

											i.filters[f].type = type
											i.filters[f].frequency.setValueAtTime(i.parameters.filters[f].frequency,  now)
											i.filters[f].Q.setValueAtTime(Math.min(10000, i.parameters.filters[f].q), now)
											i.filters[f].gain.setValueAtTime(     i.parameters.filters[f].gain,       now)
										}
									break

								// bitcrusher
									case "bitcrusher":
										i.parameters.bitcrusher.bits = Math.max(0, Math.min(64, parameters.bitcrusher.bits))
										i.parameters.bitcrusher.norm = Math.max(0, Math.min(1,  parameters.bitcrusher.norm))
										i.parameters.bitcrusher.step = Math.pow(0.5, i.parameters.bitcrusher.bits)
										i.parameters.bitcrusher.hold = 0
										i.parameters.bitcrusher.wait = 0
									break

								// echo
									case "echo":
										i.parameters.echo.delay    = Math.max(0, Math.min(1, parameters.echo.delay    ))
										i.parameters.echo.feedback = Math.max(0, Math.min(1, parameters.echo.feedback ))

										i.effects.delay.delayTime.setValueAtTime(i.parameters.echo.delay, now)
										i.effects.feedback.gain.setValueAtTime(i.parameters.echo.feedback, now)

										if (!i.parameters.echo.delay || !i.parameters.echo.feedback) {
											i.effects.feedback.gain.cancelScheduledValues(now)
										}
									break
							}
						}

					} catch (error) {}
				}

			/* press */
				i.press = function(pitch) {
					try {

						// info
							var pitch = Math.max(16.35, Math.min(8869.84, pitch))
							var now   = audio.currentTime
							i.envelopes[pitch] = audio.createGain()

						// bitcrusher
							if (i.parameters.bitcrusher.bits) {
								var wait = 0
								var hold = 0

								i.bitcrushers[pitch] = audio.createScriptProcessor(1024, 1, 1)
								i.bitcrushers[pitch].connect(i.filters["0"])
								i.bitcrushers[pitch].onaudioprocess = function(event) {
									var input  =  event.inputBuffer.getChannelData(0)
									var output = event.outputBuffer.getChannelData(0)

									for (var x = 0; x < 1024; x++) {
										wait += i.parameters.bitcrusher.norm
										if (wait >= 1) {
											wait -= 1
											hold  = i.parameters.bitcrusher.step * Math.floor((input[x] / i.parameters.bitcrusher.step) + 0.5)
										}
										output[x] = hold
									}
								}

								i.envelopes[pitch].connect(i.bitcrushers[pitch])
							}
							else {
								i.envelopes[pitch].connect(i.filters["0"])
							}

						// noise
							for (var color in i.parameters.noise) {
								i.buffers[pitch + "_" + color] = audio.createGain()
								i.buffers[pitch + "_" + color].connect(i.envelopes[pitch])
								i.buffers[pitch + "_" + color].gain.setValueAtTime((i.parameters.noise[color]), now)

								buffers[color].connect(i.buffers[pitch + "_" + color])
							}

						// oscillator
							var polysynths = Object.keys(i.parameters.polysynth)
							for (var p = 0; p < polysynths.length; p++) {
								var distance = polysynths[p]
								var multiplier = Math.pow(1.05946309436, distance)

								i.tones[pitch + "_" + distance] = audio.createOscillator()
								i.tones[pitch + "_" + distance].connect(i.envelopes[pitch])
								i.tones[pitch + "_" + distance].frequency.setValueAtTime(pitch * multiplier, now)
								i.tones[pitch + "_" + distance].setPeriodicWave(i.parameters.wave)
								i.tones[pitch + "_" + distance].start(now)
							}

						// envelopes
							i.envelopes[pitch].gain.setValueAtTime(0, now)
							i.envelopes[pitch].gain.linearRampToValueAtTime(1, now + (i.parameters.envelope.attack || 0))
							i.envelopes[pitch].gain.exponentialRampToValueAtTime((i.parameters.envelope.sustain || 0) + 0.001, now + (i.parameters.envelope.attack || 0) + (i.parameters.envelope.decay || 0))

					} catch (error) {}
				}

			/* lift */
				i.lift = function(pitch) {
					try {

						// info
							var pitch = Math.max(16.35, Math.min(8869.84, pitch))
							var now   = audio.currentTime

						// envelope
							i.envelopes[pitch].gain.cancelScheduledValues(now)
							i.envelopes[pitch].gain.setValueAtTime(i.envelopes[pitch].gain.value, now)
							i.envelopes[pitch].gain.exponentialRampToValueAtTime(0.001, now + (i.parameters.envelope.release || 0))
							delete i.envelopes[pitch]

						// bitcrusher
							if (i.bitcrushers[pitch]) {
								i.bitcrushers[pitch].disconnect()
								delete i.bitcrushers[pitch]
							}

						// buffers
							Object.keys(i.buffers).forEach(function (b) {
								if (b.split("_")[0] == pitch) {
									buffers[b.split("_")[1]].disconnect(i.buffers[b])
									delete i.buffers[b]
								}
							})
						
						// oscillators
							Object.keys(i.tones).forEach(function (t) {
								if (t.split("_")[0] == pitch) {
									i.tones[t].stop(now + (i.parameters.envelope.release || 0))
									delete i.tones[t]
								}
							})

					} catch (error) {}
				}
			
			// start
				i.setParameters(parameters || {})
				return i
		}
})