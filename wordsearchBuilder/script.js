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
										var results = event.data

									// display count
										var count = Math.max(0, Math.min(10000, results.length)) || 0
										document.getElementById("count").innerText = (count ? 1 : 0) + " / " + (count == 10000 ? "10000+" : count) + " results"

									// display boards (fill?)
										if (count) {
											document.getElementById("viewer").innerHTML = ""
											
											var fill = document.getElementById("fill").checked || false				
											for (var r in results) {
												drawBoard(results[r], fill)
											}

											displayNext()
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
			function drawBoard(board, fill) {
				if (!board.words.length) { // complete boards only
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
								text += board[x + "," + y] || (fill ? getRandom() : " ")
							}
							text += "\n"
						}

					// display
						var pre = document.createElement("pre")
							pre.className = "board"
							pre.innerText = text
						document.getElementById("viewer").appendChild(pre)
				}
			}

		/* displayPrevious */
			document.getElementById("left").addEventListener("click", displayPrevious)
			function displayPrevious() {
				var visible = document.querySelector(".board[visible]") || null

				// get previous
					if (visible) {
						var previous = visible.previousSibling || visible.parentNode.lastChild || null
						var text = document.getElementById("count").innerText
						var total = Number(text.slice(text.indexOf(" / ") + 3).replace(" results", "").replace("+", ""))
							index = Number(text.slice(0, text.indexOf(" / ")))
							index = index > 1 ? index - 1 : total
					}

				// set previous or last
					if (previous) {
						visible.removeAttribute("visible")
						previous.setAttribute("visible", true)
						document.getElementById("count").innerText = index + " / " + total + " results"
					}
					else if (document.getElementById("viewer").lastChild) {
						document.getElementById("viewer").lastChild.setAttribute("visible", true)
					}
			}

		/* displayNext */
			document.getElementById("right").addEventListener("click", displayNext)
			function displayNext() {
				var visible = document.querySelector(".board[visible]") || null

				// get next
					if (visible) {
						var next = visible.nextSibling || visible.parentNode.firstChild || null
						var text = document.getElementById("count").innerText
						var total = Number(text.slice(text.indexOf(" / ") + 3).replace(" results", "").replace("+", ""))
							index = Number(text.slice(0, text.indexOf(" / ")))
							index = (index < total) ? index + 1 : 1
					}

				// set next or first
					if (next) {
						visible.removeAttribute("visible")
						next.setAttribute("visible", true)
						document.getElementById("count").innerText = index + " / " + total + " results"
					}
					else if (document.getElementById("viewer").firstChild) {
						document.getElementById("viewer").firstChild.setAttribute("visible", true)
					}
			}
}