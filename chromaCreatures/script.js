window.onload = function() {
	/*** onload ***/
		/* triggers */
			if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
				var on = { click: "touchstart", mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" }
			}
			else {
				var on = { click:      "click", mousedown:  "mousedown", mousemove: "mousemove", mouseup:  "mouseup" }
			}

		/* elements */
			var score = document.getElementById("score")
			var creatures = document.getElementById("creatures")
			var blaster = document.getElementById("blaster")
			var bursts = document.getElementById("bursts")

			var menu = document.getElementById("menu")
			var game = document.getElementById("game")
			var message = document.getElementById("message")

		/* globals */
			var points = null
			var play = null
			var color = null
			var scrolling = false
			var blasterColors = []
			var creatureColors = []

	/*** game ***/
		/* startGame */
			document.getElementById("start").addEventListener(on.click, startGame)
			function startGame(event) {
				resetBlaster()
				resetCreatures()
				resetBursts()

				menu.className = "invisible"
				game.className = ""
				score.innerHTML = points = 0

				increaseLevel()

				setTimeout(function() {
					play = setInterval(updateGame, 50)
				}, 500)
			}

		/* endGame */
			function endGame() {
				clearInterval(play)
				play = null
				game.className = "gameover"	

				setTimeout(function() {
					menu.className = "visible"
					document.getElementById("title").innerHTML = "gameover: " + Number(points) + "<br>chromaCreatures"
				}, 1000)
			}

	/*** reset ***/
		/* resetBlaster */
			function resetBlaster() {
				// get sizes
					var gameSize = Math.min(window.innerHeight, window.innerWidth) * 0.9
					var blasterSize = window.innerHeight * 0.04

				// reset position & size
					blaster.style.left = (gameSize / 2) - (blasterSize / 2) + "px"
					blaster.setAttribute("size", 0)

				// reset color
					blasterColors = ["red"]
					color = blasterColors[Math.floor(Math.random() * blasterColors.length)]
					blaster.firstChild.setAttribute("color", color)

				// mobile
					document.getElementById("color-red").className = ""
					document.getElementById("color-green").className = "invisible"
					document.getElementById("color-blue" ).className = "invisible"

					document.querySelectorAll("#colors button").forEach(function (b) {
						b.removeAttribute("selected")
					})
					document.getElementById("color-red").setAttribute("selected", true)
			}

		/* resetCreatures */
			function resetCreatures() {
				creatureColors = ["red"]
				creatures.innerHTML = ""
			}

		/* resetBursts */
			function resetBursts() {
				bursts.innerHTML = ""
			}

	/*** play ***/	
		/* updateGame */
			function updateGame() {
				// create creatures
					if (Array.from(creatures.childNodes).length < Math.max(2, Math.min(((points + 10) / 10), 5))) {
						createCreature()
					}

				// move creatures
					creatures.childNodes.forEach(function (c) {
						moveCreature(c)
					})

				// move bursts
					bursts.childNodes.forEach(function (b) {
						moveBurst(b)
					})
			}

		/* createCreature */
			function createCreature() {
				// get sizes
					var gameSize = Math.min(window.innerHeight, window.innerWidth) * 0.9
					var creatureSize = window.innerHeight * 0.08
				
				// create creature parameters
					var left = Math.random() * (gameSize - creatureSize)
					var angle = [45, 60, 75, 90, 105, 120, 135][Math.floor(Math.random() * 7)]
					var speed = Math.min(((Number(points) + 10) / 20), 4)
					var hue = creatureColors[Math.floor(Math.random() * creatureColors.length)]

				// create creature
					var creature = document.createElement("div")
						creature.className = "creature"
						creature.innerHTML = "<div class='creature-inner' color='" + hue + "'></div>"
						creature.setAttribute("angle", angle)
						creature.setAttribute("speed", speed)
						creature.style.top = "-" + creatureSize + "px"
						creature.style.left = left + "px"

					creatures.appendChild(creature)
			}

		/* moveCreature */
			function moveCreature(creature) {
				// get sizes
					var gameSize = Math.min(window.innerHeight, window.innerWidth) * 0.9
					var creatureSize = window.innerHeight * 0.08

				// get position
					var top = Number(creature.style.top.replace("px", ""))
					var left = Number(creature.style.left.replace("px", ""))
					var angle = Number(creature.getAttribute("angle"))
					var speed = Number(creature.getAttribute("speed"))
					var opacity = Number(window.getComputedStyle(creature).opacity)

				// calculate new position
					var top  = top  + ((creatureSize / 50) * Math.sin(angle / 180 * Math.PI) * speed)
					var left = left + ((creatureSize / 50) * Math.cos(angle / 180 * Math.PI) * speed)

				// invisible
					if (opacity <= 0) {
						creature.remove()
					}

				// off screen
					if (top >= gameSize) {
						if (creature.className.includes("invisible")) {
							creature.remove()
						}
						else {
							endGame()
						}
					}

				// left or right side
					else if ((left <= 0) || (left + creatureSize >= gameSize)) {
						if (creature.className.includes("invisible")) {
							creature.remove()
						}
						else {
							creature.setAttribute("angle", angle + (2 * (90 - angle)))

							creature.style.top = top + "px"
							creature.style.left = left + "px"
						}
					}

				// move down
					else {
						creature.style.top = top + "px"
						creature.style.left = left + "px"
					}
			}

		/* moveBurst */
			function moveBurst(burst) {
				// get position
					var top = Number(burst.style.top.replace("px", ""))
					var newTop = top + (window.innerHeight * 0.01 * -1)
				
				// off screen
					if (top < 0) {
						burst.remove()
						blaster.setAttribute("size", Array.from(document.querySelectorAll(".burst")).length)
					}

				// collision
					else if (detectCollision(burst)) {
						// update stats
							burst.remove()
							points++
							score.innerHTML = points
							blaster.setAttribute("size", Array.from(document.querySelectorAll(".burst")).length)

						// level up?
							if (points == 10 || (points + 10) % 20 == 0) {
								increaseLevel()
							}
							else if (points == 3 || (points + 10) % 20 == 3) {
								message.className = "invisible"
								message.innerText = ""
								score.className = "visible"
							}
					}

				// move up
					else {
						burst.style.top = newTop + "px"
					}
			}

		/* detectCollision */
			function detectCollision(burst) {
				// get burst data
					var top = Number(burst.style.top.replace("px", ""))
					var left = Number(burst.style.left.replace("px", ""))
					var bottom = top + (window.innerHeight * 0.01)
					var right = left + (window.innerHeight * 0.005)
					var hue = burst.getAttribute("color")

				// cycle through creatures
					var children = Array.from(creatures.childNodes)
					for (var c in children) {
						if (!children[c].className.includes("invisible")) {
							// get creature parameters
								var cTop = Number(children[c].style.top.replace("px", ""))
								var cLeft = Number(children[c].style.left.replace("px", ""))
								var cBottom = cTop + (window.innerHeight * 0.08)
								var cRight = cLeft + (window.innerHeight * 0.08)

							// if in the collision zone
								if ((top > cTop) && (bottom < cBottom) && (left > cLeft) && (right < cRight)) {
									var cHue = children[c].firstChild.getAttribute("color")
									
									// exact match
										if (cHue == hue) {
											children[c].className += " invisible"
											return true
										}

									// partial match
										else if (hue == "red" && cHue == "magenta") {
											children[c].firstChild.setAttribute("color", "blue")
											return true
										}
										else if (hue == "red" && cHue == "yellow") {
											children[c].firstChild.setAttribute("color", "green")
											return true
										}
										else if (hue == "red" && cHue == "white") {
											children[c].firstChild.setAttribute("color", "cyan")
											return true
										}

										else if (hue == "green" && cHue == "yellow") {
											children[c].firstChild.setAttribute("color", "red")
											return true
										}
										else if (hue == "green" && cHue == "cyan") {
											children[c].firstChild.setAttribute("color", "blue")
											return true
										}
										else if (hue == "green" && cHue == "white") {
											children[c].firstChild.setAttribute("color", "magenta")
											return true
										}

										else if (hue == "blue" && cHue == "cyan") {
											children[c].firstChild.setAttribute("color", "green")
											return true
										}
										else if (hue == "blue" && cHue == "magenta") {
											children[c].firstChild.setAttribute("color", "red")
											return true
										}
										else if (hue == "blue" && cHue == "white") {
											children[c].firstChild.setAttribute("color", "yellow")
											return true
										}
								}
						}
					}

				// otherwise
					return false
			}

		/* increaseLevel */
			function increaseLevel() {
				score.className = "invisible"
				message.className = "visible"

				if (points < 10) {
					blasterColors = ["red"]
					creatureColors = ["red"]
					message.innerText = on.click == "click" ? "space / click to shoot" : "tap to shoot"
				}
				else if (points < 30) {
					blasterColors = ["red", "blue"]
					creatureColors = ["red", "blue"]
					message.innerText = on.click == "click" ? "scroll / arrows to change" : "touch colors to change"
					document.getElementById("color-blue").className = ""
				}
				else if (points < 50) {
					blasterColors = ["red", "blue"]
					creatureColors = ["red", "blue", "magenta"]
					message.innerText = "hybrids take 2 colors"
				}
				else if (points < 70) {
					blasterColors = ["red", "green", "blue"]
					creatureColors = ["red", "green", "blue"]
					message.innerText = "full blaster unlocked"
					document.getElementById("color-green").className = ""
				}
				else if (points < 90) {
					creatureColors = ["red", "green", "blue", "magenta"]
					message.innerText = "hybrids have returned"
				}
				else if (points < 110) {
					creatureColors = ["red", "yellow", "green", "blue", "magenta"]
					message.innerText = "more hybrids have arrived"
				}
				else if (points < 130) {
					creatureColors = ["red", "yellow", "green", "cyan", "blue", "magenta"]
					message.innerText = "6 colors attacking"
				}
				else if (points < 150) {
					creatureColors = ["yellow", "cyan", "magenta"]
					message.innerText = "only hybrids now"
				}
				else if (points < 170) {
					creatureColors = ["red", "green", "blue", "white"]
					message.innerText = "overlord take 3 colors"
				}
				else if (points < 190) {
					creatureColors = ["yellow", "cyan", "magenta", "white"]
					message.innerText = "hybrids have returned"
				}
				else {
					creatureColors = ["white"]
					message.innerText = "overlord onslaught"
				}
			}

	/*** interaction ***/
		/* detectKey */
			document.addEventListener("keydown", detectKey)
			function detectKey(event) {
				if (play) {
					switch (Number(event.which)) {
						// movement
							case 37: // left
								moveBlaster(window.innerHeight * 0.09 * -1)
							break
							case 39: // right
								moveBlaster(window.innerHeight * 0.09)
							break
						
						// colors
							case 38: // up
								cycleColor(true)
							break
							case 40: // down
								cycleColor(false)
							break
						
						// fire
							case 32: // space
								fireBlaster()
							break
							default:
							break
					}
				}
			}

		/* detectMouse */
			document.addEventListener(on.mousemove, detectMouse)
			function detectMouse(event) {
				if (play) {
					// get sizes
						var gameSize = Math.min(window.innerHeight, window.innerWidth) * 0.9
						var marginLeft = (window.innerWidth - gameSize) / 2
						var blasterSize = window.innerHeight * 0.04 * ((10 - Number(blaster.getAttribute("size"))) / 10)

					// get position
						var left = event.touches ? (event.touches[0].clientX - marginLeft) : ((event.screenX || event.clientX) - marginLeft)
						blaster.style.left = Math.max(0, Math.min(gameSize, left)) + "px"
				}
			}

		/* clickMouse */
			document.addEventListener(on.mouseup, clickMouse)
			function clickMouse(event) {
				if (play) {
					fireBlaster()
				}
			}

		/* scrollMouse */
			document.addEventListener("mousewheel", scrollMouse)
			function scrollMouse(event) {
				if (play && !scrolling) {
					// prevent extra scrolling
						scrolling = true
						setTimeout(function() {
							scrolling = false
						}, 500)

					// direction
						if (event.deltaY > 0) { // down
							cycleColor(false)
						}
						else if (event.deltaY < 0) { // up
							cycleColor(true)
						}
				}
			}

		/* setColor */
			document.querySelectorAll("#colors button").forEach(function (b) {
				b.addEventListener(on.click, setColor)
			})
			
	/*** blaster ***/
		/* moveBlaster */
			function moveBlaster(change) {
				// get sizes
					var gameSize = Math.min(window.innerHeight, window.innerWidth) * 0.9
					var blasterSize = window.innerHeight * 0.04 * ((10 - Number(blaster.getAttribute("size"))) / 10)
				
				// get new position
					var left = Number(blaster.style.left.replace("px", ""))
						left += change

				// out-of-bounds right
					if (left >= gameSize) {
						blaster.style.left = gameSize + "px"
					}

				// out-of-bounds left
					else if (left <= 0) {
						blaster.style.left = 0
					}

				// in bounds
					else {
						blaster.style.left = left + "px"
					}
			}

		/* cycleColor */
			function cycleColor(up) {
				// get and change index
					var i = blasterColors.indexOf(color)
					if (up) {
						i += 1
					}
					else {
						i -= 1
					}

				// loop
					if (i >= blasterColors.length) {
						i = 0
					}
					else if (i < 0) {
						i = blasterColors.length - 1
					}

				// update
					color = blasterColors[i]
					blaster.firstChild.setAttribute("color", color)
			}

		/* setColor */
			function setColor(event) {
				var hue = event.target.id.replace("color-","")

				if (["red","green","blue"].includes(hue)) {
					color = hue
					blaster.firstChild.setAttribute("color", color)

					document.querySelectorAll("#colors button").forEach(function (b) {
						b.removeAttribute("selected")
					})
					event.target.setAttribute("selected", true)
				}
			}

		/* fireBlaster */
			function fireBlaster() {
				var burstCount = Array.from(document.querySelectorAll(".burst")).length
				if (burstCount < 10) {
					// get sizes
						var gameSize = Math.min(window.innerHeight, window.innerWidth) * 0.9
						var blasterSize = window.innerHeight * 0.04 * ((10 - burstCount) / 10)
						var burstSize = window.innerHeight * 0.005

					// make blaster smaller
						blaster.setAttribute("size", burstCount + 1) 
					
					// get burst left
						var left = Number(blaster.style.left.replace("px", ""))

					// create burst
						var burst = document.createElement("div")
							burst.className = "burst"
							burst.setAttribute("color", color)
							burst.style.top = gameSize * 0.95 + "px"
							burst.style.left = left + "px"

						bursts.appendChild(burst)
				}
			}

}
