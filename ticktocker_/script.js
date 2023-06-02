window.onload = function() {

	/* load */
		createClocks()

		var timer = setInterval(function() {
			updateHand(new Date(), "second")
		}, 1000)

	/* createClocks */
		function createClocks() {
			var circles = ["second","minute","hour","day","date","month","year"]
			var time = new Date()

			for (var i = 0; i < circles.length; i++) {
				document.querySelector("#clock").innerHTML += ("<div id='face_" + circles[i] + "' class='face'><div id='hand_" + circles[i] + "' class='hand'><div class='inner'></div></div></div>")
			}

			for (var i = 0; i < circles.length; i++) {
				updateHand(time, circles[i])
			}

			document.querySelector("#clock").innerHTML += ("<div id='face_center' class='face'><div id='title'>tickTocker</div></div>")
		}

	/* updateHand */
		function updateHand(time, hand) {
			switch (hand) {
				case "second":
					var second = time.getSeconds()
					document.querySelector("#hand_second").style.transform = ("translateX(-50%) rotate(" + ((360 / 60) * second) + "deg)")
					document.querySelector("#hand_second .inner").innerHTML = (second + "<br>sec")
					
					if (second === 0) {
						updateHand(time, "minute")
					}
				break

				case "minute":
					var minute = time.getMinutes()
					document.querySelector("#hand_minute").style.transform = ("translateX(-50%) rotate(" + ((360 / 60) * minute) + "deg)")
					document.querySelector("#hand_minute .inner").innerHTML = (minute + "<br>min")
					
					if (minute === 0) {
						updateHand(time, "hour")
					}
				break

				case "hour":
					var hour = (time.getHours()) % 12
					document.querySelector("#hand_hour").style.transform = ("translateX(-50%) rotate(" + ((360 / 12) * hour) + "deg)")
					document.querySelector("#hand_hour .inner").innerHTML = (hour + "<br>hour")
					
					if (hour === 0) {
						updateHand(time, "day")
						updateHand(time, "date")
					}
				break

				case "day":
					var day = time.getDay()
					document.querySelector("#hand_day").style.transform = ("translateX(-50%) rotate(" + ((360 / 7) * day) + "deg)")
					document.querySelector("#hand_day .inner").innerHTML = (day + "<br>day")
				break

				case "date":
					var month = time.getMonth()
					if ((month === 8) || (month === 3) || (month === 5) || (month === 10)) {
						var dateCount = 30
					}
					else if (month === 1) {
						if (year % 4 === 0) {
							var dateCount = 29
						}
						else {
							var dateCount = 28
						}
					}
					else {
						var dateCount = 31
					}

					var date = time.getDate()
					document.querySelector("#hand_date").style.transform = ("translateX(-50%) rotate(" + ((360 / dateCount) * date) + "deg)")
					document.querySelector("#hand_date .inner").innerHTML = (date + "<br>date")

					if (date === 0) {
						updateHand(time, "month")
					}
				break

				case "month":
					var month = time.getMonth()
					document.querySelector("#hand_month").style.transform = ("translateX(-50%) rotate(" + ((360 / 12) * month) + "deg)")
					document.querySelector("#hand_month .inner").innerHTML = (month + 1 + "<br>mon")

					if (month === 0) {
						updateHand(time, "year")
					}
				break

				case "year":
					var year = (time.getFullYear())
					document.querySelector("#hand_year").style.transform = ("translateX(-50%) rotate(" + ((360 / 100) * (year % 100)) + "deg)")
					document.querySelector("#hand_year .inner").innerHTML = (year + "<br>year")
				break
			}
		}

}