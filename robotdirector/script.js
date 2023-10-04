/* * page * */
	/* triggers */
		if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
			var on = { click: "touchstart", mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" }
		}
		else {
			var on = { click:      "click", mousedown:  "mousedown", mousemove: "mousemove", mouseup:  "mouseup" }
		}

	/* svg */
		var svg = {
			play: '<svg id="pause_glyph" viewBox="20 20 60 60"><path d="M 32 72 C 32 60 32 40 32 28 C 32 26 34 24 36 24 C 38 24 38 24 40 25 C 48 30 65 40 73 45 C 76 47 77 48 77 50 C 77 52 76 53 73 55 C 65 60 48 70 40 75 C 38 76 38 76 36 76 C 34 76 32 74 32 72 Z"></path></svg>',
			pause: '<svg id="pause_glyph" viewBox="20 20 60 60"><path d="M 37 80 C 34 80 32 78 32 75 C 32 60 32 40 32 25 C 32 22 34 20 37 20 C 40 20 42 22 42 25 C 42 40 42 60 42 75 C 42 78 40 80 37 80 Z M 63 80 C 60 80 58 78 58 75 C 58 60 58 40 58 25 C 58 22 60 20 63 20 C 66 20 68 22 68 25 C 68 40 68 60 68 75 C 68 78 66 80 63 80 Z"></path></svg>',
			reset: '<svg id="pause_glyph" viewBox="10 10 80 80"><path d="M 33 25 C 36 23 42 20 50 20 C 64 20 77 29 80 47 C 81 46 81 46 81 46 C 83 44 86 44 88 46 C 90 48 90 51 88 53 C 86 55 83 58 81 60 C 79 62 77 64 75 64 C 73 64 71 62 69 60 C 67 58 64 55 62 53 C 60 51 60 48 62 46 C 64 44 67 44 70 47 C 67 36 59 30 50 30 C 45 30 41 32 39 33 C 39 33 35 35 33 33 C 31 31 30 27 33 25 Z M 67 75 C 64 77 58 80 50 80 C 36 80 23 71 20 53 C 19 54 19 54 19 54 C 17 56 14 56 12 54 C 10 52 10 49 12 47 C 14 45 17 42 19 40 C 21 38 23 36 25 36 C 27 36 29 38 31 40 C 33 42 36 45 38 47 C 40 49 40 52 38 54 C 36 56 33 56 30 53 C 33 64 41 70 50 70 C 55 70 59 68 61 67 C 61 67 65 65 67 67 C 69 69 70 73 67 75 Z"></path></svg>'
		}

	/* load */
		var timer = null
		startGame()

	/* listeners */
		/* mousedownEndpoint */
			function mousedownEndpoint(event) {
				if (event.target.className.includes("selected")) {
					Array.from(document.querySelectorAll(".endpoint")).forEach(function(el) {
						el.className = el.className.replace(/\s?selected/,"")
					})
				}
				else {
					Array.from(document.querySelectorAll(".endpoint")).forEach(function(el) {
						el.className = el.className.replace(/\s?selected/,"")
					})
					event.target.className += " selected"
				}
			}

		/* mousedownRobot */
			function mousedownRobot(event) {
				if (event.target.querySelector(".endpoint")) {
					var endpoint = event.target.querySelector(".endpoint")
					if (endpoint.className.includes("selected")) {
						endpoint.className = endpoint.className.replace(/\s?selected/, "")
					}
					else {
						Array.from(document.querySelectorAll(".endpoint")).forEach(function(el) {
							el.className = el.className.replace(/\s?selected/,"")
						})
						endpoint.className += " selected"
					}
				}
			}

		/* mousemoveOverGridCell */
			function mousemoveOverGridCell(event) {
				if (window.playing) {
					var cell_x = Number(event.target.getAttribute("x"))
					var cell_y = Number(event.target.getAttribute("y"))
					selectCell(cell_x,cell_y)
				}
			}

		/* mousedownOverGridCell */
			function mousedownOverGridCell(event) {
				if (window.playing) {
					var cell_x = Number(event.target.getAttribute("x"))
					var cell_y = Number(event.target.getAttribute("y"))
					selectCell(cell_x,cell_y)
				}
			}

		/* clickPause */
			document.querySelector("#pause").addEventListener(on.click, clickPause)
			function clickPause(event) {
				var pauseButton = document.querySelector("#pause")
				if (pauseButton.className.includes("reset")) {
					startGame()

					pauseButton.className = pauseButton.className.replace(/\s?reset/, "")
				}
				else if (pauseButton.className.includes("playing")) {
					window.playing = false
					pauseButton.className = pauseButton.className.replace(/\s?playing/, "")
					pauseButton.innerHTML = svg.play
				}
				else {
					window.playing = true
					pauseButton.className += " playing"
					pauseButton.innerHTML = svg.pause
				}
			}

/* * actions * */
	/* selectCell */
		function selectCell(cell_x,cell_y) {
			//get endpoint
				var selected = document.querySelector(".endpoint.selected")
				if (selected) {
					var unit = Number(selected.id.replace("endpoint_",""))
					var color = selected.getAttribute("color")
				}

			//add to path
				if (unit && isEmptyUnderGrid(color, cell_x, cell_y) && !(Number(document.querySelector("#underGrid_cell_" + color + "_" + cell_x + "_" + cell_y).getAttribute("path")) === unit)) {
					//get path endpoint
						var end_x = Number(document.querySelector(".endpoint.selected").getAttribute("x"))
						var end_y = Number(document.querySelector(".endpoint.selected").getAttribute("y"))
						var to = false
						var from = false

					//starting?
						if (document.querySelector("#robot_" + unit + "[x='" + end_x + "'][y='" + end_y + "']")) {
							var cell = document.querySelector("#underGrid_cell_" + color + "_" + end_x + "_" + end_y)
							if (cell) {
								cell.setAttribute("from","center")
								cell.setAttribute("color",color)
							}
						}

					//past a collector?
						if (document.querySelector("#underGrid_cell_" + color + "_" + end_x + "_" + end_y) && document.querySelector("#underGrid_cell_" + color + "_" + end_x + "_" + end_y).className.includes("underGrid_collector")) {
						}
						else {
							//direction
								var directions = toFrom(end_x,end_y,cell_x,cell_y)
								var to = directions[0]
								var from = directions[1]

							//adjacent?
								if (to) {
									var cell = document.querySelector("#underGrid_cell_" + color + "_" + end_x + "_" + end_y)
									if (cell) {
										cell.setAttribute("to",to)
									}

									var endpoint = document.querySelector(".endpoint.selected")
										endpoint.parentElement.removeChild(endpoint)
										document.querySelector("#overGrid_cell_" + cell_x + "_" + cell_y).appendChild(endpoint)
										endpoint.setAttribute("x",cell_x)
										endpoint.setAttribute("y",cell_y)
									var cell = document.querySelector("#underGrid_cell_" + color + "_" + cell_x + "_" + cell_y)
									if (cell) {
										cell.setAttribute("path",unit)
										cell.setAttribute("from",from)
										cell.setAttribute("to","center")
										cell.setAttribute("color",color)
									}

									if (document.querySelector("#overGrid_cell_" + end_x + "_" + end_y + " .endpoint")) {
										var cell = document.querySelector("#overGrid_cell_" + end_x + "_" + end_y + " .endpoint")
											cell.className = cell.className.replace(/\s?underneath/, "")
									}
								}

							//collector?
								if (to && document.querySelector("#overGrid_cell_" + cell_x + "_" + cell_y + " .collector[color='" + color + "']")) {
									var endpoint = document.querySelector(".endpoint.selected")
										endpoint.parentElement.removeChild(endpoint)
									var collector = document.querySelector("#overGrid_cell_" + cell_x + "_" + cell_y + " .collector[color='" + color + "']")
									
									if (collector.querySelector(".endpoint")) {
										collector.querySelector(".endpoint").className += " underneath"
									}

									collector.appendChild(endpoint)
									endpoint.setAttribute("x",cell_x)
									endpoint.setAttribute("y",cell_y)

									if (document.querySelector("#overGrid_cell_" + end_x + "_" + end_y + " .endpoint")) {
										var cell = document.querySelector("#overGrid_cell_" + end_x + "_" + end_y + " .endpoint")
											cell.className = cell.className.replace(/\s?underneath/, "")
									}
								}
						}
				}

			//backtrack path
				else if (unit && (Number(document.querySelector("#underGrid_cell_" + color + "_" + cell_x + "_" + cell_y).getAttribute("path")) === unit)) {
					//get endpoint cell
						var end_x = Number(document.querySelector(".endpoint.selected").getAttribute("x"))
						var end_y = Number(document.querySelector(".endpoint.selected").getAttribute("y"))

					//backing out of a collector?
						if (document.querySelector("#underGrid_cell_" + color + "_" + end_x + "_" + end_y).className.includes("underGrid_collector")) {
						}
						else {
							//get previous cell
								var from = document.querySelector("#underGrid_cell_" + color + "_" + end_x + "_" + end_y).getAttribute("from")

								var coordinates = pathFrom(from, end_x, end_y)
								var previous_x = coordinates[0]
								var previous_y = coordinates[1]

							//go back
								if (from && (cell_x === previous_x) && (cell_y === previous_y)) {
									document.querySelector("#underGrid_cell_" + color + "_" + end_x + "_" + end_y + ":not(.underGrid_collector)").getAttribute("color","")
									var cell = document.querySelector("#underGrid_cell_" + color + "_" + end_x + "_" + end_y)
									if (cell) {
										cell.setAttribute("from","")
										cell.setAttribute("to","")
										cell.setAttribute("path","")
									}

									var endpoint = document.querySelector(".endpoint.selected")
										endpoint.setAttribute("x",cell_x)
										endpoint.setAttribute("y",cell_y)
									if (endpoint.parentElement) {
										endpoint.parentElement.removeChild(endpoint)
										document.querySelector("#overGrid_cell_" + cell_x + "_" + cell_y).appendChild(endpoint)
									}
									document.querySelector("#underGrid_cell_" + color + "_" + cell_x + "_" + cell_y).setAttribute("to","center")

									if (document.querySelector("#overGrid_cell_" + end_x + "_" + end_y + " .underneath")) {
										var cell = document.querySelector("#overGrid_cell_" + end_x + "_" + end_y + " .endpoint")
										cell.className = cell.className.replace(/\s?underneath/, "")
									}

									//collector
										if (document.querySelector("#overGrid_cell_" + cell_x + "_" + cell_y + " .collector[color='" + color + "']")) {
											var endpoint = document.querySelector(".endpoint.selected")
											if (endpoint.parentElement) {
												endpoint.parentElement.removeChild(endpoint)
											}
											var collector = document.querySelector("#overGrid_cell_" + cell_x + "_" + cell_y + " .collector[color='" + color + "']")
											
											if (collector.querySelector(".endpoint")) {
												collector.querySelector(".endpoint").className += " underneath"
											}

											collector.appendChild(endpoint)
											endpoint.setAttribute("x",cell_x)
											endpoint.setAttribute("y",cell_y)
										}
								}
						}
				}

			//reset path
				if (unit && (Number(document.querySelector("#robot_" + unit).getAttribute("x")) === cell_x) && (Number(document.querySelector("#robot_" + unit).getAttribute("y")) === cell_y)) {
					//get endpoint cell
						var end_x = Number(document.querySelector(".endpoint.selected").getAttribute("x"))
						var end_y = Number(document.querySelector(".endpoint.selected").getAttribute("y"))

					//backing out of a collector?
						if (document.querySelector("#underGrid_cell_" + color + "_" + end_x + "_" + end_y).className.includes("underGrid_collector")) {
						}
						else {
							//reset
							var cell = document.querySelector(".underGrid_cell[path='" + unit + "']:not(.underGrid_collector)")
							if (cell) {
								cell.setAttribute("color","")
								cell.setAttribute("path","")
								cell.setAttribute("from","")
								cell.setAttribute("to","")
							}

							var cell = document.querySelector("#underGrid_cell_" + color + "_" + cell_x + "_" + cell_y)
							if (cell) {
								cell.setAttribute("path",unit)
								cell.setAttribute("from","center")
								cell.setAttribute("to","center")
								cell.setAttribute("color",color)
							}

							var endpoint = document.querySelector(".endpoint.selected")
								endpoint.setAttribute("x",cell_x)
								endpoint.setAttribute("y",cell_y)
							if (endpoint.parentElement) {
								endpoint.parentElement.removeChild(endpoint)
								document.querySelector("#robot_" + unit).appendChild(endpoint)
							}

							if (document.querySelector("#overGrid_cell_" + end_x + "_" + end_y + " .endpoint")) {
								var cell = document.querySelector("#overGrid_cell_" + end_x + "_" + end_y + " .endpoint")
									cell.className = cell.className.replace(/\s?underneath/, "")
							}
						}
				}
		}

/* * helpers * */
	/* isEmptyUnderGrid */
		function isEmptyUnderGrid(color,x,y) {
			if (document.querySelector("#overGrid_cell_" + x + "_" + y + " .endpoint:not([color='" + color + "'])")) {
				return false
			}
			else if (document.querySelector("#overGrid_cell_" + x + "_" + y + " .endpoint[color='" + color + "']") && !(document.querySelector("#overGrid_cell_" + x + "_" + y + " .collector[color='" + color + "']"))) {
				return false
			}
			else if (document.querySelector("#underGrid_cell_" + color + "_" + x + "_" + y).getAttribute("path") && !(document.querySelector("#overGrid_cell_" + x + "_" + y + " .collector[color='" + color + "']"))) {
				return false
			}
			else if (document.querySelector("#overGrid_cell_" + x + "_" + y + " .collector:not([color='" + color + "'])")) {
				return false
			}
			else {
				return true
			}
		}

	/* isEmptyOverGrid */
		function isEmptyOverGrid(color,x,y) {
			if ((x < 0) || (x > 9) || (y < 0) || (y > 9)) {
				return false
			}
			else if (document.querySelector("#overGrid_cell_" + x + "_" + y + " .obstacle")) {
				return false
			}
			else if (document.querySelector("#overGrid_cell_" + x + "_" + y + " .collector:not([color='" + color + "'])")) {
				return false
			}
			else if (document.querySelector(".robot[x='" + x + "'][y='" + y + "']:not([color='" + color + "']")) {
				return false
			}
			else if (document.querySelector(".robot[x='" + x + "'][y='" + y + "'][color='" + color + "']") && !(document.querySelector("#overGrid_cell_" + x + "_" + y + " .collector[color='" + color + "']"))) {
				return false
			}
			else {
				return true
			}
		}

	/* pathTo */
		function pathTo(to,x,y) {
			x = Number(x)
			y = Number(y)

			switch (to) {
				case "top":
					x = x
					y = y + 1
				break

				case "right":
					x = x - 1
					y = y
				break

				case "bottom":
					x = x
					y = y - 1
				break

				case "left":
					x = x + 1
					y = y
				break

				default:
					x = x
					y = y
				break
			}
			return [x,y]
		}

	/* pathFrom */
		function pathFrom(from,x,y) {
			x = Number(x)
			y = Number(y)

			switch (from) {
				case "top":
					x = x
					y = y - 1
				break

				case "right":
					x = x + 1
					y = y
				break

				case "bottom":
					x = x
					y = y + 1
				break

				case "left":
					x = x - 1
					y = y
				break

				default:
					x = x
					y = y
				break
			}
			return [x,y]
		}

	/* toFrom */
		function toFrom(start_x,start_y,end_x,end_y) {
			if ((end_x === start_x + 1) && (end_y === start_y)) {
				to = "right"
				from = "left"
			}
			else if ((end_x === start_x - 1) && (end_y === start_y)) {
				to = "left"
				from = "right"
			}
			else if ((end_x === start_x) && (end_y === start_y + 1)) {
				to = "bottom"
				from = "top"
			}
			else if ((end_x === start_x) && (end_y === start_y - 1)) {
				to = "top"
				from = "bottom"
			}
			else {
				to = false
				from = false
			}

			return [to,from]
		}

/* * functions * */
	/* startGame */
		function startGame() {
			// timer
				clearInterval(timer)
				timer = setInterval(function() {
					if (window.playing) {
						moveRobots()
						spawnRobots()
					}
				}, 2000)

			//reset
				window.playing = false
				window.score = 0
				var colors = ["red","green","blue"]
				document.querySelector("#scoreInner").innerText = ""

				document.querySelector("#container").innerHTML = ""
				var overGrid = document.createElement("div")
					overGrid.id = "overGrid"
					overGrid.className = "overGrid"
				document.querySelector("#container").appendChild(overGrid)
				
				for (i = 0; i < colors.length; i++) {
					var underGrid = document.createElement("div")
						underGrid.className = "underGrid"
						underGrid.id = "underGrid_" + colors[i]
					document.querySelector("#container").appendChild(underGrid)
				}

			//create grid
				for (y = 0; y < 10; y++) {
					var row = document.createElement("div")
						row.id = "overGrid_row_" + y
						row.className = "overGrid_row"
					overGrid.appendChild(row)

					for (i = 0; i < colors.length; i++) {
						var row = document.createElement("div")
							row.id = "underGrid_row_" + colors[i] + "_" + y
							row.className = "underGrid_row"
						document.querySelector("#underGrid_" + colors[i]).appendChild(row)
					}
					for (x = 0; x < 10; x++) {
						var cell = document.createElement("div")
							cell.id = "overGrid_cell_" + x + "_" + y
							cell.className = "overGrid_cell"
							cell.setAttribute("x", x)
							cell.setAttribute("y", y)
							cell.addEventListener(on.mousemove, mousemoveOverGridCell)
							cell.addEventListener(on.mousedown, mousedownOverGridCell)
						document.querySelector("#overGrid_row_" + y).appendChild(cell)

						for (i = 0; i < colors.length; i++) {
							var cell = document.createElement("div")
								cell.id = "underGrid_cell_" + colors[i] + "_" + x + "_" + y
								cell.className = "underGrid_cell"
								cell.setAttribute("x", x)
								cell.setAttribute("y", y)
							document.querySelector("#underGrid_row_" + colors[i] + "_" + y).appendChild(cell)
						}
					}
				}

			//create collectors
				var collectorCoordinates = []
				for (i = 0; i < colors.length; i++) {
					do {
						var x = Math.floor(Math.random() * 6) + 2
						var y = Math.floor(Math.random() * 6) + 2
					}
					while ((collectorCoordinates.indexOf(x + "_" + y) > -1) || (collectorCoordinates.indexOf((x - 1) + "_" + y) > -1) || (collectorCoordinates.indexOf((x + 1) + "_" + y) > -1) || (collectorCoordinates.indexOf(x + "_" + (y - 1)) > -1) || (collectorCoordinates.indexOf(x + "_" + (y + 1)) > -1))
					
					var collector = document.createElement("div")
						collector.className = "collector"
						collector.setAttribute("color", colors[i])
					document.querySelector("#overGrid_cell_" + x + "_" + y).appendChild(collector)
					document.querySelector("#underGrid_cell_" + colors[i] + "_" + x + "_" + y).className += " underGrid_collector"
					document.querySelector("#underGrid_cell_" + colors[i] + "_" + x + "_" + y).setAttribute("color",colors[i])
					collectorCoordinates.push(x + "_" + y)
				}

			//begin game
				window.playing = true
				document.querySelector("#pause").className += " playing"
				document.querySelector("#pause").innerHTML = svg.pause
		}

	/* moveRobots */
		function moveRobots() {
			Array.from(document.querySelectorAll(".robot")).forEach(function(robot) {
				//starting point
					var unit = Number(robot.id.replace("robot_",""))
					var start_x = Number(robot.getAttribute("x"))
					var start_y = Number(robot.getAttribute("y"))
					var color = robot.getAttribute("color")
					var oldDirection = robot.getAttribute("direction")

				//get newDirection
					var temp = document.querySelector("#underGrid_cell_" + color + "_" + start_x + "_" + start_y + "[path='" + unit + "']")
					var newDirection = temp ? temp.getAttribute("to") : null

					if (!newDirection) {
						newDirection = oldDirection
					}
					else if (newDirection === "center") {
						newDirection = oldDirection
					}

					robot.setAttribute("direction",newDirection)
				
				//get new coordinates
					var coordinates = pathFrom(newDirection, start_x, start_y)
					var end_x = coordinates[0]
					var end_y = coordinates[1]

				//collected?
					if (robot.className.includes("collected")) {
						var cell = document.querySelector(".underGrid_cell[path='" + unit + "']:not(.underGrid_collector)")
						if (cell) {
							cell.setAttribute("color","")
						}
						var cell = document.querySelector(".underGrid_cell[path='" + unit + "']")
						if (cell) {
							cell.setAttribute("from","")
							cell.setAttribute("to","")
							cell.setAttribute("path","")
						}

						var endpoint = document.querySelector("#endpoint_" + unit)
						if (endpoint) {
							endpoint.setAttribute("x",end_x)
							endpoint.setAttribute("y",end_y)
							if (endpoint.parentElement) {
								endpoint.parentElement.removeChild(endpoint)
								robot.appendChild(endpoint)
							}
						}

						setTimeout(function() {
							var cell = document.querySelector(".underGrid_cell[path='" + unit + "']:not(.underGrid_collector)")
							if (cell) {
								cell.setAttribute("color","")
							}
							var cell = document.querySelector(".underGrid_cell[path='" + unit + "']")
							if (cell) {
								cell.setAttribute("from","")
								cell.setAttribute("to","")
								cell.setAttribute("path","")
							}
							robot.remove()
						},2000)
					}

				//illegal move?
					else if (!isEmptyOverGrid(color,end_x,end_y)) {
						//stop game
							clearInterval(timer)
							window.playing = false
							document.querySelector("#pause").className = document.querySelector("#pause").className.replace(/\s?playing/, "")
							document.querySelector("#pause").className += " reset"
							document.querySelector("#pause").innerHTML = svg.reset

						//remove line
							var endpoint = document.querySelector("#endpoint_" + unit)
								endpoint.setAttribute("x",end_x)
								endpoint.setAttribute("y",end_y)
							if (endpoint.parentElement) {
								endpoint.parentElement.removeChild(endpoint)
								robot.appendChild(endpoint)
							}
							var cell = document.querySelector(".underGrid_cell[path='" + unit + "']:not(.underGrid_collector)")
							if (cell) {
								cell.setAttribute("color","")
							}
							var cell = document.querySelector(".underGrid_cell[path='" + unit + "']")
							if (cell) {
								cell.setAttribute("from","")
								cell.setAttribute("to","")
								cell.setAttribute("path","")
							}

						//animate robot
							robot.setAttribute("x",end_x)
							robot.setAttribute("y",end_y)
							robot.style.top = (end_y * 10 + "%")
							robot.style.left = (end_x * 10 + "%")

							var flashCount = 0
							var flash = setInterval(function() {
								if (flashCount % 2 === 0) {
									robot.style.backgroundColor = "#ffffff"
								}
								else {
									robot.style.backgroundColor = "#333333"
								}
								flashCount++

								if (flashCount > 9) {
									robot.className += " online"
									clearInterval(flash)
								}
							},100)
					}
					else {
						//animate robot
							robot.setAttribute("x",end_x)
							robot.setAttribute("y",end_y)
							robot.style.top = (end_y * 10 + "%")
							robot.style.left = (end_x * 10 + "%")

						//remove line
							setTimeout(function() {
								var cells = Array.from(document.querySelectorAll("#underGrid_cell_" + color + "_" + start_x + "_" + start_y + ":not(.underGrid_collector)"))
									cells.forEach(function(el) {
										el.setAttribute("color","")
									})
								var cell = document.querySelector("#underGrid_cell_" + color + "_" + start_x + "_" + start_y)
								if (cell) {
									cell.setAttribute("from","")
									cell.setAttribute("to","")
									cell.setAttribute("path","")
								}
							},750)

							setTimeout(function() {
								var cell = document.querySelector("#underGrid_cell_" + color + "_" + end_x + "_" + end_y)
								if (cell) {
									cell.setAttribute("path",unit)
									cell.setAttribute("color",color)
									cell.setAttribute("from","center")
								}
							},1250)

						//online?
							if (Number(document.querySelector("#underGrid_cell_" + color + "_" + end_x + "_" + end_y).getAttribute("path")) === unit) {
								robot.className += " online"
							}
							else {
								robot.className = robot.className.replace(/\s?online/, "")
								var endpoint = document.querySelector("#endpoint_" + unit)
									endpoint.setAttribute("x",end_x)
									endpoint.setAttribute("y",end_y)
								if (endpoint.parentElement) {
									endpoint.parentElement.removeChild(endpoint)
									robot.appendChild(endpoint)
								}
								var cell = document.querySelector("#underGrid_cell[path='" + unit + "']")
								if (cell) {
									cell.setAttribute("from","")
									cell.setAttribute("to","")
									cell.setAttribute("path","")
								}
							}

						//hijacking a path?
							if (document.querySelector("#underGrid_cell_" + color + "_" + end_x + "_" + end_y) && (Number(document.querySelector("#underGrid_cell_" + color + "_" + end_x + "_" + end_y).getAttribute("path")) !== unit) && !document.querySelector("#underGrid_cell_" + color + "_" + end_x + "_" + end_y).className.includes("underGrid_collector")) {
								//get info on path
									var path = Number(document.querySelector("#underGrid_cell_" + color + "_" + end_x + "_" + end_y).getAttribute("path"))
									var path_endpoint = document.querySelector("#endpoint_" + path)
									if (!path_endpoint) { return }
										if (path_endpoint.parentElement) {
											path_endpoint.parentElement.removeChild(path_endpoint)
										}
									var path_endpoint_x = Number(path_endpoint.getAttribute("x"))
									var path_endpoint_y = Number(path_endpoint.getAttribute("y"))
								
								//move this robot's endpoint to the hijack spot
									var endpoint = document.querySelector("#endpoint_" + unit)
									if (!endpoint) { return }
										endpoint.setAttribute("x",path_endpoint_x)
										endpoint.setAttribute("y",path_endpoint_y)
									if (endpoint.parentElement) {
										endpoint.parentElement.removeChild(endpoint)
									}
									if (document.querySelector("#overGrid_cell_" + path_endpoint_x + "_" + path_endpoint_y + " .collector")) {
										document.querySelector("#overGrid_cell_" + path_endpoint_x + "_" + path_endpoint_y + " .collector").appendChild(endpoint)
									}
									else {
										document.querySelector("#overGrid_cell_" + path_endpoint_x + "_" + path_endpoint_y).appendChild(endpoint)
									}

								//move hijacked path's endpoint to previous spot
									var from = document.querySelector("#underGrid_cell_" + color + "_" + end_x + "_" + end_y).getAttribute("from")
									var coordinates = pathFrom(from, end_x, end_y)
									var previous_x = coordinates[0]
									var previous_y = coordinates[1]

									path_endpoint.setAttribute("x",previous_x)
									path_endpoint.setAttribute("y",previous_y)

									if (document.querySelector("#overGrid_cell_" + previous_x + "_" + previous_y + " .collector")) {
										document.querySelector("#overGrid_cell_" + previous_x + "_" + previous_y + " .collector").appendChild(path_endpoint)
									}
									else {
										document.querySelector("#overGrid_cell_" + previous_x + "_" + previous_y).appendChild(path_endpoint)
										document.querySelector("#underGrid_cell_" + color + "_" + previous_x + "_" + previous_y).setAttribute("to","center")
									}

								//eliminate this robot's other path components
									var cells = Array.from(document.querySelectorAll(".underGrid_cell[path='" + unit + "']"))
									cells.forEach(function(el) {
										el.setAttribute("path","")
										el.setAttribute("from","")
										el.setAttribute("to","")
									})

								//fix clip-path directions for start point and end point
									var hijackedTo = toFrom(start_x,start_y,end_x,end_y)[0]
									var hijackedFrom = toFrom(start_x,start_y,end_x,end_y)[1]
									document.querySelector("#underGrid_cell_" + color + "_" + end_x + "_" + end_y).setAttribute("from",hijackedFrom)
									var cell = document.querySelector("#underGrid_cell_" + color + "_" + start_x + "_" + start_y)
									if (cell) {
										cell.setAttribute("to",hijackedTo)
										cell.setAttribute("from","center")
										cell.setAttribute("path",unit)
									}

								//fix owner of endpoint path cell
									document.querySelector("#underGrid_cell_" + color + "_" + path_endpoint_x + "_" + path_endpoint_y).setAttribute("path",unit)
								
								//if there are additional path cells
									if (!((path_endpoint_x === end_x) && (path_endpoint_y === end_y))) {
										var uproot_x = path_endpoint_x
										var uproot_y = path_endpoint_y
										var uproot_from = document.querySelector("#underGrid_cell_" + color + "_" + uproot_x + "_" + uproot_y).getAttribute("from")
										var abort = 0
									
										while ((abort < 100) && !((uproot_x === end_x) && (uproot_y === end_y))) {
											var uproot_coordinates = pathFrom(uproot_from, uproot_x, uproot_y)
											var uproot_x = uproot_coordinates[0]
											var uproot_y = uproot_coordinates[1]

											document.querySelector("#underGrid_cell_" + color + "_" + uproot_x + "_" + uproot_y).setAttribute("path",unit)
											var uproot_from = document.querySelector("#underGrid_cell_" + color + "_" + uproot_x + "_" + uproot_y).getAttribute("from")
											abort++
										}
									}
							}

						//collector?
							if (document.querySelector("#overGrid_cell_" + end_x + "_" + end_y + " .collector[color='" + color + "']")) {
								window.score++
								document.querySelector("#scoreInner").innerText = window.score

								document.querySelector("#endpoint_" + unit).remove()
								var cell = document.querySelector(".underGrid_cell[path='" + unit + "']:not(.underGrid_collector):not([x='" + start_x + "'][y='" + start_y + "'])")
									if (cell) {
										cell.setAttribute("color","")
									}
								var cell = document.querySelector(".underGrid_cell[path='" + unit + "']:not([x='" + start_x + "'][y='" + start_y + "'])")
								if (cell) {
									cell.setAttribute("path","")
									cell.setAttribute("from","")
									cell.setAttribute("to","")
								}
								
								robot.setAttribute("direction","collected")
								robot.className += " collected"
								robot.style.border = "0"
								robot.style.opacity = "0"
								robot.style.width = "0"
								robot.style.height = "0"
								robot.style.top = (Number(robot.style.top.replace("%", "")) + 5) + "%"
								robot.style.left = (Number(robot.style.left.replace("%", "")) + 5) + "%"
								robot.style.margin = (Number(robot.style.margin.replace("px", "")) - 5) + "px"
							}
					}
			})
		}

	/* spawnRobots */
		function spawnRobots() {
			//parameters
				var colors = ["red","green","blue"]
				var possibleCells = [[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],
									[9,1],[9,2],[9,3],[9,4],[9,5],[9,6],[9,7],[9,8],
									[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],
									[1,9],[2,9],[3,9],[4,9],[5,9],[6,9],[7,9],[8,9]]
			
			//botLimit
				if (window.score < 5) {
					var botLimit = 3
				}
				else if (window.score < 10) {
					var botLimit = 4
				}
				else if (window.score < 15) {
					var botLimit = 5
				}
				else if (window.score < 20) {
					var botLimit = 6
				}
				else if (window.score < 25) {
					var botLimit = 7
				}
				else {
					var botLimit = 8
				}

			//botCount
				var botCount = Array.from(document.querySelectorAll(".robot")).length

				if ((!botCount) || (typeof botCount === "undefined")) {
					botCount = 0
				}

			//createBots
				if (botCount < botLimit) {
					var color = colors[Math.floor(Math.random() * colors.length)]
					var attempt = 0
					
					do {
						do {
							var cell = possibleCells[Math.floor(Math.random() * possibleCells.length)]
							var x = cell[0]
							var y = cell[1]
							attempt++

							if (x === 0) {
								var direction = "right"
							}
							else if (x === 9) {
								var direction = "left"
							}
							else if (y === 0) {
								var direction = "bottom"
							}
							else if (y === 9) {
								var direction = "top"
							}
						}
						while (!isEmptyOverGrid(color,x,y) && (!isEmptyOverGrid(color,x - 1,y) || direction === "right") && (!isEmptyOverGrid(color,x + 1,y) || direction === "left") && (!isEmptyOverGrid(color,x,y - 1) || direction === "bottom") && (!isEmptyOverGrid(color,x,y + 1) || direction === "top") && (attempt < 9))
					}
					while (Array.from(document.querySelectorAll(".robot[x='" + x + "'][y='" + y + "']")).length)

					if (attempt < 10) {
						var robots = Array.from(document.querySelectorAll(".robot"))
						if (robots && robots.length) {
							var lastRobot = Number(robots[robots.length - 1].id.replace("robot_",""))
						}
						else {
							lastRobot = 0
						}
						
						var newRobot = lastRobot + 1

						if (!newRobot) {
							newRobot = 1
						}

						var pre_coordinates = pathTo(direction,x,y)
						var pre_x = pre_coordinates[0]
						var pre_y = pre_coordinates[1]
						
						var robot = document.createElement("div")
							robot.id = "robot_" + newRobot
							robot.className = "robot"
							robot.setAttribute("color", color)
							robot.setAttribute("x", pre_x)
							robot.setAttribute("y", pre_y)
							robot.setAttribute("direction", direction)
							robot.style.top = (pre_y * 10) + "%"
							robot.style.left = (pre_x * 10) + "%"
							robot.addEventListener(on.mousedown, mousedownRobot)
						document.querySelector("#overGrid").appendChild(robot)

						var endpoint = document.createElement("div")
							endpoint.id = "endpoint_" + newRobot
							endpoint.className = "endpoint"
							endpoint.setAttribute("color", color)
							endpoint.setAttribute("x", pre_x)
							endpoint.setAttribute("y", pre_y)
							endpoint.addEventListener(on.mousedown, mousedownEndpoint)
						robot.appendChild(endpoint)
					}
				}
		}
