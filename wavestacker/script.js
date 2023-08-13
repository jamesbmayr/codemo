window.onload = function() {

	/*** build page ***/
		/* onload */
			window.CLICKED = false
			loadData()
			window.absoluteScroll = 4000

		/* createAudio */
			document.getElementById("launch").addEventListener("click", createAudio)
			function createAudio() {
				window.CLICKED = true
				document.getElementById("launch").remove()

				audioContext = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContent || window.msAudioContext || window.oAudioContext)()
			
				masterGain = audioContext.createGain()
				masterGain.gain.value = 0
				masterGain.connect(audioContext.destination)

				oscillators = {}
				gains = {}

				createWaves()
				createKeys()
			}

		/* createWaves */
			function createWaves() {
				for (var i = 0; i < 8; i++) {
					createWave(i)
				}
			}

		/* createWave */
			function createWave(i) {
				//data
					var type = shapes[Math.floor(Math.random() * shapes.length)]
					var note = notes[Math.floor(Math.random() * 12)].pitch
					var octave = Math.floor(Math.random() * 5) + 2
					var frequency = note * Math.pow(2, octave)

				//container
					var waves = document.getElementById("waves")
					var wave = document.createElement("div")
						wave.id = "wave-" + i
						wave.className = "wave"

				//slider
					var outer = document.createElement("div")
						outer.className = "frequency"
						outer.id = "wave-" + i + "-frequency"
						outer.addEventListener("scroll", adjustFrequency)
						wave.appendChild(outer)

					var inner = document.createElement("div")
						inner.className = "frequency-inner"
						outer.appendChild(inner)
						setTimeout(function() {
							outer.scrollTop = (getExponent(frequency) * -1) + 4000
						},0)

				//controls
					var toggle = document.createElement("button")
						toggle.id = "wave-" + i + "-toggle"
						toggle.className = "toggle on"
						toggle.addEventListener("click", toggleWave)
						wave.appendChild(toggle)

					var shape = document.createElement("select")
						shape.className = "shape"
						shape.id = "wave-" + i + "-shape"
						shape.addEventListener("change", adjustShape)
						for (var s in shapes) {
							var option = document.createElement("option")
								option.value = shapes[s]
								option.textContent = shapes[s]
							if (shapes[s] == type) { option.selected = true }
							shape.appendChild(option)
						}
						wave.appendChild(shape)

				//oscillator with gain
					gains[i] = audioContext.createGain()
					gains[i].connect(masterGain)

					oscillators[i] = audioContext.createOscillator()
					oscillators[i].connect(gains[i])
					oscillators[i].type = type || "sine"
					oscillators[i].frequency.value = getExponent(frequency)
					oscillators[i].start(0)

				//connect
					waves.appendChild(wave)
			}

		/* createKeys */
			function createKeys() {
				var keyboard = document.getElementById("keyboard")

				for (var i = 0; i < 18; i++) {
					var key = document.createElement("button")
						key.className = "key " + notes[i].color
						key.value = notes[i].keycode
						key.addEventListener("click", playKeys)

					keyboard.appendChild(key)
				}
			}

	/*** converters ***/
		/* getFrequency */
			function getFrequency(exponent) {
				var exponent = Number(exponent) / 1000
				var frequency = 440 * Math.pow(2, exponent)
				
				return frequency
			}

		/* getExponent */
			function getExponent(frequency) {
				var frequency = Number(frequency)
				var exponent = Math.log2(frequency / 440) * 1000

				return exponent
			}

		/* loadData */
			function loadData() {
				shapes = ["sine", "square", "triangle", "sawtooth"]
				notes = [
					{
						name: "C",
						keycode: 65,
						pitch: 16.35,
						color: "white"
					},
					{
						name: "C#",
						keycode: 87,
						pitch: 17.32,
						color: "black"
					},
					{
						name: "D",
						keycode: 83,
						pitch: 18.35,
						color: "white"
					},
					{
						name: "Eb",
						keycode: 69,
						pitch: 19.45,
						color: "black"
					},
					{
						name: "E",
						keycode: 68,
						pitch: 20.60,
						color: "white"
					},
					{
						name: "F",
						keycode: 70,
						pitch: 21.83,
						color: "white"
					},
					{
						name: "F#",
						keycode: 84,
						pitch: 23.12,
						color: "black"
					},
					{
						name: "G",
						keycode: 71,
						pitch: 24.50,
						color: "white"
					},
					{
						name: "Ab",
						keycode: 89,
						pitch: 25.96,
						color: "black"
					},
					{
						name: "A",
						keycode: 72,
						pitch: 27.50,
						color: "white"
					},
					{
						name: "Bb",
						keycode: 85,
						pitch: 29.14,
						color: "black"
					},
					{
						name: "B",
						keycode: 74,
						pitch: 30.87,
						color: "white"
					},
					{
						name: "C",
						keycode: 75,
						pitch: 32.70,
						color: "white"
					},
					{
						name: "C#",
						keycode: 79,
						pitch: 34.64,
						color: "black"
					},
					{
						name: "D",
						keycode: 76,
						pitch: 36.70,
						color: "white"
					},
					{
						name: "Eb",
						keycode: 80,
						pitch: 38.90,
						color: "black"
					},
					{
						name: "E",
						keycode: 186,
						pitch: 41.20,
						color: "white"
					},
					{
						name: "F",
						keycode: 222,
						pitch: 43.66,
						color: "white"
					}
				]
			}

	/*** global controls ***/
		/* playAll */
			document.getElementById("play-all").addEventListener("click", playAll)
			function playAll(event) {
				if (!window.CLICKED) { return }
				masterGain.gain.value = 0.5
				document.getElementById("play-all").className = "hidden"
				document.getElementById("stop-all").className = ""
			}

		/* stopAll */
			document.getElementById("stop-all").addEventListener("click", stopAll)
			function stopAll(event) {
				if (!window.CLICKED) { return }
				masterGain.gain.value = 0
				document.getElementById("stop-all").className = "hidden"
				document.getElementById("play-all").className = ""
			}

		/* playKeys */
			document.addEventListener("keydown", playKeys)
			function playKeys(event) {
				if (!window.CLICKED) { return }
				if (event.type == "click") {
					var note = notes.find(function(n) {
						return n.keycode == Number(event.target.value)
					}) || false
				}
				else if (event.type == "keydown") {
					var note = notes.find(function(n) {
						return n.keycode == event.which
					}) || false
				}

				if (note) {
					var frequency = note.pitch * 2 * 2 * 2 * 2
					var exponent = (getExponent(frequency) * -1) + 4000
					var delta = exponent - window.absoluteScroll
					window.absoluteScroll = exponent
					
					var ranges = Array.prototype.slice.call(document.getElementsByClassName("frequency"))
					for (var r in ranges) {
						ranges[r].scrollTop = Number(ranges[r].scrollTop) + delta
					}

					if (typeof gainTimeout !== "undefined") {
						clearTimeout(gainTimeout)
					}

					masterGain.gain.value = 0.5
					if (document.getElementById("play-all").className == "") {
						gainTimeout = setTimeout(function() {
							masterGain.gain.value = 0
						}, 500)
					}
				}
			}

	/*** individual controls ***/
		/* toggleWave */
			function toggleWave(event) {
				if (!window.CLICKED) { return }
				var button = event.target
				var waveID = Number(button.id.replace("wave-","").replace("-toggle",""))

				if (button.className.replace("toggle ", "") == "off") {
					button.className = "toggle on"
					gains[waveID].gain.value = 0.5
				}
				else if (button.className.replace("toggle ", "") == "on") {
					button.className = "toggle off"
					gains[waveID].gain.value = 0
				}
			}

		/* adjustShape */
			function adjustShape(event) {
				if (!window.CLICKED) { return }
				var select = event.target
				var waveID = Number(select.id.replace("wave-","").replace("-shape",""))

				if (oscillators[waveID]) {
					oscillators[waveID].type = select.value
				}	
			}

		/* adjustFrequency */
			function adjustFrequency(event) {
				if (!window.CLICKED) { return }
				var range = event.target
				var waveID = Number(range.id.replace("wave-","").replace("-frequency",""))

				if (oscillators[waveID]) {
					oscillators[waveID].frequency.value = getFrequency((range.scrollTop * -1) + 4000)
				}
			}

}