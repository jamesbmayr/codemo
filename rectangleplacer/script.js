window.addEventListener("load", function() {
	/*** globals ***/
		/* triggers */
			if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
				var TRIGGERS = { click: "touchstart", mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" }
			}
			else {
				var TRIGGERS = { click:      "click", mousedown:  "mousedown", mousemove: "mousemove", mouseup:  "mouseup" }
			}

		/* settings */
			var GET = {}
			var SETTINGS = {
				squareSize: 50,
				maxAttempts: 5,
				colorStops: 5,
				colorMin: 50,
				colorMax: 250,
				x: 10,
				y: 10,
				minPieceSize: 5,
				maxPieceSize: 16,
				splitProbability: 0.5
			}

		/* game */
			var GAME = {
				selectedPiece: null,
				selectedPieceOffset: {
					x: null,
					y: null
				},
				playing: false,
				grid: [],
				pieces: {}
			}

		/* elements */
			var ELEMENTS = {
				root: document.documentElement,
				body: document.body,
				container: document.querySelector("#container"),
				overlay: document.querySelector("#gameoverlay"),
				play: document.querySelector("#play")
			}

		/* detectScreen */
			detectScreen()
			window.addEventListener("resize", detectScreen)
			function detectScreen() {
				// update squareSize
					SETTINGS.squareSize = Math.min(Math.round(window.innerWidth / (SETTINGS.x + 2) / 10) * 10, Math.round(window.innerHeight / (SETTINGS.y + 2) / 10) * 10)

				// update CSS
					ELEMENTS.root.style.setProperty("--square-size", SETTINGS.squareSize)
			}

		/* detectGet */
			detectGet()
			function detectGet() {
				// query parameters?
					if (location.search && location.search.length > 1) {
						var queryString = location.search.slice(1).split("&")
						for (var i in queryString) {
							var pair = queryString[i].split("=")
							GET[pair[0]] = pair[1]
						}
					}

				// update settings
					SETTINGS.x = !isNaN(GET.x) ? Number(GET.x) : SETTINGS.x
					SETTINGS.y = !isNaN(GET.y) ? Number(GET.y) : SETTINGS.y
					SETTINGS.minPieceSize = !isNaN(GET.minPieceSize) ? Number(GET.minPieceSize) : SETTINGS.minPieceSize
					SETTINGS.maxPieceSize = !isNaN(GET.maxPieceSize) ? Number(GET.maxPieceSize) : SETTINGS.maxPieceSize
					SETTINGS.splitProbability = !isNaN(GET.splitProbability) ? Number(GET.splitProbability) : SETTINGS.splitProbability
			}

	/*** helpers ***/
		/* generateRandom */
			function generateRandom(length, set) {
				// length
					length = length || 8

				// set
					set = set || "abcdefghijklmnopqrstuvwxyz"

				// create a random sequence
					var output = ""
					while (output.length < length) {
						output += set[Math.floor(Math.random() * set.length)]
					}

				// return
					return output
			}

		/* chooseRandom */
			function chooseRandom(array) {
				// select a random element
					return array[Math.floor(Math.random() * array.length)]
			}

		/* rangeRandom */
			function rangeRandom(start, end) {
				// select a random number between start and end
					return Math.floor(Math.random() * (end - start)) + start
			}

		/* colorRandom */
			function colorRandom() {
				// parameters
					var colorSlice = (SETTINGS.colorMax - SETTINGS.colorMin) / SETTINGS.colorStops

				// output
					return Math.round(Math.floor(Math.random() * SETTINGS.colorStops) * colorSlice)
			}

	/*** create ***/
		/* createGame */
			createGame()
			ELEMENTS.play.addEventListener(TRIGGERS.click, createGame)
			function createGame() {
				// reset game
					GAME.playing = false

				// create grid
					createGrid()

				// create pieces
					createStartingPiece()

				// trim
					trimPieces()

				// position
					positionPieces()

				// draw
					drawPieces()

				// play
					ELEMENTS.body.removeAttribute("gameover")
					GAME.playing = true
			}

		/* createGrid */
			function createGrid() {
				// reset
					GAME.grid = []

				// grid + starting piece
					for (var x = 0; x < SETTINGS.x; x++) {
						for (var y = 0; y < SETTINGS.y; y++) {
							if (!GAME.grid[x]) {
								GAME.grid[x] = []
							}

							GAME.grid[x][y] = 0
						}
					}

				// container
					ELEMENTS.container.style.width  = "calc(var(--square-size) * " + SETTINGS.x + "px)"
					ELEMENTS.container.style.height = "calc(var(--square-size) * " + SETTINGS.y + "px)"
			}

		/* createStartingPiece */
			function createStartingPiece() {
				// reset
					GAME.pieces = []
					var piece = {
						id: generateRandom(),
						rotation: 0,
						position: {x: 0, y: 0},
						squares: []
					}

				// loop through grid
					for (var x = 0; x < GAME.grid.length; x++) {
						for (var y = 0; y < GAME.grid[x].length; y++) {
							piece.squares.push({x: x, y: y})
						}
					}

				// starting piece
					GAME.pieces[piece.id] = piece
					createPieces(piece)
			}

		/* createPieces */
			function createPieces(bigPiece, attempts) {
				// attempts
					if (!attempts) {
						attempts = 0
					}

				// find min/max
					var minX = SETTINGS.x
					var maxX = 0
					for (var i in bigPiece.squares) {
						if (bigPiece.squares[i].x < minX) {
							minX = bigPiece.squares[i].x
						}
						if (bigPiece.squares[i].x > maxX) {
							maxX = bigPiece.squares[i].x
						}
					}

					var minY = SETTINGS.y
					var maxY = 0
					for (var i in bigPiece.squares) {
						if (bigPiece.squares[i].y < minY) {
							minY = bigPiece.squares[i].y
						}
						if (bigPiece.squares[i].y > maxY) {
							maxY = bigPiece.squares[i].y
						}
					}

				// pick a direction
					if (maxX - minX > maxY - minY) {
						var direction = "x"
						var point = rangeRandom(minX, maxX)
					}
					else {
						var direction = "y"
						var point = rangeRandom(minY, maxY)
					}

				// create two new little pieces
					var littlePieceA = {
						id: generateRandom(),
						rotation: 0,
						position: {x: 0, y: 0},
						squares: []
					}

					var littlePieceB = {
						id: generateRandom(),
						rotation: 0,
						position: {x: 0, y: 0},
						squares: []
					}

				// split squares
					for (var i in bigPiece.squares) {
						if (bigPiece.squares[i][direction] <= point) {
							littlePieceA.squares.push(bigPiece.squares[i])
						}
						else {
							littlePieceB.squares.push(bigPiece.squares[i])
						}
					}

				// count size --> add to pieces
					if (littlePieceA.squares.length >= SETTINGS.minPieceSize && littlePieceB.squares.length >= SETTINGS.minPieceSize) {
						delete GAME.pieces[bigPiece.id]
						GAME.pieces[littlePieceA.id] = littlePieceA
						GAME.pieces[littlePieceB.id] = littlePieceB

						// continue to split?
							if (littlePieceA.squares.length > SETTINGS.maxPieceSize || Math.random() < SETTINGS.splitProbability) {
								createPieces(littlePieceA)
							}

							if (littlePieceB.squares.length > SETTINGS.maxPieceSize || Math.random() < SETTINGS.splitProbability) {
								createPieces(littlePieceB)
							}
					}

				// attempts
					else if (attempts < SETTINGS.maxAttempts) {
						attempts++
						createPieces(bigPiece, attempts)
					}
			}

		/* trimPieces */
			function trimPieces() {
				// loop through pieces
					for (var i in GAME.pieces) {
						var piece = GAME.pieces[i]

						// min/max
							var minX = SETTINGS.x
							var maxX = 0
							for (var j in piece.squares) {
								if (piece.squares[j].x < minX) {
									minX = piece.squares[j].x
								}
								if (piece.squares[j].x > maxX) {
									maxX = piece.squares[j].x
								}
							}

							var minY = SETTINGS.y
							var maxY = 0
							for (var j in piece.squares) {
								if (piece.squares[j].y < minY) {
									minY = piece.squares[j].y
								}
								if (piece.squares[j].y > maxY) {
									maxY = piece.squares[j].y
								}
							}

						// ranges
							piece.size = {
								x: (maxX - minX + 1),
								y: (maxY - minY + 1)
							}
						
						// subtract
							for (var j in piece.squares) {
								piece.squares[j].x -= minX
								piece.squares[j].y -= minY
							}

						// colors
							do {
								var color = "rgb(" + colorRandom() + "," + colorRandom() + "," + colorRandom() + ")"
							}
							while (GAME.pieces.find(function(p) { return p.color == color }))
							piece.color = color
					}
			}

		/* positionPieces */
			function positionPieces() {
				// loop through pieces
					for (var i in GAME.pieces) {
						GAME.pieces[i].position.x = rangeRandom(1, SETTINGS.x - GAME.pieces[i].size.x)
						GAME.pieces[i].position.y = rangeRandom(1, SETTINGS.y - GAME.pieces[i].size.y)
					}
			}
		
	/*** draw ***/
		/* drawPieces */
			function drawPieces() {
				// reset
					ELEMENTS.container.innerHTML = ""

				// loop through pieces
					for (var i in GAME.pieces) {
						// piece
							var piece = GAME.pieces[i]

						// element
							piece.element = document.createElement("div")
							piece.element.className = "piece"
							piece.element.id = "piece-" + i
							piece.element.style.left = "calc(var(--square-size) * " + piece.position.x + "px)"
							piece.element.style.top  = "calc(var(--square-size) * " + piece.position.y + "px)"
							piece.element.style.width = "calc(var(--square-size) * " + piece.size.x + "px)"
							piece.element.style.height = "calc(var(--square-size) * " + piece.size.y + "px)"
							ELEMENTS.container.appendChild(piece.element)

						// squares
							for (var j in piece.squares) {
								var squareElement = document.createElement("div")
									squareElement.className = "piece-square"
									squareElement.id = "piece-square-" + piece.squares[j].x + "," + piece.squares[j].y
									squareElement.style.background = piece.color
									squareElement.style.left = "calc(var(--square-size) * " + piece.squares[j].x + "px)"
									squareElement.style.top  = "calc(var(--square-size) * " + piece.squares[j].y + "px)"
								piece.element.appendChild(squareElement)

								var x = piece.squares[j].x + piece.position.x
								var y = piece.squares[j].y + piece.position.y
								if (0 <= x && x < SETTINGS.x && 0 <= y && y < SETTINGS.y) {
									GAME.grid[x][y]++
								}
							}
					}
			}

	/*** interaction ***/
		/* selectPiece */
			document.addEventListener(TRIGGERS.mousedown, selectPiece)
			function selectPiece(event) {
				// playing?
					if (!GAME.playing) {
						return
					}

				// get piece
					var pieceElement = event.target.closest(".piece")
					if (!pieceElement) {
						return
					}
					pieceElement.setAttribute("selected", true)

				// get cursor
					var containerRect = ELEMENTS.container.getBoundingClientRect()
					var x = (event.targetTouches ? event.targetTouches[0].clientX : event.clientX) + containerRect.x
					var y = (event.targetTouches ? event.targetTouches[0].clientY : event.clientY) + containerRect.y

				// get rect
					var rect = pieceElement.getBoundingClientRect()

				// set selection
					GAME.selectedPiece = pieceElement.id.replace("piece-", "")
					GAME.selectedPieceOffset = {
						x: x - rect.x,
						y: y - rect.y
					}

				// update grid
					var piece = GAME.pieces[GAME.selectedPiece]
					for (var j in piece.squares) {
						var x = piece.squares[j].x + piece.position.x
						var y = piece.squares[j].y + piece.position.y
						if (0 <= x && x < SETTINGS.x && 0 <= y && y < SETTINGS.y) {
							GAME.grid[x][y]--
						}
					}
			}

		/* movePiece */
			document.addEventListener(TRIGGERS.mousemove, movePiece)
			function movePiece(event) {
				// playing?
					if (!GAME.playing) {
						return
					}

				// selected?
					if (!GAME.selectedPiece) {
						return
					}

				// get cursor
					var x = (event.targetTouches ? event.targetTouches[0].clientX : event.clientX) - GAME.selectedPieceOffset.x
					var y = (event.targetTouches ? event.targetTouches[0].clientY : event.clientY) - GAME.selectedPieceOffset.y

				// snap
					x = Math.round(x / SETTINGS.squareSize)
					y = Math.round(y / SETTINGS.squareSize)

				// move piece
					var piece = GAME.pieces[GAME.selectedPiece]
						piece.position.x = x
						piece.position.y = y
						piece.element.style.left = "calc(var(--square-size) * " + piece.position.x + "px)"
						piece.element.style.top  = "calc(var(--square-size) * " + piece.position.y + "px)"
			}

		/* unselectPiece */
			document.addEventListener(TRIGGERS.mouseup, unselectPiece)
			function unselectPiece(event) {
				// playing?
					if (!GAME.playing) {
						return
					}

				// selected?
					if (!GAME.selectedPiece) {
						return
					}

				// update grid
					var piece = GAME.pieces[GAME.selectedPiece]
					for (var j in piece.squares) {
						var x = piece.squares[j].x + piece.position.x
						var y = piece.squares[j].y + piece.position.y
						if (0 <= x && x < SETTINGS.x && 0 <= y && y < SETTINGS.y) {
							GAME.grid[x][y]++
						}
					}

				// unselect
					document.querySelector(".piece[selected=true]").removeAttribute("selected")
					GAME.selectedPiece = null

				// check for victory
					checkVictory()
			}

		/* checkVictory */
			function checkVictory() {
				// loop through grid
					for (var x = 0; x < SETTINGS.x; x++) {
						for (var y = 0; y < SETTINGS.y; y++) {
							if (!GAME.grid[x][y]) {
								return false
							}
						}
					}

				// victory
					GAME.playing = false
					ELEMENTS.body.setAttribute("gameover", true)
					return true
			}
})





