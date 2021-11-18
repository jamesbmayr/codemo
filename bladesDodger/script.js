window.onload = function() {

	/* triggers */
		if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
			var on = { click: "touchstart", mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" }
		}
		else {
			var on = { click:      "click", mousedown:  "mousedown", mousemove: "mousemove", mouseup:  "mouseup" }
		}

	/* on load */
		window.score = 0
		window.level = 0
		window.clock = 0
		window.playing = false

	/* gameLoop */
		window.gameLoop = setInterval(iterateState, 100)
		function iterateState() {
			if (window.playing) {
				if (window.clock <= 0) {
					//lose
					window.playing = false
					window.score = 0
					window.level = 0
					window.clock = 0

					animateElement(document.querySelector("#container"), {
						"top": (window.innerHeight / 2) + "px",
						"left": (window.innerWidth / 2) + "px"
					}, 500)

					document.querySelector("#hand").className = document.querySelector("#hand").className.replace("ticking", "")
					setTimeout(function() {
						document.querySelector("#blades_inner").className = document.querySelector("#blades_inner").className.replace("spinning", "")
						document.querySelector("#container").style.top = "50%"
						document.querySelector("#container").style.left = "50%"
					}, 1000)

					animateElement(document.querySelector("#lose_screen"), {
						height: (Math.min(window.innerHeight, window.innerWidth) * 0.99 * 0.99) + "px",
						width: (Math.min(window.innerHeight, window.innerWidth) * 0.99 * 0.99) + "px"
					}, 1000)
				}
				else if (window.score >= 100) {
					//win
					window.playing = false

					animateElement(document.querySelector("#container"), {
						"top": (window.innerHeight / 2) + "px",
						"left": (window.innerWidth / 2) + "px"
					}, 500)

					setTimeout(function() {
						document.querySelector("#blades_inner").className = document.querySelector("#blades_inner").className.replace("spinning", "")
						document.querySelector("#hand").className = document.querySelector("#hand").className.replace("ticking", "")
						document.querySelector("#container").style.top = "50%"
						document.querySelector("#container").style.left = "50%"
					}, 1000)

					animateElement(document.querySelector("#win_screen"), {
						height: (Math.min(window.innerHeight, window.innerWidth) * 0.99 * 0.99) + "px",
						width: (Math.min(window.innerHeight, window.innerWidth) * 0.99 * 0.99) + "px"
					}, 1000)
				}
				else {
					//continue
					window.clock -= 100
					
					if (Array.from(document.querySelectorAll(".gem")).length < window.level) {
						//add gem
						var id = "gem_" + Number(Math.round(Math.random() * 100000)).toString(36)
						var angle = Math.random() * 2 * Math.PI
						var radius = (Math.random() * 25) + 20
						var left = 50 + (radius * Math.cos(angle))
						var top = 50 + (radius * Math.sin(angle))
						
						var gem = document.createElement("div")
							gem.id = id
							gem.className = "gem"
							gem.style.opacity = 0
							gem.style.left = left + "%"
							gem.style.top = top + "%"
							gem.addEventListener(on.click, collectGem)
						document.querySelector("#gems").appendChild(gem)

						setTimeout(function() {
							animateElement(gem, {
								opacity: 1
							}, 250)
						}, 0)
					}

					if ((window.clock < 5000) && (window.clock > 1000)) {
						var computedStyle = window.getComputedStyle(document.querySelector("#container"))
						animateElement(document.querySelector("#container"), {
							top: (Number(computedStyle.top.replace("px", "")) + (Math.floor(Math.random() * 5) - 2)) + "px",
							left: (Number(computedStyle.left.replace("px", "")) + (Math.floor(Math.random() * 5) - 2)) + "px"
						}, 100)
					}
				}
			}
		}
	
	/* startRound */
		Array.from(document.querySelectorAll(".play")).forEach(function(button) {
			button.addEventListener(on.click, startRound)
		})
		function startRound(event) {
			if (window.clock !== 60000) {
				window.clock = 60 * 1000
				window.level++
				window.score = 10

				document.querySelector("#hand").style.transform = "rotate(0deg)"
				document.querySelector("#points").style.height = "0%"
				document.querySelector("#points").style.width = "0%"
				document.querySelector("#level_count").innerText = window.level
				document.querySelector("#container").style.top = "50%"
				document.querySelector("#container").style.left = "50%"

				document.querySelector("#gems").innerHTML = ""
				document.querySelector("#blades_inner").innerHTML = ""
				for (var x = 0; x < window.level; x++) {
					var blade = document.createElement("div")
						blade.className = "blade"
						blade.style.transform = "rotate(" + (x * (360 / window.level)) + "deg)"
						blade.addEventListener(on.click, hitBlade)
					document.querySelector("#blades_inner").appendChild(blade)
				}

				animateElement(document.querySelector("#welcome_screen"), {
					height: "0px",
					width: "0px",
				}, 3000) 
				animateElement(document.querySelector("#win_screen"), {
					height: "0px",
					width: "0px",
				}, 3000)
				animateElement(document.querySelector("#lose_screen"), {
					height: "0px",
					width: "0px",
				}, 3000)

				setTimeout(function() {
					window.playing = true
					document.querySelector("#blades_inner").className += " spinning"
					document.querySelector("#hand").className += " ticking"
				}, 3000)
			}
		}

	/* collectGem */
		function collectGem(event) {
			if (window.playing && !event.target.className.includes("collected")) {
				var gem = event.target

				gem.className += " collected"
				animateElement(gem, {
					opacity: 0
				}, 500)
				
				setTimeout(function() {
					gem.remove()
				}, 500)

				window.score = Math.min(100, window.score + (10 / window.level))
				animateElement(document.querySelector("#points"), {
					height: (Math.min(window.innerHeight, window.innerWidth) * 0.85) * (window.score / 100) + "px",
					width: (Math.min(window.innerHeight, window.innerWidth) * 0.85) * (window.score / 100) + "px"
				}, 500)
			}
		}

	/* hitBlade */
		function hitBlade(event) {
			if (window.playing) {
				window.score = Math.max(10, window.score - (50 / window.level))
				animateElement(document.querySelector("#points"), {
					height: (Math.min(window.innerHeight, window.innerWidth) * 0.85) * (window.score / 100) + "px",
					width: (Math.min(window.innerHeight, window.innerWidth) * 0.85) * (window.score / 100) + "px"
				}, 500)
			}
		}

	/* animateElement */
		function animateElement(element, endState, timeToCompletion) {
			// determine number of steps
				var stepDuration = 10 // constant
				var stepTotal = timeToCompletion / stepDuration

			// get starting styles
				var currentStyles = window.getComputedStyle(element)
				var attributes = {}
				for (var i in endState) {
					var unit = typeof endState[i] == "string" ? endState[i].replace(/[0-9.-]/g, "") : null
					attributes[i] = {
						unit: unit,
						start: Number(unit ? currentStyles[i].replace(unit, "") : currentStyles[i]),
						end:   Number(unit ?      endState[i].replace(unit, "") : endState[i])
					}
					attributes[i].delta = (attributes[i].end - attributes[i].start) / stepTotal
				}

			// time loop
				var step = 0
				var animationLoop = setInterval(function() {
					step++
					if (step > stepTotal) {
						clearInterval(animationLoop)
					}
					else {
						for (var i in attributes) {
							element.style[i] = (attributes[i].start + (step * attributes[i].delta)) + attributes[i].unit
						}
					}
				}, stepDuration)
		}
}
