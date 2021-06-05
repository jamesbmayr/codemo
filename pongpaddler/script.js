window.addEventListener("load", function() {
	/*** globals ***/
		/* triggers */
			var TRIGGERS = {
				mousemove: "mousemove",
				click: "click",
				keydown: "keydown",
				keyup: "keyup"
			}

		/* constants */
			var CONSTANTS = {
				paddleWidth: 2,
				paddleHeight: 20,
				ballVelocity: 1,
				ballVelocityChange: 1.125,
				ballVelocityMaximum: 3,
				paddleVelocityMaximum: 4,
				paddleAcceleration: 0.5,
				loopTime: 50,
				victory: 10
			}

		/* elements */
			var ELEMENTS = {
				container: document.querySelector("#container"),
				score: document.querySelector("#score"),
				p1: document.querySelector("#paddle-p1"),
				p2: document.querySelector("#paddle-p2"),
				ball: document.querySelector("#ball"),
				rematch: document.querySelector("#rematch")
			}

		/* game */
			var GAME = {
				playing: false,
				scores: {
					p1: 0,
					p2: 0
				},
				keys: {
					w: false,
					s: false,
					arrowup: false,
					arrowdown: false,
					" ": false
				},
				ball: {
					x: 50,
					y: 50,
					vx: 0,
					vy: 0
				},
				paddles: {
					p1: {
						y: 50,
						vy: 0
					},
					p2: {
						y: 50,
						vy: 0
					}
				},
				loop: null
			}

	/*** interaction ***/
		/* pressKey */
			window.addEventListener(TRIGGERS.keydown, pressKey)
			function pressKey(event) {
				try {
					// invalid key
						if (!Object.keys(GAME.keys).includes(event.key.toLowerCase())) {
							return
						}

					// press
						GAME.keys[event.key.toLowerCase()] = true
				} catch (error) {console.log(error)}
			}

		/* liftKey */
			window.addEventListener(TRIGGERS.keyup, liftKey)
			function liftKey(event) {
				try {
					// invalid key
						if (!Object.keys(GAME.keys).includes(event.key.toLowerCase())) {
							return
						}

					// press
						GAME.keys[event.key.toLowerCase()] = false
				} catch (error) {console.log(error)}
			}

		/* clickCursor */
			window.addEventListener(TRIGGERS.click, clickCursor)
			function clickCursor(event) {
				try {
					// already playing
						if (GAME.playing) {
							return
						}

					// game over
						if (GAME.over) {
							return
						}

					// randomize ball direction
						GAME.ball.vx = Math.floor(Math.random() * 2) ? CONSTANTS.ballVelocity : -CONSTANTS.ballVelocity
						GAME.ball.vy = Math.floor(Math.random() * 2) ? CONSTANTS.ballVelocity : -CONSTANTS.ballVelocity

					// start playing
						GAME.playing = true
				} catch (error) {console.log(error)}
			}

	/*** game loop ***/
		/* iterateState */
			GAME.loop = setInterval(iterateState, CONSTANTS.loopTime)
			function iterateState() {
				try {
					// not playing?
						if (!GAME.playing) {
							// game over
								if (GAME.over) {
									return
								}

							// relaunch
								if (GAME.keys[" "]) {
									clickCursor()
									return
								}
						}

					// update paddle velocities
						// p1
							if (GAME.keys.w && !GAME.keys.s) {
								GAME.paddles.p1.vy = Math.min(Math.abs(GAME.paddles.p1.vy - CONSTANTS.paddleAcceleration), CONSTANTS.paddleVelocityMaximum) * Math.sign(GAME.paddles.p1.vy - CONSTANTS.paddleAcceleration)
							}
							else if (GAME.keys.s && !GAME.keys.w) {
								GAME.paddles.p1.vy = Math.min(Math.abs(GAME.paddles.p1.vy + CONSTANTS.paddleAcceleration), CONSTANTS.paddleVelocityMaximum) * Math.sign(GAME.paddles.p1.vy + CONSTANTS.paddleAcceleration)
							}
							else {
								GAME.paddles.p1.vy = Math.sign(GAME.paddles.p1.vy) * (Math.abs(GAME.paddles.p1.vy) - CONSTANTS.paddleAcceleration)
								if (Math.abs(GAME.paddles.p1.vy) < CONSTANTS.paddleAcceleration) {
									GAME.paddles.p1.vy = 0
								}
							}

						// p2
							if (GAME.keys.arrowup && !GAME.keys.arrowdown) {
								GAME.paddles.p2.vy = Math.min(Math.abs(GAME.paddles.p2.vy - CONSTANTS.paddleAcceleration), CONSTANTS.paddleVelocityMaximum) * Math.sign(GAME.paddles.p2.vy - CONSTANTS.paddleAcceleration)
							}
							else if (GAME.keys.arrowdown && !GAME.keys.arrowup) {
								GAME.paddles.p2.vy = Math.min(Math.abs(GAME.paddles.p2.vy + CONSTANTS.paddleAcceleration), CONSTANTS.paddleVelocityMaximum) * Math.sign(GAME.paddles.p2.vy + CONSTANTS.paddleAcceleration)
							}
							else {
								GAME.paddles.p2.vy = Math.sign(GAME.paddles.p2.vy) * (Math.abs(GAME.paddles.p2.vy) - CONSTANTS.paddleAcceleration)
								if (Math.abs(GAME.paddles.p2.vy) < CONSTANTS.paddleAcceleration) {
									GAME.paddles.p2.vy = 0
								}
							}

					// update paddle positions
						// p1
							GAME.paddles.p1.y = Math.min(100 - CONSTANTS.paddleHeight / 2, Math.max(CONSTANTS.paddleHeight / 2, GAME.paddles.p1.y + GAME.paddles.p1.vy))

						// p2
							GAME.paddles.p2.y = Math.min(100 - CONSTANTS.paddleHeight / 2, Math.max(CONSTANTS.paddleHeight / 2, GAME.paddles.p2.y + GAME.paddles.p2.vy))

					// get new ball position
						GAME.ball.x = GAME.ball.x + GAME.ball.vx
						GAME.ball.y = GAME.ball.y + GAME.ball.vy

					// goal?
						if (GAME.ball.x < 0 || GAME.ball.x > 100) {
							// stop play
								GAME.playing = false

							// score
								if (GAME.ball.x < 0) {
									GAME.scores.p2++
								}
								else {
									GAME.scores.p1++
								}

							// reset acceleration
								GAME.paddles.p1.vy = 0
								GAME.paddles.p2.vy = 0

							// reset ball
								GAME.ball.vx = 0
								GAME.ball.vy = 0
								GAME.ball.x = 50
								GAME.ball.y = 50

							// check for victory
								if (GAME.scores.p1 >= CONSTANTS.victory) {
									ELEMENTS.score.innerText = "P1 wins"
									GAME.over = true
									ELEMENTS.rematch.setAttribute("href", window.location)
									ELEMENTS.rematch.setAttribute("visible", true)
									return
								}
								
								if (GAME.scores.p2 >= CONSTANTS.victory) {
									ELEMENTS.score.innerText = "P2 wins"
									GAME.over = true
									ELEMENTS.rematch.setAttribute("href", window.location)
									ELEMENTS.rematch.setAttribute("visible", true)
									return
								}

							// display score
								ELEMENTS.score.innerText = (GAME.scores.p1 || "0") + " - " + (GAME.scores.p2 || "0")
						}

					// bounce off top/bottom?
						else if (GAME.ball.y < CONSTANTS.paddleWidth || GAME.ball.y > 100 - CONSTANTS.paddleWidth) {
							GAME.ball.vy = -GAME.ball.vy
							GAME.ball.y = GAME.ball.y + 2 * GAME.ball.vy
						}

					// paddle (p1)
						if (CONSTANTS.paddleWidth * 2 <= GAME.ball.x && GAME.ball.x <= CONSTANTS.paddleWidth * 3) {
							// within paddle?
								if (GAME.paddles.p1.y - CONSTANTS.paddleHeight / 2 <= GAME.ball.y && GAME.ball.y <= GAME.paddles.p1.y + CONSTANTS.paddleHeight) {
									// reflect x
										GAME.ball.vx = -GAME.ball.vx
										GAME.ball.x = GAME.ball.x + 2 * GAME.ball.vx

									// increase v
										GAME.ball.vx = Math.sign(GAME.ball.vx) * Math.min(CONSTANTS.ballVelocityMaximum, Math.abs(GAME.ball.vx * CONSTANTS.ballVelocityChange))
										GAME.ball.vy = Math.sign(GAME.ball.vy) * Math.min(CONSTANTS.ballVelocityMaximum, Math.abs(GAME.ball.vy * CONSTANTS.ballVelocityChange))
								}
						}

					// paddle (p2)
						else if (100 - 3 * CONSTANTS.paddleWidth <= GAME.ball.x && GAME.ball.x <= 100 - 2 * CONSTANTS.paddleWidth) {
							// within paddle?
								if (GAME.paddles.p2.y - CONSTANTS.paddleHeight / 2 <= GAME.ball.y && GAME.ball.y <= GAME.paddles.p2.y + CONSTANTS.paddleHeight) {
									// reflect x
										GAME.ball.vx = -GAME.ball.vx
										GAME.ball.x = GAME.ball.x + 2 * GAME.ball.vx

									// increase v
										GAME.ball.vx = Math.sign(GAME.ball.vx) * Math.min(CONSTANTS.ballVelocityMaximum, Math.abs(GAME.ball.vx * CONSTANTS.ballVelocityChange))
										GAME.ball.vy = Math.sign(GAME.ball.vy) * Math.min(CONSTANTS.ballVelocityMaximum, Math.abs(GAME.ball.vy * CONSTANTS.ballVelocityChange))
								}
						}

					// display positions
						// ball
							ELEMENTS.ball.style.left = GAME.ball.x + "%"
							ELEMENTS.ball.style.top = GAME.ball.y + "%"

						// p1
							ELEMENTS.p1.style.top = GAME.paddles.p1.y + "%"

						// p1
							ELEMENTS.p2.style.top = GAME.paddles.p2.y + "%"					
				} catch (error) {console.log(error)}
			}
})
