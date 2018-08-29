window.addEventListener("load", function() {

	/*** load ***/
		/* triggers */
			if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
				var on = { click: "touchstart", mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" }
			}
			else {
				var on = { click:      "click", mousedown:  "mousedown", mousemove: "mousemove", mouseup:  "mouseup" }
			}

		/* globals */
			var tool = null
			var parameter = null
			var key = null
			var defaults = window.getInstruments(true)

		/* prevention */
			document.body.ondragstart   = function() { return false }
			document.body.ondrop        = function() { return false }
			document.body.oncontextmenu = function() { return false }

		/* builds */
			buildTools()
			document.addEventListener(on.click, function() {
				if (window.audio && !window.instrument) { loadFile(null, "random") }
			})
			

	/*** tools ***/
		/* selectTool */
			Array.from(document.querySelectorAll("#switcher button")).forEach(function(b) { b.addEventListener(on.click, selectTool) })
			function selectTool(event) {
				// deselect all tools & buttons
					Array.from(document.querySelectorAll("#switcher button")).forEach(function(b) {
						b.removeAttribute("selected")
						document.getElementById(b.value).removeAttribute("selected")
					})

				// select tool & button
					event.target.setAttribute("selected", true)
					tool = document.getElementById(event.target.value)
					tool.setAttribute("selected", true)
			}

		/* buildTools */
			function buildTools() {
				buildMetaTools()
				buildPolysynthTool()
				buildWaveTool()
				buildNoiseTool()
				buildEnvelopeTool()
				buildBitcrusherTool()
				buildFilterTool()
				buildEchoTool()
				buildKeyboard()

				selectTool({target: Array.from(document.querySelectorAll("#switcher button[value='tool-meta']"))[0]})
			}

		/* setInstrument */
			function setInstrument(parameters, setup) {
				try {

					// audio
						window.instrument = buildInstrument(parameters)

					// name
						document.getElementById("tool-meta-name").value = parameters["name"] || "synthesizer"

					// polysynth
						for (var x = -12; x <= 12; x++) {
							var value = parameters["polysynth"] ? (parameters["polysynth"][x] || false) : false
							var target = document.getElementById("tool-polysynth-toggle--" + x)
							if (!target.getAttribute("selected") && value) {
								adjustPolysynthToolToggle({target: target}, setup)
							}
							else if (target.getAttribute("selected") && !value) {
								adjustPolysynthToolToggle({target: target}, setup)
							}
						}
					
					// wave
						for (var x = 1; x < 33; x++) {
							var value = parameters.imag ? (parameters.imag[x] || 0) : 0
							var target = document.getElementById("tool-wave-input--" + x)
								target.value = 100 * value
							adjustWaveToolInput({target: target}, setup)
						}
					
					// noise
						var colors = ["white", "pink", "brown"]
						for (var x in colors) {
							var value = parameters.noise ? (parameters.noise[colors[x]] || 0) : 0
							var target = document.getElementById("tool-noise-volume-input--" + colors[x])
								target.value = (100 * Number(value)) || 0
							adjustNoiseToolInput({target: target}, setup)
						}

					// envelope
						var type = ["attack", "decay", "sustain", "release"]
						for (var x in type) {
							var value = parameters.envelope ? (parameters.envelope[type[x]] || 0) : (type[x] == "sustain" ? 1 : 0)
							var target = document.getElementById("tool-envelope-input--" + type[x])
								target.value = 100 * value
							adjustEnvelopeToolInput({target: target}, setup)
						}

					// bitcrusher
						for (var x = 0; x <= 6; x++) {
							var target = document.getElementById("tool-bitcrusher-bits-toggle--" + Math.pow(2, x))
							if (parameters.bitcrusher && (parameters.bitcrusher.bits == Math.pow(2, x))) {
								if (!target.getAttribute("selected")) {
									adjustBitcrusherToolToggle({target: target}, setup)	
								}
							}
							else {
								if (target.getAttribute("selected")) {
									adjustBitcrusherToolToggle({target: target}, setup)	
								}
							}
							
							if (parameters.bitcrusher) {
								var target = document.getElementById("tool-bitcrusher-norm-input")
									target.value = Math.max(0, Math.min(1, parameters.bitcrusher.norm)) * 100
								adjustBitcrusherToolInput({target: target}, setup)
							}
						}
							
					// filters
						var filters = Array.from(document.querySelectorAll("#tool-filter-track .blob"))
						for (var x in filters) {
							deselectFilterToolBar(null, Number(filters[x].id.split("--")[1]))
						}

						for (var x in parameters.filters) {
							x = Number(x)
							var obj = (parameters.filters && parameters.filters[x]) ? parameters.filters[x] : {
								low:  440 * Math.pow(2, ((24 + 12 * (x - 0.4)) - 45) / 12),
								high: 440 * Math.pow(2, ((24 + 12 * (x + 0.4)) - 45) / 12),
								gain: 0
							}
							obj.number = x
							createFilter(null, obj)

							var target = document.getElementById("tool-filter-input--low--" + x)
								target.value = 45 + 12 * Math.log2(obj.low / 440)
							adjustFilterToolInput({target: target}, setup)

							var target = document.getElementById("tool-filter-input--high--" + x)
								target.value = 45 + 12 * Math.log2(obj.high / 440)
							adjustFilterToolInput({target: target}, setup)

							var target = document.getElementById("tool-filter-input--gain--" + x)
								target.value = obj.gain
							adjustFilterToolInput({target: target}, setup)
						}
					
					// echo
						var type = ["delay", "feedback"]
						for (var x in type) {
							var value = parameters.echo ? (parameters.echo[type[x]] || 0) : 0
							var target = document.getElementById("tool-echo-input--" + type[x])
								target.value = 100 * value
							adjustEchoToolInput({target: target}, setup)
						}
				
				}
				catch (error) {
					console.log(error)
				}
			}

	/*** bars & inputs ***/
		/* selectBar */
			Array.from(document.querySelectorAll(".bar")  ).forEach(function (p) { p.addEventListener(on.mousedown, selectBar) })
			Array.from(document.querySelectorAll(".shape")).forEach(function (p) { p.addEventListener(on.mousedown, selectBar) })
			function selectBar(event) {
				if (tool) {
					parameter = event.target
					event.target.setAttribute("selected", true)
					tool.setAttribute("grabbing", true)

					moveBar(event)
				}
			}

		/* moveBar */
			document.addEventListener(on.mousemove, moveBar)
			function moveBar(event) {
				if (tool && parameter) {
					switch (tool.id) {
						case "tool-meta":
							adjustVolumeToolBar(event)
						break
						case "tool-wave": 
							adjustWaveToolBar(event)
						break
						case "tool-noise":
							adjustNoiseToolBar(event)
						break
						case "tool-envelope":
							adjustEnvelopeToolBar(event)
						break
						case "tool-bitcrusher":
							adjustBitcrusherToolBar(event)
						break
						case "tool-filter":
							adjustFilterToolBar(event)
						break
						case "tool-echo":
							adjustEchoToolBar(event)
						break
					}
				}
			}

		/* deselectBar */
			document.addEventListener(on.mouseup,  deselectBar)
			function deselectBar(event) {
				if (tool && parameter) {
					if (tool.id == "tool-filter") {
						deselectFilterToolBar(event)
					}

					tool.removeAttribute("grabbing")
					parameter.removeAttribute("selected")
					parameter = null	
				}
			}

		/* changeInput */
			Array.from(document.querySelectorAll("input")).forEach(function (i) { i.addEventListener("change", changeInput) })
			function changeInput(event) {
				if (tool) {
					switch (tool.id) {
						case "tool-meta":
							if (event.target.id == "tool-meta-volume-input") {
								adjustVolumeToolInput(event)
							}
						break
						case "tool-wave": 
							adjustWaveToolInput(event)
						break
						case "tool-noise": 
							adjustNoiseToolInput(event)
						break
						case "tool-envelope":
							adjustEnvelopeToolInput(event)
						break
						case "tool-bitcrusher":
							adjustBitcrusherToolInput(event)
						break
						case "tool-filter":
							adjustFilterToolInput(event)
						break
						case "tool-echo":
							adjustEchoToolInput(event)
						break
					}
				}
			}

		/* changeToggle */
			Array.from(document.querySelectorAll(".toggle")).forEach(function (t) { t.addEventListener(on.click, changeToggle) })
			function changeToggle(event) {
				if (tool) {
					switch (tool.id) {
						case "tool-meta":
							adjustPowerToolToggle(event)
						break
						case "tool-polysynth":
							adjustPolysynthToolToggle(event)
						break
						case "tool-bitcrusher":
							adjustBitcrusherToolToggle(event)
						break
					}
				}
			}

	/*** tool-meta ***/
		/* buildMetaTools */
			function buildMetaTools() {
				var metaTool = document.getElementById("tool-meta")

				// file (name, save, download, select, load, upload)
					var element = document.createElement("div")
						element.id = "tool-meta-file"
						element.className = "section"
					metaTool.appendChild(element)

				// name
					var input = document.createElement("input")
						input.id = "tool-meta-name"
						input.className = "input"
						input.setAttribute("placeholder", "instrument name")
						input.value = "synthesizer"
						input.addEventListener("change", nameFile)
					element.appendChild(input)

				// download
					var input = document.createElement("button")
						input.id = "tool-meta-download"
						input.className = "button"
						input.innerHTML = '<span class="fas fa-download"></span>'
						input.addEventListener(on.click, downloadFile)
					element.appendChild(input)

				// select
					var options = window.getInstruments()

					var select = document.createElement("select")
						select.id = "tool-meta-select"
						select.className = "input"
						select.addEventListener("change", loadFile)
						for (var o in options) {
							var option = document.createElement("option")
								option.innerText = options[o]
								option.value = options[o]
							select.appendChild(option)
						}
					element.appendChild(select)

				// upload
					var input = document.createElement("label")
						input.id = "tool-meta-upload"
						input.className = "button"
						input.innerHTML = '<input id="upload-link" type="file"><span class="fas fa-upload"></span>'
						input.addEventListener(on.click, uploadFile)
					element.appendChild(input)

				// power
					var element = document.createElement("div")
						element.id = "tool-meta-volume"
						element.className = "section"
					metaTool.appendChild(element)

					var toggle = document.createElement("button")
						toggle.id = "tool-meta-power"
						toggle.className = "toggle"
						toggle.setAttribute("selected", true)
						toggle.innerHTML = '<span class="fas fa-power-off"></span>'
					element.appendChild(toggle)

				// volume
					var input = document.createElement("input")
						input.setAttribute("type", "number")
						input.setAttribute("min", 0)
						input.setAttribute("max", 100)
						input.className = "input"
						input.id = "tool-meta-volume-input"
						input.value = 50
					element.appendChild(input)

					var track = document.createElement("div")
						track.id = "tool-meta-volume-track"
						track.className = "track"
					element.appendChild(track)

					var bar = document.createElement("div")
						bar.id = "tool-meta-volume-bar"
						bar.className = "bar"
						bar.style.width = "50%"
						bar.innerHTML = 'volume&nbsp;<span class="fas fa-volume-up"></span>'
					track.appendChild(bar)
			}

		/* nameFile */
			function nameFile(event) {
				if (event.target.id == "tool-meta-name") {
					var oldName = window.instrument.parameters.name
					
					var options = Array.from(document.getElementById("tool-meta-select").querySelectorAll("option"))
					var option = options.filter(function (o) {
						return o.value == oldName
					}) || null
					if (option) {
						option.value = event.target.value
						option.innerText = event.target.value
					}

					if (window.instrument) { window.instrument.setParameters({ name: event.target.value }) }
					if (!defaults.includes(document.getElementById("tool-meta-name").value)) {
						saveFile()
					}
				}
			}

		/* saveFile */
			function saveFile(event) {
				// get data
					var name = document.getElementById("tool-meta-name").value
					if (window.localStorage.synthesizers) {
						var custom = JSON.parse(window.localStorage.synthesizers)
						if (!custom) {
							custom = {}
						}
					}
					else {
						var custom = {}
					}

				if (name !== "synthesizer") {
					// package up
						custom[name] = JSON.parse(JSON.stringify(window.instrument.parameters))
						custom[name].imag = Array.from(window.instrument.parameters.imag)
						custom[name].real = Array.from(window.instrument.parameters.real)
					
					// save
						window.localStorage.synthesizers = JSON.stringify(custom)

						if (!Array.from(document.querySelectorAll("#tool-meta-select option[value='" + name + "']")).length) {
							var option = document.createElement("option")
								option.value = option.innerText = name
							document.getElementById("tool-meta-select").appendChild(option)
						}
				}
			}

		/* downloadFile */
			function downloadFile(event) {
				// get data
					var name = document.getElementById("tool-meta-name").value.replace(/\s/g, "_")
					var file = JSON.parse(JSON.stringify(window.instrument.parameters))
						file.imag = Array.from(window.instrument.parameters.imag)
						file.real = Array.from(window.instrument.parameters.real)

				//  package up
					var downloadLink = document.createElement("a")
						downloadLink.id = "download-link"
						downloadLink.setAttribute("href", "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(file)))
						downloadLink.setAttribute("download", "toneMaker_" + name + ".json")
						downloadLink.addEventListener(on.click, function() {
							var downloadLink = document.getElementById("download-link")
							document.body.removeChild(downloadLink)
						})
				
				// click
					document.body.appendChild(downloadLink)
					document.getElementById("download-link").click()
			}

		/* loadFile */
			function loadFile(event, name) {
				// data
					var name = name || document.getElementById("tool-meta-select").value
					setInstrument((window.getInstrument(name) || {}), true)
			}

		/* uploadFile */
			function uploadFile(event) {
				document.getElementById("upload-link").addEventListener("change", function(event) {
					var upload = document.getElementById("upload-link")

					if (upload.value && upload.value.length) {
						var reader = new FileReader()
							reader.readAsText(event.target.files[0])
						reader.onload = function(event) {
							var obj = String(event.target.result)
							try {
								obj = JSON.parse(obj)
								setInstrument(obj, true)
							}
							catch (error) {
								console.log(error)
							}
						}
					}
				})
			}

		/* adjustPowerToolToggle */
			function adjustPowerToolToggle(event) {
				if (event.target.getAttribute("selected")) {
					event.target.removeAttribute("selected")
					if (window.instrument) { window.instrument.setParameters({ power: 0 }) }
				}
				else {
					event.target.setAttribute("selected", true)
					if (window.instrument) { window.instrument.setParameters({ power: 1 }) }
				}
			}

		/* adjustVolumeToolBar */
			function adjustVolumeToolBar(event) {
				// display
					var rectangle  = document.getElementById("tool-meta-volume-track").getBoundingClientRect()
					var input = document.getElementById("tool-meta-volume-input")
					var x = event.x || event.targetTouches[0].clientX

					var percentage = (x - rectangle.left) * 100 / (rectangle.width)
						percentage = Math.min(100, Math.max(0, percentage))
					parameter.style.width = percentage + "%"
					input.value = percentage

				// data
					adjustVolumeToolInput({target: input})
			}

		/* adjustVolumeToolInput */
			function adjustVolumeToolInput(event) {
				// display
					var bar = document.getElementById("tool-meta-volume-bar")
					var percentage = Number(event.target.value)
						percentage = Math.min(100, Math.max(0, percentage))
					bar.style.width = percentage + "%"

				// audio
					if (window.instrument) { window.instrument.setParameters({ volume: (percentage / 100) }) }
			}

	/*** tool-polysynth ***/
		/* buildPolysynthTool **/
			function buildPolysynthTool() {
				var polysynthTool = document.getElementById("tool-polysynth")

				for (var i = -12; i <= 12; i++) {
					var toggle = document.createElement("button")
						toggle.className = "toggle"
						toggle.id = "tool-polysynth-toggle--" + i
						toggle.value = i
						toggle.style.left = 4 * (i + 12) + "%"
					polysynthTool.appendChild(toggle)

					switch (Math.abs(i)) {
						case 12:
							toggle.innerHTML = "12<br>8ve"
						break
						case 11:
							toggle.innerHTML = "11<br>M7"
						break
						case 10:
							toggle.innerHTML = "10<br>m7"
						break
						case 9:
							toggle.innerHTML = "9<br>M6"
						break
						case 8:
							toggle.innerHTML = "8<br>m6"
						break
						case 7:
							toggle.innerHTML = "7<br>P5"
						break
						case 6:
							toggle.innerHTML = "6<br>Tt"
						break
						case 5:
							toggle.innerHTML = "5<br>P4"
						break
						case 4:
							toggle.innerHTML = "4<br>M3"
						break
						case 3:
							toggle.innerHTML = "3<br>m3"
						break
						case 2:
							toggle.innerHTML = "2<br>M2"
						break
						case 1:
							toggle.innerHTML = "1<br>m2"
						break
						case 0:
							toggle.innerHTML = "0<br>root"
					}
				}
			}

		/* adjustPolysynthToolToggle */
			function adjustPolysynthToolToggle(event, setup) {
				if (event.target.getAttribute("selected")) {
					event.target.removeAttribute("selected")

					if (!setup) {
						var polysynth = {}
							polysynth[Number(event.target.value)] = false
						if (window.instrument) { window.instrument.setParameters({ polysynth: polysynth }) }
						if (!defaults.includes(document.getElementById("tool-meta-name").value)) {
							saveFile()
						}
					}
				}
				else {
					event.target.setAttribute("selected", true)
					
					if (!setup) {
						var polysynth = {}
							polysynth[Number(event.target.value)] = true
						if (window.instrument) { window.instrument.setParameters({ polysynth: polysynth }) }
						if (!defaults.includes(document.getElementById("tool-meta-name").value)) {
							saveFile()
						}
					}
				}
			}

	/*** tool-wave ***/	
		/* buildWaveTool */
			function buildWaveTool() {
				var waveTool = document.getElementById("tool-wave")

				for (var i = 1; i <= 33; i++) {
					var input = document.createElement("input")
						input.setAttribute("type", "number")
						input.setAttribute("min", 0)
						input.setAttribute("max", 100)
						input.className = "input"
						input.id = "tool-wave-input--" + i
						input.style.left = (i * 3) - 1.5 + "%"
						input.value = 0
					waveTool.appendChild(input)

					var track = document.createElement("div")
						track.className = "track"
						track.id = "tool-wave-track--" + i
						track.style.left = (i * 3) - 1.5 + "%"
					waveTool.appendChild(track)

					var bar = document.createElement("div")
						bar.className = "bar"
						bar.id = "tool-wave-bar--" + i
						bar.innerText = i
						bar.style.height = "0%"
					track.appendChild(bar)
				}
			}

		/* adjustWaveToolBar */
			function adjustWaveToolBar(event) {
				// display
					var harmonic   = parameter.id.split("--")[1]
					var rectangle  = document.getElementById("tool-wave-track--" + harmonic).getBoundingClientRect()
					var input = document.getElementById("tool-wave-input--" + harmonic)
					var y = event.y || event.targetTouches[0].clientY

					var percentage = (rectangle.bottom - y) * 100 / (rectangle.height)
						percentage = Math.min(100, Math.max(0, percentage))
					parameter.style.height = percentage + "%"
					input.value = percentage

				// data
					adjustWaveToolInput({target: input})
			}

		/* adjustWaveToolInput */
			function adjustWaveToolInput(event, setup) {
				// display
					var harmonic   = event.target.id.split("--")[1]
					var bar        = document.getElementById("tool-wave-bar--" + harmonic)
					var percentage = Number(event.target.value)
						percentage = Math.min(100, Math.max(0, percentage))
					bar.style.height = percentage + "%"

				// audio
					if (!setup) {
						var harmonic = {}
							harmonic[event.target.id.split("--")[1]] = percentage / 100
						if (window.instrument) { window.instrument.setParameters({harmonic: harmonic}) }
						if (!defaults.includes(document.getElementById("tool-meta-name").value)) {
							saveFile()
						}
					}
			}

	/*** tool-noise ***/
		/* buildNoiseTool */
			function buildNoiseTool() {
				var noiseTool = document.getElementById("tool-noise")
				var colors = ["white", "pink", "brown"]

				for (var c = 0; c < colors.length; c++) {
					var color = colors[c]
					
					// volume
						var element = document.createElement("div")
							element.className = "section"
							element.id = "tool-noise-volume--" + color
							element.style.top = (c * 75) + 10 + "px"
						noiseTool.appendChild(element)

						var input = document.createElement("input")
							input.setAttribute("type", "number")
							input.setAttribute("min", 0)
							input.setAttribute("max", 100)
							input.setAttribute("placeholder", color)
							input.className = "input"
							input.id = "tool-noise-volume-input--" + color
							input.value = 10
						element.appendChild(input)

						var track = document.createElement("div")
							track.id = "tool-noise-volume-track--" + color
							track.className = "track"
						element.appendChild(track)

						var bar = document.createElement("div")
							bar.id = "tool-noise-volume-bar--" + color
							bar.className = "bar"
							bar.style.width = "10%"
							bar.innerHTML = color + '&nbsp;<span class="fas fa-volume-up"></span>'
						track.appendChild(bar)
				}
			}

		/* adjustNoiseToolBar */
			function adjustNoiseToolBar(event) {
				// display
					var type = parameter.id.split("--")[1]
					var rectangle  = document.getElementById("tool-noise-volume-track--" + type).getBoundingClientRect()
					var input = document.getElementById("tool-noise-volume-input--" + type)
					var x = event.x || event.targetTouches[0].clientX

					var percentage = (x - rectangle.left) * 100 / (rectangle.width)
						percentage = Math.min(100, Math.max(0, percentage))
					parameter.style.width = percentage + "%"
					input.value = percentage

				// data
					adjustNoiseToolInput({target: input})
			}

		/* adjustNoiseToolInput */
			function adjustNoiseToolInput(event, setup) {
				// display
					var type = event.target.id.split("--")[1]
					var bar = document.getElementById("tool-noise-volume-bar--" + type)
					var percentage = Number(event.target.value)
						percentage = Math.min(100, Math.max(0, percentage))
					bar.style.width = percentage + "%"

				// audio
					if (!setup) {
						var noise = {}
							noise[type] = percentage / 100
						if (window.instrument) { window.instrument.setParameters({ noise: noise }) }
						if (!defaults.includes(document.getElementById("tool-meta-name").value)) {
							saveFile()
						}
					}
			}

	/*** tool-envelope ***/	
		/* buildEnvelopeTool */
			function buildEnvelopeTool() {
				var envelopeTool = document.getElementById("tool-envelope")

				// track
					var track = document.createElement("div")
						track.className = "track"
						track.id = "tool-envelope-track"
					envelopeTool.appendChild(track)

				// attack
					var attack = document.createElement("div")
						attack.className = "shape"
						attack.id = "tool-envelope-shape--attack"
						attack.style.width = "2%"
						attack.innerHTML = "&#8672;attack&#8674;"
					track.appendChild(attack)

					var input = document.createElement("input")
						input.setAttribute("type", "number")
						input.setAttribute("min", 0)
						input.setAttribute("max", 100)
						input.className = "input"
						input.id = "tool-envelope-input--attack"
						input.value = 0
					envelopeTool.appendChild(input)

				// decay
					var decay = document.createElement("div")
						decay.className = "shape"
						decay.id = "tool-envelope-shape--decay"
						decay.style.left = "2%"
						decay.style.width = "2%"
						decay.innerHTML = "&#8672;decay&#8674;"
						decay.style["clip-path"] = "polygon(0% 0%, 0% 100%, 100% 100%, 100% 100%)"
					track.appendChild(decay)

					var input = document.createElement("input")
						input.setAttribute("type", "number")
						input.setAttribute("min", 0)
						input.setAttribute("max", 100)
						input.className = "input"
						input.id = "tool-envelope-input--decay"
						input.style.left = "2%"
						input.value = 0
					envelopeTool.appendChild(input)

				// sustain
					var sustain = document.createElement("div")
						sustain.className = "shape"
						sustain.id = "tool-envelope-shape--sustain"
						sustain.style.left = "4%"
						sustain.style.width = "94%"
						sustain.style.height = "0%"
						sustain.innerHTML = "&#8673;sustain&#8675;"
					track.appendChild(sustain)

					var input = document.createElement("input")
						input.setAttribute("type", "number")
						input.setAttribute("min", 0)
						input.setAttribute("max", 100)
						input.className = "input"
						input.id = "tool-envelope-input--sustain"
						input.style.left = "4%"
						input.value = 0
					envelopeTool.appendChild(input)

				// release
					var release = document.createElement("div")
						release.className = "shape"
						release.id = "tool-envelope-shape--release"
						release.style.width = "2%"
						release.style.height = "0%"
						release.innerHTML = "&#8672;release&#8674;"
					track.appendChild(release)

					var input = document.createElement("input")
						input.setAttribute("type", "number")
						input.setAttribute("min", 0)
						input.setAttribute("max", 100)
						input.className = "input"
						input.id = "tool-envelope-input--release"
						input.style.left = "94"
						input.value = 0
					envelopeTool.appendChild(input)
			}

		/* adjustEnvelopeToolBar */
			function adjustEnvelopeToolBar(event) {
				// display
					var rectangle = document.getElementById("tool-envelope-track").getBoundingClientRect()
					var shape     = parameter.getBoundingClientRect()
					var type      = parameter.id.split("--")[1]
					var input     = document.getElementById("tool-envelope-input--" + type)
					var x = event.x || event.targetTouches[0].clientX
					var y = event.y || event.targetTouches[0].clientY
					
					switch (type) {
						case "attack":
						case "decay":
							var percentage = (x - shape.left) * 100 / (rectangle.width)
								percentage = Math.min(25, Math.max(0, percentage))
							parameter.style.width = percentage + "%"
							input.value = Math.pow(percentage * 4 / 10, 2)
						break
						case "release":
							var percentage = (shape.right - x) * 100 / (rectangle.width)
								percentage = Math.min(25, Math.max(0, percentage))
							parameter.style.width = percentage + "%"
							input.value = Math.pow(percentage * 4 / 10, 2)
						break
						case "sustain":
							var percentage = (rectangle.bottom - y) * 100 / (rectangle.height)
								percentage = Math.min(100, Math.max(0, percentage))
							parameter.style.height = percentage + "%"
							input.value = percentage
						break
					}

				// data
					adjustEnvelopeToolInput({target: input})
			}

		/* adjustEnvelopeToolInput */
			function adjustEnvelopeToolInput(event, setup) {
				// inputs
					var attackInput  = document.getElementById("tool-envelope-input--attack" )
					var decayInput   = document.getElementById("tool-envelope-input--decay"  )
					var sustainInput = document.getElementById("tool-envelope-input--sustain")
					var releaseInput = document.getElementById("tool-envelope-input--release")

				// shapes
					var attackShape  = document.getElementById("tool-envelope-shape--attack" )
					var decayShape   = document.getElementById("tool-envelope-shape--decay"  )
					var sustainShape = document.getElementById("tool-envelope-shape--sustain")
					var releaseShape = document.getElementById("tool-envelope-shape--release")

				// values
					var attackValue  = Math.min(100, Math.max(0, attackInput.value ))
						attackValue  = Math.pow(attackValue,  0.5) * 10 / 4
					var decayValue   = Math.min(100, Math.max(0, decayInput.value  ))
						decayValue   = Math.pow(decayValue,   0.5) * 10 / 4
					var sustainValue = Math.min(100, Math.max(0, sustainInput.value))
					var releaseValue = Math.min(100, Math.max(0, releaseInput.value))
						releaseValue = Math.pow(releaseValue, 0.5) * 10 / 4

				// display
					attackShape.style.width   = Math.max(2, attackValue) + "%"
					
					decayShape.style["clip-path"] = "polygon(0% 0%, 0% 100%, 100% 100%, 100% " + (100 - sustainValue) + "%)"
					decayShape.style.width    = Math.max(2, decayValue) + "%"
					decayShape.style.left     = Math.max(2, attackValue) + "%"
					decayInput.style.left     = Math.max(2, attackValue) + "%"

					releaseShape.style.width  = Math.max(2, releaseValue) + "%"
					releaseShape.style.height = sustainValue + "%"
					releaseInput.style.left   = 100 - Math.max(2, releaseValue) + "%"

					sustainShape.style.width  = 100 - Math.max(2, attackValue) - Math.max(2, decayValue) - Math.max(2, releaseValue) + "%"
					sustainShape.style.height = sustainValue + "%"
					sustainShape.style.left   = Math.max(2, attackValue) + Math.max(2, decayValue) + "%"
					sustainInput.style.left   = Math.max(2, attackValue) + Math.max(2, decayValue) + "%"

				// audio
					if (!setup) {
						var envelope = {
							attack:  (Math.min(100, Math.max(0, attackInput.value )) / 100),
							decay:   (Math.min(100, Math.max(0, decayInput.value  )) / 100),
							sustain: (Math.min(100, Math.max(0, sustainInput.value)) / 100),
							release: (Math.min(100, Math.max(0, releaseInput.value)) / 100)
						}

						if (window.instrument) { window.instrument.setParameters({ envelope: envelope }) }
						if (!defaults.includes(document.getElementById("tool-meta-name").value)) {
							saveFile()
						}
					}
			}

	/*** tool-bitcrusher ***/
		/* buildBitcrusherTool */
			function buildBitcrusherTool() {
				var bitcrusherTool = document.getElementById("tool-bitcrusher")

				// toggles
					var element = document.createElement("div")
						element.className = "section"
						element.id = "tool-bitcrusher-bits"
					bitcrusherTool.appendChild(element)

					var toggle = document.createElement("button")
						toggle.id = "tool-bitcrusher-bits-toggle--0"
						toggle.value = 0
						toggle.className = "toggle"
						toggle.style.left = "5%"
						toggle.innerHTML = '<span class="fas fa-ban"></span>'
						toggle.style["border-radius"] = "100%"
						toggle.setAttribute("selected", true)
					element.appendChild(toggle)
					
					for (var i = 6; i >= 0; i--) {
						var toggle = document.createElement("button")
							toggle.id = "tool-bitcrusher-bits-toggle--" + Math.pow(2, i)
							toggle.value = Math.pow(2, i)
							toggle.className = "toggle"
							toggle.style.left = (7 - i) * 12.5 + 5 + "%"
							toggle.innerHTML = Math.pow(2, i) + "<span class='tool-bitcrusher-bits-toggle-bit'>-bit</span>"
							toggle.style["border-radius"] = 7 * i + "%"
						element.appendChild(toggle)
					}

				// norm
					var element = document.createElement("div")
						element.className = "section"
						element.id = "tool-bitcrusher-norm"
					bitcrusherTool.appendChild(element)

					var input = document.createElement("input")
						input.setAttribute("type", "number")
						input.setAttribute("min", 0)
						input.setAttribute("max", 100)
						input.className = "input"
						input.id = "tool-bitcrusher-norm-input"
						input.value = 50
					element.appendChild(input)

					var track = document.createElement("div")
						track.id = "tool-bitcrusher-norm-track"
						track.className = "track"
					element.appendChild(track)

					var bar = document.createElement("div")
						bar.id = "tool-bitcrusher-norm-bar"
						bar.className = "bar"
						bar.style.width = "50%"
						bar.innerHTML = '<span class="fas fa-adjust"></span>'
					track.appendChild(bar)
			}

		/* adjustBitcrusherToolToggle */
			function adjustBitcrusherToolToggle(event, setup) {
				// data
					var bits = Math.max(0, Math.min(64, event.target.value))
					var norm = Math.max(0, Math.min(100, document.getElementById("tool-bitcrusher-norm-input").value)) / 100

				// unselect
					if (event.target.getAttribute("selected")) {
						event.target.removeAttribute("selected")

						if (!Array.from(document.querySelectorAll("#tool-bitcrusher .toggle[selected]")).length) {
							document.getElementById("tool-bitcrusher-bits-toggle--0").setAttribute("selected", true)
						}

						if (!setup) {
							var bitcrusher = {}
								bitcrusher.bits = bits
								bitcrusher.norm = norm
							if (window.instrument) { window.instrument.setParameters({ bitcrusher: bitcrusher }) }
							if (!defaults.includes(document.getElementById("tool-meta-name").value)) {
								saveFile()
							}
						}
					}

				// select
					else {
						Array.from(document.querySelectorAll("#tool-bitcrusher .toggle:not([value='power'])")).forEach(function (t) {
							t.removeAttribute("selected")
						})
						event.target.setAttribute("selected", true)

						if (!setup) {
							var bitcrusher = {}
								bitcrusher.bits = bits
								bitcrusher.norm = norm

							if (window.instrument) { window.instrument.setParameters({ bitcrusher: bitcrusher }) }
							if (!defaults.includes(document.getElementById("tool-meta-name").value)) {
								saveFile()
							}
						}
					}
			}

		/* adjustBitcrusherToolBar */
			function adjustBitcrusherToolBar(event) {
				// display
					var rectangle  = document.getElementById("tool-bitcrusher-norm-track").getBoundingClientRect()
					var input = document.getElementById("tool-bitcrusher-norm-input")
					var x = event.x || event.targetTouches[0].clientX

					var percentage = (x - rectangle.left) * 100 / (rectangle.width)
						percentage = Math.min(100, Math.max(0, percentage))
					parameter.style.width = percentage + "%"
					input.value = percentage

				// data
					adjustBitcrusherToolInput({target: input})
			}

		/* adjustBitcrusherToolInput */
			function adjustBitcrusherToolInput(event, setup) {
				// display
					var bar = document.getElementById("tool-bitcrusher-norm-bar")
					var percentage = Number(event.target.value)
						percentage = Math.min(100, Math.max(0, percentage))
					bar.style.width = percentage + "%"

				// audio
					if (!setup) {
						var norm = percentage / 100
						var bits = Array.from(document.querySelectorAll("#tool-bitcrusher .toggle[selected]")) || []
							bits = bits[0] || 0
						if (bits) {
							bits = Math.min(64, Math.max(0, bits.value))
						}

						var bitcrusher = {}
							bitcrusher.bits = bits
							bitcrusher.norm = norm
						if (window.instrument) { window.instrument.setParameters({ bitcrusher: bitcrusher }) }
						if (!defaults.includes(document.getElementById("tool-meta-name").value)) {
							saveFile()
						}
					}
			}

	/*** tool-filter ***/
		/* buildFilterTool */
			function buildFilterTool() {
				var filterTool = document.getElementById("tool-filter")

				// track
					var track = document.createElement("div")
						track.className = "track"
						track.id = "tool-filter-track"
					filterTool.appendChild(track)

				// lines
					for (var i = 0; i <= 100; i++) {
						if (i % 12 == 0) {
							var line = document.createElement("div")
								line.id = "tool-filter-line--" + i
								line.className = "line"
								line.innerHTML = "C" + ((i / 12) + 2) + "<span class='tool-filter-line-frequency'>" + window.getFrequency(i + 24)[0].toFixed(2) + "<br>Hz</span>"
								line.style.left = i + "%"
							track.appendChild(line)
						}
					}

				// baseline
					var baseline = document.createElement("div")
						baseline.id = "tool-filter-baseline"
						baseline.addEventListener(on.mousedown,  createFilter)
					track.appendChild(baseline)
			}

		/* createFilter */
			function createFilter(event, options) {
				// parents
					var filterTool = document.getElementById("tool-filter")
					var track = document.getElementById("tool-filter-track")

				// click or load?
					if (!options) {
						// display
							var rectangle = track.getBoundingClientRect()
							var x = event.x || event.targetTouches[0].clientX
							var percentage = (x - rectangle.left) * 100 / (rectangle.width)
								percentage = Math.min(100, Math.max(0, percentage))

						// data
							var blobs = Array.from(document.querySelectorAll("#tool-filter-track .blob")) || []
								blobs = blobs.map(function (b) {
									return Number(b.id.split("--")[1])
								}).sort(function (a, b) {
									return b - a
								}) || []
							var num = (blobs[0] + 1) || 0
							var low  = percentage - 5
							var high = percentage + 5
							var gain = 0
					}
					else {
						var num  = options.number
						var low  = 45 + 12 * Math.log2(options.low  / 440)
						var high = 45 + 12 * Math.log2(options.high / 440)
						var gain = options.gain
					}
						
				// blobs
					var blob = document.createElement("div")
						blob.className = "blob"
						blob.id = "tool-filter-blob--" + num
						blob.style["clip-path"] = "polygon(" + low + "% 50%, " + ((low + high) / 2) + "% " + (50 - gain) + "%, " + high + "% 50%)"
					track.appendChild(blob)

				// low
					var shape = document.createElement("div")
						shape.className = "shape square"
						shape.id = "tool-filter-shape--low--" + num
						shape.addEventListener(on.mousedown,  selectBar)
						shape.style.left = low + "%"
						shape.style.top = "50%"
					track.appendChild(shape)

					var input = document.createElement("input")
						input.setAttribute("type", "number")
						input.setAttribute("min", 0)
						input.setAttribute("max", 100)
						input.setAttribute("placeholder", "pitch #")
						input.addEventListener("change", changeInput)
						input.className = "input"
						input.id = "tool-filter-input--low--" + num
						input.value = low
						input.style.left = Math.max(5, Math.min(95, ((low + high) / 2))) + "%"
						input.style.bottom = "30px"
					filterTool.appendChild(input)

				// gain
					var shape = document.createElement("div")
						shape.className = "shape circle"
						shape.id = "tool-filter-shape--gain--" + num
						shape.addEventListener(on.mousedown,  selectBar)
						shape.style.left = ((low + high) / 2) + "%"
						shape.style.top = (50 - gain) + "%"
					track.appendChild(shape)

					if (!options) {
						parameter = shape
						tool = filterTool
					}

					var input = document.createElement("input")
						input.setAttribute("type", "number")
						input.setAttribute("min", -50)
						input.setAttribute("max", 50)
						input.setAttribute("placeholder", "dB")
						input.addEventListener("change", changeInput)
						input.className = "input"
						input.id = "tool-filter-input--gain--" + num
						input.value = gain
						input.style.left = Math.max(5, Math.min(95, ((low + high) / 2))) + "%"
						input.style.bottom = "15px"
					filterTool.appendChild(input)

				// high
					var shape = document.createElement("div")
						shape.className = "shape square"
						shape.id = "tool-filter-shape--high--" + num
						shape.addEventListener(on.mousedown,  selectBar)
						shape.style.left = high + "%"
						shape.style.top = "50%"
					track.appendChild(shape)

					var input = document.createElement("input")
						input.setAttribute("type", "number")
						input.setAttribute("min", 0)
						input.setAttribute("max", 100)
						input.setAttribute("placeholder", "pitch #")
						input.addEventListener("change", changeInput)
						input.className = "input"
						input.id = "tool-filter-input--high--" + num
						input.value = high
						input.style.left = Math.max(5, Math.min(95, ((low + high) / 2))) + "%"
						input.style.bottom = "0px"
					filterTool.appendChild(input)
			}

		/* adjustFilterToolBar */
			function adjustFilterToolBar(event) {
				// display
					var rectangle = document.getElementById("tool-filter-track").getBoundingClientRect()
					var shape     = parameter.getBoundingClientRect()
					var type      = parameter.id.split("--")[1]
					var num       = parameter.id.split("--")[2]
					var input     = document.getElementById("tool-filter-input--" + type + "--" + num)
					var blob      = document.getElementById("tool-filter-blob--" + num)
					var x         = event.x || event.targetTouches[0].clientX
					var y         = event.y || event.targetTouches[0].clientY
				
				// gain
					if (type == "gain") {
						var percentage = (y - rectangle.top) * 100 / (rectangle.height)
							percentage = Math.min(100, Math.max(0, percentage))
						parameter.style.top = percentage + "%"
						input.value = (50 - percentage)

						var percentage = (x - rectangle.left) * 100 / (rectangle.width)
							percentage = Math.min(100, Math.max(0, percentage))
						parameter.style.left = percentage + "%"

						var low  = document.getElementById("tool-filter-input--low--" + num)
						var lowValue  = Math.min(200, Math.max(-100, low.value))
						var high = document.getElementById("tool-filter-input--high--" + num)
						var highValue = Math.min(200, Math.max(-100, high.value))

						var distance = (highValue - lowValue) / 2
						low.value  = percentage - distance
						high.value = percentage + distance
					}

				// low
					else if (type == "low") {
						var high = document.getElementById("tool-filter-input--high--" + num)
						var highValue = Math.min(200, Math.max(-100, high.value))

						var percentage = (x - rectangle.left) * 100 / (rectangle.width)
							percentage = Math.min(100, Math.max(0, percentage))

						if (percentage < highValue) {
							parameter.style.left = percentage + "%"
							input.value = percentage
						}
					}

				// high
					else if (type == "high") {
						var low = document.getElementById("tool-filter-input--low--" + num)
						var lowValue = Math.min(200, Math.max(-100, low.value))

						var percentage = (x - rectangle.left) * 100 / (rectangle.width)
							percentage = Math.min(100, Math.max(0, percentage))

						if (percentage > lowValue) {
							parameter.style.left = percentage + "%"
							input.value = percentage
						}
					}

				// data
					adjustFilterToolInput({target: input})
			}

		/* adjustFilterToolInput */
			function adjustFilterToolInput(event, setup) {
				// data
					var type = event.target.id.split("--")[1]
					var num  = event.target.id.split("--")[2]
					var blob = document.getElementById("tool-filter-blob--" + num)

					var low       = document.getElementById("tool-filter-input--low--"  + num)
					var lowValue  = Math.min(200, Math.max(-100, low.value))
					var high      = document.getElementById("tool-filter-input--high--" + num)
					var highValue = Math.min(200, Math.max(-100, high.value))
					var gain      = document.getElementById("tool-filter-input--gain--" + num)
					var gainValue = Math.min(50, Math.max(-50, gain.value))

				// display
					blob.style["clip-path"] = "polygon(" + lowValue + "% 50%, " + ((lowValue + highValue) / 2) + "% " + (50 - gainValue) + "%, " + highValue + "% 50%)"
					document.getElementById("tool-filter-shape--low--"  + num).style.left = lowValue  + "%"
					document.getElementById("tool-filter-shape--high--" + num).style.left = highValue + "%"
					document.getElementById("tool-filter-shape--gain--" + num).style.left = ((highValue + lowValue) / 2) + "%"
					document.getElementById("tool-filter-shape--gain--" + num).style.top  = 50 - gainValue + "%"

					low.style.left = high.style.left = gain.style.left = Math.max(5, Math.min(95, ((highValue + lowValue) / 2))) + "%"

				// audio
					if (!setup) {
						var filters = {}
							filters[num] = {
								low:  (440 * Math.pow(2, (  lowValue                   - 45) / 12)),
								mid:  (440 * Math.pow(2, (((lowValue + highValue) / 2) - 45) / 12)),
								high: (440 * Math.pow(2, (             highValue       - 45) / 12)),
								gain: gainValue
							}

						if (window.instrument) { window.instrument.setParameters({ filters: filters }) }
						if (!defaults.includes(document.getElementById("tool-meta-name").value)) {
							saveFile()
						}
					}
			}

		/* deselectFilterToolBar */
			function deselectFilterToolBar(event, override) {
				if (event && event.target.className.includes("circle")) {
					var num  = event.target.id.split("--")[2]
					var gain = document.getElementById("tool-filter-input--gain--" + num).value
				}
				else if ((override !== undefined) && (override !== null)) {
					var num = override
					override = true
				}

				if ((Math.abs(gain) < 2) || override) {
					document.getElementById("tool-filter-shape--low--"  + num).remove()
					document.getElementById("tool-filter-shape--high--" + num).remove()
					document.getElementById("tool-filter-shape--gain--" + num).remove()
					document.getElementById("tool-filter-input--low--"  + num).remove()
					document.getElementById("tool-filter-input--high--" + num).remove()
					document.getElementById("tool-filter-input--gain--" + num).remove()
					document.getElementById("tool-filter-blob--"        + num).remove()
				}
			}

	/*** tool-echo ***/
		/* buildEchoTool */
			function buildEchoTool() {
				var echoTool = document.getElementById("tool-echo")

				// feedback
					var track = document.createElement("div")
						track.id = "tool-echo-track--feedback"
						track.className = "track"
					echoTool.appendChild(track)

					var bar = document.createElement("div")
						bar.id = "tool-echo-bar--feedback"
						bar.className = "bar"
						bar.innerHTML = '<span class="fas fa-volume-up"></span>'
						bar.style.height = "0%"
					track.appendChild(bar)

					var input = document.createElement("input")
						input.setAttribute("type", "number")
						input.setAttribute("min", 0)
						input.setAttribute("max", 100)
						input.className = "input"
						input.id = "tool-echo-input--feedback"
						input.value = 0
					echoTool.appendChild(input)

				// delay
					var track = document.createElement("div")
						track.id = "tool-echo-track--delay"
						track.className = "track"
					echoTool.appendChild(track)

					var bar = document.createElement("div")
						bar.id = "tool-echo-bar--delay"
						bar.className = "bar"
						bar.innerHTML = '<span class="fas fa-clock"></span>'
						bar.style.left = "0%"
						bar.style.height = "0%"
					track.appendChild(bar)

					var input = document.createElement("input")
						input.setAttribute("type", "number")
						input.setAttribute("min", 0)
						input.setAttribute("max", 100)
						input.className = "input"
						input.id = "tool-echo-input--delay"
						input.value = 0
						input.style.left = "0%"
					echoTool.appendChild(input)

				// echoes
					var track = document.createElement("div")
						track.id = "tool-echo-track--echoes"
						track.className = "track"
					echoTool.appendChild(track)

					for (var i = 3; i < 33; i++) {
						var beam = document.createElement("div")
							beam.className = "beam"
							beam.id = "tool-echo-bar--" + i
							beam.style.height = "0%"
							beam.style.left   = "0%"
						track.appendChild(beam)
					}
			}

		/* adjustEchoToolBar */
			function adjustEchoToolBar(event) {
				// display
					var type      = parameter.id.split("--")[1]
					var shape     = parameter.getBoundingClientRect()
					var rectangle = document.getElementById("tool-echo-track--" + type).getBoundingClientRect()
					var input     = document.getElementById("tool-echo-input--" + type)
					var x         = event.x || event.targetTouches[0].clientX
					var y         = event.y || event.targetTouches[0].clientY

					switch (type) {
						case "feedback":
							var percentage = (rectangle.bottom - y) * 100 / (rectangle.height)
								percentage = Math.min(100, Math.max(0, percentage))
							parameter.style.height = percentage + "%"
							input.value = percentage
						break
						case "delay":
							var percentage = (x - rectangle.left) * 100 / (rectangle.width)
								percentage = Math.min(100, Math.max(0, percentage))
							parameter.style.left = percentage + "%"
							input.value = percentage
						break
					}

				// data
					adjustEchoToolInput({target: input})
			}

		/* adjustEchoToolInput */
			function adjustEchoToolInput(event, setup) {
				// inputs
					var feedbackInput = document.getElementById("tool-echo-input--feedback")
					var delayInput    = document.getElementById("tool-echo-input--delay")

				// beams
					var feedbackBeam  = document.getElementById("tool-echo-bar--feedback")
					var delayBeam     = document.getElementById("tool-echo-bar--delay")
					var beams         = Array.from(document.querySelectorAll("#tool-echo .beam"))

				// values
					var feedbackValue = Math.min(100, Math.max(0, feedbackInput.value))
					var delayValue    = Math.min(100, Math.max(0, delayInput.value   ))

				// display
					feedbackBeam.style.height = feedbackValue + "%"

					delayBeam.style.left      = delayValue - 1 + "%"
					delayBeam.style.height    =	Math.pow((feedbackValue / 100), 2) * 100 + "%"
					delayInput.style.left     = (2 + (delayValue / 100 * 94)) + "%"

					beams.forEach(function (b) {
						var i = b.id.split("--")[1]
						b.style.left   = delayValue * (i - 1) + "%"
						b.style.height = Math.pow((feedbackValue / 100), i) * 100 + "%"
					})

				// audio
					if (!setup) {
						var echo = {
							delay:    delayValue / 100,
							feedback: feedbackValue / 100
						}
						if (window.instrument) { window.instrument.setParameters({ echo: echo }) }
						if (!defaults.includes(document.getElementById("tool-meta-name").value)) {
							saveFile()
						}
					}
			}

	/*** helpers ***/
		/* getKey */
			function getKey(keycode) {
				switch (keycode) {
					case 65:
						return 48
					break
					case 87:
						return 49
					break
					case 83:
						return 50
					break
					case 69:
						return 51
					break
					case 68:
						return 52
					break
					case 70:
						return 53
					break
					case 84:
						return 54
					break
					case 71:
						return 55
					break
					case 89:
						return 56
					break
					case 72:
						return 57
					break
					case 85:
						return 58
					break
					case 74:
						return 59
					break
					case 75:
						return 60
					break
					case 79:
						return 61
					break
					case 76:
						return 62
					break
					case 80:
						return 63
					break
					case 186:
						return 64
					break
					case 222:
						return 65
					break
					case 221:
						return 66
					break
					case 13:
						return 67
					break
					case 220:
						return 68
					break
					default:
						return null
				}
			}

	/*** keyboard ***/
		/* buildKeyboard */
			function buildKeyboard() {
				// data
					var keyboard = document.getElementById("keyboard")
					var count = 0
					var letters = ["a","w","s","e","d", "f","t","g","y","h","u","j","k","o","l","p",";","'","]","&#8629;","\\"]
				
				for (var i = 48; i <= 72; i++) {
					// build key
						var element = document.createElement("button")
							element.className = "key"
							element.id = "key--" + i
							element.value = i
							if (letters[i - 48]) { element.innerHTML = letters[i - 48] }
						keyboard.appendChild(element)

					// color
						if ([1,3,6,8,10].includes(i % 12)) {
							element.setAttribute("color", "black")
							element.style.left = (100 / 15 * (count - 0.4)) + "%"
						}
						else {
							element.setAttribute("color", "white")
							element.style.left = (100 / 15 * count) + "%"
							count++
						}
				}
			}

		/* pressKey */
			Array.from(document.querySelectorAll(".key")).forEach(function (k) { k.addEventListener(on.mousedown, pressKey) })
			document.addEventListener("keydown", pressKey)
			function pressKey(event) {		
				// keyboard or mouse?
					if (event.type == on.mousedown) {
						var press = event.target
						key = press
					}
					else if (event.type == "keydown") {
						if (document.activeElement.tagName !== "INPUT") {
							var press = document.getElementById("key--" + getKey(event.which))
						}
					}
				
				// select
					if (press && !press.getAttribute("selected") && window.instrument) {
						press.setAttribute("selected", true)
						window.instrument.press(window.getFrequency(press.value)[0])
					}
			}

		/* liftKey */
			document.addEventListener(on.mouseup,  liftKey)
			document.addEventListener("keyup",    liftKey)
			function liftKey(event) {
				// keyboard or mouse?
					if ((event.type == on.mouseup) && key) {
						var lift = key
						key = null
					}
					else if (event.type == "keyup") {
						if (document.activeElement.tagName !== "INPUT") {
							var lift = document.getElementById("key--" + getKey(event.which))
						}
					}
				
				// deselect			
					if (lift && window.instrument) {
						lift.removeAttribute("selected")
						window.instrument.lift(window.getFrequency(lift.value)[0])
					}
			}

})
