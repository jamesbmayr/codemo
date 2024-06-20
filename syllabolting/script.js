/*** globals ***/
	/* triggers */
		const TRIGGERS = {
			click: "click",
			submit: "submit",
			input: "input"
		}

	/* elements */
		const ELEMENTS = {
			reset: document.querySelector("#reset"),
			score: {
				element: document.querySelector("#score"),
				count: document.querySelector("#score-count"),
				status: document.querySelector("#score-status")
			},
			words: {
				element: document.querySelector("#words"),
				start: {
					element: document.querySelector("#words-start"),
					graphemes: document.querySelector("#words-start-graphemes"),
					phonemes: document.querySelector("#words-start-phonemes"),
				},
				chain: document.querySelector("#words-chain"),
				form: {
					element: document.querySelector("#words-form"),
					input: document.querySelector("#words-form-input"),
					submit: document.querySelector("#words-form-submit"),
					error: document.querySelector("#words-form-error"),
					request: document.querySelector("#words-form-request")
				},
				end: {
					element: document.querySelector("#words-end"),
					graphemes: document.querySelector("#words-end-graphemes"),
					phonemes: document.querySelector("#words-end-phonemes"),
				},
			},
			history: {
				element: document.querySelector("#history"),
				list: document.querySelector("#history-list")
			}
		}

	/* constants */
		const CONSTANTS = {
			requestURL: "https://script.google.com/macros/s/AKfycbz_NOnYfPYHShI5HUAFSwMdYqEPaVKY3jvInImJ2pj2lWaBNcVJnYdQECjHpCv_PL4PTQ/exec?project=syllabolting",
			checkWait: 1000, // ms
			svg: {
				x: `<svg viewBox="10 10 80 80"><path d="M 50 43 C 55 38 60 33 64 29 C 66 27 69 27 71 29 C 73 31 73 34 71 36 C 67 40 62 45 57 50 C 62 55 67 60 71 64 C 73 66 73 69 71 71 C 69 73 66 73 64 71 C 60 67 55 62 50 57 C 45 62 40 67 36 71 C 34 73 31 73 29 71 C 27 69 27 66 29 64 C 33 60 38 55 43 50 C 38 45 33 40 29 36 C 27 34 27 31 29 29 C 31 27 34 27 36 29 C 40 33 45 38 50 43 Z"></path></svg>`
			},
			diphthongs: {
				"ɑʊ": "ä",
				"ɑɪ": "â",
				"eɪ": "ê",
				"oʊ": "ö",
				"ɔɪ": "ô"
			},
			vowels: ["ɑ", "æ", "ʌ", "ɔ", "ä" /*ɑʊ*/, "â" /*ɑɪ*/, "ɛ", "ê" /*eɪ*/, "ɪ", "i", "ö" /*oʊ*/, "ô" /*ɔɪ*/, "ʊ", "u"],
			similarSounds: {
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
				"u": ["ä", "ö", "ʊ"],
				"b": ["p"],
				"ʧ": ["ʤ", "ʃ", "ʒ", "tʃ"],
				"d": ["t"],
				"ð": ["f", "v", "θ"],
				"f": ["v", "θ", "ð"],
				"g": ["k"],
				"h": [""],
				"ʤ": ["ʧ", "ʃ", "ʒ", "dʒ"],
				"k": ["g"],
				"l": [],
				"m": ["n", "ŋ"],
				"n": ["m", "ŋ"],
				"ŋ": ["m", "n"],
				"p": ["b"],
				"ɹ": [],
				"s": ["z", "ʃ"],
				"ʃ": ["ʤ", "ʧ", "ʒ"],
				"t": ["d"],
				"θ": ["f", "v", "ð"],
				"v": ["f", "θ", "ð"],
				"w": [],
				"j": [],
				"z": ["s", "ʒ"],
				"ʒ": ["ʧ", "ʃ", "ʤ"],
			},
			dictionary: window.DICTIONARY
		}

	/* state */
		const STATE = {
			start: {
				graphemes: "",
				phonemes: ""
			},
			end: {
				graphemes: "",
				phonemes: ""
			},
			chain: [],
			score: {
				count: 0,
				complete: false
			},
			history: []
		}

/*** start ***/
	/* loadGame */
		loadGame(window.location.search, true)
		function loadGame(searchString, loadHistory) {
			try {
				// reset state
					STATE.start.graphemes = STATE.start.phonemes = ""
					STATE.end.graphemes = STATE.end.phonemes = ""
					STATE.chain = []
					STATE.score.count = 0
					STATE.score.complete = false

				// clear existing words
					displayEmptyState()

				// get parameters
					const parameters = getParameters(searchString) || {}
					if (parameters.start) {
						STATE.start = parameters.start
					}
					if (parameters.end) {
						STATE.end = parameters.end
					}

				// get random words
					while (!STATE.start.phonemes) {
						STATE.start = getRandomWord()
					}

					while (!STATE.end.phonemes || STATE.end.phonemes == STATE.start.phonemes || hasSyllableOverlap(STATE.start, STATE.end)) {
						STATE.end = getRandomWord()
					}

				// start chain
					STATE.chain.push({
						graphemes: STATE.start.graphemes,
						phonemes: STATE.start.phonemes
					})

				// chain?
					if (parameters.chain) {
						// loop through
							for (const c in parameters.chain) {
								STATE.chain.push(parameters.chain[c])
								displayWord(STATE.chain[STATE.chain.length - 1])
								STATE.score.count++
							}

						// complete?
							if (STATE.chain[STATE.chain.length - 1].graphemes == STATE.end.graphemes) {
								STATE.score.complete = true
							}
					}

				// display
					displayStartAndEnd()
					displayScore()
					displayURL()

				// history
					if (loadHistory) {
						try {
							STATE.history = JSON.parse(localStorage.syllabolting)
						} catch (error) {
							STATE.history = []
						}

						displayHistory()
					}					
			} catch (error) {console.log(error)}
		}

	/* getParameters */
		function getParameters(searchString) {
			try {
				// no string
					searchString = searchString?.replace("?", "") ?? ""
					if (!searchString.length) {
						return {}
					}			

				// get query parameters
					const searchPairs = searchString.split("&").map(pair => pair.split("=")) || []

				// parameters
					const parameters = {}
					for (const p in searchPairs) {
						parameters[searchPairs[p][0].trim().toLowerCase()] = decodeURIComponent(searchPairs[p][1].trim().toLowerCase())
					}

				// start & end
					if (parameters.start) {
						const startPair = parameters.start.split("_")
						parameters.start = {
							graphemes: startPair[0].replace(/[^a-z]/g, ""),
							phonemes: startPair[1]
						}
					}
					if (parameters.end) {
						const endPair = parameters.end.split("_")
						parameters.end = {
							graphemes: endPair[0].replace(/[^a-z]/g, ""),
							phonemes: endPair[1]
						}
					}

				// chain
					if (parameters.chain) {
						const words = parameters.chain.split(",")
						parameters.chain = []
						
						for (let w = 0; w < words.length; w++) {
							const wordPair = words[w].split("_")
							parameters.chain.push({
								graphemes: wordPair[0].replace(/[^a-z]/g, ""),
								phonemes: wordPair[1]
							})
						}
					}

				// return
					return parameters
			} catch (error) {console.log(error)}
		}

/*** interaction ***/
	/* resetGame */
		ELEMENTS.reset.addEventListener(TRIGGERS.click, resetGame)
		function resetGame(event) {
			try {
				// load empty game
					loadGame()
			} catch (error) {console.log(error)}
		}

	/* submitWord */
		ELEMENTS.words.form.element.addEventListener(TRIGGERS.submit, submitWord)
		function submitWord(event) {
			try {
				// complete?
					if (STATE.score.complete) {
						return false
					}

				// clear error
					ELEMENTS.words.form.error.innerHTML = ""
					ELEMENTS.words.form.error.scrollIntoView()

				// get graphemes
					const graphemes = ELEMENTS.words.form.input.value.trim().toLowerCase().replace(/[^a-z]/g, "")
					if (!graphemes || !graphemes.length) {
						return false
					}

				// duplicate
					for (const c in STATE.chain) {
						if (STATE.chain[c].graphemes == graphemes) {
							ELEMENTS.words.form.error.innerText = "duplicate word"
							return false
						}
					}

				// word not in dictionary
					let wordOptions = findWordOptions(graphemes)
					if (!wordOptions || !wordOptions.length) {
						ELEMENTS.words.form.error.innerText = "unknown word"
						return false
					}

				// entire word overlap
					wordOptions = wordOptions.filter(wordOption => (
						!STATE.chain[STATE.chain.length - 1].phonemes.includes(wordOption.phonemes) &&
						!wordOption.phonemes.includes(STATE.chain[STATE.chain.length - 1].phonemes)
					)) || []
					if (!wordOptions.length) {
						ELEMENTS.words.form.error.innerText = "entire word overlaps"
						return false
					}

				// insufficient overlap
					wordOptions = wordOptions.filter(wordOption => hasSyllableOverlap(STATE.chain[STATE.chain.length - 1], wordOption)) || []
					if (!wordOptions.length) {
						ELEMENTS.words.form.error.innerText = "no overlapping syllable"
						return false
					}

				// good match
					ELEMENTS.words.form.error.innerText = ""
					ELEMENTS.words.form.input.value = ""
					ELEMENTS.words.form.input.focus()
					STATE.chain.push(wordOptions[0])
					displayWord(STATE.chain[STATE.chain.length - 1])

				// update URL
					displayURL()

				// score --> end?
					STATE.score.count++
					if (STATE.chain[STATE.chain.length - 1].phonemes == STATE.end.phonemes) {
						STATE.score.complete = true
						addToHistory(window.location.search)
					}					
					displayScore()
			} catch (error) {console.log(error)}
		}

	/* removeWord */
		function removeWord(event) {
			try {
				// get parent word
					const wordElement = event.target.closest(".word")
					const allWords = Array.from(ELEMENTS.words.chain.querySelectorAll(".word"))
					const wordIndex = allWords.indexOf(wordElement)

				// remove from state
					STATE.chain = STATE.chain.slice(0, wordIndex + 1) || []

				// remove from display
					for (let i = wordIndex; i < allWords.length; i++) {
						allWords[i].remove()
					}
					ELEMENTS.words.form.input.focus()

				// update score
					STATE.score.count = STATE.chain.length - 1
					STATE.score.complete = false
					displayScore()
					displayURL()
			} catch (error) {console.log(error)}
		}

	/* updateInput */
		ELEMENTS.words.form.input.addEventListener(TRIGGERS.input, updateInput)
		function updateInput(event) {
			try {
				ELEMENTS.words.form.error.innerHTML = ""
			} catch (error) {console.log(error)}
		}

	/* requestWord */
		ELEMENTS.words.form.request.addEventListener(TRIGGERS.click, requestWord)
		function requestWord(event) {
			try {
				// just done
					if (ELEMENTS.words.form.request.getAttribute("active")) {
						return
					}

				// get word
					const word = ELEMENTS.words.form.input.value.trim()
					if (!word || !word.length) {
						return
					}

				// set state
					ELEMENTS.words.form.error.innerText = "word requested"
					ELEMENTS.words.form.request.setAttribute("active", true)
					ELEMENTS.words.form.input.focus()

				// make request
					const url = encodeURIComponent(window.location.href)
					fetch(`${CONSTANTS.requestURL}&url=${url}&data=${word}`)

				// unset
					setTimeout(() => {
						ELEMENTS.words.form.request.removeAttribute("active")
					}, CONSTANTS.checkWait)
			} catch (error) {console.log(error)}
		}

/*** words ***/
	/* getRandomWord */
		function getRandomWord() {
			try {
				// random entry from dictionary
					const filteredDictionary = CONSTANTS.dictionary.filter(word => word[2])
					const pair = filteredDictionary[Math.floor(Math.random() * filteredDictionary.length)]

				// return
					return {
						graphemes: pair[0],
						phonemes: pair[1]
					}
			} catch (error) {console.log(error)}
		}

	/* findWordOptions */
		function findWordOptions(graphemes) {
			try {
				// clean up
					graphemes = graphemes.trim().toLowerCase().replace(/[^a-z]/g, "")

				// find in dictionary
					const wordOptions = CONSTANTS.dictionary.filter(entry => entry[0] == graphemes) || []

				// return options
					return wordOptions.map(pair => {
						return {
							graphemes: pair[0], phonemes: pair[1]
						}
					})
			} catch (error) {console.log(error)}
		}

	/* hasSyllableOverlap */
		function hasSyllableOverlap(wordA, wordB) {
			try {
				// get phonemes
					let phonemesA = collapseDiphthongs(wordA.phonemes)
					let phonemesB = collapseDiphthongs(wordB.phonemes)

				// get last vowel of wordA
					let lastVowelIndex = -1
					let lastVowel = ""
					for (let v in CONSTANTS.vowels) {
						// get last time that vowel appears
							const thisVowel = CONSTANTS.vowels[v]
							const lastIndexOfThisVowel = phonemesA.lastIndexOf(thisVowel)

						// later?
							if (lastIndexOfThisVowel > lastVowelIndex) {
								lastVowelIndex = lastIndexOfThisVowel
								lastVowel = thisVowel
							}
					}

				// no vowels?
					if (lastVowelIndex == -1) {
						return false
					}

				// entire word
					if (lastVowelIndex == 0) {
						return false
					}

				// get characters from then on
					const phonemesASlice = phonemesA.slice(lastVowelIndex)

				// similar sounds in A
					let overlapIndex = phonemesB.indexOf(phonemesASlice)
					if (overlapIndex == -1) {
						similarALoop: for (let p = 0; p < phonemesASlice.length; p++) {
							const similarSounds = CONSTANTS.similarSounds[phonemesASlice[p]]
							for (const s in similarSounds) {
								const similarASlice = phonemesASlice.slice(0, p) + similarSounds[s] + phonemesASlice.slice(p + 1)
									overlapIndex = phonemesB.indexOf(similarASlice)
								if (overlapIndex > -1) {
									phonemesA = phonemesA.slice(0, lastVowelIndex) + similarASlice
									break similarALoop
								}
							}
						}
					}

				// similar sounds in B
					if (overlapIndex == -1) {
						// try similar sounds
							similarBLoop: for (let p = 0; p < phonemesB.length; p++) {
								const similarSounds = CONSTANTS.similarSounds[phonemesB[p]]
								for (const s in similarSounds) {
									const similarB = phonemesB.slice(0, p) + similarSounds[s] + phonemesB.slice(p + 1)
										overlapIndex = similarB.indexOf(phonemesASlice)
									if (overlapIndex > -1) {
										phonemesB = similarB
										break similarBLoop
									}
								}
							}
					}

				// still no overlap
					if (overlapIndex == -1) {
						return false
					}

				// get preceeding characters
					if (overlapIndex > 0) {
						const phonemesBSlice = phonemesB.slice(0, overlapIndex + phonemesASlice.length)
						if (!phonemesA.endsWith(phonemesBSlice)) {
							// optional first h
								if (phonemesBSlice[0] == "h" && !phonemesA.endsWith(phonemesBSlice.slice(1))) {
									return false
								}
						}
					}

				// overlap!
					return true
			} catch (error) {console.log(error)}
		}

	/* collapseDiphthongs */
		function collapseDiphthongs(phonemes) {
			try {
				// loop through diphthongs
					for (const d in CONSTANTS.diphthongs) {
						const regex = new RegExp(`${d}`, "g")
						phonemes = phonemes.replace(regex, CONSTANTS.diphthongs[d])
					}

				// return
					return phonemes
			} catch (error) {console.log(error)}
		}

	/* addToHistory */
		function addToHistory(searchString) {
			try {
				// already in history
					if (STATE.history.includes(searchString)) {
						return
					}

				// add to history
					STATE.history.push(searchString)

				// display
					displayHistory()

				// save to local storage
					localStorage.syllabolting = JSON.stringify(STATE.history)
			} catch (error) {console.log(error)}
		}

/*** displays ***/
	/* displayEmptyState */
		function displayEmptyState() {
			try {
				// start & end
					displayStartAndEnd()

				// chain & form
					ELEMENTS.words.chain.innerHTML = ""
					ELEMENTS.words.form.input.value = ""

				// score
					displayScore()
			} catch (error) {console.log(error)}
		}

	/* displayStartAndEnd */
		function displayStartAndEnd() {
			try {
				// display start
					ELEMENTS.words.start.graphemes.innerText = STATE.start.graphemes || ""
					ELEMENTS.words.start.phonemes.innerText = STATE.start.phonemes || ""

				// display end
					ELEMENTS.words.end.graphemes.innerText = STATE.end.graphemes || ""
					ELEMENTS.words.end.phonemes.innerText = STATE.end.phonemes || ""
			} catch (error) {console.log(error)}
		}

	/* displayScore */
		function displayScore() {
			try {
				// count
					ELEMENTS.score.count.innerText = Math.max(STATE.score.count, 0)

				// status
					ELEMENTS.score.status.setAttribute("complete", STATE.score.complete)
					ELEMENTS.words.element.setAttribute("complete", STATE.score.complete)
			} catch (error) {console.log(error)}
		}

	/* displayWord */
		function displayWord(word) {
			try {
				// parent
					const wordElement = document.createElement("div")
						wordElement.className = "word"
					ELEMENTS.words.chain.appendChild(wordElement)

				// text
					const graphemesElement = document.createElement("div")
						graphemesElement.className = "word-graphemes"
						graphemesElement.innerText = word.graphemes
					wordElement.appendChild(graphemesElement)

					const phonemesElement = document.createElement("div")
						phonemesElement.className = "word-phonemes"
						phonemesElement.innerText = word.phonemes
					wordElement.appendChild(phonemesElement)

				// remove
					const removeButton = document.createElement("button")
						removeButton.className = "word-remove pseudo-button"
						removeButton.title = "remove from here"
						removeButton.innerHTML = CONSTANTS.svg.x
						removeButton.addEventListener(TRIGGERS.click, removeWord)
					wordElement.appendChild(removeButton)

				// scroll
					setTimeout(() => {
						ELEMENTS.words.form.error.scrollIntoView()
					}, 0)
			} catch (error) {console.log(error)}
		}

	/* displayURL */
		function displayURL() {
			try {
				// start & end
					let searchString = `?start=${STATE.start.graphemes}_${STATE.start.phonemes}`
						searchString += `&end=${STATE.end.graphemes}_${STATE.end.phonemes}`

				// chain
					const chainWords = []
					for (let w = 1; w < STATE.chain.length; w++) {
						chainWords.push(`${STATE.chain[w].graphemes}_${STATE.chain[w].phonemes}`)
					}
					searchString += chainWords.length ? `&chain=${chainWords.join(",")}` : ""

				// set
					const url = new URL(window.location.href)
						url.search = searchString
					window.history.replaceState(null, "", url)
			} catch (error) {console.log(error)}
		}

	/* displayHistory */
		function displayHistory() {
			try {
				// clear history
					ELEMENTS.history.list.innerHTML = ""

				// loop through
					for (let h in STATE.history) {
						const historyParameters = getParameters(STATE.history[h])

						const historyLink = document.createElement("a")
							historyLink.className = "history-link"
							historyLink.href = STATE.history[h]
							historyLink.innerText = `(${historyParameters.chain.length}) ${historyParameters.start.graphemes} - ${historyParameters.end.graphemes}`
						ELEMENTS.history.list.appendChild(historyLink)
					}
			} catch (error) {console.log(error)}
		}

/*** dictionary set-up ***/
	/* loadDictionary */
		function loadDictionary() {
			try {
				// this function does not execute at run-time
				// instead, the dictionary was pre-parsed
				// from https://svn.code.sf.net/p/cmusphinx/code/trunk/cmudict/cmudict-0.7b
				// and some entries were updated, removed, or added

				// load source & filter out blanks & symbols
					const rows = DICTIONARY.split(/\n/g)

				// convert rows to pairs
					const dictionary = rows.map(row => {
						const pair = row.split("  ")
						return [
							pair[0].toLowerCase().replace(/[^a-z]/g, ""),
							convertARPABETtoIPA(pair[1])
						]
					})

				// output
					return JSON.stringify(dictionary, null, 2)
			} catch (error) {console.log(error)}
		}

	/* convertARPABETtoIPA */
		function convertARPABETtoIPA(arpabetText) {
			try {
				// conversion
					const ARPABETtoIPA = {
						"aa": "ɑ",
						"ae": "æ",
						"ah": "ʌ",
						"ao": "ɔ",
						"aw": "ɑʊ",
						"ay": "ɑɪ",
						"eh": "ɛ",
						"er": "ʌɹ",
						"ey": "eɪ",
						"ih": "ɪ",
						"iy": "i",
						"ow": "oʊ",
						"oy": "ɔɪ",
						"uh": "ʊ",
						"uw": "u",
						"b":  "b",
						"ch": "ʧ",
						"d":  "d",
						"dh": "ð",
						"f":  "f",
						"g":  "g",
						"hh": "h",
						"jh": "ʤ",
						"k":  "k",
						"l":  "l",
						"m":  "m",
						"n":  "n",
						"ng": "ŋ",
						"p":  "p",
						"r":  "ɹ",
						"s":  "s",
						"sh": "ʃ",
						"t":  "t",
						"th": "θ",
						"v":  "v",
						"w":  "w",
						"y":  "j",
						"z":  "z",
						"zh": "ʒ"
					}

				// remove numbers & spaces
					arpabetText = arpabetText.replace(/ /g, "")
					arpabetText = arpabetText.replace(/\d/g, "")
					arpabetText = arpabetText.toLowerCase()

				// move through text
					let position = 0
					let ipaText = []
					positionLoop: while (position < arpabetText.length) {
						// look ahead 4 characters
							let lookahead = 4
							lookaheadLoop: while (lookahead) {
								let chunk = arpabetText.slice(position, position + lookahead)
								if (ARPABETtoIPA[chunk]) {
									ipaText.push(ARPABETtoIPA[chunk])
									position += lookahead
									continue positionLoop
								}
								else {
									lookahead--
								}
							}

						// no match?
							ipaText.push(arpabetText.slice(position, position + 1))
							position++
					}

				// output
					return ipaText.join("")
			} catch (error) {console.log(error)}
		}
