/*** globals ***/
	/* audio */
		if (!AUDIO_J) {
			AUDIO_J = window.AUDIO_J
		}

	/* triggers */
		const TRIGGERS = {
			click: "click",
			input: "input",
			keypress: "keypress"
		}

	/* elements */
		const ELEMENTS = {
			body: document.body,
			viewer: {
				outer: document.querySelector("#viewer-outer"),
				element: document.querySelector("#viewer")
			},
			controls: {
				element: document.querySelector("#controls"),
				chords: {
					element: document.querySelector("#controls-chords"),
					volume: document.querySelector("#controls-chords-volume"),
					play: document.querySelector("#controls-chords-play"),
					pause: document.querySelector("#controls-chords-pause"),
					restart: document.querySelector("#controls-chords-restart"),
					current: document.querySelector("#controls-chords-current"),
					count: document.querySelector("#controls-chords-count"),
					timeSignature: document.querySelector("#controls-chords-timesignature"),
					tempo: document.querySelector("#controls-chords-tempo"),
					tonic: document.querySelector("#controls-chords-tonic"),
					mode: document.querySelector("#controls-chords-mode"),
					type: document.querySelector("#controls-chords-type"),
					randomize: document.querySelector("#controls-chords-randomize"),
					copy: document.querySelector("#controls-chords-copy"),
					download: document.querySelector("#controls-chords-download")
				},
				layers: {
					element: document.querySelector("#controls-layers"),
					list: document.querySelector("#controls-layers-list"),
					add: document.querySelector("#controls-layers-add"),
				}
			}
		}

	/* constants */
		const CONSTANTS = {
			title: "random jam",
			composer: "jamRandomizer",
			attempts: 5,
			minute: 1000 * 60, // ms
			viewerTransitionTime: 100, // ms
			copyTimeoutTime: 2000, // ms
			copySpaces: 4, // characters
			ticksPerBeat: MUSICXML_J.constants.beatToTick.quarter, // ticks
			measureOffset: 1, // measures
			defaultMasterVolume: 0.5, // ratio
			defaultSynthVolume: 0.5, // ratio
			defaultMeasures: 4, // measures
			defaultTimeSignature: "4/4", // beats/divisions
			defaultTempo: 120, // bpm
			defaultTonic: "C", // notes
			defaultMode: "mixed", // modes
			defaultType: "triads", // triads vs. 7ths
			defaultLayerCount: 3, // layers
			minMeasures: 2, // measures
			maxMeasures: 16, // measures
			maxTempo: 250, // bpm
			minimumMidiChannel: 1, // channels
			maximumMidiChannel: 16, // channels
			timeSignatures: {
				"1/4":  {beats: 1, ticksPerSubdivision: 24 / 2},
				"2/4":  {beats: 2, ticksPerSubdivision: 24 / 2},
				"3/4":  {beats: 3, ticksPerSubdivision: 24 / 2},
				"4/4":  {beats: 4, ticksPerSubdivision: 24 / 2},
				"5/4":  {beats: 5, ticksPerSubdivision: 24 / 2},
				"6/4":  {beats: 6, ticksPerSubdivision: 24 / 2},
				"7/4":  {beats: 7, ticksPerSubdivision: 24 / 2},
				"8/4":  {beats: 8, ticksPerSubdivision: 24 / 2},
				"3/8":  {beats: 1, ticksPerSubdivision: 24 / 3},
				"6/8":  {beats: 2, ticksPerSubdivision: 24 / 3},
				"9/8":  {beats: 3, ticksPerSubdivision: 24 / 3},
				"12/8": {beats: 4, ticksPerSubdivision: 24 / 3},
				"15/8": {beats: 5, ticksPerSubdivision: 24 / 3}
			},
			numerals: ["", "i", "ii", "iii", "iv", "v", "vi", "vii"], // numerals
			tonics: ["i", "i7", "I", "I7", "IM7", "♭VI", "♭VI7", "♭VIM7", "vi", "vi7"], // numerals
			deceptiveCadences: {
				"major": {"from": ["V","V7","VM7","V+6","V7+6"], "to": ["vi", "vi7"]},
				"minor": {"from": ["v","v7","V","V7","VM7","V+6","V7+6"], "to": ["♭VI", "♭VI7", "♭VIM7"]}
			},
			modes: ["major", "minor", "mixed", "more", "most"], // modes
			types: ["triads", "sevenths"], // types
			letters: ["A", "B", "C", "D", "E", "F", "G"], // notes
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
			chordAbbreviations: {
				"diminished": "dim", // 0-3-6
				"minor": "min", // 0-3-7
				"major": "maj", // 0-4-7
				"augmented": "aug", // 0-4-8
				"diminished-seventh": "dim7", // 0-3-6-9
				"halfdiminished-seventh": "½dim7", // 0-3-6-10
				"minor-seventh": "min7", // 0-3-7-10
				"minor-major-seventh": "minmaj7", // 0-3-7-11
				"seventh": "7", // 0-4-7-10
				"major-seventh": "maj7", // 0-4-7-11
				"augmented-seventh": "aug7" // 0-4-8-11
			},
			chords: {
				"i": {
					mode: "minor",
					function: "tonic",
					quality: "minor",
					scaleDegrees: [1, 3, 5],
					semitones: [0, 3, 7],
					next: ["i", "♭II (N)", "ii°", "♭III", "iv", "IV", "♯iv°", "♯iv6", "♯IV (Tt)", "v", "V", "V+6", "♭VI", "♭VII"]
				},
				"i7": {
					mode: "minor",
					function: "tonic",
					quality: "minor-seventh",
					scaleDegrees: [1, 3, 5, 7],
					semitones: [0, 3, 7, 10],
					seventh: "i"
				},
				"I": {
					mode: "major",
					function: "tonic",
					quality: "major",
					scaleDegrees: [1, 3, 5],
					semitones: [0, 4, 7],
					next: ["I", "♭II (N)", "ii", "II (V/V)", "♭III", "iii", "III (V/vi)", "iv", "IV", "♯iv°", "♯iv6", "♯IV (Tt)", "V", "♭VI", "vi", "VI (V/ii)", "♭VII", "vii°", "VII (V/iii)"]
				},
				"I7": {
					mode: "major",
					function: "tonic",
					quality: "seventh",
					scaleDegrees: [1, 3, 5, 7],
					semitones: [0, 4, 7, 10],
					seventh: "I"
				},
				"IM7": {
					mode: "major",
					function: "tonic",
					quality: "major-seventh",
					scaleDegrees: [1, 3, 5, 7],
					semitones: [0, 4, 7, 11],
					seventh: "I"
				},
				"♭II (N)": {
					mode: "more",
					function: "neapolitan",
					quality: "major",
					scaleDegrees: [2, 4, 6],
					semitones: [1, 5, 8],
					next: ["i", "I", "♭II (N)", "♯IV (Tt)", "V", "vii°"]
				},
				"♭II7 (N7)": {
					mode: "more",
					function: "neapolitan",
					quality: "major-seventh",
					scaleDegrees: [2, 4, 6, 1],
					semitones: [1, 5, 8, 0],
					seventh: "♭II"
				},
				"ii°": {
					mode: "minor",
					function: "supertonic",
					quality: "diminished",
					scaleDegrees: [2, 4, 6],
					semitones: [2, 5, 8],
					next: ["i", "I", "ii°", "iv", "v", "V", "V+6", "♭VII", "VII (V/iii)"]
				},
				"iiø7": {
					mode: "minor",
					function: "supertonic",
					quality: "halfdiminished-seventh",
					scaleDegrees: [2, 4, 6, 1],
					semitones: [2, 5, 8, 0],
					seventh: "ii°"
				},
				"ii": {
					mode: "major",
					function: "supertonic",
					quality: "minor",
					scaleDegrees: [2, 4, 6],
					semitones: [2, 5, 9],
					next: ["♭II (N)", "ii°", "ii", "II (V/V)", "IV", "♯iv6", "V", "vii°"]
				},
				"ii7": {
					mode: "major",
					function: "supertonic",
					quality: "minor-seventh",
					scaleDegrees: [2, 4, 6, 1],
					semitones: [2, 5, 9, 0],
					seventh: "ii"
				},
				"II (V/V)": {
					mode: "more",
					function: "secondary-dominant",
					quality: "major",
					scaleDegrees: [2, 4, 6],
					semitones: [2, 6, 9],
					next: ["I", "II (V/V)", "♯iv°", "♯IV (Tt)", "V", "vii°", "VII (V/iii)"],
				},
				"II7 (V7/V)": {
					mode: "more",
					function: "secondary-dominant",
					quality: "seventh",
					scaleDegrees: [2, 4, 6, 1],
					semitones: [2, 6, 9, 0],
					seventh: "II (V/V)"
				},
				"♭III": {
					mode: "minor",
					function: "mediant",
					quality: "major",
					scaleDegrees: [3, 5, 7],
					semitones: [3, 7, 10],
					next: ["i", "I", "♭III", "iv", "IV", "v", "V+6", "♭VI"]
				},
				"♭III7": {
					mode: "minor",
					function: "mediant",
					quality: "seventh",
					scaleDegrees: [3, 5, 7, 2],
					semitones: [3, 7, 10, 1],
					seventh: "♭III"
				},
				"♭IIIM7": {
					mode: "minor",
					function: "mediant",
					quality: "major-seventh",
					scaleDegrees: [3, 5, 7, 2],
					semitones: [3, 7, 10, 2],
					seventh: "♭III"
				},
				"iii": {
					mode: "major",
					function: "mediant",
					quality: "minor",
					scaleDegrees: [3, 5, 7],
					semitones: [4, 7, 11],
					next: ["I", "iii", "III (V/vi)", "IV", "vi", "VI (V/ii)"]
				},
				"iii7": {
					mode: "major",
					function: "mediant",
					quality: "minor-seventh",
					scaleDegrees: [3, 5, 7, 2],
					semitones: [4, 7, 11, 2],
					seventh: "iii"
				},
				"III (V/vi)": {
					mode: "more",
					function: "secondary-dominant",
					quality: "major",
					scaleDegrees: [3, 5, 7],
					semitones: [4, 8, 11],
					next: ["III (V/vi)", "IV", "vi", "VI (V/ii)"],
				},
				"III7 (V7/vi)": {
					mode: "more",
					function: "secondary-dominant",
					quality: "seventh",
					scaleDegrees: [3, 5, 7, 2],
					semitones: [4, 8, 11, 2],
					seventh: "III (V/vi)"
				},
				"iv": {
					mode: "minor",
					function: "subdominant",
					quality: "minor",
					scaleDegrees: [4, 6, 1],
					semitones: [5, 8, 0],
					next: ["i", "I", "♭II (N)", "ii°", "II (V/V)", "iv", "♯iv°", "♯iv6", "v", "V", "V+6", "♭VII", "vii°"]
				},
				"ivø7": {
					mode: "minor",
					function: "subdominant",
					quality: "halfdiminished-seventh",
					scaleDegrees: [4, 6, 1, 3],
					semitones: [5, 8, 11, 3],
					seventh: "iv"
				},
				"iv7": {
					mode: "minor",
					function: "subdominant",
					quality: "minor-seventh",
					scaleDegrees: [4, 6, 1, 3],
					semitones: [5, 8, 0, 3],
					seventh: "iv"
				},
				"IV": {
					mode: "major",
					function: "subdominant",
					quality: "major",
					scaleDegrees: [4, 6, 1],
					semitones: [5, 9, 0],
					next: ["i", "I", "♭II (N)", "ii°", "ii", "II (V/V)", "iv", "IV", "♯iv°", "♯iv6", "♯IV (Tt)", "V", "♭VII", "vii°"]
				},
				"IV7": {
					mode: "major",
					function: "subdominant",
					quality: "seventh",
					scaleDegrees: [4, 6, 1, 3],
					semitones: [5, 9, 0, 3],
					seventh: "IV"
				},
				"IVM7": {
					mode: "major",
					function: "subdominant",
					quality: "major-seventh",
					scaleDegrees: [4, 6, 1, 3],
					semitones: [5, 9, 0, 4],
					seventh: "IV"
				},
				"♯iv°": {
					mode: "more",
					function: "common-tone",
					quality: "diminished",
					scaleDegrees: [4, 6, 1],
					semitones: [6, 9, 0],
					next: ["i", "I", "iii", "III (V/vi)", "♯iv°", "♯iv6", "♯IV (Tt)", "V", "V+6", "vii°", "VII (V/iii)"]
				},
				"♯iv°7": {
					mode: "more",
					function: "common-tone",
					quality: "diminished-seventh",
					scaleDegrees: [4, 6, 1, 3],
					semitones: [6, 9, 0, 3],
					seventh: "♯iv°"
				},
				"♯ivø7": {
					mode: "more",
					function: "common-tone",
					quality: "halfdiminished-seventh",
					scaleDegrees: [4, 6, 1, 3],
					semitones: [6, 9, 0, 4],
					seventh: "♯iv°"
				},
				"♯iv6": {
					mode: "more",
					function: "augmented-6th",
					quality: "diminished",
					scaleDegrees: [4, 6, 1],
					semitones: [6, 8, 0],
					next: ["i", "I", "♯iv6", "V", "vii°", "VII (V/iii)"],
				},
				"♯iv6 (Fr)": {
					mode: "more",
					function: "augmented-6th",
					quality: "diminished",
					scaleDegrees: [4, 6, 1, 2],
					semitones: [6, 8, 0, 2],
					seventh: "♯iv6"
				},
				"♯iv6 (Ger)": {
					mode: "more",
					function: "augmented-6th",
					quality: "diminished",
					scaleDegrees: [4, 6, 1, 3],
					semitones: [6, 8, 0, 3],
					seventh: "♯iv6"
				},
				"♯IV (Tt)": {
					mode: "more",
					function: "tritone",
					quality: "major",
					scaleDegrees: [4, 6, 1],
					semitones: [6, 10, 1],
					next: ["i", "I", "♭II (N)", "III (V/vi)", "♯iv°", "♯iv6", "♯IV (Tt)", "V", "V+6", "♭VI", "vi", "vii°", "VII (V/iii)"]
				},
				"♯IV7 (Tt7)": {
					mode: "more",
					function: "tritone",
					quality: "seventh",
					scaleDegrees: [4, 6, 1, 3],
					semitones: [6, 10, 1, 4],
					seventh: "♯IV (Tt)"
				},
				"v": {
					mode: "minor",
					function: "dominant",
					quality: "minor",
					scaleDegrees: [5, 7, 2],
					semitones: [7, 10, 2],
					next: ["i", "I", "♭II (N)", "v", "V", "V+6", "♭VI", "vii°"]
				},
				"v7": {
					mode: "minor",
					function: "dominant",
					quality: "minor-seventh",
					scaleDegrees: [5, 7, 2, 4],
					semitones: [7, 10, 2, 5],
					seventh: "v"
				},
				"V": {
					mode: null, // agnostic
					function: "dominant",
					quality: "major",
					scaleDegrees: [5, 7, 2],
					semitones: [7, 11, 2],
					next: ["i", "I", "♭II (N)", "IV", "♯iv6", "V", "♭VI", "vi", "VI (V/ii)", "vii°"]
				},
				"V7": {
					mode: null, // agnostic
					function: "dominant",
					quality: "seventh",
					scaleDegrees: [5, 7, 2, 4],
					semitones: [7, 11, 2, 5],
					seventh: "V"
				},
				"VM7": {
					mode: null, // agnostic
					function: "dominant",
					quality: "major-seventh",
					scaleDegrees: [5, 7, 2, 4],
					semitones: [7, 11, 2, 6],
					seventh: "V"
				},
				"V+6": {
					mode: "more",
					function: "dominant",
					quality: "major",
					scaleDegrees: [5, 7, 3],
					semitones: [7, 11, 3],
					next: ["i", "ii°", "V", "V+6", "vii°"]
				},
				"V7+6": {
					mode: "more",
					function: "dominant",
					quality: "seventh",
					scaleDegrees: [5, 7, 3, 4],
					semitones: [7, 11, 3, 5],
					seventh: "V+6"
				},
				"♭VI": {
					mode: "minor",
					function: "submediant",
					quality: "major",
					scaleDegrees: [6, 1, 3],
					semitones: [8, 0, 3],
					next: ["♭II (N)", "ii°", "iv", "IV", "♯iv°", "♯iv6", "♭VI", "♭VII"]
				},
				"♭VI7": {
					mode: "minor",
					function: "submediant",
					quality: "seventh",
					scaleDegrees: [6, 1, 3, 5],
					semitones: [8, 0, 3, 6],
					seventh: "♭VI"
				},
				"♭VIM7": {
					mode: "minor",
					function: "submediant",
					quality: "major-seventh",
					scaleDegrees: [6, 1, 3, 5],
					semitones: [8, 0, 3, 7],
					seventh: "♭VI"
				},
				"vi": {
					mode: "major",
					function: "submediant",
					quality: "minor",
					scaleDegrees: [6, 1, 3],
					semitones: [9, 0, 4],
					next: ["ii°", "ii", "II (V/V)", "IV", "♯iv°", "vi", "VI (V/ii)", "vii°"]
				},
				"vi7": {
					mode: "major",
					function: "submediant",
					quality: "minor-seventh",
					scaleDegrees: [6, 1, 3, 5],
					semitones: [9, 0, 4, 7],
					seventh: "vi"
				},
				"VI (V/ii)": {
					mode: "more",
					function: "secondary-dominant",
					quality: "major",
					scaleDegrees: [6, 1, 3],
					semitones: [9, 1, 4],
					next: ["ii°", "ii", "II (V/V)", "iv", "IV", "♯iv°", "VI (V/ii)"],
				},
				"VI7 (V7/ii)": {
					mode: "more",
					function: "secondary-dominant",
					quality: "seventh",
					scaleDegrees: [6, 1, 3, 5],
					semitones: [9, 1, 4, 7],
					seventh: "VI (V/ii)"
				},
				"♭VII": {
					mode: "minor",
					function: "subtonic",
					quality: "major",
					scaleDegrees: [7, 2, 4],
					semitones: [10, 2, 5],
					next: ["i", "I", "♭III", "♯iv°", "♯iv6", "♯IV (Tt)", "v", "V", "V+6", "♭VII", "VII (V/iii)"]
				},
				"♭VII7": {
					mode: "minor",
					function: "subtonic",
					quality: "seventh",
					scaleDegrees: [7, 2, 4, 6],
					semitones: [10, 2, 5, 8],
					seventh: "♭VII"
				},
				"♭VIIM7": {
					mode: "minor",
					function: "subtonic",
					quality: "major-seventh",
					scaleDegrees: [7, 2, 4, 6],
					semitones: [10, 2, 5, 9],
					seventh: "♭VII"
				},
				"vii°": {
					mode: "major",
					function: "subtonic",
					quality: "diminished",
					scaleDegrees: [7, 2, 4],
					semitones: [11, 2, 5],
					next: ["i", "I", "♭II (N)", "iii", "♯iv6", "V", "vii°"]
				},
				"vii°7": {
					mode: "major",
					function: "subtonic",
					quality: "diminished-seventh",
					scaleDegrees: [7, 2, 4, 6],
					semitones: [11, 2, 5, 8],
					seventh: "vii°"
				},
				"viiø7": {
					mode: "major",
					function: "subtonic",
					quality: "halfdiminished-seventh",
					scaleDegrees: [7, 2, 4, 6],
					semitones: [11, 2, 5, 9],
					seventh: "vii°"
				},
				"VII (V/iii)": {
					mode: "more",
					function: "secondary-dominant",
					quality: "major",
					scaleDegrees: [7, 2, 4],
					semitones: [11, 3, 6],
					next: ["iii", "III (V/vi)", "vii°", "VII (V/iii)"],
				},
				"VII7 (V7/iii)": {
					mode: "more",
					function: "secondary-dominant",
					quality: "seventh",
					scaleDegrees: [7, 2, 4, 6],
					semitones: [11, 3, 6, 9],
					seventh: "VII (V/iii)"
				}
			},
			patterns: {
				"high 8ths": {
					defaultSynth: "meltmallet",
					group: "high",
					offset: 6 * AUDIO_J.constants.semitonesPerOctave // semitones
				},
				"waves": {
					defaultSynth: "honeyharp",
					group: "high",
					stack: true,
					offset: 5 * AUDIO_J.constants.semitonesPerOctave // semitones
				},
				"left-right": {
					defaultSynth: "nimbusnotes",
					group: "high",
					offset: 4 * AUDIO_J.constants.semitonesPerOctave // semitones
				},
				"block chords": {
					defaultSynth: "nonsemble",
					group: "mid",
					offset: 4 * AUDIO_J.constants.semitonesPerOctave // semitones
				},
				"arpeggio fall": {
					defaultSynth: "keystone",
					group: "mid",
					stack: true,
					offset: 4 * AUDIO_J.constants.semitonesPerOctave // semitones
				},
				"arpeggio rise": {
					defaultSynth: "clarinaut",
					group: "mid",
					stack: true,
					offset: 4 * AUDIO_J.constants.semitonesPerOctave // semitones
				},
				"root-fifth": {
					defaultSynth: "reedles",
					group: "mid",
					stack: true,
					offset: 4 * AUDIO_J.constants.semitonesPerOctave // semitones	
				},
				"octave bounce": {
					defaultSynth: "argit",
					group: "mid",
					offset: 3 * AUDIO_J.constants.semitonesPerOctave // semitones
				},
				"walking bass": {
					defaultSynth: "qube",
					group: "low",
					offset: 3 * AUDIO_J.constants.semitonesPerOctave // semitones
				},
				"pulse root": {
					defaultSynth: "bariphone",
					group: "low",
					offset: 3 * AUDIO_J.constants.semitonesPerOctave // semitones
				},
				"downbeat root": {
					defaultSynth: "lowdium",
					group: "low",
					offset: 3 * AUDIO_J.constants.semitonesPerOctave // semitones
				},
				"pedal tone": {
					defaultSynth: "rechoirment",
					group: "low",
					offset: 3 * AUDIO_J.constants.semitonesPerOctave, // semitones
				}
			},
			svg: {
				left: `<svg viewBox="0 0 100 100"><path d="M 80 45 C 80 38 80 31 80 25 C 80 22 82 20 85 20 C 88 20 90 22 90 25 C 90 40 90 60 90 75 C 90 78 88 80 85 80 C 82 80 80 78 80 75 C 80 69 80 62 80 55 C 65 55 39 55 27 55 C 30 58 32 60 34 62 C 36 64 36 67 34 69 C 32 71 29 71 27 69 C 23 65 18 60 13 55 C 11 53 10 52 10 50 C 10 48 11 47 13 45 C 18 40 23 35 27 31 C 29 29 32 29 34 31 C 36 33 36 36 34 38 C 32 40 30 42 27 45 C 39 45 65 45 80 45 Z"></path></svg>`,
				right: `<svg viewBox="0 0 100 100"><path d="M 20 55 C 20 62 20 69 20 75 C 20 78 18 80 15 80 C 12 80 10 78 10 75 C 10 60 10 40 10 25 C 10 22 12 20 15 20 C 18 20 20 22 20 25 C 20 31 20 38 20 45 C 35 45 61 45 73 45 C 70 42 68 40 66 38 C 64 36 64 33 66 31 C 68 29 71 29 73 31 C 77 35 82 40 87 45 C 89 47 90 48 90 50 C 90 52 89 53 87 55 C 82 60 77 65 73 69 C 71 71 68 71 66 69 C 64 67 64 64 66 62 C 68 60 70 58 73 55 C 61 55 35 55 20 55 Z"></path></svg>`,
				rotate: `<svg viewBox="0 0 100 100"><path d="M 75 45 C 78 45 80 47 80 50 C 80 67 67 80 50 80 C 33 80 20 67 20 50 C 20 36 29 23 47 20 C 46 19 46 19 46 19 C 44 17 44 14 46 12 C 48 10 51 10 53 12 C 55 14 58 17 60 19 C 62 21 64 23 64 25 C 64 27 62 29 60 31 C 58 33 55 36 53 38 C 51 40 48 40 46 38 C 44 36 44 33 47 30 C 36 33 30 41 30 50 C 30 61 39 70 50 70 C 61 70 70 61 70 50 C 70 47 72 45 75 45 Z"></path></svg>`,
				pin: `<svg viewBox="0 0 100 100"><path d="M 49 61 C 49 60 49 60 48 60 C 45 60 40 60 37 60 C 33 60 33 60 35 57 C 37 54 37 54 39 51 C 41 48 43 45 43 40 C 43 35 41 32 39 29 C 37 26 37 26 35 23 C 33 20 33 20 37 20 C 45 20 55 20 63 20 C 67 20 67 20 65 23 C 63 26 63 26 61 29 C 59 32 57 35 57 40 C 57 45 59 48 61 51 C 63 54 63 54 65 57 C 67 60 67 60 63 60 C 60 60 55 60 52 60 C 51 60 51 60 51 61 C 51 66 51 72 51 78 C 51 81 51 84 50 85 C 49 84 49 81 49 78 C 49 72 49 66 49 61 Z"></path></svg>`,
				volume: `<svg viewBox="20 20 60 60"><path d="M 57 34 C 63 34 71 40 71 50 C 71 60 63 66 57 66 C 54 66 54 62 57 62 C 61 62 67 58 67 50 C 67 42 61 38 57 38 C 54 38 54 34 57 34 Z M 56 40 C 60 40 65 44 65 50 C 65 56 60 60 56 60 C 54 60 54 57 56 57 C 59 57 62 54 62 50 C 62 46 59 43 56 43 C 54 43 54 40 56 40 Z M 55 45 C 58 45 60 47 60 50 C 60 53 58 55 55 55 C 54 55 54 53 55 53 C 56 53 58 52 58 50 C 58 48 56 47 55 47 C 54 47 54 45 55 45 Z M 35 59 C 25 57 25 60 25 50 C 25 40 25 43 35 41 C 45 39 45 34 48 34 C 49 34 50 35 50 36 C 50 40 50 60 50 64 C 50 65 49 66 48 66 C 45 66 45 61 35 59 Z"></path></svg>`,
				x: `<svg viewBox="10 10 80 80"><path d="M 50 43 C 55 38 60 33 64 29 C 66 27 69 27 71 29 C 73 31 73 34 71 36 C 67 40 62 45 57 50 C 62 55 67 60 71 64 C 73 66 73 69 71 71 C 69 73 66 73 64 71 C 60 67 55 62 50 57 C 45 62 40 67 36 71 C 34 73 31 73 29 71 C 27 69 27 66 29 64 C 33 60 38 55 43 50 C 38 45 33 40 29 36 C 27 34 27 31 29 29 C 31 27 34 27 36 29 C 40 33 45 38 50 43 Z"></path></svg>`
			}
		}

	/* state */
		const STATE = {
			playback: {
				playing: false,
				volume: CONSTANTS.defaultMasterVolume, // ratio
				tempo: CONSTANTS.defaultTempo, // bpm
				measure: 0, // measures
				tick: 0, // beats
				interval: Math.round(CONSTANTS.minute / CONSTANTS.ticksPerBeat / CONSTANTS.defaultTempo), // ms
				currentChordElement: null,
				loop: null
			},
			progression: {
				timeSignature: CONSTANTS.defaultTimeSignature, // beats/divisions
				beatsPerMeasure: CONSTANTS.timeSignatures[CONSTANTS.defaultTimeSignature].beats, // beats
				ticksPerSubdivision: CONSTANTS.timeSignatures[CONSTANTS.defaultTimeSignature].ticksPerSubdivision, // ticks
				ticksPerMeasure: CONSTANTS.ticksPerBeat * CONSTANTS.timeSignatures[CONSTANTS.defaultTimeSignature].beats, // ticks
				measureCount: CONSTANTS.defaultMeasures, // measures
				tonic: CONSTANTS.defaultTonic,
				semitoneOffset: CONSTANTS.enharmonicEquivalents.findIndex(equivalents => equivalents.includes(CONSTANTS.defaultTonic)), // semitones
				mode: CONSTANTS.defaultMode,
				type: CONSTANTS.defaultType,
				numerals: [],
				chords: []
			},
			layers: {},
			music: {
				title: CONSTANTS.title,
				composer: CONSTANTS.composer,
				tempoChanges: {
					"1": CONSTANTS.defaultTempo,
				},
				measureTicks: buildMeasureTicks(CONSTANTS.defaultMeasures, CONSTANTS.ticksPerBeat * CONSTANTS.timeSignatures[CONSTANTS.defaultTimeSignature].beats),
				parts: {}
			}
		}

/*** interaction ***/
	/** start up **/
		/* initializeApp */
			initializeApp()
			function initializeApp() {
				try {
					// queryparameters
						const queryParameters = getQueryParameters()

					// tempo
						if (queryParameters.tempo) {
							STATE.playback.tempo = Math.max(1, Math.min(CONSTANTS.maxTempo, queryParameters.tempo)) || CONSTANTS.defaultTempo
							ELEMENTS.controls.chords.tempo.value = STATE.playback.tempo

							STATE.playback.interval = Math.round(CONSTANTS.minute / CONSTANTS.ticksPerBeat / STATE.playback.tempo)
							STATE.music.tempoChanges["1"] = STATE.playback.tempo
						}

					// timeSignature
						if (queryParameters.timeSignature && Object.keys(CONSTANTS.timeSignatures).includes(queryParameters.timeSignature)) {
							STATE.progression.timeSignature = queryParameters.timeSignature
							ELEMENTS.controls.chords.timeSignature.value = STATE.progression.timeSignature

							STATE.progression.beatsPerMeasure = CONSTANTS.timeSignatures[STATE.progression.timeSignature].beats
							STATE.progression.ticksPerSubdivision = CONSTANTS.timeSignatures[STATE.progression.timeSignature].ticksPerSubdivision
							STATE.progression.ticksPerMeasure = CONSTANTS.ticksPerBeat * STATE.progression.beatsPerMeasure
						}

					// tonic
						if (queryParameters.tonic && CONSTANTS.allowedKeys.includes(queryParameters.tonic)) {
							STATE.progression.tonic = queryParameters.tonic
							ELEMENTS.controls.chords.tonic.value = STATE.progression.tonic

							STATE.progression.semitoneOffset = CONSTANTS.enharmonicEquivalents.findIndex(equivalents => equivalents.includes(STATE.progression.tonic))
						}

					// chord progression
						if (queryParameters.numerals) {
							for (const n in queryParameters.numerals) {
								if (!Object.keys(CONSTANTS.chords).includes(queryParameters.numerals[n])) {
									queryParameters.numerals[n] = "?"
								}
							}

							STATE.progression.measureCount = queryParameters.numerals.length
							ELEMENTS.controls.chords.count.value = STATE.progression.measureCount
							ELEMENTS.controls.chords.current.max = STATE.progression.measureCount

							STATE.progression.numerals = queryParameters.numerals
							STATE.progression.chords = getChordsFromNumerals(STATE.progression.numerals, STATE.progression.tonic)
							displayChords(STATE.progression.chords)
						}
						else {
							randomizeChords()
						}

					// layers
						if (queryParameters.layers) {
							if (queryParameters.layers !== "none") {
								for (const l in queryParameters.layers) {
									addLayer(null, queryParameters.layers[l])
								}
							}
						}
						else {
							for (let i = 0; i < CONSTANTS.defaultLayerCount; i++) {
								addLayer()	
							}
						}
				} catch (error) {console.log(error)}
			}

		/* getQueryParameters */
			function getQueryParameters() {
				try {
					// querystring
						const queryString = (window.location.search || "").slice(1)
						if (!queryString) {
							return {}
						}

					// parameters
						const queryPairs = queryString.split("&") || []
						const queryParameters = {}
						for (const i in queryPairs) {
							const pair = queryPairs[i].split("=")
							queryParameters[pair[0]] = pair[1] || null
						}

					// adjust
						if (queryParameters.numerals) {
							queryParameters.numerals = queryParameters.numerals
								.replace(/sharp/g, "♯").replace(/flat/g, "♭")
								.replace(/%C2%B0/g, "°").replace(/%C3%B8/g, "ø").replace(/%20/g, "+").replace(/_/g, " ")
								.split("-")
						}
						if (queryParameters.timeSignature) {
							queryParameters.timeSignature = queryParameters.timeSignature.replace("-", "/")
						}
						if (queryParameters.tempo) {
							queryParameters.tempo = Number(queryParameters.tempo)
						}
						if (queryParameters.tonic) {
							queryParameters.tonic = queryParameters.tonic.replace(/sharp/g, "♯").replace(/flat/g, "♭")
						}
						if (queryParameters.layers) {
							if (queryParameters.layers !== "none") {
								const allSynths = AUDIO_J.getInstruments({include: ["simple", "default", "custom"], grouping: "flat"})
								const allPatterns = Object.keys(CONSTANTS.patterns)

								queryParameters.layers = queryParameters.layers.replace(/_/g, " ").split(",").map(layerString => {
									const layerPair = layerString.split(":")
									return {
										synth: layerPair[0], 
										pattern: layerPair[1]
									}
								}).filter(layer => allSynths.includes(layer.synth) && allPatterns.includes(layer.pattern)) || []
							}
						}

					// return
						return queryParameters
				} catch (error) {console.log(error)}
			}

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
					AUDIO_J.master.gain.setValueAtTime(CONSTANTS.defaultMasterVolume, (AUDIO_J.audio.currentTime || 0))

				// layers
					for (const l in STATE.layers) {
						const layer = STATE.layers[l]
						const parameters = AUDIO_J.getInstrument(layer.synth)
						if (parameters) {
							AUDIO_J.instruments[layer.id] = AUDIO_J.buildInstrument(parameters)
						}
					}
			} catch (error) {console.log(error)}
		}

	/** playback **/
		/* changeVolume */
			ELEMENTS.controls.chords.volume.addEventListener(TRIGGERS.input, changeVolume)
			function changeVolume(event) {
				try {
					// no audio
						if (!AUDIO_J.audio) {
							firstClick()
							changeVolume()
							return
						}

					// validate
						const volume = Math.max(0, Math.min(1, Number(ELEMENTS.controls.chords.volume.value)))

					// update state
						STATE.playback.volume = volume

					// update volume
						AUDIO_J.master.gain.setValueAtTime(volume, (AUDIO_J.audio.currentTime || 0))
				} catch (error) {console.log(error)}
			}

		/* togglePlayback */
			window.addEventListener(TRIGGERS.keypress, togglePlayback)
			function togglePlayback(event) {
				try {
					// active element
						if (document.activeElement && document.activeElement !== ELEMENTS.body && document.activeElement !== ELEMENTS.controls.chords.play && document.activeElement !== ELEMENTS.controls.chords.pause) {
							return
						}
						
					// playing --> pause
						if (ELEMENTS.controls.chords.element.getAttribute("playing")) {
							pausePlayback()
							return
						}

					// paused --> start
						startPlayback()
				} catch (error) {console.log(error)}
			}

		/* startPlayback */
			ELEMENTS.controls.chords.play.addEventListener(TRIGGERS.click, startPlayback)
			function startPlayback(event) {
				try {
					// update state
						STATE.playback.playing = true

					// change view
						ELEMENTS.controls.chords.element.setAttribute("playing", true)
						ELEMENTS.viewer.outer.setAttribute("playing", true)

					// update playback loop
						clearInterval(STATE.playback.loop)
						STATE.playback.loop = null
						STATE.playback.loop = setInterval(updateState, STATE.playback.interval)

					// reset scroll
						setTimeout(() => {
							if (STATE.playback.currentChordElement) {
								STATE.playback.currentChordElement.removeAttribute("active")
								STATE.playback.currentChordElement = null
							}
							if (STATE.progression.chords[STATE.playback.measure]) {
								activateChordElement(STATE.progression.chords[STATE.playback.measure].element)
							}
						}, CONSTANTS.viewerTransitionTime)

					// start audio
						if (AUDIO_J.audio) {
							for (const partId in STATE.music.parts) {
								AUDIO_J.instruments[partId].setParameters({power: 1})
							}
						}

					// blur
						ELEMENTS.controls.chords.play.blur()
						ELEMENTS.controls.chords.play.focus()
				} catch (error) {console.log(error)}
			}

		/* pausePlayback */
			ELEMENTS.controls.chords.pause.addEventListener(TRIGGERS.click, pausePlayback)
			function pausePlayback(event) {
				try {
					// update state
						STATE.playback.playing = false

					// change view
						ELEMENTS.controls.chords.element.removeAttribute("playing")
						ELEMENTS.viewer.outer.removeAttribute("playing")

					// update playback loop
						STATE.playback.tick = 0
						clearInterval(STATE.playback.loop)
						STATE.playback.loop = null

					// stop audio
						if (AUDIO_J.audio) {
							for (const partId in STATE.music.parts) {
								AUDIO_J.instruments[partId].setParameters({power: 0})
							}
						}

					// blur
						ELEMENTS.controls.chords.pause.blur()
						ELEMENTS.controls.chords.play.focus()
				} catch (error) {console.log(error)}
			}

		/* restartPlayback */
			ELEMENTS.controls.chords.restart.addEventListener(TRIGGERS.click, restartPlayback)
			function restartPlayback(event) {
				try {
					// reset playback position
						STATE.playback.measure = 0
						STATE.playback.tick = 0
						ELEMENTS.controls.chords.current.value = STATE.playback.measure + CONSTANTS.measureOffset

					// blur
						ELEMENTS.controls.chords.restart.blur()
						ELEMENTS.controls.chords.current.focus()

					// display
						if (STATE.progression.chords[STATE.playback.measure]) {
							activateChordElement(STATE.progression.chords[STATE.playback.measure].element)
						}
				} catch (error) {console.log(error)}
			}

		/* changeCurrent */
			ELEMENTS.controls.chords.current.addEventListener(TRIGGERS.input, changeCurrent)
			function changeCurrent(event) {
				try {
					// validate
						const currentChord = Math.max(1, Math.min(STATE.progression.numerals.length, Number(ELEMENTS.controls.chords.current.value))) - CONSTANTS.measureOffset

					// change playback position
						STATE.playback.measure = currentChord
						STATE.playback.tick = 0

					// display
						if (STATE.progression.chords[STATE.playback.measure]) {
							activateChordElement(STATE.progression.chords[STATE.playback.measure].element)
						}
				} catch (error) {console.log(error)}
			}

	/** progression **/
		/* changeChordCount */
			ELEMENTS.controls.chords.count.addEventListener(TRIGGERS.input, changeChordCount)
			function changeChordCount(event) {
				try {
					// validate
						const previousMeasureCount = STATE.progression.measureCount
						STATE.progression.measureCount = Math.max(CONSTANTS.minMeasures, Math.min(CONSTANTS.maxMeasures, Number(ELEMENTS.controls.chords.count.value)))
						ELEMENTS.controls.chords.current.max = STATE.progression.measureCount
						STATE.music.measureTicks = buildMeasureTicks(STATE.progression.measureCount, STATE.progression.ticksPerMeasure)

					// random chord progression
						randomizeChords(null, Math.min(STATE.progression.measureCount, previousMeasureCount))
				} catch (error) {console.log(error)}
			}

		/* randomizeChords */
			ELEMENTS.controls.chords.randomize.addEventListener(TRIGGERS.click, randomizeChords)
			function randomizeChords(event, keepCount) {
				try {
					// generate progression
						STATE.progression.numerals = generateProgression(STATE.progression.measureCount, STATE.progression.mode, STATE.progression.type, keepCount)
						STATE.progression.chords = getChordsFromNumerals(STATE.progression.numerals, STATE.progression.tonic)

					// display
						displayChords(STATE.progression.chords)

					// reset playback position
						STATE.playback.measure = 0
						STATE.playback.tick = 0
						ELEMENTS.controls.chords.current.value = STATE.playback.measure + CONSTANTS.measureOffset

					// recalculate measures
						for (const layerId in STATE.layers) {
							STATE.music.parts[layerId].measures = composeMeasures(STATE.progression, STATE.layers[layerId].pattern)
						}

					// update url
						updateURL()
				} catch (error) {console.log(error)}
			}

		/* copyChords */
			ELEMENTS.controls.chords.copy.addEventListener(TRIGGERS.click, copyChords)
			function copyChords(event) {
				try {
					// already copied
						if (ELEMENTS.controls.chords.copy.getAttribute("copied")) {
							return
						}

					// swap display
						ELEMENTS.controls.chords.copy.setAttribute("copied", true)

					// get spaces
						const numeralSpaces = Math.max(...STATE.progression.chords.map(chord => chord.numeral.length)) + CONSTANTS.copySpaces
						const nameSpaces    = Math.max(...STATE.progression.chords.map(chord => chord.name.length   )) + CONSTANTS.copySpaces

					// get text
						const text = STATE.progression.chords.map(chord => 
							[	   chord.numeral,	...new Array(numeralSpaces).fill(" ")].join("").slice(0, numeralSpaces) + 
							[	   chord.name,		...new Array(nameSpaces   ).fill(" ")].join("").slice(0, nameSpaces   ) + 
							["(" + chord.notes.join("-") + ")"									].join("")
						).join("\n")
						
					// copy to clipboard
						navigator.clipboard.writeText(text)

					// swap display
						setTimeout(() => {
							ELEMENTS.controls.chords.copy.removeAttribute("copied")
						}, CONSTANTS.copyTimeoutTime)
				} catch (error) {console.log(error)}
			}

		/* downloadChords */
			ELEMENTS.controls.chords.download.addEventListener(TRIGGERS.click, downloadChords)
			function downloadChords(event) {
				try {
					// no layers
						if (!Object.keys(STATE.music.parts).length) {
							return
						}

					// blur
						ELEMENTS.controls.chords.download.blur()

					// loading state
						ELEMENTS.controls.chords.download.setAttribute("loading", true)

					// package up
						setTimeout(() => {
							try {
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
										ELEMENTS.controls.chords.download.removeAttribute("loading")
									})
									downloadLink.click()
							}
							catch (error) {
								console.log(error)
								ELEMENTS.controls.chords.download.removeAttribute("loading")
							}
						}, 0)
				} catch (error) {console.log(error)}
			}

	/** timing **/
		/* changeTimeSignature */
			ELEMENTS.controls.chords.timeSignature.addEventListener(TRIGGERS.input, changeTimeSignature)
			function changeTimeSignature(event) {
				try {
					// validate
						const timeSignature = ELEMENTS.controls.chords.timeSignature.value
						if (!Object.keys(CONSTANTS.timeSignatures).includes(timeSignature)) {
							return
						}

					// update state
						STATE.progression.timeSignature = timeSignature
						STATE.progression.beatsPerMeasure = CONSTANTS.timeSignatures[STATE.progression.timeSignature].beats
						STATE.progression.ticksPerSubdivision = CONSTANTS.timeSignatures[STATE.progression.timeSignature].ticksPerSubdivision
						STATE.progression.ticksPerMeasure = CONSTANTS.ticksPerBeat * STATE.progression.beatsPerMeasure
						STATE.playback.tick = 0

					// recalculate measures
						STATE.music.measureTicks = buildMeasureTicks(STATE.progression.measureCount, STATE.progression.ticksPerMeasure)
						for (const layerId in STATE.layers) {
							STATE.music.parts[layerId].measures = composeMeasures(STATE.progression, STATE.layers[layerId].pattern)
						}

					// update url
						updateURL()
				} catch (error) {console.log(error)}
			}

		/* changeTempo */
			ELEMENTS.controls.chords.tempo.addEventListener(TRIGGERS.input, changeTempo)
			function changeTempo(event) {
				try {
					// validate
						const tempo = Math.max(1, Math.min(CONSTANTS.maxTempo, Number(ELEMENTS.controls.chords.tempo.value)))

					// update state
						STATE.playback.tempo = tempo
						STATE.playback.interval = Math.round(CONSTANTS.minute / CONSTANTS.ticksPerBeat / STATE.playback.tempo)
						STATE.music.tempoChanges["1"] = STATE.playback.tempo

					// update playback loop
						if (STATE.playback.playing) {
							clearInterval(STATE.playback.loop)
							STATE.playback.loop = setInterval(updateState, STATE.playback.interval)
						}

					// update url
						updateURL()
				} catch (error) {console.log(error)}
			}

	/** key **/
		/* changeTonic */
			ELEMENTS.controls.chords.tonic.addEventListener(TRIGGERS.input, changeTonic)
			function changeTonic(event) {
				try {
					// validate
						const tonic = ELEMENTS.controls.chords.tonic.value
						if (!CONSTANTS.allowedKeys.includes(tonic)) {
							return
						}

					// transpose
						STATE.progression.tonic = tonic
						STATE.progression.semitoneOffset = CONSTANTS.enharmonicEquivalents.findIndex(equivalents => equivalents.includes(tonic))
						STATE.progression.chords = getChordsFromNumerals(STATE.progression.numerals, STATE.progression.tonic)

					// display
						displayChords(STATE.progression.chords)

					// reset playback position
						STATE.playback.measure = 0
						STATE.playback.tick = 0
						ELEMENTS.controls.chords.current.value = STATE.playback.measure + CONSTANTS.measureOffset

					// recalculate measures
						for (const layerId in STATE.layers) {
							STATE.music.parts[layerId].measures = composeMeasures(STATE.progression, STATE.layers[layerId].pattern)
						}

					// update url
						updateURL()
				} catch (error) {console.log(error)}
			}

		/* changeMode */
			ELEMENTS.controls.chords.mode.addEventListener(TRIGGERS.input, changeMode)
			function changeMode(event) {
				try {
					// validate
						const mode = ELEMENTS.controls.chords.mode.value
						if (!CONSTANTS.modes.includes(mode)) {
							return
						}

					// swap
						STATE.progression.mode = mode
						for (const n in STATE.progression.numerals) {
							STATE.progression.numerals[n] = changeChordToMode(STATE.progression.numerals[n], STATE.progression.mode, STATE.progression.type)
						}
						STATE.progression.chords = getChordsFromNumerals(STATE.progression.numerals, STATE.progression.tonic)

					// display
						displayChords(STATE.progression.chords)
					
					// reset playback position
						STATE.playback.measure = 0
						STATE.playback.tick = 0
						ELEMENTS.controls.chords.current.value = STATE.playback.measure + CONSTANTS.measureOffset

					// recalculate measures
						for (const layerId in STATE.layers) {
							STATE.music.parts[layerId].measures = composeMeasures(STATE.progression, STATE.layers[layerId].pattern)
						}

					// update url
						updateURL()
				} catch (error) {console.log(error)}
			}

		/* changeType */
			ELEMENTS.controls.chords.type.addEventListener(TRIGGERS.input, changeType)
			function changeType(event) {
				try {
					// validate
						const type = ELEMENTS.controls.chords.type.value
						if (!CONSTANTS.types.includes(type)) {
							return
						}

					// swap
						STATE.progression.type = type
						for (const n in STATE.progression.numerals) {
							STATE.progression.numerals[n] = changeChordToMode(STATE.progression.numerals[n], STATE.progression.mode, STATE.progression.type)
						}
						STATE.progression.chords = getChordsFromNumerals(STATE.progression.numerals, STATE.progression.tonic)

					// display
						displayChords(STATE.progression.chords)
						if (type == "triads") {
							ELEMENTS.viewer.outer.removeAttribute("sevenths")
						}
						else {
							ELEMENTS.viewer.outer.setAttribute("sevenths", true)
						}
					
					// reset playback position
						STATE.playback.measure = 0
						STATE.playback.tick = 0
						ELEMENTS.controls.chords.current.value = STATE.playback.measure + CONSTANTS.measureOffset

					// recalculate measures
						for (const layerId in STATE.layers) {
							STATE.music.parts[layerId].measures = composeMeasures(STATE.progression, STATE.layers[layerId].pattern)
						}

					// update url
						updateURL()
				} catch (error) {console.log(error)}
			}

	/** viewer **/
		/* changeNumeral */
			function changeNumeral(event) {
				try {
					// get numeral
						const numeral = event.target.value
						if (!Object.keys(CONSTANTS.chords).includes(numeral)) {
							return
						}

					// get # of chord
						const chordElement = event.target.closest(".chord-block-outer")
						const chordIndex = Number(chordElement.id.split("-")[1])
						const chord = STATE.progression.chords[chordIndex]

					// update state
						STATE.progression.numerals[chordIndex] = numeral
						STATE.progression.chords[chordIndex] = getChordFromNumeral(numeral, STATE.progression.tonic)
						STATE.progression.chords[chordIndex].element = chordElement

					// display updated card
						const updatedChord = STATE.progression.chords[chordIndex]
						updatedChord.element.querySelector(".chord-block").setAttribute("harmonic-function", updatedChord.function)
						updatedChord.element.querySelector(".chord-block-name").innerText = updatedChord.name
						updatedChord.element.querySelector(".chord-block-notes").innerText = updatedChord.notes.join("-")

					// update controls
						displayModeAndType(CONSTANTS.chords[updatedChord.numeral].mode, CONSTANTS.chords[updatedChord.numeral].seventh ? "sevenths" : "triads")

					// reset playback position
						STATE.playback.measure = 0
						STATE.playback.tick = 0
						ELEMENTS.controls.chords.current.value = STATE.playback.measure + CONSTANTS.measureOffset

					// recalculate measure
						for (const layerId in STATE.layers) {
							STATE.music.parts[layerId].measures[String(chordIndex + CONSTANTS.measureOffset)] = composeMeasure(STATE.progression, chordIndex, STATE.layers[layerId].pattern)
						}

					// update url
						updateURL()
				} catch (error) {console.log(error)}
			}

		/* rerollChord */
			function rerollChord(event) {
				try {
					// get # of chord
						const chordElement = event.target.closest(".chord-block-outer")
						const chordIndex = Number(chordElement.id.split("-")[1])
						const thisChord = STATE.progression.chords[chordIndex].numeral
						
					// get previous
						const previousIndex = chordIndex ? chordIndex - 1 : STATE.progression.chords.length - 1
						const previousChord = STATE.progression.numerals[previousIndex]
						
					// get allowed chords
						const mode = STATE.progression.mode
						const type = STATE.progression.type
						const allowedChords = Object.keys(CONSTANTS.chords).filter(numeral => isNumeralInMode(numeral, mode, type))
						
					// get next options
						const previousTriad = CONSTANTS.chords[previousChord].seventh ? CONSTANTS.chords[previousChord].seventh : previousChord
						let nextOptions = [...CONSTANTS.chords[previousTriad].next]

					// look back more
						const twoChordsBack = previousIndex ? STATE.progression.chords[previousIndex - 1] : STATE.progression.chords[STATE.progression.length - 1]

					// deceptive cadence
						if (CONSTANTS.deceptiveCadences.major.from.includes(twoChordsBack) && CONSTANTS.deceptiveCadences.major.to.includes(previousChord)) {
							nextOptions = [...CONSTANTS.chords["I"].next]
						}
						if (CONSTANTS.deceptiveCadences.minor.from.includes(twoChordsBack) && CONSTANTS.deceptiveCadences.minor.to.includes(previousChord)) {
							nextOptions = [...CONSTANTS.chords["i"].next]
						}

					// avoid threepeats
						if (previousChord == twoChordsBack) {
							nextOptions = nextOptions.filter(option => option != previousChord) || []
						}

					// filter down to mode
						nextOptions = nextOptions.filter(numeral => isNumeralInMode(numeral, mode)) || []

					// sevenths
						if (type == "sevenths") {
							const seventhEquivalents = []
							for (let nextOption of nextOptions) {
								seventhEquivalents.push(Object.keys(CONSTANTS.chords).filter(numeral => CONSTANTS.chords[numeral].seventh == nextOption))
							}
							nextOptions = nextOptions.concat(seventhEquivalents.flat())
						}

					// add random chord to progression
						const nextChord = nextOptions.length ? chooseRandom(nextOptions) : thisChord

					// update state
						STATE.progression.numerals[chordIndex] = nextChord
						STATE.progression.chords[chordIndex] = getChordFromNumeral(nextChord, STATE.progression.tonic)
						STATE.progression.chords[chordIndex].element = chordElement

					// display updated card
						const updatedChord = STATE.progression.chords[chordIndex]
						updatedChord.element.querySelector(".chord-block-numeral").value = nextChord
						updatedChord.element.querySelector(".chord-block").setAttribute("harmonic-function", updatedChord.function)
						updatedChord.element.querySelector(".chord-block-name").innerText = updatedChord.name
						updatedChord.element.querySelector(".chord-block-notes").innerText = updatedChord.notes.join("-")

					// update controls
						displayModeAndType(CONSTANTS.chords[updatedChord.numeral].mode, CONSTANTS.chords[updatedChord.numeral].seventh ? "sevenths" : "triads")

					// reset playback position
						STATE.playback.measure = 0
						STATE.playback.tick = 0
						ELEMENTS.controls.chords.current.value = STATE.playback.measure + CONSTANTS.measureOffset

					// recalculate measure
						for (const layerId in STATE.layers) {
							STATE.music.parts[layerId].measures[String(chordIndex + CONSTANTS.measureOffset)] = composeMeasure(STATE.progression, chordIndex, STATE.layers[layerId].pattern)
						}

					// update url
						updateURL()
				} catch (error) {console.log(error)}
			}

		/* tonicifyChord */
			function tonicifyChord(event) {
				try {
					// get # of chord
						const chordElement = event.target.closest(".chord-block-outer")
						const chordIndex = Number(chordElement.id.split("-")[1])
						const thisChord = STATE.progression.chords[chordIndex]

					// steps to tonic
						const semitonesAboveTonic = thisChord.semitones[0]
						if (!semitonesAboveTonic) {
							return
						}

					// loop through all chords
						const newNumerals = []
						for (const i in STATE.progression.chords) {
							const oldQuality = STATE.progression.chords[i].quality
							const oldRootSemitone = STATE.progression.chords[i].semitones[0]
							const newRootSemitone = (oldRootSemitone - semitonesAboveTonic + AUDIO_J.constants.semitonesPerOctave) % AUDIO_J.constants.semitonesPerOctave
							
							const newNumeralOptions = Object.keys(CONSTANTS.chords).filter(numeral => 
								CONSTANTS.chords[numeral].semitones[0] == newRootSemitone
							)
							const newNumeral = newNumeralOptions.find(numeral => CONSTANTS.chords[numeral].quality == oldQuality) || newNumeralOptions[0]
							newNumerals.push(newNumeral)
						}

					// update chords
						for (const i in STATE.progression.chords) {
							const select = STATE.progression.chords[i].element.querySelector(".chord-block-numeral")
								select.value = newNumerals[i]
							changeNumeral({target: select})
						}

					// change key
						ELEMENTS.controls.chords.tonic.value = thisChord.notes[0]
						changeTonic()
				} catch (error) {console.log(error)}
			}

		/* swapChordLeft */
			function swapChordLeft(event) {
				try {
					// get # of chord
						const chordElement = event.target.closest(".chord-block-outer")
						const chordIndex = Number(chordElement.id.split("-")[1])
						const thisNumeral = STATE.progression.chords[chordIndex].numeral

					// get previous numeral
						const previousIndex = chordIndex ? chordIndex - 1 : STATE.progression.chords.length - 1
						const previousNumeral = STATE.progression.chords[previousIndex].numeral

					// change selects
						const thisSelect = STATE.progression.chords[chordIndex].element.querySelector(".chord-block-numeral")
							thisSelect.value = previousNumeral
						const previousSelect = STATE.progression.chords[previousIndex].element.querySelector(".chord-block-numeral")
							previousSelect.value = thisNumeral

					// simulate change event
						changeNumeral({target: thisSelect})
						changeNumeral({target: previousSelect})
				} catch (error) {console.log(error)}
			}

		/* swapChordRight */
			function swapChordRight(event) {
				try {
					// get # of chord
						const chordElement = event.target.closest(".chord-block-outer")
						const chordIndex = Number(chordElement.id.split("-")[1])
						const thisNumeral = STATE.progression.chords[chordIndex].numeral

					// get next numeral
						const nextIndex = chordIndex + 1 < STATE.progression.chords.length ? chordIndex + 1 : 0
						const nextNumeral = STATE.progression.chords[nextIndex].numeral

					// change selects
						const thisSelect = STATE.progression.chords[chordIndex].element.querySelector(".chord-block-numeral")
							thisSelect.value = nextNumeral
						const nextSelect = STATE.progression.chords[nextIndex].element.querySelector(".chord-block-numeral")
							nextSelect.value = thisNumeral

					// simulate change event
						changeNumeral({target: thisSelect})
						changeNumeral({target: nextSelect})
				} catch (error) {console.log(error)}
			}

	/** layers **/
		/* addLayer */
			ELEMENTS.controls.layers.add.addEventListener(TRIGGERS.click, addLayer)
			function addLayer(event, preset) {
				try {
					// too many?
						if (Object.keys(STATE.music.parts).length >= CONSTANTS.maximumMidiChannel) {
							return
						}

					// layer object
						const layer = {
							id: generateRandom(),
							volume: CONSTANTS.defaultSynthVolume,
							synth: null,
							pattern: null
						}

						layer.pattern = preset ? preset.pattern : chooseRandom(Object.keys(CONSTANTS.patterns))
						layer.synth   = preset ? preset.synth   : CONSTANTS.patterns[layer.pattern].defaultSynth

					// build layer element
						layer.element = buildLayer(layer)
						ELEMENTS.controls.layers.list.appendChild(layer.element)

					// add to state
						STATE.layers[layer.id] = layer

					// build instrument
						if (AUDIO_J.audio) {
							const parameters = AUDIO_J.getInstrument(layer.synth)
							if (parameters) {
								AUDIO_J.instruments[layer.id] = AUDIO_J.buildInstrument(parameters)
							}
						}

					// add part
						STATE.music.parts[layer.id] = buildPart(layer, STATE.music.parts)
						STATE.music.parts[layer.id].measures = composeMeasures(STATE.progression, layer.pattern)

					// update url
						updateURL()
				} catch (error) {console.log(error)}
			}

		/* changeLayerVolume */
			function changeLayerVolume(event) {
				try {
					// get layer
						const layerElement = event.target.closest(".layer-block-outer")
						const layerId = layerElement.id.split("-")[1]
						const layer = STATE.layers[layerId]

					// update volume
						const volume = Math.max(0, Math.min(1, Number(event.target.value)))
						layer.volume = volume

					// update instrument
						if (AUDIO_J.instruments[layer.id]) {
							AUDIO_J.instruments[layer.id].setParameters({volume: layer.volume})
						}
				} catch (error) {console.log(error)}
			}

		/* changeLayerSynth */
			function changeLayerSynth(event) {
				try {
					// get layer
						const layerElement = event.target.closest(".layer-block-outer")
						const layerId = layerElement.id.split("-")[1]
						const layer = STATE.layers[layerId]

					// update synth
						const synthName = event.target.value
						const parameters = AUDIO_J.getInstrument(synthName)
						if (parameters) {
							STATE.layers[layer.id].synth = synthName
							AUDIO_J.instruments[layer.id] = AUDIO_J.buildInstrument(parameters)
						}

					// update part
						const [midiProgram, instrument] = getInstrumentFromSynth(synthName)

						STATE.music.parts[layer.id].synth = synthName
						STATE.music.parts[layer.id].midiProgram = midiProgram
						STATE.music.parts[layer.id].name = instrument
						STATE.music.parts[layer.id].instrument = instrument

					// update url
						updateURL()
				} catch (error) {console.log(error)}
			}

		/* changeLayerPattern */
			function changeLayerPattern(event) {
				try {
					// get layer
						const layerElement = event.target.closest(".layer-block-outer")
						const layerId = layerElement.id.split("-")[1]
						const layer = STATE.layers[layerId]

					// update pattern
						const pattern = event.target.value
						if (!Object.keys(CONSTANTS.patterns).includes(pattern)) {
							return
						}
						STATE.layers[layer.id].pattern = pattern

					// recalculate measures
						STATE.music.parts[layer.id].measures = composeMeasures(STATE.progression, STATE.layers[layer.id].pattern)

					// update url
						updateURL()
				} catch (error) {console.log(error)}
			}

		/* removeLayer */
			function removeLayer(event) {
				try {
					// get layer
						const layerElement = event.target.closest(".layer-block-outer")
						const layerId = layerElement.id.split("-")[1]
						const layer = STATE.layers[layerId]

					// remove instrument
						if (AUDIO_J.audio) {
							AUDIO_J.instruments[layer.id].setParameters({power: 0})
							delete AUDIO_J.instruments[layer.id]
						}

					// remove elements
						layerElement.remove()

					// remove part
						delete STATE.music.parts[layer.id]
						delete STATE.layers[layer.id]

					// update url
						updateURL()
				} catch (error) {console.log(error)}
			}

/*** helpers ***/
	/** random **/
		/* chooseRandom */
			function chooseRandom(list) {
				try {
					// not an array
						if (!Array.isArray(list)) {
							return list
						}

					// random element from list
						return list[Math.floor(Math.random() * list.length)]
				} catch (error) {console.log(error)}
			}

		/* generateRandom */
			function generateRandom() {
				try {
					// random 8-character alphanumeric string
						return Math.floor(Math.random() * 10e16).toString(36).slice(1, 9)
				} catch (error) {console.log(error)}
			}

	/** other **/
		/* updateURL */
			function updateURL() {
				try {
					// get text
						const numerals = STATE.progression.numerals.join("-").replace(/♯/g, "sharp").replace(/♭/g, "flat").replace(/\s/g, "_")
						const timeSignature = STATE.progression.timeSignature.replace("/", "-")
						const tempo = STATE.playback.tempo
						const tonic = STATE.progression.tonic.replace(/♯/g, "sharp").replace(/♭/g, "flat")
						const layers = Object.keys(STATE.layers).map(id => STATE.layers[id].synth + ":" + STATE.layers[id].pattern.replace(/\s/g, "_")).join(",") || "none"

					// build queryString
						const queryString = "?numerals=" + numerals +
											"&timeSignature=" + timeSignature +
											"&tempo=" + tempo +
											"&tonic=" + tonic +
											"&layers=" + layers

					// update URL
						const currentURL = new URL(window.location.href)
							currentURL.search = queryString
						window.history.replaceState({}, "", currentURL)	
				} catch (error) {console.log(error)}
			}

/*** chord progression ***/
	/** music theory **/
		/* isNumeralInMode */
			function isNumeralInMode(numeral, mode, type) {
				try {
					// no numeral
						if (!numeral || !CONSTANTS.chords[numeral]) {
							return false
						}

					// this numeral's mode
						const numeralMode = CONSTANTS.chords[numeral].mode || null

					// sevenths
						if (type == "triads" && CONSTANTS.chords[numeral].seventh) {
							return false
						}

					// V --> always allowed
						if (!numeralMode) {
							return true
						}

					// more / most --> allow everything
						if (mode == "more" || mode == "most") {
							return true
						}

					// major
						if (mode == "major" && numeralMode == "major") {
							return true
						}

					// minor
						if (mode == "minor" && numeralMode == "minor") {
							return true
						}

					// mixed
						if (mode == "mixed" && (numeralMode == "major" || numeralMode == "minor")) {
							return true
						}

					// otherwise
						return false
				} catch (error) {console.log(error)}
			}

		/* getNotesOfChord */
			function getNotesOfChord(tonic, scaleDegrees, semitones) {
				try {
					// semitone offset
						const semitoneOffset = CONSTANTS.enharmonicEquivalents.findIndex(notes => notes.includes(tonic))
						if (semitoneOffset == -1) {
							return []
						}

					// map semitone # to list of possible note spellings
						const noteOptions = semitones.map(semitone => {
							const adjustedSemitone = (semitone + semitoneOffset) % CONSTANTS.enharmonicEquivalents.length
							return [...CONSTANTS.enharmonicEquivalents[adjustedSemitone]]
						})

					// scale in tonic
						const scale = [...CONSTANTS.letters]
						while (scale[0] !== tonic[0]) {
							scale.push(scale.shift())
						}

					// spell notes
						const notes = []
						for (const index in noteOptions) {
							const scaleDegree = scaleDegrees[index] - 1
							const options = noteOptions[index]

							const note = options.find(option => option[0] == scale[scaleDegree]) || "?"
							notes.push(note)
						}

					// return
						return notes
				} catch (error) {console.log(error)}
			}

		/* changeChordToMode */
			function changeChordToMode(numeral, mode, type) {
				try {
					// no numeral
						if (!numeral || !CONSTANTS.chords[numeral]) {
							return numeral || "?"
						}

					// already in mode?
						if (isNumeralInMode(numeral, mode, type)) {
							return numeral
						}

					// seventh --> triad
						if (type == "triads" && CONSTANTS.chords[numeral].seventh) {
							numeral = CONSTANTS.chords[numeral].seventh
						}

					// previous function
						let previousFunction = CONSTANTS.chords[numeral].function

					// more / most --> get equivalent function in [major, minor, mixed]
						if (previousFunction == "neapolitan") {
							previousFunction = "supertonic"
						}
						else if (previousFunction == "common-tone") {
							previousFunction = "subdominant"
						}
						else if (previousFunction == "augmented-6th") {
							previousFunction = "subdominant"
						}
						else if (previousFunction == "tritone") {
							previousFunction = "dominant"
						}
						else if (previousFunction == "secondary-dominant") {
							if (numeral.includes("/V")) { // II
								previousFunction = "supertonic"
							}
							if (numeral.includes("/vi")) { // III
								previousFunction = "mediant"
							}
							if (numeral.includes("/ii")) { // VI
								previousFunction = "submediant"
							}
							if (numeral.includes("/iii")) { // VII
								previousFunction = "subtonic"
							}
						}

					// major | minor | mixed | more --> more | [same]
						const previousMode = CONSTANTS.chords[numeral].mode
						if (mode == "more" || mode == "most" || mode == previousMode) {
							return numeral
						}

					// more --> mixed
						if ((previousMode == "more" || previousMode == "most") && mode == "mixed") {
							return chooseRandom(Object.keys(CONSTANTS.chords).filter(possibleMatch => 
								CONSTANTS.chords[possibleMatch].function == previousFunction &&
								["major", "minor", null].includes(CONSTANTS.chords[possibleMatch].mode) && 
								(type == "triads" ? !CONSTANTS.chords[possibleMatch].seventh : true) &&
								(type == "sevenths" && CONSTANTS.chords[numeral].seventh ? CONSTANTS.chords[possibleMatch].seventh : true)
							))
						}

					// major | minor --> mixed
						if (mode == "mixed") {
							return numeral
						}

					// major | minor | mixed | more | most --> major | minor
						return Object.keys(CONSTANTS.chords).find(possibleMatch => 
							CONSTANTS.chords[possibleMatch].function == previousFunction &&
							(CONSTANTS.chords[possibleMatch].mode == mode || !CONSTANTS.chords[possibleMatch].mode) && 
							(type == "triads" ? !CONSTANTS.chords[possibleMatch].seventh : true) && 
							(type == "sevenths" && CONSTANTS.chords[numeral].seventh ? CONSTANTS.chords[possibleMatch].seventh : true)
						)
				} catch (error) {console.log(error)}
			}
		
		/* generateProgression */
			function generateProgression(chordCount, mode, type, keepCount) {
				try {
					// empty progression
						const progression = []

					// keep any?
						if (keepCount) {
							for (let i = 0; i < keepCount; i++) {
								progression.push(STATE.progression.numerals[i])
							}
						}

					// random first chord
						const allowedChords = Object.keys(CONSTANTS.chords).filter(numeral => isNumeralInMode(numeral, mode, type))
						if (!progression.length) {
							progression.push(chooseRandom(allowedChords))
						}

					// most mode?
						if (mode == "most") {
							while (progression.length < chordCount) {
								progression.push(chooseRandom(allowedChords))
							}
							return progression
						}

					// build progression
						let attempts = CONSTANTS.attempts
						while (progression.length < chordCount && attempts) {
							// get next options
								const previousChord = progression[progression.length - 1]
								const previousTriad = CONSTANTS.chords[previousChord].seventh ? CONSTANTS.chords[previousChord].seventh : previousChord
								let nextOptions = [...CONSTANTS.chords[previousTriad].next]

							// look back more
								if (progression.length > 1) {
									const twoChordsBack = progression[progression.length - 2]

									// deceptive cadence
										if (CONSTANTS.deceptiveCadences.major.from.includes(twoChordsBack) && CONSTANTS.deceptiveCadences.major.to.includes(previousChord)) {
											nextOptions = [...CONSTANTS.chords["I"].next]
										}
										if (CONSTANTS.deceptiveCadences.minor.from.includes(twoChordsBack) && CONSTANTS.deceptiveCadences.minor.to.includes(previousChord)) {
											nextOptions = [...CONSTANTS.chords["i"].next]
										}

									// avoid threepeats
										if (previousChord == twoChordsBack) {
											nextOptions = nextOptions.filter(option => option != previousChord) || []
										}
								}

							// filter down to mode
								nextOptions = nextOptions.filter(numeral => isNumeralInMode(numeral, mode)) || []

							// last chord before loop?
								if (progression.length == chordCount - 1) {
									// get first chord
										const firstChord = CONSTANTS.chords[progression[0]].seventh ? CONSTANTS.chords[progression[0]].seventh : progression[0]
										nextOptions = nextOptions.filter(option => CONSTANTS.chords[option].next.includes(firstChord)) || []

									// ensure progression has a tonic center
										if (!progression.find(chord => CONSTANTS.tonics.includes(chord))) {
											nextOptions = nextOptions.filter(option => CONSTANTS.tonics.includes(option)) || []
										}

									// avoid threepeats
										if (previousChord == firstChord) {
											nextOptions = nextOptions.filter(option => option != previousChord) || []	
										}

									// no valid options? go back a chord
										if (!nextOptions.length) {
											progression.pop()
											attempts--
											continue
										}
								}

							// sevenths
								if (type == "sevenths") {
									const seventhEquivalents = []
									for (let nextOption of nextOptions) {
										seventhEquivalents.push(Object.keys(CONSTANTS.chords).filter(numeral => CONSTANTS.chords[numeral].seventh == nextOption))
									}
									nextOptions = nextOptions.concat(seventhEquivalents.flat())
								}

							// add random chord to progression
								progression.push(chooseRandom(nextOptions))
						}

					// find tonic center
						const firstTonicIndex = progression.findIndex(chord => CONSTANTS.tonics.includes(chord))
						if (firstTonicIndex == -1) {
							return []
						}
						const firstTonic = progression[firstTonicIndex]

					// shift to start with firstTonic
						while (progression[0] !== firstTonic) {
							progression.push(progression.shift())
						}

					// progression
						return progression || []
				} catch (error) {console.log(error)}
			}

		/* getChordsFromNumerals */
			function getChordsFromNumerals(numerals, tonic) {
				try {
					// empty chords list
						const chords = []

					// loop through numerals
						for (const numeral of numerals) {
							chords.push(getChordFromNumeral(numeral, tonic))
						} 

					// return
						return chords
				} catch (error) {console.log(error)}
			}

		/* getChordFromNumerals */
			function getChordFromNumeral(numeral, tonic) {
				try {
					// get chord
						const chordInfo = CONSTANTS.chords[numeral]
						if (!chordInfo) {
							return {
								numeral: "?",
								function: "none",
								quality: "none",
								scaleDegrees: [],
								semitones: [],
								notes: [],
								name: "?"
							}
						}

					// info
						const scaleDegrees = [...chordInfo.scaleDegrees]
						const semitones = [...chordInfo.semitones]
						const quality = chordInfo.quality
						const notes = getNotesOfChord(tonic, scaleDegrees, semitones)
						const name = notes[0] + CONSTANTS.chordAbbreviations[chordInfo.quality]
						
					// object
						return {
							numeral: numeral,
							function: chordInfo.function,
							quality: quality,
							scaleDegrees: scaleDegrees,
							semitones: semitones,
							notes: notes,
							name: name
						}
				} catch (error) {console.log(error)}
			}

	/** html **/
		/* displayChords */
			function displayChords(chords) {
				try {
					// clear out
						ELEMENTS.viewer.element.innerHTML = ""

					// mode & type
						let includesMajor = false
						let includesMinor = false
						let includesMore  = false
						let includesSevenths = false

					// display
						for (const c in chords) {
							const chord = chords[c]
								chord.element = buildChordElement(chord)
								chord.element.id = "chord-" + c
							ELEMENTS.viewer.element.appendChild(chord.element)

							displayModeAndType(CONSTANTS.chords[chord.numeral].mode, CONSTANTS.chords[chord.numeral].seventh ? "sevenths" : "triads")
						}
				} catch (error) {console.log(error)}
			}

		/* displayModeAndType */
			function displayModeAndType(mode, type) {
				try {
					// current
						const currentMode = ELEMENTS.controls.chords.mode.value
						const currentType = ELEMENTS.controls.chords.type.value

					// upgrade type
						if (currentType !== "sevenths" && type == "sevenths") {
							STATE.progression.type = "sevenths"
							ELEMENTS.controls.chords.type.value = "sevenths"
							ELEMENTS.viewer.outer.setAttribute("sevenths", true)
						}

					// upgrade mode
						if (currentMode == "more" || currentMode == "most") {
							return
						}
						if (mode == "more" || mode == "most") {
							STATE.progression.mode = mode
							ELEMENTS.controls.chords.mode.value = mode
							return
						}

						if (currentMode == "mixed") {
							return
						}
						if (currentMode == "major" && mode == "minor" ||
							currentMode == "minor" && mode == "major") {
							STATE.progression.mode = "mixed"
							ELEMENTS.controls.chords.mode.value = "mixed"
							return
						}
				} catch (error) {console.log(error)}
			}

		/* buildChordElement */
			function buildChordElement(chordInfo) {
				try {
					// outer
						const chordOuter = document.createElement("div")
							chordOuter.className = "chord-block-outer"

					// block
						const chordElement = document.createElement("div")
							chordElement.className = "chord-block"
							chordElement.setAttribute("harmonic-function", chordInfo.function)
						chordOuter.appendChild(chordElement)

					// info
						const numeralElement = document.createElement("select")
							numeralElement.className = "chord-block-numeral"

							const optgroups = {}
							for (const groupName of ["major", "minor", "more"]) {
								const optgroup = document.createElement("optgroup")
									optgroup.label = groupName
								optgroups[groupName] = optgroup
								numeralElement.appendChild(optgroup)
							}

							for (const numeral in CONSTANTS.chords) {
								const groupName = CONSTANTS.chords[numeral].mode || "major"
								const optionElement = document.createElement("option")
									optionElement.value = optionElement.innerText = numeral
								if (CONSTANTS.chords[numeral].seventh) {
									optionElement.setAttribute("seventh", true)
								}
								optgroups[groupName].appendChild(optionElement)
							}

							numeralElement.value = chordInfo.numeral
							numeralElement.addEventListener(TRIGGERS.input, changeNumeral)
						chordElement.appendChild(numeralElement)

						const nameElement = document.createElement("div")
							nameElement.className = "chord-block-name"
							nameElement.innerText = chordInfo.name
						chordElement.appendChild(nameElement)

						const notesElement = document.createElement("div")
							notesElement.className = "chord-block-notes"
							notesElement.innerText = chordInfo.notes.join("-")
						chordElement.appendChild(notesElement)

						const beatElement = document.createElement("div")
							beatElement.className = "chord-block-beat"
						chordElement.appendChild(beatElement)

						const swapLeftButton = document.createElement("button")
							swapLeftButton.className = "chord-block-swap-left"
							swapLeftButton.innerHTML = CONSTANTS.svg.left
							swapLeftButton.title = "move chord left"
							swapLeftButton.addEventListener(TRIGGERS.click, swapChordLeft)
						chordElement.appendChild(swapLeftButton)

						const rerollButton = document.createElement("button")
							rerollButton.className = "chord-block-reroll"
							rerollButton.innerHTML = CONSTANTS.svg.rotate
							rerollButton.title = "randomize chord"
							rerollButton.addEventListener(TRIGGERS.click, rerollChord)
						chordElement.appendChild(rerollButton)

						const tonicifyButton = document.createElement("button")
							tonicifyButton.className = "chord-block-tonicify"
							tonicifyButton.innerHTML = CONSTANTS.svg.pin
							tonicifyButton.title = "make tonic"
							tonicifyButton.addEventListener(TRIGGERS.click, tonicifyChord)
						chordElement.appendChild(tonicifyButton)

						const swapRightButton = document.createElement("button")
							swapRightButton.className = "chord-block-swap-right"
							swapRightButton.innerHTML = CONSTANTS.svg.right
							swapRightButton.title = "move chord right"
							swapRightButton.addEventListener(TRIGGERS.click, swapChordRight)
						chordElement.appendChild(swapRightButton)

					// return
						return chordOuter
				} catch (error) {console.log(error)}
			}

		/* activateChordElement */
			function activateChordElement(chordElement) {
				try {
					// none or wrong --> update
						if (!STATE.playback.currentChordElement || STATE.playback.currentChordElement !== chordElement) {
							// clear current
								if (STATE.playback.currentChordElement) {
									STATE.playback.currentChordElement.removeAttribute("active")
									STATE.playback.currentChordElement.setAttribute("beat", 0)
								}

							// set new
								STATE.playback.currentChordElement = chordElement
								STATE.playback.currentChordElement.setAttribute("active", true)

							// scroll into view
								setTimeout(() => {
									STATE.playback.currentChordElement.scrollIntoView({behavior: "smooth", inline: "center"})
								}, 0)
						}

					// beat indicator
						const beat = Math.floor(STATE.playback.tick / CONSTANTS.ticksPerBeat) % STATE.progression.beatsPerMeasure
						STATE.playback.currentChordElement.setAttribute("beat", beat + 1)				
				} catch (error) {console.log(error)}
			}

/*** layers ***/
	/** html **/
		/* buildLayer */
			function buildLayer(layerInfo) {
				try {
					// outer
						const layerOuter = document.createElement("div")
							layerOuter.className = "layer-block-outer"
							layerOuter.id = "layer-" + layerInfo.id

					// block
						const layerElement = document.createElement("div")
							layerElement.className = "layer-block"
						layerOuter.appendChild(layerElement)

					// volume
						const layerVolumeSpan = document.createElement("span")
							layerVolumeSpan.innerHTML = CONSTANTS.svg.volume
							layerVolumeSpan.className = "layer-volume-symbol"
						layerElement.appendChild(layerVolumeSpan)

						const layerVolumeInput = document.createElement("input")
							layerVolumeInput.className = "layer-volume-input"
							layerVolumeInput.type = "range"
							layerVolumeInput.min = 0
							layerVolumeInput.max = 1
							layerVolumeInput.step = 0.01
							layerVolumeInput.value = layerInfo.volume
							layerVolumeInput.title = "volume"
							layerVolumeInput.addEventListener(TRIGGERS.input, changeLayerVolume)
						layerElement.appendChild(layerVolumeInput)

					// synth
						const layerSynthSelect = AUDIO_J.getInstruments({
							include: ["simple", "default", "custom"],
							grouping: "family",
							format: "select"
						})._select
							layerSynthSelect.className = "layer-synth-select"
							layerSynthSelect.value = layerInfo.synth
							layerSynthSelect.title = "instrument sound"
							layerSynthSelect.addEventListener(TRIGGERS.input, changeLayerSynth)
						layerElement.appendChild(layerSynthSelect)

					// pattern
						const layerPatternSelect = document.createElement("select")
							layerPatternSelect.className = "layer-pattern-select"
							const groups = {}
							for (const pattern in CONSTANTS.patterns) {
								const groupName = CONSTANTS.patterns[pattern].group
								if (!groups[groupName]) {
									const optgroup = document.createElement("optgroup")
										optgroup.label =groupName
									groups[groupName] = optgroup
									layerPatternSelect.appendChild(optgroup)
								}

								const option = document.createElement("option")
									option.innerText = option.value = pattern
								groups[groupName].appendChild(option)
							}
							layerPatternSelect.value = layerInfo.pattern
							layerPatternSelect.title = "how the synth plays each chord"
							layerPatternSelect.addEventListener(TRIGGERS.input, changeLayerPattern)
						layerElement.appendChild(layerPatternSelect)

					// remove
						const layerRemoveButton = document.createElement("button")
							layerRemoveButton.className = "layer-remove"
							layerRemoveButton.innerHTML = CONSTANTS.svg.x
							layerRemoveButton.title = "remove layer"
							layerRemoveButton.addEventListener(TRIGGERS.click, removeLayer)
						layerElement.appendChild(layerRemoveButton)

					// return
						return layerOuter
				} catch (error) {console.log(error)}
			}

	/** musicxml **/
		/* buildMeasureTicks */
			function buildMeasureTicks(measureCount, ticksPerMeasure) {
				try {
					// empty object
						const measureTicks = {}

					// loop through count
						for (let i = 0; i < measureCount; i++) {
							measureTicks[String(i)] = ticksPerMeasure
						}

					// return
						return measureTicks
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

		/* buildPart */
			function buildPart(layer, otherParts) {
				try {
					// midi instrument
						const [midiProgram, instrument] = getInstrumentFromSynth(layer.synth)

					// channel / order
						const usedChannels = []
						for (const p in otherParts) {
							usedChannels.push(otherParts[p].midiChannel)
						}
						usedChannels.sort()
						
						let nextAvailableChannel = CONSTANTS.minimumMidiChannel
						while (usedChannels.includes(nextAvailableChannel)) {
							nextAvailableChannel++
						}
						if (nextAvailableChannel > CONSTANTS.maximumMidiChannel) {
							nextAvailableChannel = CONSTANTS.minimumMidiChannel
						}

					// part object
						const part = {
							partId: layer.id,
							name: instrument,
							instrument: instrument,
							order: nextAvailableChannel,
							midiChannel: nextAvailableChannel,
							midiProgram: midiProgram,
							synth: layer.synth,
							measures: {}
						}

					// return
						return part
				} catch (error) {console.log(error)}
			}

		/* composePart */
			function composeMeasures(progression, pattern) {
				try {
					// empty measures
						const measures = {}

					// loop through count
						for (let chordIndex = 0; chordIndex < progression.measureCount; chordIndex++) {
							measures[String(chordIndex + CONSTANTS.measureOffset)] = composeMeasure(progression, chordIndex, pattern)
						}

					// repeats
						measures["1"].repeat = "forward"
						measures[String(progression.measureCount)].repeat = "backward"

					// key
						measures["1"].key = {
							tonic: progression.tonic,
							mode: progression.mode == "minor" ? "minor" : "major"
						}

					// return
						return measures
				} catch (error) {console.log(error)}
			}

		/* composeMeasure */
			function composeMeasure(progression, chordIndex, pattern) {
				try {
					// empty measure
						const measure = {
							notes: {},
							ticks: progression.ticksPerMeasure
						}

					// chord
						const chord = progression.chords[chordIndex]
						if (!chord || !chord.semitones || !chord.semitones.length) {
							return measure
						}

					// pitches
						let pitches = [...chord.semitones].map(semitone => semitone + progression.semitoneOffset + CONSTANTS.patterns[pattern].offset)

					// stack
						if (CONSTANTS.patterns[pattern].stack) {
							pitches = pitches.map(semitone => semitone +
								(semitone < pitches[0] ? AUDIO_J.constants.semitonesPerOctave : 0)
							)
						}

					// patterns
						// high 8ths
							if (pattern == "high 8ths") {
								for (let tick = 0; tick < progression.ticksPerMeasure; tick += progression.ticksPerSubdivision) {
									measure.notes[String(tick)] = {}
									for (let p in pitches) {
										measure.notes[String(tick)][String(pitches[p])] = progression.ticksPerSubdivision
									}
								}
								return measure
							}

						// waves
							if (pattern == "waves") {
								let pitchIndex = 0
								let direction = 1
								for (let tick = 0; tick < progression.ticksPerMeasure; tick += progression.ticksPerSubdivision) {
									const pitch = pitches[pitchIndex]
									measure.notes[String(tick)] = {
										[String(pitch)]: progression.ticksPerSubdivision,
										[String(pitch + AUDIO_J.constants.semitonesPerOctave)]: progression.ticksPerSubdivision
									}

									if (!pitchIndex) {
										direction = 1
									}
									if (pitchIndex == pitches.length - 1) {
										direction = -1
									}
									pitchIndex += direction
								}
								return measure
							}

						// block chords
							if (pattern == "block chords") {
								measure.notes["0"] = {}
								for (let p in pitches) {
									measure.notes["0"][String(pitches[p])] = progression.ticksPerMeasure
								}
								return measure
							}

						// arpeggio fall
							if (pattern == "arpeggio fall") {
								pitches[0] += AUDIO_J.constants.semitonesPerOctave
								pitches.reverse()
								pitches.unshift(pitches.pop())
								
								for (let beat = 0; beat < progression.beatsPerMeasure; beat++) {
									const tick = beat * CONSTANTS.ticksPerBeat
									const pitch = pitches[beat % pitches.length] + (Math.floor(beat / pitches.length) * -AUDIO_J.constants.semitonesPerOctave)
									measure.notes[String(tick)] = {
										[String(pitch)]: CONSTANTS.ticksPerBeat
									}
								}
								return measure
							}

						// arpeggio rise
							if (pattern == "arpeggio rise") {
								for (let beat = 0; beat < progression.beatsPerMeasure; beat++) {
									const tick = beat * CONSTANTS.ticksPerBeat
									const pitch = pitches[beat % pitches.length] + (Math.floor(beat / pitches.length) * AUDIO_J.constants.semitonesPerOctave)
									measure.notes[String(tick)] = {
										[String(pitch)]: CONSTANTS.ticksPerBeat
									}
								}
								return measure
							}

						// left-right
							if (pattern == "left-right") {
								const root = pitches[0]
								pitches = pitches.slice(1).map(semitone => semitone + AUDIO_J.constants.semitonesPerOctave)

								for (let tick = 0; tick < progression.ticksPerMeasure; tick += progression.ticksPerSubdivision) {
									if (tick % CONSTANTS.ticksPerBeat == 0) {
										measure.notes[String(tick)] = {
											[root]: CONSTANTS.ticksPerBeat
										}	
									}
									else {
										measure.notes[String(tick)] = {}
										for (let p in pitches) {
											measure.notes[String(tick)][String(pitches[p])] = progression.ticksPerSubdivision
										}
									}
								}
								return measure
							}

						// octave bounce
							if (pattern == "octave bounce") {
								const root = pitches[0]
								const octave = pitches[0] + AUDIO_J.constants.semitonesPerOctave

								for (let tick = 0; tick < progression.ticksPerMeasure; tick += progression.ticksPerSubdivision) {
									if (tick % CONSTANTS.ticksPerBeat == 0) {
										measure.notes[String(tick)] = {
											[root]: progression.ticksPerSubdivision
										}	
									}
									else {
										measure.notes[String(tick)] = {
											[octave]: progression.ticksPerSubdivision
										}
									}
								}
								return measure
							}

						// root-fifth
							if (pattern == "root-fifth") {
								for (let beat = 0; beat < progression.beatsPerMeasure; beat++) {
									const tick = beat * CONSTANTS.ticksPerBeat
									const pitch = (beat % 2 == 0) ? pitches[0] : pitches[2] - AUDIO_J.constants.semitonesPerOctave
									measure.notes[String(tick)] = {
										[String(pitch)]: CONSTANTS.ticksPerBeat
									}
								}
								return measure
							}

						// walking bass
							if (pattern == "walking bass") {
								for (let beat = 0; beat < progression.beatsPerMeasure; beat++) {
									const pitch = pitches[beat % pitches.length]
									const tick = beat * CONSTANTS.ticksPerBeat
									measure.notes[String(tick)] = {
										[String(pitch)]: CONSTANTS.ticksPerBeat
									}
								}
								return measure
							}

						// pulse root
							if (pattern == "pulse root") {
								const pitch = pitches[0]
								for (let beat = 0; beat < progression.beatsPerMeasure; beat++) {
									const tick = beat * CONSTANTS.ticksPerBeat
									measure.notes[String(tick)] = {
										[String(pitch)]: CONSTANTS.ticksPerBeat
									}
								}
								return measure
							}

						// downbeat root
							if (pattern == "downbeat root") {
								const pitch = pitches[0]
								measure.notes["0"] = {
									[String(pitch)]: progression.ticksPerMeasure
								}
								return measure
							}

						// pedal tone
							if (pattern == "pedal tone") {
								const pitch = CONSTANTS.patterns["pedal tone"].offset + progression.semitoneOffset
								measure.notes["0"] = {
									[String(pitch)]: progression.ticksPerMeasure
								}
								return measure
							}

					// return
						return measure
				} catch (error) {console.log(error)}
			}

/*** audio ***/
	/** loop **/ 
		/* updateState */
			function updateState() {
				try {
					// all instruments
						if (AUDIO_J.audio) {
							for (let p in STATE.music.parts) {
								soundPart(p, STATE.music.parts[p].measures)
							}
						}

					// next tick
						STATE.playback.tick += 1

					// next measure
						const previousMeasure = STATE.playback.measure
						if (STATE.playback.tick > STATE.progression.ticksPerMeasure) {
							STATE.playback.measure += 1
							STATE.playback.tick = 0
						}

					// loop
						if (STATE.playback.measure >= STATE.progression.measureCount) {
							STATE.playback.measure = 0
						}

					// update display
						ELEMENTS.controls.chords.current.value = STATE.playback.measure + CONSTANTS.measureOffset
						if (STATE.progression.chords[STATE.playback.measure]) {
							activateChordElement(STATE.progression.chords[STATE.playback.measure].element)
						}
				} catch (error) {console.log(error)}
			}

		/* soundPart */
			function soundPart(partId, measures) {
				try {
					// get measure
						if (!measures[STATE.playback.measure + CONSTANTS.measureOffset]) {
							return
						}

					// get ensemble instrument
						const instrument = AUDIO_J.instruments[partId]
						if (!instrument) {
							return
						}

					// get notes
						if (!measures[STATE.playback.measure + CONSTANTS.measureOffset].notes) {
							return
						}
						const notes = measures[STATE.playback.measure + CONSTANTS.measureOffset].notes[STATE.playback.tick] || null
						if (!notes) {
							return
						}
					
					// notes
						for (let n in notes) {
							const frequency = AUDIO_J.getNote(n)[0]
							instrument.press(frequency)
							instrument.lift(frequency, STATE.playback.interval * Math.max(1, (notes[n] - 1)))
						}
				} catch (error) {console.log(error)}
			}
