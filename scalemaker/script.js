/*** globals ***/
	/* audio */
		if (!AUDIO_J) {
			AUDIO_J = window.AUDIO_J
		}

	/* triggers */
		const TRIGGERS = {
			click: "click",
			input: "input",
			mousedown: "mousedown",
			mouseup: "mouseup"
		}

		if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
			TRIGGERS.mousedown = "touchstart"
			TRIGGERS.mouseup = "touchend"
		}

	/* elements */
		const ELEMENTS = {
			body: document.body,
			staff: {
				element: document.querySelector("#staff"),
				clef: document.querySelector("#clef"),
				lineArea: document.querySelector("#line-area"),
				lines: [],
				activeLine: null
			},
			grid: {
				element: document.querySelector("#grid"),
				yAxis: document.querySelector("#y-axis"),
				scaleDegrees: Array.from(document.querySelectorAll("#y-axis .scale-degree")).reverse(),
				graph: document.querySelector("#graph"),
				toggles: document.querySelector("#toggles"),
				notes: [],
				activeNote: null,
				xAxis: document.querySelector("#x-axis"),
				semitones: Array.from(document.querySelectorAll("#x-axis .semitone"))
			},
			controls: {
				element: document.querySelector("#controls"),
				volume: document.querySelector("#volume"),
				playPause: document.querySelector("#play-pause"),
				tempoMultiplier: document.querySelector("#tempo-multiplier"),
				copy: document.querySelector("#copy"),
				download: document.querySelector("#download"),
				synth: document.querySelector("#synth"),
				tonic: document.querySelector("#tonic"),
				scale: document.querySelector("#scale"),
				aka: document.querySelector("#aka-outer")
			},
			keyboard: {
				element: document.querySelector("#keyboard"),
				keys: [],
				activeKey: null
			}
		}

	/* constants */
		const CONSTANTS = {
			appName: "scaleMaker",
			copyTimeoutTime: 1000, // ms
			copySpaces: "   ", // 4
			defaultVolume: 0.5,
			defaultTempo: 120, // bpm
			minute: 60 * 1000, // ms
			ticksPerBeat: MUSICXML_J.constants.beatToTick.quarter, // ticks
			defaultTempoMultiplier: 1, // ratio
			defaultSynth: "keystone",
			defaultTonic: "C", // note
			defaultScale: "Major", // scale
			scaleDegreeOffset: 1, // scale degrees
			midiOffset: MUSICXML_J.constants.noteNameToMidi["C4"], // midi for middle C
			letters: ["A", "B", "C", "D", "E", "F", "G"], // note names
			allowedKeys: ["C", "C♯", "D♭", "D", "D♯", "E♭", "E", "F", "F♯", "G♭", "G", "G♯", "A♭", "A", "A♯", "B♭", "B"], // notes
			enharmonicEquivalents: [ // notes
				["B♯", "C", "D♭♭"],
				["B♯♯", "C♯", "D♭"],
				["C♯♯", "D", "E♭♭"],
				["D♯", "E♭", "F♭♭"],
				["D♯♯", "E", "F♭"],
				["E♯", "F", "G♭♭"],
				["E♯♯", "F♯", "G♭"],
				["F♯♯", "G", "A♭♭"],
				["G♯","A♭"],
				["G♯♯", "A", "B♭♭"],
				["A♯","B♭","C♭♭"],
				["A♯♯","B","C♭"]
			],
			keyboard: [
				{name: "C", color: "white", shape: "L"},
				{name: "C♯/D♭", color: "black", shape: "I"},
				{name: "D", color: "white", shape: "T"},
				{name: "D♯/E♭", color: "black", shape: "I"},
				{name: "E", color: "white", shape: "J"},
				{name: "F", color: "white", shape: "L"},
				{name: "F♯/G♭", color: "black", shape: "I"},
				{name: "G", color: "white", shape: "T"},
				{name: "G♯/A♭", color: "black", shape: "I"},
				{name: "A", color: "white", shape: "T"},
				{name: "A♯/B♭", color: "black", shape: "I"},
				{name: "B", color: "white", shape: "J"}
			],
			scales: {
				"Major": {
					group: "classical",
					mode: "major",
					scaleDegrees: [1,2,3,4,5,6,7],
					semitones: [0,2,4,5,7,9,11]
				},
				"Minor": {
					group: "classical",
					mode: "minor",
					scaleDegrees: [1,2,3,4,5,6,7],
					semitones: [0,2,3,5,7,8,10]
				},
				"Harmonic Minor": {
					group: "classical",
					mode: "minor",
					scaleDegrees: [1,2,3,4,5,6,7],
					semitones: [0,2,3,5,7,8,11]
				},
				"Melodic Minor (Ascending)": {
					group: "classical",
					mode: "minor",
					scaleDegrees: [1,2,3,4,5,6,7],
					semitones: [0,2,3,5,7,9,11]
				},
				"Chromatic (♯)": {
					group: "classical",
					mode: "major",
					scaleDegrees: [1,1,2,2,3,4,4,5,5,6,6,7],
					semitones: [0,1,2,3,4,5,6,7,8,9,10,11]
				},
				"Chromatic (♭)": {
					group: "classical",
					mode: "major",
					scaleDegrees: [1,2,2,3,3,4,5,5,6,6,7,7],
					semitones: [0,1,2,3,4,5,6,7,8,9,10,11]
				},
				"Pentatonic Major": {
					group: "classical",
					mode: "major",
					scaleDegrees: [1,2,3,5,6],
					semitones: [0,2,4,7,9]
				},
				"Pentatonic Minor": {
					group: "classical",
					mode: "minor",
					scaleDegrees: [1,3,4,5,7],
					semitones: [0,3,5,7,10]
				},
				"Ionian": {
					group: "modes",
					mode: "major",
					scaleDegrees: [1,2,3,4,5,6,7],
					semitones: [0,2,4,5,7,9,11]
				},
				"Dorian": {
					group: "modes",
					mode: "minor",
					scaleDegrees: [1,2,3,4,5,6,7],
					semitones: [0,2,3,5,7,9,10]
				},
				"Phrygian": {
					group: "modes",
					mode: "minor",
					scaleDegrees: [1,2,3,4,5,6,7],
					semitones: [0,1,3,5,7,8,10]
				},
				"Lydian": {
					group: "modes",
					mode: "major",
					scaleDegrees: [1,2,3,4,5,6,7],
					semitones: [0,2,4,6,7,9,11]
				},
				"Mixolydian": {
					group: "modes",
					mode: "major",
					scaleDegrees: [1,2,3,4,5,6,7],
					semitones: [0,2,4,5,7,9,10]
				},
				"Aeolian": {
					group: "modes",
					mode: "minor",
					scaleDegrees: [1,2,3,4,5,6,7],
					semitones: [0,2,3,5,7,8,10]
				},
				"Locrian": {
					group: "modes",
					mode: "minor",
					scaleDegrees: [1,2,3,4,5,6,7],
					semitones: [0,1,3,5,6,8,10]
				},
				"Algerian": {
					group: "world",
					mode: "minor",
					scaleDegrees: [1,2,3,4,5,5,6,7],
					semitones: [0,2,3,5,6,7,8,11]
				},
				"Arabic: Hijaz": {
					group: "world",
					mode: "major",
					scaleDegrees: [1,2,3,4,5,6,7],
					semitones: [0,1,4,5,7,8,10]
				},
				"Arabic: Nawa Athar": {
					group: "world",
					mode: "minor",
					scaleDegrees: [1,2,3,4,5,6,7],
					semitones: [0,2,3,6,7,8,11]
				},
				"Arabic: Shad Araban": {
					group: "world",
					mode: "major",
					scaleDegrees: [1,2,3,4,5,6,7],
					semitones: [0,1,4,5,7,8,11]
				},
				"Byzantine": {
					group: "world",
					mode: "major",
					scaleDegrees: [1,2,3,4,5,6,7],
					semitones: [0,1,4,5,7,8,11]
				},
				"Chinese Pentatonic": {
					group: "world",
					mode: "major",
					scaleDegrees: [1,3,4,5,7],
					semitones: [0,4,6,7,11]
				},
				"Flamenco": {
					group: "world",
					mode: "major",
					scaleDegrees: [1,2,3,4,5,6,7],
					semitones: [0,1,4,5,7,8,11]
				},
				"Freygish": {
					group: "world",
					mode: "major",
					scaleDegrees: [1,2,3,4,5,6,7],
					semitones: [0,1,4,5,7,8,10]
				},
				"Hungarian Major": {
					group: "world",
					mode: "major",
					scaleDegrees: [1,2,3,4,5,6,7],
					semitones: [0,3,4,6,7,9,10]
				},
				"Hungarian (Gypsy) Minor": {
					group: "world",
					mode: "minor",
					scaleDegrees: [1,2,3,4,5,6,7],
					semitones: [0,2,3,6,7,8,11]
				},
				"Indian: Asavari": {
					group: "world",
					mode: "minor",
					scaleDegrees: [1,2,3,4,5,6,7],
					semitones: [0,2,3,5,7,8,10]
				},
				"Indian: Bhairav": {
					group: "world",
					mode: "major",
					scaleDegrees: [1,2,3,4,5,6,7],
					semitones: [0,1,4,5,7,8,11]
				},
				"Indian: Bhairavi": {
					group: "world",
					mode: "minor",
					scaleDegrees: [1,2,3,4,5,6,7],
					semitones: [0,1,3,5,7,8,10]
				},
				"Indian: Bilawal": {
					group: "world",
					mode: "major",
					scaleDegrees: [1,2,3,4,5,6,7],
					semitones: [0,2,4,5,7,9,11]
				},
				"Indian: Kafi": {
					group: "world",
					mode: "minor",
					scaleDegrees: [1,2,3,4,5,6,7],
					semitones: [0,2,3,5,7,9,10]
				},
				"Indian: Kalyan": {
					group: "world",
					mode: "major",
					scaleDegrees: [1,2,3,4,5,6,7],
					semitones: [0,2,4,6,7,9,11]
				},
				"Indian: Khamaj": {
					group: "world",
					mode: "major",
					scaleDegrees: [1,2,3,4,5,6,7],
					semitones: [0,2,4,5,7,9,10]
				},
				"Indian: Marwa": {
					group: "world",
					mode: "major",
					scaleDegrees: [1,2,3,4,5,6,7],
					semitones: [0,1,4,6,7,9,11]
				},
				"Indian: Purvi": {
					group: "world",
					mode: "major",
					scaleDegrees: [1,2,3,4,5,6,7],
					semitones: [0,1,4,6,7,8,11]
				},
				"Indian: Todi": {
					group: "world",
					mode: "minor",
					scaleDegrees: [1,2,3,4,5,6,7],
					semitones: [0,1,3,6,7,8,11]
				},
				"Japanese: Hirajoshi": {
					group: "world",
					mode: "minor",
					scaleDegrees: [1,2,3,5,6],
					semitones: [0,2,3,7,8]
				},
				"Japanese: In": {
					group: "world",
					mode: "minor",
					scaleDegrees: [1,2,4,5,6],
					semitones: [0,1,5,7,8]
				},
				"Japanese: Insen": {
					group: "world",
					mode: "minor",
					scaleDegrees: [1,2,4,5,7],
					semitones: [0,1,5,7,10]
				},
				"Japanese: Iwato": {
					group: "world",
					mode: "minor",
					scaleDegrees: [1,2,4,5,7],
					semitones: [0,1,5,6,10]
				},
				"Japanese: Yo": {
					group: "world",
					mode: "major",
					scaleDegrees: [1,2,4,5,6],
					semitones: [0,2,5,7,9]
				},
				"Javanese: Pelog": {
					group: "world",
					mode: "minor",
					scaleDegrees: [1,2,3,4,5,6,7],
					semitones: [0,1,3,6,7,8,10]
				},
				"Javanese: Slendro": {
					group: "world",
					mode: "minor",
					scaleDegrees: [1,2,4,5,6],
					semitones: [0,2,5,7,9]
				},
				"Persian": {
					group: "world",
					mode: "major",
					scaleDegrees: [1,2,3,4,5,6,7],
					semitones: [0,1,4,5,6,8,11]
				},
				"Romanian Minor": {
					group: "world",
					mode: "minor",
					scaleDegrees: [1,2,3,4,5,6,7],
					semitones: [0,2,3,6,7,9,10]
				},
				"Spanish Phrygian": {
					group: "world",
					mode: "major",
					scaleDegrees: [1,2,3,4,5,6,7],
					semitones: [0,1,4,5,7,8,10]
				},
				"Ukranian Dorian": {
					group: "world",
					mode: "minor",
					scaleDegrees: [1,2,3,4,5,6,7],
					semitones: [0,2,3,6,7,9,10]
				},
				"Acoustic Overtones": {
					group: "modern",
					mode: "major",
					scaleDegrees: [1,2,3,4,5,6,7],
					semitones: [0,2,4,6,7,9,10]
				},
				"Altered Dominant": {
					group: "modern",
					mode: "minor",
					scaleDegrees: [1,2,3,4,5,6,7],
					semitones: [0,1,3,4,6,8,10]
				},
				"Bebop Dominant": {
					group: "modern",
					mode: "major",
					scaleDegrees: [1,2,3,4,5,6,7,7],
					semitones: [0,2,4,5,7,9,10,11]
				},
				"Bebop Major": {
					group: "modern",
					mode: "major",
					scaleDegrees: [1,2,3,4,5,5,6,7],
					semitones: [0,2,4,5,7,8,9,11]
				},
				"Bebop Harmonic Minor": {
					group: "modern",
					mode: "minor",
					scaleDegrees: [1,2,3,4,5,6,7,7],
					semitones: [0,2,3,5,7,8,10,11]
				},
				"Bebop Melodic Minor": {
					group: "modern",
					mode: "minor",
					scaleDegrees: [1,2,3,4,5,5,6,7],
					semitones: [0,2,3,5,7,8,9,11]
				},
				"Blues": {
					group: "modern",
					mode: "minor",
					scaleDegrees: [1,3,4,4,5,7],
					semitones: [0,3,5,6,7,10]
				},
				"Blues (9-note)": {
					group: "modern",
					mode: "minor",
					scaleDegrees: [1,2,3,3,4,5,6,7,7],
					semitones: [0,2,3,4,5,7,9,10,11]
				},
				"Double Harmonic Major": {
					group: "modern",
					mode: "major",
					scaleDegrees: [1,2,3,4,5,6,7],
					semitones: [0,1,4,5,7,8,11]
				},
				"Double Harmonic Minor": {
					group: "modern",
					mode: "minor",
					scaleDegrees: [1,2,3,4,5,6,7],
					semitones: [0,2,3,6,7,8,11]
				},
				"Enigmatic": {
					group: "modern",
					mode: "major",
					scaleDegrees: [1,2,3,4,5,6,7],
					semitones: [0,1,4,6,8,10,11]
				},
				"Harmonics": {
					group: "modern",
					mode: "major",
					scaleDegrees: [1,3,3,4,5,6],
					semitones: [0,3,4,5,7,9]
				},
				"Mixolydian ♭6": {
					group: "modern",
					mode: "major",
					scaleDegrees: [1,2,3,4,5,6,7],
					semitones: [0,2,4,5,7,8,10]
				},
				"Neapolitan Major": {
					group: "modern",
					mode: "major",
					scaleDegrees: [1,2,3,4,5,6,7],
					semitones: [0,1,3,5,6,9,11]
				},
				"Neapolitan Minor": {
					group: "modern",
					mode: "minor",
					scaleDegrees: [1,2,3,4,5,6,7],
					semitones: [0,1,3,5,7,8,11]
				},
				"Octatonic (half-whole)": {
					group: "modern",
					mode: "major",
					scaleDegrees: [1,1,2,3,4,5,6,7],
					semitones: [0,1,3,4,6,7,9,10]
				},
				"Octatonic (whole-half)": {
					group: "modern",
					mode: "minor",
					scaleDegrees: [1,2,3,4,4,5,6,7],
					semitones: [0,2,3,5,6,8,9,11]
				},
				"Phrygian Dominant": {
					group: "modern",
					mode: "major",
					scaleDegrees: [1,2,3,4,5,6,7],
					semitones: [0,1,4,5,7,8,10]
				},
				"Prometheus": {
					group: "modern",
					mode: "major",
					scaleDegrees: [1,2,3,4,6,7],
					semitones: [0,2,4,6,9,10]
				},
				"Seventh ♭5 Diminished": {
					group: "modern",
					mode: "major",
					scaleDegrees: [1,2,3,4,5,6,7,7],
					semitones: [0,2,4,5,6,8,10,11]
				},
				"Tritone": {
					group: "modern",
					mode: "major",
					scaleDegrees: [1,2,3,5,5,7],
					semitones: [0,1,4,6,7,10]
				},
				"Tritone (Two-Semitone)": {
					group: "modern",
					mode: "minor",
					scaleDegrees: [1,2,2,4,5,6],
					semitones: [0,1,2,6,7,8]
				},
				"Whole-tone": {
					group: "modern",
					mode: "major",
					scaleDegrees: [1,2,3,4,5,6],
					semitones: [0,2,4,6,8,10]
				}
			},
			toggles: [
				{scaleDegree: 1, semitone: 1},
				{scaleDegree: 2, semitone: 1},
				{scaleDegree: 2, semitone: 2},
				{scaleDegree: 2, semitone: 3},
				{scaleDegree: 3, semitone: 3},
				{scaleDegree: 3, semitone: 4},
				{scaleDegree: 3, semitone: 5},
				{scaleDegree: 4, semitone: 4},
				{scaleDegree: 4, semitone: 5},
				{scaleDegree: 4, semitone: 6},
				{scaleDegree: 5, semitone: 6},
				{scaleDegree: 5, semitone: 7},
				{scaleDegree: 5, semitone: 8},
				{scaleDegree: 6, semitone: 8},
				{scaleDegree: 6, semitone: 9},
				{scaleDegree: 6, semitone: 10},
				{scaleDegree: 7, semitone: 10},
				{scaleDegree: 7, semitone: 11},
				{scaleDegree: 8, semitone: 11}
			]
		}

	/* state */
		const STATE = {
			volume: CONSTANTS.defaultVolume,
			tempoMultiplier: CONSTANTS.defaultTempoMultiplier,
			interval: CONSTANTS.minute / (CONSTANTS.defaultTempo * CONSTANTS.defaultTempoMultiplier * CONSTANTS.ticksPerBeat),
			synth: CONSTANTS.defaultSynth,
			tonic: CONSTANTS.defaultTonic,
			scale: CONSTANTS.defaultScale,
			pressedKeys: {},
			tick: 0,
			measure: 1,
			music: {},
			playing: false,
			playbackLoop: null
		}

/*** start up ***/
	/* loadApplication */
		loadApplication()
		function loadApplication() {
			try {
				// build lists
					AUDIO_J.getInstruments({include: ["simple", "default", "custom"], grouping: "family", format: "select", select: ELEMENTS.controls.synth})
					buildTonicList(ELEMENTS.controls.tonic)
					buildScalesList(ELEMENTS.controls.scale)
					buildToggles(ELEMENTS.grid.toggles)

				// query parameters
					const queryParameters = getQueryParameters()
				
				// tonic
					if (queryParameters && queryParameters.tonic && CONSTANTS.allowedKeys.includes(queryParameters.tonic)) {
						STATE.tonic = queryParameters.tonic
					}

				// scale
					if (queryParameters && queryParameters.scale && CONSTANTS.scales[queryParameters.scale]) {
						STATE.scale = queryParameters.scale
					}
					else {
						STATE.scale = Object.keys(CONSTANTS.scales)[Math.floor(Math.random() * Object.keys(CONSTANTS.scales).length)]
					}

				// set defaults
					ELEMENTS.controls.volume.value = STATE.volume
					ELEMENTS.controls.tempoMultiplier.value = STATE.tempoMultiplier
					ELEMENTS.controls.synth.value = STATE.synth
					ELEMENTS.controls.tonic.value = STATE.tonic
					ELEMENTS.controls.scale.value = STATE.scale

				// set state
					generateState()
			} catch (error) {console.log(error)}
		}

	/* buildTonicList */
		function buildTonicList(select) {
			try {
				// loop through tonics
					for (const tonic of CONSTANTS.allowedKeys) {
						const option = document.createElement("option")
							option.value = tonic
							option.innerText = tonic
						select.appendChild(option)
					}
			} catch (error) {console.log(error)}
		}

	/* buildScalesList */
		function buildScalesList(select) {
			try {
				// groups
					const optGroups = {}

				// custom
					const customGroup = document.createElement("optgroup")
						customGroup.label = "CUSTOM"
					optGroups["CUSTOM"] = customGroup

					const customOption = document.createElement("option")
						customOption.value = "Custom"
						customOption.innerText = "Custom"
					optGroups.CUSTOM.appendChild(customOption)

				// loop through scale
					for (const scale in CONSTANTS.scales) {
						const groupName = CONSTANTS.scales[scale].group
						if (!optGroups[groupName]) {
							const optGroup = document.createElement("optgroup")
								optGroup.label = groupName.toUpperCase()
							optGroups[groupName] = optGroup
						}

						const option = document.createElement("option")
							option.value = scale
							option.innerText = scale
						optGroups[groupName].appendChild(option)
					}

				// append optGroups
					for (const optGroupName in optGroups) {
						select.appendChild(optGroups[optGroupName])
					}
			} catch (error) {console.log(error)}
		}

	/* getQueryParameters */
		function getQueryParameters() {
			try {
				// query string
					const queryString = window.location.search
					if (!queryString || !queryString.length) {
						return null
					}

				// list of pairs
					const pairs = queryString.slice(1).split("&")
					if (!pairs || !pairs.length) {
						return null
					}

				// build object
					const queryParameters = {}
					for (const pair of pairs) {
						const keyValue = pair.split("=")
						queryParameters[keyValue[0].toLowerCase()] = decodeURIComponent(keyValue[1].replace(/sharp/g, "♯").replace(/flat/g, "♭")).trim()
					}

				// return
					return queryParameters
			} catch (error) {console.log(error)}
		}

	/* buildToggles */
		function buildToggles(container) {
			try {
				// loop through
					for (const toggleInfo of CONSTANTS.toggles) {
						const toggleButton = document.createElement("button")
							toggleButton.className = "toggle"
							toggleButton.setAttribute("semitone", toggleInfo.semitone)
							toggleButton.setAttribute("scale-degree", toggleInfo.scaleDegree)
							toggleButton.title = "scale degree " + toggleInfo.scaleDegree + ", semitone " + toggleInfo.semitone
							toggleButton.style.left = "calc(" + toggleInfo.semitone + " * var(--semitone-width))"
							toggleButton.style.bottom = "calc(" + (toggleInfo.scaleDegree - CONSTANTS.scaleDegreeOffset) + " * var(--scale-degree-height))"
							toggleButton.addEventListener(TRIGGERS.click, toggleNote)
						container.appendChild(toggleButton)

						const toggleInner = document.createElement("div")
							toggleInner.className = "toggle-inner"
						toggleButton.appendChild(toggleInner)
					}
			} catch (error) {console.log(error)}
		}

	/* first click */
		window.addEventListener(TRIGGERS.click, firstClick)
		function firstClick() {
			try {
				// already audio?
					if (AUDIO_J.audio) {
						return
					}

				// build audio
					AUDIO_J.buildAudio()

				// instrument
					const parameters = AUDIO_J.getInstrument(STATE.synth)
					if (parameters) {
						AUDIO_J.activeInstrumentId = STATE.synth
						AUDIO_J.instruments[AUDIO_J.activeInstrumentId] = AUDIO_J.buildInstrument(parameters)
						AUDIO_J.instruments[AUDIO_J.activeInstrumentId].setParameters({volume: STATE.volume})
					}
			} catch (error) {console.log(error)}
		}

/*** controls ***/
	/* setVolume */
		ELEMENTS.controls.volume.addEventListener(TRIGGERS.input, setVolume)
		function setVolume(event) {
			try {
				// get value
					const volume = Math.min(1, Math.max(0, Number(ELEMENTS.controls.volume.value)))

				// set state
					STATE.volume = volume

				// audio
					if (AUDIO_J.audio && AUDIO_J.activeInstrumentId) {
						AUDIO_J.instruments[AUDIO_J.activeInstrumentId].setParameters({volume: STATE.volume})
					}
			} catch (error) {console.log(error)}
		}

	/* togglePlayPause */
		ELEMENTS.controls.playPause.addEventListener(TRIGGERS.click, togglePlayPause)
		function togglePlayPause(event) {
			try {
				// already playing --> pause
					if (STATE.playing) {
						STATE.playing = false
						clearInterval(STATE.playbackLoop)
						STATE.playbackLoop = null
						STATE.tick = 0
						STATE.measure = 1

						ELEMENTS.body.removeAttribute("playing")
						clearActive()
						return
					}

				// start playing
					STATE.tick = 0
					STATE.measure = 1
					STATE.playing = true
					STATE.playbackLoop = setInterval(updatePlayback, STATE.interval)

					clearActive()
					ELEMENTS.body.setAttribute("playing", true)
			} catch (error) {console.log(error)}
		}

	/* setTempoMultiplier */
		ELEMENTS.controls.tempoMultiplier.addEventListener(TRIGGERS.input, setTempoMultiplier)
		function setTempoMultiplier(event) {
			try {
				// get value
					const tempoMultiplier = Math.max(0.001, Number(ELEMENTS.controls.tempoMultiplier.value))

				// set state
					STATE.tempoMultiplier = tempoMultiplier
					STATE.interval = CONSTANTS.minute / (CONSTANTS.defaultTempo * STATE.tempoMultiplier * CONSTANTS.ticksPerBeat)
					generateState()
			} catch (error) {console.log(error)}
		}

	/* setSynth */
		ELEMENTS.controls.synth.addEventListener(TRIGGERS.input, setSynth)
		function setSynth(event) {
			try {
				// power down
					if (AUDIO_J.instruments[AUDIO_J.activeInstrumentId]) {
						AUDIO_J.instruments[AUDIO_J.activeInstrumentId].setParameters({power: 0})
					}

				// set state
					STATE.synth = ELEMENTS.controls.synth.value
					generateState()

				// existing instrument
					if (AUDIO_J.instruments[synth]) {
						AUDIO_J.activeInstrumentId = STATE.synth
						AUDIO_J.instruments[AUDIO_J.activeInstrumentId].setParameters({power: 1})
						AUDIO_J.instruments[AUDIO_J.activeInstrumentId].setParameters({volume: STATE.volume})
					}

				// new instrument
					else {
						const parameters = AUDIO_J.getInstrument(STATE.synth)
						if (parameters) {
							AUDIO_J.activeInstrumentId = STATE.synth
							AUDIO_J.instruments[AUDIO_J.activeInstrumentId] = AUDIO_J.buildInstrument(parameters)
							AUDIO_J.instruments[AUDIO_J.activeInstrumentId].setParameters({volume: STATE.volume})
						}
					}
			} catch (error) {console.log(error)}
		}

	/* setTonic */
		ELEMENTS.controls.tonic.addEventListener(TRIGGERS.input, setTonic)
		function setTonic(event) {
			try {
				// get value
					const tonic = ELEMENTS.controls.tonic.value
					if (!CONSTANTS.allowedKeys.includes(tonic)) {
						ELEMENTS.controls.tonic.value = STATE.tonic
					}

				// set state
					STATE.tonic = tonic
					generateState()
			} catch (error) {console.log(error)}
		}

	/* setScale */
		ELEMENTS.controls.scale.addEventListener(TRIGGERS.input, setScale)
		function setScale(event) {
			try {
				// get value
					const scale = ELEMENTS.controls.scale.value
					if (!CONSTANTS.scales[scale] && scale !== "Custom") {
						ELEMENTS.controls.scale.value = STATE.scale
						return
					}

				// set state
					STATE.scale = scale
					generateState()
			} catch (error) {console.log(error)}
		}

	/* copyScale */
		ELEMENTS.controls.copy.addEventListener(TRIGGERS.click, copyScale)
		function copyScale(event) {
			try {
				// already copied
					if (ELEMENTS.controls.copy.getAttribute("copied")) {
						return
					}

				// set state
					ELEMENTS.controls.copy.setAttribute("copied", true)

				// copy to clipboard
					const text = STATE.tonic + " " + STATE.scale + "\n" + 
							"notes:     " + STATE.notes.map(note => (note.name        + CONSTANTS.copySpaces).slice(0, CONSTANTS.copySpaces.length)).join(" ") + "\n" + 
							"degrees:   " + STATE.notes.map(note => (note.scaleDegree + CONSTANTS.copySpaces).slice(0, CONSTANTS.copySpaces.length)).join(" ") + "\n" + 
							"semitones: " + STATE.notes.map(note => (note.semitone    + CONSTANTS.copySpaces).slice(0, CONSTANTS.copySpaces.length)).join(" ")
					navigator.clipboard.writeText(text)

				// wait --> change back
					setTimeout(() => {
						ELEMENTS.controls.copy.removeAttribute("copied")
					}, CONSTANTS.copyTimeoutTime)
			} catch (error) {console.log(error)}
		}

	/* downloadMusicXML */
		ELEMENTS.controls.download.addEventListener(TRIGGERS.click, downloadMusicXML)
		function downloadMusicXML(event) {
			try {
				// no music
					if (!Object.keys(STATE.music.parts).length) {
						return
					}

				// convert
					const musicXML = MUSICXML_J.buildMusicXML(STATE.music)

				// date
					const now = new Date()
					const year = now.getFullYear()
					const month = now.getMonth() + 1
					const day = now.getDate()
					const datestring = year + "-" + ("0" + month).slice(-2) + "-" + ("0" + day).slice(-2)

				// download link
					const downloadLink = document.createElement("a")
						downloadLink.id = "download-link"
						downloadLink.setAttribute("href", "data:text/xml;charset=utf-8," + encodeURIComponent(musicXML))
						downloadLink.setAttribute("download", (STATE.music.title || "untitled") + "_" + datestring + ".musicxml")
					document.body.appendChild(downloadLink)

				// download
					downloadLink.addEventListener(TRIGGERS.click, function() {
						downloadLink.remove()
					})
					downloadLink.click()
			} catch (error) {console.log(error)}
		}

	/* toggleNote */
		function toggleNote(event) {
			try {
				// get toggle
					const toggle = event.target.closest(".toggle")
					const scaleDegree = Number(toggle.getAttribute("scale-degree"))
					const semitone = Number(toggle.getAttribute("semitone"))

				// update notes
					const existingIndex = STATE.notes.findIndex(note => note.scaleDegree == scaleDegree && note.semitone == semitone)
					if (existingIndex !== -1) {
						STATE.notes.splice(existingIndex, 1)
					}
					else {
						const equivalentIndex = STATE.notes.findIndex(note => note.semitone == semitone)
						if (equivalentIndex !== -1) {
							STATE.notes.splice(equivalentIndex, 1)
						}
						
						STATE.notes.push({
							scaleDegree: scaleDegree,
							semitone: semitone
						})
						STATE.notes = STATE.notes.sort((a, b) => a.semitone - b.semitone)
					}

				// scale menu
					STATE.scale = "Custom"
					ELEMENTS.controls.scale.value = STATE.scale
					
				// generate state
					generateState()
			} catch (error) {console.log(error)}
		}

/*** assetManager ***/
	/* retrieveAsset */
		window.ASSETS_J.retrieveAsset = function(name, type, data) {
			try {
				// json
					const json = JSON.parse(data)
					const instrument = AUDIO_J.buildInstrument(json)
					AUDIO_J.storeInstrument(instrument.parameters.name, instrument.parameters)

					const option = document.createElement("option")
						option.value = option.innerText = instrument.parameters.name
					ELEMENTS.controls.synth.querySelector("optgroup[label='custom']").appendChild(option)
					ELEMENTS.controls.synth.value = instrument.parameters.name
					setSynth()
			} catch (error) {console.log(error)}
		}

	/* storeAsset */
		window.ASSETS_J.storeAsset = async function(type) {
			try {
				// musicxml
					if (type == "musicxml") {
						return {
							name: `${STATE.music.title || "untitled"}_${new Date().getTime()}.musicxml`,
							type: "musicxml",
							data: MUSICXML_J.buildMusicXML(STATE.music)
						}
					}

				// txt
					if (type == "txt") {
						const text = STATE.tonic + " " + STATE.scale + "\n" + 
							"notes:     " + STATE.notes.map(note => (note.name        + CONSTANTS.copySpaces).slice(0, CONSTANTS.copySpaces.length)).join(" ") + "\n" + 
							"degrees:   " + STATE.notes.map(note => (note.scaleDegree + CONSTANTS.copySpaces).slice(0, CONSTANTS.copySpaces.length)).join(" ") + "\n" + 
							"semitones: " + STATE.notes.map(note => (note.semitone    + CONSTANTS.copySpaces).slice(0, CONSTANTS.copySpaces.length)).join(" ")
						return {
							name: `${STATE.music.title || "untitled"}_${new Date().getTime()}.txt`,
							type: "txt",
							data: text
						}
					}
			} catch (error) {console.log(error)}
		}

/*** music ***/
	/* generateState */
		function generateState() {
			try {
				// tonic & scale in url
					generateURL(STATE.tonic, STATE.scale)

				// get notes
					const scaleInfo = CONSTANTS.scales[STATE.scale] || {
						group: "Custom",
						mode: "major",
						scaleDegrees: STATE.notes.slice(0, -1).map(note => note.scaleDegree), // remove octave
						semitones: STATE.notes.slice(0, -1).map(note => note.semitone) // remove octave
					}

					STATE.notes = getNotesOfScale(STATE.tonic, scaleInfo)
					STATE.music = generateMusic(STATE.tonic, STATE.scale, STATE.notes, STATE.tempoMultiplier, STATE.synth)

				// regenerate display
					ELEMENTS.keyboard.keys = generateKeyboard(STATE.tonic)
					ELEMENTS.staff.lines = generateStaff(STATE.tonic)
					ELEMENTS.grid.notes = generateGrid(STATE.notes)
					ELEMENTS.controls.aka.innerHTML = generateAKA(STATE.scale, STATE.notes.map(note => note.semitone))

				// playing --> restart
					if (STATE.playing) {
						STATE.tick = 0
						STATE.measure = 1
						clearInterval(STATE.playbackLoop)
						STATE.playbackLoop = setInterval(updatePlayback, STATE.interval)
					}
			} catch (error) {console.log(error)}
		}

	/* getNotesOfScale */
		function getNotesOfScale(tonic, scaleInfo) {
			try {
				// semitone offset
					const semitoneOffset = CONSTANTS.enharmonicEquivalents.findIndex(equivalents => equivalents.includes(tonic))
					if (semitoneOffset == -1) {
						return []
					}

				// letters
					const letters = [...CONSTANTS.letters]
					while (letters[0] !== tonic[0]) {
						letters.unshift(letters.pop())
					}
					letters.push(letters[0]) // octave

				// notes
					const notes = []
					for (const i in scaleInfo.scaleDegrees) {
						const scaleDegree = scaleInfo.scaleDegrees[i]
						const semitone = scaleInfo.semitones[i]
						const midi = semitone + semitoneOffset
						const letter = letters[scaleDegree - CONSTANTS.scaleDegreeOffset]
						const noteName = CONSTANTS.enharmonicEquivalents[midi % AUDIO_J.constants.semitonesPerOctave].find(equivalent => equivalent[0] == letter) || "?"
						
						notes.push({
							scaleDegree: scaleDegree,
							semitone: semitone,
							midi: midi,
							name: noteName
						})
					}

				// octave
					const octave = {...notes[0]}
						octave.scaleDegree += CONSTANTS.letters.length
						octave.semitone += AUDIO_J.constants.semitonesPerOctave
						octave.midi += AUDIO_J.constants.semitonesPerOctave
					notes.push(octave)

				// return notes
					return notes
			} catch (error) {console.log(error)}
		}

	/* generateMusic */
		function generateMusic(tonic, scale, notes, tempoMultiplier, synth) {
			try {
				// music object
					const numberOfMeasures = 2 // up and then down
					const measureTicks = CONSTANTS.ticksPerBeat * notes.length // ticks

					const music = {
						title: tonic + " " + scale + " scale",
						composer: CONSTANTS.appName,
						tempoChanges: {
							"1": CONSTANTS.defaultTempo * tempoMultiplier,
						},
						measureTicks: buildMeasureTicks(numberOfMeasures, measureTicks),
						parts: {}
					}

				// active instrument
					music.parts[synth] = buildPart(synth, notes, scale)

				// return music
					return music
			} catch (error) {console.log(error)}
		}

	/* buildMeasureTicks */
		function buildMeasureTicks(measureCount, ticksPerMeasure) {
			try {
				// empty object
					const measureTicks = {}

				// loop through count
					for (let i = 1; i <= measureCount; i++) {
						measureTicks[String(i)] = ticksPerMeasure
					}

				// return
					return measureTicks
			} catch (error) {console.log(error)}
		}

	/* buildPart */
		function buildPart(synth, notes, scale) {
			try {
				// midi instrument
					const [midiProgram, instrument] = getInstrumentFromSynth(synth)

				// part object
					const part = {
						partId: "1",
						name: instrument,
						instrument: instrument,
						order: "1",
						midiChannel: "1",
						midiProgram: midiProgram,
						synth: synth,
						measures: {}
					}

				// measures
					const measureTicks = CONSTANTS.ticksPerBeat * notes.length

				// loop through notes up
					const ascendingMeasure = {
						notes: {},
						ticks: measureTicks,
						repeat: "forward",
						key: {
							tonic: notes[0].name,
							mode: CONSTANTS.scales[scale] ? CONSTANTS.scales[scale].mode : "major" // major or minor
						}
					}
					for (const n in notes) {
						const tick = n * CONSTANTS.ticksPerBeat
						const pitch = notes[n].midi + CONSTANTS.midiOffset
						ascendingMeasure.notes[String(tick)] = {
							[String(pitch)]: CONSTANTS.ticksPerBeat
						}
					}

				// loop through notes down
					const reversedNotes = [...notes].reverse()
					const descendingMeasure = {
						notes: {},
						ticks: measureTicks,
						repeat: "backward"
					}
					for (const n in reversedNotes) {
						const tick = n * CONSTANTS.ticksPerBeat
						const pitch = reversedNotes[n].midi + CONSTANTS.midiOffset
						descendingMeasure.notes[String(tick)] = {
							[String(pitch)]: CONSTANTS.ticksPerBeat
						}
					}

				// add measures
					part.measures["1"] = ascendingMeasure
					part.measures["2"] = descendingMeasure

				// return
					return part
			} catch (error) {console.log(error)}
		}

	/* getInstrumentFromSynth */
		function getInstrumentFromSynth(synthName) {
			try {
				// not in list (custom synths)
					if (!Object.keys(MUSICXML_J.constants.synthToMidi).includes(synthName)) {
						return [MUSICXML_J.constants.defaultMidiProgram, MUSICXML_J.constants.defaultInstrument]
					}

				// get program
					const midiProgram = MUSICXML_J.constants.synthToMidi[synthName]

				// get instrument
					const instrument = MUSICXML_J.constants.midiToInstrument[String(midiProgram)]

				// return
					return [midiProgram, instrument]
			} catch (error) {console.log(error)}
		}

/*** display ***/
	/* generateKeyboard */
		function generateKeyboard(tonic) {
			try {
				// clear existing keys
					ELEMENTS.keyboard.element.innerHTML = ""

				// semitone offset
					const semitoneOffset = CONSTANTS.enharmonicEquivalents.findIndex(equivalents => equivalents.includes(tonic))

				// scale keys
					const keys = []
					let semitone = semitoneOffset
					let midi = semitone + CONSTANTS.midiOffset
					let index = 0
					do {
						// get info
							const keyInfo = CONSTANTS.keyboard[semitone]

						// build element
							const keyElement = document.createElement("div")
								keyElement.className = "keyboard-key"
								keyElement.setAttribute("color", keyInfo.color)
								keyElement.setAttribute("shape", keyInfo.shape)
								keyElement.setAttribute("semitone", index)
								keyElement.setAttribute("midi", midi)
								keyElement.style.left = "calc(" + index + " * var(--semitone-width))"
								keyElement.title = keyInfo.name
								keyElement.addEventListener(TRIGGERS.mousedown, pressKey)
							ELEMENTS.keyboard.element.appendChild(keyElement)
							keys.push(keyElement)

						// next semitone
							semitone = (semitone + 1) % AUDIO_J.constants.semitonesPerOctave
							midi++
							index++
					} while (semitone !== semitoneOffset)

				// octave
					// get info
						const keyInfo = CONSTANTS.keyboard[semitone]

					// build element
						const keyElement = document.createElement("div")
							keyElement.className = "keyboard-key"
							keyElement.setAttribute("color", keyInfo.color)
							keyElement.setAttribute("shape", keyInfo.shape)
							keyElement.setAttribute("semitone", index)
							keyElement.setAttribute("midi", midi)
							keyElement.style.left = "calc(" + index + " * var(--semitone-width))"
							keyElement.title = keyInfo.name
							keyElement.addEventListener(TRIGGERS.mousedown, pressKey)
						ELEMENTS.keyboard.element.appendChild(keyElement)
						keys.push(keyElement)

				// return
					return keys
			} catch (error) {console.log(error)}
		}

	/* generateStaff */
		function generateStaff(tonic) {
			try {
				// clear existing lines
					ELEMENTS.staff.lineArea.innerHTML = ""

				// letters list
					const letters = [...CONSTANTS.letters]
					while (letters[0] !== tonic[0]) {
						letters.unshift(letters.pop())
					}

				// lines list
					const lines = []
					
				// starting line
					let isLine = ["D", "F", "A"].includes(letters[0]) || false

				// highest note
					// block
						const topBlock = document.createElement("div")
							topBlock.className = isLine ? "staff-line" : "staff-space"
							topBlock.setAttribute("scale-degree", letters.length + CONSTANTS.scaleDegreeOffset)
						ELEMENTS.staff.lineArea.appendChild(topBlock)
						lines.push(topBlock)

					// flip
						isLine = !isLine

				// loop through others
					for (let i = letters.length; i--; i) {
						// block
							const lineBlock = document.createElement("div")
								lineBlock.className = isLine ? "staff-line" : "staff-space"
								lineBlock.setAttribute("scale-degree", i + CONSTANTS.scaleDegreeOffset)
							ELEMENTS.staff.lineArea.appendChild(lineBlock)
							lines.push(lineBlock)

						// flip
							isLine = !isLine
					}

				// move clef
					ELEMENTS.staff.clef.setAttribute("tonic", letters[0])

				// return
					return lines
			} catch (error) {console.log(error)}
		}

	/* generateGrid */
		function generateGrid(notes) {
			try {
				// clear existing blocks
					ELEMENTS.grid.graph.innerHTML = ""

				// noteBlocks array
					const noteBlocks = []

				// loop through notes
					for (const n in notes) {
						const block = document.createElement("div")
							block.className = "note-block"
							block.innerText = notes[n].name
							block.setAttribute("semitone", notes[n].semitone)
							block.setAttribute("scale-degree", notes[n].scaleDegree)
							block.style.left = "calc(" + notes[n].semitone + " * var(--semitone-width))"
							block.style.bottom = "calc(" + (notes[n].scaleDegree - CONSTANTS.scaleDegreeOffset) + " * var(--scale-degree-height))"
						ELEMENTS.grid.graph.appendChild(block)
						noteBlocks.push(block)
					}

				// return
					return noteBlocks
			} catch (error) {console.log(error)}
		}

	/* generateAKA */
		function generateAKA(scale, semitones) {
			try {
				// find similar scales
					const semitoneString = semitones.slice(0, -1).join(",")
					const similarScales = Object.keys(CONSTANTS.scales).filter(otherScale => otherScale !== scale && CONSTANTS.scales[otherScale].semitones.join(",") == semitoneString) || []

				// none
					return similarScales.length ? ("AKA: " + similarScales.join(", ")) : ""
			} catch (error) {console.log(error)}
		}

	/* generateURL */
		function generateURL(tonic, scale) {
			try {
				// get text
					tonic = tonic.replace(/♯/g, "sharp").replace(/♭/g, "flat")
					scale = encodeURIComponent(scale.replace(/♯/g, "sharp").replace(/♭/g, "flat"))

				// build queryString
					const queryString = "?tonic=" + tonic +
										"&scale=" + scale

				// update URL
					const currentURL = new URL(window.location.href)
						currentURL.search = queryString
					window.history.replaceState({}, "", currentURL)	
			} catch (error) {console.log(error)}
		}

	/* displayActive */
		function displayActive() {
			try {
				// current beat
					const beat = Math.floor(STATE.tick / CONSTANTS.ticksPerBeat)
					const note = STATE.measure == 1 ? STATE.notes[beat] : STATE.notes[STATE.notes.length - 1 - beat]

				// attributes
					const scaleDegree = note.scaleDegree
					const semitone = note.semitone

				// line
					if (ELEMENTS.staff.activeLine && Number(ELEMENTS.staff.activeLine.getAttribute("scale-degree")) !== scaleDegree) {
						ELEMENTS.staff.activeLine.removeAttribute("active")
						ELEMENTS.staff.activeLine = null
					}
					if (!ELEMENTS.staff.activeLine) {
						ELEMENTS.staff.activeLine = document.querySelector( ".staff-line[scale-degree='" + scaleDegree + "']") ||
													document.querySelector(".staff-space[scale-degree='" + scaleDegree + "']")
						ELEMENTS.staff.activeLine.setAttribute("active", true)
					}

				// key
					if (ELEMENTS.keyboard.activeKey && Number(ELEMENTS.keyboard.activeKey.getAttribute("semitone")) !== semitone) {
						ELEMENTS.keyboard.activeKey.removeAttribute("active")
						ELEMENTS.keyboard.activeKey = null
					}
					if (!ELEMENTS.keyboard.activeKey) {
						ELEMENTS.keyboard.activeKey = document.querySelector(".keyboard-key[semitone='" + semitone + "']")
						ELEMENTS.keyboard.activeKey.setAttribute("active", true)
					}

				// note
					if (ELEMENTS.grid.activeNote && Number(ELEMENTS.grid.activeNote.getAttribute("semitone")) !== semitone) {
						ELEMENTS.grid.activeNote.removeAttribute("active")
						ELEMENTS.grid.activeNote = null
					}
					if (!ELEMENTS.grid.activeNote) {
						ELEMENTS.grid.activeNote = document.querySelector(".note-block[semitone='" + semitone + "']")
						ELEMENTS.grid.activeNote.setAttribute("active", true)
					}
			} catch (error) {console.log(error)}
		}

	/* clearActive */
		function clearActive() {
			try {
				// line
					if (ELEMENTS.staff.activeLine) {
						ELEMENTS.staff.activeLine.removeAttribute("active")
						ELEMENTS.staff.activeLine = null
					}

				// key
					if (ELEMENTS.keyboard.activeKey) {
						ELEMENTS.keyboard.activeKey.removeAttribute("active")
						ELEMENTS.keyboard.activeKey = null
					}

				// note
					if (ELEMENTS.grid.activeNote) {
						ELEMENTS.grid.activeNote.removeAttribute("active")
						ELEMENTS.grid.activeNote = null
					}
			} catch (error) {console.log(error)}
		}

/*** audio ***/
	/* updatePlayback */
		function updatePlayback() {
			try {
				// display
					displayActive()

				// all instruments
					if (AUDIO_J.audio) {
						for (let p in STATE.music.parts) {
							soundPart(p, STATE.music.parts[p].measures)
						}
					}

				// next tick
					STATE.tick += 1

				// next measure
					const previousMeasure = STATE.measure
					if (STATE.tick >= STATE.music.measureTicks[STATE.measure]) {
						STATE.measure += 1
						STATE.tick = 0
					}

				// loop
					if (STATE.measure > Object.keys(STATE.music.measureTicks).length) {
						STATE.measure = 1
					}
			} catch (error) {console.log(error)}
		}

	/* soundPart */
		function soundPart(partId, measures) {
			try {
				// get measure
					if (!measures[STATE.measure]) {
						return
					}

				// get ensemble instrument
					const instrument = AUDIO_J.instruments[partId]
					if (!instrument) {
						return
					}

				// get notes
					if (!measures[STATE.measure].notes) {
						return
					}
					const notes = measures[STATE.measure].notes[STATE.tick] || null
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

	/* pressKey */
		function pressKey(event) {
			try {
				// target
					const keyElement = event.target.closest(".keyboard-key")
					const midi = Number(keyElement.getAttribute("midi"))

				// state
					STATE.pressedKeys[midi] = true

				// display
					keyElement.setAttribute("pressed", true)

				// audio
					if (AUDIO_J.audio) {
						const instrument = AUDIO_J.instruments[AUDIO_J.activeInstrumentId]
						if (instrument) {
							const frequency = AUDIO_J.getNote(midi)[0]
							instrument.press(frequency)
						}
					}
			} catch (error) {console.log(error)}
		}

	/* liftKeys */
		window.addEventListener(TRIGGERS.mouseup, liftKeys)
		function liftKeys(event) {
			try {
				// loop through
					for (const midi in STATE.pressedKeys) {
						// state
							delete STATE.pressedKeys[midi]

						// display
							const keyElement = ELEMENTS.keyboard.element.querySelector("[midi='" + midi + "']")
							if (keyElement) {
								keyElement.removeAttribute("pressed")
							}

						// audio
							if (AUDIO_J.audio) {
								const instrument = AUDIO_J.instruments[AUDIO_J.activeInstrumentId]
								if (instrument) {
									const frequency = AUDIO_J.getNote(midi)[0]
									instrument.lift(frequency)
								}
							}
					}
			} catch (error) {console.log(error)}
		}
