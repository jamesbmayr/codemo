/*** update ***/
	/* triggers */
		if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
			var on = { click: "touchstart", mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend", dragover: "dragover", drop: "drop" }
		}
		else {
			var on = { click:      "click", mousedown:  "mousedown", mousemove: "mousemove", mouseup:  "mouseup", dragover: "dragover", drop: "drop" }
		}

	/* onload */
		updatePath("blue")
		updatePath("green")
		updatePath("red")
		
	/* updatePath */
		Array.from(document.querySelectorAll("textarea")).forEach(function (t) {
			t.addEventListener(on.click, function(event) {
				updatePath(String(event.target.id).replace("Text",""))
			})
		})

		Array.from(document.querySelectorAll("textarea")).forEach(function (t) {
			t.addEventListener("keyup", function(event) {
				updatePath(String(event.target.id).replace("Text",""))
			})
		})

		function updatePath(color, moving) {
			var path = document.getElementById(color + "Text").value || "0% 0%"
			document.getElementById(color + "Path").style["clip-path"] = "polygon(" + path + ")"
			document.getElementById(color + "Path").style["webkit-clip-path"] = "polygon(" + path + ")"

			if (!moving) {
				displayDots(color)
			}
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

					var d = document.createElement("div")
						d.className = "dot"
						d.style.top = y
						d.style.left = x
						d.setAttribute("index", i)
						d.setAttribute("title", x + " " + y)
						d.addEventListener(on.mousedown, selectDot)
						d.addEventListener(on.mouseup, unselectDot)

					dots.appendChild(d)
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
		}

	/* unselectDot */
		function unselectDot(event) {
			if (dot) {
				dot = null
			}
		}

	/* moveDots */
		document.addEventListener(on.mousemove, moveDots)
		function moveDots(event) {
			if (dot && (event.touches ? event.target.parentNode.id == "dots" : event.target.id == "dots")) {
				// move dot
					var size = document.getElementById("dots").getBoundingClientRect().width

					var x = Math.round((event.touches ? (event.touches[0].clientX - 15) : event.offsetX) * 10000 / size) / 100
					var y = Math.round((event.touches ? (event.touches[0].clientY - 15) : event.offsetY) * 10000 / size) / 100
					
					dot.style.left = x + "%"
					dot.style.top  = y + "%"
					dot.setAttribute("title", x + "% " + y + "%")

				// move shape
					var color = document.getElementById("color").value
					var index = Number(dot.getAttribute("index"))

					var points = document.getElementById(color + "Text").value
						points = points.split(/\s?,\s?/gi)
						points[index] = x + "% " + y + "%"
					
					document.getElementById(color + "Text").value = points.join(", ")
					updatePath(color, true)
			}
		}

	/* makeDot */
		document.getElementById("dots").addEventListener(on.click, makeDot)
		function makeDot(event) {
			if (!dot && event.target.className.indexOf("dot") == -1) {
				// create dot
					var size = document.getElementById("dots").getBoundingClientRect().width
					var x = Math.round((event.touches ? (event.touches[0].clientX - 15) : event.offsetX) * 10000 / size) / 100
					var y = Math.round((event.touches ? (event.touches[0].clientY - 15) : event.offsetY) * 10000 / size) / 100

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

	/* removeDot */
		document.getElementById("dots").addEventListener("dblclick", removeDot)
		function removeDot(event) {
			if (event.target.className.indexOf("dot") !== -1) {
				// get path
					var color = document.getElementById("color").value
					var points = document.getElementById(color + "Text").value || null
					if (!points) {
						return
					}
					else {
						points = points.split(/\s?,\s?/gi) || []
					}
				
				// remove at index
					var index = Number(event.target.getAttribute("index"))
					points.splice(index, 1)

				// put back
					document.getElementById(color + "Text").value = points.join(", ")
					updatePath(color)
			}
		}

/*** controls ***/
	/* setBackground */
		document.getElementById("background-file").addEventListener("change", setBackground)
		function setBackground(event) {
			var input = document.getElementById("background-file")
			var file = input.files ? input.files[0] : null
			
			if (!file) {
				clearBackground()
				return
			}

			var fileReader = new FileReader()
				fileReader.onload = function(event) {
					document.getElementById("container").style.backgroundImage = "url(" + event.target.result + ")"
				}
				fileReader.readAsDataURL(file)
		}

	/* dragFile */
		document.body.addEventListener(on.dragover, dragFile)
		function dragFile(event) {
			event.preventDefault()
		}

	/* dropFile */
		document.body.addEventListener(on.drop, dropFile)
		function dropFile(event) {
			// prevent default
				event.preventDefault()
				if (!event.dataTransfer || !event.dataTransfer.items) {
					return
				}

			// file
				var file = [...event.dataTransfer.items][0].getAsFile()
				if (!file) {
					return
				}
				if (!["image/png", "image/jpeg", "image/jpg", "image/gif", "image/webp", "image/bmp", "image/tiff", "image/svg+xml"].includes(file.type)) {
					return
				}

			// upload
				var fileReader = new FileReader()
					fileReader.onload = function(event) {
						document.getElementById("container").style.backgroundImage = "url(" + event.target.result + ")"
					}
					fileReader.readAsDataURL(file)
		}

	/* clearBackground */
		document.getElementById("background-clear").addEventListener(on.click, clearBackground)
		function clearBackground(event) {
			document.getElementById("container").style.backgroundImage = ""
			document.getElementById("background-file").value = ""
		}

	/* changeColor */
		document.getElementById("color").addEventListener("change", changeColor)
		function changeColor(event) {
			var color = event.target.value

			Array.from(document.querySelectorAll(".textbox")).forEach(function (t) {
				t.className = "textbox hidden"
			})

			document.getElementById(color + "Text").className = "textbox"

			var opacity = document.getElementById(color + "Path").style.opacity
			document.getElementById("shapeOpacity").value = opacity.length ? Number(opacity) : 1

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

	/* changeOpacity */
		document.getElementById("shapeOpacity").addEventListener("input", changeOpacity)
		function changeOpacity(event) {
			var opacity = Math.min(1, Math.max(0, Number(event.target.value) || 0))
			
			var currentColor = document.getElementById("color").value
			document.getElementById(currentColor + "Path").style.opacity = opacity
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
		document.getElementById("translate").addEventListener(on.click, translatePath)
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
		document.getElementById("rotate").addEventListener(on.click, rotatePath)
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
		document.getElementById("mirror").addEventListener(on.click, mirrorPath)
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
		document.getElementById("resize").addEventListener(on.click, resizePath)
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
