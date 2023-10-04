/* triggers */
	if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
		var on = { click: "touchstart", mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" }
	}
	else {
		var on = { click:      "click", mousedown:  "mousedown", mousemove: "mousemove", mouseup:  "mouseup" }
	}

/* set up */
	window.painting = false
	window.colors = ["black"]
	window.erasing = false

	var windowHeight = Math.floor(Number(window.innerHeight) / 10)
	var windowWidth = Math.floor(Number(window.innerWidth) / 10)
	var whiteboard = document.querySelector("#whiteboard")

	for (y = 0; y < windowHeight; y++) {
		var row = document.createElement("row")
			row.className = "row"
		whiteboard.appendChild(row)
		
		for (x = 0; x < windowWidth; x++) {
			var cell = document.createElement("span")
				cell.className = "cell"
				cell.addEventListener(on.mousedown, startPainting)
				cell.addEventListener("mouseenter", keepPainting)
			row.appendChild(cell)
		}
	}

/* paint */
	document.addEventListener(on.mouseup, stopPainting)
	function stopPainting(event) {
		window.painting = false
	}

	function startPainting(event) {
		window.painting = true

		if (window.erasing) {
			event.target.className = "cell"
		}
		else {
			event.target.className = "cell painted " + (window.colors[window.colors.length - 1] || "black")
		}
	}

	function keepPainting(event) {
		if (window.painting) {
			if (window.erasing) {
				event.target.className = "cell"
			}
			else {
				event.target.className = "cell painted " + (window.colors[window.colors.length - 1] || "black")
			}
		}
	}

/* colors */
	window.addEventListener("keydown", pressKey)
	function pressKey(event) {
		switch (event.which) {
			case 82:
				if (window.colors.indexOf("red") == -1) {
					window.colors.push("red")
				}
			break
			case 79:
				if (window.colors.indexOf("orange") == -1) {
					window.colors.push("orange")
				}
			break
			case 89:
				if (window.colors.indexOf("yellow") == -1) {
					window.colors.push("yellow")
				}
			break
			case 71:
				if (window.colors.indexOf("green") == -1) {
					window.colors.push("green")
				}
			break
			case 66:
				if (window.colors.indexOf("blue") == -1) {
					window.colors.push("blue")
				}
			break
			case 80:
				if (window.colors.indexOf("purple") == -1) {
					window.colors.push("purple")
				}
			break
			case 67:
				if (window.colors.indexOf("cyan") == -1) {
					window.colors.push("cyan")
				}
			break
			case 77:
				if (window.colors.indexOf("magenta") == -1) {
					window.colors.push("magenta")
				}
			break
			case 75:
				if (window.colors.indexOf("black") == -1) {
					window.colors.push("black")
				}
			break
			case 87:
			case 32:
			case 16:
			case 18:
			case 17:
				window.erasing = true
				document.querySelector("#whiteboard").className += "erasing"
			break
		}
	}

	window.addEventListener("keyup", liftKey)
	function liftKey(event) {
		switch (event.which) {
			case 82:
				window.colors.splice(window.colors.indexOf("red"),1)
			break
			case 79:
				window.colors.splice(window.colors.indexOf("orange"),1)
			break
			case 89:
				window.colors.splice(window.colors.indexOf("yellow"),1)
			break
			case 71:
				window.colors.splice(window.colors.indexOf("green"),1)
			break
			case 66:
				window.colors.splice(window.colors.indexOf("blue"),1)
			break
			case 80:
				window.colors.splice(window.colors.indexOf("purple"),1)
			break
			case 67:
				window.colors.splice(window.colors.indexOf("cyan"),1)
			break
			case 77:
				window.colors.splice(window.colors.indexOf("magenta"),1)
			break
			case 75:
				window.colors.splice(window.colors.indexOf("black"),1)
			break
			case 87:
			case 32:
			case 16:
			case 18:
			case 17:
				window.erasing = false
				document.querySelector("#whiteboard").className = document.querySelector("#whiteboard").className.replace(/\s?erasing/, "")
			break
		}
	}

/* mobile */
	document.addEventListener("touchmove", function(event) {
		if (event.touches) {
			var col = Math.ceil(event.touches[0].clientX / 10)
			var row = Math.ceil(event.touches[0].clientY / 10)
			var cell = document.querySelector(".row:nth-child(" + row + ") .cell:nth-child(" + col + ")")
		}

		if (window.painting && cell) {
			if (window.erasing) {
				cell.className = "cell"
			}
			else {
				cell.className = "cell painted " + (window.colors[window.colors.length - 1] || "black")
			}
		}
	})

	document.querySelectorAll(".color").forEach(function(b) {
		b.addEventListener(on.click, setColor)
	})
	function setColor(event) {
		document.querySelectorAll(".color").forEach(function(b) {
			b.removeAttribute("selected")
		})
		event.target.setAttribute("selected", true)

		if (event.target.id == "white") {
			window.erasing = true
		}
		else {
			window.erasing = false
			window.colors = [event.target.id]
		}
	}
