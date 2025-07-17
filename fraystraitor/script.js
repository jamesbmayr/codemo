/*** globals ***/
	/* constants */
		const CONSTANTS = {
			alphaRegex: /[a-zA-Z']/,
			dictionary: window.dictionary
		}

	/* elements */
		const ELEMENTS = {
			body: document.body,
			input: document.querySelector("#input"),
			output: document.querySelector("#output"),
		}

/*** interaction ***/
	/* inputText */
		ELEMENTS.input.addEventListener("input", inputText)
		function inputText(event) {
			try {
				// get text
					let text = ELEMENTS.input.value
				
				// modified text
					if (text && text.trim().length) {
						text = modifyText(text)
					}

				// put text into output
					ELEMENTS.output.value = text
			} catch (error) {console.log(error)}
		}

	/* dragFile */
		ELEMENTS.body.addEventListener("dragover", dragFile)
		function dragFile(event) {
			try {
				event.preventDefault()
			} catch (error) {console.log(error)}
		}

	/* dropFile */
		ELEMENTS.body.addEventListener("drop", dropFile)
		function dropFile(event) {
			try {
				// prevent default
					event.preventDefault()
					if (!event.dataTransfer || !event.dataTransfer.items) {
						return
					}

				// file
					const file = [...event.dataTransfer.items][0].getAsFile()
					if (!file) {
						return
					}

				// import
					const reader = new FileReader()
					reader.readAsText(file)
					reader.onload = event => {
						const fileString = String(event.target.result) || ""
						ELEMENTS.input.value = fileString
						inputText()
					}
			} catch (error) {console.log(error)}
		}

	/* modifyText */
		function modifyText(text) {
			try {
				// start at the top
					let index = 0
					let currentWord = ""
					let isCapitalized = false

				// loop through
					while (index <= text.length) {
						// keep building word
							if (text[index] && CONSTANTS.alphaRegex.test(text[index])) {
								// first letter
									if (!currentWord.length && text[index].toUpperCase() == text[index]) {
										isCapitalized = true
									}

								// append to word
									currentWord += text[index].toLowerCase()
									index++
									continue
							}

						// no homophone? continue
							if (!CONSTANTS.dictionary[currentWord]) {
								currentWord = ""
								index++
								isCapitalized = false
								continue
							}

						// homophone
							let replacementWord = chooseRandom(CONSTANTS.dictionary[currentWord])
							let before = text.slice(0, index - currentWord.length)
							let after = text.slice(index, text.length)

							if (isCapitalized) {
								replacementWord = replacementWord[0].toUpperCase() + replacementWord.slice(1, replacementWord.length)
							}

							text = before + replacementWord + after
							index = index - currentWord.length + replacementWord.length

							currentWord = ""
							isCapitalized = false	
					}

				// return modified text
					return text || ""
			} catch (error) {console.log(error)}
		}

/*** tools ***/
	/* chooseRandom */
		function chooseRandom(list) {
			try {
				// not an array
					if (!list || !Array.isArray(list)) {
						return list
					}

				// random element from list
					return list[Math.floor(Math.random() * list.length)]
			} catch (error) {console.log(error)}
		}
