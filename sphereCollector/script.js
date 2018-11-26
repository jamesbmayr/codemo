$(document).ready(function() {

	/* triggers */
		if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
			var on = { click: "touchstart", mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" }
		}
		else {
			var on = { click:      "click", mousedown:  "mousedown", mousemove: "mousemove", mouseup:  "mouseup" }
		}

	window.score = 0;
	window.loopCount = 0;

	var loop = setInterval(function() {
		var count = $(".sphere").toArray().length;
		var logScore = Math.floor(Math.log(window.score) || 0);
		var windowHeight = $(window).height();
		var windowWidth = $(window).width();

		if (count < Math.max(5,logScore * 2)) {
			var startTop = (Math.random() * (windowHeight - 100)) + 10;
			var startLeft = (Math.random() * (windowWidth - 100)) + 10;
			var radius = Math.floor(Math.random() * 50) + 50;
			var angle = Math.random() * 360;
			var distance = (Math.random() * Math.max(50, logScore * 10));
			var color = ["red","orange","yellow","green","blue","purple","magenta","cyan","goldenrod","brown","gray","teal","maroon","darkblue","darkgreen","darkmagenta"][Math.floor(Math.random() * 16)];
			$("#pen").append("<div class='sphere' style='background-color: " + color + "; top: " + startTop + "px; left: " + startLeft + "px; height: " + radius + "px; width: " + radius + "px;' angle='" + angle + "' distance='" + distance + "'></div>");
		}

		$(".sphere").each(function() {
			var opacity = Number($(this).css("opacity"));

			if (opacity <= 0) {
				$(this).remove();
				window.score--;
				$("#score").text(window.score);
			}
			else {
				var angle = Number($(this).attr("angle"));
				var distance = Number($(this).attr("distance"));
				var height = Number(String($(this).css("height")).replace("px",""));
				var width = Number(String($(this).css("width")).replace("px",""));

				var startTop = Number($(this).position().top);
				var startLeft = Number($(this).position().left);
				var startBottom = height + startTop;
				var startRight = width + startLeft;

				if (startBottom >= windowHeight - 15) {
					if ((angle > 0) && (angle < 180)) {
						angle = 360 - angle;
						if (angle < 0) {
							angle = angle + 360;
						}
						else if (angle > 360) {
							angle = angle - 360;
						}
						$(this).attr("angle",angle);
					}
				}
				if (startTop <= 15) {
					if ((angle > 180) && (angle < 360)) {
						angle = 360 - angle;
						if (angle < 0) {
							angle = angle + 360;
						}
						else if (angle > 360) {
							angle = angle - 360;
						}
						$(this).attr("angle",angle);
					}
				}
				if (startRight >= windowWidth - 15) {
					if (((angle >= 0) && (angle < 90)) || ((angle < 360) && (angle > 270))) {
						angle = 180 - angle;
						if (angle < 0) {
							angle = angle + 360;
						}
						else if (angle > 360) {
							angle = angle - 360;
						}
						$(this).attr("angle",angle);
					}
				}
				if (startLeft <= 15) {
					if ((angle > 90) && (angle < 270)) {
						angle = 180 - angle;
						if (angle < 0) {
							angle = angle + 360;
						}
						else if (angle > 360) {
							angle = angle - 360;
						}
						$(this).attr("angle",angle);
					}
				}

				var endTop = (distance * Math.sin(angle * Math.PI / 180)) + startTop;
				var endLeft = (distance * Math.cos(angle * Math.PI / 180)) + startLeft;
				var endBottom = height + endTop;
				var endRight = width + endLeft;

				$(this).animate({
					left: endLeft,
					top: endTop,
					opacity: "-=0.015"
				},90,"linear");
			}
		});

	},100);

	$(document).on("mouseenter touchstart",".sphere",function() {
		$(this).remove();
		window.score++;
		$("#score").text(window.score);
	});

});