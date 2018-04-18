window.onload = function() {
	
	/*** user interaction ***/
		/* createMagnet */
			document.getElementById("field").addEventListener("dblclick", createMagnet)
			function createMagnet(event) {
				if (event.target.id == "field") {
					var magnet = document.createElement("div")
						magnet.className = "magnet"
						magnet.id = generateId()

						magnet.style.left   = event.clientX + "px"
						magnet.style.bottom = (window.innerHeight - event.clientY) + "px"					
						magnet.setAttribute("magnitude", 1)
						magnet.setAttribute("polarity", 1)
						
						magnet.addEventListener("mousedown", selectMagnet)
						magnet.addEventListener("mouseup", unselectMagnet)
						magnet.addEventListener("dblclick", removeMagnet)
					event.target.appendChild(magnet)
				}
			}

		/* selectMagnet */
			var selected = null
			function selectMagnet(event) {
				unselectMagnet()

				if (event.target.className == "magnet") {
					selected = event.target
				}
			}

		/* moveMagnet */
			var moved = null
			document.addEventListener("mousemove", moveMagnet)
			function moveMagnet(event) {
				if (selected) {
					selected.style.left   = event.clientX + "px"
					selected.style.bottom = (window.innerHeight - event.clientY) + "px"
					moved = true
				}
			}

		/* unselectMagnet */
			function unselectMagnet(event) {
				if (selected) {
					if (moved) {
						selected = null
						moved = null
					}
					else {
						flipMagnet(selected)
						selected = null
					}
				}
			}

		/* flipMagnet */
			function flipMagnet(magnet) {
				if (magnet.className == "magnet") {
					var polarity = Number(magnet.getAttribute("polarity"))
					magnet.setAttribute("polarity", (polarity == 1 ? -1 : 1) )
				}
			}

		/* removeMagnet */
			function removeMagnet(event) {
				if (event.target.className == "magnet") {
					event.target.remove()
				}
			}

	/*** helpers ***/
		/* generateId */
			function generateId() {
				var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]

				var id = ""
				while (id.length < 8) {
					id += alphabet[Math.floor(Math.random() * alphabet.length)]
				}

				return id
			}

		/* getDifference */
			function getDifference(a, b) {
				var difference = ((1000 * a) - (1000 * b)) / 1000
				return difference
			}

		/* getDistance */
			function getDistance(xDiff, yDiff) {
				var distance = Math.pow(Math.pow(xDiff, 2) + Math.pow(yDiff, 2), 0.5)
				return distance
			}

		/* getAngle */
			function getAngle(xDiff, yDiff) {
				var tangent = (yDiff) / (xDiff)
				var angle = Math.atan(tangent) * Math.sign(xDiff) * Math.sign(yDiff)
				return angle
			}

	/*** magnet interaction ***/
		/* magnetLoop */
			var magnetLoop = setInterval(function() {
				// get magnets and empty forces object
					var magnets = Array.from(document.querySelectorAll(".magnet")) || []
					var forces = resetForces(magnets)

				// calculate positions
					magnets.forEach(function (magnet) {
						forces = exertForces(magnet, magnets, forces)
					})

				// draw the new positions
					enactForces(magnets, forces)
			}, 100)

		/* resetForces */
			function resetForces(magnets) {
				var forces = {}

				magnets.forEach(function (m) {
					forces[m.id] = {
						x: 0,
						y: 0
					}
				})

				return forces
			}

		/* exertForces */
			function exertForces(magnet, magnets, forces) {
				magnets.forEach(function (other) {
					if (other.id !== magnet.id) {
						// get coordinates
							var x1 = Number(magnet.style.left.replace(  "px", ""))
							var y1 = Number(magnet.style.bottom.replace("px", ""))

							var x2 = Number( other.style.left.replace(  "px", ""))
							var y2 = Number( other.style.bottom.replace("px", ""))

						// get differences
							var xDiff = getDifference(x1, x2)
							var yDiff = getDifference(y1, y2)

						// get geometry
							var distance = getDistance(xDiff, yDiff)
							var angle    = getAngle(   xDiff, yDiff)

						// touching
							if (distance < 50) {
								var force = 0
							}

						// get force
							else {
								var force = (100000 * magnet.getAttribute("magnitude") * other.getAttribute("magnitude") ) / Math.pow(distance, 2)
							
								if (magnet.getAttribute("polarity") == other.getAttribute("polarity")) {
									force = force *= -1
								}
							}

						// split into x and y
							forces[other.id].x += (force * Math.cos(angle) * Math.sign(xDiff))
							forces[other.id].y += (force * Math.sin(angle) * Math.sign(yDiff))
					}
				})

				return forces
			}

		/* enactForces */
			function enactForces(magnets, forces) {
				magnets.forEach(function (magnet) {
					var force = forces[magnet.id]

					magnet.style.left   = Number(magnet.style.left.replace(  "px","")) + force.x + "px"
					magnet.style.bottom = Number(magnet.style.bottom.replace("px","")) + force.y + "px"
				})
			}

}