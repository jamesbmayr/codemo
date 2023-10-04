/* triggers */
	if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
		var on = { click: "touchstart", mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" }
	}
	else {
		var on = { click:      "click", mousedown:  "mousedown", mousemove: "mousemove", mouseup:  "mouseup" }
	}

/* constants */
	var constants = {
		loopTime: 100,
		timeSteps: 10,
		endTime: 2000,
		startingTop: 50,
		gutterPercentage: 10,
		fidelity: 100,
		balloonSize: 100,
		baseSpeed: 10,
		dimPerLoop: 0.05
	}

/* load */
	startGame()

/* listeners */
	document.querySelector("#restart").addEventListener(on.click, startGame)

/* startGame */
	function startGame() {
		window.score = 0
		window.count = 0
		window.playing = true

		document.querySelector("#score").innerText = ""
		document.querySelector("#restart").style.display = "none"
		
		if (window.endTimer) {
			clearInterval(window.endTimer)
			clearInterval(window.timer)
			Array.from(document.querySelectorAll(".balloon")).forEach(function(balloon) {
				balloon.remove()
			})
		}

		window.timer = setInterval(function() {
			moveBalloons()
			spawnBalloons()
		}, constants.loopTime)
	}

/* stopGame */
	function stopGame() {
		window.playing = false
		document.querySelector("#restart").style.display = "block"

		Array.from(document.querySelectorAll(".balloon")).forEach(function(balloon) {
			balloon.className += " popped"
			balloon.style.backgroundColor = "transparent"
			Array.from(balloon.children).forEach(function(element) {
				element.style.display = "block"
			})
		})

		window.endTimer = setTimeout(function() {
			clearInterval(window.timer)
			Array.from(document.querySelectorAll(".balloon")).forEach(function(balloon) {
				balloon.remove()
			})
		}, constants.endTime)
	}

/* moveBalloons */
	function moveBalloons() {
		Array.from(document.querySelectorAll(".balloon")).forEach(function(balloon) {
			var top = Number(balloon.style.top.replace("px",""))

			if ((top < 0) && !balloon.className.includes("popped")) {
				if (window.playing) {
					stopGame()
				}
			}
			else if (Number(balloon.style.opacity) <= 0) {
				balloon.remove()
			}
			else if (balloon.className.includes("popped")) {
				dimBalloon(balloon)
			}
			else {
				moveBalloon(balloon)
			}
		})
	}

/* spawnBalloons */
	function spawnBalloons() {
		if (window.playing) {
			if (window.score < 5) {
				var limit = 3
			}
			else if (window.score < 10) {
				var limit = 4
			}
			else if (window.score < 20) {
				var limit = 5
			}
			else if (window.score < 30) {
				var limit = 6
			}
			else if (window.score < 50) {
				var limit = 8
			}
			else if (window.score < 100) {
				var limit = 10
			}
			else {
				var limit = 13
			}
		}

		var colors = ["red","orange","yellow","green","blue","purple","cyan","magenta","gray"]

		while ((window.count - window.score) < limit) {
			var speed = Math.floor((Math.random() * limit + constants.baseSpeed) * constants.fidelity) / constants.fidelity
			var left = Math.floor((Math.random() * (100 - 3 * constants.gutterPercentage) + constants.gutterPercentage) * constants.fidelity) / constants.fidelity
			var color = colors[Math.floor(Math.random() * colors.length)]
			var stringType = Math.floor(Math.random() * 2)

			var balloon = document.createElement("div")
				balloon.id = "balloon_" + window.count
				balloon.className = "balloon " + color
				balloon.style.opacity = 1
				balloon.style.top = (window.innerHeight + constants.startingTop) + "px"
				balloon.style.left = left + "%"
				balloon.setAttribute("speed", speed)
				balloon.addEventListener(on.click, popBalloon)
			document.querySelector("#container").appendChild(balloon)
			
			var corners = ["top-left", "top-right", "bottom-left", "bottom-right"]
			for (var i in corners) {
				var poppedPart = document.createElement("div")
					poppedPart.className = "popped-part " + corners[i] + " " + color
				balloon.appendChild(poppedPart)
			}
			
			var string = document.createElement("div")
				string.className = "string_" + stringType
			balloon.appendChild(string)

			window.count++
		}
	}

/* dimBalloon */
	function dimBalloon(balloon) {
		var step = 0
		var balloonInterval = setInterval(function() {
			if (step >= constants.timeSteps) {
				clearInterval(balloonInterval)
			}
			else {
				balloon.style.opacity -= (constants.dimPerLoop / constants.timeSteps)
				step++
			}
		}, constants.loopTime / constants.timeSteps)
	}

/* moveBalloon */
	function moveBalloon(balloon) {
		var speed = Number(balloon.getAttribute("speed"))
		var step = 0
		var balloonInterval = setInterval(function() {
			if (step >= constants.timeSteps) {
				clearInterval(balloonInterval)
			}
			else {
				balloon.style.top = (balloon.style.top.replace("px", "") - (speed / constants.timeSteps)) + "px"
				step++
			}
		}, constants.loopTime / constants.timeSteps)
	}

/* popBalloon */
	function popBalloon(event) {
		var balloon = event.target
		if (window.playing && !balloon.className.includes("popped")) {
			balloon.className += " popped"
			balloon.style.backgroundColor = "transparent"
			Array.from(balloon.children).forEach(function(element) {
				element.style.display = "block"
			})

			window.score++
			document.querySelector("#score").innerText = window.score
		}
	}
