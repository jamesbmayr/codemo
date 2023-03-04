/*** globals ***/
	/* triggers */
		const TRIGGERS = {
			click: "click",
			input: "input"
		}

	/* constants */
		const CONSTANTS = {
			rounding: 1000000000,
			threshold: 1 / 1000,
			animationInterval: 5,
			intersectionThreshold: 1,
			circleRadians: Math.PI * 2, // radians
			circleDegrees: 360, // degrees
			cubesPerSide: 3,
			cubeLength: 100, // canvas px
			directions: ["clockwise", "counterclockwise"],
			subcubeTypes: ["mechanism", "middle", "edge", "corner"],
			axis: {
				front: "z",
				left: "x",
				up: "y",
				right: "x",
				down: "y",
				back: "z"
			},
			defaultFaces: {
				front: "front",
				left: "left",
				up: "up",
				right: "right",
				down: "down",
				back: "back"
			},
			defaultFaceCoordinates: {
				front: [0,1,2,3],
				left: [1,5,6,2],
				up: [0,4,5,1],
				right: [0,4,7,3],
				down: [3,7,6,2],
				back: [4,5,6,7]
			},
			defaultEdges: [[0,1], [1,2], [2,3], [3,0], [4,5], [5,6], [6,7], [7,4], [0,4], [5,1], [3,7], [6,2]],
			defaultRotation: {
				x: 0, // degrees
				y: 0, // degrees
				z: 0 // degrees
			},
			finalPositions: {
				"front middle": "0,0,1;front,left,up,right,down,back",
				"front-left edge": "-1,0,1;front,left,up,right,down,back",
				"front-left-down corner": "-1,-1,1;front,left,up,right,down,back",
				"front-left-up corner": "-1,1,1;front,left,up,right,down,back",
				"front-right edge": "1,0,1;front,left,up,right,down,back",
				"front-right-down corner": "1,-1,1;front,left,up,right,down,back",
				"front-up-right corner": "1,1,1;front,left,up,right,down,back",
				"front-down edge": "0,-1,1;front,left,up,right,down,back",
				"front-up edge": "0,1,1;front,left,up,right,down,back",
				"back middle": "0,0,-1;front,left,up,right,down,back",
				"left-back edge": "-1,0,-1;front,left,up,right,down,back",
				"left-down-back corner": "-1,-1,-1;front,left,up,right,down,back",
				"left-up-back corner": "-1,1,-1;front,left,up,right,down,back",
				"right-back edge": "1,0,-1;front,left,up,right,down,back",
				"right-down-back corner": "1,-1,-1;front,left,up,right,down,back",
				"up-right-back corner": "1,1,-1;front,left,up,right,down,back",
				"down-back edge": "0,-1,-1;front,left,up,right,down,back",
				"up-back edge": "0,1,-1;front,left,up,right,down,back",
				"mechanism": "0,0,0;front,left,up,right,down,back",
				"left middle": "-1,0,0;front,left,up,right,down,back",
				"left-down edge": "-1,-1,0;front,left,up,right,down,back",
				"left-up edge": "-1,1,0;front,left,up,right,down,back",
				"right middle": "1,0,0;front,left,up,right,down,back",
				"right-down edge": "1,-1,0;front,left,up,right,down,back",
				"up-right edge": "1,1,0;front,left,up,right,down,back",
				"down middle": "0,-1,0;front,left,up,right,down,back",
				"up middle": "0,1,0;front,left,up,right,down,back,"
			},
			defaultShuffleMoves: 25
		}

	/* elements */
		const ELEMENTS = {
			canvas: document.querySelector("#canvas"),
			context: document.querySelector("#canvas").getContext("2d"),
			gameMoves: {
				shuffle: document.querySelector("#shuffle"),
				movesCount: document.querySelector("#moves-count"),
				solve: document.querySelector("#solve"),
				solveStatus: document.querySelector("#solve-status"),
			},
			cubeMoves: {
				xCW: document.querySelector("#x-clockwise"),
				xCCW: document.querySelector("#x-counterclockwise"),
				yCW: document.querySelector("#y-clockwise"),
				yCCW: document.querySelector("#y-counterclockwise"),
				zCW: document.querySelector("#z-clockwise"),
				zCCW: document.querySelector("#z-counterclockwise")
			},
			faceMoves: {
				frontCW: document.querySelector("#front-clockwise"),
				frontCCW: document.querySelector("#front-counterclockwise"),
				leftCW: document.querySelector("#left-clockwise"),
				leftCCW: document.querySelector("#left-counterclockwise"),
				upCW: document.querySelector("#up-clockwise"),
				upCCW: document.querySelector("#up-counterclockwise"),
				rightCW: document.querySelector("#right-clockwise"),
				rightCCW: document.querySelector("#right-counterclockwise"),
				downCW: document.querySelector("#down-clockwise"),
				downCCW: document.querySelector("#down-counterclockwise"),
				backCW: document.querySelector("#back-clockwise"),
				backCCW: document.querySelector("#back-counterclockwise"),
			},
			settings: {
				element: document.querySelector("#settings"),
				overlay: document.querySelector("#settings-overlay"),
				close: document.querySelector("#settings-close"),
				camera: {
					cameraX: document.querySelector("#camera-x"),
					cameraY: document.querySelector("#camera-y"),
					cameraZ: document.querySelector("#camera-z")
				},
				styling: {
					animationDegrees: document.querySelector("#animation-degrees"),
					cubeOpacity: document.querySelector("#cube-opacity"),
					borderWidth: document.querySelector("#border-width")
				},
				colors: {
					colorFrontActive: document.querySelector("#color-front-active"),
					colorFront: document.querySelector("#color-front"),
					colorLeftActive: document.querySelector("#color-left-active"),
					colorLeft: document.querySelector("#color-left"),
					colorUpActive: document.querySelector("#color-up-active"),
					colorUp: document.querySelector("#color-up"),
					colorRightActive: document.querySelector("#color-right-active"),
					colorRight: document.querySelector("#color-right"),
					colorDownActive: document.querySelector("#color-down-active"),
					colorDown: document.querySelector("#color-down"),
					colorBackActive: document.querySelector("#color-back-active"),
					colorBack: document.querySelector("#color-back"),
					colorInteriorActive: document.querySelector("#color-interior-active"),
					colorInterior: document.querySelector("#color-interior")
				}
			}
		}

	/* state */
		const STATE = {
			settings: {
				animationDegrees: 1, // °/ms
				cubeOpacity: 0.9, // ratio
				borderWidth: 1, // canvas px
				colors: {
					front: {
						active: true,
						color: "#0D48AC"
					},
					left: {
						active: true,
						color: "#FF5525"
					},
					up: {
						active: true,
						color: "#FED52F"
					},
					right: {
						active: true,
						color: "#891214"
					},
					down: {
						active: true,
						color: "#FFFFFF"
					},
					back: {
						active: true,
						color: "#199B4C"
					},
					interior: {
						active: true,
						color: "#666666"
					}
				}
			},
			camera: [0,0,1500], // px
			adjustedPerspective: {
				x: -15, // degrees
				y: 30, // degrees
				z: -6 // degrees
			},
			cube: {
				orientation: {},
				rotation: {},
				subcubes: []
			},
			pastMoves: [],
			futureMoves: [],
			solveLayer: null
		}

/*** settings ***/
	/* closeSettings */
		ELEMENTS.settings.close.addEventListener(TRIGGERS.click, closeSettings)
		function closeSettings(event) {
			try {
				ELEMENTS.settings.element.removeAttribute("open")
				ELEMENTS.settings.close.blur()
			} catch (error) {console.log(error)}
		}

	/* changeCamera */
		for (const c in ELEMENTS.settings.camera) {
			ELEMENTS.settings.camera[c].addEventListener(TRIGGERS.input, changeCamera)
		}
		function changeCamera(event) {
			try {
				// new value
					const input = event.target.closest("input")
					const direction = input.id.split("-")[1]
					STATE.adjustedPerspective[direction] = Number(input.value)

				// redraw
					drawCube()
			} catch (error) {console.log(error)}
		}

	/* changeAnimationDegrees */
		ELEMENTS.settings.styling.animationDegrees.addEventListener(TRIGGERS.input, changeAnimationDegrees)
		function changeAnimationDegrees(event) {
			try {
				// new value
					const input = event.target.closest("input")
					STATE.settings.animationDegrees = (Number(input.value) || 1)
			} catch (error) {console.log(error)}
		}

	/* changeCubeOpacity */
		ELEMENTS.settings.styling.cubeOpacity.addEventListener(TRIGGERS.input, changeCubeOpacity)
		function changeCubeOpacity(event) {
			try {
				// new value
					const input = event.target.closest("input")
					STATE.settings.cubeOpacity = Number(input.value) / 100

				// redraw
					drawCube()
			} catch (error) {console.log(error)}
		}

	/* changeBorderWidth */
		ELEMENTS.settings.styling.borderWidth.addEventListener(TRIGGERS.input, changeBorderWidth)
		function changeBorderWidth(event) {
			try {
				// new value
					const input = event.target.closest("input")
					STATE.settings.borderWidth = Number(Boolean(input.checked))

				// redraw
					drawCube()
			} catch (error) {console.log(error)}
		}

	/* changeColor */
		for (const c in ELEMENTS.settings.colors) {
			ELEMENTS.settings.colors[c].addEventListener(TRIGGERS.input, changeColor)
		}
		function changeColor(event) {
			try {
				// new value
					const input = event.target.closest("input")
					const face = input.id.split("-")[1]
				
				// toggle
					if (input.type == "checkbox") {
						STATE.settings.colors[face].active = Boolean(input.checked)
					}

				// color
					else {
						STATE.settings.colors[face].color = input.value
					}

				// redraw
					drawCube()
			} catch (error) {console.log(error)}
		}

/*** interaction ***/
	/* manipulateCube */
		for (const c in ELEMENTS.cubeMoves) {
			ELEMENTS.cubeMoves[c].addEventListener(TRIGGERS.click, manipulateCube)
		}
		for (const f in ELEMENTS.faceMoves) {
			ELEMENTS.faceMoves[f].addEventListener(TRIGGERS.click, manipulateCube)
		}
		function manipulateCube(event) {
			try {
				// already animating?
					if (STATE.animation) {
						return
					}

				// get data
					const id = event.target.closest("button").id
					const face = id.split("-")[0]
					const direction = id.split("-")[1]

				// clear message
					ELEMENTS.gameMoves.solveStatus.innerText = "last: " + face + " " + direction

				// rotate
					moveCube(face, direction)
			} catch (error) {console.log(error)}
		}

	/* shuffleCube ***/
		ELEMENTS.gameMoves.shuffle.addEventListener(TRIGGERS.click, shuffleCube)
		function shuffleCube(event) {
			try {
				// STOP
					if (event && STATE.futureMoves.length) {
						STATE.futureMoves = []
						ELEMENTS.gameMoves.solveStatus.innerText = "STOPPED"
						ELEMENTS.gameMoves.shuffle.blur()
						return
					}

				// START / RESET
					if (event) {
						if (STATE.animation) {
							return
						}

						STATE.futureMoves = []
						ELEMENTS.gameMoves.solveStatus.innerText = "SHUFFLING"

						const shuffleMovesCount = Number(ELEMENTS.gameMoves.movesCount.value) || CONSTANTS.defaultShuffleMoves
						for (let i = 0; i < shuffleMovesCount; i++) {
							STATE.futureMoves.push(generateRandomMove())
						}
					}

				// FUTURE
					if (STATE.futureMoves.length) {
						ELEMENTS.gameMoves.movesCount.value = STATE.futureMoves.length
						const nextMove = STATE.futureMoves.shift()
						moveCube(nextMove.split("-")[0], nextMove.split("-")[1], shuffleCube)
						return
					}

				// FINISH
					ELEMENTS.gameMoves.solveStatus.innerText = "SHUFFLED"
					ELEMENTS.gameMoves.movesCount.value = CONSTANTS.defaultShuffleMoves
					ELEMENTS.gameMoves.shuffle.blur()					
			} catch (error) {console.log(error)}
		}

	/* solveCube ***/
		ELEMENTS.gameMoves.solve.addEventListener(TRIGGERS.click, solveCube)
		function solveCube(event) {
			try {
				// STOP
					if (event && STATE.solveLayer) {
						STATE.solveLayer = null
						STATE.futureMoves = []
						ELEMENTS.gameMoves.solveStatus.innerText = "STOPPED"
						ELEMENTS.gameMoves.solve.blur()
						return
					}

				// START / RESET
					if (event) {
						if (STATE.animation) {
							return
						}

						STATE.futureMoves = []
						STATE.solveLayer = "down"
						ELEMENTS.gameMoves.solveStatus.innerText = "LAYER: " + STATE.solveLayer
					}

				// NO SOLVE LAYER
					if (!STATE.solveLayer) {
						return
					}

				// FUTURE
					if (STATE.futureMoves.length) {
						const nextMove = STATE.futureMoves.shift()
						moveCube(nextMove.split("-")[0], nextMove.split("-")[1], solveCube)
						return
					}

				// LAYER: DOWN
					if (STATE.solveLayer == "down") {
						// ORIENT CUBE
							// move down face to down
								if (STATE.cube.orientation.down !== "down") {
									ELEMENTS.gameMoves.solveStatus.innerText = "turning down face down"
									if (STATE.pastMoves[STATE.pastMoves.length - 1] == "x-counterclockwise") {
										STATE.futureMoves.push("z-clockwise") && solveCube()
										return
									}
									
									STATE.futureMoves.push("x-counterclockwise") && solveCube()
									return
								}

							// move front face to front
								if (STATE.cube.orientation.front !== "front") {
									ELEMENTS.gameMoves.solveStatus.innerText = "turning front face front"
									STATE.futureMoves.push("y-counterclockwise") && solveCube()
									return
								}

						// WHITE CROSS
							{
								const id = "front-down edge"
								const subcube = getPositionInCube(id)
								if (subcube !== CONSTANTS.finalPositions[id]) {
									// location
										const location = subcube.split(";")[0]
										if (location !== CONSTANTS.finalPositions[id].split(";")[0]) {
											ELEMENTS.gameMoves.solveStatus.innerText = "moving " + id
											if (location.split(",")[2] == -1) { // back
												STATE.futureMoves.push("up-clockwise", "back-clockwise") && solveCube()
												return
											}
											else if (location.split(",")[2] == 0) { // middle
												STATE.futureMoves.push("up-clockwise", "down-clockwise") && solveCube()
												return
											}
											else { // front
												STATE.futureMoves.push("front-clockwise") && solveCube()
												return
											}
										}

									// orientation
										ELEMENTS.gameMoves.solveStatus.innerText = "turning " + id
										STATE.futureMoves.push("front-clockwise", "left-clockwise", "up-counterclockwise", "front-clockwise", "front-clockwise") && solveCube()
										return
								}
							}
						
							{
								const id = "left-down edge"
								const subcube = getPositionInCube(id)
								if (subcube !== CONSTANTS.finalPositions[id]) {
									// location
										const location = subcube.split(";")[0]
										if (location !== CONSTANTS.finalPositions[id].split(";")[0]) {
											ELEMENTS.gameMoves.solveStatus.innerText = "moving " + id
											if (location.split(",")[0] == 1) { // right
												STATE.futureMoves.push("up-clockwise", "right-clockwise") && solveCube()
												return
											}
											else if (location.split(",")[0] == 0) { // middle
												STATE.futureMoves.push("up-clockwise", "down-counterclockwise", "left-clockwise", "down-clockwise") && solveCube()
												return
											}
											else { // left
												STATE.futureMoves.push("left-clockwise") && solveCube()
												return
											}
										}

									// orientation
										ELEMENTS.gameMoves.solveStatus.innerText = "turning " + id
										STATE.futureMoves.push("left-clockwise", "left-clockwise", "up-clockwise", "back-counterclockwise", "left-clockwise") && solveCube()
										return
								}
							}

							{
								const id = "down-back edge"
								const subcube = getPositionInCube(id)
								if (subcube !== CONSTANTS.finalPositions[id]) {
									// location
										const location = subcube.split(";")[0]
										if (location !== CONSTANTS.finalPositions[id].split(";")[0]) {
											ELEMENTS.gameMoves.solveStatus.innerText = "moving " + id
											if (location.split(",")[2] == 1) { // front
												STATE.futureMoves.push("right-clockwise", "up-clockwise", "front-clockwise", "right-clockwise", "up-clockwise", "front-counterclockwise") && solveCube()
												return
											}
											else if (location.split(",")[2] == 0) { // middle
												STATE.futureMoves.push("up-clockwise", "right-clockwise") && solveCube()
												return
											}
											else { // back
												STATE.futureMoves.push("back-clockwise") && solveCube()
												return
											}
										}

									// orientation
										ELEMENTS.gameMoves.solveStatus.innerText = "turning " + id
										STATE.futureMoves.push("back-clockwise", "back-clockwise", "up-clockwise", "right-clockwise", "back-clockwise") && solveCube()
										return
								}
							}

							{
								const id = "right-down edge"
								const subcube = getPositionInCube(id)
								if (subcube !== CONSTANTS.finalPositions[id]) {
									// location
										const location = subcube.split(";")[0]
										if (location !== CONSTANTS.finalPositions[id].split(";")[0]) {
											ELEMENTS.gameMoves.solveStatus.innerText = "moving " + id
											if (location.split(",")[0] == -1) { // left
												STATE.futureMoves.push("left-clockwise", "up-clockwise", "left-counterclockwise", "up-clockwise", "left-counterclockwise", "up-clockwise", "left-clockwise") && solveCube()
												return
											}
											else if (location.split(",")[0] == 0) { // middle
												STATE.futureMoves.push("up-clockwise", "right-clockwise") && solveCube()
												return
											}
											else { // right
												STATE.futureMoves.push("right-clockwise") && solveCube()
												return
											}
										}

									// orientation
										ELEMENTS.gameMoves.solveStatus.innerText = "turning " + id
										STATE.futureMoves.push("right-clockwise", "right-clockwise", "up-clockwise", "front-clockwise", "right-counterclockwise", "front-counterclockwise") && solveCube()
										return
								}
							}

						// WHITE FACE
							{
								const id = "front-left-down corner"
								const subcube = getPositionInCube(id)
								if (subcube !== CONSTANTS.finalPositions[id]) {
									// location
										const location = subcube.split(";")[0]
										if (location !== CONSTANTS.finalPositions[id].split(";")[0]) {
											ELEMENTS.gameMoves.solveStatus.innerText = "moving " + id
											if (location.split(",")[0] == 1) { // right
												STATE.futureMoves.push("up-clockwise", "right-clockwise", "up-clockwise", "right-clockwise", "right-clockwise", "up-clockwise", "right-clockwise") && solveCube()
												return
											}
											else if (location.split(",")[2] == -1) { // back
												STATE.futureMoves.push("up-counterclockwise", "back-clockwise", "up-counterclockwise", "back-counterclockwise", "up-clockwise") && solveCube()
												return
											}
											else { // front-left-up
												STATE.futureMoves.push("up-counterclockwise", "left-clockwise", "up-clockwise", "left-counterclockwise") && solveCube()
												return
											}
										}

									// orientation
										ELEMENTS.gameMoves.solveStatus.innerText = "turning " + id
										STATE.futureMoves.push("left-clockwise", "up-counterclockwise", "left-counterclockwise", "up-clockwise", "left-clockwise", "up-counterclockwise", "left-counterclockwise", "up-clockwise") && solveCube()
										return
								}
							}

							{
								const id = "left-down-back corner"
								const subcube = getPositionInCube(id)
								if (subcube !== CONSTANTS.finalPositions[id]) {
									// location
										const location = subcube.split(";")[0]
										if (location !== CONSTANTS.finalPositions[id].split(";")[0]) {
											ELEMENTS.gameMoves.solveStatus.innerText = "moving " + id
											if (location.split(",")[2] == 1) { // front
												STATE.futureMoves.push("right-clockwise", "up-clockwise", "right-counterclockwise", "up-clockwise") && solveCube()
												return
											}
											else if (location.split(",")[0] == 1) { // right
												STATE.futureMoves.push("back-counterclockwise", "up-counterclockwise", "back-clockwise", "up-counterclockwise") && solveCube()
												return
											}
											else { // left-up-back
												STATE.futureMoves.push("back-clockwise", "up-counterclockwise", "back-counterclockwise") && solveCube()
												return
											}
										}

									// orientation
										ELEMENTS.gameMoves.solveStatus.innerText = "turning " + id
										STATE.futureMoves.push("back-clockwise", "up-counterclockwise", "back-counterclockwise", "up-clockwise", "back-clockwise", "up-counterclockwise", "back-counterclockwise", "up-clockwise") && solveCube()
										return
								}
							}
						
							{
								const id = "right-down-back corner"
								const subcube = getPositionInCube(id)
								if (subcube !== CONSTANTS.finalPositions[id]) {
									// location
										const location = subcube.split(";")[0]
										if (location !== CONSTANTS.finalPositions[id].split(";")[0]) {
											ELEMENTS.gameMoves.solveStatus.innerText = "moving " + id
											if (location.split(",")[1] == -1) { // down
												STATE.futureMoves.push("right-clockwise", "up-clockwise", "right-counterclockwise") && solveCube()
												return
											}
											else if (location.split(",")[0] == -1 || location.split(",")[2] == 1) { // left or front-up-right
												STATE.futureMoves.push("up-clockwise") && solveCube()
												return
											}
											else { // up-right-back
												STATE.futureMoves.push("up-clockwise", "back-counterclockwise", "up-counterclockwise", "back-clockwise") && solveCube()
												return
											}
										}

									// orientation
										ELEMENTS.gameMoves.solveStatus.innerText = "turning " + id
										STATE.futureMoves.push("back-counterclockwise", "up-clockwise", "back-clockwise", "up-counterclockwise", "back-counterclockwise", "up-clockwise", "back-clockwise", "up-counterclockwise") && solveCube()
										return
								}
							}

							{
								const id = "front-right-down corner"
								const subcube = getPositionInCube(id)
								if (subcube !== CONSTANTS.finalPositions[id]) {
									// location
										const location = subcube.split(";")[0]
										if (location !== CONSTANTS.finalPositions[id].split(";")[0]) {
											ELEMENTS.gameMoves.solveStatus.innerText = "moving " + id
											if (location.split(",")[0] == -1 || location.split(",")[2] == -1) { // left or up-right-back
												STATE.futureMoves.push("up-clockwise") && solveCube()
												return
											}
											else { // front-up-right
												STATE.futureMoves.push("up-clockwise", "right-clockwise", "up-counterclockwise", "right-counterclockwise") && solveCube()
												return
											}
										}

									// orientation
										ELEMENTS.gameMoves.solveStatus.innerText = "turning " + id
										STATE.futureMoves.push("right-clockwise", "up-counterclockwise", "right-counterclockwise", "up-clockwise", "right-clockwise", "up-counterclockwise", "right-counterclockwise", "up-clockwise") && solveCube()
										return
								}
							}

						// next
							STATE.solveLayer = "middle"
							ELEMENTS.gameMoves.solveStatus.innerText = "LAYER: " + STATE.solveLayer
					}

				// LAYER: MIDDLE
					if (STATE.solveLayer == "middle") {
						// EDGES
							{
								const id = "front-left edge"
								const subcube = getPositionInCube(id)
								if (subcube !== CONSTANTS.finalPositions[id]) {
									// location & orientation
										const location = subcube.split(";")[0]
										ELEMENTS.gameMoves.solveStatus.innerText = "moving " + id
										if (location.split(",")[1] == 0) { // middle
											if (location == "-1,0,1") {
												STATE.futureMoves.push("up-counterclockwise", "left-clockwise", "up-clockwise", "left-counterclockwise", "up-clockwise", "front-clockwise", "up-counterclockwise", "front-counterclockwise") && solveCube()
												return
											}
											else if (location == "-1,0,-1") {
												STATE.futureMoves.push("up-counterclockwise", "back-clockwise", "up-clockwise", "back-counterclockwise", "up-clockwise", "left-counterclockwise", "up-counterclockwise", "left-clockwise") && solveCube()
												return
											}
											else if (location == "1,0,-1") {
												STATE.futureMoves.push("up-counterclockwise", "right-counterclockwise", "up-clockwise", "right-clockwise", "up-clockwise", "back-counterclockwise", "up-counterclockwise", "back-clockwise") && solveCube()
												return
											}
											else if (location == "1,0,1") {
												STATE.futureMoves.push("up-counterclockwise", "front-counterclockwise", "up-clockwise", "front-clockwise", "up-clockwise", "right-clockwise", "up-counterclockwise", "right-counterclockwise") && solveCube()
												return
											}
										}
										else if (subcube.split(";")[1].split(",")[0] == "front") { // aligned
											STATE.futureMoves.push("up-counterclockwise", "left-clockwise", "up-clockwise", "left-counterclockwise", "up-clockwise", "front-clockwise", "up-counterclockwise", "front-counterclockwise") && solveCube()
											return
										}
										else if (subcube.split(";")[1].split(",")[1] == "left") { // aligned
											STATE.futureMoves.push("up-clockwise", "front-clockwise", "up-counterclockwise", "front-counterclockwise", "up-counterclockwise", "left-clockwise", "up-clockwise", "left-counterclockwise") && solveCube()
											return
										}
										else { // not over the right band
											STATE.futureMoves.push("up-clockwise") && solveCube()
											return
										}
								}
							}

							{
								const id = "left-back edge"
								const subcube = getPositionInCube(id)
								if (subcube !== CONSTANTS.finalPositions[id]) {
									// location & orientation
										const location = subcube.split(";")[0]
										ELEMENTS.gameMoves.solveStatus.innerText = "moving " + id
										if (location.split(",")[1] == 0) { // middle
											if (location == "-1,0,1") {
												STATE.futureMoves.push("up-counterclockwise", "left-clockwise", "up-clockwise", "left-counterclockwise", "up-clockwise", "front-clockwise", "up-counterclockwise", "front-counterclockwise") && solveCube()
												return
											}
											else if (location == "-1,0,-1") {
												STATE.futureMoves.push("up-counterclockwise", "back-clockwise", "up-clockwise", "back-counterclockwise", "up-clockwise", "left-counterclockwise", "up-counterclockwise", "left-clockwise") && solveCube()
												return
											}
											else if (location == "1,0,-1") {
												STATE.futureMoves.push("up-counterclockwise", "right-counterclockwise", "up-clockwise", "right-clockwise", "up-clockwise", "back-counterclockwise", "up-counterclockwise", "back-clockwise") && solveCube()
												return
											}
											else if (location == "1,0,1") {
												STATE.futureMoves.push("up-counterclockwise", "front-counterclockwise", "up-clockwise", "front-clockwise", "up-clockwise", "right-clockwise", "up-counterclockwise", "right-counterclockwise") && solveCube()
												return
											}
										}
										else if (subcube.split(";")[1].split(",")[1] == "left") { // aligned
											STATE.futureMoves.push("up-counterclockwise", "back-clockwise", "up-clockwise", "back-counterclockwise", "up-clockwise", "left-counterclockwise", "up-counterclockwise", "left-clockwise") && solveCube()
											return
										}
										else if (subcube.split(";")[1].split(",")[5] == "back") { // aligned
											STATE.futureMoves.push("up-clockwise", "left-counterclockwise", "up-counterclockwise", "left-clockwise", "up-counterclockwise", "back-clockwise", "up-clockwise", "back-counterclockwise") && solveCube()
											return
										}
										else { // not over the right band
											STATE.futureMoves.push("up-clockwise") && solveCube()
											return
										}
								}
							}
						
							{
								const id = "right-back edge"
								const subcube = getPositionInCube(id)
								if (subcube !== CONSTANTS.finalPositions[id]) {
									// location & orientation
										const location = subcube.split(";")[0]
										ELEMENTS.gameMoves.solveStatus.innerText = "moving " + id
										if (location.split(",")[1] == 0) { // middle
											if (location == "-1,0,1") {
												STATE.futureMoves.push("up-counterclockwise", "left-clockwise", "up-clockwise", "left-counterclockwise", "up-clockwise", "front-clockwise", "up-counterclockwise", "front-counterclockwise") && solveCube()
												return
											}
											else if (location == "-1,0,-1") {
												STATE.futureMoves.push("up-counterclockwise", "back-clockwise", "up-clockwise", "back-counterclockwise", "up-clockwise", "left-counterclockwise", "up-counterclockwise", "left-clockwise") && solveCube()
												return
											}
											else if (location == "1,0,-1") {
												STATE.futureMoves.push("up-counterclockwise", "right-counterclockwise", "up-clockwise", "right-clockwise", "up-clockwise", "back-counterclockwise", "up-counterclockwise", "back-clockwise") && solveCube()
												return
											}
											else if (location == "1,0,1") {
												STATE.futureMoves.push("up-counterclockwise", "front-counterclockwise", "up-clockwise", "front-clockwise", "up-clockwise", "right-clockwise", "up-counterclockwise", "right-counterclockwise") && solveCube()
												return
											}
										}
										else if (subcube.split(";")[1].split(",")[5] == "back") { // aligned
											STATE.futureMoves.push("up-counterclockwise", "right-counterclockwise", "up-clockwise", "right-clockwise", "up-clockwise", "back-counterclockwise", "up-counterclockwise", "back-clockwise") && solveCube()
											return
										}
										else if (subcube.split(";")[1].split(",")[3] == "right") { // aligned
											STATE.futureMoves.push("up-clockwise", "back-counterclockwise", "up-counterclockwise", "back-clockwise", "up-counterclockwise", "right-counterclockwise", "up-clockwise", "right-clockwise") && solveCube()
											return
										}
										else { // not over the right band
											STATE.futureMoves.push("up-clockwise") && solveCube()
											return
										}
								}
							}

							{
								const id = "front-right edge"
								const subcube = getPositionInCube(id)
								if (subcube !== CONSTANTS.finalPositions[id]) {
									// location & orientation
										const location = subcube.split(";")[0]
										ELEMENTS.gameMoves.solveStatus.innerText = "moving " + id
										if (location.split(",")[1] == 0) { // middle
											if (location == "-1,0,1") {
												STATE.futureMoves.push("up-counterclockwise", "left-clockwise", "up-clockwise", "left-counterclockwise", "up-clockwise", "front-clockwise", "up-counterclockwise", "front-counterclockwise") && solveCube()
												return
											}
											else if (location == "-1,0,-1") {
												STATE.futureMoves.push("up-counterclockwise", "back-clockwise", "up-clockwise", "back-counterclockwise", "up-clockwise", "left-counterclockwise", "up-counterclockwise", "left-clockwise") && solveCube()
												return
											}
											else if (location == "1,0,-1") {
												STATE.futureMoves.push("up-counterclockwise", "right-counterclockwise", "up-clockwise", "right-clockwise", "up-clockwise", "back-counterclockwise", "up-counterclockwise", "back-clockwise") && solveCube()
												return
											}
											else if (location == "1,0,1") {
												STATE.futureMoves.push("up-counterclockwise", "front-counterclockwise", "up-clockwise", "front-clockwise", "up-clockwise", "right-clockwise", "up-counterclockwise", "right-counterclockwise") && solveCube()
												return
											}
										}
										else if (subcube.split(";")[1].split(",")[3] == "right") { // aligned
											STATE.futureMoves.push("up-counterclockwise", "front-counterclockwise", "up-clockwise", "front-clockwise", "up-clockwise", "right-clockwise", "up-counterclockwise", "right-counterclockwise") && solveCube()
											return
										}
										else if (subcube.split(";")[1].split(",")[0] == "front") { // aligned
											STATE.futureMoves.push("up-clockwise", "right-clockwise", "up-counterclockwise", "right-counterclockwise", "up-counterclockwise", "front-counterclockwise", "up-clockwise", "front-clockwise") && solveCube()
											return
										}
										else { // not over the right band
											STATE.futureMoves.push("up-clockwise") && solveCube()
											return
										}
								}
							}

						// next
							STATE.solveLayer = "up"
							ELEMENTS.gameMoves.solveStatus.innerText = "LAYER: " + STATE.solveLayer
					}

				// LAYER: UP
					if (STATE.solveLayer == "up") {
						// YELLOW CROSS
							{
								const frontUpEdge = getPositionInCube("front-up edge").split(";")
								const leftUpEdge = getPositionInCube("left-up edge").split(";")
								const backUpEdge = getPositionInCube("up-back edge").split(";")
								const rightUpEdge = getPositionInCube("up-right edge").split(";")
								const upEdges = [frontUpEdge, leftUpEdge, backUpEdge, rightUpEdge]

								const upUps = 	((frontUpEdge[1].split(",")[2] == "up") ? 1 : 0) +
												((leftUpEdge[1].split(",")[2] == "up") ? 1 : 0) +
												((backUpEdge[1].split(",")[2] == "up") ? 1 : 0) +
												((rightUpEdge[1].split(",")[2] == "up") ? 1 : 0)
								// up dot --> L
									if (upUps == 0) {
										ELEMENTS.gameMoves.solveStatus.innerText = "up face"
										STATE.futureMoves.push("front-clockwise", "right-clockwise", "up-clockwise", "right-counterclockwise", "up-counterclockwise", "front-counterclockwise") && solveCube()
										return
									}

								// up L or |
									if (upUps == 2) {
										ELEMENTS.gameMoves.solveStatus.innerText = "up cross"
										// left one is not up on up
											const leftEdge = upEdges.find(function(e) { return e[0] == "-1,1,0" })
											if (leftEdge[1].split(",")[2] !== "up") {
												STATE.futureMoves.push("up-clockwise") && solveCube()
												return
											}

										// front is up on up
											const frontEdge = upEdges.find(function(e) { return e[0] == "0,1,1" })
											if (frontEdge[1].split(",")[2] == "up") {
												STATE.futureMoves.push("up-clockwise") && solveCube()
												return
											}

										// L --> | --> +
											STATE.futureMoves.push("front-clockwise", "right-clockwise", "up-clockwise", "right-counterclockwise", "up-counterclockwise", "front-counterclockwise") && solveCube()
											return
									}
							}

						// COLOR BANDS
							{
								const id = "front-up edge"
								const subcube = getPositionInCube(id)
								if (subcube !== CONSTANTS.finalPositions[id]) {
									ELEMENTS.gameMoves.solveStatus.innerText = "moving " + id
									STATE.futureMoves.push("up-clockwise") && solveCube()
									return
								}
							}

							{
								const id = "left-up edge"
								const subcube = getPositionInCube(id)
								if (subcube !== CONSTANTS.finalPositions[id]) {
									ELEMENTS.gameMoves.solveStatus.innerText = "moving " + id
									const location = subcube.split(";")[0]
									// right side
										if (location == "1,1,0") {
											STATE.futureMoves.push("left-counterclockwise", "up-clockwise", "left-clockwise", "up-clockwise", "left-counterclockwise", "up-clockwise", "up-clockwise", "left-clockwise", "up-clockwise") && solveCube()
											return
										}

									// back side
										STATE.futureMoves.push("front-clockwise", "up-clockwise", "front-counterclockwise", "up-clockwise", "front-clockwise", "up-clockwise", "up-clockwise", "front-counterclockwise", "up-clockwise") && solveCube()
										return
								}
							}

							{
								const id = "up-back edge"
								const subcube = getPositionInCube(id)
								if (subcube !== CONSTANTS.finalPositions[id]) {
									ELEMENTS.gameMoves.solveStatus.innerText = "moving " + id
									STATE.futureMoves.push("left-counterclockwise", "up-clockwise", "left-clockwise", "up-clockwise", "left-counterclockwise", "up-clockwise", "up-clockwise", "left-clockwise", "up-clockwise") && solveCube()
									return
								}
							}

						// CORNERS - LOCATE
							{
								const id = "front-left-up corner"
								const subcube = getPositionInCube(id)
								const location = subcube.split(";")[0]
								if (location !== CONSTANTS.finalPositions[id].split(";")[0]) {
									ELEMENTS.gameMoves.solveStatus.innerText = "moving " + id
									
									if (location == "1,1,1") {
										STATE.futureMoves.push("up-clockwise", "front-clockwise", "up-counterclockwise", "back-clockwise", "up-clockwise", "front-counterclockwise", "up-counterclockwise", "back-counterclockwise") && solveCube()
										return
									}
									
									STATE.futureMoves.push("up-clockwise", "right-clockwise", "up-counterclockwise", "left-clockwise", "up-clockwise", "right-counterclockwise", "up-counterclockwise", "left-counterclockwise") && solveCube()
									return
								}
							}
						
							{
								const id = "front-up-right corner"
								const subcube = getPositionInCube(id)
								const location = subcube.split(";")[0]
								if (location !== CONSTANTS.finalPositions[id].split(";")[0]) {
									ELEMENTS.gameMoves.solveStatus.innerText = "moving " + id
									
									STATE.futureMoves.push("up-clockwise", "front-clockwise", "up-counterclockwise", "back-clockwise", "up-clockwise", "front-counterclockwise", "up-counterclockwise", "back-counterclockwise") && solveCube()
									return
								}
							}

						// next
							STATE.solveLayer = "final corners"
							ELEMENTS.gameMoves.solveStatus.innerText = "turning " + STATE.solveLayer
					}

				// LAYER: FINAL
					if (STATE.solveLayer == "final corners") {
						// CORNERS - ORIENT
							{
								const frontLeftUpCorner = getPositionInCube("front-left-up corner").split(";")
								const backLeftUpCorner = getPositionInCube("left-up-back corner").split(";")
								const backRightUpCorner = getPositionInCube("up-right-back corner").split(";")
								const frontRightUpCorner = getPositionInCube("front-up-right corner").split(";")
								const upCorners = [frontLeftUpCorner, backLeftUpCorner, backRightUpCorner, frontRightUpCorner]

								const upUps = 	((frontLeftUpCorner[1].split(",")[2] == "up") ? 1 : 0) +
													((backLeftUpCorner[1].split(",")[2] == "up") ? 1 : 0) +
													((backRightUpCorner[1].split(",")[2] == "up") ? 1 : 0) +
													((frontRightUpCorner[1].split(",")[2] == "up") ? 1 : 0)

								if (upUps !== 4) {
									const frontRightUpCorner = upCorners.find(function(c) { return c[0] == "1,1,1" })

									if (frontRightUpCorner[1].split(",")[2] == "up") {
										STATE.futureMoves.push("up-clockwise") && solveCube()
										return
									}

									STATE.futureMoves.push("right-counterclockwise", "down-clockwise", "right-clockwise", "down-counterclockwise", "right-counterclockwise", "down-clockwise", "right-clockwise", "down-counterclockwise") && solveCube()
									return
								}

								if (frontLeftUpCorner[0] !== CONSTANTS.finalPositions["front-left-up corner"].split(";")[0]) {
									ELEMENTS.gameMoves.solveStatus.innerText = "final turn"
									STATE.futureMoves.push("up-clockwise") && solveCube()
									return
								}
							}

						// next
							STATE.solveLayer = null
					}

				// FINISH
					ELEMENTS.gameMoves.solveStatus.innerText = "SOLVED"
					ELEMENTS.gameMoves.solve.blur()
			} catch (error) {console.log(error)}
		}

/*** cube ***/
	/* generateCube */
		generateCube()
		function generateCube() {
			try {
				// reset cube
					STATE.cube.orientation = JSON.parse(JSON.stringify(CONSTANTS.defaultFaces))
					STATE.cube.rotation = JSON.parse(JSON.stringify(CONSTANTS.defaultRotation))
					STATE.cube.subcubes = []

				// big cube coordinates
					const startingCoordinate = -1 * CONSTANTS.cubeLength * CONSTANTS.cubesPerSide / 2
					const endingCoordinate = CONSTANTS.cubeLength * CONSTANTS.cubesPerSide / 2

				// loop through x, y, z
					for (let x1 = startingCoordinate; x1 < endingCoordinate; x1 += CONSTANTS.cubeLength) {
						const x2 = x1 + CONSTANTS.cubeLength
						for (let y1 = startingCoordinate; y1 < endingCoordinate; y1 += CONSTANTS.cubeLength) {
							const y2 = y1 + CONSTANTS.cubeLength
							for (let z1 = startingCoordinate; z1 < endingCoordinate; z1 += CONSTANTS.cubeLength) {
								const z2 = z1 + CONSTANTS.cubeLength

								// subcube
									const subcube = generateSubcube([x1, y1, z1], [x2, y2, z2], startingCoordinate, endingCoordinate)

								// add to cube
									STATE.cube.subcubes.push(subcube)
							}
						}
					}

				// default rotation
					for (const axis in CONSTANTS.defaultRotation) {
						const radians = getRadians(CONSTANTS.defaultRotation[axis])
						if (radians) {
							const sin = Math.sin(radians)
							const cos = Math.cos(radians)
							for (const s in STATE.cube.subcubes) {
								rotateSubcube(STATE.cube.subcubes[s], axis, sin, cos)
							}
						}
					}

				// draw
					drawCube()
			} catch (error) {console.log(error)}
		}

	/* generateSubcube */
		function generateSubcube(cornerA, cornerB, startingCoordinate, endingCoordinate) {
			try {
				// coordinates
					const [x1, y1, z1] = cornerA
					const [x2, y2, z2] = cornerB

				// outwardFaces
					const outwardFaces = {
						front: 	Boolean(z2 == endingCoordinate  ),
						left: 	Boolean(x1 == startingCoordinate),
						up: 	Boolean(y2 == endingCoordinate  ),
						right: 	Boolean(x2 == endingCoordinate  ),
						down: 	Boolean(y1 == startingCoordinate),
						back: 	Boolean(z1 == startingCoordinate)
					}

				// id
					const outwardFaceNames = Object.keys(outwardFaces).filter(function(f) { return outwardFaces[f] })
					const type = CONSTANTS.subcubeTypes[outwardFaceNames.length]
					const id = (outwardFaceNames.length ? (outwardFaceNames.join("-") + " ") : "") + type

				// faces
					const faces = []
					for (const f in CONSTANTS.defaultFaces) {
						faces.push({
							id: id + ": " + f,
							face: f,
							color: outwardFaces[f] ? f : "interior",
							coordinates: CONSTANTS.defaultFaceCoordinates[f]
						})
					}
								
				// build subcube
					return {
						id: id,
						type: type,
						center: [(x1 + x2) / 2, (y1 + y2) / 2, (z1 + z2) / 2],
						vertices: [[x2, y2, z2], [x1, y2, z2], [x1, y1, z2], [x2, y1, z2], [x2, y2, z1], [x1, y2, z1], [x1, y1, z1], [x2, y1, z1]],
						edges: JSON.parse(JSON.stringify(CONSTANTS.defaultEdges)),
						orientation: JSON.parse(JSON.stringify(CONSTANTS.defaultFaces)),
						faces: faces
					}
			} catch (error) {console.log(error)}
		}

	/* randomMoveCube */
		function generateRandomMove() {
			try {
				// generate move
					const face = chooseRandom([...Object.keys(CONSTANTS.defaultRotation), ...Object.keys(CONSTANTS.defaultFaces), ...Object.keys(CONSTANTS.defaultFaces)])
					const direction = chooseRandom(CONSTANTS.directions)
				
				// return
					return face + "-" + direction
			} catch (error) {console.log(error)}
		}

	/* moveCube */
		function moveCube(face, direction, callback) {
			try {
				// x / y / z
					if (face in CONSTANTS.defaultRotation) {
						quarterTurnCube(face, direction, callback)
					}

				// u / d / l / r / f / b
					else {
						quarterTurnFace(face, direction, callback)
					}
			} catch (error) {console.log(error)}
		}

	/* quarterTurnCube */
		function quarterTurnCube(axis, direction, callback) {
			try {
				// already animating?
					if (STATE.animation) {
						return
					}

				// flip z
					if (axis == "z") {
						if (direction == "clockwise") {
							direction = "counterclockwise"
						}
						else {
							direction = "clockwise"
						}
					}

				// angles
					const degrees = (CONSTANTS.circleDegrees / 4) * (direction == "counterclockwise" ? -1 : 1)

				// main cube
					STATE.cube.rotation[axis] = getMinDegrees(STATE.cube.rotation[axis] + degrees)

				// animation
					STATE.pastMoves.push(axis + "-" + direction)
					STATE.animation = {
						subcubes: STATE.cube.subcubes,
						axis: axis,
						degrees: degrees,
						loop: setInterval(animateRotation, CONSTANTS.animationInterval, callback)
					}

				// swap orientation
					swapOrientations(STATE.cube, axis, direction)
					for (const s in STATE.cube.subcubes) {
						swapOrientations(STATE.cube.subcubes[s], axis, direction)
					}
			} catch (error) {console.log(error)}
		}

	/* quarterTurnFace */
		function quarterTurnFace(face, direction, callback) {
			try {
				// already animating?
					if (STATE.animation) {
						return
					}

				// flip z
					if (face == "front" || face == "back") {
						if (direction == "clockwise") {
							direction = "counterclockwise"
						}
						else {
							direction = "clockwise"
						}
					}

				// angles
					const degrees = (CONSTANTS.circleDegrees / 4) * (direction == "counterclockwise" ? -1 : 1)
					const radians = getRadians(degrees)
					const sin   = Math.sin(radians)
					const cos   = Math.cos(radians)

				// get the 9 cubes that are turning
					// get the color of the center of the face that we're turning
						const turnedFace = STATE.cube.orientation[face]

					// get that subcube
						const middleSubcube = STATE.cube.subcubes.find(function(subcube) { return subcube.id == turnedFace + " middle" })

					// get the colored face
						const middleSubcubeFace = middleSubcube.faces.find(function(middleSubcubeFace) { return middleSubcubeFace.face == turnedFace })
						const middleSubcubeVertices = [
							middleSubcube.vertices[middleSubcubeFace.coordinates[0]],
							middleSubcube.vertices[middleSubcubeFace.coordinates[1]],
							middleSubcube.vertices[middleSubcubeFace.coordinates[2]],
							middleSubcube.vertices[middleSubcubeFace.coordinates[3]]
						]

					// get the 9 subcubes that share a vertex with that face (including this one)
						const subcubesToRotate = STATE.cube.subcubes.filter(function(subcube) {
							return subcube.vertices.find(function (vertex) {
								return ((Math.abs(vertex[0] - middleSubcubeVertices[0][0]) < CONSTANTS.threshold && Math.abs(vertex[1] - middleSubcubeVertices[0][1]) < CONSTANTS.threshold && Math.abs(vertex[2] - middleSubcubeVertices[0][2]) < CONSTANTS.threshold) ||
										(Math.abs(vertex[0] - middleSubcubeVertices[1][0]) < CONSTANTS.threshold && Math.abs(vertex[1] - middleSubcubeVertices[1][1]) < CONSTANTS.threshold && Math.abs(vertex[2] - middleSubcubeVertices[1][2]) < CONSTANTS.threshold) ||
										(Math.abs(vertex[0] - middleSubcubeVertices[2][0]) < CONSTANTS.threshold && Math.abs(vertex[1] - middleSubcubeVertices[2][1]) < CONSTANTS.threshold && Math.abs(vertex[2] - middleSubcubeVertices[2][2]) < CONSTANTS.threshold) ||
										(Math.abs(vertex[0] - middleSubcubeVertices[3][0]) < CONSTANTS.threshold && Math.abs(vertex[1] - middleSubcubeVertices[3][1]) < CONSTANTS.threshold && Math.abs(vertex[2] - middleSubcubeVertices[3][2]) < CONSTANTS.threshold))
							})
						})

				// animation
					STATE.pastMoves.push(face + "-" + direction)
					STATE.animation = {
						subcubes: subcubesToRotate,
						axis: CONSTANTS.axis[face],
						degrees: degrees,
						loop: setInterval(animateRotation, CONSTANTS.animationInterval, callback)
					}

				// swap orientation
					for (const s in subcubesToRotate) {
						swapOrientations(subcubesToRotate[s], CONSTANTS.axis[face], direction)
					}
			} catch (error) {console.log(error)}
		}

	/* animateRotation */
		function animateRotation(callback) {
			try {
				// done?
					if (Math.abs(STATE.animation.degrees) < CONSTANTS.threshold) {
						clearInterval(STATE.animation.loop)
						STATE.animation = null
						if (callback) {
							callback()
						}
						return
					}

				// get math
					const degrees = Math.sign(STATE.animation.degrees) * Math.min(STATE.settings.animationDegrees * CONSTANTS.animationInterval, Math.abs(STATE.animation.degrees))
					const radians = getRadians(degrees)
					const sin   = Math.sin(radians)
					const cos   = Math.cos(radians)

				// loop through cubes
					for (const s in STATE.animation.subcubes) {
						rotateSubcube(STATE.animation.subcubes[s], STATE.animation.axis, sin, cos)
					}

				// update
					STATE.animation.degrees = STATE.animation.degrees - degrees

				// redraw
					drawCube()
			} catch (error) {console.log(error)}
		}

	/* rotateSubcube */
		function rotateSubcube(subcube, axis, sin, cos) {
			try {
				// x
					if (axis == "x") {
						for (const v in subcube.vertices) {
							const y = subcube.vertices[v][1]
							const z = subcube.vertices[v][2]
							subcube.vertices[v][2] = Math.round((z * cos * CONSTANTS.rounding) - (y * sin * CONSTANTS.rounding)) / CONSTANTS.rounding
							subcube.vertices[v][1] = Math.round((y * cos * CONSTANTS.rounding) + (z * sin * CONSTANTS.rounding)) / CONSTANTS.rounding
						}

						const centerY = subcube.center[1]
						const centerZ = subcube.center[2]
						subcube.center[2] = Math.round((centerZ * cos * CONSTANTS.rounding) - (centerY * sin * CONSTANTS.rounding)) / CONSTANTS.rounding
						subcube.center[1] = Math.round((centerY * cos * CONSTANTS.rounding) + (centerZ * sin * CONSTANTS.rounding)) / CONSTANTS.rounding
						return
					}

				// y
					if (axis == "y") {
						for (const v in subcube.vertices) {
							const x = subcube.vertices[v][0]
							const z = subcube.vertices[v][2]
							subcube.vertices[v][0] = Math.round((x * cos * CONSTANTS.rounding) - (z * sin * CONSTANTS.rounding)) / CONSTANTS.rounding
							subcube.vertices[v][2] = Math.round((z * cos * CONSTANTS.rounding) + (x * sin * CONSTANTS.rounding)) / CONSTANTS.rounding
						}

						const centerX = subcube.center[0]
						const centerZ = subcube.center[2]
						subcube.center[0] = Math.round((centerX * cos * CONSTANTS.rounding) - (centerZ * sin * CONSTANTS.rounding)) / CONSTANTS.rounding
						subcube.center[2] = Math.round((centerZ * cos * CONSTANTS.rounding) + (centerX * sin * CONSTANTS.rounding)) / CONSTANTS.rounding
						return
					}

				// z
					if (axis == "z") {
						for (const v in subcube.vertices) {
							const x = subcube.vertices[v][0]
							const y = subcube.vertices[v][1]
							subcube.vertices[v][0] = Math.round((x * cos * CONSTANTS.rounding) - (y * sin * CONSTANTS.rounding)) / CONSTANTS.rounding
							subcube.vertices[v][1] = Math.round((y * cos * CONSTANTS.rounding) + (x * sin * CONSTANTS.rounding)) / CONSTANTS.rounding
						}

						const centerX = subcube.center[0]
						const centerY = subcube.center[1]
						subcube.center[0] = Math.round((centerX * cos * CONSTANTS.rounding) - (centerY * sin * CONSTANTS.rounding)) / CONSTANTS.rounding
						subcube.center[1] = Math.round((centerY * cos * CONSTANTS.rounding) + (centerX * sin * CONSTANTS.rounding)) / CONSTANTS.rounding
						return
					}
			} catch (error) {console.log(error)}
		}

	/* swapOrientations */
		function swapOrientations(subcube, axis, direction) {
			try {
				// x
					if (axis == "x") {
						const tempFront = subcube.orientation.front
						if (direction == "clockwise") {
							subcube.orientation.front = subcube.orientation.down
							subcube.orientation.down = subcube.orientation.back
							subcube.orientation.back = subcube.orientation.up
							subcube.orientation.up = tempFront
						}
						else {
							subcube.orientation.front = subcube.orientation.up
							subcube.orientation.up = subcube.orientation.back
							subcube.orientation.back = subcube.orientation.down
							subcube.orientation.down = tempFront
						}
						return
					}
				
				// y
					if (axis == "y") {
						const tempFront = subcube.orientation.front
						if (direction == "clockwise") {
							subcube.orientation.front = subcube.orientation.right
							subcube.orientation.right = subcube.orientation.back
							subcube.orientation.back = subcube.orientation.left
							subcube.orientation.left = tempFront
						}
						else {
							subcube.orientation.front = subcube.orientation.left
							subcube.orientation.left = subcube.orientation.back
							subcube.orientation.back = subcube.orientation.right
							subcube.orientation.right = tempFront
						}
						return
					}
				
				// z
					if (axis == "z") {
						const tempUp = subcube.orientation.up
						if (direction == "clockwise") {
							subcube.orientation.up = subcube.orientation.right
							subcube.orientation.right = subcube.orientation.down
							subcube.orientation.down = subcube.orientation.left
							subcube.orientation.left = tempUp
						}
						else {
							subcube.orientation.up = subcube.orientation.left
							subcube.orientation.left = subcube.orientation.down
							subcube.orientation.down = subcube.orientation.right
							subcube.orientation.right = tempUp
						}
						return
					}
			} catch (error) {console.log(error)}
		}

	/* getPositionInCube */
		function getPositionInCube(id) {
			try {
				// get subcube
					const subcube = STATE.cube.subcubes.find(function(s) { return s.id == id })
					if (!subcube) {
						return null
					}

				// get reduced x/y/z position
					const reducedPosition = [
						Math.round(subcube.center[0] / CONSTANTS.cubeLength),
						Math.round(subcube.center[1] / CONSTANTS.cubeLength),
						Math.round(subcube.center[2] / CONSTANTS.cubeLength)
					]

				// get orientation
					const orientation = [
						subcube.orientation.front,
						subcube.orientation.left,
						subcube.orientation.up,
						subcube.orientation.right,
						subcube.orientation.down,
						subcube.orientation.back
					]

				// return as string
					return reducedPosition.join(",") + ";" + orientation.join(",")
			} catch (error) {console.log(error)}
		}

/*** math ***/
	/* getMinDegrees */
		function getMinDegrees(degrees) {
			try {
				while (degrees < 0) {
					degrees += CONSTANTS.circleDegrees
				}
				return degrees % CONSTANTS.circleDegrees
			} catch {console.log(error)}
		}

	/* getRadians */
		function getRadians(degrees) {
			try {
				return getMinDegrees(degrees) * CONSTANTS.circleRadians / CONSTANTS.circleDegrees
			} catch {console.log(error)}
		}

	/* getDegrees */
		function getDegrees(radians) {
			try {
				return getMinDegrees(radians * CONSTANTS.circleDegrees / CONSTANTS.circleRadians)
			} catch {console.log(error)}
		}

	/* getScalar */
		function getScalar(point) {
			try {
				const [x, y, z] = point
				return ((x ** 2) + (y ** 2) + ((z || 0) ** 2)) ** (1 / 2)
			} catch {console.log(error)}
		}

	/* getVector */
		function getVector(a, b) {
			try {
				return [
					(b[0] - a[0]),
					(b[1] - a[1]),
					(b[2] - a[2])
				]
			} catch (error) {console.log(error)}
		}

	/* getPlane */
		function getPlane(vertices) {
			try {
				// get vertices
					const [Qx, Qy, Qz] = vertices[0]
					const [Rx, Ry, Rz] = vertices[1]
					const [Sx, Sy, Sz] = vertices[2]

				// get plane
					// (a * Qx) + (b * Qy) + (c * Qz) + d = 0
					// (a * Rx) + (b * Ry) + (c * Rz) + d = 0
					// (a * Sx) + (b * Sy) + (c * Sz) + d = 0

				// xy plane
					if (Qz == Rz && Rz == Sz) {
						return {a: 0, b: 0, c: -1, d: Qz}
					}

				// xz plane
					if (Qy == Ry && Ry == Sy) {
						return {a: 0, b: -1, c: 0, d: Qy}
					}

				// yz plane
					if (Qx == Rx && Rx == Sx) {
						return {a: -1, b: 0, c: 0, d: Qx}
					}

				// compute
					const a = ((Ry - Qy) * (Sz - Qz)) - ((Sy - Qy) * (Rz - Qz))
					const b = ((Rz - Qz) * (Sx - Qx)) - ((Sz - Qz) * (Rx - Qx))
					const c = ((Rx - Qx) * (Sy - Qy)) - ((Sx - Qx) * (Ry - Qy))
					const d = -((a * Qx) + (b * Qy) + (c * Qz))

				// return
					return {a, b, c, d}
			} catch (error) {console.log(error)}
		}

	/* getTriangle */
		function getTriangle(vertices) {
			try {
				// sides
					const AB = getScalar(getVector(vertices[0], vertices[1]))
					const BC = getScalar(getVector(vertices[1], vertices[2]))
					const CA = getScalar(getVector(vertices[2], vertices[0]))
				
				// triangle
					return {
						vertices: vertices,
						AB: AB,
						BC: BC,
						CA: CA,
						area: getTriangleArea(AB, BC, CA)
					}
			} catch (error) {console.log(error)}
		}

	/* getTriangleArea */
		function getTriangleArea(AB, BC, CA) {
			try {
				// area = (semiPerimeter * (semiPerimeter - AB) * (semiPerimeter - BC) * (semiPerimeter - CA)) ** (1/2)
					const semiPerimeterABC = getSemiPerimeter(AB, BC, CA)
					return (semiPerimeterABC * (semiPerimeterABC - AB) * (semiPerimeterABC - BC) * (semiPerimeterABC - CA)) ** (1/2)
			} catch (error) {console.log(error)}
		}

	/* getSemiPerimeter */
		function getSemiPerimeter(AB, BC, CA) {
			try {
				// semiPerimeter = (AB + BC + CA) / 2
					return (AB + BC + CA) / 2
			} catch (error) {console.log(error)}
		}

	/* getIntersection */
		function getIntersection(rayVector, plane) {
			try {
				// get endpoints
					const [Cx, Cy, Cz] = STATE.camera
					const [Rx, Ry, Rz] = rayVector

				// ray vector
					// [Px, Py, Pz] = end point
					// Rx = Cx - Px
					// Ry = Cy - Py
					// Rz = Cz - Pz

				// ray equation
					// Ix = Cx - t * Rx
					// Iy = Cy - t * Ry
					// Iz = Cz - t * Rz

				// plane equation
					// (a * Ix) + (b * Iy) + (c * Iz) + d = 0
					const {a, b, c, d} = plane

				// solve for t
					// a * ((1 - t) * Cx + t * Px) + b * ((1 - t) * Cy + t * Py) + c * ((1 - t) * Cz + t * Pz) + d = 0
					// a * (Cx - t * Cx + t * Px) + b * (Cy - t * Cy + t * Py) + c * (Cz - t * Cz + t * Pz) + d = 0
					// a * (Cx - t * Cx + t * Px) + b * (Cy - t * Cy + t * Py) + c * (Cz - t * Cz + t * Pz) = -d
					// (a * Cx - a * Cx * t + a * Px * t) + (b * Cy - b * Cy * t + b * Py * t) + (c * Cz - c * Cz * t + c * Pz * t) = -d
					// (a * Cx) + (-a * Cx * t) + (a * Px * t) + (b * Cy) + (-b * Cy * t) + (b * Py * t) + (c * Cz) + (-c * Cz * t) + (c * Pz * t) = -d
					// (-a * Cx * t) + (a * Px * t) + (-b * Cy * t) + (b * Py * t) + (-c * Cz * t) + (c * Pz * t) = -d - (a * Cx) - (b * Cy) - (c * Cz)
					// t * ((-a * Cx) + (a * Px) + (-b * Cy) + (b * Py) + (-c * Cz) + (c * Pz)) = -d - (a * Cx) - (b * Cy) - (c * Cz)
					// t = (-d - (a * Cx) - (b * Cy) - (c * Cz)) / ((-a * Cx) + (a * Px) + (-b * Cy) + (b * Py) + (-c * Cz) + (c * Pz))
					// t = (-d - (a * Cx) - (b * Cy) - (c * Cz)) / ((a * -Cx) + (a * Px) + (b * -Cy) + (b * Py) + (c * -Cz) + (c * Pz))
					// t = (-d - (a * Cx) - (b * Cy) - (c * Cz)) / ((a * (Px - Cx)) + (b * (Py - Cy)) + (c * (Pz - Cz)))
					// t = -1 * (d + (a * Cx) + (b * Cy) + (c * Cz)) / ((a * (Px - Cx)) + (b * (Py - Cy)) + (c * (Pz - Cz)))
					// t = ((a * Cx) + (b * Cy) + (c * Cz) + d) / ((a * (Cx - Px)) + (b * (Cy - Py)) + (c * (Cz - Pz)))
					// t = ((a * Cx) + (b * Cy) + (c * Cz) + d) / ((a * Rx) + (b * Ry) + (c * Rz))

				// compute
					const t = ((a * Cx) + (b * Cy) + (c * Cz) + d) / ((a * Rx) + (b * Ry) + (c * Rz))

				// get I
					const Ix = Cx - t * Rx
					const Iy = Cy - t * Ry
					const Iz = Cz - t * Rz

				// return
					return [Ix, Iy, Iz]
			} catch (error) {console.log(error)}
		}

	/* getPointInTriangle */
		function getPointInTriangle(point, triangle) {
			try {
				// distances
					const AB = triangle.AB
					const BC = triangle.BC
					const CA = triangle.CA
					const PA = getScalar(getVector(point, triangle.vertices[0]))
					const PB = getScalar(getVector(point, triangle.vertices[1]))
					const PC = getScalar(getVector(point, triangle.vertices[2]))

				// Heron's formula for triangle ABC
					const areaABC = triangle.area
					const areaPBC = getTriangleArea(PB, BC, PC)
					const areaPCA = getTriangleArea(PC, CA, PA)
					const areaPAB = getTriangleArea(PA, AB, PB)

				// weight ratios
					// Px = a * Ax + b * Bx + c * Cx
					// Py = a * Ay + b * By + c * Cy
					// Pz = a * Az + b * Bz + c * Cz
					const a = (areaPBC / areaABC)
					const b = (areaPCA / areaABC)
					const c = (areaPAB / areaABC)
					
				// not coplanar?
					// a + b + c = 1
					if (Math.abs((a + b + c) - 1) > CONSTANTS.threshold) {
						return false
					}

				// any NaN?
					if (isNaN(a) || isNaN(b) || isNaN(c)) {
						return false
					}

				// 0 < [a, b, c] < 1
					if ((0 > a || a > 1) || (0 > b || b > 1) || (0 > c || c > 1)) {
						return false
					}

				// otherwise, true
					return true
			} catch (error) {console.log(error)}
		}

	/* getRayIntersectsFace */
		function getRayIntersectsFace(vertex, face) {
			try {
				// get intersection
					const intersection = getIntersection(vertex.rayVector, face.plane)

				// intersection is farther away than vertex we're testing?
					const intersectionScalar = getScalar(getVector(intersection, STATE.camera))
					const difference = intersectionScalar - vertex.rayScalar
					if (difference > CONSTANTS.threshold) {
						return false
					}

				// super close
					if (Math.abs(difference) < CONSTANTS.intersectionThreshold) {
						return false
					}

				// loop through triangles
					for (const t in face.triangles) {
						if (getPointInTriangle(intersection, face.triangles[t])) {
							return true
						}
					}

				// still here?
					return false
			} catch (error) {console.log(error)}
		}

	/* getThisBlocksThat */
		function getThisBlocksThat(thisSubcube, thatSubcube) {
			try {
				// loop through faces of thatSubcube
					for (const v in thatSubcube.vertices) {
						const thatVertex = thatSubcube.vertices[v]
						
						// loop through each vertex of thisSubcube
							faceLoop: for (const f in thisSubcube.faces) {
								const thisFace = thisSubcube.faces[f]

								for (const c in thisFace.vertices) {
									if (getScalar(getVector(thisFace.vertices[c], thatVertex)) < CONSTANTS.threshold) {
										continue faceLoop
									}
								}

								if (getRayIntersectsFace(thatVertex, thisFace)) {
									return true
								}
							}
					}

				// still here?
					return false
			} catch (error) {console.log(error)}
		}

	/* getProjection */
		function getProjection(point) {
			try {
				const projection = STATE.camera[2] / Math.abs(STATE.camera[2] - point[2])
				return [point[0] * projection, point[1] * projection]
			} catch (error) {console.log(error)}
		}

	/* chooseRandom */
		function chooseRandom(list) {
			try {
				return list[Math.floor(Math.random() * list.length)]
			} catch (error) {console.log(error)}
		}

/*** canvas ***/
	/* clearCanvas */
		function clearCanvas() {
			try {
				ELEMENTS.context.clearRect(0, 0, ELEMENTS.canvas.width, ELEMENTS.canvas.height)
			} catch (error) {console.log(error)}
		}

	/* drawCube */
		function drawCube() {
			try {
				// clear
					clearCanvas()

				// angles
					const rotations = {}
					for (const axis in STATE.adjustedPerspective) {
						const degrees = STATE.adjustedPerspective[axis]
						const radians = getRadians(degrees)
						rotations[axis] = {
							degrees: degrees,
							radians: radians,
							sin: Math.sin(radians),
							cos: Math.cos(radians)
						}
					}

				// get subcubes
					const adjustedSubcubes = []
					for (const s in STATE.cube.subcubes) {
						// copy
							const thisSubcube = JSON.parse(JSON.stringify(STATE.cube.subcubes[s]))

						// rotate
							for (const axis in rotations) {
								rotateSubcube(thisSubcube, axis, rotations[axis].sin, rotations[axis].cos)
							}

						// vertices
							thisSubcube.farthestVertex = null
							for (const v in thisSubcube.vertices) {
								const thisVertex = thisSubcube.vertices[v]
								thisVertex.rayVector = getVector(thisVertex, STATE.camera)
								thisVertex.rayScalar = getScalar(thisVertex.rayVector)
								thisVertex.cameraDistance = getScalar(thisVertex.rayVector)
								thisVertex.projection = getProjection(thisVertex)
								
								if (!thisSubcube.farthestVertex || thisVertex.cameraDistance > thisSubcube.farthestVertex.cameraDistance) {
									thisSubcube.farthestVertex = thisVertex
								}
							}

						// faces
							for (const f in thisSubcube.faces) {
								const thisFace = thisSubcube.faces[f]
								thisFace.vertices = []
								
								thisFace.farthestVertex = null
								for (const c in thisFace.coordinates) {
									thisFace.vertices[c] = thisSubcube.vertices[thisFace.coordinates[c]]

									if (!thisFace.farthestVertex || thisFace.vertices[c].cameraDistance > thisFace.farthestVertex.cameraDistance) {
										thisFace.farthestVertex = thisFace.vertices[c]
									}
								}
								
								thisFace.plane = getPlane(thisFace.vertices)
								thisFace.triangles = [
									getTriangle([thisFace.vertices[0], thisFace.vertices[1], thisFace.vertices[2]]),
									getTriangle([thisFace.vertices[2], thisFace.vertices[3], thisFace.vertices[0]]),
								]
							}

						// sort faces
							thisSubcube.faces.sort(function(a, b) {
								return b.farthestVertex.cameraDistance - a.farthestVertex.cameraDistance
							})

						// blocks
							thisSubcube.blocks = []

						// add to list
							adjustedSubcubes.push(thisSubcube)
					}

				// blockers
					for (const s in adjustedSubcubes) {
						const thisSubcube = adjustedSubcubes[s]

						for (const o in adjustedSubcubes) {
							const thatSubcube = adjustedSubcubes[o]

							if (thisSubcube.id == thatSubcube.id) {
								continue
							}

							if (thatSubcube.blocks.includes(thisSubcube.id)) {
								continue
							}

							if (getThisBlocksThat(thisSubcube, thatSubcube)) {
								thisSubcube.blocks.push(thatSubcube.id)
							}
						}
					}

				// preliminarily sort subcubes by camera distance
					adjustedSubcubes.sort(function(a, b) {
						return b.farthestVertex.cameraDistance - a.farthestVertex.cameraDistance
					})

				// refine sort by blockers
					const remainingSubcubeIds = adjustedSubcubes.map(function(s) {
						return s.id
					})
					const orderedSubcubes = []

					var index = 0
					whileLoop: while (remainingSubcubeIds.length) {
						// get subcube
							const thisSubcube = adjustedSubcubes.find(function(s) {
								return s.id == remainingSubcubeIds[index]
							})

						// something weird --> just push the rest in after
							if (!thisSubcube) {
								for (const r in remainingSubcubeIds) {
									orderedSubcubes.push(remainingSubcubeIds[r])
								}
								break
							}

						// any remaining subcubes this one blocks?
							forLoop: for (const b in thisSubcube.blocks) {
								if (remainingSubcubeIds.includes(thisSubcube.blocks[b])) {
									index++
									continue whileLoop
								}
							}

						// add it to list
							orderedSubcubes.push(thisSubcube)
							remainingSubcubeIds.splice(index, 1)
							index = 0
					}

				// loop through ordered list
					for (const o in orderedSubcubes) {
						const thisSubcube = orderedSubcubes[o]
						for (const f in thisSubcube.faces) {
							drawFace(thisSubcube.faces[f])
						}
					}
			} catch (error) {console.log(error)}
		}

	/* drawFace */
		function drawFace(face) {
			try {
				// color
					face = face || {}
					if (!face.color) { return }

					const colorSettings = STATE.settings.colors[face.color] || null
					if (!colorSettings || !colorSettings.active) { return }

				// parameters
					ELEMENTS.context.beginPath()
					ELEMENTS.context.fillStyle   = colorSettings.color
					ELEMENTS.context.lineWidth   = STATE.settings.borderWidth
					ELEMENTS.context.lineStyle   = STATE.settings.colors.interior.color
					ELEMENTS.context.globalAlpha = face.color == "interior" ? STATE.settings.cubeOpacity ** 2 : STATE.settings.cubeOpacity

				// draw
					for (const c in face.vertices) {
						// get projected coordinates
							const projectedX = face.vertices[c].projection[0]
							const projectedY = face.vertices[c].projection[1]

						// translate origin to center
							const canvasX = projectedX + (ELEMENTS.canvas.width  / 2)
							const canvasY = projectedY + (ELEMENTS.canvas.height / 2)
						
						// draw points
							if (!c) {
								ELEMENTS.context.moveTo(canvasX, ELEMENTS.canvas.height - canvasY)
							}
							else {
								ELEMENTS.context.lineTo(canvasX, ELEMENTS.canvas.height - canvasY)
							}
					}

					ELEMENTS.context.closePath()
					ELEMENTS.context.fill()
					if (face.color !== "interior" && STATE.settings.borderWidth) {
						ELEMENTS.context.stroke()
					}
			} catch (error) {console.log(error)}
		}
