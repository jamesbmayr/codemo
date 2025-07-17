document.querySelector("textarea").addEventListener("input", countWords)
function countWords(event) {
	var text = document.querySelector("textarea").value
				
	if (text.length === 0) {
		var wordCount = 0
		var characterCount = 0
		var longestWord = ""
	}
	else {
		var characterCount = text.length

		while (text.indexOf("  ") > 0) {
			text = text.replace("  ", " ")
		}
		text = text.trim()
		text = text.split(" ")
		var wordCount = text.length

		var longestWord = ""
		for (i = 0; i < text.length; i++) {
			if (text[i].length > longestWord.length) {
				longestWord = text[i]
			}
		}

	}

	document.querySelector("#wordCount").innerText = wordCount
	document.querySelector("#characterCount").innerText = characterCount
	document.querySelector("#longestWordLength").innerText = longestWord.length

}

document.querySelector("textarea").addEventListener("dragover", dragFile)
function dragFile(event) {
	event.preventDefault()
}

document.querySelector("textarea").addEventListener("drop", dropFile)
function dropFile(event) {
	event.preventDefault()
	if (!event.dataTransfer || !event.dataTransfer.items) {
		return
	}
	var file = [...event.dataTransfer.items][0].getAsFile()
	if (!file) {
		return
	}

	var reader = new FileReader()
	reader.readAsText(file)
	reader.onload = function(event) {
		document.querySelector("textarea").value = event.target.result || ""
		countWords()
	}
}