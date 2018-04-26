window.onload = function() {

	/*** globals ***/
		var state = {
			paused: false,
			selected: null,
			changing: false,
			changed: false,
			held: false,
			moved: false,
			tips: ["doubleclick to create/remove an orb", "click to change an orb's polarity: red & blue attract", "hold & drag to move an orb", "hold an orb in place for 1 second to stop it", "shift-drag to change orb size", "press space to pause", "magnetMaker"],
			magnetism: 4,
			friction: 0,
			elasticity: 1,
			gravity: 0,
			wind: 0,
			maxspeed: 5
		}
		window.state = state
	
	/*** create / remove magnet ***/
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
						if (state.tips.length == 6) {
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

	/*** move magnet ***/
		/* selectMagnet */
			function selectMagnet(event) {
				// unselect others
					unselectMagnet()

				if (event.target.className == "magnet") {
					// select magnet
						state.selected = event.target
						state.selected.setAttribute("selected", true)

					// style field
						document.getElementById("field").setAttribute("dragging", true)
						state.held = new Date().getTime()

					// tips
						if (state.tips.length == 4) {
							updateInstructions()
						}
				}
			}

		/* moveMagnet */
			document.addEventListener("mousemove", moveMagnet)
			function moveMagnet(event) {
				// change mass
					if (state.selected && state.changing) {
						changeMass(event)
					}

				// move & set physics
					else if (state.selected) {
						state.moved = true
						state.selected.style.left   = event.clientX + "px"
						state.selected.style.bottom = (window.innerHeight - event.clientY) + "px"

						state.selected.setAttribute("x", event.clientX)
						state.selected.setAttribute("y", window.innerHeight - event.clientY)

						state.held = new Date().getTime()
					}					
			}

		/* unselectMagnet */
			function unselectMagnet(event) {
				if (state.selected) {
					// held for 1 second --> v = 0
						if (state.held && (new Date().getTime() - state.held > 1000)) {
							state.selected.setAttribute("vx", 0)
							state.selected.setAttribute("vy", 0)

							if (state.tips.length == 3) {
								updateInstructions()
							}
						}

					// just a click --> flip polarity
						else if (!state.moved && !state.changed) {
							flipMagnet(state.selected)
						}

					// reset stuff
						state.selected.removeAttribute("selected")
						state.selected = null
						state.moved = false
						state.changed = false

						document.getElementById("field").removeAttribute("dragging")
				}
			}

	/*** alter magnet ***/
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
						if (state.tips.length == 5) {
							updateInstructions()
						}
				}
			}

		/* startChanging */
			document.addEventListener("keydown", startChanging)
			function startChanging(event) {
				if (event.keyCode == 16) { // SHIFT
					// set changing
						state.changing = true
				}
				else if (event.keyCode == 32) { // SPACE
					// pause / unpause
						if (state.paused) {
							state.paused = false
							document.getElementById("settings").removeAttribute("visible")
						}
						else {
							state.paused = true
							document.getElementById("settings").setAttribute("visible", true)
						}
					
					// tips
						if (state.tips.length == 1) {
							updateInstructions()
						}
				}
			}

		/* stopChanging */
			document.addEventListener("keyup", stopChanging)
			function stopChanging(event) {
				if (event.keyCode == 16) { // SHIFT
					// unset changing
						state.changing = false
				}
			}

		/* changeMass */
			function changeMass(event) {
				// get position
					var x = Number(state.selected.getAttribute("x"))
					var y = Number(state.selected.getAttribute("y"))

				// calculate distance to cursor
					var cx = event.clientX
					var cy = window.innerHeight - event.clientY

					var d = Math.abs(getScalar(getDifference(cx, x), getDifference(cy, y)))

				// update mass and size
					state.selected.setAttribute("m", d)
					state.selected.style.height = d * 2 + "px"
					state.selected.style.width  = d * 2 + "px"
					state.changed = true

				// tips
					if (state.tips.length == 2) {
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

		/* getScalar */
			function getScalar(x, y) {
				// pythagorean theorem
					var scalar = Math.pow(Math.pow(x, 2) + Math.pow(y, 2), 0.5)
					return scalar
			}

		/* getAngle */
			function getAngle(x, y) {
				// SOH CAH TOA
					var tangent = y / x

				// arctangent, with multipliers for quadrant
					var angle = Math.atan(tangent)
					return angle
			}

	/*** magnet interaction ***/
		/* magnetLoop */
			var magnetLoop = setInterval(function() {
				if (!state.paused) {
					// get magnets and empty forces object
						var magnets = Array.from(document.querySelectorAll(".magnet")) || []
						var forces = resetForces(magnets)
						var collisions = []

					// calculate magnetic force
						magnets.forEach(function (magnet) {
							var data = updateForce(magnet, magnets, forces, collisions)
							forces = data[0]
							collisions = data[1]
						})

					// calculate gravity
						magnets.forEach(function (magnet) {
							forces = updateGravity(magnet, forces)
						})

					// update velocities for each collision
						collisions.forEach(function (collision) {
							updateCollision(collision)
						})

					// update the velocities for each magnet
						magnets.forEach(function (magnet) {
							updateVelocity(magnet, forces, collisions)
						})

					// draw the new positions
						magnets.forEach(function (magnet) {
							updatePosition(magnet)
						})
				}
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
			function updateForce(magnet1, magnets, forces, collisions) {
				magnets.forEach(function (magnet2) {
					if (magnet2.id !== magnet1.id) {
						// get polarities
							var p1 = Number(magnet1.getAttribute("p"))
							var p2 = Number(magnet2.getAttribute("p"))

						// get coordinates
							var x1 = Number(magnet1.style.left.replace(  "px", ""))
							var y1 = Number(magnet1.style.bottom.replace("px", ""))

							var x2 = Number(magnet2.style.left.replace(  "px", ""))
							var y2 = Number(magnet2.style.bottom.replace("px", ""))

						// get differences
							var dx = getDifference(x1, x2)
							var dy = getDifference(y1, y2)

						// get geometry
							var d = getScalar(dx, dy)
							var a = getAngle( dx, dy) * Math.sign(dx) * Math.sign(dy)

						// get masses / radii
							var m1 = Number(magnet1.getAttribute("m"))
							var m2 = Number(magnet2.getAttribute("m")) 

						// magnetic force
							if (p1 !== 0 && p2 !== 0) {
								// calculate force
									var f = state.magnetism * m1 * m2 / Math.pow(d, 2)
								
								// flip for same polarities
									if (p1 == p2) {
										f = f *= -1
									}

								// split into x and y
									forces[magnet2.id].x += (f * Math.cos(a) * Math.sign(dx))
									forces[magnet2.id].y += (f * Math.sin(a) * Math.sign(dy))
							}

						// collision? --> update velocities
							if ((d < m1 + m2)) {
								if (!collisions.filter(function (collision) {
									return (collision.includes(magnet1.id) && collision.includes(magnet2.id))
								}).length) {
									collisions.push([magnet1.id, magnet2.id])
								}
							}
					}
				})

				return [forces, collisions]
			}

		/* updateGravity */
			function updateGravity(magnet, forces) {
				forces[magnet.id].y -= state.gravity
				forces[magnet.id].x += state.wind

				return forces
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

				// calculate friction
					vx = Math.min(state.maxspeed, Math.max(state.maxspeed * -1, (vx + ax) * (1 - Math.pow(state.friction, 2))))
					vy = Math.min(state.maxspeed, Math.max(state.maxspeed * -1, (vy + ay) * (1 - Math.pow(state.friction, 2))))

				// calculate new velocity
					magnet.setAttribute("vx", vx)
					magnet.setAttribute("vy", vy)
			}

		/* updateCollision */
			function updateCollision(collision) {
				// magnets
					var magnet1 = document.getElementById(collision[0])
					var magnet2 = document.getElementById(collision[1])

				// m
					var m1 = Number(magnet1.getAttribute("m"))
					var m2 = Number(magnet2.getAttribute("m"))
					var m  = m1 + m2

				// x & y
					var x1 = Number(magnet1.getAttribute("x"))
					var y1 = Number(magnet1.getAttribute("y"))
					var x2 = Number(magnet2.getAttribute("x"))
					var y2 = Number(magnet2.getAttribute("y"))
					var dx = getDifference(x2, x1)
					var dy = getDifference(y2, y1)

				// acceleration
					var angle = Math.atan2(dy, dx)
					var ax    = ( (Math.cos(angle) * m) + (x1 - x2) ) * state.elasticity
					var ay    = ( (Math.sin(angle) * m) + (y1 - y2) ) * state.elasticity

				// vx & vy (initial)
					var vx1 = Number(magnet1.getAttribute("vx"))
					var vy1 = Number(magnet1.getAttribute("vy"))
					var vx2 = Number(magnet2.getAttribute("vx"))
					var vy2 = Number(magnet2.getAttribute("vy"))

				// vx & vy (final)
					vx1 = Math.min(state.maxspeed, Math.max(state.maxspeed * -1, vx1 - (ax * m2 / m)))
					vy1 = Math.min(state.maxspeed, Math.max(state.maxspeed * -1, vy1 - (ay * m2 / m)))
					vx2 = Math.min(state.maxspeed, Math.max(state.maxspeed * -1, vx2 + (ax * m1 / m)))
					vy2 = Math.min(state.maxspeed, Math.max(state.maxspeed * -1, vy2 + (ay * m1 / m)))

				// vx & vy (final)
					magnet1.setAttribute("vx", vx1)
					magnet1.setAttribute("vy", vy1)
					magnet2.setAttribute("vx", vx2)
					magnet2.setAttribute("vy", vy2)
			}

		/* updatePosition */
			function updatePosition(magnet) {
				if (!state.selected || state.selected.id !== magnet.id) {
					// get position & velocity
						var m = Number(magnet.getAttribute("m"))
						var x = Number(magnet.getAttribute("x"))
						var y = Number(magnet.getAttribute("y"))
						var vx = Math.min(state.maxspeed, Math.max(state.maxspeed * -1, Number(magnet.getAttribute("vx"))))
						var vy = Math.min(state.maxspeed, Math.max(state.maxspeed * -1, Number(magnet.getAttribute("vy"))))

					// update x position or velocity
						if (x + vx - m <= 0) { // left
							magnet.setAttribute("vx", vx * -1)
							magnet.setAttribute("x", m)
							magnet.style.left = m + "px"
						}
						else if (x + vx + m >= window.innerWidth) { // right
							magnet.setAttribute("vx", vx * -1)
							magnet.setAttribute("x", window.innerWidth - m)
							magnet.style.left = window.innerWidth - m + "px"
						}
						else {
							magnet.setAttribute("x", x + vx)
							magnet.style.left = x + "px"
						}

					// update y position or velocity
						if (y + vy - m <= 0) { // bottom
							magnet.setAttribute("vy", vy * -1)
							magnet.setAttribute("y", m)
							magnet.style.bottom = m + "px"
						}
						else if (y + vy + m >= window.innerHeight) { // top
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

	/*** instructions / settings ***/
		/* updateInstructions */
			updateInstructions()
			function updateInstructions() {
				// update instructions element
					var instructions = document.getElementById("instructions")
						instructions.innerHTML = state.tips[0] || ""

				// remove first tip
					state.tips.shift()
			}

		/* updateSettings */
			Array.from(document.querySelectorAll("#settings input")).forEach(function(input) {
				input.addEventListener("change", updateSettings)
			})
			function updateSettings(event) {
				if (event.target.tagName.toLowerCase() == "input") {
					var input = event.target.id.replace("-slider", "")
					state[input] = Number(event.target.value)
				}
			}
}
