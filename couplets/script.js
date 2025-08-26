window.onload = function() {
	/*** globals ***/
		var GOOGLESHEETSURL = "https://script.google.com/macros/s/AKfycbwS3xdj1p76y-9Isk7KOQ-L4OkPOo0MDJJFhpeTATJuWC59h89L/exec"
		var CONTAINER = document.getElementById("content")

	/*** poems ***/
		/* getPoems */
			getPoems()
			function getPoems() {
				var xhr = new XMLHttpRequest()
					xhr.open("GET", GOOGLESHEETSURL)
					xhr.onreadystatechange = displayPoems
					xhr.responseType = "json"
					xhr.setRequestHeader("Accept", "application/json")
					xhr.send()
			}

		/* displayPoems */
			function displayPoems(event) {
				var data = event.target.response
				if (data) {
					// most recent poem first
					for (var d = data.length - 1; d >= 0; d--) {
						if (data[d].title && data[d].author && data[d].text) {
							var poem = document.createElement("div")
								poem.className = "poem " + data[d].author.toLowerCase()
								if (data[d].background) {
									poem.style.background = data[d].background
								}

							CONTAINER.appendChild(poem)

							var title = document.createElement("div")
								title.className = "title"
								title.innerText = data[d].title
							poem.appendChild(title)

							var text = document.createElement("div")
								text.className = "text"
								text.innerText = data[d].text
							poem.appendChild(text)
						}
					}
				}
			}
}