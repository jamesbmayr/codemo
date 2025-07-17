/*** globals ***/
	const GLOBALS = {
		alphabetLength: 26,
		charCodeOffset: 65,
	}

/*** elements ***/
	const ELEMENTS = {
		form: document.getElementById("form"),
		message: document.getElementById("message"),
		keyword: document.getElementById("keyword"),
		action: document.getElementById("action"),
		output: document.getElementById("output")
	}

/*** form ***/
	/* input */
		ELEMENTS.message.addEventListener("input", updateErrors)
		ELEMENTS.keyword.addEventListener("input", updateErrors)
		function updateErrors(event) {
			try {
				// message or keyword
					event.target.setAttribute("error", !cleanText(event.target.value).length)
					return
			}
			catch (error) { console.log(error) }
		}

	/* submitForm */
		ELEMENTS.form.addEventListener("submit", submitForm)
		function submitForm(event) {
			try {
				// get options
					let message = cleanText(ELEMENTS.message.value)
					let keyword = cleanText(ELEMENTS.keyword.value)
					let action = ELEMENTS.action.value

				// update errors
					ELEMENTS.message.setAttribute("error", !message.length)
					ELEMENTS.keyword.setAttribute("error", !keyword.length)

				// validate
					if (!message.length || !keyword.length) {
						ELEMENTS.output.innerText = ""
						return
					}

				// encrypt or decrypt?
					if (action == "encrypt") {
						ELEMENTS.output.innerText = encryptText(message, keyword)
					}
					else if (action == "decrypt") {
						ELEMENTS.output.innerText = decryptText(message, keyword)
					}
			}
			catch (error) { console.log(error) }
		}

	/* dragFile */
		ELEMENTS.message.addEventListener("dragover", dragFile)
		function dragFile(event) {
			try {
				// prevent default
					event.preventDefault()
			} catch (error) {console.log(error)}
		}

	/* dropFile */
		ELEMENTS.message.addEventListener("drop", dropFile)
		function dropFile(event) {
			try {
				// prevent default
					event.preventDefault()

				// get file contents
					if (!event.dataTransfer || !event.dataTransfer.items) {
						return
					}
					const file = [...event.dataTransfer.items][0].getAsFile()
					if (!file) {
						return
					}
				
				// get contents
					const reader = new FileReader()
						reader.readAsText(file)
						reader.onload = event => {
							const fileString = String(event.target.result) || ""
							ELEMENTS.message.value = fileString
							submitForm()
						}
			} catch (error) {console.log(error)}
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
