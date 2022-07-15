/*** globals ***/
	/* constants */
		const CONSTANTS = {
			grid: {
				columns: 5,
				rows: 5,
				interval: 2000,
				topics: null
			},
			localStorageLimit: 120,
			api: {
				url: "https://api.unsplash.com/photos/random?count=30&client_id=",
				key: "X-_--yj8bhTGfebTCpuyBqRfAsw8uSDuDvOQupRejzA",
				attribute: function(data) {
					return 'Photo by ' +
							'<a target="_blank" nofollow href="https://unsplash.com/@' + data.username + '?utm_source=tilecycler&utm_medium=referral">' + data.name + '</a>' +
							' on ' +
							'<a target="_blank" nofollow href="https://unsplash.com/?utm_source=tilecycler&utm_medium=referral">' + 
							'Unsplash'
				}
			},
			topics: {
				"current-events": "BJJMtteDJA4",
				"wallpapers": "bo8jQKTaE0Y",
				"3d-renders": "CDwuwXJAbEw",
				"textures-patterns": "iUIsnVtjB0Y",
				"experimental": "qPYsDzvJOYc",
				"architecture": "rnSKDHwwYUk",
				"nature": "6sMVjTLSkeQ",
				"business-work": "aeu6rL-j6ew",
				"fashion": "S4MKLAsBB74",
				"film": "hmenvQhUmxM",
				"food-drink": "xjPR4hlkBGA",
				"health": "_hb-dl4Q-4U",
				"people": "towJZFskpGg",
				"interiors": "R_Fyn-Gwtlw",
				"street-photography": "xHxYTMHLgOc",
				"travel": "Fzo3zuOHN6w",
				"animals": "Jpg6Kidl-Hk",
				"spirituality": "_8zFHuhRhyo",
				"arts-culture": "bDo48cUhwnY",
				"history": "dijpbw99kQQ",
				"athletics": "Bn-DjrcBrwo",
				"digital-screens": "FY4YHxYhY-4",
				"covid-19": "c7USHrQ0Ljw",
				"architecture-interior": "M8jVbLbTRws"
			}
		}

	/* elements */
		const ELEMENTS = {
			styling: document.querySelector("#styling-constants"),
			tilesContainer: document.querySelector("#tiles"),
			mainTile: null,
			surroundingTiles: []
		}

	/* state */
		const STATE = {
			loop: null,
			tileIndex: 0,
			currentTileURLs: [],
			currentMainTileURL: null,
			allImages: {}
		}

/*** launch sequence ***/
	/* launchApplication */
		launchApplication()
		function launchApplication() {
			try {
				// get x & y
					if (location.search) {
						const searchPairs = location.search.slice(1).split("&")
						for (let i in searchPairs) {
							const pair = searchPairs[i].split("=")
							if (pair[0].toLowerCase().trim() == "reset") {
								localStorage.setItem("tilecycler", "")
							}

							if (pair[0].toLowerCase().trim() == "x" && !isNaN(pair[1])) {
								CONSTANTS.grid.columns = Math.round(pair[1])
							}
							if (pair[0].toLowerCase().trim() == "y" && !isNaN(pair[1])) {
								CONSTANTS.grid.rows = Math.round(pair[1])
							}
							if (pair[0].toLowerCase().trim() == "interval" && !isNaN(pair[1])) {
								CONSTANTS.grid.interval = Math.round(pair[1])
							}
							if (pair[0].toLowerCase().trim() == "topics" && pair[1].length) {
								CONSTANTS.grid.topics = pair[1].trim().replace(/\%2C/g, ",").toLowerCase().split(",")
								for (let i in CONSTANTS.grid.topics) {
									if (CONSTANTS.topics[CONSTANTS.grid.topics[i]]) {
										CONSTANTS.grid.topics[i] = CONSTANTS.topics[CONSTANTS.grid.topics[i]]
									}
								}
								CONSTANTS.grid.topics = CONSTANTS.grid.topics.join(",")
							}
						}
					}

				// grid
					// set rows & columns
						ELEMENTS.styling.innerText = ":root {--rows: " + CONSTANTS.grid.rows + "; --columns: " + CONSTANTS.grid.columns + ";}"

					// calculate length
						CONSTANTS.grid.perimeter = (CONSTANTS.grid.columns * 2) + (CONSTANTS.grid.rows * 2) - 4 // corners are duplicated

				// images
					// load images from localstorage
						const storedImages = localStorage.getItem("tilecycler")

					// no images yet? fetch some, then create tiles
						if (!storedImages) {
							fetchImages(function() {
								createTiles()
								STATE.loop = setInterval(updateImages, CONSTANTS.grid.interval)
							})
							return
						}

					// images? create tiles, then fetch more images
						STATE.allImages = JSON.parse(storedImages)
						createTiles()
						STATE.loop = setInterval(updateImages, CONSTANTS.grid.interval)
						fetchImages()
			} catch (error) {console.log(error)}
		}

	/* createTiles */
		function createTiles() {
			try {
				// perimeter tiles
					// start at top-left corner
						let x = 0
						let y = 0

					// loop around
						for (let i = 0; i < CONSTANTS.grid.perimeter; i++) {
							createTile(x, y)

							// update coordinates
								if (y == 0 && x < CONSTANTS.grid.columns - 1) {
									x++
								}
								else if (x == CONSTANTS.grid.columns - 1 && y < CONSTANTS.grid.rows - 1) {
									y++
								}
								else if (y == CONSTANTS.grid.rows - 1 && x > 0) {
									x--
								}
								else if (x == 0 && y > 0) {
									y--
								}
						}

				// main tile
					createTile("main", "main")
			} catch (error) {console.log(error)}
		}

	/* createTile */
		function createTile(x, y) {
			try {
				// create element
					const tile = document.createElement("div")
						tile.className = "tile"
						tile.setAttribute("x", x)
						tile.setAttribute("y", y)
					ELEMENTS.tilesContainer.appendChild(tile)

				// position
					if (x !== "main") {
						tile.style.left = "calc(" + x + " * (100vw / var(--columns)))"
					}
					if (y !== "main") {
						tile.style.top = "calc(" + y + " * (100vh / var(--rows)))"
					}

				// click event
					if (x !== "main" && y !== "main") {
						tile.addEventListener("click", swapTiles)
					}

				// info
					const info = document.createElement("div")
						info.className = "info"
					tile.appendChild(info)

				// save to container
					if (x == "main" && y == "main") {
						ELEMENTS.mainTile = tile
					}
					else {
						ELEMENTS.surroundingTiles.push(tile)
					}

				// image
					updateTileContent(tile, x, y)
			} catch (error) {console.log(error)}
		}

	/* updateTileContent */
		function updateTileContent(tile, x, y) {
			try {
				// choose a random image from the library
					let newURL = null
					do {
						newURL = chooseRandom(Object.keys(STATE.allImages))
					} while (STATE.currentMainTileURL == newURL || STATE.currentTileURLs.includes(newURL))

				// old URL
					let oldURL = tile.style.backgroundImage.slice(4, -1).replace(/\"|\'/g, "")

				// update image
					tile.style.backgroundImage = "url(" + newURL + ")"

				// update info text
					tile.querySelector(".info").innerHTML = CONSTANTS.api.attribute(STATE.allImages[newURL])

				// update STATE
					if (x == "main" || y == "main") {
						STATE.currentMainTileURL = newURL
					}
					else {
						if (STATE.currentTileURLs.includes(oldURL)) {
							STATE.currentTileURLs[STATE.currentTileURLs.indexOf(oldURL)] = newURL
						}
						else {
							STATE.currentTileURLs.push(newURL)
						}
					}
			} catch (error) {console.log(error)}
		}

	/* updateImages */
		function updateImages() {
			try {
				// update main tile
					if (STATE.tileIndex >= CONSTANTS.grid.perimeter) {
						updateTileContent(ELEMENTS.mainTile, "main", "main")
						STATE.tileIndex = 0
					}

				// all other tiles
					else {
						const tile = ELEMENTS.surroundingTiles[STATE.tileIndex]
						updateTileContent(tile, tile.getAttribute("x"), tile.getAttribute("y"))
						STATE.tileIndex++
					}
			} catch (error) {console.log(error)}
		}

	/* swapTiles */
		function swapTiles(event) {
			try {
				// target was link? ignore
					if (event.target.tagName.toLowerCase() == "a") {
						event.stopPropagation()
						return
					}
					
				// get this tile info
					const tile = event.target.closest(".tile")
					const tileInfo = tile.querySelector(".info")
					const tileURL = tile.style.backgroundImage.slice(4, -1).replace(/\"|\'/g, "")
					const tileAttribution = tileInfo.innerHTML

				// get main tile
					const main = ELEMENTS.mainTile
					const mainInfo = main.querySelector(".info")
					const mainURL = STATE.currentMainTileURL
					const mainAttribution = mainInfo.innerHTML

				// update main tile
					STATE.currentMainTileURL = tileURL
					main.style.backgroundImage = "url(" + tileURL + ")"
					mainInfo.innerHTML = tileAttribution

				// update this tile
					tile.style.backgroundImage = "url(" + mainURL + ")"
					tileInfo.innerHTML = mainAttribution
			} catch (error) {console.log(error)}
		}

/*** tools ***/
	/* chooseRandom */
		function chooseRandom(list) {
			try {
				return list[Math.floor(Math.random() * list.length)]
			} catch (error) {console.log(error)}
		}

	/* fetchImages */
		function fetchImages(callback) {
			try {
				// fetch
					fetch(CONSTANTS.api.url + CONSTANTS.api.key + (CONSTANTS.grid.topics ? ("&topics=" + CONSTANTS.grid.topics) : ""), {method: "GET"})
						.then(function(response){ return response.json() })
						.then(function(data) {
							receiveImages(data)
							if (callback) {
								callback()
							}
						})
			} catch (error) {console.log(error)}
		}

	/* receiveImages */
		function receiveImages(data) {
			try {
				// not images
					if (!data || !Array.isArray(data) || !data.length) {
						return
					}

				// too many?
					while (Object.keys(STATE.allImages).length > CONSTANTS.localStorageLimit) {
						let urlToRemove = chooseRandom(Object.keys(STATE.allImages))
						delete STATE.allImages[urlToRemove]
					}

				// loop through
					for (let i in data) {
						// build image object
							const image = {
								username: data[i].user.username || "",
								name: data[i].user.name || "",
								url: data[i].urls.regular || data[i].urls.full || data[i].urls.small || null
							}

						// add to state
							if (image.url && !STATE.allImages[image.url]) {
								STATE.allImages[image.url] = image
							}
					}

				// update localstorage
					localStorage.setItem("tilecycler", JSON.stringify(STATE.allImages))
			} catch (error) {console.log(error)}
		}
