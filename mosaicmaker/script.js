/*** globals ***/
	/* elements */
		const ELEMENTS = {
			body: document.body,
			menu: {
				details: document.querySelector("#menu"),
				toggle: document.querySelector("#menu-toggle"),
				form: document.querySelector("#menu-form"),
				main: {
					file: document.querySelector("#menu-main-file")
				},
				tile: {
					file: document.querySelector("#menu-tile-file")
				},
				chunks: {
					count: document.querySelector("#menu-chunks-count")
				},
				submit: document.querySelector("#menu-submit")
			},
			download: document.querySelector("#download"),
			canvas: {
				main: document.querySelector("#canvas-main"),
				tile: document.querySelector("#canvas-tile")
			},
			context: {
				main: document.querySelector("#canvas-main").getContext("2d"),
				tile: document.querySelector("#canvas-tile").getContext("2d"),
			}
		}

	/* settings */
		const SETTINGS = {
			maxChunks: 100,
			minChunks: 1,
			desaturationOperation: "saturation",
			desaturationColor: "white",
			overlayOperation: "multiply",
			overlayOpacity: 0.75,
			secondOverlayOperation: "screen",
			secondOverlayOpacity: 0.75,
			imageTypes: ["image/png", "image/jpeg", "image/jpg", "image/gif", "image/webp", "image/bmp", "image/tiff", "image/svg+xml"],
		}

	/* state */
		const STATE = {
			mainFile: null,
			mainImage: null,
			tileFiles: [],
			tileImages: [],
			chunksCount: 0,
			pixels: [],
			XYratio: 1
		}

/*** interaction ***/
	/* submitForm */
		ELEMENTS.menu.form.addEventListener("submit", submitForm)
		function submitForm(event) {
			try {
				// reset download
					ELEMENTS.download.setAttribute("href", "#")

				// get files
					let mainFile = ELEMENTS.menu.main.file.files[0]
					let tileFiles = Array.from(ELEMENTS.menu.tile.file.files)
					let chunksCount = Number(ELEMENTS.menu.chunks.count.value) || 1

				// validation
					if (!mainFile) {
						return
					}

				// set state
					STATE.mainFile = mainFile
					STATE.tileFiles = tileFiles
					STATE.chunksCount = chunksCount
					STATE.pixels = []
					STATE.XYratio = 1
					STATE.mainImage = null
					STATE.tileImages = []

				// close form
					ELEMENTS.menu.details.removeAttribute("open")

				// upload images
					uploadImages()
			} catch (error) {console.log(error)}
		}

/*** process ***/
	/* uploadImages */
		function uploadImages() {
			try {
				// read main image
					let mainReader = new FileReader()
						mainReader.onload = function(event) {
							let mainImage = new Image
								mainImage.onload = function() {
									STATE.mainImage = mainImage
									createMosaic()
								}
								mainImage.src = event.target.result
							STATE.mainImage = mainImage
						}
						mainReader.readAsDataURL(STATE.mainFile)

				// loop through tile images
					for (let i in STATE.tileFiles) {
						let tileReader = new FileReader()
							tileReader.onload = function(event) {
								let tileImage = new Image
									tileImage.onload = function() {
										STATE.tileImages.push(tileImage)
										createMosaic()
									}
									tileImage.src = event.target.result
							}
							tileReader.readAsDataURL(STATE.tileFiles[i])
					}
			} catch (error) {console.log(error)}
		}

	/* dragImages */
		ELEMENTS.body.addEventListener("dragover", dragImages)
		function dragImages(event) {
			try {
				event.preventDefault()
			} catch (error) {console.log(error)}
		}

	/* dropImages */
		ELEMENTS.body.addEventListener("drop", dropImages)
		function dropImages(event) {
			try {
				// defaults
					event.preventDefault()
					if (!event.dataTransfer || !event.dataTransfer.items) {
						return
					}

				// file
					const files = [...event.dataTransfer.items]
					const images = []
					for (const f in files) {
						const file = files[f].getAsFile()
						if (!file) {
							return
						}
						if (!SETTINGS.imageTypes.includes(file.type)) {
							return
						}
						images.push(file)
					}

				// reset download
					ELEMENTS.download.setAttribute("href", "#")

				// get files
					let mainFile = images[0]
					let tileFiles = images.slice(1)
					let chunksCount = Number(ELEMENTS.menu.chunks.count.value) || 1

				// validation
					if (!mainFile) {
						return
					}

				// set state
					STATE.mainFile = mainFile
					STATE.tileFiles = tileFiles
					STATE.chunksCount = chunksCount
					STATE.pixels = []
					STATE.XYratio = 1
					STATE.mainImage = null
					STATE.tileImages = []

				// close form
					ELEMENTS.menu.details.removeAttribute("open")

				// upload images
					uploadImages()
			} catch (error) {console.log(error)}
		}

	/* createMosaic */
		function createMosaic(event) {
			try {
				// still waiting
					if (!STATE.mainImage || STATE.tileImages.length < STATE.tileFiles.length) {
						return
					}

				// main
					// get image ratio
						STATE.XYratio = (STATE.mainImage.width / STATE.mainImage.height)

					// update canvas size
						ELEMENTS.canvas.main.height = STATE.chunksCount
						ELEMENTS.canvas.main.width  = STATE.chunksCount

					// clear canvas
						ELEMENTS.context.main.clearRect(0, 0, STATE.chunksCount, STATE.chunksCount)

					// get dimensions and position on canvas
						let width   = STATE.chunksCount * (STATE.XYratio >= 1 ? 1 : STATE.XYratio)
						let height  = STATE.chunksCount / (STATE.XYratio <= 1 ? 1 : STATE.XYratio)
						let gutterX = STATE.XYratio >= 1 ? 0 : (STATE.chunksCount - (STATE.chunksCount * STATE.XYratio)) / 2 
						let gutterY = STATE.XYratio <= 1 ? 0 : (STATE.chunksCount - (STATE.chunksCount / STATE.XYratio)) / 2

					// draw
						ELEMENTS.context.main.drawImage(STATE.mainImage, gutterX, gutterY, width, height)
					
					// get colors at pixels
						for (let x = 0; x < STATE.chunksCount; x++) {
							STATE.pixels[x] = []

							for (let y = 0; y < STATE.chunksCount; y++) {
								STATE.pixels[x][y] = ELEMENTS.context.main.getImageData(x, y, 1, 1).data
							}
						}

				// tiles
					// set dimensions
						let smallerDimension = Math.min(window.innerHeight, window.innerWidth)
						ELEMENTS.canvas.tile.height = smallerDimension
						ELEMENTS.canvas.tile.width  = smallerDimension
					
					// get tileSize
						let tileSize = Math.min(ELEMENTS.canvas.tile.height, ELEMENTS.canvas.tile.width) / STATE.chunksCount

					// clear canvas
						ELEMENTS.context.tile.clearRect(0, 0, ELEMENTS.canvas.tile.width, ELEMENTS.canvas.tile.height)

					// display tiles with appropriate color overlays
						for (let x = 0; x < STATE.pixels.length; x++) {
							for (let y = 0; y < STATE.pixels.length; y++) {
								// transparent?
									if (!STATE.pixels[x][y][3]) {
										continue
									}

								// tile image
									if (STATE.tileImages.length) {
										// choose an image
											let tileImage = chooseRandom(STATE.tileImages)
											let minDimension = Math.min(tileImage.width, tileImage.height)

										// image
											ELEMENTS.context.tile.globalAlpha = 1
											ELEMENTS.context.tile.globalCompositeOperation = "source-over"
											ELEMENTS.context.tile.drawImage(tileImage, 
												(tileImage.width - minDimension) / 2, (tileImage.height - minDimension) / 2, minDimension, minDimension,
												x * tileSize, y * tileSize, tileSize, tileSize)

										// desaturate
											ELEMENTS.context.tile.globalAlpha = 1
											ELEMENTS.context.tile.globalCompositeOperation = SETTINGS.desaturationOperation
											ELEMENTS.context.tile.fillStyle = SETTINGS.desaturationColor
											ELEMENTS.context.tile.fillRect(x * tileSize, y * tileSize, tileSize, tileSize)
									}

								// color overlay
									ELEMENTS.context.tile.globalAlpha = SETTINGS.overlayOpacity
									ELEMENTS.context.tile.globalCompositeOperation = SETTINGS.overlayOperation
									ELEMENTS.context.tile.fillStyle = "rgba(" + STATE.pixels[x][y].join(",") + ")"
									ELEMENTS.context.tile.fillRect(x * tileSize, y * tileSize, tileSize, tileSize)

									ELEMENTS.context.tile.globalAlpha = SETTINGS.secondOverlayOpacity
									ELEMENTS.context.tile.globalCompositeOperation = SETTINGS.secondOverlayOperation
									ELEMENTS.context.tile.fillStyle = "rgba(" + STATE.pixels[x][y].join(",") + ")"
									ELEMENTS.context.tile.fillRect(x * tileSize, y * tileSize, tileSize, tileSize)
							}
						}

					// update download
						ELEMENTS.download.setAttribute("href", ELEMENTS.canvas.tile.toDataURL("image/png"))
						ELEMENTS.download.setAttribute("download", "mosaicMaker_" + (new Date().getTime()) + ".png")
			} catch (error) {console.log(error)}
		}

/*** tools ***/
	/* chooseRandom */
		function chooseRandom(array) {
			try {
				// not an array
					if (!array || !Array.isArray(array)) {
						return array
					}

				// random element
					return array[Math.floor(Math.random() * array.length)]
			} catch (error) {console.log(error)}
		}
