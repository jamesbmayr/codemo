/*** globals ***/
	/* triggers */
		const TRIGGERS = {
			click: "click"
		}
	
	/* elements */
		const ELEMENTS = {
			overlay: document.querySelector("#overlay"),
			gridInput: document.querySelector("#grid-input"),
			winInput: document.querySelector("#win-input"),
			play: document.querySelector("#play"),
			winner: document.querySelector("#winner"),
			variables: document.querySelector("#variables"),
			gameboard: document.querySelector("#gameboard"),
			grid: document.querySelector("#gameboard-grid"),
			dropzone: document.querySelector("#gameboard-dropzone"),
			rotateCW: document.querySelector("#gameboard-rotate-clockwise"),
			rotateCCW: document.querySelector("#gameboard-rotate-counterclockwise"),
			tokens: []
		}

	/* constants */
		const CONSTANTS = {
			rotateTime: 500, // ms
			dropTime: 100, // ms
			quarterTurn: 90, // degrees
			circle: 360, // degrees
			players: {
				"player-0": "blue",
				"player-1": "red"
			}
		}

	/* state */
		const STATE = {
			grid: 5, // cells
			winCondition: 4, // cells
			tokensDropping: 0,
			transitioning: false,
			player: 0 // blue
		}

/*** helpers ***/
	/* getReducedRotation */
		function getReducedRotation(rotation) {
			try {
				// cast to number
					rotation = Number(rotation)

				// negative
					while (rotation < 0) {
						rotation += CONSTANTS.circle
					}

				// modulo
					return rotation % CONSTANTS.circle
			} catch (error) {console.log(error)}
		}

	/* getDropTarget */
		function getDropTarget(x, y, rotation) {
			try {
				// get target location
					const targetX = rotation == 0 ? x :
									rotation == CONSTANTS.quarterTurn ? x + 1 :
									rotation == CONSTANTS.quarterTurn * 2 ? x :
									x - 1
					const targetY = rotation == 0 ? y + 1 :
									rotation == CONSTANTS.quarterTurn ? y :
									rotation == CONSTANTS.quarterTurn * 2 ? y - 1 :
									y

				// get occupier
					return {
						x: targetX,
						y: targetY,
						token: ELEMENTS.grid.querySelector(".token[x='" + targetX + "'][y='" + targetY + "']") || null
					}
			} catch (error) {console.log(error)}
		}

	/* getStartingValues */
		getStartingValues()
		function getStartingValues() {
			try {
				// queryParameters
					const queryParameters = {}
					const queryString = window.location.search.slice(1) || null
					const parameters = queryString ? queryString.split("&") : []
					for (let i in parameters) {
						const pair = parameters[i].split("=")
						queryParameters[pair[0].trim().toLowerCase()] = pair[1].trim().toLowerCase()
					}

				// grid
					if (queryParameters.grid) {
						ELEMENTS.gridInput.value = Number(queryParameters.grid)
					}

				// win
					if (queryParameters.win) {
						ELEMENTS.winInput.value = Number(queryParameters.win)
					}

				// start
					if (queryParameters.grid && queryParameters.win) {
						startGame()
					}
			} catch (error) {console.log(error)}
		}

/*** interaction ***/
	/* clickSector */
		function clickSector(event) {
			try {
				// get sector
					const sector = event.target.closest(".dropzone-sector")
					const sectorNumber = Number(sector.getAttribute("sector"))

				// get rotation
					const rotation = getReducedRotation(ELEMENTS.grid.getAttribute("rotation"))

				// get coordinates
					const tokenX = 	rotation == 0 ? sectorNumber : 
									rotation == CONSTANTS.quarterTurn ? -1 : 
									rotation == CONSTANTS.quarterTurn * 2 ? STATE.grid - 1 - sectorNumber :
									STATE.grid
					const tokenY = 	rotation == 0 ? -1 : 
									rotation == CONSTANTS.quarterTurn ? STATE.grid - 1 - sectorNumber : 
									rotation == CONSTANTS.quarterTurn * 2 ? STATE.grid :
									sectorNumber

				// get target location
					const dropTarget = getDropTarget(tokenX, tokenY, rotation)

				// already full?
					if (dropTarget.token) {
						return
					}

				// create token
					createToken(tokenX, tokenY)
					
				// switch turns
					STATE.player = (STATE.player + 1) % 2
					ELEMENTS.gameboard.setAttribute("player", STATE.player)
			} catch (error) {console.log(error)}
		}

	/* clickRotateCW */
		ELEMENTS.rotateCW.addEventListener(TRIGGERS.click, clickRotateCW)
		function clickRotateCW(event) {
			try {
				// blur
					event.target.blur()

				// rotate
					rotateGrid(true)
			} catch (error) {console.log(error)}
		}

	/* clickRotateCCW */
		ELEMENTS.rotateCCW.addEventListener(TRIGGERS.click, clickRotateCCW)
		function clickRotateCCW(event) {
			try {
				// blur
					event.target.blur()

				// rotate
					rotateGrid(false)
			} catch (error) {console.log(error)}
		}

/*** game ***/
	/* startGame */
		ELEMENTS.play.addEventListener(TRIGGERS.click, startGame)
		function startGame() {
			try {
				// reset
					ELEMENTS.grid.innerHTML = ""
					ELEMENTS.grid.setAttribute("rotation", 0)
					ELEMENTS.dropzone.innerHTML = ""
					ELEMENTS.winner.innerText = ""
					ELEMENTS.overlay.setAttribute("invisible", true)
					ELEMENTS.play.blur()

				// get inputs
					STATE.winCondition = Number(ELEMENTS.winInput.value)
					STATE.grid = Number(ELEMENTS.gridInput.value)
					ELEMENTS.variables.innerText = ":root {--grid: " + STATE.grid + ";}"

				// build dropzone sectors
					for (let i = 0; i < STATE.grid; i++) {
						const sector = document.createElement("div")
							sector.className = "dropzone-sector"
							sector.setAttribute("sector", i)
							sector.addEventListener(TRIGGERS.click, clickSector)
						ELEMENTS.dropzone.appendChild(sector)

						const sectorInner = document.createElement("div")
							sectorInner.className = "dropzone-sector-inner"
						sector.appendChild(sectorInner)
					}

				// set first turn
					STATE.player = Math.floor(Math.random() * 2)
					ELEMENTS.gameboard.setAttribute("player", STATE.player)

				// start
					STATE.transitioning = false
					ELEMENTS.gameboard.removeAttribute("transitioning")
			} catch (error) {console.log(error)}
		}

	/* createToken */
		function createToken(x, y) {
			try {
				// create token
					const token = document.createElement("div")
						token.className = "token"
						token.setAttribute("player", STATE.player)
						token.setAttribute("x", x)
						token.setAttribute("y", y)
						token.style.left = "calc(100% / var(--grid) * " + x + ")"
						token.style.top  = "calc(100% / var(--grid) * " + y + ")"
					ELEMENTS.grid.appendChild(token)

				// transition
					ELEMENTS.gameboard.setAttribute("transitioning", true)
					STATE.tokensDropping = 1

				// descend
					setTimeout(function() {
						dropToken(token)
					}, 0)
			} catch (error) {console.log(error)}
		}

	/* dropToken */
		function dropToken(token) {
			try {
				// nothing dropping?
					if (!token) {
						reduceDropCount()
						return
					}

				// get rotation
					const rotation = getReducedRotation(ELEMENTS.grid.getAttribute("rotation"))

				// x & y
					const tokenX = Number(token.getAttribute("x"))
					const tokenY = Number(token.getAttribute("y"))

				// get target location
					const dropTarget = getDropTarget(tokenX, tokenY, rotation)

				// already occupied?
					if (dropTarget.token) {
						reduceDropCount()
						return
					}

				// at the edge
					if (!(0 <= dropTarget.x && dropTarget.x < STATE.grid) || !(0 <= dropTarget.y && dropTarget.y < STATE.grid)) {
						reduceDropCount()
						return
					}

				// drop
					token.setAttribute("x", dropTarget.x)
					token.setAttribute("y", dropTarget.y)
					token.style.left = "calc(100% / var(--grid) * " + dropTarget.x + ")"
					token.style.top  = "calc(100% / var(--grid) * " + dropTarget.y + ")"
				
				// continue drop
					setTimeout(function() {
						dropToken(token)
					}, CONSTANTS.dropTime)
			} catch (error) {console.log(error)}
		}

	/* rotateGrid */
		function rotateGrid(clockwise) {
			try {
				// transition
					ELEMENTS.gameboard.setAttribute("transitioning", true)

				// get rotation
					const rotation = Number(ELEMENTS.grid.getAttribute("rotation")) + (clockwise ? CONSTANTS.quarterTurn : -CONSTANTS.quarterTurn)
					ELEMENTS.grid.setAttribute("rotation", rotation)
					const reducedRotation = getReducedRotation(rotation)

				// animate
					ELEMENTS.grid.style.transform = "rotate(" + rotation + "deg)"

				// drop
					setTimeout(function() {
						// get tokens
							const tokens = Array.from(ELEMENTS.grid.querySelectorAll(".token")) || []
						
						// none?
							STATE.tokensDropping = tokens.length || 0
							if (!STATE.tokensDropping) {
								ELEMENTS.gameboard.removeAttribute("transitioning")
								return
							}

						// sort
							const sortedTokens =	(reducedRotation == 0) ? tokens.sort(function(a, b) {
														return Number(b.getAttribute("y")) - Number(a.getAttribute("y"))
													}) :
													(reducedRotation == CONSTANTS.quarterTurn) ? tokens.sort(function(a, b) {
														return Number(b.getAttribute("x")) - Number(a.getAttribute("x"))
													}) :
													(reducedRotation == CONSTANTS.quarterTurn * 2) ? tokens.sort(function(a, b) {
														return Number(a.getAttribute("y")) - Number(b.getAttribute("y"))
													}) :
													tokens.sort(function(a, b) {
														return Number(a.getAttribute("x")) - Number(b.getAttribute("x"))
													})

						// drop
							for (let i in sortedTokens) {
								dropToken(sortedTokens[i])
							}
					}, CONSTANTS.rotateTime)

				// switch turns
					STATE.player = (STATE.player + 1) % 2
					ELEMENTS.gameboard.setAttribute("player", STATE.player)
			} catch (error) {console.log(error)}
		}

	/* reduceDropCount */
		function reduceDropCount() {
			try {
				// reduce the count
					STATE.tokensDropping = Math.max(0, STATE.tokensDropping - 1)

				// no more dropping?
					if (!STATE.tokensDropping) {
						// no winner
							const winner = getWinner()
							if (!winner) {
								ELEMENTS.gameboard.removeAttribute("transitioning")
								return
							}

						// winner
							ELEMENTS.winner.innerText = (CONSTANTS.players[winner] || "no one") + " wins"
							ELEMENTS.overlay.removeAttribute("invisible")
							ELEMENTS.gameboard.setAttribute("player", winner.replace("player-", ""))
					}
			} catch (error) {console.log(error)}
		}

	/* getWinner */
		function getWinner() {
			try {
				// pseudogrid
					const pseudogrid = []
					for (let y = 0; y < STATE.grid; y++) {
						pseudogrid[y] = []
						for (let x = 0; x < STATE.grid; x++) {
							const token = ELEMENTS.grid.querySelector(".token[x='" + x + "'][y='" + y + "']") || null
							pseudogrid[y][x] = token ? ("player-" + token.getAttribute("player")) : null
						}
					}

				// loop through pseudogrid
					yloop: for (let y = 0; y < STATE.grid; y++) {
						xloop: for (let x = 0; x < STATE.grid; x++) {
							// empty
								const player = pseudogrid[y][x]
								if (!player) {
									continue xloop
								}

							// horizontal
								let horizontalCount = 1
								horizontalWinloop: while (horizontalCount < STATE.winCondition) {
									if (!pseudogrid[y][x + horizontalCount] || pseudogrid[y][x + horizontalCount] !== player) {
										break horizontalWinloop
									}
									horizontalCount++
								}
								if (horizontalCount == STATE.winCondition) {
									return player
								}

							// vertical
								let verticalCount = 1
								verticalWinloop: while (verticalCount < STATE.winCondition) {
									if (!pseudogrid[y + verticalCount] || pseudogrid[y + verticalCount][x] !== player) {
										break verticalWinloop
									}
									verticalCount++
								}
								if (verticalCount == STATE.winCondition) {
									return player
								}

							// diagonalPositive
								let diagonalPositiveCount = 1
								diagonalPositiveWinloop: while (diagonalPositiveCount < STATE.winCondition) {
									if (!pseudogrid[y + diagonalPositiveCount] || !pseudogrid[y + diagonalPositiveCount][x + diagonalPositiveCount] || pseudogrid[y + diagonalPositiveCount][x + diagonalPositiveCount] !== player) {
										break diagonalPositiveWinloop
									}
									diagonalPositiveCount++
								}
								if (diagonalPositiveCount == STATE.winCondition) {
									return player
								}

							// diagonalNegative
								let diagonalNegativeCount = 1
								diagonalNegativeWinloop: while (diagonalNegativeCount < STATE.winCondition) {
									if (!pseudogrid[y + diagonalNegativeCount] || !pseudogrid[y + diagonalNegativeCount][x - diagonalNegativeCount] || pseudogrid[y + diagonalNegativeCount][x - diagonalNegativeCount] !== player) {
										break diagonalNegativeWinloop
									}
									diagonalNegativeCount++
								}
								if (diagonalNegativeCount == STATE.winCondition) {
									return player
								}
						}
					}

				// no winner + full board?
					if (Array.from(ELEMENTS.grid.querySelectorAll(".token")).length == STATE.grid ** 2) {
						return "none"
					}

				// still here?
					return false
			} catch (error) {console.log(error)}
		}
