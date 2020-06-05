window.onload = function() {
	/*** onload ***/
		/* triggers */
			var TRIGGERS = {
				submit: "submit",
				keydown: "keydown",
				keyup: "keyup"
			}

		/* constants */
			var CONSTANTS = {
				delay: 250,
				frames: 32,
				gap: 5,
				score: {
					hit: 1,
					miss: -2,
					start: -16,
					end: 32,
				},
				messages: {
					loss: "You lose.",
					win: "You win."
				},
				symbols: {
					blank: " : ",
					up: "&uarr;",
					right: "&rarr;",
					down: "&darr;",
					left: "&larr;",
					horizontal: "&harr;",
					vertical: "&varr;",
					check: "&#10004;",
					x: "&#10006;"
				},
				directions: ["up", "right", "down", "left", "horizontal", "vertical"]
			}

		/* elements */
			var ELEMENTS = {
				title: document.querySelector("#title"),
				favicon: document.querySelector("#favicon"),
				form: document.querySelector("#reset-form"),
				subheader: document.querySelector("#subheader"),
				score: document.querySelector("#score")
			}

		/* state */
			var GAMESTATE = null

	/*** game ***/
		/* reloadGame */
			ELEMENTS.form.addEventListener(TRIGGERS.submit, reloadGame)
			function reloadGame() {
				try {
					window.location = window.location
				} catch (error) {console.log(error)}
			}

		/* createGame */
			createGame()
			function createGame() {
				try {
					// reset gamestate
						GAMESTATE = {
							buttons: {
								up: false,
								right: false,
								down: false,
								left: false
							},
							score: CONSTANTS.score.start,
							gap: CONSTANTS.gap,
							arrows: {
								hit: false,
								miss: false,
								current: null,
								upcoming: [],
								untilNext: CONSTANTS.gap
							},
							loop: null,
						}

					// calculate gap
						GAMESTATE.gap = CONSTANTS.gap - Math.floor(GAMESTATE.score / (CONSTANTS.score.end / CONSTANTS.gap))

					// seed upcoming
						var maximum = Math.ceil(CONSTANTS.frames / GAMESTATE.gap) * GAMESTATE.gap
						for (var i = 1; i <= maximum; i++) {
							if (i % GAMESTATE.gap) {
								GAMESTATE.arrows.upcoming.push(null)
							}
							else if (!i || i == GAMESTATE.gap) { // grace period
								GAMESTATE.arrows.upcoming.push(null)
							}
							else {
								GAMESTATE.arrows.upcoming.push(getArrow())
							}
						}

					// set score tracker
						ELEMENTS.score.value = GAMESTATE.score
						ELEMENTS.score.setAttribute("min", -CONSTANTS.score.end)
						ELEMENTS.score.setAttribute("max", CONSTANTS.score.end)

					// loop
						GAMESTATE.loop = setInterval(incrementGame, CONSTANTS.delay)
				} catch (error) {console.log(error)}
			}

		/* getArrow */
			function getArrow() {
				try {
					// arrows
						return CONSTANTS.directions[Math.floor(Math.random() * CONSTANTS.directions.length)]
				} catch (error) {console.log(error)}
			}

		/* incrementGame */
			function incrementGame() {
				try {
					// check buttons
						checkButtons()

					// shift arrows
						shiftArrows()

					// check for victory
						detectGameEnd()
				} catch (error) {console.log(error)}
			}

		/* checkButtons */
			function checkButtons() {
				try {
					// no current
						if (!GAMESTATE.arrows.current) {
							return
						}

					// current
						var hit = false
						if (GAMESTATE.arrows.current == "up" && GAMESTATE.buttons.up && !GAMESTATE.buttons.right && !GAMESTATE.buttons.down && !GAMESTATE.buttons.left) {
							hit = true
						}
						else if (GAMESTATE.arrows.current == "right" && !GAMESTATE.buttons.up && GAMESTATE.buttons.right && !GAMESTATE.buttons.down && !GAMESTATE.buttons.left) {
							hit = true
						}
						else if (GAMESTATE.arrows.current == "down" && !GAMESTATE.buttons.up && !GAMESTATE.buttons.right && GAMESTATE.buttons.down && !GAMESTATE.buttons.left) {
							hit = true
						}
						else if (GAMESTATE.arrows.current == "left" && !GAMESTATE.buttons.up && !GAMESTATE.buttons.right && !GAMESTATE.buttons.down && GAMESTATE.buttons.left) {
							hit = true
						}
						else if (GAMESTATE.arrows.current == "horizontal" && !GAMESTATE.buttons.up && GAMESTATE.buttons.right && !GAMESTATE.buttons.down && GAMESTATE.buttons.left) {
							hit = true
						}
						else if (GAMESTATE.arrows.current == "vertical" && GAMESTATE.buttons.up && !GAMESTATE.buttons.right && GAMESTATE.buttons.down && !GAMESTATE.buttons.left) {
							hit = true
						}

					// points
						if (hit) {
							hitArrow()
							return
						}

					// -points
						missArrow()
				} catch (error) {console.log(error)}
			}

		/* hitArrow */
			function hitArrow() {
				try {
					// hit
						GAMESTATE.arrows.hit = true

					// increment score
						GAMESTATE.score += CONSTANTS.score.hit
						ELEMENTS.score.value = GAMESTATE.score

					// gap
						GAMESTATE.gap = CONSTANTS.gap - Math.floor(GAMESTATE.score / (CONSTANTS.score.end / CONSTANTS.gap))

					// remove arrow
						GAMESTATE.arrows.current = null
				} catch (error) {console.log(error)}
			}

		/* missArrow */
			function missArrow() {
				try {
					// miss
						GAMESTATE.arrows.miss = true

					// decrement score
						GAMESTATE.score += CONSTANTS.score.miss
						ELEMENTS.score.value = GAMESTATE.score

					// gap
						GAMESTATE.gap = CONSTANTS.gap - Math.floor(GAMESTATE.score / (CONSTANTS.score.end / CONSTANTS.gap))

					// remove arrow
						GAMESTATE.arrows.current = null
				} catch (error) {console.log(error)}
			}

		/* shiftArrows */
			function shiftArrows() {
				try {
					// slide
						GAMESTATE.arrows.current = GAMESTATE.arrows.upcoming.shift()
						GAMESTATE.arrows.untilNext -= 1

					// add to the end
						if (!GAMESTATE.arrows.untilNext) {
							GAMESTATE.arrows.untilNext = GAMESTATE.gap
							GAMESTATE.arrows.upcoming.push(getArrow())
						}
						else {
							GAMESTATE.arrows.upcoming.push(null)
						}

					// favicon
						if (GAMESTATE.arrows.hit) {
							GAMESTATE.arrows.hit = false
							ELEMENTS.favicon.href = "icons/check.png"
						}
						else if (GAMESTATE.arrows.miss) {
							GAMESTATE.arrows.miss = false
							ELEMENTS.favicon.href = "icons/x.png"
						}
						else {
							ELEMENTS.favicon.href = "icons/" + (GAMESTATE.arrows.current || "blank") + ".png"
						}

					// title
						ELEMENTS.title.innerHTML = GAMESTATE.arrows.upcoming.map(function(arrow) {
							return CONSTANTS.symbols[arrow] || CONSTANTS.symbols.blank
						}).join("")
				} catch (error) {console.log(error)}
			}

		/* detectGameEnd */
			function detectGameEnd() {
				try {
					// loss
						if (GAMESTATE.score <= -CONSTANTS.score.end) {
							clearInterval(GAMESTATE.loop)
							ELEMENTS.subheader.innerText = CONSTANTS.messages.loss
							ELEMENTS.form.setAttribute("visibility", true)
						}

					// win
						if (GAMESTATE.score >= CONSTANTS.score.end) {
							clearInterval(GAMESTATE.loop)
							ELEMENTS.subheader.innerText = CONSTANTS.messages.win
							ELEMENTS.form.setAttribute("visibility", true)
						}
				} catch (error) {console.log(error)}
			}

	/*** keys ***/
		/* pressKey */
			document.addEventListener(TRIGGERS.keydown, pressKey)
			function pressKey(event) {
				try {
					// arrows
						if (event.key == "ArrowUp" || event.which == 38) {
							GAMESTATE.buttons.up = true
						}
						else if (event.key == "ArrowRight" || event.which == 39) {
							GAMESTATE.buttons.right = true
						}
						else if (event.key == "ArrowDown" || event.which == 40) {
							GAMESTATE.buttons.down = true
						}
						else if (event.key == "ArrowLeft" || event.which == 37) {
							GAMESTATE.buttons.left = true
						}
				} catch (error) {console.log(error)}
			}

		/* liftKey */
			document.addEventListener(TRIGGERS.keyup, liftKey)
			function liftKey(event) {
				try {
					// arrows
						if (event.key == "ArrowUp" || event.which == 38) {
							GAMESTATE.buttons.up = false
						}
						else if (event.key == "ArrowRight" || event.which == 39) {
							GAMESTATE.buttons.right = false
						}
						else if (event.key == "ArrowDown" || event.which == 40) {
							GAMESTATE.buttons.down = false
						}
						else if (event.key == "ArrowLeft" || event.which == 37) {
							GAMESTATE.buttons.left = false
						}
				} catch (error) {console.log(error)}
			}
}
