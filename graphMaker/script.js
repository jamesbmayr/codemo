window.onload = function() {

	/* onload */
		/* globals */
			var canvas = document.getElementById("graph")
			var colors = ["black", "red", "green", "blue", "magenta", "yellow", "cyan"]
			var dragging = false
			var dragX = null
			var dragY = null
			var zoom = 1

		/* resizeScreen */
			window.addEventListener("resize", resizeScreen)
			resizeScreen()
			function resizeScreen(event) {
				canvas.width = window.innerWidth * zoom
				canvas.height = window.innerHeight * zoom

				graphEquations()
			}

		/* zoomGrid */
			canvas.addEventListener("mousewheel", zoomGrid)
			function zoomGrid(event) {
				if (event.deltaY > 0) { // out
					if (zoom * 1.25 < 2) {
						zoom = zoom * 125 / 100
						resizeScreen()
					}
				}
				else if (event.deltaY < 0) { // in
					if (zoom * 0.8 > 0.25) {
						zoom = zoom * 80 / 100
						resizeScreen()
					}
				}
			}

	/* move controls */
		/* selectEquations */
			document.getElementById("equations").addEventListener("mousedown", selectEquations)
			function selectEquations(event) {
				if (event.target.id == "equations") {
					dragging = true
					dragX = event.offsetX
					dragY = event.offsetY
				}
			}

		/* unselectEquations */
			document.addEventListener("mouseup", unselectEquations)
			function unselectEquations(event) {
				dragging = false
			}

		/* dragEquations */
			document.addEventListener("mousemove", dragEquations)
			function dragEquations(event) {
				if (dragging) {
					var x = event.clientX || event.targetTouches[0].clientX
					var y = event.clientY || event.targetTouches[0].clientY

					var equations = document.getElementById("equations")
						equations.style.top = y - dragY + "px"
						equations.style.left = x - dragX + "px"
				}
			}

	/* create / remove */
		/* removeEquation */
			Array.from(document.querySelectorAll(".equation-remove")).forEach(function (b) {
				b.addEventListener("click", removeEquation)
			})
			function removeEquation(event) {
				if (event.target.className == "equation-remove") {
					var equation = event.target.parentNode
						equation.parentNode.removeChild(equation)
				}
			}

		/* createEquation */
			document.getElementById("equation-create").addEventListener("click", createEquation)
			function createEquation(event) {
				var y = document.createElement("div")
					y.className = "equation-y"
					y.innerText = "y ="

				var x = document.createElement("input")
					x.className = "equation-x"
					x.type = "text"
					x.placeholder = "..."
					x.addEventListener("change", graphEquations)

				var hue = document.createElement("select")
					hue.className = "equation-hue"
					for (var c in colors) {
						var option = document.createElement("option")
							option.value = colors[c]
							option.innerText = colors[c]
						hue.appendChild(option)
					}
					hue.addEventListener("change", graphEquations)

				var remove = document.createElement("button")
					remove.className = "equation-remove"
					remove.innerText = "-"
					remove.addEventListener("click", removeEquation)

				var equation = document.createElement("div")
					equation.className = "equation"
					equation.appendChild(y)
					equation.appendChild(x)
					equation.appendChild(hue)
					equation.appendChild(remove)

				document.getElementById("equations").insertBefore(equation, document.getElementById("equation-create"))
			}

	/* graphing */
		/* graphGrid */
			function graphGrid() {
				// clear grid
					var context = canvas.getContext("2d")
						context.clearRect(0, 0, canvas.width, canvas.height)

				// y lines
					n = Math.floor(canvas.height / -2 / 10) * 10
					while (n < canvas.height / 2) {
						var coordinates = calculateY(n)
						plotCoordinates(coordinates, "gray", (n % 100 == 0 ? 3 : 1))
						n += 10
					}

				// x lines
					n = Math.floor(canvas.width / -2 / 10) * 10
					while (n < canvas.width / 2) {
						var coordinates = calculateX(n)
						plotCoordinates(coordinates, "gray", (n % 100 == 0 ? 3 : 1))
						n += 10
					}

				// origin
					context.moveTo(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2))
					context.arc(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), (5 * Math.max(0.64, Math.min(zoom, 1.8))), 0, Math.PI * 2, true)
					context.fillStyle = "gray"
					context.fill()
			}

		/* graphEquations */
			Array.from(document.querySelectorAll(".equation-x")).concat(Array.from(document.querySelectorAll(".equation-hue"))).forEach(function (i) {
				i.addEventListener("change", graphEquations)
			})
			function graphEquations() {
				graphGrid()

				var equations = Array.from(document.querySelectorAll(".equation-x"))
				var hues = Array.from(document.querySelectorAll(".equation-hue"))

				for (var e in equations) {
					var equation = equations[e].value
						equation = sanitizeEquation(equation)

					var coordinates = calculateY(equation)

					plotCoordinates(coordinates, hues[e].value)
				}
			}

		/* sanitizeEquation */
			function sanitizeEquation(equation) {
				equation = equation.toLowerCase().trim()
				equation = equation.replace(/\^/gi,  "**")
				equation = equation.replace(/÷/gi, "/")
				equation = equation.replace(/mod/gi, "%")

				equation = equation.replace(/asin/gi, "Math.asin")
				equation = equation.replace(/acos/gi, "Math.acos")
				equation = equation.replace(/atan/gi, "Math.atan")
				equation = equation.replace(/sin/gi,  "Math.sin")
				equation = equation.replace(/cos/gi,  "Math.cos")
				equation = equation.replace(/tan/gi,  "Math.tan")

				equation = equation.replace(/log/gi, "Math.log")
				equation = equation.replace(/abs/gi, "Math.abs")
				equation = equation.replace(/sqrt/gi, "Math.sqrt")
				equation = equation.replace(/root/gi, "Math.sqrt")

				equation = equation.replace(/ceil/gi,  "Math.ceil")
				equation = equation.replace(/floor/gi, "Math.floor")
				equation = equation.replace(/round/gi, "Math.round")
				
				equation = equation.replace(/pi/gi,  "Math.PI")
				equation = equation.replace(/^e|\se/gi, " Math.E")

				equation = equation.replace(/\|([^|])\|/gi, "Math.abs($1)")
				equation = equation.replace(/(\d+)([A-Za-z\(]+)/gi, "$1 * $2")

				console.log(equation)
				return equation.trim()
			}

		/* calculateCoordinates */
			function calculateY(equation) {
				var coordinates = []

				for (var x = Math.floor(canvas.width / -2); x <= Math.floor(canvas.width / 2); x++) {
					try {
						var y = eval(equation)
					}
					catch (error) {
						var y = 0
					}

					coordinates.push([x, y])
				}

				return coordinates
			}

			function calculateX(equation) {
				var coordinates = []

				for (var y = Math.floor(canvas.height / -2); y <= Math.floor(canvas.height / 2); y++) {
					try {
						var x = eval(equation)
					}
					catch (error) {
						var x = 0
					}

					coordinates.push([x, y])
				}

				return coordinates
			}

		/* plotCoordinates */
			function plotCoordinates(coordinates, color, thickness) {
				var context = canvas.getContext("2d")
					context.beginPath()
					context.strokeStyle = color || colors[Math.floor(Math.random() * colors.length)]
					context.lineWidth = (thickness || 1) * Math.max(0.64, Math.min(zoom, 1.8))

				for (var c in coordinates) {
					var x = toCanvasX(coordinates[c][0])
					var y = toCanvasY(coordinates[c][1])

					context.lineTo(x, y)
				}

				context.stroke()
			}

		/* toCanvas */
			function toCanvasX(x) {
				return Math.floor(canvas.width / 2) + x
			}

			function toCanvasY(y) {
				return Math.floor(canvas.height / 2) - y
			}

}