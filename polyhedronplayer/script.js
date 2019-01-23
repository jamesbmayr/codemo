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
						case "p-tetrahedron":
							event.target.setAttribute("selected", true)
							data.settings.polyhedron = "tetrahedron"

							document.getElementById("p-cube").removeAttribute("selected")
							document.getElementById("p-octahedron").removeAttribute("selected")
							document.getElementById("p-dodecahedron").removeAttribute("selected")
							document.getElementById("p-icosahedron").removeAttribute("selected")
						break
						case "p-cube":
							event.target.setAttribute("selected", true)
							data.settings.polyhedron = "cube"

							document.getElementById("p-tetrahedron").removeAttribute("selected")
							document.getElementById("p-octahedron").removeAttribute("selected")
							document.getElementById("p-dodecahedron").removeAttribute("selected")
							document.getElementById("p-icosahedron").removeAttribute("selected")
						break
						case "p-octahedron":
							event.target.setAttribute("selected", true)
							data.settings.polyhedron = "octahedron"

							document.getElementById("p-tetrahedron").removeAttribute("selected")
							document.getElementById("p-cube").removeAttribute("selected")
							document.getElementById("p-dodecahedron").removeAttribute("selected")
							document.getElementById("p-icosahedron").removeAttribute("selected")
						break
						case "p-dodecahedron":
							event.target.setAttribute("selected", true)
							data.settings.polyhedron = "dodecahedron"

							document.getElementById("p-tetrahedron").removeAttribute("selected")
							document.getElementById("p-cube").removeAttribute("selected")
							document.getElementById("p-octahedron").removeAttribute("selected")
							document.getElementById("p-icosahedron").removeAttribute("selected")
						break
						case "p-icosahedron":
							event.target.setAttribute("selected", true)
							data.settings.polyhedron = "icosahedron"

							document.getElementById("p-tetrahedron").removeAttribute("selected")
							document.getElementById("p-cube").removeAttribute("selected")
							document.getElementById("p-octahedron").removeAttribute("selected")
							document.getElementById("p-dodecahedron").removeAttribute("selected")
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

		/* projectPolyhedron */
			function projectPolyhedron(options) {
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
						tetrahedron: [
							{
								color: "red",
								coordinates: [[100, 100, 100], [100, -100, -100], [-100, -100, 100]]
							},
							{
								color: "yellow",
								coordinates: [[100, 100, 100], [100, -100, -100], [-100, 100, -100]]
							},
							{
								color: "green",
								coordinates: [[100, 100, 100], [-100, -100, 100], [-100, 100, -100]]
							},
							{
								color: "blue",
								coordinates: [[100, -100, -100], [-100, -100, 100], [-100, 100, -100]]
							}
						],
						cube: [
							{
								color: "red",
								coordinates: [[100, 100, 100],[-100, 100, 100],[-100, -100, 100],[100, -100, 100]]
							},
							{
								color: "orange",
								coordinates: [[100, 100, -100],[-100, 100, -100],[-100, -100, -100],[100, -100, -100]]
							},
							{
								color: "white",
								coordinates: [[100, 100, 100],[100, 100, -100],[-100, 100, -100],[-100, 100, 100]]
							},
							{
								color: "yellow",
								coordinates: [[100, -100, 100],[100, -100, -100],[-100, -100, -100],[-100, -100, 100]]
							},
							{
								color: "blue",
								coordinates: [[100, 100, 100],[100, 100, -100],[100, -100, -100],[100, -100, 100]]
							},
							{
								color: "green",
								coordinates: [[-100, 100, 100],[-100, 100, -100],[-100, -100, -100],[-100, -100, 100]]
							}
						],
						octahedron: [
							{
								color: "red",
								coordinates: [[200, 0, 0],[0, 200, 0],[0, 0, 200]]
							},
							{
								color: "yellow",
								coordinates: [[-200, 0, 0],[0, 200, 0],[0, 0, 200]]
							},
							{
								color: "blue",
								coordinates: [[-200, 0, 0],[0, -200, 0],[0, 0, 200]]
							},
							{
								color: "white",
								coordinates: [[200, 0, 0],[0, -200, 0],[0, 0, 200]]
							},
							{
								color: "purple",
								coordinates: [[200, 0, 0],[0, 200, 0],[0, 0, -200]]
							},
							{
								color: "green",
								coordinates: [[-200, 0, 0],[0, 200, 0],[0, 0, -200]]
							},
							{
								color: "orange",
								coordinates: [[-200, 0, 0],[0, -200, 0],[0, 0, -200]]
							},
							{
								color: "cyan",
								coordinates: [[200, 0, 0],[0, -200, 0],[0, 0, -200]]
							}
						],
						dodecahedron: [
							{
								color: "red",
								coordinates: [[100, 100, 100], [61.803398875, 161.803398875, 0], [100, 100, -100], [161.803398875, 0, -61.803398875], [161.803398875, 0, 61.803398875]]
							},
							{
								color: "yellow",
								coordinates: [[100, 100, -100], [161.803398875, 0, -61.803398875], [100, -100, -100], [0, -61.803398875, -161.803398875], [0, 61.803398875, -161.803398875]]
							},
							{
								color: "blue",
								coordinates: [[61.803398875, 161.803398875, 0], [-61.803398875, 161.803398875, 0], [-100, 100, -100], [0, 61.803398875, -161.803398875], [100, 100, -100]]
							},
							{
								color: "white",
								coordinates: [[0, 61.803398875, -161.803398875], [-100, 100, -100], [-161.803398875, 0, -61.803398875], [-100, -100, -100], [0, -61.803398875, -161.803398875]]
							},
							{
								color: "purple",
								coordinates: [[0, -61.803398875, -161.803398875], [100, -100, -100], [61.803398875, -161.803398875, 0], [-61.803398875, -161.803398875, 0], [-100, -100, -100]]
							},
							{
								color: "green",
								coordinates: [[161.803398875, 0, 61.803398875], [161.803398875, 0, -61.803398875], [100, -100, -100], [61.803398875, -161.803398875, 0], [100, -100, 100]]
							},
							{
								color: "orange",
								coordinates: [[-61.803398875, 161.803398875, 0], [-100, 100, -100], [-161.803398875, 0, -61.803398875], [-161.803398875, 0, 61.803398875], [-100, 100, 100]]
							},
							{
								color: "cyan",
								coordinates: [[100, 100, 100], [161.803398875, 0, 61.803398875], [100, -100, 100], [0, -61.803398875, 161.803398875], [0, 61.803398875, 161.803398875]]
							},
							{
								color: "magenta",
								coordinates: [[0, -61.803398875, 161.803398875], [-100, -100, 100], [-61.803398875, -161.803398875, 0], [61.803398875, -161.803398875, 0], [100, -100, 100]]
							},
							{
								color: "black",
								coordinates: [[-61.803398875, 161.803398875, 0], [61.803398875, 161.803398875, 0], [100, 100, 100], [0, 61.803398875, 161.803398875], [-100, 100, 100]]
							},
							{
								color: "brown",
								coordinates: [[-161.803398875, 0, 61.803398875], [-161.803398875, 0, -61.803398875], [-100, -100, -100], [-61.803398875, -161.803398875, 0], [-100, -100, 100]]
							},
							{
								color: "gray",
								coordinates: [[-100, 100, 100], [0, 61.803398875, 161.803398875], [0, -61.803398875, 161.803398875], [-100, -100, 100], [-161.803398875, 0, 61.803398875]]
							}
						],
						icosahedron: [
							{
								color: "red",
								coordinates: [[0, 161.803398875, 100], [100, 0, 161.803398875], [161.803398875, 100, 0]]
							},
							{
								color: "yellow",
								coordinates: [[0, 161.803398875, 100], [0, 161.803398875, -100], [161.803398875, 100, 0]]
							},
							{
								color: "blue",
								coordinates: [[0, 161.803398875, 100], [0, 161.803398875, -100], [-161.803398875, 100, 0]]
							},
							{
								color: "white",
								coordinates: [[0, 161.803398875, 100], [-100, 0, 161.803398875], [-161.803398875, 100, 0]]
							},
							{
								color: "purple",
								coordinates: [[0, 161.803398875, 100], [-100, 0, 161.803398875], [100, 0, 161.803398875]]
							},
							{
								color: "green",
								coordinates: [[0, -161.803398875, -100], [100, 0, -161.803398875], [-100, 0, -161.803398875]]
							},
							{
								color: "orange",
								coordinates: [[0, -161.803398875, -100], [-161.803398875, -100, 0], [-100, 0, -161.803398875]]
							},
							{
								color: "cyan",
								coordinates: [[0, -161.803398875, -100], [-161.803398875, -100, 0], [0, -161.803398875, 100]]
							},
							{
								color: "magenta",
								coordinates: [[0, -161.803398875, -100], [161.803398875, -100, 0], [0, -161.803398875, 100]]
							},
							{
								color: "black",
								coordinates: [[0, -161.803398875, -100], [161.803398875, -100, 0], [100, 0, -161.803398875]]
							},
							{
								color: "brown",
								coordinates: [[0, 161.803398875, -100], [161.803398875, 100, 0], [100, 0, -161.803398875]]
							},
							{
								color: "gray",
								coordinates: [[161.803398875, 100, 0], [100, 0, -161.803398875], [161.803398875, -100, 0]]
							},
							{
								color: "chartreuse",
								coordinates: [[161.803398875, -100, 0], [161.803398875, 100, 0], [100, 0, 161.803398875]]
							},
							{
								color: "gold",
								coordinates: [[100, 0, 161.803398875], [161.803398875, -100, 0], [0, -161.803398875, 100]]
							},
							{
								color: "navy",
								coordinates: [[0, -161.803398875, 100], [100, 0, 161.803398875], [-100, 0, 161.803398875]]
							},
							{
								color: "maroon",
								coordinates: [[-100, 0, 161.803398875], [0, -161.803398875, 100], [-161.803398875, -100, 0]]
							},
							{
								color: "salmon",
								coordinates: [[-161.803398875, -100, 0], [-100, 0, 161.803398875], [-161.803398875, 100, 0]]
							},
							{
								color: "fuchsia",
								coordinates: [[-161.803398875, 100, 0], [-161.803398875, -100, 0], [-100, 0, -161.803398875]]
							},
							{
								color: "indigo",
								coordinates: [[-100, 0, -161.803398875], [-161.803398875, 100, 0], [0, 161.803398875, -100]]
							},
							{
								color: "teal",
								coordinates: [[0, 161.803398875, -100], [-100, 0, -161.803398875], [100, 0, -161.803398875]]
							}
						]
					},
					loop: setInterval(function() { updateData(data) }, 100)
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
						for (var f in data.polyhedrons[p]) {
							for (var c in data.polyhedrons[p][f].coordinates) {
								var coords = data.polyhedrons[p][f].coordinates[c]
									coords[0] += x
									coords[1] += y
									coords[2] += z
							}
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
							for (var f in data.polyhedrons[p]) {
								for (var c in data.polyhedrons[p][f].coordinates) {
									var y = data.polyhedrons[p][f].coordinates[c][1]
									var z = data.polyhedrons[p][f].coordinates[c][2]
									data.polyhedrons[p][f].coordinates[c][2] = (z * cos) - (y * sin)
									data.polyhedrons[p][f].coordinates[c][1] = (y * cos) + (z * sin)
								}
							}
						}
					}
					else if (axis == "y") {
						data.settings.y.rotation = getMinDegrees(data.settings.y.rotation + degrees)

						for (var p in data.polyhedrons) {
							for (var f in data.polyhedrons[p]) {
								for (var c in data.polyhedrons[p][f].coordinates) {
									var x = data.polyhedrons[p][f].coordinates[c][0]
									var z = data.polyhedrons[p][f].coordinates[c][2]
									data.polyhedrons[p][f].coordinates[c][0] = (x * cos) - (z * sin)
									data.polyhedrons[p][f].coordinates[c][2] = (z * cos) + (x * sin)
								}
							}
						}
					}
					else if (axis == "z") {
						data.settings.z.rotation = getMinDegrees(data.settings.z.rotation + degrees)

						for (var p in data.polyhedrons) {
							for (var f in data.polyhedrons[p]) {
								for (var c in data.polyhedrons[p][f].coordinates) {
									var x = data.polyhedrons[p][f].coordinates[c][0]
									var y = data.polyhedrons[p][f].coordinates[c][1]
									data.polyhedrons[p][f].coordinates[c][0] = (x * cos) - (y * sin)
									data.polyhedrons[p][f].coordinates[c][1] = (y * cos) + (x * sin)
								}
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

				// find the maximum Z for each face
					var faces = []
					for (var f in solid) {
						faces.push(solid[f])

						faces[f].maxD = 0
						faces[f].sumD = 0
						for (var c in faces[f].coordinates) {
							var d = getScalar(faces[f].coordinates[c][0], faces[f].coordinates[c][1], data.settings.camera.position - faces[f].coordinates[c][2])
							faces[f].sumD += d
							if (d > faces[f].maxD) {
								faces[f].maxD = d
							}
						}
						faces[f].averageD = faces[f].sumD / faces[f].coordinates.length
					}

				// sort the faces
					faces = faces.sort(function(a, b) {
						return (a.maxD - b.maxD)
					})

					faces = faces.sort(function(a, b) {
						return (a.averageD - b.averageD)
					})

				// draw each face, farthest first
					for (var f = faces.length - 1; f > -1; f--) {
						projectPolyhedron(faces[f])
					}
			}

}