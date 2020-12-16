window.onload = function() {
	/*** globals ***/
		/* triggers */
			if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
				var TRIGGERS = { resize: "resize", input: "input", click: "touchstart", mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" }
			}
			else {
				var TRIGGERS = { resize: "resize", input: "input", click:      "click", mousedown:  "mousedown", mousemove: "mousemove", mouseup:  "mouseup" }
			}

		/* defaults */
			document.addEventListener("dblclick", function(event) {
				event.preventDefault()
			})

		/* constants */
			var CONSTANTS = {
				minimumSize: 100,
				rangeEdge: 2,
				buttonRadius: 20,
				lineThickness: 3,
				defaultBackground: "#111111",
				blur: 1
			}

		/* elements */
			var ELEMENTS = {
				body: document.body,
				inputX: document.querySelector("#input-x"),
				inputY: document.querySelector("#input-y"),
				inputBackground: document.querySelector("#input-background"),
				inputColor: document.querySelector("#input-color"),
				inputBrush: document.querySelector("#input-brush"),
				inputReset: document.querySelector("#input-reset"),
				inputDownload: document.querySelector("#input-download"),
				inputDraw: document.querySelector("#input-draw"),
				inputContext: document.querySelector("#input-draw").getContext("2d"),
				mirror: document.querySelector("#mirror"),
				mirrorContext: document.querySelector("#mirror").getContext("2d")
			}

		/* drawing */
			var DRAWING = {
				drawing: false,
				color: null,
				background: null,
				brush: null,
				cursor: {
					x: null,
					y: null
				},
				timeout: null,
				lines: []
			}

	/*** options ***/
		/* adjustScreen */
			window.addEventListener(TRIGGERS.resize, adjustScreen)
			adjustScreen()
			function adjustScreen(event) {
				try {
					// resize inputs
						ELEMENTS.inputX.max = window.innerWidth - CONSTANTS.rangeEdge * 2
						ELEMENTS.inputX.style.width = window.innerWidth + "px"
						if (Number(ELEMENTS.inputX.value) > Number(ELEMENTS.inputX.max)) {
							ELEMENTS.inputX.value = Number(ELEMENTS.inputX.max)
						}

						ELEMENTS.inputY.max = window.innerHeight - CONSTANTS.rangeEdge * 2
						ELEMENTS.inputY.style.width = window.innerHeight + "px"
						if (Number(ELEMENTS.inputY.value) > Number(ELEMENTS.inputY.max)) {
							ELEMENTS.inputY.value = Number(ELEMENTS.inputY.max)
						}

					// adjust size of mirror
						ELEMENTS.mirror.height = window.innerHeight
						ELEMENTS.mirror.width = window.innerWidth

					// adjust size of input canvas
						adjustSize()
				} catch (error) {}
			}

		/* adjustSize */
			ELEMENTS.inputX.addEventListener(TRIGGERS.input, adjustSize)
			ELEMENTS.inputY.addEventListener(TRIGGERS.input, adjustSize)
			function adjustSize() {
				try {
					// get sizes
						var x = Number(ELEMENTS.inputX.value || 0)
						var y = Number(ELEMENTS.inputY.value || 0)

					// check minimum
						if (x < CONSTANTS.minimumSize) {
							ELEMENTS.inputX.value = x = CONSTANTS.minimumSize
						}

						if (y < CONSTANTS.minimumSize) {
							ELEMENTS.inputY.value = y = CONSTANTS.minimumSize
						}

					// update sizes
						ELEMENTS.inputDraw.height = y
						ELEMENTS.inputDraw.width  = x

					// update CSS
						ELEMENTS.inputDraw.style.height = y + "px"
						ELEMENTS.inputDraw.style.width  = x + "px"
						
						ELEMENTS.inputBackground.style.bottom = y + "px"
						ELEMENTS.inputBackground.style.left = x - 4 * CONSTANTS.buttonRadius + "px"
						ELEMENTS.inputColor.style.bottom = y + "px"
						ELEMENTS.inputColor.style.left = x - 2 * CONSTANTS.buttonRadius + "px"
						ELEMENTS.inputBrush.style.bottom = y + "px"
						ELEMENTS.inputBrush.style.left = x + "px"
						
						ELEMENTS.inputReset.style.bottom = y - 2 * CONSTANTS.buttonRadius + "px"
						ELEMENTS.inputReset.style.left = x + "px"
						ELEMENTS.inputDownload.style.bottom = y - 4 * CONSTANTS.buttonRadius + "px"
						ELEMENTS.inputDownload.style.left = x + "px"

					// redraw
						if (DRAWING.timeout) {
							clearTimeout(DRAWING.timeout)
						}
						DRAWING.timeout = setTimeout(drawPattern, 0)
				} catch (error) {}
			}

		/* adjustBackground */
			ELEMENTS.inputBackground.addEventListener(TRIGGERS.input, adjustBackground)
			adjustBackground()
			function adjustBackground(event) {
				try {
					// set color
						DRAWING.background = ELEMENTS.inputBackground.value

					// set body background
						ELEMENTS.body.style.background = DRAWING.background

					// redraw
						drawPattern()
				} catch (error) {}
			}

		/* adjustColor */
			ELEMENTS.inputColor.addEventListener(TRIGGERS.input, adjustColor)
			adjustColor()
			function adjustColor(event) {
				try {
					// set color
						DRAWING.color = ELEMENTS.inputColor.value
				} catch (error) {}
			}

		/* adjustBrush */
			ELEMENTS.inputBrush.addEventListener(TRIGGERS.input, adjustBrush)
			adjustBrush()
			function adjustBrush(event) {
				try {
					// set color
						DRAWING.brush = Number(ELEMENTS.inputBrush.value)
				} catch (error) {}
			}

	/*** drawing ***/
		/* startDrawing */
			ELEMENTS.inputDraw.addEventListener(TRIGGERS.mousedown, startDrawing)
			function startDrawing(event) {
				try {
					// set status
						DRAWING.drawing = true
						ELEMENTS.body.setAttribute("drawing", true)

					// new line
						DRAWING.lines.unshift({color: DRAWING.color, brush: DRAWING.brush, points: []})
				} catch (error) {}
			}

		/* keepDrawing */
			ELEMENTS.inputDraw.addEventListener(TRIGGERS.mousemove, keepDrawing)
			function keepDrawing(event) {
				try {
					// drawing?
						if (!DRAWING.drawing) {
							return false
						}

					// get relative position
						var rect = ELEMENTS.inputDraw.getBoundingClientRect()

						var x = Number(event.touches ? event.touches[0].clientX : event.clientX)
						var y = Number(event.touches ? event.touches[0].clientY : event.clientY)

					// update cursor
						DRAWING.cursor.x =                             (((x - rect.left) / rect.width) * ELEMENTS.inputDraw.width)
						DRAWING.cursor.y = ELEMENTS.inputDraw.height - (((y - rect.top) / rect.height) * ELEMENTS.inputDraw.height)

					// add to lines
						DRAWING.lines[0].points.push({
							x: DRAWING.cursor.x,
							y: DRAWING.cursor.y
						})

					// draw pattern
						if (DRAWING.timeout) {
							clearTimeout(DRAWING.timeout)
						}
						DRAWING.timeout = setTimeout(drawPattern, 0)
				} catch (error) {}
			}

		/* stopDrawing */
			document.addEventListener(TRIGGERS.mouseup, stopDrawing)
			function stopDrawing(event) {
				try {
					// set status
						DRAWING.drawing = false
						ELEMENTS.body.removeAttribute("drawing", true)
				} catch (error) {}
			}

		/* resetDrawing */
			ELEMENTS.inputReset.addEventListener(TRIGGERS.click, resetDrawing)
			function resetDrawing(event) {
				try {
					// set status
						DRAWING.drawing = false
						ELEMENTS.body.removeAttribute("drawing", true)

					// clear
						DRAWING.lines = []
						ELEMENTS.inputReset.blur()

					// redraw
						if (DRAWING.timeout) {
							clearTimeout(DRAWING.timeout)
						}
						DRAWING.timeout = setTimeout(drawPattern, 0)
				} catch (error) {}
			}

		/* downloadDrawing */
			ELEMENTS.inputDownload.addEventListener(TRIGGERS.click, downloadDrawing)
			function downloadDrawing(event) {
				try {
					// package up
						var exportLink = document.createElement("a")
							exportLink.id = "export-link"
							exportLink.setAttribute("href", ELEMENTS.mirror.toDataURL("image/png"))
							exportLink.setAttribute("download", "sketchTiler_" + (new Date().getTime()) + ".png")
							exportLink.addEventListener("click", function(event) {
								var exportLink = event.target
								ELEMENTS.body.removeChild(exportLink)
							})
				
					// click
						ELEMENTS.body.appendChild(exportLink)
						exportLink.click()
				} catch (error) {}
			}

	/*** canvas ***/
		/* clearCanvas */
			function clearCanvas(canvas, context, options) {
				try {
					// empty given context
						context.clearRect(0, 0, canvas.width, canvas.height)

					// fill background
						context.fillStyle = options.color !== null ? options.color : CONSTANTS.defaultBackground
						context.fillRect(0, 0, canvas.width, canvas.height)
				} catch (error) {}
			}

		/* drawLine */
			function drawLine(canvas, context, pointA, pointB, options) {
				try {
					// set options
						options = options || {}
						context.beginPath()
						context.strokeStyle = options.color || "transparent"
						context.lineWidth   = options.border || 1
						context.shadowBlur  = options.blur ? options.blur : 0
						context.shadowColor = options.shadow ? options.shadow : "transparent"
						context.globalAlpha = options.opacity || 1

					// draw
						context.moveTo(pointA.x, canvas.height - pointA.y)
						context.lineTo(pointB.x, canvas.height - pointB.y)
						context.stroke()
				} catch (error) {}
			}

		/* drawSection */
			function drawSection(canvas, context, sectionWidth, sectionHeight, offsetX, offsetY) {
				try {
					// loop through lines
						for (var i = 0; i < DRAWING.lines.length; i++) {
							var points = DRAWING.lines[i].points
							for (var j = 1; j < points.length; j++) {
								// out of bounds ?
									if ((0 > points[j - 1].x || points[j - 1].x > sectionWidth)
									 || (0 > points[j - 1].y || points[j - 1].y > sectionHeight)
									 || (0 > points[j].x     || points[j].x     > sectionWidth)
									 || (0 > points[j].y     || points[j].y     > sectionHeight)) {
										continue
									}

								// adjust by offset
									drawLine(canvas, context, {
										x: points[j - 1].x + offsetX,
										y: points[j - 1].y + offsetY
									}, {
										x: points[j].x + offsetX,
										y: points[j].y + offsetY
									}, {color: DRAWING.lines[i].color, border: DRAWING.lines[i].brush, blur: CONSTANTS.blur, shadow: DRAWING.lines[i].color})
							}
						}
				} catch (error) {}
			}

		/* drawPattern */
			function drawPattern() {
				try {
					// get section size
						var sectionWidth = Number(ELEMENTS.inputDraw.width)
						var sectionHeight = Number(ELEMENTS.inputDraw.height)

					// input
						clearCanvas(ELEMENTS.inputDraw, ELEMENTS.inputContext, {color: DRAWING.background})
						drawSection(ELEMENTS.inputDraw, ELEMENTS.inputContext, sectionWidth, sectionHeight, 0, 0)

					// clear mirror
						clearCanvas(ELEMENTS.mirror, ELEMENTS.mirrorContext, {color: DRAWING.background})

					// loop through repeats
						for (var y = 0; y < window.innerHeight; y += sectionHeight) {
							for (var x = 0; x < window.innerWidth; x += sectionWidth) {
								drawSection(ELEMENTS.mirror, ELEMENTS.mirrorContext, sectionWidth, sectionHeight, x, y)
							}
						}
				} catch (error) {}
			}
}