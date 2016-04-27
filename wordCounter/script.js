$(document).ready(function() {
	$('textarea').keyup(function() {
		var label = $(this).parent().prev();
		var text = $(this).val();
					
		if (text.length === 0) {
			var wordCount = 0;
			var characterCount = 0;
			var longestWord = "";
		}
		else {
			var characterCount = text.length;

			while (text.indexOf("  ") > 0) {
				text = text.replace("  "," ");
			}
			text = text.trim();
			text = text.split(" ");
			var wordCount = text.length;

			var longestWord = "";
			for (i = 0; i < text.length; i++) {
				if (text[i].length > longestWord.length) {
					longestWord = text[i];
				}
			}

		}

		$("#wordCount").text(wordCount);
		$("#characterCount").text(characterCount);
		$("#longestWordLength").text(longestWord.length);

	});
});