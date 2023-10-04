/* triggers */
	if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
		var on = { click: "touchstart", mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend", mouseenter: "touchstart", mouseleave: "touchend" }
	}
	else {
		var on = { click:      "click", mousedown:  "mousedown", mousemove: "mousemove", mouseup:  "mouseup", mouseenter: "mouseenter", mouseleave: "mouseleave" }
	}

window.score = 0
window.loopCount = 0

var colors = ["red","orange","yellow","green","blue","purple","magenta","cyan","goldenrod","brown","gray","teal","maroon","darkblue","darkgreen","darkmagenta"]

var loop = setInterval(function() {
	var count = Array.from(document.querySelectorAll(".sphere")).length
	var logScore = Math.floor(Math.log(window.score) || 0)
	var windowHeight = window.innerHeight
	var windowWidth = window.innerWidth

	if (count < Math.max(5,logScore * 2)) {
		var startTop = (Math.random() * (windowHeight - 100)) + 10
		var startLeft = (Math.random() * (windowWidth - 100)) + 10
		var radius = Math.floor(Math.random() * 50) + 50
		var angle = Math.random() * 360
		var distance = (Math.random() * Math.max(50, logScore * 10))
		var color = colors[Math.floor(Math.random() * colors.length)]

		var sphere = document.createElement("div")
			sphere.className = "sphere"
			sphere.style.backgroundColor = color
			sphere.style.top = startTop + "px"
			sphere.style.left = startLeft + "px"
			sphere.style.height = radius + "px"
			sphere.style.width = radius + "px"
			sphere.style.opacity = 1
			sphere.setAttribute("angle", angle)
			sphere.setAttribute("distance", distance)
			sphere.addEventListener(on.mouseenter, enterSphere)
		document.querySelector("#pen").appendChild(sphere)
	}

	Array.from(document.querySelectorAll(".sphere")).forEach(function(sphere) {
		var opacity = Number(sphere.style.opacity)

		if (opacity <= 0) {
			sphere.remove()
			window.score--
			document.querySelector("#score").innerText = window.score
		}
		else {
			var angle = Number(sphere.getAttribute("angle"))
			var distance = Number(sphere.getAttribute("distance"))
			var height = Number(sphere.style.height.replace("px",""))
			var width = Number(sphere.style.width.replace("px",""))

			var startTop = Number(sphere.style.top.replace("px", ""))
			var startLeft = Number(sphere.style.left.replace("px", ""))
			var startBottom = height + startTop
			var startRight = width + startLeft

			if (startBottom >= windowHeight - 15) {
				if ((angle > 0) && (angle < 180)) {
					angle = 360 - angle
					if (angle < 0) {
						angle = angle + 360
					}
					else if (angle > 360) {
						angle = angle - 360
					}
					sphere.setAttribute("angle", angle)
				}
			}
			if (startTop <= 15) {
				if ((angle > 180) && (angle < 360)) {
					angle = 360 - angle
					if (angle < 0) {
						angle = angle + 360
					}
					else if (angle > 360) {
						angle = angle - 360
					}
					sphere.setAttribute("angle", angle)
				}
			}
			if (startRight >= windowWidth - 15) {
				if (((angle >= 0) && (angle < 90)) || ((angle < 360) && (angle > 270))) {
					angle = 180 - angle
					if (angle < 0) {
						angle = angle + 360
					}
					else if (angle > 360) {
						angle = angle - 360
					}
					sphere.setAttribute("angle", angle)
				}
			}
			if (startLeft <= 15) {
				if ((angle > 90) && (angle < 270)) {
					angle = 180 - angle
					if (angle < 0) {
						angle = angle + 360
					}
					else if (angle > 360) {
						angle = angle - 360
					}
					sphere.setAttribute("angle", angle)
				}
			}

			var endTop = (distance * Math.sin(angle * Math.PI / 180)) + startTop
			var endLeft = (distance * Math.cos(angle * Math.PI / 180)) + startLeft
			var endBottom = height + endTop
			var endRight = width + endLeft

			sphere.style.left = (endLeft + "px")
			sphere.style.top = (endTop + "px")
			sphere.style.opacity = (opacity - 0.015)
		}
	})
}, 100)

function enterSphere(event) {
	event.target.remove()
	window.score++
	document.querySelector("#score").innerText = window.score
}
