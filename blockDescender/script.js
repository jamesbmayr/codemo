window.onload = function() {

	/* onload */
		startGame()

	/* startGame */
		document.getElementById("new").addEventListener("click", startGame)
		function startGame() {
			document.getElementById("new").className = "hidden"
			document.getElementById("overlay").className = "hidden"
			document.getElementById("count-inner").textContent = ""
			document.getElementById("score-inner").textContent = ""

			blocks = [
				{type: "shape-i", coordinates: [[1,0],[1,1],[1,2],[1,3]]},
				{type: "shape-o", coordinates: [[1,1],[1,2],[2,1],[2,2]]},
				{type: "shape-t", coordinates: [[1,0],[1,1],[1,2],[2,1]]},
				{type: "shape-s", coordinates: [[2,0],[2,1],[1,1],[1,2]]},
				{type: "shape-z", coordinates: [[1,0],[1,1],[2,1],[2,2]]},
				{type: "shape-l", coordinates: [[1,0],[1,1],[1,2],[2,2]]},
				{type: "shape-j", coordinates: [[2,0],[2,1],[2,2],[1,2]]},
			]

			createGrid()
			createNext()
			spawnBlock()

			window.gameLoop = setInterval(function() {
				if (window.loopCount) {
					window.loopCount--
				}
				else {
					window.loopCount = 4

					if (!window.blockCenter) {
						spawnBlock()
					}
					else {
						lowerBlock()
					}
				}
			}, 100)
		}

	/* endGame */
		function endGame() {
			clearInterval(window.gameLoop)

			var active = Array.prototype.slice.call(document.getElementsByClassName("block-active"))
			for (var a in active) {
				var coordinates = getCoordinates(active[a])
				deactivateBlock(coordinates.x, coordinates.y)
			}

			document.getElementById("new").className = ""
			document.getElementById("overlay").className = ""
			document.getElementById("next").className = "hidden"
			document.getElementById("grid").className = "game-over"
		}

	/* createGrid */
		function createGrid() {
			var grid = document.getElementById("grid")
				grid.className = ""
				grid.innerHTML = ""

			for (var y = 0; y < 24; y++) {
				var row = document.createElement("div")
					row.id = "_grid-row_" + y
					row.className = "grid-row"
					if (y < 4) { row.className += " grid-spawn" }

				for (var x = 0; x < 10; x++) {
					var cell = document.createElement("div")
						cell.id = "_grid-row_" + y + "_grid-cell_" + x
						cell.className = "grid-cell"
						if (y < 4) { cell.className += " grid-spawn" }
						cell.className += " block-empty"

					row.appendChild(cell)
				}

				grid.appendChild(row)
			}
		}

	/* createNext */
		function createNext() {
			var next = document.getElementById("next")
				next.className = ""
				next.innerHTML = ""

			for (var y = 0; y < 4; y++) {
				var row = document.createElement("div")
					row.className = "next-row"
					row.id = "_next-row_" + y

				for (var x = 0; x < 4; x++) {
					var cell = document.createElement("div")
						cell.className = "next-cell block-empty"
						cell.id = "_next-row_" + y + "_next-cell_" + x

					row.appendChild(cell)
				}

				next.appendChild(row)
			}
		}

	/* spawnBlock */
		function spawnBlock() {
			if (window.nextBlock == undefined || window.nextBlock == null) {
				spawnNext()
			}
			else if (Array.prototype.slice.call(document.querySelectorAll(".grid-spawn.block-inactive")).length > 0) {
				endGame()
			}
			else {
				var active = Array.prototype.slice.call(document.getElementsByClassName("block-active"))
				for (var a in active) {
					var coordinates = getCoordinates(active[a])
					deactivateBlock(coordinates.x, coordinates.y)
				}

				var count = document.getElementById("count-inner")
					count.textContent = Number(count.textContent || 0) + 1

				var type = blocks[window.nextBlock].type
				var coordinates = blocks[window.nextBlock].coordinates

				for (var c = 0; c < coordinates.length; c++) {
					var x = coordinates[c][0]
					var y = coordinates[c][1]

					var gridCell = document.getElementById("_grid-row_" + y + "_grid-cell_" + (x + 3))
						gridCell.className = gridCell.className.replace("block-empty", "block-active " + type)

					window.blockCenter = [4.5,1.5]
				}

				spawnNext()
			}
		}

	/* spawnNext */
		function spawnNext() {
			var cells = Array.prototype.slice.call(document.getElementsByClassName("next-cell"))
			for (var c in cells) {
				cells[c].className = "next-cell block-empty"
			}

			window.nextBlock = Math.floor(Math.random() * blocks.length)
				var type = blocks[window.nextBlock].type
				var coordinates = blocks[window.nextBlock].coordinates

			for (var c = 0; c < coordinates.length; c++) {
				var x = coordinates[c][0]
				var y = coordinates[c][1]

				var nextCell = document.getElementById("_next-row_" + y + "_next-cell_" + x)
					nextCell.className = nextCell.className.replace("block-empty", type)
			}
		}

	/* getCoordinates */
		function getCoordinates(element) {
			var coordinates = element.id.replace("_grid-row_", "").replace("_grid-cell_", ",").split(",").reverse()
				var x = Number(coordinates[0])
				var y = Number(coordinates[1])

			var shape = element.className.replace("block-empty", "").replace("block-active", "").replace("block-inactive", "").replace("grid-cell", "").replace("grid-spawn", "").trim()

			return {x:x, y:y, s: shape}
		}

	/* activateBlock */
		function activateBlock(x, y, type) {
			var block = document.getElementById("_grid-row_" + y + "_grid-cell_" + x)
				block.className = block.className.replace("block-empty", "block-active ") + type
		}

	/* deactivateBlock */
		function deactivateBlock(x, y) {
			var block = document.getElementById("_grid-row_" + y + "_grid-cell_" + x)
				block.className = block.className.replace("block-active", "block-inactive")
		}

	/* fillBlock */
		function fillBlock(x, y, type) {
			var block = document.getElementById("_grid-row_" + y + "_grid-cell_" + x)
				block.className = block.className.replace("block-empty", "block-inactive ") + type
		}

	/* emptyBlock */
		function emptyBlock(x, y) {
			var block = document.getElementById("_grid-row_" + y + "_grid-cell_" + x)
				block.className = block.className.replace(/shape\-(\w)/gi, "").replace("block-active ", "block-empty").replace("block-inactive ", "block-empty")
		}

	/* isLegal */
		function isLegal(x, y) {
			if (x < 0) {
				return false
			}
			else if (x > 9) {
				return false
			}
			else if (y < 0) {
				return false
			}
			else if (y > 23) {
				return false
			}
			else {
				var className = document.getElementById("_grid-row_" + y + "_grid-cell_" + x).className
				
				if (className.indexOf("shape-") !== -1 && className.indexOf("block-active") == -1) {
					return false
				}
				else {
					return true
				}
			}
		}

	/* rotateBlock */
		document.getElementById("rotate").addEventListener("click", rotateBlock)
		function rotateBlock() {
			var control = document.getElementById("rotate")
				control.className = "activated"
			setTimeout(function() {
				control.className = ""
			}, 250)

			if (window.blockCenter) {
				var active = Array.prototype.slice.call(document.getElementsByClassName("block-active"))
				var type = active[0].className.replace("block-active", "").replace("grid-cell", "").replace("grid-spawn", "").trim()
				var before = []
				var after = []
				var legal = true

				for (var a in active) {
					//coordinates
						var coordinates = getCoordinates(active[a])
							before.push([coordinates.x, coordinates.y])

					//center at origin
						var abstractX = (coordinates.x - window.blockCenter[0])
						var abstractY = (coordinates.y - window.blockCenter[1]) * -1

					//quadrants
						if      (abstractX > 0 && abstractY > 0) { //quadrant 1 --> quadrant 4
							var newX = abstractY
							var newY = abstractX * -1
						}
						else if (abstractX < 0 && abstractY > 0) { //quadrant 2 --> quadrant 1
							var newX = abstractY
							var newY = abstractX * -1
						}
						else if (abstractX < 0 && abstractY < 0) { //quadrant 3 --> quadrant 2
							var newX = abstractY
							var newY = abstractX * -1
						}
						else if (abstractX > 0 && abstractY < 0) { //quadrant 4 --> quadrant 3
							var newX = abstractY
							var newY = abstractX * -1
						}

					//center at blockCenter
						newX = Math.floor(Number(window.blockCenter[0]) + newX)
						newY = Math.floor(Number(window.blockCenter[1]) - newY)
						after.push([newX, newY])

					if (!isLegal(newX, newY)) {
						legal = false
						break
					}
				}

				if (legal) {
					for (var b in before) {
						emptyBlock(before[b][0], before[b][1])
					}

					for (var a in after) {
						activateBlock(after[a][0], after[a][1], type)
					}
				}
			}
		}

	/* leftBlock */
		document.getElementById("left").addEventListener("click", leftBlock)
		function leftBlock() {
			var control = document.getElementById("left")
				control.className = "activated"
			setTimeout(function() {
				control.className = ""
			}, 250)

			if (window.blockCenter) {
				var active = Array.prototype.slice.call(document.getElementsByClassName("block-active"))
				var type = active[0].className.replace("block-active", "").replace("grid-cell", "").replace("grid-spawn", "").trim()
				var before = []
				var after = []
				var legal = true

				for (var a in active) {
					var coordinates = getCoordinates(active[a])
						before.push([coordinates.x, coordinates.y])
						after.push([coordinates.x - 1, coordinates.y])

					if (!isLegal(coordinates.x - 1, coordinates.y)) {
						legal = false
						break
					}
				}

				if (legal) {
					for (var b in before) {
						emptyBlock(before[b][0], before[b][1])
					}

					for (var a in after) {
						activateBlock(after[a][0], after[a][1], type)
					}

					window.blockCenter[0] -= 1
				}
			}
		}

	/* rightBlock */
		document.getElementById("right").addEventListener("click", rightBlock)
		function rightBlock() {
			var control = document.getElementById("right")
				control.className = "activated"
			setTimeout(function() {
				control.className = ""
			}, 250)

			if (window.blockCenter) {
				var active = Array.prototype.slice.call(document.getElementsByClassName("block-active"))
				var type = active[0].className.replace("block-active", "").replace("grid-cell", "").replace("grid-spawn", "").trim()
				var before = []
				var after = []
				var legal = true

				for (var a in active) {
					var coordinates = getCoordinates(active[a])
						before.push([coordinates.x, coordinates.y])
						after.push([coordinates.x + 1, coordinates.y])

					if (!isLegal(coordinates.x + 1, coordinates.y)) {
						legal = false
						break
					}
				}

				if (legal) {
					for (var b in before) {
						emptyBlock(before[b][0], before[b][1])
					}
					
					for (var a in after) {
						activateBlock(after[a][0], after[a][1], type)
					}

					window.blockCenter[0] += 1
				}
			}
		}

	/* lowerBlock */
		function lowerBlock() {
			if (window.blockCenter) {
				var active = Array.prototype.slice.call(document.getElementsByClassName("block-active"))
				var type = active[0].className.replace("block-active", "").replace("grid-cell", "").replace("grid-spawn", "").trim()
				var before = []
				var after = []
				var legal = true

				for (var a in active) {
					var coordinates = getCoordinates(active[a])
						before.push([coordinates.x, coordinates.y])
						after.push([coordinates.x, coordinates.y + 1])

					if (!isLegal(coordinates.x, coordinates.y + 1)) {
						legal = false
						break
					}
				}

				if (legal) {
					for (var b in before) {
						emptyBlock(before[b][0], before[b][1])
					}

					for (var a in after) {
						activateBlock(after[a][0], after[a][1], type)
					}

					window.blockCenter[1] += 1
				}
				else {
					for (var b in before) {
						deactivateBlock(before[b][0], before[b][1], "")
					}

					window.blockCenter = false
					findLines()
				}
			}
		}

	/* dropBlock */
		document.getElementById("drop").addEventListener("click", dropBlock)
		function dropBlock() {
			var control = document.getElementById("drop")
				control.className = "activated"
			setTimeout(function() {
				control.className = ""
			}, 250)

			if (window.blockCenter) {
				var active = Array.prototype.slice.call(document.getElementsByClassName("block-active"))
				var type = active[0].className.replace("block-active", "").replace("grid-cell", "").replace("grid-spawn", "").trim()
				var before = []
				var after = []
				var legal = true

				for (var a in active) {
					var coordinates = getCoordinates(active[a])
						before.push([coordinates.x, coordinates.y])
						after.push([coordinates.x, coordinates.y])
				}

				while (legal) {
					var current = JSON.parse(JSON.stringify(after))
					var after = []

					for (var c in current) {
						if (!isLegal(current[c][0], current[c][1] + 1)) {
							legal = false
							break
						}
						else {
							after.push([current[c][0], current[c][1] + 1])
						}
					}
				}

				for (var b in before) {
					emptyBlock(before[b][0], before[b][1])
				}

				for (var c in current) {
					fillBlock(current[c][0], current[c][1], type)
				}

				window.blockCenter = false
				findLines()
			}
		}

	/* findLines */
		function findLines() {
			var lines = []

			for (var y = 0; y < 24; y++) {
				var line = true

				for (var x = 0; x < 10; x++) {
					if (document.getElementById("_grid-row_" + y + "_grid-cell_" + x).className.indexOf("block-inactive") == -1) {
						line = false
						break
					}
				}

				if (line) {
					lines.push(y)
				}
			}

			if (lines.length > 0) {
				var score = document.getElementById("score-inner")

				for (var l in lines) {
					setTimeout(function() {
						var y = lines[l]

						for (var x = 0; x < 10; x++) {
							emptyBlock(x, y)
						}

						score.textContent = Number(score.textContent) + 100

						fillVoid(y)
					}, 500)
				}
			}

		}

	/* fillVoid */
		function fillVoid(line) {
			var inactive = Array.prototype.slice.call(document.getElementsByClassName("block-inactive"))
			var before = []
			var after = []

			for (var i in inactive) {
				var coordinates = getCoordinates(inactive[i])

				if (coordinates.y < line) {
					before.push([coordinates.x, coordinates.y])
					after.push([coordinates.x, coordinates.y + 1, coordinates.s])
				}
			}

			console.log(before)
			console.log(after)

			for (var b in before) {
				emptyBlock(before[b][0], before[b][1])
			}

			for (var a in after) {
				fillBlock(after[a][0], after[a][1], after[a][2])
			}
		}

	/* key listeners */
		document.addEventListener("keydown", function (event) {
			if (event.which !== null) {
				switch (event.which) {
					case 38: //up --> rotate
						rotateBlock()
					break
					case 37: //left
						leftBlock()
					break
					case 39: //right
						rightBlock()
					break
					case 40: //down --> drop
						dropBlock()
					break
				}
			}
		})

}
