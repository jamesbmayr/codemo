$(document).ready(function() {

	/* triggers */
		if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
			var on = { click: "touchstart", mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend", keydown: "keydown", keyup: "keyup" }
			document.body.style.height = document.documentElement.clientHeight
		}
		else {
			var on = { click:      "click", mousedown:  "mousedown", mousemove: "mousemove", mouseup:  "mouseup", keydown: "keydown", keyup: "keyup" }
		}

	/* load */
		startGame();

	/* listeners */
		$(document).on(on.click,".balloon:not(.popped)",function(event) {
			event.preventDefault()
			var id = String($(this).attr("id"));
			popBalloon(id);
		});

		$(document).on(on.click,"#restart",function(event) {
			event.preventDefault()
			startGame();
		});

	/* startGame */
		function startGame() {
			window.score = 0;
			window.count = 0;
			window.playing = true;

			$("#score").text("");
			$("#restart").hide();

			window.timer = setInterval(function() {
				moveBalloons();
				spawnBalloons();
			},100);
		}

	/* stopGame */
		function stopGame() {
			window.playing = false;
			$("#restart").show();

			$(".balloon").each(function() {
				$(this).addClass("popped").css("background-color","rgba(000,000,000,0)").children().show();
			});

			setTimeout(function() {
				clearInterval(window.timer);
				$(".balloon").remove();
			},2000);
		}

	/* moveBalloons */
		function moveBalloons() {
			$(".balloon").each(function(index) {
				var speed = $(this).attr("speed");
				var top = Number(String($(this).css("top")).replace("px",""));

				if ((top < 0) && !$(this).hasClass("popped")) {
					if (window.playing) {
						stopGame();
					}
				}
				else if (Number($(this).css("opacity")) === 0) {
					$(this).remove();
				}
				else if ($(this).hasClass("popped")) {
					$(this).animate({
						"opacity": "-=.05"
					},100,'linear');
				}
				else {
					$(this).animate({
						"top": "-=" + speed + "px"
					},100,'linear');
				}
			});
		}

	/* spawnBalloons */
		function spawnBalloons() {
			if (window.playing) {
				if (window.score < 5) {
					var limit = 3;
				}
				else if (window.score < 10) {
					var limit = 4;
				}
				else if (window.score < 20) {
					var limit = 5;
				}
				else if (window.score < 30) {
					var limit = 6;
				}
				else if (window.score < 50) {
					var limit = 8;
				}
				else if (window.score < 100) {
					var limit = 10;
				}
				else {
					var limit = 13;
				}
			}

			var colors = ["red","orange","yellow","green","blue","purple","cyan","magenta","gray"];

			while ((window.count - window.score) < limit) {
				var speed = (Math.floor(Math.random() * limit * 100) + 1000) / 100;
				var left = (Math.floor(Math.random() * 9000) + 200) / 100;
				var color = colors[Math.floor(Math.random() * colors.length)];
				var string = Math.floor(Math.random() * 2);

				$("#container").append("<div id='balloon_" + window.count + "' class='balloon " + color + "' style='left: " + left + "%' speed='" + speed + "'><div class='popped-part top-left " + color + "'></div><div class='popped-part top-right " + color + "'></div><div class='popped-part bottom-left " + color + "'></div><div class='popped-part bottom-right " + color + "'></div><div class='string_" + string + "'></div></div>");
				window.count++;
			}
		}

	/* popBalloon */
		function popBalloon(id) {
			if (window.playing) {
				$("#" + id).addClass("popped").css("background-color","rgba(000,000,000,0)").children().show();

				window.score++;
				$("#score").text(window.score);
			}
		}

});