/*** globals ***/
	/* triggers */
		const TRIGGERS = {
			click: "click",
			resize: "resize",
			input: "input"
		}

	/* elements */
		const ELEMENTS = {
			body: document.body,
			spin: document.querySelector("#spin"),
			options: document.querySelector("#options"),
			canvas: document.querySelector("#canvas"),
			context: document.querySelector("#canvas").getContext("2d")
		}

	/* constants */
		const CONSTANTS = {
			circle: {
				radians: Math.PI * 2,
				degrees: 360,
				radius: 0.4, // ratio of radius to lesser of canvas height, canvas width
				minAnglePerCycle: 0.1, // min degrees to rotate each iteration of the spin loop
				maxAnglePerCycle: 30, // max degrees to rotate each iteration of the spin loop
				minimumSpin: 360 * 5,
				maximumSpin: 360 * 8,
				iterationTime: 25, // ms
				cooldown: 1000 // ms
			},
			colors: {
				"dark-red": "#7a0018",
				"red": "#e20000",
				"orange": "#fc6404",
				"gold": "#af9300",
				"yellow": "#ded00b",
				"lime-green": "#8cc43c",
				"green": "#029632",
				"dark-green": "#094506",
				"teal": "#379494",
				"light-blue": "#04b1ff",
				"blue": "#0066aa",
				"dark-blue": "#003377",
				"purple": "#725dc1",
				"lavender": "#a586c5",
				"magenta": "#bf1978",
				"pink": "#ff89c2",
				"brown": "#694417",
				"tan": "#aa824f",
				"white": "#dddddd",
				"gray": "#9b9ea0",
			},
			font: {
				family: "sans-serif",
				size: 15,
				color: "#111111",
				lineWidth: 2,
				shadowColor: "#dddddd",
				shadowBlur: 1,
				radius: 0.667 // ratio of text's distance from center to total wedge radius
			},
			indicator: {
				color: "#111111",
				outlineColor: "#dddddd",
				radius: 0.1, // ratio of inner radius to lesser of canvas height, canvas width
				outlineRadius: 0.15, // ratio of outer radius to lesser of canvas height, canvas width
				offset: 0.75, // fudge factor for indicator inside outline
				angle: 30, // width of indicator
			}
		}

	/* state */
		const STATE = {
			options: {},
			rotation: 0,
			targetRotation: 0,
			totalWedges: 0
		}

/*** interaction ***/
	/* updateOptions */
		ELEMENTS.options.addEventListener(TRIGGERS.input, updateOptions)
		function updateOptions(event) {
			try {
				// get text
					const text = ELEMENTS.options.value.trim()
					if (!text || !text.length) {
						return
					}

				// split
					const options = text.split(/\s?,\s?|\n/g).filter(function(option) {
						return option.trim().length
					})

				// reset options
					for (let option in STATE.options) {
						STATE.options[option].count = 0
					}

				// build back up
					for (let i in options) {
						if (STATE.options[options[i]]) {
							STATE.options[options[i]].count++
						}
						else {
							STATE.options[options[i]] = {
								count: 1,
								color: null
							}
						}
					}

				// remove 0s
					STATE.totalWedges = 0
					const availableColors = Object.keys(CONSTANTS.colors)
					const optionsNeedingAColor = []
					for (let option in STATE.options) {
						if (!STATE.options[option].count) {
							delete STATE.options[option]
						}
						else {
							STATE.totalWedges += STATE.options[option].count
							if (STATE.options[option].color) {
								availableColors.splice(availableColors.indexOf(STATE.options[option].color), 1)
							}
							else {
								optionsNeedingAColor.push(option)
							}
						}
					}

				// remaining --> assign colors
					for (let i in optionsNeedingAColor) {
						if (availableColors.length) {
							const color = chooseRandom(availableColors)
							STATE.options[optionsNeedingAColor[i]].color = color
							availableColors.splice(availableColors.indexOf(color), 1)
						}
						else {
							STATE.options[optionsNeedingAColor[i]].color = chooseRandom(Object.keys(CONSTANTS.colors))
						}
					}

				// redraw wheel
					clearCanvas(ELEMENTS.canvas, ELEMENTS.context)
					drawWheel(ELEMENTS.canvas, ELEMENTS.context, STATE)
			} catch (error) {console.log(error)}
		}

	/* spinWheel */
		ELEMENTS.spin.addEventListener(TRIGGERS.click, spinWheel)
		function spinWheel(event) {
			try {
				// already spinning?
					if (ELEMENTS.spin.hasAttribute("spinning")) {
						return false
					}

				// not enough options?
					if (Object.keys(STATE.options).length < 2) {
						return false
					}

				// disable spin button
					ELEMENTS.spin.setAttribute("disabled", true)
					ELEMENTS.options.setAttribute("disabled", true)
					ELEMENTS.spin.blur()

				// generate random spin amount
					STATE.targetRotation = generateRandomBetween(CONSTANTS.circle.minimumSpin, CONSTANTS.circle.maximumSpin)

				// reset current rotation
					STATE.rotation = 0

				// start loop
					STATE.rotationLoop = setInterval(updateWheelRotation, CONSTANTS.circle.iterationTime)
			} catch (error) {console.log(error)}
		}

/*** assetManager ***/
	/* retrieveAsset */
		window.ASSETS_J.retrieveAsset = function(name, type, data) {
			try {
				// csv, txt
					ELEMENTS.options.value = data
					updateOptions()
			} catch (error) {console.log(error)}
		}

	/* storeAsset */
		window.ASSETS_J.storeAsset = async function(type) {
			try {
				// png
					return {
						name: "decisionMaker_" + (new Date().getTime()) + ".png",
						type: "png",
						data: ELEMENTS.canvas.toDataURL("image/png")
					}
			} catch (error) {console.log(error)}
		}

/*** tools ***/
	/* chooseRandom */
		function chooseRandom(list) {
			try {
				if (!Array.isArray(list)) {
					return list
				}

				return list[Math.floor(Math.random() * list.length)]
			} catch (error) {console.log(error)}
		}

	/* generateRandomBetween */
		function generateRandomBetween(a, b) {
			try {
				return Math.floor(Math.random() * (b - a)) + a
			} catch (error) {console.log(error)}
		}

	/* getCartesianCoordinates */
		function getCartesianCoordinates(angle, radius) {
			try {
				// get radians
					angle = angle * CONSTANTS.circle.radians / CONSTANTS.circle.degrees

				// return x, y
					return {
						x: radius * Math.cos(angle),
						y: radius * Math.sin(angle)
					}
			} catch (error) {console.log(error)}
		}

/*** canvas ***/
	/* resizeCanvas */
		window.addEventListener(TRIGGERS.resize, resizeCanvas)
		resizeCanvas()
		function resizeCanvas() {
			try {
				// set height and width
					const rect = ELEMENTS.canvas.getBoundingClientRect()
					ELEMENTS.canvas.width  = rect.width
					ELEMENTS.canvas.height = rect.height

				// draw wheel
					clearCanvas(ELEMENTS.canvas, ELEMENTS.context)
					drawWheel(ELEMENTS.canvas, ELEMENTS.context, STATE)
			} catch (error) {console.log(error)}
		}

	/* clearCanvas */
		function clearCanvas(canvas, context) {
			try {
				context.clearRect(0, 0, canvas.width, canvas.height)
			} catch (error) {console.log(error)}
		}

	/* translateCanvas */
		function translateCanvas(canvas, context, x, y, callback) {
			try {
				// slide
					context.translate(x, -y)

				// do stuff
					callback()

				// slide back
					context.translate(-x, y)
			} catch (error) {console.log(error)}
		}

	/* rotateCanvas */
		function rotateCanvas(canvas, context, a, callback) {
			try {
				// slide
					context.rotate(-a)

				// do stuff
					callback()

				// slide back
					context.rotate(a)
			} catch (error) {console.log(error)}
		}

	/* drawWedge */
		function drawWedge(canvas, context, wedge) {
			try {
				// set values
					context.fillStyle = wedge.fill || "transparent"

				// get variables
					let startAngle = (wedge.startAngle !== undefined ? wedge.startAngle : 0)
					let endAngle   = (wedge.endAngle   !== undefined ? wedge.endAngle : CONSTANTS.circle.degrees)

				// draw
					context.beginPath()
					context.moveTo(0, 0)
					context.arc(0, 0, wedge.radius, startAngle * CONSTANTS.circle.radians / CONSTANTS.circle.degrees, endAngle * CONSTANTS.circle.radians / CONSTANTS.circle.degrees)
					context.closePath()
					context.fill()
			} catch (error) {console.log(error)}
		}

	/* drawText */
		function drawText(canvas, context, text) {
			try {
				// no body
					if (!text.body) {
						return
					}

				// set values
					context.strokeStyle = text.stroke || "transparent"
					context.lineWidth = text.lineWidth || 0
					context.shadowColor = text.shadowColor || "transparent"
					context.shadowBlur = text.shadowBlur || 0
					context.font = (text.fontSize || 0) + "px " + (text.fontFamily || "monospace")
					context.textAlign = "center"
					context.textBaseline = "middle"

				// draw
					context.strokeText(text.body, text.x, -text.y)
			} catch (error) {console.log(error)}
		}

/*** wheel ***/
	/* updateWheelRotation */
		function updateWheelRotation() {
			try {
				// update rotation
					const remainingFraction = 1 - STATE.rotation / STATE.targetRotation
					const rotationAmount = Math.max(CONSTANTS.circle.minAnglePerCycle, CONSTANTS.circle.minAnglePerCycle + (CONSTANTS.circle.maxAnglePerCycle - CONSTANTS.circle.minAnglePerCycle) * remainingFraction)
					STATE.rotation = Math.min(STATE.rotation + rotationAmount, STATE.targetRotation)

				// redraw
					clearCanvas(ELEMENTS.canvas, ELEMENTS.context)
					drawWheel(ELEMENTS.canvas, ELEMENTS.context, STATE)

				// not done
					if (STATE.rotation < STATE.targetRotation) {
						return
					}

				// done
					clearInterval(STATE.rotationLoop)
					delete STATE.rotationLoop

				// temporary glow
					ELEMENTS.body.setAttribute("post-spin", true)
					setTimeout(function() {
						ELEMENTS.spin.removeAttribute("disabled")
						ELEMENTS.options.removeAttribute("disabled")
						ELEMENTS.body.removeAttribute("post-spin")
					}, CONSTANTS.circle.cooldown)
			} catch (error) {console.log(error)}
		}

	/* drawWheel */
		function drawWheel(canvas, context, state) {
			try {
				// no options
					if (!Object.keys(state.options).length) {
						return
					}

				// get math
					let anglePerWedge = CONSTANTS.circle.degrees / state.totalWedges
					let radius = Math.min(canvas.height, canvas.width) * CONSTANTS.circle.radius

				// get first option offset
					let startAngle = state.rotation + (anglePerWedge * state.options[Object.keys(state.options)[0]].count / 2)

				// move to center
					translateCanvas(canvas, context, canvas.width / 2, canvas.height / -2, function() {
						// draw wedges
							for (let i in state.options) {
								// calculate size of wedge
									let endAngle = state.options[i].count * anglePerWedge

								// rotate canvas for this wedge
									rotateCanvas(canvas, context, startAngle * CONSTANTS.circle.radians / CONSTANTS.circle.degrees, function() {
										// draw wedge
											drawWedge(canvas, context, {
												fill: CONSTANTS.colors[state.options[i].color],
												startAngle: 0,
												endAngle: endAngle,
												radius: radius
											})

										// draw text in middle of wedge
											rotateCanvas(canvas, context, (CONSTANTS.circle.degrees - endAngle / 2) * CONSTANTS.circle.radians / CONSTANTS.circle.degrees, function() {
												drawText(canvas, context, {
													fontSize: CONSTANTS.font.size,
													fontFamily: CONSTANTS.font.family,
													stroke: CONSTANTS.font.color,
													lineWidth: CONSTANTS.font.lineWidth,
													shadowColor: CONSTANTS.font.shadowColor,
													shadowBlur: CONSTANTS.font.shadowBlur,
													body: i.trim(),
													x: radius * CONSTANTS.font.radius,
													y: 0
												})
											})
									})

								// update canvas angle
									startAngle -= endAngle
							}

						// draw indicator
							const offset = Math.min(canvas.height, canvas.width) * (CONSTANTS.indicator.outlineRadius - CONSTANTS.indicator.radius) * CONSTANTS.indicator.offset
							translateCanvas(canvas, context, radius - 2 * offset, 0, function() {
								drawWedge(canvas, context, {
									fill: CONSTANTS.indicator.outlineColor,
									radius: Math.min(canvas.height, canvas.width) * CONSTANTS.indicator.outlineRadius,
									startAngle: CONSTANTS.indicator.angle / -2,
									endAngle: CONSTANTS.indicator.angle / 2
								})

								translateCanvas(canvas, context, offset, 0, function() {
									drawWedge(canvas, context, {
										fill: CONSTANTS.indicator.color,
										radius: Math.min(canvas.height, canvas.width) * CONSTANTS.indicator.radius,
										startAngle: CONSTANTS.indicator.angle / -2,
										endAngle: CONSTANTS.indicator.angle / 2
									})
								})
							})
					})
			} catch (error) {console.log(error)}
		}








