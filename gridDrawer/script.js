window.onload = function() {
	/*** globals ***/
		/* triggers */
			if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
				var on = { click: "touchstart", mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" }
			}
			else {
				var on = { click:      "click", mousedown:  "mousedown", mousemove: "mousemove", mouseup:  "mouseup" }
			}

		/* variables */
			var canvas   = document.getElementById("canvas")
			var context  = canvas.getContext("2d")
			
			var lines    = []
			var settings = {}
			var drawLoop = null

		/* resetGlobals */
			function resetGlobals() {
				window.lines = lines = []

				window.settings = settings = {
					canvas: {
						height: 0,
						width: 0,
						x: 0,
						y: 0,
						shape: null,
						spacing: 0,
						zoom: 1
					},
					cursor: {
						color: "black",
						tool:  "draw",
						shift: false,
						press: false,
						since: null,
						x: 0,
						y: 0,
						closest: {
							x: null,
							y: null,
							distance: null
						}
					},
					live: {
						x: null,
						y: null
					}
				}

				if (drawLoop) {
					clearInterval(drawLoop)
					drawLoop = null
				}
			}

		/* resizeScreen */
			window.addEventListener("resize", resizeScreen)
			function resizeScreen() {
				if (settings.canvas) {
					settings.canvas.height = (window.innerHeight - 50)
					settings.canvas.width  =  window.innerWidth
					canvas.setAttribute("height", settings.canvas.height)
					canvas.setAttribute("width",  settings.canvas.width )
				}
			}

	/*** creation ***/
		/* createGrid */
			document.getElementById("creation").addEventListener("submit", createGrid)
			function createGrid() {
				resetGlobals()
				resizeScreen()
				selectInstrument()
				
				settings.canvas.shape   =          document.getElementById( "shape" ).value  || "square"
				settings.canvas.spacing = parseInt(document.getElementById("spacing").value) || 30
				settings.cursor.color   =          document.getElementById( "color" ).value  || "orange"

				document.getElementById("create").innerHTML = "&#8635;"
				selectTool({target: document.getElementById("draw")})

				navbar.setAttribute("mode", "tools")
				canvas.setAttribute("tool", "draw")
				drawLoop = setInterval(drawCanvas, 10)
			}

	/*** tools ***/
		/* selectColor */
			document.getElementById("color").addEventListener("change", selectColor)
			function selectColor() {
				settings.cursor.color = document.getElementById("color").value
				selectTool({target: document.getElementById("draw")})

				document.getElementById("color").style.color = settings.cursor.color
				document.getElementById("draw" ).style.color = settings.cursor.color
			}

		/* selectTool */
			document.querySelectorAll("#tools button").forEach(function(button) {
				button.addEventListener(on.mousedown, selectTool)
			})
			function selectTool(event) {
				settings.cursor.tool = event.target.value

				document.querySelectorAll("#tools button").forEach(function(button) {
					button.removeAttribute("selected")
				})

				event.target.setAttribute("selected", true)
				canvas.setAttribute("tool", settings.cursor.tool)
			}

	/*** input ***/
		/* downShift */
			document.addEventListener("keydown", function(event) {
				if (event.key == "Shift" || event.which == 16) {
					downShift()
				}
			})
			function downShift() {
				if (settings.cursor) {
					settings.cursor.shift = true
				}
			}

		/* upShift */
			document.addEventListener("keyup", function(event) {
				if (event.key == "Shift" || event.which == 16) {
					upShift()
				}
			})
			function upShift() {
				if (settings.cursor) {
					settings.cursor.shift = false
				}
			}

		/* downMouse */
			canvas.addEventListener(on.mousedown, downMouse)
			function downMouse(event) {
				if (settings.cursor) {
					settings.cursor.press = true
					settings.cursor.since = new Date().getTime()

					settings.cursor.x = event.touches ?  event.touches[0].clientX       :  event.clientX
					settings.cursor.y = event.touches ? (event.touches[0].clientY - 50) : (event.clientY - 50)

					if (event.touches) {
						setTimeout(function() {
							if (settings.cursor.tool == "draw") {
								canvas.setAttribute("tool", "drawing")
								startLine(event)
							}
							else if (settings.cursor.tool == "erase") {
								eraseLines(event)
							}
							else if (settings.cursor.tool == "drag") {
								canvas.setAttribute("tool", "dragging")
								startDrag(event)
							}
							else if (settings.cursor.tool == "zoom-in") {
								zoomIn(event)
							}
							else if (settings.cursor.tool == "zoom-out") {
								zoomOut(event)
							}
							else if (settings.cursor.tool == "music") {
								playNotes(event)
							}
						}, 100)
					}
					else {
							if (settings.cursor.tool == "draw") {
								canvas.setAttribute("tool", "drawing")
								startLine(event)
							}
							else if (settings.cursor.tool == "erase") {
								eraseLines(event)
							}
							else if (settings.cursor.tool == "drag") {
								canvas.setAttribute("tool", "dragging")
								startDrag(event)
							}
							else if (settings.cursor.tool == "zoom-in") {
								zoomIn(event)
							}
							else if (settings.cursor.tool == "zoom-out") {
								zoomOut(event)
							}
							else if (settings.cursor.tool == "music") {
								playNotes(event)
							}
					}
				}
			}

		/* moveMouse */
			canvas.addEventListener(on.mousemove, moveMouse)
			function moveMouse(event) {
				if (settings.cursor) {
					settings.cursor.x = event.touches ?  event.touches[0].clientX       :  event.clientX
					settings.cursor.y = event.touches ? (event.touches[0].clientY - 50) : (event.clientY - 50)
					settings.cursor.closest.distance = getDistance(settings.cursor.x, settings.cursor.y, settings.cursor.closest.x, settings.cursor.closest.y)

					if (event.touches) {
						setTimeout(function() {
							if (settings.cursor.tool == "erase" && settings.cursor.press) {
								eraseLines(event)
							}
							else if (settings.cursor.tool == "drag" && settings.cursor.press) {
								moveDrag(event)
							}
							else if (settings.cursor.tool == "draw" && settings.cursor.since && (new Date().getTime() - settings.cursor.since < 500)) {
								settings.cursor.since = null
								pickupLine(event)
							}
							else if (settings.cursor.tool == "music" && settings.cursor.press) {
								playNotes(event)
							}
						}, 100)
					}
					else {
							if (settings.cursor.tool == "erase" && settings.cursor.press) {
								eraseLines(event)
							}
							else if (settings.cursor.tool == "drag" && settings.cursor.press) {
								moveDrag(event)
							}
							else if (settings.cursor.tool == "draw" && settings.cursor.since && (new Date().getTime() - settings.cursor.since < 500)) {
								settings.cursor.since = null
								pickupLine(event)
							}
							else if (settings.cursor.tool == "music" && settings.cursor.press) {
								playNotes(event)
							}
					}
				}
			}

		/* upMouse */	
			canvas.addEventListener(on.mouseup, upMouse)
			function upMouse(event) {
				if (settings.cursor) {
					settings.cursor.press = false
					settings.cursor.since = null

					if (settings.cursor.tool == "draw") {
						completeLine(event)
						canvas.setAttribute("tool", "draw")
					}
					else if (settings.cursor.tool == "drag") {
						endDrag(event)
						canvas.setAttribute("tool", "drag")
					}
				}
			}

	/*** drawing ***/
		/* startLine */
			function startLine(event) {
				settings.live.x = settings.cursor.closest.x
				settings.live.y = settings.cursor.closest.y
			}

		/* pickupLine */
			function pickupLine(event) {
				var x = (settings.live.x - settings.canvas.x) / settings.canvas.zoom
				var y = (settings.live.y - settings.canvas.y) / settings.canvas.zoom 

				var indeces = []
				var relevantLines = lines.filter(function(line, index) {
					if (((getDistance(line.start.x, line.start.y, x, y) < 2)
					 ||  (getDistance(line.end.x,   line.end.y,   x, y) < 2))
					 &&  (line.color == settings.cursor.color)) {
						indeces.push(index)
						return true
					}
				}) || []

				if (relevantLines.length) {
					var pickup = relevantLines[relevantLines.length - 1]
					if (getDistance(pickup.start.x, pickup.start.y, x, y) < 2) {
						settings.live.x = (pickup.end.x * settings.canvas.zoom  + settings.canvas.x)
						settings.live.y = (pickup.end.y * settings.canvas.zoom  + settings.canvas.y)
					}
					else {
						settings.live.x = (pickup.start.x * settings.canvas.zoom + settings.canvas.x)
						settings.live.y = (pickup.start.y * settings.canvas.zoom + settings.canvas.y)
					}

					lines.splice(indeces[indeces.length - 1], 1)
				}
			}

		/* completeLine */
			function completeLine(event) {
				if (settings.cursor.closest.x !== settings.live.x || settings.cursor.closest.y !== settings.live.y) {
					lines.push({
						start: {
							x: (settings.live.x - settings.canvas.x) / settings.canvas.zoom,
							y: (settings.live.y - settings.canvas.y) / settings.canvas.zoom
						},
						end: {
							x: (settings.cursor.closest.x - settings.canvas.x) / settings.canvas.zoom,
							y: (settings.cursor.closest.y - settings.canvas.y) / settings.canvas.zoom
						},
						color: settings.cursor.color
					})
				}

				settings.live.x = settings.live.y = null
			}

		/* eraseLines */
			function eraseLines(event) {
				var x = (settings.cursor.x - settings.canvas.x) / settings.canvas.zoom
				var y = (settings.cursor.y - settings.canvas.y) / settings.canvas.zoom

				findLines(x, y, function(l) {
					lines.splice(l, 1)
				})
			}

	/*** canvas ***/
		/* drawCanvas */
			function drawCanvas() {
				clearCanvas()
				drawGrid()
				drawLines()
				drawLiveLine()
			}

		/* clearCanvas */
			function clearCanvas() {
				context.clearRect(0, 0, settings.canvas.width, settings.canvas.height)
			}

		/* drawGrid */
			function drawGrid() {
				switch (settings.canvas.shape) {
					case "triangle-x":
						drawTriangles("x")
					break

					case "triangle-y":
						drawTriangles("y")
					break
					
					case "square":
						drawQuadrilaterals(1, 1)
					break
					
					case "rectangle-x":
						drawQuadrilaterals(1.5, 1)
					break
					case "rectangle-y":
						drawQuadrilaterals(1, 1.5)
					break
					
					case "hexagon-x":
						drawTriangles("x", true)
					break
					case "hexagon-y":
						drawTriangles("y", true)
					break
				}
			}

		/* drawQuadrilaterals */
			function drawQuadrilaterals(xFactor, yFactor) {
				// down & right
					for (    var y = settings.canvas.y; y < settings.canvas.height; y += (settings.canvas.spacing * yFactor) * settings.canvas.zoom) {
						for (var x = settings.canvas.x; x < settings.canvas.width;  x += (settings.canvas.spacing * xFactor) * settings.canvas.zoom) {
							drawDot(x, y)
							updateClosest(x, y)
						}
					}

				// down & left
					for (    var y = settings.canvas.y; y < settings.canvas.height; y += (settings.canvas.spacing * yFactor) * settings.canvas.zoom) {
						for (var x = settings.canvas.x; x > 0;                      x -= (settings.canvas.spacing * xFactor) * settings.canvas.zoom) {
							drawDot(x, y)
							updateClosest(x, y)
						}
					}

				// up & right
					for (    var y = settings.canvas.y; y > 0;                      y -= (settings.canvas.spacing * yFactor) * settings.canvas.zoom) {
						for (var x = settings.canvas.x; x < settings.canvas.width;  x += (settings.canvas.spacing * xFactor) * settings.canvas.zoom) {
							drawDot(x, y)
							updateClosest(x, y)
						}
					}

				// up & right
					for (    var y = settings.canvas.y; y > 0;                      y -= (settings.canvas.spacing * yFactor) * settings.canvas.zoom) {
						for (var x = settings.canvas.x; x > 0;                      x -= (settings.canvas.spacing * xFactor) * settings.canvas.zoom) {
							drawDot(x, y)
							updateClosest(x, y)
						}
					}
			}

		/* drawTriangles */
			function drawTriangles(direction, hexagon) {
				if (direction == "x") {
					// down & right
						var offset = 0
						for (var y = settings.canvas.y; y < settings.canvas.height; y += (settings.canvas.spacing * Math.pow(3, 0.5) / 2) * settings.canvas.zoom) {
							var skipCount = 2 - (offset ? 2 : 0)
							for (var x = settings.canvas.x + offset; x < settings.canvas.width; x += settings.canvas.spacing * settings.canvas.zoom) {
								if (!hexagon || skipCount) {
									drawDot(x, y)
									updateClosest(x, y)
									skipCount--
								}
								else {
									skipCount = 2
								}
							}
							offset = offset ? 0 : (settings.canvas.spacing / 2) * settings.canvas.zoom
						}

					// down & left
						var offset = 0
						for (var y = settings.canvas.y; y < settings.canvas.height; y += (settings.canvas.spacing * Math.pow(3, 0.5) / 2) * settings.canvas.zoom) {
							var skipCount = 0 + (offset ? 0 : 1)
							for (var x = settings.canvas.x + offset; x > 0; x -= settings.canvas.spacing * settings.canvas.zoom) {
								if (!hexagon || skipCount) {
									drawDot(x, y)
									updateClosest(x, y)
									skipCount--
								}
								else {
									skipCount = 2
								}
							}
							offset = offset ? 0 : (settings.canvas.spacing / 2) * settings.canvas.zoom
						}

					// up & right
						var offset = 0
						for (var y = settings.canvas.y; y > 0; y -= (settings.canvas.spacing * Math.pow(3, 0.5) / 2) * settings.canvas.zoom) {
							var skipCount = 2 - (offset ? 2 : 0)
							for (var x = settings.canvas.x + offset; x < settings.canvas.width; x += settings.canvas.spacing * settings.canvas.zoom) {
								if (!hexagon || skipCount) {
									drawDot(x, y)
									updateClosest(x, y)
									skipCount--
								}
								else {
									skipCount = 2
								}
							}
							offset = offset ? 0 : (settings.canvas.spacing / 2) * settings.canvas.zoom
						}

					// up & left
						var offset = 0
						for (var y = settings.canvas.y; y > 0; y -= (settings.canvas.spacing * Math.pow(3, 0.5) / 2) * settings.canvas.zoom) {
							var skipCount = 0 + (offset ? 0 : 1)
							for (var x = settings.canvas.x + offset; x > 0; x -= settings.canvas.spacing * settings.canvas.zoom) {
								if (!hexagon || skipCount) {
									drawDot(x, y)
									updateClosest(x, y)
									skipCount--
								}
								else {
									skipCount = 2
								}
							}
							offset = offset ? 0 : (settings.canvas.spacing / 2) * settings.canvas.zoom
						}
				}
				else if (direction == "y") {
					// down & right
						var offset = 0
						for (var x = settings.canvas.x; x < settings.canvas.width; x += (settings.canvas.spacing * Math.pow(3, 0.5) / 2) * settings.canvas.zoom) {
							var skipCount = 2 - (offset ? 0 : 1)
							for (var y = settings.canvas.y + offset; y < settings.canvas.height; y += settings.canvas.spacing * settings.canvas.zoom) {
								if (!hexagon || skipCount) {
									drawDot(x, y)
									updateClosest(x, y)
									skipCount--
								}
								else {
									skipCount = 2
								}
							}
							offset = offset ? 0 : (settings.canvas.spacing / 2) * settings.canvas.zoom
						}

					// up & right
						var offset = 0
						for (var x = settings.canvas.x; x < settings.canvas.width; x += (settings.canvas.spacing * Math.pow(3, 0.5) / 2) * settings.canvas.zoom) {
							var skipCount = 2 - (offset ? 1 : 0)
							for (var y = settings.canvas.y + offset; y > 0; y -= settings.canvas.spacing * settings.canvas.zoom) {
								if (!hexagon || skipCount) {
									drawDot(x, y)
									updateClosest(x, y)
									skipCount--
								}
								else {
									skipCount = 2
								}
							}
							offset = offset ? 0 : (settings.canvas.spacing / 2) * settings.canvas.zoom
						}

					// down & left
						var offset = 0
						for (var x = settings.canvas.x; x > 0; x -= (settings.canvas.spacing * Math.pow(3, 0.5) / 2) * settings.canvas.zoom) {
							var skipCount = 1 + (offset ? 1 : 0)
							for (var y = settings.canvas.y + offset; y < settings.canvas.height; y += settings.canvas.spacing * settings.canvas.zoom) {
								if (!hexagon || skipCount) {
									drawDot(x, y)
									updateClosest(x, y)
									skipCount--
								}
								else {
									skipCount = 2
								}
							}
							offset = offset ? 0 : (settings.canvas.spacing / 2) * settings.canvas.zoom
						}

					// up & left
						var offset = 0
						for (var x = settings.canvas.x; x > 0; x -= (settings.canvas.spacing * Math.pow(3, 0.5) / 2) * settings.canvas.zoom) {
							var skipCount = 1 + (offset ? 0 : 1)
							for (var y = settings.canvas.y + offset; y > 0; y -= settings.canvas.spacing * settings.canvas.zoom) {
								if (!hexagon || skipCount) {
									drawDot(x, y)
									updateClosest(x, y)
									skipCount--
								}
								else {
									skipCount = 2
								}
							}
							offset = offset ? 0 : (settings.canvas.spacing / 2) * settings.canvas.zoom
						}
				}
			}
		
		/* drawDot */
			function drawDot(x, y, color) {
				context.beginPath()
				context.strokeStyle = color || "gray"
				context.lineWidth = 1

				context.arc(x, y, (color ? 5 : 2), 0, 2 * Math.PI, true)
				context.stroke()
			}

		/* drawLines */
			function drawLines() {
				for (var l = 0; l < lines.length; l++) {
					drawLine((lines[l].start.x * settings.canvas.zoom + settings.canvas.x),
							 (lines[l].start.y * settings.canvas.zoom + settings.canvas.y),
							 (lines[l].end.x   * settings.canvas.zoom + settings.canvas.x),
							 (lines[l].end.y   * settings.canvas.zoom + settings.canvas.y),
							lines[l].color)
				}
			}

		/* drawLine */
			function drawLine(x1, y1, x2, y2, color) {
				drawDot(x1, y1, color)
				drawDot(x2, y2, color)

				context.beginPath()
				context.strokeStyle = color || "gray"
				context.lineWidth = 3
				
				context.moveTo(x1, y1)
				context.lineTo(x2, y2)
				context.stroke()
			}

		/* drawLiveLine */
			function drawLiveLine() {
				if (settings.cursor.tool == "draw" && settings.cursor.press && (settings.live.x !== null) && (settings.live.y !== null)) {
					if (!settings.cursor.shift) {
						drawLine(settings.live.x, settings.live.y, settings.cursor.x, settings.cursor.y, settings.cursor.color)
					}
					else {
						drawLine(settings.live.x, settings.live.y, settings.cursor.closest.x, settings.cursor.closest.y, settings.cursor.color)	
					}
				}
			}

	/*** geometry ***/
		/* updateClosest */
			function updateClosest(x, y) {
				var distance = getDistance(x, y, settings.cursor.x, settings.cursor.y)
				if (distance < settings.cursor.closest.distance) {
					settings.cursor.closest.x = x
					settings.cursor.closest.y = y
					settings.cursor.closest.distance = distance
				}
			}

		/* getDistance */
			function getDistance(x1, y1, x2, y2) {
				return Math.pow(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2), 0.5) || 0
			}

		/* findLine */
			function findLines(x, y, callback) {
				for (var l in lines) {
					if (((lines[l].start.x - 2 < x && x < lines[l].end.x + 2) || (lines[l].start.x + 2 > x && x > lines[l].end.x - 2))
					&&  ((lines[l].start.y - 2 < y && y < lines[l].end.y + 2) || (lines[l].start.y + 2 > y && y > lines[l].end.y - 2))) {
						var a = getDistance(lines[l].start.x, lines[l].start.y,              x,              y)
						var b = getDistance(               x,                y, lines[l].end.x, lines[l].end.y)
						var c = getDistance(lines[l].start.x, lines[l].start.y, lines[l].end.x, lines[l].end.y)

						if (a + b < c + 1) {
							callback(l)
						}
					}
				}
			}

	/*** zooming ***/
		/* zoomIn */
			function zoomIn(event) {
				if (settings.canvas.zoom < 8) {
					settings.canvas.x = settings.canvas.x - ((event.clientX || event.touches[0].clientX)     ) * settings.canvas.zoom
					settings.canvas.y = settings.canvas.y - ((event.clientY || event.touches[0].clientY) - 50) * settings.canvas.zoom
					settings.canvas.zoom *= 2
				}
			}

		/* zoomOut */
			function zoomOut(event) {
				if (settings.canvas.zoom > 0.25) {
					settings.canvas.zoom /= 2
					settings.canvas.x = settings.canvas.x + ((event.clientX || event.touches[0].clientX)     ) * settings.canvas.zoom
					settings.canvas.y = settings.canvas.y + ((event.clientY || event.touches[0].clientY) - 50) * settings.canvas.zoom
				}
			}

	/*** dragging ***/
		/* startDrag */
			function startDrag(event) {
				settings.live.x = settings.canvas.x -  (event.touches ? event.touches[0].clientX : event.clientX)
				settings.live.y = settings.canvas.y - ((event.touches ? event.touches[0].clientY : event.clientY) - 50)
			}

		/* moveDrag */
			function moveDrag(event) {
				settings.canvas.x = settings.live.x +  (event.touches ? event.touches[0].clientX : event.clientX)
				settings.canvas.y = settings.live.y + ((event.touches ? event.touches[0].clientY : event.clientY) - 50)
			}

		/* endDrag */
			function endDrag(event) {
				settings.live.x = settings.live.y = null
			}

	/*** music ***/
		/* buildList */
			buildList()
			function buildList() {
				var list = window.getInstruments() || []
				var instruments = document.getElementById("instrument")

				for (var l in list) {
					instruments.innerHTML += "<option value='" + list[l] + "'>" + list[l] + "</option>"
				}

				if (list.includes("honeyharp")) {
					instruments.value = "honeyharp"
				}
				else {
					instruments.value = "triangle"
				}
			}

		/* selectInstrument */
			document.getElementById("instrument").addEventListener("change", selectInstrument)
			function selectInstrument() {
				var name = document.getElementById("instrument").value || "triangle"
				var obj = window.getInstrument(name)

				if (obj) {
					window.instrument = window.buildInstrument(obj)
				}
				else {
					window.instrument = null
				}

				selectTool({target: document.getElementById("music")})
			}

		/* playNotes */
			function playNotes(event) {
				var x = (settings.cursor.x - settings.canvas.x) / settings.canvas.zoom
				var y = (settings.cursor.y - settings.canvas.y) / settings.canvas.zoom

				findLines(x, y, function(l) {
					var wavelength = getDistance(lines[l].start.x, lines[l].start.y, lines[l].end.x, lines[l].end.y)
					var frequency  = 343.2 / wavelength * 200

					window.instrument.press(frequency, 0  )
					window.instrument.lift( frequency, 0.25)
				})
			}
}