/*** globals ***/
	/* triggers */
		const TRIGGERS = {
			click: "click",
			input: "input"
		}

	/* elements */
		const ELEMENTS = {
			body: document.body,
			poem: document.querySelector("#poem"),
			controls: {
				forms: document.querySelector("#controls-forms"),
				edit: document.querySelector("#controls-edit"),
				refresh: document.querySelector("#controls-refresh"),
				copy: document.querySelector("#controls-copy"),
				download: document.querySelector("#controls-download"),
				toast: document.querySelector("#controls-toast"),
				toastTimeout: null
			},
			rhymeControls: {
				element: document.querySelector("#rhyme-controls"),
				input: document.querySelector("#rhyme-controls-input"),
				minimum: document.querySelector("#rhyme-controls-minimum"),
				maximum: document.querySelector("#rhyme-controls-maximum")
			}
		}

	/* constants */
		const CONSTANTS = {
			successWait: 1000,
			attempts: 8,
			alphabet: "abcdefghijklmnopqrstuvwxyz",
			consonantsRegex: /[^æaɔɛeiɪouʊʌ]/g,
			vowelsRegex: /[æaɔɛeiɪouʊʌ]/g,
			rhythms: {
				"a": "anapestic",
				"i": "iambic",
				"s": "syllables"
			},
			meters: {
				"1": "monometer",
				"2": "dimeter",
				"3": "trimeter",
				"4": "tetrameter",
				"5": "pentameter"
			},
			syllables: {
				"1": ["s", "1"],
				"2": ["i", "1"],
				"3": ["a", "1"],
				"4": ["i", "2"],
				"5": ["a", "2"],
				"6": ["i", "3"],
				"7": ["s", "7"],
				"8": ["a", "3"],
				"9": ["s", "9"],
				"10": ["i", "5"],
				"11": ["a", "4"]
			},
			stanzaBreak: "/",
			repeatSymbol: "r-",
			freeverse: {
				minimumLines: 2,
				maximumLines: 16,
				rhythm: "s",
				lineRepeatChance: 0.2,
				rhymeRepeatChance: 0.2
			},
			forms: {
				"12-bar blues": 			["s5a","s7b","r-0","r-1","s5c","s7b","/","s5d","s7e","r-7","r-8","s5f","s7e","/","s5g","s7h","r-14","r-15","s5i","s7h"],
				"anaduo": 					["a4a","a4a","a3b","a4c","a4c","a3b","/","a4d","a4d","a3e","a4f","a4f","a4g"],
				"anapestic blank verse": 	["a5a","a5b","a5c","a5d","a5e","a5f"],
				"anapestic couplet": 		["a4a","a4a"],
				"anapestic sonnet": 		["a5a","a5b","a5a","a5b","/","a5c","a5d","a5c","a5d","/","a5e","a5f","a5e","a5f","/","a5g","a5g"],
				"ballad": 					["s9a","s7b","s9c","s7b"],
				"ballade": 					["i4a","i4b","i4a","i4b","i4b","i4c","i4b","i4c","/","i4a","i4d","i4a","i4d","i4d","i4c","i4d","r-7","/","i4a","i4e","i4a","i4e","i4e","i4c","i4e","r-7","/","i4f","i4c","i4f","r-7"],
				"blank verse": 				["i5a","i5b","i5c","i5d","i5e","i5f","i5g","i5h"],
				"blood quill": 				["a2a","a2b","a3c","a2a","a2b","a3c","/","a2d","a2e","a3f","a2d","a2e","a3f"],
				"bob and wheel": 			["s3a","s6b","s6a","s6b","s6a"],
				"chant": 					["a4a","s7b","a4a","r-1","/","a4c","r-1","a4c","r-1"],
				"cinquain": 				["i1a","i2b","i3c","i4d","i1e"],
				"common hymn": 				["i4a","i3b","i4c","i3b","/","i4d","i3e","i4f","i3e"],
				"decima": 					["s8a","s8b","s8b","s8a","s8a","s8c","s8c","s8d","s8d","s8c"],
				"dizain": 					["i5a","i5b","i5a","i5b","i5b","i5c","i5c","i5d","i5c","i5d"],
				"dodoitsu": 				["s7a","s7b","s7c","s5d"],
				"endecha": 					["s7a","s7b","s7c","s11b"],
				"flamenca": 				["s6a","s6b","s5c","s6d","s6b"],
				"free verse": 				[],
				"galloping denturn": 		["a4a","a3b","a4a","a3b","a4c","a3d","a4c","a3d","/","s2e","/","a4f","a4g","a4f","a4g","a4h","a4i","a4h","a4i"],
				"gwawdodyn": 				["s9a","s9a","s10b","s9a"],
				"haiku": 					["s5a","s7b","s5c"],
				"haiku sonnet": 			["s5a","s7b","s5c","/","s5d","s7e","s5f","/","s5g","s7h","s5i","/","s5j","s7k","s5l","/","s7m","s7m"],
				"heroic stanza": 			["i5a","i5b","i5a","i5b"],
				"iambic couplet": 			["i4a","i4a"],
				"imayo": 					["s7a","s5b","s7c","s5d","s7e","s5f","s7g","s5h"],
				"interlocking rubaiyat": 	["i4a","i4a","i4b","i4a","/","i4b","i4b","i4c","i4b","/","i4c","i4c","i4d","i4c","/","i4d","i4d","i4a","i4d"],
				"kimo": 					["s10a","s7b","s6c"],
				"kouta": 					["s7a","s5b","s7c","s5b"],
				"kyrielle": 				["i4a","a3b","i4a","a3b","/","i4c","a3b","i4c","r-3","/","i4d","a3b","i4d","r-3","/","i4e","a3b","i4e","r-3"],
				"lai": 						["s5a","s5a","s2b","s5a","s5a","s2b","s5a","s5a","s2b"],
				"limerick": 				["a3a","a3a","a2b","a2b","a3a"],
				"madrigal": 				["i5a","i5b","i5b","/","i5a","i5b","r-0","r-1","/","i5a","i5b","i5b","r-0","r-1","r-2"],
				"minute": 					["i4a","i2a","i2b","i2b","/","i4c","i2c","i2d","i2d","/","i4e","i2e","i2f","i2f"],
				"nonet": 					["s9a","s8b","s7c","s6d","s5e","s4f","s3g","s2h","s1i"],
				"ottava rima": 				["i5a","i5b","i5a","i5b","i5a","i5b","i5c","i5c"],
				"ovillejo": 				["s8a","s4a","/","s8b","s4b","/","s8c","s4c","/","s8c","s8d","s8d","r-1","r-4","r-7"],
				"pantoum": 					["i4a","a3b","i4a","a3b","/","r-1","i4c","r-3","i4c","/","r-6","a3d","r-8","a3d","/","r-11","r-2","r-13","r-0"],
				"petrarchan sonnet": 		["i5a","i5b","i5b","i5a","i5a","i5b","i5b","i5a","/","i5c","i5d","i5e","i5c","i5d","i5e"],
				"quatern": 					["s8a","s8b","s8c","s8d","/","s8e","r-0","s8f","s8g","/","s8h","s8i","r-0","s8j","/","s8k","s8l","s8m","r-0"],
				"quatrain": 				["i4a","i4a","i4b","i4b"],
				"rhyme royal": 				["i5a","i5b","i5a","/","i5b","i5b","/","i5c","i5c"],
				"rime couee": 				["s8a","s8a","s6b","s8c","s8c","s6b"],
				"rondel": 					["i4a","i4b","i4b","i4a","/","i4a","i4b","r-0","r-1","/","i4a","i4b","i4b","i4a","r-0"],
				"rondelet": 				["s4a","s8b","r-0","s8a","s8b","s8b","r-0"],
				"seguidilla": 				["s7a","s5b","s7c","s5b","/","s5d","s7e","s5d"],
				"senryu": 					["s5a","s7b","s5c"],
				"seussian": 				["a4a","a4a","a4b","a4b","/","a4c","a4c","a4d","a4d"],
				"shadorma": 				["s3a","s5b","s3c","s3d","s7e","s5f"],
				"shakespearean sonnet": 	["i5a","i5b","i5a","i5b","/","i5c","i5d","i5c","i5d","/","i5e","i5f","i5e","i5f","/","i5g","i5g"],
				"sports taunt": 			["s2a","s2b","s6b","s3c","r-3","/","s2d","s2e","s6e","r-3","r-3","/","s2f","s2g","s6g","r-3","r-3","/","s2h","s2i","s6i","r-3","r-3"],
				"strambotto": 				["a4a","a4b","a4a","a4b","a4a","a4b","a4a","a4b"], 
				"tanka": 					["s5a","s7b","s5c","s7d","s7e"],
				"terza rima": 				["i5a","i5b","i5a","/","i5b","i5c","i5b","/","i5c","i5d","i5c","/","i5d"],
				"treochair": 				["s3a","s7b","s7a","/","s3c","s7d","s7c","/","s3e","s7f","s7e"],
				"tricube": 					["s3a","s3b","s3c","/","s3d","s3e","s3f","/","s3g","s3h","s3i"],
				"tripadi": 					["s8a","s8a","s10b","/","s8c","s8c","s10b"],
				"villanelle": 				["i5a","i5b","i5a","/","i5a","i5b","r-0","/","i5a","i5b","r-2","/","i5a","i5b","r-0","/","i5a","i5b","r-2","/","i5a","i5b","r-0","r-2"],
				"waka": 					["s5a","s7b","/","s5c","s7d","/","s7e"],
				"zappai": 					["s5a","s7b","s5c"],
				"zejel": 					["i4a","i4a","i4a","/","i4b","i4b","i4b","i4a","/","i4c","i4c","i4c","i4a","/","i4d","i4d","i4d","i4a"],
			},
			formGroups: {
				"iambic": 		["iambic couplet", "quatrain", "heroic stanza", "cinquain", "rhyme royal", "common hymn", "blank verse", "ottava rima", "terza rima", "dizain", "minute", "rondel", "madrigal", "petrarchan sonnet", "shakespearean sonnet", "zejel", "interlocking rubaiyat", "villanelle", "ballade"],
				"anapestic": 	["anapestic couplet", "limerick", "strambotto", "seussian", "anapestic blank verse", "anapestic sonnet", "anaduo", "galloping denturn", "blood quill"],
				"syllabic": 	["free verse", "haiku", "senryu", "zappai", "kimo", "kouta", "dodoitsu", "ballad", "endecha", "gwawdodyn", "tanka", "waka", "bob and wheel", "flamenca", "rime couee", "shadorma", "tripadi", "rondelet", "seguidilla", "chant", "imayo", "tricube", "nonet", "lai", "treochair", "decima", "ovillejo", "haiku sonnet", "kyrielle", "quatern", "pantoum", "12-bar blues", "sports taunt"]
			},
			rhymeControls: {
				steps: 5,
				default: 3,
				plurals: ["s", "z"],
				similarConsonants: {
					"b": ["p"],
					"p": ["b"],
					"d": ["t"],
					"t": ["d"],
					"g": ["k"],
					"k": ["g"],
					"z": ["s"],
					"s": ["z"],
					"v": ["f", "θ"],
					"f": ["v", "θ"],
					"θ": ["f", "v"],
					"ʤ": ["ʧ", "ʃ"],
					"ʧ": ["ʤ", "ʃ"],
					"ʃ": ["ʤ", "ʧ"],
					"m": ["n", "ŋ"],
					"n": ["m", "ŋ"],
					"ŋ": ["m", "n"],
					"l": [],
					"ɹ": []
				},
				similarVowels: {
					"æ": ["a", "ɔ", "ɛ", "eɪ", "ʌ"],
					"a": ["æ", "ɔ", "ɔɪ", "aɪ", "aʊ", "ɛ", "ʌ"],
					"ɔ": ["æ", "a", "ɔɪ", "aʊ", "ɛ", "oʊ", "ʊ", "ʌ"],
					"ɔɪ": ["a", "ɔ", "aɪ", "oʊ", "ʌ"],
					"aɪ": ["a", "ɔɪ", "ɛ", "eɪ", "ɪ"],
					"aʊ": ["a", "ɔ", "oʊ", "u", "ʊ"],
					"ɛ": ["æ", "a", "ɔ", "aɪ", "eɪ", "ʌ"],
					"eɪ": ["aɪ", "ɛ", "i", "ɪ"],
					"i": ["ɛ", "ɪ", "eɪ"],
					"ɪ": ["aɪ", "ɛ", "eɪ", "i", "ʊ"],
					"oʊ": ["aʊ", "ɔ", "ɔɪ", "u", "ʊ", "ʌ"],
					"u": ["aʊ", "oʊ", "ʊ"],
					"ʊ": ["aʊ", "ɔ", "ɪ", "oʊ", "u", "ʌ"],
					"ʌ": ["æ", "a", "ɔ", "ɔɪ", "ɛ", "oʊ", "ʊ"]
				}
			},
			svg: {
				rotate: `<svg viewBox="0 0 100 100"><path d="M 25 67 C 23 64 20 58 20 50 C 20 36 29 23 47 20 C 46 19 46 19 46 19 C 44 17 44 14 46 12 C 48 10 51 10 53 12 C 55 14 58 17 60 19 C 62 21 64 23 64 25 C 64 27 62 29 60 31 C 58 33 55 36 53 38 C 51 40 48 40 46 38 C 44 36 44 33 47 30 C 36 33 30 41 30 50 C 30 55 32 59 33 61 C 33 61 35 65 33 67 C 31 69 27 70 25 67 Z M 75 33 C 77 36 80 42 80 50 C 80 64 71 77 53 80 C 54 81 54 81 54 81 C 56 83 56 86 54 88 C 52 90 49 90 47 88 C 45 86 42 83 40 81 C 38 79 36 77 36 75 C 36 73 38 71 40 69 C 42 67 45 64 47 62 C 49 60 52 60 54 62 C 56 64 56 67 53 70 C 64 67 70 59 70 50 C 70 45 68 41 67 39 C 67 39 65 35 67 33 C 69 31 73 30 75 33 Z"></path></svg>`,
				up: `<svg viewBox="0 0 100 100"><path d="M 50 90 C 47 90 45 88 45 85 C 45 70 45 40 45 27 C 42 30 40 32 38 34 C 36 36 33 36 31 34 C 29 32 29 29 31 27 C 35 23 40 18 45 13 C 47 11 48 10 50 10 C 52 10 53 11 55 13 C 60 18 65 23 69 27 C 71 29 71 32 69 34 C 67 36 64 36 62 34 C 60 32 58 30 55 27 C 55 40 55 70 55 85 C 55 88 53 90 50 90 Z"></path></svg>`,
				down: `<svg viewBox="0 0 100 100"><path d="M 50 10 C 53 10 55 12 55 15 C 55 30 55 60 55 73 C 58 70 60 68 62 66 C 64 64 67 64 69 66 C 71 68 71 71 69 73 C 65 77 60 82 55 87 C 53 89 52 90 50 90 C 48 90 47 89 45 87 C 40 82 35 77 31 73 C 29 71 29 68 31 66 C 33 64 36 64 38 66 C 40 68 42 70 45 73 C 45 60 45 30 45 15 C 45 12 47 10 50 10 Z"></path></svg>`,
				minus: `<svg viewBox="0 0 100 100"><path d="M 20 50 C 20 47 22 45 25 45 C 40 45 60 45 75 45 C 78 45 80 47 80 50 C 80 53 78 55 75 55 C 60 55 40 55 25 55 C 22 55 20 53 20 50 Z"></path></svg>`,
				plus: `<svg viewBox="0 0 100 100"><path d="M 55 45 C 62 45 69 45 75 45 C 78 45 80 47 80 50 C 80 53 78 55 75 55 C 69 55 62 55 55 55 C 55 62 55 69 55 75 C 55 78 53 80 50 80 C 47 80 45 78 45 75 C 45 69 45 62 45 55 C 38 55 31 55 25 55 C 22 55 20 53 20 50 C 20 47 22 45 25 45 C 31 45 38 45 45 45 C 45 38 45 31 45 25 C 45 22 47 20 50 20 C 53 20 55 22 55 25 C 55 31 55 38 55 45 Z"></path></svg>`
			}
		}

	/* state */
		const STATE = {
			form: null,
			structure: [],
			rhymes: {},
			rhymeControl: null,
			poem: []
		}

/*** controls ***/
	/* refreshPoem */
		ELEMENTS.controls.forms.addEventListener(TRIGGERS.input, refreshPoem)
		ELEMENTS.controls.refresh.addEventListener(TRIGGERS.click, refreshPoem)
		function refreshPoem() {
			try {
				// flip state
					ELEMENTS.controls.refresh.setAttribute("success", true)

				// toast
					displayToast("generating poem...")

				// generate poem
					generatePoem(duplicateObject(CONSTANTS.forms[ELEMENTS.controls.forms.value]))

				// return to normal state
					setTimeout(function() {
						ELEMENTS.controls.refresh.removeAttribute("success")
						ELEMENTS.controls.refresh.blur()
					}, CONSTANTS.successWait)
			} catch (error) {console.log(error)}
		}

	/* toggleEdit */
		ELEMENTS.controls.edit.addEventListener(TRIGGERS.click, toggleEdit)
		function toggleEdit() {
			try {
				// stop editing
					if (ELEMENTS.body.getAttribute("mode") == "edit") {
						displayToast("closing editor")
						ELEMENTS.body.removeAttribute("mode")
						return
					}

				// start editing
					displayToast("opening editor")
					ELEMENTS.body.setAttribute("mode", "edit")

				// blur
					ELEMENTS.controls.edit.blur()
			} catch (error) {console.log(error)}
		}

	/* copyPoem */
		ELEMENTS.controls.copy.addEventListener(TRIGGERS.click, copyPoem)
		function copyPoem() {
			try {
				// flip state
					ELEMENTS.controls.copy.setAttribute("success", true)

				// build data
					let poemString = ""
					for (let i = 0; i < STATE.poem.length; i++) {
						poemString += (STATE.poem[i] == CONSTANTS.stanzaBreak ? "" : STATE.poem[i])

						if (i !== STATE.poem.length - 1) {
							poemString += "\n"
						}
					}

				// copy to clipboard
					navigator.clipboard.writeText(poemString)

				// toast
					displayToast("poem copied to clipboard")

				// return to normal state
					setTimeout(function() {
						ELEMENTS.controls.copy.removeAttribute("success")
						ELEMENTS.controls.copy.blur()
					}, CONSTANTS.successWait)
			} catch (error) {console.log(error)}
		}

	/* downloadPoem */
		ELEMENTS.controls.download.addEventListener(TRIGGERS.click, downloadPoem)
		function downloadPoem() {
			try {
				// flip state
					ELEMENTS.controls.download.setAttribute("success", true)

				// build data
					let poemString = ""
					for (let i = 0; i < STATE.poem.length; i++) {
						poemString += (STATE.poem[i] == CONSTANTS.stanzaBreak ? "" : STATE.poem[i])

						if (i !== STATE.poem.length - 1) {
							poemString += "\n"
						}
					}

				// package up
					const link = document.createElement("a")
						link.id = "download-link"
						link.setAttribute("href", "data:text/plain;charset=utf-8," + poemString)
						link.setAttribute("download", "poemmaker_" + (new Date().getTime()) + ".txt")
						link.addEventListener(TRIGGERS.click, function() {
							const link = document.getElementById("download-link")
							document.body.removeChild(link)
						})
				
				// click
					document.body.appendChild(link)
					link.click()

				// toast
					displayToast("downloading poem...")

				// return to normal state
					setTimeout(function() {
						ELEMENTS.controls.download.removeAttribute("success")
						ELEMENTS.controls.download.blur()
					}, CONSTANTS.successWait)
			} catch (error) {console.log(error)}
		}

	/* updateRhymeControls */
		ELEMENTS.rhymeControls.input.addEventListener(TRIGGERS.input, updateRhymeControls)
		ELEMENTS.rhymeControls.minimum.addEventListener(TRIGGERS.click, updateRhymeControls)
		ELEMENTS.rhymeControls.maximum.addEventListener(TRIGGERS.click, updateRhymeControls)
		function updateRhymeControls(event) {
			try {
				// get value
					const value = Number(event.target.value)

				// validate
					if (value >= CONSTANTS.rhymeControls.steps) {
						return
					}

				// set state
					STATE.rhymeControl = value

				// slide input
					ELEMENTS.rhymeControls.input.value = STATE.rhymeControl

				// regenerate any lines that are not strict enough
					let changed = false
					for (let i = 0; i < STATE.structure.length; i++) {
						if (!isAllowedRhyme(i)) {
							STATE.poem[i] = generatePoemLine(i)
							changed = true
						}
					}

				// changed?
					if (changed) {
						displayPoem()
					}
			} catch (error) {console.log(error)}
		}

/*** randoms ***/
	/* rangeRandom */
		function rangeRandom(a, b) {
			try {
				return Math.floor(Math.random() * (b - a)) + a
			} catch (error) {console.log(error)}
		}

	/* chooseRandom */
		function chooseRandom(list) {
			try {
				// array or string
					if (Array.isArray(list) || typeof list == "string") {
						return list[Math.floor(Math.random() * list.length)]		
					}

				// object
					if (typeof list == "object") {
						return Object.keys(list)[Math.floor(Math.random() * Object.keys(list).length)]
					}

				// number
					if (typeof list == "number") {
						return String(list)[Math.floor(Math.random() * String(list).length)]
					}
				
			} catch (error) {console.log(error)}
		}

	/* chanceRandom */
		function chanceRandom(chance) {
			try {
				return Math.random() < chance
			} catch (error) {console.log(error)}
		}

/*** tools ***/
	/* getNextLetter */
		function getNextLetter(usedLetters) {
			try {
				for (const i in CONSTANTS.alphabet) {
					if (usedLetters.includes(CONSTANTS.alphabet[i])) {
						continue
					}
					return CONSTANTS.alphabet[i]
				}
				return null
			} catch (error) {console.log(error)}
		}

	/* duplicateObject */
		function duplicateObject(obj) {
			try {
				return JSON.parse(JSON.stringify(obj))
			} catch (error) {console.log(error)}
		}

	/* getForm */
		function getForm(structure) {
			try {
				// stringify structure
					const stringifiedStructure = structure.filter(function(s) {
						return s !== CONSTANTS.stanzaBreak
					}).join(",")

				// loop through forms
					for (const i in CONSTANTS.forms) {
						if (CONSTANTS.forms[i].filter(function(s) {
							return s !== CONSTANTS.stanzaBreak
						}).join(",") == stringifiedStructure) {
							return i
						}
					}

				// default to free verse
					return "free verse"
			} catch (error) {console.log(error)}
		}

	/* isValidStructure */
		function isValidStructure(structure) {
			try {
				// get all allowed
					const rhythms = Object.keys(CONSTANTS.rhythms)
					const meters = Object.keys(CONSTANTS.meters)
					const syllables = Object.keys(CONSTANTS.syllables)
					const rhymes = CONSTANTS.alphabet.split("")

				// loop through
					for (let i = 0; i < structure.length; i++) {
						// stanza break
							if (structure[i] == CONSTANTS.stanzaBreak) {
								continue
							}

						// repeat
							if (structure[i].indexOf(CONSTANTS.repeatSymbol) == 0) {
								const lineRepeat = Number(structure[i].replace(CONSTANTS.repeatSymbol, ""))
								if (isNaN(lineRepeat) || lineRepeat >= i) {
									return false
								}
								continue
							}

						// normal line
							if (!rhythms.includes(structure[i].slice(0,1))) {
								return false
							}
							if (structure[i].slice(0,1) == "s" && !syllables.includes(structure[i].slice(1,-1))) {
								return false
							}
							if (structure[i].slice(0,1) !== "s" && !meters.includes(structure[i].slice(1,-1))) {
								return false
							}
							if (!rhymes.includes(structure[i].slice(-1))) {
								return false
							}
					}

				// still here?
					return true
			} catch (error) {console.log(error)}
		}

	/* isAllowedRhyme */
		function isAllowedRhyme(lineNumber) {
			try {
				// line structure
					const lineStructure = STATE.structure[lineNumber]

				// break
					if (lineStructure == CONSTANTS.stanzaBreak) {
						return true
					}

				// repeat?
					if (lineStructure.indexOf(CONSTANTS.repeatSymbol) == 0) {
						return true
					}

				// parameters
					let rhythm = lineStructure.slice(0,1)
					let meter = lineStructure.slice(1,-1)
					let rhyme = lineStructure.slice(-1)

					if (rhythm == "s") {
						rhythm = CONSTANTS.syllables[meter][0]
						meter = CONSTANTS.syllables[meter][1]
					}

					const line = STATE.poem[lineNumber]

				// rhyme options
					const rhymeOptions = generateRhymeOptions(STATE.rhymes[rhyme])
					for (const i in rhymeOptions) {
						const rhymeSet = window.LINES[rhymeOptions[i]]
						for (const j in rhymeSet) {
							if (rhymeSet[j][rhythm]["_" + meter] == line) {
								return true
							}
						}
					}

				// still here?
					return false
			} catch (error) {console.log(error)}
		}

/*** poetry ***/
	/* generatePoem */
		function generatePoem(structure) {
			try {
				// reset
					STATE.poem = []
					STATE.rhymes = generateRhymes()
					STATE.structure = structure.length ? structure : generateFreeVerseStructure()
					STATE.form = getForm(STATE.structure)

				// create lines
					for (let i = 0; i < STATE.structure.length; i++) {
						STATE.poem[i] = generatePoemLine(i)
					}

				// display
					displayPoem()
			} catch (error) {console.log(error)}
		}

	/* generateFreeVerseStructure */
		function generateFreeVerseStructure() {
			try {
				// all available
					const lineCount = rangeRandom(CONSTANTS.freeverse.minimumLines, CONSTANTS.freeverse.maximumLines + 1)
					const rhymeSymbols = []
					const structure = []

				// loop through line count
					for (let i = 0; i < lineCount; i++) {
						// repeat a line
							if (i && chanceRandom(CONSTANTS.freeverse.lineRepeatChance)) {
								const repeatedLineNumber = rangeRandom(0, structure.length)
								structure.push(CONSTANTS.repeatSymbol + repeatedLineNumber)
								continue
							}

						// new line
							const rhythm = CONSTANTS.freeverse.rhythm // syllables
							const meter = chooseRandom(CONSTANTS.syllables)

						// first line
							if (!i) {
								rhymeSymbols.push(CONSTANTS.alphabet[0])
								structure.push(rhythm + meter + CONSTANTS.alphabet[0])
								continue
							}
						
						// rhyme with existing line
							if (chanceRandom(CONSTANTS.freeverse.rhymeRepeatChance)) {
								structure.push(rhythm + meter + chooseRandom(rhymeSymbols))
								continue
							}
						
						// new rhyme
							const nextRhyme = getNextLetter(rhymeSymbols)
							rhymeSymbols.push(nextRhyme)
							structure.push(rhythm + meter + nextRhyme)
					}

				// return
					return structure
			} catch (error) {console.log(error)}
		}

	/* generateRhymes */
		function generateRhymes() {
			try {
				// empty rhymes
					const rhymes = {}

				// loop through alphabet
					for (const a in CONSTANTS.alphabet) {
						// pick a random rhyme and ensure it's not already in use
							let randomRhyme = null
							do {
								randomRhyme = chooseRandom(window.LINES)
							} while (Object.keys(rhymes).find(function(r) { return rhymes[r] == randomRhyme }))
						
						// save
							rhymes[CONSTANTS.alphabet[a]] = randomRhyme
					}

				// return
					return rhymes
			} catch (error) {console.log(error)}
		}

	/* generatePoemLine */
		function generatePoemLine(lineNumber) {
			try {
				// reset attempts
					let attempts = CONSTANTS.attempts
					const lineStructure = STATE.structure[lineNumber]

				// break
					if (lineStructure == CONSTANTS.stanzaBreak) {
						return CONSTANTS.stanzaBreak
					}

				// repeat?
					if (lineStructure.indexOf(CONSTANTS.repeatSymbol) == 0) {
						const repeatLineNumber = Number(lineStructure.replace(CONSTANTS.repeatSymbol, ""))
						return STATE.poem[repeatLineNumber]
					}

				// new
					// parameters
						let rhythm = lineStructure.slice(0,1)
						let meter = lineStructure.slice(1,-1)
						let rhyme = lineStructure.slice(-1)

						if (rhythm == "s") {
							rhythm = CONSTANTS.syllables[meter][0]
							meter = CONSTANTS.syllables[meter][1]
						}

					// build rhyme options
						const rhymeOptions = generateRhymeOptions(STATE.rhymes[rhyme])

					// create line
						let newLine = null
						let newWords = []
						let newLastWord = ""
						do {
							newLine = chooseRandom(window.LINES[chooseRandom(rhymeOptions)])[rhythm]["_" + meter]
							newWords = newLine.split(/\s/g)
							newLastWord = newWords[newWords.length - 1].toLowerCase().replace(/[^a-z]/g, "")
							attempts--
						} while (attempts && STATE.poem.filter(function(line) {
							const lineWords = line.split(/\s/g)
							const lineLastWord = lineWords[lineWords.length - 1].toLowerCase().replace(/[^a-z]/g, "")
							return newLastWord == lineLastWord
						}).length)
						return newLine
			} catch (error) {console.log(error)}
		}

	/* generateRhymeOptions */
		function generateRhymeOptions(lastSyllable) {
			try {
				// build list of syllables
					const rhymeOptions = 		[lastSyllable]
					const vowels = 				lastSyllable.replace(CONSTANTS.consonantsRegex, "")
					const consonants = 			lastSyllable.replace(CONSTANTS.vowelsRegex, "")
					const similarVowels = 		[vowels].concat(CONSTANTS.rhymeControls.similarVowels[vowels])
					const similarConsonants = 	[consonants[0]].concat(CONSTANTS.rhymeControls.similarConsonants[consonants[0]])

				// rhymeControl tier
					switch (STATE.rhymeControl) {
						// tier 0 - similar vowels, any consonants
							case 0:
								for (const l in window.LINES) {
									if (rhymeOptions.includes(l)) { continue }

									const thisVowels = l.replace(CONSTANTS.consonantsRegex, "")

									if (similarVowels.includes(thisVowels)) {
										rhymeOptions.push(l)
									}
								}
							break

						// tier 1 - similar vowels, similar first consonant
							case 1:
								for (const l in window.LINES) {
									if (rhymeOptions.includes(l)) { continue }

									const thisVowels = l.replace(CONSTANTS.consonantsRegex, "")
									const thisConsonants = l.replace(CONSTANTS.vowelsRegex, "")

									if (similarVowels.includes(thisVowels)) {
										if (consonants[0] && similarConsonants.includes(thisConsonants[0])) { // similar first consonant
											rhymeOptions.push(l)
										}
										else if (!consonants[0] && CONSTANTS.rhymeControls.plurals.includes(thisConsonants)) { // no first consonant --> plural version
											rhymeOptions.push(l)
										}
										else if (CONSTANTS.rhymeControls.plurals.includes(consonants) && l == vowels) { // plural --> singular version
											rhymeOptions.push(l)
										}
									}
								}
							break

						// tier 2 - same vowel, similar first consonant
							case 2:
								for (const l in window.LINES) {
									if (rhymeOptions.includes(l)) { continue }

									const thisVowels = l.replace(CONSTANTS.consonantsRegex, "")
									const thisConsonants = l.replace(CONSTANTS.vowelsRegex, "")

									if (vowels == thisVowels) {
										if (consonants[0] && similarConsonants.includes(thisConsonants[0])) { // similar first consonant
											rhymeOptions.push(l)
										}
										else if (!consonants[0] && CONSTANTS.rhymeControls.plurals.includes(thisConsonants)) { // no first consonant --> plural version
											rhymeOptions.push(l)
										}
										else if (CONSTANTS.rhymeControls.plurals.includes(consonants) && l == vowels) { // plural --> singular version
											rhymeOptions.push(l)
										}
									}
								}
							break

						// tier 3 - same vowel, same first consonant (if any), else plus/minus plurals
							case 3:
								for (const l in window.LINES) {
									if (rhymeOptions.includes(l)) { continue }

									const thisVowels = l.replace(CONSTANTS.consonantsRegex, "")
									const thisConsonants = l.replace(CONSTANTS.vowelsRegex, "")

									if (vowels == thisVowels) {
										if (consonants[0] && consonants[0] == thisConsonants[0]) { // same first consonant
											rhymeOptions.push(l)
										}
										else if (!consonants[0] && CONSTANTS.rhymeControls.plurals.includes(thisConsonants)) { // no first consonant --> plural version
											rhymeOptions.push(l)
										}
										else if (CONSTANTS.rhymeControls.plurals.includes(consonants) && l == vowels) { // plural --> singular version
											rhymeOptions.push(l)
										}
									}
								}
							break

						// tier 4 - same vowel, same consonants (exact)
							case 4:
							default:
								// only the exact syllable
							break
					}

				// return
					return rhymeOptions
			} catch (error) {console.log(error)}
		}

/*** interacting with poems ***/
	/* removeLine */
		function removeLine(event) {
			try {
				// get line number
					const lineNumber = Number(event.target.closest(".poem-line").id.split("-")[2])

				// remove from poem
					STATE.poem.splice(lineNumber, 1)
					STATE.structure.splice(lineNumber, 1)
					STATE.form = getForm(STATE.structure)

				// redisplay
					displayPoem()
			} catch (error) {console.log(error)}
		}

	/* addLine */
		function addLine(event) {
			try {
				// get line number
					const lineNumber = Number(event.target.closest(".poem-line").id.split("-")[2])

				// insert stanza break
					STATE.poem.splice(lineNumber + 1, 0, CONSTANTS.stanzaBreak)
					STATE.structure.splice(lineNumber + 1, 0, CONSTANTS.stanzaBreak)
					STATE.form = getForm(STATE.structure)

				// redisplay
					displayPoem()
			} catch (error) {console.log(error)}
		}

	/* moveLineUp */
		function moveLineUp(event) {
			try {
				// get line number
					const lineNumber = Number(event.target.closest(".poem-line").id.split("-")[2])

				// first line?
					if (lineNumber <= 0) {
						return
					}

				// swap with previous line from poem
					const line = STATE.poem[lineNumber]
					STATE.poem[lineNumber] = STATE.poem[lineNumber - 1]
					STATE.poem[lineNumber - 1] = line
					
					const structure = duplicateObject(STATE.structure[lineNumber])
					STATE.structure[lineNumber] = duplicateObject(STATE.structure[lineNumber - 1])
					STATE.structure[lineNumber - 1] = structure
					
					STATE.form = getForm(STATE.structure)

				// fix repeats
					regenerateRepeats()

				// redisplay
					displayPoem()
			} catch (error) {console.log(error)}
		}

	/* moveLineDown */
		function moveLineDown(event) {
			try {
				// get line number
					const lineNumber = Number(event.target.closest(".poem-line").id.split("-")[2])

				// first line?
					if (lineNumber >= STATE.poem.length - 1) {
						return
					}

				// swap with previous line from poem
					const line = STATE.poem[lineNumber]
					STATE.poem[lineNumber] = STATE.poem[lineNumber + 1]
					STATE.poem[lineNumber + 1] = line
					
					const structure = duplicateObject(STATE.structure[lineNumber])
					STATE.structure[lineNumber] = duplicateObject(STATE.structure[lineNumber + 1])
					STATE.structure[lineNumber + 1] = structure
					
					STATE.form = getForm(STATE.structure)

				// fix repeats
					regenerateRepeats()

				// redisplay
					displayPoem()
			} catch (error) {console.log(error)}
		}

	/* regenerateLine */
		function regenerateLine(event) {
			try {
				// get line number
					const lineNumber = Number(event.target.closest(".poem-line").id.split("-")[2])

				// regenerate line
					STATE.poem[lineNumber] = generatePoemLine(lineNumber)

				// fix repeats
					regenerateRepeats()

				// redisplay
					displayPoem()
			} catch (error) {console.log(error)}
		}

	/* changeLineMain */
		function changeLineMain(event) {
			try {
				// get line number
					const lineNumber = Number(event.target.closest(".poem-line").id.split("-")[2])

				// get value
					const value = event.target.value

				// change to stanza break
					if (value == CONSTANTS.stanzaBreak) {
						STATE.poem[lineNumber] = CONSTANTS.stanzaBreak
						STATE.structure[lineNumber] = CONSTANTS.stanzaBreak
						STATE.form = getForm(STATE.structure)
						regenerateRepeats()
						displayPoem()
						return
					}

				// change to repeat
					if (!isNaN(value)) {
						STATE.poem[lineNumber] = STATE.poem[value]
						STATE.structure[lineNumber] = CONSTANTS.repeatSymbol + value
						STATE.form = getForm(STATE.structure)
						regenerateRepeats()
						displayPoem()
						return
					}

				// random rhythm / meter / rhyme
					const rhythm = chooseRandom(CONSTANTS.rhythms)
					const meter = chooseRandom(CONSTANTS.meters)
					const rhyme = chooseRandom(CONSTANTS.alphabet)
					STATE.structure[lineNumber] = rhythm + meter + rhyme
					STATE.form = getForm(STATE.structure)
				
				// regenerate line
					STATE.poem[lineNumber] = generatePoemLine(lineNumber)

				// fix repeats
					regenerateRepeats()

				// redisplay
					displayPoem()
			} catch (error) {console.log(error)}
		}

	/* changeLineRhythm */
		function changeLineRhythm(event) {
			try {
				// get line number
					const lineNumber = Number(event.target.closest(".poem-line").id.split("-")[2])

				// get value
					const value = event.target.value

				// swap
					if (value == "s") { // syllables
						event.target.closest(".poem-line").querySelector(".poem-line-meter").setAttribute("hidden", true)
						event.target.closest(".poem-line").querySelector(".poem-line-syllables").removeAttribute("hidden")
					}
					else { // iambic / anapestic
						event.target.closest(".poem-line").querySelector(".poem-line-syllables").setAttribute("hidden", true)
						event.target.closest(".poem-line").querySelector(".poem-line-meter").removeAttribute("hidden")
					}

				// update structure
					let lineStructure = STATE.structure[lineNumber]
					let meter = lineStructure.slice(1,-1)
					if (value !== "s" && !CONSTANTS.meters[meter]) {
						meter = chooseRandom(CONSTANTS.meters)
					}

					STATE.structure[lineNumber] = value + meter + lineStructure.slice(-1)
					STATE.form = getForm(STATE.structure)

				// regenerate line
					STATE.poem[lineNumber] = generatePoemLine(lineNumber)

				// fix repeats
					regenerateRepeats()

				// redisplay
					displayPoem()
			} catch (error) {console.log(error)}
		}

	/* changeLineMeter */
		function changeLineMeter(event) {
			try {
				// get line number
					const lineNumber = Number(event.target.closest(".poem-line").id.split("-")[2])

				// get value
					const value = event.target.value

				// update structure
					let lineStructure = STATE.structure[lineNumber]
					STATE.structure[lineNumber] = lineStructure.slice(0,1) + value + lineStructure.slice(-1)
					STATE.form = getForm(STATE.structure)

				// regenerate line
					STATE.poem[lineNumber] = generatePoemLine(lineNumber)

				// fix repeats
					regenerateRepeats()

				// redisplay
					displayPoem()
			} catch (error) {console.log(error)}
		}

	/* changeLineRhyme */
		function changeLineRhyme(event) {
			try {
				// get line number
					const lineNumber = Number(event.target.closest(".poem-line").id.split("-")[2])

				// get value
					const value = event.target.value

				// update structure
					let lineStructure = STATE.structure[lineNumber]
					STATE.structure[lineNumber] = lineStructure.slice(0,-1) + value
					STATE.form = getForm(STATE.structure)

				// regenerate line
					STATE.poem[lineNumber] = generatePoemLine(lineNumber)
					
				// fix repeats
					regenerateRepeats()

				// redisplay
					displayPoem()
			} catch (error) {console.log(error)}
		}

	/* regenerateRepeats */
		function regenerateRepeats() {
			try {
				// loop through all lines
					for (let i = 0; i < STATE.structure.length; i++) {
						// not a repeat
							if (STATE.structure[i].indexOf(CONSTANTS.repeatSymbol) !== 0) {
								continue
							}
						
						// identify the line this is being repeated
							const repeatLineNumber = Number(STATE.structure[i].replace(CONSTANTS.repeatSymbol, ""))

						// repeating self? --> to stanza break
							if (i == repeatLineNumber) {
								STATE.structure[i] = CONSTANTS.stanzaBreak
								STATE.poem[i] = CONSTANTS.stanzaBreak
								continue
							}

						// regenerate repeat
							STATE.poem[i] = generatePoemLine(i)
					}
			} catch (error) {console.log(error)}
		}

/*** displays ***/
	/* displayStart */
		displayStart()
		function displayStart() {
			try {
				// form selection
					displayForms()

				// query parameters
					if (window.location.search && window.location.search.length) {
						// get parameters
							const queryParameters = {}
							const searchPairs = window.location.search.slice(1).split("&")
							for (const i in searchPairs) {
								const pair = searchPairs[i].split("=")
								queryParameters[pair[0].trim().toLowerCase()] = pair[1].trim().toLowerCase().replace(/\%20/g, " ").replace(/\+/g, " ")
							}

						// rhyme controls
							if (queryParameters.rhyme && 0 <= Number(queryParameters.rhyme) && Number(queryParameters.rhyme) < CONSTANTS.rhymeControls.steps) {
								STATE.rhymeControl = Number(queryParameters.rhyme)
							}

						// get form
							if (queryParameters.form) {
								if (Object.keys(CONSTANTS.forms).includes(queryParameters.form)) {
									displayToast("creating " + queryParameters.form)
									generatePoem(duplicateObject(CONSTANTS.forms[queryParameters.form]))
									return
								}

								displayToast("unknown form")
								return
							}

						// get structure
							if (queryParameters.structure) {
								const structure = queryParameters.structure.trim().toLowerCase().replace(/\%20/g, " ").replace(/\+/g, " ").split(/\s?,\s?/g)

								if (isValidStructure(structure)) {
									displayToast("creating poem of specified structure")
									generatePoem(structure)
									return
								}

								displayToast("invalid structure")
								return
							}
					}

				// generate a random poem of a random form
					refreshPoem()
			} catch (error) {console.log(error)}
		}

	/* displayForms */
		function displayForms() {
			try {
				// loop through poem forms
					for (const i in CONSTANTS.formGroups) {
						const optGroup = document.createElement("optgroup")
							optGroup.label = i
						ELEMENTS.controls.forms.appendChild(optGroup)

						for (const j in CONSTANTS.formGroups[i]) {
							const option = document.createElement("option")
								option.value = option.innerText = CONSTANTS.formGroups[i][j]
							optGroup.appendChild(option)
						}
					}

				// set random form
					ELEMENTS.controls.forms.value = chooseRandom(CONSTANTS.forms)

				// set rhyme default
					STATE.rhymeControl = CONSTANTS.rhymeControls.default

					ELEMENTS.rhymeControls.maximum.value = CONSTANTS.rhymeControls.steps - 1
					ELEMENTS.rhymeControls.input.max = CONSTANTS.rhymeControls.steps - 1
					ELEMENTS.rhymeControls.input.value = STATE.rhymeControl
			} catch (error) {console.log(error)}
		}

	/* displayToast */
		function displayToast(message) {
			try {
				// existing timeout
					clearTimeout(ELEMENTS.controls.toastTimeout)

				// message + visible
					ELEMENTS.controls.toast.innerText = message
					ELEMENTS.controls.toast.setAttribute("visible", true)

				// hide again
					ELEMENTS.controls.toastTimeout = setTimeout(function() {
						ELEMENTS.controls.toast.removeAttribute("visible")
					}, CONSTANTS.successWait)
			} catch (error) {console.log(error)}
		}

	/* displayPoem */
		function displayPoem() {
			try {
				// clear
					ELEMENTS.poem.innerHTML = ""

				// display lines
					for (let i = 0; i < STATE.poem.length; i++) {
						const row = displayRow(i)
						ELEMENTS.poem.appendChild(row)
					}

				// form
					ELEMENTS.controls.forms.value = STATE.form
			} catch (error) {console.log(error)}
		}

	/* displayRow */
		function displayRow(index) {
			try {
				// row
					const row = document.createElement("div")
						row.className = "poem-line"
						row.id = "poem-line-" + index

				// content
					const contentCell = document.createElement("div")
						contentCell.className = "poem-content"
						contentCell.innerText = (STATE.poem[index] == CONSTANTS.stanzaBreak ? "" : STATE.poem[index])
					row.appendChild(contentCell)

				// structure
					const structureCell = document.createElement("div")
						structureCell.className = "poem-structure"
					row.appendChild(structureCell)

					// main
						const mainSelect = document.createElement("select")
							mainSelect.className = "poem-line-main"
							mainSelect.title = "line type"
							mainSelect.addEventListener(TRIGGERS.input, changeLineMain)
						structureCell.appendChild(mainSelect)

							const nonrepeatOption = document.createElement("option")
								nonrepeatOption.value = null
								nonrepeatOption.innerText = "line"
							mainSelect.appendChild(nonrepeatOption)

							const stanzabreakOption = document.createElement("option")
								stanzabreakOption.value = CONSTANTS.stanzaBreak
								stanzabreakOption.innerText = "stanza break"
							mainSelect.appendChild(stanzabreakOption)

							for (let i = 0; i < index; i++) {
								const repeatOption = document.createElement("option")
									repeatOption.value = i
									repeatOption.innerText = "line " + (i + 1) + " repeat"
								mainSelect.appendChild(repeatOption)
							}

						let hasStructureParameters = false
						if (STATE.poem[index] == CONSTANTS.stanzaBreak) {
							mainSelect.value = CONSTANTS.stanzaBreak
						}
						else if (STATE.structure[index].indexOf(CONSTANTS.repeatSymbol) == 0) {
							mainSelect.value = Number(STATE.structure[index].replace(CONSTANTS.repeatSymbol, ""))
						}
						else {
							mainSelect.value = null
							hasStructureParameters = true
						}

					// rhythm
						if (hasStructureParameters) {
							const rhythmSelect = document.createElement("select")
								rhythmSelect.className = "poem-line-rhythm"
								rhythmSelect.title = "rhythm (syllables per beat)"
								rhythmSelect.addEventListener(TRIGGERS.input, changeLineRhythm)
							structureCell.appendChild(rhythmSelect)

								for (const r in CONSTANTS.rhythms) {
									const rhythmOption = document.createElement("option")
										rhythmOption.value = r
										rhythmOption.innerText = CONSTANTS.rhythms[r]
									rhythmSelect.appendChild(rhythmOption)
								}

							rhythmSelect.value = STATE.structure[index].slice(0,1)
						}

					// meter
						if (hasStructureParameters) {
							const meterSelect = document.createElement("select")
								meterSelect.className = "poem-line-meter"
								meterSelect.title = "meter (beats per line)"
								meterSelect.addEventListener(TRIGGERS.input, changeLineMeter)
							structureCell.appendChild(meterSelect)

								for (const m in CONSTANTS.meters) {
									const meterOption = document.createElement("option")
										meterOption.value = m
										meterOption.innerText = CONSTANTS.meters[m]
									meterSelect.appendChild(meterOption)
								}

							if (STATE.structure[index][0] == "s") {
								meterSelect.setAttribute("hidden", true)
							}
							else {
								meterSelect.value = STATE.structure[index].slice(1,-1)
							}
						}

					// syllables
						if (hasStructureParameters) {
							const syllableSelect = document.createElement("select")
								syllableSelect.className = "poem-line-syllables"
								syllableSelect.title = "syllables (beats per line)"
								syllableSelect.addEventListener(TRIGGERS.input, changeLineMeter)
							structureCell.appendChild(syllableSelect)

								for (const s in CONSTANTS.syllables) {
									const syllableOption = document.createElement("option")
										syllableOption.value = syllableOption.innerText = s
									syllableSelect.appendChild(syllableOption)
								}

							if (STATE.structure[index][0] == "s") {
								syllableSelect.value = STATE.structure[index].slice(1,-1)
							}
							else {
								syllableSelect.setAttribute("hidden", true)
							}
						}

					// rhyme
						if (hasStructureParameters) {
							const rhymeSelect = document.createElement("select")
								rhymeSelect.className = "poem-line-rhyme"
								rhymeSelect.title = "rhyme (line groups)"
								rhymeSelect.addEventListener(TRIGGERS.input, changeLineRhyme)
							structureCell.appendChild(rhymeSelect)

								for (const a in CONSTANTS.alphabet) {
									const rhymeOption = document.createElement("option")
										rhymeOption.value = CONSTANTS.alphabet[a]
										rhymeOption.innerText = CONSTANTS.alphabet[a]
									rhymeSelect.appendChild(rhymeOption)
								}

							rhymeSelect.value = STATE.structure[index].slice(-1)
						}

				// actions
					const actionsCell = document.createElement("div")
						actionsCell.className = "poem-actions"
					row.appendChild(actionsCell)

					// refresh
						const refreshButton = document.createElement("button")
							refreshButton.className = "poem-line-refresh"
							refreshButton.innerHTML = CONSTANTS.svg.rotate
							refreshButton.title = "regenerate line"
							refreshButton.addEventListener(TRIGGERS.click, regenerateLine)
						actionsCell.appendChild(refreshButton)

						if (!hasStructureParameters) {
							refreshButton.setAttribute("invisible", true)
						}

					// up/down
						const upButton = document.createElement("button")
							upButton.className = "poem-line-up"
							upButton.innerHTML = CONSTANTS.svg.up
							upButton.title = "move line up"
							upButton.addEventListener(TRIGGERS.click, moveLineUp)
						actionsCell.appendChild(upButton)

						const downButton = document.createElement("button")
							downButton.className = "poem-line-down"
							downButton.innerHTML = CONSTANTS.svg.down
							downButton.title = "move line down"
							downButton.addEventListener(TRIGGERS.click, moveLineDown)
						actionsCell.appendChild(downButton)

					// add/remove
						const removeButton = document.createElement("button")
							removeButton.className = "poem-line-remove"
							removeButton.innerHTML = CONSTANTS.svg.minus
							removeButton.title = "remove line"
							removeButton.addEventListener(TRIGGERS.click, removeLine)
						actionsCell.appendChild(removeButton)

						const addButton = document.createElement("button")
							addButton.className = "poem-line-add"
							addButton.innerHTML = CONSTANTS.svg.plus
							addButton.title = "add line"
							addButton.addEventListener(TRIGGERS.click, addLine)
						actionsCell.appendChild(addButton)

				// return
					return row
			} catch (error) {console.log(error)}
		}
