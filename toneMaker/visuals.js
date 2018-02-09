window.addEventListener("load", function() {

	/*** load ***/
		/* globals */
			var tool = null
			var parameter = null
			var key = null

		/* prevention */
			document.body.ondragstart = function() { return false }
			document.body.ondrop      = function() { return false }

		/* builds */
			buildTools()
			loadFile(null, "random")

	/*** tools ***/
		/* selectTool */
			Array.from(document.querySelectorAll("#switcher button")).forEach(function(b) { b.addEventListener("click", selectTool) })
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
						var target = document.getElementById("tool-noise-power--" + colors[x])
						
						if (value && !target.getAttribute("selected")) {
							adjustNoiseToolToggle({target: target}, setup)	
						}
						else if (!value && target.getAttribute("selected")) {
							adjustNoiseToolToggle({target: target}, setup)
						}

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
					for (var x = 0; x <= 4; x++) {
						var obj = (parameters.filters && parameters.filters[x]) ? parameters.filters[x] : {
							low:  440 * Math.pow(2, ((24 + 12 * (x - 0.4)) - 45) / 12),
							high: 440 * Math.pow(2, ((24 + 12 * (x + 0.4)) - 45) / 12),
							gain: 0
						}
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

	/*** bars & inputs ***/
		/* selectBar */
			Array.from(document.querySelectorAll(".bar")).forEach(function (p) { p.addEventListener("mousedown", selectBar) })
			Array.from(document.querySelectorAll(".shape")).forEach(function (p) { p.addEventListener("mousedown", selectBar) })
			function selectBar(event) {
				if (tool) {
					parameter = event.target
					event.target.setAttribute("selected", true)
					tool.setAttribute("grabbing", true)

					moveBar(event)
				}
			}

		/* moveBar */
			document.addEventListener("mousemove", moveBar)
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
			document.addEventListener("mouseup", deselectBar)
			function deselectBar(event) {
				if (tool && parameter) {
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
			Array.from(document.querySelectorAll(".toggle")).forEach(function (t) { t.addEventListener("click", changeToggle) })
			function changeToggle(event) {
				if (tool) {
					switch (tool.id) {
						case "tool-meta":
							adjustPowerToolToggle(event)
						break
						case "tool-polysynth":
							adjustPolysynthToolToggle(event)
						break
						case "tool-noise":
							adjustNoiseToolToggle(event)
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

				// save
					var input = document.createElement("button")
						input.id = "tool-meta-save"
						input.className = "button"
						input.innerHTML = '<span class="fas fa-save"></span>'
						input.addEventListener("click", saveFile)
					element.appendChild(input)

				// download
					var input = document.createElement("button")
						input.id = "tool-meta-download"
						input.className = "button"
						input.innerHTML = '<span class="fas fa-download"></span>'
						input.addEventListener("click", downloadFile)
					element.appendChild(input)

				// select
					var options = ["random", "_waves", "sine", "square", "triangle", "sawtooth", "_instruments", "shimmer", "jangle", "chordstrum", "lazerz", "darkflute", "buzzorgan", "swello", "honeyharp", "reedles", "boombash", "_custom"]

					if (window.localStorage.synthesizers) {
						var custom = JSON.parse(window.localStorage.synthesizers)
						if (custom) {
							var keys = Object.keys(custom)
							options = options.concat(keys)
						}
					}

					var select = document.createElement("select")
						select.id = "tool-meta-select"
						select.className = "input"
						for (var o in options) {
							if (options[o][0] == "_") {
								var option = document.createElement("optgroup")
									option.setAttribute("label", "--- " + options[o].slice(1) + " ---")
								select.appendChild(option)
							}
							else {
								var option = document.createElement("option")
									option.innerText = options[o]
									option.value = options[o]
								select.appendChild(option)
							}
						}
					element.appendChild(select)


				// load
					var input = document.createElement("button")
						input.id = "tool-meta-load"
						input.className = "button"
						input.innerHTML = '<span class="fas fa-arrow-circle-right"></span>'
						input.addEventListener("click", loadFile)
					element.appendChild(input)

				// upload
					var input = document.createElement("label")
						input.id = "tool-meta-upload"
						input.className = "button"
						input.innerHTML = '<input id="upload-link" type="file"><span class="fas fa-upload"></span>'
						input.addEventListener("click", uploadFile)
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
						bar.innerHTML = '<span class="fas fa-volume-up"></span>'
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

					window.instrument.setParameters({ name: event.target.value })
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
						downloadLink.addEventListener("click", function() {
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
					var custom = {}
					if (window.localStorage.synthesizers) {
						custom = JSON.parse(window.localStorage.synthesizers)	
					}

				// random
					if (name == "random") {
						var low0  = Math.random() *  10 + 0
						var high0 = Math.random() *  10 + 20
						var low4  = Math.random() * -10 + 80
						var high4 = Math.random() * -10 + 100

						setInstrument({
							name: "new synthesizer",
							polysynth: {
								"-12": !(Math.floor(Math.random() * 4 - 1)),
								"-7":  !(Math.floor(Math.random() * 5 - 1)),
								"0":   true,
								"4":   !(Math.floor(Math.random() * 3 - 1)),
								"7":   !(Math.floor(Math.random() * 4 - 1)),
								"10":  !(Math.floor(Math.random() * 5 - 1)),
								"12":  !(Math.floor(Math.random() * 3 - 1))
							},
							imag: [0, 1, Math.random() * (1/2), Math.random() * (1/3), Math.random() * (1/4), Math.random() * (1/5), Math.random() * (1/6), Math.random() * (1/7), Math.random() * (1/8), Math.random() * (1/9), Math.random() * (1/10), Math.random() * (1/11), Math.random() * (1/12), Math.random() * (1/13), Math.random() * (1/14), Math.random() * (1/15), Math.random() * (1/16), Math.random() * (1/17), Math.random() * (1/18), Math.random() * (1/19), Math.random() * (1/20), Math.random() * (1/21), Math.random() * (1/22), Math.random() * (1/23), Math.random() * (1/24), Math.random() * (1/25), Math.random() * (1/26), Math.random() * (1/27), Math.random() * (1/28), Math.random() * (1/29), Math.random() * (1/30), Math.random() * (1/31), Math.random() * (1/32), Math.random() * (1/33)],
							noise: {
								white: Math.floor(Math.random() * 2) / 10,
								pink:  Math.floor(Math.random() * 3) / 10,
								brown: Math.floor(Math.random() * 4) / 10
							},
							envelope: {
								attack:  Math.random(),
								decay:   Math.random(),
								sustain: Math.random(),
								release: Math.random()
							},
							bitcrusher: {
								bits: (Math.floor(Math.random() * 2) ? Math.pow(2, Math.floor(Math.random() * 6)) : 0),
								norm: Math.random()
							},
							echo: {
								delay:    Math.random() * 0.5,
								feedback: Math.random() * 0.8
							},
							filters: {
								"0": {
									low:  (440 * Math.pow(2, (  low0               - 45) / 12)),
									mid:  (440 * Math.pow(2, (((low0 + high0) / 2) - 45) / 12)),
									high: (440 * Math.pow(2, (         high0       - 45) / 12)),
									gain: (Math.random() * 50 - 25)
								},
								"4": {
									low:  (440 * Math.pow(2, (  low4               - 45) / 12)),
									mid:  (440 * Math.pow(2, (((low4 + high4) / 2) - 45) / 12)),
									high: (440 * Math.pow(2, (         high4       - 45) / 12)),
									gain: (Math.random() * 50 - 25)
								}
							}
						}, true)

						document.getElementById("tool-meta-select").value = document.getElementById("tool-meta-name").value = "new synthesizer"
						if (!Array.from(document.getElementById("tool-meta-select").querySelectorAll("option[value='new synthesizer']")).length) {
							var option = document.createElement("option")
								option.value = option.innerText = "new synthesizer"
							document.getElementById("tool-meta-select").appendChild(option)	
						}
					}
				
				// presets
					else if (["sine", "square", "triangle", "sawtooth", "shimmer", "jangle", "chordstrum", "lazerz", "darkflute", "buzzorgan", "swello", "honeyharp", "reedles", "boombash"].includes(name)) {
						switch (name) {
							case "sine":
								setInstrument({
									name: "sine",
									polysynth: {
										"0": true,
									},
									imag: [0, 1]
								}, true)
							break
							case "square":
								setInstrument({
									name: "square",
									polysynth: {
										"0": true,
									},
									imag: [0, (1/1), 0, (1/3), 0, (1/5), 0, (1/7), 0, (1/9), 0, (1/11), 0, (1/13), 0, (1/15), 0, (1/17), 0, (1/19), 0, (1/21), 0, (1/23), 0, (1/25), 0, (1/27), 0, (1/29), 0, (1/31), 0, (1/33)],
								}, true)
							break
							case "triangle":
								setInstrument({
									name: "triangle",
									polysynth: {
										"0": true,
									},
									imag: [0, (1/1), 0, (1/9), 0, (1/25), 0, (1/49), 0, (1/81), 0, (1/121), 0, (1/169), 0, (1/225), 0, (1/289), 0, (1/361), 0, (1/441), 0, (1/529), 0, (1/625), 0, (1/729), 0, (1/841), 0, (1/961), 0, (1/1089)],
								}, true)
							break
							case "sawtooth":
								setInstrument({
									name: "sawtooth",
									polysynth: {
										"0": true,
									},
									imag: [0, (1/1), (1/4), (1/9), (1/16), (1/25), (1/36), (1/49), (1/64), (1/81), (1/100), (1/121), (1/144), (1/169), (1/196), (1/225), (1/256), (1/289), (1/324), (1/361), (1/400), (1/441), (1/484), (1/529), (1/576), (1/625), (1/676), (1/729), (1/784), (1/841), (1/900), (1/961), (1/1024), (1/1089)],
								}, true)
							break
							case "shimmer":
								setInstrument({
									name: "shimmer",
									polysynth: {
										"0": true,
										"12": true
									},
									imag: [0, (1/1), 0, (1/3), 0, (1/5), 0, (1/7), 0, (1/9), 0, (1/11), 0, (1/13), 0, (1/15), 0, (1/17), 0, (1/19), 0, (1/21), 0, (1/23), 0, (1/25), 0, (1/27), 0, (1/29), 0, (1/31), 0, (1/33)],
									noise: {
										"white": 0.2,
									},
									envelope: {
										attack: 0.01,
										decay: 0.2,
										sustain: 0.3,
										release: 0.4
									},
									bitcrusher: {
										bits: 16,
										norm: 0.25
									},
									echo: {
										delay: 0.08,
										feedback: 0.7
									},
									filters: {
										"0": {
											low:  3.2445679498433218,
											mid:  32.70319566257483,
											high: 329.6275569128699,
											gain: 20
										},
										"4": {
											low:  1046.5022612023945,
											mid:  10548.081821211836,
											high: 106318.00258046597,
											gain: -20
										}
									}
								}, true)
							break
							case "jangle":
								setInstrument({
									"name":"jangle",
									"polysynth": {
										"0":true,
										"12":true,
										"-12":true
									},
									"imag":[0,1,0,0,0,0,0,0,0.46878501772880554,0,0,0,0,0,0,0,0.341684490442276,0,0,0,0,0,0,0,0.09400142729282379,0,0,0,0,0,0,0,0.21132497489452362,0.022081943228840828],
									"envelope":{
										"attack":0.0024277414605824318,
										"decay":0.2568350031240243,
										"sustain":0,
										"release":0.870276277426606
									},
									"filters":{
										"0":{
											"low":9.92437152514077,
											"mid":32.91541662897909,
											"high":109.16808677654838,
											"gain":-20.072992700729927
										},
										"4":{
											"low":1643.5737813862252,
											"mid":2711.746487860111,
											"high":4474.133803849979,
											"gain":15.835058285216256
										}
									},
									"echo":{
										"delay":0.07412233349465767,
										"feedback":0.6897265497330863
									}
								}, true)
							break
							case "chordstrum":
								setInstrument({
									"name":"chordstrum",
									"polysynth":{
										"0":true,
										"-5":true,
										"-12":true
									},
									"noise":{
										"brown":0.08951406649616368
									},
									"imag":[0,1,0.17831625044345856,0.46575266122817993,0.2041115015745163,0.4126817286014557,0.10914841294288635,0.060591064393520355,0.08364199101924896,0.02575693279504776,0.01693502813577652,0.05870021879673004,0.0666189193725586,0.05404908210039139,0.06647317111492157,0.03880130127072334,0.053111664950847626,0.051343005150556564,0,0.0007156424107961357,0.014325405471026897,0.015581578016281128,0.010473430156707764,0,0,0,0,0,0.0028332876972854137,0,0,0,0,0.002175448928028345],
									"envelope":{
										"attack":0.005265295838668044,
										"decay":1,
										"sustain":0,
										"release":1
									},
									"filters":{
										"0":{
											"low":50.26101396620003,
											"mid":68.13424375331833,
											"high":92.36334099742746,
											"gain":-8.282912235347773
										},
										"4":{
											"low":5800.5421831764315,
											"mid":7108.3924411351645,
											"high":8711.124150383675,
											"gain":21.70039155284401
										}
									},
									"echo":{
										"delay":0.0010553957105702905,
										"feedback":0.8857754774228093
									}
								}, true)
							break
							case "lazerz":
								setInstrument({
									"polysynth":{
										"0":true
									},
									"imag":[0,1,0.43981871008872986,0.19477427005767822,0.16363249719142914,0.04059608280658722,0.05547327548265457,0.08984045684337616,0.02408204786479473,0.05339190736413002,0.0810762494802475,0.049579720944166183,0.004129277542233467,0.06980492174625397,0.011852550320327282,0.011417913250625134,0.05199107900261879,0.0462377704679966,0.011805979534983635,0.041976239532232285,0.04228879511356354,0.03486672788858414,0.03639288619160652,0.005501041188836098,0.018338866531848907,0.004767595790326595,0.02615637518465519,0.016462303698062897,0.018449874594807625,0.03333821892738342,0.03183285519480705,0.022049419581890106,0.020332850515842438,0.0260325875133276],
									"envelope":{
										"attack":0.3189542050630094,
										"decay":0.6066113351908449,
										"sustain":0.2795546993048945,
										"release":0.2983127072001239
									},
									"filters":{
										"0":{
											"low":42.73771657635709,
											"mid":74.15621598227193,
											"high":128.6719274995506,
											"gain":19.39672225311667
										},
										"4":{
											"low":2236.228485250351,
											"mid":3672.0056804902356,
											"high":6029.627923303666,
											"gain":-14.155259381494123
										}
									},
									"bitcrusher":{
										"bits":1,
										"norm":0.9476107287222466
									},
									"echo":{
										"delay":0.21428571428571427,
										"feedback":0.2748267474475922
									}
								}, true)
							break
							case "darkflute":
								setInstrument({
									"name":"darkflute",
									"polysynth":{
										"0":true,
										"4":true,
										"-7":true
									},
									"noise":{
										"white":0.1
									},
									"imag":[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
									"envelope":{
										"attack":0.9681919358212048,
										"decay":0.9372387264087787,
										"sustain":0.8797216541216758,
										"release":0.3691070734990474
									},
									"filters":{
										"4":{
											"low":4861.69725806286,
											"mid":8906.515668158989,
											"high":16316.528392549255,
											"gain":-43.064876957494405
										}
									},
									"echo":{
										"delay":0.4607913227432864,
										"feedback":0.4463562957226408
									}
								}, true)
							break
							case "buzzorgan":
								setInstrument({
									"name":"buzzorgan",
									"polysynth":{
										"0":true,
										"12":true,
										"-12":true
									},
									"imag":[0,1,0.21180202066898346,0.26972323656082153,0.23025603592395782,0.10392707586288452,0.09607698768377304,0.004078438971191645,0.08116075396537781,0.09426583349704742,0.07034718245267868,0.017152125015854836,0.051849864423274994,0.046453963965177536,0.03873147815465927,0.02706083096563816,0.011153786443173885,0.055654577910900116,0.007712990511208773,0.043686047196388245,0.03128065913915634,0.012106683105230331,0.01296298485249281,0.02216235175728798,0.03157423809170723,0.015807228162884712,0.007788603659719229,0.023812558501958847,0.021190673112869263,0.03439936414361,0.01860993728041649,0.02965649776160717,0.02742370031774044,0.015811465680599213],
									"envelope":{
										"attack":0.23591836734693875,
										"decay":0.9772734693877552,
										"sustain":0.5715527734307078,
										"release":1
									},
									"filters":{
										"0":{
											"low":14.773411839663321,
											"mid":42.797509852848876,
											"high":123.98130299780767,
											"gain":-49.04364458355069
										},
										"1":{
											"low":2778.0684833207633,
											"mid":8372.018089619156,
											"high":20000,
											"gain":-47.0961571900539
										},
										"4":{
											"low":1420.4953144384704,
											"mid":4083.655439283772,
											"high":11739.737243261628,
											"gain":-47.37436967483916
										}
									},
									"echo":{
										"delay":0.006838905775075987,
										"feedback":0.9233031920688528
									}
								}, true)
							break
							case "swello":
								setInstrument({
									"name":"swello",
									"polysynth":{
										"-12":true
									},
									"noise":{
										"brown":0.1
									},
									"imag":[0,1,0.3432779610157013,0.2315126657485962,0.058497168123722076,0.1899126172065735,0.0448404885828495,0.12938399612903595,0.07931369543075562,0.054060198366642,0.0988508090376854,0.0522669218480587,0.056811220943927765,0.051076728850603104,0.032383546233177185,0.004351383075118065,0.04818083345890045,0.038509003818035126,0.014789948239922523,0.006924794986844063,0.034774232655763626,0.009429270401597023,0.003623893717303872,0.0258589219301939,0.0015618279576301575,0.022793792188167572,0.01324266754090786,0.007655204273760319,0.0041127512231469154,0.022874318063259125,0.016309715807437897,0.008302805945277214,0.008340908214449883,0.01348100509494543],
									"envelope":{
										"attack":0.6536874552533578,
										"decay":0.16818523697573773,
										"sustain":0.2436750666054115,
										"release":0.7992139733184318
									},
									"filters":{
										"0":{
											"low":46.48371972705465,
											"mid":57.57622349507208,
											"high":71.31575380412309,
											"gain":-16.833988616123463
										},
										"4":{
											"low":3769.0635387334974,
											"mid":5062.37024545204,
											"high":6799.458867878282,
											"gain":-16.171543609702944
										}
									},
									"echo":{
										"delay":0.009965899510513269,
										"feedback":0.7489922649526092
									}
								}, true)
							break
							case "honeyharp":
								setInstrument({
									"name": "honeyharp",
									"polysynth":{
										"0":true
									},
									"noise":{
										"brown":0.07771135781383433
									},
									"imag":[0,1,0,0.2178429514169693,0,0.14940421283245087,0,0.1158275306224823,0.3807923495769501,0.08310726284980774,0.0001470343122491613,0.05094950646162033,0,0.012528758496046066,0,0.030789503827691078,0,0.036400504410266876,0.0427282489836216,0.0037623702082782984,0.007912619970738888,0.0005064468132331967,0,0.003089423757046461,0,0.014406030997633934,0.019122179597616196,0.03117973357439041,0.00888627115637064,0.03448168560862541,0.0077970088459551334,0.029125453904271126,0.022520482540130615,0.0078049697913229465],
									"envelope":{
										"attack":0.008811254291446448,
										"decay":1,
										"sustain":0,
										"release":1
									},
									"filters":{
										"0":{
											"low":32.990956473904696,
											"mid":45.03353953692942,
											"high":61.47198808341059,
											"gain":21.545055096884937
										},
										"3":{
											"low":822.8462713537634,
											"mid":8221.107072310962,
											"high":20000,
											"gain":-25
										},
										"4":{
											"low":2390.278220900194,
											"mid":10548.081821211836,
											"high":20000,
											"gain":-25
										}
									},
									"echo":{
										"delay":0.00835524908457173,
										"feedback":0.7594509205795837
									}
								}, true)
							break
							case "reedles":
								setInstrument({
									"name": "reedles",
									"polysynth":{
										"0":true
									},
									"imag":[0,1,0.13321591913700104,0.23890696465969086,0.1848037987947464,0.06213591620326042,0.15851031243801117,0.013016369193792343,0.05386565998196602,0.11070278286933899,0.046062078326940536,0.05860947445034981,0.07818899303674698,0.017279257997870445,0.02893548458814621,0.019652292132377625,0.006511820014566183,0.026842080056667328,0.029128052294254303,0.04828658327460289,0.026606278494000435,0.043067075312137604,0.02284008078277111,0.03200739622116089,0.038210369646549225,0.03194240480661392,0.007605026010423899,0.011232322081923485,0.02774462290108204,0.0024622941855341196,0.016160927712917328,0.026034902781248093,0.0009380421251989901,0.005903569981455803],
									"envelope":{
										"attack":0.036862935925353835,
										"decay":0.18700753813155746,
										"sustain":0.730133889758303,
										"release":0.16572433174364076
									},
									"filters":{
										"0":{
											"low":17.00523847135155,
											"mid":34.791076828746036,
											"high":71.1791856928607,
											"gain":39.42792557816032
										},
										"4":{
											"low":4556.987960311114,
											"mid":9167.496497936349,
											"high":18442.662735044294,
											"gain":-22.335246044166226
										}
									},
									"bitcrusher":{
										"bits":8,
										"norm":0.9295249065172435
									},
									"echo":{
										"delay":0.04787234042553192,
										"feedback":0.16714675029034326
									}
								}, true)
							break
							case "boombash":
								setInstrument({
									"name": "boombash",
									"polysynth":{},
									"noise":{
										"brown":1,
										"pink":0.2578992314261315,
										"white":0.1964133219470538
									},
									"imag":[0,1,0.40868428349494934,0.08447276800870895,0.22822679579257965,0.09141869843006134,0.005311598069965839,0.10934562236070633,0.0996362492442131,0.0382666289806366,0.09824904054403305,0.09028502553701401,0.012032506987452507,0.05659491941332817,0.05894125625491142,0.017785757780075073,0.025360263884067535,0.02204047329723835,0.03494184464216232,0.04936360940337181,0.0045935348607599735,0.007627259939908981,0.033219072967767715,0.0008758257608860731,0.028195969760417938,0.012396937236189842,0.0006363214342854917,0.018868671730160713,0.011601193808019161,0.026970135048031807,0.03008001483976841,0.03183966875076294,0.01011782418936491,0.020333627238869667],
									"envelope":{
										"attack":0.001,
										"decay":0.14927021234744625,
										"sustain":0,
										"release":1
									},
									"filters":{
										"0":{
											"low":10,
											"mid":50,
											"high":220,
											"gain":20
										},
										"4":{
											"low":10,
											"mid":50,
											"high":220,
											"gain":25
										}
									},
									"echo":{
										"delay":0.03332033068666558,
										"feedback":0.25743545048480226
									}
								}, true)
							break
						}
					}

				// favorites
					else if (custom[name]) {
						try {
							setInstrument(custom[name], true)
						}
						catch (error) {
							console.log(error)
						}
					}
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
					window.instrument.setParameters({ power: 0 })
				}
				else {
					event.target.setAttribute("selected", true)
					window.instrument.setParameters({ power: 1 })
				}
			}

		/* adjustVolumeToolBar */
			function adjustVolumeToolBar(event) {
				// display
					var rectangle  = document.getElementById("tool-meta-volume-track").getBoundingClientRect()
					var input = document.getElementById("tool-meta-volume-input")

					var percentage = (event.x - rectangle.left) * 100 / (rectangle.width)
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
					window.instrument.setParameters({ volume: (percentage / 100) })
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
						toggle.innerHTML = Math.abs(i)
						toggle.style.left = 4 * (i + 12) + "%"
					polysynthTool.appendChild(toggle)
				}
			}

		/* adjustPolysynthToolToggle */
			function adjustPolysynthToolToggle(event, setup) {
				if (event.target.getAttribute("selected")) {
					event.target.removeAttribute("selected")

					if (!setup) {
						var polysynth = {}
							polysynth[Number(event.target.value)] = false
						window.instrument.setParameters({ polysynth: polysynth })
					}
				}
				else {
					event.target.setAttribute("selected", true)
					
					if (!setup) {
						var polysynth = {}
							polysynth[Number(event.target.value)] = true
						window.instrument.setParameters({ polysynth: polysynth })
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

					var percentage = (rectangle.bottom - event.y) * 100 / (rectangle.height)
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
						window.instrument.setParameters({harmonic: harmonic})
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

					// power
						var toggle = document.createElement("button")
							toggle.id = "tool-noise-power--" + color
							toggle.className = "toggle"
							toggle.innerHTML = '<span class="fas fa-cloud"></span>'
						element.appendChild(toggle)
				}
			}

		/* adjustNoiseToolBar */
			function adjustNoiseToolBar(event) {
				// display
					var type = parameter.id.split("--")[1]
					var rectangle  = document.getElementById("tool-noise-volume-track--" + type).getBoundingClientRect()
					var input = document.getElementById("tool-noise-volume-input--" + type)

					var percentage = (event.x - rectangle.left) * 100 / (rectangle.width)
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
					if (document.getElementById("tool-noise-power--" + type).getAttribute("selected") && !setup) {
						var noise = {}
							noise[type] = percentage / 100
						window.instrument.setParameters({ noise: noise })
					}
			}

		/* adjustNoiseToolToggle */
			function adjustNoiseToolToggle(event, setup) {
				if (event.target.getAttribute("selected")) {
					event.target.removeAttribute("selected")

					if (!setup) {
						var type = event.target.id.split("--")[1]
						var noise = {}
							noise[type] = 0
						window.instrument.setParameters({ noise: noise })
					}
				}
				else {
					event.target.setAttribute("selected", true)

					if (!setup) {
						var type = event.target.id.split("--")[1]
						var percentage = document.getElementById("tool-noise-volume-input--" + type).value
							percentage = Math.min(100, Math.max(0, percentage))
						var noise = {}
							noise[type] = percentage / 100
						window.instrument.setParameters({ noise: noise })
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
					
					switch (type) {
						case "attack":
						case "decay":
							var percentage = (event.x - shape.left) * 100 / (rectangle.width)
								percentage = Math.min(25, Math.max(0, percentage))
							parameter.style.width = percentage + "%"
							input.value = Math.pow(percentage * 4 / 10, 2)
						break
						case "release":
							var percentage = (shape.right - event.x) * 100 / (rectangle.width)
								percentage = Math.min(25, Math.max(0, percentage))
							parameter.style.width = percentage + "%"
							input.value = Math.pow(percentage * 4 / 10, 2)
						break
						case "sustain":
							var percentage = (rectangle.bottom - event.y) * 100 / (rectangle.height)
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

						window.instrument.setParameters({ envelope: envelope })
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
							toggle.innerHTML = Math.pow(2, i)
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
							window.instrument.setParameters({ bitcrusher: bitcrusher })
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

							window.instrument.setParameters({ bitcrusher: bitcrusher })
						}
					}
			}

		/* adjustBitcrusherToolBar */
			function adjustBitcrusherToolBar(event) {
				// display
					var rectangle  = document.getElementById("tool-bitcrusher-norm-track").getBoundingClientRect()
					var input = document.getElementById("tool-bitcrusher-norm-input")

					var percentage = (event.x - rectangle.left) * 100 / (rectangle.width)
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
						window.instrument.setParameters({ bitcrusher: bitcrusher })
					}
			}

	/*** tool-filter ***/
		/* buildFilterTool */
			function buildFilterTool() {
				var filterTool = document.getElementById("tool-filter")

				// lines
					for (var i = 0; i <= 100; i++) {
						if (i % 12 == 0) {
							var line = document.createElement("div")
								line.id = "tool-filter-line--" + i
								line.className = "line"
								line.innerHTML = "C" + ((i / 12) + 1)
								line.style.left = i + "%"
							filterTool.appendChild(line)
						}
					}

				// track
					var track = document.createElement("div")
						track.className = "track"
						track.id = "tool-filter-track"
					filterTool.appendChild(track)

				// filter shapes / inputs
					for (var i = 0; i <= 4; i++) {
						// data
							var low  = 24 + 12 * (i + 0.4)
							var high = 24 + 12 * (i - 0.4)
							var gain = 0
						
						// blobs
							var blob = document.createElement("div")
								blob.className = "blob"
								blob.id = "tool-filter-blob--" + i
								blob.style["clip-path"] = "polygon(100% 50%, 100% 100%, 0% 100%, 0% 50%, " + low + "% 50%, " + ((low + high) / 2) + "% " + (50 - gain) + "%, " + high + "% 50%)"
							track.appendChild(blob)

						// low
							var shape = document.createElement("div")
								shape.className = "shape square"
								shape.id = "tool-filter-shape--low--" + i
								shape.style.left = low + "%"
								shape.style.top = "50%"
							track.appendChild(shape)

							var input = document.createElement("input")
								input.setAttribute("type", "number")
								input.setAttribute("min", 0)
								input.setAttribute("max", 100)
								input.className = "input"
								input.id = "tool-filter-input--low--" + i
								input.value = low
								input.style.left = Math.max(5, Math.min(95, ((low + high) / 2))) + "%"
								input.style.bottom = "30px"
							filterTool.appendChild(input)

						// gain
							var shape = document.createElement("div")
								shape.className = "shape circle"
								shape.id = "tool-filter-shape--gain--" + i
								shape.style.left = ((low + high) / 2) + "%"
								shape.style.top = (50 - gain) + "%"
							track.appendChild(shape)

							var input = document.createElement("input")
								input.setAttribute("type", "number")
								input.setAttribute("min", -50)
								input.setAttribute("max", 50)
								input.className = "input"
								input.id = "tool-filter-input--gain--" + i
								input.value = gain
								input.style.left = Math.max(5, Math.min(95, ((low + high) / 2))) + "%"
								input.style.bottom = "15px"
							filterTool.appendChild(input)

						// high
							var shape = document.createElement("div")
								shape.className = "shape square"
								shape.id = "tool-filter-shape--high--" + i
								shape.style.left = high + "%"
								shape.style.top = "50%"
							track.appendChild(shape)

							var input = document.createElement("input")
								input.setAttribute("type", "number")
								input.setAttribute("min", 0)
								input.setAttribute("max", 100)
								input.className = "input"
								input.id = "tool-filter-input--high--" + i
								input.value = high
								input.style.left = Math.max(5, Math.min(95, ((low + high) / 2))) + "%"
								input.style.bottom = "0px"
							filterTool.appendChild(input)
					}
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
				
				// gain
					if (type == "gain") {
						var percentage = (event.y - rectangle.top) * 100 / (rectangle.height)
							percentage = Math.min(100, Math.max(0, percentage))
						parameter.style.top = percentage + "%"
						input.value = (50 - percentage)

						var percentage = (event.x - rectangle.left) * 100 / (rectangle.width)
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

						var percentage = (event.x - rectangle.left) * 100 / (rectangle.width)
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

						var percentage = (event.x - rectangle.left) * 100 / (rectangle.width)
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
					blob.style["clip-path"] = "polygon(100% 50%, 100% 100%, 0% 100%, 0% 50%, " + lowValue + "% 50%, " + ((lowValue + highValue) / 2) + "% " + (50 - gainValue) + "%, " + highValue + "% 50%)"
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

						window.instrument.setParameters({ filters: filters })
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
						bar.innerHTML = '<span class="fas fa-arrows-alt-v"></span>'
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
						bar.innerHTML = '<span class="fas fa-arrows-alt-h"></span>'
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

					switch (type) {
						case "feedback":
							var percentage = (rectangle.bottom - event.y) * 100 / (rectangle.height)
								percentage = Math.min(100, Math.max(0, percentage))
							parameter.style.height = percentage + "%"
							input.value = percentage
						break
						case "delay":
							var percentage = (event.x - rectangle.left) * 100 / (rectangle.width)
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
						window.instrument.setParameters({ echo: echo })
					}
			}

	/*** helpers ***/
		/* getKey */
			function getKey(keycode) {
				switch (keycode) {
					case 65:
						return 0
					break
					case 87:
						return 1
					break
					case 83:
						return 2
					break
					case 69:
						return 3
					break
					case 68:
						return 4
					break
					case 70:
						return 5
					break
					case 84:
						return 6
					break
					case 71:
						return 7
					break
					case 89:
						return 8
					break
					case 72:
						return 9
					break
					case 85:
						return 10
					break
					case 74:
						return 11
					break
					case 75:
						return 12
					break
					case 79:
						return 13
					break
					case 76:
						return 14
					break
					case 80:
						return 15
					break
					case 186:
						return 16
					break
					case 222:
						return 17
					break
					case 221:
						return 18
					break
					case 13:
						return 19
					break
					case 220:
						return 20
					break
					default:
						return null
				}
			}

		/* getFrequency */
			function getFrequency(note) {
				note = Math.max(0, Math.min(36, Number(note) || 0))

				switch (note) {
					case 0: 			// C3
						return [130.81, "C", 0, 3]
					break
					case 1: 			// C#3 / Db3
						return [138.59, "C", 1, 3]
					break
					case 2: 			// D3
						return [146.83, "D", 0, 3]
					break
					case 3: 			// D#3 / Eb3
						return [155.56, "E", -1, 3]
					break
					case 4: 			// E3
						return [164.81, "E", 0, 3]
					break
					case 5: 			// F3
						return [174.61, "F", 0, 3]
					break
					case 6: 			// F#3 / Gb3
						return [185.00, "F", 1, 3]
					break
					case 7: 			// G
						return [196.00, "G", 0, 3]
					break
					case 8: 			// G#3 / Ab3
						return [207.65, "A", -1, 3]
					break
					case 9: 			// A3
						return [220.00, "A", 0, 3]
					break
					case 10: 			// A#3 / Bb3
						return [233.08, "B", -1, 3]
					break
					case 11: 			// B3
						return [246.94, "B", 0, 3]
					break
					case 12: 			// C4
						return [261.63, "C", 0, 4]
					break
					case 13: 			// C#4 / Db4
						return [277.18, "C", 1, 4]
					break
					case 14: 			// D4
						return [293.67, "D", 0, 4]
					break
					case 15: 			// D#4 / Eb4
						return [311.13, "E", -1, 4]
					break
					case 16: 			// E4
						return [329.63, "E", 0, 4]
					break
					case 17: 			// F4
						return [349.23, "F", 0, 4]
					break
					case 18: 			// F#4 / Gb4
						return [369.99, "F", 1, 4]
					break
					case 19: 			// G4
						return [392.00, "G", 0, 4]
					break
					case 20: 			// G#4 / Ab4
						return [415.30, "A", -1, 4]
					break
					case 21: 			// A4
						return [440.00, "A", 0, 4]
					break
					case 22: 			// A#4 / Bb4
						return [466.16, "B", -1, 4]
					break
					case 23: 			// B4
						return [493.88, "B", 0, 4]
					break
					case 24: 			// C5
						return [523.25, "C", 0, 5]
					break
					case 25: 			// C#5 / Db5
						return [554.37, "C", 1, 5]
					break
					case 26: 			// D5
						return [587.33, "D", 0, 5]
					break
					case 27: 			// D#5 / Eb5
						return [622.25, "E", -1, 5]
					break
					case 28: 			// E5
						return [659.25, "E", 0, 5]
					break
					case 29: 			// F5
						return [698.46, "F", 0, 5]
					break
					case 30: 			// F#5 / Gb5
						return [739.99, "F", 1, 5]
					break
					case 31: 			// G5
						return [783.99, "G", 0, 5]
					break
					case 32: 			// G#5 / Ab5
						return [830.61, "A", -1, 5]
					break
					case 33: 			// A5
						return [880.00, "A", 0, 5]
					break
					case 34: 			// A#5 / Bb5
						return [932.33, "B", -1, 5]
					break
					case 35: 			// B5
						return [987.77, "B", 0, 5]
					break
					case 36: 			// C6
						return [1046.50, "C", 0, 6]
					break
					default:
						return false
				}
			}

	/*** keyboard ***/
		/* buildKeyboard */
			function buildKeyboard() {
				// data
					var keyboard = document.getElementById("keyboard")
					var count = 0
					var letters = ["a","w","s","e","d", "f","t","g","y","h","u","j","k","o","l","p",";","'","]","&#8629;","\\"]
				
				for (var i = 0; i <= 24; i++) {
					// build key
						var element = document.createElement("button")
							element.className = "key"
							element.id = "key--" + i
							if (letters[i]) { element.innerHTML = letters[i] }
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
			Array.from(document.querySelectorAll(".key")).forEach(function (k) { k.addEventListener("mousedown", pressKey) })
			document.addEventListener("keydown", pressKey)
			function pressKey(event) {		
				// keyboard or mouse?
					if (event.type == "mousedown") {
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
						window.instrument.press(getFrequency(press.id.split("--")[1])[0])
					}
			}

		/* liftKey */
			document.addEventListener("mouseup", liftKey)
			document.addEventListener("keyup", liftKey)
			function liftKey(event) {
				// keyboard or mouse?
					if ((event.type == "mouseup") && key) {
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
						window.instrument.lift(getFrequency(lift.id.split("--")[1])[0])
					}
			}

})
