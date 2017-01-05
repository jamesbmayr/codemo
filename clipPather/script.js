$(document).ready(function() {

	//listeners
		$(document).on("click","textarea", function() {
			updatePath(String(this.id).replace("Text",""));
		});

		$(document).on("keyup","textarea", function() {
			updatePath(String(this.id).replace("Text",""));
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