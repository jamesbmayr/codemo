window.addEventListener("load", function() {
	/*** globals ***/
		/* triggers */
			if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
				var TRIGGERS = { click: "touchstart", mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" }
			}
			else {
				var TRIGGERS = { click:      "click", mousedown:  "mousedown", mousemove: "mousemove", mouseup:  "mouseup" }
			}

		/* elements */
			var ELEMENTS = {
				root: document.documentElement,
				body: document.body,
				container: document.querySelector("#container"),
				background: document.querySelector("#background"),
				overlay: document.querySelector("#gameoverlay"),
				play: document.querySelector("#play")
			}

		/* settings */
			var GAME = {}
			var GET = {}
			var SETTINGS = {
				x: 3,
				y: 3,
				z: 3,
				hexagonSize: 50,
				colorStops: 5,
				colorMin: 50,
				colorMax: 250,
				minPieceSize: 3,
				maxPieceSize: 12
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
					SETTINGS.z = !isNaN(GET.z) ? Number(GET.z) : SETTINGS.z
					SETTINGS.minPieceSize = !isNaN(GET.minPieceSize) ? Number(GET.minPieceSize) : SETTINGS.minPieceSize
					SETTINGS.maxPieceSize = !isNaN(GET.maxPieceSize) ? Number(GET.maxPieceSize) : SETTINGS.maxPieceSize
			}

		/* detectScreen */
			detectScreen()
			window.addEventListener("resize", detectScreen)
			function detectScreen() {
				// update hexagonSize
					SETTINGS.hexagonSize = Math.min(
						Math.round(window.innerWidth  / (SETTINGS.x * 3) / 10) * 10, 
						Math.round(window.innerHeight / (SETTINGS.y * 3) / 10) * 10,
						Math.round(window.innerHeight / (SETTINGS.z * 3) / 10) * 10
					)

				// update CSS
					ELEMENTS.root.style.setProperty("--hexagon-size", SETTINGS.hexagonSize)

				// draw background
					var backgroundHexagonElements = Array.from(ELEMENTS.background.querySelectorAll(".hexagon") || [])
					for (var i in backgroundHexagonElements) {
						var hexagonElement = backgroundHexagonElements[i]
						positionHexagon(hexagonElement, Number(hexagonElement.getAttribute("data-x")), Number(hexagonElement.getAttribute("data-y")), Number(hexagonElement.getAttribute("data-z")))
					}

				// draw pieces
					if (GAME.pieces) {
						for (var i in GAME.pieces) {
							positionPiece(GAME.pieces[i])
						}
					}
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
				// generate hues
					var hues = []
					while (hues.length < 3) {
						var colorSlice = (SETTINGS.colorMax - SETTINGS.colorMin) / SETTINGS.colorStops
						hues.push(Math.round(Math.floor(Math.random() * SETTINGS.colorStops) * colorSlice))
					}

				// output
					return "rgb(" + hues.join(",") + ")"
			}

		/* getHexCoordinates */
			function getHexCoordinates(cursorX, cursorY) {
				// container
					var containerRect = ELEMENTS.background.getBoundingClientRect()

				// radial coordinates
					var xFromCenter = cursorX - (containerRect.x + containerRect.width / 2)
					var yFromCenter = -cursorY + (containerRect.y + containerRect.height / 2)

				// hex coordinates
					var hexX = Math.round(xFromCenter / (SETTINGS.hexagonSize * 0.75)) || 0
					var hexY = Math.round(yFromCenter / (SETTINGS.hexagonSize * 0.866) - (hexX / 2)) || 0
					var hexZ = 0 - hexX - hexY

				// return
					return {
						x: Number(hexX),
						y: Number(hexY),
						z: Number(hexZ)
					}
			}

	/*** setup ***/
		/* createGame */
			ELEMENTS.play.addEventListener(TRIGGERS.click, createGame)
			function createGame() {
				// clear game
					GAME = {
						playing: false,
						selectedHexagon: null,
						selectedCoordinates: null,
						grid: {},
						colors: [],
						pieces: {}
					}
					
				// grid
					createGrid()

				// pieces
					createPieces()

				// start playing
					ELEMENTS.body.removeAttribute("gameover")
					GAME.playing = true
			}

		/* createGrid */
			function createGrid() {
				// clear
					ELEMENTS.background.innerHTML = ""
					ELEMENTS.root.style.setProperty("--hexagon-size", SETTINGS.hexagonSize)

				// loop through coordinates
					for (var x = -SETTINGS.x; x <= SETTINGS.x; x++) {
						for (var y = -SETTINGS.y; y <= SETTINGS.y; y++) {
							if (!GAME.grid[x]) {
								GAME.grid[x] = {}
							}

							if (!GAME.grid[x][y]) {
								GAME.grid[x][y] = {}
							}

							var z = 0 - (x + y)
							if (z >= -SETTINGS.z && z <= SETTINGS.z) {
								// add to grid
									GAME.grid[x][y][z] = 0

								// draw background hexagon
									ELEMENTS.background.appendChild(createHexagonElement(x, y, z, {data: true}))
							}
						}
					}
			}

		/* createPieces */
			function createPieces() {
				// clear
					ELEMENTS.container.innerHTML = ""

				// single piece for now
					var startingPiece = createStartingPiece()
					GAME.pieces[startingPiece.id] = startingPiece

				// split pieces recursively
					GAME.pieces = splitPiece(GAME.pieces, startingPiece)

				// shuffle & draw pieces
					for (var i in GAME.pieces) {
						placePiece(GAME.pieces[i])
						createPieceElement(GAME.pieces[i])
					}
			}

		/* createStartingPiece */
			function createStartingPiece() {
				// starting piece
					var startingPiece = {
						id: generateRandom(),
						color: colorRandom(),
						x: 0,
						y: 0,
						z: 0,
						element: null,
						hexagons: []
					}

				// loop through grid
					for (var x in GAME.grid) {
						for (var y in GAME.grid[x]) {
							for (var z in GAME.grid[x][y]) {
								GAME.grid[x][y][z] = 1
								startingPiece.hexagons.push({
									element: null,
									x: Number(x),
									y: Number(y),
									z: Number(z)
								})
							}
						}
					}

				// return
					return startingPiece
			}

		/* splitPiece */
			function splitPiece(collection, oldPiece) {
				// 1 hexagon
					if (oldPiece.hexagons.length < 2) {
						return collection
					}

				// determine how to split
					do {
						// axis
							var axis = chooseRandom(["x", "y", "z"])

						// distance
							var maximum = -SETTINGS[axis]
							var minimum = SETTINGS[axis]
							for (var i in oldPiece.hexagons) {
								if (oldPiece.hexagons[i][axis] > maximum) {
									maximum = oldPiece.hexagons[i][axis]
								}
								if (oldPiece.hexagons[i][axis] < minimum) {
									minimum = oldPiece.hexagons[i][axis]
								}
							}
					}
					while (maximum == minimum)

				// determine where to split
					var splitLine = rangeRandom(minimum, maximum - 1)

				// count how many pieces would be split off
					var newPieceSize = 0
					var oldPieceSize = oldPiece.hexagons.length

					for (var i in oldPiece.hexagons) {
						if (oldPiece.hexagons[i][axis] > splitLine) {
							newPieceSize++
							oldPieceSize--
						}
					}
					
					if (newPieceSize < SETTINGS.minPieceSize || oldPieceSize < SETTINGS.minPieceSize) {
						return splitPiece(collection, oldPiece)
					}

				// color
					do {
						var color = colorRandom()
					}
					while (GAME.colors.includes(color))
					GAME.colors.push(color)

				// new piece
					var newPiece = {
						id: generateRandom(),
						color: color,
						x: 0,
						y: 0,
						z: 0,
						element: null,
						hexagons: []
					}

				// move hexagons from one to the other
					for (var i = 0; i < oldPiece.hexagons.length; i++) {
						if (oldPiece.hexagons[i][axis] > splitLine) {
							newPiece.hexagons.push(JSON.parse(JSON.stringify(oldPiece.hexagons[i])))
							oldPiece.hexagons.splice(i, 1)
							i--
						}
					}

				// add to collection
					collection[newPiece.id] = newPiece

				// split more?
					if (oldPiece.hexagons.length > SETTINGS.maxPieceSize) {
						collection = splitPiece(collection, oldPiece)
					}
					if (newPiece.hexagons.length > SETTINGS.maxPieceSize) {
						collection = splitPiece(collection, newPiece)
					}

				// otherwise
					return collection
			}

		/* placePiece */
			function placePiece(piece) {
				// pick up
					updateGrid(piece, -1)

				// get edges
					var maximumX = -SETTINGS.x
					var minimumX = SETTINGS.x
					for (var i in piece.hexagons) {
						if (piece.hexagons[i].x > maximumX) {
							maximumX = piece.hexagons[i].x
						}
						if (piece.hexagons[i].x < minimumX) {
							minimumX = piece.hexagons[i].x
						}
					}

					var maximumY = -SETTINGS.y
					var minimumY = SETTINGS.y
					for (var i in piece.hexagons) {
						if (piece.hexagons[i].y > maximumY) {
							maximumY = piece.hexagons[i].y
						}
						if (piece.hexagons[i].y < minimumY) {
							minimumY = piece.hexagons[i].y
						}
					}

				// random offset
					var x = rangeRandom(-maximumX - 1, -minimumX + 1)
					var y = rangeRandom(-maximumY - 1, -minimumY + 1)
					var z = (0 - x - y)

				// update piece coordinates
					piece.x = x
					piece.y = y
					piece.z = z

				// put down
					updateGrid(piece, 1)
			}

	/*** draw ***/
		/* createPieceElement */
			function createPieceElement(piece) {
				// draw piece
					var pieceElement = document.createElement("piece")
						pieceElement.className = "piece"
						pieceElement.id = piece.id
					ELEMENTS.container.appendChild(pieceElement)
					piece.element = pieceElement

				// draw hexagons
					for (var i in piece.hexagons) {
						var x = Number(piece.x) + Number(piece.hexagons[i].x)
						var y = Number(piece.y) + Number(piece.hexagons[i].y)
						var z = Number(piece.z) + Number(piece.hexagons[i].z)
						piece.hexagons[i].element = createHexagonElement(x, y, z, {piece: piece.id, color: piece.color})
						pieceElement.appendChild(piece.hexagons[i].element)
					}
			}

		/* createHexagonElement */
			function createHexagonElement(x, y, z, options) {				
				// element
					var hexagonElement = document.createElement("div")
						hexagonElement.className = "hexagon"

				// position
					positionHexagon(hexagonElement, x, y, z)

				// options
					// piece
						if (options && options.piece) {
							hexagonElement.setAttribute("piece", options.piece)
							hexagonElement.addEventListener(TRIGGERS.mousedown, selectHexagon)
						}

					// data
						if (options && options.data) {
							hexagonElement.setAttribute("data-x", x)
							hexagonElement.setAttribute("data-y", y)
							hexagonElement.setAttribute("data-z", z)
						}

					// coordinates
						if (options && options.coordinates) {
							hexagonElement.innerHTML = "<br>(" + x + ", " + y + ", " + z + ")"
						}

					// color
						if (options && options.color) {
							hexagonElement.style.background = options.color
						}

				return hexagonElement
			}

		/* positionPiece */
			function positionPiece(piece) {
				// reposition child hexagons
					for (var i in piece.hexagons) {
						var x = Number(piece.x) + Number(piece.hexagons[i].x)
						var y = Number(piece.y) + Number(piece.hexagons[i].y)
						var z = Number(piece.z) + Number(piece.hexagons[i].z)
						positionHexagon(piece.hexagons[i].element, x, y, z)
					}
			}

		/* positionHexagon */
			function positionHexagon(hexagonElement, x, y, z) {
				// set attributes
					hexagonElement.style.left = "calc(50% + " + (SETTINGS.hexagonSize * 0.75 * x) + "px)"
					hexagonElement.style.top = "calc(50% + " + (SETTINGS.hexagonSize * 0.866 * (-y/2 + z/2)) + "px)"
			}

	/*** interaction ***/
		/* selectHexagon */
			function selectHexagon(event) {
				// not playing
					if (!GAME.playing) {
						return
					}

				// already grabbing?
					if (GAME.selectedHexagon) {
						return
					}

				// cursor
					var cursorX = (event.targetTouches ? event.targetTouches[0].clientX : event.clientX)
					var cursorY = (event.targetTouches ? event.targetTouches[0].clientY : event.clientY)

				// hex coordinates
					var hexCoordinates = getHexCoordinates(cursorX, cursorY)

				// select
					GAME.selectedHexagon = event.target
					ELEMENTS.container.setAttribute("grabbed", true)

				// get piece
					var pieceId = GAME.selectedHexagon.getAttribute("piece")
					if (GAME.pieces[pieceId]) {
						var piece = GAME.pieces[pieceId]
							piece.element.setAttribute("selected", true)

						updateGrid(piece, -1)
						GAME.selectedCoordinates = {
							x: hexCoordinates.x - piece.x,
							y: hexCoordinates.y - piece.y,
							z: hexCoordinates.z - piece.z,
						}
					}
			}

		/* moveHexagon */
			document.addEventListener(TRIGGERS.mousemove, moveHexagon)
			function moveHexagon(event) {
				// not playing
					if (!GAME.playing) {
						return
					}

				// none grabbed?
					if (!GAME.selectedHexagon) {
						return
					}

					var pieceId = GAME.selectedHexagon.getAttribute("piece")
					if (GAME.pieces[pieceId]) {
						var piece = GAME.pieces[pieceId]
					}

				// cursor
					var cursorX = (event.targetTouches ? event.targetTouches[0].clientX : event.clientX)
					var cursorY = (event.targetTouches ? event.targetTouches[0].clientY : event.clientY)

				// hex coordinates
					var hexCoordinates = getHexCoordinates(cursorX, cursorY)

				// update piece
					var pieceId = GAME.selectedHexagon.getAttribute("piece")
					if (GAME.pieces[pieceId]) {
						var piece = GAME.pieces[pieceId]
							piece.x = Number(hexCoordinates.x) - Number(GAME.selectedCoordinates.x)
							piece.y = Number(hexCoordinates.y) - Number(GAME.selectedCoordinates.y)
							piece.z = Number(hexCoordinates.z) - Number(GAME.selectedCoordinates.z)

						// position
							positionPiece(piece)
					}
			}

		/* unselectHexagon */
			document.addEventListener(TRIGGERS.mouseup, unselectHexagon)
			function unselectHexagon(event) {
				// not playing
					if (!GAME.playing) {
						return
					}

				// none grabbed?
					if (!GAME.selectedHexagon) {
						return
					}

				// update grid
					var pieceId = GAME.selectedHexagon.getAttribute("piece")
					if (GAME.pieces[pieceId]) {
						var piece = GAME.pieces[pieceId]
							piece.element.removeAttribute("selected")
						updateGrid(piece, 1)
					}

				// unselect
					GAME.selectedHexagon = null
					GAME.selectedCoordinates = null
					ELEMENTS.container.removeAttribute("grabbed")

				// check for victory
					checkVictory()
			}

		/* updateGrid */
			function updateGrid(piece, change) {
				// loop through hexagons
					for (var i in piece.hexagons) {
						var hexagon = piece.hexagons[i]
						var x = Number(piece.x) + Number(hexagon.x)
						var y = Number(piece.y) + Number(hexagon.y)
						var z = Number(piece.z) + Number(hexagon.z)
						if (GAME.grid[x] && GAME.grid[x][y] && GAME.grid[x][y][z] !== undefined) {
							GAME.grid[x][y][z] += change
						}
					}
			}

	/*** checks ***/
		/* checkVictory */
			function checkVictory() {
				// assume victory
					var victory = true

				// loop through
					for (var x in GAME.grid) {
						for (var y in GAME.grid[x]) {
							for (var z in GAME.grid[x][y]) {
								if (GAME.grid[x][y][z] !== 1) {
									return false
								}
							}
						}
					}

				// otherwise, victory
					GAME.playing = false
					ELEMENTS.body.setAttribute("gameover", true)
			}
})