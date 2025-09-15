/*** globals ***/
	/* triggers */
		const TRIGGERS = {
			click: "click",
			input: "input",
			resize: "resize"
		}

	/* elements */
		const ELEMENTS = {
			body: document.body,
			mode: {
				element: document.querySelector("#mode"),
				make: document.querySelector("#mode-make"),
				scan: document.querySelector("#mode-scan")
			},
			make: {
				section: document.querySelector("#make-section"),
				input: document.querySelector("#make-input"),
				image: document.querySelector("#make-image"),
			},
			scan: {
				section: document.querySelector("#scan-section"),
				reader: document.querySelector("#scan-reader"),
				output: document.querySelector("#scan-output")
			}
		}

	/* constants */
		const CONSTANTS = {
			urlRegex: /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i,
			qrCodeReader: {
				states : {
					UNKNOWN: 0,
					NOT_STARTED: 1,
					SCANNING: 2,
					PAUSED: 3
				},
				camera: {facingMode: "environment"}, // back camera / webcam
				framesPerSecond: {fps: 10}, // frames / s
				taskTime: 100, // ms
				pauseTime: 5000, // ms
				clearTime: 1000, // ms
			},
			qrCodeGenerator: {
				settings: {
					width: 500, // px
					height: 500, // px
					colorDark: "black",
					colorLight: "white",
					correctLevel: QRCode.CorrectLevel.M
				}
			}
		}

	/* state */
		const STATE = {
			qrCodeReader: null,
			detected: null,
			rendered: null,
			qrCodeViewer: null
		}

/*** window ***/
	/* resizeWindow */
		window.addEventListener(TRIGGERS.resize, resizeWindow)
		function resizeWindow(event) {
			try {
				// dimensions
					const x = window.innerWidth
					const y = window.innerHeight

				// reader
					if (STATE.qrCodeReader) {
						// video
							if (STATE.qrCodeReader.videoElement) {
								STATE.qrCodeReader.videoElement.style.width  = x + "px"
								STATE.qrCodeReader.videoElement.style.height = y + "px"
							}

						// canvas
							if (STATE.qrCodeReader.canvasElement) {
								STATE.qrCodeReader.canvasElement.style.width  = x + "px"
								STATE.qrCodeReader.canvasElement.style.height = y + "px"
								STATE.qrCodeReader.canvasElement.width  = x
								STATE.qrCodeReader.canvasElement.height = y
							}

						// region
							if (STATE.qrCodeReader.qrRegion) {
								STATE.qrCodeReader.qrRegion.width  = x
								STATE.qrCodeReader.qrRegion.height = y
							}
					}
			} catch (error) {console.log(error)}
		}

/*** assetManager ***/
	/* retrieveAsset */
		window.ASSETS_J.retrieveAsset = function(name, type, data) {
			try {
				// txt
					activateMakeMode()
					ELEMENTS.make.input.value = String(data)
					inputText()
			} catch (error) {console.log(error)}
		}

	/* storeAsset */
		window.ASSETS_J.storeAsset = async function(type) {
			try {
				// png
					if (type == "png") {
						return {
							name: ELEMENTS.make.input.value.trim(),
							type: "png",
							data: ELEMENTS.make.image.querySelector("img")?.src
						}
					}

				// txt
					if (type == "txt") {
						return {
							name: STATE.detected,
							type: "txt",
							data: STATE.detected
						}
					}
			} catch (error) {console.log(error)}
		}

/*** mode ***/
	/* activateMakeMode */
		ELEMENTS.mode.make.addEventListener(TRIGGERS.click, activateMakeMode)
		function activateMakeMode() {
			try {
				// already make mode?
					if (ELEMENTS.body.getAttribute("mode") == "make") {
						return
					}

				// set mode
					ELEMENTS.body.setAttribute("mode", "make")
				
				// pause reader
					if (STATE.qrCodeReader) {
						clearQRcodeOutput()

						if (STATE.qrCodeReader.getState() == CONSTANTS.qrCodeReader.states.SCANNING) {
							STATE.qrCodeReader.pause()
						}
					}
			} catch (error) {console.log(error)}
		}

	/* activateScanMode */
		ELEMENTS.mode.scan.addEventListener(TRIGGERS.click, activateScanMode)
		function activateScanMode() {
			try {
				// already scan mode?
					if (ELEMENTS.body.getAttribute("mode") == "scan") {
						return
					}

				// set mode
					ELEMENTS.body.setAttribute("mode", "scan")
				
				// resume reader
					startQRcodeDetector()
			} catch (error) {console.log(error)}
		}

/*** qr code generator ***/
	/* inputText */
		ELEMENTS.make.input.addEventListener(TRIGGERS.input, inputText)
		function inputText(event) {
			try {
				// get text
					const text = (ELEMENTS.make.input.value).trim()
					if (!text) {
						return
					}

				// display image
					displayQRcode(text)
			} catch (error) {console.log(error)}
		}

	/* displayQRcode */	
		function displayQRcode(text) {
			try {
				// save to state
					STATE.rendered = text

				// clear
					ELEMENTS.make.image.innerHTML = ""

				// create image
					STATE.qrCodeViewer = new QRCode(ELEMENTS.make.image, {
						text: text,
						...CONSTANTS.qrCodeGenerator.settings
					})
			} catch (error) {console.log(error)}
		}

/*** qr code reader ***/
	/* startCamera */
		function startQRcodeDetector() {
			try {
				// none?
					if (!STATE.qrCodeReader) {
						STATE.qrCodeReader = new Html5Qrcode(ELEMENTS.scan.reader.id)
					}

				// get state
					const qrCodeReaderState = STATE.qrCodeReader.getState()

				// scanning --> return
					if (qrCodeReaderState == CONSTANTS.qrCodeReader.states.SCANNING) {
						return
					}

				// clear output
					STATE.qrCodeReader.clearTimeout = setTimeout(clearQRcodeOutput, CONSTANTS.qrCodeReader.clearTime)

				// paused --> resume
					if (qrCodeReaderState == CONSTANTS.qrCodeReader.states.PAUSED) {
						STATE.qrCodeReader.resume()
						return
					}

				// not started / unknown --> start
					STATE.qrCodeReader.start(CONSTANTS.qrCodeReader.camera, CONSTANTS.qrCodeReader.framesPerSecond, detectQRcode)
									  .then(handleQRcodeElements)
									  .catch(detectQRcode)
			} catch (error) {console.log(error)}
		}

	/* handleQRcodeElements */
		function handleQRcodeElements() {
			try {
				// tasks
					const tasks = {
						removePausedIndicator: true,
						attachVideoElement: true
					}

				// loop
					const taskInterval = setInterval(() => {
						// paused indicator
							if (tasks.removePausedIndicator && STATE.qrCodeReader.scannerPausedUiElement) {
								STATE.qrCodeReader.scannerPausedUiElement.remove()
								delete tasks.removePausedIndicator
							}

						// video element
							if (tasks.attachVideoElement && STATE.qrCodeReader.element.querySelector("video")) {
								STATE.qrCodeReader.videoElement = STATE.qrCodeReader.element.querySelector("video")
								delete tasks.attachVideoElement
							}

						// no more tasks
							if (!Object.keys(tasks).length) {
								clearInterval(taskInterval)
							}
					}, CONSTANTS.qrCodeReader.taskTime)
			} catch (error) {console.log(error)}
		}

	/* detectQRcode */
		function detectQRcode(text, result) {
			try {
				// don't clear (just overwrite)
					clearTimeout(STATE.qrCodeReader.clearTimeout)
					STATE.qrCodeReader.clearTimeout = null

				// get state
					const qrCodeReaderState = STATE.qrCodeReader.getState()

				// same thing recently detected --> keep it
					if (STATE.detected == text) {
						if (qrCodeReaderState == CONSTANTS.qrCodeReader.states.SCANNING) {
							STATE.qrCodeReader.pause()
							STATE.qrCodeReader.resumeTimeout = setTimeout(startQRcodeDetector, CONSTANTS.qrCodeReader.pauseTime)
						}
						return
					}

				// save text
					STATE.detected = text

				// display
					const isURL = CONSTANTS.urlRegex.test(text)
					const hasProtocol = text.startsWith("https://") || text.startsWith("http://") || text.startsWith("mailto:")
					ELEMENTS.scan.output.innerHTML = !isURL ? text : `<a href='${hasProtocol ? text : ("https://" + text)}'>${text}</a>`

				// pause for a bit
					if (qrCodeReaderState == CONSTANTS.qrCodeReader.states.SCANNING) {
						STATE.qrCodeReader.pause()
						STATE.qrCodeReader.resumeTimeout = setTimeout(startQRcodeDetector, CONSTANTS.qrCodeReader.pauseTime)
					}
			} catch (error) {console.log(error)}
		}

	/* clearQRcodeOutput */
		function clearQRcodeOutput() {
			try {
				// timeouts
					if (STATE.qrCodeReader) {
						clearTimeout(STATE.qrCodeReader.clearTimeout)
						STATE.qrCodeReader.clearTimeout = null

						clearTimeout(STATE.qrCodeReader.resumeTimeout)
						STATE.qrCodeReader.resumeTimeout = null
					}

				// state
					STATE.detected = null

				// clear
					ELEMENTS.scan.output.innerHTML = ""
			} catch (error) {console.log(error)}
		}
