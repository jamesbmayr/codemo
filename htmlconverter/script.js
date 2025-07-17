document.querySelector("#input").addEventListener("keyup", convertHTML)
function convertHTML() {
	var input = document.querySelector("#input").value
	
	if (input.length > 0) {
		document.querySelector("#output").innerHTML = ""
		document.querySelector("#output").innerHTML = input
	}
	else {
		document.querySelector("#output").innerHTML = ""
		document.querySelector("#output").innerHTML = ('<span class="helper">...get fixed html here!</span>')
	}
}

document.body.addEventListener("dragover", dragFile)
function dragFile(event) {
	event.preventDefault()
}

document.body.addEventListener("drop", dropFile)
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
		document.querySelector("#input").value = event.target.result || ""
		convertHTML()
	}
}