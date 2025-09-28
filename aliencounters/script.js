/*** globals ***/
	/* triggers */
		const TRIGGERS = {
			click: "click"
		}

	/* elements */
		const ELEMENTS = {
			container: document.querySelector("#container"),
			navbar: {
				element: document.querySelector("#navbar"),
				player: document.querySelector("#navbar-player"),
				opponent: document.querySelector("#navbar-opponent"),
				game: document.querySelector("#navbar-game")
			},
			player: {
				element: document.querySelector("#player"),
				visuals: document.querySelector("#player-visuals"),
				redPlus: document.querySelector("#red-plus"),
				redMinus: document.querySelector("#red-minus"),
				randomPlus: document.querySelector("#random-plus"),
				randomMinus: document.querySelector("#random-minus"),
				bluePlus: document.querySelector("#blue-plus"),
				blueMinus: document.querySelector("#blue-minus"),
				undo: document.querySelector("#undo")
			},
			opponent: {
				element: document.querySelector("#opponent"),
				visuals: document.querySelector("#opponent-visuals"),
				red: document.querySelector("#opponent-visuals-red"),
				blue: document.querySelector("#opponent-visuals-blue"),
				timer: document.querySelector("#opponent-timer"),
				check1: document.querySelector("#check-1"),
				check2: document.querySelector("#check-2"),
				check3: document.querySelector("#check-3"),
				check4: document.querySelector("#check-4"),
				check5: document.querySelector("#check-5")
			},
			game: {
				element: document.querySelector("#game"),
				visuals: document.querySelector("#game-visuals"),
				red: document.querySelector("#game-visuals-red"),
				blue: document.querySelector("#game-visuals-blue"),
				timer: document.querySelector("#game-timer"),
				reveal: document.querySelector("#reveal"),
				revealConfirm: document.querySelector("#reveal-confirm"),
				revealCancel: document.querySelector("#reveal-cancel"),
				empty: document.querySelector("#empty"),
				emptyConfirm: document.querySelector("#empty-confirm"),
				emptyCancel: document.querySelector("#empty-cancel"),
			}
		}

	/* constants */
		const CONSTANTS = {
			updateTimeout: 500, // ms
			checkTimeout: 5000, // ms
			revealTimeout: 15000, // ms
		}

	/* state */
		const STATE = {
			updateTimeout: null, 
			checkTimeout: null,
			revealTimeout: null,
			red: 0,
			blue: 0,
			history: []
		}

/*** helpers ***/
	/* chooseRandom */
		function chooseRandom(list) {
			if (!Array.isArray(list)) {
				return list
			}

			return list[Math.floor(Math.random() * list.length)]
		}

/*** navbar ***/
	/* navigateToPlayer */
		ELEMENTS.navbar.player.addEventListener(TRIGGERS.click, navigateToPlayer)
		function navigateToPlayer() {
			ELEMENTS.container.setAttribute("tab", "player")
			hideCheckedTokens()
			hideRevealedTokens()
			cancelReveal()
			cancelEmpty()
		}

	/* navigateToOpponent */
		ELEMENTS.navbar.opponent.addEventListener(TRIGGERS.click, navigateToOpponent)
		function navigateToOpponent() {
			ELEMENTS.container.setAttribute("tab", "opponent")
			hideCheckedTokens()
			hideRevealedTokens()
			cancelReveal()
			cancelEmpty()
		}

	/* navigateToGame */
		ELEMENTS.navbar.game.addEventListener(TRIGGERS.click, navigateToGame)
		function navigateToGame() {
			ELEMENTS.container.setAttribute("tab", "game")
			hideCheckedTokens()
			hideRevealedTokens()
			cancelReveal()
			cancelEmpty()
		}

/*** player ***/
	/* addRed */
		ELEMENTS.player.redPlus.addEventListener(TRIGGERS.click, addRed)
		function addRed() {
			STATE.red = STATE.red + 1
			storeHistory(1, 0)
			animatePlayer()
		}

	/* subtractRed */
		ELEMENTS.player.redMinus.addEventListener(TRIGGERS.click, subtractRed)
		function subtractRed() {
			if (STATE.red > 0) {
				STATE.red = STATE.red - 1
				storeHistory(-1, 0)
			}
			else {
				storeHistory(0, 0)
			}
			animatePlayer()
		}

	/* addBlue */
		ELEMENTS.player.bluePlus.addEventListener(TRIGGERS.click, addBlue)
		function addBlue() {
			STATE.blue = STATE.blue + 1
			storeHistory(0, 1)
			animatePlayer()
		}

	/* subtractBlue */
		ELEMENTS.player.blueMinus.addEventListener(TRIGGERS.click, subtractBlue)
		function subtractBlue() {
			if (STATE.blue > 0) {
				STATE.blue = STATE.blue - 1
				storeHistory(0, -1)
			}
			else {
				storeHistory(0, 0)
			}
			animatePlayer()
		}

	/* addRandom */
		ELEMENTS.player.randomPlus.addEventListener(TRIGGERS.click, addRandom)
		function addRandom() {
			if (chooseRandom(["red", "blue"]) == "red") {
				addRed()
			}
			else {
				addBlue()
			}
		}

	/* subtractRandom */
		ELEMENTS.player.randomMinus.addEventListener(TRIGGERS.click, subtractRandom)
		function subtractRandom() {
			if (chooseRandom(["red", "blue"]) == "red") {
				subtractRed()
			}
			else {
				subtractBlue()
			}
		}

	/* undoHistory */
		ELEMENTS.player.undo.addEventListener(TRIGGERS.click, undoHistory)
		function undoHistory() {
			const lastMove = STATE.history.pop()
			STATE.red = Math.max(0, STATE.red - lastMove[0])
			STATE.blue = Math.max(0, STATE.blue - lastMove[1])
			animatePlayer()
		}

	/* animatePlayer */
		function animatePlayer() {
			// reset animation
				ELEMENTS.player.visuals.removeAttribute("animate", true)
				setTimeout(() => {
					ELEMENTS.player.visuals.setAttribute("animate", true)
				}, 0)

			// reset timeout
				clearTimeout(STATE.updateTimeout)
				STATE.updateTimeout = setTimeout(() => {
					ELEMENTS.player.visuals.removeAttribute("animate")
				}, CONSTANTS.updateTimeout)
		}

	/* storeHistory */
		function storeHistory(red, blue) {
			STATE.history.push([red, blue])
		}

/*** opponent ***/
	/* check1 */
		ELEMENTS.opponent.check1.addEventListener(TRIGGERS.click, check1)
		function check1() {
			selectTokens(1)
		}

	/* check2 */
		ELEMENTS.opponent.check2.addEventListener(TRIGGERS.click, check2)
		function check2() {
			selectTokens(2)
		}

	/* check3 */
		ELEMENTS.opponent.check3.addEventListener(TRIGGERS.click, check3)
		function check3() {
			selectTokens(3)
		}

	/* check4 */
		ELEMENTS.opponent.check4.addEventListener(TRIGGERS.click, check4)
		function check4() {
			selectTokens(4)
		}

	/* check5 */
		ELEMENTS.opponent.check5.addEventListener(TRIGGERS.click, check5)
		function check5() {
			selectTokens(5)
		}

	/* selectTokens */
		function selectTokens(count) {
			// build list
				const redArray = new Array(STATE.red).fill("red")
				const blueArray = new Array(STATE.blue).fill("blue")
				const fullArray = redArray.concat(blueArray)

			// random
				let red = 0
				let blue = 0
				while (fullArray.length && red + blue < count) {
					const color = chooseRandom(fullArray)
					if (color == "red") {
						red += 1
						fullArray.shift()
					}
					else {
						blue += 1
						fullArray.pop()
					}
				}

			// visuals
				ELEMENTS.opponent.red.innerHTML = red
				ELEMENTS.opponent.blue.innerHTML = blue
				ELEMENTS.opponent.visuals.removeAttribute("blur")

			// reset animation
				ELEMENTS.opponent.timer.removeAttribute("animate", true)
				setTimeout(() => {
					ELEMENTS.opponent.timer.setAttribute("animate", true)
				}, 0)

			// reset timeout
				clearTimeout(STATE.checkTimeout)
				STATE.checkTimeout = setTimeout(hideCheckedTokens, CONSTANTS.checkTimeout)
		}

	/* hideCheckedTokens */
		function hideCheckedTokens() {
			clearTimeout(STATE.checkTimeout)
			ELEMENTS.opponent.red.innerHTML = "?"
			ELEMENTS.opponent.blue.innerHTML = "?"
			ELEMENTS.opponent.timer.removeAttribute("animate")
			ELEMENTS.opponent.visuals.setAttribute("blur", true)
		}

/*** game ***/
	/* startReveal */
		ELEMENTS.game.reveal.addEventListener(TRIGGERS.click, startReveal)
		function startReveal() {
			ELEMENTS.game.reveal.removeAttribute("visible")
			ELEMENTS.game.revealConfirm.setAttribute("visible", true)
			ELEMENTS.game.revealCancel.setAttribute("visible", true)
		}

	/* cancelReveal */
		ELEMENTS.game.revealCancel.addEventListener(TRIGGERS.click, cancelReveal)
		function cancelReveal() {
			ELEMENTS.game.reveal.setAttribute("visible", true)
			ELEMENTS.game.revealConfirm.removeAttribute("visible")
			ELEMENTS.game.revealCancel.removeAttribute("visible")
		}

	/* revealTokens */
		ELEMENTS.game.revealConfirm.addEventListener(TRIGGERS.click, revealTokens)
		function revealTokens() {
			// show tokens
				ELEMENTS.game.red.innerHTML = STATE.red
				ELEMENTS.game.blue.innerHTML = STATE.blue
				ELEMENTS.game.visuals.removeAttribute("blur")
				cancelReveal()

			// reset animation
				ELEMENTS.game.timer.removeAttribute("animate", true)
				setTimeout(() => {
					ELEMENTS.game.timer.setAttribute("animate", true)
				}, 0)

			// reset timeout
				clearTimeout(STATE.revealTimeout)
				STATE.revealTimeout = setTimeout(hideRevealedTokens, CONSTANTS.revealTimeout)
		}

	/* hideRevealedTokens */
		function hideRevealedTokens() {
			clearTimeout(STATE.revealTimeout)
			ELEMENTS.game.red.innerHTML = "?"
			ELEMENTS.game.blue.innerHTML = "?"
			ELEMENTS.game.timer.removeAttribute("animate")
			ELEMENTS.game.visuals.setAttribute("blur", true)
		}

	/* startEmpty */
		ELEMENTS.game.empty.addEventListener(TRIGGERS.click, startEmpty)
		function startEmpty() {
			ELEMENTS.game.empty.removeAttribute("visible")
			ELEMENTS.game.emptyConfirm.setAttribute("visible", true)
			ELEMENTS.game.emptyCancel.setAttribute("visible", true)
		}

	/* cancelEmpty */
		ELEMENTS.game.emptyCancel.addEventListener(TRIGGERS.click, cancelEmpty)
		function cancelEmpty() {
			ELEMENTS.game.empty.setAttribute("visible", true)
			ELEMENTS.game.emptyConfirm.removeAttribute("visible")
			ELEMENTS.game.emptyCancel.removeAttribute("visible")
		}

	/* emptyTokens */
		ELEMENTS.game.emptyConfirm.addEventListener(TRIGGERS.click, emptyTokens)
		function emptyTokens() {
			// hide revealed tokens
				ELEMENTS.game.red.innerHTML = "?"
				ELEMENTS.game.blue.innerHTML = "?"
				hideRevealedTokens()

			// reset state
				STATE.red = 0
				STATE.blue = 0
				STATE.history = []

			// navigate to player
				navigateToPlayer()
				animatePlayer()
		}
