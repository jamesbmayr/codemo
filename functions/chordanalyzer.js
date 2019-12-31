/*** chord analysis ***/
	/* analyzeChord */
		exports.analyzeChord = analyzeChord
		function analyzeChord(pitches) {
			try {
				if (!Array.isArray(pitches) || !pitches.length) {
					return JSON.stringify({success: false, message: "no pitches given"})
				}
				else {
					pitches = getPitchNumbers(pitches)
					pitches = getPitches(pitches)

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

					return JSON.stringify({
						success: true,
						pitches: pitches,
						chord: chord,
						addedNotes: addedNotes,
						rootName: rootName,
						inversion: inversion,
						intervals: intervals,
						chordType: chordType,
						shortType: shortType,
						chord: chord,
						bigOutput: bigOutput,
						smallOutput: smallOutput
					})
				}
			}
			catch (error) {
				console.log(error)
				return JSON.stringify({success: false, message: "unable to analyze chord"})
			}
		}

	/* getPitchNumbers */
		function getPitchNumbers(pitchLetters) {
			var pitches = []
			var octave = 0
			var previousNote = 0

			for (var i in pitchLetters) {
				pitchLetters[i] = pitchLetters[i].replace(/\s/gi,"").replace(/double sharp/gi,"##").replace(/double flat/gi,"bb").replace(/sharp/gi,"#").replace(/flat/gi,"b") || ""

				if (isNaN(pitchLetters[i])) {
					switch (pitchLetters[i]) {
						case "B#":
						case "C":
						case "Dbb":
							if (0 + (octave * 12) > previousNote) {
								pitches[i] = 0 + (octave * 12)
							}
							else {
								octave += 1
								pitches[i] = 0 + (octave * 12)
							}
							previousNote = pitches[i]
						break

						case "B##":
						case "C#":
						case "Db":
							if (1 + (octave * 12) > previousNote) {
								pitches[i] = 1 + (octave * 12)
							}
							else {
								octave += 1
								pitches[i] = 1 + (octave * 12)
							}
							previousNote = pitches[i]
						break

						case "C##":
						case "D":
						case "Ebb":
							if (2 + (octave * 12) > previousNote) {
								pitches[i] = 2 + (octave * 12)
							}
							else {
								octave += 1
								pitches[i] = 2 + (octave * 12)
							}
							previousNote = pitches[i]
						break

						case "D#":
						case "Eb":
						case "Fbb":
							if (3 + (octave * 12) > previousNote) {
								pitches[i] = 3 + (octave * 12)
							}
							else {
								octave += 1
								pitches[i] = 3 + (octave * 12)
							}
							previousNote = pitches[i]
						break

						case "D##":
						case "E":
						case "Fb":
							if (4 + (octave * 12) > previousNote) {
								pitches[i] = 4 + (octave * 12)
							}
							else {
								octave += 1
								pitches[i] = 4 + (octave * 12)
							}
							previousNote = pitches[i]
						break

						case "E#":
						case "F":
						case "Gbb":
							if (5 + (octave * 12) > previousNote) {
								pitches[i] = 5 + (octave * 12)
							}
							else {
								octave += 1
								pitches[i] = 5 + (octave * 12)
							}
							previousNote = pitches[i]
						break

						case "E##":
						case "F#":
						case "Gb":
							if (6 + (octave * 12) > previousNote) {
								pitches[i] = 6 + (octave * 12)
							}
							else {
								octave += 1
								pitches[i] = 6 + (octave * 12)
							}
							previousNote = pitches[i]
						break

						case "F##":
						case "G":
						case "Abb":
							if (7 + (octave * 12) > previousNote) {
								pitches[i] = 7 + (octave * 12)
							}
							else {
								octave += 1
								pitches[i] = 7 + (octave * 12)
							}
							previousNote = pitches[i]
						break

						case "G#":
						case "Ab":
							if (8 + (octave * 12) > previousNote) {
								pitches[i] = 8 + (octave * 12)
							}
							else {
								octave += 1
								pitches[i] = 8 + (octave * 12)
							}
							previousNote = pitches[i]
						break

						case "G##":
						case "A":
						case "Bbb":
							if (9 + (octave * 12) > previousNote) {
								pitches[i] = 9 + (octave * 12)
							}
							else {
								octave += 1
								pitches[i] = 9 + (octave * 12)
							}
							previousNote = pitches[i]
						break

						case "A#":
						case "Bb":
						case "Cbb":
							if (10 + (octave * 12) > previousNote) {
								pitches[i] = 10 + (octave * 12)
							}
							else {
								octave += 1
								pitches[i] = 10 + (octave * 12)
							}
							previousNote = pitches[i]
						break

						case "A##":
						case "B":
						case "Cb":
							if (11 + (octave * 12) > previousNote) {
								pitches[i] = 11 + (octave * 12)
							}
							else {
								octave += 1
								pitches[i] = 11 + (octave * 12)
							}
							previousNote = pitches[i]
						break

						default
							pitches[i] = null
					}
				}
				else {
					pitches[i] = Number(pitchLetters[i])
				}
			}

			return pitches
		}

	/* getPitches */
		function getPitches(absolutePitches) {
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
