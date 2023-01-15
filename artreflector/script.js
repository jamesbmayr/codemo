/*** globals ***/
	/* triggers */
		const TRIGGERS = {
			click: "click",
			change: "change",
			resize: "resize",
			mousedown: "mousedown",
			mouseup: "mouseup",
			mousemove: "mousemove"
		}

		if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
			TRIGGERS.mousedown = "touchstart"
			TRIGGERS.mousemove = "touchmove"
			TRIGGERS.mouseup = "touchend"
		}

	/* elements */
		const ELEMENTS = {
			body: document.body,
			canvas: document.querySelector("#canvas"),
			context: document.querySelector("#canvas").getContext("2d"),
			controls: {
				element: document.querySelector("#controls"),
				background: document.querySelector("#controls-background"),
				brush: document.querySelector("#controls-brush"),
				draw: document.querySelector("#controls-draw"),
				color: document.querySelector("#controls-color"),
				opacity: document.querySelector("#controls-opacity"),
				mirror: document.querySelector("#controls-mirror"),
				undo: document.querySelector("#controls-undo"),
				download: document.querySelector("#controls-download")
			}
		}

	/* constants */
		const CONSTANTS = {
			eraserColor: "#111111",
			eraserOpacity: 0.5,
			controlsHeight: 60,
			circle: 2 * Math.PI,
			defaults: {
				background: "#dddddd",
				brush: 10,
				draw: true,
				color: "#111111",
				opacity: 1,
				mirror: 5
			}
		}

	/* state */
		const STATE = {
			mouse: false,
			controls: {
				background: CONSTANTS.defaults.background,
				brush: CONSTANTS.defaults.brush,
				draw: CONSTANTS.defaults.draw,
				color: CONSTANTS.defaults.color,
				opacity: CONSTANTS.defaults.opacity,
				mirror: CONSTANTS.defaults.mirror
			},
			dots: [],
			snapshots: [],
			drawIndex: 0
		}

/*** controls ***/
	/* background */
		ELEMENTS.controls.background.addEventListener(TRIGGERS.change, changeBackground)
		function changeBackground() {
			try {
				// update state
					STATE.controls.background = ELEMENTS.controls.background.value

				// redraw
					drawCanvas(true)
			} catch (error) {console.log(error)}
		}

	/* brush */
		ELEMENTS.controls.brush.addEventListener(TRIGGERS.change, changeBrush)
		function changeBrush() {
			try {
				// update state
					STATE.controls.brush = Number(ELEMENTS.controls.brush.value) || 1

				// redraw
					drawCanvas(true)
			} catch (error) {console.log(error)}
		}

	/* draw */
		ELEMENTS.controls.draw.addEventListener(TRIGGERS.change, changeDraw)
		function changeDraw() {
			try {
				// update state
					STATE.controls.draw = ELEMENTS.controls.draw.checked || false

				// redraw
					drawCanvas(true)
			} catch (error) {console.log(error)}
		}

	/* color */
		ELEMENTS.controls.color.addEventListener(TRIGGERS.change, changeColor)
		function changeColor() {
			try {
				// update state
					STATE.controls.color = ELEMENTS.controls.color.value

				// redraw
					drawCanvas(true)
			} catch (error) {console.log(error)}
		}

	/* opacity */
		ELEMENTS.controls.opacity.addEventListener(TRIGGERS.change, changeOpacity)
		function changeOpacity() {
			try {
				// update state
					STATE.controls.opacity = Number(ELEMENTS.controls.opacity.value) || 0

				// redraw
					drawCanvas(true)
			} catch (error) {console.log(error)}
		}

	/* mirror */
		ELEMENTS.controls.mirror.addEventListener(TRIGGERS.change, changeMirror)
		function changeMirror() {
			try {
				// update state
					STATE.controls.mirror = Number(ELEMENTS.controls.mirror.value) || 1

				// redraw
					drawCanvas(true)
			} catch (error) {console.log(error)}
		}

	/* undo */
		ELEMENTS.controls.undo.addEventListener(TRIGGERS.click, revertSnapshot)
		function revertSnapshot() {
			try {
				// no snapshots
					if (!STATE.snapshots.length) {
						return
					}

				// load last snapshot
					const lastSnapshot = STATE.snapshots[STATE.snapshots.length - 1] || "[]"
					STATE.dots = JSON.parse(lastSnapshot)
					STATE.snapshots.pop()

				// redraw
					drawCanvas(true)
			} catch (error) {console.log(error)}
		}

	/* download */
		ELEMENTS.controls.download.addEventListener(TRIGGERS.click, downloadDrawing)
		function downloadDrawing() {
			try {
				// package up
					const downloadLink = document.createElement("a")
						downloadLink.id = "download-link"
						downloadLink.setAttribute("href", ELEMENTS.canvas.toDataURL("image/png"))
						downloadLink.setAttribute("download", "artReflector_" + (new Date().getTime()) + ".png")
						downloadLink.addEventListener(TRIGGERS.click, function() {
							ELEMENTS.body.removeChild(downloadLink)
						})
				
				// click
					ELEMENTS.body.appendChild(downloadLink)
					downloadLink.click()
			} catch (error) {console.log(error)}
		}

/*** mouse ***/
	/* downMouse */
		window.addEventListener(TRIGGERS.mousedown, downMouse)
		function downMouse(event) {
			try {
				// non-canvas target
					if (event.target && event.target !== ELEMENTS.canvas) {
						return
					}

				// save snapshot
					const snapshot = JSON.stringify(STATE.dots)
					STATE.snapshots.push(snapshot)

				// set state
					STATE.mouse = true
					moveMouse(event)
			} catch (error) {console.log(error)}
		}

	/* upMouse */
		window.addEventListener(TRIGGERS.mouseup, upMouse)
		function upMouse(event) {
			try {
				// non-canvas target
					if (event.target && event.target !== ELEMENTS.canvas) {
						return
					}

				// set state
					STATE.mouse = false
			} catch (error) {console.log(error)}
		}

	/* moveMouse */
		window.addEventListener(TRIGGERS.mousemove, moveMouse)
		function moveMouse(event) {
			try {
				// activeElement
					if (document.activeElement && document.activeElement !== ELEMENTS.body) {
						return
					}

				// mouse down?
					if (!STATE.mouse) {
						return
					}

				// get coordinates
					const x = (event.touches ? event.touches[0].clientX : event.clientX)
					const y = (event.touches ? event.touches[0].clientY : event.clientY) * -1 + window.innerHeight

				// drawing?
					if (STATE.controls.draw) {
						addDot(x, y)
						return
					}

				// erasing
					removeDots(x, y)
			} catch (error) {console.log(error)}
		}

/*** dots ***/
	/* addDot */
		function addDot(x, y) {
			try {
				// add to list
					STATE.dots.push({
						x: x - ELEMENTS.canvas.width / 2,
						y: y - ELEMENTS.canvas.height / 2,
						radius: STATE.controls.brush,
						color: STATE.controls.color,
						opacity: STATE.controls.opacity
					})

				// draw
					drawCanvas()
			} catch (error) {console.log(error)}
		}

	/* removeDots */
		function removeDots(x, y) {
			try {
				// calculate positions of all erasers
					const erasers = []
					const angle = CONSTANTS.circle / STATE.controls.mirror

					for (let m = 0; m < STATE.controls.mirror; m++) {
						erasers[m] = {
							x: (x - ELEMENTS.canvas.width / 2) * Math.cos(m * -angle) - (y - ELEMENTS.canvas.height / 2) * Math.sin(m * angle),
							y: (y - ELEMENTS.canvas.height / 2) * Math.cos(m * angle) - (x - ELEMENTS.canvas.width / 2) * Math.sin(m * -angle),
						}
					}

				// find all dots within brush radius
					dotLoop: for (let d = 0; d < STATE.dots.length; d++) {
						const dot = STATE.dots[d]
						
						eraserLoop: for (let e in erasers) {
							const eraser = erasers[e]
							const distance = Math.pow(Math.pow(eraser.x - dot.x, 2) + Math.pow(eraser.y - dot.y, 2), 0.5)
							
							if (distance <= dot.radius + STATE.controls.brush) {
								STATE.dots.splice(d, 1)
								d--
								break eraserLoop
							}
						}
					}

				// redraw
					drawCanvas(true)

				// draw erasers
					for (let e in erasers) {
						drawCircle({
							x: erasers[e].x,
							y: erasers[e].y,
							radius: STATE.controls.brush,
							color: CONSTANTS.eraserColor,
							opacity: CONSTANTS.eraserOpacity
						})
					}
			} catch (error) {console.log(error)}
		}

/*** canvas ***/
	/* resizeCanvas */
		resizeCanvas()
		window.addEventListener(TRIGGERS.resize, resizeCanvas)
		function resizeCanvas() {
			try {
				// canvas
					ELEMENTS.canvas.height = window.innerHeight - CONSTANTS.controlsHeight
					ELEMENTS.canvas.width = window.innerWidth

				// controlsHeight
					if (window.innerWidth <= 600) {
						CONSTANTS.controlsHeight = 110
					}
					else {
						CONSTANTS.controlsHeight = 60
					}

				// redraw
					drawCanvas(true)
			} catch (error) {console.log(error)}
		}

	/* clearCanvas */
		function clearCanvas() {
			try {
				// canvas
					ELEMENTS.context.clearRect(0, 0, ELEMENTS.canvas.width, ELEMENTS.canvas.height)
			} catch (error) {console.log(error)}
		}

	/* rotateCanvas */
		function rotateCanvas(angle, callback) {
			try {
				// rotate
					ELEMENTS.context.translate(ELEMENTS.canvas.width / 2, ELEMENTS.canvas.height / 2)
					ELEMENTS.context.rotate(angle)
					ELEMENTS.context.translate(-ELEMENTS.canvas.width / 2, -ELEMENTS.canvas.height / 2)

				// do whatever
					callback()

				// rotate back
					ELEMENTS.context.translate(ELEMENTS.canvas.width / 2, ELEMENTS.canvas.height / 2)
					ELEMENTS.context.rotate(-angle)
					ELEMENTS.context.translate(-ELEMENTS.canvas.width / 2, -ELEMENTS.canvas.height / 2)
			} catch (error) {console.log(error)}
		}

	/* drawCanvas */
		function drawCanvas(reset) {
			try {
				// clear
					if (reset) {
						// clear
							clearCanvas()

						// background
							drawRectangle({
								x: -ELEMENTS.canvas.width / 2,
								y: ELEMENTS.canvas.height / 2,
								width: ELEMENTS.canvas.width,
								height: ELEMENTS.canvas.height,
								color: STATE.controls.background,
								opacity: 1
							})

						// reset draw index
							STATE.drawIndex = 0
					}

				// angle
					const angle = CONSTANTS.circle / STATE.controls.mirror

				// draw dots
					while (STATE.drawIndex < STATE.dots.length) {
						for (let m = 0; m < STATE.controls.mirror; m++) {
							rotateCanvas(m * angle, function() {
								drawCircle(STATE.dots[STATE.drawIndex])
							})
						}
						STATE.drawIndex++
					}
			} catch (error) {console.log(error)}
		}

	/* drawRectangle */
		function drawRectangle(options) {
			try {
				// parameters
					options = options || {}
					ELEMENTS.context.beginPath()
					ELEMENTS.context.fillStyle = options.color || "transparent"
					ELEMENTS.context.globalAlpha = options.opacity || 0

				// draw
					ELEMENTS.context.fillRect(ELEMENTS.canvas.width / 2 + options.x, ELEMENTS.canvas.height / 2 - options.y, options.width, options.height)
			} catch (error) {console.log(error)}
		}

	/* drawCircle */
		function drawCircle(options) {
			try {
				// parameters
					options = options || {}
					ELEMENTS.context.beginPath()
					ELEMENTS.context.fillStyle = options.color || "transparent"
					ELEMENTS.context.globalAlpha = options.opacity || 0

				// draw
					ELEMENTS.context.moveTo(ELEMENTS.canvas.width / 2 + options.x, ELEMENTS.canvas.height / 2 - options.y)
					ELEMENTS.context.arc(ELEMENTS.canvas.width / 2 + options.x, ELEMENTS.canvas.height / 2 - options.y, options.radius, 0, CONSTANTS.circle)
					ELEMENTS.context.closePath()
					ELEMENTS.context.fill()
			} catch (error) {console.log(error)}
		}
