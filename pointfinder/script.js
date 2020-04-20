window.addEventListener("load", function() {
	/*** globals ***/
		/* elements */
			var ELEMENTS = {
				rangeX: document.getElementById("x"),
				rangeY: document.getElementById("y"),
				form: document.getElementById("reset-form"),
				time: document.getElementById("time"),
				score: document.getElementById("score"),
				canvas: document.getElementById("canvas"),
				context: document.getElementById("canvas").getContext("2d")
			}

		/* constants */
			var CONSTANTS = {
				width: null,
				height: null,
				xColor: "#ea6565",
				yColor: "#5a8abb",
				pointColor: "#222222",
				edgeBuffer: 25,
				intervalTime: 1 * 1000,
				scoreTime: 5,
				startTime: 15,
				startRadius: 25
			}

		/* game state */
			var GAMESTATE = {
				playing: false,
				actual: {
					x: null,
					y: null
				},
				current: {
					x: 0,
					y: 0
				},
				score: 0,
				time: 0,
				radius: 0,
				interval: null
			}

		/* resize */
			resizeScreen()
			window.addEventListener("resize", resizeScreen)
			function resizeScreen() {
				// constants
					CONSTANTS.width = Math.floor(Number(window.innerWidth))
					CONSTANTS.height = Math.floor(Number(window.innerHeight))

				// ranges
					ELEMENTS.rangeX.setAttribute("max", CONSTANTS.width - CONSTANTS.edgeBuffer)
					ELEMENTS.rangeX.value = Math.min(Number(ELEMENTS.rangeX.value), CONSTANTS.width - CONSTANTS.edgeBuffer)
					ELEMENTS.rangeY.setAttribute("max", CONSTANTS.height - CONSTANTS.edgeBuffer)
					ELEMENTS.rangeY.value = Math.min(Number(ELEMENTS.rangeY.value), CONSTANTS.height - CONSTANTS.edgeBuffer)

				// canvas
					ELEMENTS.canvas.height = CONSTANTS.height
					ELEMENTS.canvas.width = CONSTANTS.width

				// generate point
					if (GAMESTATE.time) {
						generatePoint()
					}
			}

	/*** interaction ***/
		/* resetGame */
			resetGame()
			ELEMENTS.form.addEventListener("submit", resetGame)
			function resetGame() {
				// hide form
					ELEMENTS.form.setAttribute("invisible", true)
					
				// reset game state
					GAMESTATE.score = 0
					ELEMENTS.score.innerText = GAMESTATE.score

					GAMESTATE.time = CONSTANTS.startTime
					ELEMENTS.time.innerText = GAMESTATE.time

					GAMESTATE.radius = Math.max(1, CONSTANTS.startRadius - GAMESTATE.score)

				// start timer
					GAMESTATE.playing = true
					generatePoint()
					GAMESTATE.interval = setInterval(decreaseTime, CONSTANTS.intervalTime)
			}

		/* updateX */
			ELEMENTS.rangeX.addEventListener("change", updateX)
			function updateX(event) {
				// get number
					var x = Math.min(Number(ELEMENTS.rangeX.value), CONSTANTS.width)
					GAMESTATE.current.x = x

				// redraw
					drawCanvas(ELEMENTS.canvas, ELEMENTS.context)

				// check for match
					checkMatch()
			}

		/* updateY */
			ELEMENTS.rangeY.addEventListener("change", updateY)
			function updateY(event) {
				// get number
					var y = Math.min(Number(ELEMENTS.rangeY.value), CONSTANTS.height)
					GAMESTATE.current.y = y

				// redraw
					drawCanvas(ELEMENTS.canvas, ELEMENTS.context)

				// check for match
					checkMatch()
			}

	/*** draw ***/
		/* drawCanvas */
			function drawCanvas(canvas, context) {
				// clear
					clearCanvas(canvas, context)

				// get points
					var leftX = {x: 0, y: GAMESTATE.current.y}
					var rightX = {x: CONSTANTS.width, y: GAMESTATE.current.y}
					var topY = {x: GAMESTATE.current.x, y: 0}
					var bottomY = {x: GAMESTATE.current.x, y: CONSTANTS.height}

				// draw lines
					drawLine(canvas, context, [leftX, rightX], {color: CONSTANTS.xColor})
					drawLine(canvas, context, [topY, bottomY], {color: CONSTANTS.yColor})

				// draw point
					if (GAMESTATE.playing) {
						drawPoint(canvas, context, GAMESTATE.actual, {color: CONSTANTS.pointColor})
					}
			}

		/* clearCanvas */
			function clearCanvas(canvas, context) {
				context.clearRect(0, 0, canvas.width, canvas.height)
			}

		/* drawPoint */
			function drawPoint(canvas, context, point, options) {
				context.beginPath()
				context.fillStyle = options.color || "black"
				context.arc(point.x, point.y, GAMESTATE.radius, 0, Math.PI * 2)
				context.fill()
			}

		/* drawLine */
			function drawLine(canvas, context, points, options) {
				context.beginPath()
				context.strokeStyle = options.color || "black"
				context.moveTo(points[0].x, points[0].y)
				context.lineTo(points[1].x, points[1].y)
				context.stroke()
			}

	/*** game ***/
		/* generatePoint */
			function generatePoint() {
				// random coordinates
					var x = rangeRandom(CONSTANTS.edgeBuffer, CONSTANTS.width - CONSTANTS.edgeBuffer)
					var y = rangeRandom(CONSTANTS.edgeBuffer, CONSTANTS.height - CONSTANTS.edgeBuffer)
					GAMESTATE.actual.x = x
					GAMESTATE.actual.y = y

				// draw
					drawCanvas(ELEMENTS.canvas, ELEMENTS.context)
			}

		/* checkMatch */
			function checkMatch() {
				// not playing
					if (!GAMESTATE.playing) {
						return
					}

				// no match
					if (!((GAMESTATE.actual.x - GAMESTATE.radius < GAMESTATE.current.x) && (GAMESTATE.current.x < GAMESTATE.actual.x + GAMESTATE.radius)
					   && (GAMESTATE.actual.y - GAMESTATE.radius < GAMESTATE.current.y) && (GAMESTATE.current.y < GAMESTATE.actual.y + GAMESTATE.radius))) {
						return false
					}

				// match
					GAMESTATE.score++
					ELEMENTS.score.innerText = GAMESTATE.score

					GAMESTATE.time += CONSTANTS.scoreTime
					ELEMENTS.time.innerText = GAMESTATE.time

					GAMESTATE.radius = Math.floor(Math.max(2, CONSTANTS.startRadius - (GAMESTATE.score / 2)))

					generatePoint()
			}

		/* decreaseTime */
			function decreaseTime() {
				// time remaining
					if (GAMESTATE.time > 0) {
						GAMESTATE.time--
						ELEMENTS.time.innerText = GAMESTATE.time
						return
					}

				// time's up
					endGame()
			}

		/* endGame */
			function endGame() {
				// stop playing
					GAMESTATE.playing = null
					drawCanvas(ELEMENTS.canvas, ELEMENTS.context)

				// kill timer
					clearInterval(GAMESTATE.interval)
					GAMESTATE.interval = null

				// show form
					ELEMENTS.form.removeAttribute("invisible")
			}

	/*** helpers ***/
		/* rangeRandom */
			function rangeRandom(start, end) {
				var range = end - start
				var random = Math.floor(Math.random() * range) + start
				return random
			}
})