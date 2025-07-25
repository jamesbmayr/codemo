/*** globals ***/
	/* triggers */
		const TRIGGERS = {
			input: "input",
			change: "change",
			click: "click",
			doubleclick: "dblclick",
			mousedown: "mousedown",
			mousemove: "mousemove",
			mouseup: "mouseup",
			scroll: "mousewheel",
			mouseenter: "mouseenter",
			mouseleave: "mouseleave",
			rightclick: "contextmenu",
			dragover: "dragover",
			drop: "drop"
		}
		if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
			TRIGGERS.mousedown = "touchstart"
			TRIGGERS.mousemove = "touchmove"
			TRIGGERS.mouseup = "touchend"
		}
		window.addEventListener(TRIGGERS.rightclick, event => event.preventDefault())

	/* elements */
		const ELEMENTS = {
			controls: {
				svgOffsetX: document.querySelector("#controls-svg-offset-x"),
				svgOffsetY: document.querySelector("#controls-svg-offset-y"),
				svgGrid: document.querySelector("#controls-svg-grid"),
				svgSize: document.querySelector("#controls-svg-size"),
				svgScale: document.querySelector("#controls-svg-scale"),
				svgSnap: document.querySelector("#controls-svg-snap"),
				exportSVG: document.querySelector("#controls-export-svg"),
				exportPNG: document.querySelector("#controls-export-png"),
				exportClippath: document.querySelector("#controls-export-clippath"),
				exportCanvas: document.querySelector("#controls-export-canvas"),
				import: document.querySelector("#controls-import"),
				undo: document.querySelector("#controls-undo"),
				redo: document.querySelector("#controls-redo"),
				add: document.querySelector("#controls-add"),
				addShape: document.querySelector("#controls-add-shape"),
				list: document.querySelector("#controls-list"),
			},
			container: {
				element: document.querySelector("#container"),
				grid: document.querySelector("#container-grid"),
				rect: document.querySelector("#container-grid-rect"),
				svg: document.querySelector("#container-svg"),
				points: document.querySelector("#container-points")
			}
		}

	/* constants */
		const CONSTANTS = {
			exportWaitTime: 1000 * 2, // ms
			zoomPerScroll: 1.05, // ratio
			circleRadians: 2 * Math.PI, // rad
			circleDegrees: 360, // °
			snapDegrees: 15, // °
			maxArcAngleForCubicBezier: 90, // °
			maxSkewDegrees: 90, // °
			percent: 100, // %
			rounding: 1000, // .#
			ratioRounding: 1000000000, // .#
			largeNumber: 1000000000000000, // #
			pathIncrement: 0.1, // user units
			tempStrokeWidth: 0.1, // user units
			mergeThreshold: 1, // user units
			loopAttempts: 20, // #
			drawingInterval: 100, // ms
			points: {
				r: "0.75%", // %
				pointWidth: "0.75%", // %
				lineWidth: "0.25%", // %
				fill: "transparent", // hex
				pointLineStroke: "#333333", // hex
				controlLineStroke: "#bbbbbb", // hex
				pointStroke: "#04b1ff", // hex
				controlPointStroke: "#d94c4c", // hex
			},
			defaults: {
				shape: "circle",
				stroke: "#000000", // hex
				"stroke-width": "1", // user units
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"fill-on": "true",
				fill: "#777777", // hex
				coordinates: {
					circle: {
						cx: 50,
						cy: 50,
						r:  25
					},
					ellipse: {
						cx: 50,
						cy: 50,
						rx: 30,
						ry: 20
					},
					line: {
						x1: 20,
						y1: 80,
						x2: 80,
						y2: 20
					},
					polyline: {
						points: "20,20\n60,40\n40,60\n80,80"
					},
					rect: {
						x:      30,
						y:      30,
						width:  40,
						height: 40,
						rx:      5,
						ry:      5
					},
					"draw...": {
						points: "0,0"
					},
					polygon: {
						points: "20,20\n80,20\n80,80\n20,80"
					},
					path: {
						d: "M 10 30\nA 20 20 0 0 1 30 10\nA 20 20 0 0 1 50 30\nA 20 20 0 0 1 70 10\nA 20 20 0 0 1 90 30\nQ 90 60 50 90\nQ 10 60 10 30\nZ"
					},
					curves: {
						d: "M 10 30\nA 20 20 0 0 1 30 10\nA 20 20 0 0 1 50 30\nA 20 20 0 0 1 70 10\nA 20 20 0 0 1 90 30\nQ 90 60 50 90\nQ 10 60 10 30\nZ"
					},
					triangle: {
						points: "28,62\n50,25\n72,62"
					},
					square: {
						points: "32,32\n68,32\n68,68\n32,68"
					},
					trapezoid: {
						points: "35,35\n65,35\n80,65\n20,65"
					},
					parallelogram: {
						points: "40,30\n80,30\n60,70\n20,70"
					},
					pentagon: {
						points: "50,25\n74,43\n64,71\n36,71\n26,43"
					},
					hexagon: {
						points: "50,25\n72,38\n72,62\n50,75\n28,62\n28,38"
					},
					septagon: {
						points: "50,25\n70,35\n74,56\n61,73\n39,73\n26,56\n30,35"
					},
					octagon: {
						points: "40,27\n60,27\n73,40\n73,60\n60,73\n40,73\n27,60\n27,40"
					},
					nonagon: {
						points: "50,25\n66,31\n74,45\n72,62\n59,73\n41,73\n28,62\n26,45\n34,31"
					},
					decagon: {
						points: "50,25\n65,30\n74,42\n74,58\n65,70\n50,75\n35,70\n26,58\n26,42\n35,30"
					},
					dodecagon: {
						points: "43,26\n57,26\n68,32\n74,43\n74,57\n68,68\n57,74\n43,74\n32,68\n26,57\n26,43\n32,32"
					}
				}
			},
			options: {
				shape: ["circle", "ellipse", "polygon", "rect", "line", "polyline", "path"],
				"stroke-linecap": ["round", "square", "butt"],
				"stroke-linejoin": ["miter", "round", "bevel"]
			},
			commandParameters: {
				"m": 2,
				"l": 2,
				"h": 1,
				"v": 1,
				"c": 6,
				"s": 4,
				"q": 4,
				"t": 2,
				"a": 7
			},
			symbols: {
				"eye": `<svg viewBox="10 10 80 80"><path d="M 35 50 C 35 59 41 65 50 65 C 59 65 65 59 65 50 C 65 41 59 35 50 35 C 41 35 35 41 35 50 Z M 43 50 C 43 46 46 43 50 43 C 54 43 57 46 57 50 C 57 54 54 57 50 57 C 46 57 43 54 43 50 Z M 20 50 C 20 45 32 30 50 30 C 68 30 80 45 80 50 C 80 55 68 70 50 70 C 32 70 20 55 20 50 Z"></path></svg>`,
				"lock": `<svg viewBox="10 10 80 80"><path d="M 59 44 C 59 43 59 42 59 41 C 59 35 55 31 50 31 C 45 31 41 35 41 41 C 41 42 41 43 41 44 C 41 45 41 45 42 45 C 47 45 53 45 58 45 C 59 45 59 45 59 44 Z M 35 44 C 35 43 35 42 35 41 C 35 31 41 25 50 25 C 59 25 65 31 65 41 C 65 42 65 43 65 44 C 65 45 65 45 66 45 C 68 45 70 47 70 49 C 70 61 70 69 70 76 C 70 78 68 80 66 80 C 55 80 45 80 34 80 C 32 80 30 78 30 76 C 30 69 30 61 30 49 C 30 47 32 45 34 45 C 35 45 35 45 35 44 Z"></path></svg>`,
				"copy": `<svg viewBox="10 10 80 80"><path d="M 45 40 C 48 40 51 40 54 40 C 57 40 60 43 60 46 C 60 49 60 52 60 55 C 65 55 70 55 73 55 C 74 55 75 54 75 53 C 75 45 75 35 75 27 C 75 26 74 25 73 25 C 65 25 55 25 47 25 C 46 25 45 26 45 27 C 45 30 45 35 45 40 C 45 40 45 40 45 40 Z M 27 45 C 26 45 25 46 25 47 C 25 55 25 65 25 73 C 25 74 26 75 27 75 C 35 75 45 75 53 75 C 54 75 55 74 55 73 C 55 65 55 55 55 47 C 55 46 54 45 53 45 C 45 45 35 45 27 45 Z M 60 60 C 60 65 60 70 60 74 C 60 77 57 80 54 80 C 45 80 35 80 26 80 C 23 80 20 77 20 74 C 20 65 20 55 20 46 C 20 43 23 40 26 40 C 30 40 35 40 40 40 C 40 35 40 30 40 26 C 40 23 43 20 46 20 C 55 20 65 20 74 20 C 77 20 80 23 80 26 C 80 35 80 45 80 54 C 80 57 77 60 74 60 C 70 60 65 60 60 60 C 60 60 60 60 60 60 Z"></path></svg>`,
				"up": `<svg viewBox="10 10 80 80"><path d="M 50 90 C 47 90 45 88 45 85 C 45 70 45 40 45 27 C 42 30 40 32 38 34 C 36 36 33 36 31 34 C 29 32 29 29 31 27 C 35 23 40 18 45 13 C 47 11 48 10 50 10 C 52 10 53 11 55 13 C 60 18 65 23 69 27 C 71 29 71 32 69 34 C 67 36 64 36 62 34 C 60 32 58 30 55 27 C 55 40 55 70 55 85 C 55 88 53 90 50 90 Z"></path></svg>`,
				"right": `<svg viewBox="10 10 80 80"><path d="M 10 50 C 10 47 12 45 15 45 C 30 45 60 45 73 45 C 70 42 68 40 66 38 C 64 36 64 33 66 31 C 68 29 71 29 73 31 C 77 35 82 40 87 45 C 89 47 90 48 90 50 C 90 52 89 53 87 55 C 82 60 77 65 73 69 C 71 71 68 71 66 69 C 64 67 64 64 66 62 C 68 60 70 58 73 55 C 60 55 30 55 15 55 C 12 55 10 53 10 50 Z"></path></svg>`,
				"down": `<svg viewBox="10 10 80 80"><path d="M 50 10 C 53 10 55 12 55 15 C 55 30 55 60 55 73 C 58 70 60 68 62 66 C 64 64 67 64 69 66 C 71 68 71 71 69 73 C 65 77 60 82 55 87 C 53 89 52 90 50 90 C 48 90 47 89 45 87 C 40 82 35 77 31 73 C 29 71 29 68 31 66 C 33 64 36 64 38 66 C 40 68 42 70 45 73 C 45 60 45 30 45 15 C 45 12 47 10 50 10 Z"></path></svg>`,
				"left": `<svg viewBox="10 10 80 80"><path d="M 50 10 C 53 10 55 12 55 15 C 55 30 55 60 55 73 C 58 70 60 68 62 66 C 64 64 67 64 69 66 C 71 68 71 71 69 73 C 65 77 60 82 55 87 C 53 89 52 90 50 90 C 48 90 47 89 45 87 C 40 82 35 77 31 73 C 29 71 29 68 31 66 C 33 64 36 64 38 66 C 40 68 42 70 45 73 C 45 60 45 30 45 15 C 45 12 47 10 50 10 Z"></path></svg>`,
				"x": `<svg viewBox="10 10 80 80"><path d="M 50 43 C 55 38 60 33 64 29 C 66 27 69 27 71 29 C 73 31 73 34 71 36 C 67 40 62 45 57 50 C 62 55 67 60 71 64 C 73 66 73 69 71 71 C 69 73 66 73 64 71 C 60 67 55 62 50 57 C 45 62 40 67 36 71 C 34 73 31 73 29 71 C 27 69 27 66 29 64 C 33 60 38 55 43 50 C 38 45 33 40 29 36 C 27 34 27 31 29 29 C 31 27 34 27 36 29 C 40 33 45 38 50 43 Z"></path></svg>`,
				"union": `<svg viewBox="10 10 80 80"><path d="M 75 55 C 75 69 64 80 50 80 C 36 80 25 69 25 55 C 25 50 25 28 25 25 C 25 22 27 20 30 20 C 33 20 35 22 35 25 C 35 28 35 50 35 55 C 35 62 43 70 50 70 C 57 70 65 62 65 55 C 65 50 65 28 65 25 C 65 22 67 20 70 20 C 73 20 75 22 75 25 C 75 28 75 50 75 55 Z"></path></svg>`,
				"intersect": `<svg viewBox="10 10 80 80"><path d="M 25 45 C 25 31 36 20 50 20 C 64 20 75 31 75 45 C 75 50 75 72 75 75 C 75 78 73 80 70 80 C 67 80 65 78 65 75 C 65 72 65 50 65 45 C 65 38 57 30 50 30 C 43 30 35 38 35 45 C 35 50 35 72 35 75 C 35 78 33 80 30 80 C 27 80 25 78 25 75 C 25 72 25 50 25 45 Z"></path></svg>`,
				"combine": `<svg viewBox="0 0 100 100"><path d="M 10 50 C 10 72 28 90 50 90 C 72 90 90 72 90 50 C 90 28 72 10 50 10 C 28 10 10 28 10 50 Z M 0 50 C 0 22.5 22.5 0 50 0 C 77.5 0 100 22.5 100 50 C 100 77.5 77.5 100 50 100 C 22.5 100 0 77.5 0 50 Z  M 55 45 C 62 45 69 45 75 45 C 78 45 80 47 80 50 C 80 53 78 55 75 55 C 69 55 62 55 55 55 C 55 62 55 69 55 75 C 55 78 53 80 50 80 C 47 80 45 78 45 75 C 45 69 45 62 45 55 C 38 55 31 55 25 55 C 22 55 20 53 20 50 C 20 47 22 45 25 45 C 31 45 38 45 45 45 C 45 38 45 31 45 25 C 45 22 47 20 50 20 C 53 20 55 22 55 25 C 55 31 55 38 55 45 Z"></path></svg>`,
				"subtract": `<svg viewBox="0 0 100 100"><path d="M 10 50 C 10 72 28 90 50 90 C 72 90 90 72 90 50 C 90 28 72 10 50 10 C 28 10 10 28 10 50 Z M 0 50 C 0 22.5 22.5 0 50 0 C 77.5 0 100 22.5 100 50 C 100 77.5 77.5 100 50 100 C 22.5 100 0 77.5 0 50 Z  M 20 50 C 20 47 22 45 25 45 C 40 45 60 45 75 45 C 78 45 80 47 80 50 C 80 53 78 55 75 55 C 60 55 40 55 25 55 C 22 55 20 53 20 50 Z"></path></svg>`,
				"subdivide": `<svg viewBox="10 10 80 80"><path d="M 20 50 C 30 40 40 30 50 20 C 60 30 70 40 80 50 C 70 60 60 70 50 80 C 40 70 30 60 20 50 Z M 45 20 C 40 25 25 40 20 45 C 20 35 20 25 20 20 C 25 20 35 20 45 20 Z M 45 80 C 35 80 25 80 20 80 C 20 75 20 65 20 55 C 25 60 40 75 45 80 Z M 80 55 C 80 65 80 75 80 80 C 75 80 65 80 55 80 C 60 75 75 60 80 55 Z M 55 20 C 65 20 75 20 80 20 C 80 25 80 35 80 45 C 75 40 60 25 55 20 Z"></path></svg>`,
				"scale": `<svg viewBox="10 10 80 80"><path d="M 50 57 C 46 61 41 66 37 70 C 41 70 42 70 43 70 C 46 70 48 72 48 75 C 48 78 46 80 43 80 C 41 80 34 80 27 80 C 25 80 23 80 21.5 78.5 C 20 77 20 75 20 73 C 20 66 20 59 20 57 C 20 54 22 52 25 52 C 28 52 30 54 30 57 C 30 58 30 59 30 63 C 34 59 39 54 43 50 C 35 42 31 38 30 37 C 30 41 30 42 30 43 C 30 46 28 48 25 48 C 22 48 20 46 20 43 C 20 41 20 34 20 27 C 20 24 20 23 21.5 21.5 C 23 20 24 20 27 20 C 34 20 41 20 43 20 C 46 20 48 22 48 25 C 48 28 46 30 43 30 C 42 30 41 30 37 30 C 38 31 42 35 50 43 C 58 35 62 31 63 30 C 59 30 58 30 57 30 C 54 30 52 28 52 25 C 52 22 54 20 57 20 C 59 20 66 20 73 20 C 76 20 77 20 78.5 21.5 C 80 23 80 24 80 27 C 80 34 80 41 80 43 C 80 46 78 48 75 48 C 72 48 70 46 70 43 C 70 42 70 41 70 37 C 69 38 65 42 57 50 C 61 54 66 59 70 63 C 70 59 70 58 70 57 C 70 54 72 52 75 52 C 78 52 80 54 80 57 C 80 59 80 66 80 73 C 80 75 80 77 78.5 78.5 C 77 80 75 80 73 80 C 66 80 59 80 57 80 C 54 80 52 78 52 75 C 52 72 54 70 57 70 C 58 70 59 70 63 70 C 59 66 54 61 50 57 Z"></path></svg>`,
				"horizontal": `<svg viewBox="10 10 80 80"><path d="M 73 45 C 70 42 68 40 66 38 C 64 36 64 33 66 31 C 68 29 71 29 73 31 C 77 35 81 39 87 45 C 89 47 90 48 90 50 C 90 52 89 53 87 55 C 82 60 77 65 73 69 C 71 71 68 71 66 69 C 64 67 64 64 66 62 C 68 60 70 58 73 55 C 70 55 30 55 27 55 C 30 58 32 60 34 62 C 36 64 36 67 34 69 C 32 71 29 71 27 69 C 23 65 18 60 13 55 C 11 53 10 52 10 50 C 10 48 11 47 13 45 C 18 40 23 35 27 31 C 29 29 32 29 34 31 C 36 33 36 36 34 38 C 32 40 30 42 27 45 C 30 45 70 45 73 45 Z"></path></svg>`,
				"vertical": `<svg viewBox="10 10 80 80"><path d="M 45 27 C 42 30 40 32 38 34 C 36 36 33 36 31 34 C 29 32 29 29 31 27 C 35 23 39 19 45 13 C 47 11 48 10 50 10 C 52 10 53 11 55 13 C 60 18 65 23 69 27 C 71 29 71 32 69 34 C 67 36 64 36 62 34 C 60 32 58 30 55 27 C 55 30 55 70 55 73 C 58 70 60 68 62 66 C 64 64 67 64 69 66 C 71 68 71 71 69 73 C 65 77 60 82 55 87 C 53 89 52 90 50 90 C 48 90 47 89 45 87 C 40 82 35 77 31 73 C 29 71 29 68 31 66 C 33 64 36 64 38 66 C 40 68 42 70 45 73 C 45 70 45 30 45 27 Z"></path></svg>`,
				"skew": `<svg viewBox="20 20 60 60"><path d="M 46 55 C 49 55 53 55 56 55 C 56 55 56 55 56 55 C 56 55 56 55 56 55 C 55 50 55 50 54 45 C 54 45 54 45 54 45 C 51 45 47 45 44 45 C 45 50 45 50 46 55 Z M 66 55 C 67 60 67 60 67 60 C 68 65 68 65 66 65 C 60 65 40 65 38 65 C 35 65 31 65 28 65 C 25 65 23 65 22 60 C 21 55 23 55 26 55 C 29 55 33 55 36 55 C 35 50 35 50 34 45 C 33 40 33 40 33 40 C 32 35 32 35 34 35 C 40 35 60 35 62 35 C 65 35 69 35 72 35 C 75 35 77 35 78 40 C 79 45 77 45 74 45 C 71 45 67 45 64 45 C 65 50 65 50 66 55 Z"></path></svg>`,
				"rotate": `<svg viewBox="10 10 80 80"><path d="M 45 75 C 45 72 47 70 50 70 C 61 70 70 61 70 50 C 70 39 61 30 50 30 C 41 30 33 36 30 47 C 33 44 36 44 38 46 C 40 48 40 51 38 53 C 36 55 33 58 31 60 C 29 62 27 64 25 64 C 23 64 21 62 19 60 C 17 58 14 55 12 53 C 10 51 10 48 12 46 C 14 44 17 44 19 46 C 19 46 19 46 20 47 C 23 29 36 20 50 20 C 67 20 80 33 80 50 C 80 67 67 80 50 80 C 47 80 45 78 45 75 Z"></path></svg>`,
				"divide": `<svg viewBox="10 10 80 80"><path d="M 43 70 C 43 66 46 63 50 63 C 54 63 57 66 57 70 C 57 74 54 77 50 77 C 46 77 43 74 43 70 Z M 43 30 C 43 26 46 23 50 23 C 54 23 57 26 57 30 C 57 34 54 37 50 37 C 46 37 43 34 43 30 Z M 20 50 C 20 47 22 45 25 45 C 40 45 60 45 75 45 C 78 45 80 47 80 50 C 80 53 78 55 75 55 C 60 55 40 55 25 55 C 22 55 20 53 20 50 Z"></path></svg>`,
				"plus": `<svg viewBox="10 10 80 80"><path d="M 55 45 C 62 45 69 45 75 45 C 78 45 80 47 80 50 C 80 53 78 55 75 55 C 69 55 62 55 55 55 C 55 62 55 69 55 75 C 55 78 53 80 50 80 C 47 80 45 78 45 75 C 45 69 45 62 45 55 C 38 55 31 55 25 55 C 22 55 20 53 20 50 C 20 47 22 45 25 45 C 31 45 38 45 45 45 C 45 38 45 31 45 25 C 45 22 47 20 50 20 C 53 20 55 22 55 25 C 55 31 55 38 55 45 Z"></path></svg>`,
				"polygon": `<svg viewBox="20 20 60 60"><path d="M 65 56 C 65 56 67 61 71 71 C 61 67 56 65 56 65 C 56 65 52 75 50 80 C 48 75 44 65 44 65 C 44 65 39 67 29 71 C 33 61 35 56 35 56 C 35 56 25 52 20 50 C 25 48 35 44 35 44 C 35 44 33 39 29 29 C 39 33 44 35 44 35 C 44 35 48 25 50 20 C 52 25 56 35 56 35 C 56 35 61 33 71 29 C 67 39 65 44 65 44 C 65 44 75 48 80 50 C 75 52 65 56 65 56 Z"></path></svg>`,
				"path": `<svg viewBox="20 20 60 60"><path d="M 22 58 C 18 54 22 51 28 45 C 30 43 34 40 40 40 C 46 40 50 43 52 45 C 54 47 57 50 60 50 C 63 50 66 47 68 45 C 71 42 74 38 78 42 C 82 46 78 49 72 55 C 70 57 66 60 60 60 C 54 60 50 57 48 55 C 46 53 43 50 40 50 C 37 50 34 53 32 55 C 29 58 26 62 22 58 Z"></path></svg>`,
				"curves": `<svg viewBox="20 20 60 60"><path d="M 71 56 C 70 57 64 63 57 70 C 54 73 56 71 56 75 C 56 78 54 80 51 80 C 48 80 46 78 46 75 C 46 72 48 70 51 70 C 55 70 53 72 56 69 C 63 62 65 60 66 59 C 66 59 65 60 60 60 C 54 60 50 57 48 55 C 46 53 43 50 40 50 C 37 50 34 53 32 55 C 29 58 26 62 22 58 C 19 55 20 53 24 49 C 25 48 26 47 29 44 C 30 43 36 37 43 30 C 46 27 44 29 44 25 C 44 22 46 20 49 20 C 52 20 54 22 54 25 C 54 28 52 30 49 30 C 45 30 47 28 44 31 C 37 38 35 40 34 41 C 34 41 35 40 40 40 C 46 40 50 43 52 45 C 54 47 57 50 60 50 C 63 50 66 47 68 45 C 71 42 74 38 78 42 C 81 45 80 47 76 51 C 75 52 74 53 71 56 Z"></path></svg>`,
			}
		}

	/* state */
		const STATE = {
			clicked: false,
			drawing: null,
			dimensions: {
				offsetX: 0,
				offsetY: 0,
				size:    100,
				grid:    true
			},
			scaleItems: false,
			snapToGrid: true,
			cursor: {
				x: 0,
				y: 0,
			},
			selected: null,
			historyIndex: 0,
			history: [],
			items: {}
		}

/*** user interaction ***/
	/** load **/
		window.addEventListener(TRIGGERS.click, goFullscreen)
		function goFullscreen() {
			try {
				if (STATE.clicked || TRIGGERS.mousemove == "mousemove") {
					return
				}
				STATE.clicked = true
				document.body.requestFullscreen()
			} catch (error) {console.log(error)}
		}

	/* loadFromParameters */
		loadFromParameters()
		function loadFromParameters() {
			try {
				// empty object
					const queryParameters = {}

				// search
					const search = window.location.search?.slice(1).trim()
					if (!search || !search.length) {
						return
					}

				// parameters
					const pairs = search.split("&") || []
					for (const p in pairs) {
						const pair = decodeURIComponent(pairs[p]).split("=")
						queryParameters[pair[0].trim().toLowerCase()] = decodeURIComponent(pair[1]).trim()
					}

				// path
					if (queryParameters.path) {
						const path = queryParameters.path
						
						addItem({
							itemData: {
								attributes: {
									styling: {
										shape: "curves",
										fill: queryParameters.fill ? `#${queryParameters.fill}` : null,
										"fill-on": queryParameters.fill ? true : false,
										stroke: queryParameters.stroke ? `#${queryParameters.stroke}` : null,
										"stroke-width": queryParameters.stroke ? CONSTANTS.defaults["stroke-width"] : 0
									},
									coordinates: {
										d: path
									}
								}
							}
						})
					}
			} catch (error) {console.log(error)}
		}

	/** zoom & grid **/
		/* resizeSVG */
			ELEMENTS.controls.svgOffsetX.addEventListener(TRIGGERS.input, resizeSVG)
			ELEMENTS.controls.svgOffsetY.addEventListener(TRIGGERS.input, resizeSVG)
			ELEMENTS.controls.svgSize.addEventListener(TRIGGERS.change,   resizeSVG)
			function resizeSVG(event, data) {
				try {
					// drawing
						if (STATE.drawing) { cancelDrawing() }

					// previous
						const previousDimensions = {
							offsetX: STATE.dimensions.offsetX,
							offsetY: STATE.dimensions.offsetY,
							size:    STATE.dimensions.size
						}

					// event
						if (event) {
							STATE.dimensions.offsetX = Number(ELEMENTS.controls.svgOffsetX.value)
							STATE.dimensions.offsetY = Number(ELEMENTS.controls.svgOffsetY.value)
							STATE.dimensions.size    = Math.max(1, Number(ELEMENTS.controls.svgSize.value))
						}

					// data
						else if (data) {
							STATE.dimensions.offsetX = data.offsetX
							STATE.dimensions.offsetY = data.offsetY
							STATE.dimensions.size    = Math.max(1, data.size)
						}

					// snap
						if (STATE.snapToGrid) {
							STATE.dimensions.offsetX = Math.round(STATE.dimensions.offsetX)
							STATE.dimensions.offsetY = Math.round(STATE.dimensions.offsetY)
							STATE.dimensions.size    = Math.round(STATE.dimensions.size)
						}

					// inputs from values
						if (document.activeElement !== ELEMENTS.controls.svgOffsetX) {
							ELEMENTS.controls.svgOffsetX.value = STATE.dimensions.offsetX
						}
						if (document.activeElement !== ELEMENTS.controls.svgOffsetY) {
							ELEMENTS.controls.svgOffsetY.value = STATE.dimensions.offsetY
						}
						if (document.activeElement !== ELEMENTS.controls.svgSize) {
							ELEMENTS.controls.svgSize.value    = STATE.dimensions.size
						}

					// items
						if (STATE.scaleItems && STATE.dimensions.size !== previousDimensions.size) {
							const scaleFactor = STATE.dimensions.size / previousDimensions.size

							for (const id in STATE.items) {
								scaleItem(STATE.items[id], STATE.items[id].attributes.coordinates, scaleFactor, scaleFactor, 0, 0, STATE.snapToGrid)
							}
						}

					// svg
						const viewboxString = `${STATE.dimensions.offsetX} ${STATE.dimensions.offsetY} ${STATE.dimensions.size} ${STATE.dimensions.size}`
						ELEMENTS.container.svg.setAttribute("viewBox", viewboxString)

					// grid
						ELEMENTS.container.grid.setAttribute("viewBox", viewboxString)
						ELEMENTS.container.rect.setAttribute("x", STATE.dimensions.offsetX)
						ELEMENTS.container.rect.setAttribute("y", STATE.dimensions.offsetY)
						ELEMENTS.container.rect.setAttribute("width",  STATE.dimensions.size)
						ELEMENTS.container.rect.setAttribute("height", STATE.dimensions.size)

					// points
						ELEMENTS.container.points.setAttribute("viewBox", viewboxString)

					// record history
						if (event?.type) {
							recordHistory()
						}
				} catch (error) {console.log(error)}
			}

		/* setGrid */
			ELEMENTS.controls.svgGrid.addEventListener(TRIGGERS.input, setGrid)
			function setGrid(event) {
				try {
					// drawing
						if (STATE.drawing) { cancelDrawing() }

					// set state
						STATE.dimensions.grid = ELEMENTS.controls.svgGrid.checked || false

					// set styling
						if (STATE.dimensions.grid) {
							ELEMENTS.container.grid.setAttribute("visible", true)
						}
						else {
							ELEMENTS.container.grid.removeAttribute("visible")	
						}
				} catch (error) {console.log(error)}
			}

		/* setScale */
			ELEMENTS.controls.svgScale.addEventListener(TRIGGERS.input, setScale)
			function setScale(event) {
				try {
					// drawing
						if (STATE.drawing) { cancelDrawing() }
						
					// checked
						STATE.scaleItems = Boolean(ELEMENTS.controls.svgScale.checked)
				} catch (error) {console.log(error)}
			}

		/* setSnap */
			ELEMENTS.controls.svgSnap.addEventListener(TRIGGERS.input, setSnap)
			function setSnap(event) {
				try {
					// drawing
						if (STATE.drawing) { cancelDrawing() }
						
					// checked
						STATE.snapToGrid = Boolean(ELEMENTS.controls.svgSnap.checked)
				} catch (error) {console.log(error)}
			}

	/** exports **/
		/* exportSVG */
			ELEMENTS.controls.exportSVG.addEventListener(TRIGGERS.click, exportSVG)
			function exportSVG(event) {
				try {
					// drawing
						if (STATE.drawing) { cancelDrawing()
						 r
						}
						
					// being exported
						if (ELEMENTS.controls.exportSVG.getAttribute("disabled")) {
							return
						}
						ELEMENTS.controls.exportSVG.setAttribute("disabled", true)

					// from SVG element
						const xml = ELEMENTS.container.svg.outerHTML
							.replace('<svg', '<svg version="1.1" xmlns="http://www.w3.org/2000/svg"')
							.replace(/\sid="[^"]+"/g, "")
							.replace(/\n/g, " ")
							.replace(/\shighlight=\"true\"/g, "")
							.replace(/\svisible=\"true\"/g, "")

					// download link
						const downloadLink = document.createElement("a")
							downloadLink.setAttribute("href", "data:image/svg+xml," + encodeURIComponent(xml))
							downloadLink.setAttribute("download", "iconDesigner_" + (new Date().getTime()) + ".svg")

					// download
						downloadLink.click()
						setTimeout(() => {
							downloadLink.remove()
						}, 0)
					
					// timeout
						setTimeout(() => {
							ELEMENTS.controls.exportSVG.removeAttribute("disabled")
						}, CONSTANTS.exportWaitTime)
				} catch (error) {console.log(error)}
			}

		/* exportPNG */
			ELEMENTS.controls.exportPNG.addEventListener(TRIGGERS.click, exportPNG)
			function exportPNG(event) {
				try {
					// drawing
						if (STATE.drawing) { cancelDrawing() }
						
					// being exported
						if (ELEMENTS.controls.exportPNG.getAttribute("disabled")) {
							return
						}
						ELEMENTS.controls.exportPNG.setAttribute("disabled", true)

					// order
						const itemIds = Array.from(ELEMENTS.container.svg.childNodes).map(element => element.id.slice(3))

					// convert to paths
						const paths = {}
						for (const id of itemIds) {
							const path = getPathFromPrimitive(STATE.items[id])
							const commands = getCommandsFromPath(path)
							const absoluteCommands = getAbsoluteCommands(commands)
							const absolutePath = getPathFromCommands(absoluteCommands).split(/\n/g).join(" ")
							paths[id] = absolutePath
						}

					// create canvas
						const canvas = document.createElement("canvas")
							canvas.width  = STATE.dimensions.size
							canvas.height = STATE.dimensions.size
						document.body.appendChild(canvas)

					// move
						const context = canvas.getContext("2d")
						context.translate(-STATE.dimensions.offsetX, -STATE.dimensions.offsetY)

					// draw
						for (const id of itemIds) {
							const item = STATE.items[id]

							if (item.attributes.styling["fill-on"]) {
								context.fillStyle = item.attributes.styling.fill ?? CONSTANTS.defaults.fill
								context.fill(new Path2D(paths[id]))
							}
							if (Number(item.attributes.styling["stroke-width"])) {
								context.strokeStyle = item.attributes.styling.stroke ?? CONSTANTS.defaults.stroke
								context.lineWidth = Number(item.attributes.styling["stroke-width"]) ?? CONSTANTS.defaults["stroke-width"]
								context.lineCap = item.attributes.styling["stroke-linecap"] ?? CONSTANTS.defaults["stroke-linecap"]
								context.lineJoin = item.attributes.styling["stroke-linejoin"] ?? CONSTANTS.defaults["stroke-linejoin"]
								context.stroke(new Path2D(paths[id]))
							}
						}

					// get image
						const imageData = canvas.toDataURL("image/png")

					// download link
						const downloadLink = document.createElement("a")
							downloadLink.setAttribute("href", imageData)
							downloadLink.setAttribute("download", "iconDesigner_" + (new Date().getTime()) + ".png")

					// download
						downloadLink.click()
						setTimeout(() => {
							canvas.remove()
							downloadLink.remove()
						}, 0)
					
					// timeout
						setTimeout(() => {
							ELEMENTS.controls.exportPNG.removeAttribute("disabled")
						}, CONSTANTS.exportWaitTime)
				} catch (error) {console.log(error)}
			}

		/* exportClippath */
			ELEMENTS.controls.exportClippath.addEventListener(TRIGGERS.click, exportClippath)
			function exportClippath(event) {
				try {
					// drawing
						if (STATE.drawing) { cancelDrawing() }
						
					// being copied
						if (ELEMENTS.controls.exportClippath.getAttribute("disabled")) {
							return
						}

					// order
						const itemIds = Array.from(ELEMENTS.container.svg.childNodes).map(element => element.id.slice(3))

					// convert to paths
						const paths = {}
						for (const id of itemIds) {
							const path = getPathFromPrimitive(STATE.items[id])
							const commands = getCommandsFromPath(path)
							const absoluteCommands = getAbsoluteCommands(commands)
							const absolutePath = getPathFromCommands(absoluteCommands)
							paths[id] = absolutePath.split(/\n/g).join(" ")
						}

					// clippathText
						const clippathText = []
						for (const id of itemIds) {
							const item = STATE.items[id]
							let pathText = `#${id} {\n`

							if (item.attributes.styling["fill-on"] && item.attributes.styling.fill && item.attributes.styling.fill !== "transparent") {
								pathText += `  background-color: ${item.attributes.styling.fill ?? CONSTANTS.defaults.fill};\n`
							}
							pathText += `  clip-path: path('${paths[id]}');\n`
							pathText += `}\n`

							clippathText.push(pathText)
						}

					// to clipboard
						navigator.clipboard.writeText(clippathText.join("\n")).then(() => {
							ELEMENTS.controls.exportClippath.setAttribute("disabled", true)
							setTimeout(() => {
								ELEMENTS.controls.exportClippath.removeAttribute("disabled")
							}, CONSTANTS.exportWaitTime)
						}).catch(console.log)
				} catch (error) {console.log(error)}
			}

		/* exportCanvas */
			ELEMENTS.controls.exportCanvas.addEventListener(TRIGGERS.click, exportCanvas)
			function exportCanvas(event) {
				try {
					// drawing
						if (STATE.drawing) { cancelDrawing() }
						
					// being copied
						if (ELEMENTS.controls.exportCanvas.getAttribute("disabled")) {
							return
						}

					// order
						const itemIds = Array.from(ELEMENTS.container.svg.childNodes).map(element => element.id.slice(3))

					// convert to paths
						const paths = {}
						for (const id of itemIds) {
							const path = getPathFromPrimitive(STATE.items[id])
							const commands = getCommandsFromPath(path)
							const absoluteCommands = getAbsoluteCommands(commands)
							const absolutePath = getPathFromCommands(absoluteCommands)
							paths[id] = absolutePath.split(/\n/g).join(" ")
						}

					// canvasText
						const canvasText = []
						for (const id of itemIds) {
							const item = STATE.items[id]
							let pathText = ``

							if (item.attributes.styling["fill-on"] && item.attributes.styling.fill && item.attributes.styling.fill !== "transparent") {
								pathText += `context.fillStyle = "${item.attributes.styling.fill ?? CONSTANTS.defaults.fill}";\n`
								pathText += `context.fill(new Path2D("${paths[id]}"));\n`
							}
							if (Number(item.attributes.styling["stroke-width"])) {
								pathText += `context.strokeStyle = "${item.attributes.styling.stroke ?? CONSTANTS.defaults.stroke}";\n`
								pathText += `context.lineWidth = "${Number(item.attributes.styling["stroke-width"]) ?? CONSTANTS.defaults["stroke-width"]}";\n`
								pathText += `context.lineCap = "${item.attributes.styling["stroke-linecap"] ?? CONSTANTS.defaults["stroke-linecap"]}";\n`
								pathText += `context.lineJoin = "${item.attributes.styling["stroke-linejoin"] ?? CONSTANTS.defaults["stroke-linejoin"]}";\n`
								pathText += `context.stroke(new Path2D("${paths[id]}"));\n`
							}

							canvasText.push(pathText)
						}

					// to clipboard
						navigator.clipboard.writeText(canvasText.join("\n")).then(() => {
							ELEMENTS.controls.exportCanvas.setAttribute("disabled", true)
							setTimeout(() => {
								ELEMENTS.controls.exportCanvas.removeAttribute("disabled")
							}, CONSTANTS.exportWaitTime)
						}).catch(console.log)
				} catch (error) {console.log(error)}
			}

	/** import **/
		/* importSVG */
			ELEMENTS.controls.import.addEventListener(TRIGGERS.input, importSVG)
			function importSVG(event) {
				try {
					// drawing
						if (STATE.drawing) { cancelDrawing() }
						
					// reader
						const reader = new FileReader()
						reader.onload = event => {
							const svgString = String(event.target.result)
							const domParser = new DOMParser()
							const svgXML = domParser.parseFromString(svgString, "image/svg+xml")?.documentElement
							if (!svgXML) {
								return
							}
							parseSVG(svgXML)
							recordHistory()
							ELEMENTS.controls.import.value = ""
						}
						reader.readAsText(event.target.files[0])
				} catch (error) {console.log(error)}
			}

		/* dragFile */
			ELEMENTS.container.element.addEventListener(TRIGGERS.dragover, dragFile)
			function dragFile(event) {
				try {
					event.preventDefault()
				} catch (error) {console.log(error)}
			}

		/* dropFile */
			ELEMENTS.container.element.addEventListener(TRIGGERS.drop, dropFile)
			function dropFile(event) {
				try {
					// prevent default
						event.preventDefault()
						if (!event.dataTransfer || !event.dataTransfer.items) {
							return
						}

					// file
						const file = [...event.dataTransfer.items][0].getAsFile()
						if (!file) {
							return
						}
						if (file.type !== "image/svg+xml") {
							return
						}

					// drawing
						if (STATE.drawing) { cancelDrawing() }
						
					// reader
						const reader = new FileReader()
						reader.onload = event => {
							const svgString = String(event.target.result)
							const domParser = new DOMParser()
							const svgXML = domParser.parseFromString(svgString, "image/svg+xml")?.documentElement
							if (!svgXML) {
								return
							}
							parseSVG(svgXML)
							recordHistory()
							ELEMENTS.controls.import.value = ""
						}
						reader.readAsText(file)
				} catch (error) {console.log(error)}
			}

		/* parseSVG */
			function parseSVG(svgXML) {
				try {
					// get dimensions
						const viewbox = svgXML.getAttribute("viewBox").split(/\s/) || []
						const offsetX = Number(viewbox[0]) || 0
						const offsetY = Number(viewbox[1]) || 0
						const width   = Number(viewbox[2]) || 1
						const height  = Number(viewbox[3]) || 1
						const size    = Math.max(width, height)

					// set dimensions
						resizeSVG(null, {offsetX, offsetY, size})

					// elements
						const svgElements = Array.from(svgXML.querySelectorAll(CONSTANTS.options.shape.join(", ")))
						for (const i in svgElements) {
							// base data
								const element = svgElements[i]
								const itemData = {
									attributes: {
										styling: {
											shape: element.tagName.toLowerCase()
										},
										coordinates: {}
									}
								}

							// styling
								itemData.attributes.styling["stroke"] = element.getAttribute("stroke") || CONSTANTS.defaults.stroke
								itemData.attributes.styling["stroke-width"] = element.getAttribute("stroke-width") || 0
								itemData.attributes.styling["stroke-linejoin"] = element.getAttribute("stroke-linejoin") || CONSTANTS.defaults["stroke-linejoin"]
								itemData.attributes.styling["stroke-linecap"] = element.getAttribute("stroke-linecap") || CONSTANTS.defaults["stroke-linecap"]
								itemData.attributes.styling["fill"] = element.getAttribute("fill") !== "transparent" ? element.getAttribute("fill") : CONSTANTS.defaults.fill
								itemData.attributes.styling["fill-on"] = (element.getAttribute("fill") && element.getAttribute("fill") !== "transparent")

							// coordinates
								if (itemData.attributes.styling.shape == "circle") {
									itemData.attributes.coordinates.cx = element.getAttribute("cx")?.includes("%") ? Number(element.getAttribute("cx").replace("%", "")) * width  / CONSTANTS.percent : Number(element.getAttribute("cx")) || 0
									itemData.attributes.coordinates.cy = element.getAttribute("cx")?.includes("%") ? Number(element.getAttribute("cy").replace("%", "")) * height / CONSTANTS.percent : Number(element.getAttribute("cy")) || 0
									itemData.attributes.coordinates.r  = element.getAttribute("r" )?.includes("%") ? Number(element.getAttribute("r" ).replace("%", "")) * width  / CONSTANTS.percent : Number(element.getAttribute("r" )) || 0
								}
								else if (itemData.attributes.styling.shape == "ellipse") {
									itemData.attributes.coordinates.cx = element.getAttribute("cx")?.includes("%") ? Number(element.getAttribute("cx").replace("%", "")) * width  / CONSTANTS.percent : Number(element.getAttribute("cx")) || 0
									itemData.attributes.coordinates.cy = element.getAttribute("cy")?.includes("%") ? Number(element.getAttribute("cy").replace("%", "")) * height / CONSTANTS.percent : Number(element.getAttribute("cy")) || 0
									itemData.attributes.coordinates.rx = element.getAttribute("rx")?.includes("%") ? Number(element.getAttribute("rx").replace("%", "")) * width  / CONSTANTS.percent : Number(element.getAttribute("rx")) || 0
									itemData.attributes.coordinates.ry = element.getAttribute("ry")?.includes("%") ? Number(element.getAttribute("ry").replace("%", "")) * height / CONSTANTS.percent : Number(element.getAttribute("ry")) || 0
								}
								else if (itemData.attributes.styling.shape == "rect") {
									itemData.attributes.coordinates.x  = element.getAttribute("x" )?.includes("%") ? Number(element.getAttribute("x" ).replace("%", "")) * width  / CONSTANTS.percent : Number(element.getAttribute("x" )) || 0
									itemData.attributes.coordinates.y  = element.getAttribute("y" )?.includes("%") ? Number(element.getAttribute("y" ).replace("%", "")) * height / CONSTANTS.percent : Number(element.getAttribute("y" )) || 0
									itemData.attributes.coordinates.rx = element.getAttribute("rx")?.includes("%") ? Number(element.getAttribute("rx").replace("%", "")) * width  / CONSTANTS.percent : Number(element.getAttribute("rx")) || 0
									itemData.attributes.coordinates.ry = element.getAttribute("ry")?.includes("%") ? Number(element.getAttribute("ry").replace("%", "")) * height / CONSTANTS.percent : Number(element.getAttribute("ry")) || 0
									itemData.attributes.coordinates.width  = element.getAttribute("width" )?.includes("%") ? Number(element.getAttribute("width" ).replace("%", "")) * width  / CONSTANTS.percent : Number(element.getAttribute("width" )) || 0
									itemData.attributes.coordinates.height = element.getAttribute("height")?.includes("%") ? Number(element.getAttribute("height").replace("%", "")) * height / CONSTANTS.percent : Number(element.getAttribute("height")) || 0
								}
								else if (itemData.attributes.styling.shape == "line") {
									itemData.attributes.coordinates.x1 = element.getAttribute("x1")?.includes("%") ? Number(element.getAttribute("x1").replace("%", "")) * width  / CONSTANTS.percent : Number(element.getAttribute("x1")) || 0
									itemData.attributes.coordinates.y1 = element.getAttribute("y1")?.includes("%") ? Number(element.getAttribute("y1").replace("%", "")) * height / CONSTANTS.percent : Number(element.getAttribute("y1")) || 0
									itemData.attributes.coordinates.x2 = element.getAttribute("x2")?.includes("%") ? Number(element.getAttribute("x2").replace("%", "")) * width  / CONSTANTS.percent : Number(element.getAttribute("x2")) || 0
									itemData.attributes.coordinates.y2 = element.getAttribute("y2")?.includes("%") ? Number(element.getAttribute("y2").replace("%", "")) * height / CONSTANTS.percent : Number(element.getAttribute("y2")) || 0
								}
								else if (itemData.attributes.styling.shape == "polygon" || itemData.attributes.styling.shape == "polyline") {
									const numbers = element.getAttribute("points")?.replace(/,/g, " ").replace(/\n/g, " ").replace(/\s+/g, " ").split(/\s/g) || []
									const points = []
									for (let n = 0; n < numbers.length; n += 2) {
										const x = roundNumber(numbers[n    ].includes("%") ? Number(numbers[n    ].replace("%", "")) * width  / CONSTANTS.percent : Number(numbers[n    ]))
										const y = roundNumber(numbers[n + 1].includes("%") ? Number(numbers[n + 1].replace("%", "")) * height / CONSTANTS.percent : Number(numbers[n + 1]))
										points.push(`${x},${y}`)
									}

									itemData.attributes.coordinates.points = points.join("\n")
								}
								else if (itemData.attributes.styling.shape == "path") {
									const rawPath = element.getAttribute("d")
									const commands = getCommandsFromPath(rawPath)
									itemData.attributes.coordinates.d = getPathFromCommands(commands)

									if (!commands.find(command => ["m","l","L","h","H","v","V","c","s","S","q","Q","t","T","a","A","z"].includes(command[0]))) {
										itemData.attributes.styling.shape = "curves"
									}
								}

							// build item
								const newItem = addItem({itemData})

							// transforms
								if (element.getAttribute("transform")) {
									parseSVGTransformations(newItem, element.getAttribute("transform"))
								}
								let parent = element.parentNode
								while (parent && parent !== svgXML) {
									if (parent.getAttribute("transform")) {
										parseSVGTransformations(newItem, parent.getAttribute("transform"))
									}
									parent = parent.parentNode
								}
						}
				} catch (error) {console.log(error)}
			}

		/* parseSVGTransformations */
			function parseSVGTransformations(item, transformString) {
				try {
					// get transforms
						const transforms = transformString.split(")").map(transformText => transformText.trim().split("("))
						for (let t = 0; t < transforms.length; t++) {
							const type = transforms[t][0].trim()
							if (!type) {
								transforms.splice(t, 1)
								t--
								continue
							}
							const args = transforms[t][1].replace(/,/g, " ").replace(/\n/g, " ").replace(/\s+/g, " ").split(/\s/g).map(text => Number(text))
							transforms[t] = {type, args}
						}

					// loop through
						for (let t = transforms.length - 1; t >= 0; t--) {
							const transform = transforms[t]

							// matrix --> decompose
								if (transform.type == "matrix") {
									// https://frederic-wang.fr/decomposition-of-2d-transform-matrices.html
									const [a, b, c, d, e, f] = transform.args
									const determinant = a * d - b * c

									if (a) {      // a != 0 --> translate(e,f) skewY(atan(b/a)) scale(a, Δ/a) skewX(c/a)
										transforms.splice(t, 1, 
											{type: "translate", args: [e, f]},
											{type: "skewY",     args: [Math.atan(b / a) * CONSTANTS.circleDegrees / CONSTANTS.circleRadians]},
											{type: "scale",     args: [a, determinant / a]},
											{type: "skewX",     args: [Math.atan(c / a) * CONSTANTS.circleDegrees / CONSTANTS.circleRadians]}
										)
										t += 4
									}
									else if (b) { // b != 0 --> translate(e,f) rotate(90°) scale(b, Δ/b) skewX(d/b)
										transforms.splice(t, 1, 
											{type: "translate", args: [e, f]},
											{type: "rotate",    args: [90]},
											{type: "scale",     args: [b, determinant / b]},
											{type: "skewX",     args: [Math.atan(d / b) * CONSTANTS.circleDegrees / CONSTANTS.circleRadians]}
										)
										t += 4
									}
									else {   // a == b == 0 --> translate(e,f) scale(c, d) skewX(45°) scale(0, 1)
										transforms.splice(t, 1, 
											{type: "translate", args: [e, f]},
											{type: "scale",     args: [c, d]},
											{type: "skewX",     args: [45]},
											{type: "scale",     args: [0, 1]}
										)
										t += 4
									}
								}

							// simple
								else if (transform.type == "rotate") {
									rotateItem(item, duplicateObject(item.attributes.coordinates), transform.args[0] ?? 0, transform.args[1] ?? 0, transform.args[2] ?? 0)
								}
								else if (transform.type == "scale") {
									scaleItem(item, duplicateObject(item.attributes.coordinates), transform.args[0] ?? 1, transform.args[1] ?? transform.args[0] ?? 1, 0, 0)
								}
								else if (transform.type == "skewX") {
									skewItem(item, duplicateObject(item.attributes.coordinates), transform.args[0] ?? 0, 0, 0, 0)
								}
								else if (transform.type == "skewY") {
									skewItem(item, duplicateObject(item.attributes.coordinates), 0, transform.args[0] ?? 0, 0, 0)
								}
								else if (transform.type == "translate") {
									translateItem(item, duplicateObject(item.attributes.coordinates), transform.args[0] ?? 0, transform.args[1] ?? 0)
								}
						}
				} catch (error) {console.log(error)}
			}

	/** other main controls **/
		/* addItem */
			ELEMENTS.controls.add.focus()
			ELEMENTS.controls.addShape.addEventListener(TRIGGERS.input, addItem)
			function addItem(event) {
				try {
					// drawing
						if (STATE.drawing) { cancelDrawing() }
						
					// select dropdown
						if (event?.target == ELEMENTS.controls.addShape && event.type == TRIGGERS.click) {
							return
						}

					// id
						const id = event?.itemData?.id ?? `_${generateRandom()}`

					// item
						const shape = event?.itemData?.attributes.styling.shape ?? ELEMENTS.controls.addShape.value
						const svgType = CONSTANTS.options.shape.includes(shape) ? shape :
										 shape == "curves" ? "path" : "polygon"
						const item = {
							id,
							attributes: {
								visible: true,
								locked: false,
								styling: {
									shape: svgType,
									stroke: event?.itemData?.attributes.styling.stroke ?? CONSTANTS.defaults.stroke,
									"stroke-width": event?.itemData?.attributes.styling["stroke-width"] ?? CONSTANTS.defaults["stroke-width"],
									"stroke-linecap": event?.itemData?.attributes.styling["stroke-linecap"] ?? CONSTANTS.defaults["stroke-linecap"],
									"stroke-linejoin": event?.itemData?.attributes.styling["stroke-linejoin"] ?? CONSTANTS.defaults["stroke-linejoin"],
									"fill-on": event?.itemData?.attributes.styling["fill-on"] ?? CONSTANTS.defaults["fill-on"],
									fill: event?.itemData?.attributes.styling.fill ?? CONSTANTS.defaults.fill
								},
								coordinates: event?.itemData?.attributes.coordinates ?? getTranslatedCoordinates(
									getScaledCoordinates(duplicateObject(
										CONSTANTS.defaults.coordinates[shape]
									), STATE.dimensions.size / CONSTANTS.percent, STATE.dimensions.size / CONSTANTS.percent),
								STATE.dimensions.offsetX, STATE.dimensions.offsetY)

							},
							svg: event?.itemData?.svg,
							listing: event?.itemData?.listing
						}

					// curves
						if (event?.itemData?.attributes?.curves) {
							item.attributes.curves = event.itemData.attributes.curves
						}
						if (shape == "curves") {
							const commands = getCommandsFromPath(item.attributes.coordinates.d)
							const absoluteCommands = getAbsoluteCommands(commands)
							const simplifiedCommands = getSimplifiedCommands(absoluteCommands)
							item.attributes.coordinates.d = getPathFromCommands(simplifiedCommands)
							item.attributes.curves = getCurvesFromCommands(simplifiedCommands)
						}

					// build item listing
						item.listing = buildItemListing(item)

					// build item svg
						item.svg = buildItemSVG(item)

					// draw
						if (shape == "draw...") {
							STATE.drawing = {
								id: id,
								timestamp: null,
								points: []
							}
							item.listing.container.setAttribute("shape", "draw...")
							item.listing.summary.nameElement.innerText = "draw..."
						}

					// save
						STATE.items[id] = item
					
					// record history
						if (event?.type) {
							recordHistory()
						}

					// actual event
						if (event && !event.itemData) {
							ELEMENTS.controls.addShape.value = "circle"
						}

					// return
						return STATE.items[id]
				} catch (error) {console.log(error)}
			}

		/* undoAction */
			ELEMENTS.controls.undo.addEventListener(TRIGGERS.click, undoAction)
			function undoAction(event) {
				try {
					// drawing
						if (STATE.drawing) { cancelDrawing() }
						
					// no history?
						if (STATE.historyIndex == 0 || !STATE.history.length) {
							return
						}

					// grab previous state
						STATE.historyIndex -= 1

					// import from history
						const svgString = STATE.history[STATE.historyIndex - 1]
						
					// clear everything
						for (const i in STATE.items) {
							STATE.items[i].listing?.container?.remove()
							STATE.items[i].svg?.remove()
							STATE.items[i].points?.group?.remove()
							delete STATE.items[i]
						}

					// parse
						if (!svgString || !svgString.length) {
							return
						}
						const domParser = new DOMParser()
						const svgXML = domParser.parseFromString(svgString, "image/svg+xml")?.documentElement
						if (!svgXML) {
							return
						}
						parseSVG(svgXML)
				} catch (error) {console.log(error)}
			}

		/* redoAction */
			ELEMENTS.controls.redo.addEventListener(TRIGGERS.click, redoAction)
			function redoAction(event) {
				try {
					// drawing
						if (STATE.drawing) { cancelDrawing() }
						
					// no future?
						if (STATE.historyIndex == STATE.history.length) {
							return
						}

					// grab next state
						STATE.historyIndex += 1

					// import from history
						const svgString = STATE.history[STATE.historyIndex - 1]

					// clear everything
						for (const i in STATE.items) {
							STATE.items[i].listing?.container?.remove()
							STATE.items[i].svg?.remove()
							STATE.items[i].points?.group?.remove()
							delete STATE.items[i]
						}

					// parse
						if (!svgString || !svgString.length) {
							return
						}
						const domParser = new DOMParser()
						const svgXML = domParser.parseFromString(svgString, "image/svg+xml")?.documentElement
						if (!svgXML) {
							return
						}
						parseSVG(svgXML)
				} catch (error) {console.log(error)}
			}

	/** main item controls **/
		/* highlightItem */
			function highlightItem(event) {
				try {
					// drawing
						if (STATE.drawing) {
							return
						}

					// get item
						const parent = event.target.closest(".controls-listing")
						const id = `_${parent.id.split("_")[1]}`
						const item = STATE.items[id]

					// svg --> highlight
						item.svg.setAttribute("highlight", true)
				} catch (error) {console.log(error)}
			}

		/* unhighlightItem */
			function unhighlightItem(event) {
				try {
					// drawing
						if (STATE.drawing) {
							return
						}
						
					// get item
						const parent = event.target.closest(".controls-listing")
						const id = `_${parent.id.split("_")[1]}`
						const item = STATE.items[id]

					// svg --> unhighlight
						item.svg.removeAttribute("highlight")
				} catch (error) {console.log(error)}
			}

		/* toggleItemVisibility */
			function toggleItemVisibility(event) {
				try {
					// drawing
						if (STATE.drawing) { cancelDrawing() }
						
					// get item
						const parent = event.target.closest(".controls-listing")
						const id = `_${parent.id.split("_")[1]}`
						const item = STATE.items[id]

					// flip state
						item.attributes.visible = !item.attributes.visible

					// update checkbox
						item.listing.summary.visibleCheckbox.checked = item.attributes.visible

					// update styling
						if (item.attributes.visible) {
							item.svg.setAttribute("visible", true)
							item.points?.group?.setAttribute("visible", true)
						}
						else {
							item.svg.removeAttribute("visible")
							item.points?.group?.removeAttribute("visible")
						}
				} catch (error) {console.log(error)}
			}

		/* toggleItemLock */
			function toggleItemLock(event) {
				try {
					// drawing
						if (STATE.drawing) { cancelDrawing() }
						
					// get item
						const parent = event.target.closest(".controls-listing")
						const id = `_${parent.id.split("_")[1]}`
						const item = STATE.items[id]

					// flip state
						item.attributes.locked = !item.attributes.locked

					// update checkbox
						item.listing.summary.lockedCheckbox.checked = item.attributes.locked
				} catch (error) {console.log(error)}
			}

		/* deleteItem */
			function deleteItem(event) {
				try {
					// drawing
						if (STATE.drawing) { cancelDrawing() }
						
					// get item
						const parent = event.target.closest(".controls-listing")
						const id = `_${parent.id.split("_")[1]}`
						const item = STATE.items[id]

					// delete
						if (STATE.items[id]) {
							STATE.items[id].svg.remove()
							STATE.items[id].listing.container.remove()
							STATE.items[id].points?.group.remove()
							delete STATE.items[id]
						}

					// record history
						if (event?.type) {
							recordHistory()
						}
				} catch (error) {console.log(error)}
			}

		/* copyItem */
			function copyItem(event) {
				try {
					// drawing
						if (STATE.drawing) { cancelDrawing() }
						
					// get item
						const parent = event.target.closest(".controls-listing")
						const id = `_${parent.id.split("_")[1]}`
						const item = STATE.items[id]

					// add item
						const newItem = addItem({
							itemData: {
								attributes: duplicateObject(item.attributes)
							}
						})

					// move down to just above previous item
						while (newItem.listing.container.nextSibling !== item.listing.container) {
							moveItemDownLayer({target: newItem.listing.container})
						}

					// record history
						if (event?.type) {
							recordHistory()
						}
				} catch (error) {console.log(error)}
			}

		/* moveItemUpLayer */
			function moveItemUpLayer(event) {
				try {
					// drawing
						if (STATE.drawing) { cancelDrawing() }
						
					// get item
						const parent = event.target.closest(".controls-listing")
						const id = `_${parent.id.split("_")[1]}`
						const item = STATE.items[id]

					// move svg down
						item.svg.nextSibling?.after(item.svg)

					// move group down
						item.points?.group?.nextSibling?.after(item.points.group)

					// move listing up
						if (item.listing.container.previousSibling) {
							item.listing.container.after(item.listing.container.previousSibling)
						}

					// record history
						if (event?.type) {
							recordHistory()
						}
				} catch (error) {console.log(error)}
			}

		/* moveItemDownLayer */
			function moveItemDownLayer(event) {
				try {
					// drawing
						if (STATE.drawing) { cancelDrawing() }
						
					// get item
						const parent = event.target.closest(".controls-listing")
						const id = `_${parent.id.split("_")[1]}`
						const item = STATE.items[id]

					// move svg up
						if (item.svg.previousSibling) {
							item.svg.after(item.svg.previousSibling)
						}

					// move group up
						if (item.points?.group?.previousSibling) {
							item.points?.group?.after(item.points.group.previousSibling)
						}

					// move listing down
						item.listing.container.nextSibling?.after(item.listing.container)

					// record history
						if (event?.type) {
							recordHistory()
						}
				} catch (error) {console.log(error)}
			}

		/* changeItemAttribute */
			function changeItemAttribute(event) {
				try {
					// drawing
						if (STATE.drawing) { cancelDrawing() }
						
					// get item
						const parent = event.target.closest(".controls-listing")
						const id = `_${parent.id.split("_")[1]}`
						const item = STATE.items[id]

					// attribute
						const attributePair = event.target.className.replace("controls-listing-", "").split("-")
						const sectionName = attributePair[0]
						const attribute = attributePair.slice(1).join("-")
						const value = event.target.value

					// shape --> rebuild
						if (attribute == "shape") {
							// attributes
								item.attributes.styling.shape = value
								item.attributes.coordinates = getTranslatedCoordinates(
									getScaledCoordinates(duplicateObject(
										CONSTANTS.defaults.coordinates[item.attributes.styling.shape]
									), STATE.dimensions.size / CONSTANTS.percent, STATE.dimensions.size / CONSTANTS.percent),
								STATE.dimensions.offsetX, STATE.dimensions.offsetY)

							// path --> curves
								if (item.attributes.styling.shape == "curves") {
									const commands = getCommandsFromPath(item.attributes.coordinates.d)
									const absoluteCommands = getAbsoluteCommands(commands)
									const simplifiedCommands = getSimplifiedCommands(absoluteCommands)
									item.attributes.coordinates.d = getPathFromCommands(simplifiedCommands)
									item.attributes.curves = getCurvesFromCommands(simplifiedCommands)
									item.attributes.styling.shape = "path"
								}
								else {
									delete item.attributes.curves
								}

							// html
								item.listing.coordinates = buildItemCoordinates(item)
								item.svg = buildItemSVG(item)

							// record history
								if (event?.type) {
									recordHistory()
								}
								return
						}

					// fill-on --> set fill
						if (attribute == "fill-on") {
							item.attributes.styling["fill-on"] = event.target.checked
							if (item.attributes.styling.shape !== "line") {
								item.svg.setAttribute("fill", item.attributes.styling["fill-on"] ? item.attributes.styling.fill : "transparent")
							}
						}

					// fill --> depends on fill-on
						else if (attribute == "fill") {
							item.attributes.styling.fill = value
							if (item.attributes.styling.shape !== "line") {
								item.svg.setAttribute("fill", item.attributes.styling["fill-on"] ? item.attributes.styling.fill : "transparent")
							}
						}

					// path
						else if (attribute == "d") {
							item.attributes[sectionName][attribute] = value || ""
							item.svg.setAttribute(attribute, item.attributes[sectionName][attribute])
						}

					// points
						else if (["points","x1","x2","y1","y2"].includes(attribute)) {
							item.attributes[sectionName][attribute] = value
								setItemCoordinates(item)
							}

					// others
						else {
							item.attributes[sectionName][attribute] = value || 0
							item.svg.setAttribute(attribute, item.attributes[sectionName][attribute])
						}

					// record history
						if (event?.type) {
							recordHistory()
						}
				} catch (error) {console.log(error)}
			}

	/** transformations **/
		/* changeItemScale */
			function changeItemScale(event) {
				try {
					// drawing
						if (STATE.drawing) { cancelDrawing() }
						
					// get item
						const parent = event.target.closest(".controls-listing")
						const id = `_${parent.id.split("_")[1]}`
						const item = STATE.items[id]

					// get scale
						let factorX = 1
						let factorY = 1
						if (event.target == item.listing.coordinates.flipXButton) {
							factorX = -1
						}
						else if (event.target == item.listing.coordinates.flipYButton) {
							factorY = -1
						}
						else {
							factorX = Number(item.listing.coordinates.scaleX.value) || 1
							factorY = Number(item.listing.coordinates.scaleY.value) || 1
						}
						if (factorX == 1 && factorY == 1) {
							return
						}

					// get center
						const boundingBox = item.svg.getBBox()
						const centerX = boundingBox.width  / 2 + boundingBox.x 
						const centerY = boundingBox.height / 2 + boundingBox.y

					// resize
						scaleItem(item, item.attributes.coordinates, factorX, factorY, centerX, centerY, STATE.snapToGrid)

					// reset inputs
						item.listing.coordinates.scaleX.value = 1
						item.listing.coordinates.scaleY.value = 1

					// record history
						if (event?.type) {
							recordHistory()
						}
				} catch (error) {console.log(error)}
			}

		/* changeItemSkew */
			function changeItemSkew(event) {
				try {
					// drawing
						if (STATE.drawing) { cancelDrawing() }
						
					// get item
						const parent = event.target.closest(".controls-listing")
						const id = `_${parent.id.split("_")[1]}`
						const item = STATE.items[id]

					// get skew
						const skewX = Math.max(-CONSTANTS.maxSkewDegrees, Math.min(CONSTANTS.maxSkewDegrees, Number(item.listing.coordinates.skewX.value) || 0))
						const skewY = Math.max(-CONSTANTS.maxSkewDegrees, Math.min(CONSTANTS.maxSkewDegrees, Number(item.listing.coordinates.skewY.value) || 0))
						if (skewX == 0 && skewY == 0) {
							return
						}

					// get center
						const boundingBox = item.svg.getBBox()
						const centerX = boundingBox.width  / 2 + boundingBox.x 
						const centerY = boundingBox.height / 2 + boundingBox.y

					// rect / ellipse / circle --> convert to curves
						if (["circle", "ellipse", "rect"].includes(item.attributes.styling.shape)) {
							convertItemToPath({target: item.listing.summary.curvesButton})
						}

					// resize
						skewItem(item, item.attributes.coordinates, skewX, skewY, centerX, centerY, STATE.snapToGrid)

					// reset inputs
						item.listing.coordinates.skewX.value = 0
						item.listing.coordinates.skewY.value = 0

					// record history
						if (event?.type) {
							recordHistory()
						}
				} catch (error) {console.log(error)}
			}

		/* changeItemRotation */
			function changeItemRotation(event) {
				try {
					// drawing
						if (STATE.drawing) { cancelDrawing() }
						
					// get item
						const parent = event.target.closest(".controls-listing")
						const id = `_${parent.id.split("_")[1]}`
						const item = STATE.items[id]

					// get angle
						let degrees = Number(item.listing.coordinates.rotation.value) || 0
						while (degrees < 0) {
							degrees += CONSTANTS.circleDegrees
						}
						degrees = degrees % CONSTANTS.circleDegrees
						if (degrees == 0) {
							return
						}
						degrees = -degrees // y-flip

					// get center
						const boundingBox = item.svg.getBBox()
						const centerX = boundingBox.width  / 2 + boundingBox.x 
						const centerY = boundingBox.height / 2 + boundingBox.y

					// rect / ellipse / circle --> convert to curves
						if (["circle", "ellipse", "rect"].includes(item.attributes.styling.shape)) {
							convertItemToPath({target: item.listing.summary.curvesButton})
						}

					// rotate
						rotateItem(item, duplicateObject(item.attributes.coordinates), degrees, centerX, centerY, STATE.snapToGrid)

					// reset inputs
						item.listing.coordinates.rotation.value = 0

					// record history
						if (event?.type) {
							recordHistory()
						}
				} catch (error) {console.log(error)}
			}

		/* mergeItems */
			function mergeItems(event) {
				try {
					// drawing
						if (STATE.drawing) { cancelDrawing() }
						
					// already merging
						if (STATE.merging) {
							return null
						}

					// get item
						const operation = event.target.value
						const parent = event.target.closest(".controls-listing")
						const id = `_${parent.id.split("_")[1]}`
						const itemA = STATE.items[id]

					// get next item
						const itemBListing = itemA.listing.container.nextSibling
						if (!itemBListing) {
							return
						}
						const itemBid = `_${itemBListing.id.split("_")[1]}`
						const itemB = STATE.items[itemBid]

					// get previous item
						const previousItem = itemA.listing.container.previousSibling

					// loading state
						STATE.merging = event.target.innerText
						event.target.innerText = "working..."

					// async
						setTimeout(() => {
							// convert to curves
								convertItemToPath({target: itemA.listing.summary.curvesButton})
								convertItemToPath({target: itemB.listing.summary.curvesButton})

							// merge
								const newItem = getMergedCurves(itemA, itemB, operation)

							// new item?
								if (newItem && previousItem) {
									while (newItem.listing.container.previousSibling !== previousItem) {
										moveItemDownLayer({target: newItem.listing.container})
									}
								}

							// record history
								if (event?.type) {
									recordHistory()
								}

							// loading state
								event.target.innerText = STATE.merging
								delete STATE.merging
						}, 100)
				} catch (error) {console.log(error)}
			}

	/** curve controls **/
		/* convertItemToPath */
			function convertItemToPath(event) {
				try {
					// drawing
						if (STATE.drawing) { cancelDrawing() }
						
					// get item
						const type = event.target.value
						const parent = event.target.closest(".controls-listing")
						const id = `_${parent.id.split("_")[1]}`
						const item = STATE.items[id]

					// reset
						if (item.attributes.curves) {
							delete item.attributes.curves
							item.points.group.remove()
							delete item.points
						}

					// get path
						let path = getPathFromPrimitive(item)
						if (!path) {
							return
						}

					// curves?
						if (type == "curves") {
							const commands = getCommandsFromPath(path)
							const absoluteCommands = getAbsoluteCommands(commands)
							const simplifiedCommands = getSimplifiedCommands(absoluteCommands)
							item.attributes.curves = getCurvesFromCommands(simplifiedCommands)
							if (getSignedArea(item.attributes.curves) < 0) {
								item.attributes.curves = getMtoZCurves(getReversedCurves(item.attributes.curves))
							}
							path = getPathFromCommands(getCommandsFromCurves(item.attributes.curves))
						}

					// finish
						item.attributes.styling.shape = "path"
						item.attributes.coordinates = {d: path}
						item.listing.coordinates = buildItemCoordinates(item)
						item.svg = buildItemSVG(item)

					// record history
						if (event?.type) {
							recordHistory()
						}
				} catch (error) {console.log(error)}
			}

		/* convertItemToPolygon */
			function convertItemToPolygon(event) {
				try {
					// drawing
						if (STATE.drawing) { cancelDrawing() }
						
					// get item
						const type = event.target.value
						const parent = event.target.closest(".controls-listing")
						const id = `_${parent.id.split("_")[1]}`
						const item = STATE.items[id]

					// convert to curves
						if (!item.attributes.curves) {
							convertItemToPath({target: item.listing.summary.curvesButton})
						}

					// subdivide
						const newItems = subdivideItem({target: item.listing.summary.subdivideButton}) || [item]

					// loop through newItems
						for (const i in newItems) {
							// empty points
								const thisItem = newItems[i]

							// convert to polygon
								thisItem.attributes.styling.shape = "polygon"
								thisItem.attributes.coordinates = {
									points: getPolygonPointsFromCurves(thisItem.attributes.curves)
								}
								delete thisItem.attributes.curves

							// html
								thisItem.listing.coordinates = buildItemCoordinates(thisItem)
								thisItem.svg = buildItemSVG(thisItem)
						}

					// record history
						recordHistory()
				} catch (error) {console.log(error)}
			}

		/* subdivideItem */
			function subdivideItem(event) {
				try {
					// drawing
						if (STATE.drawing) { cancelDrawing() }
						
					// get item
						const type = event.target.value
						const parent = event.target.closest(".controls-listing")
						const id = `_${parent.id.split("_")[1]}`
						const item = STATE.items[id]

					// not a path
						if (item.attributes.styling.shape !== "path") {
							return
						}

					// curves
						if (!item.attributes.curves) {
							convertItemToPath({target: item.listing.summary.curvesButton})
						}

					// get groups
						const newCurveGroups = getSubdividedCurves(item.attributes.curves)
						if (!newCurveGroups.length) {
							return
						}

					// add Zs
						for (const n in newCurveGroups) {
							newCurveGroups[n] = getMtoZCurves(newCurveGroups[n])
						}

					// insert new items
						const newItems = []
						for (const n in newCurveGroups) {
							const newItem = addItem({
								itemData: {
									attributes: {
										styling: {
											shape: "curves",
											stroke: item.attributes.styling.stroke,
											"stroke-width": item.attributes.styling["stroke-width"],
											"stroke-linecap": item.attributes.styling["stroke-linecap"],
											"stroke-linejoin": item.attributes.styling["stroke-linejoin"],
											"fill-on": item.attributes.styling["fill-on"],
											fill: item.attributes.styling.fill
										},
										coordinates: {d: getPathFromCommands(getCommandsFromCurves(newCurveGroups[n]))},
										curves: newCurveGroups[n]
									}
								}
							})

							while (newItem.listing.container.nextSibling !== item.listing.container) {
								moveItemDownLayer({target: newItem.listing.container})
							}
							newItems.push(newItem)
						}

					// delete original item
						deleteItem({target: item.listing.container})

					// record history
						if (event?.type) {
							recordHistory()
						}

					// return
						return newItems
				} catch (error) {console.log(error)}
			}

		/* toggleItemPoints */
			function toggleItemPoints(event) {
				try {
					// drawing
						if (STATE.drawing) { cancelDrawing() }
						
					// get item
						const parent = event.target.closest(".controls-listing")
						const id = `_${parent.id.split("_")[1]}`
						const item = STATE.items[id]

					// show / hide points
						if (event.target.checked) {
							item.points.group.setAttribute("active", true)
						}
						else {
							item.points.group.removeAttribute("active")
						}
				} catch (error) {console.log(error)}
			}

		/* changeCurveInput */
			function changeCurveInput(event) {
				try {
					// drawing
						if (STATE.drawing) { cancelDrawing() }
						
					// get item
						const input = event.target
						const parent = input.closest(".controls-listing")
						const id = `_${parent.id.split("_")[1]}`
						const item = STATE.items[id]

					// get curve
						const curveElement = input.closest(".controls-curves-row")
						const curvesContainer = input.closest(".controls-curves-area")
						const curveIndex = Array.from(curvesContainer.childNodes).findIndex(element => element == curveElement)
						const curve = item.attributes.curves[curveIndex]

					// update attribute
						const coordinate = input.getAttribute("coordinate")
						curve[coordinate] = roundNumber(Number(input.value))

					// regenerate path
						const commands = getCommandsFromCurves(item.attributes.curves)
						item.attributes.coordinates.d = getPathFromCommands(commands)

					// svg
						item.svg.setAttribute("d", item.attributes.coordinates.d)
						setCurvePointsCoordinates(item.points, item.attributes.curves)

					// record history
						if (event?.type) {
							recordHistory()
						}
				} catch (error) {console.log(error)}
			}

		/* changePolygonPoint */
			function changePolygonPoint(item, pointIndex, coordinates, snap) {
				try {
					// drawing
						if (STATE.drawing) { cancelDrawing() }
						
					// snap?
						let x = snap ? Math.round(coordinates.x) : roundNumber(coordinates.x)
						let y = snap ? Math.round(coordinates.y) : roundNumber(coordinates.y)

					// polygon / polyline
						if (item.attributes.coordinates.points) {
							const points = item.attributes.coordinates.points.split(/\n/g)
								points[pointIndex] = `${x},${y}`
							item.attributes.coordinates.points = points.join("\n")
						}

					// line
						else {
							item.attributes.coordinates[`x${pointIndex}`] = x
							item.attributes.coordinates[`y${pointIndex}`] = y
						}

					// svg
						setItemCoordinates(item)
				} catch (error) {console.log(error)}
			}

		/* changeCurvePoint */
			function changeCurvePoint(item, curveIndex, pointIndex, coordinates, snap) {
				try {
					// drawing
						if (STATE.drawing) { cancelDrawing() }
						
					// get curve
						const curve = item.attributes.curves[curveIndex]

					// snap?
						let x = snap ? Math.round(coordinates.x) : roundNumber(coordinates.x)
						let y = snap ? Math.round(coordinates.y) : roundNumber(coordinates.y)

					// point
						if (pointIndex == "c1") {
							curve.c1x = x
							curve.c1y = y

							item.listing.coordinates[`curve-${curveIndex}-c1x`].value = curve.c1x
							item.listing.coordinates[`curve-${curveIndex}-c1y`].value = curve.c1y
						}
						else if (pointIndex == "c2") {
							curve.c2x = x
							curve.c2y = y

							item.listing.coordinates[`curve-${curveIndex}-c2x`].value = curve.c2x
							item.listing.coordinates[`curve-${curveIndex}-c2y`].value = curve.c2y
						}
						else if (pointIndex == "p") {
							curve.x = x
							curve.y = y

							item.listing.coordinates[`curve-${curveIndex}-x`].value = curve.x
							item.listing.coordinates[`curve-${curveIndex}-y`].value = curve.y
						}

					// M --> update Zs until next M
						if (curve.c1x == undefined) {
							for (let i = curveIndex + 1; i < item.attributes.curves.length; i++) {
								if (item.attributes.curves[i].z) {
									item.attributes.curves[i].zx = curve.x
									item.attributes.curves[i].zy = curve.y
								}
								else if (item.attributes.curves[i].c1x == undefined) {
									break
								}
							}
						}

					// recalculate path
						const commands = getCommandsFromCurves(item.attributes.curves)
						item.attributes.coordinates.d = getPathFromCommands(commands)

					// svg
						item.svg.setAttribute("d", item.attributes.coordinates.d)
						setCurvePointsCoordinates(item.points, item.attributes.curves)
				} catch (error) {console.log(error)}
			}

		/* insertCurve */
			function insertCurve(event) {
				try {
					// drawing
						if (STATE.drawing) { cancelDrawing() }
						
					// get item
						const button = event.target
						const parent = button.closest(".controls-listing")
						const id = `_${parent.id.split("_")[1]}`
						const item = STATE.items[id]

					// get curve
						const curveElement = button.closest(".controls-curves-row")
						const curvesContainer = button.closest(".controls-curves-area")
						const curveIndex = Array.from(curvesContainer.childNodes).findIndex(element => element == curveElement)
						const curve = item.attributes.curves[curveIndex]

					// split C in two
						if (button.value == "split") {
							if (curve.c1x == undefined || curve.c1y == undefined) {
								return
							}
							const previousCurve = item.attributes.curves[curveIndex - 1]
							const coordinates = previousCurve.z ? {x: previousCurve.zx, y: previousCurve.zy} : previousCurve
							item.attributes.curves.splice(curveIndex, 1, ...splitCurveAtRatio(coordinates, curve, (1/2)))
						}

					// Z
						else if (button.value == "Z") {
							if (item.attributes.curves[curveIndex].z || item.attributes.curves[curveIndex + 1]?.z) {
								return
							}
							const previousM = item.attributes.curves.slice(0, curveIndex + 1).findLast(thatCurve => thatCurve.x !== undefined && thatCurve.c1x == undefined)
							item.attributes.curves.splice(curveIndex + 1, 0, {
								z: true,
								zx: previousM.x,
								zy: previousM.y
							})
						}

					// M & C
						else {
							const coordinates = curve.z ? {x: curve.zx, y: curve.zy} : curve
							if (button.value == "M") {
								item.attributes.curves.splice(curveIndex + 1, 0, {
									x: coordinates.x,
									y: coordinates.y
								})
							}
							else if (button.value == "C") {
								item.attributes.curves.splice(curveIndex + 1, 0, {
									c1x: coordinates.x,
									c1y: coordinates.y,
									c2x: coordinates.x,
									c2y: coordinates.y,
									x:   coordinates.x,
									y:   coordinates.y
								})
							}
						}

					// regenerate path
						const commands = getCommandsFromCurves(item.attributes.curves)
						item.attributes.coordinates.d = getPathFromCommands(commands)

					// svg
						item.listing.coordinates = buildItemCoordinates(item)
						item.svg.setAttribute("d", item.attributes.coordinates.d)
						item.points = buildItemPoints(item)

					// record history
						if (event?.type) {
							recordHistory()
						}
				} catch (error) {console.log(error)}
			}

		/* removeCurve */
			function removeCurve(event) {
				try {
					// drawing
						if (STATE.drawing) { cancelDrawing() }
						
					// get item
						const button = event.target
						const parent = button.closest(".controls-listing")
						const id = `_${parent.id.split("_")[1]}`
						const item = STATE.items[id]

					// get curve
						const curveElement = button.closest(".controls-curves-row")
						const curvesContainer = button.closest(".controls-curves-area")
						const curveIndex = Array.from(curvesContainer.childNodes).findIndex(element => element == curveElement)
						const curve = item.attributes.curves[curveIndex]

					// remove
						item.attributes.curves.splice(curveIndex, 1)

					// regenerate path
						const commands = getCommandsFromCurves(item.attributes.curves)
						item.attributes.coordinates.d = getPathFromCommands(commands)

					// svg
						item.listing.coordinates = buildItemCoordinates(item)
						item.svg.setAttribute("d", item.attributes.coordinates.d)
						item.points = buildItemPoints(item)

					// record history
						if (event?.type) {
							recordHistory()
						}				
				} catch (error) {console.log(error)}
			}

	/** grid movement **/
		/* selectContainer */
			ELEMENTS.container.svg.addEventListener(TRIGGERS.mousedown, selectContainer)
			function selectContainer(event) {
				try {
					// get absolute cursor coordinates
						const windowX = (event.touches ? event.touches[0].clientX : event.clientX)
						const windowY = (event.touches ? event.touches[0].clientY : event.clientY)

					// get relative cursor coordinates
						const svgContainerRect = ELEMENTS.container.svg.getBoundingClientRect()
						STATE.cursor.x = roundNumber((windowX - svgContainerRect.x) / svgContainerRect.width  * STATE.dimensions.size + STATE.dimensions.offsetX)
						STATE.cursor.y = roundNumber((windowY - svgContainerRect.y) / svgContainerRect.height * STATE.dimensions.size + STATE.dimensions.offsetY)

					// drawing
						if (STATE.drawing) {
							STATE.drawing.timestamp = new Date().getTime()
							STATE.drawing.points.push([STATE.cursor.x, STATE.cursor.y])
							return
						}

					// select background
						STATE.selected = {
							click: {
								x: STATE.cursor.x,
								y: STATE.cursor.y
							},
							dimensions: {
								offsetX: STATE.dimensions.offsetX,
								offsetY: STATE.dimensions.offsetY,
								size:    STATE.dimensions.size
							}
						}

					// set grab
						ELEMENTS.container.element.setAttribute("grabbing", true)
				} catch (error) {console.log(error)}
			}

		/* selectItem */
			function selectItem(event) {
				try {
					// drawing
						if (STATE.drawing) {
							return
						}

					// don't select container
						event.stopPropagation()

					// get absolute cursor coordinates
						const windowX = (event.touches ? event.touches[0].clientX : event.clientX)
						const windowY = (event.touches ? event.touches[0].clientY : event.clientY)

					// get relative cursor coordinates
						const svgContainerRect = ELEMENTS.container.svg.getBoundingClientRect()
						STATE.cursor.x = roundNumber((windowX - svgContainerRect.x) / svgContainerRect.width  * STATE.dimensions.size + STATE.dimensions.offsetX)
						STATE.cursor.y = roundNumber((windowY - svgContainerRect.y) / svgContainerRect.height * STATE.dimensions.size + STATE.dimensions.offsetY)

					// get svg
						const svg = event.target
						const boundingBox = event.target.getBBox()
						const id = `_${svg.id.split("_")[1]}`

					// locked?
						if (STATE.items[id].attributes.locked) {
							return
						}

					// select item
						STATE.selected = {
							id: id,
							click: {
								x: STATE.cursor.x,
								y: STATE.cursor.y
							},
							boundingBox: boundingBox,
							coordinates: duplicateObject(STATE.items[id].attributes.coordinates)
						}

					// set grab
						ELEMENTS.container.element.setAttribute("grabbing", true)
						STATE.items[STATE.selected.id].listing.container.setAttribute("highlight", true)
						STATE.items[STATE.selected.id].listing.container.scrollIntoView(true)
				} catch (error) {console.log(error)}
			}

		/* selectPoint */
			function selectPoint(event) {
				try {
					// drawing
						if (STATE.drawing) {
							return
						}

					// don't select container
						event.stopPropagation()

					// get absolute cursor coordinates
						const windowX = (event.touches ? event.touches[0].clientX : event.clientX)
						const windowY = (event.touches ? event.touches[0].clientY : event.clientY)

					// get relative cursor coordinates
						const svgContainerRect = ELEMENTS.container.points.getBoundingClientRect()
						STATE.cursor.x = roundNumber((windowX - svgContainerRect.x) / svgContainerRect.width  * STATE.dimensions.size + STATE.dimensions.offsetX)
						STATE.cursor.y = roundNumber((windowY - svgContainerRect.y) / svgContainerRect.height * STATE.dimensions.size + STATE.dimensions.offsetY)

					// get svg
						const point = event.target
						const idComponents = point.id.split("-")
						const id = idComponents[0]
						const curveIndex = point.id.includes("curve") ? Number(idComponents[idComponents.length - 2]) : undefined
						const pointIndex = idComponents[idComponents.length - 1]

					// select item
						STATE.selected = {
							id: id,
							curveIndex: curveIndex,
							pointIndex: pointIndex,
							click: {
								x: STATE.cursor.x,
								y: STATE.cursor.y
							}
						}

					// set grab
						ELEMENTS.container.element.setAttribute("grabbing", true)
						if (STATE.selected.curveIndex !== undefined) {
							STATE.items[STATE.selected.id].listing.coordinates[`curve-${curveIndex}-row`]?.setAttribute("highlight", pointIndex)
							STATE.items[STATE.selected.id].listing.coordinates[`curve-${curveIndex}-row`]?.scrollIntoView(true)
						}
						else {
							STATE.items[STATE.selected.id].listing.container.setAttribute("highlight", true)
							STATE.items[STATE.selected.id].listing.container.scrollIntoView(true)
						}
				} catch (error) {console.log(error)}
			}

		/* moveMouse */
			window.addEventListener(TRIGGERS.mousemove, moveMouse)
			function moveMouse(event) {
				try {
					// nothing selected
						if (!STATE.selected && (!STATE.drawing || !STATE.drawing.timestamp)) {
							return
						}

					// prevent default
						event.stopPropagation()

					// get absolute cursor coordinates
						const windowX = (event.touches ? event.touches[0].clientX : event.clientX)
						const windowY = (event.touches ? event.touches[0].clientY : event.clientY)

					// get relative cursor coordinates
						const svgContainerRect = ELEMENTS.container.svg.getBoundingClientRect()
						STATE.cursor.x = roundNumber((windowX - svgContainerRect.x) / svgContainerRect.width  * STATE.dimensions.size + STATE.dimensions.offsetX)
						STATE.cursor.y = roundNumber((windowY - svgContainerRect.y) / svgContainerRect.height * STATE.dimensions.size + STATE.dimensions.offsetY)

					// drawing --> add to points
						if (STATE.drawing && STATE.drawing.timestamp) {
							const time = new Date().getTime()
							if (time - STATE.drawing.timestamp > CONSTANTS.drawingInterval) {
								STATE.drawing.timestamp = time
								STATE.drawing.points.push([STATE.cursor.x, STATE.cursor.y])
								
								const item = STATE.items[STATE.drawing.id]
									item.attributes.coordinates.points = STATE.drawing.points.join("\n")
									item.listing.container.setAttribute("shape", "polygon")
									item.listing.summary.nameElement.innerText = "polygon"
									item.listing.coordinates.points.value = item.attributes.coordinates.points
								setItemCoordinates(item)
							}
							return
						}

					// nothing selected --> move grid
						if (!STATE.selected.id) {
							const deltaX = STATE.cursor.x - STATE.selected.click.x
							const deltaY = STATE.cursor.y - STATE.selected.click.y

							resizeSVG(null, {
								offsetX: roundNumber(STATE.dimensions.offsetX - deltaX),
								offsetY: roundNumber(STATE.dimensions.offsetY - deltaY),
								size: STATE.selected.dimensions.size
							})
							return
						}

					// something selected --> get item
						const item = STATE.items[STATE.selected.id]

					// points on curves
						if (STATE.selected.curveIndex !== undefined) {
							changeCurvePoint(item, STATE.selected.curveIndex, STATE.selected.pointIndex, STATE.cursor, STATE.snapToGrid)
							return
						}

					// points on polygon / polyline
						if (STATE.selected.pointIndex !== undefined) {
							changePolygonPoint(item, STATE.selected.pointIndex, STATE.cursor, STATE.snapToGrid)
							return
						}
						
					// shift --> scale
						if (event.shiftKey) {
							const centerX = STATE.selected.boundingBox.width  / 2 + STATE.selected.boundingBox.x 
							const centerY = STATE.selected.boundingBox.height / 2 + STATE.selected.boundingBox.y

							const distanceFromCenterX = Math.abs(STATE.cursor.x - centerX)
							const distanceFromCenterY = Math.abs(STATE.cursor.y - centerY)
							const originalDistanceFromCenterX = Math.abs(STATE.selected.click.x - centerX)
							const originalDistanceFromCenterY = Math.abs(STATE.selected.click.y - centerY)

							const dx = distanceFromCenterX - originalDistanceFromCenterX
							const dy = distanceFromCenterY - originalDistanceFromCenterY

							// shift + alt --> scale evenly
								const deltaX = event.altKey ? Math.max(dx, dy) : dx
								const deltaY = event.altKey ? Math.max(dx, dy) : dy

							let newWidth  = STATE.selected.boundingBox.width  + deltaX * 2
							let newHeight = STATE.selected.boundingBox.height + deltaY * 2

							if (STATE.snapToGrid) { // even width/height to ensure integer radius
								newWidth  = Math.round(newWidth  / 2) * 2
								newHeight = Math.round(newHeight / 2) * 2
							}

							const factorX = (newWidth  / STATE.selected.boundingBox.width ) * 
								Math.sign(STATE.cursor.x - centerX) * Math.sign(STATE.selected.click.x - centerX)
							const factorY = (newHeight / STATE.selected.boundingBox.height) * 
								Math.sign(STATE.cursor.y - centerY) * Math.sign(STATE.selected.click.y - centerY)

							if (!factorX || !factorY) {
								return
							}

							scaleItem(item, STATE.selected.coordinates, factorX, factorY, centerX, centerY, STATE.snapToGrid)
							return
						}

					// option --> rotate
						if (event.altKey) {
							// rect / ellipse / circle --> convert to curves
								if (["circle", "ellipse", "rect"].includes(item.attributes.styling.shape)) {
									convertItemToPath({target: item.listing.summary.curvesButton})
									STATE.selected.coordinates = duplicateObject(item.attributes.coordinates)
								}

							const centerX = STATE.selected.boundingBox.width  / 2 + STATE.selected.boundingBox.x 
							const centerY = STATE.selected.boundingBox.height / 2 + STATE.selected.boundingBox.y

							const distanceFromCenterX = STATE.cursor.x - centerX
							const distanceFromCenterY = STATE.cursor.y - centerY
							const angleToCenter = Math.atan2(distanceFromCenterY, distanceFromCenterX)
							const originalDistanceFromCenterX = STATE.selected.click.x - centerX
							const originalDistanceFromCenterY = STATE.selected.click.y - centerY
							const originalAngleToCenter = Math.atan2(originalDistanceFromCenterY, originalDistanceFromCenterX)

							const rotationDegrees = (angleToCenter - originalAngleToCenter) * CONSTANTS.circleDegrees / CONSTANTS.circleRadians

							rotateItem(item, STATE.selected.coordinates, rotationDegrees, centerX, centerY, STATE.snapToGrid)
							return
						}

					// otherwise --> translate
						const deltaX = STATE.cursor.x - STATE.selected.click.x
						const deltaY = STATE.cursor.y - STATE.selected.click.y
						translateItem(item, STATE.selected.coordinates, deltaX, deltaY, STATE.snapToGrid)
				} catch (error) {console.log(error)}
			}

		/* upMouse */
			window.addEventListener(TRIGGERS.mouseup, upMouse)
			function upMouse(event) {
				try {
					// nothing selected
						if (!STATE.selected && !STATE.drawing) {
							return
						}

					// drawing?
						if (STATE.drawing) {
							if (STATE.drawing.timestamp) {
								STATE.drawing = null
								recordHistory()
							}
							return
						}

					// unselect
						if (STATE.selected.id !== undefined) {
							STATE.items[STATE.selected.id].listing.container.removeAttribute("highlight")
						}
						if (STATE.selected.curveIndex !== undefined) {
							STATE.items[STATE.selected.id].listing.coordinates[`curve-${STATE.selected.curveIndex}-row`].removeAttribute("highlight")
						}
						STATE.selected = null

					// set grab
						ELEMENTS.container.element.removeAttribute("grabbing")

					// record history
						if (event?.type) {
							recordHistory()
						}
				} catch (error) {console.log(error)}
			}

		/* scrollMouse */
			ELEMENTS.container.svg.addEventListener(TRIGGERS.scroll, scrollMouse)
			function scrollMouse(event) {
				try {
					// something selected
						if (STATE.selected || STATE.drawing) {
							return
						}

					// direction
						const direction = Math.sign(event.deltaY)

					// get absolute cursor coordinates
						const windowX = (event.touches ? event.touches[0].clientX : event.clientX)
						const windowY = (event.touches ? event.touches[0].clientY : event.clientY)

					// get relative cursor coordinates
						const svgContainerRect = ELEMENTS.container.svg.getBoundingClientRect()
						const previousCursorX = roundNumber((windowX - svgContainerRect.x) / svgContainerRect.width  * STATE.dimensions.size)
						const previousCursorY = roundNumber((windowY - svgContainerRect.y) / svgContainerRect.height * STATE.dimensions.size)

					// new dimensions
						let size  = (direction > 0) ? 
							roundNumber(STATE.dimensions.size * CONSTANTS.zoomPerScroll) :
							roundNumber(STATE.dimensions.size / CONSTANTS.zoomPerScroll)

					// rounding to powers of 10
						for (let i = 1; i < CONSTANTS.ratioRounding; i *= 10) {
							if (Math.abs(size - i) < (i / CONSTANTS.percent)) {
								size = i
							}
						}

					// translate to maintain cursor position
						const newCursorX = roundNumber((windowX - svgContainerRect.x) / svgContainerRect.width  * size)
						const newCursorY = roundNumber((windowY - svgContainerRect.y) / svgContainerRect.height * size)
						const offsetX = roundNumber(STATE.dimensions.offsetX - (newCursorX - previousCursorX))
						const offsetY = roundNumber(STATE.dimensions.offsetY - (newCursorY - previousCursorY))

					// svg
						resizeSVG(null, {offsetX, offsetY, size})
				} catch (error) {console.log(error)}
			}

		/* doubleclickItem */
			function doubleclickItem(event) {
				try {
					// drawing
						if (STATE.drawing) { cancelDrawing() }
						
					// don't select container
						event.stopPropagation()

					// get svg
						const svg = event.target
						const id = `_${svg.id.split("_")[1]}`

					// shift --> copy
						if (event.shiftKey) {
							copyItem({target: STATE.items[id].listing.summary.copyButton})
							return
						}

					// alt --> toggle visibility
						if (event.altKey) {
							toggleItemVisibility({target: STATE.items[id].listing.summary.visibleCheckbox})
							return
						}
					
					// toggle lock
						toggleItemLock({target: STATE.items[id].listing.summary.lockedCheckbox})
				} catch (error) {console.log(error)}
			}

		/* doubleclickPoint */
			function doubleclickPoint(event) {
				try {
					// drawing
						if (STATE.drawing) { cancelDrawing() }
						
					// don't select container
						event.stopPropagation()

					// get svg
						const point = event.target
						const idComponents = point.id.split("-")
						const id = idComponents[0]
						const curveIndex = point.id.includes("curve") ? Number(idComponents[idComponents.length - 2]) : undefined
						const pointIndex = idComponents[idComponents.length - 1]

					// item
						const item = STATE.items[id]
						if (!item) {
							return
						}

					// shape
						const shape = item.attributes.styling.shape
						if (!["polygon", "polyline", "path"].includes(shape)) {
							return
						}

					// control point
						if (shape == "path" && pointIndex !== "p") {
							return
						}

					// shift --> duplicate point
						if (event.shiftKey) {
							// curve / path
								if (item.attributes.styling.shape == "path") {
									// add
										const x = item.attributes.curves[curveIndex].x
										const y = item.attributes.curves[curveIndex].y
										item.attributes.curves.splice(curveIndex + 1, 0, {
											c1x: x,
											c1y: y,
											c2x: x,
											c2y: y,
											x: x,
											y: y
										})

									// regenerate path
										const commands = getCommandsFromCurves(item.attributes.curves)
										item.attributes.coordinates.d = getPathFromCommands(commands)
								}

							// polygon / polyline
								else {
									const points = item.attributes.coordinates.points.split(/\n/g)
									points.splice(pointIndex, 0, points[pointIndex])
									item.attributes.coordinates.points = points.join("\n")
								}
						}

					// alt --> remove point
						else if (event.altKey) {
							// curve / path
								if (item.attributes.styling.shape == "path") {
									// initial M
										if (!curveIndex) {
											return
										}

									// remove
										item.attributes.curves.splice(curveIndex, 1)

									// regenerate path
										const commands = getCommandsFromCurves(item.attributes.curves)
										item.attributes.coordinates.d = getPathFromCommands(commands)
								}

							// polygon / polyline
								else {
									const points = item.attributes.coordinates.points.split(/\n/g)
									points.splice(pointIndex, 1)
									item.attributes.coordinates.points = points.join("\n")
								}
						}

					// svg
						item.listing.coordinates = buildItemCoordinates(item)
						if (shape == "path") {
							item.svg.setAttribute("d", item.attributes.coordinates.d)
						}
						else {
							item.svg.setAttribute("points", item.attributes.coordinates.points)
						}
						item.points = buildItemPoints(item)

					// record history
						if (event?.type) {
							recordHistory()
						}
				} catch (error) {console.log(error)}
			}

		/* cancelDrawing */
			function cancelDrawing() {
				try {
					// not drawing
						if (!STATE.drawing) {
							return
						}

					// remove item
						const item = STATE.items[STATE.drawing.id]
							item.listing.container.remove()
							item.points.group.remove()
							item.svg.remove()
						delete STATE.items[STATE.drawing.id]

					// end drawing
						STATE.drawing = false
				} catch (error) {console.log(error)}
			}

/*** logic ***/
	/** helpers **/
		/* generateRandom */
			function generateRandom() {
				try {
					return Math.floor(Math.random() * CONSTANTS.largeNumber).toString(36)
				} catch (error) {console.log(error)}
			}

		/* duplicateObject */
			function duplicateObject(data) {
				try {
					return JSON.parse(JSON.stringify(data))
				} catch (error) {console.log(error)}
			}

		/* recordHistory */
			function recordHistory() {
				try {
					// clear everything after index
						STATE.history.splice(STATE.historyIndex, STATE.history.length - STATE.historyIndex)

					// append
						STATE.history.push(ELEMENTS.container.svg.outerHTML)

					// set index
						STATE.historyIndex = STATE.history.length
				} catch (error) {console.log(error)}
			}

	/** math **/
		/* roundNumber */
			function roundNumber(n) {
				try {
					return Math.round(n * CONSTANTS.rounding) / CONSTANTS.rounding
				} catch (error) {console.log(error)}
			}

		/* getScalar */
			function getScalar(a, b) {
				try {
					return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2)
				} catch (error) {console.log(error)}
			}

		/* getAverage */
			function getAverage(...numbers) {
				try {
					return numbers.reduce((accumulator, currentValue) => accumulator + currentValue) / numbers.length
				} catch (error) {console.log(error)}
			}

		/* getCenterParametersFromEndpointParameters */
			function getCenterParametersFromEndpointParameters(start, radius, rotationDegrees, largeArcFlag, sweepFlag, end) {
				try {
					// code adapted from https://mortoray.com/rendering-an-svg-elliptical-arc-as-bezier-curves
					// based on formulae from https://www.w3.org/TR/SVG11/implnote.html#ArcConversionEndpointToCenter

					// radians
						const rotationRadians = rotationDegrees * (CONSTANTS.circleRadians / CONSTANTS.circleDegrees)

					// Step 0: Compute (rx, ry)
						let radiusX = Math.abs(radius.x)
						let radiusY = Math.abs(radius.y)

					// Step 1: Compute (x1′, y1′)
						const dXHalf = (start.x - end.x) / 2
						const dYHalf = (start.y - end.y) / 2
						const startXadjusted =  Math.cos(rotationRadians) * dXHalf + Math.sin(rotationRadians) * dYHalf
						const startYadjusted = -Math.sin(rotationRadians) * dXHalf + Math.cos(rotationRadians) * dYHalf

					// Step 2: Compute (cx′, cy′)
						let radiusXSquared = radiusX ** 2
						let radiusYSquared = radiusY ** 2
						const startXadjustedSquared = startXadjusted ** 2
						const startYadjustedSquared = startYadjusted ** 2
						
						const centerRatio = (startXadjustedSquared / radiusXSquared) + (startYadjustedSquared / radiusYSquared)
						if (centerRatio > 1) {
							const squareRoot = Math.sqrt(centerRatio)
							radiusX = squareRoot * radiusX
							radiusY = squareRoot * radiusY
							radiusXSquared = radiusX ** 2
							radiusYSquared = radiusY ** 2
						}

						const denominator = (radiusXSquared * startYadjustedSquared) + (radiusYSquared * startXadjustedSquared)
						const numerator = (radiusXSquared * radiusYSquared) - denominator
						const fraction = numerator / denominator
						let squareRoot = Math.sqrt(Math.max(0, fraction)) // prevent imaginary numbers
						if (largeArcFlag == sweepFlag) {
							squareRoot *= -1
						}
						const centerXadjusted =  squareRoot * (radiusX / radiusY) * startYadjusted 
						const centerYadjusted = -squareRoot * (radiusY / radiusX) * startXadjusted

					// Step 3: Compute (cx, cy) from (cx′, cy′)
						const centerX = Math.cos(rotationRadians) * centerXadjusted - 
										Math.sin(rotationRadians) * centerYadjusted + 
										(start.x + end.x) / 2
						const centerY = Math.sin(rotationRadians) * centerXadjusted + 
										Math.cos(rotationRadians) * centerYadjusted + 
										(start.y + end.y) / 2

					// Step 4: Compute θ1 and Δθ
						let startAngle = getAngleFromVectors(
							1,
							0,
							(startXadjusted - centerXadjusted) / radiusX, 
							(startYadjusted - centerYadjusted) / radiusY
						)
						if (startAngle == -0) { startAngle = 0 }

						let deltaAngle = getAngleFromVectors(
							( startXadjusted - centerXadjusted) / radiusX,
							( startYadjusted - centerYadjusted) / radiusY,
							(-startXadjusted - centerXadjusted) / radiusX,
							(-startYadjusted - centerYadjusted) / radiusY
						)

						if (!sweepFlag) {
							deltaAngle -= CONSTANTS.circleRadians
						}
						deltaAngle = deltaAngle % CONSTANTS.circleRadians

						if (largeArcFlag && sweepFlag) {
							deltaAngle = CONSTANTS.circleRadians - Math.abs(deltaAngle)
						}
						if (deltaAngle == -0) { deltaAngle = 0 }

					// output
						return {
							center: {x: centerX, y: centerY},
							radius: {x: radiusX, y: radiusY},
							startAngle,
							deltaAngle
						}
				} catch (error) {console.log(error)}
			}

		/* getAngleFromVectors */
			function getAngleFromVectors(ux, uy, vx, vy) {
				try {
					// two vectors (ux, uy) and (vx, vy)
						const u = [ux, uy]
						const v = [vx, vy]

					// vector math
						const dotProduct = (ux * vx + uy * vy)
						const vectorLength = Math.sqrt(ux ** 2 + uy ** 2) * Math.sqrt(vx ** 2 + vy ** 2)

					// get angle
						const cosine = Math.min(Math.max(dotProduct / vectorLength, -1), 1)
						let angle = Math.acos(cosine)
						if ((ux * vy) - (uy * vx) < 0) {
							angle = -angle
						}
						if (angle == -0) {
							angle = 0
						}

					// return
						return angle
				} catch (error) {console.log(error)}
			}

		/* getEllipticArcPoint */
			function getEllipticalPoint(center, radius, rotationRadians, ellipseRadians) {
				try {
					// code adapted from https://mortoray.com/rendering-an-svg-elliptical-arc-as-bezier-curves

					// coordinates
						const x = center.x + 
							radius.x * Math.cos(rotationRadians) * Math.cos(ellipseRadians) -
							radius.y * Math.sin(rotationRadians) * Math.sin(ellipseRadians)
						const y = center.y + 
							radius.x * Math.sin(rotationRadians) * Math.cos(ellipseRadians) +
							radius.y * Math.cos(rotationRadians) * Math.sin(ellipseRadians)

					// return
						return {x, y}
				} catch (error) {console.log(error)}
			}

		/* getEllipticArcDerivative */
			function getEllipticArcDerivative(center, radius, rotationRadians, ellipseRadians) {
				try {
					// code adapted from https://mortoray.com/rendering-an-svg-elliptical-arc-as-bezier-curves			
					
					// coordinates
						const x = -radius.x * Math.cos(rotationRadians) * Math.sin(ellipseRadians) - 
								   radius.y * Math.sin(rotationRadians) * Math.cos(ellipseRadians)
						const y = -radius.x * Math.sin(rotationRadians) * Math.sin(ellipseRadians) + 
								   radius.y * Math.cos(rotationRadians) * Math.cos(ellipseRadians)

					// return
						return {x, y}
				} catch (error) {console.log(error)}
			}

		/* getControlPointsFromCenterParameters */
			function getControlPointsFromCenterParameters(center, radius, rotationRadians, startAngle, deltaAngle) {
				try {
					// code adapted from https://mortoray.com/rendering-an-svg-elliptical-arc-as-bezier-curves/

					// P1 & P2
						const p1 = getEllipticalPoint(center, radius, rotationRadians, startAngle)
						const p2 = getEllipticalPoint(center, radius, rotationRadians, startAngle + deltaAngle)

					// alpha
						const alpha = Math.sin(deltaAngle) * (Math.sqrt(4 + 3 * Math.tan(deltaAngle / 2) ** 2) - 1) / 3

					// derivatives
						const d1 = getEllipticArcDerivative(center, radius, rotationRadians, startAngle)
						const d2 = getEllipticArcDerivative(center, radius, rotationRadians, startAngle + deltaAngle)

					// control points
						const q1 = {
							x: roundNumber(p1.x + alpha * d1.x),
							y: roundNumber(p1.y + alpha * d1.y),
						}
						const q2 = {
							x: roundNumber(p2.x - alpha * d2.x),
							y: roundNumber(p2.y - alpha * d2.y),
						}

					// return
						return {
							controlPoint1: q1,
							controlPoint2: q2,
							endPoint: {
								x: roundNumber(p2.x),
								y: roundNumber(p2.y)
							}
						}
				} catch (error) {console.log(error)}
			}

		/* getCubicBezierFromElliptical */
			function getCubicBezierFromElliptical(start, arcCommand) {
				try {
					// get parameters
						const components = arcCommand.split(/\s/)
						const startX = start.x
						const startY = start.y
						const radiusX = Number(components[1])
						const radiusY = Number(components[2])
						const rotationDegrees = Number(components[3])
						const largeArcFlag = Boolean(Number(components[4]))
						const sweepFlag = Boolean(Number(components[5]))
						const endX = Number(components[6])
						const endY = Number(components[7])

					// convert to center parameterization
						const {center, radius, startAngle, deltaAngle} = getCenterParametersFromEndpointParameters({x: startX, y: startY}, {x: radiusX, y: radiusY}, rotationDegrees, largeArcFlag, sweepFlag, {x: endX, y: endY})

					// split into smaller angles
						let anglePerCurve = Math.abs(deltaAngle)
						let split = 1
						while (Math.round(anglePerCurve * CONSTANTS.circleDegrees / CONSTANTS.circleRadians) > CONSTANTS.maxArcAngleForCubicBezier) {
							split++
							anglePerCurve = Math.abs(deltaAngle) / split
						}
						anglePerCurve *= Math.sign(deltaAngle)

					// build command
						const commands = []

					// get control points
						const rotationRadians = rotationDegrees * CONSTANTS.circleRadians / CONSTANTS.circleDegrees
						for (let i = 0; i < split; i++) {
							const thisStartAngle = startAngle + (anglePerCurve * i)
							const {controlPoint1, controlPoint2, endPoint} = getControlPointsFromCenterParameters(center, radius, rotationRadians, thisStartAngle, anglePerCurve)
							commands.push(`C ${controlPoint1.x} ${controlPoint1.y} ${controlPoint2.x} ${controlPoint2.y} ${endPoint.x} ${endPoint.y}`)
						}

					// return cubic bezier command
						return commands
				} catch (error) {console.log(error)}
			}

		/* getSignedArea */
			function getSignedArea(curves) {
				try {
					// A = 1/2 * (x1*y2 - x2*y1 + x2*y3 - x3*y2 + ... + xn*y1 - x1*yn)

					// get all points
						const points = []
						for (const c in curves) {
							points.push(curves[c].z ? {x: curves[c].zx, y: curves[c].zy} : {x: curves[c].x, y: curves[c].y})
						}

					// calculate area
						let area = 0
						for (let p = 0; p < points.length; p++) {
							const thisPoint = points[p]
							const nextPoint = points[p + 1] ?? points[0]

							area += ((thisPoint.x * nextPoint.y) - (nextPoint.x * thisPoint.y))
						}

					// area
						return area
				} catch (error) {console.log(error)}
			}

	/** intersections **/
		/* getBBoxOverlap */
			function getBBoxOverlap(svgA, svgB) {
				try {
					// a
						const itemAbbox = svgA.getBBox()
						const itemAdimensions = {
							left:   itemAbbox.x,
							top:    itemAbbox.y,
							right:  itemAbbox.x + itemAbbox.width,
							bottom: itemAbbox.y + itemAbbox.height
						}

					// b
						const itemBbbox = svgB.getBBox()
						const itemBdimensions = {
							left:   itemBbbox.x,
							top:    itemBbbox.y,
							right:  itemBbbox.x + itemBbbox.width,
							bottom: itemBbbox.y + itemBbbox.height
						}

					// overlap
						if (((itemAdimensions.left >= itemBdimensions.left && itemAdimensions.left <= itemBdimensions.right) ||
							 (itemBdimensions.left >= itemAdimensions.left && itemBdimensions.left <= itemAdimensions.right)) &&
							((itemAdimensions.top  >= itemBdimensions.top  && itemAdimensions.top  <= itemBdimensions.bottom) ||
							 (itemBdimensions.top  >= itemAdimensions.top  && itemBdimensions.top  <= itemAdimensions.bottom))) {
							return true
						}

					// no overlap
						return false
				} catch (error) {console.log(error)}
			}

		/* getIntersectionPoints */
			function getIntersectionPoints(itemA, itemB) {
				try {
					// temporarily reduce stroke-width
						itemA.svg.setAttribute("stroke-width", CONSTANTS.tempStrokeWidth)
						itemB.svg.setAttribute("stroke-width", CONSTANTS.tempStrokeWidth)

					// bounding box overlap
						if (!getBBoxOverlap(itemA.svg, itemB.svg)) {
							itemA.svg.setAttribute("stroke-width", itemA.attributes.styling["stroke-width"])
							itemB.svg.setAttribute("stroke-width", itemB.attributes.styling["stroke-width"])
							return {aIntersectsB: [], bIntersectsA: []}
						}
					
					// intersection points
						let aIntersectsB = getIntersectionPointsFromPerspective(itemA, itemB)
						let bIntersectsA = getIntersectionPointsFromPerspective(itemB, itemA)

					// fix up
						itemA.svg.setAttribute("stroke-width", itemA.attributes.styling["stroke-width"])
						itemB.svg.setAttribute("stroke-width", itemB.attributes.styling["stroke-width"])

					// return
						return {aIntersectsB, bIntersectsA}
				} catch (error) {console.log(error)}
			}

		/* getIntersectionPointsFromPerspective */
			function getIntersectionPointsFromPerspective(thisItem, thatItem) {
				try {
					// loop along thisItem path
						const thisItemLength = thisItem.svg.getTotalLength()
						const thisItemPoints = []
						for (let d = 0; d < thisItemLength; d = roundNumber(d + CONSTANTS.pathIncrement)) {
							const point = thisItem.svg.getPointAtLength(d)
								point.x = roundNumber(point.x)
								point.y = roundNumber(point.y)
							const place = thatItem.svg.isPointInStroke(point) ? "edge" : 
										  thatItem.svg.isPointInFill(point) ? "inside" : "outside"
							thisItemPoints.push({
								d,
								x: roundNumber(point.x),
								y: roundNumber(point.y),
								point,
								place
							})
						}

					// none outside
						if (thisItemPoints.length == thisItemPoints.filter(point => point.place !== "outside").length) {
							return true
						}

					// filter down
						const importantPoints = [thisItemPoints[0]]
						for (let p = 1; p < thisItemPoints.length; p++) {
							if (thisItemPoints[p].place !== thisItemPoints[p - 1].place) {
								if (!importantPoints.includes(thisItemPoints[p - 1])) {
									importantPoints.push(thisItemPoints[p - 1])
								}
								if (!importantPoints.includes(thisItemPoints[p])) {
									importantPoints.push(thisItemPoints[p])
								}
							}
						}

					// get intersections
						const thisIntersectsThat = []
						for (let p = 0; p < importantPoints.length; p++) {
							if (importantPoints[p].place !== "edge") {
								continue
							}

							const placeBefore = importantPoints.slice(0, p).findLast(point => point.place !== "edge")?.place || 
												importantPoints.slice(p   ).findLast(point => point.place !== "edge")?.place || null
							const placeAfter  = importantPoints.slice(p   ).find(    point => point.place !== "edge")?.place || 
												importantPoints.slice(0, p).find(    point => point.place !== "edge")?.place || null
							const intersectionType = placeBefore == placeAfter ? "tangent" :
												     placeBefore == "inside"  || placeAfter == "outside" ? "leave" :
												     placeBefore == "outside" || placeAfter == "inside"  ? "enter" :
												     "tangent"

							thisIntersectsThat.push({
								d: roundNumber(importantPoints[p].d),
								x: roundNumber(importantPoints[p].x),
								y: roundNumber(importantPoints[p].y),
								type: intersectionType
							})
						}

					// duplicates
						for (let i = 1; i < thisIntersectsThat.length; i++) {
							if (getScalar(thisIntersectsThat[i], thisIntersectsThat[i - 1]) < CONSTANTS.mergeThreshold) {
								thisIntersectsThat.splice(i, 1)
								i--
							}
						}

					// last duplicates first
						if (thisIntersectsThat?.length > 1 && getScalar(thisIntersectsThat[0], thisIntersectsThat[thisIntersectsThat.length - 1]) < CONSTANTS.pathIncrement) {
							if (thisIntersectsThat[0].type == thisIntersectsThat[thisIntersectsThat.length - 1].type) {
								thisIntersectsThat.pop()
							}
							else {
								thisIntersectsThat[0].type = "tangent"
								thisIntersectsThat.pop()
							}
						}

					// return intersections
						return thisIntersectsThat
				} catch (error) {console.log(error)}
			}

		/* splitCurveAtRatio */
			function splitCurveAtRatio(start, curve, ratio, split) {
				try {
					// De Casteljau's algorithm
					// p' = p0 * (1 − t) + p1 * t
					// p' = p0 - tp0 + tp1
					// p' = p0 + t * (p1 - p0)
						ratio = Math.round(Math.max(0, Math.min(1, ratio)) * CONSTANTS.ratioRounding)
					
					// cubic points
						const cubicPoints = [
							{
								x: (start.x   * CONSTANTS.ratioRounding + ratio * (curve.c1x -   start.x)) / CONSTANTS.ratioRounding,
								y: (start.y   * CONSTANTS.ratioRounding + ratio * (curve.c1y -   start.y)) / CONSTANTS.ratioRounding
							},
							{
								x: (curve.c1x * CONSTANTS.ratioRounding + ratio * (curve.c2x - curve.c1x)) / CONSTANTS.ratioRounding,
								y: (curve.c1y * CONSTANTS.ratioRounding + ratio * (curve.c2y - curve.c1y)) / CONSTANTS.ratioRounding
							},
							{
								x: (curve.c2x * CONSTANTS.ratioRounding + ratio * (curve.x   - curve.c2x)) / CONSTANTS.ratioRounding,
								y: (curve.c2y * CONSTANTS.ratioRounding + ratio * (curve.y   - curve.c2y)) / CONSTANTS.ratioRounding
							}
						]

					// quadratic points
						const quadraticPoints = [
							{
								x: (cubicPoints[0].x * CONSTANTS.ratioRounding + ratio * (cubicPoints[1].x - cubicPoints[0].x)) / CONSTANTS.ratioRounding,
								y: (cubicPoints[0].y * CONSTANTS.ratioRounding + ratio * (cubicPoints[1].y - cubicPoints[0].y)) / CONSTANTS.ratioRounding
							},
							{
								x: (cubicPoints[1].x * CONSTANTS.ratioRounding + ratio * (cubicPoints[2].x - cubicPoints[1].x)) / CONSTANTS.ratioRounding,
								y: (cubicPoints[1].y * CONSTANTS.ratioRounding + ratio * (cubicPoints[2].y - cubicPoints[1].y)) / CONSTANTS.ratioRounding
							}
						]

					// linearPoint
						const linearPoint = {
							x: (quadraticPoints[0].x * CONSTANTS.ratioRounding + ratio * (quadraticPoints[1].x - quadraticPoints[0].x)) / CONSTANTS.ratioRounding,
							y: (quadraticPoints[0].y * CONSTANTS.ratioRounding + ratio * (quadraticPoints[1].y - quadraticPoints[0].y)) / CONSTANTS.ratioRounding
						}

					// return
						return [
							{
								c1x: roundNumber(cubicPoints[0].x),
								c1y: roundNumber(cubicPoints[0].y),
								c2x: roundNumber(quadraticPoints[0].x),
								c2y: roundNumber(quadraticPoints[0].y),
								x:   split?.x ?? roundNumber(linearPoint.x),
								y:   split?.y ?? roundNumber(linearPoint.y)
							},
							{
								c1x: roundNumber(quadraticPoints[1].x),
								c1y: roundNumber(quadraticPoints[1].y),
								c2x: roundNumber(cubicPoints[2].x),
								c2y: roundNumber(cubicPoints[2].y),
								x:   curve.x,
								y:   curve.y
							}
						]
				} catch (error) {console.log(error)}
			}

		/* splitCurvesAtIntersections */
			function splitCurvesAtIntersections(item, intersections) {
				try {
					// new curves
						const newCurves = [...item.attributes.curves]
						const coordinates = {x: 0, y: 0, d: 0}
						const startPoint  = {x: 0, y: 0}

					// loop through intersections
						intersectionLoop: for (let i = 0; i < intersections.length; i++) {
							// reset position
								coordinates.x = startPoint.x = 0
								coordinates.y = startPoint.y = 0
								coordinates.d = 0

							// loop through curves
								curveLoop: for (let curveIndex = 0; curveIndex < newCurves.length; curveIndex++) {
									const curve = newCurves[curveIndex]
									
									// Z
										if (curve.z) {
											// treat it like L --> C
												const pseudoCommands = getSimplifiedCommands([
													`M ${coordinates.x} ${coordinates.y}`,
													`L ${startPoint.x} ${startPoint.y}`
												])
												const pseudoCurves = getCurvesFromCommands(pseudoCommands).slice(0,2)

											// get path to add length
												const thisPath = document.createElementNS("http://www.w3.org/2000/svg", "path")
													thisPath.setAttribute("stroke-width", CONSTANTS.tempStrokeWidth)
													thisPath.setAttribute("d", pseudoCommands.join("\n"))
												ELEMENTS.container.svg.appendChild(thisPath)
												const thisPathLength = thisPath.getTotalLength()

											// destination is in here --> split curve and restart loop
												const remainingPathLength = roundNumber(intersections[i].d - coordinates.d)
												if (remainingPathLength < thisPathLength) {
													const ratio = remainingPathLength / thisPathLength
													const splitCurves = splitCurveAtRatio(coordinates, pseudoCurves[1], ratio, intersections[i])
													newCurves.splice(curveIndex, 1, ...splitCurves)
													newCurves.splice(curveIndex + 2, 0, {
														z: true,
														zx: splitCurves[1].x,
														zy: splitCurves[1].y
													})
													thisPath.remove()
													break curveLoop
												}
											
											// update coordinates & continue to next curve
												coordinates.x = curve.zx
												coordinates.y = curve.zy
												coordinates.d = roundNumber(coordinates.d + thisPathLength)
												thisPath.remove()
												continue curveLoop
										}

									// M
										if (curve.c1x == undefined) {
											// get path to add length
												const thisPath = document.createElementNS("http://www.w3.org/2000/svg", "path")
													thisPath.setAttribute("stroke-width", CONSTANTS.tempStrokeWidth)
													thisPath.setAttribute("d", `M ${coordinates.x} ${coordinates.y} M ${curve.x} ${curve.y}`)
												ELEMENTS.container.svg.appendChild(thisPath)
												const thisPathLength = thisPath.getTotalLength()

											// update coordinates & continue to next curve
												coordinates.x = startPoint.x = curve.x
												coordinates.y = startPoint.y = curve.y
												coordinates.d = roundNumber(coordinates.d + thisPathLength)
												thisPath.remove()
												continue curveLoop
										}

									// C
										// get path to add length
											const thisPath = document.createElementNS("http://www.w3.org/2000/svg", "path")
												thisPath.setAttribute("stroke-width", CONSTANTS.tempStrokeWidth)
												thisPath.setAttribute("d", `M ${coordinates.x} ${coordinates.y} C ${curve.c1x} ${curve.c1y} ${curve.c2x} ${curve.c2y} ${curve.x} ${curve.y}`)
											ELEMENTS.container.svg.appendChild(thisPath)
											const thisPathLength = thisPath.getTotalLength()

										// destination is in here --> split curve and restart loop
											const remainingPathLength = roundNumber(intersections[i].d - coordinates.d)
											if (remainingPathLength < thisPathLength) {
												const ratio = remainingPathLength / thisPathLength
												const splitCurves = splitCurveAtRatio(coordinates, curve, ratio, intersections[i])
												newCurves.splice(curveIndex, 1, ...splitCurves)
												thisPath.remove()
												break curveLoop
											}
											
										// update coordinates & continue to next curve
											coordinates.x = curve.x
											coordinates.y = curve.y
											coordinates.d = roundNumber(coordinates.d + thisPathLength)
											thisPath.remove()
											continue curveLoop
								}
						}

					// deduplicate Cs
						for (let n = 1; n < newCurves.length; n++) {
							if (newCurves[n - 1]?.x == newCurves[n].x && newCurves[n - 1]?.y == newCurves[n].y
							 && newCurves[n].c1x !== undefined && newCurves[n].c1y !== undefined) {
								newCurves.splice(n, 1)
								n--
							}
						}

					// curves
						return newCurves
				} catch (error) {console.log(error)}
			}

	/** transformations **/
		/* setItemCoordinates */
			function setItemCoordinates(item) {
				try {
					// circle
						if (item.attributes.styling.shape == "circle") {
							item.listing.coordinates.cx.value = item.attributes.coordinates.cx
							item.listing.coordinates.cy.value = item.attributes.coordinates.cy
							item.listing.coordinates.r.value  = item.attributes.coordinates.r
							item.svg.setAttribute("cx", item.attributes.coordinates.cx)
							item.svg.setAttribute("cy", item.attributes.coordinates.cy)
							item.svg.setAttribute("r", item.attributes.coordinates.r)
							return
						}

					// ellipse
						if (item.attributes.styling.shape == "ellipse") {
							item.listing.coordinates.cx.value = item.attributes.coordinates.cx
							item.listing.coordinates.cy.value = item.attributes.coordinates.cy
							item.listing.coordinates.rx.value = item.attributes.coordinates.rx
							item.listing.coordinates.ry.value = item.attributes.coordinates.ry
							item.svg.setAttribute("cx", item.attributes.coordinates.cx)
							item.svg.setAttribute("cy", item.attributes.coordinates.cy)
							item.svg.setAttribute("rx", item.attributes.coordinates.rx)
							item.svg.setAttribute("ry", item.attributes.coordinates.ry)
							return
						}

					// rectangle
						if (item.attributes.styling.shape == "rect") {
							item.listing.coordinates.x.value  = item.attributes.coordinates.x
							item.listing.coordinates.y.value  = item.attributes.coordinates.y
							item.listing.coordinates.rx.value = item.attributes.coordinates.rx
							item.listing.coordinates.ry.value = item.attributes.coordinates.ry
							item.listing.coordinates.width.value  = item.attributes.coordinates.width
							item.listing.coordinates.height.value = item.attributes.coordinates.height
							item.svg.setAttribute("x",  item.attributes.coordinates.x)
							item.svg.setAttribute("y",  item.attributes.coordinates.y)
							item.svg.setAttribute("rx", item.attributes.coordinates.rx)
							item.svg.setAttribute("ry", item.attributes.coordinates.ry)
							item.svg.setAttribute("width",  item.attributes.coordinates.width)
							item.svg.setAttribute("height", item.attributes.coordinates.height)
							return
						}

					// line
						if (item.attributes.styling.shape == "line") {
							item.listing.coordinates.x1.value = item.attributes.coordinates.x1
							item.listing.coordinates.y1.value = item.attributes.coordinates.y1
							item.svg.setAttribute("x1", item.attributes.coordinates.x1)
							item.svg.setAttribute("y1", item.attributes.coordinates.y1)

							item.listing.coordinates.x2.value = item.attributes.coordinates.x2
							item.listing.coordinates.y2.value = item.attributes.coordinates.y2
							item.svg.setAttribute("x2", item.attributes.coordinates.x2)
							item.svg.setAttribute("y2", item.attributes.coordinates.y2)

							const p1 = item.points[`point-1`]
								p1.setAttribute("cx", item.attributes.coordinates.x1)
								p1.setAttribute("cy", item.attributes.coordinates.y1)

							const p2 = item.points[`point-2`]
								p2.setAttribute("cx", item.attributes.coordinates.x2)
								p2.setAttribute("cy", item.attributes.coordinates.y2)
							return
						}

					// polygon & polyline
						if (item.attributes.styling.shape == "polygon" || item.attributes.styling.shape == "polyline") {
							item.listing.coordinates.points.value = item.attributes.coordinates.points

							const points = item.attributes.coordinates.points.split(/\n/g)
							for (let coordinateIndex = 0; coordinateIndex < points.length; coordinateIndex++) {
								const pair = points[coordinateIndex].split(",")
								if (!String(pair[0]).length || !String(pair[1]).length || isNaN(pair[0]) || isNaN(pair[1])) {
									return
								}

								if (!item.points[`point-${coordinateIndex}`]) {
									const newP = document.createElementNS("http://www.w3.org/2000/svg", "circle")
										newP.id = `${item.id}-controls-listing-coordinates-point-${coordinateIndex}`
										newP.className = "polygon-point"
										newP.setAttribute("cx", pair[0])
										newP.setAttribute("cy", pair[1])
										newP.setAttribute("r",  CONSTANTS.points.r)
										newP.setAttribute("fill", CONSTANTS.points.fill)
										newP.setAttribute("stroke", CONSTANTS.points.pointStroke)
										newP.setAttribute("stroke-width", CONSTANTS.points.pointWidth)
										newP.addEventListener(TRIGGERS.mousedown, selectPoint)
										newP.addEventListener(TRIGGERS.doubleclick, doubleclickPoint)
									item.points.group.appendChild(newP)
									item.points[`point-${coordinateIndex}`] = newP
								}
								else {
									const p = item.points[`point-${coordinateIndex}`]
										p.setAttribute("cx", pair[0])
										p.setAttribute("cy", pair[1])
								}
							}

							for (let p in item.points) {
								if (p == "group") {
									continue
								}
								if (p.split("-")[1] < points.length) {
									continue
								}
								item.points[p].remove()
								delete item.points[p]
							}

							item.svg.setAttribute("points", item.attributes.coordinates.points)
							return
						}

					// path (& curves)
						if (item.attributes.styling.shape == "path") {
							if (item.attributes.curves) {
								const commands = getCommandsFromPath(item.attributes.coordinates.d)
								item.attributes.curves = getCurvesFromCommands(commands)
								item.listing.coordinates = buildItemCoordinates(item)
								setCurvePointsCoordinates(item.points, item.attributes.curves)
							}
							else {
								item.listing.coordinates.d.value = item.attributes.coordinates.d
							}
							item.svg.setAttribute("d", item.attributes.coordinates.d)
							return
						}
				} catch (error) {console.log(error)}
			}

		/* setCurvePointsCoordinates */
			function setCurvePointsCoordinates(points, curves) {
				try {
					for (let curveIndex = 0; curveIndex < curves.length; curveIndex++) {
						const curve = curves[curveIndex]

						// Z
							if (curve.z) {
								continue
							}

						// C
							if (curve.c1x !== undefined) {
								// previous
									const previousCurve = curves.slice(0, curveIndex).findLast(thatCurve => thatCurve.x !== undefined && thatCurve.y !== undefined)
									const previousX = previousCurve.x
									const previousY = previousCurve.y

								// lines
									const previousToC1Line = points[`curve-${curveIndex}-PreviousToC1`]
										previousToC1Line.setAttribute("x1", previousX)
										previousToC1Line.setAttribute("y1", previousY)
										previousToC1Line.setAttribute("x2", curve.c1x)
										previousToC1Line.setAttribute("y2", curve.c1y)

									const c1ToC2Line = points[`curve-${curveIndex}-C1ToC2`]
										c1ToC2Line.setAttribute("x1", curve.c1x)
										c1ToC2Line.setAttribute("y1", curve.c1y)
										c1ToC2Line.setAttribute("x2", curve.c2x)
										c1ToC2Line.setAttribute("y2", curve.c2y)

									const c2ToFinalLine = points[`curve-${curveIndex}-C2ToFinal`]
										c2ToFinalLine.setAttribute("x1", curve.c2x)
										c2ToFinalLine.setAttribute("y1", curve.c2y)
										c2ToFinalLine.setAttribute("x2", curve.x)
										c2ToFinalLine.setAttribute("y2", curve.y)

								// points	
									const c1 = points[`curve-${curveIndex}-c1`]
										c1.setAttribute("cx", curve.c1x)
										c1.setAttribute("cy", curve.c1y)

									const c2 = points[`curve-${curveIndex}-c2`]
										c2.setAttribute("cx", curve.c2x)
										c2.setAttribute("cy", curve.c2y)
							}

						// M
							if (curve.x !== undefined) {
								const p = points[`curve-${curveIndex}-p`]
									p.setAttribute("cx", curve.x)
									p.setAttribute("cy", curve.y)
							}
					}
				} catch (error) {console.log(error)}
			}

		/* translateItem */
			function translateItem(item, previousCoordinates, deltaX, deltaY, snap) {
				try {
					// updated coordinates
						item.attributes.coordinates = getTranslatedCoordinates(previousCoordinates, deltaX, deltaY, snap)

					// set
						setItemCoordinates(item)
				} catch (error) {console.log(error)}
			}

		/* getTranslatedCoordinates */
			function getTranslatedCoordinates(coordinates, deltaX, deltaY, snap) {
				try {
					// new coordinates
						const newCoordinates = {}

					// loop through keys
						for (const key in coordinates) {
							// path
								if (key == "d") {
									const commands = getCommandsFromPath(coordinates[key])
									const translatedCommands = getTranslatedCommands(commands, deltaX, deltaY, snap)
									newCoordinates[key] = getPathFromCommands(translatedCommands)
								}

							// polygon / polyline
								else if (key == "points") {
									const numbers = coordinates[key].replace(/,/g, " ").replace(/\n/g, " ").replace(/\s+/g, " ").split(/\s/g)
									const points = []
									for (let n = 0; n < numbers.length; n += 2) {
										let x = roundNumber(Number(numbers[n    ]) + deltaX)
										let y = roundNumber(Number(numbers[n + 1]) + deltaY)
										if (snap) {
											x = Math.round(x)
											y = Math.round(y)
										}
										points.push(`${x},${y}`)
									}
									newCoordinates[key] = points.join("\n")
								}
							
							// line, circle, ellipse, rect
								else if (["x", "x1", "x2", "cx"].includes(key)) {
									newCoordinates[key] = roundNumber(Number(coordinates[key]) + deltaX)
									if (snap) {
										newCoordinates[key] = Math.round(newCoordinates[key])
									}
								}
								else if (["y", "y1", "y2", "cy"].includes(key)) {
									newCoordinates[key] = roundNumber(Number(coordinates[key]) + deltaY)
									if (snap) {
										newCoordinates[key] = Math.round(newCoordinates[key])
									}
								}

							// other attributes
								else {
									newCoordinates[key] = coordinates[key]
								}
						}

					// return
						return newCoordinates
				} catch (error) {console.log(error)}
			}

		/* getTranslatedCommands */
			function getTranslatedCommands(commands, deltaX, deltaY, snap) {
				try {
					// loop through commands
						for (let c = 0; c < commands.length; c++) {
							// components
								const components = commands[c].split(/\s/g)

							// M
								if (components[0] == "M") {
									let x = roundNumber(Number(components[1]) + deltaX)
									let y = roundNumber(Number(components[2]) + deltaY)
									if (snap) {
										x = Math.round(x)
										y = Math.round(y)
									}
									commands[c] = `M ${x} ${y}`
								}

							// L
								else if (components[0] == "L") {
									let x = roundNumber(Number(components[1]) + deltaX)
									let y = roundNumber(Number(components[2]) + deltaY)
									if (snap) {
										x = Math.round(x)
										y = Math.round(y)
									}
									commands[c] = `L ${x} ${y}`
								}

								// H
									else if (components[0] == "H") {
										let x = roundNumber(Number(components[1]) + deltaX)
										if (snap) {
											x = Math.round(x)
										}
										commands[c] = `H ${x}`
									}

								// V
									else if (components[0] == "V") {
										let y = roundNumber(Number(components[1]) + deltaY)
										if (snap) {
											y = Math.round(y)
										}
										commands[c] = `V ${y}`
									}

							// C
								else if (components[0] == "C") {
									let controlX1 = roundNumber(Number(components[1]) + deltaX)
									let controlY1 = roundNumber(Number(components[2]) + deltaY)
									let controlX2 = roundNumber(Number(components[3]) + deltaX)
									let controlY2 = roundNumber(Number(components[4]) + deltaY)
									let finalX    = roundNumber(Number(components[5]) + deltaX)
									let finalY    = roundNumber(Number(components[6]) + deltaY)
									if (snap) {
										controlX1 = Math.round(controlX1)
										controlY1 = Math.round(controlY1)
										controlX2 = Math.round(controlX2)
										controlY2 = Math.round(controlY2)
										finalX    = Math.round(finalX)
										finalY    = Math.round(finalY)
									}
									commands[c] = `C ${controlX1} ${controlY1} ${controlX2} ${controlY2} ${finalX} ${finalY}`
								}

								// S
									else if (components[0] == "S") {
										let controlX2 = roundNumber(Number(components[1]) + deltaX)
										let controlY2 = roundNumber(Number(components[2]) + deltaY)
										let finalX    = roundNumber(Number(components[3]) + deltaX)
										let finalY    = roundNumber(Number(components[4]) + deltaY)
										if (snap) {
											controlX2 = Math.round(controlX2)
											controlY2 = Math.round(controlY2)
											finalX    = Math.round(finalX)
											finalY    = Math.round(finalY)
										}
										commands[c] = `S ${controlX2} ${controlY2} ${finalX} ${finalY}`
									}

							// Q
								else if (components[0] == "Q") {
									let controlX = roundNumber(Number(components[1]) + deltaX)
									let controlY = roundNumber(Number(components[2]) + deltaY)
									let finalX   = roundNumber(Number(components[3]) + deltaX)
									let finalY   = roundNumber(Number(components[4]) + deltaY)
									if (snap) {
										controlX = Math.round(controlX)
										controlY = Math.round(controlY)
										finalX   = Math.round(finalX)
										finalY   = Math.round(finalY)
									}
									commands[c] = `Q ${controlX} ${controlY} ${finalX} ${finalY}`
								}

								// T
									else if (components[0] == "T") {
										let finalX    = roundNumber(Number(components[1]) + deltaX)
										let finalY    = roundNumber(Number(components[2]) + deltaY)
										if (snap) {
											finalX   = Math.round(finalX)
											finalY   = Math.round(finalY)
										}
										commands[c] = `T ${finalX} ${finalY}`
									}

							// A
								else if (components[0] == "A") {
									let radiusX = roundNumber(Number(components[1]))
									let radiusY = roundNumber(Number(components[2]))
									let rotationDegrees = roundNumber(Number(components[3]))
									let largeArcFlag = components[4]
									let sweepFlag = components[5]
									let finalX    = roundNumber(Number(components[6]) + deltaX)
									let finalY    = roundNumber(Number(components[7]) + deltaY)
									if (snap) {
										radiusX = Math.round(radiusX)
										radiusY = Math.round(radiusY)
										finalX = Math.round(finalX)
										finalY = Math.round(finalY)
									}
									commands[c] = `A ${radiusX} ${radiusY} ${rotationDegrees} ${largeArcFlag} ${sweepFlag} ${finalX} ${finalY}`
								}

							// Z
								else if (components[0] == "Z") {
									commands[c] = `Z` 
								}
						}

					// return
						return commands
				} catch (error) {console.log(error)}
			}

		/* scaleItem */
			function scaleItem(item, previousCoordinates, factorX, factorY, offsetX, offsetY, snap) {
				try {
					// updated coordinates
						const zeroedCoordinates = getTranslatedCoordinates(previousCoordinates, -offsetX, -offsetY, snap)
						const scaledCoordinates = getScaledCoordinates(zeroedCoordinates, factorX, factorY, snap)
						item.attributes.coordinates = getTranslatedCoordinates(scaledCoordinates, offsetX, offsetY, snap)

					// set
						setItemCoordinates(item)
				} catch (error) {console.log(error)}
			}

		/* getScaledCoordinates */
			function getScaledCoordinates(coordinates, factorX, factorY, snap) {
				try {
					// new coordinates
						const newCoordinates = {}

					// path
						if (coordinates.d) {
							const commands = getCommandsFromPath(coordinates.d)
							const absoluteCommands = getAbsoluteCommands(commands)
							const simplifiedCommands = getSimplifiedCommands(absoluteCommands)
							const scaledCommands = getScaledCommands(simplifiedCommands, factorX, factorY, snap)
							newCoordinates.d = getPathFromCommands(scaledCommands)
						}

					// polygon / polyline
						else if (coordinates.points) {
							const numbers = coordinates.points.replace(/,/g, " ").replace(/\n/g, " ").replace(/\s+/g, " ").split(/\s/g)
							const points = []
							for (let n = 0; n < numbers.length; n += 2) {
								let x = roundNumber(Number(numbers[n    ]) * factorX)
								let y = roundNumber(Number(numbers[n + 1]) * factorY)
								if (snap) {
									x = Math.round(x)
									y = Math.round(y)
								}
								points.push(`${x},${y}`)
							}
							newCoordinates.points = points.join("\n")
						}

					// line
						else if (coordinates.x1 !== undefined) {
							newCoordinates.x1 = roundNumber(coordinates.x1 * factorX)
							newCoordinates.y1 = roundNumber(coordinates.y1 * factorY)
							newCoordinates.x2 = roundNumber(coordinates.x2 * factorX)
							newCoordinates.y2 = roundNumber(coordinates.y2 * factorY)

							if (snap) {
								newCoordinates.x1 = Math.round(newCoordinates.x1)
								newCoordinates.y1 = Math.round(newCoordinates.y1)
								newCoordinates.x2 = Math.round(newCoordinates.x2)
								newCoordinates.y2 = Math.round(newCoordinates.y2)
							}
						}

					// circle
						else if (coordinates.r !== undefined) {
							const rx = Math.abs(roundNumber(coordinates.r * factorX))
							const ry = Math.abs(roundNumber(coordinates.r * factorY))						
							newCoordinates.r = roundNumber(getAverage(rx, ry))
							newCoordinates.cx = roundNumber(coordinates.cx * factorX)
							newCoordinates.cy = roundNumber(coordinates.cy * factorY)

							if (snap) {
								newCoordinates.r  = Math.round(newCoordinates.r)
								newCoordinates.cx = Math.round(newCoordinates.cx)
								newCoordinates.cy = Math.round(newCoordinates.cy)
							}
						}

					// rect
						else if (coordinates.width !== undefined) {
							newCoordinates.rx = Math.abs(roundNumber(coordinates.rx * (factorX || 1)))
							newCoordinates.ry = Math.abs(roundNumber(coordinates.ry * (factorY || 1)))
							newCoordinates.x  = roundNumber(coordinates.x * factorX)
							newCoordinates.y  = roundNumber(coordinates.y * factorY)
							newCoordinates.width  = roundNumber(coordinates.width  * factorX)
							newCoordinates.height = roundNumber(coordinates.height * factorY)

							if (newCoordinates.width < 0) {
								newCoordinates.x *= -1
								newCoordinates.width = Math.abs(newCoordinates.width)
							}
							if (newCoordinates.height < 0) {
								newCoordinates.y *= -1
								newCoordinates.height = Math.abs(newCoordinates.height)
							}

							if (snap) {
								newCoordinates.rx = Math.round(newCoordinates.rx)
								newCoordinates.ry = Math.round(newCoordinates.ry)
								newCoordinates.x  = Math.round(newCoordinates.x)
								newCoordinates.y  = Math.round(newCoordinates.y)
								newCoordinates.width  = Math.round(newCoordinates.width)
								newCoordinates.height = Math.round(newCoordinates.height)

							}
						}

					// ellipse
						else {
							newCoordinates.cx = roundNumber(coordinates.cx * factorX)
							newCoordinates.cy = roundNumber(coordinates.cy * factorY)
							newCoordinates.rx = Math.abs(roundNumber(coordinates.rx * factorX || 1))
							newCoordinates.ry = Math.abs(roundNumber(coordinates.ry * factorY || 1))

							if (snap) {
								newCoordinates.cx = Math.round(newCoordinates.cx)
								newCoordinates.cy = Math.round(newCoordinates.cy)
								newCoordinates.rx = Math.round(newCoordinates.rx)
								newCoordinates.ry = Math.round(newCoordinates.ry)
							}
						}

					// return
						return newCoordinates
				} catch (error) {console.log(error)}
			}

		/* getScaledCommands */
			function getScaledCommands(commands, factorX, factorY, snap) {
				try {
					// loop through commands
						for (let c = 0; c < commands.length; c++) {
							// components
								const components = commands[c].split(/\s/g)

							// M
								if (components[0] == "M") {
									let x = roundNumber(Number(components[1]) * factorX)
									let y = roundNumber(Number(components[2]) * factorY)
									if (snap) {
										x = Math.round(x)
										y = Math.round(y)
									}
									commands[c] = `${components[0]} ${x} ${y}`
								}

							// C
								else if (components[0] == "C") {
									let controlX1 = roundNumber(Number(components[1]) * factorX)
									let controlY1 = roundNumber(Number(components[2]) * factorY)
									let controlX2 = roundNumber(Number(components[3]) * factorX)
									let controlY2 = roundNumber(Number(components[4]) * factorY)
									let finalX    = roundNumber(Number(components[5]) * factorX)
									let finalY    = roundNumber(Number(components[6]) * factorY)
									if (snap) {
										controlX1 = Math.round(controlX1)
										controlY1 = Math.round(controlY1)
										controlX2 = Math.round(controlX2)
										controlY2 = Math.round(controlY2)
										finalX    = Math.round(finalX)
										finalY    = Math.round(finalY)
									}
									commands[c] = `${components[0]} ${controlX1} ${controlY1} ${controlX2} ${controlY2} ${finalX} ${finalY}`
								}

							// Z
								else if (components[0] == "Z") {
									commands[c] = `${components[0]}` 
								}
						}

					// return
						return commands
				} catch (error) {console.log(error)}
			}

		/* skewItem */
			function skewItem(item, previousCoordinates, skewXdegrees, skewYdegrees, offsetX, offsetY, snap) {
				try {
					// rect / ellipse / circle --> not allowed
						if (["circle", "ellipse", "rect", "line"].includes(item.attributes.styling.shape)) {
							return
						}

					// radians
						const degreesX = snap ? (Math.round(skewXdegrees * CONSTANTS.snapDegrees) / CONSTANTS.snapDegrees) : skewXdegrees
						const degreesY = snap ? (Math.round(skewYdegrees * CONSTANTS.snapDegrees) / CONSTANTS.snapDegrees) : skewYdegrees
						const radiansX = degreesX * CONSTANTS.circleRadians / CONSTANTS.circleDegrees
						const radiansY = degreesY * CONSTANTS.circleRadians / CONSTANTS.circleDegrees

					// updated coordinates
						const zeroedCoordinates = getTranslatedCoordinates(previousCoordinates, -offsetX, -offsetY, snap)
						const skewedCoordinates = getSkewedCoordinates(zeroedCoordinates, radiansX, radiansY, snap)
						item.attributes.coordinates = getTranslatedCoordinates(skewedCoordinates, offsetX, offsetY, snap)

					// set
						setItemCoordinates(item)
				} catch (error) {console.log(error)}
			}

		/* getSkewedCoordinates */
			function getSkewedCoordinates(coordinates, radiansX, radiansY, snap) {
				try {
					// new coordinates
						const newCoordinates = {}

					// path
						if (coordinates.d) {
							const commands = getCommandsFromPath(coordinates.d)
							const absoluteCommands = getAbsoluteCommands(commands)
							const simplifiedCommands = getSimplifiedCommands(absoluteCommands)
							const skewedCommands = getSkewedCommands(simplifiedCommands, radiansX, radiansY, snap)
							newCoordinates.d = getPathFromCommands(skewedCommands)
						}

					// polygon / polyline
						else if (coordinates.points) {
							const xTan = Math.tan(radiansX)
							const yTan = Math.tan(radiansY)

							const numbers = coordinates.points.replace(/,/g, " ").replace(/\n/g, " ").replace(/\s+/g, " ").split(/\s/g)
							const points = []
							for (let n = 0; n < numbers.length; n += 2) {
								const newPoint = getSkewedPoint({
									x: Number(numbers[n    ]),
									y: Number(numbers[n + 1]),
								}, {xTan, yTan})
								
								if (snap) {
									newPoint.x = Math.round(newPoint.x)
									newPoint.y = Math.round(newPoint.y)
								}
								points.push(`${newPoint.x},${newPoint.y}`)
							}
							newCoordinates.points = points.join("\n")
						}

					// line
						else if (coordinates.x1 !== undefined) {
							const xTan = Math.tan(radiansX)
							const yTan = Math.tan(radiansY)

							const newPoint1 = getSkewedPoint({
								x: coordinates.x1,
								y: coordinates.y1,
							}, {xCos, ySin})
							const newPoint2 = getSkewedPoint({
								x: coordinates.x2,
								y: coordinates.y2,
							}, {xTan, yTan})

							newCoordinates.x1 = newPoint1.x
							newCoordinates.y1 = newPoint1.y
							newCoordinates.x2 = newPoint2.x
							newCoordinates.y2 = newPoint2.y

							if (snap) {
								newCoordinates.x1 = Math.round(newCoordinates.x1)
								newCoordinates.y1 = Math.round(newCoordinates.y1)
								newCoordinates.x2 = Math.round(newCoordinates.x2)
								newCoordinates.y2 = Math.round(newCoordinates.y2)
							}
						}

					// others
						else {
							for (const c in coordinates) {
								newCoordinates[c] = coordinates[c]
							}
						}

					// return
						return newCoordinates
				} catch (error) {console.log(error)}
			}

		/* getSkewedCommands */
			function getSkewedCommands(commands, radiansX, radiansY, snap) {
				try {
					// get trig
						const xTan = Math.tan(radiansX)
						const yTan = Math.tan(radiansY)

					// loop through commands
						for (let c = 0; c < commands.length; c++) {
							// components
								const components = commands[c].split(/\s/g)

							// M
								if (components[0] == "M") {
									const final = getSkewedPoint({
										x: Number(components[1]),
										y: Number(components[2]),
									}, {xTan, yTan})
									if (snap) {
										final.x = Math.round(final.x)
										final.y = Math.round(final.y)
									}
									commands[c] = `${components[0]} ${final.x} ${final.y}`
								}

							// C
								else if (components[0] == "C") {
									const control1 = getSkewedPoint({
										x: Number(components[1]),
										y: Number(components[2]),
									}, {xTan, yTan})
									const control2 = getSkewedPoint({
										x: Number(components[3]),
										y: Number(components[4]),
									}, {xTan, yTan})
									const final = getSkewedPoint({
										x: Number(components[5]),
										y: Number(components[6]),
									}, {xTan, yTan})

									let controlX1 = control1.x
									let controlY1 = control1.y
									let controlX2 = control2.x
									let controlY2 = control2.y
									let finalX    = final.x
									let finalY    = final.y
									if (snap) {
										controlX1 = Math.round(controlX1)
										controlY1 = Math.round(controlY1)
										controlX2 = Math.round(controlX2)
										controlY2 = Math.round(controlY2)
										finalX    = Math.round(finalX)
										finalY    = Math.round(finalY)
									}
									commands[c] = `${components[0]} ${controlX1} ${controlY1} ${controlX2} ${controlY2} ${finalX} ${finalY}`
								}

							// Z
								else if (components[0] == "Z") {
									commands[c] = `${components[0]}` 
								}
						}

					// return
						return commands
				} catch (error) {console.log(error)}
			}

		/* getSkewedPoint */
			function getSkewedPoint({x, y}, {radiansX, radiansY, xTan, yTan}) {
				try {
					// no xTan / yTan
						if (radiansX !== undefined && xTan == undefined) {
							xTan = Math.tan(radiansX) || 0
						}
						if (radiansY !== undefined && yTan == undefined) {
							yTan = Math.tan(radiansY) || 0
						}

					// new point
						return {
							x: roundNumber(x + xTan * y),
							y: roundNumber(y + yTan * x)
						}
				} catch (error) {console.log(error)}
			}

		/* rotateItem */
			function rotateItem(item, previousCoordinates, rotationDegrees, offsetX, offsetY, snap) {
				try {
					// rect / ellipse / circle --> not allowed
						if (["circle", "ellipse", "rect"].includes(item.attributes.styling.shape)) {
							return
						}

					// radians
						const degrees = snap ? (Math.round(rotationDegrees * CONSTANTS.snapDegrees) / CONSTANTS.snapDegrees) : rotationDegrees
						const radians = degrees * CONSTANTS.circleRadians / CONSTANTS.circleDegrees

					// updated coordinates
						const zeroedCoordinates = getTranslatedCoordinates(previousCoordinates, -offsetX, -offsetY, snap)
						const rotatedCoordinates = getRotatedCoordinates(zeroedCoordinates, radians, snap)
						item.attributes.coordinates = getTranslatedCoordinates(rotatedCoordinates, offsetX, offsetY, snap)

					// set
						setItemCoordinates(item)
				} catch (error) {console.log(error)}
			}

		/* getRotatedCoordinates */
			function getRotatedCoordinates(coordinates, rotationRadians, snap) {
				try {
					// new coordinates
						const newCoordinates = {}

					// path
						if (coordinates.d) {
							const commands = getCommandsFromPath(coordinates.d)
							const absoluteCommands = getAbsoluteCommands(commands)
							const simplifiedCommands = getSimplifiedCommands(absoluteCommands)
							const rotatedCommands = getRotatedCommands(simplifiedCommands, rotationRadians, snap)
							newCoordinates.d = getPathFromCommands(rotatedCommands)
						}

					// polygon / polyline
						else if (coordinates.points) {
							const cosTheta = Math.cos(rotationRadians)
							const sinTheta = Math.sin(rotationRadians)

							const numbers = coordinates.points.replace(/,/g, " ").replace(/\n/g, " ").replace(/\s+/g, " ").split(/\s/g)
							const points = []
							for (let n = 0; n < numbers.length; n += 2) {
								const newPoint = getRotatedPoint({
									x: Number(numbers[n    ]),
									y: Number(numbers[n + 1]),
								}, {cosTheta, sinTheta})
								
								if (snap) {
									newPoint.x = Math.round(newPoint.x)
									newPoint.y = Math.round(newPoint.y)
								}
								points.push(`${newPoint.x},${newPoint.y}`)
							}
							newCoordinates.points = points.join("\n")
						}

					// line
						else if (coordinates.x1 !== undefined) {
							const cosTheta = Math.cos(rotationRadians)
							const sinTheta = Math.sin(rotationRadians)

							const newPoint1 = getRotatedPoint({
								x: coordinates.x1,
								y: coordinates.y1,
							}, {cosTheta, sinTheta})
							const newPoint2 = getRotatedPoint({
								x: coordinates.x2,
								y: coordinates.y2,
							}, {cosTheta, sinTheta})

							newCoordinates.x1 = newPoint1.x
							newCoordinates.y1 = newPoint1.y
							newCoordinates.x2 = newPoint2.x
							newCoordinates.y2 = newPoint2.y

							if (snap) {
								newCoordinates.x1 = Math.round(newCoordinates.x1)
								newCoordinates.y1 = Math.round(newCoordinates.y1)
								newCoordinates.x2 = Math.round(newCoordinates.x2)
								newCoordinates.y2 = Math.round(newCoordinates.y2)
							}
						}

					// others
						else {
							for (const c in coordinates) {
								newCoordinates[c] = coordinates[c]
							}
						}

					// return
						return newCoordinates
				} catch (error) {console.log(error)}
			}

		/* getRotatedCommands */
			function getRotatedCommands(commands, rotationRadians, snap) {
				try {
					// get trig
						const cosTheta = Math.cos(rotationRadians)
						const sinTheta = Math.sin(rotationRadians)

					// loop through commands
						for (let c = 0; c < commands.length; c++) {
							// components
								const components = commands[c].split(/\s/g)

							// M
								if (components[0] == "M") {
									const final = getRotatedPoint({
										x: Number(components[1]),
										y: Number(components[2]),
									}, {cosTheta, sinTheta})
									if (snap) {
										final.x = Math.round(final.x)
										final.y = Math.round(final.y)
									}
									commands[c] = `${components[0]} ${final.x} ${final.y}`
								}

							// C
								else if (components[0] == "C") {
									const control1 = getRotatedPoint({
										x: Number(components[1]),
										y: Number(components[2]),
									}, {cosTheta, sinTheta})
									const control2 = getRotatedPoint({
										x: Number(components[3]),
										y: Number(components[4]),
									}, {cosTheta, sinTheta})
									const final = getRotatedPoint({
										x: Number(components[5]),
										y: Number(components[6]),
									}, {cosTheta, sinTheta})

									let controlX1 = control1.x
									let controlY1 = control1.y
									let controlX2 = control2.x
									let controlY2 = control2.y
									let finalX    = final.x
									let finalY    = final.y
									if (snap) {
										controlX1 = Math.round(controlX1)
										controlY1 = Math.round(controlY1)
										controlX2 = Math.round(controlX2)
										controlY2 = Math.round(controlY2)
										finalX    = Math.round(finalX)
										finalY    = Math.round(finalY)
									}
									commands[c] = `${components[0]} ${controlX1} ${controlY1} ${controlX2} ${controlY2} ${finalX} ${finalY}`
								}

							// Z
								else if (components[0] == "Z") {
									commands[c] = `${components[0]}` 
								}
						}

					// return
						return commands
				} catch (error) {console.log(error)}
			}

		/* getRotatedPoint */
			function getRotatedPoint({x, y}, {radians, cosTheta, sinTheta}) {
				try {
					// no cosTheta / sinTheta
						if (radians !== undefined && (cosTheta == undefined || sinTheta == undefined)) {
							cosTheta = Math.cos(radians)
							sinTheta = Math.sin(radians)
						}

					// new point
						return {
							x: roundNumber(x * cosTheta - y * sinTheta),
							y: roundNumber(y * cosTheta + x * sinTheta)
						}
				} catch (error) {console.log(error)}
			}

		/* getReversedCurves */
			function getReversedCurves(curves, intersections) {
				try {
					// replace Zs with Cs (as necessary)
						const curvesCopy = getZtoCCurves(duplicateObject(curves))

					// new curves
						const newCurves = []
						const startPoint = {x: null, y: null}
						const controlPoints = {}

					// loop through in reverse
						for (let c = curvesCopy.length; c; c--) {
							// new curve
								const newCurve = {
									x: curvesCopy[c - 1].x,
									y: curvesCopy[c - 1].y
								}

							// C (held controlPoints)
								if (controlPoints.c1x !== undefined && controlPoints.c1y !== undefined && 
									controlPoints.c2x !== undefined && controlPoints.c2y !== undefined) {
									newCurve.c1x = controlPoints.c2x
									newCurve.c1y = controlPoints.c2y
									newCurve.c2x = controlPoints.c1x
									newCurve.c2y = controlPoints.c1y
								}

							// M
								else {
									startPoint.x = curvesCopy[c - 1].x
									startPoint.y = curvesCopy[c - 1].y
								}

							// hold new controlPoints (or undefined)
								controlPoints.c1x = curvesCopy[c - 1].c1x ?? undefined
								controlPoints.c1y = curvesCopy[c - 1].c1y ?? undefined
								controlPoints.c2x = curvesCopy[c - 1].c2x ?? undefined
								controlPoints.c2y = curvesCopy[c - 1].c2y ?? undefined

							// add
								newCurves.push(newCurve)
						}

					// intersections?
						if (intersections && intersections !== true) {
							intersections.reverse()
							for (const i in intersections) {
								if (intersections[i].type == "leave") {
									intersections[i].type = "enter"
								}
								else if (intersections[i].type == "enter") {
									intersections[i].type = "leave"
								}
							}
						}

					// return
						return newCurves
				} catch (error) {console.log(error)}
			}

		/* getZtoCCurves */
			function getZtoCCurves(curves) {
				try {
					// no curves
						if (!curves || !curves.length) {
							return curves
						}

					// loop through curves
						for (let c = 0; c < curves.length; c++) {
							// not Z --> continue
								if (!curves[c].z) {
									continue
								}

							// Z in place --> remove
								if (curves[c].zx == curves[c - 1].x && curves[c].zy == curves[c - 1].y) {
									curves.splice(c, 1)
									c--
									continue
								}

							// Z --> C
								const pseudoCommands = getSimplifiedCommands([
									`M ${curves[c - 1].x } ${curves[c - 1].y }`,
									`L ${curves[c    ].zx} ${curves[c    ].zy}`
								])
								const pseudoCurves = getCurvesFromCommands(pseudoCommands).slice(0,2)
								curves[c] = pseudoCurves[1]
						}

					// return
						return curves
				} catch (error) {console.log(error)}
			}

		/* getMtoZCurves */
			function getMtoZCurves(curves) {
				try {
					// no curves
						if (!curves || !curves.length) {
							return curves
						}

					// start nowhere
						const startPoint = {x: null, y: null}

					// loop through
						for (let c = 0; c < curves.length; c++) {
							// already Z
								if (curves[c].z) {
									continue
								}

							// C
								if (curves[c].c1x !== undefined && curves[c].c2x !== undefined) {
									continue
								}

							// M --> insert Z before, unless there is one
								const tempX = curves[c].x
								const tempY = curves[c].y

								if (c && (!curves[c + 1] || !curves[c + 1].z)) {

									curves.splice(c, 0, {
										z: true,
										zx: startPoint.x,
										zy: startPoint.y
									})
									c++
								}

								startPoint.x = tempX
								startPoint.y = tempY
						}

					// final Z
						if (!curves[curves.length - 1].z) {
							curves.push({
								z: true,
								zx: startPoint.x,
								zy: startPoint.y
							})
						}

					// return
						return curves
				} catch (error) {console.log(error)}
			}

		/* getSubdividedCurves */
			function getSubdividedCurves(curves) {
				try {
					// group of groups of curves
						const newCurveGroups = []

					// temp
						let thisGroup = []

					// loop
						for (let c = 0; c < curves.length; c++) {
							thisGroup.push(curves[c])
							if (curves[c].z) {
								newCurveGroups.push(thisGroup)
								thisGroup = []
							}
						}

					// return
						return newCurveGroups
				} catch (error) {console.log(error)}
			}

	/** merges **/
		/* getMergeCurves */
			function getMergedCurves(itemA, itemB, operation, preventSubdivision, preventNonintersection) {
				try {
					// missing
						if (!itemA || !itemB) {
							return null
						}

					// get points of overlap
						let {aIntersectsB, bIntersectsA} = getIntersectionPoints(itemA, itemB)

					// filter out tangents
						if (aIntersectsB !== true) {
							aIntersectsB = aIntersectsB.filter(intersection => intersection.type !== "tangent")
						}
						if (bIntersectsA !== true) {
							bIntersectsA = bIntersectsA.filter(intersection => intersection.type !== "tangent")
						}

					// only overlap
						if (preventNonintersection && (
							(aIntersectsB !== true && !aIntersectsB.length) && 
							(bIntersectsA !== true && !bIntersectsA.length)
						)) {
							return null
						}

					// get new curves
						if (aIntersectsB !== true && aIntersectsB.length) {
							itemA.attributes.curves = splitCurvesAtIntersections(itemA, aIntersectsB)
						}
						if (bIntersectsA !== true && bIntersectsA.length) {
							itemB.attributes.curves = splitCurvesAtIntersections(itemB, bIntersectsA)
						}

					// operation: identify
						if (operation == "identify") {
							// re-Zify
								itemA.attributes.curves = getMtoZCurves(itemA.attributes.curves)
								itemB.attributes.curves = getMtoZCurves(itemB.attributes.curves)

							// update paths
								itemA.attributes.coordinates.d = getPathFromCommands(getCommandsFromCurves(itemA.attributes.curves))
								itemB.attributes.coordinates.d = getPathFromCommands(getCommandsFromCurves(itemB.attributes.curves))

							// svg
								itemA.listing.coordinates = buildItemCoordinates(itemA)
								itemA.svg = buildItemSVG(itemA)
								itemB.listing.coordinates = buildItemCoordinates(itemB)
								itemB.svg = buildItemSVG(itemB)
								return
						}

					// turn Z into C
						let aCurves = getZtoCCurves(duplicateObject(itemA.attributes.curves))
						let bCurves = getZtoCCurves(duplicateObject(itemB.attributes.curves))

					// make positive
						if (getSignedArea(aCurves) < 0) {
							aCurves = getReversedCurves(aCurves, aIntersectsB)
						}
						if (getSignedArea(bCurves) < 0) {
							bCurves = getReversedCurves(bCurves, bIntersectsA)
						}

					// subdivide (on M)
						const aItems = !preventSubdivision && aCurves.filter(curve => curve.c1x == undefined && curve.c2x == undefined).length > 1 ?
							subdivideItem({target: itemA.listing.summary.subdivideButton}) : [itemA]
						const bItems = !preventSubdivision && bCurves.filter(curve => curve.c1x == undefined && curve.c2x == undefined).length > 1 ?
							subdivideItem({target: itemB.listing.summary.subdivideButton}) : [itemB]

					// get new curves
						let result = (operation == "union")     ? getUnionMultishapeCurves(    aItems, bItems, aCurves, bCurves, aIntersectsB, bIntersectsA) :
									 (operation == "intersect") ? getIntersectMultishapeCurves(aItems, bItems, aCurves, bCurves, aIntersectsB, bIntersectsA) :
									 (operation == "combine")   ? getCombineMultishapeCurves(  aItems, bItems, aCurves, bCurves, aIntersectsB, bIntersectsA) :
									 (operation == "subtract")  ? getSubtractMultishapeCurves( aItems, bItems, aCurves, bCurves, aIntersectsB, bIntersectsA) :
									 null

					// invalid operation
						if (!result) {
							return
						}

					// non-empty object
						if (result.id) {
							// remove itemA & itemB
								deleteItem({target: itemA.listing.container})
								deleteItem({target: itemB.listing.container})

							// return
								return result
						}

					// non-empty array
						if (Array.isArray(result)) {
							// new curves
								let newCurves = result

							// styling
								const styling = {
									shape: "curves",
									stroke: itemA.attributes.styling.stroke,
									"stroke-width": itemA.attributes.styling["stroke-width"],
									"stroke-linecap": itemA.attributes.styling["stroke-linecap"],
									"stroke-linejoin": itemA.attributes.styling["stroke-linejoin"],
									"fill-on": itemA.attributes.styling["fill-on"],
									fill: itemA.attributes.styling.fill
								}

							// remove itemA & itemB
								deleteItem({target: itemA.listing.container})
								deleteItem({target: itemB.listing.container})

							// empty array
								if (!result.length) {
									return null
								}

							// make positive
								if (getSignedArea(newCurves) < 0) {
									newCurves = getReversedCurves(newCurves)
								}

							// re-Z-ify
								newCurves = getMtoZCurves(newCurves)

							// insert new item
								const newItem = addItem({
									itemData: {
										attributes: {
											styling: styling,
											coordinates: {d: getPathFromCommands(getCommandsFromCurves(newCurves))},
											curves: newCurves
										}
									}
								})

							// return new item
								return newItem
						}

					// nothing
						return null
				} catch (error) {console.log(error)}
			}

		/* getUnionMultishapeCurves */
			function getUnionMultishapeCurves(aItems, bItems, aCurves, bCurves, aIntersectsB, bIntersectsA) {
				try {
					// no subdivisions
						if (aItems.length == 1 && bItems.length == 1) {
							return getUnionCurves(aCurves, bCurves, aIntersectsB, bIntersectsA)
						}

					// union multiple shapes
					// get CW vs. CCW
						const aItemsNegative = []
						const aItemsPositive = []
						for (const a in aItems) {
							if (getSignedArea(aItems[a].attributes.curves) < 0) {
								aItemsNegative.push(aItems[a])
							}
							else {
								aItemsPositive.push(aItems[a])
							}
						}

						const bItemsNegative = []
						const bItemsPositive = []
						for (const b in bItems) {
							if (getSignedArea(bItems[b].attributes.curves) < 0) {
								bItemsNegative.push(bItems[b])
							}
							else {
								bItemsPositive.push(bItems[b])
							}
						}

					// subtract each aNegative - each bPositive
						for (const a in aItemsNegative) {
							for (const b in bItemsPositive) {
								const bItemCopy = addItem({
									itemData: {
										attributes: duplicateObject(bItemsPositive[b].attributes)
									}
								})
								aItemsNegative[a] = getMergedCurves(aItemsNegative[a], bItemCopy, "subtract", true)
							}
						}

					// subtract each bNegative - each aPositive
						for (const b in bItemsNegative) {
							for (const a in aItemsPositive) {
								const aItemCopy = addItem({
									itemData: {
										attributes: duplicateObject(aItemsPositive[a].attributes)
									}
								})
								bItemsNegative[b] = getMergedCurves(bItemsNegative[b], aItemCopy, "subtract", true)
							}
						}

					// combine all CCW items into one array
						let allItemsPositive = [...aItemsPositive, ...bItemsPositive]

					// loop through array of CCW, checking for overlap between each pair
					// if there's overlap, union them into one item and reset the loop
						let aIndex = 0
						outerLoopCCW: while (aIndex < allItemsPositive.length - 1) {
							let bIndex = aIndex + 1
							innerLoopCCW: while (bIndex < allItemsPositive.length) {
								const interimItem = getMergedCurves(allItemsPositive[aIndex], allItemsPositive[bIndex], "union", true, true)
								if (interimItem) {
									allItemsPositive.splice(aIndex, 1, interimItem)
									allItemsPositive.splice(bIndex, 1)
									aIndex = 0
									continue outerLoopCCW
								}
								bIndex++
							}
							aIndex++
						}

					// if we get through the loop, naive union whatever's left (they can't possibly overlap) into one item
						allItemsPositive = allItemsPositive.filter(item => item !== null)
						while (allItemsPositive.length > 1) {
							allItemsPositive[0] = getMergedCurves(allItemsPositive[0], allItemsPositive[1], "union", true)
							allItemsPositive.splice(1, 1)
						}
						let interimItemPositive = allItemsPositive[0]

					// combine all CW items into one array
						const allItemsNegative = [...aItemsNegative, ...bItemsNegative]
							
					// for each of the CW items, subtract it from the one item
						while (allItemsNegative.length) {
							interimItemPositive = getMergedCurves(interimItemPositive, allItemsNegative[0], "subtract", true)
							allItemsNegative.splice(0, 1)
						}

					// return remainder
						return interimItemPositive
				} catch (error) {console.log(error)}
			}

		/* getIntersectMultishapeCurves */
			function getIntersectMultishapeCurves(aItems, bItems, aCurves, bCurves, aIntersectsB, bIntersectsA) {
				try {
					// no subdivisions
						if (aItems.length == 1 && bItems.length == 1) {
							return getIntersectCurves(aCurves, bCurves, aIntersectsB, bIntersectsA)
						}

					// intersect multiple shapes
					// get CW vs. CCW
						const aItemsNegative = []
						const aItemsPositive = []
						for (const a in aItems) {
							if (getSignedArea(aItems[a].attributes.curves) < 0) {
								aItemsNegative.push(aItems[a])
							}
							else {
								aItemsPositive.push(aItems[a])
							}
						}

						const bItemsNegative = []
						const bItemsPositive = []
						for (const b in bItems) {
							if (getSignedArea(bItems[b].attributes.curves) < 0) {
								bItemsNegative.push(bItems[b])
							}
							else {
								bItemsPositive.push(bItems[b])
							}
						}

					// make copies of each aItem and bItem so we can pair them up (a, b ==> ab, ab)
						const positiveItemSets = []
						for (const a in aItemsPositive) {
							const aSetOfBs = []

							for (const b in bItemsPositive) {
								const aItemCopy = addItem({
									itemData: {
										attributes: duplicateObject(aItemsPositive[a].attributes)
									}
								})
								const bItemCopy = addItem({
									itemData: {
										attributes: duplicateObject(bItemsPositive[b].attributes)
									}
								})
								aSetOfBs.push({a: aItemCopy, b: bItemCopy})
							}
							
							positiveItemSets.push(aSetOfBs)
						}

					// delete originals
						for (const a in aItemsPositive) {
							deleteItem({target: aItemsPositive[a].listing.container})
						}
						for (const b in bItemsPositive) {
							deleteItem({target: bItemsPositive[b].listing.container})
						}

					// build a list of intersects for each pair
						for (const i in positiveItemSets) {
							const aSetOfBs = positiveItemSets[i]
							for (const j in aSetOfBs) {
								const pair = aSetOfBs[j]
								pair.intersect = getMergedCurves(pair.a, pair.b, "intersect", true, true) || null
								if (!pair.intersect) {
									deleteItem({target: pair.a.listing.container})
									deleteItem({target: pair.b.listing.container})
								}
							}
						}

					// naive union all of those (they can't possibly overlap) into one item
						let allInterimItemsPositive = positiveItemSets.map(aSetofBs => aSetofBs.map(pair => pair.intersect)).flat().filter(intersect => intersect !== null) || []
						allInterimItemsPositive = allInterimItemsPositive.filter(item => item !== null)

						while (allInterimItemsPositive.length > 1) {
							allInterimItemsPositive[0] = getMergedCurves(allInterimItemsPositive[0], allInterimItemsPositive[1], "union", true)
							allInterimItemsPositive.splice(1, 1)
						}
						let interimItemPositive = allInterimItemsPositive[0]
					
					// combine all the CW items into one array
						const allItemsNegative  = [...aItemsNegative, ...bItemsNegative]

					// for each of the CW items, subtract it from the one item
						while (allItemsNegative.length) {
							interimItemPositive = getMergedCurves(interimItemPositive, allItemsNegative[0], "subtract", true)
							allItemsNegative.splice(0, 1)
						}

					// return remainder
						return interimItemPositive
				} catch (error) {console.log(error)}
			}

		/* getCombineMultishapeCurves */
			function getCombineMultishapeCurves(aItems, bItems, aCurves, bCurves, aIntersectsB, bIntersectsA) {
				try {
					// no subdivisions
						if (aItems.length == 1 && bItems.length == 1) {
							return getCombineCurves(aCurves, bCurves, aIntersectsB, bIntersectsA)
						}

					// combine multiple shapes
					// duplicate
						const aItemsDuplicates = []
						for (const a in aItems) {
							aItemsDuplicates.push(addItem({
								itemData: {
									attributes: duplicateObject(aItems[a].attributes)
								}
							}))
						}

						const bItemsDuplicates = []
						for (const b in bItems) {
							bItemsDuplicates.push(addItem({
								itemData: {
									attributes: duplicateObject(bItems[b].attributes)
								}
							}))
						}

					// combine is the sum of the subtractions
						const aSubtractBItem = getSubtractMultishapeCurves(aItems, bItems)
						const bSubtractAItem = getSubtractMultishapeCurves(bItemsDuplicates, aItemsDuplicates)
					
					// naive union
						const interimItemCurves = aSubtractBItem && bSubtractAItem ? [...aSubtractBItem.attributes.curves, ...bSubtractAItem.attributes.curves] :
												  aSubtractBItem ? aSubtractBItem.attributes.curves :
												  bSubtractAItem ? bSubtractAItem.attributes.curves :
												  []

					// delete interims
						if (aSubtractBItem) {
							deleteItem({target: aSubtractBItem.listing.container})
						}
						if (bSubtractAItem) {
							deleteItem({target: bSubtractAItem.listing.container})
						}

					// return
						return interimItemCurves
				} catch (error) {console.log(error)}
			}

		/* getSubtractMultishapeCurves */
			function getSubtractMultishapeCurves(aItems, bItems, aCurves, bCurves, aIntersectsB, bIntersectsA) {
				try {
					// no subdivisions
						if (aItems.length == 1 && bItems.length == 1) {
							return getSubtractCurves(aCurves, bCurves, aIntersectsB, bIntersectsA)
						}

					// subtract multiple shapes
					// get CW vs. CCW
						const aItemsNegative = []
						const aItemsPositive = []
						for (const a in aItems) {
							if (getSignedArea(aItems[a].attributes.curves) < 0) {
								aItemsNegative.push(aItems[a])
							}
							else {
								aItemsPositive.push(aItems[a])
							}
						}

						const bItemsNegative = []
						const bItemsPositive = []
						for (const b in bItems) {
							if (getSignedArea(bItems[b].attributes.curves) < 0) {
								bItemsNegative.push(bItems[b])
							}
							else {
								bItemsPositive.push(bItems[b])
							}
						}

					// for each positive A, intersect each negative B
						let interimItems = []
						if (bItemsNegative.length) {
							for (const a in aItemsPositive) {
								let aItemCopy = addItem({
									itemData: {
										attributes: duplicateObject(aItemsPositive[a].attributes)
									}
								})
								bLoop: for (const b in bItemsNegative) {
									const bItemCopy = addItem({
										itemData: {
											attributes: duplicateObject(bItemsNegative[b].attributes)
										}
									})
									aItemCopy = getMergedCurves(aItemCopy, bItemCopy, "intersect", true)
									if (!aItemCopy) {
										break bLoop
									}
								}
								if (aItemCopy) {
									interimItems.push(aItemCopy)
								}
							}
						}

					// for each positive A, subtract each positive B
						for (const a in aItemsPositive) {
							let aItemCopy = addItem({
								itemData: {
									attributes: duplicateObject(aItemsPositive[a].attributes)
								}
							})
							bLoop: for (const b in bItemsPositive) {
								const bItemCopy = addItem({
									itemData: {
										attributes: duplicateObject(bItemsPositive[b].attributes)
									}
								})
								aItemCopy = getMergedCurves(aItemCopy, bItemCopy, "subtract", true)
								if (!aItemCopy) {
									break bLoop
								}
							}
							if (aItemCopy) {
								interimItems.push(aItemCopy)
							}
						}

					// delete originals
						for (const b in bItems) {
							deleteItem({target: bItems[b].listing.container})
						}

					// for each interimItem, subtract each negative A
						for (const i in interimItems) {
							if (interimItems[i]) {
								for (const a in aItemsNegative) {
									const aItemCopy = addItem({
										itemData: {
											attributes: duplicateObject(aItemsNegative[a].attributes)
										}
									})
									interimItems[i] = getMergedCurves(interimItems[i], aItemCopy, "subtract", true)
								}
							}
						}

					// delete originals
						for (const a in aItems) {
							deleteItem({target: aItems[a].listing.container})
						}

					// naive union
						interimItems = interimItems.filter(item => item !== null)
						while (interimItems.length > 1) {
							interimItems[0] = getMergedCurves(interimItems[0], interimItems[1], "union", true)
							interimItems.splice(1, 1)
						}
						let interimItemPositive = interimItems[0]

					// return remainder
						return interimItemPositive
				} catch (error) {console.log(error)}
			}

		/* getUnionCurves */
			function getUnionCurves(aCurves, bCurves, aIntersectsB, bIntersectsA) {
				try {
					// empty new curves
						const newCurves = []

					// a entirely within b --> b
						if (aIntersectsB === true) {
							return bCurves
						}

					// b entirely within a --> a
						if (bIntersectsA === true) {
							return aCurves
						}

					// no overlap or intersections --> naive union
						if (!aIntersectsB.length || !bIntersectsA.length) {
							return [
								...aCurves,
								...bCurves
							]
						}

					// A: keep first enters, keep last leaves
						for (let a = 0; a < aIntersectsB.length; a++) {
							if (aIntersectsB[a].type == "enter" && aIntersectsB[a + 1]?.type == "enter") {
								aIntersectsB.splice(a + 1, 1)
							}
							else if (aIntersectsB[a].type == "leave" && aIntersectsB[a + 1]?.type == "leave") {
								aIntersectsB.splice(a, 1)
								a--
							}
						}

					// B: keep first leaves, keep last enters
						for (let b = 0; b < bIntersectsA.length; b++) {
							if (bIntersectsA[b].type == "leave" && bIntersectsA[b + 1]?.type == "leave") {
								bIntersectsA.splice(b + 1, 1)
							}
							else if (bIntersectsA[b].type == "enter" && bIntersectsA[b + 1]?.type == "enter") {
								bIntersectsA.splice(b, 1)
								b--
							}
						}

					// find first point where a leaves b
						let aIntersectsBIndex = aIntersectsB.findIndex(intersection => intersection.type == "leave")
						if (aIntersectsBIndex == -1) {
							return null
						}
						let aLeavesB = aIntersectsB[aIntersectsBIndex]
							aLeavesB.reached = true

					// start there
						const start = {
							x: aLeavesB.x,
							y: aLeavesB.y
						}
						const coordinates = {
							x: aLeavesB.x,
							y: aLeavesB.y
						}
						newCurves.push({
							x: aLeavesB.x,
							y: aLeavesB.y
						})

					// loop around
						let attempts = CONSTANTS.loopAttempts
						do {
							attempts--

							// find a curve that ends at coordinates
								let aCurveIndex = aCurves.findIndex(curve => getScalar(curve, coordinates) < CONSTANTS.mergeThreshold)
								if (aCurveIndex == -1) {
									return null
								}

							// pick up after
								aCurveIndex += 1

							// find where A enters B
								const aIntersectsBIndexPrevious = aIntersectsBIndex
								aIntersectsBIndex = aIntersectsB.slice(aIntersectsBIndex).findIndex(intersection => intersection.type == "enter")
								if (aIntersectsBIndex == -1) {
									aIntersectsBIndex = aIntersectsB.slice(0, aIntersectsBIndex).findIndex(intersection => intersection.type == "enter")
								}
								else {
									aIntersectsBIndex += aIntersectsBIndexPrevious
								}
								if (aIntersectsBIndex == -1) {
									return null
								}
								const aEntersB = aIntersectsB[aIntersectsBIndex]

							// until then, take curves
								while (coordinates.x !== aEntersB.x || coordinates.y !== aEntersB.y) {
									newCurves.push(aCurves[aCurveIndex])
									coordinates.x = aCurves[aCurveIndex].x
									coordinates.y = aCurves[aCurveIndex].y
									aCurveIndex += 1
									if (aCurveIndex >= aCurves.length) {
										aCurveIndex = 0
									}
								}
								aEntersB.reached = true

							// find equivalent intersection in bIntersectsA
								let bIntersectsAIndex = bIntersectsA.findIndex(intersection => getScalar(intersection, coordinates) < CONSTANTS.mergeThreshold)
								if (bIntersectsAIndex == -1) {
									return null
								}
								const bLeavesA = bIntersectsA[bIntersectsAIndex]
									bLeavesA.reached = true

							// continue from there (even though it may be slightly off)
								coordinates.x = bLeavesA.x
								coordinates.y = bLeavesA.y

							// find b curve that ends there
								let bCurveIndex = bCurves.findIndex(curve => getScalar(curve, coordinates) < CONSTANTS.mergeThreshold)
								if (bCurveIndex == -1) {
									return null
								}

							// pick up after
								bCurveIndex += 1

							// find where B enters A
								const bIntersectsAIndexPrevious = bIntersectsAIndex
								bIntersectsAIndex = bIntersectsA.slice(bIntersectsAIndex).findIndex(intersection => intersection.type == "enter")
								if (bIntersectsAIndex == -1) {
									bIntersectsAIndex = bIntersectsA.slice(0, bIntersectsAIndex).findIndex(intersection => intersection.type == "enter")
								}
								else {
									bIntersectsAIndex += bIntersectsAIndexPrevious
								}
								if (bIntersectsAIndex == -1) {
									return null
								}
								const bEntersA = bIntersectsA[bIntersectsAIndex]

							// until then, take curves
								while (coordinates.x !== bEntersA.x || coordinates.y !== bEntersA.y) {
									newCurves.push(bCurves[bCurveIndex])
									coordinates.x = bCurves[bCurveIndex].x
									coordinates.y = bCurves[bCurveIndex].y
									bCurveIndex += 1
									if (bCurveIndex >= bCurves.length) {
										bCurveIndex = 0
									}
								}
								bEntersA.reached = true

							// find equivalent intersection in aIntersectsB
								aIntersectsBIndex = aIntersectsB.findIndex(intersection => getScalar(intersection, coordinates) < CONSTANTS.mergeThreshold)
								if (aIntersectsBIndex == -1) {
									return null
								}
								aLeavesB = aIntersectsB[aIntersectsBIndex]

							// not reached
								if (!aLeavesB.reached) {
									aLeavesB.reached = true
								}

							// already reached --> jump to another one
								else {
									aIntersectsBIndex = aIntersectsB.findIndex(intersection => !intersection.reached && intersection.type == "leave")
									if (aIntersectsBIndex == -1) {
										break
									}
									aLeavesB = aIntersectsB[aIntersectsBIndex]
									aLeavesB.reached = true

									// close off this subshape
										newCurves.push({
											z: true,
											zx: start.x,
											zy: start.y
										})

									// start next subshape
										start.x = coordinates.x = aLeavesB.x
										start.y = coordinates.y = aLeavesB.y
										newCurves.push({
											x: start.x,
											y: start.y
										})
								}
						}

					// back where we started?
						while (attempts && (aIntersectsB.find(intersection => !intersection.reached) || bIntersectsA.find(intersection => !intersection.reached)))

					// Z
						newCurves.push({
							z: true,
							zx: start.x,
							zy: start.y
						})

					// remove redundant curves
						const filteredCurves = newCurves.filter((newCurve, newCurveIndex) => newCurve.z || newCurve.x !== newCurves[newCurveIndex - 1]?.x || newCurve.y !== newCurves[newCurveIndex - 1]?.y)

					// return
						return filteredCurves
				} catch (error) {console.log(error)}
			}

		/* getIntersectCurves */
			function getIntersectCurves(aCurves, bCurves, aIntersectsB, bIntersectsA) {
				try {
					// empty new curves
						const newCurves = []

					// a entirely within b --> a
						if (aIntersectsB === true) {
							return aCurves
						}

					// b entirely within a --> b
						if (bIntersectsA === true) {
							return bCurves
						}

					// no overlap or intersections --> empty
						if (!aIntersectsB.length || !bIntersectsA.length) {
							return []
						}

					// A: keep first enters, keep last leaves
						for (let a = 0; a < aIntersectsB.length; a++) {
							if (aIntersectsB[a].type == "enter" && aIntersectsB[a + 1]?.type == "enter") {
								aIntersectsB.splice(a + 1, 1)
							}
							else if (aIntersectsB[a].type == "leave" && aIntersectsB[a + 1]?.type == "leave") {
								aIntersectsB.splice(a, 1)
								a--
							}
						}

					// B: keep first leaves, keep last enters
						for (let b = 0; b < bIntersectsA.length; b++) {
							if (bIntersectsA[b].type == "leave" && bIntersectsA[b + 1]?.type == "leave") {
								bIntersectsA.splice(b + 1, 1)
							}
							else if (bIntersectsA[b].type == "enter" && bIntersectsA[b + 1]?.type == "enter") {
								bIntersectsA.splice(b, 1)
								b--
							}
						}

					// find first point where a enters b
						let aIntersectsBIndex = aIntersectsB.findIndex(intersection => intersection.type == "enter")
						if (aIntersectsBIndex == -1) {
							return null
						}
						let aEntersB = aIntersectsB[aIntersectsBIndex]
							aEntersB.reached = true

					// start there
						const start = {
							x: aEntersB.x,
							y: aEntersB.y
						}
						const coordinates = {
							x: aEntersB.x,
							y: aEntersB.y
						}
						newCurves.push({
							x: aEntersB.x,
							y: aEntersB.y
						})

					// loop around
						let attempts = CONSTANTS.loopAttempts
						do {
							attempts--

							// find a curve that ends at coordinates
								let aCurveIndex = aCurves.findIndex(curve => getScalar(curve, coordinates) < CONSTANTS.mergeThreshold)
								if (aCurveIndex == -1) {
									return null
								}

							// pick up after
								aCurveIndex += 1

							// find where A leaves B
								const aIntersectsBIndexPrevious = aIntersectsBIndex
								aIntersectsBIndex = aIntersectsB.slice(aIntersectsBIndex).findIndex(intersection => intersection.type == "leave")
								if (aIntersectsBIndex == -1) {
									aIntersectsBIndex = aIntersectsB.slice(0, aIntersectsBIndex).findIndex(intersection => intersection.type == "leave")
								}
								else {
									aIntersectsBIndex += aIntersectsBIndexPrevious
								}
								if (aIntersectsBIndex == -1) {
									return null
								}
								const aLeavesB = aIntersectsB[aIntersectsBIndex]

							// until then, take curves
								while (coordinates.x !== aLeavesB.x || coordinates.y !== aLeavesB.y) {
									newCurves.push(aCurves[aCurveIndex])
									coordinates.x = aCurves[aCurveIndex].x
									coordinates.y = aCurves[aCurveIndex].y
									aCurveIndex += 1
									if (aCurveIndex >= aCurves.length) {
										aCurveIndex = 0
									}
								}
								aLeavesB.reached = true

							// find equivalent intersection in bIntersectsA
								let bIntersectsAIndex = bIntersectsA.findIndex(intersection => getScalar(intersection, coordinates) < CONSTANTS.mergeThreshold)
								if (bIntersectsAIndex == -1) {
									return null
								}
								const bEntersA = bIntersectsA[bIntersectsAIndex]
									bEntersA.reached = true

							// continue from there (even though it may be slightly off)
								coordinates.x = bEntersA.x
								coordinates.y = bEntersA.y

							// find b curve that ends there
								let bCurveIndex = bCurves.findIndex(curve => getScalar(curve, coordinates) < CONSTANTS.mergeThreshold)
								if (bCurveIndex == -1) {
									return null
								}

							// pick up after
								bCurveIndex += 1

							// find where B leaves A
								const bIntersectsAIndexPrevious = bIntersectsAIndex
								bIntersectsAIndex = bIntersectsA.slice(bIntersectsAIndex).findIndex(intersection => intersection.type == "leave")
								if (bIntersectsAIndex == -1) {
									bIntersectsAIndex = bIntersectsA.slice(0, bIntersectsAIndex).findIndex(intersection => intersection.type == "leave")
								}
								else {
									bIntersectsAIndex += bIntersectsAIndexPrevious
								}
								if (bIntersectsAIndex == -1) {
									return null
								}
								const bLeavesA = bIntersectsA[bIntersectsAIndex]

							// until then, take curves
								while (coordinates.x !== bLeavesA.x || coordinates.y !== bLeavesA.y) {
									newCurves.push(bCurves[bCurveIndex])
									coordinates.x = bCurves[bCurveIndex].x
									coordinates.y = bCurves[bCurveIndex].y
									bCurveIndex += 1
									if (bCurveIndex >= bCurves.length) {
										bCurveIndex = 0
									}
								}
								bLeavesA.reached = true

							// find equivalent intersection in aIntersectsB
								aIntersectsBIndex = aIntersectsB.findIndex(intersection => getScalar(intersection, coordinates) < CONSTANTS.mergeThreshold)
								if (aIntersectsBIndex == -1) {
									return null
								}
								aEntersB = aIntersectsB[aIntersectsBIndex]

							// not reached
								if (!aEntersB.reached) {
									aEntersB.reached = true
								}

							// already reached --> jump to another one
								else {
									aIntersectsBIndex = aIntersectsB.findIndex(intersection => !intersection.reached && intersection.type == "enter")
									if (aIntersectsBIndex == -1) {
										break
									}
									aEntersB = aIntersectsB[aIntersectsBIndex]
									aEntersB.reached = true

									// close off this subshape
										newCurves.push({
											z: true,
											zx: start.x,
											zy: start.y
										})

									// start next subshape
										start.x = coordinates.x = aEntersB.x
										start.y = coordinates.y = aEntersB.y
										newCurves.push({
											x: start.x,
											y: start.y
										})
								}
						}

					// back where we started?
						while (attempts && (aIntersectsB.find(intersection => !intersection.reached) || bIntersectsA.find(intersection => !intersection.reached)))

					// Z
						newCurves.push({
							z: true,
							zx: start.x,
							zy: start.y
						})

					// remove redundant curves
						const filteredCurves = newCurves.filter((newCurve, newCurveIndex) => newCurve.z || newCurve.x !== newCurves[newCurveIndex - 1]?.x || newCurve.y !== newCurves[newCurveIndex - 1]?.y)

					// return
						return filteredCurves
				} catch (error) {console.log(error)}
			}

		/* getCombineCurves */
			function getCombineCurves(aCurves, bCurves, aIntersectsB, bIntersectsA) {
				try {
					// combine is the sum of the subtractions
						const aSubtractBCurves = getSubtractCurves(
							duplicateObject(aCurves), 
							duplicateObject(bCurves),
							duplicateObject(aIntersectsB),
							duplicateObject(bIntersectsA)
						) || []
						const bSubtractACurves = getSubtractCurves(
							duplicateObject(bCurves),
							duplicateObject(aCurves),
							duplicateObject(bIntersectsA),
							duplicateObject(aIntersectsB)
						) || []

					// concatenate
						return [...aSubtractBCurves, ...bSubtractACurves]
				} catch (error) {console.log(error)}
			}

		/* getSubtractCurves */
			function getSubtractCurves(aCurves, bCurves, aIntersectsB, bIntersectsA) {
				try {
					// empty new curves
						const newCurves = []

					// reverse a
						aCurves = getReversedCurves(aCurves)

					// a entirely within b --> empty
						if (aIntersectsB === true) {
							return []
						}

					// b entirely within a --> naive union
						if (bIntersectsA === true) {
							return [
								...aCurves,
								...bCurves
							]
						}

					// no overlap or intersections --> a
						if (!aIntersectsB.length || !bIntersectsA.length) {
							return aCurves
						}

					// A: keep first enters, keep last leaves
						for (let a = 0; a < aIntersectsB.length; a++) {
							if (aIntersectsB[a].type == "enter" && aIntersectsB[a + 1]?.type == "enter") {
								aIntersectsB.splice(a + 1, 1)
							}
							else if (aIntersectsB[a].type == "leave" && aIntersectsB[a + 1]?.type == "leave") {
								aIntersectsB.splice(a, 1)
								a--
							}
						}

					// B: keep first leaves, keep last enters
						for (let b = 0; b < bIntersectsA.length; b++) {
							if (bIntersectsA[b].type == "leave" && bIntersectsA[b + 1]?.type == "leave") {
								bIntersectsA.splice(b + 1, 1)
							}
							else if (bIntersectsA[b].type == "enter" && bIntersectsA[b + 1]?.type == "enter") {
								bIntersectsA.splice(b, 1)
								b--
							}
						}

					// reverse intersections
						aIntersectsB.reverse()
						for (const a in aIntersectsB) {
							if (aIntersectsB[a].type == "leave") {
								aIntersectsB[a].type = "enter"
							}
							else if (aIntersectsB[a].type == "enter") {
								aIntersectsB[a].type = "leave"
							}
						}

					// find first point where a leaves b
						let aIntersectsBIndex = aIntersectsB.findIndex(intersection => intersection.type == "leave")
						if (aIntersectsBIndex == -1) {
							return null
						}
						let aLeavesB = aIntersectsB[aIntersectsBIndex]
							aLeavesB.reached = true

					// start there
						const start = {
							x: aLeavesB.x,
							y: aLeavesB.y
						}
						const coordinates = {
							x: aLeavesB.x,
							y: aLeavesB.y
						}
						newCurves.push({
							x: aLeavesB.x,
							y: aLeavesB.y
						})

					// loop around
						let attempts = CONSTANTS.loopAttempts
						do {
							attempts--

							// find a curve that ends at coordinates
								let aCurveIndex = aCurves.findIndex(curve => getScalar(curve, coordinates) < CONSTANTS.mergeThreshold)
								if (aCurveIndex == -1) {
									return null
								}

							// pick up after
								aCurveIndex += 1

							// find where A enters B
								const aIntersectsBIndexPrevious = aIntersectsBIndex
								aIntersectsBIndex = aIntersectsB.slice(aIntersectsBIndex).findIndex(intersection => intersection.type == "enter")
								if (aIntersectsBIndex == -1) {
									aIntersectsBIndex = aIntersectsB.slice(0, aIntersectsBIndex).findIndex(intersection => intersection.type == "enter")
								}
								else {
									aIntersectsBIndex += aIntersectsBIndexPrevious
								}
								if (aIntersectsBIndex == -1) {
									return null
								}
								const aEntersB = aIntersectsB[aIntersectsBIndex]

							// until then, take curves
								while (coordinates.x !== aEntersB.x || coordinates.y !== aEntersB.y) {
									newCurves.push(aCurves[aCurveIndex])
									coordinates.x = aCurves[aCurveIndex].x
									coordinates.y = aCurves[aCurveIndex].y
									aCurveIndex += 1
									if (aCurveIndex >= aCurves.length) {
										aCurveIndex = 0
									}
								}
								aEntersB.reached = true

							// find equivalent intersection in bIntersectsA
								let bIntersectsAIndex = bIntersectsA.findIndex(intersection => getScalar(intersection, coordinates) < CONSTANTS.mergeThreshold)
								if (bIntersectsAIndex == -1) {
									return null
								}
								const bEntersA = bIntersectsA[bIntersectsAIndex]
									bEntersA.reached = true

							// continue from there (even though it may be slightly off)
								coordinates.x = bEntersA.x
								coordinates.y = bEntersA.y

							// find b curve that ends there
								let bCurveIndex = bCurves.findIndex(curve => getScalar(curve, coordinates) < CONSTANTS.mergeThreshold)
								if (bCurveIndex == -1) {
									return null
								}

							// pick up after
								bCurveIndex += 1

							// find where B leaves A
								const bIntersectsAIndexPrevious = bIntersectsAIndex
								bIntersectsAIndex = bIntersectsA.slice(bIntersectsAIndex).findIndex(intersection => intersection.type == "leave")
								if (bIntersectsAIndex == -1) {
									bIntersectsAIndex = bIntersectsA.slice(0, bIntersectsAIndex).findIndex(intersection => intersection.type == "leave")
								}
								else {
									bIntersectsAIndex += bIntersectsAIndexPrevious
								}
								if (bIntersectsAIndex == -1) {
									return null
								}
								const bLeavesA = bIntersectsA[bIntersectsAIndex]

							// until then, take curves
								while (coordinates.x !== bLeavesA.x || coordinates.y !== bLeavesA.y) {
									newCurves.push(bCurves[bCurveIndex])
									coordinates.x = bCurves[bCurveIndex].x
									coordinates.y = bCurves[bCurveIndex].y
									bCurveIndex += 1
									if (bCurveIndex >= bCurves.length) {
										bCurveIndex = 0
									}
								}
								bLeavesA.reached = true

							// find equivalent intersection in aIntersectsB
								aIntersectsBIndex = aIntersectsB.findIndex(intersection => getScalar(intersection, coordinates) < CONSTANTS.mergeThreshold)
								if (aIntersectsBIndex == -1) {
									return null
								}
								aLeavesB = aIntersectsB[aIntersectsBIndex]

							// already reached start, but there are still more?
								if (aLeavesB.reached && aIntersectsB.find(intersection => !intersection.reached)) {
									aIntersectsBIndex = aIntersectsB.findIndex(intersection => intersection.type == "leave" && !intersection.reached)
									if (aIntersectsBIndex == -1) {
										return null
									}
									aLeavesB = aIntersectsB[aIntersectsBIndex]

									newCurves.push({
										z: true,
										zx: coordinates.x,
										zy: coordinates.y
									})
									newCurves.push({
										x: aLeavesB.x,
										y: aLeavesB.y
									})
									start.x = coordinates.x = aLeavesB.x
									start.y = coordinates.y = aLeavesB.y
								}

							// set reached
								aLeavesB.reached = true
						}

					// back where we started?
						while (attempts && (aIntersectsB.find(intersection => !intersection.reached) || bIntersectsA.find(intersection => !intersection.reached)))

					// Z
						newCurves.push({
							z: true,
							zx: start.x,
							zy: start.y
						})

					// remove redundant curves
						const filteredCurves = newCurves.filter((newCurve, newCurveIndex) => newCurve.z || newCurve.x !== newCurves[newCurveIndex - 1]?.x || newCurve.y !== newCurves[newCurveIndex - 1]?.y)

					// return
						return filteredCurves
				} catch (error) {console.log(error)}
			}

	/** conversions **/
		/* getPathFromPrimitive */
			function getPathFromPrimitive(item) {
				try {
					// path
						if (item.attributes.styling.shape == "path") {
							return item.attributes.coordinates.d
						}

					// circle
						if (item.attributes.styling.shape == "circle") {
							const cx = roundNumber(Number(item.attributes.coordinates.cx))
							const cy = roundNumber(Number(item.attributes.coordinates.cy))
							const r  = roundNumber(Number(item.attributes.coordinates.r))

							return `M ${roundNumber(cx - r)} ${cy}\n` +
								`a ${r} ${r} 0 0 1  ${r} ${-r}\n` +
								`a ${r} ${r} 0 0 1  ${r}  ${r}\n` +
								`a ${r} ${r} 0 0 1 ${-r}  ${r}\n` +
								`a ${r} ${r} 0 0 1 ${-r} ${-r}\n` +
								`z`
						}

					// ellipse
						if (item.attributes.styling.shape == "ellipse") {
							const cx = roundNumber(Number(item.attributes.coordinates.cx))
							const cy = roundNumber(Number(item.attributes.coordinates.cy))
							const rx = roundNumber(Number(item.attributes.coordinates.rx))
							const ry = roundNumber(Number(item.attributes.coordinates.ry))

							return `M ${roundNumber(cx - rx)} ${cy}\n` +
								`a ${rx} ${ry} 0 0 1  ${rx} ${-ry}\n` +
								`a ${rx} ${ry} 0 0 1  ${rx}  ${ry}\n` +
								`a ${rx} ${ry} 0 0 1 ${-rx}  ${ry}\n` +
								`a ${rx} ${ry} 0 0 1 ${-rx} ${-ry}\n` +
								`z`
						}

					// rect
						if (item.attributes.styling.shape == "rect") {
							const x  = roundNumber(Number(item.attributes.coordinates.x))
							const y  = roundNumber(Number(item.attributes.coordinates.y))
							const w  = roundNumber(Number(item.attributes.coordinates.width))
							const h  = roundNumber(Number(item.attributes.coordinates.height))
							const rx = roundNumber(Number(item.attributes.coordinates.rx))
							const ry = roundNumber(Number(item.attributes.coordinates.ry))

							if (rx == 0 && ry == 0) {
								return `M ${x} ${y}\n` +
									`l ${w} 0\n` +
									`l 0 ${h}\n` +
									`l ${-w} 0\n` +
									`l 0 ${-h}\n` +
									`z`
							}
							else {
								return `M ${roundNumber(x + rx)} ${y}\n` +
									`l ${roundNumber(w - 2 * rx)} 0\n` +
									`a ${rx} ${ry} 0 0 1 ${rx} ${ry}\n` +
									`l 0 ${roundNumber(h - 2 * ry)}\n` +
									`a ${rx} ${ry} 0 0 1 ${-rx} ${ry}\n` +
									`l ${roundNumber(-(w - 2 * rx))} 0\n` +
									`a ${rx} ${ry} 0 0 1 ${-rx} ${-ry}\n` +
									`l 0 ${roundNumber(-(h - 2 * ry))}\n` +
									`a ${rx} ${ry} 0 0 1 ${rx} ${-ry}\n` +
									`z`
							}
						}

					// polygon
						if (item.attributes.styling.shape == "polygon") {
							const numbers = item.attributes.coordinates.points.replace(/,/g, " ").replace(/\n/g, " ").replace(/\s+/g, " ").split(/\s/g)
							const startX = roundNumber(Number(numbers[0]))
							const startY = roundNumber(Number(numbers[1]))

							let d = `M ${startX} ${startY}\n`
							for (let i = 2; i < numbers.length; i += 2) {
								d += `l ${roundNumber(numbers[i] - numbers[i - 2])} ${roundNumber(numbers[i + 1] - numbers[i - 1])}\n`
							}
							d += `z`
							return d
						}

					// line
						if (item.attributes.styling.shape == "line") {
							const x1 = roundNumber(Number(item.attributes.coordinates.x1))
							const y1 = roundNumber(Number(item.attributes.coordinates.y1))
							const x2 = roundNumber(Number(item.attributes.coordinates.x2))
							const y2 = roundNumber(Number(item.attributes.coordinates.y2))
							
							return `M ${x1} ${y1}\n` +
								`l ${roundNumber(x2 - x1)} ${roundNumber(y2 - y1)}`
						}

					// polyline
						if (item.attributes.styling.shape == "polyline") {
							const numbers = item.attributes.coordinates.points.replace(/,/g, " ").replace(/\n/g, " ").replace(/\s+/g, " ").split(/\s/g)
							const startX = roundNumber(Number(numbers[0]))
							const startY = roundNumber(Number(numbers[1]))

							let d = `M ${startX} ${startY}\n`
							for (let i = 2; i < numbers.length; i += 2) {
								d += `l ${roundNumber(numbers[i] - numbers[i - 2])} ${roundNumber(numbers[i + 1] - numbers[i - 1])}\n`
							}
							return d
						}

					// unrecognized
						return ""
				} catch (error) {console.log(error)}
			}

		/* getCommandsFromPath */
			function getCommandsFromPath(path) {
				try {
					// split path
						const commands = []
						const pathComponents  = path.replace(/m/g, " m ").replace(/M/g, " M ")
													.replace(/l/g, " l ").replace(/L/g, " L ")
													.replace(/h/g, " h ").replace(/H/g, " H ")
													.replace(/v/g, " v ").replace(/V/g, " V ")
													.replace(/c/g, " c ").replace(/C/g, " C ")
													.replace(/s/g, " s ").replace(/S/g, " S ")
													.replace(/q/g, " q ").replace(/Q/g, " Q ")
													.replace(/t/g, " t ").replace(/T/g, " T ")
													.replace(/a/g, " a ").replace(/A/g, " A ")
													.replace(/z/g, " z ").replace(/Z/g, " Z ")
													.replace(/-/g, " -")
													.replace(/,/g,  " ").replace(/\n/g, " ")
													.replace(/\s+/g," ").trim().split(/\s/g)

					// build commands
						let thisCommand = ""
						let currentType = ""
						for (const i in pathComponents) {
							// new command
								if ((/[a-zA-Z]/).test(pathComponents[i])) {
									currentType = pathComponents[i]

									if (thisCommand.length) {
										commands.push(thisCommand)
									}
									thisCommand = pathComponents[i]
									continue
								}

							// limit reached
								if (thisCommand.split(/\s/g).length - 1 >= CONSTANTS.commandParameters[currentType.toLowerCase()]) {
									commands.push(thisCommand)
									thisCommand = currentType
								}

							// continue command
								thisCommand += ` ${pathComponents[i]}`
						}

					// final command
						if (thisCommand.length) {
							commands.push(thisCommand)
						}
					
					// return commands
						return commands
				} catch (error) {console.log(error)}
			}

		/* getPathFromCommands */
			function getPathFromCommands(commands) {
				try {
					return commands.join("\n")
				} catch (error) {console.log(error)}
			}

		/* getCurvesFromCommands */
			function getCurvesFromCommands(commands) {
				try {
					// empty curves
						const curves = []
						const coordinates = {x: null, y: null}
						const start       = {x: null, y: null}

					// loop through commands
						for (let c = 0; c < commands.length; c++) {
							// components
								const components = commands[c].split(/\s/g)

							// M
								if (components[0] == "M") {
									if (c && !curves[curves.length - 1].z) {
										curves.push({
											z: true,
											zx: start.x,
											zy: start.y
										})
									}

									curves.push({
										x: Number(components[1]),
										y: Number(components[2])
									})

									coordinates.x = Number(components[1])
									coordinates.y = Number(components[2])
									start.x       = coordinates.x
									start.y       = coordinates.y
								}

							// C
								else if (components[0] == "C") {
									curves.push({
										c1x: Number(components[1]),
										c1y: Number(components[2]),
										c2x: Number(components[3]),
										c2y: Number(components[4]),
										x: Number(components[5]),
										y: Number(components[6])
									})
									coordinates.x = Number(components[5])
									coordinates.y = Number(components[6])
								}

							// Z
								else if (components[0] == "Z") {
									if (!curves[curves.length - 1].z) {
										curves.push({
											z: true,
											zx: start.x,
											zy: start.y
										})
										coordinates.x = start.x
										coordinates.y = start.y
									}
								}

							// others
								else {
									throw new Error(`non-standard command: ${components[0]}`)
								}
						}

					// always end in Z
						if (!curves[curves.length - 1].z) {
							curves.push({
								z: true,
								zx: start.x,
								zy: start.y
							})
						}

					// return
						return curves
				} catch (error) {console.log(error)}
			}

		/* getCommandsFromCurves */
			function getCommandsFromCurves(curves) {
				try {
					// empty commands
						const commands = []

					// loop through curves
						for (let c = 0; c < curves.length; c++) {
							const curve = curves[c]

							// Z
								if (curve.z) {
									commands.push(`Z`)
								}

							// C
								else if (curve.c1x !== undefined) {
									commands.push(`C ${curve.c1x} ${curve.c1y} ${curve.c2x} ${curve.c2y} ${curve.x} ${curve.y}`)
								}

							// M
								else {
									commands.push(`M ${curve.x} ${curve.y}`)
								}
						}

					// return
						return commands
				} catch (error) {console.log(error)}
			}

		/* getAbsoluteCommands */
			function getAbsoluteCommands(commands) {
				try {
					// start
						const coordinates = {x: 0, y: 0}
						const shapeStart  = {x: 0, y: 0}

					// loop through commands
						for (let c = 0; c < commands.length; c++) {
							const components = commands[c].split(/\s/g)

							// m --> M
								if (components[0] == "M") {
									coordinates.x = roundNumber(Number(components[1]))
									coordinates.y = roundNumber(Number(components[2]))
									commands[c] = `M ${coordinates.x} ${coordinates.y}`

									shapeStart.x = coordinates.x
									shapeStart.y = coordinates.y
								}
								else if (components[0] == "m") {
									coordinates.x += roundNumber(Number(components[1]))
									coordinates.y += roundNumber(Number(components[2]))
									commands[c] = `M ${coordinates.x} ${coordinates.y}`

									shapeStart.x = coordinates.x
									shapeStart.y = coordinates.y
								}

							// h/H/v/V/l --> L
								else if (components[0] == "L") {
									coordinates.x = roundNumber(Number(components[1]))
									coordinates.y = roundNumber(Number(components[2]))
									commands[c] = `L ${coordinates.x} ${coordinates.y}`
								}
								else if (components[0] == "l") {
									coordinates.x += roundNumber(Number(components[1]))
									coordinates.y += roundNumber(Number(components[2]))
									commands[c] = `L ${coordinates.x} ${coordinates.y}`
								}

									else if (components[0] == "H") {
										coordinates.x = roundNumber(Number(components[1]))
										commands[c] = `L ${coordinates.x} ${coordinates.y}`
									}
									else if (components[0] == "h") {
										coordinates.x += roundNumber(Number(components[1]))
										commands[c] = `L ${coordinates.x} ${coordinates.y}`
									}

									else if (components[0] == "V") {
										coordinates.y = roundNumber(Number(components[1]))
										commands[c] = `L ${coordinates.x} ${coordinates.y}`
									}
									else if (components[0] == "v") {
										coordinates.y += roundNumber(Number(components[1]))
										commands[c] = `L ${coordinates.x} ${coordinates.y}`
									}

							// s/S/c --> C
								else if (components[0] == "C") {
									const controlX1 = roundNumber(Number(components[1]))
									const controlY1 = roundNumber(Number(components[2]))
									const controlX2 = roundNumber(Number(components[3]))
									const controlY2 = roundNumber(Number(components[4]))
									coordinates.x = roundNumber(Number(components[5]))
									coordinates.y = roundNumber(Number(components[6]))
									commands[c] = `C ${controlX1} ${controlY1} ${controlX2} ${controlY2} ${coordinates.x} ${coordinates.y}`
								}
								else if (components[0] == "c") {
									const controlX1 = roundNumber(coordinates.x + Number(components[1]))
									const controlY1 = roundNumber(coordinates.y + Number(components[2]))
									const controlX2 = roundNumber(coordinates.x + Number(components[3]))
									const controlY2 = roundNumber(coordinates.y + Number(components[4]))
									coordinates.x += roundNumber(Number(components[5]))
									coordinates.y += roundNumber(Number(components[6]))
									commands[c] = `C ${controlX1} ${controlY1} ${controlX2} ${controlY2} ${coordinates.x} ${coordinates.y}`
								}

									else if (components[0] == "S") {
										const previousCommand = commands[c - 1]?.split(/\s/g)
										const controlX1 = roundNumber((previousCommand?.[0] == "C") ? (2 * coordinates.x - Number(previousCommand[3])) : coordinates.x)
										const controlY1 = roundNumber((previousCommand?.[0] == "C") ? (2 * coordinates.y - Number(previousCommand[4])) : coordinates.y)
										const controlX2 = roundNumber(Number(components[1]))
										const controlY2 = roundNumber(Number(components[2]))
										coordinates.x = roundNumber(Number(components[3]))
										coordinates.y = roundNumber(Number(components[4]))
										commands[c] = `C ${controlX1} ${controlY1} ${controlX2} ${controlY2} ${coordinates.x} ${coordinates.y}`
									}
									else if (components[0] == "s") {
										const previousCommand = commands[c - 1]?.split(/\s/g)
										const controlX1 = roundNumber((previousCommand?.[0] == "C") ? (2 * coordinates.x - Number(previousCommand[3])) : coordinates.x)
										const controlY1 = roundNumber((previousCommand?.[0] == "C") ? (2 * coordinates.y - Number(previousCommand[4])) : coordinates.y)
										const controlX2 = roundNumber(coordinates.x + Number(components[1]))
										const controlY2 = roundNumber(coordinates.y + Number(components[2]))
										coordinates.x += roundNumber(Number(components[3]))
										coordinates.y += roundNumber(Number(components[4]))
										commands[c] = `C ${controlX1} ${controlY1} ${controlX2} ${controlY2} ${coordinates.x} ${coordinates.y}`
									}

							// t/T/q --> Q
								else if (components[0] == "Q") {
									const controlX = roundNumber(Number(components[1]))
									const controlY = roundNumber(Number(components[2]))
									coordinates.x = roundNumber(Number(components[3]))
									coordinates.y = roundNumber(Number(components[4]))
									commands[c] = `Q ${controlX} ${controlY} ${coordinates.x} ${coordinates.y}`
								}
								else if (components[0] == "q") {
									const controlX = roundNumber(coordinates.x + Number(components[1]))
									const controlY = roundNumber(coordinates.y + Number(components[2]))
									coordinates.x += roundNumber(Number(components[3]))
									coordinates.y += roundNumber(Number(components[4]))
									commands[c] = `Q ${controlX} ${controlY} ${coordinates.x} ${coordinates.y}`
								}

									else if (components[0] == "T") {
										const previousCommand = commands[c - 1]?.split(/\s/g)
										const controlX = roundNumber((previousCommand?.[0] == "Q") ? (2 * coordinates.x - Number(previousCommand[1])) : coordinates.x)
										const controlY = roundNumber((previousCommand?.[0] == "Q") ? (2 * coordinates.y - Number(previousCommand[2])) : coordinates.y)
										coordinates.x = roundNumber(Number(components[1]))
										coordinates.y = roundNumber(Number(components[2]))
										commands[c] = `Q ${controlX} ${controlY} ${coordinates.x} ${coordinates.y}`
									}
									else if (components[0] == "t") {
										const previousCommand = commands[c - 1]?.split(/\s/g)
										const controlX = roundNumber((previousCommand?.[0] == "Q") ? (2 * coordinates.x - Number(previousCommand[1])) : coordinates.x)
										const controlY = roundNumber((previousCommand?.[0] == "Q") ? (2 * coordinates.y - Number(previousCommand[2])) : coordinates.y)
										coordinates.x += roundNumber(Number(components[1]))
										coordinates.y += roundNumber(Number(components[2]))
										commands[c] = `Q ${controlX} ${controlY} ${coordinates.x} ${coordinates.y}`
									}

							// a --> A
								else if (components[0] == "A") {
									const rx = roundNumber(Number(components[1]))
									const ry = roundNumber(Number(components[2]))
									const rotation = roundNumber(Number(components[3]))
									const largeArcFlag = components[4]
									const sweepFlag = components[5]
									coordinates.x = roundNumber(Number(components[6]))
									coordinates.y = roundNumber(Number(components[7]))
									commands[c] = `A ${rx} ${ry} ${rotation} ${largeArcFlag} ${sweepFlag} ${coordinates.x} ${coordinates.y}`
								}
								else if (components[0] == "a") {
									const rx = roundNumber(Number(components[1]))
									const ry = roundNumber(Number(components[2]))
									const rotation = roundNumber(Number(components[3]))
									const largeArcFlag = components[4]
									const sweepFlag = components[5]
									coordinates.x += roundNumber(Number(components[6]))
									coordinates.y += roundNumber(Number(components[7]))
									commands[c] = `A ${rx} ${ry} ${rotation} ${largeArcFlag} ${sweepFlag} ${coordinates.x} ${coordinates.y}`
								}

							// z --> Z
								else if (components[0] == "Z") {
									coordinates.x = shapeStart.x
									coordinates.y = shapeStart.y
								}
								else if (components[0] == "z") {
									commands[c] = `Z`
									coordinates.x = shapeStart.x
									coordinates.y = shapeStart.y
								}
						}

					// return
						return commands
				} catch (error) {console.log(error)}
			}

		/* getSimplifiedCommands */
			function getSimplifiedCommands(commands) {
				try {
					// start
						const coordinates = {x: 0, y: 0}
						const shapeStart  = {x: 0, y: 0}
						const newCommands = []

					// loop through commands
						for (let c = 0; c < commands.length; c++) {
							const components = commands[c].split(/\s/g)

							// M
								if (components[0] == "M") {
									coordinates.x = Number(components[1])
									coordinates.y = Number(components[2])
									newCommands.push(`M ${coordinates.x} ${coordinates.y}`)
									shapeStart.x = coordinates.x
									shapeStart.y = coordinates.y
								}

							// L --> C
								else if (components[0] == "L") {
									const controlX1 = roundNumber(coordinates.x + (1 / 3) * (Number(components[1]) - coordinates.x))
									const controlY1 = roundNumber(coordinates.y + (1 / 3) * (Number(components[2]) - coordinates.y))
									const controlX2 = roundNumber(coordinates.x + (2 / 3) * (Number(components[1]) - coordinates.x))
									const controlY2 = roundNumber(coordinates.y + (2 / 3) * (Number(components[2]) - coordinates.y))
									coordinates.x = Number(components[1])
									coordinates.y = Number(components[2])
									newCommands.push(`C ${controlX1} ${controlY1} ${controlX2} ${controlY2} ${coordinates.x} ${coordinates.y}`)
								}

							// C
								else if (components[0] == "C") {
									const controlX1 = roundNumber(components[1])
									const controlY1 = roundNumber(components[2])
									const controlX2 = roundNumber(components[3])
									const controlY2 = roundNumber(components[4])
									coordinates.x = Number(components[5])
									coordinates.y = Number(components[6])
									newCommands.push(`C ${controlX1} ${controlY1} ${controlX2} ${controlY2} ${coordinates.x} ${coordinates.y}`)
								}

							// Q --> C
								else if (components[0] == "Q") {
									const controlX1 = roundNumber(coordinates.x + (2 / 3) * (Number(components[1]) - coordinates.x))
									const controlY1 = roundNumber(coordinates.y + (2 / 3) * (Number(components[2]) - coordinates.y))
									const controlX2 = roundNumber(Number(components[3]) + (2 / 3) * (Number(components[1]) - Number(components[3])))
									const controlY2 = roundNumber(Number(components[4]) + (2 / 3) * (Number(components[2]) - Number(components[4])))
									coordinates.x = roundNumber(Number(components[3]))
									coordinates.y = roundNumber(Number(components[4]))
									newCommands.push(`C ${controlX1} ${controlY1} ${controlX2} ${controlY2} ${coordinates.x} ${coordinates.y}`)
								}

							// A --> C
								else if (components[0] == "A") {
									const arcCommands = getCubicBezierFromElliptical(coordinates, commands[c])
									for (const a in arcCommands) {
										newCommands.push(arcCommands[a])
									}
									coordinates.x = Number(components[6])
									coordinates.y = Number(components[7])
								}

							// Z
								else if (components[0] == "Z") {
									coordinates.x = shapeStart.x
									coordinates.y = shapeStart.y
									newCommands.push(`Z`)
								}

							// others
								else {
									throw new Error(`non-standard command: ${components[0]}`)
								}
						}

					// return
						return newCommands
				} catch (error) {console.log(error)}
			}

		/* getPolygonPointsFromCurves */
			function getPolygonPointsFromCurves(curves) {
				try {
					// empty points
						const points = []

					// loop through curves
						for (let c = 0; c < curves.length; c++) {
							const curve = curves[c]
							if (curve.z) {
								continue
							}
							else {
								points.push(`${curve.x},${curve.y}`)
							}
						}

					// return
						return points.join("\n")
				} catch (error) {console.log(error)}
			}

	/** builds **/
		/* buildItemSVG */
			function buildItemSVG(item) {
				try {
					// remove existing item with id
						const oldElement = item.svg

					// element
						const svgElement = document.createElementNS("http://www.w3.org/2000/svg", item.attributes.styling.shape)
							svgElement.id = `svg${item.id}`
							svgElement.addEventListener(TRIGGERS.mousedown, selectItem)
							svgElement.addEventListener(TRIGGERS.doubleclick, doubleclickItem)
							if (item.attributes.visible) {
								svgElement.setAttribute("visible", true)
							}
							svgElement.setAttribute("stroke", item.attributes.styling.stroke)
							svgElement.setAttribute("stroke-width", item.attributes.styling["stroke-width"])

							if (["rect", "polygon", "polyline", "path"].includes(item.attributes.styling.shape)) {
								svgElement.setAttribute("stroke-linejoin", item.attributes.styling["stroke-linejoin"])
							}
							
							if (["line", "polyline", "path"].includes(item.attributes.styling.shape)) {
								svgElement.setAttribute("stroke-linecap", item.attributes.styling["stroke-linecap"])
							}
							
							if (item.attributes.styling.shape !== "line") {
								svgElement.setAttribute("fill", item.attributes.styling["fill-on"] ? item.attributes.styling.fill : "transparent")
							}

							for (const attribute in item.attributes.coordinates) {
								svgElement.setAttribute(attribute, item.attributes.coordinates[attribute])
							}
						item.svg = svgElement

					// append
						if (oldElement) {
							oldElement.after(svgElement)
							oldElement.remove()
						}
						else {
							ELEMENTS.container.svg.appendChild(svgElement)
						}

					// points
						if (item.attributes.curves || ["polygon", "polyline", "line"].includes(item.attributes.styling.shape)) {
							item.points = buildItemPoints(item)
						}
						else if (item.points) {
							item.points.group.remove()
							delete item.points
						}

					// return
						return item.svg
				} catch (error) {console.log(error)}
			}

		/* buildItemPoints */
			function buildItemPoints(item) {
				try {
					// delete existing
						if (item.points) {
							item.points.group.remove()
							delete item.points
						}

					// group
						const pointsGroup = {}

					// build group
						const groupElement = document.createElementNS("http://www.w3.org/2000/svg", "g")
							groupElement.id = `${item.id}-points-group`
							groupElement.className = "points-group"
							if (item.attributes.visible) {
								groupElement.setAttribute("visible", true)
							}
							if (item.listing?.coordinates?.showPoints?.checked) {
								groupElement.setAttribute("active", true)
							}
						ELEMENTS.container.points.appendChild(groupElement)
						pointsGroup.group = groupElement

					// curve
						if (item.attributes.curves) {
							// build lines
								for (let curveIndex = 0; curveIndex < item.attributes.curves.length; curveIndex++) {
									// curve
										const curve = item.attributes.curves[curveIndex]

									// M & Z
										if (curve.c1x == undefined) {
											continue
										}

									// previous
										const previousCurve = item.attributes.curves.slice(0, curveIndex).findLast(thatCurve => thatCurve.x !== undefined && thatCurve.y !== undefined)
										const previousX = previousCurve.x
										const previousY = previousCurve.y

									// lines	
										const previousToC1Line = document.createElementNS("http://www.w3.org/2000/svg", "line")
											previousToC1Line.id = `${item.id}-controls-listing-coordinates-curve-${curveIndex}-PreviousToC1`
											previousToC1Line.className = "curve-line"
											previousToC1Line.setAttribute("x1", previousX)
											previousToC1Line.setAttribute("y1", previousY)
											previousToC1Line.setAttribute("x2", curve.c1x)
											previousToC1Line.setAttribute("y2", curve.c1y)
											previousToC1Line.setAttribute("stroke", CONSTANTS.points.pointLineStroke)
											previousToC1Line.setAttribute("stroke-width", CONSTANTS.points.lineWidth)
										groupElement.appendChild(previousToC1Line)
										pointsGroup[`curve-${curveIndex}-PreviousToC1`] = previousToC1Line

										const c1ToC2Line = document.createElementNS("http://www.w3.org/2000/svg", "line")
											c1ToC2Line.id = `${item.id}-controls-listing-coordinates-curve-${curveIndex}-C1ToC2`
											c1ToC2Line.className = "curve-line"
											c1ToC2Line.setAttribute("x1", curve.c1x)
											c1ToC2Line.setAttribute("y1", curve.c1y)
											c1ToC2Line.setAttribute("x2", curve.c2x)
											c1ToC2Line.setAttribute("y2", curve.c2y)
											c1ToC2Line.setAttribute("stroke", CONSTANTS.points.controlLineStroke)
											c1ToC2Line.setAttribute("stroke-width", CONSTANTS.points.lineWidth)
										groupElement.appendChild(c1ToC2Line)
										pointsGroup[`curve-${curveIndex}-C1ToC2`] = c1ToC2Line

										const c2ToFinalLine = document.createElementNS("http://www.w3.org/2000/svg", "line")
											c2ToFinalLine.id = `${item.id}-controls-listing-coordinates-curve-${curveIndex}-C2ToFinal`
											c2ToFinalLine.className = "curve-line"
											c2ToFinalLine.setAttribute("x1", curve.c2x)
											c2ToFinalLine.setAttribute("y1", curve.c2y)
											c2ToFinalLine.setAttribute("x2", curve.x)
											c2ToFinalLine.setAttribute("y2", curve.y)
											c2ToFinalLine.setAttribute("stroke", CONSTANTS.points.pointLineStroke)
											c2ToFinalLine.setAttribute("stroke-width", CONSTANTS.points.lineWidth)
										groupElement.appendChild(c2ToFinalLine)
										pointsGroup[`curve-${curveIndex}-C2ToFinal`] = c2ToFinalLine
								}

							// build points
								for (let curveIndex = 0; curveIndex < item.attributes.curves.length; curveIndex++) {
									// curve
										const curve = item.attributes.curves[curveIndex]

									// C
										if (curve.c1x !== undefined) {
											// points
												const c1 = document.createElementNS("http://www.w3.org/2000/svg", "circle")
													c1.id = `${item.id}-controls-listing-coordinates-curve-${curveIndex}-c1`
													c1.className = "curve-point"
													c1.setAttribute("cx", curve.c1x)
													c1.setAttribute("cy", curve.c1y)
													c1.setAttribute("r",  CONSTANTS.points.r)
													c1.setAttribute("fill", CONSTANTS.points.fill)
													c1.setAttribute("stroke", CONSTANTS.points.controlPointStroke)
													c1.setAttribute("stroke-width", CONSTANTS.points.pointWidth)
													c1.addEventListener(TRIGGERS.mousedown, selectPoint)
													c1.addEventListener(TRIGGERS.doubleclick, doubleclickPoint)
												groupElement.appendChild(c1)
												pointsGroup[`curve-${curveIndex}-c1`] = c1

												const c2 = document.createElementNS("http://www.w3.org/2000/svg", "circle")
													c2.id = `${item.id}-controls-listing-coordinates-curve-${curveIndex}-c2`
													c2.className = "curve-control-point"
													c2.setAttribute("cx", curve.c2x)
													c2.setAttribute("cy", curve.c2y)
													c2.setAttribute("r",  CONSTANTS.points.r)
													c2.setAttribute("fill", CONSTANTS.points.fill)
													c2.setAttribute("stroke", CONSTANTS.points.controlPointStroke)
													c2.setAttribute("stroke-width", CONSTANTS.points.pointWidth)
													c2.addEventListener(TRIGGERS.mousedown, selectPoint)
													c2.addEventListener(TRIGGERS.doubleclick, doubleclickPoint)
												groupElement.appendChild(c2)
												pointsGroup[`curve-${curveIndex}-c2`] = c2
										}

									// C & M
										if (curve.x !== undefined) {
											const p = document.createElementNS("http://www.w3.org/2000/svg", "circle")
												p.id = `${item.id}-controls-listing-coordinates-curve-${curveIndex}-p`
												p.className = "curve-point"
												p.setAttribute("cx", curve.x)
												p.setAttribute("cy", curve.y)
												p.setAttribute("r",  CONSTANTS.points.r)
												p.setAttribute("fill", CONSTANTS.points.fill)
												p.setAttribute("stroke", CONSTANTS.points.pointStroke)
												p.setAttribute("stroke-width", CONSTANTS.points.pointWidth)
												p.addEventListener(TRIGGERS.mousedown, selectPoint)
												p.addEventListener(TRIGGERS.doubleclick, doubleclickPoint)
											groupElement.appendChild(p)
											pointsGroup[`curve-${curveIndex}-p`] = p
										}
								}
						}

					// polygon / polyline
						else if (item.attributes.coordinates.points) {
							const points = item.attributes.coordinates.points.split(/\n/g)

							for (let coordinateIndex = 0; coordinateIndex < points.length; coordinateIndex++) {
								const x = points[coordinateIndex].split(",")[0]
								const y = points[coordinateIndex].split(",")[1]

								const p = document.createElementNS("http://www.w3.org/2000/svg", "circle")
									p.id = `${item.id}-controls-listing-coordinates-point-${coordinateIndex}`
									p.className = "polygon-point"
									p.setAttribute("cx", x)
									p.setAttribute("cy", y)
									p.setAttribute("r",  CONSTANTS.points.r)
									p.setAttribute("fill", CONSTANTS.points.fill)
									p.setAttribute("stroke", CONSTANTS.points.pointStroke)
									p.setAttribute("stroke-width", CONSTANTS.points.pointWidth)
									p.addEventListener(TRIGGERS.mousedown, selectPoint)
									p.addEventListener(TRIGGERS.doubleclick, doubleclickPoint)
								groupElement.appendChild(p)
								pointsGroup[`point-${coordinateIndex}`] = p
							}
						}

					// line
						else {
							const p1 = document.createElementNS("http://www.w3.org/2000/svg", "circle")
								p1.id = `${item.id}-controls-listing-coordinates-point-1`
								p1.className = "polygon-point"
								p1.setAttribute("cx", item.attributes.coordinates.x1)
								p1.setAttribute("cy", item.attributes.coordinates.y1)
								p1.setAttribute("r",  CONSTANTS.points.r)
								p1.setAttribute("fill", CONSTANTS.points.fill)
								p1.setAttribute("stroke", CONSTANTS.points.pointStroke)
								p1.setAttribute("stroke-width", CONSTANTS.points.pointWidth)
								p1.addEventListener(TRIGGERS.mousedown, selectPoint)
								p1.addEventListener(TRIGGERS.doubleclick, doubleclickPoint)
							groupElement.appendChild(p1)
							pointsGroup[`point-1`] = p1

							const p2 = document.createElementNS("http://www.w3.org/2000/svg", "circle")
								p2.id = `${item.id}-controls-listing-coordinates-point-2`
								p2.className = "polygon-point"
								p2.setAttribute("cx", item.attributes.coordinates.x2)
								p2.setAttribute("cy", item.attributes.coordinates.y2)
								p2.setAttribute("r",  CONSTANTS.points.r)
								p2.setAttribute("fill", CONSTANTS.points.fill)
								p2.setAttribute("stroke", CONSTANTS.points.pointStroke)
								p2.setAttribute("stroke-width", CONSTANTS.points.pointWidth)
								p2.addEventListener(TRIGGERS.mousedown, selectPoint)
								p2.addEventListener(TRIGGERS.doubleclick, doubleclickPoint)
							groupElement.appendChild(p2)
							pointsGroup[`point-2`] = p2
						}

					// return
						return pointsGroup
				} catch (error) {console.log(error)}
			}

		/* buildItemListing */
			function buildItemListing(item) {
				try {
					// clear existing listing
						const oldElement = item.listing?.container

					// element
						const listingElement = document.createElement("details")
							listingElement.className = "controls-listing"
							listingElement.id = `listing${item.id}`
						item.listing = {
							container: listingElement
						}
					
					// append
						if (oldElement) {
							oldElement.after(item.listing.container)
							oldElement.remove()
						}
						else {
							ELEMENTS.controls.list.prepend(item.listing.container)
						}

					// summary
						item.listing.summary = buildItemSummary(item)

					// styling
						item.listing.styling = buildItemStyling(item)

					// coordinates
						item.listing.coordinates = buildItemCoordinates(item)

					// return
						return item.listing
				} catch (error) {console.log(error)}
			}

		/* buildItemSummary */
			function buildItemSummary(item) {
				try {
					// remove existing
						if (item.listing?.summary?.section) {
							item.listing.summary.section.remove()
						}

					// section
						const section = document.createElement("summary")
							section.className = "controls-listing-summary"
						item.listing.container.appendChild(section)
						item.listing.container.setAttribute("open", true)

					// name
						const nameElement = document.createElement("div")
							nameElement.className = "controls-listing-name"
							nameElement.innerText = item.attributes.curves ? "curves" : item.attributes.styling.shape
							nameElement.addEventListener(TRIGGERS.mouseenter, highlightItem)
							nameElement.addEventListener(TRIGGERS.mouseleave, unhighlightItem)
						section.appendChild(nameElement)

					// main actions
						const mainActionsSection = document.createElement("div")
							mainActionsSection.className = "controls-listing-actions"
						section.appendChild(mainActionsSection)

						// existence
							const visibleLabel = document.createElement("label")
								visibleLabel.className = "controls-listing-visible-label"
								visibleLabel.innerHTML = CONSTANTS.symbols.eye
								visibleLabel.title = "toggle visibility"
							mainActionsSection.appendChild(visibleLabel)

								const visibleCheckbox = document.createElement("input")
									visibleCheckbox.className = "controls-listing-visible-checkbox"
									visibleCheckbox.type = "checkbox"
									visibleCheckbox.checked = item.attributes.visible
									visibleCheckbox.addEventListener(TRIGGERS.input, toggleItemVisibility)
								visibleLabel.appendChild(visibleCheckbox)

							const lockLabel = document.createElement("label")
								lockLabel.className = "controls-listing-locked-label"
								lockLabel.innerHTML = CONSTANTS.symbols.lock
								lockLabel.title = "toggle lock"
							mainActionsSection.appendChild(lockLabel)

								const lockedCheckbox = document.createElement("input")
									lockedCheckbox.className = "controls-listing-locked-checkbox"
									lockedCheckbox.type = "checkbox"
									lockedCheckbox.checked = item.attributes.locked
									lockedCheckbox.addEventListener(TRIGGERS.input, toggleItemLock)
								lockLabel.appendChild(lockedCheckbox)
								
							const copyButton = document.createElement("button")
								copyButton.className = "controls-listing-copy"
								copyButton.innerHTML = CONSTANTS.symbols.copy
								copyButton.title = "duplicate item"
								copyButton.addEventListener(TRIGGERS.click, copyItem)
							mainActionsSection.appendChild(copyButton)

							const upButton = document.createElement("button")
								upButton.className = "controls-listing-up"
								upButton.innerHTML = CONSTANTS.symbols.up
								upButton.title = "move up layer"
								upButton.addEventListener(TRIGGERS.click, moveItemUpLayer)
							mainActionsSection.appendChild(upButton)

							const downButton = document.createElement("button")
								downButton.className = "controls-listing-down"
								downButton.innerHTML = CONSTANTS.symbols.down
								downButton.title = "move down layer"
								downButton.addEventListener(TRIGGERS.click, moveItemDownLayer)
							mainActionsSection.appendChild(downButton)

							const deleteButton = document.createElement("button")
								deleteButton.className = "controls-listing-delete"
								deleteButton.innerHTML = CONSTANTS.symbols.x
								deleteButton.title = "delete item"
								deleteButton.addEventListener(TRIGGERS.click, deleteItem)
							mainActionsSection.appendChild(deleteButton)

					// merge actions
						const mergeActionsSection = document.createElement("div")
							mergeActionsSection.className = "controls-listing-merge"
						section.appendChild(mergeActionsSection)

						// merge
							const identifyButton = document.createElement("button")
								identifyButton.className = "controls-listing-identify"
								identifyButton.innerHTML = "&#x26ad; identify"
								identifyButton.title = "identify overlap with next layer"
								identifyButton.value = "identify"
								identifyButton.addEventListener(TRIGGERS.click, mergeItems)
							mergeActionsSection.appendChild(identifyButton)

							const unionButton = document.createElement("button")
								unionButton.className = "controls-listing-union"
								unionButton.innerHTML = CONSTANTS.symbols.union + " union"
								unionButton.title = "union next layer"
								unionButton.value = "union"
								unionButton.addEventListener(TRIGGERS.click, mergeItems)
							mergeActionsSection.appendChild(unionButton)

							const intersectButton = document.createElement("button")
								intersectButton.className = "controls-listing-intersect"
								intersectButton.innerHTML = CONSTANTS.symbols.intersect + " intersect"
								intersectButton.title = "intersect next layer"
								intersectButton.value = "intersect"
								intersectButton.addEventListener(TRIGGERS.click, mergeItems)
							mergeActionsSection.appendChild(intersectButton)

							const combineButton = document.createElement("button")
								combineButton.className = "controls-listing-combine"
								combineButton.innerHTML = CONSTANTS.symbols.combine + " combine"
								combineButton.title = "combine next layer"
								combineButton.value = "combine"
								combineButton.addEventListener(TRIGGERS.click, mergeItems)
							mergeActionsSection.appendChild(combineButton)

							const subtractButton = document.createElement("button")
								subtractButton.className = "controls-listing-subtract"
								subtractButton.innerHTML = CONSTANTS.symbols.subtract + " subtract"
								subtractButton.title = "subtract next layer"
								subtractButton.value = "subtract"
								subtractButton.addEventListener(TRIGGERS.click, mergeItems)
							mergeActionsSection.appendChild(subtractButton)

					// conversions
						const convertsSection = document.createElement("div")
							convertsSection.className = "controls-listing-conversion"
						section.appendChild(convertsSection)

						// subdivide
							const subdivideButton = document.createElement("button")
								subdivideButton.className = "controls-listing-subdivide"
								subdivideButton.innerHTML = CONSTANTS.symbols.subdivide + " subdivide"
								subdivideButton.title = "subdivide item into components"
								subdivideButton.addEventListener(TRIGGERS.click, subdivideItem)
							convertsSection.appendChild(subdivideButton)

						// convert to polygon
							const polygonButton = document.createElement("button")
								polygonButton.className = "controls-listing-convert"
								polygonButton.innerHTML = CONSTANTS.symbols.polygon + " polygon"
								polygonButton.value = "polygon"
								polygonButton.title = "convert to polygon"
								polygonButton.addEventListener(TRIGGERS.click, convertItemToPolygon)
							convertsSection.appendChild(polygonButton)

						// convert to path
							const pathButton = document.createElement("button")
								pathButton.className = "controls-listing-convert"
								pathButton.innerHTML = CONSTANTS.symbols.path + " path"
								pathButton.value = "path"
								pathButton.title = "convert to path"
								pathButton.addEventListener(TRIGGERS.click, convertItemToPath)
							convertsSection.appendChild(pathButton)

						// convert to curves
							const curvesButton = document.createElement("button")
								curvesButton.className = "controls-listing-convert"
								curvesButton.innerHTML = CONSTANTS.symbols.curves + " curves"
								curvesButton.value = "curves"
								curvesButton.title = "convert to curves"
								curvesButton.addEventListener(TRIGGERS.click, convertItemToPath)
							convertsSection.appendChild(curvesButton)

					// object
						return {
							section,
							nameElement,
							visibleCheckbox,
							lockedCheckbox,
							copyButton,
							upButton,
							downButton,
							deleteButton,
							identifyButton,
							unionButton,
							intersectButton,
							combineButton,
							subtractButton,
							subdivideButton,
							polygonButton,
							pathButton,
							curvesButton
						}
				} catch (error) {console.log(error)}
			}

		/* buildItemStyling */
			function buildItemStyling(item) {
				try {
					// remove existing
						if (item.listing?.styling?.section) {
							item.listing.styling.section.remove()
						}

					// section
						const section = document.createElement("div")
							section.className = "controls-listing-styling"
						item.listing.container.appendChild(section)

					// fill
						const fillLabel = document.createElement("label")
							fillLabel.className = "controls-label controls-label-fill"
						section.appendChild(fillLabel)

							const fillSpan = document.createElement("span")
								fillSpan.className = "controls-span"
								fillSpan.innerText = "fill"
							fillLabel.appendChild(fillSpan)

							const fillCheckbox = document.createElement("input")
								fillCheckbox.id = `${item.id}-controls-listing-styling-fill-on`
								fillCheckbox.type = "checkbox"
								fillCheckbox.className = "controls-listing-styling-fill-on"
								fillCheckbox.checked = item.attributes.styling["fill-on"]
								fillCheckbox.addEventListener(TRIGGERS.input, changeItemAttribute)
							fillLabel.appendChild(fillCheckbox)

							const fillInput = document.createElement("input")
								fillInput.id = `${item.id}-controls-listing-styling-fill`
								fillInput.type = "color"
								fillInput.className = "controls-listing-styling-fill"
								fillInput.placeholder = "fill"
								fillInput.value = item.attributes.styling.fill
								fillInput.addEventListener(TRIGGERS.input, changeItemAttribute)
							fillLabel.appendChild(fillInput)

					// stroke
						const strokeLabel = document.createElement("label")
							strokeLabel.className = "controls-label controls-label-stroke"
						section.appendChild(strokeLabel)

							const strokeSpan = document.createElement("span")
								strokeSpan.className = "controls-span"
								strokeSpan.innerText = "stroke"
							strokeLabel.appendChild(strokeSpan)

							const strokeWidthInput = document.createElement("input")
								strokeWidthInput.id = `${item.id}-controls-listing-styling-stroke-width`
								strokeWidthInput.type = "number"
								strokeWidthInput.min = "0"
								strokeWidthInput.className = "controls-listing-styling-stroke-width"
								strokeWidthInput.placeholder = "stroke-width"
								strokeWidthInput.value = item.attributes.styling["stroke-width"]
								strokeWidthInput.addEventListener(TRIGGERS.input, changeItemAttribute)
							strokeLabel.appendChild(strokeWidthInput)

							const strokeInput = document.createElement("input")
								strokeInput.id = `${item.id}-controls-listing-styling-stroke`
								strokeInput.type = "color"
								strokeInput.className = "controls-listing-styling-stroke"
								strokeInput.placeholder = "stroke"
								strokeInput.value = item.attributes.styling.stroke
								strokeInput.addEventListener(TRIGGERS.input, changeItemAttribute)
							strokeLabel.appendChild(strokeInput)
					
							const strokeLinecapSelect = document.createElement("select")
								strokeLinecapSelect.id = `${item.id}-controls-listing-styling-stroke-linecap`
								strokeLinecapSelect.className = "controls-listing-styling-stroke-linecap"
								for (const type of CONSTANTS.options["stroke-linecap"]) {
									const option = document.createElement("option")
										option.value = option.innerText = type
									strokeLinecapSelect.appendChild(option)
								}
								strokeLinecapSelect.value = item.attributes.styling["stroke-linecap"]
								strokeLinecapSelect.placeholder = "stroke-linecap"
								strokeLinecapSelect.addEventListener(TRIGGERS.input, changeItemAttribute)
							strokeLabel.appendChild(strokeLinecapSelect)

							const strokeLinejoinSelect = document.createElement("select")
								strokeLinejoinSelect.id = `${item.id}-controls-listing-styling-stroke-linejoin`
								strokeLinejoinSelect.className = "controls-listing-styling-stroke-linejoin"
								for (const type of CONSTANTS.options["stroke-linejoin"]) {
									const option = document.createElement("option")
										option.value = option.innerText = type
									strokeLinejoinSelect.appendChild(option)
								}
								strokeLinejoinSelect.value = item.attributes.styling["stroke-linejoin"]
								strokeLinejoinSelect.placeholder = "stroke-linejoin"
								strokeLinejoinSelect.addEventListener(TRIGGERS.input, changeItemAttribute)
							strokeLabel.appendChild(strokeLinejoinSelect)

					// object
						return {
							section,
							"fill-on": fillCheckbox,
							fill: fillInput,
							stroke: strokeInput,
							"stroke-width": strokeWidthInput,
							"stroke-linecap": strokeLinecapSelect,
							"stroke-linejoin": strokeLinejoinSelect
						}
				} catch (error) {console.log(error)}
			}

		/* buildItemCoordinates */
			function buildItemCoordinates(item) {
				try {
					// remove existing
						if (item.listing?.coordinates?.section) {
							item.listing.coordinates.section.remove()
						}

					// set shape
						const shape = item.attributes.curves ? "curves" : item.attributes.styling.shape
						item.listing.container.setAttribute("shape", shape)
						item.listing.summary.nameElement.innerText = shape

					// section
						const section = document.createElement("div")
							section.className = "controls-listing-coordinates"
						item.listing.container.appendChild(section)

					// transformations
						const inputs = buildItemTransformations(item, section)

					// curves
						if (item.attributes.curves) {
							const curveInputs = buildItemCurves(item, section)
							for (const i in curveInputs) {
								inputs[i] = curveInputs[i]
							}
						}

					// all others
						else {
							const coordinatesSection = document.createElement("div")
								coordinatesSection.className = "controls-listing-coordinates-inner"
							section.appendChild(coordinatesSection)

							// path
								if (item.attributes.styling.shape == "path") {
									// d
										const dInput = document.createElement("textarea")
											dInput.id = `${item.id}-controls-listing-coordinates-d`
											dInput.className = `controls-listing-coordinates-d`
											dInput.placeholder = "path commands"
											dInput.value = item.attributes.coordinates.d
											dInput.addEventListener(TRIGGERS.input, changeItemAttribute)
										coordinatesSection.appendChild(dInput)
										inputs.d = dInput
								}

							// polygon / polyline
								if (["polygon", "polyline", "line"].includes(item.attributes.styling.shape)) {
									// show points
										const showPointsLabel = document.createElement("label")
											showPointsLabel.className = "controls-label"
										coordinatesSection.appendChild(showPointsLabel)

										const showPointsSpan = document.createElement("span")
											showPointsSpan.className = "controls-span"
											showPointsSpan.innerText = "show points"
										showPointsLabel.appendChild(showPointsSpan)

										const showPointsInput = document.createElement("input")
											showPointsInput.id = `${item.id}-controls-listing-coordinates-show-points`
											showPointsInput.type = "checkbox"
											showPointsInput.checked = item.points?.group?.getAttribute("active") ?? true
											showPointsInput.className = `controls-listing-coordinates-show-points`
											showPointsInput.addEventListener(TRIGGERS.input, toggleItemPoints)
										showPointsLabel.appendChild(showPointsInput)
										inputs.showPoints = showPointsInput

									if (item.attributes.coordinates.points !== undefined) {
										const pointsInput = document.createElement("textarea")
											pointsInput.id = `${item.id}-controls-listing-coordinates-points`
											pointsInput.className = `controls-listing-coordinates-points`
											pointsInput.placeholder = "x,y pairs"
											pointsInput.value = item.attributes.coordinates.points
											pointsInput.addEventListener(TRIGGERS.input, changeItemAttribute)
										coordinatesSection.appendChild(pointsInput)
										inputs.points = pointsInput
									}
								}

							// build inputs for other shapes
								if (!["path", "polygon", "polyline"].includes(item.attributes.styling.shape)) {
									for (const attribute in item.attributes.coordinates) {
										const label = document.createElement("label")
											label.className = "controls-label"
										coordinatesSection.appendChild(label)

										const span = document.createElement("span")
											span.className = "controls-span"
											span.innerText = attribute
										label.appendChild(span)

										const attributeInput = document.createElement("input")
											attributeInput.id = `${item.id}-controls-listing-coordinates-${attribute}`
											attributeInput.type = "number"
											attributeInput.className = `controls-listing-coordinates-${attribute}`
											attributeInput.placeholder = attribute
											attributeInput.value = item.attributes.coordinates[attribute]
											attributeInput.addEventListener(TRIGGERS.input, changeItemAttribute)
										label.appendChild(attributeInput)
										
										inputs[attribute] = attributeInput
									}
								}
						}

					// return
						return {
							section,
							...inputs
						}
				} catch (error) {console.log(error)}
			}

		/* buildItemTransformations */
			function buildItemTransformations(item, section) {
				try {
					// inputs
						const inputs = {}

					// transformations
						const transformsSection = document.createElement("div")
							transformsSection.className = "controls-transformations-section"
						section.appendChild(transformsSection)

						// set scale
							const scaleLabel = document.createElement("label")
								scaleLabel.className = "controls-label"
							transformsSection.appendChild(scaleLabel)

								const scaleSpan = document.createElement("span")
									scaleSpan.className = "controls-span"
									scaleSpan.innerText = "scale x,y"
								scaleLabel.appendChild(scaleSpan)

								const scaleXInput = document.createElement("input")
									scaleXInput.id = `${item.id}-controls-listing-scale-x`
									scaleXInput.type = "number"
									scaleXInput.className = "controls-listing-scale-x"
									scaleXInput.placeholder = "scale x"
									scaleXInput.value = 1
								scaleLabel.appendChild(scaleXInput)
								inputs.scaleX = scaleXInput

								const scaleYInput = document.createElement("input")
									scaleYInput.id = `${item.id}-controls-listing-scale-y`
									scaleYInput.type = "number"
									scaleYInput.className = "controls-listing-scale-y"
									scaleYInput.placeholder = "scale y"
									scaleYInput.value = 1
								scaleLabel.appendChild(scaleYInput)
								inputs.scaleY = scaleYInput

								const scaleButton = document.createElement("button")
									scaleButton.className = "controls-listing-scale-button"
									scaleButton.innerHTML = CONSTANTS.symbols.scale
									scaleButton.title = "re-scale item"
									scaleButton.addEventListener(TRIGGERS.click, changeItemScale)
								scaleLabel.appendChild(scaleButton)
								inputs.scaleButton = scaleButton

						// set flip
							const flipLabel = document.createElement("div")
								flipLabel.className = "controls-label"
							transformsSection.appendChild(flipLabel)

								const flipSpan = document.createElement("span")
									flipSpan.className = "controls-span"
									flipSpan.innerText = "mirror"
								flipLabel.appendChild(flipSpan)

								const flipXButton = document.createElement("button")
									flipXButton.className = "controls-listing-flip-x-button"
									flipXButton.innerHTML = CONSTANTS.symbols.horizontal
									flipXButton.title = "flip horizontally"
									flipXButton.addEventListener(TRIGGERS.click, changeItemScale)
								flipLabel.appendChild(flipXButton)
								inputs.flipXButton = flipXButton

								const flipYButton = document.createElement("button")
									flipYButton.className = "controls-listing-flip-y-button"
									flipYButton.innerHTML = CONSTANTS.symbols.vertical
									flipYButton.title = "flip vertically"
									flipYButton.addEventListener(TRIGGERS.click, changeItemScale)
								flipLabel.appendChild(flipYButton)
								inputs.flipYButton = flipYButton

						// set skew
							const skewLabel = document.createElement("label")
								skewLabel.className = "controls-label"
							transformsSection.appendChild(skewLabel)

								const skewSpan = document.createElement("span")
									skewSpan.className = "controls-span"
									skewSpan.innerText = "skew x,y"
								skewLabel.appendChild(skewSpan)

								const skewXInput = document.createElement("input")
									skewXInput.id = `${item.id}-controls-listing-skew-x`
									skewXInput.type = "number"
									skewXInput.className = "controls-listing-skew-x"
									skewXInput.placeholder = "skew x°"
									skewXInput.value = 0
								skewLabel.appendChild(skewXInput)
								inputs.skewX = skewXInput

								const skewYInput = document.createElement("input")
									skewYInput.id = `${item.id}-controls-listing-skew-y`
									skewYInput.type = "number"
									skewYInput.className = "controls-listing-skew-y"
									skewYInput.placeholder = "skew y°"
									skewYInput.value = 0
								skewLabel.appendChild(skewYInput)
								inputs.skewY = skewYInput

								const skewButton = document.createElement("button")
									skewButton.className = "controls-listing-skew-button"
									skewButton.innerHTML = CONSTANTS.symbols.skew
									skewButton.title = "skew item"
									skewButton.addEventListener(TRIGGERS.click, changeItemSkew)
								skewLabel.appendChild(skewButton)
								inputs.skewButton = skewButton

						// set rotation
							const rotationLabel = document.createElement("label")
								rotationLabel.className = "controls-label"
							transformsSection.appendChild(rotationLabel)

								const rotationSpan = document.createElement("span")
									rotationSpan.className = "controls-span"
									rotationSpan.innerText = "rotate"
								rotationLabel.appendChild(rotationSpan)

								const rotationInput = document.createElement("input")
									rotationInput.id = `${item.id}-controls-listing-rotation`
									rotationInput.type = "number"
									rotationInput.className = "controls-listing-rotation"
									rotationInput.placeholder = "rotation°"
									rotationInput.value = 0
									rotationInput.step = 1
								rotationLabel.appendChild(rotationInput)
								inputs.rotation = rotationInput

								const rotateButton = document.createElement("button")
									rotateButton.className = "controls-listing-rotate-button"
									rotateButton.innerHTML = CONSTANTS.symbols.rotate
									rotateButton.title = "rotate item counterclockwise"
									rotateButton.addEventListener(TRIGGERS.click, changeItemRotation)
								rotationLabel.appendChild(rotateButton)
								inputs.rotateButton = rotateButton

					// return
						return inputs
				} catch (error) {console.log(error)}
			}

		/* buildItemCurves */
			function buildItemCurves(item, section) {
				try {
					// inputs
						const inputs = {}

					// points
						const showPointsLabel = document.createElement("label")
							showPointsLabel.className = "controls-label"
						section.appendChild(showPointsLabel)

						const showPointsSpan = document.createElement("span")
							showPointsSpan.className = "controls-span"
							showPointsSpan.innerText = "show points"
						showPointsLabel.appendChild(showPointsSpan)

						const showPointsInput = document.createElement("input")
							showPointsInput.id = `${item.id}-controls-listing-coordinates-show-points`
							showPointsInput.type = "checkbox"
							showPointsInput.checked = item.points?.group?.getAttribute("active") ?? true
							showPointsInput.className = `controls-listing-coordinates-show-points`
							showPointsInput.addEventListener(TRIGGERS.input, toggleItemPoints)
						showPointsLabel.appendChild(showPointsInput)
						inputs.showPoints = showPointsInput

					// area
						const curvesArea = document.createElement("div")
							curvesArea.className = "controls-curves-area"
						section.appendChild(curvesArea)

					// loop through curves
						for (const c in item.attributes.curves) {
							// curve
								const curve = item.attributes.curves[c]
								const command = (curve.z ? "Z" : curve.c1x !== undefined ? "C" : "M")

							// row
								const row = document.createElement("div")
									row.className = "controls-curves-row"
									row.setAttribute("command", command)
								curvesArea.appendChild(row)
								inputs[`curve-${c}-row`] = row

								const commandElement = document.createElement("div")
									commandElement.className = "controls-curves-row-command"
									commandElement.innerText = command
								row.appendChild(commandElement)

							// remove
								const removeCurveButton = document.createElement("button")
									removeCurveButton.className = "controls-remove-curve"
									removeCurveButton.innerHTML = CONSTANTS.symbols.x
									removeCurveButton.title = "remove this curve"
									removeCurveButton.addEventListener(TRIGGERS.click, removeCurve)
								row.appendChild(removeCurveButton)
								inputs[`curve-${c}-remove`] = removeCurveButton

							// C
								if (curve.c1x !== undefined && curve.c1y !== undefined) {
									const label = document.createElement("label")
										label.className = "controls-label"
										label.setAttribute("point", "c1")
									row.appendChild(label)

									const span = document.createElement("span")
										span.className = "controls-span controls-c-span"
										span.innerText = "c1 (x,y)"
									label.appendChild(span)

									const c1xInput = document.createElement("input")
										c1xInput.id = `${item.id}-controls-listing-coordinates-curve-${c}-c1x`
										c1xInput.className = `controls-listing-coordinates-curve-c1x`
										c1xInput.setAttribute("coordinate", "c1x")
										c1xInput.addEventListener(TRIGGERS.input, changeCurveInput)
										c1xInput.type = "number"
										c1xInput.placeholder = "c1x"
										c1xInput.value = curve["c1x"]
									label.appendChild(c1xInput)
									inputs[`curve-${c}-c1x`] = c1xInput

									const c1yInput = document.createElement("input")
										c1yInput.id = `${item.id}-controls-listing-coordinates-curve-${c}-c1y`
										c1yInput.className = `controls-listing-coordinates-curve-c1y`
										c1yInput.setAttribute("coordinate", "c1y")
										c1yInput.addEventListener(TRIGGERS.input, changeCurveInput)
										c1yInput.type = "number"
										c1yInput.placeholder = "c1y"
										c1yInput.value = curve["c1y"]
									label.appendChild(c1yInput)
									inputs[`curve-${c}-c1y`] = c1yInput
								}

								if (curve.c2x !== undefined && curve.c2y !== undefined) {
									const label = document.createElement("label")
										label.className = "controls-label"
										label.setAttribute("point", "c2")
									row.appendChild(label)

									const span = document.createElement("span")
										span.className = "controls-span controls-c-span"
										span.innerText = "c2 (x,y)"
									label.appendChild(span)

									const c2xInput = document.createElement("input")
										c2xInput.id = `${item.id}-controls-listing-coordinates-curve-${c}-c2x`
										c2xInput.className = `controls-listing-coordinates-curve-c2x`
										c2xInput.setAttribute("coordinate", "c2x")
										c2xInput.addEventListener(TRIGGERS.input, changeCurveInput)
										c2xInput.type = "number"
										c2xInput.placeholder = "c2x"
										c2xInput.value = curve["c2x"]
									label.appendChild(c2xInput)
									inputs[`curve-${c}-c2x`] = c2xInput

									const c2yInput = document.createElement("input")
										c2yInput.id = `${item.id}-controls-listing-coordinates-curve-${c}-c2y`
										c2yInput.className = `controls-listing-coordinates-curve-c2y`
										c2yInput.setAttribute("coordinate", "c2y")
										c2yInput.addEventListener(TRIGGERS.input, changeCurveInput)
										c2yInput.type = "number"
										c2yInput.placeholder = "c2y"
										c2yInput.value = curve["c2y"]
									label.appendChild(c2yInput)
									inputs[`curve-${c}-c2y`] = c2yInput
								}

							// C & M
								if (curve.x !== undefined && curve.y !== undefined) {
									const label = document.createElement("label")
										label.className = "controls-label"
										label.setAttribute("point", "p")
									row.appendChild(label)

									const span = document.createElement("span")
										span.className = "controls-span controls-p-span"
										span.innerHTML = "p&nbsp;&nbsp;(x,y)"
									label.appendChild(span)

									const xInput = document.createElement("input")
										xInput.id = `${item.id}-controls-listing-coordinates-curve-${c}-x`
										xInput.className = `controls-listing-coordinates-curve-x`
										xInput.setAttribute("coordinate", "x")
										xInput.addEventListener(TRIGGERS.input, changeCurveInput)
										xInput.type = "number"
										xInput.placeholder = "x"
										xInput.value = curve["x"]
									label.appendChild(xInput)
									inputs[`curve-${c}-x`] = xInput

									const yInput = document.createElement("input")
										yInput.id = `${item.id}-controls-listing-coordinates-curve-${c}-y`
										yInput.className = `controls-listing-coordinates-curve-y`
										yInput.setAttribute("coordinate", "y")
										yInput.addEventListener(TRIGGERS.input, changeCurveInput)
										yInput.type = "number"
										yInput.placeholder = "y"
										yInput.value = curve["y"]
									label.appendChild(yInput)
									inputs[`curve-${c}-y`] = yInput
								}

							// inserts
								if (c != item.attributes.curves.length - 1) {
									const insertsSection = document.createElement("div")
										insertsSection.className = "controls-curve-inserts"
									row.appendChild(insertsSection)

									const splitButton = document.createElement("button")
										splitButton.className = "controls-insert-curve"
										splitButton.value = "split"
										splitButton.innerHTML = CONSTANTS.symbols.divide
										splitButton.title = "split in half"
										splitButton.addEventListener(TRIGGERS.click, insertCurve)
									insertsSection.appendChild(splitButton)
									inputs[`curve-${c}-split`] = splitButton

									const insertMButton = document.createElement("button")
										insertMButton.className = "controls-insert-curve"
										insertMButton.value = "M"
										insertMButton.innerHTML = CONSTANTS.symbols.plus + " M"
										insertMButton.title = "insert Move command"
										insertMButton.addEventListener(TRIGGERS.click, insertCurve)
									insertsSection.appendChild(insertMButton)
									inputs[`curve-${c}-insertM`] = insertMButton

									const insertCButton = document.createElement("button")
										insertCButton.className = "controls-insert-curve"
										insertCButton.value = "C"
										insertCButton.innerHTML = CONSTANTS.symbols.plus + " C"
										insertCButton.title = "insert Curve command"
										insertCButton.addEventListener(TRIGGERS.click, insertCurve)
									insertsSection.appendChild(insertCButton)
									inputs[`curve-${c}-insertC`] = insertCButton

									const insertZButton = document.createElement("button")
										insertZButton.className = "controls-insert-curve"
										insertZButton.value = "Z"
										insertZButton.innerHTML = CONSTANTS.symbols.plus + " Z"
										insertZButton.title = "insert Z return command"
										insertZButton.addEventListener(TRIGGERS.click, insertCurve)
									insertsSection.appendChild(insertZButton)
									inputs[`curve-${c}-insertZ`] = insertZButton
								}
						}

					// return
						return inputs
				} catch (error) {console.log(error)}
			}
