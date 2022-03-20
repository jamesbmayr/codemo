/*** globals ***/
	/* triggers */
		const TRIGGERS = {
			click: "click",
			resize: "resize",
			change: "change",
			input: "input",
			mousedown: "mousedown",
			mouseup: "mouseup",
			mousemove: "mousemove"
		}

		if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
			TRIGGERS.click = "touchstart"
			TRIGGERS.mousedown = "touchstart"
			TRIGGERS.mousemove = "touchmove"
			TRIGGERS.mouseup = "touchend"
		}

	/* elements */
		const ELEMENTS = {
			configs: document.querySelector("#configs"),
			upload: document.querySelector("#upload"),
			download: document.querySelector("#download"),
			undo: document.querySelector("#undo"),
			optionStroke: document.querySelector("#option-stroke"),
			optionOpacity: document.querySelector("#option-opacity"),
			optionBlur: document.querySelector("#option-blur"),
			optionColor: document.querySelector("#option-color"),
			downloadLink: document.querySelector("#download-link"),
			message: document.querySelector("#message"),
			canvas: document.querySelector("#canvas"),
			context: document.querySelector("#canvas").getContext("2d"),
			blurCanvas: document.querySelector("#blur-canvas"),
			blurContext: document.querySelector("#blur-canvas").getContext("2d")
		}

	/* constants */
		const CONSTANTS = {
			circle: 2 * Math.PI,
			blurReplaceOpacity: 0.5,
			blurReplaceBlur: 0.05
		}

	/* state */
		const STATE = {
			drawing: false,
			stroke: 0.05, // percent of whole picture
			opacity: 0.5,
			blur: 0.05,
			color: "#04b1ff",
			image: null,
			transformations: []
		}

/*** file ***/
	/* uploadImage */
		ELEMENTS.upload.addEventListener(TRIGGERS.change, uploadImage)
		function uploadImage(event) {
			try {
				// get file
					let file = ELEMENTS.upload.files[0]

				// no file
					if (!file) {
						return
					}

				// hide message
					ELEMENTS.message.style.display = "none"

				// read file
					let reader = new FileReader()
						reader.onload = function(event) {
							let image = new Image
								image.onload = function() {
									STATE.image = image
									STATE.transformations = [STATE.image]
									resizeCanvas(ELEMENTS.canvas, ELEMENTS.context, STATE.image)
								}
								image.src = event.target.result
							ELEMENTS.upload.value = null
						}
						reader.readAsDataURL(file)
			} catch (error) {console.log(error)}
		}

	/* downloadImage */
		ELEMENTS.download.addEventListener(TRIGGERS.click, downloadImage)
		function downloadImage(event) {
			try {
				// no image
					if (!STATE.image) {
						return
					}

				// get current image
					let data = ELEMENTS.canvas.toDataURL("image/png")

				// download link
					ELEMENTS.downloadLink.setAttribute("href", data)
					ELEMENTS.downloadLink.setAttribute("download", "imageRedactor_" + (new Date().getTime()) + ".png")

				// download
					ELEMENTS.downloadLink.click()

				// blur
					ELEMENTS.downloadLink.blur()
			} catch (error) {console.log(error)}
		}

	/* undoImage */
		ELEMENTS.undo.addEventListener(TRIGGERS.click, undoImage)
		function undoImage(event) {
			try {
				// clear
					clearCanvas(ELEMENTS.canvas, ELEMENTS.context)

				// no image?
					if (!STATE.image) {
						return
					}

				// remove previous state
					if (STATE.transformations.length > 1) {
						STATE.transformations.pop()
					}

				// draw previous state
					drawImage(ELEMENTS.canvas, ELEMENTS.context, STATE.transformations[STATE.transformations.length - 1])
			} catch (error) {console.log(error)}
		}

/*** options ***/
	/* setOptions */
		setOptions()
		function setOptions() {
			try {
				// set values based on default state
					ELEMENTS.optionStroke.value = STATE.stroke
					ELEMENTS.optionOpacity.value = STATE.opacity
					ELEMENTS.optionBlur.value = STATE.blur
					ELEMENTS.optionColor.value = STATE.color
			} catch (error) {console.log(error)}
		}

	/* changeStroke */
		ELEMENTS.optionStroke.addEventListener(TRIGGERS.input, changeStroke)
		function changeStroke(event) {
			try {
				// store value
					STATE.stroke = Number(ELEMENTS.optionStroke.value)
			} catch (error) {console.log(error)}
		}

	/* changeOpacity */
		ELEMENTS.optionOpacity.addEventListener(TRIGGERS.input, changeOpacity)
		function changeOpacity(event) {
			try {
				// store value
					STATE.opacity = Number(ELEMENTS.optionOpacity.value)
			} catch (error) {console.log(error)}
		}

	/* changeBlur */
		ELEMENTS.optionBlur.addEventListener(TRIGGERS.input, changeBlur)
		function changeBlur(event) {
			try {
				// store value
					STATE.blur = Number(ELEMENTS.optionBlur.value)
			} catch (error) {console.log(error)}
		}

	/* changeColor */
		ELEMENTS.optionColor.addEventListener(TRIGGERS.input, changeColor)
		function changeColor(event) {
			try {
				// store value
					STATE.color = ELEMENTS.optionColor.value
			} catch (error) {console.log(error)}
		}

/*** interaction ***/
	/* downMouse */
		window.addEventListener(TRIGGERS.mousedown, downMouse)
		function downMouse(event) {
			try {
				// button click
					if (event.target !== ELEMENTS.canvas && event.target !== document.body) {
						return
					}

				// no image
					if (!STATE.image) {
						return
					}

				// set mouse state
					STATE.drawing = true
					moveMouse(event)
			} catch (error) {console.log(error)}
		}

	/* upMouse */
		window.addEventListener(TRIGGERS.mouseup, upMouse)
		function upMouse(event) {
			try {
				// not drawing
					if (!STATE.drawing) {
						return
					}

				// set mouse state
					STATE.drawing = false

				// no image
					if (!STATE.image) {
						return
					}

				// store current state
					let image = new Image()
						image.onload = function() {
							STATE.transformations.push(image)
						}
						image.src = ELEMENTS.canvas.toDataURL("image/png")
			} catch (error) {console.log(error)}
		}

	/* moveMouse */
		window.addEventListener(TRIGGERS.mousemove, moveMouse)
		function moveMouse(event) {
			try {
				// no image
					if (!STATE.image) {
						return
					}

				// not drawing
					if (!STATE.drawing) {
						return
					}

				// get position relative to image
					let x = event.touches ? event.touches[0].clientX : event.clientX
					let y = event.touches ? event.touches[0].clientY : event.clientY

				// get boundaries
					let rect = ELEMENTS.canvas.getBoundingClientRect()
					if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
						return
					}

				// get inner coordinates
					let innerX = (x - rect.left) / rect.width  * STATE.image.width
					let innerY = (y - rect.top)  / rect.height * STATE.image.height

				// draw dot
					drawDot(ELEMENTS.canvas, ELEMENTS.context, STATE.image, innerX, innerY)
			} catch (error) {console.log(error)}
		}

/*** canvas ***/
	/* resizeCanvas */
		function resizeCanvas(canvas, context, image) {
			try {
				// get image dimensions
					let imageRatio = ((image.width || 1) / (image.height || 1)) || 1

				// set ratio
					ELEMENTS.configs.innerText = ":root {--image-ratio: " + imageRatio + " }"

				// resize canvas
					canvas.width  = image.width
					canvas.height = image.height

				// redraw canvas
					clearCanvas(canvas, context)
					drawImage(canvas, context, image)
			} catch (error) {console.log(error)}
		}

	/* clearCanvas */
		function clearCanvas(canvas, context) {
			try {
				// reset state
					context.filter = "none"
					context.globalAlpha = 1

				// clear
					context.clearRect(0, 0, canvas.width, canvas.height)
			} catch (error) {console.log(error)}
		}

	/* drawImage */
		function drawImage(canvas, context, image, coordinates) {
			try {
				// coordinates
					if (!coordinates) {
						coordinates = {
							x: 0,
							y: 0
						}
					}

				// image data
					if (image && image.data) {
						context.putImageData(image, coordinates.x, coordinates.y)
						return
					}

				// image
					if (image) {
						context.drawImage(image, coordinates.x, coordinates.y)
					}
			} catch (error) {console.log(error)}
		}

	/* drawDot */
		function drawDot(canvas, context, image, x, y) {
			try {
				// get average side
					let sideLength = (image.width + image.height) / 2

				// get radius
					let strokeRadius = STATE.stroke / 2
						strokeRadius *= sideLength
					let blurRadius = STATE.blur / 2
						blurRadius *= sideLength

				// set color and opacity
					context.fillStyle = STATE.color
					context.globalAlpha = STATE.opacity

				// color blur
					context.filter = blurRadius ? "blur(" + blurRadius + "px)" : "none"

				// draw
					context.beginPath()
					context.arc(x, y, strokeRadius, 0, CONSTANTS.circle)
					context.fill()

				// meta blur
					if (blurRadius) {
						// extract square
							let topLeftX = x - blurRadius
							let topLeftY = y - blurRadius
							let blurDiameter = blurRadius * 2
							let areaData = context.getImageData(topLeftX, topLeftY, blurDiameter, blurDiameter)

						// resize blur canvas to square
							clearCanvas(ELEMENTS.blurCanvas, ELEMENTS.blurContext)
							ELEMENTS.blurCanvas.width  = blurDiameter
							ELEMENTS.blurCanvas.height = blurDiameter

						// draw image as-is
							ELEMENTS.blurContext.arc(blurRadius, blurRadius, blurRadius, 0, CONSTANTS.circle)
							ELEMENTS.blurContext.stroke()
							ELEMENTS.blurContext.clip()
							drawImage(ELEMENTS.blurCanvas, ELEMENTS.blurContext, areaData)

						// blur and redraw
							ELEMENTS.blurContext.filter = "blur(" + blurRadius + "px)"
							drawImage(ELEMENTS.blurCanvas, ELEMENTS.blurContext, ELEMENTS.blurCanvas)

						// overwrite
							context.globalAlpha = CONSTANTS.blurReplaceOpacity * STATE.opacity
							context.filter = "blur(" + (blurRadius * CONSTANTS.blurReplaceBlur) + "px)"
							drawImage(ELEMENTS.canvas, ELEMENTS.context, ELEMENTS.blurCanvas, {x: topLeftX, y: topLeftY})
					}
			} catch (error) {console.log(error)}
		}
