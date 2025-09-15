/*** globals ***/
	/* triggers */
		const TRIGGERS = {
			resize: "resize",
			click: "click",
			input: "input",
			focus: "focus",
			blur: "blur",
			mousedown: "mousedown",
			mousemove: "mousemove",
			mouseup: "mouseup",
			dragover: "dragover",
			drop: "drop"
		}
		if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
			TRIGGERS.mousedown = "touchstart"
			TRIGGERS.mousemove = "touchmove"
			TRIGGERS.mouseup = "touchend"
		}

	/* elements */
		const ELEMENTS = {
			body: document.body,
			canvas: document.querySelector("#canvas"),
			context: document.querySelector("#canvas").getContext("2d"),
			brushCanvas: document.querySelector("#brush-canvas"),
			brushContext: document.querySelector("#brush-canvas").getContext("2d"),
			settings: {
				toggle: document.querySelector("#settings-toggle"),
				element: document.querySelector("#settings"),
				brush: document.querySelector("#settings-brush"),
				brushRange: document.querySelector("#settings-brush-range"),
				zoom: document.querySelector("#settings-zoom"),
				zoomRange: document.querySelector("#settings-zoom-range"),
				cohesion: document.querySelector("#settings-cohesion"),
				tileTypes: {
					shuffle: document.querySelector("#settings-tiletypes-shuffle"),
					clear: document.querySelector("#settings-tiletypes-clear"),
					random: document.querySelector("#settings-tiletypes-random"),
					list: document.querySelector("#settings-tiletypes-list"),
					add: document.querySelector("#settings-tiletypes-add")
				},
				clear: document.querySelector("#settings-clear"),
				layers: document.querySelector("#settings-layers"),
				layersRange: document.querySelector("#settings-layers-range"),
				seeds: document.querySelector("#settings-seeds"),
				generate: document.querySelector("#settings-generate"),
				icons: {
					section: document.querySelector("#settings-icons"),
					unstamp: document.querySelector("#settings-icons-unstamp"),
					stamp: document.querySelector("#settings-icons-stamp"),
					color: document.querySelector("#settings-icons-color"),
					size: document.querySelector("#settings-icons-size"),
					sizeRange: document.querySelector("#settings-icons-size-range"),
					search: document.querySelector("#settings-icons-search"),
					preview: document.querySelector("#settings-icons-preview"),
					previewPath: document.querySelector("#settings-icons-preview-path"),
					results: document.querySelector("#settings-icons-results")
				}
			},
			export: document.querySelector("#export"),
			download: document.querySelector("#download"),
			upload: document.querySelector("#upload-file"),
			undo: document.querySelector("#undo"),
			redo: document.querySelector("#redo")
		}

	/* constants */
		const CONSTANTS = {
			hexRatioX: 0.8660254,
			hexRatioY: 0.75,
			animationTime: 0, // ms
			sidebarWidth: 300, // px
			desktopScreenWidth: 800, // px
			lineWidth: 1.5, // px
			maxColorWeight: 99, // number of tiles color is added to tile types
			hoverColor: "#04b1ff11", // hexadecimal
			hoverColorRemove: "#d94c4c44", // hexadecimal
			corners: {
				left:      [-1,  0],
				upLeft:    [ 0, -1],
				upRight:   [ 1, -1],
				right:     [ 1,  0],
				downRight: [ 0,  1],
				downLeft:  [-1,  1]
			},
			sides: {
				upLeft:    [-1, -1],
				up:        [ 1, -2],
				upRight:   [ 2, -1],
				downRight: [ 1,  1],
				down:      [-1,  2],
				downLeft:  [-2,  1]
			},
			directions: [
				 1, // clockwise
				-1  // counterclockwise
			],
			startX: 0, // coordinates
			startY: 0, // coordinates
			startCorner: "downRight", // corner
			layers: 80, // rounds of hexagons
			seeds: 3, // hexagon seeds
			seedFactor: 1 / 10, // hexagons ratio
			seedOffsetFactor: 1, // hexagons ratio
			seedLayerOffsets: [4, 3, 6, 4, 8], // hexagons
			density: 255, // hexagons across the screen
			maxDensity: 500, // hexagons across the screen
			zoomSteps: 100, // steps
			brushSize: 5, // rounds of hexagons
			cohesion: 2000, // number of times each neighbor is added to tile types
			tileTypeDefaults: {
				name: "",
				color: "#dddddd",
				weight: 0,
			},
			tileTypes: {
				[`${generateRandom()}`]: {name: "sea",       color: "#5e8eb0", weight: generateRandom(10, 20)},
				[`${generateRandom()}`]: {name: "stone",     color: "#6b6e70", weight: generateRandom(4, 6)},
				[`${generateRandom()}`]: {name: "forest",    color: "#106542", weight: generateRandom(1, 3)},
				[`${generateRandom()}`]: {name: "swamp",     color: "#879b8f", weight: generateRandom(1, 3)},
				[`${generateRandom()}`]: {name: "grassland", color: "#a1c49c", weight: generateRandom(4, 6)},
				[`${generateRandom()}`]: {name: "sand",      color: "#cec788", weight: generateRandom(4, 6)},
				[`${generateRandom()}`]: {name: "dirt",      color: "#655645", weight: generateRandom(1, 3)},
				[`${generateRandom()}`]: {name: "wasteland", color: "#9d7215", weight: generateRandom(0, 1)},
				[`${generateRandom()}`]: {name: "lavaplain", color: "#8d2a2a", weight: generateRandom(0, 1)},
				[`${generateRandom()}`]: {name: "ice",       color: "#dcdcef", weight: generateRandom(0, 1)},
			},
			iconDefaults: {
				name: "tech-gui-location-marker-circle",
				path: "M 39 40 C 39 46 44 51 50 51 C 56 51 61 46 61 40 C 61 34 56 29 50 29 C 44 29 39 34 39 40 Z M 65 54 C 59 64 55 71 54 73 C 50 80 50 80 46 73 C 45 71 41 64 35 54 C 32 49 30 45 30 40 C 30 29 39 20 50 20 C 61 20 70 29 70 40 C 70 45 68 49 65 54 Z",
				color: "#111111",
				size: 3, // hexagons
			},
			svgSize: "0 0 100 100", // svg units
			svg: {
				x: `<svg viewBox="10 10 80 80"><path d="M 50 43 C 55 38 60 33 64 29 C 66 27 69 27 71 29 C 73 31 73 34 71 36 C 67 40 62 45 57 50 C 62 55 67 60 71 64 C 73 66 73 69 71 71 C 69 73 66 73 64 71 C 60 67 55 62 50 57 C 45 62 40 67 36 71 C 34 73 31 73 29 71 C 27 69 27 66 29 64 C 33 60 38 55 43 50 C 38 45 33 40 29 36 C 27 34 27 31 29 29 C 31 27 34 27 36 29 C 40 33 45 38 50 43 Z"></path></svg>`
			}
		}

	/* state */
		const STATE = {
			pxPerHexRadius: 1, // pixels per hexagon radius
			settings: {
				layers: CONSTANTS.layers,
				seeds: CONSTANTS.seeds,
				density: CONSTANTS.density,
				cohesion: CONSTANTS.cohesion,
				tileTypes: {...CONSTANTS.tileTypes},
				icons: {...CONSTANTS.iconDefaults}
			},
			weightedColors: [],
			hexagons: {},
			icons: {},
			images: {},
			history: ["{}"],
			historyIndex: 0,
			brush: {
				pressed: false,
				x: 0,
				y: 0,
				tileType: "shuffle",
				size: CONSTANTS.brushSize
			}
		}

/*** helpers ***/
	/* generateRandom */
		function generateRandom(start, end) {
			try {
				// number
					if (!isNaN(start) && !isNaN(end)) {
						return Math.floor(Math.random() * (end - start + 1)) + start
					}

				// string
					return Number(Math.random() * 10e20).toString(36).slice(1, 9)
			} catch (error) {console.log(error)}
		}

	/* chooseRandom */
		function chooseRandom(list) {
			try {
				if (!Array.isArray(list)) {
					return list
				}
				return list[Math.floor(Math.random() * list.length)]
			} catch (error) {console.log(error)}
		}

	/* sleep */
		async function sleep(time) {
			return new Promise(resolve => setTimeout(resolve, time))
		}

	/* getCoordinates */
		function getCoordinates({x, y}) {
			try {
				// sidebar
					if (window.innerWidth >= CONSTANTS.desktopScreenWidth || !ELEMENTS.settings.element.getAttribute("collapsed")) {
						x -= CONSTANTS.sidebarWidth
					}

				// convert to canvas coordinates
					const canvasX = x - ELEMENTS.canvas.width  / 2
					const canvasY = y - ELEMENTS.canvas.height / 2

				// convert to hex coordinates
					const hexY = Math.round(canvasY / (CONSTANTS.hexRatioY * STATE.pxPerHexRadius * 2))
					const hexX = Math.round(canvasX / (CONSTANTS.hexRatioX * STATE.pxPerHexRadius * 2) - hexY / 2)

				// return
					return {
						x: hexX,
						y: hexY
					}
			} catch (error) {console.log(error)}
		}

/*** menu ***/
	/** tileTypes **/
		/* displayTileTypes */
			displayTileTypes()
			function displayTileTypes() {
				try {
					// loop through
						for (const t in STATE.settings.tileTypes) {
							addTileType(null, t)
						}
				} catch (error) {console.log(error)}
			}

		/* addTileType */
			ELEMENTS.settings.tileTypes.add.addEventListener(TRIGGERS.click, addTileType)
			function addTileType(event, tileTypeId) {
				try {
					// no tileTypeId?
						if (!tileTypeId) {
							tileTypeId = generateRandom()
							STATE.settings.tileTypes[tileTypeId] = { ...CONSTANTS.tileTypeDefaults }
						}

					// new row
						const rowElement = document.createElement("label")
							rowElement.className = "settings-tiletype-row"
							rowElement.setAttribute("tiletype", tileTypeId)
						ELEMENTS.settings.tileTypes.list.appendChild(rowElement)

					// radio
						const radioInput = document.createElement("input")
							radioInput.className = "settings-tiletype-radio"
							radioInput.type = "radio"
							radioInput.name = "tiletype"
							radioInput.value = tileTypeId
							radioInput.addEventListener(TRIGGERS.input, updateTileTypeSelection)
						rowElement.appendChild(radioInput)

					// name
						const nameInput = document.createElement("input")
							nameInput.className = "settings-tiletype-name"
							nameInput.type = "text"
							nameInput.placeholder = "name"
							nameInput.setAttribute("autocomplete", "off")
							nameInput.setAttribute("autocapitalize", "off")
							nameInput.setAttribute("spellcheck", "false")
							nameInput.addEventListener(TRIGGERS.input, updateTileTypeName)
							nameInput.value = STATE.settings.tileTypes[tileTypeId].name
						rowElement.appendChild(nameInput)

					// color
						const colorInput = document.createElement("input")
							colorInput.className = "settings-tiletype-color"
							colorInput.type = "color"
							colorInput.addEventListener(TRIGGERS.input, updateTileTypeColor)
							colorInput.value = STATE.settings.tileTypes[tileTypeId].color
						rowElement.appendChild(colorInput)

					// range
						const weightRange = document.createElement("input")
							weightRange.className = "settings-tiletype-weight-range"
							weightRange.type = "range"
							weightRange.step = 1
							weightRange.min = 0
							weightRange.max = CONSTANTS.maxColorWeight
							weightRange.addEventListener(TRIGGERS.input, updateTileTypeWeightRange)
							weightRange.value = STATE.settings.tileTypes[tileTypeId].weight
						rowElement.appendChild(weightRange)

					// weight
						const weightInput = document.createElement("input")
							weightInput.className = "settings-tiletype-weight"
							weightInput.type = "number"
							weightInput.step = 1
							weightInput.min = 0
							weightInput.max = CONSTANTS.maxColorWeight
							weightInput.addEventListener(TRIGGERS.input, updateTileTypeWeight)
							weightInput.value = STATE.settings.tileTypes[tileTypeId].weight
						rowElement.appendChild(weightInput)

					// remove
						const removeButton = document.createElement("button")
							removeButton.className = "settings-tiletype-remove"
							removeButton.innerHTML = CONSTANTS.svg.x
							removeButton.addEventListener(TRIGGERS.click, removeTileType)
						rowElement.appendChild(removeButton)
				} catch (error) {console.log(error)}
			}

		/* updateTileTypeSelection */
			ELEMENTS.settings.tileTypes.shuffle.addEventListener(TRIGGERS.input, updateTileTypeSelection)
			ELEMENTS.settings.tileTypes.clear.addEventListener(TRIGGERS.input, updateTileTypeSelection)
			ELEMENTS.settings.tileTypes.random.addEventListener(TRIGGERS.input, updateTileTypeSelection)
			ELEMENTS.settings.icons.unstamp.addEventListener(TRIGGERS.input, updateTileTypeSelection)
			ELEMENTS.settings.icons.stamp.addEventListener(TRIGGERS.input, updateTileTypeSelection)
			function updateTileTypeSelection(event) {
				try {
					// get value
						const radioInput = event.target.closest("input[type='radio']")
						const value = radioInput.value

					// special
						if (["shuffle", "clear", "random", "unstamp", "stamp"].includes(value)) {
							STATE.brush.tileType = value
							return
						}

					// other
						if (!STATE.settings.tileTypes[value]) {
							return
						}
						STATE.brush.tileType = value
				} catch (error) {console.log(error)}
			}

		/* updateTileTypeName */
			function updateTileTypeName(event) {
				try {
					// get tileTypeId
						const input = event.target.closest("input")
						const tileTypeId = input.closest(".settings-tiletype-row").getAttribute("tiletype")

					// get value
						const name = input.value.trim()

					// save
						STATE.settings.tileTypes[tileTypeId].name = name
				} catch (error) {console.log(error)}
			}

		/* updateTileTypeColor */
			function updateTileTypeColor(event) {
				try {
					// get tileTypeId
						const input = event.target.closest("input")
						const tileTypeId = input.closest(".settings-tiletype-row").getAttribute("tiletype")

					// get value
						const color = input.value

					// save
						STATE.settings.tileTypes[tileTypeId].color = color

					// update weighted colors
						generateWeightedColors()
				} catch (error) {console.log(error)}
			}

		/* updateTileTypeWeight */
			function updateTileTypeWeight(event) {
				try {
					// get tileTypeId
						const input = event.target.closest("input")
						const range = input.closest(".settings-tiletype-row").querySelector(".settings-tiletype-weight-range")
						const tileTypeId = input.closest(".settings-tiletype-row").getAttribute("tiletype")

					// get value
						const weight = Math.floor(Number(input.value))

					// save
						STATE.settings.tileTypes[tileTypeId].weight = weight

					// update range
						range.value = weight

					// update weighted colors
						generateWeightedColors()
				} catch (error) {console.log(error)}
			}

		/* updateTileTypeWeightRange */
			function updateTileTypeWeightRange(event) {
				try {
					// get tileTypeId
						const range = event.target.closest("input")
						const input = range.closest(".settings-tiletype-row").querySelector(".settings-tiletype-weight")
						const tileTypeId = range.closest(".settings-tiletype-row").getAttribute("tiletype")

					// get value
						const weight = Math.floor(Number(range.value))

					// save
						STATE.settings.tileTypes[tileTypeId].weight = weight

					// update input
						input.value = weight

					// update weighted colors
						generateWeightedColors()
				} catch (error) {console.log(error)}
			}

		/* removeTileType */
			function removeTileType(event) {
				try {
					// get tileTypeId
						const row = event.target.closest(".settings-tiletype-row")
						const tileTypeId = row.getAttribute("tiletype")

					// remove
						delete STATE.settings.tileTypes[tileTypeId]
						row.remove()

					// update weighted colors
						generateWeightedColors()
				} catch (error) {console.log(error)}
			}

	/** icons **/
		/* searchIcons */
			ELEMENTS.settings.icons.search.addEventListener(TRIGGERS.focus, searchIcons)
			ELEMENTS.settings.icons.search.addEventListener(TRIGGERS.input, searchIcons)
			function searchIcons(event) {
				try {
					// not yet searching
						if (!ELEMENTS.settings.icons.results.getAttribute("visible")) {
							ELEMENTS.settings.icons.search.value = ""
							ELEMENTS.settings.icons.search.focus()
							ELEMENTS.settings.icons.results.setAttribute("visible", true)
						}

					// redo search
						ELEMENTS.settings.icons.results.innerHTML = ""

					// get searchterm
						const search = ELEMENTS.settings.icons.search.value.toLowerCase().trim().replace(/-/g, " ")
						const iconKeys = search ? 
							Object.keys(SVG.icons).filter(key => key.trim().toLowerCase().replace(/-/g, " ").includes(search)) : 
							Object.keys(SVG.icons)

					// results
						for (const k in iconKeys) {
							const path = SVG.icons[iconKeys[k]]
							const iconHTML = `<svg viewBox="${CONSTANTS.svgSize}"><path d="${path}"></path></svg>`

							const result = document.createElement("button")
								result.className = "settings-icons-result"
								result.title = iconKeys[k].replace(/-/g, " ")
								result.value = iconKeys[k]
								result.innerHTML = iconHTML
								result.addEventListener(TRIGGERS.click, updateIcon)
								result.addEventListener(TRIGGERS.blur, revertIconsSearch)
							ELEMENTS.settings.icons.results.appendChild(result)
						}
				} catch (error) {console.log(error)}
			}

		/* revertIconsSearch */
			window.addEventListener(TRIGGERS.mousedown, revertIconsSearch)
			ELEMENTS.settings.icons.search.addEventListener(TRIGGERS.blur, revertIconsSearch)
			function revertIconsSearch(event) {
				try {
					setTimeout(() => {
						// still within search
							if (document.activeElement && document.activeElement.closest("#settings-icons")) {
								return
							}
							if (event.target && event.target.closest("#settings-icons")) {
								return
							}

						// clicking away
							ELEMENTS.settings.icons.search.value = STATE.settings.icons.name.replace(/-/g, " ")
							ELEMENTS.settings.icons.results.innerHTML = ""
							ELEMENTS.settings.icons.results.removeAttribute("visible", true)
					}, 0)
				} catch (error) {console.log(error)}
			}

		/* updateIcon */
			function updateIcon(event) {
				try {
					// select icon
						const name = event.target.closest(".settings-icons-result").value

					// in SVG?
						const path = SVG.icons[name]
						if (!path) {
							return
						}

					// set values
						STATE.settings.icons.name = name
						STATE.settings.icons.path = path

					// set search bar
						ELEMENTS.settings.icons.search.value = STATE.settings.icons.name.replace(/-/g, " ")
						ELEMENTS.settings.icons.results.innerHTML = ""
						ELEMENTS.settings.icons.results.removeAttribute("visible")
				} catch (error) {console.log(error)}
			}

		/* updateIconColor */
			ELEMENTS.settings.icons.color.addEventListener(TRIGGERS.input, updateIconColor)
			function updateIconColor(event) {
				try {
					// get value
						const color = ELEMENTS.settings.icons.color.value

					// save
						STATE.settings.icons.color = color

					// preview
						updateIconPreview()
				} catch (error) {console.log(error)}
			}

		/* updateIconSize */
			ELEMENTS.settings.icons.size.addEventListener(TRIGGERS.input, updateIconSize)
			function updateIconSize(event) {
				try {
					// get value
						const size = Math.floor(Number(ELEMENTS.settings.icons.size.value))

					// save
						STATE.settings.icons.size = size

					// update range
						ELEMENTS.settings.icons.sizeRange.value = size
				} catch (error) {console.log(error)}
			}

		/* updateIconSizeRange */
			ELEMENTS.settings.icons.sizeRange.addEventListener(TRIGGERS.input, updateIconSizeRange)
			function updateIconSizeRange(event) {
				try {
					// get value
						const size = Math.floor(Number(ELEMENTS.settings.icons.sizeRange.value))

					// save
						STATE.settings.icons.size = size

					// update range
						ELEMENTS.settings.icons.size.value = size
				} catch (error) {console.log(error)}
			}

		/* updateIconPreview */
			function updateIconPreview() {
				try {
					// parameters
						const color = STATE.settings.icons.color
						const name  = STATE.settings.icons.name
						const path  = STATE.settings.icons.path

					// set path
						ELEMENTS.settings.icons.previewPath.setAttribute("d", path)

					// set color
						ELEMENTS.settings.icons.preview.style.color = color
				} catch (error) {console.log(error)}
			}

	/** other settings **/
		/* updateZoom */
			ELEMENTS.settings.zoom.addEventListener(TRIGGERS.input, updateZoom)
			function updateZoom(event) {
				try {
					// get value
						const zoom = Math.floor(Number(ELEMENTS.settings.zoom.value) || 1)

					// update
						const density = (CONSTANTS.maxDensity / CONSTANTS.zoomSteps) * (CONSTANTS.zoomSteps + 1 - zoom)
						STATE.settings.density = density

					// set range
						ELEMENTS.settings.zoomRange.value = zoom

					// recalculate
						STATE.pxPerHexRadius = (Math.min(ELEMENTS.canvas.width, ELEMENTS.canvas.height) / STATE.settings.density)

					// redraw
						clearCanvas()
						drawMap(STATE)
						drawBrush()
				} catch (error) {console.log(error)}
			}

		/* updateZoomRange */
			ELEMENTS.settings.zoomRange.addEventListener(TRIGGERS.input, updateZoomRange)
			function updateZoomRange(event) {
				try {
					// get value
						const zoom = Math.floor(Number(ELEMENTS.settings.zoomRange.value) || 1)

					// update
						const density = (CONSTANTS.maxDensity / CONSTANTS.zoomSteps) * (CONSTANTS.zoomSteps + 1 - zoom)
						STATE.settings.density = density

					// set input
						ELEMENTS.settings.zoom.value = zoom

					// recalculate
						STATE.pxPerHexRadius = (Math.min(ELEMENTS.canvas.width, ELEMENTS.canvas.height) / STATE.settings.density)

					// redraw
						clearCanvas()
						drawMap(STATE)
						drawBrush()
				} catch (error) {console.log(error)}
			}

		/* updateLayers */
			ELEMENTS.settings.layers.addEventListener(TRIGGERS.input, updateLayers)
			function updateLayers(event) {
				try {
					// get value
						const layers = Math.floor(Number(ELEMENTS.settings.layers.value) || 0)

					// set range
						ELEMENTS.settings.layersRange.value = layers

					// update
						STATE.settings.layers = layers
				} catch (error) {console.log(error)}
			}

		/* updateLayersRange */
			ELEMENTS.settings.layersRange.addEventListener(TRIGGERS.input, updateLayersRange)
			function updateLayersRange(event) {
				try {
					// get value
						const layers = Math.floor(Number(ELEMENTS.settings.layersRange.value) || 0)

					// set input
						ELEMENTS.settings.layers.value = layers

					// update
						STATE.settings.layers = layers
				} catch (error) {console.log(error)}
			}

		/* updateCohesion */
			ELEMENTS.settings.cohesion.addEventListener(TRIGGERS.input, updateCohesion)
			function updateCohesion(event) {
				try {
					// get value
						const cohesion = Math.floor(Number(ELEMENTS.settings.cohesion.value) || 0)

					// update
						STATE.settings.cohesion = cohesion
				} catch (error) {console.log(error)}
			}

		/* updateSeeds */
			ELEMENTS.settings.seeds.addEventListener(TRIGGERS.input, updateSeeds)
			function updateSeeds(event) {
				try {
					// get value
						const seeds = Number(ELEMENTS.settings.seeds.value) || 0

					// update
						STATE.settings.seeds = seeds
				} catch (error) {console.log(error)}
			}

		/* updateBrush */
			ELEMENTS.settings.brush.addEventListener(TRIGGERS.input, updateBrush)
			function updateBrush(event) {
				try {
					// get value
						const brushSize = Math.floor(Number(ELEMENTS.settings.brush.value) || 0)

					// update
						STATE.brush.size = brushSize

					// set range
						ELEMENTS.settings.brushRange.value = brushSize
				} catch (error) {console.log(error)}
			}

		/* updateBrushRange */
			ELEMENTS.settings.brushRange.addEventListener(TRIGGERS.input, updateBrushRange)
			function updateBrushRange(event) {
				try {
					// get value
						const brushSize = Math.floor(Number(ELEMENTS.settings.brushRange.value) || 0)

					// update
						STATE.brush.size = brushSize

					// set input
						ELEMENTS.settings.brush.value = brushSize
				} catch (error) {console.log(error)}
			}

	/** files **/
		/* exportPNG */
			ELEMENTS.export.addEventListener(TRIGGERS.click, exportPNG)
			function exportPNG(event) {
				try {
					// no map
						if (!Object.keys(STATE.hexagons).length) {
							return
						}

					// package up
						const exportLink = document.createElement("a")
							exportLink.id = "export-link"
							exportLink.setAttribute("href", ELEMENTS.canvas.toDataURL("image/png"))
							exportLink.setAttribute("download", "mapMaker_" + (new Date().getTime()) + ".png")
							exportLink.addEventListener(TRIGGERS.click, () => {
								ELEMENTS.body.removeChild(exportLink)
							})
					
					// click
						ELEMENTS.body.appendChild(exportLink)
						exportLink.click()
				} catch (error) {console.log(error)}
			}

		/* downloadJSON */
			ELEMENTS.download.addEventListener(TRIGGERS.click, downloadJSON)
			function downloadJSON(event) {
				try {
					// no map
						if (!Object.keys(STATE.hexagons).length) {
							return
						}

					// package up
						const downloadLink = document.createElement("a")
							downloadLink.id = "download-link"
							downloadLink.setAttribute("href", "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
								project: "mapMaker",
								hexagons: STATE.hexagons,
								icons: STATE.icons
							})))
							downloadLink.setAttribute("download", "mapMaker_" + (new Date().getTime()) + ".json")
							downloadLink.addEventListener(TRIGGERS.click, () => {
								ELEMENTS.body.removeChild(downloadLink)
							})
					
					// click
						ELEMENTS.body.appendChild(downloadLink)
						downloadLink.click()
				} catch (error) {console.log(error)}
			}

		/* uploadJSON */
			ELEMENTS.upload.addEventListener(TRIGGERS.input, uploadJSON)
			function uploadJSON(event) {
				try {
					// get file
						const file = ELEMENTS.upload.files[0]

					// read file
						const reader = new FileReader()
						reader.readAsText(file)
						reader.onload = event => {
							// try to parse data
								const rawData = String(event.target.result)
								if (!rawData || !rawData.length) {
									return
								}

							// save
								loadHistory(rawData)
								saveHistory()

							// clear & redraw
								setTimeout(() => {
									clearCanvas()
									drawMap(STATE)
								})

							// reset upload
								ELEMENTS.upload.value = null
						}
				} catch (error) {console.log(error)}
			}

		/* dragFile */
			ELEMENTS.body.addEventListener(TRIGGERS.dragover, dragFile)
			function dragFile(event) {
				try {
					event.preventDefault()
				} catch (error) {console.log(error)}
			}

		/* dropFile */
			ELEMENTS.body.addEventListener(TRIGGERS.drop, dropFile)
			function dropFile(event) {
				try {
					// prevent default
						event.preventDefault()
						if (!event.dataTransfer || !event.dataTransfer.items) {
							return
						}

					// file
						const file = [...event.dataTransfer.items][0].getAsFile()
						if (!file) {
							return
						}
						if (file.type !== "application/json") {
							return
						}

					// import
						const reader = new FileReader()
						reader.readAsText(file)
						reader.onload = event => {
							// try to parse data
								const rawData = String(event.target.result)
								if (!rawData || !rawData.length) {
									return
								}

							// save
								loadHistory(rawData)
								saveHistory()

							// clear & redraw
								setTimeout(() => {
									clearCanvas()
									drawMap(STATE)
								})

							// reset upload
								ELEMENTS.upload.value = null
						}
				} catch (error) {console.log(error)}
			}

	/** toggle **/
		/* toggleSettings */
			ELEMENTS.settings.toggle.addEventListener(TRIGGERS.click, toggleSettings)
			function toggleSettings(event) {
				try {
					// get status
						const status = ELEMENTS.settings.element.getAttribute("collapsed")

					// update
						if (!status) {
							ELEMENTS.settings.element.setAttribute("collapsed", true)
						}
						else {
							ELEMENTS.settings.element.removeAttribute("collapsed")
						}
				} catch (error) {console.log(error)}
			}

	/** history **/
		/* saveHistory */
			function saveHistory() {
				try {
					// stringify
						const historyState = JSON.stringify({
							hexagons: STATE.hexagons,
							icons:    STATE.icons
						})

					// eliminate pending history
						while (STATE.history.length - 1 > STATE.historyIndex) {
							STATE.history.pop()
						}

					// save
						STATE.history.push(historyState)
						STATE.historyIndex = STATE.history.length - 1
				} catch (error) {console.log(error)}
			}

		/* undoHistory */
			ELEMENTS.undo.addEventListener(TRIGGERS.click, undoHistory)
			function undoHistory() {
				try {
					// decrement state
						STATE.historyIndex = Math.max(0, STATE.historyIndex - 1)
						loadHistory(STATE.history[STATE.historyIndex])	
				
					// clear & redraw
						setTimeout(() => {
							clearCanvas()
							drawMap(STATE)
						})
				} catch (error) {console.log(error)}
			}

		/* redoHistory */
			ELEMENTS.redo.addEventListener(TRIGGERS.click, redoHistory)
			function redoHistory() {
				try {
					// increment state
						STATE.historyIndex = Math.min(STATE.history.length - 1, STATE.historyIndex + 1)
						loadHistory(STATE.history[STATE.historyIndex])						

					// clear & redraw
						setTimeout(() => {
							clearCanvas()
							drawMap(STATE)
						})
				} catch (error) {console.log(error)}
			}

		/* loadHistory */
			function loadHistory(jsonData) {
				try {
					// data
						const historyState = JSON.parse(jsonData)

					// set state
						STATE.hexagons = historyState.hexagons
						STATE.icons = historyState.icons

					// load images
						for (const i in STATE.icons) {
							const color = STATE.icons[i].color
							const name  = STATE.icons[i].name
							const path  = STATE.icons[i].path

							if (!STATE.images[`${color} - ${name}`]) {
								STATE.images[`${color} - ${name}`] = new Image()
								STATE.images[`${color} - ${name}`].src = `data:image/svg+xml,<svg version='1.1' xmlns='http://www.w3.org/2000/svg' viewBox='${CONSTANTS.svgSize}'>` + 
									`<path d='${path}' fill='${encodeURIComponent(color)}'></path>` + 
								`</svg>`
							}
						}
				} catch (error) {console.log(error)}
			}

/*** assetManager ***/
	/* retrieveAsset */
		window.ASSETS_J.retrieveAsset = function(name, type, data) {
			try {
				// json
					loadHistory(data)
					saveHistory()
					setTimeout(() => {
						clearCanvas()
						drawMap(STATE)
					})
			} catch (error) {console.log(error)}
		}

	/* storeAsset */
		window.ASSETS_J.storeAsset = async function(type) {
			try {
				// json
					if (type == "json") {
						return {
							name: "mapMaker_" + (new Date().getTime()) + ".json",
							type: "json",
							data: JSON.stringify({
								project: "mapMaker",
								hexagons: STATE.hexagons,
								icons: STATE.icons
							})
						}
					}

				// png
					if (type == "png") {
						return {
							name: "mapMaker_" + (new Date().getTime()) + ".png",
							type: "png",
							data: ELEMENTS.canvas.toDataURL("image/png")
						}
					}
			} catch (error) {console.log(error)}
		}

/*** map ***/
	/** helpers **/
		/* generateWeightedColors */
			generateWeightedColors()
			function generateWeightedColors() {
				try {
					// reset weighted colors
						STATE.weightedColors = []

					// loop through tile types
						for (const t in STATE.settings.tileTypes) {
							const {name, weight, color} = STATE.settings.tileTypes[t]

							// add color once per weight number
								for (let i = 0; i < weight; i++) {
									STATE.weightedColors.push(color)
								}
						}
				} catch (error) {console.log(error)}
			}

		/* generateNeighborWeightedColors */
			function generateNeighborWeightedColors({x, y}) {
				try {
					// weighted colors
						let colors = [...STATE.weightedColors]

					// neighbors
						const neighbors = [
							STATE.hexagons[`${x - 1},${y    }`],
							STATE.hexagons[`${x    },${y - 1}`],
							STATE.hexagons[`${x + 1},${y - 1}`],
							STATE.hexagons[`${x + 1},${y    }`],
							STATE.hexagons[`${x    },${y + 1}`],
							STATE.hexagons[`${x - 1},${y + 1}`]
						]

					// add to array
						for (const n in neighbors) {
							const neighborColor = neighbors[n] ? neighbors[n].color : null
							if (neighborColor) {
								colors = colors.concat(new Array(STATE.settings.cohesion).fill(neighborColor))
							}
						}

					// return
						return colors
				} catch (error) {console.log(error)}
			}

		/* generateSequence */
			function generateSequence({corner, direction}) {
				try {
					// default
						let sequence = Object.keys(CONSTANTS.corners)

					// reverse
						if (direction == -1) {
							sequence.reverse()
						}

					// shuffle to corner
						while (sequence[sequence.length - 2] !== corner) {
							sequence.unshift(sequence.pop())
						}

					// return
						return sequence
				} catch (error) {console.log(error)}
			}

	/** grid **/
		/* clearMap */
			ELEMENTS.settings.clear.addEventListener(TRIGGERS.click, clearMap)
			function clearMap() {
				try {
					// delete everything
						STATE.hexagons = {}
						STATE.icons = {}
						saveHistory()

					// redraw
						clearCanvas()
				} catch (error) {console.log(error)}
			}	

		/* generateMap */
			ELEMENTS.settings.generate.addEventListener(TRIGGERS.click, generateMap)
			generateMap()
			async function generateMap() {
				try {
					// seeds
						if (STATE.settings.seeds) {
							await generateSeeds({
								seeds: STATE.settings.seeds,
								layers: STATE.settings.layers,
								animate: true
							})
						}

					// generate full map
						await generateSection({
							centerX: CONSTANTS.startX,
							centerY: CONSTANTS.startY,
							layers: STATE.settings.layers,
							tileType: "shuffle",
							animate: true
						})

					// save history
						saveHistory()
				} catch (error) {console.log(error)}
			}

		/* generateSeeds */
			async function generateSeeds({seeds, layers, animate}) {
				try {
					// calculate seed layers
						const seedLayers = Math.floor(STATE.settings.layers * CONSTANTS.seedFactor)
						const seedOffset = seedLayers * CONSTANTS.seedOffsetFactor

					// 4
						if (seeds >= 4) {
							for (const c in CONSTANTS.corners) {
								generateSection({
									centerX: CONSTANTS.corners[c][0] * seedLayers * CONSTANTS.seedLayerOffsets[4] + generateRandom(-seedOffset, seedOffset),
									centerY: CONSTANTS.corners[c][1] * seedLayers * CONSTANTS.seedLayerOffsets[4] + generateRandom(-seedOffset, seedOffset),
									layers: seedLayers,
									tileType: "shuffle",
									animate
								})
							}

							for (const s in CONSTANTS.sides) {
								generateSection({
									centerX: CONSTANTS.sides[s][0] * seedLayers * CONSTANTS.seedLayerOffsets[3] + generateRandom(-seedOffset, seedOffset),
									centerY: CONSTANTS.sides[s][1] * seedLayers * CONSTANTS.seedLayerOffsets[3] + generateRandom(-seedOffset, seedOffset),
									layers: seedLayers,
									tileType: "shuffle",
									animate
								})
							}
						}

					// 3
						if (seeds >= 3) {
							for (const c in CONSTANTS.corners) {
								generateSection({
									centerX: CONSTANTS.corners[c][0] * seedLayers * CONSTANTS.seedLayerOffsets[2] + generateRandom(-seedOffset, seedOffset),
									centerY: CONSTANTS.corners[c][1] * seedLayers * CONSTANTS.seedLayerOffsets[2] + generateRandom(-seedOffset, seedOffset),
									layers: seedLayers,
									tileType: "shuffle",
									animate
								})
							}
						}

					// 2
						if (seeds >= 2) {
							for (const s in CONSTANTS.sides) {
								generateSection({
									centerX: CONSTANTS.sides[s][0] * seedLayers * CONSTANTS.seedLayerOffsets[1] + generateRandom(-seedOffset, seedOffset),
									centerY: CONSTANTS.sides[s][1] * seedLayers * CONSTANTS.seedLayerOffsets[1] + generateRandom(-seedOffset, seedOffset),
									layers: seedLayers,
									tileType: "shuffle",
									animate
								})
							}
						}

					// 1
						if (seeds >= 1) {
							for (const c in CONSTANTS.corners) {
								generateSection({
									centerX: CONSTANTS.corners[c][0] * seedLayers * CONSTANTS.seedLayerOffsets[0] + generateRandom(-seedOffset, seedOffset),
									centerY: CONSTANTS.corners[c][1] * seedLayers * CONSTANTS.seedLayerOffsets[0] + generateRandom(-seedOffset, seedOffset),
									layers: seedLayers,
									tileType: "shuffle",
									animate
								})
							}
						}

					// center
						await generateSection({
							centerX: generateRandom(-seedOffset, seedOffset),
							centerY: generateRandom(-seedOffset, seedOffset),
							layers: seedLayers,
							tileType: "shuffle",
							animate
						})
				} catch (error) {console.log(error)}
			}

		/* generateSection */
			async function generateSection({centerX, centerY, layers, tileType, animate}) {
				try {
					// spiral out
						for (let layer = 0; layer < layers; layer++) {
							// generate
								generateLayer({
									centerX,
									centerY,
									layer,
									tileType
								})

							// draw
								if (animate) {
									drawMap(STATE)
									await sleep(CONSTANTS.animationTime)
								}
						}
				} catch (error) {console.log(error)}
			}

		/* generateLayer */
			function generateLayer({centerX, centerY, layer, tileType, corner, sequence}) {
				try {
					// starting corner
						corner = corner || chooseRandom(Object.keys(CONSTANTS.corners))

					// sequence
						sequence = sequence || generateSequence({
							corner,
							direction: chooseRandom(CONSTANTS.directions)
						})

					// layer 0?
						if (layer == 0) {
							generateHexagon({
								x: centerX,
								y: centerY,
								tileType
							})
							return
						}

					// starting point
						let x = CONSTANTS.corners[corner][0] * layer + centerX
						let y = CONSTANTS.corners[corner][1] * layer + centerY

					// sequence
						for (const s in sequence) {
							for (let h = 0; h <= layer - 1; h++) {
								// generate hexagon
									generateHexagon({
										x,
										y,
										tileType
									})

								// move along
									x += CONSTANTS.corners[sequence[s]][0]
									y += CONSTANTS.corners[sequence[s]][1]
							}
						}
				} catch (error) {console.log(error)}
			}

		/* generateHexagon */
			function generateHexagon({x, y, tileType}) {
				try {
					// clear?
						if (tileType == "clear") {
							delete STATE.hexagons[`${x},${y}`]
							return
						}
						if (tileType == "unstamp") {
							delete STATE.icons[`${x},${y}`]
							return
						}

					// color
						const color = 
							(tileType == "shuffle") ? chooseRandom(generateNeighborWeightedColors({x, y})) :
							(tileType == "random") ? chooseRandom(STATE.weightedColors) :
							STATE.settings.tileTypes[tileType] ? STATE.settings.tileTypes[tileType].color : 
							CONSTANTS.tileTypeDefaults.color

					// add hexagon
						STATE.hexagons[`${x},${y}`] = {
							x,
							y,
							color
						}
				} catch (error) {console.log(error)}
			}

	/** icons **/
		/* setIcon */
			function setIcon({x, y, unstamp}) {
				try {
					// parameters
						const color = STATE.settings.icons.color
						const name = STATE.settings.icons.name
						const path = STATE.settings.icons.path
						const size = STATE.settings.icons.size

					// add icon
						STATE.icons[`${x},${y}`] = {
							x,
							y,
							color,
							name,
							path,
							size
						}

					// save image
						if (!STATE.images[`${color} - ${name}`]) {
							STATE.images[`${color} - ${name}`] = new Image()
							STATE.images[`${color} - ${name}`].src = `data:image/svg+xml,<svg version='1.1' xmlns='http://www.w3.org/2000/svg' viewBox='${CONSTANTS.svgSize}'>` + 
								`<path d='${path}' fill='${encodeURIComponent(color)}'></path>` + 
							`</svg>`
						}
				} catch (error) {console.log(error)}
			}

/*** canvas ***/
	/** draw **/
		/* resizeCanvas */
			resizeCanvas()
			window.addEventListener(TRIGGERS.resize, resizeCanvas)
			function resizeCanvas() {
				try {
					// sidebar
						const xAdjustment = (window.innerWidth >= CONSTANTS.desktopScreenWidth) ? -CONSTANTS.sidebarWidth : 0

					// get sizes
						ELEMENTS.canvas.width  = window.innerWidth + xAdjustment
						ELEMENTS.canvas.height = window.innerHeight

						ELEMENTS.brushCanvas.width  = window.innerWidth + xAdjustment
						ELEMENTS.brushCanvas.height = window.innerHeight

					// recalculate hexagons
						STATE.pxPerHexRadius = (Math.min(ELEMENTS.canvas.width, ELEMENTS.canvas.height) / STATE.settings.density)

					// redraw
						clearCanvas()
						drawMap(STATE)
						drawBrush()
				} catch (error) {console.log(error)}
			}

		/* clearCanvas */
			function clearCanvas(brushCanvas) {
				try {
					// name
						const canvasName  = brushCanvas ? "brushCanvas"  : "canvas"
						const contextName = brushCanvas ? "brushContext" : "context"

					// clear canvas
						ELEMENTS[contextName].clearRect(0, 0, ELEMENTS[canvasName].width, ELEMENTS[canvasName].height)
				} catch (error) {console.log(error)}
			}

		/* drawMap */
			function drawMap({hexagons, icons}) {
				try {
					// loop through hexagons
						for (const h in hexagons) {
							drawHexagon({
								canvas: ELEMENTS.canvas,
								context: ELEMENTS.context,
								...hexagons[h]
							})
						}

					// loop through icons
						for (const i in icons) {
							drawIcon({
								canvas: ELEMENTS.canvas,
								context: ELEMENTS.context,
								...icons[i]
							})
						}
				} catch (error) {console.log(error)}
			}

		/* drawHexagon */
			function drawHexagon({canvas, context, x, y, color, radius, rotate}) {
				try {
					// adjust for hex grid
						const hexX = (x + y / 2) * CONSTANTS.hexRatioX * STATE.pxPerHexRadius
						const hexY =      y      * CONSTANTS.hexRatioY * STATE.pxPerHexRadius

					// actual center
						const actualX = hexX + canvas.width  / 2
						const actualY = hexY + canvas.height / 2

					// move to center
						context.translate(actualX, actualY)

					// styling
						context.fillStyle = color || CONSTANTS.tileTypeDefaults.color
						context.strokeStyle = color || CONSTANTS.tileTypeDefaults.color
						context.lineWidth = CONSTANTS.lineWidth
						const r = (radius || 1) * STATE.pxPerHexRadius

					// draw hexagon
						context.beginPath()
						if (rotate) {
							context.moveTo(hexX - r    , hexY                          )
							context.lineTo(hexX - r / 2, hexY - r * CONSTANTS.hexRatioX)
							context.lineTo(hexX + r / 2, hexY - r * CONSTANTS.hexRatioX)
							context.lineTo(hexX + r    , hexY                          )
							context.lineTo(hexX + r / 2, hexY + r * CONSTANTS.hexRatioX)
							context.lineTo(hexX - r / 2, hexY + r * CONSTANTS.hexRatioX)
							context.lineTo(hexX - r    , hexY                          )
						}
						else {
							context.moveTo(hexX                          , hexY - r    )
							context.lineTo(hexX + r * CONSTANTS.hexRatioX, hexY - r / 2)
							context.lineTo(hexX + r * CONSTANTS.hexRatioX, hexY + r / 2)
							context.lineTo(hexX                          , hexY + r)
							context.lineTo(hexX - r * CONSTANTS.hexRatioX, hexY + r / 2)
							context.lineTo(hexX - r * CONSTANTS.hexRatioX, hexY - r / 2)
							context.lineTo(hexX                          , hexY - r    )
						}
						context.fill()
						context.stroke()
						
					// move back
						context.translate(-actualX, -actualY)
				} catch (error) {console.log(error)}
			}

		/* drawIcon */
			function drawIcon({canvas, context, x, y, color, name, path, size}) {
				try {
					// adjust for hex grid
						const hexX = (x + y / 2) * CONSTANTS.hexRatioX * STATE.pxPerHexRadius * 2
						const hexY =      y      * CONSTANTS.hexRatioY * STATE.pxPerHexRadius * 2

					// actual center
						const actualX = hexX + canvas.width  / 2
						const actualY = hexY + canvas.height / 2

					// styling
						context.fillStyle = color || CONSTANTS.iconDefaults.color
						const s = (size || 1) * STATE.pxPerHexRadius * 2

					// save image
						if (!STATE.images[`${color} - ${name}`]) {
							STATE.images[`${color} - ${name}`] = new Image()
							STATE.images[`${color} - ${name}`].src = `data:image/svg+xml,<svg version='1.1' xmlns='http://www.w3.org/2000/svg' viewBox='${CONSTANTS.svgSize}'>` + 
								`<path d='${path}' fill='${encodeURIComponent(color)}'></path>` + 
							`</svg>`
						}

					// draw icon
						context.drawImage(STATE.images[`${color} - ${name}`], actualX - s / 2, actualY - s / 2, s, s)
				} catch (error) {console.log(error)}
			}

		/* drawBrush */
			function drawBrush() {
				try {
					// clear
						clearCanvas(true)

					// icon?
						if (STATE.brush.tileType == "stamp") {
							drawIcon({
								canvas: ELEMENTS.brushCanvas,
								context: ELEMENTS.brushContext,
								x: STATE.brush.x,
								y: STATE.brush.y,
								color: STATE.settings.icons.color,
								name: STATE.settings.icons.name,
								path: STATE.settings.icons.path,
								size: STATE.settings.icons.size
							})
							return
						}

					// draw brush
						const color = ["clear", "unstamp"].includes(STATE.brush.tileType) ? CONSTANTS.hoverColorRemove : CONSTANTS.hoverColor
						drawHexagon({
							canvas: ELEMENTS.brushCanvas,
							context: ELEMENTS.brushContext,
							x: STATE.brush.x,
							y: STATE.brush.y,
							color: color,
							radius: ((STATE.brush.size * 2) - 1) * CONSTANTS.hexRatioX,
							rotate: true
						})
				} catch (error) {console.log(error)}
			}

	/** interaction **/
		/* downCanvas */
			ELEMENTS.canvas.addEventListener(TRIGGERS.mousedown, downCanvas)
			function downCanvas(event) {
				try {
					// store
						STATE.brush.pressed = true

					// move
						moveCanvas(event)
				} catch (error) {console.log(error)}
			}

		/* moveCanvas */
			window.addEventListener(TRIGGERS.mousemove, moveCanvas)
			function moveCanvas(event) {
				try {
					// get coordinates
						const rawX = (event.touches ? event.touches[0].clientX : event.clientX)
						const rawY = (event.touches ? event.touches[0].clientY : event.clientY)

					// convert
						const {x, y} = getCoordinates({
							x: rawX,
							y: rawY
						})

					// store
						STATE.brush.x = x
						STATE.brush.y = y

					// stamps
						if (STATE.brush.pressed && STATE.brush.tileType == "stamp") {
							setIcon({
								x,
								y,
								unstamp: (STATE.brush.tileType == "unstamp")
							})

							clearCanvas()
							drawMap(STATE)
						}

					// drawing?
						else if (STATE.brush.pressed) {
							generateSection({
								centerX: STATE.brush.x,
								centerY: STATE.brush.y,
								layers: STATE.brush.size,
								tileType: STATE.brush.tileType
							})

							clearCanvas()
							drawMap(STATE)
						}

					// display brush
						drawBrush()
				} catch (error) {console.log(error)}
			}

		/* upCanvas */
			window.addEventListener(TRIGGERS.mouseup, upCanvas)
			function upCanvas(event) {
				try {
					// not pressed?
						if (!STATE.brush.pressed) {
							return
						}

					// stop pressing
						STATE.brush.pressed = false
					
					// save history
						saveHistory()
				} catch (error) {console.log(error)}
			}
