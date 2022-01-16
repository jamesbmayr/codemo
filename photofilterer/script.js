/*** globals ***/
	/* settings */
		const SETTINGS = {
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
			hueWedge: 40
		}

	/* triggers */
		const TRIGGERS = {
			click: "click",
			submit: "submit",
			change: "change",
			input: "input",
			play: "playing",
			resize: "resize"
		}

	/* elements */
		const ELEMENTS = {
			ratio: document.querySelector("#ratio"),
			overlay: {
				form: document.querySelector("#overlay"),
				begin: document.querySelector("#begin")
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
				download: document.querySelector("#download")
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

	/* streamVideo */
		function streamVideo(stream) {
			try {
				// start streaming
					ELEMENTS.video.element.srcObject = stream
					ELEMENTS.video.element.muted = true
					ELEMENTS.video.element.addEventListener(TRIGGERS.play, playVideo)
					let playPromise = ELEMENTS.video.element.play()

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
				// get dimensions
					let videoWidth = ELEMENTS.video.element.videoWidth
					let videoHeight = ELEMENTS.video.element.videoHeight

				// ratio
					let ratio = videoWidth / videoHeight
					let maxWidth = Math.min(window.innerWidth, window.innerHeight * ratio)
					let maxHeight = Math.min(window.innerHeight, window.innerWidth / ratio)

				// resize canvas
					ELEMENTS.raw.canvas.width = videoWidth
					ELEMENTS.raw.canvas.height = videoHeight
					ELEMENTS.processed.canvas.width = videoWidth
					ELEMENTS.processed.canvas.height = videoHeight

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
				// get current data
					let data = ELEMENTS.processed.canvas.toDataURL("image/png")

				// set as download link
					ELEMENTS.actions.download.setAttribute("href", data)
					ELEMENTS.actions.download.setAttribute("download", "photoFilterer_" + (new Date().getTime()) + ".png")

				// download
					ELEMENTS.actions.download.click()

				// blur
					ELEMENTS.actions.download.blur()
					ELEMENTS.actions.capture.blur()
			} catch (error) {console.log(error)}
		}

/*** processing ***/
	/* processFrame */
		function processFrame(event) {
			try {
				// push video to raw canvas
					let rawContext = ELEMENTS.raw.context
					let rawCanvas = ELEMENTS.raw.canvas
					rawContext.drawImage(ELEMENTS.video.element, 0, 0, rawCanvas.width, rawCanvas.height)

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
