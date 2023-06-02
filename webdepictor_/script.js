window.onload = function() {
	
	/* triggers */
		if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
			var on = { click: "touchstart", mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" }
		}
		else {
			var on = { click:      "click", mousedown:  "mousedown", mousemove: "mousemove", mouseup:  "mouseup" }
		}

	/* globals */
		window.data = []
		window.looping = false

	/* updateWeb */
		window.updateWeb = function() {
			window.looping = false
			if (typeof window.pushTimeout !== "undefined") { clearInterval(window.pushTimeout) }
			if (typeof window.pullTimeout !== "undefined") { clearInterval(window.pullTimeout) }

			if (document.querySelector("#circles")) {
				document.querySelector("#circles").remove()
			}
			document.querySelector("#lines").innerHTML = ""
			document.querySelector("#lines").style.opacity = 0
			document.querySelector("#pause").style.display = "none"
			document.querySelector("#play").style.display = "inline-block"

			/* data */
				window.data = []
				Array.from(document.querySelectorAll(".row")).forEach(function(row) {
					var name = row.querySelector("input.name").value || null
					var points_to = row.querySelector("input.points_to").value || ""

					if (name) {
						points_to = points_to.split(",") || []
						for (x in points_to) {
							points_to[x] = points_to[x].trim()
						}
						window.data.push({name: name, to: points_to})
					}
				})

			/* connections */
				for (i in window.data) {
					if (!window.data[i].connections) {
						window.data[i].connections = 1
					}
					else {
						window.data[i].connections++
					}

					for (j in window.data[i].to) {
						var target = window.data.find(function (x) {
							return x.name == window.data[i].to[j]
						})

						if (target) {
							if (!target.connections) {
								target.connections = 1
							}
							else {
								target.connections++
							}
						}
					}
				}

			/* maximum */
				var maximum = 1
				for (i in window.data) {
					if (window.data[i].connections > maximum) {
						maximum = window.data[i].connections
					}
				}

			/* circles */
				var circles = document.createElement("div")
					circles.id = "circles"
				document.body.appendChild(circles)

				var arc = 2 * Math.PI / window.data.length
			
				for (i in window.data) {
					var distance = 10 + (((maximum - window.data[i].connections) / maximum) * 40)

					window.data[i].y = (1 * Math.sin(i * arc))
					window.data[i].x = (1 * Math.cos(i * arc))

					var newCircle = document.createElement("div")
						newCircle.className = "circle"
						newCircle.title = window.data[i].name
						newCircle.setAttribute("name", window.data[i].name)
						newCircle.style.top = (window.data[i].y - 25) + "px"
						newCircle.style.left = (window.data[i].x - 25) + "px"
						newCircle.innerHTML = "<div>" + window.data[i].name + "</div>"
						newCircle.addEventListener(on.click, clickCircle)
					circles.appendChild(newCircle)
				}
		}

	/* pushpullLoop */
		window.pushpullLoop = setInterval(function() {
			if (window.looping) {		
				/* push gravity */
					window.pushTimeout = setTimeout(function() {
						Array.from(document.querySelectorAll(".circle")).forEach(function(circle) {
							var circle_top  = Number(circle.style.top.replace("px",""))
							var circle_left = Number(circle.style.left.replace("px",""))
							var circle_name = circle.getAttribute("name")

							var to = window.data.find(function(x) {
								return x.name == circle_name
							}).to

							var nontargets = window.data.filter(function(x) {
								return ((to.indexOf(x.name) == -1) && (x.name !== circle_name))
							})

							for (var i in nontargets) {
								var nontarget_top  = Number(document.querySelector(".circle[name='" + nontargets[i].name + "']").style.top.replace("px",""))
								var nontarget_left = Number(document.querySelector(".circle[name='" + nontargets[i].name + "']").style.left.replace("px",""))

								var x = nontarget_left - circle_left
								var y = nontarget_top - circle_top
								var h = Math.pow((Math.pow(x,2) + Math.pow(y,2)),0.5)

								var circle_z = (300 / window.data.length) / to.length
								var nontarget_z = (300 / window.data.length) / nontargets[i].to.length

								var circle_x = (x * circle_z / h)
								var circle_y = (y * circle_z / h)
								var nontarget_x = (x * nontarget_z / h)
								var nontarget_y = (y * nontarget_z / h)

								//checks
									var thisCircle = document.querySelector(".circle[name='" + circle_name + "']")

									var window_height = window.innerHeight
									var window_width  = window.innerWidth
									var y_from_center = circle_top - circle_y
									var x_from_center = circle_left - circle_x

									if (y_from_center > ((window_height / 2) - 50)) {
										circle_y = ((window_height / 2) - 50)
									}
									else if (y_from_center < ((window_height / -2))) {
										circle_y = ((window_height / -2))
									}
									else {
										circle_y = Number(thisCircle.style.top.replace("px", "")) - circle_y
									}

									if (x_from_center > ((window_width / 2) - 50)) {
										circle_x = ((window_width / 2) - 50)
									}
									else if (x_from_center < ((window_width / -2))) {
										circle_x = ((window_width / -2))
									}
									else {
										circle_x = Number(thisCircle.style.left.replace("px", "")) - circle_x
									}

									thisCircle.style.top = circle_y + "px"
									thisCircle.style.left = circle_x + "px"

								//checks
									var thatCircle = document.querySelector(".circle[name='" + nontargets[i].name + "']")

									var y_from_center = nontarget_top + nontarget_y
									var x_from_center = nontarget_left + nontarget_x

									if (y_from_center > ((window_height / 2) - 50)) {
										nontarget_y = ((window_height / 2) - 50)
									}
									else if (y_from_center < ((window_height / -2))) {
										nontarget_y = ((window_height / -2))
									}
									else {
										nontarget_y = Number(thatCircle.style.top.replace("px", "")) + nontarget_y
									}

									if (x_from_center > ((window_width / 2) - 50)) {
										nontarget_x = ((window_width / 2) - 50)
									}
									else if (x_from_center < ((window_width / -2))) {
										nontarget_x = ((window_width / -2))
									}
									else {
										nontarget_x = Number(thatCircle.style.left.replace("px", "")) + nontarget_x
									}

									thatCircle.style.top = nontarget_y + "px"
									thatCircle.style.left = nontarget_x + "px"
							}
						})
					}, 0)

				/* pull gravity */
					window.pullTimeout = setTimeout(function() {
						Array.from(document.querySelectorAll(".circle")).forEach(function(circle) {
							var circle_top  = Number(circle.style.top.replace("px",""))
							var circle_left = Number(circle.style.left.replace("px",""))
							var circle_name = circle.getAttribute("name")

							var to = window.data.find(function(x) {
								return x.name == circle_name
							}).to

							var targets = window.data.filter(function(x) {
								return to.indexOf(x.name) !== -1
							})

							for (i in targets) {
								var target_top  = Number(document.querySelector(".circle[name='" + targets[i].name + "']").style.top.replace("px",""))
								var target_left = Number(document.querySelector(".circle[name='" + targets[i].name + "']").style.left.replace("px",""))

								var x = target_left - circle_left
								var y = target_top - circle_top
								var h = Math.pow((Math.pow(x,2) + Math.pow(y,2)),0.5)

								var circle_z = (100 / window.data.length) / to.length
								var target_z = (100 / window.data.length) / targets[i].to.length

								var circle_x = (x * circle_z / h)
								var circle_y = (y * circle_z / h)
								var target_x = (x * target_z / h)
								var target_y = (y * target_z / h)

								var thisCircle = document.querySelector(".circle[name='" + circle_name + "']")
									thisCircle.style.top  = (Number( thisCircle.style.top.replace("px", "")) + circle_y) + "px"
									thisCircle.style.left = (Number(thisCircle.style.left.replace("px", "")) + circle_x) + "px"

								var thatCircle = document.querySelector(".circle[name='" + targets[i].name + "']")
									thatCircle.style.top  = (Number( thatCircle.style.top.replace("px", "")) + target_y) + "px"
									thatCircle.style.left = (Number(thatCircle.style.left.replace("px", "")) + target_x) + "px"
							}
						})
					}, 500)
			}
		}, 1000)

	/* lines */
		window.makeLines = function() {
			window.lineTimeout = setTimeout(function() {
				var lines = document.querySelector("#lines")
				var window_height = window.innerHeight
				var window_width  = window.innerWidth
				
				Array.from(document.querySelectorAll(".circle")).forEach(function(circle) {
					var circle_top  = Number(circle.style.top.replace("px",""))
					var circle_left = Number(circle.style.left.replace("px",""))
					var circle_name = circle.getAttribute("name")

					var to = window.data.find(function(x) {
						return x.name === circle_name
					}).to

					for (j in to) {
						var target = window.data.find(function (x) {
							return x.name == to[j]
						})

						if (target) {
							var target_top  = Number(document.querySelector(".circle[name='" + target.name + "']").style.top.replace("px",""))
							var target_left = Number(document.querySelector(".circle[name='" + target.name + "']").style.left.replace("px",""))

							var line = "<line class='line' " +
								"x1='" + (((circle_left + 25) * 100 / window_width) + 50) + "' " +
								"y1='" + (((circle_top + 25) * 100 / window_height) + 50) + "' " +
								"x2='" + (((target_left + 25) * 100 / window_width) + 50) + "' " +
								"y2='" + (((target_top + 25) * 100 / window_height) + 50) + "' " +
								"from='" + circle_name + "' " +
								"to='" + target.name + "'" +
								"></line>"
							lines.innerHTML += line
						}
					}
				})

				lines.style.opacity = 1
			}, 500)
		}

	/* listeners */
		/* circle */
			function clickCircle(event) {
				if (!window.looping) {
					var circle = event.target.closest(".circle")
					var allCircles = Array.from(document.querySelectorAll(".circle"))
					var allLines = Array.from(document.querySelectorAll(".line"))

					var selecting = false
					if (!circle.className.includes("center")) {
						selecting = true
					}

					allCircles.forEach(function(el) {
						el.className = el.className.replace(/\s?active/,"").replace(/\s?from/,"").replace(/\s?to/,"").replace(/\s?center/,"")
					})
					allLines.forEach(function(el) {
						el.setAttribute("from_active", "false")
						el.setAttribute("to_active", "false")
					})

					if (selecting) {
						circle.className += " active center"
						var name = circle.getAttribute("name")

						Array.from(document.querySelectorAll("line[from='" + name + "']")).forEach(function(el) {
							el.setAttribute("to_active", "true")
							document.querySelector(".circle[name='" + el.getAttribute("to") + "']").className += " active to"
						})

						Array.from(document.querySelectorAll("line[to='" + name + "']")).forEach(function(el) {
							el.setAttribute("from_active", "true")
							document.querySelector(".circle[name='" + el.getAttribute("from") + "']").className += " active from"
						})
					}
				}
			}

		/* toggle */
			document.querySelector("#toggle").addEventListener(on.click, function() {
				if (document.querySelector("#overlay").style.display == "none") {
					document.querySelector("#overlay").style.display = "block"
					document.querySelector("#edit").style.display = "none"
					document.querySelector("#refresh").style.display = "block"
					window.looping = false
				}
				else {
					document.querySelector("#overlay").style.display = "none"
					document.querySelector("#refresh").style.display = "none"
					document.querySelector("#edit").style.display = "inline-block"
					window.updateWeb()
				}
			})

		/* addRow */
			document.querySelector("#addRow").addEventListener(on.click, function() {
				var row = document.createElement("div")
					row.className = "row"
				document.querySelector("#rows").appendChild(row)

				var input = document.createElement("input")
					input.type = "text"
					input.className = "name"
					input.placeholder = "name"
				row.appendChild(input)

				var input2 = document.createElement("input")
					input2.tyle = "text"
					input2.className = "points_to"
					input2.placeholder = "points to..."
				row.appendChild(input2)

				var remove = document.createElement("div")
					remove.className = "removeRow"
					remove.innerHTML = "<span class='glyphicon glyphicon-remove'></span>"
					remove.addEventListener(on.click, removeRow)
				row.appendChild(remove)
			})

		/* removeRow */
			function removeRow(event) {
				var button = event.target
				var name = button.closest(".row").querySelector("input.name").value

				window.data = window.data.filter(function(x) {
					return x.name !== name
				})

				button.closest(".row").remove()
			}

		/* makeLines */
			document.querySelector("#playpause").addEventListener(on.click, function() {
				if (document.querySelector("#play").style.display == "none") { //clicking pause
					document.querySelector("#play").style.display = "inline-block"
					document.querySelector("#pause").style.display = "none"

					window.looping = false
					if (typeof window.pushTimeout !== "undefined") { clearInterval(window.pushTimeout) }
					if (typeof window.pullTimeout !== "undefined") { clearInterval(window.pullTimeout) }
					if (typeof window.lineTimeout !== "undefined") { clearInterval(window.lineTimeout) }

					window.makeLines()
				}
				else { //clicking play
					document.querySelector("#pause").style.display = "inline-block"
					document.querySelector("#play").style.display = "none"
					if (typeof window.lineTimeout !== "undefined") { clearInterval(window.lineTimeout) }
					document.querySelector("#lines").style.opacity = 0
					setTimeout(function() {
						document.querySelector("#lines").innerHTML = ""
					}, 500)
					window.looping = true
				}
			})
}
