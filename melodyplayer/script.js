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
			emoji: {
				saxophone: "&#127927;",
				trumpet: "&#127930;",
				violin: "&#127931;",
				guitar: "&#127928;",
				piano: "&#127929;",
				notes: "&#127926;"
			},
			percentage: 100,
			minute: 1000 * 60,
			startingTickOffset: 24 * 4,
			endingTickOffset: 0,
			tickFudgeFactor: 5,
			metronomeMS: 250,
			metronomeHz: AUDIO_J.constants.tuningAHz * 2,
			metronomeInstrument: "boombash",
			metronomeInstrumentVolume: 0.2,
			ensembleInstrumentDefault: "ziplimba",
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
			nameToMidi: {
				"C-1":  0,
				"C♯-1": 1,
				"D♭-1": 1,
				"D-1":  2,
				"D♯-1": 3,
				"E♭-1": 3,
				"E-1":  4,
				"F-1":  5,
				"F♯-1": 6,
				"G♭-1": 6,
				"G-1":  7,
				"G♯-1": 8,
				"A♭-1": 8,
				"A-1":  9,
				"A♯-1": 0,
				"B♭-1":10,
				"B-1": 11,
				"C0":  12,
				"C♯0": 13,
				"D♭0": 13,
				"D0":  14,
				"D♯0": 15,
				"E♭0": 15,
				"E0":  16,
				"F0":  17,
				"F♯0": 18,
				"G♭0": 18,
				"G0":  19,
				"G♯0": 20,
				"A♭0": 20,
				"A0":  21,
				"A♯0": 22,
				"B♭0": 22,
				"B0":  23,
				"C1":  24,
				"C♯1": 25,
				"D♭1": 25,
				"D1":  26,
				"D♯1": 27,
				"E♭1": 27,
				"E1":  28,
				"F1":  29,
				"F♯1": 30,
				"G♭1": 30,
				"G1":  31,
				"G♯1": 32,
				"A♭1": 32,
				"A1":  33,
				"A♯1": 34,
				"B♭1": 34,
				"B1":  35,
				"C2":  36,
				"C♯2": 37,
				"D♭2": 37,
				"D2":  38,
				"D♯2": 39,
				"E♭2": 39,
				"E2":  40,
				"F2":  41,
				"F♯2": 42,
				"G♭2": 42,
				"G2":  43,
				"G♯2": 44,
				"A♭2": 44,
				"A2":  45,
				"A♯2": 46,
				"B♭2": 46,
				"B2":  47,
				"C3":  48,
				"C♯3": 49,
				"D♭3": 49,
				"D3":  50,
				"D♯3": 51,
				"E♭3": 51,
				"E3":  52,
				"F3":  53,
				"F♯3": 54,
				"G♭3": 54,
				"G3":  55,
				"G♯3": 56,
				"A♭3": 56,
				"A3":  57,
				"A♯3": 58,
				"B♭3": 58,
				"B3":  59,
				"C4":  60,
				"C♯4": 61,
				"D♭4": 61,
				"D4":  62,
				"D♯4": 63,
				"E♭4": 63,
				"E4":  64,
				"F4":  65,
				"F♯4": 66,
				"G♭4": 66,
				"G4":  67,
				"G♯4": 68,
				"A♭4": 68,
				"A4":  69,
				"A♯4": 70,
				"B♭4": 70,
				"B4":  71,
				"C5":  72,
				"C♯5": 73,
				"D♭5": 73,
				"D5":  74,
				"D♯5": 75,
				"E♭5": 75,
				"E5":  76,
				"F5":  77,
				"F♯5": 78,
				"G♭5": 78,
				"G5":  79,
				"G♯5": 80,
				"A♭5": 80,
				"A5":  81,
				"A♯5": 82,
				"B♭5": 82,
				"B5":  83,
				"C6":  84,
				"C♯6": 85,
				"D♭6": 85,
				"D6":  86,
				"D♯6": 87,
				"E♭6": 87,
				"E6":  88,
				"F6":  89,
				"F♯6": 90,
				"G♭6": 90,
				"G6":  91,
				"G♯6": 92,
				"A♭6": 92,
				"A6":  93,
				"A♯6": 94,
				"B♭6": 94,
				"B6":  95,
				"C7":  96,
				"C♯7": 97,
				"D♭7": 97,
				"D7":  98,
				"D♯7": 99,
				"E♭7": 99,
				"E7": 100,
				"F7": 101,
				"F♯7":102,
				"G♭7":102,
				"G7": 103,
				"G♯7":104,
				"A♭7":104,
				"A7": 105,
				"A♯7":106,
				"B♭7":106,
				"B7": 107,
				"C8": 108,
				"C♯8":109,
				"D♭8":109,
				"D8": 110,
				"D♯8":111,
				"E♭8":111,
				"E8": 112,
				"F8": 113,
				"F♯8":114,
				"G♭8":114,
				"G8": 115,
				"G♯8":116,
				"A♭8":116,
				"A8": 117,
				"A♯8":118,
				"B♭8":118,
				"B8": 119,
				"C9": 120,
				"C♯9":121,
				"D♭9":121,
				"D9": 122,
				"D♯9":123,
				"E♭9":123,
				"E9": 124,
				"F9": 125,
				"F♯9":126,
				"G♭9":126,
				"G9": 127,
				"G♯9":128,
				"A♭9":128,
				"A9": 129,
				"A♯9":130,
				"B♭9":130,
				"B9": 131,
				"C10":132
			},
			numberToBeat: {
				"1": "whole",
				"2": "half",
				"4": "quarter",
				"8": "eighth",
				"16": "sixteenth"
			},
			beatToTick: {
				"whole": 96,
				"half-dot": 72,
				"half": 48,
				"quarter-dot": 36,
				"quarter": 24,
				"eighth-dot": 18,
				"eighth": 12,
				"sixteenth-dot": 9,
				"sixteenth": 6,
				"16th-dot": 9,
				"16th": 6
			},
			normalModeMidiLow: 48,
			normalModeMidiHigh: 68,
			midiModeMidiLow: 36,
			midiModeMidiHigh: 84,
			instrumentMapping: {
				"percussion": "boombash", // 0
				"acoustic grand piano": "keystone", // 1
				"bright acoustic piano": "keystone", // 2
				"electric grand piano": "keystone", // 3
				"honky-tonk piano": "consona", // 4
				"electric piano 1": "qube", // 5
				"electric piano 2": "glassical", // 6
				"piano": "keystone",
				"harpsichord": "sharpsichord", // 7
				"clavinet": "zipboard", // 8
				"celesta": "bitbottle", // 9
				"glockenspiel": "bellissful", // 10
				"music box": "glassical", // 11
				"vibraphone": "meltmallet", // 12
				"marimba": "mayrimba", // 13
				"xylophone": "nimbusnotes", // 14
				"tubular bells": "bellissful", // 15
				"dulcimer": "sharpsichord", // 16
				"drawbar organ": "soulvation", // 17
				"percussive organ": "pipepad", // 18
				"rock organ": "buzzorgan", // 19
				"church organ": "pipepad", // 20
				"reed organ": "accordienne", // 21
				"organ": "pipepad",
				"accordion": "accordienne", // 22
				"harmonica": "hermanico", // 23
				"tango accordion": "accordienne", // 24
				"acoustic guitar (nylon)": "argit", // 25
				"acoustic guitar (steel)": "randolin", // 26
				"acoustic guitar": "argit",
				"electric guitar (jazz)": "wavecore", // 27
				"electric guitar (clean)": "argit", // 28
				"electric guitar (muted)": "spritzicato", // 29
				"overdriven guitar": "fuzzillade", // 30
				"distortion guitar": "lazerz", // 31
				"guitar harmonics": "chordstrum", // 32
				"electric guitar": "argit",
				"guitar": "argit",
				"acoustic bass": "honeyharp", // 33
				"electric bass (finger)": "jellybanjo", // 34
				"electric bass (pick)": "bowsaw", // 35
				"electic bass": "lowdium",
				"fretless bass": "argit", // 36
				"slap bass 1": "randolin", // 37
				"slap bass 2": "consona", // 38
				"synth bass 1": "lowdium", // 39
				"synth bass 2": "qube", // 40
				"violin": "vyol", // 41
				"viola": "vyol", // 42
				"cello": "swello", // 43
				"contrabass": "swello", // 44
				"tremolo strings": "estrorcha", // 45
				"pizzicato strings": "spritzicato", // 46
				"pizzicato": "spritzicato",
				"orchestral harp": "honeyharp", // 47
				"harp": "honeyharp",
				"timpani": "thumpano", // 48
				"string ensemble 1": "nonsemble", // 49
				"string ensemble 2": "estrorcha", // 50
				"string ensemble": "nonsemble",
				"synth strings 1": "nonsemble", // 51
				"synth strings 2": "estrorcha", // 52
				"synth strings": "estrorcha", // 52
				"strings": "nonsemble",
				"string": "vyol",
				"choir aahs": "rechoirment", // 53
				"chorus": "rechoirment",
				"voice oohs": "voxelle", // 54
				"synth voice": "cantarus", // 55
				"vocals": "voxelle",
				"orchestra hit": "grandom", // 56
				"orchestra": "nonsemble",
				"muted trumpet": "ashbray", // 60
				"trumpet": "trimpot", // 57
				"trombone": "trombus", // 58
				"tuba": "trombus", // 59
				"french horn": "trombus", // 61
				"brass section": "hornithologist", // 62
				"synth brass 1": "hornithologist", // 63
				"synth brass 2": "ashbray", // 64
				"brass": "ashbray",
				"soprano sax": "snacksifolk", // 65
				"soprano saxophone": "snacksifolk",
				"alto sax": "reedles", // 66
				"alto saxophone": "reedles",
				"tenor sax": "snacksifolk", // 67
				"tenor saxophone": "snacksifolk",
				"baritone sax": "bariphone", // 68
				"baritone saxophone": "bariphone",
				"bari sax": "bariphone",
				"bari saxophone": "bariphone",
				"sax": "reedles",
				"saxophone": "reedles",
				"oboe": "tenoir", // 69
				"english horn": "tenoir", // 70
				"bassoon": "reverbassoon", // 71
				"bass clarinet": "tenoir",
				"clarinet": "clarinaut", // 72
				"piccolo": "particcolo", // 73
				"flute": "particcolo", // 74
				"recorder": "mockarina", // 75
				"pan flute": "bitbottle", // 76
				"blown bottle": "bitbottle", // 77
				"bottle": "bitbottle",
				"shakuhachi": "mockarina", // 78
				"whistle": "whissile", // 79
				"ocarina": "mockarina", // 80
				"lead 1 (square)": "square", // 81
				"square": "square",
				"lead 2 (sawtooth)": "sawtooth", // 82
				"sawtooth": "sawtooth",
				"lead 3 (calliope)": "whissile", // 83
				"calliope": "whissile",
				"lead 4 (chiff)": "bowsaw", // 84
				"chiff": "bowsaw",
				"lead 5 (charang)": "lazerz", // 85
				"charang": "lazerz",
				"lead 6 (voice)": "cantarus", // 86
				"voice": "voxelle",
				"lead 7 (fifths)": "chordstrum", // 87
				"fifths": "chordstrum",
				"lead 8 (bass + lead)": "lowdium", // 88
				"bass + lead": "lowdium",
				"bass": "lowdium",
				"lead": "triangle",
				"pad 1 (new age)": "consona", // 89
				"new age": "consona",
				"pad 2 (warm)": "estrorcha", // 90
				"warm": "estrorcha",
				"pad 3 (polysynth)": "ziplimba", // 91
				"polysynth": "ziplimba",
				"pad 4 (choir)": "rechoirment", // 92
				"choir": "rechoirment",
				"pad 5 (bowed)": "bitbottle", // 93
				"bowed": "bitbottle",
				"pad 6 (metallic)": "wavecore", // 94
				"metallic": "wavecore",
				"pad 7 (halo)": "rechoirment", // 95
				"halo": "rechoirment",
				"pad 8 (sweep)": "buzzorgan", // 96
				"sweep": "buzzorgan",
				"synth pad": "theremonster",
				"pad": "sine",
				"fx 1 (rain)": "shimmer", // 97
				"rain": "shimmer",
				"fx 2 (soundtrack)": "theremonster", // 98
				"soundtrack": "theremonster",
				"fx 3 (crystal)": "jangle", // 99
				"crystal": "jangle",
				"fx 4 (atmosphere)": "argit", // 100
				"atmosphere": "argit",
				"fx 5 (brightness)": "wavecore", // 101
				"brightness": "wavecore",
				"fx 6 (goblins)": "darkflute", // 102
				"goblins": "darkflute",
				"fx 7 (echoes)": "underseep", // 103
				"echoes": "underseep",
				"fx 8 (sci-fi)": "warpal", // 104
				"sci-fi": "warpal",
				"fx": "underseep",
				"sitar": "jellybanjo", // 105
				"banjo": "jellybanjo", // 106
				"shamisen": "shamosan", // 107
				"koto": "shamosan", // 108
				"kalimba": "nimbusnotes", // 109
				"bag pipe": "accordienne", // 110
				"bagpipe": "accordienne",
				"bag pipes": "accordienne",
				"bagpipes": "accordienne",
				"fiddle": "vyol", // 111
				"shanai": "snacksifolk", // 112
				"tinkle bell": "bellissful", // 113
				"bells": "bellissful",
				"bell": "bellissful",
				"agogo": "meltmallet", // 114
				"steel drums": "meltmallet", // 115
				"woodblock": "boombash", // 116
				"taiko drum": "ensnarl", // 117
				"taiko": "ensnarl",
				"melodic tom": "thumpano", // 118
				"tom": "ensnarl",
				"synth drum": "thumpano", // 119
				"drum set": "ensnarl",
				"drumset": "ensnarl",
				"drums": "boombash",
				"drum": "boombash",
				"reverse cymbal": "cymbilant", // 120
				"guitar fret noise": "buzzorgan", // 121
				"breath noise": "bitbottle", // 122
				"seashore": "cymbilant", // 123
				"bird tweet": "shring", // 124
				"telephone ring": "telephex", // 125
				"helicopter": "ensnarl", // 126
				"applause": "cymbilant", // 127
				"gunshot": "boombash", // 128
				"ukulele": "honeyharp",
				"mandolin": "randolin",
				"cornet": "ashbray",
				"horns": "hornithologist",
				"horn": "trombus",
				"baritone": "trombus",
				"mellophone": "trombus",
				"euphonium": "trombus",
				"synthesizer": "qube",
				"synth": "qube"
			}
		}

	/* state */
		const STATE = {
			selectedParts: [],
			tempo: CONSTANTS.defaultTempo,
			tempoMultiplier: CONSTANTS.tempoMultiplier.default,
			interval: Math.round(CONSTANTS.minute / CONSTANTS.beatToTick.quarter / (CONSTANTS.defaultTempo * CONSTANTS.tempoMultiplier.default)),
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
					if (AUDIO_J.activeInstrumentId) {
						const parameters = AUDIO_J.getInstrument(AUDIO_J.activeInstrumentId)
						if (parameters) {
							AUDIO_J.instruments[AUDIO_J.activeInstrumentId] = AUDIO_J.buildInstrument(parameters)
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
					AUDIO_J.activeInstrumentId = defaultSynths[Math.floor(Math.random() * defaultSynths.length)]
					ELEMENTS.synths.value = AUDIO_J.activeInstrumentId
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

				// parseXML
					const parser = new DOMParser()
					STATE.xml = parser.parseFromString(file, "text/xml")
					parseXML()
				
				// remove custom options
					const customOptions = Array.from(ELEMENTS.title.querySelectorAll("option[custom]")) || []
					for (let i in customOptions) {
						customOptions[i].remove()
					}
			} catch (error) {console.log(error)}
		}

	/* changeMainSynth */
		ELEMENTS.synths.addEventListener(TRIGGERS.change, changeMainSynth)
		function changeMainSynth() {
			try {
				// kill existing notes
					if (AUDIO_J.instruments[AUDIO_J.activeInstrumentId]) {
						AUDIO_J.instruments[AUDIO_J.activeInstrumentId].setParameters({ power: 0 })
					}

				// get new synth
					const name = ELEMENTS.synths.value.trim()

					if (AUDIO_J.instruments[name]) {
						AUDIO_J.activeInstrumentId = name
						AUDIO_J.instruments[AUDIO_J.activeInstrumentId].setParameters({ power: 1 })
					}
					else {
						const parameters = AUDIO_J.getInstrument(name)
						if (parameters) {
							AUDIO_J.activeInstrumentId = name
							AUDIO_J.instruments[AUDIO_J.activeInstrumentId] = AUDIO_J.buildInstrument(parameters)
						}
					}

				// blur
					ELEMENTS.synths.blur()
			} catch (error) {console.log(error)}
		}

	/* togglePart */
		function togglePart(event) {
			try {
				// get part
					const checkbox = event.target
					const row = checkbox.closest(".part-row")
					const partAndStaff = row.id.split("-")[1]

				// update state
					if (checkbox.checked) {
						if (!STATE.selectedParts.includes(partAndStaff)) {
							STATE.selectedParts.push(partAndStaff)
						}
						STATE.sheets[partAndStaff].setAttribute("active", true)
					}
					else {
						STATE.sheets[partAndStaff].removeAttribute("active")
						STATE.selectedParts.splice(STATE.selectedParts.indexOf(partAndStaff), 1)
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

				// update all staffs
					const allRows = Array.from(ELEMENTS.partsMenu.querySelectorAll(".part-row"))
					for (let i in allRows) {
						if (allRows[i].id.includes("part-" + partId + ".")) {
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
					STATE.interval = Math.round(CONSTANTS.minute / CONSTANTS.beatToTick.quarter / (STATE.tempo * STATE.tempoMultiplier))
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
									STATE.xml = parser.parseFromString(event.target.result, "text/xml")
									parseXML()
							} catch (error) {console.log(error)}
							ELEMENTS.upload.value = null
						}
			} catch (error) {console.log(error)}
		}

	/* parseXML */
		function parseXML() {
			try {
				// clear out
					STATE.music = {}
					STATE.currentMeasure = 0
					STATE.currentTickOfMeasure = 0
					STATE.currentOverallTick = -CONSTANTS.startingTickOffset

				// title
					STATE.music.title = (STATE.xml.querySelector("movement-title") || {}).innerHTML || ""
					STATE.music.composer = (STATE.xml.querySelector("creator") || {}).innerHTML || ""

				// clear score
					STATE.score = 0
					ELEMENTS.score.innerHTML = ""

				// parts
					STATE.music.parts = {}
					const parts = Array.from(STATE.xml.querySelectorAll("part"))

				// loop through XML
					for (let p in parts) {
						parseXMLPart(parts[p])
					}

				// clean up
					delete STATE.xml

				// ticks, swing, tempo
					STATE.music.totalTicks = 0
					STATE.music.measureTicks = {}
					STATE.music.swing = false
					STATE.music.tempoChanges = {}
					for (let p in STATE.music.parts) {
						if (STATE.music.parts[p].totalTicks > STATE.music.totalTicks) {
							STATE.music.totalTicks = STATE.music.parts[p].totalTicks
						}
						if (STATE.music.parts[p].swing) {
							STATE.music.swing = true
						}

						for (let m in STATE.music.parts[p].staves['1']) {
							if (!STATE.music.measureTicks[m]) {
								STATE.music.measureTicks[m] = STATE.music.parts[p].staves['1'][m].ticks
							}
							if (STATE.music.parts[p].staves['1'][m].tempo) {
								STATE.music.tempoChanges[m] = STATE.music.parts[p].staves['1'][m].tempo
							}
						}
					}

				// parts list
					buildPartsList()

				// blocks
					buildBlockboard()

				// add to tracks list
					const selectValue = STATE.music.title + (STATE.music.composer ? (" (" + STATE.music.composer + ")") : "")
					if (!ELEMENTS.title.querySelector("option[value='" + selectValue + "']")) {
						const option = document.createElement("option")
							option.setAttribute("custom", true)
							option.value = option.innerText = selectValue
						ELEMENTS.title.appendChild(option)
					}
					ELEMENTS.title.value = selectValue
					ELEMENTS.scoreboard.removeAttribute("pending")
			} catch (error) {console.log(error)}
		}

	/* parseXMLPart */
		function parseXMLPart(xmlPart) {
			try {
				// add to list
					const id = xmlPart.getAttribute("id")
					const part = {}
					STATE.music.parts[id] = part
				
				// part info
					const xmlInstrument = STATE.xml.querySelector("score-part#" + id)
					if (xmlInstrument) {
						part.name = (xmlInstrument.querySelector("part-name") || {}).innerHTML || ""
						part.instrument = (xmlInstrument.querySelector("instrument-sound") || xmlInstrument.querySelector("virtual-name") || xmlInstrument.querySelector("instrument-name") || {}).innerHTML || ""
						part.midiChannel = Number((xmlInstrument.querySelector("midi-channel") || {}).innerHTML || 0)
						part.midiProgram = Number((xmlInstrument.querySelector("midi-program") || {}).innerHTML || 0)
						part.staves = {}
						part.currentTicksPerMeasure = 0
						part.currentTies = {}
					}

				// measures
					const xmlMeasures = Array.from(xmlPart.querySelectorAll("part#" + id + " > measure"))
					part.staves["1"] = {}

				// loop through measures
					for (let m in xmlMeasures) {
						parseXMLMeasure(part, String(Number(m) + 1), xmlMeasures[m])
					}

				// first measure
					part.swing = false
					if (xmlMeasures[0] && !xmlMeasures[0].querySelector("sound swing straight") && xmlMeasures[0].querySelector("sound swing")) {
						part.swing = true
					}

				// delete temporary attributes
					delete part.currentTicksPerMeasure
					delete part.currentTies

				// add up ticks
					part.totalTicks = 0
					for (let m in part.staves["1"]) {
						part.totalTicks += (part.staves["1"][m].ticks || 0)
					}
			} catch (error) {console.log(error)}
		}

	/* parseXMLMeasure */
		function parseXMLMeasure(part, measureNumber, xmlMeasure) {
			try {
				// reset ticks & staff
					let currentTicks = {}

				// loop through notes
					const xmlNotes = Array.from(xmlMeasure.querySelectorAll("measure > note")) || []
					for (let n in xmlNotes) {
						// note
							const xmlNote = xmlNotes[n]

						// staff
							const currentStaff = xmlNote.querySelector("staff") ? String(xmlNote.querySelector("staff").innerHTML) : "1"
							if (!part.staves[currentStaff]) {
								part.staves[currentStaff] = {}
							}
							if (!part.staves[currentStaff][measureNumber]) {
								part.staves[currentStaff][measureNumber] = {}
							}
							if (!currentTicks[currentStaff]) {
								currentTicks[currentStaff] = 0
							}

						// rest measure?
							if (xmlNote.querySelector("rest[measure='yes']")) {
								continue
							}

						// duration
							const noteType = (xmlNote.querySelector("type") || {}).innerHTML + (xmlNote.querySelector("dot") ? "-dot" : "") || ""
							if (!noteType) { continue }
							const duration = Math.round(CONSTANTS.beatToTick[noteType] * (xmlNote.querySelector("time-modification") ? Number(xmlNote.querySelector("normal-notes").innerHTML) / Number(xmlNote.querySelector("actual-notes").innerHTML) : 1))
							if (!duration) { continue }

						// rest
							if (xmlNote.querySelector("rest")) {
								currentTicks[currentStaff] += duration
								continue
							}

						// pitch (midi)
							const noteName = (xmlNote.querySelector("pitch step") || xmlNote.querySelector("unpitched display-step") || {}).innerHTML
							const alter = Number((xmlNote.querySelector("pitch alter") || {}).innerHTML) || 0
							const accidental = (alter == -1) ? "♭" : (alter == 1) ? "♯" : ""
							const octave = (xmlNote.querySelector("pitch octave") || xmlNote.querySelector("unpitched display-octave") || {}).innerHTML
							const midi = CONSTANTS.nameToMidi[noteName + accidental + octave] || null
							if (!midi) {
								currentTicks[currentStaff] += duration
								continue
							}

						// chord
							let chord = false
							if (xmlNote.querySelector("chord")) {
								chord = true
								currentTicks[currentStaff] -= duration
							}

						// tie?
							let heldOver = false
							if (xmlNote.querySelector("tie[type='stop']") && part.currentTies[midi]) {
								const tieStart = String(part.currentTies[midi]).split(".")
								const tieStartMeasure = tieStart[0]
								const tieStartTick = tieStart[1]

								// update existing note's duration
									if (part.staves[currentStaff][tieStartMeasure] &&
										part.staves[currentStaff][tieStartMeasure].notes[tieStartTick] &&
										part.staves[currentStaff][tieStartMeasure].notes[tieStartTick][String(midi)]) {
										part.staves[currentStaff][tieStartMeasure].notes[tieStartTick][String(midi)] += duration
										heldOver = true
									}
								
								// end of that tie?
									if (!xmlNote.querySelector("tie[type='start']")) {
										delete part.currentTies[midi]
									}
							}
							else if (xmlNote.querySelector("tie[type='start']") && !part.currentTies[midi]) {
								part.currentTies[midi] = measureNumber + "." + String(currentTicks[currentStaff])
							}

						// chord?
							if (!heldOver && chord && 
								part.staves[currentStaff][measureNumber].notes &&
								part.staves[currentStaff][measureNumber].notes[String(currentTicks[currentStaff])]) {
								part.staves[currentStaff][measureNumber].notes[String(currentTicks[currentStaff])][String(midi)] = duration
							}

						// new note
							else if (!heldOver) {
								if (!part.staves[currentStaff][measureNumber].notes) {
									part.staves[currentStaff][measureNumber].notes = {}
								}
								if (!part.staves[currentStaff][measureNumber].notes[String(currentTicks[currentStaff])]) {
									part.staves[currentStaff][measureNumber].notes[String(currentTicks[currentStaff])] = {}
								}
								part.staves[currentStaff][measureNumber].notes[String(currentTicks[currentStaff])][String(midi)] = duration
							}

						// increment currentTicks
							currentTicks[currentStaff] += duration
					}

				// dynamic change
					const dynamicDirections = Array.from(xmlMeasure.querySelectorAll("sound[dynamics]")) || []
					const dynamicChange = dynamicDirections.length ? Number(dynamicDirections[dynamicDirections.length - 1].getAttribute("dynamics")) / CONSTANTS.percentage || 0 : null

				// tempo change
					const tempoDirection = xmlMeasure.querySelector("sound[tempo]") || null
					const tempoChange = tempoDirection ? Number(tempoDirection.getAttribute("tempo")) || 0 : null

				// time signature change?
					const xmlAttributes = xmlMeasure.querySelector("attributes") || null
					if (xmlAttributes && xmlAttributes.querySelector("beat-type") && xmlAttributes.querySelector("beats")) {
						const currentBeatType = String(xmlAttributes.querySelector("beat-type").innerHTML)
						const currentBeatsPerMeasure = Number(xmlAttributes.querySelector("beats").innerHTML)
						part.currentTicksPerMeasure = CONSTANTS.beatToTick[CONSTANTS.numberToBeat[currentBeatType]] * currentBeatsPerMeasure
					}

					for (let staff in part.staves) {
						if (!part.staves[staff][measureNumber]) {
							part.staves[staff][measureNumber] = {}
						}
						part.staves[staff][measureNumber].ticks = part.currentTicksPerMeasure

						if (tempoChange) {
							part.staves[staff][measureNumber].tempo = tempoChange
						}
						if (dynamicChange) {
							part.staves[staff][measureNumber].dynamics = dynamicChange
						}
					}
			} catch (error) {console.log(error)}
		}

	/* buildPartsList */
		function buildPartsList() {
			try {
				// clear out
					ELEMENTS.partsMenu.innerHTML = ""
					STATE.selectedParts = []

				// loop through parts
					for (let i in STATE.music.parts) {
						// create synth
							const synthName = mapInstrument(STATE.music.parts[i].name)
							STATE.music.parts[i].synth = synthName

							AUDIO_J.instruments["_ensemble_" + i] = AUDIO_J.buildInstrument(AUDIO_J.getInstrument(synthName))
							AUDIO_J.instruments["_ensemble_" + i].setParameters({ volume: CONSTANTS.ensembleInstrumentVolume })

						// loop through staves to build row
							for (let j in STATE.music.parts[i].staves) {
								const row = document.createElement("div")
									row.className = "part-row"
									row.id = "part-" + i + "." + j
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
											span.innerText = STATE.music.parts[i].name + " " + j
										label.appendChild(span)

									const select = document.createElement("select")
										select.className = "part-synth"
										select.innerHTML = ""
										AUDIO_J.getInstruments({include: ["simple", "default", "custom"], grouping: "family", format: "select", select: select})
										select.value = synthName
										select.addEventListener(TRIGGERS.change, changeSynthForPart)
									row.appendChild(select)
							}
					}
			} catch (error) {console.log(error)}
		}

	/* mapInstrument */
		function mapInstrument(name) {
			try {
				// find in list
					name = name.trim().toLowerCase()
					for (let i in CONSTANTS.instrumentMapping) {
						if (name.includes(i)) {
							return CONSTANTS.instrumentMapping[i]
						}
					}

				// default
					return CONSTANTS.ensembleInstrumentDefault
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
						if (AUDIO_J.instruments[AUDIO_J.activeInstrumentId]) {
							AUDIO_J.instruments[AUDIO_J.activeInstrumentId].press(AUDIO_J.getNote(midi)[0])
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
								if (AUDIO_J.instruments[AUDIO_J.activeInstrumentId]) {
									AUDIO_J.instruments[AUDIO_J.activeInstrumentId].lift(AUDIO_J.getNote(n)[0])
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
						if (AUDIO_J.instruments[AUDIO_J.activeInstrumentId]) {
							AUDIO_J.instruments[AUDIO_J.activeInstrumentId].press(AUDIO_J.getNote(midi)[0])
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
						if (AUDIO_J.instruments[AUDIO_J.activeInstrumentId]) {
							AUDIO_J.instruments[AUDIO_J.activeInstrumentId].lift(AUDIO_J.getNote(midi)[0])
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
					STATE.interval = Math.round(CONSTANTS.minute / CONSTANTS.beatToTick.quarter / (STATE.tempo * STATE.tempoMultiplier))

				// loop through all parts
					for (let i in STATE.music.parts) {
						for (let j in STATE.music.parts[i].staves) {
							// sheet
								const sheet = document.createElement("div")
									sheet.id = "sheet-" + i + "." + j
									sheet.className = "blockboard-sheet"
								ELEMENTS.blockboard.appendChild(sheet)
								STATE.sheets[i + "." + j] = sheet

								if (STATE.selectedParts.includes(i + "." + j)) {
									sheet.setAttribute("active", true)
								}

							// measures
								const measures = STATE.music.parts[i].staves[j]
								let currentOverallTick = 0
								for (let m in measures) {
									currentOverallTick = buildMeasure(i, j, sheet, Number(currentOverallTick), measures[m])
								}
						}
					}
			} catch (error) {console.log(error)}
		}

	/* buildMeasure */
		function buildMeasure(partId, staff, sheetElement, currentOverallTick, measure) {
			try {
				// loop through notes
					for (let i in measure.notes) {
						const measureOffsetTicks = Number(i)
						for (let j in measure.notes[i]) {
							// starting point
								const durationTicks = measure.notes[i][j]
								const offsetTicks = currentOverallTick + measureOffsetTicks

							// adjusted midis
								const midi = Number(j)

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
									partAndStaff: partId + "." + staff,
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
						for (let s in STATE.music.parts[p].staves) {
							soundEnsembleInstrument(p, s, STATE.music.parts[p].staves[s])
						}
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
					if (STATE.currentTickOfMeasure % CONSTANTS.beatToTick.quarter !== 0) {
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
		function soundEnsembleInstrument(partId, staff, part) {
			try {
				// get measure
					if (!part[STATE.currentMeasure]) {
						return
					}

				// get ensemble instrument
					const instrument = AUDIO_J.instruments["_ensemble_" + partId]
					if (!instrument) {
						return
					}

				// dynamics
					if (!STATE.currentTickOfMeasure && part[STATE.currentMeasure].dynamics) {
						instrument.setParameters({ volume: part[STATE.currentMeasure].dynamics * CONSTANTS.ensembleInstrumentVolume })
					}

				// get notes
					if (!part[STATE.currentMeasure].notes) {
						return
					}
					const notes = part[STATE.currentMeasure].notes[STATE.currentTickOfMeasure] || null
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
						const currentTickOfBeat = STATE.currentTickOfMeasure % CONSTANTS.beatToTick.quarter
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
					else if (STATE.currentOverallTick >= STATE.music.totalTicks + CONSTANTS.endingTickOffset) {
						return {end: true}
					}

				// during the blocks
					else {
						if (STATE.currentTickOfMeasure >= STATE.music.measureTicks[STATE.currentMeasure]) {
							STATE.currentTickOfMeasure = 0
							STATE.currentMeasure++

							if (STATE.music.tempoChanges[String(STATE.currentMeasure)]) {
								STATE.tempo = STATE.music.tempoChanges[String(STATE.currentMeasure)]
								STATE.interval = Math.round(CONSTANTS.minute / CONSTANTS.beatToTick.quarter / (STATE.tempo * STATE.tempoMultiplier))

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
					if (!STATE.selectedParts.includes(block.partAndStaff)) {
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
					ELEMENTS.score.innerHTML = STATE.score + " <span>" + CONSTANTS.emoji.notes + "</span>"
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
						return STATE.selectedParts.includes(block.partAndStaff)
					}) || []).length
					ELEMENTS.blockboardScore.innerHTML = STATE.score + "/" + totalPossibleScore + " " + CONSTANTS.emoji.notes

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
