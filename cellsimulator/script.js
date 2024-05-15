/*** triggers ***/
	var TRIGGERS = {
		click: "click",
		resize: "resize",
		change: "change",
		input: "input"
	}

/*** elements ***/
	var ELEMENTS = {
		canvas: document.querySelector("#canvas"),
		context: document.querySelector("#canvas").getContext("2d"),
		controls: {
			element: document.querySelector("#controls"),
			zoomIn: document.querySelector("#controls-zoom-in"),
			zoomOut: document.querySelector("#controls-zoom-out"),
			panLeft: document.querySelector("#controls-pan-left"),
			panUp: document.querySelector("#controls-pan-up"),
			panDown: document.querySelector("#controls-pan-down"),
			panRight: document.querySelector("#controls-pan-right"),
			play: document.querySelector("#controls-play"),
			pause: document.querySelector("#controls-pause")
		},
		settings: {
			element: document.querySelector("#settings"),
			clear: document.querySelector("#settings-clear"),
			random: document.querySelector("#settings-random"),
			randomRadius: document.querySelector("#settings-random-radius"),
			rulesTime: document.querySelector("#settings-generation-time"),
			rules0: document.querySelector("#settings-rules-0"),
			rules1: document.querySelector("#settings-rules-1"),
			rules2: document.querySelector("#settings-rules-2"),
			rules3: document.querySelector("#settings-rules-3"),
			rules4: document.querySelector("#settings-rules-4"),
			rules5: document.querySelector("#settings-rules-5"),
			rules6: document.querySelector("#settings-rules-6"),
			rules7: document.querySelector("#settings-rules-7"),
			rules8: document.querySelector("#settings-rules-8")
		}
	}

/*** globals ***/
	var CONSTANTS = {
		cellSize: 16,
		randomBounds: 16,
		randomChance: 0.25,
		cellColor: "#777777",
		zoomStep: 0.25,
		minimumZoom: -4,
		maximumZoom: 4,
		panStep: 10
	}

	var GAMESTATE = {
		loop: null,
		settings: {
			zoom: 0,
			cellSize: 16,
			offsetX: 0,
			offsetY: 0,
			time: 100,
			"0": -1,
			"1": -1,
			"2": 0,
			"3": 1,
			"4": -1,
			"5": -1,
			"6": -1,
			"7": -1,
			"8": -1,
		},
		liveCells: {}
	}

/*** resize ***/
	/* resizeWindow */
		window.addEventListener(TRIGGERS.resize, resizeWindow)
		resizeWindow()
		function resizeWindow(event) {
			try {
				// update canvas
					ELEMENTS.canvas.height = window.innerHeight
					ELEMENTS.canvas.width = window.innerWidth

				// redraw
					displayGame()
			} catch (error) {console.log(error)}
		}

/*** interaction ***/
	/* clearGame */
		ELEMENTS.settings.clear.addEventListener(TRIGGERS.click, clearGame)
		function clearGame(event) {
			try {
				// reset
					GAMESTATE.liveCells = []

				// display
					displayGame()
			} catch (error) {console.log(error)}
		}

	/* randomizeGame */
		ELEMENTS.settings.random.addEventListener(TRIGGERS.click, randomizeGame)
		ELEMENTS.settings.randomRadius.addEventListener(TRIGGERS.change, randomizeGame)
		randomizeGame()
		function randomizeGame(event) {
			try {
				// editing radius
					if (document.activeElement == ELEMENTS.settings.randomRadius) {
						return
					}
					
				// reset
					GAMESTATE.liveCells = []

				// get bounds
					var radius = Number(ELEMENTS.settings.randomRadius.value) || 0

				// fill area
					for (var x = -radius; x <= radius; x++) {
						for (var y = -radius; y <= radius; y++) {
							if (Math.random() < CONSTANTS.randomChance) {
								GAMESTATE.liveCells[x + "," + y] = true
							}
						}
					}

				// display
					displayGame()
			} catch (error) {console.log(error)}
		}

	/* updateRule */
		ELEMENTS.settings.rulesTime.addEventListener(TRIGGERS.change, updateRule)
		for (var i = 0; i <= 8; i++) {
			ELEMENTS.settings["rules" + i].addEventListener(TRIGGERS.change, updateRule)
		}
		function updateRule(event) {
			try {
				// id
					var idArray = event.target.id.split("-")
					var id = idArray[idArray.length - 1]

				// set rule
					GAMESTATE.settings[id] = Number(event.target.value)

				// time?
					if (id == "time") {
						pauseGame()
						startGame()
					}
			} catch (error) {console.log(error)}
		}

/*** controls ***/
	/* pause */
		ELEMENTS.controls.pause.addEventListener(TRIGGERS.click, pauseGame)
		function pauseGame(event) {
			try {
				// switch mode
					ELEMENTS.controls.element.setAttribute("mode", "pause")

				// kill loop
					clearInterval(GAMESTATE.loop)
					GAMESTATE.loop = null
			} catch (error) {console.log(error)}
		}

	/* play */
		ELEMENTS.controls.play.addEventListener(TRIGGERS.click, startGame)
		function startGame(event) {
			try {
				// switch mode
					ELEMENTS.controls.element.setAttribute("mode", "play")

				// start loop
					GAMESTATE.loop = setInterval(computeGame, GAMESTATE.settings.time)
			} catch (error) {console.log(error)}
		}

	/* zoom */
		ELEMENTS.controls.zoomIn.addEventListener(TRIGGERS.click, zoomInGame)
		function zoomInGame(event) {
			try {
				// update zoom
					GAMESTATE.settings.zoom = Math.min(CONSTANTS.maximumZoom, Math.round((GAMESTATE.settings.zoom + CONSTANTS.zoomStep) * 100) / 100)
					GAMESTATE.settings.cellSize = CONSTANTS.cellSize * Math.pow(2, Number(GAMESTATE.settings.zoom))

				// redraw
					displayGame()
			} catch (error) {console.log(error)}
		}

		ELEMENTS.controls.zoomOut.addEventListener(TRIGGERS.click, zoomOutGame)
		function zoomOutGame(event) {
			try {
				// update zoom
					GAMESTATE.settings.zoom = Math.max(CONSTANTS.minimumZoom, Math.round((GAMESTATE.settings.zoom - CONSTANTS.zoomStep) * 100) / 100)
					GAMESTATE.settings.cellSize = CONSTANTS.cellSize * Math.pow(2, Number(GAMESTATE.settings.zoom))

				// redraw
					displayGame()
			} catch (error) {console.log(error)}
		}

	/* pan */
		ELEMENTS.controls.panLeft.addEventListener(TRIGGERS.click, panLeftGame)
		function panLeftGame(event) {
			try {
				// update pan
					GAMESTATE.settings.offsetX = GAMESTATE.settings.offsetX + (GAMESTATE.settings.cellSize * CONSTANTS.panStep)

				// redraw
					displayGame()
			} catch (error) {console.log(error)}
		}

		ELEMENTS.controls.panRight.addEventListener(TRIGGERS.click, panRightGame)
		function panRightGame(event) {
			try {
				// update pan
					GAMESTATE.settings.offsetX = GAMESTATE.settings.offsetX - (GAMESTATE.settings.cellSize * CONSTANTS.panStep)

				// redraw
					displayGame()
			} catch (error) {console.log(error)}
		}

		ELEMENTS.controls.panUp.addEventListener(TRIGGERS.click, panUpGame)
		function panUpGame(event) {
			try {
				// update pan
					GAMESTATE.settings.offsetY = GAMESTATE.settings.offsetY + (GAMESTATE.settings.cellSize * CONSTANTS.panStep)

				// redraw
					displayGame()
			} catch (error) {console.log(error)}
		}

		ELEMENTS.controls.panDown.addEventListener(TRIGGERS.click, panDownGame)
		function panDownGame(event) {
			try {
				// update pan
					GAMESTATE.settings.offsetY = GAMESTATE.settings.offsetY - (GAMESTATE.settings.cellSize * CONSTANTS.panStep)

				// redraw
					displayGame()
			} catch (error) {console.log(error)}
		}

	/* clickCanvas */
		ELEMENTS.canvas.addEventListener(TRIGGERS.click, clickCanvas)
		function clickCanvas(event) {
			try {
				// get coordinates
					var x = event.touches ? event.touches[0].clientX : event.clientX
					var y = event.touches ? event.touches[0].clientY : event.clientY

				// convert to canvas coordinates
					var canvasX = Math.round((x - (ELEMENTS.canvas.width  / 2) - GAMESTATE.settings.offsetX) / GAMESTATE.settings.cellSize)
					var canvasY = Math.round(((ELEMENTS.canvas.height / 2) - y + GAMESTATE.settings.offsetY) / GAMESTATE.settings.cellSize)

				// toggle cell
					if (GAMESTATE.liveCells[canvasX + "," + canvasY]) {
						delete GAMESTATE.liveCells[canvasX + "," + canvasY]
					}
					else {
						GAMESTATE.liveCells[canvasX + "," + canvasY] = true
					}

				// redraw
					displayGame()
			} catch (error) {console.log(error)}
		}

/*** game ***/
	/* computeGame */
		function computeGame() {
			try {
				// temporary array
					var nextState = {}

				// loop through liveCells
					for (var i in GAMESTATE.liveCells) {
						// get coordinates
							var coordinates = i.split(",")
							var x = Number(coordinates[0])
							var y = Number(coordinates[1])

						// compute itself
							if (getNextAlive(true, getLiveNeighborCount(x, y))) {
								nextState[x + "," + y] = true
							}

						// compute neighbors, but only if currently dead and not already known to be alive next time
							// n
								if (!GAMESTATE.liveCells[x + "," + (y + 1)] && !nextState[x + "," + (y + 1)]) {
									if (getNextAlive(false, getLiveNeighborCount(x, y + 1))) {
										nextState[x + "," + (y + 1)] = true
									}
								}

							// ne
								if (!GAMESTATE.liveCells[(x + 1) + "," + (y + 1)] && !nextState[(x + 1) + "," + (y + 1)]) {
									if (getNextAlive(false, getLiveNeighborCount(x + 1, y + 1))) {
										nextState[(x + 1) + "," + (y + 1)] = true
									}
								}

							// e
								if (!GAMESTATE.liveCells[(x + 1) + "," + y] && !nextState[(x + 1) + "," + y]) {
									if (getNextAlive(false, getLiveNeighborCount(x + 1, y))) {
										nextState[(x + 1) + "," + y] = true
									}
								}

							// se
								if (!GAMESTATE.liveCells[(x + 1) + "," + (y - 1)] && !nextState[(x + 1) + "," + (y - 1)]) {
									if (getNextAlive(false, getLiveNeighborCount(x + 1, y - 1))) {
										nextState[(x + 1) + "," + (y - 1)] = true
									}
								}

							// s
								if (!GAMESTATE.liveCells[x + "," + (y - 1)] && !nextState[x + "," + (y - 1)]) {
									if (getNextAlive(false, getLiveNeighborCount(x, y - 1))) {
										nextState[x + "," + (y - 1)] = true
									}
								}

							// sw
								if (!GAMESTATE.liveCells[(x - 1) + "," + (y - 1)] && !nextState[(x - 1) + "," + (y - 1)]) {
									if (getNextAlive(false, getLiveNeighborCount(x - 1, y - 1))) {
										nextState[(x - 1) + "," + (y - 1)] = true
									}
								}

							// w
								if (!GAMESTATE.liveCells[(x - 1) + "," + y] && !nextState[(x - 1) + "," + y]) {
									if (getNextAlive(false, getLiveNeighborCount(x - 1, y))) {
										nextState[(x - 1) + "," + y] = true
									}
								}

							// nw
								if (!GAMESTATE.liveCells[(x - 1) + "," + (y + 1)] && !nextState[(x - 1) + "," + (y + 1)]) {
									if (getNextAlive(false, getLiveNeighborCount(x - 1, y + 1))) {
										nextState[(x - 1) + "," + (y + 1)] = true
									}
								}
					}

				// update current state
					GAMESTATE.liveCells = nextState

				// display
					displayGame()
			} catch (error) {console.log(error)}
		}

	/* getLiveNeighborCount */
		function getLiveNeighborCount(x, y) {
			try {
				// assume 0
					var liveNeighborCount = 0

				// get all directions
					// n
						if (GAMESTATE.liveCells[x + "," + (y + 1)]) {
							liveNeighborCount++
						}

					// ne
						if (GAMESTATE.liveCells[(x + 1) + "," + (y + 1)]) {
							liveNeighborCount++
						}

					// e
						if (GAMESTATE.liveCells[(x + 1) + "," + y]) {
							liveNeighborCount++
						}

					// se
						if (GAMESTATE.liveCells[(x + 1) + "," + (y - 1)]) {
							liveNeighborCount++
						}

					// s
						if (GAMESTATE.liveCells[x + "," + (y - 1)]) {
							liveNeighborCount++
						}

					// sw
						if (GAMESTATE.liveCells[(x - 1) + "," + (y - 1)]) {
							liveNeighborCount++
						}

					// w
						if (GAMESTATE.liveCells[(x - 1) + "," + y]) {
							liveNeighborCount++
						}

					// nw
						if (GAMESTATE.liveCells[(x - 1) + "," + (y + 1)]) {
							liveNeighborCount++
						}

				// return
					return liveNeighborCount
			} catch (error) {console.log(error)}
		}

	/* getNextAlive */
		function getNextAlive(aliveNow, liveNeighborCount) {
			try {
				// get rule
					var change = Number(GAMESTATE.settings[String(liveNeighborCount)])
					var current = aliveNow ? 1 : 0

				// compute new state
					return (current + change > 0) ? true : false
			} catch (error) {console.log(error)}
		}

	/* displayGame */
		function displayGame() {
			try {
				// clear canvas
					ELEMENTS.context.clearRect(0, 0, ELEMENTS.canvas.width, ELEMENTS.canvas.height)

				// slide to center
					translateCanvas(ELEMENTS.canvas.width / 2 + GAMESTATE.settings.offsetX, -1 * ELEMENTS.canvas.height / 2 + GAMESTATE.settings.offsetY, function () {
						// loop through live cells
							for (var i in GAMESTATE.liveCells) {
								// get coordinates
									var coordinates = i.split(",")
									var x = Number(coordinates[0])
									var y = Number(coordinates[1])

								// draw square
									drawRectangle({
										x: x * GAMESTATE.settings.cellSize,
										y: y * GAMESTATE.settings.cellSize,
										width: GAMESTATE.settings.cellSize,
										height: GAMESTATE.settings.cellSize,
										color: CONSTANTS.cellColor
									})
							}
						})
			} catch (error) {console.log(error)}
		}

	/* translateCanvas */
		function translateCanvas(x, y, callback) {
			try {
				// move
					ELEMENTS.context.translate(x, y)

				// run function
					callback()

				// move back for next time
					ELEMENTS.context.translate(-x, -y)
			} catch (error) {console.log(error)}
		}

	/* drawRectangle */
		function drawRectangle(options) {
			try {
				// parameters
					options = options || {}
					ELEMENTS.context.beginPath()
					ELEMENTS.context.fillStyle = options.color || "transparent"
					
				// geometry
					var x = options.x - (options.width / 2)
					var y = options.y - (options.height / 2)

				// draw
					ELEMENTS.context.fillRect(x, ELEMENTS.canvas.height - y, options.width, -1 * options.height)
			} catch (error) {console.log(error)}
		}