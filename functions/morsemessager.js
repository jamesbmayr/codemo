/*** globals ***/
	/* constants */
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

/*** action ***/
	/* submitQuery */
		exports.submitQuery = submitQuery
		function submitQuery(query) {
			try {
				// text
					if (query.text && String(query.text).trim().length) {
						return encodeText(String(query.text))
					}

				// code
					if (query.code && String(query.code).trim().length) {
						return decodeText(String(query.code))
					}

				// nothing
					return JSON.stringify({success: false, message: "expecting string parameter 'text' OR string parameter 'code'"})
			}
			catch (error) { console.log(error) }
		}

	/* encodeText */
		function encodeText(plaintext) {
				try {
					// get text
						plaintext = plaintext.trim()

					// no text
						if (!plaintext || !plaintext.length) {
							return JSON.stringify({success: false, message: "expecting string parameter 'text'"})
						}

					// split & convert
						var characters = plaintext.split("")
						for (var i in characters) {
							characters[i] = CONSTANTS.textToMorse[characters[i].toLowerCase()] || "?"
						}

					// rejoin & show
						return JSON.stringify({
							success: true,
							output: characters.join(" ")
						})
				}
				catch (error) { console.log(error) }
			}

	/* decodeText */
		function decodeText(codetext) {
			try {
				// get text
					codetext = codetext.trim()

				// no text
					if (!codetext || !codetext.length) {
						return JSON.stringify({success: false, message: "expecting string parameter 'code'"})
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

				// return data
					return JSON.stringify({
						success: true,
						output: characters.join("")
					})
			}
			catch (error) { console.log(error) }
		}
