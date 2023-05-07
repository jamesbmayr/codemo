/*** globals ***/
	/* triggers */
		const TRIGGERS = {
			click: "click",
			mousemove: "mousemove",
			resize: "resize",
			rightclick: "contextmenu"

		}

		if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
			TRIGGERS.mousemove = "touchmove"
		}

	/* elements */
		const ELEMENTS = {
			restart: document.querySelector("#restart"),
			game: document.querySelector("#game"),
			blaster: {
				element: document.querySelector("#blaster"),
				center: document.querySelector("#blaster-center")
			},
			spiral: document.querySelector("#spiral"),
			kinetic: document.querySelector("#kinetic"),
			stats: {
				score: document.querySelector("#score-inner"),
				next: document.querySelector("#next-inner")
			}
		}

	/* constants */
		const CONSTANTS = {
			interval: 25, // ms
			percentage: 100, // %
			circleDegrees: 360, // °
			circleOffsetDegrees: 90, // °
			circleRadians: Math.PI * 2, // radians
			minRadius: 2.5, // %
			blasterRadius: 5, // %
			thresholdRadius: 1.25, // %
			spiralRadiusFactor: 2, // %
			spiralSpacingFactor: 10, // %
			kineticVelocity: 2, // %
			defaultCreateCountdown: 100, // count
			minimumCreateCountdown: 10, // count
			startingIndex: 42, // count
			endingIndex: 109, // count
			minNumber: -4, // int
			maxNumber: 4 // int
		}

	/* state */
		const STATE = {
			game: {
				playing: false,
				radius: 0,
				score: 0,
				createCountdown: 0,
				createCounter: 0,
				spiralNumbers: {},
				kineticNumber: null,
				blasterNumber: null,
				nextNumber: null,
				loop: null
			},
			cursor: {
				x: 0,
				y: 0,
				angle: 0,
				radius: 0
			}
		}

/*** setup ***/
	/* resizeGame */
		resizeGame()
		window.addEventListener(TRIGGERS.resize, resizeGame)
		function resizeGame(event) {
			try {
				// get radius
					const rect = ELEMENTS.game.getBoundingClientRect()
					const radius = getAverage(rect.height, rect.width)
				
				// set radius
					STATE.game.radius = radius
			} catch (error) {console.log(error)}
		}

/*** math ***/
	/* getAverage */
		function getAverage(...numbers) {
			try {
				// mean
					return numbers.reduce((total, current) => total += current) / numbers.length
			} catch (error) {console.log(error)}
		}

	/* getDegreesFromRadians */
		function getDegreesFromRadians(radians) {
			try {
				// convert
					let degrees = radians * CONSTANTS.circleDegrees / CONSTANTS.circleRadians
					
				// reduce
					while (degrees < 0) {
						degrees += CONSTANTS.circleDegrees
					}
					return degrees % CONSTANTS.circleDegrees
			} catch (error) {console.log(error)}
		}

	/* getCircumference */
		function getCircumference(radius) {
			try {
				// C = 2πr
					return CONSTANTS.circleRadians * radius
			} catch (error) {console.log(error)}
		}

	/* getSpiralCoordinates */
		function getSpiralCoordinates(n) {
			try {
				// x = r * ((k * n) ** (1/2)) * cos((k * n) ** (1/2))
				// y = r * ((k * n) ** (1/2)) * sin((k * n) ** (1/2))
					const radicalKN = (CONSTANTS.spiralSpacingFactor * n) ** (1 / 2)
					const x = CONSTANTS.spiralRadiusFactor * radicalKN * Math.cos(radicalKN)
					const y = CONSTANTS.spiralRadiusFactor * radicalKN * Math.sin(radicalKN)

				// return
					return {x, y}
			} catch (error) {console.log(error)}
		}

	/* getScalar */
		function getScalar(x, y) {
			try {
				// pythagorean theorem
					return ((x ** 2) + (y ** 2)) ** (1 / 2)
			} catch (error) {console.log(error)}
		}

	/* getPolarCoordinates */
		function getPolarCoordinates(x, y) {
			try {
				// angle
					const angle = Math.abs(Math.floor(getDegreesFromRadians(Math.atan2(y, x))))

				// radius
					const radius = Math.floor(getScalar(x, y))

				// return
					return {angle, radius}
			} catch (error) {console.log(error)}
		}

	/* getCartesianCoordinates */
		function getCartesianCoordinates(angle, radius) {
			try {
				// get radians
					angle = angle * CONSTANTS.circleRadians / CONSTANTS.circleDegrees

				// return x, y
					return {
						x: radius * Math.cos(angle),
						y: radius * Math.sin(angle)
					}
			} catch (error) {console.log(error)}
		}

	/* getRelativeDistance */
		function getRelativeDistance(d, reference) {
			try {
				// relative
					return d * CONSTANTS.percentage / reference
			} catch (error) {console.log(error)}
		}

	/* getRelativeDegrees */
		function getRelativeDegrees(angle, reference) {
			try {
				// relative
					return (angle + reference + CONSTANTS.circleDegrees) % CONSTANTS.circleDegrees
			} catch (error) {console.log(error)}
		}

	/* getRandomInteger */
		function getRandomInteger(a, b) {
			try {
				// from a - b, inclusive
					const range = Math.abs(a - b) + 1
					return Math.floor(Math.random() * range) + Math.min(a, b)
			} catch (error) {console.log(error)}
		}

	/* getCollision */
		function getCollision(a, b) {
			try {
				// distance
					const distance = getScalar(a.x - b.x, a.y - b.y)
					const radii = a.radius + b.radius

				// return
					return distance <= radii
			} catch (error) {console.log(error)}
		}

	/* getRandomId */
		function getRandomId() {
			try {
				// random number
					return "_" + String(Math.random()).slice(2)
			} catch (error) {console.log(error)}
		}

/*** gameplay ***/
	/* resetGame */
		ELEMENTS.restart.addEventListener(TRIGGERS.click, resetGame)
		function resetGame(event) {
			try {
				// stop playing
					STATE.game.playing = false

				// hide button
					ELEMENTS.restart.blur()

				// clear score
					STATE.game.score = 0
					ELEMENTS.stats.score.innerHTML = STATE.game.score
				
				// clear numbers
					for (const i in STATE.game.spiralNumbers) {
						STATE.game.spiralNumbers[i].element.remove()
						delete STATE.game.spiralNumbers[i]
					}
					if (STATE.game.kineticNumber) {
						STATE.game.kineticNumber.element.remove()
						STATE.game.kineticNumber = null
					}
					if (STATE.game.blasterNumber) {
						STATE.game.blasterNumber.element.remove()
						STATE.game.blasterNumber = null
					}
					if (STATE.game.nextNumber) {
						STATE.game.nextNumber.element.remove()
						STATE.game.nextNumber = null
					}

				// generate spiral
					let index = CONSTANTS.startingIndex
					while (index < CONSTANTS.endingIndex) {
						const spiralNumber = buildNumber({index: index, nonZero: true})
						STATE.game.spiralNumbers[spiralNumber.id] = spiralNumber
						ELEMENTS.spiral.appendChild(STATE.game.spiralNumbers[spiralNumber.id].element)
						index++
					}
					STATE.game.createCountdown = CONSTANTS.defaultCreateCountdown
					STATE.game.createCounter = 0

				// random blaster number
					STATE.game.blasterNumber = {...buildNumber({index: 0}), angle: STATE.cursor.angle}
					const offsetDegrees = getRelativeDegrees(STATE.game.blasterNumber.angle, -CONSTANTS.circleOffsetDegrees)
					STATE.game.blasterNumber.element.style.transform =  "translateX(-50%) translateY(-50%) rotate(-" + offsetDegrees + "deg)"
					ELEMENTS.blaster.element.appendChild(STATE.game.blasterNumber.element)

				// random next number
					STATE.game.nextNumber = buildNumber({index: 0})
					ELEMENTS.stats.next.appendChild(STATE.game.nextNumber.element)

				// start playing
					STATE.game.playing = true
					ELEMENTS.game.removeAttribute("gameover")
					ELEMENTS.game.setAttribute("playing", true)
					ELEMENTS.spiral.removeAttribute("invisible")
					STATE.game.loop = setInterval(moveNumbers, CONSTANTS.interval)

				// fullscreen
					document.body.requestFullscreen()

				// don't trigger a blaster click
					event.preventDefault()
					event.stopPropagation()
			} catch (error) {console.log(error)}
		}

	/* moveCursor */
		window.addEventListener(TRIGGERS.mousemove, moveCursor)
		function moveCursor(event) {
			try {
				// get cartesian position
					STATE.cursor.x = getRelativeDistance((event.touches ? event.touches[0].clientX : event.clientX) - (window.innerWidth  / 2), STATE.game.radius * 2)
					STATE.cursor.y = getRelativeDistance((window.innerHeight / 2) - (event.touches ? event.touches[0].clientY : event.clientY), STATE.game.radius * 2)

				// get radial position
					const {angle, radius} = getPolarCoordinates(STATE.cursor.x, STATE.cursor.y)
					STATE.cursor.angle  = angle
					STATE.cursor.radius = radius

				// rotate blaster
					const offsetDegrees = getRelativeDegrees(STATE.cursor.angle, -CONSTANTS.circleOffsetDegrees)
					ELEMENTS.blaster.center.style.transform = "translateX(-50%) translateY(-50%) rotate(-" + offsetDegrees + "deg)"

				// center
					if (STATE.game.blasterNumber) {
						STATE.game.blasterNumber.angle = angle
						STATE.game.blasterNumber.element.style.transform = "translateX(-50%) translateY(-50%) rotate(-" + offsetDegrees + "deg)"
					}
			} catch (error) {console.log(error)}
		}

	/* clickCursor */
		window.addEventListener(TRIGGERS.click, clickCursor)
		function clickCursor(event) {
			try {
				// not playing
					if (!STATE.game.playing) {
						return
					}

				// already one in motion
					if (STATE.game.kineticNumber) {
						return
					}

				// no blaster number
					if (!STATE.game.blasterNumber) {
						return
					}

				// move first
					moveCursor(event)

				// move blaster number to kinetic
					STATE.game.kineticNumber = {v: CONSTANTS.kineticVelocity, ...STATE.game.blasterNumber}
					ELEMENTS.kinetic.appendChild(STATE.game.kineticNumber.element)

				// move next number to blaster
					STATE.game.blasterNumber = {...STATE.game.nextNumber, angle: STATE.cursor.angle}
					const offsetDegrees = getRelativeDegrees(STATE.game.blasterNumber.angle, -CONSTANTS.circleOffsetDegrees)
					STATE.game.blasterNumber.element.style.transform =  "translateX(-50%) translateY(-50%) rotate(-" + offsetDegrees + "deg)"
					ELEMENTS.blaster.element.appendChild(STATE.game.nextNumber.element)

				// random next number
					STATE.game.nextNumber = buildNumber({index: 0})
					ELEMENTS.stats.next.appendChild(STATE.game.nextNumber.element)
			} catch (error) {console.log(error)}
		}

	/* rightclickCursor */
		window.addEventListener(TRIGGERS.rightclick, rightclickCursor)
		function rightclickCursor(event) {
			try {
				// prevent default
					event.preventDefault()
					event.stopPropagation()

				// no blaster
					if (!STATE.game.blasterNumber) {
						return
					}

				// zero
					if (!STATE.game.blasterNumber.integer) {
						return
					}

				// flip blaster polarity
					STATE.game.blasterNumber.integer = -STATE.game.blasterNumber.integer
					STATE.game.blasterNumber.text = String(STATE.game.blasterNumber.integer)
					STATE.game.blasterNumber.element.innerHTML = STATE.game.blasterNumber.text
					STATE.game.blasterNumber.element.setAttribute("polarity", Math.sign(STATE.game.blasterNumber.integer))
			} catch (error) {console.log(error)}
		}

	/* endGame */
		function endGame() {
			try {
				// stop playing
					STATE.game.playing = false
					clearInterval(STATE.game.loop)
					STATE.game.loop = null

				// show button
					ELEMENTS.game.removeAttribute("playing")
					ELEMENTS.game.setAttribute("gameover", true)
			} catch (error) {console.log(error)}
		}

/*** numbers ***/
	/* buildNumber */
		function buildNumber(options={}) {
			try {
				// id
					const id = getRandomId()

				// number
					let integer = 0
					do {
						integer = getRandomInteger(CONSTANTS.minNumber, CONSTANTS.maxNumber)
					}
					while (options.nonZero && !integer)

				// position
					const index = options.index || 0
					const {x, y} = getSpiralCoordinates(index)
					const {angle, radius} = getPolarCoordinates(x, y)
					const offsetDegrees = getRelativeDegrees(angle, -CONSTANTS.circleOffsetDegrees)
					const size = (CONSTANTS.minRadius + Math.abs(integer)) 
					const text = integer ? String(integer) : "<span>&times;</span>0"

				// element
					const numberElement = document.createElement("button")
						numberElement.id = id
						numberElement.className = "number"
						numberElement.innerHTML = text
						numberElement.setAttribute("polarity", Math.sign(integer))
						numberElement.style.width  = "calc(var(--number-radius) * " + size + ")"
						numberElement.style.height = "calc(var(--number-radius) * " + size + ")"
						numberElement.style.transform =  "translateX(-50%) translateY(-50%) rotate(-" + offsetDegrees + "deg)"
						numberElement.style.left = "calc(50% + var(--number-radius) * " +  x + ")"
						numberElement.style.top  = "calc(50% + var(--number-radius) * " + -y + ")"

				// return
					return {
						id: id,
						spiralDistance: index,
						x:  x,
						y: -y,
						angle: angle,
						radius: radius,
						integer: integer,
						size: size,
						text: text,
						element: numberElement
					}
			} catch (error) {console.log(error)}
		}

	/* moveNumbers */
		function moveNumbers() {
			try {
				// detect collisions with blaster
					for (const i in STATE.game.spiralNumbers) {
						const spiralNumber = STATE.game.spiralNumbers[i]
						if (spiralNumber.radius - (spiralNumber.size / 2) < CONSTANTS.blasterRadius - CONSTANTS.thresholdRadius) {
							return endGame()
						}
					}

				// detect collisions with kinetic
					if (STATE.game.kineticNumber) {
						for (const i in STATE.game.spiralNumbers) {
							const spiralNumber = STATE.game.spiralNumbers[i]
							if (getCollision({
									x: STATE.game.kineticNumber.x,
									y: STATE.game.kineticNumber.y,
									radius: STATE.game.kineticNumber.size / 2
								}, {
									x: spiralNumber.x,
									y: spiralNumber.y,
									radius: spiralNumber.size / 2
								})) {

								// update number
									if (STATE.game.kineticNumber.integer == 0) {
										spiralNumber.integer = 0
									}
									else {
										spiralNumber.integer += STATE.game.kineticNumber.integer
									}

								// zero --> destroy
									if (!spiralNumber.integer) {
										spiralNumber.element.remove()
										delete STATE.game.spiralNumbers[i]

										STATE.game.score += 1
										ELEMENTS.stats.score.innerHTML = STATE.game.score
										STATE.game.createCountdown = Math.max(CONSTANTS.minimumCreateCountdown, STATE.game.createCountdown - 1)
									}
									else {
										spiralNumber.text = String(spiralNumber.integer)
										spiralNumber.size = (CONSTANTS.minRadius + Math.abs(spiralNumber.integer))
										spiralNumber.element.innerHTML = spiralNumber.text
										spiralNumber.element.setAttribute("polarity", Math.sign(spiralNumber.integer))
										spiralNumber.element.style.width  = "calc(var(--number-radius) * " + spiralNumber.size + ")"
										spiralNumber.element.style.height = "calc(var(--number-radius) * " + spiralNumber.size + ")"
									}

								// eliminate kinetic
									STATE.game.kineticNumber.element.remove()
									STATE.game.kineticNumber = null
								
								break
							}
						}
					}

				// move kinetic number
					if (STATE.game.kineticNumber) {
						// outside game area?
							if (STATE.game.kineticNumber.radius > (STATE.game.kineticNumber.size / 2) + (CONSTANTS.percentage / 2)) {
								STATE.game.kineticNumber.element.remove()
								STATE.game.kineticNumber = null
							}

						// move according to velocity
							else {
								STATE.game.kineticNumber.radius += STATE.game.kineticNumber.v
								const {x, y} = getCartesianCoordinates(STATE.game.kineticNumber.angle, STATE.game.kineticNumber.radius)
								STATE.game.kineticNumber.x =  x
								STATE.game.kineticNumber.y = -y

								STATE.game.kineticNumber.element.style.left = "calc(50% + var(--number-radius) * " +  x + ")"
								STATE.game.kineticNumber.element.style.top  = "calc(50% + var(--number-radius) * " + -y + ")"
							}
					}

				// move spiral numbers
					for (const i in STATE.game.spiralNumbers) {
						// this number
							const spiralNumber = STATE.game.spiralNumbers[i]

						// decrement distance
							spiralNumber.spiralDistance -= 1 / STATE.game.createCountdown

						// position
							const {x, y} = getSpiralCoordinates(spiralNumber.spiralDistance)
							const {angle, radius} = getPolarCoordinates(x, y)
							const offsetDegrees = getRelativeDegrees(angle, -CONSTANTS.circleOffsetDegrees)
						
						// update state
							spiralNumber.x =  x
							spiralNumber.y = -y
							spiralNumber.angle = angle
							spiralNumber.radius = radius

						// styling
							spiralNumber.element.style.transform =  "translateX(-50%) translateY(-50%) rotate(-" + offsetDegrees + "deg)"
							spiralNumber.element.style.left = "calc(50% + var(--number-radius) * " +  x + ")"
							spiralNumber.element.style.top  = "calc(50% + var(--number-radius) * " + -y + ")"
					}

				// make a new one?
					if (STATE.game.createCounter <= 0) {
						STATE.game.createCounter = STATE.game.createCountdown

						const spiralNumber = buildNumber({index: CONSTANTS.endingIndex, nonZero: true})
						STATE.game.spiralNumbers[spiralNumber.id] = spiralNumber
						ELEMENTS.spiral.appendChild(STATE.game.spiralNumbers[spiralNumber.id].element)
					}
					STATE.game.createCounter--
			} catch (error) {console.log(error)}
		}
