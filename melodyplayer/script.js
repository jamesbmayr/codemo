/*** globals ***/
	/* audio */
		if (!AUDIO_J) {
			AUDIO_J = window.AUDIO_J
		}

	/* constants */
		const TRIGGERS = {
			keydown: "keydown",
			keyup: "keyup",
			mousedown: "mousedown",
			mouseup: "mouseup",
			click: "click",
			change: "change",
			rightclick: "contextmenu"
		}
		if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
			TRIGGERS.mousedown = "touchstart"
			TRIGGERS.mouseup = "touchend"
		}

		window.addEventListener(TRIGGERS.rightclick, function(event) {
			event.preventDefault()
		})

	/* elements */
		const ELEMENTS = {
			body: document.body,
			scoreboard: document.querySelector("#scoreboard"),
			upload: document.querySelector("#file-input"),
			partsMenu: document.querySelector("#parts-menu-inner"),
			synths: document.querySelector("#synths"),
			tempoMultiplier: document.querySelector("#tempo-multiplier"),
			metronome: document.querySelector("#metronome"),
			play: document.querySelector("#play"),
			score: document.querySelector("#score"),
			title: document.querySelector("#title"),
			keyboard: document.querySelector("#keyboard"),
			blockboard: document.querySelector("#blockboard-inner"),
			blockboardScore: document.querySelector("#blockboard-score")
		}

	/* constants */
		const CONSTANTS = {
			space: 32,
			notesEmoji: "&#127926;",
			percentage: 100,
			minute: 1000 * 60,
			startingTickOffset: 24 * 4,
			tickFudgeFactor: 5,
			metronomeMS: 250,
			metronomeHz: AUDIO_J.constants.tuningAHz * 2,
			metronomeInstrument: "blik",
			metronomeInstrumentVolume: 0.2,
			ensembleInstrumentVolume: 0.2,
			defaultTempo: 120,
			tempoMultiplier: {
				default: 1,
				minimum: 0.1,
				maximum: 5
			},
			blackKeysPerOctave: 5,
			midiModeKeyboardLow: 36,
			midiModeKeyboardHigh: 84,
			normalModeKeyboardLow: 48,
			normalModeKeyboardHigh: 72,
			whichToMidi: {
				"65": 48,
				"87": 49,
				"83": 50,
				"69": 51,
				"68": 52,
				"70": 53,
				"84": 54,
				"71": 55,
				"89": 56,
				"72": 57,
				"85": 58,
				"74": 59,
				"75": 60,
				"79": 61,
				"76": 62,
				"80": 63,
				"186": 64,
				"222": 65,
				"221": 66,
				"13": 67,
				"220": 68
			},
			normalModeMidiLow: 48,
			normalModeMidiHigh: 68,
			midiModeMidiLow: 36,
			midiModeMidiHigh: 84,
		}

	/* state */
		const STATE = {
			selectedParts: [],
			selectedSynth: null,
			tempo: CONSTANTS.defaultTempo,
			tempoMultiplier: CONSTANTS.tempoMultiplier.default,
			interval: Math.round(CONSTANTS.minute / MUSICXML_J.constants.beatToTick.quarter / (CONSTANTS.defaultTempo * CONSTANTS.tempoMultiplier.default)),
			currentMeasure: 0,
			currentTickOfMeasure: 0,
			currentOverallTick: -CONSTANTS.startingTickOffset,
			metronome: false,
			midimode: false,
			notes: {
				"36": {name: "C",     octave: 2, midi: 36, which: null, letter:  "",  color: "white", pressedColor: "rgb(185,  60,  60)"},
				"37": {name: "C♯/D♭", octave: 2, midi: 37, which: null, letter:  "",  color: "black", pressedColor: "rgb(154,  91,  60)"},
				"38": {name: "D",     octave: 2, midi: 38, which: null, letter:  "",  color: "white", pressedColor: "rgb(123, 123,  60)"},
				"39": {name: "D♯/E♭", octave: 2, midi: 39, which: null, letter:  "",  color: "black", pressedColor: "rgb( 91, 154,  60)"},
				"40": {name: "E",     octave: 2, midi: 40, which: null, letter:  "",  color: "white", pressedColor: "rgb( 60, 185,  60)"},
				"41": {name: "F",     octave: 2, midi: 41, which: null, letter:  "",  color: "white", pressedColor: "rgb( 60, 154,  91)"},
				"42": {name: "F♯/G♭", octave: 2, midi: 42, which: null, letter:  "",  color: "black", pressedColor: "rgb( 60, 123, 123)"},
				"43": {name: "G",     octave: 2, midi: 43, which: null, letter:  "",  color: "white", pressedColor: "rgb( 60,  91, 154)"},
				"44": {name: "G♯/A♭", octave: 2, midi: 44, which: null, letter:  "",  color: "black", pressedColor: "rgb( 60,  60, 185)"},
				"45": {name: "A",     octave: 2, midi: 45, which: null, letter:  "",  color: "white", pressedColor: "rgb( 91,  60, 154)"},
				"46": {name: "A♯/B♭", octave: 2, midi: 46, which: null, letter:  "",  color: "black", pressedColor: "rgb(123,  60, 123)"},
				"47": {name: "B",     octave: 2, midi: 47, which: null, letter:  "",  color: "white", pressedColor: "rgb(154,  60,  91)"},
				"48": {name: "C",     octave: 3, midi: 48, which:   65, letter: "a",  color: "white", pressedColor: "rgb(215,  90,  90)"},
				"49": {name: "C♯/D♭", octave: 3, midi: 49, which:   87, letter: "w",  color: "black", pressedColor: "rgb(184, 121,  90)"},
				"50": {name: "D",     octave: 3, midi: 50, which:   83, letter: "s",  color: "white", pressedColor: "rgb(153, 153,  90)"},
				"51": {name: "D♯/E♭", octave: 3, midi: 51, which:   69, letter: "e",  color: "black", pressedColor: "rgb(121, 184,  90)"},
				"52": {name: "E",     octave: 3, midi: 52, which:   68, letter: "d",  color: "white", pressedColor: "rgb( 90, 215,  90)"},
				"53": {name: "F",     octave: 3, midi: 53, which:   70, letter: "f",  color: "white", pressedColor: "rgb( 90, 184, 121)"},
				"54": {name: "F♯/G♭", octave: 3, midi: 54, which:   84, letter: "t",  color: "black", pressedColor: "rgb( 90, 153, 153)"},
				"55": {name: "G",     octave: 3, midi: 55, which:   71, letter: "g",  color: "white", pressedColor: "rgb( 90, 121, 184)"},
				"56": {name: "G♯/A♭", octave: 3, midi: 56, which:   89, letter: "y",  color: "black", pressedColor: "rgb( 90,  90, 215)"},
				"57": {name: "A",     octave: 3, midi: 57, which:   72, letter: "h",  color: "white", pressedColor: "rgb(121,  90, 184)"},
				"58": {name: "A♯/B♭", octave: 3, midi: 58, which:   85, letter: "u",  color: "black", pressedColor: "rgb(153,  90, 153)"},
				"59": {name: "B",     octave: 3, midi: 59, which:   74, letter: "j",  color: "white", pressedColor: "rgb(184,  90, 121)"},
				"60": {name: "C",     octave: 4, midi: 60, which:   75, letter: "k",  color: "white", pressedColor: "rgb(245, 120, 120)"},
				"61": {name: "C♯/D♭", octave: 4, midi: 61, which:   79, letter: "o",  color: "black", pressedColor: "rgb(214, 151, 120)"},
				"62": {name: "D",     octave: 4, midi: 62, which:   76, letter: "l",  color: "white", pressedColor: "rgb(183, 183, 120)"},
				"63": {name: "D♯/E♭", octave: 4, midi: 63, which:   80, letter: "p",  color: "black", pressedColor: "rgb(151, 214, 120)"},
				"64": {name: "E",     octave: 4, midi: 64, which:  186, letter: ";",  color: "white", pressedColor: "rgb(120, 245, 120)"},
				"65": {name: "F",     octave: 4, midi: 65, which:  222, letter: "'",  color: "white", pressedColor: "rgb(120, 214, 151)"},
				"66": {name: "F♯/G♭", octave: 4, midi: 66, which:  221, letter: "]",  color: "black", pressedColor: "rgb(120, 183, 183)"},
				"67": {name: "G",     octave: 4, midi: 67, which:   13, letter: "↵",  color: "white", pressedColor: "rgb(120, 151, 214)"},
				"68": {name: "G♯/A♭", octave: 4, midi: 68, which:  220, letter: "\\", color: "black", pressedColor: "rgb(120, 120, 245)"},
				"69": {name: "A",     octave: 4, midi: 69, which: null, letter: "",   color: "white", pressedColor: "rgb(151, 120, 214)"},
				"70": {name: "A♯/B♭", octave: 4, midi: 70, which: null, letter: "",   color: "black", pressedColor: "rgb(183, 120, 183)"},
				"71": {name: "B",     octave: 4, midi: 71, which: null, letter: "",   color: "white", pressedColor: "rgb(214, 120, 151)"},
				"72": {name: "C",     octave: 5, midi: 72, which: null, letter: "",   color: "white", pressedColor: "rgb(255, 150, 150)"},
				"73": {name: "C♯/D♭", octave: 5, midi: 73, which: null, letter: "",   color: "black", pressedColor: "rgb(244, 181, 150)"},
				"74": {name: "D",     octave: 5, midi: 74, which: null, letter: "",   color: "white", pressedColor: "rgb(213, 213, 150)"},
				"75": {name: "D♯/E♭", octave: 5, midi: 75, which: null, letter: "",   color: "black", pressedColor: "rgb(181, 244, 150)"},
				"76": {name: "E",     octave: 5, midi: 76, which: null, letter: "",   color: "white", pressedColor: "rgb(150, 255, 150)"},
				"77": {name: "F",     octave: 5, midi: 77, which: null, letter: "",   color: "white", pressedColor: "rgb(150, 244, 181)"},
				"78": {name: "F♯/G♭", octave: 5, midi: 78, which: null, letter: "",   color: "black", pressedColor: "rgb(150, 213, 213)"},
				"79": {name: "G",     octave: 5, midi: 79, which: null, letter: "",   color: "white", pressedColor: "rgb(150, 181, 244)"},
				"80": {name: "G♯/A♭", octave: 5, midi: 80, which: null, letter: "",   color: "black", pressedColor: "rgb(150, 150, 255)"},
				"81": {name: "A",     octave: 5, midi: 81, which: null, letter: "",   color: "white", pressedColor: "rgb(181, 150, 244)"},
				"82": {name: "A♯/B♭", octave: 5, midi: 82, which: null, letter: "",   color: "black", pressedColor: "rgb(213, 150, 213)"},
				"83": {name: "B",     octave: 5, midi: 83, which: null, letter: "",   color: "white", pressedColor: "rgb(244, 150, 181)"},
				"84": {name: "C",     octave: 6, midi: 84, which: null, letter: "",   color: "white", pressedColor: "rgb(255, 180, 180)"}
			},
			music: {},
			blockboard: [],
			sheets: {}
		}

/*** scoreboard ***/
	/* firstClick */
		window.addEventListener(TRIGGERS.click, firstClick)
		function firstClick() {
			try {
				// already audio
					if (AUDIO_J.audio) {
						return
					}

				// build
					AUDIO_J.buildAudio()

				// metronome
					AUDIO_J.instruments._metronome = AUDIO_J.buildInstrument(AUDIO_J.getInstrument(CONSTANTS.metronomeInstrument))
					AUDIO_J.instruments._metronome.setParameters({ volume: CONSTANTS.metronomeInstrumentVolume })

				// currently selected instrument
					if (STATE.selectedSynth) {
						AUDIO_J.activeInstrumentId = "_player"
						const parameters = AUDIO_J.getInstrument(STATE.selectedSynth)
						if (parameters) {
							AUDIO_J.instruments._player = AUDIO_J.buildInstrument(parameters)
						}
					}

				// tracks list
					buildTracksList()
			} catch (error) {console.log(error)}
		}

	/* buildTracksList */
		function buildTracksList() {
			try {
				// default
					for (let i in TRACKS) {
						const option = document.createElement("option")
							option.innerText = i
							option.value = i
						ELEMENTS.title.appendChild(option)
					}
			} catch (error) {console.log(error)}
		}

	/* buildMainSynthsList */
		buildMainSynthsList()
		function buildMainSynthsList() {
			try {
				// build out list
					ELEMENTS.synths.innerHTML = ""
					AUDIO_J.getInstruments({include: ["simple", "default", "custom"], grouping: "family", format: "select", select: ELEMENTS.synths})

				// group
					const helper = document.createElement("option")
						helper.innerHTML = "[synth]"
						helper.value = null
						helper.selected = true
						helper.disabled = true
					ELEMENTS.synths.prepend(helper)

				// random to start
					const defaultSynths = AUDIO_J.getInstruments({include: ["default"], grouping: "flat", format: "names"})
					STATE.selectedSynth = defaultSynths[Math.floor(Math.random() * defaultSynths.length)]
					ELEMENTS.synths.value = STATE.selectedSynth
			} catch (error) {console.log(error)}
		}

	/* changeTrack */
		ELEMENTS.title.addEventListener(TRIGGERS.change, changeTrack)
		function changeTrack() {
			try {
				// find file name / path
					const filename = ELEMENTS.title.value.trim()
					if (!(filename in TRACKS)) {
						return
					}

				// get file
					const file = TRACKS[filename]
					if (!file) {
						return
					}

				// parse XML
					STATE.music = JSON.parse(file)

				// reset music
					resetMusic()
				
				// remove custom options
					const customOptions = Array.from(ELEMENTS.title.querySelectorAll("option[custom]")) || []
					for (let i in customOptions) {
						customOptions[i].remove()
					}
			} catch (error) {console.log(error)}
		}

	/* changePlayerSynth */
		ELEMENTS.synths.addEventListener(TRIGGERS.change, changePlayerSynth)
		function changePlayerSynth() {
			try {
				// blur
					ELEMENTS.synths.blur()

				// get new synth name
					const name = ELEMENTS.synths.value.trim()
					if (name == STATE.selectedSynth) {
						return
					}
					STATE.selectedSynth = name

				// kill existing notes
					if (AUDIO_J.instruments._player) {
						AUDIO_J.instruments._player.setParameters({ power: 0 })
						delete AUDIO_J.instruments._player
					}

					const parameters = AUDIO_J.getInstrument(name)
					if (parameters) {
						AUDIO_J.instruments._player = AUDIO_J.buildInstrument(parameters)
					}
			} catch (error) {console.log(error)}
		}

	/* togglePart */
		function togglePart(event) {
			try {
				// get part
					const checkbox = event.target
					const row = checkbox.closest(".part-row")
					const partId = row.id.split("-")[1]

				// update state
					if (checkbox.checked) {
						if (!STATE.selectedParts.includes(partId)) {
							STATE.selectedParts.push(partId)
						}
						STATE.sheets[partId].setAttribute("active", true)
					}
					else {
						STATE.sheets[partId].removeAttribute("active")
						STATE.selectedParts.splice(STATE.selectedParts.indexOf(partId), 1)
					}
			} catch (error) {console.log(error)}
		}

	/* changeSynthForPart */
		function changeSynthForPart(event) {
			try {
				// get part
					const select = event.target
					const row = select.closest(".part-row")
					const partId = row.id.split("-")[1].split(".")[0]

				// kill existing notes
					if (AUDIO_J.instruments["_ensemble_" + partId]) {
						AUDIO_J.instruments["_ensemble_" + partId].setParameters({ power: 0 })
					}

				// get new synth
					const synthName = select.value.trim()
					const parameters = AUDIO_J.getInstrument(synthName)
					if (parameters) {
						AUDIO_J.instruments["_ensemble_" + partId] = AUDIO_J.buildInstrument(parameters)
						AUDIO_J.instruments["_ensemble_" + partId].setParameters({ volume: CONSTANTS.ensembleInstrumentVolume })
						AUDIO_J.instruments["_ensemble_" + partId].setParameters({ power: 1 })
					}

				// update all parts
					const allRows = Array.from(ELEMENTS.partsMenu.querySelectorAll(".part-row"))
					for (let i in allRows) {
						if (allRows[i].id.includes("part-" + partId)) {
							allRows[i].querySelector(".part-synth").value = synthName
						}
					}
			} catch (error) {console.log(error)}
		}

	/* changeTempoMultiplier */
		ELEMENTS.tempoMultiplier.addEventListener(TRIGGERS.change, changeTempoMultiplier)
		function changeTempoMultiplier(event) {
			try {
				// validate
					const tempoMultiplier = Math.min(CONSTANTS.tempoMultiplier.maximum, Math.max(CONSTANTS.tempoMultiplier.minimum, ELEMENTS.tempoMultiplier.value))

				// update
					STATE.tempoMultiplier = tempoMultiplier
					ELEMENTS.tempoMultiplier.value = STATE.tempoMultiplier
					STATE.interval = Math.round(CONSTANTS.minute / MUSICXML_J.constants.beatToTick.quarter / (STATE.tempo * STATE.tempoMultiplier))
			} catch (error) {console.log(error)}
		}

	/* changeMetronome */
		ELEMENTS.metronome.addEventListener(TRIGGERS.click, changeMetronome)
		function changeMetronome(event) {
			try {
				// flip state
					STATE.metronome = !STATE.metronome

				// update button
					if (STATE.metronome) {
						ELEMENTS.metronome.setAttribute("active", true)
						return
					}
					ELEMENTS.metronome.removeAttribute("active")
			} catch (error) {console.log(error)}
		}

/*** musicXML ***/
	/* uploadFile */
		ELEMENTS.upload.addEventListener(TRIGGERS.change, uploadFile)
		function uploadFile(event) {
			try {
				// file
					const file = ELEMENTS.upload.files[0]
					if (!file) { return }

				// read
					const reader = new FileReader()
						reader.readAsText(file)
						reader.onload = function(event) {
							try {
								// remove custom options
									const customOptions = Array.from(ELEMENTS.title.querySelectorAll("option[custom]")) || []
									for (let i in customOptions) {
										customOptions[i].remove()
									}

								// parse XML
									const parser = new DOMParser()
									const musicXML = parser.parseFromString(event.target.result, "text/xml")
									STATE.music = MUSICXML_J.parseMusicXML(musicXML)

								// reset music
									resetMusic()
							} catch (error) {console.log(error)}
							ELEMENTS.upload.value = null
						}
			} catch (error) {console.log(error)}
		}

	/* buildPartsList */
		function buildPartsList() {
			try {
				// clear out
					ELEMENTS.partsMenu.innerHTML = ""
					STATE.selectedParts = []

				// delete existing parts
					for (let i in AUDIO_J.instruments) {
						if (i.includes("_ensemble_")) {
							AUDIO_J.instruments[i].setParameters({power: 0})
							delete AUDIO_J.instruments[i]
						}
					}

				// loop through parts
					for (let i in STATE.music.parts) {
						// create synth
							AUDIO_J.instruments["_ensemble_" + i] = AUDIO_J.buildInstrument(AUDIO_J.getInstrument(STATE.music.parts[i].synth))
							AUDIO_J.instruments["_ensemble_" + i].setParameters({ volume: CONSTANTS.ensembleInstrumentVolume })

						// html elements
							const row = document.createElement("div")
								row.className = "part-row"
								row.id = "part-" + i
							ELEMENTS.partsMenu.appendChild(row)

								const label = document.createElement("label")
									label.className = "part-label"
								row.appendChild(label)

									const checkbox = document.createElement("input")
										checkbox.type = "checkbox"
										checkbox.checked = false
										checkbox.className = "part-checkbox"
										checkbox.addEventListener(TRIGGERS.change, togglePart)
									label.appendChild(checkbox)

									const span = document.createElement("span")
										span.className = "part-name"
										span.innerText = STATE.music.parts[i].name
									label.appendChild(span)

								const select = document.createElement("select")
									select.className = "part-synth"
									select.innerHTML = ""
									AUDIO_J.getInstruments({include: ["simple", "default", "custom"], grouping: "family", format: "select", select: select})
									select.value = STATE.music.parts[i].synth
									select.addEventListener(TRIGGERS.change, changeSynthForPart)
								row.appendChild(select)
					}
			} catch (error) {console.log(error)}
		}

/*** keyboard ***/
	/* buildKeyboard */
		buildKeyboard()
		function buildKeyboard() {
			try {
				// loop through keys
					const whiteCount = (1 + CONSTANTS.midiModeKeyboardHigh - CONSTANTS.midiModeKeyboardLow) - CONSTANTS.blackKeysPerOctave * (CONSTANTS.midiModeKeyboardHigh - CONSTANTS.midiModeKeyboardLow) / AUDIO_J.constants.semitonesPerOctave
					let count = 0
					for (let n in STATE.notes) {
						// pitch
							const note = STATE.notes[n]

						// build key
							note.keyElement = document.createElement("button")
							note.keyElement.className = "key"
							note.keyElement.value = note.midi
							note.keyElement.innerHTML = note.letter
							note.keyElement.addEventListener(TRIGGERS.mousedown, downMouse)
							ELEMENTS.keyboard.appendChild(note.keyElement)

						// mode
							if (CONSTANTS.normalModeKeyboardLow <= Number(n) && Number(n) <= CONSTANTS.normalModeKeyboardHigh) {
								note.keyElement.setAttribute("normal", true)
							}

						// colors
							note.keyElement.setAttribute("color", note.color)
							note.keyElement.style.background = note.pressedColor

							if (note.color == "white") {
								const leftOffset = (count * CONSTANTS.percentage / whiteCount) + "%"
								note.keyElement.style.left = leftOffset
								STATE.notes[n].leftOffset = leftOffset
								count++
							}
							else {
								const leftOffset = (CONSTANTS.percentage / whiteCount * (count - 0.5)) + "%"
								note.keyElement.style.left = leftOffset
								STATE.notes[n].leftOffset = leftOffset
							}
					}
			} catch (error) {console.log(error)}
		}

	/* downMouse */
		function downMouse(event) {
			try {
				// get note
					const midi = Number(event.target.value)
					const note = STATE.notes[String(midi)]
					if (!note) { return }

				// press
					if (!note.pressed) {
						note.pressed = STATE.currentOverallTick
						note.keyElement.setAttribute("pressed", true)
						if (AUDIO_J.instruments._player) {
							AUDIO_J.instruments._player.press(AUDIO_J.getNote(midi)[0])
						}
					}
			} catch (error) {console.log(error)}
		}

	/* upMouse */
		window.addEventListener(TRIGGERS.mouseup, upMouse)
		function upMouse(event) {
			try {
				// loop through notes
					for (let n in STATE.notes) {
						// unpress
							const note = STATE.notes[n]
							if (note.pressed) {
								delete note.pressed
								note.keyElement.removeAttribute("pressed")
								if (AUDIO_J.instruments._player) {
									AUDIO_J.instruments._player.lift(AUDIO_J.getNote(n)[0])
								}
							}
					}
			} catch (error) {console.log(error)}
		}

	/* downKey */
		window.addEventListener(TRIGGERS.keydown, downKey)
		function downKey(event) {
			try {
				// get note
					const which = event.which || null

				// space --> pause/unpause
					if (which == CONSTANTS.space) {
						startGame()
					}

				// notes
					const midi = CONSTANTS.whichToMidi[String(which)]
					const note = STATE.notes[String(midi)]
					if (!note) { return }

				// press
					if (!note.pressed) {
						note.pressed = STATE.currentOverallTick
						note.keyElement.setAttribute("pressed", true)
						if (AUDIO_J.instruments._player) {
							AUDIO_J.instruments._player.press(AUDIO_J.getNote(midi)[0])
						}
					}
			} catch (error) {console.log(error)}
		}

	/* upKey */
		window.addEventListener(TRIGGERS.keyup, upKey)
		function upKey(event) {
			try {
				// get note
					const which = event.which || null
					const midi = CONSTANTS.whichToMidi[String(which)]
					const note = STATE.notes[String(midi)]
					if (!note) { return }

				// unpress
					if (note.pressed) {
						delete note.pressed
						note.keyElement.removeAttribute("pressed")
						if (AUDIO_J.instruments._player) {
							AUDIO_J.instruments._player.lift(AUDIO_J.getNote(midi)[0])
						}
					}
			} catch (error) {console.log(error)}
		}

	/* MIDI - pressKey */
		AUDIO_J.midi.pressKey = function(midi, velocity) {
			try {
				// get note
					const note = STATE.notes[String(midi)]
					if (!note) { return }
				
				// press
					if (!note.pressed) {
						note.pressed = STATE.currentOverallTick
						note.keyElement.setAttribute("pressed", true)
					}
			} catch (error) {console.log(error)}
		}

	/* MIDI - liftKey */
		AUDIO_J.midi.liftKey = function(midi) {
			try {
				// get note
					const note = STATE.notes[String(midi)]
					if (!note) { return }
				
				// press
					if (note.pressed) {
						delete note.pressed
						note.keyElement.removeAttribute("pressed")
					}
			} catch (error) {console.log(error)}
		}

	/* MIDI - connectDevice */
		AUDIO_J.midi.connectDevice = function(type, name) {
			try {
				// reveal full keyboard
					if (type == "controller") {
						STATE.midimode = true
						ELEMENTS.body.setAttribute("midimode", true)

						for (let b in STATE.blockboard) {
							const note = STATE.notes[STATE.blockboard[b].midiModeMidi]
							if (!note) {
								continue
							}
							STATE.blockboard[b].element.style.left = note.leftOffset
						}
					}
			} catch (error) {console.log(error)}
		}

	/* MIDI - disconnectDevice */
		AUDIO_J.midi.disconnectDevice = function(type, name) {
			try {
				// hide full keyboard?
					if (type == "controller") {
						STATE.midimode = false
						ELEMENTS.body.removeAttribute("midimode")

						for (let b in STATE.blockboard) {
							const note = STATE.notes[STATE.blockboard[b].normalModeMidi]
							if (!note) {
								continue
							}
							STATE.blockboard[b].element.style.left = note.leftOffset
						}
					}
			} catch (error) {console.log(error)}
		}

/*** blockboard ***/
	/* buildBlockboard */
		function buildBlockboard() {
			try {
				// clear out
					STATE.blockboard = []
					STATE.sheets = {}
					ELEMENTS.blockboard.innerHTML = ""
					ELEMENTS.blockboard.style.bottom = "calc((" + (-STATE.currentOverallTick) + ") * var(--pxPerTick)"

				// starting tempo
					STATE.tempo = STATE.music.tempoChanges['1'] || CONSTANTS.defaultTempo
					STATE.interval = Math.round(CONSTANTS.minute / MUSICXML_J.constants.beatToTick.quarter / (STATE.tempo * STATE.tempoMultiplier))

				// loop through all parts
					for (let i in STATE.music.parts) {
						// sheet
							const sheet = document.createElement("div")
								sheet.id = "sheet-" + i
								sheet.className = "blockboard-sheet"
							ELEMENTS.blockboard.appendChild(sheet)
							STATE.sheets[i] = sheet

							if (STATE.selectedParts.includes(i)) {
								sheet.setAttribute("active", true)
							}

						// measures
							const measures = STATE.music.parts[i].measures
							let currentOverallTick = 0
							for (let m in measures) {
								currentOverallTick = buildMeasure(i, sheet, Number(currentOverallTick), measures[m])
							}
					}
			} catch (error) {console.log(error)}
		}

	/* buildMeasure */
		function buildMeasure(partId, sheetElement, currentOverallTick, measure) {
			try {
				// loop through notes
					for (let t in measure.notes) {
						const measureOffsetTicks = Number(t)
						for (let p in measure.notes[t]) {
							// starting point
								const durationTicks = measure.notes[t][p]
								const offsetTicks = currentOverallTick + measureOffsetTicks

							// adjusted midis
								const midi = Number(p)

								// normal mode
									let normalModeMidi = midi
									while (normalModeMidi < CONSTANTS.normalModeMidiLow) {
										normalModeMidi += AUDIO_J.constants.semitonesPerOctave
									}
									while (normalModeMidi > CONSTANTS.normalModeMidiHigh) {
										normalModeMidi -= AUDIO_J.constants.semitonesPerOctave
									}

								// midimode
									let midiModeMidi = midi
									while (midiModeMidi < CONSTANTS.midiModeMidiLow) {
										midiModeMidi += AUDIO_J.constants.semitonesPerOctave
									}
									while (midiModeMidi > CONSTANTS.midiModeMidiHigh) {
										midiModeMidi -= AUDIO_J.constants.semitonesPerOctave
									}
							
							// block
								const blockElement = document.createElement("div")
									blockElement.className = "block"
									blockElement.style.bottom = "calc((" + offsetTicks + ") * var(--pxPerTick)"
									blockElement.style.height = "calc(" + durationTicks + " * var(--pxPerTick))"
									blockElement.setAttribute("color", STATE.notes[midiModeMidi].color)
									blockElement.style.background = STATE.notes[midiModeMidi].pressedColor
									blockElement.style.left = STATE.midimode && STATE.notes[midiModeMidi] ? STATE.notes[midiModeMidi].leftOffset : STATE.notes[normalModeMidi].leftOffset
								sheetElement.appendChild(blockElement)

							// object
								STATE.blockboard.push({
									partId: partId,
									midi: midi,
									normalModeMidi: normalModeMidi,
									midiModeMidi: midiModeMidi,
									offsetTicks: offsetTicks,
									durationTicks: durationTicks,
									element: blockElement,
									captured: false
								})
						}
					}

				// return tick
					return currentOverallTick + measure.ticks
			} catch (error) {console.log(error)}
		}

/*** game ***/
	/* resetMusic */
		function resetMusic() {
			try {
				// reset state
					STATE.currentMeasure = 0
					STATE.currentTickOfMeasure = 0
					STATE.currentOverallTick = -CONSTANTS.startingTickOffset
					STATE.score = 0

				// parts list
					buildPartsList()

				// blocks
					buildBlockboard()

				// title
					const selectValue = STATE.music.title + (STATE.music.composer ? (" (" + STATE.music.composer + ")") : "")
					if (!ELEMENTS.title.querySelector("option[value='" + selectValue + "']")) {
						const option = document.createElement("option")
							option.setAttribute("custom", true)
							option.value = option.innerText = selectValue
						ELEMENTS.title.appendChild(option)
					}
					ELEMENTS.title.value = selectValue

				// scoreboard
					ELEMENTS.score.innerHTML = ""
					ELEMENTS.scoreboard.removeAttribute("pending")
			} catch (error) {console.log(error)}
		}

	/* startGame */
		ELEMENTS.play.addEventListener(TRIGGERS.click, startGame)
		function startGame() {
			try {
				// not ready
					if (!AUDIO_J.audio || !STATE.music) {
						return
					}

				// play --> pause
					if (STATE.playing) {
						delete STATE.playing
						ELEMENTS.scoreboard.removeAttribute("playing", true)
						
						clearInterval(STATE.animationLoop)
						STATE.animationLoop = null

						for (let i in AUDIO_J.instruments) {
							if (i.indexOf("_ensemble_") == 0) {
								AUDIO_J.instruments[i].setParameters({ power: 0 })
							}
						}
						return
					}

				// no music or parts
					if (!STATE.music || !STATE.music.parts) {
						STATE.currentOverallTick = CONSTANTS.startingTickOffset
						return
					}

				// --> play
					STATE.playing = true
					ELEMENTS.scoreboard.setAttribute("playing", true)
					ELEMENTS.blockboardScore.innerHTML = ""
					STATE.animationLoop = setInterval(updateGame, STATE.interval)
					ELEMENTS.play.blur()

					for (let i in AUDIO_J.instruments) {
						if (i.indexOf("_ensemble_") == 0) {
							AUDIO_J.instruments[i].setParameters({ power: 1 })
						}
					}
			} catch (error) {console.log(error)}
		}

	/* updateGame */
		function updateGame() {
			try {
				// metronome
					soundMetronome()

				// all instruments
					for (let p in STATE.music.parts) {
						soundEnsembleInstrument(p, STATE.music.parts[p].measures)
					}

				// move everything
					ELEMENTS.blockboard.style.bottom = "calc((" + (-STATE.currentOverallTick) + ") * var(--pxPerTick)"

				// capture pressed notes
					for (let b in STATE.blockboard) {
						potentiallyCaptureBlock(STATE.blockboard[b])
					}

				// tick / measure info --> if false, then end game
					const options = updateTick()
					if (options && options.end) {
						endGame()
					}
					if (options && options.again) {
						updateGame()
					}
			} catch (error) {console.log(error)}
		}

	/* soundMetronome */
		function soundMetronome() {
			try {
				// not active
					if (!STATE.metronome) {
						return
					}
					
				// not a quarter beat
					if (STATE.currentTickOfMeasure % MUSICXML_J.constants.beatToTick.quarter !== 0) {
						return
					}

				// no metronome
					if (!AUDIO_J.instruments._metronome) {
						return
					}

				// click
					AUDIO_J.instruments._metronome.press(CONSTANTS.metronomeHz)
					setTimeout(function() {
						AUDIO_J.instruments._metronome.kill(CONSTANTS.metronomeHz)
					}, CONSTANTS.metronomeMS)
			} catch (error) {console.log(error)}
		}

	/* soundEnsembleInstrument */
		function soundEnsembleInstrument(partId, measures) {
			try {
				// get measure
					if (!measures[STATE.currentMeasure]) {
						return
					}

				// get ensemble instrument
					const instrument = AUDIO_J.instruments["_ensemble_" + partId]
					if (!instrument) {
						return
					}

				// dynamics
					if (!STATE.currentTickOfMeasure && measures[STATE.currentMeasure].dynamics) {
						instrument.setParameters({ volume: measures[STATE.currentMeasure].dynamics * CONSTANTS.ensembleInstrumentVolume })
					}

				// get notes
					if (!measures[STATE.currentMeasure].notes) {
						return
					}
					const notes = measures[STATE.currentMeasure].notes[STATE.currentTickOfMeasure] || null
					if (!notes) {
						return
					}
				
				// notes
					for (let n in notes) {
						const frequency = AUDIO_J.getNote(n)[0]
						instrument.press(frequency)
						instrument.lift(frequency, STATE.interval * Math.max(1, (notes[n] - 1)))
					}
			} catch (error) {console.log(error)}
		}

	/* updateTick */
		function updateTick() {
			try {
				// increment tick --> swing
					let again = false
					if (STATE.music.swing) {
						const currentTickOfBeat = STATE.currentTickOfMeasure % MUSICXML_J.constants.beatToTick.quarter
						if ([0, 0.5, 3, 3.5, 6, 6.5, 9, 9.5].includes(currentTickOfBeat)) { 
							STATE.currentOverallTick += 0.5
							STATE.currentTickOfMeasure += 0.5
						}
						else {
							STATE.currentOverallTick += 1
							STATE.currentTickOfMeasure += 1

							if ([13, 16, 19, 22].includes(currentTickOfBeat)) {
								again = true
							}
						}
					}
					else {
						STATE.currentOverallTick += 1
						STATE.currentTickOfMeasure += 1
					}

				// before the blocks
					if (STATE.currentMeasure == 0) {
						if (STATE.currentTickOfMeasure >= CONSTANTS.startingTickOffset) {
							STATE.currentTickOfMeasure = 0
							STATE.currentMeasure = 1
						}
					}

				// after the blocks
					else if (STATE.currentMeasure > Object.keys(STATE.music.measureTicks).length) {
						return {end: true}
					}

				// during the blocks
					else {
						if (STATE.currentTickOfMeasure >= STATE.music.measureTicks[STATE.currentMeasure]) {
							STATE.currentTickOfMeasure = 0
							STATE.currentMeasure++

							if (STATE.music.tempoChanges[String(STATE.currentMeasure)]) {
								STATE.tempo = STATE.music.tempoChanges[String(STATE.currentMeasure)]
								STATE.interval = Math.round(CONSTANTS.minute / MUSICXML_J.constants.beatToTick.quarter / (STATE.tempo * STATE.tempoMultiplier))

								clearInterval(STATE.animationLoop)
								STATE.animationLoop = setInterval(updateGame, STATE.interval)
							}
						}
					}

					return {again: again}
			} catch (error) {console.log(error)}
		}

	/* potentiallyCaptureBlock */
		function potentiallyCaptureBlock(block) {
			try {
				// already captured / past
					if (block.captured || block.past) {
						return
					}

				// info
					const currentOffsetTicks = block.offsetTicks - STATE.currentOverallTick

				// past
					if (currentOffsetTicks < -CONSTANTS.tickFudgeFactor) {
						block.past = true
						return
					}

				// upcoming
					if (currentOffsetTicks > CONSTANTS.tickFudgeFactor) {
						return
					}

				// not a selected track
					if (!STATE.selectedParts.includes(block.partId)) {
						return
					}
				
				// not pressed
					const relevantMidi = STATE.midimode ? block.midiModeMidi : block.normalModeMidi
					if (!STATE.notes[relevantMidi] || !STATE.notes[relevantMidi].pressed) {
						return
					}

				// not pressed within grace period
					if (Math.abs(STATE.notes[relevantMidi].pressed - block.offsetTicks) > CONSTANTS.tickFudgeFactor) {
						return
					}

				// capture
					block.captured = true
					block.element.setAttribute("captured", true)
					STATE.score++
					ELEMENTS.score.innerHTML = STATE.score + " <span>" + CONSTANTS.notesEmoji + "</span>"
			} catch (error) {console.log(error)}
		}

	/* endGame */
		function endGame() {
			try {
				// stop loop
					clearInterval(STATE.animationLoop)
					STATE.animationLoop = null

				// stop playing
					STATE.playing = false
					ELEMENTS.scoreboard.removeAttribute("playing")

				// power down background instruments
					for (let i in AUDIO_J.instruments) {
						if (i.indexOf("_ensemble_") == 0) {
							AUDIO_J.instruments[i].setParameters({ power: 0 })
						}
					}

				// display score
					const totalPossibleScore = (STATE.blockboard.filter(function(block) {
						return STATE.selectedParts.includes(block.partId)
					}) || []).length
					ELEMENTS.blockboardScore.innerHTML = STATE.score + "/" + totalPossibleScore + " " + CONSTANTS.notesEmoji

				// reset stuff
					STATE.currentMeasure = 0
					STATE.currentTickOfMeasure = 0
					STATE.currentOverallTick = -CONSTANTS.startingTickOffset
					STATE.score = 0
					ELEMENTS.score.innerHTML = ""

				// rebuild
					buildBlockboard()
			} catch (error) {console.log(error)}
		}
