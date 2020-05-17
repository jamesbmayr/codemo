window.addEventListener("load", function() {
	/*** globals ***/
		/* triggers */
			if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
				var TRIGGERS = { click: "touchstart", mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" }
			}
			else {
				var TRIGGERS = { click:      "click", mousedown:  "mousedown", mousemove: "mousemove", mouseup:  "mouseup" }
			}

		/* constants */
			var CONSTANTS = {
				wheelCount: 6,
				notchEffectChance: 0.85,
				maxNotchEffect: 2,
				symbolSet: [1,2,3,4,5,6],
				solution: null,
				circle: 360
			}

		/* elements */
			var ELEMENTS = {
				body: document.body,
				container: document.querySelector("#container"),
				overlay: document.querySelector("#overlay"),
				overlayButton: document.querySelector("#overlay-button")
			}

		/* gamestate */
			var GAMESTATE = {}

	/*** tools ***/
		/* generateRandom */
			function generateRandom() {
				var set = "abcdefghijklmnopqrstuvwxyz"
				var length = 16
				var output = ""
				while (output.length < length) {
					output += set[Math.floor(Math.random() * set.length)]
				}
				return output
			}

		/* chooseRandom */
			function chooseRandom(array) {
				if (!Array.isArray(array)) {
					return array
				}

				return array[Math.floor(Math.random() * array.length)]
			}

		/* rollRandom */
			function rollRandom(count) {
				return Math.floor(Math.random() * count) + 1
			}

		/* buildGet */
			function buildGet() {
				// no query parameters?
					if (!location.search || location.search.length <= 1) {
						return null
					}

				// query parameters?
					var GET = {}
					var queryString = location.search.slice(1).split("&")
					for (var i in queryString) {
						var pair = queryString[i].split("=")
						GET[pair[0]] = pair[1]
					}

					return GET
			}

	/*** create ***/
		/* createGame */
			ELEMENTS.overlayButton.addEventListener(TRIGGERS.click, createGame)
			function createGame() {
				// reset game object
					GAMESTATE = {
						playing: false,
						wheels: {}
					}

				// clear out game
					ELEMENTS.container.innerHTML = ""

				// create parameters
					createParameters()

				// create wheels
					for (var i = 0; i < CONSTANTS.wheelCount; i++) {
						var wheel = createWheel(i)
						GAMESTATE.wheels[wheel.id] = wheel
					}

				// create notch effects
					var ids = Object.keys(GAMESTATE.wheels)
					for (var i in ids) {
						createNotchEffects(ids, GAMESTATE.wheels[ids[i]])
					}

				// start game
					GAMESTATE.playing = true
					ELEMENTS.body.setAttribute("gameplay", true)
			}

		/* createParameters */
			function createParameters() {
				// get?
					var GET = buildGet()
					if (!GET) {
						return
					}

				// update numbers
					if (GET.wheelCount && !isNaN(GET.wheelCount)) {
						CONSTANTS.wheelCount = GET.wheelCount
					}
					if (GET.notchEffectChance && !isNaN(GET.notchEffectChance)) {
						CONSTANTS.notchEffectChance = GET.notchEffectChance
					}
					if (GET.maxNotchEffect && !isNaN(GET.maxNotchEffect)) {
						CONSTANTS.maxNotchEffect = GET.maxNotchEffect
					}

				// set
					if (GET.symbolSet) {
						CONSTANTS.symbolSet = GET.symbolSet.split(/,/gi)
					}

				// solution
					if (GET.solution) {
						CONSTANTS.solution = GET.solution.split(/,/gi)
					}
			}

		/* createWheel */
			function createWheel(wheelIndex) {
				// notch
					var notchDegrees = CONSTANTS.circle / CONSTANTS.symbolSet.length

				// object
					var wheel = {
						id: generateRandom(),
						rotation: rollRandom(CONSTANTS.symbolSet.length) * notchDegrees % CONSTANTS.circle,
						onCW: null,
						onCCW: null,
						element: null
					}

				// element
					wheel.element = document.createElement("div")
						wheel.element.id = wheel.id
						wheel.element.className = "wheel"
					ELEMENTS.container.appendChild(wheel.element)

				// indicator
					var indicator = document.createElement("indicator")
						indicator.className = "wheel-indicator"
						indicator.innerHTML = "&darr;"
					wheel.element.appendChild(indicator)

				// rotate buttons
					var cwButton = document.createElement("button")
						cwButton.className = "wheel-rotate"
						cwButton.setAttribute("direction", "clockwise")
						cwButton.innerHTML = "&#10227;"
						cwButton.addEventListener(TRIGGERS.click, rotateWheel)
					wheel.element.appendChild(cwButton)

					var ccwButton = document.createElement("button")
						ccwButton.className = "wheel-rotate"
						ccwButton.setAttribute("direction", "counterclockwise")
						ccwButton.innerHTML = "&#10226;"
						ccwButton.addEventListener(TRIGGERS.click, rotateWheel)
					wheel.element.appendChild(ccwButton)

				// symbols
					var symbolSection = document.createElement("div")
						symbolSection.className = "wheel-symbols"
						symbolSection.style.transform = "rotate(" + (wheel.rotation) + "deg)"
					wheel.element.appendChild(symbolSection)

				// offset for solution
					var symbolArray = createSolvedSequence(wheelIndex)
					console.log(symbolArray)

				// individual symbols
					for (var i = 0; i < symbolArray.length; i++) {
						var symbol = symbolArray[i]

						var symbolElement = document.createElement("div")
							symbolElement.className = "wheel-symbol"
							symbolElement.innerHTML = symbol
							symbolElement.style.transform = "rotate(" + (notchDegrees * i) + "deg)"
						symbolSection.appendChild(symbolElement)
					}

				// return
					return wheel
			}

		/* createSolvedSequence */
			function createSolvedSequence(wheelIndex) {
				// symbolArray
					var symbolArray = []
				
				// no solution
					if (!CONSTANTS.solution) {
						for (var i in CONSTANTS.symbolSet) {
							symbolArray[i] = CONSTANTS.symbolSet[i]
						}
						return symbolArray
					}

				// illegitimate solution
					if (CONSTANTS.solution && !CONSTANTS.symbolSet.includes(CONSTANTS.solution[wheelIndex])) {
						for (var i in CONSTANTS.symbolSet) {
							symbolArray[i] = CONSTANTS.symbolSet[i]
						}
						return symbolArray
					}

				// legitimate solution
					var indexOffset = CONSTANTS.symbolSet.indexOf(CONSTANTS.solution[wheelIndex])
					while (symbolArray.length < CONSTANTS.symbolSet.length) {
						symbolArray.push(CONSTANTS.symbolSet[indexOffset])
						indexOffset++

						if (indexOffset >= CONSTANTS.symbolSet.length) {
							indexOffset = 0
						}
					}
					return symbolArray
			}

		/* createNotchEffects */
			function createNotchEffects(ids, wheel) {
				// other keys
					var keys = ids.filter(function(k) {
						return k !== wheel.id
					})

				// clockwise
					if (Math.random() < CONSTANTS.notchEffectChance) {
						wheel.onCW = {
							id: chooseRandom(keys),
							notches: rollRandom(CONSTANTS.maxNotchEffect)
						}
					}

				// counterclockwise
					if (Math.random() < CONSTANTS.notchEffectChance) {
						wheel.onCCW = {
							id: chooseRandom(keys),
							notches: rollRandom(CONSTANTS.maxNotchEffect)
						}
					}
			}

	/*** interaction ***/
		/* rotateWheel */
			function rotateWheel(event) {
				// not playing
					if (!GAMESTATE.playing) {
						return
					}

				// get options
					var direction = event.target.direction || event.target.getAttribute("direction")
					var id = event.target.closest(".wheel").id
					var wheel = GAMESTATE.wheels[id]

					if (!wheel) {
						return
					}

				// notch
					var notchDegrees = CONSTANTS.circle / CONSTANTS.symbolSet.length

				// rotate wheel
					wheel.rotation += (direction == "clockwise") ? notchDegrees : -notchDegrees
					wheel.element.querySelector(".wheel-symbols").style.transform = "rotate(" + wheel.rotation + "deg)"

				// effects
					// clockwise
						if (direction == "clockwise" && wheel.onCW) {
							var cwWheel = GAMESTATE.wheels[wheel.onCW.id]
								cwWheel.rotation += wheel.onCW.notches * notchDegrees
								cwWheel.element.querySelector(".wheel-symbols").style.transform = "rotate(" + cwWheel.rotation + "deg)"
						}

					// counterclockwise
						if (direction == "counterclockwise" && wheel.onCCW) {
							var ccwWheel = GAMESTATE.wheels[wheel.onCCW.id]
								ccwWheel.rotation += wheel.onCCW.notches * -notchDegrees
								ccwWheel.element.querySelector(".wheel-symbols").style.transform = "rotate(" + ccwWheel.rotation + "deg)"
						}

				// check victory
					checkVictory()
			}

		/* checkVictory */
			function checkVictory() {
				// loop through wheels
					for (var i in GAMESTATE.wheels) {
						if (GAMESTATE.wheels[i].rotation % CONSTANTS.circle) {
							return false
						}
					}

				// end game
					GAMESTATE.playing = false
					ELEMENTS.body.removeAttribute("gameplay")
			}

})