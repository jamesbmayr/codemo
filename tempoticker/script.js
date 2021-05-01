window.onload = function() {
	/*** globals ***/
		/* constants */
			var CONSTANTS = {
				msPerSecond: 1000,
				secondsPerMinute: 60,
				defaultPower: false,
				minTempo: 1,
				maxTempo: 1000,
				defaultTempo: 120,
				minBeats: 1,
				maxBeats: 32,
				defaultBeats: 4
			}

		/* triggers */
			var TRIGGERS = {
				click: "click",
				input: "input"
			}

		/* elements */
			var ELEMENTS = {
				body: document.body,
				power: document.querySelector("#power"),
				tempo: document.querySelector("#tempo"),
				beats: document.querySelector("#beats"),
				display: document.querySelector("#display"),
				beatMarkers: [],
				primaryAudio: document.querySelector("#primary-audio"),
				secondaryAudio: document.querySelector("#secondary-audio")
			}

		/* state */
			var STATE = {
				power: CONSTANTS.defaultPower,
				tempo: CONSTANTS.defaultTempo,
				beats: CONSTANTS.defaultBeats,
				beat: 0,
				loop: null
			}

	/*** on load ***/
		/* seedDefaults */
			seedDefaults()
			function seedDefaults() {
				try {
					// update power button
						ELEMENTS.power.setAttribute("state", STATE.power)

					// update inputs
						ELEMENTS.tempo.value = STATE.tempo
						ELEMENTS.tempo.min = CONSTANTS.minTempo
						ELEMENTS.tempo.max = CONSTANTS.maxTempo

						ELEMENTS.beats.value = STATE.beats
						ELEMENTS.beats.min = CONSTANTS.minBeats
						ELEMENTS.beats.max = CONSTANTS.maxBeats

					// load audio
						ELEMENTS.primaryAudio.load()
						ELEMENTS.secondaryAudio.load()
				} catch (error) {console.log(error)}
			}

	/*** interaction ***/
		/* togglePower */
			ELEMENTS.power.addEventListener(TRIGGERS.click, togglePower)
			function togglePower(event) {
				try {
					// set state
						STATE.power = !STATE.power

					// update power button
						ELEMENTS.power.setAttribute("state", STATE.power)

					// off --> end loop
						if (!STATE.power) {
							// clear display
								ELEMENTS.display.innerHTML = ""
								ELEMENTS.beatMarkers = []

							// end loop
								clearInterval(STATE.loop)
								STATE.loop = null
								return
						}

					// on --> start loop
						startLoop()
				} catch (error) {console.log(error)}
			}

		/* updateTempo */
			ELEMENTS.tempo.addEventListener(TRIGGERS.input, updateTempo)
			function updateTempo(event) {
				try {
					// set state
						STATE.tempo = Math.min(CONSTANTS.maxTempo, Math.max(CONSTANTS.minTempo, Number(ELEMENTS.tempo.value)))

					// off --> do nothing
						if (!STATE.power) {
							return
						}

					// on --> restart loop
						startLoop()
				} catch (error) {console.log(error)}
			}

		/* updateBeats */
			ELEMENTS.beats.addEventListener(TRIGGERS.input, updateBeats)
			function updateBeats(event) {
				try {
					// set state
						STATE.beats = Math.min(CONSTANTS.maxBeats, Math.max(CONSTANTS.minBeats, Number(ELEMENTS.beats.value)))

					// off --> do nothing
						if (!STATE.power) {
							return
						}

					// on --> restart loop
						startLoop()
				} catch (error) {console.log(error)}
			}

	/*** metronome ***/
		/* getInterval */
			function getInterval(tempo) {
				try {
					// not a number
						if (!tempo || isNaN(tempo)) {
							return CONSTANTS.secondsPerMinute * CONSTANTS.msPerSecond
						}

					// bpm --> mpb --> spb --> mspb
						return Math.round(1 / tempo * CONSTANTS.secondsPerMinute * CONSTANTS.msPerSecond)
				} catch (error) {console.log(error)}
			}

		/* startLoop */
			function startLoop() {
				try {
					// end existing loop
						clearInterval(STATE.loop)

					// reset beat
						STATE.beat = 0

					// reset beat markers
						ELEMENTS.display.innerHTML = ""
						ELEMENTS.beatMarkers = []

					// create beat markers
						for (var i = 0; i < STATE.beats; i++) {
							createBeatMarker(i)
						}

					// get interval
						var interval = getInterval(STATE.tempo)

					// start loop
						STATE.loop = setInterval(displayBeat, interval)
				} catch (error) {console.log(error)}
			}

		/* createBeatMarker */
			function createBeatMarker(index) {
				try {
					// create element
						var beatMarker = document.createElement("div")
							beatMarker.className = "marker"
							beatMarker.id = "marker-" + index
						ELEMENTS.display.appendChild(beatMarker)
						ELEMENTS.beatMarkers.push(beatMarker)
				} catch (error) {console.log(error)}
			}

		/* displayBeat */
			function displayBeat() {
				try {
					// display beat count
						for (var i in ELEMENTS.beatMarkers) {
							ELEMENTS.beatMarkers[i].setAttribute("state", false)
						}
						ELEMENTS.beatMarkers[STATE.beat].setAttribute("state", true)

					// sound beat
						if (!STATE.beat) {
							ELEMENTS.primaryAudio.play()
						}
						else {
							ELEMENTS.secondaryAudio.play()
						}

					// increment beat
						STATE.beat += 1
						if (STATE.beat >= STATE.beats) {
							STATE.beat = 0
						}
				} catch (error) {console.log(error)}
			}
}
