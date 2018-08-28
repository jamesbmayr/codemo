function ready() {

	/*** onload ***/
		/* triggers */
			if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
				var on = { click: "touchstart", mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" }
			}
			else {
				var on = { click:      "click", mousedown:  "mousedown", mousemove: "mousemove", mouseup:  "mouseup" }
			}

		/* buildList */
			buildList()
			function buildList() {
				var list = window.getInstruments() || []
				var select = document.getElementById("wave")
				for (var l in list) {
					var option = document.createElement("option")
						option.value = option.innerText = list[l]
					select.appendChild(option)
				}
			}

		/* globals */
			var clickdown = false
			var animateLoop = null
			var scrolling = true
			document.getElementById("wave").value = "honeyharp"

		/* setMeasures */
			setMeasures()
			document.getElementById("target").addEventListener("change", setMeasures)
			function setMeasures() {
				clearInterval(animateLoop)

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

							for (var p = 36; p >= 0; p--) {
								var pitch = document.createElement("div")
									pitch.className = "pitch pitch-" + p + " sound-off"
									pitch.id = "measure-" + m + "-beat-" + b + "-pitch-" + p
									pitch.addEventListener(on.mousedown, function() {
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

	/*** changes ***/
		/* changeInstrument */
			document.addEventListener(on.click, function() {
				if (window.audio && !window.instrument) { changeInstrument(); changeVolume() }
			})
			document.getElementById("wave").addEventListener("change", changeInstrument)
			function changeInstrument() {
				var name = document.getElementById("wave").value
				window.instrument = window.buildInstrument(window.getInstrument(name) || {})
			}

		/* changeVolume */
			document.getElementById("volume").addEventListener("change", changeVolume)
			function changeVolume() {
				var volume = Number(document.getElementById("volume").value) || 50
					volume = Math.min(volume, 100)
					volume = Math.max(volume, 0)
				window.instrument.setParameters({ volume: (volume / 100) })
			}


	/*** pitches ***/
		/* togglePitch */
			function togglePitch(toggle) {
				var data = toggle.id.split("-")
					var pitch = data[5]

				if (shift) {
					toggle.className = toggle.className.replace("sound-on", "sound-off")
				}
				else if (toggle.className.indexOf("sound-on") == -1) {
					toggle.className = toggle.className.replace("sound-off", "sound-on")
					playNote(Number(pitch))
				}
				else {
					toggle.className = toggle.className.replace("sound-on", "sound-off")
				}
			}

		/* dragPitch */
			var shift = false
			document.getElementById("player").addEventListener(on.mousedown, function () { clickdown = true })
			document.addEventListener(on.mouseup, function () { clickdown = false })
			document.addEventListener("keydown", function (event) { if (event.which == 16) { shift = true } })
			document.addEventListener("keyup", function (event) { if (event.which == 16) { shift = false } })

		/* resetPitches */
			document.getElementById("reset").addEventListener(on.click, resetPitches)
			function resetPitches() {
				clearInterval(animateLoop)

				document.getElementById("pause").style.display = "none"
				document.getElementById("play").style.display = "inline-block"

				document.getElementById("staff").scrollLeft = 0

				var pitches = document.getElementsByClassName("sound-on")
					pitches = Array.prototype.slice.call(pitches)

				for (var p in pitches) {
					pitches[p].className = pitches[p].className.replace("sound-on", "sound-off")
				}
			}

	/*** controls ***/
		/* playMusic */
			document.getElementById("play").addEventListener(on.click, playMusic)
			function playMusic() {
				document.getElementById("play").style.display = "none"
				document.getElementById("pause").style.display = "inline-block"

				var tempo = Number(document.getElementById("tempo").value) || 100
					tempo = Math.max(tempo, 1)
					tempo = Math.min(tempo, 250)
					tempo = tempo * 4

				animateLoop = setInterval(function() {
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
				}, (60 * 1000 / tempo))
			}

		/* pauseMusic */
			document.getElementById("pause").addEventListener(on.click, pauseMusic)
			function pauseMusic() {
				clearInterval(animateLoop)
				animateLoop = null

				document.getElementById("pause").style.display = "none"
				document.getElementById("play").style.display = "inline-block"
			}

		/* stopMusic */
			document.getElementById("stop").addEventListener(on.click, stopMusic)
			function stopMusic() {
				clearInterval(animateLoop)
				animateLoop = null

				document.getElementById("pause").style.display = "none"
				document.getElementById("play").style.display = "inline-block"

				document.getElementById("staff").scrollLeft = 0
			}

	/*** scroll ***/
		/* scrollLeft */
			document.getElementById("scroll-left").addEventListener(on.mousedown, scrollLeft)
			function scrollLeft() {
				scrolling = true
				clearInterval(animateLoop)

				document.getElementById("pause").style.display = "none"
				document.getElementById("play").style.display = "inline-block"

				animateLoop = setInterval(function() {
					document.getElementById("staff").scrollLeft -= 16 + (document.getElementById("staff").scrollLeft % 16)
				}, 50)
			}

		/* scrollRight */
			document.getElementById("scroll-right").addEventListener(on.mousedown, scrollRight)
			function scrollRight() {
				scrolling = true
				clearInterval(animateLoop)

				document.getElementById("pause").style.display = "none"
				document.getElementById("play").style.display = "inline-block"

				animateLoop = setInterval(function() {
					document.getElementById("staff").scrollLeft += 16 + (-1 * (document.getElementById("staff").scrollLeft % 16))
				}, 50)
			}

		/* stopScroll */
			document.addEventListener(on.mouseup, stopScroll)
			function stopScroll() {
				if (scrolling) {
					scrolling = false
					clearInterval(animateLoop)
				}
			}

	/* playNote */
		//listeners
			var keys = document.getElementsByClassName("key")
				keys = Array.prototype.slice.call(keys)
			for (var k in keys) {
				keys[k].addEventListener(on.mousedown, function() {
					playNote(Number(this.getAttribute("value")))
				})
				keys[k].addEventListener("mouseenter", function() {
					if (clickdown) {
						playNote(Number(this.getAttribute("value")))
					}
				})
			}

		function playNote(pitch) {
			//sound
				var tempo = Number(document.getElementById("tempo").value) || 100
					tempo = Math.max(tempo, 1)
					tempo = Math.min(tempo, 250)
					tempo = tempo * 4

				pitch = Number(pitch) || 0
				var frequency = window.getFrequency(pitch + 48)[0]

				if (window.instrument) {
					window.instrument.press(frequency)
					window.instrument.lift(frequency, (60 / tempo))
				}
				
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
				}, 60 * 1000 / 500)
		}

	/*** load ***/
		/* downloadScore */
			document.getElementById("download").addEventListener(on.click, downloadScore)
			function downloadScore() {			
				//build musicXML
					var musicXML = ""
						musicXML += '<?xml version="1.0" standalone="no"?><!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd"><score-partwise><part-list><score-part id="P1"><part-name>Synth</part-name></score-part></part-list><part id="P1">'

					var tempo = document.getElementById("tempo").value || 100
					var volume = document.getElementById("volume").value || 50
					var measures = document.getElementsByClassName("measure")
						measures = Array.prototype.slice.call(measures)
					for (var m in measures) {

						if (m == 0) {
							musicXML += '<measure number="1"><attributes><divisions>1</divisions><key><fifths>0</fifths><mode>major</mode></key><time><beats>4</beats><beat-type>4</beat-type></time><staves>1</staves><clef><sign>G</sign><line>2</line></clef><sound tempo="' + (tempo) + '"/></attributes><sound tempo="' + tempo + '" dynamics="' + volume + '"/>'
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

					downloadLink.addEventListener(on.click, function() {
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
					clearInterval(animateLoop)

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
							try { document.getElementById("tempo").value = Number(sound.getAttribute("tempo")) } catch (error) {}
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
							

							for (var p = 36; p >= 0; p--) {
								var pitch = document.createElement("div")
									pitch.className = "pitch pitch-" + p + " sound-off"
									pitch.id = "measure-" + m + "-beat-" + b + "-pitch-" + p
									pitch.addEventListener(on.mousedown, function() {
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
