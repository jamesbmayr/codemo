$(document).ready(function() {

	//redPath
		$(document).on("click", "#redText", function() {
			updatePath("red");
		});

		$(document).on("keyup", "#redText", function(key) {
			updatePath("red");
		});

	//greenPath
		$(document).on("click", "#greenText", function() {
			updatePath("green");
		});

		$(document).on("keyup", "#greenText", function(key) {
			updatePath("green");
		});

	//bluePath
		$(document).on("click", "#blueText", function() {
			updatePath("blue");
		});

		$(document).on("keyup", "#blueText", function(key) {
			updatePath("blue");
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