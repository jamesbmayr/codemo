$(document).ready(function() {

	/* load */
		window.shapeCount = 1;
		window.playing = false;
		window.timeout = {};
		window.queue = [];
		window.endTime = 0;
		window.timeNow = 0;
		window.memory = {};

		resetDraggable();

	/* draggable */
		function resetDraggable() {
			$("#controls").draggable({ handle: "#controls_handle" });
			$(".shape").draggable();
		};

	/* header buttons */
		$(document).on("click",".new_shape",function() {
			if (!window.playing) {
				var control_shape = $(this).closest(".control_shape");
				$(this).replaceWith("\
					<div class='control_shape_header'>\
						<span class='control_number'>" + window.shapeCount + "</span>\
						<button class='collapse_shape'><span class='glyphicon glyphicon-chevron-up'></span></button>\
						<button class='expand_shape'><span class='glyphicon glyphicon-chevron-down'></span></button>\
						<button class='remove_shape'><span class='glyphicon glyphicon-remove'></span></button>\
					</div>");
				$(control_shape).append("<textarea class='plot_shape' placeholder='path points'>38 5, 62 5, 82.5 17.5, 95 38, 95 62, 82.5 82.5, 62 95, 38 95, 17.5 82.5, 5 62, 5 38, 17.5 17.5</textarea>");
				$(control_shape).append("\
					<div class='parameters'>\
						<div class='preview_frame'>\
							<div id='preview_" + window.shapeCount + "' class='preview_shape'></div>\
						</div>\
						<input type='number' class='shape_size' placeholder='size' value='200'></input>\
						<input type='text' class='shape_color' placeholder='color' value='gray'></input>\
					</div>");
				$(control_shape).append("\
					<div class='animation'>\
						<button class='new_animation'><span class='glyphicon glyphicon-plus'></span> animation</button>\
					</div>");

				$("#zone").append("<div id='shape_" + window.shapeCount + "' class='shape'></div>");
				resetDraggable();
				
				window.shapeCount++;
				$("#controls_scroll").append("\
					<div id='control_shape_" + window.shapeCount + "' class='control_shape'>\
						<button class='new_shape'><span class='glyphicon glyphicon-plus'></span> shape</button>\
					</div>");
			}
		});

		$(document).on("click",".remove_shape",function() {
			if (!window.playing) {
				var id = Number(String($(this).closest(".control_shape").attr("id")).replace("control_shape_",""));
				$("#control_shape_" + id).remove();
				$("#shape_" + id).remove();
			}
		});

		$(document).on("click",".collapse_shape",function() {
			if (!window.playing) {
				$(this).closest(".control_shape").children().hide();
				$(this).closest(".control_shape_header").show();
				$(this).closest(".control_shape_header").find(".expand_shape").show();
				$(this).hide();
			}
		});

		$(document).on("click",".expand_shape",function() {
			if (!window.playing) {
				$(this).closest(".control_shape").children().show();
				$(this).closest(".control_shape_header").find(".collapse_shape").show();
				$(this).hide();
			}
		});

	/* shape parameters */
		$(document).on("change keyup",".plot_shape",function() {
			if (!window.playing) {
				var path = $(this).val();
				if (path.length < 1) {
					path = "0 0";
				}

				path = path.replace(/, /g,",");
				path = path.split(",");
				for (i = 0; i < path.length; i++) {
					var parts = path[i].split(" ");
					parts[0] = parts[0].trim().replace("%","").replace("px","") + "%";
					parts[1] = parts[1].trim().replace("%","").replace("px","") + "%";

					path[i] = parts[0] + " " + parts[1];
				}
				path = path.join(",");

				$(this).closest(".control_shape").find(".preview_shape").css("clip-path","polygon(" + path + ")");

				var id = Number(String($(this).closest(".control_shape").attr("id")).replace("control_shape_",""));
				$("#shape_" + id).css("clip-path","polygon(" + path + ")");
			}
		});

		$(document).on("change keyup",".shape_color",function() {
			if (!window.playing) {
				var color = $(this).val();
				if (color.length < 1) {
					color = "gray";
				}

				$(this).closest(".control_shape").find(".preview_shape").css("background-color", color);

				var id = Number(String($(this).closest(".control_shape").attr("id")).replace("control_shape_",""));
				$("#shape_" + id).css("background-color", color);
			}
		});

		$(document).on("change keyup",".shape_size",function() {
			if (!window.playing) {
				var size = $(this).val();
				if (size.length < 1) {
					size = 100;
				}

				var id = Number(String($(this).closest(".control_shape").attr("id")).replace("control_shape_",""));
				$("#shape_" + id).css("width", size + "px").css("height", size + "px");
			}
		});

		$(document).on("click",".new_animation",function() {
			if (!window.playing) {
				$(this).closest(".control_shape").append("\
					<div class='animation'>\
						<button class='new_animation'><span class='glyphicon glyphicon-plus'></span> animation</button>\
					</div>");

				$(this).replaceWith("\
					<input type='text' class='animation_timestamp' placeholder='start' value='0:00'></input>\
					<input type='text' class='animation_duration' placeholder='length' value='1.00'></input>\
					<button class='play'><span class='glyphicon glyphicon-play'></span></button>\
					<button class='pause'><span class='glyphicon glyphicon-pause'></span></button>\
					<button class='remove_animation'><span class='glyphicon glyphicon-remove'></span></button>\
					<textarea class='animation_text' placeholder='parameter:\"value\",\nparameter:\"value\",\n...'>left:\"+=100px\",\nbackgroundColor:\"#333333\"</textarea>");
			}
		});

		$(document).on("click",".remove_animation",function() {
			if (!window.playing) {
				$(this).closest(".animation").remove();
			}
		});

	/* shape hover */
		$(document).on("mouseenter",".shape",function() {
			if (!window.playing) {
				var id = Number(String($(this).attr("id")).replace("shape_",""));

				$(this).addClass("hover").css("opacity","-=0.5");
				$("#control_shape_" + id).find(".control_number").addClass("hover");
			}
		});

		$(document).on("mouseleave",".shape",function() {
			if (!window.playing) {
				var id = Number(String($(this).attr("id")).replace("shape_",""));

				$(this).removeClass("hover").css("opacity","+=0.5");
				$("#control_shape_" + id).find(".control_number").removeClass("hover");
			}
		});

		$(document).on("mouseenter",".control_number",function() {
			if (!window.playing) {
				var id = Number(String($(this).closest(".control_shape").attr("id")).replace("control_shape_",""));

				$("#shape_" + id).addClass("hover").css("opacity","-=0.5");
				$(this).addClass("hover");
			}
		});

		$(document).on("mouseleave",".control_number",function() {
			if (!window.playing) {
				var id = Number(String($(this).closest(".control_shape").attr("id")).replace("control_shape_",""));

				$("#shape_" + id).removeClass("hover").css("opacity","+=0.5");
				$(this).removeClass("hover");
			}
		});

	/* preview animation controls */
		$(document).on("click",".play:not(#controls_play)",function() {
			if (!window.playing) {
				var button = $(this);
				var id = Number(String($(this).closest(".control_shape").attr("id")).replace("control_shape_",""));
				var animation = String($(this).closest(".animation").find(".animation_text").val());
				var duration = Number($(this).closest(".animation").find(".animation_duration").val()) * 1000;

				if (typeof window.memory[id] !== "undefined") {
					$("#shape_" + id)
						.css("height",window.memory[id]["height"])
						.css("width",window.memory[id]["width"])
						.css("top",window.memory[id]["top"])
						.css("left",window.memory[id]["left"])
						.css("opacity",window.memory[id]["opacity"])
						.css("background-color",window.memory[id]["background-color"]);
				}

				if ((animation) && (typeof duration === "number")) {
					window.memory[id] = {
						"height":$("#shape_" + id).css("height"),
						"width":$("#shape_" + id).css("width"),
						"top":$("#shape_" + id).css("top"),
						"left":$("#shape_" + id).css("left"),
						"opacity":$("#shape_" + id).css("opacity"),
						"background-color":$("#shape_" + id).css("background-color")
					}

					window.timeout[id] = setTimeout(function() {
						if (typeof window.memory[id] !== "undefined") {
							$("#shape_" + id)
								.css("height",window.memory[id]["height"])
								.css("width",window.memory[id]["width"])
								.css("top",window.memory[id]["top"])
								.css("left",window.memory[id]["left"])
								.css("opacity",window.memory[id]["opacity"])
								.css("background-color",window.memory[id]["background-color"]);
						}

						window.memory[id] = {};

						$(button).show();
						$(button).closest(".animation").find(".pause").hide();

						$(button).closest(".control_shape").find("button").removeClass("disabled").prop("disabled",false);
						$(button).closest(".control_shape").find("input").removeClass("disabled").prop("disabled",false);
						$(button).closest(".control_shape").find("textarea").removeClass("disabled").prop("disabled",false);
						$(button).closest(".control_shape").find(".control_number").addClass("disabled").prop("disabled",true);
					},(duration + 20));

					$(button).closest(".control_shape").find("button").addClass("disabled").prop("disabled",true);
					$(button).closest(".control_shape").find("input").addClass("disabled").prop("disabled",true);
					$(button).closest(".control_shape").find("textarea").addClass("disabled").prop("disabled",true);
					$(button).closest(".control_shape").find(".control_number").addClass("disabled").prop("disabled",true);

					$(button).hide();
					$(button).closest(".animation").find(".pause").show().removeClass("disabled").prop("disabled",false);

					try {
						$("#shape_" + id).removeClass("hover");
						animation = "$('#shape_" + id + "').animate({" + animation + "}," + duration + ")";
						console.log(animation);
						eval(animation);
					}
					catch (err) {
						console.log("error");
					}
				}
			}
		});

		$(document).on("click",".pause:not(#controls_pause)",function() {
			if (!window.playing) {
				var id = Number(String($(this).closest(".control_shape").attr("id")).replace("control_shape_",""));
				clearInterval(window.timeout[id]);
				$("#shape_" + id).stop();

				$(this).hide();
				$(this).closest(".animation").find(".play").show();

				$(this).closest(".control_shape").find("button").removeClass("disabled").prop("disabled",false);
				$(this).closest(".control_shape").find("input").removeClass("disabled").prop("disabled",false);
				$(this).closest(".control_shape").find("textarea").removeClass("disabled").prop("disabled",false);
				$(this).closest(".control_shape").find(".control_number").addClass("disabled").prop("disabled",true);
			}
		});

		$(document).on("click",".restart:not(#controls_restart)",function() {
			if (!window.playing) {
				var id = Number(String($(this).closest(".control_shape").attr("id")).replace("control_shape_",""));
				clearInterval(window.timeout[id]);
				$("#shape_" + id).stop();

				if (typeof window.memory[id] !== "undefined") {
					$("#shape_" + id)
						.css("height",window.memory[id]["height"])
						.css("width",window.memory[id]["width"])
						.css("top",window.memory[id]["top"])
						.css("left",window.memory[id]["left"])
						.css("opacity",window.memory[id]["opacity"])
						.css("background-color",window.memory[id]["background-color"]);
				}

				window.memory[id] = {};

				$(this).closest(".animation").find(".play").show();
				$(this).closest(".animation").find(".pause").hide();

				$(this).closest(".control_shape").find("button").removeClass("disabled").prop("disabled",false);
				$(this).closest(".control_shape").find("input").removeClass("disabled").prop("disabled",false);
				$(this).closest(".control_shape").find("textarea").removeClass("disabled").prop("disabled",false);
				$(this).closest(".control_shape").find(".control_number").addClass("disabled").prop("disabled",true);
			}
		});
	
	/* animation controls */
		$(document).on("click","#controls_play",function() {
			if (window.endTime === 0) {
				$(".shape").each(function(index) {
					var id = Number(String($(this).attr("id")).replace("shape_",""));

					if (typeof window.memory[id] !== "undefined") {
						$("#shape_" + id)
							.css("height",window.memory[id]["height"])
							.css("width",window.memory[id]["width"])
							.css("top",window.memory[id]["top"])
							.css("left",window.memory[id]["left"])
							.css("opacity",window.memory[id]["opacity"])
							.css("background-color",window.memory[id]["background-color"]);
					}
				});
			}

			window.playing = true;
			
			$("button").addClass("disabled").prop("disabled",true);
			$("input").addClass("disabled").prop("disabled",true);
			$("textarea").addClass("disabled").prop("disabled",true);
			$(".control_number").addClass("disabled").prop("disabled",true);

			$(this).hide();
			$("#controls_pause").show().removeClass("disabled").prop("disabled",false);
			$("#controls_restart").removeClass("disabled").prop("disabled",false);

			if (window.queue.length === 0) {
				var queue = [];
				var endTime = 0;

				$(".animation").each(function(index) {
					if ($(this).find(".animation_timestamp").toArray().length > 0) {
						var id = Number(String($(this).closest(".control_shape").attr("id")).replace("control_shape_",""));
						var animation = String($(this).find(".animation_text").val());
						var duration = Number($(this).find(".animation_duration").val()) * 1000;
						var timestamp = String($(this).find(".animation_timestamp").val());
						timestamp = timestamp.split(":");
						
						if (timestamp.length === 3) {
							var hours = Number(timestamp[0]);
							var minutes = Number(timestamp[1]);
							var seconds = Number(timestamp[2]);
						}
						else if (timestamp.length === 2) {
							var hours = 0;
							var minutes = Number(timestamp[0]);
							var seconds = Number(timestamp[1]);
						}
						else if (timestamp.length === 1) {
							var hours = 0;
							var minutes = 0;
							var seconds = Number(timestamp[0]);
						}
						else {
							var hours = 0;
							var minutes = 0;
							var seconds = 0;
						}

						timestamp = Number((hours * 360) + (minutes * 60) + seconds) * 1000;

						queue[queue.length] = [timestamp,id,animation,duration];

						if ((timestamp + duration) > endTime) {
							endTime = timestamp + duration;
						}

						window.memory[id] = {
							"height":$("#shape_" + id).css("height"),
							"width":$("#shape_" + id).css("width"),
							"top":$("#shape_" + id).css("top"),
							"left":$("#shape_" + id).css("left"),
							"opacity":$("#shape_" + id).css("opacity"),
							"background-color":$("#shape_" + id).css("background-color")
						}
					}
				});
		
				var sorted_queue = [];
				sorted_queue[0] = queue[0];
				queue.splice(0,1);

				while (queue.length > 0) {
					var placed = false;
					var i = 0;
					while ((!placed) && (i < sorted_queue.length)) {
						if (Number(queue[0][0]) < Number(sorted_queue[i][0])) {
							sorted_queue.splice(i,0,queue[0]);
							queue.splice(0,1);
							placed = true;
						}
						else {
							i++;
						}
					}
					if (!placed) {
						sorted_queue.push(queue[0]);
						queue.splice(0,1);
						placed = true;
					}
				}

				if (endTime) {
					window.queue = sorted_queue;
					window.endTime = endTime;
					window.timeNow = 0;
					window.timeout["main"] = setInterval(function() {
						
						if (window.playing) {
							$(".shape").removeClass("hover");

							while ((window.queue.length > 0) && (window.queue[0][0] < (window.timeNow - 0.0001))) {
								try {
									var animation = "$('#shape_" + window.queue[0][1] + "').animate({" + window.queue[0][2] + "}," + window.queue[0][3] + ")";
									console.log(animation);
									eval(animation);
								}
								catch (error) {
									console.log(error);
								}
								
								window.queue.splice(0,1);
							}

							if (window.timeNow >= window.endTime) {
								$("#controls_pause").hide();
								$("#controls_play").show();

								$("button").removeClass("disabled").prop("disabled",false);
								$("input").removeClass("disabled").prop("disabled",false);
								$("textarea").removeClass("disabled").prop("disabled",false);
								$(".control_number").removeClass("disabled").prop("disabled",false);

								window.playing = false;
								window.queue = [];
								window.endTime = 0;
								window.timeNow = 0;
								clearInterval(window.timeout["main"]);

								$("#controls_clock").text("00:00.00");
							}
							else {
								var hours = Math.floor((window.timeNow / 1000) / 360);
								var minutes = Math.floor(((window.timeNow / 1000) % 360) / 60);
								var seconds = ((window.timeNow / 1000) % 360) % 60;
								var clock = "0";

								if (seconds > 0) {
									var clock = String(seconds);
									if (seconds < 10) {
										clock = "0" + clock;
									}
									if (clock.indexOf(".") < 0) {
										clock = clock + ".";
									}
									clock = clock + "000";		
									clock = clock.substring(0,5);
								}
								else {
									clock = "00.00";
								}

								if (minutes > 0) {
									clock = minutes + ":" + clock; 
									if (minutes < 10) {
										clock = "0" + clock;
									}
								}
								else {
									clock = "00:" + clock;
								}
								if (hours > 0) {
									clock = hours + ":" + clock;
									if (hours < 10) {
										clock = "0" + clock;
									}
								}

								$("#controls_clock").text(clock);
								window.timeNow = window.timeNow + 10;
							}
						}

					},10);
				}
			}
		});

		$(document).on("click","#controls_pause",function() {
			window.playing = false;

			$(this).hide();
			$("#controls_play").show();

			$("button").removeClass("disabled").prop("disabled",false);
			$("input").removeClass("disabled").prop("disabled",false);
			$("textarea").removeClass("disabled").prop("disabled",false);
			$(".control_number").removeClass("disabled").prop("disabled",false);
		});

		$(document).on("click","#controls_restart",function() {
			window.playing = false;
			window.queue = [];
			window.endTime = 0;
			window.timeNow = 0;
			clearInterval(window.timeout["main"]);
			$(".shape").stop();

			$(".shape").each(function(index) {
				var id = Number(String($(this).attr("id")).replace("shape_",""));
				if (typeof window.memory[id] !== "undefined") {
					$("#shape_" + id)
						.css("height",window.memory[id]["height"])
						.css("width",window.memory[id]["width"])
						.css("top",window.memory[id]["top"])
						.css("left",window.memory[id]["left"])
						.css("opacity",window.memory[id]["opacity"])
						.css("background-color",window.memory[id]["background-color"]);
				}
			});

			window.memory = {};

			$("#controls_pause").hide();
			$("#controls_play").show();
			
			$("button").removeClass("disabled").prop("disabled",false);
			$("input").removeClass("disabled").prop("disabled",false);
			$("textarea").removeClass("disabled").prop("disabled",false);
			$(".control_number").removeClass("disabled").prop("disabled",false);

			$("#controls_clock").text("00:00.00");
		});

});