/*** globals ***/
	/* recognition */
		window.speechRecognition = window.webkitSpeechRecognition || window.speechRecognition

		let RECOGNITION = new window.speechRecognition()
			RECOGNITION.continuous = true
			RECOGNITION.interimResults = true
			RECOGNITION.onresult = outputTranscript

	/* previous text */
		let PREVIOUSTEXT = ""

	/* elements */
		let ELEMENTS = {
			recording: document.querySelector("#recording"),
			output: document.querySelector("#output")
		}

/*** interaction ***/
	/* toggleRecording */
		ELEMENTS.recording.onclick = toggleRecording
		function toggleRecording() {
			// turn off
				if (ELEMENTS.recording.getAttribute("state") == "on") {
					ELEMENTS.recording.setAttribute("state", "off")
					ELEMENTS.recording.blur()
					RECOGNITION.stop()
					return
				}

			// turn on
				ELEMENTS.recording.setAttribute("state", "on")
				PREVIOUSTEXT = ELEMENTS.output.value || ""
				if (PREVIOUSTEXT) {
					PREVIOUSTEXT += "\n\n"
				}
				ELEMENTS.recording.blur()
				RECOGNITION.start()
		}

	/* outputTranscript */
		function outputTranscript(event) {
			// get results
				let currentText = ""
				for (let i in event.results) {
					if (event.results[i][0]) {
						currentText += event.results[i][0].transcript
					}
				}

			// append
				ELEMENTS.output.value = PREVIOUSTEXT + currentText
		}
