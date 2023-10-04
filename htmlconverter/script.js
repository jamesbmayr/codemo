document.querySelector("#input").addEventListener("keyup", function() {
	var input = document.querySelector("#input").value
	
	if (input.length > 0) {
		document.querySelector("#output").innerHTML = ""
		document.querySelector("#output").innerHTML = input
	}
	else {
		document.querySelector("#output").innerHTML = ""
		document.querySelector("#output").innerHTML = ('<span class="helper">...get fixed html here!</span>')
	}
})
