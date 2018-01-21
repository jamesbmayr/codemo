window.onload = function() {
	/*** on load ***/
		/* globals */
			var apikey = "FKKGHK14DXGKONS4"
			var canvas = document.getElementById("chart")
			var data = null

		/* resizeCanvas */
			resizeCanvas()
			window.addEventListener("resize", resizeCanvas)
			function resizeCanvas() {
				canvas.height = window.innerHeight - 100
				canvas.width  = window.innerWidth - 40

				if (data) {
					handleRequest()
				}
			}

	/*** interaction ***/
		/* selectRecent */
			Array.from(document.querySelectorAll(".item")).forEach(function (i) { i.addEventListener("click", selectRecent) })
			function selectRecent(event) {
				if (event.target.className == "item") {
					var symbol = event.target.innerText
					document.getElementById("search").value = symbol

					fetchStock()
				}
			}

		/* fetchStock */
			document.getElementById("fetch").addEventListener("click", fetchStock)
			document.getElementById("search").addEventListener("keyup", function (event) { if (event.which == 13) { fetchStock() } })
			function fetchStock() {
				var symbol = document.getElementById("search").value.toUpperCase() || null

				if (symbol) {
					document.getElementById("spinner").className = ""
					var request = new XMLHttpRequest()
						request.addEventListener("load", handleRequest)
						request.open("GET", "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=" + symbol + "&apikey=" + apikey)
						request.send()
				}
			}

	/*** api & canvas ***/
		/* handleRequest */
			function handleRequest() {
				try {
					// get data
						if (this && this.responseText) {
							data = JSON.parse(this.responseText)
						}
						var dates = Object.keys(data["Monthly Time Series"])

					// save to recent
						var symbol = data["Meta Data"]["2. Symbol"]
						storeSymbol(symbol)

					// get prices
						var prices = []
						var i = 13
						while (i--) {
							prices.push({
								date: dates[i],
								close: Number(data["Monthly Time Series"][dates[i]]["4. close"])
							})
						}

					// draw prices
						drawPrices(prices)

					// update yoy
						var yoy = ((prices[prices.length - 1].close / prices[0].close) - 1)
							yoy = Math.round(yoy * 10000) / 100
						document.getElementById("yoy").innerText = yoy + "%"
						if (yoy - 5 > 0) {
							document.getElementById("yoy").className = "positive"
						}
						else if (yoy + 5 < 0) {
							document.getElementById("yoy").className = "negative"
						}
						else {
							document.getElementById("yoy").className = "neutral"	
						}

					// hide spinner
						document.getElementById("spinner").className = "hidden"
				}
				catch (error) {
					document.getElementById("yoy").innerText = "not found"
					document.getElementById("yoy").className = "negative"
					document.getElementById("spinner").className = "hidden"
				}
			}

		/* drawPrices */
			function drawPrices(prices) {
				// clear
					var context = canvas.getContext("2d")
						context.clearRect(0, 0, canvas.width, canvas.height)

				// find range
					var min = null
					var max = null
					
					for (var p in prices) {
						if (!min || prices[p].close < min) {
							min = prices[p].close
						}

						if (!max || prices[p].close > max) {
							max = prices[p].close
						}
					}

					var range = (max - min)

				// begin drawing
					context.beginPath()
					context.strokeStyle = "lightblue"
					context.font = "15px sans-serif"
					context.fillStyle = "#dddddd"
					context.lineWidth = 2

				// draw points & connect them
					for (var p in prices) {
						var x = Math.round(p * ((canvas.width - 50) / 12)) + 25
						var y = (canvas.height - 50) - Math.round((prices[p].close - min) * ((canvas.height - 50) / range)) + 5

						if (!p) { context.moveTo(x, y) }
						else    { context.lineTo(x, y) }

						context.arc(x, y, 2, 0, 2 * Math.PI)
						context.fillText(prices[p].close, x - 20, y + 20)
						context.fillText(prices[p].date.split("-")[1], x - 8, canvas.height)
						context.stroke()
					}

			}

	/*** data storage ***/
		/* storeSymbol */
			function storeSymbol(symbol) {
				// add to stocks
					var stocks = window.localStorage.stocks.split(",") || []
					if (!stocks.includes(symbol)) {
						stocks.unshift(symbol)
					}

				// remove extras
					if (stocks.length > 15) {
						stocks.pop()
					}

				// store data & update menu
					window.localStorage.stocks = stocks.join(",")
					loadRecent()
			}

		/* loadRecent */
			loadRecent()
			function loadRecent() {
				if (window.localStorage.stocks) {
					// get data & recent menu
						var list = window.localStorage.stocks.split(",") || []
						var menu = document.getElementById("recent")
							menu.innerHTML = "<summary></summary>"

					// add list
						for (var l in list) {
							var item = document.createElement("div")
								item.className = "item"
								item.innerText = list[l]
								item.addEventListener("click", selectRecent)
							menu.append(item)
						}
				}
				else {
					window.localStorage.stocks = ""
				}
			}
}