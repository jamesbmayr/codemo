window.addEventListener("load", function() {

	// globals
			var canvas = document.getElementById("canvas")			
			var context = canvas.getContext("2d")
			var clouds = []
			var loop = setInterval(updateCanvas, 100)

	// resize canvas
		resizeCanvas()
		window.addEventListener("resize", resizeCanvas)
		function resizeCanvas() {
			canvas.height = window.innerHeight
			canvas.width = window.innerWidth
		}

	// draw circle
		function drawCircle(centerX, centerY, radius, color) {
			context.beginPath()
			context.fillStyle = color
			context.arc(centerX, centerY, radius, 0, Math.PI * 2)
			context.fill()
		}

	// draw rectangle
		function drawRectangle(topleftX, topleftY, width, height, color) {
			context.beginPath()
			context.fillStyle = color
			context.moveTo(topleftX, topleftY)
			context.lineTo(topleftX + width, topleftY)
			context.lineTo(topleftX + width, topleftY + height)
			context.lineTo(topleftX, topleftY + height)
			context.closePath()
			context.fill()
		}

	// update canvas
		function updateCanvas() {
			context.clearRect(0, 0, canvas.width, canvas.height)
			drawRectangle(0, 0, canvas.width, canvas.height, "lightblue")

			if (clouds.length < 30) {
				createCloud()
			}

			moveClouds()

			for (var i = 0; i < clouds.length; i++) {
				drawCloud(clouds[i].x, clouds[i].y, clouds[i].color)
			}				
		}

	// create cloud
		function createCloud() {
			var vx = Math.random() * 7 + 3
				vx = Math.floor(Math.random() * 2) ? vx : -vx
			
			clouds.push({
				x: (vx > 0) ? -120 : canvas.width + 20,
				y: Math.random() * canvas.height,
				vx: vx,
				color: ["white", "lightgray", "darkgray", "gray"][Math.floor(Math.random() * 4)]
			})
		}

	// move clouds
		function moveClouds() {
			for (var j = 0; j < clouds.length; j++) {
				clouds[j].x += clouds[j].vx

				if (clouds[j].vx > 0 && clouds[j].x > canvas.width + 20) {
					clouds.splice(j, 1)
					j--
				}
				else if (clouds[j].vx < 0 && clouds[j].x < -120) {
					clouds.splice(j, 1)
					j--
				}
			}
		}

	// draw cloud
		function drawCloud(x, y, color) {
			drawRectangle(x, y, 100, 40, color)
			drawCircle(x, y + 20, 20, color)
			drawCircle(x + 100, y + 20, 20, color)
			drawCircle(x + 35, y, 35, color)
			drawCircle(x + 75, y + 5, 25, color)
		}
})
