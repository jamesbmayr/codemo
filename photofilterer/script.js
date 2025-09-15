/*** globals ***/
	/* settings */
		const SETTINGS = {
			source: null,
			relevantAngles: [],
			playing: false,
			processingLoop: null,
			processingInterval: 1000 / 50,
			luminosities: {
				red: 0.3,
				green: 0.59,
				blue: 0.11
			},
			angles: {
				// single ranges
					magenta: [[260, 340]],
					red: [[320, 360], [0, 30]],
					yellow: [[25, 80]],
					green: [[70, 180]],
					cyan: [[160, 210]],
					blue: [[200, 270]],

				// group ranges
					warm: [[260, 360], [0, 80]],
					cool: [[70, 270]],
					primary: [[320, 360], [0, 30], [70, 180], [200, 270]],
					secondary: [[25, 80], [160, 210], [260, 340]],

				// all or nothing range
					gray: [],
					all: [[0, 360]]
			},
			hueWedge: 40,
			imageTypes: ["image/png", "image/jpeg", "image/jpg", "image/gif", "image/webp", "image/bmp", "image/tiff", "image/svg+xml"],
		}

	/* triggers */
		const TRIGGERS = {
			click: "click",
			submit: "submit",
			change: "change",
			input: "input",
			play: "playing",
			resize: "resize",
			dragover: "dragover",
			drop: "drop"
		}

	/* elements */
		const ELEMENTS = {
			ratio: document.querySelector("#ratio"),
			body: document.body,
			container: document.querySelector("#container"),
			overlay: {
				form: document.querySelector("#overlay"),
				begin: document.querySelector("#begin"),
				skip: document.querySelector("#skip")
			},
			video: {
				element: document.querySelector("#video")
			},
			raw: {
				canvas: document.querySelector("#raw"),
				context: document.querySelector("#raw").getContext("2d")
			},
			processed: {
				canvas: document.querySelector("#processed"),
				context: document.querySelector("#processed").getContext("2d")
			},
			actions: {
				form: document.querySelector("#actions"),
				colors: document.querySelector("#colors"),
				hue: document.querySelector("#hue"),
				ranges: document.querySelector("#ranges"),
				capture: document.querySelector("#capture"),
				downloadLink: document.querySelector("#download-link"),
				upload: document.querySelector("#upload"),
				downloadButton: document.querySelector("#download-button")
			}
		}

/*** interaction ***/
	/* startVideo */
		ELEMENTS.overlay.form.addEventListener(TRIGGERS.submit, startVideo)
		startVideo()
		function startVideo() {
			try {
				// get permission for back-facing camera
					navigator.mediaDevices.getUserMedia({
						video: {
							facingMode: {
								exact: 'environment'
							}
						}
					}).then(streamVideo).catch(function(error) {
						// get any camera
							navigator.mediaDevices.getUserMedia({
								video: true
							}).then(streamVideo).catch(function(error) {
								console.log(error)
							})
					})
			} catch (error) {console.log(error)}
		}

	/* skip */
		ELEMENTS.overlay.skip.addEventListener(TRIGGERS.click, skipCamera)
		function skipCamera() {
			try {
				// hide overlay
					ELEMENTS.overlay.form.setAttribute("hidden", true)
					ELEMENTS.processed.canvas.removeAttribute("hidden")
					ELEMENTS.actions.form.removeAttribute("hidden")

				// change capture text
					ELEMENTS.actions.capture.querySelector("span").innerText = "camera"
			} catch (error) {console.log(error)}
		}

	/* streamVideo */
		function streamVideo(stream) {
			try {
				// start streaming
					ELEMENTS.video.element.srcObject = stream
					ELEMENTS.video.element.muted = true
					ELEMENTS.video.element.addEventListener(TRIGGERS.play, playVideo)
					let playPromise = ELEMENTS.video.element.play()

				// set source
					SETTINGS.source = ELEMENTS.video.element

				// handle promise
					if (playPromise !== undefined) {
						playPromise.then(function() {
							// start loop
								SETTINGS.processingLoop = setInterval(processFrame, SETTINGS.processingInterval)
						}).catch(function(error) {
							if (error.name == "NotAllowedError") {
								ELEMENTS.overlay.begin.innerText = "Not Allowed"
							}
							else {
								ELEMENTS.overlay.begin.innerText = error.name || error
							}
						})
					}
			} catch (error) {console.log(error)}
		}

	/* playVideo */
		function playVideo(event) {
			try {
				// set global
					if (SETTINGS.playing) {
						return
					}
					SETTINGS.playing = true

				// resize video
					resizeVideo()

				// hide overlay
					ELEMENTS.overlay.form.setAttribute("hidden", true)
					ELEMENTS.processed.canvas.removeAttribute("hidden")
					ELEMENTS.actions.form.removeAttribute("hidden")
			} catch (error) {console.log(error)}
		}

	/* resizeVideo */
		window.addEventListener(TRIGGERS.resize, resizeVideo)
		function resizeVideo(event) {
			try {
				// no video
					if (!SETTINGS.source) {
						return
					}

				// dimensions
					let sourceWidth = SETTINGS.source.videoWidth || SETTINGS.source.width
					let sourceHeight = SETTINGS.source.videoHeight || SETTINGS.source.height

				// ratio
					let ratio = sourceWidth / sourceHeight

				// resize canvas
					ELEMENTS.raw.canvas.width = sourceWidth
					ELEMENTS.raw.canvas.height = sourceHeight
					ELEMENTS.processed.canvas.width = sourceWidth
					ELEMENTS.processed.canvas.height = sourceHeight

				// update ratio style
					ELEMENTS.ratio.innerText = ":root {--ratio: " + ratio + "}"
			} catch (error) {console.log(error)}
		}

	/* selectColor */
		ELEMENTS.actions.colors.addEventListener(TRIGGERS.change, selectColor)
		function selectColor(event) {
			try {
				// get color and update global
					let color = ELEMENTS.actions.colors.value || "all"

				// custom?
					if (color == "custom") {
						customizeRange()
						return
					}
				
				// select color
					SETTINGS.relevantAngles = SETTINGS.angles[color]

				// update styling
					let colors = ["red", "yellow", "green", "cyan", "blue", "magenta", "gray"]
					ELEMENTS.actions.colors.style.background = colors.includes(color) ? color : "white"
					ELEMENTS.actions.hue.value = "#000000"

				// update textarea
					if (color == "gray") {
						ELEMENTS.actions.ranges.value = ""
					}
					else {
						let stringifiedRanges = JSON.stringify(SETTINGS.relevantAngles)
						ELEMENTS.actions.ranges.value = stringifiedRanges.slice(1, stringifiedRanges.length - 1)
					}
			} catch (error) {console.log(error)}
		}

	/* selectHue */
		ELEMENTS.actions.hue.addEventListener(TRIGGERS.input, selectHue)
		function selectHue(event) {
			try {
				// get color
					let color = ELEMENTS.actions.hue.value || "#000000"
					let red = parseInt(color.slice(1,3).toUpperCase(), 16)
					let green = parseInt(color.slice(3,5).toUpperCase(), 16)
					let blue = parseInt(color.slice(5,7).toUpperCase(), 16)
					let hsl = processColor([red, green, blue])

				// get angles
					let ccwEdge = (hsl[0] - (SETTINGS.hueWedge / 2) + 360) % 360
					let cwEdge = (hsl[0] + (SETTINGS.hueWedge / 2) + 360) % 360

				// goes around the top
					if (cwEdge < ccwEdge) {
						SETTINGS.relevantAngles = [[ccwEdge, 360], [0, cwEdge]]
					}
					else {
						SETTINGS.relevantAngles = [[ccwEdge, cwEdge]]
					}

				// set type to custom
					ELEMENTS.actions.colors.value = "custom"
					ELEMENTS.actions.colors.style.background = "white"

				// display ranges
					let stringifiedRanges = JSON.stringify(SETTINGS.relevantAngles)
					ELEMENTS.actions.ranges.value = stringifiedRanges.slice(1, stringifiedRanges.length - 1)
			} catch (error) {console.log(error)}
		}

	/* customizeRange */
		ELEMENTS.actions.ranges.addEventListener(TRIGGERS.input, customizeRange)
		function customizeRange(event) {
			try {
				// get stringifiedRanges
					let stringifiedRanges = (ELEMENTS.actions.ranges.value || "").replace(/\s/g, "")
						stringifiedRanges = stringifiedRanges.replace("[[", "[").replace("]]", "]")

				// set type to custom
					ELEMENTS.actions.colors.value = "custom"
					ELEMENTS.actions.colors.style.background = "white"
					ELEMENTS.actions.hue.value = "#000000"
					SETTINGS.relevantAngles = []

				// validate
					try {
						// no values
							if (!stringifiedRanges.length) {
								ELEMENTS.actions.ranges.setAttribute("invalid", true)
								return
							}

						// negative values
							if (stringifiedRanges.includes("-")) {
								ELEMENTS.actions.ranges.setAttribute("invalid", true)
								return
							}

						// not an array
							let relevantAngles = JSON.parse("[" + stringifiedRanges + "]")
							if (!Array.isArray(relevantAngles[0])) {
								ELEMENTS.actions.ranges.setAttribute("invalid", true)
								return
							}

						// legit array
							SETTINGS.relevantAngles = relevantAngles
							ELEMENTS.actions.ranges.removeAttribute("invalid")
					}
					catch (error) {
						ELEMENTS.actions.ranges.setAttribute("invalid", true)
					}
			} catch (error) {console.log(error)}
		}

	/* capturePhoto */
		ELEMENTS.actions.form.addEventListener(TRIGGERS.submit, capturePhoto)
		function capturePhoto(event) {
			try {
				// not recording?
					if (SETTINGS.source !== ELEMENTS.video.element) {
						ELEMENTS.actions.capture.querySelector("span").innerText = "capture"
						ELEMENTS.actions.downloadButton.setAttribute("hidden", true)
						startVideo()
						return
					}

				// download image
					downloadImage()
			} catch (error) {console.log(error)}
		}

	/* uploadImage */
		ELEMENTS.actions.upload.addEventListener(TRIGGERS.change, uploadImage)
		function uploadImage(event) {
			try {
				// get file
					let file = ELEMENTS.actions.upload.files[0]

				// get file
					let imageReader = new FileReader()
						imageReader.onload = function(event) {
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
					if (!SETTINGS.imageTypes.includes(file.type)) {
						return
					}

				// skip
					skipCamera()

				// get file
					let imageReader = new FileReader()
						imageReader.onload = imageReader.onload = function(event) {
							importImage(event.target.result)
						}
						imageReader.readAsDataURL(file)
			} catch (error) {console.log(error)}
		}

	/* downloadImage */
		ELEMENTS.actions.downloadButton.addEventListener(TRIGGERS.click, downloadImage)
		function downloadImage(event) {
			try {
				// get current data
					let data = ELEMENTS.processed.canvas.toDataURL("image/png")

				// set as download link
					ELEMENTS.actions.downloadLink.setAttribute("href", data)
					ELEMENTS.actions.downloadLink.setAttribute("download", "photoFilterer_" + (new Date().getTime()) + ".png")

				// download
					ELEMENTS.actions.downloadLink.click()

				// blur
					ELEMENTS.actions.downloadLink.blur()
					ELEMENTS.actions.capture.blur()
			} catch (error) {console.log(error)}
		}

	/* importImage */
		function importImage(imageData) {
			try {
				// image
					let rawImage = new Image
					rawImage.onload = function() {
						// save
							SETTINGS.source = rawImage

						// get dimensions
							let imageWidth = rawImage.width
							let imageHeight = rawImage.height

						// ratio
							let ratio = imageWidth / imageHeight

						// resize canvas
							ELEMENTS.raw.canvas.width = imageWidth
							ELEMENTS.raw.canvas.height = imageHeight
							ELEMENTS.processed.canvas.width = imageWidth
							ELEMENTS.processed.canvas.height = imageHeight

						// update ratio style
							ELEMENTS.ratio.innerText = ":root {--ratio: " + ratio + "}"

						// processing loop
							SETTINGS.processingLoop = setInterval(processFrame, SETTINGS.processingInterval)

						// show download
							ELEMENTS.actions.downloadButton.removeAttribute("hidden")
							ELEMENTS.actions.capture.querySelector("span").innerText = "camera"
					}
					rawImage.src = imageData
			} catch (error) {console.log(error)}
		}

/*** assetManager ***/
	/* retrieveAsset */
		window.ASSETS_J.retrieveAsset = function(name, type, data) {
			try {
				// image
					skipCamera()
					importImage(data)
			} catch (error) {console.log(error)}
		}

	/* storeAsset */
		window.ASSETS_J.storeAsset = async function(type) {
			try {
				// png
					return {
						name: "photoFilterer_" + (new Date().getTime()) + ".png",
						type: "png",
						data: ELEMENTS.processed.canvas.toDataURL("image/png")
					}
			} catch (error) {console.log(error)}
		}

/*** processing ***/
	/* processFrame */
		function processFrame(event) {
			try {
				// push video to raw canvas
					let rawContext = ELEMENTS.raw.context
					let rawCanvas = ELEMENTS.raw.canvas
					rawContext.drawImage(SETTINGS.source, 0, 0, rawCanvas.width, rawCanvas.height)

				// get frame
					let frame = rawContext.getImageData(0, 0, rawCanvas.width, rawCanvas.height)

				// loop through frame and process
					frame.data = processPixels(frame.data)

				// push to processed canvas
					ELEMENTS.processed.context.putImageData(frame, 0, 0)
			} catch (error) {console.log(error)}
		}

	/* processPixels */
		function processPixels(data) {
			try {
				// get length
					let dataLength = data.length

				// loop through
					pixelLoop:
					for (let i = 0; i < dataLength; i += 4) {
						// get hsl
							let hsl = processColor([data[i], data[i + 1], data[i + 2]])

						// in color range
							colorRangeLoop:
							for (let j in SETTINGS.relevantAngles) {
								if (SETTINGS.relevantAngles[j][0] <= hsl[0] && hsl[0] <= SETTINGS.relevantAngles[j][1]) {
									continue pixelLoop
								}
							}

						// outside color range --> get average
							let adjustedRed   = data[i]     * SETTINGS.luminosities.red
							let adjustedGreen = data[i + 1] * SETTINGS.luminosities.green
							let adjustedBlue  = data[i + 2] * SETTINGS.luminosities.blue
							let average = adjustedRed + adjustedGreen + adjustedBlue

						// gray out colors
							data[i] = data[i + 1] = data[i + 2] = average
					}

				// return
					return data
			} catch (error) {console.log(error)}
		}

	/* processColor */
		function processColor(rgb) {
			try {
				// get fraction
					let red = rgb[0] / 255
					let green = rgb[1] / 255
					let blue = rgb[2] / 255

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
