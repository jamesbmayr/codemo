window.onload = function() {

	/*** globals ***/
		var turn    = null
		var players = {
			X: null,
			O: null
		}

	/*** menu ***/
		/* togglePlayer */
			var toggles = Array.from(document.querySelectorAll(".toggle"))
			for (var t in toggles) { toggles[t].addEventListener("click", togglePlayer) }
			function togglePlayer(event) {
				if (event.target.className == "toggle") {
					var player = event.target.id.split("-")[0]
					var type   = event.target.id.split("-")[1]

					document.getElementById(player + "-" + type).setAttribute("selected", true)
					document.getElementById(player + "-" + (type == "ai" ? "human" : "ai")).removeAttribute("selected")
				}
			}

		/* startGame */
			document.getElementById("start").addEventListener("click", startGame)
			function startGame() {
				// initialize game
					clearBoard()
					document.getElementById("board").className = ""
					document.getElementById("menu").className = "hidden"
					document.getElementById("message").innerText = ""

					turn = "X"

				// get ai
					players.X = (document.getElementById("X-ai").getAttribute("selected") ? "ai" : "human")
					players.O = (document.getElementById("O-ai").getAttribute("selected") ? "ai" : "human")

					if (players[turn] == "ai") {
						chooseOption()
					}
			}

		/* clearBoard */
			function clearBoard() {
				var cells = Array.from(document.querySelectorAll(".cell"))
				for (var c in cells) {
					cells[c].setAttribute("player", "")
				}
			}

		/* endGame */
			function endGame(winner) {
				document.getElementById("board").className = "gameover"
				document.getElementById("menu").className = ""
				document.getElementById("message").innerText = ((winner == "X" || winner == "O") ? (winner + " wins") : "tie")

				turn = null;
			}

	/*** player ***/
		/* selectCell */
			var cells = Array.from(document.querySelectorAll(".cell"))
			for (var c in cells) { cells[c].addEventListener("click", selectCell) }
			function selectCell(event) {
				if ((event.target.className == "cell") && (turn !== null)) {
					var cell = event.target.id.split("-")[1]
					var game = getGame()
					var options = Object.keys(game).filter(function (g) { return !game[g] })

					if (options.includes(cell)) {
						event.target.setAttribute("player", turn)
						switchTurn()						
					}
				}
			}

		/* getGame */
			function getGame() {
				// get data
					var cells = Array.from(document.querySelectorAll(".cell"))
					var game = {}

					for (var c in cells) {
						var id = Number(cells[c].id.split("-")[1])
						var player = cells[c].getAttribute("player") || ""
						game[id] = (player.length ? player : null)
					}

				return game
			}

		/* checkVictory */
			function checkVictory() {
				// get data
					var game = getGame()

				// rows
					if (["X", "O"].includes(game[1]) && (game[1] == game[2]) && (game[1] == game[3])) {
						return game[1]
					}
					else if (["X", "O"].includes(game[4]) && (game[4] == game[5]) && (game[4] == game[6])) {
						return game[4]
					}
					else if (["X", "O"].includes(game[7]) && (game[7] == game[8]) && (game[7] == game[9])) {
						return game[7]
					}

				// columns
					else if (["X", "O"].includes(game[1]) && (game[1] == game[4]) && (game[1] == game[7])) {
						return game[1]
					}
					else if (["X", "O"].includes(game[2]) && (game[2] == game[5]) && (game[2] == game[8])) {
						return game[2]
					}
					else if (["X", "O"].includes(game[3]) && (game[3] == game[6]) && (game[3] == game[9])) {
						return game[3]
					}

				// diagonals
					else if (["X", "O"].includes(game[1]) && (game[1] == game[5]) && (game[1] == game[9])) {
						return game[1]
					}
					else if (["X", "O"].includes(game[3]) && (game[3] == game[5]) && (game[3] == game[7])) {
						return game[3]
					}

				// tie
					else if (Object.keys(game).filter(function (g) { return game[g] }).length == 9) {
						return "tie"
					}
					else {
						return false
					}
			}

		/* switchTurn */
			function switchTurn() {
				// end game ?
					var victory = checkVictory()
					if (victory) {
						endGame(victory)
					}

				// continue
					else {
						turn = (turn == "X" ? "O" : "X")

						if (players[turn] == "ai") {
							chooseOption()
						}
					}
			}

	/*** ai ***/
		/* chooseOption */
			function chooseOption() {
				// get options
					var game    = getGame()
					var options = {
						win:   [],
						block: [],
						move:  []
					}

					for (var g in game) {
						if (!game[g]) {
							var type = identifyOption(game, Number(g))
							options[type].push(g)
						}
					}

				// choose an option
					if (options.win.length) {
						var option = options.win[Math.floor(Math.random() * options.win.length)]
					}
					else if (options.block.length) {
						var option = options.block[Math.floor(Math.random() * options.block.length)]
					}
					else {
						var option = options.move[Math.floor(Math.random() * options.move.length)]
					}

				// implement option
					if (option) {
						playOption(option)
					}
					else {
						endGame("tie")
					}
			}

		/* identifyOption */
			function identifyOption(game, cell) {
				// get data
					var opponent = (turn == "X" ? "O" : "X")

				// find options
					var options = []
					switch (cell) {
						case 1:
							if (game[2] == opponent && game[3] == opponent) {
								options.push("block")
							}
							if (game[4] == opponent && game[7] == opponent) {
								options.push("block")
							}
							if (game[5] == opponent && game[9] == opponent) {
								options.push("block")
							}

							if (game[2] == turn && game[3] == turn) {
								options.push("win")
							}
							if (game[4] == turn && game[7] == turn) {
								options.push("win")
							}
							if (game[5] == turn && game[9] == turn) {
								options.push("win")
							}
						break

						case 2:
							if (game[1] == opponent && game[3] == opponent) {
								options.push("block")
							}
							if (game[5] == opponent && game[8] == opponent) {
								options.push("block")
							}
							
							if (game[1] == turn && game[3] == turn) {
								options.push("win")
							}
							if (game[5] == turn && game[8] == turn) {
								options.push("win")
							}
						break

						case 3:
							if (game[1] == opponent && game[2] == opponent) {
								options.push("block")
							}
							if (game[6] == opponent && game[9] == opponent) {
								options.push("block")
							}
							if (game[5] == opponent && game[7] == opponent) {
								options.push("block")
							}
							
							if (game[1] == turn && game[2] == turn) {
								options.push("win")
							}
							if (game[6] == turn && game[9] == turn) {
								options.push("win")
							}
							if (game[5] == turn && game[7] == turn) {
								options.push("win")
							}
						break

						case 4:
							if (game[5] == opponent && game[6] == opponent) {
								options.push("block")
							}
							if (game[1] == opponent && game[7] == opponent) {
								options.push("block")
							}
							
							if (game[5] == turn && game[6] == turn) {
								options.push("win")
							}
							if (game[1] == turn && game[7] == turn) {
								options.push("win")
							}
						break

						case 5:
							if (game[4] == opponent && game[6] == opponent) {
								options.push("block")
							}
							if (game[2] == opponent && game[8] == opponent) {
								options.push("block")
							}
							if (game[1] == opponent && game[9] == opponent) {
								options.push("block")
							}
							if (game[3] == opponent && game[7] == opponent) {
								options.push("block")
							}
							
							if (game[4] == turn && game[6] == turn) {
								options.push("win")
							}
							if (game[2] == turn && game[8] == turn) {
								options.push("win")
							}
							if (game[1] == turn && game[9] == turn) {
								options.push("win")
							}
							if (game[3] == turn && game[7] == turn) {
								options.push("win")
							}
						break

						case 6:
							if (game[4] == opponent && game[5] == opponent) {
								options.push("block")
							}
							if (game[3] == opponent && game[9] == opponent) {
								options.push("block")
							}
							
							if (game[4] == turn && game[5] == turn) {
								options.push("win")
							}
							if (game[3] == turn && game[9] == turn) {
								options.push("win")
							}
						break

						case 7:
							if (game[8] == opponent && game[9] == opponent) {
								options.push("block")
							}
							if (game[1] == opponent && game[4] == opponent) {
								options.push("block")
							}
							if (game[3] == opponent && game[5] == opponent) {
								options.push("block")
							}
							
							if (game[8] == turn && game[9] == turn) {
								options.push("win")
							}
							if (game[1] == turn && game[4] == turn) {
								options.push("win")
							}
							if (game[3] == turn && game[5] == turn) {
								options.push("win")
							}
						break

						case 8:
							if (game[7] == opponent && game[9] == opponent) {
								options.push("block")
							}
							if (game[2] == opponent && game[5] == opponent) {
								options.push("block")
							}
							
							if (game[7] == turn && game[9] == turn) {
								options.push("win")
							}
							if (game[2] == turn && game[5] == turn) {
								options.push("win")
							}
						break

						case 9:
							if (game[7] == opponent && game[8] == opponent) {
								options.push("block")
							}
							if (game[3] == opponent && game[6] == opponent) {
								options.push("block")
							}
							if (game[1] == opponent && game[5] == opponent) {
								options.push("block")
							}
							
							if (game[7] == turn && game[8] == turn) {
								options.push("win")
							}
							if (game[3] == turn && game[6] == turn) {
								options.push("win")
							}
							if (game[1] == turn && game[5] == turn) {
								options.push("win")
							}
						break
					}

				// consolidate
					if (options.includes("win")) {
						return "win"
					}
					else if (options.includes("block")) {
						return "block"
					}
					else {
						return "move"
					}
			}

		/* playOption */
			function playOption(option) {
				setTimeout(function() {
					document.getElementById("cell-" + option).click()

					var victory = checkVictory()
					if (victory) {
						endGame(victory)
					}
				}, 1000)
			}
}