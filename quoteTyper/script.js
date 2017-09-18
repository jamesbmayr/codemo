window.onload = function() {

	/* apiRequest */
		document.querySelectorAll("#go")[0].addEventListener("click", apiRequest)
		function apiRequest() {
			var request = new XMLHttpRequest()

			request.onreadystatechange = function() {
				if (request.readyState == XMLHttpRequest.DONE) {
					if (request.status == 200) {
						try {
							console.log("Quote fetched.")
							eval(request.responseText)
						}
						catch (error) {
							console.log(error)
						}
					}
					else {
						console.log("Unable to fetch a quote: " + request.status)
					}
				}
			}

			request.open("GET", "//quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=40&_jsonp=displayQuote&callback=?", true)
			request.send()
		}

	/* displayQuote */
		function displayQuote(objects) {
			var object = objects[Math.floor(Math.random() * objects.length)]
			var author = object.title.trim()
				author = author.replace(/\&\#8217\;|\&\#8216\;|\&\#8242\;/gi,"\'").replace(/\&\#8220\;|\&\#8221\;|\&\#8243\;/gi,"\"").replace(/\&\#8211\;|\&\#8212\;/gi, "-").replace(/\\u2026/gi,"...")
			var phrase = object.content.replace(/\<p\>|\<\/p\>|\<\\\/p\>|\n|\\n/gi,"").trim()
				phrase = phrase.replace(/\&\#8217\;|\&\#8216\;|\&\#8242\;/gi,"\'").replace(/\&\#8220\;|\&\#8221\;|\&\#8243\;/gi,"\"").replace(/\&\#8211\;|\&\#8212\;/gi, "-").replace(/\\u2026/gi,"...")

			window.startTime = new Date().getTime()
			window.quote = phrase + " -" + author

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
						reflection += "<span class='correct'>" + window.quote[l] + "</span>"
					}
					else if (text[l]) {
						reflection += "<span class='incorrect'>" + window.quote[l] + "</span>"
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