$(document).ready(function() {

	/* triggers */
		if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
			var on = { click: "touchstart", mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend", keydown: "keydown", keyup: "keyup" }
		}
		else {
			var on = { click:      "click", mousedown:  "mousedown", mousemove: "mousemove", mouseup:  "mouseup", keydown: "keydown", keyup: "keyup" }
		}

	/* on load */
		window.score = 0;
		window.level = 0;
		window.clock = 0;
		window.playing = false;

	/* gameLoop */
		window.gameLoop = setInterval(function() {
			if (window.playing) {
				if (window.clock <= 0) {
					//lose
					window.playing = false;
					window.score = 0;
					window.level = 0;
					window.clock = 0;

					$("#container").animate({
						"top":"50%",
						"left":"50%"
					},500);

					$("#hand").removeClass("ticking");
					setTimeout(function() {
						$("#blades_inner").removeClass("spinning");
						$("#container").css("top","50%").css("left","50%");
					},1000);

					$("#lose_screen").animate({
						height: "99%",
						width: "99%"
					},1000);
				}
				else if (window.score >= 100) {
					//win
					window.playing = false;

					$("#container").animate({
						"top":"50%",
						"left":"50%"
					},500);

					setTimeout(function() {
						$("#blades_inner").removeClass("spinning");
						$("#hand").removeClass("ticking");
						$("#container").css("top","50%").css("left","50%");
					},1000);

					$("#win_screen").animate({
						height: "99%",
						width: "99%"
					},1000);
				}
				else {
					//continue
					window.clock -= 100;
					
					if ($(".gem").toArray().length < window.level) {
						//add gem
						var id = "gem_" + Number(Math.round(Math.random() * 100000)).toString(36);
						var angle = Math.random() * 2 * Math.PI;
						var radius = (Math.random() * 25) + 20;
						var left = 50 + (radius * Math.cos(angle));
						var top = 50 + (radius * Math.sin(angle));
						
						$("#gems").append("<div id='" + id + "' class='gem' style='opacity: 0; left: " + left + "%; top: " + top + "%;'></div>");
						$("#" + id).animate({
							opacity: 1
						},1000);
					}

					if ((window.clock < 5000) && (window.clock > 1000)) {
						$("#container").animate({
							top: "+=" + (Math.floor(Math.random() * 5) - 2) + "px",
							left: "+=" + (Math.floor(Math.random() * 5) - 2) + "px"
						},100);
					}
				}
			}
		}, 100);
	
	/* startRound */
		$(document).on(on.click, ".play", function () {
			if (window.clock !== 60000) {
				window.clock = 60 * 1000;
				window.level++;
				window.score = 10;

				$("#hand").css("transform","rotate(0deg)");
				$("#points").css("height","0%").css("width","0%");
				$("#level_count").text(window.level);
				$("#container").css("top","50%").css("left","50%");

				$("#gems").empty();
				$("#blades_inner").empty();
				for (x = 0; x < window.level; x++) {
					$("#blades_inner").append("<div class='blade' style='transform: rotate(" + (x * (360 / window.level)) + "deg);'></div>");
				}

				$("#welcome_screen,#win_screen,#lose_screen").animate({
					height: "0",
					width: "0",
				},3000);

				setTimeout(function() {
					window.playing = true;
					$("#blades_inner").addClass("spinning");
					$("#hand").addClass("ticking");
				},3000);
			}
		});

	/* collectGem */
		$(document).on(on.click, ".gem", function () {
			if ((window.playing) && (!$(this).hasClass("collected"))) {
				var gem = $(this);

				$(gem).addClass("collected").animate({
					opacity:0
				}, 1000);
				
				setTimeout(function() {
					$(gem).remove();
				}, 1000);

				window.score = Math.min(100, window.score + (10 / window.level));
				$("#points").animate({
					height: window.score + "%",
					width: window.score + "%"
				},500);
			}
		});

	/* hitBlade */
		$(document).on(on.click, ".blade", function () {
			if (window.playing) {
				window.score = Math.max(10, window.score - (100 / window.level));
				$("#points").animate({
					height: window.score + "%",
					width: window.score + "%"
				},500);
			}
		});

});