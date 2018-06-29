window.onload = function() {

	/*** onload ***/
		/* arrays */
			var items = []
			var lines = []
			var walls = []
			var tips  = [
				"click to create a laser",
				"use the cursor tool to drag items",
				"long-press or hold shift to rotate",
				"create a prism to split white into colors",
				"create a refractor to alter the angles",
				"long-press or hold shift to resize",
				"draw a wall to block a laser",
				"draw a mirror to reflect a laser",
				"draw a filter to allow only one color through",
				"select other colors to create more emitters",
				"laserSimulator"
			]

		/* interaction */
			var color = "#ffffff"
			var tool = "emitter"
			var selected = {}
			var pressing = false
			var shifting = false
			var holding  = null
			var position = {
				x: null,
				y: null
			}

		/* elements */
			var controls = document.getElementById("controls")
			var message  = document.getElementById("message")
			var canvas   = document.getElementById("canvas")
			var context  = canvas.getContext("2d")

		/* events */
			if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
				var down = "touchstart"
				var move = "touchmove"
				var up   = "touchend"
			}
			else {
				var down = "mousedown"
				var move = "mousemove"
				var up   = "mouseup"
			}

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
						var recursionCount = 0
						drawLaser(emitter, recursionCount)
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
				if (event.key == "Shift") {
					shifting = false
				}
			})

		/* resize */
			resizeCanvas()
			window.addEventListener("resize", resizeCanvas)
			function resizeCanvas(event) {
				canvas.height = window.innerHeight
				canvas.width  = window.innerWidth

				walls = [
					{ start: { x: 0,            y: 0             },  	// top
					  end:   { x: canvas.width, y: 0             } },
					{ start: { x: 0,            y: canvas.height }, 	// bottom
					  end:   { x: canvas.width, y: canvas.height } },
					{ start: { x: 0,            y: 0             },		// left
					  end:   { x: 0,            y: canvas.height } },
					{ start: { x: canvas.width, y: 0             },		// right
					  end:   { x: canvas.width, y: canvas.height } }
				]
			}

		/* mousedown */
			document.addEventListener(down, downMouse)
			function downMouse(event) {
				position.x = event.clientX || event.touches[0].clientX
				position.y = event.clientY || event.touches[0].clientY
				pressing = true
				holding  = new Date().getTime()

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
			document.addEventListener(move, moveMouse)
			function moveMouse(event) {
				position.x = event.clientX || event.touches[0].clientX
				position.y = event.clientY || event.touches[0].clientY

				if (pressing && selected.item == "controls") {
					moveControls(event)
				}
				else if (pressing) {
					if (tool == "eraser") {
						eraseItems(event)
					}
					else if (["mirror", "block", "filter"].includes(tool) && selected.item) {
						endLine(event)
					}
					else if (tool == "cursor" && selected.item) {
						if (holding && (new Date().getTime() - holding > 1000)) {
							shifting = true
						}

						if (shifting && selected.item.type == "emitter") {
							rotateItem(event)	
						}
						else if (shifting && selected.item.type == "prism") {
							rotateItem(event)
						}
						else if (shifting && selected.item.type == "refractor") {
							resizeItem(event)
						}
						else if (!shifting && selected.item) {
							moveItem(event)
						}
					}
				}

				holding = null
			}

		/* mouseup */
			document.addEventListener(up, upMouse)
			function upMouse(event) {
				pressing = false
				shifting = false
				holding  = null

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
				if (tips.length == 1) { displayNextTip() }

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
					drawEmitter(item)
				}
				else if (item.type == "prism") {
					drawPrism(item)	
				}
				else if  (item.type == "refractor") {
					drawRefractor(item)
				}
			}

		/* drawEmitter */
			function drawEmitter(item) {
				var angle = findRadians(item.a) * -1
		
				context.beginPath()
				context.strokeStyle = item.color
				context.lineWidth = 3

				context.arc(item.x, item.y, item.r, angle + (Math.PI / 4), angle - (Math.PI / 4), false)
				context.stroke()
			}

		/* drawPrism */
			function drawPrism(item) {
				var sides = findTriangle(item)

				context.beginPath()
				context.fillStyle = "#ffff00"
				context.moveTo(sides[0].start.x, sides[0].start.y)
				context.lineTo(sides[1].start.x, sides[1].start.y)
				context.lineTo(sides[2].start.x, sides[2].start.y)
				context.fill()
			}

		/* drawRefractor */
			function drawRefractor(item) {
				context.beginPath()
				context.fillStyle = "#00ffff"
				context.arc(item.x, item.y, item.r, 0, 2 * Math.PI, true)
				context.fill()
			}

		/* drawLine */
			function drawLine(line) {
				context.beginPath()
				context.strokeStyle = line.color
				context.lineWidth   = line.type ? 3 : 2

				context.moveTo(line.start.x, line.start.y)
				context.lineTo(line.end.x, line.end.y)

				context.stroke()
			}

		/* drawLaser */
			function drawLaser(emitter, recursionCount) {
				var collisions = []

				// get line collisions
					for (var l in lines) {
						var intersection = findLineIntersection(emitter, lines[l])
						if (intersection) {
							intersection.line = lines[l]
							collisions.push(intersection)
						}
					}

				// get refractor / prism collisions
					for (var i in items) {
						if (items[i].type == "refractor") {
							var intersection = findCircleIntersection(emitter, items[i])
							if (intersection) {
								intersection.line = items[i]
								collisions.push(intersection)
							}
						}
						else if (items[i].type == "prism") {
							var intersection = findTriangleIntersection(emitter, items[i])
							if (intersection) {
								intersection.line = items[i]
								collisions.push(intersection)
							}
						}
					}

				// no collisions? wall
					if (!collisions.length) {
						for (var w in walls) {
							var intersection = findLineIntersection(emitter, walls[w])
							if (intersection) {
								intersection.line = walls[w]
								collisions.push(intersection)
							}
						}
					}

				// find closest
					var collision = findClosest(emitter, collisions) || null

				// draw segment
					if (collision) {
						drawLine({
							color: emitter.color,
							start: {x: emitter.x,   y: emitter.y  },
							end:   {x: collision.x, y: collision.y}
						})
					}

				// continue ?
					if (collision && collision.line.type == "mirror" && recursionCount <= 100) {
						var lineA = findAngle(collision.line.start.x, collision.line.start.y, collision.line.end.x, collision.line.end.y)

						drawLaser({
							x: collision.x,
							y: collision.y, 
							a: findReflection(emitter.a, lineA),
							color: emitter.color
						}, ++recursionCount)
					}
					else if (collision && collision.line.type == "refractor" && recursionCount <= 100) {
						var normalA = findAngle(collision.x, collision.y, collision.line.x, collision.line.y)

						drawLaser({
							x: collision.x,
							y: collision.y,
							a: findRefraction(normalA, emitter.a, 1.5),
							color: emitter.color
						}, ++recursionCount)
					}
					else if (collision && collision.line.type == "prism" && recursionCount <= 100) {
						var normalA = findAngle(collision.x, collision.y, collision.line.x, collision.line.y)

						if (emitter.color == "#ffffff") {
							drawLaser({
								x: collision.x,
								y: collision.y,
								a: findRefraction(normalA, emitter.a, 1.25),
								color: "#ff0000"
							}, ++recursionCount)

							drawLaser({
								x: collision.x,
								y: collision.y,
								a: findRefraction(normalA, emitter.a, 1.5),
								color: "#00ff00"
							}, ++recursionCount)

							drawLaser({
								x: collision.x,
								y: collision.y,
								a: findRefraction(normalA, emitter.a, 1.75),
								color: "#0000ff"
							}, ++recursionCount)
						}
						else {
							drawLaser({
								x: collision.x,
								y: collision.y,
								a: findMin(emitter.a),
								color: emitter.color
							}, recursionCount)
						}
					}
					else if (collision && collision.line.type == "filter" && collision.line.color == emitter.color) {
						drawLaser({
							x: collision.x,
							y: collision.y,
							a: findMin(emitter.a),
							color: emitter.color
						}, recursionCount)
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
				if (tips.length == 8) { displayNextTip() }

				selected.item.a = findAngle(position.x, position.y, selected.item.x, selected.item.y)
			}

		/* resizeItem */
			function resizeItem(event) {
				if (tips.length == 5) { displayNextTip() }

				selected.item.r = findDistance(position.x, position.y, selected.item.x, selected.item.y)
			}

		/* moveItem */
			function moveItem(event) {
				if (tips.length == 9) { displayNextTip() }

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
				if (tips.length) {
					if (tips.length == 10 && tool == "emitter"  ) { displayNextTip() }
					if (tips.length ==  7 && tool == "prism"    ) { displayNextTip() }
					if (tips.length ==  6 && tool == "refractor") { displayNextTip() }
				}

				items.push({
					id: generateRandom(),
					x: position.x,
					y: position.y,
					a:     (tool == "emitter" ?    45 : 90  ),
					r:     (tool == "emitter" ?    10 : 30  ),
					color: (tool == "emitter" ? color : null),
					type:   tool
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
				if (tips.length) {
					if (tips.length == 4 && tool == "block" ) { displayNextTip() }
					if (tips.length == 3 && tool == "mirror") { displayNextTip() }
					if (tips.length == 2 && tool == "filter") { displayNextTip() }
				}

				selected.item.end.x = position.x
				selected.item.end.y = position.y
			}

		/* findLines */
			function findLines(x, y) {
				return lines.filter(function(line) {
					return ((findDistance(line.start.x, line.start.y, position.x, position.y) < 10)
						 || (findDistance(line.end.x  , line.end.y  , position.x, position.y) < 10))
				}) || []
			}

	/*** geometry ***/
		/* findDistance */
			function findDistance(x1, y1, x2, y2) {
				return roundNumber( Math.pow(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2), 0.5) )
			}

		/* findDegrees */
			function findDegrees(radians) {
				return findMin(roundNumber( (radians * 180 / Math.PI) ))
			}

		/* findRadians */
			function findRadians(degrees) {
				return roundNumber( degrees / 180 * Math.PI )
			}

		/* findAngle */
			function findAngle(x1, y1, x2, y2) {
				return findMin(roundNumber( (Math.atan2(y2 - y1, x2 - x1) / Math.PI * 180 * -1) + 180))
			}

		/* findMin */
			function findMin(angle) {
				return roundNumber( (angle + 360) % 360 )
			}

		/* findReflection */
			function findReflection(laserA, lineA) {
				return findMin( roundNumber( lineA + lineA - laserA ) )
			}

		/* findRefraction */
			function findRefraction(normal, emitter, index) {
				var a = findRadians(normal - emitter)

				if (Math.cos(a) < 0) {
					return findMin(roundNumber( normal + findDegrees(Math.asin(Math.sin(a) / index)) - 180 ))
				}
				else {
					return findMin(emitter)
				}
			}

		/* findSlope */
			function findSlope(angle) {
				if (angle == 90 || angle == 270) {
					return NaN
				}
				else {
					return roundNumber( Math.tan(angle * Math.PI / 180) * -1 )
				}
			}

		/* findIntercept */
			function findIntercept(x, y, m) {
				if (typeof m !== "number") {
					return NaN
				}
				else {
					return roundNumber( y - m * x )
				}
			}		

		/* findClosest */
			function findClosest(target, options) {
				var closest = null
				var minumum = 1000000

				for (var o in options) {
					var distance = findDistance(target.x, target.y, options[o].x, options[o].y)
					if (0 < distance && distance < minumum) {
						minumum = distance
						closest = options[o]
					}
				}

				return closest
			}

		/* findLineIntersection */
			function findLineIntersection(emitter, line) {
				// emitter
					var a = findMin(emitter.a)
					var m = findSlope(a)
					var b = findIntercept(emitter.x, emitter.y, m)

				// line
					var lineA = findAngle(line.start.x, line.start.y, line.end.x, line.end.y)
					var lineM = findSlope(lineA)
					var lineB = findIntercept(line.start.x, line.start.y, lineM)

				// calculate (x, y)
					if (a == 90 || a == 270) {
						var x = emitter.x
						var y = roundNumber( lineM * x + lineB )
					}
					else if (lineA == 90 || lineA == 270) {
						var x = line.start.x
						var y = roundNumber( m * x + b )
					}
					else {
						var x = roundNumber( (lineB - b) / (m - lineM) )
						var y = roundNumber( lineM * x + lineB )
					}

				// within segment?
					if (((line.start.x <= x && x <= line.end.x) || (line.start.x >= x && x >= line.end.x))
					 && ((line.start.y <= y && y <= line.end.y) || (line.start.y >= y && y >= line.end.y))
					 && (Math.round(findAngle(x, y, emitter.x, emitter.y) + 360) % 360 == Math.round(a + 360) % 360)) {
						return {
							x: x,
							y: y
						}
					}
					else {
						return null
					}
			}

		/* findTriangle */
			function findTriangle(triangle) {
				// corners
					var x1 = roundNumber( triangle.x + triangle.r * Math.sin(findRadians(triangle.a + 90)) )
					var y1 = roundNumber( triangle.y + triangle.r * Math.cos(findRadians(triangle.a + 90)) )

					var x2 = roundNumber( triangle.x + triangle.r * Math.sin(findRadians(triangle.a + 210)) )
					var y2 = roundNumber( triangle.y + triangle.r * Math.cos(findRadians(triangle.a + 210)) )

					var x3 = roundNumber( triangle.x + triangle.r * Math.sin(findRadians(triangle.a + 330)) )
					var y3 = roundNumber( triangle.y + triangle.r * Math.cos(findRadians(triangle.a + 330)) )

				// sides
					return [
						{start: {x: x1, y: y1}, end: {x: x2, y: y2}},
						{start: {x: x2, y: y2}, end: {x: x3, y: y3}},
						{start: {x: x3, y: y3}, end: {x: x1, y: y1}}
					]
			}

		/* findTriangleIntersection */
			function findTriangleIntersection(emitter, triangle) {
				// emitter
					var a = findMin(emitter.a)
					var m = findSlope(a)
					var b = findIntercept(emitter.x, emitter.y, m)

				// triangle
					var sides = findTriangle(triangle)

				// collisions
					var collisions = []
					for (var s in sides) {
						var collision = findLineIntersection(emitter, sides[s])
						if (collision) {
							collisions.push(collision)
						}
					}

				// closest
					return findClosest(emitter, collisions) || null
			}

		/* findCircleIntersection */
			function findCircleIntersection(emitter, circle) {
				// emitter
					var a = findMin(emitter.a)
					var m = findSlope(a)
					var b = findIntercept(emitter.x, emitter.y, m)

				// circle
					var h = circle.x
					var k = circle.y
					var r = circle.r
				
				// intersection points
					if (a == 90 || a == 270) {
						var z = (-2*k)**2 - (4 * (emitter.x**2 - emitter.x*h*2 + h**2 + k**2 - r**2))
						
						var x1 = roundNumber(emitter.x)
						var y1 = (2*k + Math.pow(z, 0.5)) / 2
							y1 = roundNumber(y1)
						
						var x2 = roundNumber(emitter.x)
						var y2 = (2*k - Math.pow(z, 0.5)) / 2
							y2 = roundNumber(y2)
					}
					else {
						var z  = (r**2 * (1 + m**2)) - ((k - m*h - b)**2)
						
						var x1 = ((h + k*m - b*m) + Math.pow(z, 0.5)) / (1 + m**2)
							x1 = roundNumber(x1)
						var y1 = roundNumber( m * x1 + b )
						
						var x2 = ((h + k*m - b*m) - Math.pow(z, 0.5)) / (1 + m**2)
							x2 = roundNumber(x2)
						var y2 = roundNumber( m * x2 + b )
					}

				// validate angles
					var a1 = Math.round(findAngle(x1, y1, emitter.x, emitter.y))
					var a2 = Math.round(findAngle(x2, y2, emitter.x, emitter.y))

				// closest
					if (a1 == Math.round(emitter.a) && a2 == Math.round(emitter.a)) {
						return findClosest(emitter, [{x: x1, y: y1}, {x: x2, y: y2}])
					}
					else if (a1 == Math.round(emitter.a)) {
						return {x: x1, y: y1}
					}
					else if (a2 == Math.round(emitter.a)) {
						return {x: x2, y: y2}
					}
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

		/* roundNumber */
			function roundNumber(n) {
				return Math.round(n * 1000000) / 1000000
			}

		/* displayNextTip */
			displayNextTip()
			function displayNextTip() {
				message.innerText = tips[0]
				tips.shift()
			}
}