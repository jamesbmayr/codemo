/*** onload ***/
	/* triggers */
		if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
			var on = { click: "touchstart", mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" }
		}
		else {
			var on = { click:      "click", mousedown:  "mousedown", mousemove: "mousemove", mouseup:  "mouseup" }
		}

	/* global variables */
		var canvas = document.getElementById("canvas")
		var drawing = false
		var erasing = false
		var color = "black"
		var size = 5
		var paths = []

	/* resizeScreen */
		resizeScreen()
		window.addEventListener("resize", resizeScreen)
		function resizeScreen() {
			canvas.setAttribute("height", window.innerHeight)
			canvas.setAttribute("width", window.innerWidth)
		}

/*** drawing ***/
	/* startDrawing */
		canvas.addEventListener(on.mousedown, startDrawing)
		function startDrawing(event) {
			drawing = true
			canvas.setAttribute("drawing", true)

			var x = event.touches ? event.touches[0].clientX : event.clientX
			var y = event.touches ? event.touches[0].clientY : event.clientY
			
			if (!erasing) {
				paths.push({
					color: color,
					size: size,
					coordinates: [[x,y]]
				})
			}
		}

	/* stopDrawing */
		document.addEventListener(on.mouseup, stopDrawing)
		function stopDrawing(event) {
			drawing = false
			canvas.setAttribute("drawing", false)
		}

	/* moveDrawing */
		canvas.addEventListener(on.mousemove, moveDrawing)
		function moveDrawing(event) {
			if (drawing) {
				var x = event.touches ? event.touches[0].clientX : event.clientX
				var y = event.touches ? event.touches[0].clientY : event.clientY

				if (!erasing) {
					paths[paths.length - 1].coordinates.push([x, y])
				}
				else {
					paths = paths.filter(function (path) {
						return path.coordinates.findIndex(function (coordinates) {
							return (coordinates[0] < x + 5) && (coordinates[0] > x - 5) && (coordinates[1] < y + 5) && (coordinates[1] > y - 5)
						}) == -1
					})
				}
			}
		}

/*** drawLoop ***/
	/* drawScreen */
		var drawLoop = setInterval(drawScreen, 10)
		function drawScreen() {
			var context = canvas.getContext("2d")
				context.clearRect(0,0,window.innerWidth,window.innerHeight)

			for (var p in paths) {
				var path = paths[p]
				
				if (path.coordinates.length) {
					context.beginPath()
					context.strokeStyle = path.color || "black"
					context.lineWidth = path.size || 5
					
					var firstPoint = path.coordinates[0]
					context.moveTo(firstPoint[0], firstPoint[1])

					for (var c in path.coordinates) {
						var coordinates = path.coordinates[c]
						context.lineTo(coordinates[0], coordinates[1])
					}
				}

				context.stroke()
			}
		}

/*** controls ***/
	/* selectColor */
		Array.from(document.querySelectorAll("#colors button")).forEach(function (button) {
			button.addEventListener(on.click, selectColor)
		})
		function selectColor(event) {
			Array.from(document.querySelectorAll("#colors button")).forEach(function (button) {
				button.className = ""
			})

			var button = event.target.closest("button")
				button.className = "selected"
			color = button.value

			if (color == "white") {
				erasing = true
				canvas.setAttribute("erasing", true)
			}
			else {
				erasing = false
				canvas.setAttribute("erasing", false)
			}
		}

	/* selectSize */
		Array.from(document.querySelectorAll("#sizes button")).forEach(function (button) {
			button.addEventListener(on.click, selectSize)
		})
		function selectSize(event) {
			Array.from(document.querySelectorAll("#sizes button")).forEach(function (button) {
				button.className = ""
			})

			var button = event.target.closest("button")
				button.className = "selected"
			size = parseInt(button.value)
		}

	/* resetPaths */
		document.getElementById("reset").addEventListener(on.click, resetPaths)
		function resetPaths(event) {
			paths = []
		}