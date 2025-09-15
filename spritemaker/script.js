/*** globals ***/
	/* triggers */
		if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
			var on = { click: "touchstart", mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend", dragover: "dragover", drop: "drop" }
		}
		else {
			var on = { click:      "click", mousedown:  "mousedown", mousemove: "mousemove", mouseup:  "mouseup", dragover: "dragover", drop: "drop" }
		}

	/* defaults */
		document.addEventListener("dblclick", function(event) {
			event.preventDefault()
		})

		document.addEventListener("contextmenu", function(event) {
			event.preventDefault()
		})

	/* elements */
		var canvas   = document.getElementById("canvas")
		var context  = canvas.getContext("2d")

	/* data */
		var color    = "#ffffff"
		var shifting = false
		var sprites  = []
		resetSprite()

/*** shift ***/
	/* downShift */
		document.addEventListener("keydown", downShift)
		function downShift(event) {
			if (event.key == "Shift") {
				shifting = true
			}
		}

	/* upShift */
		document.addEventListener("keyup", upShift)
		function upShift(event) {
			if (event.key == "Shift") {
				shifting = false
			}
		}

/*** file menu ***/
	/* resetSprite */
		document.getElementById("reset").addEventListener(on.click, resetSprite)
		function resetSprite(event) {
			// clear data
				var columns = Math.max(1, Math.min(16, Number(document.getElementById("slider-x").value)))
				var rows    = Math.max(1, Math.min(16, Number(document.getElementById("slider-y").value)))
				
				sprites = [createSprite(columns, rows)]

			// draw
				drawSprite(sprites[sprites.length - 1])
		}

	/* uploadCode */
		document.getElementById("upload-outer").addEventListener(on.click, uploadCode)
		function uploadCode(event) {
			document.getElementById("upload").addEventListener("change", function(event) {
				var upload = document.getElementById("upload")

				if (upload.value && upload.value.length) {
					var reader = new FileReader()
						reader.readAsText(event.target.files[0])
						reader.onload = function(event) {
							try {
								sprites = [JSON.parse(String(event.target.result))]
								document.getElementById("slider-x").value = Math.max(1, Math.min(16, Number(sprites[0].columns)))
								document.getElementById("slider-y").value = Math.max(1, Math.min(16, Number(sprites[0].rows)))
								drawSprite(sprites[0])
							}
							catch (error) { console.log(error) }
						}
				}
			})
		}

	/* dragFile */
		document.body.addEventListener(on.dragover, dragFile)
		function dragFile(event) {
			try {
				event.preventDefault()
			} catch (error) {console.log(error)}
		}

	/* dropFile */
		document.body.addEventListener(on.drop, dropFile)
		function dropFile(event) {
			try {
				// prevent default
					event.preventDefault()
					if (!event.dataTransfer || !event.dataTransfer.items) {
						return
					}

				// file
					const file = [...event.dataTransfer.items][0].getAsFile()
					if (!file) {
						return
					}
					if (file.type !== "application/json") {
						return
					}

				// import
					var reader = new FileReader()
						reader.readAsText(file)
						reader.onload = function(event) {
							try {
								sprites = [JSON.parse(String(event.target.result))]
								document.getElementById("slider-x").value = Math.max(1, Math.min(16, Number(sprites[0].columns)))
								document.getElementById("slider-y").value = Math.max(1, Math.min(16, Number(sprites[0].rows)))
								drawSprite(sprites[0])
							}
							catch (error) { console.log(error) }
						}
			} catch (error) {console.log(error)}
		}

	/* saveCode */
		document.getElementById("save").addEventListener(on.click, saveCode)
		function saveCode() {
			// data
				const data = sprites[sprites.length - 1]
					data.project = "spriteMaker"

			// package up
				var saveLink = document.createElement("a")
					saveLink.id = "save-link"
					saveLink.setAttribute("href", "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data)))
					saveLink.setAttribute("download", "spriteMaker_" + (new Date().getTime()) + ".json")
					saveLink.addEventListener(on.click, function() {
						var saveLink = document.getElementById("save-link")
						document.body.removeChild(saveLink)
					})
			
			// click
				document.body.appendChild(saveLink)
				document.getElementById("save-link").click()
		}

	/* exportImage */
		document.getElementById("export").addEventListener(on.click, exportImage)
		function exportImage(event, asAsset) {
			// secondary canvas
				canvas  = document.createElement("canvas")
				canvas.setAttribute("width",  100 * sprites[sprites.length - 1].columns)
				canvas.setAttribute("height", 100 * sprites[sprites.length - 1].rows)
				document.body.appendChild(canvas)
				
				context = canvas.getContext("2d")
				drawSprite(sprites[sprites.length - 1], true)

			// image
				var imageData = canvas.toDataURL("image/png")

			// delete secondary canvas
				document.body.removeChild(canvas)
				canvas  = document.getElementById("canvas")
				context = canvas.getContext("2d")

			// assetManager
				if (asAsset) {
					return imageData
				}

			// package up
				var exportLink = document.createElement("a")
					exportLink.id = "export-link"
					exportLink.setAttribute("href", imageData)
					exportLink.setAttribute("download", "spriteMaker_" + (new Date().getTime()) + ".png")
					exportLink.addEventListener(on.click, function() {
						var exportLink = document.getElementById("export-link")
						document.body.removeChild(exportLink)
					})
			
			// click
				document.body.appendChild(exportLink)
				document.getElementById("export-link").click()
		}

/*** assetManager ***/
	/* retrieveAsset */
		window.ASSETS_J.retrieveAsset = function(name, type, data) {
			try {
				// json
					sprites = [JSON.parse(String(data))]
					document.getElementById("slider-x").value = Math.max(1, Math.min(16, Number(sprites[0].columns)))
					document.getElementById("slider-y").value = Math.max(1, Math.min(16, Number(sprites[0].rows)))
					drawSprite(sprites[0])
			} catch (error) {console.log(error)}
		}

	/* storeAsset */
		window.ASSETS_J.storeAsset = async function(type) {
			try {
				// json
					if (type == "json") {
						const data = sprites[sprites.length - 1]
							data.project = "spriteMaker"
						return {
							name: "spriteMaker_" + (new Date().getTime()) + ".json",
							type: "json",
							data: JSON.stringify(data)
						}
					}

				// png
					if (type == "png") {
						return {
							name: "spriteMaker_" + (new Date().getTime()) + ".png",
							type: "png",
							data: exportImage(null, true)
						}
					}
			} catch (error) {console.log(error)}
		}

/*** drawing menu ***/
	/* undoLast */
		document.getElementById("undo").addEventListener(on.click, undoLast)
		function undoLast(event) {
			// delete last version
				if (sprites.length > 1) {
					sprites.pop()
				}

			// no last version? --> reset 
				else {
					resetSprite()
				}

			// draw
				drawSprite(sprites[sprites.length - 1])
		}

	/* setErase */
		document.getElementById("erase").addEventListener(on.click, setErase)
		function setErase(event) {
			// unset color
				color = null

			// button glows
				document.getElementById("color").removeAttribute("selected")
				document.getElementById("erase").setAttribute("selected", true)

			// cursor
				canvas.setAttribute("erasing", true)
		}

	/* unsetErase */
		document.getElementById("color").addEventListener(on.click, unsetErase)
		function unsetErase(event) {
			if (!color) {
				// set color
					color = document.getElementById("color").value

				// button glows
					document.getElementById("color").setAttribute("selected", true)
					document.getElementById("erase").removeAttribute("selected")

				// cursor
					canvas.removeAttribute("erasing")
			}
		}

	/* selectColor */
		document.getElementById("color").addEventListener("change", selectColor)
		function selectColor(event) {
			// set color
				color = event.target.value
		}

	/* setX */
		document.getElementById("slider-x").addEventListener("change", setX)
		function setX(event) {
			// set x
				sprites[sprites.length - 1].columns = Math.max(1, Math.min(16, Number(event.target.value)))

			// remove excess
				while (sprites[sprites.length - 1].squares.length > sprites[sprites.length - 1].columns) {
					sprites[sprites.length - 1].squares.pop()
				}

			// add needed
				var size = canvas.width / 16
				while (sprites[sprites.length - 1].squares.length < sprites[sprites.length - 1].columns) {
					var column = []

					while (column.length < sprites[sprites.length - 1].rows) {
						column.push(createSquare(size, sprites[sprites.length - 1].squares.length, column.length))
					}

					sprites[sprites.length - 1].squares.push(column)
				}

			// draw
				drawSprite(sprites[sprites.length - 1])
		}

	/* setY */
		document.getElementById("slider-y").addEventListener("change", setY)
		function setY(event) {
			// set y
				sprites[sprites.length - 1].rows = Math.max(1, Math.min(16, Number(event.target.value)))

			// remove excess
				for (var i in sprites[sprites.length - 1].squares) {
					while (sprites[sprites.length - 1].squares[i].length > sprites[sprites.length - 1].rows) {
						sprites[sprites.length - 1].squares[i].pop()
					}
				}

			// add needed
				var size = canvas.width / 16
				for (var i in sprites[sprites.length - 1].squares) {
					while (sprites[sprites.length - 1].squares[i].length < sprites[sprites.length - 1].rows) {
						sprites[sprites.length - 1].squares[i].push(createSquare(size, Number(i), sprites[sprites.length - 1].squares[i].length))
					}
				}

			// draw
				drawSprite(sprites[sprites.length - 1])
		}

/*** creates ***/
	/* createSprite */
		function createSprite(columns, rows) {
			// new sprite
				var size = canvas.width / 16
				var obj = {
					columns: columns,
					rows:    rows,
					squares: []
				}

			// columns of squares of triangles
				for (var x = 0; x < columns; x++) {
					var column = []
					
					for (var y = 0; y < rows; y++) {
						column.push(createSquare(size, x, y))
					}

					obj.squares.push(column)
				}

			// return
				return obj
		}

	/* createSquare */
		function createSquare(size, column, row) {
			// points
				var points = getPoints(size, column, row)

			// square of triangles of colors
				return {
					top:    {
						color: "transparent",
						points: [
							points.center,
							points.topLeft,
							points.topRight
						]
					},
					right:  {
						color: "transparent",
						points: [
							points.center,
							points.topRight,
							points.bottomRight
						]
					},
					bottom: {
						color: "transparent",
						points: [
							points.center,
							points.bottomRight,
							points.bottomLeft
						]
					},
					left:   {
						color: "transparent",
						points: [
							points.center,
							points.topLeft,
							points.bottomLeft
						]
					}
				}
		}

/*** sprites ***/
	/* clickCanvas */
		canvas.addEventListener(on.click, clickCanvas)
		function clickCanvas(event) {
			// get screen coordinates
				var x = event.touches ? event.touches[0].clientX : event.clientX
				var y = event.touches ? event.touches[0].clientY : event.clientY

			// get canvas coordinates
				var rect = canvas.getBoundingClientRect()
				x =                 (((x - rect.left) / rect.width) * canvas.width)
				y = canvas.height - (((y - rect.top) / rect.height) * canvas.height)

			// setTriangles
				sprites.push(JSON.parse(JSON.stringify(sprites[sprites.length - 1])))
				setTriangles(x, y, color)
		}

	/* setTriangles */
		function setTriangles(x, y, color) {
			// get coordinates
				var size   = canvas.width / 16
				var column = Math.floor(x / size)
				var row    = Math.floor(y / size)
				var square = null

			// get square
				if (!sprites[sprites.length - 1].squares[column] || !sprites[sprites.length - 1].squares[column][row]) {
					return false
				}
				else {
					var square = sprites[sprites.length - 1].squares[column][row]
				}

			// whole square ?
				if (shifting) {
					square.top.color    = color || "transparent"
					square.right.color  = color || "transparent"
					square.bottom.color = color || "transparent"
					square.left.color   = color || "transparent"
				}

			// closest triangle ?
				else {
					// points
						var points = getPoints(size, column, row)

					// distances
						var distances = {}
						var directions = ["top","right","bottom","left"]
						for (var i in directions) {
							distances[directions[i]] = getDistance(x, y, points[directions[i]][0], points[directions[i]][1])
						}

					// closest
						var distance = 10000
						var closest = null
						for (var i in distances) {
							if (distances[i] < distance) {
								closest = i
								distance = distances[i]
							}
						}

					// color triangle
						square[closest].color = color || "transparent"
				}

			// draw
				drawSprite(sprites[sprites.length - 1])
		}

	/* getDistance */
		function getDistance(x1, y1, x2, y2) {
			return Math.pow(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2), 0.5)
		}

	/* getPoints */
		function getPoints(size, column, row) {
			return {
				center:      [(column + 0.5) * size, (row + 0.5) * size],
				topLeft:     [(column + 0)   * size, (row + 1)   * size],
				top:         [(column + 0.5) * size, (row + 1)   * size],
				topRight:    [(column + 1)   * size, (row + 1)   * size],
				right:       [(column + 1)   * size, (row + 0.5) * size],
				bottomRight: [(column + 1)   * size, (row + 0)   * size],
				bottom:      [(column + 0.5) * size, (row + 0)   * size],
				bottomLeft:  [(column + 0)   * size, (row + 0)   * size],
				left:        [(column + 0)   * size, (row + 0.5) * size]
			}
		}

	/* drawSprite */
		function drawSprite(sprite, exporting) {
			// clear
				clearCanvas()

			// gray out unused areas
				if (!exporting) {
					var size   = canvas.width / 16
					var height = size * sprite.rows
					var width  = size * sprite.columns
					drawRectangle(    0, height,                width, canvas.height - height, {color: "#111111"})
					drawRectangle(width,      0, canvas.width - width,                 height, {color: "#111111"})
					drawRectangle(width, height, canvas.width - width, canvas.height - height, {color: "#111111"})
				}

			// loop through squares, then triangles
				for (var column in sprite.squares) {
					for (var row in sprite.squares[column]) {
						// draw square
							if ((sprite.squares[column][row].top.color == sprite.squares[column][row].right.color)
							 && (sprite.squares[column][row].top.color == sprite.squares[column][row].bottom.color)
							 && (sprite.squares[column][row].top.color == sprite.squares[column][row].left.color)) {
								drawRectangle(size * column, size * row, size, size, {color: sprite.squares[column][row].top.color})
							}

						// draw triangle
							for (var triangle in sprite.squares[column][row]) {
								var shape = sprite.squares[column][row][triangle]

								if (shape.color && shape.color !== "transparent") {
									drawTriangle(shape.points[0][0], shape.points[0][1], shape.points[1][0], shape.points[1][1], shape.points[2][0], shape.points[2][1], {color: shape.color})
								}
							}
					}
				}

			// dots
				if (!exporting) {
					for (var column = 0; column <= sprite.columns; column++) {
						for (var row = 0; row <= sprite.rows; row++) {
							drawCircle(size * column, size * row, 2, {color: "#111111"})
						}
					}
				}
		}

/*** canvas ***/
	/* clearCanvas */
		function clearCanvas() {
			context.clearRect(0, 0, canvas.width, canvas.height)
		}

	/* drawCircle */
		function drawCircle(x, y, radius, options) {
			// parameters
				options = options || {}
				context.beginPath()
				context.fillStyle   = options.color || "transparent"
				context.strokeStyle = options.color || "transparent"
				context.lineWidth   = options.border || 1
				context.shadowBlur  = options.blur ? options.blur : 0
				context.shadowColor = options.shadow ? options.shadow : "transparent"
				context.globalAlpha = options.opacity || 1

			// draw
				context.moveTo(x, canvas.height - y)
				context.arc(x, canvas.height - y, radius, (options.start || 0), (options.end || (2 * Math.PI)), true)
				context.closePath()
				context.fill()
				context.stroke()
		}

	/* drawRectangle */
		function drawRectangle(x, y, width, height, options) {
			// parameters
				options = options || {}
				context.beginPath()
				context.fillStyle   = options.color || "transparent"
				context.strokeStyle = options.color || "transparent"
				context.lineWidth   = options.border || 1
				context.shadowBlur  = options.blur ? options.blur : 0
				context.shadowColor = options.shadow ? options.shadow : "transparent"
				context.globalAlpha = options.opacity || 1

			// draw
				if (options.radii) {
					context.moveTo(x + options.radii.topLeft, canvas.height - y - height)
					context.lineTo(x + width - options.radii.topRight, canvas.height - y - height)
					context.quadraticCurveTo(x + width, canvas.height - y - height, x + width, canvas.height - y - height + options.radii.topRight)
					context.lineTo(x + width, canvas.height - y - options.radii.bottomRight)
					context.quadraticCurveTo(x + width, canvas.height - y, x + width - options.radii.bottomRight, canvas.height - y)
					context.lineTo(x + options.radii.bottomLeft, canvas.height - y)
					context.quadraticCurveTo(x, canvas.height - y, x, canvas.height - y - options.radii.bottomLeft)
					context.lineTo(x, canvas.height - y - height + options.radii.topLeft)
					context.quadraticCurveTo(x, canvas.height - y - height, x + options.radii.topLeft, canvas.height - y - height)
					context.closePath()
					context.fill()
					context.stroke()
				}
				else {
					context.fillRect(x, canvas.height - y, width, -1 * height)
				}
		}

	/* drawTriangle */
		function drawTriangle(x1, y1, x2, y2, x3, y3, options) {
			// parameters
				options = options || {}
				context.beginPath()
				context.fillStyle   = options.color || "transparent"
				context.strokeStyle = options.color || "transparent"
				context.lineWidth   = options.border || 1
				context.shadowBlur  = options.blur ? options.blur : 0
				context.shadowColor = options.shadow ? options.shadow : "transparent"
				context.globalAlpha = options.opacity || 1

			// draw
				context.moveTo(x1, canvas.height - y1)
				context.lineTo(x2, canvas.height - y2)
				context.lineTo(x3, canvas.height - y3)
				context.lineTo(x1, canvas.height - y1)
				context.closePath()
				context.fill()
				context.stroke()
		}
