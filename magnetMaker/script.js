window.onload = function() {
	
	/*** create / remove ***/
		/* createMagnet */
			document.getElementById("field").addEventListener("dblclick", createMagnet)
			function createMagnet(event) {
				if (event.target.id == "field") {
					// create element
						var magnet = document.createElement("div")
							magnet.className = "magnet"
							magnet.id = generateId()

					// style and position
							magnet.style.left   = event.clientX + "px"
							magnet.style.bottom = (window.innerHeight - event.clientY) + "px"
							magnet.style.height = "40px"
							magnet.style.width  = "40px"

					// physics
							magnet.setAttribute("x", event.clientX)
							magnet.setAttribute("y", window.innerHeight - event.clientY)
							magnet.setAttribute("vx", (Math.random() * 1) - 0.5)
							magnet.setAttribute("vy", (Math.random() * 1) - 0.5)
							magnet.setAttribute("m", 20)
							magnet.setAttribute("p", 0)
					
					// event listeners & append
							magnet.addEventListener("mousedown", selectMagnet)
							magnet.addEventListener("mouseup", unselectMagnet)
							magnet.addEventListener("dblclick", removeMagnet)
						event.target.appendChild(magnet)

					// tips
						if (tips.length == 5) {
							updateInstructions()
						}
				}
			}

		/* removeMagnet */
			function removeMagnet(event) {
				if (event.target.className == "magnet") {
					// remove
						event.target.remove()
				}
			}

	/*** move ***/
		/* selectMagnet */
			var selected = null
			function selectMagnet(event) {
				// unselect others
					unselectMagnet()

				if (event.target.className == "magnet") {
					// select magnet
						selected = event.target
						selected.setAttribute("selected", true)

					// style field
						document.getElementById("field").setAttribute("dragging", true)
						held = new Date().getTime()

					// tips
						if (tips.length == 3) {
							updateInstructions()
						}
				}
			}

		/* moveMagnet */
			var moved = false
			var held = false
			document.addEventListener("mousemove", moveMagnet)
			function moveMagnet(event) {
				// change mass
					if (selected && changing) {
						changeMass(event)
					}

				// move & set physics
					else if (selected) {
						moved = true
						selected.style.left   = event.clientX + "px"
						selected.style.bottom = (window.innerHeight - event.clientY) + "px"

						selected.setAttribute("x", event.clientX)
						selected.setAttribute("y", window.innerHeight - event.clientY)

						held = new Date().getTime()
					}					
			}

		/* unselectMagnet */
			function unselectMagnet(event) {
				if (selected) {
					// held for 1 second --> v = 0
						if (held && (new Date().getTime() - held > 1000)) {
							selected.setAttribute("vx", 0)
							selected.setAttribute("vy", 0)

							if (tips.length == 2) {
								updateInstructions()
							}
						}

					// just a click --> flip polarity
						else if (!moved && !changed) {
							flipMagnet(selected)
						}

					// reset stuff
						selected.removeAttribute("selected")
						selected = null
						moved = false
						changed = false
						lastMoved = false

						document.getElementById("field").removeAttribute("dragging")
				}
			}

	/*** alter ***/
		/* flipMagnet */
			function flipMagnet(magnet) {
				if (magnet.className == "magnet") {
					// get polarity
						var p = Number(magnet.getAttribute("p"))

					// flip polarity
						if      (p == -1) { p =  0 }
						else if (p ==  0) { p =  1 }
						else if (p ==  1) { p = -1 }
						magnet.setAttribute("p", p)

					// tips
						if (tips.length == 4) {
							updateInstructions()
						}
				}
			}

		/* startChanging */
			var changing = false
			var changed  = false
			document.addEventListener("keydown", startChanging)
			function startChanging(event) {
				if (event.keyCode == 16) { // SHIFT
					// set changing
						changing = true
				}
			}

		/* stopChanging */
			document.addEventListener("keyup", stopChanging)
			function stopChanging(event) {
				if (event.keyCode == 16) { // SHIFT
					// unset changing
						changing = false
				}
			}

		/* changeMass */
			function changeMass(event) {
				// get position
					var x = Number(selected.getAttribute("x"))
					var y = Number(selected.getAttribute("y"))

				// calculate distance to cursor
					var cx = event.clientX
					var cy = window.innerHeight - event.clientY

					var d = Math.abs(getDistance(getDifference(cx, x), getDifference(cy, y)))

				// update mass and size
					selected.setAttribute("m", d)
					selected.style.height = d * 2 + "px"
					selected.style.width  = d * 2 + "px"
					changed = true

				// tips
					if (tips.length == 1) {
						updateInstructions()
					}				
			}

	/*** helpers ***/
		/* generateId */
			function generateId() {
				// set of letters
					var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]

				// 8-character id
					var id = ""
					while (id.length < 8) {
						id += alphabet[Math.floor(Math.random() * alphabet.length)]
					}

				// return
					return id
			}

		/* getDifference */
			function getDifference(a, b) {
				// multiply up, divide down (to preserve significant digits)
					var difference = ((1000 * a) - (1000 * b)) / 1000
					return difference
			}

		/* getDistance */
			function getDistance(dx, dy) {
				// pythagorean theorem
					var distance = Math.pow(Math.pow(dx, 2) + Math.pow(dy, 2), 0.5)
					return distance
			}

		/* getAngle */
			function getAngle(dx, dy) {
				// SOH CAH TOA
					var tangent = (dy) / (dx)

				// arctangent, with multipliers for quadrant
					var angle = Math.atan(tangent) * Math.sign(dx) * Math.sign(dy)
					return angle
			}

	/*** magnet interaction ***/
		/* magnetLoop */
			var magnetLoop = setInterval(function() {
				// get magnets and empty forces object
					var magnets = Array.from(document.querySelectorAll(".magnet")) || []
					var forces = resetForces(magnets)
					var collisions = []

				// calculate positions
					magnets.forEach(function (magnet) {
						var data = updateForce(magnet, magnets, forces, collisions)
							forces = data[0]
							collisions = data[1]
					})

				// update the velocities for each magnet
					magnets.forEach(function (magnet) {
						updateVelocity(magnet, forces, collisions)
					})

				// update velocities for each collision
					collisions.forEach(function (collision) {
						updateCollision(collision)
					})

				// draw the new positions
					magnets.forEach(function (magnet) {
						updatePosition(magnet)
					})
			}, 10)

		/* resetForces */
			function resetForces(magnets) {
				// forces is an empty object
					var forces = {}

				// create x/y pairs for each magnet
					magnets.forEach(function (m) {
						forces[m.id] = {
							x: 0,
							y: 0
						}
					})

				// return
					return forces
			}

		/* updateForce */
			function updateForce(magnet, magnets, forces, collisions) {
				magnets.forEach(function (other) {
					if (other.id !== magnet.id) {
						// get polarities
							var p1 = Number(magnet.getAttribute("p"))
							var p2 = Number( other.getAttribute("p"))

						// get coordinates
							var x1 = Number(magnet.style.left.replace(  "px", ""))
							var y1 = Number(magnet.style.bottom.replace("px", ""))

							var x2 = Number( other.style.left.replace(  "px", ""))
							var y2 = Number( other.style.bottom.replace("px", ""))

						// get differences
							var dx = getDifference(x1, x2)
							var dy = getDifference(y1, y2)

						// get geometry
							var d = getDistance(dx, dy)
							var a = getAngle(   dx, dy)

						// get masses / radii
							var m1 = Number(magnet.getAttribute("m"))
							var m2 = Number( other.getAttribute("m")) 

						// magnetic force
							if (p1 !== 0 && p2 !== 0) {
								// calculate force
									var f = 2 * (m1 * m2) / Math.pow(d, 2)
								
								// flip for same polarities
									if (p1 == p2) {
										f = f *= -1
									}

								// split into x and y
									forces[other.id].x += (f * Math.cos(a) * Math.sign(dx))
									forces[other.id].y += (f * Math.sin(a) * Math.sign(dy))
							}

						// collision? --> update velocities
							if ((d < m1 + m2)) {
								if (!collisions.filter(function (collision) {
									return (collision.includes(magnet.id) && collision.includes(other.id))
								}).length) {
									collisions.push([magnet.id, other.id])
								}
							}
					}
				})

				return [forces, collisions]
			}

		/* updateVelocity */
			function updateVelocity(magnet, forces) {
				// get forces
					var fx = forces[magnet.id].x
					var fy = forces[magnet.id].y

				// get mass and velocities
					var m  = Number(magnet.getAttribute("m"))
					var vx = Number(magnet.getAttribute("vx"))
					var vy = Number(magnet.getAttribute("vy"))

				// calculate acceleration
					var ax = fx / m
					var ay = fy / m

				// calculate new velocity
					magnet.setAttribute("vx", vx + ax)
					magnet.setAttribute("vy", vy + ay)
			}

		/* updateCollision */
			function updateCollision(collision) {
				// magnets
					var magnet1 = document.getElementById(collision[0])
					var magnet2 = document.getElementById(collision[1])

				// m
					var m1   = Number(magnet1.getAttribute("m"))
					var m2   = Number(magnet2.getAttribute("m"))

				// x & y
					var x1 = Number(magnet1.getAttribute("x"))
					var y1 = Number(magnet1.getAttribute("y"))
					var x2 = Number(magnet2.getAttribute("x"))
					var y2 = Number(magnet2.getAttribute("y"))
					var dx = getDifference(x1, x2)
					var dy = getDifference(y1, y2)

				// vx
					var vxi1 = Number(magnet1.getAttribute("vx"))
					var vxi2 = Number(magnet2.getAttribute("vx"))

					var vxc  = ( (m1 * vxi1) + (m2 * vxi2) ) / (m1 + m2)

					var vxf1 = (2 * vxc) - vxi1
					var vxf2 = (2 * vxc) - vxi2

				// vy
					var vyi1 = Number(magnet1.getAttribute("vy"))
					var vyi2 = Number(magnet2.getAttribute("vy"))

					var vyc  = ( (m1 * vyi1) + (m2 * vyi2) ) / (m1 + m2)

					var vyf1 = (2 * vyc) - vyi1
					var vyf2 = (2 * vyc) - vyi2

				// update
					magnet1.setAttribute("vx", vxf1)
					magnet1.setAttribute("vy", vyf1)
					magnet2.setAttribute("vx", vxf2)
					magnet2.setAttribute("vy", vyf2)

					console.log("m1: " + m1 + " | m2: " + m2)
					console.log("dx, dy: " + dx + ", " + dy)

				// get bump
					var x1b = Math.max(1, Math.abs(m2 * dx / (m1 + m2) / (m1 + m2))) * Math.sign(m2 / dx)
					var x2b = Math.max(1, Math.abs(m1 * dx / (m1 + m2) / (m1 + m2))) * Math.sign(m1 / dx)
					var y1b = Math.max(1, Math.abs(m2 * dy / (m1 + m2) / (m1 + m2))) * Math.sign(m2 / dy)
					var y2b = Math.max(1, Math.abs(m1 * dy / (m1 + m2) / (m1 + m2))) * Math.sign(m1 / dy)

					console.log("x1b: " + x1b + " | x2b: " + x2b)
					console.log("y1b: " + y1b + " | y2b: " + y2b)

				// separate
					magnet1.setAttribute("x", x1 + x1b)
					magnet2.setAttribute("x", x2 - x2b)
					magnet1.style.left = x1 + x1b + "px"
					magnet2.style.left = x2 - x2b + "px"

					magnet1.setAttribute("y", y1 + y1b)
					magnet2.setAttribute("y", y2 - y2b)
					magnet1.style.bottom = y1 + y1b + "px"
					magnet2.style.bottom = y2 - y2b + "px"
			}

		/* updatePosition */
			function updatePosition(magnet) {
				if (!selected || selected.id !== magnet.id) {
					// get position & velocity
						var m = Number(magnet.getAttribute("m"))
						var x = Number(magnet.getAttribute("x"))
						var y = Number(magnet.getAttribute("y"))
						var vx = Math.min(100, Math.max(-100, Number(magnet.getAttribute("vx"))))
						var vy = Math.min(100, Math.max(-100, Number(magnet.getAttribute("vy"))))

					// update x position or velocity
						if (x + vx - m <= 0) {
							magnet.setAttribute("vx", vx * -1)
							magnet.setAttribute("x", m)
							magnet.style.left = m + "px"
						}
						else if (x + vx + m >= window.innerWidth) {
							magnet.setAttribute("vx", vx * -1)
							magnet.setAttribute("x", window.innerWidth - m)
							magnet.style.left = window.innerWidth - m + "px"
						}
						else {
							magnet.setAttribute("x", x + vx)
							magnet.style.left = x + "px"
						}

					// update y position or velocity
						if (y + vy - m <= 0) {
							magnet.setAttribute("vy", vy * -1)
							magnet.setAttribute("y", m)
							magnet.style.bottom = m + "px"
						}
						else if (y + vy + m >= window.innerHeight) {
							magnet.setAttribute("vy", vy * -1)
							magnet.setAttribute("y", window.innerHeight - m)
							magnet.style.bottom = window.innerHeight - m + "px"
						}
						else {
							magnet.setAttribute("y", y + vy)
							magnet.style.bottom = y + "px"
						}
				}
			}

	/*** instructions ***/
		/* updateInstructions */
			var tips = ["doubleclick to create/remove an orb", "click to change an orb's polarity: red & blue attract", "hold & drag to move an orb", "hold an orb in place for 1 second to stop it", "shift-drag to change orb size", "magnetMaker"]
			updateInstructions()
			function updateInstructions() {
				// update instructions element
					var instructions = document.getElementById("instructions")
						instructions.innerHTML = tips[0] || ""

				// remove first tip
					tips.shift()
			}
}
