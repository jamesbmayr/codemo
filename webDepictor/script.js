$(document).ready(function() {

	/* data */
		// window.data = [
		// 	{name: "AAA", to: ["BBB","CCC","DDD","EEE","III"]},
		// 	{name: "BBB", to: ["CCC","EEE","GGG"]},
		// 	{name: "CCC", to: ["DDD","HHH"]},
		// 	{name: "DDD", to: ["AAA","CCC","EEE","III"]},
		// 	{name: "EEE", to: ["BBB","HHH","FFF"]},
		// 	{name: "FFF", to: ["AAA","CCC","DDD","GGG"]},
		// 	{name: "GGG", to: ["BBB","CCC","KKK"]},
		// 	{name: "HHH", to: ["AAA"]},
		// 	{name: "III", to: ["CCC","DDD","FFF"]},
		// 	{name: "JJJ", to: ["LLL"]},
		// 	{name: "KKK", to: ["BBB","AAA","GGG"]},
		// 	{name: "LLL", to: ["JJJ"]},
		// ];

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

					window.data[i].y = 50 + (distance * Math.sin(i * arc));
					window.data[i].x = 50 + (distance * Math.cos(i * arc));
					circles += "<div class='circle' title='" + window.data[i].name + "' name='" + window.data[i].name + "' style='top: calc(" + window.data[i].y + "% - 25px); left: calc(" + window.data[i].x + "%  - 25px);'><div>" + window.data[i].name + "</div></div>";
				}

				circles = '<div id="circles">' + circles + "</div>";
				$("body").append(circles);

			/* lines */
				var lines = "";
				
				for (i in window.data) {
					for (j in window.data[i].to) {
						var target = window.data.find(function (x) {
							return x.name == window.data[i].to[j];
						});

						if (target) {
							lines += "<line x1='" + window.data[i].x + "' y1='" + window.data[i].y + "' x2='" + target.x + "' y2='" + target.y + "' from='" + window.data[i].name + "' to='" + target.name + "' class='line'/>";
						}
					}
				}

				lines = '<svg id="lines" viewBox="0 0 100 100" height="100" width="100" preserveAspectRatio="none">' + lines + '</svg>';
				$("body").append(lines);
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