/*** globals ***/
	/* triggers */
		const TRIGGERS = {
			click: "click",
		}

	/* elements */
		const ELEMENTS = {
			menu: {
				reset: document.querySelector("#menu-reset"),
				x: document.querySelector("#menu-x"),
				y: document.querySelector("#menu-y"),
				new: document.querySelector("#menu-new")
			},
			board: {
				element: document.querySelector("#board"),
				moves: document.querySelector("#board-moves")
			}
		}

	/* constants */
		const CONSTANTS = {}

	/* state */
		const STATE = {
			x: 5,
			y: 5,
			boxes: {},
			start: {},
			moves: 0,
			solved: false
		}

/*** helpers ***/
	/* chooseRandomInRange */
		function chooseRandomInRange(a, b) {
			return Math.floor(Math.random() * (b - a)) + a
		}

/*** menu ***/
	/* createBoard */
		createBoard()
		ELEMENTS.menu.new.addEventListener(TRIGGERS.click, createBoard)
		function createBoard() {
			// clear
				STATE.boxes = {}
				STATE.start = {}
				STATE.moves = 0
				STATE.solved = false

				ELEMENTS.board.element.removeAttribute("solved")
				ELEMENTS.board.element.innerHTML = ""
				ELEMENTS.board.moves.innerHTML = "Moves: 0"

			// get x & y
				STATE.x = Number(ELEMENTS.menu.x.value)
				STATE.y = Number(ELEMENTS.menu.y.value)

			// create boxes
				for (let y = 0; y < STATE.y; y++) {
					const row = document.createElement("div")
						row.className = "board-row"
					ELEMENTS.board.element.appendChild(row)

					for (let x = 0; x < STATE.x; x++) {
						STATE.boxes[`${x}_${y}`] = createBox(x, y)
						row.appendChild(STATE.boxes[`${x}_${y}`])
					}
				}

			// activate random boxes
				for (let s = 0; s < STATE.x * STATE.y; s++) {
					toggleBox(chooseRandomInRange(0, STATE.x), chooseRandomInRange(0, STATE.y), true)
				}

			// store starting state
				for (let b in STATE.boxes) {
					STATE.start[b] = Number(STATE.boxes[b].getAttribute("active"))
				}
		}

	/* createBox */
		function createBox(x, y) {
			// element
				const box = document.createElement("div")
					box.className = "board-box"
					box.setAttribute("x", x)
					box.setAttribute("y", y)
					box.setAttribute("active", 1)
					box.addEventListener(TRIGGERS.click, clickBox)
				return box
		}

	/* resetBoard */
		ELEMENTS.menu.reset.addEventListener(TRIGGERS.click, resetBoard)
		function resetBoard() {
			// reset moves
				STATE.solved = false
				ELEMENTS.board.element.removeAttribute("solved")
				STATE.moves = 0
				ELEMENTS.board.moves.innerHTML = "Moves: 0"

			// set from start
				for (let b in STATE.boxes) {
					STATE.boxes[b].setAttribute("active", STATE.start[b])
				}
		}

/*** gameplay ***/
	/* clickBox */
		function clickBox(event) {
			// done?
				if (STATE.solved) {
					return
				}

			// get box
				const box = event.target.closest(".board-box")
				const x = Number(box.getAttribute("x"))
				const y = Number(box.getAttribute("y"))

			// increment moves
				STATE.moves += 1
				ELEMENTS.board.moves.innerHTML = `Moves: ${STATE.moves}`

			// toggle
				toggleBox(x, y)
		}


	/* toggleBox */
		function toggleBox(x, y, setup) {
			// flip this box
				const thisBox = STATE.boxes[`${x}_${y}`]
				const thisActive = Number(thisBox.getAttribute("active"))
				thisBox.setAttribute("active", (thisActive + 1) % 2)

			// flip its neighbors
				const neighbors = [
					STATE.boxes[`${x}_${y - 1}`], // up
					STATE.boxes[`${x + 1}_${y}`], // right
					STATE.boxes[`${x}_${y + 1}`], // down
					STATE.boxes[`${x - 1}_${y}`], // left
				]
				
				for (const n in neighbors) {
					if (neighbors[n]) {
						const neighborActive = Number(neighbors[n].getAttribute("active"))
						neighbors[n].setAttribute("active", (neighborActive + 1) % 2)
					}
				}

			// game over?
				if (!setup && isVictory()) {
					STATE.solved = true
					ELEMENTS.board.element.setAttribute("solved", true)
				}
		}

	/* isVictory */
		function isVictory() {
			// check boxes
				for (let b in STATE.boxes) {
					if (Number(STATE.boxes[b].getAttribute("active")) == 0) {
						return false
					}
				}

			// still here?
				return true
		}
