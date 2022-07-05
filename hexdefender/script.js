/*** globals ***/
	/* triggers */
		const isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)
		const TRIGGERS = {
			resize: "resize",
			mousedown: isMobile ? "touchstart" : "mousedown",
			mouseup: isMobile ? "touchend" : "mouseup",
			mousemove: isMobile ? "touchmove" : "mousemove",
			keydown: "keydown",
			keyup: "keyup",
			click: "click"
		}

	/* elements */
		const ELEMENTS = {
			body: document.body,
			canvas: document.querySelector("#canvas"),
			context: document.querySelector("#canvas").getContext("2d"),
			menu: {
				element: document.querySelector("#menu"),
				start: document.querySelector("#menu-start"),
				x: document.querySelector("#menu-x"),
				y: document.querySelector("#menu-y"),
				z: document.querySelector("#menu-z")
			},
			score: document.querySelector("#score"),
			controlsSection: document.querySelector("#controls"),
			controls: {
				w: document.querySelector("#controls-w"),
				e: document.querySelector("#controls-e"),
				a: document.querySelector("#controls-a"),
				s: document.querySelector("#controls-s"),
				d: document.querySelector("#controls-d"),
				z: document.querySelector("#controls-z"),
				x: document.querySelector("#controls-x")
			},
			indicators: {
				blasts: document.querySelector("#blasts-indicator-inner"),
				blastsText: document.querySelector("#blasts-text"),
				fuel: document.querySelector("#fuel-indicator-inner"),
				fuelText: document.querySelector("#fuel-text"),
				shield: document.querySelector("#shield-indicator-inner"),
				shieldText: document.querySelector("#shield-text")
			}
		}

	/* constants */
		const CONSTANTS = {
			circle: {
				radians: Math.PI * 2,
				degrees: 360,
				angleOffset: -30 / 360 * Math.PI * 2 // seemingly necessary for converting radial/rectilinear
			},
			rounding: 1000,
			hexShortToLongRatio: Math.sqrt(3) / 2,
			interval: 25,
			endGameWait: 1000,
			maxSlowMotion: 4,
			canvas: {
				"light-gray": "#dddddd",
				"medium-gray": "#333333",
				"dark-gray": "#111111",
				"medium-red": "#d94c4c",
				"light-orange": "#cc8b2f",
				"light-green": "#39ac1b",
				"light-blue": "#04b1ff",
				"hex-radius": 25, // px
			},
			keys: {
				"87": "w",
				"69": "e",
				"65": "a",
				"83": "s",
				"68": "d",
				"90": "z",
				"88": "x"
			}
		}
			CONSTANTS.grid = {
				x: 9, // hex
				y: 9, // hex
				z: 9, // hex
				min: 6, // hex
				max: 12, // hex
				opacity: 0.2,
				lineColor: CONSTANTS.canvas["medium-gray"],
				lineWidthRatio: 0.1,
				outerBorderWidthRatio: 0.5,
				outerBorderOpacity: 1
			}
			CONSTANTS.player = {
				acceleration: 0.005, // hex
				maxVelocity: 0.1, // hex
				friction: 0.001, // hex
				braking: 0.01, // hex
				bouncebackRatio: 0.5,
				radiusRatio: 0.2, // hex
				backgroundColor: CONSTANTS.canvas["light-gray"],
				shadowColor: CONSTANTS.canvas["light-blue"],
				shadowWidthRatio: 0.1, // hexagon
				gunColor: CONSTANTS.canvas["light-blue"],
				gunOpacity: 1,
				gunRadius: 0.45, // hex
				gunAngle: getRadiansFromDegrees(15),
				shieldColor: CONSTANTS.canvas["light-green"],
				shieldOpacity: 0.2,
				shieldRadius: 3, // hex
				thrustAngle: getRadiansFromDegrees(15),
				thrustColor: CONSTANTS.canvas["light-orange"],
				thrustOpacity: 0.8,
				thrustRadius: 0.7, // hex
				thrustStopRatio: 0.8,
				opacity: 1,
				opacityChangePerIterationWhenDestroyed: 0.05,
				fuelDepletionCooldown: 15,
				blastDepletionCooldown: 25,
				fuelChargePerButton: 1,
				indicatorRegenerationRates: {
					shield: 0.25,
					fuel: 0.5,
					blasts: 1
				},
				thrustAngles: {
					w: getRadiansFromDegrees(CONSTANTS.circle.degrees / 6 * 1),
					e: getRadiansFromDegrees(CONSTANTS.circle.degrees / 6 * 2),
					a: getRadiansFromDegrees(CONSTANTS.circle.degrees / 6 * 0),
					d: getRadiansFromDegrees(CONSTANTS.circle.degrees / 6 * 3),
					z: getRadiansFromDegrees(CONSTANTS.circle.degrees / 6 * 5),
					x: getRadiansFromDegrees(CONSTANTS.circle.degrees / 6 * 4)
				},
				podCount: 6,
				podRadius: 0.1, // hex
				podDistance: 0.3, // hex
				podColor: CONSTANTS.canvas["dark-gray"]
			}
			CONSTANTS.blast = {
				cooldown: 5, // iterations
				velocity: 0.15, // hex
				backgroundColor: CONSTANTS.canvas["light-blue"],
				radiusRatio: 0.1, // hex
				shadowColor: CONSTANTS.canvas["light-blue"],
				shadowWidthRatio: 0.1, // hex
				opacity: 1,
				chargePerClick: 10
			}
			CONSTANTS.base = {
				locations: ["-2,4,-2", "2,2,-4", "4,-2,-2", "2,-4,2", "-2,-2,4", "-4,2,2"],
				radiusRatio: 0.4, // hex
				lineColor: CONSTANTS.canvas["light-blue"],
				lineWidthRatio: 0.1, // hex
				shadowColor: CONSTANTS.canvas["light-orange"],
				shadowWidthRatio: 0.2, // hex
				shieldColor: CONSTANTS.canvas["light-green"],
				shieldOpacity: 0.2,
				shieldRadius: 3, // hex
				opacity: 1,
				opacityChangePerIterationWhenDestroyed: 0.05,
				shieldRegenerationRate: 0.1,
				podCount: 6,
				podRadius: 0.15, // hex
				podDistance: 0.75, // hex
				podColor: CONSTANTS.canvas["medium-gray"],
				podOffsetAngle: CONSTANTS.circle.degrees / 12,
				podChanceOfBecomingAsteroid: 0.5
			}
			CONSTANTS.asteroid = {
				shieldReductionPerHit: 60,
				shieldReductionPerMiniHit: 30,
				menuCount: 12,
				startingCount: 3,
				scoreFactor: 0.3,
				creationCooldown: 100,
				untilCollidable: 15,
				radiusRatio: 0.3, // hex
				startingVelocity: 0.025, // hex
				startingVelocityFromBase: 0.005, // hex
				backgroundColor: CONSTANTS.canvas["medium-gray"],
				shadowColor: CONSTANTS.canvas["medium-red"],
				shadowWidthRatio: 0.1, // hex
				craterColor: CONSTANTS.canvas["dark-gray"],
				craterRadiusRatio: 0.25, // hex
				craterOpacity: 0.25,
				minCraters: 10,
				maxCraters: 15,
				minMiniCraters: 2,
				maxMiniCraters: 5,
				opacity: 1,
				opacityChangePerIterationWhenDestroyed: 0.1
			}

	/* state */
		const STATE = {
			playing: false,
			cooldowns: {
				asteroid: 0,
				slowMotion: 0,
				nextSlowMotion: 0
			},
			grid: {},
			exteriorHexes: [],
			player: {},
			blasts: {},
			bases: {},
			asteroids: {},
			gameLoop: null
		}

/*** interaction ***/
	/* loadGame */
		loadGame()
		function loadGame() {
			try {
				// not playing
					STATE.playing = false

				// event listeners
					// prevent default
						window.addEventListener("contextmenu", function(event) {
							event.stopPropagation()
							event.preventDefault()
						})

					// screen
						window.addEventListener(TRIGGERS.resize, resizeCanvas)

					// mouse
						ELEMENTS.canvas.addEventListener(TRIGGERS.mousedown, pressCursor)
						window.addEventListener(TRIGGERS.mouseup, liftCursor)
						window.addEventListener(TRIGGERS.mousemove, moveCursor)

					// keys
						window.addEventListener(TRIGGERS.keydown, pressKey)
						window.addEventListener(TRIGGERS.keyup, liftKey)

					// buttons
						for (let i in ELEMENTS.controls) {
							ELEMENTS.controls[i].addEventListener(TRIGGERS.mousedown, pressButton)
						}
						ELEMENTS.controlsSection.addEventListener(TRIGGERS.mouseup, liftButtons)
						ELEMENTS.menu.start.addEventListener(TRIGGERS.click, startGame)

				// size canvas
					resizeCanvas()

				// grid
					const gridData = createGrid()
						STATE.grid = gridData.grid
						STATE.exteriorHexes = gridData.exteriorHexes
						STATE.gridBorder = gridData.gridBorder

				// player
					STATE.player = createPlayer()
					STATE.player.styling.opacity = 0
				
				// asteroids
					STATE.asteroids = []
					for (let i = 0; i < CONSTANTS.asteroid.menuCount; i++) {
						const asteroid = createAsteroid()
						STATE.asteroids[asteroid.id] = asteroid
					}

				// draw loop
					STATE.gameLoop = setInterval(calculateState, CONSTANTS.interval)
			} catch (error) {console.log(error)}
		}

	/* pressKey */
		function pressKey(event) {
			try {
				// not playing
					if (!STATE.playing) {
						return
					}

				// which one
					const key = CONSTANTS.keys[String(event.which)] || null
					if (!key) {
						return
					}

				// update state
					STATE.player.keys[key] = true

				// update button
					ELEMENTS.controls[key].setAttribute("pressed", true)
			} catch (error) {console.log(error)}
		}

	/* liftKey */
		function liftKey(event) {
			try {
				// which one
					const key = CONSTANTS.keys[String(event.which)] || null
					if (!key) {
						return
					}

				// update state
					STATE.player.keys[key] = false

				// update button
					ELEMENTS.controls[key].removeAttribute("pressed")
					ELEMENTS.controls[key].blur()
			} catch (error) {console.log(error)}
		}

	/* pressButton */
		function pressButton(event) {
			try {
				// not playing
					if (!STATE.playing) {
						return
					}

				// which one
					const key = event.target.closest("button").value
					if (!(key in STATE.player.keys)) {
						return
					}

				// update state
					STATE.player.keys[key] = true

				// update button
					ELEMENTS.controls[key].setAttribute("pressed", true)
			} catch (error) {console.log(error)}
		}

	/* liftButtons */
		function liftButtons(event) {
			try {
				// all
					for (let key in STATE.player.keys) {
						STATE.player.keys[key] = false
						ELEMENTS.controls[key].removeAttribute("pressed")
						ELEMENTS.controls[key].blur()
					}
			} catch (error) {console.log(error)}
		}

	/* pressCursor */
		function pressCursor(event) {
			try {
				// not playing
					if (!STATE.playing) {
						return
					}

				// set state
					STATE.player.cursor.pressed = true

				// similate move
					moveCursor(event)
			} catch (error) {console.log(error)}
		}

	/* liftCursor */
		function liftCursor(event) {
			try {
				// set state
					STATE.player.cursor.pressed = false
			} catch (error) {console.log(error)}
		}

	/* moveCursor */
		function moveCursor(event) {
			try {
				// not playing
					if (!STATE.playing) {
						return
					}

				// position
					const cursor = {
						x: event.touches ? event.touches[0].clientX : event.clientX,
						y: event.touches ? event.touches[0].clientY : event.clientY
					}

				// get rectilinear coordinates
					const rect = ELEMENTS.canvas.getBoundingClientRect()
					const rectilinearX = ((cursor.x - rect.x) -  (ELEMENTS.canvas.width / 2)) / CONSTANTS.canvas["hex-radius"]
					const rectilinearY = ((ELEMENTS.canvas.height / 2) - (cursor.y - rect.y)) / CONSTANTS.canvas["hex-radius"]

				// set coordinates
					STATE.player.cursor.rectilinearX = rectilinearX
					STATE.player.cursor.rectilinearY = rectilinearY

				// set hex coordinates
					const hexCoordinates = getHexFromRectilinear(rectilinearX, rectilinearY)
					STATE.player.cursor.x = hexCoordinates.x
					STATE.player.cursor.y = hexCoordinates.y
					STATE.player.cursor.z = hexCoordinates.z
			} catch (error) {console.log(error)}
		}

/*** converters ***/
	/* getRectilinearFromHex */
		function getRectilinearFromHex(hexX, hexY, hexZ, round) {
			try {
				// hex coordinates
					let rectilinearY = hexY * (3 / 2)
						if (round) { rectilinearY = Math.round(rectilinearY) }
					let rectilinearX = (hexX + (hexY / 2)) * (2 * CONSTANTS.hexShortToLongRatio)
						if (round) { rectilinearX = Math.round(rectilinearX) }

				// return
					return {
						x: rectilinearX || 0,
						y: rectilinearY || 0
					}
			} catch (error) {console.log(error)}
		}

	/* getHexFromRectilinear */
		function getHexFromRectilinear(rectilinearX, rectilinearY, round) {
			try {
				// hex coordinates
					let hexY = rectilinearY / (3 / 2)
						if (round) { hexY = Math.round(hexY) }
					let hexX = rectilinearX / (2 * CONSTANTS.hexShortToLongRatio) - (hexY / 2)
						if (round) { hexX = Math.round(hexX) }
					let hexZ = 0 - hexX - hexY
						if (round) { hexZ = Math.round(hexZ) }

				// return
					return {
						x: hexX || 0,
						y: hexY || 0,
						z: hexZ || 0
					}
			} catch (error) {console.log(error)}
		}

	/* getRadialFromRectilinear */
		function getRadialFromRectilinear(rectilinearX, rectilinearY, round) {
			try {
				// angle
					let angle = getDegreesFromRadians(Math.atan2(rectilinearY, rectilinearX))
						if (round) { angle = roundNumber(angle) }

				// radius
					let radius = getScalar(rectilinearX, rectilinearY)
						if (round) { radius = roundNumber(radius) }

				// return
					return {
						angle: getRadiansFromDegrees(angle),
						radius: radius
					}
			} catch (error) {console.log(error)}
		}

	/* getRectilinearFromRadial */
		function getRectilinearFromRadial(angle, radius, round) {
			try {
				// angle
					let x = Math.cos(CONSTANTS.circle.angleOffset - angle) * radius
						if (round) { x = roundNumber(x) }

				// radius
					let y = Math.sin(CONSTANTS.circle.angleOffset - angle) * radius
						if (round) { y = roundNumber(y) }

				// return
					return {
						x: x,
						y: y
					}
			} catch (error) {console.log(error)}
		}

	/* getRadiansFromDegrees */
		function getRadiansFromDegrees(degrees) {
			try {
				// reduce
					while (degrees < 0) {
						degrees += CONSTANTS.circle.degrees
					}
					degrees = degrees % CONSTANTS.circle.degrees

				// convert
					return degrees * CONSTANTS.circle.radians / CONSTANTS.circle.degrees
			} catch (error) {console.log(error)}
		}

	/* getDegreesFromRadians */
		function getDegreesFromRadians(radians) {
			try {
				// convert
					let degrees = radians * CONSTANTS.circle.degrees / CONSTANTS.circle.radians
					
				// reduce
					while (degrees < 0) {
						degrees += CONSTANTS.circle.degrees
					}
					return degrees % CONSTANTS.circle.degrees
			} catch (error) {console.log(error)}
		}

/*** math ***/
	/* getScalar */
		function getScalar(x, y) {
			try {
				// pythagorean
					return ((x ** 2) + (y ** 2)) ** (1 / 2)
			} catch (error) {console.log(error)}
		}

	/* getCircleCollision */
		function getCircleCollision(a, b) {
			try {
				// get distance & angle
					const radialData = getRadialFromRectilinear(a.x - b.x, a.y - b.y, true)

				// get sum of radii
					const radiiSum = roundNumber(
						(a.hexagon ? a.radius * 2 * CONSTANTS.hexShortToLongRatio : a.radius) +
						(b.hexagon ? b.radius * 2 * CONSTANTS.hexShortToLongRatio : b.radius)
					)

				// return collision
					return {
						angle: radialData.angle,
						distance: radialData.radius,
						radiiSum: radiiSum,
						isCollision: radialData.radius < radiiSum
					}
			} catch (error) {console.log(error)}
		}

	/* roundNumber */
		function roundNumber(n) {
			try {
				// round
					return Math.round(n * CONSTANTS.rounding) / CONSTANTS.rounding
			} catch (error) {console.log(error)}
		}

/*** randoms ***/
	/* generateRandom */
		function generateRandom() {
			try {
				// random string
					return (Math.random() * 10e18).toString(36).slice(2, 10)
			} catch (error) {console.log(error)}
		}

	/* chooseRandom */
		function chooseRandom(list) {
			try {
				// not an array
					if (!Array.isArray(list) || !list.length) {
						return list
					}

				// array
					return list[Math.floor(Math.random() * list.length)]
			} catch (error) {console.log(error)}
		}

	/* rangeRandom */
		function rangeRandom(a, b) {
			try {
				// bigger
					a = a * CONSTANTS.rounding
					b = b * CONSTANTS.rounding

				// random between
					const randomNumber = ((Math.random() * (b - a)) + a)

				// smaller
					return randomNumber / CONSTANTS.rounding
			} catch (error) {console.log(error)}
		}

/*** grid ***/
	/* createGrid */
		function createGrid() {
			try {
				// grid object
					const grid = {}
					const exteriorHexes = []

				// ⬢ a-d = x; x-w = y; e-z = z
				// loop through x & y
					for (let x = -CONSTANTS.grid.x - 1; x <= CONSTANTS.grid.x + 1; x++) {
						for (let y = -CONSTANTS.grid.y - 1; y <= CONSTANTS.grid.y + 1; y++) {
							// add x to grid object
								if (-CONSTANTS.grid.x <= x && x <= CONSTANTS.grid.x && !grid[String(x)]) {
									grid[String(x)] = {}
								}

							// add y to x grid object
								if (-CONSTANTS.grid.y <= y && y <= CONSTANTS.grid.y && grid[String(x)] && !grid[String(x)][String(y)]) {
									grid[String(x)][String(y)] = {}
								}

							// z is derived
								let z = 0 - (x + y)
								if (-CONSTANTS.grid.z - 1 <= z && z <= CONSTANTS.grid.z + 1) {
									// add to grid
										if (-CONSTANTS.grid.z <= z && z <= CONSTANTS.grid.z && grid[String(x)] && grid[String(x)][String(y)] && !grid[String(x)][String(y)][String(z)]) {
											const rectilinear = getRectilinearFromHex(x, y, z)
											grid[String(x)][String(y)][String(z)] = {
												radius: 0.5,
												position: {
													x: x,
													y: y,
													z: z,
													rectilinearX: rectilinear.x,
													rectilinearY: rectilinear.y
												},
												styling: {
													lineWidth: CONSTANTS.grid.lineWidthRatio,
													lineColor: CONSTANTS.grid.lineColor,
													opacity: CONSTANTS.grid.opacity
												}
											}
										}

									// edge
										if (x == -CONSTANTS.grid.x - 1 || x == CONSTANTS.grid.x + 1
										 || y == -CONSTANTS.grid.y - 1 || y == CONSTANTS.grid.y + 1
										 || z == -CONSTANTS.grid.z - 1 || z == CONSTANTS.grid.z + 1) {
											exteriorHexes.push(x + "," + y + "," + z)
										}
								}
						}
					}

				// grid hexagon
					const gridPoints = [
						getRectilinearFromHex(-CONSTANTS.grid.x - 0.5, -(-CONSTANTS.grid.x - 0.5 + CONSTANTS.grid.z + 0.5), 0),
						getRectilinearFromHex(-CONSTANTS.grid.x - 0.5, CONSTANTS.grid.y + 0.5, 0),
						getRectilinearFromHex(-(CONSTANTS.grid.y + 0.5 + -CONSTANTS.grid.z - 0.5), CONSTANTS.grid.y + 0.5, 0),
						getRectilinearFromHex(CONSTANTS.grid.x + 0.5, -(CONSTANTS.grid.x + 0.5 + -CONSTANTS.grid.z - 0.5), 0),
						getRectilinearFromHex(CONSTANTS.grid.x + 0.5, -CONSTANTS.grid.y - 0.5, 0),
						getRectilinearFromHex(-(-CONSTANTS.grid.y - 0.5 + CONSTANTS.grid.z + 0.5), -CONSTANTS.grid.y - 0.5, 0)
					]
					const gridBorder = {
						points: gridPoints,
						lines: [
							{a: gridPoints[0], b: gridPoints[1]},
							{a: gridPoints[1], b: gridPoints[2]},
							{a: gridPoints[2], b: gridPoints[3]},
							{a: gridPoints[3], b: gridPoints[4]},
							{a: gridPoints[4], b: gridPoints[5]},
							{a: gridPoints[5], b: gridPoints[0]}
						],
						styling: {
							lineColor: CONSTANTS.grid.lineColor,
							lineWidth: CONSTANTS.grid.outerBorderWidthRatio,
							opacity: CONSTANTS.grid.outerBorderOpacity,
						}
					}

				// return grid
					return {
						grid: grid,
						exteriorHexes: exteriorHexes,
						gridBorder: gridBorder
					}

			} catch (error) {console.log(error)}
		}

/*** game loop ***/
	/* startGame */
		function startGame() {
			try {
				// get inputs
					CONSTANTS.grid.x = Math.max(CONSTANTS.grid.min, Math.min(CONSTANTS.grid.max, Number(ELEMENTS.menu.x.value)))
					CONSTANTS.grid.y = Math.max(CONSTANTS.grid.min, Math.min(CONSTANTS.grid.max, Number(ELEMENTS.menu.y.value)))
					CONSTANTS.grid.z = Math.max(CONSTANTS.grid.min, Math.min(CONSTANTS.grid.max, Number(ELEMENTS.menu.z.value)))

				// resize
					resizeCanvas()

				// grid
					const gridData = createGrid()
						STATE.grid = gridData.grid
						STATE.exteriorHexes = gridData.exteriorHexes
						STATE.gridBorder = gridData.gridBorder

				// player
					STATE.player = createPlayer()
					STATE.blasts = []

				// bases
					STATE.bases = []
					for (let i in CONSTANTS.base.locations) {
						const coordinates = CONSTANTS.base.locations[i].split(",")
						const base = createBase(Number(coordinates[0]), Number(coordinates[1]), Number(coordinates[2]))
						STATE.bases[base.id] = base
					}

				// asteroids
					STATE.asteroids = []
					for (let i = 0; i < CONSTANTS.asteroid.startingCount; i++) {
						const asteroid = createAsteroid()
						STATE.asteroids[asteroid.id] = asteroid
					}

				// playing
					STATE.playing = true

				// remove gameover state
					ELEMENTS.body.removeAttribute("gameover")
					ELEMENTS.menu.start.blur()
					ELEMENTS.menu.start.setAttribute("disabled", true)
			} catch (error) {console.log(error)}
		}

	/* calculateState */
		function calculateState() {
			try {
				// not playing
					if (!STATE.playing) {
						// slowMotion
							if (!STATE.cooldowns.slowMotion) {
								STATE.cooldowns.slowMotion = STATE.cooldowns.nextSlowMotion
								STATE.cooldowns.nextSlowMotion = Math.min(CONSTANTS.maxSlowMotion, STATE.cooldowns.nextSlowMotion + 1)
							}
							else {
								STATE.cooldowns.slowMotion--
								return
							}
					}

				// player
					const acceleration = calculatePlayerAcceleration(STATE.player)
					STATE.player.velocity = calculatePlayerVelocity(STATE.player, acceleration)
					STATE.player.position = calculatePlayerPosition(STATE.player)
					STATE.player.cooldowns = calculatePlayerCooldowns(STATE.player)
					if (STATE.playing && !STATE.player.collidable) {
						endGame()
					}

				// bases
					for (let b in STATE.bases) {
						if (!calculateBaseCooldowns(STATE.bases[b])) {
							delete STATE.bases[b]
						}
					}
					if (!Object.keys(STATE.bases).length) {
						endGame()
					}

				// shooting
					if (STATE.player.cursor.pressed && !STATE.player.cooldowns.blast && STATE.playing) {
						const blast = createBlast(STATE.player)
						if (blast) {
							STATE.blasts[blast.id] = blast
						}
					}

				// update blasts
					for (let b in STATE.blasts) {
						STATE.blasts[b].position = calculateBlastPosition(STATE.blasts[b])
						if (!STATE.blasts[b].position) {
							delete STATE.blasts[b]
						}
					}

				// update asteroids
					for (let a in STATE.asteroids) {
						STATE.asteroids[a].position = calculateAsteroidPosition(STATE.asteroids[a])
						if (!STATE.asteroids[a].position || !calculateAsteroidCooldowns(STATE.asteroids[a])) {
							delete STATE.asteroids[a]
						}
					}

				// new asteroids?
					STATE.cooldowns.asteroid = Math.max(0, STATE.cooldowns.asteroid - 1)
					if (STATE.playing && !STATE.cooldowns.asteroid && STATE.asteroids.length < Math.max(CONSTANTS.asteroid.startingCount, Math.floor(STATE.player.score * CONSTANTS.asteroid.scoreFactor))) {
						const asteroid = createAsteroid()
						STATE.asteroids[asteroid.id] = asteroid
					}

				// draw
					drawState()
			} catch (error) {console.log(error)}
		}

	/* endGame */
		function endGame() {
			try {
				// already ended?
					if (!STATE.playing) {
						return
					}

				// unset all inputs
					liftCursor()
					liftButtons()

				// stop playing
					STATE.playing = false

				// blur & menu
					setTimeout(function() {
						ELEMENTS.body.setAttribute("gameover", true)
						ELEMENTS.menu.start.removeAttribute("disabled")
					}, CONSTANTS.endGameWait)
			} catch (error) {console.log(error)}
		}

/*** player ***/
	/* createPlayer */
		function createPlayer() {
			try {
				// player object
					return {
						type: "player",
						collidable: true,
						radius: CONSTANTS.player.radiusRatio,
						styling: {
							backgroundColor: CONSTANTS.player.backgroundColor,
							shadowColor: CONSTANTS.player.shadowColor,
							shadowWidth: CONSTANTS.player.shadowWidthRatio,
							opacity: CONSTANTS.player.opacity,
							shieldColor: CONSTANTS.player.shieldColor,
							shieldOpacity: CONSTANTS.player.shieldOpacity,
							shieldRadius: CONSTANTS.player.shieldRadius,
							gunRadius: CONSTANTS.player.gunRadius,
							gunAngle: CONSTANTS.player.gunAngle,
							gunColor: CONSTANTS.player.gunColor,
							gunOpacity: CONSTANTS.player.gunOpacity,
							thrustRadius: CONSTANTS.player.thrustRadius,
							thrustAngle: CONSTANTS.player.thrustAngle,
							thrustColor: CONSTANTS.player.thrustColor,
							thrustOpacity: CONSTANTS.player.thrustOpacity,
							podCount: CONSTANTS.player.podCount,
							podRadius: CONSTANTS.player.podRadius,
							podDistance: CONSTANTS.player.podDistance,
							podColor: CONSTANTS.player.podColor
						},
						position: {
							x: 0,
							y: 0,
							z: 0,
							rectilinearX: 0,
							rectilinearY: 0,
							angleToCursor: 0
						},
						velocity: {
							x: 0,
							y: 0,
							z: 0
						},
						keys: {
							w: false,
							e: false,
							a: false,
							s: false,
							d: false,
							z: false,
							x: false
						},
						cursor: {
							pressed: false,
							rectilinearX: 0,
							rectilinearY: 0,
							x: 0,
							y: 0,
							z: 0
						},
						cooldowns: {
							betweenBlasts: 0,
							blasts: 0,
							fuel: 0
						},
						indicators: {
							blasts: 100,
							fuel: 100,
							shield: 100
						},
						score: 0
					}
			} catch (error) {console.log(error)}
		}

	/* calculatePlayerAcceleration */
		function calculatePlayerAcceleration(player) {
			try {
				// net effect
					const netEffect = {
						x: 0,
						y: 0,
						z: 0
					}

				// no fuel
					if (!player.indicators.fuel) {
						return netEffect
					}

				// buttons / keys
					// s
						if (player.keys.s) {
							player.indicators.fuel = Math.max(0, player.indicators.fuel - CONSTANTS.player.fuelChargePerButton)
							if (!player.indicators.fuel) {
								player.cooldowns.fuel = CONSTANTS.player.fuelDepletionCooldown
							}
							return null
						}

					// x
						if (player.keys.a) {
							player.indicators.fuel = Math.max(0, player.indicators.fuel - CONSTANTS.player.fuelChargePerButton)
							netEffect.x -= 1
						}
						if (player.keys.d) {
							player.indicators.fuel = Math.max(0, player.indicators.fuel - CONSTANTS.player.fuelChargePerButton)
							netEffect.x += 1	
						}

					// y
						if (player.keys.x) {
							player.indicators.fuel = Math.max(0, player.indicators.fuel - CONSTANTS.player.fuelChargePerButton)
							netEffect.y -= 1
						}
						if (player.keys.w) {
							player.indicators.fuel = Math.max(0, player.indicators.fuel - CONSTANTS.player.fuelChargePerButton)
							netEffect.y += 1
						}

					// z
						if (player.keys.e) {
							player.indicators.fuel = Math.max(0, player.indicators.fuel - CONSTANTS.player.fuelChargePerButton)
							netEffect.z -= 1
						}
						if (player.keys.z) {
							player.indicators.fuel = Math.max(0, player.indicators.fuel - CONSTANTS.player.fuelChargePerButton)
							netEffect.z += 1
						}

					// no fuel --> cooldown
						if (!player.indicators.fuel) {
							player.cooldowns.fuel = CONSTANTS.player.fuelDepletionCooldown
						}

				// three buttons pressed
					if      (netEffect.x ==  1 && netEffect.y ==  1 && netEffect.z ==  1) {
						netEffect.x = netEffect.y = netEffect.z = 0
					}
					else if (netEffect.x ==  1 && netEffect.y ==  1 && netEffect.z == -1) {
						netEffect.x = netEffect.y = 0
					}
					else if (netEffect.x ==  1 && netEffect.y == -1 && netEffect.z ==  1) {
						netEffect.x = netEffect.z = 0
					}
					else if (netEffect.x ==  1 && netEffect.y == -1 && netEffect.z == -1) {
						netEffect.y = netEffect.z = 0
					}
					else if (netEffect.x == -1 && netEffect.y ==  1 && netEffect.z ==  1) {
						netEffect.y = netEffect.z = 0
					}
					else if (netEffect.x == -1 && netEffect.y ==  1 && netEffect.z == -1) {
						netEffect.x = netEffect.z = 0
					}
					else if (netEffect.x == -1 && netEffect.y == -1 && netEffect.z ==  1) {
						netEffect.x = netEffect.y = 0
					}
					else if (netEffect.x == -1 && netEffect.y == -1 && netEffect.z == -1) {
						netEffect.x = netEffect.y = netEffect.z = 0
					}

				// two buttons pressed
					// x & y
						else if (netEffect.x ==  1 && netEffect.y ==  1) {
							netEffect.x = netEffect.y = 0
							netEffect.z = -0.5
						}
						else if (netEffect.x ==  1 && netEffect.y == -1) {
							netEffect.x = 0.5
							netEffect.y = -0.5
						}
						else if (netEffect.x ==  -1 && netEffect.y ==  1) {
							netEffect.x = -0.5
							netEffect.y = 0.5
						}
						else if (netEffect.x == -1 && netEffect.y == -1) {
							netEffect.x = netEffect.y = 0
							netEffect.z = 0.5
						}

					// x & z
						else if (netEffect.x ==  1 && netEffect.z ==  1) {
							netEffect.x = netEffect.z = 0
							netEffect.y = -0.5
						}
						else if (netEffect.x ==  1 && netEffect.z == -1) {
							netEffect.x = 0.5
							netEffect.z = -0.5
						}
						else if (netEffect.x ==  -1 && netEffect.z ==  1) {
							netEffect.x = -0.5
							netEffect.z = 0.5
						}
						else if (netEffect.x == -1 && netEffect.z == -1) {
							netEffect.x = netEffect.z = 0
							netEffect.y = 0.5
						}

					// y & z
						else if (netEffect.y ==  1 && netEffect.z ==  1) {
							netEffect.y = netEffect.z = 0
							netEffect.x = -0.5
						}
						else if (netEffect.y ==  1 && netEffect.z == -1) {
							netEffect.y = 0.5
							netEffect.z = -0.5
						}
						else if (netEffect.y ==  -1 && netEffect.z ==  1) {
							netEffect.y = -0.5
							netEffect.z = 0.5
						}
						else if (netEffect.y == -1 && netEffect.z == -1) {
							netEffect.y = netEffect.z = 0.5
							netEffect.x = 0.5
						}

				// convert z to x/y
					return {
						x: netEffect.x * CONSTANTS.player.acceleration,
						y: netEffect.y * CONSTANTS.player.acceleration,
						z: netEffect.z * CONSTANTS.player.acceleration
					}
			} catch (error) {console.log(error)}
		}

	/* calculatePlayerVelocity */
		function calculatePlayerVelocity(player, acceleration) {
			try {
				// current
					const velocity = {
						x: player.velocity.x,
						y: player.velocity.y,
						z: player.velocity.z
					}

				// s
					if (!acceleration) {
						velocity.x = Math.sign(velocity.x) * Math.max(0, Math.abs(velocity.x) - CONSTANTS.player.braking) || 0
						velocity.y = Math.sign(velocity.y) * Math.max(0, Math.abs(velocity.y) - CONSTANTS.player.braking) || 0
						velocity.z = Math.sign(velocity.z) * Math.max(0, Math.abs(velocity.z) - CONSTANTS.player.braking) || 0
					}

				// acceleration
					else {
						// x
							if (acceleration.x) {
								velocity.x = roundNumber(Math.max(-CONSTANTS.player.maxVelocity, Math.min(CONSTANTS.player.maxVelocity, velocity.x + acceleration.x)))
							}
							else {
								velocity.x = roundNumber(Math.sign(velocity.x) * (Math.abs(velocity.x) - CONSTANTS.player.friction) || 0)
							}

						// y
							if (acceleration.y) {
								velocity.y = roundNumber(Math.max(-CONSTANTS.player.maxVelocity, Math.min(CONSTANTS.player.maxVelocity, velocity.y + acceleration.y)))
							}
							else {
								velocity.y = roundNumber(Math.sign(velocity.y) * (Math.abs(velocity.y) - CONSTANTS.player.friction) || 0)
							}

						// z
							if (acceleration.z) {
								velocity.z = roundNumber(Math.max(-CONSTANTS.player.maxVelocity, Math.min(CONSTANTS.player.maxVelocity, velocity.z + acceleration.z)))
							}
							else {
								velocity.z = roundNumber(Math.sign(velocity.z) * (Math.abs(velocity.z) - CONSTANTS.player.friction) || 0)
							}
					}

				// prevent overclocking
					const totalSpeed = Math.abs(velocity.x) + Math.abs(velocity.y) + Math.abs(velocity.z)
					if (totalSpeed > CONSTANTS.player.maxVelocity) {
						velocity.x *= (CONSTANTS.player.maxVelocity / totalSpeed)
						velocity.y *= (CONSTANTS.player.maxVelocity / totalSpeed)
						velocity.z *= (CONSTANTS.player.maxVelocity / totalSpeed)
					}

				// return
					return velocity
			} catch (error) {console.log(error)}
		}

	/* calculatePlayerPosition */
		function calculatePlayerPosition(player) {
			try {
				// not collidable
					if (!player.collidable) {
						player.styling.opacity = Math.max(0, player.styling.opacity - CONSTANTS.player.opacityChangePerIterationWhenDestroyed)
					}

				// current
					const position = {
						x: player.position.x,
						y: player.position.y,
						z: player.position.z
					}

				// x
					position.x = roundNumber(
						position.x + player.velocity.x - player.velocity.y
					)

				// y
					position.y = roundNumber(
						position.y + player.velocity.y - player.velocity.z
					)

				// z
					position.z = 0 - position.x - position.y

				// out of bounds
					if ((position.x < -CONSTANTS.grid.x - 0.5) 		// top-left
					 || (position.x >  CONSTANTS.grid.x + 0.5) 		// bottom-right
					 || (position.y < -CONSTANTS.grid.y - 0.5) 		// bottom-middle
					 || (position.y >  CONSTANTS.grid.y + 0.5) 		// top-middle
					 || (position.z < -CONSTANTS.grid.z - 0.5) 		// top-right
					 || (position.z >  CONSTANTS.grid.z + 0.5)) { 	// bottom-right
						position.x = -position.x
						position.y = -position.y
						position.z = -position.z
					}

				// rectilinear
					const rectilinear = getRectilinearFromHex(position.x, position.y, position.z)
						position.rectilinearX = rectilinear.x
						position.rectilinearY = rectilinear.y

				// collision with bases
					if (player.collidable) {
						for (let b in STATE.bases) {
							if (!STATE.bases[b].collidable) {
								continue
							}

							const collisionData = getCircleCollision({
									x: position.rectilinearX,
									y: position.rectilinearY,
									radius: player.radius,
									hexagon: true
								},
								{
									x: STATE.bases[b].position.rectilinearX,
									y: STATE.bases[b].position.rectilinearY,
									radius: STATE.bases[b].radius,
									hexagon: true
								})
							if (collisionData.isCollision) {
								player.velocity.x *= -1 * CONSTANTS.player.bouncebackRatio
								player.velocity.y *= -1 * CONSTANTS.player.bouncebackRatio
								player.velocity.z *= -1 * CONSTANTS.player.bouncebackRatio
								return player.position
							}
						}
					}

				// angle to cursor
					position.angleToCursor = -1 * getRadialFromRectilinear(STATE.player.cursor.rectilinearX - position.rectilinearX, STATE.player.cursor.rectilinearY - position.rectilinearY).angle

				// return
					return position
			} catch (error) {console.log(error)}
		}

	/* calculatePlayerCooldowns */
		function calculatePlayerCooldowns(player) {
			try {
				// indicators to 0
					if (!player.indicators.shield) {
						player.cooldowns.shield = 1
						player.collidable = false
						return player.cooldowns
					}

				// regenerate
					for (let i in player.indicators) {
						if (!player.cooldowns[i]) {
							player.indicators[i] = Math.max(0, Math.min(100, player.indicators[i] + CONSTANTS.player.indicatorRegenerationRates[i]))
						}
					}

				// empty cooldowns
					const cooldowns = {}

				// loop through
					for (let c in player.cooldowns) {
						cooldowns[c] = Math.max(0, player.cooldowns[c] - 1)
					}

				// return
					return cooldowns
			} catch (error) {console.log(error)}
		}

/*** base ***/
	/* createBase */
		function createBase(x, y, z) {
			try {
				// points
					const rectilinear = getRectilinearFromHex(x, y, z)

				// base
					return {
						id: generateRandom(),
						type: "base",
						collidable: true,
						shield: 100,
						radius: CONSTANTS.base.radiusRatio,
						position: {
							x: x,
							y: y,
							z: z,
							rectilinearX: rectilinear.x,
							rectilinearY: rectilinear.y
						},
						styling: {
							lineColor: CONSTANTS.base.lineColor,
							lineWidth: CONSTANTS.base.lineWidthRatio,
							shadowColor: CONSTANTS.base.shadowColor,
							shadowWidth: CONSTANTS.base.shadowWidthRatio,
							opacity: CONSTANTS.base.opacity,
							shieldColor: CONSTANTS.base.shieldColor,
							shieldOpacity: CONSTANTS.base.shieldOpacity,
							shieldRadius: CONSTANTS.base.shieldRadius,
							podCount: CONSTANTS.base.podCount,
							podColor: CONSTANTS.base.podColor,
							podRadius: CONSTANTS.base.podRadius,
							podDistance: CONSTANTS.base.podDistance,
							podOffsetAngle: CONSTANTS.base.podOffsetAngle
						}
					}
			} catch (error) {console.log(error)}
		}

	/* calculateBaseCooldowns */
		function calculateBaseCooldowns(base) {
			try {
				// no shield
					if (!base.shield) {
						base.collidable = false
						createMiniAsteroids(base)
					}

				// not collidable
					if (!base.collidable) {
						base.styling.opacity = Math.max(0, base.styling.opacity - CONSTANTS.base.opacityChangePerIterationWhenDestroyed)
					}
					if (!base.styling.opacity) {
						return null
					}

				// shield regeneration
					base.shield = Math.max(0, Math.min(100, base.shield + CONSTANTS.base.shieldRegenerationRate))

				// still here
					return true
			} catch (error) {console.log(error)}
		}

/*** blast ***/
	/* createBlast */
		function createBlast(player) {
			try {
				// no ammo
					if (!player.indicators.blasts) {
						return null
					}

				// between
					if (player.cooldowns.betweenBlasts) {
						return null
					}

				// set cooldown
					player.cooldowns.betweenBlasts = CONSTANTS.blast.cooldown
					player.indicators.blasts = Math.max(0, player.indicators.blasts - CONSTANTS.blast.chargePerClick)

				// no ammo --> cooldown
					if (!player.indicators.blasts && !player.cooldowns.blasts) {
						player.cooldowns.blasts = CONSTANTS.player.blastDepletionCooldown
					}

				// get radial from rectilinear
					const rectilinearVelocity = getRectilinearFromRadial(player.position.angleToCursor, CONSTANTS.blast.velocity)
					const hexVelocity = getHexFromRectilinear(rectilinearVelocity.x, rectilinearVelocity.y)

				// create blast object
					const blast = {
						id: generateRandom(),
						type: "blast",
						collidable: true,
						radius: CONSTANTS.blast.radiusRatio,
						styling: {
							backgroundColor: CONSTANTS.blast.backgroundColor,
							shadowColor: CONSTANTS.blast.shadowColor,
							shadowWidth: CONSTANTS.blast.shadowWidthRatio,
							opacity: CONSTANTS.blast.opacity
						},
						position: {
							rectilinearX: player.position.rectilinearX,
							rectilinearY: player.position.rectilinearY,
							x: player.position.x,
							y: player.position.y,
							z: player.position.z
						},
						velocity: {
							x: hexVelocity.x,
							y: hexVelocity.y,
							z: hexVelocity.z
						}
					}

				// return
					return blast
			} catch (error) {console.log(error)}
		}

	/* calculateBlastPosition */
		function calculateBlastPosition(blast) {
			try {
				// current
					const position = {
						x: blast.position.x,
						y: blast.position.y,
						z: blast.position.z
					}

				// x
					position.x = roundNumber(
						position.x + blast.velocity.x - blast.velocity.y
					)

				// y
					position.y = roundNumber(
						position.y + blast.velocity.y - blast.velocity.z
					)

				// z
					position.z = 0 - position.x - position.y

				// out of bounds
					if ((position.x < -CONSTANTS.grid.x - 0.5) 		// top-left
					 || (position.x >  CONSTANTS.grid.x + 0.5) 		// bottom-right
					 || (position.y < -CONSTANTS.grid.y - 0.5) 		// bottom-middle
					 || (position.y >  CONSTANTS.grid.y + 0.5) 		// top-middle
					 || (position.z < -CONSTANTS.grid.z - 0.5) 		// top-right
					 || (position.z >  CONSTANTS.grid.z + 0.5)) { 	// bottom-right
						return null
					}

				// rectilinear
					const rectilinear = getRectilinearFromHex(position.x, position.y, position.z)
						position.rectilinearX = rectilinear.x
						position.rectilinearY = rectilinear.y

				// collision with bases
					if (blast.collidable) {
						for (let b in STATE.bases) {
							if (!STATE.bases[b].collidable) {
								continue
							}

							const collisionData = getCircleCollision({
									x: position.rectilinearX,
									y: position.rectilinearY,
									radius: blast.radius
								},
								{
									x: STATE.bases[b].position.rectilinearX,
									y: STATE.bases[b].position.rectilinearY,
									radius: STATE.bases[b].radius,
									hexagon: true
								})
							if (collisionData.isCollision) {
								blast.collidable = false
								return null
							}
						}
					}

				// collision with asteroids
					if (blast.collidable) {
						for (let a in STATE.asteroids) {
							if (!STATE.asteroids[a].collidable) {
								continue
							}

							const collisionData = getCircleCollision({
									x: position.rectilinearX,
									y: position.rectilinearY,
									radius: blast.radius
								},
								{
									x: STATE.asteroids[a].position.rectilinearX,
									y: STATE.asteroids[a].position.rectilinearY,
									radius: STATE.asteroids[a].radius,
									hexagon: true
								})
							if (collisionData.isCollision) {
								STATE.player.score++
								if (STATE.asteroids[a].type == "asteroid") {
									createMiniAsteroids(STATE.asteroids[a])
									delete STATE.asteroids[a]
								}
								else {
									STATE.asteroids[a].collidable = false
								}
								blast.collidable = false
								return null
							}
						}
					}

				// return
					return position
			} catch (error) {console.log(error)}
		}

/*** asteroid ***/
	/* createAsteroid */
		function createAsteroid(center, type) {
			try {
				// update cooldown
					if (!type || type !== "base") {
						STATE.cooldowns.asteroid = CONSTANTS.asteroid.creationCooldown
					}

				// random border hex
					const hex = center ? center : chooseRandom(STATE.exteriorHexes).split(",")
						hex[0] = Number(hex[0])
						hex[1] = Number(hex[1])
						hex[2] = Number(hex[2])

				// points
					const rectilinear = getRectilinearFromHex(hex[0], hex[1], hex[2])

				// asteroid object
					const asteroid = {
						id: generateRandom(),
						type: center ? "mini-asteroid" : "asteroid",
						collidable: (type && type == "base") ? true : false,
						cooldowns: {
							untilCollidable: (type && type == "base") ? 0 : CONSTANTS.asteroid.untilCollidable
						},
						outside: center ? false : true,
						damage: center ? CONSTANTS.asteroid.shieldReductionPerMiniHit : CONSTANTS.asteroid.shieldReductionPerHit,
						radius: center ? CONSTANTS.asteroid.radiusRatio / 2 : CONSTANTS.asteroid.radiusRatio,
						position: {
							x: hex[0],
							y: hex[1],
							z: hex[2],
							rectilinearX: rectilinear.x,
							rectilinearY: rectilinear.y
						},
						velocity: {
							x: rangeRandom(
								(type == "base") ? -CONSTANTS.asteroid.startingVelocityFromBase : (hex[0] < 0 ? 0 : -CONSTANTS.asteroid.startingVelocity),
								(type == "base") ?  CONSTANTS.asteroid.startingVelocityFromBase : (hex[0] > 0 ? 0 :  CONSTANTS.asteroid.startingVelocity)
							),
							y: rangeRandom(
								(type == "base") ? -CONSTANTS.asteroid.startingVelocityFromBase : (hex[1] < 0 ? 0 : -CONSTANTS.asteroid.startingVelocity),
								(type == "base") ?  CONSTANTS.asteroid.startingVelocityFromBase : (hex[1] > 0 ? 0 :  CONSTANTS.asteroid.startingVelocity)
							),
							z: rangeRandom(
								(type == "base") ? -CONSTANTS.asteroid.startingVelocityFromBase : (hex[2] < 0 ? 0 : -CONSTANTS.asteroid.startingVelocity),
								(type == "base") ?  CONSTANTS.asteroid.startingVelocityFromBase : (hex[2] > 0 ? 0 :  CONSTANTS.asteroid.startingVelocity)
							)
						},
						styling: {
							backgroundColor: CONSTANTS.asteroid.backgroundColor,
							shadowColor: CONSTANTS.asteroid.shadowColor,
							craterColor: CONSTANTS.asteroid.craterColor,
							shadowWidth: CONSTANTS.asteroid.shadowWidthRatio,
							opacity: CONSTANTS.asteroid.opacity
						},
						craters: []
					}

				// craters
					const craterCount = center ? rangeRandom(CONSTANTS.asteroid.minMiniCraters, CONSTANTS.asteroid.maxMiniCraters) : rangeRandom(CONSTANTS.asteroid.minCraters, CONSTANTS.asteroid.maxCraters)
					for (let i = 0; i < craterCount; i++) {
						asteroid.craters.push({
							x: rangeRandom(-asteroid.radius / CONSTANTS.hexShortToLongRatio, asteroid.radius / CONSTANTS.hexShortToLongRatio),
							y: rangeRandom(-asteroid.radius / CONSTANTS.hexShortToLongRatio, asteroid.radius / CONSTANTS.hexShortToLongRatio),
							radius: CONSTANTS.asteroid.craterRadiusRatio,
							styling: {
								backgroundColor: CONSTANTS.asteroid.craterColor,
								opacity: CONSTANTS.asteroid.craterOpacity
							}
						})
					}

				// return
					return asteroid
			} catch (error) {console.log(error)}
		}

	/* createMiniAsteroids */
		function createMiniAsteroids(asteroid) {
			try {
				// center
					if (asteroid.type !== "base") {
						const centerAsteroid = createAsteroid([asteroid.position.x, asteroid.position.y, asteroid.position.z], asteroid.type)
							STATE.asteroids[centerAsteroid.id] = centerAsteroid
					}

				// surrounding the center
					const surroundingAsteroid1 = createAsteroid([asteroid.position.x + 0.25, asteroid.position.y + 0.25, asteroid.position.z - 0.5], asteroid.type)
						STATE.asteroids[surroundingAsteroid1.id] = surroundingAsteroid1
					
					const surroundingAsteroid2 = createAsteroid([asteroid.position.x - 0.25, asteroid.position.y - 0.25, asteroid.position.z + 0.5], asteroid.type)
						STATE.asteroids[surroundingAsteroid2.id] = surroundingAsteroid2
					
					const surroundingAsteroid3 = createAsteroid([asteroid.position.x + 0.25, asteroid.position.y - 0.5, asteroid.position.z + 0.25], asteroid.type)
						STATE.asteroids[surroundingAsteroid3.id] = surroundingAsteroid3
					
					const surroundingAsteroid4 = createAsteroid([asteroid.position.x - 0.25, asteroid.position.y + 0.5, asteroid.position.z - 0.25], asteroid.type)
						STATE.asteroids[surroundingAsteroid4.id] = surroundingAsteroid4
					
					const surroundingAsteroid5 = createAsteroid([asteroid.position.x - 0.5, asteroid.position.y + 0.25, asteroid.position.z + 0.25], asteroid.type)
						STATE.asteroids[surroundingAsteroid5.id] = surroundingAsteroid5
					
					const surroundingAsteroid6 = createAsteroid([asteroid.position.x + 0.5, asteroid.position.y - 0.25, asteroid.position.z - 0.25], asteroid.type)
						STATE.asteroids[surroundingAsteroid6.id] = surroundingAsteroid6
			} catch (error) {console.log(error)}
		}

	/* calculateAsteroidPosition */
		function calculateAsteroidPosition(asteroid) {
			try {
				// current
					const position = {
						x: asteroid.position.x,
						y: asteroid.position.y,
						z: asteroid.position.z
					}

				// x
					position.x = roundNumber(
						position.x + asteroid.velocity.x - asteroid.velocity.y
					)

				// y
					position.y = roundNumber(
						position.y + asteroid.velocity.y - asteroid.velocity.z
					)

				// z
					position.z = 0 - position.x - position.y

				// out of bounds
					if ((position.x < -CONSTANTS.grid.x - 0.5) 		// top-left
					 || (position.x >  CONSTANTS.grid.x + 0.5) 		// bottom-right
					 || (position.y < -CONSTANTS.grid.y - 0.5) 		// bottom-middle
					 || (position.y >  CONSTANTS.grid.y + 0.5) 		// top-middle
					 || (position.z < -CONSTANTS.grid.z - 0.5) 		// top-right
					 || (position.z >  CONSTANTS.grid.z + 0.5)) { 	// bottom-right
					 	if (!asteroid.outside) {
							position.x = -position.x
							position.y = -position.y
							position.z = -position.z
						}
					}
					else if (asteroid.outside) {
						asteroid.outside = false
					}

				// way out of bounds
					if ((position.x < -CONSTANTS.grid.x - 1) 		// top-left
					 || (position.x >  CONSTANTS.grid.x + 1) 		// bottom-right
					 || (position.y < -CONSTANTS.grid.y - 1) 		// bottom-middle
					 || (position.y >  CONSTANTS.grid.y + 1) 		// top-middle
					 || (position.z < -CONSTANTS.grid.z - 1) 		// top-right
					 || (position.z >  CONSTANTS.grid.z + 1)) { 	// bottom-right
					 	return null
					}

				// rectilinear
					const rectilinear = getRectilinearFromHex(position.x, position.y, position.z)
						position.rectilinearX = rectilinear.x
						position.rectilinearY = rectilinear.y

				// collision with bases
					if (asteroid.collidable) {
						for (let b in STATE.bases) {
							if (!STATE.bases[b].collidable) {
								continue
							}

							const collisionData = getCircleCollision({
									x: position.rectilinearX,
									y: position.rectilinearY,
									radius: asteroid.radius,
									hexagon: true
								},
								{
									x: STATE.bases[b].position.rectilinearX,
									y: STATE.bases[b].position.rectilinearY,
									radius: STATE.bases[b].radius,
									hexagon: true
								})
							if (collisionData.isCollision) {
								STATE.bases[b].shield = Math.max(0, STATE.bases[b].shield - asteroid.damage)
								if (asteroid.type == "asteroid") {
									createMiniAsteroids(asteroid)
									return null
								}
								else {
									asteroid.collidable = false
								}
							}
						}
					}

				// collision with player
					if (asteroid.collidable && STATE.player.collidable) {
						const collisionData = getCircleCollision({
								x: position.rectilinearX,
								y: position.rectilinearY,
								radius: asteroid.radius,
								hexagon: true
							},
							{
								x: STATE.player.position.rectilinearX,
								y: STATE.player.position.rectilinearY,
								radius: STATE.player.radius,
								hexagon: true
							})
						if (collisionData.isCollision) {
							STATE.player.score++
							STATE.player.indicators.shield = Math.max(0, STATE.player.indicators.shield - asteroid.damage)
							if (asteroid.type == "asteroid") {
								createMiniAsteroids(asteroid)
								return null
							}
							else {
								asteroid.collidable = false
							}
						}
					}

				// collision with another asteroid
					if (asteroid.collidable) {
						for (let a in STATE.asteroids) {
							// self
								if (STATE.asteroids[a] == asteroid) {
									continue
								}

							// target is not collidable
								if (!STATE.asteroids[a].collidable) {
									continue
								}
							
							// both small --> no collision
								if (asteroid.type == "mini-asteroid" && STATE.asteroids[a].type == "mini-asteroid") {
									continue
								}

							const collisionData = getCircleCollision({
									x: position.rectilinearX,
									y: position.rectilinearY,
									radius: asteroid.radius,
									hexagon: true
								},
								{
									x: STATE.asteroids[a].position.rectilinearX,
									y: STATE.asteroids[a].position.rectilinearY,
									radius: STATE.asteroids[a].radius,
									hexagon: true
								})

							if (collisionData.isCollision) {
								if (STATE.asteroids[a].type == "asteroid") {
									createMiniAsteroids(STATE.asteroids[a])
									delete STATE.asteroids[a]
								}
								else {
									STATE.asteroids[a].collidable = false
								}

								if (asteroid.type == "asteroid") {
									createMiniAsteroids(asteroid)
									return null
								}
								else {
									asteroid.collidable = false
								}
							}

						}
					}

				// return
					return position
			} catch (error) {console.log(error)}
		}

	/* calculateAsteroidCooldowns */
		function calculateAsteroidCooldowns(asteroid) {
			try {
				// spawn
					if (!asteroid.collidable && asteroid.cooldowns.untilCollidable) {
						asteroid.cooldowns.untilCollidable = Math.max(0, asteroid.cooldowns.untilCollidable - 1)
						if (!asteroid.cooldowns.untilCollidable) {
							asteroid.collidable = true
						}
						return true
					}

				// not collidable
					if (!asteroid.collidable) {
						asteroid.styling.opacity = Math.max(0, asteroid.styling.opacity - CONSTANTS.asteroid.opacityChangePerIterationWhenDestroyed)
					}
					if (!asteroid.styling.opacity) {
						return null
					}

				// still here
					return true
			} catch (error) {console.log(error)}
		}
	

/*** canvas - templates ***/
	/* resizeCanvas */
		function resizeCanvas() {
			try {
				// resize
					const minCanvasDimension = Math.min(window.innerWidth, window.innerHeight)
					ELEMENTS.canvas.height = minCanvasDimension
					ELEMENTS.canvas.width = minCanvasDimension

				// hex-radius
					const maxHexDimension = Math.max(CONSTANTS.grid.x, CONSTANTS.grid.y, CONSTANTS.grid.z)
					CONSTANTS.canvas["hex-radius"] = Math.round(minCanvasDimension / (maxHexDimension * 2 + 1 + 2) / (2 * CONSTANTS.hexShortToLongRatio)) // * 2 directions + 1 center + 2 edges + 2 spaces
			} catch (error) {console.log(error)}
		}

	/* translateCanvas */
		function translateCanvas(x, y, callback) {
			try {
				// slide
					ELEMENTS.context.translate(x, -y)

				// do something
					callback()

				// slide back
					ELEMENTS.context.translate(-x, y)
			} catch (error) {console.log(error)}
		}

	/* rotateCanvas */
		function rotateCanvas(a, callback) {
			try {
				// translate to center
					translateCanvas(0, -ELEMENTS.canvas.height, function() {
						// get angle
							const angle = getRadiansFromDegrees(a)

						// rotate
							ELEMENTS.context.rotate(-angle)

						// translate back
							translateCanvas(0, ELEMENTS.canvas.height, function() {
								// do something
									callback()
							})

						// rotate back
							ELEMENTS.context.rotate(angle)
					})
			} catch (error) {console.log(error)}
		}

	/* clearCanvas */
		function clearCanvas() {
			try {
				// clear
					ELEMENTS.context.clearRect(0, 0, ELEMENTS.canvas.width, ELEMENTS.canvas.height)
			} catch (error) {console.log(error)}
		}

	/* drawLine */
		function drawLine(line) {
			try {
				// options
					ELEMENTS.context.strokeStyle = line.styling.lineColor || "transparent"
					ELEMENTS.context.lineWidth   = (line.styling.lineWidth || 1) * CONSTANTS.canvas["hex-radius"]
					ELEMENTS.context.shadowBlur  = (line.styling.shadowWidth || 0) * CONSTANTS.canvas["hex-radius"]
					ELEMENTS.context.shadowColor = line.styling.shadowColor || "transparent"
					ELEMENTS.context.globalAlpha = line.styling.opacity || 0

				// draw
					ELEMENTS.context.beginPath()
					ELEMENTS.context.moveTo(line.a.x * CONSTANTS.canvas["hex-radius"], ELEMENTS.canvas.height - line.a.y * CONSTANTS.canvas["hex-radius"])
					ELEMENTS.context.lineTo(line.b.x * CONSTANTS.canvas["hex-radius"], ELEMENTS.canvas.height - line.b.y * CONSTANTS.canvas["hex-radius"])
					ELEMENTS.context.stroke()
			} catch (error) {console.log(error)}
		}

	/* drawArc */
		function drawArc(arc) {
			try {
				// options
					ELEMENTS.context.strokeStyle = arc.styling.lineColor || "transparent"
					ELEMENTS.context.lineWidth   = (arc.styling.lineWidth || 0) * CONSTANTS.canvas["hex-radius"]
					ELEMENTS.context.fillStyle   = arc.styling.backgroundColor || "transparent"
					ELEMENTS.context.shadowBlur  = (arc.styling.shadowWidth || 0) * CONSTANTS.canvas["hex-radius"]
					ELEMENTS.context.shadowColor = arc.styling.shadowColor || "transparent"
					ELEMENTS.context.globalAlpha = arc.styling.opacity || 0

				// geometry
					const centerX = arc.x * CONSTANTS.canvas["hex-radius"]
					const centerY = ELEMENTS.canvas.height - arc.y * CONSTANTS.canvas["hex-radius"]
					const radius = arc.radius * CONSTANTS.canvas["hex-radius"]
					const startingAngle = ("startingAngle" in arc) ? arc.startingAngle : 0
					const endingAngle = ("endingAngle" in arc) ? arc.endingAngle : CONSTANTS.circle.radians

				// draw
					ELEMENTS.context.beginPath()
					ELEMENTS.context.moveTo(centerX, centerY)
					ELEMENTS.context.arc(centerX, centerY, radius, startingAngle, endingAngle)
					ELEMENTS.context.closePath()
					if (arc.styling.backgroundColor && arc.styling.backgroundColor !== "transparent") {
						ELEMENTS.context.fill()
					}
					if (arc.styling.lineWidth) {
						ELEMENTS.context.stroke()
					}
			} catch (error) {console.log(error)}
		}

	/* drawHexagon */
		function drawHexagon(hexagon) {
			try {
				// options
					ELEMENTS.context.strokeStyle = hexagon.styling.lineColor || "transparent"
					ELEMENTS.context.lineWidth   = (hexagon.styling.lineWidth || 0) * CONSTANTS.canvas["hex-radius"]
					ELEMENTS.context.fillStyle   = hexagon.styling.backgroundColor || "transparent"
					ELEMENTS.context.shadowBlur  = (hexagon.styling.shadowWidth || 0) * CONSTANTS.canvas["hex-radius"]
					ELEMENTS.context.shadowColor = hexagon.styling.shadowColor || "transparent"
					ELEMENTS.context.globalAlpha = hexagon.styling.opacity || 0

				// move
					translateCanvas(hexagon.position.rectilinearX * CONSTANTS.canvas["hex-radius"], hexagon.position.rectilinearY * CONSTANTS.canvas["hex-radius"], function() {
						// get points
							const points = []
								points.push({x: 0, y: 0 + hexagon.radius * 2})
								points.push({x: 0 + hexagon.radius * 2 * CONSTANTS.hexShortToLongRatio, y: 0 + hexagon.radius})
								points.push({x: 0 + hexagon.radius * 2 * CONSTANTS.hexShortToLongRatio, y: 0 - hexagon.radius})
								points.push({x: 0, y: 0 - hexagon.radius * 2})
								points.push({x: 0 - hexagon.radius * 2 * CONSTANTS.hexShortToLongRatio, y: 0 - hexagon.radius})
								points.push({x: 0 - hexagon.radius * 2 * CONSTANTS.hexShortToLongRatio, y: 0 + hexagon.radius})

						// loop through lines of hexagon
							ELEMENTS.context.beginPath()
							ELEMENTS.context.moveTo(points[0].x * CONSTANTS.canvas["hex-radius"], ELEMENTS.canvas.height - points[0].y * CONSTANTS.canvas["hex-radius"])
							ELEMENTS.context.lineTo(points[1].x * CONSTANTS.canvas["hex-radius"], ELEMENTS.canvas.height - points[1].y * CONSTANTS.canvas["hex-radius"])
							ELEMENTS.context.lineTo(points[2].x * CONSTANTS.canvas["hex-radius"], ELEMENTS.canvas.height - points[2].y * CONSTANTS.canvas["hex-radius"])
							ELEMENTS.context.lineTo(points[3].x * CONSTANTS.canvas["hex-radius"], ELEMENTS.canvas.height - points[3].y * CONSTANTS.canvas["hex-radius"])
							ELEMENTS.context.lineTo(points[4].x * CONSTANTS.canvas["hex-radius"], ELEMENTS.canvas.height - points[4].y * CONSTANTS.canvas["hex-radius"])
							ELEMENTS.context.lineTo(points[5].x * CONSTANTS.canvas["hex-radius"], ELEMENTS.canvas.height - points[5].y * CONSTANTS.canvas["hex-radius"])
							ELEMENTS.context.closePath()

						// draw
							if (hexagon.styling.backgroundColor && hexagon.styling.backgroundColor !== "transparent") {
								ELEMENTS.context.fill()
							}
							if (hexagon.styling.lineWidth) {
								ELEMENTS.context.stroke()
							}
					})
			} catch (error) {console.log(error)}
		}

	/* drawMask */
		function drawMask(polygon) {
			try {
				// start
					ELEMENTS.context.beginPath()
					ELEMENTS.context.moveTo(polygon.points[0].x * CONSTANTS.canvas["hex-radius"], ELEMENTS.canvas.height - polygon.points[0].y * CONSTANTS.canvas["hex-radius"])

				// loop
					for (let i = 1; i < polygon.points.length; i++) {
						ELEMENTS.context.lineTo(polygon.points[i].x * CONSTANTS.canvas["hex-radius"], ELEMENTS.canvas.height - polygon.points[i].y * CONSTANTS.canvas["hex-radius"])
					}
					ELEMENTS.context.closePath()

				// clip
					ELEMENTS.context.clip()
			} catch (error) {console.log(error)}
		}

/*** canvas - items ***/
	/* drawGrid */
		function drawGrid(grid) {
			try {
				// loop through grid
					for (let x in grid) {
						for (let y in grid[x]) {
							for (let z in grid[x][y]) {
								drawHexagon(grid[x][y][z])
							}
						}
					}
			} catch (error) {console.log(error)}
		}

	/* drawGridBorder */
		function drawGridBorder(gridBorder) {
			try {
				// hexagon
					for (let l in gridBorder.lines) {
						drawLine({
							a: gridBorder.lines[l].a,
							b: gridBorder.lines[l].b,
							styling: gridBorder.styling
						})
					}

				// corners
					for (let i in gridBorder.lines) {
						drawArc({
							x: gridBorder.lines[i].a.x,
							y: gridBorder.lines[i].a.y,
							radius: gridBorder.styling.lineWidth / 2,
							styling: {
								backgroundColor: gridBorder.styling.lineColor,
								opacity: gridBorder.styling.opacity
							}
						})
					}
			} catch (error) {console.log(error)}
		}

	/* drawBase */
		function drawBase(base) {
			try {
				// ring
					drawHexagon(base)

				// center
					drawHexagon({
						position: {
							rectilinearX: base.position.rectilinearX,
							rectilinearY: base.position.rectilinearY
						},
						radius: base.styling.podDistance / 2,
						styling: {
							backgroundColor: base.styling.podColor,
							opacity: base.styling.opacity / 2,
							shadowColor: base.styling.shadowColor,
							shadowWidth: base.styling.shadowWidth
						}
					})

					drawHexagon({
						position: {
							rectilinearX: base.position.rectilinearX,
							rectilinearY: base.position.rectilinearY
						},
						radius: base.styling.podRadius,
						styling: {
							backgroundColor: base.styling.podColor,
							opacity: base.styling.opacity
						}
					})

				// pods
					translateCanvas(base.position.rectilinearX * CONSTANTS.canvas["hex-radius"], base.position.rectilinearY * CONSTANTS.canvas["hex-radius"], function() {
						for (let i = 0; i < base.styling.podCount; i++) {
							const angle = (CONSTANTS.circle.degrees / base.styling.podCount * i) + base.styling.podOffsetAngle
							rotateCanvas(angle, function() {
								drawHexagon({
									position: {
										rectilinearX: base.styling.podDistance,
										rectilinearY: 0
									},
									radius: base.styling.podRadius,
									styling: {
										backgroundColor: base.styling.podColor,
										opacity: base.styling.opacity,
										shadowColor: base.styling.shadowColor,
										shadowWidth: base.styling.shadowWidth
									}
								})
								drawArc({
									x: base.styling.podDistance,
									y: 0,
									radius: base.styling.podRadius,
									styling: {
										backgroundColor: base.styling.lineColor,
										opacity: base.styling.opacity
									}
								})
							})
						}
					})

				// shield
					drawArc({
						x: base.position.rectilinearX,
						y: base.position.rectilinearY,
						radius: base.radius * base.styling.shieldRadius * (base.shield / 100),
						styling: {
							backgroundColor: base.styling.shieldColor,
							opacity: base.styling.shieldOpacity
						}
					})
			} catch (error) {console.log(error)}
		}

	/* drawPlayer */
		function drawPlayer(player) {
			try {
				// engines
					if (!player.cooldowns.fuel) {
						// angles
							const angles = []
							let radius = player.styling.thrustRadius
							if (player.keys.s) {
								radius = radius * CONSTANTS.player.thrustStopRatio
								for (let i in CONSTANTS.player.thrustAngles) {
									angles.push(CONSTANTS.player.thrustAngles[i])
								}
							}
							else {
								for (let key in player.keys) {
									if (player.keys[key]) {
										angles.push(CONSTANTS.player.thrustAngles[key])
									}
								}
							}
					
						// draw
							for (let i in angles) {
								drawArc({
									x: player.position.rectilinearX,
									y: player.position.rectilinearY,
									radius: radius,
									startingAngle: angles[i] - player.styling.thrustAngle,
									endingAngle: angles[i] + player.styling.thrustAngle,
									styling: {
										backgroundColor: player.styling.thrustColor,
										opacity: player.styling.thrustOpacity * player.styling.opacity
									}
								})
							}
					}

				// thrusters
					translateCanvas(player.position.rectilinearX * CONSTANTS.canvas["hex-radius"], player.position.rectilinearY * CONSTANTS.canvas["hex-radius"], function() {
						for (let i = 0; i < player.styling.podCount; i++) {
							const angle = (CONSTANTS.circle.degrees / player.styling.podCount * i)
							rotateCanvas(angle, function() {
								drawHexagon({
									position: {
										rectilinearX: player.styling.podDistance,
										rectilinearY: 0
									},
									radius: player.styling.podRadius,
									styling: {
										backgroundColor: player.styling.podColor,
										opacity: player.styling.opacity,
										shadowColor: player.styling.shadowColor,
										shadowWidth: player.styling.shadowWidth
									}
								})
							})
						}
					})

				// core
					drawHexagon(player)

					drawArc({
						x: player.position.rectilinearX,
						y: player.position.rectilinearY,
						radius: player.styling.podRadius,
						styling: {
							backgroundColor: player.styling.podColor,
							opacity: player.styling.opacity
						}
					})

				// gun
					const gunAngle = (player.cooldowns.betweenBlasts == CONSTANTS.blast.cooldown) ? player.styling.gunAngle : (player.styling.gunAngle / 2)
					drawArc({
						x: player.position.rectilinearX,
						y: player.position.rectilinearY,
						radius: player.styling.gunRadius,
						startingAngle: player.position.angleToCursor - gunAngle,
						endingAngle: player.position.angleToCursor + gunAngle,
						styling: {
							backgroundColor: player.styling.gunColor,
							opacity: player.styling.gunOpacity * player.styling.opacity
						}
					})

				// shield
					drawArc({
						x: player.position.rectilinearX,
						y: player.position.rectilinearY,
						radius: player.radius * player.styling.shieldRadius * (player.indicators.shield / 100),
						styling: {
							backgroundColor: player.styling.shieldColor,
							opacity: player.styling.shieldOpacity
						}
					})
			} catch (error) {console.log(error)}
		}

	/* drawAsteroid */
		function drawAsteroid(asteroid) {
			try {
				// outer
					drawHexagon(asteroid)

				// craters
					for (let i in asteroid.craters) {
						drawArc({
							x: asteroid.position.rectilinearX + asteroid.craters[i].x * CONSTANTS.hexShortToLongRatio,
							y: asteroid.position.rectilinearY + asteroid.craters[i].y * CONSTANTS.hexShortToLongRatio,
							radius: asteroid.craters[i].radius,
							styling: asteroid.craters[i].styling
						})
					}
			} catch (error) {console.log(error)}
		}

	/* drawBlast */
		function drawBlast(blast) {
			try {
				// outer
					drawArc({
						x: blast.position.rectilinearX,
						y: blast.position.rectilinearY,
						radius: blast.radius,
						styling: blast.styling
					})
			} catch (error) {console.log(error)}
		}

	/* drawState */
		function drawState() {
			try {
				// clear
					clearCanvas()

				// slide to center
					translateCanvas(ELEMENTS.canvas.width / 2, ELEMENTS.canvas.height / 2, function() {
						// clip
							ELEMENTS.context.save()
							drawMask(STATE.gridBorder)

						// grid
							drawGrid(STATE.grid)

						// bases
							for (let b in STATE.bases) {
								drawBase(STATE.bases[b])
							}

						// draw blasts
							for (let b in STATE.blasts) {
								drawBlast(STATE.blasts[b])
							}

						// player
							drawPlayer(STATE.player)

						// asteroids
							for (let a in STATE.asteroids) {
								drawAsteroid(STATE.asteroids[a])
							}

						// outer border
							ELEMENTS.context.restore()
							drawGridBorder(STATE.gridBorder)

						// score
							ELEMENTS.score.innerText = STATE.player.score || ""

						// indicators
							for (let i in STATE.player.indicators) {
								ELEMENTS.indicators[i].style.height = STATE.player.indicators[i] + "%"
								if (!STATE.player.indicators[i]) {
									ELEMENTS.indicators[i].setAttribute("depleted", true)
									ELEMENTS.indicators[i + "Text"].setAttribute("depleted", true)
								}
								else {
									ELEMENTS.indicators[i].removeAttribute("depleted")
									ELEMENTS.indicators[i + "Text"].removeAttribute("depleted")
								}
							}
					})
			} catch (error) {console.log(error)}
		}
