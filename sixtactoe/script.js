/*** globals ***/
	/* triggers */
		const TRIGGERS = {
			click: "click"
		}

	/* elements */
		const ELEMENTS = {
			body: document.querySelector("body"),
			menu: {
				element: document.querySelector("#menu"),
				p1: document.querySelector("#menu-p1-checkbox"),
				p2: document.querySelector("#menu-p2-checkbox"),
				p3: document.querySelector("#menu-p3-checkbox"),
				play: document.querySelector("#menu-play")
			},
			board: document.querySelector("#board"),
			boardInner: document.querySelector("#board-inner"),
			hexes: {},
			message: document.querySelector("#message")
		}

	/* constants */
		const CONSTANTS = {
			botThinkingTime: 1000, // ms
			percent: 100, // %
			cells: 5, // hexes
			yRatio: 0.8660254037844386, // ratio
			xOffset: 0.5, // ratio
			hexagonOutline: `<svg viewBox="20 20 60 60"><path d="M 50 30 C 44 33 39 36 33 39 C 33 47 33 53 33 61 C 39 64 44 67 50 70 C 56 67 61 64 67 61 C 67 53 67 47 67 39 C 67 39 67 39 67 39 C 61 36 56 33 50 30 Z M 50 20 C 59 25 67 29 76 34 C 76 34 76 34 76 34 C 76 45 76 55 76 66 C 67 71 59 75 50 80 C 41 75 33 71 24 66 C 24 55 24 45 24 34 C 33 29 41 25 50 20 Z"></path></svg>`,
			hexagonFill: `<svg viewBox="20 20 60 60"><path d="M 50 20 C 59 25 67 29 76 34 C 76 34 76 34 76 34 C 76 45 76 55 76 66 C 67 71 59 75 50 80 C 41 75 33 71 24 66 C 24 55 24 45 24 34 C 33 29 41 25 50 20 Z"></path></svg>`
		}

	/* state */
		const STATE = {
			play: false,
			board: {
				y0: {
					x2: 0,
					x3: 0,
					x4: 0
				},
				y1: {
					x1: 0,
					x2: 0,
					x3: 0,
					x4: 0
				},
				y2: {
					x0: 0,
					x1: 0,
					x2: 0,
					x3: 0,
					x4: 0
				},
				y3: {
					x0: 0,
					x1: 0,
					x2: 0,
					x3: 0
				},
				y4: {
					x0: 0,
					x1: 0,
					x2: 0
				}
			},
			turn: 0,
			players: {
				p1: "human",
				p2: "human",
				p3: "human"
			}
		}

/*** interaction ***/
	/* startGame */
		ELEMENTS.menu.play.addEventListener(TRIGGERS.click, startGame)
		function startGame() {
			try {
				// reset state
					for (const y in STATE.board) {
						for (const x in STATE.board[y]) {
							STATE.board[y][x] = 0
						}
					}

					STATE.turn = 0
					ELEMENTS.body.removeAttribute("p")

					STATE.players.p1 = ELEMENTS.menu.p1.checked ? "human" : "bot"
					STATE.players.p2 = ELEMENTS.menu.p2.checked ? "human" : "bot"
					STATE.players.p3 = ELEMENTS.menu.p3.checked ? "human" : "bot"

				// reset board
					resetBoard()

				// set turn
					updateTurn()

				// start
					ELEMENTS.menu.element.setAttribute("invisible", true)
					STATE.play = true
			} catch (error) {console.log(error)}
		}

	/* selectHex */
		function selectHex(event, botMove) {
			try {
				// not playing
					if (!STATE.play) {
						return
					}

				// not a human's turn
					if (STATE.players[`p${STATE.turn}`] == "bot" && !botMove) {
						return
					}

				// get hex
					const hex = event ? event.target.closest(".board-hex") : null
					const x = hex ? hex.getAttribute("x") : botMove.x
					const y = hex ? hex.getAttribute("y") : botMove.y

				// valid?
					if (!isValidMove(x, y)) {
						return
					}

				// set
					STATE.board[y][x] = STATE.turn
					ELEMENTS.hexes[y][x].setAttribute("p", STATE.turn)

				// tie?
					if (isTie()) {
						endGame()
						return
					}

				// victory?
					if (isVictory(STATE.board, STATE.turn, x, y)) {
						endGame(STATE.turn)
						return
					}

				// next player
					updateTurn()
			} catch (error) {console.log(error)}
		}

/*** gameplay ***/
	/* resetBoard */
		function resetBoard() {
			try {
				// clear
					ELEMENTS.boardInner.innerHTML = ""
					ELEMENTS.hexes = {}

				// build
					for (const y in STATE.board) {
						ELEMENTS.hexes[y] = {}
						
						const row = document.createElement("div")
							row.className = "board-row"
							row.style.top = `${Number(y.slice(1)) * CONSTANTS.percent / CONSTANTS.cells}%`
						ELEMENTS.boardInner.appendChild(row)

						for (const x in STATE.board[y]) {
							const xOffset = (Number(y.slice(1)) - (CONSTANTS.cells - 1) / 2) * CONSTANTS.xOffset
							const hex = document.createElement("button")
								hex.className = "board-hex"
								hex.setAttribute("y", y)
								hex.setAttribute("x", x)
								hex.setAttribute("p", 0)
								hex.style.left = `${(Number(x.slice(1)) + xOffset) * CONSTANTS.percent / CONSTANTS.cells}%`
								hex.innerHTML = CONSTANTS.hexagonFill + CONSTANTS.hexagonOutline
								hex.addEventListener(TRIGGERS.click, selectHex)
							row.appendChild(hex)

							ELEMENTS.hexes[y][x] = hex
						}
					}
			} catch (error) {console.log(error)}
		}

	/* isValidMove */
		function isValidMove(x, y) {
			try {
				// out of bounds
					if (STATE.board[y] == undefined || STATE.board[y][x] == undefined) {
						return false
					}

				// taken
					if (STATE.board[y][x]) {
						return false
					}

				// allowed
					return true
			} catch (error) {console.log(error)}
		}

	/* isTie */
		function isTie() {
			try {
				// loop through
					for (const y in STATE.board) {
						for (const x in STATE.board[y]) {
							if (!STATE.board[y][x]) {
								return false
							}
						}
					}

				// full board? tie
					return true
			} catch (error) {console.log(error)}
		}

	/* isVictory */
		function isVictory(board, turn, x, y) {
			try {
				// extract
					x = Number(x.slice(1))
					y = Number(y.slice(1))

				// cell as center
					// -
					if ((board[`y${y}`] && board[`y${y}`][`x${x - 1}`] == turn) && (board[`y${y}`] && board[`y${y}`][`x${x + 1}`] == turn)) {
						return true
					}

					// /
					if ((board[`y${y + 1}`] && board[`y${y + 1}`][`x${x - 1}`] == turn) && (board[`y${y - 1}`] && board[`y${y - 1}`][`x${x + 1}`] == turn)) {
						return true
					}

					// \
					if ((board[`y${y + 1}`] && board[`y${y + 1}`][`x${x}`] == turn) && (board[`y${y - 1}`] && board[`y${y - 1}`][`x${x}`] == turn)) {
						return true
					}

				// cell as end
					// <-
					if ((board[`y${y}`] && board[`y${y}`][`x${x - 2}`] == turn) && (board[`y${y}`] && board[`y${y}`][`x${x - 1}`] == turn)) {
						return true
					}

					// ^\
					if ((board[`y${y + 2}`] && board[`y${y + 2}`][`x${x}`] == turn) && (board[`y${y + 1}`] && board[`y${y + 1}`][`x${x}`] == turn)) {
						return true
					}

					// ^/
					if ((board[`y${y + 1}`] && board[`y${y + 1}`][`x${x - 1}`] == turn) && (board[`y${y + 2}`] && board[`y${y + 2}`][`x${x - 2}`] == turn)) {
						return true
					}

					// ->
					if ((board[`y${y}`] && board[`y${y}`][`x${x + 1}`] == turn) && (board[`y${y}`] && board[`y${y}`][`x${x + 2}`] == turn)) {
						return true
					}

					// v\
					if ((board[`y${y - 1}`] && board[`y${y - 1}`][`x${x}`] == turn) && (board[`y${y - 2}`] && board[`y${y - 2}`][`x${x}`] == turn)) {
						return true
					}

					// v/
					if ((board[`y${y - 2}`] && board[`y${y - 2}`][`x${x + 2}`] == turn) && (board[`y${y - 1}`] && board[`y${y - 1}`][`x${x + 1}`] == turn)) {
						return true
					}

				// none
					return false
			} catch (error) {console.log(error)}
		}

	/* updateTurn */
		function updateTurn() {
			try {
				// increment current turn
					STATE.turn += 1
					if (STATE.turn > 3) {
						STATE.turn = 1
					}

				// message
					ELEMENTS.message.innerText = `player ${STATE.turn}'s turn`
					ELEMENTS.body.setAttribute("p", STATE.turn)

				// bot?
					if (STATE.players[`p${STATE.turn}`] == "bot") {
						makeMove()
					}
			} catch (error) {console.log(error)}
		}

	/* endGame */
		function endGame(winner) {
			try {
				// stop playing
					STATE.play = false

				// show menu
					ELEMENTS.menu.element.removeAttribute("invisible")

				// no winner
					if (!winner) {
						ELEMENTS.message.innerText = "tie game"
						ELEMENTS.body.removeAttribute("p")
						return
					}

				// winner
					ELEMENTS.message.innerText = `player ${winner} wins`
					ELEMENTS.body.setAttribute("p", winner)
			} catch (error) {console.log(error)}
		}

/*** bot ***/
	/* chooseRandom */
		function chooseRandom(list) {
			try {
				return list[Math.floor(Math.random() * list.length)]
			} catch (error) {console.log(error)}
		}

	/* makeMove */
		function makeMove() {
			try {
				setTimeout(() => {
					// get state
						const board = JSON.parse(JSON.stringify(STATE.board))
						const turn = STATE.turn

					// get moves
						const allEmptyHexes = getEmptyHexes(board, turn)

					// identify victories
						const victories = getVictories(board, turn, allEmptyHexes)

					// opponent victories
						let nextOpponent = ((turn + 1) % 3) || 3
						const nextOpponentVictories = getVictories(board, nextOpponent, allEmptyHexes)
						let otherOpponent = ((nextOpponent + 1) % 3) || 3
						const otherOpponentVictories = getVictories(board, otherOpponent, allEmptyHexes)

					// choose randomly
						const move = chooseRandom(
							victories.length ? victories :
							nextOpponentVictories.length ? nextOpponentVictories :
							otherOpponentVictories.length ? otherOpponentVictories :
							allEmptyHexes
						)
						selectHex(null, move)
				}, CONSTANTS.botThinkingTime)
			} catch (error) {console.log(error)}
		}

	/* getEmptyHexes */
		function getEmptyHexes(board, turn) {
			try {
				// empty array
					const emptyHexes = []

				// loop through all empty hexes
					for (const y in board) {
						for (const x in board[y]) {
							if (!board[y][x]) {
								emptyHexes.push({x, y})
							}
						}
					}

				// return
					return emptyHexes
			} catch (error) {console.log(error)}
		}

	/* getVictories */
		function getVictories(board, turn, allLegalMoves) {
			try {
				// empty array
					const victoryMoves = []

				// loop through all legal moves
					for (const i in allLegalMoves) {
						const x = allLegalMoves[i].x
						const y = allLegalMoves[i].y
						if (isVictory(board, turn, x, y)) {
							victoryMoves.push({x, y})
						}
					}

				// return
					return victoryMoves
			} catch (error) {console.log(error)}
		}


