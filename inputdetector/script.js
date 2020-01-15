window.onload = function() {
	/*** globals ***/
		/* on */
			if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
				var on = { click: "touchstart", mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" }
			}
			else {
				var on = { click:      "click", mousedown:  "mousedown", mousemove: "mousemove", mouseup:  "mouseup" }
			}

	/*** errors ***/
		var ERROR_OUTPUT = document.querySelector("#error .block-value")
		function handleError(name, message) {
			ERROR_OUTPUT.innerHTML = "<b>" + name + "</b><br>" + message
		}

	/*** time ***/
		/* detectCurrentTime */
			var CURRENT_TIME_OUTPUT = document.querySelector("#current-time .block-value")
			var CURRENT_TIME_INTERVAL = setInterval(detectCurrentTime, 1000)
			detectCurrentTime()
			function detectCurrentTime(event) {
				try {
					CURRENT_TIME_OUTPUT.innerHTML = new Date().toLocaleTimeString()
				} catch (error) { handleError(arguments.callee.name, error) }
			}

		/* detectCurrentDate */
			var CURRENT_DATE_OUTPUT = document.querySelector("#current-date .block-value")
			detectCurrentDate()
			function detectCurrentDate(event) {
				try {
					CURRENT_DATE_OUTPUT.innerHTML = new Date().toLocaleDateString()
				} catch (error) { handleError(arguments.callee.name, error) }
			}

		/* detectTimezone */
			var TIMEZONE_OUTPUT = document.querySelector("#timezone .block-value")
			detectTimezone()
			function detectTimezone(event) {
				try {
					TIMEZONE_OUTPUT.innerHTML = "GMT - " + (new Date().getTimezoneOffset() / 60) + " hours"
				} catch (error) { handleError(arguments.callee.name, error) }
			}

	/*** web location ***/
		/* detectQueryParams */
			var QUERY_OUTPUT = document.querySelector("#query .block-value")
			detectQueryParams()
			function detectQueryParams() {
				try {
					var params = {}
					var querystring = window.location.search.slice(1)
					if (!querystring) {
						QUERY_OUTPUT.innerHTML = ""
					}
					else {
						querystring = querystring.split("&")
						for (var i in querystring) {
							querystring[i] = querystring[i].split("=")
							params[querystring[i][0]] = querystring[i][1]
						}
						QUERY_OUTPUT.innerHTML = JSON.stringify(params)
					}
				} catch (error) { handleError(arguments.callee.name, error) }
			}

		/* detectHash */
			var HASH_OUTPUT = document.querySelector("#hash .block-value")
			detectHash()
			window.addEventListener("hashchange", detectHash)
			function detectHash() {
				try {
					HASH_OUTPUT.innerHTML = window.location.hash.slice(1) || ""
				} catch (error) { handleError(arguments.callee.name, error) }
			}

		/* detectReferrer */
			var REFERRER_OUTPUT = document.querySelector("#referrer .block-value")
			detectReferrer()
			function detectReferrer() {
				try {
					REFERRER_OUTPUT.innerHTML = document.referrer || ""
				} catch (error) { handleError(arguments.callee.name, error) }
			}

	/*** browser ***/
		/* detectJavascript */
			var JAVASCRIPT_OUTPUT = document.querySelector("#javascript .block-value")
			detectJavascript()
			function detectJavascript(event) {
				try {
					JAVASCRIPT_OUTPUT.innerHTML = window.JSversion
				} catch (error) { handleError(arguments.callee.name, error) }
			}

		/* detectConsole */
			var CONSOLE_OUTPUT = document.querySelector("#console .block-value")
			function detectConsole(event) {
				try {
					if ((window.outerHeight - window.innerHeight > 100) || (window.outerWidth - window.innerWidth > 100)) {
						CONSOLE_OUTPUT.innerHTML = "open"
					}
					else {
						CONSOLE_OUTPUT.innerHTML = "closed"
					}
				} catch (error) { handleError(arguments.callee.name, error) }
			}

		/* detectResize */
			var WINDOW_OUTPUT = document.querySelector("#window .block-value")
			detectResize()
			window.addEventListener("resize", detectResize)
			function detectResize(event) {
				try {
					WINDOW_OUTPUT.innerHTML = window.innerWidth + "," + window.innerHeight
					detectConsole()
				} catch (error) { handleError(arguments.callee.name, error) }
			}

		/* detectLanguage */
			var LANGUAGE_OUTPUT = document.querySelector("#language .block-value")
			detectLanguage()
			function detectLanguage(event) {
				try {
					LANGUAGE_OUTPUT.innerHTML = navigator.language
				} catch (error) { handleError(arguments.callee.name, error) }
			}

		/* detectCookies */
			var COOKIES_OUTPUT = document.querySelector("#cookies .block-value")
			detectCookies()
			function detectCookies(event) {
				try {
					COOKIES_OUTPUT.innerHTML = document.cookie || ""
				} catch (error) { handleError(arguments.callee.name, error) }
			}

		/* detectLocalstorage */
			var LOCALSTORAGE_OUTPUT = document.querySelector("#localstorage .block-value")
			detectLocalstorage()
			function detectLocalstorage(event) {
				try {
					LOCALSTORAGE_OUTPUT.innerHTML = JSON.stringify(window.localStorage)
				} catch (error) { handleError(arguments.callee.name, error) }
			}

		/* detectCallstack */
			var stackSize = 0
			var CALLSTACK_OUTPUT = document.querySelector("#callstack .block-value")
			detectCallstack()
			function detectCallstack(event) {
				try {
					try {
						incrementStacksize()
					}
					catch (error) {
						CALLSTACK_OUTPUT.innerHTML = stackSize
					}
				} catch (error) { handleError(arguments.callee.name, error) }
			}
			function incrementStacksize() {
				stackSize++
				incrementStacksize()
			}

		/* detectWebWorkers */
			var WEBWORKERS = null
			var WEBWORKERS_OUTPUT = document.querySelector("#webworkers .block-value")
			var WEBWORKERS_INPUT = document.querySelector("#webworkers .block-input")
				WEBWORKERS_INPUT.addEventListener("change", detectWebWorkers)
			createWebworkers()
			function createWebworkers() {
				try {
					try {
						WEBWORKERS = new Worker("worker.js")
						WEBWORKERS.addEventListener("message", function(event) {
							WEBWORKERS_OUTPUT.innerHTML = event.data.string
						}, false)
					}
					catch (error) {
						WEBWORKERS_OUTPUT.innerHTML = "not supported"
					}
				} catch (error) { handleError(arguments.callee.name, error) }
			}

			function detectWebWorkers(event) {
				try {
					WEBWORKERS.postMessage(WEBWORKERS_INPUT.value)
				} catch (error) { handleError(arguments.callee.name, error) }
			}

		/* detectPostMessage */
			var POSTMESSAGE_IFRAME = null
			var POSTMESSAGE_OUTPUT = document.querySelector("#postmessage .block-value")
			var POSTMESSAGE_INPUT = document.querySelector("#postmessage .block-input")
			createIframe()
			function createIframe() {
				try {
					POSTMESSAGE_IFRAME = document.createElement("iframe")
						POSTMESSAGE_IFRAME.src = "iframe.html"
						POSTMESSAGE_IFRAME.style.height = 0
						POSTMESSAGE_IFRAME.style.width = 0
						POSTMESSAGE_IFRAME.style.opacity = 0
						POSTMESSAGE_IFRAME.style.visibility = "hidden"
						POSTMESSAGE_IFRAME.style.margin = 0
						POSTMESSAGE_IFRAME.style.border = 0
						POSTMESSAGE_IFRAME.style.padding = 0
					document.body.appendChild(POSTMESSAGE_IFRAME)
				} catch (error) { handleError(arguments.callee.name, error) }
			}

			POSTMESSAGE_INPUT.addEventListener("change", detectPostMessage)
			function detectPostMessage(event) {
				try {
					if (POSTMESSAGE_IFRAME) {
						POSTMESSAGE_IFRAME.contentWindow.postMessage(POSTMESSAGE_INPUT.value, "*")
					}
				} catch (error) { handleError(arguments.callee.name, error) }
			}

		/* handle messages */
			window.addEventListener("message", handlePostmessage, false)
			function handlePostmessage(event) {
				try {
					if (event.data.iframe) {
						POSTMESSAGE_OUTPUT.innerHTML = event.data.string
					}
					else if (event.data.workers) {
						WEBWORKERS_OUTPUT.innerHTML = event.data.string
					}
				} catch (error) { handleError(arguments.callee.name, error) }
			}

	/*** device ***/
		/* detectOnline */
			var ONLINE_OUTPUT = document.querySelector("#online .block-value")
			window.addEventListener("online", detectOnline)
			window.addEventListener("offline", detectOnline)
			detectOnline()
			function detectOnline(event) {
				try {
					ONLINE_OUTPUT.innerHTML = navigator.onLine ? "online" : "offline"
				} catch (error) { handleError(arguments.callee.name, error) }
			}

		/* detectIP */
			var IP_OUTPUT = document.querySelector("#ip-address .block-value")
			detectIP()
			function detectIP(event) {
				try {
					var number = Math.floor(Math.random() * 200) + 1
					var request = new XMLHttpRequest()
						request.open("GET", "https://api6.ipify.org?format=json", true)
						request.onload = function() {
							if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
								try {
									IP_OUTPUT.innerHTML = JSON.parse(request.responseText).ip || "[no response]"
								}
								catch (error) { handleError(arguments.callee.name, error) }
							}
						}
						request.send()
				} catch (error) { handleError(arguments.callee.name, error) }
			}

		/* detectUserAgent */
			var USERAGENT_OUTPUT = document.querySelector("#useragent .block-value")
			detectUserAgent()
			function detectUserAgent(event) {
				try {
					USERAGENT_OUTPUT.innerHTML = navigator.userAgent
				} catch (error) { handleError(arguments.callee.name, error) }
			}

		/* detectScreen */
			var SCREEN_OUTPUT = document.querySelector("#screen .block-value")
			detectScreen()
			function detectScreen(event) {
				try {
					SCREEN_OUTPUT.innerHTML = screen.availWidth + "," + screen.availHeight
				} catch (error) { handleError(arguments.callee.name, error) }
			}

		/* detectBattery */
			var BATTERY_OUTPUT = document.querySelector("#battery .block-value")
			detectBattery()
			function detectBattery(event) {
				try {
					try {
						navigator.getBattery().then(function(event) {
							BATTERY_OUTPUT.innerHTML = event.level ? (event.level * 100 + "%" + "<br>") + (event.charging ? "charging" : "discharging") : "unavailable"
						}).catch(function(error) { handleError("detectBattery", error) })
					}
					catch (error) {
						BATTERY_OUTPUT.innerHTML = "not supported"
					}
				} catch (error) { handleError(arguments.callee.name, error) }
			}

		/* detectVibration */
			var VIBRATION_OUTPUT = document.querySelector("#vibration .block-value")
			detectVibration()
			function detectVibration(event) {
				try {
					VIBRATION_OUTPUT.innerHTML = ("vibrate" in navigator) ? "available" : "unavailable"
				} catch (error) { handleError(arguments.callee.name, error) }
			}

			var VIBRATION_INPUT = document.querySelector("#vibration .block-button")
			VIBRATION_INPUT.addEventListener(on.click, vibrate)
			function vibrate(event) {
				try {
					navigator.vibrate([500])
				} catch (error) { handleError(arguments.callee.name, error) }
			}

		/* detectOrientation */
			var ORIENTATION_OUTPUT = document.querySelector("#orientation .block-value")
			window.addEventListener("deviceorientation", detectOrientation)
			function detectOrientation(event) {
				try {
					ORIENTATION_OUTPUT.innerHTML = JSON.stringify({x: event.beta, y: event.gamma, z: event.alpha})

					detectCompass(event)
				} catch (error) { handleError(arguments.callee.name, error) }
			}

		/* detectCompass */
			var COMPASS_OUTPUT = document.querySelector("#compass .block-value")
			function detectCompass(event) {
				try {
					COMPASS_OUTPUT.innerHTML = JSON.stringify({x: event.beta, y: event.gamma, z: event.alpha})
				} catch (error) { handleError(arguments.callee.name, error) }
			}

		/* detectMotion */
			var MOTION_OUTPUT = document.querySelector("#motion .block-value")
			window.addEventListener("devicemotion", detectMotion)
			function detectMotion(event) {
				try {
					MOTION_OUTPUT.innerHTML = event.webkitCompassHeading ? event.webkitCompassHeading : event.alpha
				} catch (error) { handleError(arguments.callee.name, error) }
			}

	/*** interface ***/
		/* detectKeydown / detectKeyup */
			var KEYBOARD_OUTPUT = document.querySelector("#keyboard .block-value")
			window.addEventListener("keydown", detectKeydown)
			function detectKeydown(event) {
				try {
					KEYBOARD_OUTPUT.innerHTML = event.key
				} catch (error) { handleError(arguments.callee.name, error) }
			}
			
			window.addEventListener("keyup", detectKeyup)
			function detectKeyup(event) {
				try {
					KEYBOARD_OUTPUT.innerHTML = ""
				} catch (error) { handleError(arguments.callee.name, error) }
			}

		/* detectMousemove */
			var CURSOR_OUTPUT = document.querySelector("#cursor .block-value")
			window.addEventListener(on.mousemove, detectMousemove)
			function detectMousemove(event) {
				try {
					var x = event.touches ? event.touches[0].clientX : event.clientX
					var y = event.touches ? event.touches[0].clientY : event.clientY
					CURSOR_OUTPUT.innerHTML = x + "," + y

					detectDragmove(x, y)
				} catch (error) { handleError(arguments.callee.name, error) }
			}

		/* detectMousedown / detectMouseup */
			var CLICK_OUTPUT = document.querySelector("#click .block-value")
			window.addEventListener(on.mousedown, detectMousedown)
			function detectMousedown(event) {
				try {
					CLICK_OUTPUT.innerHTML = "!"
				} catch (error) { handleError(arguments.callee.name, error) }
			}
			
			window.addEventListener(on.mouseup, detectMouseup)
			function detectMouseup(event) {
				try {
					CLICK_OUTPUT.innerHTML = ""
					detectDrop()
				} catch (error) { handleError(arguments.callee.name, error) }
			}

		/* detectDoubleClick */
			var DOUBLECLICK_TIMEOUT = null
			var DOUBLECLICK_OUTPUT = document.querySelector("#doubleclick .block-value")
			window.addEventListener("dblclick", detectDoubleClick)
			function detectDoubleClick(event) {
				try {
					clearInterval(DOUBLECLICK_TIMEOUT)
					DOUBLECLICK_OUTPUT.innerHTML = "!"
					DOUBLECLICK_TIMEOUT = setTimeout(function() {
						DOUBLECLICK_OUTPUT.innerHTML = ""
					}, 1000)
				} catch (error) { handleError(arguments.callee.name, error) }
			}

		/* detectContextMenu */
			var CONTEXTMENU_TIMEOUT = null
			var CONTEXTMENU_OUTPUT = document.querySelector("#contextmenu .block-value")
			window.addEventListener("contextmenu", detectContextMenu)
			function detectContextMenu(event) {
				try {
					clearInterval(CONTEXTMENU_TIMEOUT)
					CONTEXTMENU_OUTPUT.innerHTML = "!"
					CONTEXTMENU_TIMEOUT = setTimeout(function() {
						CONTEXTMENU_OUTPUT.innerHTML = ""
					}, 1000)
				} catch (error) { handleError(arguments.callee.name, error) }
			}

		/* detectScroll */
			var SCROLL_OUTPUT = document.querySelector("#scroll .block-value")
			window.addEventListener("scroll", detectScroll)
			window.addEventListener("wheel", detectScroll)
			window.addEventListener("mousescroll", detectScroll)
			window.addEventListener("mousewheel", detectScroll)
			function detectScroll(event) {
				try {
					SCROLL_OUTPUT.innerHTML = (document.body.scrollLeft || document.documentElement.scrollLeft || 0) + ", " + (document.body.scrollTop || document.documentElement.scrollTop || 0)
				} catch (error) { handleError(arguments.callee.name, error) }
			}

		/* detectHoverOn / detectHoverOff */
			var HOVER_OUTPUT = document.querySelector("#hover .block-value")
			var HOVER_INPUT = document.querySelector("#hover")
				HOVER_INPUT.addEventListener("mouseenter", detectHoverOn)
			function detectHoverOn(event) {
				try {
					HOVER_OUTPUT.innerHTML = "!"
				} catch (error) { handleError(arguments.callee.name, error) }
			}

				HOVER_INPUT.addEventListener("mouseleave", detectHoverOff)
			function detectHoverOff(event) {
				try {
					HOVER_OUTPUT.innerHTML = ""
				} catch (error) { handleError(arguments.callee.name, error) }
			}

		/* detectFocus / detectBlur */
			var FOCUS_OUTPUT = document.querySelector("#focus .block-value")
			var FOCUS_INPUT = document.querySelector("#focus")
				FOCUS_INPUT.addEventListener("focus", detectFocus)
			function detectFocus(event) {
				try {
					FOCUS_OUTPUT.innerHTML = "!"
				} catch (error) { handleError(arguments.callee.name, error) }
			}

				FOCUS_INPUT.addEventListener("blur", detectBlur)
			function detectBlur(event) {
				try {
					FOCUS_OUTPUT.innerHTML = ""
				} catch (error) { handleError(arguments.callee.name, error) }
			}

		/* midi */
			var MIDI = null
			var MIDI_OUTPUT = document.querySelector("#midi .block-value")
			createMidi()
			function createMidi() {
				try {
					try {
						navigator.requestMIDIAccess().then(function(midi) {
							MIDI = midi || {}
							MIDI.controllers = {}
							MIDI.consumers   = {}
							MIDI.onstatechange = detectMidi
						}).catch(function(error) { handleError("createMidi", error) })
					}
					catch (error) {
						MIDI_OUTPUT.innerHTML = "not supported"
					}
				} catch (error) { handleError(arguments.callee.name, error) }
			}

			function detectMidi(event) {
				try {
					// set inputs
						MIDI.controllers = {}
						var inputs = MIDI.inputs.values()
						for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
							MIDI.controllers[input.value.name + input.value.id] = input.value
							MIDI.controllers[input.value.name + input.value.id].onmidimessage = detectMidiData
						}

					// set outputs
						MIDI.consumers = {}
						var outputs = MIDI.outputs.values()
						for (var output = outputs.next(); output && !output.done; output = outputs.next()) {
							MIDI.consumers[output.value.name + output.value.id] = output.value
						}

					// display data
						MIDI_OUTPUT.innerHTML = event.port.name + "<br>" + event.port.manufacturer + "<br>" + event.port.state + "<br><br>" +
							Object.keys(MIDI.controllers).join(", ") + "<br>"
						Object.keys(MIDI.consumers).join(", ")
				} catch (error) { handleError(arguments.callee.name, error) }
			}

		/* midi data */
			var MIDI_DATA_OUTPUT = document.querySelector("#midi-data .block-value")
			function detectMidiData(event) {
				try {
					MIDI_DATA_OUTPUT.innerHTML = event.data
				} catch (error) { handleError(arguments.callee.name, error) }
			}

	/*** permissioned things ***/
		/* detectLocation */
			var LOCATION_OUTPUT = document.querySelector("#location .block-value")
			var LOCATION_INPUT = document.querySelector("#location .block-button")
				LOCATION_INPUT.addEventListener(on.click, detectLocation)
			function detectLocation(event) {
				try {
					if (navigator.geolocation) {
						navigator.geolocation.getCurrentPosition(function(position) {
							LOCATION_OUTPUT.innerHTML = position.coords.latitude + "," + position.coords.longitude
						}).catch(function(error) { handleError("detectLocation", error) })
					}
					else {
						LOCATION_OUTPUT.innerHTML = "not supported"
					}
				} catch (error) { handleError(arguments.callee.name, error) }
			}

		/* detectSpeech */
			var SPEECH_RECOGNITION = null
			var SPEECH_LISTENING = false
			var SPEECH_COUNTDOWN = null
			var SPEECH_OUTPUT = document.querySelector("#speech .block-value")
			var SPEECH_INPUT = document.querySelector("#speech .block-button")

			createSpeechRecognition()
			function createSpeechRecognition() {
				try {
					try {
						SPEECH_RECOGNITION = new (window.webkitSpeechRecognition || window.speechRecognition)()
							SPEECH_RECOGNITION.onstart = startSpeech
							SPEECH_RECOGNITION.onsoundend = stopSpeech
							SPEECH_RECOGNITION.onresult = detectSpeech
					}
					catch (error) {
						SPEECH_OUTPUT.innerHTML = "not supported"
					}
				} catch (error) { handleError(arguments.callee.name, error) }
			}

			SPEECH_INPUT.addEventListener(on.click, toggleSpeech)
			function toggleSpeech(event) {
				try {
					if (SPEECH_LISTENING) {
						stopSpeech(false)
					}
					else {
						SPEECH_LISTENING = true
						SPEECH_RECOGNITION.start()
					}
				} catch (error) { handleError(arguments.callee.name, error) }
			}

			function startSpeech(event) {
				try {
					SPEECH_LISTENING = true
					SPEECH_INPUT.style.backgroundColor = "#aaaaaa"
					SPEECH_COUNTDOWN = setTimeout(function() {
						stopSpeech(true)
					}, 10000)
				} catch (error) { handleError(arguments.callee.name, error) }
			}

			function stopSpeech(transcribe) {
				try {
					clearInterval(SPEECH_COUNTDOWN)
					SPEECH_LISTENING = false
					SPEECH_INPUT.style.backgroundColor = "#dddddd"
					if (transcribe) {
						SPEECH_RECOGNITION.stop()
					}
					else {
						SPEECH_RECOGNITION.abort()
						SPEECH_OUTPUT.innerHTML = "[no results]"
					}
				} catch (error) { handleError(arguments.callee.name, error) }
			}

			function detectSpeech(event) {
				try {
					clearInterval(SPEECH_COUNTDOWN)
					if (event.results && event.results[0] && event.results[0][0]) {
						var text = (event.results[0][0].transcript || "[no results]")
						SPEECH_OUTPUT.innerHTML = text
					}
					else {
						SPEECH_OUTPUT.innerHTML = "[no results]"
					}
				} catch (error) { handleError(arguments.callee.name, error) }
			}

		/* detectAudio */
			var AUDIO_OUTPUT = document.querySelector("#audio audio")
			var AUDIO_INPUT = document.querySelector("#audio .block-button")
				AUDIO_INPUT.addEventListener(on.click, detectAudio)
			function detectAudio(event) {
				try {
					navigator.mediaDevices.getUserMedia({audio: true}).then(function(stream) {
						AUDIO_OUTPUT.srcObject = stream
					}).catch(function(error) { handleError("detectAudio", error) })
				} catch (error) { handleError(arguments.callee.name, error) }
			}

		/* detectVideo */
			var VIDEO_OUTPUT = document.querySelector("#video video")
			var VIDEO_INPUT = document.querySelector("#video .block-button")
				VIDEO_INPUT.addEventListener(on.click, detectVideo)
			function detectVideo(event) {
				try {
					navigator.mediaDevices.getUserMedia({video: true}).then(function(stream) {
						VIDEO_OUTPUT.srcObject = stream
					}).catch(function(error) { handleError("detectVideo", error) })
				} catch (error) { handleError(arguments.callee.name, error) }
			}

		/* detectPitch */
			var PITCH_DETECTION = null
			var PITCH_LISTENING = false
			var PITCH_OUTPUT = document.querySelector("#pitch .block-value")
			var PITCH_INPUT = document.querySelector("#pitch .block-button")
				PITCH_INPUT.addEventListener(on.click, detectPitch)
			function detectPitch(event) {
				try {
					PITCH_LISTENING = !PITCH_LISTENING
				
					if (!PITCH_LISTENING) {
						PITCH_OUTPUT.innerHTML = ""
					}
					else if (!PITCH_DETECTION) {
						buildPitchDetection()
					}
				} catch (error) { handleError(arguments.callee.name, error) }
			}

			function buildPitchDetection() {
				try {
					navigator.mediaDevices.getUserMedia({audio: true, video: false}).then(function(stream) {
						PITCH_DETECTION = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext)()
						PITCH_DETECTION.analyzer = PITCH_DETECTION.createAnalyser()
						PITCH_DETECTION.analyzer.fftSize = 8192
						PITCH_DETECTION.input = {
							bufferLength: PITCH_DETECTION.analyzer.frequencyBinCount,
							data: new Float32Array(PITCH_DETECTION.analyzer.frequencyBinCount)
						}

						PITCH_DETECTION.microphone = PITCH_DETECTION.createMediaStreamSource(stream)
						PITCH_DETECTION.microphone.connect(PITCH_DETECTION.analyzer)
						PITCH_DETECTION.loop = setInterval(detectPitchData, 200)
					}).catch(function(error) { handleError("buildPitchDetection", error) })
				} catch (error) { handleError(arguments.callee.name, error) }
			}

			function detectPitchData() {
				try {
					if (PITCH_LISTENING) {
						// refresh data
							PITCH_DETECTION.analyzer.getFloatTimeDomainData(PITCH_DETECTION.input.data)

						// figure out some values
							PITCH_DETECTION.input.minimum       = 0
							PITCH_DETECTION.input.maximum       = 0
							PITCH_DETECTION.input.extremes      = 0
							PITCH_DETECTION.input.lastCrossUp   = null
							PITCH_DETECTION.input.lastCrossDown = null
							PITCH_DETECTION.input.lastExtreme   = null
							PITCH_DETECTION.input.wavelengths   = []

						// calculate wavelength from up-cross to up-cross and from down-cross to down-cross (past midpoint)
							for (var t = 1; t < PITCH_DETECTION.input.bufferLength; t++) {
								if (PITCH_DETECTION.input.data[t - 1] < 0 && PITCH_DETECTION.input.data[t] >= 0) { // cross up
									PITCH_DETECTION.input.wavelengths.push(t - PITCH_DETECTION.input.lastCrossUp)
									PITCH_DETECTION.input.lastCrossUp = t
								}
								else if (PITCH_DETECTION.input.data[t - 1] >= 0 && PITCH_DETECTION.input.data[t] < 0) { // cross down
									PITCH_DETECTION.input.wavelengths.push(t - PITCH_DETECTION.input.lastCrossDown)
									PITCH_DETECTION.input.lastCrossDown = t
								}

								if (PITCH_DETECTION.input.data[t] > PITCH_DETECTION.input.maximum) { // new maximum
									PITCH_DETECTION.input.maximum = PITCH_DETECTION.input.data[t]
								}
								else if (PITCH_DETECTION.input.data[t] < PITCH_DETECTION.input.minimum) { // new minimum
									PITCH_DETECTION.input.minimum = PITCH_DETECTION.input.data[t]
								}
							}

						// calculate number of changes in direction within 10% of max or min
							for (var t = 0; t < PITCH_DETECTION.input.bufferLength; t++) {
								if      ((PITCH_DETECTION.input.data[t] > PITCH_DETECTION.input.maximum * 0.7) && (!PITCH_DETECTION.input.lastExtreme || PITCH_DETECTION.input.lastExtreme == "min")) {
								 	PITCH_DETECTION.input.lastExtreme = "max"
									PITCH_DETECTION.input.extremes++
								}
								else if ((PITCH_DETECTION.input.data[t] < PITCH_DETECTION.input.minimum * 0.7) && (!PITCH_DETECTION.input.lastExtreme || PITCH_DETECTION.input.lastExtreme == "max")) {
								 	PITCH_DETECTION.input.lastExtreme = "min"
									PITCH_DETECTION.input.extremes++
								}
							}

						// remove the first two waves, as they'll be a partial crossup and partial crossdown
							PITCH_DETECTION.input.wavelengths = PITCH_DETECTION.input.wavelengths.slice(2)
							PITCH_DETECTION.input.extremes   -= 2

						// collapse complex waves down to simple waves
							var complexity = Math.round(PITCH_DETECTION.input.wavelengths.length / PITCH_DETECTION.input.extremes)

						// average
							var average = 0
							for (var i = 0; i < PITCH_DETECTION.input.wavelengths.length; i++) {
								average += PITCH_DETECTION.input.wavelengths[i]
							}
							average = average / PITCH_DETECTION.input.wavelengths.length

						// calculate the frequency & note (sample rate is usually 44100 Hz)
							var frequency = PITCH_DETECTION.sampleRate / average / complexity
							PITCH_OUTPUT.innerHTML = frequency + "<br>Hz"
					}
				} catch (error) { handleError(arguments.callee.name, error) }
			}

	/*** prompt ***/
		/* detectPrompt */
			var PROMPT_OUTPUT = document.querySelector("#prompt .block-value")
			var PROMPT_INPUT = document.querySelector("#prompt .block-button")
				PROMPT_INPUT.addEventListener(on.click, detectPrompt)
			function detectPrompt(event) {
				try {
					PROMPT_OUTPUT.innerHTML = window.prompt("prompt:")
				} catch (error) { handleError(arguments.callee.name, error) }
			}

		/* detectConfirm */
			var CONFIRM_OUTPUT = document.querySelector("#confirm .block-value")
			var CONFIRM_INPUT = document.querySelector("#confirm .block-button")
				CONFIRM_INPUT.addEventListener(on.click, detectConfirm)
			function detectConfirm(event) {
				try {
					CONFIRM_OUTPUT.innerHTML = window.confirm("confirm?") ? "true" : "false"
				} catch (error) { handleError(arguments.callee.name, error) }
			}

	/*** form field inputs ***/
		/* detectTextInput */
			var TEXT_OUTPUT = document.querySelector("#text .block-value")
			var TEXT_INPUT = document.querySelector("#text .block-input")
				TEXT_INPUT.addEventListener("change", detectTextInput)
			function detectTextInput(event) {
				try {
					TEXT_OUTPUT.innerHTML = TEXT_INPUT.value
				} catch (error) { handleError(arguments.callee.name, error) }
			}

		/* detectPasswordInput */
			var PASSWORD_OUTPUT = document.querySelector("#password .block-value")
			var PASSWORD_INPUT = document.querySelector("#password .block-input")
				PASSWORD_INPUT.addEventListener("change", detectPasswordInput)
			function detectPasswordInput(event) {
				try {
					PASSWORD_OUTPUT.innerHTML = PASSWORD_INPUT.value
				} catch (error) { handleError(arguments.callee.name, error) }
			}

		/* detectNumberInput */
			var NUMBER_OUTPUT = document.querySelector("#number .block-value")
			var NUMBER_INPUT = document.querySelector("#number .block-input")
				NUMBER_INPUT.addEventListener("change", detectNumberInput)
			function detectNumberInput(event) {
				try {
					NUMBER_OUTPUT.innerHTML = NUMBER_INPUT.value
				} catch (error) { handleError(arguments.callee.name, error) }
			}

		/* detectTimeInput */
			var TIME_OUTPUT = document.querySelector("#time .block-value")
			var TIME_INPUT = document.querySelector("#time .block-input")
				TIME_INPUT.addEventListener("change", detectTimeInput)
			function detectTimeInput(event) {
				try {
					TIME_OUTPUT.innerHTML = TIME_INPUT.value
				} catch (error) { handleError(arguments.callee.name, error) }
			}

		/* detectDateInput */
			var DATE_OUTPUT = document.querySelector("#date .block-value")
			var DATE_INPUT = document.querySelector("#date .block-input")
				DATE_INPUT.addEventListener("change", detectDateInput)
			function detectDateInput(event) {
				try {
					DATE_OUTPUT.innerHTML = DATE_INPUT.value
				} catch (error) { handleError(arguments.callee.name, error) }
			}

		/* detectWeekInput */
			var WEEK_OUTPUT = document.querySelector("#week .block-value")
			var WEEK_INPUT = document.querySelector("#week .block-input")
				WEEK_INPUT.addEventListener("change", detectWeekInput)
			function detectWeekInput(event) {
				try {
					WEEK_OUTPUT.innerHTML = WEEK_INPUT.value
				} catch (error) { handleError(arguments.callee.name, error) }
			}

		/* detectMonthInput */
			var MONTH_OUTPUT = document.querySelector("#month .block-value")
			var MONTH_INPUT = document.querySelector("#month .block-input")
				MONTH_INPUT.addEventListener("change", detectMonthInput)
			function detectMonthInput(event) {
				try {
					MONTH_OUTPUT.innerHTML = MONTH_INPUT.value
				} catch (error) { handleError(arguments.callee.name, error) }
			}

		/* detectDateTimeInput */
			var DATETIME_OUTPUT = document.querySelector("#datetime .block-value")
			var DATETIME_INPUT = document.querySelector("#datetime .block-input")
				DATETIME_INPUT.addEventListener("change", detectDateTimeInput)
			function detectDateTimeInput(event) {
				try {
					DATETIME_OUTPUT.innerHTML = DATETIME_INPUT.value
				} catch (error) { handleError(arguments.callee.name, error) }
			}

		/* detectColorInput */
			var COLOR_OUTPUT = document.querySelector("#color .block-value")
			var COLOR_INPUT = document.querySelector("#color .block-input")
				COLOR_INPUT.addEventListener("change", detectColorInput)
			function detectColorInput(event) {
				try {
					COLOR_OUTPUT.innerHTML = COLOR_INPUT.value
				} catch (error) { handleError(arguments.callee.name, error) }
			}

	/*** form special inputs ***/
		/* detectTextareaInput */
			var TEXTAREA_OUTPUT = document.querySelector("#textarea .block-value")
			var TEXTAREA_INPUT = document.querySelector("#textarea .block-input")
				TEXTAREA_INPUT.addEventListener("change", detectTextareaInput)
			function detectTextareaInput(event) {
				try {
					TEXTAREA_OUTPUT.innerHTML = TEXTAREA_INPUT.value
				} catch (error) { handleError(arguments.callee.name, error) }
			}

		/* detectSelectInput */
			var SELECT_OUTPUT = document.querySelector("#select .block-value")
			var SELECT_INPUT = document.querySelector("#select .block-select")
				SELECT_INPUT.addEventListener("change", detectSelectInput)
			function detectSelectInput(event) {
				try {
					SELECT_OUTPUT.innerHTML = SELECT_INPUT.value
				} catch (error) { handleError(arguments.callee.name, error) }
			}

		/* detectMultiselectInput */
			var MULTISELECT_OUTPUT = document.querySelector("#multiselect .block-value")
			var MULTISELECT_INPUT = document.querySelector("#multiselect .block-select")
				MULTISELECT_INPUT.addEventListener("change", detectMultiselectInput)
			function detectMultiselectInput(event) {
				try {
					var selected = document.querySelectorAll("#multiselect .block-select option:checked")
					MULTISELECT_OUTPUT.innerHTML = Array.from(selected).map(function(element) { return element.value })
				} catch (error) { handleError(arguments.callee.name, error) }
			}

		/* detectRadioInput */
			var RADIO_OUTPUT = document.querySelector("#radio .block-value")
			var RADIO_INPUTS = document.querySelectorAll("#radio .block-radio")
				RADIO_INPUTS.forEach(function(element) { element.addEventListener("change", detectRadioInput) })
			function detectRadioInput(event) {
				try {
					for (var i in RADIO_INPUTS) {
						if (RADIO_INPUTS[i].checked) {
							RADIO_OUTPUT.innerHTML = RADIO_INPUTS[i].value
						}
					}
				} catch (error) { handleError(arguments.callee.name, error) }
			}

		/* detectCheckboxInput */
			var CHECKBOX_OUTPUT = document.querySelector("#checkbox .block-value")
			var CHECKBOX_INPUT = document.querySelector("#checkbox .block-checkbox")
				CHECKBOX_INPUT.addEventListener("change", detectCheckboxInput)
			detectCheckboxInput()
			function detectCheckboxInput(event) {
				try {
					CHECKBOX_OUTPUT.innerHTML = CHECKBOX_INPUT.checked ? "checked" : "unchecked"
				} catch (error) { handleError(arguments.callee.name, error) }
			}

		/* detectRangeInput */
			var RANGE_OUTPUT = document.querySelector("#range .block-value")
			var RANGE_INPUT = document.querySelector("#range .block-input")
				RANGE_INPUT.addEventListener("change", detectRangeInput)
			function detectRangeInput(event) {
				try {
					RANGE_OUTPUT.innerHTML = RANGE_INPUT.value
				} catch (error) { handleError(arguments.callee.name, error) }
			}

		/* detectFileInput */
			var FILE_OUTPUT = document.querySelector("#file .block-value")
			var FILE_BUTTON_INPUT = document.querySelector("#file .block-button")
			var FILE_INPUT = document.querySelector("#file .block-input-hidden")
				FILE_INPUT.addEventListener("change", detectFileInput)
			function detectFileInput(event) {
				try {
					if (FILE_INPUT.value && FILE_INPUT.value.length) {
						var reader = new FileReader()
							reader.readAsText(event.target.files[0])
							reader.onload = function(event) {
								FILE_OUTPUT.innerHTML = String(event.target.result)
							}
					}
				} catch (error) { handleError(arguments.callee.name, error) }
			}

	/*** form inputs with validation ***/
		/* detectEmailInput */
			var EMAIL_OUTPUT = document.querySelector("#email .block-value")
			var EMAIL_SUBMIT = document.querySelector("#email .block-input-hidden")
			var EMAIL_INPUT = document.querySelector("#email .block-input")
				EMAIL_INPUT.addEventListener("change", detectEmailInput)
			function detectEmailInput(event) {
				try {
					EMAIL_SUBMIT.click()
				} catch (error) { handleError(arguments.callee.name, error) }
			}
				EMAIL_SUBMIT.addEventListener(on.click, detectEmailInputSubmission)
			function detectEmailInputSubmission(event) {
				try {
					EMAIL_OUTPUT.innerHTML = EMAIL_INPUT.value
				} catch (error) { handleError(arguments.callee.name, error) }
			}

		/* detectTelephoneInput */
			var TELEPHONE_OUTPUT = document.querySelector("#telephone .block-value")
			var TELEPHONE_SUBMIT = document.querySelector("#telephone .block-input-hidden")
			var TELEPHONE_INPUT = document.querySelector("#telephone .block-input")
				TELEPHONE_INPUT.addEventListener("change", detectTelephoneInput)
			function detectTelephoneInput(event) {
				try {
					TELEPHONE_SUBMIT.click()
				} catch (error) { handleError(arguments.callee.name, error) }
			}
				TELEPHONE_SUBMIT.addEventListener(on.click, detectTelephoneInputSubmission)
			function detectTelephoneInputSubmission(event) {
				try {
					TELEPHONE_OUTPUT.innerHTML = TELEPHONE_INPUT.value
				} catch (error) { handleError(arguments.callee.name, error) }
			}

		/* detectURLInput */
			var URL_OUTPUT = document.querySelector("#url .block-value")
			var URL_SUBMIT = document.querySelector("#url .block-input-hidden")
			var URL_INPUT = document.querySelector("#url .block-input")
				URL_INPUT.addEventListener("change", detectURLInput)
			function detectURLInput(event) {
				try {
					URL_SUBMIT.click()
				} catch (error) { handleError(arguments.callee.name, error) }
			}
				URL_SUBMIT.addEventListener(on.click, detectURLInputSubmission)
			function detectURLInputSubmission(event) {
				try {
					URL_OUTPUT.innerHTML = URL_INPUT.value
				} catch (error) { handleError(arguments.callee.name, error) }
			}

	/*** math ***/
		/* detectRandom */
			var RANDOM_OUTPUT = document.querySelector("#random .block-value")
			var RANDOM_INPUT = document.querySelector("#random .block-button")
				RANDOM_INPUT.addEventListener(on.click, detectRandom)
			function detectRandom(event) {
				try {
					RANDOM_OUTPUT.innerHTML = Math.random()
				} catch (error) { handleError(arguments.callee.name, error) }
			}

		/* detectPi */
			var PI_OUTPUT = document.querySelector("#pi .block-value")
			detectPi()
			function detectPi(event) {
				try {
					PI_OUTPUT.innerHTML = Math.PI
				} catch (error) { handleError(arguments.callee.name, error) }
			}

		/* detectE */
			var E_OUTPUT = document.querySelector("#e .block-value")
			detectE()
			function detectE(event) {
				try {
					E_OUTPUT.innerHTML = Math.E
				} catch (error) { handleError(arguments.callee.name, error) }
			}

		/* detectInfinity */
			var INFINITY_OUTPUT = document.querySelector("#infinity .block-value")
			detectInfinity()
			function detectInfinity(event) {
				try {
					var x = 1
					var y = 1
					while (x < Infinity) {
						y = x
						x *= 2
					}
					x = y
					var half = x
					while (x < Infinity) {
						y = x
						half = half / 2
						x += half
					}
					INFINITY_OUTPUT.innerHTML = y
				} catch (error) { handleError(arguments.callee.name, error) }
			}

	/*** other ***/
		/* detectXHR */
			var XHR_OUTPUT = document.querySelector("#xhr .block-value")
			var XHR_INPUT = document.querySelector("#xhr .block-button")
				XHR_INPUT.addEventListener(on.click, detectXHR)
			function detectXHR(event) {
				try {
					var number = Math.floor(Math.random() * 200) + 1
					var request = new XMLHttpRequest()
						request.open("GET", "https://jsonplaceholder.typicode.com/todos/" + number, true)
						request.onload = function() {
							if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
								XHR_OUTPUT.innerHTML = (request.responseText) || "[no response]"
							}
						}
						request.send()
				} catch (error) { handleError(arguments.callee.name, error) }
			}

		/* detectContenteditable */
			var CONTENTEDITABLE_OUTPUT = document.querySelector("#contenteditable .block-value")
			var CONTENTEDITABLE_INPUT = document.querySelector("#contenteditable .block-label")
				CONTENTEDITABLE_INPUT.addEventListener("keydown", detectContenteditable)
				CONTENTEDITABLE_INPUT.addEventListener("keyup", detectContenteditable)
			function detectContenteditable(event) {
				try {
					CONTENTEDITABLE_OUTPUT.innerHTML = CONTENTEDITABLE_INPUT.innerHTML
				} catch (error) { handleError(arguments.callee.name, error) }
			}

		/* detectDetailsToggle */
			var DETAILSTOGGLE_OUTPUT = document.querySelector("#detailstoggle .block-value")
			var DETAILSTOGGLE_INPUT = document.querySelector("#detailstoggle .block-label details")
				DETAILSTOGGLE_INPUT.addEventListener("toggle", detectDetailsToggle)
				detectDetailsToggle()
			function detectDetailsToggle(event) {
				try {
					DETAILSTOGGLE_OUTPUT.innerHTML = DETAILSTOGGLE_INPUT.open ? "open" : "closed"
				} catch (error) { handleError(arguments.callee.name, error) }
			}

		/* detectDrag */
			var DRAGGING = false
			var DRAG_OUTPUT = document.querySelector("#drag .block-value")
			var DRAG_LABEL = document.querySelector("#drag .block-label")
			var DRAG_INPUT = document.querySelector("#drag .block-input")
				DRAG_INPUT.addEventListener(on.mousedown, detectDrag)
			function detectDrag(event) {
				try {
					var x = event.touches ? event.touches[0].clientX : event.clientX
					var y = event.touches ? event.touches[0].clientY : event.clientY
					var inputRect = DRAG_LABEL.getBoundingClientRect()

					DRAGGING = true
					DRAG_INPUT.style.cursor = "grabbing"
					DRAG_OUTPUT.innerHTML = "!"
				} catch (error) { handleError(arguments.callee.name, error) }
			}
			function detectDrop(event) {
				try {
					DRAGGING = false
					DRAG_INPUT.style.cursor = "grab"
					DRAG_OUTPUT.innerHTML = ""
				} catch (error) { handleError(arguments.callee.name, error) }
			}
			function detectDragmove(x, y) {
				try {
					if (DRAGGING) {
						var labelRect = DRAG_LABEL.getBoundingClientRect()
						DRAG_INPUT.style.left = (x - labelRect.left) + "px" 
						DRAG_INPUT.style.top  = (y - labelRect.top ) + "px"
					}
				} catch (error) { handleError(arguments.callee.name, error) }
			}

		/* detectPaste */
			var PASTE_OUTPUT = document.querySelector("#paste .block-value")
			var PASTE_INPUT = document.querySelector("#paste .block-input")
			PASTE_INPUT.addEventListener("paste", detectPaste)
			function detectPaste(event) {
				try {
					PASTE_OUTPUT.innerHTML = (event.clipboardData || window.clipboardData).getData("text")
					event.preventDefault()
				} catch (error) { handleError(arguments.callee.name, error) }
			}
}
