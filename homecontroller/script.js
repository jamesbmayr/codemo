/*** globals ***/
	/* home */
		const HOME = {
			configuration: {
				ifttt_url: "https://maker.ifttt.com/trigger/bluejay_",
				ifttt_key: "/with/key/"
			},
			rooms: [
				{
					name: "hall",
					background: "light-red",
					top: 4,
					left: 6,
					width: 11,
					height: 6
				},
				{
					name: "", // closet
					background: "light-red",
					top: 0,
					left: 12,
					width: 5,
					height: 4
				},
				{
					name: "", // hall
					background: "light-red",
					top: 7,
					left: 17,
					width: 7,
					height: 3
				},
				{
					name: "bathroom",
					background: "light-yellow",
					top: 0,
					left: 17,
					width: 7,
					height: 7
				},
				{
					name: "kitchen",
					background: "light-orange",
					top: 0,
					left: 24,
					width: 12,
					height: 10
				},
				{
					name: "", // pantry
					background: "light-orange",
					top: 0,
					left: 36,
					width: 6,
					height: 5
				},
				{
					name: "craft room",
					background: "light-purple",
					top: 10,
					left: 0,
					width: 13,
					height: 12
				},
				{
					name: "living room",
					background: "light-blue",
					top: 10,
					left: 13,
					width: 15,
					height: 15
				},
				{
					name: "bedroom",
					background: "light-green",
					top: 13,
					left: 28,
					width: 11,
					height: 9
				},
				{
					name: "", // bedroom
					background: "light-green",
					top: 10,
					left: 32,
					width: 7,
					height: 3
				},
			],
			devices: [
				// philips hue
					{
						name: "hallway lights",
						image: "https://static.thenounproject.com/png/88333-200.png",
						top: 8.5,
						left: 11.5,
						buttons: {
							"&#x2611;": "ifttt_url||hallway_lights_on||ifttt_key",
							"&#x2612;": "ifttt_url||hallway_lights_off||ifttt_key"
						}
					},
					{
						name: "bathroom lights",
						image: "https://static.thenounproject.com/png/88333-200.png",
						top: 5,
						left: 20.5,
						buttons: {
							"&#x2611;": "ifttt_url||bathroom_lights_on||ifttt_key",
							"&#x2612;": "ifttt_url||bathroom_lights_off||ifttt_key"
						}
					},
					{
						name: "kitchen lights",
						image: "https://static.thenounproject.com/png/88333-200.png",
						top: 6.5,
						left: 30,
						buttons: {
							"&#x2611;": "ifttt_url||kitchen_lights_on||ifttt_key",
							"&#x2612;": "ifttt_url||kitchen_lights_off||ifttt_key"
						}
					},
					{
						name: "living room lights",
						image: "https://static.thenounproject.com/png/88333-200.png",
						top: 15,
						left: 20.5,
						buttons: {
							"&#x2611;": "ifttt_url||living_room_lights_on||ifttt_key",
							"&#x2612;": "ifttt_url||living_room_lights_off||ifttt_key"
						}
					},
					{
						name: "bedside lights",
						image: "https://static.thenounproject.com/png/88338-200.png",
						top: 15,
						left: 33.5,
						buttons: {
							"&#x2611;": "ifttt_url||bedside_lights_on||ifttt_key",
							"&#x2612;": "ifttt_url||bedside_lights_off||ifttt_key"
						}
					},

				// roomba
					{
						name: "oscar",
						image: "https://static.thenounproject.com/png/3177860-200.png",
						top: 3.5,
						left: 40.5,
						buttons: {
							"&#x2611;": "ifttt_url||vacuum_on||ifttt_key",
							"&#x2612;": "ifttt_url||vacuum_off||ifttt_key"
						}
					},

				// smartlife
					{
						name: "craft room lamp",
						image: "https://static.thenounproject.com/png/88338-200.png",
						top: 20.5,
						left: 2.5,
						buttons: {
							"&#x2611;": "ifttt_url||craft_room_lamp_on||ifttt_key",
							"&#x2612;": "ifttt_url||craft_room_lamp_off||ifttt_key"
						}
					},
					{
						name: "living room lamp",
						image: "https://static.thenounproject.com/png/88338-200.png",
						top: 20.5,
						left: 14.5,
						buttons: {
							"&#x2611;": "ifttt_url||living_room_lamp_on||ifttt_key",
							"&#x2612;": "ifttt_url||living_room_lamp_off||ifttt_key"
						}
					},
					{
						name: "humidifier",
						image: "https://static.thenounproject.com/png/3716925-200.png",
						top: 23.5,
						left: 14.5,
						buttons: {
							"&#x2611;": "ifttt_url||humidifier_on||ifttt_key",
							"&#x2612;": "ifttt_url||humidifier_off||ifttt_key"
						}
					},
					{
						name: "living room air",
						image: "https://static.thenounproject.com/png/587749-200.png",
						top: 23.5,
						left: 20.5,
						buttons: {
							"&#x2611;": "ifttt_url||living_room_air_on||ifttt_key",
							"&#x2612;": "ifttt_url||living_room_air_off||ifttt_key"
						}
					},
					{
						name: "bedroom lamp",
						image: "https://static.thenounproject.com/png/88338-200.png",
						top: 20.5,
						left: 37.5,
						buttons: {
							"&#x2611;": "ifttt_url||bedroom_lamp_on||ifttt_key",
							"&#x2612;": "ifttt_url||bedroom_lamp_off||ifttt_key"
						}
					},
					{
						name: "bedroom air",
						image: "https://static.thenounproject.com/png/587749-200.png",
						top: 20.5,
						left: 33.5,
						buttons: {
							"&#x2611;": "ifttt_url||bedroom_air_on||ifttt_key",
							"&#x2612;": "ifttt_url||bedroom_air_off||ifttt_key"
						}
					},
					{
						name: "bedroom fan",
						image: "https://static.thenounproject.com/png/2175977-200.png",
						top: 15,
						left: 37.5,
						buttons: {
							"&#x2611;": "ifttt_url||bedroom_fan_on||ifttt_key",
							"&#x2612;": "ifttt_url||bedroom_fan_off||ifttt_key"
						}
					},

				// sonos
					{
						name: "sonos",
						image: "https://static.thenounproject.com/png/2629730-200.png",
						top: 20.5,
						left: 26.5,
						buttons: {
							"&#x25BA;": "ifttt_url||sonos_on||ifttt_key",
							"II": "ifttt_url||sonos_off||ifttt_key",
							"&and;": "ifttt_url||sonos_volume_up||ifttt_key",
							"&or;": "ifttt_url||sonos_volume_down||ifttt_key",
						}
					},
					{
						name: "craft room speaker",
						image: "https://static.thenounproject.com/png/3422-200.png",
						top: 20.5,
						left: 6.5,
						buttons: {
							"&#x2611;": "ifttt_url||craft_room_speaker_on||ifttt_key",
							"&#x2612;": "ifttt_url||craft_room_speaker_off||ifttt_key",
							"&and;": "ifttt_url||craft_room_speaker_volume_up||ifttt_key",
							"&or;": "ifttt_url||craft_room_speaker_volume_down||ifttt_key",
						}
					},
					{
						name: "living room speaker",
						image: "https://static.thenounproject.com/png/3422-200.png",
						top: 12,
						left: 24,
						buttons: {
							"&#x2611;": "ifttt_url||living_room_speaker_on||ifttt_key",
							"&#x2612;": "ifttt_url||living_room_speaker_off||ifttt_key",
							"&and;": "ifttt_url||living_room_speaker_volume_up||ifttt_key",
							"&or;": "ifttt_url||living_room_speaker_volume_down||ifttt_key",
						}
					},
					{
						name: "bedroom speaker",
						image: "https://static.thenounproject.com/png/3422-200.png",
						top: 15,
						left: 29.5,
						buttons: {
							"&#x2611;": "ifttt_url||bedroom_speaker_on||ifttt_key",
							"&#x2612;": "ifttt_url||bedroom_speaker_off||ifttt_key",
							"&and;": "ifttt_url||bedroom_speaker_volume_up||ifttt_key",
							"&or;": "ifttt_url||bedroom_speaker_volume_down||ifttt_key",
						}
					},
					{
						name: "kitchen speaker",
						image: "https://static.thenounproject.com/png/3422-200.png",
						top: 2,
						left: 25.5,
						buttons: {
							"&#x2611;": "ifttt_url||kitchen_speaker_on||ifttt_key",
							"&#x2612;": "ifttt_url||kitchen_speaker_off||ifttt_key",
							"&and;": "ifttt_url||kitchen_speaker_volume_up||ifttt_key",
							"&or;": "ifttt_url||kitchen_speaker_volume_down||ifttt_key",
						}
					},
					{
						name: "roam",
						image: "https://static.thenounproject.com/png/3422-200.png",
						top: 20.5,
						left: 10.5,
						buttons: {
							"&#x2611;": "ifttt_url||roam_on||ifttt_key",
							"&#x2612;": "ifttt_url||roam_off||ifttt_key",
							"&and;": "ifttt_url||roam_volume_up||ifttt_key",
							"&or;": "ifttt_url||roam_volume_down||ifttt_key",
						}
					},
					{
						name: "record player",
						image: "https://static.thenounproject.com/png/750613-200.png",
						top: 17.5,
						left: 26.5,
						buttons: {
							"&#x25C9;": "ifttt_url||kitchen_speaker_on||ifttt_key"
						}
					}
			]
		}

	/* elements */
		const ELEMENTS = {
			home: document.querySelector("#home"),
			rooms: document.querySelector("#rooms"),
			devices: document.querySelector("#devices"),
			iframe: document.querySelector("#iframe"),
			jlogo: document.querySelector("#j-logo"),
			about: document.querySelector("#about")
		}

/*** layout ***/
	/* buildHome */
		buildHome()
		function buildHome() {
			try {
				// get configuration
					updateConfiguration()

				// update urls
					for (let i in HOME.devices) {
						updateURLs(HOME.devices[i])
					}

				// build rooms
					for (let i in HOME.rooms) {
						buildRoom(HOME.rooms[i])
					}

				// build devices
					for (let i in HOME.devices) {
						buildDevice(HOME.devices[i])
					}
			} catch (error) {console.log(error)}
		}

	/* updateConfiguration */
		function updateConfiguration() {
			try {
				// no parameters
					if (!window.location.search || !window.location.search.length) {
						return
					}

				// get parameters
					let parameters = window.location.search.slice(1).split("&")
					for (let i in parameters) {
						let pair = parameters[i].split("=")
						
						if (HOME.configuration[pair[0]]) {
							HOME.configuration[pair[0]] += pair[1]
						}
						else {
							HOME.configuration[pair[0]] = pair[1]
						}

						// ifttt key
							if (pair[0] == "ifttt_key") {
								ELEMENTS.jlogo.setAttribute("invisible", true)
								ELEMENTS.about.setAttribute("invisible", true)
							}
					}
			} catch (error) {console.log(error)}
		}

	/* updateURLs */
		function updateURLs(device) {
			try {
				// loop through buttons
					for (let i in device.buttons) {
						// chunk
							let URLchunks = device.buttons[i].split("||")
						
						// loop through chunks
							for (let j in URLchunks) {
								if (HOME.configuration[URLchunks[j]]) {
									URLchunks[j] = HOME.configuration[URLchunks[j]]
								}
							}

						// put back
							device.buttons[i] = URLchunks.join("")
					}
			} catch (error) {console.log(error)}
		}

	/* buildRoom */
		function buildRoom(room) {
			try {
				// create element
					let roomElement = document.createElement("div")
						roomElement.className = "room"
						roomElement.style.background = "var(--" + room.background + ")"
						roomElement.style.top = "calc(" + room.top + " * var(--foot))"
						roomElement.style.left = "calc(" + room.left + " * var(--foot) / var(--house-width-height-ratio))"
						roomElement.style.height = "calc(" + room.height + " * var(--foot))"
						roomElement.style.width = "calc(" + room.width + " * var(--foot) / var(--house-width-height-ratio))"
					ELEMENTS.rooms.appendChild(roomElement)

				// name
					let nameElement = document.createElement("div")
						nameElement.className = "room-name"
						nameElement.innerText = room.name
					roomElement.appendChild(nameElement)

				// save to home
					room.element = roomElement
			} catch (error) {console.log(error)}
		}

	/* buildDevice */
		function buildDevice(device) {
			try {
				// create element
					let deviceElement = document.createElement("div")
						deviceElement.className = "device"
						deviceElement.style.top = "calc(" + device.top + " * var(--foot))"
						deviceElement.style.left = "calc(" + device.left + " * var(--foot) / var(--house-width-height-ratio))"
					ELEMENTS.devices.appendChild(deviceElement)

				// image
					let imageElement = document.createElement("div")
						imageElement.className = "device-image"
						imageElement.style.backgroundImage = "url(" + device.image + ")"
					deviceElement.appendChild(imageElement)

				// buttons
					for (let i in device.buttons) {
						let button = document.createElement("button")
							button.className = "device-button device-" + i.replace("&","").replace("#","").replace(";","")
							button.innerHTML = i
							button.setAttribute("url", device.buttons[i])
							button.addEventListener("click", triggerDevice)
						deviceElement.appendChild(button)
					}

				// save to home
					device.element = deviceElement
			} catch (error) {console.log(error)}
		}

/*** interaction ***/
	/* triggerDevice */
		function triggerDevice(event) {
			try {
				// get element
					let deviceButton = event.target
						deviceButton.blur()
					let url = deviceButton.getAttribute("url")

				// send request
					let request = new XMLHttpRequest()
						request.open("HEAD", url, true)
						request.onload = function() {}
						request.onerror = function() {}
						request.send()				
			} catch (error) {}
		}
