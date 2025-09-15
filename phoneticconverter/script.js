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
				"r": "R",
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
				"ŋ̩": "ENG",
				"ɡ̚": "GCL",
				"ɦ": "HV",
				"k̚": "KCL",
				"p̚": "PCL",
				"t̚": "TCL"
			},
			ARPABETtoIPA: {
				"AA": "ɑ",
				"AE": "æ",
				"AH": "ʌ",
				"AO": "ɔ",
				"AW": "ɑʊ",
				"AX": "ə",
				"AXR": "ɚ",
				"AY": "ɑɪ",
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
				"CH": "tʃ",
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
				"ENG": "ŋ̩",
				"GCL": "ɡ̚",
				"HV": "ɦ",
				"KCL": "k̚",
				"PCL": "p̚",
				"TCL": "t̚",
			},
			IPAtoARPABETstress: {
				"ˈ": "1",
				"ˌ": "2",
				".": "0",
			},
			ARPABETtoIPAstress: {
				"1": "ˈ",
				"2": "ˌ",
				"3": "ˌ",
				"0": ".",
			},
			IPAtoARPABETvowels: ["AA","AE","AH","AO","AW","AX","AXR","AY","EH","ER","EY","IH","IX","IY","OW","OY","UH","UW","UX","EL","EM","EN","ER","ENG"],
			ARPABETtoIPAvowels: ["ɑ","æ","ʌ","ɔ","ɑʊ","ə","ɚ","ɑɪ","ɛ","ɝ","eɪ","ɪ","ɨ","i","oʊ","ɔɪ","ʊ","u","ʉ","ə̥","l̩","m̩","n̩","ŋ̩"],
			symbolButtonWidth: 52, // px
			copyWait: 1000, // ms
			copyTimeout: null
		}

/*** interaction ***/
	/* dragFile */
		ELEMENTS.ipaTextarea.addEventListener("dragover", dragFile)
		ELEMENTS.arpabetTextarea.addEventListener("dragover", dragFile)
		function dragFile(event) {
			try {
				// prevent default
					event.preventDefault()
			} catch (error) {console.log(error)}
		}

	/* dropFile */
		ELEMENTS.ipaTextarea.addEventListener("drop", dropFile)
		ELEMENTS.arpabetTextarea.addEventListener("drop", dropFile)
		function dropFile(event) {
			try {
				// prevent default
					event.preventDefault()

				// get target
					const textarea = event.target.closest("textarea")

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
							textarea.value = fileString

							if (textarea == ELEMENTS.ipaTextarea) {
								inputIPA()
								return
							}
							inputARPABET()
						}
			} catch (error) {console.log(error)}
		}

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

/*** assetManager ***/
	/* retrieveAsset */
		window.ASSETS_J.retrieveAsset = function(name, type, data) {
			try {
				// txt
					const ipaSymbols = Object.keys(CONSTANTS.IPAtoARPABET)
					for (const s in ipaSymbols) {
						if (data.includes(ipaSymbols[s])) {
							ELEMENTS.ipaTextarea.value = data
							inputIPA()
							return
						}
					}
					ELEMENTS.arpabetTextarea.value = data
					inputARPABET()
			} catch (error) {console.log(error)}
		}

	/* storeAsset */
		window.ASSETS_J.storeAsset = async function(type) {
			try {
				// txt
					return {
						name: "phoneticConverter_" + (new Date().getTime()) + ".txt",
						type: "txt",
						data: `IPA:\n\n${ELEMENTS.ipaTextarea.value.trim()}\n\n\nARPABET:\n\n${ELEMENTS.arpabetTextarea.value.trim()}`
					}
			} catch (error) {console.log(error)}
		}

/*** convert ***/
	function convertText(lines, direction) {
		try {
			// preserve lines
				const newLines = []
				lines = lines.split("\n")

			// loop through lines
				for (const l in lines) {
					// get text
						let text = lines[l]

					// remove non-letters from arpabet
						if (direction == "ARPABETtoIPA") {
							text = text.replace(/0/g, " 0")
							text = text.replace(/1/g, " 1")
							text = text.replace(/2/g, " 2")
							text = text.replace(/3/g, " 3")
							text = text.toUpperCase()
							text = text.split(" ")
						}
						else {
							text = text.split("")
						}

					// move through text
						let position = 0
						let newText = []
						positionLoop: while (position < text.length) {
							// look ahead 2 characters in IPA
								let lookahead = (direction == "IPAtoARPABET" ? 2 : 1)
								lookaheadLoop: while (lookahead) {
									let chunk = text.slice(position, position + lookahead).join("")
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

					// stress
						position = 0
						let tempStress = null
						while (position < newText.length) {
							if (CONSTANTS[direction + "stress"][newText[position]] != undefined) {
								tempStress = CONSTANTS[direction + "stress"][newText[position]]

								if (direction == "IPAtoARPABET") {
									newText.splice(position, 1)
									position--
								}
								else if (direction == "ARPABETtoIPA") {
									newText[position] = newText[position - 1]
									newText[position - 1] = tempStress
									tempStress = null
								}
							}
							else if (direction == "IPAtoARPABET" && tempStress != null && CONSTANTS[direction + "vowels"].includes(newText[position])) {
								newText[position] += tempStress
								tempStress = null
							}
							position++
						}

					// move first stress forward
						if (direction == "ARPABETtoIPA") {
							let index = 0
							let firstStress = null
							const IPAstressMarks = Object.keys(CONSTANTS.IPAtoARPABETstress)
							while (!firstStress && index < newText.length) {
								if (IPAstressMarks.includes(newText[index])) {
									firstStress = newText[index]
									newText.splice(index, 1)
									newText.splice(0, 0, firstStress)
								}
								index++
							}
						}

					// output
						newText = newText.join(direction == "IPAtoARPABET" ? " " : "")
						newLines.push(newText)
				}
			
			// package up lines
				return newLines.join("\n")
		} catch (error) {console.log(error)}
	}
