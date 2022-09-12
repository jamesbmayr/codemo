/*** globals ***/
	/* audio */
		if (!AUDIO_J) {
			AUDIO_J = window.AUDIO_J
		}

	/* triggers */
		const TRIGGERS = {
			click: "click",
			mousedown: "mousedown",
			mousemove: "mousemove",
			mouseup: "mouseup",
			keydown: "keydown",
			keyup: "keyup",
			change: "change"
		}
		if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
			TRIGGERS.click = "touchstart"
			TRIGGERS.mousedown = "touchstart"
			TRIGGERS.mousemove = "touchmove"
			TRIGGERS.mouseup = "touchend"
		}

	/* constants */
		const CONSTANTS = {
			percentage: 100,
			envelopeComponentMaxPercentage: 25,
			envelopeComponentMinPercentage: 3,
			decayClippath: "polygon(0% 0%, 0% 100%, 100% 100%, 100% 100%)",
			bitcrusherBorderRadiusPercentage: 5,
			filterStartingWidthPercentage: 20,
			filterEdgePercentage: 5,
			echoBeamStart: 3,
			echoBeamCount: 32,
			keyboardLetters: ["a","w","s","e","d", "f","t","g","y","h","u","j","k","o","l","p",";","'","]","&#8629;","\\"],
			keyboardStartPitch: 48,
			keyboardEndPitch: 72,
			whiteKeyCount: 15,
			blackKeyOffset: 0.4,
			blackKeys: [1,3,6,8,10],
			whichToPitch: {
				"65": "48",
				"87": "49",
				"83": "50",
				"69": "51",
				"68": "52",
				"70": "53",
				"84": "54",
				"71": "55",
				"89": "56",
				"72": "57",
				"85": "58",
				"74": "59",
				"75": "60",
				"79": "61",
				"76": "62",
				"80": "63",
				"186":"64",
				"222":"65",
				"221":"66",
				"13": "67",
				"220":"68"
			}
		}

	/* state */
		const STATE = {
			tool: null,
			parameter: null,
			key: null
		}

	/* elements */
		const ELEMENTS = {
			html: document,
			body: document.body,
			tools: document.querySelector("#tools"),
			toolSections: {
				"tool-meta": document.querySelector("#tool-meta"),
				"tool-polysynth": document.querySelector("#tool-polysynth"),
				"tool-wave": document.querySelector("#tool-wave"),
				"tool-noise": document.querySelector("#tool-noise"),
				"tool-envelope": document.querySelector("#tool-envelope"),
				"tool-bitcrusher": document.querySelector("#tool-bitcrusher"),
				"tool-filter": document.querySelector("#tool-filter"),
				"tool-echo": document.querySelector("#tool-echo")
			},
			switcher: document.querySelector("#switcher"),
			switcherButtons: {
				"tool-meta": document.querySelector("#switcher button[value='tool-meta']"),
				"tool-polysynth": document.querySelector("#switcher button[value='tool-polysynth']"),
				"tool-wave": document.querySelector("#switcher button[value='tool-wave']"),
				"tool-noise": document.querySelector("#switcher button[value='tool-noise']"),
				"tool-envelope": document.querySelector("#switcher button[value='tool-envelope']"),
				"tool-bitcrusher": document.querySelector("#switcher button[value='tool-bitcrusher']"),
				"tool-filter": document.querySelector("#switcher button[value='tool-filter']"),
				"tool-echo": document.querySelector("#switcher button[value='tool-echo']")
			},
			keyboard: document.querySelector("#keyboard"),
			keys: {},
			"tool-meta": {},
			"tool-polysynth": {},
			"tool-wave": {},
			"tool-noise": {},
			"tool-envelope": {},
			"tool-bitcrusher": {},
			"tool-filter": {},
			"tool-echo": {}
		}

	/* prevent right-click / drag-&-drop */
		ELEMENTS.body.ondragstart   = function() { return false }
		ELEMENTS.body.ondrop        = function() { return false }
		ELEMENTS.body.oncontextmenu = function() { return false }

	/* builds */
		buildTools()
		
/*** tools ***/
	/* selectTool */
		for (let b in ELEMENTS.switcherButtons) {
			ELEMENTS.switcherButtons[b].addEventListener(TRIGGERS.click, selectTool) 
		}
		function selectTool(event) {
			try {
				// deselect all tools & buttons
					for (let t in ELEMENTS.toolSections) {
						ELEMENTS.switcherButtons[t].removeAttribute("selected")
						ELEMENTS.toolSections[t].removeAttribute("selected")
					}

				// select tool & button
					event.target.setAttribute("selected", true)
					STATE.tool = ELEMENTS.toolSections[event.target.value]
					STATE.tool.setAttribute("selected", true)
			} catch (error) {console.log(error)}
		}

	/* buildTools */
		function buildTools() {
			try {
				// build tools
					buildMetaTools()
					buildWaveTool()
					buildPolysynthTool()
					buildNoiseTool()
					buildEnvelopeTool()
					buildBitcrusherTool()
					buildFilterTool()
					buildEchoTool()
					buildKeyboard()

				// select meta
					selectTool({target: ELEMENTS.switcherButtons["tool-meta"]})

				// default instrument from list
					const defaultInstruments = AUDIO_J.getInstruments("default")
					AUDIO_J.activeInstrumentId = defaultInstruments[Math.floor(Math.random() * defaultInstruments.length)]
					ELEMENTS["tool-meta"]["select"].value = AUDIO_J.activeInstrumentId
					ELEMENTS["tool-meta"]["name"].value = AUDIO_J.activeInstrumentId
			} catch (error) {console.log(error)}
		}

	/* first click */
		ELEMENTS.html.addEventListener(TRIGGERS.click, firstClick)
		function firstClick() {
			try {
				if (AUDIO_J.audio) {
					return
				}
				
				buildAudio()
				if (!AUDIO_J.activeInstrumentId) {
					return
				}

				const parameters = AUDIO_J.getInstrument(AUDIO_J.activeInstrumentId)
				if (!parameters) {
					return
				}

				setInstrument(parameters, true)
			} catch (error) {console.log(error)}
		}

	/* setInstrument */
		function setInstrument(parameters, setup) {
			try {
				// existing instrument
					if (AUDIO_J.instruments[AUDIO_J.activeInstrumentId]) {
						AUDIO_J.instruments[AUDIO_J.activeInstrumentId].setParameters({ power: 0 })
					}

				// no parameters
					if (!parameters || !Object.keys(parameters).length) {
						return
					}

				// audio
					const instrument = AUDIO_J.buildInstrument(parameters)
					AUDIO_J.activeInstrumentId = instrument.parameters.name
					AUDIO_J.instruments[AUDIO_J.activeInstrumentId] = instrument

				// name & meta
					instrument.parameters.name = parameters.name || "synthesizer #" + Math.floor(Math.random() * 10e6)
					ELEMENTS["tool-meta"]["name"].value = parameters["name"]
					if (!ELEMENTS["tool-meta"]["select"].querySelector("option[value='" + instrument.parameters.name + "']")) {
						const option = document.createElement("option")
							option.value = instrument.parameters.name
							option.innerText = instrument.parameters.name
						ELEMENTS["tool-meta"]["group-custom"].appendChild(option)
					}
					ELEMENTS["tool-meta"]["select"].value = instrument.parameters.name

					if (AUDIO_J.getInstruments("simple").includes(instrument.parameters.name) || AUDIO_J.getInstruments("default").includes(instrument.parameters.name)) {
						ELEMENTS.toolSections["tool-meta"].removeAttribute("custom")
					}
					else {
						ELEMENTS.toolSections["tool-meta"].setAttribute("custom", true)
					}

				// power
					const power = ELEMENTS["tool-meta"]["power"].getAttribute("selected") || false
					instrument.setParameters({ power: power ? 1 : 0 })

				// volume
					const volume = Math.max(0, Math.min(CONSTANTS.percentage, ELEMENTS["tool-meta"]["volume-input"].value / CONSTANTS.percentage))
					instrument.setParameters({ volume: volume })

				// wave
					for (let x = 1; x <= AUDIO_J.constants.waveCount; x++) {
						const value = parameters.imag ? (parameters.imag[x] || 0) : 0
						const target = ELEMENTS["tool-wave"]["input--" + x]
							target.value = CONSTANTS.percentage * value
						adjustWaveToolInput({target: target}, setup)
					}

				// polysynth
					for (let x = -AUDIO_J.constants.semitonesPerOctave; x <= AUDIO_J.constants.semitonesPerOctave; x++) {
						const value = parameters["polysynth"] ? (parameters["polysynth"][x] || false) : false
						const target = ELEMENTS["tool-polysynth"]["toggle--" + x]
						if (!target.getAttribute("selected") && value) {
							adjustPolysynthToolToggle({target: target}, setup)
						}
						else if (target.getAttribute("selected") && !value) {
							adjustPolysynthToolToggle({target: target}, setup)
						}
					}
				
				// noise
					for (let color in AUDIO_J.noise) {
						const value = parameters.noise ? (parameters.noise[color] || 0) : 0
						const target = ELEMENTS["tool-noise"]["volume-input--" + color]
							target.value = (CONSTANTS.percentage * Number(value)) || 0
						adjustNoiseToolInput({target: target}, setup)
					}

				// envelope
					for (let x in AUDIO_J.constants.envelopeComponents) {
						const value = parameters.envelope ? (parameters.envelope[AUDIO_J.constants.envelopeComponents[x]] || 0) : (AUDIO_J.constants.envelopeComponents[x] == "sustain" ? 1 : 0)
						const target = ELEMENTS["tool-envelope"]["input--" + AUDIO_J.constants.envelopeComponents[x]]
							target.value = CONSTANTS.percentage * value
						adjustEnvelopeToolInput({target: target}, setup)
					}

				// bitcrusher
					if (parameters.bitcrusher) {
						const target = ELEMENTS["tool-bitcrusher"]["bits-toggle--" + parameters.bitcrusher.bits]
						if (!target.getAttribute("selected")) {
							adjustBitcrusherToolToggle({target: target}, setup)
						}
					}
					else {
						const target = ELEMENTS["tool-bitcrusher"]["bits-toggle--0"]
						if (!target.getAttribute("selected")) {
							adjustBitcrusherToolToggle({target: target}, setup)
						}
					}

					const bitcrusherNorm = ELEMENTS["tool-bitcrusher"]["norm-input"]
						bitcrusherNorm.value = Math.max(0, Math.min(1, parameters.bitcrusher ? parameters.bitcrusher.norm : 0)) * CONSTANTS.percentage
					adjustBitcrusherToolInput({target: bitcrusherNorm}, setup)
						
				// filters
					const filters = Array.from(document.querySelectorAll("#tool-filter-track .blob"))
					for (let x in filters) {
						deselectFilterToolBar(null, Number(filters[x].id.split("--")[1]))
					}

					if (parameters.filters && Object.keys(parameters.filters).length) {
						for (let x = 0; x < Object.keys(parameters.filters).length; x++) {
							const obj = parameters.filters[x] || null
							if (!obj || !obj.gain || Math.abs(obj.gain) < AUDIO_J.constants.filterGainThreshold) {
								continue
							}
							obj.number = x
							createFilter(null, obj)
						}
					}
				
				// echo
					const delayValue = parameters.echo ? (parameters.echo.delay || 0) : 0
					const delayTarget = ELEMENTS["tool-echo"]["input--delay"]
						delayTarget.value = CONSTANTS.percentage * delayValue
					adjustEchoToolInput({target: delayTarget}, setup)

					const feedbackValue = parameters.echo ? (parameters.echo.feedback || 0) : 0
					const feedbackTarget = ELEMENTS["tool-echo"]["input--feedback"]
						feedbackTarget.value = CONSTANTS.percentage * feedbackValue
					adjustEchoToolInput({target: feedbackTarget}, setup)

				// localstorage
					saveFile()
			} catch (error) {console.log(error)}
		}

/*** bars & inputs ***/
	/* selectBar */
		function selectBar(event) {
			try {
				if (STATE.tool) {
					STATE.parameter = event.target
					event.target.setAttribute("selected", true)
					STATE.tool.setAttribute("grabbing", true)

					moveBar(event)
				}
			} catch (error) {console.log(error)}
		}

	/* moveBar */
		window.addEventListener(TRIGGERS.mousemove, moveBar)
		function moveBar(event) {
			try {
				if (STATE.tool && STATE.parameter) {
					switch (STATE.tool.id) {
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
			} catch (error) {console.log(error)}
		}

	/* deselectBar */
		window.addEventListener(TRIGGERS.mouseup, deselectBar)
		function deselectBar(event) {
			try {
				if (STATE.tool && STATE.parameter) {
					if (STATE.tool.id == "tool-filter") {
						deselectFilterToolBar(event)
					}

					STATE.tool.removeAttribute("grabbing")
					STATE.parameter.removeAttribute("selected")
					STATE.parameter = null
				}
			} catch (error) {console.log(error)}
		}

/*** tool-meta ***/
	/* buildMetaTools */
		function buildMetaTools() {
			try {
				// file (name, save, download, select, load, upload)
					const fileSection = document.createElement("div")
						fileSection.id = "tool-meta-file"
						fileSection.className = "section"
					ELEMENTS.toolSections["tool-meta"].appendChild(fileSection)

				// select
					const instrumentSelect = document.createElement("select")
						instrumentSelect.id = "tool-meta-select"
						instrumentSelect.className = "input"
						instrumentSelect.addEventListener(TRIGGERS.change, loadFile)
						fileSection.appendChild(instrumentSelect)
					ELEMENTS["tool-meta"]["select"] = instrumentSelect

						const randomGroup = document.createElement("optgroup")
							randomGroup.id = "tool-meta-select-group-random"
							randomGroup.label = "--- RANDOM ---"
						instrumentSelect.appendChild(randomGroup)
						ELEMENTS["tool-meta"]["group-random"] = randomGroup

							const randomOption = document.createElement("option")
								randomOption.innerText = "random"
								randomOption.value = "random"
							randomGroup.appendChild(randomOption)

						const simpleGroup = document.createElement("optgroup")
							simpleGroup.id = "tool-meta-select-group-simple"
							simpleGroup.label = "--- SIMPLE ---"
						instrumentSelect.appendChild(simpleGroup)
						ELEMENTS["tool-meta"]["group-simple"] = simpleGroup

							const simpleInstruments = AUDIO_J.getInstruments("simple")
							for (let o in simpleInstruments) {
								const instrumentOption = document.createElement("option")
									instrumentOption.innerText = simpleInstruments[o]
									instrumentOption.value = simpleInstruments[o]
								simpleGroup.appendChild(instrumentOption)
							}

						const defaultsGroup = document.createElement("optgroup")
							defaultsGroup.id = "tool-meta-select-group-defaults"
							defaultsGroup.label = "--- DEFAULTS ---"
						instrumentSelect.appendChild(defaultsGroup)
						ELEMENTS["tool-meta"]["group-defaults"] = defaultsGroup

							const defaultInstruments = AUDIO_J.getInstruments("default")
							for (let o in defaultInstruments) {
								const instrumentOption = document.createElement("option")
									instrumentOption.innerText = defaultInstruments[o]
									instrumentOption.value = defaultInstruments[o]
								defaultsGroup.appendChild(instrumentOption)
							}

						const customGroup = document.createElement("optgroup")
							customGroup.id = "tool-meta-select-group-custom"
							customGroup.label = "--- CUSTOM ---"
						instrumentSelect.appendChild(customGroup)
						ELEMENTS["tool-meta"]["group-custom"] = customGroup

							const customInstruments = AUDIO_J.getInstruments("custom")
							for (let o in customInstruments) {
								const instrumentOption = document.createElement("option")
									instrumentOption.innerText = customInstruments[o]
									instrumentOption.value = customInstruments[o]
								customGroup.appendChild(instrumentOption)
							}

				// upload
					const uploadLabel = document.createElement("label")
						uploadLabel.id = "tool-meta-upload"
						uploadLabel.className = "button"
					fileSection.appendChild(uploadLabel)

						const uploadInput = document.createElement("input")
							uploadInput.id = "upload-link"
							uploadInput.type = "file"
							uploadInput.addEventListener(TRIGGERS.change, uploadFile)
						uploadLabel.appendChild(uploadInput)
						ELEMENTS["tool-meta"]["upload-link"] = uploadInput

						const uploadSpan = document.createElement("span")
							uploadSpan.className = "fas fa-upload"
						uploadLabel.appendChild(uploadSpan)

				// delete
					const deleteButton = document.createElement("button")
						deleteButton.id = "tool-meta-delete"
						deleteButton.className = "button"
						deleteButton.innerHTML = '<span class="fas fa-trash"></span>'
						deleteButton.addEventListener(TRIGGERS.click, deleteFile)
					fileSection.appendChild(deleteButton)
					ELEMENTS["tool-meta"]["delete"] = deleteButton

				// name
					const nameInput = document.createElement("input")
						nameInput.id = "tool-meta-name"
						nameInput.className = "input"
						nameInput.setAttribute("placeholder", "instrument name")
						nameInput.value = "synthesizer"
						nameInput.addEventListener(TRIGGERS.change, nameFile)
					fileSection.appendChild(nameInput)
					ELEMENTS["tool-meta"]["name"] = nameInput

				// download
					const downloadButton = document.createElement("button")
						downloadButton.id = "tool-meta-download"
						downloadButton.className = "button"
						downloadButton.innerHTML = '<span class="fas fa-download"></span>'
						downloadButton.addEventListener(TRIGGERS.click, downloadFile)
					fileSection.appendChild(downloadButton)
					ELEMENTS["tool-meta"]["download"] = downloadButton

				// power
					const powerSection = document.createElement("div")
						powerSection.id = "tool-meta-volume"
						powerSection.className = "section"
					ELEMENTS.toolSections["tool-meta"].appendChild(powerSection)

					const powerToggle = document.createElement("button")
						powerToggle.id = "tool-meta-power"
						powerToggle.className = "toggle"
						powerToggle.setAttribute("selected", true)
						powerToggle.innerHTML = '<span class="fas fa-power-off"></span>'
						powerToggle.addEventListener(TRIGGERS.click, adjustPowerToolToggle)
					powerSection.appendChild(powerToggle)
					ELEMENTS["tool-meta"]["power"] = powerToggle

				// volume
					const volumeInput = document.createElement("input")
						volumeInput.setAttribute("type", "number")
						volumeInput.setAttribute("min", 0)
						volumeInput.setAttribute("max", CONSTANTS.percentage)
						volumeInput.className = "input"
						volumeInput.id = "tool-meta-volume-input"
						volumeInput.value = 50
						volumeInput.addEventListener(TRIGGERS.change, adjustVolumeToolInput)
					powerSection.appendChild(volumeInput)
					ELEMENTS["tool-meta"]["volume-input"] = volumeInput

					const volumeTrack = document.createElement("div")
						volumeTrack.id = "tool-meta-volume-track"
						volumeTrack.className = "track"
					powerSection.appendChild(volumeTrack)
					ELEMENTS["tool-meta"]["volume-track"] = volumeTrack

						const volumeBar = document.createElement("div")
							volumeBar.id = "tool-meta-volume-bar"
							volumeBar.className = "bar"
							volumeBar.style.width = "50%"
							volumeBar.innerHTML = '<span class="fas fa-volume-up"></span>'
							volumeBar.addEventListener(TRIGGERS.mousedown, selectBar)
						volumeTrack.appendChild(volumeBar)
						ELEMENTS["tool-meta"]["volume-bar"] = volumeBar
			} catch (error) {console.log(error)}
		}

	/* nameFile */
		function nameFile(event) {
			try {
				// name
					const oldName = AUDIO_J.instruments[AUDIO_J.activeInstrumentId].parameters.name
					const newName = event.target.value.trim()
					
					AUDIO_J.activeInstrumentId = newName
					AUDIO_J.instruments[AUDIO_J.activeInstrumentId] = AUDIO_J.instruments[oldName]
					deleteFile(null, oldName)

				// options
					const options = Array.from(ELEMENTS["tool-meta"]["select"].querySelectorAll("option"))
					const option = options.find(function (o) {
						return o.value == oldName
					}) || null
					if (option) {
						option.value = newName
						option.innerText = newName
					}

				// save
					if (AUDIO_J.instruments[AUDIO_J.activeInstrumentId]) { AUDIO_J.instruments[AUDIO_J.activeInstrumentId].setParameters({ name: newName }) }
					saveFile()
			} catch (error) {console.log(error)}
		}

	/* saveFile */
		function saveFile(event) {
			try {
				// default
					const name = AUDIO_J.activeInstrumentId
					if (!name || AUDIO_J.getInstruments("simple").includes(name) || AUDIO_J.getInstruments("default").includes(name)) {
						return
					}

				// get data
					let custom = {}
					if (window.localStorage.synthesizers) {
						custom = JSON.parse(window.localStorage.synthesizers) || {}
					}

				// package up
					custom[name] = JSON.parse(JSON.stringify(AUDIO_J.instruments[AUDIO_J.activeInstrumentId].parameters))
					custom[name].imag = Array.from(AUDIO_J.instruments[AUDIO_J.activeInstrumentId].parameters.imag)
					custom[name].real = Array.from(AUDIO_J.instruments[AUDIO_J.activeInstrumentId].parameters.real)
				
				// save
					window.localStorage.synthesizers = JSON.stringify(custom)

					const options = Array.from(ELEMENTS["tool-meta"]["select"].querySelectorAll("option[value='" + name + "']"))
					if (!options.length) {
						const option = document.createElement("option")
							option.value = option.innerText = name
						ELEMENTS["tool-meta"]["group-custom"].appendChild(option)
					}
			} catch (error) {console.log(error)}
		}

	/* downloadFile */
		function downloadFile(event) {
			try {
				// get data
					const name = ELEMENTS["tool-meta"]["name"].value.trim().replace(/\s/g, "_")
					const file = JSON.parse(JSON.stringify(AUDIO_J.instruments[AUDIO_J.activeInstrumentId].parameters))
						file.imag = Array.from(AUDIO_J.instruments[AUDIO_J.activeInstrumentId].parameters.imag)
						file.name = name
						delete file.real
						delete file.wave

				//  package up
					const downloadLink = document.createElement("a")
						downloadLink.id = "download-link"
						downloadLink.setAttribute("href", "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(file)))
						downloadLink.setAttribute("download", "toneMaker_" + name + ".json")
						downloadLink.addEventListener(TRIGGERS.click, function() {
							const downloadLink = document.querySelector("#download-link")
							document.body.removeChild(downloadLink)
						})
				
				// click
					ELEMENTS.body.appendChild(downloadLink)
					downloadLink.click()
			} catch (error) {console.log(error)}
		}

	/* loadFile */
		function loadFile(event, name) {
			try {
				// data
					if (!name) {
						name = ELEMENTS["tool-meta"]["select"].value
					}
					setInstrument((AUDIO_J.getInstrument(name) || {}), true)

					if (event) {
						ELEMENTS["tool-meta"]["select"].blur()
					}
			} catch (error) {console.log(error)}
		}

	/* uploadFile */
		function uploadFile(event) {
			try {
				if (!ELEMENTS["tool-meta"]["upload-link"].value || !ELEMENTS["tool-meta"]["upload-link"].value.length) {
					return
				}

				const reader = new FileReader()
					reader.readAsText(event.target.files[0])
					reader.onload = function(event) {
						try {
							const fileString = String(event.target.result)
							const fileJSON = JSON.parse(fileString)
							setInstrument(fileJSON, true)
							ELEMENTS["tool-meta"]["upload-link"].blur()
						} catch (error) {console.log(error)}
					}
			} catch (error) {console.log(error)}
		}

	/* deleteFile */
		function deleteFile(event, overrideName) {
			try {
				// get default instruments
					const simpleInstruments = AUDIO_J.getInstruments("simple")
					const defaultInstruments = AUDIO_J.getInstruments("default")
					const currentInstrument = overrideName || AUDIO_J.activeInstrumentId
					if (!currentInstrument || simpleInstruments.includes(currentInstrument) || defaultInstruments.includes(currentInstrument)) {
						return
					}

				// choose a new random instrument
					if (!overrideName) {
						const instrumentName = defaultInstruments[Math.floor(Math.random() * defaultInstruments.length)]
						setInstrument(AUDIO_J.getInstrument(instrumentName) || {}, true)
					}

				// find old one from localstorage
					let custom = {}
					if (window.localStorage.synthesizers) {
						custom = JSON.parse(window.localStorage.synthesizers) || {}
					}
					if (!custom || !(currentInstrument in custom)) {
						return
					}

				// remove from localstorage
					delete custom[currentInstrument]
					window.localStorage.synthesizers = JSON.stringify(custom)

				// remove from AUDIO_J instruments
					if (AUDIO_J.instruments[currentInstrument]) {
						delete AUDIO_J.instruments[currentInstrument]
					}

				// update selection
					if (event) {
						ELEMENTS["tool-meta"]["group-custom"].querySelector("[value='" + currentInstrument + "']").remove()
					}
			} catch (error) {console.log(error)}
		}

	/* adjustPowerToolToggle */
		function adjustPowerToolToggle(event) {
			try {
				if (event.target.getAttribute("selected")) {
					event.target.removeAttribute("selected")
					if (AUDIO_J.instruments[AUDIO_J.activeInstrumentId]) {
						AUDIO_J.instruments[AUDIO_J.activeInstrumentId].setParameters({ power: 0 })
					}
				}
				else {
					event.target.setAttribute("selected", true)
					if (AUDIO_J.instruments[AUDIO_J.activeInstrumentId]) {
						AUDIO_J.instruments[AUDIO_J.activeInstrumentId].setParameters({ power: 1 })
					}
				}
			} catch (error) {console.log(error)}
		}

	/* adjustVolumeToolBar */
		function adjustVolumeToolBar(event) {
			try {
				// display
					const rectangle = ELEMENTS["tool-meta"]["volume-track"].getBoundingClientRect()
					const x = event.x !== undefined ? event.x : event.targetTouches[0].clientX

					let percentage = (x - rectangle.left) * CONSTANTS.percentage / (rectangle.width)
						percentage = Math.min(CONSTANTS.percentage, Math.max(0, percentage))
					STATE.parameter.style.width = percentage + "%"
					ELEMENTS["tool-meta"]["volume-input"].value = percentage

				// data
					adjustVolumeToolInput({target: ELEMENTS["tool-meta"]["volume-input"]})
			} catch (error) {console.log(error)}
		}

	/* adjustVolumeToolInput */
		function adjustVolumeToolInput(event) {
			try {
				// display
					let percentage = Number(event.target.value)
						percentage = Math.min(CONSTANTS.percentage, Math.max(0, percentage))
					ELEMENTS["tool-meta"]["volume-bar"].style.width = percentage + "%"

				// audio
					if (AUDIO_J.instruments[AUDIO_J.activeInstrumentId]) { AUDIO_J.instruments[AUDIO_J.activeInstrumentId].setParameters({ volume: (percentage / CONSTANTS.percentage) }) }
			} catch (error) {console.log(error)}
		}

/*** tool-wave ***/	
	/* buildWaveTool */
		function buildWaveTool() {
			try {
				const waveLeftOffset = CONSTANTS.percentage / AUDIO_J.constants.waveCount
				for (let i = 1; i <= AUDIO_J.constants.waveCount; i++) {
					const waveInput = document.createElement("input")
						waveInput.setAttribute("type", "number")
						waveInput.setAttribute("min", 0)
						waveInput.setAttribute("max", CONSTANTS.percentage)
						waveInput.className = "input"
						waveInput.id = "tool-wave-input--" + i
						waveInput.style.left = ((i - 1) * waveLeftOffset) + "%"
						waveInput.value = 0
						waveInput.addEventListener(TRIGGERS.change, adjustWaveToolInput)
					ELEMENTS.toolSections["tool-wave"].appendChild(waveInput)
					ELEMENTS["tool-wave"]["input--" + i] = waveInput

					const waveTrack = document.createElement("div")
						waveTrack.className = "track"
						waveTrack.id = "tool-wave-track--" + i
						waveTrack.style.left = ((i - 1) * waveLeftOffset) + "%"
					ELEMENTS.toolSections["tool-wave"].appendChild(waveTrack)
					ELEMENTS["tool-wave"]["track--" + i] = waveTrack

						const waveBar = document.createElement("div")
							waveBar.className = "bar"
							waveBar.id = "tool-wave-bar--" + i
							waveBar.innerText = i
							waveBar.style.height = "0%"
							waveBar.addEventListener(TRIGGERS.mousedown, selectBar)
						waveTrack.appendChild(waveBar)
						ELEMENTS["tool-wave"]["bar--" + i] = waveBar
				}
			} catch (error) {console.log(error)}
		}

	/* adjustWaveToolBar */
		function adjustWaveToolBar(event) {
			try {
				// display
					const harmonic  = STATE.parameter.id.split("--")[1]
					const rectangle = ELEMENTS["tool-wave"]["track--" + harmonic].getBoundingClientRect()
					const y = event.y !== undefined ? event.y : event.targetTouches[0].clientY

					let percentage = (rectangle.bottom - y) * CONSTANTS.percentage / (rectangle.height)
						percentage = Math.min(CONSTANTS.percentage, Math.max(0, percentage))
					STATE.parameter.style.height = percentage + "%"
					ELEMENTS["tool-wave"]["input--" + harmonic].value = percentage

				// data
					adjustWaveToolInput({target: ELEMENTS["tool-wave"]["input--" + harmonic]})
			} catch (error) {console.log(error)}
		}

	/* adjustWaveToolInput */
		function adjustWaveToolInput(event, setup) {
			try {
				// display
					const harmonic = event.target.id.split("--")[1]
					let percentage = Number(event.target.value)
						percentage = Math.min(CONSTANTS.percentage, Math.max(0, percentage))
					ELEMENTS["tool-wave"]["bar--" + harmonic].style.height = percentage + "%"

				// audio
					if (!setup) {
						const wave = {}
							wave[event.target.id.split("--")[1]] = percentage / CONSTANTS.percentage
						if (AUDIO_J.instruments[AUDIO_J.activeInstrumentId]) { AUDIO_J.instruments[AUDIO_J.activeInstrumentId].setParameters({harmonic: wave}) }
						saveFile()
					}
			} catch (error) {console.log(error)}
		}

/*** tool-polysynth ***/
	/* buildPolysynthTool **/
		function buildPolysynthTool() {
			try {
				for (let i = -AUDIO_J.constants.semitonesPerOctave; i <= AUDIO_J.constants.semitonesPerOctave; i++) {
					const polysynthToggle = document.createElement("button")
						polysynthToggle.className = "toggle"
						polysynthToggle.id = "tool-polysynth-toggle--" + i
						polysynthToggle.value = i
						polysynthToggle.style.left = CONSTANTS.percentage / (AUDIO_J.constants.semitonesPerOctave * 2 + 1) * (i + AUDIO_J.constants.semitonesPerOctave) + "%"
						polysynthToggle.innerHTML = Math.abs(i) + "<br>" + AUDIO_J.constants.intervals[String(Math.abs(i))][0]
						polysynthToggle.addEventListener(TRIGGERS.click, adjustPolysynthToolToggle)
					ELEMENTS.toolSections["tool-polysynth"].appendChild(polysynthToggle)
					ELEMENTS["tool-polysynth"]["toggle--" + i] = polysynthToggle
				}
			} catch (error) {console.log(error)}
		}

	/* adjustPolysynthToolToggle */
		function adjustPolysynthToolToggle(event, setup) {
			try {
				if (event.target.getAttribute("selected")) {
					event.target.removeAttribute("selected")

					if (!setup) {
						const polysynth = {}
							polysynth[Number(event.target.value)] = false
						if (AUDIO_J.instruments[AUDIO_J.activeInstrumentId]) { AUDIO_J.instruments[AUDIO_J.activeInstrumentId].setParameters({ polysynth: polysynth }) }
						saveFile()
					}
				}
				else {
					event.target.setAttribute("selected", true)
					
					if (!setup) {
						const polysynth = {}
							polysynth[Number(event.target.value)] = true
						if (AUDIO_J.instruments[AUDIO_J.activeInstrumentId]) { AUDIO_J.instruments[AUDIO_J.activeInstrumentId].setParameters({ polysynth: polysynth }) }
						saveFile()
					}
				}
			} catch (error) {console.log(error)}
		}

/*** tool-noise ***/
	/* buildNoiseTool */
		function buildNoiseTool() {
			try {
				for (let color in AUDIO_J.noise) {					
					// volume
						const volumeSection = document.createElement("div")
							volumeSection.className = "section"
							volumeSection.id = "tool-noise-volume--" + color
						ELEMENTS.toolSections["tool-noise"].appendChild(volumeSection)

						const volumeInput = document.createElement("input")
							volumeInput.setAttribute("type", "number")
							volumeInput.setAttribute("min", 0)
							volumeInput.setAttribute("max", CONSTANTS.percentage)
							volumeInput.setAttribute("placeholder", color)
							volumeInput.className = "input"
							volumeInput.id = "tool-noise-volume-input--" + color
							volumeInput.value = 0
							volumeInput.addEventListener(TRIGGERS.change, adjustNoiseToolInput)
						volumeSection.appendChild(volumeInput)
						ELEMENTS["tool-noise"]["volume-input--" + color] = volumeInput

						const volumeTrack = document.createElement("div")
							volumeTrack.id = "tool-noise-volume-track--" + color
							volumeTrack.className = "track"
						volumeSection.appendChild(volumeTrack)
						ELEMENTS["tool-noise"]["volume-track--" + color] = volumeTrack

							const volumeBar = document.createElement("div")
								volumeBar.id = "tool-noise-volume-bar--" + color
								volumeBar.className = "bar"
								volumeBar.style.width = "0%"
								volumeBar.innerHTML = color
								volumeBar.addEventListener(TRIGGERS.mousedown, selectBar)
							volumeTrack.appendChild(volumeBar)
							ELEMENTS["tool-noise"]["volume-bar--" + color] = volumeBar
				}
			} catch (error) {console.log(error)}
		}

	/* adjustNoiseToolBar */
		function adjustNoiseToolBar(event) {
			try {
				// display
					const type = STATE.parameter.id.split("--")[1]
					const rectangle  = ELEMENTS["tool-noise"]["volume-track--" + type].getBoundingClientRect()
					const x = event.x !== undefined ? event.x : event.targetTouches[0].clientX

					let percentage = (x - rectangle.left) * CONSTANTS.percentage / (rectangle.width)
						percentage = Math.min(CONSTANTS.percentage, Math.max(0, percentage))
					STATE.parameter.style.width = percentage + "%"
					ELEMENTS["tool-noise"]["volume-input--" + type].value = percentage

				// data
					adjustNoiseToolInput({target: ELEMENTS["tool-noise"]["volume-input--" + type]})
			} catch (error) {console.log(error)}
		}

	/* adjustNoiseToolInput */
		function adjustNoiseToolInput(event, setup) {
			try {
				// display
					const type = event.target.id.split("--")[1]
					let percentage = Number(event.target.value)
						percentage = Math.min(CONSTANTS.percentage, Math.max(0, percentage))
					ELEMENTS["tool-noise"]["volume-bar--" + type].style.width = percentage + "%"

				// audio
					if (!setup) {
						const noise = {}
							noise[type] = percentage / CONSTANTS.percentage
						if (AUDIO_J.instruments[AUDIO_J.activeInstrumentId]) { AUDIO_J.instruments[AUDIO_J.activeInstrumentId].setParameters({ noise: noise }) }
						saveFile()
					}
			} catch (error) {console.log(error)}
		}

/*** tool-envelope ***/	
	/* buildEnvelopeTool */
		function buildEnvelopeTool() {
			try {
				// track
					const envelopeTrack = document.createElement("div")
						envelopeTrack.className = "track"
						envelopeTrack.id = "tool-envelope-track"
					ELEMENTS.toolSections["tool-envelope"].appendChild(envelopeTrack)
					ELEMENTS["tool-envelope"]["track"] = envelopeTrack

				// attack
					const attackShape = document.createElement("div")
						attackShape.className = "shape"
						attackShape.id = "tool-envelope-shape--attack"
						attackShape.style.width = "2%"
						attackShape.innerHTML = "&#8672;attack&#8674;"
						attackShape.addEventListener(TRIGGERS.mousedown, selectBar)
					envelopeTrack.appendChild(attackShape)
					ELEMENTS["tool-envelope"]["shape--attack"] = attackShape

					const attackInput = document.createElement("input")
						attackInput.setAttribute("type", "number")
						attackInput.setAttribute("min", 0)
						attackInput.setAttribute("max", CONSTANTS.percentage)
						attackInput.className = "input"
						attackInput.id = "tool-envelope-input--attack"
						attackInput.value = 0
						attackInput.addEventListener(TRIGGERS.change, adjustEnvelopeToolInput)
					ELEMENTS.toolSections["tool-envelope"].appendChild(attackInput)
					ELEMENTS["tool-envelope"]["input--attack"] = attackInput

				// decay
					const decayShape = document.createElement("div")
						decayShape.className = "shape"
						decayShape.id = "tool-envelope-shape--decay"
						decayShape.style.left = "0%"
						decayShape.style.width = "0%"
						decayShape.innerHTML = "&#8672;decay&#8674;"
						decayShape.style["clip-path"] = CONSTANTS.decayClippath
						decayShape.style["-webkit-clip-path"] = CONSTANTS.decayClippath
						decayShape.addEventListener(TRIGGERS.mousedown, selectBar)
					envelopeTrack.appendChild(decayShape)
					ELEMENTS["tool-envelope"]["shape--decay"] = decayShape

					const decayInput = document.createElement("input")
						decayInput.setAttribute("type", "number")
						decayInput.setAttribute("min", 0)
						decayInput.setAttribute("max", CONSTANTS.percentage)
						decayInput.className = "input"
						decayInput.id = "tool-envelope-input--decay"
						decayInput.style.left = "0%"
						decayInput.value = 0
						decayInput.addEventListener(TRIGGERS.change, adjustEnvelopeToolInput)
					ELEMENTS.toolSections["tool-envelope"].appendChild(decayInput)
					ELEMENTS["tool-envelope"]["input--decay"] = decayInput

				// sustain
					const sustainShape = document.createElement("div")
						sustainShape.className = "shape"
						sustainShape.id = "tool-envelope-shape--sustain"
						sustainShape.style.left = "0%"
						sustainShape.style.width = "0%"
						sustainShape.style.height = "0%"
						sustainShape.innerHTML = "&#8673;sustain&#8675;"
						sustainShape.addEventListener(TRIGGERS.mousedown, selectBar)
					envelopeTrack.appendChild(sustainShape)
					ELEMENTS["tool-envelope"]["shape--sustain"] = sustainShape

					const sustainInput = document.createElement("input")
						sustainInput.setAttribute("type", "number")
						sustainInput.setAttribute("min", 0)
						sustainInput.setAttribute("max", CONSTANTS.percentage)
						sustainInput.className = "input"
						sustainInput.id = "tool-envelope-input--sustain"
						sustainInput.style.left = "0%"
						sustainInput.value = 0
						sustainInput.addEventListener(TRIGGERS.change, adjustEnvelopeToolInput)
					ELEMENTS.toolSections["tool-envelope"].appendChild(sustainInput)
					ELEMENTS["tool-envelope"]["input--sustain"] = sustainInput

				// release
					const releaseShape = document.createElement("div")
						releaseShape.className = "shape"
						releaseShape.id = "tool-envelope-shape--release"
						releaseShape.style.width = "0%"
						releaseShape.style.height = "0%"
						releaseShape.innerHTML = "&#8672;release&#8674;"
						releaseShape.addEventListener(TRIGGERS.mousedown, selectBar)
					envelopeTrack.appendChild(releaseShape)
					ELEMENTS["tool-envelope"]["shape--release"] = releaseShape

					const releaseInput = document.createElement("input")
						releaseInput.setAttribute("type", "number")
						releaseInput.setAttribute("min", 0)
						releaseInput.setAttribute("max", CONSTANTS.percentage)
						releaseInput.className = "input"
						releaseInput.id = "tool-envelope-input--release"
						releaseInput.style.left = "0%"
						releaseInput.value = 0
						releaseInput.addEventListener(TRIGGERS.change, adjustEnvelopeToolInput)
					ELEMENTS.toolSections["tool-envelope"].appendChild(releaseInput)
					ELEMENTS["tool-envelope"]["input--release"] = releaseInput
			} catch (error) {console.log(error)}
		}

	/* adjustEnvelopeToolBar */
		function adjustEnvelopeToolBar(event) {
			try {
				// display
					const rectangle = ELEMENTS["tool-envelope"]["track"].getBoundingClientRect()
					const shape     = STATE.parameter.getBoundingClientRect()
					const type      = STATE.parameter.id.split("--")[1]
					const x = event.x !== undefined ? event.x : event.targetTouches[0].clientX
					const y = event.y !== undefined ? event.y : event.targetTouches[0].clientY
					let percentage  = 0
					
					switch (type) {
						case "attack":
						case "decay":
							percentage = (x - shape.left) * CONSTANTS.percentage / (rectangle.width)
							percentage = Math.min(CONSTANTS.envelopeComponentMaxPercentage, Math.max(0, percentage))
							STATE.parameter.style.width = percentage + "%"
							ELEMENTS["tool-envelope"]["input--" + type].value = Math.pow(percentage * 10 / CONSTANTS.envelopeComponentMaxPercentage, 2)
						break
						case "release":
							percentage = (shape.right - x) * CONSTANTS.percentage / (rectangle.width)
							percentage = Math.min(CONSTANTS.envelopeComponentMaxPercentage, Math.max(0, percentage))
							STATE.parameter.style.width = percentage + "%"
							ELEMENTS["tool-envelope"]["input--" + type].value = Math.pow(percentage * 10 / CONSTANTS.envelopeComponentMaxPercentage, 2)
						break
						case "sustain":
							percentage = (rectangle.bottom - y) * CONSTANTS.percentage / (rectangle.height)
							percentage = Math.min(CONSTANTS.percentage, Math.max(0, percentage))
							STATE.parameter.style.height = percentage + "%"
							ELEMENTS["tool-envelope"]["input--" + type].value = percentage
						break
					}

				// data
					adjustEnvelopeToolInput({target: ELEMENTS["tool-envelope"]["input--" + type]})
			} catch (error) {console.log(error)}
		}

	/* adjustEnvelopeToolInput */
		function adjustEnvelopeToolInput(event, setup) {
			try {
				// inputs
					const attackInput  = ELEMENTS["tool-envelope"]["input--attack"]
					const decayInput   = ELEMENTS["tool-envelope"]["input--decay"]
					const sustainInput = ELEMENTS["tool-envelope"]["input--sustain"]
					const releaseInput = ELEMENTS["tool-envelope"]["input--release"]

				// shapes
					const attackShape  = ELEMENTS["tool-envelope"]["shape--attack"]
					const decayShape   = ELEMENTS["tool-envelope"]["shape--decay"]
					const sustainShape = ELEMENTS["tool-envelope"]["shape--sustain"]
					const releaseShape = ELEMENTS["tool-envelope"]["shape--release"]

				// values
					let attackValue  = Math.min(CONSTANTS.percentage, Math.max(0, attackInput.value ))
						attackValue  = Math.pow(attackValue,  0.5) * CONSTANTS.envelopeComponentMaxPercentage / 10
					let decayValue   = Math.min(CONSTANTS.percentage, Math.max(0, decayInput.value  ))
						decayValue   = Math.pow(decayValue,   0.5) * CONSTANTS.envelopeComponentMaxPercentage / 10
					let sustainValue = Math.min(CONSTANTS.percentage, Math.max(0, sustainInput.value))
					let releaseValue = Math.min(CONSTANTS.percentage, Math.max(0, releaseInput.value))
						releaseValue = Math.pow(releaseValue, 0.5) * CONSTANTS.envelopeComponentMaxPercentage / 10

				// display
					attackShape.style.width   = Math.max(CONSTANTS.envelopeComponentMinPercentage, attackValue) + "%"
					attackInput.style.width   = Math.max(CONSTANTS.envelopeComponentMinPercentage, attackValue) + "%"
					
					decayShape.style["clip-path"] = "polygon(0% 0%, 0% 100%, 100% 100%, 100% " + (CONSTANTS.percentage - Math.max(sustainValue, CONSTANTS.envelopeComponentMinPercentage)) + "%)"
					decayShape.style["-webkit-clip-path"] = "polygon(0% 0%, 0% 100%, 100% 100%, 100% " + (CONSTANTS.percentage - Math.max(sustainValue, CONSTANTS.envelopeComponentMinPercentage)) + "%)"
					decayShape.style.width    = Math.max(CONSTANTS.envelopeComponentMinPercentage, decayValue) + "%"
					decayShape.style.left     = Math.max(CONSTANTS.envelopeComponentMinPercentage, attackValue) + "%"
					decayInput.style.left     = Math.max(CONSTANTS.envelopeComponentMinPercentage, attackValue) + "%"
					decayInput.style.width    = Math.max(CONSTANTS.envelopeComponentMinPercentage, decayValue) + "%"

					releaseShape.style.width  = Math.max(CONSTANTS.envelopeComponentMinPercentage, releaseValue) + "%"
					releaseShape.style.height = sustainValue + "%"
					releaseInput.style.left   = CONSTANTS.percentage - Math.max(CONSTANTS.envelopeComponentMinPercentage, releaseValue) + "%"
					releaseInput.style.width  = Math.max(CONSTANTS.envelopeComponentMinPercentage, releaseValue) + "%"

					sustainShape.style.width  = CONSTANTS.percentage - Math.max(CONSTANTS.envelopeComponentMinPercentage, attackValue) - Math.max(CONSTANTS.envelopeComponentMinPercentage, decayValue) - Math.max(CONSTANTS.envelopeComponentMinPercentage, releaseValue) + "%"
					sustainShape.style.height = sustainValue + "%"
					sustainShape.style.left   = Math.max(CONSTANTS.envelopeComponentMinPercentage, attackValue) + Math.max(CONSTANTS.envelopeComponentMinPercentage, decayValue) + "%"
					sustainInput.style.left   = Math.max(CONSTANTS.envelopeComponentMinPercentage, attackValue) + Math.max(CONSTANTS.envelopeComponentMinPercentage, decayValue) + "%"
					sustainInput.style.width  = CONSTANTS.percentage - Math.max(CONSTANTS.envelopeComponentMinPercentage, attackValue) - Math.max(CONSTANTS.envelopeComponentMinPercentage, decayValue) - Math.max(CONSTANTS.envelopeComponentMinPercentage, releaseValue) + "%"

				// audio
					if (!setup) {
						const envelope = {
							attack:  (Math.min(CONSTANTS.percentage, Math.max(0, attackInput.value )) / CONSTANTS.percentage),
							decay:   (Math.min(CONSTANTS.percentage, Math.max(0, decayInput.value  )) / CONSTANTS.percentage),
							sustain: (Math.min(CONSTANTS.percentage, Math.max(0, sustainInput.value)) / CONSTANTS.percentage),
							release: (Math.min(CONSTANTS.percentage, Math.max(0, releaseInput.value)) / CONSTANTS.percentage)
						}

						if (AUDIO_J.instruments[AUDIO_J.activeInstrumentId]) { AUDIO_J.instruments[AUDIO_J.activeInstrumentId].setParameters({ envelope: envelope }) }
						saveFile()
					}
			} catch (error) {console.log(error)}
		}

/*** tool-bitcrusher ***/
	/* buildBitcrusherTool */
		function buildBitcrusherTool() {
			try {
				// toggles
					const bitsSection = document.createElement("div")
						bitsSection.className = "section"
						bitsSection.id = "tool-bitcrusher-bits"
					ELEMENTS.toolSections["tool-bitcrusher"].appendChild(bitsSection)

					const bitcrusherToggle = document.createElement("button")
						bitcrusherToggle.id = "tool-bitcrusher-bits-toggle--0"
						bitcrusherToggle.value = 0
						bitcrusherToggle.className = "toggle"
						bitcrusherToggle.innerHTML = '<span class="fas fa-ban"></span>'
						bitcrusherToggle.setAttribute("selected", true)
						bitcrusherToggle.addEventListener(TRIGGERS.click, adjustBitcrusherToolToggle)
					bitsSection.appendChild(bitcrusherToggle)
					ELEMENTS["tool-bitcrusher"]["bits-toggle--0"] = bitcrusherToggle
					
					for (let i in AUDIO_J.constants.bitcrusherBits) {
						const bitValue = AUDIO_J.constants.bitcrusherBits[i]
						const bitToggle = document.createElement("button")
							bitToggle.id = "tool-bitcrusher-bits-toggle--" + bitValue
							bitToggle.value = bitValue
							bitToggle.className = "toggle"
							bitToggle.innerHTML = bitValue + "<span class='tool-bitcrusher-bits-toggle-bit'>bit</span>"
							bitToggle.style["border-radius"] = (AUDIO_J.constants.bitcrusherBits.length - i - 1) * CONSTANTS.bitcrusherBorderRadiusPercentage + "%"
							bitToggle.addEventListener(TRIGGERS.click, adjustBitcrusherToolToggle)
						bitsSection.appendChild(bitToggle)
						ELEMENTS["tool-bitcrusher"]["bits-toggle--" + bitValue] = bitToggle
					}

				// norm
					const normSection = document.createElement("div")
						normSection.className = "section"
						normSection.id = "tool-bitcrusher-norm"
					ELEMENTS.toolSections["tool-bitcrusher"].appendChild(normSection)

					const normInput = document.createElement("input")
						normInput.setAttribute("type", "number")
						normInput.setAttribute("min", 0)
						normInput.setAttribute("max", CONSTANTS.percentage)
						normInput.className = "input"
						normInput.id = "tool-bitcrusher-norm-input"
						normInput.value = 0
						normInput.addEventListener(TRIGGERS.change, adjustBitcrusherToolInput)
					normSection.appendChild(normInput)
					ELEMENTS["tool-bitcrusher"]["norm-input"] = normInput

					const normTrack = document.createElement("div")
						normTrack.id = "tool-bitcrusher-norm-track"
						normTrack.className = "track"
					normSection.appendChild(normTrack)
					ELEMENTS["tool-bitcrusher"]["norm-track"] = normTrack

						const normBar = document.createElement("div")
							normBar.id = "tool-bitcrusher-norm-bar"
							normBar.className = "bar"
							normBar.style.width = "0%"
							normBar.innerHTML = '<span class="fas fa-adjust"></span>'
							normBar.addEventListener(TRIGGERS.mousedown, selectBar)
						normTrack.appendChild(normBar)
						ELEMENTS["tool-bitcrusher"]["norm-bar"] = normBar
			} catch (error) {console.log(error)}
		}

	/* adjustBitcrusherToolToggle */
		function adjustBitcrusherToolToggle(event, setup) {
			try {
				// data
					let bits = Number(event.target.value) || 0
					const norm = Math.max(0, Math.min(CONSTANTS.percentage, ELEMENTS["tool-bitcrusher"]["norm-input"].value)) / CONSTANTS.percentage

					if (!AUDIO_J.constants.bitcrusherBits.includes(bits)) {
						bits = 0
					}

				// unselect
					if (event.target.getAttribute("selected")) {
						event.target.removeAttribute("selected")

						if (!Array.from(ELEMENTS.toolSections["tool-bitcrusher"].querySelectorAll(".toggle[selected]")).length) {
							ELEMENTS["tool-bitcrusher"]["bits-toggle--0"].setAttribute("selected", true)
						}

						if (!setup) {
							const bitcrusher = {
								bits: bits,
								norm: norm
							}
							if (AUDIO_J.instruments[AUDIO_J.activeInstrumentId]) { AUDIO_J.instruments[AUDIO_J.activeInstrumentId].setParameters({ bitcrusher: bitcrusher }) }
							saveFile()
						}
					}

				// select
					else {
						Array.from(ELEMENTS.toolSections["tool-bitcrusher"].querySelectorAll(".toggle:not([value='power'])")).forEach(function (t) {
							t.removeAttribute("selected")
						})
						event.target.setAttribute("selected", true)

						if (!setup) {
							const bitcrusher = {
								bits: bits,
								norm: norm
							}

							if (AUDIO_J.instruments[AUDIO_J.activeInstrumentId]) { AUDIO_J.instruments[AUDIO_J.activeInstrumentId].setParameters({ bitcrusher: bitcrusher }) }
							saveFile()
						}
					}
			} catch (error) {console.log(error)}
		}

	/* adjustBitcrusherToolBar */
		function adjustBitcrusherToolBar(event) {
			try {
				// display
					const rectangle  = ELEMENTS["tool-bitcrusher"]["norm-track"].getBoundingClientRect()
					const x = event.x !== undefined ? event.x : event.targetTouches[0].clientX

					let percentage = (x - rectangle.left) * CONSTANTS.percentage / (rectangle.width)
						percentage = Math.min(CONSTANTS.percentage, Math.max(0, percentage))
					STATE.parameter.style.width = percentage + "%"
					ELEMENTS["tool-bitcrusher"]["norm-input"].value = percentage

				// data
					adjustBitcrusherToolInput({target: ELEMENTS["tool-bitcrusher"]["norm-input"]})
			} catch (error) {console.log(error)}
		}

	/* adjustBitcrusherToolInput */
		function adjustBitcrusherToolInput(event, setup) {
			try {
				// display
					let percentage = Number(event.target.value)
						percentage = Math.min(CONSTANTS.percentage, Math.max(0, percentage))
					ELEMENTS["tool-bitcrusher"]["norm-bar"].style.width = percentage + "%"

				// audio
					if (!setup) {
						const norm = Math.max(0, Math.min(1, percentage / CONSTANTS.percentage))
						const selectedToggles = Array.from(ELEMENTS.toolSections["tool-bitcrusher"].querySelectorAll(".toggle[selected]")) || []
						const bits = selectedToggles.length ? Number(selectedToggles[0].value) : 0
						if (!AUDIO_J.constants.bitcrusherBits.includes(bits)) {
							bits = 0
						}

						const bitcrusher = {
							bits: bits,
							norm: norm
						}
						if (AUDIO_J.instruments[AUDIO_J.activeInstrumentId]) { AUDIO_J.instruments[AUDIO_J.activeInstrumentId].setParameters({ bitcrusher: bitcrusher }) }
						saveFile()
					}
			} catch (error) {console.log(error)}
		}

/*** tool-filter ***/
	/* buildFilterTool */
		function buildFilterTool() {
			try {
				// track
					const filterTrack = document.createElement("div")
						filterTrack.className = "track"
						filterTrack.id = "tool-filter-track"
					ELEMENTS.toolSections["tool-filter"].appendChild(filterTrack)
					ELEMENTS["tool-filter"]["track"] = filterTrack

				// lines
					for (let i = 0; i <= AUDIO_J.constants.filterOctaves * AUDIO_J.constants.semitonesPerOctave; i++) {
						if (i % AUDIO_J.constants.semitonesPerOctave == 0) {
							const line = document.createElement("div")
								line.id = "tool-filter-line--" + i
								line.className = "line"
								line.innerHTML = "<span class='tool-filter-line-note'>C" + (i / AUDIO_J.constants.semitonesPerOctave) + "</span>" +
									"<span class='tool-filter-line-frequency'>" + AUDIO_J.getNote(i + AUDIO_J.constants.semitonesPerOctave)[0].toFixed(2) + "<br>Hz</span>"
								line.style.left = i * CONSTANTS.percentage / ((AUDIO_J.constants.filterOctaves * AUDIO_J.constants.semitonesPerOctave)) + "%"
							filterTrack.appendChild(line)
						}
					}

				// baseline
					const baseline = document.createElement("div")
						baseline.id = "tool-filter-baseline"
						baseline.addEventListener(TRIGGERS.mousedown, createFilter)
					filterTrack.appendChild(baseline)
			} catch (error) {console.log(error)}
		}

	/* createFilter */
		function createFilter(event, options) {
			try {
				// click or load?
					let num, lowPercentage, highPercentage, gainPercentage, lowMidi, highMidi
					if (!options) {
						// display
							const rectangle = ELEMENTS["tool-filter"]["track"].getBoundingClientRect()
							const x = event.x !== undefined ? event.x : event.targetTouches[0].clientX
							let percentage = (x - rectangle.left) * CONSTANTS.percentage / (rectangle.width)
								percentage = Math.min(CONSTANTS.percentage, Math.max(0, percentage))

						// data
							let blobs = Array.from(document.querySelectorAll("#tool-filter-track .blob")) || []
								blobs = blobs.map(function (b) {
									return Number(b.id.split("--")[1])
								}).sort(function (a, b) {
									return b - a
								}) || []
							num = (blobs[0] + 1) || 0
							lowPercentage  = percentage - (CONSTANTS.filterStartingWidthPercentage / 2)
							highPercentage = percentage + (CONSTANTS.filterStartingWidthPercentage / 2)
							gainPercentage = 0

							lowMidi  = lowPercentage  / CONSTANTS.percentage * AUDIO_J.constants.filterOctaves * AUDIO_J.constants.semitonesPerOctave + AUDIO_J.constants.semitonesPerOctave
							highMidi = highPercentage / CONSTANTS.percentage * AUDIO_J.constants.filterOctaves * AUDIO_J.constants.semitonesPerOctave + AUDIO_J.constants.semitonesPerOctave
					}
					else {
						lowMidi  = AUDIO_J.constants.semitonesPerOctave * Math.log2(options.low  / AUDIO_J.constants.tuningAHz) + AUDIO_J.constants.tuningAMidi
						highMidi = AUDIO_J.constants.semitonesPerOctave * Math.log2(options.high / AUDIO_J.constants.tuningAHz) + AUDIO_J.constants.tuningAMidi

						num  = options.number
						lowPercentage  = (lowMidi  - AUDIO_J.constants.semitonesPerOctave) / AUDIO_J.constants.semitonesPerOctave / AUDIO_J.constants.filterOctaves * CONSTANTS.percentage
						highPercentage = (highMidi - AUDIO_J.constants.semitonesPerOctave) / AUDIO_J.constants.semitonesPerOctave / AUDIO_J.constants.filterOctaves * CONSTANTS.percentage
						gainPercentage = options.gain
					}
						
				// blobs
					const blob = document.createElement("div")
						blob.className = "blob"
						blob.id = "tool-filter-blob--" + num
						blob.style["clip-path"] = "polygon(" + lowPercentage + "% 50%, " + ((lowPercentage + highPercentage) / 2) + "% " + (50 - gainPercentage) + "%, " + highPercentage + "% 50%)"
						blob.style["-webkit-clip-path"] = "polygon(" + lowPercentage + "% 50%, " + ((lowPercentage + highPercentage) / 2) + "% " + (50 - gainPercentage) + "%, " + highPercentage + "% 50%)"
					ELEMENTS["tool-filter"]["track"].appendChild(blob)
					ELEMENTS["tool-filter"]["blob--" + num] = blob

				// low
					const lowShape = document.createElement("div")
						lowShape.className = "shape square"
						lowShape.id = "tool-filter-shape--low--" + num
						lowShape.addEventListener(TRIGGERS.mousedown, selectBar)
						lowShape.style.left = lowPercentage + "%"
						lowShape.style.top = "50%"
						lowShape.addEventListener(TRIGGERS.mousedown, selectBar)
					ELEMENTS["tool-filter"]["track"].appendChild(lowShape)
					ELEMENTS["tool-filter"]["shape--low--" + num] = lowShape

					const lowInput = document.createElement("input")
						lowInput.setAttribute("type", "number")
						lowInput.setAttribute("min", 0)
						lowInput.setAttribute("max", CONSTANTS.percentage)
						lowInput.setAttribute("placeholder", "pitch #")
						lowInput.className = "input tool-filter-input--low"
						lowInput.id = "tool-filter-input--low--" + num
						lowInput.value = lowMidi
						lowInput.style.left = Math.max(CONSTANTS.filterEdgePercentage, Math.min(CONSTANTS.percentage - CONSTANTS.filterEdgePercentage, ((lowPercentage + highPercentage) / 2))) + "%"
						lowInput.addEventListener(TRIGGERS.change, adjustFilterToolInput)
					ELEMENTS.toolSections["tool-filter"].appendChild(lowInput)
					ELEMENTS["tool-filter"]["input--low--" + num] = lowInput

				// gain
					const gainShape = document.createElement("div")
						gainShape.className = "shape circle"
						gainShape.id = "tool-filter-shape--gain--" + num
						gainShape.addEventListener(TRIGGERS.mousedown, selectBar)
						gainShape.style.left = ((lowPercentage + highPercentage) / 2) + "%"
						gainShape.style.top = (CONSTANTS.percentage / 2 - gainPercentage) + "%"
						gainShape.addEventListener(TRIGGERS.mousedown, selectBar)
					ELEMENTS["tool-filter"]["track"].appendChild(gainShape)
					ELEMENTS["tool-filter"]["shape--gain--" + num] = gainShape

					if (!options) {
						STATE.parameter = gainShape
						STATE.tool = ELEMENTS.toolSections["tool-filter"]
					}

					const gainInput = document.createElement("input")
						gainInput.setAttribute("type", "number")
						gainInput.setAttribute("min", AUDIO_J.constants.filterGainMinimum)
						gainInput.setAttribute("max", AUDIO_J.constants.filterGainMaximum)
						gainInput.setAttribute("placeholder", "dB")
						gainInput.className = "input tool-filter-input--gain"
						gainInput.id = "tool-filter-input--gain--" + num
						gainInput.value = gainPercentage
						gainInput.style.left = Math.max(CONSTANTS.filterEdgePercentage, Math.min(CONSTANTS.percentage - CONSTANTS.filterEdgePercentage, ((lowPercentage + highPercentage) / 2))) + "%"
						gainInput.addEventListener(TRIGGERS.change, adjustFilterToolInput)
					ELEMENTS.toolSections["tool-filter"].appendChild(gainInput)
					ELEMENTS["tool-filter"]["input--gain--" + num] = gainInput

				// high
					const highShape = document.createElement("div")
						highShape.className = "shape square"
						highShape.id = "tool-filter-shape--high--" + num
						highShape.addEventListener(TRIGGERS.mousedown, selectBar)
						highShape.style.left = highPercentage + "%"
						highShape.style.top = "50%"
						highShape.addEventListener(TRIGGERS.mousedown, selectBar)
					ELEMENTS["tool-filter"]["track"].appendChild(highShape)
					ELEMENTS["tool-filter"]["shape--high--" + num] = highShape

					const highInput = document.createElement("input")
						highInput.setAttribute("type", "number")
						highInput.setAttribute("min", 0)
						highInput.setAttribute("max", CONSTANTS.percentage)
						highInput.setAttribute("placeholder", "pitch #")
						highInput.className = "input tool-filter-input--high"
						highInput.id = "tool-filter-input--high--" + num
						highInput.value = highMidi
						highInput.style.left = Math.max(CONSTANTS.filterEdgePercentage, Math.min(CONSTANTS.percentage - CONSTANTS.filterEdgePercentage, ((lowPercentage + highPercentage) / 2))) + "%"
						highInput.addEventListener(TRIGGERS.change, adjustFilterToolInput)
					ELEMENTS.toolSections["tool-filter"].appendChild(highInput)
					ELEMENTS["tool-filter"]["input--high--" + num] = highInput
			} catch (error) {console.log(error)}
		}

	/* adjustFilterToolBar */
		function adjustFilterToolBar(event) {
			try {
				// display
					const rectangle = ELEMENTS["tool-filter"]["track"].getBoundingClientRect()
					const shape     = STATE.parameter.getBoundingClientRect()
					const type      = STATE.parameter.id.split("--")[1]
					const num       = STATE.parameter.id.split("--")[2]
					const input     = ELEMENTS["tool-filter"]["input--" + type + "--" + num]
					const blob      = ELEMENTS["tool-filter"]["tool-filter-blob--" + num]
					const x         = event.x !== undefined ? event.x : event.targetTouches[0].clientX
					const y         = event.y !== undefined ? event.y : event.targetTouches[0].clientY

				// already deleted?
					if (!input) {
						return
					}
				
				// gain
					if (type == "gain") {
						let yPercentage = (y - rectangle.top) * CONSTANTS.percentage / (rectangle.height)
							yPercentage = Math.min(CONSTANTS.percentage, Math.max(0, yPercentage))
						STATE.parameter.style.top = yPercentage + "%"
						input.value = (CONSTANTS.percentage / 2 - yPercentage)

						let xPercentage = (x - rectangle.left) * CONSTANTS.percentage / (rectangle.width)
							xPercentage = Math.min(CONSTANTS.percentage, Math.max(0, xPercentage))
						STATE.parameter.style.left = xPercentage + "%"

						const low  = ELEMENTS["tool-filter"]["input--low--" + num]
						const lowPercentage  = (low.value  - AUDIO_J.constants.semitonesPerOctave) / AUDIO_J.constants.semitonesPerOctave / AUDIO_J.constants.filterOctaves * CONSTANTS.percentage
						const high = ELEMENTS["tool-filter"]["input--high--" + num]
						const highPercentage = (high.value - AUDIO_J.constants.semitonesPerOctave) / AUDIO_J.constants.semitonesPerOctave / AUDIO_J.constants.filterOctaves * CONSTANTS.percentage

						const distance = ((lowPercentage + highPercentage) / 2) - xPercentage

						const newLowPercentage  = lowPercentage  - distance
						const newHighPercentage = highPercentage - distance

						low.value  = newLowPercentage  / CONSTANTS.percentage * AUDIO_J.constants.filterOctaves * AUDIO_J.constants.semitonesPerOctave + AUDIO_J.constants.semitonesPerOctave
						high.value = newHighPercentage / CONSTANTS.percentage * AUDIO_J.constants.filterOctaves * AUDIO_J.constants.semitonesPerOctave + AUDIO_J.constants.semitonesPerOctave
					}

				// low
					else if (type == "low") {
						let xPercentage = (x - rectangle.left) * CONSTANTS.percentage / (rectangle.width)
							xPercentage = Math.min(CONSTANTS.percentage, Math.max(0, xPercentage))

						const high = ELEMENTS["tool-filter"]["input--high--" + num]
						const highPercentage = (high.value - AUDIO_J.constants.semitonesPerOctave) / AUDIO_J.constants.semitonesPerOctave / AUDIO_J.constants.filterOctaves * CONSTANTS.percentage

						if (xPercentage < highPercentage) {
							STATE.parameter.style.left = xPercentage + "%"
							input.value = xPercentage / CONSTANTS.percentage * AUDIO_J.constants.filterOctaves * AUDIO_J.constants.semitonesPerOctave + AUDIO_J.constants.semitonesPerOctave
						}
					}

				// high
					else if (type == "high") {
						let xPercentage = (x - rectangle.left) * CONSTANTS.percentage / (rectangle.width)
							xPercentage = Math.min(CONSTANTS.percentage, Math.max(0, xPercentage))

						const low = ELEMENTS["tool-filter"]["input--low--" + num]
						const lowPercentage = (low.value - AUDIO_J.constants.semitonesPerOctave) / AUDIO_J.constants.semitonesPerOctave / AUDIO_J.constants.filterOctaves * CONSTANTS.percentage

						if (xPercentage > lowPercentage) {
							STATE.parameter.style.left = xPercentage + "%"
							input.value = xPercentage / CONSTANTS.percentage * AUDIO_J.constants.filterOctaves * AUDIO_J.constants.semitonesPerOctave + AUDIO_J.constants.semitonesPerOctave
						}
					}

				// data
					adjustFilterToolInput({target: input})
			} catch (error) {console.log(error)}
		}

	/* adjustFilterToolInput */
		function adjustFilterToolInput(event, setup) {
			try {
				// data
					const type = event.target.id.split("--")[1]
					const num  = event.target.id.split("--")[2]
					const blob = ELEMENTS["tool-filter"]["blob--" + num]

					const low       = ELEMENTS["tool-filter"]["input--low--"  + num]
					const lowMidi   = Number(low.value)
					const lowPercentage =  (lowMidi - AUDIO_J.constants.semitonesPerOctave) * CONSTANTS.percentage / AUDIO_J.constants.filterOctaves / AUDIO_J.constants.semitonesPerOctave
					const high      = ELEMENTS["tool-filter"]["input--high--" + num]
					const highMidi  = Number(high.value)
					const highPercentage = (highMidi - AUDIO_J.constants.semitonesPerOctave) * CONSTANTS.percentage / AUDIO_J.constants.filterOctaves / AUDIO_J.constants.semitonesPerOctave
					const gain      = ELEMENTS["tool-filter"]["input--gain--" + num]
					const gainPercentage = Math.min(AUDIO_J.constants.filterGainMaximum, Math.max(AUDIO_J.constants.filterGainMinimum, gain.value))

				// display
					if (Math.abs(gainPercentage) < AUDIO_J.constants.filterGainThreshold && !STATE.parameter) {
						deselectFilterToolBar(null, num)
					}
					else {
						blob.style["clip-path"] = "polygon(" + lowPercentage + "% 50%, " + ((lowPercentage + highPercentage) / 2) + "% " + (CONSTANTS.percentage / 2 - gainPercentage) + "%, " + highPercentage + "% 50%)"
						blob.style["-webkit-clip-path"] = "polygon(" + lowPercentage + "% 50%, " + ((lowPercentage + highPercentage) / 2) + "% " + (CONSTANTS.percentage / 2 - gainPercentage) + "%, " + highPercentage + "% 50%)"
						ELEMENTS["tool-filter"]["shape--low--"  + num].style.left = lowPercentage  + "%"
						ELEMENTS["tool-filter"]["shape--high--" + num].style.left = highPercentage + "%"
						ELEMENTS["tool-filter"]["shape--gain--" + num].style.left = ((highPercentage + lowPercentage) / 2) + "%"
						ELEMENTS["tool-filter"]["shape--gain--" + num].style.top  = CONSTANTS.percentage / 2 - gainPercentage + "%"
					}

					low.style.left = high.style.left = gain.style.left = Math.max(CONSTANTS.filterEdgePercentage, Math.min(CONSTANTS.percentage - CONSTANTS.filterEdgePercentage, ((highPercentage + lowPercentage) / 2))) + "%"

				// audio
					if (!setup) {
						const midMidi = (lowMidi + highMidi) / 2

						const filters = {}
						filters[num] = {
							low:  (AUDIO_J.constants.tuningAHz * Math.pow(2, (lowMidi  - AUDIO_J.constants.tuningAMidi) / AUDIO_J.constants.semitonesPerOctave)),
							mid:  (AUDIO_J.constants.tuningAHz * Math.pow(2, (midMidi  - AUDIO_J.constants.tuningAMidi) / AUDIO_J.constants.semitonesPerOctave)),
							high: (AUDIO_J.constants.tuningAHz * Math.pow(2, (highMidi - AUDIO_J.constants.tuningAMidi) / AUDIO_J.constants.semitonesPerOctave)),
							gain: gainPercentage
						}

						if (AUDIO_J.instruments[AUDIO_J.activeInstrumentId]) { AUDIO_J.instruments[AUDIO_J.activeInstrumentId].setParameters({ filters: filters }) }
						saveFile()
					}
			} catch (error) {console.log(error)}
		}

	/* deselectFilterToolBar */
		function deselectFilterToolBar(event, override) {
			try {
				let num, circle, gain = 0
				if (event && event.target.className.includes("circle")) {
					circle = true
					num  = event.target.id.split("--")[2]
					gain = ELEMENTS["tool-filter"]["input--gain--" + num].value
				}
				else if ((override !== undefined) && (override !== null)) {
					num = override
					override = true
				}

				if ((circle && (Math.abs(gain) < AUDIO_J.constants.filterGainThreshold)) || override) {
						   ELEMENTS["tool-filter"]["shape--low--"  + num].remove()
					delete ELEMENTS["tool-filter"]["shape--low--"  + num]
						   ELEMENTS["tool-filter"]["shape--high--" + num].remove()
					delete ELEMENTS["tool-filter"]["shape--high--" + num]
						   ELEMENTS["tool-filter"]["shape--gain--" + num].remove()
					delete ELEMENTS["tool-filter"]["shape--gain--" + num]
						   ELEMENTS["tool-filter"]["input--low--"  + num].remove()
					delete ELEMENTS["tool-filter"]["input--low--"  + num]
						   ELEMENTS["tool-filter"]["input--high--" + num].remove()
					delete ELEMENTS["tool-filter"]["input--high--" + num]
						   ELEMENTS["tool-filter"]["input--gain--" + num].remove()
					delete ELEMENTS["tool-filter"]["input--gain--" + num]
						   ELEMENTS["tool-filter"]["blob--"        + num].remove()
					delete ELEMENTS["tool-filter"]["blob--"        + num]
				}
			} catch (error) {console.log(error)}
		}

/*** tool-echo ***/
	/* buildEchoTool */
		function buildEchoTool() {
			try {
				// feedback
					const feedbackTrack = document.createElement("div")
						feedbackTrack.id = "tool-echo-track--feedback"
						feedbackTrack.className = "track"
					ELEMENTS.toolSections["tool-echo"].appendChild(feedbackTrack)
					ELEMENTS["tool-echo"]["track--feedback"] = feedbackTrack

						const feedbackBar = document.createElement("div")
							feedbackBar.id = "tool-echo-bar--feedback"
							feedbackBar.className = "bar"
							feedbackBar.innerHTML = '<span class="fas fa-volume-up"></span>'
							feedbackBar.style.height = "0%"
							feedbackBar.addEventListener(TRIGGERS.mousedown, selectBar)
						feedbackTrack.appendChild(feedbackBar)
						ELEMENTS["tool-echo"]["bar--feedback"] = feedbackBar

					const feedbackInput = document.createElement("input")
						feedbackInput.setAttribute("type", "number")
						feedbackInput.setAttribute("min", 0)
						feedbackInput.setAttribute("max", AUDIO_J.constants.echoFeedbackMaximum * CONSTANTS.percentage)
						feedbackInput.className = "input"
						feedbackInput.id = "tool-echo-input--feedback"
						feedbackInput.value = 0
						feedbackInput.addEventListener(TRIGGERS.change, adjustEchoToolInput)
					ELEMENTS.toolSections["tool-echo"].appendChild(feedbackInput)
					ELEMENTS["tool-echo"]["input--feedback"] = feedbackInput

				// delay
					const delayTrack = document.createElement("div")
						delayTrack.id = "tool-echo-track--delay"
						delayTrack.className = "track"
					ELEMENTS.toolSections["tool-echo"].appendChild(delayTrack)
					ELEMENTS["tool-echo"]["track--delay"] = delayTrack

						const delayBar = document.createElement("div")
							delayBar.id = "tool-echo-bar--delay"
							delayBar.className = "bar"
							delayBar.innerHTML = '<span class="fas fa-clock"></span>'
							delayBar.style.left = "0%"
							delayBar.style.height = "0%"
							delayBar.addEventListener(TRIGGERS.mousedown, selectBar)
						delayTrack.appendChild(delayBar)
						ELEMENTS["tool-echo"]["bar--delay"] = delayBar

					const delayInput = document.createElement("input")
						delayInput.setAttribute("type", "number")
						delayInput.setAttribute("min", 0)
						delayInput.setAttribute("max", CONSTANTS.percentage)
						delayInput.className = "input"
						delayInput.id = "tool-echo-input--delay"
						delayInput.value = 0
						delayInput.style.left = "0%"
						delayInput.addEventListener(TRIGGERS.change, adjustEchoToolInput)
					delayTrack.appendChild(delayInput)
					ELEMENTS["tool-echo"]["input--delay"] = delayInput

				// echoes
					const echoTrack = document.createElement("div")
						echoTrack.id = "tool-echo-track--echoes"
						echoTrack.className = "track"
					ELEMENTS.toolSections["tool-echo"].appendChild(echoTrack)
					ELEMENTS["tool-echo"]["track-echoes"] = echoTrack

					for (let i = CONSTANTS.echoBeamStart; i <= CONSTANTS.echoBeamCount; i++) {
						const beam = document.createElement("div")
							beam.className = "beam"
							beam.id = "tool-echo-bar--" + i
							beam.style.height = "0%"
							beam.style.left   = "0%"
						echoTrack.appendChild(beam)
						ELEMENTS["tool-echo"]["bar--" + i] = beam
					}
			} catch (error) {console.log(error)}
		}

	/* adjustEchoToolBar */
		function adjustEchoToolBar(event) {
			try {
				// display
					const type      = STATE.parameter.id.split("--")[1]
					const shape     = STATE.parameter.getBoundingClientRect()
					const rectangle = ELEMENTS["tool-echo"]["track--" + type].getBoundingClientRect()
					const x         = event.x !== undefined ? event.x : event.targetTouches[0].clientX
					const y         = event.y !== undefined ? event.y : event.targetTouches[0].clientY
					let percentage  = 0

					switch (type) {
						case "feedback":
							percentage = (rectangle.bottom - y) * CONSTANTS.percentage / (rectangle.height)
							percentage = Math.min(AUDIO_J.constants.echoFeedbackMaximum * CONSTANTS.percentage, Math.max(0, percentage))
							STATE.parameter.style.height = percentage + "%"
							ELEMENTS["tool-echo"]["input--" + type].value = percentage
						break
						case "delay":
							percentage = (x - rectangle.left) * CONSTANTS.percentage / (rectangle.width)
							percentage = Math.min(CONSTANTS.percentage, Math.max(0, percentage))
							STATE.parameter.style.left = percentage + "%"
							ELEMENTS["tool-echo"]["input--" + type].value = percentage
						break
					}

				// data
					adjustEchoToolInput({target: ELEMENTS["tool-echo"]["input--" + type]})
			} catch (error) {console.log(error)}
		}

	/* adjustEchoToolInput */
		function adjustEchoToolInput(event, setup) {
			try {
				// inputs
					const feedbackInput = ELEMENTS["tool-echo"]["input--feedback"]
					const delayInput    = ELEMENTS["tool-echo"]["input--delay"]

				// beams
					const feedbackBeam  = ELEMENTS["tool-echo"]["bar--feedback"]
					const delayBeam     = ELEMENTS["tool-echo"]["bar--delay"]

				// values
					const feedbackValue = Math.min(AUDIO_J.constants.echoFeedbackMaximum * CONSTANTS.percentage, Math.max(0, feedbackInput.value))
					const delayValue    = Math.min(CONSTANTS.percentage                                        , Math.max(0, delayInput.value   ))

				// display
					feedbackBeam.style.height = feedbackValue + "%"

					delayBeam.style.left      = delayValue + "%"
					delayBeam.style.height    =	Math.pow((feedbackValue / CONSTANTS.percentage), 2) * CONSTANTS.percentage + "%"
					delayInput.style.left     = delayValue + "%"

					for (let i = CONSTANTS.echoBeamStart; i <= CONSTANTS.echoBeamCount; i++) {
						const beam = ELEMENTS["tool-echo"]["bar--" + i]
							beam.style.left   = delayValue * i + "%"
							beam.style.height = Math.pow((feedbackValue / CONSTANTS.percentage), i) * CONSTANTS.percentage + "%"
					}

				// audio
					if (!setup) {
						const echo = {
							delay:    delayValue / CONSTANTS.percentage,
							feedback: feedbackValue / CONSTANTS.percentage
						}
						if (AUDIO_J.instruments[AUDIO_J.activeInstrumentId]) { AUDIO_J.instruments[AUDIO_J.activeInstrumentId].setParameters({ echo: echo }) }
						saveFile()
					}
			} catch (error) {console.log(error)}
		}

/*** keyboard ***/
	/* buildKeyboard */
		function buildKeyboard() {
			try {
				let count = 0
				for (let i = CONSTANTS.keyboardStartPitch; i <= CONSTANTS.keyboardEndPitch; i++) {
					// build key
						const keyElement = document.createElement("button")
							keyElement.className = "key"
							keyElement.id = "key--" + i
							keyElement.value = i
							keyElement.addEventListener(TRIGGERS.mousedown, pressKey)
							if (CONSTANTS.keyboardLetters[i - CONSTANTS.keyboardStartPitch]) {
								keyElement.innerHTML = CONSTANTS.keyboardLetters[i - CONSTANTS.keyboardStartPitch]
							}
						ELEMENTS.keyboard.appendChild(keyElement)
						ELEMENTS.keys[i] = keyElement

					// color
						if (CONSTANTS.blackKeys.includes(i % AUDIO_J.constants.semitonesPerOctave)) {
							keyElement.setAttribute("color", "black")
							keyElement.style.left = (CONSTANTS.percentage / CONSTANTS.whiteKeyCount * (count - CONSTANTS.blackKeyOffset)) + "%"
						}
						else {
							keyElement.setAttribute("color", "white")
							keyElement.style.left = (CONSTANTS.percentage / CONSTANTS.whiteKeyCount * count) + "%"
							count++
						}
				}
			} catch (error) {console.log(error)}
		}

	/* pressKey */
		window.addEventListener(TRIGGERS.keydown, pressKey)
		function pressKey(event) {
			try {	
				// keyboard or mouse?
					let pressedKey = null
					if (event.type == TRIGGERS.mousedown) {
						pressedKey = event.target
						STATE.key = pressedKey
					}
					else if (event.type == TRIGGERS.keydown) {
						if (!document.activeElement || document.activeElement.tagName !== "INPUT") {
							pressedKey = ELEMENTS.keys[CONSTANTS.whichToPitch[event.which]]
						}
					}
				
				// select
					if (pressedKey && !pressedKey.getAttribute("selected") && AUDIO_J.instruments[AUDIO_J.activeInstrumentId]) {
						pressedKey.setAttribute("selected", true)
						AUDIO_J.instruments[AUDIO_J.activeInstrumentId].press(AUDIO_J.getNote(pressedKey.value)[0])
					}
			} catch (error) {console.log(error)}
		}

	/* liftKey */
		window.addEventListener(TRIGGERS.mouseup, liftKey)
		window.addEventListener(TRIGGERS.keyup,   liftKey)
		function liftKey(event) {
			try {
				// keyboard or mouse?
					let liftedKey = null
					if ((event.type == TRIGGERS.mouseup) && STATE.key) {
						liftedKey = STATE.key
						STATE.key = null
					}
					else if (event.type == TRIGGERS.keyup) {
						if (!document.activeElement || document.activeElement.tagName !== "INPUT") {
							liftedKey = ELEMENTS.keys[CONSTANTS.whichToPitch[event.which]]
						}
					}

				// mobile deselection
					if (event.type == TRIGGERS.mouseup && TRIGGERS.mouseup == "touchend" && AUDIO_J.instruments[AUDIO_J.activeInstrumentId]) {
						for (let k in ELEMENTS.keys) {
							ELEMENTS.keys[k].removeAttribute("selected")
							AUDIO_J.instruments[AUDIO_J.activeInstrumentId].lift(AUDIO_J.getNote(ELEMENTS.keys[k].value)[0])
						}
					}
				
				// deselect
					else if (liftedKey && AUDIO_J.instruments[AUDIO_J.activeInstrumentId]) {
						liftedKey.removeAttribute("selected")
						AUDIO_J.instruments[AUDIO_J.activeInstrumentId].lift(AUDIO_J.getNote(liftedKey.value)[0])
					}
			} catch (error) {console.log(error)}
		}

/*** midi hooks ***/
	/* pressKey */
		AUDIO_J.midi.pressKey = function(note, velocity) {
			try {
				if (ELEMENTS.keys[note]) {
					ELEMENTS.keys[note].setAttribute("selected", true)
				}
			} catch (error) {console.log(error)}
		}

	/* liftKey */
		AUDIO_J.midi.liftKey = function(note) {
			try {
				if (ELEMENTS.keys[note]) {
					ELEMENTS.keys[note].removeAttribute("selected")
				}
			} catch (error) {console.log(error)}
		}
