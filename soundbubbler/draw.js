/*** globals ***/
	/* canvas */
		window.canvas  = canvas  = document.getElementById("visualizer")
		window.context = context = canvas.getContext("2d")
		window.visuals = []
		window.flashes = []

	/* variables */
		var firstKey = 48
		var lastKey = 72
		var octaveKeys = 12	
		var brightnessShift = 30
		var colorShift = 125
		var blurWidth = 10
		var flashDuration = 100
		var opacity = 0.5

/*** canvas ***/
	/* resizeCanvas */
		resizeCanvas()
		window.addEventListener("resize", resizeCanvas)
		window.resizeCanvas = resizeCanvas
		function resizeCanvas() {
			canvas.height = window.innerHeight
			canvas.width = window.innerWidth
		}

	/* clearCanvas */
		window.clearCanvas = clearCanvas
		function clearCanvas() {
			context.clearRect(0, 0, canvas.width, canvas.height)
		}

	/* updateCanvas */
		window.updateCanvas = updateCanvas
		function updateCanvas() {
			// clear
				clearCanvas()

			// shrink circles
				updateCircles()

			// draw circles
				for (var i in window.visuals) {
					drawCircle(window.visuals[i].x, window.visuals[i].y, window.visuals[i].radius, window.visuals[i].options)
				}
		}

/*** circles ***/
	/* getCircleColor */
		window.getCircleColor = getCircleColor
		function getCircleColor(note, octave) {
			// defaults
				var redShift = 0
				var greenShift = 0
				var blueshift = 0

			// colorShift
				if (note == 0) {
					redShift = 1
					greenShift = 0
					blueShift = 0
				}
				else if (note == 1) {
					redShift = 0.75
					greenShift = 0.25
					blueShift = 0
				}
				else if (note == 2) {
					redShift = 0.5
					greenShift = 0.5
					blueShift = 0
				}
				else if (note == 3) {
					redShift = 0.25
					greenShift = 0.75
					blueShift = 0
				}
				else if (note == 4) {
					redShift = 0
					greenShift = 1
					blueShift = 0
				}
				else if (note == 5) {
					redShift = 0
					greenShift = 0.75
					blueShift = 0.25
				}
				else if (note == 6) {
					redShift = 0
					greenShift = 0.5
					blueShift = 0.5
				}
				else if (note == 7) {
					redShift = 0
					greenShift = 0.25
					blueShift = 0.75
				}
				else if (note == 8) {
					redShift = 0
					greenShift = 0
					blueShift = 1
				}
				else if (note == 9) {
					redShift = 0.25
					greenShift = 0
					blueShift = 0.75
				}
				else if (note == 10) {
					redShift = 0.5
					greenShift = 0
					blueShift = 0.5
				}
				else if (note == 11) {
					redShift = 0.75
					greenShift = 0
					blueShift = 0.25
				}

			// octave shift
				var brightness = (octave * brightnessShift)

			// color
				var red   = Math.min(255, Math.max(0, (redShift   * colorShift) + brightness))
				var green = Math.min(255, Math.max(0, (greenShift * colorShift) + brightness))
				var blue  = Math.min(255, Math.max(0, (blueShift  * colorShift) + brightness))

			return ("rgb(" + red + "," + green + "," + blue + ")")
		}

	/* createCircle */
		window.createCircle = createCircle
		function createCircle(note, frequency, velocity) {
			// get keyboardKey
				var constrainedNote = note
				var minNote = note % octaveKeys
				if (note < firstKey) {
					constrainedNote = minNote + firstKey
				}
				else if (note > lastKey) {
					constrainedNote = minNote + firstKey + octaveKeys
				}

				var keyboardKey = document.getElementById("key--" + constrainedNote)

			// get x & y
				var rect = keyboardKey.getBoundingClientRect()
				var x = rect.left + (rect.width  / 2)
				var y = canvas.height - (rect.top  + (rect.height / 2))

			// get radius
				var radius = Math.max(0, Math.min(2, (velocity || 1))) * window.circleRadius

			// color
				var color = getCircleColor(minNote, frequency[3])

			// create
				var circle = {
					note: note,
					speed: window.circleSpeed,
					held: true,
					x: x,
					y: y,
					radius: radius,
					options: {
						color: color,
						blur: radius / blurWidth,
						shadow: color
					}
				}

				window.visuals.push(circle)
		}

	/* deactivateCircle */
		window.deactivateCircles = deactivateCircles
		function deactivateCircles(note) {
			// find circles with matching note
				var circle = null
				for (var i = 0; i < window.visuals.length; i++) {
					if (window.visuals[i].note == note) {
						window.visuals[i].held = false
					}
				}
		}

	/* updateCircles */
		window.updateCircles = updateCircles
		function updateCircles() {
			for (var i = 0; i < window.visuals.length; i++) {
				// beyond the screen edge
					if (window.visuals[i].radius <= window.circleShrink || (window.visuals[i].y - window.visuals[i].radius > canvas.height)) {
						window.visuals.splice(i, 1)
						i--
					}

				// float up
					else {
						window.visuals[i].y += window.visuals[i].speed

						// shrink if not held
							if (!window.visuals[i].held) {
								window.visuals[i].radius -= window.circleShrink
							}
					}
			}
		}

	/* drawCircle */
		window.drawCircle = drawCircle
		function drawCircle(x, y, radius, options) {
			// parameters
				options = options || {}
				context.beginPath()
				context.fillStyle   = options.gradient ? drawGradient(options) : (options.color || "transparent")
				context.strokeStyle = options.gradient ? drawGradient(options) : (options.color || "transparent")
				context.lineWidth   = options.border || 1
				context.shadowBlur  = options.blur ? options.blur : 0
				context.shadowColor = options.shadow ? options.shadow : "transparent"
				context.globalAlpha = options.opacity || opacity

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
