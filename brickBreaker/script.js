window.onload = function() {

	/* startGame */
		startGame()
		document.getElementById("new").addEventListener("click", startGame)
		function startGame() {
			window.ballCount = 3

			buildBricks()
			spawnBall()

			var game = document.getElementById("game")
				game.className = ""

			var refresh = document.getElementById("new")
				refresh.className = "hidden"
		}

	/* endGame */
		function endGame() {
			var game = document.getElementById("game")
				game.className = "game-over"

			var refresh = document.getElementById("new")
				refresh.className = ""
		}

	/* winGame */
		function winGame() {
			endBall()

			var game = document.getElementById("game")
				game.className = "game-win"

			var refresh = document.getElementById("new")
				refresh.className = ""
		}

	/* spawnBall */
		document.getElementById("game").addEventListener("click", spawnBall)
		function spawnBall() {
			if (!window.playing) {
				window.playing = true
				
				if (window.ballCount) {
					window.ballCount--
					var game = document.getElementById("game")
					var paddle = document.getElementById("paddle")
						var p = paddle.getBoundingClientRect().left - game.getBoundingClientRect().left - 5 + 100

					var ball = document.getElementById("ball")
						ball.className = ""
						ball.style.left = (p - 10) + "px"
						ball.style.top = 500 + "px"
						ball.setAttribute("angle", [315,225][Math.floor(Math.random() * 2)])

					window.gameLoop = setInterval(moveBall, 33)
				}
			}
		}

	/* endBall */
		function endBall() {
			clearInterval(window.gameLoop)
			window.playing = false
			document.getElementById("ball").className = "hidden"

			if (!window.ballCount) {
				endGame()
			}
		}

	/* buildBricks */
		function buildBricks() {
			var bricks = document.getElementById("bricks")
				bricks.innerHTML = ""
			var colors = ["magenta", "red", "yellow", "green", "cyan", "blue"]
			
			for (var y = 0; y < 6; y++) {
				for (var x = 0; x < 16; x++) {
					var brick = document.createElement("div")
						brick.className = "brick"
						brick.id = "_row_" + y + "_cell_" + x
						brick.style["background-color"] = colors[y]
						brick.style.left = x * 50 + 10 + "px"
						brick.style.top  = y * 50 + 10 + "px"

					bricks.appendChild(brick)
				}
			}
		}

	/* arrowPaddle */
		document.addEventListener("keydown", function (event) { arrowPaddle(event) })
		function arrowPaddle(event) {
			if (event && (event.which == 37 || event.which == 39)) {
				var game = document.getElementById("game")
				var paddle = document.getElementById("paddle")
					var p = paddle.getBoundingClientRect().left - game.getBoundingClientRect().left - 5

				if (event.which == 37) { //left
					if (p - 25 <= 10) {
						paddle.style.left = 10 + "px"
					}
					else {
						paddle.style.left = (p - 25) + "px"
					}
				}
				else if (event.which == 39) { //right
					if (p + 25 >= 810 - 100) {
						paddle.style.left = (810 - 100) + "px"
					}
					else {
						paddle.style.left = (p + 25) + "px"
					}
				}
			}
		}

	/* mousePaddle */
		document.onmousemove = mousePaddle
		function mousePaddle(event) {
			var game = document.getElementById("game")
			var paddle = document.getElementById("paddle")
				var p = paddle.getBoundingClientRect().left - game.getBoundingClientRect().left - 5
			var x = event.clientX - game.getBoundingClientRect().left - 5 - 50

			if (x <= 10) {
				paddle.style.left = 10 + "px"
			}
			else if (x >= 810 - 100) {
				paddle.style.left = (810 - 100) + "px"
			}
			else {
				paddle.style.left = x + "px"
			}
		}


	/* flipAngle */
		function flipAngle(angle, side) {
			switch (side) {
				case "reverse":
					if (angle == 45) {
						angle = 225
					}
					else if (angle == 135) {
						angle = 315
					}
				break
				case "top":
					if (angle == 315) {
						angle = 45
					}
					else if (angle == 225) {
						angle = 135
					}
				break
				case "bottom":
					if (angle == 45) {
						angle = 315
					}
					else if (angle == 135) {
						angle = 225
					}
				break
				case "left":
					if (angle == 135) {
						angle = 45
					}
					else if (angle == 225) {
						angle = 315
					}
				break
				case "right":
					if (angle == 45) {
						angle = 135
					}
					else if (angle == 315) {
						angle = 225
					}
				break
			}

			return angle
		}

	/* getCollision */
		function getCollision(x, y, oldX, oldY) {
			x = Number(x) + 10
			y = Number(y) + 10
			oldX = Number(oldX) + 10
			oldY = Number(oldY) + 10

			var game = document.getElementById("game")
			var paddle = document.getElementById("paddle")
				var p = paddle.getBoundingClientRect().left - game.getBoundingClientRect().left
			var brick = document.getElementById("_row_" + Math.floor((y - 10) / 50) + "_cell_" + Math.floor((x - 10) / 50))

			if ((y >= 535) && (y <= 550) && (x + 10 >= p) && (x - 10 <= p + 100)) {
				if ((oldX > x) && (x + 10 >= p + 80)) { //moving left, hits right corner
					return ["reverse", "paddle"]
				}
				else if ((oldX < x) && (x - 10 <= p + 20)) { //moving right, hits left corner
					return ["reverse", "paddle"]
				}
				else {
					return ["bottom", "paddle"]
				}
			}
			else if (y >= 605) {
				return ["bottom", "pit"]
			}
			else if (y <= 15) {
				return ["top", "border"]
			}
			else if (x <= 15) {
				return ["left", "border"]
			}
			else if (x >= 805) {
				return ["right", "border"]
			}
			else if (brick) {
				var brickX = brick.getBoundingClientRect().left - game.getBoundingClientRect().left - 5 + 23
					var xDiff = brickX - oldX
				var brickY = brick.getBoundingClientRect().top  - game.getBoundingClientRect().top  - 5 + 23
					var yDiff = brickY - oldY

				if (xDiff > 0 && yDiff > 0) {
					if (Math.abs(xDiff) >= Math.abs(yDiff)) {
						var side = "right"
					}
					else {
						var side = "bottom"
					}
				}
				if (xDiff < 0 && yDiff > 0) {
					if (Math.abs(xDiff) >= Math.abs(yDiff)) {
						var side = "left"
					}
					else {
						var side = "bottom"
					}
				}
				if (xDiff > 0 && yDiff < 0) {
					if (Math.abs(xDiff) >= Math.abs(yDiff)) {
						var side = "right"
					}
					else {
						var side = "top"
					}
				}
				if (xDiff < 0 && yDiff < 0) {
					if (Math.abs(xDiff) >= Math.abs(yDiff)) {
						var side = "left"
					}
					else {
						var side = "top"
					}
				}

				return [side, "brick", brick]
			}
			else {
				return false
			}
		}

	/* moveBall */
		function moveBall() {
			var game = document.getElementById("game")
			var ball = document.getElementById("ball")
				var left = ball.getBoundingClientRect().left - game.getBoundingClientRect().left - 5
				var top  = ball.getBoundingClientRect().top  - game.getBoundingClientRect().top  - 5
				var angle = Number(ball.getAttribute("angle")) || 315
			

			var newLeft = (left + (10 * Math.cos((angle) * Math.PI / 180))).toFixed(2)
			var newTop  = (top  + (10 * Math.sin((angle) * Math.PI / 180))).toFixed(2)
			
			var collision = getCollision(newLeft, newTop, left, top)
			if (collision) {
				var side = collision[0]
				var item = collision[1]

				if (item == "pit") {
					endBall()
				}
				else if (item == "paddle" || item == "border") {
					angle = flipAngle(angle, side)
				}
				else if (item == "brick") {
					angle = flipAngle(angle, side)
					collision[2].parentNode.removeChild(collision[2])

					var bricks = document.getElementById("bricks")

					if (!bricks.childElementCount) {
						winGame()
					}
				}
			}

			ball.style.top = newTop + "px"
			ball.style.left = newLeft + "px"
			ball.setAttribute("angle", angle)
		}

}