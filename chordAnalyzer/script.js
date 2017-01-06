$(document).ready(function() {
	
	/* listeners */
		$(document).on("click","#analyze",function() {
			analyze();
		});

		$(document).on("keyup","#analyze",function() {
			analyze();
		});

	/* analyze */
		function analyze() {

			//names
				var notes = [];
				var names = [];
				
				for (i = 0; i < $(".note").length; i++) {
					var value = String($("#note" + i).val()).toLowerCase().replace(" ","").trim();
					if (value.length > 0) {
						notes.push(value);
						names.push(value);
					}
				}

			//notes (numbers)
				for (i = 0; i < notes.length; i++) {
					switch (notes[i]) {
						case "":
						break;

						case "b#":
							notes[i] = 0;
						break;

						case "c":
							notes[i] = 0;
						break;

						case "c#":
							notes[i] = 1;
						break;

						case "db":
							notes[i] = 1;
						break;

						case "d":
							notes[i] = 2;
						break;

						case "d#":
							notes[i] = 3;
						break;

						case "eb":
							notes[i] = 3;
						break;

						case "e":
							notes[i] = 4;
						break;

						case "fb":
							notes[i] = 4;
						break;

						case "e#":
							notes[i] = 5;
						break;

						case "f":
							notes[i] = 5;
						break;

						case "f#":
							notes[i] = 6;
						break;

						case "gb":
							notes[i] = 6;
						break;

						case "g":
							notes[i] = 7;
						break;

						case "g#":
							notes[i] = 8;
						break;

						case "ab":
							notes[i] = 8;
						break;

						case "a":
							notes[i] = 9;
						break;

						case "a#":
							notes[i] = 10;
						break;

						case "bb":
							notes[i] = 10;
						break;

						case "b":
							notes[i] = 11;
						break;

						case "cb":
							notes[i] = 11;
						break;

						default:
						break;
					}
				}

			//pitches (eliminate duplicates)
				var pitches = [];
				var j = 0;

				for (i = 0; i < notes.length; i++) {
					if (!(pitches.indexOf(notes[i]) > -1)) {
						pitches[j] = notes[i];
						j++;
					}
				}

				var notes = [];
				for (i = 0; i < pitches.length; i++) {
					notes[i] = pitches[i];
				}

			//chord
				var chord = [];
				var k = 0;

				while ((chord.length < notes.length) && (k < notes.length)) {
					for (i = 0; i < pitches.length; i++) {
						notes[i] = pitches[i];
					}

					chord = [notes[k]];
					notes.splice(0,1);

					var loopLimit = notes.length;
					var loopCount = 0;

					while ((notes.length > 0) && (loopCount < loopLimit)) {
						for (var i = 0; i < notes.length; i++) {
							//new note is a third above
								if ((chord[chord.length - 1] + 3 === notes[i]) || (chord[chord.length - 1] + 4 === notes[i]) || (chord[chord.length - 1] - 9 === notes[i]) || (chord[chord.length - 1] - 8 === notes[i])) {
									chord.push(notes[i]);
									notes.splice(i,1);
									i--;
								}
						}
						for (var i = 0; i < notes.length; i++) {
							//new note is a third below
								if ((chord[0] - 3 === notes[i]) || (chord[0] - 4 === notes[i]) || (chord[0] + 9 === notes[i]) || (chord[0] + 8 === notes[i])) {
									chord.unshift(notes[i]);
									notes.splice(i,1);
									i--;
								}
						}
						loopCount++;
					}
					k++;
				}

			//root
				switch (chord[0]) {
					case "":
					break;

					case 0:
						if (names.indexOf("b#") > -1) {
							var root = "B#";	
						}
						else if (names.indexOf("c") > -1) {
							var root = "C";	
						}
					break;

					case 1:
						if (names.indexOf("c#") > -1) {
							var root = "C#";	
						}
						else if (names.indexOf("db") > -1) {
							var root = "Db";	
						}
					break;

					case 2:
						if (names.indexOf("d") > -1) {
							var root = "D";	
						}
					break;

					case 3:
						if (names.indexOf("d#") > -1) {
							var root = "D#";	
						}
						else if (names.indexOf("eb") > -1) {
							var root = "Eb";	
						}
					break;

					case 4:
						if (names.indexOf("e") > -1) {
							var root = "E";	
						}
						else if (names.indexOf("fb") > -1) {
							var root = "Fb";	
						}
					break;

					case 5:
						if (names.indexOf("f") > -1) {
							var root = "F";	
						}
					break;

					case 6:
						if (names.indexOf("f#") > -1) {
							var root = "F#";	
						}
						else if (names.indexOf("gb") > -1) {
							var root = "Gb";	
						}
					break;

					case 7:
						if (names.indexOf("g") > -1) {
							var root = "G";	
						}
					break;

					case 8:
						if (names.indexOf("g#") > -1) {
							var root = "G#";	
						}
						else if (names.indexOf("ab") > -1) {
							var root = "Ab";	
						}
					break;

					case 9:
						if (names.indexOf("a") > -1) {
							var root = "A";	
						}
					break;

					case 10:
						if (names.indexOf("a#") > -1) {
							var root = "A#";	
						}
						else if (names.indexOf("bb") > -1) {
							var root = "Bb";	
						}
					break;

					case 11:
						if (names.indexOf("b") > -1) {
							var root = "B";	
						}
						else if (names.indexOf("cb") > -1) {
							var root = "Cb";	
						}
					break;

					default:
						root = "";
					break;
				}

			//inversion
				if (chord.length < 2) {
					var inversion = "";
				}
				else {
					var inversion = "";
					var j = 0;
					while (inversion === "") {
						for (var i = 0; i < chord.length; i++) {
							if (pitches[j] === chord[i]) {
								inversion = i;
							}
						}
						j++;
					}

					switch (inversion) {
						case 0:
							inversion = " in root position";
						break;

						case 1:
							inversion = " in first inversion";
						break;

						case 2:
							inversion = " in second inversion";
						break;

						case 3:
							inversion = " in third inversion";
						break;

						case 4:
							inversion = " in fourth inversion";
						break;
					}
				}

			//structure
				var structure = [];
				structure[0] = 0;

				if (typeof(chord[1]) !== "undefined") {
					if ((chord[0] + 3 === chord[1]) || (chord[0] - 9 === chord[1])) {
						structure[1] = 3;
					}
					else if ((chord[0] + 4 === chord[1]) || (chord[0] - 8 === chord[1])) {
						structure[1] = 4;
					}
				}

				if (typeof(chord[2]) !== "undefined") {
					if ((chord[1] + 3 === chord[2]) || (chord[1] - 9 === chord[2])) {
						structure[2] = 3;
					}
					else if ((chord[1] + 4 === chord[2]) || (chord[1] - 8 === chord[2])) {
						structure[2] = 4;
					}
				}

				if (typeof(chord[3]) !== "undefined") {
					if ((chord[2] + 3 === chord[3]) || (chord[2] - 9 === chord[3])) {
						structure[3] = 3;
					}
					else if ((chord[2] + 4 === chord[3]) || (chord[2] - 8 === chord[3])) {
						structure[3] = 4;
					}
				}

				if (typeof(chord[4]) !== "undefined") {
					if ((chord[3] + 3 === chord[4]) || (chord[3] - 9 === chord[4])) {
						structure[4] = 3;
					}
					else if ((chord[3] + 4 === chord[4]) || (chord[3] - 8 === chord[4])) {
						structure[4] = 4;
					}
				}

			//chordtype
				if (typeof(structure[1]) === "undefined") {
					var chordtype = "note";
				}

				else if (typeof(structure[2]) === "undefined") {
					if (structure[1] === 3) {
						var chordtype = "minor third";
					}
					else if (structure[1] === 4) {
						var chordtype = "major third";
					}
				}

				else if (typeof(structure[3]) === "undefined") {
					if (structure[1] === 3) {
						if (structure[2] === 3) {
							var chordtype = "diminished triad";
						}
						else if (structure[2] === 4) {
							var chordtype = "minor triad";
						}
					}
					else if (structure[1] === 4) {
						if (structure[2] === 3) {
							var chordtype = "major triad";
						}
						else if (structure[2] === 4) {
							var chordtype = "augmented triad";
						}
					}
				}

				else if (typeof(structure[4]) === "undefined") {
					if (structure[1] === 3) {
						if (structure[2] === 3) {
							if (structure[3] === 3) {
								var chordtype = "diminished seventh chord";
							}
							else if (structure[3] === 4) {
								var chordtype = "half-diminished seventh chord";
							}
						}
						else if (structure[2] === 4) {
							if (structure[3] === 3) {
								var chordtype = "minor seventh chord";
							}
							else if (structure[3] === 4) {
								var chordtype = "minor-major seventh chord";
							}
						}
					}
					else if (structure[1] === 4) {
						if (structure[2] === 3) {
							if (structure[3] === 3) {
								var chordtype = "dominant (major-minor) seventh chord";
							}
							else if (structure[3] === 4) {
								var chordtype = "major seventh chord";
							}
						}
						else if (structure[2] === 4) {
							if (structure[3] === 3) {
								var chordtype = "augmented seventh chord";
							}
							else if (structure[3] === 4) {
								var chordtype = "augmented triad";
							}
						}
					}
				}

				else if (typeof(structure[5] === "undefined")) {
					if (structure[1] === 3) {
						if (structure[2] === 3) {
							if (structure[3] === 3) {
								if (structure[4] === 3) {
									var chordtype = "diminished seventh chord";
								}
								else if (structure[4] === 4) {
									var chordtype = "diminished 7 + major 9th chord";
								}
							}
							else if (structure[3] === 4) {
								if (structure[4] === 3) {
									var chordtype = "half-diminished 7 + minor 9th chord";
								}
								else if (structure[4] === 4) {
									var chordtype = "half-diminished 7 + major 9th chord";
								}
							}
						}
						else if (structure[2] === 4) {
							if (structure[3] === 3) {
								if (structure[4] === 3) {
									var chordtype = "minor 7 + minor 9th chord";
								}
								else if (structure[4] === 4) {
									var chordtype = "minor 7 + major 9th chord";
								}
							}
							else if (structure[3] === 4) {
								if (structure[4] === 3) {
									var chordtype = "minor-major 7 + minor 9th chord";
								}
								else if (structure[4] === 4) {
									var chordtype = "minor-major 7 + minor 9th chord";
								}
							}
						}
					}
					else if (structure[1] === 4) {
						if (structure[2] === 3) {
							if (structure[3] === 3) {
								if (structure[4] === 3) {
									var chordtype = "dominant (major-minor) 7 + minor 9th chord";
								}
								else if (structure[4] === 4) {
									var chordtype = "dominant (major-minor) 7 + major 9th chord";
								}
							}
							else if (structure[3] === 4) {
								if (structure[4] === 3) {
									var chordtype = "major 7 + minor 9th chord";
								}
								else if (structure[4] === 4) {
									var chordtype = "major 7 + major 9th chord";
								}
							}
						}
						else if (structure[2] === 4) {
							if (structure[3] === 3) {
								if (structure[4] === 3) {
									var chordtype = "augmented 7 + minor 9th chord";
								}
								else if (structure[4] === 4) {
									var chordtype = "augmented 7 + major 9th chord";
								}
							}
							else if (structure[3] === 4) {
								if (structure[4] === 3) {
									var chordtype = "augmented triad + minor 9th chord";
								}
								else if (structure[4] === 4) {
									var chordtype = "augmented triad + major 9th chord";
								}
							}
						}
					}
				}

			//chord (letters)
				for (i = 0; i < chord.length; i++) {
					switch (chord[i]) {
						case "":
						break;

						case 0:
							if (names.indexOf("b#") > -1) {
								chord[i] = "B#";	
							}
							else if (names.indexOf("c") > -1) {
								chord[i] = "C";	
							}
						break;

						case 1:
							if (names.indexOf("c#") > -1) {
								chord[i] = "C#";	
							}
							else if (names.indexOf("db") > -1) {
								chord[i] = "Db";	
							}
						break;

						case 2:
							if (names.indexOf("d") > -1) {
								chord[i] = "D";	
							}
						break;

						case 3:
							if (names.indexOf("d#") > -1) {
								chord[i] = "D#";	
							}
							else if (names.indexOf("eb") > -1) {
								chord[i] = "Eb";	
							}
						break;

						case 4:
							if (names.indexOf("e") > -1) {
								chord[i] = "E";	
							}
							else if (names.indexOf("fb") > -1) {
								chord[i] = "Fb";	
							}
						break;

						case 5:
							if (names.indexOf("f") > -1) {
								chord[i] = "F";	
							}
						break;

						case 6:
							if (names.indexOf("f#") > -1) {
								chord[i] = "F#";	
							}
							else if (names.indexOf("gb") > -1) {
								chord[i] = "Gb";	
							}
						break;

						case 7:
							if (names.indexOf("g") > -1) {
								chord[i] = "G";	
							}
						break;

						case 8:
							if (names.indexOf("g#") > -1) {
								chord[i] = "G#";	
							}
							else if (names.indexOf("ab") > -1) {
								chord[i] = "Ab";	
							}
						break;

						case 9:
							if (names.indexOf("a") > -1) {
								chord[i] = "A";	
							}
						break;

						case 10:
							if (names.indexOf("a#") > -1) {
								chord[i] = "A#";	
							}
							else if (names.indexOf("bb") > -1) {
								chord[i] = "Bb";	
							}
						break;

						case 11:
							if (names.indexOf("b") > -1) {
								chord[i] = "B";	
							}
							else if (names.indexOf("cb") > -1) {
								chord[i] = "Cb";	
							}
						break;

						default:
						break;
					}
				}

			//chordNotes
				var chordNotes = "";
				for (i = 0; i < chord.length; i++) {
					chordNotes += chord[i];
					if (i < chord.length - 1) {
						chordNotes += " - ";
					}
				}

			//addedNotes
				var added = [];
				for (i = 0; i < names.length; i++) {
					if (!(String(chordNotes.toLowerCase()).indexOf(String(names[i].toLowerCase())) > -1)) {
						added.push(names[i]);
					}
				}

				var addedNotes = "";
				for (i = 0; i < added.length; i++) {
					addedNotes += added[i];
					if (i < added.length - 1) {
						addedNotes += ", ";
					}
				}

				if (addedNotes !== "") {
					addedNotes = " with added (" + addedNotes + ")";
				}
				else {
					addedNotes = "";
				}

			//print info
				info = root + " " + chordtype + " (" + chordNotes + ")" + inversion + addedNotes;

				$("#chords").text(info);

				
		}
});