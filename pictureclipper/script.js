/*** globals ***/
	/* triggers */
		const TRIGGERS = {
			resize: "resize",
			focus: "focus",
			blur: "blur",
			input: "input",
			change: "change",
			click: "click",
			press: "mousedown",
			move: "mousemove",
			lift: "mouseup",
			dragover: "dragover",
			drop: "drop"
		}
		if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
			TRIGGERS.click = "touchstart"
			TRIGGERS.press = "touchstart"
			TRIGGERS.move  = "touchmove"
			TRIGGERS.lift  = "touchend"
		}

	/* elements */
		const ELEMENTS = {
			canvas: document.querySelector("#canvas"),
			context: document.querySelector("#canvas").getContext("2d"),
			tools: {
				file: {
					undo: document.querySelector("#tools-file-undo"),
					redo: document.querySelector("#tools-file-redo"),
					download: document.querySelector("#tools-file-download"),
					copy: document.querySelector("#tools-file-copy"),
					upload: document.querySelector("#tools-file-upload"),
					paste: document.querySelector("#tools-file-paste")
				},
				color: {
					brightnessButton: document.querySelector("#tools-color-brightness-button"),
					brightness: document.querySelector("#tools-color-brightness"),
					saturationButton: document.querySelector("#tools-color-saturation-button"),
					saturation: document.querySelector("#tools-color-saturation"),
					redButton: document.querySelector("#tools-color-red-button"),
					red: document.querySelector("#tools-color-red"),
					greenButton: document.querySelector("#tools-color-green-button"),
					green: document.querySelector("#tools-color-green"),
					blueButton: document.querySelector("#tools-color-blue-button"),
					blue: document.querySelector("#tools-color-blue")
				},
				mask: {
					shape: document.querySelector("#tools-mask-shape"),
					searchOuter: document.querySelector("#tools-mask-search-outer"),
					search: document.querySelector("#tools-mask-search"),
					results: document.querySelector("#tools-mask-search-results"),
					icon: document.querySelector("#tools-mask-icon"),
					iconPath: document.querySelector("#tools-mask-icon-path"),
					path: document.querySelector("#tools-mask-path"),
					invert: document.querySelector("#tools-mask-invert"),
					scaleButton: document.querySelector("#tools-mask-scale-button"),
					scale: document.querySelector("#tools-mask-scale"),
					rotationButton: document.querySelector("#tools-mask-rotation-button"),
					rotation: document.querySelector("#tools-mask-rotation"),
					flipButton: document.querySelector("#tools-mask-flip-button"),
					xFlip: document.querySelector("#tools-mask-xflip"),
					yFlip: document.querySelector("#tools-mask-yflip"),
					xButton: document.querySelector("#tools-mask-x-button"),
					x: document.querySelector("#tools-mask-x"),
					yButton: document.querySelector("#tools-mask-y-button"),
					y: document.querySelector("#tools-mask-y"),
				},
				transform: {
					scaleButton: document.querySelector("#tools-transform-scale-button"),
					scale: document.querySelector("#tools-transform-scale"),
					rotationButton: document.querySelector("#tools-transform-rotation-button"),
					rotation: document.querySelector("#tools-transform-rotation"),
					flipButton: document.querySelector("#tools-transform-flip-button"),
					xFlip: document.querySelector("#tools-transform-xflip"),
					yFlip: document.querySelector("#tools-transform-yflip"),
					xButton: document.querySelector("#tools-transform-x-button"),
					x: document.querySelector("#tools-transform-x"),
					yButton: document.querySelector("#tools-transform-y-button"),
					y: document.querySelector("#tools-transform-y"),
				},
				tiling: {
					active: document.querySelector("#tools-tiling-active")
				}
			},
			raw: {
				canvas: document.querySelector("#raw-canvas"),
				context: document.querySelector("#raw-canvas").getContext("2d", {willReadFrequently: true})
			}
		}

	/* constants */
		const CONSTANTS = {
			rounding: 1000, // .#
			circleDegrees: 360, // degrees
			circleRadians: Math.PI * 2, // radians
			invertPath: "M 2000 -1000 L -1000 -1000 L -1000 2000 L 2000 2000 Z ", // svg units
			invertPathFlipped: "M 2000 -1000  L 2000 2000 L -1000 2000 L -1000 -1000 Z ", // svg units
			imageTypes: ["image/png", "image/jpeg", "image/jpg", "image/gif", "image/webp", "image/bmp", "image/tiff", "image/svg+xml"],
			canvasSize: 1000, // canvas px
			svgSize: 100, // svg units
			drawingColor: "#04b1ff", // hex
			drawingFill: "#04b1ff33", // hex
			drawingWeight: 2, // px
			historyLimit: 100, // states
			actionResetTime: 1000, // ms
			colorMaximum: 255, // bits
			luminosities: {
				red: 0.3,
				green: 0.59,
				blue: 0.11
			},
			maxArcAngleForCubicBezier: 90, // degrees
			commandParameters: {
				"m": 2,
				"l": 2,
				"h": 1,
				"v": 1,
				"c": 6,
				"s": 4,
				"q": 4,
				"t": 2,
				"a": 7
			},
		}

	/* state */
		const STATE = {
			dryImage: new Image(),
			wetImage: new Image(),
			tools: {
				color: {
					brightness: 0, // bits
					saturation: 0, // ratio
					red: 0, // ratio
					green: 0, // ratio
					blue: 0, // ratio
				},
				mask: {
					name: null,
					path: null,
					draw: true,
					invert: false,
					scale: 0, // 2^n
					rotation: 0, // degrees
					xFlip: 1, // sign
					yFlip: 1, // sign
					x: 0, // ratio
					y: 0, // ratio
				},
				transform: {
					scale: 0, // 2^n
					rotation: 0, // degrees
					xFlip: 1, // sign
					yFlip: 1, // sign
					x: 0, // ratio
					y: 0, // ratio
				},
				tiling: {
					layers: 0, // count
				}
			},
			drawing: null,
			historyIndex: -1,
			history: []
		}

/*** helpers ***/
	/* chooseRandom */
		function chooseRandom(list) {
			try {
				// not an array
					if (!Array.isArray(list)) {
						return list
					}

				// random item
					return list[Math.floor(Math.random() * list.length)]
			} catch (error) {console.log(error)}
		}

	/* roundNumber */
		function roundNumber(n) {
			try {
				return Math.round(n * CONSTANTS.rounding) / CONSTANTS.rounding
			} catch (error) {console.log(error)}
		}

	/* duplicateObject */
		function duplicateObject(data) {
			try {
				return JSON.parse(JSON.stringify(data))
			} catch (error) {console.log(error)}
		}

	/* transformMask */
		function transformMask({path,
			imageScale, imageTranslationX, imageTranslationY,
			maskRotation, maskScale, maskXFlip, maskYFlip, maskX, maskY, maskInvert
		}) {
			try {
				// scale to canvas
					const svgToCanvas  = CONSTANTS.canvasSize / CONSTANTS.svgSize
					const canvasRadius = CONSTANTS.canvasSize / 2

				// get commands adjusted for canvas
					let commands = getCommandsFromPath(path)
						commands = getAbsoluteCommands(commands)
						commands = getSimplifiedCommands(commands)
						commands = getScaledCommands(commands, svgToCanvas, svgToCanvas)
					
				// get commands adjusted for settings
					if (maskRotation != 0 || maskScale != 1 || maskXFlip != 1 || maskYFlip != 1 || maskX != 0 || maskY != 0) {
						commands = getTranslatedCommands(commands, -canvasRadius, -canvasRadius)
						commands = getRotatedCommands(commands, maskRotation)
						commands = getScaledCommands(commands, maskScale * maskXFlip, maskScale * maskYFlip)
						commands = getTranslatedCommands(commands, canvasRadius + maskX, canvasRadius + maskY)
					}

				// get commands rescaled for image
					if (imageScale != 1 || imageTranslationX != 0 || imageTranslationY != 0) {
						commands = getTranslatedCommands(commands, imageTranslationX, imageTranslationY)
						commands = getScaledCommands(commands, imageScale, imageScale)
					}

				// path
					let transformedPath = getPathFromCommands(commands)
					if (maskInvert) {
						transformedPath = maskInvert + transformedPath
					}

				// return
					return transformedPath
			} catch (error) {console.log(error)}
		}

	/* getCanvasCoordinates */
		function getCanvasCoordinates({x, y}) {
			try {
				// get canvas
					const canvasRect   = ELEMENTS.canvas.getBoundingClientRect()
					const canvasLeft   = canvasRect.left
					const canvasTop    = canvasRect.top
					const canvasWidth  = canvasRect.width
					const canvasHeight = canvasRect.height

				// convert
					const canvasX = CONSTANTS.canvasSize * (x - canvasLeft) / canvasWidth
					const canvasY = CONSTANTS.canvasSize * (y - canvasTop) / canvasHeight

				// return
					return {
						x: canvasX,
						y: canvasY
					}
			} catch (error) {console.log(error)}
		}

/*** file - history ***/
	/* appendHistory */
		function appendHistory() {
			try {
				// get state
					const dryImage = new Image()
						dryImage.src = STATE.dryImage.src
					const wetImage = new Image()
						wetImage.src = STATE.wetImage.src
					const tools = JSON.stringify(STATE.tools)

				// clear out future
					while (STATE.history.length - 1 > STATE.historyIndex) {
						STATE.history.pop()
					}

				// save state
					STATE.history.push({dryImage, wetImage, tools})
					STATE.historyIndex++

				// set buttons
					if (STATE.history.length > 1) {
						ELEMENTS.tools.file.undo.setAttribute("enabled", true)
					}
					ELEMENTS.tools.file.redo.removeAttribute("enabled")

				// more than 100 states
					if (STATE.historyIndex >= CONSTANTS.historyLimit) {
						STATE.history.shift()
						STATE.historyIndex--
					}
			} catch (error) {console.log(error)}
		}

	/* undoHistory */
		ELEMENTS.tools.file.undo.addEventListener(TRIGGERS.click, undoHistory)
		function undoHistory() {
			try {
				// no history
					if (!STATE.history.length || !STATE.history[STATE.historyIndex - 1]) {
						return
					}

				// move index left
					STATE.historyIndex--

				// buttons
					ELEMENTS.tools.file.redo.setAttribute("enabled", true)
					if (!STATE.historyIndex) {
						ELEMENTS.tools.file.undo.removeAttribute("enabled")
					}

				// draw from image
					STATE.dryImage.src = STATE.history[STATE.historyIndex].dryImage.src
					STATE.wetImage.src = STATE.history[STATE.historyIndex].wetImage.src
					STATE.tools = JSON.parse(STATE.history[STATE.historyIndex].tools)
					updateTools()
					drawImage()
			} catch (error) {console.log(error)}
		}

	/* redoHistory */
		ELEMENTS.tools.file.redo.addEventListener(TRIGGERS.click, redoHistory)
		function redoHistory() {
			try {
				// no history
					if (!STATE.history.length || !STATE.history[STATE.historyIndex + 1]) {
						return
					}

				// move index right
					STATE.historyIndex++

				// buttons
					ELEMENTS.tools.file.undo.setAttribute("enabled", true)
					if (STATE.historyIndex >= STATE.history.length - 1) {
						ELEMENTS.tools.file.redo.removeAttribute("enabled", true)
					}
				
				// draw from image
					STATE.dryImage.src = STATE.history[STATE.historyIndex].dryImage.src
					STATE.wetImage.src = STATE.history[STATE.historyIndex].wetImage.src
					STATE.tools = JSON.parse(STATE.history[STATE.historyIndex].tools)
					updateTools()
					drawImage()
			} catch (error) {console.log(error)}
		}

/*** file - import ***/
	/* uploadImage */
		ELEMENTS.tools.file.upload.addEventListener(TRIGGERS.input, uploadImage)
		function uploadImage(event) {
			try {
				// file
					const file = ELEMENTS.tools.file.upload.files[0]
					if (!file) {
						return
					}
					if (!CONSTANTS.imageTypes.includes(file.type)) {
						return
					}

				// read file
					importImage(file, () => {
						ELEMENTS.tools.file.upload.value = null
						ELEMENTS.tools.file.upload.blur()
					})
			} catch (error) {console.log(error)}
		}

	/* dragImage */
		ELEMENTS.canvas.addEventListener(TRIGGERS.dragover, dragImage)
		function dragImage(event) {
			try {
				event.preventDefault()
			} catch (error) {console.log(error)}
		}

	/* dropImage */
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

				// read file
					importImage(file)
			} catch (error) {console.log(error)}
		}

	/* pasteImage */
		ELEMENTS.tools.file.paste.addEventListener(TRIGGERS.click, pasteImage)
		async function pasteImage(event) {
			try {
				// get image from clipboard
					const clipboardItems = await navigator.clipboard.read()
					const file = clipboardItems[0]

				// no image
					if (!file || !CONSTANTS.imageTypes.includes(file.types[0])) {
						return
					}

				// get data
					const data = await file.getType(file.types[0])

				// redraw & update history
					STATE.dryImage.onload = async () => {
						processImage(appendHistory)
					}

				// load image
					STATE.dryImage.src = URL.createObjectURL(data)
			} catch (error) {console.log(error)}
		}

	/* importImage */
		function importImage(file, callback) {
			try {
				// reader
					const reader = new FileReader()
					reader.onload = event => {
						// redraw & update history
							STATE.dryImage.onload = async () => {
								processImage(appendHistory)
							}

						// load image
							STATE.dryImage.src = event.target.result

						// callback
							if (callback) {
								callback()
							}
					}

				// read file
					reader.readAsDataURL(file)
			} catch (error) {console.log(error)}
		}

/*** file - export ***/
	/* getCroppedImage */
		async function getCroppedImage() {
			try {
				// get image data
					const frame = ELEMENTS.context.getImageData(0, 0, CONSTANTS.canvasSize, CONSTANTS.canvasSize)
					const data = frame.data

				// set boundaries
					const dataLength = data.length
					let xMin = yMin = CONSTANTS.canvasSize
					let xMax = yMax = 0

				// loop through pixels
					pixelLoop:
					for (let i = 0; i < dataLength; i += 4) {
						if (data[i + 3]) {
							const x = (i / 4) % CONSTANTS.canvasSize
							const y = Math.floor((i / 4) / CONSTANTS.canvasSize)
							if (x < xMin) { xMin = x }
							if (x > xMax) { xMax = x }
							if (y < yMin) { yMin = y }
							if (y > yMax) { yMax = y }
						}
					}
				
				// get dimensions
					const imageWidth  = xMax - xMin + 1
					const imageHeight = yMax - yMin + 1

				// no dimensions
					if (imageWidth < 0 || imageHeight < 0) {
						return false
					}

				// resize raw canvas
					ELEMENTS.raw.canvas.width  = imageWidth
					ELEMENTS.raw.canvas.height = imageHeight

				// draw just that part of the image
					ELEMENTS.raw.context.clearRect(0, 0, imageWidth, imageHeight)
					await ELEMENTS.raw.context.putImageData(frame, -xMin, -yMin, xMin, yMin, imageWidth, imageHeight)

				// export from cropped canvas
					return ELEMENTS.raw.canvas.toDataURL("image/png")
			} catch (error) {console.log(error)}
		}

	/* downloadImage */
		ELEMENTS.tools.file.download.addEventListener(TRIGGERS.click, downloadImage)
		async function downloadImage(event) {
			try {
				// get cropped image
					const imageURL = await getCroppedImage()
					if (!imageURL) {
						return
					}

				// button
					ELEMENTS.tools.file.download.setAttribute("active", true)

				//  package up
					const exportLink = document.createElement("a")
						exportLink.id = "export-link"
						exportLink.setAttribute("href", imageURL)
						exportLink.setAttribute("download", "pictureClipper_" + (new Date().getTime()) + ".png")
						exportLink.addEventListener(TRIGGERS.click, () => {
							document.body.removeChild(exportLink)
						})
				
				// click
					document.body.appendChild(exportLink)
					exportLink.click()

				// reset button
					setTimeout(() => {
						ELEMENTS.tools.file.download.removeAttribute("active")
					}, CONSTANTS.actionResetTime)
			} catch (error) {console.log(error)}
		}

	/* copyImage */
		ELEMENTS.tools.file.copy.addEventListener(TRIGGERS.click, copyImage)
		async function copyImage(event) {
			try {
				// get canvas data
					const imageURL = await getCroppedImage()
					if (!imageURL) {
						return
					}

					async function getImagePromise() {
						const imageData = await fetch(imageURL)
						return await imageData.blob()
					}

				// chrome, edge, safari
					try {
						ELEMENTS.tools.file.copy.setAttribute("active", true)
						navigator.clipboard.write(
							[new ClipboardItem({"image/png": getImagePromise()})]
						).then(() => {
							setTimeout(() => {
								ELEMENTS.tools.file.copy.removeAttribute("active")
							}, CONSTANTS.actionResetTime)
						}).catch((error) => {console.log(error)})
					}

				// firefox
					catch (error) {
						const reader = new FileReader()
						reader.onload = () => {
							const wrapper = document.createElement("div")
								wrapper.contentEditable = "true"
							document.body.appendChild(wrapper)

							const image = document.createElement("img")
								image.src = reader.result
							wrapper.appendChild(image)

							try {
								window.getSelection().selectAllChildren(wrapper)
								document.execCommand("copy")
							} catch (error) {console.log(error)}

							wrapper.remove()
							setTimeout(() => {
								ELEMENTS.tools.file.copy.removeAttribute("active")
							}, CONSTANTS.actionResetTime)
						}
						reader.readAsDataURL(getImagePromise())
					}
			} catch (error) {console.log(error)}
		}

/*** assetManager ***/
	/* retrieveAsset */
		window.ASSETS_J.retrieveAsset = function(name, type, data) {
			try {
				// image
					STATE.dryImage.onload = async () => {
						processImage(appendHistory)
					}
					STATE.dryImage.src = data
			} catch (error) {console.log(error)}
		}

	/* storeAsset */
		window.ASSETS_J.storeAsset = async function(type) {
			try {
				// png
					return {
						name: "pictureClipper_" + (new Date().getTime()) + ".png",
						type: "png",
						data: await getCroppedImage()
					}
			} catch (error) {console.log(error)}
		}

/*** tools ***/
	/* updateTools */
		function updateTools() {
			try {
				// sliders
					ELEMENTS.tools.color.brightness.value = STATE.tools.color.brightness
					ELEMENTS.tools.color.saturation.value = STATE.tools.color.saturation
					ELEMENTS.tools.color.red.value = STATE.tools.color.red
					ELEMENTS.tools.color.green.value = STATE.tools.color.green
					ELEMENTS.tools.color.blue.value = STATE.tools.color.blue

					ELEMENTS.tools.mask.scale.value = STATE.tools.mask.scale
					ELEMENTS.tools.mask.rotation.value = STATE.tools.mask.rotation
					ELEMENTS.tools.mask.x.value = STATE.tools.mask.x
					ELEMENTS.tools.mask.y.value = STATE.tools.mask.y

					ELEMENTS.tools.transform.scale.value = STATE.tools.transform.scale
					ELEMENTS.tools.transform.rotation.value = STATE.tools.transform.rotation
					ELEMENTS.tools.transform.x.value = STATE.tools.transform.x
					ELEMENTS.tools.transform.y.value = STATE.tools.transform.y

					ELEMENTS.tools.tiling.active.checked = STATE.tools.tiling.active

				// checkboxes
					ELEMENTS.tools.mask.invert.checked = STATE.tools.mask.invert

					ELEMENTS.tools.mask.xFlip.checked = (STATE.tools.mask.xFlip == -1)
					ELEMENTS.tools.mask.yFlip.checked = (STATE.tools.mask.yFlip == -1)

					ELEMENTS.tools.transform.xFlip.checked = (STATE.tools.transform.xFlip == -1)
					ELEMENTS.tools.transform.yFlip.checked = (STATE.tools.transform.yFlip == -1)

				// icon
					ELEMENTS.tools.mask.path.removeAttribute("visible")
					ELEMENTS.tools.mask.searchOuter.removeAttribute("visible")

					if (STATE.tools.mask.name) {
						ELEMENTS.tools.mask.shape.value = "[icon]"
						ELEMENTS.tools.mask.searchOuter.setAttribute("visible", true)
					}
					else if (STATE.tools.mask.draw) {
						ELEMENTS.tools.mask.shape.value = "[draw]"
					}
					else if (STATE.tools.mask.path) {
						ELEMENTS.tools.mask.shape.value = "[custom]"
						ELEMENTS.tools.mask.path.setAttribute("visible", true)
					}
					else {
						ELEMENTS.tools.mask.shape.value = "[none]"
					}

					ELEMENTS.tools.mask.search.value = STATE.tools.mask.name || ""
					ELEMENTS.tools.mask.iconPath.setAttribute("d", STATE.tools.mask.path || "")
					ELEMENTS.tools.mask.path.value = STATE.tools.mask.path || ""
			} catch (error) {console.log(error)}
		}

	/* releaseTool */
		[
			ELEMENTS.tools.color.brightness,
			ELEMENTS.tools.color.saturation,
			ELEMENTS.tools.color.red,
			ELEMENTS.tools.color.green,
			ELEMENTS.tools.color.blue,
			ELEMENTS.tools.mask.path,
			ELEMENTS.tools.mask.scale,
			ELEMENTS.tools.mask.rotation,
			ELEMENTS.tools.mask.x,
			ELEMENTS.tools.mask.y,
			ELEMENTS.tools.transform.scale,
			ELEMENTS.tools.transform.rotation,
			ELEMENTS.tools.transform.x,
			ELEMENTS.tools.transform.y,
		].forEach(slider => {
			slider.addEventListener(TRIGGERS.change, releaseTool)
		})
		function releaseTool(event) {
			try {
				// update history
					appendHistory()
			} catch (error) {console.log(error)}
		}

/*** tools - color ***/
	/* resetBrightness */
		ELEMENTS.tools.color.brightnessButton.addEventListener(TRIGGERS.click, resetBrightness)
		function resetBrightness(event) {
			try {
				// set to default
					ELEMENTS.tools.color.brightness.value = 0

				// update slider & redraw image
					updateBrightness()

				// update history
					appendHistory()
			} catch (error) {console.log(error)}
		}

	/* updateBrightness */
		ELEMENTS.tools.color.brightness.addEventListener(TRIGGERS.input, updateBrightness)
		async function updateBrightness(event) {
			try {
				// get value
					STATE.tools.color.brightness = Number(ELEMENTS.tools.color.brightness.value)

				// redraw
					processImage()
			} catch (error) {console.log(error)}
		}

	/* resetSaturation */
		ELEMENTS.tools.color.saturationButton.addEventListener(TRIGGERS.click, resetSaturation)
		function resetSaturation(event) {
			try {
				// set to default
					ELEMENTS.tools.color.saturation.value = 0

				// update slider & redraw image
					updateSaturation()

				// update history
					appendHistory()
			} catch (error) {console.log(error)}
		}

	/* updateSaturation */
		ELEMENTS.tools.color.saturation.addEventListener(TRIGGERS.input, updateSaturation)
		async function updateSaturation(event) {
			try {
				// get value
					STATE.tools.color.saturation = Number(ELEMENTS.tools.color.saturation.value)

				// redraw
					processImage()
			} catch (error) {console.log(error)}
		}

	/* resetRed */
		ELEMENTS.tools.color.redButton.addEventListener(TRIGGERS.click, resetRed)
		function resetRed(event) {
			try {
				// set to default
					ELEMENTS.tools.color.red.value = 0

				// update slider & redraw image
					updateRed()

				// update history
					appendHistory()
			} catch (error) {console.log(error)}
		}

	/* updateRed */
		ELEMENTS.tools.color.red.addEventListener(TRIGGERS.input, updateRed)
		async function updateRed(event) {
			try {
				// get value
					STATE.tools.color.red = Number(ELEMENTS.tools.color.red.value)

				// redraw
					processImage()
			} catch (error) {console.log(error)}
		}

	/* resetGreen */
		ELEMENTS.tools.color.greenButton.addEventListener(TRIGGERS.click, resetGreen)
		function resetGreen(event) {
			try {
				// set to default
					ELEMENTS.tools.color.green.value = 0

				// update slider & redraw image
					updateGreen()

				// update history
					appendHistory()
			} catch (error) {console.log(error)}
		}

	/* updateGreen */
		ELEMENTS.tools.color.green.addEventListener(TRIGGERS.input, updateGreen)
		async function updateGreen(event) {
			try {
				// get value
					STATE.tools.color.green = Number(ELEMENTS.tools.color.green.value)

				// redraw
					processImage()
			} catch (error) {console.log(error)}
		}

	/* resetBlue */
		ELEMENTS.tools.color.blueButton.addEventListener(TRIGGERS.click, resetBlue)
		function resetBlue(event) {
			try {
				// set to default
					ELEMENTS.tools.color.blue.value = 0

				// update slider & redraw image
					updateBlue()

				// update history
					appendHistory()
			} catch (error) {console.log(error)}
		}

	/* updateBlue */
		ELEMENTS.tools.color.blue.addEventListener(TRIGGERS.input, updateBlue)
		async function updateBlue(event) {
			try {
				// get value
					STATE.tools.color.blue = Number(ELEMENTS.tools.color.blue.value)

				// redraw
					processImage()
			} catch (error) {console.log(error)}
		}

/*** tools - mask ***/
	/* selectMaskShape */
		ELEMENTS.tools.mask.shape.addEventListener(TRIGGERS.input, selectMaskShape)
		function selectMaskShape(event) {
			try {
				// get shape
					const shapeName = ELEMENTS.tools.mask.shape.value

				// preset
					if (!["[none]", "[draw]", "[icon]", "[random]", "[custom]"].includes(shapeName)) {
						STATE.tools.mask.draw = false
						ELEMENTS.tools.mask.searchOuter.removeAttribute("visible")
						ELEMENTS.tools.mask.path.removeAttribute("visible")
						updateMaskIcon(null, shapeName)
						return
					}

				// random
					if (shapeName == "[random]") {
						STATE.tools.mask.draw = false
						ELEMENTS.tools.mask.shape.value = "[icon]"
						ELEMENTS.tools.mask.searchOuter.setAttribute("visible", true)
						ELEMENTS.tools.mask.path.removeAttribute("visible")
						updateMaskIcon(null, chooseRandom(Object.keys(SVG.icons)))
						return
					}

				// none or draw
					if (shapeName == "[none]") {
						// reset inputs
							STATE.tools.mask.name = null
							STATE.tools.mask.path = null
							STATE.tools.mask.draw = false
							
							ELEMENTS.tools.mask.searchOuter.removeAttribute("visible")
							ELEMENTS.tools.mask.search.value = ""
							ELEMENTS.tools.mask.iconPath.setAttribute("d", "")

							ELEMENTS.tools.mask.path.removeAttribute("visible")
							ELEMENTS.tools.mask.path.value = ""

						// redraw
							drawImage()

						// update history
							appendHistory()

						return
					}

				// draw
					if (shapeName == "[draw]") {
						// reset inputs
							STATE.tools.mask.name = null
							STATE.tools.mask.path = null
							STATE.tools.mask.draw = true
							
							ELEMENTS.tools.mask.searchOuter.removeAttribute("visible")
							ELEMENTS.tools.mask.search.value = ""
							ELEMENTS.tools.mask.iconPath.setAttribute("d", "")

							ELEMENTS.tools.mask.path.removeAttribute("visible")
							ELEMENTS.tools.mask.path.value = ""

						// reset transformations
							STATE.tools.mask.scale = 0
								ELEMENTS.tools.mask.scale.value = 0
							STATE.tools.mask.rotation = 0
								ELEMENTS.tools.mask.rotation.value = 0
							STATE.tools.mask.xFlip = 1
								ELEMENTS.tools.mask.xFlip.checked = false
							STATE.tools.mask.yFlip = 1
								ELEMENTS.tools.mask.yFlip.checked = false
							STATE.tools.mask.x = 0
								ELEMENTS.tools.mask.x.value = 0
							STATE.tools.mask.y = 0
								ELEMENTS.tools.mask.y.value = 0

						// redraw
							drawImage()

						// update history
							appendHistory()

						return
					}

				// icon
					if (shapeName == "[icon]") {
						// not drawing
							STATE.tools.mask.draw = false

						// reveal icon search
							ELEMENTS.tools.mask.path.removeAttribute("visible")
							ELEMENTS.tools.mask.searchOuter.setAttribute("visible", true)
							ELEMENTS.tools.mask.search.focus()
					}

				// custom
					if (shapeName == "[custom]") {
						// not drawing
							STATE.tools.mask.draw = false

						// reveal custom input
							ELEMENTS.tools.mask.searchOuter.removeAttribute("visible")
							ELEMENTS.tools.mask.path.setAttribute("visible", true)
					}
			} catch (error) {console.log(error)}
		}

	/* revertMaskSearch */
		ELEMENTS.tools.mask.search.addEventListener(TRIGGERS.blur, revertMaskSearch)
		function revertMaskSearch(event) {
			try {
				setTimeout(() => {
					// still within search
						if (document.activeElement && document.activeElement.closest("#tools-mask-search-outer")) {
							return
						}

					// clicking away
						ELEMENTS.tools.mask.search.value = STATE.tools.mask.name || ""
						ELEMENTS.tools.mask.results.innerHTML = ""
						ELEMENTS.tools.mask.results.removeAttribute("visible", true)
				}, 0)
			} catch (error) {console.log(error)}
		}

	/* updateMaskSearch */
		ELEMENTS.tools.mask.icon.addEventListener(TRIGGERS.click, updateMaskSearch)
		ELEMENTS.tools.mask.search.addEventListener(TRIGGERS.focus, updateMaskSearch)
		ELEMENTS.tools.mask.search.addEventListener(TRIGGERS.input, updateMaskSearch)
		function updateMaskSearch(event) {
			try {
				// not yet searching
					if (!ELEMENTS.tools.mask.results.getAttribute("visible")) {
						ELEMENTS.tools.mask.search.value = ""
						ELEMENTS.tools.mask.search.focus()
						ELEMENTS.tools.mask.results.setAttribute("visible", true)
					}

				// redo search
					ELEMENTS.tools.mask.results.innerHTML = ""

				// search
					const search = ELEMENTS.tools.mask.search.value.toLowerCase().trim().replace(/-/g, " ")
					const iconKeys = search ? 
						Object.keys(SVG.icons).filter(key => key.trim().toLowerCase().replace(/-/g, " ").includes(search)) : 
						Object.keys(SVG.icons)

				// results
					for (const k in iconKeys) {
						const path = SVG.icons[iconKeys[k]]
						const iconHTML = `<svg viewBox="0 0 100 100"><path d="${path}"></path></svg>`

						const result = document.createElement("button")
							result.className = "tools-mask-search-result"
							result.title = iconKeys[k].replace(/-/g, " ")
							result.value = iconKeys[k]
							result.innerHTML = iconHTML
							result.addEventListener(TRIGGERS.click, updateMaskIcon)
							result.addEventListener(TRIGGERS.blur, revertMaskSearch)
						ELEMENTS.tools.mask.results.appendChild(result)
					}
			} catch (error) {console.log(error)}
		}

	/* updateMaskIcon */
		function updateMaskIcon(event, selectedName) {
			try {
				// select icon
					const name = selectedName ? selectedName : event.target.closest(".tools-mask-search-result").value

				// in SVG?
					const path = SVG.icons[name]
					if (!path) {
						return
					}

				// set values
					STATE.tools.mask.name = name.replace(/-/g, " ")
					STATE.tools.mask.path = path

				// set search bar
					ELEMENTS.tools.mask.search.value = STATE.tools.mask.name
					ELEMENTS.tools.mask.iconPath.setAttribute("d", STATE.tools.mask.path)
					ELEMENTS.tools.mask.results.innerHTML = ""
					ELEMENTS.tools.mask.results.removeAttribute("visible")

				// update textarea
					ELEMENTS.tools.mask.path.value = STATE.tools.mask.path

				// redraw
					drawImage()

				// update history
					appendHistory()
			} catch (error) {console.log(error)}
		}

	/* updateMaskPath */
		ELEMENTS.tools.mask.path.addEventListener(TRIGGERS.input, updateMaskPath)
		function updateMaskPath(event) {
			try {
				// set shape to custom
					ELEMENTS.tools.mask.shape.value = "[custom]"
					STATE.tools.mask.name = null

				// grab path
					STATE.tools.mask.path = ELEMENTS.tools.mask.path.value.trim()

				// redraw
					drawImage()

				// update history
					appendHistory()
			} catch (error) {console.log(error)}
		}

	/* updateMaskInvert */
		ELEMENTS.tools.mask.invert.addEventListener(TRIGGERS.input, updateMaskInvert)
		function updateMaskInvert(event) {
			try {
				// flip sign
					STATE.tools.mask.invert = ELEMENTS.tools.mask.invert.checked ? true : false

				// redraw image
					drawImage()

				// update history
					appendHistory()
			} catch (error) {console.log(error)}
		}

	/* resetMaskScale */
		ELEMENTS.tools.mask.scaleButton.addEventListener(TRIGGERS.click, resetMaskScale)
		function resetMaskScale(event) {
			try {
				// set to 0
					ELEMENTS.tools.mask.scale.value = 0

				// update slider & redraw image
					updateMaskScale()

				// update history
					appendHistory()
			} catch (error) {console.log(error)}
		}

	/* updateMaskScale */
		ELEMENTS.tools.mask.scale.addEventListener(TRIGGERS.input, updateMaskScale)
		function updateMaskScale(event) {
			try {
				// scale
					STATE.tools.mask.scale = Number(ELEMENTS.tools.mask.scale.value)
				
				// redraw image
					drawImage()
			} catch (error) {console.log(error)}
		}

	/* resetMaskRotation */
		ELEMENTS.tools.mask.rotationButton.addEventListener(TRIGGERS.click, resetMaskRotation)
		function resetMaskRotation() {
			try {
				// set to 0
					ELEMENTS.tools.mask.rotation.value = 0

				// update slider & redraw image
					updateMaskRotation()

				// update history
					appendHistory()
			} catch (error) {console.log(error)}
		}

	/* updateMaskRotation */
		ELEMENTS.tools.mask.rotation.addEventListener(TRIGGERS.input, updateMaskRotation)
		function updateMaskRotation(event) {
			try {
				// rotation
					STATE.tools.mask.rotation = Number(ELEMENTS.tools.mask.rotation.value)
				
				// redraw image
					drawImage()
			} catch (error) {console.log(error)}
		}

	/* resetMaskFlip */
		ELEMENTS.tools.mask.flipButton.addEventListener(TRIGGERS.click, resetMaskFlip)
		function resetMaskFlip() {
			try {
				// uncheck
					ELEMENTS.tools.mask.xFlip.checked = false
					ELEMENTS.tools.mask.yFlip.checked = false

				// set signs
					STATE.tools.mask.xFlip = 1
					STATE.tools.mask.yFlip = 1

				// redraw image
					drawImage()

				// update history
					appendHistory()
			} catch (error) {console.log(error)}
		}

	/* updateMaskXFlip */
		ELEMENTS.tools.mask.xFlip.addEventListener(TRIGGERS.input, updateMaskXFlip)
		function updateMaskXFlip(event) {
			try {
				// flip sign
					STATE.tools.mask.xFlip = ELEMENTS.tools.mask.xFlip.checked ? -1 : 1

				// redraw image
					drawImage()

				// update history
					appendHistory()
			} catch (error) {console.log(error)}
		}

	/* updateMaskYFlip */
		ELEMENTS.tools.mask.yFlip.addEventListener(TRIGGERS.input, updateMaskYFlip)
		function updateMaskYFlip(event) {
			try {
				// flip sign
					STATE.tools.mask.yFlip = ELEMENTS.tools.mask.yFlip.checked ? -1 : 1

				// redraw image
					drawImage()

				// update history
					appendHistory()
			} catch (error) {console.log(error)}
		}

	/* resetMaskX */
		ELEMENTS.tools.mask.xButton.addEventListener(TRIGGERS.click, resetMaskX)
		function resetMaskX(event) {
			try {
				// set to 0
					ELEMENTS.tools.mask.x.value = 0

				// update slider & redraw image
					updateMaskX()

				// update history
					appendHistory()
			} catch (error) {console.log(error)}
		}

	/* updateMaskX */
		ELEMENTS.tools.mask.x.addEventListener(TRIGGERS.input, updateMaskX)
		function updateMaskX(event) {
			try {
				// translation
					STATE.tools.mask.x = Number(ELEMENTS.tools.mask.x.value)
				
				// redraw image
					drawImage()
			} catch (error) {console.log(error)}
		}

	/* resetMaskY */
		ELEMENTS.tools.mask.yButton.addEventListener(TRIGGERS.click, resetMaskY)
		function resetMaskY(event) {
			try {
				// set to 0
					ELEMENTS.tools.mask.y.value = 0

				// update slider & redraw image
					updateMaskY()

				// update history
					appendHistory()
			} catch (error) {console.log(error)}
		}

	/* updateMaskY */
		ELEMENTS.tools.mask.y.addEventListener(TRIGGERS.input, updateMaskY)
		function updateMaskY(event) {
			try {
				// translation
					STATE.tools.mask.y = Number(ELEMENTS.tools.mask.y.value)
				
				// redraw image
					drawImage()
			} catch (error) {console.log(error)}
		}

/*** tools - transform ***/
	/* resetImageScale */
		ELEMENTS.tools.transform.scaleButton.addEventListener(TRIGGERS.click, resetImageScale)
		function resetImageScale(event) {
			try {
				// set to 0
					ELEMENTS.tools.transform.scale.value = 0

				// update slider & redraw image
					updateImageScale()

				// update history
					appendHistory()
			} catch (error) {console.log(error)}
		}

	/* updateImageScale */
		ELEMENTS.tools.transform.scale.addEventListener(TRIGGERS.input, updateImageScale)
		function updateImageScale(event) {
			try {
				// scale
					STATE.tools.transform.scale = Number(ELEMENTS.tools.transform.scale.value)
				
				// redraw image
					drawImage()
			} catch (error) {console.log(error)}
		}

	/* resetImageRotation */
		ELEMENTS.tools.transform.rotationButton.addEventListener(TRIGGERS.click, resetImageRotation)
		function resetImageRotation() {
			try {
				// set to 0
					ELEMENTS.tools.transform.rotation.value = 0

				// update slider & redraw image
					updateImageRotation()

				// update history
					appendHistory()
			} catch (error) {console.log(error)}
		}

	/* updateImageRotation */
		ELEMENTS.tools.transform.rotation.addEventListener(TRIGGERS.input, updateImageRotation)
		function updateImageRotation(event) {
			try {
				// rotation
					STATE.tools.transform.rotation = Number(ELEMENTS.tools.transform.rotation.value)
				
				// redraw image
					drawImage()
			} catch (error) {console.log(error)}
		}

	/* resetImageFlip */
		ELEMENTS.tools.transform.flipButton.addEventListener(TRIGGERS.click, resetImageFlip)
		function resetImageFlip() {
			try {
				// uncheck
					ELEMENTS.tools.transform.xFlip.checked = false
					ELEMENTS.tools.transform.yFlip.checked = false

				// set signs
					STATE.tools.transform.xFlip = 1
					STATE.tools.transform.yFlip = 1

				// redraw image
					drawImage()

				// update history
					appendHistory()
			} catch (error) {console.log(error)}
		}

	/* updateImageXFlip */
		ELEMENTS.tools.transform.xFlip.addEventListener(TRIGGERS.input, updateImageXFlip)
		function updateImageXFlip(event) {
			try {
				// flip sign
					STATE.tools.transform.xFlip = ELEMENTS.tools.transform.xFlip.checked ? -1 : 1

				// redraw image
					drawImage()

				// update history
					appendHistory()
			} catch (error) {console.log(error)}
		}

	/* updateImageYFlip */
		ELEMENTS.tools.transform.yFlip.addEventListener(TRIGGERS.input, updateImageYFlip)
		function updateImageYFlip(event) {
			try {
				// flip sign
					STATE.tools.transform.yFlip = ELEMENTS.tools.transform.yFlip.checked ? -1 : 1

				// redraw image
					drawImage()

				// update history
					appendHistory()
			} catch (error) {console.log(error)}
		}

	/* resetImageX */
		ELEMENTS.tools.transform.xButton.addEventListener(TRIGGERS.click, resetImageX)
		function resetImageX(event) {
			try {
				// set to 0
					ELEMENTS.tools.transform.x.value = 0

				// update slider & redraw image
					updateImageX()

				// update history
					appendHistory()
			} catch (error) {console.log(error)}
		}

	/* updateImageX */
		ELEMENTS.tools.transform.x.addEventListener(TRIGGERS.input, updateImageX)
		function updateImageX(event) {
			try {
				// translation
					STATE.tools.transform.x = Number(ELEMENTS.tools.transform.x.value)
				
				// redraw image
					drawImage()
			} catch (error) {console.log(error)}
		}

	/* resetImageY */
		ELEMENTS.tools.transform.yButton.addEventListener(TRIGGERS.click, resetImageY)
		function resetImageY(event) {
			try {
				// set to 0
					ELEMENTS.tools.transform.y.value = 0

				// update slider & redraw image
					updateImageY()

				// update history
					appendHistory()
			} catch (error) {console.log(error)}
		}

	/* updateImageY */
		ELEMENTS.tools.transform.y.addEventListener(TRIGGERS.input, updateImageY)
		function updateImageY(event) {
			try {
				// translation
					STATE.tools.transform.y = Number(ELEMENTS.tools.transform.y.value)
				
				// redraw image
					drawImage()
			} catch (error) {console.log(error)}
		}

/*** tools - tiling ***/
	/* updateTilingActive */
		ELEMENTS.tools.tiling.active.addEventListener(TRIGGERS.input, updateTilingActive)
		function updateTilingActive(event) {
			try {
				// translation
					STATE.tools.tiling.active = ELEMENTS.tools.tiling.active.checked
				
				// redraw image
					drawImage()
			} catch (error) {console.log(error)}
		}

/*** image recoloring ***/
	/* processImage */
		async function processImage(callback) {
			try {
				// get dimensions
					const imageWidth  = STATE.dryImage.naturalWidth
					const imageHeight = STATE.dryImage.naturalHeight

				// no dimensions
					if (!imageWidth || !imageHeight) {
						return false
					}

				// resize raw canvas
					ELEMENTS.raw.canvas.width  = imageWidth
					ELEMENTS.raw.canvas.height = imageHeight

				// draw raw image
					ELEMENTS.raw.context.clearRect(0, 0, imageWidth, imageHeight)
					ELEMENTS.raw.context.drawImage(STATE.dryImage, 0, 0, imageWidth, imageHeight)

				// get frame
					const frame = ELEMENTS.raw.context.getImageData(0, 0, imageWidth, imageHeight)

				// loop through frame and process
					frame.data = processPixels(frame.data)

				// redraw image
					ELEMENTS.raw.context.putImageData(frame, 0, 0)

				// update state
					STATE.wetImage.src = ELEMENTS.raw.canvas.toDataURL("image/png")
					STATE.wetImage.onload = () => {
						drawImage()
						if (callback) {
							callback()
						}
					}
			} catch (error) {console.log(error)}
		}

	/* processPixels */
		function processPixels(data) {
			try {
				// get length
					const dataLength = data.length
					const saturationMultiplier = 1.5 ** STATE.tools.color.saturation

				// loop through to update saturation & brightness
					pixelLoop:
					for (let i = 0; i < dataLength; i += 4) {
						// average
							let adjustedRed   = data[i]     * CONSTANTS.luminosities.red
							let adjustedGreen = data[i + 1] * CONSTANTS.luminosities.green
							let adjustedBlue  = data[i + 2] * CONSTANTS.luminosities.blue
							let average = adjustedRed + adjustedGreen + adjustedBlue

						/* r */
							data[i]     = data[i]     * saturationMultiplier + average * (1 - saturationMultiplier)
							data[i]     = data[i]     + STATE.tools.color.red
							data[i]     = data[i]     + STATE.tools.color.brightness
							data[i]     = Math.min(Math.max(0, data[i]), CONSTANTS.colorMaximum)

						/* g */
							data[i + 1] = data[i + 1] * saturationMultiplier + average * (1 - saturationMultiplier)
							data[i + 1] = data[i + 1] + STATE.tools.color.green
							data[i + 1] = data[i + 1] + STATE.tools.color.brightness
							data[i + 1]     = Math.min(Math.max(0, data[i + 1]), CONSTANTS.colorMaximum)
						
						/* b */
							data[i + 2] = data[i + 2] * saturationMultiplier + average * (1 - saturationMultiplier)
							data[i + 2] = data[i + 2] + STATE.tools.color.blue
							data[i + 2] = data[i + 2] + STATE.tools.color.brightness
							data[i + 2]     = Math.min(Math.max(0, data[i + 2]), CONSTANTS.colorMaximum)
					}

				// return
					return data
			} catch (error) {console.log(error)}
		}

	/* processColor */
		function processColor(rgb) {
			try {
				// get fraction
					let red   = rgb[0] / CONSTANTS.colorBits
					let green = rgb[1] / CONSTANTS.colorBits
					let blue  = rgb[2] / CONSTANTS.colorBits

				// extremes
					let min = Math.min(red, green, blue)
					let max = Math.max(red, green, blue)
					let delta = max - min

				// hsl
					let hue = 0
					let saturation = 0
					let lightness = 0

				// hue
					if (delta == 0) {
						hue = 0
					}
					else if (max == red) {
						hue = ((green - blue) / delta) % 6
					}
					else if (max == green) {
						hue = ((blue - red) / delta) + 2
					}
					else if (max == blue) {
						hue = ((red - green) / delta) + 4
					}

					hue = Math.round(hue * 60)
					if (hue < 0) {
						hue += 360
					}

				// lightness
					lightness = (min + max) / 2

				// saturation
					if (delta == 0) {
						saturation = 0
					}
					else {
						saturation = 1 - Math.abs(min + max - 1)
					}

				// return
					return [hue, saturation, lightness]
			} catch (error) {console.log(error)}
		}

/*** drawing ***/
	/* startDrawing */
		ELEMENTS.canvas.addEventListener(TRIGGERS.press, startDrawing)
		function startDrawing(event) {
			try {
				// not in draw mode?
					if (!STATE.tools.mask.draw) {
						return
					}

				// reset drawing
					STATE.tools.mask.path = null
					drawImage()

				// get coordinates
					const screenX = event.touches ? event.touches[0].clientX : event.clientX
					const screenY = event.touches ? event.touches[0].clientY : event.clientY
					const {x, y} = getCanvasCoordinates({
						x: screenX,
						y: screenY
					})

				// size down
					const svgX = x * CONSTANTS.svgSize / CONSTANTS.canvasSize
					const svgY = y * CONSTANTS.svgSize / CONSTANTS.canvasSize

				// reset path
					STATE.drawing = `M ${roundNumber(svgX)} ${roundNumber(svgY)} Z`
			} catch (error) {console.log(error)}
		}

	/* updateDrawing */
		window.addEventListener(TRIGGERS.move, updateDrawing)
		function updateDrawing(event) {
			try {
				// not drawing
					if (!STATE.drawing) {
						return
					}

				// get coordinates
					const screenX = event.touches ? event.touches[0].clientX : event.clientX
					const screenY = event.touches ? event.touches[0].clientY : event.clientY
					const {x, y} = getCanvasCoordinates({
						x: screenX,
						y: screenY
					})

				// size down
					const svgX = x * CONSTANTS.svgSize / CONSTANTS.canvasSize
					const svgY = y * CONSTANTS.svgSize / CONSTANTS.canvasSize

				// update path
					STATE.drawing = `${STATE.drawing.slice(0, -2)} L ${roundNumber(svgX)} ${roundNumber(svgY)} Z`

				// draw
					drawImage()
			} catch (error) {console.log(error)}
		}

	/* stopDrawing */
		window.addEventListener(TRIGGERS.lift, stopDrawing)
		function stopDrawing(event) {
			try {
				// not drawing
					if (!STATE.drawing) {
						return
					}

				// get adjustments
					const imageTranslationX = STATE.tools.transform.x * -CONSTANTS.svgSize
					const imageTranslationY = STATE.tools.transform.y * -CONSTANTS.svgSize
					const imageRotation = -STATE.tools.transform.rotation * (CONSTANTS.circleRadians / CONSTANTS.circleDegrees)
					const imageScale = 1 / (2 ** STATE.tools.transform.scale)
					const imageXFlip = STATE.tools.transform.xFlip
					const imageYFlip = STATE.tools.transform.yFlip

				// scale to radius
					const svgRadius = CONSTANTS.svgSize / 2

				// get commands adjusted for canvas
					let commands = getCommandsFromPath(STATE.drawing)
						commands = getAbsoluteCommands(commands)
						commands = getSimplifiedCommands(commands)
					
				// get commands un-adjusted for settings
						commands = getTranslatedCommands(commands, -svgRadius, -svgRadius)
						commands = getScaledCommands(commands, imageScale, imageScale)
						commands = getTranslatedCommands(commands, imageTranslationX, imageTranslationY)
						commands = getRotatedCommands(commands, imageRotation)
						commands = getScaledCommands(commands, imageXFlip, imageYFlip)
						commands = getTranslatedCommands(commands, svgRadius, svgRadius)

				// reverse?
					let curves = getCurvesFromCommands(commands)
						if (getSignedArea(curves) < 0) {
							curves = getReversedCurves(curves)
							commands = getCommandsFromCurves(curves)
						}

				// update state
					STATE.tools.mask.path = getPathFromCommands(commands)
					STATE.tools.mask.scale = 0
					STATE.tools.mask.rotation = 0
					STATE.tools.mask.xFlip = 1
					STATE.tools.mask.yFlip = 1
					STATE.tools.mask.x = 0
					STATE.tools.mask.y = 0

				// update elements
					ELEMENTS.tools.mask.path.value = STATE.tools.mask.path
					ELEMENTS.tools.mask.scale.value = STATE.tools.mask.scale
					ELEMENTS.tools.mask.rotation.value = STATE.tools.mask.rotation
					ELEMENTS.tools.mask.xFlip.checked = (STATE.tools.mask.xFlip == -1)
					ELEMENTS.tools.mask.yFlip.checked = (STATE.tools.mask.yFlip == -1)
					ELEMENTS.tools.mask.x.value = STATE.tools.mask.x
					ELEMENTS.tools.mask.y.value = STATE.tools.mask.y

				// update state
					STATE.drawing = false

				// redraw
					drawImage()

				// update history
					appendHistory()
			} catch (error) {console.log(error)}
		}

/*** canvas ***/
	/* clearCanvas */
		function clearCanvas() {
			try {
				// clear
					ELEMENTS.context.clearRect(0, 0, CONSTANTS.canvasSize, CONSTANTS.canvasSize)
			} catch (error) {console.log(error)}
		}

	/* drawImage */
		function drawImage() {
			try {
				// clear
					clearCanvas()

				// recolored image
					if (!STATE.wetImage) {
						return
					}

				// natural image dimensions
					const imageWidth = STATE.wetImage.naturalWidth
					const imageHeight = STATE.wetImage.naturalHeight

				// resize for canvas
					const canvasRadius   = CONSTANTS.canvasSize / 2
					const resizeFactor   = CONSTANTS.canvasSize / Math.max(imageWidth, imageHeight)
					const resizedWidth   = resizeFactor * imageWidth
					const resizedHeight  = resizeFactor * imageHeight
					const resizedOffsetX = (CONSTANTS.canvasSize - resizedWidth)  / 2
					const resizedOffsetY = (CONSTANTS.canvasSize - resizedHeight) / 2

				// scale settings
					const imageScale        = 2 ** STATE.tools.transform.scale
					const imageScaledWidth  = imageScale * resizedWidth
					const imageScaledHeight = imageScale * resizedHeight
					const imageXoffset      = (CONSTANTS.canvasSize - imageScaledWidth)  / 2
					const imageYoffset      = (CONSTANTS.canvasSize - imageScaledHeight) / 2
					const maskScale         = 2 ** STATE.tools.mask.scale

				// rotation settings
					const imageRotation = STATE.tools.transform.rotation * (CONSTANTS.circleRadians / CONSTANTS.circleDegrees)
					const maskRotation  = STATE.tools.mask.rotation      * (CONSTANTS.circleRadians / CONSTANTS.circleDegrees)

				// flip settings
					const imageXFlip = STATE.tools.transform.xFlip
					const imageYFlip = STATE.tools.transform.yFlip
					const maskXFlip  = STATE.tools.mask.xFlip
					const maskYFlip  = STATE.tools.mask.yFlip
					const maskInvert = STATE.tools.mask.invert ? (STATE.tools.mask.xFlip + STATE.tools.mask.yFlip == 0 ? CONSTANTS.invertPathFlipped : CONSTANTS.invertPath) : ""

				// translation settings
					const imageX = CONSTANTS.canvasSize * STATE.tools.transform.x * imageScale
					const imageY = CONSTANTS.canvasSize * STATE.tools.transform.y * imageScale
					const maskX  = CONSTANTS.canvasSize * STATE.tools.mask.x * maskScale
					const maskY  = CONSTANTS.canvasSize * STATE.tools.mask.y * maskScale

				// mask path settings
					const maskPath = STATE.tools.mask.path ? transformMask({
						path: STATE.tools.mask.path,
						imageScale: imageScale,
						imageTranslationX: -resizedOffsetX,
						imageTranslationY: -resizedOffsetY,
						maskRotation,
						maskScale,
						maskXFlip,
						maskYFlip,
						maskX,
						maskY,
						maskInvert
					}) : null

				// tiling
					if (STATE.tools.tiling.active) {
						ELEMENTS.context.save()

						// mask
							if (maskPath) {
								ELEMENTS.context.translate(resizedOffsetX, resizedOffsetY)
								ELEMENTS.context.scale(1 / imageScale, 1 / imageScale)
								ELEMENTS.context.clip(new Path2D(maskPath))
								ELEMENTS.context.scale(imageScale, imageScale)
								ELEMENTS.context.translate(-resizedOffsetX, -resizedOffsetY)
							}

						// tiling pattern
							const matrix = new DOMMatrix([1, 0, 0, 1, 0, 0])
							const pattern = ELEMENTS.context.createPattern(STATE.wetImage, "repeat")
								pattern.setTransform(matrix
									.translate(imageXoffset + imageX, imageYoffset + imageY)
									.translate(imageScaledWidth / 2, imageScaledHeight / 2)
									.rotate(STATE.tools.transform.rotation)
									.scale(imageXFlip, imageYFlip)
									.translate(imageScaledWidth / -2, imageScaledHeight / -2)
									.scale(resizeFactor * imageScale)
								)
							ELEMENTS.context.fillStyle = pattern
							ELEMENTS.context.fillRect(0, 0, CONSTANTS.canvasSize, CONSTANTS.canvasSize)
						
						ELEMENTS.context.restore()
					}

				// single image
					else {
						ELEMENTS.context.save()

						// transformations
							ELEMENTS.context.translate(imageXoffset + imageX, imageYoffset + imageY)
							ELEMENTS.context.translate(imageScaledWidth / 2, imageScaledHeight / 2)
							ELEMENTS.context.rotate(imageRotation)
							ELEMENTS.context.scale(imageXFlip, imageYFlip)
							ELEMENTS.context.translate(imageScaledWidth / -2, imageScaledHeight / -2)

						// mask
							if (maskPath) {
								ELEMENTS.context.clip(new Path2D(maskPath))
							}

						// image
							ELEMENTS.context.drawImage(STATE.wetImage, 0, 0, imageScaledWidth, imageScaledHeight)

						ELEMENTS.context.restore()
					}				

				// drawing custom mask
					if (STATE.drawing) {
						const scaledDrawingPath = transformMask({
							path: STATE.drawing,
							imageScale: 1,
							imageTranslationX: 0,
							imageTranslationY: 0,
							maskRotation: 0,
							maskScale: 1,
							maskXFlip: 1,
							maskYFlip: 1,
							maskX: 0,
							maskY: 0,
							maskInvert: false
						})
						const drawingPath = new Path2D(scaledDrawingPath)
						ELEMENTS.context.strokeStyle = CONSTANTS.drawingColor
						ELEMENTS.context.lineWidth = CONSTANTS.drawingWeight
						ELEMENTS.context.stroke(drawingPath)

						ELEMENTS.context.fillStyle = CONSTANTS.drawingFill
						ELEMENTS.context.fill(drawingPath)
					}
			} catch (error) {console.log(error)}
		}

/*** svg ***/
	/* getCommandsFromPath */
		function getCommandsFromPath(path) {
			try {
				// split path
					const commands = []
					const pathComponents  = path.replace(/m/g, " m ").replace(/M/g, " M ")
												.replace(/l/g, " l ").replace(/L/g, " L ")
												.replace(/h/g, " h ").replace(/H/g, " H ")
												.replace(/v/g, " v ").replace(/V/g, " V ")
												.replace(/c/g, " c ").replace(/C/g, " C ")
												.replace(/s/g, " s ").replace(/S/g, " S ")
												.replace(/q/g, " q ").replace(/Q/g, " Q ")
												.replace(/t/g, " t ").replace(/T/g, " T ")
												.replace(/a/g, " a ").replace(/A/g, " A ")
												.replace(/z/g, " z ").replace(/Z/g, " Z ")
												.replace(/-/g, " -")
												.replace(/,/g,  " ").replace(/\n/g, " ")
												.replace(/\s+/g," ").trim().split(/\s/g)

				// build commands
					let thisCommand = ""
					let currentType = ""
					for (const i in pathComponents) {
						// new command
							if ((/[a-zA-Z]/).test(pathComponents[i])) {
								currentType = pathComponents[i]

								if (thisCommand.length) {
									commands.push(thisCommand)
								}
								thisCommand = pathComponents[i]
								continue
							}

						// limit reached
							if (thisCommand.split(/\s/g).length - 1 >= CONSTANTS.commandParameters[currentType.toLowerCase()]) {
								commands.push(thisCommand)
								thisCommand = currentType
							}

						// continue command
							thisCommand += ` ${pathComponents[i]}`
					}

				// final command
					if (thisCommand.length) {
						commands.push(thisCommand)
					}
				
				// return commands
					return commands
			} catch (error) {console.log(error)}
		}

	/* getAbsoluteCommands */
		function getAbsoluteCommands(commands) {
			try {
				// start
					const coordinates = {x: 0, y: 0}
					const shapeStart  = {x: 0, y: 0}

				// loop through commands
					for (let c = 0; c < commands.length; c++) {
						const components = commands[c].split(/\s/g)

						// m --> M
							if (components[0] == "M") {
								coordinates.x = roundNumber(Number(components[1]))
								coordinates.y = roundNumber(Number(components[2]))
								commands[c] = `M ${coordinates.x} ${coordinates.y}`

								shapeStart.x = coordinates.x
								shapeStart.y = coordinates.y
							}
							else if (components[0] == "m") {
								coordinates.x += roundNumber(Number(components[1]))
								coordinates.y += roundNumber(Number(components[2]))
								commands[c] = `M ${coordinates.x} ${coordinates.y}`

								shapeStart.x = coordinates.x
								shapeStart.y = coordinates.y
							}

						// h/H/v/V/l --> L
							else if (components[0] == "L") {
								coordinates.x = roundNumber(Number(components[1]))
								coordinates.y = roundNumber(Number(components[2]))
								commands[c] = `L ${coordinates.x} ${coordinates.y}`
							}
							else if (components[0] == "l") {
								coordinates.x += roundNumber(Number(components[1]))
								coordinates.y += roundNumber(Number(components[2]))
								commands[c] = `L ${coordinates.x} ${coordinates.y}`
							}

								else if (components[0] == "H") {
									coordinates.x = roundNumber(Number(components[1]))
									commands[c] = `L ${coordinates.x} ${coordinates.y}`
								}
								else if (components[0] == "h") {
									coordinates.x += roundNumber(Number(components[1]))
									commands[c] = `L ${coordinates.x} ${coordinates.y}`
								}

								else if (components[0] == "V") {
									coordinates.y = roundNumber(Number(components[1]))
									commands[c] = `L ${coordinates.x} ${coordinates.y}`
								}
								else if (components[0] == "v") {
									coordinates.y += roundNumber(Number(components[1]))
									commands[c] = `L ${coordinates.x} ${coordinates.y}`
								}

						// s/S/c --> C
							else if (components[0] == "C") {
								const controlX1 = roundNumber(Number(components[1]))
								const controlY1 = roundNumber(Number(components[2]))
								const controlX2 = roundNumber(Number(components[3]))
								const controlY2 = roundNumber(Number(components[4]))
								coordinates.x = roundNumber(Number(components[5]))
								coordinates.y = roundNumber(Number(components[6]))
								commands[c] = `C ${controlX1} ${controlY1} ${controlX2} ${controlY2} ${coordinates.x} ${coordinates.y}`
							}
							else if (components[0] == "c") {
								const controlX1 = roundNumber(coordinates.x + Number(components[1]))
								const controlY1 = roundNumber(coordinates.y + Number(components[2]))
								const controlX2 = roundNumber(coordinates.x + Number(components[3]))
								const controlY2 = roundNumber(coordinates.y + Number(components[4]))
								coordinates.x += roundNumber(Number(components[5]))
								coordinates.y += roundNumber(Number(components[6]))
								commands[c] = `C ${controlX1} ${controlY1} ${controlX2} ${controlY2} ${coordinates.x} ${coordinates.y}`
							}

								else if (components[0] == "S") {
									const previousCommand = commands[c - 1]?.split(/\s/g)
									const controlX1 = roundNumber((previousCommand?.[0] == "C") ? (2 * coordinates.x - Number(previousCommand[3])) : coordinates.x)
									const controlY1 = roundNumber((previousCommand?.[0] == "C") ? (2 * coordinates.y - Number(previousCommand[4])) : coordinates.y)
									const controlX2 = roundNumber(Number(components[1]))
									const controlY2 = roundNumber(Number(components[2]))
									coordinates.x = roundNumber(Number(components[3]))
									coordinates.y = roundNumber(Number(components[4]))
									commands[c] = `C ${controlX1} ${controlY1} ${controlX2} ${controlY2} ${coordinates.x} ${coordinates.y}`
								}
								else if (components[0] == "s") {
									const previousCommand = commands[c - 1]?.split(/\s/g)
									const controlX1 = roundNumber((previousCommand?.[0] == "C") ? (2 * coordinates.x - Number(previousCommand[3])) : coordinates.x)
									const controlY1 = roundNumber((previousCommand?.[0] == "C") ? (2 * coordinates.y - Number(previousCommand[4])) : coordinates.y)
									const controlX2 = roundNumber(coordinates.x + Number(components[1]))
									const controlY2 = roundNumber(coordinates.y + Number(components[2]))
									coordinates.x += roundNumber(Number(components[3]))
									coordinates.y += roundNumber(Number(components[4]))
									commands[c] = `C ${controlX1} ${controlY1} ${controlX2} ${controlY2} ${coordinates.x} ${coordinates.y}`
								}

						// t/T/q --> Q
							else if (components[0] == "Q") {
								const controlX = roundNumber(Number(components[1]))
								const controlY = roundNumber(Number(components[2]))
								coordinates.x = roundNumber(Number(components[3]))
								coordinates.y = roundNumber(Number(components[4]))
								commands[c] = `Q ${controlX} ${controlY} ${coordinates.x} ${coordinates.y}`
							}
							else if (components[0] == "q") {
								const controlX = roundNumber(coordinates.x + Number(components[1]))
								const controlY = roundNumber(coordinates.y + Number(components[2]))
								coordinates.x += roundNumber(Number(components[3]))
								coordinates.y += roundNumber(Number(components[4]))
								commands[c] = `Q ${controlX} ${controlY} ${coordinates.x} ${coordinates.y}`
							}

								else if (components[0] == "T") {
									const previousCommand = commands[c - 1]?.split(/\s/g)
									const controlX = roundNumber((previousCommand?.[0] == "Q") ? (2 * coordinates.x - Number(previousCommand[1])) : coordinates.x)
									const controlY = roundNumber((previousCommand?.[0] == "Q") ? (2 * coordinates.y - Number(previousCommand[2])) : coordinates.y)
									coordinates.x = roundNumber(Number(components[1]))
									coordinates.y = roundNumber(Number(components[2]))
									commands[c] = `Q ${controlX} ${controlY} ${coordinates.x} ${coordinates.y}`
								}
								else if (components[0] == "t") {
									const previousCommand = commands[c - 1]?.split(/\s/g)
									const controlX = roundNumber((previousCommand?.[0] == "Q") ? (2 * coordinates.x - Number(previousCommand[1])) : coordinates.x)
									const controlY = roundNumber((previousCommand?.[0] == "Q") ? (2 * coordinates.y - Number(previousCommand[2])) : coordinates.y)
									coordinates.x += roundNumber(Number(components[1]))
									coordinates.y += roundNumber(Number(components[2]))
									commands[c] = `Q ${controlX} ${controlY} ${coordinates.x} ${coordinates.y}`
								}

						// a --> A
							else if (components[0] == "A") {
								const rx = roundNumber(Number(components[1]))
								const ry = roundNumber(Number(components[2]))
								const rotation = roundNumber(Number(components[3]))
								const largeArcFlag = components[4]
								const sweepFlag = components[5]
								coordinates.x = roundNumber(Number(components[6]))
								coordinates.y = roundNumber(Number(components[7]))
								commands[c] = `A ${rx} ${ry} ${rotation} ${largeArcFlag} ${sweepFlag} ${coordinates.x} ${coordinates.y}`
							}
							else if (components[0] == "a") {
								const rx = roundNumber(Number(components[1]))
								const ry = roundNumber(Number(components[2]))
								const rotation = roundNumber(Number(components[3]))
								const largeArcFlag = components[4]
								const sweepFlag = components[5]
								coordinates.x += roundNumber(Number(components[6]))
								coordinates.y += roundNumber(Number(components[7]))
								commands[c] = `A ${rx} ${ry} ${rotation} ${largeArcFlag} ${sweepFlag} ${coordinates.x} ${coordinates.y}`
							}

						// z --> Z
							else if (components[0] == "Z") {
								coordinates.x = shapeStart.x
								coordinates.y = shapeStart.y
							}
							else if (components[0] == "z") {
								commands[c] = `Z`
								coordinates.x = shapeStart.x
								coordinates.y = shapeStart.y
							}
					}

				// return
					return commands
			} catch (error) {console.log(error)}
		}

	/* getSimplifiedCommands */
		function getSimplifiedCommands(commands) {
			try {
				// start
					const coordinates = {x: 0, y: 0}
					const shapeStart  = {x: 0, y: 0}
					const newCommands = []

				// loop through commands
					for (let c = 0; c < commands.length; c++) {
						const components = commands[c].split(/\s/g)

						// M
							if (components[0] == "M") {
								coordinates.x = Number(components[1])
								coordinates.y = Number(components[2])
								newCommands.push(`M ${coordinates.x} ${coordinates.y}`)
								shapeStart.x = coordinates.x
								shapeStart.y = coordinates.y
							}

						// L --> C
							else if (components[0] == "L") {
								const controlX1 = roundNumber(coordinates.x + (1 / 3) * (Number(components[1]) - coordinates.x))
								const controlY1 = roundNumber(coordinates.y + (1 / 3) * (Number(components[2]) - coordinates.y))
								const controlX2 = roundNumber(coordinates.x + (2 / 3) * (Number(components[1]) - coordinates.x))
								const controlY2 = roundNumber(coordinates.y + (2 / 3) * (Number(components[2]) - coordinates.y))
								coordinates.x = Number(components[1])
								coordinates.y = Number(components[2])
								newCommands.push(`C ${controlX1} ${controlY1} ${controlX2} ${controlY2} ${coordinates.x} ${coordinates.y}`)
							}

						// C
							else if (components[0] == "C") {
								const controlX1 = roundNumber(components[1])
								const controlY1 = roundNumber(components[2])
								const controlX2 = roundNumber(components[3])
								const controlY2 = roundNumber(components[4])
								coordinates.x = Number(components[5])
								coordinates.y = Number(components[6])
								newCommands.push(`C ${controlX1} ${controlY1} ${controlX2} ${controlY2} ${coordinates.x} ${coordinates.y}`)
							}

						// Q --> C
							else if (components[0] == "Q") {
								const controlX1 = roundNumber(coordinates.x + (2 / 3) * (Number(components[1]) - coordinates.x))
								const controlY1 = roundNumber(coordinates.y + (2 / 3) * (Number(components[2]) - coordinates.y))
								const controlX2 = roundNumber(Number(components[3]) + (2 / 3) * (Number(components[1]) - Number(components[3])))
								const controlY2 = roundNumber(Number(components[4]) + (2 / 3) * (Number(components[2]) - Number(components[4])))
								coordinates.x = roundNumber(Number(components[3]))
								coordinates.y = roundNumber(Number(components[4]))
								newCommands.push(`C ${controlX1} ${controlY1} ${controlX2} ${controlY2} ${coordinates.x} ${coordinates.y}`)
							}

						// A --> C
							else if (components[0] == "A") {
								const arcCommands = getCubicBezierFromElliptical(coordinates, commands[c])
								for (const a in arcCommands) {
									newCommands.push(arcCommands[a])
								}
								coordinates.x = Number(components[6])
								coordinates.y = Number(components[7])
							}

						// Z
							else if (components[0] == "Z") {
								coordinates.x = shapeStart.x
								coordinates.y = shapeStart.y
								newCommands.push(`Z`)
							}

						// others
							else {
								throw new Error(`non-standard command: ${components[0]}`)
							}
					}

				// return
					return newCommands
			} catch (error) {console.log(error)}
		}

	/* getTranslatedCommands */
		function getTranslatedCommands(commands, deltaX, deltaY, snap) {
			try {
				// loop through commands
					for (let c = 0; c < commands.length; c++) {
						// components
							const components = commands[c].split(/\s/g)

						// M
							if (components[0] == "M") {
								let x = roundNumber(Number(components[1]) + deltaX)
								let y = roundNumber(Number(components[2]) + deltaY)
								if (snap) {
									x = Math.round(x)
									y = Math.round(y)
								}
								commands[c] = `M ${x} ${y}`
							}

						// L
							else if (components[0] == "L") {
								let x = roundNumber(Number(components[1]) + deltaX)
								let y = roundNumber(Number(components[2]) + deltaY)
								if (snap) {
									x = Math.round(x)
									y = Math.round(y)
								}
								commands[c] = `L ${x} ${y}`
							}

							// H
								else if (components[0] == "H") {
									let x = roundNumber(Number(components[1]) + deltaX)
									if (snap) {
										x = Math.round(x)
									}
									commands[c] = `H ${x}`
								}

							// V
								else if (components[0] == "V") {
									let y = roundNumber(Number(components[1]) + deltaY)
									if (snap) {
										y = Math.round(y)
									}
									commands[c] = `V ${y}`
								}

						// C
							else if (components[0] == "C") {
								let controlX1 = roundNumber(Number(components[1]) + deltaX)
								let controlY1 = roundNumber(Number(components[2]) + deltaY)
								let controlX2 = roundNumber(Number(components[3]) + deltaX)
								let controlY2 = roundNumber(Number(components[4]) + deltaY)
								let finalX    = roundNumber(Number(components[5]) + deltaX)
								let finalY    = roundNumber(Number(components[6]) + deltaY)
								if (snap) {
									controlX1 = Math.round(controlX1)
									controlY1 = Math.round(controlY1)
									controlX2 = Math.round(controlX2)
									controlY2 = Math.round(controlY2)
									finalX    = Math.round(finalX)
									finalY    = Math.round(finalY)
								}
								commands[c] = `C ${controlX1} ${controlY1} ${controlX2} ${controlY2} ${finalX} ${finalY}`
							}

							// S
								else if (components[0] == "S") {
									let controlX2 = roundNumber(Number(components[1]) + deltaX)
									let controlY2 = roundNumber(Number(components[2]) + deltaY)
									let finalX    = roundNumber(Number(components[3]) + deltaX)
									let finalY    = roundNumber(Number(components[4]) + deltaY)
									if (snap) {
										controlX2 = Math.round(controlX2)
										controlY2 = Math.round(controlY2)
										finalX    = Math.round(finalX)
										finalY    = Math.round(finalY)
									}
									commands[c] = `S ${controlX2} ${controlY2} ${finalX} ${finalY}`
								}

						// Q
							else if (components[0] == "Q") {
								let controlX = roundNumber(Number(components[1]) + deltaX)
								let controlY = roundNumber(Number(components[2]) + deltaY)
								let finalX   = roundNumber(Number(components[3]) + deltaX)
								let finalY   = roundNumber(Number(components[4]) + deltaY)
								if (snap) {
									controlX = Math.round(controlX)
									controlY = Math.round(controlY)
									finalX   = Math.round(finalX)
									finalY   = Math.round(finalY)
								}
								commands[c] = `Q ${controlX} ${controlY} ${finalX} ${finalY}`
							}

							// T
								else if (components[0] == "T") {
									let finalX    = roundNumber(Number(components[1]) + deltaX)
									let finalY    = roundNumber(Number(components[2]) + deltaY)
									if (snap) {
										finalX   = Math.round(finalX)
										finalY   = Math.round(finalY)
									}
									commands[c] = `T ${finalX} ${finalY}`
								}

						// A
							else if (components[0] == "A") {
								let radiusX = roundNumber(Number(components[1]))
								let radiusY = roundNumber(Number(components[2]))
								let rotationDegrees = roundNumber(Number(components[3]))
								let largeArcFlag = components[4]
								let sweepFlag = components[5]
								let finalX    = roundNumber(Number(components[6]) + deltaX)
								let finalY    = roundNumber(Number(components[7]) + deltaY)
								if (snap) {
									radiusX = Math.round(radiusX)
									radiusY = Math.round(radiusY)
									finalX = Math.round(finalX)
									finalY = Math.round(finalY)
								}
								commands[c] = `A ${radiusX} ${radiusY} ${rotationDegrees} ${largeArcFlag} ${sweepFlag} ${finalX} ${finalY}`
							}

						// Z
							else if (components[0] == "Z") {
								commands[c] = `Z` 
							}
					}

				// return
					return commands
			} catch (error) {console.log(error)}
		}

	/* getScaledCommands */
		function getScaledCommands(commands, factorX, factorY, snap) {
			try {
				// loop through commands
					for (let c = 0; c < commands.length; c++) {
						// components
							const components = commands[c].split(/\s/g)

						// M
							if (components[0] == "M") {
								let x = roundNumber(Number(components[1]) * factorX)
								let y = roundNumber(Number(components[2]) * factorY)
								if (snap) {
									x = Math.round(x)
									y = Math.round(y)
								}
								commands[c] = `${components[0]} ${x} ${y}`
							}

						// C
							else if (components[0] == "C") {
								let controlX1 = roundNumber(Number(components[1]) * factorX)
								let controlY1 = roundNumber(Number(components[2]) * factorY)
								let controlX2 = roundNumber(Number(components[3]) * factorX)
								let controlY2 = roundNumber(Number(components[4]) * factorY)
								let finalX    = roundNumber(Number(components[5]) * factorX)
								let finalY    = roundNumber(Number(components[6]) * factorY)
								if (snap) {
									controlX1 = Math.round(controlX1)
									controlY1 = Math.round(controlY1)
									controlX2 = Math.round(controlX2)
									controlY2 = Math.round(controlY2)
									finalX    = Math.round(finalX)
									finalY    = Math.round(finalY)
								}
								commands[c] = `${components[0]} ${controlX1} ${controlY1} ${controlX2} ${controlY2} ${finalX} ${finalY}`
							}

						// Z
							else if (components[0] == "Z") {
								commands[c] = `${components[0]}` 
							}
					}

				// return
					return commands
			} catch (error) {console.log(error)}
		}

	/* getRotatedCommands */
		function getRotatedCommands(commands, rotationRadians, snap) {
			try {
				// get trig
					const cosTheta = Math.cos(rotationRadians)
					const sinTheta = Math.sin(rotationRadians)

				// loop through commands
					for (let c = 0; c < commands.length; c++) {
						// components
							const components = commands[c].split(/\s/g)

						// M
							if (components[0] == "M") {
								const final = getRotatedPoint({
									x: Number(components[1]),
									y: Number(components[2]),
								}, {cosTheta, sinTheta})
								if (snap) {
									final.x = Math.round(final.x)
									final.y = Math.round(final.y)
								}
								commands[c] = `${components[0]} ${final.x} ${final.y}`
							}

						// C
							else if (components[0] == "C") {
								const control1 = getRotatedPoint({
									x: Number(components[1]),
									y: Number(components[2]),
								}, {cosTheta, sinTheta})
								const control2 = getRotatedPoint({
									x: Number(components[3]),
									y: Number(components[4]),
								}, {cosTheta, sinTheta})
								const final = getRotatedPoint({
									x: Number(components[5]),
									y: Number(components[6]),
								}, {cosTheta, sinTheta})

								let controlX1 = control1.x
								let controlY1 = control1.y
								let controlX2 = control2.x
								let controlY2 = control2.y
								let finalX    = final.x
								let finalY    = final.y
								if (snap) {
									controlX1 = Math.round(controlX1)
									controlY1 = Math.round(controlY1)
									controlX2 = Math.round(controlX2)
									controlY2 = Math.round(controlY2)
									finalX    = Math.round(finalX)
									finalY    = Math.round(finalY)
								}
								commands[c] = `${components[0]} ${controlX1} ${controlY1} ${controlX2} ${controlY2} ${finalX} ${finalY}`
							}

						// Z
							else if (components[0] == "Z") {
								commands[c] = `${components[0]}` 
							}
					}

				// return
					return commands
			} catch (error) {console.log(error)}
		}

	/* getPathFromCommands */
		function getPathFromCommands(commands) {
			try {
				return commands.join("\n")
			} catch (error) {console.log(error)}
		}

	/* getCubicBezierFromElliptical */
		function getCubicBezierFromElliptical(start, arcCommand) {
			try {
				// get parameters
					const components = arcCommand.split(/\s/)
					const startX = start.x
					const startY = start.y
					const radiusX = Number(components[1])
					const radiusY = Number(components[2])
					const rotationDegrees = Number(components[3])
					const largeArcFlag = Boolean(Number(components[4]))
					const sweepFlag = Boolean(Number(components[5]))
					const endX = Number(components[6])
					const endY = Number(components[7])

				// convert to center parameterization
					const {center, radius, startAngle, deltaAngle} = getCenterParametersFromEndpointParameters({x: startX, y: startY}, {x: radiusX, y: radiusY}, rotationDegrees, largeArcFlag, sweepFlag, {x: endX, y: endY})

				// split into smaller angles
					let anglePerCurve = Math.abs(deltaAngle)
					let split = 1
					while (Math.round(anglePerCurve * CONSTANTS.circleDegrees / CONSTANTS.circleRadians) > CONSTANTS.maxArcAngleForCubicBezier) {
						split++
						anglePerCurve = Math.abs(deltaAngle) / split
					}
					anglePerCurve *= Math.sign(deltaAngle)

				// build command
					const commands = []

				// get control points
					const rotationRadians = rotationDegrees * CONSTANTS.circleRadians / CONSTANTS.circleDegrees
					for (let i = 0; i < split; i++) {
						const thisStartAngle = startAngle + (anglePerCurve * i)
						const {controlPoint1, controlPoint2, endPoint} = getControlPointsFromCenterParameters(center, radius, rotationRadians, thisStartAngle, anglePerCurve)
						commands.push(`C ${controlPoint1.x} ${controlPoint1.y} ${controlPoint2.x} ${controlPoint2.y} ${endPoint.x} ${endPoint.y}`)
					}

				// return cubic bezier command
					return commands
			} catch (error) {console.log(error)}
		}

	/* getCenterParametersFromEndpointParameters */
		function getCenterParametersFromEndpointParameters(start, radius, rotationDegrees, largeArcFlag, sweepFlag, end) {
			try {
				// code adapted from https://mortoray.com/rendering-an-svg-elliptical-arc-as-bezier-curves
				// based on formulae from https://www.w3.org/TR/SVG11/implnote.html#ArcConversionEndpointToCenter

				// radians
					const rotationRadians = rotationDegrees * (CONSTANTS.circleRadians / CONSTANTS.circleDegrees)

				// Step 0: Compute (rx, ry)
					let radiusX = Math.abs(radius.x)
					let radiusY = Math.abs(radius.y)

				// Step 1: Compute (x1′, y1′)
					const dXHalf = (start.x - end.x) / 2
					const dYHalf = (start.y - end.y) / 2
					const startXadjusted =  Math.cos(rotationRadians) * dXHalf + Math.sin(rotationRadians) * dYHalf
					const startYadjusted = -Math.sin(rotationRadians) * dXHalf + Math.cos(rotationRadians) * dYHalf

				// Step 2: Compute (cx′, cy′)
					let radiusXSquared = radiusX ** 2
					let radiusYSquared = radiusY ** 2
					const startXadjustedSquared = startXadjusted ** 2
					const startYadjustedSquared = startYadjusted ** 2
					
					const centerRatio = (startXadjustedSquared / radiusXSquared) + (startYadjustedSquared / radiusYSquared)
					if (centerRatio > 1) {
						const squareRoot = Math.sqrt(centerRatio)
						radiusX = squareRoot * radiusX
						radiusY = squareRoot * radiusY
						radiusXSquared = radiusX ** 2
						radiusYSquared = radiusY ** 2
					}

					const denominator = (radiusXSquared * startYadjustedSquared) + (radiusYSquared * startXadjustedSquared)
					const numerator = (radiusXSquared * radiusYSquared) - denominator
					const fraction = numerator / denominator
					let squareRoot = Math.sqrt(Math.max(0, fraction)) // prevent imaginary numbers
					if (largeArcFlag == sweepFlag) {
						squareRoot *= -1
					}
					const centerXadjusted =  squareRoot * (radiusX / radiusY) * startYadjusted 
					const centerYadjusted = -squareRoot * (radiusY / radiusX) * startXadjusted

				// Step 3: Compute (cx, cy) from (cx′, cy′)
					const centerX = Math.cos(rotationRadians) * centerXadjusted - 
									Math.sin(rotationRadians) * centerYadjusted + 
									(start.x + end.x) / 2
					const centerY = Math.sin(rotationRadians) * centerXadjusted + 
									Math.cos(rotationRadians) * centerYadjusted + 
									(start.y + end.y) / 2

				// Step 4: Compute θ1 and Δθ
					let startAngle = getAngleFromVectors(
						1,
						0,
						(startXadjusted - centerXadjusted) / radiusX, 
						(startYadjusted - centerYadjusted) / radiusY
					)
					if (startAngle == -0) { startAngle = 0 }

					let deltaAngle = getAngleFromVectors(
						( startXadjusted - centerXadjusted) / radiusX,
						( startYadjusted - centerYadjusted) / radiusY,
						(-startXadjusted - centerXadjusted) / radiusX,
						(-startYadjusted - centerYadjusted) / radiusY
					)

					if (!sweepFlag) {
						deltaAngle -= CONSTANTS.circleRadians
					}
					deltaAngle = deltaAngle % CONSTANTS.circleRadians

					if (largeArcFlag && sweepFlag) {
						deltaAngle = CONSTANTS.circleRadians - Math.abs(deltaAngle)
					}
					if (deltaAngle == -0) { deltaAngle = 0 }

				// output
					return {
						center: {x: centerX, y: centerY},
						radius: {x: radiusX, y: radiusY},
						startAngle,
						deltaAngle
					}
			} catch (error) {console.log(error)}
		}

	/* getControlPointsFromCenterParameters */
		function getControlPointsFromCenterParameters(center, radius, rotationRadians, startAngle, deltaAngle) {
			try {
				// code adapted from https://mortoray.com/rendering-an-svg-elliptical-arc-as-bezier-curves/

				// P1 & P2
					const p1 = getEllipticalPoint(center, radius, rotationRadians, startAngle)
					const p2 = getEllipticalPoint(center, radius, rotationRadians, startAngle + deltaAngle)

				// alpha
					const alpha = Math.sin(deltaAngle) * (Math.sqrt(4 + 3 * Math.tan(deltaAngle / 2) ** 2) - 1) / 3

				// derivatives
					const d1 = getEllipticArcDerivative(center, radius, rotationRadians, startAngle)
					const d2 = getEllipticArcDerivative(center, radius, rotationRadians, startAngle + deltaAngle)

				// control points
					const q1 = {
						x: roundNumber(p1.x + alpha * d1.x),
						y: roundNumber(p1.y + alpha * d1.y),
					}
					const q2 = {
						x: roundNumber(p2.x - alpha * d2.x),
						y: roundNumber(p2.y - alpha * d2.y),
					}

				// return
					return {
						controlPoint1: q1,
						controlPoint2: q2,
						endPoint: {
							x: roundNumber(p2.x),
							y: roundNumber(p2.y)
						}
					}
			} catch (error) {console.log(error)}
		}

	/* getAngleFromVectors */
		function getAngleFromVectors(ux, uy, vx, vy) {
			try {
				// two vectors (ux, uy) and (vx, vy)
					const u = [ux, uy]
					const v = [vx, vy]

				// vector math
					const dotProduct = (ux * vx + uy * vy)
					const vectorLength = Math.sqrt(ux ** 2 + uy ** 2) * Math.sqrt(vx ** 2 + vy ** 2)

				// get angle
					const cosine = Math.min(Math.max(dotProduct / vectorLength, -1), 1)
					let angle = Math.acos(cosine)
					if ((ux * vy) - (uy * vx) < 0) {
						angle = -angle
					}
					if (angle == -0) {
						angle = 0
					}

				// return
					return angle
			} catch (error) {console.log(error)}
		}

	/* getEllipticPoint */
		function getEllipticalPoint(center, radius, rotationRadians, ellipseRadians) {
			try {
				// code adapted from https://mortoray.com/rendering-an-svg-elliptical-arc-as-bezier-curves

				// coordinates
					const x = center.x + 
						radius.x * Math.cos(rotationRadians) * Math.cos(ellipseRadians) -
						radius.y * Math.sin(rotationRadians) * Math.sin(ellipseRadians)
					const y = center.y + 
						radius.x * Math.sin(rotationRadians) * Math.cos(ellipseRadians) +
						radius.y * Math.cos(rotationRadians) * Math.sin(ellipseRadians)

				// return
					return {x, y}
			} catch (error) {console.log(error)}
		}

	/* getEllipticArcDerivative */
		function getEllipticArcDerivative(center, radius, rotationRadians, ellipseRadians) {
			try {
				// code adapted from https://mortoray.com/rendering-an-svg-elliptical-arc-as-bezier-curves			
				
				// coordinates
					const x = -radius.x * Math.cos(rotationRadians) * Math.sin(ellipseRadians) - 
							   radius.y * Math.sin(rotationRadians) * Math.cos(ellipseRadians)
					const y = -radius.x * Math.sin(rotationRadians) * Math.sin(ellipseRadians) + 
							   radius.y * Math.cos(rotationRadians) * Math.cos(ellipseRadians)

				// return
					return {x, y}
			} catch (error) {console.log(error)}
		}

	/* getRotatedPoint */
		function getRotatedPoint({x, y}, {radians, cosTheta, sinTheta}) {
			try {
				// no cosTheta / sinTheta
					if (radians !== undefined && (cosTheta == undefined || sinTheta == undefined)) {
						cosTheta = Math.cos(radians)
						sinTheta = Math.sin(radians)
					}

				// new point
					return {
						x: roundNumber(x * cosTheta - y * sinTheta),
						y: roundNumber(y * cosTheta + x * sinTheta)
					}
			} catch (error) {console.log(error)}
		}

	/* getCurvesFromCommands */
		function getCurvesFromCommands(commands) {
			try {
				// empty curves
					const curves = []
					const coordinates = {x: null, y: null}
					const start       = {x: null, y: null}

				// loop through commands
					for (let c = 0; c < commands.length; c++) {
						// components
							const components = commands[c].split(/\s/g)

						// M
							if (components[0] == "M") {
								if (c && !curves[curves.length - 1].z) {
									curves.push({
										z: true,
										zx: start.x,
										zy: start.y
									})
								}

								curves.push({
									x: Number(components[1]),
									y: Number(components[2])
								})

								coordinates.x = Number(components[1])
								coordinates.y = Number(components[2])
								start.x       = coordinates.x
								start.y       = coordinates.y
							}

						// C
							else if (components[0] == "C") {
								curves.push({
									c1x: Number(components[1]),
									c1y: Number(components[2]),
									c2x: Number(components[3]),
									c2y: Number(components[4]),
									x: Number(components[5]),
									y: Number(components[6])
								})
								coordinates.x = Number(components[5])
								coordinates.y = Number(components[6])
							}

						// Z
							else if (components[0] == "Z") {
								if (!curves[curves.length - 1].z) {
									curves.push({
										z: true,
										zx: start.x,
										zy: start.y
									})
									coordinates.x = start.x
									coordinates.y = start.y
								}
							}

						// others
							else {
								throw new Error(`non-standard command: ${components[0]}`)
							}
					}

				// always end in Z
					if (!curves[curves.length - 1].z) {
						curves.push({
							z: true,
							zx: start.x,
							zy: start.y
						})
					}

				// return
					return curves
			} catch (error) {console.log(error)}
		}

	/* getSignedArea */
		function getSignedArea(curves) {
			try {
				// A = 1/2 * (x1*y2 - x2*y1 + x2*y3 - x3*y2 + ... + xn*y1 - x1*yn)

				// get all points
					const points = []
					for (const c in curves) {
						points.push(curves[c].z ? {x: curves[c].zx, y: curves[c].zy} : {x: curves[c].x, y: curves[c].y})
					}

				// calculate area
					let area = 0
					for (let p = 0; p < points.length; p++) {
						const thisPoint = points[p]
						const nextPoint = points[p + 1] ?? points[0]

						area += ((thisPoint.x * nextPoint.y) - (nextPoint.x * thisPoint.y))
					}

				// area
					return area
			} catch (error) {console.log(error)}
		}



	/* getReversedCurves */
		function getReversedCurves(curves, intersections) {
			try {
				// replace Zs with Cs (as necessary)
					const curvesCopy = getZtoCCurves(duplicateObject(curves))

				// new curves
					const newCurves = []
					const startPoint = {x: null, y: null}
					const controlPoints = {}

				// loop through in reverse
					for (let c = curvesCopy.length; c; c--) {
						// new curve
							const newCurve = {
								x: curvesCopy[c - 1].x,
								y: curvesCopy[c - 1].y
							}

						// C (held controlPoints)
							if (controlPoints.c1x !== undefined && controlPoints.c1y !== undefined && 
								controlPoints.c2x !== undefined && controlPoints.c2y !== undefined) {
								newCurve.c1x = controlPoints.c2x
								newCurve.c1y = controlPoints.c2y
								newCurve.c2x = controlPoints.c1x
								newCurve.c2y = controlPoints.c1y
							}

						// M
							else {
								startPoint.x = curvesCopy[c - 1].x
								startPoint.y = curvesCopy[c - 1].y
							}

						// hold new controlPoints (or undefined)
							controlPoints.c1x = curvesCopy[c - 1].c1x ?? undefined
							controlPoints.c1y = curvesCopy[c - 1].c1y ?? undefined
							controlPoints.c2x = curvesCopy[c - 1].c2x ?? undefined
							controlPoints.c2y = curvesCopy[c - 1].c2y ?? undefined

						// add
							newCurves.push(newCurve)
					}

				// intersections?
					if (intersections && intersections !== true) {
						intersections.reverse()
						for (const i in intersections) {
							if (intersections[i].type == "leave") {
								intersections[i].type = "enter"
							}
							else if (intersections[i].type == "enter") {
								intersections[i].type = "leave"
							}
						}
					}

				// return
					return newCurves
			} catch (error) {console.log(error)}
		}

	/* getZtoCCurves */
		function getZtoCCurves(curves) {
			try {
				// no curves
					if (!curves || !curves.length) {
						return curves
					}

				// loop through curves
					for (let c = 0; c < curves.length; c++) {
						// not Z --> continue
							if (!curves[c].z) {
								continue
							}

						// Z in place --> remove
							if (curves[c].zx == curves[c - 1].x && curves[c].zy == curves[c - 1].y) {
								curves.splice(c, 1)
								c--
								continue
							}

						// Z --> C
							const pseudoCommands = getSimplifiedCommands([
								`M ${curves[c - 1].x } ${curves[c - 1].y }`,
								`L ${curves[c    ].zx} ${curves[c    ].zy}`
							])
							const pseudoCurves = getCurvesFromCommands(pseudoCommands).slice(0,2)
							curves[c] = pseudoCurves[1]
					}

				// return
					return curves
			} catch (error) {console.log(error)}
		}

	/* getCommandsFromCurves */
		function getCommandsFromCurves(curves) {
			try {
				// empty commands
					const commands = []

				// loop through curves
					for (let c = 0; c < curves.length; c++) {
						const curve = curves[c]

						// Z
							if (curve.z) {
								commands.push(`Z`)
							}

						// C
							else if (curve.c1x !== undefined) {
								commands.push(`C ${curve.c1x} ${curve.c1y} ${curve.c2x} ${curve.c2y} ${curve.x} ${curve.y}`)
							}

						// M
							else {
								commands.push(`M ${curve.x} ${curve.y}`)
							}
					}

				// return
					return commands
			} catch (error) {console.log(error)}
		}
