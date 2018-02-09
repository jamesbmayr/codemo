window.addEventListener("load", function() {
	/*** globals ***/
		var audio, master, buffers = {}

	/*** getFrequency ***/
		window.getFrequency = getFrequency
		function getFrequency(note) {
			note = Math.floor(Math.max(0, Math.min(132, Number(note) || 0)))

			switch (note) {
				// octave -1
					case 0: 			// C-1
						return [8.175, "C", 0, -1]
					break
					case 1: 			// C#-1 / Db-1
						return [8.66, "C", 1, -1]
					break
					case 2: 			// D-1
						return [9.175, "D", 0, -1]
					break
					case 3: 			// D#-1 / Eb-1
						return [9.725, "E", -1, -1]
					break
					case 4: 			// E-1
						return [10.30, "E", 0, -1]
					break
					case 5: 			// F-1
						return [10.915, "F", 0, -1]
					break
					case 6: 			// F#-1 / Gb-1
						return [11.56, "F", 1, -1]
					break
					case 7: 			// -1
						return [12.25, "G", 0, -1]
					break
					case 8: 			// G#-1 / Ab-1
						return [12.98, "A", -1, -1]
					break
					case 9: 			// A-1
						return [13.75, "A", 0, -1]
					break
					case 10: 			// A#-1 / Bb-1
						return [14.57, "B", -1, -1]
					break
					case 11: 			// B-1
						return [15.435, "B", 0, -1]
					break

				// octave 0
					case 12: 			// C0
						return [16.35, "C", 0, 0]
					break
					case 13: 			// C#0 / Db0
						return [17.32, "C", 1, 0]
					break
					case 14: 			// D0
						return [18.35, "D", 0, 0]
					break
					case 15: 			// D#0 / Eb0
						return [19.45, "E", -1, 0]
					break
					case 16: 			// E0
						return [20.60, "E", 0, 0]
					break
					case 17: 			// F0
						return [21.83, "F", 0, 0]
					break
					case 18: 			// F#0 / Gb0
						return [23.12, "F", 1, 0]
					break
					case 19: 			// 0
						return [24.50, "G", 0, 0]
					break
					case 20: 			// G#0 / Ab0
						return [25.96, "A", -1, 0]
					break
					case 21: 			// A0
						return [27.50, "A", 0, 0]
					break
					case 22: 			// A#0 / Bb0
						return [29.14, "B", -1, 0]
					break
					case 23: 			// B0
						return [30.87, "B", 0, 0]
					break

				// octave 1
					case 24: 			// C1
						return [32.70, "C", 0, 1]
					break
					case 25: 			// C#1 / Db1
						return [34.65, "C", 1, 1]
					break
					case 26: 			// D1
						return [36.71, "D", 0, 1]
					break
					case 27: 			// D#1 / Eb1
						return [38.89, "E", -1, 1]
					break
					case 28: 			// E1
						return [41.20, "E", 0, 1]
					break
					case 29: 			// F1
						return [43.65, "F", 0, 1]
					break
					case 30: 			// F#1 / Gb1
						return [46.25, "F", 1, 1]
					break
					case 31: 			// 1
						return [49.00, "G", 0, 1]
					break
					case 32: 			// G#1 / Ab1
						return [51.91, "A", -1, 1]
					break
					case 33: 			// A1
						return [55.00, "A", 0, 1]
					break
					case 34: 			// A#1 / Bb1
						return [58.27, "B", -1, 1]
					break
					case 35: 			// B1
						return [61.74, "B", 0, 1]
					break

				// octave 2
					case 36: 			// C2
						return [65.41, "C", 0, 2]
					break
					case 37: 			// C#2 / Db2
						return [69.30, "C", 1, 2]
					break
					case 38: 			// D2
						return [73.42, "D", 0, 2]
					break
					case 39: 			// D#2 / Eb2
						return [77.78, "E", -1, 2]
					break
					case 40: 			// E2
						return [82.41, "E", 0, 2]
					break
					case 41: 			// F2
						return [87.31, "F", 0, 2]
					break
					case 42: 			// F#2 / Gb2
						return [92.50, "F", 1, 2]
					break
					case 43: 			// 2
						return [98.00, "G", 0, 2]
					break
					case 44: 			// G#2 / Ab2
						return [103.83, "A", -1, 2]
					break
					case 45: 			// A2
						return [110.00, "A", 0, 2]
					break
					case 46: 			// A#2 / Bb2
						return [116.54, "B", -1, 2]
					break
					case 47: 			// B2
						return [123.47, "B", 0, 2]
					break

				// octave 3
					case 48: 			// C3
						return [130.81, "C", 0, 3]
					break
					case 49: 			// C#3 / Db3
						return [138.59, "C", 1, 3]
					break
					case 50: 			// D3
						return [146.83, "D", 0, 3]
					break
					case 51: 			// D#3 / Eb3
						return [155.56, "E", -1, 3]
					break
					case 52: 			// E3
						return [164.81, "E", 0, 3]
					break
					case 53: 			// F3
						return [174.61, "F", 0, 3]
					break
					case 54: 			// F#3 / Gb3
						return [185.00, "F", 1, 3]
					break
					case 55: 			// G
						return [196.00, "G", 0, 3]
					break
					case 56: 			// G#3 / Ab3
						return [207.65, "A", -1, 3]
					break
					case 57: 			// A3
						return [220.00, "A", 0, 3]
					break
					case 58: 			// A#3 / Bb3
						return [233.08, "B", -1, 3]
					break
					case 59: 			// B3
						return [246.94, "B", 0, 3]
					break

				// octave 4
					case 60: 			// C4
						return [261.63, "C", 0, 4]
					break
					case 61: 			// C#4 / Db4
						return [277.18, "C", 1, 4]
					break
					case 62: 			// D4
						return [293.67, "D", 0, 4]
					break
					case 63: 			// D#4 / Eb4
						return [311.13, "E", -1, 4]
					break
					case 64: 			// E4
						return [329.63, "E", 0, 4]
					break
					case 65: 			// F4
						return [349.23, "F", 0, 4]
					break
					case 66: 			// F#4 / Gb4
						return [369.99, "F", 1, 4]
					break
					case 67: 			// G4
						return [392.00, "G", 0, 4]
					break
					case 68: 			// G#4 / Ab4
						return [415.30, "A", -1, 4]
					break
					case 69: 			// A4
						return [440.00, "A", 0, 4]
					break
					case 70: 			// A#4 / Bb4
						return [466.16, "B", -1, 4]
					break
					case 71: 			// B4
						return [493.88, "B", 0, 4]
					break

				// octave 5
					case 72: 			// C5
						return [523.25, "C", 0, 5]
					break
					case 73: 			// C#5 / Db5
						return [554.37, "C", 1, 5]
					break
					case 74: 			// D5
						return [587.33, "D", 0, 5]
					break
					case 75: 			// D#5 / Eb5
						return [622.25, "E", -1, 5]
					break
					case 76: 			// E5
						return [659.25, "E", 0, 5]
					break
					case 77: 			// F5
						return [698.46, "F", 0, 5]
					break
					case 78: 			// F#5 / Gb5
						return [739.99, "F", 1, 5]
					break
					case 79: 			// G5
						return [783.99, "G", 0, 5]
					break
					case 80: 			// G#5 / Ab5
						return [830.61, "A", -1, 5]
					break
					case 81: 			// A5
						return [880.00, "A", 0, 5]
					break
					case 82: 			// A#5 / Bb5
						return [932.33, "B", -1, 5]
					break
					case 83: 			// B5
						return [987.77, "B", 0, 5]
					break

				// octave 6
					case 84: 			// C6
						return [1046.50, "C", 0, 6]
					break
					case 85: 			// C#6 / Db6
						return [1108.73, "C", 1, 6]
					break
					case 86: 			// D6
						return [1174.66, "D", 0, 6]
					break
					case 87: 			// D#6 / Eb6
						return [1244.51, "E", -1, 6]
					break
					case 88: 			// E6
						return [1318.51, "E", 0, 6]
					break
					case 89: 			// F6
						return [1396.91, "F", 0, 6]
					break
					case 90: 			// F#6 / Gb6
						return [1479.98, "F", 1, 6]
					break
					case 91: 			// G6
						return [1567.98, "G", 0, 6]
					break
					case 92: 			// G#6 / Ab6
						return [1661.22, "A", -1, 6]
					break
					case 93: 			// A6
						return [1760.00, "A", 0, 6]
					break
					case 94: 			// A#6 / Bb6
						return [1864.66, "B", -1, 6]
					break
					case 95: 			// B6
						return [1975.53, "B", 0, 6]
					break

				// octave 7
					case 96: 			// C7
						return [2093.00, "C", 0, 7]
					break
					case 97: 			// C#7 / Db7
						return [2217.46, "C", 1, 7]
					break
					case 98: 			// D7
						return [2349.32, "D", 0, 7]
					break
					case 99: 			// D#7 / Eb7
						return [2489.02, "E", -1, 7]
					break
					case 100: 			// E7
						return [2637.02, "E", 0, 7]
					break
					case 101: 			// F7
						return [2793.83, "F", 0, 7]
					break
					case 102: 			// F#7 / Gb7
						return [2959.96, "F", 1, 7]
					break
					case 103: 			// G7
						return [3135.96, "G", 0, 7]
					break
					case 104: 			// G#7 / Ab7
						return [3322.44, "A", -1, 7]
					break
					case 105: 			// A7
						return [3520.00, "A", 0, 7]
					break
					case 106: 			// A#7 / Bb7
						return [3729.31, "B", -1, 7]
					break
					case 107: 			// B7
						return [3951.07, "B", 0, 7]
					break

				// octave 8
					case 108: 			// C8
						return [4186.01, "C", 0, 8]
					break
					case 109: 			// C#8 / Db8
						return [4434.92, "C", 1, 8]
					break
					case 110: 			// D8
						return [4698.63, "D", 0, 8]
					break
					case 111: 			// D#8 / Eb8
						return [4978.03, "E", -1, 8]
					break
					case 112: 			// E8
						return [5274.04, "E", 0, 8]
					break
					case 113: 			// F8
						return [5587.65, "F", 0, 8]
					break
					case 114: 			// F#8 / Gb8
						return [5919.91, "F", 1, 8]
					break
					case 115: 			// G8
						return [6271.93, "G", 0, 8]
					break
					case 116: 			// G#8 / Ab8
						return [6644.88, "A", -1, 8]
					break
					case 117: 			// A8
						return [7040.00, "A", 0, 8]
					break
					case 118: 			// A#8 / Bb8
						return [7458.62, "B", -1, 8]
					break
					case 119: 			// B8
						return [7902.13, "B", 0, 8]
					break

				// octave 9
					case 120: 			// C9
						return [8372.02, "C", 0, 9]
					break
					case 121: 			// C#9 / Db9
						return [8869.84, "C", 1, 9]
					break
					case 122: 			// D9
						return [9397.26, "D", 0, 9]
					break
					case 123: 			// D#9 / Eb9
						return [9956.06, "E", -1, 9]
					break
					case 124: 			// E9
						return [10548.08, "E", 0, 9]
					break
					case 125: 			// F9
						return [11175.30, "F", 0, 9]
					break
					case 126: 			// F#9 / Gb9
						return [11839.82, "F", 1, 9]
					break
					case 127: 			// G9
						return [12543.86, "G", 0, 9]
					break
					case 128: 			// G#9 / Ab9
						return [13289.76, "A", -1, 9]
					break
					case 129: 			// A9
						return [14080.00, "A", 0, 9]
					break
					case 130: 			// A#9 / Bb9
						return [14917.24, "B", -1, 9]
					break
					case 131: 			// B9
						return [15804.26, "B", 0, 9]
					break

					case 132: 			// C10
						return [16744.04, "C", 0, 10]

				// other
					default:
						return false
			}
		}

	/*** buildAudio ***/
		buildAudio()
		window.buildAudio = buildAudio
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
						bitcrusher:   {
							bits: 0,
							norm: 0,
							step: 0,
							wait: 0,
							hold: 0
						},
						filters:      {},
						echo: {
							delay:    0,
							feedback: 0
						}
					},
					tones:       {},
					buffers:     {},
					velocities:  {},
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
				i.press = function(pitch, when, velocity) {
					try {

						// info
							var pitch = Math.max(8.18, Math.min(16744.04, pitch))
							var now   = audio.currentTime + (Number(when) || 0)

						// velocity
							if (velocity) {
								velocity = Math.max(0, Math.min(2, (velocity || 1)))
							}
							else {
								velocity = 1
							}
							
							i.velocities[pitch] = audio.createGain()
							i.velocities[pitch].gain.setValueAtTime(0, 0)
							i.velocities[pitch].gain.setValueAtTime(velocity, now)

						// noise
							for (var color in i.parameters.noise) {
								i.buffers[pitch + "_" + color] = audio.createGain()
								i.buffers[pitch + "_" + color].connect(i.velocities[pitch])
								i.buffers[pitch + "_" + color].gain.setValueAtTime(0, 0)
								i.buffers[pitch + "_" + color].gain.setValueAtTime((i.parameters.noise[color]), now)

								buffers[color].connect(i.buffers[pitch + "_" + color])
							}

						// oscillator
							var polysynths = Object.keys(i.parameters.polysynth)
							for (var p = 0; p < polysynths.length; p++) {
								var distance = polysynths[p]
								var multiplier = Math.pow(1.05946309436, distance)

								i.tones[pitch + "_" + distance] = audio.createOscillator()
								i.tones[pitch + "_" + distance].connect(i.velocities[pitch])
								i.tones[pitch + "_" + distance].frequency.setValueAtTime(pitch * multiplier, now)
								i.tones[pitch + "_" + distance].setPeriodicWave(i.parameters.wave)
								i.tones[pitch + "_" + distance].start(now)
							}

						// envelopes
							i.envelopes[pitch] = audio.createGain()
							i.velocities[pitch].connect(i.envelopes[pitch])
							i.envelopes[pitch].gain.setValueAtTime(0, audio.currentTime)
							i.envelopes[pitch].gain.linearRampToValueAtTime(1, now + (i.parameters.envelope.attack || 0))
							i.envelopes[pitch].gain.exponentialRampToValueAtTime((i.parameters.envelope.sustain || 0) + 0.001, now + (i.parameters.envelope.attack || 0) + (i.parameters.envelope.decay || 0))

						// bitcrusher
							if (!i.parameters.bitcrusher.bits) {
								i.envelopes[pitch].connect(i.filters["0"])
							}
							else {
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

					} catch (error) {}
				}

			/* lift */
				i.lift = function(pitch, when, velocity) {
					try {

						// info
							var pitch = Math.max(8.18, Math.min(16744.04, pitch))
							var now   = audio.currentTime + (Number(when) || 0)

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

						// velocities
							i.velocities[pitch].gain.cancelScheduledValues(now)
							i.envelopes[pitch].gain.setValueAtTime(0, now)
							delete i.velocities[pitch]

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

					} catch (error) {}
				}
			
			// start
				i.setParameters(parameters || {})
				return i
		}

	/*** midi ***/
		buildMidi()
		window.buildMidi = buildMidi
		function buildMidi() {
			navigator.requestMIDIAccess().then(function(midi) {
				// create midi object
					window.midi = midi || {}
					window.midi.controllers = {}
					window.midi.consumers   = {}
					window.midi.onstatechange = function(event) {
						console.log(event.port.name + " " + event.port.manufacturer + " " + event.port.state)

						updateMidiInputs()
						updateMidiOutputs()
					}
				
				// update controllers
					updateMidiInputs()
					function updateMidiInputs() {
						// delete existing
							var keys = Object.keys(window.midi.controllers)
							for (var k in keys) {
								delete window.midi.controllers[keys[k]]
							}

						// add new
							var inputs = window.midi.inputs.values()
							for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
								window.midi.controllers[input.value.name + input.value.id] = input.value
								window.midi.controllers[input.value.name + input.value.id].onmidimessage = function(event) {
									try {
										if (window.instrument && event.data[0] == 144 && event.data[2]) {
											window.instrument.press(window.getFrequency(event.data[1])[0], 0, event.data[2] / 64)
										}
										else if (window.instrument && (event.data[0] == 128 || event.data[2] == 0)) {
											window.instrument.lift(window.getFrequency(event.data[1])[0])
										}
									} catch (error) {
										console.log(error)
									}
								}
							}
					}

				// update consumers
					updateMidiOutputs()
					function updateMidiOutputs() {
						// delete existing
							var keys = Object.keys(window.midi.consumers)
							for (var k in keys) {
								delete window.midi.consumers[keys[k]]
							}

						// add new
							var outputs = window.midi.outputs.values()
							for (var output = outputs.next(); output && !output.done; output = outputs.next()) {
								window.midi.consumers[output.value.name + output.value.id] = output.value
								//window.midi.consumers[output.value.name + output.value.id].send([0x90, 60, 0x7f])
							}
					}
			})
		}

})
