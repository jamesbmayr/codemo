/*** globals ***/
	/* triggers */
		const TRIGGERS = {
			resize: "resize",
			focus: "focus",
			blur: "blur",
			input: "input",
			change: "change",
			click: "click",
			press: "mousedown",
			move: "mousemove",
			lift: "mouseup",
			dragover: "dragover",
			drop: "drop"
		}
		if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
			TRIGGERS.click = "touchstart"
			TRIGGERS.press = "touchstart"
			TRIGGERS.move  = "touchmove"
			TRIGGERS.lift  = "touchend"
		}

	/* elements */
		const ELEMENTS = {
			stampStyling: document.querySelector("#stamp-styling"),
			canvas: document.querySelector("#canvas"),
			context: document.querySelector("#canvas").getContext("2d"),
			cursorStamp: document.querySelector("#cursor-stamp"),
			cursorStampPath: document.querySelector("#cursor-stamp-path"),
			tools: {
				undo: document.querySelector("#tools-undo"),
				redo: document.querySelector("#tools-redo"),
				download: document.querySelector("#tools-download"),
				background: document.querySelector("#tools-background"),
				backgroundColor: document.querySelector("#tools-background-color"),
				backgroundImage: document.querySelector("#tools-background-image"),
				eraser: document.querySelector("#tools-eraser"),
				eraserSize: document.querySelector("#tools-eraser-size"),
				brush: document.querySelector("#tools-brush"),
				brushSize: document.querySelector("#tools-brush-size"),
				brushColor: document.querySelector("#tools-brush-color"),
				brushOpacity: document.querySelector("#tools-brush-opacity"),
				stamp: document.querySelector("#tools-stamp"),
				stampSize: document.querySelector("#tools-stamp-size"),
				stampColor: document.querySelector("#tools-stamp-color"),
				stampOpacity: document.querySelector("#tools-stamp-opacity"),
				stampRotate: document.querySelector("#tools-stamp-rotate"),
				stampRotation: document.querySelector("#tools-stamp-rotation"),
				stampXFlip: document.querySelector("#tools-stamp-xflip"),
				stampYFlip: document.querySelector("#tools-stamp-yflip"),
				stampSearch: document.querySelector("#tools-stamp-search"),
				stampIcon: document.querySelector("#tools-stamp-icon"),
				stampIconPath: document.querySelector("#tools-stamp-icon-path"),
				stampResults: document.querySelector("#tools-stamp-results"),
				stampPath: document.querySelector("#tools-stamp-path")
			}
		}
	
	/* constants */
		const CONSTANTS = {
			circleDegrees: 360, // degrees
			circleRadians: Math.PI * 2, // radians
			rotationDegrees: 90, // degrees
			customSVGname: "* custom *",
			svgSize: "0 0 100 100", // svg units
			tools: ["eraser", "brush", "stamp"],
			imageTypes: ["image/png", "image/jpeg", "image/jpg", "image/gif", "image/webp", "image/bmp", "image/tiff", "image/svg+xml"],
			canvasSize: 1000, // canvas px
			defaultBackground: "#ffffff", // hex
			historyLimit: 100, // states
		}

	/* state */
		const STATE = {
			tool: "stamp",
			background: {
				image: null,
				color: "#ffffff"
			},
			eraser: {
				size: 20,
			},
			brush: {
				size: 20,
				color: "#725dc1",
				opacity: 1,
			},
			stamp: {
				name: "",
				path: "",
				size: 100,
				color: "#379494",
				opacity: 1,
				rotation: 0,
				xflip: 1,
				yflip: 1,
				svg: null
			},
			pressing: false,
			path: [],
			historyIndex: -1,
			history: []
		}

/*** helpers ***/
	/* loadPage */
		loadPage()
		function loadPage() {
			try {
				// random icon
					const name = chooseRandom(Object.keys(SVG.icons))
					const path = SVG.icons[name]

				// set values
					STATE.stamp.name = name
					STATE.stamp.path = path

				// set search bar
					ELEMENTS.tools.stampSearch.value = STATE.stamp.name.replace(/-/g, " ")
					ELEMENTS.tools.stampPath.value = STATE.stamp.path

				// set canvas
					ELEMENTS.canvas.setAttribute("tool", STATE.tool)

				// set CSS
					setStampCSS()
					updateSearch()

				// draw
					drawBackground()

				// save
					appendHistory()
			} catch (error) {console.log(error)}
		}

	/* chooseRandom */
		function chooseRandom(list) {
			try {
				// not an array
					if (!Array.isArray(list)) {
						return list
					}

				// random item
					return list[Math.floor(Math.random() * list.length)]
			} catch (error) {console.log(error)}
		}

	/* convertColor */
		function convertColor(hex, opacity) {
			try {
				// rgb
					const red   = parseInt(hex.slice(1, 3), 16)
					const green = parseInt(hex.slice(3, 5), 16)
					const blue  = parseInt(hex.slice(5, 7), 16)

				// rgba
					return `rgba(${red}, ${green}, ${blue}, ${opacity})`
			} catch (error) {console.log(error)}
		}

	/* getCanvasCoordinates */
		function getCanvasCoordinates({x, y}) {
			try {
				// get canvas
					const canvasRect   = ELEMENTS.canvas.getBoundingClientRect()
					const canvasLeft   = canvasRect.left
					const canvasTop    = canvasRect.top
					const canvasWidth  = canvasRect.width
					const canvasHeight = canvasRect.height

				// convert
					const canvasX = CONSTANTS.canvasSize * (x - canvasLeft) / canvasWidth
					const canvasY = CONSTANTS.canvasSize * (y - canvasTop) / canvasHeight

				// return
					return {
						x: canvasX,
						y: canvasY
					}
			} catch (error) {console.log(error)}
		}

	/* setStampCSS */
		window.addEventListener(TRIGGERS.resize, setStampCSS)
		function setStampCSS() {
			try {
				// get canvas rect
					const canvasRect = ELEMENTS.canvas.getBoundingClientRect()
					const canvasSize = Math.max(canvasRect.width, canvasRect.height)
					const stampSize = STATE.stamp.size * canvasSize / CONSTANTS.canvasSize

				// update
					ELEMENTS.stampStyling.innerHTML = `:root {\n` +
													`\t--stamp-color: ${STATE.stamp.color};\n` +
													`\t--stamp-opacity: ${STATE.stamp.opacity};\n` +
													`\t--stamp-size: ${stampSize}px;\n` +
													`\t--stamp-rotation: rotate(${STATE.stamp.rotation}deg);\n` +
													`\t--stamp-flip: scaleX(${STATE.stamp.xflip}) scaleY(${STATE.stamp.yflip});\n` +
													`}`
					ELEMENTS.cursorStampPath.setAttribute("d", STATE.stamp.path)
					ELEMENTS.tools.stampIconPath.setAttribute("d", STATE.stamp.path)

				// image
					STATE.stamp.svg = new Image()
					STATE.stamp.svg.src = `data:image/svg+xml,<svg version='1.1' xmlns='http://www.w3.org/2000/svg' viewBox='${CONSTANTS.svgSize}'>` + 
											`<path d='${STATE.stamp.path}' fill='${encodeURIComponent(STATE.stamp.color)}' opacity='${STATE.stamp.opacity}'></path>` + 
										`</svg>`
			} catch (error) {console.log(error)}
		}

/*** tools ***/
	/* resetBackground */
		ELEMENTS.tools.background.addEventListener(TRIGGERS.click, resetBackground)
		function resetBackground(event) {
			try {
				// clear image
					STATE.background.image = null
					STATE.background.color = CONSTANTS.defaultBackground
					ELEMENTS.tools.backgroundColor.value = STATE.background.color

				// draw
					drawBackground()

				// save history
					appendHistory()
			} catch (error) {console.log(error)}
		}

	/* changeBackground */
		ELEMENTS.tools.backgroundColor.addEventListener(TRIGGERS.change, changeBackground)
		function changeBackground(event) {
			try {
				// set background
					STATE.background.image = null
					STATE.background.color = event.target.value

				// draw
					drawBackground()

				// save history
					appendHistory()
			} catch (error) {console.log(error)}
		}

	/* selectTool */
		ELEMENTS.tools.eraser.addEventListener(TRIGGERS.click, selectTool)
		ELEMENTS.tools.brush.addEventListener(TRIGGERS.click, selectTool)
		ELEMENTS.tools.stamp.addEventListener(TRIGGERS.click, selectTool)
		function selectTool(event, toolName) {
			try {
				// get button
					const button = event ? event.target.closest("button") : ELEMENTS.tools[toolName]

				// set state
					STATE.tool = button.value

				// set button states
					for (const t in CONSTANTS.tools) {
						if (CONSTANTS.tools[t] == STATE.tool) {
							ELEMENTS.tools[CONSTANTS.tools[t]].setAttribute("active", true)
						}
						else {
							ELEMENTS.tools[CONSTANTS.tools[t]].removeAttribute("active")
						}
					}

				// set canvas
					ELEMENTS.canvas.setAttribute("tool", STATE.tool)
			} catch (error) {console.log(error)}
		}

	/* updateSetting */
		ELEMENTS.tools.backgroundColor.addEventListener(TRIGGERS.input, updateSetting)
		ELEMENTS.tools.eraserSize.addEventListener(TRIGGERS.input, updateSetting)
		ELEMENTS.tools.brushSize.addEventListener(TRIGGERS.input, updateSetting)
		ELEMENTS.tools.brushColor.addEventListener(TRIGGERS.input, updateSetting)
		ELEMENTS.tools.brushOpacity.addEventListener(TRIGGERS.input, updateSetting)
		ELEMENTS.tools.stampSize.addEventListener(TRIGGERS.input, updateSetting)
		ELEMENTS.tools.stampColor.addEventListener(TRIGGERS.input, updateSetting)
		ELEMENTS.tools.stampOpacity.addEventListener(TRIGGERS.input, updateSetting)
		ELEMENTS.tools.stampRotation.addEventListener(TRIGGERS.input, updateSetting)
		ELEMENTS.tools.stampXFlip.addEventListener(TRIGGERS.input, updateSetting)
		ELEMENTS.tools.stampYFlip.addEventListener(TRIGGERS.input, updateSetting)
		function updateSetting(event) {
			try {
				// get input
					const input = event.target.closest("input")
					const idComponents = input.id.split("-")

				// get info
					const tool = idComponents[1]
					const attribute = idComponents[2]

				// set value
					if (input.type == "range" || input.type == "number") {
						STATE[tool][attribute] = Number(input.value)
					}
					else if (attribute == "xflip" || attribute == "yflip") {
						STATE[tool][attribute] = input.checked ? -1 : 1
					}
					else {
						STATE[tool][attribute] = input.value
					}

				// opacity
					if (attribute == "opacity") {
						if (tool == "brush") {
							ELEMENTS.tools.brushColor.style.opacity = STATE.brush.opacity
						}
						else if (tool == "stamp") {
							ELEMENTS.tools.stampColor.style.opacity = STATE.stamp.opacity
						}
					}

				// set tool
					if (tool !== "background") {
						selectTool(null, tool)
					}

				// background
					if (tool == "background" && attribute == "color") {
						drawBackground()
						return
					}

				// stamp
					if (tool == "stamp") {
						setStampCSS()
						return
					}
			} catch (error) {console.log(error)}
		}

	/* revertSearch */
		ELEMENTS.tools.stampSearch.addEventListener(TRIGGERS.blur, revertSearch)
		function revertSearch(event) {
			try {
				setTimeout(() => {
					// still within search
						if (document.activeElement && document.activeElement.closest("#tools-section-stamp")) {
							return
						}
						if (event.target && event.target.closest("#tools-section-stamp")) {
							return
						}

					// clicking away
						ELEMENTS.tools.stampSearch.value = STATE.stamp.name.replace(/-/g, " ")
						ELEMENTS.tools.stampResults.innerHTML = ""
						ELEMENTS.tools.stampResults.removeAttribute("visible", true)
				}, 0)
			} catch (error) {console.log(error)}
		}

	/* updateSearch */
		ELEMENTS.tools.stampIcon.addEventListener(TRIGGERS.click, updateSearch)
		ELEMENTS.tools.stampSearch.addEventListener(TRIGGERS.focus, updateSearch)
		ELEMENTS.tools.stampSearch.addEventListener(TRIGGERS.input, updateSearch)
		function updateSearch(event) {
			try {
				// not yet searching
					if (!ELEMENTS.tools.stampResults.getAttribute("visible")) {
						ELEMENTS.tools.stampSearch.value = ""
						ELEMENTS.tools.stampSearch.focus()
						ELEMENTS.tools.stampResults.setAttribute("visible", true)
					}

				// redo search
					ELEMENTS.tools.stampResults.innerHTML = ""

				// search
					const search = ELEMENTS.tools.stampSearch.value.toLowerCase().trim().replace(/-/g, " ")
					const iconKeys = search ? 
						Object.keys(SVG.icons).filter(key => key.trim().toLowerCase().replace(/-/g, " ").includes(search)) : 
						Object.keys(SVG.icons)

				// results
					for (const k in iconKeys) {
						const path = SVG.icons[iconKeys[k]]
						const iconHTML = `<svg viewBox="${CONSTANTS.svgSize}"><path d="${path}"></path></svg>`

						const result = document.createElement("button")
							result.className = "tools-stamp-result"
							result.title = iconKeys[k].replace(/-/g, " ")
							result.value = iconKeys[k]
							result.innerHTML = iconHTML
							result.addEventListener(TRIGGERS.click, updateStamp)
							result.addEventListener(TRIGGERS.blur, revertSearch)
						ELEMENTS.tools.stampResults.appendChild(result)
					}
			} catch (error) {console.log(error)}
		}

	/* updateStamp */
		function updateStamp(event) {
			try {
				// select icon
					const name = event.target.closest(".tools-stamp-result").value

				// in SVG?
					const path = SVG.icons[name]
					if (!path) {
						return
					}

				// set values
					STATE.stamp.name = name
					STATE.stamp.path = path

				// set search bar
					ELEMENTS.tools.stampSearch.value = STATE.stamp.name.replace(/-/g, " ")
					ELEMENTS.tools.stampResults.innerHTML = ""
					ELEMENTS.tools.stampResults.removeAttribute("visible")
					ELEMENTS.tools.stampPath.value = STATE.stamp.path
					selectTool(null, "stamp")

				// set CSS
					setStampCSS()
			} catch (error) {console.log(error)}
		}

	/* updatePath */
		ELEMENTS.tools.stampPath.addEventListener(TRIGGERS.input, updatePath)
		function updatePath(event) {
			try {
				// get path
					STATE.stamp.name = CONSTANTS.customSVGname
					STATE.stamp.path = ELEMENTS.tools.stampPath.value

				// update search
					ELEMENTS.tools.stampSearch.value = CONSTANTS.customSVGname
					selectTool(null, "stamp")

				// set CSS
					setStampCSS()
			} catch (error) {console.log(error)}
		}

	/* rotateStamp */
		ELEMENTS.tools.stampRotate.addEventListener(TRIGGERS.click, rotateStamp)
		function rotateStamp(event) {
			try {
				// get new rotation
					STATE.stamp.rotation = ((STATE.stamp.rotation + CONSTANTS.rotationDegrees) + CONSTANTS.circleDegrees) % CONSTANTS.circleDegrees
				
				// update slider
					ELEMENTS.tools.stampRotation.value = STATE.stamp.rotation

				// set CSS
					setStampCSS()
			} catch (error) {console.log(error)}
		}

/*** file ***/
	/* uploadImage */
		ELEMENTS.tools.backgroundImage.addEventListener(TRIGGERS.input, uploadImage)
		function uploadImage(event) {
			try {
				// file
					const file = ELEMENTS.tools.backgroundImage.files[0]
					if (!file) {
						return
					}
					if (!CONSTANTS.imageTypes.includes(file.type)) {
						return
					}

				// read file
					const reader = new FileReader()
						reader.onload = event => {
							const image = new Image()
								image.onload = () => {
									STATE.background.image = image
									drawBackground(image)
									appendHistory()
								}
								image.src = event.target.result
							ELEMENTS.tools.backgroundImage.value = null
							ELEMENTS.tools.backgroundImage.blur()
						}
						reader.readAsDataURL(file)
			} catch (error) {console.log(error)}
		}

	/* dragImage */
		ELEMENTS.canvas.addEventListener(TRIGGERS.dragover, dragImage)
		function dragImage(event) {
			try {
				event.preventDefault()
			} catch (error) {console.log(error)}
		}

	/* dropImage */
		ELEMENTS.canvas.addEventListener(TRIGGERS.drop, dropImage)
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

				// read file
					const reader = new FileReader()
						reader.onload = event => {
							const image = new Image()
								image.onload = () => {
									STATE.background.image = image
									drawBackground(image)
									appendHistory()
								}
								image.src = event.target.result
							ELEMENTS.tools.backgroundImage.value = null
							ELEMENTS.tools.backgroundImage.blur()
						}
						reader.readAsDataURL(file)
			} catch (error) {console.log(error)}
		}

	/* downloadImage */
		ELEMENTS.tools.download.addEventListener(TRIGGERS.click, downloadImage)
		function downloadImage(event) {
			try {
				//  package up
					const exportLink = document.createElement("a")
						exportLink.id = "export-link"
						exportLink.setAttribute("href", STATE.history[STATE.historyIndex].src)
						exportLink.setAttribute("download", "imageStamper_" + (new Date().getTime()) + ".png")
						exportLink.addEventListener(TRIGGERS.click, () => {
							document.body.removeChild(exportLink)
						})
				
				// click
					document.body.appendChild(exportLink)
					exportLink.click()
			} catch (error) {console.log(error)}
		}

/*** assetManager ***/
	/* retrieveAsset */
		window.ASSETS_J.retrieveAsset = function(name, type, data) {
			try {
				// image
					const image = new Image()
						image.onload = () => {
							STATE.background.image = image
							drawBackground(image)
							appendHistory()
						}
						image.src = data
					ELEMENTS.tools.backgroundImage.value = null
					ELEMENTS.tools.backgroundImage.blur()
			} catch (error) {console.log(error)}
		}

	/* storeAsset */
		window.ASSETS_J.storeAsset = async function(type) {
			try {
				// png
					return {
						name: "imageStamper_" + (new Date().getTime()) + ".png",
						type: "png",
						data: STATE.history[STATE.historyIndex].src
					}
			} catch (error) {console.log(error)}
		}

/*** history ***/
	/* appendHistory */
		function appendHistory() {
			try {
				// get state
					const imageData = ELEMENTS.canvas.toDataURL("image/png")

				// clear out future
					while (STATE.history.length - 1 > STATE.historyIndex) {
						STATE.history.pop()
					}

				// get image
					const image = new Image()
						image.src = imageData

				// save state
					STATE.history.push(image)
					STATE.historyIndex++

				// set buttons
					if (STATE.history.length > 1) {
						ELEMENTS.tools.undo.setAttribute("enabled", true)
					}
					ELEMENTS.tools.redo.removeAttribute("enabled")

				// more than 100 states
					if (STATE.historyIndex >= CONSTANTS.historyLimit) {
						STATE.history.shift()
						STATE.historyIndex--
					}
			} catch (error) {console.log(error)}
		}

	/* undoHistory */
		ELEMENTS.tools.undo.addEventListener(TRIGGERS.click, undoHistory)
		function undoHistory() {
			try {
				// no history
					if (!STATE.history.length || !STATE.history[STATE.historyIndex - 1]) {
						return
					}

				// move index left
					STATE.historyIndex--

				// buttons
					ELEMENTS.tools.redo.setAttribute("enabled", true)
					if (!STATE.historyIndex) {
						ELEMENTS.tools.undo.removeAttribute("enabled")
					}

				// draw from image
					drawBackground(STATE.history[STATE.historyIndex])
			} catch (error) {console.log(error)}
		}

	/* redoHistory */
		ELEMENTS.tools.redo.addEventListener(TRIGGERS.click, redoHistory)
		function redoHistory() {
			try {
				// no history
					if (!STATE.history.length || !STATE.history[STATE.historyIndex + 1]) {
						return
					}

				// move index right
					STATE.historyIndex++

				// buttons
					ELEMENTS.tools.undo.setAttribute("enabled", true)
					if (STATE.historyIndex >= STATE.history.length - 1) {
						ELEMENTS.tools.redo.removeAttribute("enabled", true)
					}
				
				// draw from image
					drawBackground(STATE.history[STATE.historyIndex])
			} catch (error) {console.log(error)}
		}

/*** drawing ***/
	/* pressCursor */
		window.addEventListener(TRIGGERS.press, pressCursor)
		function pressCursor(event) {
			try {
				// stop search
					revertSearch(event)

				// already drawing
					if (STATE.drawing) {
						return
					}

				// coordinates
					const screenX = event.touches ? event.touches[0].clientX : event.clientX
					const screenY = event.touches ? event.touches[0].clientY : event.clientY
					const {x, y} = getCanvasCoordinates({
						x: screenX,
						y: screenY
					})

				// stamp
					if (STATE.tool == "stamp") {
						ELEMENTS.cursorStamp.style.left = `${screenX}px`
						ELEMENTS.cursorStamp.style.top  = `${screenY}px`
						ELEMENTS.cursorStamp.setAttribute("visible", true)
					}

				// outside canvas
					if (x < 0 || x > CONSTANTS.canvasSize || y < 0 || y > CONSTANTS.canvasSize) {
						if (STATE.tool == "stamp") {
							ELEMENTS.cursorStamp.removeAttribute("visible")
						}
						return
					}

				// set drawing
					if (STATE.tool == "brush" || STATE.tool == "eraser") {
						STATE.drawing = true
						STATE.path = [{x, y}]
						drawPath(STATE.path, STATE.tool == "eraser")
						return
					}

				// stamp
					if (STATE.tool == "stamp") {
						drawStamp(STATE.stamp, {x, y})
						return
					}
			} catch (error) {console.log(error)}
		}

	/* moveCursor */
		window.addEventListener(TRIGGERS.move, moveCursor)
		function moveCursor(event) {
			try {
				// not drawing
					if (!STATE.drawing && STATE.tool !== "stamp") {
						return
					}

				// coordinates
					const screenX = event.touches ? event.touches[0].clientX : event.clientX
					const screenY = event.touches ? event.touches[0].clientY : event.clientY
					const {x, y} = getCanvasCoordinates({
						x: screenX,
						y: screenY
					})

				// stamp
					if (STATE.tool == "stamp") {
						ELEMENTS.cursorStamp.style.left = `${screenX}px`
						ELEMENTS.cursorStamp.style.top  = `${screenY}px`
						ELEMENTS.cursorStamp.setAttribute("visible", true)
					}

				// outside canvas
					if (x < 0 || x > CONSTANTS.canvasSize || y < 0 || y > CONSTANTS.canvasSize) {
						if (STATE.tool == "stamp") {
							ELEMENTS.cursorStamp.removeAttribute("visible")
						}
						return
					}

				// add to path
					if (STATE.tool == "eraser" || STATE.tool == "brush") {
						STATE.path.push({x, y})
						drawPath(STATE.path, STATE.tool == "eraser")
						return
					}
			} catch (error) {console.log(error)}
		}

	/* liftCursor */
		window.addEventListener(TRIGGERS.lift, liftCursor)
		function liftCursor(event) {
			try {
				// not drawing
					if (!STATE.drawing) {
						return
					}
					STATE.drawing = false

				// eraser
					if (STATE.tool == "eraser" || STATE.tool == "brush") {
						appendHistory()
					}

				// stop drawing
					STATE.path = []
			} catch (error) {console.log(error)}
		}

/*** canvas ***/
	/* clearCanvas */
		function clearCanvas() {
			try {
				// clear
					ELEMENTS.context.clearRect(0, 0, CONSTANTS.canvasSize, CONSTANTS.canvasSize)
			} catch (error) {console.log(error)}
		}

	/* drawBackground */
		function drawBackground(image) {
			try {
				// clear
					clearCanvas()

				// color
					ELEMENTS.context.fillStyle = STATE.background.color
					ELEMENTS.context.fillRect(0, 0, CONSTANTS.canvasSize, CONSTANTS.canvasSize)

				// image
					if (image) {
						// dimensions
							const imageWidth = image.naturalWidth
							const imageHeight = image.naturalHeight

						// scale
							const scaleFactor  = CONSTANTS.canvasSize / Math.max(imageWidth, imageHeight)
							const scaledWidth  = scaleFactor * imageWidth
							const scaledHeight = scaleFactor * imageHeight

						// offsets
							const imageXoffset = (CONSTANTS.canvasSize - scaledWidth)  / 2
							const imageYoffset = (CONSTANTS.canvasSize - scaledHeight) / 2

						// draw
							ELEMENTS.context.drawImage(image, imageXoffset, imageYoffset, scaledWidth, scaledHeight)
					}
			} catch (error) {console.log(error)}
		}

	/* drawPath */
		function drawPath(lineData, erase) {
			try {
				// use image
					drawBackground(STATE.history[STATE.historyIndex])

				// parameters
					ELEMENTS.context.beginPath()
					ELEMENTS.context.lineCap = "round"
					ELEMENTS.context.lineJoin = "round"
					ELEMENTS.context.strokeStyle = erase ? CONSTANTS.defaultBackground : convertColor(STATE.brush.color, STATE.brush.opacity)
					ELEMENTS.context.lineWidth = erase ? STATE.eraser.size : STATE.brush.size

				// loop through points
					ELEMENTS.context.moveTo(lineData[0].x, lineData[0].y)
					for (let i = 0; i < lineData.length; i++) {
						ELEMENTS.context.lineTo(lineData[i].x, lineData[i].y)
					}
					ELEMENTS.context.stroke()
			} catch (error) {console.log(error)}
		}

	/* drawStamp */
		function drawStamp(stampData, {x, y}) {
			try {
				// use image
					drawBackground(STATE.history[STATE.historyIndex])

				// scale
					const scaledWidth  = stampData.size
					const scaledHeight = stampData.size
					const xflip        = stampData.xflip
					const yflip        = stampData.yflip

				// offsets
					const imageXoffset = -(scaledWidth  / 2)
					const imageYoffset = -(scaledHeight / 2)
					const imageAngle   = stampData.rotation * (CONSTANTS.circleRadians / CONSTANTS.circleDegrees)

				// move & rotate
					ELEMENTS.context.save()
					ELEMENTS.context.translate(x, y)
					ELEMENTS.context.scale(xflip, yflip)
					ELEMENTS.context.rotate(imageAngle)

				// draw
					ELEMENTS.context.drawImage(stampData.svg, imageXoffset, imageYoffset, scaledWidth, scaledHeight)

				// restore
					ELEMENTS.context.restore()

				// save history
					appendHistory()
			} catch (error) {console.log(error)}
		}
