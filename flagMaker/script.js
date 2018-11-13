window.addEventListener("load", function() {
	/*** globals ***/
		/* triggers */
			if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
				var on = { click: "touchstart", mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" }
			}
			else {
				var on = { click:      "click", mousedown:  "mousedown", mousemove: "mousemove", mouseup:  "mouseup" }
			}

		/* canvas */
			var canvas  = document.getElementById("flag")
			var context = canvas.getContext("2d")
			var data    = {}

		/* colors */
			var colorSlots = ["primary", "secondary", "tertiary", "quarternary", "quintary"]
			var colors = {
				transparent:["transparent","transparent","transparent","transparent","transparent"],
				magenta:    ["#ffcce6","#ff66b3","#e60073","#99004d","#33001a"],
				red:        ["#fab7b7","#f66f6f","#d80e0e","#7c0808","#300303"],
				brown:      ["#e09b06","#ae7804","#7c5603","#513802","#191101"],
				browngray:  ["#d5cac3","#b6a196","#a18778","#786154","#4f4037"],
				orange:     ["#fde4ce","#f9ae6c","#f68523","#ab5407","#442103"],
				beige:      ["#f7f4ed","#e0d3b8","#c1a871","#91773f","#6a572f"],
				yellow:     ["#f6f4d5","#e5dd80","#d8cb41","#beb227","#7f771a"],
				green:      ["#a9d3ab","#539e57","#1a661e","#074f0b","#053007"],
				greengray:  ["#d3ded4","#99b29b","#6a8c6c","#4d664e","#374938"],
				cyan:       ["#e6ffff","#b3ffff","#33ffff","#00cccc","#008080"],
				cerulean:   ["#dae7f1","#90b8d5","#4689b9","#2b5572","#1c374a"],
				bluegray:   ["#dee9ed","#adc8d2","#7ba7b7","#487484","#2d4852"],
				blue:       ["#d0e0fb","#7a9bd3","#2b76ef","#0b3d8e","#04142f"],
				purple:     ["#dac0f7","#b08bda","#7b3dc2","#4a2574","#180c26"],
				black:      ["#e4e6e7","#a2a7a9","#6e7477","#3d4142","#111111"],
				white:      ["#c0dee5","#cee2e8","#dcf1f7","#e3f5f9","#f9fdff"]
			}

		/* symbols */
			var symbols = {
				none:           null,
				circle:         null,
				ring:           null,
				triangle: 		"50% 15%, 0% 100%, 100% 100%",
				square: 		"0% 0%, 100% 0%, 100% 100%, 0% 100%",
				diamond: 		"50% 0%, 100% 50%, 50% 100%, 0% 50%",
				parallelogram: 	"25% 0%, 100% 0%, 75% 100%, 0% 100%",
				rectangle: 		"0% 20%, 100% 20%, 100% 80%, 0% 80%",
				trapezoid: 		"20% 0%, 80% 0%, 100% 100%, 0% 100%",
				pentagon: 		"50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%",
				hexagon: 		"50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%",
				septagon: 		"50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%",
				octagon: 		"30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%",
				nonagon: 		"50% 0%, 83% 12%, 100% 43%, 94% 78%, 68% 100%, 32% 100%, 6% 78%, 0% 43%, 17% 12%",
				decagon: 		"50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%",
				dodecagon: 		"38% 5%, 62% 5%, 82.5% 17.5%, 95% 38%, 95% 62%, 82.5% 82.5%, 62% 95%, 38% 95%, 17.5% 82.5%, 5% 62%, 5% 38%, 17.5% 17.5%",
				star: 			"50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%",
				chevron: 		"50% 0%, 100% 100%, 50% 75%, 0 100%",
				plus: 			"0% 33%, 33% 33%, 33% 0%, 67% 0%, 67% 33%, 100% 33%, 100% 67%, 67% 67%, 67% 100%, 33% 100%, 33% 67%, 0% 67%",
				cross: 			"40% 40%, 40% -150%, 60% -150%, 60% 40%, 250% 40%, 250% 60%, 60% 60%, 60% 250%, 40% 250%, 40% 60%, -150% 60%, -150% 40%, 40% 40%",
				x: 				"-170% -150%, -150% -170%, 50% 30%, 250% -170%, 270% -150%, 70% 50%, 270% 250%, 250% 270%, 50% 70%, -150% 270%, -170% 250%, 30% 50%",
				jack:           "-170% -150%, -150% -170%, 50% 30%, 250% -170%, 270% -150%, 70% 50%, 270% 250%, 250% 270%, 50% 70%, -150% 270%, -170% 250%, 30% 50%, 40% 40%, 40% -150%, 60% -150%, 60% 40%, 250% 40%, 250% 60%, 60% 60%, 60% 250%, 40% 250%, 40% 60%, -150% 60%, -150% 40%, 40% 40%, 30% 50%",
				arrow: 			"50% 0, 50% 33%, 100% 33%, 100% 67%, 50% 67%, 50% 100%, 0% 50%",	
				rabbit: 		"29% 6%, 30% 13%, 30% 18%, 30% 23%, 30% 30%, 31% 36%, 34% 42%, 36% 49%, 34% 57%, 31% 65%, 30% 72%, 31% 80%, 34% 86%, 39% 90%, 45% 94%, 50% 95%, 55% 94%, 61% 90%, 66% 86%, 69% 80%, 70% 72%, 69% 65%, 66% 57%, 64% 49%, 66% 42%, 69% 36%, 70% 30%, 70% 23%, 70% 18%, 70% 13%, 71% 6%, 70.5% 5%, 69.5% 4%, 69% 4%, 66% 7%, 64% 11%, 61% 18%, 57% 27%, 56% 32%, 55% 39%, 54% 45%, 53% 44.5%, 50% 44%, 47% 44.5%, 46% 45%, 45% 39%, 44% 32%, 43% 27%, 39% 18%, 36% 11%, 34% 7%, 31% 4%, 30.5% 4%, 29.5% 5%",
				cat: 			"24% 10%, 17% 38%, 13% 46%, 13% 57%, 17% 65%, 25% 74%, 35% 82%, 47% 85%, 53% 85%, 65% 82%, 75% 74%, 83% 65%, 87% 57%, 87% 46%, 83% 38%, 76% 10%, 60% 31%, 40% 31%",
				dog: 			"46% 19%, 54% 19%, 57.75% 20%, 58% 19.5%, 60% 18.25%, 61% 18%, 74% 19.5%, 85% 18%, 88% 20%, 89.75% 22%, 87% 40%, 88% 54%, 87% 57%, 85% 58%, 81.75% 57.5%, 78.5% 55%, 79% 59%, 78.5% 62%, 71% 77%, 70% 80%, 69% 84%, 67% 87%, 64% 88.5%, 62% 88.8%, 61% 89%, 56% 88%, 50.13% 90.05% , 44% 88%, 39% 89%, 38% 88.8%, 36% 88.5%, 33% 87%, 31% 84%, 30% 80%, 29% 77%, 21.5% 62%, 21% 59%, 21.5% 55%, 19.25% 57.5%, 15% 58%, 13% 57%, 12% 54%, 13% 40%, 10.25% 22%, 12% 20%, 15% 18%, 26% 19.5%, 39% 18%, 40% 18.25%, 42% 19.5%, 42.25% 20%"
			}

		/* patterns */
			var structures   = ["solid", "horizontal-stripes", "vertical-stripes", "diamond", "square", "x", "cross", "jack", "checkers"]

	/*** menu ***/
		/* buildMenu */
			buildMenu()
			function buildMenu() {
				// menu
					var menu = document.getElementById("menu")

				// field
					var header  = document.createElement("h2")
						header.id = header.innerText = "field"
					menu.appendChild(header)

					var label  = document.createElement("label")
						label.innerText = "color"
					menu.appendChild(label)
					var select = document.createElement("select")
						select.id = "fieldHueSelect"
						select.addEventListener("change", updateData)
					for (var c in colors) {
						var option = document.createElement("option")
							option.value = option.innerText = c
						select.appendChild(option)
					}
					label.appendChild(select)

					var input = document.createElement("input")
						input.id = "fieldShadeInput"
						input.addEventListener("change", updateData)
						input.type = "range"
						input.min = 0
						input.max = 4
						input.step = 1
					label.appendChild(input)

					var hr = document.createElement("hr")
					menu.appendChild(hr)

				// structure
					var header  = document.createElement("h2")
						header.id = header.innerText = "structure"
					menu.appendChild(header)

					var label  = document.createElement("label")
						label.innerText = "shape"
					menu.appendChild(label)
					var select = document.createElement("select")
						select.id = "structureSelect"
						select.addEventListener("change", updateData)
					for (var s in structures) {
						var option = document.createElement("option")
							option.value = option.innerText = structures[s]
						select.appendChild(option)
					}
					label.appendChild(select)

					var input = document.createElement("input")
						input.id = "sectionCountInput"
						input.addEventListener("change", updateData)
						input.type = "number"
						input.min = 1
						input.max = 50
						input.step = 1
					label.appendChild(input)

					var label  = document.createElement("label")
						label.innerText = "scale"
					menu.appendChild(label)
					var input = document.createElement("input")
						input.id = "sectionFactorInput"
						input.addEventListener("change", updateData)
						input.type = "range"
						input.min = -10
						input.max = 10
						input.step = 1
					label.appendChild(input)

					var label  = document.createElement("label")
						label.innerText = "rotation"
					menu.appendChild(label)
					var input = document.createElement("input")
						input.id = "sectionRotationInput"
						input.addEventListener("change", updateData)
						input.type = "number"
						input.min = 0
						input.max = 360
						input.step = 1
					label.appendChild(input)

					for (var s in colorSlots) {
						var label  = document.createElement("label")
							label.innerText = colorSlots[s] + " color"
						menu.appendChild(label)
						var select = document.createElement("select")
							select.id = colorSlots[s] + "HueSelect"
							select.addEventListener("change", updateData)
						for (var c in colors) {
							var option = document.createElement("option")
								option.value = option.innerText = c
							select.appendChild(option)
						}
						label.appendChild(select)

						var input = document.createElement("input")
							input.id = colorSlots[s] + "ShadeInput"
							input.addEventListener("change", updateData)
							input.type = "range"
							input.min = 0
							input.max = 4
							input.step = 1
						label.appendChild(input)
					}

					var hr = document.createElement("hr")
					menu.appendChild(hr)

				// seal
					var header  = document.createElement("h2")
						header.id = header.innerText = "seal"
					menu.appendChild(header)

					var label  = document.createElement("label")
						label.innerText = "shape"
					menu.appendChild(label)
					var select = document.createElement("select")
						select.id = "sealSelect"
						select.addEventListener("change", updateData)
						for (var s in symbols) {
							var option = document.createElement("option")
								option.value = option.innerText = s
							select.appendChild(option)
						}
					label.appendChild(select)

					var label  = document.createElement("label")
						label.innerText = "color"
					menu.appendChild(label)
					var select = document.createElement("select")
						select.id = "sealHueSelect"
						select.addEventListener("change", updateData)
					for (var c in colors) {
						var option = document.createElement("option")
							option.value = option.innerText = c
						select.appendChild(option)
					}
					label.appendChild(select)

					var input = document.createElement("input")
						input.id = "sealShadeInput"
						input.addEventListener("change", updateData)
						input.type = "range"
						input.min = 0
						input.max = 4
						input.step = 1
					label.appendChild(input)

					var label  = document.createElement("label")
						label.innerText = "layers"
					menu.appendChild(label)
					var input = document.createElement("input")
						input.id = "sealLayersInput"
						input.addEventListener("change", updateData)
						input.type = "number"
						input.min = 1
						input.max = 5
						input.step = 1
					label.appendChild(input)

					var label  = document.createElement("label")
						label.innerText = "size"
					menu.appendChild(label)
					var input = document.createElement("input")
						input.id = "sealSizeInput"
						input.addEventListener("change", updateData)
						input.type = "number"
						input.min = 0
						input.max = 1000
						input.step = 1
					label.appendChild(input)

					var label  = document.createElement("label")
						label.innerText = "rotation"
					menu.appendChild(label)
					var input = document.createElement("input")
						input.id = "sealRotationInput"
						input.addEventListener("change", updateData)
						input.type = "number"
						input.min = 0
						input.max = 360
						input.step = 1
					label.appendChild(input)

					var label  = document.createElement("label")
						label.innerText = "positions"
					menu.appendChild(label)
					var element = document.createElement("div")
						element.id = "sealPositionsContainer"
					for (var y = 6; y >= 0; y--) {
						for (var x = 0; x < 7; x++) {
							var checkbox = document.createElement("input")
								checkbox.type = "checkbox"
								checkbox.name = "sealPositionsCheckbox"
								checkbox.value = x + "," + y
								checkbox.addEventListener("change", updateData)
							element.appendChild(checkbox)
						}
					}
					label.appendChild(element)

					var hr = document.createElement("hr")
					menu.appendChild(hr)

				// ring
					var header  = document.createElement("h2")
						header.id = header.innerText = "ring"
					menu.appendChild(header)

					var label  = document.createElement("label")
						label.innerText = "shape"
					menu.appendChild(label)
					var select = document.createElement("select")
						select.id = "ringSymbolSelect"
						select.addEventListener("change", updateData)
					for (var s in symbols) {
						var option = document.createElement("option")
							option.value = option.innerText = s
						select.appendChild(option)
					}
					label.appendChild(select)

					var label  = document.createElement("label")
						label.innerText = "color"
					menu.appendChild(label)
					var select = document.createElement("select")
						select.id = "ringHueSelect"
						select.addEventListener("change", updateData)
					for (var c in colors) {
						var option = document.createElement("option")
							option.value = option.innerText = c
						select.appendChild(option)
					}
					label.appendChild(select)

					var input = document.createElement("input")
						input.id = "ringShadeInput"
						input.addEventListener("change", updateData)
						input.type = "range"
						input.min = 0
						input.max = 4
						input.step = 1
					label.appendChild(input)

					var label  = document.createElement("label")
						label.innerText = "count"
					menu.appendChild(label)
					var input = document.createElement("input")
						input.id = "ringCountInput"
						input.addEventListener("change", updateData)
						input.type = "number"
						input.min = 0
						input.max = 100
						input.step = 1
					label.appendChild(input)

					var label  = document.createElement("label")
						label.innerText = "size"
					menu.appendChild(label)
					var input = document.createElement("input")
						input.id = "ringSizeInput"
						input.addEventListener("change", updateData)
						input.type = "number"
						input.min = 0
						input.max = 1000
						input.step = 1
					label.appendChild(input)

					var input = document.createElement("input")
						input.id = "ringRadiusInput"
						input.addEventListener("change", updateData)
						input.type = "number"
						input.min = 0
						input.max = 1000
						input.step = 1
					label.appendChild(input)

					var label  = document.createElement("label")
						label.innerText = "rotation"
					menu.appendChild(label)
					var input = document.createElement("input")
						input.id = "ringRotationInput"
						input.addEventListener("change", updateData)
						input.type = "number"
						input.min = 0
						input.max = 360
						input.step = 1
					label.appendChild(input)

					var label  = document.createElement("label")
						label.innerText = "positions"
					menu.appendChild(label)
					var element = document.createElement("div")
						element.id = "ringPositionsContainer"
					for (var y = 6; y >= 0; y--) {
						for (var x = 0; x < 7; x++) {
							var checkbox = document.createElement("input")
								checkbox.type = "checkbox"
								checkbox.name = "ringPositionsCheckbox"
								checkbox.value = x + "," + y
								checkbox.addEventListener("change", updateData)
							element.appendChild(checkbox)
						}
					}
					label.appendChild(element)

					var hr = document.createElement("hr")
					menu.appendChild(hr)

				// symbol
					var header  = document.createElement("h2")
						header.id = header.innerText = "symbol"
					menu.appendChild(header)

					var label  = document.createElement("label")
						label.innerText = "shape"
					menu.appendChild(label)
					var select = document.createElement("select")
						select.id = "symbolSelect"
						select.addEventListener("change", updateData)
					for (var s in symbols) {
						var option = document.createElement("option")
							option.value = option.innerText = s
						select.appendChild(option)
					}
					label.appendChild(select)

					var label  = document.createElement("label")
						label.innerText = "color"
					menu.appendChild(label)
					var select = document.createElement("select")
						select.id = "symbolHueSelect"
						select.addEventListener("change", updateData)
					for (var c in colors) {
						var option = document.createElement("option")
							option.value = option.innerText = c
						select.appendChild(option)
					}
					label.appendChild(select)

					var input = document.createElement("input")
						input.id = "symbolShadeInput"
						input.addEventListener("change", updateData)
						input.type = "range"
						input.min = 0
						input.max = 4
						input.step = 1
					label.appendChild(input)

					var label  = document.createElement("label")
						label.innerText = "size"
					menu.appendChild(label)
					var input = document.createElement("input")
						input.id = "symbolSizeInput"
						input.addEventListener("change", updateData)
						input.type = "number"
						input.min = 0
						input.max = 1000
						input.step = 1
					label.appendChild(input)

					var label  = document.createElement("label")
						label.innerText = "rotation"
					menu.appendChild(label)
					var input = document.createElement("input")
						input.id = "symbolRotationInput"
						input.addEventListener("change", updateData)
						input.type = "number"
						input.min = 0
						input.max = 360
						input.step = 1
					label.appendChild(input)

					var label  = document.createElement("label")
						label.innerText = "positions"
					menu.appendChild(label)
					var element = document.createElement("div")
						element.id = "symbolPositionsContainer"
					for (var y = 6; y >= 0; y--) {
						for (var x = 0; x < 7; x++) {
							var checkbox = document.createElement("input")
								checkbox.type = "checkbox"
								checkbox.name = "symbolPositionsCheckbox"
								checkbox.value = x + "," + y
								checkbox.addEventListener("change", updateData)
							element.appendChild(checkbox)
						}
					}
					label.appendChild(element)

					var hr = document.createElement("hr")
					menu.appendChild(hr)

				// start
					randomizeData()
					updateMenu()
					createFlag()
			}

		/* updateMenu */
			function updateMenu() {
				var keys = Object.keys(data)
				for (var k in keys) {
					// checkboxes
						if (["sealPositions", "ringPositions", "symbolPositions"].includes(keys[k])) {
							var coordinates = data[keys[k]]
							var elements = document.querySelectorAll("input[name='" + keys[k] + "Checkbox']")
								elements.forEach(function(element) {
									console.log(element)
									if (coordinates.includes(element.value)) {
										element.setAttribute("checked", true)
									}
									else {
										element.removeAttribute("checked")
									}
								})
						}

					// inputs & selects
						else {
							var element = document.getElementById(keys[k] + "Select") || document.getElementById(keys[k] + "Input")
							if (element) {
								element.value = data[keys[k]]
							}
						}
				}
			}

	/*** data ***/
		/* clearData */
			document.getElementById("clear").addEventListener(on.click, clearData)
			function clearData() {
				data = {
					// field
						fieldHue:  "transparent",
						fieldShade: 3,

					// structure
						structure: "solid",
						sectionCount: 1,
						sectionFactor: 0,
						sectionRotation: 0,

					// colors
						primaryHue: "transparent",
						primaryShade: 0,
						secondaryHue: "transparent",
						secondaryShade: 0,
						tertiaryHue: "transparent",
						tertiaryShade: 0,
						quarternaryHue: "transparent",
						quarternaryShade: 0,
						quintaryHue: "transparent",
						quintaryShade: 0,

					// seal
						seal: "none",
						sealHue: "transparent",
						sealShade: 0,
						sealSize: 100,
						sealLayers: 1,
						sealRotation: 0,
						sealPositions: [],

					// ring
						ringSymbol:  "none",
						ringHue:  "transparent",
						ringShade: 0,
						ringCount: 8,
						ringSize: 50,
						ringRadius: 50,
						ringRotation: 0,
						ringPositions: [],

					// symbols
						symbol: "none",
						symbolHue: "transparent",
						symbolShade: 0,
						symbolSize: 50,
						symbolRotation: 0,
						symbolPositions: [],
				}

				updateMenu()
				createFlag()
			}

		/* randomizeData */
			document.getElementById("random").addEventListener(on.click, randomizeData)
			function randomizeData() {
				data = {
					// field
						fieldHue:  chooseRandom(Object.keys(colors)),
						fieldShade: Math.floor(Math.random() * 5),

					// structure
						structure: chooseRandom(structures),
						sectionCount: Math.floor(Math.random() * 13) + 1,
						sectionFactor: Math.floor(Math.random() * 7) - 3,
						sectionRotation: chooseRandom([0,0,0,0,30,45,60,90,90,180,180,270,270,300,315,330]),

					// colors
						primaryHue: chooseRandom(Object.keys(colors)),
						primaryShade: Math.floor(Math.random() * 5),
						secondaryHue: chooseRandom(Object.keys(colors)),
						secondaryShade: Math.floor(Math.random() * 5),
						tertiaryHue: Math.floor(Math.random() * 2) ? "transparent" : chooseRandom(Object.keys(colors)),
						tertiaryShade: Math.floor(Math.random() * 5),
						quarternaryHue: Math.floor(Math.random() * 3) ? "transparent" : chooseRandom(Object.keys(colors)),
						quarternaryShade: Math.floor(Math.random() * 5),
						quintaryHue: Math.floor(Math.random() * 4) ? "transparent" : chooseRandom(Object.keys(colors)),
						quintaryShade: Math.floor(Math.random() * 5),

					// seal
						seal: Math.floor(Math.random() * 2) ? "none" : chooseRandom(Object.keys(symbols)),
						sealHue: chooseRandom(Object.keys(colors)),
						sealShade: Math.floor(Math.random() * 5),
						sealLayers: Math.floor(Math.random() * 5),
						sealSize: Math.floor(Math.random() * 5) * 50 + 50,
						sealRotation: chooseRandom([0,0,0,0,30,45,60,90,90,180,180,270,270,300,315,330]),
						sealPositions: chooseRandom([
							["3,3"],
							["1,5"],
							["0,6","3,6","6,6","1,5","3,5","5,5","2,4","3,4","4,4","0,3","1,3","2,3","3,3","4,3","5,3","6,3","2,2","3,2","4,2","1,1","3,1","5,1","0,0","3,0","6,0"],
							["0,6","6,6","1,5","5,5","2,4","4,4","3,3","2,2","4,2","1,1","5,1","0,0","6,0"],
							["3,6","3,5","3,4","0,3","1,3","2,3","3,3","4,3","5,3","6,3","3,2","3,1","3,0"],
							["0,6","2,6","4,6","6,6","1,5","3,5","5,5","0,4","2,4","4,4","6,4","1,3","3,3","5,3","0,2","2,2","4,2","6,2","1,1","3,1","5,1","0,0","2,0","4,0","6,0"],
							["1,5","5,5","3,3","1,1","5,1"],
							["3,5","1,3","5,3","3,1"],
							["1,3"],
							["0,4","1,4","2,4","0,3","1,3","2,3","0,2","1,2","2,2"],
							["0,6","1,6","2,6","0,5","1,5","2,5","0,4","1,4","2,4"],
							["2,4","3,4","4,4","2,3","3,3","4,3","2,2","3,2","4,2"],
							["3,5","2,4","3,4","4,4","1,3","2,3","3,3","4,3","5,3","2,2","3,2","4,2","3,1"]
						]),

					// ring
						ringSymbol: Math.floor(Math.random() * 4) ? "none" : chooseRandom(Object.keys(symbols)),
						ringHue:  chooseRandom(Object.keys(colors)),
						ringShade: Math.floor(Math.random() * 5),
						ringCount: Math.floor(Math.random() * 25),
						ringSize: Math.floor(Math.random() * 5) * 50 + 50,
						ringRadius: Math.floor(Math.random() * 5) * 50 + 50,
						ringRotation: chooseRandom([0,0,0,0,30,45,60,90,90,180,180,270,270,300,315,330]),
						ringPositions: chooseRandom([
							["3,3"],
							["1,5"],
							["0,6","3,6","6,6","1,5","3,5","5,5","2,4","3,4","4,4","0,3","1,3","2,3","3,3","4,3","5,3","6,3","2,2","3,2","4,2","1,1","3,1","5,1","0,0","3,0","6,0"],
							["0,6","6,6","1,5","5,5","2,4","4,4","3,3","2,2","4,2","1,1","5,1","0,0","6,0"],
							["3,6","3,5","3,4","0,3","1,3","2,3","3,3","4,3","5,3","6,3","3,2","3,1","3,0"],
							["0,6","2,6","4,6","6,6","1,5","3,5","5,5","0,4","2,4","4,4","6,4","1,3","3,3","5,3","0,2","2,2","4,2","6,2","1,1","3,1","5,1","0,0","2,0","4,0","6,0"],
							["1,5","5,5","3,3","1,1","5,1"],
							["3,5","1,3","5,3","3,1"],
							["1,3"],
							["0,4","1,4","2,4","0,3","1,3","2,3","0,2","1,2","2,2"],
							["0,6","1,6","2,6","0,5","1,5","2,5","0,4","1,4","2,4"],
							["2,4","3,4","4,4","2,3","3,3","4,3","2,2","3,2","4,2"],
							["3,5","2,4","3,4","4,4","1,3","2,3","3,3","4,3","5,3","2,2","3,2","4,2","3,1"]
						]),

					// symbols
						symbol: Math.floor(Math.random() * 2) ? "none" : chooseRandom(Object.keys(symbols)),
						symbolHue: chooseRandom(Object.keys(colors)),
						symbolShade: Math.floor(Math.random() * 5),
						symbolSize: Math.floor(Math.random() * 5) * 50 + 50,
						symbolRotation: chooseRandom([0,0,0,0,30,45,60,90,90,180,180,270,270,300,315,330]),
						symbolPositions: chooseRandom([
							["3,3"],
							["1,5"],
							["0,6","3,6","6,6","1,5","3,5","5,5","2,4","3,4","4,4","0,3","1,3","2,3","3,3","4,3","5,3","6,3","2,2","3,2","4,2","1,1","3,1","5,1","0,0","3,0","6,0"],
							["0,6","6,6","1,5","5,5","2,4","4,4","3,3","2,2","4,2","1,1","5,1","0,0","6,0"],
							["3,6","3,5","3,4","0,3","1,3","2,3","3,3","4,3","5,3","6,3","3,2","3,1","3,0"],
							["0,6","2,6","4,6","6,6","1,5","3,5","5,5","0,4","2,4","4,4","6,4","1,3","3,3","5,3","0,2","2,2","4,2","6,2","1,1","3,1","5,1","0,0","2,0","4,0","6,0"],
							["1,5","5,5","3,3","1,1","5,1"],
							["3,5","1,3","5,3","3,1"],
							["1,3"],
							["0,4","1,4","2,4","0,3","1,3","2,3","0,2","1,2","2,2"],
							["0,6","1,6","2,6","0,5","1,5","2,5","0,4","1,4","2,4"],
							["2,4","3,4","4,4","2,3","3,3","4,3","2,2","3,2","4,2"],
							["3,5","2,4","3,4","4,4","1,3","2,3","3,3","4,3","5,3","2,2","3,2","4,2","3,1"]
						]),
				}

				updateMenu()
				createFlag()
			}

		/* updateData */
			function updateData() {
				// field
					data.fieldHue           =        document.getElementById("fieldHueSelect").value
					data.fieldShade         = Number(document.getElementById("fieldShadeInput").value)

				// structure
					data.structure          =        document.getElementById("structureSelect").value
					data.sectionCount       = Number(document.getElementById("sectionCountInput").value)
					data.sectionFactor      = Number(document.getElementById("sectionFactorInput").value)
					data.sectionRotation    = Number(document.getElementById("sectionRotationInput").value)

					data.primaryHue         =        document.getElementById("primaryHueSelect").value
					data.primaryShade       = Number(document.getElementById("primaryShadeInput").value)
					data.secondaryHue       =        document.getElementById("secondaryHueSelect").value
					data.secondaryShade     = Number(document.getElementById("secondaryShadeInput").value)
					data.tertiaryHue        =        document.getElementById("tertiaryHueSelect").value
					data.tertiaryShade      = Number(document.getElementById("tertiaryShadeInput").value)
					data.quarternaryHue     =        document.getElementById("quarternaryHueSelect").value
					data.quarternaryShade   = Number(document.getElementById("quarternaryShadeInput").value)
					data.quintaryHue        =        document.getElementById("quintaryHueSelect").value
					data.quintaryShade      = Number(document.getElementById("quintaryShadeInput").value)

				// seal
					data.seal               =        document.getElementById("sealSelect").value
					data.sealHue            =        document.getElementById("sealHueSelect").value
					data.sealShade          = Number(document.getElementById("sealShadeInput").value)
					data.sealLayers         = Number(document.getElementById("sealLayersInput").value)
					data.sealSize           = Number(document.getElementById("sealSizeInput").value)
					data.sealRotation       = Number(document.getElementById("sealRotationInput").value)
					data.sealPositions      = Array.from(document.querySelectorAll("input[name='sealPositionsCheckbox']:checked")).map(function(element) { return element.value })

				// ring
					data.ringSymbol         =        document.getElementById("ringSymbolSelect").value
					data.ringHue            =        document.getElementById("ringHueSelect").value
					data.ringShade          = Number(document.getElementById("ringShadeInput").value)
					data.ringCount          = Number(document.getElementById("ringCountInput").value)
					data.ringSize           = Number(document.getElementById("ringSizeInput").value)
					data.ringRadius         = Number(document.getElementById("ringRadiusInput").value)
					data.ringRotation       = Number(document.getElementById("ringRotationInput").value)
					data.ringPositions      = Array.from(document.querySelectorAll("input[name='ringPositionsCheckbox']:checked")).map(function(element) { return element.value })

				// symbols
					data.symbol             =        document.getElementById("symbolSelect").value
					data.symbolHue          =        document.getElementById("symbolHueSelect").value
					data.symbolShade        = Number(document.getElementById("symbolShadeInput").value)
					data.symbolSize         = Number(document.getElementById("symbolSizeInput").value)
					data.symbolRotation     = Number(document.getElementById("symbolRotationInput").value)
					data.symbolPositions    = Array.from(document.querySelectorAll("input[name='symbolPositionsCheckbox']:checked")).map(function(element) { return element.value })

				// draw
					createFlag()
			}

	/*** files ***/
		/* downloadFile */
			document.getElementById("download").addEventListener(on.click, downloadFile)
			function downloadFile() {
				//  package up
					var downloadLink = document.createElement("a")
						downloadLink.id = "download-link"
						downloadLink.setAttribute("href", "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data)))
						downloadLink.setAttribute("download", "flagMaker_" + (new Date().getTime()) + ".json")
						downloadLink.addEventListener(on.click, function() {
							var downloadLink = document.getElementById("download-link")
							document.body.removeChild(downloadLink)
						})
				
				// click
					document.body.appendChild(downloadLink)
					document.getElementById("download-link").click()
			}

		/* uploadFile */
			document.getElementById("upload-outer").addEventListener(on.click, uploadFile)
			function uploadFile(event) {
				document.getElementById("upload").addEventListener("change", function(event) {
					var upload = document.getElementById("upload")

					if (upload.value && upload.value.length) {
						var reader = new FileReader()
							reader.readAsText(event.target.files[0])
							reader.onload = function(event) {
								try {
									data = JSON.parse(String(event.target.result))
									updateMenu()
									createFlag()
								}
								catch (error) { console.log(error) }
							}
					}
				})
			}

	/*** tools ***/
		/* chooseRandom */
			function chooseRandom(options) {
				if (!Array.isArray(options)) {
					return false
				}
				else {
					return options[Math.floor(Math.random() * options.length)]
				}
			}

		/* clearCanvas */
			function clearCanvas() {
				context.clearRect(0, 0, canvas.width, canvas.height)
			}

		/* rotateCanvas */
			function rotateCanvas(x, y, degrees, callback) {
				// rotate
					context.translate(x, y)
					context.rotate(degrees * Math.PI / 180)
					context.translate(-x, -y)

				// do whatever
					callback()

				// rotate back
					context.translate(x, y)
					context.rotate(-degrees * Math.PI / 180)
					context.translate(-x, -y)
			}

	/*** canvas ***/
		/* drawLine */
			function drawLine(x1, y1, x2, y2, options) {
				// parameters
					options = options || {}
					context.beginPath()
					context.strokeStyle = options.gradient ? drawGradient(options) : (options.color || "transparent")
					context.lineWidth   = options.border || 1
					context.shadowBlur  = options.blur ? options.blur : 0
					context.shadowColor = options.shadow ? options.shadow : "transparent"
					context.globalAlpha = options.opacity || 1
					
				// draw
					context.moveTo(x1, canvas.height - y1)
					context.lineTo(x2, canvas.height - y2)
					context.stroke()
			}

		/* drawCircle */
			function drawCircle(x, y, radius, options) {
				// parameters
					options = options || {}
					context.beginPath()
					context.fillStyle   = options.gradient ? drawGradient(options) : (options.color || "transparent")
					context.strokeStyle = options.gradient ? drawGradient(options) : (options.color || "transparent")
					context.lineWidth   = options.border || 1
					context.shadowBlur  = options.blur ? options.blur : 0
					context.shadowColor = options.shadow ? options.shadow : "transparent"
					context.globalAlpha = options.opacity || 1

				// draw
					context.arc(x, canvas.height - y, radius, (options.start || 0), (options.end || (2 * Math.PI)))
					if (options.border) {
						context.stroke()
					}
					else {
						context.fill()
					}
			}

		/* drawTriangle */
			function drawTriangle(x1, y1, x2, y2, x3, y3, options) {
				// parameters
					options = options || {}
					context.beginPath()
					context.fillStyle   = options.gradient ? drawGradient(options) : (options.color || "transparent")
					context.lineWidth   = options.border || 1
					context.shadowBlur  = options.blur ? options.blur : 0
					context.shadowColor = options.shadow ? options.shadow : "transparent"
					context.globalAlpha = options.opacity || 1

				// draw
					context.moveTo(x1, canvas.height - y1)
					context.lineTo(x2, canvas.height - y2)
					context.lineTo(x3, canvas.height - y3)
					context.lineTo(x1, canvas.height - y1)
					context.closePath()
					context.fill()
			}

		/* drawRectangle */
			function drawRectangle(x, y, width, height, options) {
				// parameters
					options = options || {}
					context.beginPath()
					context.fillStyle   = options.gradient ? drawGradient(options) : (options.color || "transparent")
					context.lineWidth   = options.border || 1
					context.shadowBlur  = options.blur ? options.blur : 0
					context.shadowColor = options.shadow ? options.shadow : "transparent"
					context.globalAlpha = options.opacity || 1

				// draw
					if (options.radii) {
						context.moveTo(x + options.radii.topLeft, canvas.height - y - height)
						context.lineTo(x + width - options.radii.topRight, canvas.height - y - height)
						context.quadraticCurveTo(x + width, canvas.height - y - height, x + width, canvas.height - y - height + options.radii.topRight)
						context.lineTo(x + width, canvas.height - y - options.radii.bottomRight)
						context.quadraticCurveTo(x + width, canvas.height - y, x + width - options.radii.bottomRight, canvas.height - y)
						context.lineTo(x + options.radii.bottomLeft, canvas.height - y)
						context.quadraticCurveTo(x, canvas.height - y, x, canvas.height - y - options.radii.bottomLeft)
						context.lineTo(x, canvas.height - y - height + options.radii.topLeft)
						context.quadraticCurveTo(x, canvas.height - y - height, x + options.radii.topLeft, canvas.height - y - height)
						context.closePath()
						context.fill()
					}
					else {
						context.fillRect(x, canvas.height - y, width, -1 * height)
					}
			}

		/* drawShape */
			function drawShape(x, y, width, height, options) {
				// parameters
					options = options || {}
					context.beginPath()
					context.fillStyle   = options.gradient ? drawGradient(options) : (options.color || "transparent")
					context.lineWidth   = options.border || 1
					context.shadowBlur  = options.blur ? options.blur : 0
					context.shadowColor = options.shadow ? options.shadow : "transparent"
					context.globalAlpha = options.opacity || 1

				// coordinates
					options.coordinates = options.coordinates.split(/\s?,\s?/)

				// draw
					for (var c in options.coordinates) {
						var pair = options.coordinates[c].split(/\s+/)
						
						if (!c) {
							context.moveTo(x + (width * Number(pair[0].replace("%", "")) / 100), (y + (height * Number(pair[1].replace("%", "")) / 100)))
						}
						else {
							context.lineTo(x + (width * Number(pair[0].replace("%", "")) / 100), (y + (height * Number(pair[1].replace("%", "")) / 100)))
						}
					}
					context.closePath()
					context.fill()
			}

		/* drawText */
			function drawText(x, y, text, options) {
				// variables
					options = options || {}
					context.font = (options.style ? options.style + " " : "") + (options.size || 32) + "px " + (options.font || font)
					context.fillStyle   = options.gradient ? drawGradient(options) : (options.color || "transparent")
					context.textAlign   = options.alignment || "center"
					context.shadowBlur  = options.blur ? options.blur : 0
					context.shadowColor = options.shadow ? options.shadow : "transparent"
					context.globalAlpha = options.opacity || 1


				// draw
					context.fillText((text || ""), x, canvas.height - y)
			}

		/* drawGradient */
			function drawGradient(options) {
				// radial
					if (options.gradient.r1 || options.gradient.r2) {
						var gradient = context.createRadialGradient(options.gradient.x1, options.gradient.y1, options.gradient.r1, options.gradient.x2, options.gradient.y2, options.gradient.r2)
					}

				// linear
					else {
						var gradient = context.createLinearGradient(options.gradient.x1, canvas.height - options.gradient.y1, options.gradient.x2, canvas.height - options.gradient.y2)
					}

				// colors
					var gradientColors = Object.keys(options.gradient.colors)
					for (var c in gradientColors) {
						gradient.addColorStop(Number(gradientColors[c]), options.gradient.colors[gradientColors[c]])
					}

				return gradient
			}

	/*** flag ***/
		/* createFlag */
			function createFlag() {
				// field
					clearCanvas()
					addField(data)

				// structure
					addStructure(data)

				// seal
					addSeals(data)

				// ring
					addRing(data)

				// symbols
					addSymbols(data)
			}

		/* addField */
			function addField(data) {
				drawRectangle(0, 0, canvas.width, canvas.height, {color: colors[data.fieldHue][data.fieldShade]})
			}

		/* addStructure */
			function addStructure(data) {
				// colors
					var structureColors = []
					if (data.primaryHue !== "transparent")     { structureColors.push(colors[data.primaryHue][data.primaryShade]) }
					if (data.secondaryHue !== "transparent")   { structureColors.push(colors[data.secondaryHue][data.secondaryShade]) }
					if (data.tertiaryHue !== "transparent")    { structureColors.push(colors[data.tertiaryHue][data.tertiaryShade]) }
					if (data.quarternaryHue !== "transparent") { structureColors.push(colors[data.quarternaryHue][data.quarternaryShade]) }
					if (data.quintaryHue !== "transparent")    { structureColors.push(colors[data.quintaryHue][data.quintaryShade]) }

					var i = 0
					while (structureColors.length < data.sectionCount + 3) {
						structureColors.push(structureColors[i])
						i++
					}

				// solid
					if (data.structure == "solid") {
						drawRectangle(0, 0, canvas.width, canvas.height, {color: structureColors[0]})
					}

				// layers
					else if (["square", "diamond", "x", "cross", "jack"].includes(data.structure)) {
						rotateCanvas(canvas.width / 2, canvas.height / 2, data.sectionRotation, function() {
							for (var i = 0; i < data.sectionCount; i++) {
								drawShape(i / data.sectionCount * canvas.width  / 2 * (1 + data.sectionFactor / 10) - canvas.width  * (data.sectionFactor / 10) / 2,
									      i / data.sectionCount * canvas.height / 2 * (1 + data.sectionFactor / 10) - canvas.height * (data.sectionFactor / 10) / 2,
									(canvas.width * ((data.sectionCount - i) / (data.sectionCount))) * (1 + data.sectionFactor / 10),
									(canvas.height * ((data.sectionCount - i) / (data.sectionCount))) * (1 + data.sectionFactor / 10),
									{coordinates: symbols[data.structure], color: structureColors[i]})
							}
						})
					}

				// checkers
					else if (data.structure == "checkers") {
						rotateCanvas(canvas.width / 2, canvas.height / 2, data.sectionRotation, function() {
							var checkerCount = data.sectionCount < 4 ? 1 : data.sectionCount < 9 ? 4 : data.sectionCount < 16 ? 9 : data.sectionCount < 25 ? 16 : data.sectionCount < 36 ? 25 : data.sectionCount < 49 ? 36 : 49
							var sideCount = Math.pow(checkerCount, 0.5)
							var width  = canvas.width  / sideCount
							var height = canvas.height / sideCount

							var i = 0
							for (var y = 0; y < sideCount; y++) {
								for (var x = 0; x < sideCount; x++) {
									drawRectangle(width * x * (1 + data.sectionFactor / 10) - canvas.width  * (data.sectionFactor / 10) / 2,
										         height * y * (1 + data.sectionFactor / 10) - canvas.height * (data.sectionFactor / 10) / 2,
										width  * (1 + data.sectionFactor / 10),
										height * (1 + data.sectionFactor / 10),
										{color: structureColors[i]})
									i++
								}

								if (checkerCount % 2 == 0) {
									i++
								}
							}
						})
					}

				// stripes
					else if (data.structure == "horizontal-stripes") {
						rotateCanvas(canvas.width / 2, canvas.height / 2, data.sectionRotation, function() {
							var i = 0
							var count = 0
							while (count < data.sectionCount) {
								drawRectangle(-canvas.width,
									canvas.height - ((i + 1) * canvas.height / data.sectionCount) - canvas.height * (data.sectionFactor / 10) / data.sectionCount / 2,
									3 * canvas.width,
									canvas.height / data.sectionCount * (1 + data.sectionFactor / 10),
									{color: structureColors[i]})

								count++
								i = (count % 2 == 0) ? (count / 2) : data.sectionCount - ((count + 1) / 2)
							}
						})
					}

					else if (data.structure == "vertical-stripes") {
						rotateCanvas(canvas.width / 2, canvas.height / 2, data.sectionRotation, function() {
							var i = 0
							var count = 0
							while (count < data.sectionCount) {
								drawRectangle((i * canvas.width / data.sectionCount) - canvas.width * (data.sectionFactor / 10) / data.sectionCount / 2,
									-canvas.height,
									canvas.width / data.sectionCount * (1 + data.sectionFactor / 10),
									3 * canvas.height,
									{color: structureColors[i]})
								
								count++
								i = (count % 2 == 0) ? (count / 2) : data.sectionCount - ((count + 1) / 2)
							}
						})
					}
			}

		/* addSeals */
			function addSeals(data) {
				if (data.seal !== "none") {
					for (var i in data.sealPositions) {
						var x = Number(data.sealPositions[i].split(",")[0]) * (canvas.width  / 7) + (canvas.width  / 14)
						var y = Number(data.sealPositions[i].split(",")[1]) * (canvas.height / 7) + (canvas.height / 14)

						rotateCanvas(x, canvas.height - y, data.sealRotation, function() {
							for (var l = 1; l <= data.sealLayers; l++) {
								var color = (l % 2 == 0) ? colors[data.fieldHue][data.fieldShade] : colors[data.sealHue][data.sealShade]
								if (data.seal == "circle") {
									drawCircle(x, y, (data.sealSize / 2) * (5 - l) / 5, {color: color})
								}
								else if (data.seal == "ring") {
									drawCircle(x, y, (data.sealSize / 2) * (5 - l) / 5, {color: color, border: data.sealSize / 10})
								}
								else {
									drawShape(x - (data.sealSize / 2 * (5 - l) / 5), canvas.height - (y + (data.sealSize / 2 * (5 - l) / 5)), data.sealSize * (5 - l) / 5, data.sealSize * (5 - l) / 5, {color: color, coordinates: symbols[data.seal]})
								}
							}
						})
					}
				}
			}

		/* addRing */
			function addRing(data) {
				if (data.ringSymbol !== "none") {
					for (var i in data.ringPositions) {
						var x = Number(data.ringPositions[i].split(",")[0]) * (canvas.width  / 7) + (canvas.width  / 14)
						var y = Number(data.ringPositions[i].split(",")[1]) * (canvas.height / 7) + (canvas.height / 14)
						var color = colors[data.ringHue][data.ringShade]

						for (var i = 1; i <= data.ringCount; i++) {
							var rotation = 360 / data.ringCount * i

								context.translate(-(data.ringRadius / 2), -(data.ringRadius / 2))
								rotateCanvas(x + (data.ringRadius / 2), canvas.height - y + (data.ringRadius / 2), rotation, function() {
									rotateCanvas(x, canvas.height - y, rotation + data.ringRotation, function() {
										if (data.ringSymbol == "circle") {
											drawCircle(x, y, (data.ringSize / 2), {color: color})
										}
										else if (data.ringSymbol == "ring") {
											drawCircle(x, y, (data.ringSize / 2), {color: color, border: data.ringSize / 14})
										}
										else {
											drawShape(x - (data.ringSize / 2), canvas.height - (y + (data.ringSize / 2)), data.ringSize, data.ringSize, {color: color, coordinates: symbols[data.ringSymbol]})
										}
									})
								})
								context.translate((data.ringRadius / 2), (data.ringRadius / 2))
						}
					}
				}
			}

		/* addSymbols */
			function addSymbols(data) {
				if (data.symbol !== "none") {
					for (var i in data.symbolPositions) {
						var x = Number(data.symbolPositions[i].split(",")[0]) * (canvas.width  / 7) + (canvas.width  / 14)
						var y = Number(data.symbolPositions[i].split(",")[1]) * (canvas.height / 7) + (canvas.height / 14)
						var color = colors[data.symbolHue][data.symbolShade]

						rotateCanvas(x, canvas.height - y, data.symbolRotation, function() {
							if (data.symbol == "circle") {
								drawCircle(x, y, (data.symbolSize / 2), {color: color})
							}
							else if (data.symbol == "ring") {
								drawCircle(x, y, (data.symbolSize / 2), {color: color, border: data.symbolSize / 14})
							}
							else {
								drawShape(x - (data.symbolSize / 2), canvas.height - (y + (data.symbolSize / 2)), data.symbolSize, data.symbolSize, {color: color, coordinates: symbols[data.symbol]})
							}
						})
					}
				}
			}
})
