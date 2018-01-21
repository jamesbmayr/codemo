window.onload = function() {

	/*** onload ***/
		/* globals */
			var turn = null
			var players = {
				red: null,
				blue: null
			}
			pass = null

	/*** game ***/
		/* startGame */
			document.getElementById("start").addEventListener("click", startGame)
			function startGame() {
				// hide menu
					document.getElementById("menu").className = "hidden"
					document.getElementById("board").setAttribute("state", "")

				// create game
					buildBoard()
					buildPieces()

				// get players
					players.red  = document.getElementById("red").getAttribute("player")
					players.blue = document.getElementById("blue").getAttribute("player")

				// reset turn & pass
					pass = 0
					turn = "red"
					document.getElementById("board").setAttribute("turn", turn)

				// ai ? start
					if (players[turn] == "ai") {
						setTimeout(function() {
							aiMove()
						}, 1000)
					}
			}

		/* endGame */
			function endGame(victory) {
				turn = null
				pass = null

				document.getElementById("menu").className = ""
				document.getElementById("board").setAttribute("turn", victory || "tie")
				document.getElementById("board").setAttribute("state", "end")
				document.getElementById("start").innerHTML = (victory ? (victory + " wins!") : "tie game!") + "<br>play again?"
			}

		/* switchPlayers */
			document.getElementById("red").addEventListener("click", switchPlayers)
			document.getElementById("blue").addEventListener("click", switchPlayers)
			function switchPlayers(event) {
				if (event.target.className = "player") {
					var type = event.target.getAttribute("player")
						type = (type == "human" ? "ai" : "human")
					event.target.setAttribute("player", type)
				}
			}

	/*** board ***/
		/* buildBoard */
			function buildBoard() {
				var board = document.getElementById("board")
					board.innerHTML = ""

				for (var y = 0; y < 8; y++) {
					for (var x = 0; x < 8; x++) {
						var cell = document.createElement("div")
							cell.id = "_" + x + "_" + y
							cell.className = "cell"
							cell.addEventListener("click", selectCell)

						if ((x + y) % 2 == 0) {
							cell.setAttribute("color", "white")
						}
						else {
							cell.setAttribute("color", "black")
						}

						board.appendChild(cell)
					}
				}
			}

		/* buildPieces */
			function buildPieces() {
				for (var y = 3; y <= 4; y++) {
					for (var x = 3; x <= 4; x++) {
						var cell = document.getElementById("_" + x + "_" + y)

						if ((x + y) % 2 == 0) {
							cell.appendChild( buildPiece("red") )
						}
						else {
							cell.appendChild( buildPiece("blue") )
						}
					}
				}
			}

		/* buildPiece */
			function buildPiece(color) {
				var piece = document.createElement("div")
					piece.className = "piece"
					piece.setAttribute("color", color)
				return piece
			}

	/*** play ***/
		/* selectCell */
			function selectCell(event) {
				if (event.target.className == "cell") {
					var cell = event.target

					if (!cell.childNodes.length) { // cell is unoccupied
						var flips = findFlips(cell)

						if (flips.length) { // there are flips
							// place and flip pieces
								cell.appendChild( buildPiece(turn) )

								for (var i = 0; i < flips.length; i++) {
									flipPiece(flips[i])
								}

							// switch turns
								switchTurns()							
						}
					}
				}
			}

		/* findFlips */
			function findFlips(cell) {
				var flips = []
				var opponent = (turn == "red" ? "blue" : "red")
				var startX = Number(cell.id.split("_")[1])
				var startY = Number(cell.id.split("_")[2])

				// lateral
					// n
						var maybe = []
						var y = startY - 1
						while (y !== null && y >= 0 && y <= 7) {
							var cell = document.getElementById("_" + startX + "_" + y)
							if (!cell.childNodes.length) {
								y = null
							}
							else if (cell.childNodes[0].getAttribute("color") == opponent) {
								maybe.push(cell.childNodes[0])
								y--
							}
							else if (cell.childNodes[0].getAttribute("color") == turn) {
								flips = flips.concat(maybe)
								y = null
							}
						}

					// s
						var maybe = []
						var y = startY + 1
						while (y !== null && y >= 0 && y <= 7) {
							var cell = document.getElementById("_" + startX + "_" + y)
							if (!cell.childNodes.length) {
								y = null
							}
							else if (cell.childNodes[0].getAttribute("color") == opponent) {
								maybe.push(cell.childNodes[0])
								y++
							}
							else if (cell.childNodes[0].getAttribute("color") == turn) {
								flips = flips.concat(maybe)
								y = null
							}
						}

					// w
						var maybe = []
						var x = startX - 1
						while (x !== null && x >= 0 && x <= 7) {
							var cell = document.getElementById("_" + x + "_" + startY)
							if (!cell.childNodes.length) {
								x = null
							}
							else if (cell.childNodes[0].getAttribute("color") == opponent) {
								maybe.push(cell.childNodes[0])
								x--
							}
							else if (cell.childNodes[0].getAttribute("color") == turn) {
								flips = flips.concat(maybe)
								x = null
							}
						}

					// e
						var maybe = []
						var x = startX + 1
						while (x !== null && x >= 0 && x <= 7) {
							var cell = document.getElementById("_" + x + "_" + startY)
							if (!cell.childNodes.length) {
								x = null
							}
							else if (cell.childNodes[0].getAttribute("color") == opponent) {
								maybe.push(cell.childNodes[0])
								x++
							}
							else if (cell.childNodes[0].getAttribute("color") == turn) {
								flips = flips.concat(maybe)
								x = null
							}
						}

				// diagonal
					// nw
						var maybe = []
						var x = startX - 1
						var y = startY - 1
						while ((x !== null && x >= 0 && x <= 7) && (y !== null && y >= 0 && y <= 7)) {
							var cell = document.getElementById("_" + x + "_" + y)
							if (!cell.childNodes.length) {
								x = y = null
							}
							else if (cell.childNodes[0].getAttribute("color") == opponent) {
								maybe.push(cell.childNodes[0])
								x--
								y--
							}
							else if (cell.childNodes[0].getAttribute("color") == turn) {
								flips = flips.concat(maybe)
								x = y = null
							}
						}

					// ne
						var maybe = []
						var x = startX + 1
						var y = startY - 1
						while ((x !== null && x >= 0 && x <= 7) && (y !== null && y >= 0 && y <= 7)) {
							var cell = document.getElementById("_" + x + "_" + y)
							if (!cell.childNodes.length) {
								x = y = null
							}
							else if (cell.childNodes[0].getAttribute("color") == opponent) {
								maybe.push(cell.childNodes[0])
								x++
								y--
							}
							else if (cell.childNodes[0].getAttribute("color") == turn) {
								flips = flips.concat(maybe)
								x = y = null
							}
						}

					// sw
						var maybe = []
						var x = startX - 1
						var y = startY + 1
						while ((x !== null && x >= 0 && x <= 7) && (y !== null && y >= 0 && y <= 7)) {
							var cell = document.getElementById("_" + x + "_" + y)
							if (!cell.childNodes.length) {
								x = y = null
							}
							else if (cell.childNodes[0].getAttribute("color") == opponent) {
								maybe.push(cell.childNodes[0])
								x--
								y++
							}
							else if (cell.childNodes[0].getAttribute("color") == turn) {
								flips = flips.concat(maybe)
								x = y = null
							}
						}

					// sw
						var maybe = []
						var x = startX + 1
						var y = startY + 1
						while ((x !== null && x >= 0 && x <= 7) && (y !== null && y >= 0 && y <= 7)) {
							var cell = document.getElementById("_" + x + "_" + y)
							if (!cell.childNodes.length) {
								x = y = null
							}
							else if (cell.childNodes[0].getAttribute("color") == opponent) {
								maybe.push(cell.childNodes[0])
								x++
								y++
							}
							else if (cell.childNodes[0].getAttribute("color") == turn) {
								flips = flips.concat(maybe)
								x = y = null
							}
						}

				return flips || []
			}

		/* flipPiece */
			function flipPiece(piece) {
				var color = piece.getAttribute("color")
					color = (color == "red" ? "blue" : "red")
				piece.setAttribute("color", color)
			}

		/* switchTurns */
			function switchTurns() {
				// victory ?
					var victory = checkVictory(false)
					if (victory) {
						endGame(victory)
						return
					}
					else if (pass == 2) {
						endGame( checkVictory(true) )
						return
					}

				// switch turns
					else {
						turn = (turn == "red" ? "blue" : "red")
						document.getElementById("board").setAttribute("turn", turn)
					}

				// get options
					if (players[turn] == "human") {
						var options = findOptions()
						if (!options.length) { // no options? pass
							pass++
							switchTurns()
						}
						else {
							pass = 0
						}
					}

				// ai? make a move
					else if (players[turn] == "ai") {
						setTimeout(function() {
							aiMove()	
						}, 1000)
					}
			}

		/* checkVictory */
			function checkVictory(force) {
				var red = Array.from(document.querySelectorAll(".piece[color='red']"))
				var blue = Array.from(document.querySelectorAll(".piece[color='blue']"))

				if ((red.length + blue.length == 64) || force) {
					if (red.length > blue.length) {
						return "red"
					}
					else if (blue.length > red.length) {
						return "blue"
					}
					else if (red.length == blue.length) {
						return "tie"
					}
				}
				else {
					return false
				}
			}

	/*** ai ***/
		/* findOptions */
			function findOptions() {
				// get all cells
					var cells = Array.from(document.querySelectorAll(".cell"))
				
				// get open cells
					var open = []
					for (var c in cells) {
						if (!cells[c].childNodes.length) {
							var x = Number(cells[c].id.split("_")[1])
							var y = Number(cells[c].id.split("_")[2])

							open.push({
								count:  0,
								cell:   cells[c],
								edge:   ((x == 0 || x == 7 || y == 0 || y == 7) ? true : false),
								corner: (((x == 0 && y == 0) || (x == 0 && y == 7) || (x == 7 && y == 0) || (x == 7 && y == 7)) ? true : false)
							})
						}
					}

				// remove 0-flips
					for (var o in open) {
						var count = findFlips(open[o].cell).length
						open[o].count = count
					}
					var options = open.filter(function (o) {
						return o.count
					}) || []

				// return options
					return options
			}

		/* aiMove */
			function aiMove() {
				// sort options
					var options = findOptions()
					options.sort(function(a, b) {
						return b.count - a.count
					})

				// put edges ahead
					options.sort(function (a, b) {
						if (b.edge && !a.edge) {
							return 1
						}
						else {
							return -1
						}
					})

				// put corners ahead
					options.sort(function (a, b) {
						if (b.corner && !a.corner) {
							return 1
						}
						else {
							return -1
						}
					})

				// select one of top 3 options
					if (options.length) {
						pass = 0
						var cell = options[Math.floor(Math.random() * Math.min(3, options.length))].cell
						selectCell({target: cell})
					}

				// no options? pass
					else {
						pass++
						switchTurns()
					}
			}
}