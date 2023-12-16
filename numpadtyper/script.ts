/*** types ***/
	type Mapping = {
		[key: string]: string
	}
	
	type ElementMapping = {
		[key: string]: HTMLInputElement | null
	}
	
	type ActionFunction = () => void;

	type MappingFunction = (input: string) => string;

/*** globals ***/
	/* triggers */
		const TRIGGERS: Mapping = {
			"input": "input"
		}

	/* elements */
		const ELEMENTS: ElementMapping = {
			"text": document.querySelector("#text"),
			"numpad": document.querySelector("#numpad"),
		}

	/* constants */
		const LETTER_TO_NUMPAD: Mapping = {
			"a": "2",
			"b": "22",
			"c": "222",
			"d": "3",
			"e": "33",
			"f": "333",
			"g": "4",
			"h": "44",
			"i": "444",
			"j": "5",
			"k": "55",
			"l": "555",
			"m": "6",
			"n": "66",
			"o": "666",
			"p": "7",
			"q": "77",
			"r": "777",
			"s": "7777",
			"t": "8",
			"u": "88",
			"v": "888",
			"w": "9",
			"x": "99",
			"y": "999",
			"z": "9999",
			" ": "0"
		}

		const NUMPAD_TO_LETTER: Mapping = {
			"2": 	"a",
			"22": 	"b",
			"222": 	"c",
			"3": 	"d",
			"33": 	"e",
			"333": 	"f",
			"4": 	"g",
			"44": 	"h",
			"444": 	"i",
			"5": 	"j",
			"55": 	"k",
			"555": 	"l",
			"6": 	"m",
			"66": 	"n",
			"666": 	"o",
			"7": 	"p",
			"77": 	"q",
			"777": 	"r",
			"7777": 	"s",
			"8": 	"t",
			"88": 	"u",
			"888": 	"v",
			"9": 	"w",
			"99": 	"x",
			"999": 	"y",
			"9999": "z",
			"0": 	" "
		}

/*** conversions ***/
	/* textToNumpad */
		const textToNumpad: MappingFunction = (input) => {
			input = input.toLowerCase();

			if (LETTER_TO_NUMPAD[input]) {
				return LETTER_TO_NUMPAD[input];
			}
			return "";
		}

	/* numpadToText */
		const numpadToText: MappingFunction = (input) => {
			input = input.toLowerCase();

			if (NUMPAD_TO_LETTER[input]) {
				return NUMPAD_TO_LETTER[input];
			}
			return "";
		}

/*** actions ***/
	/* enterText */
		const enterText: ActionFunction = () => {
			if (!ELEMENTS.text || !ELEMENTS.numpad) {
				return
			}

			const text: string = ELEMENTS.text.value;
			const textArray: string[] = text.split("");
			const numpadArray: string[] = textArray.map(textToNumpad).filter(input => input);

			ELEMENTS.numpad.value = numpadArray.join(" ");
		}

		ELEMENTS.text && ELEMENTS.text.addEventListener(TRIGGERS.input, enterText);

	/* enterNumpad */
		const enterNumpad: ActionFunction = () => {
			if (!ELEMENTS.text || !ELEMENTS.numpad) {
				return
			}

			const numpad: string = ELEMENTS.numpad.value;
			const numpadArray: string[] = numpad.split(/\s/g);
			const textArray: string[] = numpadArray.map(numpadToText).filter(input => input);

			ELEMENTS.text.value = textArray.join("");
		}

		ELEMENTS.numpad && ELEMENTS.numpad.addEventListener(TRIGGERS.input, enterNumpad);
