/*** globals ***/
	/* svgs */
		const SVG = {
			ceilingLight: "M 45 44 C 45 34 45 24 45 12 C 45 10 45 10 47 10 C 48 10 52 10 53 10 C 55 10 55 10 55 12 C 55 24 55 34 55 44 C 55 45 55 46 56 46 C 70 48 80 60 80 74 C 80 75 79 75 78 75 C 73 75 66 75 59 75 C 57 78 54 80 50 80 C 46 80 43 78 41 75 C 34 75 27 75 22 75 C 21 75 20 75 20 74 C 20 60 30 48 44 46 C 45 46 45 45 45 44 Z",
			sideLamp: "M 53 59 C 53 63 60 70 60 75 C 60 80 60 80 50 80 C 40 80 40 80 40 75 C 40 70 47 63 47 59 C 47 58 47 58 46 58 C 38 58 32 58 30 58 C 28 58 26 56 26 54 C 26 50 31 50 35 35 C 40 20 35 20 50 20 C 65 20 61 20 65 35 C 69 50 74 50 74 54 C 74 56 72 58 70 58 C 68 58 62 58 54 58 C 53 58 53 58 53 59 Z",
			floorLamp: "M 52 46 C 52 55 52 67 52 74 C 52 77 53 78 57 78 C 60 78 60 80 59 80 C 52 80 48 80 41 80 C 40 80 40 78 43 78 C 47 78 48 77 48 74 C 48 67 48 55 48 46 C 48 45 48 45 47 45 C 42 45 38 45 36 45 C 35 45 34 44 34 43 C 34 40 37 40 40 30 C 43 20 40 20 50 20 C 60 20 57 20 60 30 C 63 40 66 40 66 43 C 66 44 65 45 64 45 C 62 45 58 45 53 45 C 52 45 52 45 52 46 Z",
			stringLights: "M 69 62 C 64 63 57 64 51 64 C 51 65 52 67 53 68 C 54 69 54 70 54 71 C 54 73 52 75 50 75 C 48 75 46 73 46 71 C 46 70 46 69 47 68 C 48 67 49 65 49 64 C 43 64 36 63 31 62 C 31 63 32 65 33 66 C 34 67 34 68 34 69 C 34 71 32 73 30 73 C 28 73 26 71 26 69 C 26 68 26 67 27 66 C 28 65 29 63 29 61 C 29 61 31 62 25 60 C 22 59 20 58 20 56 C 20 54 22 53 25 54 C 40 60 60 60 75 54 C 78 53 80 54 80 56 C 80 58 78 59 75 60 C 72 61 69 62 71 61 C 71 63 72 65 73 66 C 74 67 74 68 74 69 C 74 71 72 73 70 73 C 68 73 66 71 66 69 C 66 68 66 67 67 66 C 68 65 69 63 69 62 Z M 69 33 C 64 34 57 35 51 35 C 51 36 52 38 53 39 C 54 40 54 41 54 42 C 54 44 52 46 50 46 C 48 46 46 44 46 42 C 46 41 46 40 47 39 C 48 38 49 36 49 35 C 43 35 36 34 31 33 C 31 34 32 36 33 37 C 34 38 34 39 34 40 C 34 42 32 44 30 44 C 28 44 26 42 26 40 C 26 39 26 38 27 37 C 28 36 29 34 29 32 C 29 32 31 33 25 31 C 22 30 20 29 20 27 C 20 25 22 24 25 25 C 40 31 60 31 75 25 C 78 24 80 25 80 27 C 80 29 78 30 75 31 C 72 32 69 33 71 32 C 71 34 72 36 73 37 C 74 38 74 39 74 40 C 74 42 72 44 70 44 C 68 44 66 42 66 40 C 66 39 66 38 67 37 C 68 36 69 34 69 33 Z",
			vacuum: "M 43 50 C 43 54 46 57 50 57 C 54 57 57 54 57 50 C 57 46 54 43 50 43 C 46 43 43 46 43 50 Z M 45 50 C 45 47 47 45 50 45 C 53 45 55 47 55 50 C 55 53 53 55 50 55 C 47 55 45 53 45 50 Z M 20 50 C 20 33 33 20 50 20 C 67 20 80 33 80 50 C 80 67 67 80 50 80 C 33 80 20 67 20 50 Z",
			spaceHeater: "M 62 62 C 62 65 62 68 62 72 C 66 70 70 66 72 62 C 68 62 65 62 62 62 Z M 43 74 C 45 75 49 75 50 75 C 51 75 55 75 57 74 C 57 69 57 66 57 62 C 52 62 48 62 43 62 C 43 66 43 69 43 74 Z M 80 50 C 80 67 67 80 50 80 C 33 80 20 67 20 50 C 20 33 33 20 50 20 C 67 20 80 33 80 50 Z M 74 43 C 70 43 66 43 62 43 C 62 48 62 52 62 57 C 66 57 70 57 74 57 C 75 55 75 51 75 50 C 75 49 75 45 74 43 Z M 62 28 C 62 32 62 35 62 38 C 65 38 68 38 72 38 C 72 38 72 38 72 38 C 72 38 72 38 72 38 C 70 34 66 30 62 28 C 62 28 62 28 62 28 C 62 28 62 28 62 28 Z M 43 26 C 43 30 43 34 43 38 C 48 38 52 38 57 38 C 57 34 57 30 57 26 C 55 25 51 25 50 25 C 49 25 45 25 43 26 Z M 28 38 C 32 38 35 38 38 38 C 38 35 38 32 38 28 C 34 30 30 34 28 38 Z M 26 57 C 30 57 34 57 38 57 C 38 52 38 48 38 43 C 34 43 30 43 26 43 C 25 45 25 49 25 50 C 25 51 25 55 26 57 Z M 38 72 C 38 68 38 65 38 62 C 35 62 32 62 28 62 C 30 66 34 70 38 72 Z M 58 50 C 58 45 55 42 50 42 C 45 42 42 45 42 50 C 42 55 45 58 50 58 C 55 58 58 55 58 50 Z",
			airPurifier: "M 70 26 C 56 26 44 26 30 26 C 27 26 26 27 26 30 C 26 44 26 56 26 70 C 26 73 27 74 30 74 C 44 74 56 74 70 74 C 73 74 74 73 74 70 C 74 56 74 44 74 30 C 74 27 73 26 70 26 Z M 31 50 C 31 40 40 31 50 31 C 60 31 69 40 69 50 C 69 60 60 69 50 69 C 40 69 31 60 31 50 Z M 74 20 C 77 20 80 23 80 26 C 80 42 80 58 80 74 C 80 77 77 80 74 80 C 58 80 42 80 26 80 C 23 80 20 77 20 74 C 20 58 20 42 20 26 C 20 23 23 20 26 20 C 42 20 58 20 74 20 Z M 64 50 C 64 42 58 36 50 36 C 42 36 36 42 36 50 C 36 58 42 64 50 64 C 58 64 64 58 64 50 Z",
			airConditioner: "M 25 63 C 25 64 26 65 27 65 C 42 65 58 65 73 65 C 74 65 75 64 75 63 C 75 55 75 45 75 37 C 75 36 74 35 73 35 C 58 35 42 35 27 35 C 26 35 25 36 25 37 C 25 45 25 55 25 63 Z M 29 51 C 29 49 29 49 31 49 C 46 49 54 49 69 49 C 71 49 71 49 71 51 C 71 53 71 53 69 53 C 54 53 46 53 31 53 C 29 53 29 53 29 51 Z M 29 59 C 29 57 29 57 31 57 C 46 57 54 57 69 57 C 71 57 71 57 71 59 C 71 61 71 61 69 61 C 54 61 46 61 31 61 C 29 61 29 61 29 59 Z M 20 64 C 20 55 20 45 20 36 C 20 33 23 30 26 30 C 42 30 58 30 74 30 C 77 30 80 33 80 36 C 80 45 80 55 80 64 C 80 67 77 70 74 70 C 58 70 42 70 26 70 C 23 70 20 67 20 64 Z",
			humidifier: "M 35 46 C 41 36 45 29 46 27 C 50 20 50 20 54 27 C 55 29 59 36 65 46 C 68 51 70 55 70 60 C 70 71 61 80 50 80 C 39 80 30 71 30 60 C 30 55 32 51 35 46 Z",
			fan: "M 25 50 C 25 64 36 75 50 75 C 64 75 75 64 75 50 C 75 36 64 25 50 25 C 36 25 25 36 25 50 Z M 49 54 C 48 54 46 52 46 51 C 45 51 44 51 42 52 C 40 53 37 54 35 54 C 29 54 27 52 27 50 C 27 48 29 46 35 46 C 37 46 40 47 42 48 C 44 49 45 49 46 49 C 46 48 48 46 49 46 C 49 45 49 44 48 42 C 47 40 46 37 46 35 C 46 29 48 27 50 27 C 52 27 54 29 54 35 C 54 37 53 40 52 42 C 51 44 51 45 51 46 C 52 46 54 48 54 49 C 55 49 56 49 58 48 C 60 47 63 46 65 46 C 71 46 73 48 73 50 C 73 52 71 54 65 54 C 63 54 60 53 58 52 C 56 51 55 51 54 51 C 54 52 52 54 51 54 C 51 55 51 56 52 58 C 53 60 54 63 54 65 C 54 71 52 73 50 73 C 48 73 46 71 46 65 C 46 63 47 60 48 58 C 49 56 49 55 49 54 Z M 20 50 C 20 33 33 20 50 20 C 67 20 80 33 80 50 C 80 67 67 80 50 80 C 33 80 20 67 20 50 Z",
			speaker: "M 37 25 C 36 25 35 26 35 27 C 35 42 35 58 35 73 C 35 74 36 75 37 75 C 45 75 55 75 63 75 C 64 75 65 74 65 73 C 65 58 65 42 65 27 C 65 26 64 25 63 25 C 55 25 45 25 37 25 Z M 40 60 C 40 54 44 50 50 50 C 56 50 60 54 60 60 C 60 66 56 70 50 70 C 44 70 40 66 40 60 Z M 43 37 C 43 33 46 30 50 30 C 54 30 57 33 57 37 C 57 41 54 44 50 44 C 46 44 43 41 43 37 Z M 36 20 C 45 20 55 20 64 20 C 67 20 70 23 70 26 C 70 42 70 58 70 74 C 70 77 67 80 64 80 C 55 80 45 80 36 80 C 33 80 30 77 30 74 C 30 58 30 42 30 26 C 30 23 33 20 36 20 Z",
			music: "M 30 14 C 30 12 32 10 34 10 C 50 10 70 10 86 10 C 88 10 90 12 90 14 C 90 30 90 60 90 75 C 90 83 83 90 75 90 C 67 90 60 83 60 75 C 60 67 67 60 75 60 C 77 60 77 60 79 60.5 C 80 61 80 60 80 58 C 80 50 80 30 80 22 C 80 21 79 20 78 20 C 70 20 50 20 42 20 C 41 20 40 21 40 22 C 40 30 40 60 40 75 C 40 83 33 90 25 90 C 17 90 10 83 10 75 C 10 67 17 60 25 60 C 27 60 27 60 29 60.5 C 30 61 30 60 30 58 C 30 50 30 40 30 14 Z",
			recordPlayer: "M 71 25 C 56 25 44 25 29 25 C 26 25 25 26 25 29 C 25 44 25 56 25 71 C 25 74 26 75 29 75 C 44 75 56 75 71 75 C 74 75 75 74 75 71 C 75 56 75 44 75 29 C 75 26 74 25 71 25 Z M 27 50 C 27 37 37 27 50 27 C 63 27 73 37 73 50 C 73 63 63 73 50 73 C 37 73 27 63 27 50 Z M 74 20 C 77 20 80 23 80 26 C 80 42 80 58 80 74 C 80 77 77 80 74 80 C 58 80 42 80 26 80 C 23 80 20 77 20 74 C 20 58 20 42 20 26 C 20 23 23 20 26 20 C 42 20 58 20 74 20 Z M 55 50 C 55 47 53 45 50 45 C 47 45 45 47 45 50 C 45 53 47 55 50 55 C 53 55 55 53 55 50 Z",
			furnace: "M 37 25 C 36 25 35 26 35 27 C 35 42 35 58 35 73 C 35 74 36 75 37 75 C 45 75 55 75 63 75 C 64 75 65 74 65 73 C 65 58 65 42 65 27 C 65 26 64 25 63 25 C 55 25 45 25 37 25 Z M 56 72 C 52 73 48 73 44 72 C 40 71 36 67 36 62 C 36 58 37 55 38 52 C 40 46 40 46 41 43 C 42 40 42 40 43 43 C 43 43 44 46 44 46 C 46 52 45 52 47 46 C 48 43 48 43 49 40 C 50 37 50 37 51 40 C 52 43 52 43 53 46 C 55 52 54 52 56 46 C 56 46 57 43 57 43 C 58 40 58 40 59 43 C 60 46 60 46 62 52 C 63 55 64 58 64 62 C 64 67 60 71 56 72 Z M 36 20 C 45 20 55 20 64 20 C 67 20 70 23 70 26 C 70 42 70 58 70 74 C 70 77 67 80 64 80 C 55 80 45 80 36 80 C 33 80 30 77 30 74 C 30 58 30 42 30 26 C 30 23 33 20 36 20 Z",
			check: "M 40 60 C 47 53 63 37 72 28 C 74 26 77 26 79 28 C 81 30 81 33 79 35 C 70 44 54 60 44 70 C 42 72 38 72 36 70 C 26 60 24 58 21 55 C 19 53 19 50 21 48 C 23 46 26 46 28 48 C 31 51 33 53 40 60 Z",
			x: "M 50 43 C 55 38 60 33 64 29 C 66 27 69 27 71 29 C 73 31 73 34 71 36 C 67 40 62 45 57 50 C 62 55 67 60 71 64 C 73 66 73 69 71 71 C 69 73 66 73 64 71 C 60 67 55 62 50 57 C 45 62 40 67 36 71 C 34 73 31 73 29 71 C 27 69 27 66 29 64 C 33 60 38 55 43 50 C 38 45 33 40 29 36 C 27 34 27 31 29 29 C 31 27 34 27 36 29 C 40 33 45 38 50 43 Z",
			play: "M 32 72 C 32 60 32 40 32 28 C 32 26 34 24 36 24 C 38 24 38 24 40 25 C 48 30 65 40 73 45 C 76 47 77 48 77 50 C 77 52 76 53 73 55 C 65 60 48 70 40 75 C 38 76 38 76 36 76 C 34 76 32 74 32 72 Z",
			pause: "M 37 80 C 34 80 32 78 32 75 C 32 60 32 40 32 25 C 32 22 34 20 37 20 C 40 20 42 22 42 25 C 42 40 42 60 42 75 C 42 78 40 80 37 80 Z M 63 80 C 60 80 58 78 58 75 C 58 60 58 40 58 25 C 58 22 60 20 63 20 C 66 20 68 22 68 25 C 68 40 68 60 68 75 C 68 78 66 80 63 80 Z",
			volumeUp: "M 58 27 C 67 27 78 35 78 50 C 78 65 67 73 58 73 C 54 73 54 68 58 68 C 65 68 73 62 73 50 C 73 38 65 32 58 32 C 54 32 54 27 58 27 Z M 57 34 C 63 34 71 40 71 50 C 71 60 63 66 57 66 C 54 66 54 62 57 62 C 61 62 67 58 67 50 C 67 42 61 38 57 38 C 54 38 54 34 57 34 Z M 56 40 C 60 40 65 44 65 50 C 65 56 60 60 56 60 C 54 60 54 57 56 57 C 59 57 62 54 62 50 C 62 46 59 43 56 43 C 54 43 54 40 56 40 Z M 55 45 C 58 45 60 47 60 50 C 60 53 58 55 55 55 C 54 55 54 53 55 53 C 56 53 58 52 58 50 C 58 48 56 47 55 47 C 54 47 54 45 55 45 Z M 35 59 C 25 57 25 60 25 50 C 25 40 25 43 35 41 C 45 39 45 34 48 34 C 49 34 50 35 50 36 C 50 40 50 60 50 64 C 50 65 49 66 48 66 C 45 66 45 61 35 59 Z",
			volumeDown: "M 56 40 C 60 40 65 44 65 50 C 65 56 60 60 56 60 C 54 60 54 57 56 57 C 59 57 62 54 62 50 C 62 46 59 43 56 43 C 54 43 54 40 56 40 Z M 55 45 C 58 45 60 47 60 50 C 60 53 58 55 55 55 C 54 55 54 53 55 53 C 56 53 58 52 58 50 C 58 48 56 47 55 47 C 54 47 54 45 55 45 Z M 35 59 C 25 57 25 60 25 50 C 25 40 25 43 35 41 C 45 39 45 34 48 34 C 49 34 50 35 50 36 C 50 40 50 60 50 64 C 50 65 49 66 48 66 C 45 66 45 61 35 59 Z",
			record: "M 20 50 C 20 33 33 20 50 20 C 67 20 80 33 80 50 C 80 67 67 80 50 80 C 33 80 20 67 20 50 Z",
			temperature1: "M 47 63 C 46 64 43 66 43 70 C 43 74 46 77 50 77 C 53 77 57 74 57 70 C 57 66 54 64 53 63 C 52 62 52 62 52 59 C 52 50 52 35 52 25 C 52 24 51 23 50 23 C 49 23 48 24 48 25 C 48 35 48 50 48 59 C 48 62 48 62 47 63 Z M 45 61 C 45 50 45 35 45 25 C 45 22 47 20 50 20 C 53 20 55 22 55 25 C 55 35 55 50 55 61 C 58 63 60 66 60 70 C 60 76 56 80 50 80 C 44 80 40 76 40 70 C 40 66 42 63 45 61 Z",
			temperature2: "M 50 50 C 52 50 52 51 52 49 C 52 40 52 35 52 25 C 52 24 51 23 50 23 C 49 23 48 24 48 25 C 48 35 48 40 48 49 C 48 51 48 50 50 50 Z M 45 61 C 45 50 45 35 45 25 C 45 22 47 20 50 20 C 53 20 55 22 55 25 C 55 35 55 50 55 61 C 58 63 60 66 60 70 C 60 76 56 80 50 80 C 44 80 40 76 40 70 C 40 66 42 63 45 61 Z",
			temperature3: "M 50 31 C 52 31 52 32 52 29 C 52 28 52 26 52 25 C 52 24 51 23 50 23 C 49 23 48 24 48 25 C 48 26 48 28 48 29 C 48 32 48 31 50 31 Z M 45 61 C 45 50 45 35 45 25 C 45 22 47 20 50 20 C 53 20 55 22 55 25 C 55 35 55 50 55 61 C 58 63 60 66 60 70 C 60 76 56 80 50 80 C 44 80 40 76 40 70 C 40 66 42 63 45 61 Z",
			temperature4: "M 45 61 C 45 50 45 35 45 25 C 45 22 47 20 50 20 C 53 20 55 22 55 25 C 55 35 55 50 55 61 C 58 63 60 66 60 70 C 60 76 56 80 50 80 C 44 80 40 76 40 70 C 40 66 42 63 45 61 Z",
			aurorae: "M 66 54 C 63 61 63 61 60 68 C 57 61 57 61 54 54 C 47 51 47 51 40 48 C 47 45 47 45 54 42 C 57 35 57 35 60 28 C 63 35 63 35 66 42 C 73 45 73 45 80 48 C 73 51 73 51 66 54 Z M 38 73 C 37 75 37 75 35 80 C 33 75 33 75 32 73 C 30 72 30 72 25 70 C 30 68 30 68 32 67 C 33 65 33 65 35 60 C 37 65 37 65 38 67 C 40 68 40 68 45 70 C 40 72 40 72 38 73 Z M 33 33 C 32 35 32 35 30 40 C 28 35 28 35 27 33 C 25 32 25 32 20 30 C 25 28 25 28 27 27 C 28 25 28 25 30 20 C 32 25 32 25 33 27 C 35 28 35 28 40 30 C 35 32 35 32 33 33 Z",
		}

	/* settings */
		const SETTINGS = {
			lastTouch: new Date().getTime(),
			timeTillDarken: 1000 * 10,
			darkenLoopInterval: 1000,
			margin: 2,
			floorOffset: 21
		}

	/* home */
		const HOME = {
			configuration: {
				ifttt_url: "https://maker.ifttt.com/trigger/bluejay_",
				ifttt_key: "/with/key/"
			},
			rooms: [
				// 1
				{
					name: "hall",
					background: "#854e36",
					top: 15 + SETTINGS.floorOffset,
					left: 0,
					width: 6,
					height: 10
				},
				{
					name: "living room",
					background: "#efe273",
					top: 15 + SETTINGS.floorOffset,
					left: 6,
					width: 10,
					height: 10
				},
				{
					name: "kitchen",
					background: "#a1444d",
					top: 5 + SETTINGS.floorOffset,
					left: 0,
					width: 10,
					height: 10
				},
				{
					name: "bathroom",
					background: "#f0a5dd",
					top: 5 + SETTINGS.floorOffset,
					left: 10,
					width: 6,
					height: 5
				},
				{
					name: "studio",
					background: "#d8b167",
					top: 10 + SETTINGS.floorOffset,
					left: 10,
					width: 6,
					height: 5
				},
				{
					name: "laundry room",
					background: "#dddddd",
					top: 0 + SETTINGS.floorOffset,
					left: 6,
					width: 10,
					height: 5
				},
				// 2
				{
					name: "stairs",
					background: "#854e36",
					top: 10,
					left: 0,
					width: 6,
					height: 4
				},
				{
					name: "bathroom",
					background: "#a477c5",
					top: 14,
					left: 0,
					width: 6,
					height: 6
				},
				{
					name: "guest room",
					background: "#85ba58",
					top: 10,
					left: 6,
					width: 10,
					height: 10
				},
				{
					name: "craft room",
					background: "#3b9791",
					top: 0,
					left: 0,
					width: 10,
					height: 10
				},
				{
					name: "bedroom",
					background: "#7445bf",
					top: 0,
					left: 10,
					width: 6,
					height: 5
				},
				{
					name: "office",
					background: "#04b1ff",
					top: 5,
					left: 10,
					width: 6,
					height: 5
				},
			],
			devices: [
				// philips hue			
					{
						name: "kitchen lights",
						svg: SVG.ceilingLight,
						top: 10 + SETTINGS.floorOffset,
						left: 5,
						buttons: {
							"on": ["ifttt_url||kitchen_lights_on||ifttt_key", SVG.check],
							"off": ["ifttt_url||kitchen_lights_off||ifttt_key", SVG.x]
						}
					},
					{
						name: "laundry room lights",
						svg: SVG.ceilingLight,
						top: 2.5 + SETTINGS.floorOffset,
						left: 11,
						buttons: {
							"on": ["ifttt_url||laundry_room_lights_on||ifttt_key", SVG.check],
							"off": ["ifttt_url||laundry_room_lights_off||ifttt_key", SVG.x]
						}
					},
					{
						name: "studio lights",
						svg: SVG.ceilingLight,
						top: 12.5 + SETTINGS.floorOffset,
						left: 13,
						buttons: {
							"on": ["ifttt_url||studio_lights_on||ifttt_key", SVG.check],
							"off": ["ifttt_url||studio_lights_off||ifttt_key", SVG.x]
						}
					},
					{
						name: "hall lamp",
						svg: SVG.floorLamp,
						top: 11.5,
						left: 2,
						buttons: {
							"on": ["ifttt_url||hall_lamp_on||ifttt_key", SVG.check],
							"off": ["ifttt_url||hall_lamp_off||ifttt_key", SVG.x]
						}
					},
					{
						name: "stair lamp",
						svg: SVG.floorLamp,
						top: 16.5 + SETTINGS.floorOffset,
						left: 2,
						buttons: {
							"on": ["ifttt_url||hall_lamp_on||ifttt_key", SVG.check],
							"off": ["ifttt_url||hall_lamp_off||ifttt_key", SVG.x]
						}
					},
					{
						name: "bedside lamp",
						svg: SVG.sideLamp,
						top: 1.5,
						left: 14.5,
						buttons: {
							"on": ["ifttt_url||bedside_lamp_on||ifttt_key", SVG.check],
							"off": ["ifttt_url||bedside_lamp_off||ifttt_key", SVG.x]
						}
					},
					{
						name: "craft room lamp",
						svg: SVG.floorLamp,
						top: 5,
						left: 5,
						buttons: {
							"on": ["ifttt_url||craft_room_lamp_on||ifttt_key", SVG.check],
							"off": ["ifttt_url||craft_room_lamp_off||ifttt_key", SVG.x]
						}
					},
					{
						name: "office lights",
						svg: SVG.ceilingLight,
						top: 6,
						left: 13,
						buttons: {
							"on": ["ifttt_url||office_lights_on||ifttt_key", SVG.check],
							"off": ["ifttt_url||office_lights_off||ifttt_key", SVG.x]
						}
					},
					{
						name: "guest room lights",
						svg: SVG.ceilingLight,
						top: 15,
						left: 11,
						buttons: {
							"on": ["ifttt_url||guest_room_lights_on||ifttt_key", SVG.check],
							"off": ["ifttt_url||guest_room_lights_off||ifttt_key", SVG.x]
						}
					},

				// roomba
					{
						name: "oscar",
						svg: SVG.vacuum,
						top: 2.5 + SETTINGS.floorOffset,
						left: 14.5,
						buttons: {
							"on": ["ifttt_url||vacuum_on||ifttt_key", SVG.check],
							"off": ["ifttt_url||vacuum_off||ifttt_key", SVG.x]
						}
					},

				// smartlife
					{
						name: "air purifier",
						svg: SVG.airPurifier,
						top: 18.5 + SETTINGS.floorOffset,
						left: 11,
						buttons: {
							"on": ["ifttt_url||air_purifier_on||ifttt_key", SVG.check],
							"off": ["ifttt_url||air_purifier_off||ifttt_key", SVG.x]
						}
					},
					{
						name: "living room lamp",
						svg: SVG.floorLamp,
						top: 16.5 + SETTINGS.floorOffset,
						left: 11,
						buttons: {
							"on": ["ifttt_url||living_room_lamp_on||ifttt_key", SVG.check],
							"off": ["ifttt_url||living_room_lamp_off||ifttt_key", SVG.x]
						}
					},
					{
						name: "living room string lights",
						svg: SVG.stringLights,
						top: 15 + SETTINGS.floorOffset,
						left: 8,
						buttons: {
							"on": ["ifttt_url||living_room_string_lights_on||ifttt_key", SVG.check],
							"off": ["ifttt_url||living_room_string_lights_off||ifttt_key", SVG.x]
						}
					},
					// {
					// 	name: "humidifier",
					// 	svg: SVG.humidifier,
					// 	top: 18.5 + SETTINGS.floorOffset,
					// 	left: 4.5,
					// 	buttons: {
					// 		"on": ["ifttt_url||humidifier_on||ifttt_key", SVG.check],
					// 		"off": ["ifttt_url||humidifier_off||ifttt_key", SVG.x]
					// 	}
					// },
					{
						name: "living room air conditioner",
						svg: SVG.airConditioner,
						top: 23.5 + SETTINGS.floorOffset,
						left: 14.5,
						buttons: {
							"on": ["ifttt_url||living_room_air_conditioner_on||ifttt_key", SVG.check],
							"off": ["ifttt_url||living_room_air_conditioner_off||ifttt_key", SVG.x]
						}
					},
					{
						name: "craft room air conditioner",
						svg: SVG.airConditioner,
						top: 1.5,
						left: 2,
						buttons: {
							"on": ["ifttt_url||craft_room_air_conditioner_on||ifttt_key", SVG.check],
							"off": ["ifttt_url||craft_room_air_conditioner_off||ifttt_key", SVG.x]
						}
					},
					{
						name: "craft room fan",
						svg: SVG.fan,
						top: 8.5,
						left: 8,
						buttons: {
							"on": ["ifttt_url||craft_room_fan_on||ifttt_key", SVG.check],
							"off": ["ifttt_url||craft_room_fan_off||ifttt_key", SVG.x]
						}
					},
					{
						name: "craft room string lights",
						svg: SVG.stringLights,
						top: 1.5,
						left: 8,
						buttons: {
							"on": ["ifttt_url||craft_room_string_lights_on||ifttt_key", SVG.check],
							"off": ["ifttt_url||craft_room_string_lights_off||ifttt_key", SVG.x]
						}
					},
					{
						name: "bedroom string lights",
						svg: SVG.stringLights,
						top: 4,
						left: 14.5,
						buttons: {
							"on": ["ifttt_url||bedroom_string_lights_on||ifttt_key", SVG.check],
							"off": ["ifttt_url||bedroom_string_lights_off||ifttt_key", SVG.x]
						}
					},
					{
						name: "guest room lamp",
						svg: SVG.floorLamp,
						top: 18.5,
						left: 11,
						buttons: {
							"on": ["ifttt_url||guest_room_lamp_on||ifttt_key", SVG.check],
							"off": ["ifttt_url||guest_room_lamp_off||ifttt_key", SVG.x]
						}
					},
					{
						name: "guest room fan",
						svg: SVG.fan,
						top: 15,
						left: 14.5,
						buttons: {
							"on": ["ifttt_url||guest_room_fan_on||ifttt_key", SVG.check],
							"off": ["ifttt_url||guest_room_fan_off||ifttt_key", SVG.x]
						}
					},
					{
						name: "guest room air conditioner",
						svg: SVG.airConditioner,
						top: 18.5,
						left: 14.5,
						buttons: {
							"on": ["ifttt_url||guest_room_air_conditioner_on||ifttt_key", SVG.check],
							"off": ["ifttt_url||guest_room_air_conditioner_off||ifttt_key", SVG.x]
						}
					},
					{
						name: "bathroom aurorae",
						svg: SVG.aurorae,
						top: 19,
						left: 4,
						buttons: {
							"on": ["ifttt_url||bathroom_aurorae_on||ifttt_key", SVG.check],
							"off": ["ifttt_url||bathroom_aurorae_off||ifttt_key", SVG.x]
						}
					},

				// sonos
					{
						name: "sonos",
						svg: SVG.music,
						top: 16.5 + SETTINGS.floorOffset,
						left: 14.5,
						buttons: {
							"play": ["ifttt_url||sonos_on||ifttt_key", SVG.play],
							"pause": ["ifttt_url||sonos_off||ifttt_key", SVG.pause],
							"up": ["ifttt_url||sonos_volume_up||ifttt_key", SVG.volumeUp],
							"down": ["ifttt_url||sonos_volume_down||ifttt_key", SVG.volumeDown]
						}
					},
					{
						name: "craft room speaker",
						svg: SVG.speaker,
						top: 8.5,
						left: 2,
						buttons: {
							"on": ["ifttt_url||craft_room_speaker_on||ifttt_key", SVG.check],
							"off": ["ifttt_url||craft_room_speaker_off||ifttt_key", SVG.x],
							"up": ["ifttt_url||craft_room_speaker_volume_up||ifttt_key", SVG.volumeUp],
							"down": ["ifttt_url||craft_room_speaker_volume_down||ifttt_key", SVG.volumeDown]
						}
					},
					{
						name: "living room speaker",
						svg: SVG.speaker,
						top: 23.5 + SETTINGS.floorOffset,
						left: 11,
						buttons: {
							"on": ["ifttt_url||living_room_speaker_on||ifttt_key", SVG.check],
							"off": ["ifttt_url||living_room_speaker_off||ifttt_key", SVG.x],
							"up": ["ifttt_url||living_room_speaker_volume_up||ifttt_key", SVG.volumeUp],
							"down": ["ifttt_url||living_room_speaker_volume_down||ifttt_key", SVG.volumeDown]
						}
					},
					{
						name: "guest room speaker",
						svg: SVG.speaker,
						top: 12,
						left: 14.5,
						buttons: {
							"on": ["ifttt_url||guest_room_speaker_on||ifttt_key", SVG.check],
							"off": ["ifttt_url||guest_room_speaker_off||ifttt_key", SVG.x],
							"up": ["ifttt_url||guest_room_speaker_volume_up||ifttt_key", SVG.volumeUp],
							"down": ["ifttt_url||guest_room_speaker_volume_down||ifttt_key", SVG.volumeDown]
						}
					},
					{
						name: "kitchen speaker",
						svg: SVG.speaker,
						top: 13 + SETTINGS.floorOffset,
						left: 2,
						buttons: {
							"on": ["ifttt_url||kitchen_speaker_on||ifttt_key", SVG.check],
							"off": ["ifttt_url||kitchen_speaker_off||ifttt_key", SVG.x],
							"up": ["ifttt_url||kitchen_speaker_volume_up||ifttt_key", SVG.volumeUp],
							"down": ["ifttt_url||kitchen_speaker_volume_down||ifttt_key", SVG.volumeDown]
						}
					},
					{
						name: "office speaker",
						svg: SVG.speaker,
						top: 8.5,
						left: 13,
						buttons: {
							"on": ["ifttt_url||office_speaker_on||ifttt_key", SVG.check],
							"off": ["ifttt_url||office_speaker_off||ifttt_key", SVG.x],
							"up": ["ifttt_url||office_speaker_volume_up||ifttt_key", SVG.volumeUp],
							"down": ["ifttt_url||office_speaker_volume_down||ifttt_key", SVG.volumeDown]
						}
					},
					// {
					// 	name: "roam",
					// 	svg: SVG.speaker,
					// 	top: 1.5,
					// 	left: 1.5,
					// 	buttons: {
					// 		"on": ["ifttt_url||roam_on||ifttt_key", SVG.check],
					// 		"off": ["ifttt_url||roam_off||ifttt_key", SVG.x],
					// 		"up": ["ifttt_url||roam_volume_up||ifttt_key", SVG.volumeUp],
					// 		"down": ["ifttt_url||roam_volume_down||ifttt_key", SVG.volumeDown]
					// 	}
					// },
					{
						name: "record player",
						svg: SVG.recordPlayer,
						top: 19.5 + SETTINGS.floorOffset,
						left: 15,
						buttons: {
							"target": ["ifttt_url||record_player_on||ifttt_key", SVG.record]
						}
					},

				// honeywell
					// {
					// 	name: "thermostat",
					// 	svg: SVG.furnace,
					// 	top: 37,
					// 	left: 6,
					// 	buttons: {
					// 		"65": ["ifttt_url||thermostat_to||ifttt_key||?value1=65", SVG.temperature1],
					// 		"68": ["ifttt_url||thermostat_to||ifttt_key||?value1=68", SVG.temperature2],
					// 		"70": ["ifttt_url||thermostat_to||ifttt_key||?value1=70", SVG.temperature3],
					// 		"72": ["ifttt_url||thermostat_to||ifttt_key||?value1=72", SVG.temperature4]
					// 	}
					// }
			]
		}

	/* elements */
		const ELEMENTS = {
			body: document.querySelector("body"),
			home: document.querySelector("#home"),
			rooms: document.querySelector("#rooms"),
			devices: document.querySelector("#devices"),
			iframe: document.querySelector("#iframe"),
			jlogo: document.querySelector("#j-logo"),
			about: document.querySelector("#about"),
			aboutClose: document.querySelector("#about-close"),
			flip: document.querySelector("#flip"),
			fullscreenOn: document.querySelector("#full-screen-on"),
			fullscreenOff: document.querySelector("#full-screen-off"),
			overlay: document.querySelector("#full-screen-overlay")
		}

/*** layout ***/
	/* buildHome */
		buildHome()
		function buildHome() {
			try {
				// get configuration
					updateConfiguration()

				// update urls
					for (let i in HOME.devices) {
						updateURLs(HOME.devices[i])
					}

				// build rooms
					for (let i in HOME.rooms) {
						buildRoom(HOME.rooms[i])
					}

				// build devices
					for (let i in HOME.devices) {
						buildDevice(HOME.devices[i])
					}
			} catch (error) {console.log(error)}
		}

	/* updateConfiguration */
		function updateConfiguration() {
			try {
				// no parameters
					if (!window.location.search || !window.location.search.length) {
						return
					}

				// get parameters
					let parameters = window.location.search.slice(1).split("&")
					for (let i in parameters) {
						let pair = parameters[i].split("=")
						
						if (HOME.configuration[pair[0]]) {
							HOME.configuration[pair[0]] += pair[1]
						}
						else {
							HOME.configuration[pair[0]] = pair[1]
						}

						// ifttt key
							if (pair[0] == "ifttt_key") {
								ELEMENTS.jlogo.setAttribute("invisible", true)
								ELEMENTS.about.setAttribute("invisible", true)
								ELEMENTS.overlay.removeAttribute("invisible")
							}
					}
			} catch (error) {console.log(error)}
		}

	/* updateURLs */
		function updateURLs(device) {
			try {
				// loop through buttons
					for (let i in device.buttons) {
						// chunk
							let URLchunks = device.buttons[i][0].split("||")
						
						// loop through chunks
							for (let j in URLchunks) {
								if (HOME.configuration[URLchunks[j]]) {
									URLchunks[j] = HOME.configuration[URLchunks[j]]
								}
							}

						// put back
							device.buttons[i][0] = URLchunks.join("")
					}
			} catch (error) {console.log(error)}
		}

	/* buildRoom */
		function buildRoom(room) {
			try {
				// create element
					let roomElement = document.createElement("div")
						roomElement.className = "room"
						roomElement.style.background = room.background
						roomElement.style.top = "calc(" + (room.top + SETTINGS.margin) + " * var(--foot))"
						roomElement.style.left = "calc(" + room.left + " * var(--foot) / var(--house-width-height-ratio))"
						roomElement.style.height = "calc(" + room.height + " * var(--foot))"
						roomElement.style.width = "calc(" + room.width + " * var(--foot) / var(--house-width-height-ratio))"
					ELEMENTS.rooms.appendChild(roomElement)

				// name
					let nameElement = document.createElement("div")
						nameElement.className = "room-name"
						nameElement.innerText = room.name
					roomElement.appendChild(nameElement)

				// save to home
					room.element = roomElement
			} catch (error) {console.log(error)}
		}

	/* buildDevice */
		function buildDevice(device) {
			try {
				// create element
					let deviceElement = document.createElement("div")
						deviceElement.className = "device"
						deviceElement.style.top = "calc(" + (device.top + SETTINGS.margin) + " * var(--foot))"
						deviceElement.style.left = "calc(" + device.left + " * var(--foot) / var(--house-width-height-ratio))"
					ELEMENTS.devices.appendChild(deviceElement)

				// image
					let imageElement = document.createElementNS("http://www.w3.org/2000/svg", "svg")
						imageElement.setAttribute("viewBox", "10 10 80 80")
						imageElement.setAttribute("class", "device-image")
					deviceElement.appendChild(imageElement)

					let imagePath = document.createElementNS("http://www.w3.org/2000/svg", "path")
						imagePath.setAttribute("d", device.svg)
					imageElement.appendChild(imagePath)

				// buttons
					for (let i in device.buttons) {
						const buttonURL = device.buttons[i][0]
						const buttonSVG = device.buttons[i][1]

						let button = document.createElement("button")
							button.className = "device-button device-" + i
							button.setAttribute("url", buttonURL)
							button.addEventListener("click", triggerDevice)
						deviceElement.appendChild(button)

						let buttonImage = document.createElementNS("http://www.w3.org/2000/svg", "svg")
							buttonImage.setAttribute("viewBox", "10 10 80 80")
							buttonImage.setAttribute("class", "icon")
						button.appendChild(buttonImage)

						let buttonPath = document.createElementNS("http://www.w3.org/2000/svg", "path")
							buttonPath.setAttribute("d", buttonSVG)
						buttonImage.appendChild(buttonPath)
					}

				// save to home
					device.element = deviceElement
			} catch (error) {console.log(error)}
		}

/*** interaction ***/
	/* triggerDevice */
		function triggerDevice(event) {
			try {
				// set last touch
					SETTINGS.lastTouch = new Date().getTime()

				// get element
					let deviceButton = event.target.closest("button")
						deviceButton.blur()
					let url = deviceButton.getAttribute("url")

				// send request
					let request = new XMLHttpRequest()
						request.open("HEAD", url, true)
						request.onload = function() {}
						request.onerror = function() {}
						request.send()				
			} catch (error) {}
		}

	/* closeAbout */
		ELEMENTS.aboutClose.addEventListener("click", closeAbout)
		function closeAbout(event) {
			try {
				// set last touch
					SETTINGS.lastTouch = new Date().getTime()
					
				// update about
					ELEMENTS.about.removeAttribute("open")
			} catch (error) {}
		}

	/* flip */
		ELEMENTS.flip.addEventListener("click", flip)
		function flip(event) {
			try {
				// set last touch
					SETTINGS.lastTouch = new Date().getTime()

				// get current flip
					let flipState = ELEMENTS.home.getAttribute("flip")

				// set
					if (flipState) {
						ELEMENTS.home.removeAttribute("flip")
					}
					else {
						ELEMENTS.home.setAttribute("flip", true)
					}

				// blur
					let flipButton = event.target.closest("button")
						flipButton.blur()
			} catch (error) {}
		}

	/* goFullScreen */
		ELEMENTS.fullscreenOn.addEventListener("click", goFullScreen)
		function goFullScreen() {
			try {
				// set last touch
					SETTINGS.lastTouch = new Date().getTime()

				// swap buttons
					ELEMENTS.fullscreenOn.setAttribute("invisible", true)
					ELEMENTS.fullscreenOff.removeAttribute("invisible")

				// change fullscreen
					ELEMENTS.body.requestFullscreen()
			} catch (error) {}
		}

	/* exitFullScreen */
		ELEMENTS.fullscreenOff.addEventListener("click", exitFullScreen)
		function exitFullScreen() {
			try {
				// set last touch
					SETTINGS.lastTouch = new Date().getTime()
					
				// swap buttons
					ELEMENTS.fullscreenOff.setAttribute("invisible", true)
					ELEMENTS.fullscreenOn.removeAttribute("invisible")

				// change fullscreen
					document.exitFullscreen()
			} catch (error) {}
		}

	/* inactiveloop */
		SETTINGS.inactiveLoop = setInterval(darkenScreen, SETTINGS.darkenLoopInterval)
		function darkenScreen() {
			try {
				// last touch
					if (new Date().getTime() - SETTINGS.lastTouch < SETTINGS.timeTillDarken) {
						return
					}

				// already dark
					if (ELEMENTS.overlay.getAttribute("darken")) {
						return
					}

				// darken
					ELEMENTS.overlay.setAttribute("darken", true)
					clearInterval(SETTINGS.inactiveLoop)
			} catch (error) {}
		}

	/* rebrightenScreen */
		ELEMENTS.overlay.addEventListener("click", rebrightenScreen)
		function rebrightenScreen() {
			try {
				// set last touch
					SETTINGS.lastTouch = new Date().getTime()

				// lighten
					ELEMENTS.overlay.removeAttribute("darken")

				// restart loop
					clearInterval(SETTINGS.inactiveLoop)
					SETTINGS.inactiveLoop = setInterval(darkenScreen, SETTINGS.darkenLoopInterval)
			} catch (error) {}
		}
