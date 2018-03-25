window.onload = function() {

	/* onload */
		var size = 0
		var board = document.getElementById("board")
		var playing = false
		var grabbing = null

	/*** menu ***/
		/* startGame */
			document.getElementById("start").addEventListener("click", startGame)
			function startGame() {
				// hide menu & clean board
					document.getElementById("menu").className = "hidden"
					board.innerHTML = ""

				// get empty			
					size = Number(document.getElementById("size").value) || 5
					size = Math.max(4, Math.min(12, size))
					var emptyX = Math.floor(Math.random() * size)
					var emptyY = Math.floor(Math.random() * size)

				// build grid
					var fraction = 100 / size
					for (var y = 0; y < size; y++) {
						for (var x = 0; x < size; x++) {
							// build peg
								var cell = document.createElement("div")
									cell.className = "cell"
									cell.style.height = fraction + "%"
									cell.style.width  = fraction + "%"
									cell.style.top    = fraction * y + "%"
									cell.style.left   = fraction * x + "%"
									cell.setAttribute("y", y)
									cell.setAttribute("x", x)
								board.append(cell)

							// build peg
								if (x !== emptyX || y !== emptyY) {
									var peg = document.createElement("div")
										peg.className = "peg"
										peg.style.height = 50 + "%"
										peg.style.width  = 50 + "%"
										peg.style.top    = 50 + "%"
										peg.style.left   = 50 + "%"
										peg.setAttribute("y", y)
										peg.setAttribute("x", x)
										peg.addEventListener("mousedown", selectPeg)
									cell.append(peg)
								}
						}
					}

				// start game
					playing = true
					grabbing = null
			}

	/*** interaction ***/
		/* selectPeg */
			function selectPeg(event) {
				if (playing && !grabbing && event.target.className == "peg") {
					// data
						grabbing = event.target
						
					// resize
						grabbing.style.height = 100 / size / 2 + "%"
						grabbing.style.width  = 100 / size / 2 + "%"
						grabbing.setAttribute("grabbing", true)

					// move
						board.append(grabbing)
						movePeg(event)
				}
			}

		/* movePeg */
			document.addEventListener("mousemove", movePeg)
			function movePeg(event) {
				if (playing && grabbing) {
					// data
						var leftEdge = (window.innerWidth  - 500) / 2
						var topEdge  = (window.innerHeight - 500) / 2

						var x = event.clientX
						var y = event.clientY

					// move
						grabbing.style.left = x - leftEdge + "px"
						grabbing.style.top  = y - topEdge + "px"
				}
			}

		/* unselectPeg */
			document.addEventListener("mouseup", unselectPeg)
			function unselectPeg(event) {
				if (playing && grabbing) {
					// data
						var leftEdge = (window.innerWidth  - 500) / 2
						var topEdge  = (window.innerHeight - 500) / 2

						var x = event.clientX
						var y = event.clientY

					// get target
						var cellX = Math.floor((x - leftEdge) / (500 / size))
						var cellY = Math.floor((y - topEdge)  / (500 / size))

						var legal = isLegal(grabbing, cellX, cellY)

					// same spot
						if (legal === true) {
							placePeg(cellX, cellY)
						}

					// jump
						else if (legal) {
							placePeg(cellX, cellY)
							removePeg(legal[0], legal[1])
						}
					
					// end?
						if (legal) {
							var moves = findMoves()
							console.log(moves)
							if (!Object.keys(moves).length) {
								document.getElementById("menu").className = ""
							}
						}
				}
			}

	/*** gameplay ***/
		/* isLegal */
			function isLegal(peg, cellX, cellY) {
				console.log(peg)
				// data
					var pegX  = Number(peg.getAttribute("x"))
					var pegY  = Number(peg.getAttribute("y"))
					var cell  = Array.from(document.querySelectorAll(".cell[x='" + cellX + "'][y='" + cellY + "']"))[0] || {}

				// out of bounds?
					if (cellX < 0 || cellY < 0 || cellX >= size || cellY >= size) {
						console.log("out of bounds")
						return false
					}

				// occupied?
					else if (cell && cell.firstChild) {
						console.log("occupied")
						return false
					}

				// put back
					else if (pegX == cellX && pegY == cellY) {
						console.log("put back")
						return true
					}

				// up
					else if ((cellX == pegX) && (cellY == pegY - 2) &&
						Array.from(document.querySelectorAll(".cell[x='" + pegX + "'][y='" + (pegY - 1) + "']"))[0].firstChild) {
						return [pegX, pegY - 1]
					}

				// down
					else if ((cellX == pegX) && (cellY == pegY + 2) &&
						Array.from(document.querySelectorAll(".cell[x='" + pegX + "'][y='" + (pegY + 1) + "']"))[0].firstChild) {
						return [pegX, pegY + 1]
					}

				// left
					else if ((cellX == pegX - 2) && (cellY == pegY) &&
						Array.from(document.querySelectorAll(".cell[x='" + (pegX - 1) + "'][y='" + pegY + "']"))[0].firstChild) {
						return [pegX - 1, pegY]
					}

				// right
					else if ((cellX == pegX + 2) && (cellY == pegY) &&
						Array.from(document.querySelectorAll(".cell[x='" + (pegX + 1) + "'][y='" + pegY + "']"))[0].firstChild) {
						return [pegX + 1, pegY]
					}

				// others
					else {
						console.log("gap")
						return false
					}
				
			}

		/* placePeg */
			function placePeg(x, y) {
				// cell?
					var cell = Array.from(document.querySelectorAll(".cell[x='" + x + "'][y='" + y + "']"))[0]
					
					if (cell) {							
						// move
							cell.append(grabbing)
							grabbing.style.top    = 50 + "%"
							grabbing.style.left   = 50 + "%"
							grabbing.style.height = 50 + "%"
							grabbing.style.width  = 50 + "%"
							
						// data
							grabbing.removeAttribute("grabbing")
							grabbing.setAttribute("x", x)
							grabbing.setAttribute("y", y)
							grabbing = null
					}
			}

		/* removePeg */
			function removePeg(x, y) {
				// cell?
					var cell = Array.from(document.querySelectorAll(".cell[x='" + x + "'][y='" + y + "']"))[0]
					
					if (cell && cell.firstChild) {
						// remove
							cell.firstChild.remove()
					}
			}

		/* findMoves */
			function findMoves() {
				// moves object
					var moves = {}

				// loop through each peg
					var pegs = Array.from(document.querySelectorAll(".peg"))
					for (var p in pegs) {
						// data
							var possibilities = []
							var peg = pegs[p]
							var pegX = Number(peg.getAttribute("x"))
							var pegY = Number(peg.getAttribute("y"))
						
						// up
							if (isLegal(peg, pegX, pegY - 2)) {
								possibilities.push([pegX, pegY - 2])
							}

						// down
							if (isLegal(peg, pegX, pegY + 2)) {
								possibilities.push([pegX, pegY + 2])
							}

						// left
							if (isLegal(peg, pegX - 2, pegY)) {
								possibilities.push([pegX - 2, pegY])
							}

						// right
							if (isLegal(peg, pegX + 2, pegY)) {
								possibilities.push([pegX + 2, pegY])
							}

						// add to moves
							console.log(possibilities)
							if (possibilities.length) {
								moves[pegX + "_" + pegY] = possibilities
							}
					}

				// output
					return moves || {}
			}

}