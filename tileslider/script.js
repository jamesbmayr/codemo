/* triggers */
	if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
		var on = { click: "touchstart", mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend", dragover: "dragover", drop: "drop" }
	}
	else {
		var on = { click:      "click", mousedown:  "mousedown", mousemove: "mousemove", mouseup:  "mouseup", dragover: "dragover", drop: "drop" }
	}

/* load */
	createPuzzle()

/* listeners */
	function clickTrigger(event) {
		if (window.playing) {
			var coordinates = event.target.getAttribute("value")
				var x = Number(coordinates.split(",")[0])
				var y = Number(coordinates.split(",")[1])

			var emptyCoordinates = document.querySelector(".trigger.empty").getAttribute("value")
				var emptyX = Number(emptyCoordinates.split(",")[0])
				var emptyY = Number(emptyCoordinates.split(",")[1])
			
			slideTile(emptyX,emptyY,x,y)
		}
	}

	document.querySelector("#refresh").addEventListener(on.click, createPuzzle)
	document.querySelector("body").addEventListener(on.dragover, dragImage)
	document.querySelector("body").addEventListener(on.drop, dropImage)

/* dragImage */
	function dragImage(event) {
		event.preventDefault()
	}

/* dropImage */
	function dropImage(event) {
		try {
			// defaults
				event.preventDefault()
				if (!event.dataTransfer || !event.dataTransfer.items) {
					return
				}

			// file
				const file = [...event.dataTransfer.items][0].getAsFile()
				if (!file) {
					return
				}
				const imageTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif", "image/webp", "image/bmp", "image/tiff", "image/svg+xml"]
				if (!imageTypes.includes(file.type)) {
					return
				}

			// read file
				let reader = new FileReader()
					reader.onload = function(event) {
						document.querySelector("#url").value = event.target.result
						createPuzzle()
					}
					reader.readAsDataURL(file)
		} catch (error) {console.log(error)}
	}

/* createPuzzle */
	function createPuzzle() {
		/* reset */
			window.playing = false;
			window.moveCount = 0;
			document.querySelector("#tiles").innerHTML = ""
			document.querySelector("#tiles").style.opacity = 1
			document.querySelector("#triggers").innerHTML = ""
			document.querySelector("#victoryOuter").style.opacity = 0

		/* gridSize */
			var gridSize = document.querySelector("#gridSize").value 

			if (!(gridSize.length > 0)) {
				gridSize = 4
			}

			window.gridSize = gridSize

		/* image */
			var hash = String(location.hash).replace("#","")
			var userInput = document.querySelector("#url").value

			if (userInput.length > 0) {
				var image = userInput
			}
			else if (hash.length > 0) {
				var image = hash
			}
			else {
				var image = "images/" + gridSize + ".png"
			}

		/* tiles & triggers */
			var block = (100 / gridSize)
			var tiles = document.querySelector("#tiles")
			var triggers = document.querySelector("#triggers")

			for (y = 0; y < gridSize; y++) {
				for (x = 0; x < gridSize; x++) {
					var tile = document.createElement("div")
						tile.className = "tile"
						tile.setAttribute("value", x + "," + y)
						tile.setAttribute("home", x + "," + y)
						tile.style.clipPath = "polygon(" + block * (x) + "% " + block * (y) + "%, " + block * (x + 1) + "% " + block * (y) + "%, " + block * (x + 1) + "% " + block * (y + 1) + "%, " + block * (x) + "% " + block * (y + 1) + "%)"
						tile.style.backgroundImage = "url(" + image + ")"
					tiles.appendChild(tile)

					var trigger = document.createElement("button")
						trigger.className = "trigger"
						trigger.setAttribute("value", x + "," + y)
						trigger.setAttribute("home", x + "," + y)
						trigger.style.top = "calc(100% / " + gridSize + " * " + y + ")"
						trigger.style.left = "calc(100% / " + gridSize + " * " + x + ")"
						trigger.style.width = "calc(100% / " + gridSize + ")"
						trigger.style.height = "calc(100% / " + gridSize + ")"
						trigger.addEventListener(on.click, clickTrigger)
					triggers.appendChild(trigger)
				}
			}

		/* empty */
			document.querySelector(".tile[value='" + (gridSize - 1) + "," + (gridSize - 1) + "']").remove()
			document.querySelector(".trigger[value='" + (gridSize - 1) + "," + (gridSize - 1) + "']").className += " empty"

		/* slide */
			var emptyX = Number(gridSize - 1)
			var emptyY = Number(gridSize - 1)

			for (i = 0; i < (gridSize * gridSize * gridSize * gridSize); i++) {			
				var options = [[emptyX + 1,emptyY],[emptyX - 1,emptyY],[emptyX,emptyY + 1],[emptyX,emptyY - 1]]
				do {
					var r = Math.floor(Math.random() * options.length)
				}
				while ((options[r][0] > gridSize - 1) || (options[r][1] > gridSize - 1) || (options[r][0] < 0) || (options[r][1] < 0))

				slideTile(emptyX, emptyY, options[r][0], options[r][1])

				emptyX = options[r][0]
				emptyY = options[r][1]
			}

			window.playing = true
	}

/* slideTile */
	function slideTile(emptyX,emptyY,x,y) {
		/* slideTime */
			if (window.playing) {
				slideTime = 1000
			}
			else {
				slideTime = 200
			}

		/* do the sliding */
			if ((x + 1 === emptyX) && (y === emptyY)) {
				//slide right
					var thisTrigger = document.querySelector(".trigger.empty")
						thisTrigger.className = thisTrigger.className.replace(/\s?empty/,"")
					
					document.querySelector(".trigger[value='" + x + "," + y + "']").className += " empty"

					var thisTile = document.querySelector(".tile[value='" + x + "," + y + "']")
						thisTile.setAttribute("value", emptyX + "," + emptyY)
					setTimeout(function() {
						thisTile.style.left = (Number(thisTile.style.left.replace("%", "")) + (100 / gridSize)) + "%"
					}, 0)
			}
			else if ((x - 1 === emptyX) && (y === emptyY)) {
				//slide left
					var thisTrigger = document.querySelector(".trigger.empty")
						thisTrigger.className = thisTrigger.className.replace(/\s?empty/,"")
					
					document.querySelector(".trigger[value='" + x + "," + y + "']").className += " empty"
					
					var thisTile = document.querySelector(".tile[value='" + x + "," + y + "']")
						thisTile.setAttribute("value", emptyX + "," + emptyY)
					setTimeout(function() {
						thisTile.style.left = (Number(thisTile.style.left.replace("%", "")) - (100 / gridSize)) + "%"
					}, 0)
			}
			else if ((x === emptyX) && (y + 1 === emptyY)) {
				//slide down
					var thisTrigger = document.querySelector(".trigger.empty")
						thisTrigger.className = thisTrigger.className.replace(/\s?empty/,"")
					
					document.querySelector(".trigger[value='" + x + "," + y + "']").className += " empty"
					
					var thisTile = document.querySelector(".tile[value='" + x + "," + y + "']")
						thisTile.setAttribute("value", emptyX + "," + emptyY)
					setTimeout(function() {
						thisTile.style.top = (Number(thisTile.style.top.replace("%", "")) + (100 / gridSize)) + "%"
					}, 0)
			}
			else if ((x === emptyX) && (y - 1 === emptyY)) {
				//slide up
					var thisTrigger = document.querySelector(".trigger.empty")
						thisTrigger.className = thisTrigger.className.replace(/\s?empty/,"")
					
					document.querySelector(".trigger[value='" + x + "," + y + "']").className += " empty"
					
					var thisTile = document.querySelector(".tile[value='" + x + "," + y + "']")
						thisTile.setAttribute("value", emptyX + "," + emptyY)
					setTimeout(function() {
						thisTile.style.top = (Number(thisTile.style.top.replace("%", "")) - (100 / gridSize)) + "%"
					}, 0)
			}

		/* victory? */
			if (window.playing) {
				//update moveCount
					window.moveCount = window.moveCount + 1

				//determine victory
					var victory = true
					var x = 0
					var y = 0

					Array.from(document.querySelectorAll(".tile")).forEach(function(tile){
						if (tile.getAttribute("value") !== tile.getAttribute("home")) {
							victory = false
						}
					})

				//animate victory
					if (victory) {
						document.querySelector("#triggers").innerHTML = ""
						document.querySelector("#moveCount").innerText = window.moveCount + " moves"
						
						document.querySelector("#tiles").style.opacity = 0
						
						document.querySelector("#victoryOuter").style.opacity = 1
						
						window.playing = false
					}
			}
	}
