/*** globals ***/
	/* triggers */
		if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
			var on = { click: "touchstart", mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" }
		}
		else {
			var on = { click:      "click", mousedown:  "mousedown", mousemove: "mousemove", mouseup:  "mouseup" }
		}

	/* defaults */
		document.addEventListener("dblclick", function(event) {
			event.preventDefault()
		})

		document.addEventListener("contextmenu", function(event) {
			event.preventDefault()
		})

	/* elements */
		var canvas   = document.getElementById("canvas")
		var context  = canvas.getContext("2d")
		var undo     = document.getElementById("undo")
		var clear    = document.getElementById("clear")
		var download = document.getElementById("download")

	/* data */
		var lines       = []
		var drawing     = false
		var cursor      = {x: 500, y: 500}

/*** menu ***/
	/* selectUndo */
		undo.addEventListener(on.click, selectUndo)
		function selectUndo(event) {
			var i = 12
			while (lines.length && i) {
				lines.pop()
				i--
			}
			drawSnowflake()
		}

	/* selectClear */
		clear.addEventListener(on.click, selectClear)
		function selectClear(event) {
			lines = []
			drawSnowflake()
		}

	/* downloadImage */
		download.addEventListener(on.click, downloadImage)
		function downloadImage(event) {
			//  package up
				var exportLink = document.createElement("a")
					exportLink.id = "export-link"
					exportLink.setAttribute("href", canvas.toDataURL("image/png"))
					exportLink.setAttribute("download", "snowflakeMaker_" + (new Date().getTime()) + ".png")
					exportLink.addEventListener(on.click, function() {
						var exportLink = document.getElementById("export-link")
						document.body.removeChild(exportLink)
					})
			
			// click
				document.body.appendChild(exportLink)
				document.getElementById("export-link").click()
		}

/*** assetManager ***/
	/* storeAsset */
		window.ASSETS_J.storeAsset = async function(type) {
			try {
				// png
					return {
						name: "snowflakeMaker_" + (new Date().getTime()) + ".png",
						type: "png",
						data: canvas.toDataURL("image/png")
					}
			} catch (error) {console.log(error)}
		}

/*** mouse ***/
	/* downMouse */
		canvas.addEventListener(on.mousedown, downMouse)
		function downMouse(event) {
			drawing = true
			for (var i = 0; i < 12; i++) {
				lines.push([])
			}
		}

	/* upMouse */
		canvas.addEventListener(on.mouseup, upMouse)
		function upMouse(event) {
			drawing = false
		}

	/* moveMouse */
		canvas.addEventListener(on.mousemove, moveMouse)
		function moveMouse(event) {
			// update position
				var rect = canvas.getBoundingClientRect()

				var x = event.touches ? event.touches[0].clientX : event.clientX
				var y = event.touches ? event.touches[0].clientY : event.clientY

				cursor.x =                 (((x - rect.left) / rect.width) * canvas.width)
				cursor.y = canvas.height - (((y - rect.top) / rect.height) * canvas.height)

			// add
				if (drawing) {
					addPoint(cursor.x, cursor.y)
				}
		}

/*** drawing ***/
	/* addPoint */
		function addPoint(x, y) {
			// add point to last line
				if (lines.length) {
					for (var i = 0; i < 12; i++) {
						if (i % 2 == 0) {
							lines[lines.length - (i + 1)].push(getRotatedPoint(x, y, getRadians(i * 30)))
						}
						else {
							lines[lines.length - (i + 1)].push(getRotatedPoint(canvas.width - x, y, getRadians((i + 1) * 30)))
						}
					}
				}

			// draw
				drawSnowflake()
		}

/*** helpers ***/
	/* getDistance */
		function getDistance(x1, y1, x2, y2) {
			return Math.pow(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2), 0.5)
		}

	/* getRadians */
		function getRadians(degrees) {
			return Math.PI * degrees / 180
		}

	/* getRotatedPoint */
		function getRotatedPoint(x, y, a) {
			return {
				x: (((x - 500) * Math.cos(a)) - ((y - 500) * Math.sin(a))) + 500,
				y: (((y - 500) * Math.cos(a)) + ((x - 500) * Math.sin(a))) + 500
			}
		}

	/* getReflectedPoint */
		function getReflectedPoint(x, y, a) {
			return null
		}

/*** canvas ***/
	/* clearCanvas */
		function clearCanvas() {
			context.clearRect(0, 0, canvas.width, canvas.height)
		}

	/* drawLine */
		function drawLine(x1, y1, x2, y2, options) {
			// parameters
				options = options || {}
				context.beginPath()
				context.strokeStyle = options.gradient ? drawGradient(options) : (options.color || "transparent")
				context.lineWidth   = options.border || 1
				context.shadowBlur  = options.blur ? options.blur : 0
				context.shadowColor = options.shadow ? options.shadow : "transparent"
				context.globalAlpha = options.opacity || 1
				
			// draw
				context.moveTo(x1, canvas.height - y1)
				context.lineTo(x2, canvas.height - y2)
				context.stroke()
		}

	/* drawSnowflake */
		function drawSnowflake() {
			// clear
				clearCanvas()

			// loop through lines
				for (var l in lines) {
					var points = lines[l]
					for (var p in points) {
						if (p > 0) {
							drawLine(points[p].x, points[p].y, points[p - 1].x, points[p - 1].y, {color: "white", border: 3, blur: 1, shadow: "white"})
						}
					}
				}
		}
