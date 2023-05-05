/*** globals ***/
	/* triggers */
		const TRIGGERS = {
			input: "input",
			click: "click",
			play: "playing",
			resize: "resize",
		}

	/* elements */
		const ELEMENTS = {
			body: document.body,
			imageRatio: document.querySelector("#image-ratio"),
			imageFontsize: document.querySelector("#image-fontsize"),
			instructions: document.querySelector("#instructions"),
			camera: document.querySelector("#camera"),
			upload: document.querySelector("#upload"),
			fontsize: document.querySelector("#fontsize"),
			inverted: document.querySelector("#inverted"),
			download: document.querySelector("#download"),
			copy: document.querySelector("#copy"),
			video: document.querySelector("#video"),
			canvas: document.querySelector("#canvas"),
			context: document.querySelector("#canvas").getContext("2d", {willReadFrequently: true}),
			output: document.querySelector("#output")
		}

	/* settings */
		const STATE = {
			copyTimeout: 1000,
			ascii: "@$%#8&WM0ZSOXHI1*+=•~-:. ",
			monospaceRatio: 0.6,
			source: null,
			processingLoop: null,
			processingInterval: 1000 / 50,
			playing: false,
			imageRatio: 1,
			imageFontsize: 5,
			inverted: false
		}

/*** menu ***/
	/* uploadImage */
		ELEMENTS.upload.addEventListener(TRIGGERS.input, uploadImage)
		function uploadImage(event) {
			try {
				// get file
					const file = ELEMENTS.upload.files[0]

				// get file
					const imageReader = new FileReader()
						imageReader.onload = function(event) {
							const rawImage = new Image
								rawImage.onload = function() {
									// stop video
										STATE.playing = false
										clearInterval(STATE.processingLoop)
										STATE.processingLoop = null

									// save
										STATE.source = rawImage

									// clear input
										ELEMENTS.upload.value = null

									// hide instructions
										ELEMENTS.instructions.style.display = "none"

									// get dimensions
										resizeVideo()

									// process
										processFrame()
								}
								rawImage.src = event.target.result
						}
						imageReader.readAsDataURL(file)
			} catch (error) {console.log(error)}
		}

	/* changeFontsize */
		ELEMENTS.fontsize.addEventListener(TRIGGERS.input, changeFontsize)
		function changeFontsize(event) {
			try {
				// get fontsize
					STATE.imageFontsize = Math.round(Number(ELEMENTS.fontsize.value))

				// update css
					ELEMENTS.imageFontsize.innerText = ":root {--image-fontsize: " + STATE.imageFontsize + "}"

				// resize video
					resizeVideo()
			} catch (error) {console.log(error)}
		}

	/* changeInversion */
		ELEMENTS.inverted.addEventListener(TRIGGERS.input, changeInversion)
		function changeInversion(event) {
			try {
				// get fontsize
					STATE.inverted = ELEMENTS.inverted.checked || false

				// update css
					ELEMENTS.output.setAttribute("inverted", STATE.inverted)
			} catch (error) {console.log(error)}
		}

	/* downloadText */
		ELEMENTS.download.addEventListener(TRIGGERS.click, downloadText)
		function downloadText(event) {
			try {
				// get text
					const text = ELEMENTS.output.innerText

				// package up
					const link = document.createElement("a")
						link.id = "download-link"
						link.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text))
						link.setAttribute("download", "imageTextifier" + (new Date().getTime()) + ".txt")
						link.addEventListener(TRIGGERS.click, function() {
							const link = document.querySelector("#download-link")
							ELEMENTS.body.removeChild(link)
						})
				
				// click
					ELEMENTS.body.appendChild(link)
					link.click()
			} catch (error) {console.log(error)}
		}

	/* copyText */
		ELEMENTS.copy.addEventListener(TRIGGERS.click, copyText)
		function copyText(event) {
			try {
				// disable
					ELEMENTS.copy.setAttribute("copied", true)

				// get text
					const text = ELEMENTS.output.innerText

				// package up
					navigator.clipboard.writeText(text)

				// reenable
					setTimeout(function() {
						ELEMENTS.copy.removeAttribute("copied")
					}, STATE.copyTimeout)
			} catch (error) {console.log(error)}
		}

/*** camera ***/
	/* startVideo */
		ELEMENTS.camera.addEventListener(TRIGGERS.click, startVideo)
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
					ELEMENTS.video.srcObject = stream
					ELEMENTS.video.muted = true
					ELEMENTS.video.addEventListener(TRIGGERS.play, playVideo)
					const playPromise = ELEMENTS.video.play()

				// set source
					STATE.source = ELEMENTS.video

				// handle promise
					if (playPromise !== undefined) {
						playPromise.then(function() {
							// start loop
								STATE.processingLoop = setInterval(processFrame, STATE.processingInterval)
						}).catch(function(error) {
							console.log(error.name || error || "unknown error")
						})
					}
			} catch (error) {console.log(error)}
		}

	/* playVideo */
		function playVideo(event) {
			try {
				// set global
					if (STATE.playing) {
						return
					}
					STATE.playing = true

				// hide instructions
					ELEMENTS.instructions.style.display = "none"

				// resize video
					resizeVideo()
			} catch (error) {console.log(error)}
		}

	/* resizeVideo */
		window.addEventListener(TRIGGERS.resize, resizeVideo)
		function resizeVideo(event) {
			try {
				// dimensions
					const sourceWidth = STATE.source ? (STATE.source.videoWidth || STATE.source.width) : 1
					const sourceHeight = STATE.source ? (STATE.source.videoHeight || STATE.source.height) : 1

				// ratio
					STATE.imageRatio = sourceWidth / sourceHeight

				// screen max
					const screenWidth = window.innerWidth
					const screenHeight = window.innerHeight

					const screenAdjustedWidth = (screenHeight * STATE.imageRatio > screenWidth) ? screenWidth : screenHeight * STATE.imageRatio
					const screenAdjustedHeight = screenAdjustedWidth / STATE.imageRatio

				// resize canvas
					ELEMENTS.canvas.width = screenAdjustedWidth / STATE.imageFontsize / STATE.monospaceRatio
					ELEMENTS.canvas.height = screenAdjustedHeight / STATE.imageFontsize

				// update css
					ELEMENTS.imageRatio.innerText = ":root {--image-ratio: " + STATE.imageRatio + "}"

				// still image --> redraw
					if (!STATE.playing) {
						processFrame()
					}
			} catch (error) {console.log(error)}
		}

/*** processing ***/
	/* processFrame */
		function processFrame(event) {
			try {
				// push video to raw canvas
					ELEMENTS.context.clearRect(0, 0, ELEMENTS.canvas.width, ELEMENTS.canvas.height)
					ELEMENTS.context.drawImage(STATE.source, 0, 0, ELEMENTS.canvas.width, ELEMENTS.canvas.height)

				// get frame
					const frame = ELEMENTS.context.getImageData(0, 0, ELEMENTS.canvas.width, ELEMENTS.canvas.height)

				// loop through frame and process
					const text = processPixels(frame.data)

				// push to processed canvas
					ELEMENTS.output.innerText = text.join("\n")
			} catch (error) {console.log(error)}
		}

	/* processPixels */
		function processPixels(data) {
			try {
				// get length
					const dataLength = data.length
					const imageWidth = ELEMENTS.canvas.width
					const text = []
					let row = ""

				// loop through
					pixelLoop:
					for (let i = 0; i < dataLength; i += 4) {
						// get hsl
							let hsl = processColor([data[i], data[i + 1], data[i + 2]])

						// character based on lightness
							row += processCharacter(hsl)

						// new row?
							if (row.length == imageWidth) {
								text.push(row)
								row = ""
							}
					}

				// return
					return text
			} catch (error) {console.log(error)}
		}

	/* processColor */
		function processColor(rgb) {
			try {
				// get fraction
					const red = rgb[0] / 255
					const green = rgb[1] / 255
					const blue = rgb[2] / 255

				// extremes
					const min = Math.min(red, green, blue)
					const max = Math.max(red, green, blue)
					const delta = max - min

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

	/* processCharacter */
		function processCharacter(hsl) {
			try {
				const l = Math.floor(hsl[2] * STATE.ascii.length)
				return (STATE.inverted ? STATE.ascii[STATE.ascii.length - 1 - l] : STATE.ascii[l]) || 
					   (STATE.inverted ? STATE.ascii[STATE.ascii.length - 1] : STATE.ascii[0])
			} catch (error) {console.log(error)}
		}
