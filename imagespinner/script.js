/*** globals ***/
	/* triggers */
		const TRIGGERS = {
			click: "click",
			mousedown: "mousedown",
			mousemove: "mousemove",
			mouseup: "mouseup",
			submit: "submit",
			input: "input",
			change: "change",
			dragover: "dragover",
			drop: "drop"
		}

		if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
			TRIGGERS.click = "touchstart"
			TRIGGERS.mousedown = "touchstart"
			TRIGGERS.mousemove = "touchmove"
			TRIGGERS.mouseup = "touchend"
		}
		
	/* elements */
		const ELEMENTS = {
			body: document.body,
			settings: {
				element: document.querySelector("#settings"),
				form: document.querySelector("#settings-inner"),
				reset: document.querySelector("#settings-reset"),
				layers: document.querySelector("#settings-layers"),
				type: {
					url: document.querySelector("#settings-type-url"),
					file: document.querySelector("#settings-type-file"),
					api: document.querySelector("#settings-type-api")
				},
				url: document.querySelector("#settings-url"),
				file: document.querySelector("#settings-file"),
				error: document.querySelector("#settings-error"),
				submit: document.querySelector("#settings-submit")
			},
			puzzle: document.querySelector("#puzzle"),
			attribution: document.querySelector("#attribution")
		}

	/* constants */
		const CONSTANTS = {
			victoryDelay: 2000,
			minimumPieces: 2,
			quarterTurn: 90,
			circle: 360,
			radians: 2 * Math.PI,
			rotations: [0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5],
			imageTypes: ["image/png", "image/jpeg", "image/jpg", "image/gif", "image/webp", "image/bmp", "image/tiff", "image/svg+xml"],
			transform: function(angle) { return "translateX(-50%) translateY(-50%) rotate(" + angle + "deg)" },
			api: {
				url: "https://api.unsplash.com/photos/random?client_id=",
				key: "e8A-3n6Q44GtBC6bADKk46BlMhawNRGrXt55m7_AU28",
				attribute: function(data) {
					return 'Photo by ' +
							'<a target="_blank" nofollow href="https://unsplash.com/@' + data.user.username + '?utm_source=imagespinner&utm_medium=referral">' + data.user.name + '</a>' +
							' on ' +
							'<a target="_blank" nofollow href="https://unsplash.com/?utm_source=imagespinner&utm_medium=referral">' + 
							'Unsplash'
				}
			}
		}

	/* game */
		const GAME = {
			settings: {},
			pieces: [],
			selected: null
		}

/*** tools ***/
	/* getParameters */
		getParameters()
		function getParameters() {
			try {
				// querystring
					let querystring = (window.location.search || "?").slice(1)
						querystring = querystring.split("&")

				// get
					let parameters = {}
					for (let i in querystring) {
						let pair = querystring[i].split("=")
						parameters[pair[0]] = pair[1]
					}

				// set in form
					if (parameters.layers && !isNaN(parameters.layers) && parameters.layers > 1) {
						ELEMENTS.settings.layers.value = Math.floor(parameters.layers)
					}

					if (parameters.url && parameters.url.length) {
						try {
							ELEMENTS.settings.url.value = new URL(parameters.url).href
						} catch (error) {}
					}
			} catch (error) {console.log(error)}
		}

	/* chooseRandom */
		function chooseRandom(list) {
			try {
				// not an array
					if (!Array.isArray(list)) {
						return list
					}

				// random selection
					return list[Math.floor(Math.random() * list.length)]
			} catch (error) {console.log(error)}
		}

	/* getAngle */
		function getAngle(x, y) {
			try {
				// get window
					let height = window.innerHeight
					let width = window.innerWidth

				// relative coordinates
					x = x - (width / 2)
					y = y - (height / 2)

				// angle
					return ((Math.atan2(x, y) * CONSTANTS.circle / CONSTANTS.radians) + CONSTANTS.circle - CONSTANTS.quarterTurn) % CONSTANTS.circle
			} catch (error) {console.log(error)}
		}

	/* sendRequest */
		function sendRequest(url, callback) {
			try {
				// url
					if (!url) {
						callback({success: false, message: "no url"})
						return
					}

				// make request
					let request = new XMLHttpRequest()
						request.open("GET", url, true)
						request.onload = function() {
							if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
								// no results this time
									if (!request.response) {
										callback({success: false, message: "no response"})
										return
									}

								// parse
									try {
										let response = JSON.parse(request.response)
										callback({success: true, data: response})
									}
									catch (error) {
										callback({success: false, message: "unable to parse response"})	
									}
							}
						}
						request.send()
			} catch (error) {console.log(error)}
		}

/*** interaction ***/
	/* resetForm */
		ELEMENTS.settings.reset.addEventListener(TRIGGERS.click, resetForm)
		function resetForm(event) {
			try {
				// stop
					event.preventDefault()
					event.stopPropagation()

				// close
					ELEMENTS.settings.element.removeAttribute("open")
			} catch (error) {console.log(error)}
		}

	/* inputURL */
		ELEMENTS.settings.url.addEventListener(TRIGGERS.input, inputURL)
		function inputURL(event) {
			try {
				// clear out url
					ELEMENTS.settings.file.value = ""

				// select type
					ELEMENTS.settings.type.url.checked = true
			} catch (error) {console.log(error)}
		}

	/* selectFile */
		ELEMENTS.settings.file.addEventListener(TRIGGERS.change, selectFile)
		function selectFile(event) {
			try {
				// clear out url
					ELEMENTS.settings.url.value = ""

				// select type
					ELEMENTS.settings.type.file.checked = true
			} catch (error) {console.log(error)}
		}

	/* selectRandom */
		ELEMENTS.settings.type.api.addEventListener(TRIGGERS.input, selectRandom)
		function selectRandom(event) {
			try {
				// clear out url
					ELEMENTS.settings.url.value = ""
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
					if (!CONSTANTS.imageTypes.includes(file.type)) {
						return
					}

				// form
					selectFile()
					submitForm(null, file)
			} catch (error) {console.log(error)}
		}

	/* submitForm */
		ELEMENTS.settings.form.addEventListener(TRIGGERS.submit, submitForm)
		function submitForm(event, file) {
			try {
				// assume good
					ELEMENTS.settings.submit.removeAttribute("invalid")
					ELEMENTS.settings.url.removeAttribute("invalid")
					ELEMENTS.settings.file.removeAttribute("invalid")
					ELEMENTS.settings.error.value = ""

				// layers
					GAME.settings.layers = Math.floor(ELEMENTS.settings.layers.value) || CONSTANTS.minimumPieces

				// type
					let type = ELEMENTS.settings.type.url.checked ? "url"
						: ELEMENTS.settings.type.file.checked ? "file"
						: ELEMENTS.settings.type.api.checked ? "api"
						: null
					if (!type) {
						return
					}
					
				// new image
					GAME.settings.image = new Image
					GAME.settings.image.onload = createPuzzle
					GAME.settings.image.onerror = function(error) {
						ELEMENTS.settings.error.value = "error"
					}

				// image from url
					if (type == "url") {
						if (!ELEMENTS.settings.url.value || !ELEMENTS.settings.url.value.length) {
							ELEMENTS.settings.url.setAttribute("invalid", true)
							return
						}

						try {
							GAME.settings.image.extraInfo = null
							GAME.settings.image.src = new URL(ELEMENTS.settings.url.value).href
						}
						catch (error) {
							ELEMENTS.settings.error.value = "invalid url"
							ELEMENTS.settings.submit.setAttribute("invalid", true)
						}
						return
					}

				// image from file
					if (type == "file") {
						if (!file) {
							if (!ELEMENTS.settings.file.files || !ELEMENTS.settings.file.files[0]) {
								ELEMENTS.settings.file.setAttribute("invalid", true)
								return
							}
							file = ELEMENTS.settings.file.files[0]
						}

						let fileReader = new FileReader()
							fileReader.onload = function(event) {
								GAME.settings.image.extraInfo = null
								GAME.settings.image.src = event.target.result
							}
							fileReader.onerror = function(event) {
								ELEMENTS.settings.error.value = "invalid file"
								ELEMENTS.settings.submit.setAttribute("invalid", true)
							}
							fileReader.readAsDataURL(file)
						return
					}

				// image from api
					if (type == "api") {
						sendRequest(CONSTANTS.api.url + CONSTANTS.api.key, function(response) {
							// fail
								if (!response.success) {
									ELEMENTS.settings.error.value = response.message || "invalid request"
								}

							// succeed
								GAME.settings.image.extraInfo = response.data
								GAME.settings.image.src = response.data.urls.regular
						})
						return
					}

				// no image
					ELEMENTS.settings.submit.setAttribute("invalid", true)
			} catch (error) {console.log(error)}
		}

	/* createPuzzle */
		function createPuzzle() {
			try {
				// close settings
					ELEMENTS.settings.element.removeAttribute("open")

				// remove existing puzzle
					ELEMENTS.puzzle.removeAttribute("victory")
					ELEMENTS.puzzle.innerHTML = ""
					GAME.pieces = []
					GAME.selected = null

				// image ratio
					GAME.settings.image.wRatio = Math.max(GAME.settings.image.width / GAME.settings.image.height, 1)
					GAME.settings.image.hRatio = Math.max(GAME.settings.image.height / GAME.settings.image.width, 1)

				// layers of puzzle
					let thisLayer = 0
					while (thisLayer < GAME.settings.layers) {
						// relative size
							let size = (100 / GAME.settings.layers) * (thisLayer + 1)
							let reverseSize = 100 / size * 100

						// create layer
							let layer = document.createElement("div")
								layer.className = "puzzle-layer"
								layer.id = "puzzle-layer-" + thisLayer
								layer.style.backgroundImage = "url(" + GAME.settings.image.src + ")"
								layer.style.backgroundSize = reverseSize * GAME.settings.image.wRatio + "% " + reverseSize * GAME.settings.image.hRatio + "%"
								layer.style.height = size + "%"
								layer.style.width = size + "%"
								layer.style["z-index"] =  (GAME.settings.layers - thisLayer)
							ELEMENTS.puzzle.appendChild(layer)
							GAME.pieces.push(layer)

						// rotation
							if (thisLayer != GAME.settings.layers - 1) {
								let rotation = (thisLayer == GAME.settings.layers - 1) ? 0 : chooseRandom(CONSTANTS.rotations)
								layer.setAttribute("rotation", rotation)
								layer.style.transform = CONSTANTS.transform(rotation)
								layer.addEventListener(TRIGGERS.mousedown, grabPiece)
							}
							else {
								layer.setAttribute("rotation", 0)
							}

						// increment
							thisLayer++
					}

				// api info
					ELEMENTS.attribution.innerHTML = ""
					if (GAME.settings.image.extraInfo) {
						ELEMENTS.attribution.innerHTML = CONSTANTS.api.attribute(GAME.settings.image.extraInfo)
					}
			} catch (error) {console.log(error)}
		}

	/* grabPiece */
		function grabPiece(event) {
			try {
				// not a piece
					if (event.target.className !== "puzzle-layer") {
						return
					}

				// last piece

				// get position
					let position = {
						x: (event.touches ? event.touches[0].clientX : event.clientX),
						y: (event.touches ? event.touches[0].clientY : event.clientY)
					}

				// select this piece
					GAME.selected = {
						piece: event.target,
						grabAngle: getAngle(position.x, position.y),
						startAngle: Number(event.target.getAttribute("rotation"))
					}

				// grabbing
					ELEMENTS.puzzle.setAttribute("grabbing", true)
			} catch (error) {console.log(error)}
		}

	/* movePiece */
		document.addEventListener(TRIGGERS.mousemove, movePiece)
		function movePiece(event) {
			try {
				// none selected
					if (!GAME.selected) {
						return
					}

				// get position
					let position = {
						x: (event.touches ? event.touches[0].clientX : event.clientX),
						y: (event.touches ? event.touches[0].clientY : event.clientY)
					}

				// get angle
					let cursorAngle = getAngle(position.x, position.y)

				// rotate piece
					let newAngle = (GAME.selected.startAngle + (GAME.selected.grabAngle - cursorAngle) + CONSTANTS.circle) % CONSTANTS.circle
					GAME.selected.piece.setAttribute("rotation", newAngle)
					GAME.selected.piece.style.transform = CONSTANTS.transform(newAngle)
			} catch (error) {console.log(error)}
		}

	/* releasePiece */
		document.addEventListener(TRIGGERS.mouseup, releasePiece)
		function releasePiece(event) {
			try {
				// none selected
					if (!GAME.selected) {
						return
					}

				// get rounded angle
					let angleWedge = CONSTANTS.circle / CONSTANTS.rotations.length
					let roundedAngle = (Math.round(Number(GAME.selected.piece.getAttribute("rotation")) / angleWedge) * angleWedge + CONSTANTS.circle) % CONSTANTS.circle

				// set rounded angle
					GAME.selected.piece.setAttribute("rotation", roundedAngle)
					GAME.selected.piece.style.transform = CONSTANTS.transform(roundedAngle)

				// unselect
					GAME.selected = null
					ELEMENTS.puzzle.removeAttribute("grabbing")

				// victory?
					if (isVictory()) {
						ELEMENTS.puzzle.setAttribute("victory", true)
						ELEMENTS.puzzle.focus()

						setTimeout(function() {
							ELEMENTS.settings.element.setAttribute("open", true)
						}, CONSTANTS.victoryDelay)
					}
			} catch (error) {console.log(error)}
		}

	/* isVictory */
		function isVictory() {
			try {
				// get pieces
					for (let i in GAME.pieces) {
						if (GAME.pieces[i].getAttribute("rotation") != 0) {
							return false
						}
					}

				// still here
					return true
			} catch (error) {console.log(error)}
		}

/*** assetManager ***/
	/* retrieveAsset */
		window.ASSETS_J.retrieveAsset = function(name, type, data) {
			try {
				// image
					GAME.settings.layers = Math.floor(ELEMENTS.settings.layers.value) || CONSTANTS.minimumPieces
					GAME.settings.image = new Image
					GAME.settings.image.onload = createPuzzle
					GAME.settings.image.extraInfo = null
					GAME.settings.image.src = data
			} catch (error) {console.log(error)}
		}
