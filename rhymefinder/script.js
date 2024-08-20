/*** globals ***/
	/* triggers */
		const TRIGGERS = {
			click: "click",
			submit: "submit",
			input: "input"
		}

	/* elements */
		const ELEMENTS = {
			search: {
				element: document.querySelector("#search"),
				input: document.querySelector("#search-input"),
				reset: document.querySelector("#search-reset"),
				ipa: {
					phonemes: document.querySelector("#search-ipa-phonemes"),
					phonemeItems: [],
					start: document.querySelector("#search-ipa-limiters-start"),
					end: document.querySelector("#search-ipa-limiters-end"),
				},
				type: document.querySelector("#search-type"),
				mode: document.querySelector("#search-mode")
			},
			results: {
				element: document.querySelector("#results"),
				items: []
			},
			error: {
				element: document.querySelector("#error"),
				text: document.querySelector("#error-text"),
				request: document.querySelector("#error-request")
			},
			loading: document.querySelector("#loading")
		}

	/* constants */
		const CONSTANTS = {
			searchWait: 500, // ms
			checkWait: 1000, // ms
			requestURL: "https://script.google.com/macros/s/AKfycbz_NOnYfPYHShI5HUAFSwMdYqEPaVKY3jvInImJ2pj2lWaBNcVJnYdQECjHpCv_PL4PTQ/exec?project=rhymefinder",
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
			}
		}
		CONSTANTS.dictionary = JSON.parse(convertDiphthongs(JSON.stringify(window.IPADICTIONARY), "collapse"))

/*** interaction ***/
	/* loadPage */
		loadPage()
		function loadPage() {
			try {
				// get parameters
					const parameters = getParameters(window.location.search)

				// display
					if (parameters.search) {
						ELEMENTS.search.input.value = parameters.search
					}
					if (parameters.type) {
						ELEMENTS.search.type.value = parameters.type
					}
					if (parameters.mode) {
						ELEMENTS.search.mode.value = parameters.mode
					}

				// search
					const options = {}
					if (!isNaN(parameters.start)) {
						options.startValue = Number(parameters.start)
					}
					if (!isNaN(parameters.end)) {
						options.endValue = Number(parameters.end)
					}

				// findWord
					findWord(options)
			} catch (error) {console.log(error)}
		}

	/* changeSearch */
		ELEMENTS.search.input.addEventListener(TRIGGERS.input, changeSearch)
		function changeSearch(event) {
			try {
				// wait
					clearTimeout(CONSTANTS.searchTimeout)
					CONSTANTS.searchTimeout = setTimeout(findWord, CONSTANTS.searchWait)
			} catch (error) {console.log(error)}
		}

	/* resetSearch */
		ELEMENTS.search.reset.addEventListener(TRIGGERS.click, resetSearch)
		function resetSearch(event) {
			try {
				// clear search
					ELEMENTS.search.input.value = ""
					ELEMENTS.search.ipa.phonemeItems = []
					ELEMENTS.error.text.innerText = ""
					ELEMENTS.error.element.removeAttribute("visible")
					ELEMENTS.results.element.innerHTML = ""
					ELEMENTS.results.items = []

				// clear ipa
					ELEMENTS.search.ipa.phonemes.innerHTML = ""

				// set ranges
					displaySliders({
						startValue: 0,
						endValue: 1,
						phonemeCount: 1
					})

				// refocus
					ELEMENTS.search.input.focus()
			} catch (error) {console.log(error)}
		}

	/* adjustSlider */
		ELEMENTS.search.ipa.start.addEventListener(TRIGGERS.input, adjustSlider)
		ELEMENTS.search.ipa.end.addEventListener(TRIGGERS.input, adjustSlider)
		function adjustSlider(event) {
			try {
				// get values
					const startValue = Number(ELEMENTS.search.ipa.start.value)
					const endValue = Number(ELEMENTS.search.ipa.end.value)
					const phonemeCount = ELEMENTS.search.ipa.phonemeItems.length
				
				// redisplay
					displaySliders({startValue, endValue, phonemeCount})

				// wait
					clearTimeout(CONSTANTS.searchTimeout)
					CONSTANTS.searchTimeout = setTimeout(findRhymes, CONSTANTS.searchWait)
			} catch (error) {console.log(error)}
		}

	/* changeType */
		ELEMENTS.search.type.addEventListener(TRIGGERS.input, changeType)
		function changeType(event) {
			try {
				// wait
					clearTimeout(CONSTANTS.searchTimeout)
					CONSTANTS.searchTimeout = setTimeout(findRhymes, CONSTANTS.searchWait)
			} catch (error) {console.log(error)}
		}

	/* changeMode */
		ELEMENTS.search.mode.addEventListener(TRIGGERS.input, changeMode)
		function changeMode(event) {
			try {
				// wait
					clearTimeout(CONSTANTS.searchTimeout)
					CONSTANTS.searchTimeout = setTimeout(findRhymes, CONSTANTS.searchWait)
			} catch (error) {console.log(error)}
		}

	/* requestWord */
		ELEMENTS.error.request.addEventListener(TRIGGERS.click, requestWord)
		function requestWord(event) {
			try {
				// just done
					if (ELEMENTS.error.request.getAttribute("active")) {
						return
					}

				// get word
					const word = ELEMENTS.search.input.value.trim()
					if (!word || !word.length) {
						return
					}

				// set state
					ELEMENTS.error.request.setAttribute("active", true)
					ELEMENTS.search.input.focus()

				// make request
					const url = encodeURIComponent(window.location.href)
					fetch(`${CONSTANTS.requestURL}&url=${url}&data=${word}`)

				// unset
					setTimeout(() => {
						ELEMENTS.error.request.removeAttribute("active")
					}, CONSTANTS.checkWait)
			} catch (error) {console.log(error)}
		}

/*** tools ***/
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

				// return
					return parameters
			} catch (error) {console.log(error)}
		}

	/* setParameters */
		function setParameters({search, startValue, endValue, type, mode}) {
			try {
				// parameters
					const parameters = []
					if (search && search.length) {
						parameters.push(`search=${search}`)
					}
					if (!isNaN(startValue)) {
						parameters.push(`start=${startValue}`)
					}
					if (!isNaN(endValue)) {
						parameters.push(`end=${endValue}`)
					}
					if (type && type.length) {
						parameters.push(`type=${type}`)
					}
					if (mode && mode.length) {
						parameters.push(`mode=${mode}`)
					}

				// no parameters?
					const searchString = parameters.length ? `?${parameters.join("&")}` : ''

				// set
					const url = new URL(window.location.href)
						url.search = searchString
					window.history.replaceState(null, "", url)
			} catch (error) {console.log(error)}
		}

	/* convertDiphthongs */
		function convertDiphthongs(phonemes, type) {
			try {
				// type
					if (!CONSTANTS.diphthongs[type]) {
						return phonemes
					}

				// loop through diphthongs
					for (const d in CONSTANTS.diphthongs[type]) {
						const regex = new RegExp(`${d}`, "g")
						phonemes = phonemes.replace(regex, CONSTANTS.diphthongs[type][d])
					}

				// return
					return phonemes
			} catch (error) {console.log(error)}
		}

/*** words ***/
	/* findWord */
		function findWord(options) {
			try {
				// clear existing results
					ELEMENTS.search.ipa.phonemes.innerHTML = ""
					ELEMENTS.search.ipa.phonemeItems = []
					ELEMENTS.error.text.innerText = ""
					ELEMENTS.error.element.removeAttribute("visible")
					ELEMENTS.results.element.innerHTML = ""
					ELEMENTS.results.items = []

				// get search
					const originalSearch = ELEMENTS.search.input.value.toLowerCase()
					const condensedSearch = originalSearch.trim().replace(/[^a-z]/g, "")
					if (!condensedSearch.trim().length) {
						return
					}

				// single-word match
					const matches = CONSTANTS.dictionary.filter(item => item[0].replace(/[^a-z]/g, "") == condensedSearch) || []
					let phonemes = matches.length ? matches[0][1] : null
					
				// multi-word match
					if (!phonemes) {
						// split at spaces / dashes
							const searchComponents = originalSearch.split(/[^a-z]/g)

						// loop through and grab IPA for each
							let concatenatedPhonemes = ""
							for (const i in searchComponents) {
								const submatches = CONSTANTS.dictionary.filter(item => item[0].replace(/[^a-z]/g, "") == searchComponents[i])
								if (!submatches.length) {
									ELEMENTS.error.text.innerText = "unknown word"
									ELEMENTS.error.element.setAttribute("visible", "requestable")
									setParameters({search})
									return
								}

								concatenatedPhonemes += submatches[0][1]
							}

						// remove double letters
							let previousPhoneme = phonemes = ""
							for (let p in concatenatedPhonemes) {
								if (concatenatedPhonemes[p] !== previousPhoneme) {
									phonemes += concatenatedPhonemes[p]
								}
								previousPhoneme = concatenatedPhonemes[p]
							}
					}
				
				// no match
					if (!phonemes) {
						ELEMENTS.error.text.innerText = "unknown word"
						ELEMENTS.error.element.setAttribute("visible", "requestable")
						setParameters({search})
						return
					}

				// display first match
					ELEMENTS.search.ipa.phonemeItems = displaySearchPhonemes(phonemes)

				// get last vowel
					let lastVowelIndex = 0
					for (let i = 0; i < phonemes.length; i++) {
						if (CONSTANTS.vowels.includes(phonemes[i])) {
							lastVowelIndex = i
						}
					}

				// set ranges
					displaySliders({
						startValue: options?.startValue ?? (lastVowelIndex || 0),
						endValue: options?.endValue ?? phonemes.length,
						phonemeCount: phonemes.length
					})

				// wait
					clearTimeout(CONSTANTS.searchTimeout)
					CONSTANTS.searchTimeout = setTimeout(findRhymes, 0)
			} catch (error) {console.log(error)}
		}

	/* findRhymes */
		function findRhymes() {
			try {
				// clear results
					ELEMENTS.error.text.innerText = ""
					ELEMENTS.error.element.removeAttribute("visible")
					ELEMENTS.results.element.innerHTML = ""
					ELEMENTS.results.items = []

				// no search?
					const search = ELEMENTS.search.input.value.trim()
					if (!search.length) {
						return
					}

				// selection
					const startValue = Number(ELEMENTS.search.ipa.start.value)
					const endValue = Number(ELEMENTS.search.ipa.end.value)
					if (startValue >= endValue) {
						return
					}

				// get type && mode
					const type = ELEMENTS.search.type.value
					const mode = ELEMENTS.search.mode.value
					setParameters({search, startValue, endValue, type, mode})

				// get highlighted phonemes
					const highlightedPhonemes = []
					for (const i in ELEMENTS.search.ipa.phonemeItems) {
						if (ELEMENTS.search.ipa.phonemeItems[i].getAttribute("highlighted")) {
							highlightedPhonemes.push(ELEMENTS.search.ipa.phonemeItems[i].innerText)
						}
					}
					const phonemes = highlightedPhonemes.join("")

				// none
					const collapsedPhonemes = convertDiphthongs(phonemes, "collapse")
					if (!collapsedPhonemes.length) {
						ELEMENTS.error.text.innerText = "select more sounds"
						ELEMENTS.error.element.setAttribute("visible", true)
						return
					}

				// too few for this type
					if (collapsedPhonemes.length == 1 && (type == "any" || type == "inner")) {
						ELEMENTS.error.text.innerText = "select more sounds"
						ELEMENTS.error.element.setAttribute("visible", true)
						return
					}

				// loading
					ELEMENTS.loading.setAttribute("visible", true)

				// async
					setTimeout(() => {
						// filter
							const rhymes = CONSTANTS.dictionary.filter(item => isRhyme({
								word: item[1],
								segment: collapsedPhonemes,
								type,
								mode
							})) || []

							if (!rhymes.length) {
								ELEMENTS.error.text.innerText = "no matches found"
								ELEMENTS.error.element.setAttribute("visible", true)
								ELEMENTS.loading.removeAttribute("visible")
								return
							}

						// displayResults
							ELEMENTS.results.items = displayResults(rhymes, phonemes)
							ELEMENTS.loading.removeAttribute("visible")
					}, 0)
			} catch (error) {console.log(error)}
		}

	/* isRhyme */
		function isRhyme({word, segment, type, mode}) {
			try {				
				// strict
					const segmentIndex = word.indexOf(segment)
					if (type == "start" && (segmentIndex == 0)) {
						return true
					}
					if (type == "end" && (segmentIndex >= 0) && (segmentIndex + segment.length == word.length)) {
						return true
					}
					if (type == "inner" && (segmentIndex > 0) && (segmentIndex + segment.length < word.length)) {
						return true
					}
					if (type == "any" && (segmentIndex >= 0)) {
						return true
					}

					if (mode == "strict") {
						return false
					}

				// slant
					for (let i = 0; i < segment.length; i++) {
						const closePhonemes = CONSTANTS.closePhonemes[segment[i]]
						for (const c in closePhonemes) {
							const similarSegment = segment.slice(0, i) + closePhonemes[c] + segment.slice(i + 1)
							const similarIndex = word.indexOf(similarSegment)
							if (type == "start" && (similarIndex == 0)) {
								return true
							}
							if (type == "end" && (similarIndex >= 0) && (similarIndex + similarSegment.length == word.length)) {
								return true
							}
							if (type == "inner" && (similarIndex > 0) && (similarIndex + similarSegment.length < word.length)) {
								return true
							}
							if (type == "any" && (similarIndex >= 0)) {
								return true
							}
						}
					}
				
				// none
					return false
			} catch (error) {console.log(error)}
		}

/*** displays ***/
	/* displaySearchPhonemes */
		function displaySearchPhonemes(phonemes) {
			try {
				// empty array
					const phonemeItems = []

				// loop through
					for (const p in phonemes) {
						const expandedPhoneme = convertDiphthongs(phonemes[p], "expand")
						const phonemeItem = document.createElement("span")
							phonemeItem.innerText = expandedPhoneme
						ELEMENTS.search.ipa.phonemes.appendChild(phonemeItem)
						phonemeItems.push(phonemeItem)
					}

				// return
					return phonemeItems
			} catch (error) {console.log(error)}
		}

	/* displaySliders */
		function displaySliders({startValue, endValue, phonemeCount}) {
			try {
				// startMin(0) --- startValue-1-endMin --- startMax-1-endValue --- endMax(total)

				// set html
					ELEMENTS.search.ipa.start.min = 0
					ELEMENTS.search.ipa.start.max = endValue - 1
					ELEMENTS.search.ipa.start.value = startValue
					ELEMENTS.search.ipa.end.min = startValue + 1
					ELEMENTS.search.ipa.end.max = phonemeCount
					ELEMENTS.search.ipa.end.value = endValue

				// set styling
					const startRangeLength = endValue - 1
					const endRangeLength = phonemeCount - (startValue + 1)

					ELEMENTS.search.ipa.start.style.width = `calc(${startRangeLength} * var(--search-phoneme-size) + var(--thumb-size))`
					ELEMENTS.search.ipa.end.style.width   = `calc(${endRangeLength} * var(--search-phoneme-size) + var(--thumb-size))`

				// highlight characters
					for (let i = 0; i < ELEMENTS.search.ipa.phonemeItems.length; i++) {
						if (i >= startValue && i < endValue) {
							ELEMENTS.search.ipa.phonemeItems[i].setAttribute("highlighted", true)
						}
						else {
							ELEMENTS.search.ipa.phonemeItems[i].removeAttribute("highlighted")
						}
					}
			} catch (error) {console.log(error)}
		}

	/* displayResults */
		function displayResults(rhymes, phonemes) {
			try {
				// empty array
					const resultItems = []

				// regex
					const regex = new RegExp(`${phonemes}`, "g")

				// loop through
					for (const i in rhymes) {
						const resultItem = document.createElement("div")
							resultItem.className = "result"
						ELEMENTS.results.element.appendChild(resultItem)

							const resultGrapheme = document.createElement("div")
								resultGrapheme.className = "result-grapheme"
								resultGrapheme.innerText = rhymes[i][0]
							resultItem.appendChild(resultGrapheme)

							const resultPhoneme = document.createElement("div")
								resultPhoneme.className = "result-phoneme"
								resultPhoneme.innerHTML = convertDiphthongs(rhymes[i][1], "expand").replace(regex, `<span highlighted>${phonemes}</span>`)
							resultItem.appendChild(resultPhoneme)
					}

				// return
					return resultItems
			} catch (error) {console.log(error)}
		}
