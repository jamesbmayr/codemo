$(document).ready(function(){

	/* create page */
		var demoArray = ["hueMatcher", "xmlParser","pitchPlayer","dotConnector","numberCruncher","bladesDodger","webDepictor","weatherExplorer","pixelPainter","sphereCollector","codeRunner","shapeAnimator","tickTocker","balloonPopper","robotDirector","colorFlooder","diceRoller","chordAnalyzer","wordFinder","mazeMaker","htmlConverter","tileSlider","wordCounter","clipPather"];

		for (i = 0; i < demoArray.length; i++) {
			$("#demoList").append('<option id="' + demoArray[i] + '" value="' + demoArray[i] + '">' + demoArray[i] + '</option>');
		}

	/* load from hash */
		if (String(location.hash).length > 0) {
			var selected = String(location.hash).replace("#","");
			$("#" + selected).attr("selected","true");
			$("#demo").attr("src", selected + "/index.html");
		}
		else {
			var array = $("option").toArray();
			var random = Math.floor(Math.random() * demoArray.length);
			var selected = array[random].value;
			
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
