window.onload = function() {

	/* on load */
		/* triggers */
			if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
				var on = { click: "touchstart", mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" }
			}
			else {
				var on = { click:      "click", mousedown:  "mousedown", mousemove: "mousemove", mouseup:  "mouseup" }
			}

		/* create page */
			var colors = ["blue","red","green","yellow","magenta","cyan","black"]
			newPuzzle()

	/* actions */
		/* changeColor */
			function changeColor(event) {
				var button = event.target
				if (button.className.includes("active")) {
					button.className = button.className.replace(/\s?active/, "")
				}
				else {
					Array.from(document.querySelectorAll(".button")).forEach(function(element) {
						element.className = element.className.replace(/\s?active/, "")
					})
					button.className += " active"
				}
			}

		/* floodArea */
			function floodArea(event) {
				var cell = event.target
				var activeColor = document.querySelector(".button.active").getAttribute("value")

				if ((activeColor !== undefined) && (!cell.className.includes(activeColor))) {
					/* identify starting area and areaColor */
						var areaColor = cell.getAttribute("value")
						var area = [String(cell.id)]

					/* identify floodable area */
						for (i = 0; i < area.length; i++) {
							var row = Number(area[i].substring(area[i].indexOf("row_") + 4, area[i].indexOf("_column_")))
							var column = Number(area[i].substring(area[i].indexOf("column_") + 7, area[i].length))

							if (document.querySelector("#row_" + (row + 1) + "_column_" + column) && document.querySelector("#row_" + (row + 1) + "_column_" + column).className.includes(areaColor) && !(area.indexOf("row_" + (row + 1) + "_column_" + column) > -1)) {
								area.push("row_" + (row + 1) + "_column_" + column)
							}

							if (document.querySelector("#row_" + (row - 1) + "_column_" + column) && document.querySelector("#row_" + (row - 1) + "_column_" + column).className.includes(areaColor) && !(area.indexOf("row_" + (row - 1) + "_column_" + column) > -1)) {
								area.push("row_" + (row - 1) + "_column_" + column)
							}

							if (document.querySelector("#row_" + row + "_column_" + (column + 1)) && document.querySelector("#row_" + row + "_column_" + (column + 1)).className.includes(areaColor) && !(area.indexOf("row_" + row + "_column_" + (column + 1)) > -1)) {
								area.push("row_" + row + "_column_" + (column + 1))
							}

							if (document.querySelector("#row_" + row + "_column_" + (column - 1)) && document.querySelector("#row_" + row + "_column_" + (column - 1)).className.includes(areaColor) && !(area.indexOf("row_" + row + "_column_" + (column - 1)) > -1)) {
								area.push("row_" + row + "_column_" + (column - 1))
							}
						}

					/* flood area with activeColor */
						for (i = 0; i < area.length; i++) {
							document.querySelector("#" + area[i]).className = document.querySelector("#" + area[i]).className.replace(areaColor, "") + activeColor
							document.querySelector("#" + area[i]).setAttribute("value", activeColor)
						}

					/* update counter */
						var counter = Number(document.querySelector("#counterInner").innerText)
						if (!(counter > 0)) {
							counter = 0
						}
						document.querySelector("#counterInner").innerText = (counter + 1)

					/* victory? */
						var victory = false
						var i = 0
						while ((!victory) && (i < colors.length)) {
							cellsArray = Array.from(document.querySelectorAll(".cell." + colors[i]))
							if (cellsArray.length === Number(totalRows * totalColumns)) {
								victory = true
							}
							i++
						}

						if (victory) {
							document.querySelector("#victory").removeAttribute("invisible")
							document.querySelector("#puzzle").className = activeColor
						}
				}
			}

		/* newPuzzle */
			document.querySelector("#refreshOuter").addEventListener(on.click, newPuzzle)
			function newPuzzle() {
				document.querySelector("#puzzle").className = ""
				document.querySelector("#victory").setAttribute("invisible", true)

				if (document.querySelector("#newColorCount") && document.querySelector("#newGridCount")) {
					var newColorCount = Number(document.querySelector("#newColorCount").value)
					var newGridCount = Number(document.querySelector("#newGridCount").value)
				}

				if ((!(newColorCount > 1)) || (!(newColorCount < 8))) {
					window.colorCount = 3
				}
				else {
					window.colorCount = newColorCount
				}

				if ((!(newGridCount > 1)) || (!(newGridCount < 26))) {
					window.totalColumns = 5
					window.totalRows = 5
				}
				else {
					window.totalColumns = newGridCount
					window.totalRows = newGridCount
				}

				makePuzzle(window.totalColumns, window.totalRows, window.colorCount)
				makeButtons(window.colorCount)
			}

	/* functions */
		/* randomColor */
			function randomColor(colorCount) {
				var number = Math.floor(Math.random() * colorCount)
				return colors[number]
			}

		/* makePuzzle */
			function makePuzzle(totalColumns, totalRows, colorCount) {
				document.querySelector("#puzzle").innerHTML = ""

				for (row = 0; row < totalRows; row++) {
					var rowElement = document.createElement("div")
						rowElement.id = "row_" + row
						rowElement.className = "row"
						rowElement.style.height = (100 / totalRows) + "%"
					document.querySelector("#puzzle").appendChild(rowElement)
					
					for (column = 0; column < totalColumns; column++) {
						var color = randomColor(colorCount)
						var cellElement = document.createElement("div")
							cellElement.id = "row_" + row + "_column_" + column
							cellElement.className = "cell " + color
							cellElement.style.width = (100 / totalColumns) + "%"
							cellElement.setAttribute("value", color)
							cellElement.addEventListener(on.click, floodArea)
						rowElement.appendChild(cellElement)
					}
				}
			}

		/* makeButtons */
			function makeButtons(colorCount) {
				document.querySelector("#buttons").innerHTML = ("<div id='counterOuter'>\
					<span id='counterInner'>?</span>\
				</div>")

				for (i = 0; i < colorCount; i++) {
					var button = document.createElement("div")
						button.id = "button_" + colors[i]
						button.className = "button " + colors[i]
						button.setAttribute("value", colors[i])
						button.addEventListener(on.click, changeColor)
						if (!i) { button.className += " active" }
					document.querySelector("#buttons").appendChild(button)
				}
			}
}