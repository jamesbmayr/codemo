/*** onload ***/
	/* triggers */
		if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
			var ON = { click: "touchstart", mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend", mouseenter: "touchmove" }
		}
		else {
			var ON = { click:      "click", mousedown:  "mousedown", mousemove: "mousemove", mouseup:  "mouseup", mouseenter: "mouseenter" }
		}

	/* detectScreen */
		var MULTIPLIER = null
		detectScreen()
		window.addEventListener("resize", detectScreen)
		function detectScreen(event) {
			MULTIPLIER = (window.innerWidth < 900) ? 0.5 : 1
			document.documentElement.style.setProperty("--multiplier", MULTIPLIER)
			
			resortPieces(true)
		}


	/* prevent long press */
		window.addEventListener("contextmenu", function(event) {
			event.preventDefault()
		})

	/* globals */
		var FULLCIRCLE = 360
		
		var PIECECELLS = 3

		var GRIDWIDTH  = 12
		var GRIDHEIGHT = 12
		var PIECECOUNT = 12
		var CELLSIZE = 50
		var BORDER = 5

	/* elements */
		var GET = {}
		var ROOT = document.documentElement
		var CONTAINER = document.getElementById("container")
		var REFRESH = document.getElementById("refresh")
		var PIECES = document.getElementById("pieces")
		var GRID = document.getElementById("grid")
		var OVERLAY = document.getElementById("overlay")

	/* buildGet */
		buildGet()
		function buildGet() {
			// query parameters?
				if (location.search && location.search.length > 1) {
					var queryString = location.search.slice(1).split("&")
					for (var i in queryString) {
						var pair = queryString[i].split("=")
						GET[pair[0]] = pair[1]
					}
				}

			// update constants
				GRIDHEIGHT = !isNaN(GET.y) ? Number(GET.y) : GRIDHEIGHT
				GRIDWIDTH  = !isNaN(GET.x) ? Number(GET.x) : GRIDWIDTH
				PIECECOUNT = !isNaN(GET.pieces) ? Number(GET.pieces) : PIECECOUNT
		}

	/* maps */
		var PIECETYPES = [
			// 1 rotation
				[ [1,1,1],
				  [1,1,1],
				  [1,1,1] ],

				[ [1,1,1],
				  [1, ,1],
				  [1,1,1] ],

				[ [ ,1, ],
				  [1,1,1],
				  [ ,1, ] ],

				[ [ , , ],
				  [ ,1, ],
				  [ , , ] ],


			// 2 rotations
				[ [1,1,1],
				  [ ,1, ],
				  [1,1,1] ],

				[ [1,1, ],
				  [1,1,1],
				  [ ,1,1] ],

				[ [ ,1, ],
				  [ ,1, ],
				  [ ,1, ] ],

				[ [ ,1,1],
				  [ ,1, ],
				  [1,1, ] ],

				[ [1,1, ],
				  [ ,1, ],
				  [ ,1,1] ],


			// 4 rotations
				[ [1,1,1],
				  [1,1,1],
				  [ ,1,1] ],

				[ [1,1,1],
				  [1, ,1],
				  [ ,1,1] ],

				[ [1, ,1],
				  [1, ,1],
				  [1,1,1] ],

				[ [1,1,1],
				  [1,1,1],
				  [ , ,1] ],

				[ [1,1,1],
				  [1,1,1],
				  [1, , ] ],

				[ [1,1,1],
				  [1,1,1],
				  [ ,1, ] ],

				[ [1, ,1],
				  [1,1,1],
				  [ ,1, ] ],

				[ [1,1,1],
				  [ ,1, ],
				  [1,1, ] ],

				[ [1,1,1],
				  [ ,1, ],
				  [ ,1,1] ],

				[ [1, , ],
				  [1,1, ],
				  [1,1,1] ],

				[ [1,1, ],
				  [1, , ],
				  [1,1,1] ],

				[ [1,1,1],
				  [1, , ],
				  [1,1, ] ],

				[ [1,1, ],
				  [1,1,1],
				  [ ,1, ] ],

				[ [1,1, ],
				  [1,1, ],
				  [ ,1,1] ],

				[ [ ,1,1],
				  [ ,1,1],
				  [1,1, ] ],

				[ [1,1,1],
				  [ ,1, ],
				  [ ,1, ] ],

				[ [1, , ],
				  [1, , ],
				  [1,1,1] ],

				[ [1, , ],
				  [1,1, ],
				  [ ,1,1] ],
		]
		var COLORS = {
			blue:   ["#557799", "#224466"],
			brown:  ["#352f1d", "#4c4636"],
			silver: ["#414445", "#73777b"],
			white:  ["#c0c1b5", "#929673"],
			green:  ["#2b4434", "#5c613c"],
			red:    ["#3e1919", "#8c2d36"]
		}

	/* state */
		var GAMESTATE = {
			options: {
				x: GRIDWIDTH,
				y: GRIDHEIGHT,
				pieces: PIECECOUNT,
				pieceCells: PIECECELLS,
				cellSize: CELLSIZE,
				border: BORDER,
				colors: {
					grid: COLORS.blue[0],
					piece: COLORS.blue[1]
				}
			},
			playing: false,
			selected: null,
			selectedOffset: {
				x: 0,
				y: 0
			},
			holes: 0,
			grid: {},
			pieces: {}
		}
		window.GAMESTATE = GAMESTATE

/*** setup ***/
	/* createGame */
		REFRESH.addEventListener(ON.click, createGame)
		createGame()
		function createGame() {
			// clear out
				GRID.innerHTML = ""
				PIECES.innerHTML = ""
				Array.from(CONTAINER.querySelectorAll(".piece")).forEach(function(element) {
					element.remove()
				})

			// remove overlay
				OVERLAY.setAttribute("invisible", true)
				CONTAINER.removeAttribute("blurred")

			// reset game state
				GAMESTATE.playing = false
				GAMESTATE.selected = null
				GAMESTATE.selectedOffset.x = 0
				GAMESTATE.selectedOffset.y = 0
				GAMESTATE.holes = 0
				GAMESTATE.grid = {}
				GAMESTATE.pieces = {}
			
			// color
				var color = GET.color || chooseRandom(Object.keys(COLORS))
				GAMESTATE.options.colors = {
					grid: COLORS[color][0],
					piece: COLORS[color][1]
				}

			// style
				ROOT.style.setProperty("--grid-height", GAMESTATE.options.y)
				ROOT.style.setProperty("--grid-width",  GAMESTATE.options.x)
				ROOT.style.setProperty("--cell-size",   GAMESTATE.options.cellSize)
				ROOT.style.setProperty("--border",      GAMESTATE.options.border)
				ROOT.style.setProperty("--piece-count", GAMESTATE.options.pieceCells)
				ROOT.style.setProperty("--grid-color",  GAMESTATE.options.colors.grid)
				ROOT.style.setProperty("--piece-color", GAMESTATE.options.colors.piece)

			// build grid
				buildGrid()
				buildPieces()

			// play
				GAMESTATE.playing = true
		}

	/* buildGrid */
		function buildGrid() {
			// loop through rows
				for (var y = 0; y < GAMESTATE.options.y; y++) {
					// build row
						var rowElement = document.createElement("div")
							rowElement.className = "row"
						GRID.appendChild(rowElement)

					// loop through columns
						for (var x = 0; x < GAMESTATE.options.x; x++) {
							// build cell
								var cellElement = document.createElement("div")
									cellElement.className = "cell"
									cellElement.setAttribute("x", x)
									cellElement.setAttribute("y", y)
									cellElement.setAttribute("hole", false)
								rowElement.appendChild(cellElement)

							// add to grid
								if (!GAMESTATE.grid[x]) {
									GAMESTATE.grid[x] = {}
								}
								GAMESTATE.grid[x][y] = {
									x: x,
									y: y,
									element: cellElement,
									hole: false,
									patches: []
								}
						}
				}
		}

	/* buildPieces */
		function buildPieces() {
			// options set number of pieces
				for (var i = 0; i < GAMESTATE.options.pieces; i++) {
					// pick shape
						var shape = duplicateObject(chooseRandom(PIECETYPES))

					// create element
						var id = generateRandom()
						var pieceElement = document.createElement("div")
							pieceElement.className = "piece"
							pieceElement.id = id
							pieceElement.style.top = (i * MULTIPLIER * GAMESTATE.options.cellSize * (GAMESTATE.options.pieceCells + 1)) + 
								(MULTIPLIER * GAMESTATE.options.cellSize * GAMESTATE.options.pieceCells / 2) + "px"
						PIECES.appendChild(pieceElement)

					// create sub-elements
						for (var y = 0; y < GAMESTATE.options.pieceCells; y++) {
							var rowElement = document.createElement("div")
								rowElement.className = "row"
							pieceElement.appendChild(rowElement)

							for (var x = 0; x < GAMESTATE.options.pieceCells; x++) {
								var cellElement = document.createElement("div")
									cellElement.className = "cell"
									cellElement.setAttribute("patch", !!shape[y][x])
									if (shape[y][x]) {
										cellElement.addEventListener(ON.mousedown, selectPiece)
									}
								rowElement.appendChild(cellElement)
							}
						}

					// add to game
						GAMESTATE.pieces[id] = {
							id: id,
							shape: shape,
							rotation: 0,
							x: null,
							y: null,
							element: pieceElement,
						}

					// randomize
						var randomCount = rangeRandom(1, 4)
						for (var r = 0; r < randomCount; r++) {
							rotatePieceShape(GAMESTATE.pieces[id])
						}

					// create corresponding hole
						buildHole(GAMESTATE.pieces[id])
						
				}
		}

	/* buildHole */
		function buildHole(piece) {
			// random center
				var holeCenterX = rangeRandom(0, GAMESTATE.options.x)
				var holeCenterY = rangeRandom(0, GAMESTATE.options.y)

			// loop through piece
				for (var y = 0; y < GAMESTATE.options.pieceCells; y++) {
					for (var x = 0; x < GAMESTATE.options.pieceCells; x++) {
						if (!!piece.shape[y][x]) {
							if (GAMESTATE.grid[holeCenterX + x - 1] && GAMESTATE.grid[holeCenterX + x - 1][holeCenterY + y - 1]) {
								GAMESTATE.grid[holeCenterX + x - 1][holeCenterY + y - 1].hole = true
								GAMESTATE.grid[holeCenterX + x - 1][holeCenterY + y - 1].element.setAttribute("hole", true)
							}
						}
					}
				}
		}

/*** actions ***/
	/* selectPiece */
		function selectPiece(event) {
			if (GAMESTATE.playing) {
				// get piece
					var piece = GAMESTATE.pieces[event.target.parentNode.parentNode.id]
					var elementRect = piece.element.getBoundingClientRect()

				// select
					GAMESTATE.selected = piece.id
					CONTAINER.setAttribute("grabbing", true)

				// set offset
					var x = (event.targetTouches ? event.targetTouches[0].clientX : event.clientX)
					var y = (event.targetTouches ? event.targetTouches[0].clientY : event.clientY)

					GAMESTATE.selectedOffset.x = x - (elementRect.x + elementRect.width  / 2)
					GAMESTATE.selectedOffset.y = y - (elementRect.y + elementRect.height / 2)

				// removing from tray?
					if (piece.element.parentNode.id == "pieces") {
						// reassign parent
							CONTAINER.appendChild(piece.element)

						// update tops of all pieces in tray
							resortPieces()
					}

				// already on grid? unpatch holes
					else {
						// updateHoles
							updateHoles(piece)
					}

				// update position
					repositionPiece(piece, {x: x, y: y})
			}
		}

	/* unselectPiece */
		window.addEventListener(ON.mouseup, unselectPiece)
		function unselectPiece(event) {
			if (GAMESTATE.selected) {
				// get element
					var piece = GAMESTATE.pieces[GAMESTATE.selected]
					var elementRect = piece.element.getBoundingClientRect()

				// already out of tray?
					if (piece.element.parentNode.id == "container") {
						// hovering over pieces tray?
							var piecesRect = PIECES.getBoundingClientRect()
							if ((piecesRect.x - GAMESTATE.options.cellSize * MULTIPLIER <= elementRect.x) && ((elementRect.x + elementRect.width)  <= (piecesRect.x + piecesRect.width  + GAMESTATE.options.cellSize * MULTIPLIER))
							 && (piecesRect.y - GAMESTATE.options.cellSize * MULTIPLIER <= elementRect.y) && ((elementRect.y + elementRect.height) <= (piecesRect.y + piecesRect.height - GAMESTATE.options.cellSize * MULTIPLIER))) {
							 	// reassign parent
									PIECES.appendChild(piece.element)
								
								// update position
									resortPieces()

								// scroll to last piece
									PIECES.scrollTop = 10000
							}

						// snap to grid
							else {
								// reposition
									repositionPiece(piece, {snap: true})

								// update holes
									updateHoles(piece, true)
							}
					}

				// unselect
					GAMESTATE.selected = null
					CONTAINER.removeAttribute("grabbing")
			}
		}

	/* movePiece */
		window.addEventListener(ON.mousemove, movePiece)
		function movePiece(event) {
			if (GAMESTATE.playing && GAMESTATE.selected) {
				// get piece
					var piece = GAMESTATE.pieces[GAMESTATE.selected]

				// get coordinates
					var x = (event.targetTouches ? event.targetTouches[0].clientX : event.clientX)
					var y = (event.targetTouches ? event.targetTouches[0].clientY : event.clientY)

				// update position
					repositionPiece(piece, {x: x, y: y})
			}
		}

	/* rotatePiece */
		window.addEventListener("keydown", rotatePiece)
		function rotatePiece(event) {
			if (GAMESTATE.playing && GAMESTATE.selected) {
				// get piece
					var piece = GAMESTATE.pieces[GAMESTATE.selected]
					var element = piece.element

				// rotate in data
					if (event.code == "Space" || event.key == "x" || event.key == "y") {
						rotatePieceShape(piece)
					}
			}
		}

/*** gameplay ***/
	/* updateHoles */
		function updateHoles(piece, patched) {
			// unpatch?
				if (!patched) {
					for (var x = 0; x < GAMESTATE.options.x; x++) {
						for (var y = 0; y < GAMESTATE.options.y; y++) {
							if (GAMESTATE.grid[x][y].patches.includes(piece.id)) {
								GAMESTATE.grid[x][y].patches = GAMESTATE.grid[x][y].patches.filter(function(id) {
									return id !== piece.id
								}) || []
							}
						}
					}
				}

			// patch
				else if (!isNaN(piece.x) && !isNaN(piece.y)) {
					// add patch
						for (var x = 0; x < GAMESTATE.options.pieceCells; x++) {
							for (var y = 0; y < GAMESTATE.options.pieceCells; y++) {
								if (piece.shape[y][x] && GAMESTATE.grid[piece.x - 1 + x] && GAMESTATE.grid[piece.x - 1 + x][piece.y - 1 + y]) {
									GAMESTATE.grid[piece.x - 1 + x][piece.y - 1 + y].patches.push(piece.id)
								}
							}
						}
				}

			// holes
				countHoles()
			
		}

	/* rotatePieceShape */
		function rotatePieceShape(piece) {
			// update rotation
				piece.rotation += FULLCIRCLE / 4

			// cycle shape
				var tempShape = duplicateObject(piece.shape)
				piece.shape[0][0] = Number(tempShape[2][0])
				piece.shape[1][0] = Number(tempShape[2][1])
				piece.shape[2][0] = Number(tempShape[2][2])
				piece.shape[2][1] = Number(tempShape[1][2])
				piece.shape[2][2] = Number(tempShape[0][2])
				piece.shape[1][2] = Number(tempShape[0][1])
				piece.shape[0][2] = Number(tempShape[0][0])
				piece.shape[0][1] = Number(tempShape[1][0])

			// update transform
				piece.element.style.transform = "translateX(-50%) translateY(-50%) " +
					"rotate(" + piece.rotation + "deg) "
		}

	/* repositionPiece */
		function repositionPiece(piece, options) {
			// snap to grid?
				if (options.snap) {
					// resize?
						if (options.resize) {
							piece.element.style.left = ((piece.x - 1) * MULTIPLIER * GAMESTATE.options.cellSize) + (GAMESTATE.options.cellSize * MULTIPLIER * GAMESTATE.options.pieceCells / 2) + (GAMESTATE.options.border * 3) + (GAMESTATE.options.cellSize * MULTIPLIER * (GAMESTATE.options.pieceCells + 2)) + "px" 
							piece.element.style.top  = ((piece.y - 1) * MULTIPLIER * GAMESTATE.options.cellSize) + (GAMESTATE.options.cellSize * MULTIPLIER * GAMESTATE.options.pieceCells / 2) + (GAMESTATE.options.border) + "px"
						}

					// normal placement
						else {
							// rect
								var elementRect = piece.element.getBoundingClientRect()

							// get grid coords
								var gridRect = GRID.getBoundingClientRect()
								var coordX = Math.floor((elementRect.x - gridRect.x - GAMESTATE.options.border + (GAMESTATE.options.cellSize * MULTIPLIER * GAMESTATE.options.pieceCells / 2)) / GAMESTATE.options.cellSize / MULTIPLIER)
								var coordY = Math.floor((elementRect.y - gridRect.y - GAMESTATE.options.border + (GAMESTATE.options.cellSize * MULTIPLIER * GAMESTATE.options.pieceCells / 2)) / GAMESTATE.options.cellSize / MULTIPLIER)

							// save coords
								piece.x = coordX
								piece.y = coordY
							
							// update position
								piece.element.style.left = ((piece.x - 1) * MULTIPLIER * GAMESTATE.options.cellSize) + (GAMESTATE.options.cellSize * MULTIPLIER * GAMESTATE.options.pieceCells / 2) + (GAMESTATE.options.border * 3) + (GAMESTATE.options.cellSize * MULTIPLIER * (GAMESTATE.options.pieceCells + 2)) + "px" 
								piece.element.style.top  = ((piece.y - 1) * MULTIPLIER * GAMESTATE.options.cellSize) + (GAMESTATE.options.cellSize * MULTIPLIER * GAMESTATE.options.pieceCells / 2) + (GAMESTATE.options.border) + "px"
					}
				}

			// held
				else if (!isNaN(options.x) && !isNaN(options.y)) {
					// get container rect
						var containerRect = CONTAINER.getBoundingClientRect()

					// remove coords
						piece.x = null
						piece.y = null

					// update position
						piece.element.style.left = (options.x - GAMESTATE.selectedOffset.x - containerRect.x) + "px"
						piece.element.style.top  = (options.y - GAMESTATE.selectedOffset.y - containerRect.y) + "px"
				}
		}

	/* resortPieces */
		function resortPieces(resize) {
			if (PIECES) {
				// resize? move placed pieces too
					if (resize) {
						// get all pieces
							var pieceElements = Array.from(CONTAINER.querySelectorAll(".piece"))

						// loop through
							for (var i in pieceElements) {
								// only the ones not in the pieces tray
									if (pieceElements[i].parentNode.id !== PIECES.id && GAMESTATE.pieces[pieceElements[i].id]) {
										repositionPiece(GAMESTATE.pieces[pieceElements[i].id], {snap: true, resize: true})
									}
							}
					}

				// tray
					// get elements
						var pieceElements = Array.from(PIECES.querySelectorAll(".piece"))

					// adjust position
						for (var i in pieceElements) {
							pieceElements[i].style.left =      (GAMESTATE.options.cellSize * MULTIPLIER *  GAMESTATE.options.pieceCells / 2)  + "px"
							pieceElements[i].style.top  = (i * (GAMESTATE.options.cellSize * MULTIPLIER * (GAMESTATE.options.pieceCells + 1)) + (GAMESTATE.options.cellSize * MULTIPLIER * GAMESTATE.options.pieceCells / 2)) + "px"
						}
			}
		}

	/* countHoles */
		function countHoles() {
			// count
				GAMESTATE.holes = 0
				for (var x = 0; x < GAMESTATE.options.x; x++) {
					for (var y = 0; y < GAMESTATE.options.y; y++) {
						if (GAMESTATE.grid[x][y].hole && !GAMESTATE.grid[x][y].patches.length) {
							GAMESTATE.holes++
						}
					}
				}

			// victory?
				if (!GAMESTATE.holes) {
					// stop playing
						GAMESTATE.playing = false
						GAMESTATE.selected = null
						GAMESTATE.selectedOffset.x = 0
						GAMESTATE.selectedOffset.y = 0

					// show overlay
						OVERLAY.removeAttribute("invisible")
						CONTAINER.setAttribute("blurred", true)
				}
		}

/*** helpers ***/
	/* rangeRandom */
		function rangeRandom(a, b) {
			var range = Math.abs(b - a)
			return Math.min(a, b) + Math.floor(Math.random() * range)
		}

	/* chooseRandom */
		function chooseRandom(array) {
			if (!Array.isArray(array)) {
				return array
			}

			return array[Math.floor(Math.random() * array.length)]
		}

	/* generateRandom */
		function generateRandom(set, length) {
			var set = set || "abcdefghijklmnopqrstuvwxyz"
			var length = length || 16
			var random = ""

			while (random.length < length) {
				random += set[Math.floor(Math.random() * set.length)]
			}

			return random
		}

	/* duplicateObject */
		function duplicateObject(object) {
			return JSON.parse(JSON.stringify(object))
		}
