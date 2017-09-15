window.onload = function() {

	/* onLoad */
		randomColor()

	/* updateColor */
		document.querySelectorAll(".range").forEach(function (element) {
			element.addEventListener("change", updateColor)
		})

		function updateColor() {
			var red = Math.max(Math.min(Number(document.getElementById("range-red").value) || 0, 255), 0)
			var green = Math.max(Math.min(Number(document.getElementById("range-green").value) || 0, 255), 0)
			var blue = Math.max(Math.min(Number(document.getElementById("range-blue").value) || 0, 255), 0)

			document.body.style["background-color"] = "rgb(" + red + ", " + green + ", " + blue + ")"

			document.getElementById("number-guess-red").textContent = red
			document.getElementById("number-guess-green").textContent = green
			document.getElementById("number-guess-blue").textContent = blue

			document.getElementById("bar-guess-red").style.height = (red * 100 / 255) + "%"
			document.getElementById("bar-guess-green").style.height = (green * 100 / 255) + "%"
			document.getElementById("bar-guess-blue").style.height = (blue * 100 / 255) + "%"

			document.getElementById("arrows").className = "hidden"
		}


	/* checkColor */
		document.getElementById("check").addEventListener("click", checkColor)
		
		function checkColor() {
			var red = Math.max(Math.min(Number(document.getElementById("range-red").value) || 0, 255), 0)
			var green = Math.max(Math.min(Number(document.getElementById("range-green").value) || 0, 255), 0)
			var blue = Math.max(Math.min(Number(document.getElementById("range-blue").value) || 0, 255), 0)

			var redDifference = Math.abs(red - window.redHue)
			var greenDifference = Math.abs(green - window.greenHue)
			var blueDifference = Math.abs(blue - window.blueHue)

			var actual = document.getElementById("actual")
				actual.className = actual.className.replace("hidden", "shown")
			var result = document.getElementById("result-outer")
				result.querySelectorAll("#result")[0].textContent = (100 - (((redDifference * 100 / 255) + (greenDifference * 100 / 255) + (blueDifference * 100 / 255)) / 3)).toFixed(2) + "%"
				result.className = result.className.replace("hidden", "shown")
			var check = document.getElementById("check")
				check.className = check.className.replace("shown", "hidden")

			setTimeout(function () {
				randomColor()
			}, 1000 * 3)
		}


	/* randomColor */
		function randomColor() {
			var actual = document.getElementById("actual")
				actual.className = actual.className.replace("shown", "hidden")
			var result = document.getElementById("result-outer")
				result.className = result.className.replace("shown", "hidden")
			var check = document.getElementById("check")
				check.className = check.className.replace("hidden", "shown")

			window.redHue = Math.floor(Math.random() * 256)
			window.greenHue = Math.floor(Math.random() * 256)
			window.blueHue = Math.floor(Math.random() * 256)

			check.style["background-color"] = "rgb(" + window.redHue + ", " + window.greenHue + ", " + window.blueHue + ")"
			result.style["background-color"] = "rgb(" + window.redHue + ", " + window.greenHue + ", " + window.blueHue + ")"

			setTimeout(function () {
				document.getElementById("number-actual-red").textContent = window.redHue
				document.getElementById("number-actual-green").textContent = window.greenHue
				document.getElementById("number-actual-blue").textContent = window.blueHue

				document.getElementById("bar-actual-red").style.height = (window.redHue * 100 / 255) + "%"
				document.getElementById("bar-actual-green").style.height = (window.greenHue * 100 / 255) + "%"
				document.getElementById("bar-actual-blue").style.height = (window.blueHue * 100 / 255) + "%"
			}, 1100)
		}
}
