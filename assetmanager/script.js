/*** globals ***/
	/* triggers */
		const TRIGGERS = {
			click: "click",
			input: "input",
			change: "change",
			dragover: "dragover",
			drop: "drop",
			message: "message"
		}
	
	/* elements */
		const ELEMENTS = {
			body: document.body,
			controls: {
				element: document.querySelector("#controls"),
				upload: document.querySelector("#controls-upload"),
				paste: document.querySelector("#controls-paste"),
				search: document.querySelector("#controls-search"),
				reset: document.querySelector("#controls-search-reset"),
				filter: document.querySelector("#controls-filter"),
				sort: document.querySelector("#controls-sort"),
				refresh: document.querySelector("#controls-refresh")
			},
			gauge: document.querySelector("#gauge"),
			assets: {
				element: document.querySelector("#assets"),
				empty: document.querySelector("#empty")
			},
			iframe: {
				jlogo: document.querySelector("#j-logo"),
				close: document.querySelector("#controls-close"),
				exportBar: document.querySelector("#export-bar"),
			}
		}

	/* constants */
		const CONSTANTS = {
			bytesPerKilobyte: 1000, // bytes
			nameCharacters: 20, // characters
			identifiers: {
				html: `<!doctype html`,
				xml: `<?xml`,
				svg: `<svg`
			},
			schema: {
				name: "",
				project: "", // optional
				type: "",
				timestamp: 0, // ms
				data: "",
				id: "", // calculated
				size: 0, // calculated
				element: null, // calculated
			},
			activeTimeout: 1000, // ms
			storageLimit: 2500000, // characters
			search: "",
			filter: "all",
			sort: "project-descending",
			types: {
				// image
					bmp:      ["image", "image/bmp", `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="10 10 80 80"><path fill="#bbbbbb" d="M 43 54 C 43 54 43 54 46 49 C 49 44 49 44 52 49 C 52 49 55 54 55 54 C 58 59 58 59 59.5 56.5 C 61 54 61 54 64 59 C 64 59 67 64 67 64 C 70 69 70 70 73 70 C 74 70 75 69 75 68 C 75 55 75 45 75 32 C 75 31 74 30 73 30 C 58 30 42 30 27 30 C 26 30 25 31 25 32 C 25 44 25 53 25 64 C 28 59 28 59 31 54 C 34 49 34 49 37 54 C 40 59 40 59 43 54 Z M 59 40 C 59 37 62 34 65 34 C 68 34 71 37 71 40 C 71 43 68 46 65 46 C 62 46 59 43 59 40 Z M 20 69 C 20 55 20 45 20 31 C 20 28 23 25 26 25 C 42 25 58 25 74 25 C 77 25 80 28 80 31 C 80 45 80 55 80 69 C 80 72 77 75 74 75 C 58 75 42 75 26 75 C 23 75 20 72 20 69 Z"></path></svg>`],
					gif:      ["image", "image/gif", `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="10 10 80 80"><path fill="#bbbbbb" d="M 43 54 C 43 54 43 54 46 49 C 49 44 49 44 52 49 C 52 49 55 54 55 54 C 58 59 58 59 59.5 56.5 C 61 54 61 54 64 59 C 64 59 67 64 67 64 C 70 69 70 70 73 70 C 74 70 75 69 75 68 C 75 55 75 45 75 32 C 75 31 74 30 73 30 C 58 30 42 30 27 30 C 26 30 25 31 25 32 C 25 44 25 53 25 64 C 28 59 28 59 31 54 C 34 49 34 49 37 54 C 40 59 40 59 43 54 Z M 59 40 C 59 37 62 34 65 34 C 68 34 71 37 71 40 C 71 43 68 46 65 46 C 62 46 59 43 59 40 Z M 20 69 C 20 55 20 45 20 31 C 20 28 23 25 26 25 C 42 25 58 25 74 25 C 77 25 80 28 80 31 C 80 45 80 55 80 69 C 80 72 77 75 74 75 C 58 75 42 75 26 75 C 23 75 20 72 20 69 Z"></path></svg>`],
					iso:      ["image", "image/iso", `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="10 10 80 80"><path fill="#bbbbbb" d="M 43 54 C 43 54 43 54 46 49 C 49 44 49 44 52 49 C 52 49 55 54 55 54 C 58 59 58 59 59.5 56.5 C 61 54 61 54 64 59 C 64 59 67 64 67 64 C 70 69 70 70 73 70 C 74 70 75 69 75 68 C 75 55 75 45 75 32 C 75 31 74 30 73 30 C 58 30 42 30 27 30 C 26 30 25 31 25 32 C 25 44 25 53 25 64 C 28 59 28 59 31 54 C 34 49 34 49 37 54 C 40 59 40 59 43 54 Z M 59 40 C 59 37 62 34 65 34 C 68 34 71 37 71 40 C 71 43 68 46 65 46 C 62 46 59 43 59 40 Z M 20 69 C 20 55 20 45 20 31 C 20 28 23 25 26 25 C 42 25 58 25 74 25 C 77 25 80 28 80 31 C 80 45 80 55 80 69 C 80 72 77 75 74 75 C 58 75 42 75 26 75 C 23 75 20 72 20 69 Z"></path></svg>`],
					jpg:      ["image", "image/jpeg", `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="10 10 80 80"><path fill="#bbbbbb" d="M 43 54 C 43 54 43 54 46 49 C 49 44 49 44 52 49 C 52 49 55 54 55 54 C 58 59 58 59 59.5 56.5 C 61 54 61 54 64 59 C 64 59 67 64 67 64 C 70 69 70 70 73 70 C 74 70 75 69 75 68 C 75 55 75 45 75 32 C 75 31 74 30 73 30 C 58 30 42 30 27 30 C 26 30 25 31 25 32 C 25 44 25 53 25 64 C 28 59 28 59 31 54 C 34 49 34 49 37 54 C 40 59 40 59 43 54 Z M 59 40 C 59 37 62 34 65 34 C 68 34 71 37 71 40 C 71 43 68 46 65 46 C 62 46 59 43 59 40 Z M 20 69 C 20 55 20 45 20 31 C 20 28 23 25 26 25 C 42 25 58 25 74 25 C 77 25 80 28 80 31 C 80 45 80 55 80 69 C 80 72 77 75 74 75 C 58 75 42 75 26 75 C 23 75 20 72 20 69 Z"></path></svg>`],
					png:      ["image", "image/png", `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="10 10 80 80"><path fill="#bbbbbb" d="M 43 54 C 43 54 43 54 46 49 C 49 44 49 44 52 49 C 52 49 55 54 55 54 C 58 59 58 59 59.5 56.5 C 61 54 61 54 64 59 C 64 59 67 64 67 64 C 70 69 70 70 73 70 C 74 70 75 69 75 68 C 75 55 75 45 75 32 C 75 31 74 30 73 30 C 58 30 42 30 27 30 C 26 30 25 31 25 32 C 25 44 25 53 25 64 C 28 59 28 59 31 54 C 34 49 34 49 37 54 C 40 59 40 59 43 54 Z M 59 40 C 59 37 62 34 65 34 C 68 34 71 37 71 40 C 71 43 68 46 65 46 C 62 46 59 43 59 40 Z M 20 69 C 20 55 20 45 20 31 C 20 28 23 25 26 25 C 42 25 58 25 74 25 C 77 25 80 28 80 31 C 80 45 80 55 80 69 C 80 72 77 75 74 75 C 58 75 42 75 26 75 C 23 75 20 72 20 69 Z"></path></svg>`],
					svg:      ["image", "image/svg+xml", `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="10 10 80 80"><path fill="#bbbbbb" d="M 43 54 C 43 54 43 54 46 49 C 49 44 49 44 52 49 C 52 49 55 54 55 54 C 58 59 58 59 59.5 56.5 C 61 54 61 54 64 59 C 64 59 67 64 67 64 C 70 69 70 70 73 70 C 74 70 75 69 75 68 C 75 55 75 45 75 32 C 75 31 74 30 73 30 C 58 30 42 30 27 30 C 26 30 25 31 25 32 C 25 44 25 53 25 64 C 28 59 28 59 31 54 C 34 49 34 49 37 54 C 40 59 40 59 43 54 Z M 59 40 C 59 37 62 34 65 34 C 68 34 71 37 71 40 C 71 43 68 46 65 46 C 62 46 59 43 59 40 Z M 20 69 C 20 55 20 45 20 31 C 20 28 23 25 26 25 C 42 25 58 25 74 25 C 77 25 80 28 80 31 C 80 45 80 55 80 69 C 80 72 77 75 74 75 C 58 75 42 75 26 75 C 23 75 20 72 20 69 Z"></path></svg>`],
					tiff:     ["image", "image/tiff", `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="10 10 80 80"><path fill="#bbbbbb" d="M 43 54 C 43 54 43 54 46 49 C 49 44 49 44 52 49 C 52 49 55 54 55 54 C 58 59 58 59 59.5 56.5 C 61 54 61 54 64 59 C 64 59 67 64 67 64 C 70 69 70 70 73 70 C 74 70 75 69 75 68 C 75 55 75 45 75 32 C 75 31 74 30 73 30 C 58 30 42 30 27 30 C 26 30 25 31 25 32 C 25 44 25 53 25 64 C 28 59 28 59 31 54 C 34 49 34 49 37 54 C 40 59 40 59 43 54 Z M 59 40 C 59 37 62 34 65 34 C 68 34 71 37 71 40 C 71 43 68 46 65 46 C 62 46 59 43 59 40 Z M 20 69 C 20 55 20 45 20 31 C 20 28 23 25 26 25 C 42 25 58 25 74 25 C 77 25 80 28 80 31 C 80 45 80 55 80 69 C 80 72 77 75 74 75 C 58 75 42 75 26 75 C 23 75 20 72 20 69 Z"></path></svg>`],
					webp:     ["image", "image/webp", `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="10 10 80 80"><path fill="#bbbbbb" d="M 43 54 C 43 54 43 54 46 49 C 49 44 49 44 52 49 C 52 49 55 54 55 54 C 58 59 58 59 59.5 56.5 C 61 54 61 54 64 59 C 64 59 67 64 67 64 C 70 69 70 70 73 70 C 74 70 75 69 75 68 C 75 55 75 45 75 32 C 75 31 74 30 73 30 C 58 30 42 30 27 30 C 26 30 25 31 25 32 C 25 44 25 53 25 64 C 28 59 28 59 31 54 C 34 49 34 49 37 54 C 40 59 40 59 43 54 Z M 59 40 C 59 37 62 34 65 34 C 68 34 71 37 71 40 C 71 43 68 46 65 46 C 62 46 59 43 59 40 Z M 20 69 C 20 55 20 45 20 31 C 20 28 23 25 26 25 C 42 25 58 25 74 25 C 77 25 80 28 80 31 C 80 45 80 55 80 69 C 80 72 77 75 74 75 C 58 75 42 75 26 75 C 23 75 20 72 20 69 Z"></path></svg>`],

				// data
					csv:      ["data",  "text/csv", `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="10 10 80 80"><path fill="#bbbbbb" d="M 61 30 C 63 30 64 30 65 30 C 65 30 60 25 60 25 C 60 26 60 27 60 29 C 60 30 60 30 61 30 Z M 37 25 C 36 25 35 26 35 27 C 35 42 35 58 35 73 C 35 74 36 75 37 75 C 45 75 55 75 63 75 C 64 75 65 74 65 73 C 65 58 65 40 65 36 C 65 35 65 35 64 35 C 63 35 61 35 59 35 C 57 35 55 33 55 31 C 55 29 55 27 55 26 C 55 25 55 25 54 25 C 50 25 40 25 37 25 Z M 37 40 C 37 38 37 38 39 38 C 47 38 53 38 61 38 C 63 38 63 38 63 40 C 63 42 63 42 61 42 C 53 42 47 42 39 42 C 37 42 37 42 37 40 Z M 39 47 C 45 47 55 47 61 47 C 63 47 63 47 63 49 C 63 55 63 65 63 71 C 63 73 63 73 61 73 C 55 73 45 73 39 73 C 37 73 37 73 37 71 C 37 65 37 55 37 49 C 37 47 37 47 39 47 Z M 36 20 C 45 20 55 20 58 20 C 61 20 70 29 70 32 C 70 42 70 58 70 74 C 70 77 67 80 64 80 C 55 80 45 80 36 80 C 33 80 30 77 30 74 C 30 58 30 42 30 26 C 30 23 33 20 36 20 Z M 45 65 C 43 65 41 65 39 65 C 39 67 39 69 39 71 C 41 71 43 71 45 71 C 45 69 45 67 45 65 Z M 53 65 C 51 65 49 65 47 65 C 47 67 47 69 47 71 C 49 71 51 71 53 71 C 53 69 53 67 53 65 Z M 61 65 C 59 65 57 65 55 65 C 55 67 55 69 55 71 C 57 71 59 71 61 71 C 61 69 61 67 61 65 Z M 45 57 C 43 57 41 57 39 57 C 39 59 39 61 39 63 C 41 63 43 63 45 63 C 45 61 45 59 45 57 Z M 53 57 C 51 57 49 57 47 57 C 47 59 47 61 47 63 C 49 63 51 63 53 63 C 53 61 53 59 53 57 Z M 61 57 C 59 57 57 57 55 57 C 55 59 55 61 55 63 C 57 63 59 63 61 63 C 61 61 61 59 61 57 Z M 45 49 C 43 49 41 49 39 49 C 39 51 39 53 39 55 C 41 55 43 55 45 55 C 45 53 45 51 45 49 Z M 53 49 C 51 49 49 49 47 49 C 47 51 47 53 47 55 C 49 55 51 55 53 55 C 53 53 53 51 53 49 Z M 61 49 C 59 49 57 49 55 49 C 55 51 55 53 55 55 C 57 55 59 55 61 55 C 61 53 61 51 61 49 Z"></path></svg>`],
					json:     ["data",  "application/json", `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="10 10 80 80"><path fill="#bbbbbb" d="M 33 35 C 30 35 28 35 25 35 C 22 35 20 33 20 30 C 20 27 22 25 25 25 C 40 25 60 25 74 25 C 78 25 80 27 80 30 C 80 33 78 35 75 35 C 64 35 50 35 37 35 C 37 39 37 43 37 48 C 38 48 39 48 40 48 C 40 48 41 45 45 45 C 55 45 65 45 75 45 C 78 45 80 47 80 50 C 80 53 78 55 75 55 C 65 55 55 55 45 55 C 41 55 40 52 40 52 C 39 52 38 52 37 52 C 37 58 37 63 37 68 C 38 68 39 68 40 68 C 40 68 41 65 45 65 C 55 65 65 65 75 65 C 78 65 80 67 80 70 C 80 73 78 75 75 75 C 65 75 55 75 45 75 C 41 75 40 72 40 72 C 38 72 37 72 35 72 C 34 72 33 71 33 70 C 33 70 33 70 33 70 C 33 70 33 69 33 69 C 33 59 33 46 33 35 Z"></path></svg>`],
					musicxml: ["data",  "application/vnd.recordare.musicxml+xml", `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="#bbbbbb" d="M 30 14 C 30 12 32 10 34 10 C 50 10 70 10 86 10 C 88 10 90 12 90 14 C 90 30 90 60 90 75 C 90 83 83 90 75 90 C 67 90 60 83 60 75 C 60 67 67 60 75 60 C 77 60 77 60 79 60.5 C 80 61 80 60 80 58 C 80 50 80 30 80 22 C 80 21 79 20 78 20 C 70 20 50 20 42 20 C 41 20 40 21 40 22 C 40 30 40 60 40 75 C 40 83 33 90 25 90 C 17 90 10 83 10 75 C 10 67 17 60 25 60 C 27 60 27 60 29 60.5 C 30 61 30 60 30 58 C 30 50 30 40 30 14 Z"></path></svg>`],
					pdf:      ["data",  "application/pdf", `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="#bbbbbb" d="M 37 25 C 36 25 35 26 35 27 C 35 42 35 58 35 73 C 35 74 36 75 37 75 C 45 75 55 75 63 75 C 64 75 65 74 65 73 C 65 58 65 40 65 36 C 65 35 65 35 64 35 C 63 35 61 35 59 35 C 57 35 55 33 55 31 C 55 29 55 27 55 26 C 55 25 55 25 54 25 C 50 25 40 25 37 25 Z M 61 30 C 63 30 64 30 65 30 C 65 30 60 25 60 25 C 60 26 60 27 60 29 C 60 30 60 30 61 30 Z M 36 20 C 45 20 55 20 58 20 C 61 20 70 29 70 32 C 70 42 70 58 70 74 C 70 77 67 80 64 80 C 55 80 45 80 36 80 C 33 80 30 77 30 74 C 30 58 30 42 30 26 C 30 23 33 20 36 20 Z"></path></svg>`],
					rtf:      ["data",  "application/rtf", `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="10 10 80 80"><path fill="#bbbbbb" d="M 61 30 C 63 30 64 30 65 30 C 65 30 60 25 60 25 C 60 26 60 27 60 29 C 60 30 60 30 61 30 Z M 37 25 C 36 25 35 26 35 27 C 35 42 35 58 35 73 C 35 74 36 75 37 75 C 45 75 55 75 63 75 C 64 75 65 74 65 73 C 65 58 65 40 65 36 C 65 35 65 35 64 35 C 63 35 61 35 59 35 C 57 35 55 33 55 31 C 55 29 55 27 55 26 C 55 25 55 25 54 25 C 50 25 40 25 37 25 Z M 60 65 C 60 66 59 67 58 67 C 52 67 48 67 42 67 C 41 67 40 66 40 65 C 40 64 41 63 42 63 C 48 63 52 63 58 63 C 59 63 60 64 60 65 Z M 60 55 C 60 56 59 57 58 57 C 52 57 48 57 42 57 C 41 57 40 56 40 55 C 40 54 41 53 42 53 C 48 53 52 53 58 53 C 59 53 60 54 60 55 Z M 60 45 C 60 46 59 47 58 47 C 52 47 48 47 42 47 C 41 47 40 46 40 45 C 40 44 41 43 42 43 C 48 43 52 43 58 43 C 59 43 60 44 60 45 Z M 50 35 C 50 36 49 37 48 37 C 46 37 44 37 42 37 C 41 37 40 36 40 35 C 40 34 41 33 42 33 C 44 33 46 33 48 33 C 49 33 50 34 50 35 Z M 36 20 C 45 20 55 20 58 20 C 61 20 70 29 70 32 C 70 42 70 58 70 74 C 70 77 67 80 64 80 C 55 80 45 80 36 80 C 33 80 30 77 30 74 C 30 58 30 42 30 26 C 30 23 33 20 36 20 Z"></path></svg>`],
					txt:      ["data",  "text/plain", `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="10 10 80 80"><path fill="#bbbbbb" d="M 61 30 C 63 30 64 30 65 30 C 65 30 60 25 60 25 C 60 26 60 27 60 29 C 60 30 60 30 61 30 Z M 37 25 C 36 25 35 26 35 27 C 35 42 35 58 35 73 C 35 74 36 75 37 75 C 45 75 55 75 63 75 C 64 75 65 74 65 73 C 65 58 65 40 65 36 C 65 35 65 35 64 35 C 63 35 61 35 59 35 C 57 35 55 33 55 31 C 55 29 55 27 55 26 C 55 25 55 25 54 25 C 50 25 40 25 37 25 Z M 60 65 C 60 66 59 67 58 67 C 52 67 48 67 42 67 C 41 67 40 66 40 65 C 40 64 41 63 42 63 C 48 63 52 63 58 63 C 59 63 60 64 60 65 Z M 60 55 C 60 56 59 57 58 57 C 52 57 48 57 42 57 C 41 57 40 56 40 55 C 40 54 41 53 42 53 C 48 53 52 53 58 53 C 59 53 60 54 60 55 Z M 60 45 C 60 46 59 47 58 47 C 52 47 48 47 42 47 C 41 47 40 46 40 45 C 40 44 41 43 42 43 C 48 43 52 43 58 43 C 59 43 60 44 60 45 Z M 50 35 C 50 36 49 37 48 37 C 46 37 44 37 42 37 C 41 37 40 36 40 35 C 40 34 41 33 42 33 C 44 33 46 33 48 33 C 49 33 50 34 50 35 Z M 36 20 C 45 20 55 20 58 20 C 61 20 70 29 70 32 C 70 42 70 58 70 74 C 70 77 67 80 64 80 C 55 80 45 80 36 80 C 33 80 30 77 30 74 C 30 58 30 42 30 26 C 30 23 33 20 36 20 Z"></path></svg>`],
					xml:      ["data",  "application/xml", `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="10 10 80 80"><path fill="#bbbbbb" d="M 37 25 C 36 25 35 26 35 27 C 35 42 35 58 35 73 C 35 74 36 75 37 75 C 45 75 55 75 63 75 C 64 75 65 74 65 73 C 65 58 65 40 65 36 C 65 35 65 35 64 35 C 63 35 61 35 59 35 C 57 35 55 33 55 31 C 55 29 55 27 55 26 C 55 25 55 25 54 25 C 50 25 40 25 37 25 Z M 61 30 C 63 30 64 30 65 30 C 65 30 60 25 60 25 C 60 26 60 27 60 29 C 60 30 60 30 61 30 Z M 36 20 C 45 20 55 20 58 20 C 61 20 70 29 70 32 C 70 42 70 58 70 74 C 70 77 67 80 64 80 C 55 80 45 80 36 80 C 33 80 30 77 30 74 C 30 58 30 42 30 26 C 30 23 33 20 36 20 Z M 43 51 C 41 53 41 53 43 55 C 44 56 44 56 45 57 C 46 58 44 60 43 59 C 42 58 40 56 39 55 C 38 54 38 52 39 51 C 40 50 42 48 43 47 C 44 46 46 48 45 49 C 44 50 44 50 43 51 Z M 49 63 C 48 66 45 65 46 62 C 47 58 50 47 51 43 C 52 40 55 41 54 44 C 53 48 50 59 49 63 Z M 57 55 C 59 53 59 53 57 51 C 56 50 56 50 55 49 C 54 48 56 46 57 47 C 58 48 60 50 61 51 C 62 52 62 54 61 55 C 60 56 58 58 57 59 C 56 60 54 58 55 57 C 56 56 56 56 57 55 Z"></path></svg>`],

				// code
					css:      ["code",  "text/css", `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="10 10 80 80"><path fill="#bbbbbb" d="M 20 70 C 20 67 22 65 25 65 C 28 65 30 67 30 70 C 30 73 28 75 25 75 C 22 75 20 73 20 70 Z M 20 50 C 20 47 22 45 25 45 C 28 45 30 47 30 50 C 30 53 28 55 25 55 C 22 55 20 53 20 50 Z M 20 30 C 20 27 22 25 25 25 C 28 25 30 27 30 30 C 30 33 28 35 25 35 C 22 35 20 33 20 30 Z M 40 70 C 40 67 42 65 45 65 C 50 65 70 65 75 65 C 78 65 80 67 80 70 C 80 73 78 75 75 75 C 70 75 50 75 45 75 C 42 75 40 73 40 70 Z M 40 50 C 40 47 42 45 45 45 C 50 45 70 45 75 45 C 78 45 80 47 80 50 C 80 53 78 55 75 55 C 70 55 50 55 45 55 C 42 55 40 53 40 50 Z M 40 30 C 40 27 42 25 45 25 C 50 25 70 25 75 25 C 78 25 80 27 80 30 C 80 33 78 35 75 35 C 70 35 50 35 45 35 C 42 35 40 33 40 30 Z"></path></svg>`],
					html:     ["code",  "text/html", `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="10 10 80 80"><path fill="#bbbbbb" d="M 37 25 C 36 25 35 26 35 27 C 35 42 35 58 35 73 C 35 74 36 75 37 75 C 45 75 55 75 63 75 C 64 75 65 74 65 73 C 65 58 65 40 65 36 C 65 35 65 35 64 35 C 63 35 61 35 59 35 C 57 35 55 33 55 31 C 55 29 55 27 55 26 C 55 25 55 25 54 25 C 50 25 40 25 37 25 Z M 61 30 C 63 30 64 30 65 30 C 65 30 60 25 60 25 C 60 26 60 27 60 29 C 60 30 60 30 61 30 Z M 36 20 C 45 20 55 20 58 20 C 61 20 70 29 70 32 C 70 42 70 58 70 74 C 70 77 67 80 64 80 C 55 80 45 80 36 80 C 33 80 30 77 30 74 C 30 58 30 42 30 26 C 30 23 33 20 36 20 Z M 43 51 C 41 53 41 53 43 55 C 44 56 44 56 45 57 C 46 58 44 60 43 59 C 42 58 40 56 39 55 C 38 54 38 52 39 51 C 40 50 42 48 43 47 C 44 46 46 48 45 49 C 44 50 44 50 43 51 Z M 49 63 C 48 66 45 65 46 62 C 47 58 50 47 51 43 C 52 40 55 41 54 44 C 53 48 50 59 49 63 Z M 57 55 C 59 53 59 53 57 51 C 56 50 56 50 55 49 C 54 48 56 46 57 47 C 58 48 60 50 61 51 C 62 52 62 54 61 55 C 60 56 58 58 57 59 C 56 60 54 58 55 57 C 56 56 56 56 57 55 Z"></path></svg>`],
					js:       ["code",  "text/javascript", `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="10 10 80 80"><path fill="#bbbbbb" d="M 30 25 C 28 25 25 27 25 30 C 25 33 28 35 32 36 C 32 32 32 26 32 28 C 32 29 32 25 30 25 Z M 70 75 C 72 75 75 73 75 70 C 75 67 72 65 68 64 C 68 68 68 71 68 72 C 68 74 68 75 70 75 Z M 37 27 C 37 40 37 60 37 70 C 37 72 40 75 42 75 C 50 75 56 75 63 75 C 66 75 63 78 63 73 C 63 60 63 40 63 30 C 63 28 60 25 58 25 C 50 25 44 25 37 25 C 34 25 37 22 37 27 Z M 60 55 C 60 56 59 57 58 57 C 52 57 48 57 42 57 C 41 57 40 56 40 55 C 40 54 41 53 42 53 C 48 53 52 53 58 53 C 59 53 60 54 60 55 Z M 60 65 C 60 66 59 67 58 67 C 52 67 48 67 42 67 C 41 67 40 66 40 65 C 40 64 41 63 42 63 C 48 63 52 63 58 63 C 59 63 60 64 60 65 Z M 60 35 C 60 36 59 37 58 37 C 52 37 48 37 42 37 C 41 37 40 36 40 35 C 40 34 41 33 42 33 C 48 33 52 33 58 33 C 59 33 60 34 60 35 Z M 60 45 C 60 46 59 47 58 47 C 52 47 48 47 42 47 C 41 47 40 46 40 45 C 40 44 41 43 42 43 C 48 43 52 43 58 43 C 59 43 60 44 60 45 Z M 68 80 C 63 80 50 80 42 80 C 37 80 32 75 32 70 C 32 60 32 50 32 38 C 25 40 20 35 20 30 C 20 25 25 20 32 20 C 37 20 50 20 58 20 C 63 20 68 25 68 30 C 68 40 68 50 68 62 C 75 60 80 65 80 70 C 80 75 75 80 68 80 Z"></path></svg>`],

				// projects
					mapMaker:      ["project", "application/json", `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="#bbbbbb" d="M 5 50 C 12 63 19 75 27 89 C 27 89 27 89 27 89 C 42 89 58 89 73 89 C 81 75 88 63 95 50 C 88 37 81 25 73 11 C 58 11 42 11 27 11 C 19 25 12 37 5 50 Z M 0 50 C 8 35 15 22 24 7 C 41 7 59 7 76 7 C 85 22 92 35 100 50 C 92 65 85 78 76 93 C 59 93 41 93 24 93 C 24 93 24 93 24 93 C 15 78 8 65 0 50 Z M 50 25 C 45 25 40 27 36 29 C 38 29 41 35 42 33 C 43 31 45 25 48 30 C 51 35 44 37 44 39 C 44 41 44 45 42 43 C 39 40 37 48 40 47 C 44 45 43 49 41 50 C 40 51 40 51 41 51 C 44 51 46 48 48 51 C 50 54 50 54 49 56 C 48 58 48 60 49 62 C 49 64 50 65 46 69 C 43 70 44 63 43 62 C 41 60 40 60 39 58 C 38 56 38 54 39 53 C 40 52 36 50 34 47 C 31 42 29 52 29 46 C 29 42 31 39 31 37 C 31 37 31 36 30 34 C 27 39 25 44 25 50 C 25 59 30 67 37 72 C 41 71 43 71 45 71 C 47 71 50 70 53 70 C 60 70 62 71 64 71 C 70 67 74 60 75 52 C 74 53 74 55 72 54 C 70 53 69 52 70 51 C 71 50 69 49 68 50 C 69 52 69 53 69 54 C 69 56 69 58 69 60 C 69 63 68 64 67 66 C 66 68 62 67 62 65 C 62 62 62 59 60 58 C 58 59 55 59 55 56 C 54 54 55 50 56 50 C 58 50 56 45 60 47 C 62 48 66 46 67 48 C 67 48 68 47 69 46 C 70 45 69 44 68 43 C 67 42 63 46 64 43 C 66 39 62 44 58 45 C 55 46 56 41 59 39 C 60 37 56 31 59 33 C 65 37 65 32 64 33 C 62 35 62 31 64 31 C 66 31 68 34 69 34 C 69 34 70 34 70 34 C 66 30 60 26 53 25 C 54 26 54 26 54 27 C 54 28 53 28 53 29 C 53 31 51 30 51 29 C 51 27 50 27 50 25 Z M 73 45 C 74 44 74 43 74 42 C 74 41 73 43 72 44 C 71 45 72 46 73 45 Z M 20 50 C 20 33 33 20 50 20 C 67 20 80 33 80 50 C 80 67 67 80 50 80 C 33 80 20 67 20 50 Z"></path></svg>`],
					timelineMaker: ["project", "application/json", `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="20 20 60 60"><path fill="#bbbbbb" d="M 33 35 C 30 35 28 35 25 35 C 22 35 20 33 20 30 C 20 27 22 25 25 25 C 40 25 60 25 74 25 C 78 25 80 27 80 30 C 80 33 78 35 75 35 C 64 35 50 35 37 35 C 37 39 37 43 37 48 C 38 48 39 48 40 48 C 40 48 41 45 45 45 C 55 45 65 45 75 45 C 78 45 80 47 80 50 C 80 53 78 55 75 55 C 65 55 55 55 45 55 C 41 55 40 52 40 52 C 39 52 38 52 37 52 C 37 58 37 63 37 68 C 38 68 39 68 40 68 C 40 68 41 65 45 65 C 55 65 65 65 75 65 C 78 65 80 67 80 70 C 80 73 78 75 75 75 C 65 75 55 75 45 75 C 41 75 40 72 40 72 C 38 72 37 72 35 72 C 34 72 33 71 33 70 C 33 70 33 70 33 70 C 33 70 33 69 33 69 C 33 59 33 46 33 35 Z"></path></svg>`],
					toneMaker:     ["project", "application/json", `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="10 10 80 80"><path fill="#bbbbbb" d="M 67 35 C 66 35 65 35 64 35 C 64 42 64 48 64 54 C 64 57 59 57 59 54 C 59 48 59 42 59 35 C 58 35 57 35 56 35 C 56 42 56 48 56 54 C 56 57 51 57 51 54 C 51 48 51 42 51 35 C 50 35 42 35 41 35 C 41 42 41 48 41 54 C 41 57 36 57 36 54 C 36 48 36 42 36 35 C 35 35 34 35 33 35 C 33 42 33 48 33 54 C 33 57 28 57 28 54 C 28 48 28 42 28 35 C 27 35 27 35 27 35 C 26 35 25 36 25 37 C 25 45 25 55 25 63 C 25 64 26 65 27 65 C 42 65 58 65 73 65 C 74 65 75 64 75 63 C 75 55 75 45 75 37 C 75 36 74 35 73 35 C 73 35 72 35 72 35 C 72 42 72 48 72 54 C 72 57 67 57 67 54 C 67 48 67 42 67 35 Z M 20 64 C 20 55 20 45 20 36 C 20 33 23 30 26 30 C 42 30 58 30 74 30 C 77 30 80 33 80 36 C 80 45 80 55 80 64 C 80 67 77 70 74 70 C 58 70 42 70 26 70 C 23 70 20 67 20 64 Z"></path></svg>`],
					orbitMaker:    ["project", "application/json", `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="10 10 80 80"><path fill="#bbbbbb" d="M 32 50 C 32 52 44 52 50 52 C 56 52 68 52 68 50 C 68 41 60 33 50 33 C 40 33 32 41 32 50 Z M 38 62 C 38 64 44 67 50 67 C 56 67 62 64 62 62 C 62 60 68 59 68 61 C 68 67 60 75 50 75 C 40 75 32 67 32 61 C 32 59 38 60 38 62 Z M 74 37 C 78 42 90 46 90 50 C 90 54 80 57 74 58 C 68 59 60 60 50 60 C 40 60 32 59 26 58 C 20 57 10 54 10 50 C 10 46 22 42 26 37 C 30 32 39 25 50 25 C 61 25 70 32 74 37 Z"></path></svg>`],
					spriteMaker:   ["project", "application/json", `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="20 20 60 60"><path fill="#bbbbbb" d="M 30 30 C 30 43 30 57 30 70 C 43 70 57 70 70 70 C 70 57 70 43 70 30 C 57 30 43 30 30 30 Z M 40 40 C 47 40 53 40 60 40 C 60 47 60 53 60 60 C 53 60 47 60 40 60 C 40 53 40 47 40 40 Z M 20 20 C 40 20 60 20 80 20 C 80 40 80 60 80 80 C 60 80 40 80 20 80 C 20 60 20 40 20 20 Z"></path></svg>`],
					flagMaker:     ["project", "application/json", `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="10 10 80 80"><path fill="#bbbbbb" d="M 25 53 C 25 54 25 55 27 54 C 31 52 35 50 40 50 C 46 50 56 60 60 60 C 65 60 69 58 73 56 C 75 55 75 54 75 52 C 75 45 75 35 75 27 C 75 26 74 25 73 25 C 71 25 66 30 60 30 C 54 30 44 20 40 20 C 35 20 31 22 27 24 C 25 25 25 26 25 28 C 25 30 25 50 25 53 Z M 25 63 C 25 70 25 80 25 88 C 25 91 20 91 20 88 C 20 80 20 30 20 25 C 20 22 22 21 26 19 C 30 17 34 15 40 15 C 46 15 56 25 60 25 C 64 25 69 20 74 20 C 77 20 80 23 80 26 C 80 35 80 45 80 55 C 80 58 78 59 74 61 C 70 63 66 65 60 65 C 54 65 44 56 40 56 C 35 56 31 58 27 60 C 25 61 25 62 25 63 Z"></path></svg>`],

				// other
					unknown:  ["", "text/plain", `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="#bbbbbb" d="M 0 50 C 0 77.5 22.5 100 50 100 C 77.5 100 100 77.5 100 50 C 100 22.5 77.5 0 50 0 C 22.5 0 0 22.5 0 50 Z M 40 30 C 40 33 38 35 35 35 C 32 35 30 33 30 30 C 30 19 39 10 50 10 C 61 10 70 19 70 30 C 70 39 63 45 57 51 C 55 53 55 56 55 57 C 55 58 55 62 55 65 C 55 68 53 70 50 70 C 47 70 45 68 45 65 C 45 62 45 58 45 55 C 45 50 47 48 50 45 C 55 40 60 35 60 30 C 60 25 55 20 50 20 C 45 20 40 25 40 30 Z M 45 85 C 45 82 47 80 50 80 C 53 80 55 82 55 85 C 55 88 53 90 50 90 C 47 90 45 88 45 85 Z"></path></svg>`]
			},
			svg: {
				import: `<svg viewBox="0 0 100 100"><path d="M 65 32 C 65 32 60 35 60 35 C 60 30 60 27 60 25 C 60 22 58 20 55 20 C 45 20 45 20 35 20 C 32 20 30 22 30 25 C 30 30 30 35 30 38 C 33 35 35 33 37 31 C 39 29 42 29 44 31 C 46 33 46 36 44 38 C 40 42 35 47 30 52 C 28 54 27 55 25 55 C 23 55 22 54 20 52 C 15 47 10 42 6 38 C 4 36 4 33 6 31 C 8 29 11 29 13 31 C 15 33 17 35 20 38 C 20 35 20 30 20 25 C 20 16 26 10 35 10 C 45 10 45 10 55 10 C 64 10 70 16 70 25 C 70 27 70 30 70 35 C 70 35 65 32 65 32 Z M 53 44 C 53 46 53 56 53 58 C 55 59 62 62 64 63 C 64 61 64 51 64 49 C 62 48 55 45 53 44 Z M 77 44 C 75 45 68 48 66 49 C 66 51 66 61 66 63 C 68 62 75 59 77 58 C 77 56 77 46 77 44 Z M 65 34 C 69 36 75 39 79 41 C 79 47 79 53 79 59 C 75 61 69 64 65 66 C 61 64 55 61 51 59 C 51 53 51 47 51 41 C 55 39 61 36 65 34 Z M 38 70 C 38 72 38 82 38 84 C 40 85 47 88 49 89 C 49 87 49 77 49 75 C 47 74 40 71 38 70 Z M 62 70 C 60 71 53 74 51 75 C 51 77 51 87 51 89 C 53 88 60 85 62 84 C 62 82 62 72 62 70 Z M 50 60 C 54 62 60 65 64 67 C 64 73 64 79 64 85 C 60 87 54 90 50 92 C 46 90 40 87 36 85 C 36 79 36 73 36 67 C 40 65 46 62 50 60 Z M 68 70 C 68 72 68 82 68 84 C 70 85 77 88 79 89 C 79 87 79 77 79 75 C 77 74 70 71 68 70 Z M 92 70 C 90 71 83 74 81 75 C 81 77 81 87 81 89 C 83 88 90 85 92 84 C 92 82 92 72 92 70 Z M 80 60 C 84 62 90 65 94 67 C 94 73 94 79 94 85 C 90 87 84 90 80 92 C 76 90 70 87 66 85 C 66 79 66 73 66 67 C 70 65 76 62 80 60 Z"></path></svg>`,
				export: `<svg viewBox="0 0 100 100"><path d="M 0 37 C 0 36 1 35 2 35 C 10 35 20 35 25 35 C 22 32 20 30 18 28 C 16 26 16 23 18 21 C 20 19 23 19 25 21 C 29 25 34 30 39 35 C 41 37 42 38 42 40 C 42 42 41 43 39 45 C 34 50 29 55 25 59 C 23 61 20 61 18 59 C 16 57 16 54 18 52 C 20 50 22 48 25 45 C 20 45 10 45 2 45 C 1 45 0 44 0 43 C 0 41 0 39 0 37 Z M 53 44 C 53 46 53 56 53 58 C 55 59 62 62 64 63 C 64 61 64 51 64 49 C 62 48 55 45 53 44 Z M 77 44 C 75 45 68 48 66 49 C 66 51 66 61 66 63 C 68 62 75 59 77 58 C 77 56 77 46 77 44 Z M 65 34 C 69 36 75 39 79 41 C 79 47 79 53 79 59 C 75 61 69 64 65 66 C 61 64 55 61 51 59 C 51 53 51 47 51 41 C 55 39 61 36 65 34 Z M 38 70 C 38 72 38 82 38 84 C 40 85 47 88 49 89 C 49 87 49 77 49 75 C 47 74 40 71 38 70 Z M 62 70 C 60 71 53 74 51 75 C 51 77 51 87 51 89 C 53 88 60 85 62 84 C 62 82 62 72 62 70 Z M 50 60 C 54 62 60 65 64 67 C 64 73 64 79 64 85 C 60 87 54 90 50 92 C 46 90 40 87 36 85 C 36 79 36 73 36 67 C 40 65 46 62 50 60 Z M 68 70 C 68 72 68 82 68 84 C 70 85 77 88 79 89 C 79 87 79 77 79 75 C 77 74 70 71 68 70 Z M 92 70 C 90 71 83 74 81 75 C 81 77 81 87 81 89 C 83 88 90 85 92 84 C 92 82 92 72 92 70 Z M 80 60 C 84 62 90 65 94 67 C 94 73 94 79 94 85 C 90 87 84 90 80 92 C 76 90 70 87 66 85 C 66 79 66 73 66 67 C 70 65 76 62 80 60 Z"></path></svg>`,
				assetManager: `<svg viewBox="0 0 100 100"><path d="M 38 18 C 38 20 38 30 38 32 C 40 33 47 36 49 37 C 49 35 49 25 49 23 C 47 22 40 19 38 18 Z M 62 18 C 60 19 53 22 51 23 C 51 25 51 35 51 37 C 53 36 60 33 62 32 C 62 30 62 20 62 18 Z M 50 8 C 54 10 60 13 64 15 C 64 21 64 27 64 33 C 60 35 54 38 50 40 C 46 38 40 35 36 33 C 36 27 36 21 36 15 C 40 13 46 10 50 8 Z M 23 44 C 23 46 23 56 23 58 C 25 59 32 62 34 63 C 34 61 34 51 34 49 C 32 48 25 45 23 44 Z M 47 44 C 45 45 38 48 36 49 C 36 51 36 61 36 63 C 38 62 45 59 47 58 C 47 56 47 46 47 44 Z M 35 34 C 39 36 45 39 49 41 C 49 47 49 53 49 59 C 45 61 39 64 35 66 C 31 64 25 61 21 59 C 21 53 21 47 21 41 C 25 39 31 36 35 34 Z M 53 44 C 53 46 53 56 53 58 C 55 59 62 62 64 63 C 64 61 64 51 64 49 C 62 48 55 45 53 44 Z M 77 44 C 75 45 68 48 66 49 C 66 51 66 61 66 63 C 68 62 75 59 77 58 C 77 56 77 46 77 44 Z M 65 34 C 69 36 75 39 79 41 C 79 47 79 53 79 59 C 75 61 69 64 65 66 C 61 64 55 61 51 59 C 51 53 51 47 51 41 C 55 39 61 36 65 34 Z M 8 70 C 8 72 8 82 8 84 C 10 85 17 88 19 89 C 19 87 19 77 19 75 C 17 74 10 71 8 70 Z M 32 70 C 30 71 23 74 21 75 C 21 77 21 87 21 89 C 23 88 30 85 32 84 C 32 82 32 72 32 70 Z M 20 60 C 24 62 30 65 34 67 C 34 73 34 79 34 85 C 30 87 24 90 20 92 C 16 90 10 87 6 85 C 6 79 6 73 6 67 C 10 65 16 62 20 60 Z M 38 70 C 38 72 38 82 38 84 C 40 85 47 88 49 89 C 49 87 49 77 49 75 C 47 74 40 71 38 70 Z M 62 70 C 60 71 53 74 51 75 C 51 77 51 87 51 89 C 53 88 60 85 62 84 C 62 82 62 72 62 70 Z M 50 60 C 54 62 60 65 64 67 C 64 73 64 79 64 85 C 60 87 54 90 50 92 C 46 90 40 87 36 85 C 36 79 36 73 36 67 C 40 65 46 62 50 60 Z M 68 70 C 68 72 68 82 68 84 C 70 85 77 88 79 89 C 79 87 79 77 79 75 C 77 74 70 71 68 70 Z M 92 70 C 90 71 83 74 81 75 C 81 77 81 87 81 89 C 83 88 90 85 92 84 C 92 82 92 72 92 70 Z M 80 60 C 84 62 90 65 94 67 C 94 73 94 79 94 85 C 90 87 84 90 80 92 C 76 90 70 87 66 85 C 66 79 66 73 66 67 C 70 65 76 62 80 60 Z"></path></svg>`,
				download: `<svg viewBox="0 0 100 100"><path d="M 20 85 C 20 82 22 80 25 80 C 40 80 60 80 75 80 C 78 80 80 82 80 85 C 80 88 78 90 75 90 C 60 90 40 90 25 90 C 22 90 20 88 20 85 Z M 50 10 C 53 10 55 12 55 15 C 55 30 55 50 55 63 C 58 60 60 58 62 56 C 64 54 67 54 69 56 C 71 58 71 61 69 63 C 65 67 60 72 55 77 C 53 79 52 80 50 80 C 48 80 47 79 45 77 C 40 72 35 67 31 63 C 29 61 29 58 31 56 C 33 54 36 54 38 56 C 40 58 42 60 45 63 C 45 50 45 30 45 15 C 45 12 47 10 50 10 Z"></path></svg>`,
				copy: `<svg viewBox="10 10 80 80"><path d="M 45 40 C 48 40 51 40 54 40 C 57 40 60 43 60 46 C 60 49 60 52 60 55 C 65 55 70 55 73 55 C 74 55 75 54 75 53 C 75 45 75 35 75 27 C 75 26 74 25 73 25 C 65 25 55 25 47 25 C 46 25 45 26 45 27 C 45 30 45 35 45 40 C 45 40 45 40 45 40 Z M 27 45 C 26 45 25 46 25 47 C 25 55 25 65 25 73 C 25 74 26 75 27 75 C 35 75 45 75 53 75 C 54 75 55 74 55 73 C 55 65 55 55 55 47 C 55 46 54 45 53 45 C 45 45 35 45 27 45 Z M 60 60 C 60 65 60 70 60 74 C 60 77 57 80 54 80 C 45 80 35 80 26 80 C 23 80 20 77 20 74 C 20 65 20 55 20 46 C 20 43 23 40 26 40 C 30 40 35 40 40 40 C 40 35 40 30 40 26 C 40 23 43 20 46 20 C 55 20 65 20 74 20 C 77 20 80 23 80 26 C 80 35 80 45 80 54 C 80 57 77 60 74 60 C 70 60 65 60 60 60 C 60 60 60 60 60 60 Z"></path></svg>`,
				check: `<svg viewBox="10 10 80 80"><path d="M 40 60 C 47 53 63 37 72 28 C 74 26 77 26 79 28 C 81 30 81 33 79 35 C 70 44 54 60 44 70 C 42 72 38 72 36 70 C 26 60 24 58 21 55 C 19 53 19 50 21 48 C 23 46 26 46 28 48 C 31 51 33 53 40 60 Z"></path></svg>`,
				delete: `<svg viewBox="10 10 80 80"><path d="M 67 30 C 70 30 73 30 76 30 C 78 30 80 32 80 34 C 80 35 80 35 80 36 C 80 38 78 40 76 40 C 72 40 70 40 70 41 C 70 51 70 63 70 74 C 70 77 67 80 64 80 C 55 80 45 80 36 80 C 33 80 30 77 30 74 C 30 63 30 51 30 41 C 30 40 28 40 24 40 C 22 40 20 38 20 36 C 20 35 20 35 20 34 C 20 32 22 30 24 30 C 27 30 30 30 33 30 C 36 30 37 29 37 26 C 37 23 40 20 43 20 C 47 20 53 20 57 20 C 60 20 63 23 63 26 C 63 29 64 30 67 30 Z"></path></svg>`,
			}
		}
  
	/* state */
		const STATE = {
			search: "",
			filter: "all",
			sort: "timestamp-descending",
			assets: []
		}

/*** helpers ***/
	/* generateRandom */
		function generateRandom() {
			try {
				return (Math.random() * 10e16).toString(36)
			} catch (error) {console.log(error)}
		}

	/* sortTypes */
		function sortTypes(typeA, typeB) {
			try {
				// image
					if (typeA.includes("image") && !typeB.includes("image")) {
						return -1
					}
					else if (!typeA.includes("image") && typeB.includes("image")) {
						return 1
					}

				// data or code
					if (typeA !== "text/plain" && typeB == "text/plain") {
						return -1
					}
					else if (typeA == "text/plain" && typeB !== "text/plain") {
						return 1
					}

				// other
					return 0
			} catch (error) {console.log(error)}
		}

/*** controls - upload ***/
	/* uploadAsset */
		ELEMENTS.controls.upload.addEventListener(TRIGGERS.input, uploadAsset)
		function uploadAsset() {
			try {
				// file
					const file = ELEMENTS.controls.upload.files[0]
					if (!file) {
						return
					}
				
				// import
					importAsset(file)
			} catch (error) {console.log(error)}
		}

	/* dragAsset */
		ELEMENTS.body.addEventListener(TRIGGERS.dragover, dragAsset)
		function dragAsset(event) {
			try {
				event.preventDefault()
			} catch (error) {console.log(error)}
		}

	/* dropAsset */
		ELEMENTS.body.addEventListener(TRIGGERS.drop, dropAsset)
		function dropAsset() {
			try {
				// defaults
					event.preventDefault()
					if (!event.dataTransfer || !event.dataTransfer.items) {
						return
					}

				// file
					const file = [...event.dataTransfer.items][0].getAsFile()
					if (!file) {
						return
					}

				// read file
					importAsset(file)
			} catch (error) {console.log(error)}
		}

	/* pasteAsset */
		ELEMENTS.controls.paste.addEventListener(TRIGGERS.click, pasteAsset)
		async function pasteAsset() {
			try {
				// get file from clipboard
					const clipboardItems = await navigator.clipboard.read()
					const item = clipboardItems[0]

				// no file
					if (!item) {
						return
					}

				// get types
					const typeList = Array.from(item.types)
					const type = typeList.length > 1 ? typeList.sort(sortTypes)[0] : typeList[0]

				// file
					const file = await item.getType(type)

				// get data
					importAsset(file)
			} catch (error) {console.log(error)}
		}

	/* importAsset */
		function importAsset(file) {
			try {
				// filetype
					const filetype = Object.keys(CONSTANTS.types).find(t => CONSTANTS.types[t][1] == file.type) || "unknown"

				// reader
					const reader = new FileReader()
					reader.onload = event => {
						parseAsset(file.name, filetype, event.target.result)
					}

				// read file
					if (filetype == "svg" || CONSTANTS.types[filetype][0] !== "image") {
						reader.readAsText(file)
					}
					else {
						reader.readAsDataURL(file)
					}
			} catch (error) {console.log(error)}
		}

	/* parseAsset */
		function parseAsset(name, type, data) {
			try {
				// new asset
					const asset = {
						name: name || "",
						project: null,
						type: type,
						timestamp: new Date().getTime(), // ms
						data: data,
						id: generateRandom(),
						size: String(data).length / CONSTANTS.bytesPerKilobyte
					}

				// add to state
					STATE.assets.push(asset)

				// no name?
					if (!asset.name.length) {
						if (CONSTANTS.types[asset.type][0] == "image") {
							asset.name = `clipboard_item.${asset.type}`
						}
						else {
							asset.name = `${asset.data.slice(0, CONSTANTS.nameCharacters)}...`
						}
					}

				// text --> html, xml, svg
					if (asset.type == "txt") {
						const lowercaseData = asset.data.toLowerCase()
						if (lowercaseData.startsWith(CONSTANTS.identifiers.html)) {
							asset.type = "html"
							const parser = new DOMParser()
							const htmlData = parser.parseFromString(asset.data, "text/html")
							if (htmlData.title) {
								asset.name = `${htmlData.title}.${asset.type}`
							}
						}
						else if (lowercaseData.startsWith(CONSTANTS.identifiers.xml)) {
							asset.type = "xml"
							asset.name = `clipboard_item.${asset.type}`
						}
						else if (lowercaseData.startsWith(CONSTANTS.identifiers.svg)) {
							asset.type = "svg"
							asset.name = `clipboard_item.${asset.type}`
						}
					}

				// text or json
					if (asset.type == "txt" || asset.type == "json") {
						try {
							const jsonData = JSON.parse(asset.data)
							asset.type = "json"
							if (jsonData.project) {
								asset.project = jsonData.project
								if (!asset.name) {
									asset.name = `${asset.project}_${new Date().getTime()}.json`
								}
							}
						} catch (error) {}
					}

				// update localstorage
					storeAssets()

				// build card
					buildCard(asset)
					updateCards()
			} catch (error) {console.log(error)}
		}

/*** controls - list ***/
	/* updateSearch */
		ELEMENTS.controls.search.addEventListener(TRIGGERS.input, updateSearch)
		function updateSearch() {
			try {
				STATE.search = ELEMENTS.controls.search.value.trim() || CONSTANTS.search
				updateCards()
			} catch (error) {console.log(error)}
		}

	/* resetSearch */
		ELEMENTS.controls.reset.addEventListener(TRIGGERS.click, resetSearch)
		function resetSearch() {
			try {
				ELEMENTS.controls.search.value = ""
				updateSearch()
			} catch (error) {console.log(error)}
		}

	/* updateFilter */
		ELEMENTS.controls.filter.addEventListener(TRIGGERS.input, updateFilter)
		function updateFilter() {
			try {
				STATE.filter = ELEMENTS.controls.filter.value || CONSTANTS.filter
				updateCards()
			} catch (error) {console.log(error)}
		}

	/* updateSort */
		ELEMENTS.controls.sort.addEventListener(TRIGGERS.input, updateSort)
		function updateSort() {
			try {
				STATE.sort = ELEMENTS.controls.sort.value || CONSTANTS.sort
				updateCards()
			} catch (error) {console.log(error)}
		}

/*** assets ***/
	/* loadAssets */
		loadAssets()
		ELEMENTS.controls.refresh.addEventListener(TRIGGERS.click, loadAssets)
		function loadAssets() {
			try {
				// get localstorage
					const stringifiedAssets = window.localStorage.assets
					if (!stringifiedAssets) {
						return
					}

				// update gauge
					const characters = window.localStorage.assets.length
					ELEMENTS.gauge.style.width = `${characters / CONSTANTS.storageLimit * 100}%`

				// parse assets
					STATE.assets = JSON.parse(stringifiedAssets)

				// delete existing cards
					ELEMENTS.assets.element.innerHTML = ""

				// build assets
					for (const a in STATE.assets) {
						STATE.assets[a].id = generateRandom()
						STATE.assets[a].size = String(STATE.assets[a].data).length / CONSTANTS.bytesPerKilobyte
						buildCard(STATE.assets[a])
					}

				// updateCards
					updateCards()
			} catch (error) {console.log(error)}
		}

	/* storeAssets */
		function storeAssets() {
			try {
				// clean
					const copiedData = JSON.parse(JSON.stringify(STATE.assets))
					for (const c in copiedData) {
						delete copiedData[c].id
						delete copiedData[c].size
						delete copiedData[c].element
					}

				// stringify
					window.localStorage.assets = JSON.stringify(copiedData)

				// update gauge
					const characters = window.localStorage.assets.length
					ELEMENTS.gauge.style.width = `${characters / CONSTANTS.storageLimit * 100}%`
			} catch (error) {console.log(error)}
		}

	/* buildCard */
		function buildCard(asset) {
			try {
				// type
					const type = asset.project ?? asset.type ?? "unknown"

				// image
					const isImage = (CONSTANTS.types[asset.type][0] == "image" && asset.type !== "svg")
					const backgroundImage = isImage ? asset.data :
						(asset.project && CONSTANTS.types[asset.project]) ? `data:${CONSTANTS.types.svg[1]},${encodeURIComponent(CONSTANTS.types[asset.project][2])}` :
						(asset.type == "svg") ? `data:${CONSTANTS.types.svg[1]},${encodeURIComponent(asset.data)}` :
						`data:${CONSTANTS.types.svg[1]},${encodeURIComponent(CONSTANTS.types[asset.type][2])}`

				// card
					const card = document.createElement("div")
						card.id = `card-${asset.id}`
						card.className = "card"
					ELEMENTS.assets.element.appendChild(card)
					asset.element = card

					// image
						const image = document.createElement("div")
							image.className = "card-image"
							image.style.backgroundImage = `url(${backgroundImage})`
							if (!isImage && asset.type !== "svg") {
								image.innerText = asset.data
							}
						card.appendChild(image)

					// name
						const nameInput = document.createElement("input")
							nameInput.className = "card-name"
							nameInput.type = "text"
							nameInput.placeholder = "name"
							nameInput.value = asset.name
							nameInput.autocomplete = "none"
							nameInput.autocapitalize = "none"
							nameInput.autocorrect = "none"
							nameInput.spellcheck = false
							nameInput.addEventListener(TRIGGERS.change, renameAsset)
						card.appendChild(nameInput)

					// date
						const dateLabel = document.createElement("div")
							dateLabel.className = "card-date"
							dateLabel.innerText = new Date(asset.timestamp).toLocaleString()
						card.appendChild(dateLabel)

					// type
						const typeLabel = document.createElement("div")
							typeLabel.className = "card-type"
							typeLabel.innerText = type
						card.appendChild(typeLabel)

					// size
						const sizeLabel = document.createElement("div")
							sizeLabel.className = "card-size"
							sizeLabel.innerText = `${asset.size} kB`
						card.appendChild(sizeLabel)

				// actions
					const actions = document.createElement("div")
						actions.className = "card-actions"
					card.appendChild(actions)

					// import
						const importButton = document.createElement("button")
							importButton.className = "card-actions-import"
							importButton.innerHTML = CONSTANTS.svg.import
							importButton.addEventListener(TRIGGERS.click, retrieveAsset)
						actions.appendChild(importButton)

					// download
						const downloadButton = document.createElement("button")
							downloadButton.className = "card-actions-download"
							downloadButton.innerHTML = CONSTANTS.svg.download
							downloadButton.addEventListener(TRIGGERS.click, downloadAsset)
						actions.appendChild(downloadButton)

					// copy
						const copyButton = document.createElement("button")
							copyButton.className = "card-actions-copy"
							copyButton.innerHTML = CONSTANTS.svg.copy + CONSTANTS.svg.check
							copyButton.addEventListener(TRIGGERS.click, copyAsset)
						actions.appendChild(copyButton)

					// delete
						const deleteButton = document.createElement("button")
							deleteButton.className = "card-actions-delete"
							deleteButton.innerHTML = CONSTANTS.svg.delete
							deleteButton.addEventListener(TRIGGERS.click, deleteAsset)
						actions.appendChild(deleteButton)
			} catch (error) {console.log(error)}
		}

	/* updateCards */
		function updateCards() {
			try {
				// import buttons
					if (STATE.importTypes) {
						for (const a in STATE.assets) {
							const asset = STATE.assets[a]
							if (!STATE.importTypes.includes(asset.type)) {
								asset.element.querySelector(".card-actions-import").setAttribute("disabled", true)
							}
						}
					}

				// filter
					const filteredAssets = STATE.assets.filter(matchesType).filter(matchesSearch)

				// sort
					const sortedAssets = filteredAssets.sort(sortCards)

				// get ids
					const assetIds = sortedAssets.map(asset => asset.id)

				// update card order
					for (const a in STATE.assets) {
						const asset = STATE.assets[a]
						if (!assetIds.includes(asset.id)) {
							asset.element.setAttribute("hidden", true)
							continue
						}

						asset.element.removeAttribute("hidden")
						asset.element.style.order = assetIds.indexOf(asset.id)
					}

				// no assets
					if (!filteredAssets.length) {
						ELEMENTS.assets.empty.removeAttribute("hidden")
						return
					}
					ELEMENTS.assets.empty.setAttribute("hidden", true)
			} catch (error) {console.log(error)}
		}

	/* matchesType */
		function matchesType(asset) {
			try {
				// all
					if (STATE.filter == "all") {
						return true
					}

				// project
					if (CONSTANTS.types[STATE.filter] && CONSTANTS.types[STATE.filter][0] == "project") {
						return asset.project == STATE.filter
					}

				// "image"
					if (STATE.filter == "image") {
						return CONSTANTS.types[asset.type][0] == "image"
					}

				// "data"
					if (STATE.filter == "data") {
						return CONSTANTS.types[asset.type][0] == "data"
					}

				// "code"
					if (STATE.filter == "code") {
						return CONSTANTS.types[asset.type][0] == "code"
					}

				// actual
					return asset.type == STATE.filter
			} catch (error) {console.log(error)}
		}

	/* matchesSearch */
		function matchesSearch(asset) {
			try {
				// no search
					if (STATE.search == CONSTANTS.search) {
						return true
					}

				// text search
					return asset.name.toLowerCase().includes(STATE.search.toLowerCase())
			} catch (error) {console.log(error)}
		}

	/* sortCards */
		function sortCards(assetA, assetB) {
			try {
				// name
					if (STATE.sort == "name-ascending") {
						return assetA.name.localeCompare(assetB.name)
					}
					if (STATE.sort == "name-descending") {
						return assetB.name.localeCompare(assetA.name)
					}

				// timestamp
					if (STATE.sort == "timestamp-ascending") {
						return Number(assetA.timestamp) - Number(assetB.timestamp)
					}
					if (STATE.sort == "timestamp-descending") {
						return Number(assetB.timestamp) - Number(assetA.timestamp)
					}

				// size
					if (STATE.sort == "size-ascending") {
						return assetA.size - assetB.size
					}
					if (STATE.sort == "size-descending") {
						return assetB.size - assetA.size
					}
			} catch (error) {console.log(error)}
		}

/*** card actions ***/
	/* renameAsset */
		function renameAsset(event) {
			try {
				// get asset
					const input = event.target.closest(".card-name")
					const assetId = input.closest(".card").id.replace("card-", "")
					const asset = STATE.assets.find(a => a.id == assetId)

				// update name
					asset.name = input.value.trim()

				// update localstorage
					storeAssets()
			} catch (error) {console.log(error)}
		}

	/* downloadAsset */
		function downloadAsset(event) {
			try {
				// get asset
					const button = event.target.closest(".card-actions-download")
					const assetId = button.closest(".card").id.replace("card-", "")
					const asset = STATE.assets.find(a => a.id == assetId)

				// not an image
					const isImage = (CONSTANTS.types[asset.type][0] == "image" && asset.type !== "svg")
					const datatypeString = isImage ? "" : `data:${CONSTANTS.types[asset.type][1]},`
					const data = isImage ? asset.data : encodeURIComponent(asset.data)

				// image
					const exportLink = document.createElement("a")
						exportLink.id = "export-link"
						exportLink.setAttribute("href", datatypeString + data)
						exportLink.setAttribute("download", asset.name)
						exportLink.addEventListener(TRIGGERS.click, () => {
							ELEMENTS.body.removeChild(exportLink)
						})

				// click
					ELEMENTS.body.appendChild(exportLink)
					exportLink.click()
			} catch (error) {console.log(error)}
		}

	/* copyAsset */
		async function copyAsset(event) {
			try {
				// get asset
					const button = event.target.closest(".card-actions-copy")
					const assetId = button.closest(".card").id.replace("card-", "")
					const asset = STATE.assets.find(a => a.id == assetId)

				// not an image
					if (asset.type == "svg" || CONSTANTS.types[asset.type][0] !== "image") {
						navigator.clipboard.writeText(asset.data).then(() => {
							button.setAttribute("active", true)
							setTimeout(() => {
								button.removeAttribute("active")
							}, CONSTANTS.activeTimeout)
						}).catch(error => {
							console.log(error)
						})
						return
					}

				// image
					const imageURL = asset.data
					async function getImagePromise() {
						const imageData = await fetch(imageURL)
						return await imageData.blob()
					}

					try {
						// chrome, edge, safari
							const datatypeString = CONSTANTS.types[asset.type][1]
							navigator.clipboard.write(
								[new ClipboardItem({[datatypeString]: getImagePromise()})]
							).then(() => {
								button.setAttribute("active", true)
								setTimeout(() => {
									button.removeAttribute("active")
								}, CONSTANTS.activeTimeout)
							}).catch(error => {
								console.log(error)
							})
					} catch (error) {
						// firefox
							const reader = new FileReader()
							reader.onload = function() {
								const wrapper = document.createElement("div")
									wrapper.contentEditable = "true"
								document.body.appendChild(wrapper)

								const image = document.createElement("img")
									image.src = reader.result
								wrapper.appendChild(image)

								try {
									window.getSelection().selectAllChildren(wrapper)
									document.execCommand("copy")
									button.setAttribute("active", true)
									setTimeout(() => {
										button.removeAttribute("active")
									}, CONSTANTS.activeTimeout)
									wrapper.remove()
								} catch (error) {
									wrapper.remove()
									console.log(error)
								}
							}
							reader.readAsDataURL(await getImagePromise())
					}
				} catch (error) {console.log(error)}
		}

	/* deleteAsset */
		function deleteAsset(event) {
			try {
				// get asset
					const button = event.target.closest(".card-actions-delete")
					const assetId = button.closest(".card").id.replace("card-", "")
					const asset = STATE.assets.find(a => a.id == assetId)

				// remove from state
					asset.element.remove()
					STATE.assets = STATE.assets.filter(a => a.id !== asset.id)

				// update localstorage
					storeAssets()
			} catch (error) {console.log(error)}
		}

/*** iframe ***/
	/** setup **/
		/* detectFraming */
			detectFraming()
			function detectFraming() {
				try {
					// not framed
						if (window == window.top) {
							return
						}

					// update elements
						ELEMENTS.body.setAttribute("framed", true)
				} catch (error) {console.log(error)}
			}

		/* closeFrame */
			ELEMENTS.iframe.close.addEventListener(TRIGGERS.click, closeFrame)
			function closeFrame() {
				try {
					window.top.postMessage({action: "close"}, "*")
				} catch (error) {console.log(error)}
			}

		/* handleMessage */
			window.addEventListener(TRIGGERS.message, handleMessage)
			function handleMessage(event) {
				try {
					// no action
						if (!event.data || !event.data.action) {
							return
						}

					// initialize buttons
						if (event.data.action == "initialize") {
							for (const e in event.data.exports) {
								createExportButton(event.data.exports[e])
							}
							
							if (event.data.imports) {
								STATE.importTypes = event.data.imports
								updateCards()
							}
							return
						}

					// store asset
						if (event.data.action == "store") {
							parseAsset(event.data.name, event.data.type, event.data.data)
							return
						}
				} catch (error) {console.log(error)}
			}

	/** exporting files to assetManager **/
		/* createExportButton */
			function createExportButton(type) {
				try {
					// button
						const button = document.createElement("button")
							button.id = `export_${type}`
							button.className = "export-button"
							button.innerHTML = `<span>${type.toUpperCase()}</span>${CONSTANTS.types[type][2]}${CONSTANTS.svg.export}`
							button.title = `save ${type} file to localstorage`
							button.setAttribute("data-type", type)
							button.addEventListener(TRIGGERS.click, requestAsset)
						ELEMENTS.iframe.exportBar.appendChild(button)
				} catch (error) {console.log(error)}
			}

		/* requestAsset */
			function requestAsset(event) {
				try {
					// get type
						const button = event.target.closest(".export-button")
						const type = button.getAttribute("data-type")

					// post message to get data
						window.top.postMessage({
							action: "store",
							type: type
						}, "*")
				} catch (error) {console.log(error)}
			}

	/** importing files from assetManager **/
		/* retrieveAsset */
			function retrieveAsset(event) {
				try {
					// get asset
						const button = event.target.closest(".card-actions-import")
						const assetId = button.closest(".card").id.replace("card-", "")
						const asset = STATE.assets.find(a => a.id == assetId)

					// package up
						const file = new Blob([asset.data], {type: CONSTANTS.types[asset.type][1]});

					// post to project
						window.top.postMessage({
							action: "retrieve",
							name: asset.name,
							type: asset.type,
							file: file
						}, "*")
				} catch (error) {console.log(error)}
			}
