window.onload = function() {

	/* apiRequest */
		document.querySelectorAll("#go")[0].addEventListener("click", apiRequest)
		function apiRequest() {
			var request = new XMLHttpRequest()

			request.onreadystatechange = function() {
				if (request.readyState == XMLHttpRequest.DONE) {
					if (request.status == 200 && request.responseText) {
						displayQuote(responseText[0])
					}
					else {
						alert("Unable to fetch a quote.")
					}
				}
			}

			request.open("GET", "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand", true)
			request.send()
		}

	/* displayQuote */
		function displayQuote(object) {
			var author = object.title.trim()
				author = author.replace(/(\&\#8217\;)/gi,"'").replace(/(\\u2026)/gi,"").replace(/\&\#8211\;/gi, "-")
			var phrase = object.content.replace(/\<p\>|\<\/p\>|\<\\\/p\>|\n|\\n/gi,"").trim()
				phrase = phrase.replace(/(\&\#8217\;)/gi,"'").replace(/(\\u2026)/gi,"").replace(/\&\#8211\;/gi, "-")

			window.startTime = new Date().getTime()
			window.quote = quote + " -" + author

			document.querySelectorAll("#speed")[0].textContent = "???"
			document.querySelectorAll("#quote")[0].className = ""
			document.querySelectorAll("#quote")[0].innerHTML = "<span>" + window.quote + "</span>"
			document.querySelectorAll("#input")[0].value = ""
			document.querySelectorAll("#input")[0].disabled = false
			document.querySelectorAll("#input")[0].focus()
		}


	/* checkWords */
		document.addEventListener("keyup", checkWords)
		function checkWords(event) {
			if (window.quote) {
				var keyCode = event.which
				var text = document.querySelectorAll("#input")[0].value || ""
				var endTime = new Date().getTime()
				
				var reflection = ""
				for (var l = 0; l < window.quote.length; l++) {
					if (text[l] && window.quote[l] == text[l]) {
						reflection += "<span class='lit'>" + window.quote[l] + "</span>"
					}
					else {
						reflection += "<span>" + window.quote[l] + "</span>"
					}
				}
				document.querySelectorAll("#quote")[0].innerHTML = reflection

				if (text == window.quote) {
					document.querySelectorAll("#quote")[0].className = "complete"
					document.querySelectorAll("#input")[0].disabled = true
					document.querySelectorAll("#speed")[0].textContent = Number(window.quote.split(/\s/gi).length / ((endTime - window.startTime) / 1000 / 60)).toFixed(2)

					window.startTime = null
					window.quote = null
				}
			}
		}

}