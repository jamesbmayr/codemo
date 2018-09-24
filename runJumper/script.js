window.onload = function() {
	/*** globals ***/
		/* triggers */
			if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
				var on = { click: "touchstart", mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" }
			}
			else {
				var on = { click:      "click", mousedown:  "mousedown", mousemove: "mousemove", mouseup:  "mouseup" }
			}

			window.addEventListener("contextmenu", function(event) {
				event.preventDefault()
				return false
			})

		/* html */
			var canvas  = document.getElementById("canvas")
			var context = canvas.getContext("2d")
			var left    = document.getElementById("left")
			var right   = document.getElementById("right")
			var jump    = document.getElementById("jump")
			var reset   = document.getElementById("reset")

		/* game */
			var game = {}
			var loop = null

	/*** controls ***/
		/* downKey */
			window.addEventListener("keydown", downKey)
			function downKey(event) {
				if (game.playing) {
					switch (event.which) {
						case 37: // left arrow
							triggerMove("left",  true)
						break
						case 39: // right arrow
							triggerMove("right", true)
						break
						case 32: // space
							triggerMove("jump",  true)
						break
					}
				}
			}

		/* upKey */
			window.addEventListener("keyup", upKey)
			function upKey(event) {
				if (game.playing) {
					switch (event.which) {
						case 37: // left arrow
							triggerMove("left",  false)
						break
						case 39: // right arrow
							triggerMove("right", false)
						break
						case 32: // space
							triggerMove("jump",  false)
						break
					}
				}
			}

		/* downButton */
			left.addEventListener( on.mousedown, downButton)
			right.addEventListener(on.mousedown, downButton)
			jump.addEventListener( on.mousedown, downButton)
			function downButton(event) {
				if (game.playing) {
					switch (event.target.id) {
						case "left": // left arrow
							triggerMove("left",  true)
						break
						case "right": // right arrow
							triggerMove("right", true)
						break
						case "jump": // space
							triggerMove("jump",  true)
						break
					}
				}
			}

		/* upButton */
			left.addEventListener( on.mouseup, upButton)
			right.addEventListener(on.mouseup, upButton)
			jump.addEventListener( on.mouseup, upButton)
			function upButton(event) {
				if (game.playing) {
					switch (event.target.id) {
						case "left": // left arrow
							triggerMove("left",  false)
						break
						case "right": // right arrow
							triggerMove("right", false)
						break
						case "jump": // space
							triggerMove("jump",  false)
						break
					}
				}
			}

	/*** game loop ***/
		/* resetGame */
			resetGame()
			reset.addEventListener(on.click, resetGame)
			function resetGame() {
				if (!game.playing) {
					// game object
						game = {
							playing: true,
							player: {
								controls: {
									left:  false,
									right: false,
									jump:  false,
									reset: false
								},
								current: {
									x: 320,
									y: 80,
									vx: 0,
									vy: 0
								},
								energy: 255,
								orbs: 0,
								farthest: 0
							},
							map:  [],
							orbs: [],
							cooldowns: {
								orbs: 16
							}
						}

					// reset button
						reset.removeAttribute("gameover")
						reset.blur()

					// loop
						clearInterval(loop)
						loop = setInterval(playLoop, 32)
				}
			}

		/* playLoop */
			function playLoop() {
				// logic
					setPosition()
					setEnergy()
					buildMap()

				// draw
					clearCanvas()
					setBackground()
					drawScore()
					drawMap()
					drawPlayer()
			}

		/* endGame */
			function endGame() {
				// stop loop
					clearInterval(loop)
					game.playing = false

				// change background
					var countdown = 64
					loop = setInterval(function() {
						if (!countdown) {
							clearInterval(loop)
							reset.setAttribute("gameover", true)
						}
						else {
							countdown--
							canvas.style.background = "rgb(" + (countdown * 4) + "," + (countdown * 4) + "," + (countdown * 4) + ")"
						}
					}, 32)
					
			}

	/*** movement ***/
		/* triggerMove */
			function triggerMove(direction, pressed) {
				game.player.controls[direction] = pressed

				if (direction == "jump" && !pressed) {
					game.player.controls.reset = true
				}
			}

		/* setPosition */
			function setPosition() {
				// variables
					var player = game.player
					var map    = game.map
					var orbs   = game.orbs

				// adjust vx
					if (player.controls.left && player.controls.right) {
						player.energy = Math.max(0, Math.min(255, player.energy - 1))
						player.current.vx = Math.max(-12, Math.min(12, player.current.vx))
					}
					else if (player.controls.left) {
						player.energy = Math.max(0, Math.min(255, player.energy - 1))
						player.current.vx = Math.max(-12, player.current.vx - 1)
					}
					else if (player.controls.right) {
						player.energy = Math.max(0, Math.min(255, player.energy - 1))
						player.current.vx = Math.min( 12, player.current.vx + 1)
					}
					else {
						player.current.vx = (Math.abs(player.current.vx) - 1) * Math.sign(player.current.vx)
					}

				// adjust vy
					if (player.controls.jump && !player.controls.reset) {
						player.energy = Math.max(0, Math.min(255, player.energy - 4))
						player.current.vy = Math.max(-16, Math.min(16, player.current.vy + 8))

						if (player.current.vy > 8) {
							player.controls.reset = true
						}
					}
					else {
						player.current.vy = Math.max(-24, Math.min(24, player.current.vy - 2))
						player.controls.reset = true
					}

				// adjust x & y
					var currentCells = getCells(player.current.x, player.current.y)
						player.current.x = Math.max(0, player.current.x + player.current.vx)
						player.current.y = Math.min(512, Math.max(-64, player.current.y + player.current.vy))
					var futureCells = getCells(player.current.x, player.current.y)
					
				// changing rows
					if (currentCells.bottom !== futureCells.bottom && player.current.vy <= 0) {
						// collision down
							if ((map[futureCells.left ][0] && map[futureCells.left ][0].top && futureCells.bottom <= map[futureCells.left ][0].top) 
							 || (map[futureCells.right][0] && map[futureCells.right][0].top && futureCells.bottom <= map[futureCells.right][0].top)) {
								futureCells.bottom++
								futureCells.top++
								var collisionDown = true
							}
					}

				// changing columns
					if (currentCells.left !== futureCells.left) {
						// collision left
							if ((map[futureCells.left][0] && futureCells.top    >= map[futureCells.left][0].bottom && futureCells.top    <= map[futureCells.left][0].top) 
							 || (map[futureCells.left][0] && futureCells.bottom >= map[futureCells.left][0].bottom && futureCells.bottom <= map[futureCells.left][0].top)) {
								futureCells.left++
								futureCells.right++
								player.current.vx = Math.max(0, player.current.vx)
								player.current.x  = futureCells.left * 32 + 8
							}

						// collision right
							else if ((map[futureCells.right][0] && futureCells.top    >= map[futureCells.right][0].bottom && futureCells.top    <= map[futureCells.right][0].top) 
							      || (map[futureCells.right][0] && futureCells.bottom >= map[futureCells.right][0].bottom && futureCells.bottom <= map[futureCells.right][0].top)) {
								futureCells.left--
								futureCells.right--
								player.current.vx = Math.min(0, player.current.vx)
								player.current.x  = futureCells.right * 32 - 8
							}
					}

				// check collisionDown again (to avoid hitting the "surface" inside a wall)
					if (collisionDown) {
						if ((map[futureCells.left ][0] && map[futureCells.left ][0].top && futureCells.bottom - 1 <= map[futureCells.left ][0].top) 
						 || (map[futureCells.right][0] && map[futureCells.right][0].top && futureCells.bottom - 1 <= map[futureCells.right][0].top)) {
							player.current.vy = 0
							player.current.y  = futureCells.bottom * 32
							player.controls.reset  = false
						}
					}

				// dead ?
					if (player.current.y <= -64) {
						endGame()
					}
			}

		/* setEnergy */
			function setEnergy() {
				// variables
					var player  = game.player
					var orbs    = game.orbs
					var current = getCells(player.current.x, player.current.y)

				// collect orb
					var matchingOrb = orbs.find(function(orb) {
						return ((orb.column == current.left   || orb.column == current.right)
							&&  (orb.row    == current.middle || orb.row    == current.bottom || orb.row == current.top))
					})

					if (matchingOrb) {
						var orbX  = (matchingOrb.column * 32) + 16
						var orbY  = (matchingOrb.row    * 32) + 16
						var headX = player.current.x + 16
						var headY = player.current.y + 32 + 16
						var bodyX = player.current.x + 16
						var bodyY = player.current.y + 16

						if (getDistance(orbX, orbY, headX, headY) < 24 || getDistance(orbX, orbY, bodyX, bodyY) < 24) {
							player.orbs++
							player.energy = Math.max(0, Math.min(255, player.energy + matchingOrb.energy))
							
							game.orbs = orbs.filter(function(orb) {
								return !((orb.column == matchingOrb.column) && (orb.row == matchingOrb.row))
							})
						}
					}

				// deplete energy
					else {
						player.energy = Math.max(0, Math.min(255, player.energy - 1))
					}

				// dead ?
					if (player.energy <= 0) {
						endGame()
					}
			}

	/*** map ***/
		/* buildMap */
			function buildMap() {
				// variables
					var player = game.player
					var map    = game.map

				// position
					var currentCells = getCells(player.current.x, player.current.y)
					while (currentCells.right >= player.farthest - 16) {
						player.farthest++
						buildColumn()
					}
			}

		/* buildColumn */
			function buildColumn() {
				// variables
					var map    = game.map
					var orbs   = game.orbs
					var column = null

				// start
					if (map.length < 8) { // start with 8 columns of solid wall
						column = [{bottom: 0, top: 15}]
					}
					else if (map.length < 32) { // then 16 columns of solid plains
						column = [{bottom: 0, top: 1}]
					}

				// continue
					else {
						var random = Math.floor(Math.random() * 16)

						if (random < 8) { // 50% chance of continuation
							column = duplicateArray(map[map.length - 1])
							if (!column[0] && !map[map.length - 2][0] && !map[map.length - 3][0] && !map[map.length - 4][0]) { // cap pits at 4
								column = [{bottom: 0, top: 1}]
							}
						}
						else if (random < 10) { // 12.5% chance of pit
							column = []
						}
						else if (random < 12) { // 12.5% chance of plains
							column = [{bottom: 0, top: 1}]
						}
						else if (random < 13) { // 6.25% chance of 2 down (or low)
							column = duplicateArray(map[map.length - 1])
							if (column[0]) {
								column[0].top -= 2
							}
							else {
								column = [{bottom: 0, top: 1}]
							}
						}
						else if (random < 14) { // 6.25% chance of 1 down (or low)
							column = duplicateArray(map[map.length - 1])
							if (column[0]) {
								column[0].top -= 1
							}
							else {
								column = [{bottom: 0, top: 1}]
							}
						}
						else if (random < 15) { // 6.25% chance of 1 up (or low)
							column = duplicateArray(map[map.length - 1])
							if (column[0]) {
								column[0].top += 1
							}
							else {
								column = [{bottom: 0, top: 1}]
							}
						}
						else if (random < 16) { // 6.25% chance of 2 up (or low)
							column = duplicateArray(map[map.length - 1])
							if (column[0]) {
								column[0].top += 2
							}
							else {
								column = [{bottom: 0, top: 1}]
							}
						}						
					}

				// ensure boundaries
					if (column[0]) {
						column[0].bottom = Math.max(0, Math.min(14, column[0].bottom))
						column[0].top    = Math.max(1, Math.min(15, column[0].top))
					}

				// add column
					map.push(column)

				// add orb
					if (!game.cooldowns.orbs && (!column[0] || column[0].top - column[0].bottom < 15)) {
						game.cooldowns.orbs = 4 + Math.floor(Math.random() * 8)

						orbs.push({
							column: (map.length - 1),
							row:    Math.min(15, (column[0] ? column[0].top + 2 : 3) + Math.floor(Math.random() * 3)),
							energy: game.cooldowns.orbs * 16
						})
					}
					else {
						game.cooldowns.orbs = Math.max(0, game.cooldowns.orbs - 1)
					}
			}

	/*** draw ***/
		/* setBackground */
			function setBackground() {
				var column = getCells(game.player.current.x, game.player.current.y).left
				var red  = (column % 256) <= 128 ? (column % 256)       : 256 - (column % 256)
				var blue = (column % 256) >= 128 ? (column % 256) - 128 : 128 - (column % 256)
				canvas.style.background = "rgb(" + red + "," + (blue / 2 + red / 4) + "," + blue + ")"
			}

		/* drawMap */
			function drawMap() {
				// variables
					var player = game.player
					var map    = game.map
					var orbs   = game.orbs
					var offset = (player.current.x) % 32
					var startX =  player.current.x - 128
					var endX   =  player.current.x + 384

				// columns
					for (var x = startX; x <= endX; x += 32) {
						var column = game.map[Math.floor(x / 32)]

						// terrain
							if (column[0]) {
								for (var y = 0; y < 16; y++) {
									if (y >= column[0].bottom && y <= column[0].top) {
										if (y == column[0].top) {
											var tl = (!game.map[Math.floor(x / 32) - 1][0] || game.map[Math.floor(x / 32) - 1][0].top < y) ? 8 : 0
											var tr = (!game.map[Math.floor(x / 32) + 1][0] || game.map[Math.floor(x / 32) + 1][0].top < y) ? 8 : 0
											
											if (tl || tr) {
												drawRoundedSquare(x - offset - startX, 512 - (y * 32), 32, "#222222", "#222222", {tl: tl, tr: tr, bl: 0, br: 0})
											}
											else {
												drawSquare(x - offset - startX, 512 - (y * 32), 32, "#222222", "#222222")
											}
										}
										else {
											drawSquare(x - offset - startX, 512 - (y * 32), 32, "#222222", "#222222")
										}
									}
								}
							}

						// orbs
							var matchingOrb = orbs.find(function(orb) {
								return (orb.column == Math.floor(x / 32))
							})

							if (matchingOrb) {
								drawCircle(x - offset - startX + 8, 512 - (matchingOrb.row * 32) - 8, 8, "rgb(000, " + (matchingOrb.energy * 2) + ", " + (matchingOrb.energy / 2) + ")", "rgb(000, " + (matchingOrb.energy * 2) + ", " + (matchingOrb.energy / 2) + ")")
							}
					}
			}

		/* drawPlayer */
			function drawPlayer() {
				// variables
					var player  = game.player
					var color   = player.energy ? ("rgb(128, " + player.energy + ", 000)") : "rgb(255,255,255)"
					var xOffset = player.controls.left  ? -2 : player.controls.right ?  2 : 0
					var yOffset = player.current.vy > 0 ?  2 : player.current.vy < 0 ? -2 : 0

				// draw
					drawCircle(       128,                512 - (player.current.y + 32                           ), 16, color,     "#222222")                               // head
					drawCircle(       128 +  4 + xOffset, 512 - (player.current.y + 32 + 12            + yOffset ),  4, "#222222",      null)                               // left eye
					drawCircle(       128 + 20 + xOffset, 512 - (player.current.y + 32 + 12            + yOffset ),  4, "#222222",      null)                               // right eye
					drawRoundedSquare(128,                512 - (player.current.y                                ), 32, color,     "#222222", {tl: 8, tr: 8, br: 4, bl: 4}) // body
					drawRoundedSquare(128 + -2 + xOffset, 512 - (player.current.y + 12 +  6 * Math.max(0,yOffset)), 10, "#222222", "#222222", {tl: 8, tr: 8, br: 2, bl: 2}) // left hand
					drawRoundedSquare(128 + 26 + xOffset, 512 - (player.current.y + 12 +  6 * Math.max(0,yOffset)), 10, "#222222", "#222222", {tl: 8, tr: 8, br: 2, bl: 2}) // right hand
			}

		/* drawScore */
			function drawScore() {
				// variables
					var score = game.player.orbs

				// draw
					context.font = "64px monospace"
					context.fillStyle = "#ffffff"
					context.textAlign = "right"
					context.fillText(game.player.orbs, 496, 64)

			}

	/*** helpers ***/
		/* duplicateArray */
			function duplicateArray(arr) {
				return JSON.parse(JSON.stringify(arr))
			}

		/* getCells */
			function getCells(x, y) {
				return {
					left:   Math.floor(x / 32),
					right:  Math.floor(x / 32) + 1,
					bottom: Math.floor(y / 32),
					middle: Math.floor(y / 32) + 1,
					top:    Math.floor(y / 32) + 2
				}
			}

		/* getDistance */
			function getDistance(x1, y1, x2, y2) {
				return Math.floor(Math.pow(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2), 0.5))
			}

		/* clearCanvas */
			function clearCanvas() {
				context.clearRect(0, 0, canvas.width, canvas.height)
			}

		/* drawCircle */
			function drawCircle(x, y, r, c, s) {
				context.beginPath()
				context.fillStyle = c
				context.lineWidth = 1
				if (s) {
					context.shadowBlur = 10
					context.shadowColor = s
				}

				context.arc(x + r, y - r, r, 0, 2 * Math.PI, true)
				context.fill()
			}

		/* drawSquare */
			function drawSquare(x, y, l, c, s) {
				context.beginPath()
				context.fillStyle = c
				context.lineWidth = 1
				if (s) {
					context.shadowBlur = 10
					context.shadowColor = s
				}

				context.fillRect(x, y - l, l, l)
			}

		/* drawRoundedSquare */
			function drawRoundedSquare(x,y,l,c,s,r) {
				context.beginPath()
				context.fillStyle = c
				context.lineWidth = 1
				if (s) {
					context.shadowBlur = 10
					context.shadowColor = s
				}

				context.moveTo(x + r.tl, y - l)
				context.lineTo(x + l - r.tr, y - l)
				context.quadraticCurveTo(x + l, y - l, x + l, y - l + r.tr)
				context.lineTo(x + l, y - r.br)
				context.quadraticCurveTo(x + l, y, x + l - r.br, y)
				context.lineTo(x + r.bl, y)
				context.quadraticCurveTo(x, y, x, y - r.bl)
				context.lineTo(x, y - l + r.tl)
				context.quadraticCurveTo(x, y - l, x + r.tl, y - l)
				context.closePath()
				context.fill()
			}
}
