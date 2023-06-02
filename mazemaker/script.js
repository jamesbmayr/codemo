/*** on load ***/
	/* triggers */
		if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
			var on = { click: "touchstart", mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" }
		}
		else {
			var on = { click:      "click", mousedown:  "mousedown", mousemove: "mousemove", mouseup:  "mouseup" }
		}

	/* globals */
		var grid    = document.getElementById("grid")
		var open    = document.getElementById("open")
		var close   = document.getElementById("close")
		var options = document.getElementById("options")
		var maze = {}
		var mazeLoop

/*** build ***/
	/* buildOptions */
		 open.addEventListener(on.click, buildOptions)
		close.addEventListener(on.click, buildOptions)
		function buildOptions(event) {
			if (event.target.id == "open") {
				open.removeAttribute("active")
				options.setAttribute("active", true)
			}
			else if (event.target.id == "close") {
				options.removeAttribute("active")
				open.setAttribute("active", true)
			}
		}

	/* buildMaze */
		options.addEventListener("submit", buildMaze)
		function buildMaze(event) {
			// hide options
				buildOptions({target: close})

			// stop loop
				if (mazeLoop) {
					clearInterval(mazeLoop)
					mazeLoop = null
				}

			// reset + options
				maze = setEmpty(maze)
				maze.settings.x =        Number(options.width.value)
				maze.settings.y =        Number(options.height.value)
				maze.settings.blocks   = Number(options.blocks.value)
				maze.settings.interval = Number(options.interval.value)
			
			// grid, blocks, start
				maze = setGrid(maze)
				maze = setBlocks(maze)
				maze = setStart(maze)

			// log & draw
				drawMaze(maze)

			// set random in a circle
				mazeLoop = setInterval(function() {
					if (!isComplete(maze)) {
						maze = setRandom(maze, maze.current.x, maze.current.y)
						maze =   setNext(maze, maze.current.x, maze.current.y, maze.current.s, maze.current.l, maze.current.p)
					}
					else {
						clearInterval(mazeLoop)
					}
				}, maze.settings.interval)
		}

/*** is ***/
	/* isEnclosed */
		function isEnclosed(maze, x, y, c) {
			// build island
				var island = getIsland(maze, x, y, c)
				var islandKeys = Object.keys(island)

			// white
				if (c === 0 || c === null) { // loose so (white == null)
					for (var k in islandKeys) {
						var neighbors = getNeighbors(maze, island[islandKeys[k]].x, island[islandKeys[k]].y, false)
						var neighborKeys = Object.keys(neighbors)
						for (var j in neighborKeys) {
							if (neighbors[neighborKeys[j]].c === null) {
								return false
							}
						}
					}
				}

			// black
				if (c === 1) {
					for (var k in islandKeys) {
						var neighbors = getNeighbors(maze, island[islandKeys[k]].x, island[islandKeys[k]].y, true)
						var neighborKeys = Object.keys(neighbors)
						for (var j in neighborKeys) {
							if (neighbors[neighborKeys[j]].x === null && neighbors[neighborKeys[j]].y === null && neighbors[neighborKeys[j]].c === 1) {
								return false
							}
						}
					}
					return false // allow for black islands
				}

			return true
		}

	/* isFoursquare */
		function isFoursquare(maze, x, y, c) {
			// get neighbors
				var neighbors = getNeighbors(maze, x, y, true)

			// w nw n
				if (neighbors.w.c === c && neighbors.nw.c === c && neighbors.n.c === c) {
					return true
				}

			// n ne e
				if (neighbors.n.c === c && neighbors.ne.c === c && neighbors.e.c === c) {
					return true
				}

			// e se s
				if (neighbors.e.c === c && neighbors.se.c === c && neighbors.s.c === c) {
					return true
				}

			// s sw w
				if (neighbors.s.c === c && neighbors.sw.c === c && neighbors.w.c === c) {
					return true
				}

			// otherwise
				return false
		}

	/* isComplete */
		function isComplete(maze) {
			for (var x = 0; x < maze.settings.x; x++) {
				for (var y = 0; y < maze.settings.y; y++) {
					if (maze.grid[x][y].c === null) {
						return false
					}
				}
			}

			return true
		}

	/* causesIsland */
		function causesIsland(maze, x, y, c) {
			// get all islands
				var islands = []
				var cells = []

				for (var x = 0; x < maze.settings.x; x++) {
					for (var y = 0; y < maze.settings.y; y++) {
						if (maze.grid[x][y].c !== null && !cells.includes(x + "," + y)) {
							var island = getIsland(maze, x, y, maze.grid[x][y].c)
							islands.push(island)

							var islandKeys = Object.keys(island)
							for (var k in islandKeys) {
								cells.push(islandKeys[k])
							}
						}
					}
				}

			// count
				var blackCount = 0
				var whiteCount = 0
				for (var i in islands) {
					var first = islands[i][Object.keys(islands[i])[0]]
					if (first.c !== 1) {
						whiteCount++
					}
				}

			// multiple white areas?
				if (whiteCount > 1) {
					return true
				}
				else {
					return false
				}
		}

/*** get ***/
	/* getNeighbors */
		function getNeighbors(maze, x, y, diagonal) {
			// outer wall ?
				if (x === null || y === null) {
					return {}
				}

			// surrounding cells
				var nw = (x > 0                   && y > 0                  ) ? maze.grid[x - 1][y - 1] : {x: null, y: null, c: 1}
				var n  = (                           y > 0                  ) ? maze.grid[x    ][y - 1] : {x: null, y: null, c: 1}
				var ne = (x < maze.settings.x - 1 && y > 0                  ) ? maze.grid[x + 1][y - 1] : {x: null, y: null, c: 1}
				var e  = (x < maze.settings.x - 1                           ) ? maze.grid[x + 1][y    ] : {x: null, y: null, c: 1}
				var se = (x < maze.settings.x - 1 && y < maze.settings.y - 1) ? maze.grid[x + 1][y + 1] : {x: null, y: null, c: 1}
				var s  = (                           y < maze.settings.y - 1) ? maze.grid[x    ][y + 1] : {x: null, y: null, c: 1}
				var sw = (x > 0                   && y < maze.settings.y - 1) ? maze.grid[x - 1][y + 1] : {x: null, y: null, c: 1}
				var w  = (x > 0                                             ) ? maze.grid[x - 1][y    ] : {x: null, y: null, c: 1}

			// return
				if (diagonal) {
					return {
						nw: nw,
						n:  n,
						ne: ne,
						e:  e,
						se: se,
						s:  s,
						sw: sw,
						w:  w
					}
				}
				else {
					return {
						n:  n,
						e:  e,
						s:  s,
						w:  w
					}
				}
		}

	/* getIsland */
		function getIsland(maze, x, y, c, island) {
			// island ?
				if (!island) {
					var island = {}
						island[x + "," + y] = {
							x: x,
							y: y,
							c: c
						}
				}
				var islandKeys = Object.keys(island)

			// neighbors (not including existing island members)
				var neighbors = getNeighbors(maze, x, y, false)
				var neighborKeys = Object.keys(neighbors)
					neighborKeys = neighborKeys.filter(function(k) {
						return !islandKeys.includes(neighbors[k].x + "," + neighbors[k].y)
					})

			// add to island
				for (var k in neighborKeys) {
					if (!neighbors[neighborKeys[k]].c === !c) { // loose so (white == null)
						island[neighbors[neighborKeys[k]].x + "," + neighbors[neighborKeys[k]].y] = neighbors[neighborKeys[k]]
						if (neighbors[neighborKeys[k]].x !== null && neighbors[neighborKeys[k]].y !== null) {
							island = getIsland(maze, neighbors[neighborKeys[k]].x, neighbors[neighborKeys[k]].y, c, island)
						}
					}
				}

			return island
		}

	/* getPerimeter */
		function getPerimeter(maze, l) {
			return (2 * ((maze.settings.x - 2 * l) + (maze.settings.y - 2 * l)) - 4)
		}

	/* getDiagonalIn */
		function getDiagonalIn(maze, z, d) {
			if (z > maze.settings[d] / 2) {
				return z - 1
			}
			else if (z < maze.settings[d] / 2) {
				return z + 1
			}
			else {
				return z
			}
		}

	/* getCenters */
		function getCenters(maze) {
			// x
				if (maze.settings.x % 2 == 0) {
					var xs = [(maze.settings.x / 2), ((maze.settings.x / 2) - 1)]
				}
				else {
					var xs = [Math.floor(maze.settings.x / 2)]
				}

			// y
				if (maze.settings.y % 2 == 0) {
					var ys = [(maze.settings.y / 2), ((maze.settings.y / 2) - 1)]
				}
				else {
					var ys = [Math.floor(maze.settings.y / 2)]
				}

			// centers
				var centers = []
				for (var x in xs) {
					for (var y in ys) {
						centers.push({
							x: xs[x],
							y: ys[y]
						})
					}
				}

			return centers
		}

/*** set ***/
	/* setEmpty */
		function setEmpty(maze) {
			// reset grid, settings, currently selected cell
				maze = {
					grid: [],
					settings: {
						x: 20,
						y: 20,
						blocks: 1,
						interval: 100
					},
					start: {
						x: null,
						y: null,
						s: null
					},
					current: {
						x: 0,
						y: 0,
						s: null,
						l: 0,
						p: 0,
						b: 0
					},
					history: []
				}

			return maze
		}

	/* setGrid */
		function setGrid(maze) {
			// empty grid
				for (var x = 0; x < maze.settings.x; x++) {
					var column = []
					for (var y = 0; y < maze.settings.y; y++) {
						column.push({x: x, y: y, c: null})
					}
					maze.grid.push(column)
				}

			// make corners white
				maze.grid[0][0]										= {x: 0,					y: 0,					c: 0}
				maze.grid[0][maze.settings.y - 1]					= {x: 0, 					y: maze.settings.y - 1,	c: 0}
				maze.grid[maze.settings.x - 1][0]					= {x: maze.settings.x - 1,	y: 0,					c: 0}
				maze.grid[maze.settings.x - 1][maze.settings.y - 1]	= {x: maze.settings.x - 1,	y: maze.settings.y - 1,	c: 0}

			return maze
		}

	/* setBlocks */
		function setBlocks(maze) {
			// centers
				if (maze.settings.blocks >= 1) {
					// centers
						var centers = getCenters(maze)
						for (var pair in centers) {
							maze.grid[centers[pair].x][centers[pair].y].c = 1
						}

					// set up for random blocks
						maze.current.b = 1
						var centerKeys = centers.map(function(c) {
							return (c.x + "," + c.y)
						})
				}

			// random blocks
				if (maze.settings.blocks > 1) {
					var abort = 0
					while (abort < 100 && maze.current.b < maze.settings.blocks) {
						abort++

						var x = Math.floor(Math.random() * (maze.settings.x - 2)) + 1
						var y = Math.floor(Math.random() * (maze.settings.y - 2)) + 1

						if (!centerKeys.includes(x + "," + y)) {
							maze.grid[x][y].c = 1
							abort = 0
							maze.current.b++

							// ensure no black neighbors
								var neighbors = getNeighbors(maze, x, y, true)
								for (var n in neighbors) {
									if (neighbors[n].c === 1) {
										maze.grid[x][y].c = null
										maze.current.b--
										break
									}
								}
						}
					}
				}

			return maze
		}

	/* setStart */
		function setStart(maze) {
			// starting side
				maze.start.s = Math.floor(Math.random() * 4)

			// starting cell
				if (maze.start.s === 0) { // top
					maze.start.x = Math.floor(Math.random() * (maze.settings.x - 2)) + 1,
					maze.start.y = 0
				}
				else if (maze.start.s === 1) { // right
					maze.start.x = maze.settings.x - 1,
					maze.start.y = Math.floor(Math.random() * (maze.settings.y - 2)) + 1
				}
				else if (maze.start.s === 2) { // bottom
					maze.start.x = Math.floor(Math.random() * (maze.settings.x - 2)) + 1,
					maze.start.y = maze.settings.y - 1
				}
				else { // left
					maze.start.x = 0,
					maze.start.y = Math.floor(Math.random() * (maze.settings.y - 2)) + 1
				}

			// set current
				maze.current.x = maze.start.x
				maze.current.y = maze.start.y
				maze.current.s = maze.start.s
				maze.current.l = 0
				maze.current.p = getPerimeter(maze, 0)

			return maze
		}

	/* setRandom */
		function setRandom(maze, x, y) {
			// pick a color & set it
				var color = Math.sign(Math.floor(Math.random() * 2))
				maze.grid[x][y].c = color

			// white ?
				if (color === 0) {
					if (isFoursquare(maze, x, y, color) || isEnclosed(maze, x, y, color)) {
						maze.grid[x][y].c = 1
						color = 1
					}
					else if (causesIsland(maze, x, y, color)) {
						maze.grid[x][y].c = 1
						color = 1
					}
				}

			// black ?
				if (color === 1) {
					if (isFoursquare(maze, x, y, color) || isEnclosed(maze, x, y, color)) {
						maze.grid[x][y].c = 0
						color = 0
					}
					else if (causesIsland(maze, x, y, color)) {
						maze.grid[x][y].c = 0
						color = 0
					}
				}

			// draw
				colorCell(x, y, maze.grid[x][y].c)

			return maze
		}

	/* setNext */
		function setNext(maze, x, y, s, l, p, escape) {
			// escape ?
				if (escape && escape > (2 * (maze.settings.x + maze.settings.y) - 4)) {
					return maze
				}
				else if (!escape) {
					var escape = 0
				}

			// island --> go back
				if (causesIsland(maze, x, y, 0)) {
					// reset current
						maze.grid[x][y].c = null

					// reset previous
						maze.current = JSON.parse(JSON.stringify(maze.history[maze.history.length - 2]))
						maze.grid[maze.current.x][maze.current.y].c = null
						maze.history.pop()
						maze.history.pop()
				}

			// at center --> look for stragglers
				else if (l >= (Math.min(maze.settings.x, maze.settings.y) / 2)) {
					for (var row in maze.grid) {
						for (var column in maze.grid[row]) {
							if (maze.grid[row][column].c === null) {
								maze.current.x = maze.grid[row][column].x
								maze.current.y = maze.grid[row][column].y
							}
						}
					}
				}

			// get next
				else if (s === 0) { // top
					if (!p) { // move in
						maze.current.x = getDiagonalIn(maze, x, "x")
						maze.current.y = getDiagonalIn(maze, y, "y")
						maze.current.l = l + 1
						maze.current.p = getPerimeter(maze, maze.current.l)
					}
					else if (x + 1 > maze.settings.x - 1 - l) { // wrap around
						maze.current.y = y + 1
						maze.current.s = 1
					}
					else { // continue
						maze.current.x = x + 1
					}

					maze.current.p--
				}
				else if (s === 1) { // right
					if (!p) { // move in
						maze.current.x = getDiagonalIn(maze, x, "x")
						maze.current.y = getDiagonalIn(maze, y, "y")
						maze.current.l = l + 1
						maze.current.p = getPerimeter(maze, maze.current.l)
					}
					else if (y + 1 > maze.settings.y - 1 - l) { // wrap around
						maze.current.x = x - 1
						maze.current.s = 2
					}
					else { // continue
						maze.current.y = y + 1
					}

					maze.current.p--
				}
				else if (s === 2) { // bottom
					if (!p) { // move in
						maze.current.x = getDiagonalIn(maze, x, "x")
						maze.current.y = getDiagonalIn(maze, y, "y")
						maze.current.l = l + 1
						maze.current.p = getPerimeter(maze, maze.current.l)
					}
					else if (x - 1 < 0 + l) { // wrap around
						maze.current.y = y - 1
						maze.current.s = 3
					}
					else { // continue
						maze.current.x = x - 1
					}

					maze.current.p--
				}
				else { // left
					if (!p) { // move in
						maze.current.x = getDiagonalIn(maze, x, "x")
						maze.current.y = getDiagonalIn(maze, y, "y")
						maze.current.l = l + 1
						maze.current.p = getPerimeter(maze, maze.current.l)
					}
					else if (y - 1 < 0 + l) { // wrap around
						maze.current.x = x + 1
						maze.current.s = 0
					}
					else { // continue
						maze.current.y = y - 1
					}

					maze.current.p--
				}

			// add to history
				maze.history.push(JSON.parse(JSON.stringify(maze.current)))

			// not empty ?
				if (maze.grid[maze.current.x][maze.current.y].c !== null && !isComplete(maze)) {
					return setNext(maze, maze.current.x, maze.current.y, maze.current.s, maze.current.l, maze.current.p, escape + 1)
				}

			return maze
		}

/*** draw ***/
	/* drawMaze */
		function drawMaze(maze) {
			// reset
				grid.innerHTML = ""

			// rows
				for (var y = 0; y < maze.settings.y; y++) {
					var row = document.createElement("div")
						row.className = "row"

					// cells
						for (var x = 0; x < maze.settings.x; x++) {
							var cell = drawCell(maze.grid[x][y].c)
								cell.id = "_" + x + "_" + y
							row.appendChild(cell)
						}

					// add to grid
						grid.appendChild(row)
				}

			// corners & blocks
				for (var x = 0; x < maze.settings.x; x++) {
					for (var y = 0; y < maze.settings.y; y++) {
						if (maze.grid[x][y].c !== null) {
							colorCell(x, y, maze.grid[x][y].c)
						}
					}
				}
		}

	/* drawCell */
		function drawCell(color) {
			var cell = document.createElement("div")
				cell.className = "cell"
			return cell
		}

	/* colorcell */
		function colorCell(x, y, color) {
			document.getElementById("_" + x + "_" + y).setAttribute("color", (color ? "black" : "white"))
		}