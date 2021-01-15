window.onload = function() {
	/*** onload ***/
		/* triggers */
			if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
				var on = { click: "touchstart", mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend", mouseenter: "touchmove" }
			}
			else {
				var on = { click:      "click", mousedown:  "mousedown", mousemove: "mousemove", mouseup:  "mouseup", mouseenter: "mouseenter" }
			}

		/* prevent long press */
			window.addEventListener("contextmenu", function(event) {
				event.preventDefault()
			})

		/* globals */
			var EMPTYCOLOR = "#dddddd"
			var BORDERCOLOR = "transparent"
			var GRIDWIDTH  = 12
			var GRIDHEIGHT = 12
			var CABLECOUNT = 18

		/* elements */
			var ROOT = document.documentElement
			var GRID = document.getElementById("grid")
			var OVERLAY = document.getElementById("overlay")
			var MOVES = document.getElementById("moves")
			var REFRESH = document.getElementById("refresh")

		/* state */
			var GAMESTATE = {
				options: {
					x: GRIDWIDTH,
					y: GRIDHEIGHT,
					cables: CABLECOUNT,
					iterations: GRIDWIDTH * GRIDHEIGHT
				},
				playing: false,
				selected: null,
				moves: 0,
				moved: false,
				grid: {},
				cables: {}
			}
			window.GAMESTATE = GAMESTATE

	/*** setup ***/
		/* createGame */
			REFRESH.addEventListener(on.click, createGame)
			createGame()
			function createGame() {
				// clear out
					MOVES.innerHTML = ""
					GRID.innerHTML = ""
					OVERLAY.setAttribute("invisible", true)

				// reset game state
					GAMESTATE.options.iterations = GAMESTATE.options.x * GAMESTATE.options.y
					GAMESTATE.playing = false
					GAMESTATE.selected = null
					GAMESTATE.moves = 0
					GAMESTATE.moved = false
					GAMESTATE.grid = {}
					GAMESTATE.cables = []

				// style
					ROOT.style.setProperty("--grid-height", GAMESTATE.options.y)
					ROOT.style.setProperty("--grid-width",  GAMESTATE.options.x)

				// build grid
					buildGrid()
					buildCables()
					placeSockets()
					moveSockets()
					removeCables()

				// display
					displaySockets()
					displayCables()

				// play
					GAMESTATE.playing = true
			}

		/* buildGrid */
			function buildGrid() {
				// loop through rows
					for (var y = 0; y < GAMESTATE.options.y; y++) {
						// build row
							var row = document.createElement("div")
								row.className = "row"
							GRID.appendChild(row)

						// loop through columns
							for (var x = 0; x < GAMESTATE.options.x; x++) {
								// build cell
									var cell = document.createElement("div")
										cell.className = "cell"
										cell.setAttribute("x", x)
										cell.setAttribute("y", y)
										cell.addEventListener(on.mousedown, touchCell)
										cell.addEventListener(on.mouseenter, enterCell)
									row.appendChild(cell)

								// add to grid
									if (!GAMESTATE.grid[x]) {
										GAMESTATE.grid[x] = {}
									}
									GAMESTATE.grid[x][y] = {
										x: x,
										y: y,
										cell: cell,
										cable: null,
										socket: null
									}
							}
					}
			}

		/* buildCables */
			function buildCables() {
				// loop through cables
					for (var c = 0; c < GAMESTATE.options.cables; c++) {
						// random color
							do {
								var red   = Math.floor(Math.random() * 4) * 60
								var green = Math.floor(Math.random() * 4) * 60
								var blue  = Math.floor(Math.random() * 4) * 60
								var color = "rgb(" + red + "," + green + "," + blue + ")"
							}
							while (GAMESTATE.cables[color])

						// add to list
							GAMESTATE.cables[color] = {
								color: color,
								connected: false,
								startSocket: {
									x: null,
									y: null,
									d: null
								},
								endSocket: {
									x: null,
									y: null
								},
								chain: [],
							}
					}
			}

		/* placeSockets */
			function placeSockets() {
				// count
					var count = 0

				// loop through cables
					for (var c in GAMESTATE.cables) {
						// startSocket (and thus end of chain)
							// null x, y, emptyNeighbors
								var x = null
								var y = null
								var emptyNeighbors = []

							// first four are corners
								if (count < 4) {
									if (count == 0) {
										x = 0
										y = 0
									}
									else if (count == 1) {
										x = GAMESTATE.options.x - 1
										y = 0
									}
									else if (count == 2) {
										x = GAMESTATE.options.x - 1
										y = GAMESTATE.options.y - 1
									}
									else if (count == 3) {
										x = 0
										y = GAMESTATE.options.y - 1
									}
									
									emptyNeighbors = getEmptyNeighbors(x, y, null)
								}

							// randomly generate x & y, check for occupants & too many neighbors
								else {
									do {
										x = Math.floor(Math.random() * GAMESTATE.options.x)
										y = Math.floor(Math.random() * GAMESTATE.options.y)
										emptyNeighbors = getEmptyNeighbors(x, y, null)
									}
									while (GAMESTATE.grid[x][y].cable || GAMESTATE.grid[x][y].socket || !emptyNeighbors.length)
								}

							// update the grid
								GAMESTATE.grid[x][y].cable  = GAMESTATE.cables[c].color
								GAMESTATE.grid[x][y].socket = GAMESTATE.cables[c].color

							// update the cable to have a startSocket and a current end
								GAMESTATE.cables[c].startSocket.x = x
								GAMESTATE.cables[c].startSocket.y = y
								GAMESTATE.cables[c].chain.push({
									x: x,
									y: y
								})

						// endSocket
							// pick one of the empty neighbors
								var randomNeighbor = emptyNeighbors[Math.floor(Math.random() * emptyNeighbors.length)]

							// update the grid
								GAMESTATE.grid[randomNeighbor.x][randomNeighbor.y].socket = GAMESTATE.cables[c].color
								GAMESTATE.grid[randomNeighbor.x][randomNeighbor.y].cable = GAMESTATE.cables[c].color

							// update the cable to have endSocket
								GAMESTATE.cables[c].endSocket.x = randomNeighbor.x
								GAMESTATE.cables[c].endSocket.y = randomNeighbor.y

						// increment count
							count++
					}
			}

		/* moveSockets */
			function moveSockets() {
				// iterations
					GAMESTATE.options.iterations--

				// loop through starts
					for (var c in GAMESTATE.cables) {
						// get empty neighbors of startSocket
							var startSocket = GAMESTATE.cables[c].startSocket
							var emptyNeighbors = getEmptyNeighbors(startSocket.x, startSocket.y, GAMESTATE.cables[c].color)

						// neighbors?
							if (emptyNeighbors.length) {
								// unset coords
									var newCoords = null

								// sorted direction (least same)
									if (!newCoords) {
										emptyNeighbors = emptyNeighbors.sort(function(a, b) {
											return a.same.length - b.same.length
										})
										var newCoords = emptyNeighbors[0]
										if (newCoords.same.length > 1) {
											continue
										}
									}

								// unset old cell's socket
									var oldCell = GAMESTATE.grid[startSocket.x][startSocket.y]
										oldCell.socket = null

								// set new cell's cable and socket
									var newCell = GAMESTATE.grid[newCoords.x][newCoords.y]
										newCell.cable  = GAMESTATE.cables[c].color
										newCell.socket = GAMESTATE.cables[c].color

								// update startSocket and end of chain coordinates
									GAMESTATE.cables[c].chain[0].x = startSocket.x = newCoords.x
									GAMESTATE.cables[c].chain[0].y = startSocket.y = newCoords.y
									startSocket.d = newCoords.d
							}
					}

				// loop through ends
					for (var c in GAMESTATE.cables) {
						// get empty neighbors of endSocket
							var endSocket = GAMESTATE.cables[c].endSocket
							var emptyNeighbors = getEmptyNeighbors(endSocket.x, endSocket.y, GAMESTATE.cables[c].color)

						// neighbors?
							if (emptyNeighbors.length) {
								// unset coords
									var newCoords = null

								// sorted direction (least same)
									if (!newCoords) {
										emptyNeighbors = emptyNeighbors.sort(function(a, b) {
											return a.same.length - b.same.length
										})
										var newCoords = emptyNeighbors[0]
										if (newCoords.same.length > 1) {
											continue
										}
									}

								// unset old cell's socket
									var oldCell = GAMESTATE.grid[endSocket.x][endSocket.y]
										oldCell.socket = null

								// set new cell's cable and socket
									var newCell = GAMESTATE.grid[newCoords.x][newCoords.y]
										newCell.cable  = GAMESTATE.cables[c].color
										newCell.socket = GAMESTATE.cables[c].color

								// update endSocket coordinates
									endSocket.x = newCoords.x
									endSocket.y = newCoords.y
									endSocket.d = newCoords.d
							}
					}

				// many changes and many empty cells? keep going
					if (GAMESTATE.options.iterations && getEmptyCells().length) {
						moveSockets()
					}
			}

		/* removeCables */
			function removeCables() {
				// loop through grid
					for (var x in GAMESTATE.grid) {
						for (var y in GAMESTATE.grid[x]) {
							// clear cable except sockets
								if (!GAMESTATE.grid[x][y].socket) {
									GAMESTATE.grid[x][y].cable = null
								}
						}
					}

				// loop through cables
					for (var c in GAMESTATE.cables) {
						// clear endSocket
							var x = GAMESTATE.cables[c].endSocket.x
							var y = GAMESTATE.cables[c].endSocket.y
							GAMESTATE.grid[x][y].cable = null

						// clear last direction
							GAMESTATE.cables[c].startSocket.d = null
							GAMESTATE.cables[c].endSocket.d   = null
					}
			}

		/* displaySockets */
			function displaySockets() {
				// loop through grid
					for (var x in GAMESTATE.grid) {
						for (var y in GAMESTATE.grid[x]) {
							// socket?
								if (GAMESTATE.grid[x][y].socket) {
									GAMESTATE.grid[x][y].cell.setAttribute("socket", true)
									GAMESTATE.grid[x][y].cell.style.borderColor = GAMESTATE.grid[x][y].socket
								}

							// otherwise
								else {
									GAMESTATE.grid[x][y].cell.removeAttribute("socket")
									GAMESTATE.grid[x][y].cell.style.borderColor = BORDERCOLOR
								}
						}
					}
			}

	/*** play ***/
		/* displayCables */
			function displayCables() {
				// loop through grid
					for (var x in GAMESTATE.grid) {
						for (var y in GAMESTATE.grid[x]) {
							// cable?
								if (GAMESTATE.grid[x][y].cable) {
									GAMESTATE.grid[x][y].cell.setAttribute("cable", true)
									GAMESTATE.grid[x][y].cell.style.backgroundColor = GAMESTATE.grid[x][y].cable
								}

							// no cable
								else {
									GAMESTATE.grid[x][y].cell.removeAttribute("cable")
									GAMESTATE.grid[x][y].cell.style.backgroundColor = EMPTYCOLOR
								}
						}
					}
			}

		/* touchCell */
			function touchCell(event) {
				if (GAMESTATE.playing && !GAMESTATE.selected) {
					// get coords
						var x = Number(event.target.getAttribute("x"))
						var y = Number(event.target.getAttribute("y"))

					// get cable color
						if (GAMESTATE.grid[x][y].cable) {
							GAMESTATE.selected = GAMESTATE.grid[x][y].cable
							GRID.setAttribute("grabbing", true)
						}

					// no cable
						else {
							GAMESTATE.selected = null
						}
				}
			}

		/* untouchCell */
			window.addEventListener(on.mouseup, untouchCell)
			function untouchCell(event) {
				if (GAMESTATE.playing) {
					// stop selecting color
						GAMESTATE.selected = null
						GRID.removeAttribute("grabbing")

					// moved?
						if (GAMESTATE.moved) {
							GAMESTATE.moves++
							GAMESTATE.moved = false
						}
				}
			}

		/* enterCell */
			function enterCell(event) {
				if (GAMESTATE.playing && GAMESTATE.selected) {
					// touch?
						if (event.targetTouches) {
							// get grid x/y/width/height
								var gridRect = GRID.getBoundingClientRect()

							// get absolute x & y; get relative to grid; divide by # cells
								var x = event.targetTouches[0].clientX
									x = x - gridRect.x
									x = Math.floor(x / (gridRect.width / GAMESTATE.options.x))
								var y = event.targetTouches[0].clientY
									y = y - gridRect.y
									y = Math.floor(y / (gridRect.height / GAMESTATE.options.y))

							// outside grid
								if (!GAMESTATE.grid[x] || !GAMESTATE.grid[x][y]) {
									return
								}
						}

					// get current cell
						else {
							var x = Number(event.target.getAttribute("x"))
							var y = Number(event.target.getAttribute("y"))
						}

					// get cable color
						var cable = GAMESTATE.cables[GAMESTATE.selected]

					// is current cell adjacent to end of chain?
						var xDiff = Math.abs(cable.chain[cable.chain.length - 1].x - x)
						var yDiff = Math.abs(cable.chain[cable.chain.length - 1].y - y)
						if (xDiff + yDiff == 1) {
							// is current cell empty? (going forward)
								if (!cable.connected && !GAMESTATE.grid[x][y].cable && !GAMESTATE.grid[x][y].socket) {
									// update cell
										GAMESTATE.grid[x][y].cable = cable.color

									// update cable
										cable.chain.push({
											x: x,
											y: y
										})

									// redisplay
										GAMESTATE.moved = true
										displayCables()
								}

							// is current cell occupied by this color? (backtracking)
								else if (GAMESTATE.grid[x][y].cable == cable.color && (cable.endSocket.x !== x || cable.endSocket.y !== y) && (cable.chain[cable.chain.length - 2].x == x && cable.chain[cable.chain.length - 2].y == y)) {
									// update cell
										GAMESTATE.grid[cable.chain[cable.chain.length - 1].x][cable.chain[cable.chain.length - 1].y].cable = null

									// update connected?
										if (cable.endSocket.x == cable.chain[cable.chain.length - 1].x && cable.endSocket.y == cable.chain[cable.chain.length - 1].y) {
											cable.connected = false
										}

									// update cable
										cable.chain.pop()

									// redisplay
										GAMESTATE.moved = true
										displayCables()
								}

							// is current cell occupied by end socket? (completing)
								else if (GAMESTATE.grid[x][y].socket == cable.color && cable.endSocket.x == x && cable.endSocket.y == y) {
									// update cell
										GAMESTATE.grid[x][y].cable = cable.color

									// update connected
										cable.connected = true

									// update cable
										cable.chain.push({
											x: x,
											y: y
										})

									// redisplay
										GAMESTATE.moved = true
										displayCables()

									// victory?
										if (getVictory()) {
											// reset gamestate
												GAMESTATE.moves++
												GAMESTATE.moved = false
												GAMESTATE.playing = false
												GAMESTATE.selected = false

											// show overlay
												GRID.removeAttribute("grabbing")
												OVERLAY.removeAttribute("invisible")
												MOVES.innerText = GAMESTATE.moves + " moves"
										}
								}
							
						}
				}
			}

	/*** helpers ***/
		/* getEmptyNeighbors */
			function getEmptyNeighbors(x, y, color) {
				// empty neighbors array
					var emptyNeighbors = []

				// up
					if (GAMESTATE.grid[x] && GAMESTATE.grid[x][y - 1] && !GAMESTATE.grid[x][y - 1].cable && !GAMESTATE.grid[x][y - 1].socket) {
						emptyNeighbors.push({x: x, y: y - 1, d: "up",    same: color ? getSameColorNeighbors(x, y - 1, color) : []})
					}

				// right
					if (GAMESTATE.grid[x + 1] && GAMESTATE.grid[x + 1][y] && !GAMESTATE.grid[x + 1][y].cable && !GAMESTATE.grid[x + 1][y].socket) {
						emptyNeighbors.push({x: x + 1, y: y, d: "right", same: color ? getSameColorNeighbors(x + 1, y, color) : []})
					}

				// down
					if (GAMESTATE.grid[x] && GAMESTATE.grid[x][y + 1] && !GAMESTATE.grid[x][y + 1].cable && !GAMESTATE.grid[x][y + 1].socket) {
						emptyNeighbors.push({x: x, y: y + 1, d: "down",  same: color ? getSameColorNeighbors(x, y + 1, color) : []})
					}

				// left
					if (GAMESTATE.grid[x - 1] && GAMESTATE.grid[x - 1][y] && !GAMESTATE.grid[x - 1][y].cable && !GAMESTATE.grid[x - 1][y].socket) {
						emptyNeighbors.push({x: x - 1, y: y, d: "left",  same: color ? getSameColorNeighbors(x - 1, y, color) : []})
					}

				// return emptyNeighbors
					return emptyNeighbors
			}

		/* getSameColorNeighbors */
			function getSameColorNeighbors(x, y, color) {
				// empty neighbors array
					var sameColorNeighbors = []

				// up
					if (GAMESTATE.grid[x] && GAMESTATE.grid[x][y - 1] && (GAMESTATE.grid[x][y - 1].cable == color || !GAMESTATE.grid[x][y - 1].socket == color)) {
						sameColorNeighbors.push({x: x, y: y - 1, d: "up"})
					}

				// right
					if (GAMESTATE.grid[x + 1] && GAMESTATE.grid[x + 1][y] && (GAMESTATE.grid[x + 1][y].cable == color || GAMESTATE.grid[x + 1][y].socket == color)) {
						sameColorNeighbors.push({x: x + 1, y: y, d: "right"})
					}

				// down
					if (GAMESTATE.grid[x] && GAMESTATE.grid[x][y + 1] && (GAMESTATE.grid[x][y + 1].cable == color || GAMESTATE.grid[x][y + 1].socket == color)) {
						sameColorNeighbors.push({x: x, y: y + 1, d: "down"})
					}

				// left
					if (GAMESTATE.grid[x - 1] && GAMESTATE.grid[x - 1][y] && (GAMESTATE.grid[x - 1][y].cable == color || GAMESTATE.grid[x - 1][y].socket == color)) {
						sameColorNeighbors.push({x: x - 1, y: y, d: "left"})
					}

				// return emptyNeighbors
					return sameColorNeighbors
			}

		/* getEmptyCells */
			function getEmptyCells() {
				// empty emptiness
					var emptyCells = []

				// loop through grid
					for (var x in GAMESTATE.grid) {
						for (var y in GAMESTATE.grid[x]) {
							if (!GAMESTATE.grid[x][y].socket && !GAMESTATE.grid[x][y].cable) {
								emptyCells.push({x: x, y: y})
							}
						}
					}

				// return
					return emptyCells
			}

		/* getVictory */
			function getVictory() {
				// loop through cables
					for (var c in GAMESTATE.cables) {
						if (!GAMESTATE.cables[c].connected) {
							return false
						}
					}

				// none unconnected
					return true
			}

}