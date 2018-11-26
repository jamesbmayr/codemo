window.onload = function() {

	/*** onload ***/
		/* globals */
			var game = document.getElementById("game")
			var level = 5
			var pinkMotion = null
			var tealMotion = null

			var types = [
				"space", null, "wall-black", "wall-black",
				"wall-red", "wall-red", "switch-red", "switch-red",
				"wall-yellow", "wall-yellow", "switch-yellow", "switch-yellow",
				"wall-blue", "wall-blue", "switch-blue", "switch-blue",
				"wall-pink", "wall-pink", "switch-pink", "switch-pink",
				"wall-teal", "wall-teal", "switch-teal", "switch-teal"
			]

		/* levels */
			var levels = [
				[
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
				],
				[
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 3, 3, 3, 3, 3, 3, 0, 3, 3, 3],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 3, 3, 3, 0, 3, 3, 3, 3, 3, 3],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
				],
				[
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 6, 0],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 3, 3, 3, 3, 3, 3, 5, 3, 3, 3],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 3, 3, 3, 5, 3, 3, 3, 3, 3, 3],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
				],
				[
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 6, 0],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 3, 3, 3, 3, 3, 3, 5, 3, 3, 3],
					[ 0,10, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 3, 3, 3, 9, 3, 3, 3, 3, 3, 3],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 6, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
				],
				[
					[ 0, 0, 3, 0, 9, 0, 3, 0, 0, 0],
					[ 0, 0, 3, 0, 3, 0, 3, 0, 6, 0],
					[ 0, 0, 5, 0, 3, 0, 5, 0, 0, 0],
					[ 3, 3, 3, 3, 3, 3, 3, 5, 3, 3],
					[ 0, 0, 0, 6, 0, 3, 0, 0, 0, 0],
					[ 0, 0, 0, 0, 0, 9, 0, 6, 0, 0],
					[ 3, 3, 3, 5, 3, 3, 3, 3, 3, 3],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 6, 0,10, 0, 0, 0, 0, 0, 0],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
				],
				[
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 3, 3, 3, 3, 3, 3, 3, 3, 3, 0],
					[ 0,13, 6,13, 5, 3, 5, 3, 0, 0],
					[ 0, 3,13, 0, 5, 3, 5, 3, 0, 3],
					[ 0, 3, 5, 5, 0,13, 5, 3, 0, 0],
					[ 0, 3, 3, 3,13, 0, 5, 3, 3, 0],
					[ 0, 3, 5, 5, 5, 5, 0,13, 0, 0],
					[ 0, 3, 3, 3, 3, 3, 3, 3, 3, 3],
					[ 0, 3, 3, 3, 3, 3, 3, 3, 6, 3],
					[ 0, 0, 0, 0, 0, 6, 0, 5,14, 0]
				],
				[
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0,18],
					[21, 3, 3, 3, 3, 3, 3, 3, 3, 3],
					[ 0, 3, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 3, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 3, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 3, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 3, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 3, 0, 0, 0, 0, 0, 0, 0, 0],
					[21, 3, 3, 3, 3, 3, 3, 3, 3, 3],
					[ 0,17,22, 0, 0, 0, 0, 0, 0, 0]
				]
			]

			createLevel(levels[level])

	/*** levels ***/
		/* createLevel */
			function createLevel(grid) {
				// grid
					game.innerHTML = ""
					for (var row in grid) {
						for (var column in grid[row]) {
							var cell = document.createElement("div")
								cell.className = "cell"
								cell.setAttribute("x", column)
								cell.setAttribute("y", row)
								cell.setAttribute("type", types[ grid[row][column] ])
								if (grid[row][column] % 2 == 1) {
									cell.setAttribute("active", true)
								}
							game.append(cell)
						}
					}

				// players
					var gradient = document.getElementById("gradient")
					if (gradient) {
						gradient.remove()
					}

					var pink = document.createElement("div")
						pink.id = "pink"
						pink.className = "player"
					Array.from(document.querySelectorAll(".cell[x='0'][y='0']"))[0].append(pink)

					var teal = document.createElement("div")
						teal.id = "teal"
						teal.className = "player"
					Array.from(document.querySelectorAll(".cell[x='9'][y='9']"))[0].append(teal)

					pinkMotion = tealMotion = false
			}

	/*** movement ***/
		/* interpretKey */
			document.addEventListener("keydown", interpretKey)
			function interpretKey(event) {
				var result = null
				switch (event.key.toLowerCase()) {
					// pink
						case "w":
							if (!pinkMotion) { movePlayer("pink", "up") }
						break
						case "s":
							if (!pinkMotion) { movePlayer("pink", "down") }
						break
						case "a":
							if (!pinkMotion) { movePlayer("pink", "left") }
						break
						case "d":
							if (!pinkMotion) { movePlayer("pink", "right") }
						break

					// teal
						case "arrowup":
							if (!tealMotion) { movePlayer("teal", "up") }
						break
						case "arrowdown":
							if (!tealMotion) { movePlayer("teal", "down") }
						break
						case "arrowleft":
							if (!tealMotion) { movePlayer("teal", "left") }
						break
						case "arrowright":
							if (!tealMotion) { movePlayer("teal", "right") }
						break

					// others
						default:
							return null
				}
			}

		/* movePlayer */
			function movePlayer(color, direction) {
				// data
					var player = document.getElementById(color)
					if (!player) { return null }

					var x = Number(player.parentNode.getAttribute("x"))
					var y = Number(player.parentNode.getAttribute("y"))
					var color = player.id

				// target ?
					switch (direction) {
						case "up":
							var target = [x, y - 1]
						break
						case "down":
							var target = [x, y + 1]
						break
						case "left":
							var target = [x - 1, y]
						break
						case "right":
							var target = [x + 1, y]
						break
					}

				// collision ?
					var collision = getCollision(target)
					if (collision && collision.includes("edge")) {
						return null
					}
					else if (collision && collision.includes("wall") && !collision.includes(color)) {
						return null
					}
					else {
						// leaving switch
							var previous = getCollision([x, y], true)
							if (previous && previous.includes("switch")) {
								if (!flipSwitch([x, y])) {
									return null
								}
							}

						// victory
							if (collision && collision.includes("player")) {
								pinkMotion = tealMotion = true
								animateMove(player, direction, target, function() {
									connectPlayers(player)	
								})
							}

						// new switch
							else if (collision && collision.includes("switch")) {
								animateMove(player, direction, target, function() {
									flipSwitch(target)
								})
							}

						// move player
							else {
								animateMove(player, direction, target, function() {
									if (Array.from(player.parentNode.childNodes).length == 2) {
										connectPlayers(player)
									}
								})
							}
					}
			}

		/* animateMove */
			function animateMove(player, direction, target, callback) {
				// add the hold
					if (player.id == "pink") {
						pinkMotion = true
					}
					else if (player.id == "teal") {
						tealMotion = true
					}

				// get data
					var rect = player.getBoundingClientRect()
					var x = rect.left + (rect.width / 2)
					var y = rect.top + (rect.height / 2)

				// pop out the player
					player.style.position = "absolute"
					player.style.left = x + "px"
					player.style.top = y + "px"

				// loop
					var count = 9
					var animation = setInterval(function() {
						if (count) {
							count--

							// animate the movement
								if (direction == "up") {
									player.style.top = Number(player.style.top.replace("px", "")) - 5 + "px"
								}
								else if (direction == "down") {
									player.style.top = Number(player.style.top.replace("px", "")) + 5 + "px"
								}
								else if (direction == "left") {
									player.style.left = Number(player.style.left.replace("px", "")) - 5 + "px"
								}
								else if (direction == "right") {
									player.style.left = Number(player.style.left.replace("px", "")) + 5 + "px"
								}
						}
						else {
							clearInterval(animation)

							// put it back
								Array.from(document.querySelectorAll(".cell[x='" + target[0] + "'][y='" + target[1] + "']"))[0].append(player)
								player.style.position = "relative"
								player.style.left = "50%"
								player.style.top = "50%"

							// release the hold
								if (player.id == "pink") {
									pinkMotion = false
								}
								else if (player.id == "teal") {
									tealMotion = false
								}

							// callback
								if (callback) {
									callback()
								}
						}
					}, 25)
			}

	/*** interaction ***/
		/* getCollision */
			function getCollision(target, override) {
				// edge
					if (target[0] < 0 || target[1] < 0) {
						return "edge"
					}
					else if (target[0] > levels[level][0].length - 1 || target[1] > levels[level].length - 1) {
						return "edge"
					}

				// cell
					else {
						var cell = Array.from(document.querySelectorAll(".cell[x='" + target[0] + "'][y='" + target[1] + "']"))[0]
						var type = cell.getAttribute("type")

						// wall
							if (type.includes("wall") && cell.getAttribute("active")) {
								return type
							}

						// other player
							else if (!override && cell.firstChild && cell.firstChild.className == "player") {
								return "player"
							}

						// switch
							else if (type.includes("switch")) {
								return type
							}

						// none
							else {
								return false
							}
					}
			}

		/* flipSwitch */
			function flipSwitch(target) {
				// trigger
					var trigger = Array.from(document.querySelectorAll(".cell[x='" + target[0] + "'][y='" + target[1] + "']"))[0]
					var color = trigger.getAttribute("type").replace("switch-","")					
					if (trigger.getAttribute("active")) {
						trigger.removeAttribute("active")
					}
					else {
						trigger.setAttribute("active", true)
					}
				
				// blocks
					var active = Array.from(document.querySelectorAll(".cell[type='switch-" + color + "'][active]")).length ? true : false

					var blocks  = Array.from(document.querySelectorAll(".cell[type='wall-" + color + "']"))
					for (var b in blocks) {
						if (blocks[b].firstChild && blocks[b].firstChild.className == "player") {
							trigger.setAttribute("active", true)
							return false
						}
					}

					for (var b in blocks) {
						if (active) {
							blocks[b].removeAttribute("active")
						}
						else {
							blocks[b].setAttribute("active", true)
						}
					}

				return true
			}

		/* connectPlayers */
			function connectPlayers(player) {
				// victory animation
					tealMotion = pinkMotion = true
					var partner = (player.id == "pink") ? "teal" : "pink"
					document.getElementById(partner).remove()

					player.id = "gradient"

				// level up
					level++
					setTimeout(function() {
						createLevel(levels[level])
					}, 2000)
			}

	/*** designer ***/
		/* createTools */
			window.createTools = function createTools() {
				var designer = document.getElementById("designer")

				// dropdown
					var select = document.createElement("select")
						select.id = "type"
						for (var t = 0; t < types.length; t++) {
							if ([0,3].includes(t) || ([1,2].includes(t % 4) && ![1,2].includes(t))) {
								var option = document.createElement("option")
									option.value = t
									option.innerText = types[t]
								select.append(option)
							}
						}
					designer.append(select)

				// output
					var output = document.createElement("textarea")
						output.id = "output"
					designer.append(output)
					updateOutput()

				// cell listeners
					var cells = Array.from(document.querySelectorAll(".cell"))
					for (var c in cells) {
						cells[c].addEventListener("click", setCell)
					}
			}
			createTools()

		/* setCell */
			function setCell(event) {
				if (event.target.className == "cell") {
					// data
						var value = Number(document.getElementById("type").value)
						var type = types[value]
						var active = value % 2 == 1 ? true : false

					// set data
						var cell = event.target
							cell.setAttribute("type", type)
						if (active) {
							cell.setAttribute("active", true)
						}
						else {
							cell.removeAttribute("active")
						}

					updateOutput()
				}
			}

		/* updateOutput */
			function updateOutput() {
				var output = document.getElementById("output")
				var text = '[\n'
					for (var y = 0; y <= 9; y++) {
						text += '\t['
						
						for (var x = 0; x <= 9; x++) {
							// get cell & type
								var cell = Array.from(document.querySelectorAll(".cell[x='" + x + "'][y='" + y + "']"))[0]
								var number = types.indexOf(cell.getAttribute("type"))

							// active ?
								if (cell.getAttribute("active")) {
									number += 1
								}

							// space ?
								if (number < 10) {
									number = ' ' + number
								}

							// add to list
								text += number
								if (x !== 9) {
									text += ','
								}
								else {
									text += ']'
								}
						}

						if (y !== 9) {
							text += ',\n'
						}
						else {
							text += '\n]'
						}
					}
				output.value = text
			}
}