window.onload = function() {

	/* game */
		/* globals */
			var boardSize   = null
			var squareSize  = null
			var checkerSize = null
			var marginX     = null
			var marginY     = null

			var game        = document.getElementById("game")
			createSquares()

		/* resize */
			window.addEventListener("resize", resizeWindow)
			resizeWindow()
			function resizeWindow() {
				boardSize   = document.getElementById("board").getBoundingClientRect().width
				squareSize  = boardSize / 8
				checkerSize = boardSize / 10
				marginX     = (window.innerWidth  - boardSize) / 2
				marginY     = (window.innerHeight - boardSize) / 2
			}

		/* startGame */
			document.getElementById("start").addEventListener("click", startGame)
			function startGame() {
				document.getElementById("start").className = "hidden"
				createCheckers()
				getTurn()
			}

		/* endGame */
			function endGame() {
				document.getElementById("start").className = ""
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
				var checker = Array.from(document.querySelectorAll(".checker[active='true']"))[0] || false

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

								if (getKing(checker)) {
									checker.setAttribute("king", "true")									
									getTurn(checker)
								}
								else if (!getJumps(checker)) {
									getTurn(checker)
								}
								else {
									checker.setAttribute("jumping", "true")
								}
							}

						// move
							else if (action.type == "move") {
								if (getKing(checker)) {
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
					var jumpee   = Array.from(document.querySelectorAll(".checker[x='" + ((x + activeX) / 2) + "'][y='" + ((y + activeY) / 2) + "'][color='" + opponentColor + "']"))[0] || false

				// checks
					if (!active) {
						return false
					}
					else if ((x + y) % 2 !== 0) {
						return false
					}
					else if ((x == activeX) && (y == activeY)) {
						return {type: "none", postjump: activeJumping}
					}
					else if (occupier) {
						return false
					}

				// white
					else if ((activeColor == "white") && (game.getAttribute("turn") == "white")) {
						
						// move
							if ((y == activeY + 1) && ((x == activeX + 1) || (x == activeX - 1))) {
								return {type: "move"}
							}
							else if (activeKing && (y == activeY - 1) && ((x == activeX + 1) || (x == activeX - 1))) {
								return {type: "move"}
							}

						// jump
							else if (jumpee && (y == activeY + 2) && ((x == activeX + 2) || (x == activeX - 2))) {
								return {type: "jump", jumpee: jumpee}
							}
							else if (jumpee && activeKing && (y == activeY - 2) && ((x == activeX + 2) || (x == activeX - 2))) {
								return {type: "jump", jumpee: jumpee}
							}

						// invalid
							else {
								return false
							}
					}

				// black
					else if ((activeColor == "black") && (game.getAttribute("turn") == "black")) {
						
						// move
							if ((y == activeY - 1) && ((x == activeX + 1) || (x == activeX - 1))) {
								return {type: "move"}
							}
							else if (activeKing && (y == activeY + 1) && ((x == activeX + 1) || (x == activeX - 1))) {
								return {type: "move"}
							}

						// jump
							else if (jumpee && (y == activeY - 2) && ((x == activeX + 2) || (x == activeX - 2))) {
								return {type: "jump", jumpee: jumpee}
							}
							else if (jumpee && activeKing && (y == activeY + 2) && ((x == activeX + 2) || (x == activeX - 2))) {
								return {type: "jump", jumpee: jumpee}
							}

						// invalid
							else {
								return false
							}
					}
			}

		/* getJumps */
			function getJumps(active) {

				// data
					var activeX = parseInt(active.getAttribute("x"))
					var activeY = parseInt(active.getAttribute("y"))
					var activeKing = (active.getAttribute("king") == "true" ? true : false)
					var activeColor = active.getAttribute("color")
					var opponentColor = (activeColor == "white" ? "black" : "white")

				// spaces
					var opponentNW =  Array.from(document.querySelectorAll(".checker[x='" + (activeX - 1) + "'][y='" + (activeY - 1) + "'][color='" + opponentColor + "']"))[0] || false
					var vacancyNW = !(Array.from(document.querySelectorAll(".checker[x='" + (activeX - 2) + "'][y='" + (activeY - 2) + "']"))[0] || false) && (activeX - 2 >= 0) && (activeY - 2 >= 0)
					var opponentNE =  Array.from(document.querySelectorAll(".checker[x='" + (activeX + 1) + "'][y='" + (activeY - 1) + "'][color='" + opponentColor + "']"))[0] || false
					var vacancyNE = !(Array.from(document.querySelectorAll(".checker[x='" + (activeX + 2) + "'][y='" + (activeY - 2) + "']"))[0] || false) && (activeX + 2 <= 7) && (activeY - 2 >= 0)
					var opponentSW =  Array.from(document.querySelectorAll(".checker[x='" + (activeX - 1) + "'][y='" + (activeY + 1) + "'][color='" + opponentColor + "']"))[0] || false
					var vacancySW = !(Array.from(document.querySelectorAll(".checker[x='" + (activeX - 2) + "'][y='" + (activeY + 2) + "']"))[0] || false) && (activeX - 2 >= 0) && (activeY + 2 <= 7)
					var opponentSE =  Array.from(document.querySelectorAll(".checker[x='" + (activeX + 1) + "'][y='" + (activeY + 1) + "'][color='" + opponentColor + "']"))[0] || false
					var vacancySE = !(Array.from(document.querySelectorAll(".checker[x='" + (activeX + 2) + "'][y='" + (activeY + 2) + "']"))[0] || false) && (activeX + 2 <= 7) && (activeY + 2 <= 7)

				// black
					if ((activeColor == "black" || activeKing) && (opponentNW && vacancyNW)) {
						return true
					}

					if ((activeColor == "black" || activeKing) && (opponentNE && vacancyNE)) {
						return true
					}

				// white
					if ((activeColor == "white" || activeKing) && (opponentSW && vacancySW)) {
						return true
					}

					if ((activeColor == "white" || activeKing) && (opponentSE && vacancySE)) {
						return true
					}

				// otherwise
					return false
			}

		/* getKing */
			function getKing(active) {

				// data
					var activeY = parseInt(active.getAttribute("y"))
					var activeKing = (active.getAttribute("king") == "true" ? true : false)
					var activeColor = active.getAttribute("color")

				// check
					if (activeKing) {
						return false
					}
					else if ((activeColor == "white") && (activeY == 7)) {
						return true
					}
					else if ((activeColor == "black") && (activeY == 0)) {
						return true
					}
			}

		/* getTurn */
			function getTurn(active) {

				// checker
					if (active) {
						active.setAttribute("jumping", "false")
						active.setAttribute("active", "false")
					}

				// game end ?
					var white = Array.from(document.querySelectorAll(".checker[color='white']")) || []
					var black = Array.from(document.querySelectorAll(".checker[color='black']")) || []

					if (white.length && black.length) {
						var turn = game.getAttribute("turn")
						game.setAttribute("turn", (turn == "white" ? "black" : "white"))
					}
					else {
						game.setAttribute("turn", "")
						endGame()
					}

			}

}