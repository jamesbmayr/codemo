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
			plaque: {
				form: document.querySelector("#plaque"),
				guesses: document.querySelector("#plaque-guesses"),
				input: document.querySelector("#plaque-input"),
				button: document.querySelector("#plaque-button"),
				info: document.querySelector("#plaque-info"),
				title: document.querySelector("#plaque-title"),
				artist: document.querySelector("#plaque-artist"),
				details: document.querySelector("#plaque-details"),
				link: document.querySelector("#plaque-link")
			},
			sidebar: {
				element: document.querySelector("#sidebar"),
				inner: document.querySelector("#sidebar-inner"),
				thumb: document.querySelector("#sidebar-thumb"),
				history: document.querySelector("#sidebar-history"),
				reset: document.querySelector("#sidebar-reset")
			}
		}

	/* constants */
		const CONSTANTS = {
			googleURL: "https://script.google.com/macros/s/AKfycbwJRilNf1O0cYFKyftpmWxnC7QfHeEfmVLjH_2pHZPyAkpes3kM1XO99xRUKnTNf6Xj_w/exec?day=",
			msPerDay: 1000 * 60 * 60 * 24,
			daysPerYear: 365,
			launchYear: 2026,
			launchDate: new Date("January 1, 2026").getTime(),
			blocks: [32,64,128,256,2048],
			maxStrikes: 4,
			svg: {
				chevron: `<svg viewBox="10 10 80 80"><path d="M 80 50 C 60 60 40 70 20 80 C 25 65 25 65 30 50 C 25 35 25 35 20 20 C 40 30 60 40 80 50 Z"></path></svg>`,
				link: `<svg viewBox="10 10 80 80"><path d="M 46 50 C 48 52 51 54 54 54 C 56 54 57 53 54 50 C 52 48 49 46 46 46 C 44 46 43 47 46 50 Z M 39 52 C 37 54 36 55 35 56 C 31 60 27 64 32 70 C 37 75 43 70 46 67 C 50 63 51 62 52 61 C 50 61 46 60 43 57 C 41 55 41 55 39 52 Z M 57 43 C 59 45 59 45 61 48 C 63 46 64 45 65 44 C 69 40 73 36 68 30 C 63 25 57 30 54 33 C 50 37 49 38 48 39 C 50 39 54 40 57 43 Z M 37 44 C 38 40 41 36 47 30 C 57 20 66 17 74 25 C 80 31 79 40 73 46 C 67 52 65 54 63 56 C 62 60 59 64 53 70 C 43 80 34 83 26 75 C 20 69 21 60 27 54 C 33 48 35 46 37 44 Z"></path></svg>`
			}
		}

	/* state */
		const STATE = {
			today: (Math.floor((new Date().getTime() - CONSTANTS.launchDate) / CONSTANTS.msPerDay) % CONSTANTS.daysPerYear) + 1,
			day: 0,
			info: {},
			strikes: 0,
			correct: false,
			scores: {}
		}

/*** helpers ***/
	/* cleanTitle */
		function cleanTitle(title) {
			return title.trim().toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s]/g, "").replace(/^the\s/, "")
		}

	/* toggleSidebar */
		ELEMENTS.sidebar.thumb.addEventListener(TRIGGERS.click, toggleSidebar)
		function toggleSidebar() {
			// open
				if (ELEMENTS.sidebar.element.getAttribute("open")) {
					ELEMENTS.sidebar.element.removeAttribute("open")
				}
				else {
					ELEMENTS.sidebar.inner.scrollTo(0, 0)
					ELEMENTS.sidebar.element.setAttribute("open", true)
				}
		}

/*** history ***/
	/* saveScore */
		function saveScore() {
			// package up
				STATE.scores[STATE.day] = {
					correct: STATE.correct,
					strikes: STATE.strikes,
					info: {
						title: STATE.info.title,
						year: STATE.info.year,
						artist: STATE.info.artist,
						nationality: STATE.info.nationality,
						infoURL: STATE.info.infoURL,
						imageURL: STATE.info.imageURL
					}
				}

			// update listing
				const listing = createDayListing(STATE.day)
				const existingListing = ELEMENTS.sidebar.history.querySelector(`.sidebar-listing[day='${STATE.day}']`)
				if (existingListing) {
					existingListing.replaceWith(listing)
				}

			// update localstorage
				window.localStorage.artguesser = JSON.stringify(STATE.scores)
		}

	/* loadScores */
		loadScores()
		function loadScores() {
			// get from localstorage
				STATE.scores = JSON.parse(window.localStorage.artguesser || "{}")

			// loop through up to today
				const missingDays = []
				const lastDay =  (new Date().getFullYear() > CONSTANTS.launchYear ? CONSTANTS.daysPerYear : STATE.today)
				for (let day = lastDay; day > 0; day--) {
					ELEMENTS.sidebar.history.appendChild(createDayListing(day))
					if (!STATE.scores[day]) {
						missingDays.push(day)
					}
				}

			// not done today?
				if (!STATE.scores[STATE.today] || !missingDays.length) {
					requestImage(STATE.today)
				}
				else {
					requestImage(missingDays[Math.floor(Math.random() * missingDays.length)])
				}
		}

	/* createDayListing */
		function createDayListing(day) {
			// info
				const scoreData = STATE.scores[day]

			// listing
				const listing = document.createElement("div")
					listing.className = "sidebar-listing"
					listing.setAttribute("day", day)

			// date
				const dayBlock = document.createElement("div")
					dayBlock.className = "sidebar-date"
					dayBlock.innerText = new Date(CONSTANTS.launchDate + (day - 1) * CONSTANTS.msPerDay).toLocaleDateString()
				listing.appendChild(dayBlock)

			// plaque
				const plaque = document.createElement("div")
					plaque.className = "sidebar-plaque"
				listing.appendChild(plaque)

					const guesses = document.createElement("div")
						guesses.className = "sidebar-plaque-guesses"
					plaque.appendChild(guesses)

						if (scoreData) {
							for (let i = 0; i < scoreData.strikes; i++) {
								const strike = document.createElement("div")
									strike.className = "sidebar-plaque-strike"
								guesses.appendChild(strike)
							}

							if (scoreData.correct) {
								const correct = document.createElement("div")
									correct.className = `sidebar-plaque-correct-${scoreData.correct}`
								guesses.appendChild(correct)
							}
						}

					const info = document.createElement("div")
						info.className = "sidebar-plaque-info"
					plaque.appendChild(info)

						const title = document.createElement("div")
							title.className = "sidebar-plaque-title"
							title.innerText = scoreData ? scoreData.info.title : "?"
						info.appendChild(title)

						const artist = document.createElement("div")
							artist.className = "sidebar-plaque-artist"
							artist.innerText = scoreData ? scoreData.info.artist : "?"
						info.appendChild(artist)

						const details = document.createElement("div")
							details.className = "sidebar-plaque-details"
							details.innerText = scoreData ? `${scoreData.info.nationality}, ${scoreData.info.year}` : "?"
						info.appendChild(details)

					if (STATE.scores[day]) {
						const link = document.createElement("a")
							link.className = "sidebar-plaque-link"
							link.target = "_blank"
							link.href = STATE.scores[day].info.infoURL
							link.innerHTML = CONSTANTS.svg.link
						plaque.appendChild(link)
					}
					else {
						const button = document.createElement("button")
							button.className = "sidebar-plaque-button"
							button.addEventListener(TRIGGERS.click, selectDay)
							button.innerHTML = CONSTANTS.svg.chevron
						plaque.appendChild(button)
					}

			// return
				return listing
		}

	/* selectDay */
		function selectDay(event) {
			// get day
				const day = event.target.closest(".sidebar-listing").getAttribute("day")
				if (!day) {
					return
				}

			// already solved?
				if (STATE.scores[day]) {
					return
				}

			// load
				requestImage(day)
				toggleSidebar()
		}

	/* resetScores */
		ELEMENTS.sidebar.reset.addEventListener(TRIGGERS.click, resetScores)
		function resetScores() {
			if (window.confirm("Are you sure you want to reset your scores?")) {
				window.localStorage.artguesser = ""
				ELEMENTS.sidebar.history.innerHTML = ""

				STATE.day = STATE.today
				loadScores()
			}

			ELEMENTS.sidebar.reset.blur()
		}


/*** image ***/
	/* requestImage */
		function requestImage(day) {
			// set day
				STATE.day = day

			// already solved?
				if (STATE.scores[STATE.day]) {
					STATE.correct = STATE.scores[STATE.day].correct
					STATE.strikes = STATE.scores[STATE.day].strikes
					STATE.info = {
						title: STATE.scores[STATE.day].info.title,
						year: STATE.scores[STATE.day].info.year,
						artist: STATE.scores[STATE.day].info.artist,
						nationality: STATE.scores[STATE.day].info.nationality,
						infoURL: STATE.scores[STATE.day].info.infoURL,
						imageURL: STATE.scores[STATE.day].info.imageURL
					}
					ELEMENTS.body.setAttribute("phase", "gameover")
					updatePlaque()

					ELEMENTS.image.src = STATE.info.imageURL
					ELEMENTS.image.onload = () => { renderScaledImage() }
					return
				}

			// reset state
				else {
					STATE.correct = false
					STATE.strikes = 0
					ELEMENTS.body.setAttribute("phase", "gameplay")
					updatePlaque(true)
				}

			// hide canvas until ready
				ELEMENTS.canvas.setAttribute("invisible", true)
				
			// get data from Google Sheets
				fetch(CONSTANTS.googleURL + STATE.day)
					.then(response => response.json())
					.then(loadImage)
		}

	/* loadImage */
		function loadImage(response) {
			// no image
				if (!response || !response.success || !response.info || !response.info.imageURL || !response.info.imageURL.length) {
					return
				}

			// save image info
				STATE.info = response.info
				STATE.info.titleVariants  = STATE.info.titleVariants.map( cleanTitle)
				STATE.info.artistVariants = STATE.info.artistVariants.map(cleanTitle)

			// background image
				ELEMENTS.image.src = STATE.info.imageURL
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
				if (cleanTitle(STATE.info.title) == guess || STATE.info.titleVariants.includes(guess)) {
					STATE.correct = "title"
					updatePlaque()
					return
				}

			// correct artist
				if (cleanTitle(STATE.info.artist) == guess || STATE.info.artistVariants.includes(guess)) {
					STATE.correct = "artist"
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
					ELEMENTS.plaque.artist.innerText = ""
					ELEMENTS.plaque.details.innerText = ""
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
					ELEMENTS.plaque.artist.innerText = STATE.info.artist
					ELEMENTS.plaque.details.innerText = `${STATE.info.nationality}, ${STATE.info.year}`
					ELEMENTS.plaque.link.href = STATE.info.infoURL
					saveScore()
				}

			// re-render image
				renderScaledImage()
		}
