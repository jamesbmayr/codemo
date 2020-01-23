window.addEventListener("load", function() {

	/*** onload ***/
		/* triggers */
			if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
				var on = { click: "touchstart", mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" }
			}
			else {
				var on = { click:      "click", mousedown:  "mousedown", mousemove: "mousemove", mouseup:  "mouseup" }
			}

		/* elements */
			var dial = document.getElementById("inner-dial")
			var container = document.getElementById("container")
			var refresh = document.getElementById("refresh")
			var lights = document.getElementById("lights")
			var lightArray = null

		/* globals */
			var playing = false
			var shakeOff = null
			var code = null
			var index = 0

	/*** game ***/
		/* refreshGame */
			refresh.addEventListener(on.click, refreshGame)
			function refreshGame() {
				lights.removeAttribute("lit")

				clearInterval(shakeOff)
				code = generateCode()
				index = 0

				refresh.removeAttribute("clickable")

				playing = true
			}

		/* generateCode */
			function generateCode() {
				lights.innerHTML = ""
				lightArray = []
				
				var code = []
				for (var i = 0; i < 6; i++) {
					var light = document.createElement("div")
						light.className = "light"
					lights.appendChild(light)
					lightArray.push(light)

					code.push(Math.floor(Math.random() * 360))
				}

				return code
			}

		/* updateCode */
			setInterval(updateCode, 500)
			function updateCode() {
				if (playing) {
					code[index] = code[index] + (Math.floor(Math.random() * 6) - 3)
					code[index] = (360 + code[index]) % 360
				}
			}

	/*** dial ***/
		/* grabDial */
			dial.addEventListener(on.mousedown, grabDial)
			function grabDial(event) {
				if (playing) {
					dial.setAttribute("grabbed", true)
				}
			}

		/* releaseDial */
			window.addEventListener(on.mouseup, releaseDial)
			function releaseDial(event) {
				dial.removeAttribute("grabbed")
			}

		/* turnDial */
			window.addEventListener(on.mousemove, turnDial)
			function turnDial(event) {
				if (playing && dial.getAttribute("grabbed")) {
					var rect = dial.getBoundingClientRect()
					var dialX = Number(rect.x + rect.width / 2)
					var dialY = Number(rect.y + rect.height / 2)

					var x = event.x || event.touches[0].x || event.touches[0].clientX
					var y = event.y || event.touches[0].y || event.touches[0].clientY

					var angle = Math.round(getAngle(dialX, dialY, x, y) * 2) / 2

					dial.style.transform = "translateX(-50%) translateY(-50%) rotate(" + angle + "deg)"

					if (code[index] == angle) {
						lightArray[index].setAttribute("lit", true)
						index++

						if (index >= code.length) {
							lights.setAttribute("lit", true)
							refresh.setAttribute("clickable", true)
							playing = false
						}
					}
					else if (code[index] > angle - 5 && code[index] < angle + 5) {
						shakeContainer()
					}
				}
			}

	/*** helpers ***/
		/* getAngle */
			function getAngle(x1, y1, x2, y2) {
				var dx = (x2 - x1)
				var dy = (y2 - y1)
				var radians = Math.atan2(dy, dx)
				var degrees = radians * 180 / Math.PI
					degrees = (degrees + 90 + 360) % 360
				return degrees
			}

	/* shakeContainer */
		function shakeContainer() {
			clearTimeout(shakeOff)
			
			container.setAttribute("shake", true)
			navigator.vibrate([500])

			shakeOff = setTimeout(function() {
				container.removeAttribute("shake")
			}, 500)
		}
})
