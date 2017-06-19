$(document).ready(function() {

	/* updateWeb */
		window.updateWeb = function() {
			$("#circles").remove();
			$("#lines").remove();

			/* data */
				window.data = [];
				$(".row").each(function() {
					var name = $(this).find("input.name").val() || null;
					var points_to = $(this).find("input.points_to").val() || "";

					if (name) {
						points_to = points_to.split(",") || [];
						for (x in points_to) {
							points_to[x] = points_to[x].trim();
						}
						window.data.push({name: name, to: points_to});
					}
				});

			/* connections */
				for (i in window.data) {
					if (!window.data[i].connections) {
						window.data[i].connections = 1;
					}
					else {
						window.data[i].connections++;
					}

					for (j in window.data[i].to) {
						var target = window.data.find(function (x) {
							return x.name == window.data[i].to[j];
						});

						if (target) {
							if (!target.connections) {
								target.connections = 1;
							}
							else {
								target.connections++;
							}
						}
					}
				}

			/* maximum */
				var maximum = 1;
				for (i in window.data) {
					if (window.data[i].connections > maximum) {
						maximum = window.data[i].connections;
					}
				}

			/* circles */
				var circles = "";
				var arc = 2 * Math.PI / window.data.length;
			
				for (i in window.data) {
					var distance = 10 + (((maximum - window.data[i].connections) / maximum) * 40);

					window.data[i].y = (1 * Math.sin(i * arc));
					window.data[i].x = (1 * Math.cos(i * arc));
					circles += "<div class='circle' title='" + window.data[i].name + "' name='" + window.data[i].name + "' style='top: calc(" + window.data[i].y + "% - 25px); left: calc(" + window.data[i].x + "%  - 25px);'><div>" + window.data[i].name + "</div></div>";
				}

				circles = '<div id="circles">' + circles + "</div>";
				$("body").append(circles);

			/* push gravity */
				var pushTimeout = setTimeout(function() {
					$(".circle").each(function() {
						var circle_top = Number(String($(this).position().top).replace("px","").trim());
						var circle_left = Number(String($(this).position().left).replace("px","").trim());
						var circle_name = $(this).attr("name");

						var to = window.data.find(function(x) {
							return x.name == circle_name;
						}).to;

						var nontargets = window.data.filter(function(x) {
							return ((to.indexOf(x.name) == -1) && (x.name !== circle_name));
						});

						for (i in nontargets) {
							var nontarget_top = Number(String($(".circle[name='" + nontargets[i].name + "']").position().top).replace("px","").trim());
							var nontarget_left = Number(String($(".circle[name='" + nontargets[i].name + "']").position().left).replace("px","").trim());

							var x = nontarget_left - circle_left;
							var y = nontarget_top - circle_top;
							var h = Math.pow((Math.pow(x,2) + Math.pow(y,2)),0.5);

							var circle_z = (300 / window.data.length) / to.length;
							var nontarget_z = (300 / window.data.length) / nontargets[i].to.length;

							var circle_x = (x * circle_z / h);
							var circle_y = (y * circle_z / h);
							var nontarget_x = (x * nontarget_z / h);
							var nontarget_y = (y * nontarget_z / h);

							$(".circle[name='" + circle_name + "']").animate({
								top: "-=" + (circle_y) + "px",
								left: "-=" + (circle_x) + "px"
							},100);


							$(".circle[name='" + nontargets[i].name + "']").animate({
								top: "+=" + (nontarget_y) + "px",
								left: "+=" + (nontarget_x) + "px"
							},100);
						}
					});
				}, 500);
	
			/* pull gravity */
				var pullTimeout = setTimeout(function() {
					$(".circle").each(function() {
						var circle_top = Number(String($(this).position().top).replace("px","").trim());
						var circle_left = Number(String($(this).position().left).replace("px","").trim());
						var circle_name = $(this).attr("name");


						var to = window.data.find(function(x) {
							return x.name == circle_name;
						}).to;

						var targets = window.data.filter(function(x) {
							return to.indexOf(x.name) !== -1;
						});

						for (i in targets) {
							var target_top = Number(String($(".circle[name='" + targets[i].name + "']").position().top).replace("px","").trim());
							var target_left = Number(String($(".circle[name='" + targets[i].name + "']").position().left).replace("px","").trim());

							var x = target_left - circle_left;
							var y = target_top - circle_top;
							var h = Math.pow((Math.pow(x,2) + Math.pow(y,2)),0.5);

							var circle_z = (100 / window.data.length) / to.length;
							var target_z = (100 / window.data.length) / targets[i].to.length;

							var circle_x = (x * circle_z / h);
							var circle_y = (y * circle_z / h);
							var target_x = (x * target_z / h);
							var target_y = (y * target_z / h);


							$(".circle[name='" + circle_name + "']").animate({
								top: "+=" + (circle_y) + "px",
								left: "+=" + (circle_x) + "px"
							},100);


							$(".circle[name='" + targets[i].name + "']").animate({
								top: "-=" + (target_y) + "px",
								left: "-=" + (target_x) + "px"
							},100);
						}
					});
				}, 1500);

			/* lines */
				var lineTimeout = setTimeout(function () {
					var window_height = Number($(window).height());
					var window_width = Number($(window).width());

					var lines = "";
					
					$(".circle").each(function() {
						var circle_top = Number(String($(this).position().top).replace("px","").trim());
						var circle_left = Number(String($(this).position().left).replace("px","").trim());
						var circle_name = $(this).attr("name");

						$(this).css("top", "calc(" + (circle_top * 100 / window_height) + "%)").css("left", "calc(" + (circle_left * 100 / window_width) + "%)");

						var to = window.data.find(function(x) {
							return x.name === circle_name;
						}).to;

						for (j in to) {
							var target = window.data.find(function (x) {
								return x.name == to[j];
							});

							if (target) {
								var target_top = Number(String($(".circle[name='" + target.name + "']").position().top).replace("px","").trim());
								var target_left = Number(String($(".circle[name='" + target.name + "']").position().left).replace("px","").trim());

								lines += "<line x1='" + (((circle_left + 25) * 100 / window_width) + 50) + "' y1='" + (((circle_top + 25) * 100 / window_height) + 50) + "' x2='" + (((target_left + 25) * 100 / window_width) + 50) + "' y2='" + (((target_top + 25) * 100 / window_height) + 50) + "' from='" + circle_name + "' to='" + target.name + "' class='line'/>";
							}
						}
					});

					lines = '<svg id="lines" viewBox="0 0 100 100" height="100" width="100" preserveAspectRatio="none">' + lines + '</svg>';
					$("body").append(lines);
				}, 2500);
		}

	/* listeners */
		/* circle */
			$(document).on("click", ".circle", function() {
				if ($(this).hasClass("center")) {
					$(".circle").removeClass("active from to center");
					$("line").attr("from_active","false").attr("to_active","false");
				}
				else {
					$(".circle").removeClass("active from to center");
					$("line").attr("from_active","false").attr("to_active","false");

					$(this).addClass("active center");
					var name = $(this).attr("name");

					$("line[from='" + name + "']").each(function() {
						console.log("from");
						$(this).attr("to_active","true");
						$(".circle[name='" + $(this).attr("to") + "']").addClass("active to");
					});

					$("line[to='" + name + "']").each(function() {
						console.log("to");
						$(this).attr("from_active","true");
						$(".circle[name='" + $(this).attr("from") + "']").addClass("active from");
					});
				}
			});

		/* toggle */
			$(document).on("click", "#toggle", function() {
				if ($("#overlay").css("display") == "none") {
					$("#overlay").show();
					$("#edit").hide();
					$("#refresh").show();
				}
				else {
					$("#overlay").hide();
					$("#refresh").hide();
					$("#edit").show();
					window.updateWeb();
				}
			});

		/* addRow */
			$(document).on("click", "#addRow", function() {
				$("#rows").append("<div class='row'>\
					<input type='text' class='name' placeholder='name'/>\
					<input type='text' class='points_to' placeholder='points to...'/>\
					<div class='removeRow'>\
						<span class='glyphicon glyphicon-remove'></span>\
					</div>\
				</div>");
			});

		/* removeRow */
			$(document).on("click", ".removeRow", function() {
				var button = $(this);
				var name = $(button).closest(".row").find("input.name").val();

				window.data = window.data.filter(function(x) {
					return x.name !== name;
				});

				$(button).closest(".row").remove();
			});

});
