window.onload = function() {

	/* on load */
		/* triggers */
			if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
				var on = { click: "touchstart", mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" }
			}
			else {
				var on = { click:      "click", mousedown:  "mousedown", mousemove: "mousemove", mouseup:  "mouseup" }
			}

		/* globals */
			var canvas = document.getElementById("graph")
			var colors = ["black", "red", "green", "blue", "magenta", "yellow", "cyan"]
			
			var dragging = false
			var dragX = null
			var dragY = null

			var moving = false
			var moveX = null
			var moveY = null
			
			var originX = null
			var originY = null
			var zoom = 1

		/* resizeScreen */
			window.addEventListener("resize", resizeScreen)
			resizeScreen()
			function resizeScreen(event) {
				canvas.width = window.innerWidth * zoom
				canvas.height = window.innerHeight * zoom

				if (originX == null && originY == null) {
					originX = Math.floor(canvas.width / 2)
					originY = Math.floor(canvas.height / 2)
				}

				graphEquations()
			}

	/* move grid */
		/* zoomGrid */
			canvas.addEventListener("mousewheel", zoomGrid)
			document.getElementById("zoom-in" ).addEventListener(on.click, zoomGrid)
			document.getElementById("zoom-out").addEventListener(on.click, zoomGrid)

			function zoomGrid(event) {
				var x = event.touches ? (window.innerWidth  / 2) : event.clientX
				var y = event.touches ? (window.innerHeight / 2) : event.clientY

				var diffX = Math.floor(originX - (x * zoom))
				var diffY = Math.floor(originY - (y * zoom))
				
				if (event.target.id == "zoom-out" || event.deltaY > 0) { // out
					console.log("out")
					if (zoom * 1.25 < 2) {
						zoom = zoom * 125 / 100
						originX =  Math.floor(originX * 125 / 100) - Math.floor(diffX * 25 / 100)
						originY =  Math.floor(originY * 125 / 100) - Math.floor(diffY * 25 / 100)
						
						resizeScreen()
					}
				}
				else if (event.target.id == "zoom-in" || event.deltaY < 0) { // in
					console.log("in")
					if (zoom * 0.8 > 0.25) {
						zoom = zoom * 80 / 100
						originX = Math.floor(originX * 80 / 100) + Math.floor(diffX * 20 / 100)
						originY = Math.floor(originY * 80 / 100) + Math.floor(diffY * 20 / 100)
						
						resizeScreen()
					}
				}
			}

		/* selectGrid */
			canvas.addEventListener(on.mousedown, selectGrid)
			function selectGrid(event) {
				moving = true
				moveX = Math.floor(((event.touches ? event.touches[0].clientX : event.offsetX) * zoom) - originX)
				moveY = Math.floor(((event.touches ? event.touches[0].clientY : event.offsetY) * zoom) - originY)
			}

		/* unselectGrid */
			document.addEventListener(on.mouseup, unselectGrid)
			function unselectGrid(event) {
				moving = false
				moveX = null
				noveY = null
			}

		/* moveGrid */
			document.addEventListener(on.mousemove, moveGrid)
			function moveGrid(event) {
				if (moving) {
					var x = (event.touches ? event.touches[0].clientX : event.clientX)
					var y = (event.touches ? event.touches[0].clientY : event.clientY)

					originY = Math.floor((y * zoom) - moveY)
					originX = Math.floor((x * zoom) - moveX)
					graphEquations()
				}
			}

	/* drag controls */
		/* selectEquations */
			document.getElementById("equations").addEventListener(on.mousedown, selectEquations)
			function selectEquations(event) {
				if (event.target.id == "equations") {
					dragging = true
					dragX = event.touches ? (event.touches[0].clientX - window.getComputedStyle(event.target).left.replace("px","")) : event.offsetX
					dragY = event.touches ? (event.touches[0].clientY - window.getComputedStyle(event.target).top.replace( "px","")) : event.offsetY
				}
			}

		/* unselectEquations */
			document.addEventListener(on.mouseup, unselectEquations)
			function unselectEquations(event) {
				dragging = false
				dragX = null
				dragY = null
			}

		/* dragEquations */
			document.addEventListener(on.mousemove, dragEquations)
			function dragEquations(event) {
				if (dragging) {
					var x = (event.touches ? event.touches[0].clientX : event.clientX)
					var y = (event.touches ? event.touches[0].clientY : event.clientY)

					var equations = document.getElementById("equations")
						equations.style.top = y - dragY + "px"
						equations.style.left = x - dragX + "px"
				}
			}

	/* create / remove */
		/* removeEquation */
			Array.from(document.querySelectorAll(".equation-remove")).forEach(function (b) {
				b.addEventListener(on.click, removeEquation)
			})
			function removeEquation(event) {
				if (event.target.className == "equation-remove") {
					var equation = event.target.parentNode
						equation.parentNode.removeChild(equation)
				}
			}

		/* createEquation */
			document.getElementById("equation-create").addEventListener(on.click, createEquation)
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
					remove.addEventListener(on.click, removeEquation)

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
					var n = Math.floor((canvas.height - originY) / -10) * 10
					while (n < canvas.height + originY) {
						var coordinates = calculateY(n)
						var thickness = (n % 1000 == 0 ? 3 : n % 100 == 0 ? 2 : 1)
						plotCoordinates(coordinates, "gray", thickness)
						n += 10
					}

				// x lines
					var n = Math.floor(originX / -10) * 10
					while (n < canvas.width - originX) {
						var coordinates = calculateX(n)
						var thickness = (n % 1000 == 0 ? 3 : n % 100 == 0 ? 2 : 1)
						plotCoordinates(coordinates, "gray", thickness)
						n += 10
					}

				// origin
					context.moveTo(originX, originY)
					context.arc(originX, originY, (5 * Math.max(0.64, Math.min(zoom, 1.8))), 0, Math.PI * 2, true)
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

				return equation.trim()
			}

		/* calculateCoordinates */
			function calculateY(equation) {
				var coordinates = []

				for (var x = -originX; x <= canvas.width - originX; x++) {
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

				for (var y = originY - canvas.height; y <= canvas.height + originY; y++) {
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
				return originX + x
			}

			function toCanvasY(y) {
				return originY - y
			}

}