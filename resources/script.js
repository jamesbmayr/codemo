$(document).ready(function(){

	var demoArray = ["dice","maze","clippath"];

	for (i = 0; i < demoArray.length; i++) {
		$("#demoList").append('<div id="' + demoArray[i] + '" class="demoButton">' + demoArray[i] + '</div>');
	}

	$(".demoButton").click(function() {
		$(".selected").removeClass("selected");
		$(this).addClass("selected");
		$("#demo").attr("src", this.id + "/index.html");
	});

});