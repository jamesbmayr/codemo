window.onload = function() {

	/* onload */
		document.getElementById("refresh").addEventListener("click", newGame)

	/* newGame */
		function newGame() {
			//set arrow if none
				window.arrow = false

			//get parameters
				window.gridSize   = Number(Array.prototype.slice.call(document.querySelectorAll("#size"))[0].value)  || 15
				window.snakeSpeed = Number(Array.prototype.slice.call(document.querySelectorAll("#speed"))[0].value) || 250

			//show and hide and clear stuff
				var gameOver = Array.prototype.slice.call(document.querySelectorAll("#game-over"))[0]
					gameOver.className = gameOver.className.replace("shown", "hidden")

				var grid = Array.prototype.slice.call(document.querySelectorAll("#grid"))[0]
					grid.className = ""
					grid.innerHTML = ""

				var factor = Array.prototype.slice.call(document.querySelectorAll("#factor"))[0]
					factor.textContent = ":root { --factor: " + window.gridSize + "}"

			//build grid
				for (var y = 0; y < window.gridSize; y++) {
					var row = document.createElement("div")
						row.className = "row"
						row.id = "_row_" + y

					for (var x = 0; x < window.gridSize; x++) {
						var content = document.createElement("div")
							if      (x == Math.floor(window.gridSize / 2) && y == window.gridSize - 5) {
								content.className = "content-apple"
							}
							else if (x == Math.floor(window.gridSize / 2) && y == window.gridSize - 3) {
								content.className = "content-snake snake-0 direction-up"
							}
							else if (x == Math.floor(window.gridSize / 2) && y == window.gridSize - 2) {
								content.className = "content-snake snake-1"
							}
							else if (x == Math.floor(window.gridSize / 2) && y == window.gridSize - 1) {
								content.className = "content-snake snake-2"
							}
							else {
								content.className = "content-empty"
							}

						var cell = document.createElement("div")
							cell.className = "cell"
							cell.id = "_row_" + y + "_cell_" + x
							cell.appendChild(content)
						
						row.appendChild(cell)
					}

					grid.appendChild(row)
				}

			//set snakeLoop
				window.snakeLoop = setInterval(moveSnake, window.snakeSpeed)
		}

	/* spawnApple */
		function spawnApple() {
			do {
				var x = Math.floor(Math.random() * window.gridSize)
				var y = Math.floor(Math.random() * window.gridSize)
			}
			while (isCollision(x, y))

			var parent = Array.prototype.slice.call(document.querySelectorAll("#_row_" + y + "_cell_" + x))[0]
			var apple = parent.firstChild
				apple.className = "content-apple"
		}

	/* isCollision */
		function isCollision(x, y) {
			if (x < 0) {
				return true
			}
			else if (x > window.gridSize - 1) {
				return true
			}
			else if (y < 0) {
				return true
			}
			else if (y > window.gridSize - 1) {
				return true
			}
			else if (Array.prototype.slice.call(document.querySelectorAll("#_row_" + y + "_cell_" + x))[0].firstChild.className.indexOf("content-snake") !== -1) {
				return true
			}
			else {
				return false
			}
		}

	/* isApple */
		function isApple(x, y) {
			var apple = Array.prototype.slice.call(document.querySelectorAll(".content-apple"))[0]
			var applePosition = apple.parentNode.id.split("_")
				var ax = Number( applePosition[4] )
				var ay = Number( applePosition[2] )

			if (x == ax && y == ay) {
				return true
			}
			else {
				return false
			}
		}

	/* changeDirection */
		function changeDirection(current) {
			if (window.arrow) {
				var key = window.arrow
			}
			else if (current) {
				var key = current
			}
			else {
				var current = "up"
				var key = "up"
			}

			var map = {
				up: {
					up: "up",
					right: "right",
					down: "up",
					left: "left"
				},
				right: {
					up: "up",
					right: "right",
					down: "down",
					left: "right"
				},
				down: {
					up: "down",
					right: "right",
					down: "down",
					left: "left"
				},
				left: {
					up: "up",
					right: "left",
					down: "down",
					left: "left"
				}
			}

			return map[current][key]
		}

	/* moveSnake */
		function moveSnake() {
			//get direction
				var head = Array.prototype.slice.call(document.querySelectorAll(".snake-0"))[0]
				var direction = head.className.replace("content-snake", "").replace("snake-0", "").replace("direction-", "").trim()
					direction = changeDirection(direction)

			//get new position
				var position = head.parentNode.id.split("_")
					var x = Number( position[4] )
					var y = Number( position[2] )

				if      (direction == "up"   ) { y -= 1 }
				else if (direction == "right") { x += 1 }
				else if (direction == "down" ) { y += 1 }
				else if (direction == "left" ) { x -= 1 }

			//detect collision
				if (isCollision(x, y)) {
					clearInterval(window.snakeLoop)
					var gameOver = Array.prototype.slice.call(document.querySelectorAll("#game-over"))[0]
						gameOver.className = gameOver.className.replace("hidden", "shown")

					var collision = Array.prototype.slice.call(document.querySelectorAll("#_row_" + y + "_cell_" + x))[0]
					if (collision && collision !== null) {
						collision.firstChild.className = "content-collision"
					}
					else {
						var grid = Array.prototype.slice.call(document.querySelectorAll("#grid"))[0]
							grid.className = "grid-collision"
					}
				}

			//otherwise
				else {
					//increment segments
						var segments = Array.prototype.slice.call(document.querySelectorAll(".content-snake"))
						var lastN = 0

						for (var s = 0; s < segments.length; s++) {
							var n = Number( segments[s].className.replace("content-snake", "").replace("direction-up", "").replace("direction-right", "").replace("direction-down", "").replace("direction-left", "").replace("snake-", "").trim() )
							segments[s].className = "content-snake snake-" + (n + 1)

							if (n > lastN) { lastN = n }
						}

					//remove lastSegment
						if (!isApple(x, y)) {
							var lastSegment = Array.prototype.slice.call(document.querySelectorAll(".snake-" + (lastN + 1)))[0]
								lastSegment.className = "content-empty"
						}
						else {
							//defer to avoid colliding with firstSegment
							setTimeout(function() { spawnApple() }, 0)
						}

					//new firstSegment
						if (!collision) {
							var firstSegment = Array.prototype.slice.call(document.querySelectorAll("#_row_" + y + "_cell_" + x))[0]
								firstSegment = firstSegment.firstChild
								firstSegment.className = "content-snake snake-0 direction-" + direction
						}
				}
		}

	/* arrowPress */
		document.addEventListener("keydown", arrowPress)
		function arrowPress(event) {
			var key = event.which

			if (key == 38) {
				window.arrow = "up"
			}
			else if (key == 39) {
				window.arrow = "right"
			}
			else if (key == 40) {
				window.arrow = "down"
			}
			else if (key == 37) {
				window.arrow = "left"
			}
		}

}
