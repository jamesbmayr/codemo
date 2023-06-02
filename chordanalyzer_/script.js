/* * * page * * */
	/* triggers */
		if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
			var on = { click: "touchstart", mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" }
		}
		else {
			var on = { click:      "click", mousedown:  "mousedown", mousemove: "mousemove", mouseup:  "mouseup" }
		}

	/* on load */
		createList()
		createKeyboard()
		sustain(true)

	/* createList */
		function createList() {
			var instrumentList = document.querySelector("#instruments")
			AUDIO_J.getInstruments({include: ["simple", "default", "custom"], grouping: "family", format: "select", select: instrumentList})
			
			var sampled = document.createElement("optgroup")
				sampled.label = "sampled"
			instrumentList.prepend(sampled)

			var piano = document.createElement("option")
				piano.value = "piano"
				piano.innerText = "piano"
			sampled.appendChild(piano)

			instrumentList.value = "piano"
		}

	/* createKeyboard */
		function createKeyboard() {
			var names = ["C","C#<br>Db","D","D#<br>Eb","E","F","F#<br>Gb","G","G#<br>Ab","A","A#<br>Bb","B"]
			var buttons = ["a","w","s","e","d","f","t","g","y","h","u","j","k","o","l","p",";","&rsquo;","]","enter"]
			var blackKeyMargins = ["left","right","left","none","right"]
			var blackKeyMarginIndex = 0
			
			for (octave = 0; octave < 2; octave++) {
				for (pitch = 0; pitch < 12; pitch++) {
					var key = document.createElement("key")
						key.className = "key"
						key.id = "key_" + ((octave * 12) + pitch)
						key.setAttribute("value", ((octave * 12) + pitch))
						key.addEventListener(on.mousedown, pressKeyButton)

					var span = document.createElement("span")
						span.className = "name"
						span.innerHTML = names[pitch]
					key.appendChild(span)

					if ((octave * 12) + pitch < 20) {
						key.setAttribute("title", buttons[(octave * 12) + pitch])
					}

					if ((pitch === 1) || (pitch === 3) || (pitch === 6) || (pitch === 8) || (pitch === 10)) {
						key.className += " black " + blackKeyMargins[blackKeyMarginIndex]
						document.querySelector("#blackKeys").appendChild(key)
						
						blackKeyMarginIndex++
						if (blackKeyMarginIndex > 4) {
							blackKeyMarginIndex = 0
						}
					}
					else {
						key.className += " white"
						document.querySelector("#whiteKeys").appendChild(key)
					}

					var audio = document.createElement("audio")
						audio.id = "tone_" + ((octave * 12) + pitch)
					document.querySelector("#tones").appendChild(audio)

					var source = document.createElement("source")
						source.setAttribute("src", "tones/" + ((octave * 12) + pitch) + ".m4a")
						source.setAttribute("type", "audio/mpeg")
					audio.appendChild(source)
				}
			}
			
			// last key
				var key = document.createElement("div")
					key.id = "key_24"
					key.className = "key white lastkey"
					key.setAttribute("value", 24)
					key.addEventListener(on.mousedown, pressKeyButton)
				document.querySelector("#whiteKeys").appendChild(key)

				var span = document.createElement("span")
					span.className = "name"
					span.innerHTML = "C"
				key.appendChild(span)
				
				var audio = document.createElement("audio")
					audio.id = "tone_24"
				document.querySelector("#tones").appendChild(audio)

				var source = document.createElement("source")
					source.setAttribute("src", "tones/24.m4a")
					source.setAttribute("type", "audio/mpeg")
				audio.appendChild(source)
		}

	/* listeners */
		document.querySelector("#instruments").addEventListener("change", changeInstrument)
		function changeInstrument(event) {
			if (!AUDIO_J.audio) {
				AUDIO_J.buildAudio()
			}

			var name = event.target.value
			
			if (AUDIO_J.instruments[AUDIO_J.activeInstrumentId]) {
				AUDIO_J.instruments[AUDIO_J.activeInstrumentId].setParameters({ power: 0 })
			}

			if (AUDIO_J.instruments[name]) {
				AUDIO_J.activeInstrumentId = name
				AUDIO_J.instruments[AUDIO_J.activeInstrumentId].setParameters({ power: 1 })
			}
			else {
				var obj = AUDIO_J.getInstrument(name)
				if (obj) {
					AUDIO_J.activeInstrumentId = name
					AUDIO_J.instruments[AUDIO_J.activeInstrumentId] = AUDIO_J.buildInstrument(obj)
				}
				else {
					AUDIO_J.activeInstrumentId = null
				}
			}

			document.querySelector("#instruments").blur()
		}

		function pressKeyButton(event) {
			if (!event.target.className.includes("active")) {
				var key = event.target.getAttribute("value")
				window.lastKey = key
				activate(true, key)
			}
		}

		document.querySelector("#sustain").addEventListener(on.mousedown, pressSustain)
		function pressSustain(event) {
			if (document.querySelector("#sustain").className.includes("sustaining")) {
				sustain(false)
			}
			else {
				sustain(true)
			}
		}

		window.addEventListener(on.mouseup, liftKeyButton)
		function liftKeyButton(event) {
			var key = window.lastKey
			if (!key) {
				return
			}
			setTimeout(function() {
				activate(false, key)
			}, 500)
		}

		window.addEventListener("keydown", pressKey)
		function pressKey(event) {
			if (event.which == 32) {
				sustain(true)
			}
			else {
				switch (event.which) {
					case 65:
						var key = 0
					break

					case 87:
						var key = 1
					break

					case 83:
						var key = 2
					break

					case 69:
						var key = 3
					break

					case 68:
						var key = 4
					break

					case 70:
						var key = 5
					break

					case 84:
						var key = 6
					break

					case 71:
						var key = 7
					break

					case 89:
						var key = 8
					break

					case 72:
						var key = 9
					break

					case 85:
						var key = 10
					break

					case 74:
						var key = 11
					break

					case 75:
						var key = 12
					break

					case 79:
						var key = 13
					break

					case 76:
						var key = 14
					break

					case 80:
						var key = 15
					break

					case 186:
					case 59:
						var key = 16
					break

					case 222:
						var key = 17
					break

					case 221:
						var key = 18
					break

					case 13:
						var key = 19
					break

					case 220:
						var key = 20
					break

					default:
						var key = -1
				}

				if (key > -1 && !document.querySelector("#key_" + key).className.includes("active")) {
					event.preventDefault()
					activate(true, key)
				}
			}
		}

		window.addEventListener("keyup", releaseKey)
		function releaseKey(event) {
			if (event.which == 32) {
				sustain(false)
			}
			else {
				switch (event.which) {
					case 65:
						var key = 0
					break

					case 87:
						var key = 1
					break

					case 83:
						var key = 2
					break

					case 69:
						var key = 3
					break

					case 68:
						var key = 4
					break

					case 70:
						var key = 5
					break

					case 84:
						var key = 6
					break

					case 71:
						var key = 7
					break

					case 89:
						var key = 8
					break

					case 72:
						var key = 9
					break

					case 85:
						var key = 10
					break

					case 74:
						var key = 11
					break

					case 75:
						var key = 12
					break

					case 79:
						var key = 13
					break

					case 76:
						var key = 14
					break

					case 80:
						var key = 15
					break

					case 186:
					case 59:
						var key = 16
					break

					case 222:
						var key = 17
					break

					case 221:
						var key = 18
					break

					case 13:
						var key = 19
					break

					case 220:
						var key = 20
					break

					default:
						var key = -1
				}

				activate(false, key)
			}
		}

	/* activate */
		function activate(go, key) {
			var sustaining = document.querySelector("#sustain").className.includes("sustaining")

			if (key > -1) {
				if (go) {
					if (!document.querySelector("#key_" + key).className.includes("pressed")) {
						document.querySelector("#key_" + key).className += " pressed"
						document.querySelector("#key_" + key).className += " active"
						playTone(key)
						analyzeChord()
					}
				}
				else if (!go) {
					document.querySelector("#key_" + key).className = document.querySelector("#key_" + key).className.replace(/\s?pressed/, "")

					if (!sustaining) {
						document.querySelector("#key_" + key).className = document.querySelector("#key_" + key).className.replace(/\s?active/, "")
						stopTone(key)
						analyzeChord()
					}
				}
			}
		}

	/* sustain */
		function sustain(go) {
			if (go) {
				document.querySelector("#sustain").className = "sustaining"
			}
			else if (!go) {
				document.querySelector("#sustain").className = ""
				Array.from(document.querySelectorAll(".key.active")).forEach(function(element) {
					if (!element.className.includes("pressed")) {
						element.className = element.className.replace(/\s?active/, "")
						var key = element.getAttribute("value")
						stopTone(key)
					}
				})
				analyzeChord()
			}
		}

/* * * chord analysis * * */
	/* analyzeChord */
		function analyzeChord() {
			var pitches = getPitches()

			if (pitches.length > 0) {
				var output = getChord(pitches)
					var chord = output["chord"]
					var addedNotes = output["addedNotes"]

				var rootName = getRootName(chord)

				var inversion = getInversion(pitches,chord)

				var intervals = getIntervals(chord)

				var output = getChordType(intervals)
					var chordType = output[0]
					var shortType = output[1]

				var output = getNoteNames(rootName,chord,addedNotes)
					var chord = output["chord"]
					var addedNotes = output["addedNotes"]

				var output = getAnalysis(rootName,shortType,chordType,chord,inversion,addedNotes)
					var bigOutput = output["bigOutput"]
					var smallOutput = output["smallOutput"]
			}
			else {
				var bigOutput = ""
				var smallOutput = ""
			}

			document.querySelector("#bigOutput").innerText = bigOutput
			document.querySelector("#smallOutput").innerText = smallOutput
		}

	/* getPitches (new) */
		function getPitches() {
			//get all absolutePitches
				var absolutePitches = []
				Array.from(document.querySelectorAll(".key.active")).forEach(function(element) {
					absolutePitches.push(Number(element.getAttribute("value")))
				})

			//order pitches
				absolutePitches = absolutePitches.sort(function(a, b) {return a - b})

			//eliminate octave
				var pitches = []
				for (i = 0; i < absolutePitches.length; i++) {
					pitches[i] = absolutePitches[i] % 12
				}

			//eliminate duplicates
				for (i = 0; i < pitches.length; i++) {
					if (pitches.indexOf(pitches[i]) !== i) {
						pitches.splice(i,1)
						i--
					}
				}

			return pitches
		}

	/* getChord */
		function getChord(originalPitches) {
			//duplicate the originalPitches as remainingPitches
				var remainingPitches = []
				for (i = 0; i < originalPitches.length; i++) {
					remainingPitches[i] = originalPitches[i]
				}

			//start at the beginning
				var possibleChord = []
				var savedChord = []
				var bassIndex = 0

			//until all notes are used, loop through each possible bass note to find the arrangement that uses the most notes
				while ((remainingPitches.length > 0) && (bassIndex < originalPitches.length)) {
					
					//reset the remainingPitches each time
						if (remainingPitches.length !== originalPitches.length) {
							for (i = 0; i < originalPitches.length; i++) {
								remainingPitches[i] = originalPitches[i]
							}
						}

					//start with a different bass note each time
						possibleChord = [remainingPitches[bassIndex]]
						remainingPitches.splice(bassIndex,1)

					//until all notes are used, loop through once for each of the originalPitches
						var loopCount = 0
						while ((remainingPitches.length > 0) && (loopCount < originalPitches.length)) {

							//see if each note is a third above the top note, and if it is, reevaluate with that as the new top note
								var noteIndex = 0
								while (noteIndex < remainingPitches.length) {
									if ((possibleChord[possibleChord.length - 1] + 3 === remainingPitches[noteIndex]) || (possibleChord[possibleChord.length - 1] + 4 === remainingPitches[noteIndex]) || (possibleChord[possibleChord.length - 1] - 9 === remainingPitches[noteIndex]) || (possibleChord[possibleChord.length - 1] - 8 === remainingPitches[noteIndex])) {
										possibleChord.push(remainingPitches[noteIndex])
										remainingPitches.splice(noteIndex,1)
										noteIndex = 0
									}
									else {
										noteIndex++
									}
								}


							//see if each note is a third below the bottom note, and if it is, reevaluate with that as the new bottom note
								var noteIndex = 0
								while (noteIndex < remainingPitches.length) {
									if ((possibleChord[0] - 3 === remainingPitches[noteIndex]) || (possibleChord[0] - 4 === remainingPitches[noteIndex]) || (possibleChord[0] + 9 === remainingPitches[noteIndex]) || (possibleChord[0] + 8 === remainingPitches[noteIndex])) {
										possibleChord.unshift(remainingPitches[noteIndex])
										remainingPitches.splice(noteIndex,1)
										noteIndex = 0
									}
									else {
										noteIndex++
									}
								}


							//loop through again if there are still extra notes to see where they fit in
								loopCount++
						}

					//evaluate this possibleChord and remaining notes
						if (possibleChord.length > savedChord.length) {
							for (i = 0; i < possibleChord.length; i++) {
								savedChord[i] = possibleChord[i]
							}

							var savedRemaining = []
							for (i = 0; i < remainingPitches.length; i++) {
								savedRemaining[i] = remainingPitches[i]
							}

						}

					//loop through again if there are still extra notes to try with the next note in the bass
						bassIndex++
				}

			//restrict 11th+ chords back to 9th chords
				while (savedChord.length > 5) {
					savedRemaining.push(savedChord[5])
					savedChord.splice(5,1)
				}

			//final chord and addedNotes
				return {
					"chord": savedChord,
					"addedNotes": savedRemaining
				}
		}

	/* getRootName */
		function getRootName(chord) {
			switch (chord[0]) {
				case 0:
					return "C"
				break

				case 1:
					return "C#"
				break

				case 2:
					return "D"
				break

				case 3:
					return "Eb"
				break

				case 4:
					return "E"
				break

				case 5:
					return "F"
				break

				case 6:
					return "F#"
				break

				case 7:
					return "G"
				break

				case 8:
					return "Ab"
				break

				case 9:
					return "A"
				break

				case 10:
					return "Bb"
				break

				case 11:
					return "B"
				break
			}
		}

	/* getInversion */
		function getInversion(pitches,chord) {
			//for chords with only 1 note, return nothing
				if (chord.length < 2) {
					return ""
				}

			//for chords with 2 or more notes
				else {
					//eliminate non-chord pitches from the pool
						for (i = 0; i < pitches.length; i++) {
							if (!(chord.indexOf(pitches[i]) > -1)) {
								pitches.splice(i,1)
								i--
							}
						}

					//loop through chord to find out which pitch is in the bass
						for (i = 0; i < chord.length; i++) {
							if (pitches[0] === chord[i]) {
								var inversion = i
							}
						}

					//if not found
						if (typeof inversion === "undefined") {
							inversion = 0
						}

					//return as text
						switch (inversion) {
							case 0:
								return "root position"
							break

							case 1:
								return "first inversion"
							break

							case 2:
								return "second inversion"
							break

							case 3:
								return "third inversion"
							break

							case 4:
								return "fourth inversion"
							break
						}
			}
		}

	/* getIntervals */
		function getIntervals(chord) {
			//all chords
				var intervals = []

			//chord of 2+ pitches
				if (chord.length > 1) {
					if ((chord[0] + 3 === chord[1]) || (chord[0] - 9 === chord[1])) {
						intervals[0] = 3
					}
					else if ((chord[0] + 4 === chord[1]) || (chord[0] - 8 === chord[1])) {
						intervals[0] = 4
					}
				}

			//chord of 3+ pitches
				if (chord.length > 2) {
					if ((chord[1] + 3 === chord[2]) || (chord[1] - 9 === chord[2])) {
						intervals[1] = 3
					}
					else if ((chord[1] + 4 === chord[2]) || (chord[1] - 8 === chord[2])) {
						intervals[1] = 4
					}
				}

			//chord of 4+ pitches
				if (chord.length > 3) {
					if ((chord[2] + 3 === chord[3]) || (chord[2] - 9 === chord[3])) {
						intervals[2] = 3
					}
					else if ((chord[2] + 4 === chord[3]) || (chord[2] - 8 === chord[3])) {
						intervals[2] = 4
					}
				}

			//chord of 5 pitches
				if (chord.length > 4) {
					if ((chord[3] + 3 === chord[4]) || (chord[3] - 9 === chord[4])) {
						intervals[3] = 3
					}
					else if ((chord[3] + 4 === chord[4]) || (chord[3] - 8 === chord[4])) {
						intervals[3] = 4
					}
				}

			return intervals

		}

	/* getChordType */
		function getChordType(intervals) {
			/* 1 pitch (note) */
				if (intervals.length === 0) {
					return ["note",""]
				}

			/* 2 pitches (third) */
				else if (intervals.length === 1) {
					if (intervals[0] === 3) {
						return ["minor third","m"]
					}
					else if (intervals[0] === 4) {
						return ["major third",""]
					}
				}

			/* 3 pitches (triad) */
				else if (intervals.length === 2) {
					if (intervals[0] === 3) {
						if (intervals[1] === 3) {
							return ["diminished triad","dim"]
						}
						else if (intervals[1] === 4) {
							return ["minor triad","m"]
						}
					}
					else if (intervals[0] === 4) {
						if (intervals[1] === 3) {
							return ["major triad",""]
						}
						else if (intervals[1] === 4) {
							return ["augmented triad","aug"]
						}
					}
				}

			/* 4 pitches (seventh chord) */
				else if (intervals.length === 3) {
					if (intervals[0] === 3) {
						if (intervals[1] === 3) {
							if (intervals[2] === 3) {
								return ["diminished seventh chord","dim7"]
							}
							else if (intervals[2] === 4) {
								return ["half-diminished seventh chord","half-dim7"]
							}
						}
						else if (intervals[1] === 4) {
							if (intervals[2] === 3) {
								return ["minor seventh chord","m7"]
							}
							else if (intervals[2] === 4) {
								return ["minor-major seventh chord","mM7"]
							}
						}
					}
					else if (intervals[0] === 4) {
						if (intervals[1] === 3) {
							if (intervals[2] === 3) {
								return ["dominant (major-minor) seventh chord","7"]
							}
							else if (intervals[2] === 4) {
								return ["major seventh chord","M7"]
							}
						}
						else if (intervals[1] === 4) {
							if (intervals[2] === 3) {
								return ["augmented seventh chord","aug7"]
							}
							else if (intervals[2] === 4) {
								return ["augmented triad","aug"]
							}
						}
					}
				}

			/* 5 pitches (ninth chord) */
				else if (intervals.length === 4) {
					if (intervals[0] === 3) {
						if (intervals[1] === 3) {
							if (intervals[2] === 3) {
								if (intervals[3] === 3) {
									return ["diminished seventh chord","dim7"]
								}
								else if (intervals[3] === 4) {
									return ["diminished minor ninth chord","dim-m9"]
								}
							}
							else if (intervals[2] === 4) {
								if (intervals[3] === 3) {
									return ["half-diminished minor ninth chord","half-dim m9"]
								}
								else if (intervals[3] === 4) {
									return ["half-diminished ninth chord","half-dim9"]
								}
							}
						}
						else if (intervals[1] === 4) {
							if (intervals[2] === 3) {
								if (intervals[3] === 3) {
									return ["minor ninth chord","m9"]
								}
								else if (intervals[3] === 4) {
									return ["minor dominant ninth chord","dom-m9"]
								}
							}
							else if (intervals[2] === 4) {
								if (intervals[3] === 3) {
									return ["minor-major ninth chord","mM9"]
								}
								else if (intervals[3] === 4) {
									return ["minor augmented ninth chord","m-aug9"]
								}
							}
						}
					}
					else if (intervals[0] === 4) {
						if (intervals[1] === 3) {
							if (intervals[2] === 3) {
								if (intervals[3] === 3) {
									return ["dominant ninth chord","dom-m9"]
								}
								else if (intervals[3] === 4) {
									return ["dominant ninth chord","9"]
								}
							}
							else if (intervals[2] === 4) {
								if (intervals[3] === 3) {
									return ["major ninth chord","M9"]
								}
								else if (intervals[3] === 4) {
									return ["major augmented ninth chord","M-aug9"]
								}
							}
						}
						else if (intervals[1] === 4) {
							if (intervals[2] === 3) {
								if (intervals[3] === 3) {
									return ["augmented major ninth chord","aug-M9"]
								}
								else if (intervals[3] === 4) {
									return ["augmented ninth chord","aug9"]
								}
							}
							else if (intervals[2] === 4) {
								if (intervals[3] === 3) {
									return ["augmented minor ninth chord","aug-m9"]
								}
								else if (intervals[3] === 4) {
									return ["augmented triad","aug"]
								}
							}
						}
					}
				}
		}

	/* getNoteNames */
		function getNoteNames(rootName,chord,addedNotes) {
			//array of possible letters
				var letters = ["C","D","E","F","G","A","B"]

			//change the first pitch to the rootName
				chord[0] = rootName

			//loop through for all remaining pitches
				for (i = 1; i < chord.length; i++) {
					//get the previousLetter (sans flats or sharps), and go 2 letters up
						var previousLetter = chord[i - 1][0]
						var thisLetter = letters[(letters.indexOf(previousLetter) + 2) % 7]

					//replace the pitch number with the noteName by matching it to the letter
						switch (thisLetter) {
							case "C":
								if (chord[i] === 10) {
									chord[i] = "Cbb"
								}
								else if (chord[i] === 11) {
									chord[i] = "Cb"
								}
								else if (chord[i] === 0) {
									chord[i] = "C"
								}
								else if (chord[i] === 1) {
									chord[i] = "C#"
								}
								else if (chord[i] === 2) {
									chord[i] = "C##"
								}
							break

							case "D":
								if (chord[i] === 0) {
									chord[i] = "Dbb"
								}
								else if (chord[i] === 1) {
									chord[i] = "Db"
								}
								else if (chord[i] === 2) {
									chord[i] = "D"
								}
								else if (chord[i] === 3) {
									chord[i] = "D#"
								}
								else if (chord[i] === 4) {
									chord[i] = "D##"
								}
							break

							case "E":
								if (chord[i] === 2) {
									chord[i] = "Ebb"
								}
								else if (chord[i] === 3) {
									chord[i] = "Eb"
								}
								else if (chord[i] === 4) {
									chord[i] = "E"
								}
								else if (chord[i] === 5) {
									chord[i] = "E#"
								}
								else if (chord[i] === 6) {
									chord[i] = "E##"
								}
							break

							case "F":
								if (chord[i] === 3) {
									chord[i] = "Fbb"
								}
								else if (chord[i] === 4) {
									chord[i] = "Fb"
								}
								else if (chord[i] === 5) {
									chord[i] = "F"
								}
								else if (chord[i] === 6) {
									chord[i] = "F#"
								}
								else if (chord[i] === 7) {
									chord[i] = "F##"
								}
							break

							case "G":
								if (chord[i] === 5) {
									chord[i] = "Gbb"
								}
								else if (chord[i] === 6) {
									chord[i] = "Gb"
								}
								else if (chord[i] === 7) {
									chord[i] = "G"
								}
								else if (chord[i] === 8) {
									chord[i] = "G#"
								}
								else if (chord[i] === 9) {
									chord[i] = "G##"
								}
							break

							case "A":
								if (chord[i] === 7) {
									chord[i] = "Abb"
								}
								else if (chord[i] === 8) {
									chord[i] = "Ab"
								}
								else if (chord[i] === 9) {
									chord[i] = "A"
								}
								else if (chord[i] === 10) {
									chord[i] = "A#"
								}
								else if (chord[i] === 11) {
									chord[i] = "A##"
								}
							break

							case "B":
								if (chord[i] === 9) {
									chord[i] = "Bbb"
								}
								else if (chord[i] === 10) {
									chord[i] = "Bb"
								}
								else if (chord[i] === 11) {
									chord[i] = "B"
								}
								else if (chord[i] === 0) {
									chord[i] = "B#"
								}
								else if (chord[i] === 1) {
									chord[i] = "B##"
								}
							break
						}
				}

			//map addedNotes to common note names
				for (i = 0; i < addedNotes.length; i++) {
					switch (addedNotes[i]) {
						case 0:
							addedNotes[i] = "C"
						break

						case 1:
							addedNotes[i] = "C#"
						break

						case 2:
							addedNotes[i] = "D"
						break

						case 3:
							addedNotes[i] = "Eb"
						break

						case 4:
							addedNotes[i] = "E"
						break

						case 5:
							addedNotes[i] = "F"
						break

						case 6:
							addedNotes[i] = "F#"
						break

						case 7:
							addedNotes[i] = "G"
						break

						case 8:
							addedNotes[i] = "Ab"
						break

						case 9:
							addedNotes[i] = "A"
						break

						case 10:
							addedNotes[i] = "Bb"
						break

						case 11:
							addedNotes[i] = "B"
						break
					}
				}

			//converted to letters
				return {
					"chord": chord,
					"addedNotes": addedNotes
				}
		}

	/* getAnalysis */
		function getAnalysis(rootName,shortType,chordType,chord,inversion,addedNotes) {
			//bigOutput
				var bigOutput = rootName + " " + shortType
			
			//smallOutput
				var smallOutput = ""
			
			//rootName
				smallOutput += rootName

			//chordType
				smallOutput += " " + chordType

			//chord
				smallOutput += " ("
				for (i = 0; i < chord.length; i++) {
					smallOutput += chord[i]

					if (i < chord.length - 1) {
						smallOutput += " - "
					}
					else {
						smallOutput += ")"
					}
				}

			//inversion
				if (inversion.length > 0) {
					smallOutput += " in " + inversion
				}

			//addedNotes
				if (addedNotes.length > 0) {
					smallOutput += " with added "
					for (i = 0; i < addedNotes.length; i++) {
						smallOutput += addedNotes[i]

						if (i < addedNotes.length - 1) {
							smallOutput += ", "
						}
					}
				}

			return {
				"bigOutput": bigOutput,
				"smallOutput": smallOutput
			}
		}

/* * * tones * * */
	/* playTone */
		function playTone(tone) {
			if (AUDIO_J.instruments[AUDIO_J.activeInstrumentId]) {
				AUDIO_J.instruments[AUDIO_J.activeInstrumentId].press(AUDIO_J.getNote(+tone + 48)[0])
			}
			else {
				var sample = document.getElementById("tone_" + tone)
				sample.pause()
				sample.currentTime = 0
				sample.play()
			}
		}

	/* stopTone */
		function stopTone(tone) {
			if (AUDIO_J.instruments[AUDIO_J.activeInstrumentId]) {
				AUDIO_J.instruments[AUDIO_J.activeInstrumentId].lift(AUDIO_J.getNote(+tone + 48)[0])
			}
			else {
				var sample = document.getElementById("tone_" + tone)
				sample.pause()
				sample.currentTime = 0
			}
		}

/*** midi hooks ***/
	/* pressKey */
		AUDIO_J.midi.pressKey = function(note, velocity) {
			try {
				var key = document.getElementById("key_" + (+note - 48))
				if (key && key.className !== "pressed") {
					key.className += " pressed"
				}
				if (key && key.className !== "active") {
					key.className += " active"
				}
				analyzeChord()
			} catch (error) {console.log(error)}
		}

	/* liftKey */
		AUDIO_J.midi.liftKey = function(note) {
			try {
				var key = document.getElementById("key_" + (+note - 48))
				if (key) {
					key.className = key.className.replace(/\s?pressed/, "")

					if (document.querySelector("#sustain").className !== "sustaining") {
						key.className = key.className.replace(/\s?active/, "")
					}
				}
				analyzeChord()
			} catch (error) {console.log(error)}
		}

	/* pressPedal */
		AUDIO_J.midi.pressPedal = function() {
			try {
				var key = document.getElementById("sustain")
				if (key) {
					key.className = "sustaining"
				}
			} catch (error) {console.log(error)}
		}

	/* liftPedal */
		AUDIO_J.midi.liftPedal = function() {
			try {
				var key = document.getElementById("sustain")
				if (key) {
					key.className = ""
				}

				Array.from(document.querySelectorAll(".key.active")).forEach(function(element) {
					if (!element.className.includes("pressed")) {
						element.className = element.className.replace(/\s?active/, "")
						var key = element.getAttribute("value")
						stopTone(key)
					}
				})
			} catch (error) {console.log(error)}
		}
