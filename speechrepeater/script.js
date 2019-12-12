

window.addEventListener("load", function() {
	/*** globals ***/
		/* browser prefixes */
			window.speechRecognition = window.webkitSpeechRecognition || window.speechRecognition
			window.speechSynthesis   = window.webkitSpeechSynthesis   || window.speechSynthesis

		/* constants */
			var INTERVAL = 50
			var DURATION = 10000
			var DELAY = 1000
			var NORESULTS_TEXT = "[no results]"
			var VOICES = {}

		/* statuses */
			var LISTENING = false
			var TIME = 0
			var COUNTDOWN = null
			var VOICE = null

		/* elements */
			var LISTEN_BUTTON = document.getElementById("listen")
			var LISTEN_BAR = document.getElementById("bar")
			var TRANSCRIPT_OUTPUT = document.getElementById("transcript")
			var VOICES_SELECT = document.getElementById("voices")

		/* recognition */
			var RECOGNITION = new window.speechRecognition()
				RECOGNITION.onstart = startListening
				RECOGNITION.onsoundend = stopListening
				RECOGNITION.onresult = outputTranscript

		/* synthesizer */
			var SYNTHESIZER = window.speechSynthesis
				SYNTHESIZER.onvoiceschanged = listVoices

	/*** listening ***/
		/* toggleListening */
			LISTEN_BUTTON.addEventListener("click", toggleListening)
			function toggleListening(event) {
				// manual stop (don't transcribe)
					if (LISTENING) {
						stopListening(false)
					}

				// manual start
					else {
						RECOGNITION.start()
					}
			}

		/* startListening */
			function startListening(event) {
				// set global
					LISTENING = true

				// set countdown failsafe
					TIME = 0
					COUNTDOWN = setInterval(updateBar, INTERVAL)
			}

		/* stopListening */
			function stopListening(transcribe) {
				// cancel countdown
					clearInterval(COUNTDOWN)

				// unset global
					LISTENING = false

				// button
					LISTEN_BAR.style.width = "100%"

				// transcribe?
					if (transcribe) {
						RECOGNITION.stop()
					}

				// abort --> display "no results"
					else {
						RECOGNITION.abort()
						TRANSCRIPT_OUTPUT.innerText = NORESULTS_TEXT
					}
			}

	/*** bar ***/
		/* updateBar */
			function updateBar(event) {
				// add to time
					TIME += INTERVAL

				// update bar width
					LISTEN_BAR.style.width = (DURATION - TIME) / DURATION * 100 + "%"

				// stop when duration is reached
					if (TIME >= DURATION) {
						stopListening(true)
					}
			}

	/*** voice ***/
		/* listVoices  */
			function listVoices() {
				// clear options
					VOICES_SELECT.innerHTML = ""

				// default (no voice)
					var option = document.createElement("option")
						option.innerText = "no voice"
						option.value = null
					VOICES_SELECT.appendChild(option)

				// get all voices
					var voiceList = SYNTHESIZER.getVoices()
					for (var i in voiceList) {
						VOICES[voiceList[i].name] = voiceList[i]
					}

				// loop through voices
					for (var i in VOICES) {
						var option = document.createElement("option")
							option.innerText = i
							option.value = i
						VOICES_SELECT.appendChild(option)
					}
			}

		/* changeVoice */
			VOICES_SELECT.addEventListener("change", changeVoice)
			function changeVoice(event) {
				// get select value
					var newVoice = VOICES_SELECT.value

				// if recognized voice
					if (VOICES[newVoice]) {
						VOICE = VOICES[newVoice]
					}

				// otherwise, unset
					else {
						VOICE = null
					}
			}

	/*** transcript ***/
		/* outputTranscript */
			function outputTranscript(event) {
				// cancel countdown
					clearInterval(COUNTDOWN)

				// get the transcript
					if (event.results && event.results[0] && event.results[0][0]) {
						var text = (event.results[0][0].transcript || "[no results]")
						TRANSCRIPT_OUTPUT.innerText = text
						speakTranscript()
					}

				// otherwise --> display "no results"
					else {
						TRANSCRIPT_OUTPUT.innerText = NORESULTS_TEXT
					}
			}

		/* speakTranscript */
			function speakTranscript() {
				setTimeout(function() {
					// remove previous utterances queued up
						SYNTHESIZER.cancel()

					// speak the transcript
						if (VOICE) {
							var utterance = new SpeechSynthesisUtterance(TRANSCRIPT_OUTPUT.innerText)
								utterance.voice = VOICE
							SYNTHESIZER.speak(utterance)
						}
				}, DELAY)
			}
})