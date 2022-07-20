/* globals */
	var STATE = {
		api: "https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand",
		startTime: null,
		quotes: [],
		quote: null
	}

/* elements */
	var ELEMENTS = {
		go: document.querySelector("#go"),
		speed: document.querySelector("#speed"),
		quote: document.querySelector("#quote"),
		input: document.querySelector("#input")
	}

/* requestQuotes */
	function requestQuotes() {
		var request = new XMLHttpRequest()
			request.onreadystatechange = function() {
				if (request.readyState == XMLHttpRequest.DONE) {
					if (request.status == 200) {
						try {
							receiveQuotes(JSON.parse(request.responseText))
						}
						catch (error) { console.log(error) }
					}
					else {
						console.log("Unable to fetch a quote: " + request.status)
					}
				}
			}
			request.open("GET", STATE.api + "&randomnumber=" + Math.floor((Math.random() * 10e6)), true)
			request.send()
	}

/* receiveQuotes */
	function receiveQuotes(quotes) {
		for (var i in quotes) {
			STATE.quotes.push(quotes[i])
		}
		displayQuote()
	}

/* displayQuote */
	displayQuote()
	ELEMENTS.go.addEventListener("click", displayQuote)
	function displayQuote() {
		if (!STATE.quotes.length) {
			requestQuotes()
			return
		}

		var index = Math.floor(Math.random() * STATE.quotes.length)
		var object = STATE.quotes[index]
		var author = cleanString(object.title.rendered.trim())
		var phrase = cleanString(object.content.rendered.replace(/\<p\>|\<\/p\>|\<\\\/p\>|\n|\\n/gi,"").trim())

		STATE.startTime = new Date().getTime()
		STATE.quote = phrase + " -" + author

		ELEMENTS.speed.textContent = "???"
		ELEMENTS.quote.className = ""
		ELEMENTS.quote.innerHTML = "<span>" + STATE.quote + "</span>"
		ELEMENTS.input.value = ""
		ELEMENTS.input.disabled = false
		ELEMENTS.input.focus()

		STATE.quotes.splice(index, 1)
	}

/* cleanString */
	function cleanString(str) {
		return str.replace(/\“/g, '"').replace(/\”/g, '"').replace(/\’/g, "'").replace(/\‘/g, "'").replace(/\—/g, "-").replace(/\&\#8217\;|\&\#8216\;|\&\#8242\;/gi,"\'").replace(/\&\#8220\;|\&\#8221\;|\&\#8243\;/gi,"\"").replace(/\&\#8211\;|\&\#8212\;/gi, "-").replace(/\\u2026/gi,"...").replace(/(<([^>]+)>)/ig,"").trim()
	}

/* checkWords */
	ELEMENTS.input.addEventListener("keyup", checkWords)
	function checkWords(event) {
		if (STATE.quote) {
			var keyCode = event.which
			var text = ELEMENTS.input.value || ""
			var endTime = new Date().getTime()
			
			var reflection = ""
			for (var l = 0; l < STATE.quote.length; l++) {
				if (text[l] && STATE.quote[l] == text[l]) {
					reflection += "<span class='correct'>" + STATE.quote[l] + "</span>"
				}
				else if (text[l]) {
					reflection += "<span class='incorrect'>" + STATE.quote[l] + "</span>"
				}
				else {
					reflection += "<span>" + STATE.quote[l] + "</span>"	
				}
			}
			ELEMENTS.quote.innerHTML = reflection

			if (text == STATE.quote) {
				ELEMENTS.quote.className = "complete"
				ELEMENTS.input.disabled = true
				ELEMENTS.speed.textContent = Number(STATE.quote.split(/\s/gi).length / ((endTime - STATE.startTime) / 1000 / 60)).toFixed(2)

				STATE.startTime = null
				STATE.quote = null
			}
		}
	}
