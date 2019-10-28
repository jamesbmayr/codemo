window.onload = function() {
	/*** onload ***/
		/* triggers */
			if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
				var on = { click: "touchstart", mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" }
			}
			else {
				var on = { click:      "click", mousedown:  "mousedown", mousemove: "mousemove", mouseup:  "mouseup" }
			}

	/*** globals ***/
		/* constants */
			var CONSTANTS = {
				minimum: 3,
				maximum: 6,
				colors: ["red", "yellow", "blue", "green", "magenta", "cyan"]
			}

		/* elements */
			var ELEMENTS = {
				game: document.getElementById("game"),
				setup: document.getElementById("game-setup"),
				colorsInput: document.getElementById("game-setup-colors"),
				digitsInput: document.getElementById("game-setup-digits"),
				startButton: document.getElementById("game-setup-start"),
				secret: document.getElementById("game-secret"),
				guess: document.getElementById("game-guess"),
				guessInputs: document.getElementById("game-guess-inputs"),
				guessSelects: [],
				guessButton: document.getElementById("game-guess-button"),
				history: document.getElementById("game-history")
			}

		/* game */
			var GAME = {
				resolution: null,
				colorSet: [],
				digitCount: 0,
				secret: [],
				history: []
			}

	/*** tools ***/
		/* chooseRandom */
			function chooseRandom(options) {
				// not array
					if (!Array.isArray(options)) {
						return options
					}
				
				// select a random element
					else {
						return options[Math.floor(Math.random() * options.length)]
					}
			}

	/*** interaction ***/
		/* submitStart */
			ELEMENTS.startButton.addEventListener(on.click, submitStart)
			function submitStart(event) {
				// vanish game
					vanishGame()

				// wait 1 second
					setTimeout(function() {
						// reset game
							clearGame()

						// set parameters
							createParameters()

						// create secret
							createSecret()

						// create guess selects
							createGuessSelects()
					}, 1000)
			}

		/* changeSelect */
			function changeSelect(event) {
				var color = event.target.value
				event.target.setAttribute("color", color)
			}

		/* submitGuess */
			ELEMENTS.guessButton.addEventListener(on.click, submitGuess)
			function submitGuess(event) {
				if (!GAME.resolution) {
					// gather guess
						var guess = []
						for (var i in ELEMENTS.guessSelects) {
							if (GAME.colorSet.includes(ELEMENTS.guessSelects[i].value)) {
								guess.push(ELEMENTS.guessSelects[i].value)
							}
							else {
								return false
							}
						}

					// check guess
						var evaluation = checkGuess(guess)

					// append history
						appendHistory(guess, evaluation)

					// victory
						if (evaluation.exact == GAME.digitCount) {
							showSecret()
						}
				}
			}

	/*** gameplay ***/
		/* vanishGame */
			function vanishGame() {
				ELEMENTS.secret.setAttribute("vanish", true)
				ELEMENTS.setup.setAttribute("vanish", true)
				ELEMENTS.guess.setAttribute("vanish", true)
				ELEMENTS.history.setAttribute("vanish", true)
			}

		/* clearGame */
			function clearGame() {
				// clear parameters
					GAME.colorSet = []
					GAME.digitCount = []

				// clear secret
					GAME.secret = []
					ELEMENTS.secret.innerHTML = ""
					ELEMENTS.secret.removeAttribute("vanish")
					ELEMENTS.secret.setAttribute("blur", true)

				// clear guess
					ELEMENTS.guessSelects = []
					ELEMENTS.guessInputs.innerHTML = ""
					ELEMENTS.guess.removeAttribute("vanish")

				// clear history
					GAME.history = []
					ELEMENTS.history.innerHTML = ""
					ELEMENTS.history.removeAttribute("vanish")

				// clear resolution
					GAME.resolution = false
			}

		/* createParameters */
			function createParameters() {
				// colors
					var colorCount = Math.max(CONSTANTS.minimum, Math.min(CONSTANTS.colors.length, ELEMENTS.colorsInput.value))
					GAME.colorSet = CONSTANTS.colors.slice(0, colorCount) || []

				// digits
					var digitCount = ELEMENTS.digitsInput.value
					GAME.digitCount = Math.max(CONSTANTS.minimum, Math.min(CONSTANTS.maximum, digitCount))
			}

		/* createGuessSelects */
			function createGuessSelects() {
				while (ELEMENTS.guessSelects.length < GAME.digitCount) {
					// create element
						var guessSelect = document.createElement("select")
							guessSelect.className = "game-guess-select"
							guessSelect.addEventListener("change", changeSelect)
						ELEMENTS.guessInputs.appendChild(guessSelect)

					// add select
						var nonOption = document.createElement("option")
							nonOption.value = null
							nonOption.innerText = "..."
							nonOption.setAttribute("disabled", true)
							nonOption.setAttribute("selected", true)
						guessSelect.appendChild(nonOption)

					// add options
						for (var i in GAME.colorSet) {
							var option = document.createElement("option")
								option.value = GAME.colorSet[i]
								option.innerText = GAME.colorSet[i]
							guessSelect.appendChild(option)
						}

					// save element
						ELEMENTS.guessSelects.push(guessSelect)
				}
			}

		/* createSecret */
			function createSecret() {
				// empty secret
					var secret = []

				// random colors
					while (secret.length < GAME.digitCount) {
						secret.push(chooseRandom(GAME.colorSet))
					}

				// fake markers
					for (var i in secret) {
						var marker = document.createElement("div")
							marker.className = "game-secret-marker"
						ELEMENTS.secret.appendChild(marker)
					}

				// return
					GAME.secret = secret
			}

		/* checkGuess */
			function checkGuess(guess) {
				// empty evaluation
					var evaluation = {
						exact: 0,
						partial: 0
					}
					var unmatchedSecret = []
					var wrongGuess = []

				//loop though guess
					for (var i in guess) {
						// exact
							if (GAME.secret[i] == guess[i]) {
								evaluation.exact++
							}

						// unmatched
							else {
								unmatchedSecret.push(GAME.secret[i])
								wrongGuess.push(guess[i])
							}
					}

				// loop through unmatched
					for (var i = 0; i < wrongGuess.length; i++) {
						if (unmatchedSecret.includes(wrongGuess[i])) {
							evaluation.partial++
							unmatchedSecret.splice(unmatchedSecret.indexOf(wrongGuess[i]), 1)
							wrongGuess.splice(i, 1)
							i--
						}
					}

				// return
					return evaluation
			}

		/* appendHistory  */
			function appendHistory(guess, evaluation) {
				// history
					GAME.history.push({guess: guess, evaluation: evaluation})

				// row
					var row = document.createElement("div")
						row.className = "game-history-row"
						row.setAttribute("vanish", true)
					ELEMENTS.history.prepend(row)

				// guess
					for (var i in guess) {
						var marker = document.createElement("div")
							marker.className = "game-history-row-marker"
							marker.setAttribute("color", guess[i])
						row.appendChild(marker)
					}

				// evaluation
					var partial = document.createElement("div")
						partial.className = "game-history-row-partial"
						partial.innerText = evaluation.partial || 0
					row.appendChild(partial)

					var exact = document.createElement("div")
						exact.className = "game-history-row-exact"
						exact.innerText = evaluation.exact || 0
					row.appendChild(exact)

				// unblur
					setTimeout(function() {
						row.removeAttribute("vanish")
					}, 0)
			}

		/* showSecret */
			function showSecret() {
				// update game object
					GAME.resolution = true

				// display secret
					ELEMENTS.secret.innerHTML = ""

				// show markers
					for (var i in GAME.secret) {
						var marker = document.createElement("div")
							marker.className = "game-secret-marker"
							marker.setAttribute("color", GAME.secret[i])
						ELEMENTS.secret.appendChild(marker)
					}

				// reveal
					ELEMENTS.secret.removeAttribute("blur")
					ELEMENTS.guess.setAttribute("vanish", true)
					ELEMENTS.setup.removeAttribute("vanish")
			}

}