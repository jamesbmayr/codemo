window.onload = function() {
	/*** globals ***/
		/* triggers */
			if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
				var ON = { click: "touchstart", mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend", mouseenter: "touchmove" }
			}
			else {
				var ON = { click:      "click", mousedown:  "mousedown", mousemove: "mousemove", mouseup:  "mouseup", mouseenter: "mouseenter" }
			}

		/* elements */
			var CONTAINER = document.getElementById("container")
			var OVERLAY = document.getElementById("overlay")
			var RESET = document.getElementById("overlay-reset")

		/* constants */
			var CIRCLE_DEGREES = 360
			var RADIUS_PERCENTAGE = 50
			var TOTAL_HUES = 256
			var SHUFFLE_SHIFTING_PROBABILITY = 0.5

		/* styling */
			var RADIUS_MARGIN = 10
			var COLOR_SECTIONS = 8
			var KEY_SPOKE_MARGIN = 1

		/* settings */
			var CIRCLE_SECTIONS = 12
			var KEY_LAYERS = 4
			var KEY_LENGTHS = 6
			var KEY_SPOKES = 6
			var KEY_SPOKE_PROBABILITY = 0.75
			var KEY_SHUFFLES = 100

		/* state */
			var GET = {}
			var GAMESTATE = {}

		/* buildGet */
			buildGet()
			function buildGet() {
				// query parameters?
					if (location.search && location.search.length > 1) {
						var queryString = location.search.slice(1).split("&")
						for (var i in queryString) {
							var pair = queryString[i].split("=")
							GET[pair[0]] = pair[1]
						}
					}

				// update constants
					KEY_LAYERS      = !isNaN(GET.layers)   ? Number(GET.layers)   : KEY_LAYERS
					KEY_SPOKES      = !isNaN(GET.spokes)   ? Number(GET.spokes)   : KEY_SPOKES
					KEY_LENGTHS     = !isNaN(GET.lengths)  ? Number(GET.lengths)  : KEY_LENGTHS
					CIRCLE_SECTIONS = !isNaN(GET.sections) ? Number(GET.sections) : CIRCLE_SECTIONS
			}

	/*** game ***/
		/* createGame */
			createGame()
			RESET.addEventListener(ON.click, createGame)
			function createGame() {
				// clear container
					CONTAINER.innerHTML = ""

				// reset gamestate
					GAMESTATE = {
						playing: true,
						shifting: false,
						key: null,
						hole: null,
					}

				// create key
					GAMESTATE.key = createKey()

				// create hole
					GAMESTATE.hole = createHole()

				// shuffle key
					shuffleKey()

				// styling
					OVERLAY.setAttribute("invisible", true)
					CONTAINER.removeAttribute("gamemover")
			}

		/* createKey */
			function createKey() {
				// element
					var keyElement = document.createElement("div")
						keyElement.className = "key"
						keyElement.id = "key"
					CONTAINER.appendChild(keyElement)

				// layers
					var key = {
						element: keyElement,
						layers: []
					}

					for (var i = 0; i < KEY_LAYERS; i++) {
						var layer = createKeyLayer(i, keyElement)
						key.layers.push(layer)
					}

				// center
					var centerElement = document.createElement("div")
						centerElement.className = "key-center"
						centerElement.style.height = RADIUS_MARGIN + "%"
						centerElement.style.width = RADIUS_MARGIN + "%"
					keyElement.appendChild(centerElement)

				// return
					return key
			}

		/* createKeyLayer */
			function createKeyLayer(i, keyElement) {
				// layer
					var layer = {
						spokes: [],
						rotation: 0,
						element: null
					}

				// spokes
					for (var j = 0; j < KEY_SPOKES; j++) {
						if (Math.random() > KEY_SPOKE_PROBABILITY) {
							continue
						}

						var longness = Math.floor(Math.random() * (KEY_LENGTHS - KEY_SPOKE_MARGIN)) + KEY_SPOKE_MARGIN + 1

						do {
							var angle = Math.floor(Math.random() * CIRCLE_SECTIONS) * (CIRCLE_DEGREES / CIRCLE_SECTIONS)
						}
						while (layer.spokes.length < CIRCLE_SECTIONS && layer.spokes.find(function(s) { return s.angle == angle }))
						
						layer.spokes.push({
							angle: angle,
							longness: longness
						})
					}

				// color
					var chunk = TOTAL_HUES / COLOR_SECTIONS
					var color = "rgb(" + (Math.floor(Math.random() * COLOR_SECTIONS) * chunk) + "," + (Math.floor(Math.random() * COLOR_SECTIONS) * chunk) + "," + (Math.floor(Math.random() * COLOR_SECTIONS) * chunk) + ")"

				// radius
					var longnessUnit = (RADIUS_PERCENTAGE - RADIUS_MARGIN) / KEY_LENGTHS

				// layer element
					var layerElement = document.createElement("div")
						layerElement.className = "key-layer"
						layerElement.id = "key-layer-" + i
					keyElement.appendChild(layerElement)
					layer.element = layerElement

				// spoke elements
					for (var k in layer.spokes) {
						var spokeElement = document.createElement("div")
							spokeElement.className = "key-spoke"
							spokeElement.style.backgroundColor = color
							spokeElement.style.height = (RADIUS_MARGIN + longnessUnit * layer.spokes[k].longness) + "%"
							spokeElement.style.transform = "translateX(-50%) rotate(" + layer.spokes[k].angle + "deg)"
							spokeElement.addEventListener(ON.click, rotateLayer)
						layerElement.appendChild(spokeElement)
					}

				// return
					return layer
			}

		/* createHole */
			function createHole() {
				// game state
					var hole = {
						spokes: [],
						element: null
					}

				// empty spokes
					for (var i = 0; i < CIRCLE_SECTIONS; i++) {
						hole.spokes.push({
							angle: (CIRCLE_DEGREES / CIRCLE_SECTIONS) * i,
							longness: 0
						})
					}

				// key-based spokes
					for (var i in GAMESTATE.key.layers) {
						for (var j in GAMESTATE.key.layers[i].spokes) {
							var holeSpoke = hole.spokes.find(function(k) {
								return k.angle == GAMESTATE.key.layers[i].spokes[j].angle
							})
							holeSpoke.longness = Math.max(holeSpoke.longness, GAMESTATE.key.layers[i].spokes[j].longness)
						}
					}

				// radius
					var longnessUnit = (RADIUS_PERCENTAGE - RADIUS_MARGIN) / KEY_LENGTHS

				// hole element
					var holeElement = document.createElement("div")
						holeElement.className = "hole"
						holeElement.id = "hole"
					CONTAINER.appendChild(holeElement)
					hole.element = holeElement

				// spoke elements
					for (var i in hole.spokes) {
						var spokeElement = document.createElement("div")
							spokeElement.className = "hole-spoke"
							spokeElement.style.height = (RADIUS_MARGIN + longnessUnit * hole.spokes[i].longness) + "%"
							spokeElement.style.transform = "translateX(-50%) rotate(" + hole.spokes[i].angle + "deg)"
						holeElement.appendChild(spokeElement)
					}

				// return
					return hole
			}

		/* shuffleKey */
			function shuffleKey() {
				// random moves
					for (var i = 0; i < KEY_SHUFFLES; i++) {
						var layer = GAMESTATE.key.layers[Math.floor(Math.random() * KEY_LAYERS)]
						var shifting = !!(Math.random() < SHUFFLE_SHIFTING_PROBABILITY)
						rotateLayer({target: layer.element, shifting: shifting, setup: true})
					}
			}

		/* checkEnd */
			function checkEnd() {
				// loop through layers
					for (var i in GAMESTATE.key.layers) {
						if (Math.abs(GAMESTATE.key.layers[i].rotation % CIRCLE_DEGREES)) {
							return false
						}
					}

				// game over
					endGame()
			}

		/* endGame */
			function endGame() {
				// gamestate
					GAMESTATE.playing = false

				// styling
					OVERLAY.removeAttribute("invisible")
					CONTAINER.setAttribute("gamemover", true)
			}

	/*** interaction ***/
		/* pressKey */
			window.addEventListener("keydown", pressKey)
			function pressKey(event) {
				// shift
					if (event.key.toLowerCase() == "shift") {
						GAMESTATE.shifting = true
					}
			}

		/* liftKey */
			window.addEventListener("keyup", liftKey)
			function liftKey(event) {
				// shift
					if (event.key.toLowerCase() == "shift") {
						GAMESTATE.shifting = false
					}
			}

		/* rotateLayer */
			function rotateLayer(event) {
				// playing?
					if (!GAMESTATE.playing && !GAMESTATE.setup) {
						return false
					}

				// get layer
					var layerElement = event.target.closest(".key-layer")
					var layerId = Number(layerElement.id.replace("key-layer-", ""))
					var layer = GAMESTATE.key.layers[layerId]

				// update rotation
					layer.rotation += (CIRCLE_DEGREES / CIRCLE_SECTIONS) * (GAMESTATE.shifting || event.shifting ? -1 : 1)

				// styling change
					layerElement.style.transform = "translateX(-50%) translateY(-50%) rotate(" + layer.rotation + "deg)"

				// game over?
					if (!event.setup) {
						checkEnd()
					}
			}

}