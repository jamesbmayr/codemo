window.addEventListener("load", function() {

	/*** onload ***/
		/* triggers */
			if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
				var on = { click: "touchstart", mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" }
			}
			else {
				var on = { click:      "click", mousedown:  "mousedown", mousemove: "mousemove", mouseup:  "mouseup" }
			}

		/* constants */
			var ALPHABET = "abcdefghijklmnopqrstuvwxyz"
			var RANDOMLENGTH = 8

			var CATCOLORS = ["white", "black", "brown", "orange"]
			var RATCOLORS = ["gray", "brown"]
			var DIRECTIONS = ["up", "down", "left", "right"]

			var INTERVAL = 20
			var CATSPEED = 4
			var RATSPEED = 1
			var ANIMATIONSTEPS = 16

			var PADDING = 50
			var HOLECOUNT = 5
			var COLLISIONDISTANCE = 25
			var SCOREFACTOR = 4

		/* globals */
			var cursor = {}
			var cat = {}
			var rats = {}
			var holes = {}
			var score = document.getElementById("score")
  
	/*** interaction ***/
		/* moveCursor */
			window.addEventListener(on.mousemove, moveCursor)
			window.addEventListener(on.mousedown, moveCursor)
			function moveCursor(event) {
				cursor.x = event.touches ? event.touches[0].clientX : event.clientX
				cursor.y = event.touches ? event.touches[0].clientY : event.clientY
			}

	/*** game ***/
		/* startGame */
			startGame()
			function startGame() {
				// cursor
					cursor.x = 0
					cursor.y = 0

				// cat
					createCat()

				// holes
					for (var i = 0; i < HOLECOUNT; i++) {
						createHole()
					}
			}

		/* updateGame */
			setInterval(updateGame, INTERVAL)
			function updateGame() {
				// cat
					updateCat()

				// rats
					if (Object.keys(rats).length <= Math.max(0, Math.floor(cat.score / SCOREFACTOR))) {
						createRat()
					}

					for (var r in rats) {
						updateRat(rats[r])
					}
			}			

	/*** miscellaneous ***/
		/* getRandom */
			function getRandom() {
				var randomString = ""
				while (randomString.length < RANDOMLENGTH) {
					randomString += ALPHABET[Math.floor(Math.random() * ALPHABET.length)]
				}
				return randomString
			}

		/* createHole */
			function createHole() {
				// object
					var hole = {}
					var id = getRandom()
					holes[id] = hole

				// html
					hole.element = document.createElement("div")
					hole.element.id = id
					hole.element.className = "hole"
					document.body.appendChild(hole.element)

				// position
					var failsafe = 9
					do {
						failsafe--
						hole.x = Math.floor(Math.random() * (window.innerWidth  - PADDING * 8) + PADDING * 4)
						hole.y = Math.floor(Math.random() * (window.innerHeight - PADDING * 8) + PADDING * 4)
					}
					while (failsafe && (
						// too close to the middle
						(      (hole.x < window.innerWidth  / 2 + PADDING * 2)
							&& (hole.x > window.innerWidth  / 2 - PADDING * 2)
							&& (hole.y < window.innerHeight / 2 + PADDING * 2)
							&& (hole.y > window.innerHeight / 2 - PADDING * 2)
						)
						// too close to another hole
						|| Object.keys(holes).find(function(h) {
							return ((h !== id)
							&& (Math.abs(holes[h].x - hole.x) < PADDING)
							&& (Math.abs(holes[h].y - hole.y) < PADDING))
						})
					))

					hole.element.style.left = hole.x + "px"
					hole.element.style.top  = hole.y + "px"
			}

	/*** cat ***/
		/* createCat */
			function createCat() {
				// html
					cat.element = document.createElement("div")
					cat.element.id = "cat"
					document.body.appendChild(cat.element)

				// color
					cat.element.setAttribute("color", CATCOLORS[Math.floor(Math.random() * CATCOLORS.length)])

				// direction
					cat.element.setAttribute("direction", DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)])

				// position
					cat.x = window.innerWidth / 2
					cat.y = window.innerHeight / 2
					cat.element.style.left = cat.x + "px"
					cat.element.style.top  = cat.y + "px"

				// step
					cat.step = 0
					cat.element.setAttribute("step", cat.step)

				// score
					cat.score = 0
			}

		/* updateCat */
			function updateCat() {
				orientCat()
				animateCat()
				moveCat()
			}

		/* orientCat */
			function orientCat() {
				// deltas
					var deltaX = cursor.x - cat.x
					var deltaY = cursor.y - cat.y

				// x
					if (Math.abs(deltaX) > Math.abs(deltaY)) {
						if (deltaX > 0) {
							cat.element.setAttribute("direction", "right")
						}
						else {
							cat.element.setAttribute("direction", "left")
						}
					}

				// y
					else {
						if (deltaY > 0) {
							cat.element.setAttribute("direction", "down")
						}
						else {
							cat.element.setAttribute("direction", "up")
						}
					}
			}

		/* animateCat */
			function animateCat() {
				// step
					cat.step = cat.step ? (cat.step - 1) : (ANIMATIONSTEPS - 1)
					cat.element.setAttribute("step", cat.step)
			}

		/* moveCat */
			function moveCat() {
				// x
					if (cursor.x > cat.x + CATSPEED) {
						cat.x += CATSPEED
					}
					else if (cursor.x < cat.x - CATSPEED) {
						cat.x -= CATSPEED
					}

				// y
					if (cursor.y > cat.y + CATSPEED) {
						cat.y += CATSPEED
					}
					else if (cursor.y < cat.y - CATSPEED) {
						cat.y -= CATSPEED
					}

				// move
					cat.element.style.left = cat.x + "px"
					cat.element.style.top  = cat.y + "px"
			}

	/*** rat ***/
		/* createRat */
			function createRat() {
				// object
					var rat = {}
					var id = getRandom()
					rats[id] = rat

				// html
					rat.element = document.createElement("div")
					rat.element.id = id
					rat.element.className = "rat"
					document.body.appendChild(rat.element)

				// color
					rat.element.setAttribute("color", RATCOLORS[Math.floor(Math.random() * RATCOLORS.length)])

				// direction
					rat.element.setAttribute("direction", DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)])

				// position
					var holeKeys = Object.keys(holes)
					var hole = holes[holeKeys[Math.floor(Math.random() * holeKeys.length)]]
					rat.x = hole.x
					rat.y = hole.y
					rat.element.style.left = rat.x + "px"
					rat.element.style.top  = rat.y + "px"

				// step
					rat.step = 0
					rat.element.setAttribute("step", rat.step)
			}

		/* updateRat */
			function updateRat(rat) {
				orientRat(rat)
				animateRat(rat)
				catchRat(rat)
				moveRat(rat)
			}

		/* orientRat */
			function orientRat(rat) {
				// deltas
					var deltaX = cat.x - rat.x
					var deltaY = cat.y - rat.y

				// x
					if (Math.abs(deltaX) > Math.abs(deltaY)) {
						if (deltaX < 0) {
							rat.element.setAttribute("direction", "right")
						}
						else {
							rat.element.setAttribute("direction", "left")
						}
					}

				// y
					else {
						if (deltaY < 0) {
							rat.element.setAttribute("direction", "down")
						}
						else {
							rat.element.setAttribute("direction", "up")
						}
					}
			}

		/* animateRat */
			function animateRat(rat) {
				// step
					rat.step = rat.step ? (rat.step - 1) : (ANIMATIONSTEPS - 1)
					rat.element.setAttribute("step", rat.step)
			}

		/* catchRat */
			function catchRat(rat) {
				// deltas
					var deltaX = cat.x - rat.x
					var deltaY = cat.y - rat.y

				// collision
					if (Math.abs(deltaX) < COLLISIONDISTANCE && Math.abs(deltaY) < COLLISIONDISTANCE) {
						deleteRat(rat, true)
					}
			}

		/* moveRat */
			function moveRat(rat) {
				// x
					if (cat.x > rat.x + RATSPEED) {
						rat.x -= RATSPEED
					}
					else if (cat.x < rat.x - RATSPEED) {
						rat.x += RATSPEED
					}

				// y
					if (cat.y > rat.y + RATSPEED) {
						rat.y -= RATSPEED
					}
					else if (cat.y < rat.y - RATSPEED) {
						rat.y += RATSPEED
					}

				// move
					rat.element.style.left = rat.x + "px"
					rat.element.style.top  = rat.y + "px"

				// edge
					if (rat.x < -1 * PADDING / 2 || rat.x > window.innerWidth  + PADDING / 2
					 || rat.y < -1 * PADDING / 2 || rat.y > window.innerHeight + PADDING / 2) {
						deleteRat(rat, false)
					}
				
			}

		/* deleteRat */
			function deleteRat(rat, caught) {
				// html
					var id = rat.element.id
					rat.element.remove()

				// object
					delete rats[id]

				// score
					if (caught) {
						cat.score = cat.score + 1
					}
					else {
						cat.score = Math.max(0, cat.score - 1)
					}
					
					score.innerText = cat.score
			}

})