/*** globals ***/
	/* constants */
		const CONSTANTS = {
			stunnedTime: 2000,
			thingSize: 10,
			boundarySize: 100,
			loopInterval: 33.333,
			maxVelocity: 8,
			velocityChange: 1,
			sides: ["top", "right", "bottom", "left"],
			settings: document.querySelector("#settings"),
			thing: document.querySelector("#thing")
		}

/*** animation ***/
	/* initializeThing */
		initializeThing()
		function initializeThing() {
			try {
				// set variable
					document.querySelector("#settings").innerText = ":root { --thing-size: " + CONSTANTS.thingSize + "px; }"

				// pick a side
					let startingSide = CONSTANTS.sides[Math.floor(Math.random() * CONSTANTS.sides.length)]
					let x, y

				// position on side
					if (startingSide == "top") {
						x = Math.floor(Math.random() * (window.innerWidth - 2 * CONSTANTS.thingSize)) + CONSTANTS.thingSize
						y = -1 * CONSTANTS.thingSize
					}
					else if (startingSide == "right") {
						x = window.innerWidth + CONSTANTS.thingSize
						y = Math.floor(Math.random() * (window.innerHeight - 2 * CONSTANTS.thingSize)) + CONSTANTS.thingSize
					}
					else if (startingSide == "bottom") {
						x = Math.floor(Math.random() * (window.innerWidth - 2 * CONSTANTS.thingSize)) + CONSTANTS.thingSize
						y = window.innerHeight + CONSTANTS.thingSize
					}
					else { // startingSide == "left"
						x = -1 * CONSTANTS.thingSize
						y = Math.floor(Math.random() * (window.innerHeight - 2 * CONSTANTS.thingSize)) + CONSTANTS.thingSize
					}

				// random velocities
					let vx = Math.floor(Math.random() * (CONSTANTS.maxVelocity * 2 + 1)) - CONSTANTS.maxVelocity
					let vy = Math.floor(Math.random() * (CONSTANTS.maxVelocity * 2 + 1)) - CONSTANTS.maxVelocity

				// position thing
					CONSTANTS.thing.style.left = x + "px"
					CONSTANTS.thing.style.top  = y + "px"
					CONSTANTS.thing.setAttribute("vx", vx)
					CONSTANTS.thing.setAttribute("vy", vy)

				// start moving
					CONSTANTS.loop = setInterval(moveThing, CONSTANTS.loopInterval)
			} catch (error) {console.log(error)}
		}

	/* moveThing */
		function moveThing() {
			try {
				// stunned
					let stunned = Number(CONSTANTS.thing.getAttribute("stunned"))
					if (stunned > 0) {
						CONSTANTS.thing.setAttribute("stunned", stunned - 1)
						return
					}
					else {
						CONSTANTS.thing.removeAttribute("stunned")
					}

				// current info
					let x = Number(CONSTANTS.thing.style.left.replace("px", ""))
					let y = Number(CONSTANTS.thing.style.top.replace( "px", ""))
					let vx = Number(CONSTANTS.thing.getAttribute("vx"))
					let vy = Number(CONSTANTS.thing.getAttribute("vy"))

				// velocity --> out of bounds = push back in, otherwise = random
					if (x < CONSTANTS.boundarySize) {
						vx += CONSTANTS.velocityChange
					}
					else if (x > window.innerWidth + CONSTANTS.boundarySize) {
						vx -= CONSTANTS.velocityChange
					}
					else {
						vx += Math.floor(Math.random() * (CONSTANTS.velocityChange * 2 * 10 + 1)) / 10 - CONSTANTS.velocityChange
					}

					if (y < CONSTANTS.boundarySize) {
						vy += CONSTANTS.velocityChange
					}
					else if (y > window.innerHeight + CONSTANTS.boundarySize) {
						vy -= CONSTANTS.velocityChange
					}
					else {
						vy += Math.floor(Math.random() * (CONSTANTS.velocityChange * 2 * 10 + 1)) / 10 - CONSTANTS.velocityChange
					}

				// caps
					vx = Math.max(Math.min(vx, CONSTANTS.maxVelocity), -1 * CONSTANTS.maxVelocity)
					vy = Math.max(Math.min(vy, CONSTANTS.maxVelocity), -1 * CONSTANTS.maxVelocity)

				// position
					x = x + vx
					y = y + vy

				// set
					CONSTANTS.thing.style.left = x + "px"
					CONSTANTS.thing.style.top  = y + "px"
					CONSTANTS.thing.setAttribute("vx", vx)
					CONSTANTS.thing.setAttribute("vy", vy)
			} catch (error) {console.log(error)}
		}

/*** interaction ***/
	/* touchThing */
		CONSTANTS.thing.addEventListener("click", touchThing)
		function touchThing(event) {
			try {
				// set stunned
					CONSTANTS.thing.setAttribute("stunned", CONSTANTS.stunnedTime / CONSTANTS.loopInterval)
			} catch (error) {console.log(error)}
		}
