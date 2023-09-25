/*** globals ***/
	/* triggers */
		const TRIGGERS = {
			click: "click",
			input: "input"
		}

	/* elements */
		const ELEMENTS = {
			favicon: document.querySelector("#favicon"),
			controls: {
				color: document.querySelector("#controls-color"),
				mode: document.querySelector("#controls-mode"),
				border: document.querySelector("#controls-border"),
				shape: document.querySelector("#controls-shape"),
				search: document.querySelector("#controls-search"),
				searchIcon: document.querySelector("#controls-search-icon"),
				clear: document.querySelector("#controls-search-clear")
			},
			list: {
				inner: document.querySelector("#list-inner"),
				empty: document.querySelector("#list-empty"),
				request: document.querySelector("#list-empty-request")
			},
			selected: {
				element: document.querySelector("#selected"),
				overlay: document.querySelector("#selected-overlay"),
				drawer: document.querySelector("#selected-drawer"),
				name: document.querySelector("#selected-drawer-name"),
				close: document.querySelector("#selected-drawer-close"),
				copy: document.querySelector("#selected-drawer-copy"),
				download: document.querySelector("#selected-drawer-download"),
				export: document.querySelector("#selected-drawer-export"),
				edit: document.querySelector("#selected-drawer-edit"),
				svg: document.querySelector("#selected-drawer-svg"),
				path: document.querySelector("#selected-drawer-path"),
			},
			displayTimeout: null
		}

	/* constants */
		const CONSTANTS = {
			iconDesigner: "https://jamesmayr.com/icondesigner/",
			requestURL: "https://script.google.com/macros/s/AKfycbzz8aIaN0_z5yNmPZeMIq3k8tfPKd_M0t0Vni6C89B6HvYK90NI3ugAzYpuDMKF1DxD/exec?search=",
			percent: 100, // %
			pngSize: 500, // px
			pngNoPaddingOffset: -50, // px
			transitionTime: 500, // ms
			actionResetTime: 1000, // ms
			svgSize: "0 0 100 100", // %
			svgSizeNoPadding: "10 10 80 80", // %
			faviconColor: "%23dddddd", // hex
		}

/*** load ***/
	/* loadLibrary */
		loadLibrary()
		function loadLibrary() {
			try {
				// get query parameters
					const queryParameters = getQueryParameters()

				// set controls
					if (queryParameters.color) {
						ELEMENTS.controls.color.value = `#${queryParameters.color}`
					}
					if (queryParameters.mode && Array.from(ELEMENTS.controls.mode.querySelectorAll("option")).map(option => option.value).includes(queryParameters.mode)) {
						ELEMENTS.controls.mode.value = queryParameters.mode
					}
					if (queryParameters.border && Array.from(ELEMENTS.controls.border.querySelectorAll("option")).map(option => option.value).includes(queryParameters.border)) {
						ELEMENTS.controls.border.value = queryParameters.border
					}
					if (queryParameters.shape && Array.from(ELEMENTS.controls.shape.querySelectorAll("option")).map(option => option.value).includes(queryParameters.shape)) {
						ELEMENTS.controls.shape.value = queryParameters.shape
					}
					if (queryParameters.search) {
						ELEMENTS.controls.search.value = queryParameters.search
					}

				// state
					const state = getControlsState()
					state.frame = buildFrame(state)

				// display
					displayTiles(state)

				// hash
					if (queryParameters["#"]) {
						const button = ELEMENTS.list.inner.querySelector(`button[value="${queryParameters["#"]}"]`)
							button.click()
					}
					else {
						displayFavicon()
					}
			} catch (error) {console.log(error)}
		}

	/* getQueryParameters */
		function getQueryParameters() {
			try {
				// empty object
					const queryParameters = {}

				// hash
					const hash = window.location.hash?.slice(1).trim().toLowerCase()
					if (hash && hash.length) {
						queryParameters["#"] = hash
					}

				// search
					const search = window.location.search?.slice(1).trim()
					if (!search || !search.length) {
						return queryParameters
					}

				// parameters
					const pairs = search.split("&") || []
					for (const p in pairs) {
						const pair = decodeURIComponent(pairs[p]).split("=")
						queryParameters[pair[0].trim().toLowerCase()] = pair[1].trim()
					}

				// return
					return queryParameters
			} catch (error) {console.log(error)}
		}

	/* getControlsState */
		function getControlsState() {
			try {
				// build state
					const controlsState = {
						color: ELEMENTS.controls.color.value,
						mode: ELEMENTS.controls.mode.value,
						border: ELEMENTS.controls.border.value,
						shape: ELEMENTS.controls.shape.value,
						search: ELEMENTS.controls.search.value.trim() || "",
					}

				// return
					return controlsState
			} catch (error) {console.log(error)}
		}

/*** user actions ***/
	/* focusSearch */
		ELEMENTS.controls.searchIcon.addEventListener(TRIGGERS.click, focusSearch)
		function focusSearch() {
			try {
				ELEMENTS.controls.search.focus()
			} catch (error) {console.log(error)}
		}

	/* changeControls */
		ELEMENTS.controls.color.addEventListener(TRIGGERS.input, changeControls)
		ELEMENTS.controls.mode.addEventListener(TRIGGERS.input, changeControls)
		ELEMENTS.controls.border.addEventListener(TRIGGERS.input, changeControls)
		ELEMENTS.controls.shape.addEventListener(TRIGGERS.input, changeControls)
		ELEMENTS.controls.search.addEventListener(TRIGGERS.input, changeControls)
		function changeControls(event) {
			try {
				// search --> close drawer
					if (event?.target == ELEMENTS.controls.search) {
						unselectTile(true)
					}

				// build state
					const state = getControlsState()
					state.frame = buildFrame(state)

				// update URL
					const url = new URL(window.location)
						url.search = `?color=${state.color.slice(1)}` +
									 `&mode=${state.mode}` +
									 `&border=${state.border}` +
									 `&shape=${state.shape}` +
									 (state.search?.length ? `&search=${state.search}` : "")
					window.history.replaceState(null, "", url);

				// redisplay tiles (including selected)
					displayTiles(state)
			} catch (error) {console.log(error)}
		}

	/* clearSearch */
		ELEMENTS.controls.clear.addEventListener(TRIGGERS.click, clearSearch)
		function clearSearch() {
			try {
				// empty search input
					ELEMENTS.controls.search.value = ""
					ELEMENTS.controls.search.focus()

				// redisplay tiles
					changeControls({target: ELEMENTS.controls.search})
			} catch (error) {console.log(error)}
		}

	/* selectTile */
		function selectTile(event) {
			try {
				// display drawer
					ELEMENTS.selected.element.style.display = "block"

				// everything else
					setTimeout(() => {
						// open drawer
							ELEMENTS.selected.element.setAttribute("open", true)

						// get tile
							const tile = event.target.closest(".list-tile")
								tile.setAttribute("selected", true)
							const name = tile.value.replace(/-/g, " ")
							const color = tile.querySelector("path").getAttribute("fill")
							const path = tile.querySelector("path").getAttribute("d")
							const svg = tile.innerHTML

						// set fields
							ELEMENTS.selected.name.innerText = name
							ELEMENTS.selected.svg.innerHTML = svg
							ELEMENTS.selected.path.innerText = path
							ELEMENTS.selected.edit.href = `${CONSTANTS.iconDesigner}?fill=${color.slice(1)}&path=${path}`

						// url & favicon
							window.location.hash = tile.value
							displayFavicon(path)

						// wait
							clearInterval(ELEMENTS.displayTimeout)
							ELEMENTS.displayTimeout = setTimeout(() => {
								ELEMENTS.selected.close.focus()
							}, CONSTANTS.transitionTime)
					}, 0)
			} catch (error) {console.log(error)}
		}

	/* unselectTile */
		ELEMENTS.selected.overlay.addEventListener(TRIGGERS.click, unselectTile)
		ELEMENTS.selected.close.addEventListener(TRIGGERS.click, unselectTile)
		function unselectTile(override) {
			try {
				// close drawer
					ELEMENTS.selected.element.removeAttribute("open")
					window.location.hash = ""

				// unselect tile
					const selectedTile = ELEMENTS.list.inner.querySelector(".list-tile[selected]")
					if (!selectedTile) {
						return
					}

					selectedTile.removeAttribute("selected")
					if (selectedTile && !override) {
						selectedTile.focus()
					}
					
				// undisplay
					clearInterval(ELEMENTS.displayTimeout)
					ELEMENTS.displayTimeout = setTimeout(() => {
						// clear fields
							ELEMENTS.selected.name.innerText = ""
							ELEMENTS.selected.svg.innerHTML = ""
							ELEMENTS.selected.path.innerText = ""
							ELEMENTS.selected.edit.href = "#"

						// hide drawer
							ELEMENTS.selected.element.style.display = "none"
					}, CONSTANTS.transitionTime)
			} catch (error) {console.log(error)}
		}

	/* copySVG */
		ELEMENTS.selected.copy.addEventListener(TRIGGERS.click, copySVG)
		function copySVG() {
			try {
				// just done
					if (ELEMENTS.selected.copy.getAttribute("active")) {
						return
					}

				// set state
					ELEMENTS.selected.copy.setAttribute("active", true)

				// copy to clipboard
					const svgText = ELEMENTS.selected.svg.innerHTML
					navigator.clipboard.writeText(svgText)

				// unset
					setTimeout(() => {
						ELEMENTS.selected.copy.removeAttribute("active")
					}, CONSTANTS.actionResetTime)
			} catch (error) {console.log(error)}
		}

	/* downloadSVG */
		ELEMENTS.selected.download.addEventListener(TRIGGERS.click, downloadSVG)
		function downloadSVG() {
			try {
				// just done
					if (ELEMENTS.selected.download.getAttribute("active")) {
						return
					}

				// set state
					ELEMENTS.selected.download.setAttribute("active", true)

				// get attributes
					const state = getControlsState()
					state.frame = buildFrame(state)
					const title = ELEMENTS.selected.name.innerText

				// build file
					const svg = ELEMENTS.selected.svg.innerHTML.replace('<svg', '<svg version="1.1" xmlns="http://www.w3.org/2000/svg"')
					const downloadLink = document.createElement("a")
						downloadLink.setAttribute("href", "data:image/svg+xml," + encodeURIComponent(svg))
						downloadLink.setAttribute("download", title + (state.frame[0] ? ` (${state.frame[0]})` : "") + ".svg")

				// click
					downloadLink.click()
					setTimeout(() => {
						downloadLink.remove()
					}, 0)

				// unset
					setTimeout(() => {
						ELEMENTS.selected.download.removeAttribute("active")
					}, CONSTANTS.actionResetTime)
			} catch (error) {console.log(error)}
		}

	/* exportPNG */
		ELEMENTS.selected.export.addEventListener(TRIGGERS.click, exportPNG)
		function exportPNG(event) {
			try {
				// just done
					if (ELEMENTS.selected.export.getAttribute("active")) {
						return
					}

				// set state
					ELEMENTS.selected.export.setAttribute("active", true)

				// get attributes
					const state = getControlsState()
					state.frame = buildFrame(state)
					const title = ELEMENTS.selected.name.innerText
					const path = ELEMENTS.selected.path.innerText

				// modified path
					const modifiedPath = path.split(/\s/).map(text => {
						return isNaN(text) ? text : (text * CONSTANTS.pngSize / CONSTANTS.percent)
					}).join(" ")

				// create canvas
					const canvas = document.createElement("canvas")
						canvas.width  = CONSTANTS.pngSize + (state.frame[2] ? CONSTANTS.pngNoPaddingOffset * 2 : 0)
						canvas.height = CONSTANTS.pngSize + (state.frame[2] ? CONSTANTS.pngNoPaddingOffset * 2 : 0)
					document.body.appendChild(canvas)

				// move
					const context = canvas.getContext("2d")
					if (state.frame[2]) {
						context.translate(CONSTANTS.pngNoPaddingOffset, CONSTANTS.pngNoPaddingOffset)
					}

				// draw
					context.fillStyle = state.color
					context.fill(new Path2D(modifiedPath))

				// get image
					const imageData = canvas.toDataURL("image/png")

				// download link
					const downloadLink = document.createElement("a")
						downloadLink.setAttribute("href", imageData)
						downloadLink.setAttribute("download", title + (state.frame[0] ? ` (${state.frame[0]})` : "") + ".png")

				// download
					downloadLink.click()
					setTimeout(() => {
						canvas.remove()
						downloadLink.remove()
					}, 0)
				
				// unset
					setTimeout(() => {
						ELEMENTS.selected.export.removeAttribute("active")
					}, CONSTANTS.actionResetTime)
			} catch (error) {console.log(error)}
		}

	/* requestIcon */
		ELEMENTS.list.request.addEventListener(TRIGGERS.click, requestIcon)
		function requestIcon(event) {
			try {
				// just done
					if (ELEMENTS.list.request.getAttribute("active")) {
						return
					}

				// get search
					const search = ELEMENTS.controls.search.value.trim()
					if (!search) {
						return
					}

				// set state
					ELEMENTS.list.request.setAttribute("active", true)
					ELEMENTS.controls.search.focus()

				// make request
					fetch(`${CONSTANTS.requestURL}${search}`)

				// unset
					setTimeout(() => {
						ELEMENTS.list.request.removeAttribute("active")
					}, CONSTANTS.actionResetTime)
			} catch (error) {console.log(error)}
		}

/*** displays ***/
	/* buildFrame */
		function buildFrame(state) {
			try {
				// inverted
					if (state.mode == "inverted") {
						if (state.border == "padding") {
							return [`inverted ${state.shape}`, (SVG.frames[`background-${state.shape}`] + " ")]
						}
						else if (state.border == "zoomed") {
							return [`inverted ${state.shape} zoomed in`, (SVG.frames[`background-${state.shape}`] + " "), true]
						}
						else {
							return [`inverted ${state.border}-border ${state.shape}`, (SVG.frames[`background-square`] + " " + SVG.frames[`border-${state.border}-${state.shape}`] + " ")]
						}
					}

				// normal
					else {
						if (state.border == "padding") {
							return ["", ""]
						}
						else if (state.border == "zoomed") {
							return ["zoomed in", "", true]
						}
						else {
							return [`${state.border}-border ${state.shape}`, (SVG.frames[`border-${state.border}-${state.shape}`] + " ")]
						}
					}
			} catch (error) {console.log(error)}
		}

	/* displayTiles */
		function displayTiles(state) {
			try {
				// selected?
					const selectedTile = ELEMENTS.list.inner.querySelector(".list-tile[selected]")
					const selectedName = selectedTile?.value

				// icons
					const lowercasedSearch = state.search.toLowerCase()
					const iconKeys = lowercasedSearch ? 
						Object.keys(SVG.icons).filter(key => key.trim().toLowerCase().replace(/-/g, " ").includes(lowercasedSearch)) : 
						Object.keys(SVG.icons)

				// loop
					ELEMENTS.list.inner.innerHTML = ""
					for (const i in iconKeys) {
						const tile = displayTile(state, iconKeys[i])

						if (selectedName && tile.value == selectedName) {
							selectTile({target: tile})
						}
					}
			} catch (error) {console.log(error)}
		}

	/* displayTile */
		function displayTile(state, iconKey) {
			try {
				// build path
					const path = state.frame[1] + SVG.icons[iconKey]

				// tile element
					const tile = document.createElement("button")
						tile.className = "list-tile"
						tile.value = iconKey
						tile.title = iconKey.replace(/-/g, " ")
						tile.addEventListener(TRIGGERS.click, selectTile)
					ELEMENTS.list.inner.appendChild(tile)

						const size = state.frame[2] ? CONSTANTS.svgSizeNoPadding : CONSTANTS.svgSize
						const svg = `<svg viewBox="${size}">` +
							`<path fill="${state.color}" d="${path}"></path>` +
						`</svg>`
						tile.innerHTML = svg

				// return
					return tile
			} catch (error) {console.log(error)}
		}

	/* displayFavicon */
		function displayFavicon(path) {
			try {
				// no path --> random
					if (!path) {
						const iconKeys = Object.keys(SVG.icons)
						path = SVG.icons[iconKeys[Math.floor(Math.random() * iconKeys.length)]]
					}

				// path
					ELEMENTS.favicon.href = `data:image/svg+xml,<svg version='1.1' xmlns='http://www.w3.org/2000/svg' viewBox='${CONSTANTS.svgSizeNoPadding}'>` +
						`<path fill="${CONSTANTS.faviconColor}" d="${path}"></path>` +
					`</svg>`
			} catch (error) {console.log(error)}
		}

