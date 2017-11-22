window.onload = function() {

	/* parameters */
		/* globals */
			var boardSize   = null
			var squareSize  = null
			var checkerSize = null
			var marginX     = null
			var marginY     = null

			var players     = {}
			var game        = document.getElementById("game")
			createSquares()

		/* resize */
			window.addEventListener("resize", resizeWindow)
			resizeWindow()
			function resizeWindow(event) {
				if (!event) {
					boardSize   = document.getElementById("board").getBoundingClientRect().width
					squareSize  = boardSize / 8
					checkerSize = boardSize / 10
					marginX     = (window.innerWidth  - boardSize) / 2
					marginY     = (window.innerHeight - boardSize) / 2
				}
				else {
					setTimeout(resizeWindow, 2000)
				}
			}

		/* togglePlayer */
			Array.from(document.querySelectorAll(".toggle")).forEach(function (t) {
				t.addEventListener("click", togglePlayer)
			})
			function togglePlayer(event) {
				if (event.target.className == "toggle") {
					var color  = event.target.getAttribute("color")
					var player = event.target.getAttribute("player")

					Array.from(document.querySelectorAll(".toggle[player='" + (player == "ai" ? "human" : "ai") + "'][color='" + color + "']"))[0].setAttribute("active", "false")
					event.target.setAttribute("active", "true")
				}
			}

	/* game state */
		/* startGame */
			document.getElementById("start").addEventListener("click", startGame)
			function startGame() {
				document.getElementById("controls").className = "hidden"

				players.white = Array.from(document.querySelectorAll(".toggle[color='white'][active='true']"))[0].getAttribute("player")
				players.black = Array.from(document.querySelectorAll(".toggle[color='black'][active='true']"))[0].getAttribute("player")

				createCheckers()
				getTurn()
			}

		/* endGame */
			function endGame() {
				game.setAttribute("turn", "")
				document.getElementById("controls").className = ""
			}

	/* board */
		/* createSquares */
			function createSquares() {
				var board = document.getElementById("board")

				for (var y = 0; y < 8; y++) {
					for (var x = 0; x < 8; x++) {
						
						// create & position
							var square = document.createElement("div")
								square.className = "square"
								square.style.left = (x * 12.5) + "%"
								square.style.top  = (y * 12.5) + "%"
								square.setAttribute("x", x)
								square.setAttribute("y", y)

						// color
							if ((x + y) % 2 == 0) {
								square.setAttribute("color", "white")
							}
							else {
								square.setAttribute("color", "black")
							}

						// append
							board.appendChild(square)
					}
				}
			}

		/* createCheckers */
			function createCheckers() {
				var board = document.getElementById("board")
				
				// remove existing
					var checkers = Array.from(document.querySelectorAll(".checker")) || []
						checkers.forEach(function (c) {
							c.parentNode.removeChild(c)
						})

				for (var y = 0; y < 8; y++) {
					for (var x = 0; x < 8; x++) {
						if ((y < 3 || y > 4) && ((x + y) % 2 == 0)) {
							
							// create & position
								var checker = document.createElement("checker")
									checker.className = "checker"
									checker.style.left = (x * 12.5) + 6.25 + "%"
									checker.style.top  = (y * 12.5) + 6.25 + "%"
									checker.setAttribute("x", x)
									checker.setAttribute("y", y)
									checker.setAttribute("king", "false")
									checker.setAttribute("jumping", "false")
									checker.addEventListener("click", touchChecker)

							// color
								if (y < 3) {
									checker.setAttribute("color", "white")
								}
								else if (y > 4) {
									checker.setAttribute("color", "black")
								}

							// ai
								checker.setAttribute("player", players[checker.getAttribute("color")])

							// append
								board.appendChild(checker)
						}
					}
				}
			}

	/* interaction */
		/* touchChecker */
			function touchChecker(event) {
				// deactivate
					if (event.target.getAttribute("active") == "true") {
						deactivateChecker(event.target)
					}

				// activate
					else if ((event.target.className == "checker") && (event.target.getAttribute("color") == game.getAttribute("turn"))) {
						activateChecker(event.target)
					}
			}

		/* moveChecker */
			document.addEventListener("mousemove", moveChecker)
			function moveChecker(event) {
				var checker = Array.from(document.querySelectorAll(".checker[active='true'][player='human']"))[0] || false

				if (checker) {
					checker.style.left = event.clientX - marginX + "px"
					checker.style.top  = event.clientY - marginY + "px"
				}
			}

	/* activation */
		/* activateChecker */
			function activateChecker(checker) {
				// deactivate others
					Array.from(document.querySelectorAll(".checker[active='true']")).forEach(function (c) {
						c.setAttribute("active", "false")
					})

				// activate this one
					checker.setAttribute("active", "true")
			}

		/* deactivateChecker */
			function deactivateChecker(checker) {
				// position
					var x = checker.getBoundingClientRect().left - marginX + (0.5 * checkerSize)
					var y = checker.getBoundingClientRect().top  - marginY + (0.5 * checkerSize)

					x = Math.floor(x / squareSize)
					y = Math.floor(y / squareSize)
				
				// action tree
					var action = getAction(checker, x, y)
					if (action) {

						// update position
							checker.style.left = (x * 12.5) + 6.25 + "%"
							checker.style.top  = (y * 12.5) + 6.25 + "%"
							checker.setAttribute("x", x)
							checker.setAttribute("y", y)

						// jump
							if (action.type == "jump") {
								action.jumpee.parentNode.removeChild(action.jumpee)

								if (action.king) {
									checker.setAttribute("king", "true")									
									getTurn(checker)
								}
								else if (!getAllActions(checker).filter(function (a) {
									return a.type == "jump"
								}).length) {
									getTurn(checker)
								}
								else {
									checker.setAttribute("jumping", "true")

									if (players[game.getAttribute("turn")] == "ai") {
										chooseAIaction(checker)
									}
								}
							}

						// move
							else if (action.type == "move") {
								if (action.king) {
									checker.setAttribute("king", "true")
									getTurn(checker)
								}
								else {									
									getTurn(checker)
								}
							}

						// none
							else if (action.type == "none" && action.postjump) {
								getTurn(checker)
							}
							else if (action.type == "none") {
								checker.setAttribute("active", "false")
							}
					}
			}

	/* game play */
		/* getAction */
			function getAction(active, x, y) {
				// data
					var activeX = parseInt(active.getAttribute("x"))
					var activeY = parseInt(active.getAttribute("y"))
					var activeKing = (active.getAttribute("king") == "true" ? true : false)
					var activeColor = active.getAttribute("color")
					var activeJumping = (active.getAttribute("jumping") == "true" ? true : false)

					var opponentColor = (activeColor == "white" ? "black" : "white")
					var occupier = Array.from(document.querySelectorAll(".checker[x='" + x + "'][y='" + y + "']"))[0] || false
					var jumpee = Array.from(document.querySelectorAll(".checker[x='" + ((x + activeX) / 2) + "'][y='" + ((y + activeY) / 2) + "'][color='" + opponentColor + "']"))[0] || false
					var action = {x: x, y: y}

				// checks
					if (!active) {
						action = false
					}
					else if (x < 0 || y < 0 || x > 7 || y > 7) {
						action = false
					}
					else if ((x + y) % 2 !== 0) {
						action = false
					}
					else if ((x == activeX) && (y == activeY)) {
						action.type = "none"
						action.postjump = activeJumping
					}
					else if (occupier) {
						action = false
					}

				// white
					else if ((activeColor == "white") && (game.getAttribute("turn") == "white")) {
						// move
							if ((y == activeY + 1) && ((x == activeX + 1) || (x == activeX - 1))) {
								action.type = "move"
							}
							else if (activeKing && (y == activeY - 1) && ((x == activeX + 1) || (x == activeX - 1))) {
								action.type = "move"
							}

						// jump
							else if (jumpee && (y == activeY + 2) && ((x == activeX + 2) || (x == activeX - 2))) {
								action.type = "jump"
								action.jumpee = jumpee
							}
							else if (jumpee && activeKing && (y == activeY - 2) && ((x == activeX + 2) || (x == activeX - 2))) {
								action.type = "jump"
								action.jumpee = jumpee
							}

						// invalid
							else {
								action = false
							}

						// king
							if (action && !activeKing && y == 7) {
								action.king = true
							}
					}

				// black
					else if ((activeColor == "black") && (game.getAttribute("turn") == "black")) {
						// move
							if ((y == activeY - 1) && ((x == activeX + 1) || (x == activeX - 1))) {
								action.type = "move"

							}
							else if (activeKing && (y == activeY + 1) && ((x == activeX + 1) || (x == activeX - 1))) {
								action.type = "move"
							}

						// jump
							else if (jumpee && (y == activeY - 2) && ((x == activeX + 2) || (x == activeX - 2))) {
								action.type = "jump"
								action.jumpee = jumpee
							}
							else if (jumpee && activeKing && (y == activeY + 2) && ((x == activeX + 2) || (x == activeX - 2))) {
								action.type = "jump"
								action.jumpee = jumpee
							}

						// invalid
							else {
								action = false
							}

						// king
							if (action && !activeKing && y == 0) {
								action.king = true
							}
					}

				// return
					return action
			}

		/* getAllActions */
			function getAllActions(active) {
				// data
					var x = parseInt(active.getAttribute("x"))
					var y = parseInt(active.getAttribute("y"))
					var actions = []

				// loop through
					for (var deltaY = -2; deltaY <= 2; deltaY++) {
						for (var deltaX = -2; deltaX <= 2; deltaX++) {
							if ((((x + deltaX) + (y + deltaY)) % 2 == 0) && (deltaX !== 0 && deltaY !== 0)) {
								actions.push(getAction(active, (x + deltaX), (y + deltaY)))
							}
						}
					}

				// return array
					return actions
			}

		/* getTurn */
			function getTurn(active) {
				// update turn
					var turn = game.getAttribute("turn") || ""
						turn = (turn == "white" ? "black" : "white")
					game.setAttribute("turn", turn)

				// deactivate checker
					if (active) {
						active.setAttribute("jumping", "false")
						active.setAttribute("active", "false")
					}

				// get availableActions
					var white = Array.from(document.querySelectorAll(".checker[color='white']")) || []
					var black = Array.from(document.querySelectorAll(".checker[color='black']")) || []
					var availableActions = []

					if (turn == "black") {
						black.forEach(function (c) {
							availableActions.push(getAllActions(c))
						})
					}
					else if (turn == "white") {
						white.forEach(function (c) {
							availableActions.push(getAllActions(c))
						})
					}

					availableActions = availableActions.filter(function (array) {
						return array.filter(function (a) {
							return a
						}).length
					})

				// check conditions
					if (!white.length) {
						console.log("black wins")
						endGame()
					}
					else if (!black.length) {
						console.log("white wins")
						endGame()
					}
					else if (turn.length && !availableActions.length) {
						console.log("stalemate")
						endGame()
					}

				// ai
					if (players[game.getAttribute("turn")] == "ai") {
						chooseAIaction()
					}
			}

	/* ai */
		function chooseAIaction(active) {
			// get checkers
				if (active) {
					var checkers = [active]
					var jumpsOnly = true
				}
				else {
					var checkers = Array.from(document.querySelectorAll(".checker[color='" + game.getAttribute("turn") + "']"))
					var jumpsOnly = false
				}

			// get all viable actions
				var options  = []
				for (var c in checkers) {
					var actions = getAllActions(checkers[c])
						actions = actions.filter(function (a) {
							return (a !== false && a !== null)
						}) || []

					if (jumpsOnly) {
						actions = actions.filter(function (a) {
							return (a.type == "jump")
						}) || [{type: "none", x: checkers[c].getAttribute("x"), y: checkers[c].getAttribute("y")}]
					}

					options[c] = {
						checker: checkers[c],
						actions: actions
					}
				}

			// filter out pieces with no actions
				options = options.filter(function (o) {
					return o.actions.length
				})

			// weight options
				var weightedOptions = []
				for (var o in options) {
					var weightedActions = []
					for (var a in options[o].actions) {
						if (options[o].actions[a].type == "move") { // x1
							weightedActions.push(options[o].actions[a])
							weightedOptions.push(options[o])
						}

						if (options[o].actions[a].y == 3 || options[o].actions[a].y == 4) { // x4
							weightedActions.push(options[o].actions[a])
							weightedActions.push(options[o].actions[a])
							weightedActions.push(options[o].actions[a])
							weightedActions.push(options[o].actions[a])
							weightedOptions.push(options[o])
							weightedOptions.push(options[o])
							weightedOptions.push(options[o])
							weightedOptions.push(options[o])
						}
						
						if (options[o].actions[a].type == "jump") { // x8
							weightedActions.push(options[o].actions[a])
							weightedActions.push(options[o].actions[a])
							weightedActions.push(options[o].actions[a])
							weightedActions.push(options[o].actions[a])
							weightedActions.push(options[o].actions[a])
							weightedActions.push(options[o].actions[a])
							weightedActions.push(options[o].actions[a])
							weightedActions.push(options[o].actions[a])
							weightedOptions.push(options[o])
							weightedOptions.push(options[o])
							weightedOptions.push(options[o])
							weightedOptions.push(options[o])
							weightedOptions.push(options[o])
							weightedOptions.push(options[o])
							weightedOptions.push(options[o])
							weightedOptions.push(options[o])
						}

						if (options[o].actions[a].king) { // x8
							weightedActions.push(options[o].actions[a])
							weightedActions.push(options[o].actions[a])
							weightedActions.push(options[o].actions[a])
							weightedActions.push(options[o].actions[a])
							weightedActions.push(options[o].actions[a])
							weightedActions.push(options[o].actions[a])
							weightedActions.push(options[o].actions[a])
							weightedActions.push(options[o].actions[a])
							weightedOptions.push(options[o])
							weightedOptions.push(options[o])
							weightedOptions.push(options[o])
							weightedOptions.push(options[o])
							weightedOptions.push(options[o])
							weightedOptions.push(options[o])
							weightedOptions.push(options[o])
							weightedOptions.push(options[o])
						}
					}

					options[o].actions = weightedActions
				}

				options = weightedOptions
				console.log(options)

			// choose randomly
				var selectedOption = options[Math.floor(Math.random() * options.length)]
				var selectedAction = selectedOption.actions[Math.floor(Math.random() * selectedOption.actions.length)]

			// activate, then get destination
				activateChecker(selectedOption.checker)

				var destinationX = (selectedAction.x * squareSize) + (0.5 * checkerSize)
				var destinationY = (selectedAction.y * squareSize) + (0.5 * checkerSize)

			// move, then deactivate
				var AImoveLoop = setInterval(function() {
					var currentX = selectedOption.checker.getBoundingClientRect().left - marginX + (0.5 * checkerSize)
					var currentY = selectedOption.checker.getBoundingClientRect().top  - marginY + (0.5 * checkerSize)

					if ((Math.abs(currentX - destinationX) > 10) || (Math.abs(currentY - destinationY) > 10)) {
						selectedOption.checker.style.left = (currentX + Math.sign(destinationX - currentX)) + "px"
						selectedOption.checker.style.top  = (currentY + Math.sign(destinationY - currentY)) + "px"
					}
					else {
						clearInterval(AImoveLoop)
						deactivateChecker(selectedOption.checker)
					}
				}, 10)
		}	

}