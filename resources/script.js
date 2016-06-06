$(document).ready(function(){

	var demoArray = ["diceRoller","mazeMaker","clipPather","wordCounter","htmlConverter"];

	for (i = 0; i < demoArray.length; i++) {
		$("#demoList").append('<div id="' + demoArray[i] + '" class="demoButton" style="width: calc(100% / ' + demoArray.length + ')">' + demoArray[i] + '</div>');
	}

	$(".demoButton").click(function() {
		$(".selected").removeClass("selected");
		$(this).addClass("selected");
		$("#demo").attr("src", this.id + "/index.html");
	});

});
