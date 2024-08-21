/*** globals ***/
	/* triggers */
		const TRIGGERS = {
			input: "input",
			change: "change",
			click: "click",
			focus: "focus",
			blur: "blur"
		}

	/* elements */
		const ELEMENTS = {
			favicon: document.querySelector("#favicon"),
			keyframes: document.querySelector("#keyframes"),
			options: {
				iconName: document.querySelector("#options-icon-name"),
				iconResults: document.querySelector("#options-icon-results"),
				iconPath: document.querySelector("#options-icon-path"),
				strokeColor: document.querySelector("#options-stroke-color"),
				strokeWidth: document.querySelector("#options-stroke-width"),
				strokeCorners: document.querySelector("#options-stroke-corners"),
				fillColor: document.querySelector("#options-fill-color"),
				fillType: document.querySelector("#options-fill-type"),
				direction: document.querySelector("#options-direction"),
				animationDuration: document.querySelector("#options-duration-animation"),
				endstatesDuration: document.querySelector("#options-duration-endstates"),
				iteration: document.querySelector("#options-iteration"),
			},
			preview: {
				svg: document.querySelector("#preview-svg"),
				path: document.querySelector("#preview-path"),
				reset: document.querySelector("#preview-reset")
			},
			text: {
				html: document.querySelector("#text-html"),
				htmlCopy: document.querySelector("#text-html-copy"),
				css: document.querySelector("#text-css"),
				cssCopy: document.querySelector("#text-css-copy")
			}
		}

	/* constants */
		const CONSTANTS = {
			customString: "*custom*",
			copyWait: 1000, // ms
			percent: 100, // %
			places: 6, // 1000000
			showPlaces: 3, // 1000
			svgSizePadding: "0 0 100 100", // %
			svgSizeNoPadding: "10 10 80 80", // %
			linecap: {
				"round": "round",
				"sharp": "square",
				"flat": "butt"
			},
			linejoin: {
				"round": "round",
				"sharp": "miter",
				"flat": "bevel"
			},
			reverseLinejoin: {
				"round": "round",
				"miter": "sharp",
				"bevel": "flat"
			},
		}

	/* state */
		const STATE = {
			copyTimeout: null,
			name: "",
			path: "",
			direction: "forward-loop",
			fillType: "none",
			fillColor: "#111111",
			animationDuration: 1, // s
			endstatesDuration: 0.5, // s
			css: {
				"fill": "none",
				"stroke": "#04b1ff",
				"stroke-width": "3px",
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"animation-iteration-count": "infinite",
				"animation-timing-function": "linear",
				"animation-duration": "3s"
			},
			keyframes: ""
		}

/*** helpers ***/
	/* loadPage */
		loadPage()
		function loadPage() {
			try {
				// parameters
					const parameters = getURLparameters(window.location.search)

				// initialize state from parameters
					initializeState(parameters)

				// random icon
					if (!STATE.name.length) {
						STATE.name = chooseRandom(Object.keys(SVG.icons))
						ELEMENTS.options.iconName.value = STATE.name
					}
					if (!STATE.path.length) {
						STATE.path = SVG.icons[STATE.name] || ""
						ELEMENTS.options.iconPath.value = STATE.path
					}
					if (STATE.path.length) {
						STATE.keyframes = constructAnimation()
					}

				// display
					resetAnimation()
			} catch (error) {console.log(error)}
		}

	/* initializeState */
		function initializeState(parameters) {
			try {
				// go through parameters
					if (parameters.name) {
						STATE.name = parameters.name
					}
					if (parameters.strokecolor) {
						STATE.css["stroke"] = parameters.strokecolor
					}
					if (parameters.strokecorners) {
						STATE.css["stroke-linejoin"] = CONSTANTS.linejoin[parameters.strokecorners]
						STATE.css["stroke-linecap"] = CONSTANTS.linecap[parameters.strokecorners]
					}
					if (parameters.strokewidth) {
						STATE.css["stroke-width"] = parameters.strokewidth
					}
					if (parameters.fillcolor) {
						STATE.fillColor = parameters.fillcolor
					}
					if (parameters.filltype) {
						STATE.fillType = parameters.filltype
					}
					if (parameters.direction) {
						STATE.direction = parameters.direction
					}
					if (!isNaN(parameters.animationduration)) {
						STATE.animationDuration = Number(parameters.animationduration)
					}
					if (!isNaN(parameters.endstatesduration)) {
						STATE.endstatesDuration = Number(parameters.endstatesduration)
					}
					if (parameters.infinite !== undefined) {
						STATE.css["animation-iteration-count"] = parameters.infinite == "true" ? "infinite" : 1
					}
					if (parameters.path) {
						STATE.path = parameters.path
					}

				// set elements
					ELEMENTS.options.iconName.value = STATE.name
					ELEMENTS.options.strokeColor.value = STATE.css["stroke"]
					ELEMENTS.options.strokeCorners.value = CONSTANTS.reverseLinejoin[STATE.css["stroke-linejoin"]]
					ELEMENTS.options.strokeWidth.value = STATE.css["stroke-width"].replace("px", "")
					ELEMENTS.options.fillColor.value = STATE.fillColor
					ELEMENTS.options.fillType.value = STATE.fillType
					ELEMENTS.options.direction.value = STATE.direction
					ELEMENTS.options.animationDuration.value = STATE.animationDuration
					ELEMENTS.options.endstatesDuration.value = STATE.endstatesDuration
					ELEMENTS.options.iteration.checked = STATE.css["animation-iteration-count"] == "infinite"
					ELEMENTS.options.iconPath.value = STATE.path
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

	/* displayFavicon */
		function displayFavicon() {
			try {
				// path
					ELEMENTS.favicon.href = `data:image/svg+xml,<svg version='1.1' xmlns='http://www.w3.org/2000/svg' viewBox='${CONSTANTS.svgSizeNoPadding}'>` +
						`<path stroke='${STATE.css.stroke.replace("#", "%23")}' stroke-width='${STATE.css['stroke-width']}' fill='${STATE.css.fill.replace("#", "%23")}' d='${STATE.path}'></path>` +
					`</svg>`
			} catch (error) {console.log(error)}
		}

	/* getURLparameters */
		function getURLparameters(searchString) {
			try {
				// no string
					searchString = searchString?.replace("?", "") ?? ""
					if (!searchString.length) {
						return {}
					}			

				// get query parameters
					const searchPairs = searchString.split("&").map(pair => pair.split("=")) || []

				// parameters
					const parameters = {}
					for (const p in searchPairs) {
						parameters[searchPairs[p][0].trim().toLowerCase()] = decodeURIComponent(searchPairs[p][1].trim())
					}

				// return
					return parameters
			} catch (error) {console.log(error)}
		}

	/* setURLparameters */
		function setURLparameters() {
			try {
				// url parameters
					const urlParameters = {
						name: STATE.name,
						strokecolor: STATE.css["stroke"],
						strokecorners: CONSTANTS.reverseLinejoin[STATE.css["stroke-linejoin"]],
						strokewidth: STATE.css["stroke-width"],
						fillcolor: STATE.fillColor,
						filltype: STATE.fillType,
						direction: STATE.direction,
						animationduration: STATE.animationDuration,
						endstatesduration: STATE.endstatesDuration,
						infinite: STATE.css["animation-iteration-count"] == "infinite",
						path: STATE.path
					}

				// stringify
					let parameters = []
					for (const u in urlParameters) {
						parameters.push(`${u}=${encodeURIComponent(urlParameters[u])}`)
					}

				// no parameters?
					const searchString = parameters.length ? `?${parameters.join("&")}` : ''

				// set
					const url = new URL(window.location.href)
						url.search = searchString
					window.history.replaceState(null, "", url)
			} catch (error) {console.log(error)}
		}

/*** animation ***/
	/* constructAnimation */
		function constructAnimation() {
			try {
				// get timing
					const timing = getTiming(STATE.animationDuration, STATE.endstatesDuration, STATE.direction)
					const totalTime = Math.round(timing.map(time => time * (10 ** CONSTANTS.places)).reduce((accumulator, currentValue) => accumulator + currentValue)) / (10 ** CONSTANTS.places)
					STATE.css["animation-duration"] =  `${totalTime}s`

				// get frames
					const steps = getSteps(STATE.path)
					const frames = getFrames(steps, STATE.direction)

				// convert to CSS
					const options = {
						direction: STATE.direction,
						fillType: STATE.fillType,
						fillColor: STATE.fillColor
					}
					return getCSSkeyframes(frames, timing, totalTime, options)
			} catch (error) {console.log(error)}
		}

	/* getTiming */
		function getTiming(animationDuration, endstatesDuration, direction) {
			try {
				// phases
					const timing = [animationDuration, endstatesDuration]
					if (direction.includes("loop")) {
						timing.push(animationDuration, endstatesDuration)
					}

				// return
					return timing
			} catch (error) {console.log(error)}
		}

	/* getSteps */
		function getSteps(path) {
			try {
				// start empty
					const steps = []
					let i = 0
					let thisStep = ""
				
				// build steps
					do {
						if (/[a-zA-Z]/g.test(path[i])) {
							if (thisStep.length) {
								steps.push(thisStep)
							}
							thisStep = path[i]
						}
						else {
							thisStep += path[i]
						}
						i++
					} while (i < path.length)

				// final step
					steps.push(thisStep)

				// return
					return steps
			} catch (error) {console.log(error)}
		}

	/* getFrames */
		function getFrames(steps, direction) {
			try {
				// build triangle
					const frames = []
					let stepsString = ""
					for (let s = 0; s < steps.length; s++) {
						stepsString += steps[s]
						frames.push(`{d: path('${stepsString}');}`)
					}

				// forward
					if (direction == "forward") {
						return frames
					}

				// backward
					if (direction == "backward") {
						return frames.reverse()
					}

				// forward loop
					if (direction == "forward-loop") {
						return frames.concat([...frames].reverse())
					}

				// backward loop
					if (direction == "backward-loop") {
						return [...frames].reverse().concat(frames)
					}
			} catch (error) {console.log(error)}
		}

	/* getCSSkeyframes */
		function getCSSkeyframes(frames, timing, totalTime, options) {
			try {
				// frameLines
					const frameLines = []

				// 2 phases
					if (timing.length == 2) {
						// percentages
							const animationPercentage = timing[0] * CONSTANTS.percent / totalTime
							const endstatesPercentage = timing[1] * CONSTANTS.percent / totalTime

						// percent per animation frame
							const percentPerFrame = animationPercentage / (frames.length - 1)

						// start frame
							let percentage = 0
							if (endstatesPercentage && options && options.fillType == "complete") {
								if (options.direction == "forward") {
									frameLines.push(`    ${percentage.toFixed(CONSTANTS.showPlaces)}% ${frames[0].replace("}", " fill: none;}")}`)
								}
								else {
									frameLines.push(`    ${percentage.toFixed(CONSTANTS.showPlaces)}% ${frames[0].replace("}", " fill: " + options.fillColor + ";}")}`)
								}
							}
							else {
								frameLines.push(`    ${percentage.toFixed(CONSTANTS.showPlaces)}% ${frames[0]}`)
							}

						// backwards?
							if (endstatesPercentage && options && options.direction == "backward") {
								percentage = endstatesPercentage
								if (options && options.fillType == "complete") {
									frameLines.push(`    ${percentage.toFixed(CONSTANTS.showPlaces)}% ${frames[0].replace("}", " fill: none;}")}`)
								}
								else {
									frameLines.push(`    ${percentage.toFixed(CONSTANTS.showPlaces)}% ${frames[0]}`)
								}
							}

						// animation
							for (let f = 1; f < frames.length; f++) {
								percentage = Math.round((percentage + percentPerFrame) * (10 ** CONSTANTS.places)) / (10 ** CONSTANTS.places)
								frameLines.push(`    ${percentage.toFixed(CONSTANTS.showPlaces)}% ${frames[f]}`)
							}

						// final state
							if (endstatesPercentage && (!options || options.direction == "forward")) {
								percentage = CONSTANTS.percent
								if (options && options.fillType == "complete" && options.direction == "forward") {
									frameLines[frameLines.length - 1] = frameLines[frameLines.length - 1].replace("}", " fill: none;}")
									frameLines.push(`    ${percentage.toFixed(CONSTANTS.showPlaces)}% ${frames[frames.length - 1].replace("}", " fill: " + options.fillColor + ";}")}`)
								}
								else {
									frameLines.push(`    ${percentage.toFixed(CONSTANTS.showPlaces)}% ${frames[frames.length - 1]}`)
								}
							}
					}

				// 4 phases
					else if (timing.length == 4) {
						// animation
							const animationAPercentage = CONSTANTS.percent * timing[0] / totalTime
							const endstatesAPercentage = CONSTANTS.percent * timing[1] / totalTime
							const animationBPercentage = CONSTANTS.percent * timing[2] / totalTime
							const endstatesBPercentage = CONSTANTS.percent * timing[3] / totalTime

							const firstHalfPercentage  = CONSTANTS.percent * (timing[0] + timing[1]) / totalTime

						// percent per animation frame
							const percentPerFrameA = animationAPercentage / (frames.length / 2 - 1)
							const percentPerFrameB = animationBPercentage / (frames.length / 2 - 1)

						// start frame
							let percentage = 0
							if (endstatesBPercentage && options && options.fillType == "complete") {
								if (options.direction == "forward-loop") {
									frameLines.push(`    ${percentage.toFixed(CONSTANTS.showPlaces)}% ${frames[0].replace("}", " fill: none;}")}`)
								}
								else {
									frameLines.push(`    ${percentage.toFixed(CONSTANTS.showPlaces)}% ${frames[0].replace("}", " fill: " + options.fillColor + ";}")}`)
								}
							}
							else {
								frameLines.push(`    ${percentage.toFixed(CONSTANTS.showPlaces)}% ${frames[0]}`)
							}

						// backwards?
							if (endstatesBPercentage && options && options.direction == "backward-loop") {
								percentage = endstatesBPercentage
								if (options && options.fillType == "complete") {
									frameLines.push(`    ${percentage.toFixed(CONSTANTS.showPlaces)}% ${frames[0].replace("}", " fill: none;}")}`)
								}
								else {
									frameLines.push(`    ${percentage.toFixed(CONSTANTS.showPlaces)}% ${frames[0]}`)
								}
							}

						// animation
							for (let a = 1; a < frames.length / 2; a++) {
								percentage = Math.round((percentage + percentPerFrameA) * (10 ** CONSTANTS.places)) / (10 ** CONSTANTS.places)
								frameLines.push(`    ${percentage.toFixed(CONSTANTS.showPlaces)}% ${frames[a]}`)
							}

						// DEAL WITH FILL
							if (endstatesAPercentage && options && options.fillType == "complete") {
								if (options.direction == "forward-loop") {
									frameLines[frameLines.length - 2] = frameLines[frameLines.length - 2].replace("}", " fill: none;}")
									frameLines[frameLines.length - 1] = frameLines[frameLines.length - 1].replace("}", " fill: " + options.fillColor + ";}")
								}
							}

						// midpoint
							percentage = firstHalfPercentage + (options && options.direction == "backward-loop" ? endstatesBPercentage : 0)
							let forwardUnfill = false
							if (endstatesAPercentage) {
								if (options.fillType == "complete") {
									frameLines.push(`    ${percentage.toFixed(CONSTANTS.showPlaces)}% ${frames[frames.length / 2].replace("}", " fill: none;}")}`)
								}
								else {
									frameLines.push(`    ${percentage.toFixed(CONSTANTS.showPlaces)}% ${frames[frames.length / 2]}`)
								}
								percentage = Math.round((percentage + percentPerFrameB) * (10 ** CONSTANTS.places)) / (10 ** CONSTANTS.places)
							}

						// animation
							for (let b = (frames.length / 2) + 1; b < frames.length; b++) {
								frameLines.push(`    ${percentage.toFixed(CONSTANTS.showPlaces)}% ${frames[b]}`)
								percentage = Math.round((percentage + percentPerFrameB) * (10 ** CONSTANTS.places)) / (10 ** CONSTANTS.places)
							}

						// final state
							if (endstatesBPercentage) {
								percentage = CONSTANTS.percent
								if (options && options.fillType == "complete") {
									if (options.direction == "forward-loop") {
										frameLines.push(`    ${percentage.toFixed(CONSTANTS.showPlaces)}% ${frames[frames.length - 1].replace("}", " fill: none;}")}`)
									}
									else {
										frameLines[frameLines.length - 2] = frameLines[frameLines.length - 2].replace("}", " fill: none;}")
										frameLines[frameLines.length - 1] = frameLines[frameLines.length - 1].replace("}", " fill: " + options.fillColor + ";}")
									}
								}
								else if (options && options.direction == "forward-loop") {
									frameLines.push(`    ${percentage.toFixed(CONSTANTS.showPlaces)}% ${frames[frames.length - 1]}`)
								}
							}
					}

				// return
					return `@keyframes draw {\n${frameLines.join("\n")}\n}`
			} catch (error) {console.log(error)}
		}

	/* getCSStext */
		function getCSStext() {
			try {
				// set CSS values
					const cssList = []
					for (const i in STATE.css) {
						ELEMENTS.preview.path.style[i] = STATE.css[i]
						cssList.push(`${i}: ${STATE.css[i]};`)
					}

				// icon CSS
					const iconCSS = `.icon {\n    width: 100px;\n    height: 100px;\n}` +
									`\n\n` + 
									`.icon path {\n    animation-name: draw;\n    ${cssList.join("\n    ")}\n}`

				// combine with keyframes
					return `${iconCSS}\n\n${STATE.keyframes}`
			} catch (error) {console.log(error)}
		}

	/* resetAnimation */
		ELEMENTS.preview.reset.addEventListener(TRIGGERS.click, resetAnimation)
		function resetAnimation() {
			try {
				// set animation frames
					ELEMENTS.keyframes.innerHTML = STATE.keyframes

				// update CSS text
					ELEMENTS.text.css.value = getCSStext()

				// update favicon
					displayFavicon()

				// magic
					ELEMENTS.preview.path.removeAttribute("animating")
					setTimeout(() => {
						ELEMENTS.preview.path.setAttribute("animating", true)
					}, 0)
			} catch (error) {console.log(error)}
		}

/*** icon ***/
	/* searchIcons */
		ELEMENTS.options.iconName.addEventListener(TRIGGERS.focus, searchIcons)
		ELEMENTS.options.iconName.addEventListener(TRIGGERS.input, searchIcons)
		function searchIcons(event) {
			try {
				// not yet searching
					if (!ELEMENTS.options.iconResults.getAttribute("visible")) {
						ELEMENTS.options.iconName.value = ""
						ELEMENTS.options.iconResults.setAttribute("visible", true)
					}

				// redo search
					ELEMENTS.options.iconResults.innerHTML = ""

				// search
					const search = ELEMENTS.options.iconName.value.toLowerCase().trim().replace(/-/g, " ")
					const iconKeys = search ? 
						Object.keys(SVG.icons).filter(key => key.trim().toLowerCase().replace(/-/g, " ").includes(search)) : 
						Object.keys(SVG.icons)

				// css
					const cssList = []
					for (let i in STATE.css) {
						cssList.push(`${i}: ${STATE.css[i]};`)
					}

				// results
					for (const k in iconKeys) {
						const path = SVG.icons[iconKeys[k]]
						const iconHTML = `<svg viewBox="${CONSTANTS.svgSizePadding}"><path d="${path}" style="${cssList.join(" ")}"></path></svg>`

						const result = document.createElement("button")
							result.className = "option-icon-result"
							result.title = iconKeys[k].replace(/-/g, " ")
							result.value = iconKeys[k]
							result.innerHTML = iconHTML
							result.addEventListener(TRIGGERS.click, updateIcon)
							result.addEventListener(TRIGGERS.blur, revertSearch)
						ELEMENTS.options.iconResults.appendChild(result)
					}
			} catch (error) {console.log(error)}
		}

	/* revertSearch */
		ELEMENTS.options.iconName.addEventListener(TRIGGERS.blur, revertSearch)
		function revertSearch(event) {
			try {
				setTimeout(() => {
					// still within search
						if (document.activeElement && document.activeElement.closest("#options-icon-outer")) {
							return
						}

					// clicking away
						ELEMENTS.options.iconName.value = STATE.name.replace(/-/g, " ")
						ELEMENTS.options.iconResults.innerHTML = ""
						ELEMENTS.options.iconResults.removeAttribute("visible", true)
				}, 0)
			} catch (error) {console.log(error)}
		}

	/* updateIcon */
		function updateIcon(event) {
			try {
				// don't bubble up
					event.preventDefault()
					event.stopPropagation()

				// select icon
					const iconName = event.target.closest(".option-icon-result").value

				// in SVG?
					const path = SVG.icons[iconName]
					if (!path) {
						return
					}

				// set values
					STATE.name = iconName
					STATE.path = path
					STATE.keyframes = constructAnimation()

				// set search bar
					ELEMENTS.options.iconName.value = STATE.name.replace(/-/g, " ")
					ELEMENTS.options.iconResults.innerHTML = ""
					ELEMENTS.options.iconResults.removeAttribute("visible")
					ELEMENTS.options.iconPath.value = STATE.path

				// display
					setURLparameters()
					resetAnimation()
			} catch (error) {console.log(error)}
		}

	/* updatePath */
		ELEMENTS.options.iconPath.addEventListener(TRIGGERS.input, updatePath)
		function updatePath(event) {
			try {
				// set icon name to custom
					STATE.name = CONSTANTS.customString
					ELEMENTS.options.iconName.value = STATE.name

				// save path
					STATE.path = ELEMENTS.options.iconPath.value.trim()
					STATE.keyframes = constructAnimation()

				// display
					setURLparameters()
					resetAnimation()
			} catch (error) {console.log(error)}
		}

/*** options ***/
	/* updateStrokeColor */
		ELEMENTS.options.strokeColor.addEventListener(TRIGGERS.input, updateStrokeColor)
		function updateStrokeColor(event) {
			try {
				// set value
					STATE.css.stroke = ELEMENTS.options.strokeColor.value

				// display
					setURLparameters()
					resetAnimation()
			} catch (error) {console.log(error)}
		}

	/* updateStrokeWidth */
		ELEMENTS.options.strokeWidth.addEventListener(TRIGGERS.input, updateStrokeWidth)
		function updateStrokeWidth(event) {
			try {
				// set value
					const value = ELEMENTS.options.strokeWidth.value
					if (isNaN(value)) {
						return
					}
					STATE.css["stroke-width"] = value

				// display
					setURLparameters()
					resetAnimation()
			} catch (error) {console.log(error)}
		}

	/* updateStrokeCorners */
		ELEMENTS.options.strokeCorners.addEventListener(TRIGGERS.input, updateStrokeCorners)
		function updateStrokeCorners(event) {
			try {
				// get value
					const corners = ELEMENTS.options.strokeCorners.value

				// set values
					STATE.css["stroke-linecap"] = CONSTANTS.linecap[corners]
					STATE.css["stroke-linejoin"] = CONSTANTS.linejoin[corners]

				// display
					setURLparameters()
					resetAnimation()
			} catch (error) {console.log(error)}
		}

	/* updateFillType */
		ELEMENTS.options.fillType.addEventListener(TRIGGERS.input, updateFillType)
		function updateFillType(event) {
			try {
				// set value
					STATE.fillType = ELEMENTS.options.fillType.value
					if (STATE.fillType !== "always") {
						STATE.css.fill = "none"
					}
					else {
						STATE.css.fill = STATE.fillColor
					}
					STATE.keyframes = constructAnimation()

				// display
					setURLparameters()
					resetAnimation()
			} catch (error) {console.log(error)}
		}

	/* updateFillColor */
		ELEMENTS.options.fillColor.addEventListener(TRIGGERS.input, updateFillColor)
		function updateFillColor(event) {
			try {
				// activate from none
					if (STATE.fillType == "none") {
						STATE.fillType = "always"
						ELEMENTS.options.fillType.value = STATE.fillType
					}

				// set value
					STATE.fillColor = ELEMENTS.options.fillColor.value
					if (STATE.fillType == "always") {
						STATE.css.fill = STATE.fillColor
					}
					if (STATE.fillType == "complete") {
						STATE.keyframes = constructAnimation()
					}

				// display
					setURLparameters()
					resetAnimation()
			} catch (error) {console.log(error)}
		}

	/* updateDirection */
		ELEMENTS.options.direction.addEventListener(TRIGGERS.input, updateDirection)
		function updateDirection(event) {
			try {
				// set values
					STATE.direction = ELEMENTS.options.direction.value
					STATE.keyframes = constructAnimation()

				// display
					setURLparameters()
					resetAnimation()
			} catch (error) {console.log(error)}
		}

	/* updateAnimationDuration */
		ELEMENTS.options.animationDuration.addEventListener(TRIGGERS.input, updateAnimationDuration)
		function updateAnimationDuration(event) {
			try {
				// set value
					const value = Number(ELEMENTS.options.animationDuration.value)
					if (isNaN(value)) {
						return
					}
					STATE.animationDuration = value
					STATE.keyframes = constructAnimation()

				// display
					setURLparameters()
					resetAnimation()
			} catch (error) {console.log(error)}
		}

	/* updateEndstatesDuration */
		ELEMENTS.options.endstatesDuration.addEventListener(TRIGGERS.input, updateEndstatesDuration)
		function updateEndstatesDuration(event) {
			try {
				// set value
					const value = Number(ELEMENTS.options.endstatesDuration.value)
					if (isNaN(value)) {
						return
					}
					STATE.endstatesDuration = value
					STATE.keyframes = constructAnimation()

				// display
					setURLparameters()
					resetAnimation()
			} catch (error) {console.log(error)}
		}

	/* updateIteration */
		ELEMENTS.options.iteration.addEventListener(TRIGGERS.input, updateIteration)
		function updateIteration(event) {
			try {
				// set value
					STATE.css["animation-iteration-count"] = ELEMENTS.options.iteration.checked ? "infinite" : 1
					STATE.css["animation-fill-mode"] = ELEMENTS.options.iteration.checked ? "none" : "forwards"

				// display
					setURLparameters()
					resetAnimation()
			} catch (error) {console.log(error)}
		}

/*** text ***/
	/* copyHTML */
		ELEMENTS.text.htmlCopy.addEventListener(TRIGGERS.click, copyHTML)
		function copyHTML(event) {
			try {
				// cancel timeout
					clearInterval(STATE.copyTimeout)
					STATE.copyTimeout = null

				// update element
					ELEMENTS.text.htmlCopy.setAttribute("check", true)

				// get text
					const text = ELEMENTS.text.html.value.trim()

				// copy text to clipboard
					navigator.clipboard.writeText(text)

				// timeout
					STATE.copyTimeout = setInterval(() => {
						ELEMENTS.text.htmlCopy.removeAttribute("check", true)
					}, CONSTANTS.copyWait)
			} catch (error) {console.log(error)}
		}

	/* copyCSS */
		ELEMENTS.text.cssCopy.addEventListener(TRIGGERS.click, copyCSS)
		function copyCSS(event) {
			try {
				// cancel timeout
					clearInterval(STATE.copyTimeout)
					STATE.copyTimeout = null

				// update element
					ELEMENTS.text.cssCopy.setAttribute("check", true)

				// get text
					const text = ELEMENTS.text.css.value.trim()

				// copy text to clipboard
					navigator.clipboard.writeText(text)

				// timeout
					STATE.copyTimeout = setInterval(() => {
						ELEMENTS.text.cssCopy.removeAttribute("check", true)
					}, CONSTANTS.copyWait)
			} catch (error) {console.log(error)}
		}
