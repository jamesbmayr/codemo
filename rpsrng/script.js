/*** globals ***/
	/* triggers */
		const TRIGGERS = {
			click: "click",
			input: "input",
			dragover: "dragover",
			drop: "drop"
		}

	/* elements */
		const ELEMENTS = {
			body: document.body,
			sidebar: {
				element: document.querySelector("#sidebar"),
				begin: document.querySelector("#sidebar-begin"),
				competitors: document.querySelector("#sidebar-competitors"),
				add: document.querySelector("#sidebar-add"),
				download: document.querySelector("#sidebar-download"),
				upload: document.querySelector("#sidebar-upload"),
				toggle: document.querySelector("#sidebar-toggle"),
			},
			pause: document.querySelector("#pause"),
			arena: {
				element: document.querySelector("#arena"),
				title: document.querySelector("#arena-title"),
				matchups: document.querySelector("#arena-matchups"),
				results: document.querySelector("#arena-results"),
			}
		}

	/* constants */
		const CONSTANTS = {
			percent: 100,
			boutCount: 100,
			boutTime: 100,
			resolution: 100,
			roundPause: 5000,
			schema: {
				competitor: {
					id: null,
					elements: {},
					name: "",
					url: "",
					rock: 3333,
					paper: 3333,
					scissors: 3334,
					wins: 0,
					ties: 0,
					losses: 0
				}
			},
			presets: [
				{
					"name": "eequa",
					"url": "../iconlibrary/icons/symbol-math-operation-equals.svg",
					"rock": 3333,
					"paper": 3334,
					"scissors": 3333
				},
				{
					"name": "rocky",
					"url": "../iconlibrary/icons/nature-rock-stone-minerals.svg",
					"rock": 8000,
					"paper": 1000,
					"scissors": 1000
				},
				{
					"name": "paprus",
					"url": "../iconlibrary/icons/tech-file-document.svg",
					"rock": 1000,
					"paper": 8000,
					"scissors": 1000
				},
				{
					"name": "scizrz",
					"url": "../iconlibrary/icons/art-crafting-scissors.svg",
					"rock": 1000,
					"paper": 1000,
					"scissors": 8000
				},
				{
					"name": "tablo",
					"url": "../iconlibrary/icons/tech-file-tombstone-writing.svg",
					"rock": 5000,
					"paper": 5000,
					"scissors": 0
				},
				{
					"name": "puzzler",
					"url": "../iconlibrary/icons/game-puzzle-piece-vertical.svg",
					"rock": 0,
					"paper": 5000,
					"scissors": 5000
				},
				{
					"name": "axiom",
					"url": "../iconlibrary/icons/tech-tool-battle-axe.svg",
					"rock": 5000,
					"paper": 0,
					"scissors": 5000
				}
			],
			svg: {
				rock: `<svg viewBox="10 10 80 80"><path d="M 51 40 C 49 36 52 28 51 25 C 50 23 46 25 44 25 C 41 25 40 27 38 28 C 33 30 32 33 32 38 C 28 41 24 46 27 48 C 30 50 33 54 35 54 C 37 54 39 49 41 49 C 43 47 44 45 47 46 C 51 48 54 42 51 40 Z M 61 42 C 58 42 56 45 56 48 C 56 50 54 52 56 52 C 58 52 58 54 60 54 C 62 54 66 54 67 52 C 68 50 70 51 71 51 C 73 52 76 49 76 48 C 75 47 75 45 75 43 C 75 40 72 40 70 40 C 68 39 67 41 61 42 Z M 66 37 C 66 37 71 37 72 33 C 71 32 70 32 72 31 C 72 31 72 29 70 27 C 68 26 66 29 63 27 C 60 25 59 28 57 26 C 55 23 54 26 53 33 C 53 36 54 34 54 37 C 54 40 58 36 58 38 C 58 40 62 39 66 37 Z M 36 58 C 32 58 27 52 27 57 C 27 58 28 60 27 60 C 26 60 26 60 26 62 C 26 63 30 66 30 70 C 31 72 31 74 32 75 C 33 76 37 74 39 74 C 41 74 43 73 45 72 C 47 70 44 67 42 65 C 40 64 39 59 36 58 Z M 61 71 C 63 70 71 73 73 69 C 74 65 74 61 75 57 C 76 53 70 58 67 57 C 65 56 59 57 55 57 C 52 55 52 47 45 51 C 40 54 42 57 43 61 C 44 65 49 65 50 67 C 51 69 53 69 52 70 C 53 71 59 72 61 71 Z M 46 74 C 45 74 44 76 42 76 C 39 77 34 83 29 77 C 26 74 28 68 27 68 C 24 67 21 68 21 59 C 20 58 22 57 24 54 C 25 53 23 53 22 48 C 22 45 28 34 28 32 C 28 21 36 29 37 25 C 37 22 40 22 42 22 C 44 22 45 23 48 22 C 54 17 58 24 62 22 C 64 21 64 24 70 24 C 74 23 77 29 76 32 C 74 36 82 43 79 49 C 78 51 79 52 79 54 C 79 57 78 62 78 64 C 78 66 81 67 74 76 C 73 78 64 75 62 76 C 52 84 53 74 48 74 C 50 74 47 74 46 74 Z"></path></svg>`,
				paper: `<svg viewBox="10 10 80 80"><path d="M 37 25 C 36 25 35 26 35 27 C 35 42 35 58 35 73 C 35 74 36 75 37 75 C 45 75 55 75 63 75 C 64 75 65 74 65 73 C 65 58 65 40 65 36 C 65 35 65 35 64 35 C 63 35 61 35 59 35 C 57 35 55 33 55 31 C 55 29 55 27 55 26 C 55 25 55 25 54 25 C 50 25 40 25 37 25 Z M 61 30 C 63 30 64 30 65 30 C 65 30 60 25 60 25 C 60 26 60 27 60 29 C 60 30 60 30 61 30 Z M 36 20 C 45 20 55 20 58 20 C 61 20 70 29 70 32 C 70 42 70 58 70 74 C 70 77 67 80 64 80 C 55 80 45 80 36 80 C 33 80 30 77 30 74 C 30 58 30 42 30 26 C 30 23 33 20 36 20 Z"></path></svg>`,
				scissors: `<svg viewBox="10 10 80 80"><path d="M 65 64 C 65 67 67 69 70 69 C 73 69 75 67 75 64 C 75 61 73 59 70 59 C 67 59 65 61 65 64 Z M 65 36 C 65 39 67 41 70 41 C 73 41 75 39 75 36 C 75 33 73 31 70 31 C 67 31 65 33 65 36 Z M 70 54 C 80 57 80 61 80 64 C 80 70 76 74 70 74 C 64 74 60 70 60 64 C 60 59 65 57 60 55 C 55 53 55 52 50 54 C 45 56 40 58 35 60 C 30 62 24 62 22 61 C 20 60 20 60 25 58 C 31 56 39 53 47 50 C 39 47 31 44 25 42 C 20 40 20 40 22 39 C 24 38 30 38 35 40 C 40 42 45 44 50 46 C 55 48 55 47 60 45 C 65 43 60 41 60 36 C 60 30 64 26 70 26 C 76 26 80 30 80 36 C 80 39 80 43 70 46 C 65 48 65 48 60 50 C 65 52 65 52 70 54 Z"></path></svg>`,
				remove: `<svg viewBox="10 10 80 80"><path d="M 50 43 C 55 38 60 33 64 29 C 66 27 69 27 71 29 C 73 31 73 34 71 36 C 67 40 62 45 57 50 C 62 55 67 60 71 64 C 73 66 73 69 71 71 C 69 73 66 73 64 71 C 60 67 55 62 50 57 C 45 62 40 67 36 71 C 34 73 31 73 29 71 C 27 69 27 66 29 64 C 33 60 38 55 43 50 C 38 45 33 40 29 36 C 27 34 27 31 29 29 C 31 27 34 27 36 29 C 40 33 45 38 50 43 Z"></path></svg>`,
				unknown: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path fill="%23aaaaaa" d="M 40 30 C 40 33 38 35 35 35 C 32 35 30 33 30 30 C 30 19 39 10 50 10 C 61 10 70 19 70 30 C 70 39 63 45 57 51 C 55 53 55 56 55 57 C 55 58 55 62 55 65 C 55 68 53 70 50 70 C 47 70 45 68 45 65 C 45 62 45 58 45 55 C 45 50 47 48 50 45 C 55 40 60 35 60 30 C 60 25 55 20 50 20 C 45 20 40 25 40 30 Z M 45 85 C 45 82 47 80 50 80 C 53 80 55 82 55 85 C 55 88 53 90 50 90 C 47 90 45 88 45 85 Z"></path></svg>`,
			},
		}

	/* state */
		const STATE = {
			competing: false,
			competitors: {},
			matchups: {}
		}

/*** helpers ***/
	/* duplicateObject */
		function duplicateObject(obj) {
			if (typeof obj !== "object") {
				return obj
			}
			return JSON.parse(JSON.stringify(obj))
		}

	/* chooseRandom */
		function chooseRandom(arr) {
			if (!Array.isArray(arr)) {
				return arr
			}
			return arr[Math.floor(Math.random() * arr.length)]
		}

	/* generateRandomString */
		function generateRandomString() {
			return `_${(Math.random() * 10e16).toString(36).slice(1,9)}`
		}

	/* isValidPercent */
		function isValidPercent(competitor) {
			return (competitor.rock + competitor.paper + competitor.scissors) == (CONSTANTS.resolution * CONSTANTS.percent)
		}

	/* getPercent */
		function getPercent(part, whole) {
			part = Number(part) || 0
			return Math.round(CONSTANTS.resolution * CONSTANTS.percent * part / whole) / CONSTANTS.resolution
		}

	/* sleep */
		function sleep(ms) {
			return new Promise((resolve, reject) => {
				setTimeout(resolve, ms)
			})
		}

/*** menu ***/
	/* toggleSidebar */
		ELEMENTS.sidebar.toggle.addEventListener(TRIGGERS.click, toggleSidebar)
		function toggleSidebar(event) {
			if (ELEMENTS.sidebar.element.getAttribute("open")) {
				ELEMENTS.sidebar.element.removeAttribute("open")
				return
			}

			ELEMENTS.sidebar.element.setAttribute("open", true)
		}

	/* addCompetitor */
		ELEMENTS.sidebar.add.addEventListener(TRIGGERS.click, addCompetitor)
		function addCompetitor(event, data) {
			if (STATE.competing) {
				return
			}

			const competitor = duplicateObject(CONSTANTS.schema.competitor)
			data = data || duplicateObject(chooseRandom(CONSTANTS.presets))
				competitor.id = data.id || generateRandomString()
				competitor.name = data.name || ""
				competitor.url = data.url || ""
				competitor.rock = data.rock || 0
				competitor.paper = data.paper || 0
				competitor.scissors = data.scissors || 0
			STATE.competitors[competitor.id] = competitor

			const container = document.createElement("div")
				container.id = competitor.id
				container.className = "competitor"
				container.setAttribute("valid", true)
			ELEMENTS.sidebar.competitors.appendChild(container)
			competitor.elements.container = container

				const removeContainer = document.createElement("div")
					removeContainer.className = "competitor-remove-outer"
				container.appendChild(removeContainer)

					const removeButton = document.createElement("button")
						removeButton.className = "competitor-remove"
						removeButton.innerHTML = CONSTANTS.svg.remove
						removeButton.title = "remove competitor"
						removeButton.addEventListener(TRIGGERS.click, removeCompetitor)
					removeContainer.appendChild(removeButton)
					competitor.elements.removeButton = removeButton

				const infoContainer = document.createElement("div")
					infoContainer.className = "competitor-info"
				container.appendChild(infoContainer)

				const nameInput = document.createElement("input")
					nameInput.type = "text"
					nameInput.setAttribute("spellcheck", "off")
					nameInput.setAttribute("autocomplete", "false")
					nameInput.setAttribute("autocorrect", "false")
					nameInput.setAttribute("autocapitalize", "false")
					nameInput.placeholder = "name"
					nameInput.value = competitor.name
					nameInput.className = "competitor-name"
					nameInput.addEventListener(TRIGGERS.input, updateName)
				infoContainer.appendChild(nameInput)
				competitor.elements.nameInput = nameInput

				const urlInput = document.createElement("input")
					urlInput.type = "text"
					urlInput.setAttribute("spellcheck", "off")
					urlInput.setAttribute("autocomplete", "false")
					urlInput.setAttribute("autocorrect", "false")
					urlInput.setAttribute("autocapitalize", "false")
					urlInput.placeholder = "image url"
					urlInput.value = competitor.url
					urlInput.className = "competitor-url"
					urlInput.addEventListener(TRIGGERS.input, updateURL)
				infoContainer.appendChild(urlInput)
				competitor.elements.urlInput = urlInput
				
				const image = document.createElement("img")
					image.className = "competitor-image"
					image.src = competitor.url || `data:image/svg+xml,${CONSTANTS.svg.unknown}`
				container.appendChild(image)
				competitor.elements.image = image

				const rockLabel = document.createElement("label")
					rockLabel.className = "competitor-rock"
					rockLabel.innerHTML = CONSTANTS.svg.rock
				container.appendChild(rockLabel)

					const rockInput = document.createElement("input")
						rockInput.type = "number"
						rockInput.min = 0
						rockInput.max = CONSTANTS.percent
						rockInput.step = 1 / CONSTANTS.resolution
						rockInput.value = competitor.rock / CONSTANTS.resolution
						rockInput.className = "competitor-rock-input"
						rockInput.addEventListener(TRIGGERS.input, updateRock)
					rockLabel.appendChild(rockInput)
					competitor.elements.rockInput = rockInput

				const paperLabel = document.createElement("label")
					paperLabel.className = "competitor-paper"
					paperLabel.innerHTML = CONSTANTS.svg.paper
				container.appendChild(paperLabel)

					const paperInput = document.createElement("input")
						paperInput.type = "number"
						paperInput.min = 0
						paperInput.max = CONSTANTS.percent
						paperInput.step = 1 / CONSTANTS.resolution
						paperInput.value = competitor.paper / CONSTANTS.resolution
						paperInput.className = "competitor-paper-input"
						paperInput.addEventListener(TRIGGERS.input, updatePaper)
					paperLabel.appendChild(paperInput)
					competitor.elements.paperInput = paperInput

				const scissorsLabel = document.createElement("label")
					scissorsLabel.className = "competitor-scissors"
					scissorsLabel.innerHTML = CONSTANTS.svg.scissors
				container.appendChild(scissorsLabel)

					const scissorsInput = document.createElement("input")
						scissorsInput.type = "number"
						scissorsInput.min = 0
						scissorsInput.max = CONSTANTS.percent
						scissorsInput.step = 1 / CONSTANTS.resolution
						scissorsInput.value = competitor.scissors / CONSTANTS.resolution
						scissorsInput.className = "competitor-scissors-input"
						scissorsInput.addEventListener(TRIGGERS.input, updateScissors)
					scissorsLabel.appendChild(scissorsInput)
					competitor.elements.scissorsInput = scissorsInput
		}

	/* updateName */
		function updateName(event) {
			if (STATE.competing) {
				return
			}

			const competitorId = event.target.closest(".competitor").id
			const competitor = STATE.competitors[competitorId]
			competitor.name = competitor.elements.nameInput.value.trim()
		}

	/* updateURL */
		function updateURL(event) {
			if (STATE.competing) {
				return
			}

			const competitorId = event.target.closest(".competitor").id
			const competitor = STATE.competitors[competitorId]
			competitor.url = competitor.elements.urlInput.value.trim()
			competitor.elements.image.src = competitor.url
		}

	/* updateRock */
		function updateRock(event) {
			if (STATE.competing) {
				return
			}

			const competitorId = event.target.closest(".competitor").id
			const competitor = STATE.competitors[competitorId]
			competitor.rock = Number(competitor.elements.rockInput.value) * CONSTANTS.resolution
			competitor.elements.container.setAttribute("valid", isValidPercent(competitor))
		}

	/* updatePaper */
		function updatePaper(event) {
			if (STATE.competing) {
				return
			}

			const competitorId = event.target.closest(".competitor").id
			const competitor = STATE.competitors[competitorId]
			competitor.paper = Number(competitor.elements.paperInput.value) * CONSTANTS.resolution
			competitor.elements.container.setAttribute("valid", isValidPercent(competitor))
		}

	/* updateScissors */
		function updateScissors(event) {
			if (STATE.competing) {
				return
			}

			const competitorId = event.target.closest(".competitor").id
			const competitor = STATE.competitors[competitorId]
			competitor.scissors = Number(competitor.elements.scissorsInput.value) * CONSTANTS.resolution
			competitor.elements.container.setAttribute("valid", isValidPercent(competitor))
		}

	/* removeCompetitor */
		function removeCompetitor(event) {
			if (STATE.competing) {
				return
			}

			const competitorId = event.target.closest(".competitor").id
			const competitor = STATE.competitors[competitorId]
			competitor.elements.container.remove()
			delete STATE.competitors[competitorId]
		}

	/* downloadFile */
		ELEMENTS.sidebar.download.addEventListener(TRIGGERS.click, downloadFile)
		function downloadFile(event) {
			// copy data
				const data = {
					project: "rpsrng",
					competitors: duplicateObject(STATE.competitors)
				}
				for (const i in data.competitors) {
					delete data.competitors[i].elements
				}

			// package up
				const link = document.createElement("a")
					link.id = "controls-download-link"
					link.setAttribute("href", "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data)))
					link.setAttribute("download", "rpsrng_" + (new Date().getTime()) + ".json")
					link.addEventListener(TRIGGERS.click, () => {
						ELEMENTS.body.removeChild(link)
					})
			
			// click
				ELEMENTS.body.appendChild(link)
				link.click()
		}

	/* uploadFile */
		ELEMENTS.sidebar.upload.addEventListener(TRIGGERS.input, uploadFile)
		function uploadFile(event) {
			const file = ELEMENTS.sidebar.upload.files[0]
			if (!file) {
				return
			}
			importFile(file)
		}

	/* dragFile */
		ELEMENTS.body.addEventListener(TRIGGERS.dragover, dragFile)
		function dragFile(event) {
			event.preventDefault()
		}

	/* dropFile */
		ELEMENTS.body.addEventListener(TRIGGERS.drop, dropFile)
		function dropFile(event) {
			// defaults
				event.preventDefault()
				if (!event.dataTransfer || !event.dataTransfer.items) {
					return
				}

			// file
				const file = [...event.dataTransfer.items][0].getAsFile()
				if (!file) {
					return
				}

			// read file
				importFile(file)
		}

	/* importFile */
		function importFile(file) {
			if (file.type !== "application/json") {
				return
			}

			let reader = new FileReader()
				reader.readAsText(file)
				reader.onload = function(event) {
					try {
						// try to parse data
							let data = String(event.target.result)
							if (!data || !data.length) {
								return
							}
							data = JSON.parse(data)

						// loop through data to create competitors
							for (let i in data.competitors) {
								if (STATE.competitors[i]) {
									STATE.competitors[i].elements.container.remove()
									delete STATE.competitors[i]
								}
								STATE.competitors[i] = data.competitors[i]
								addCompetitor(null, STATE.competitors[i])
							}
					} catch (error) {console.log(error)}
					ELEMENTS.sidebar.upload.value = null
				}
		}

/*** assetManager ***/
	/* retrieveAsset */
		window.ASSETS_J.retrieveAsset = function(name, type, data) {
			try {
				// json
					const jsonData = JSON.parse(data)
					for (let i in jsonData.competitors) {
						if (STATE.competitors[i]) {
							STATE.competitors[i].elements.container.remove()
							delete STATE.competitors[i]
						}
						STATE.competitors[i] = jsonData.competitors[i]
						addCompetitor(null, STATE.competitors[i])
					}
			} catch (error) {console.log(error)}
		}

	/* storeAsset */
		window.ASSETS_J.storeAsset = async function(type) {
			try {
				// json
					if (type == "json") {
						const data = {
							project: "rpsrng",
							competitors: duplicateObject(STATE.competitors)
						}
						for (const i in data.competitors) {
							delete data.competitors[i].elements
						}

						return {
							name: "rpsrng_" + (new Date().getTime()) + ".json",
							type: "json",
							data: JSON.stringify(data)
						}
					}
			} catch (error) {console.log(error)}
		}

/*** gameplay ***/
	/* enactCompetition */
		ELEMENTS.sidebar.begin.addEventListener(TRIGGERS.click, enactCompetition)
		async function enactCompetition(event) {
			// get all combinations of a vs. b
				STATE.matchups = getMatchups()
				if (!Object.keys(STATE.matchups).length) {
					return
				}

			// close sidebar & clear board
				STATE.competing = true
				ELEMENTS.pause.setAttribute("paused", false)
				ELEMENTS.arena.element.setAttribute("paused", false)
				toggleSidebar()
				ELEMENTS.arena.results.innerHTML = ""

			// loop through each competitor, waiting for the next round
				let roundNumber = 1
				for (const i in STATE.matchups) {
					updateRoundTitle(roundNumber, i)
					ELEMENTS.arena.matchups.innerHTML = ""
					const roundResults = await getRoundResults(i, STATE.matchups[i])
					await sleep(CONSTANTS.roundPause)
					roundNumber++
				}

			// declare overall winner(s)
				updateRoundTitle(null, determineWinner())
				ELEMENTS.arena.matchups.innerHTML = ""
				ELEMENTS.arena.results.innerHTML = ""
				const rankedIds = determineRankings()
				for (const i in rankedIds) {
					createResultsDisplay(rankedIds[i])
				}
				STATE.competing = false
				ELEMENTS.pause.removeAttribute("paused")
				ELEMENTS.arena.element.removeAttribute("paused")
		}

	/* getMatchups */
		function getMatchups() {
			const ids = Object.keys(STATE.competitors)
			const matchups = {}
			for (const i in ids) {
				matchups[ids[i]] = {}
				for (const j in ids) {
					if (i !== j) {
						matchups[ids[i]][ids[j]] = {}
					}
				}
			}
			return matchups
		}

	/* getRoundResults */
		async function getRoundResults(id, matchups) {
			// get this competitor
				const thisCompetitor = STATE.competitors[id]

			// scope out matches with all other competitors
				const matches = []
				for (const i in matchups) {
					const match = new Promise(async (resolve, reject) => {
						createMatchupDisplay(id, i)
						const matchResults = await getMatchResults(thisCompetitor, STATE.competitors[i])
						resolve(matchResults)
					})
					matches.push(match)
				}

			// when those are all done, return them
				return await Promise.all(matches)
		}

	/* getMatchResults */
		async function getMatchResults(competitorA, competitorB) {
			// loop through 100 rounds, every 50 ms
				const results = new Promise((resolve, reject) => {
					const bouts = []
					const matchInterval = setInterval(() => {
						if (STATE.paused) {
							return
						}
						if (bouts.length >= CONSTANTS.boutCount) {
							clearInterval(matchInterval)
							resolve({
								wins:   bouts.filter(x => x == 1).length,
								ties:   bouts.filter(x => x == 0).length,
								losses: bouts.filter(x => x == -1).length
							})
							return
						}
						const bout = getBout(competitorA, competitorB)
						updateMatchupBars(competitorA.id, competitorB.id, bout)
						bouts.push(bout)
					}, CONSTANTS.boutTime)
				})

			// update the overall score tracker
				const finalResults = await results
					competitorA.wins   += finalResults.wins
					competitorA.ties   += finalResults.ties
					competitorA.losses += finalResults.losses
					competitorB.wins   += finalResults.losses
					competitorB.ties   += finalResults.ties
					competitorB.losses += finalResults.wins

			// return the match score
				return Math.sign(finalResults.wins - finalResults.losses)
		}

	/* getBout */
		function getBout(competitorA, competitorB) {
			const throwA = getThrow(competitorA)
			const throwB = getThrow(competitorB)
			updateMatchupThrows(competitorA.id, competitorB.id, throwA, throwB)

			if ((throwA == "rock" && throwB == "scissors") ||
				(throwA == "paper" && throwB == "rock") ||
				(throwA == "scissors" && throwB == "paper")) {
				return 1
			}
			if (throwA == throwB) {
				return 0
			}
				return -1
		}

	/* getThrow */
		function getThrow(competitor) {
			const randomNumber = Math.floor(Math.random() * CONSTANTS.percent * CONSTANTS.resolution)
			
			if (randomNumber < competitor.rock) {
				return "rock"
			}
			if (randomNumber < competitor.rock + competitor.paper) {
				return "paper"
			}
				return "scissors"
		}

	/* determineWinner */
		function determineWinner() {
			let bestScore = 0
			let winners = []

			for (const i in STATE.competitors) {
				const competitor = STATE.competitors[i]
				const score = competitor.wins - competitor.losses

				if (score == bestScore) {
					winners.push(competitor.id)
				}
				else if (score > bestScore) {
					bestScore = score
					winners = [competitor.id]
				}
			}

			return winners
		}

	/* determineRankings */
		function determineRankings() {
			const ids = Object.keys(STATE.competitors)
			const rankedIds = ids.sort((a, b) => {
				const competitorA = STATE.competitors[a]
				const competitorB = STATE.competitors[b]
				return (competitorB.wins - competitorB.losses) - (competitorA.wins - competitorA.losses)
			})
			return rankedIds
		}

	/* togglePause */
		ELEMENTS.pause.addEventListener(TRIGGERS.click, togglePause)
		function togglePause() {
			if (!STATE.competing) {
				enactCompetition()
				return
			}
			STATE.paused = !STATE.paused
			ELEMENTS.pause.setAttribute("paused", STATE.paused)
			ELEMENTS.arena.element.setAttribute("paused", STATE.paused)
		}

/*** display ***/
	/* updateRoundTitle */
		function updateRoundTitle(n, competitorId) {
			if (n) {
				ELEMENTS.arena.title.innerText = `round ${n}: ${STATE.competitors[competitorId].name}`
				return
			}

			ELEMENTS.arena.title.innerText = `winner: ${competitorId.map(id => STATE.competitors[id].name).join(" & ")}`
		}

	/* createMatchupDisplay */
		function createMatchupDisplay(competitorIdA, competitorIdB) {
			const elements = {}
			STATE.matchups[competitorIdA][competitorIdB].elements = elements

			const matchupContainer = document.createElement("div")
				matchupContainer.className = "matchup"
				matchupContainer.id = `${competitorIdA}-${competitorIdB}`
			ELEMENTS.arena.matchups.appendChild(matchupContainer)
			elements.container = matchupContainer

				const competitorContainerA = document.createElement("div")
					competitorContainerA.className = "matchup-competitor"
				matchupContainer.appendChild(competitorContainerA)

					const competitorImageA = document.createElement("img")
						competitorImageA.className = "matchup-competitor-image"
						competitorImageA.src = STATE.competitors[competitorIdA].url || `data:image/svg+xml,${CONSTANTS.svg.unknown}`
						competitorImageA.title = STATE.competitors[competitorIdA].name
					competitorContainerA.appendChild(competitorImageA)

					const competitorThrowsA = document.createElement("div")
						competitorThrowsA.className = "matchup-competitor-throws"
						elements.competitorThrowsA = competitorThrowsA
					competitorContainerA.appendChild(competitorThrowsA)

						const competitorRockA = document.createElement("div")
							competitorRockA.className = "matchup-competitor-rock"
							competitorRockA.innerHTML = CONSTANTS.svg.rock
						competitorThrowsA.appendChild(competitorRockA)

						const competitorPaperA = document.createElement("div")
							competitorPaperA.className = "matchup-competitor-paper"
							competitorPaperA.innerHTML = CONSTANTS.svg.paper
						competitorThrowsA.appendChild(competitorPaperA)

						const competitorScissorsA = document.createElement("div")
							competitorScissorsA.className = "matchup-competitor-scissors"
							competitorScissorsA.innerHTML = CONSTANTS.svg.scissors
						competitorThrowsA.appendChild(competitorScissorsA)

				const tugOfWarContainer = document.createElement("div")
					tugOfWarContainer.className = "matchup-tugofwar"
				matchupContainer.appendChild(tugOfWarContainer)

					const winBar = document.createElement("div")
						winBar.className = "matchup-win-bar"
					elements.winBar = winBar
					tugOfWarContainer.appendChild(winBar)

					const tieBar = document.createElement("div")
						tieBar.className = "matchup-tie-bar"
					elements.tieBar = tieBar
					tugOfWarContainer.appendChild(tieBar)

					const loseBar = document.createElement("div")
						loseBar.className = "matchup-lose-bar"
					elements.loseBar = loseBar
					tugOfWarContainer.appendChild(loseBar)

				const competitorContainerB = document.createElement("div")
					competitorContainerB.className = "matchup-competitor"
				matchupContainer.appendChild(competitorContainerB)

					const competitorThrowsB = document.createElement("div")
						competitorThrowsB.className = "matchup-competitor-throws"
						elements.competitorThrowsB = competitorThrowsB
					competitorContainerB.appendChild(competitorThrowsB)

						const competitorRockB = document.createElement("div")
							competitorRockB.className = "matchup-competitor-rock"
							competitorRockB.innerHTML = CONSTANTS.svg.rock
						competitorThrowsB.appendChild(competitorRockB)

						const competitorPaperB = document.createElement("div")
							competitorPaperB.className = "matchup-competitor-paper"
							competitorPaperB.innerHTML = CONSTANTS.svg.paper
						competitorThrowsB.appendChild(competitorPaperB)

						const competitorScissorsB = document.createElement("div")
							competitorScissorsB.className = "matchup-competitor-scissors"
							competitorScissorsB.innerHTML = CONSTANTS.svg.scissors
						competitorThrowsB.appendChild(competitorScissorsB)

					const competitorImageB = document.createElement("img")
						competitorImageB.className = "matchup-competitor-image"
						competitorImageB.src = STATE.competitors[competitorIdB].url || `data:image/svg+xml,${CONSTANTS.svg.unknown}`
						competitorImageB.title = STATE.competitors[competitorIdB].name
					competitorContainerB.appendChild(competitorImageB)
		}

	/* updateMatchupThrows */
		function updateMatchupThrows(competitorIdA, competitorIdB, throwA, throwB) {
			STATE.matchups[competitorIdA][competitorIdB].elements.competitorThrowsA.setAttribute("throw", throwA)
			STATE.matchups[competitorIdA][competitorIdB].elements.competitorThrowsB.setAttribute("throw", throwB)
		}

	/* updateMatchupBars */
		function updateMatchupBars(competitorIdA, competitorIdB, bout) {
			const bar = (bout == 1) ? STATE.matchups[competitorIdA][competitorIdB].elements.winBar :
						(bout == 0) ? STATE.matchups[competitorIdA][competitorIdB].elements.tieBar :
									  STATE.matchups[competitorIdA][competitorIdB].elements.loseBar
			const barWidth = Number(bar.style.width.replace("%", ""))
			bar.style.width = `${barWidth + 1}%`
		}

	/* createResultsDisplay */
		function createResultsDisplay(competitorId) {
			const totalMatches = STATE.competitors[competitorId].wins + 
								 STATE.competitors[competitorId].ties +
								 STATE.competitors[competitorId].losses
			const winPercent  = getPercent(STATE.competitors[competitorId].wins,   totalMatches).toFixed(2) + "%"
			const tiePercent  = getPercent(STATE.competitors[competitorId].ties,   totalMatches).toFixed(2) + "%"
			const losePercent = getPercent(STATE.competitors[competitorId].losses, totalMatches).toFixed(2) + "%"

			const resultsContainer = document.createElement("div")
				resultsContainer.className = "results"
			ELEMENTS.arena.results.appendChild(resultsContainer)

				const resultsImage = document.createElement("img")
					resultsImage.className = "results-image"
					resultsImage.src = STATE.competitors[competitorId].url
				resultsContainer.appendChild(resultsImage)

				const resultsName = document.createElement("div")
					resultsName.className = "results-name"
					resultsName.innerText = STATE.competitors[competitorId].name
				resultsContainer.appendChild(resultsName)

				const resultsInfo = document.createElement("div")
					resultsInfo.className = "results-info"
				resultsContainer.appendChild(resultsInfo)

					const winBar = document.createElement("div")
						winBar.className = "results-win-bar"
						winBar.style.width = "0%"
						winBar.innerText = winPercent
					resultsInfo.appendChild(winBar)

					const tieBar = document.createElement("div")
						tieBar.className = "results-tie-bar"
						tieBar.style.width = "0%"
						tieBar.innerText = tiePercent
					resultsInfo.appendChild(tieBar)

					const loseBar = document.createElement("div")
						loseBar.className = "results-lose-bar"
						loseBar.style.width = "0%"
						loseBar.innerText = losePercent
					resultsInfo.appendChild(loseBar)

				setTimeout(() => {
					winBar.style.width  = winPercent
					tieBar.style.width  = tiePercent
					loseBar.style.width = losePercent
				}, 0)
		}
