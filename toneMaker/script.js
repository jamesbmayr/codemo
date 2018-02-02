window.onload = function() {

	/*** globals ***/
		var graph = document.getElementById("graph")
		var overtone = null
		var level = document.getElementById("level")
		var bar = null
		var board = document.getElementById("board")
		var key = null
		var note = null
		var audio, power, volume, imag, real, wave, tone

	/*** audio ***/
		/* buildAudio */
			buildAudio()
			function buildAudio() {
				audio = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext)()
				
				power = audio.createGain()
				power.gain.value = 0
				power.connect(audio.destination)

				volume = audio.createGain()
				volume.gain.value = 0.75
				volume.connect(power)

				imag = new Float32Array([0, 1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0,0])
				real = new Float32Array(imag.length)
				wave = audio.createPeriodicWave(real, imag)

				tone = audio.createOscillator()
				tone.frequency.value = 220
				tone.setPeriodicWave(wave)
				tone.connect(volume)
				tone.start()
			}

		/* getFrequency */
			function getFrequency(note) {
				switch (note) {
					case 0: 			// C3
						return [130.81,"C",0,3]
					break
					case 1: 			// C#3 / Db3
						return [138.59, "C", 1, 3]
					break
					case 2: 			// D3
						return [146.83, "D", 0, 3]
					break
					case 3: 			// D#3 / Eb3
						return [155.56, "E", -1, 3]
					break
					case 4: 			// E3
						return [164.81, "E", 0, 3]
					break
					case 5: 			// F3
						return [174.61, "F", 0, 3]
					break
					case 6: 			// F#3 / Gb3
						return [185.00, "F", 1, 3]
					break
					case 7: 			// G
						return [196.00, "G", 0, 3]
					break
					case 8: 			// G#3 / Ab3
						return [207.65, "A", -1, 3]
					break
					case 9: 			// A3
						return [220.00, "A", 0, 3]
					break
					case 10: 			// A#3 / Bb3
						return [233.08, "B", -1, 3]
					break
					case 11: 			// B3
						return [246.94, "B", 0, 3]
					break
					case 12: 			// C4
						return [261.63, "C", 0, 4]
					break
					case 13: 			// C#4 / Db4
						return [277.18, "C", 1, 4]
					break
					case 14: 			// D4
						return [293.67, "D", 0, 4]
					break
					case 15: 			// D#4 / Eb4
						return [311.13, "E", -1, 4]
					break
					case 16: 			// E4
						return [329.63, "E", 0, 4]
					break
					case 17: 			// F4
						return [349.23, "F", 0, 4]
					break
					case 18: 			// F#4 / Gb4
						return [369.99, "F", 1, 4]
					break
					case 19: 			// G4
						return [392.00, "G", 0, 4]
					break
					case 20: 			// G#4 / Ab4
						return [415.30, "A", -1, 4]
					break
					case 21: 			// A4
						return [440.00, "A", 0, 4]
					break
					case 22: 			// A#4 / Bb4
						return [466.16, "B", -1, 4]
					break
					case 23: 			// B4
						return [493.88, "B", 0, 4]
					break
					case 24: 			// C5
						return [523.25, "C", 0, 5]
					break
					case 25: 			// C#5 / Db5
						return [554.37, "C", 1, 5]
					break
					default:
						return null
				}
			}

		/* getNote */
			function getNote(keycode) {
				switch (keycode) {
					case 65:
						return 0
					break
					case 87:
						return 1
					break
					case 83:
						return 2
					break
					case 69:
						return 3
					break
					case 68:
						return 4
					break
					case 70:
						return 5
					break
					case 84:
						return 6
					break
					case 71:
						return 7
					break
					case 89:
						return 8
					break
					case 72:
						return 9
					break
					case 85:
						return 10
					break
					case 74:
						return 11
					break
					case 75:
						return 12
					break
					case 79:
						return 13
					break
					case 76:
						return 14
					break
					case 80:
						return 15
					break
					case 186:
						return 16
					break
					case 222:
						return 17
					break
					case 221:
						return 18
					break
					case 13:
						return 19
					break
					case 220:
						return 20
					break
					default:
						return null
				}
			}
				
	/*** board ***/
		/* buildKeys */
			buildKeys()
			function buildKeys() {
				var count = 0
				var letters = ["a","w","s","e","d", "f","t","g","y","h","u","j","k","o","l","p",";","'","]","&#8629;","\\"]
				for (var i = 0; i <= 24; i++) {
					// build key
						var element = document.createElement("button")
							element.className = "key"
							element.id = "__" + i
							element.addEventListener("mousedown", selectKey)
							if (letters[i]) { element.innerHTML = letters[i] }
						board.appendChild(element)

					// color
						if ([1,3,6,8,10].includes(i % 12)) {
							element.setAttribute("color", "black")
							element.style.left = (100 / 15 * (count - 0.4)) + "%"
						}
						else {
							element.setAttribute("color", "white")
							element.style.left = (100 / 15 * count) + "%"
							count++
						}
				}
			}

		/* selectKey */
			function selectKey(event) {
				if (event.target.className == "key") {
					// deselect others
						var selected = Array.from(document.querySelectorAll(".key[selected]")) || []
						for (var s in selected) {
							selected[s].removeAttribute("selected")
						}

					// select
						board.setAttribute("grabbing", true)
						key = event.target
						key.setAttribute("selected", true)

					// audio
						var note = Number(key.id.slice(2))
						tone.frequency.value = getFrequency(note)[0]
						power.gain.value = 1
				}
			}

		/* pressKey */
			document.addEventListener("keydown", pressKey)
			function pressKey(event) {
				var press = getNote(event.which)
				if ((press !== null) && (press !== note)) {
					// deselect others
						var selected = Array.from(document.querySelectorAll(".key[selected]")) || []
						for (var s in selected) {
							selected[s].removeAttribute("selected")
						}

					// select
						note = press
						board.setAttribute("grabbing", true)
						key = document.getElementById("__" + note)
						key.setAttribute("selected", true)

					// audio
						tone.frequency.value = getFrequency(note)[0]
						power.gain.value = 1
				}
			}

	/*** level ***/
		/* selectBar */
			document.getElementById("level-bar").addEventListener("mousedown", selectBar)
			function selectBar(event) {
				if (event.target.id == "level-bar") {
					// select
						level.setAttribute("grabbing", true)
						bar = event.target
						bar.setAttribute("selected", true)
					
					// move
						moveBar(event)
				}
			}

		/* moveBar */
			document.addEventListener("mousemove", moveBar)
			function moveBar(event) {
				if (bar) {
					// display
						var rectangle  = document.getElementById("level").getBoundingClientRect()
						var percentage = (event.x - rectangle.left) * 100 / (rectangle.width)
							percentage = Math.min(100, Math.max(0, percentage))
						bar.style.width = percentage + "%"

					// audio
						volume.gain.value = percentage / 100
				}
			}

	/*** graph ***/
		/* buildOvertones */
			buildOvertones()
			function buildOvertones() {
				for (var i = 1; i <= 33; i++) {
					var element = document.createElement("div")
						element.className = "overtone"
						element.id = "_" + i
						element.style.height = ((i % 2 == 1) ? (100 / i) : 0) + "%"
						element.style.left = (i * 3) - 3 + "%"
						element.innerText = i
						element.addEventListener("mousedown", selectOvertone)
					graph.appendChild(element)
				}
			}

		/* selectOvertone */
			function selectOvertone(event) {
				if (event.target.className == "overtone") {
					// select
						graph.setAttribute("grabbing", true)
						overtone = event.target
						overtone.setAttribute("selected", true)

					// move
						moveOvertone(event)
				}
			}

		/* moveOvertone */
			document.addEventListener("mousemove", moveOvertone)
			function moveOvertone(event) {
				if (overtone) {
					// display
						var rectangle  = graph.getBoundingClientRect()
						var percentage = (rectangle.bottom - event.y) * 100 / (rectangle.height)
							percentage = Math.min(100, Math.max(0, percentage))
						overtone.style.height = percentage + "%"

					// audio
						var id = Number(overtone.id.slice(1))
						imag[id] = percentage / 100
						wave = audio.createPeriodicWave(real, imag)
						tone.setPeriodicWave(wave)
				}
			}

	/*** deselect ***/
		/* prevention */
			document.body.ondragstart = function() { return false }
			document.body.ondrop      = function() { return false }
		
		/* deselectAll */
			document.addEventListener("mouseup", deselectAll)
			function deselectAll(event) {
				// board
					if (key) {
						board.removeAttribute("grabbing")
						key.removeAttribute("selected")
						key = null
						note = null

						power.gain.value = 0
					}

				// level
					if (bar) {
						level.removeAttribute("grabbing")
						bar.removeAttribute("selected")
						bar = null
					}

				// graph
					if (overtone) {
						graph.removeAttribute("grabbing")
						overtone.removeAttribute("selected")
						overtone = null
					}
			}

		/* liftKey */
			document.addEventListener("keyup", liftKey)
			function liftKey(event) {
				if (key && (note == getNote(event.which))) {
					// display
						board.removeAttribute("grabbing")
						key.removeAttribute("selected")
						key = null
						note = null

					// audio
						power.gain.value = 0
				}
			}

}