/*** globals ***/
	/* triggers */
		const TRIGGERS = {
			click: "click",
			resize: "resize"
		}

	/* elements */
		const ELEMENTS = {
			body: document.body,
			menu: {
				element: document.querySelector("#menu"),
				background: document.querySelector("#menu-background"),
				backgroundTiles: Array.from(document.querySelectorAll("#menu-background div")),
				players: document.querySelector("#menu-players"),
				create: document.querySelector("#menu-create"),
				join: document.querySelector("#menu-join"),
				codes: {
					element: document.querySelector("#menu-codes"),
					header: document.querySelector("#menu-codes-header"),
					image: document.querySelector("#menu-codes-image"),
					previous: document.querySelector("#menu-codes-previous"),
					next: document.querySelector("#menu-codes-next"),
					close: document.querySelector("#menu-codes-close"),
				},
				scan: {
					outer: document.querySelector("#menu-scan"),
					inner: document.querySelector("#menu-scan-inner"),
					back: document.querySelector("#menu-scan-back")
				},
			},
			game: {
				element: document.querySelector("#game"),
				image: {
					outer: document.querySelector("#game-image-outer"),
					inner: document.querySelector("#game-image-inner")
				},
				overlay: {
					player: document.querySelector("#game-player"),
					photoLink: document.querySelector("#game-photo-link"),
					attribution: document.querySelector("#game-attribution")
				},
				visibility: document.querySelector("#game-visibility"),
				quit: {
					outer: document.querySelector("#game-quit-outer"),
					button: document.querySelector("#game-quit"),
					continue: document.querySelector("#game-continue")
				},
				showCodes: document.querySelector("#game-show-codes"),
				final: {
					outer: document.querySelector("#game-final-outer"),
					image: document.querySelector("#game-final-image"),
					close: document.querySelector("#game-final-close"),
					border: document.querySelector("#game-final-border")
				}
			}
		}

	/* constants */
		const CONSTANTS = {
			url: "https://jamesmayr.com/artparts/",
			percent: 100, // %
			quarterTurn: 90, // °
			backgroundColorPalette: 256, // rgb
			backgroundTiles: [0,1,2,3,4,5,6,7,8],
			backgroundTime: 2000, // ms
			api: {
				attributionUrl: "https://unsplash.com/@<username>?utm_source=artparts&utm_medium=referral",
				randomUrl: "https://api.unsplash.com/photos/random?orientation=landscape",
				fetchUrl: "https://api.unsplash.com/photos/",
				key: "client_id=X-_--yj8bhTGfebTCpuyBqRfAsw8uSDuDvOQupRejzA"
			},
			gridSystem: {
				x: 12,
				y: 6
			},
			setups: {
				"_2": [
					[[3,0,8,2], [3,3,8,5]], // all horizontal
					[[3,0,5,5], [6,0,8,5]]  // all vertical
				],
				"_3": [
					[[0,0,5,2],[6,0,11,2],[3,3,8,5]], // all horizontal, full top
					[[3,0,8,2],[0,3,5,5],[6,3,11,5]], // all horizontal, full bottom
					[[1,0,3,5],[4,0,6,5],[7,0,9,5]], // all vertical
					[[1,0,3,5],[4,0,9,2],[4,3,9,5]],
					[[1,0,6,2],[1,3,6,5],[7,0,9,5]],
				],
				"_4": [
					[[0,0,5,2],[0,3,5,5],[6,0,11,2],[6,3,11,5]], // all horizontal
					[[0,0,2,5],[3,0,5,5],[6,0,8,5],[9,0,11,5]], // all vertical
					[[0,0,5,2],[0,3,5,5],[6,0,8,5],[9,0,11,5]],
					[[0,0,2,5],[3,0,5,5],[6,0,11,2],[6,3,11,5]],
					[[0,0,2,5],[3,0,8,2],[3,3,8,5],[9,0,11,5]]
				],
				"_5": [
					[[0,1,3,2],[0,3,3,4],[4,2,7,3],[8,1,11,2],[8,3,11,4]], // all horizontal
					[[1,1,2,4],[3,1,4,4],[5,1,6,4],[7,1,8,4],[9,1,10,4]], // all vertical
					[[2,1,3,4],[4,0,7,1],[4,2,7,3],[4,4,7,5],[8,1,9,4]],
					[[2,1,3,4],[4,0,7,1],[4,2,5,5],[6,2,7,5],[8,1,9,4]],
					[[2,1,3,4],[4,0,5,3],[6,0,7,3],[4,4,7,5],[8,1,9,4]]
				],
				"_6": [
					[[0,1,3,2],[0,3,3,4],[4,1,7,2],[4,3,7,4],[8,1,11,2],[8,3,11,4]], // all horizontal
					[[0,1,1,4],[2,1,3,4],[4,1,5,4],[6,1,7,4],[8,1,9,4],[10,1,11,4]], // all vertical
					[[0,1,3,2],[0,3,3,4],[4,1,5,4],[6,1,7,4],[8,1,11,2],[8,3,11,4]],
					[[0,1,1,4],[2,1,3,4],[4,1,7,2],[4,3,7,4],[8,1,9,4],[10,1,11,4]],
					[[0,1,1,4],[2,1,5,2],[2,3,5,4],[6,1,9,2],[6,3,9,4],[10,1,11,4]]
				],
				"_7": [
					[[0,1,3,2],[0,3,3,4],[4,0,7,1],[4,2,7,3],[4,4,7,5],[8,1,11,2],[8,3,11,4]], // all horizontal
					[[0,1,1,4],[2,1,3,4],[4,0,7,1],[4,2,5,5],[6,2,7,5],[8,1,9,4],[10,1,11,4]], // all vertical except center top
					[[0,1,1,4],[2,1,3,4],[4,0,5,3],[6,0,7,3],[4,4,7,5],[8,1,9,4],[10,1,11,4]], // all vertical except center bottom
					[[0,1,3,2],[0,3,3,4],[4,0,7,1],[4,2,5,5],[6,2,7,5],[8,1,11,2],[8,3,11,4]],
					[[0,1,3,2],[0,3,3,4],[4,0,5,3],[6,0,7,3],[4,4,7,5],[8,1,11,2],[8,3,11,4]]
				],
				"_8": [
					[[0,0,3,1],[0,2,3,3],[0,4,3,5],[4,1,7,2],[4,3,7,4],[8,0,11,1],[8,2,11,3],[8,4,11,5]], // all horizontal
					[[0,0,3,1],[0,2,1,5],[2,2,3,5],[4,1,5,4],[6,1,7,4],[8,0,11,1],[8,2,9,5],[10,2,11,5]], // all vertical except top
					[[0,0,1,3],[2,0,3,3],[0,4,3,5],[4,1,5,4],[6,1,7,4],[8,0,9,3],[10,0,11,3],[8,4,11,5]], // all vertical except bottom
					[[0,0,3,1],[0,2,3,3],[0,4,3,5],[4,1,5,4],[6,1,7,4],[8,0,11,1],[8,2,11,3],[8,4,11,5]],
					[[0,0,3,1],[0,2,1,5],[2,2,3,5],[4,1,7,2],[4,3,7,4],[8,0,9,3],[10,0,11,3],[8,4,11,5]],
					[[0,0,1,3],[2,0,3,3],[0,4,3,5],[4,1,7,2],[4,3,7,4],[8,0,11,1],[8,2,9,5],[10,2,11,5]]
				],
				"_9": [
					[[0,0,3,1],[0,2,3,3],[0,4,3,5],[4,0,7,1],[4,2,7,3],[4,4,7,5],[8,0,11,1],[8,2,11,3],[8,4,11,5]], // all horizontal
					[[0,0,3,1],[0,2,1,5],[2,2,3,5],[4,0,7,1],[4,2,5,5],[6,2,7,5],[8,0,11,1],[8,2,9,5],[10,2,11,5]], // all vertical except top
					[[0,0,1,3],[2,0,3,3],[0,4,3,5],[4,0,5,3],[6,0,7,3],[4,4,7,5],[8,0,9,3],[10,0,11,3],[8,4,11,5]], // all vertical except bottom
					[[0,0,3,1],[0,2,1,5],[2,2,3,5],[4,0,5,3],[6,0,7,3],[4,4,7,5],[8,0,11,1],[8,2,9,5],[10,2,11,5]],
					[[0,0,1,3],[2,0,3,3],[0,4,3,5],[4,0,7,1],[4,2,5,5],[6,2,7,5],[8,0,9,3],[10,0,11,3],[8,4,11,5]]
				],
			},
			qrCodeGenerator: {
				settings: {
					width: Math.min(window.innerWidth, window.innerHeight, 600) - 100, // px with gap
					height: Math.min(window.innerWidth, window.innerHeight, 600) - 100, // px with gap
					colorDark: "black",
					colorLight: "white",
					correctLevel: QRCode.CorrectLevel.M
				}
			},
			qrCodeReader: {
				states : {
					UNKNOWN: 0,
					NOT_STARTED: 1,
					SCANNING: 2,
					PAUSED: 3
				},
				camera: {facingMode: "environment"}, // back camera / webcam
				framesPerSecond: {fps: 10}, // frames / s
				taskTime: 100 // ms
			}
		}

	/* state */
		const STATE = {
			backgroundTiles: [0,1,2,3,4,5,6,7,8],
			thisPlayer: 0,
			players: 0,
			order: [],
			setup: 0,
			image: {
				id: null,
				username: "",
				name: "",
				url: ""
			}
		}

/*** interaction ***/
	/* createGame */
		ELEMENTS.menu.create.addEventListener(TRIGGERS.click, createGame)
		function createGame() {
			try {
				// players
					STATE.players = Number(ELEMENTS.menu.players.value)
					STATE.order = []
					for (let i = 0; i < STATE.players; i++) {
						STATE.order.push(i)
					}
					STATE.order = sortRandom(STATE.order)
					STATE.setup = Number(chooseRandom(Object.keys(CONSTANTS.setups[`_${STATE.players}`])))

				// switch mode
					ELEMENTS.menu.element.setAttribute("state", "show-codes")
					ELEMENTS.game.overlay.player.innerText = "1"
					tryFullscreen()

				// get an image
					fetchRandomImage()
			} catch (error) {console.log(error)}
		}

	/* joinGame */
		ELEMENTS.menu.join.addEventListener(TRIGGERS.click, joinGame)
		function joinGame() {
			try {
				// switch mode
					ELEMENTS.menu.element.setAttribute("state", "scan")
					tryFullscreen()

				// start QR code detector
					startQRcodeDetector()
			} catch (error) {console.log(error)}
		}

	/* previousCode */
		ELEMENTS.menu.codes.previous.addEventListener(TRIGGERS.click, previousCode)
		function previousCode(event) {
			try {
				// get player
					const currentPlayer = Number(ELEMENTS.menu.codes.element.getAttribute("player")) || 0
					let desiredPlayer = (currentPlayer - 1 < 0) ? STATE.players - 1 : (currentPlayer - 1)

				// self --> previous
					if (desiredPlayer == STATE.thisPlayer) {
						desiredPlayer = (desiredPlayer - 1 < 0) ? STATE.players - 1 : (desiredPlayer - 1)
					}
				
				// generate code
					generateQRcode(desiredPlayer)
			} catch (error) {console.log(error)}
		}

	/* nextCode */
		ELEMENTS.menu.codes.next.addEventListener(TRIGGERS.click, nextCode)
		function nextCode(event) {
			try {
				// get player
					const currentPlayer = Number(ELEMENTS.menu.codes.element.getAttribute("player")) || 0
					let desiredPlayer = (currentPlayer + 1 >= STATE.players) ? 0 : (currentPlayer + 1)

				// self --> next
					if (desiredPlayer == STATE.thisPlayer) {
						desiredPlayer = (desiredPlayer + 1 >= STATE.players) ? 0 : (desiredPlayer + 1)
					}
				
				// generate code
					generateQRcode(desiredPlayer)
			} catch (error) {console.log(error)}
		}

	/* closeCodes */
		ELEMENTS.menu.codes.close.addEventListener(TRIGGERS.click, closeCodes)
		function closeCodes(event) {
			try {
				// switch mode
					ELEMENTS.menu.element.setAttribute("state", "none")
			} catch (error) {console.log(error)}
		}

	/* cancelScan */
		ELEMENTS.menu.scan.back.addEventListener(TRIGGERS.click, cancelScan)
		function cancelScan(event) {
			try {
				// stop scanning
					if (STATE.qrCodeReader?.getState() == CONSTANTS.qrCodeReader.states.SCANNING) {
						STATE.qrCodeReader.pause()
					}

				// switch mode
					ELEMENTS.menu.element.setAttribute("state", "setup")
			} catch (error) {console.log(error)}
		}

	/* showCodes */
		ELEMENTS.game.showCodes.addEventListener(TRIGGERS.click, showCodes)
		function showCodes(event) {
			try {
				// switch mode
					ELEMENTS.menu.element.setAttribute("state", "show-codes")

				// next player
					nextCode()
			} catch (error) {console.log(error)}
		}

	/* toggleVisibility */
		ELEMENTS.game.visibility.addEventListener(TRIGGERS.click, toggleVisibility)
		function toggleVisibility(event) {
			try {
				// visible --> hide
					if (ELEMENTS.game.image.outer.getAttribute("visible")) {
						ELEMENTS.game.image.outer.removeAttribute("visible")
						return
					}

				// invisible --> show
					ELEMENTS.game.image.outer.setAttribute("visible", true)
					tryFullscreen()
			} catch (error) {console.log(error)}
		}

	/* quitGame */
		ELEMENTS.game.quit.button.addEventListener(TRIGGERS.click, quitGame)
		function quitGame() {
			try {
				// clear localstorage
					if (window.localStorage.artparts) {
						window.localStorage.artparts = ""
						delete window.localStorage.artparts
					}

				// reload
					location = location.href.split("?")[0]
			} catch (error) {console.log(error)}
		}

	/* continueGame */
		ELEMENTS.game.quit.continue.addEventListener(TRIGGERS.click, continueGame)
		function continueGame(event) {
			try {
				// close up quit confirmation
					ELEMENTS.game.quit.outer.removeAttribute("open")
					ELEMENTS.game.quit.continue.blur()
			} catch (error) {console.log(error)}
		}

	/* showFinal */
		ELEMENTS.game.overlay.photoLink.addEventListener(TRIGGERS.click, showFinal)
		function showFinal(event) {
			try {
				// don't open link
					event.preventDefault()
				
				// show final image
					ELEMENTS.game.final.outer.setAttribute("visible", true)
			} catch (error) {console.log(error)}
		}

	/* hideFinal */
		ELEMENTS.game.final.close.addEventListener(TRIGGERS.click, hideFinal)
		function hideFinal(event) {
			try {
				// hide final image
					ELEMENTS.game.final.outer.removeAttribute("visible", true)
			} catch (error) {console.log(error)}
		}

/*** menu background ***/
	/* setBackground */
		setBackground()
		function setBackground() {
			try {
				// initialize
					for (const i in CONSTANTS.backgroundTiles) {
						changeBackground()
					}

				// start loop
					STATE.backgroundLoop = setInterval(changeBackground, CONSTANTS.backgroundTime)
			} catch (error) {console.log(error)}
		}

	/* changeLoop */
		function changeBackground() {
			try {
				// choose from list
					if (!STATE.backgroundTiles.length) {
						STATE.backgroundTiles = JSON.parse(JSON.stringify(CONSTANTS.backgroundTiles))
					}
					const nextTile = chooseRandom(STATE.backgroundTiles)
					STATE.backgroundTiles.splice(STATE.backgroundTiles.indexOf(nextTile), 1)

				// random color
					const color = `rgb(${Math.floor(Math.random() * CONSTANTS.backgroundColorPalette)},${Math.floor(Math.random() * CONSTANTS.backgroundColorPalette)},${Math.floor(Math.random() * CONSTANTS.backgroundColorPalette)})`

				// update tile
					ELEMENTS.menu.backgroundTiles[nextTile].style.background = color
			} catch (error) {console.log(error)}
		}

/*** helpers ***/
	/* chooseRandom */
		function chooseRandom(list) {
			try {
				if (!Array.isArray(list)) {
					return list
				}
				return list[Math.floor(Math.random() * list.length)]
			} catch (error) {console.log(error)}
		}

	/* sortRandom */
		function sortRandom(list) {
			try {
				if (!Array.isArray(list)) {
					return list
				}
				
				const copy = JSON.parse(JSON.stringify(list))
				let x = copy.length
				while (x > 0) {
					const y = Math.floor(Math.random() * x)
					x -= 1
					const temp = copy[x]
					copy[x] = copy[y]
					copy[y] = temp
				}
				return copy
			}
			catch (error) {console.log(error)}
		}

	/* storeState */
		function storeState() {
			try {
				// store data
					window.localStorage.artparts = JSON.stringify({
						p: STATE.players,
						o: STATE.order.join(","),
						s: STATE.setup,
						i: STATE.image?.id || null,
						t: STATE.thisPlayer
					})
			} catch (error) {console.log(error)}
		}

	/* loadState */
		loadState()
		function loadState() {
			try {
				// game in url
					if (window.location.search) {
						detectQRcode(window.location.href)
						return
					}

				// no previous game
					if (!window.localStorage.artparts) {
						window.localStorage.artparts = ""
						return
					}

				// set state from localstorage
					const data = JSON.parse(window.localStorage.artparts)
					STATE.players = Number(data.p)
					STATE.order = data.o.split(",").map(n => Number(n))
					STATE.setup = Number(data.s)
					STATE.thisPlayer = Number(data.t)

				// switch mode
					ELEMENTS.menu.element.setAttribute("state", "none")
					ELEMENTS.game.overlay.player.innerText = String(STATE.thisPlayer + 1)

				// fetch image
					fetchSpecificImage(data.i)
			} catch (error) {console.log(error)}
		}

	/* tryFullscreen */
		function tryFullscreen() {
			try {
				// only supported on Android, not on iOS
					ELEMENTS.body.requestFullscreen()
			} catch (error) {}
		}

/*** image API ***/
	/* fetchRandomImage */
		function fetchRandomImage() {
			try {
				// fetch a random image
					fetch(CONSTANTS.api.randomUrl + "&" + CONSTANTS.api.key, {method: "GET"})
					.then(response => response.json())
					.then(data => {
						// invalid
							if (!data || typeof data !== "object") {
								return null
							}

						// save image
							STATE.image = {
								id: data.id,
								username: data.user.username || "",
								name: data.user.name || "",
								url: data.urls.regular || data.urls.full || data.urls.small || null
							}

						// store
							storeState()

						// qr codes
							generateQRcode(1) // start with next player

						// set game image
							displayImagePart()
					})
			} catch (error) {console.log(error)}
		}

	/* fetchSpecificImage */
		function fetchSpecificImage(imageId) {
			try {
				// fetch specific image
					fetch(CONSTANTS.api.fetchUrl + imageId + "?" + CONSTANTS.api.key, {method: "GET"})
						.then(response => response.json())
						.then(data => {
							// invalid
								if (!data) {
									return null
								}

							// save image
								STATE.image = {
									id: data.id,
									username: data.user.username || "",
									name: data.user.name || "",
									url: data.urls.regular || data.urls.full || data.urls.small || null
								}

							// store
								storeState()

							// display
								displayImagePart()
						})
			} catch (error) {console.log(error)}
		}

	/* displayImagePart */
		window.addEventListener(TRIGGERS.resize, displayImagePart)
		function displayImagePart() {
			try {
				// no image
					if (!STATE.image?.url) {
						return
					}

				// attribution
					ELEMENTS.game.overlay.photoLink.href = STATE.image.url
					ELEMENTS.game.overlay.attribution.href = CONSTANTS.api.attributionUrl.replace("<username>", STATE.image.username)
					ELEMENTS.game.overlay.attribution.innerText = STATE.image.name

				// device
					const deviceWidth  = window.innerWidth
					const deviceHeight = window.innerHeight

				// determine part
					const actualPlayer = STATE.order[STATE.thisPlayer]
					const actualSetup = CONSTANTS.setups[`_${STATE.players}`][STATE.setup]
					const coordinates = actualSetup[actualPlayer]

				// determine coordinates
					const xStart = (coordinates[0]      / CONSTANTS.gridSystem.x * CONSTANTS.percent)
					const yStart = (coordinates[1]      / CONSTANTS.gridSystem.y * CONSTANTS.percent)
					const xEnd  = ((coordinates[2] + 1) / CONSTANTS.gridSystem.x * CONSTANTS.percent)
					const yEnd  = ((coordinates[3] + 1) / CONSTANTS.gridSystem.y * CONSTANTS.percent)

				// sizing
					const xSize = (xEnd - xStart)
					const ySize = (yEnd - yStart)
					const xFactor = 100 / xSize
					const yFactor = 100 / ySize

				// set game image
					ELEMENTS.game.image.inner.src = STATE.image.url
					ELEMENTS.game.image.inner.onload = function() {
						// image dimensions
							const imageWidth = ELEMENTS.game.image.inner.naturalWidth
							const imageHeight = ELEMENTS.game.image.inner.naturalHeight

						// clip
							ELEMENTS.game.image.inner.style.clipPath = `polygon(${xStart}% ${yStart}%, ${xEnd}% ${yStart}%, ${xEnd}% ${yEnd}%, ${xStart}% ${yEnd}%)`

						// vertical device
							if (deviceHeight > deviceWidth) {
								// vertical slice
									if ((coordinates[3] + 1 - coordinates[1]) > (coordinates[2] + 1 - coordinates[0])) {
										ELEMENTS.game.image.inner.style.width  = `calc(100vw * ${xFactor})`
										ELEMENTS.game.image.inner.style.height = `calc(100vh * ${yFactor})`
										ELEMENTS.game.image.inner.style.transform = `translateX(${-xStart}%) translateY(${-yStart}%)`
									}

								// horizontal slice
									else {
										ELEMENTS.game.image.inner.style.width  = `calc(100vh * ${xFactor})`
										ELEMENTS.game.image.inner.style.height = `calc(100vw * ${yFactor})`
										ELEMENTS.game.image.inner.style.transform = `rotate(${CONSTANTS.quarterTurn}deg) translateX(${-xStart}%) translateY(${(CONSTANTS.percent / -yFactor) - yStart}%)`
									}
							}

						// horizontal device
							else {
								// vertical slice
									if ((coordinates[3] + 1 - coordinates[1]) > (coordinates[2] + 1 - coordinates[0])) {
										ELEMENTS.game.image.inner.style.width  = `calc(100vh * ${xFactor})`
										ELEMENTS.game.image.inner.style.height = `calc(100vw * ${yFactor})`
										ELEMENTS.game.image.inner.style.transform = `rotate(${CONSTANTS.quarterTurn}deg) translateX(${-xStart}%) translateY(${(CONSTANTS.percent / -yFactor) - yStart}%)`
									}

								// horizontal slice
									else {
										ELEMENTS.game.image.inner.style.width  = `calc(100vw * ${xFactor})`
										ELEMENTS.game.image.inner.style.height = `calc(100vh * ${yFactor})`
										ELEMENTS.game.image.inner.style.transform = `translateX(${-xStart}%) translateY(${-yStart}%)`
									}
							}

						// set final image
							const ratio = imageHeight / imageWidth
								ELEMENTS.game.final.image.style.height = `calc(100vw * ${ratio})`
								ELEMENTS.game.final.image.style.width = `calc(100vw)`
								ELEMENTS.game.final.image.style.maxHeight = `calc(100vh)`
								ELEMENTS.game.final.image.style.maxWidth = `calc(100vh / ${ratio})`
							ELEMENTS.game.final.image.style.backgroundImage = `url(${STATE.image.url})`
							
							ELEMENTS.game.final.border.style.left  = xStart + "%"
							ELEMENTS.game.final.border.style.top   = yStart + "%"
							ELEMENTS.game.final.border.style.width  = (xEnd - xStart) + "%"
							ELEMENTS.game.final.border.style.height = (yEnd - yStart) + "%"
					}
			} catch (error) {console.log(error)}
		}

/*** QR code maker ***/
	/* generateQRcode */
		function generateQRcode(thisPlayer) {
			try {
				// default index
					if (!thisPlayer) {
						thisPlayer = 0
					}

				// qr code
					const qrCodeString = CONSTANTS.url + 
						`?p=${STATE.players}` +
						`&o=${STATE.order.join(",")}` +
						`&s=${STATE.setup}` +
						`&i=${STATE.image.id}` +
						`&t=${thisPlayer}`

				// display
					ELEMENTS.menu.codes.element.setAttribute("player", thisPlayer)
					ELEMENTS.menu.codes.header.innerText = `scan for player ${thisPlayer + 1}`
					displayQRcode(qrCodeString)
			} catch (error) {console.log(error)}
		}

	/* displayQRcode */	
		function displayQRcode(text) {
			try {
				// clear
					ELEMENTS.menu.codes.image.innerHTML = ""

				// create image
					STATE.qrCodeViewer = new QRCode(ELEMENTS.menu.codes.image, {
						text: text,
						...CONSTANTS.qrCodeGenerator.settings
					})
			} catch (error) {console.log(error)}
		}

/*** QR code reader ***/
	/* startCamera */
		function startQRcodeDetector() {
			try {
				// none?
					if (!STATE.qrCodeReader) {
						STATE.qrCodeReader = new Html5Qrcode(ELEMENTS.menu.scan.inner.id)
					}

				// get state
					const qrCodeReaderState = STATE.qrCodeReader.getState()

				// scanning --> return
					if (qrCodeReaderState == CONSTANTS.qrCodeReader.states.SCANNING) {
						return
					}

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
				// parse text
					const url = new URL(text)
					if (!url || !url.search) {
						return
					}
					const parameters = url.search.slice(1).split("&")
					const data = {}
					for (const p in parameters) {
						const pair = parameters[p].split("=")
						data[pair[0]] = pair[1]
					}

				// set state
					STATE.players = Number(data.p)
					STATE.order = data.o.split(",").map(n => Number(n))
					STATE.setup = Number(data.s)
					STATE.thisPlayer = Number(data.t)
					
				// pause
					if (STATE.qrCodeReader?.getState() == CONSTANTS.qrCodeReader.states.SCANNING) {
						STATE.qrCodeReader.pause()
					}

				// switch mode
					ELEMENTS.menu.element.setAttribute("state", "none")
					ELEMENTS.game.overlay.player.innerText = String(STATE.thisPlayer + 1)

				// fetch image
					fetchSpecificImage(data.i)
			} catch (error) {console.log(error)}
		}
