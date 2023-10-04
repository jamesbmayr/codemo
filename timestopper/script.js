/* triggers */
	if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
		var on = { click: "touchstart", mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" }
	}
	else {
		var on = { click:      "click", mousedown:  "mousedown", mousemove: "mousemove", mouseup:  "mouseup" }
	}

/*  button */
	var button = document.getElementById("stopwatch")
		button.addEventListener(on.click, setTime)
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
