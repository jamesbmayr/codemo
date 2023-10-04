/*** onload ***/
	/* globals */
		var modify = null
		var hold   = null

	/* triggers */
		if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
			var on = { click: "touchstart", mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" }
		}
		else {
			var on = { click:      "click", mousedown:  "mousedown", mousemove: "mousemove", mouseup:  "mouseup" }
		}

/*** game ***/
	/* startGame */
		document.getElementById("menu-start").addEventListener(on.click, startGame)
		function startGame() {
			// get parameters
				var size = Number(document.getElementById("menu-size").value) || 10
				var mode = Number(document.getElementById("menu-mode").value) || 2

			// buildGrid
				var field = document.getElementById("field")
					field.innerHTML = ""
				buildGrid(field, size, mode)

			// hide menu / gameover
				document.getElementById("menu").className = "hidden"
				document.getElementById("field").className = "gameplay"
		}

	/* endGame */
		function endGame(victory) {
			// get parameters
				var size = Number(document.getElementById("menu-size").value) || 10

			// reveal mines
				for (var y = 0; y < size; y++) {
					for (var x = 0; x < size; x++) {
						var cell = document.getElementById("_" + x + "_" + y)
							cell.setAttribute("state", ".")
					}
				}

			// show menu / gameover
				document.getElementById("menu").className = ""

				if (victory) {
					document.getElementById("field").className = "gamewin"
				}
				else {
					document.getElementById("field").className = "gameover"
				}
		}

/*** grid ***/
	/* buildGrid */
		function buildGrid(field, size, mode) {
			// get mines
				var mines = generateMines(size, mode)

			for (var y = 0; y < size; y++) {
				for (var x = 0; x < size; x++) {
					// create cell
						var cell = document.createElement("div")
							cell.className = "cell"
							cell.id = "_" + x + "_" + y
							cell.setAttribute("state", "?")
							cell.addEventListener(on.mousedown, selectCell)
							cell.addEventListener(on.mouseup, unselectCell)
							cell.style.width  = (100 / size) + "%"
							cell.style.height = (100 / size) + "%"

					// set mines
						if (mines.includes(cell.id)) {
							cell.setAttribute("value", "mine")
						}

					// set values
						else {
							var value = 0

							for (var deltaY = -1; deltaY <= 1; deltaY++) {
								for (var deltaX = -1; deltaX <= 1; deltaX++) {
									if (mines.includes("_" + (x + deltaX) + "_" + (y + deltaY))) {
										value++
									}
								}
							}

							cell.setAttribute("value", value)
						}

					// append cell
						field.appendChild(cell)
				}
			}
		}

	/* generateMines */
		function generateMines(size, mode) {
			// empty mines array
			var mines = []

			// random coordinates
				while (mines.length < (size * mode)) {
					var mine = "_" + Math.floor(Math.random() * size) + "_" + Math.floor(Math.random() * size)

					if (!mines.includes(mine)) {
						mines.push(mine)
					}
				}

			// return data
				return mines
		}

/*** interaction ***/
	/* startModify */
		document.addEventListener("keydown", function(event) {
			if (event.which == 18 || event.which == 91 || event.which == 16) {
				modify = event.which
			}
		})

	/* endModify */
		document.addEventListener("keyup", function(event) {
			if (event.which == modify) {
				modify = null
			}
		})

	/* selectCell */
		function selectCell(event) {
			if (event.target.className == "cell") {
				var cell = event.target

				if (on.click == "click") {
					if (modify == 16) {
						revealNeighbors(cell)
					}
					else if (modify) {
						flagCell(cell)
					}
					else {
						revealCell(cell)
					}
				}
				else {
					event.preventDefault()
					hold = new Date().getTime()

					// no hold ? reveal
						setTimeout(function() {
							if (!hold) {
								revealCell(cell)
							}
						}, 200)

					// short hold ? flag
						setTimeout(function() {
							if (hold && cell.getAttribute("state") == "?" || cell.getAttribute("state") == "!") {
								hold = null
								flagCell(cell)
							}
						}, 500)

					// long hold ? neighbors
						setTimeout(function() {
							if (hold && cell.getAttribute("state") == ".") {
								hold = null
								revealNeighbors(cell)
							}
						}, 1000)
				}
			}
		}

	/* unselectCell */
		function unselectCell(event) {
			if (hold) {
				hold = null
			}
		}

/*** gameplay ***/
	/* flagCell */
		function flagCell(cell) {
			// get data
				var state = cell.getAttribute("state")
			
			// set state
				if (state == "?") {
					cell.setAttribute("state", "!")
				}
				else if (state == "!") {
					cell.setAttribute("state", "?")
				}
		}

	/* revealCell */
		function revealCell(cell) {
			// get data
				var state = cell.getAttribute("state")
				var value = cell.getAttribute("value")

			// game over
				if (state == "?" && value == "mine") {
					endGame(false)
				}

			// 0
				else if (state == "?" && value == "0") {
					cell.setAttribute("state", ".")

					revealNeighbors(cell)

					if (checkVictory()) {
						endGame(true)
					}
				}
			
			// others
				else if (state == "?") {
					cell.setAttribute("state", ".")

					if (checkVictory()) {
						endGame(true)
					}
				}
		}

	/* revealNeighbors */
		function revealNeighbors(cell) {
			// get data
				var state = cell.getAttribute("state")

			// reveal neighbors
				if (state == ".") {
					var x = Number(cell.id.split("_")[1])
					var y = Number(cell.id.split("_")[2])

					for (var deltaY = -1; deltaY <= 1; deltaY++) {
						for (var deltaX = -1; deltaX <= 1; deltaX++) {
							if (deltaY || deltaX) {
								var neighbor = document.getElementById("_" + (x + deltaX) + "_" + (y + deltaY))
								if (neighbor && neighbor.getAttribute("state") == "?") {
									revealCell(neighbor)
								}
							}
						}
					}
				}
		}


	/* checkVictory */
		function checkVictory() {
			var unknown   = Array.from(document.querySelectorAll(".cell[state='?']:not([value='mine']"))
			if (!unknown.length) {
				return true
			}
			else {
				return false
			}
		}
