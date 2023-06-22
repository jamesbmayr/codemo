/*** globals ***/
	/* on */
		if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
			var on = { click: "touchstart", mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" }
		}
		else {
			var on = { click:      "click", mousedown:  "mousedown", mousemove: "mousemove", mouseup:  "mouseup" }
		}

	/* wrapText */
		function wrapText(text) {
			return ("          " + text).slice(-10).replace(/\s/g, "&nbsp;")
		}

/*** errors ***/
	/* handleError */
		var ERROR_OUTPUT = document.querySelector("#error .block-value")
		var ERROR_NOTIFICATION = document.querySelector("#error-notification")
		var ERROR_TIMEOUT = null
		function handleError(name, message) {
			clearTimeout(ERROR_TIMEOUT)
			ERROR_NOTIFICATION.className = ""
			ERROR_OUTPUT.innerHTML = "<b>" + name + "</b><br>" + 
									 message

			ERROR_TIMEOUT = setTimeout(function() {
				ERROR_NOTIFICATION.className = "disappear"
			}, 3000)
		}

	/* clickNotification */
		ERROR_NOTIFICATION.addEventListener(on.click, clearSearch)

/*** search ***/
	/* updateSearch */
		var SEARCH_INPUT = document.querySelector("#search")
		SEARCH_INPUT.addEventListener("input", updateSearch)
		function updateSearch() {
			try {
				// search
					var search = SEARCH_INPUT.value || ""
					filterInputs(search)
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* clearSearch */
		var CLEAR_SEARCH = document.querySelector("#clear-search")
		CLEAR_SEARCH.addEventListener(on.click, clearSearch)
		function clearSearch() {
			try {
				// clear search field
					SEARCH_INPUT.value = ""

				// unfilter
					filterInputs()

				// refocus
					SEARCH_INPUT.focus()
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* filterInputs */
		function filterInputs(search) {
			try {
				// show all
					var hiddenBlocks = Array.from(document.querySelectorAll("[hidden=true]"))
					for (var i in hiddenBlocks) {
						hiddenBlocks[i].removeAttribute("hidden")
					}

				// no search?
					if (!search) {
						return
					}

				// search
					var allBlocks = Array.from(document.querySelectorAll(".block"))
					for (var i in allBlocks) {
						if (!allBlocks[i].id.toLowerCase().includes(search.toLowerCase())) {
							allBlocks[i].setAttribute("hidden", true)
						}
					}
			} catch (error) { handleError(arguments.callee.name, error) }
		}

/*** refresh ***/
	/* refreshPage */
		var REFRESH_BUTTON = document.querySelector("#refresh")
		REFRESH_BUTTON.addEventListener(on.click, refreshPage)
		function refreshPage() {
			try {
				window.location.search = "?refresh=" + Math.random()
			} catch (error) { handleError(arguments.callee.name, error) }
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
		var TIMEZONE_OUTPUT = document.querySelector("#current-timezone .block-value")
		detectTimezone()
		function detectTimezone(event) {
			try {
				TIMEZONE_OUTPUT.innerHTML = "GMT - " + (new Date().getTimezoneOffset() / 60) + " hours"
			} catch (error) { handleError(arguments.callee.name, error) }
		}

/*** web location ***/
	/* detectQueryParams */
		var QUERY_OUTPUT = document.querySelector("#url-query .block-value")
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
		var HASH_OUTPUT = document.querySelector("#url-hash .block-value")
		detectHash()
		window.addEventListener("hashchange", detectHash)
		function detectHash() {
			try {
				HASH_OUTPUT.innerHTML = window.location.hash.slice(1) || ""
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* detectReferrer */
		var REFERRER_OUTPUT = document.querySelector("#url-referrer .block-value")
		detectReferrer()
		function detectReferrer() {
			try {
				REFERRER_OUTPUT.innerHTML = document.referrer || ""
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* detectHistory */
		var HISTORY_OUTPUT = document.querySelector("#url-history .block-value")
		detectHistory()
		function detectHistory() {
			try {
				var historyLength = ((window.history.length - 1) || 0)
				HISTORY_OUTPUT.innerHTML = historyLength + " page" + (historyLength == 1 ? "" : "s")
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* backHistory */
		var HISTORY_INPUT = document.querySelector("#url-history .block-button")
		HISTORY_INPUT.addEventListener(on.click, backHistory)
		function backHistory() {
			try {
				history.back()
			} catch (error) { handleError(arguments.callee.name, error) }
		}

/*** browser ***/
	/* detectJava */
		var JAVA_OUTPUT = document.querySelector("#java-enabled .block-value")
		detectJava()
		function detectJava(event) {
			try {
				JAVA_OUTPUT.innerHTML = window.navigator.javaEnabled() ? "enabled" : "disabled"
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* detectJavascript */
		var JAVASCRIPT_OUTPUT = document.querySelector("#javascript-version .block-value")
		detectJavascript()
		function detectJavascript(event) {
			try {
				JAVASCRIPT_OUTPUT.innerHTML = window.JSversion
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* detectConsole */
		var CONSOLE_OUTPUT = document.querySelector("#javascript-console .block-value")
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

	/* detectActiveElement */
		var ACTIVE_ELEMENT_OUTPUT = document.querySelector("#javascript-active-element .block-value")
		allElements = Array.from(document.querySelectorAll("*")).forEach(function(element) {
			element.addEventListener("focus", detectActiveElement)
			element.addEventListener("blur", detectActiveElement)
		})
		function detectActiveElement(event) {
			try {
				if (document.activeElement == document.body) {
					ACTIVE_ELEMENT_OUTPUT.innerHTML = "body"
				}
				else {
					var closestBlock = document.activeElement.closest(".block") || null
					ACTIVE_ELEMENT_OUTPUT.innerHTML = closestBlock ? closestBlock.id : (String(document.activeElement.id) || String(document.activeElement))
				}
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* detectResize */
		var WINDOW_SIZE_OUTPUT = document.querySelector("#browser-window-size .block-value")
		detectResize()
		window.addEventListener("resize", detectResize)
		function detectResize(event) {
			try {
				WINDOW_SIZE_OUTPUT.innerHTML = "x:" + wrapText(Math.round(window.innerWidth)) + "<br>" + 
										  "y:" + wrapText(Math.round(window.innerHeight))
				detectConsole()
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* detectPosition */
		var WINDOW_POSITION_OUTPUT = document.querySelector("#browser-window-position .block-value")
		detectPosition()
		function detectPosition(event) {
			try {
				WINDOW_POSITION_OUTPUT.innerHTML = "left:" + wrapText(Math.round(window.screenX !== undefined ? window.screenX : window.screenLeft)) + "<br>" + 
											  "&nbsp;top:" + wrapText(Math.round(window.screenY !== undefined ? window.screenY : window.screenHeight))
			} catch (error) { handleError(arguments.callee.name, error) }
		}
		setInterval(detectPosition, 2000)

	/* detectLanguage */
		var LANGUAGE_OUTPUT = document.querySelector("#browser-language .block-value")
		detectLanguage()
		function detectLanguage(event) {
			try {
				LANGUAGE_OUTPUT.innerHTML = navigator.language
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* detectCharacterSet */
		var CHARACTER_SET_OUTPUT = document.querySelector("#browser-character-set .block-value")
		detectCharacterSet()
		function detectCharacterSet(event) {
			try {
				CHARACTER_SET_OUTPUT.innerHTML = document.characterSet
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* detectCookies */
		var COOKIES_OUTPUT = document.querySelector("#browser-cookies .block-value")
		var COOKIES_INPUT = document.querySelector("#browser-cookies .block-button")
		detectCookies()
		function detectCookies(justBaked) {
			try {
				COOKIES_OUTPUT.innerHTML = document.cookie || (justBaked ? "[not allowed]" : "")
			} catch (error) { handleError(arguments.callee.name, error) }
		}

		COOKIES_INPUT.addEventListener(on.click, createCookie)
		function createCookie() {
			try {
				document.cookie = "example=" + Math.random() + "; max-age=" + (60 * 60 * 24);
				detectCookies(true)
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* detectLocalstorage */
		var LOCALSTORAGE_OUTPUT = document.querySelector("#browser-localstorage .block-value")
		detectLocalstorage()
		function detectLocalstorage(event) {
			try {
				window.localStorage.inputDetector = "detected"
				LOCALSTORAGE_OUTPUT.innerHTML = JSON.stringify(window.localStorage, null, 2)
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* detectCallstack */
		var stackSize = 0
		var CALLSTACK_OUTPUT = document.querySelector("#browser-javascript-callstack .block-value")
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

	/* setInterval */
		var interval = null
		var INTERVAL_BUTTON = document.querySelector("#browser-javascript-set-interval .block-button")
		var INTERVAL_OUTPUT = document.querySelector("#browser-javascript-set-interval .block-value")
		INTERVAL_BUTTON.addEventListener(on.click, toggleInterval)
		function toggleInterval(event) {
			try {
				// play --> pause
					if (interval) {
						clearInterval(interval)
						interval = null
						INTERVAL_BUTTON.innerHTML = "interval (paused)"
						return
					}

				// pause --> play
					interval = setInterval(incrementInterval, 1000)
					INTERVAL_BUTTON.innerHTML = "interval (counting)"
			} catch (error) { handleError(arguments.callee.name, error) }
		}
		function incrementInterval() {
			try {
				INTERVAL_OUTPUT.innerHTML = Number(INTERVAL_OUTPUT.innerHTML) + 1
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* setTimeout */
		var timeout = null
		var TIMEOUT_INPUT = document.querySelector("#browser-javascript-set-timeout .block-input")
		var TIMEOUT_OUTPUT = document.querySelector("#browser-javascript-set-timeout .block-value")
		TIMEOUT_INPUT.addEventListener("input", resetTimeout)
		function resetTimeout(event) {
			try {
				// reset
					clearTimeout(timeout)
					TIMEOUT_OUTPUT.innerHTML = ""

				// wait
					var time = Math.round(Number(TIMEOUT_INPUT.value)) || 0
					if (!time) {
						return
					}
					timeout = setTimeout(endTimeout, time * 1000)
			} catch (error) { handleError(arguments.callee.name, error) }
		}
		function endTimeout() {
			try {
				TIMEOUT_INPUT.value = ""
				TIMEOUT_OUTPUT.innerHTML = "!"
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* detectWebWorkers */
		var WEBWORKERS = null
		var WEBWORKERS_OUTPUT = document.querySelector("#browser-webworkers .block-value")
		var WEBWORKERS_INPUT = document.querySelector("#browser-webworkers .block-input")
			WEBWORKERS_INPUT.addEventListener("input", detectWebWorkers)
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
					WEBWORKERS_OUTPUT.innerHTML = "[not supported]"
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
		var POSTMESSAGE_OUTPUT = document.querySelector("#browser-postmessage .block-value")
		var POSTMESSAGE_INPUT = document.querySelector("#browser-postmessage .block-input")
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

		POSTMESSAGE_INPUT.addEventListener("input", detectPostMessage)
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

	/* detectXHR */
		var XHR_OUTPUT = document.querySelector("#javascript-xhr .block-value")
		var XHR_INPUT = document.querySelector("#javascript-xhr .block-button")
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

/*** device ***/
	/* detectOnline */
		var ONLINE_OUTPUT = document.querySelector("#device-online .block-value")
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
					request.open("GET", "https://api.ipify.org?format=json", true)
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
		var USERAGENT_OUTPUT = document.querySelector("#browser-useragent .block-value")
		detectUserAgent()
		function detectUserAgent(event) {
			try {
				USERAGENT_OUTPUT.innerHTML = navigator.userAgent
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* detectScreen */
		var SCREEN_SIZE_OUTPUT = document.querySelector("#device-screen-size .block-value")
		detectScreenSize()
		function detectScreenSize(event) {
			try {
				SCREEN_SIZE_OUTPUT.innerHTML = "x:" + wrapText(Math.round(screen.availWidth)) + "<br>" +
											   "y:" + wrapText(Math.round(screen.availHeight))
			} catch (error) { handleError(arguments.callee.name, error) }
		}

		var SCREEN_DEPTH_OUTPUT = document.querySelector("#device-screen-depth .block-value")
		detectScreenDepth()
		function detectScreenDepth(event) {
			try {
				SCREEN_DEPTH_OUTPUT.innerHTML = "pixelDepth: " + screen.pixelDepth + "<br>" +
										  "colorDepth: " + screen.colorDepth
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* detectFullScreen */
		var FULLSCREEN_BUTTON = document.querySelector("#fullscreen .block-button")
		var FULLSCREEN_OUTPUT = document.querySelector("#fullscreen .block-value")
		FULLSCREEN_BUTTON.addEventListener(on.click, toggleFullScreen)
		function toggleFullScreen(event) {
			try {
				// not allowed
					if (!document.fullscreenEnabled) {
						FULLSCREEN_OUTPUT.innerHTML = "[not allowed]"
						return
					}

				// exit
					if (window.innerHeight == screen.availHeight) {
						document.exitFullscreen()
					}

				// enter
					else {
						document.body.requestFullscreen()
					}
			} catch (error) { handleError(arguments.callee.name, error) }
		}

		detectFullScreen()
		window.addEventListener("fullscreenchange", detectFullScreen)
		function detectFullScreen(event) {
			try {
				setTimeout(function() {
					if (window.innerHeight == screen.availHeight) {
						FULLSCREEN_OUTPUT.innerHTML = "!"
					}
					else {
						FULLSCREEN_OUTPUT.innerHTML = ""
					}
				}, 100)
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* detectScreenOrientation */
		var SCREEN_ORIENTATION_OUTPUT = document.querySelector("#screen-orientation .block-value")
		try {
			screen.orientation.addEventListener("change", detectScreenOrientation)
			detectScreenOrientation()
			function detectScreenOrientation(event) {
				try {
					SCREEN_ORIENTATION_OUTPUT.innerHTML = screen.orientation.type
					detectScreenSize()
				} catch (error) { handleError(arguments.callee.name, error) }
			}
		} catch (error) {}
		

	/* detectBattery */
		var BATTERY_OUTPUT = document.querySelector("#device-battery .block-value")
		detectBattery()
		function detectBattery(event) {
			try {
				try {
					navigator.getBattery().then(function(event) {
						BATTERY_OUTPUT.innerHTML = event.level ? (event.level * 100 + "%" + "<br>") + 
																 (event.charging ? "charging" : "discharging") : 
													"[unavailable]"
					}).catch(function(error) { handleError("detectBattery", error) })
				}
				catch (error) {
					BATTERY_OUTPUT.innerHTML = "[not supported]"
				}
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* detectVibration */
		var VIBRATION_OUTPUT = document.querySelector("#device-vibration .block-value")
		detectVibration()
		function detectVibration(event) {
			try {
				VIBRATION_OUTPUT.innerHTML = ("vibrate" in navigator) ? "[available]" : "[not supported]"
			} catch (error) { handleError(arguments.callee.name, error) }
		}

		var VIBRATION_INPUT = document.querySelector("#device-vibration .block-button")
		VIBRATION_INPUT.addEventListener(on.click, vibrate)
		function vibrate(event) {
			try {
				navigator.vibrate([500])
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* detectMotion */
		var ACCELERATION_OUTPUT = document.querySelector("#device-motion-acceleration .block-value")
		var ROTATION_OUTPUT = document.querySelector("#device-motion-rotation .block-value")
		setTimeout(function() {
			window.addEventListener("devicemotion", detectMotion)
			detectMotion()
		}, 0)
		function detectMotion(event) {
			try {
				// no event
					if (!event) {
						ACCELERATION_OUTPUT.innerHTML = "[no sensor]"
						ROTATION_OUTPUT.innerHTML = "[no sensor]"
						return
					}

				// values
					var acceleration = event.acceleration || null
					var rotationRate = event.rotationRate || null

				// acceleration
					ACCELERATION_OUTPUT.innerHTML = !acceleration ? "?" : ( 
													"x:" + wrapText((acceleration.x || 0).toFixed(4)) + " m/s^2<br>" +
													"y:" + wrapText((acceleration.y || 0).toFixed(4)) + " m/s^2<br>" +
													"z:" + wrapText((acceleration.z || 0).toFixed(4)) + " m/s^2"
												)

				// rotation
					ROTATION_OUTPUT.innerHTML = !rotationRate ? "?" : (
													"α:" + wrapText((rotationRate.alpha || 0).toFixed(4)) + "°/s<br>" +
													"β:" + wrapText((rotationRate.beta  || 0).toFixed(4)) + "°/s<br>" +
													"γ:" + wrapText((rotationRate.gamma || 0).toFixed(4)) + "°/s"
												)
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* detectOrientation & detectCompass */
		var ORIENTATION_OUTPUT = document.querySelector("#device-orientation .block-value")
		var COMPASS_OUTPUT = document.querySelector("#device-sensor-compass .block-value")
		setTimeout(function() {
			window.addEventListener("deviceorientationabsolute", detectOrientation)
			window.addEventListener("deviceorientation", detectOrientation)
		}, 0)
		function detectOrientation(event) {
			try {
				// 3D orientation
					ORIENTATION_OUTPUT.innerHTML = "α:" + wrapText((event.alpha || 0).toFixed(4)) + "°<br>" + 
												   "β:" + wrapText((event.beta  || 0).toFixed(4)) + "°<br>" +
												   "γ:" + wrapText((event.gamma || 0).toFixed(4)) + "°"
												   

				// pass on to compass
					if (!isNaN(event.webkitCompassHeading) || event.absolute) {
						detectCompass(event)
					}
			} catch (error) { handleError(arguments.callee.name, error) }
		}

		function detectCompass(event) {
			try {
				// get degrees
					var degrees = null
					if (!isNaN(event.webkitCompassHeading)) {
						degrees = Number(event.webkitCompassHeading)
					}
					if (event.absolute && event.alpha !== undefined && event.alpha !== null) {
						degrees = Number(event.alpha)
					}
					if (degrees == null) {
						COMPASS_OUTPUT.innerHTML = "[no sensor]"
						return
					}

				// convert to direction
					if (degrees < 11.25) {
						COMPASS_OUTPUT.innerHTML = "N"
					}
					else if (degrees < 33.75) {
						COMPASS_OUTPUT.innerHTML = "NNE"
					}
					else if (degrees < 56.25) {
						COMPASS_OUTPUT.innerHTML = "NE"
					}
					else if (degrees < 78.75) {
						COMPASS_OUTPUT.innerHTML = "ENE"
					}
					else if (degrees < 101.25) {
						COMPASS_OUTPUT.innerHTML = "E"
					}
					else if (degrees < 123.75) {
						COMPASS_OUTPUT.innerHTML = "ESE"
					}
					else if (degrees < 146.25) {
						COMPASS_OUTPUT.innerHTML = "SE"
					}
					else if (degrees < 168.75) {
						COMPASS_OUTPUT.innerHTML = "SSE"
					}
					else if (degrees < 191.25) {
						COMPASS_OUTPUT.innerHTML = "S"
					}
					else if (degrees < 213.75) {
						COMPASS_OUTPUT.innerHTML = "SSW"
					}
					else if (degrees < 236.25) {
						COMPASS_OUTPUT.innerHTML = "SW"
					}
					else if (degrees < 258.75) {
						COMPASS_OUTPUT.innerHTML = "WSW"
					}
					else if (degrees < 281.25) {
						COMPASS_OUTPUT.innerHTML = "W"
					}
					else if (degrees < 303.75) {
						COMPASS_OUTPUT.innerHTML = "WNW"
					}
					else if (degrees < 326.25) {
						COMPASS_OUTPUT.innerHTML = "NW"
					}
					else if (degrees < 348.75) {
						COMPASS_OUTPUT.innerHTML = "NNW"
					}
					else if (degrees < 360) {
						COMPASS_OUTPUT.innerHTML = "N"
					}
			} catch (error) { handleError(arguments.callee.name, error) }
		}

/*** sensors API ***/
	/* detectAccelerometer */
		var LINEAR_ACCELEROMETER_OUTPUT = document.querySelector("#sensor-linear-accelerometer .block-value")
		var LINEAR_ACCELEROMETER_BUTTON = document.querySelector("#sensor-linear-accelerometer .block-button")
		LINEAR_ACCELEROMETER_BUTTON.addEventListener(on.click, detectAccelerometerSensor)
		function detectAccelerometerSensor() {
			try {
				if (window.Accelerometer) {
					navigator.permissions.query({ name: "accelerometer" }).then(function(results) {
						if (results.state == "granted") {
							LINEAR_ACCELEROMETER_OUTPUT.innerHTML = "permissions granted"

							var accelerometerSensor = new LinearAccelerationSensor({ frequency: 10 })
								accelerometerSensor.addEventListener("reading", function(event) {
									LINEAR_ACCELEROMETER_OUTPUT.innerHTML = "x:" + wrapText(accelerometerSensor.x.toFixed(4)) + " m/s^2<br>" +
																			"y:" + wrapText(accelerometerSensor.y.toFixed(4)) + " m/s^2<br>" +
																			"z:" + wrapText(accelerometerSensor.z.toFixed(4)) + " m/s^2"
								})
								accelerometerSensor.addEventListener("error", function(event) {
									LINEAR_ACCELEROMETER_OUTPUT.innerHTML = event.error
								})
								accelerometerSensor.start()
						}
						else {
							LINEAR_ACCELEROMETER_OUTPUT.innerHTML = "permissions denied"
						}
					})
				}
				else {
					LINEAR_ACCELEROMETER_OUTPUT.innerHTML = "[no sensor]"
				}
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* detectAmbientLight */
		var AMBIENT_LIGHT_OUTPUT = document.querySelector("#sensor-ambient-light .block-value")
		var AMBIENT_LIGHT_BUTTON = document.querySelector("#sensor-ambient-light .block-button")
		AMBIENT_LIGHT_BUTTON.addEventListener(on.click, detectAmbientLightSensor)
		function detectAmbientLightSensor() {
			try {
				if (window.AmbientLightSensor) {
					navigator.permissions.query({ name: "ambient-light-sensor" }).then(function(results) {
						if (results.state == "granted") {
							AMBIENT_LIGHT_OUTPUT.innerHTML = "permissions granted"
							
							var ambientLightSensor = new AmbientLightSensor()
								ambientLightSensor.addEventListener("reading", function(event) {
									AMBIENT_LIGHT_OUTPUT.innerHTML = wrapText(ambientLightSensor.illuminance.toFixed(4)) + " lux"
								})
								ambientLightSensor.addEventListener("error", function(event) {
									AMBIENT_LIGHT_OUTPUT.innerHTML = event.error
								})
								ambientLightSensor.start()
						}
						else {
							AMBIENT_LIGHT_OUTPUT.innerHTML = "permissions denied"
						}
					})
				}
				else {
					AMBIENT_LIGHT_OUTPUT.innerHTML = "[no sensor]"
				}
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* detectGravity */
		var GRAVITY_OUTPUT = document.querySelector("#sensor-gravity .block-value")
		var GRAVITY_BUTTON = document.querySelector("#sensor-gravity .block-button")
		GRAVITY_BUTTON.addEventListener(on.click, detectGravitySensor)
		function detectGravitySensor() {
			try {
				if (window.GravitySensor) {
					navigator.permissions.query({ name: "accelerometer" }).then(function(results) {
						if (results.state == "granted") {
							GRAVITY_OUTPUT.innerHTML = "permissions granted"

							var gravitySensor = new GravitySensor({ frequency: 10 })
								gravitySensor.addEventListener("reading", function(event) {
									GRAVITY_OUTPUT.innerHTML = "x:" + wrapText(gravitySensor.x.toFixed(4)) + " m/s^2<br>" +
															   "y:" + wrapText(gravitySensor.y.toFixed(4)) + " m/s^2<br>" +
															   "z:" + wrapText(gravitySensor.z.toFixed(4)) + " m/s^2"
								})
								gravitySensor.addEventListener("error", function(event) {
									GRAVITY_OUTPUT.innerHTML = event.error
								})
								gravitySensor.start()
						}
						else {
							GRAVITY_OUTPUT.innerHTML = "permissions denied"
						}
					})
				}
				else {
					GRAVITY_OUTPUT.innerHTML = "[no sensor]"
				}
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* detectGyroscope */
		var GYROSCOPE_OUTPUT = document.querySelector("#sensor-gyroscope .block-value")
		var GYROSCOPE_BUTTON = document.querySelector("#sensor-gyroscope .block-button")
		GYROSCOPE_BUTTON.addEventListener(on.click, detectGyroscopeSensor)
		function detectGyroscopeSensor() {
			try {
				if (window.Gyroscope) {
					navigator.permissions.query({ name: "gyroscope" }).then(function(results) {
						if (results.state == "granted") {
							GYROSCOPE_OUTPUT.innerHTML = "permissions granted"

							var gyroscopeSensor = new Gyroscope({ frequency: 10 })
								gyroscopeSensor.addEventListener("reading", function(event) {
									GYROSCOPE_OUTPUT.innerHTML = "x:" + wrapText(gyroscopeSensor.x.toFixed(4)) + " rad/s<br>" +
																 "y:" + wrapText(gyroscopeSensor.y.toFixed(4)) + " rad/s<br>" +
																 "z:" + wrapText(gyroscopeSensor.z.toFixed(4)) + " rad/s"
								})
								gyroscopeSensor.addEventListener("error", function(event) {
									GYROSCOPE_OUTPUT.innerHTML = event.error
								})
								gyroscopeSensor.start()
						}
						else {
							GYROSCOPE_OUTPUT.innerHTML = "permissions denied"
						}
					})
				}
				else {
					GYROSCOPE_OUTPUT.innerHTML = "[no sensor]"
				}
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* detectMagnetometer */
		var MAGNETOMETER_OUTPUT = document.querySelector("#sensor-magnetometer .block-value")
		var MAGNETOMETER_BUTTON = document.querySelector("#sensor-magnetometer .block-button")
		MAGNETOMETER_BUTTON.addEventListener(on.click, detectMagnetometerSensor)
		function detectMagnetometerSensor() {
			try {
				if (window.Magnetometer) {
					navigator.permissions.query({ name: "magnetometer" }).then(function(results) {
						if (results.state == "granted") {
							MAGNETOMETER_OUTPUT.innerHTML = "permissions granted"

							var magnetometerSensor = new Magnetometer({ frequency: 10 })
								magnetometerSensor.addEventListener("reading", function(event) {
									MAGNETOMETER_OUTPUT.innerHTML = "x:" + wrapText(magnetometerSensor.x.toFixed(4)) + " μT<br>" +
																	"y:" + wrapText(magnetometerSensor.y.toFixed(4)) + " μT<br>" +
																	"z:" + wrapText(magnetometerSensor.z.toFixed(4)) + " μT"
								})
								magnetometerSensor.addEventListener("error", function(event) {
									MAGNETOMETER_OUTPUT.innerHTML = event.error
								})
								magnetometerSensor.start()
						}
						else {
							MAGNETOMETER_OUTPUT.innerHTML = "permissions denied"
						}
					})
				}
				else {
					MAGNETOMETER_OUTPUT.innerHTML = "[no sensor]"
				}
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* detectAbsoluteOrientation */
		var ABSOLUTE_ORIENTATION_OUTPUT = document.querySelector("#sensor-absolute-orientation .block-value")
		var ABSOLUTE_ORIENTATION_BUTTON = document.querySelector("#sensor-absolute-orientation .block-button")
		ABSOLUTE_ORIENTATION_BUTTON.addEventListener(on.click, detectAbsoluteOrientationSensor)
		function detectAbsoluteOrientationSensor() {
			try {
				if (window.Accelerometer && window.Gyroscope && window.Magnetometer) {
					Promise.all([
						navigator.permissions.query({ name: "accelerometer" }),
						navigator.permissions.query({ name: "magnetometer" }),
						navigator.permissions.query({ name: "gyroscope" })
					]).then(function(results) {
						if (results.every(function(result) { return result.state == "granted" })) {
							ABSOLUTE_ORIENTATION_OUTPUT.innerHTML = "permissions granted"

							var absoluteOrientationSensor = new AbsoluteOrientationSensor({ frequency: 10, referenceFrame: "device" })
								absoluteOrientationSensor.addEventListener("reading", function(event) {
									ABSOLUTE_ORIENTATION_OUTPUT.innerHTML = "x:" + wrapText(absoluteOrientationSensor.quaternion[0].toFixed(4)) + "<br>" +
																			"y:" + wrapText(absoluteOrientationSensor.quaternion[1].toFixed(4)) + "<br>" +
																			"z:" + wrapText(absoluteOrientationSensor.quaternion[2].toFixed(4)) + "<br>" +
																			"w:" + wrapText(absoluteOrientationSensor.quaternion[3].toFixed(4))
								})
								absoluteOrientationSensor.addEventListener("error", function(event) {
									ABSOLUTE_ORIENTATION_OUTPUT.innerHTML = event.error
								})
								absoluteOrientationSensor.start()
						}
						else {
							ABSOLUTE_ORIENTATION_OUTPUT.innerHTML = "permissions denied"
						}
					})
				}
				else {
					ABSOLUTE_ORIENTATION_OUTPUT.innerHTML = "[no sensor]"
				}
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* detectRelativeOrientation */
		var RELATIVE_ORIENTATION_OUTPUT = document.querySelector("#sensor-relative-orientation .block-value")
		var RELATIVE_ORIENTATION_BUTTON = document.querySelector("#sensor-relative-orientation .block-button")
		RELATIVE_ORIENTATION_BUTTON.addEventListener(on.click, detectRelativeOrientationSensor)
		function detectRelativeOrientationSensor() {
			try {
				if (window.Accelerometer && window.Gyroscope) {
					Promise.all([
						navigator.permissions.query({ name: "accelerometer" }),
						navigator.permissions.query({ name: "gyroscope" })
					]).then(function(results) {
						if (results.every(function(result) { return result.state == "granted" })) {
							RELATIVE_ORIENTATION_OUTPUT.innerHTML = "permissions granted"

							var relativeOrientationSensor = new RelativeOrientationSensor({ frequency: 10, referenceFrame: "device" })
								relativeOrientationSensor.addEventListener("reading", function(event) {
									RELATIVE_ORIENTATION_OUTPUT.innerHTML = "x:" + wrapText(relativeOrientationSensor.quaternion[0].toFixed(4)) + "<br>" +
																			"y:" + wrapText(relativeOrientationSensor.quaternion[1].toFixed(4)) + "<br>" +
																			"z:" + wrapText(relativeOrientationSensor.quaternion[2].toFixed(4)) + "<br>" +
																			"w:" + wrapText(relativeOrientationSensor.quaternion[3].toFixed(4))
								})
								relativeOrientationSensor.addEventListener("error", function(event) {
									RELATIVE_ORIENTATION_OUTPUT.innerHTML = event.error
								})
								relativeOrientationSensor.start()
						}
						else {
							RELATIVE_ORIENTATION_OUTPUT.innerHTML = "permissions denied"
						}
					})
				}
				else {
					RELATIVE_ORIENTATION_OUTPUT.innerHTML = "[no sensor]"
				}
			} catch (error) { handleError(arguments.callee.name, error) }
		}

/*** interface ***/
	/* detectKeydown / detectKeyup */
		var KEYBOARD_OUTPUT = document.querySelector("#peripheral-keyboard .block-value")
		window.addEventListener("keydown", detectKeydown)
		function detectKeydown(event) {
			try {
				KEYBOARD_OUTPUT.innerHTML = event.key + "<br>" + 
											event.which + "<br>" + 
											event.code
			} catch (error) { handleError(arguments.callee.name, error) }
		}
		
		window.addEventListener("keyup", detectKeyup)
		function detectKeyup(event) {
			try {
				KEYBOARD_OUTPUT.innerHTML = ""
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* detectMousemove */
		var CURSOR_OUTPUT = document.querySelector("#peripheral-cursor .block-value")
		window.addEventListener(on.mousemove, detectMousemove)
		function detectMousemove(event) {
			try {
				var x = event.touches ? event.touches[0].clientX : event.clientX
				var y = event.touches ? event.touches[0].clientY : event.clientY
				CURSOR_OUTPUT.innerHTML = "x:" + wrapText(x.toFixed(2)) + "<br>" + 
										  "y:" + wrapText(y.toFixed(2))

				detectDragmove(x, y)
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* detectMousedown / detectMouseup */
		var CLICK_OUTPUT = document.querySelector("#peripheral-click .block-value")
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
		var DOUBLECLICK_OUTPUT = document.querySelector("#peripheral-doubleclick .block-value")
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
		var CONTEXTMENU_OUTPUT = document.querySelector("#peripheral-contextmenu .block-value")
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

	/* detectWindowScroll */
		var WINDOWSCROLL_OUTPUT = document.querySelector("#peripheral-window-scroll .block-value")
		var CONTAINER = document.querySelector("#container")
		window.addEventListener("scroll", detectWindowScroll)
		window.addEventListener("wheel", detectWindowScroll)
		window.addEventListener("mousescroll", detectWindowScroll)
		window.addEventListener("mousewheel", detectWindowScroll)
		function detectWindowScroll(event) {
			try {
				setTimeout(function() {
					WINDOWSCROLL_OUTPUT.innerHTML = "x:" + wrapText(Math.round(CONTAINER.scrollLeft || document.body.scrollLeft || document.documentElement.scrollLeft || 0)) + "<br>" +
													"y:" + wrapText(Math.round(CONTAINER.scrollTop  || document.body.scrollTop  || document.documentElement.scrollTop  || 0))
				}, 100)
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* detectScroll */
		var SCROLL_OUTPUT = document.querySelector("#peripheral-scroll .block-value")
		var SCROLL_INPUT = document.querySelector("#peripheral-scroll .block-label")
		SCROLL_INPUT.addEventListener("scroll", detectScroll)
		SCROLL_INPUT.addEventListener("wheel", detectScroll)
		SCROLL_INPUT.addEventListener("mousescroll", detectScroll)
		SCROLL_INPUT.addEventListener("mousewheel", detectScroll)
		detectScroll()
		function detectScroll(event) {
			try {
				SCROLL_OUTPUT.innerHTML = "x:" + wrapText(Math.round(SCROLL_INPUT.scrollLeft || 0)) + "<br>" + 
										  "y:" + wrapText(Math.round(SCROLL_INPUT.scrollTop  || 0))
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* detectHoverOn / detectHoverOff */
		var HOVER_OUTPUT = document.querySelector("#peripheral-hover .block-value")
		var HOVER_INPUT = document.querySelector("#peripheral-hover")
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
		var FOCUS_OUTPUT = document.querySelector("#peripheral-focus .block-value")
		var FOCUS_INPUT = document.querySelector("#peripheral-focus")
		var FOCUS_BUTTON = document.querySelector("#peripheral-focus .block-button")
			FOCUS_INPUT.addEventListener("focus", detectFocus)
			FOCUS_BUTTON.addEventListener("focus", detectFocus)
		function detectFocus(event) {
			try {
				FOCUS_OUTPUT.innerHTML = "!"
			} catch (error) { handleError(arguments.callee.name, error) }
		}

			FOCUS_INPUT.addEventListener("blur", detectBlur)
			FOCUS_BUTTON.addEventListener("blur", detectBlur)
		function detectBlur(event) {
			try {
				FOCUS_OUTPUT.innerHTML = ""
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* detectDrag */
		var DRAGGING = false
		var DRAG_OUTPUT = document.querySelector("#peripheral-drag .block-value")
		var DRAG_LABEL = document.querySelector("#peripheral-drag .block-label")
		var DRAG_INPUT = document.querySelector("#peripheral-drag .block-input")
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

/*** permissioned things ***/
	/* detectLocation */
		var LOCATION_OUTPUT = document.querySelector("#device-geo-location .block-value")
		var LOCATION_INPUT = document.querySelector("#device-geo-location .block-button")
			LOCATION_INPUT.addEventListener(on.click, detectLocation)
		function detectLocation(event) {
			try {
				if (navigator.geolocation) {
					LOCATION_OUTPUT.innerHTML = "?"
					navigator.geolocation.getCurrentPosition(function(position) {
						LOCATION_OUTPUT.innerHTML = "lat: " + wrapText( position.coords.latitude.toFixed(7)) + "°<br>" + 
													"long:" + wrapText(position.coords.longitude.toFixed(7)) + "°"
					}, function(error) {
						LOCATION_OUTPUT.innerHTML = error.message
					})
				}
				else {
					LOCATION_OUTPUT.innerHTML = "[not supported]"
				}
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* detectSpeech */
		var SPEECH_RECOGNITION = null
		var SPEECH_LISTENING = false
		var SPEECH_COUNTDOWN = null
		var SPEECH_OUTPUT = document.querySelector("#audio-speech-microphone .block-value")
		var SPEECH_INPUT = document.querySelector("#audio-speech-microphone .block-button")

		createSpeechRecognition()
		function createSpeechRecognition() {
			try {
				try {
					SPEECH_RECOGNITION = new (window.webkitSpeechRecognition || window.speechRecognition)()
						SPEECH_RECOGNITION.onstart = startSpeech
						SPEECH_RECOGNITION.onsoundend = stopSpeech
						SPEECH_RECOGNITION.onresult = detectSpeech
						SPEECH_RECOGNITION.onerror = function(error) {
							SPEECH_OUTPUT.innerHTML = error.message || error.error || "[not allowed]"
						}
				}
				catch (error) {
					SPEECH_OUTPUT.innerHTML = "[not supported]"
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
		var AUDIO_OUTPUT = document.querySelector("#audio-microphone .block-value")
		var AUDIO_AUDIO = document.querySelector("#audio-microphone audio")
		var AUDIO_INPUT = document.querySelector("#audio-microphone .block-button")
			AUDIO_INPUT.addEventListener(on.click, detectAudio)
		function detectAudio(event) {
			try {
				navigator.mediaDevices.getUserMedia({audio: true}).then(function(stream) {
					AUDIO_AUDIO.srcObject = stream
				}).catch(function(error) { AUDIO_OUTPUT.innerHTML = error.message || "[not allowed]" })
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* detectVideo */
		var VIDEO_OUTPUT = document.querySelector("#audio-video-camera-microphone .block-value")
		var VIDEO_VIDEO = document.querySelector("#audio-video-camera-microphone video")
		var VIDEO_INPUT = document.querySelector("#audio-video-camera-microphone .block-button")
			VIDEO_INPUT.addEventListener(on.click, detectVideo)
		function detectVideo(event) {
			try {
				navigator.mediaDevices.getUserMedia({video: true}).then(function(stream) {
					VIDEO_VIDEO.srcObject = stream
				}).catch(function(error) { VIDEO_OUTPUT.innerHTML = error.message || "[not allowed]" })
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* detectBarcodeDetector */
		var BARCODE_DETECTOR_OUTPUT = document.querySelector("#video-camera-barcode-detector .block-value")
		detectBarcodeDetector()
		function detectBarcodeDetector() {
			try {
				if (!window.BarcodeDetector) {
					BARCODE_DETECTOR_OUTPUT.innerHTML = "[none]"
				}
				else {
					window.BarcodeDetector.getSupportedFormats().then(function(formats) {
						BARCODE_DETECTOR_OUTPUT.innerHTML = formats.join(", ") || "[none]"
					}).catch(function(error) {
						BARCODE_DETECTOR_OUTPUT.innerHTML = "[none]"
					})
				}
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* detectPitch */
		var PITCH_DETECTION = null
		var PITCH_LISTENING = false
		var PITCH_OUTPUT = document.querySelector("#audio-pitch-microphone .block-value")
		var PITCH_INPUT = document.querySelector("#audio-pitch-microphone .block-button")
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
				}).catch(function(error) { PITCH_OUTPUT.innerHTML = error.message || "[not allowed]" })
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
						PITCH_OUTPUT.innerHTML = wrapText(frequency.toFixed(4)) + " Hz<br>"
				}
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* midi */
		var MIDI = null
		var MIDI_OUTPUT = document.querySelector("#audio-midi .block-value")
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
					MIDI_OUTPUT.innerHTML = "[not supported]"
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
					MIDI_OUTPUT.innerHTML = event.port.name + "<br>" + 
											event.port.manufacturer + "<br>" + 
											event.port.state + "<br><br>" +
											Object.keys(MIDI.controllers).join(", ") + "<br>"
											Object.keys(MIDI.consumers).join(", ")
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* midi data */
		var MIDI_DATA_OUTPUT = document.querySelector("#audio-midi-data .block-value")
		function detectMidiData(event) {
			try {
				MIDI_DATA_OUTPUT.innerHTML = event.data
			} catch (error) { handleError(arguments.callee.name, error) }
		}

/*** prompt ***/
	/* detectAlert */
		var ALERT_OUTPUT = document.querySelector("#javascript-alert .block-value")
		var ALERT_INPUT = document.querySelector("#javascript-alert .block-button")
			ALERT_INPUT.addEventListener(on.click, detectAlert)
		function detectAlert(event) {
			try {
				ALERT_OUTPUT.innerHTML = window.alert("alert!") || "!"
				setTimeout(function() {
					ALERT_OUTPUT.innerHTML = ""
				}, 1000)
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* detectPrompt */
		var PROMPT_OUTPUT = document.querySelector("#javascript-prompt .block-value")
		var PROMPT_INPUT = document.querySelector("#javascript-prompt .block-button")
			PROMPT_INPUT.addEventListener(on.click, detectPrompt)
		function detectPrompt(event) {
			try {
				PROMPT_OUTPUT.innerHTML = window.prompt("prompt:")
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* detectConfirm */
		var CONFIRM_OUTPUT = document.querySelector("#javascript-confirm .block-value")
		var CONFIRM_INPUT = document.querySelector("#javascript-confirm .block-button")
			CONFIRM_INPUT.addEventListener(on.click, detectConfirm)
		function detectConfirm(event) {
			try {
				CONFIRM_OUTPUT.innerHTML = window.confirm("confirm?") ? "true" : "false"
			} catch (error) { handleError(arguments.callee.name, error) }
		}

/*** form field inputs ***/
	/* detectButton */
		var BUTTON_TIMEOUT = null
		var BUTTON_OUTPUT = document.querySelector("#input-button .block-value")
		var BUTTON_INPUT = document.querySelector("#input-button .block-button")
			BUTTON_INPUT.addEventListener("click", detectButtonInput)
		function detectButtonInput(event) {
			try {
				clearInterval(BUTTON_TIMEOUT)
				BUTTON_OUTPUT.innerHTML = "!"
				BUTTON_TIMEOUT = setTimeout(function() {
					BUTTON_OUTPUT.innerHTML = ""
				}, 1000)
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* detectTextInput */
		var TEXT_OUTPUT = document.querySelector("#input-text .block-value")
		var TEXT_INPUT = document.querySelector("#input-text .block-input")
			TEXT_INPUT.addEventListener("input", detectTextInput)
		function detectTextInput(event) {
			try {
				TEXT_OUTPUT.innerHTML = TEXT_INPUT.value
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* detectPasswordInput */
		var PASSWORD_OUTPUT = document.querySelector("#input-password .block-value")
		var PASSWORD_INPUT = document.querySelector("#input-password .block-input")
			PASSWORD_INPUT.addEventListener("input", detectPasswordInput)
		function detectPasswordInput(event) {
			try {
				PASSWORD_OUTPUT.innerHTML = PASSWORD_INPUT.value
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* detectNumberInput */
		var NUMBER_OUTPUT = document.querySelector("#input-number .block-value")
		var NUMBER_INPUT = document.querySelector("#input-number .block-input")
			NUMBER_INPUT.addEventListener("input", detectNumberInput)
		function detectNumberInput(event) {
			try {
				NUMBER_OUTPUT.innerHTML = NUMBER_INPUT.value
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* detectTimeInput */
		var TIME_OUTPUT = document.querySelector("#input-time .block-value")
		var TIME_INPUT = document.querySelector("#input-time .block-input")
			TIME_INPUT.addEventListener("input", detectTimeInput)
		function detectTimeInput(event) {
			try {
				TIME_OUTPUT.innerHTML = TIME_INPUT.value
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* detectDateInput */
		var DATE_OUTPUT = document.querySelector("#input-date .block-value")
		var DATE_INPUT = document.querySelector("#input-date .block-input")
			DATE_INPUT.addEventListener("input", detectDateInput)
		function detectDateInput(event) {
			try {
				DATE_OUTPUT.innerHTML = DATE_INPUT.value
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* detectWeekInput */
		var WEEK_OUTPUT = document.querySelector("#input-week .block-value")
		var WEEK_INPUT = document.querySelector("#input-week .block-input")
			WEEK_INPUT.addEventListener("input", detectWeekInput)
		function detectWeekInput(event) {
			try {
				WEEK_OUTPUT.innerHTML = WEEK_INPUT.value
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* detectMonthInput */
		var MONTH_OUTPUT = document.querySelector("#input-month .block-value")
		var MONTH_INPUT = document.querySelector("#input-month .block-input")
			MONTH_INPUT.addEventListener("input", detectMonthInput)
		function detectMonthInput(event) {
			try {
				MONTH_OUTPUT.innerHTML = MONTH_INPUT.value
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* detectDateTimeInput */
		var DATETIME_OUTPUT = document.querySelector("#input-datetime .block-value")
		var DATETIME_INPUT = document.querySelector("#input-datetime .block-input")
			DATETIME_INPUT.addEventListener("input", detectDateTimeInput)
		function detectDateTimeInput(event) {
			try {
				DATETIME_OUTPUT.innerHTML = DATETIME_INPUT.value
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* detectColorInput */
		var COLOR_OUTPUT = document.querySelector("#input-color .block-value")
		var COLOR_INPUT = document.querySelector("#input-color .block-button")
			COLOR_INPUT.addEventListener("input", detectColorInput)
		function detectColorInput(event) {
			try {
				COLOR_OUTPUT.innerHTML = COLOR_INPUT.value
			} catch (error) { handleError(arguments.callee.name, error) }
		}

/*** form special inputs ***/
	/* detectTextareaInput */
		var TEXTAREA_OUTPUT = document.querySelector("#input-textarea .block-value")
		var TEXTAREA_INPUT = document.querySelector("#input-textarea .block-input")
			TEXTAREA_INPUT.addEventListener("input", detectTextareaInput)
		function detectTextareaInput(event) {
			try {
				TEXTAREA_OUTPUT.innerHTML = TEXTAREA_INPUT.value
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* detectSelectInput */
		var SELECT_OUTPUT = document.querySelector("#input-select .block-value")
		var SELECT_INPUT = document.querySelector("#input-select .block-select")
			SELECT_INPUT.addEventListener("input", detectSelectInput)
		function detectSelectInput(event) {
			try {
				SELECT_OUTPUT.innerHTML = SELECT_INPUT.value
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* detectMultiselectInput */
		var MULTISELECT_OUTPUT = document.querySelector("#input-multiselect .block-value")
		var MULTISELECT_INPUT = document.querySelector("#input-multiselect .block-select")
			MULTISELECT_INPUT.addEventListener("input", detectMultiselectInput)
		function detectMultiselectInput(event) {
			try {
				var selected = document.querySelectorAll("#input-multiselect .block-select option:checked")
				MULTISELECT_OUTPUT.innerHTML = Array.from(selected).map(function(element) { return element.value })
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* detectRadioInput */
		var RADIO_OUTPUT = document.querySelector("#input-radio .block-value")
		var RADIO_INPUTS = document.querySelectorAll("#input-radio .block-radio")
			RADIO_INPUTS.forEach(function(element) { element.addEventListener("input", detectRadioInput) })
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
		var CHECKBOX_OUTPUT = document.querySelector("#input-checkbox .block-value")
		var CHECKBOX_INPUT = document.querySelector("#input-checkbox .block-checkbox")
			CHECKBOX_INPUT.addEventListener("input", detectCheckboxInput)
		detectCheckboxInput()
		function detectCheckboxInput(event) {
			try {
				CHECKBOX_OUTPUT.innerHTML = CHECKBOX_INPUT.checked ? "checked" : "unchecked"
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* detectRangeInput */
		var RANGE_OUTPUT = document.querySelector("#input-range .block-value")
		var RANGE_INPUT = document.querySelector("#input-range .block-input")
			RANGE_INPUT.addEventListener("input", detectRangeInput)
		function detectRangeInput(event) {
			try {
				RANGE_OUTPUT.innerHTML = RANGE_INPUT.value
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* detectFileInput */
		var FILE_OUTPUT = document.querySelector("#input-file .block-value")
		var FILE_BUTTON_INPUT = document.querySelector("#input-file .block-button")
		var FILE_INPUT = document.querySelector("#input-file .block-input-hidden")
			FILE_INPUT.addEventListener("input", detectFileInput)
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

	/* detectContenteditable */
		var CONTENTEDITABLE_OUTPUT = document.querySelector("#input-contenteditable .block-value")
		var CONTENTEDITABLE_INPUT = document.querySelector("#input-contenteditable .block-label")
			CONTENTEDITABLE_INPUT.addEventListener("keydown", detectContenteditable)
			CONTENTEDITABLE_INPUT.addEventListener("keyup", detectContenteditable)
		function detectContenteditable(event) {
			try {
				CONTENTEDITABLE_OUTPUT.innerHTML = CONTENTEDITABLE_INPUT.innerHTML
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* detectDetailsToggle */
		var DETAILSTOGGLE_OUTPUT = document.querySelector("#input-summary-details-toggle .block-value")
		var DETAILSTOGGLE_INPUT = document.querySelector("#input-summary-details-toggle .block-label details")
			DETAILSTOGGLE_INPUT.addEventListener("toggle", detectDetailsToggle)
			detectDetailsToggle()
		function detectDetailsToggle(event) {
			try {
				DETAILSTOGGLE_OUTPUT.innerHTML = DETAILSTOGGLE_INPUT.open ? "open" : "closed"
			} catch (error) { handleError(arguments.callee.name, error) }
		}

/*** form inputs with validation ***/
	/* detectEmailInput */
		var EMAIL_OUTPUT = document.querySelector("#input-email .block-value")
		var EMAIL_SUBMIT = document.querySelector("#input-email .block-input-hidden")
		var EMAIL_INPUT = document.querySelector("#input-email .block-input")
			EMAIL_INPUT.addEventListener("input", detectEmailInput)
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
		var TELEPHONE_OUTPUT = document.querySelector("#input-telephone .block-value")
		var TELEPHONE_SUBMIT = document.querySelector("#input-telephone .block-input-hidden")
		var TELEPHONE_INPUT = document.querySelector("#input-telephone .block-input")
			TELEPHONE_INPUT.addEventListener("input", detectTelephoneInput)
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
		var URL_OUTPUT = document.querySelector("#input-url .block-value")
		var URL_SUBMIT = document.querySelector("#input-url .block-input-hidden")
		var URL_INPUT = document.querySelector("#input-url .block-input")
			URL_INPUT.addEventListener("input", detectURLInput)
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

/*** clipboard ***/
	/* detectSelection */
		window.addEventListener(on.mouseup, detectSelection)
		var SELECTION_OUTPUT = document.querySelector("#clipboard-copy-selection .block-value")
		function detectSelection(event) {
			try {
				SELECTION_OUTPUT.innerHTML = window.getSelection().toString() || ""
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* detectCopyText */
		var COPY_TEXT_OUTPUT = document.querySelector("#clipboard-copy-text .block-value")
		var COPY_TEXT_BUTTON = document.querySelector("#clipboard-copy-text .block-button")
		COPY_TEXT_BUTTON.addEventListener("click", detectCopyText)
		function detectCopyText(event) {
			try {
				var random = String(Math.random())
				navigator.clipboard.writeText(random).then(function() {
					COPY_TEXT_OUTPUT.innerHTML = random + "\ncopied to clipboard"
				}).catch(function(error) {
					handleError("detectCopyText", error)
				})
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* detectCopyImage */
		var COPY_IMAGE_OUTPUT = document.querySelector("#clipboard-copy-image .block-value")
		var COPY_IMAGE_BUTTON = document.querySelector("#clipboard-copy-image .block-button")
		COPY_IMAGE_BUTTON.addEventListener("click", detectCopyImage)
		async function detectCopyImage(event) {
			try {
				var imageURL = "https://jamesmayr.com/resources/j.png"
				var imageData = await fetch(imageURL)
				var blob = await imageData.blob()

				try {
					navigator.clipboard.write(
						[new ClipboardItem({[blob.type]: blob})]
					).then(function() {
						COPY_IMAGE_OUTPUT.innerHTML = "j-logo copied to clipboard"
					}).catch(function(error) {
						handleError("detectCopyImage", error)
					})
				} catch (error) {
					var wrapper = document.createElement("div")
						wrapper.contentEditable = "true"
					document.body.appendChild(wrapper)

					var image = document.createElement("img")
						image.src = imageURL
					wrapper.appendChild(image)
					
					try {
						window.getSelection().selectAllChildren(wrapper)
						document.execCommand("copy")
						COPY_IMAGE_OUTPUT.innerHTML = "j-logo copied to clipboard"
						wrapper.remove()
					} catch (error) {
						wrapper.remove()
						handleError(arguments.callee.name, error)
					}
				}
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* detectPaste */
		var PASTE_OUTPUT = document.querySelector("#clipboard-copy-paste .block-value")
		var PASTE_INPUT = document.querySelector("#clipboard-copy-paste .block-input")
		PASTE_INPUT.addEventListener("paste", detectPaste)
		function detectPaste(event) {
			try {
				PASTE_OUTPUT.innerHTML = (event.clipboardData || window.clipboardData).getData("text")
				event.preventDefault()
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* detectPrint */
		var PRINT_BUTTON = document.querySelector("#print-screen .block-button")
		PRINT_BUTTON.addEventListener(on.click, displayPrint)
		function displayPrint(event) {
			try {
				window.print()
			} catch (error) { handleError(arguments.callee.name, error) }
		}

/*** math ***/
	/* detectRandom */
		var RANDOM_OUTPUT = document.querySelector("#math-random .block-value")
		var RANDOM_INPUT = document.querySelector("#math-random .block-button")
			RANDOM_INPUT.addEventListener(on.click, detectRandom)
		function detectRandom(event) {
			try {
				RANDOM_OUTPUT.innerHTML = Math.random()
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* detectPi */
		var PI_OUTPUT = document.querySelector("#math-pi .block-value")
		detectPi()
		function detectPi(event) {
			try {
				PI_OUTPUT.innerHTML = Math.PI
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* detectE */
		var E_OUTPUT = document.querySelector("#math-e .block-value")
		detectE()
		function detectE(event) {
			try {
				E_OUTPUT.innerHTML = Math.E
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* detectMaxSafeInteger */
		var MAX_SAFE_INTEGER_OUTPUT = document.querySelector("#math-max-safe-integer .block-value")
		detectMaxSafeInteger()
		function detectMaxSafeInteger(event) {
			try {
				MAX_SAFE_INTEGER_OUTPUT.innerHTML = Number.MAX_SAFE_INTEGER
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* detectInfinity */
		var INFINITY_OUTPUT = document.querySelector("#math-infinity .block-value")
		detectInfinity()
		function detectInfinity(event) {
			try {
				// max value
					if (Number.MAX_VALUE) {
						INFINITY_OUTPUT.innerHTML = Number.MAX_VALUE
						return
					}

				// increment
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

/*** css ***/
	/* light/dark mode */
		var COLOR_SCHEME_OUTPUT = document.querySelector("#css-media-query-light-dark-color-scheme .block-value")
		detectColorScheme()
		function detectColorScheme() {
			try {
				if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
					COLOR_SCHEME_OUTPUT.innerHTML = "dark mode"
				}
				else {
					COLOR_SCHEME_OUTPUT.innerHTML = "light mode"
				}
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* monochrome mode */
		var MONOCHROME_OUTPUT = document.querySelector("#css-media-query-monochrome-color .block-value")
		detectMonochrome()
		function detectMonochrome() {
			try {
				if (window.matchMedia("(monochrome)").matches) {
					MONOCHROME_OUTPUT.innerHTML = "monochrome mode"
				}
				else {
					MONOCHROME_OUTPUT.innerHTML = "color mode"
				}
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* inverted mode */
		var INVERTED_OUTPUT = document.querySelector("#css-media-query-inverted-color .block-value")
		detectInverted()
		function detectInverted() {
			try {
				if (window.matchMedia("(inverted-colors)").matches) {
					INVERTED_OUTPUT.innerHTML = "inverted colors"
				}
				else {
					INVERTED_OUTPUT.innerHTML = "normal colors"
				}
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* contrast mode */
		var CONTRAST_OUTPUT = document.querySelector("#css-media-query-contrast .block-value")
		detectContrast()
		function detectContrast() {
			try {
				if (window.matchMedia("(prefers-contrast: high)").matches) {
					CONTRAST_OUTPUT.innerHTML = "high contrast"
				}
				else if (window.matchMedia("(prefers-contrast: low)").matches) {
					CONTRAST_OUTPUT.innerHTML = "low contrast"
				}
				else {
					CONTRAST_OUTPUT.innerHTML = "normal contrast"
				}
			} catch (error) { handleError(arguments.callee.name, error) }
		}

	/* color word */
		var COLOR_WORD_INPUT = document.querySelector("#css-font-color-word .block-input")
		var COLOR_WORD_OUTPUT = document.querySelector("#css-font-color-word .block-value")
		COLOR_WORD_INPUT.addEventListener("input", detectColorWord)
		function detectColorWord() {
			try {
				COLOR_WORD_OUTPUT.style.color = "#dddddd"
				var colorWord = COLOR_WORD_INPUT.value.trim().toLowerCase()
				COLOR_WORD_OUTPUT.innerHTML = colorWord || ""
				if (colorWord) {
					COLOR_WORD_OUTPUT.style.color = colorWord
				}
			} catch (error) { handleError(arguments.callee.name, error) }
		}
