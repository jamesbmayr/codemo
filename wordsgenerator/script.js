window.onload = function() {
	/*** constants ***/
		/* ELEMENTS */
			var ELEMENTS = {
				words: document.getElementById("words"),
				error: document.getElementById("error"),
				generateForm: document.getElementById("generate-form"),
				randomizeForm: document.getElementById("randomize-form"),
				numberOfWords: document.getElementById("number-of-words"),
				syllableCounts: document.getElementById("syllable-counts"),
				syllableTypes: document.getElementById("syllable-types"),
				categories: document.getElementById("categories")
			}

		/* CONSTANTS */
			var CONSTANTS = {
				defaultNumberOfWords: 10,
				defaultSyllableCount: 3,
				defaultSyllableTypes: [0, 1, 2],
				defaultCategories: ["simple vowel", "complex vowel", "r-controlled vowel", "simple consonant", "digraph", "blend"],
				defaultSyllableMaximum: 5
			}

		/* SYLLABLE_TYPES */
			var SYLLABLE_TYPES = [
				["vowelGroup", "endingConsonantGroup"],
				["startingConsonantGroup", "vowelGroup", "endingConsonantGroup"],
				["startingConsonantGroup", "vowelGroup"],
				["vowelGroup", "endingConsonantGroupWithE"],
				["startingConsonantGroup", "vowelGroup", "endingConsonantGroupWithE"]
			]

		/* CATEGORIES */
			var CATEGORIES = [
				"simple vowel",
				"complex vowel",
				"r-controlled vowel",
				"simple consonant",
				"digraph",
				"doubles",
				"suffix s",
				"consonant-e",
				"consonant-e suffix s",
				"blend",
				"blend suffix s",
				"complex blend",
				"nasal blend",
				"silent letters",
				"le syllable"
			]

		/* LETTER_GROUPS */
			var LETTER_GROUPS = {
				"a": {
					text: "a",
					categories: ["simple vowel"],
					letterGroupTypes: ["vowelGroup"],
					weight: 5,
				},
				"ai": {
					text: "ai",
					categories: ["complex vowel"],
					letterGroupTypes: ["vowelGroup"],
					weight: 2,
				},
				"ar": {
					text: "ar",
					categories: ["r-controlled vowel"],
					letterGroupTypes: ["vowelGroup"],
					weight: 3,
				},
				"au": {
					text: "au",
					categories: ["complex vowel"],
					letterGroupTypes: ["vowelGroup"],
					weight: 1,
				},
				"aw": {
					text: "aw",
					categories: ["complex vowel"],
					letterGroupTypes: ["vowelGroup"],
					weight: 1,
				},
				"ay": {
					text: "ay",
					categories: ["complex vowel"],
					letterGroupTypes: ["vowelGroup"],
					weight: 1,
				},
				"b": {
					text: "b",
					categories: ["simple consonant"],
					letterGroupTypes: ["startingConsonantGroup", "endingConsonantGroup"],
					weight: 5,
				},
				"be": {
					text: "be",
					categories: ["consonant-e"],
					letterGroupTypes: ["endingConsonantGroupWithE"],
					weight: 1,
				},
				"bes": {
					text: "bes",
					categories: ["consonant-e suffix s"],
					letterGroupTypes: ["endingConsonantGroupWithE"],
					plural: true,
					weight: 1,
				},
				"bl": {
					text: "bl",
					categories: ["blend"],
					letterGroupTypes: ["startingConsonantGroup"],
					weight: 2,
				},
				"ble": {
					text: "ble",
					categories: ["le syllable"],
					letterGroupTypes: ["endingConsonantGroupWithE"],
					increaseSyllableCount: 1,
					weight: 1,
				},
				"bles": {
					text: "bles",
					categories: ["le syllable"],
					letterGroupTypes: ["endingConsonantGroupWithE"],
					plural: true,
					increaseSyllableCount: 1,
					weight: 1,
				},
				"br": {
					text: "br",
					categories: ["blend"],
					letterGroupTypes: ["startingConsonantGroup"],
					weight: 2,
				},
				"bs": {
					text: "bs",
					categories: ["suffix s"],
					letterGroupTypes: ["endingConsonantGroup"],
					plural: true,
					weight: 2,
				},
				"c": {
					text: "c",
					categories: ["simple consonant"],
					letterGroupTypes: ["startingConsonantGroup"],
					mustBeFollowedBy: ["a", "o", "u"],
					weight: 3,
				},
				"ce": {
					text: "ce",
					categories: ["consonant-e"],
					letterGroupTypes: ["endingConsonantGroupWithE"],
					weight: 1,
				},
				"ces": {
					text: "ces",
					categories: ["consonant-e suffix s"],
					letterGroupTypes: ["endingConsonantGroupWithE"],
					plural: true,
					increaseSyllableCount: 1,
					weight: 1,
				},
				"ch": {
					text: "ch",
					categories: ["digraph"],
					letterGroupTypes: ["startingConsonantGroup"],
					weight: 3,
				},
				"ck": {
					text: "ck",
					categories: ["digraph"],
					letterGroupTypes: ["endingConsonantGroup"],
					weight: 3,
				},
				"ckle": {
					text: "ckle",
					categories: ["le syllable"],
					letterGroupTypes: ["endingConsonantGroupWithE"],
					increaseSyllableCount: 1,
					weight: 1,
				},
				"ckles": {
					text: "ckles",
					categories: ["le syllable"],
					letterGroupTypes: ["endingConsonantGroupWithE"],
					plural: true,
					increaseSyllableCount: 1,
					weight: 1,
				},
				"cks": {
					text: "cks",
					categories: ["suffix s"],
					letterGroupTypes: ["endingConsonantGroup"],
					plural: true,
					weight: 2,
				},
				"cl": {
					text: "cl",
					categories: ["blend"],
					letterGroupTypes: ["startingConsonantGroup"],
					weight: 2,
				},
				"cle": {
					text: "cle",
					categories: ["le syllable"],
					letterGroupTypes: ["endingConsonantGroupWithE"],
					increaseSyllableCount: 1,
					weight: 1,
				},
				"cles": {
					text: "cles",
					categories: ["le syllable"],
					letterGroupTypes: ["endingConsonantGroupWithE"],
					plural: true,
					increaseSyllableCount: 1,
					weight: 1,
				},
				"cr": {
					text: "cr",
					categories: ["blend"],
					letterGroupTypes: ["startingConsonantGroup"],
					weight: 2,
				},
				"ct": {
					text: "ct",
					categories: ["blend"],
					letterGroupTypes: ["endingConsonantGroup"],
					weight: 2,
				},
				"cts": {
					text: "cts",
					categories: ["blend suffix s"],
					letterGroupTypes: ["endingConsonantGroup"],
					plural: true,
					weight: 1,
				},
				"d": {
					text: "d",
					categories: ["simple consonant"],
					letterGroupTypes: ["startingConsonantGroup", "endingConsonantGroup"],
					weight: 5,
				},
				"de": {
					text: "de",
					categories: ["consonant-e"],
					letterGroupTypes: ["endingConsonantGroupWithE"],
					weight: 1,
				},
				"dle": {
					text: "dle",
					categories: ["le syllable"],
					letterGroupTypes: ["endingConsonantGroupWithE"],
					increaseSyllableCount: 1,
					weight: 1,
				},
				"dles": {
					text: "dles",
					categories: ["le syllable"],
					letterGroupTypes: ["endingConsonantGroupWithE"],
					plural: true,
					increaseSyllableCount: 1,
					weight: 1,
				},
				"des": {
					text: "des",
					categories: ["consonant-e suffix s"],
					letterGroupTypes: ["endingConsonantGroupWithE"],
					plural: true,
					weight: 1,
				},
				"dge": {
					text: "dge",
					categories: ["complex blend"],
					letterGroupTypes: ["endingConsonantGroup"],
					weight: 1,
				},
				"dges": {
					text: "dges",
					categories: ["complex blend"],
					letterGroupTypes: ["endingConsonantGroup"],
					increaseSyllableCount: 1,
					weight: 1,
				},
				"dr": {
					text: "dr",
					categories: ["blend"],
					letterGroupTypes: ["startingConsonantGroup"],
					weight: 2,
				},
				"ds": {
					text: "ds",
					categories: ["suffix s"],
					letterGroupTypes: ["endingConsonantGroup"],
					plural: true,
					weight: 2,
				},
				"dw": {
					text: "dw",
					categories: ["blend"],
					letterGroupTypes: ["startingConsonantGroup"],
					weight: 1,
				},
				"e": {
					text: "e",
					categories: ["simple vowel"],
					letterGroupTypes: ["vowelGroup"],
					weight: 5,
				},
				"ea": {
					text: "ea",
					categories: ["complex vowel"],
					letterGroupTypes: ["vowelGroup"],
					weight: 3,
				},
				"eau": {
					text: "eau",
					categories: ["complex vowel"],
					letterGroupTypes: ["vowelGroup"],
					weight: 1,
				},
				"ee": {
					text: "ee",
					categories: ["complex vowel"],
					letterGroupTypes: ["vowelGroup"],
					weight: 3,
				},
				"er": {
					text: "er",
					categories: ["r-controlled vowel"],
					letterGroupTypes: ["vowelGroup"],
					weight: 3,
				},
				"ey": {
					text: "ey",
					categories: ["complex vowel"],
					letterGroupTypes: ["vowelGroup"],
					weight: 1,
				},
				"f": {
					text: "f",
					categories: ["simple consonant"],
					letterGroupTypes: ["startingConsonantGroup"],
					weight: 3,
				},
				"fe": {
					text: "fe",
					categories: ["consonant-e"],
					letterGroupTypes: ["endingConsonantGroupWithE"],
					weight: 1,
				},
				"ff": {
					text: "ff",
					categories: ["doubles"],
					letterGroupTypes: ["endingConsonantGroup"],
					weight: 1,
				},
				"ffs": {
					text: "ffs",
					categories: ["suffix s"],
					letterGroupTypes: ["endingConsonantGroup"],
					plural: true,
					weight: 1,
				},
				"fl": {
					text: "fl",
					categories: ["blend"],
					letterGroupTypes: ["startingConsonantGroup"],
					weight: 2,
				},
				"fle": {
					text: "fle",
					categories: ["le syllable"],
					letterGroupTypes: ["endingConsonantGroupWithE"],
					increaseSyllableCount: 1,
					weight: 1,
				},
				"fles": {
					text: "fles",
					categories: ["le syllable"],
					letterGroupTypes: ["endingConsonantGroupWithE"],
					plural: true,
					increaseSyllableCount: 1,
					weight: 1,
				},
				"fr": {
					text: "fr",
					categories: ["blend"],
					letterGroupTypes: ["startingConsonantGroup"],
					weight: 2,
				},
				"ft": {
					text: "ft",
					categories: ["blend"],
					letterGroupTypes: ["endingConsonantGroup"],
					weight: 1,
				},
				"g": {
					text: "g",
					categories: ["simple consonant"],
					letterGroupTypes: ["startingConsonantGroup", "endingConsonantGroup"],
					weight: 3,
				},
				"ge": {
					text: "ge",
					categories: ["consonant-e"],
					letterGroupTypes: ["endingConsonantGroupWithE"],
					weight: 1,
				},
				"ges": {
					text: "ges",
					categories: ["consonant-e suffix s"],
					letterGroupTypes: ["endingConsonantGroupWithE"],
					plural: true,
					increaseSyllableCount: 1,
					weight: 1,
				},
				"gh": {
					text: "gh",
					categories: ["silent letters"],
					letterGroupTypes: ["startingConsonantGroup"],
					weight: 1,
				},
				"gl": {
					text: "gl",
					categories: ["blend"],
					letterGroupTypes: ["startingConsonantGroup"],
					weight: 2,
				},
				"gle": {
					text: "gle",
					categories: ["le syllable"],
					letterGroupTypes: ["endingConsonantGroupWithE"],
					increaseSyllableCount: 1,
					weight: 1,
				},
				"gles": {
					text: "gles",
					categories: ["le syllable"],
					letterGroupTypes: ["endingConsonantGroupWithE"],
					plural: true,
					increaseSyllableCount: 1,
					weight: 1,
				},
				"gn": {
					text: "gn",
					categories: ["silent letters"],
					letterGroupTypes: ["startingConsonantGroup"],
					weight: 1,
				},
				"gr": {
					text: "gr",
					categories: ["blend"],
					letterGroupTypes: ["startingConsonantGroup"],
					weight: 2,
				},
				"gs": {
					text: "gs",
					categories: ["suffix s"],
					letterGroupTypes: ["endingConsonantGroup"],
					plural: true,
					weight: 2,
				},
				"h": {
					text: "h",
					categories: ["simple consonant"],
					letterGroupTypes: ["startingConsonantGroup"],
					weight: 2,
				},
				"i": {
					text: "i",
					categories: ["simple vowel"],
					letterGroupTypes: ["vowelGroup"],
					weight: 5,
				},
				"ie": {
					text: "ie",
					categories: ["complex vowel"],
					letterGroupTypes: ["vowelGroup"],
					weight: 2,
				},
				"igh": {
					text: "igh",
					categories: ["complex vowel"],
					letterGroupTypes: ["vowelGroup"],
					weight: 1,
				},
				"ir": {
					text: "ir",
					categories: ["r-controlled vowel"],
					letterGroupTypes: ["vowelGroup"],
					weight: 2,
				},
				"j": {
					text: "j",
					categories: ["simple consonant"],
					letterGroupTypes: ["startingConsonantGroup"],
					weight: 1,
				},
				"k": {
					text: "k",
					categories: ["simple consonant"],
					letterGroupTypes: ["startingConsonantGroup"],
					mustBeFollowedBy: ["i", "e"],
					weight: 3,
				},
				"ke": {
					text: "ke",
					categories: ["consonant-e"],
					letterGroupTypes: ["endingConsonantGroupWithE"],
					weight: 1,
				},
				"kes": {
					text: "kes",
					categories: ["consonant-e suffix s"],
					letterGroupTypes: ["endingConsonantGroupWithE"],
					plural: true,
					weight: 1,
				},
				"kn": {
					text: "kn",
					categories: ["silent letters"],
					letterGroupTypes: ["startingConsonantGroup"],
					weight: 1,
				},
				"l": {
					text: "l",
					categories: ["simple consonant"],
					letterGroupTypes: ["startingConsonantGroup"],
					weight: 5,
				},
				"lb": {
					text: "lb",
					categories: ["blend"],
					letterGroupTypes: ["endingConsonantGroup"],
					weight: 1,
				},
				"lbs": {
					text: "lbs",
					categories: ["blend suffix s"],
					letterGroupTypes: ["endingConsonantGroup"],
					plural: true,
					weight: 1,
				},
				"lch": {
					text: "lch",
					categories: ["blend"],
					letterGroupTypes: ["endingConsonantGroup"],
					weight: 1,
				},
				"lches": {
					text: "lches",
					categories: ["blend suffix s"],
					letterGroupTypes: ["endingConsonantGroup"],
					plural: true,
					increaseSyllableCount: 1,
					weight: 1,
				},
				"ld": {
					text: "ld",
					categories: ["blend"],
					letterGroupTypes: ["endingConsonantGroup"],
					weight: 1,
				},
				"lds": {
					text: "lds",
					categories: ["blend suffix s"],
					letterGroupTypes: ["endingConsonantGroup"],
					plural: true,
					weight: 1,
				},
				"le": {
					text: "le",
					categories: ["le syllable"],
					letterGroupTypes: ["endingConsonantGroupWithE"],
					increaseSyllableCount: 1,
					weight: 1,
				},
				"les": {
					text: "les",
					categories: ["le syllable"],
					letterGroupTypes: ["endingConsonantGroupWithE"],
					increaseSyllableCount: 1,
					plural: true,
					weight: 1,
				},
				"lf": {
					text: "lf",
					categories: ["blend"],
					letterGroupTypes: ["endingConsonantGroup"],
					weight: 1,
				},
				"lfs": {
					text: "lfs",
					categories: ["blend suffix s"],
					letterGroupTypes: ["endingConsonantGroup"],
					plural: true,
					weight: 1,
				},
				"lk": {
					text: "lk",
					categories: ["blend"],
					letterGroupTypes: ["endingConsonantGroup"],
					weight: 2,
				},
				"lks": {
					text: "lks",
					categories: ["blend suffix s"],
					letterGroupTypes: ["endingConsonantGroup"],
					plural: true,
					weight: 1,
				},
				"ll": {
					text: "ll",
					categories: ["doubles"],
					letterGroupTypes: ["endingConsonantGroup"],
					weight: 2,
				},
				"lls": {
					text: "lls",
					categories: ["suffix s"],
					letterGroupTypes: ["endingConsonantGroup"],
					plural: true,
					weight: 2,
				},
				"lm": {
					text: "lm",
					categories: ["blend"],
					letterGroupTypes: ["endingConsonantGroup"],
					weight: 1,
				},
				"lms": {
					text: "lms",
					categories: ["blend suffix s"],
					letterGroupTypes: ["endingConsonantGroup"],
					plural: true,
					weight: 1,
				},
				"lp": {
					text: "lp",
					categories: ["blend"],
					letterGroupTypes: ["endingConsonantGroup"],
					weight: 2,
				},
				"lps": {
					text: "lps",
					categories: ["blend suffix s"],
					letterGroupTypes: ["endingConsonantGroup"],
					plural: true,
					weight: 1,
				},
				"lt": {
					text: "lt",
					categories: ["blend"],
					letterGroupTypes: ["endingConsonantGroup"],
					weight: 2,
				},
				"lts": {
					text: "lts",
					categories: ["blend suffix s"],
					letterGroupTypes: ["endingConsonantGroup"],
					plural: true,
					weight: 1,
				},
				"lve": {
					text: "lve",
					categories: ["blend"],
					letterGroupTypes: ["endingConsonantGroupWithE"],
					weight: 1,
				},
				"lves": {
					text: "lves",
					categories: ["blend suffix s"],
					letterGroupTypes: ["endingConsonantGroupWithE"],
					plural: true,
					weight: 1,
				},
				"m": {
					text: "m",
					categories: ["simple consonant"],
					letterGroupTypes: ["startingConsonantGroup", "endingConsonantGroup"],
					weight: 5,
				},
				"me": {
					text: "me",
					categories: ["consonant-e"],
					letterGroupTypes: ["endingConsonantGroupWithE"],
					weight: 1,
				},
				"mes": {
					text: "mes",
					categories: ["consonant-e suffix s"],
					letterGroupTypes: ["endingConsonantGroupWithE"],
					plural: true,
					weight: 1,
				},
				"mp": {
					text: "mp",
					categories: ["blend"],
					letterGroupTypes: ["endingConsonantGroup"],
					weight: 2,
				},
				"mps": {
					text: "mps",
					categories: ["blend suffix s"],
					letterGroupTypes: ["endingConsonantGroup"],
					plural: true,
					weight: 1,
				},
				"ms": {
					text: "ms",
					categories: ["suffix s"],
					letterGroupTypes: ["endingConsonantGroup"],
					plural: true,
					weight: 2,
				},
				"n": {
					text: "n",
					categories: ["simple consonant"],
					letterGroupTypes: ["startingConsonantGroup", "endingConsonantGroup"],
					weight: 5,
				},
				"nch": {
					text: "nch",
					categories: ["blend"],
					letterGroupTypes: ["endingConsonantGroup"],
					weight: 1,
				},
				"nches": {
					text: "nches",
					categories: ["blend suffix s"],
					letterGroupTypes: ["endingConsonantGroup"],
					plural: true,
					increaseSyllableCount: 1,
					weight: 1,
				},
				"nd": {
					text: "nd",
					categories: ["blend"],
					letterGroupTypes: ["endingConsonantGroup"],
					weight: 2,
				},
				"nds": {
					text: "nds",
					categories: ["blend suffix s"],
					letterGroupTypes: ["endingConsonantGroup"],
					plural: true,
					weight: 1,
				},
				"ne": {
					text: "ne",
					categories: ["consonant-e"],
					letterGroupTypes: ["endingConsonantGroupWithE"],
					weight: 1,
				},
				"nes": {
					text: "nes",
					categories: ["consonant-e suffix s"],
					letterGroupTypes: ["endingConsonantGroupWithE"],
					plural: true,
					weight: 1,
				},
				"ng": {
					text: "ng",
					categories: ["nasal blend"],
					letterGroupTypes: ["endingConsonantGroup"],
					weight: 2,
				},
				"ngs": {
					text: "ngs",
					categories: ["nasal blend"],
					letterGroupTypes: ["endingConsonantGroup"],
					weight: 1,
				},
				"ngst": {
					text: "ngst",
					categories: ["nasal blend"],
					letterGroupTypes: ["endingConsonantGroup"],
					weight: 1,
				},
				"nct": {
					text: "nct",
					categories: ["nasal blend"],
					letterGroupTypes: ["endingConsonantGroup"],
					weight: 2,
				},
				"nk": {
					text: "nk",
					categories: ["nasal blend"],
					letterGroupTypes: ["endingConsonantGroup"],
					weight: 2,
				},
				"nks": {
					text: "nks",
					categories: ["nasal blend"],
					letterGroupTypes: ["endingConsonantGroup"],
					weight: 1,
				},
				"ns": {
					text: "ns",
					categories: ["suffix s"],
					letterGroupTypes: ["endingConsonantGroup"],
					plural: true,
					weight: 2,
				},
				"nt": {
					text: "nt",
					categories: ["blend"],
					letterGroupTypes: ["endingConsonantGroup"],
					weight: 2,
				},
				"nts": {
					text: "nts",
					categories: ["blend suffix s"],
					letterGroupTypes: ["endingConsonantGroup"],
					plural: true,
					weight: 1,
				},
				"o": {
					text: "o",
					categories: ["simple vowel"],
					letterGroupTypes: ["vowelGroup"],
					weight: 5,
				},
				"oa": {
					text: "oa",
					categories: ["complex vowel"],
					letterGroupTypes: ["vowelGroup"],
					weight: 3,
				},
				"oe": {
					text: "oe",
					categories: ["complex vowel"],
					letterGroupTypes: ["vowelGroup"],
					weight: 1,
				},
				"oi": {
					text: "oi",
					categories: ["complex vowel"],
					letterGroupTypes: ["vowelGroup"],
					weight: 2,
				},
				"oo": {
					text: "oo",
					categories: ["complex vowel"],
					letterGroupTypes: ["vowelGroup"],
					weight: 3,
				},
				"or": {
					text: "or",
					categories: ["r-controlled vowel"],
					letterGroupTypes: ["vowelGroup"],
					weight: 3,
				},
				"ou": {
					text: "ou",
					categories: ["complex vowel"],
					letterGroupTypes: ["vowelGroup"],
					weight: 2,
				},
				"ow": {
					text: "ow",
					categories: ["complex vowel"],
					letterGroupTypes: ["vowelGroup"],
					weight: 1,
				},
				"oy": {
					text: "oy",
					categories: ["complex vowel"],
					letterGroupTypes: ["vowelGroup"],
					weight: 1,
				},
				"p": {
					text: "p",
					categories: ["simple consonant"],
					letterGroupTypes: ["startingConsonantGroup", "endingConsonantGroup"],
					weight: 5,
				},
				"pe": {
					text: "pe",
					categories: ["consonant-e"],
					letterGroupTypes: ["endingConsonantGroupWithE"],
					weight: 1,
				},
				"pes": {
					text: "pes",
					categories: ["consonant-e suffix s"],
					letterGroupTypes: ["endingConsonantGroupWithE"],
					plural: true,
					weight: 1,
				},
				"ph": {
					text: "ph",
					categories: ["digraph"],
					letterGroupTypes: ["startingConsonantGroup", "endingConsonantGroup"],
					weight: 1,
				},
				"phs": {
					text: "phs",
					categories: ["suffix s"],
					letterGroupTypes: ["endingConsonantGroup"],
					plural: true,
					weight: 1,
				},
				"pl": {
					text: "pl",
					categories: ["blend"],
					letterGroupTypes: ["startingConsonantGroup"],
					weight: 2,
				},
				"ple": {
					text: "ple",
					categories: ["le syllable"],
					letterGroupTypes: ["endingConsonantGroupWithE"],
					increaseSyllableCount: 1,
					weight: 1,
				},
				"ples": {
					text: "ples",
					categories: ["le syllable"],
					letterGroupTypes: ["endingConsonantGroupWithE"],
					plural: true,
					increaseSyllableCount: 1,
					weight: 1,
				},
				"pr": {
					text: "pr",
					categories: ["blend"],
					letterGroupTypes: ["startingConsonantGroup"],
					weight: 2,
				},
				"ps": {
					text: "ps",
					categories: ["suffix s"],
					letterGroupTypes: ["endingConsonantGroup"],
					plural: true,
					weight: 2,
				},
				"qu": {
					text: "qu",
					categories: ["simple consonant"],
					letterGroupTypes: ["startingConsonantGroup"],
					weight: 2,
				},
				"r": {
					text: "r",
					categories: ["simple consonant"],
					letterGroupTypes: ["startingConsonantGroup"],
					weight: 5,
				},
				"re": {
					text: "re",
					categories: ["consonant-e"],
					letterGroupTypes: ["endingConsonantGroupWithE"],
					weight: 1,
				},
				"res": {
					text: "res",
					categories: ["consonant-e suffix s"],
					letterGroupTypes: ["endingConsonantGroupWithE"],
					plural: true,
					weight: 1,
				},
				"s": {
					text: "s",
					categories: ["simple consonant"],
					letterGroupTypes: ["startingConsonantGroup"],
					weight: 5,
				},
				"sc": {
					text: "sc",
					categories: ["blend"],
					letterGroupTypes: ["startingConsonantGroup"],
					weight: 2,
				},
				"scr": {
					text: "scr",
					categories: ["complex blend"],
					letterGroupTypes: ["startingConsonantGroup"],
					weight: 2,
				},
				"se": {
					text: "se",
					categories: ["consonant-e"],
					letterGroupTypes: ["endingConsonantGroupWithE"],
					weight: 1,
				},
				"ses": {
					text: "ses",
					categories: ["consonant-e suffix s"],
					letterGroupTypes: ["endingConsonantGroupWithE"],
					plural: true,
					increaseSyllableCount: 1,
					weight: 1,
				},
				"sh": {
					text: "sh",
					categories: ["digraph"],
					letterGroupTypes: ["startingConsonantGroup", "endingConsonantGroup"],
					weight: 3,
				},
				"shes": {
					text: "shes",
					categories: ["suffix s"],
					letterGroupTypes: ["startingConsonantGroup", "endingConsonantGroup"],
					plural: true,
					increaseSyllableCount: 1,
					weight: 1,
				},
				"shr": {
					text: "shr",
					categories: ["complex blend"],
					letterGroupTypes: ["startingConsonantGroup"],
					weight: 2,
				},
				"sk": {
					text: "sk",
					categories: ["blend"],
					letterGroupTypes: ["startingConsonantGroup", "endingConsonantGroup"],
					weight: 2,
				},
				"sks": {
					text: "sks",
					categories: ["blend suffix s"],
					letterGroupTypes: ["endingConsonantGroup"],
					plural: true,
					weight: 1,
				},
				"sl": {
					text: "sl",
					categories: ["blend"],
					letterGroupTypes: ["startingConsonantGroup"],
					weight: 2,
				},
				"sle": {
					text: "sle",
					categories: ["le syllable"],
					letterGroupTypes: ["endingConsonantGroupWithE"],
					increaseSyllableCount: 1,
					weight: 1,
				},
				"sles": {
					text: "sles",
					categories: ["le syllable"],
					letterGroupTypes: ["endingConsonantGroupWithE"],
					plural: true,
					increaseSyllableCount: 1,
					weight: 1,
				},
				"sm": {
					text: "sm",
					categories: ["blend"],
					letterGroupTypes: ["startingConsonantGroup"],
					weight: 2,
				},
				"sn": {
					text: "sn",
					categories: ["blend"],
					letterGroupTypes: ["startingConsonantGroup"],
					weight: 2,
				},
				"sp": {
					text: "sp",
					categories: ["blend"],
					letterGroupTypes: ["startingConsonantGroup", "endingConsonantGroup"],
					weight: 2,
				},
				"sph": {
					text: "sph",
					categories: ["complex blend"],
					letterGroupTypes: ["startingConsonantGroup"],
					weight: 1,
				},
				"spl": {
					text: "spl",
					categories: ["complex blend"],
					letterGroupTypes: ["startingConsonantGroup"],
					weight: 2,
				},
				"sps": {
					text: "sps",
					categories: ["blend suffix s"],
					letterGroupTypes: ["endingConsonantGroup"],
					plural: true,
					weight: 1,
				},
				"squ": {
					text: "squ",
					categories: ["blend"],
					letterGroupTypes: ["startingConsonantGroup"],
					weight: 1,
				},
				"ss": {
					text: "ss",
					categories: ["doubles"],
					letterGroupTypes: ["endingConsonantGroup"],
					weight: 3,
				},
				"sses": {
					text: "sses",
					categories: ["suffix s"],
					letterGroupTypes: ["endingConsonantGroup"],
					plural: true,
					increaseSyllableCount: 1,
					weight: 1,
				},
				"st": {
					text: "st",
					categories: ["blend"],
					letterGroupTypes: ["startingConsonantGroup", "endingConsonantGroup"],
					weight: 2,
				},
				"stle": {
					text: "stle",
					categories: ["le syllable"],
					letterGroupTypes: ["endingConsonantGroupWithE"],
					increaseSyllableCount: 1,
					weight: 1,
				},
				"stles": {
					text: "stles",
					categories: ["le syllable"],
					letterGroupTypes: ["endingConsonantGroupWithE"],
					plural: true,
					increaseSyllableCount: 1,
					weight: 1,
				},
				"str": {
					text: "str",
					categories: ["complex blend"],
					letterGroupTypes: ["startingConsonantGroup"],
					weight: 2,
				},
				"sts": {
					text: "sts",
					categories: ["blend suffix s"],
					letterGroupTypes: ["endingConsonantGroup"],
					plural: true,
					weight: 1,
				},
				"t": {
					text: "t",
					categories: ["simple consonant"],
					letterGroupTypes: ["startingConsonantGroup", "endingConsonantGroup"],
					weight: 5,
				},
				"te": {
					text: "te",
					categories: ["consonant-e"],
					letterGroupTypes: ["endingConsonantGroupWithE"],
					weight: 1,
				},
				"tes": {
					text: "tes",
					categories: ["consonant-e suffix s"],
					letterGroupTypes: ["endingConsonantGroupWithE"],
					plural: true,
					weight: 1,
				},
				"tch": {
					text: "tch",
					categories: ["digraph"],
					letterGroupTypes: ["endingConsonantGroup"],
					weight: 2,
				},
				"tches": {
					text: "tches",
					categories: ["suffix s"],
					letterGroupTypes: ["endingConsonantGroup"],
					plural: true,
					increaseSyllableCount: 1,
					weight: 1,
				},
				"th": {
					text: "th",
					categories: ["digraph"],
					letterGroupTypes: ["startingConsonantGroup", "endingConsonantGroup"],
					weight: 3,
				},
				"thr": {
					text: "thr",
					categories: ["blend"],
					letterGroupTypes: ["startingConsonantGroup"],
					weight: 1,
				},
				"ths": {
					text: "ths",
					categories: ["suffix s"],
					letterGroupTypes: ["endingConsonantGroup"],
					plural: true,
					weight: 1,
				},
				"tle": {
					text: "tle",
					categories: ["le syllable"],
					letterGroupTypes: ["endingConsonantGroupWithE"],
					increaseSyllableCount: 1,
					weight: 1,
				},
				"tles": {
					text: "tles",
					categories: ["le syllable"],
					letterGroupTypes: ["endingConsonantGroupWithE"],
					plural: true,
					increaseSyllableCount: 1,
					weight: 1,
				},
				"ts": {
					text: "ts",
					categories: ["suffix s"],
					letterGroupTypes: ["endingConsonantGroup"],
					plural: true,
					weight: 2,
				},
				"tw": {
					text: "tw",
					categories: ["blend"],
					letterGroupTypes: ["startingConsonantGroup"],
					weight: 2,
				},
				"u": {
					text: "u",
					categories: ["simple vowel"],
					letterGroupTypes: ["vowelGroup"],
					weight: 3,
				},
				"ue": {
					text: "ue",
					categories: ["complex vowel"],
					letterGroupTypes: ["vowelGroup"],
					weight: 1,
				},
				"ui": {
					text: "ui",
					categories: ["complex vowel"],
					letterGroupTypes: ["vowelGroup"],
					weight: 3,
				},
				"ur": {
					text: "ur",
					categories: ["r-controlled vowel"],
					letterGroupTypes: ["vowelGroup"],
					weight: 1,
				},
				"v": {
					text: "v",
					categories: ["simple consonant"],
					letterGroupTypes: ["startingConsonantGroup"],
					weight: 2,
				},
				"ve": {
					text: "ve",
					categories: ["consonant-e"],
					letterGroupTypes: ["endingConsonantGroupWithE"],
					weight: 1,
				},
				"ves": {
					text: "ves",
					categories: ["consonant-e suffix s"],
					letterGroupTypes: ["endingConsonantGroupWithE"],
					plural: true,
					weight: 1,
				},
				"w": {
					text: "w",
					categories: ["simple consonant"],
					letterGroupTypes: ["startingConsonantGroup"],
					weight: 2,
				},
				"wh": {
					text: "wh",
					categories: ["digraph"],
					letterGroupTypes: ["startingConsonantGroup"],
					weight: 1,
				},
				"wr": {
					text: "wr",
					categories: ["silent letters"],
					letterGroupTypes: ["startingConsonantGroup"],
					weight: 1,
				},
				"x": {
					text: "x",
					categories: ["simple consonant"],
					letterGroupTypes: ["endingConsonantGroup"],
					weight: 1,
				},
				"xes": {
					text: "xes",
					categories: ["suffix s"],
					letterGroupTypes: ["endingConsonantGroup"],
					plural: true,
					increaseSyllableCount: 1,
					weight: 1,
				},
				"y": {
					text: "y",
					categories: ["simple consonant"],
					letterGroupTypes: ["startingConsonantGroup"],
					weight: 3,
				},
				"!y": {
					text: "y",
					categories: ["complex vowel"],
					letterGroupTypes: ["vowelGroup"],
					weight: 3,
				},
				"z": {
					text: "z",
					categories: ["simple consonant"],
					letterGroupTypes: ["startingConsonantGroup"],
					weight: 2,
				},
				"ze": {
					text: "ze",
					categories: ["consonant-e"],
					letterGroupTypes: ["endingConsonantGroupWithE"],
					weight: 1,
				},
				"zes": {
					text: "zes",
					categories: ["consonant-e suffix s"],
					letterGroupTypes: ["endingConsonantGroupWithE"],
					plural: true,
					increaseSyllableCount: 1,
					weight: 1,
				},
				"zle": {
					text: "zle",
					categories: ["le syllable"],
					letterGroupTypes: ["endingConsonantGroupWithE"],
					increaseSyllableCount: 1,
					weight: 1,
				},
				"zles": {
					text: "zles",
					categories: ["le syllable"],
					letterGroupTypes: ["endingConsonantGroupWithE"],
					plural: true,
					increaseSyllableCount: 1,
					weight: 1,
				},
				"zz": {
					text: "zz",
					categories: ["doubles"],
					letterGroupTypes: ["endingConsonantGroup"],
					weight: 1,
				},
				"zzes": {
					text: "zzes",
					categories: ["suffix s"],
					letterGroupTypes: ["endingConsonantGroup"],
					plural: true,
					increaseSyllableCount: 1,
					weight: 1,
				}
			}

	/*** tools ***/
		/* chooseRandom */
			function chooseRandom(array) {
				try {
					// random index
						var index = Math.floor(Math.random() * array.length)
					
					// return array element at index
						return array[index]
				} catch (error) { ELEMENTS.error.innerText = "unknown error in " + arguments.callee.name }
			}

		/* duplicateObject */
			function duplicateObject(obj) {
				try {
					// not an object?
						if (typeof obj !== "object") {
							return obj
						}
						
					// stringify and parse to make copy
						return JSON.parse(JSON.stringify(obj))
				} catch (error) { ELEMENTS.error.innerText = "unknown error in " + arguments.callee.name }
			}

	/*** form building ***/
		/* initializeApplication */
			initializeApplication()
			function initializeApplication() {
				try {
					// build out the form
						buildDefaultOptions()
						buildSyllableCountCheckboxes()
						buildSyllableTypeCheckboxes()
						buildLetterGroupCheckboxes()
				} catch (error) { ELEMENTS.error.innerText = "unknown error in " + arguments.callee.name }
			}

		/* buildDefaultOptions */
			function buildDefaultOptions() {
				try {
					// set default count
						ELEMENTS.numberOfWords.value = CONSTANTS.defaultNumberOfWords
				} catch (error) { ELEMENTS.error.innerText = "unknown error in " + arguments.callee.name }
			}

		/* buildSyllableCountCheckboxes */
			function buildSyllableCountCheckboxes() {
				try {
					// get parent
						var parentElement = ELEMENTS.syllableCounts

					// loop through syllable counts to make labels / checkboxes
						for (var i = 1; i <= CONSTANTS.defaultSyllableMaximum; i++) {
							var label = document.createElement("label")
								label.className = "syllable-count-label"
							parentElement.appendChild(label)

							var checkbox = document.createElement("input")
								checkbox.type = "checkbox"
								checkbox.className = "syllable-count-checkbox"
								checkbox.checked = Boolean(i <= CONSTANTS.defaultSyllableCount)
								checkbox.value = i
							label.appendChild(checkbox)

							var span = document.createElement("span")
								span.innerText = i
							label.appendChild(span)
						}
				} catch (error) { ELEMENTS.error.innerText = "unknown error in " + arguments.callee.name }
			}

		/* buildSyllableTypeCheckboxes */
			function buildSyllableTypeCheckboxes() {
				try {
					// get parent
						var parentElement = ELEMENTS.syllableTypes

					// copy types
						var syllableTypes = duplicateObject(SYLLABLE_TYPES)

					// loop through syllable types to make labels / checkboxes
						for (var i = 0; i < syllableTypes.length; i++) {
							var label = document.createElement("label")
								label.className = "syllable-type-label"
							parentElement.appendChild(label)

							var checkbox = document.createElement("input")
								checkbox.type = "checkbox"
								checkbox.className = "syllable-type-checkbox"
								checkbox.checked = Boolean(CONSTANTS.defaultSyllableTypes.includes(i))
								checkbox.value = syllableTypes[i].join("-")
							label.appendChild(checkbox)

							var span = document.createElement("span")
								span.innerText = "[" + syllableTypes[i].join("] - [") + "]"
							label.appendChild(span)
						}
				} catch (error) { ELEMENTS.error.innerText = "unknown error in " + arguments.callee.name }
			}

		/* buildLetterGroupCheckboxes */
			function buildLetterGroupCheckboxes() {
				try {
					// get parent
						var parentElement = ELEMENTS.categories

					// build out object of letter groups arranged by category
						var categorizedLetterGroups = buildCategorizedLetterGroups()

					// loop through categories to make labels / checkboxes
						for (var i in categorizedLetterGroups) {
							var isDefault = Boolean(CONSTANTS.defaultCategories.includes(i))

							var section = document.createElement("div")
								section.className = "category"
								section.id = i
							parentElement.appendChild(section)

							var label = document.createElement("label")
								label.className = "category-label"
							section.appendChild(label)

							var checkbox = document.createElement("input")
								checkbox.type = "checkbox"
								checkbox.className = "category-checkbox"
								checkbox.checked = isDefault
								checkbox.value = i
								checkbox.addEventListener("change", checkCategoryCheckbox)
							label.appendChild(checkbox)

							var name = document.createElement("h3")
								name.innerText = i
							label.appendChild(name)

							// loop through letter groups within category to make labels / checkboxes
								for (var j in categorizedLetterGroups[i]) {
									var label = document.createElement("label")
										label.className = "lettergroup-label"
									section.appendChild(label)

									var checkbox = document.createElement("input")
										checkbox.type = "checkbox"
										checkbox.className = "lettergroup-checkbox"
										checkbox.checked = isDefault
										checkbox.value = categorizedLetterGroups[i][j]
									label.appendChild(checkbox)

									var span = document.createElement("span")
										span.innerText = categorizedLetterGroups[i][j].replace("!", "")
									label.appendChild(span)
								}
						}
				} catch (error) { ELEMENTS.error.innerText = "unknown error in " + arguments.callee.name }
			}

		/* buildCategorizedLetterGroups */
			function buildCategorizedLetterGroups() {
				try {
					// empty structure
						var categorizedLetterGroups = {}
						for (var i in CATEGORIES) {
							categorizedLetterGroups[ CATEGORIES[i] ] = []
						}

					// loop through letter groups
						for (var i in LETTER_GROUPS) {
							// add to multiple categories?
								for (var j = 0; j < LETTER_GROUPS[i].categories.length; j++) {
									categorizedLetterGroups[ LETTER_GROUPS[i].categories[j] ].push(i)
								}
						}

					// return structure
						return categorizedLetterGroups
				} catch (error) { ELEMENTS.error.innerText = "unknown error in " + arguments.callee.name }
			}

	/*** form interaction ***/
		/* checkCategoryCheckbox */
			function checkCategoryCheckbox(event) {
				try {
					// get all children checkboxes
						var children = event.target.closest(".category").querySelectorAll(".lettergroup-checkbox")

					// set checked state to match
						for (var i in children) {
							children[i].checked = event.target.checked
						}
				} catch (error) { ELEMENTS.error.innerText = "unknown error in " + arguments.callee.name }
			}

		/* submitGenerate */
			ELEMENTS.generateForm.addEventListener("submit", submitGenerate)
			function submitGenerate(event) {
				try {
					// get the syllable counts from checkboxes
						var allowedSyllableCounts = []
						var checkedSyllableCountCheckboxes = Array.from(document.querySelectorAll(".syllable-count-checkbox:checked"))
						for (var i in checkedSyllableCountCheckboxes) {
							allowedSyllableCounts.push(Number(checkedSyllableCountCheckboxes[i].value))
						}

					// get the syllable types from checkboxes
						var allowedSyllableTypes = []
						var checkedSyllableTypeCheckboxes = Array.from(document.querySelectorAll(".syllable-type-checkbox:checked"))
						for (var i in checkedSyllableTypeCheckboxes) {
							allowedSyllableTypes.push(checkedSyllableTypeCheckboxes[i].value)
						}

					// get the letter groups from checkboxes (ignore categories)
						var allowedLetterGroups = []
						var checkedLetterGroups = Array.from(document.querySelectorAll(".lettergroup-checkbox:checked"))
						for (var i in checkedLetterGroups) {
							allowedLetterGroups.push(checkedLetterGroups[i].value)
						}

					// build options
						var options = {
							numberOfWords: Number(ELEMENTS.numberOfWords.value),
							syllableCounts: allowedSyllableCounts,
							syllableTypes: allowedSyllableTypes,
							letterGroups: allowedLetterGroups
						}

					// validate
						if (!options.numberOfWords) {
							ELEMENTS.error.innerText = "set # words to 1 or more"
							return
						}
						if (!options.syllableCounts.length) {
							ELEMENTS.error.innerText = "set # syllables to 1 or more"
							return
						}
						if (!options.syllableTypes.length) {
							ELEMENTS.error.innerText = "select 1 or more syllable types"
							return
						}
						if (!options.letterGroups.length) {
							ELEMENTS.error.innerText = "select 1 or more letter groups"
							return
						}

					// actually generate the words
						var words = generateWords(options)

					// no words --> error
						if (!words.length) {
							ELEMENTS.error.innerText = "unable to generate words"
							return
						}

					// reset error
						ELEMENTS.error.innerText = ""

					// show words
						ELEMENTS.words.innerText = words.join(", ")
				} catch (error) { ELEMENTS.error.innerText = "unknown error in " + arguments.callee.name }
			}

		/* submitRandomize */
			ELEMENTS.randomizeForm.addEventListener("submit", submitRandomize)
			function submitRandomize(event) {
				try {
					// random syllable counts
						var syllableCountCheckboxes = Array.from(ELEMENTS.syllableCounts.querySelectorAll(".syllable-count-checkbox"))
						for (var i in syllableCountCheckboxes) {
							syllableCountCheckboxes[i].checked = Boolean(Math.floor(Math.random() * 2))
						}

					// random syllable counts
						var syllableTypeCheckboxes = Array.from(ELEMENTS.syllableTypes.querySelectorAll(".syllable-type-checkbox"))
						for (var i in syllableTypeCheckboxes) {
							syllableTypeCheckboxes[i].checked = Boolean(Math.floor(Math.random() * 2))
						}

					// categories --> off
						var categoryCheckboxes = Array.from(ELEMENTS.categories.querySelectorAll(".category-checkbox"))
						for (var i in categoryCheckboxes) {
							categoryCheckboxes[i].checked = false
						}

					// random letter groups
						var letterGroupCheckboxes = Array.from(ELEMENTS.categories.querySelectorAll(".lettergroup-checkbox"))
						for (var i in letterGroupCheckboxes) {
							letterGroupCheckboxes[i].checked = Boolean(Math.floor(Math.random() * 2))
						}
				} catch (error) { ELEMENTS.error.innerText = "unknown error in " + arguments.callee.name }
			}

	/*** filtering ***/
		/* filterLetterGroups */
			function filterLetterGroups(options) {
				try {
					// empty structure
						var allowedLetterGroups = []

					// copy of all
						var allLetterGroups = duplicateObject(LETTER_GROUPS)

					// loop through all and check against options from form
						for (var i in allLetterGroups) {
							if (options.letterGroups.includes(i)) {
								// weight somre more heavily
									for (var j = 0; j < allLetterGroups[i].weight; j++) {
										allowedLetterGroups.push(allLetterGroups[i])
									}
							}
						}

					// return weighted list
						return allowedLetterGroups
				} catch (error) { ELEMENTS.error.innerText = "unknown error in " + arguments.callee.name }
			}

		/* filterSyllableTypes */
			function filterSyllableTypes(options) {
				try {
					// empty structure
						var allowedSyllableTypes = []

					// copy of all
						var allSyllableTypes = duplicateObject(SYLLABLE_TYPES)

					// loop through all and check against options from form
						for (var i in allSyllableTypes) {
							if (options.syllableTypes.includes(allSyllableTypes[i].join("-"))) {
								allowedSyllableTypes.push(allSyllableTypes[i])
							}
						}

					// return list
						return allowedSyllableTypes
				} catch (error) { ELEMENTS.error.innerText = "unknown error in " + arguments.callee.name }
			}

	/*** word generation ***/
		/* generateWords */
			function generateWords(options) {
				try {
					// get what's allowed
						var allowedSyllableTypes = filterSyllableTypes(options)
						var allowedLetterGroups = filterLetterGroups(options)

					// empty word list
						var words = []

					// build out as many words as requested
						for (var i = 0; i < options.numberOfWords; i++) {
							var word = generateWord(options.syllableCounts, allowedSyllableTypes, allowedLetterGroups)
							if (word) {
								words.push(word)
							}
						}

					// give back list of words
						return words
				} catch (error) { ELEMENTS.error.innerText = "unknown error in " + arguments.callee.name }
			}

		/* generateWord */
			function generateWord(allowedSyllableCounts, allowedSyllableTypes, allowedLetterGroups) {
				try {
					// no syllables to start
						var syllables = []

					// how many?
						var syllableCount = chooseRandom(allowedSyllableCounts)

					// empty for now
						var lastLetterGroupText = null
						var lastSyllableLastLetterGroupType = null

					// loop through syllables
						for (var i = 0; i < syllableCount; i++) {
							// generate and add to word
								var thisSyllable = generateSyllable(allowedSyllableTypes, allowedLetterGroups, lastLetterGroupText, lastSyllableLastLetterGroupType)
								syllables.push(thisSyllable)

							// remember last text (to avoid duplicate clusters)
								lastLetterGroupText = thisSyllable[thisSyllable.length - 1].text

							// remember last type (to avoid back-to-back vowel groups)
								lastSyllableLastLetterGroupType = thisSyllable[thisSyllable.length - 1].letterGroupTypes[0]
							
							// determine if we added a syllable from a weird letter group
								for (var j = 0; j < thisSyllable.length; j++) {
									if (thisSyllable[j] && thisSyllable[j].increaseSyllableCount) {
										i++
									}
								}
						}

					// word string
						var word = ""

					// loop through syllables
						for (var i = 0; i < syllables.length; i++) {
							var syllable = syllables[i]

							// collapse letter groups into a string
								for (var j = 0; j < syllable.length; j++) {
									var letterGroup = syllable[j]
									if (letterGroup) {
										word += letterGroup.text
									}
								}
						}

					// give back word
						return word || null
				} catch (error) { ELEMENTS.error.innerText = "unknown error in " + arguments.callee.name }
			}

		/* generateSyllable */
			function generateSyllable(allowedSyllableTypes, allowedLetterGroups, lastLetterGroupText, lastSyllableLastLetterGroupType) {
				try {
					// no letter groups to start
						var thisSyllable = []

					// filter list of syllable structures
						var tempAllowedSyllableTypes = duplicateObject(allowedSyllableTypes)

					// avoid back-to-back vowel groups
						if (lastSyllableLastLetterGroupType == "vowelGroup") {
							tempAllowedSyllableTypes = tempAllowedSyllableTypes.filter(function(syllableType) {
								return syllableType[0] !== "vowelGroup"
							})
						}

					// if there are no syllable types left, escape
						if (!tempAllowedSyllableTypes.length) {
							return null
						}

					// choose random type from list
						var syllableType = chooseRandom(tempAllowedSyllableTypes)

					// loop through letter group placeholders
						for (var i = 0; i < syllableType.length; i++) {
							// only allow y in last letter group
								var isLastLetterGroup = Boolean(i == syllableType.length - 1)

							// get letter group and add to syllable
								var thisLetterGroup = getLetterGroupOfType(syllableType[i], allowedLetterGroups, lastLetterGroupText, isLastLetterGroup)
								thisSyllable.push(thisLetterGroup)
								lastLetterGroupText = thisLetterGroup.text
						}

					// give back syllable
						return thisSyllable
				} catch (error) { ELEMENTS.error.innerText = "unknown error in " + arguments.callee.name }
			}

		/* getLetterGroupOfType */
			function getLetterGroupOfType(desiredLetterGroupType, allowedLetterGroups, lastLetterGroupText, isLastLetterGroup) {
				try {
					// empty list
						var theseLetterGroups = []
					
					// loop through all options
						for (var i in allowedLetterGroups) {
							// find the types we want (vowel, start consonant, end consonant, etc.)
								if (allowedLetterGroups[i].letterGroupTypes.includes(desiredLetterGroupType)) {
									// avoid duplicating the same letter group / consecutive letters UNLESS both are 1 letter and the same
										if (lastLetterGroupText && lastLetterGroupText == allowedLetterGroups[i].text) {
											if (lastLetterGroupText.length == 1 && allowedLetterGroups[i].text.length == 1) {
												theseLetterGroups.push(allowedLetterGroups[i])
											}
										}
										else if (lastLetterGroupText && lastLetterGroupText[lastLetterGroupText.length - 1] == allowedLetterGroups[i].text[0]) {
											if (["ar", "er", "ir", "or", "ur"].includes(lastLetterGroupText) && allowedLetterGroups[i].text == "r") {
												theseLetterGroups.push(allowedLetterGroups[i])
											}
										}

									// special rule for y - only at end of syllable
										else if (allowedLetterGroups[i].text == "y" && allowedLetterGroups[i].letterGroupTypes.includes("vowelGroup")) {
											if (isLastLetterGroup) {
												theseLetterGroups.push(allowedLetterGroups[i])
											}
										}

									// otherwise, add to the list of options
										else {
											theseLetterGroups.push(allowedLetterGroups[i])
										}
								}
						}
					
					// pick a random letter group
						var thisLetterGroup = chooseRandom(theseLetterGroups)

					// give back the letter group
						return thisLetterGroup
				} catch (error) { ELEMENTS.error.innerText = "unknown error in " + arguments.callee.name }
			}
}
