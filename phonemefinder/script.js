/*** globals ***/
	/* triggers */
		const TRIGGERS = {
			click: "click",
			down: "mousedown",
			up: "mouseup",
			enter: "mouseenter",
			leave: "mouseleave",
		}
		if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
			TRIGGERS.down = "touchstart"
			TRIGGERS.up = "touchend"
			TRIGGERS.move = "touchmove"
			TRIGGERS.enter = "pointerenter"
			TRIGGERS.leave = "pointerleave"
		}
		window.addEventListener("contextmenu", event => {
			event.preventDefault()
		})

	/* elements */
		const ELEMENTS = {
			body: document.body,
			reset: {
				element: document.querySelector("#reset"),
				play: document.querySelector("#reset-play"),
				cancel: document.querySelector("#reset-cancel")
			},
			game: {
				element: document.querySelector("#game"),
				reset: document.querySelector("#game-reset"),
				board: document.querySelector("#game-board"),
				boardInner: document.querySelector("#game-board-inner"),
				hexes: {},
				score: document.querySelector("#game-score"),
				selection: document.querySelector("#game-selection"),
				words: document.querySelector("#game-words")
			}
		}

	/* constants */
		const CONSTANTS = {
			percent: 100, // %
			cells: 7, // hexes
			yRatio: 0.8660254037844386, // ratio
			xOffset: 0.5, // ratio
			hexagonOutline: `<svg viewBox="20 20 60 60"><path d="M 50 30 C 44 33 39 36 33 39 C 33 47 33 53 33 61 C 39 64 44 67 50 70 C 56 67 61 64 67 61 C 67 53 67 47 67 39 C 67 39 67 39 67 39 C 61 36 56 33 50 30 Z M 50 20 C 59 25 67 29 76 34 C 76 34 76 34 76 34 C 76 45 76 55 76 66 C 67 71 59 75 50 80 C 41 75 33 71 24 66 C 24 55 24 45 24 34 C 33 29 41 25 50 20 Z"></path></svg>`,
			hexagonFill: `<svg viewBox="20 20 60 60"><path d="M 50 20 C 59 25 67 29 76 34 C 76 34 76 34 76 34 C 76 45 76 55 76 66 C 67 71 59 75 50 80 C 41 75 33 71 24 66 C 24 55 24 45 24 34 C 33 29 41 25 50 20 Z"></path></svg>`,
			phonemes: ["ɑ","æ","ʌ","ɔ","ɑʊ","ɑɪ","ɛ","eɪ","ɪ","i","oʊ","ɔɪ","ʊ","u","b","ʧ","d","ð","f","g","h","ʤ","k","l","m","n","ŋ","p","ɹ","s","ʃ","t","θ","v","w","j","z","ʒ"],
			weightedPhonemes: 	["ɑ","æ","ʌ","ɔ","ɑʊ","ɑɪ","ɛ","eɪ","ɪ","i","oʊ","ɔɪ","ʊ","u","b","ʧ","d","ð","f","g","h","ʤ","k","l","m","n","ŋ","p","ɹ","s","ʃ","t","θ","v","w","j","z","ʒ",
								 "ɑ","æ","ʌ","ɔ","ɑʊ","ɑɪ","ɛ","eɪ","ɪ","i","oʊ","ɔɪ","ʊ","u","b","ʧ","d","ð","f","g","h","ʤ","k","l","m","n","ŋ","p","ɹ","s","ʃ","t","θ","v","w","j","z","ʒ",
								 "ɑ","æ","ʌ","ɔ","ɑʊ","ɑɪ","ɛ","eɪ","ɪ","i","oʊ","ɔɪ",    "u","b","ʧ","d",    "f","g","h","ʤ","k","l","m","n",    "p","ɹ","s","ʃ","t","θ","v","w","j","z",    
								 "ɑ","æ","ʌ","ɔ",     "ɑɪ","ɛ","eɪ","ɪ","i","oʊ","ɔɪ",    "u","b",    "d",    "f","g","h",    "k","l","m","n",    "p","ɹ","s","ʃ","t","θ","v",    "j","z",    
								 "ɑ",    "ʌ",              "ɛ",     "ɪ","i","oʊ",         "u","b",    "d",    "f","g",        "k","l","m","n",    "p","ɹ","s",    "t",    "v",        "z",    ],
			vowels: ["ɑ", "æ", "ʌ", "ɔ", "ä" /*ɑʊ*/, "â" /*ɑɪ*/, "ɛ", "ê" /*eɪ*/, "ɪ", "i", "ö" /*oʊ*/, "ô" /*ɔɪ*/, "ʊ", "u"],
			diphthongs: {
				collapse: {
					"ɑʊ": "ä",
					"ɑɪ": "â",
					"eɪ": "ê",
					"oʊ": "ö",
					"ɔɪ": "ô"
				},
				expand: {
					"ä": "ɑʊ",
					"â": "ɑɪ",
					"ê": "eɪ",
					"ö": "oʊ",
					"ô": "ɔɪ"
				}
			},
			closePhonemes: {
				"ɑ": ["æ", "ɔ", "ô", "â", "ä", "ɛ", "ʌ"],
				"æ": ["ɑ", "ɔ", "ɛ", "ê", "ʌ"],
				"ʌ": ["æ", "ɑ", "ɔ", "ô", "ɛ", "ɪ", "ö", "ʊ"],
				"ɔ": ["æ", "ɑ", "ô", "ä", "ɛ", "ö", "ʊ", "ʌ"],
				"ä": ["ɑ", "ɔ", "ö", "u", "ʊ"],
				"â": ["ɑ", "ô", "ê", "ɪ"],
				"ɛ": ["æ", "ɑ", "ɔ", "ê", "ʌ"],
				"ê": ["â", "ɛ", "i", "ɪ"],
				"ɪ": ["â", "ɛ", "ê", "i", "ʊ", "ʌ"],
				"i": ["ɛ", "ɪ", "ê"],
				"ö": ["ä", "ɔ", "ô", "u", "ʊ", "ʌ"],
				"ô": ["ɑ", "ɔ", "â", "ö", "ʌ"],
				"ʊ": ["ä", "ɔ", "ɪ", "ö", "u", "ʌ"],
				"u": ["ä", "ö", "ʊ", "ʌ"],
				"b": ["p"],
				"ʧ": ["ʤ", "ʃ"],
				"d": ["t"],
				"ð": ["v", "θ"],
				"f": ["v", "θ"],
				"g": ["k"],
				"h": [""],
				"ʤ": ["ʧ", "ʒ"],
				"k": ["g"],
				"l": [],
				"m": [],
				"n": ["ŋ"],
				"ŋ": ["n"],
				"p": ["b"],
				"ɹ": [],
				"s": ["z", "ʃ"],
				"ʃ": ["ʧ", "ʒ"],
				"t": ["d"],
				"θ": ["f", "ð"],
				"v": ["f", "ð"],
				"w": [],
				"j": [],
				"z": ["s", "ʒ"],
				"ʒ": ["ʃ", "ʤ"],
			},
			dictionary: window.IPADICTIONARY || []
		}

	/* state */
		const STATE = {
			play: false,
			board: {
				y0: {
					x3: null,
					x4: null,
					x5: null,
					x6: null,
				},
				y1: {
					x2: null,
					x3: null,
					x4: null,
					x5: null,
					x6: null,
				},
				y2: {
					x1: null,
					x2: null,
					x3: null,
					x4: null,
					x5: null,
					x6: null
				},
				y3: {
					x0: null,
					x1: null,
					x2: null,
					x3: null,
					x4: null,
					x5: null,
					x6: null
				},
				y4: {
					x0: null,
					x1: null,
					x2: null,
					x3: null,
					x4: null,
					x5: null
				},
				y5: {
					x0: null,
					x1: null,
					x2: null,
					x3: null,
					x4: null
				},
				y6: {
					x0: null,
					x1: null,
					x2: null,
					x3: null
				}
			},
			selecting: false,
			selectedHexes: [],
			selectedPhonemes: [],
			score: 0,
			words: []
		}

/*** interaction ***/
	/* startGame */
		startGame()
		ELEMENTS.reset.play.addEventListener(TRIGGERS.click, startGame)
		function startGame() {
			try {
				// clear score
					STATE.score = 0
					ELEMENTS.game.score.innerText = STATE.score

				// clear words
					STATE.words = []
					ELEMENTS.game.words.innerHTML = ""

				// clear board
					buildBoard()

				// hide menu
					ELEMENTS.body.setAttribute("mode", "game")
					STATE.play = true
			} catch (error) {console.log(error)}
		}

	/* resetAsk */
		ELEMENTS.game.reset.addEventListener(TRIGGERS.click, resetAsk)
		function resetAsk() {
			try {
				// mode
					ELEMENTS.body.setAttribute("mode", "reset")
					STATE.play = false
			} catch (error) {console.log(error)}
		}

	/* resetCancel */
		ELEMENTS.reset.cancel.addEventListener(TRIGGERS.click, resetCancel)
		function resetCancel() {
			try {
				// mode
					ELEMENTS.body.setAttribute("mode", "game")
					STATE.play = true
			} catch (error) {console.log(error)}
		}

	/* startSelecting */
		function startSelecting(event) {
			try {
				// not playing
					if (!STATE.play) {
						return
					}

				// indicate selection
					STATE.selecting = true

				// select current hex
					selectHex(event)
			} catch (error) {console.log(error)}
		}

	/* moveCursor */
		if (TRIGGERS.move) {
			window.addEventListener(TRIGGERS.move, moveCursor)
		}
		function moveCursor(event) {
			try {
				// not selecting
					if (!STATE.selecting) {
						return
					}

				// log
					const actualX = (event.touches ? event.touches[0].clientX : event.clientX)
					const actualY = (event.touches ? event.touches[0].clientY : event.clientY)
					
				// get hex at coordinates
					for (const y in ELEMENTS.game.hexes) {
						for (const x in ELEMENTS.game.hexes[y]) {
							const hex = ELEMENTS.game.hexes[y][x]
							const coords = hex.getBoundingClientRect()

							const radius = coords.width / 2
							const centerX = coords.x + radius
							const centerY = coords.y + radius

							if ((centerX - actualX) ** 2 + (centerY - actualY) ** 2 < radius ** 2) {
								selectHex({target: hex})
							}
						}
					}
			} catch (error) {console.log(error)}
		}

	/* selectHex */
		function selectHex(event) {
			try {
				// not selecting
					if (!STATE.selecting) {
						return
					}

				// get hex
					const hex = event.target.closest(".board-hex")
					const x = hex.getAttribute("x")
					const y = hex.getAttribute("y")

				// backtracking?
					if (STATE.selectedHexes[STATE.selectedHexes.length - 2] &&
						STATE.selectedHexes[STATE.selectedHexes.length - 2].x == x &&
						STATE.selectedHexes[STATE.selectedHexes.length - 2].y == y) {
						STATE.selectedPhonemes.pop()
						
						const lastHex = STATE.selectedHexes.pop()
						ELEMENTS.game.hexes[lastHex.y][lastHex.x].removeAttribute("selected")
						updateSelection()

						const connector = ELEMENTS.game.board.querySelector(`[x=${x}][y=${y}][xx=${lastHex.x}][yy=${lastHex.y}]`) ||
										  ELEMENTS.game.board.querySelector(`[xx=${x}][yy=${y}][x=${lastHex.x}][y=${lastHex.y}]`)
						connector.removeAttribute("selected")
						return
					}

				// already selected
					if (STATE.selectedHexes.find(hex => hex.x == x && hex.y == y)) {
						return
					}

				// not adjacent
					const lastHex = STATE.selectedHexes[STATE.selectedHexes.length - 1]
					if (lastHex && !isAdjacent({
							x: Number(x.slice(-1)),
							y: Number(y.slice(-1))
						}, {
							x: Number(lastHex.x.slice(-1)),
							y: Number(lastHex.y.slice(-1))
						})) {
						return
					}

				// select
					STATE.selectedHexes.push({
						x: x,
						y: y
					})
					STATE.selectedPhonemes.push(STATE.board[y][x])
					hex.setAttribute("selected", true)
					updateSelection()

				// connector
					if (STATE.selectedHexes.length > 1) {
						const connector = ELEMENTS.game.board.querySelector(`[x=${x}][y=${y}][xx=${lastHex.x}][yy=${lastHex.y}]`) ||
										  ELEMENTS.game.board.querySelector(`[xx=${x}][yy=${y}][x=${lastHex.x}][y=${lastHex.y}]`)
						connector.setAttribute("selected", true)
					}
			} catch (error) {console.log(error)}
		}

	/* stopSelecting */
		window.addEventListener(TRIGGERS.up, stopSelecting)
		function stopSelecting(event) {
			try {
				// indicate non-selection
					STATE.selecting = false

				// test phonemes as word
					const word = CONSTANTS.dictionary.find(word => word[1] == STATE.selectedPhonemes.join(""))
					if (word) {
						addWord(word, STATE.selectedHexes)
					}

				// unselect everything
					const selectedItems = Array.from(ELEMENTS.game.board.querySelectorAll("[selected]"))
					for (const i in selectedItems) {
						selectedItems[i].removeAttribute("selected")
					}

					STATE.selectedHexes = []
					STATE.selectedPhonemes = []
					ELEMENTS.game.selection.innerText = ""
			} catch (error) {console.log(error)}
		}

/*** game ***	/
	/* chooseRandom */
		function chooseRandom(list) {
			try {
				// not a list
					if (!Array.isArray(list)) {
						return list
					}

				// is a list
					return list[Math.floor(Math.random() * list.length)]
			} catch (error) {console.log(error)}
		}

	/* buildBoard */
		function buildBoard() {
			try {
				// clear
					ELEMENTS.game.boardInner.innerHTML = ""
					ELEMENTS.game.hexes = {}

				// build
					let yCount = 0
					let yTotal = Object.keys(STATE.board).length
					for (const y in STATE.board) {
						ELEMENTS.game.hexes[y] = {}
						
						const row = document.createElement("div")
							row.className = "board-row"
							row.style.top = `${Number(y.slice(1)) * CONSTANTS.percent / CONSTANTS.cells}%`
						ELEMENTS.game.boardInner.appendChild(row)

						let xCount = 0
						for (const x in STATE.board[y]) {
							// phoneme
								const phoneme = chooseRandom(CONSTANTS.weightedPhonemes)
								STATE.board[y][x] = phoneme

							// coordinates
								const xInt = Number(x.slice(1))
								const yInt = Number(y.slice(1))

							// element
								const xOffset = (yInt - (CONSTANTS.cells - 1) / 2) * CONSTANTS.xOffset
								const hex = document.createElement("button")
									hex.className = "board-hex"
									hex.setAttribute("y", y)
									hex.setAttribute("x", x)
									hex.style.left = `${(xInt + xOffset) * CONSTANTS.percent / CONSTANTS.cells}%`
									hex.innerHTML = CONSTANTS.hexagonFill + `<span>${phoneme}</span>`
									hex.addEventListener(TRIGGERS.down, startSelecting)
									hex.addEventListener(TRIGGERS.enter, selectHex)
								row.appendChild(hex)

								ELEMENTS.game.hexes[y][x] = hex

							// connectors
								if (xCount < Object.keys(STATE.board[y]).length - 1) {
									const connectorRight = document.createElement("div")
										connectorRight.className = "board-connector-right"
										connectorRight.setAttribute("y", `y${yInt}`)
										connectorRight.setAttribute("x", `x${xInt}`)
										connectorRight.setAttribute("yy", `y${yInt}`)
										connectorRight.setAttribute("xx", `x${xInt + 1}`)
									hex.appendChild(connectorRight)
								}

								if (yCount < yTotal - 1 && STATE.board[`y${yInt + 1}`][`x${xInt - 1}`] !== undefined) {
									const connectorDownLeft = document.createElement("div")
										connectorDownLeft.className = "board-connector-downleft"
										connectorDownLeft.setAttribute("y", `y${yInt}`)
										connectorDownLeft.setAttribute("x", `x${xInt}`)
										connectorDownLeft.setAttribute("yy", `y${yInt + 1}`)
										connectorDownLeft.setAttribute("xx", `x${xInt - 1}`)
									hex.appendChild(connectorDownLeft)
								}

								if (yCount < yTotal - 1 && STATE.board[`y${yInt + 1}`][`x${xInt}`] !== undefined) {
									const connectorDownRight = document.createElement("div")
										connectorDownRight.className = "board-connector-downright"
										connectorDownRight.setAttribute("y", `y${yInt}`)
										connectorDownRight.setAttribute("x", `x${xInt}`)
										connectorDownRight.setAttribute("yy", `y${yInt + 1}`)
										connectorDownRight.setAttribute("xx", `x${xInt}`)
									hex.appendChild(connectorDownRight)
								}

							xCount++
						}

						yCount++
					}
			} catch (error) {console.log(error)}	
		}

	/* isAdjacent */
		function isAdjacent(hexA, hexB) {
			try {
				// -
					if (hexA.y == hexB.y) {
						if (hexA.x - hexB.x == 1) {
							return true
						}
						if (hexA.x - hexB.x == -1) {
							return true
						}
					}

				// \
					if (hexA.x == hexB.x) {
						if (hexA.y - hexB.y == 1) {
							return true
						}
						if (hexA.y - hexB.y == -1) {
							return true
						}
					}

				// /
					if (hexA.x - hexB.x == 1) {
						if (hexA.y - hexB.y == -1) {
							return true
						}
					}
					if (hexA.x - hexB.x == -1) {
						if (hexA.y - hexB.y == 1) {
							return true
						}
					}

				// still here
					return false
			} catch (error) {console.log(error)}
		}

	/* updateSelection */
		function updateSelection() {
			try {
				// update
					ELEMENTS.game.selection.innerText = STATE.selectedPhonemes.join("")
			} catch (error) {console.log(error)}
		}

	/* addWord */
		function addWord(word, hexes) {
			try {
				// one phoneme?
					if (hexes.length < 2) {
						return
					}

				// already in list?
					if (STATE.words.find(existingWord => existingWord[1] == word[1])) {
						return
					}

				// score
					STATE.score += hexes.length
					ELEMENTS.game.score.innerText = STATE.score

				// add to list
					STATE.words.push(word)

				// display
					const wordElement = document.createElement("div")
						wordElement.className = "word"
						wordElement.setAttribute("hexes", JSON.stringify(STATE.selectedHexes))
						wordElement.addEventListener(TRIGGERS.enter, highlightHexes)
						wordElement.addEventListener(TRIGGERS.leave, unhighlightHexes)
					ELEMENTS.game.words.append(wordElement)

						const graphemes = document.createElement("span")
							graphemes.innerText = word[0]
						wordElement.appendChild(graphemes)

						const phonemes = document.createElement("span")
							phonemes.innerText = word[1]
						wordElement.appendChild(phonemes)

				// wait
					setTimeout(() => {
						ELEMENTS.game.words.scrollTo(0, 10000000)
					}, 0)
			} catch (error) {console.log(error)}
		}

	/* highlightHexes */
		function highlightHexes(event) {
			try {
				// unhighlight everything else
					unhighlightHexes()

				// get word
					const wordElement = event.target.closest(".word")

				// get hexes
					const hexes = JSON.parse(wordElement.getAttribute("hexes"))
					if (!hexes || !Array.isArray(hexes)) {
						return
					}

				// highlight
					for (const h in hexes) {
						ELEMENTS.game.hexes[hexes[h].y][hexes[h].x].setAttribute("highlighted", true)
					}
			} catch (error) {console.log(error)}
		}

	/* unhighlightHexes */
		function unhighlightHexes() {
			try {
				// unhighlight everything
					for (const y in ELEMENTS.game.hexes) {
						for (const x in ELEMENTS.game.hexes[y]) {
							ELEMENTS.game.hexes[y][x].removeAttribute("highlighted")
						}
					}
			} catch (error) {console.log(error)}
		}
