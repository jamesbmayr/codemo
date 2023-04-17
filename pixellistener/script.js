/*** globals ***/
	/* audio */
		if (!AUDIO_J) {
			AUDIO_J = window.AUDIO_J
		}

	/* triggers */
		const TRIGGERS = {
			click: "click",
			resize: "resize",
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

		window.addEventListener(TRIGGERS.rightclick, function(event) {
			event.preventDefault()
		})

	/* elements */
		const ELEMENTS = {
			canvas: document.querySelector("#canvas"),
			context: document.querySelector("#canvas").getContext("2d"),
			uploadCenterOuter: document.querySelector("#upload-center-outer"),
			uploadCenter: document.querySelector("#upload-center"),
			controls: {
				element: document.querySelector("#controls"),
				button: document.querySelector("#controls-button"),
				inner: document.querySelector("#controls-inner"),
				image: {
					upload: document.querySelector("#controls-image-upload"),
					uploadButton: document.querySelector("#controls-image-upload-button"),
					zoom: document.querySelector("#controls-image-zoom")
				},
				synth: {
					selectOuter: document.querySelector("#controls-synth-select-outer"),
					volume: document.querySelector("#controls-synth-volume")
				},
				imageParameters: {
					"controls-color-red": document.querySelector("#controls-color-red"),
					"controls-color-green": document.querySelector("#controls-color-green"),
					"controls-color-blue": document.querySelector("#controls-color-blue"),
					"controls-color-hue": document.querySelector("#controls-color-hue"),
					"controls-color-saturation": document.querySelector("#controls-color-saturation"),
					"controls-color-lightness": document.querySelector("#controls-color-lightness"),
					"controls-coordinates-x": document.querySelector("#controls-coordinates-x"),
					"controls-coordinates-y": document.querySelector("#controls-coordinates-y"),
					"controls-coordinates-angle": document.querySelector("#controls-coordinates-angle"),
					"controls-coordinates-radius": document.querySelector("#controls-coordinates-radius")
				}
			}
		}

	/* constants */
		const CONSTANTS = {
			percentage: 100,
			circleDegrees: 360,
			circleRadians: Math.PI * 2,
			rgbMax: 255,
			maxZoom: 5,
			zoomBase: 2,
			audioParameters: {
				main: {
					pitch: {
						min: -3 * 12 * 100, // octaves * tones * cents
						max:  3 * 12 * 100, // octaves * tones * cents
						staticFactor: AUDIO_J.constants.notes["60"][0] // middle C in Hz
					},
					volume: {
						min: 0,
						max: 1
					},
					panning: {
						min: -1,
						max: 1
					}
				},
				effects: {
					bitcrusher: {
						min: -1, // inverted value
						max: 0,
						secondaryFactor: 1,
						staticFactor: 8 // bits
					},
					distortion: {
						min: 0,
						max: AUDIO_J.constants.maxDistortion
					},
					noise: {
						min: 0,
						max: 1
					},
					reverb: {
						min: 0,
						max: 1
					},
					vibrato: {
						min: 0,
						max: AUDIO_J.constants.maxVibratoCents,
						secondaryFactor: AUDIO_J.constants.maxVibratoInterval / AUDIO_J.constants.maxVibratoCents,
						staticFactor: "sine" // wave
					}
				}
			},
			transitionTime: 500
		}

	/* state */
		const STATE = {
			selectedSynth: "voxelle",
			imageData: null,
			zoomPower: 0,
			pixelGrid: [],
			cursor: {
				clicked: false,
				windowX: 0,
				windowY: 0,
				imageX: 0,
				imageY: 0,
				imageAngle: 0,
				imageRadius: 0
			},
			mappings: {
				"controls-color-red": null,
				"controls-color-green": null,
				"controls-color-blue": null,
				"controls-color-hue": "effects-distortion",
				"controls-color-saturation": null,
				"controls-color-lightness": "main-pitch",
				"controls-coordinates-x": "main-panning",
				"controls-coordinates-y": "effects-reverb",
				"controls-coordinates-angle": null,
				"controls-coordinates-radius": null
			}
		}

/*** startup ***/
	/* buildControls */
		buildControls()
		function buildControls() {
			try {
				// instruments
					ELEMENTS.controls.synth.select = getInstruments({
						include: ["simple", "default", "custom"],
						grouping: "family",
						format: "select"
					})._select
					ELEMENTS.controls.synth.select.title = "synth"
					ELEMENTS.controls.synth.select.id = "controls-synth-select"
					ELEMENTS.controls.synth.select.value = STATE.selectedSynth
					ELEMENTS.controls.synth.select.addEventListener(TRIGGERS.input, changeSynth)
					ELEMENTS.controls.synth.selectOuter.appendChild(ELEMENTS.controls.synth.select)

				// imageParameters
					for (const imageParameterName in ELEMENTS.controls.imageParameters) {
						buildOptions(ELEMENTS.controls.imageParameters[imageParameterName])
						ELEMENTS.controls.imageParameters[imageParameterName].addEventListener(TRIGGERS.input, mapParameter)

						if (STATE.mappings[imageParameterName]) {
							ELEMENTS.controls.imageParameters[imageParameterName].value = STATE.mappings[imageParameterName]
						}
					}
			} catch (error) {console.log(error)}
		}

	/* buildOptions */
		function buildOptions(select) {
			try {
				// empty
					const emptyOption = document.createElement("option")
						emptyOption.value = "-"
						emptyOption.innerText = "-"
						emptyOption.setAttribute("selected", true)
					select.appendChild(emptyOption)

				// optgroups
					for (const audioParameterGroupName in CONSTANTS.audioParameters) {
						const optgroup = document.createElement("optgroup")
							optgroup.label = audioParameterGroupName
						select.appendChild(optgroup)

						for (const audioParameterName in CONSTANTS.audioParameters[audioParameterGroupName]) {
							const option = document.createElement("option")
								option.value = audioParameterGroupName + "-" + audioParameterName
								option.innerHTML = "&uarr;&nbsp;" + audioParameterName
							optgroup.appendChild(option)

							const reverseOption = document.createElement("option")
								reverseOption.value = audioParameterGroupName + "-" + audioParameterName + "-reverse"
								reverseOption.innerHTML = "&darr;&nbsp;" + audioParameterName
							optgroup.appendChild(reverseOption)
						}
					}
			} catch (error) {console.log(error)}
		}

	/* firstClick */
		window.addEventListener(TRIGGERS.click, firstClick)
		function firstClick() {
			try {
				// already audio
					if (AUDIO_J.audio) {
						return
					}

				// build
					AUDIO_J.buildAudio()

				// currently selected instrument
					if (STATE.selectedSynth) {
						AUDIO_J.activeInstrumentId = "_cursor"
						const parameters = AUDIO_J.getInstrument(STATE.selectedSynth)
						if (parameters) {
							AUDIO_J.instruments._cursor = AUDIO_J.buildInstrument(parameters)
						}
					}
			} catch (error) {console.log(error)}
		}

/*** controls ***/
	/* toggleControls */
		ELEMENTS.controls.button.addEventListener(TRIGGERS.click, toggleControls)
		function toggleControls(event) {
			try {
				// don't click through
					event.preventDefault()

				// open --> close
					if (ELEMENTS.controls.element.getAttribute("open")) {
						ELEMENTS.controls.element.removeAttribute("open")
					}

				// close --> open
					else {
						ELEMENTS.controls.element.setAttribute("open", true)
					}

				// resize canvas
					setTimeout(() => {
						resizeCanvas()
					}, CONSTANTS.transitionTime)
			} catch (error) {console.log(error)}
		}

	/* clickUpload */
		ELEMENTS.uploadCenter.addEventListener(TRIGGERS.click, clickUpload)
		function clickUpload(event) {
			try {
				// trigger upload image
					ELEMENTS.controls.image.uploadButton.click()
			} catch (error) {console.log(error)}
		}

	/* uploadImage */
		ELEMENTS.controls.image.upload.addEventListener(TRIGGERS.input, uploadImage)
		function uploadImage(event) {
			try {
				// file
					const file = ELEMENTS.controls.image.upload.files[0]
					if (!file) {
						return
					}

				// remove element
					if (ELEMENTS.uploadCenterOuter) {
						ELEMENTS.uploadCenterOuter.remove()
						ELEMENTS.controls.element.setAttribute("open", true)

						// resize canvas
							setTimeout(() => {
								resizeCanvas()
							}, CONSTANTS.transitionTime)
					}

				// read file
					const reader = new FileReader()
						reader.onload = function(event) {
							const image = new Image
								image.onload = function() {
									STATE.imageData = image
									drawCanvas()
								}
								image.src = event.target.result
							ELEMENTS.controls.image.upload.value = null
							ELEMENTS.controls.image.upload.blur()
						}
						reader.readAsDataURL(file)
			} catch (error) {console.log(error)}
		}

	/* changeZoom */
		ELEMENTS.controls.image.zoom.addEventListener(TRIGGERS.input, changeZoom)
		function changeZoom(event) {
			try {
				// get zoomPower
					const zoomPower = Math.max(-CONSTANTS.maxZoom, Math.min(CONSTANTS.maxZoom, Number(ELEMENTS.controls.image.zoom.value)))

				// set zoomPower
					STATE.zoomPower = zoomPower

				// redraw
					drawCanvas()
			} catch (error) {console.log(error)}
		}

	/* changeSynth */
		function changeSynth(event) {
			try {
				// get synth
					const synthName = ELEMENTS.controls.synth.select.value
					const parameters = AUDIO_J.getInstrument(synthName)

				// set synth
					if (parameters) {
						STATE.selectedSynth = synthName
						AUDIO_J.instruments._cursor = AUDIO_J.buildInstrument(parameters)
					}
			} catch (error) {console.log(error)}
		}

	/* changeVolume */
		ELEMENTS.controls.synth.volume.addEventListener(TRIGGERS.input, changeVolume)
		function changeVolume(event) {
			try {
				// get volume
					const volume = Math.max(0, Math.min(1, Number(ELEMENTS.controls.synth.volume.value)))

				// set volume
					AUDIO_J.master.gain.setValueAtTime(volume, (AUDIO_J.audio.currentTime || 0))
			} catch (error) {console.log(error)}
		}

	/* mapParameter */
		function mapParameter(event) {
			try {
				// audio?
					if (!AUDIO_J.audio) {
						AUDIO_J.buildAudio()
					}

				// get select & option
					const imageParameterSelect = event.target.closest("select")
					const imageParameterName = imageParameterSelect.id
					const audioParameterName = imageParameterSelect.value.length ? imageParameterSelect.value : null

				// remove audioParameterName from other imageParameters
					if (audioParameterName !== "-") {
						for (const imageParameter in STATE.mappings) {
							if (imageParameter == imageParameterName) {
								continue
							}
							if (STATE.mappings[imageParameter] == audioParameterName.replace("-reverse", "")) {
								STATE.mappings[imageParameter] = null
								ELEMENTS.controls.imageParameters[imageParameter].value = "-"
							}
						}
					}

				// set this
					STATE.mappings[imageParameterName] = audioParameterName
			} catch (error) {console.log(error)}
		}

/*** cursor ***/
	/* downCursor */
		ELEMENTS.canvas.addEventListener(TRIGGERS.mousedown, downCursor)
		function downCursor(event) {
			try {
				// audio?
					if (!AUDIO_J.audio) {
						AUDIO_J.buildAudio()
					}

				// in menu?
					if (event.target !== ELEMENTS.canvas) {
						return
					}

				// click
					STATE.cursor.clicked = true

				// move
					moveCursor(event)
			} catch (error) {console.log(error)}
		}

	/* upCursor */
		window.addEventListener(TRIGGERS.mouseup, upCursor)
		function upCursor(event) {
			try {
				// click
					STATE.cursor.clicked = false

				// stop playing
					if (AUDIO_J.instruments._cursor) {
						AUDIO_J.instruments._cursor.lift(CONSTANTS.audioParameters.main.pitch.staticFactor)
					}
			} catch (error) {console.log(error)}
		}

	/* moveCursor */
		window.addEventListener(TRIGGERS.mousemove, moveCursor)
		function moveCursor(event) {
			try {
				// not clicked?
					if (!STATE.cursor.clicked) {
						return
					}

				// window position
					STATE.cursor.windowX = event.touches ? event.touches[0].clientX : event.clientX
					STATE.cursor.windowY = event.touches ? event.touches[0].clientY : event.clientY

				// image
					const canvasRect = ELEMENTS.canvas.getBoundingClientRect()

				// image - cartesian
					STATE.cursor.imageX = Math.floor(((STATE.cursor.windowX - canvasRect.left) / canvasRect.width)  * ELEMENTS.canvas.width );
					STATE.cursor.imageY = Math.floor(((STATE.cursor.windowY - canvasRect.top ) / canvasRect.height) * ELEMENTS.canvas.height);

				// image - polar
					[STATE.cursor.imageAngle, STATE.cursor.imageRadius] = getPolarCoordinates(
						  STATE.cursor.imageX - (ELEMENTS.canvas.width  / 2),
						-(STATE.cursor.imageY - (ELEMENTS.canvas.height / 2))
					)

				// no image?
					if (!STATE.imageData) {
						return
					}

				// get image pixel
					const imagePixel = STATE.pixelGrid[STATE.cursor.imageX] ? STATE.pixelGrid[STATE.cursor.imageX][STATE.cursor.imageY] : null
					if (!imagePixel) {
						return
					}

				// produceSound
					produceSound({
						"controls-color-red": 			imagePixel.red   / CONSTANTS.rgbMax,
						"controls-color-green": 		imagePixel.green / CONSTANTS.rgbMax,
						"controls-color-blue": 			imagePixel.blue  / CONSTANTS.rgbMax,
						"controls-color-hue": 			imagePixel.hue   / CONSTANTS.circleDegrees,
						"controls-color-saturation": 	imagePixel.saturation,
						"controls-color-lightness": 	imagePixel.lightness,
						"controls-coordinates-x": 		STATE.cursor.imageX / ELEMENTS.canvas.width,
						"controls-coordinates-y": 		(ELEMENTS.canvas.height - STATE.cursor.imageY) / ELEMENTS.canvas.height,
						"controls-coordinates-angle": 	STATE.cursor.imageAngle / CONSTANTS.circleDegrees,
						"controls-coordinates-radius": 	STATE.cursor.imageRadius / getScalar(ELEMENTS.canvas.width / 2, ELEMENTS.canvas.height / 2)
					})
			} catch (error) {console.log(error)}
		}

/*** helpers ***/
	/* getDegreesFromRadians */
		function getDegreesFromRadians(radians) {
			try {
				// convert
					let degrees = radians * CONSTANTS.circleDegrees / CONSTANTS.circleRadians
					
				// reduce
					while (degrees < 0) {
						degrees += CONSTANTS.circleDegrees
					}
					return degrees % CONSTANTS.circleDegrees
			} catch (error) {console.log(error)}
		}

	/* getScalar */
		function getScalar(x, y) {
			try {
				// pythagorean theorem
					return ((x ** 2) + (y ** 2)) ** (1 / 2)
			} catch (error) {console.log(error)}
		}

	/* getPolarCoordinates */
		function getPolarCoordinates(x, y) {
			try {
				// angle
					const angle = Math.abs(Math.floor(getDegreesFromRadians(Math.atan2(y, x))))

				// radius
					const radius = Math.floor(getScalar(x, y))

				// return
					return [angle, radius]
			} catch (error) {console.log(error)}
		}

	/* getPixels */
		function getPixels(frameData) {
			try {
				// get length
					const dataLength = frameData.length
					const pixelList = []

				// loop through
					for (let i = 0; i < dataLength; i += 4) {
						// rgba
							const red   = frameData[i]
							const green = frameData[i + 1]
							const blue  = frameData[i + 2]

						// get hsl
							const [hue, saturation, lightness] = getHSL([red, green, blue])

						// build pixel
							const imagePixel = {
								red: red,
								green: green,
								blue: blue,
								hue: hue,
								saturation: saturation,
								lightness: lightness
							}

						// add to list
							pixelList.push(imagePixel)
					}

				// restructure as grid
					const pixelGrid = []
					for (let x = 0; x < ELEMENTS.canvas.width; x++) {
						pixelGrid[x] = []
						for (let y = 0; y < ELEMENTS.canvas.height; y++) {
							pixelGrid[x][y] = pixelList[(y * ELEMENTS.canvas.width) + x]
						}
					}

				// return pixel grid
					return pixelGrid
			} catch (error) {console.log(error)}
		}

	/* getHSL */
		function getHSL(rgb) {
			try {
				// get fraction
					const red = rgb[0] / CONSTANTS.rgbMax
					const green = rgb[1] / CONSTANTS.rgbMax
					const blue = rgb[2] / CONSTANTS.rgbMax

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
						hue += CONSTANTS.circleDegrees
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

/*** canvas ***/
	/* resizeCanvas */
		resizeCanvas()
		window.addEventListener(TRIGGERS.resize, resizeCanvas)
		function resizeCanvas(event) {
			try {
				// rect
					const rect = ELEMENTS.canvas.getBoundingClientRect()

				// canvas
					ELEMENTS.canvas.width = rect.width
					ELEMENTS.canvas.height = rect.height

				// redraw
					drawCanvas()
			} catch (error) {console.log(error)}
		}

	/* clearCanvas */
		function clearCanvas() {
			try {
				// clear
					ELEMENTS.context.clearRect(0, 0, ELEMENTS.canvas.width, ELEMENTS.canvas.height)
			} catch (error) {console.log(error)}
		}

	/* translateCanvas */
		function translateCanvas(x, y, callback) {
			try {
				// slide
					ELEMENTS.context.translate(x, -y)

				// do something
					callback()

				// slide back
					ELEMENTS.context.translate(-x, y)
			} catch (error) {console.log(error)}
		}

	/* drawCanvas */
		function drawCanvas() {
			try {
				// clear
					clearCanvas()

				// no image?
					if (!STATE.imageData) {
						return
					}

				// translate & zoom
					translateCanvas(ELEMENTS.canvas.width / 2, ELEMENTS.canvas.height / 2, () => {
						// draw image
							const zoomWidth  = STATE.imageData.width  * (CONSTANTS.zoomBase ** STATE.zoomPower)
							const zoomHeight = STATE.imageData.height * (CONSTANTS.zoomBase ** STATE.zoomPower)

							ELEMENTS.context.drawImage(STATE.imageData, 
								0                      - zoomWidth  / 2,
								ELEMENTS.canvas.height - zoomHeight / 2,
								zoomWidth,
								zoomHeight
							)

						// get pixels
							const frame = ELEMENTS.context.getImageData(0, 0, ELEMENTS.canvas.width, ELEMENTS.canvas.height)

						// loop through frame and process
							STATE.pixelGrid = getPixels(frame.data)
					})
			} catch (error) {console.log(error)}
		}

/*** audio ***/
	/* produceSound */
		function produceSound(imageParameters) {
			try {
				// no instrument?
					if (!AUDIO_J.audio || !AUDIO_J.instruments._cursor) {
						return
					}

				// audioParameters
					const audioParameters = {}

				// mapping image to audio
					for (const imageParameterName in STATE.mappings) {
						// audio
							const audioParameterName = STATE.mappings[imageParameterName]
							if (!audioParameterName || audioParameterName == "-") {
								continue
							}
							const audioParameterRange = CONSTANTS.audioParameters[audioParameterName.split("-")[0]][audioParameterName.split("-")[1]]

						// image value --> audio value
							let imageParameterValue = imageParameters[imageParameterName]
							if (audioParameterName.includes("-reverse")) {
								imageParameterValue = Math.max(0, Math.min(1, 1 - imageParameterValue))
							}
							audioParameters[audioParameterName.replace("-reverse", "")] = imageParameterValue * (audioParameterRange.max - audioParameterRange.min) + audioParameterRange.min
					}

				// update instrument
					for (const audioParameterName in audioParameters) {
						// value
							const audioParameterValue = audioParameters[audioParameterName]

						// switch
							switch (audioParameterName) {
								case "main-pitch":
									continue
								break
								case "main-volume":
									AUDIO_J.instruments._cursor.setParameters({
										volume: audioParameterValue
									})
								break
								case "main-panning":
									AUDIO_J.instruments._cursor.setParameters({
										panning: audioParameterValue
									})
								break
								case "effects-bitcrusher":
									AUDIO_J.instruments._cursor.setParameters({
										bitcrusher: {
											bits: CONSTANTS.audioParameters.effects.bitcrusher.staticFactor,
											norm: audioParameterValue + CONSTANTS.audioParameters.effects.bitcrusher.secondaryFactor
										}
									})
								break
								case "effects-distortion":
									AUDIO_J.instruments._cursor.setParameters({
										distortion: audioParameterValue
									})
								break
								case "effects-noise":
									AUDIO_J.instruments._cursor.setParameters({
										noise: {pink: audioParameterValue}
									})
								break
								case "effects-reverb":
									AUDIO_J.instruments._cursor.setParameters({
										reverb: audioParameterValue
									})
								break
								case "effects-vibrato":
									AUDIO_J.instruments._cursor.setParameters({
										vibrato: {
											wave: CONSTANTS.audioParameters.effects.vibrato.staticFactor,
											pitch: audioParameterValue,
											interval: audioParameterValue * CONSTANTS.audioParameters.effects.vibrato.secondaryFactor
										}
									})
								break
							}
					}

				// not already playing?
					if (!AUDIO_J.instruments._cursor.notes.length) {
						AUDIO_J.instruments._cursor.press(CONSTANTS.audioParameters.main.pitch.staticFactor, 1)
					}

				// bend
					if ("main-pitch" in audioParameters) {
						const detuneCents = audioParameters["main-pitch"] || 0
						AUDIO_J.instruments._cursor.bend(CONSTANTS.audioParameters.main.pitch.staticFactor, detuneCents)
					}
			} catch (error) {console.log(error)}
		}
