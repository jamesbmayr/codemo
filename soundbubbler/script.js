window.addEventListener("load", function() {
	/*** globals ***/
		/* triggers */
			if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
				var on = { click: "touchstart", mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" }
			}
			else {
				var on = { click:      "click", mousedown:  "mousedown", mousemove: "mousemove", mouseup:  "mouseup" }
			}

		/* prevention */
			document.body.ondragstart   = function() { return false }
			document.body.ondrop        = function() { return false }
			document.body.oncontextmenu = function() { return false }

		/* elements */
			var overlay = document.getElementById("overlay")
			var controlsInstrument = document.getElementById("controls-instrument")
			var controlsVolume = document.getElementById("controls-volume")
			var controlsSpeed = document.getElementById("controls-speed")
			var controlsRadius = document.getElementById("controls-radius")
			var controlsShrink = document.getElementById("controls-shrink")
			var keyboard = document.getElementById("keyboard")

		/* objects */
			var key = null
			window.circleSpeed  = 5
			window.circleRadius = 100
			window.circleShrink = 1

		/* variables */
			var firstKey = 48
			var lastKey = 72
			var octaveKeys = 12
			var drawInterval = 10

	/*** overlay ***/
		/* clickOverlay */
			overlay.addEventListener(on.click, clickOverlay)
			function clickOverlay(event) {
				overlay.remove()
				if (!window.audio) {
					buildAudio()
					window.instrument = buildInstrument(window.getInstrument("random"))
					window.updateLoop = setInterval(window.updateCanvas, drawInterval)
				}
			}

	/*** controls ***/
		/* createInstrumentList */
			createInstrumentList()
			function createInstrumentList() {
				var instruments = getInstruments()

				for (var i in instruments) {
					var option = document.createElement("option")
						option.value = instruments[i]
						option.innerText = instruments[i]
					controlsInstrument.appendChild(option)
				}
			}

		/* changeInstrument */
			controlsInstrument.addEventListener("change", changeInstrument)
			function changeInstrument(event) {
				var name = event.target.value

				try {
					window.audio.close().then(function() {
						window.buildAudio()

						var parameters = getInstrument(name)
						window.instrument = buildInstrument(parameters)
						controlsInstrument.blur()
					})
				}
				catch (error) { }
			}

		/* changeVolume */
			controlsVolume.addEventListener("change", changeVolume)
			function changeVolume(event) {
				try {
					var volume = Math.min(1, Math.max(0, Number(event.target.value)))
					window.instrument.setParameters({volume: volume})
					controlsVolume.blur()
				}
				catch (error) { }
			}

		/* changeSpeed */
			controlsSpeed.addEventListener("change", changeSpeed)
			function changeSpeed(event) {
				window.circleSpeed = Math.max(1, Math.min(20, Number(event.target.value)))
			}

		/* changeRadius */
			controlsRadius.addEventListener("change", changeRadius)
			function changeRadius(event) {
				window.circleRadius = Math.max(10, Math.min(100, Number(event.target.value)))
			}

		/* changeShrink */
			controlsShrink.addEventListener("change", changeShrink)
			function changeShrink(event) {
				window.circleShrink = Math.max(0, Math.min(5, Number(event.target.value)))
			}

	/*** helpers ***/
		/* getKey */
			function getKey(keycode) {
				switch (keycode) {
					case 65:
						return 48
					break
					case 87:
						return 49
					break
					case 83:
						return 50
					break
					case 69:
						return 51
					break
					case 68:
						return 52
					break
					case 70:
						return 53
					break
					case 84:
						return 54
					break
					case 71:
						return 55
					break
					case 89:
						return 56
					break
					case 72:
						return 57
					break
					case 85:
						return 58
					break
					case 74:
						return 59
					break
					case 75:
						return 60
					break
					case 79:
						return 61
					break
					case 76:
						return 62
					break
					case 80:
						return 63
					break
					case 186:
						return 64
					break
					case 222:
						return 65
					break
					case 221:
						return 66
					break
					case 13:
						return 67
					break
					case 220:
						return 68
					break
					default:
						return null
				}
			}

	/*** keyboard ***/
		/* buildKeyboard */
			buildKeyboard()
			function buildKeyboard() {
				// data
					var count = 0
					var letters = ["a","w","s","e","d", "f","t","g","y","h","u","j","k","o","l","p",";","'","]","&#8629;","\\"]
				
				for (var i = firstKey; i <= lastKey; i++) {
					// build key
						var element = document.createElement("button")
							element.className = "key"
							element.id = "key--" + i
							element.value = i
							if (letters[i - firstKey]) { element.innerHTML = letters[i - firstKey] }
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
			Array.from(document.querySelectorAll(".key")).forEach(function (k) { k.addEventListener(on.mousedown, pressKey) })
			document.addEventListener("keydown", pressKey)
			function pressKey(event) {		
				// keyboard or mouse?
					if (event.type == on.mousedown) {
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
						var frequency = window.getFrequency(press.value)
						window.instrument.press(frequency[0])
						window.createCircle(press.value, frequency)
					}
			}

		/* liftKey */
			document.addEventListener(on.mouseup,  liftKey)
			document.addEventListener("keyup",    liftKey)
			function liftKey(event) {
				// keyboard or mouse?
					if ((event.type == on.mouseup) && key) {
						var lift = key
						key = null
					}
					else if (event.type == "keyup") {
						if (document.activeElement.tagName !== "INPUT") {
							var lift = document.getElementById("key--" + getKey(event.which))
						}
					}

				// mobile deselection
					if (event.type == on.mouseup && on.mouseup == "touchend" && window.instrument) {
						document.querySelectorAll(".key").forEach(function(k) {
							k.removeAttribute("selected")
							window.instrument.lift(window.getFrequency(k.value)[0])
							window.deactivateCircles(k.value)
						})
					}
				
				// deselect
					else if (lift && window.instrument) {
						lift.removeAttribute("selected")
						window.instrument.lift(window.getFrequency(lift.value)[0])
						window.deactivateCircles(lift.value)
					}
			}
})