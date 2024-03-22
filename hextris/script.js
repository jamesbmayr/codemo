/*** globals ***/
	/* triggers */
		const TRIGGERS = {
			rightclick: "contextmenu",
			click: "click",
			mousedown: "mousedown",
			mouseup: "mouseup",
			keydown: "keydown",
			keyup: "keyup"
		}
		if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
			TRIGGERS.mousedown = "touchstart"
			TRIGGERS.mouseup = "touchend"
		}
		window.addEventListener(TRIGGERS.rightclick, event => event.preventDefault())

	/* elements */
		const ELEMENTS = {
			game: {
				element: document.querySelector("#game"),
				background: document.querySelector("#game-background"),
				backgroundSpikes: document.querySelector("#game-background-spikes"),
				container: document.querySelector("#game-container"),
				score: document.querySelector("#game-score-value"),
				controls: {
					"rotate-cw": document.querySelector("#game-controls-rotate-cw"),
					"rotate-ccw": document.querySelector("#game-controls-rotate-ccw"),
					left: document.querySelector("#game-controls-left"),
					down: document.querySelector("#game-controls-down"),
					right: document.querySelector("#game-controls-right")
				}
			},
			overlay: {
				element: document.querySelector("#overlay"),
				start: document.querySelector("#overlay-start"),
				unpause: document.querySelector("#overlay-unpause")
			},
			pause: document.querySelector("#pause")
		}

	/* constants */
		const CONSTANTS = {
			showCoordinates: false,
			interval: 150, // ms
			minimumInterval: 30, // ms
			descendIterations: 3, // iterations
			scoreFactor: 10, // hexes
			startingX: 0, // hexes
			startingY: -2, // hexes
			gameRadius: 9, // hexes
			keys: {
				"arrowup": "rotate-cw",
				"arrowleft": "left",
				"arrowdown": "down",
				"arrowright": "right",
				"w": "rotate-cw",
				"e": "rotate-ccw",
				"a": "left",
				"s": "down",
				"d": "right",
				"p": "pause"
			},
			pieces: {
				"rhombus": 			[{x: 0,y: 0}, {x: 0,y:-1}, {x: 1,y:-1}, {x: 1,y: 0}],
				"cw-flag": 			[{x: 0,y: 0}, {x:-1,y: 0}, {x: 0,y:-1}, {x: 1,y: 0}],
				"ccw-flag": 		[{x: 0,y: 0}, {x:-1,y: 0}, {x:-1,y: 1}, {x: 1,y: 0}],
				"line": 			[{x: 0,y: 0}, {x:-1,y: 0}, {x: 1,y: 0}, {x: 2,y: 0}],
				"cw-hockeystick":	[{x: 0,y: 0}, {x:-1,y: 0}, {x: 1,y: 0}, {x: 1,y: 1}],
				"ccw-hockeystick":	[{x: 0,y: 0}, {x:-1,y: 0}, {x: 1,y: 0}, {x: 2,y:-1}],
				"z-block": 			[{x: 0,y: 0}, {x:-1,y: 1}, {x: 1,y: 0}, {x: 2,y:-1}],
				"s-block": 			[{x: 0,y: 0}, {x: 0,y:-1}, {x: 1,y: 0}, {x: 1,y: 1}],
				"fan": 				[{x: 0,y: 0}, {x:-1,y: 0}, {x: 1,y:-1}, {x: 0,y: 1}],
				"cup": 				[{x:-1,y: 0}, {x: 0,y:-1}, {x: 1,y:-1}, {x: 1,y: 0}],
			},
			svg: {
				hexagon: `<svg viewBox="20 20 60 60"><path d="M 50 20 C 59 25 67 29 76 34 C 76 34 76 34 76 34 C 76 45 76 55 76 66 C 67 71 59 75 50 80 C 41 75 33 71 24 66 C 24 55 24 45 24 34 C 33 29 41 25 50 20 Z"></path></svg>`,
			},
			rotations: {
				cw: {
					// center
						"0,0" : "0,0",
					// inner hexagon
						"0,-1": "1,-1",
						"1,-1": "1,0" ,
						"1,0" : "0,1" ,
						"0,1" : "-1,1",
						"-1,1": "-1,0",
						"-1,0": "0,-1",
					// outer hexagon
						"0,-2": "2,-2",
						"2,-2": "2,0" ,
						"2,0" : "0,2" ,
						"0,2" : "-2,2",
						"-2,2": "-2,0",
						"-2,0": "0,-2",
						"1,-2": "2,-1",
						"2,-1": "1,1" ,
						"1,1" : "-1,2",
						"-1,2": "-2,1",
						"-2,1": "-1,-1",
						"-1,-1":"1,-2"  
				},
				ccw: {
					// center
						"0,0" : "0,0" ,
					// inner hexagon
						"1,-1": "0,-1",
						"1,0" : "1,-1",
						"0,1" : "1,0" ,
						"-1,1": "0,1" ,
						"-1,0": "-1,1",
						"0,-1": "-1,0",
					// outer hexagon
						"2,-2": "0,-2",
						"2,0" : "2,-2",
						"0,2" : "2,0" ,
						"-2,2": "0,2" ,
						"-2,0": "-2,2",
						"0,-2": "-2,0",
						"2,-1": "1,-2",
						"1,1" : "2,-1",
						"-1,2": "1,1" ,
						"-2,1": "-1,2",
						"-1,-1":"-2,1",
						"1,-2": "-1,-1"
				}
			}
		}

	/* state */
		const STATE = {
			spikes: false,
			interval: CONSTANTS.interval,
			descendCountdown: CONSTANTS.descendIterations,
			play: false,
			pause: false,
			keys: {
				"rotate-cw": false,
				"rotate-ccw": false,
				"left": false,
				"down": false,
				"right": false
			},
			score: 0,
			downDirection: "downright",
			currentPiece: {
				type: null,
				stopped: false,
				hexes: [],
				x: 0,
				y: 0
			},
			hexes: [],
			line: null,
			gameloop: null,
		}

/*** interaction ***/
	/* startGame */
		ELEMENTS.overlay.start.focus()
		ELEMENTS.overlay.start.addEventListener(TRIGGERS.click, startGame)
		function startGame() {
			try {
				// blur
					ELEMENTS.overlay.start.blur()
					document.body.focus()

				// reset game loop
					STATE.play = false
					clearInterval(STATE.gameloop)
					STATE.gameloop = null
					STATE.interval = CONSTANTS.interval
					STATE.descendCountdown = CONSTANTS.descendIterations

				// reset score
					STATE.score = 0
					ELEMENTS.game.score.innerText = getHexadecimal(STATE.score)

				// reset piece
					STATE.currentPiece.type = null
					STATE.currentPiece.x = 0
					STATE.currentPiece.y = 0
					STATE.line = null

				// clear container
					ELEMENTS.game.container.innerHTML = ""
					STATE.hexes = []

				// spikes
					if (!STATE.spikes) {
						displaySpikes()
						STATE.spikes = true
					}

				// start game loop
					STATE.gameloop = setInterval(iterateGame, CONSTANTS.interval)

				// change state
					STATE.play = true
					STATE.pause = false
					ELEMENTS.game.element.removeAttribute("gameover")
					ELEMENTS.game.element.setAttribute("play", true)
					ELEMENTS.game.element.removeAttribute("pause")
			} catch (error) {console.log(error)}
		}

	/* pauseGame */
		ELEMENTS.pause.addEventListener(TRIGGERS.click, pauseGame)
		ELEMENTS.overlay.unpause.addEventListener(TRIGGERS.click, pauseGame)
		function pauseGame() {
			try {
				// no game
					if (!STATE.play) {
						return
					}

				// focus
					ELEMENTS.pause.focus()

				// already paused --> continue
					if (STATE.pause) {
						STATE.pause = false
						ELEMENTS.game.element.removeAttribute("pause")
						return
					}

				// pause
					STATE.pause = true
					ELEMENTS.game.element.setAttribute("pause", true)
			} catch (error) {console.log(error)}
		}

	/* pressKey */
		window.addEventListener(TRIGGERS.keydown, pressKey)
		function pressKey(event) {
			try {
				// invalid
					const command = CONSTANTS.keys[event.key.toLowerCase()]
					if (!command) {
						return
					}

				// pause
					if (command == "pause") {
						pauseGame()
						return
					}

				// set
					STATE.keys[command] = true
					ELEMENTS.game.controls[command].setAttribute("active", true)
			} catch (error) {console.log(error)}
		}

	/* liftKey */
		window.addEventListener(TRIGGERS.keyup, liftKey)
		function liftKey(event) {
			try {
				// invalid
					const command = CONSTANTS.keys[event.key.toLowerCase()]
					if (!command) {
						return
					}

				// pause
					if (command == "pause") {
						return
					}

				// unset
					STATE.keys[command] = false
					ELEMENTS.game.controls[command].removeAttribute("active")
			} catch (error) {console.log(error)}
		}

	/* pressControl */
		for (const direction in ELEMENTS.game.controls) {
			ELEMENTS.game.controls[direction].addEventListener(TRIGGERS.mousedown, pressControl)
		}
		function pressControl(event) {
			try {
				// invalid
					const command = event.target.value
					if (!command) {
						return
					}

				// set
					STATE.keys[command] = true
					ELEMENTS.game.controls[command].setAttribute("active", true)
			} catch (error) {console.log(error)}
		}

	/* liftControl */
		for (const direction in ELEMENTS.game.controls) {
			ELEMENTS.game.controls[direction].addEventListener(TRIGGERS.mouseup, liftControl)
		}
		function liftControl(event) {
			try {
				// invalid
					const command = event.target.value
					if (!command) {
						return
					}

				// unset
					STATE.keys[command] = false
					ELEMENTS.game.controls[command].removeAttribute("active")
			} catch (error) {console.log(error)}
		}

/*** helpers ***/
	/* getHexadecimal */
		function getHexadecimal(decimal) {
			try {
				return ("000000" + Number(decimal).toString(16)).slice(-6)
			} catch(error) {console.log(error)}
		}

	/* chooseRandom */
		function chooseRandom(list) {
			try {
				// not an object
					if (typeof list !== "object") {
						return list
					}

				// not an array
					if (!Array.isArray(list)) {
						const keys = Object.keys(list)
						return list[keys[Math.floor(Math.random() * keys.length)]]
					}

				// array
					return list[Math.floor(Math.random() * list.length)]
			} catch (error) {console.log(error)}
		}

	/* copyObject */
		function copyObject(obj) {
			try {
				// not an object
					if (typeof obj !== "object") {
						return obj
					}

				// deep copy
					return JSON.parse(JSON.stringify(obj))
			} catch (error) {console.log(error)}
		}

/*** gameloop ***/
	/* iterateGame */
		function iterateGame() {
			try {
				// paused
					if (!STATE.play || STATE.pause) {
						return
					}

				// iterating
					if (STATE.iterating) {
						return
					}
					STATE.iterating = true

				// clean board
					ELEMENTS.game.container.innerHTML = ""

				// lines
					if (STATE.line !== null) {
						resolveLine(STATE.line)
						STATE.line = findLine()
					}

				// generate piece?
					else if (!STATE.currentPiece.type) {
						generatePiece()

						// collisions?
							if (getCollisions(getActualHexes(STATE.currentPiece.hexes, STATE.currentPiece.x, STATE.currentPiece.y)).length) {
								endGame()
							}

						// decrease interval?
							if (STATE.interval > CONSTANTS.minimumInterval && 
								Math.floor((CONSTANTS.interval - STATE.interval) / CONSTANTS.descendIterations) < Math.floor(STATE.score / CONSTANTS.scoreFactor)) {
								STATE.interval = Math.max(STATE.interval - CONSTANTS.descendIterations, CONSTANTS.minimumInterval)
								clearInterval(STATE.gameloop)
								STATE.gameloop = setInterval(iterateGame, STATE.interval)
							}
					}

				// stopped
					else if (STATE.currentPiece.stopped) {
						// convert to hexes
							STATE.hexes.push(...getActualHexes(STATE.currentPiece.hexes, STATE.currentPiece.x, STATE.currentPiece.y))

						// remove
							STATE.currentPiece.type = null
							STATE.currentPiece.hexes = []

						// lines
							STATE.line = findLine()
					}

				// descend
					else {
						movePiece()
						descendPiece()
					}

				// hexes to render
					const hexesToRender = copyObject(STATE.hexes)
						hexesToRender.push(...getActualHexes(STATE.currentPiece.hexes, STATE.currentPiece.x, STATE.currentPiece.y))

				// render everything
					displayHexagons(hexesToRender)
					delete STATE.iterating
			} catch (error) {console.log(error)}
		}

	/* generatePiece */
		function generatePiece() {
			try {
				// random piece type
					const pieceType = chooseRandom(Object.keys(CONSTANTS.pieces))

				// set state
					STATE.currentPiece.type = pieceType
					STATE.currentPiece.hexes = copyObject(CONSTANTS.pieces[pieceType])
					STATE.currentPiece.hexes.forEach(hex => {
						hex.type = pieceType
					})
					STATE.currentPiece.stopped = false
					STATE.currentPiece.x = CONSTANTS.startingX
					STATE.currentPiece.y = CONSTANTS.startingY
			} catch (error) {console.log(error)}
		}

	/* movePiece */
		function movePiece() {
			try {
				// set down direction
					if (STATE.keys.left && !STATE.keys.right) {
						STATE.downDirection = "downleft"
					}
					if (STATE.keys.right && !STATE.keys.left) {
						STATE.downDirection = "downright"
					}

				// rotation
					if (STATE.keys["rotate-cw"] && !STATE.keys["rotate-ccw"]) {
						rotatePiece("cw")
					}
					else if (STATE.keys["rotate-ccw"] && !STATE.keys["rotate-cw"]) {
						rotatePiece("ccw")
					}

				// translation
					if (STATE.keys.down) {
						translatePiece(STATE.downDirection)
					}
					else if (STATE.keys.left && !STATE.keys.right) {
						translatePiece("left")
					}
					else if (STATE.keys.right && !STATE.keys.left) {
						translatePiece("right")
					}
			} catch (error) {console.log(error)}
		}

	/* translatePiece */
		function translatePiece(direction) {
			try {
				// get adjusted piece
					const adjustedX = STATE.currentPiece.x + (direction == "left"      ? -1 : direction == "downleft" ? -1 : direction == "right" ? 1 : 0)
					const adjustedY = STATE.currentPiece.y + (direction == "downright" ?  1 : direction == "downleft" ?  1 : 0)
					const actualHexes = getActualHexes(STATE.currentPiece.hexes, adjustedX, adjustedY)

				// collisions
					const collisions = getCollisions(actualHexes)
					if (collisions.length) {
						if (direction == "downright" && collisions.includes("right") &&
							!collisions.includes("left") &&
							!collisions.includes("down") &&
							!collisions.includes("hex")) {
							return translatePiece("downleft")
						}
						else if (direction == "downleft" && collisions.includes("left") && 
							!collisions.includes("right") &&
							!collisions.includes("down") &&
							!collisions.includes("hex")) {
							return translatePiece("downright")
						}
						return
					}

				// update
					if (direction == "downleft") {
						STATE.currentPiece.y += 1
						STATE.currentPiece.x -= 1
						return
					}
					if (direction == "downright") {
						STATE.currentPiece.y += 1
						return
					}
					if (direction == "left") {
						STATE.currentPiece.x -= 1
						return
					}
					if (direction == "right") {
						STATE.currentPiece.x += 1
						return
					}
			} catch (error) {console.log(error)}
		}

	/* rotatePiece */
		function rotatePiece(direction) {
			try {
				// copy
					const hexes = []

				// get rotated coordinates
					for (const h in STATE.currentPiece.hexes) {
						const oldHex = STATE.currentPiece.hexes[h]
						const oldCoordinates = `${oldHex.x},${oldHex.y}`
						const newCoordinates = CONSTANTS.rotations[direction][oldCoordinates]
						hexes.push({
							x: Number(newCoordinates.split(",")[0]),
							y: Number(newCoordinates.split(",")[1]),
							type: oldHex.type
						})
					}

				// out of bounds
					if (getCollisions(getActualHexes(hexes, STATE.currentPiece.x, STATE.currentPiece.y)).length) {
						return
					}
					
				// update
					STATE.currentPiece.hexes = hexes
			} catch (error) {console.log(error)}
		}

	/* descendPiece */
		function descendPiece() {
			try {
				// decrement
					STATE.descendCountdown -= 1
					if (STATE.descendCountdown >= 0) {
						return
					}

				// reset
					STATE.descendCountdown = CONSTANTS.descendIterations

				// get potential coordinates
					const downRightHexes = getActualHexes(STATE.currentPiece.hexes,
						STATE.currentPiece.x,
						STATE.currentPiece.y + 1
					)
					const downLeftHexes = getActualHexes(STATE.currentPiece.hexes,
						STATE.currentPiece.x - 1,
						STATE.currentPiece.y + 1
					)

				// get collisions
					const downRightCollisions = getCollisions(downRightHexes)
					const downLeftCollisions = getCollisions(downLeftHexes)

				// downright preferred?
					if (STATE.downDirection == "downright" && !downRightCollisions.length) {
						STATE.currentPiece.stopped = false
						STATE.currentPiece.y += 1
						return
					}

				// downleft preferred?
					if (STATE.downDirection == "downleft" && !downLeftCollisions.length) {
						STATE.currentPiece.stopped = false
						STATE.currentPiece.y += 1
						STATE.currentPiece.x -= 1
						return
					}

				// possible to go downRight?
					if (!downRightCollisions.length) {
						STATE.currentPiece.stopped = false
						STATE.currentPiece.y += 1
						return
					}

				// possible to go downLeft?
					if (!downLeftCollisions.length) {
						STATE.currentPiece.stopped = false
						STATE.currentPiece.y += 1
						STATE.currentPiece.x -= 1
						return
					}

				// not possible to go down at all
					STATE.currentPiece.stopped = true
					return
			} catch (error) {console.log(error)}
		}

	/* getActualHexes */
		function getActualHexes(relativeHexes, x, y) {
			try {
				// actual
					const actualHexes = []

				// loop through
					for (const h in relativeHexes) {
						const relativeHex = relativeHexes[h]

						actualHexes.push({
							x:    relativeHex.x + x,
							y:    relativeHex.y + y,
							type: relativeHex.type
						})
					}

				// return
					return actualHexes
			} catch (error) {console.log(error)}
		}

	/* getCollisions */
		function getCollisions(hexes) {
			try {
				// collisions
					const collisions = []

				// dimensions
					const maxY = (CONSTANTS.gameRadius - 1) * 2
					const maxX = Math.floor(CONSTANTS.gameRadius / 2)
					const minX = maxX - maxY

				// loop through
					for (const h in hexes) {
						// this hex
							const thisHex = hexes[h]

						// down
							if (thisHex.y > maxY) {
								collisions.push("down")
							}

						// left
							if (thisHex.x < minX) {
								collisions.push("left")
							}
							if (thisHex.x + thisHex.y < -1 * maxX) {
								collisions.push("left")
							}

						// right
							if (thisHex.x > maxX) {
								collisions.push("right")
							}
							if (thisHex.x + thisHex.y > -1 * minX) {
								collisions.push("right")
							}

						// another piece
							if (STATE.hexes.find(thatHex => thatHex.x == thisHex.x && thatHex.y == thisHex.y)) {
								collisions.push("hex")
							}
					}

				// return all
					return collisions
			} catch (error) {console.log(error)}
		}

	/* findLine */
		function findLine() {
			try {
				// bottom up
					const maxY = (CONSTANTS.gameRadius - 1) * 2 // 12
					const maxX = Math.floor(CONSTANTS.gameRadius / 2) // 3
					const minX = (maxY - maxX) * -1 // -9
					
					yLoop: for (let y = maxY; y >= -1; y--) {
						const leftX  = y < CONSTANTS.gameRadius ? (y + maxX) * -1 : minX
						const rightX = y < CONSTANTS.gameRadius ? maxX : (y + minX) * -1 
						xLoop: for (let x = leftX; x <= rightX; x++) {
							if (!STATE.hexes.find(hex => hex.x == x && hex.y == y)) {
								continue yLoop
							}
						}
						return y
					}

				// none
					return null
			} catch (error) {console.log(error)}
		}

	/* resolveLine */
		function resolveLine(line) {
			try {
				// delete
					const countBefore = STATE.hexes.length
					STATE.hexes = STATE.hexes.filter(hex => hex.y !== line)
					const countAfter = STATE.hexes.length

				// score
					STATE.score += (countBefore - countAfter)
					ELEMENTS.game.score.innerText = getHexadecimal(STATE.score)

				// coordinates
					const maxY = (CONSTANTS.gameRadius - 1) * 2 // 12
					const maxX = Math.floor(CONSTANTS.gameRadius / 2) // 3
					const minX = (maxY - maxX) * -1 // -9

				// collapse
					yLoop: for (let y = line; y >= -1; y--) {
						const leftX  = y < CONSTANTS.gameRadius ? (y + maxX) * -1 : minX
						const rightX = y < CONSTANTS.gameRadius ? maxX : (y + minX) * -1 

						xLoop: for (let x = rightX; x >= leftX; x--) {
							const hex = STATE.hexes.find(hex => hex.x == x && hex.y == y)
							if (!hex) {
								continue xLoop
							}

							// get collisions
								const downLeftCollisions = getCollisions([{
									x: hex.x - 1,
									y: hex.y + 1
								}])
								const downRightCollisions = getCollisions([{
									x: hex.x,
									y: hex.y + 1
								}])

							// collapse from right to center
								if (2 * x + y > 0) {
									if (!downLeftCollisions.length) {
										hex.x -= 1
										hex.y += 1
										continue xLoop
									}
									if (!downRightCollisions.length) {
										hex.y += 1
										continue xLoop
									}
								}

							// collapse from left to center
								else {
									if (!downRightCollisions.length) {
										hex.y += 1
										continue xLoop
									}
									if (!downLeftCollisions.length) {
										hex.x -= 1
										hex.y += 1
										continue xLoop
									}
								}
						}
					}
			} catch (error) {console.log(error)}
		}

	/* endGame */
		function endGame() {
			try {
				// stop game
					STATE.play = false
					clearInterval(STATE.gameloop)
					STATE.gameloop = null

				// display
					ELEMENTS.game.element.setAttribute("gameover", true)
					ELEMENTS.overlay.start.focus()
			} catch (error) {console.log(error)}
		}

/*** displays ***/
	/* displaySpikes */
		function displaySpikes() {
			try {
				// dimensions
					const gameDiameter = (CONSTANTS.gameRadius * 2) + 1 // 15
					const maxY = (CONSTANTS.gameRadius * 2) - 1 // 13
					const maxX = Math.floor(CONSTANTS.gameRadius / 2) // 3
					const minX = maxX - maxY // -10

				// spikes array
					const spikes = []

				// down
					for (let i = 0; i <= CONSTANTS.gameRadius; i++) {
						spikes.push({
							x: i + maxX - maxY,
							y: maxY
						})
					}

				// downleft
					for (let i = 0; i < CONSTANTS.gameRadius; i++) {
						spikes.push({
							x: minX,
							y: i + CONSTANTS.gameRadius - 1
						})
					}

				// downright
					for (let i = 0; i < CONSTANTS.gameRadius; i++) {
						spikes.push({
							x: -i + maxX + 1,
							y: i + CONSTANTS.gameRadius - 1
						})
					}

				// upleft
					for (let i = 0; i < CONSTANTS.gameRadius; i++) {
						spikes.push({
							x: -i - maxX,
							y: i - 1
						})
					}

				// upright
					for (let i = 0; i < CONSTANTS.gameRadius; i++) {
						spikes.push({
							x: maxX + 1,
							y: i - 1
						})
					}

				// build hexes
					for (const s in spikes) {
						// coordinates
							const spike = spikes[s]
							const x = spike.x + (spike.y / 2)
							const y = spike.y

						// element
							const spikeElement = document.createElement("div")
								spikeElement.className = "game-spike"
								spikeElement.innerHTML = CONSTANTS.svg.hexagon
								spikeElement.style.left = `calc(${50 + (x / gameDiameter * 100)}%)`
								spikeElement.style.top = `calc(${y / gameDiameter * 100}%)`
							ELEMENTS.game.backgroundSpikes.appendChild(spikeElement)

							if (CONSTANTS.showCoordinates) {
								spikeElement.innerHTML += `<span>${spike.x},${spike.y}</span>`
							}
					}
			} catch (error) {console.log(error)}
		}

	/* displayHexagons */
		function displayHexagons(hexes) {
			try {
				// loop through hexes
					for (const h in hexes) {
						// coordinates
							const hex = hexes[h]
							const x = hex.x + (hex.y / 2)
							const y = hex.y
							const gameDiameter = (CONSTANTS.gameRadius * 2) + 1

						// element
							const hexElement = document.createElement("div")
								hexElement.className = `game-hex hex-${hex.type}`
								hexElement.innerHTML = CONSTANTS.svg.hexagon
								hexElement.style.left = `calc(${50 + (x / gameDiameter * 100)}%)`
								hexElement.style.top = `calc(${y / gameDiameter * 100}%)`
							ELEMENTS.game.container.appendChild(hexElement)

							if (CONSTANTS.showCoordinates) {
								hexElement.innerHTML += `<span>${hex.x},${hex.y}</span>`
							}
					}
			} catch (error) {console.log(error)}
		}
