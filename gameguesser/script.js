/*** globals ***/
	/* triggers */
		const TRIGGERS = {
			click: "click",
			load: "load",
			submit: "submit",
			resize: "resize",
		}

	/* elements */
		const ELEMENTS = {
			body: document.body,
			image: document.querySelector("#image"),
			frame: document.querySelector("#frame"),
			canvas: document.querySelector("#canvas"),
			context: document.querySelector("#canvas").getContext("2d"),
			refresh: document.querySelector("#refresh"),
			plaque: {
				form: document.querySelector("#plaque"),
				guesses: document.querySelector("#plaque-guesses"),
				input: document.querySelector("#plaque-input"),
				button: document.querySelector("#plaque-button"),
				info: document.querySelector("#plaque-info"),
				title: document.querySelector("#plaque-title"),
				date: document.querySelector("#plaque-date"),
				rating: document.querySelector("#plaque-rating"),
				link: document.querySelector("#plaque-link")
			},
		}

	/* constants */
		const CONSTANTS = {
			infoURL: "https://rawg.io/games/",
			blocks: [32,64,128,256,2048],
			minWordLength: 4,
			maxStrikes: 4,
			svg: {
				chevron: `<svg viewBox="10 10 80 80"><path d="M 80 50 C 60 60 40 70 20 80 C 25 65 25 65 30 50 C 25 35 25 35 20 20 C 40 30 60 40 80 50 Z"></path></svg>`,
				link: `<svg viewBox="10 10 80 80"><path d="M 46 50 C 48 52 51 54 54 54 C 56 54 57 53 54 50 C 52 48 49 46 46 46 C 44 46 43 47 46 50 Z M 39 52 C 37 54 36 55 35 56 C 31 60 27 64 32 70 C 37 75 43 70 46 67 C 50 63 51 62 52 61 C 50 61 46 60 43 57 C 41 55 41 55 39 52 Z M 57 43 C 59 45 59 45 61 48 C 63 46 64 45 65 44 C 69 40 73 36 68 30 C 63 25 57 30 54 33 C 50 37 49 38 48 39 C 50 39 54 40 57 43 Z M 37 44 C 38 40 41 36 47 30 C 57 20 66 17 74 25 C 80 31 79 40 73 46 C 67 52 65 54 63 56 C 62 60 59 64 53 70 C 43 80 34 83 26 75 C 20 69 21 60 27 54 C 33 48 35 46 37 44 Z"></path></svg>`
			}
		}

	/* state */
		const STATE = {
			info: {},
			strikes: 0,
			correct: false,
			previousGames: []
		}

/*** helpers ***/
	/* cleanTitle */
		function cleanTitle(title) {
			return title.trim().toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s]/g, "").replace(/^the\s/, "")
		}

/*** image ***/
	/* loadImage */
		loadImage()
		ELEMENTS.refresh.addEventListener(TRIGGERS.click, loadImage)
		function loadImage() {
			// reset
				STATE.correct = false
				STATE.strikes = 0
				ELEMENTS.body.setAttribute("phase", "gameplay")
				updatePlaque(true)
				
			// hide canvas until ready
				ELEMENTS.canvas.setAttribute("invisible", true)

			// random game
				let gameIndex = null
				do {
					gameIndex = Math.floor(Math.random() * window.GAMES.length)
				}
				while (STATE.previousGames.length < window.GAMES.length && STATE.previousGames.includes(gameIndex))
				STATE.previousGames.push(gameIndex)
				const game = window.GAMES[gameIndex]

			// save image info
				STATE.info = {
					id: game.id,
					title: game.title,
					image: game.image,
					date: game.date,
					rating: game.rating
				}

			// background image
				ELEMENTS.image.src = STATE.info.image
				ELEMENTS.image.onload = () => { renderScaledImage() }

			// focus
				ELEMENTS.plaque.input.focus()
		}

	/* renderScaledImage */
		function renderScaledImage() {
			// no image
				if (!ELEMENTS.image.src) {
					return
				}

			// get actual image dimensions
				const imageWidth  = ELEMENTS.image.width
				const imageHeight = ELEMENTS.image.height
				const XYratio = imageWidth / imageHeight

			// get scaled image size
				const blocks = STATE.correct ? CONSTANTS.blocks[CONSTANTS.blocks.length - 1] : CONSTANTS.blocks[STATE.strikes]
				const scaledWidth  = Math.round((XYratio >= 1) ? blocks : blocks * XYratio)
				const scaledHeight = Math.round((XYratio <= 1) ? blocks : blocks / XYratio)

			// update canvas
				ELEMENTS.canvas.removeAttribute("invisible", true)
				ELEMENTS.canvas.width  = scaledWidth
				ELEMENTS.canvas.height = scaledHeight
				ELEMENTS.canvas.style.width  = `${scaledWidth}px`
				ELEMENTS.canvas.style.height = `${scaledHeight}px`

			// draw scaled image
				ELEMENTS.context.clearRect(0, 0, blocks, blocks)
				ELEMENTS.context.webkitImageSmoothingEnabled = true
				ELEMENTS.context.mozImageSmoothingEnabled = true
				ELEMENTS.context.imageSmoothingEnabled = true
				ELEMENTS.context.drawImage(ELEMENTS.image, 0, 0, scaledWidth, scaledHeight)

			// zoom image
				resizeImage()
		}

	/* resizeImage */
		window.addEventListener(TRIGGERS.resize, resizeImage)
		function resizeImage() {
			// get frame dimensions
				const boundingBox = ELEMENTS.frame.getBoundingClientRect()
				const frameWidth  = boundingBox.width
				const frameHeight = boundingBox.height

			// get ratios
				const widthRatio  = frameWidth  / ELEMENTS.canvas.width
				const heightRatio = frameHeight / ELEMENTS.canvas.height

			// update zoom
				ELEMENTS.canvas.style.zoom = Math.min(widthRatio, heightRatio)
		}

/*** game ***/
	/* submitGuess */
		ELEMENTS.plaque.form.addEventListener(TRIGGERS.submit, submitGuess)
		function submitGuess() {
			// no image
				if (!ELEMENTS.image.src) {
					return
				}

			// out of guesses?
				if (STATE.strikes >= CONSTANTS.maxStrikes || STATE.correct) {
					return
				}

			// clean up guess
				const guess = cleanTitle(ELEMENTS.plaque.input.value)
				if (!guess || !guess.length) {
					return
				}
				ELEMENTS.plaque.input.value = ""

			// correct title
				if (cleanTitle(STATE.info.title) == guess) {
					STATE.correct = "title"
					updatePlaque()
					return
				}

			// partial title
				const titleWords = new Set(STATE.info.title.split(/\s/g).map(word => cleanTitle(word)).filter(word => word.length >= CONSTANTS.minWordLength))
				const guessWords = new Set(guess.split(/\s/g).map(word => cleanTitle(word)).filter(word => word.length >= CONSTANTS.minWordLength))
				if (titleWords.intersection(guessWords).size) {
					STATE.correct = "title"
					updatePlaque()
					return
				}

			// incorrect
				STATE.strikes += 1
				updatePlaque()
		}

	/* updatePlaque */
		function updatePlaque(reset) {
			// reset
				if (reset) {
					ELEMENTS.plaque.guesses.removeAttribute("wrong")
					ELEMENTS.plaque.guesses.removeAttribute("correct")
					ELEMENTS.plaque.info.removeAttribute("gameover")
					ELEMENTS.plaque.title.innerText = ""
					ELEMENTS.plaque.date.innerText = ""
					ELEMENTS.plaque.rating.innerText = ""
					ELEMENTS.plaque.link.href = "#"
					return
				}

			// guesses
				else {
					ELEMENTS.plaque.guesses.setAttribute("wrong", STATE.strikes)
					ELEMENTS.plaque.guesses.setAttribute("correct", STATE.correct)
				}

			// gameover?
				if (STATE.correct || STATE.strikes == CONSTANTS.maxStrikes) {
					ELEMENTS.plaque.info.setAttribute("gameover", true)
					ELEMENTS.plaque.title.innerText = STATE.info.title
					ELEMENTS.plaque.date.innerText = STATE.info.date || ""
					ELEMENTS.plaque.rating.innerText = `${STATE.info.rating || "?"}/100`
					ELEMENTS.plaque.link.href = `${CONSTANTS.infoURL}${STATE.info.id}`
					ELEMENTS.refresh.focus()
				}

			// re-render image
				renderScaledImage()
		}
