window.onload = function() {

	/*** interaction ***/
		/* submitForm */
			document.getElementById("form").addEventListener("submit", submitForm)
			function submitForm() {
				if (!document.getElementById("submit").getAttribute("loading")) {
					document.getElementById("submit").setAttribute("loading", true)

					setTimeout(function() {
						// get diagonal, get & trim words
							var diagonal = document.getElementById("diagonal").checked || false
							var words = document.getElementById("words").value.split(/,\s+|,\n+|,|\s+|\n/gi)
							for (var w in words) {
								words[w] = words[w].trim()
							}

						// web workers
							if (typeof(workers) == "undefined") {
								workers = new Worker("workers.js")

								workers.onmessage = function(event) {
									// get boards & kill workers
										workers.terminate()
										workers = undefined
										results = event.data
										results = results.slice(0, 10000) || []

									// display count
										document.getElementById("index").innerText = (results.length ? 1 : 0)
										document.getElementById("total").innerText = results.length

									// display boards (fill?)
										if (results.length) {
											drawBoard(0)
										}
										else {
											document.getElementById("viewer").innerHTML = ""
										}

									// stop animating the button
										document.getElementById("submit").removeAttribute("loading")
								}

								workers.postMessage({words: words, diagonal: diagonal})
							}
					}, 0)
				}
			}

	/*** depicting grid ***/
		/* getRandom */
			function getRandom() {
				var set = "abcdefghijklmnopqrstuvwxyz"
				return set[Math.floor(Math.random() * 26)]
			}

		/* drawBoard */
			function drawBoard(index) {
				var board = results[index]
				var fill  = document.getElementById("fill").checked || false
				document.getElementById("viewer").innerHTML = ""
				
				// x and y
					var minX = 0
					var maxX = 0
					var minY = 0
					var maxY = 0

					for (var cell in board) {
						if (cell !== "words") {
							var x = Number(cell.split(",")[0])
							var y = Number(cell.split(",")[1])

							if (x < minX) {
								minX = x
							}
							if (x > maxX) {
								maxX = x
							}
							if (y < minY) {
								minY = y
							}
							if (y > maxY) {
								maxY = y
							}
						}
					}

				// build text
					var text = ""
					for (var y = minY; y <= maxY; y++) {
						for (var x = minX; x <= maxX; x++) {
							text += (board[x + "," + y] ? ("<span class='letter'>" + board[x + "," + y] + "</span>") : ("<span class='fill'" + (fill ? ' visible' : '') + ">" + getRandom() + "</span>"))
						}
						text += "<br>"
					}

				// display
					var grid = document.createElement("div")
						grid.className = "board"
						grid.id = "_" + index
						grid.innerHTML = text
					document.getElementById("viewer").appendChild(grid)

				// set index
					document.getElementById("index").innerText = index + 1
			}

		/* displayPrevious */
			document.getElementById("left").addEventListener("click", displayPrevious)
			function displayPrevious() {
				// get current
					var current = Number(document.querySelector(".board").id.replace("_", ""))

				// get previous
					if (current == 0) {
						var previous = results.length - 1
					}
					else {
						var previous = current - 1
					}

				// draw previous
					drawBoard(previous)
			}

		/* displayNext */
			document.getElementById("right").addEventListener("click", displayNext)
			function displayNext() {
				// get current
					var current = Number(document.querySelector(".board").id.replace("_", ""))

				// get next
					if (current == results.length - 1) {
						var next = 0
					}
					else {
						var next = current + 1
					}

				// draw next
					drawBoard(next)
			}

		/* toggleFill */
			document.getElementById("fill").addEventListener("change", toggleFill)
			function toggleFill() {
				if (document.getElementById("fill").checked) {
					Array.from(document.querySelectorAll(".fill")).forEach(function(letter) {
						letter.setAttribute("visible", true)
					})
				}
				else {
					Array.from(document.querySelectorAll(".fill")).forEach(function(letter) {
						letter.removeAttribute("visible")
					})
				}
			}
}