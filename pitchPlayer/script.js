function ready() {

	/* onload */
		setMeasures()
		makePlayer()

	/* setMeasures */
		document.getElementById("target").addEventListener("change", setMeasures)
		function setMeasures() {
			clearInterval(window.animateLoop)

			document.getElementById("pause").style.display = "none"
			document.getElementById("play").style.display = "inline-block"

			var staff = document.getElementById("staff")
			var spacer = document.getElementById("staff-spacer")
			var current = Number(document.getElementsByClassName("measure").length || 1)
			var target = Number(document.getElementById("target").value) || 16
				target = Math.max(target, 0)
				target = Math.min(target, 256)

			if (target - current > 0) {
				for (var m = current; m <= target; m++) {
					var measure = document.createElement("div")
						measure.className = "measure"
						measure.id = "measure-" + m

					for (var b = 1; b <= 4; b++) {
						var beat = document.createElement("div")
							beat.className = "beat beat-" + b
							beat.id = "measure-" + m + "-beat-" + b

						for (var p = 24; p >= 0; p--) {
							var pitch = document.createElement("div")
								pitch.className = "pitch pitch-" + p + " sound-off"
								pitch.id = "measure-" + m + "-beat-" + b + "-pitch-" + p
								pitch.addEventListener("click",function() {
									togglePitch(this)
								})

							beat.appendChild(pitch)
						}

						measure.appendChild(beat)
					}

					var number = document.createElement("div")
						number.className = "measure-number"
					var text = document.createTextNode(m)
						number.appendChild(text)
						measure.appendChild(number)

					staff.insertBefore(measure, spacer)
				}
			}
			else if (current - target > 0) {
				var staff = document.getElementById("staff")

				while (document.getElementsByClassName("measure").length > target) {
					staff.removeChild(staff.lastChild)
				}

				var spacer = document.createElement("div")
					spacer.id = "staff-spacer"

				staff.appendChild(spacer)
			}
		}

	/* togglePitch */
		function togglePitch(toggle) {
			var data = toggle.id.split("-")
				var beat = data[1]
				var pitch = data[3]

			if (toggle.className.indexOf("sound-on") == -1) {
				toggle.className = toggle.className.replace("sound-off", "sound-on")
			}
			else {
				toggle.className = toggle.className.replace("sound-on", "sound-off")
			}
		}

	/* resetPitches */
		document.getElementById("reset").addEventListener("click", resetPitches)
		function resetPitches() {
			clearInterval(window.animateLoop)
			window.music = []

			document.getElementById("pause").style.display = "none"
			document.getElementById("play").style.display = "inline-block"

			document.getElementById("staff").scrollLeft = 0

			var pitches = document.getElementsByClassName("sound-on")
				pitches = Array.prototype.slice.call(pitches)

			for (var p in pitches) {
				pitches[p].className = pitches[p].className.replace("sound-on", "sound-off")
			}
		}

	/* playMusic */
		document.getElementById("play").addEventListener("click", playMusic)
		function playMusic() {
			document.getElementById("play").style.display = "none"
			document.getElementById("pause").style.display = "inline-block"

			var tempo = Number(document.getElementById("tempo").value) || 120
				tempo = Math.max(tempo, 1)
				tempo = Math.min(tempo, 480)

			window.animateLoop = setInterval(function() {		
				var scrollLeft = document.getElementById("staff").scrollLeft
				var beat = Math.floor(scrollLeft / 16)
				var measure = Math.floor(beat / 4) + 1
					beat = (beat % 4) + 1

				if (scrollLeft < (64 * document.getElementsByClassName("measure").length) - 16) {
					document.getElementById("staff").scrollLeft += 16 + (-1 * (scrollLeft % 16))
				}
				else {
					document.getElementById("staff").scrollLeft = 0
				}

				var pitches = document.getElementById("measure-" + measure + "-beat-" + beat).getElementsByClassName("sound-on")
					pitches = Array.prototype.slice.call(pitches)

				for (var p in pitches) {
					var pitch = pitches[p].id.replace("measure-" + measure + "-beat-" + beat + "-pitch-", "")
					makeMusic(pitch)
				}
			}, 60 * 1000 / tempo)
		}

	/* pauseMusic */
		document.getElementById("pause").addEventListener("click", pauseMusic)
		function pauseMusic() {
			clearInterval(window.animateLoop)

			document.getElementById("pause").style.display = "none"
			document.getElementById("play").style.display = "inline-block"
		}

	/* stopMusic */
		document.getElementById("stop").addEventListener("click", stopMusic)
		function stopMusic() {
			clearInterval(window.animateLoop)

			document.getElementById("pause").style.display = "none"
			document.getElementById("play").style.display = "inline-block"

			document.getElementById("staff").scrollLeft = 0
		}

	/* scrollLeft */
		document.getElementById("scroll-left").addEventListener("mousedown", scrollLeft)
		function scrollLeft() {
			clearInterval(window.animateLoop)

			document.getElementById("pause").style.display = "none"
			document.getElementById("play").style.display = "inline-block"

			window.animateLoop = setInterval(function() {
				document.getElementById("staff").scrollLeft -= 16 + (document.getElementById("staff").scrollLeft % 16)
			}, 50)
		}

	/* scrollRight */
		document.getElementById("scroll-right").addEventListener("mousedown", scrollRight)
		function scrollRight() {
			clearInterval(window.animateLoop)

			document.getElementById("pause").style.display = "none"
			document.getElementById("play").style.display = "inline-block"

			window.animateLoop = setInterval(function() {
				document.getElementById("staff").scrollLeft += 16 + (-1 * (document.getElementById("staff").scrollLeft % 16))
			}, 50)
		}

	/* stopScroll */
		document.getElementById("scroll-left").addEventListener("mouseup", stopScroll)
		document.getElementById("scroll-right").addEventListener("mouseup", stopScroll)
		function stopScroll() {
			clearInterval(window.animateLoop)
		}

	/* changeVolume */
		document.getElementById("volume").addEventListener("change", changeVolume)
		function changeVolume() {
			var volume = Number(document.getElementById("volume").value) || 50
				volume = Math.min(volume, 100)
				volume = Math.max(volume, 0)
			window.gain.gain.value = volume / 100
		}

	/* getFrequency */
		function getFrequency(pitch) {
			pitch = Number(pitch) || 0
			pitch = Math.min(pitch, 24)
			pitch = Math.max(pitch, 0)

			switch (pitch) {
				case 0: 			// C3
					return 130.81
				break
				case 1: 			// C#3 / Db3
					return 138.59
				break
				case 2: 			// D3
					return 146.83
				break
				case 3: 			// D#3 / Eb3
					return 155.56
				break
				case 4: 			// E3
					return 164.81
				break
				case 5: 			// F3
					return 174.61
				break
				case 6: 			// F#3 / Gb3
					return 185.00
				break
				case 7: 			// G
					return 196.00
				break
				case 8: 			// G#3 / Ab3
					return 207.65
				break
				case 9: 			// A3
					return 220.00
				break
				case 10: 			// A#3 / Bb3
					return 233.08
				break
				case 11: 			// B3
					return 246.94
				break
				case 12: 			// C4
					return 261.63
				break
				case 13: 			// C#4 / Db4
					return 277.18
				break
				case 14: 			// D4
					return 293.67
				break
				case 15: 			// D#4 / Eb4
					return 311.13
				break
				case 16: 			// E4
					return 329.63
				break
				case 17: 			// F4
					return 349.23
				break
				case 18: 			// F#4 / Gb4
					return 369.99
				break
				case 19: 			// G4
					return 392.00
				break
				case 20: 			// G#4 / Ab4
					return 415.30
				break
				case 21: 			// A4
					return 440.00
				break
				case 22: 			// A#4 / Bb4
					return 466.16
				break
				case 23: 			// B4
					return 493.88
				break
				case 24: 			// C5
					return 523.25
				break
				default:
					return false
			}
		}

	/* makePlayer */
		function makePlayer() {
			window.audio = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext)()
			window.gain = window.audio.createGain()
				window.gain.connect(audio.destination)

			changeVolume()
		}

	/* makeMusic */
		function makeMusic(pitch) {
			var tempo = Number(document.getElementById("tempo").value) || 120
				tempo = Math.max(tempo, 1)
				tempo = Math.min(tempo, 480)
			var wave = document.getElementById("wave").value || "sine"
			var frequency = getFrequency(pitch) || null

			var oscillator = window.audio.createOscillator()
				oscillator.frequency.value = frequency
				oscillator.type = wave
				oscillator.connect(window.gain)

			oscillator.start(0)
			oscillator.stop(window.audio.currentTime + (60 / tempo))
		}

}