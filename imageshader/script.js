/*** globals ***/
	/* triggers */
		const TRIGGERS = {
			click: "click",
			input: "input",
			dragover: "dragover",
			drop: "drop"
		}

	/* elements */
		const ELEMENTS = {
			body: document.body,
			xyRatio: document.querySelector("#xy-ratio"),
			video: document.querySelector("#video"),
			rawCanvas: document.querySelector("#canvas-raw"),
			rawContext: document.querySelector("#canvas-raw").getContext("2d", {alpha: false, willReadFrequently: true, imageSmoothingEnabled: false}),
			processedCanvas: document.querySelector("#canvas-processed"),
			processedContext: document.querySelector("#canvas-processed").getContext("2d", {alpha: false, imageSmoothingEnabled: false}),
			controls: {
				thumb: document.querySelector("#controls-thumb"),
				camera: document.querySelector("#controls-camera"),
				upload: document.querySelector("#controls-upload"),
				download: document.querySelector("#controls-download"),
				inner: document.querySelector("#controls-inner"),
				grid: document.querySelector("#controls-grid"),
				randomize: document.querySelector("#controls-randomize"),
				raise: document.querySelector("#controls-raise"),
				lower: document.querySelector("#controls-lower"),
				thresholds: document.querySelector("#controls-thresholds")
			}
		}

	/* constants */
		const CONSTANTS = {
			imageTypes: ["image/png", "image/jpeg", "image/jpg", "image/gif", "image/webp", "image/bmp", "image/tiff", "image/svg+xml"],
			percentage: 100,
			displayLoop: null,
			intervalTime: 1000 / 50,
			maxRGBAvalue: 255,
			pixelLength: 4,
			changeAmount: 5,
			thresholds: [
				[], // 0
				[ // 1
					0.5
				],
				[ // 2
					0.2, 0.6,
					0.8, 0.4
				],
				[ // 3
					0.4, 0.1, 0.6,
					0.7, 0.9, 0.3,
					0.2, 0.5, 0.8
				],
				[ // 4
					0.03, 0.53, 0.16, 0.66,
					0.78, 0.28, 0.91, 0.41,
					0.22, 0.72, 0.09, 0.59,
					0.97, 0.47, 0.84, 0.34
				],
				[ // 5
					0.02, 0.34, 0.66, 0.10, 0.42,
					0.50, 0.18, 0.82, 0.58, 0.26,
					0.78, 0.94, 0.98, 0.74, 0.90,
					0.14, 0.46, 0.70, 0.06, 0.38,
					0.62, 0.30, 0.86, 0.54, 0.22
				]
			]
		}

	/* state */
		const STATE = {
			sourceType: "video",
			source: null,
			width: 1,
			height: 1,
			xyRatio: 1,
			scale: 2,
			thresholds: null
		}

/*** video ***/
	/* requestVideo */
		requestVideo()
		ELEMENTS.controls.camera.addEventListener(TRIGGERS.click, requestVideo)
		function requestVideo() {
			navigator.mediaDevices.getUserMedia({video: {facingMode: {exact: "environment"}}})
				.then(initializeStream)
				.catch(error => {
					navigator.mediaDevices.getUserMedia({video: true})
						.then(initializeStream)
						.catch(error => {
							console.log(error)
						})
				})
		}

	/* initializeStream */
		function initializeStream(stream) {
			ELEMENTS.video.srcObject = stream
			ELEMENTS.video.play().then(() => {
				STATE.sourceType = "video"
				STATE.source = ELEMENTS.video
				setCanvasSizes(ELEMENTS.video.videoWidth, ELEMENTS.video.videoHeight)
				clearInterval(CONSTANTS.displayLoop)
				CONSTANTS.displayLoop = setInterval(displayFrame, CONSTANTS.intervalTime)
			})
		}

/*** image ***/
	/* uploadImage */
		ELEMENTS.controls.upload.addEventListener(TRIGGERS.input, uploadImage)
		function uploadImage() {
			try {
				const file = ELEMENTS.controls.upload.files[0]

				const imageReader = new FileReader()
					imageReader.onload = event => {
						importImage(event.target.result)
					}
					imageReader.readAsDataURL(file)
			} catch (error) {console.log(error)}
		}

	/* dragImage */
		ELEMENTS.body.addEventListener(TRIGGERS.dragover, dragImage)
		function dragImage(event) {
			try {
				event.preventDefault()
			} catch (error) {console.log(error)}
		}

	/* dropImage */
		ELEMENTS.body.addEventListener(TRIGGERS.drop, dropImage)
		function dropImage(event) {
			try {
				event.preventDefault()
				if (!event.dataTransfer || !event.dataTransfer.items) {
					return
				}

				const file = [...event.dataTransfer.items][0].getAsFile()
				if (!file || !CONSTANTS.imageTypes.includes(file.type)) {
					return
				}

				const imageReader = new FileReader()
					imageReader.onload = event => {
						importImage(event.target.result)
					}
					imageReader.readAsDataURL(file)
			} catch (error) {console.log(error)}
		}

	/* importImage */
		function importImage(imageData) {
			const rawImage = new Image
				rawImage.onload = () => {
					STATE.sourceType = "image"
					STATE.source = rawImage
					setCanvasSizes(rawImage.width, rawImage.height)
					clearInterval(CONSTANTS.displayLoop)
					displayFrame()
				}
				rawImage.src = imageData
		}

	/* downloadImage */
		ELEMENTS.controls.download.addEventListener(TRIGGERS.click, downloadImage)
		function downloadImage() {
			const imageData = ELEMENTS.processedCanvas.toDataURL("image/png")
			const link = document.createElement("a")
				link.href = imageData
				link.setAttribute("download", "imageShader_" + (new Date().getTime()) + ".png")
			document.body.appendChild(link)

			setTimeout(() => {
				link.click()
				link.remove()
			})
		}

/*** assetManager ***/
	/* retrieveAsset */
		window.ASSETS_J.retrieveAsset = function(name, type, data) {
			try {
				// json
					if (type == "json") {
						const jsonData = JSON.parse(data)
						STATE.scale = Math.max(1, Math.min(5, jsonData.scale))
						STATE.thresholds = jsonData.thresholds || []
						setControlsFromJSON()
						return
					}

				// image
					importImage(data)
			} catch (error) {console.log(error)}
		}

	/* storeAsset */
		window.ASSETS_J.storeAsset = async function(type) {
			try {
				// json
					if (type == "json") {
						const data = {
							project: "imageShader",
							scale: STATE.scale,
							thresholds: duplicateObject(STATE.thresholds)
						}

						return {
							name: "imageShader_" + (new Date().getTime()) + ".json",
							type: "json",
							data: JSON.stringify(data)
						}
					}

				// png
					if (type == "png") {
						return {
							name: "imageShader_" + (new Date().getTime()) + ".png",
							type: "png",
							data: ELEMENTS.processedCanvas.toDataURL("image/png")
						}
					}
			} catch (error) {console.log(error)}
		}

/*** converters ***/
	/* duplicateObject */
		function duplicateObject(obj) {
			if (!obj || typeof obj !== "object") {
				return obj
			}
			return JSON.parse(JSON.stringify(obj))
		}

	/* getLightness */
		function getLightness(red, green, blue) {
			const min = Math.min(red, green, blue)
			const max = Math.max(red, green, blue)
			return lightness = (min + max) / 2 / CONSTANTS.maxRGBAvalue
		}

	/* getScaledIndices */
		function getScaledIndices(i, oldWidth, oldHeight, scaleX, scaleY) {
			const oldX = Math.floor(i % oldWidth)
			const oldY = Math.floor(i / oldWidth)

			const newX = oldX * scaleX
			const newY = oldY * scaleY

			const newIcount = scaleX * scaleY
			const newIs = []
			for (let y = 0; y < scaleY; y++) {
				for (let x = 0; x < scaleX; x++) {
					const newI = (newY + y) * (oldWidth * scaleX) + (newX + x)
					newIs.push(newI)
				}
			}

			return newIs
		}

/*** controls ***/
	/* toggleControls */
		ELEMENTS.controls.thumb.addEventListener(TRIGGERS.click, toggleControls)
		function toggleControls() {
			if (ELEMENTS.controls.inner.getAttribute("invisible")) {
				ELEMENTS.controls.inner.removeAttribute("invisible")
				return
			}
			ELEMENTS.controls.inner.setAttribute("invisible", true)
		}

	/* setControlsFromJSON */
		function setControlsFromJSON() {
			setCanvasSizes(STATE.width, STATE.height)
			ELEMENTS.controls.grid.value = STATE.scale
			createInputs()
		}	

	/* selectGrid */
		selectGrid()
		ELEMENTS.controls.grid.addEventListener(TRIGGERS.input, selectGrid)
		function selectGrid() {
			STATE.scale = Number(ELEMENTS.controls.grid.value)
			STATE.thresholds = CONSTANTS.thresholds[STATE.scale]
			createInputs()
			setCanvasSizes(STATE.width, STATE.height)
			if (STATE.sourceType == "image") {
				displayFrame()
			}
		}

	/* createInputs */
		createInputs()
		function createInputs() {
			ELEMENTS.controls.thresholds.innerHTML = ""

			let i = 0
			for (let y = 0; y < STATE.scale; y++) {
				const row = document.createElement("div")
					row.className = "controls-row"
				ELEMENTS.controls.thresholds.appendChild(row)

				for (let x = 0; x < STATE.scale; x++) {
					const input = document.createElement("input")
						input.className = "controls-input"
						input.id = `controls-input-${i}`
						input.type = "number"
						input.value = Math.round(STATE.thresholds[i] * CONSTANTS.percentage)
						input.min = 0
						input.max = CONSTANTS.percentage
						input.step = 1
						input.placeholder = "%"
						input.addEventListener(TRIGGERS.input, inputThreshold)
					row.appendChild(input)
					i++
				}
			}
		}

	/* inputThreshold */
		function inputThreshold(event) {
			const input = event.target.closest(".controls-input")
			const i = Number(input.id.replace("controls-input-", ""))
			const value = Math.min(Math.max(0, Number(input.value)), CONSTANTS.percentage) / CONSTANTS.percentage
			STATE.thresholds[i] = value
			if (STATE.sourceType == "image") {
				displayFrame()
			}
		}

	/* randomizeThresholds */
		ELEMENTS.controls.randomize.addEventListener(TRIGGERS.click, randomizeThresholds)
		function randomizeThresholds() {
			for (let i = 0; i < STATE.thresholds.length; i++) {
				const randomPercentage = Math.floor(Math.random() * CONSTANTS.percentage)
				STATE.thresholds[i] = randomPercentage / CONSTANTS.percentage
				ELEMENTS.controls.thresholds.querySelector(`#controls-input-${i}`).value = randomPercentage
			}
			if (STATE.sourceType == "image") {
				displayFrame()
			}
		}

	/* raiseThresholds */
		ELEMENTS.controls.raise.addEventListener(TRIGGERS.click, raiseThresholds)
		function raiseThresholds() {
			for (let i = 0; i < STATE.thresholds.length; i++) {
				const updatedPercentage = Math.min(Math.round(STATE.thresholds[i] * CONSTANTS.percentage) + CONSTANTS.changeAmount, CONSTANTS.percentage)
				STATE.thresholds[i] = updatedPercentage / CONSTANTS.percentage
				ELEMENTS.controls.thresholds.querySelector(`#controls-input-${i}`).value = updatedPercentage
			}
			if (STATE.sourceType == "image") {
				displayFrame()
			}
		}

	/* lowerThresholds */
		ELEMENTS.controls.lower.addEventListener(TRIGGERS.click, lowerThresholds)
		function lowerThresholds() {
			for (let i = 0; i < STATE.thresholds.length; i++) {
				const updatedPercentage = Math.max(Math.round(STATE.thresholds[i] * CONSTANTS.percentage) - CONSTANTS.changeAmount, 0)
				STATE.thresholds[i] = updatedPercentage / CONSTANTS.percentage
				ELEMENTS.controls.thresholds.querySelector(`#controls-input-${i}`).value = updatedPercentage
			}
			if (STATE.sourceType == "image") {
				displayFrame()
			}
		}

/*** canvas ***/
	/* clearCanvas */
		function clearCanvas(canvas, context) {
			context.clearRect(0, 0, canvas.width, canvas.height)
		}

	/* setCanvasSizes */
		function setCanvasSizes(width, height) {
			STATE.width  = width
			STATE.height = height
			
			ELEMENTS.video.width  = STATE.width
			ELEMENTS.video.height = STATE.height
			ELEMENTS.rawCanvas.width  = STATE.width  / STATE.scale
			ELEMENTS.rawCanvas.height = STATE.height / STATE.scale
			ELEMENTS.processedCanvas.width  = STATE.width
			ELEMENTS.processedCanvas.height = STATE.height

			STATE.xyRatio = STATE.height / STATE.width
			ELEMENTS.xyRatio.innerText = `:root {--xy-ratio: ${STATE.xyRatio}}`
		}

	/* displayFrame */
		function displayFrame() {
			clearCanvas(ELEMENTS.rawCanvas, ELEMENTS.rawContext)
			ELEMENTS.rawContext.drawImage(STATE.source, 0, 0, ELEMENTS.rawCanvas.width, ELEMENTS.rawCanvas.height)
			const rawFrame = ELEMENTS.rawContext.getImageData(0, 0, ELEMENTS.rawCanvas.width, ELEMENTS.rawCanvas.height)
			const processedFrame = processFrame(rawFrame)

			clearCanvas(ELEMENTS.processedCanvas, ELEMENTS.processedContext)
			ELEMENTS.processedContext.putImageData(processedFrame, 0, 0)
		}

	/* processFrame */
		function processFrame(rawFrame) {
			const data = rawFrame.data
			const dataLength = rawFrame.data.length
			const processedFrame = new ImageData(rawFrame.width * STATE.scale, rawFrame.height * STATE.scale, {colorSpace: "srgb", pixelFormat: "rgba-unorm8"})

			for (let i = 0; i < dataLength; i += CONSTANTS.pixelLength) {
				const lightness = getLightness(data[i], data[i + 1], data[i + 2])

				const scaledIndices = getScaledIndices(i / CONSTANTS.pixelLength, rawFrame.width, rawFrame.height, STATE.scale, STATE.scale)
				for (let j in scaledIndices) {
					const whiteOrBlack = lightness > STATE.thresholds[j] ? CONSTANTS.maxRGBAvalue : 0
					const p = scaledIndices[j]
					const pixelIndex = p * CONSTANTS.pixelLength
					processedFrame.data[pixelIndex    ] = whiteOrBlack
					processedFrame.data[pixelIndex + 1] = whiteOrBlack
					processedFrame.data[pixelIndex + 2] = whiteOrBlack
					processedFrame.data[pixelIndex + 3] = CONSTANTS.maxRGBAvalue
				}
			}

			return processedFrame
		}
