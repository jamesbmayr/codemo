window.onload = function() {

	/* on load */
		/* triggers */
			if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
				var on = { click: "touchstart", mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" }
			}
			else {
				var on = { click:      "click", mousedown:  "mousedown", mousemove: "mousemove", mouseup:  "mouseup" }
			}

		/* sizing */
			var board = document.getElementById("board")
			var marginX = null
			var marginY = null
			var size = null

		/* resizeScreen */
			window.addEventListener("resize", resizeScreen)
			resizeScreen()
			function resizeScreen(delay) {
				if (!delay) {
					size = (board.getBoundingClientRect().width - 20) / 4
					marginX = Math.floor((window.innerWidth  - size) / 2)
					marginY = Math.floor((window.innerHeight - size) / 2)
				}
				else {
					setTimeout(function () {
						size = (board.getBoundingClientRect().width - 20) / 4
						marginX = Math.floor((window.innerWidth  - size) / 2)
						marginY = Math.floor((window.innerHeight - size) / 2)
					}, 2000)
				}
			}

	/* game */
		/* startGame */
			document.getElementById("play").addEventListener(on.click, startGame)
			function startGame() {
				buildPawns()

				board.setAttribute("pushable", true)
				board.setAttribute("player", "blue")
				board.setAttribute("last", null)

				document.getElementById("end").className = "hidden"
			}

		/* endGame */
			function endGame(victory) {
				board.removeAttribute("pushable")
				board.setAttribute("player", "none")
				board.removeAttribute("last")

				document.getElementById("title").className = victory
				document.getElementById("title").innerText = victory + "!"
				document.getElementById("end").className = ""
			}

	/* build */
		/* buildBoard */
			buildBoard()
			function buildBoard() {
				for (var y = 0; y < 4; y++) {
					for (var x = 0; x < 4; x++) {
						// square
							var square = document.createElement("div")
								square.className = "square"
								square.setAttribute("x", x)
								square.setAttribute("y", y)
								square.style.left = (x * 25) + "%"
								square.style.top  = (y * 25) + "%"

						// color
							if ((x + y) % 2 == 0) {
								square.setAttribute("color", "white")
							}
							else {
								square.setAttribute("color", "black")
							}

						// pushers
							if ((x == 0) || (x == 3)) {
								var pusher = document.createElement("button")
									pusher.className = "pusher"
									pusher.setAttribute("x", x)
									pusher.setAttribute("y", y)
									pusher.setAttribute("side", x ? "right" : "left")
									pusher.setAttribute("p", (x ? -(y + 1) : (y + 1)))
									pusher.innerHTML = (x ? "&#8592;" : "&#8594;")
								square.appendChild(pusher)
							}

							if ((y == 0) || (y == 3)) {
								var pusher = document.createElement("button")									
									pusher.className = "pusher"
									pusher.setAttribute("x", x)
									pusher.setAttribute("y", y)
									pusher.setAttribute("side", y ? "bottom" : "top")
									pusher.setAttribute("p", (y ? -(x + 5) : (x + 5)))
									pusher.innerHTML = (y ? "&#8593;" : "&#8595;")
								square.appendChild(pusher)
							}

						// append
							board.appendChild(square)
					}
				}
			}

		/* buildPawns */
			function buildPawns() {
				// clear existing
					var pawns = Array.from(document.querySelectorAll(".pawn")) || []
						pawns.forEach(function (p) {
							p.parentNode.removeChild(p)
						})

				for (var y = 0; y < 4; y++) {
					for (var x = 0; x < 4; x++) {
						// pawn
							var pawn = document.createElement("div")
								pawn.className = "pawn"
								pawn.setAttribute("x", x)
								pawn.setAttribute("y", y)
								pawn.style.left = (x * 25) + 2.5 + "%"
								pawn.style.top  = (y * 25) + 2.5 + "%"
								pawn.style.opacity = 1

						// color
							if (((x < 2) && (y < 2)) || ((x > 1) && (y > 1))) {
								pawn.setAttribute("color", "red")
							}
							else {
								pawn.setAttribute("color", "blue")
							}

						// append
							board.appendChild(pawn)
					}
				}
			}

	/* play */
		/* pushPawns */
			Array.from(document.querySelectorAll(".pusher")).forEach(function (b) {
				b.addEventListener(on.click, pushPawns)
			})
			function pushPawns(event) {
				if ((event.target.className == "pusher") && (board.getAttribute("pushable")) && (parseInt(event.target.getAttribute("p")) + parseInt(board.getAttribute("last")) !== 0)) {
					// info
						// button
							var side = event.target.getAttribute("side")
							var x = parseInt(event.target.getAttribute("x"))
							var y = parseInt(event.target.getAttribute("y"))

						// pawns in row/column
							var pawns = []
							if (side == "left" || side == "right") {
								pawns = Array.from(document.querySelectorAll(".pawn[y='" + y + "']"))
							}
							else if (side == "bottom" || side == "top") {
								pawns = Array.from(document.querySelectorAll(".pawn[x='" + x + "']"))
							}

							pawns.forEach(function (p) {
								p.x = parseInt(p.getAttribute("x"))
								p.y = parseInt(p.getAttribute("y"))
							})

					// first pawn
						// set up
							var movingPawns = []
							var dx = 0
							var dy = 0

						// push to the right
							if (side == "left") {
								dx = 1
								movingPawns.push( pawns.sort(function (a, b) {
									return a.x - b.x
								})[0] || null )
							}

						// push to the left
							else if (side == "right") {
								dx = -1
								movingPawns.push( pawns.sort(function (a, b) {
									return b.x - a.x
								})[0] || null )
							}

						// push to the bottom
							else if (side == "top") {
								dy = 1
								movingPawns.push( pawns.sort(function (a, b) {
									return a.y - b.y
								})[0] || null )
							}

						// push to the top
							else if (side == "bottom") {
								dy = -1
								movingPawns.push( pawns.sort(function (a, b) {
									return b.y - a.y
								})[0] || null )
							}

					// legal? --> additional pawns --> move pawns
						if (movingPawns[0] && movingPawns[0].getAttribute("color") == board.getAttribute("player")) {
							board.setAttribute("last", parseInt(event.target.getAttribute("p")))

							// second pawn?
								if (movingPawns[0]) {
									movingPawns.push( pawns.find(function (p) {
										return (p.x == movingPawns[0].x + dx) && (p.y == movingPawns[0].y + dy)
									}) || null )
								}

							// third pawn?
								if (movingPawns[1]) {
									movingPawns.push( pawns.find(function (p) {
										return (p.x == movingPawns[1].x + dx) && (p.y == movingPawns[1].y + dy)
									}) || null )
								}

							// fourth pawn?
								if (movingPawns[2]) {
									movingPawns.push( pawns.find(function (p) {
										return (p.x == movingPawns[2].x + dx) && (p.y == movingPawns[2].y + dy)
									}) || null )
								}

							// move pawns
								for (var p = 0; p < movingPawns.length; p++) {
									if (movingPawns[p]) {
										movePawn(movingPawns[p], movingPawns[p].x + dx, movingPawns[p].y + dy)
									}
								}

							// update turn
								var victory = checkVictory()

								if (!victory) {
									player = board.getAttribute("player")
									board.setAttribute("player", (player == "red" ? "blue" : "red"))
								}
								else {
									endGame(victory)
								}
						}
				}
			}

		/* movePawn */
			function movePawn(pawn, fx, fy) {
				board.removeAttribute("pushable")

				// get info
					var x = parseInt(pawn.getAttribute("x"))
					var y = parseInt(pawn.getAttribute("y"))
					var destinationX = (fx * size) + (size / 10)
					var destinationY = (fy * size) + (size / 10)
				
				// set info
					pawn.setAttribute("x", fx)
					pawn.setAttribute("y", fy)
					pawn.style.left = Math.floor(pawn.getBoundingClientRect().left - marginX + size + (size / 2)) + "px"
					pawn.style.top  = Math.floor(pawn.getBoundingClientRect().top - marginY + size + (size / 2)) + "px"

				// removing?
					if (fx < 0 || fy < 0 || fx > 3 || fy > 3) {
						pawn.setAttribute("removing", true)
					}

				var moveLoop = setInterval(function() {
					// get info
						var currentX = pawn.getBoundingClientRect().left - marginX + size + (size / 2)
						var currentY = pawn.getBoundingClientRect().top  - marginY + size + (size / 2)

					if ((Math.abs(currentX - destinationX) > 5) || (Math.abs(currentY - destinationY) > 5)) {
						// set x and y
							if (Math.abs(currentX - destinationX) > 5) {
								pawn.style.left = Number(pawn.style.left.replace("px", "")) + 10 * (fx - x) + "px"
							}
							if (Math.abs(currentY - destinationY) > 5) {
								pawn.style.top  = Number(pawn.style.top.replace("px", ""))  + 10 * (fy - y) + "px"
							}

						// set opacity
							if (pawn.getAttribute("removing")) {
								pawn.style.opacity -= 0.1
							}
					}
					else {
						clearInterval(moveLoop)
						board.setAttribute("pushable", true)

						// set final x and y
							pawn.style.left = (fx * 25) + 2.5 + "%"
							pawn.style.top  = (fy * 25) + 2.5 + "%"

						// remove if necessary
							if (pawn.getAttribute("removing")) {
								pawn.parentNode.removeChild(pawn)
							}
					}
				}, 25)
			}

		/* checkVictory */
			function checkVictory() {
				var red  = Array.from(document.querySelectorAll(".pawn[color='red']:not([removing])"))
				var blue = Array.from(document.querySelectorAll(".pawn[color='blue']:not([removing])"))

				if (!red.length) {
					return "blue"
				}
				else if (!blue.length) {
					return "red"
				}
				else if (red.length == 1 && blue.length == 1) {
					return "tie"
				}
				else {
					return false
				}
			}

}