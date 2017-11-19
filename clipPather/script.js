window.onload = function() {

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

			makeDots(color)
		}

		updatePath("blue")
		updatePath("green")
		updatePath("red")

	/* slidePath */
		document.getElementById("adjust").addEventListener("click", slidePath)
		function slidePath() {
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

						var newCoordinates = x + "% " + y + "%"
						points[i] = newCoordinates
					}

					document.getElementById(color + "Text").value = points.join(", ")

					updatePath(color)
				}
			}
		}

	/* changeColor */
		document.getElementById("color").addEventListener("change", changeColor)
		function changeColor(event) {
			var color = event.target.value

			Array.from(document.querySelectorAll(".textbox")).forEach(function (t) {
				t.className = "textbox hidden"
			})

			document.getElementById(color + "Text").className = "textbox"

			makeDots(color)
		}

	/* makeDots */
		function makeDots(color) {
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

}