$(document).ready(function() {

	/* load */
		window.shapeCount = 1;
		resetDraggable();

	/* draggable */
		function resetDraggable() {
			$("#controls").draggable({ handle: "#controls_handle" });
			$(".shape").draggable();
		};

	/* control buttons */
		$(document).on("click",".new_shape",function() {
			var control_shape = $(this).closest(".control_shape");
			$(this).replaceWith("<div class='control_shape_header'><span class='control_number'>" + window.shapeCount + "</span><button class='collapse_shape'><span class='glyphicon glyphicon-chevron-up'></span></button><button class='expand_shape' style='display: none'><span class='glyphicon glyphicon-chevron-down'></span></button><button class='remove_shape'><span class='glyphicon glyphicon-remove'></span></button></div>");
			$(control_shape).append("<textarea class='plot_shape' placeholder='path points'>40 5, 60 5, 82.5 17.5, 95 40, 95 60, 82.5 82.5, 60 95, 40 95, 17.5 82.5, 5 60, 5 40, 17.5 17.5</textarea>");
			$(control_shape).append("<div class='parameters'><div class='preview_frame'><div id='preview_" + window.shapeCount + "' class='preview_shape'></div></div><input type='number' class='shape_size' placeholder='size' value='100'></input><input type='text' class='shape_color' placeholder='color' value='gray'></input></div>");

			$("#zone").append("<div id='shape_" + window.shapeCount + "' class='shape'></div>");
			resetDraggable();
			
			window.shapeCount++;
			$("#controls_scroll").append("<div id='control_shape_" + window.shapeCount + "' class='control_shape'><button class='new_shape'><span class='glyphicon glyphicon-plus'></span></button></div>");
		});

		$(document).on("click",".remove_shape",function() {
			var id = Number(String($(this).closest(".control_shape").attr("id")).replace("control_shape_",""));
			$("#control_shape_" + id).remove();
			$("#shape_" + id).remove();
		});

		$(document).on("click",".collapse_shape",function() {
			$(this).closest(".control_shape").children().hide();
			$(this).closest(".control_shape_header").show();
			$(this).closest(".control_shape_header").find(".expand_shape").show();
			$(this).hide();
		});

		$(document).on("click",".expand_shape",function() {
			$(this).closest(".control_shape").children().show();
			$(this).closest(".control_shape_header").find(".collapse_shape").show();
			$(this).hide();
		});

	/* shape parameters */
		$(document).on("change keyup",".plot_shape",function() {
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
			console.log(path);

			$(this).closest(".control_shape").find(".preview_shape").css("clip-path","polygon(" + path + ")");

			var id = Number(String($(this).closest(".control_shape").attr("id")).replace("control_shape_",""));
			$("#shape_" + id).css("clip-path","polygon(" + path + ")");
		});

		$(document).on("change keyup",".shape_color",function() {
			var color = $(this).val();
			if (color.length < 1) {
				color = "gray";
			}

			$(this).closest(".control_shape").find(".preview_shape").css("background-color", color);

			var id = Number(String($(this).closest(".control_shape").attr("id")).replace("control_shape_",""));
			$("#shape_" + id).css("background-color", color);
		});

		$(document).on("change keyup",".shape_size",function() {
			var size = $(this).val();
			if (size.length < 1) {
				size = 100;
			}

			var id = Number(String($(this).closest(".control_shape").attr("id")).replace("control_shape_",""));
			$("#shape_" + id).css("width", size + "px").css("height", size + "px");
		});

	/* shape hover */
		$(document).on("mouseenter mouseleave",".shape",function() {
			var id = Number(String($(this).attr("id")).replace("shape_",""));

			$(this).toggleClass("hover");
			$("#control_shape_" + id).find(".control_number").toggleClass("hover");
		});

		$(document).on("mouseenter mouseleave",".control_number",function() {
			var id = Number(String($(this).closest(".control_shape").attr("id")).replace("control_shape_",""));

			$("#shape_" + id).toggleClass("hover");
			$(this).toggleClass("hover");
		});
});