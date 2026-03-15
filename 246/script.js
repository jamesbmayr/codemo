/*** globals ***/
	/* triggers */
		const TRIGGERS = {
			submit: "submit",
			click: "click"
		}

	/* elements */
		const ELEMENTS = {
			form: {
				element: document.querySelector("#form"),
				a: document.querySelector("#form-a"),
				b: document.querySelector("#form-b"),
				c: document.querySelector("#form-c"),
				hypothesis: document.querySelector("#form-hypothesis"),
				test: document.querySelector("#form-test"),
				error: document.querySelector("#form-error"),
			},
			results: document.querySelector("#results"),
			rule: {
				reveal: document.querySelector("#rule-reveal"),
				explanation: document.querySelector("#rule-explanation"),
				history: document.querySelector("#rule-history"),
				restart: document.querySelector("#rule-restart"),
			}
		}

	/* constants */
		const CONSTANTS = {
			svg: {
				check: `<svg viewBox="10 10 80 80"><path d="M 40 60 C 47 53 63 37 72 28 C 74 26 77 26 79 28 C 81 30 81 33 79 35 C 70 44 54 60 44 70 C 42 72 38 72 36 70 C 26 60 24 58 21 55 C 19 53 19 50 21 48 C 23 46 26 46 28 48 C 31 51 33 53 40 60 Z"></path></svg>`,
				x: `<svg viewBox="10 10 80 80"><path d="M 50 43 C 55 38 60 33 64 29 C 66 27 69 27 71 29 C 73 31 73 34 71 36 C 67 40 62 45 57 50 C 62 55 67 60 71 64 C 73 66 73 69 71 71 C 69 73 66 73 64 71 C 60 67 55 62 50 57 C 45 62 40 67 36 71 C 34 73 31 73 29 71 C 27 69 27 66 29 64 C 33 60 38 55 43 50 C 38 45 33 40 29 36 C 27 34 27 31 29 29 C 31 27 34 27 36 29 C 40 33 45 38 50 43 Z"></path></svg>`
			},
			history: "This is based on a famous 1960 psychology experiment by Peter Cathcart Wason in which participants similarly had to determine a secret rule for a sequence of three numbers.<br><br>However, many participants would only test numbers that proved their hypothesis, rather than disproved it, leading them to the wrong results.<br><br>This study demonstrated a human tendency towards confirmation bias - looking for evidence to confirm what you already believe.<br><br><a href='https://en.wikipedia.org/wiki/Peter_Cathcart_Wason#Wason_and_the_2-4-6_Task' target='_blank'>Learn more about Wason's 2-4-6 task here.</a>",
			rules: {
				ascending: function(a, b, c, _) {
					if (_) {return "The numbers must be distinct and in ascending order."}
					return a < b && b < c
				},
				unequal: function(a, b, c, _) {
					if (_) {return "The numbers must be different."}
					return a !== b && b !== c
				},
				even: function(a, b, c, _) {
					if (_) {return "The numbers must be even."}
					return Math.abs(a) % 2 == 0 && Math.abs(b) % 2 == 0 && Math.abs(c) % 2 == 0
				},
				whole: function(a, b, c, _) {
					if (_) {return "The numbers can be anything."}
					return true
				},
				positive: function(a, b, c, _) {
					if (_) {return "The numbers must be positive."}
					return a > 0 && b > 0 && c > 0
				},
				singledigit: function(a, b, c, _) {
					if (_) {return "The numbers must all be single digits."}
					return String(Math.abs(a)).length == 1 && String(Math.abs(b)).length == 1 && String(Math.abs(c)).length == 1
				},
				increaseby2: function(a, b, c, _) {
					if (_) {return "Each number must be 2 more than the previous number."}
					return b - a == 2 && c - b == 2
				},
				differby2: function(a, b, c, _) {
					if (_) {return "Each number must be 2 away from the previous number."}
					return Math.abs(b - a) == 2 && Math.abs(c - b) == 2
				},
				within4: function(a, b, c, _) {
					if (_) {return "The numbers must be within a range of 4."}
					return Math.max(a, b, c) - Math.min(a, b, c) <= 4
				},
				commonfactor: function(a, b, c, _) {
					if (_) {return "All numbers must share a common factor (besides 1)."}
					let factor = 2
					let minimum = Math.min(a, b, c)
					while (factor <= minimum) {
						if (!(a % factor) && !(b % factor) && !(c % factor)) {
							return true
						}
						factor++
					}
					return false
				},
				consecutivemultiples: function(a, b, c, _) {
					if (_) {return "The numbers must be of the form N, 2N, 3N."}
					return a * 2 == b && a * 3 == c
				},
				sum: function(a, b, c, _) {
					if (_) {return "The first two numbers must add up to the third."}
					return a + b == c
				},
				sumto12: function(a, b, c, _) {
					if (_) {return "The numbers must add up to 12."}
					return a + b + c == 12
				},
				average: function(a, b, c, _) {
					if (_) {return "The second number must be the average of all three."}
					return (a + b + c) / 3 == b
				},
				
			}
		}

	/* state */
		const STATE = {
			rule: null,
			revealed: false
		}

/*** interaction ***/
	/* resetRule */
		resetRule()
		ELEMENTS.rule.restart.addEventListener(TRIGGERS.click, resetRule)
		function resetRule() {
			// clear rule
				STATE.revealed = false
				ELEMENTS.rule.reveal.removeAttribute("invisible")
				ELEMENTS.rule.explanation.innerHTML = ""
				ELEMENTS.rule.history.innerHTML = ""
				ELEMENTS.rule.restart.setAttribute("invisible", true)

			// clear results
				ELEMENTS.results.innerHTML = ""

			// reset form
				ELEMENTS.form.a.value = 2
				ELEMENTS.form.b.value = 4
				ELEMENTS.form.c.value = 6
				ELEMENTS.form.hypothesis.value = "initial test"
				ELEMENTS.form.error.innerText = ""

			// select rule
				const rules = Object.keys(CONSTANTS.rules)
				STATE.rule = rules[Math.floor(Math.random() * rules.length)]

			// test values
				setTimeout(() => {
					ELEMENTS.form.test.click()
				})
		}

	/* testRule */
		ELEMENTS.form.element.addEventListener(TRIGGERS.submit, testRule)
		function testRule() {
			// revealed
				if (STATE.revealed) {
					return false
				}

			// all numbers present
				
				if (!String(ELEMENTS.form.a.value).length || !String(ELEMENTS.form.b.value).length || !String(ELEMENTS.form.c.value).length) {
					ELEMENTS.form.error.innerText = "Enter three whole numbers."
					return false
				}

			// all numbers integers
				const a = Number(ELEMENTS.form.a.value)
				const b = Number(ELEMENTS.form.b.value)
				const c = Number(ELEMENTS.form.c.value)
				if (a % 1 || b % 1 || c % 1) {
					ELEMENTS.form.error.innerText = "Enter three whole numbers."
					return false
				}

			// hypothesis present
				const hypothesis = ELEMENTS.form.hypothesis.value.trim()
				if (!hypothesis || !hypothesis.length) {
					ELEMENTS.form.error.innerText = "Enter a hypothesis."
					return false
				}

			// test
				ELEMENTS.form.error.innerText = ""
				const validity = CONSTANTS.rules[STATE.rule](a, b, c)

			// results
				buildResult(a, b, c, hypothesis, validity)

			// clear form
				ELEMENTS.form.a.value = ""
				ELEMENTS.form.b.value = ""
				ELEMENTS.form.c.value = ""
				ELEMENTS.form.hypothesis.value = ""
				ELEMENTS.form.a.focus()
		}

	/* buildResult */
		function buildResult(a, b, c, hypothesis, validity) {
			// block
				const result = document.createElement("div")
					result.className = "result"
				ELEMENTS.results.prepend(result)

			// numbers
				const numberA = document.createElement("div")
					numberA.className = "result-number"
					numberA.innerText = a
				result.appendChild(numberA)

				const numberB = document.createElement("div")
					numberB.className = "result-number"
					numberB.innerText = b
				result.appendChild(numberB)

				const numberC = document.createElement("div")
					numberC.className = "result-number"
					numberC.innerText = c
				result.appendChild(numberC)

			// text
				const hypothesisText = document.createElement("div")
					hypothesisText.className = "result-hypothesis"
					hypothesisText.innerText = hypothesis
				result.appendChild(hypothesisText)

				const validityText = document.createElement("div")
					validityText.className = "result-validity"
					validityText.innerHTML = validity ? CONSTANTS.svg.check : CONSTANTS.svg.x
					validityText.setAttribute("validity", validity)
				result.appendChild(validityText)
		}

	/* revealRule */
		ELEMENTS.rule.reveal.addEventListener(TRIGGERS.click, revealRule)
		function revealRule() {
			// set state
				STATE.revealed = true

			// show text
				const description = CONSTANTS.rules[STATE.rule](null, null, null, true)
				ELEMENTS.rule.explanation.innerHTML = description
				ELEMENTS.rule.history.innerHTML = CONSTANTS.history

			// switch buttons
				ELEMENTS.rule.reveal.setAttribute("invisible", true)
				ELEMENTS.rule.restart.removeAttribute("invisible")
		}
