/*** globals ***/
	/* audio */
		if (!AUDIO_J) {
			AUDIO_J = window.AUDIO_J
		}

	/* triggers */
		const TRIGGERS = {
			click: "click",
			change: "change",
			input: "input"
		}

	/* constants */
		const CONSTANTS = {
			noteDuration: 500,
			timeBetweenTurns: 1000,
			maxPlayers: 9,
			startingX: 6,
			startingY: 6,
			startingPlayers: 2,
			startingNotes: [60,61,62,63,64,65,66,67,68,69,70,71,72],
			startingSynths: AUDIO_J.getInstruments({include:["default"], grouping: "flat", format: "names"}) || ["keystone"]
		}

	/* elements */
		const ELEMENTS = {
			menu: {
				element: document.querySelector("#menu"),
				button: document.querySelector("#menu-button"),
				inner: document.querySelector("#menu-inner"),
				start: document.querySelector("#menu-start"),
				error: document.querySelector("#menu-error"),
				players: document.querySelector("#menu-players"),
				x: document.querySelector("#menu-x"),
				y: document.querySelector("#menu-y"),
				notes: {
					element: document.querySelector("#menu-notes"),
					header: document.querySelector("#menu-notes-header"),
					checkboxes: {
						"C0-C1": document.querySelector("#menu-notes-C0-C1"),
						"C1-C2": document.querySelector("#menu-notes-C1-C2"),
						"C2-C3": document.querySelector("#menu-notes-C2-C3"),
						"C3-C4": document.querySelector("#menu-notes-C3-C4"),
						"C4":    document.querySelector("#menu-notes-C4"),
						"C4-C5": document.querySelector("#menu-notes-C4-C5"),
						"C5-C6": document.querySelector("#menu-notes-C5-C6"),
						"C6-C7": document.querySelector("#menu-notes-C6-C7"),
						"C7-C8": document.querySelector("#menu-notes-C7-C8"),
						"C8-C9": document.querySelector("#menu-notes-C8-C9")
					}
				},
				synths: {
					element: document.querySelector("#menu-synths"),
					checkboxes: {}
				}
			},
			board: {
				element: document.querySelector("#board"),
				tiles: []
			},
			scores: {
				element: document.querySelector("#scores"),
				playerIndicators: {},
				playerScores: {}
			},
			victory: document.querySelector("#victory")
		}

	/* state */
		const STATE = {
			playing: false,
			currentTurn: 1,
			firstClick: false,
			secondClick: false,
			firstNoteTimeout: null,
			secondNoteTimeout: null,
			scores: {},
			players: CONSTANTS.startingPlayers,
			x: CONSTANTS.startingX,
			y: CONSTANTS.startingY,
			notes: JSON.parse(JSON.stringify(CONSTANTS.startingNotes)),
			synths: JSON.parse(JSON.stringify(CONSTANTS.startingSynths))
		}

/*** tools ***/
	/* chooseRandom */
		function chooseRandom(list) {
			try {
				// not an array
					if (!Array.isArray(list)) {
						return list
					}

				// random element
					return list[Math.floor(Math.random() * list.length)]
			} catch (error) {console.log(error)}
		}

	/* sortRandom */
		function sortRandom(list) {
			try {
				if (!Array.isArray(list)) {
					return false
				}
				
				let copy = JSON.parse(JSON.stringify(list))

				let x = copy.length
				while (x > 0) {
					let y = Math.floor(Math.random() * x)
					x -= 1
					let temp = copy[x]
					copy[x] = copy[y]
					copy[y] = temp
				}

				return copy
			}
			catch (error) {console.log(error)}
		}

/*** initiate ***/
	/* buildSynthsList */
		buildSynthsList()
		function buildSynthsList() {
			try {
				// get instruments list
					const instrumentsList = AUDIO_J.getInstruments({include: ["simple", "default", "custom"], grouping: "family", format: "names"})
				
				// loop through families
					for (let family in instrumentsList) {
						const section = document.createElement("div")
							section.className = "menu-synths-family"
						ELEMENTS.menu.synths.element.appendChild(section)

						const span = document.createElement("span")
							span.innerText = family
							span.addEventListener(TRIGGERS.click, checkAllBoxes)
						section.appendChild(span)

						for (let i in instrumentsList[family]) {
							const name = instrumentsList[family][i]
							
							const label = document.createElement("label")
							section.appendChild(label)

							const checkbox = document.createElement("input")
								checkbox.type = "checkbox"
								checkbox.className = "menu-synths-checkbox"
								checkbox.value = name
								if (STATE.synths.includes(name)) {
									checkbox.checked = true
								}
								checkbox.addEventListener(TRIGGERS.input, updateSettings)
							label.appendChild(checkbox)
							ELEMENTS.menu.synths.checkboxes[name] = checkbox

							const span = document.createElement("span")
								span.innerText = name
							label.appendChild(span)
						}
					}
			} catch (error) {console.log(error)}
		}

/*** menu ***/
	/* checkAllBoxes */
		ELEMENTS.menu.notes.header.addEventListener(TRIGGERS.click, checkAllBoxes)
		function checkAllBoxes(event) {
			try {
				// get parent
					const parentElement = event.target.closest("div")
					const checkboxes = Array.from(parentElement.querySelectorAll("input[type='checkbox']"))

				// build list of boxes to check
					let unchecked = []
					for (let c in checkboxes) {
						if (!checkboxes[c].checked) {
							unchecked.push(checkboxes[c])
						}
					}

				// all checked
					if (!unchecked.length) {
						for (let c in checkboxes) {
							checkboxes[c].checked = false
						}
					}

				// check
					else {
						for (let c in unchecked) {
							unchecked[c].checked = true
						}
					}

				// update settings
					updateSettings({target: {className: checkboxes[0].className}})
			} catch (error) {console.log(error)}
		}

	/* updateSettings */
		ELEMENTS.menu.players.addEventListener(TRIGGERS.input, updateSettings)
		ELEMENTS.menu.x.addEventListener(TRIGGERS.input, updateSettings)
		ELEMENTS.menu.y.addEventListener(TRIGGERS.input, updateSettings)
		for (let n in ELEMENTS.menu.notes.checkboxes) {
			ELEMENTS.menu.notes.checkboxes[n].addEventListener(TRIGGERS.input, updateSettings)
		}
		function updateSettings(event) {
			try {
				// end game
					clearGame()

				// players
					if (event.target == ELEMENTS.menu.players) {
						STATE.players = Math.max(1, Math.min(CONSTANTS.maxPlayers, Number(ELEMENTS.menu.players.value)))
					}

				// x
					if (event.target == ELEMENTS.menu.x) {
						STATE.x = Math.max(1, Number(ELEMENTS.menu.x.value))
					}

				// y
					if (event.target == ELEMENTS.menu.y) {
						STATE.y = Math.max(1, Number(ELEMENTS.menu.y.value))
					}

				// notes
					if (event.target.className == "menu-notes-checkbox") {
						STATE.notes = []
						for (let c in ELEMENTS.menu.notes.checkboxes) {
							if (ELEMENTS.menu.notes.checkboxes[c].checked) {
								const notes = ELEMENTS.menu.notes.checkboxes[c].value.split(",")
								for (let n in notes) {
									const note = Number(notes[n])
									if (!STATE.notes.includes(note)) {
										STATE.notes.push(note)
									}
								}
							}
						}
					}

				// synths
					if (event.target.className == "menu-synths-checkbox") {
						STATE.synths = []
						for (let c in ELEMENTS.menu.synths.checkboxes) {
							if (ELEMENTS.menu.synths.checkboxes[c].checked) {
								const synthName = ELEMENTS.menu.synths.checkboxes[c].value
								if (!STATE.synths.includes(synthName)) {
									STATE.synths.push(synthName)
								}
							}
						}
					}
			} catch (error) {console.log(error)}
		}

/*** game ***/
	/* clearGame */
		function clearGame() {
			try {
				// reset state
					STATE.playing = false
					STATE.currentTurn = 1
					STATE.firstClick = false
					STATE.secondClick = false
					STATE.scores = {}

				// clear text
					ELEMENTS.menu.error.innerHTML = ""
					ELEMENTS.victory.innerHTML = ""

				// clear scores
					ELEMENTS.scores.element.innerHTML = ""
					ELEMENTS.scores.playerIndicators = {}
					ELEMENTS.scores.playerScores = {}

				// clear board
					ELEMENTS.board.element.innerHTML = ""
					ELEMENTS.board.tiles = []

				// destroy instruments
					for (let i in AUDIO_J.instruments) {
						AUDIO_J.instruments[i].setParameters({power: 0})
						delete AUDIO_J.instruments[i]
					}
			} catch (error) {console.log(error)}
		}

	/* startGame */
		ELEMENTS.menu.start.addEventListener(TRIGGERS.click, startGame)
		function startGame() {
			try {
				// reset
					clearGame()

				// build audio
					if (!AUDIO_J.audio) {
						buildAudio()
					}

				// no notes
					if (!STATE.notes.length) {
						ELEMENTS.menu.error.innerText = "no notes selected"
						return
					}

				// no synths
					if (!STATE.synths.length) {
						ELEMENTS.menu.error.innerText = "no synths selected"
						return
					}

				// pairs
					const totalTiles = STATE.x * STATE.y
					const totalPairs = Math.floor(totalTiles / 2)
					if (totalPairs < 2) {
						ELEMENTS.menu.error.innerText = "board is too small"
						return
					}

				// combos
					const combos = []
					for (let i = 0; i < totalPairs; i++) {
						const combo = buildCombo(combos)
						if (!combo) {
							ELEMENTS.menu.error.innerText = "unable to build tiles"
							return
						}
						combos.push(combo)
					}

				// double & shuffle
					const shuffledCombos = sortRandom(combos.concat(combos))

				// add to board & elements
					for (let i in shuffledCombos) {
						ELEMENTS.board.tiles.push(buildTile(shuffledCombos[i]))
					}

				// build instruments
					for (let i in combos) {
						const synthName = combos[i].split(":")[0]
						if (!AUDIO_J.instruments[synthName]) {
							const parameters = AUDIO_J.getInstrument(synthName)
							if (parameters) {
								AUDIO_J.instruments[synthName] = buildInstrument(parameters)
							}
						}
					}

				// scores
					for (let p = 1; p <= STATE.players; p++) {
						buildScore(p)
					}

				// start playing
					STATE.playing = true
					ELEMENTS.scores.playerIndicators[String(STATE.currentTurn)].setAttribute("selected", true)

				// close menu
					ELEMENTS.menu.element.removeAttribute("open")
			} catch (error) {console.log(error)}
		}

	/* buildScore */
		function buildScore(p) {
			try {
				// state
					STATE.scores[String(p)] = 0

				// html
					const section = document.createElement("div")
						section.className = "scores-player-outer"
						section.setAttribute("player", p)
					ELEMENTS.scores.element.appendChild(section)

					const span = document.createElement("span")
						span.className = "scores-player-name"
						span.innerText = "P" + p
					section.appendChild(span)

					const score = document.createElement("output")
						score.className = "scores-player-inner"
						score.value = 0
					section.appendChild(score)

				// elements
					ELEMENTS.scores.playerScores[String(p)] = score
					ELEMENTS.scores.playerIndicators[String(p)] = section
			} catch (error) {console.log(error)}
		}

	/* buildCombo */
		function buildCombo(combos) {
			try {
				// attempts
					let attempts = 10

				// note & synth
					let synth, note, combo
					do {
						synth = chooseRandom(STATE.synths)
						note = chooseRandom(STATE.notes)
						combo = synth + ":" + note
						attempts--
					} while (attempts && combos.includes(combo))

				// return
					return attempts ? combo : null
			} catch (error) {console.log(error)}
		}

	/* buildTile */
		function buildTile(combo) {
			try {
				// parameters
					const synthName = combo.split(":")[0]
					const note = combo.split(":")[1]

				// tile
					const tile = document.createElement("button")
						tile.className = "board-tile"
						tile.innerText = "?"
						tile.setAttribute("synth", synthName)
						tile.setAttribute("note", note)
						tile.style.width = "calc(100% / " + STATE.x + " - var(--gap-size))"
						tile.style.height = "calc(100% / " + STATE.y + " - var(--gap-size))"
						tile.addEventListener(TRIGGERS.click, selectTile)
					ELEMENTS.board.element.appendChild(tile)

				// return
					return tile
			} catch (error) {console.log(error)}
		}

	/* selectTile */
		function selectTile(event) {
			try {
				// not playing?
					if (!STATE.playing) {
						return
					}

				// already clicked?
					if (STATE.firstClick && STATE.secondClick) {
						return
					}

				// parameters
					const tile = event.target.closest(".board-tile")
						tile.blur()
					const synthName = tile.getAttribute("synth")
					const note = Number(tile.getAttribute("note"))

				// already selected or claimed?
					if (tile.hasAttribute("selected") || tile.hasAttribute("player")) {
						return
					}
					tile.setAttribute("selected", true)

				// play note
					if (AUDIO_J.instruments[synthName]) {
						AUDIO_J.instruments[synthName].press(AUDIO_J.getNote(note)[0])
					}

				// first click
					if (!STATE.firstClick) {
						STATE.firstClick = tile
						STATE.firstNoteTimeout = setTimeout(function() {
							AUDIO_J.instruments[synthName].lift(AUDIO_J.getNote(note)[0])
						}, CONSTANTS.noteDuration)
						return
					}

				// second click
					STATE.secondClick = tile

				// match
					if (STATE.firstClick.getAttribute("synth") == synthName && Number(STATE.firstClick.getAttribute("note")) == note) {
						// timeouts
							clearInterval(STATE.firstNoteTimeout)
							STATE.secondNoteTimeout = setTimeout(function() {
								AUDIO_J.instruments[synthName].lift(AUDIO_J.getNote(note)[0])
							}, CONSTANTS.noteDuration)

						// change tile display
							STATE.firstClick.setAttribute("player", STATE.currentTurn)
							STATE.firstClick.innerText = STATE.currentTurn
							STATE.secondClick.setAttribute("player", STATE.currentTurn)
							STATE.secondClick.innerText = STATE.currentTurn

						// update score
							STATE.scores[String(STATE.currentTurn)]++
							ELEMENTS.scores.playerScores[String(STATE.currentTurn)].value = STATE.scores[String(STATE.currentTurn)]

						// more tiles?
							for (let i in ELEMENTS.board.tiles) {
								if (!ELEMENTS.board.tiles[i].hasAttribute("player")) {
									// go again
										setTimeout(function() {
											STATE.firstClick.removeAttribute("selected")
											STATE.secondClick.removeAttribute("selected")
											STATE.firstClick = null
											STATE.secondClick = null
										}, CONSTANTS.timeBetweenTurns)
										return
								}
							}

						// no more tiles
							setTimeout(function() {
								STATE.firstClick.removeAttribute("selected")
								STATE.secondClick.removeAttribute("selected")
								STATE.firstClick = null
								STATE.secondClick = null

								endGame()
							}, CONSTANTS.timeBetweenTurns)
							return
					}

				// no match
					STATE.secondNoteTimeout = setTimeout(function() {
						AUDIO_J.instruments[synthName].lift(AUDIO_J.getNote(note)[0])
					}, CONSTANTS.noteDuration)

					setTimeout(function() {
						ELEMENTS.scores.playerIndicators[String(STATE.currentTurn)].removeAttribute("selected")

						STATE.currentTurn++
						if (STATE.currentTurn > STATE.players) {
							STATE.currentTurn = 1
						}

						ELEMENTS.scores.playerIndicators[String(STATE.currentTurn)].setAttribute("selected", true)

						STATE.firstClick.removeAttribute("selected")
						STATE.secondClick.removeAttribute("selected")
						STATE.firstClick = null
						STATE.secondClick = null
					}, CONSTANTS.timeBetweenTurns)
			} catch (error) {console.log(error)}
		}

	/* endGame */
		function endGame() {
			try {
				// stop playing
					ELEMENTS.scores.playerIndicators[String(STATE.currentTurn)].removeAttribute("selected")
					STATE.playing = false
					STATE.currentTurn = 0

				// calculate winner
					let winningScore = 0
					let winners = []
					for (let i in STATE.scores) {
						if (STATE.scores[i] == winningScore) {
							winners.push(i)
						}
						else if (STATE.scores[i] > winningScore) {
							winningScore = STATE.scores[i]
							winners = [i]
						}
					}

				// display winner
					ELEMENTS.victory.innerText = "victory: player" + (winners.length > 1 ? "s " : " ") + winners.join(" & ")
			} catch (error) {console.log(error)}
		}
