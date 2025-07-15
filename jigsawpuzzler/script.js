/*** globals ***/
	/* constants */
		const CONSTANTS = {
			api: {
				url: "https://collectionapi.metmuseum.org/public/collection/v1/objects",
				fetchLimit: 10
			},
			gutter: 100,
			angles: [0, 90, 180, 270],
			sides: ["top", "right", "bottom", "left"],
			fadePause: 1000,
			doubleClickTime: 250,
			notchAmount: 0.2,
			edges: {
				top: {
					in: "20% 20%, 45% 20%, 45% 25%, 41.5% 27.5%, 40% 30%, 40% 35%, 41.5% 37.5%, 43% 38.75%, 47.5% 40%, 52.5% 40%, 57% 38.75%, 58.5% 37.5%, 60% 35%, 60% 30%, 58.5% 27.5%, 55% 25%, 55% 20%, 80% 20%",
					out: "20% 20%, 45% 20%, 45% 15%, 41.5% 12.5%, 40% 10%, 40% 5%, 41.5% 2.5%, 43% 1.25%, 47.5% 0%, 52.5% 0%, 57% 1.25%, 58.5% 2.5%, 60% 5%, 60% 10%, 58.5% 12.5%, 55% 15%, 55% 20%, 80% 20%",
					flat: "20% 0%, 80% 0%"
				},
				right: {
					in: "80% 20%, 80% 45%, 75% 45%, 72.5% 41.5%, 70% 40%, 65% 40%, 62.5% 41.5%, 61.25% 43%, 60% 47.5%, 60% 52.5%, 61.25% 57%, 62.5% 58.5%, 65% 60%, 70% 60%, 72.5% 58.5%, 75% 55%, 80% 55%, 80% 80%",
					out: "80% 20%, 80% 45%, 85% 45%, 87.5% 41.5%, 90% 40%, 95% 40%, 97.5% 41.5%, 98.75% 43%, 100% 47.5%, 100% 52.5%, 98.75% 57%, 97.5% 58.5%, 95% 60%, 90% 60%, 87.5% 58.5%, 85% 55%, 80% 55%, 80% 80%",
					flat: "100% 20%, 100% 80%"
				},
				bottom: {
					in: "80% 80%, 55% 80%, 55% 75%, 58.5% 72.5%, 60% 70%, 60% 65%, 58.5% 62.5%, 57% 61.25%, 52.5% 60%, 47.5% 60%, 43% 61.25%, 41.5% 62.5%, 40% 65%, 40% 70%, 41.5% 72.5%, 45% 75%, 45% 80%, 20% 80%",
					out: "80% 80%, 55% 80%, 55% 85%, 58.5% 87.5%, 60% 90%, 60% 95%, 58.5% 97.5%, 57% 98.75%, 52.5% 100%, 47.5% 100%, 43% 98.75%, 41.5% 97.5%, 40% 95%, 40% 90%, 41.5% 87.5%, 45% 85%, 45% 80%, 20% 80%",
					flat: "80% 100%, 20% 100%"
				},
				left: {
					in: "20% 80%, 20% 55%, 25% 55%, 27.5% 58.5%, 30% 60%, 35% 60%, 37.5% 58.5%, 38.75% 57%, 40% 52.5%, 40% 47.5%, 38.75% 43%, 37.5% 41.5%, 35% 40%, 30% 40%, 27.5% 41.5%, 25% 45%, 20% 45%, 20% 20%",
					out: "20% 80%, 20% 55%, 15% 55%, 12.5% 58.5%, 10% 60%, 5% 60%, 2.5% 58.5%, 1.25% 57%, 0% 52.5%, 0% 47.5%, 1.25% 43%, 2.5% 41.5%, 5% 40%, 10% 40%, 12.5% 41.5%, 15% 45%, 20% 45%, 20% 20%",
					flat: "0% 80%, 0% 20%"
				},
			},
			imageTypes: ["image/png", "image/jpeg", "image/jpg", "image/gif", "image/webp", "image/bmp", "image/tiff", "image/svg+xml"],
		}

	/* triggers */
		const TRIGGERS = {
			click: "click",
			mousedown: "mousedown",
			mousemove: "mousemove",
			mouseup: "mouseup",
			mouseenter: "mouseenter",
			dragover: "dragover",
			drop: "drop"
		}
		if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
			TRIGGERS.click = "touchstart"
			TRIGGERS.mousedown = "touchstart"
			TRIGGERS.mousemove = "touchmove"
			TRIGGERS.mouseup = "touchend"
			TRIGGERS.mouseenter = "touchmove"
		}

	/* elements */
		const ELEMENTS = {
			variables: document.querySelector("#variables"),
			body: document.body,
			menu: {
				element: document.querySelector("#menu"),
				toggle: document.querySelector("#menu-toggle"),
				form: document.querySelector("#menu-form"),
				type: {
					url: document.querySelector("#menu-type-url"),
					file: document.querySelector("#menu-type-file"),
					random: document.querySelector("#menu-type-random")
				},
				url: document.querySelector("#menu-url"),
				file: document.querySelector("#menu-file"),
				randomLoading: document.querySelector("#menu-random-loading"),
				randomError: document.querySelector("#menu-random-error"),
				x: document.querySelector("#menu-pieces-x"),
				y: document.querySelector("#menu-pieces-y"),
				submit: document.querySelector("#menu-submit")
			},
			puzzle: {
				element: document.querySelector("#puzzle"),
				mat: document.querySelector("#puzzle-mat"),
				solve: document.querySelector("#puzzle-solve"),
				link: document.querySelector("#puzzle-link")
			}
		}

	/* state */
		const STATE = {
			play: false,
			selected: null,
			selectionTime: null,
			previousSelected: null,
			fetchCount: 0,
			settings: {},
			pieces: []
		}

/*** load ***/
	/* getParameters */
		getParameters()
		function getParameters() {
			try {
				// get querystring
					let get = {}
					let querystring = (window.location.search || null)
					if (!querystring) {
						return
					}

				// get parameters
					querystring = querystring.replace("?","").trim().split("&")
					for (let i in querystring) {
						let pair = querystring[i].split("=")
						get[pair[0].toLowerCase().trim()] = pair[1].trim()
					}

				// x and y
					if (get.x && !isNaN(get.x) && get.x > 0) {
						ELEMENTS.menu.x.value = Number(get.x)
					}
					if (get.y && !isNaN(get.y) && get.y > 0) {
						ELEMENTS.menu.y.value = Number(get.y)
					}

				// url
					if (get.url && isURL(get.url)) {
						ELEMENTS.menu.url.value = get.url
						ELEMENTS.menu.type.url.checked = true
					}
			} catch (error) {console.log(error)}
		}

/*** form ***/
	/* changeURL */
		ELEMENTS.menu.url.addEventListener("input", changeURL)
		function changeURL() {
			try {
				// select this option
					ELEMENTS.menu.type.url.checked = true
			} catch (error) {console.log(error)}
		}

	/* changeFile */
		ELEMENTS.menu.file.addEventListener("change", changeFile)
		function changeFile() {
			try {
				// select this option
					ELEMENTS.menu.type.file.checked = true
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
					changeFile()

				// read file
					submitForm(null, file)
			} catch (error) {console.log(error)}
		}


	/* submitForm */
		ELEMENTS.menu.form.addEventListener("submit", submitForm)
		function submitForm(event, droppedFile) {
			try {
				// assume no errors
					let errorCount = 0
					ELEMENTS.menu.url.removeAttribute("invalid")
					ELEMENTS.menu.file.removeAttribute("invalid")
					ELEMENTS.menu.randomLoading.removeAttribute("invalid")
					ELEMENTS.menu.randomError.removeAttribute("invalid")
					ELEMENTS.menu.x.removeAttribute("invalid")
					ELEMENTS.menu.y.removeAttribute("invalid")

				// validate url / file
					let url = ELEMENTS.menu.url.value || null
					let file = droppedFile ? droppedFile : ELEMENTS.menu.file.files ? ELEMENTS.menu.file.files[0] : null
					ELEMENTS.puzzle.link.href = "#"

					let imageType = ELEMENTS.menu.type.url.checked ? "url"
						: ELEMENTS.menu.type.file.checked ? "file"
						: ELEMENTS.menu.type.random.checked ? "random"
						: null
					if (!imageType) {
						errorCount++
					}

					if (imageType == "url" && (!url || !isURL(url))) {
						errorCount++
						ELEMENTS.menu.url.setAttribute("invalid", true)
					}

					if (imageType == "file" && !file) {
						errorCount++
						ELEMENTS.menu.file.setAttribute("invalid", true)
					}

				// validate x & y
					let x = Number(ELEMENTS.menu.x.value) || 0
					let y = Number(ELEMENTS.menu.y.value) || 0
					if (!x) {
						errorCount++
						ELEMENTS.menu.x.setAttribute("invalid", true)
					}
					if (!y) {
						errorCount++
						ELEMENTS.menu.y.setAttribute("invalid", true)
					}

				// validation errors?
					if (errorCount) {
						return
					}

				// settings
					STATE.pieces = []
					STATE.settings = {
						x: x,
						y: y,
						image: null,
						imageType: imageType,
						imageData: imageType == "url" ? url : imageType == "file" ? file : null
					}

				// create puzzle
					getImage()
			} catch (error) {console.log(error)}
		}

	/* getImage */
		function getImage() {
			try {
				// from url
					if (STATE.settings.imageType == "url") {
						STATE.settings.image = new Image
						STATE.settings.image.onload = createPuzzle
						STATE.settings.image.src = STATE.settings.imageData
						return
					}

				// from file
					if (STATE.settings.imageType == "file") {
						let fileReader = new FileReader()
							fileReader.onload = function(event) {
								STATE.settings.image = new Image
								STATE.settings.image.onload = createPuzzle
								STATE.settings.image.src = event.target.result
							}
							fileReader.readAsDataURL(STATE.settings.imageData)
						return
					}

				// random from API
					if (STATE.settings.imageType == "random") {
						// loading
							if (STATE.fetchCount < CONSTANTS.api.fetchLimit) {
								ELEMENTS.menu.randomLoading.setAttribute("invalid", true)
								ELEMENTS.menu.randomError.removeAttribute("invalid")
							}

						// get list of images
							sendGet({
								url: CONSTANTS.api.url
							}, function(listData) {
								// no results
									if (!listData || !listData.results || !listData.results.objectIDs || !listData.results.objectIDs.length) {
										ELEMENTS.menu.randomLoading.removeAttribute("invalid")
										ELEMENTS.menu.randomError.setAttribute("invalid", true)
										getImage()
										return
									}

								// some results
									sendGet({
										url: CONSTANTS.api.url + "/" + chooseRandom(listData.results.objectIDs)
									}, function(individualData) {
										// no image
											if (!individualData || !individualData.results || !(individualData.results.primaryImage || individualData.results.primaryImageSmall)) {
												ELEMENTS.menu.randomLoading.removeAttribute("invalid")
												ELEMENTS.menu.randomError.setAttribute("invalid", true)
												getImage()
												return
											}

										// finally! image
											STATE.settings.imageData = (individualData.results.primaryImage || individualData.results.primaryImageSmall)
											STATE.settings.image = new Image
											STATE.settings.image.onload = createPuzzle
											STATE.settings.image.src = STATE.settings.imageData

										// link
											ELEMENTS.puzzle.link.href = individualData.results.objectURL
											return
									})
							})
						return
					}

			} catch (error) {console.log(error)}
		}

/*** puzzle ***/
	/* createPuzzle */
		function createPuzzle() {
			try {
				// close menu
					ELEMENTS.menu.element.removeAttribute("open")

				// reset fetch count (for API requests)
					STATE.fetchCount = 0

				// get intrinsic dimensions
					let intrinsicWidth = STATE.settings.image.width
					let intrinsicHeight = STATE.settings.image.height
					STATE.settings.imageRatio = intrinsicWidth / intrinsicHeight

				// update styles
					ELEMENTS.variables.innerText = ":root {" + 
						"--puzzle-ratio:" + STATE.settings.imageRatio + "!important;" + 
						"--pieces-x:" + STATE.settings.x + "!important;" + 
						"--pieces-y:" + STATE.settings.y + "!important;" +
						"--puzzle-image: url('" + STATE.settings.image.src + "')" +
					"}"

				// clear pieces
					ELEMENTS.puzzle.mat.innerHTML = ""

				// create pieceEdges
					let pieceEdges = []
					for (let x = 0; x < STATE.settings.x; x++) {
						pieceEdges[x] = []
						for (let y = 0; y < STATE.settings.y; y++) {
							// sides
								let thisPieceSides = {top: null, right: null, bottom: null, left: null}

							// edge
								if (y == 0) {
									thisPieceSides.top = "flat"
								}
								else if (y == STATE.settings.y - 1) {
									thisPieceSides.bottom = "flat"
								}
								if (x == STATE.settings.x - 1) {
									thisPieceSides.right = "flat"
								}
								else if (x == 0) {
									thisPieceSides.left = "flat"
								}

							// left neighbor
								if (pieceEdges[x - 1] && pieceEdges[x - 1][y]) {
									thisPieceSides.left = (pieceEdges[x - 1][y].right == "in" ? "out" : "in")
								}

							// top neighbor
								if (pieceEdges[x] && pieceEdges[x][y - 1]) {
									thisPieceSides.top = (pieceEdges[x][y - 1].bottom == "in" ? "out" : "in")
								}

							// randoms
								for (let s in thisPieceSides) {
									if (!thisPieceSides[s]) {
										thisPieceSides[s] = chooseRandom(["in", "out"])
									}
								}

							// save
								pieceEdges[x][y] = thisPieceSides
						}
					}

				// create pieces at offset
					for (let x = 0; x < STATE.settings.x; x++) {
						for (let y = 0; y < STATE.settings.y; y++) {
							// notches
								let notchPath = CONSTANTS.edges.top[pieceEdges[x][y].top] + ((x == STATE.settings.x - 1 && !y) ? ", 100% 0%, " : ", ")
											+ CONSTANTS.edges.right[pieceEdges[x][y].right] + ((x == STATE.settings.x - 1 && y == STATE.settings.y - 1) ? ", 100% 100%, " : ", ")
											+ CONSTANTS.edges.bottom[pieceEdges[x][y].bottom] + ((!x && y == STATE.settings.y - 1) ? ", 0% 100%, " : ", ")
											+ CONSTANTS.edges.left[pieceEdges[x][y].left] + ((!x && !y) ? ", 0% 0%" : "")

							// create piece
								let piece = document.createElement("div")
									piece.className = "piece"
									piece.setAttribute("x", x)
									piece.setAttribute("y", y)
									piece.style.backgroundPosition =
										"calc(50% + (" + x + " - ((var(--pieces-x) - 1) / 2)) * 100% / (var(--pieces-x) - 1)) " +
										"calc(50% + (" + y + " - ((var(--pieces-y) - 1) / 2)) * 100% / (var(--pieces-y) - 1))"
									piece.addEventListener(TRIGGERS.mousedown, selectPiece)
									piece.style.clipPath = "polygon(" + notchPath + ")"
								STATE.pieces.push(piece)
								ELEMENTS.puzzle.mat.appendChild(piece)

							// randomize piece
								piece.setAttribute("rotation", chooseRandom(CONSTANTS.angles))
								switch (chooseRandom(CONSTANTS.sides)) {
									case "top":
										piece.style.left = "calc(100% / var(--pieces-x) * " + chooseRandom(-1, STATE.settings.x) + ")"
										piece.style.top  = "calc(100% / var(--pieces-y) * -1)"
									break
									case "right":
										piece.style.left = "calc(100% / var(--pieces-x) * " + STATE.settings.x + ")"
										piece.style.top  = "calc(100% / var(--pieces-y) * " + chooseRandom(-1, STATE.settings.y) + ")"
									break
									case "bottom":
										piece.style.left = "calc(100% / var(--pieces-x) * " + chooseRandom(-1, STATE.settings.x) + ")"
										piece.style.top  = "calc(100% / var(--pieces-y) * " + STATE.settings.y + ")"
									break
									case "left":
										piece.style.left = "calc(100% / var(--pieces-x) * -1)"
										piece.style.top  = "calc(100% / var(--pieces-y) * " + chooseRandom(-1, STATE.settings.y) + ")"
									break
								}
						}
					}

				// start
					STATE.play = true
					ELEMENTS.puzzle.element.setAttribute("mode", "play")
			} catch (error) {console.log(error)}
		}

	/* isVictory */
		function isVictory() {
			try {
				// loop through pieces
					for (let i in STATE.pieces) {
						// piece
							let piece = STATE.pieces[i]

						// get rotation
							if (Number(piece.getAttribute("rotation")) !== 0) {
								return false
							}

						// get desired coordinates
							let x = Number(piece.getAttribute("x"))
							let y = Number(piece.getAttribute("y"))

						// get actual coordinates
							let currentX = Number(piece.style.left.replace("calc(100% / var(--pieces-x) * ", "").replace(")", ""))
							let currentY = Number(piece.style.top.replace("calc(100% / var(--pieces-y) * ", "").replace(")", ""))

						// compare
							if (currentX !== x || currentY !== y) {
								return false
							}
					}

				// victory!
					return true
			} catch (error) {console.log(error)}
		}

	/* solvePuzzle */
		ELEMENTS.puzzle.solve.addEventListener("submit", solvePuzzle)
		function solvePuzzle() {
			try {
				// stop playing
					STATE.play = false

				// turn on transitions
					ELEMENTS.puzzle.element.setAttribute("mode", "solve")

				// fake wait
					setTimeout(function() {
						// loop through
							for (let i in STATE.pieces) {
								// get piece
									let piece = STATE.pieces[i]

								// get desired coordinates
									let x = Number(piece.getAttribute("x"))
									let y = Number(piece.getAttribute("y"))

								// set desired coordinates
									piece.style.left = "calc(100% / var(--pieces-x) * " + x + ")"
									piece.style.top  = "calc(100% / var(--pieces-y) * " + y + ")"
									piece.setAttribute("rotation", 0)
							}

						// wait
							setTimeout(function() {
								ELEMENTS.puzzle.element.removeAttribute("mode")
							}, CONSTANTS.fadePause * 2)
					}, 0)
			} catch (error) {console.log(error)}
		}

/*** move piece ***/
	/* selectPiece */
		function selectPiece(event) {
			try {
				// game over?
					if (!STATE.play) {
						return
					}

				// piece already selected?
					if (STATE.selected) {
						return
					}

				// not a piece
					if (event.target.className !== "piece") {
						return
					}

				// select this
					STATE.selected = event.target
					STATE.selected.setAttribute("grabbed", true)
					ELEMENTS.puzzle.element.setAttribute("grabbing", true)

				// get time
					let previousTime = STATE.selectionTime
					STATE.selectionTime = new Date().getTime()
					if (previousTime && STATE.selectionTime - previousTime < CONSTANTS.doubleClickTime) {
						rotatePiece(event)
					}

				// move center to cursor
					movePiece(event)
			} catch (error) {console.log(error)}
		}

	/* movePiece */
		ELEMENTS.puzzle.element.addEventListener(TRIGGERS.mousemove, movePiece)
		function movePiece(event) {
			try {
				// game over?
					if (!STATE.play) {
						return
					}

				// none selected?
					if (!STATE.selected) {
						return
					}

				// get actual coordinates
					let x = (event.targetTouches ? event.targetTouches[0].clientX : event.clientX)
					let y = (event.targetTouches ? event.targetTouches[0].clientY : event.clientY)

				// compensate for puzzle mat
					let matRect = ELEMENTS.puzzle.mat.getBoundingClientRect()

				// move piece to coordinates
					STATE.selected.style.left = (x - matRect.left) + "px"
					STATE.selected.style.top = (y - matRect.top) + "px"
			} catch (error) {console.log(error)}
		}

	/* unselectPiece */
		ELEMENTS.puzzle.element.addEventListener(TRIGGERS.mouseup, unselectPiece)
		function unselectPiece(event) {
			try {
				// game over?
					if (!STATE.play) {
						return
					}

				// none selected?
					if (!STATE.selected) {
						return
					}

				// get current position
					let x = Number(STATE.selected.style.left.replace("px", ""))
					let y = Number(STATE.selected.style.top.replace("px", ""))

				// get puzzle mat
					let matRect = ELEMENTS.puzzle.mat.getBoundingClientRect()

				// get as percentage
					x = x / matRect.width * 100
					y = y / matRect.height * 100

				// get closest percentage
					x = Math.floor(x / (100 / STATE.settings.x))
					y = Math.floor(y / (100 / STATE.settings.y))

				// set position
					STATE.selected.style.left = "calc(100% / var(--pieces-x) * " + x + ")"
					STATE.selected.style.top  = "calc(100% / var(--pieces-y) * " + y + ")"

				// unselect this
					ELEMENTS.puzzle.element.removeAttribute("grabbing")
					STATE.selected.removeAttribute("grabbed")
					STATE.previousSelected = STATE.selected
					STATE.selected = null

				// victory?
					if (isVictory()) {
						STATE.play = false
						ELEMENTS.puzzle.element.removeAttribute("mode")
						setTimeout(function() {
							ELEMENTS.menu.element.setAttribute("open", true)
						}, CONSTANTS.fadePause)
					}
			} catch (error) {console.log(error)}
		}

/*** rotate piece ***/
	/* pressKey */
		document.addEventListener("keyup", pressKey)
		function pressKey(event) {
			try {
				// game over?
					if (!STATE.play) {
						return
					}

				// none selected?
					if (!STATE.selected) {
						return
					}

				// get key
					if (!(event.code == "Space" || event.which == 91)) {
						return
					}

				// rotate
					rotatePiece()
			} catch (error) {console.log(error)}
		}

	/* rotatePiece */
		function rotatePiece(event) {
			try {
				// game over?
					if (!STATE.play) {
						return
					}

				// none selected?
					if (!STATE.selected) {
						return
					}

				// get rotation
					let currentRotation = Number(STATE.selected.getAttribute("rotation"))
					let angleIndex = CONSTANTS.angles.indexOf(currentRotation)
						angleIndex = (angleIndex == CONSTANTS.angles.length - 1 ? 0 : angleIndex + 1)
					STATE.selected.setAttribute("rotation", CONSTANTS.angles[angleIndex])
			} catch (error) {console.log(error)}
		}

/*** tools ***/
	/* generateRandom */
		function generateRandom() {
			try {
				// random 8-character alphanumeric string
					return Math.floor(Math.random() * 1000000000000000000).toString(36).slice(1, 9)
			} catch (error) {console.log(error)}
		}

	/* chooseRandom */
		function chooseRandom(val1, val2) {
			try {
				// array
					if (typeof val2 == "undefined") {
						// not an array
							if (!val1 || !Array.isArray(val1)) {
								return val1
							}

						// random element from list
							return val1[Math.floor(Math.random() * val1.length)]
					}

				// range
					if (typeof val1 == "number" && typeof val2 == "number") {
						return Math.floor(Math.random() * (val2 - val1)) + val1
					}
			} catch (error) {console.log(error)}
		}

	/* isURL */
		function isURL(string) {
			try {
				// try to make a url
					let url = new URL(string)
					return true
			} catch (error) {return false}
		}

	/* sendGet */
		function sendGet(options, callback) {
			try {
				// increase fetch count
					STATE.fetchCount++
					if (STATE.fetchCount > CONSTANTS.api.fetchLimit) {
						callback({success: false, message: "fetch limit reached"})
						return
					}

				// url
					let querystring = []
					if (options.queryParameters) {
						for (let i in options.queryParameters) {
							querystring.push(i + "=" + options.queryParameters[i])
						}
						querystring = querystring.join("&")
					}
					let url = options.url + (querystring && querystring.length ? ("?" + querystring) : "")

				// request
					let request = new XMLHttpRequest()
						request.open("GET", url, true)
						request.onload = function() {
							if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
								// parse response
									let response = JSON.parse(request.response)

								// no results this time
									if (!response) {
										callback({success: false, message: "no response"})
										return
									}

								// done
									callback({success: true, results: response})
							}
						}
						request.send()
			} catch (error) { console.log(error) }
		}
