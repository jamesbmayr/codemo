window.onload = function() {

	/*** update ***/
		/* onload */
			updatePath("blue")
			updatePath("green")
			updatePath("red")
			
		/* updatePath */
			Array.from(document.querySelectorAll("textarea")).forEach(function (t) {
				t.addEventListener("click", function(event) {
					updatePath(String(event.target.id).replace("Text",""))
				})
			})

			Array.from(document.querySelectorAll("textarea")).forEach(function (t) {
				t.addEventListener("keyup", function(event) {
					updatePath(String(event.target.id).replace("Text",""))
				})
			})

			function updatePath(color) {
				var path = document.getElementById(color + "Text").value || "0% 0%"
				document.getElementById(color + "Path").style["clip-path"] = "polygon(" + path + ")"
				document.getElementById(color + "Path").style["webkit-clip-path"] = "polygon(" + path + ")"

				displayDots(color)
			}

		/* displayDots */
			function displayDots(color) {
				var dots = document.getElementById("dots")
					dots.innerHTML = ""

				var points = document.getElementById(color + "Text").value || false

				if (points) {
					points = points.split(/\s?,\s?/gi)
				
					for (i in points) {
						coordinates = points[i].split(/\s/)
						var x = coordinates[0]
						var y = coordinates[1]

						var dot = document.createElement("div")
							dot.className = "dot"
							dot.style.top = y
							dot.style.left = x
							dot.setAttribute("index", i)
							dot.setAttribute("title", x + " " + y)
							dot.addEventListener("mousedown", selectDot)

						dots.appendChild(dot)
					}
				}
			}

	/*** draw ***/
		/* selectDot */
			var dot = null
			function selectDot(event) {
				if (!dot) {
					dot = event.target
				}
				else {				
					dot = null
				}
			}

		/* moveDots */
			document.addEventListener("mousemove", moveDots)
			function moveDots(event) {
				if (dot && event.target.id == "dots") {
					// move dot
						var size = document.getElementById("dots").getBoundingClientRect().width

						var x = Math.round(event.offsetX * 10000 / size) / 100
						var y = Math.round(event.offsetY * 10000 / size) / 100
						
						dot.style.left = x + "%"
						dot.style.top  = y + "%"
						dot.setAttribute("title", x + "% " + y + "% ")

					// move shape
						var color = document.getElementById("color").value
						var index = Number(dot.getAttribute("index"))

						var points = document.getElementById(color + "Text").value
							points = points.split(/\s?,\s?/gi)
							points[index] = x + "% " + y + "% "
						
						document.getElementById(color + "Text").value = points.join(", ")
						updatePath(color)

				}
			}

		/* makeDot */
			document.getElementById("dots").addEventListener("click", makeDot)
			function makeDot(event) {
				if (!dot && event.target.className.indexOf("dot") == -1) {
					// create dot
						var size = document.getElementById("dots").getBoundingClientRect().width
						var x = Math.round(event.offsetX * 10000 / size) / 100
						var y = Math.round(event.offsetY * 10000 / size) / 100

						var dot = document.createElement("div")
							dot.className = "dot"
							dot.style.left = x + "%"
							dot.style.top  = y + "%"
							dot.setAttribute("title", x + "% " + y + "% ")

						document.getElementById("dots").appendChild(dot)

					// update path
						var color = document.getElementById("color").value
						var points = document.getElementById(color + "Text").value || null
						if (points) {
							points = points.split(/\s?,\s?/gi) || []
							points.push(x + "% " + y + "%")
						}
						else {
							points = [x + "% " + y + "%"]
						}

						document.getElementById(color + "Text").value = points.join(", ")
						updatePath(color)
				}
			}

	/*** controls ***/
		/* changeColor */
			document.getElementById("color").addEventListener("change", changeColor)
			function changeColor(event) {
				var color = event.target.value

				Array.from(document.querySelectorAll(".textbox")).forEach(function (t) {
					t.className = "textbox hidden"
				})

				document.getElementById(color + "Text").className = "textbox"

				displayDots(color)
			}

		/* toggleDots */
			document.getElementById("dotToggle").addEventListener("change", toggleDots)
			function toggleDots(event) {
				var checkbox = event.target
				if (checkbox.checked) {
					document.getElementById("dots").className = ""
				}
				else {
					document.getElementById("dots").className = "hidden"
				}
			}

		/* switchTransform */
			document.getElementById("direction").addEventListener("change", switchTransform)
			function switchTransform(event) {
				var direction = event.target.value

				if (direction == "x" || direction == "y") {
					document.getElementById("rotate").className = "hidden"
					document.getElementById("translate").className = ""
					document.getElementById("mirror").className = "hidden"
					document.getElementById("resize").className = "hidden"
					document.getElementById("distance").className = ""
				}
				else if (direction == "angle") {
					document.getElementById("rotate").className = ""
					document.getElementById("translate").className = "hidden"
					document.getElementById("mirror").className = "hidden"
					document.getElementById("resize").className = "hidden"
					document.getElementById("distance").className = ""
				}
				else if (direction == "mirror-x" || direction == "mirror-y") {
					document.getElementById("rotate").className = "hidden"
					document.getElementById("translate").className = "hidden"
					document.getElementById("mirror").className = ""
					document.getElementById("resize").className = "hidden"
					document.getElementById("distance").className = "hidden"
				}
				else if (direction == "resize") {
					document.getElementById("rotate").className = "hidden"
					document.getElementById("translate").className = "hidden"
					document.getElementById("mirror").className = "hidden"
					document.getElementById("distance").className = ""
					document.getElementById("resize").className = ""
				}
			}

	/*** transforms ***/
		/* translatePath */
			document.getElementById("translate").addEventListener("click", translatePath)
			function translatePath() {
				var color = document.getElementById("color").value
				var direction = document.getElementById("direction").value
				var distance = document.getElementById("distance").value || false

				if (distance) {
					var points = document.getElementById(color + "Text").value || false
					
					if (points) {
						points = points.split(/\s?,\s?/gi)
						
						for (i in points) {
							coordinates = points[i].split(/\s/)
							var x = Number(coordinates[0].replace(/\%/g,""))
							var y = Number(coordinates[1].replace(/\%/g,""))

							if (direction == "x") {
								x = x + Number(distance)
							}
							else if (direction == "y") {
								y = y + Number(distance)
							}

							x = Math.round(x * 100) / 100
							y = Math.round(y * 100) / 100

							var newCoordinates = x + "% " + y + "%"
							points[i] = newCoordinates
						}

						document.getElementById(color + "Text").value = points.join(", ")

						updatePath(color)
					}
				}
			}

		/* rotatePath */
			document.getElementById("rotate").addEventListener("click", rotatePath)
			function rotatePath(event) {
				var angle = Number(document.getElementById("distance").value) || false
					angle = angle * Math.PI / 180

				if (angle) {
					var color = document.getElementById("color").value
					var points = document.getElementById(color + "Text").value || false
					
					if (points) {
						points = points.split(/\s?,\s?/gi)
						
						for (i in points) {
							coordinates = points[i].split(/\s/)
							var x = Number(coordinates[0].replace(/\%/g,"")) - 50
							var y = Number(coordinates[1].replace(/\%/g,"")) - 50

							var newX = ((x * Math.cos(angle)) - (y * Math.sin(angle))) + 50
							var newY = ((y * Math.cos(angle)) + (x * Math.sin(angle))) + 50

							newX = Math.round(newX * 100) / 100
							newY = Math.round(newY * 100) / 100

							var newCoordinates = newX + "% " + newY + "%"
							points[i] = newCoordinates
						}

						document.getElementById(color + "Text").value = points.join(", ")
						updatePath(color)
					}
				}
			}

		/* mirrorPath */
			document.getElementById("mirror").addEventListener("click", mirrorPath)
			function mirrorPath(event) {
				var direction = document.getElementById("direction").value

				var color = document.getElementById("color").value
				var points = document.getElementById(color + "Text").value || false
				
				if (points) {
					points = points.split(/\s?,\s?/gi)
					
					for (i in points) {
						coordinates = points[i].split(/\s/)
						var x = Number(coordinates[0].replace(/\%/g,""))
						var y = Number(coordinates[1].replace(/\%/g,""))

						if (direction == "mirror-x") {
							var newX = ((x - 50) * -1) + 50
							var newY = y
						}
						else if (direction == "mirror-y") {
							var newY = ((y - 50) * -1) + 50
							var newX = x
						}

						newX = Math.round(newX * 100) / 100
						newY = Math.round(newY * 100) / 100

						var newCoordinates = newX + "% " + newY + "%"
						points[i] = newCoordinates
					}

					document.getElementById(color + "Text").value = points.join(", ")
					updatePath(color)
				}
			}

		/* resizePath */
			document.getElementById("resize").addEventListener("click", resizePath)
			function resizePath(event) {
				var multiplier = Number(document.getElementById("distance").value) || false

				if (multiplier) {
					var color = document.getElementById("color").value
					var points = document.getElementById(color + "Text").value || false

					if (points) {
						points = points.split(/\s?,\s?/gi)

						for (i in points) {
							coordinates = points[i].split(/\s/)
							var x = Number(coordinates[0].replace(/\%/g,"")) - 50
							var y = Number(coordinates[1].replace(/\%/g,"")) - 50

							var newX = (x * multiplier) + 50
							var newY = (y * multiplier) + 50

							newX = Math.round(newX * 100) / 100
							newY = Math.round(newY * 100) / 100

							var newCoordinates = newX + "% " + newY + "%"
							points[i] = newCoordinates
						}

						document.getElementById(color + "Text").value = points.join(", ")
						updatePath(color)
					}
				}
			}

}
