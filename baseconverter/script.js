window.addEventListener("load", function() {
	/*** on load ***/
		/* triggers */
			var TRIGGERS = {
				submit: "submit",
				change: "change"
			}

		/* constants */
			var CONSTANTS = {
				arbitrarilyLargeNumber: 1000000000000,
				decimalDigits: 9,
				minimumBase: 2,
				maximumBase: 36,
				symbols: "0123456789abcdefghijklmnopqrstuvwxyz"
			}

		/* elements */
			var ELEMENTS = {
				body: document.body,
				conversion: {
					form: document.querySelector("#conversion-form"),
					number: document.querySelector("#conversion-number"),
					oldBase: document.querySelector("#conversion-base-old"),
					newBase: document.querySelector("#conversion-base-new"),
					button: document.querySelector("#conversion-button"),
					error: document.querySelector("#conversion-error"),
				},
				output: document.querySelector("#output"),
			}

	/*** conversion ***/
		/* submitConvert */
			ELEMENTS.conversion.form.addEventListener(TRIGGERS.submit, submitConvert)
			function submitConvert(event) {
				try {
					// values
						var numberString = ELEMENTS.conversion.number.value
						var oldBase = Number(ELEMENTS.conversion.oldBase.value)
						var newBase = Number(ELEMENTS.conversion.newBase.value)

					// validate
						if (!String(numberString).length || !String(oldBase).length || !String(newBase).length) {
							ELEMENTS.conversion.error.innerText = "missing input"
							ELEMENTS.output.innerText = ""
							return
						}

					// convert
						var outputString = convertNumber(numberString, oldBase, newBase)

					// error?
						if (outputString === null) {
							ELEMENTS.output.innerText = ""
							return
						}

					// display value
						ELEMENTS.conversion.error.innerText = ""
						ELEMENTS.output.innerText = outputString
				} catch (error) {ELEMENTS.conversion.error.innerText = error}
			}
		/* convertNumber */
			function convertNumber(numberString, oldBase, newBase) {
				try {
					// clean up numberString
						numberString = String(numberString).trim().toLowerCase().replace(/,/gi, "")

					// negative?
						if (numberString.indexOf("-") == 0) {
							var negative = true
							numberString = numberString.slice(1)
						}

					// number bases
						if (isNaN(oldBase) || isNaN(newBase)) {
							ELEMENTS.conversion.error.innerText = "base is not a number"
							return null
						}

					// integer bases
						if (oldBase % 1 || newBase % 1) {
							ELEMENTS.conversion.error.innerText = "base is not an integer"
							return null
						}

					// 1 to 36
						if (oldBase < CONSTANTS.minimumBase || oldBase > CONSTANTS.maximumBase || newBase < CONSTANTS.minimumBase || newBase > CONSTANTS.maximumBase) {
							ELEMENTS.conversion.error.innerText = "base must be between " + CONSTANTS.minimumBase + " and " + CONSTANTS.maximumBase
							return null
						}

					// decimals
						if (numberString.includes(".")) {
							var index = numberString.indexOf(".")
							var exponent = (numberString.length - 1) - index
							numberString = numberString.slice(0, index) + numberString.slice(index + 1)
						}
						else {
							var exponent = 0
						}

					// convert digits to base 10
						var digits = numberString.split("")
						for (var i in digits) {
							var index = CONSTANTS.symbols.indexOf(digits[i])
							if (index >= oldBase) {
								ELEMENTS.conversion.error.innerText = "number contains invalid digit"
								return null
							}
							digits[i] = index
						}

					// sum digits
						var sum = 0
						for (var j = 0; j < digits.length; j++) {
							sum += digits[j]
							if (j < digits.length - 1) {
								sum *= oldBase
							}
						}

					// exponent?
						if (exponent) {
							sum = sum / Math.pow(oldBase, exponent)
						}

					// convert to newBase
						var digits = []

					// decimal
						if (sum % 1) {
							// extract from sum
								sum = sum * CONSTANTS.arbitrarilyLargeNumber
								var decimal = sum % CONSTANTS.arbitrarilyLargeNumber
								sum = (sum - decimal) / CONSTANTS.arbitrarilyLargeNumber

							// prepare
								digits.push(".")
								var exponent = 1
							
							// loop through decimal or up to X digits
								while (decimal && digits.length < CONSTANTS.decimalDigits + 1) {
									var count = 0
									var currentBase = 1 / Math.pow(newBase, exponent)
									
									// subtract value from remainder until it exceeds the base
										while (true) {
											if (count >= newBase) {
												break
											}

											var newAmount = decimal - (currentBase * CONSTANTS.arbitrarilyLargeNumber)
											if (newAmount < 0) {
												break
											}
											
											decimal = newAmount
											count++
										}
									
									// add symbol and move to the next place
										digits.push(CONSTANTS.symbols[count])
										exponent++
								}

							// ellipsis if necessary
								if (digits.length >= CONSTANTS.decimalDigits + 1) {
									digits.push("...")
								}
						}

					// integer
						while (sum) {
							var value = sum % newBase
							digits.unshift(CONSTANTS.symbols[value])
							sum -= value
							sum = sum / newBase
						}

					// output
						return (negative ? "-" : "") + (digits[0] == "." ? "0" : "") + digits.join("")
				} catch (error) {ELEMENTS.conversion.error.innerText = error}
			}
})
