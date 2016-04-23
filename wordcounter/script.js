$(document).ready(function() {
	$('textarea').keyup(function() {
		var label = $(this).parent().prev();
		var text = $(this).val();
					
		if (text.length === 0) {
			var count = 0;
		}
		else {
			while (text.indexOf("  ") > 0) {
				text = text.replace("  "," ");
			}
			text = text.trim();
			text = text.split(" ");
			var count = text.length;
		}

		$('.wordCounter').remove();
		$(label).append('<span class="wordCounter" style="color: red"> '+count+'</span>');
	});
});