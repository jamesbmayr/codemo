window.addEventListener("load", function() {
	/*** globals ***/
		/* triggers */
			if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
				var on = { click: "touchstart", mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" }
			}
			else {
				var on = { click:      "click", mousedown:  "mousedown", mousemove: "mousemove", mouseup:  "mouseup" }
			}

		/* status */
			var selected      = null
			var beat          = 0
			var timeSignature = 4
			var tempo         = 120
			var musicLoop     = null
			window.playing    = false

		/* elements */
			var grid          = document.getElementById("grid")
			var origin        = null

		/* notes */
			var notes = {
				"C":  [0, "rgb(250,50,50)"],
				"C#": [1, "rgb(200,100,0)"],
				"D":  [2, "rgb(150,150,0)"],
				"Eb": [3, "rgb(100,200,0)"],
				"E":  [4, "rgb(50,250,50)"],
				"F":  [5, "rgb(0,200,100)"],
				"F#": [6, "rgb(0,150,150)"],
				"G":  [7, "rgb(0,100,200)"],
				"Ab": [8, "rgb(50,50,250)"],
				"A":  [9, "rgb(100,0,200)"],
				"Bb": [10,"rgb(150,0,150)"],
				"B":  [11,"rgb(200,0,100)"]
			}

	/*** menu ***/
		/* buildMenu */
			buildMenu()
			function buildMenu() {
				var instruments = getInstruments().slice(1)
				for (var i in instruments) {
					var option = document.createElement("option")
						option.value     = instruments[i]
						option.innerText = instruments[i]

					if (instruments[i] == "honeyharp") {
						option.setAttribute("selected", true)
					}

					document.getElementById("menu-instrument").appendChild(option)
				}
			}

		/* openMenu */
			document.getElementById("menu-open").addEventListener(on.click, openMenu)
			function openMenu(event) {
				// menu
					document.getElementById("menu-open").setAttribute("hidden", true)
					document.getElementById("menu").removeAttribute("hidden")

				// other elements
					document.getElementById("grid").setAttribute("blur", true)
					document.getElementById("keyboard").setAttribute("hidden", true)
					selected = null
			}

		/* closeMenu */
			document.getElementById("menu-close").addEventListener(on.click, closeMenu)
			function closeMenu(event) {
				// menu
					document.getElementById("menu").setAttribute("hidden", true)
					document.getElementById("menu-open").removeAttribute("hidden")

				// other elements
					document.getElementById("grid").removeAttribute("blur")
			}

		/* pauseMusic */
			document.getElementById("menu-pause").addEventListener(on.click, pauseMusic)
			function pauseMusic() {
				document.getElementById("menu-pause").setAttribute("hidden", true)
				document.getElementById("menu-play").removeAttribute("hidden")

				window.playing = false
			}

		/* playMusic */
			document.getElementById("menu-play").addEventListener(on.click, playMusic)
			function playMusic() {
				document.getElementById("menu-play").setAttribute("hidden", true)
				document.getElementById("menu-pause").removeAttribute("hidden")

				window.playing = true
			}

		/* changeVolume */
			document.getElementById("menu-volume").addEventListener("change", changeVolume)
			function changeVolume() {
				if (window.instrument) {
					window.instrument.setParameters({volume: Number(document.getElementById("menu-volume").value)})
				}
			}

		/* changeTempo */
			changeTempo()
			document.getElementById("menu-tempo").addEventListener("change", changeTempo)
			function changeTempo() {
				tempo = Math.max(60, Math.min(240, Number(document.getElementById("menu-tempo").value)))

				clearInterval(musicLoop)
				musicLoop = setInterval(movePulses, 1000 / (tempo / 60))
			}

		/* changeTimesignature */
			document.getElementById("menu-timesignature").addEventListener("change", changeTimesignature)
			function changeTimesignature() {
				timeSignature = Math.max(1, Math.min(8, Number(document.getElementById("menu-timesignature").value)))
			}

		/* changeInstrument */
			document.getElementById("menu-instrument").addEventListener("change", changeInstrument)
			function changeInstrument() {
				window.instrument = buildInstrument(getInstrument(document.getElementById("menu-instrument").value))
				changeVolume()
			}

	/*** grid ***/
		/* buildGrid */
			buildGrid()
			function buildGrid() {
				for (var y = 0; y < 25; y++) {
					for (var x = 0; x < 25; x++) {
						var cell = document.createElement("button")
							cell.id = "_" + x + "_" + y
							cell.className = "cell"
							cell.value = ""
							cell.style["background-color"] = "#222222"
							cell.style["filter"] = "brightness(100%)"
							cell.addEventListener(on.click, showKeyboard)
						grid.appendChild(cell)

						if (y == 12 && x == 12) {
							cell.className += " origin"
							origin = cell
						}
					}
				}
			}

	/*** keyboard ***/
		/* buildKeyboard */
			buildKeyboard()
			function buildKeyboard() {
				// keys
					var key = document.createElement("button")
						key.id = "keyboard-null"
						key.className = "keyboard-white"
						key.value = "x"
						key.innerText = "[x]"
						key.addEventListener(on.click, closeKeyboard)
					document.getElementById("keyboard").appendChild(key)

					for (var n in notes) {
						var key = document.createElement("button")
							key.id = "keyboard-" + n
							key.className = (n.length == 1) ? "keyboard-white" : "keyboard-black"
							key.value = n
							key.innerText = n
							key.style["background-color"] = notes[n][1]
							key.style["filter"] = "brightness(150%)"
							key.addEventListener(on.click, closeKeyboard)
						document.getElementById("keyboard").appendChild(key)
					}
			}

		/* showKeyboard */
			function showKeyboard(event) {
				// reset keyboard
					var keys = Array.from(document.querySelectorAll(".keyboard-white")).concat(Array.from(document.querySelectorAll(".keyboard-black")))
					for (var k in keys) {
						keys[k].removeAttribute("selected")
					}
					document.getElementById("keyboard").removeAttribute("hidden")

				// set values
					selected     = event.target
					var temp     = selected.value.split("\n")
					if (temp[0]) {
						document.getElementById("keyboard-" + temp[0]).setAttribute("selected", true)
					}
					if (temp[1]) {
						document.getElementById("keyboard-octave").value = temp[1]
					}

				// other elements
					document.getElementById("grid").setAttribute("blur", true)
					document.getElementById("menu").setAttribute("hidden", true)
					document.getElementById("menu-open").removeAttribute("hidden")
			}

		/* closeKeyboard */
			document.getElementById("keyboard-close").addEventListener(on.click, closeKeyboard)
			function closeKeyboard(event) {
				if (event.target.className == "keyboard-white" || event.target.className == "keyboard-black") {
					// values
						var octave = Number(document.getElementById("keyboard-octave").value)
						var pitch = event.target.value + "\n" + octave
						selected.value = pitch
						selected.innerText = event.target.value || ""

					// sound
						if (event.target.value == "x") {
							selected.style["background-color"] = "#222222"
							selected.style["filter"] = "brightness(100%)"
							selected.removeAttribute("sound")
							selected.innerText = selected.value = ""
						}
						else if (event.target.value) {
							selected.style["background-color"] = notes[event.target.value][1]
							selected.style["filter"] = "brightness(" + (50 + octave * 25) + "%)"
							selected.setAttribute("sound", true)
						}

					// reset
						selected = null
						document.getElementById("keyboard").setAttribute("hidden", true)
						document.getElementById("grid").removeAttribute("blur")
				}
				else if (event.target.id == "keyboard-close") {
					// reset
						selected = null
						document.getElementById("keyboard").setAttribute("hidden", true)
						document.getElementById("grid").removeAttribute("blur")
				}
			}

		/* changeOctave */
			document.getElementById("keyboard-octave").addEventListener("change", changeOctave)
			function changeOctave(event) {
				var octave = Number(document.getElementById("keyboard-octave").value)
				var keys = Array.from(document.querySelectorAll(".keyboard-white")).concat(Array.from(document.querySelectorAll(".keyboard-black")))

				for (var k in keys) {
					keys[k].style["filter"] = "brightness(" + (50 + octave * 25) + "%)"
				}
			}

	/*** music ***/
		/* getNote */
			function getNote(element) {
				var temp = element.value.split("\n")
				var pitch = notes[temp[0]][0] + 12 + (12 * temp[1])

				return pitch
			}

		/* playNote */
			function playNote(pitch) {
				if (window.instrument && window.playing) {
					window.instrument.press(getFrequency(pitch)[0])
					window.instrument.lift( getFrequency(pitch)[0], 0.2)
				}
			}

		/* movePulses */
			function movePulses() {
				if (window.playing) {
					// existing pulses
						var pulses = Array.from(document.querySelectorAll("[pulse]"))
						for (var p in pulses) {
							// coordinates
								var temp = pulses[p].id.split("_")
								var x = Number(temp[1])
								var y = Number(temp[2])

							// neighbors
								var up    = document.querySelector("#_" + (x) + "_" + (y - 1) + ".cell[sound]:not([pulse]):not([fade])")
								var right = document.querySelector("#_" + (x + 1) + "_" + (y) + ".cell[sound]:not([pulse]):not([fade])")
								var down  = document.querySelector("#_" + (x) + "_" + (y + 1) + ".cell[sound]:not([pulse]):not([fade])")
								var left  = document.querySelector("#_" + (x - 1) + "_" + (y) + ".cell[sound]:not([pulse]):not([fade])")

							// up
								if (up) {
									up.setAttribute("pulse", true)
									playNote(getNote(up))
								}

							// right
								if (right) {
									right.setAttribute("pulse", true)
									playNote(getNote(right))
								}

							// down
								if (down) {
									down.setAttribute("pulse", true)
									playNote(getNote(down))
								}

							// left
								if (left) {
									left.setAttribute("pulse", true)
									playNote(getNote(left))
								}

							// none
								pulses[p].setAttribute("fade",  true)
						}

					// fades
						var fades  = Array.from(document.querySelectorAll("[fade]"))
						for (var f in fades) {
							if (fades[f].getAttribute("pulse")) {
								fades[f].removeAttribute("pulse")
							}
							else {
								fades[f].removeAttribute("fade")
							}
						}

					// new pulse
						beat++
						if (beat % timeSignature == 0) {
							origin.setAttribute("pulse", true)

							if (origin.getAttribute("sound")) {
								playNote(getNote(origin))
							}
						}
				}
			}
})
