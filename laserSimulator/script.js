window.onload = function() {

	/*** onload ***/
		/* globals */
			window.items = items = []
			window.lines = lines = []
			var color = "#ffffff"
			var tool = "cursor"
			var selected = {}
			var pressing = false
			var shifting = false
			var position = {
				x: null,
				y: null
			}

		/* elements */
			var controls = document.getElementById("controls")
			var canvas = document.getElementById("canvas")
			var context = canvas.getContext("2d")

		/* animation loop */
			var canvasLoop = setInterval(function() {
				// clear
					clearCanvas()
				
				// emitters, prisms, refractors
					for (var i in items) {
						drawItem(items[i])
					}

				// mirrors, blocks, filters
					for (var l in lines) {
						drawLine(lines[l])
					}

				// lasers
					items.filter(function (item) {
						return item.type == "emitter"
					}).forEach(function (emitter) {
						drawLaser(emitter)
					})
			}, 10)

	/*** listeners ***/
		/* shift */
			document.addEventListener("keydown", function (event) {
				if (event.key == "Shift") {
					shifting = true
				}
			})

			document.addEventListener("keyup", function (event) {
				shifting = false
			})

		/* resize */
			resizeCanvas()
			window.addEventListener("resize", resizeCanvas)
			function resizeCanvas(event) {
				canvas.height = window.innerHeight
				canvas.width = window.innerWidth
			}

		/* mousedown */
			document.addEventListener("mousedown", downMouse)
			function downMouse(event) {
				pressing = true

				if (event.target.id == "controls") {
					selectControls(event)
				}
				else if (event.target.tagName == "BODY") {
					if (tool == "cursor") {
						selectItem(event)
					}
					else if (tool == "eraser") {
						eraseItems(event)
					}
					else if (["emitter", "prism", "refractor"].includes(tool)) {
						createItem(event)
					}
					else if (["mirror", "block", "filter"].includes(tool)) {
						startLine(event)
					}
				}
			}

		/* mousemove */
			document.addEventListener("mousemove", moveMouse)
			function moveMouse(event) {
				position.x = event.clientX
				position.y = event.clientY

				if (pressing && selected.item) {
					if (selected.item == "controls") {
						moveControls(event)
					}
					else if (tool == "cursor" && shifting) {
						rotateItem(event)
					}
					else if (tool == "cursor") {
						moveItem(event)
					}
					else if (["mirror", "block", "filter"].includes(tool)) {
						endLine(event)
					}
				}
				else if (pressing) {
					if (tool == "eraser") {
						eraseItems(event)
					}
				}
			}

		/* mouseup */
			document.addEventListener("mouseup", upMouse)
			function upMouse(event) {
				pressing = false

				if (selected.item == "controls") {
					unselectControls(event)
				}
				else if (["cursor", "mirror", "block", "filter"].includes(tool)) {
					unselectItem(event)
				}
			}

	/*** controls ***/
		/* selectControls */
			function selectControls(event) {
				selected = {
					item: "controls",
					x: event.offsetX,
					y: event.offsetY
				}
				controls.setAttribute("dragging", true)
			}

		/* moveControls */
			function moveControls(event) {
				controls.style.left = position.x - selected.x + "px"
				controls.style.top  = position.y - selected.y + "px"
			}

		/* unselectControls */
			function unselectControls(event) {
				selected = {}
				controls.removeAttribute("dragging")
			}

		/* selectColor */
			controls.querySelector("select").addEventListener("change", selectColor)
			function selectColor(event) {
				color = controls.querySelector("select").value
				controls.setAttribute("color", color)
			}

		/* selectTool */
			controls.querySelectorAll("button").forEach(function (b) { b.addEventListener("click", selectTool) })
			function selectTool(event) {
				document.querySelector("[selected]").removeAttribute("selected")
				event.target.setAttribute("selected", true)
				
				tool = event.target.id
			}

	/*** canvas ***/
		/* clearCanvas */
			function clearCanvas() {
				context.clearRect(0, 0, canvas.width, canvas.height)
			}

		/* drawItem */
			function drawItem(item) {
				if (item.type == "emitter") {
					var angle = findRadians(item.a) * -1
		
					context.beginPath()
					context.strokeStyle = item.color
					context.lineWidth = 3

					context.arc(item.x, item.y, item.r, angle + (Math.PI / 4), angle - (Math.PI / 4), false)
					context.stroke()
				}
				else if (item.type == "prism") {
					//
				}
				else if  (item.type == "refractor") {
					//
				}
			}

		/* drawLine */
			function drawLine(line) {
				context.beginPath()
				context.strokeStyle = line.color
				context.lineWidth = 3

				context.moveTo(line.start.x, line.start.y)
				context.lineTo(line.end.x, line.end.y)

				context.stroke()
			}

		/* drawLaser */
			function drawLaser(emitter) {
				// get collisions
					var collisions = []
					for (var l in lines) {
						var intersection = findIntersection(emitter, lines[l])
						if (intersection) {
							intersection.line = lines[l]
							collisions.push(intersection)
						}
					}

				// find closest collision
					var collision = null
					if (collisions.length) {
						var minDistance = 1000000

						for (var c in collisions) {
							var distance = findDistance(emitter.x, emitter.y, collisions[c].x, collisions[c].y)
							
							if (0 < distance && distance < minDistance) {
								minDistance = distance
								collision = collisions[c]
							}
						}
					}
				
				// no collision? wall collision
					if (!collision) {
						var collision = findWallCollision(emitter)
					}

				// draw segment
					context.beginPath()
					context.strokeStyle = emitter.color
					context.lineWidth = 2

					context.moveTo(emitter.x, emitter.y)
					context.lineTo(collision.x, collision.y)
					context.stroke()

				// continue ?
					if (collision.line) {
						if (collision.line.type == "mirror") {
							var lineA = findAngle(collision.line.start.x, collision.line.start.y, collision.line.end.x, collision.line.end.y)

							drawLaser({
								x: collision.x,
								y: collision.y, 
								a: findReflection(emitter.a, lineA),
								color: emitter.color
							})
						}
						else if (collision.line.type == "filter" && collision.line.color == emitter.color) {
							drawLaser({
								x: collision.x,
								y: collision.y,
								a: emitter.a,
								color: emitter.color
							})
						}
					}
			}

	/*** cursor ***/
		/* selectItem */
			function selectItem(event) {
				var foundItems = findItems(position.x, position.y) || []
				if (foundItems.length) {
					selected = {
						item: foundItems[0],
						x: position.x - foundItems[0].x,
						y: position.y - foundItems[0].y
					}
				}
			}

		/* rotateItem */
			function rotateItem(event) {
				selected.item.a = findAngle(position.x, position.y, selected.item.x, selected.item.y)
			}

		/* moveItem */
			function moveItem(event) {
				selected.item.x = position.x - selected.x
				selected.item.y = position.y - selected.y
			}

		/* unselectItem */
			function unselectItem(event) {
				selected = {}
			}

	/*** items ***/
		/* createItem */
			function createItem(event) {
				items.push({
					id: generateRandom(),
					x: position.x,
					y: position.y,
					a: 45,
					r: 10,
					type: tool,
					color: color
				})

				selectTool({target: controls.querySelector("#cursor")})
			}

		/* eraseItems */
			function eraseItems(event) {
				// items
					var foundIds = findItems(position.x, position.y).map(function(item) {
						return item.id
					})

					items = items.filter(function(item) {
						return !foundIds.includes(item.id)
					})

				// lines
					var foundIds = findLines(position.x, position.y).map(function(line) {
						return line.id
					})

					lines = lines.filter(function(line) {
						return !foundIds.includes(line.id)
					})
			}

		/* findItems */
			function findItems(x, y) {
				return items.filter(function(item) {
					return findDistance(item.x, item.y, position.x, position.y) < item.r
				}) || []
			}

		/* findLines */
			function findLines(x, y) {
				return lines.filter(function(line) {
					return ((findDistance(line.start.x, line.start.y, position.x, position.y) < 10)
						 || (findDistance(line.end.x  , line.end.y  , position.x, position.y) < 10))
				}) || []
			}

	/*** lines ***/
		/* startLine */
			function startLine(event) {
				// color
					switch (tool) {
						case "mirror":
							var lineColor = "#555555"
						break
						case "block":
							var lineColor = "#000000"
						break
						case "filter":
							var lineColor = color
						break
					}

				// create line
					selected.item = {
						id: generateRandom(),
						type: tool,
						color: lineColor,
						start: {
							x: position.x,
							y: position.y
						},
						end: {
							x: position.x,
							y: position.y
						}
					}

					lines.push(selected.item)
			}

		/* endLine */
			function endLine(event) {
				selected.item.end.x = position.x
				selected.item.end.y = position.y
			}

	/*** geometry ***/
		/* findDistance */
			function findDistance(x1, y1, x2, y2) {
				return Math.round(Math.pow(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2), 0.5) * 1000000) / 1000000
			}

		/* findRadians */
			function findRadians(degrees) {
				return Math.round(degrees / 180 * Math.PI * 1000000) / 1000000
			}

		/* findAngle */
			function findAngle(x1, y1, x2, y2) {
				return Math.round((Math.atan2(y2 - y1, x2 - x1) / Math.PI * 180 * -1) + 180)
			}

		/* findReflection */
			function findReflection(laserA, lineA) {
				return Math.round((lineA + lineA - laserA + 360) % 360)
			}

		/* findSlope */
			function findSlope(angle) {
				return Math.round((Math.tan(angle * Math.PI / 180) * -1) * 1000000) / 1000000
			}

		/* findIntercept */
			function findIntercept(x, y, m) {
				return Math.round((y - m * x) * 1000000) / 1000000
			}		

		/* findIntersection */
			function findIntersection(item, line) {
				// line
					var lineA = findAngle(line.start.x, line.start.y, line.end.x, line.end.y)
					var lineM = findSlope(lineA)
					var lineB = findIntercept(line.start.x, line.start.y, lineM)

				// laser
					var a = (item.a + 360) % 360
					var m = findSlope(a)
					var b = findIntercept(item.x, item.y, m)

				// calculate intersection
					if (a == 90 || a == 270) {
						var x = item.x
						var y = Math.round((lineM * x + lineB) * 1000000) / 1000000
					}
					else if (lineA == 90 || lineA == 270) {
						var x = line.start.x
						var y = Math.round((m * x + b) * 1000000) / 1000000
					}
					else {
						var x = Math.round(((lineB - b) / (m - lineM)) * 1000000) / 1000000
						var y = Math.round((lineM * x + lineB) * 1000000) / 1000000
					}

				// within segment?
					if (((line.start.x <= x && x <= line.end.x) || (line.start.x >= x && x >= line.end.x))
					 && ((line.start.y <= y && y <= line.end.y) || (line.start.y >= y && y >= line.end.y))
					 && (findAngle(x, y, item.x, item.y) == a)) {
						return {
							x: x,
							y: y
						}
					}
					else {
						return null
					}
			}		

		/* findWallCollision */
			function findWallCollision(item) {
				// line equation
					var a = (item.a + 360) % 360
					var m = findSlope(a)
					var b = findIntercept(item.x, item.y, m)

				// intersection points
					var leftY   = Math.round(((m * 0) + b)             * 1000) / 1000
					var rightY  = Math.round(((m * canvas.width) + b)  * 1000) / 1000
					var topX    = Math.round(((0 - b) / m)             * 1000) / 1000
					var bottomX = Math.round(((canvas.height - b) / m) * 1000) / 1000

					var wallCollision = {}

				// q1
					if (a >= 0 && a <= 90) {
						if (rightY >= 0 && rightY <= canvas.height) {
							wallCollision.x = canvas.width
							wallCollision.y = rightY
						}
						else if (topX >= 0 && topX <= canvas.width) {
							wallCollision.x = topX
							wallCollision.y = 0
						}
					}

				// q2
					else if (a >= 90 && a <= 180) {
						if (leftY >= 0 && leftY <= canvas.height) {
							wallCollision.x = 0
							wallCollision.y = leftY
						}
						else if (topX >= 0 && topX <= canvas.width) {
							wallCollision.x = topX
							wallCollision.y = 0
						}
					}

				// q3
					else if (a >= 180 && a <= 270) {
						if (leftY >= 0 && leftY <= canvas.height) {
							wallCollision.x = 0
							wallCollision.y = leftY
						}
						else if (bottomX >= 0 && bottomX <= canvas.width) {
							wallCollision.x = bottomX
							wallCollision.y = canvas.height
						}
					}

				// q4
					else if (a >= 270 && a <= 360) {
						if (rightY >= 0 && rightY <= canvas.height) {
							wallCollision.x = canvas.width
							wallCollision.y = rightY
						}
						else if (bottomX >= 0 && bottomX <= canvas.width) {
							wallCollision.x = bottomX
							wallCollision.y = canvas.height
						}
					}

				return wallCollision
			}

	/*** helpers ***/
		/* generateRandom */
			function generateRandom() {
				var set = "abcdefghijklmnopqrstuvwxyz"
				var length = 8
				var random = ""
				
				while (random.length < length) {
					random += set[Math.floor(Math.random() * set.length)]
				}
				return random
			}	

}