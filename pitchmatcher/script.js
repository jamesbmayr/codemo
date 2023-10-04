/*** onload ***/
	/* triggers */
		if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
			var on = { click: "touchstart", mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" }
		}
		else {
			var on = { click:      "click", mousedown:  "mousedown", mousemove: "mousemove", mouseup:  "mouseup" }
		}

	/* defaults */
		document.addEventListener("dblclick", function(event) {
			event.preventDefault()
		})

		document.addEventListener("contextmenu", function(event) {
			event.preventDefault()
		})

	/* globals */
		var start   = document.getElementById("start")
		var refresh = document.getElementById("refresh")			
		var canvas  = document.getElementById("canvas")
		var context = canvas.getContext("2d")
		var game, audio, master, oscillator, microphone, analyzer

/*** canvas ***/
	/* resizeCanvas */
		resizeCanvas()
		window.addEventListener("resize", resizeCanvas)
		function resizeCanvas() {
			canvas.height = window.innerHeight
			canvas.width  = window.innerWidth
		}

	/* clearCanvas */
		function clearCanvas() {
			context.clearRect(0, 0, canvas.width, canvas.height)
		}

	/* drawText */
		function drawText(x, y, text, options) {
			// variables
				options = options || {}
				context.font = (options.style ? options.style + " " : "") + (options.size || 32) + "px " + (options.font || "monospace")
				context.fillStyle   = options.color || "transparent"
				context.textAlign   = options.alignment || "center"
				context.shadowBlur  = options.blur ? options.blur : 0
				context.shadowColor = options.shadow ? options.shadow : "transparent"
				context.globalAlpha = options.opacity || 1

			// draw
				context.fillText((text || ""), x, canvas.height - y)
		}

	/* drawRectangle */
		function drawRectangle(x, y, width, height, options) {
			// parameters
				options = options || {}
				context.beginPath()
				context.fillStyle   = options.color || "transparent"
				context.strokeStyle = options.color || "transparent"
				context.lineWidth   = options.border || 2
				context.shadowBlur  = options.blur ? options.blur : 0
				context.shadowColor = options.shadow ? options.shadow : "transparent"
				context.globalAlpha = options.opacity || 1

			// draw
				context.moveTo(x, canvas.height - y)
				context.lineTo(x + width, canvas.height - y)
				context.lineTo(x + width, canvas.height - y - height)
				context.lineTo(x, canvas.height - y - height)
				context.closePath()
				context.fill()
		}

/*** audio ***/
	/* getAverage */
		function getAverage(arr) {
			if (!Array.isArray(arr)) {
				return null
			}
			else {
				var sum = 0
				for (var i = 0; i < arr.length; i++) {
					sum += arr[i]
				}
				return (sum / arr.length)
			}
		}

	/* getFrequency */
		function getFrequency(note) {
			return Math.pow(2, (note - 69) / 12) * 440
		}

	/* getNote */
		function getNote(frequency) {
			return 12 * Math.log2(frequency / 440) + 69
		}

	/* getNoteInfo */
		function getNoteInfo(note) {
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

	/* buildAudio */
		function buildAudio() {
			// clicked
				game.cursor.clicked = true
				start.setAttribute("hidden", true)

			// audio context
				audio = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext)()

			// master volume
				master = audio.createGain()
				master.connect(audio.destination)
				master.gain.setValueAtTime(0, audio.currentTime)

			// sine wave
				oscillator = audio.createOscillator()
				oscillator.connect(master)
				oscillator.type = "sine"
				oscillator.start()

			// output
				changeOutput()

			// analyzer
				analyzer = audio.createAnalyser()
				analyzer.fftSize = 8192
				game.input.bufferLength = analyzer.frequencyBinCount
				game.input.data = new Float32Array(game.input.bufferLength)

			// input
				if (navigator.mediaDevices) {
					navigator.mediaDevices.getUserMedia({audio: true, video: false}).then(function(stream) {
						microphone = audio.createMediaStreamSource(stream)
						microphone.connect(analyzer)
					})
				}
		}

	/* adjustVolume */
		function adjustVolume(activate) {
			if (audio && master && game.cursor.clicked) {
				if (activate) {
					game.cursor.holding = true
					master.gain.setValueAtTime(0.5, audio.currentTime)
				}
				else {
					game.cursor.holding = false
					master.gain.setValueAtTime(0, audio.currentTime)
				}
			}
		}

/*** inputs ***/
	/* clickStart */
		start.addEventListener(on.click, clickStart)
		function clickStart(event) {
			event.preventDefault()

			if (!game.cursor.clicked) {
				buildAudio()
			}
		}

	/* clickRefresh */
		refresh.addEventListener(on.click, clickRefresh)
		function clickRefresh(event) {
			event.preventDefault()

			if (!game.cursor.clicked) {
				buildAudio()
			}
			else {
				changeOutput()
			}
		}

	/* downMouse */
		canvas.addEventListener(on.mousedown, downMouse)
		function downMouse(event) {
			game.cursor.x = event.touches ? event.touches[0].clientX : event.clientX
			game.cursor.y = event.touches ? event.touches[0].clientY : event.clientY

			if (game.cursor.clicked) {
				adjustGrabbing(true)
				adjustVolume(true)
			}
		}

	/* upMouse */
		document.addEventListener(on.mouseup, upMouse)
		function upMouse(event) {
			adjustGrabbing()
			adjustVolume()
		}

	/* moveMouse */
		canvas.addEventListener(on.mousemove, moveMouse)
		function moveMouse(event) {
			game.cursor.x = event.touches ? event.touches[0].clientX : event.clientX
			game.cursor.y = event.touches ? event.touches[0].clientY : event.clientY

			if (game.cursor.grabbing) {
				changeOutput(Math.round(game.cursor.x / canvas.width * 72) + 36)
			}
			else {
				adjustGrabbing()
			}
		}

	/* downKey */
		document.addEventListener("keydown", function(event) {
			if (event.code == "Space") {
				adjustVolume(true)
			}
		})

	/* upKey */
		document.addEventListener("keyup", function(event) {
			if (event.code == "Space") {
				adjustVolume()
			}
		})

/*** game ***/
	/* createGame */
		createGame()
		function createGame() {
			game = {
				cursor: {
					clicked:  false,
					holding:  false,
					grabbing: false,
					x: canvas.width  / 2,
					y: canvas.height / 2
				},
				output: {
					note: null,
					name: null,
					octave: null,
					frequency: null
				},
				input: {
					note: null,
					name: null,
					octave: null,
					frequency: null,
					cents: null,
					bufferLength: null,
					data: null,
					minimum: null,
					maximum: null,
					extremes: 0,
					lastCrossUp: null,
					lastCrossDown: null,
					lastExtreme: null,
					wavelengths: []
				},
				loop: setInterval(drawGame, 200)
			}
		}

	/* adjustGrabbing */
		function adjustGrabbing(activate) {
			if (activate && !game.cursor.holding && !game.cursor.grabbing && (game.cursor.y > canvas.height / 2)) {
				var barWidth = canvas.width / 72
				var barLeft = (game.output.note - 36) * barWidth
				
				if (barLeft <= game.cursor.x && game.cursor.x <= barLeft + barWidth) {
					game.cursor.grabbing = true
					canvas.setAttribute("grabbing", true)
				}
			}
			else if (game.cursor.grabbing) {
				game.cursor.grabbing = false
				canvas.removeAttribute("grabbing")
			}
			else {
				var barWidth = canvas.width / 72
				var barLeft = (game.output.note - 36) * barWidth
				
				if (barLeft <= game.cursor.x && game.cursor.x <= barLeft + barWidth) {
					canvas.setAttribute("hovering", true)
				}
				else {
					canvas.removeAttribute("hovering")
				}
			}
		}

	/* changeOutput */
		function changeOutput(note) {
			// new output
				game.output.note      = note || (Math.floor(Math.random() * 37) + 60)
				var info =            getNoteInfo(game.output.note)
				game.output.name      = info[1] + ((info[2] == -1) ? "b" : (info[2] == 1) ? "#" : "")
				game.output.octave    = info[3]
				game.output.frequency = info[0]

			// update oscillator
				oscillator.frequency.setValueAtTime(game.output.frequency, audio.currentTime)

			// remove focus
				refresh.blur()
		}

	/* detectInput */
		function detectInput() {
			// refresh data
				analyzer.getFloatTimeDomainData(game.input.data)

			// figure out some values
				game.input.minimum       = 0
				game.input.maximum       = 0
				game.input.extremes      = 0
				game.input.lastCrossUp   = null
				game.input.lastCrossDown = null
				game.input.lastExtreme   = null
				game.input.wavelengths   = []

			// calculate wavelength from up-cross to up-cross and from down-cross to down-cross (past midpoint)
				for (var t = 1; t < game.input.bufferLength; t++) {
					if (game.input.data[t - 1] < 0 && game.input.data[t] >= 0) { // cross up
						game.input.wavelengths.push(t - game.input.lastCrossUp)
						game.input.lastCrossUp = t
					}
					else if (game.input.data[t - 1] >= 0 && game.input.data[t] < 0) { // cross down
						game.input.wavelengths.push(t - game.input.lastCrossDown)
						game.input.lastCrossDown = t
					}

					if (game.input.data[t] > game.input.maximum) { // new maximum
						game.input.maximum = game.input.data[t]
					}
					else if (game.input.data[t] < game.input.minimum) { // new minimum
						game.input.minimum = game.input.data[t]
					}
				}

			// calculate number of changes in direction within 10% of max or min
				for (var t = 0; t < game.input.bufferLength; t++) {
					if      ((game.input.data[t] > game.input.maximum * 0.7) && (!game.input.lastExtreme || game.input.lastExtreme == "min")) {
					 	game.input.lastExtreme = "max"
						game.input.extremes++
					}
					else if ((game.input.data[t] < game.input.minimum * 0.7) && (!game.input.lastExtreme || game.input.lastExtreme == "max")) {
					 	game.input.lastExtreme = "min"
						game.input.extremes++
					}
				}

			// remove the first two waves, as they'll be a partial crossup and partial crossdown
				game.input.wavelengths = game.input.wavelengths.slice(2)
				game.input.extremes   -= 2

			// collapse complex waves down to simple waves
				var complexity = Math.round(game.input.wavelengths.length / game.input.extremes)

			// calculate the frequency & note (sample rate is usually 44100 Hz)
				game.input.frequency = audio.sampleRate / getAverage(game.input.wavelengths) / complexity
				game.input.note      = getNote(game.input.frequency)
				var info             = getNoteInfo(Math.round(game.input.note))
				game.input.name      = info[1] + ((info[2] == -1) ? "b" : (info[2] == 1) ? "#" : "")
				game.input.octave    = info[3]
				game.input.cents     = Math.round((game.input.note - Math.round(game.input.note)) * 100)
		}

	/* drawWave */
		function drawWave() {
			// draw constants
				var bufferFraction = (game.input.bufferLength / 8)
				var pixelWidth     = canvas.width / bufferFraction
				var pixelHeight    = pixelWidth * 16
				var sixthHeight    = canvas.height / 6
				var halfHeight     = (canvas.height / 2) - (pixelWidth / 2)

			// multiply values by maximum to fill band
				var multiplier = 1 / Math.max(game.input.maximum, Math.abs(game.input.minimum))

			// draw the wave
				for (var t = 0; t < bufferFraction; t++) {
					drawRectangle(t * pixelWidth, (game.input.data[t] * multiplier * sixthHeight) + halfHeight, pixelWidth, pixelHeight, {color: "#111111", blur: 2, shadow: "#111111"})
				}
		}

	/* drawGame */
		function drawGame() {
			// clear
				clearCanvas()
				var barWidth = canvas.width / 72
				var barHeight = canvas.height / 2

			// draw input
				if (microphone) {
					detectInput()

					if (game.input.note >= 36 && game.input.note <= 108) {
						drawWave()
						drawRectangle((game.input.note - 36) * barWidth, barHeight, barWidth, barHeight, {color: "#dddddd", opacity: 0.75, shadow: "#dddddd", blur: 10})

						var cents = (game.input.cents > 0) ? (" +" + game.input.cents + "c") : (game.input.cents < 0) ? (" " + game.input.cents + "c") : ""
						drawText(canvas.width / 2, canvas.height * 19 / 24, game.input.frequency.toFixed(2) + " Hz",     {color: "#dddddd", size: 20, shadow: "#111111", blur: 5})
						drawText(canvas.width / 2, canvas.height * 20 / 24, game.input.name + game.input.octave + cents, {color: "#dddddd", size: 20, shadow: "#111111", blur: 5})
					}
					else {
						drawText(canvas.width / 2, canvas.height * 5 / 6, "make a sound", {color: "#dddddd", size: 20, shadow: "#111111", blur: 5})
					}
				}

			// draw output
				if (oscillator) {
					drawRectangle((game.output.note - 36) * barWidth, 0, barWidth, barHeight, {color: "#dddddd", opacity: 0.75, shadow: "#dddddd", blur: 10})

					if (game.cursor.holding) {
						drawText(canvas.width / 2, canvas.height * 3 / 24, game.output.frequency.toFixed(2) + " Hz", {color: "#dddddd", size: 20, shadow: "#111111", blur: 5})
						drawText(canvas.width / 2, canvas.height * 4 / 24, game.output.name + game.output.octave,    {color: "#dddddd", size: 20, shadow: "#111111", blur: 5})
					}
					else {
						drawText(canvas.width / 2, canvas.height * 1 / 6 , "hold to hear",                           {color: "#dddddd", size: 20, shadow: "#111111", blur: 5})
					}
				}
		}
