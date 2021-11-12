/*** globals ***/
	var CONSTANTS = {
		arbitrarilyLargeNumber: 1000000000000,
		decimalDigits: 9,
		minimumBase: 2,
		maximumBase: 36,
		symbols: "0123456789abcdefghijklmnopqrstuvwxyz"
	}

/*** conversion ***/
	/* submitConvert */
		exports.submitConvert = submitConvert
		function submitConvert(query) {
			try {
				// values
					var numberString = query.numberString
					var oldBase = query.oldBase
					var newBase = query.newBase

				// validate
					if (typeof numberString == "undefined" || !String(numberString).length || !oldBase || !String(oldBase).length || !newBase || !String(newBase).length) {
						var errorMessage = []
						if (typeof numberString == "undefined" || !String(numberString).length) {
							errorMessage.push("string 'numberString'")
						}
						if (!oldBase || !String(oldBase).length) {
							errorMessage.push("number 'oldBase'")
						}
						if (!newBase || !String(newBase).length) {
							errorMessage.push("number 'newBase'")
						}
						return JSON.stringify({success: false, message: "missing parameters: " + errorMessage.join(", ")})
					}

				// convert
					return convertNumber(numberString, oldBase, newBase) || JSON.stringify({success: false, message: "invalid calculation"})
			} catch (error) { return JSON.stringify({success: false, message: "unknown error in submitting query"}) }
		}

	/* convertNumber */
		function convertNumber(numberString, oldBase, newBase) {
			try {
				// clean up numberString
					numberString = String(numberString).trim().replace(/,/gi, "")

				// negative?
					if (numberString.indexOf("-") == 0) {
						var negative = true
						numberString = numberString.slice(1)
					}

				// number bases
					if (isNaN(oldBase) || isNaN(newBase)) {
						return JSON.stringify({success: false, message: "base is not a number"})
					}

				// integer bases
					if (oldBase % 1 || newBase % 1) {
						return JSON.stringify({success: false, message: "base is not an integer"})
					}

				// 1 to 36
					if (oldBase < CONSTANTS.minimumBase || oldBase > CONSTANTS.maximumBase || newBase < CONSTANTS.minimumBase || newBase > CONSTANTS.maximumBase) {
						return JSON.stringify({success: false, message: "base must be between " + CONSTANTS.minimumBase + " and " + CONSTANTS.maximumBase})
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
							return JSON.stringify({success: false, message: "number contains invalid digit"})
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
					var number = (negative ? "-" : "") + (digits[0] == "." ? "0" : "") + digits.join("")
					return JSON.stringify({success: true, number: number, html: number})
			} catch (error) { return JSON.stringify({success: false, message: "unknown error in converting number"}) }
		}
