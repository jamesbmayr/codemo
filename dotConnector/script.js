function ready() {

	/* onload */
		startGame()

	/* startGame */
		function startGame() {
			window.drawing = false
			document.body.className = ""

			var dots = document.getElementById("dots")			
			while (dots.hasChildNodes()) {
				dots.removeChild(dots.lastChild)
			}

			var lines = document.getElementById("lines")
			while (lines.hasChildNodes()) {
				lines.removeChild(lines.lastChild)
			}

			if (!window.score) {
				window.score = 3
			}
			document.getElementById("score-inner").innerHTML = window.score

			for (var d = 0; d < window.score; d++) {
				createDot()
			}
		}

	/* random */
		function random() {
			var set = "0123456789abcdefghijklmnopqrstuvwxyz"
			var output = ""
			while (output.length < 16) {
				output += set[Math.floor(Math.random() * 26)]
			}
			return output
		}

	/* createDot */
		function createDot(x, y) {
			var width = window.innerWidth || document.body.clientWidth
			var height = window.innerHeight || document.body.clientHeight
		
			var left = (x * width / 100) || (Math.random() * (width - 100)) + 50
			var top = (y * height / 100) || (Math.random() * (height - 100)) + 50

			var dot = document.createElement("div")
				dot.className = "dot-outer"
				dot.style.left = left + "px"
				dot.style.top = top + "px"
				dot.setAttribute("lines","")

			var inner = document.createElement("div")
				inner.className = "dot-inner"
				dot.appendChild(inner)

			dot.addEventListener("click", clickDot)

			document.getElementById("dots").appendChild(dot)
		}

	/* clickDot */
		function clickDot() {
			var dot = this

			if (!window.drawing) {
				if (dot.getAttribute("lines").length == 0) { //0 lines connected
					window.drawing = "_" + random()
					document.body.className = "drawing"
					
					connectDot(dot)
					createLine(dot)
				}
				else if (dot.getAttribute("lines").split(",").length == 1) { //1 line connected
					window.drawing = "_" + random()
					document.body.className = "drawing"

					connectDot(dot)
					createLine(dot)
				}
				else { //more than one line connected
					// console.log("overconnected")
				}
			}
			else {
				if (dot.getAttribute("lines").split(",").indexOf(window.drawing) !== -1) { //this line already connected
					unconnectDot(dot)

					window.drawing = false
					document.body.className = ""
				}
				else if (dot.getAttribute("lines").length == 0) { //0 lines connected
					//existing line
						connectDot(dot)
						updateLine(dot)

					//new line
						window.drawing = "_" + random()
						document.body.className = "drawing"

						connectDot(dot)
						createLine(dot)
				}
				else if (dot.getAttribute("lines").split(",").length == 1) { //1 line connected
					connectDot(dot)
					updateLine(dot)

					window.drawing = false
					document.body.className = ""
				}
				else { //more than one line connected
					// console.log("overconnected")
				}
			}
		}

	/* connectDot */
		function connectDot(dot) {
			var lines = dot.getAttribute("lines").split(",").filter(function(l) {
				return l.length > 0
			}) || []
			lines = lines.filter(function(l) {
				return l !== window.drawing
			})
			lines.push(window.drawing)
			dot.setAttribute("lines", lines.join(","))

			countConnections()
		}

	/* unconnectDot */
		function unconnectDot(dot) {
			document.getElementById("lines").removeChild( document.getElementById(window.drawing) )

			var lines = dot.getAttribute("lines").split(",").filter(function(l) {
				return l.length > 0
			}) || []
			lines = lines.filter(function(l) {
				return l !== window.drawing
			})
			dot.setAttribute("lines", lines.join(","))
		}

	/* createLine */
		function createLine(dot) {
			var left = Number(dot.style.left.replace("px",""))
			var top = Number(dot.style.top.replace("px",""))

			var width = window.innerWidth || document.body.clientWidth
			var height = window.innerHeight || document.body.clientHeight

			var line = document.createElement("line")
				line.id = window.drawing
				line.className = "line"
				line.setAttribute("x1", (left / width * 100))
				line.setAttribute("y1", (top / height * 100))
				line.setAttribute("x2", (left / width * 100))
				line.setAttribute("y2", (top / height * 100))

			document.getElementById("lines").appendChild(line)
		}

	/* updateLine */
		function updateLine(dot) {
			try {
				var left = dot.pageX || Number(dot.style.left.replace("px",""))
				var top = dot.pageY || Number(dot.style.top.replace("px",""))
			}
			catch (error) {
				var left = false
				var top = false
			}

			var width = window.innerWidth || document.body.clientWidth
			var height = window.innerHeight || document.body.clientHeight

			if (left && top) {
				var line = document.getElementById(window.drawing)
				if (line) {
					line.setAttribute("x2", (left / width * 100))
					line.setAttribute("y2", (top / height * 100))
				}
			}
		}

	/* moveMouse */
		document.onmousemove = moveMouse
		function moveMouse(event) {
			if (window.drawing) {
				updateLine(event)
				checkIntersection()
				document.getElementById("lines").innerHTML = document.getElementById("lines").innerHTML
			}
		}

	/* checkIntersection */
		function checkIntersection() {
			var dots = document.getElementsByClassName("dot-outer")
			var homeDot = Array.prototype.filter.call(dots,function(d) {
				return d.getAttribute("lines").indexOf(window.drawing) !== -1
			})[0]

			var friendLineId = homeDot.getAttribute("lines").split(",").filter(function(l) {
				return l !== window.drawing
			})[0]

			var newLine = getLineEquation( document.getElementById(window.drawing) )
			
			var otherLines = document.getElementsByClassName("line")
			if (otherLines.length > 1) {
				otherLines = Array.prototype.filter.call(otherLines,function(l) {
					return (l.id !== window.drawing) && (l.id !== friendLineId)
				})

				for (l in otherLines) {
					//get otherLine equation
						var otherLine = getLineEquation(otherLines[l])
						var x = (otherLine.b - newLine.b) / (newLine.m - otherLine.m)
						var y = (newLine.m * x) + newLine.b

					//cross vars
						var xCrossNew = false
						var yCrossNew = false
						var xCrossOther = false
						var yCrossOther = false	

					//crosses newLine?
						if ((x > newLine.x1) && (x < newLine.x2)) {
							xCrossNew = true
						}
						else if ((x < newLine.x1) && (x > newLine.x2)) {
							xCrossNew = true
						}

						if ((y > newLine.y1) && (y < newLine.y2)) {
							yCrossNew = true
						}
						else if ((y < newLine.y1) && (y > newLine.y2)) {
							yCrossNew = true
						}

					//cross otherLine?
						if ((x > otherLine.x1) && (x < otherLine.x2)) {
							xCrossOther = true
						}
						else if ((x < otherLine.x1) && (x > otherLine.x2)) {
							xCrossOther = true
						}

						if ((y > otherLine.y1) && (y < otherLine.y2)) {
							yCrossOther = true
						}
						else if ((y < otherLine.y1) && (y > otherLine.y2)) {
							yCrossOther = true
						}

					//crosses both
						if (xCrossNew && yCrossNew && xCrossOther && yCrossOther) {
							unconnectDot(homeDot)

							window.drawing = false
							document.body.className = ""

							break
						}
				}
			}
		}

	/* getLineEquation */
		function getLineEquation(line) {
			var x1 = line.getAttribute("x1")
			var y1 = line.getAttribute("y1")
			var x2 = line.getAttribute("x2")
			var y2 = line.getAttribute("y2")

			var m = (y2 - y1) / (x2 - x1)
			var b = y1 - (m * x1)	//y = m * x + b

			return {
				x1: x1,
				y1: y1,
				x2: x2,
				y2: y2,
				m: m,
				b: b,
				equation: "y = " + m + "x + " + b
			}
		}

	/* countConnections */
		function countConnections() {
			var dotCount = document.getElementsByClassName("dot-outer").length
			var lineCount = document.getElementsByClassName("line").length
			
			if (dotCount == lineCount) {
				checkContinuity()
			}
		}

	/* checkContinuity */
		function checkContinuity() {
			var dots = document.getElementsByClassName("dot-outer")
				dots = Array.prototype.slice.call(dots)

			var currentDot = dots[0]
			
			var lines = currentDot.getAttribute("lines")
			var endLine = lines.split(",")[0]
			var currentLine = lines.split(",")[1]
			
			dots = dots.filter(function(d) {
				return d.getAttribute("lines") !== lines
			})

			while ((dots.length) && (currentLine !== endLine)) {
				currentDot = dots.find(function(d) {
					return d.getAttribute("lines").indexOf(currentLine) !== -1
				})

				lines = currentDot.getAttribute("lines")
				currentLine = lines.split(",").find(function(l) {
					return l !== currentLine
				})

				dots = dots.filter(function(d) {
					return d.getAttribute("lines") !== lines
				})
			}

			if ((dots.length == 0) && (currentLine == endLine)) {
				window.score += 3
				startGame()
			}
		}

	/* resetGame */
		document.getElementById("reset").addEventListener("click", resetGame)
		function resetGame() {
			window.drawing = false
			document.body.className = ""

			var lines = document.getElementById("lines")
			while (lines.hasChildNodes()) {
				lines.removeChild(lines.lastChild)
			}

			var dots = document.getElementsByClassName("dot-outer")
				dots = Array.prototype.slice.call(dots)
			
			for (d in dots) {
				dots[d].setAttribute("lines","")
			}
		}

}
