$(document).ready(function(){

	/* create page */
		var demoArray = ["colorFlooder","diceRoller","chordAnalyzer","wordFinder","mazeMaker","htmlConverter","wordCounter","clipPather",];

		for (i = 0; i < demoArray.length; i++) {
			$("#demoList").append('<option id="' + demoArray[i] + '" value="' + demoArray[i] + '">' + demoArray[i] + '</option>');
		}

	/* load from hash */
		if (String(location.hash).length > 0) {
			var selected = String(location.hash).replace("#","");
			$("#" + selected).attr("selected","true");
			$("#demo").attr("src", selected + "/index.html");
		}

	/* listeners */
		$("#demoList").change(function() {
			var selected = $(this).val();
			location.hash = selected;
			$("#demo").attr("src", selected + "/index.html");
		});

});
