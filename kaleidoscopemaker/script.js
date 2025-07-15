/*** globals ***/
	/* triggers */
		const TRIGGERS = {
			input: "input",
			click: "click",
			resize: "resize",
			contextmenu: "contextmenu",
			dragover: "dragover",
			drop: "drop"
		}

	/* elements */
		const ELEMENTS = {
			canvas: document.querySelector("#canvas"),
			context: document.querySelector("#canvas").getContext("2d"),
			uploadCenter: document.querySelector("#upload-center"),
			menu: {
				upload: document.querySelector("#menu-upload"),
				uploadSpan: document.querySelector("#menu-upload-span"),
				kaleidoscope: {
					background: document.querySelector("#menu-kaleidoscope-background"),
					shape: document.querySelector("#menu-kaleidoscope-shape"),
					rotation: document.querySelector("#menu-kaleidoscope-rotation"),
					rotationRange: document.querySelector("#menu-kaleidoscope-rotation-range"),
					scale: document.querySelector("#menu-kaleidoscope-scale"),
					scaleRange: document.querySelector("#menu-kaleidoscope-scale-range")
				},
				image: {
					rotation: document.querySelector("#menu-image-rotation"),
					rotationRange: document.querySelector("#menu-image-rotation-range"),
					scale: document.querySelector("#menu-image-scale"),
					scaleRange: document.querySelector("#menu-image-scale-range"),
					translateX: document.querySelector("#menu-image-translate-x"),
					translateXRange: document.querySelector("#menu-image-translate-x-range"),
					translateY: document.querySelector("#menu-image-translate-y"),
					translateYRange: document.querySelector("#menu-image-translate-y-range"),
					crop: document.querySelector("#menu-image-crop"),
					cropRange: document.querySelector("#menu-image-crop-range")
				},
				download: document.querySelector("#menu-download")
			}
		}

	/* constants */
		const CONSTANTS = {
			panelRadius: 100, // px
			percent: 100, // %
			triangleBaseHeightRatio: 2 / (3 ** (1 / 2)), // ratio
			triangleCenterOffsetFactor: -1 / 3, // ratio
			circleDegrees: 360, // °
			circleRadians: 2 * Math.PI, // radians
			defaultShape: "triangle",
			shapes: ["triangle", "square", "rectangle"],
			defaultBackground: "#000000", // hex
			defaultKaleidoscopeScale: 150, // %
			defaultImageScale: 50, // %
			imageTypes: ["image/png", "image/jpeg", "image/jpg", "image/gif", "image/webp", "image/bmp", "image/tiff", "image/svg+xml"],
		}

	/* state */
		const STATE = {
			imageData: null,
			kaleidoscope: {
				background: CONSTANTS.defaultBackground, // hex
				shape: CONSTANTS.defaultShape,
				rotation: 0, // °
				scale: CONSTANTS.defaultKaleidoscopeScale // %
			},
			image: {
				rotation: 0, // °
				scale: CONSTANTS.defaultImageScale, // %
				translateX: 0, // %
				translateY: 0, // %
				crop: 0 // %
			}
		}

/*** menu ***/
	/* right click */
		window.addEventListener(TRIGGERS.contextmenu, rightClick)
		function rightClick(event) {
			try {
				event.preventDefault()
			} catch (error) {console.log(error)}
		}
		
	/* clickUpload */
		ELEMENTS.uploadCenter.addEventListener(TRIGGERS.click, clickUpload)
		function clickUpload(event) {
			try {
				// trigger upload image
					ELEMENTS.menu.uploadSpan.click()
			} catch (error) {console.log(error)}
		}

	/* uploadImage */
		ELEMENTS.menu.upload.addEventListener(TRIGGERS.input, uploadImage)
		function uploadImage(event) {
			try {
				// file
					const file = ELEMENTS.menu.upload.files[0]
					if (!file) {
						return
					}

				// remove element
					if (ELEMENTS.uploadCenter) {
						ELEMENTS.uploadCenter.remove()
					}

				// read file
					const reader = new FileReader()
						reader.onload = function(event) {
							const image = new Image
								image.onload = function() {
									STATE.imageData = image
									drawKaleidoscope()
								}
								image.src = event.target.result
							ELEMENTS.menu.upload.value = null
							ELEMENTS.menu.upload.blur()
						}
						reader.readAsDataURL(file)
			} catch (error) {console.log(error)}
		}

	/* dragImage */
		ELEMENTS.uploadCenter.addEventListener(TRIGGERS.dragover, dragImage)
		ELEMENTS.canvas.addEventListener(TRIGGERS.dragover, dragImage)
		function dragImage(event) {
			try {
				event.preventDefault()
			} catch (error) {console.log(error)}
		}

	/* dropImage */
		ELEMENTS.uploadCenter.addEventListener(TRIGGERS.drop, dropImage)
		ELEMENTS.canvas.addEventListener(TRIGGERS.drop, dropImage)
		function dropImage(event) {
			try {
				// defaults
					event.preventDefault()
					if (!event.dataTransfer || !event.dataTransfer.items) {
						return
					}

				// file
					const file = [...event.dataTransfer.items][0].getAsFile()
					if (!file) {
						return
					}
					if (!CONSTANTS.imageTypes.includes(file.type)) {
						return
					}

				// remove element
					if (ELEMENTS.uploadCenter) {
						ELEMENTS.uploadCenter.remove()
					}

				// read file
					const reader = new FileReader()
						reader.onload = function(event) {
							const image = new Image
								image.onload = function() {
									STATE.imageData = image
									drawKaleidoscope()
								}
								image.src = event.target.result
							ELEMENTS.menu.upload.value = null
							ELEMENTS.menu.upload.blur()
						}
						reader.readAsDataURL(file)
			} catch (error) {console.log(error)}
		}

	/* updateKaleidoscopeBackground */
		ELEMENTS.menu.kaleidoscope.background.addEventListener(TRIGGERS.input, updateKaleidoscopeBackground)
		function updateKaleidoscopeBackground(event) {
			try {
				// validate
					const background = ELEMENTS.menu.kaleidoscope.background.value

				// update state
					STATE.kaleidoscope.background = background

				// redraw
					drawKaleidoscope()
			} catch (error) {console.log(error)}
		}

	/* updateKaleidoscopeShape */
		ELEMENTS.menu.kaleidoscope.shape.addEventListener(TRIGGERS.input, updateKaleidoscopeShape)
		function updateKaleidoscopeShape(event) {
			try {
				// validate
					const shape = ELEMENTS.menu.kaleidoscope.shape.value
					if (!CONSTANTS.shapes.includes(shape)) {
						ELEMENTS.menu.kaleidoscope.shape.value = STATE.kaleidoscope.shape
						return
					}

				// update state
					STATE.kaleidoscope.shape = shape

				// redraw
					drawKaleidoscope()
			} catch (error) {console.log(error)}
		}

	/* updateKaleidoscopeRotation */
		ELEMENTS.menu.kaleidoscope.rotation.addEventListener(TRIGGERS.input, updateKaleidoscopeRotation)
		ELEMENTS.menu.kaleidoscope.rotationRange.addEventListener(TRIGGERS.input, updateKaleidoscopeRotation)
		function updateKaleidoscopeRotation(event) {
			try {
				// which one
					const thisInput = event.target.closest("input")

				// validate
					let rotation = Math.round(thisInput.value)
					if (isNaN(rotation)) {
						return
					}

				// modulo
					while (rotation < 0) {
						rotation += CONSTANTS.circleDegrees
					}
					rotation = rotation % CONSTANTS.circleDegrees

				// update state
					STATE.kaleidoscope.rotation = rotation

				// other one
					const otherInput = (thisInput == ELEMENTS.menu.kaleidoscope.rotation ? ELEMENTS.menu.kaleidoscope.rotationRange : ELEMENTS.menu.kaleidoscope.rotation)
					otherInput.value = rotation

				// redraw
					drawKaleidoscope()
			} catch (error) {console.log(error)}
		}

	/* updateKaleidoscopeScale */
		ELEMENTS.menu.kaleidoscope.scale.addEventListener(TRIGGERS.input, updateKaleidoscopeScale)
		ELEMENTS.menu.kaleidoscope.scaleRange.addEventListener(TRIGGERS.input, updateKaleidoscopeScale)
		function updateKaleidoscopeScale(event) {
			try {
				// which one
					const thisInput = event.target.closest("input")

				// validate
					const scale = Math.round(thisInput.value)
					if (isNaN(scale) || scale <= 0) {
						return
					}

				// update state
					STATE.kaleidoscope.scale = scale

				// other one
					const otherInput = (thisInput == ELEMENTS.menu.kaleidoscope.scale ? ELEMENTS.menu.kaleidoscope.scaleRange : ELEMENTS.menu.kaleidoscope.scale)
					otherInput.value = scale

				// redraw
					drawKaleidoscope()
			} catch (error) {console.log(error)}
		}

	/* updateImageRotation */
		ELEMENTS.menu.image.rotation.addEventListener(TRIGGERS.input, updateImageRotation)
		ELEMENTS.menu.image.rotationRange.addEventListener(TRIGGERS.input, updateImageRotation)
		function updateImageRotation(event) {
			try {
				// which one
					const thisInput = event.target.closest("input")

				// validate
					let rotation = Math.round(thisInput.value)
					if (isNaN(rotation)) {
						return
					}

				// modulo
					while (rotation < 0) {
						rotation += CONSTANTS.circleDegrees
					}
					rotation = rotation % CONSTANTS.circleDegrees

				// update state
					STATE.image.rotation = rotation

				// other one
					const otherInput = (thisInput == ELEMENTS.menu.image.rotation ? ELEMENTS.menu.image.rotationRange : ELEMENTS.menu.image.rotation)
					otherInput.value = rotation

				// redraw
					drawKaleidoscope()
			} catch (error) {console.log(error)}
		}

	/* updateImageScale */
		ELEMENTS.menu.image.scale.addEventListener(TRIGGERS.input, updateImageScale)
		ELEMENTS.menu.image.scaleRange.addEventListener(TRIGGERS.input, updateImageScale)
		function updateImageScale(event) {
			try {
				// which one
					const thisInput = event.target.closest("input")

				// validate
					const scale = Math.round(thisInput.value)
					if (isNaN(scale) || scale <= 0) {
						return
					}

				// update state
					STATE.image.scale = scale

				// other one
					const otherInput = (thisInput == ELEMENTS.menu.image.scale ? ELEMENTS.menu.image.scaleRange : ELEMENTS.menu.image.scale)
					otherInput.value = scale

				// redraw
					drawKaleidoscope()
			} catch (error) {console.log(error)}
		}

	/* updateImageTranslateX */
		ELEMENTS.menu.image.translateX.addEventListener(TRIGGERS.input, updateImageTranslateX)
		ELEMENTS.menu.image.translateXRange.addEventListener(TRIGGERS.input, updateImageTranslateX)
		function updateImageTranslateX(event) {
			try {
				// which one
					const thisInput = event.target.closest("input")

				// validate
					const translateX = Math.round(thisInput.value)
					if (isNaN(translateX) || translateX < -CONSTANTS.percentage || translateX > CONSTANTS.percentage) {
						return
					}

				// update state
					STATE.image.translateX = translateX

				// other one
					const otherInput = (thisInput == ELEMENTS.menu.image.translateX ? ELEMENTS.menu.image.translateXRange : ELEMENTS.menu.image.translateX)
					otherInput.value = translateX

				// redraw
					drawKaleidoscope()
			} catch (error) {console.log(error)}
		}

	/* updateImageTranslateY */
		ELEMENTS.menu.image.translateY.addEventListener(TRIGGERS.input, updateImageTranslateY)
		ELEMENTS.menu.image.translateYRange.addEventListener(TRIGGERS.input, updateImageTranslateY)
		function updateImageTranslateY(event) {
			try {
				// which one
					const thisInput = event.target.closest("input")

				// validate
					const translateY = Math.round(thisInput.value)
					if (isNaN(translateY) || translateY < -CONSTANTS.percentage || translateY > CONSTANTS.percentage) {
						return
					}

				// update state
					STATE.image.translateY = translateY

				// other one
					const otherInput = (thisInput == ELEMENTS.menu.image.translateY ? ELEMENTS.menu.image.translateYRange : ELEMENTS.menu.image.translateY)
					otherInput.value = translateY

				// redraw
					drawKaleidoscope()
			} catch (error) {console.log(error)}
		}

	/* updateImageCrop */
		ELEMENTS.menu.image.crop.addEventListener(TRIGGERS.input, updateImageCrop)
		ELEMENTS.menu.image.cropRange.addEventListener(TRIGGERS.input, updateImageCrop)
		function updateImageCrop(event) {
			try {
				// which one
					const thisInput = event.target.closest("input")

				// validate
					const crop = Math.round(thisInput.value)
					if (isNaN(crop) || crop < 0 || crop > CONSTANTS.percent / 2) {
						return
					}

				// update state
					STATE.image.crop = crop

				// other one
					const otherInput = (thisInput == ELEMENTS.menu.image.crop ? ELEMENTS.menu.image.cropRange : ELEMENTS.menu.image.crop)
					otherInput.value = crop

				// redraw
					drawKaleidoscope()
			} catch (error) {console.log(error)}
		}

	/* downloadImage */
		ELEMENTS.menu.download.addEventListener(TRIGGERS.click, downloadImage)
		function downloadImage(event) {
			try {
				// no image
					if (!STATE.imageData) {
						return
					}

				// get current image
					const data = ELEMENTS.canvas.toDataURL("image/png")

				// download link
					const downloadLink = document.createElement("a")
						downloadLink.setAttribute("href", data)
						downloadLink.setAttribute("download", "kaleidoscopeMaker_" + (new Date().getTime()) + ".png")

				// download
					downloadLink.click()
					setTimeout(() => { downloadLink.remove() }, 0)
					ELEMENTS.menu.download.blur()
			} catch (error) {console.log(error)}
		}

/*** helpers ***/
	/* getVector */
		function getVector(a, b) {
			try {
				// pythagorean theorem
					return ((a ** 2) + (b ** 2)) ** (1 / 2)
			} catch (error) {console.log(error)}
		}

	/* getCoordinates */
		function getCoordinates(x, y, width, height, shape) {
			try {
				// triangles
					if (shape == "triangle") {
						if (Math.abs(y / height) % 2) {
							return {
								x: x + (width / 2),
								y: y
							}
						}
						else {
							return {
								x: x,
								y: y
							}
						}
					}

				// quadrilaterals
					return {
						x: x,
						y: y,
					}
			} catch (error) {console.log(error)}
		}

	/* getCorners */
		function getCorners(x, y, width, height, shape) {
			try {
				// triangles
					if (shape == "triangle") {
						if ((x / width) % 1) {
							return [
								{x:          0, y:  height / 2},
								{x:  width / 2, y: -height / 2},
								{x: -width / 2, y: -height / 2}
							]
						}
						else {
							return [
								{x:          0, y: -height / 2},
								{x:  width / 2, y:  height / 2},
								{x: -width / 2, y:  height / 2}
							]
						}
					}

				// quadrilaterals
					return [
						{x: -width / 2, y: -height / 2},
						{x:  width / 2, y: -height / 2},
						{x:  width / 2, y:  height / 2},
						{x: -width / 2, y:  height / 2}
					]
			} catch (error) {console.log(error)}
		}

	/* getAngle */
		function getAngle(x, y, width, height, shape) {
			try {
				// triangles
					if (shape == "triangle") {
						const yModulo = Math.abs((y / height) % 2)
						const xModulo = (((x + (yModulo ? width / 2 : 0)) / width) % 3 + 3) % 3
						switch (true) {
							case (xModulo == 0   && yModulo == 0):
							case (xModulo == 1.5 && yModulo == 1):
								return 0
							break
							
							case (xModulo == 0.5 && yModulo == 0):
							case (xModulo == 2   && yModulo == 1):
								return 60
							break

							case (xModulo == 1   && yModulo == 0):
							case (xModulo == 2.5 && yModulo == 1):
								return 240
							break

							case (xModulo == 1.5 && yModulo == 0):
							case (xModulo == 0   && yModulo == 1):
								return 180
							break

							case (xModulo == 2   && yModulo == 0):
							case (xModulo == 0.5 && yModulo == 1):
								return 120
							break

							case (xModulo == 2.5 && yModulo == 0):
							case (xModulo == 1   && yModulo == 1):
								return 300
							break
						}
					}

				// quadrilaterals
					return 0
			} catch (error) {console.log(error)}
		}

	// getMirror */
		function getMirror(x, y, width, height, shape) {
			try {
				// triangles
					if (shape == "triangle") {
						const yModulo = Math.abs((y / height) % 2)
						const xModulo = (((x + (yModulo ? width / 2 : 0)) / width) % 3 + 3) % 3
						switch (true) {
							case (xModulo == 0   && yModulo == 0):
							case (xModulo == 1.5 && yModulo == 1):
								return {
									x: false,
									y: false
								}
							break
							
							case (xModulo == 0.5 && yModulo == 0):
							case (xModulo == 2   && yModulo == 1):
								return {
									x: true,
									y: false
								}
							break

							case (xModulo == 1   && yModulo == 0):
							case (xModulo == 2.5 && yModulo == 1):
								return {
									x: false,
									y: false
								}
							break

							case (xModulo == 1.5 && yModulo == 0):
							case (xModulo == 0   && yModulo == 1):
								return {
									x: true,
									y: false
								}
							break

							case (xModulo == 2   && yModulo == 0):
							case (xModulo == 0.5 && yModulo == 1):
								return {
									x: false,
									y: false
								}
							break

							case (xModulo == 2.5 && yModulo == 0):
							case (xModulo == 1   && yModulo == 1):
								return {
									x: true,
									y: false
								}
							break
						}
					}

				// quadrilaterals
					return {
						x: Boolean((x /  width) % 2),
						y: Boolean((y / height) % 2)
					}
			} catch (error) {console.log(error)}
		}

/*** canvas ***/
	/* resizeCanvas */
		resizeCanvas()
		window.addEventListener(TRIGGERS.resize, resizeCanvas)
		function resizeCanvas(event) {
			try {
				// canvas
					ELEMENTS.canvas.height = window.innerHeight
					ELEMENTS.canvas.width = window.innerWidth

				// redraw
					drawKaleidoscope()
			} catch (error) {console.log(error)}
		}

	/* clearCanvas */
		function clearCanvas() {
			try {
				// clear
					ELEMENTS.context.clearRect(0, 0, ELEMENTS.canvas.width, ELEMENTS.canvas.height)

				// background rectangle
					ELEMENTS.context.fillStyle = STATE.kaleidoscope.background
					ELEMENTS.context.fillRect(0, 0, ELEMENTS.canvas.width, ELEMENTS.canvas.height)
			} catch (error) {console.log(error)}
		}

	/* translateCanvas */
		function translateCanvas(x, y, callback) {
			try {
				// move
					ELEMENTS.context.translate(x, y)

				// do whatever
					callback()

				// move back
					ELEMENTS.context.translate(-x, -y)
			} catch (error) {console.log(error)}
		}

	/* maskCanvas */
		function maskCanvas(coordinates, callback) {
			try {
				// no coordinates
					if (!coordinates) {
						callback()
						return
					}

				// path
					ELEMENTS.context.save()
					ELEMENTS.context.beginPath()
					ELEMENTS.context.moveTo(coordinates[0].x, coordinates[0].y)
					for (let i = 1; i < coordinates.length; i++) {
						ELEMENTS.context.lineTo(coordinates[i].x, coordinates[i].y)
					}
					ELEMENTS.context.closePath()

				// clip
					ELEMENTS.context.clip()

				// callback
					callback()

				// restore
					ELEMENTS.context.restore()
			} catch (error) {console.log(error)}
		}

	/* rotateCanvas */
		function rotateCanvas(degrees, callback) {
			try {
				// radians
					const radians = degrees / CONSTANTS.circleDegrees * CONSTANTS.circleRadians

				// rotate
					ELEMENTS.context.rotate(-radians)

				// do whatever
					callback()

				// rotate back
					ELEMENTS.context.rotate(radians)
			} catch (error) {console.log(error)}
		}

	/* mirrorCanvas */
		function mirrorCanvas(x, y, callback) {
			try {
				// mirror
					ELEMENTS.context.scale(x ? -1 : 1, y ? -1 : 1)

				// do whatever
					callback()

				// mirror back
					ELEMENTS.context.scale(x ? -1 : 1, y ? -1 : 1)
			} catch (error) {console.log(error)}
		}

/*** kaleidoscope ***/
	/* getPanelCoordinates */
		function getPanelCoordinates() {
			try {
				// dimensions
					const width  = ELEMENTS.canvas.width
					const height = ELEMENTS.canvas.height

				// image ratio
					const imageRatio = STATE.imageData.width / STATE.imageData.height

				// panel size
					const deltaX = Math.floor(
									(CONSTANTS.panelRadius * 2) * (STATE.kaleidoscope.scale / CONSTANTS.percent) * 
									(STATE.kaleidoscope.shape == "triangle" ? CONSTANTS.triangleBaseHeightRatio :
									 STATE.kaleidoscope.shape == "rectangle" ? imageRatio : 1)
								)
					const deltaY = Math.floor(
									(CONSTANTS.panelRadius * 2) * (STATE.kaleidoscope.scale / CONSTANTS.percent)
								)

				// diagonal
					const diagonal = getVector(ELEMENTS.canvas.height / 2, ELEMENTS.canvas.width / 2)
				
				// increments
					const xIncrement = (STATE.kaleidoscope.shape == "triangle") ? (deltaX / 2) : deltaX
					const yIncrement = deltaY

				// ending bounds
					let boundaryX = 0
					let boundaryY = 0
					while (boundaryX <= diagonal) {
						boundaryX += xIncrement
					}
					boundaryX += xIncrement
					while (boundaryY <= diagonal) {
						boundaryY += yIncrement
					}
					boundaryY += yIncrement
				
				// loop
					const panels = []
					for (let y = -boundaryY; y <= boundaryY; y += yIncrement) {
						for (let x = -boundaryX; x <= boundaryX; x += xIncrement) {
							panels.push({
								coordinates: getCoordinates(x, y, deltaX, deltaY, STATE.kaleidoscope.shape),
								corners: getCorners(x, y, deltaX, deltaY, STATE.kaleidoscope.shape),
								angle: getAngle(x, y, deltaX, deltaY, STATE.kaleidoscope.shape),
								mirror: getMirror(x, y, deltaX, deltaY, STATE.kaleidoscope.shape),
							})
						}
					}

				// output panels
					return panels
			} catch (error) {console.log(error)}
		}

	/* drawKaleidoscope */
		function drawKaleidoscope() {
			try {
				// clear
					clearCanvas()

				// no image?
					if (!STATE.imageData) {
						return
					}

				// get panel coordinates
					const panels = getPanelCoordinates()

				// translate to center & rotate
					translateCanvas(ELEMENTS.canvas.width / 2, ELEMENTS.canvas.height / 2, () => {
						rotateCanvas(STATE.kaleidoscope.rotation, () => {
							// draw images
								for (let panel of panels) {
									drawImage({
										imageData: STATE.imageData,
										...panel,
										...STATE.image
									})
								}
						})
					})
			} catch (error) {console.log(error)}
		}

	/* drawImage */
		function drawImage(options) {
			try {
				// no image?
					if (!options.imageData) {
						return
					}

				// kaleidoscope options
					options.coordinates = options.coordinates || {x: 0, y: 0} // px
					options.corners = options.corners || null
					options.angle = options.angle || 0 // °
					options.mirror = options.mirror || {x: false, y: false}
					options.nudge = {
						x: 0, // px
						y: options.corners.length == 3 ? (options.corners[0].y * CONSTANTS.triangleCenterOffsetFactor) : 0 // px // triangle
					}

				// image options
					options.rotation = options.rotation || 0 // °
					options.scale = options.scale || CONSTANTS.percent // %
					options.translateX = options.translateX || 0 // %
					options.translateY = options.translateY || 0 // %
					options.crop = options.crop || 0 // %

				// parameters
					const sourceXoffset = STATE.imageData.width * options.crop / CONSTANTS.percent
					const sourceYoffset = STATE.imageData.height * options.crop / CONSTANTS.percent
					const sourceWidth   = STATE.imageData.width  - 2 * sourceXoffset
					const sourceHeight  = STATE.imageData.height - 2 * sourceYoffset

					const destinationWidth   = (sourceWidth  * options.scale / CONSTANTS.percent)
					const destinationHeight  = (sourceHeight * options.scale / CONSTANTS.percent)
					const destinationXoffset = (destinationWidth  *  options.translateX / CONSTANTS.percent) + (-destinationWidth  / 2)
					const destinationYoffset = (destinationHeight * -options.translateY / CONSTANTS.percent) + (-destinationHeight / 2)

				// move, rotate, mask, mirror
					translateCanvas(options.coordinates.x, options.coordinates.y, () => {
						maskCanvas(options.corners, () => {
							translateCanvas(options.nudge.x, options.nudge.y, () => {
								rotateCanvas(options.angle, () => {
									mirrorCanvas(options.mirror.x, options.mirror.y, () => {
										rotateCanvas(options.rotation, () => {
											ELEMENTS.context.drawImage(options.imageData,
												sourceXoffset, sourceYoffset, sourceWidth, sourceHeight,
												destinationXoffset, destinationYoffset, destinationWidth, destinationHeight)
										})
									})
								})
							})
						})
					})
			} catch (error) {console.log(error)}
		}
