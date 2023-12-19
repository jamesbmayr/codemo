/*** globals ***/
	/* triggers */
		const TRIGGERS = {
			click: "click",
			input: "input"
		}

	/* elements */
		const ELEMENTS = {
			colorCSS: document.querySelector("#color-css"),
			mainColor: document.querySelector("#main-color"),
			tilesContainer: document.querySelector("#tiles"),
			add: document.querySelector("#add")
		}

	/* constants */
		const CONSTANTS = {
			minColumns: 1,
			defaultColumns: 2,
			tileColumns: 6,
			hashDelimiter: "||||",
			hashComponentDelimiter: ":::",
			svg: {
				grid: `<svg viewBox="20 20 60 60"><path d="M 25 27 C 25 30 25 38 25 41 C 25 42 26 43 27 43 C 30 43 43 43 46 43 C 47 43 48 42 48 41 C 48 38 48 30 48 27 C 48 26 47 25 46 25 C 43 25 30 25 27 25 C 26 25 25 26 25 27 Z M 25 59 C 25 62 25 70 25 73 C 25 74 26 75 27 75 C 30 75 33 75 36 75 C 37 75 38 74 38 73 C 38 70 38 62 38 59 C 38 58 37 57 36 57 C 33 57 30 57 27 57 C 26 57 25 58 25 59 Z M 52 59 C 52 62 52 70 52 73 C 52 74 53 75 54 75 C 57 75 70 75 73 75 C 74 75 75 74 75 73 C 75 70 75 62 75 59 C 75 58 74 57 73 57 C 70 57 57 57 54 57 C 53 57 52 58 52 59 Z M 62 27 C 62 30 62 38 62 41 C 62 42 63 43 64 43 C 67 43 70 43 73 43 C 74 43 75 42 75 41 C 75 38 75 30 75 27 C 75 26 74 25 73 25 C 70 25 67 25 64 25 C 63 25 62 26 62 27 Z M 47 58 C 47 55 50 52 53 52 C 57 52 70 52 74 52 C 77 52 80 55 80 58 C 80 62 80 70 80 74 C 80 77 77 80 74 80 C 70 80 57 80 53 80 C 50 80 47 77 47 74 C 47 70 47 62 47 58 Z M 20 58 C 20 55 23 52 26 52 C 30 52 33 52 37 52 C 40 52 43 55 43 58 C 43 62 43 70 43 74 C 43 77 40 80 37 80 C 33 80 30 80 26 80 C 23 80 20 77 20 74 C 20 70 20 62 20 58 Z M 57 26 C 57 23 60 20 63 20 C 67 20 70 20 74 20 C 77 20 80 23 80 26 C 80 30 80 38 80 42 C 80 45 77 48 74 48 C 70 48 67 48 63 48 C 60 48 57 45 57 42 C 57 38 57 30 57 26 Z M 20 26 C 20 23 23 20 26 20 C 30 20 43 20 47 20 C 50 20 53 23 53 26 C 53 30 53 38 53 42 C 53 45 50 48 47 48 C 43 48 30 48 26 48 C 23 48 20 45 20 42 C 20 38 20 30 20 26 Z"></path></svg>`,
				pencil: `<svg viewBox="20 20 60 60"><path d="M 34 66 C 33 68 34 68 35 67 C 38 62 51 41 54 36 C 55 34 54 34 53 35 C 50 40 37 61 34 66 Z M 41 70 C 40 72 41 72 42 71 C 45 66 57 45 60 40 C 61 38 60 38 59 39 C 56 44 44 65 41 70 Z M 32 69 C 31 68.5 31 70 31 74 C 31 76 34 78 37 77 C 43 75 43 75 39 73 C 35 71 35 71 32 69 Z M 50 35 C 53 30 53 30 56 32 C 59 34 59 34 63 36 C 65 37 65 37 63 41 C 60 46 47 69 44 74 C 43 76 43 76 34 79 C 31 80 30 80 30 77 C 30 68 30 68 31 66 C 34 61 47 40 50 35 Z M 64 34 C 60 32 60 32 57 30 C 54 28 54 28 57 23 C 60 18 72 25 69 30 C 66 35 66 35 64 34 Z"></path></svg>`,
				check: `<svg viewBox="20 20 60 60"><path d="M 40 60 C 47 53 63 37 72 28 C 74 26 77 26 79 28 C 81 30 81 33 79 35 C 70 44 54 60 44 70 C 42 72 38 72 36 70 C 26 60 24 58 21 55 C 19 53 19 50 21 48 C 23 46 26 46 28 48 C 31 51 33 53 40 60 Z"></path></svg>`,
				width: `<svg viewBox="30 20 40 60"><path d="M 57 30 C 59 30 60 31 60 33 C 60 45 60 55 60 67 C 60 69 59 70 57 70 C 52 70 48 70 43 70 C 41 70 40 69 40 67 C 40 55 40 45 40 33 C 40 31 41 30 43 30 C 48 30 52 30 57 30 Z"></path></svg>` +
						`<svg viewBox="20 20 60 60"><path d="M 67 30 C 55 30 45 30 33 30 C 31 30 30 31 30 33 C 30 45 30 55 30 67 C 30 69 31 70 33 70 C 45 70 55 70 67 70 C 69 70 70 69 70 67 C 70 55 70 45 70 33 C 70 31 69 30 67 30 Z"></path></svg>` +
						`<svg viewBox="10 20 80 60"><path d="M 20 36 C 20 33 23 30 26 30 C 42 30 58 30 74 30 C 77 30 80 33 80 36 C 80 45 80 55 80 64 C 80 67 77 70 74 70 C 58 70 42 70 26 70 C 23 70 20 67 20 64 C 20 55 20 45 20 36 Z"></path></svg>`,
				left: `<svg viewBox="10 10 80 80"><path d="M 90 50 C 90 53 88 55 85 55 C 70 55 40 55 27 55 C 30 58 32 60 34 62 C 36 64 36 67 34 69 C 32 71 29 71 27 69 C 23 65 18 60 13 55 C 11 53 10 52 10 50 C 10 48 11 47 13 45 C 18 40 23 35 27 31 C 29 29 32 29 34 31 C 36 33 36 36 34 38 C 32 40 30 42 27 45 C 40 45 70 45 85 45 C 88 45 90 47 90 50 Z"></path></svg>`,
				right: `<svg viewBox="10 10 80 80"><path d="M 10 50 C 10 47 12 45 15 45 C 30 45 60 45 73 45 C 70 42 68 40 66 38 C 64 36 64 33 66 31 C 68 29 71 29 73 31 C 77 35 82 40 87 45 C 89 47 90 48 90 50 C 90 52 89 53 87 55 C 82 60 77 65 73 69 C 71 71 68 71 66 69 C 64 67 64 64 66 62 C 68 60 70 58 73 55 C 60 55 30 55 15 55 C 12 55 10 53 10 50 Z"></path></svg>`,
				add: `<svg viewBox="20 20 60 60"><path d="M 55 45 C 62 45 69 45 75 45 C 78 45 80 47 80 50 C 80 53 78 55 75 55 C 69 55 62 55 55 55 C 55 62 55 69 55 75 C 55 78 53 80 50 80 C 47 80 45 78 45 75 C 45 69 45 62 45 55 C 38 55 31 55 25 55 C 22 55 20 53 20 50 C 20 47 22 45 25 45 C 31 45 38 45 45 45 C 45 38 45 31 45 25 C 45 22 47 20 50 20 C 53 20 55 22 55 25 C 55 31 55 38 55 45 Z"></path></svg>`,
				delete: `<svg viewBox="0 20 100 60"><path d="M 82 25 C 70 25 50 25 39 25 C 32 25 21 42 18 46 C 15 50 15 50 18 54 C 21 58 32 75 39 75 C 50 75 70 75 82 75 C 84 75 85 74 85 72 C 85 60 85 40 85 28 C 85 26 84 25 82 25 Z M 60 44 C 65 39 69 35 73 31 C 75 29 77 29 79 31 C 81 33 81 35 79 37 C 75 41 71 45 66 50 C 71 55 75 59 79 63 C 81 65 81 67 79 69 C 77 71 75 71 73 69 C 69 65 65 61 60 56 C 55 61 51 65 48 68 C 45 71 43 71 41 69 C 39 67 39 65 42 62 C 45 59 49 55 54 50 C 49 45 45 41 41 37 C 39 35 39 33 41 31 C 43 29 45 29 47 31 C 51 35 55 39 60 44 Z M 84 20 C 87 20 90 23 90 26 C 90 40 90 60 90 74 C 90 77 87 80 84 80 C 70 80 50 80 38 80 C 29 80 19 64 16 60 C 13 56 10 52 10 50 C 10 48 13 44 16 40 C 19 36 29 20 38 20 C 50 20 70 20 84 20 Z"></path></svg>`,
			}
		}

/*** tools ***/
	/* isURL */
		function isURL(text) {
			try {
				const url = new URL(String(text))
				return true
			} catch (error) {
				return false
			}
		}

	/* getRGBfromHex */
		function getRGBfromHex(hex) {
			try {
				// remove #
					hex = hex.slice(1)

				// split
					const red   = parseInt(hex.slice(0, 2), 16)
					const green = parseInt(hex.slice(2, 4), 16)
					const blue  = parseInt(hex.slice(4, 6), 16)

				// return
					return `${red},${green},${blue}`
			} catch (error) {console.log(error)}
		}

	/* updateHash */
		function updateHash() {
			try {
				// get color
					const color = ELEMENTS.mainColor.value

				// get all urls
					const urlInputs = Array.from(ELEMENTS.tilesContainer.querySelectorAll(".tile-url"))
					const urls = urlInputs.map(input => input.value.trim() || "") || []

				// get all widths
					const widthInputs = Array.from(ELEMENTS.tilesContainer.querySelectorAll(".tile-width"))
					const widths = widthInputs.map(input => Number(input.value) || CONSTANTS.defaultColumns) || []

				// encode
					const hashComponents = []
					for (let i = 0; i < urls.length; i++) {
						const hashComponent = widths[i] + CONSTANTS.hashComponentDelimiter + encodeURIComponent(urls[i])
						hashComponents.push(hashComponent)
					}
					const hash = color + (hashComponents.length ? CONSTANTS.hashDelimiter + hashComponents.join(CONSTANTS.hashDelimiter) : "")

				// update
					window.location.hash = hash
			} catch (error) {console.log(error)}
		}

	/* loadFromHash */
		loadFromHash()
		function loadFromHash() {
			try {
				// get hash
					const hash = window.location.hash
					if (!hash || !hash.slice(1)) {
						return
					}

				// split
					const hashList = hash.split(CONSTANTS.hashDelimiter)
					const color = hashList[0]
					const tiles = hashList.slice(1)

				// load color
					ELEMENTS.mainColor.value = color
					updateColor()

				// load tiles
					for (const t in tiles) {
						const components = tiles[t].split(CONSTANTS.hashComponentDelimiter)
						addTile(null, {
							width: components[0],
							url: components[1] ? decodeURIComponent(components[1]) : ""
						})
					}
			} catch (error) {console.log(error)}
		}

/*** interaction ***/
	/* updateColor */
		ELEMENTS.mainColor.addEventListener(TRIGGERS.input, updateColor)
		function updateColor(event) {
			try {
				// get color
					const hexColor = ELEMENTS.mainColor.value
					const rgbColor = getRGBfromHex(hexColor)

				// set
					ELEMENTS.colorCSS.innerText = `:root { --main-color: rgb(${rgbColor}); --half-color: rgba(${rgbColor}, 0.5); }`
					if (event) {
						updateHash()
					}
			} catch (error) {console.log(error)}
		}

	/* addTile */
		ELEMENTS.add.addEventListener(TRIGGERS.click, addTile)
		function addTile(event, tile) {
			try {
				// create tile
					const tileElement = document.createElement("div")
						tileElement.className = "tile"
						tileElement.setAttribute("mode", tile ? "view" : "edit")
						tileElement.setAttribute("columns", tile ? tile.width : CONSTANTS.defaultColumns)
					ELEMENTS.tilesContainer.insertBefore(tileElement, ELEMENTS.add)

				// edit side
					const editElement = document.createElement("div")
						editElement.className = "tile-edit"
					tileElement.appendChild(editElement)

						const leftButton = document.createElement("button")
							leftButton.className = "tile-left"
							leftButton.title = "move tile left"
							leftButton.innerHTML = CONSTANTS.svg.left
							leftButton.addEventListener(TRIGGERS.click, moveTileLeft)
						editElement.appendChild(leftButton)

						const rightButton = document.createElement("button")
							rightButton.className = "tile-right"
							rightButton.title = "move tile right"
							rightButton.innerHTML = CONSTANTS.svg.right
							rightButton.addEventListener(TRIGGERS.click, moveTileRight)
						editElement.appendChild(rightButton)

						const widthLabel = document.createElement("label")
							widthLabel.className = "tile-width-outer"
						editElement.appendChild(widthLabel)

							const widthSpan = document.createElement("span")
								widthSpan.innerHTML = CONSTANTS.svg.width
							widthLabel.appendChild(widthSpan)

							const widthInput = document.createElement("select")
								widthInput.className = "tile-width"
								widthInput.title = "number of columns"
								widthInput.addEventListener(TRIGGERS.input, updateTileWidth)
								for (let c = CONSTANTS.minColumns; c <= CONSTANTS.tileColumns; c++) {
									const optionElement = document.createElement("option")
										optionElement.value = optionElement.innerText = c
									widthInput.appendChild(optionElement)
								}
								widthInput.value = tile ? tile.width : CONSTANTS.defaultColumns
							widthLabel.appendChild(widthInput)

						const urlLabel = document.createElement("label")
							urlLabel.className = "tile-url-outer"
						editElement.appendChild(urlLabel)
						
							const urlInput = document.createElement("textarea")
								urlInput.className = "tile-url"
								urlInput.placeholder = "url"
								urlInput.setAttribute("autocomplete", "false")
								urlInput.setAttribute("autocapitalize", "false")
								urlInput.setAttribute("spellcheck", "off")
								urlInput.value = tile ? tile.url : ""
							urlLabel.appendChild(urlInput)

						const deleteButton = document.createElement("button")
							deleteButton.className = "tile-delete"
							deleteButton.title = "delete tile"
							deleteButton.innerHTML = CONSTANTS.svg.delete
							deleteButton.addEventListener(TRIGGERS.click, deleteTile)
						editElement.append(deleteButton)

						const updateButton = document.createElement("button")
							updateButton.className = "tile-update"
							updateButton.title = "update tile"
							updateButton.innerHTML = CONSTANTS.svg.check
							updateButton.addEventListener(TRIGGERS.click, toggleTileMode)
						editElement.append(updateButton)

				// view side
					const viewElement = document.createElement("div")
						viewElement.className = "tile-view"
					tileElement.appendChild(viewElement)

						const iframe = document.createElement("iframe")
							iframe.className = "tile-iframe"
							iframe.src = tile ? tile.url : ""
						viewElement.appendChild(iframe)

				// buttons
					const confirmButton = document.createElement("button")
						confirmButton.className = "tile-confirm"
						confirmButton.title = "update tile"
						confirmButton.innerHTML = CONSTANTS.svg.check
						confirmButton.addEventListener(TRIGGERS.click, toggleTileMode)
					tileElement.appendChild(confirmButton)

					const editButton = document.createElement("button")
						editButton.className = "tile-set"
						editButton.title = "edit tile"
						editButton.innerHTML = CONSTANTS.svg.pencil
						editButton.addEventListener(TRIGGERS.click, toggleTileMode)
					tileElement.appendChild(editButton)

				// update URL
					if (!tile) {
						updateHash()
					}
			} catch (error) {console.log(error)}
		}

	/* deleteTile */
		function deleteTile(event) {
			try {
				// get tile
					const tile = event.target.closest(".tile")

				// delete
					tile.remove()

				// update URL
					updateHash()
			} catch (error) {console.log(error)}
		}

	/* updateTileWidth */
		function updateTileWidth(event) {
			try {
				// get tile
					const tile = event.target.closest(".tile")

				// get # columns
					const columns = Math.min(CONSTANTS.tileColumns, Math.max(CONSTANTS.minColumns, Number(event.target.value)))

				// update tile
					tile.setAttribute("columns", columns)

				// update URL
					updateHash()
			} catch (error) {console.log(error)}
		}

	/* moveTileLeft */
		function moveTileLeft(event) {
			try {
				// get tile
					const tile = event.target.closest(".tile")

				// get previous tile
					const previousTile = tile.previousSibling
					if (!previousTile) {
						return
					}

				// move
					ELEMENTS.tilesContainer.insertBefore(tile, previousTile)

				// update URL
					updateHash()
			} catch (error) {console.log(error)}
		}

	/* moveTileRight */
		function moveTileRight(event) {
			try {
				// get tile
					const tile = event.target.closest(".tile")

				// get next tile
					const nextTile = tile.nextSibling
					if (!nextTile || nextTile == ELEMENTS.add) {
						return
					}

				// move
					nextTile.after(tile)

				// update URL
					updateHash()
			} catch (error) {console.log(error)}
		}

	/* toggleTileMode */
		function toggleTileMode(event) {
			try {
				// get tile
					const tile = event.target.closest(".tile")

				// view --> edit
					const mode = tile.getAttribute("mode")
					if (!mode || mode == "view") {
						tile.setAttribute("mode", "edit")
						return
					}

				// edit --> view
					const urlInput = tile.querySelector(".tile-url")
					const iframeElement = tile.querySelector(".tile-iframe")
					if (!urlInput || !iframeElement) {
						return
					}

					const url = urlInput.value.trim()
					iframeElement.src = isURL(url) ? url : ""
					tile.setAttribute("mode", "view")

				// update URL
					updateHash()
			} catch (error) {console.log(error)}
		}
