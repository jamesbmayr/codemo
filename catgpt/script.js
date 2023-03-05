/*** globals ***/
	/* triggers */
		const TRIGGERS = {
			submit: "submit",
			click: "click",
		}

	/* elements */
		const ELEMENTS = {
			container: document.querySelector("#container"),
			header: document.querySelector("#header"),
			headerInner: document.querySelector("#header-inner"),
			clickables: Array.from(document.querySelectorAll(".header-column-text.clickable")),
			reset: document.querySelector("#reset"),
			history: document.querySelector("#history"),
			form: document.querySelector("#form"),
			formInput: document.querySelector("#form-input"),
			formSubmit: document.querySelector("#form-submit"),
			thinking: document.querySelector("#footer-thinking")
		}

	/* constants */
		const CONSTANTS = {
			msPerThink: 200, // ms
			msPerCharacter: 75, // ms
			waitAfterComplete: 500, // ms
			waitToCollapse: 500, // ms
			delay: {
				minimum: 500, // ms
				maximum: 2000 // ms
			},
			feetPerMessage: { // groups
				minimum: 1,
				maximum: 16
			},
			keysPerFoot: { // keypresses
				minimum: 1,
				maximum: 40
			},
			settlingKeys: { // keypresses
				minimum: 0,
				maximum: 3
			},
			keys: {
				"`": ["↹", "1"],
				"1": ["`", "↹", "q", "2"],
				"2": ["1", "q", "w", "3"],
				"3": ["2", "w", "e", "4"],
				"4": ["3", "e", "r", "5"],
				"5": ["4", "r", "t", "6"],
				"6": ["5", "t", "y", "7"],
				"7": ["6", "y", "u", "8"],
				"8": ["7", "u", "i", "9"],
				"9": ["8", "i", "o", "0"],
				"0": ["9", "o", "p", "-"],
				"-": ["0", "p", "[", "="],
				"=": ["-", "[", "]", "⌫"],
				"⌫": ["=", "]", "∖"], // backspace
				"↹": ["`", "⇪", "q", "1"], // tab
				"q": ["1", "↹", "⇪", "a", "w", "2"],
				"w": ["2", "q", "a", "s", "e", "3"],
				"e": ["3", "w", "s", "d", "r", "4"],
				"r": ["4", "e", "d", "f", "t", "5"],
				"t": ["5", "r", "f", "g", "y", "6"],
				"y": ["6", "t", "g", "h", "u", "7"],
				"u": ["7", "y", "h", "j", "i", "8"],
				"i": ["8", "u", "j", "k", "o", "9"],
				"o": ["9", "i", "k", "l", "p", "0"],
				"p": ["0", "o", "l", ";", "[", "-"],
				"[": ["-", "p", ";", "'", "]", "="],
				"]": ["=", "[", "'", "⏎", "∖", "⌫"],
				"∖": ["⌫", "]", "⏎"], // backslash
				"⇪": ["↹", "⇧", "a", "q"], // caps lock
				"a": ["q", "⇪", "⇧", "z", "s", "w"],
				"s": ["w", "a", "z", "x", "d", "e"],
				"d": ["e", "s", "x", "c", "f", "r"],
				"f": ["r", "d", "c", "v", "g", "t"],
				"g": ["t", "f", "v", "b", "h", "y"],
				"h": ["y", "g", "b", "n", "j", "u"],
				"j": ["u", "h", "n", "m", "k", "i"],
				"k": ["i", "j", "m", ",", "l", "o"],
				";": ["p", "l", ".", "/", "'", "["],
				"'": ["[", ";", "/", "⇧", "⏎", "]"],
				"⏎": ["]", "'", "⇧", "∖"], // enter
				"⇧": [ // shift
					["⇪", "z", "a"],
					["'", "/", "⏎"],
				],
				"z": ["a", "⇧", "x", "s"],
				"x": ["s", "z", " ", "c", "d"],
				"c": ["d", "x", " ", "v", "f"],
				"v": ["f", "c", " ", " ", "b", "g"],
				"b": ["g", "v", " ", " ", "n", "h"],
				"n": ["h", "b", " ", " ", "m", "j"],
				"m": ["j", "n", " ", " ", ",", "k"],
				",": ["k", "m", " ", ".", "l"],
				".": ["l", ",", " ", "/", ";"],
				"/": [";", ".", "⇧", "'"],
				" ": [ // space
					["x", "c", "v"],
					["c", "v", "b"],
					["v", "b", "n"],
					["b", "n", "m"],
					["n", "m", ","],
					["m", ",", "."]
				]
			},
			extraKeyWeights: ["⌫", "⏎", "⇪", "⇧", "⇧", "⇧", " ", " ", " ", " ", " "],
			extraKeyWaits: ["", "", "", "", "", "", "", ""],
			capsMap: {
				"`": "~",
				"1": "!",
				"2": "@",
				"3": "#",
				"4": "$",
				"5": "%",
				"6": "^",
				"7": "&",
				"8": "*",
				"9": "(",
				"0": ")",
				"-": "_",
				"=": "+",
				"[": "{",
				"]": "}",
				"∖": "|",
				";": ":",
				"'": '"',
				",": "<",
				".": ">",
				"/": "?"
			},
			suggestions: [
				"Teach me about advanced calculus.",
				"Let's plan a vacation to a faraway land.",
				"How do you solve a jigsaw puzzle?",
				"How do we fix the economy?",
				"Plan an elaborate heist for the art museum.",
				"Explain the difference between nuance and subtlety.",
				"Revise my resumé, since my last job was automated.",
				"Write my personal essay for my college application.",
				"Review my taxes before I file them.",
				"Solve this equation: 2 + 2.",
				"Define Newton's Second Law of Thermodynamics in your own words.",
				"Compose the lyrics to a baroque aria.",
				"Please diagnose the following symptoms:",
				"What's beyond the furthest reaches of the cosmos?",
				"Can you define ontology?",
				"How far can the average dog throw a ball?",
				"Paint me a picture of Vienna in the spring.",
				"What is the solution to the trolley problem?",
				"Transform a classic work of literary fiction into an advertising campaign.",
				"Which article of the US Constitution uses the most semicolons?",
				"Who's your favorite foreign post-grunge pop-punk band?",
				"Rock, paper, or scissors?",
				"Does the set of all sets that do not contain themselves contain itself?",
				"Tell me about the new space telescope's discovery of exoplanets.",
				"Do you love me?",
				"Could you explain the advantages of a Shakespearean sonnet over a Petrarchan sonnet?",
				"Continue this sequence: 1, 1, 2, 3, 5, 8...",
				"What movies are playing right now in my area?",
				"Do you have a favorite muffin recipe?",
				"Create a compression algorithm in python that mostly works but occasionally says something offensive.",
				"Is there an all-powerful creator? Please cite your sources.",
				"What time is it?"
			],
			asciiUser: 	`     ` + `\n` +
						` YOU ` + `\n` +
						`     `,
			asciiCat: 	`/\\_/\\` + `\n` +
						` . . ` + `\n` +
						`= T =`,
			asciiCatPet: [ 	`/\\_/\\` + `\n` +
							` | | ` + `\n` +
							`= T =`,
						 	`/\\_/\\` + `\n` +
							`=^.^=` + `\n` +
							`\\ v /`,
							`/\\_/\\` + `\n` +
							`=-.-=` + `\n` +
							`\\ ^ /`,
							`/\\_/\\` + `\n` +
							` O O ` + `\n` +
							`= T =`,
							`/\\_/\\` + `\n` +
							` _ _ ` + `\n` +
							`= T =`,
							`/\\_/\\` + `\n` +
							` @.@ ` + `\n` +
							`= ~ =`,
							`/\\_/\\` + `\n` +
							`=*.*=` + `\n` +
							`\\ w /`,
							`/\\_/\\` + `\n` +
							`=°.°=` + `\n` +
							`\\ ° /`,
						]
		}
		CONSTANTS.weightedKeys = [...Object.keys(CONSTANTS.keys), ...CONSTANTS.extraKeyWeights, ...CONSTANTS.extraKeyWaits]

	/* state */
		const STATE = {
			capslock: false,
			shift: false,
			keystrokeIndex: 0,
			history: [],
			typingLoop: null,
			thinkingLoop: null
		}

/*** interaction ***/
	/* resetSession */
		ELEMENTS.reset.addEventListener(TRIGGERS.click, resetSession)
		resetSession()
		function resetSession() {
			try {
				// stop animations
					clearInterval(STATE.thinkingLoop)
					STATE.thinkingLoop = null
					clearInterval(STATE.typingLoop)
					STATE.typingLoop = null
					ELEMENTS.thinking.innerHTML = ""

				// reset state
					STATE.capslock = false
					STATE.shift = false
					STATE.keystrokeIndex = 0
					STATE.history = []
					ELEMENTS.history.innerHTML = ""

				// loop through clickables
					const suggestions = []
					for (const c in ELEMENTS.clickables) {
						let suggestion = ""
						do {
							suggestion = '"' + chooseRandom(CONSTANTS.suggestions) + '" &rarr;'
						} while (suggestions.includes(suggestion))
						suggestions.push(suggestion)

						ELEMENTS.clickables[c].innerHTML = suggestion
						ELEMENTS.clickables[c].addEventListener(TRIGGERS.click, clickSuggestion)
					}

				// show header
					ELEMENTS.header.removeAttribute("collapse")

				// get ready
					ELEMENTS.formInput.focus()
			} catch (error) {console.log(error)}
		}

	/* submitPrompt */
		ELEMENTS.form.addEventListener(TRIGGERS.submit, submitPrompt)
		function submitPrompt(event) {
			try {
				// already typing
					if (STATE.typingLoop) {
						return
					}

				// get input text
					const inputText = ELEMENTS.formInput.value.trim() || ""

				// no text
					if (!inputText.length) {
						return
					}

				// first prompt --> session timestamp
					if (!STATE.history.length) {
						const sessionElement = document.createElement("div")
							sessionElement.className = "history-session"
						sessionElement.innerHTML = "session start: " + new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
						ELEMENTS.history.appendChild(sessionElement)

						ELEMENTS.headerInner.style.height = ELEMENTS.headerInner.scrollHeight + "px"
						setTimeout(function() {
							ELEMENTS.header.setAttribute("collapse", true)
							ELEMENTS.headerInner.style.height = "auto"
						}, CONSTANTS.waitToCollapse)
					}

				// display user prompt
					const userPrompt = {
						isUser: true,
						text: inputText,
						element: null
					}
					STATE.history.push(userPrompt)
					userPrompt.element = createMessageElement(userPrompt)
					ELEMENTS.history.appendChild(userPrompt.element)

				// scroll to bottom
					const containerHeight = ELEMENTS.container.scrollHeight
					ELEMENTS.container.scrollTo(0, 2 * containerHeight)

				// clear input
					ELEMENTS.formInput.value = ""
					ELEMENTS.formInput.focus()
					ELEMENTS.formInput.setAttribute("disabled", true)
					ELEMENTS.formSubmit.setAttribute("disabled", true)

				// thinking loop
					STATE.thinkingLoop = setInterval(animateThinking, CONSTANTS.msPerThink)
					STATE.keystrokeIndex = 0

				// wait to think
					setTimeout(function() {
						// generate a response
							const catResponse = {
								isUser: false,
								text: "",
								keystrokes: generateResponse(userPrompt),
								element: null
							}
							STATE.history.push(catResponse)
							catResponse.element = createMessageElement(catResponse)
							ELEMENTS.history.appendChild(catResponse.element)

						// animate
							STATE.typingLoop = setInterval(animateTyping, CONSTANTS.msPerCharacter)
					}, getRandomInRange(CONSTANTS.delay.minimum, CONSTANTS.delay.maximum))
			} catch (error) {console.log(error)}
		}

	/* clickSuggestion */
		function clickSuggestion(event) {
			try {
				// get suggestion
					const suggestion = event.target.innerHTML.slice(1, -3)
				
				// add to input
					ELEMENTS.formInput.value = suggestion

				// submit
					submitPrompt()
			} catch (error) {console.log(error)}
		}

/*** "artificial intelligence" ***/
	/* generateResponse */
		function generateResponse({isUser, text, element}) {
			try {
				// output
					const keystrokes = []

				// feet
					const feet = getRandomInRange(CONSTANTS.feetPerMessage.minimum, CONSTANTS.feetPerMessage.maximum)
					for (let f = 0; f < feet; f++) {
						const targetKey = chooseRandom(CONSTANTS.weightedKeys)
						const targetKeyCount = getRandomInRange(CONSTANTS.keysPerFoot.minimum, CONSTANTS.keysPerFoot.maximum)
						const settlingKeyCount = targetKey.length ? Math.min(targetKeyCount, getRandomInRange(CONSTANTS.settlingKeys.minimum, CONSTANTS.settlingKeys.maximum)) : 0

						for (let s = 0; s < settlingKeyCount; s++) {
							const key = chooseRandom(CONSTANTS.keys[targetKey])
							keystrokes.push(Array.isArray(key) ? chooseRandom(key) : key)
						}

						for (let t = settlingKeyCount; t < targetKeyCount; t++) {
							keystrokes.push(targetKey)
						}
					}

				// return
					return keystrokes
			} catch (error) {console.log(error)}
		}

	/* getUpdatedText */
		function getUpdatedText(text, keystroke) {
			try {
				// no text
					if (!text || !text.length) {
						text = ""
					}

				// no keystroke
					if (!keystroke || !keystroke.length) {
						return text
					}

				// stop shifting
					const shift = STATE.shift
					STATE.shift = false

				// backspace
					if (keystroke == "⌫") {
						return text.slice(0, -1)
					}

				// state change
					if (keystroke == "⇪") {
						STATE.capslock = !STATE.capslock
						return text
					}
					if (keystroke == "⇧") {
						STATE.shift = true
						return text
					}

				// normal character
					return text + (
						(STATE.capslock || shift) ? keystroke.toUpperCase() :
						shift ? (CONSTANTS.capsMap[keystroke] || keystroke.toUpperCase()) : 
						keystroke
					)
			} catch (error) {console.log(error)}
		}

	/* provideFeedback */
		function provideFeedback(event) {
			try {
				// get the elements
					const feedbackButton = event.target.closest(".history-block-feedback")
					const historyElement = feedbackButton.closest(".history-block")
					const icon = historyElement.querySelector(".history-block-icon")

				// update button
					feedbackButton.setAttribute("active", true)

				// update cat picture
					icon.innerHTML = chooseRandom(CONSTANTS.asciiCatPet)

				// refocus
					ELEMENTS.formInput.focus()
			} catch (error) {console.log(error)}
		}

/*** animation ***/
	/* createMessageElement */
		function createMessageElement({isUser, text, element}) {
			try {
				// element
					const block = document.createElement("div")
						block.className = "history-block"
						block.setAttribute(isUser ? "user" : "typing", true)

				// inner
					const blockInner = document.createElement("div")
						blockInner.className = "history-block-inner"
					block.appendChild(blockInner)

				// icon
					const icon = document.createElement("div")
						icon.className = "history-block-icon"
						icon.innerHTML = isUser ? CONSTANTS.asciiUser : CONSTANTS.asciiCat
					blockInner.appendChild(icon)

				// text
					const blockText = document.createElement("div")
						blockText.className = "history-block-text"
						blockText.innerHTML = text || ""
					blockInner.appendChild(blockText)

				// feedback button
					if (!isUser) {
						const feedbackOuter = document.createElement("div")
							feedbackOuter.className = "history-block-feedback-outer"
						blockInner.appendChild(feedbackOuter)

						const feedbackButton = document.createElement("button")
							feedbackButton.className = "history-block-feedback"
							feedbackButton.innerHTML = "&#x270b;"
							feedbackButton.title = "pet"
							feedbackButton.addEventListener(TRIGGERS.click, provideFeedback)
						feedbackOuter.appendChild(feedbackButton)
					}

				// return
					return block
			} catch (error) {console.log(error)}
		}

	/* animateTyping */
		function animateTyping() {
			try {
				// message element
					const historyEntry = STATE.history[STATE.history.length - 1]
					const textBlock = historyEntry.element.querySelector(".history-block-text")
					const currentText = getTextFromHTML(textBlock.innerHTML)

				// done
					if (STATE.keystrokeIndex >= historyEntry.keystrokes.length) {
						// end loop
							clearInterval(STATE.typingLoop)
							STATE.typingLoop = null

						// end thinking
							clearInterval(STATE.thinkingLoop)
							STATE.thinkingLoop = null
							ELEMENTS.thinking.innerHTML = ""

						// remove |
							setTimeout(function() {
								// final update to remove |
									historyEntry.element.removeAttribute("typing")

								// scroll to bottom
									const containerHeight = ELEMENTS.container.scrollHeight
									ELEMENTS.container.scrollTo(0, 2 * containerHeight)

								// re-enable input
									ELEMENTS.formInput.removeAttribute("disabled")
									ELEMENTS.formSubmit.removeAttribute("disabled")
									ELEMENTS.formInput.focus()
							}, CONSTANTS.waitAfterComplete)
							return
					}

				// update text
					textBlock.innerHTML = getHTMLFromText(getUpdatedText(currentText, historyEntry.keystrokes[STATE.keystrokeIndex]))

				// scroll to bottom
					const containerHeight = ELEMENTS.container.scrollHeight
					ELEMENTS.container.scrollTo(0, 2 * containerHeight)

				// next
					STATE.keystrokeIndex++
			} catch (error) {console.log(error)}
		}

	/* animateThinking */
		function animateThinking() {
			try {
				// get current ellipsis
					const length = ELEMENTS.thinking.innerHTML.length
				
				// reset
					if (length == 3) {
						ELEMENTS.thinking.innerHTML = ""
						return
					}

				// increment
					ELEMENTS.thinking.innerHTML += "•"
			} catch (error) {console.log(error)}
		}

/*** tools ***/
	/* getRandomInRange */
		function getRandomInRange(minimum, maximum) {
			try {
				return Math.floor(Math.random() * (maximum - minimum)) + minimum
			} catch (error) {console.log(error)}
		}

	/* chooseRandom */
		function chooseRandom(list) {
			try {
				return list[Math.floor(Math.random() * list.length)]
			} catch (error) {console.log(error)}
		}

	/* getTextFromHTML */
		function getTextFromHTML(html) {
			try {
				return (html.replace(/\&emsp\;/g, "↹") // tab
							.replace(/\<br\>/g, "⏎") // enter
							.replace(/\&ensp\;/g, " ") // space
							.replace(/\\/g, "∖") // backslash
						)
			} catch (error) {console.log(error)}
		}

	/* getHTMLFromText */
		function getHTMLFromText(text) {
			try {
				return (text.replace(/\↹/g, "&emsp;") // tab
							.replace(/\⏎/g, "<br>") // enter
							.replace(/[ ]/g, "&ensp;") // space
							.replace(/\∖/g, "\\") // backslash
						)
			} catch (error) {console.log(error)}
		}
