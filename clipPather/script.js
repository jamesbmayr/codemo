$(document).ready(function() {

	//textarea listener
		$(document).on("click","textarea", function() {
			updatePath(String(this.id).replace("Text",""));
		});

		$(document).on("keyup","textarea", function() {
			updatePath(String(this.id).replace("Text",""));
		});

	//slide button listener
		$(document).on("click","#adjust", function() {
			var color = $("#color").val();
			var direction = $("#direction").val();
			var distance = $("#distance").val() || false;

			if (distance) {
				var points = $("#" + color + "Text").val() || false;
				
				if (points) {
					points = points.split(/\s?,\s?/gi);
					
					for (i in points) {
						coordinates = points[i].split(/\s/);
						var x = Number(coordinates[0].replace(/\%/g,""));
						var y = Number(coordinates[1].replace(/\%/g,""));

						if (direction == "x") {
							x = x + Number(distance);
						}
						else if (direction == "y") {
							y = y + Number(distance);
						}

						var newCoordinates = x + "% " + y + "%";
						points[i] = newCoordinates;
					}

					points.join(", ");
					$("#" + color + "Text").val(points);

					updatePath(color);
				}
			}
		});

	//updatePath
		var updatePath = function(color) {
			var path = $("#" + color + "Text").val();
			if (path.length < 1) {
				path = "0% 0%";
			}
				console.log(color + "Path is " + path);
			$("#" + color + "Path").css("clip-path","polygon(" + path + ")");
			$("#" + color + "Path").css("webkit-clip-path","polygon(" + path + ")");
		}


});