$(document).ready(function() {

	/* triggers */
		if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
			var on = { click: "touchstart", mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" }
		}
		else {
			var on = { click:      "click", mousedown:  "mousedown", mousemove: "mousemove", mouseup:  "mouseup" }
		}

	/* load */
		window.shapeCount = 1;
		window.playing = false;
		window.timeout = {};
		window.queue = [];
		window.endTime = 0;
		window.timeNow = 0;
		window.memory = {};
		window.shapes = { //some clip-paths from http://bennettfeely.com/clippy/
			"triangle":"50% 15%, 0% 100%, 100% 100%",
			"square":"0% 0%, 100% 0%, 100% 100%, 0% 100%",
			"diamond":"50% 0%, 100% 50%, 50% 100%, 0% 50%",
			"parallelogram":"25% 0%, 100% 0%, 75% 100%, 0% 100%",
			"rectangle":"0% 20%, 100% 20%, 100% 80%, 0% 80%",
			"trapezoid":"20% 0%, 80% 0%, 100% 100%, 0% 100%",
			"pentagon":"50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%",
			"hexagon":"50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%",
			"septagon":"50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%",
			"octagon":"30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%",
			"nonagon":"50% 0%, 83% 12%, 100% 43%, 94% 78%, 68% 100%, 32% 100%, 6% 78%, 0% 43%, 17% 12%",
			"decagon":"50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%",
			"dodecagon":"38% 5%, 62% 5%, 82.5% 17.5%, 95% 38%, 95% 62%, 82.5% 82.5%, 62% 95%, 38% 95%, 17.5% 82.5%, 5% 62%, 5% 38%, 17.5% 17.5%",
			"star":"50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%",
			"chevron":"50% 0%, 100% 100%, 50% 75%, 0 100%",
			"cross":"0% 33%, 33% 33%, 33% 0%, 67% 0%, 67% 33%, 100% 33%, 100% 67%, 67% 67%, 67% 100%, 33% 100%, 33% 67%, 0% 67%",
			"arrow":"50% 0, 50% 33%, 100% 33%, 100% 67%, 50% 67%, 50% 100%, 0% 50%"
		}

		resetDraggable();

		var options = "";
		for (i = 0; i < Object.keys(window.shapes).length; i++) {
			options += "<option value='" + Object.keys(window.shapes)[i] + "'>" + Object.keys(window.shapes)[i] + "</option>";
		}
		options = "<select class='shape_options'><option selected value=''>shape</option>" + options + "</select>";
		$(".new_shape").append(options);

	/* draggable */
		function resetDraggable() {
			$("#controls").draggable({ handle: "#controls_handle" });
			$(".shape").draggable();
		};

	/* file buttons */
		$(document).on(on.click,"#controls_download",function() {
			var data = {};

			$(".control_shape").each(function(i) {
				if (!($(this).find(".new_shape").toArray().length > 0)) {
					var number = Number($(this).find(".control_number").text());
					var plot = String($(this).find(".plot_shape").val());
					var size = String($(this).find(".shape_size").val());
					var color = String($(this).find(".shape_color").val());
					var animations = {};

					$(this).find(".animation").each(function(j) {
						if (!($(this).find(".new_animation").toArray().length > 0)) {
							var timestamp = String($(this).find(".animation_timestamp").val());
							var duration = String($(this).find(".animation_duration").val());
							var text = String($(this).find(".animation_text").val());

							animations[j] = {
								"timestamp":timestamp,
								"duration":duration,
								"text":text
							}
						}
					});

					var top = String($("#shape_" + number).css("top"));
					var left = String($("#shape_" + number).css("left"));
					var points = String($("#shape_" + number).css("clip-path"));
					var opacity = String($("#shape_" + number).css("opacity"));

					data[number] = {
						"plot":plot,
						"size":size,
						"color":color,
						"top":top,
						"left":left,
						"points":points,
						"opacity":opacity,
						"animations":animations
					}
				}
			});

			if (String($("#controls_background").val()).length > 0) {
				data[0] = {
					"background":String($("#controls_background").val())
				}
			}
			else {
				data[0] = {
					"background":""
				}
			}
			
			var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
			var data_time = new Date();
			var month = String("0" + (data_time.getMonth() + 1)).slice(-2);
			var date = String("0" + data_time.getDate()).slice(-2);
			var year = String(data_time.getFullYear());
			data_time = month + date + year;

			$("body").append("<a id='download_link' href='data:" + data + "' download='shapeAnimator_" + data_time + ".json'></a>");
			$("#download_link").click(function() {
				$(this).remove();
			})[0].click();
		});

		$(document).on("change","#file_chooser",function(event) {
			if (($("#file_chooser").val() !== null) && ($("#file_chooser").val().length > 0)){
			    var reader = new FileReader();
			    reader.readAsText(event.target.files[0]);
				reader.onload = function(event) {
					var data = JSON.parse(event.target.result);
					var data_shapes = Object.keys(data);

					$("#zone").empty();
					$("#controls_scroll").empty();
					window.playing = false;
					window.timeout = {};
					window.queue = [];
					window.endTime = 0;
					window.timeNow = 0;
					window.memory = {};
					window.shapeCount = 0;

					$("#controls_scroll").append('<input id="controls_background" type="text" placeholder="background" value="' + data[0]["background"] + '">');

					if (data[0]["background"].length > 0) {
						if ((data[0]["background"].slice(-4) === ".mp4") || (data[0]["background"].slice(-4) === ".mov")) {
							$("#zone").css("background", "rgba(000,000,000,0)");
							$("#background_video").show().find("source").attr("src", data[0]["background"]).attr("type","video/mp4");

							var video = $("#background_video");
							video.load();
						}
						else if ((data[0]["background"].slice(-4) === ".jpg") || (data[0]["background"].slice(-4) === ".png") || (data[0]["background"].slice(-4) === ".svg") || (data[0]["background"].slice(-5) === ".jpeg") || (data[0]["background"].slice(-4) === ".bmp") || (data[0]["background"].slice(-5) === ".tiff") || (data[0]["background"].slice(-4) === ".gif")) {
							$("#zone").css("background", "url(" + data[0]["background"] + ")").css("background-size","cover").css("background-repeat","no-repeat");
							$("#background_video").hide().find("source").attr("src", "");
						}
						else {
							$("#zone").css("background",  data[0]["background"]);
							$("#background_video").hide().find("source").attr("src", "");
						}
					}

					for (i = 1; i < data_shapes.length; i++) {
						if (Number(data_shapes[i]) > window.shapeCount) {
							window.shapeCount = Number(data_shapes[i]);
						}

						var animations = "";
						for (j = 0; j < Object.keys(data[data_shapes[i]]["animations"]).length; j++) {
							animations += '\
								<div class="animation">\
									<input type="text" class="animation_timestamp" placeholder="start" value="' + data[data_shapes[i]]["animations"][j]["timestamp"] + '">\
									<input type="text" class="animation_duration" placeholder="length" value="' + data[data_shapes[i]]["animations"][j]["duration"] + '">\
									<button class="play"><span class="glyphicon glyphicon-play"></span></button>\
									<button class="pause"><span class="glyphicon glyphicon-pause"></span></button>\
									<button class="remove_animation"><span class="glyphicon glyphicon-remove"></span></button>\
									<textarea class="animation_text" placeholder="parameter:\"value\",\nparameter:\"value\",\n...">' + data[data_shapes[i]]["animations"][j]["text"] + '</textarea>\
								</div>';
						}

						$("#controls_scroll").append('\
							<div id="control_shape_' + data_shapes[i] + '" class="control_shape">\
								<div class="control_shape_header">\
									<span class="control_number">' + data_shapes[i] + '</span>\
									<button class="collapse_shape"><span class="glyphicon glyphicon-chevron-up"></span></button>\
									<button class="expand_shape"><span class="glyphicon glyphicon-chevron-down"></span></button>\
									<button class="remove_shape"><span class="glyphicon glyphicon-remove"></span></button>\
								</div>\
								<textarea class="plot_shape" placeholder="shape or polygon coordinates">' + data[data_shapes[i]]["plot"] + '</textarea>\
								<div class="parameters">\
									<div class="preview_frame">\
										<div id="preview_' + data_shapes[i] + '" class="preview_shape" style="clip-path: ' + data[data_shapes[i]]["points"] + '; background: ' + data[data_shapes[i]]["color"] + '">\
										</div>\
									</div>\
									<input type="number" class="shape_size" placeholder="size" value="' + data[data_shapes[i]]["size"] + '">\
									<input type="text" class="shape_color" placeholder="color" value="' + data[data_shapes[i]]["color"] + '">\
								</div>\
								' + animations + '\
								<div class="animation">\
									<button class="new_animation"><span class="glyphicon glyphicon-plus"></span> animation</button>\
								</div>\
							</div>');
						
						$("#zone").append('<div id="shape_' + data_shapes[i] + '" class="shape ui-draggable ui-draggable-handle" style="top: ' + data[data_shapes[i]]["top"] + '; left: ' + data[data_shapes[i]]["left"] + '; width: ' + data[data_shapes[i]]["size"] + 'px; height: ' + data[data_shapes[i]]["size"] + 'px; background: ' + data[data_shapes[i]]["color"] + '; clip-path: ' + data[data_shapes[i]]["points"] + '; opacity: ' + data[data_shapes[i]]["opacity"] + ';"></div>');
					}

					window.shapeCount = window.shapeCount + 1;

					var options = "";
					for (i = 0; i < Object.keys(window.shapes).length; i++) {
						options += '<option value="' + Object.keys(window.shapes)[i] + '">' + Object.keys(window.shapes)[i] + '</option>';
					}

					$("#controls_scroll").append('\
						<div id="control_shape_' + window.shapeCount + '" class="control_shape">\
							<button class="new_shape"><span class="glyphicon glyphicon-plus"></span>\
								<select class="shape_options">\
									<option selected="" value="">shape</option>\
									' + options + '\
								</select>\
							</button>\
						</div>');

					resetDraggable();
				}
			}
		});

	/* collapse button */
		$(document).on(on.click, "#collapse", function() {
			$("#controls").toggleClass("collapsed")
		})

	/* header buttons */
		$(document).on("change keyup", "#controls_background", function () {
			var background = String($("#controls_background").val());

			if (background.length > 0) {

				if ((background.slice(-4) === ".mp4") || (background.slice(-4) === ".mov")) {
					$("#zone").css("background", "rgba(000,000,000,0)");
					$("#background_video").show().find("source").attr("src", background).attr("type","video/mp4");

					var video = $("#background_video");
					video.load();
				}
				else if ((background.slice(-4) === ".jpg") || (background.slice(-4) === ".png") || (background.slice(-4) === ".svg") || (background.slice(-5) === ".jpeg") || (background.slice(-4) === ".bmp") || (background.slice(-5) === ".tiff") || (background.slice(-4) === ".gif")) {
					$("#zone").css("background", "url(" + background + ")").css("background-size","cover").css("background-repeat","no-repeat");
					$("#background_video").hide().find("source").attr("src", "");
				}
				else {
					$("#zone").css("background",  background);
					$("#background_video").hide().find("source").attr("src", "");
				}

			}

		});

		$(document).on(on.click,".new_shape",function() {
			if (!window.playing) {
				var control_shape = $(this).closest(".control_shape");
				var new_shape = $(this).find(".shape_options").val();

				$(this).replaceWith("\
					<div class='control_shape_header'>\
						<span class='control_number'>" + window.shapeCount + "</span>\
						<button class='collapse_shape'><span class='glyphicon glyphicon-chevron-up'></span></button>\
						<button class='expand_shape'><span class='glyphicon glyphicon-chevron-down'></span></button>\
						<button class='remove_shape'><span class='glyphicon glyphicon-remove'></span></button>\
					</div>");

				if (new_shape === "shape") {
					var points = window.shapes["dodecagon"];
				}
				else if (Object.keys(window.shapes).indexOf(new_shape) > -1) {
					var points = window.shapes[new_shape];
				}
				else {
					var points = window.shapes["dodecagon"];
				}

				$(control_shape).append("<textarea class='plot_shape' placeholder='shape or polygon coordinates'>" + points.replace(/%/g,"") + "</textarea>");
				$(control_shape).append("\
					<div class='parameters'>\
						<div class='preview_frame'>\
							<div id='preview_" + window.shapeCount + "' class='preview_shape' style='clip-path: polygon(" + points + ")'></div>\
						</div>\
						<input type='number' class='shape_size' placeholder='size' value='200'></input>\
						<input type='text' class='shape_color' placeholder='color' value='gray'></input>\
					</div>");
				$(control_shape).append("\
					<div class='animation'>\
						<button class='new_animation'><span class='glyphicon glyphicon-plus'></span> animation</button>\
					</div>");

				$("#zone").append("<div id='shape_" + window.shapeCount + "' class='shape' style='clip-path: polygon(" + points + ")'></div>");
				resetDraggable();
				
				window.shapeCount++;
				var options = "";
				for (i = 0; i < Object.keys(window.shapes).length; i++) {
					options += "<option value='" + Object.keys(window.shapes)[i] + "'>" + Object.keys(window.shapes)[i] + "</option>";
				}
				options = "<select class='shape_options'><option selected value=''>shape</option>" + options + "</select>";
				$("#controls_scroll").append("\
					<div id='control_shape_" + window.shapeCount + "' class='control_shape'>\
						<button class='new_shape'><span class='glyphicon glyphicon-plus'></span>" + options + "</button>\
					</div>");
			}
		});

		$(document).on(on.click,".shape_options",function(e) {
			e.stopPropagation();
		});

		$(document).on(on.click,".remove_shape",function() {
			if (!window.playing) {
				var id = Number(String($(this).closest(".control_shape").attr("id")).replace("control_shape_",""));
				$("#control_shape_" + id).remove();
				$("#shape_" + id).remove();
			}
		});

		$(document).on(on.click,".collapse_shape",function() {
			if (!window.playing) {
				$(this).closest(".control_shape").children().hide();
				$(this).closest(".control_shape_header").show();
				$(this).closest(".control_shape_header").find(".expand_shape").show();
				$(this).hide();
			}
		});

		$(document).on(on.click,".expand_shape",function() {
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

				if (Object.keys(window.shapes).indexOf(path) > -1) {
					path = window.shapes[path];
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

				$(this).closest(".control_shape").find(".preview_shape").css("background", color);

				var id = Number(String($(this).closest(".control_shape").attr("id")).replace("control_shape_",""));
				$("#shape_" + id).css("background", color);
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

		$(document).on(on.click,".new_animation",function() {
			if (!window.playing) {
				$(this).closest(".control_shape").append("\
					<div class='animation'>\
						<button class='new_animation'><span class='glyphicon glyphicon-plus'></span> animation</button>\
					</div>");

				$(this).replaceWith("\
					<input type='text' class='animation_timestamp' placeholder='start' value='00:00'></input>\
					<input type='text' class='animation_duration' placeholder='length' value='1.00'></input>\
					<button class='play'><span class='glyphicon glyphicon-play'></span></button>\
					<button class='pause'><span class='glyphicon glyphicon-pause'></span></button>\
					<button class='remove_animation'><span class='glyphicon glyphicon-remove'></span></button>\
					<textarea class='animation_text' placeholder='parameter:\"value\",\nparameter:\"value\",\n...'>left:\"+=100px\",\nbackgroundColor:\"#333333\"</textarea>");
			}
		});

		$(document).on(on.click,".remove_animation",function() {
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
		$(document).on(on.click,".play:not(#controls_play)",function() {
			if (!window.playing) {
				window.queue = [];
				window.endTime = 0;
				window.timeNow = 0;
				clearInterval(window.timeout["main"]);

				$("#controls_clock").text("00:00.00");

				$(".shape").each(function(index) {
					var id = Number(String($(this).attr("id")).replace("shape_",""));
					if (typeof window.memory[id] !== "undefined") {
						$("#shape_" + id)
							.css("height",window.memory[id]["height"])
							.css("width",window.memory[id]["width"])
							.css("top",window.memory[id]["top"])
							.css("left",window.memory[id]["left"])
							.css("opacity",window.memory[id]["opacity"])
							.css("background",window.memory[id]["background"]);
					}
				});

				var button = $(this);
				var id = Number(String($(this).closest(".control_shape").attr("id")).replace("control_shape_",""));
				var animation = String($(this).closest(".animation").find(".animation_text").val());
				var duration = Number($(this).closest(".animation").find(".animation_duration").val()) * 1000;

				if ((animation) && (typeof duration === "number")) {
					window.memory[id] = {
						"height":$("#shape_" + id).css("height"),
						"width":$("#shape_" + id).css("width"),
						"top":$("#shape_" + id).css("top"),
						"left":$("#shape_" + id).css("left"),
						"opacity":$("#shape_" + id).css("opacity"),
						"background":$("#shape_" + id).css("background")
					}

					window.timeout[id] = setTimeout(function() {
						if (typeof window.memory[id] !== "undefined") {
							$("#shape_" + id)
								.css("height",window.memory[id]["height"])
								.css("width",window.memory[id]["width"])
								.css("top",window.memory[id]["top"])
								.css("left",window.memory[id]["left"])
								.css("opacity",window.memory[id]["opacity"])
								.css("background",window.memory[id]["background"]);
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

		$(document).on(on.click,".pause:not(#controls_pause)",function() {
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

		$(document).on(on.click,".restart:not(#controls_restart)",function() {
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
						.css("background",window.memory[id]["background"]);
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
		$(document).on(on.click,"#controls_play",function() {
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
							.css("background",window.memory[id]["background"]);
					}
				});
			}

			window.playing = true;
			
			$("button").addClass("disabled").prop("disabled",true);
			$("input").addClass("disabled").prop("disabled",true);
			$("textarea").addClass("disabled").prop("disabled",true);
			$("label").addClass("disabled").prop("disabled",true);
			$(".control_number").addClass("disabled").prop("disabled",true);

			$(this).hide();
			$("#controls_pause").show().removeClass("disabled").prop("disabled",false);
			$("#controls_restart").removeClass("disabled").prop("disabled",false);

			if (window.queue.length === 0) {
				var queue = [];
				var endTime = 0;

				if (String($("#background_video").find("source").attr("src")).length > 0) {
					var video = document.getElementById("background_video");
					video.currentTime = 0;
					var duration = Number(video.duration) * 1000;
					if (duration > endTime) {
						endTime = duration;
					}
					queue[queue.length] = [duration,"video","stop",0];
				}

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

						window.queue[window.queue.length] = [timestamp,id,animation,duration];

						if ((timestamp + duration) > endTime) {
							endTime = timestamp + duration;
						}

						window.memory[id] = {
							"height":$("#shape_" + id).css("height"),
							"width":$("#shape_" + id).css("width"),
							"top":$("#shape_" + id).css("top"),
							"left":$("#shape_" + id).css("left"),
							"opacity":$("#shape_" + id).css("opacity"),
							"background":$("#shape_" + id).css("background")
						}
					}
				});
		
				var sorted_queue = [];
				sorted_queue[0] = window.queue[0];
				window.queue.splice(0,1);

				while (window.queue.length > 0) {
					var placed = false;
					var i = 0;
					while ((!placed) && (i < sorted_queue.length)) {
						if (Number(window.queue[0][0]) < Number(sorted_queue[i][0])) {
							sorted_queue.splice(i,0,queue[0]);
							window.queue.splice(0,1);
							placed = true;
						}
						else {
							i++;
						}
					}
					if (!placed) {
						sorted_queue.push(window.queue[0]);
						window.queue.splice(0,1);
						placed = true;
					}
				}

				console.log(window.queue)			

				if (endTime) {
					window.queue = sorted_queue;
					window.endTime = endTime;
					window.timeNow = 0;
					var video = document.getElementById("background_video");

					if ((typeof video !== "undefined") && (video.duration > video.currentTime)) {
						video.play();
					}

					window.timeout["main"] = setInterval(function() {
						
						if (window.playing) {
							$(".shape").removeClass("hover");

							while ((window.queue.length > 0) && (window.queue[0][0] < (window.timeNow - 0.0001))) {
								if (window.queue[0][1] === "video") {
									video.pause();
								}
								else {
									try {
										var animation = "$('#shape_" + window.queue[0][1] + "').animate({" + window.queue[0][2] + "}," + window.queue[0][3] + ")";
										console.log(animation);
										eval(animation);
									}
									catch (error) {
										console.log(error);
									}
								}
								
								window.queue.splice(0,1);
							}

							if (window.timeNow >= window.endTime) {
								$("#controls_pause").hide();
								$("#controls_play").show();

								$("button").removeClass("disabled").prop("disabled",false);
								$("input").removeClass("disabled").prop("disabled",false);
								$("textarea").removeClass("disabled").prop("disabled",false);
								$("label").removeClass("disabled").prop("disabled",false);
								$(".control_number").removeClass("disabled").prop("disabled",false);

								window.playing = false;
								window.queue = [];
								window.endTime = 0;
								window.timeNow = 0;
								clearInterval(window.timeout["main"]);
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
			else if ((String($("#background_video").find("source").attr("src")).length > 0) && (document.getElementById("background_video").duration > document.getElementById("background_video").currentTime)) {
				document.getElementById("background_video").play();
			}
		});

		$(document).on(on.click,"#controls_pause",function() {
			window.playing = false;

			$(this).hide();
			$("#controls_play").show();

			$("button").removeClass("disabled").prop("disabled",false);
			$("input").removeClass("disabled").prop("disabled",false);
			$("textarea").removeClass("disabled").prop("disabled",false);
			$("label").removeClass("disabled").prop("disabled",false);
			$(".control_number").removeClass("disabled").prop("disabled",false);

			if (String($("#background_video").find("source").attr("src")).length > 0) {
				document.getElementById("background_video").pause();
			}
		});

		$(document).on(on.click,"#controls_restart",function() {
			window.playing = false;
			window.queue = [];
			window.endTime = 0;
			window.timeNow = 0;
			clearInterval(window.timeout["main"]);
			$(".shape").stop();

			if (String($("#background_video").find("source").attr("src")).length > 0) {
				document.getElementById("background_video").pause();
				document.getElementById("background_video").currentTime = 0;
			}

			$(".shape").each(function(index) {
				var id = Number(String($(this).attr("id")).replace("shape_",""));
				if (typeof window.memory[id] !== "undefined") {
					$("#shape_" + id)
						.css("height",window.memory[id]["height"])
						.css("width",window.memory[id]["width"])
						.css("top",window.memory[id]["top"])
						.css("left",window.memory[id]["left"])
						.css("opacity",window.memory[id]["opacity"])
						.css("background",window.memory[id]["background"]);
				}
			});

			window.memory = {};

			$("#controls_pause").hide();
			$("#controls_play").show();
			
			$("button").removeClass("disabled").prop("disabled",false);
			$("input").removeClass("disabled").prop("disabled",false);
			$("textarea").removeClass("disabled").prop("disabled",false);
			$("label").removeClass("disabled").prop("disabled",false);
			$(".control_number").removeClass("disabled").prop("disabled",false);

			$("#controls_clock").text("00:00.00");
		});

});