window.onload = function() {
	/*** onload ***/
		/* triggers */
			if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
				var on = { click: "touchstart", mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" }
			}
			else {
				var on = { click:      "click", mousedown:  "mousedown", mousemove: "mousemove", mouseup:  "mouseup" }
			}

		/* constants */
			var PIPETYPES = ["I", "I", "I", "I", "I", "L", "L", "L", "L", "L", "L", "L", "L", "T", "T", "T", "T", "+", "O", "O"]
			var GAMEWIDTH = 8
			var GAMEHEIGHT = 8

		/* elements */
			var THINKING = document.getElementById("thinking")
			var GAMEZONE = document.getElementById("gamezone")
			var PERIMETER = document.getElementById("perimeter")
				var PERIMETER_NORTH = document.getElementById("north")
				var PERIMETER_EAST  = document.getElementById("east")
				var PERIMETER_SOUTH = document.getElementById("south")
				var PERIMETER_WEST  = document.getElementById("west")
			var COMBINATIONS = document.getElementById("combinations-inner")
				var COUNTER = document.getElementById("counter-inner")
			var ROOT = document.documentElement

		/* state */
			var GAMESTATE = {
				playing: false,
				thinking: false,
				grid: {},
				perimeter: {},
				orbs: [],
				colors: []
			}
			window.GAMESTATE = GAMESTATE

	/*** game ***/
		/* createGame */
			createGame()
			function createGame() {
				// empty
					GAMEZONE.innerHTML = ""
					GAMESTATE.playing = false
					GAMESTATE.grid = {}
					GAMESTATE.perimeter = {}
					GAMESTATE.orbs = []

				// style
					ROOT.style.setProperty("--grid-height", GAMEHEIGHT)
					ROOT.style.setProperty("--grid-width",  GAMEWIDTH )

				// generate random grid
					buildGrid()

				// perimeter
					buildPerimeter()

				// play
					GAMESTATE.playing = true
			}

		/* buildGrid */
			function buildGrid() {
				// loop through rows
					for (var y = 0; y < GAMEHEIGHT; y++) {
						// build row
							var row = document.createElement("div")
								row.className = "row"
							GAMEZONE.appendChild(row)

						// loop through columns
							for (var x = 0; x < GAMEWIDTH; x++) {
								// add to grid
									if (!GAMESTATE.grid[x]) {
										GAMESTATE.grid[x] = {}
									}

								// random shape
									var type = PIPETYPES[Math.floor(Math.random() * PIPETYPES.length)]

								// build cell
									var cell = document.createElement("div")
										cell.className = "cell"
									row.appendChild(cell)

								// build pipe
									var pipe = document.createElement("div")
										pipe.className = "pipe"
										pipe.setAttribute("type", type)
										pipe.setAttribute("x", x)
										pipe.setAttribute("y", y)
										pipe.addEventListener(on.click, rotatePipe)
									cell.appendChild(pipe)

									var pipeInner = document.createElement("div")
										pipeInner.className = "pipe-inner"
									pipe.appendChild(pipeInner)

								// add to game
									GAMESTATE.grid[x][y] = {
										x: x,
										y: y,
										type: type,
										rotation: 0,
										open: {
											n: (type == "I" || type == "L" || type == "T" || type == "+"),
											e: (type == "L" || type == "T" || type == "+"),
											s: (type == "I" || type == "T" || type == "+"),
											w: (type == "+")
										},
										colors: [],
										pipe: pipe
									}

								// random rotation
									rotatePipe({target: pipe, newGame: true})
							}
					}
			}

		/* buildPerimeter */
			function buildPerimeter() {
				// empty perimeter
					GAMESTATE.perimeter = {
						n: {},
						e: {},
						s: {},
						w: {}
					}

				// north
					for (var x = 0; x < GAMEWIDTH; x++) {
						// update game object
							GAMESTATE.perimeter.n[x] = {
								x: x,
								y: -1,
								side: "n",
								on: false,
								red: Math.floor(Math.random() * 255),
								green: Math.floor(Math.random() * 255),
								blue: Math.floor(Math.random() * 255)
							}
							GAMESTATE.perimeter.n[x].color = "rgb(" + GAMESTATE.perimeter.n[x].red + ", " + GAMESTATE.perimeter.n[x].green + ", " + GAMESTATE.perimeter.n[x].blue + ")"
							GAMESTATE.orbs.push(GAMESTATE.perimeter.n[x])

						// build color orb
							var orb = document.createElement("orb")
								orb.className = "orb"
								orb.style.backgroundColor = GAMESTATE.perimeter.n[x].color
								orb.style.top = "50%"
								orb.style.left = (90 / GAMEWIDTH * (x + 0.5)) + 5 + "%"
							PERIMETER_NORTH.appendChild(orb)
					}

				// east
					for (var y = 0; y < GAMEHEIGHT; y++) {
						// update game object
							GAMESTATE.perimeter.e[y] = {
								x: GAMEWIDTH,
								y: y,
								side: "e",
								on: false,
								red: Math.floor(Math.random() * 255),
								green: Math.floor(Math.random() * 255),
								blue: Math.floor(Math.random() * 255)
							}
							GAMESTATE.perimeter.e[y].color = "rgb(" + GAMESTATE.perimeter.e[y].red + ", " + GAMESTATE.perimeter.e[y].green + ", " + GAMESTATE.perimeter.e[y].blue + ")"
							GAMESTATE.orbs.push(GAMESTATE.perimeter.e[y])

						// build color orb
							var orb = document.createElement("orb")
								orb.className = "orb"
								orb.style.backgroundColor = GAMESTATE.perimeter.e[y].color
								orb.style.left = "50%"
								orb.style.top = (90 / GAMEHEIGHT * (y + 0.5)) + 5 + "%"
							PERIMETER_EAST.appendChild(orb)
					}

				// south
					for (var x = GAMEWIDTH - 1; x >= 0; x--) {
						// update game object
							GAMESTATE.perimeter.s[x] = {
								x: x,
								y: GAMEHEIGHT,
								side: "s",
								on: false,
								red: Math.floor(Math.random() * 255),
								green: Math.floor(Math.random() * 255),
								blue: Math.floor(Math.random() * 255)
							}
							GAMESTATE.perimeter.s[x].color = "rgb(" + GAMESTATE.perimeter.s[x].red + ", " + GAMESTATE.perimeter.s[x].green + ", " + GAMESTATE.perimeter.s[x].blue + ")"
							GAMESTATE.orbs.push(GAMESTATE.perimeter.s[x])

						// build color orb
							var orb = document.createElement("orb")
								orb.className = "orb"
								orb.style.backgroundColor = GAMESTATE.perimeter.s[x].color
								orb.style.top = "50%"
								orb.style.left = (90 / GAMEWIDTH * (x + 0.5)) + 5 + "%"
							PERIMETER_SOUTH.appendChild(orb)
					}

				// west
					for (var y = GAMEHEIGHT - 1; y >= 0; y--) {
						// update game object
							GAMESTATE.perimeter.w[y] = {
								x: -1,
								y: y,
								side: "w",
								on: false,
								red: Math.floor(Math.random() * 255),
								green: Math.floor(Math.random() * 255),
								blue: Math.floor(Math.random() * 255)
							}
							GAMESTATE.perimeter.w[y].color = "rgb(" + GAMESTATE.perimeter.e[y].red + ", " + GAMESTATE.perimeter.e[y].green + ", " + GAMESTATE.perimeter.e[y].blue + ")"
							GAMESTATE.orbs.push(GAMESTATE.perimeter.w[y])

						// build color orb
							var orb = document.createElement("orb")
								orb.className = "orb"
								orb.style.backgroundColor = GAMESTATE.perimeter.w[y].color
								orb.style.left = "50%"
								orb.style.top = (90 / GAMEHEIGHT * (y + 0.5)) + 5 + "%"
							PERIMETER_WEST.appendChild(orb)
					}

				// change pipe colors
					updatePipes()
			}

		/* rotatePipe */
			function rotatePipe(event) {
				if (!GAMESTATE.thinking) {
					// get coordinates
						var pipeElement = event.target
							var x = Number(pipeElement.getAttribute("x"))
							var y = Number(pipeElement.getAttribute("y"))
					
					// update rotation
						var pipe = GAMESTATE.grid[x][y]
						if (event.newGame) {
							pipe.rotation = Math.floor(Math.random() * 4) - 1
						}
						pipe.rotation += 1

					// 0 degrees
						if (pipe.rotation % 4 == 0) {
							pipe.open.n = (pipe.type == "I" || pipe.type == "L" || pipe.type == "T" || pipe.type == "+")
							pipe.open.e = (pipe.type == "L" || pipe.type == "T" || pipe.type == "+")
							pipe.open.s = (pipe.type == "I" || pipe.type == "T" || pipe.type == "+")
							pipe.open.w = (pipe.type == "+")
						}

					// 90 degrees
						else if (pipe.rotation % 4 == 1) {
							pipe.open.e = (pipe.type == "I" || pipe.type == "L" || pipe.type == "T" || pipe.type == "+")
							pipe.open.s = (pipe.type == "L" || pipe.type == "T" || pipe.type == "+")
							pipe.open.w = (pipe.type == "I" || pipe.type == "T" || pipe.type == "+")
							pipe.open.n = (pipe.type == "+")
						}

					// 180 degrees
						else if (pipe.rotation % 4 == 2) {
							pipe.open.s = (pipe.type == "I" || pipe.type == "L" || pipe.type == "T" || pipe.type == "+")
							pipe.open.w = (pipe.type == "L" || pipe.type == "T" || pipe.type == "+")
							pipe.open.n = (pipe.type == "I" || pipe.type == "T" || pipe.type == "+")
							pipe.open.e = (pipe.type == "+")
						}

					// 270 degrees
						else if (pipe.rotation % 4 == 3) {
							pipe.open.w = (pipe.type == "I" || pipe.type == "L" || pipe.type == "T" || pipe.type == "+")
							pipe.open.n = (pipe.type == "L" || pipe.type == "T" || pipe.type == "+")
							pipe.open.e = (pipe.type == "I" || pipe.type == "T" || pipe.type == "+")
							pipe.open.s = (pipe.type == "+")
						}

					// update element
						pipeElement.style.transform = "rotate(" + (pipe.rotation * 90) + "deg)"
						pipeElement.setAttribute("rotation", pipe.rotation % 4)

					// playing?
						if (GAMESTATE.playing) {
							// start thinking
								GAMESTATE.thinking = true
								THINKING.removeAttribute("invisible")

							// then update pipe colors
								setTimeout(updatePipes, 10)
						}
				}
			}

		/* updatePipes */
			function updatePipes() {
				// clear out colors
					for (var x = 0; x < GAMEWIDTH; x++) {
						for (var y = 0; y < GAMEHEIGHT; y++) {
							GAMESTATE.grid[x][y].colors = []
						}
					}

				// north
					for (var i in GAMESTATE.perimeter.n) {
						var x = GAMESTATE.perimeter.n[i].x
						if (GAMESTATE.grid[x][0].open.n) {
							GAMESTATE.grid[x][0].colors.push(GAMESTATE.perimeter.n[i].color)
							updateRecursively(GAMESTATE.grid[x][0])
						}
					}

				// east
					for (var i in GAMESTATE.perimeter.e) {
						var y = GAMESTATE.perimeter.e[i].y
						if (GAMESTATE.grid[GAMEWIDTH - 1][y].open.e) {
							GAMESTATE.grid[GAMEWIDTH - 1][y].colors.push(GAMESTATE.perimeter.e[i].color)
							updateRecursively(GAMESTATE.grid[GAMEWIDTH - 1][y])
						}
					}

				// south
					for (var i in GAMESTATE.perimeter.s) {
						var x = GAMESTATE.perimeter.s[i].x
						if (GAMESTATE.grid[x][GAMEHEIGHT - 1].open.s) {
							GAMESTATE.grid[x][GAMEHEIGHT - 1].colors.push(GAMESTATE.perimeter.s[i].color)
							updateRecursively(GAMESTATE.grid[x][GAMEHEIGHT - 1])
						}
					}

				// west
					for (var i in GAMESTATE.perimeter.w) {
						var y = GAMESTATE.perimeter.w[i].y
						if (GAMESTATE.grid[0][y].open.w) {
							GAMESTATE.grid[0][y].colors.push(GAMESTATE.perimeter.w[i].color)
							updateRecursively(GAMESTATE.grid[0][y])
						}
					}

				// colors
					var newColors = updateColors()

				// combinations
					updateCombinations(newColors)

				// stop thinking
					THINKING.setAttribute("invisible", true)
					GAMESTATE.thinking = false
			}

		/* updateRecursively */
			function updateRecursively(pipe) {
				// loop through the open sides of this pipe
					for (var i in pipe.open) {
						if (pipe.open[i]) {
							// get neighbor coordinates
								var neighborX = i == "n" || i == "s" ? pipe.x : i == "e" ? pipe.x + 1 : pipe.x - 1
								var neighborY = i == "e" || i == "w" ? pipe.y : i == "s" ? pipe.y + 1 : pipe.y - 1
								var neighborOpen = i == "n" ? "s" : i == "e" ? "w" : i == "s" ? "n" : i == "w" ? "e" : null

							// if there is an open neighbor
								if (GAMESTATE.grid[neighborX] && GAMESTATE.grid[neighborX][neighborY] && GAMESTATE.grid[neighborX][neighborY].open[neighborOpen]) {
									// identify this pipe's colors that the neighbor doesn't have
										var uniqueColors = []
										for (var j in pipe.colors) {
											if (!GAMESTATE.grid[neighborX][neighborY].colors.includes(pipe.colors[j])) {
												uniqueColors.push(pipe.colors[j])
											}
										}

									// if there are unique colors...
										if (uniqueColors.length) {
											// update the neighbor's colors
												GAMESTATE.grid[neighborX][neighborY].colors = GAMESTATE.grid[neighborX][neighborY].colors.concat(uniqueColors)

											// run this function on the neighbor
												updateRecursively(GAMESTATE.grid[neighborX][neighborY])
										}
								}
						}
					}
			}

		/* updateColors */
			function updateColors() {
				// empty array
					var newColors = []

				// loop through columns and rows
					for (var x = 0; x < GAMEWIDTH; x++) {
						for (var y = 0; y < GAMEHEIGHT; y++) {
							// if there are colors for this pipe
								if (GAMESTATE.grid[x][y].colors.length) {
									// sort the colors alphabetically
										GAMESTATE.grid[x][y].colors = GAMESTATE.grid[x][y].colors.sort()
									
									// calculate the width of each band (25px total)
										var width = (25 / (GAMESTATE.grid[x][y].colors.length + 1))

									// build the color bands as gradient color-stop ranges
										var colorString = ""
										for (var i in GAMESTATE.grid[x][y].colors) {
											colorString += ", " + GAMESTATE.grid[x][y].colors[i] + " " + (i * width + width) + "px, " + GAMESTATE.grid[x][y].colors[i] + " " + (i * width + width + width) + "px" 
										}
										colorString = "#dddddd, #dddddd " + width + "px" + colorString

									// update pipe-inner
										GAMESTATE.grid[x][y].pipe.firstChild.style.background = "repeating-linear-gradient(" + (GAMESTATE.grid[x][y].rotation * 90 + 45) + "deg, " + colorString + ")"

									// store new colors
										if (!GAMESTATE.colors.includes(colorString)) {
											newColors.push(colorString)
											GAMESTATE.colors.push(colorString)
										}
								}

							// default to white
								else {
									GAMESTATE.grid[x][y].pipe.firstChild.style.background = "#dddddd"
								}
						}
					}

				// return only the new colors
					return newColors
			}

		/* updateCombinations */
			function updateCombinations(colors) {
				// loop through new colors
					for (var i in colors) {
						// create outer circle element
							var combination = document.createElement("div")
								combination.className = "combination"
							COMBINATIONS.appendChild(combination)

						// create inner pattern element
							var combinationInner = document.createElement("div")
								combinationInner.className = "combination-inner"
								combinationInner.style.background = "repeating-linear-gradient(45deg, " + colors[i] + ")"
							combination.appendChild(combinationInner)
					}

				// update the counter
					COUNTER.innerText = GAMESTATE.colors.length
			}
}
