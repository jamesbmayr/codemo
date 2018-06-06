window.onload = function() {
	/*  button */
		var button = document.getElementById("stopwatch")
			button.addEventListener("click", setTime)
			button.focus()

	/* setTime */
		var time, loop
		function setTime() {
			if (!loop) {
				time = 0

				loop = setInterval(function() {
					time++
					button.innerHTML = convertTime(time)
				}, 100)
			}
			else {
				clearInterval(loop)
				loop = null
			}
		}

	/* convertTime */
		function convertTime(tenths) {
			var minutes = Math.floor(tenths / 10 / 60)
			var seconds = Math.floor(tenths / 10 % 60)
				tenths  =            tenths % 10

				minutes = (String(minutes).length > 1) ? minutes : ("0" + minutes)
				seconds = (String(seconds).length > 1) ? seconds : ("0" + seconds)

			return (minutes + ":" + seconds + "." + tenths)
		}
}