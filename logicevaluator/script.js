/*** globals ***/
	/* constants */
		const CONSTANTS = {
			regexes: {
				valid: /[a-zA-Z\≡\⊃\~\•\∨\⊻\⊼\⊽\(\)\∴]/,
				firstSymbol: /[a-zA-Z\~\(\∴]/,
				lastSymbol: /[a-zA-Z\)]/,
				beforeOpenParenthesis: /[\≡\⊃\~\•\∨\⊻\⊼\⊽\(\∴]/,
				beforeCloseParenthesis: /[a-zA-Z\)]/,
				beforeOperator: /[a-zA-Z\)]/,
				beforeLetter: /[\≡\⊃\~\•\∨\⊻\⊼\⊽\(\∴]/,
				letter: /[a-zA-Z]/,
			},
			operators: ["≡","⊃","~","•","∨","⊻","⊼","⊽","(",")","∴"],
			equivalents: {
				// therefore
					"therefore": "∴",
					"thus": "∴",
					"qed": "∴",
					"q.e.d.": "∴",
				// ≡
					"if and only if": "≡",
					"is identical to": "≡",
					"identical to": "≡",
					"is equivalent to": "≡",
					"equivalent to": "≡",
					"xnor": "≡",
					"iff": "≡",
					"\\⊙": "≡",
					"\\⇔": "≡",
					"\\↔": "≡",
					"\\⟺": "≡",
				// ⊃
					"implies": "⊃",
					"then": "⊃",
					"if": "",
					"\\⇒": "⊃",
					"\\→": "⊃",
				// ⊼
					"nand": "⊼",
				// ⊽
					"nor": "⊽",
				// ⊻
					"xor": "⊻",
					"\\↮": "⊻",
					"\\⊕": "⊻",
					"\\≢": "⊻",
				// ~
					"not": "~",
					"\\¬": "~",
					"\\˜": "~",
					"\\!": "~",
				// •
					"and": "•",
					"\\∧": "•",
					"\\·": "•",
					"\\&": "•",
				// ∨
					"or": "∨",
					"\\+": "∨",
					"\\|": "∨",
					"\\∥": "∨",
				// ()
					"\\{": "(",
					"\\[": "(",
					"\\<": "(",
					"\\>": ")",
					"\\]": ")",
					"\\}": ")"
			}
		}
	
	/* elements */
		const ELEMENTS = {
			statements: document.querySelector("#statements"),
			operators: document.querySelectorAll("#operators button"),
			evaluate: document.querySelector("#evaluate"),
			errors: document.querySelector("#errors"),
			truthsOuter: document.querySelector("#truths-outer"),
			truths: document.querySelector("#truths"),
			showAll: document.querySelector("#show-all")
		}

/*** interaction ***/
	/* insertOperator */
		ELEMENTS.operators.forEach(function(element) {
			element.addEventListener("click", insertOperator)
		})
		function insertOperator(event) {
			try {
				// get value
					const operator = event.target.value
					const selectionStart = ELEMENTS.statements.selectionStart
					const selectionEnd = ELEMENTS.statements.selectionEnd

				// insert within
					const existingValue = ELEMENTS.statements.value
					ELEMENTS.statements.value = existingValue.slice(0, selectionStart) + operator + existingValue.slice(selectionEnd)
					ELEMENTS.statements.selectionEnd = selectionStart + 1
					ELEMENTS.statements.focus()
			} catch (error) {console.log(error)}
		}

	/* evaluateLogic */
		ELEMENTS.evaluate.addEventListener("click", evaluateLogic)
		function evaluateLogic() {
			try {
				// blur
					ELEMENTS.evaluate.blur()

				// statements
					// get text
						const rawStatements = ELEMENTS.statements.value.split(/\n/g)
						if (!rawStatements || !rawStatements.length) {
							return
						}

					// clean up
						const cleanedStatements = []
						for (let i in rawStatements) {
							const cleanedStatement = cleanStatement(rawStatements[i])
							if (cleanedStatement && cleanedStatement.length) {
								cleanedStatements.push(cleanedStatement)
							}
						}
						ELEMENTS.statements.value = cleanedStatements.join("\n")

					// validate
						let validationErrors = []
						if (!cleanedStatements.length) {
							validationErrors.push("nothing to evaluate")
						}
						else {
							for (let i in cleanedStatements) {
								const theseErrors = validateStatement(cleanedStatements[i], i)
								if (theseErrors) {
									validationErrors = validationErrors.concat(theseErrors)
								}
							}
						}

					// errors?
						if (validationErrors.length) {
							ELEMENTS.errors.innerText = validationErrors.join("\n")
							ELEMENTS.truths.innerHTML = ""
							ELEMENTS.truthsOuter.removeAttribute("evaluated")
							return
						}
						ELEMENTS.errors.innerText = ""

				// truth matrix
					// conclusions
						const conclusions = []
						for (let i in cleanedStatements) {
							conclusions[i] = isConclusion(cleanedStatements[i])
						}

					// list symbols
						const symbols = []
						for (let i in cleanedStatements) {
							const statementSymbols = getSymbols(cleanedStatements[i])
							for (let j in statementSymbols) {
								if (!symbols.includes(statementSymbols[j])) {
									symbols.push(statementSymbols[j])
								}
							}
						}
						symbols.sort()

					// build truthMatrices
						const truthMatrices = buildTruthMatrices(symbols)

				// logic
					// structure as JSON
						const structuredStatements = []
						for (let i in cleanedStatements) {
							structuredStatements.push(structureStatement(cleanedStatements[i]))
						}

					// convert
						const convertedStatements = []
						for (let i in structuredStatements) {
							convertedStatements.push(convertStatement(structuredStatements[i]))
						}

					// stringify
						const stringifiedStatements = []
						for (let i in convertedStatements) {
							stringifiedStatements.push(stringifyStatement(convertedStatements[i]))
						}
					
					// javascriptify
						const javascriptifiedStatements = []
						for (let i in convertedStatements) {
							javascriptifiedStatements.push(javascriptifyStatement(stringifiedStatements[i]))
						}

					// evaluate statements
						for (let i in convertedStatements) {
							for (let j in truthMatrices) {
								truthMatrices[j].statementEvaluations[i] = evaluateStatementGivenTruths(javascriptifiedStatements[i], truthMatrices[j])
							}
						}

				// display
					// table
						ELEMENTS.truthsOuter.setAttribute("evaluated", true)
						displayTable(cleanedStatements, stringifiedStatements, conclusions, symbols, truthMatrices)
			} catch (error) {console.log(error)}
		}

	/* changeShowAll */
		ELEMENTS.showAll.addEventListener("input", changeShowAll)
		function changeShowAll() {
			try {
				// was checked
					if (ELEMENTS.showAll.checked) {
						ELEMENTS.truths.setAttribute("show-all", true)
						return
					}

				// otherwise
					ELEMENTS.truths.removeAttribute("show-all")
			} catch (error) {console.log(error)}
		}

/*** tools ***/
	/* formatError */
		function formatError(line, symbol, message) {
			try {
				// no line
					if (line == null) {
						return message || "unknown error"
					}
					
				// no symbol
					if (symbol == null) {
						return "line " + (Number(line) + 1) + ": " + (message || "unknown error")
					}

				// line & symbol
					return "line " + (Number(line) + 1) + ":" + (Number(symbol)) + " : " + (message || "unknown error")
			} catch (error) {console.log(error)}
		}

	/* duplicateObject */
		function duplicateObject(obj) {
			try {
				return JSON.parse(JSON.stringify(obj))
			} catch (error) {console.log(error)}
		}

	/* isConclusion */
		function isConclusion(statement) {
			try {
				// starts with ∴
					if (statement[0] == "∴") {
						return true
					}

				// otherwise
					return false
			} catch (error) {console.log(error)}
		}

	/* getSymbols */
		function getSymbols(statement) {
			try {
				// empty list
					const symbols = []
				
				// loop through
					for (let i in statement) {
						if (!CONSTANTS.operators.includes(statement[i]) && !symbols.includes(statement[i])) {
							symbols.push(statement[i])
						}
					}

				// return
					return symbols
			} catch (error) {console.log(error)}
		}

	/* buildTruthMatrices */
		function buildTruthMatrices(symbols) {
			try {
				// start with first one
					const truthMatrices = [
						{statementEvaluations: [], [symbols[0]]: true},
						{statementEvaluations: [], [symbols[0]]: false}
					]

				// loop through from second one
					for (let i = 1; i < symbols.length; i++) {
						// loop through all existing truthMatrices
							let j = 0
							while (j < truthMatrices.length) {
								// create two versions
									truthMatrices[j][symbols[i]] = true
									const duplicate = duplicateObject(truthMatrices[j])
										duplicate[symbols[i]] = false
									truthMatrices.splice(j + 1, 0, duplicate)
									j += 2
							}
					}

				// return
					return truthMatrices
			} catch (error) {console.log(error)}
		}

/*** logic ***/
	/* cleanStatement */
		function cleanStatement(statement) {
			try {
				// replace alternative symbols
					for (let i in CONSTANTS.equivalents) {
						const regex = new RegExp(i, "gi")
						statement = statement.replace(regex, CONSTANTS.equivalents[i])
					}

				// remove spaces
					statement = statement.replace(/\s/g,"")

				// return
					return statement
			} catch (error) {console.log(error)}
		}

	/* validateStatement */
		function validateStatement(statement, i) {
			try {
				// errors
					const errors = []

				// keep track of parentheses
					let openParentheses = 0
					let closedParentheses = 0
					let currentOperator = null

				// loop through symbols
					for (let j = 0; j < statement.length; j++) {
						// get symbol
							const previousSymbol = j - 1 >= 0 ? statement[j - 1] : null
							const thisSymbol = statement[j]

						// invalid symbol
							if (!CONSTANTS.regexes.valid.test(thisSymbol)) {
								errors.push(formatError(i, j, "unknown symbol: " + thisSymbol))
								continue
							}

						// first character
							if (j == 0 && !CONSTANTS.regexes.firstSymbol.test(thisSymbol)) {
								errors.push(formatError(i, j, "illegal starting symbol: " + thisSymbol))
							}

						// last character
							if (j == statement.length - 1 && !CONSTANTS.regexes.lastSymbol.test(thisSymbol)) {
								errors.push(formatError(i, j, "illegal ending symbol: " + thisSymbol))
							}

						// ∴
							if (thisSymbol == "∴") {
								if (j > 0) {
									errors.push(formatError(i, j, "illegal ∴ after start"))
								}
							}

						// (
							else if (thisSymbol == "(") {
								currentOperator = null
								openParentheses++
								if (j - 1 >= 0 && !CONSTANTS.regexes.beforeOpenParenthesis.test(previousSymbol)) {
									errors.push(formatError(i, j, "unexpected ("))
								}
							}

						// )
							else if (thisSymbol == ")") {
								currentOperator = null
								closedParentheses++
								if (j - 1 >= 0 && !CONSTANTS.regexes.beforeCloseParenthesis.test(previousSymbol)) {
									errors.push(formatError(i, j, "unexpected )"))
								}
								if (closedParentheses > openParentheses) {
									errors.push(formatError(i, j, "unmatched )"))
								}
							}

						// ~
							else if (thisSymbol == "~") {
								if (j - 1 >= 0 && !CONSTANTS.regexes.beforeLetter.test(previousSymbol)) {
									errors.push(formatError(i, j, "unexpected ~"))
								}
							}

						// other operator
							else if (CONSTANTS.operators.includes(thisSymbol)) {
								if (j - 1 >= 0 && !CONSTANTS.regexes.beforeOperator.test(previousSymbol)) {
									errors.push(formatError(i, j, "unexpected " + thisSymbol))
								}

								if (currentOperator && currentOperator !== thisSymbol) {
									errors.push(formatError(i, j, "illegal " + thisSymbol + " in " + currentOperator + " group"))
								}
								else {
									currentOperator = thisSymbol
								}
							}

						// letter/number
							else if (CONSTANTS.regexes.letter.test(thisSymbol)) {
								if (j - 1 >= 0 && !CONSTANTS.regexes.beforeLetter.test(previousSymbol)) {
									errors.push(formatError(i, j, "unexpected " + thisSymbol))
								}
							}

						// other
							else {
								errors.push(formatError(i, j, "illegal symbol " + thisSymbol))
							}
					}

				// unmatched parentheses
					if (openParentheses > closedParentheses) {
						errors.push(formatError(i, null, "missing )"))
					}

				// return
					return errors.length ? errors : null
			} catch (error) {console.log(error)}
		}

	/* structureStatement */
		function structureStatement(statement) {
			try {
				// remove ∴
					if (statement[0] == "∴") {
						statement = statement.slice(1)
					}

				// wrap if unwrapped
				// ((p•(~q∨r∨s)•~t)∨u)
					if (!statement.includes("(") || !statement.includes(")")) {
						statement = "(" + statement + ")"
					}

					let nestLevel = 0
					let changed = null
					do {
						changed = false
						for (let i = 0; i < statement.length; i++) {
							if (statement[i] == "(") {
								nestLevel++
							}
							else if (statement[i] == ")") {
								nestLevel--
							}

							if (i < statement.length - 1 && nestLevel <= 0) {
								statement = "(" + statement + ")"
								changed = true
								break
							}
						}
					} while (changed)

				// "" around all symbols
				// "(""(""p""•""(""~""q""∨""r""∨""s"")""•""~""~t"")""∨""u"")"
					statement = '"' + statement.split("").join("\"\"") + '"'

				// "(" to [, ")" to ]
				// [["p""•"["~""q""∨""r""∨""s"]"•""~""~t"]"∨""u"]
					statement = statement.replace(/\"\(\"/g, "[").replace(/\"\)\"/g, "]")

				// , between all ""
				// [["p","•"["~","q","∨","r","∨","s"]"•","~","t"]"∨","u"]
					statement = statement.replace(/\"\"/g, '","')

				// , between "[ and ]"
				// [["p","•",["~","q","∨","r","∨","s"],"•","~","t"],"∨","u"]
					statement = statement.replace(/\"\[/g, '",[').replace(/\]\"/g, '],"')
					statement = JSON.parse(statement)

				// recursive groups
				// [[["p","•",[["~","q","∨","r"],"∨","s"]],"•","~","t"],"∨","u"]
					statement = regroupNestedStatement(statement)

				// return
					return statement
			} catch (error) {console.log(error)}
		}

	/* regroupNestedStatement */
		function regroupNestedStatement(statement) {
			try {
				// loop through
					let operatorCount = 0
					for (let i in statement) {
						// group --> level deeper
							if (typeof statement[i] == "object") {
								statement[i] = regroupNestedStatement(duplicateObject(statement[i]))
							}

						// string
							else if (CONSTANTS.operators.includes(statement[i]) && statement[i] !== "~") {
								operatorCount++

								if (operatorCount > 1) {
									statement = regroupNestedStatement(duplicateObject([statement.slice(0, i)].concat(statement.slice(i))))
									break
								}
							}
					}
				
				// return
					return statement
			} catch (error) {console.log(error)}
		}

	/* convertStatement */
		function convertStatement(statement) {
			try {
				// loop through
					for (let i in statement) {
						// nested group
							if (typeof statement[i] == "object") {
								statement[i] = convertStatement(duplicateObject(statement[i]))
							}

						// nand
						// (p ⊼ q) --> (~p ∨ ~q)
							if (statement[i] == "⊼") {
								const p = statement.slice(0, i)
								const q = statement.slice(i).slice(1)
								statement = ["~"].concat(duplicateObject(p)).concat(["∨", "~"]).concat(duplicateObject(q))
								return convertStatement(statement)
							}

						// nor
						// (p ⊽ q) --> (~p • ~q)
							if (statement[i] == "⊽") {
								const p = statement.slice(0, i)
								const q = statement.slice(i).slice(1)
								statement = ["~"].concat(duplicateObject(p)).concat(["•", "~"]).concat(duplicateObject(q))
								return convertStatement(statement)
							}

						// xor
						// (p ⊻ q) --> ((p ∨ q) • (~p ∨ ~q))
							if (statement[i] == "⊻") {
								const p = statement.slice(0, i)
								const q = statement.slice(i).slice(1)
								statement = [duplicateObject(p).concat(["∨"]).concat(duplicateObject(q)), "•", ["~"].concat(duplicateObject(p)).concat(["∨", "~"]).concat(duplicateObject(q))]
								return convertStatement(statement)
							}

						// biconditional
						// (p ≡ q) --> (p • q) ∨ (~p • ~q)
							if (statement[i] == "≡") {
								const p = statement.slice(0, i)
								const q = statement.slice(i).slice(1)
								statement = [duplicateObject(p).concat(["•"]).concat(duplicateObject(q)), "∨", ["~"].concat(duplicateObject(p)).concat(["•", "~"]).concat(duplicateObject(q))]
								return convertStatement(statement)
							}

						// conditional
						// (p ⊃ q) --> (~p ∨ q)
							if (statement[i] == "⊃") {
								const p = statement.slice(0, i)
								const q = statement.slice(i).slice(1)
								statement = ["~"].concat(duplicateObject(p)).concat(["∨"]).concat(duplicateObject(q))
								return convertStatement(statement)
							}
					}

				// double negatives
					let changed
					do {
						changed = false
						for (let i = 0; i < statement.length; i++) {
							if (statement[i] == "~" && i - 1 >= 0 && statement[i - 1] == "~") {
								statement.splice(i - 1, 2)
								changed = true
								break
							}
						}
					} while (changed)

				// return
					return statement
			} catch (error) {console.log(error)}
		}

	/* stringifyStatement */
		function stringifyStatement(statement) {
			try {
				// stringify to logic symbols
					let stringifiedStatement = JSON.stringify(statement)
						stringifiedStatement = stringifiedStatement.replace(/\"/g, "").replace(/\,/g, "")
						stringifiedStatement = stringifiedStatement.replace(/\[/g, "(").replace(/\]/g, ")")

				// return
					return stringifiedStatement
			} catch (error) {console.log(error)}
		}

	/* javascriptifyStatement */
		function javascriptifyStatement(statement) {
			try {
				// name-space variables
					let statementArray = statement.split("")
					for (let i in statementArray) {
						// operators
							if (statementArray[i] == "~") {
								statementArray[i] = "!"
							}
							else if (statementArray[i] == "•") {
								statementArray[i] = "&&"
							}
							else if (statementArray[i] == "∨") {
								statementArray[i] = "||"
							}

						// other
							else if (!CONSTANTS.operators.includes(statementArray[i])) {
								statementArray[i] = "_." + statementArray[i]
							}
					}

				// return
					return statementArray.join("")
			} catch (error) {console.log(error)}
		}

	/* evaluateStatementGivenTruths */
		function evaluateStatementGivenTruths(statement, _) {
			try {
				// evaluate
					return eval(statement)
			} catch (error) {console.log(error)}
		}

/*** display ***/
	/* displayTable */
		function displayTable(cleanedStatements, simplifiedStatements, conclusions, symbols, truthMatrices) {
			try {
				// empty table
					ELEMENTS.truths.innerHTML = ""

				// build header row
					const headerRow = document.createElement("thead")
					ELEMENTS.truths.appendChild(headerRow)

					// symbols
						for (let i in symbols) {
							const headerCell = document.createElement("th")
								headerCell.className = "symbol"
								headerCell.innerText = symbols[i]
							headerRow.appendChild(headerCell)
						}

					// cleanedStatements
						const statementHeaders = []
						for (let i in cleanedStatements) {
							const headerCell = document.createElement("th")
								headerCell.className = "statement" + (conclusions[i] ? " conclusion" : "")
								headerCell.innerHTML = cleanedStatements[i] + "<br>" + simplifiedStatements[i]
							headerRow.appendChild(headerCell)
							statementHeaders.push(headerCell)
						}

				// rows
					const tableBody = document.createElement("tbody")
					ELEMENTS.truths.appendChild(tableBody)
					for (let i in truthMatrices) {
						// empty row
							const row = document.createElement("tr")
							tableBody.appendChild(row)

						// loop through truth matrices
							const statementEvaluationCells = []
							for (let j in truthMatrices[i]) {
								// build evaluation cells but come back to these after
									if (j == "statementEvaluations") {
										let allTrue = true
										for (let k = 0; k < truthMatrices[i].statementEvaluations.length; k++) {
											// statement cell
												const statementEvaluationCell = document.createElement("td")
													statementEvaluationCell.className = "statement" + (conclusions[k] ? " conclusion" : "")
													statementEvaluationCell.innerText = String(truthMatrices[i].statementEvaluations[k])[0]
													statementEvaluationCell.setAttribute("truth", truthMatrices[i].statementEvaluations[k])
												statementEvaluationCells.push(statementEvaluationCell)

											// false statement
												if (!truthMatrices[i].statementEvaluations[k]) {
													// unsupported conclusion
														if (allTrue && conclusions[k]) {
															statementHeaders[k].setAttribute("unsupported", true)
														}

													// false statement
														else {
															allTrue = false
														}
												}


										}

										// all true? --> always show row
											if (allTrue) {
												row.setAttribute("all-true", true)
											}
									}

								// symbols
									else {
										const symbolCell = document.createElement("td")
											symbolCell.className = "symbol"
											symbolCell.innerText = String(truthMatrices[i][j])[0]
											symbolCell.setAttribute("truth", truthMatrices[i][j])
										row.appendChild(symbolCell)
									}
							}

						// loop through evaluation cells
							for (let k in statementEvaluationCells) {
								row.appendChild(statementEvaluationCells[k])
							}
					}
			} catch (error) {console.log(error)}
		}
