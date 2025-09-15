/*** convertHTML ***/
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

/*** drag and drop ***/
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

/*** assetManager ***/
	/* retrieveAsset */
		window.ASSETS_J.retrieveAsset = function(name, type, data) {
			try {
				// html,svg,txt
					document.querySelector("#input").value = data || ""
					convertHTML()
			} catch (error) {console.log(error)}
		}

	/* storeAsset */
		window.ASSETS_J.storeAsset = async function(type) {
			try {
				// html
					return {
						name: "htmlConverter_" + (new Date().getTime()) + ".html",
						type: "html",
						data: document.querySelector("#output").innerHTML
					}
			} catch (error) {console.log(error)}
		}
