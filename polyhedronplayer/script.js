window.onload = function() {
	/*** onload ***/
		/* triggers */
			if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
				var on = { click: "touchstart", mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" }
			}
			else {
				var on = { click:      "click", mousedown:  "mousedown", mousemove: "mousemove", mouseup:  "mouseup" }
			}

		/* globals */
			var canvas  = document.getElementById("canvas")
			var context = canvas.getContext("2d")
			var data    = null

	/*** helpers ***/
		/* getMinDegrees */
			function getMinDegrees(angle) {
				return (angle + 360) % 360
			}

		/* getRadians */
			function getRadians(degrees) {
				return getMinDegrees(degrees) * Math.PI / 180
			}

		/* getDegrees */
			function getDegrees(radians) {
				return getMinDegrees(radians * 180 / Math.PI)
			}

		/* getScalar */
			function getScalar(x, y, z) {
				if (z) {
					return Math.pow(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2), 0.5)
				}
				else {
					return Math.pow(Math.pow(x, 2) + Math.pow(y, 2), 0.5)
				}
			}

	/*** inputs ***/
		/* updateSettings */
			document.querySelectorAll("button").forEach(function(button) {
				button.addEventListener(on.click, updateSettings)
			})
			function updateSettings(event) {
				switch (event.target.id) {
					// + - 
						case "x-rotation-minus":
							rotatePolyhedrons(data, "x", -1)
						break
						case "x-rotation-plus":
							rotatePolyhedrons(data, "x", 1)
						break
						case "x-position-minus":
							translatePolyhedrons(data, -5, 0, 0)
						break
						case "x-position-plus":
							translatePolyhedrons(data, 5, 0, 0)
						break

						case "y-rotation-minus":
							rotatePolyhedrons(data, "y", -1)
						break
						case "y-rotation-plus":
							rotatePolyhedrons(data, "y", 1)
						break
						case "y-position-minus":
							translatePolyhedrons(data, 0, -5, 0)
						break
						case "y-position-plus":
							translatePolyhedrons(data, 0, 5, 0)
						break

						case "z-rotation-minus":
							rotatePolyhedrons(data, "z", -1)
						break
						case "z-rotation-plus":
							rotatePolyhedrons(data, "z", 1)
						break
						case "z-position-minus":
							translatePolyhedrons(data, 0, 0, -5)
						break
						case "z-position-plus":
							translatePolyhedrons(data, 0, 0, 5)
						break

						case "opacity-minus":
							data.settings.opacity.value = Math.max(0, Math.min(1, Math.round(data.settings.opacity.value * 1000 - 100) / 1000))
						break
						case "opacity-plus":
							data.settings.opacity.value = Math.max(0, Math.min(1, Math.round(data.settings.opacity.value * 1000 + 100) / 1000))
						break

						case "c-power-minus":
							data.settings.camera.power = Math.max(1, Math.min(7, Math.round(data.settings.camera.power * 1000 - 100) / 1000))
							data.settings.camera.position = Math.round(Math.pow(10, data.settings.camera.power))
						break
						case "c-power-plus":
							data.settings.camera.power = Math.max(1, Math.min(7, Math.round(data.settings.camera.power * 1000 + 100) / 1000))
							data.settings.camera.position = Math.round(Math.pow(10, data.settings.camera.power))
						break

					// auto
						case "x-rotation-auto-minus":
							if (event.target.getAttribute("selected")) {
								event.target.removeAttribute("selected")
								data.settings.x.rotationauto = 0
							}
							else {
								event.target.setAttribute("selected", true)
								document.getElementById("x-rotation-auto-plus").removeAttribute("selected")
								data.settings.x.rotationauto = -1
							}
						break
						case "x-rotation-auto-plus":
							if (event.target.getAttribute("selected")) {
								event.target.removeAttribute("selected")
								data.settings.x.rotationauto = 0
							}
							else {
								event.target.setAttribute("selected", true)
								document.getElementById("x-rotation-auto-minus").removeAttribute("selected")
								data.settings.x.rotationauto = 1
							}
						break
						case "x-position-auto-minus":
							if (event.target.getAttribute("selected")) {
								event.target.removeAttribute("selected")
								data.settings.x.positionauto = 0
							}
							else {
								event.target.setAttribute("selected", true)
								document.getElementById("x-position-auto-plus").removeAttribute("selected")
								data.settings.x.positionauto = -1
							}
						break
						case "x-position-auto-plus":
							if (event.target.getAttribute("selected")) {
								event.target.removeAttribute("selected")
								data.settings.x.positionauto = 0
							}
							else {
								event.target.setAttribute("selected", true)
								document.getElementById("x-position-auto-minus").removeAttribute("selected")
								data.settings.x.positionauto = 1
							}
						break

						case "y-rotation-auto-minus":
							if (event.target.getAttribute("selected")) {
								event.target.removeAttribute("selected")
								data.settings.y.rotationauto = 0
							}
							else {
								event.target.setAttribute("selected", true)
								document.getElementById("y-rotation-auto-plus").removeAttribute("selected")
								data.settings.y.rotationauto = -1
							}
						break
						case "y-rotation-auto-plus":
							if (event.target.getAttribute("selected")) {
								event.target.removeAttribute("selected")
								data.settings.y.rotationauto = 0
							}
							else {
								event.target.setAttribute("selected", true)
								document.getElementById("y-rotation-auto-minus").removeAttribute("selected")
								data.settings.y.rotationauto = 1
							}
						break
						case "y-position-auto-minus":
							if (event.target.getAttribute("selected")) {
								event.target.removeAttribute("selected")
								data.settings.y.positionauto = 0
							}
							else {
								event.target.setAttribute("selected", true)
								document.getElementById("y-position-auto-plus").removeAttribute("selected")
								data.settings.y.positionauto = -1
							}
						break
						case "y-position-auto-plus":
							if (event.target.getAttribute("selected")) {
								event.target.removeAttribute("selected")
								data.settings.y.positionauto = 0
							}
							else {
								event.target.setAttribute("selected", true)
								document.getElementById("y-position-auto-minus").removeAttribute("selected")
								data.settings.y.positionauto = 1
							}
						break

						case "z-rotation-auto-minus":
							if (event.target.getAttribute("selected")) {
								event.target.removeAttribute("selected")
								data.settings.z.rotationauto = 0
							}
							else {
								event.target.setAttribute("selected", true)
								document.getElementById("z-rotation-auto-plus").removeAttribute("selected")
								data.settings.z.rotationauto = -1
							}
						break
						case "z-rotation-auto-plus":
							if (event.target.getAttribute("selected")) {
								event.target.removeAttribute("selected")
								data.settings.z.rotationauto = 0
							}
							else {
								event.target.setAttribute("selected", true)
								document.getElementById("z-rotation-auto-minus").removeAttribute("selected")
								data.settings.z.rotationauto = 1
							}
						break
						case "z-position-auto-minus":
							if (event.target.getAttribute("selected")) {
								event.target.removeAttribute("selected")
								data.settings.z.positionauto = 0
							}
							else {
								event.target.setAttribute("selected", true)
								document.getElementById("z-position-auto-plus").removeAttribute("selected")
								data.settings.z.positionauto = -1
							}
						break
						case "z-position-auto-plus":
							if (event.target.getAttribute("selected")) {
								event.target.removeAttribute("selected")
								data.settings.z.positionauto = 0
							}
							else {
								event.target.setAttribute("selected", true)
								document.getElementById("z-position-auto-minus").removeAttribute("selected")
								data.settings.z.positionauto = 1
							}
						break

						case "opacity-auto-minus":
							if (event.target.getAttribute("selected")) {
								event.target.removeAttribute("selected")
								data.settings.opacity.auto = 0
							}
							else {
								event.target.setAttribute("selected", true)
								document.getElementById("opacity-auto-plus").removeAttribute("selected")
								data.settings.opacity.auto = -.01
							}
						break
						case "opacity-auto-plus":
							if (event.target.getAttribute("selected")) {
								event.target.removeAttribute("selected")
								data.settings.opacity.auto = 0
							}
							else {
								event.target.setAttribute("selected", true)
								document.getElementById("opacity-auto-minus").removeAttribute("selected")
								data.settings.opacity.auto = .01
							}
						break

						case "c-power-auto-minus":
							if (event.target.getAttribute("selected")) {
								event.target.removeAttribute("selected")
								data.settings.camera.auto = 0
							}
							else {
								event.target.setAttribute("selected", true)
								document.getElementById("c-power-auto-plus").removeAttribute("selected")
								data.settings.camera.auto = -0.01
							}
						break
						case "c-power-auto-plus":
							if (event.target.getAttribute("selected")) {
								event.target.removeAttribute("selected")
								data.settings.camera.auto = 0
							}
							else {
								event.target.setAttribute("selected", true)
								document.getElementById("c-power-auto-minus").removeAttribute("selected")
								data.settings.camera.auto = 0.01
							}
						break

					// polyhedrons
						case "p-sphere":
							event.target.setAttribute("selected", true)
							data.settings.polyhedron = "sphere"

							document.getElementById("p-tetrahedron").removeAttribute("selected")
							document.getElementById("p-cube").removeAttribute("selected")
							document.getElementById("p-octahedron").removeAttribute("selected")
							document.getElementById("p-dodecahedron").removeAttribute("selected")
							document.getElementById("p-icosahedron").removeAttribute("selected")
						break
						case "p-tetrahedron":
							event.target.setAttribute("selected", true)
							data.settings.polyhedron = "tetrahedron"

							document.getElementById("p-sphere").removeAttribute("selected")
							document.getElementById("p-cube").removeAttribute("selected")
							document.getElementById("p-octahedron").removeAttribute("selected")
							document.getElementById("p-dodecahedron").removeAttribute("selected")
							document.getElementById("p-icosahedron").removeAttribute("selected")
						break
						case "p-cube":
							event.target.setAttribute("selected", true)
							data.settings.polyhedron = "cube"

							document.getElementById("p-sphere").removeAttribute("selected")
							document.getElementById("p-tetrahedron").removeAttribute("selected")
							document.getElementById("p-octahedron").removeAttribute("selected")
							document.getElementById("p-dodecahedron").removeAttribute("selected")
							document.getElementById("p-icosahedron").removeAttribute("selected")
						break
						case "p-octahedron":
							event.target.setAttribute("selected", true)
							data.settings.polyhedron = "octahedron"

							document.getElementById("p-sphere").removeAttribute("selected")
							document.getElementById("p-tetrahedron").removeAttribute("selected")
							document.getElementById("p-cube").removeAttribute("selected")
							document.getElementById("p-dodecahedron").removeAttribute("selected")
							document.getElementById("p-icosahedron").removeAttribute("selected")
						break
						case "p-dodecahedron":
							event.target.setAttribute("selected", true)
							data.settings.polyhedron = "dodecahedron"

							document.getElementById("p-sphere").removeAttribute("selected")
							document.getElementById("p-tetrahedron").removeAttribute("selected")
							document.getElementById("p-cube").removeAttribute("selected")
							document.getElementById("p-octahedron").removeAttribute("selected")
							document.getElementById("p-icosahedron").removeAttribute("selected")
						break
						case "p-icosahedron":
							event.target.setAttribute("selected", true)
							data.settings.polyhedron = "icosahedron"

							document.getElementById("p-sphere").removeAttribute("selected")
							document.getElementById("p-tetrahedron").removeAttribute("selected")
							document.getElementById("p-cube").removeAttribute("selected")
							document.getElementById("p-octahedron").removeAttribute("selected")
							document.getElementById("p-dodecahedron").removeAttribute("selected")
						break

					// mode
						case "m-vertices":
							event.target.setAttribute("selected", true)
							data.settings.mode = "vertices"

							document.getElementById("m-edges").removeAttribute("selected")
							document.getElementById("m-faces").removeAttribute("selected")
						break
						case "m-edges":
							event.target.setAttribute("selected", true)
							data.settings.mode = "edges"

							document.getElementById("m-vertices").removeAttribute("selected")
							document.getElementById("m-faces").removeAttribute("selected")
						break
						case "m-faces":
							event.target.setAttribute("selected", true)
							data.settings.mode = "faces"

							document.getElementById("m-vertices").removeAttribute("selected")
							document.getElementById("m-edges").removeAttribute("selected")
						break


					// special
						case "orthagonal":
							if (event.target.getAttribute("selected")) {
								event.target.removeAttribute("selected")
								data.settings.camera.orthagonal = false
							}
							else {
								event.target.setAttribute("selected", true)
								data.settings.camera.orthagonal = true
							}
						break

				}

				updateForm(data)
			}

		/* updateValues */
			document.querySelectorAll("input").forEach(function(input) {
				input.addEventListener("change", updateValues)
			})
			function updateValues(event) {
				switch (event.target.id) {
					// xyz
						case "x-rotation":
							if (event.target.value - data.settings.x.rotation) {
								rotatePolyhedrons(data, "x", event.target.value - data.settings.x.rotation)
							}
						break
						case "x-position":
							if (event.target.value - data.settings.x.position) {
								translatePolyhedrons(data, event.target.value - data.settings.x.position, 0, 0)
							}
						break
						case "y-rotation":
							if (event.target.value - data.settings.y.rotation) {
								rotatePolyhedrons(data, "y", event.target.value - data.settings.y.rotation)
							}
						break
						case "y-position":
							if (event.target.value - data.settings.y.position) {
								translatePolyhedrons(data, 0, event.target.value - data.settings.y.position, 0)
							}
						break
						case "z-rotation":
							if (event.target.value - data.settings.z.rotation) {
								rotatePolyhedrons(data, "z", event.target.value - data.settings.z.rotation)
							}
						break
						case "z-position":
							if (event.target.value - data.settings.z.position) {
								translatePolyhedrons(data, 0, 0, event.target.value - data.settings.z.position)
							}
						break

					// opacity
						case "opacity":
							if (event.target.value - data.settings.opacity.value) {
								data.settings.opacity.value = Math.max(0, Math.min(1, Math.round(event.target.value * 1000) / 1000))
							}
						break

					// camera
						case "c-power":
							if (event.target.value - data.settings.camera.power) {
								data.settings.camera.power = Math.max(1, Math.min(7, Math.round(event.target.value * 1000) / 1000))
								data.settings.camera.position = Math.round(Math.pow(10, data.settings.camera.power))
							}
						break
				}
			}

	/*** canvas ***/
		/* clearCanvas */
			function clearCanvas() {
				context.clearRect(0, 0, canvas.width, canvas.height)
			}

		/* projectVertices */
			function projectVertices(options) {
				// parameters
					options = options || {}
					context.beginPath()
					context.fillStyle   = options.color || "transparent"
					context.lineWidth   = options.border || 1
					context.shadowBlur  = options.blur ? options.blur : 0
					context.shadowColor = options.shadow ? options.shadow : "transparent"
					context.globalAlpha = options.opacity || data.settings.opacity.value || 0

				// draw
					for (var c in options.coordinates) {
						// get coordinates
							var x = options.coordinates[0]
							var y = options.coordinates[1]
							var z = options.coordinates[2]

						// projection
							if (!data.settings.camera.orthagonal) {
								var projection = data.settings.camera.position / Math.abs(data.settings.camera.position - z)
								x = x * projection
								y = y * projection
							}

						// translate origin to center
							x = x + (canvas.width  / 2)
							y = y + (canvas.height / 2)

						// draw circle
							context.arc(x, canvas.height - y, 2, 0, 2 * Math.PI)
							context.fill()
					}
			}

		/* projectEdge */
			function projectEdge(options) {
				// parameters
					options = options || {}
					context.beginPath()
					context.strokeStyle   = options.color || "transparent"
					context.lineWidth   = options.border || 1
					context.shadowBlur  = options.blur ? options.blur : 0
					context.shadowColor = options.shadow ? options.shadow : "transparent"
					context.globalAlpha = options.opacity || data.settings.opacity.value || 0

				// draw
					for (var c in options.coordinates) {
						// get coordinates
							var x = options.coordinates[c][0]
							var y = options.coordinates[c][1]
							var z = options.coordinates[c][2]

						// projection
							if (!data.settings.camera.orthagonal) {
								var projection = data.settings.camera.position / Math.abs(data.settings.camera.position - z)
								x = x * projection
								y = y * projection
							}

						// translate origin to center
							x = x + (canvas.width  / 2)
							y = y + (canvas.height / 2)

						// draw points
							if (!c) {
								context.moveTo(x, canvas.height - y)
							}
							else {
								context.lineTo(x, canvas.height - y)
							}
							context.stroke()
					}
			}

		/* projectFace */
			function projectFace(options) {
				// parameters
					options = options || {}
					context.beginPath()
					context.fillStyle   = options.color || "transparent"
					context.lineWidth   = options.border || 1
					context.shadowBlur  = options.blur ? options.blur : 0
					context.shadowColor = options.shadow ? options.shadow : "transparent"
					context.globalAlpha = options.opacity || data.settings.opacity.value || 0

				// draw
					for (var c in options.coordinates) {
						// get coordinates
							var x = options.coordinates[c][0]
							var y = options.coordinates[c][1]
							var z = options.coordinates[c][2]

						// projection
							if (!data.settings.camera.orthagonal) {
								var projection = data.settings.camera.position / Math.abs(data.settings.camera.position - z)
								x = x * projection
								y = y * projection
							}
						
						// translate origin to center
							x = x + (canvas.width  / 2)
							y = y + (canvas.height / 2)
						
						// draw points
							if (!c) {
								context.moveTo(x, canvas.height - y)
							}
							else {
								context.lineTo(x, canvas.height - y)
							}
					}

					context.closePath()
					context.fill()
			}

	/*** data ***/
		/* createData */
			data = createData()
			function createData() {
				return {
					settings: {
						polyhedron: "dodecahedron",
						mode: "faces",
						x: {
							rotation: 0,
							position: 0,
							rotationauto: -1,
							positionauto: 0
						},
						y: {
							rotation: 0,
							position: 0,
							rotationauto: 1,
							positionauto: 0
						},
						z: {
							rotation: 0,
							position: 0,
							rotationauto: -1,
							positionauto: 0
						},
						opacity: {
							value: 0.8,
							auto: 0
						}, 
						camera: {
							orthagonal: false,
							power: 3,
							position: 1000,
							auto: 0
						}
					},
					polyhedrons: {
						sphere: createSphere(),
						tetrahedron: {
							vertices: [[100, 100, 100], [100, -100, -100], [-100, -100, 100], [-100, 100, -100]],
							edges: [[0,1], [1,2], [2,3], [3,0], [1,3], [2,0]],
							faces: [
								{
									color: "red",
									coordinates: [0,1,2]
								},
								{
									color: "yellow",
									coordinates: [0,1,3]
								},
								{
									color: "green",
									coordinates: [0,2,3]
								},
								{
									color: "blue",
									coordinates: [1,2,3]
								}
							]
						},
						cube: {
							vertices: [[100, 100, 100], [-100, 100, 100], [-100, -100, 100], [100, -100, 100], [100, 100, -100], [-100, 100, -100], [-100, -100, -100], [100, -100, -100]],
							edges: [[0,1], [1,2], [2,3], [3,0], [4,5], [5,6], [6,7], [7,4], [0,4], [5,1], [3,7], [6,2]],
							faces: [
								{
									color: "red",
									coordinates: [0,1,2,3]
								},
								{
									color: "orange",
									coordinates: [4,5,6,7]
								},
								{
									color: "white",
									coordinates: [0,4,5,1]
								},
								{
									color: "yellow",
									coordinates: [3,7,6,2]
								},
								{
									color: "blue",
									coordinates: [0,4,7,3]
								},
								{
									color: "green",
									coordinates: [1,5,6,2]
								}
							]
						},
						octahedron: {
							vertices: [[200, 0, 0], [0, 200, 0], [0, 0, 200], [-200, 0, 0], [0, -200, 0], [0, 0, -200]],
							edges: [[0,1], [1,2], [2,0], [3,1], [2,3], [3,4], [4,2], [0,4], [1,5], [5,0], [5,3], [4,5]],
							faces: [
								{
									color: "red",
									coordinates: [0,1,2]
								},
								{
									color: "yellow",
									coordinates: [3,1,2]
								},
								{
									color: "blue",
									coordinates: [3,4,2]
								},
								{
									color: "white",
									coordinates: [0,4,2]
								},
								{
									color: "purple",
									coordinates: [0,1,5]
								},
								{
									color: "green",
									coordinates: [3,1,5]
								},
								{
									color: "orange",
									coordinates: [3,4,5]
								},
								{
									color: "cyan",
									coordinates: [0,4,5]
								}
							]
						},
						dodecahedron: {
							vertices: [[100, 100, 100], [61.803398875, 161.803398875, 0], [100, 100, -100], [161.803398875, 0, -61.803398875], [161.803398875, 0, 61.803398875], [100, -100, -100], [0, -61.803398875, -161.803398875], [0, 61.803398875, -161.803398875], [-61.803398875, 161.803398875, 0], [-100, 100, -100], [-161.803398875, 0, -61.803398875], [-100, -100, -100], [61.803398875, -161.803398875, 0], [-61.803398875, -161.803398875, 0], [100, -100, 100], [-161.803398875, 0, 61.803398875], [-100, 100, 100], [0, -61.803398875, 161.803398875], [0, 61.803398875, 161.803398875], [-100, -100, 100]],
							edges: [[0,1], [1,2], [2,3], [3,4], [4,0], [3,5], [5,6], [6,7], [7,2], [1,8], [8,9], [9,7], [9,10], [10,11], [11,6], [5,12], [12,13], [13,11], [12,14], [14,4], [10,15], [15,16], [16,8], [14,17], [17,18], [18,0], [17,19], [19,13], [18,16], [19,15]],
							faces: [
								{
									color: "red",
									coordinates: [0, 1, 2, 3, 4]
								},
								{
									color: "yellow",
									coordinates: [2, 3, 5, 6, 7]
								},
								{
									color: "blue",
									coordinates: [1, 8, 9, 7, 2]
								},
								{
									color: "white",
									coordinates: [7, 9, 10, 11, 6]
								},
								{
									color: "purple",
									coordinates: [6, 5, 12, 13, 11]
								},
								{
									color: "green",
									coordinates: [4, 3, 5, 12, 14]
								},
								{
									color: "orange",
									coordinates: [8, 9, 10, 15, 16]
								},
								{
									color: "cyan",
									coordinates: [0, 4, 14, 17, 18]
								},
								{
									color: "magenta",
									coordinates: [17, 19, 13, 12, 14]
								},
								{
									color: "black",
									coordinates: [8, 1, 0, 18, 16]
								},
								{
									color: "brown",
									coordinates: [15, 10, 11, 13, 19]
								},
								{
									color: "gray",
									coordinates: [16, 18, 17, 19, 15]
								}
							]
						},
						icosahedron: {
							vertices: [[0, 161.803398875, 100], [100, 0, 161.803398875], [161.803398875, 100, 0], [0, 161.803398875, -100], [-161.803398875, 100, 0], [-100, 0, 161.803398875], [0, -161.803398875, -100], [100, 0, -161.803398875], [-100, 0, -161.803398875], [-161.803398875, -100, 0], [0, -161.803398875, 100], [161.803398875, -100, 0]],
							edges: [[0,1], [1,2], [2,0], [0,3], [3,2], [3,4], [4,0], [0,5], [5,4], [5,1], [6,7], [7,8], [8,6], [6,9], [9,8], [9,10], [10,6], [6,11], [11,10], [11,7], [2,7], [7,3], [11,2], [1,11], [10,1], [5,10], [9,5], [4,9], [8,4], [3,8]],
							faces: [
								{
									color: "red",
									coordinates: [0, 1, 2]
								},
								{
									color: "yellow",
									coordinates: [0, 3, 2]
								},
								{
									color: "blue",
									coordinates: [0, 3, 4]
								},
								{
									color: "white",
									coordinates: [0, 5, 4]
								},
								{
									color: "purple",
									coordinates: [0, 5, 1]
								},
								{
									color: "green",
									coordinates: [6, 7, 8]
								},
								{
									color: "orange",
									coordinates: [6, 9, 8]
								},
								{
									color: "cyan",
									coordinates: [6, 9, 10]
								},
								{
									color: "magenta",
									coordinates: [6, 11, 10]
								},
								{
									color: "black",
									coordinates: [6, 11, 7]
								},
								{
									color: "brown",
									coordinates: [3, 2, 7]
								},
								{
									color: "gray",
									coordinates: [2, 7, 11]
								},
								{
									color: "chartreuse",
									coordinates: [11, 2, 1]
								},
								{
									color: "gold",
									coordinates: [1, 11, 10]
								},
								{
									color: "navy",
									coordinates: [10, 1, 5]
								},
								{
									color: "maroon",
									coordinates: [5, 10, 9]
								},
								{
									color: "salmon",
									coordinates: [9, 5, 4]
								},
								{
									color: "fuchsia",
									coordinates: [4, 9, 8]
								},
								{
									color: "indigo",
									coordinates: [8, 4, 3]
								},
								{
									color: "teal",
									coordinates: [3, 8, 7]
								}
							]
						}
					},
					loop: setInterval(function() { updateData(data) }, 100)
				}
			}

		/* createSphere */
			function createSphere() {
				// angle
					var radius = 200
					var sectors = 40
					var angle = 360 / sectors

				// vertices
					var vertices = []

					// south pole
						vertices.push([0, 0, -radius])

					// body
						for (var z = -90 + angle; z < 90; z += angle) {
							var cos = Math.cos(getRadians(z)) * radius
							var sin = Math.sin(getRadians(z)) * radius
							
							for (var i = 0; i < 360; i += angle) {
								vertices.push([cos * Math.cos(getRadians(i)), cos * Math.sin(getRadians(i)), sin])
							}
						}

					// north pole
						vertices.push([0, 0, radius])

				// edges
					var edges = []

					// south pole
						for (var i = 0; i < sectors - 1; i++) {
							edges.push([0, i + 1])
							edges.push([i + 1, i + 2])
						}
						edges.push([0, i + 1])
						edges.push([i + 1, 1])

					// body
						for (var z = 0; z < sectors / 2 - 2; z++) {
							for (var i = 0; i < sectors - 1; i++) {
								edges.push([i + (sectors * (z + 1)) + 1, i + (sectors * (z + 1)) + 2])
								edges.push([i + (sectors *  z)      + 1, i + (sectors * (z + 1)) + 1])
							}
							edges.push([i + (sectors * (z + 1)) + 1, (sectors * (z + 1)) + 1])
							edges.push([i + (sectors * (z + 1)) + 1, (sectors * (z + 1))    ])
						}

					// north pole
						var final = vertices.length - 1
						for (var i = 0; i < sectors - 1; i++) {
							edges.push([final - 0, final - (i + 1)])
						}
						edges.push([final - 0, final - (i + 1)])

				// faces
					var faces = []
					var r = 15
					var b = 255

					// south pole
						for (var i = 0; i < sectors - 1; i++) {
							faces.push({color: "rgb(" + r + "," + (i <= (sectors / 2) ? i * (240 / sectors * 2) + 15 : (sectors - i) * (240 / sectors * 2) + 15) + "," + b + ")", coordinates: [0, i + 1, i + 2]})
						}
							faces.push({color: "rgb(" + r + "," + (i <= (sectors / 2) ? i * (240 / sectors * 2) + 15 : (sectors - i) * (240 / sectors * 2) + 15) + "," + b + ")", coordinates: [0, sectors, 1]})

					// body
						for (var z = 0; z < sectors / 2 - 2; z++) {
							r += 240 / (sectors / 2 - 1)
							b -= 240 / (sectors / 2 - 1)
							
							for (var i = 0; i < sectors - 1; i++) {
								faces.push({color: "rgb(" + r + "," + (i <= (sectors / 2) ? i * (240 / sectors * 2) + 15 : (sectors - i) * (240 / sectors * 2) + 15) + "," + b + ")", coordinates: [i + (sectors * z) + 1, i + (sectors * z) + 2, i + sectors * (z + 1) + 2, i + sectors * (z + 1) + 1]})
							}
								faces.push({color: "rgb(" + r + "," + (i <= (sectors / 2) ? i * (240 / sectors * 2) + 15 : (sectors - i) * (240 / sectors * 2) + 15) + "," + b + ")", coordinates: [     sectors * (z + 1),    (sectors * z) + 1,     sectors * (z + 1) + 1,     sectors * (z + 2)    ]})
						}

					// north pole
						for (var i = 0; i < sectors - 1; i++) {
							faces.push({color: "rgb(" + r + "," + (i <= (sectors / 2) ? i * (240 / sectors * 2) + 15 : (sectors - i) * (240 / sectors * 2) + 15) + "," + b + ")", coordinates: [vertices.length - 1, i + (sectors * z) + 1, i + (sectors * z) + 2]})
						}
							faces.push({color: "rgb(" + r + "," + (i <= (sectors / 2) ? i * (240 / sectors * 2) + 15 : (sectors - i) * (240 / sectors * 2) + 15) + "," + b + ")", coordinates: [vertices.length - 1, (sectors * (z + 1)), (sectors * z) + 1]})

				// package up
					return {
						vertices: vertices,
						edges: edges,
						faces: faces
					}
			}

		/* translatePolyhedrons */
			function translatePolyhedrons(data, x, y, z) {
				// settings
					data.settings.x.position += x
					data.settings.y.position += y
					data.settings.z.position += z

				// polyhedrons
					for (var p in data.polyhedrons) {
						for (var v in data.polyhedrons[p].vertices) {
							var coords = data.polyhedrons[p].vertices[v]
								coords[0] += x
								coords[1] += y
								coords[2] += z
						}
					}
			}

		/* rotatePolyhedrons */
			function rotatePolyhedrons(data, axis, degrees) {
				// angles
					var angle = getRadians(getMinDegrees(degrees))
					var sin   = Math.sin(angle)
					var cos   = Math.cos(angle)

				// rotations
					if (axis == "x") {
						data.settings.x.rotation = getMinDegrees(data.settings.x.rotation + degrees)

						for (var p in data.polyhedrons) {
							for (var v in data.polyhedrons[p].vertices) {
								var y = data.polyhedrons[p].vertices[v][1]
								var z = data.polyhedrons[p].vertices[v][2]
								data.polyhedrons[p].vertices[v][2] = (z * cos) - (y * sin)
								data.polyhedrons[p].vertices[v][1] = (y * cos) + (z * sin)
							}
						}
					}
					else if (axis == "y") {
						data.settings.y.rotation = getMinDegrees(data.settings.y.rotation + degrees)

						for (var p in data.polyhedrons) {
							for (var v in data.polyhedrons[p].vertices) {
								var x = data.polyhedrons[p].vertices[v][0]
								var z = data.polyhedrons[p].vertices[v][2]
								data.polyhedrons[p].vertices[v][0] = (x * cos) - (z * sin)
								data.polyhedrons[p].vertices[v][2] = (z * cos) + (x * sin)
							}
						}
					}
					else if (axis == "z") {
						data.settings.z.rotation = getMinDegrees(data.settings.z.rotation + degrees)

						for (var p in data.polyhedrons) {
							for (var v in data.polyhedrons[p].vertices) {
								var x = data.polyhedrons[p].vertices[v][0]
								var y = data.polyhedrons[p].vertices[v][1]
								data.polyhedrons[p].vertices[v][0] = (x * cos) - (y * sin)
								data.polyhedrons[p].vertices[v][1] = (y * cos) + (x * sin)
							}
						}
					}
			}

		/* updateData */
			function updateData(data) {
				// rotate
					if (data.settings.x.rotationauto) {
						rotatePolyhedrons(data, "x", data.settings.x.rotationauto)
					}
					if (data.settings.y.rotationauto) {
						rotatePolyhedrons(data, "y", data.settings.y.rotationauto)
					}
					if (data.settings.z.rotationauto) {
						rotatePolyhedrons(data, "z", data.settings.z.rotationauto)
					}

				// translate
					if (data.settings.x.positionauto) {
						translatePolyhedrons(data, data.settings.x.positionauto, 0, 0)
					}
					if (data.settings.y.positionauto) {
						translatePolyhedrons(data, 0, data.settings.y.positionauto, 0)
					}
					if (data.settings.z.positionauto) {
						translatePolyhedrons(data, 0, 0, data.settings.z.positionauto)
					}

				// special
					if (data.settings.opacity.auto) {
						data.settings.opacity.value = Math.max(0, Math.min(1, Math.round((data.settings.opacity.value * 1000) + (data.settings.opacity.auto * 1000)) / 1000))
					}
					if (data.settings.camera.auto) {	
						data.settings.camera.power = Math.max(1, Math.min(7, Math.round((data.settings.camera.power * 1000) + (data.settings.camera.auto * 1000)) / 1000))
						data.settings.camera.position = Math.round(Math.pow(10, data.settings.camera.power))
					}

				// update form
					updateForm(data)

				// clear
					clearCanvas()

				// draw
					drawPolyhedron(data)
			}

		/* updateForm */
			function updateForm(data) {
				// active element
					var activeElement = document.activeElement

				// xyz
					if (document.getElementById("x-rotation") != activeElement) {
						document.getElementById("x-rotation").value = data.settings.x.rotation
					}
					if (document.getElementById("x-position") != activeElement) {
						document.getElementById("x-position").value = data.settings.x.position
					}
					if (document.getElementById("y-rotation") != activeElement) {
						document.getElementById("y-rotation").value = data.settings.y.rotation
					}
					if (document.getElementById("y-position") != activeElement) {
						document.getElementById("y-position").value = data.settings.y.position
					}
					if (document.getElementById("z-rotation") != activeElement) {
						document.getElementById("z-rotation").value = data.settings.z.rotation
					}
					if (document.getElementById("z-position") != activeElement) {
						document.getElementById("z-position").value = data.settings.z.position
					}

				// camera
					if (document.getElementById("c-power") != activeElement) {
						document.getElementById("c-power").value = data.settings.camera.power
					}
					if (document.getElementById("opacity") != activeElement) {
						document.getElementById("opacity").value = data.settings.opacity.value
					}
			}

		/* drawPolyhedron */
			function drawPolyhedron(data) {
				// get the polyhedron
					var solid = data.polyhedrons[data.settings.polyhedron]

				// vertices
					if (data.settings.mode == "vertices") {
						// draw each point
							for (var v = 0; v < solid.vertices.length; v++) {
								projectVertices({color: "#dddddd", opacity: data.settings.opacity.value, coordinates: solid.vertices[v]})
							}
					}

				// edges
					else if (data.settings.mode == "edges") {
						// draw each edge
							for (var e = 0; e < solid.edges.length; e++) {
								projectEdge({color: "#dddddd", opacity: data.settings.opacity.value, coordinates: [solid.vertices[solid.edges[e][0]], solid.vertices[solid.edges[e][1]]]})
							}
					}

				// faces
					else if (data.settings.mode == "faces") {
						// copy faces
							var faces = []
							for (var f in solid.faces) {
								// create face
									var face = {
										color: solid.faces[f].color,
										coordinates: []
									}

								// copy coordinate values
									for (var c in solid.faces[f].coordinates) {
										face.coordinates[c] = [
											solid.vertices[solid.faces[f].coordinates[c]][0], 
											solid.vertices[solid.faces[f].coordinates[c]][1],
											solid.vertices[solid.faces[f].coordinates[c]][2]
										]
									}

								// find the maximum & average distance from camera for all points in a face
									face.maxD = 0
									face.sumD = 0
									for (var c in face.coordinates) {
										var d = getScalar(face.coordinates[c][0], face.coordinates[c][1], data.settings.camera.position - face.coordinates[c][2])
										
										face.sumD += d
										if (d > face.maxD) {
											face.maxD = d
										}
									}
									face.averageD = face.sumD / face.coordinates.length

								// add face to faces
									faces.push(face)
							}

						// sort the faces by maximum distance from camera
							faces = faces.sort(function(a, b) {
								return (a.maxD - b.maxD)
							})

						// sort the faces by average distance from camera
							faces = faces.sort(function(a, b) {
								return (a.averageD - b.averageD)
							})

						// draw each face, farthest first
							for (var f = faces.length - 1; f > -1; f--) {
								projectFace(faces[f])
							}
					}
			}

}