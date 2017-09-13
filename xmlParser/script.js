function ready() {

	/* displayResults */
		document.getElementById("submit").addEventListener("click", function() {
			var input = document.getElementById("input").value
			if (input && input.length > 0) {
				var results = parseXML(input)
				console.log(results)
				var html = buildOut(results)
				document.getElementById("output-tree").innerHTML = html
				document.getElementById("output-json").innerText = JSON.stringify(results, null, 2, 2)
			}
		})

	/* buildOut */
		function buildOut(json) {
			if (!html) {
				var html = ""
			}

			if (Array.isArray(json)) {
				for (var i in json) {
					html += "<details><summary>[" + i + "]</summary>" + buildOut(json[i]) + "</details>"
				}
			}
			else if (typeof json == "object") {
				var keys = Object.keys(json)
				for (var k in keys) {
					html += "<details><summary>." + [keys[k]] + "</summary>" + buildOut(json[keys[k]]) + "</details>"
				}
			}
			else {
				html += "<div>" + json + "</div>"
			}
				
			return html
		}

	/* randomString */
		function randomString() {
			var set = "0123456789abcdefghijklmnopqrstuvwxyz"
			var string = ""
			while (string.length < 16) {
				string += set[Math.floor(Math.random() * 36)]
			}
			return "_" + string
		}

	/* parseXML */
		function parseXML(xml) {

		//store all data at this level in a temporary object
			if (!tempObj || tempObj == undefined) {
				var tempObj = {}
					tempObj["escape"] = 0
			}

			var outerIndex = randomString()
			tempObj[outerIndex] = {}

		//loop through the xml at this level
			while (xml.length && tempObj["escape"] < 100) {
				//create temporary object
					var innerIndex = randomString()
					tempObj[innerIndex] = {}
					tempObj["escape"] = tempObj["escape"] + 1

				//get tag and element
					var element = xml.substring(0, xml.indexOf(">") + 1)
					var tagName = element.substring(1, Math.min((element.indexOf(" ") + 1) || (element.length + 1), (element.indexOf(">") + 1) || (element.length + 1)) - 1).replace("/","")

				//self closing?
					if (element.substring(element.length - 2, element.length - 1) == "/") {
						var selfClosing = true
					}
					else if (xml.indexOf("</" + tagName + ">") == -1) {
						var selfClosing = true
					}
					else if (element.indexOf("</") !== -1) {
						var selfClosing = true
					}
					else {
						var tagCount = 1
						var index = tagName.length

						while (tagCount && index < xml.length) {
							if (xml.indexOf("<" + tagName, index) == index) {
								tagCount++
							}
							else if ((xml.indexOf("</" + tagName, index) == index) || (xml.indexOf("< /" + tagName, index) == index) || (xml.indexOf("</ " + tagName, index) == index) || (xml.indexOf("< / " + tagName, index) == 0)) {
								tagCount--
							}
							index++
						}

						if (tagCount) {
							selfClosing = true
						}
						else {
							selfClosing = false
							var closingIndex = index - 1
						}
					}

				//get parameters
					var parameters = element.replace("<" + tagName, "")
						parameters = parameters.substring(0, parameters.length - 1).trim()

					if (parameters.length > 0) {
						parameters = parameters.split(/\"|\'/g)
						
						if (parameters.length == 1) {
							parameters = parameters.join().split(/\s|\=/g)
						}
						
						if (Array.isArray(parameters) && parameters.length > 1) {
							for (var p = 0; p < parameters.length; p += 2) {

								if ((parameters[p].length > 0) && (parameters[p] !== "/")) {
									var key = parameters[p].replace("=", "").trim()
									var value = parameters[p + 1]

									tempObj[innerIndex][key] = value
								}
							}
						}
					}

				//get data & run recursively
					if (!selfClosing) {
						var data = xml.substring(element.length, closingIndex).trim()

						if (data.indexOf("\n") == 0) {
							data = data.substring(1, data.length).trim()
						}
						if (data.lastIndexOf("\n") == data.length - 1) {
							data = data.substring(0, data.length - 1).trim()
						}

						if ((data.indexOf("<") == 0) && (tempObj["escape"] < 100)) {
							tempObj["escape"] = tempObj["escape"] + 1
							
							var tempData = parseXML(data)
							var tempDataKeys = Object.keys(tempData)
							
							for (var t in tempDataKeys) {
								tempObj[innerIndex][tempDataKeys[t]] = tempData[tempDataKeys[t]]
							}
						}
						else if (data.length) {
							if (isNaN(Number(data))) {
								tempObj[innerIndex]._ = data.trim()
							}
							else {
								tempObj[innerIndex]._ = Number(data)
							}
						}
					}

				//consolidate parameters if one or none
					var keys = Object.keys(tempObj[innerIndex])
					if ((keys.length == 1) && (keys[0] == "_")) {
						tempObj[innerIndex] = tempObj[innerIndex][keys[0]]
					}
					else if (keys.length == 0) {
						tempObj[innerIndex] = true
					}


				//remove section from xml string
					if (!selfClosing) {
						xml = xml.substring(closingIndex + tagName.length + 3, xml.length)
					}
					else {
						xml = xml.substring(element.length, xml.length)
					}

					if (xml.indexOf("\n") == 0) {
						xml = xml.substring(1, xml.length)
					}
					if (xml.lastIndexOf("\n") == xml.length - 1) {
						xml = xml.substring(0, xml.length - 1)
					}

					xml = xml.trim()

				//add temporary object (or string) to json tree
					if (tempObj[outerIndex][tagName] && tempObj[outerIndex][tagName] !== undefined) {
						tempObj[outerIndex][tagName].push(tempObj[innerIndex])
					}
					else {
						tempObj[outerIndex][tagName] = [tempObj[innerIndex]]
					}

			}

		//consolidate arrays of one
			var tagNames = Object.keys(tempObj[outerIndex])
			for (var t in tagNames) {
				if (tempObj[outerIndex][tagNames[t]].length == 1) {
					tempObj[outerIndex][tagNames[t]] = tempObj[outerIndex][tagNames[t]][0]
				}
			}

		//return this object to the higher level
			return tempObj[outerIndex]
		}
}
