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
				buffers.white = audio.createScriptProcessor(256, 1, 1)
				buffers.white.onaudioprocess = function(event) {
					var output = event.outputBuffer.getChannelData(0)
					for (var i = 0; i < 256; i++) {
						output[i] = Math.random() * 2 - 1
					}
				}

				var lastOut = 0.0
				buffers.brown = audio.createScriptProcessor(256, 1, 1)
				buffers.brown.onaudioprocess = function(event) {
					var output = event.outputBuffer.getChannelData(0)
					for (var i = 0; i < 256; i++) {
						output[i] = (lastOut + (0.02 * (Math.random() * 2 - 1))) / 1.02
						lastOut = output[i]
						output[i] *= 3.5
					}
				}

				var b0,  b1,  b2,  b3,  b4,  b5,  b6
					b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0
				buffers.pink = audio.createScriptProcessor(256, 1, 1)
				buffers.pink.onaudioprocess = function(event) {
					var output = event.outputBuffer.getChannelData(0)
					for (var i = 0; i < 256; i++) {
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
						polysynth: [0],
						noise:     {},
						imag:      [],
						real:      [],
						wave:      null,
						attack:    0,
						decay:     0,
						sustain:   0,
						release:   0,
						filters:   {},
						delay:     0,
						feedback:  0
					},
					tones:     {},
					buffers:   {},
					envelopes: {},
					filters:   {},
					effects:   {},
					volume:    audio.createGain(),
					power:     audio.createGain()
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
									for (var x in parameters.polysynth) {
										var tone = Math.max(-12, Math.min(12, x))
										if (parameters.polysynth[tone]) {
											if (!i.parameters.polysynth.includes(tone)) {
												i.parameters.polysynth.push(tone)
											}
										}
										else {
											if (i.parameters.polysynth.includes(tone)) {
												i.parameters.polysynth = i.parameters.polysynth.filter(function (t) {
													return t !== tone
												})
											}
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

							// noise
								case "noise":
									var color = Object.keys(parameters.noise)[0]
									var value = Math.min(1, Math.max(0, parameters.noise[color]))
									if (value) {
										i.parameters.noise[color] = value
									}
									else {
										if (Object.keys(i.parameters.noise).includes(color)) {
											delete i.parameters.noise[color]
										}
									}
								break

							// envelope
								case "envelope":
									i.parameters.attack  = Math.max(0, Math.min(1, parameters.envelope.attack ))
									i.parameters.decay   = Math.max(0, Math.min(1, parameters.envelope.decay  ))
									i.parameters.sustain = Math.max(0, Math.min(1, parameters.envelope.sustain))
									i.parameters.release = Math.max(0, Math.min(1, parameters.envelope.release))
								break

							// filter
								case "filters":
									for (var f in parameters.filters) {
										var filter = parameters.filters[f]

										var low  = Math.max(1, Math.min(20000, filter.low ))
										var mid  = Math.max(1, Math.min(20000, filter.mid ))
										var high = Math.max(1, Math.min(20000, filter.high))
										var gain = Math.max(-50,  Math.min(50, filter.gain))

										if (Math.abs(gain) < 2) {
											if (Object.keys(i.parameters.filters).includes(f)) {
												delete i.parameters.filters[f]
												delete i.filters[f]
											}
										}
										else {
											var type = ((mid < 40) ? "lowshelf" : (mid > 8000) ? "highshelf" : "peaking")

											i.parameters.filters[f] = {
												type: type,
												frequency: ((type == "lowshelf") ? high : (type == "highshelf") ? low : mid),
												q:    mid / (high - low),
												gain: gain
											}

											i.filters[f] = audio.createBiquadFilter()
											i.filters[f].type = type
											i.filters[f].frequency.setValueAtTime(i.parameters.filters[f].frequency,  now)
											i.filters[f].Q.setValueAtTime(Math.min(10000, i.parameters.filters[f].q), now)
											i.filters[f].gain.setValueAtTime(     i.parameters.filters[f].gain,       now)

											var keys = Object.keys(i.filters)
											for (var k in keys) {
												i.filters[keys[k]].disconnect()

												if (i.filters[keys[k + 1]]) {
													i.filters[keys[k]].connect(i.filters[keys[k + 1]])
												}
												else {
													i.filters[keys[k]].connect(i.volume)

													if (i.parameters.delay && i.parameters.feedback) {
														i.filters[keys[k]].connect(i.effects.echo)
													}
												}
											}
										}
									}
								break

							// echo
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

										var keys = Object.keys(i.filters)
										for (var k in keys) {
											i.filters[keys[k]].disconnect()

											if (i.filters[keys[k + 1]]) {
												i.filters[keys[k]].connect(i.filters[keys[k + 1]])
											}
											else {
												i.filters[keys[k]].connect(i.volume)
												i.filters[keys[k]].connect(i.effects.echo)
											}
										}
									}
									else {
										i.effects.feedback.gain.cancelScheduledValues(now)
									}
								break
						}
					}
				}

			/* press */
				i.press = function(pitch) {
					// info
						var pitch = Math.max(16.35, Math.min(8869.84, pitch))
						var now   = audio.currentTime

					// nodes
						i.envelopes[pitch] = audio.createGain()

						if (Object.keys(i.parameters.filters).length) {
							i.envelopes[pitch].connect(i.filters[Object.keys(i.filters)[0]])
						}
						else {
							i.envelopes[pitch].connect(i.volume)

							if (i.parameters.delay && i.parameters.feedback) {
								i.envelopes[pitch].connect(i.effects.echo)
							}
						}

					// noise
						for (n = 0; n < Object.keys(i.parameters.noise).length; n++) {
							var color = Object.keys(i.parameters.noise)[n]

							i.buffers[pitch + "_" + color] = audio.createGain()
							i.buffers[pitch + "_" + color].connect(i.envelopes[pitch])
							i.buffers[pitch + "_" + color].gain.setValueAtTime((i.parameters.noise[color]), now)

							buffers[color].connect(i.buffers[pitch + "_" + color])
						}

					// oscillator
						for (var p = 0; p < i.parameters.polysynth.length; p++) {
							var distance = i.parameters.polysynth[p]
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

					// buffers
						Object.keys(i.buffers).forEach(function (b) {
							if (b.split("_")[0] == pitch) {
								var color = b.split("_")[1]
								buffers[color].disconnect(i.buffers[b])
								delete i.buffers[b]
							}
						})
					
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
})