window.onload = function() {

	/* create page */
		var demoArray = ["hexSequencer", "pencilPather", "brickBreaker", "blockDescender", "metroMapper", "snakeSnacker", "wordShuffler", "quoteTyper", "hueMatcher", "xmlParser","pitchPlayer","dotConnector","numberCruncher","bladesDodger","webDepictor","weatherExplorer","pixelPainter","sphereCollector","codeRunner","shapeAnimator","tickTocker","balloonPopper","robotDirector","colorFlooder","diceRoller","chordAnalyzer","wordFinder","mazeMaker","htmlConverter","tileSlider","wordCounter","clipPather"]
			demoArray = demoArray.sort()

		for (i = 0; i < demoArray.length; i++) {
			var option = document.createElement("option")
				option.id = demoArray[i]
				option.value = demoArray[i]
				option.innerText = demoArray[i]
			document.getElementById("demoList").appendChild(option)
		}

	/* load from hash */
		if (String(location.hash).length > 0) {
			var selected = String(location.hash).replace("#","")
			document.getElementById(selected).setAttribute("selected","true")
			document.getElementById("demo").setAttribute("src", selected + "/index.html")
		}
		else {
			var random = Math.floor(Math.random() * demoArray.length)
			var selected = demoArray[random]
			
			document.getElementById(selected).setAttribute("selected","true")
			document.getElementById("demo").setAttribute("src", selected + "/index.html")
		}

	/* listeners */
		document.getElementById("demoList").addEventListener("change", function(event) {
			var selected = event.target.value
			location.hash = selected
			document.getElementById("demo").setAttribute("src", selected + "/index.html")
		})

}
