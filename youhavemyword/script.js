/*** globals ***/
	/* triggers */
		const TRIGGERS = {
			click: "click",
			submit: "submit",
		}

		document.addEventListener("dblclick", event => {
			event.preventDefault()
		})

		document.addEventListener("contextmenu", event => {
			event.preventDefault()
		})

	/* elements */
		const ELEMENTS = {
			container: document.querySelector("#container"),
			menu: {
				join: document.querySelector("#menu-join"),
				scan: document.querySelector("#menu-scan"),
				players: document.querySelector("#menu-players"),
				create: document.querySelector("#menu-create"),
			},
			qrcodes: {
				player: document.querySelector("#qrcodes-player"),
				image: document.querySelector("#qrcodes-image"),
				previous: document.querySelector("#qrcodes-previous"),
				next: document.querySelector("#qrcodes-next"),
				ready: document.querySelector("#qrcodes-ready"),
				quit: document.querySelector("#qrcodes-quit"),
			},
			join: {
				scan: document.querySelector("#join-scan"),
				quit: document.querySelector("#join-quit"),
			},
			setup: {
				player: document.querySelector("#setup-player"),
				ready: document.querySelector("#setup-ready"),
				quit: document.querySelector("#setup-quit"),
			},
			team: {
				player: document.querySelector("#team-player"),
				icon: document.querySelector("#team-icon"),
				name: document.querySelector("#team-name"),
				goal: document.querySelector("#team-goal"),
				ready: document.querySelector("#team-ready"),
			},
			color: {
				result: document.querySelector("#color-result"),
				ready: document.querySelector("#color-ready"),
				timer: document.querySelector("#color-timer"),
			},
			round: {
				number: document.querySelector("#round-number"),
				words: document.querySelector("#round-words"),
				ready: document.querySelector("#round-ready"),
				timer: document.querySelector("#round-timer"),
			},
			guess: {
				form: document.querySelector("#guess-form"),
				input: document.querySelector("#guess-input"),
				submit: document.querySelector("#guess-submit"),
				timer: document.querySelector("#guess-timer"),
			}
		}

	/* constants */
		const CONSTANTS = {
			minute: 60, // s
			second: 1000, // ms
			tick: 100, // ms
			url: "https://jamesmayr.com/youhavemyword",
			check: `<svg viewBox="0 0 100 100"><path fill="#ffffff" d="M 40 60 C 47 53 63 37 72 28 C 74 26 77 26 79 28 C 81 30 81 33 79 35 C 70 44 54 60 44 70 C 42 72 38 72 36 70 C 26 60 24 58 21 55 C 19 53 19 50 21 48 C 23 46 26 46 28 48 C 31 51 33 53 40 60 Z"></path></svg>`,
			rounds: 5, // #
			sameCategoryChance: 0.333, // ratio
			wordsPerPlayer: 3, // #
			players: {
				_4:  {blue: 3,  red: 1, decoys: 5 },
				_5:  {blue: 4,  red: 1, decoys: 6 },
				_6:  {blue: 4,  red: 2, decoys: 7 },
				_7:  {blue: 5,  red: 2, decoys: 8 },
				_8:  {blue: 6,  red: 2, decoys: 9 },
				_9:  {blue: 6,  red: 3, decoys: 10},
				_10: {blue: 7,  red: 3, decoys: 11},
				_11: {blue: 8,  red: 3, decoys: 12},
				_12: {blue: 9,  red: 3, decoys: 13},
				_13: {blue: 9,  red: 4, decoys: 14},
				_14: {blue: 10, red: 4, decoys: 15},
				_15: {blue: 11, red: 4, decoys: 16},
				_16: {blue: 12, red: 4, decoys: 17},
			},
			teams: {
				blue: {
					name: "<span class='team-blue'>Secret Member of the Quorum of Blue</span>",
					goal: "Stand together with our fellow <span class='team-blue'>Blues</span> to determine the common code word.<br><br>But be vigilant: the <span class='team-red'>Reds</span> are listening in. They will stop at nothing to destroy us.",
					icon: `<svg viewBox="0 0 100 100"><path d="M 19 30 C 19 38 25 44 33 44 C 41 44 47 38 47 30 C 47 22 41 16 33 16 C 25 16 19 22 19 30 Z M 53 70 C 53 78 59 84 67 84 C 75 84 81 78 81 70 C 81 62 75 56 67 56 C 59 56 53 61 53 70 Z M 53 56 C 57 52 62 50 67 50 C 78 50 87 59 87 70 C 87 81 78 90 67 90 C 56 90 47 81 47 70 C 47 61 47 53 47 44 C 43 48 38 50 33 50 C 22 50 13 41 13 30 C 13 19 22 10 33 10 C 44 10 53 19 53 30 C 53 39 53 47 53 56 Z M 55 27 C 55 24.5 54 22.5 53.5 21 C 59 15 62 12 65 9 C 68 6 72 10 69 13 C 65 17 60 22 55 27 Z M 55 38 C 55 36 55 32 55 30 C 59 26 62 23 65 20 C 68 17 72 21 69 24 C 65 28 60 33 55 38 Z M 55 49 C 55 47 55 43 55 41 C 59 37 62 34 65 31 C 68 28 72 32 69 35 C 65 39 60 44 55 49 Z M 45 51 C 45 53 45 57 45 59 C 41 63 38 66 35 69 C 32 72 28 68 31 65 C 35 61 40 56 45 51 Z M 45 62 C 45 64 45 68 45 70 C 41 74 38 77 35 80 C 32 83 28 79 31 76 C 35 72 40 67 45 62 Z M 45 73 C 45 75.5 46 77.5 46.5 79 C 41 85 38 88 35 91 C 32 94 28 90 31 87 C 35 83 40 78 45 73 Z"></path></svg>`,
				},
				red: {
					name: "<span class='team-red'>Loyalist Soldier-spy for the Red Faction</span>",
					goal: "Align with the <span class='team-red'>Reds</span>.<br>Infiltrate the <span class='team-blue'>Blues</span>.<br>Find their code word.<br><br>Sow division and distrust to disrupt their secret activities.",
					icon: `<svg viewBox="0 0 100 100"><path d="M 80 20 C 70 20 60 20 55 20 C 55 30 55 40 55 45 C 60 45 70 45 80 45 C 80 40 80 30 80 20 Z M 55 62 C 55 70 55 80 55 88 C 55 89 54 90 53 90 C 51 90 49 90 47 90 C 46 90 45 89 45 88 C 45 80 45 70 45 55 C 30 55 20 55 12 55 C 11 55 10 54 10 53 C 10 51 10 49 10 47 C 10 46 11 45 12 45 C 20 45 30 45 38 45 C 33 40 20 27 13 20 C 11 20 10 19 10 18 C 10 16 10 14 10 12 C 10 11 11 10 12 10 C 35 10 59 10 82 10 C 84 10 86 10 88 10 C 89 10 90 11 90 12 C 90 14 90 16 90 18 C 90 27 90 37 90 47 C 90 49 90 51 90 53 C 90 54 89 55 88 55 C 80 55 71 55 62 55 C 70 63 80 73 90 83 C 91 84 91 85 90 86 C 89 87 87 89 86 90 C 85 91 84 91 83 90 C 73 80 63 70 55 62 Z M 45 38 C 45 32 45 26 45 20 C 39 20 33 20 27 20 C 30 23 40 33 45 38 Z"></path></svg>`,
				}
			},
			timers: {
				color: 1000 * 3, // ms
				round: 1000 * 60 * 5, // ms
				guess: 1000 * 30, // ms
			},
			qrCodeGenerator: {
				settings: {
					width: Math.min(window.innerWidth, window.innerHeight, 600) - 100, // px with gap
					height: Math.min(window.innerWidth, window.innerHeight, 600) - 100, // px with gap
					colorDark: "black",
					colorLight: "white",
					correctLevel: QRCode.CorrectLevel.M
				}
			},
			qrCodeReader: {
				states : {
					UNKNOWN: 0,
					NOT_STARTED: 1,
					SCANNING: 2,
					PAUSED: 3
				},
				camera: {facingMode: "environment"}, // back camera / webcam
				framesPerSecond: {fps: 10}, // frames / s
				taskTime: 100 // ms
			},
			dictionary: [
				["apple", "banana", "blueberry", "cantaloupe", "cherry", "cranberry", "grape", "kiwi", "lemon", "lime", "mango", "orange", "papaya", "peach", "pear", "pineapple", "plum", "raspberry", "strawberry", "watermelon"], // fruit
				["asparagus", "broccoli", "cabbage", "carrot", "cauliflower", "celery", "corn", "cucumber", "eggplant", "garlic", "lettuce", "mushroom", "onion", "peas", "potato", "pumpkin", "radish", "spinach", "tomato", "yam"], // vegetables
				["camel", "canary", "cat", "chicken", "cow", "dog", "donkey", "ferret", "goat", "goldfish", "horse", "lizard", "llama", "mouse", "parrot", "pig", "pigeon", "rabbit", "sheep", "snake"], // domesticated animals
				["alligator", "bat", "bear", "buffalo", "deer", "elephant", "frog", "giraffe", "gorilla", "kangaroo", "koala", "lion", "monkey", "otter", "panda", "porcupine", "rat", "tiger", "wolf", "zebra"], // wild land animals
				["blue jay", "cardinal", "crow", "dove", "eagle", "flamingo", "hawk", "hummingbird", "ostrich", "owl", "peacock", "pelican", "penguin", "puffin", "robin", "seagull", "swan", "turkey", "vulture", "woodpecker"], // birds
				["ant", "bee", "butterfly", "caterpillar", "centipede", "dragonfly", "firefly", "flea", "fly", "grasshopper", "ladybug", "leech", "mosquito", "moth", "scorpion", "snail", "spider", "tick", "wasp", "worm"], // bugs
				["coral", "crab", "dolphin", "eel", "jellyfish", "lobster", "octopus", "oyster", "stingray", "salmon", "seahorse", "shark", "shrimp", "sponge", "starfish", "swordfish", "tuna", "turtle", "walrus", "whale"], // aquatic animals
				["amber", "chalk", "coal", "copper", "diamond", "emerald", "limestone", "gold", "granite", "iron", "lead", "marble", "obsidian", "opal", "pearl", "quartz", "ruby", "sandstone", "sapphire", "silver"], // minerals
				["asteroid", "black hole", "comet", "earth", "galaxy", "jupiter", "mars", "mercury", "moon", "neptune", "pluto", "rocket", "satellite", "saturn", "space", "star", "sun", "supernova", "uranus", "venus"], // space
				["australia", "brazil", "canada", "chile", "china", "colombia", "cuba", "egypt", "france", "germany", "greece", "india", "ireland", "japan", "korea", "madagascar", "mexico", "nigeria", "russia", "spain"], // countries
				["bamboo", "bush", "cactus", "clover", "daisy", "dandelion", "fern", "grass", "ivy", "lily", "maple", "moss", "oak", "palm", "pine", "rose", "seaweed", "sunflower", "tulip", "willow"], // plants
				["bicycle", "blimp", "bus", "ferry", "helicopter", "kayak", "motorcycle", "plane", "racecar", "rowboat", "sailboat", "sled", "submarine", "subway", "tank", "taxi", "train", "truck", "van", "wagon"], // transportation
				["accordion", "banjo", "bass", "bassoon", "bell", "cello", "clarinet", "drum", "flute", "guitar", "harmonica", "harp", "saxophone", "organ", "piano", "trombone", "trumpet", "ukulele", "violin", "xylophone"], // instruments
				["ankle", "arm", "brain", "ear", "elbow", "eye", "finger", "foot", "hair", "hand", "head", "heart", "knee", "leg", "lung", "mouth", "neck", "nose", "spine", "stomach"], // body parts
				["apron", "belt", "bracelet", "boot", "coat", "dress", "earring", "glasses", "glove", "hat", "kilt", "necklace", "pants", "ring", "scarf", "shirt", "shoe", "sock", "sweater", "tie"], // clothing
				["bed", "chair", "chest", "couch", "desk", "dishwasher", "fan", "freezer", "futon", "lamp", "microwave", "oven", "shelf", "stool", "stove", "table", "television", "wardrobe", "washing machine", "vacuum"], // appliances & furniture
				["beach", "city", "cave", "desert", "farm", "forest", "field", "garden", "glacier", "hill", "jungle", "lake", "mountain", "ocean", "river", "savanna", "swamp", "tundra", "volcano", "waterfall"], // biomes
				["arrow", "axe", "bomb", "bow", "catapult", "cannon", "club", "flamethrower", "hammer", "grenade", "gun", "knife", "lance", "laser", "mine", "missile", "spear", "sword", "torpedo", "whip"], // weapons
				["airport", "apartment", "barn", "bank", "castle", "factory", "hospital", "hotel", "house", "library", "mall", "mansion", "office", "restaurant", "school", "skyscraper", "station", "temple", "theater", "warehouse"], // buildings
				["blizzard", "cloud", "drought", "fog", "flood", "hail", "humidity", "hurricane", "ice", "lightning", "rain", "rainbow", "sandstorm", "smog", "snow", "temperature", "thunder", "tornado", "tsunami", "wind"], // weather
			]
		}

	/* state */
		const STATE = {
			players: [], // creator only
			mode: "menu",
			queryString: "",
			player: 0,
			team: "",
			codewords: [],
			rounds: [],
			round: -1,
			roundStart: null,
			interval: null
		}

/*** helpers ***/
	/* chooseRandom */
		function chooseRandom(list) {
			if (Array.isArray(list) || typeof list == "string") {
				return list[Math.floor(Math.random() * list.length)]
			}
			if (typeof list == "object") {
				return chooseRandom(Object.keys(list))
			}
			return list
		}

	/* rangeRandom */
		function rangeRandom(a, b) {
			return Math.floor(Math.random() * (b - a)) + a
		}

	/* sortRandom */
		function sortRandom(list) {
			const copy = []
			for (let l in list) {
				copy[l] = list[l]
			}

			let x = copy.length
			while (x > 0) {
				let y = Math.floor(Math.random() * x)
				x--
				let temp = copy[x]
				copy[x] = copy[y]
				copy[y] = temp
			}

			return copy
		}

	/* setMode */
		function setMode(mode) {
			STATE.mode = mode
			ELEMENTS.container.setAttribute("mode", mode)
		}

/*** create ***/
	/* createGame */
		ELEMENTS.menu.create.addEventListener(TRIGGERS.click, createGame)
		function createGame() {		
			const playerCount = Number(ELEMENTS.menu.players.value)
			const players     = new Array(playerCount)
				assignPlayerTeams(players)
			
			const codewords   = getCodewords()
			const decoys      = getDecoys(playerCount, codewords)
				assignPlayerWords(players, codewords, decoys)
				assignPlayerURLs(players, codewords)

			STATE.players = players

			loadGame(STATE.players[0].url)
			setMode("qrcodes")
			loadQRcode(1)
		}

	/* assignPlayerTeams */
		function assignPlayerTeams(players) {
			const redCount = CONSTANTS.players[`_${players.length}`].red
			const allTeams = new Array(players.length).fill("blue").fill("red", 0, redCount)
			const shuffledTeams = sortRandom(allTeams)
			
			for (let p = 0; p < players.length; p++) {
				players[p] = {
					number: p + 1,
					team: shuffledTeams[p]
				}
			}
		}

	/* getCodewords */
		function getCodewords() {
			const codewords = []

			for (let round = 0; round < CONSTANTS.rounds; round++) {
				const thisCodeword = {}

				do {
					thisCodeword.category = rangeRandom(0, CONSTANTS.dictionary.length)
					thisCodeword.index = rangeRandom(0, CONSTANTS.dictionary[thisCodeword.category].length)
					thisCodeword.word = CONSTANTS.dictionary[thisCodeword.category][thisCodeword.index]
				} while (codewords.map(item => item.word).includes(thisCodeword.word))
				
				codewords.push(thisCodeword)
			}

			return codewords
		}

	/* getDecoys */
		function getDecoys(playerCount, codewords) {
			const decoys = []
			const decoyCount = CONSTANTS.players[`_${playerCount}`].decoys
			
			for (let round = 0; round < CONSTANTS.rounds; round++) {
				const thisCodeword = codewords[round]
				
				const theseDecoys = []
				while (theseDecoys.length < decoyCount) {
					const thisDecoy = {
						bluePlayers: 0
					}
					
					if (Math.random() < CONSTANTS.sameCategoryChance) {
						do {
							thisDecoy.category = thisCodeword.category
							thisDecoy.index = rangeRandom(0, CONSTANTS.dictionary[thisDecoy.category].length)
							thisDecoy.word = CONSTANTS.dictionary[thisDecoy.category][thisDecoy.index]
						} while (thisCodeword.word == thisDecoy.word || theseDecoys.map(item => item.word).includes(thisDecoy.word))
					}
					else {
						do {
							thisDecoy.category = rangeRandom(0, CONSTANTS.dictionary.length)
							thisDecoy.index = rangeRandom(0, CONSTANTS.dictionary[thisDecoy.category].length)
							thisDecoy.word = CONSTANTS.dictionary[thisDecoy.category][thisDecoy.index]
						} while (thisCodeword.category == thisDecoy.category || theseDecoys.map(item => item.word).includes(thisDecoy.word))
					}

					theseDecoys.push(thisDecoy)
				}

				decoys.push(theseDecoys)
			}

			return decoys
		}

	/* assignPlayerWords */
		function assignPlayerWords(players, codewords, decoys) {
			const blueCount = CONSTANTS.players[`_${players.length}`].blue

			for (let p in players) {
				const player = players[p]
					player.rounds = []

				for (let round = 0; round < CONSTANTS.rounds; round++) {
					const roundWords = []

					if (player.team == "blue") {
						roundWords.push(codewords[round])
					}
					while (roundWords.length < CONSTANTS.wordsPerPlayer) {
						const thisDecoy = {}
						do {
							const randomDecoy = chooseRandom(decoys[round])
							thisDecoy.category = randomDecoy.category
							thisDecoy.index = randomDecoy.index
							thisDecoy.word = randomDecoy.word
						} while (roundWords.map(item => item.word).includes(thisDecoy.word))
						roundWords.push(thisDecoy)
					}

					// it's technically possible for all blue players to end up with a same decoy // ???
					player.rounds.push(sortRandom(roundWords))
				}
			}
		}

	/* assignPlayerURLs */
		function assignPlayerURLs(players, codewords) {
			const codewordsList = []
			for (const c in codewords) {
				codewordsList.push(`${codewords[c].category}-${codewords[c].index}`)
			}
			const codewordsString = "&c=" + codewordsList.join("_")

			for (let p = 0; p < players.length; p++) {
				const player = players[p]
				const numberString = "?a=" + player.number
				const teamString = "&b=" + (player.team == "blue" ? 0 : 1)
				
				const wordsList = []
				for (let round = 0; round < CONSTANTS.rounds; round++) {
					const roundWordsList = []
					for (const w in player.rounds[round]) {
						const thisWord = player.rounds[round][w]
						roundWordsList.push(`${("0" + thisWord.category).slice(-2)}-${("0" + thisWord.index).slice(-2)}`)
					}
					const roundWordsString = roundWordsList.join("_")
					wordsList.push(roundWordsString)
				}
				const wordsString = "&d=" + wordsList.join("__")

				player.url = CONSTANTS.url + numberString + teamString + codewordsString + wordsString
			}
		}

/*** join ***/
	/* joinGame */
		ELEMENTS.menu.join.addEventListener(TRIGGERS.click, joinGame)
		function joinGame() {
			setMode("join")
			startQRcodeDetector()
		}

	/* quitJoin */
		ELEMENTS.join.quit.addEventListener(TRIGGERS.click, quitJoin)
		function quitJoin() {
			if (STATE.qrCodeReader?.getState() == CONSTANTS.qrCodeReader.states.SCANNING) {
				STATE.qrCodeReader.stop()
			}

			setMode("menu")
		}

	/* startQRcodeDetector */
		function startQRcodeDetector() {
			try {
				if (!STATE.qrCodeReader) {
					STATE.qrCodeReader = new Html5Qrcode(ELEMENTS.join.scan.id)
				}

				const qrCodeReaderState = STATE.qrCodeReader.getState()
				if (qrCodeReaderState == CONSTANTS.qrCodeReader.states.SCANNING) {
					return
				}

				if (qrCodeReaderState == CONSTANTS.qrCodeReader.states.PAUSED) {
					STATE.qrCodeReader.resume()
					return
				}

				STATE.qrCodeReader.start(CONSTANTS.qrCodeReader.camera, CONSTANTS.qrCodeReader.framesPerSecond, detectQRcode)
								  .then(handleQRcodeElements)
								  .catch(console.log)
			} catch (error) {console.log(error)}
		}

	/* handleQRcodeElements */
		function handleQRcodeElements() {
			try {
				const tasks = {
					removePausedIndicator: true,
					attachVideoElement: true
				}

				const taskInterval = setInterval(() => {
					if (tasks.removePausedIndicator && STATE.qrCodeReader.scannerPausedUiElement) {
						STATE.qrCodeReader.scannerPausedUiElement.remove()
						delete tasks.removePausedIndicator
					}

					if (tasks.attachVideoElement && STATE.qrCodeReader.element.querySelector("video")) {
						STATE.qrCodeReader.videoElement = STATE.qrCodeReader.element.querySelector("video")
						delete tasks.attachVideoElement
					}

					if (!Object.keys(tasks).length) {
						clearInterval(taskInterval)
					}
				}, CONSTANTS.qrCodeReader.taskTime)
			} catch (error) {console.log(error)}
		}

	/* detectQRcode */
		function detectQRcode(text, result) {
			try {
				const url = new URL(text)
				if (!url || !url.search) {
					return
				}

				if (STATE.qrCodeReader?.getState() == CONSTANTS.qrCodeReader.states.SCANNING) {
					STATE.qrCodeReader.stop()
				}
				loadGame(text)
			} catch (error) {console.log(error)}
		}

/*** load ***/
	/* loadGame */
		function loadGame(text, round) {
			const url = new URL(text)
			if (!url || !url.search) {
				return
			}
			STATE.queryString = url.search.slice(1)

			const segments = STATE.queryString.trim().toLowerCase().split("&")
			const parameters = {}
			for (const s in segments) {
				const pair = segments[s].split("=")
				parameters[pair[0]] = pair[1]
			}

			if (parameters.a == undefined || parameters.b == undefined || parameters.c == undefined || parameters.d == undefined) {
				return
			}

			STATE.player = Number(parameters.a)
			ELEMENTS.setup.player.innerText = STATE.player
			ELEMENTS.team.player.innerText = STATE.player

			STATE.team = (Number(parameters.b) ? "red" : "blue")
			ELEMENTS.team.icon.innerHTML = CONSTANTS.teams[STATE.team].icon
			ELEMENTS.team.icon.setAttribute("team", STATE.team)
			ELEMENTS.team.name.innerHTML = CONSTANTS.teams[STATE.team].name
			ELEMENTS.team.goal.innerHTML = CONSTANTS.teams[STATE.team].goal

			const codewordNumbers = parameters.c.split("_")
			STATE.codewords = []
			for (const c in codewordNumbers) {
				const wordPair = codewordNumbers[c].split("-")
				const category = Number(wordPair[0])
				const index = Number(wordPair[1])
				STATE.codewords.push(CONSTANTS.dictionary[category][index])
			}
			
			const playerWordNumbers = parameters.d.split("__")
			STATE.rounds = []
			for (let round = 0; round < playerWordNumbers.length; round++) {
				STATE.rounds[round] = []
				const roundWordNumbers = playerWordNumbers[round].split("_")
				for (const w in roundWordNumbers) {
					const wordPair = roundWordNumbers[w].split("-")
					const category = Number(wordPair[0])
					const index = Number(wordPair[1])
					STATE.rounds[round].push(CONSTANTS.dictionary[category][index])
				}
			}

			STATE.round = (round !== undefined) ? round : -1
			STATE.roundStart = null
			STATE.interval = null
			ELEMENTS.color.result.removeAttribute("team")
			ELEMENTS.color.result.innerHTML = CONSTANTS.check

			updateLocal()
			setMode("setup")
		}

	/* updateLocal */
		function updateLocal() {
			window.localStorage.youhavemyword = JSON.stringify({
				url: `${CONSTANTS.url}?${STATE.queryString}`,
				round: STATE.round
			})
		}

	/* loadFromLocal */
		loadFromLocal()
		function loadFromLocal() {
			try {
				if (window.location.search) {
					loadGame(String(window.location))
					return
				}

				if (window.localStorage.youhavemyword) {
					const data = JSON.parse(window.localStorage.youhavemyword)
					loadGame(data.url, Number(data.round))
				}
			} catch (error) {console.log(error)}
		}

/*** qrcodes ***/
	/* loadQRcode */
		function loadQRcode(index) {
			STATE.qrCodeIndex = index || 0
			ELEMENTS.qrcodes.player.innerText = Number(STATE.qrCodeIndex + 1)
			const text = STATE.players[STATE.qrCodeIndex].url
			
			ELEMENTS.qrcodes.image.innerHTML = ""
			STATE.qrCodeViewer = new QRCode(ELEMENTS.qrcodes.image, {
				text,
				...CONSTANTS.qrCodeGenerator.settings
			})
		}

	/* previousQRcode */
		ELEMENTS.qrcodes.previous.addEventListener(TRIGGERS.click, previousQRcode)
		function previousQRcode() {
			let qrCodeIndex = STATE.qrCodeIndex - 1
			if (qrCodeIndex < 0) {
				qrCodeIndex = STATE.players.length - 1
			}
			loadQRcode(qrCodeIndex)
		}

	/* nextQRcode */
		ELEMENTS.qrcodes.next.addEventListener(TRIGGERS.click, nextQRcode)
		function nextQRcode() {
			let qrCodeIndex = STATE.qrCodeIndex + 1
			if (qrCodeIndex >= STATE.players.length) {
				qrCodeIndex = 0
			}
			loadQRcode(qrCodeIndex)
		}

	/* readyQRcode */
		ELEMENTS.qrcodes.ready.addEventListener(TRIGGERS.click, readyQRcode)
		function readyQRcode() {
			setMode("setup")
		}

	/* quitQRcode */
		ELEMENTS.qrcodes.quit.addEventListener(TRIGGERS.click, quitQRcode)
		function quitQRcode() {
			window.localStorage.youhavemyword = ""
			delete window.localStorage.youhavemyword
			setMode("menu")
		}

/*** setup ***/
	/* readySetup */
		ELEMENTS.setup.ready.addEventListener(TRIGGERS.click, readySetup)
		function readySetup() {
			setMode("team")
		}

	/* quitSetup */
		ELEMENTS.setup.quit.addEventListener(TRIGGERS.click, quitSetup)
		function quitSetup() {
			window.localStorage.youhavemyword = ""
			delete window.localStorage.youhavemyword
			setMode("menu")
		}

/*** team ***/
	/* readyTeam */
		ELEMENTS.team.ready.addEventListener(TRIGGERS.click, readyTeam)
		function readyTeam() {
			if (STATE.round < CONSTANTS.rounds - 1) {
				setMode("color")
				return
			}
			
			setMode("menu")
		}

/*** color ***/
	/* readyColor */
		ELEMENTS.color.ready.addEventListener(TRIGGERS.click, readyColor)
		function readyColor() {
			updateLocal()
			STATE.round += 1
			
			if (STATE.round < CONSTANTS.rounds) {
				ELEMENTS.color.timer.innerText = (CONSTANTS.timers.color / CONSTANTS.second)
				
				STATE.roundStart = new Date().getTime() + CONSTANTS.timers.color
				ELEMENTS.round.number.innerText = (STATE.round + 1)
				ELEMENTS.round.words.innerHTML = sortRandom(STATE.rounds[STATE.round]).join("<br>")

				clearInterval(STATE.interval)
				STATE.interval = setInterval(tickRound, CONSTANTS.tick)
				return
			}

			window.localStorage.youhavemyword = ""
			delete window.localStorage.youhavemyword
			setMode("team")
		}

/*** round ***/
	/* tickRound */
		function tickRound() {
			const timeNow = new Date().getTime()

			if (timeNow < STATE.roundStart) {
				setMode("color")
			}
			else if (timeNow < STATE.roundStart + CONSTANTS.timers.round) {
				if (STATE.mode !== "guess") { setMode("round") }
			}
			else if (timeNow < STATE.roundStart + CONSTANTS.timers.round + CONSTANTS.timers.guess) {
				setMode("guess")
				ELEMENTS.guess.input.focus()
			}

			if (STATE.mode == "color") {
				const secondsLeft = Math.ceil((STATE.roundStart - timeNow) / CONSTANTS.second)
				ELEMENTS.color.timer.innerText = secondsLeft
				return
			}

			if (STATE.mode == "round") {
				const secondsLeft = Math.ceil((STATE.roundStart + CONSTANTS.timers.round - timeNow) / CONSTANTS.second)
				const minutesLeft = `${Math.floor(secondsLeft / CONSTANTS.minute) || "0"}:${("00" + Math.floor(secondsLeft % CONSTANTS.minute)).slice(-2)}`
				ELEMENTS.round.timer.innerText = minutesLeft
				return
			}

			if (STATE.mode == "guess") {
				const secondsLeft = Math.ceil((STATE.roundStart + CONSTANTS.timers.round + CONSTANTS.timers.guess - timeNow) / CONSTANTS.second)
				const minutesLeft = `${Math.floor(secondsLeft / CONSTANTS.minute) || "0"}:${("00" + Math.floor(secondsLeft % CONSTANTS.minute)).slice(-2)}`
				ELEMENTS.guess.timer.innerText = minutesLeft
				return
			}

			submitGuess()
		}

	/* readyRound */
		ELEMENTS.round.ready.addEventListener(TRIGGERS.click, readyRound)
		function readyRound() {
			setMode("guess")
			ELEMENTS.guess.input.focus()
		}

/*** guess ***/
	/* submitGuess */
		ELEMENTS.guess.form.addEventListener(TRIGGERS.submit, submitGuess)
		ELEMENTS.guess.submit.addEventListener(TRIGGERS.click, submitGuess)
		function submitGuess(event) {
			event.preventDefault()
			clearInterval(STATE.interval)

			const guess = ELEMENTS.guess.input.value.toLowerCase().replace(/\s/g, "")
			const correct = (guess == STATE.codewords[STATE.round].toLowerCase().replace(/\s/g, ""))

			if (correct && STATE.team == "blue" || !correct && STATE.team == "red") {
				ELEMENTS.color.result.setAttribute("team", "blue")
				ELEMENTS.color.result.innerHTML = CONSTANTS.teams.blue.icon
			}
			else {
				ELEMENTS.color.result.setAttribute("team", "red")
				ELEMENTS.color.result.innerHTML = CONSTANTS.teams.red.icon
			}

			ELEMENTS.color.timer.innerText = ""
			ELEMENTS.round.timer.innerText = ""
			ELEMENTS.round.words.innerHTML = ""
			ELEMENTS.guess.timer.innerText = ""
			ELEMENTS.guess.input.value = ""
			setMode("color")
		}
