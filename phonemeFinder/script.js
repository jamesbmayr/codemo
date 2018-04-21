window.onload = function() {

	/* submitForm */
		document.getElementById("form").addEventListener("submit", submitForm)
		function submitForm() {
			// get words
				var word1 = document.getElementById("word1").value || ""
					word1 = word1.toLowerCase().trim()

				var word2 = document.getElementById("word2").value || ""
					word2 = word2.toLowerCase().trim()

			// make lists
				var list1 = makeList(word1)
				var list2 = makeList(word2)

			// look for overlap
				var overlap = findOverlap(list1, list2) || false
				document.getElementById("output").innerHTML = overlap || "no overlap"
		}

	/* makeList */
		function makeList(word) {
			// reset list and tree
				list = makeBranch("", word, [])[1] || []

			// filter list
				list = list.filter(function (value, index, self) {
					return self.indexOf(value) == index
				})

			return list
		}

	/* makeBranch */
		function makeBranch(base, remainder, list) {
			var parent = {}

			if (!remainder.length) {
				// add to list
					list.push(base + remainder)
					return false
			}
			else {
				// cycle through letters, up to 4
					for (var x = 1; (x <= 4) && (x <= remainder.length); x++) {
						// grapheme & fragment
							var grapheme = remainder.slice(0, x) || ""
							var fragment = remainder.slice(x) || ""
							var lastGrapheme = (base.slice(-1) == ";" ? base.slice(-6) : base.slice(-1)) || ""

						// avoid repeats
							if (grapheme == lastGrapheme) {
								continue
							}

						// silents
							if (["h", "j", "gh", "e"].includes(grapheme)) {
								parent[base + ""] = makeBranch(base + "", fragment, list)[0]
							}

						// consonants
							if (["b", "bb"].includes(grapheme)) {
								parent[base + "b"] = makeBranch(base + "b", fragment, list)[0]
							}

							if (["d", "dd", "ed", "t"].includes(grapheme)) {
								parent[base + "d"] = makeBranch(base + "d", fragment, list)[0]
							}

							if (["f", "ff", "ph", "gh", "lf"].includes(grapheme)) {
								parent[base + "f"] = makeBranch(base + "f", fragment, list)[0]
							}

							if (["g", "gg", "gh", "gu", "gue"].includes(grapheme)) {
								parent[base + "g"] = makeBranch(base + "g", fragment, list)[0]
							}

							if (["h", "wh"].includes(grapheme)) {
								parent[base + "h"] = makeBranch(base + "h", fragment, list)[0]
							}

							if (["j", "ge", "g", "dge", "di", "gg"].includes(grapheme)) {
								parent[base + "d&#658;"] = makeBranch(base + "d&#658;", fragment, list)[0] // dʒ
							}

							if (["k", "c", "ch", "cc", "lk", "qu", "q", "ck"].includes(grapheme)) {
								parent[base + "k"] = makeBranch(base + "k", fragment, list)[0]
							}

							if (["l", "ll"].includes(grapheme)) {
								parent[base + "l"] = makeBranch(base + "l", fragment, list)[0]
							}

							if (["m", "mm", "mb", "mn", "lm"].includes(grapheme)) {
								parent[base + "m"] = makeBranch(base + "m", fragment, list)[0]
							}

							if (["n", "nn", "kn", "gn", "pn"].includes(grapheme)) {
								parent[base + "n"] = makeBranch(base + "n", fragment, list)[0]
							}

							if (["p", "pp"].includes(grapheme)) {
								parent[base + "p"] = makeBranch(base + "p", fragment, list)[0]
							}

							if (["r", "rr", "wr", "rh"].includes(grapheme)) {
								parent[base + "&#633;"] = makeBranch(base + "&#633;", fragment, list)[0] // ɹ
							}

							if (["s", "ss", "c", "sc", "ps", "ce", "se"].includes(grapheme)) {
								parent[base + "s"] = makeBranch(base + "s", fragment, list)[0]
							}

							if (["t", "tt", "th", "ed"].includes(grapheme)) {
								parent[base + "t"] = makeBranch(base + "t", fragment, list)[0]
							}

							if (["v", "f", "ph", "ve"].includes(grapheme)) {
								parent[base + "v"] = makeBranch(base + "v", fragment, list)[0]
							}

							if (["w", "wh", "u"].includes(grapheme)) {
								parent[base + "w"] = makeBranch(base + "w", fragment, list)[0]
							}

							if (["y", "i", "j"].includes(grapheme)) {
								parent[base + "j"] = makeBranch(base + "j", fragment, list)[0]
							}

							if (["z", "zz", "s", "ss", "x", "ze", "se"].includes(grapheme)) {
								parent[base + "z"] = makeBranch(base + "z", fragment, list)[0]
							}

							if (["s", "si", "z", "g", "j"].includes(grapheme)) {
								parent[base + "&#658;"] = makeBranch(base + "&#658;", fragment, list)[0] // ʒ
							}

							if (["ch", "tch", "tu", "ti", "te"].includes(grapheme)) {
								parent[base + "t&#643;"] = makeBranch(base + "t&#643;", fragment, list)[0] // tʃ
							}

							if (["sh", "ce", "s", "ci", "si", "ch", "sci", "ti"].includes(grapheme)) {
								parent[base + "&#643;"] = makeBranch(base + "&#643;", fragment, list)[0] // ʃ
							}

							if (["th"].includes(grapheme)) {
								parent[base + "&#952;"] = makeBranch(base + "&#952;", fragment, list)[0] // θ
								parent[base + "&#240;"] = makeBranch(base + "&#240;", fragment, list)[0] // ð
							}

							if (["ng", "n", "ngue"].includes(grapheme)) {
								parent[base + "&#331;"] = makeBranch(base + "&#331;", fragment, list)[0] // ŋ
							}

						// vowels
							if (["a", "ai", "au"].includes(grapheme)) {
								parent[base + "&#230;"] = makeBranch(base + "&#230;", fragment, list)[0] // æ
							}

							if (["a", "ai", "eigh", "aigh", "ay", "et", "ei", "au", "ea", "ey"].includes(grapheme)) {
								parent[base + "&#603;&#618;"] = makeBranch(base + "&#603;&#618;", fragment, list)[0] // ɛɪ
							}

							if (["e", "ea", "ie", "ai", "a", "eo", "ei", "ae", "ay"].includes(grapheme)) {
								parent[base + "&#603;"] = makeBranch(base + "&#603;", fragment, list)[0] // ɛ
							}

							if (["e", "ee", "ea", "y", "ey", "oe", "ie", "i", "ei", "eo", "ay"].includes(grapheme)) {
								parent[base + "i"] = makeBranch(base + "i", fragment, list)[0]
							}

							if (["i", "e", "o", "u", "ui", "y", "ie"].includes(grapheme)) {
								parent[base + "&#618;"] = makeBranch(base + "&#618;", fragment, list)[0] // ɪ
							}

							if (["i", "y", "igh", "ie", "uy", "ye", "ai", "is", "eigh"].includes(grapheme)) {
								parent[base + "a&#618;"] = makeBranch(base + "a&#618;", fragment, list)[0] // ɪ
							}

							if (["o", "a", "ho", "au"].includes(grapheme)) {
								parent[base + "a"] = makeBranch(base + "a", fragment, list)[0]
							}

							if (["o", "oa", "oe", "ow", "ough", "eau", "oo", "ew"].includes(grapheme)) {
								parent[base + "o&#650;"] = makeBranch(base + "o&#650;", fragment, list)[0] // oʊ
							}

							if (["o", "oo", "u", "ou"].includes(grapheme)) {
								parent[base + "&#650;"] = makeBranch(base + "&#650;", fragment, list)[0] // ʊ
							}

							if (["o", "oo", "ew", "ue", "oe", "ough", "ui", "oeu", "ou"].includes(grapheme)) {
								parent[base + "u"] = makeBranch(base + "u", fragment, list)[0]
							}

							if (["o", "aw", "ough", "au", "augh"].includes(grapheme)) {
								parent[base + "&#596;"] = makeBranch(base + "&#596;", fragment, list)[0] // ɔ
							}

							if (["oi", "oy", "uoy"].includes(grapheme)) {
								parent[base + "&#596;&#618;"] = makeBranch(base + "&#596;&#618;", fragment, list)[0] // ɔɪ
							}

							if (["ow", "ou", "ough", "au"].includes(grapheme)) {
								parent[base + "a&#650;"] = makeBranch(base + "a&#650;", fragment, list)[0] // aʊ
							}

							if (["a", "e", "i", "u", "o", "oo", "ou"].includes(grapheme)) {
								parent[base + "&#652;"] = makeBranch(base + "&#652;", fragment, list)[0] // ʌ
							}				

						// combinations
							if (["re", "er", "or", "ir", "ar", "ur"].includes(grapheme)) {
								parent[base + "&#652;&#633;"] = makeBranch(base + "&#652;&#633;", fragment, list)[0] // ʌɹ
							}

							if (["le", "el", "al", "il", "ol", "ul"].includes(grapheme)) {
								parent[base + "&#652;l"] = makeBranch(base + "&#652;l", fragment, list)[0] // ʌl
							}

							if (["y", "u", "uu"].includes(grapheme)) {
								parent[base + "ju"] = makeBranch(base + "ju", fragment, list)[0]
							}

							if (["qu"].includes(grapheme)) {
								parent[base + "kw"] = makeBranch(base + "kw", fragment, list)[0]
							}

							if (["tr"].includes(grapheme)) {
								parent[base + "t&#643;&#633;"] = makeBranch(base + "t&#643;&#633;", fragment, list)[0] // tʃɹ
							}

							if (["nk"].includes(grapheme)) {
								parent[base + "&#331;k"] = makeBranch(base + "&#331;k", fragment, list)[0] // ŋ
							}
					}

				// return
					return [parent, list]
			}
		}

	/* findOverlap */
		function findOverlap(list1, list2) {
			var vowels = ["&#603;&#618;","&#596;&#618;","a&#650;","a&#618;","o&#650;","&#603;","&#230;","&#618;","&#650;","&#596;","&#652;","a","i","u"]

			for (var i = 0; i < list1.length; i++) {
				for (var j = 0; j < list2.length; j++) {
					// get words
						var word1 = list1[i]
						var word2 = list2[j]

					// find the last vowel of the first word
						var lastVowelStart = word1.length
						for (var v = 0; v < vowels.length; v++) {
							var position = word1.lastIndexOf(vowels[v])
							if (position > -1 && position < lastVowelStart) {
								lastVowelStart = position
							}
						}

					// find last syllable of first word (from last vowel --> right)
						if (word1[lastVowelStart]) {
							var lastSyllable = word1.slice(lastVowelStart)

							// find overlap in second word (from last syllable <-- left)
								var overlapEnd = word2.indexOf(lastSyllable)
								if (word2[overlapEnd]) {
									overlapEnd = overlapEnd + lastSyllable.length
									var overlap = word2.slice(0, overlapEnd)

									// confirm this whole text is the end of the first word
										if (word1.slice(-1 * overlap.length) == overlap) {
											return [word1, word2, overlap]
										}
								}
						}
				}
			}

			return false
		}
}
