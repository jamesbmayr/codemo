$(document).ready(function() {

	/* load */
		createClocks();

		var timer = setInterval(function() {
			updateHand(new Date(), "second");
		}, 1000);

	/* createClocks */
		function createClocks() {
			var circles = ["second","minute","hour","day","date","month","year"];
			var time = new Date();

			for (i = 0; i < circles.length; i++) {
				$("#clock").append("<div id='face_" + circles[i] + "' class='face'><div id='hand_" + circles[i] + "' class='hand'><div class='inner'></div></div></div>");
				updateHand(time, circles[i]);
			}

			$("#clock").append("<div id='face_center' class='face'><div id='title'>tickTocker</div></div>");
		}

	/* updateHand */
		function updateHand(time, hand) {
			switch (hand) {
				case "second":
					var second = time.getSeconds();
					$("#hand_second").css("transform","translateX(-50%) rotate(" + ((360 / 60) * second) + "deg)").find(".inner").html(second + "<br>sec");
					
					if (second === 0) {
						updateHand(time, "minute");
					}
				break;

				case "minute":
					var minute = time.getMinutes();
					$("#hand_minute").css("transform","translateX(-50%) rotate(" + ((360 / 60) * minute) + "deg)").find(".inner").html(minute + "<br>min");
					
					if (minute === 0) {
						updateHand(time, "hour");
					}
				break;

				case "hour":
					var hour = (time.getHours()) % 12;
					$("#hand_hour").css("transform","translateX(-50%) rotate(" + ((360 / 12) * hour) + "deg)").find(".inner").html(hour + "<br>hour");
					
					if (hour === 0) {
						updateHand(time, "day");
						updateHand(time, "date");
					}
				break;

				case "day":
					var day = time.getDay();
					$("#hand_day").css("transform","translateX(-50%) rotate(" + ((360 / 7) * day) + "deg)").find(".inner").html(day + "<br>day");
				break;

				case "date":
					var month = time.getMonth();
					if ((month === 8) || (month === 3) || (month === 5) || (month === 10)) {
						var dateCount = 30;
					}
					else if (month === 1) {
						if (year % 4 === 0) {
							var dateCount = 29;
						}
						else {
							var dateCount = 28;
						}
					}
					else {
						var dateCount = 31;
					}

					var date = time.getDate();
					$("#hand_date").css("transform","translateX(-50%) rotate(" + ((360 / dateCount) * date) + "deg)").find(".inner").html(date + "<br>date");

					if (date === 0) {
						updateHand(time, "month");
					}
				break;

				case "month":
					var month = time.getMonth();
					$("#hand_month").css("transform","translateX(-50%) rotate(" + ((360 / 12) * month) + "deg)").find(".inner").html(month + 1 + "<br>mon");

					if (month === 0) {
						updateHand(time, "year");
					}
				break;

				case "year":
					var year = (time.getFullYear());
					$("#hand_year").css("transform","translateX(-50%) rotate(" + ((360 / 100) * (year % 100)) + "deg)").find(".inner").html(year + "<br>year");
				break;
			}
		}

});