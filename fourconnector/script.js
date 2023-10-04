/*** globals ***/
	/* triggers */
		if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
			var on = { click: "touchstart", mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" }
		}
		else {
			var on = { click:      "click", mousedown:  "mousedown", mousemove: "mousemove", mouseup:  "mouseup" }
		}

	/* data */
		var game    = {}
		var canvas  = document.getElementById("board")
		var context = canvas.getContext("2d")
		var play    = document.getElementById("play")

/*** canvas ***/
	/* clearCanvas */
		function clearCanvas() {
			context.clearRect(0, 0, canvas.width, canvas.height)
		}

	/* drawCircle */
		function drawCircle(x, y, radius, options) {
			// parameters
				options = options || {}
				context.beginPath()
				context.fillStyle   = options.gradient ? drawGradient(options) : (options.color || "transparent")
				context.strokeStyle = options.gradient ? drawGradient(options) : (options.color || "transparent")
				context.lineWidth   = options.border || 1
				context.shadowBlur  = options.blur ? options.blur : 0
				context.shadowColor = options.shadow ? options.shadow : "transparent"
				context.globalAlpha = options.opacity || 1

			// draw
				if (options.border) {
					context.arc(x, canvas.height - y, radius, (options.start || 0), (options.end || (2 * Math.PI)))
					context.stroke()
				}
				else {
					context.moveTo(x, canvas.height - y)
					context.arc(x, canvas.height - y, radius, (options.start || 0), (options.end || (2 * Math.PI)), true)
					context.closePath()
					context.fill()
				}
		}

	/* drawTriangle */
		function drawTriangle(x1, y1, x2, y2, x3, y3, options) {
			// parameters
				options = options || {}
				context.beginPath()
				context.fillStyle   = options.gradient ? drawGradient(options) : (options.color || "transparent")
				context.lineWidth   = options.border || 1
				context.shadowBlur  = options.blur ? options.blur : 0
				context.shadowColor = options.shadow ? options.shadow : "transparent"
				context.globalAlpha = options.opacity || 1

			// draw
				context.moveTo(x1, canvas.height - y1)
				context.lineTo(x2, canvas.height - y2)
				context.lineTo(x3, canvas.height - y3)
				context.lineTo(x1, canvas.height - y1)
				context.closePath()
				context.fill()
		}

/*** game ***/
	/* startGame */
		play.addEventListener(on.click, startGame)
		function startGame() {
			// reset data
				game = {
					play: true,
					victory: null,
					turn: 0,
					player: 0,
					selector: 3,
					board: {
						0: [null,null,null,null,null,null],
						1: [null,null,null,null,null,null],
						2: [null,null,null,null,null,null],
						3: [null,null,null,null,null,null],
						4: [null,null,null,null,null,null],
						5: [null,null,null,null,null,null],
						6: [null,null,null,null,null,null]
					}
				}

			// draw board
				play.className = "hidden"
				drawBoard()
		}

	/* drawBoard */
		function drawBoard() {
			// clear
				clearCanvas()

			// grid cell corners
				for (var column = 0; column <= 7; column++) {
					for (var row = 0; row <= 6; row++) {
						var x = ( column   * 140) + 10
						var y = ((row + 1) * 140) + 10
						drawCircle(x, canvas.height - y, 5, {color: "#aaaaaa", blur: 5, shadow: "#333333"})
					}
				}

			// pieces
				for (var column in game.board) {
					for (var row in game.board[column]) {
						var color = (game.board[column][row] === 0) ? "#dd3333" : (game.board[column][row] === 1) ? "#3333dd" : null

						if (color) {
							var x = (column * 140) + 10 + 70
							var y = (row    * 140) + 10 + 70
							drawCircle(x, y, 60, {color: color, blur: 10, shadow: "#333333"})
						}
					}
				}

			// selector
				if (game.selector !== null) {
					var color = game.player === 0 ? "#dd3333" : "#3333dd"
					var x = (game.selector * 140) + 10 + 70
					var y = (6             * 140) + 10 + 70
					drawCircle(x, y, 60, {color: color, blur: 10, shadow: "#333333"})
				}
		}

	/* moveSelector */
		canvas.addEventListener(on.mousemove, moveSelector)
		function moveSelector(event) {
			// play ?
				if (!game.play) {
					return false
				}
				else {
					// coordinates
						var x = event.touches ? event.touches[0].clientX : event.clientX
						var y = event.touches ? event.touches[0].clientY : event.clientY
						var rect = canvas.getBoundingClientRect()

					// inside?
						if (!(rect.x < x && x < rect.x + rect.width) || !(rect.y < y && y < rect.y + rect.height)) {
							return false
						}
						else {
							x = (x - rect.x) * 1000 / rect.width
							game.selector = Math.max(0, Math.min(6, Math.floor((x + 10) / 1000 * 7)))
						}
				}

			// draw board
				drawBoard()
		}

	/* dropPiece */
		canvas.addEventListener(on.click, dropPiece)
		function dropPiece(event) {
			// play ?
				if (!game.play) {
					return false
				}
				else {
					// coordinates
						var x = event.touches ? event.touches[0].clientX : event.clientX
						var y = event.touches ? event.touches[0].clientY : event.clientY
						var rect = canvas.getBoundingClientRect()

					// inside?
						if (!(rect.x < x && x < rect.x + rect.width) || !(rect.y < y && y < rect.y + rect.height)) {
							return false
						}
						else {
							x = (x - rect.x) * 1000 / rect.width
							var column = Math.max(0, Math.min(6, Math.floor((x + 10) / 1000 * 7)))
							
							// available row?
								var row = null
								for (var tryRow = game.board[column].length - 1; tryRow >= 0; tryRow--) {
									if (game.board[column][tryRow] === null) {
										row = tryRow
									}
								}

								if (row === null) {
									return false
								}
								else {
									game.board[column][Math.max(0, Math.min(5, row))] = game.player
									updateTurn()
								}
						}
				}
		}

	/* updateTurn */
		function updateTurn() {
			// victory ?
				game.victory = checkVictory()
				if (game.victory !== null) {
					endGame()
				}

			// switch turns
				else {
					game.turn++
					game.player = game.player ? 0 : 1
				}

			// draw board
				drawBoard()
		}

	/* checkVictory */
		function checkVictory() {
			// columns (bottom-to-top)
				for (var column = 0; column <= 6; column++) {
					for (var row = 0; row <= 2; row++) {
						if ((game.board[column][row    ] === game.player) 
						 && (game.board[column][row + 1] === game.player)
						 && (game.board[column][row + 2] === game.player)
						 && (game.board[column][row + 3] === game.player)) {
							return game.player
						}
					}
				}

			// rows (left-to-right)
				for (var column = 0; column <= 3; column++) {
					for (var row = 0; row <= 5; row++) {
						if ((game.board[column    ][row] === game.player) 
						 && (game.board[column + 1][row] === game.player)
						 && (game.board[column + 2][row] === game.player)
						 && (game.board[column + 3][row] === game.player)) {
							return game.player
						}
					}
				}

			// diagonal (bottom-left-to-top-right)
				for (var column = 0; column <= 3; column++) {
					for (var row = 0; row <= 2; row++) {
						if ((game.board[column    ][row    ] === game.player) 
						 && (game.board[column + 1][row + 1] === game.player)
						 && (game.board[column + 2][row + 2] === game.player)
						 && (game.board[column + 3][row + 3] === game.player)) {
							return game.player
						}
					}
				}

			// diagonal (top-left-to-bottom-right)
				for (var column = 0; column <= 3; column++) {
					for (var row = 3; row <= 5; row++) {
						if ((game.board[column    ][row    ] === game.player) 
						 && (game.board[column + 1][row - 1] === game.player)
						 && (game.board[column + 2][row - 2] === game.player)
						 && (game.board[column + 3][row - 3] === game.player)) {
							return game.player
						}
					}
				}

			// no victory
				return null
		}

	/* endGame */
		function endGame() {
			// end game in data
				game.play = false

			// message
				play.innerHTML = ("Player " + (game.victory + 1) + " wins!<br>Play again?")
				play.className = ""
		}
