/*** request ***/
	/* countWords */
		exports.countWords = countWords
		function countWords(text) {
			try {
				// validate
					if (!text || !String(text).trim().length) {
						return JSON.stringify({success: false, message: "expecting string parameter 'text'"})
					}

				// count
					var characterCount = text.length || 0

					while (text.indexOf("  ") > 0) {
						text = text.replace("  ", " ")
					}
					text = text.trim()
					text = text.split(" ")
					var wordCount = text.length || 0

					var longestWord = ""
					for (i = 0; i < text.length; i++) {
						if (text[i].length > longestWord.length) {
							longestWord = text[i]
						}
					}
					var longestLength = longestWord.length || 0

				// format and return
					return JSON.stringify({
						success: true,
						characters: characterCount,
						words: wordCount,
						longest: longestLength
					})
			}
			catch (error) { console.log(error) }
		}
