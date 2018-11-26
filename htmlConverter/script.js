$(document).ready(function(){

	$("#input").keyup(function() {
		var input = $("#input").val();
		
		if (input.length > 0) {
			$("#output").empty();
			$("#output").append(input);
		}
		else {
			$("#output").empty();
			$("#output").append('<span class="helper">...get fixed html here!</span>');
		}
	});

});