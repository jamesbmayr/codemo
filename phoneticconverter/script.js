/*** globals ***/
	/* elements */
		const ELEMENTS = {
			ipaTextarea: document.querySelector("#ipa-textarea"),
			arpabetTextarea: document.querySelector("#arpabet-textarea"),
			ipaButton: document.querySelector("#ipa-button"),
			arpabetButton: document.querySelector("#arpabet-button"),
			symbolsLeft: document.querySelector("#symbols-left"),
			symbolsRight: document.querySelector("#symbols-right"),
			symbolsContainer: document.querySelector("#symbol-buttons"),
			symbolButtons: Array.from(document.querySelectorAll(".symbol-button"))
		}

	/* constants */
		const CONSTANTS = {
			IPAtoARPABET: {
				"ɑ": "AA",
				"ɑː": "AA",
				"aː": "AA",
				"a": "AA",
				"ɒ": "AA",
				"æ": "AE",
				"ʌ": "AH",
				"ɔ": "AO",
				"ɔː": "AO",
				"aʊ": "AW",
				"ɑʊ": "AW",
				"ə": "AX",
				"ɚ": "AXR",
				"aɪ": "AY",
				"ɑɪ": "AY",
				"ɛ": "EH",
				"e": "EH",
				"ɝ": "ER",
				"eɪ": "EY",
				"ɪ": "IH",
				"ɨ": "IX",
				"i": "IY",
				"iː": "IY",
				"oʊ": "OW",
				"ɔɪ": "OY",
				"ʊ": "UH",
				"u": "UW",
				"uː": "UW",
				"ʉ": "UX",
				"b": "B",
				"tʃ": "CH",
				"ʧ": "CH",
				"d": "D",
				"ð": "DH",
				"ɾ": "DX",
				"l̩": "EL",
				"m̩": "EM",
				"n̩": "EN",
				"ɹ̩": "ER",
				"f": "F",
				"ɡ": "G",
				"g": "G",
				"h": "HH",
				"dʒ": "JH",
				"ʤ": "JH",
				"k": "K",
				"l": "L",
				"m": "M",
				"n": "N",
				"ŋ": "NG",
				"ɾ̃": "NX",
				"p": "P",
				"ʔ": "Q",
				"ɹ": "R",
				"s": "S",
				"ʃ": "SH",
				"t": "T",
				"θ": "TH",
				"v": "V",
				"w": "W",
				"ʍ": "WH",
				"j": "Y",
				"z": "Z",
				"ʒ": "ZH",
				"ə̥": "AX-H",
				"b̚": "BCL",
				"d̚": "DCL",
				"ŋ̍": "ENG",
				"ɡ̚": "GCL",
				"ɦ": "HV",
				"k̚": "KCL",
				"p̚": "PCL",
				"t̚": "TCL",
			},
			ARPABETtoIPA: {
				"AA": "ɑ",
				"AE": "æ",
				"AH": "ʌ",
				"AO": "ɔ",
				"AW": "aʊ",
				"AX": "ə",
				"AXR": "ɚ",
				"AY": "aɪ",
				"EH": "ɛ",
				"ER": "ɝ",
				"EY": "eɪ",
				"IH": "ɪ",
				"IX": "ɨ",
				"IY": "i",
				"OW": "oʊ",
				"OY": "ɔɪ",
				"UH": "ʊ",
				"UW": "u",
				"UX": "ʉ",
				"B": "b",
				"CH": "ʧ",
				"D": "d",
				"DH": "ð",
				"DX": "ɾ",
				"EL": "l̩",
				"EM": "m̩",
				"EN": "n̩",
				"F": "f",
				"G": "g",
				"H": "h",
				"HH": "h",
				"JH": "dʒ",
				"K": "k",
				"L": "l",
				"M": "m",
				"N": "n",
				"NG": "ŋ",
				"NX": "ɾ̃",
				"P": "p",
				"Q": "ʔ",
				"R": "ɹ",
				"S": "s",
				"SH": "ʃ",
				"T": "t",
				"TH": "θ",
				"V": "v",
				"W": "w",
				"WH": "ʍ",
				"Y": "j",
				"Z": "z",
				"ZH": "ʒ",
				"AX-H": "ə̥",
				"AXH": "ə̥",
				"BCL": "b̚",
				"DCL": "d̚",
				"ENG": "ŋ̍",
				"GCL": "ɡ̚",
				"HV": "ɦ",
				"KCL": "k̚",
				"PCL": "p̚",
				"TCL": "t̚",
			},
			symbolButtonWidth: 52, // px
			copyWait: 1000, // ms
			copyTimeout: null
		}

/*** interaction ***/
	/* inputIPA */
		ELEMENTS.ipaTextarea.addEventListener("input", inputIPA)
		function inputIPA(event) {
			try {
				// text
					const text = ELEMENTS.ipaTextarea.value.trim()
					const direction = "IPAtoARPABET"

				// convert
					ELEMENTS.arpabetTextarea.value = convertText(text, direction)
			} catch (error) {console.log(error)}
		}

	/* inputARPABET */
		ELEMENTS.arpabetTextarea.addEventListener("input", inputARPABET)
		function inputARPABET(event) {
			try {
				// text
					const text = ELEMENTS.arpabetTextarea.value.trim()
					const direction = "ARPABETtoIPA"

				// convert
					ELEMENTS.ipaTextarea.value = convertText(text, direction)
			} catch (error) {console.log(error)}
		}

	/* copyIPA */
		ELEMENTS.ipaButton.addEventListener("click", copyIPA)
		function copyIPA(event) {
			try {
				// cancel timeout
					clearInterval(CONSTANTS.copyTimeout)
					CONSTANTS.copyTimeout = null

				// update element
					ELEMENTS.ipaButton.setAttribute("check", true)

				// get text
					const text = ELEMENTS.ipaTextarea.value.trim()

				// copy text to clipboard
					navigator.clipboard.writeText(text)

				// timeout
					CONSTANTS.copyTimeout = setInterval(() => {
						ELEMENTS.ipaButton.removeAttribute("check", true)
					}, CONSTANTS.copyWait)
			} catch (error) {console.log(error)}
		}

	/* copyARPABET */
		ELEMENTS.arpabetButton.addEventListener("click", copyARPABET)
		function copyARPABET(event) {
			try {
				// cancel timeout
					clearInterval(CONSTANTS.copyTimeout)
					CONSTANTS.copyTimeout = null

				// update element
					ELEMENTS.arpabetButton.setAttribute("check", true)

				// get text
					const text = ELEMENTS.arpabetTextarea.value.trim()

				// copy text to clipboard
					navigator.clipboard.writeText(text)

				// timeout
					CONSTANTS.copyTimeout = setInterval(() => {
						ELEMENTS.arpabetButton.removeAttribute("check", true)
					}, CONSTANTS.copyWait)
			} catch (error) {console.log(error)}
		}

	/* scrollLeft */
		ELEMENTS.symbolsLeft.addEventListener("click", scrollLeft)
		function scrollLeft(event) {
			try {
				ELEMENTS.symbolsContainer.scrollBy(-CONSTANTS.symbolButtonWidth * 4, 0)
			} catch (error) {console.log(error)}
		}

	/* scrollRight */
		ELEMENTS.symbolsRight.addEventListener("click", scrollRight)
		function scrollRight(event) {
			try {
				ELEMENTS.symbolsContainer.scrollBy(CONSTANTS.symbolButtonWidth * 4, 0)
			} catch (error) {console.log(error)}
		}

	/* insertSymbol */
		ELEMENTS.symbolButtons.forEach(button => button.addEventListener("click", insertSymbol))
		function insertSymbol(event) {
			try {
				// symbol
					const symbol = event.target.closest(".symbol-button").value

				// position
					const start = ELEMENTS.ipaTextarea.selectionStart
					const end = ELEMENTS.ipaTextarea.selectionEnd

				// insert
					const currentText = ELEMENTS.ipaTextarea.value
					const newText = currentText.slice(0, start) + symbol + currentText.slice(end, currentText.length)
					ELEMENTS.ipaTextarea.value = newText

				// refocus
					ELEMENTS.ipaTextarea.focus()
					ELEMENTS.ipaTextarea.selectionStart = start + 1
					ELEMENTS.ipaTextarea.selectionEnd = start + 1

				// convert
					ELEMENTS.arpabetTextarea.value = convertText(newText, "IPAtoARPABET")
			} catch (error) {console.log(error)}
		}

/*** convert ***/
	function convertText(text, direction) {
		try {
			// remove numbers & spaces from arpabet
				if (direction == "ARPABETtoIPA") {
					text = text.replace(/ /g, "")
					text = text.replace(/\d/g, "")
					text = text.toUpperCase()
				}

			// move through text
				let position = 0
				let newText = []
				positionLoop: while (position < text.length) {
					// look ahead 4 characters
						let lookahead = 4
						lookaheadLoop: while (lookahead) {
							let chunk = text.slice(position, position + lookahead)
							if (CONSTANTS[direction][chunk]) {
								newText.push(CONSTANTS[direction][chunk])
								position += lookahead
								continue positionLoop
							}
							else {
								lookahead--
							}
						}

					// no match?
						newText.push(text.slice(position, position + 1))
						position++
				}

			// output
				newText = newText.join(direction == "IPAtoARPABET" ? " " : "").replace(/\n /g, "\n")
				return newText
		} catch (error) {console.log(error)}
	}
