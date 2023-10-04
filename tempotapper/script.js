/*** globals ***/
	/* constants */
		var CONSTANTS = {
			expiration: 3 * 1000,
			msPerSecond: 1000,
			history: 10,
			secondsPerMinute: 60,
			units: " bpm",
			helperText: "tap the beat"
		}

	/* triggers */
		var TRIGGERS = {
			click: "click",
			keydown: "keydown"
		}

	/* elements */
		var ELEMENTS = {
			body: document.body,
			detect: document.querySelector("#detect"),
			display: document.querySelector("#display")
		}

	/* history */
		var HISTORY = []
		var TIMEOUT = null

/*** interaction ***/
	/* detectTap */
		ELEMENTS.detect.addEventListener(TRIGGERS.click, detectTap)
		window.addEventListener(TRIGGERS.keydown, detectTap)
		function detectTap(event) {
			try {
				console.log(HISTORY)
				// this tap
					var tap = new Date().getTime()

				// no history?
					if (!HISTORY.length) {
						clearHistory(tap)
						HISTORY.push(tap)
						return
					}

				// expired history
					if (tap - HISTORY[HISTORY.length - 1] > CONSTANTS.expiration) {
						clearHistory(tap)
						HISTORY.push(tap)
						return
					}

				// existing history
					HISTORY.push(tap)
					resetTimeout(tap)

					while (HISTORY.length > CONSTANTS.history) {
						HISTORY.shift()
					}

				// calculate bpm
					var frequency = getFrequency(getAverage(getIntervals(HISTORY)))
					ELEMENTS.display.innerText = frequency.toFixed(0) + CONSTANTS.units
			}
			catch (error) {console.log(error)}
		}

	/* clearHistory */
		function clearHistory(tap) {
			try {
				// empty array
					HISTORY = []

				// reset timeout
					if (tap) {
						resetTimeout(tap)
						return
					}

				// expiration --> clear
					ELEMENTS.display.innerText = CONSTANTS.helperText
			}
			catch (error) {console.log(error)}
		}

	/* resetTimeout */
		function resetTimeout(tap) {
			try {
				// clear existing timeout
					if (TIMEOUT) {
						clearTimeout(TIMEOUT)
						TIMEOUT = null
					}

				// set timeout to clear history
					TIMEOUT = setTimeout(function() {
						clearHistory()
					}, CONSTANTS.expiration)
			}
			catch (error) {console.log(error)}
		}

/*** math ***/
	/* getIntervals */
		function getIntervals(timestamps) {
			try {
				// no array?
					if (!timestamps || typeof timestamps !== "object" || !Array.isArray(timestamps) || timestamps.length < 2) {
						return null
					}

				// get intervals
					var intervals = []
					for (var i = 1; i < timestamps.length; i++) {
						intervals.push(Math.abs(timestamps[i] - timestamps[i - 1]))
					}

				// return
					return intervals
			}
			catch (error) {console.log(error)}
		}

	/* getAverage */
		function getAverage(intervals) {
			try {
				// no array?
					if (!intervals || typeof intervals !== "object" || !Array.isArray(intervals) || !intervals.length) {
						return null
					}

				// get sum
					var sum = 0
					for (var i in intervals) {
						sum += intervals[i]
					}

				// divide by count
					return sum / intervals.length
			}
			catch (error) {console.log(error)}
		}

	/* getFrequency */
		function getFrequency(period) {
			try {
				// not a number
					if (!period || isNaN(period)) {
						return null
					}

				// period: ms --> s --> m
					period = period / CONSTANTS.msPerSecond / CONSTANTS.secondsPerMinute

				// frequency
					return 1 / period
			}
			catch (error) {console.log(error)}
		}
