/*** globals ***/
	var GLOBALS = {
		alphabetLength: 26,
		charCodeOffset: 65,
	}

/*** helpers ***/
	/* cleanText */
		function cleanText(text) {
			try {
				// no text
					if (!text || !text.length) {
						return ""
					}

				// capitalize
					text = text.toUpperCase()

				// strip non-latin characters
					text = text.replace(/[^A-Z]/g, "")

				// return
					return text
			}
			catch (error) { console.log(error) }
		}

	/* createKeywordPad */
		function createKeywordPad(message, keyword) {
			try {
				// extend keyword
					let keywordPad = ""
					while (keywordPad.length < message.length) {
						keywordPad += keyword
					}

				// slice to length
					keywordPad = keywordPad.slice(0, message.length)

				// return
					return keywordPad
			}
			catch (error) { console.log(error) }
		}

/*** encryption ***/
	/* encryptText */
		function encryptText(message, keyword) {
			try {
				// keywordPad
					let keywordPad = createKeywordPad(message, keyword)

				// encrypt
					let output = []
					for (let i = 0; i < message.length; i++) {
						let num = (message.charCodeAt(i) - GLOBALS.charCodeOffset)
							num += (keywordPad.charCodeAt(i) - GLOBALS.charCodeOffset)
							num = (num + GLOBALS.alphabetLength) % GLOBALS.alphabetLength
						output.push(String.fromCharCode(num + GLOBALS.charCodeOffset))
					}

				// return
					return output.join("")
			}
			catch (error) { console.log(error) }
		}

	/* decryptText */
		function decryptText(message, keyword) {
			try {
				// keywordPad
					let keywordPad = createKeywordPad(message, keyword)

				// encrypt
					let output = []
					for (let i = 0; i < message.length; i++) {
						let num = (message.charCodeAt(i) - GLOBALS.charCodeOffset)
							num -= (keywordPad.charCodeAt(i) - GLOBALS.charCodeOffset)
							num = (num + GLOBALS.alphabetLength) % GLOBALS.alphabetLength
						output.push(String.fromCharCode(num + GLOBALS.charCodeOffset))
					}

				// return
					return output.join("")
			}
			catch (error) { console.log(error) }
		}

/*** request ***/
	/* submitQuery */
		function submitQuery(query) {
			try {
				// validate
					if (!query || !query.action || !query.message || !query.keyword) {
						return JSON.stringify({success: false, message: "invalid query"})
					}

				// clean text
					var message = cleanText(query.message)
					var keyword = cleanText(query.keyword)
					if (!message || !message.length) {
						return JSON.stringify({success: false, message: "no message submitted"})
					}
					if (!keyword || !keyword.length) {
						return JSON.stringify({success: false, message: "no keyword submitted"})
					}

				// encrypt of decrypt
					if (query.action == "encrypt") {
						var result = encryptText(message, keyword)
					}
					else if (query.action == "decrypt") {
						var result = decryptText(message, keyword)
					}
					else {
						return JSON.stringify({success: false, message: "unrecognized action"})
					}

				// respond
					return JSON.stringify({
						success: true,
						message: query.message,
						keyword: query.keyword,
						html: result,
					})
			}
			catch (error) { console.log(error) }
		}
