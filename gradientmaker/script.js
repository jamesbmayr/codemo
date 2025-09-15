/*** globals ***/
	/* triggers */
		const TRIGGERS = {
			"click": "click",
			"mousedown": "mousedown",
			"mousemove": "mousemove",
			"mouseup": "mouseup",
			"input": "input",
			"rightclick": "contextmenu"
		}
		if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
			TRIGGERS.mousedown = "touchstart"
			TRIGGERS.mousemove = "touchmove"
			TRIGGERS.mouseup = "touchend"
		}
		window.addEventListener(TRIGGERS.rightclick, event => event.preventDefault())

	/* elements */
		const ELEMENTS = {
			menu: {
				mode: document.querySelector("#menu-mode"),
				quantize: document.querySelector("#menu-quantize"),
				download: document.querySelector("#menu-download"),
				copy: document.querySelector("#menu-copy"),
				randomize: document.querySelector("#menu-randomize")
			},
			centerer: document.querySelector("#centerer"),
			canvas: document.querySelector("#canvas"),
			context: document.querySelector("#canvas").getContext("2d"),
			controls: {
				element: document.querySelector("#controls"),
				line: {
					element: document.querySelector("#controls-line"),
					circle: document.querySelector("#controls-line-circle"),
					start: document.querySelector("#controls-line-start"),
					end: document.querySelector("#controls-line-end"),
					plus: document.querySelector("#controls-plus-color"),
					colorStops: document.querySelector("#controls-line-color-stops")
				}
			}
		}

	/* constants */
		const CONSTANTS = {
			percent: 100, // %
			circleRadians: Math.PI * 2, // rad
			circleDegrees: 360, // °
			bigNumber: 10e10, // #
			places: 1000, // #
			colors: 256, // rgb
			defaultColorStops: [2, 6], // #
			quantizedRatio: 0.01, // ratio
			quantizedDegrees: 5, // °
			defaultColor: "#ffffff", // hex
			modes: ["linear", "radial", "conic"],
			actionDelay: 1000, // ms
			hashDelay: 100, // ms
			conicRadius: 0.75, // ratio
			borderSize: 5, // px
			svgX: `<svg viewBox="20 20 60 60"><path d="M 50 43 C 55 38 60 33 64 29 C 66 27 69 27 71 29 C 73 31 73 34 71 36 C 67 40 62 45 57 50 C 62 55 67 60 71 64 C 73 66 73 69 71 71 C 69 73 66 73 64 71 C 60 67 55 62 50 57 C 45 62 40 67 36 71 C 34 73 31 73 29 71 C 27 69 27 66 29 64 C 33 60 38 55 43 50 C 38 45 33 40 29 36 C 27 34 27 31 29 29 C 31 27 34 27 36 29 C 40 33 45 38 50 43 Z"></path></svg>`
		}

	/* state */
		const STATE = {
			quantized: false,
			selected: {
				node: null,
				x: null,
				y: null
			},
			gradient: {
				mode: "linear",
				coordinates: {
					degrees: 0,
					x1: -500,
					y1: 0,
					x2: 500,
					y2: 0
				},
				colors: []
			},
			hashWait: null
		}

/*** math ***/
	/* getRandomNumber */
		function getRandomNumber(start, end) {
			try {
				// random number
					const difference = (
						!isNaN(start) && !isNaN(end)
						? end - start
						: CONSTANTS.bigNumber
					)
					return Math.floor(Math.random() * difference) + (start ?? 0)
			} catch (error) {console.log(error)}
		}

	/* getRandomColor */
		function getRandomColor() {
			try {
				// rgb
					const r = getRandomNumber(0, CONSTANTS.colors)
					const g = getRandomNumber(0, CONSTANTS.colors)
					const b = getRandomNumber(0, CONSTANTS.colors)

				// to hexidecimal
					return (
						"#" +
						("00" + r.toString(16)).slice(-2) + 
						("00" + g.toString(16)).slice(-2) + 
						("00" + b.toString(16)).slice(-2)
					)
			} catch (error) {console.log(error)}
		}

	/* roundNumber */
		function roundNumber(n, factor) {
			try {
				// factor
					if (factor) {
						return Math.round(n / factor) * factor
					}

				// round to CONSTANTS.places
					return Math.round(n * CONSTANTS.places) / CONSTANTS.places
			} catch (error) {console.log(error)}
		}

	/* getRadians */
		function getRadians(degrees) {
			try {
				// bound
					degrees = (degrees + CONSTANTS.circleDegrees) % CONSTANTS.circleDegrees

				// convert
					return degrees / CONSTANTS.circleDegrees * CONSTANTS.circleRadians
			} catch (error) {console.log(error)}
		}

	/* getDegrees */
		function getDegrees(radians) {
			try {
				// convert
					const degrees = radians / CONSTANTS.circleRadians * CONSTANTS.circleDegrees

				// bound
					return (degrees + CONSTANTS.circleDegrees) % CONSTANTS.circleDegrees
			} catch (error) {console.log(error)}
		}

	/* getCartesianFromPolar */
		function getCartesianFromPolar(degrees, radius) {
			try {
				// coordinates
					const radians = getRadians(degrees)
					const x = roundNumber(radius * Math.cos(radians))
					const y = roundNumber(radius * Math.sin(radians))

				// return
					return [x, y]
			} catch (error) {console.log(error)}
		}

	/* getEndpointsFromAngle */
		function getEndpointsFromAngle(degrees) {
			try {
				// math
					const radians = getRadians(degrees)
					const canvasRadius = (ELEMENTS.canvas.width / 2)

				// get points r from center
					const startX = -canvasRadius * Math.cos(-radians)
					const startY = -canvasRadius * Math.sin(-radians)

					const endX = canvasRadius * Math.cos(-radians)
					const endY = canvasRadius * Math.sin(-radians)

				// bound
					degrees = roundNumber((degrees + CONSTANTS.circleDegrees) % CONSTANTS.circleDegrees)

				// return
					return {
						degrees: degrees,
						x1: startX,
						y1: startY,
						x2: endX,
						y2: endY
					}
			} catch (error) {console.log(error)}
		}

	/* getCoordinateRatio */
		function getCoordinateRatio(cursorX, cursorY) {
			try {
				// get center
					const centerX = window.innerWidth  / 2
					const centerY = window.innerHeight / 2

				// get relative to center
					const deltaX = cursorX - centerX
					const deltaY = cursorY - centerY

				// current angle
					const commands = ELEMENTS.controls.line.element.style.transform.split(/\s/g)
					const rotateCommand = commands.find(command => command.includes("rotate"))
					const degrees = Number(rotateCommand.replace("rotate(", "").replace("deg)", ""))
					const radians = getRadians(degrees)
				
				// rotate point by reversed angle
					const rotatedX = deltaX * Math.cos(-radians) - deltaY * Math.sin(-radians)
					const rotatedY = deltaX * Math.sin(-radians) + deltaY * Math.cos(-radians)
				
				// relative to length
					const outerBox = ELEMENTS.controls.element.getBoundingClientRect()
					let relativeX =     rotatedX / outerBox.width  * (STATE.gradient.mode == "radial" ? 2 : 1)
					let relativeY =     rotatedY / outerBox.height * (STATE.gradient.mode == "radial" ? 2 : 1)
					let ratioX = Math.min(1, Math.max(0, relativeX + (STATE.gradient.mode == "radial" ? 0 : 1/2)))
					let ratioY = Math.min(1, Math.max(0, relativeY + (STATE.gradient.mode == "radial" ? 0 : 1/2)))

				// return
					return [ratioX, ratioY]
			} catch (error) {console.log(error)}
		}

/*** startup ***/
	/* initializeGradient */
		initializeGradient()
		ELEMENTS.menu.randomize.addEventListener(TRIGGERS.click, initializeGradient)
		function initializeGradient(event) {
			try {
				// hash
					const hash = event ? null : window.location.hash ? window.location.hash.split(";") : null
					if (hash) {
						hash[0] = hash[0].replace("#", "")
					}

				// mode
					STATE.gradient.mode = (
						hash && CONSTANTS.modes.includes(hash[0])
						? hash[0]
						: CONSTANTS.modes[getRandomNumber(0, CONSTANTS.modes.length)]
					)
					ELEMENTS.menu.mode.value = STATE.gradient.mode
					ELEMENTS.controls.element.setAttribute("mode", STATE.gradient.mode)

				// angle
					const degrees = (
						hash && !isNaN(hash[1])
						? Number(hash[1]) % CONSTANTS.circleDegrees
						: getRandomNumber(0, CONSTANTS.circleDegrees)
					)
					ELEMENTS.controls.line.element.style.transform = `translateX(-50%) translateY(-50%) rotate(${ degrees}deg)`
					ELEMENTS.controls.line.plus.style.transform    = `translateX(-50%) translateY(-50%) rotate(${-degrees}deg)`
					STATE.gradient.coordinates = getEndpointsFromAngle(degrees)

				// colorstops
					STATE.gradient.colors = []
					if (hash && hash[2].split(",").length > 0) {
						const condensedColorStops = hash[2].split(",")
						for (const c in condensedColorStops) {
							const parts = condensedColorStops[c].split("@")
							if (!parts || parts.length !== 2) {
								continue
							}
							STATE.gradient.colors.push({
								position: Number(parts[0]),
								hex: `#${parts[1]}`
							})
						}
					}
					else {
						const colorStopCount = getRandomNumber(...CONSTANTS.defaultColorStops)
						for (let c = 0; c < colorStopCount; c++) {
							STATE.gradient.colors.push({
								position: roundNumber(Math.random()),
								hex: getRandomColor()
							})
						}
					}

				// create color stops
					ELEMENTS.controls.line.colorStops.innerHTML = ""
					for (const c in STATE.gradient.colors) {
						buildColorStop(STATE.gradient.colors[c])
					}

				// draw
					drawGradient()
			} catch (error) {console.log(error)}
		}

/*** url ***/
	/* updateHash */
		function updateHash() {
			try {
				// delay
					clearInterval(STATE.hashWait)
					STATE.hashWait = setTimeout(() => {
						// build hash
							const colorStopsString = STATE.gradient.colors.map(color => `${color.position}@${color.hex.replace("#", "")}`).join(",")
							const hashString = `#${STATE.gradient.mode};${STATE.gradient.coordinates.degrees};${colorStopsString}`

						// update
							window.location.hash = hashString
					}, CONSTANTS.hashDelay)
			} catch (error) {console.log(error)}
		}

/*** movement ***/
	/* moveNode */
		window.addEventListener(TRIGGERS.mousemove, moveNode)
		function moveNode(event) {
			try {
				// get coordinates
					let cursorX = (event.touches ? event.touches[0].clientX : event.clientX)
					let cursorY = (event.touches ? event.touches[0].clientY : event.clientY)

				// get center
					const centerX = window.innerWidth  / 2
					const centerY = window.innerHeight / 2

				// get angle from center
					const radians = Math.atan2(cursorY - centerY, cursorX - centerX)
					let degrees = getDegrees(radians)

				// quantized?
					degrees = roundNumber(degrees, STATE.quantized ? CONSTANTS.quantizedDegrees : null)
				
				// conic coordinates must be on the circle
					if (STATE.gradient.mode == "conic") {
						const outerBox = ELEMENTS.controls.element.getBoundingClientRect()
						const outerBoxRadius = (outerBox.width  / 2)
						cursorX = outerBox.x + outerBoxRadius + (outerBoxRadius * CONSTANTS.conicRadius * Math.cos(radians))
						cursorY = outerBox.y + outerBoxRadius + (outerBoxRadius * CONSTANTS.conicRadius * Math.sin(radians))
					}

				// get ratio
					let [ratioX, ratioY] = getCoordinateRatio(cursorX, cursorY)

				// quantized?
					if (STATE.gradient.mode !== "conic") {
						ratioX = roundNumber(ratioX, STATE.quantized ? CONSTANTS.quantizedRatio : null)
						ratioY = roundNumber(ratioY, STATE.quantized ? CONSTANTS.quantizedRatio : null)
					}

				// move plus
					ELEMENTS.controls.line.plus.style.left    = (ratioX * CONSTANTS.percent) + "%"
					if (STATE.gradient.mode == "conic") {
						ELEMENTS.controls.line.plus.style.top = (ratioY * CONSTANTS.percent) + "%"
					}

				// nothing selected?
					if (!STATE.selected.node) {
						return
					}
					const id = STATE.selected.node.id

				// rotate
					if (id.split("-")[1] == "line") {
						// start is 180 degrees away
							if (id.split("-")[2] == "start") {
								degrees = roundNumber((degrees + CONSTANTS.circleDegrees / 2) % CONSTANTS.circleDegrees)
							}

						// rotate
							rotateGradient(degrees)
							return
					}
				
				// slide
					if (id.split("-")[1] == "color") {
						degrees = roundNumber((degrees - STATE.gradient.coordinates.degrees + CONSTANTS.circleDegrees) % CONSTANTS.circleDegrees)
						slideColorStop(ratioX, degrees)
						return
					}
			} catch (error) {console.log(error)}
		}

	/* unselectNode */
		window.addEventListener(TRIGGERS.mouseup, unselectNode)
		function unselectNode(event) {
			try {
				// nothing selected
					if (!STATE.selected.node) {
						return
					}

				// unselect
					STATE.selected.node.removeAttribute("selected")
					STATE.selected.node = null
					STATE.selected.x = null
					STATE.selected.y = null

				// change grab
					ELEMENTS.centerer.removeAttribute("selection")
			} catch (error) {console.log(error)}
		}

/*** line ***/
	/* selectRotator */
		ELEMENTS.controls.line.start.addEventListener(TRIGGERS.mousedown, selectRotator)
		ELEMENTS.controls.line.end.addEventListener(TRIGGERS.mousedown, selectRotator)
		function selectRotator(event) {
			try {
				// something else selected
					if (STATE.selected.node) {
						return
					}

				// get coordinates
					const cursorX = (event.touches ? event.touches[0].clientX : event.clientX)
					const cursorY = (event.touches ? event.touches[0].clientY : event.clientY)
					const id = event.target.id

				// set state
					STATE.selected.node = event.target
					STATE.selected.node.setAttribute("selected", true)
					STATE.selected.x = cursorX
					STATE.selected.y = cursorY

				// change grab
					ELEMENTS.centerer.setAttribute("selection", id.split("-")[1])
			} catch (error) {console.log(error)}
		}

	/* rotateGradient */
		function rotateGradient(degrees) {
			try {
				// rotate line
					ELEMENTS.controls.line.element.style.transform = `translateX(-50%) translateY(-50%) rotate(${degrees}deg)`

				// unrotate colorstops
					const colorStops = Array.from(ELEMENTS.controls.line.colorStops.children)
					for (const c in colorStops) {
						colorStops[c].style.transform = `translateX(-50%) translateY(-50%) rotate(${-degrees}deg)`
					}

				// unrotate plus
					ELEMENTS.controls.line.plus.style.transform = `translateX(-50%) translateY(-50%) rotate(${-degrees}deg)`

				// update gradient
					STATE.gradient.coordinates = getEndpointsFromAngle(degrees)
				
				// redraw
					drawGradient()
			} catch(error) {console.log(error)}
		}

	/* plusColor */
		ELEMENTS.controls.line.plus.addEventListener(TRIGGERS.mousedown, plusColor)
		function plusColor(event) {
			try {
				// something selected
					if (STATE.selected.node) {
						return
					}

				// not on nodes
					if (event.target !== ELEMENTS.controls.line.plus) {
						event.stopPropagation()
						return
					}

				// get plus box
					const plusBox = ELEMENTS.controls.line.plus.getBoundingClientRect()
					const cursorX = plusBox.x + (plusBox.width  / 2)
					const cursorY = plusBox.y + (plusBox.height / 2)

				// get center
					const controlsBox = ELEMENTS.controls.element.getBoundingClientRect()
					const centerX = controlsBox.x + (controlsBox.width  / 2)
					const centerY = controlsBox.y + (controlsBox.height / 2)

				// get coordinates
					const radians = Math.atan2(cursorY - centerY, cursorX - centerX)
					let degrees = getDegrees(radians)
						degrees = (degrees - STATE.gradient.coordinates.degrees + CONSTANTS.circleDegrees) % CONSTANTS.circleDegrees
					let [ratioX, ratioY] = getCoordinateRatio(cursorX, cursorY)

				// quantized
					degrees = roundNumber(degrees, STATE.quantized ? CONSTANTS.quantizedDegrees : null)
					ratioX  = roundNumber(ratioX,  STATE.quantized ? CONSTANTS.quantizedRatio   : null)
					ratioY  = roundNumber(ratioY,  STATE.quantized ? CONSTANTS.quantizedRatio   : null)

				// new gradient
					STATE.gradient.colors.push({
						position: 
							STATE.gradient.mode == "conic"
							? degrees / CONSTANTS.circleDegrees
							: ratioX,
						hex: CONSTANTS.defaultColor
					})

				// add element
					buildColorStop(STATE.gradient.colors[STATE.gradient.colors.length - 1])

				// redraw
					drawGradient()
			} catch (error) {console.log(error)}
		}

/*** colorStops ***/
	/* buildColorStop */
		function buildColorStop(data) {
			try {
				// container
					const colorStop = document.createElement("div")
						colorStop.id = `controls-color-${getRandomNumber()}`
						colorStop.className = "color-stop"
						colorStop.style.transform = `translateX(-50%) translateY(-50%) rotate(${-STATE.gradient.coordinates.degrees}deg)`
						colorStop.addEventListener(TRIGGERS.mousedown, selectColorStop)
					ELEMENTS.controls.line.colorStops.appendChild(colorStop)

					// position
						if (STATE.gradient.mode == "conic") {
							const adjustedDegrees = (data.position * CONSTANTS.circleDegrees)
							const [x, y] = getCartesianFromPolar(adjustedDegrees, CONSTANTS.conicRadius)
							colorStop.style.left = (CONSTANTS.percent / 2) + (x * CONSTANTS.percent / 2) + "%"
							colorStop.style.top  = (CONSTANTS.percent / 2) + (y * CONSTANTS.percent / 2) + "%"
						}
						else {
							colorStop.style.left = (data.position * CONSTANTS.percent) + "%"
						}

				// input
					const colorInput = document.createElement("input")
						colorInput.type = "color"
						colorInput.value = data.hex || CONSTANTS.defaultColor
						colorInput.addEventListener(TRIGGERS.input, changeColorStop)
					colorStop.appendChild(colorInput)

				// delete
					const colorDelete = document.createElement("button")
						colorDelete.innerHTML = CONSTANTS.svgX
						colorDelete.addEventListener(TRIGGERS.click, deleteColorStop)
					colorStop.appendChild(colorDelete)
			} catch (error) {console.log(error)}
		}

	/* deleteColorStop */
		function deleteColorStop(event) {
			try {
				// get enclosing colorstop
					const parent = event.target.closest(".color-stop")
					const colorStops = Array.from(ELEMENTS.controls.line.colorStops.children)
					const index = colorStops.indexOf(parent)

				// delete parent
					parent.remove()

				// remove from list
					STATE.gradient.colors.splice(index, 1)

				// redraw gradient
					drawGradient()
			} catch (error) {console.log(error)}
		}

	/* changeColorStop */
		function changeColorStop(event) {
			try {
				// get color
					const color = event.target.value
					if (!color) {
						return
					}

				// get enclosing colorstop
					const parent = event.target.closest(".color-stop")
					const allColorStops = Array.from(ELEMENTS.controls.line.colorStops.children)
					const index = allColorStops.indexOf(parent)

				// update color
					STATE.gradient.colors[index].hex = color

				// redraw gradient
					drawGradient()
			} catch (error) {console.log(error)}
		}

	/* selectColorStop */
		function selectColorStop(event) {
			try {
				// something else selected
					if (STATE.selected.node) {
						return
					}

				// get coordinates
					const cursorX = (event.touches ? event.touches[0].clientX : event.clientX)
					const cursorY = (event.touches ? event.touches[0].clientY : event.clientY)
					const id = event.target.closest(".color-stop").id

				// set state
					STATE.selected.node = event.target.closest(".color-stop")
					STATE.selected.node.setAttribute("selected", true)
					STATE.selected.x = cursorX
					STATE.selected.y = cursorY

				// change grab
					ELEMENTS.centerer.setAttribute("selection", id.split("-")[1])
			} catch (error) {console.log(error)}
		}

	/* slideColorStop */
		function slideColorStop(ratioX, degrees) {
			try {
				// get enclosing colorstop
					const parent = STATE.selected.node.closest(".color-stop")
					const colorStops = Array.from(ELEMENTS.controls.line.colorStops.children)
					const index = colorStops.indexOf(parent)

				// move & update
					if (STATE.gradient.mode == "conic") {
						STATE.gradient.colors[index].position = (degrees / CONSTANTS.circleDegrees)
						const [x, y] = getCartesianFromPolar(degrees, CONSTANTS.conicRadius)
						STATE.selected.node.style.left = (CONSTANTS.percent / 2) + (x * CONSTANTS.percent / 2) + "%"
						STATE.selected.node.style.top  = (CONSTANTS.percent / 2) + (y * CONSTANTS.percent / 2) + "%"
					}
					else {
						STATE.gradient.colors[index].position = ratioX
						STATE.selected.node.style.left = `${ratioX * CONSTANTS.percent}%`
					}

				// redraw
					drawGradient()
			} catch (error) {console.log(error)}
		}

/*** menu ***/
	/* toggleQuantization */
		ELEMENTS.menu.quantize.addEventListener(TRIGGERS.click, toggleQuantization)
		function toggleQuantization(event) {
			try {
				// already quantized
					if (STATE.quantized) {
						STATE.quantized = false
						ELEMENTS.menu.quantize.removeAttribute("check")
						return
					}

				// quantize
					STATE.quantized = true
					ELEMENTS.menu.quantize.setAttribute("check", true)
			} catch (error) {console.log(error)}
		}

	/* downloadPNG */
		ELEMENTS.menu.download.addEventListener(TRIGGERS.click, downloadPNG)
		function downloadPNG(event) {
			try {
				// check
					ELEMENTS.menu.download.setAttribute("check", true)

				// get current image
					const data = ELEMENTS.canvas.toDataURL("image/png")

				// download link
					const downloadLink = document.createElement("a")
						downloadLink.setAttribute("href", data)
						downloadLink.setAttribute("download", "gradientMaker_" + (new Date().getTime()) + ".png")

				// download
					downloadLink.click()
					setTimeout(() => { downloadLink.remove() }, 0)
					ELEMENTS.menu.download.blur()

				// uncheck
					setTimeout(() => {
						ELEMENTS.menu.download.removeAttribute("check")
					}, CONSTANTS.actionDelay)
			} catch (error) {console.log(error)}
		}

	/* copyCSS */
		ELEMENTS.menu.copy.addEventListener(TRIGGERS.click, copyCSS)
		function copyCSS(event) {
			try {
				// check
					ELEMENTS.menu.copy.setAttribute("check", true)

				// copy to clipboard
					navigator.clipboard.writeText(buildGradientText())

				// uncheck
					setTimeout(() => {
						ELEMENTS.menu.copy.removeAttribute("check")
					}, CONSTANTS.actionDelay)
			} catch (error) {console.log(error)}
		}

	/* buildGradientText */
		function buildGradientText() {
			try {
				// gradient text
					let gradientText = ""
					const colorStops = STATE.gradient.colors.slice().sort((a, b) => {
						return a.position - b.position
					})

				// linear
					if (STATE.gradient.mode == "linear") {
						const rotatedDegrees = roundNumber(STATE.gradient.coordinates.degrees + (CONSTANTS.circleDegrees / 4)) // CSS is sideways
						const colorStopsString = colorStops.map(color => `${color.hex} ${roundNumber(color.position * CONSTANTS.percent)}%`).join(", ")
						gradientText = `linear-gradient(${rotatedDegrees}deg, ${colorStopsString})`
					}

				// radial
					else if (STATE.gradient.mode == "radial") {
						const colorStopsString = colorStops.map(color => `${color.hex} ${roundNumber(color.position * CONSTANTS.percent)}%`).join(", ")
						gradientText = `radial-gradient(${colorStopsString})`
					}

				// conic
					else if (STATE.gradient.mode == "conic") {
						const rotatedDegrees = roundNumber(STATE.gradient.coordinates.degrees + (CONSTANTS.circleDegrees / 4)) // CSS is sideways
						const colorStopsString = colorStops.map(color => `${color.hex} ${roundNumber(color.position * CONSTANTS.circleDegrees)}deg`).join(", ")
						gradientText = `conic-gradient(from ${rotatedDegrees}deg, ${colorStopsString})`
					}

				// return
					return gradientText || ""
			} catch (error) {console.log(error)}
		}

	/* changeMode */
		ELEMENTS.menu.mode.addEventListener(TRIGGERS.input, changeMode)
		function changeMode(event) {
			try {
				// update state
					STATE.gradient.mode = ELEMENTS.menu.mode.value
					ELEMENTS.controls.element.setAttribute("mode", STATE.gradient.mode)

				// destroy & rebuild
					const colorStops = Array.from(ELEMENTS.controls.line.colorStops.children)
					for (const c in colorStops) {
						colorStops[c].remove()
					}

					for (const c in STATE.gradient.colors) {
						buildColorStop(STATE.gradient.colors[c])
					}

				// redisplay
					drawGradient()
			} catch (error) {console.log(error)}
		}

/*** assetManager ***/
	/* storeAsset */
		window.ASSETS_J.storeAsset = async function(type) {
			try {
				// css
					if (type == "css") {
						return {
							name: "gradientMaker_" + (new Date().getTime()) + ".css",
							type: "css",
							data: `#element { background: ${buildGradientText()}; }`
						}
					}

				// png
					if (type == "png") {
						return {
							name: "gradientMaker_" + (new Date().getTime()) + ".png",
							type: "png",
							data: ELEMENTS.canvas.toDataURL("image/png")
						}
					}
			} catch (error) {console.log(error)}
		}

/*** canvas ***/
	/* clearCanvas */
		function clearCanvas() {
			try {
				// clearRect
					ELEMENTS.context.clearRect(0, 0, ELEMENTS.canvas.width, ELEMENTS.canvas.height)
			} catch (error) {console.log(error)}
		}

	/* drawGradient */
		function drawGradient() {
			try {
				// update hash
					updateHash()

				// clear
					clearCanvas()
				
				// gradient
					let gradient = null
					const centerX = (ELEMENTS.canvas.width / 2)
					const centerY = (ELEMENTS.canvas.height / 2)

				// linear
					if (STATE.gradient.mode == "linear") {
						gradient = ELEMENTS.context.createLinearGradient(
							 STATE.gradient.coordinates.x1 + centerX, // x1
							-STATE.gradient.coordinates.y1 + centerY, // y1
							 STATE.gradient.coordinates.x2 + centerX, // x2
							-STATE.gradient.coordinates.y2 + centerY, // y2
						)
						for (const color of STATE.gradient.colors) {
							gradient.addColorStop(color.position, color.hex)
						}
					}

				// radial
					else if (STATE.gradient.mode == "radial") {
						gradient = ELEMENTS.context.createRadialGradient(
							centerX,              // x1
							centerY,              // y1
							0,                    // r1
							centerX,              // x2
							centerY,              // y2
							ELEMENTS.canvas.width // r2
						)
						for (const color of STATE.gradient.colors) {
							gradient.addColorStop(color.position / 2, color.hex)
						}
					}

				// conic
					else if (STATE.gradient.mode == "conic") {
						const radians = getRadians(STATE.gradient.coordinates.degrees)
						gradient = ELEMENTS.context.createConicGradient(
							radians, // angle
							centerX, // x1
							centerY  // y1
						)
						for (const color of STATE.gradient.colors) {
							gradient.addColorStop(color.position, color.hex)
						}
					}

				// fill
					ELEMENTS.context.fillStyle = gradient
					ELEMENTS.context.fillRect(0, 0, ELEMENTS.canvas.width, ELEMENTS.canvas.height)
			} catch (error) {console.log(error)}
		}
