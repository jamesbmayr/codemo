/* on load */
	/* triggers */
		if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
			var on = { click: "touchstart", mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" }
		}
		else {
			var on = { click:      "click", mousedown:  "mousedown", mousemove: "mousemove", mouseup:  "mouseup" }
		}

	/* svg */
		var SVG = {
			up: `<svg viewBox="10 10 80 80"><path d="M 80 15 C 80 18 78 20 75 20 C 60 20 40 20 25 20 C 22 20 20 18 20 15 C 20 12 22 10 25 10 C 40 10 60 10 75 10 C 78 10 80 12 80 15 Z M 50 90 C 47 90 45 88 45 85 C 45 70 45 50 45 37 C 42 40 40 42 38 44 C 36 46 33 46 31 44 C 29 42 29 39 31 37 C 35 33 40 28 45 23 C 47 21 48 20 50 20 C 52 20 53 21 55 23 C 60 28 65 33 69 37 C 71 39 71 42 69 44 C 67 46 64 46 62 44 C 60 42 58 40 55 37 C 55 50 55 70 55 85 C 55 88 53 90 50 90 Z"></path></svg>`,
			left: `<svg viewBox="10 10 80 80"><path d="M 15 20 C 18 20 20 22 20 25 C 20 40 20 60 20 75 C 20 78 18 80 15 80 C 12 80 10 78 10 75 C 10 60 10 40 10 25 C 10 22 12 20 15 20 Z M 90 50 C 90 53 88 55 85 55 C 70 55 50 55 37 55 C 40 58 42 60 44 62 C 46 64 46 67 44 69 C 42 71 39 71 37 69 C 33 65 28 60 23 55 C 21 53 20 52 20 50 C 20 48 21 47 23 45 C 28 40 33 35 37 31 C 39 29 42 29 44 31 C 46 33 46 36 44 38 C 42 40 40 42 37 45 C 50 45 70 45 85 45 C 88 45 90 47 90 50 Z"></path></svg>`,
			right: `<svg viewBox="10 10 80 80"><path d="M 85 80 C 82 80 80 78 80 75 C 80 60 80 40 80 25 C 80 22 82 20 85 20 C 88 20 90 22 90 25 C 90 40 90 60 90 75 C 90 78 88 80 85 80 Z M 10 50 C 10 47 12 45 15 45 C 30 45 50 45 63 45 C 60 42 58 40 56 38 C 54 36 54 33 56 31 C 58 29 61 29 63 31 C 67 35 72 40 77 45 C 79 47 80 48 80 50 C 80 52 79 53 77 55 C 72 60 67 65 63 69 C 61 71 58 71 56 69 C 54 67 54 64 56 62 C 58 60 60 58 63 55 C 50 55 30 55 15 55 C 12 55 10 53 10 50 Z"></path></svg>`,
			down: `<svg viewBox="10 10 80 80"><path d="M 20 85 C 20 82 22 80 25 80 C 40 80 60 80 75 80 C 78 80 80 82 80 85 C 80 88 78 90 75 90 C 60 90 40 90 25 90 C 22 90 20 88 20 85 Z M 50 10 C 53 10 55 12 55 15 C 55 30 55 50 55 63 C 58 60 60 58 62 56 C 64 54 67 54 69 56 C 71 58 71 61 69 63 C 65 67 60 72 55 77 C 53 79 52 80 50 80 C 48 80 47 79 45 77 C 40 72 35 67 31 63 C 29 61 29 58 31 56 C 33 54 36 54 38 56 C 40 58 42 60 45 63 C 45 50 45 30 45 15 C 45 12 47 10 50 10 Z"></path></svg>`
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
								pusher.innerHTML = (x ? SVG.left : SVG.right)
							square.appendChild(pusher)
						}

						if ((y == 0) || (y == 3)) {
							var pusher = document.createElement("button")									
								pusher.className = "pusher"
								pusher.setAttribute("x", x)
								pusher.setAttribute("y", y)
								pusher.setAttribute("side", y ? "bottom" : "top")
								pusher.setAttribute("p", (y ? -(x + 5) : (x + 5)))
								pusher.innerHTML = (y ? SVG.up : SVG.down)
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
