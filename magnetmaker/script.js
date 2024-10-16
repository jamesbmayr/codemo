/*** globals ***/
	/* triggers */
		if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
			var on = { click: "touchstart", mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" }
		}
		else {
			var on = { click:      "click", mousedown:  "mousedown", mousemove: "mousemove", mouseup:  "mouseup" }
		}

	/* state */
		var state = {
			paused: false,
			selected: null,
			changing: false,
			shifting: false,
			changed: false,
			held: false,
			moved: false,
			clicked: null,
			tips: [
				(on.click == "click" ? "doubleclick to create/remove an orb" : "doubletap to create/remove an orb"),
				(on.click == "click" ? "click to change an orb's polarity: red & blue attract" : "tap to change an orb's polarity: red & blue attract"),
				"hold & drag to move an orb",
				"hold an orb in place to stop it",
				(on.click == "click" ? "shift-drag to change orb size" : "hold and drag a stopped orb to change size"),
				(on.click == "click" ? "press space to pause" : "tap pause to adjust settings"),
				"magnetMaker"
			],
			magnetism: 0.005,
			friction: 0,
			elasticity: 1,
			gravity: 0,
			wind: 0,
			maxspeed: 5,
			density: 1
		}
		window.state = state

	/* defaults */
		document.addEventListener("dblclick", function(event) {
			event.preventDefault()
		})

		document.addEventListener("contextmenu", function(event) {
			event.preventDefault()
		})

/*** create / remove magnet ***/
	/* createMagnet */
		document.getElementById("field").addEventListener(on.click, createMagnet)
		function createMagnet(event) {
			if (event.target.id == "field") {
				if (!state.clicked) {
					state.clicked = new Date().getTime()
				}
				else if ((new Date().getTime()) - state.clicked < 250) {
					state.clicked = null

					// create element
						var magnet = document.createElement("div")
							magnet.className = "magnet"
							magnet.id = generateId()

					// style and position
							magnet.style.left   = (event.touches ? event.touches[0].clientX : event.clientX) + "px"
							magnet.style.bottom = (window.innerHeight - (event.touches ? event.touches[0].clientY : event.clientY)) + "px"
							magnet.style.height = "40px"
							magnet.style.width  = "40px"

					// physics
							magnet.setAttribute("x", (event.touches ? event.touches[0].clientX : event.clientX))
							magnet.setAttribute("y", window.innerHeight - (event.touches ? event.touches[0].clientY : event.clientY))
							magnet.setAttribute("vx", (Math.random() * 1) - 0.5)
							magnet.setAttribute("vy", (Math.random() * 1) - 0.5)
							magnet.setAttribute("r", 20)
							magnet.setAttribute("p", 0)
					
					// event listeners & append
							magnet.addEventListener(on.mousedown, selectMagnet)
							magnet.addEventListener(on.mouseup, unselectMagnet)
						event.target.appendChild(magnet)

					// tips
						if (state.tips.length == 6) {
							updateInstructions()
						}
				}
				else {
					state.clicked = null
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
			if (state.clicked && (new Date().getTime()) - state.clicked < 250) {
				state.clicked = null

				removeMagnet(event)
			}
			else {
				// doubleclick timeout
					state.clicked = new Date().getTime()
					setTimeout(function() {
						state.clicked = null
					}, 250)

				// unselect others
					unselectMagnet()

				if (event.target.className == "magnet") {
					// select magnet
						state.selected = event.target
						state.selected.setAttribute("selected", true)

					// style field
						document.getElementById("field").setAttribute("dragging", true)
						state.held = new Date().getTime()
						var thisHold = state.held

					// longpress timeout
						setTimeout(function() {
							if (state.held == thisHold && state.selected
							  && !Number(state.selected.getAttribute("vx")) && !Number(state.selected.getAttribute("vy"))) {
								state.changing = true
							}
						}, 500)

					// tips
						if (state.tips.length == 4) {
							updateInstructions()
						}
				}
			}
		}

	/* moveMagnet */
		document.addEventListener(on.mousemove, moveMagnet)
		function moveMagnet(event) {
			// change mass
				if (state.selected && (state.changing || state.shifting)) {
					changeSize(event)
				}

			// move & set physics
				else if (state.selected) {
					state.moved = true
					state.selected.style.left   = (event.touches ? event.touches[0].clientX : event.clientX) + "px"
					state.selected.style.bottom = (window.innerHeight - (event.touches ? event.touches[0].clientY : event.clientY)) + "px"

					state.selected.setAttribute("x", (event.touches ? event.touches[0].clientX : event.clientX))
					state.selected.setAttribute("y", window.innerHeight - (event.touches ? event.touches[0].clientY : event.clientY))

					state.held = new Date().getTime()
				}					
		}

	/* unselectMagnet */
		function unselectMagnet(event) {
			if (state.selected) {
				// held for 0.5 second --> v = 0
					if (state.held && (new Date().getTime() - state.held > 500)) {
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
					document.getElementById("field").removeAttribute("dragging")
			}

			state.moved = false
			state.changed = false
			state.changing = false
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
					state.shifting = true
			}
			else if (event.keyCode == 32) { // SPACE
				// pause / unpause
					pauseLoop()
			}
		}

	/* stopChanging */
		document.addEventListener("keyup", stopChanging)
		function stopChanging(event) {
			if (event.keyCode == 16) { // SHIFT
				// unset changing
					state.shifting = false
			}
		}

	/* changeSize */
		function changeSize(event) {
			// get position
				var x = Number(state.selected.getAttribute("x"))
				var y = Number(state.selected.getAttribute("y"))

			// calculate distance to cursor
				var cx = (event.touches ? event.touches[0].clientX : event.clientX)
				var cy = window.innerHeight - (event.touches ? event.touches[0].clientY : event.clientY)
				var r = Math.abs(getScalar(getDifference(cx, x), getDifference(cy, y)))

			// update size
				state.selected.setAttribute("r", r)
				state.selected.style.height = r * 2 + "px"
				state.selected.style.width  = r * 2 + "px"
				state.changed = true

			// tips
				if (state.tips.length == 2) {
					updateInstructions()
				}				
		}

	/* pauseLoop */
		document.getElementById("pause").addEventListener(on.click, pauseLoop)
		function pauseLoop(event) {
			// pause / unpause
				if (state.paused) {
					state.paused = false
					document.getElementById("settings").removeAttribute("visible")
					document.getElementById("pause"   ).removeAttribute("paused")
				}
				else {
					state.paused = true
					document.getElementById("settings").setAttribute("visible", true)
					document.getElementById("pause"   ).setAttribute("paused",  true)
				}
			
			// tips
				if (state.tips.length == 1) {
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

	/* getVolume */
		function getVolume(r) {
			// volume of a sphere
				var volume = (4 / 3) * Math.PI * Math.pow(r, 3)
				return volume
		}

	/* getAngle */
		function getAngle(x, y) {
			// SOH CAH TOA
				var tangent = y / x

			// arctangent
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
						var r1 = Number(magnet1.getAttribute("r"))
						var r2 = Number(magnet2.getAttribute("r"))
						var m1 = getVolume(r1) * state.density
						var m2 = getVolume(r2) * state.density

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
						if ((d < r1 + r2)) {
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
			var r = Number(magnet.getAttribute("r"))
			var m = getVolume(r) * state.density

			if (m) {
				forces[magnet.id].y -= (state.gravity * m)
				forces[magnet.id].x += (Math.pow(state.wind * 1000, 3) / m)
			}

			return forces
		}

	/* updateVelocity */
		function updateVelocity(magnet, forces) {
			// get forces
				var fx = forces[magnet.id].x
				var fy = forces[magnet.id].y

			// get mass and velocities
				var r  = Number(magnet.getAttribute("r"))
				var m  = getVolume(r) * state.density
				var vx = Number(magnet.getAttribute("vx"))
				var vy = Number(magnet.getAttribute("vy"))

			// calculate acceleration
				var ax = m ? (fx / m) : 0
				var ay = m ? (fy / m) : 0

			// calculate friction
				vx = (vx + ax) * (1 - Math.pow(state.friction, 2))
				vy = (vy + ay) * (1 - Math.pow(state.friction, 2))

			// calculate velocity
				vx = Math.min(state.maxspeed, Math.max(state.maxspeed * -1, vx))
				vy = Math.min(state.maxspeed, Math.max(state.maxspeed * -1, vy))

			// save values
				magnet.setAttribute("vx", vx)
				magnet.setAttribute("vy", vy)
		}

	/* updateCollision */
		function updateCollision(collision) {
			// magnets
				var magnet1 = document.getElementById(collision[0])
				var magnet2 = document.getElementById(collision[1])

			// r
				var r1 = Number(magnet1.getAttribute("r"))
				var r2 = Number(magnet2.getAttribute("r"))
				var r  = r1 + r2

			// m
				var m1 = getVolume(r1) * state.density
				var m2 = getVolume(r2) * state.density
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
				var ax    = ( (Math.cos(angle) * r) - dx ) * state.elasticity
				var ay    = ( (Math.sin(angle) * r) - dy ) * state.elasticity

			// vx & vy (initial)
				var vx1 = Number(magnet1.getAttribute("vx"))
				var vy1 = Number(magnet1.getAttribute("vy"))
				var vx2 = Number(magnet2.getAttribute("vx"))
				var vy2 = Number(magnet2.getAttribute("vy"))

			// vx & vy (final)
				if (m) {
					vx1 = Math.min(state.maxspeed, Math.max(state.maxspeed * -1, vx1 - (ax * m2 / m)))
					vy1 = Math.min(state.maxspeed, Math.max(state.maxspeed * -1, vy1 - (ay * m2 / m)))
					vx2 = Math.min(state.maxspeed, Math.max(state.maxspeed * -1, vx2 + (ax * m1 / m)))
					vy2 = Math.min(state.maxspeed, Math.max(state.maxspeed * -1, vy2 + (ay * m1 / m)))
				}

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
					var r = Number(magnet.getAttribute("r"))
					var x = Number(magnet.getAttribute("x"))
					var y = Number(magnet.getAttribute("y"))
					var vx = Math.min(state.maxspeed, Math.max(state.maxspeed * -1, Number(magnet.getAttribute("vx"))))
					var vy = Math.min(state.maxspeed, Math.max(state.maxspeed * -1, Number(magnet.getAttribute("vy"))))

				// update x position or velocity
					if (x + vx - r <= 0) { // left
						magnet.setAttribute("vx", vx * -1)
						magnet.setAttribute("x", r)
						magnet.style.left = r + "px"
					}
					else if (x + vx + r >= window.innerWidth) { // right
						magnet.setAttribute("vx", vx * -1)
						magnet.setAttribute("x", window.innerWidth - r)
						magnet.style.left = window.innerWidth - r + "px"
					}
					else {
						magnet.setAttribute("x", x + vx)
						magnet.style.left = x + "px"
					}

				// update y position or velocity
					if (y + vy - r <= 0) { // bottom
						magnet.setAttribute("vy", vy * -1)
						magnet.setAttribute("y", r)
						magnet.style.bottom = r + "px"
					}
					else if (y + vy + r >= window.innerHeight) { // top
						magnet.setAttribute("vy", vy * -1)
						magnet.setAttribute("y", window.innerHeight - r)
						magnet.style.bottom = window.innerHeight - r + "px"
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
