window.addEventListener("load", function() {
	/*** globals ***/
		var CONSTANTS = {
			textToMorse: {
				"a": ".-",
				"b": "-...",
				"c": "-.-.",
				"d": "-..",
				"e": ".",
				"f": "..-.",
				"g": "--.",
				"h": "....",
				"i": "..",
				"j": ".---",
				"k": "-.-",
				"l": ".-..",
				"m": "--",
				"n": "-.",
				"o": "---",
				"p": ".--.",
				"q": "--.-",
				"r": ".-.",
				"s": "...",
				"t": "-",
				"u": "..-",
				"v": "...-",
				"w": ".--",
				"x": "-..-",
				"y": "-.--",
				"z": "--..",
				"0": "-----",
				"1": ".----",
				"2": "..---",
				"3": "...--",
				"4": "....-",
				"5": ".....",
				"6": "-....",
				"7": "--...",
				"8": "---..",
				"9": "----.",
				".": ".-.-.-",
				",": "--..--",
				"?": "..--..",
				"'": ".----.",
				"‘": ".----.",
				"’": ".----.",
				"!": "-.-.--",
				"/": "-..-.",
				"(": "-.--.",
				")": "-.--.-",
				"&": ".-...",
				":": "---...",
				";": "-.-.-.",
				"=": "-...-",
				"+": ".-.-.",
				"-": "-....-",
				"_": "..--.-",
				"\"": ".-..-.",
				"“": ".-..-.",
				"”": ".-..-.",
				"$": "...-..-",
				"@": ".--.-.",
				"à": ".--.-",
				"å": ".--.-",
				"ä": ".-.-",
				"æ": ".-.-",
				"ą": ".-.-",
				"ć": "-.-..",
				"ĉ": "-.-..",
				"ç": "-.-..",
				"ð": "..--.",
				"đ": "..-..",
				"é": "..-..",
				"ę": "..-..",
				"è": ".-..-",
				"ł": ".-..-",
				"ĝ": "--.-.",
				"ĥ": "----",
				"š": "----",
				"ĵ": ".---.",
				"ń": "--.--",
				"ñ": "--.--",
				"ó": "---.",
				"ö": "---.",
				"ø": "---.",
				"ś": "...-...",
				"ŝ": "...-.",
				"þ": ".--..",
				"ü": "..--",
				"ŭ": "..--",
				"ź": "--..-.",
				"ż": "--..-",
				" ": "   "
			},
			morseToText: {
				"~": " ",
				".-": "a",
				"-...": "b",
				"-.-.": "c",
				"-..": "d",
				".": "e",
				"..-.": "f",
				"--.": "g",
				"....": "h",
				"..": "i",
				".---": "j",
				"-.-": "k",
				".-..": "l",
				"--": "m",
				"-.": "n",
				"---": "o",
				".--.": "p",
				"--.-": "q",
				".-.": "r",
				"...": "s",
				"-": "t",
				"..-": "u",
				"...-": "v",
				".--": "w",
				"-..-": "x",
				"-.--": "y",
				"--..": "z",
				"-----": "0",
				".----": "1",
				"..---": "2",
				"...--": "3",
				"....-": "4",
				".....": "5",
				"-....": "6",
				"--...": "7",
				"---..": "8",
				"----.": "9",
				".-.-.-": ".",
				"--..--": ",",
				"..--..": "?",
				".----.": "'",
				"-.-.--": "!",
				"-..-.": "/",
				"-.--.": "(",
				"-.--.-": ")",
				".-...": "&",
				"---...": ":",
				"-.-.-.": ";",
				"-...-": "=",
				".-.-.": "+",
				"-....-": "-",
				"..--.-": "_",
				".-..-.": "\"",
				"...-..-": "$",
				".--.-.": "@",
				".--.-": "à",
				".-.-": "æ",
				"-.-..": "ç",
				"..--.": "ð",
				"..-..": "é",
				".-..-": "è",
				"--.-.": "ĝ",
				"----": "ĥ",
				".---.": "ĵ",
				"--.--": "ñ",
				"---.": "ó",
				"...-...": "ś",
				"...-.": "ŝ",
				".--..": "þ",
				"..--": "ü",
				"--..-.": "ź",
				"--..-": "ż"
			}
		}

		var ELEMENTS = {
			body: document.body,
			form: document.querySelector("#form"),
			plaintext: document.querySelector("#plaintext"),
			codetext: document.querySelector("#codetext"),
			dit: document.querySelector("#dit"),
			dah: document.querySelector("#dah"),
			space: document.querySelector("#space")
		}

	/*** form ***/
		/* encodeText */
			ELEMENTS.plaintext.addEventListener("input", encodeText)
			function encodeText(event) {
				try {
					// get text
						var plaintext = ELEMENTS.plaintext.value.trim()

					// no text
						if (!plaintext || !plaintext.length) {
							return
						}

					// split & convert
						var characters = plaintext.split("")
						for (var i in characters) {
							characters[i] = CONSTANTS.textToMorse[characters[i].toLowerCase()] || "?"
						}

					// rejoin & show
						ELEMENTS.codetext.value = characters.join(" ")
				}
				catch (error) { console.log(error) }
			}

		/* decodeText */
			ELEMENTS.codetext.addEventListener("input", decodeText)
			function decodeText(event) {
				try {
					// get text
						var codetext = ELEMENTS.codetext.value.trim()

					// no text
						if (!codetext || !codetext.length) {
							return
						}

					// convert _ to -
						codetext = codetext.replace(/_/g, "-")
						codetext = codetext.replace(/\n/g, " ~ ")
						codetext = codetext.replace(/\s{2,}/g, " ~ ")

					// split & convert
						var characters = codetext.split(/\s/)
						for (var i in characters) {
							characters[i] = CONSTANTS.morseToText[characters[i]] || "?"
						}

					// rejoin & show
						ELEMENTS.plaintext.value = characters.join("")
				}
				catch (error) { console.log(error) }
			}

		/* pressButton */
			ELEMENTS.dit.addEventListener("click", pressButton)
			ELEMENTS.dah.addEventListener("click", pressButton)
			ELEMENTS.space.addEventListener("click", pressButton)
			function pressButton(event) {
				try {
					// value
						var value = event.target.value
						ELEMENTS.codetext.value += value

					// update decode
						decodeText()
				}
				catch (error) { console.log(error) }
			}

	/*** files ***/
		/* dragFile */
			ELEMENTS.plaintext.addEventListener("dragover", dragFile)
			ELEMENTS.codetext.addEventListener("dragover", dragFile)
			function dragFile(event) {
				try {
					// prevent default
						event.preventDefault()
				} catch (error) {console.log(error)}
			}

		/* dropFile */
			ELEMENTS.plaintext.addEventListener("drop", dropFile)
			ELEMENTS.codetext.addEventListener("drop", dropFile)
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

								if (textarea == ELEMENTS.plaintext) {
									encodeText()
									return
								}
								decodeText()
							}
				} catch (error) {console.log(error)}
			}
})