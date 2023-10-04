/* audio */
	/* triggers */
		if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
			var on = { click: "touchstart", mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" }
		}
		else {
			var on = { click:      "click", mousedown:  "mousedown", mousemove: "mousemove", mouseup:  "mouseup" }
		}

	/* globals */
		var audio = null
		var gain = null
		var tone = null

	/* createAudio */
		function createAudio() {
			audio = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext)()
			gain = audio.createGain()
			gain.connect(audio.destination)
			gain.gain.value = 0.25
		}

	/* playTone */
		function playTone(frequency, duration) {
			var frequency = Number(frequency)

			if (tone) {
				tone.stop(0)
				tone = null
			}

			tone = audio.createOscillator()
			tone.frequency.value = frequency

			tone.connect(gain)
			tone.start(0)
			tone.stop(audio.currentTime + (duration / 1000))
		}

/* game */
	/* globals */
		var sequence = null
		var attempt = null
		var delay = null

		var game = document.getElementById("game")
		var score = document.getElementById("score-inner")
		var colors = ["red", "yellow", "green", "cyan", "blue", "magenta"]

	/* startGame */
		document.getElementById("restart").addEventListener(on.click, startGame)
		function startGame() {
			// create audio
				if (!audio) {
					createAudio()
				}

			// sound effects
				var startSequence = [220.00, 277.18, 246.94, 329.63, 277.18, 369.99, 329.63, 369.99, 440.00]
				var startLoop = setInterval(function() {
					if (startSequence.length > 1) {
						playTone(startSequence[0], 100)
						startSequence.shift()
					}
					else {
						playTone(startSequence[0], 500)
						clearInterval(startLoop)
					}
				}, 100)

			// game
				document.getElementById("restart").className = "hidden"
				score.innerText = ""

				sequence = []
				attempt = []
				delay = 1000

				generateSequence()
		}

	/* endGame */
		function endGame() {
			// game
				game.className = "end"
				document.getElementById("restart").className = "shown"

			// sound effects
				setTimeout(function() {
					var endSequence = [440.00, 329.63, 369.99, 277.18, 329.63, 246.94, 277.18, 246.94, 220.00]
					var endLoop = setInterval(function() {
						if (endSequence.length > 1) {
							playTone(endSequence[0], 100)
							endSequence.shift()
						}
						else {
							playTone(endSequence[0], 500)
							clearInterval(endLoop)
						}
					}, 100)
				}, delay)
		}

/* sequence */
	/* generateSequence */
		function generateSequence() {
			do {
				var color = colors[Math.floor(Math.random() * colors.length)]
			} while (sequence.length && color == sequence[sequence.length - 1])
			sequence.push(color)

			displaySequence()
			delay = Math.max(250, delay - 50)
		}

	/* displaySequence */
		function displaySequence() {
			var s = -1
			var displayLoop = setInterval(function() {
				if (s == -1) {
					game.className = "ai"
					score.innerText = sequence.length
					s++
				}
				else if (s < sequence.length) {
					activateWedge(sequence[s])
					s++
				}
				else if (s == sequence.length) {
					attempt = []
					s++
				}
				else {
					game.className = "play"
					clearInterval(displayLoop)
				}
			}, delay)
		}

/* wedge */
	/* activateWedge */
		function activateWedge(color) {
			var wedge = document.getElementById(color)
				wedge.className = "wedge active"

			playTone(wedge.getAttribute("value"), delay)

			setTimeout(function() {
				wedge.className = "wedge inactive"
			}, delay)
		}

	/* triggerWedge */
		Array.from(document.getElementsByClassName("wedge")).forEach(function(w) {
			w.addEventListener(on.click, triggerWedge)
		})
		function triggerWedge(event) {
			if (event.target.className == "wedge inactive" && game.className == "play") {
				var color = event.target.id
				activateWedge(color)

				if (sequence[attempt.length] !== color) {
					endGame()
				}
				else {
					attempt.push(color)

					if (attempt.length == sequence.length) {
						generateSequence()
					}
				}
			}
		}
