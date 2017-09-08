function ready() {

	/* onload */
		setMeasures()
		makePlayer()
		var clickdown = false

	/* setMeasures */
		document.getElementById("target").addEventListener("change", setMeasures)
		function setMeasures() {
			clearInterval(window.animateLoop)

			document.getElementById("pause").style.display = "none"
			document.getElementById("play").style.display = "inline-block"

			var staff = document.getElementById("staff")
			var spacer = document.getElementById("staff-spacer")
			var current = Number(document.getElementsByClassName("measure").length) || 0
			var target = Number(document.getElementById("target").value) || 0
				target = Math.max(target, 0)
				target = Math.min(target, 256)

			if (target - current > 0) {
				for (var m = Number(current) + 1; m <= target; m++) {
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
								pitch.addEventListener("mousedown", function() {
									togglePitch(this)
								})
								pitch.addEventListener("mouseenter", function() {
									if (clickdown) {
										togglePitch(this)
									}
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
				var pitch = data[5]

			if (toggle.className.indexOf("sound-on") == -1) {
				toggle.className = toggle.className.replace("sound-off", "sound-on")
				playNote(Number(pitch))
			}
			else {
				toggle.className = toggle.className.replace("sound-on", "sound-off")
			}
		}

	/* dragPitch */
		document.getElementById("staff").addEventListener("mousedown", function () { clickdown = true })
		document.addEventListener("mouseup", function () { clickdown = false })

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
				tempo = Math.min(tempo, 1000)

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
					playNote(pitch)
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
		document.addEventListener("mouseup", stopScroll)
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
					return [130.81,"C",0,3]
				break
				case 1: 			// C#3 / Db3
					return [138.59, "C", 1, 3]
				break
				case 2: 			// D3
					return [146.83, "D", 0, 3]
				break
				case 3: 			// D#3 / Eb3
					return [155.56, "E", -1, 3]
				break
				case 4: 			// E3
					return [164.81, "E", 0, 3]
				break
				case 5: 			// F3
					return [174.61, "F", 0, 3]
				break
				case 6: 			// F#3 / Gb3
					return [185.00, "F", 1, 3]
				break
				case 7: 			// G
					return [196.00, "G", 0, 3]
				break
				case 8: 			// G#3 / Ab3
					return [207.65, "A", -1, 3]
				break
				case 9: 			// A3
					return [220.00, "A", 0, 3]
				break
				case 10: 			// A#3 / Bb3
					return [233.08, "B", -1, 3]
				break
				case 11: 			// B3
					return [246.94, "B", 0, 3]
				break
				case 12: 			// C4
					return [261.63, "C", 0, 4]
				break
				case 13: 			// C#4 / Db4
					return [277.18, "C", 1, 4]
				break
				case 14: 			// D4
					return [293.67, "D", 0, 4]
				break
				case 15: 			// D#4 / Eb4
					return [311.13, "E", -1, 4]
				break
				case 16: 			// E4
					return [329.63, "E", 0, 4]
				break
				case 17: 			// F4
					return [349.23, "F", 0, 4]
				break
				case 18: 			// F#4 / Gb4
					return [369.99, "F", 1, 4]
				break
				case 19: 			// G4
					return [392.00, "G", 0, 4]
				break
				case 20: 			// G#4 / Ab4
					return [415.30, "A", -1, 4]
				break
				case 21: 			// A4
					return [440.00, "A", 0, 4]
				break
				case 22: 			// A#4 / Bb4
					return [466.16, "B", -1, 4]
				break
				case 23: 			// B4
					return [493.88, "B", 0, 4]
				break
				case 24: 			// C5
					return [523.25, "C", 0, 5]
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

	/* playNote */
		//listeners
			var keys = document.getElementsByClassName("key")
				keys = Array.prototype.slice.call(keys)
			for (var k in keys) {
				keys[k].addEventListener("click", function() {
					playNote(Number(this.getAttribute("value")))
				})
			}

		function playNote(pitch) {
			//sound
				var tempo = Number(document.getElementById("tempo").value) || 120
					tempo = Math.max(tempo, 1)
					tempo = Math.min(tempo, 1000)
				var wave = document.getElementById("wave").value || "triangle"
				var frequency = getFrequency(pitch)[0] || null

				var oscillator = window.audio.createOscillator()
					oscillator.frequency.value = frequency
					oscillator.type = wave
					oscillator.connect(window.gain)

				oscillator.start(0)
				oscillator.stop(window.audio.currentTime + (60 / tempo))

			//visual
				var keys = document.querySelectorAll(".key[value='" + pitch + "']")
					keys = Array.prototype.slice.call(keys)
				var leftKey = keys[0]				
				var rightKey = keys[1]
					leftKey.className = leftKey.className.replace("key-inactive", "key-active")
					rightKey.className = rightKey.className.replace("key-inactive", "key-active")

				setTimeout(function() {
					leftKey.className = leftKey.className.replace("key-active", "key-inactive")
					rightKey.className = rightKey.className.replace("key-active", "key-inactive")
				}, 60 * 1000 / 1000 * (3 / 4))
		}

	/* downloadScore */
		document.getElementById("download").addEventListener("click", downloadScore)
		function downloadScore() {			
			//build musicXML
				var musicXML = ""
					musicXML += '<?xml version="1.0" standalone="no"?><!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd"><score-partwise><part-list><score-part id="P1"><part-name>Synth</part-name></score-part></part-list><part id="P1">'

				var tempo = document.getElementById("tempo").value || 120
				var measures = document.getElementsByClassName("measure")
					measures = Array.prototype.slice.call(measures)
				for (var m in measures) {

					if (m == 0) {
						musicXML += '<measure number="1"><attributes><divisions>4</divisions><key><fifths>0</fifths><mode>major</mode></key><staves>1</staves><clef><sign>G</sign><line>2</line></clef><sound tempo="' + tempo + '"/></attributes>'
					}
					else {
						musicXML += '<measure number="' + (Number(m) + 1) + '">'
					}

					var beats = measures[m].children
						beats = Array.prototype.slice.call(beats)
					for (var b = 0; b < beats.length - 1; b++) {
						
						var pitches = beats[b].getElementsByClassName("sound-on")
							pitches = Array.prototype.slice.call(pitches)
						if (pitches.length > 0) {
							for (var p in pitches) {
								var data = pitches[p].id.split("-")
									var pitch = data[5]
									var array = getFrequency(pitch)

								if (p > 0) {
									musicXML += '<note><chord/>'
								}
								else {
									musicXML += '<note>'
								}
								
								musicXML += '<pitch><step>' + array[1] + '</step><alter>' + array[2] + '</alter><octave>' + array[3] + '</octave></pitch><duration>1</duration><voice>1</voice><type>quarter</type><stem>up</stem><staff>1</staff></note>'
							}
						}
						else {
							musicXML += '<note><rest /><duration>1</duration><voice>1</voice><type>quarter</type><staff>1</staff></note>'
						}
					}

					musicXML += '</measure>'
				}

				musicXML += '</part></score-partwise>'

			//download sequence
				musicXML = "text/xml;charset=utf-8," + encodeURIComponent(musicXML)

				var time = new Date().getTime()
				var downloadLink = document.createElement("a")
					downloadLink.id = "download-link"
					downloadLink.setAttribute("href", "data:" + musicXML)
					downloadLink.setAttribute("download", "pitchPlayer_" + time + ".xml")

				downloadLink.addEventListener("click", function() {
					var downloadLink = document.getElementById("download-link")
					document.body.removeChild(downloadLink)
				})
				
				document.body.appendChild(downloadLink)
				document.getElementById("download-link").click()
		}

	/* uploadScore */
		document.getElementById("upload").addEventListener("change", function(event) {
			var uploader = document.getElementById("upload")

			if (upload.value && upload.value.length) {
				var reader = new FileReader()
					reader.readAsText(event.target.files[0])
				reader.onload = function(event) {
					var xml = String(event.target.result)
					mapNotes(xml)
				}
			}
		})

	/* mapNotes */
		function mapNotes(xml) {
			//stop everything
				clearInterval(window.animateLoop)

				document.getElementById("pause").style.display = "none"
				document.getElementById("play").style.display = "inline-block"

			//clear everything
				var staff = document.getElementById("staff")
				while (document.getElementsByClassName("measure").length) {
					staff.removeChild(staff.lastChild)
				}
				var spacer = document.createElement("div")
					spacer.id = "staff-spacer"
				staff.appendChild(spacer)

			//parse xml
				var parser = new DOMParser()
				var data = parser.parseFromString(xml, "application/xml")
			
			//build staff
				var dataMeasures = data.getElementsByTagName("measure")
					dataMeasures = Array.prototype.slice.call(dataMeasures)
				var target = dataMeasures.length || 0
					target = Math.max(target, 0)
					target = Math.min(target, 256)
				document.getElementById("target").value = target
			
				for (var m = 1; m <= target; m++) {
					if (m == 1) {
						var sound = dataMeasures[m - 1].getElementsByTagName("sound")
							sound = Array.prototype.slice.call(sound)[0]
						try { document.getElementById("tempo").value = sound.getAttribute("tempo") } catch (error) {}
					}

					var measure = document.createElement("div")
						measure.className = "measure"
						measure.id = "measure-" + m

					var dataNotes = dataMeasures[m - 1].getElementsByTagName("note")
						dataNotes = Array.prototype.slice.call(dataNotes)
					var noteIndex = 0

					for (var b = 1; b <= 4; b++) {
						var beat = document.createElement("div")
							beat.className = "beat beat-" + b
							beat.id = "measure-" + m + "-beat-" + b

						var beatPitches = []

						if (dataNotes[noteIndex] && dataNotes[noteIndex].getElementsByTagName("rest").length) {
							noteIndex++
						}
						else if (dataNotes[noteIndex] && dataNotes[noteIndex].getElementsByTagName("pitch").length) {
							do {
								try { var step = dataNotes[noteIndex].getElementsByTagName("step")[0].innerHTML || "" } catch (error) { var step = "" }
								try { var alter = Number(dataNotes[noteIndex].getElementsByTagName("alter")[0].innerHTML) || 0 } catch (error) { var alter = 0 }
								try { var octave = Number(dataNotes[noteIndex].getElementsByTagName("octave")[0].innerHTML) || 3 } catch (error) { var octave = 3 }

								var pitch = step.toLowerCase()
									switch (pitch) {
										case "a":
											pitch = 9
										break
										case "b":
											pitch = 11
										break
										case "c":
											pitch = 0
										break
										case "d":
											pitch = 2
										break
										case "e":
											pitch = 4
										break
										case "f":
											pitch = 5
										break
										case "g":
											pitch = 7
										break
										default:
											pitch = 0
									}
									pitch += alter
									pitch = pitch + (12 * (octave - 3))

								beatPitches.push(pitch)
								noteIndex++
							}
							while (dataNotes[noteIndex] && dataNotes[noteIndex].getElementsByTagName("chord").length)
						}
						

						for (var p = 24; p >= 0; p--) {
							var pitch = document.createElement("div")
								pitch.className = "pitch pitch-" + p + " sound-off"
								pitch.id = "measure-" + m + "-beat-" + b + "-pitch-" + p
								pitch.addEventListener("mousedown", function() {
									togglePitch(this)
								})
								pitch.addEventListener("mouseenter", function() {
									if (clickdown) {
										togglePitch(this)
									}
								})

							if (beatPitches.indexOf(p) !== -1) {
								pitch.className = pitch.className.replace("sound-off", "sound-on")
							}

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

}
