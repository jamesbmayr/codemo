window.onload = function() {

	/* triggers */
		if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
			var on = { click: "touchstart", mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" }
		}
		else {
			var on = { click:      "click", mousedown:  "mousedown", mousemove: "mousemove", mouseup:  "mouseup" }
		}

	/* on load */
		window.attempts = 0
		fetch()

	/* fetch */
		function fetch() {
			if (window.attempts < 7) {
				var latitude = (Math.random() * 130) - 60
				var longitude = (Math.random() * 360) - 180
				var url = "https://api.openweathermap.org/data/2.5/weather?appid=6459c6ca838c4552b161ae31df96d16a&units=metric&lat=" + latitude + "&lon=" + longitude
				
				var request = new XMLHttpRequest()
					request.open("GET", url, true)
					request.onload = function(response) {
						/* not done */
							if (!response.target || !response.target.status || response.target.status !== 200) {
								window.attempts++
								fetch()
								return
							}
						
						/* no name */
							var data = JSON.parse(response.target.response)
							if (!data || !data.name || !data.name.length) {
								window.attempts++
								fetch()
								return
							}
						
						/* done */
							window.attempts = 0
							console.log(data)
							
						/* location */
							var latitude = data.coord.lat
							var longitude = data.coord.lon
							var city = data.name || ""
							var countryCode = data.sys.country

						/* directions */
							if (latitude < 0) {
								var latitudeDirection = "S"
							}
							else {
								var latitudeDirection = "N"
							}
							if (longitude < 0) {
								var longitudeDirection = "W"
							}
							else {
								var longitudeDirection = "E"
							}
						
						/* weather data */
							var weather = data.weather[0].main
							var temperature = ((data.main.temp * 18 / 10) + 32).toFixed(2)
							var pressure = (data.main.pressure * 2953 / 100000).toFixed(2) || 0
							var humidity = data.main.humidity || 0
							var windSpeed = (data.wind.speed * 2237 / 1000).toFixed(2) || 0
							var windDirection = data.wind.deg
							var clouds = data.clouds.all
							if (data.rain) {
								var rain = (data.rain["3h"] * 3937 / 1000).toFixed(2) || 0
							}
							if (data.snow) {
								var snow = (data.snow["3h"] * 3937 / 1000).toFixed(2) || 0
							}
						
						/* precipitation type */
							if (rain && !snow) {
								var type = "rain"
								var precipitation = rain
							}
							else if (snow && !rain) {
								var type = "snow"
								var precipitation = snow
							}
							else if (snow && rain) {
								if (rain >= snow) {
									var type = "rain"
									var precipitation = rain
								}
								else {
									var type = "snow"
									var precipitation = snow
								}
							}
							else {
								var type = "clear"
								var precipitation = 0
							}

						/* windDirection */
							if (((windDirection >= 348.75) && (windDirection <= 360)) || ((windDirection >= 0) && (windDirection < 11.25))) {
								windDirection = "N"
							}
							else if ((windDirection >= 11.25) && (windDirection <= 33.75)) {
								windDirection = "NNE"
							}
							else if ((windDirection >= 33.75) && (windDirection <= 56.25)) {
								windDirection = "NE"
							}
							else if ((windDirection >= 56.25) && (windDirection <= 78.75)) {
								windDirection = "ENE"
							}
							else if ((windDirection >= 78.75) && (windDirection <= 101.25)) {
								windDirection = "E"
							}
							else if ((windDirection >= 101.25) && (windDirection <= 123.75)) {
								windDirection = "ESE"
							}
							else if ((windDirection >= 123.75) && (windDirection <= 146.25)) {
								windDirection = "SE"
							}
							else if ((windDirection >= 146.25) && (windDirection <= 168.75)) {
								windDirection = "SSE"
							}
							else if ((windDirection >= 168.75) && (windDirection <= 191.25)) {
								windDirection = "S"
							}
							else if ((windDirection >= 191.25) && (windDirection <= 213.75)) {
								windDirection = "SSW"
							}
							else if ((windDirection >= 213.75) && (windDirection <= 236.25)) {
								windDirection = "SW"
							}
							else if ((windDirection >= 236.25) && (windDirection <= 258.75)) {
								windDirection = "WSW"
							}
							else if ((windDirection >= 258.75) && (windDirection <= 281.25)) {
								windDirection = "W"
							}
							else if ((windDirection >= 281.25) && (windDirection <= 303.75)) {
								windDirection = "WNW"
							}
							else if ((windDirection >= 303.75) && (windDirection <= 326.25)) {
								windDirection = "NW"
							}
							else if ((windDirection >= 326.25) && (windDirection <= 348.75)) {
								windDirection = "NNW"
							}

						/* post to page */
							document.querySelector("#place_data").innerText = city.toLowerCase() + ", " + countryCode.toLowerCase()
							document.querySelector("#coordinates_data").innerText = Math.abs(latitude) + " " + latitudeDirection + ", " + Math.abs(longitude) + " " + longitudeDirection

							document.querySelector("#temperature_data").innerText = temperature
							document.querySelector("#pressure_data").innerText = pressure
							document.querySelector("#humidity_data").innerText = humidity
							document.querySelector("#wind_data").innerText = windSpeed
							document.querySelector("#wind_direction").innerText = windDirection
							document.querySelector("#clouds_data").innerText = clouds
							document.querySelector("#precipitation_data").innerText = precipitation
							if (type == "snow") {
								document.querySelector("#precipitation_type").className = "fa fa-snowflake-o"
							}

						/* background */
							var center = new google.maps.LatLng(latitude,longitude)
							var map = new google.maps.Map(document.getElementById("map"), {
								center: center,
								zoom: 15
							})

							var request = {
								location: center,
								radius: "1000"
							}

							var service = new google.maps.places.PlacesService(map)
							service.nearbySearch({location: center, radius: "50000"}, function (places, status) {
								if ((status == google.maps.places.PlacesServiceStatus.OK) && (places) && (places.length > 0)) {
									var placesWithPhotos = places.filter(function(x) {
										return ((x.photos !== null) && (x.photos !== undefined))
									})

									if ((placesWithPhotos) && (placesWithPhotos.length > 0)) {
										var place = placesWithPhotos[Math.floor(Math.random() * placesWithPhotos.length)]

										var photo = place.photos[Math.floor(Math.random() * place.photos.length)].getUrl({"maxWidth": 1000, "maxHeight": 600})
										document.body.style.backgroundImage = "url(" + String(photo) + ")"
									}
								}
							})
					}
					request.onerror = function(data) {
						window.attempts++
						fetch()
					}
					request.send()
			}
		}

	/* refresh */
		document.querySelector("#refresh").addEventListener(on.click, function() {
			window.location = window.location
		})
}
