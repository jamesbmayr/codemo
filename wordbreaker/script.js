/*** globals ***/
	/* triggers */
		const isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)
		const TRIGGERS = {
			mousedown: isMobile ? "touchstart" : "mousedown",
			mouseup:   isMobile ? "touchend"   : "mouseup",
			mousemove: isMobile ? "touchmove"  : "mousemove",
			click:     "click",
		}

		window.addEventListener("contextmenu", event => {
			event.stopPropagation()
			event.preventDefault()
		})

	/* elements */
		const ELEMENTS = {
			gameboard: {
				pause: document.querySelector("#gameboard-pause"),
				inner: document.querySelector("#gameboard-inner"),
				left: document.querySelector("#gameboard-left"),
				right: document.querySelector("#gameboard-right"),
				letters: document.querySelector("#gameboard-score-letters"),
				words: document.querySelector("#gameboard-score-words"),
				time: document.querySelector("#gameboard-score-time"),
				menu: document.querySelector("#gameboard-menu"),
				resume: document.querySelector("#gameboard-menu-resume"),
				start: document.querySelector("#gameboard-menu-start"),
				longestword: document.querySelector("#gameboard-menu-longestword-inner")
			}
		}

	/* constants */
		const CONSTANTS = {
			percentage: 100, // %
			blocks: {
				size: 50, // px
				columns: 7, // letters
				rows: 11, // letters
				health: 100, // %
				radius: 18, // px
				minOpacity: 0.5, // #
			},
			letters: "aaaaaaabbbcccdddeeeeeeeeefffgghhhhiiiiiiijkklllllmmmnnnnnoooooooppppqrrrrrssssstttttuuuuvvwwwxyyyyzz",
			minimumWordLength: 3, // letters
			msPerTick: 10, // ms
			msPerSecond: 1000, // s
			ticksPerCycle: 50, // 10ms
			minTicksPower: 4, // 2^n
			maxTicksPower: 10, // 2^n
			startingRows: 4, // letters
			damageMultiplier: 5, // health
			colors: [
				"#e3165e", // magenta
				"#e25d46", // red
				"#eaa14d", // amber
				"#f4e89a", // yellow
				"#bafb6a", // green
				"#57ddac", // teal
			],
			dictionary: window.DICTIONARY || {}
		}

	/* state */
		const STATE = {
			playing: false,
			paused: false,
			pressing: false,
			blocks: {},
			selected: [],
			words: {},
			letters: 0,
			tick: 1,
			rowTick: 1,
			time: 0,
			row: 0,
			ticksPerCycle: 50, // 10ms
			gameloop: null
		}

/*** gameloop ***/
	/* startGame */
		startGame()
		ELEMENTS.gameboard.start.addEventListener(TRIGGERS.click, startGame)
		function startGame() {
			// reset
				STATE.blocks = {}
				STATE.selected = []
				STATE.words = {}
				STATE.letters = 0
				STATE.tick = 1
				STATE.rowTick = 1
				STATE.time = 0
				STATE.row = 0
				STATE.ticksPerCycle = CONSTANTS.ticksPerCycle
				ELEMENTS.gameboard.inner.innerHTML = ""
				ELEMENTS.gameboard.menu.removeAttribute("gameover")
				ELEMENTS.gameboard.longestword.innerText = ""

			// game loop
				clearInterval(STATE.gameloop)
				for (let i = 0; i < CONSTANTS.ticksPerCycle * CONSTANTS.startingRows; i++) {
					iterateState()
				}
				STATE.gameloop = setInterval(iterateTick, CONSTANTS.msPerTick)
				STATE.time = 0
				STATE.playing = true
				STATE.pressing = false

			// unpause
				STATE.paused = false
				ELEMENTS.gameboard.pause.removeAttribute("paused")
				ELEMENTS.gameboard.menu.removeAttribute("paused")
		}

	/* iterateTick */
		function iterateTick() {
			// paused
				if (!STATE.playing || STATE.paused) {
					return
				}

			// time
				STATE.time++
				const seconds = Math.floor(STATE.time * CONSTANTS.msPerTick / CONSTANTS.msPerSecond)
				ELEMENTS.gameboard.time.innerText = seconds

			// tick
				STATE.tick--
				if (STATE.tick) { return }
				STATE.tick = STATE.ticksPerCycle

			// move
				iterateState()
		}

	/* iterateState */
		function iterateState() {
			// move blocks
				const breach = moveBlocks()

			// endgame?
				if (breach) {
					endGame()
					return
				}

			// new row?
				STATE.rowTick--
				if (STATE.rowTick) { return }
				STATE.rowTick = CONSTANTS.blocks.size
				insertRow()
		}

	/* moveBlocks */
		function moveBlocks() {
			// assume no breach
				let breach = false

			// move blocks up
				for (const b in STATE.blocks) {
					STATE.blocks[b].y -= 1
					STATE.blocks[b].element.style.top = `${STATE.blocks[b].y}px`
					if (!STATE.blocks[b].y) {
						breach = true
					}
				}

			// continue?
				return breach
		}

	/* insertRow */
		function insertRow() {
			// loop through columns
				for (let c = 0; c < CONSTANTS.blocks.columns; c++) {
					// block object
						const block = {
							id: (Math.random() * 10e16).toString(36),
							column: c,
							row: STATE.row,
							letter: CONSTANTS.letters[Math.floor(Math.random() * CONSTANTS.letters.length)],
							health: CONSTANTS.blocks.health,
							x: CONSTANTS.blocks.size * c,
							y: CONSTANTS.blocks.size * CONSTANTS.blocks.rows,
						}
						STATE.blocks[block.id] = block

					// block element
						block.element = document.createElement("div")
						block.element.className = "block"
						block.element.id = `block-${block.id}`
						block.element.innerText = block.letter
						block.element.style.left = `${block.x}px`
						block.element.style.top  = `${block.y}px`
						block.element.style.background = getColor(block.health)
						ELEMENTS.gameboard.inner.appendChild(block.element)
				}

			// count rows
				STATE.row++
		}

	/* endGame */
		function endGame() {
			// stop loop
				clearInterval(STATE.gameloop)
				STATE.playing = false
				STATE.pressing = false

			// longest word
				const allWords = Object.values(STATE.words)
				if (allWords.length) {
					const longestWordLength = allWords.sort((a, b) => {
						return b.length - a.length
					})[0].length
					const longestWords = allWords.filter(word => word.length == longestWordLength).join(" & ")
					ELEMENTS.gameboard.longestword.innerText = longestWords
				}

			// display menu
				ELEMENTS.gameboard.menu.removeAttribute("paused")
				ELEMENTS.gameboard.menu.setAttribute("gameover", true)
		}

	/* pauseGame */
		ELEMENTS.gameboard.pause.addEventListener(TRIGGERS.click, pauseGame)
		ELEMENTS.gameboard.resume.addEventListener(TRIGGERS.click, pauseGame)
		function pauseGame() {
			// not playing
				if (!STATE.playing) { return }

			// unpause
				if (STATE.paused) {
					STATE.paused = false
					ELEMENTS.gameboard.pause.removeAttribute("paused")
					ELEMENTS.gameboard.menu.removeAttribute("paused", true)
					return
				}

			// pause
				STATE.paused = true
				ELEMENTS.gameboard.pause.setAttribute("paused", true)
				ELEMENTS.gameboard.menu.setAttribute("paused", true)
		}

/*** gameplay ***/
	/* downMouse */
		window.addEventListener(TRIGGERS.mousedown, downMouse)
		function downMouse(event) {
			// not playing?
				if (!STATE.playing || STATE.paused) { return }

			// start pressing
				STATE.pressing = true

			// move
				moveMouse(event, true)
		}

	/* moveMouse */
		window.addEventListener(TRIGGERS.mousemove, moveMouse, {passive: false})
		function moveMouse(event, clicking) {
			// not clicking
				if (!clicking) {
					event.preventDefault()
				}
				
			// not pressing?
				if (!STATE.pressing) { return }

			// get absolute position
				const rawX = event.touches ? event.touches[0].clientX : event.clientX
				const rawY = event.touches ? event.touches[0].clientY : event.clientY

			// get relative position
				const gameboard = ELEMENTS.gameboard.inner.getBoundingClientRect()
				const x = rawX - gameboard.x
				const y = rawY - gameboard.y
			
			// get block
				const column = Math.floor(x / CONSTANTS.blocks.size)
				const row = Math.floor((y + (CONSTANTS.blocks.size - STATE.rowTick)) / CONSTANTS.blocks.size) - CONSTANTS.blocks.rows + STATE.row - 1
			
			// select
				selectIfAdjacent(column, row, x, y)
		}

	/* upMouse */
		window.addEventListener(TRIGGERS.mouseup, upMouse)
		function upMouse(event) {
			// stop pressing
				STATE.pressing = false

			// not playing?
				if (!STATE.playing || STATE.paused) {
					unselectAll()
					return
				}

			// fewer than minimum
				if (STATE.selected.length < CONSTANTS.minimumWordLength) {
					unselectAll()
					return
				}

			// already did it
				const ids = STATE.selected.join("-")
				if (STATE.words[ids]) {
					unselectAll()
					return
				}

			// not in dictionary
				const word = STATE.selected.map(id => STATE.blocks[id].letter).join("")
				if (!CONSTANTS.dictionary[word[0]][word.length].includes(word)) {
					unselectAll()
					return
				}

			// in dictionary
				damageBlocks(word)
				unselectAll()
		}

	/* selectIfAdjacent */
		function selectIfAdjacent(column, row, x, y) {
			// out of bounds
				if (column < 0 || column >= CONSTANTS.blocks.columns) {
					return
				}
				if (row < 0 || row >= STATE.row) {
					return
				}

			// get block
				const blockId = Object.keys(STATE.blocks).find(id => STATE.blocks[id].column == column && STATE.blocks[id].row == row)
				if (!blockId) {
					return
				}
				const block = STATE.blocks[blockId]

			// distance
				const deltaX = Math.abs(block.x + (CONSTANTS.blocks.size / 2) - x)
				const deltaY = Math.abs(block.y + (CONSTANTS.blocks.size / 2) - y)
				if (deltaX > CONSTANTS.blocks.radius || deltaY > CONSTANTS.blocks.radius) {
					return
				}

			// first?
				if (!STATE.selected.length) {
					STATE.selected.push(block.id)
					block.element.setAttribute("selected", true)
					return
				}

			// same
				const lastBlock = STATE.blocks[STATE.selected[STATE.selected.length - 1]]
				if (block.id == lastBlock.id) {
					return
				}

			// not adjacent
				if (Math.abs(block.row - lastBlock.row) > 1 || Math.abs(block.column - lastBlock.column) > 1) {
					return
				}

			// previous --> unselect
				if (STATE.selected.length > 1 && block.id == STATE.selected[STATE.selected.length - 2]) {
					lastBlock.element.removeAttribute("selected")
					STATE.selected.pop()
					return
				}

			// already selected
				if (STATE.selected.includes(block.id)) {
					return
				}

			// append
				STATE.selected.push(block.id)
				block.element.setAttribute("selected", true)
		}

	/* unselectAll */
		function unselectAll() {
			// loop through selection
				for (const s in STATE.selected) {
					const block = STATE.blocks[STATE.selected[s]]
					if (block) {
						block.element.removeAttribute("selected")
					}
				}
				STATE.selected = []
		}

	/* damageBlocks */
		function damageBlocks(word) {
			// get word
				const ids = STATE.selected.join("-")
				STATE.words[ids] = word

			// get all adjacent blocks' ids
				const blockIds = Object.keys(STATE.blocks)
				const allAdjacentIds = []
				for (const s in STATE.selected) {
					const thisBlock = STATE.blocks[STATE.selected[s]]
					const theseAdjacentIds = blockIds.filter(id => id !== thisBlock.id && Math.abs(STATE.blocks[id].row - thisBlock.row) <= 1 && Math.abs(STATE.blocks[id].column - thisBlock.column) <= 1)
					allAdjacentIds.push(...theseAdjacentIds)
				}

			// dedupe
				const uniqueIds = Array.from(new Set(allAdjacentIds))

			// double damage word blocks
				const damageIds = uniqueIds.concat(STATE.selected)
				const destroyedIds = []
				for (const d in damageIds) {
					const thatBlock = STATE.blocks[damageIds[d]]
					thatBlock.health -= word.length * CONSTANTS.damageMultiplier
					thatBlock.element.style.opacity = Math.max(CONSTANTS.blocks.minOpacity, (thatBlock.health / CONSTANTS.percentage))
					thatBlock.element.style.background = getColor(thatBlock.health)
					if (thatBlock.health <= 0) {
						destroyedIds.push(thatBlock.id)
					}
				}

			// destroyed blocks
				const affectedIds = []
				for (const d in destroyedIds) {
					const destroyedBlock = STATE.blocks[destroyedIds[d]]
					if (destroyedBlock) {
						const column = destroyedBlock.column
						const row = destroyedBlock.row
						destroyedBlock.element.remove()
						delete STATE.blocks[destroyedIds[d]]

						affectedIds.push(...blockIds.filter(id => STATE.blocks[id] && STATE.blocks[id].column == column && STATE.blocks[id].row < row))
					}
				}

			// affected blocks
				for (const a in affectedIds) {
					const affectedBlock = STATE.blocks[affectedIds[a]]
					if (affectedBlock) {
						affectedBlock.row += 1
						affectedBlock.y += CONSTANTS.blocks.size
						affectedBlock.element.style.top = `${affectedBlock.y}px`
					}
				}

			// score
				ELEMENTS.gameboard.words.innerText = Object.keys(STATE.words).length
				STATE.letters += destroyedIds.length
				ELEMENTS.gameboard.letters.innerText = STATE.letters
				STATE.ticksPerCycle = getTicksPerCycle()
		}

	/* getTicksPerCycle */
		function getTicksPerCycle() {
			// power
				const rawPower = Math.log2(STATE.letters)
				const clampedPower = Math.min(CONSTANTS.maxTicksPower, Math.max(CONSTANTS.minTicksPower, rawPower)) - CONSTANTS.minTicksPower

			// invert
				const linearProgression = 1 - (clampedPower / (CONSTANTS.maxTicksPower - CONSTANTS.minTicksPower))

			// update ticks
				const ticksPerCycle = Math.round(CONSTANTS.ticksPerCycle * linearProgression)
				return ticksPerCycle
		}

	/* getColor */
		function getColor(health) {
			// percentage
				const healthPercent = health / CONSTANTS.blocks.health

			// color
				return CONSTANTS.colors[Math.floor(healthPercent * (CONSTANTS.colors.length - 1))]
		}

	/* moveColumnsLeft */
		ELEMENTS.gameboard.left.addEventListener(TRIGGERS.click, moveColumnsLeft)
		function moveColumnsLeft() {
			// unfocus
				ELEMENTS.gameboard.left.blur()

			// not playing?
				if (!STATE.playing || STATE.paused) { return }

			// loop through
				for (const b in STATE.blocks) {
					if (STATE.blocks[b].column) {
						STATE.blocks[b].column -= 1
						STATE.blocks[b].x -= CONSTANTS.blocks.size
						STATE.blocks[b].element.style.left = `${STATE.blocks[b].x}px`
					}
					else {
						STATE.blocks[b].column = CONSTANTS.blocks.columns - 1
						STATE.blocks[b].x = STATE.blocks[b].column * CONSTANTS.blocks.size
						STATE.blocks[b].element.style.left = `${STATE.blocks[b].x}px`
					}
				}
		}

	/* moveColumnsRight */
		ELEMENTS.gameboard.right.addEventListener(TRIGGERS.click, moveColumnsRight)
		function moveColumnsRight() {
			// unfocus
				ELEMENTS.gameboard.right.blur()

			// not playing?
				if (!STATE.playing || STATE.paused) { return }

			// loop through
				for (const b in STATE.blocks) {
					if (STATE.blocks[b].column < CONSTANTS.blocks.columns - 1) {
						STATE.blocks[b].column += 1
						STATE.blocks[b].x += CONSTANTS.blocks.size
						STATE.blocks[b].element.style.left = `${STATE.blocks[b].x}px`
					}
					else {
						STATE.blocks[b].column = 0
						STATE.blocks[b].x = 0
						STATE.blocks[b].element.style.left = `${STATE.blocks[b].x}px`
					}
				}
		}
