window.addEventListener("load", function() {

	/*** globals ***/
		var tool = null
		var parameter = null
		var key = null

		/* prevention */
			document.body.ondragstart = function() { return false }
			document.body.ondrop      = function() { return false }

	/*** tools ***/
		/* selectTool */
			Array.from(document.querySelectorAll("#switcher button")).forEach(function(b) { b.addEventListener("click", selectTool) })
			function selectTool(event) {
				// deselect all tools & buttons
					Array.from(document.querySelectorAll("#switcher button")).forEach(function(b) {
						b.removeAttribute("selected")
						document.getElementById(b.value).removeAttribute("selected")
					})

				// select tool & button
					event.target.setAttribute("selected", true)
					tool = document.getElementById(event.target.value)
					tool.setAttribute("selected", true)
			}

		/* buildTools */
			buildTools()
			function buildTools() {
				buildMetaTools()
				buildWaveTool()
				buildEnvelopeTool()
				buildEchoTool()
				buildKeyboard()

				selectTool({target: Array.from(document.querySelectorAll("#switcher button[value='tool-envelope']"))[0]})
			}

	/*** bars & inputs ***/
		/* selectBar */
			Array.from(document.querySelectorAll(".bar")).forEach(function (p) { p.addEventListener("mousedown", selectBar) })
			Array.from(document.querySelectorAll(".shape")).forEach(function (p) { p.addEventListener("mousedown", selectBar) })
			function selectBar(event) {
				if (tool) {
					parameter = event.target
					event.target.setAttribute("selected", true)
					tool.setAttribute("grabbing", true)

					moveBar(event)
				}
			}

		/* moveBar */
			document.addEventListener("mousemove", moveBar)
			function moveBar(event) {
				if (tool && parameter) {
					switch (tool.id) {
						case "tool-meta":
							adjustVolumeToolBar(event)
						break
						case "tool-wave": 
							adjustWaveToolBar(event)
						break
						case "tool-envelope":
							adjustEnvelopeToolBar(event)
						break
						case "tool-echo":
							adjustEchoToolBar(event)
						break
					}
				}
			}

		/* deselectBar */
			document.addEventListener("mouseup", deselectBar)
			function deselectBar(event) {
				if (tool && parameter) {
					tool.removeAttribute("grabbing")
					parameter.removeAttribute("selected")
					parameter = null	
				}
			}

		/* changeInput */
			Array.from(document.querySelectorAll("input")).forEach(function (i) { i.addEventListener("change", changeInput) })
			function changeInput(event) {
				if (tool) {
					switch (tool.id) {
						case "tool-meta":
							adjustVolumeToolInput(event)
						break
						case "tool-wave": 
							adjustWaveToolInput(event)
						break
						case "tool-envelope":
							adjustEnvelopeToolInput(event)
						break
						case "tool-echo":
							adjustEchoToolInput(event)
						break
					}
				}
			}

	/*** tool-meta ***/
		/* buildMetaTools */
			function buildMetaTools() {
				var metaTool = document.getElementById("tool-meta")

				// name
					var element = document.createElement("input")
						element.id = "tool-meta-name"
						element.setAttribute("placeholder", "instrument name")
						element.addEventListener("change", changeName)
					metaTool.appendChild(element)

				// volume
					var element = document.createElement("div")
						element.id = "tool-meta-volume"
					metaTool.appendChild(element)

					var button = document.createElement("button")
						button.id = "tool-meta-power"
						button.setAttribute("selected", true)
						button.addEventListener("click", changePower)
						button.innerHTML = '<span class="fas fa-power-off"></span>'
					element.appendChild(button)

					var input = document.createElement("input")
						input.setAttribute("type", "number")
						input.setAttribute("min", 0)
						input.setAttribute("max", 100)
						input.className = "input"
						input.id = "tool-meta-volume-input"
						input.value = 75
					element.appendChild(input)

					var track = document.createElement("div")
						track.id = "tool-meta-volume-track"
						track.className = "track"
					element.appendChild(track)

					var bar = document.createElement("div")
						bar.id = "tool-meta-volume-bar"
						bar.className = "bar"
						bar.style.width = "75%"
						bar.innerHTML = '<span class="fas fa-volume-up"></span>'
					track.appendChild(bar)
			}

		/* changeName */
			function changeName(event) {
				if (event.target.id == "tool-meta-name") {
					window.instrument.setParameters({ name: event.target.value })
				}
			}

		/* changePower */
			function changePower(event) {
				if (event.target.id == "tool-meta-power") {
					if (event.target.getAttribute("selected")) {
						event.target.removeAttribute("selected")
						window.instrument.setParameters({ power: 0 })
					}
					else {
						event.target.setAttribute("selected", true)
						window.instrument.setParameters({ power: 1 })
					}
				}
			}

		/* adjustVolumeToolBar */
			function adjustVolumeToolBar(event) {
				// display
					var rectangle  = document.getElementById("tool-meta-volume-track").getBoundingClientRect()
					var input = document.getElementById("tool-meta-volume-input")

					var percentage = (event.x - rectangle.left) * 100 / (rectangle.width)
						percentage = Math.min(100, Math.max(0, percentage))
					parameter.style.width = percentage + "%"
					input.value = percentage

				// data
					adjustVolumeToolInput({target: input})
			}

		/* adjustVolumeToolInput */
			function adjustVolumeToolInput(event) {
				// display
					var bar = document.getElementById("tool-meta-volume-bar")
					var percentage = Number(event.target.value)
						percentage = Math.min(100, Math.max(0, percentage))
					bar.style.width = percentage + "%"

				// audio
					window.instrument.setParameters({ volume: (percentage / 100) })
			}

	/*** tool-polysynth ***/

	/*** tool-wave ***/	
		/* buildWaveTool */
			function buildWaveTool() {
				var waveTool = document.getElementById("tool-wave")

				for (var i = 1; i <= 33; i++) {
					var input = document.createElement("input")
						input.setAttribute("type", "number")
						input.setAttribute("min", 0)
						input.setAttribute("max", 100)
						input.className = "input"
						input.id = "tool-wave-input--" + i
						input.style.left = (i * 3) - 1.5 + "%"
						input.value = ((i % 2 == 1) ? (100 / i) : 0)
					waveTool.appendChild(input)

					var track = document.createElement("div")
						track.className = "track"
						track.id = "tool-wave-track--" + i
						track.style.left = (i * 3) - 1.5 + "%"
					waveTool.appendChild(track)

					var bar = document.createElement("div")
						bar.className = "bar"
						bar.id = "tool-wave-bar--" + i
						bar.style.height = ((i % 2 == 1) ? (100 / i) : 0) + "%"
						bar.innerText = i
					track.appendChild(bar)
				}
			}

		/* adjustWaveToolBar */
			function adjustWaveToolBar(event) {
				// display
					var harmonic   = parameter.id.split("--")[1]
					var rectangle  = document.getElementById("tool-wave-track--" + harmonic).getBoundingClientRect()
					var input = document.getElementById("tool-wave-input--" + harmonic)

					var percentage = (rectangle.bottom - event.y) * 100 / (rectangle.height)
						percentage = Math.min(100, Math.max(0, percentage))
					parameter.style.height = percentage + "%"
					input.value = percentage

				// data
					adjustWaveToolInput({target: input})
			}

		/* adjustWaveToolInput */
			function adjustWaveToolInput(event) {
				// display
					var harmonic   = event.target.id.split("--")[1]
					var bar        = document.getElementById("tool-wave-bar--" + harmonic)
					var percentage = Number(event.target.value)
						percentage = Math.min(100, Math.max(0, percentage))
					bar.style.height = percentage + "%"

				// audio
					var harmonic = {}
						harmonic[event.target.id.split("--")[1]] = percentage / 100
					window.instrument.setParameters({harmonic: harmonic})
			}

	/*** tool-envelope ***/	
		/* buildEnvelopeTool */
			function buildEnvelopeTool() {
				var envelopeTool = document.getElementById("tool-envelope")

				// track
					var track = document.createElement("track")
						track.className = "track"
						track.id = "tool-envelope-track"
					envelopeTool.appendChild(track)

				// attack
					var attack = document.createElement("div")
						attack.className = "shape"
						attack.id = "tool-envelope-shape--attack"
						attack.style.width = "15.8114%"
						attack.innerHTML = "&#8672;attack&#8674;"
					track.appendChild(attack)

					var input = document.createElement("input")
						input.setAttribute("type", "number")
						input.setAttribute("min", 0)
						input.setAttribute("max", 100)
						input.className = "input"
						input.id = "tool-envelope-input--attack"
						input.value = 40
					envelopeTool.appendChild(input)

				// decay
					var decay = document.createElement("div")
						decay.className = "shape"
						decay.id = "tool-envelope-shape--decay"
						decay.style.left = "15.8114%"
						decay.style.width = "19.3649%"
						decay.innerHTML = "&#8672;decay&#8674;"
						decay.style["clip-path"] = "polygon(0% 0%, 0% 100%, 100% 100%, 100% 50%)"
					track.appendChild(decay)

					var input = document.createElement("input")
						input.setAttribute("type", "number")
						input.setAttribute("min", 0)
						input.setAttribute("max", 100)
						input.className = "input"
						input.id = "tool-envelope-input--decay"
						input.style.left = "15.8114%"
						input.value = 60
					envelopeTool.appendChild(input)

				// sustain
					var sustain = document.createElement("div")
						sustain.className = "shape"
						sustain.id = "tool-envelope-shape--sustain"
						sustain.style.left = "35.1763%"
						sustain.style.width = "45.4588%"
						sustain.style.height = "50%"
						sustain.innerHTML = "&#8673;sustain&#8675;"
					track.appendChild(sustain)

					var input = document.createElement("input")
						input.setAttribute("type", "number")
						input.setAttribute("min", 0)
						input.setAttribute("max", 100)
						input.className = "input"
						input.id = "tool-envelope-input--sustain"
						input.style.left = "35.1763%"
						input.value = 50
					envelopeTool.appendChild(input)

				// release
					var release = document.createElement("div")
						release.className = "shape"
						release.id = "tool-envelope-shape--release"
						release.style.width = "19.3649%"
						release.style.height = "50%"
						release.innerHTML = "&#8672;release&#8674;"
					track.appendChild(release)

					var input = document.createElement("input")
						input.setAttribute("type", "number")
						input.setAttribute("min", 0)
						input.setAttribute("max", 100)
						input.className = "input"
						input.id = "tool-envelope-input--release"
						input.style.left = "80.6351%"
						input.value = 60
					envelopeTool.appendChild(input)
			}

		/* adjustEnvelopeToolBar */
			function adjustEnvelopeToolBar(event) {
				// display
					var rectangle = document.getElementById("tool-envelope-track").getBoundingClientRect()
					var shape     = parameter.getBoundingClientRect()
					var type      = parameter.id.split("--")[1]
					var input     = document.getElementById("tool-envelope-input--" + type)
					
					switch (type) {
						case "attack":
						case "decay":
							var percentage = (event.x - shape.left) * 100 / (rectangle.width)
								percentage = Math.min(25, Math.max(0, percentage))
							parameter.style.width = percentage + "%"
							input.value = Math.pow(percentage * 4 / 10, 2)
						break
						case "release":
							var percentage = (shape.right - event.x) * 100 / (rectangle.width)
								percentage = Math.min(25, Math.max(0, percentage))
							parameter.style.width = percentage + "%"
							input.value = Math.pow(percentage * 4 / 10, 2)
						break
						case "sustain":
							var percentage = (rectangle.bottom - event.y) * 100 / (rectangle.height)
								percentage = Math.min(100, Math.max(0, percentage))
							parameter.style.height = percentage + "%"
							input.value = percentage
						break
					}

				// data
					adjustEnvelopeToolInput({target: input})
			}

		/* adjustEnvelopeToolInput */
			function adjustEnvelopeToolInput(event) {
				// inputs
					var attackInput  = document.getElementById("tool-envelope-input--attack" )
					var decayInput   = document.getElementById("tool-envelope-input--decay"  )
					var sustainInput = document.getElementById("tool-envelope-input--sustain")
					var releaseInput = document.getElementById("tool-envelope-input--release")

				// shapes
					var attackShape  = document.getElementById("tool-envelope-shape--attack" )
					var decayShape   = document.getElementById("tool-envelope-shape--decay"  )
					var sustainShape = document.getElementById("tool-envelope-shape--sustain")
					var releaseShape = document.getElementById("tool-envelope-shape--release")

				// values
					var attackValue  = Math.min(100, Math.max(0, attackInput.value ))
						attackValue  = Math.pow(attackValue,  0.5) * 10 / 4
					var decayValue   = Math.min(100, Math.max(0, decayInput.value  ))
						decayValue   = Math.pow(decayValue,   0.5) * 10 / 4
					var sustainValue = Math.min(100, Math.max(0, sustainInput.value))
					var releaseValue = Math.min(100, Math.max(0, releaseInput.value))
						releaseValue = Math.pow(releaseValue, 0.5) * 10 / 4

				// display
					attackShape.style.width   = Math.max(2, attackValue) + "%"
					
					decayShape.style["clip-path"] = "polygon(0% 0%, 0% 100%, 100% 100%, 100% " + (100 - sustainValue) + "%)"
					decayShape.style.width    = Math.max(2, decayValue) + "%"
					decayShape.style.left     = Math.max(2, attackValue) + "%"
					decayInput.style.left     = Math.max(2, attackValue) + "%"

					releaseShape.style.width  = Math.max(2, releaseValue) + "%"
					releaseShape.style.height = sustainValue + "%"
					releaseInput.style.left   = 100 - Math.max(2, releaseValue) + "%"

					sustainShape.style.width  = 100 - Math.max(2, attackValue) - Math.max(2, decayValue) - Math.max(2, releaseValue) + "%"
					sustainShape.style.height = sustainValue + "%"
					sustainShape.style.left   = Math.max(2, attackValue) + Math.max(2, decayValue) + "%"
					sustainInput.style.left   = Math.max(2, attackValue) + Math.max(2, decayValue) + "%"

				// audio
					var envelope = {
						attack:  (Math.min(100, Math.max(0, attackInput.value )) / 100),
						decay:   (Math.min(100, Math.max(0, decayInput.value  )) / 100),
						sustain: (Math.min(100, Math.max(0, sustainInput.value)) / 100),
						release: (Math.min(100, Math.max(0, releaseInput.value)) / 100)
					}

					window.instrument.setParameters({ envelope: envelope })
			}

	/*** tool-echo ***/
		/* buildEchoTool */
			function buildEchoTool() {
				var echoTool = document.getElementById("tool-echo")

				// feedback
					var track = document.createElement("div")
						track.id = "tool-echo-track--feedback"
						track.className = "track"
					echoTool.appendChild(track)

					var bar = document.createElement("div")
						bar.id = "tool-echo-bar--feedback"
						bar.className = "bar"
						bar.innerHTML = '<span class="fas fa-arrows-alt-v"></span>'
						bar.style.height = 0.8 * 100 + "%"
					track.appendChild(bar)

					var input = document.createElement("input")
						input.setAttribute("type", "number")
						input.setAttribute("min", 0)
						input.setAttribute("max", 100)
						input.className = "input"
						input.id = "tool-echo-input--feedback"
						input.value = 80
					echoTool.appendChild(input)

				// delay
					var track = document.createElement("div")
						track.id = "tool-echo-track--delay"
						track.className = "track"
					echoTool.appendChild(track)

					var bar = document.createElement("div")
						bar.id = "tool-echo-bar--delay"
						bar.className = "bar"
						bar.innerHTML = '<span class="fas fa-arrows-alt-h"></span>'
						bar.style.left = "9%"
						bar.style.height = 0.8 * 0.8 * 100 + "%"
					track.appendChild(bar)

					var input = document.createElement("input")
						input.setAttribute("type", "number")
						input.setAttribute("min", 0)
						input.setAttribute("max", 100)
						input.className = "input"
						input.id = "tool-echo-input--delay"
						input.value = 10
						input.style.left = "11.7%"
					echoTool.appendChild(input)

				// echoes
					var track = document.createElement("div")
						track.id = "tool-echo-track--echoes"
						track.className = "track"
					echoTool.appendChild(track)

					for (var i = 3; i < 33; i++) {
						var beam = document.createElement("div")
							beam.className = "beam"
							beam.id = "tool-echo-bar--" + i
							beam.style.height = Math.pow(0.8, i) * 100 + "%"
							beam.style.left   = 0.1 * (i - 1) * 100 + "%"
						track.appendChild(beam)
					}
			}

		/* adjustEchoToolBar */
			function adjustEchoToolBar(event) {
				// display
					var type      = parameter.id.split("--")[1]
					var shape     = parameter.getBoundingClientRect()
					var rectangle = document.getElementById("tool-echo-track--" + type).getBoundingClientRect()
					var input     = document.getElementById("tool-echo-input--" + type)

					switch (type) {
						case "feedback":
							var percentage = (rectangle.bottom - event.y) * 100 / (rectangle.height)
								percentage = Math.min(100, Math.max(0, percentage))
							parameter.style.height = percentage + "%"
							input.value = percentage
						break
						case "delay":
							var percentage = (event.x - rectangle.left) * 100 / (rectangle.width)
								percentage = Math.min(100, Math.max(0, percentage))
							parameter.style.left = percentage + "%"
							input.value = percentage
						break
					}

				// data
					adjustEchoToolInput({target: input})
			}

		/* adjustEchoToolInput */
			function adjustEchoToolInput(event) {
				// inputs
					var feedbackInput = document.getElementById("tool-echo-input--feedback")
					var delayInput    = document.getElementById("tool-echo-input--delay")

				// beams
					var feedbackBeam  = document.getElementById("tool-echo-bar--feedback")
					var delayBeam     = document.getElementById("tool-echo-bar--delay")
					var beams         = Array.from(document.querySelectorAll("#tool-echo .beam"))

				// values
					var feedbackValue = Math.min(100, Math.max(0, feedbackInput.value))
					var delayValue    = Math.min(100, Math.max(0, delayInput.value   ))

				// display
					feedbackBeam.style.height = feedbackValue + "%"

					delayBeam.style.left      = delayValue - 1 + "%"
					delayBeam.style.height    =	Math.pow((feedbackValue / 100), 2) * 100 + "%"
					delayInput.style.left     = (2 + (delayValue / 100 * 94)) + "%"

					beams.forEach(function (b) {
						var i = b.id.split("--")[1]
						b.style.left   = delayValue * (i - 1) + "%"
						b.style.height = Math.pow((feedbackValue / 100), i) * 100 + "%"
					})

				// audio
					var echo = {
						delay:    delayValue / 100,
						feedback: feedbackValue / 100
					}
					window.instrument.setParameters({ echo: echo })

			}

	/*** helpers ***/
		/* getKey */
			function getKey(keycode) {
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

		/* getFrequency */
			function getFrequency(note) {
				note = Math.max(0, Math.min(36, Number(note) || 0))

				switch (note) {
					case 0: 			// C3
						return [130.81, "C", 0, 3]
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
					case 26: 			// D5
						return [587.33, "D", 0, 5]
					break
					case 27: 			// D#5 / Eb5
						return [622.25, "E", -1, 5]
					break
					case 28: 			// E5
						return [659.25, "E", 0, 5]
					break
					case 29: 			// F5
						return [698.46, "F", 0, 5]
					break
					case 30: 			// F#5 / Gb5
						return [739.99, "F", 1, 5]
					break
					case 31: 			// G5
						return [783.99, "G", 0, 5]
					break
					case 32: 			// G#5 / Ab5
						return [830.61, "A", -1, 5]
					break
					case 33: 			// A5
						return [880.00, "A", 0, 5]
					break
					case 34: 			// A#5 / Bb5
						return [932.33, "B", -1, 5]
					break
					case 35: 			// B5
						return [987.77, "B", 0, 5]
					break
					case 36: 			// C6
						return [1046.50, "C", 0, 6]
					break
					default:
						return false
				}
			}

	/*** keyboard ***/
		/* buildKeyboard */
			function buildKeyboard() {
				// data
					var keyboard = document.getElementById("keyboard")
					var count = 0
					var letters = ["a","w","s","e","d", "f","t","g","y","h","u","j","k","o","l","p",";","'","]","&#8629;","\\"]
				
				for (var i = 0; i <= 24; i++) {
					// build key
						var element = document.createElement("button")
							element.className = "key"
							element.id = "key--" + i
							if (letters[i]) { element.innerHTML = letters[i] }
						keyboard.appendChild(element)

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

		/* pressKey */
			Array.from(document.querySelectorAll(".key")).forEach(function (k) { k.addEventListener("mousedown", pressKey) })
			document.addEventListener("keydown", pressKey)
			function pressKey(event) {		
				// keyboard or mouse?
					if (event.type == "mousedown") {
						var press = event.target
						key = press
					}
					else if (event.type == "keydown") {
						if (document.activeElement.tagName !== "INPUT") {
							var press = document.getElementById("key--" + getKey(event.which))
						}
					}
				
				// select
					if (press && !press.getAttribute("selected") && window.instrument) {
						press.setAttribute("selected", true)
						window.instrument.press(getFrequency(press.id.split("--")[1])[0])
					}
			}

		/* liftKey */
			document.addEventListener("mouseup", liftKey)
			document.addEventListener("keyup", liftKey)
			function liftKey(event) {
				// keyboard or mouse?
					if ((event.type == "mouseup") && key) {
						var lift = key
						key = null
					}
					else if (event.type == "keyup") {
						if (document.activeElement.tagName !== "INPUT") {
							var lift = document.getElementById("key--" + getKey(event.which))
						}
					}
				
				// deselect			
					if (lift && window.instrument) {
						lift.removeAttribute("selected")
						window.instrument.lift(getFrequency(lift.id.split("--")[1])[0])
					}
			}

})