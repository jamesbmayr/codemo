$(document).ready(function() {

	/* triggers */
		if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
			var on = { click: "touchstart", mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" }
		}
		else {
			var on = { click:      "click", mousedown:  "mousedown", mousemove: "mousemove", mouseup:  "mouseup" }
		}

	/* on load */
		window.attempts = 0;
		fetch();

	/* fetch */
		function fetch() {
			if (window.attempts < 7) {
				var latitude = (Math.random() * 130) - 60;
				var longitude = (Math.random() * 360) - 180;
				console.log(latitude + ", " + longitude);
				
				$.ajax({
					type: "POST",
					url: "https://api.openweathermap.org/data/2.5/weather?appid=6459c6ca838c4552b161ae31df96d16a&units=metric&lat=" + latitude + "&lon=" + longitude,
					success: function(data) {
						if ((data) && (data.cod) && (data.cod == 200) && (data.name)) {
							window.attempts = 0;
							console.log(JSON.stringify(data));
							
							/* location */
								var latitude = data.coord.lat;
								var longitude = data.coord.lon;
								var city = data.name;
								var countryCode = data.sys.country;

							/* directions */
								if (latitude < 0) {
									var latitudeDirection = "S";
								}
								else {
									var latitudeDirection = "N";
								}
								if (longitude < 0) {
									var longitudeDirection = "W";
								}
								else {
									var longitudeDirection = "E";
								}
							
							/* weather data */
								var weather = data.weather[0].main;
								var temperature = ((data.main.temp * 18 / 10) + 32).toFixed(2);
								var pressure = (data.main.pressure * 2953 / 100000).toFixed(2) || 0;
								var humidity = data.main.humidity || 0;
								var windSpeed = (data.wind.speed * 2237 / 1000).toFixed(2) || 0;
								var windDirection = data.wind.deg;
								var clouds = data.clouds.all;
								if (data.rain) {
									var rain = (data.rain["3h"] * 3937 / 1000).toFixed(2) || 0;
								}
								if (data.snow) {
									var snow = (data.snow["3h"] * 3937 / 1000).toFixed(2) || 0;
								}
							
							/* precipitation type */
								if (rain && !snow) {
									var type = "rain";
									var precipitation = rain;
								}
								else if (snow && !rain) {
									var type = "snow";
									var precipitation = snow;
								}
								else if (snow && rain) {
									if (rain >= snow) {
										var type = "rain";
										var precipitation = rain;
									}
									else {
										var type = "snow";
										var precipitation = snow;
									}
								}
								else {
									var type = "clear";
									var precipitation = 0;
								}

							/* windDirection */
								if (((windDirection >= 348.75) && (windDirection <= 360)) || ((windDirection >= 0) && (windDirection < 11.25))) {
									windDirection = "N";
								}
								else if ((windDirection >= 11.25) && (windDirection <= 33.75)) {
									windDirection = "NNE";
								}
								else if ((windDirection >= 33.75) && (windDirection <= 56.25)) {
									windDirection = "NE";
								}
								else if ((windDirection >= 56.25) && (windDirection <= 78.75)) {
									windDirection = "ENE";
								}
								else if ((windDirection >= 78.75) && (windDirection <= 101.25)) {
									windDirection = "E";
								}
								else if ((windDirection >= 101.25) && (windDirection <= 123.75)) {
									windDirection = "ESE";
								}
								else if ((windDirection >= 123.75) && (windDirection <= 146.25)) {
									windDirection = "SE";
								}
								else if ((windDirection >= 146.25) && (windDirection <= 168.75)) {
									windDirection = "SSE";
								}
								else if ((windDirection >= 168.75) && (windDirection <= 191.25)) {
									windDirection = "S";
								}
								else if ((windDirection >= 191.25) && (windDirection <= 213.75)) {
									windDirection = "SSW";
								}
								else if ((windDirection >= 213.75) && (windDirection <= 236.25)) {
									windDirection = "SW";
								}
								else if ((windDirection >= 236.25) && (windDirection <= 258.75)) {
									windDirection = "WSW";
								}
								else if ((windDirection >= 258.75) && (windDirection <= 281.25)) {
									windDirection = "W";
								}
								else if ((windDirection >= 281.25) && (windDirection <= 303.75)) {
									windDirection = "WNW";
								}
								else if ((windDirection >= 303.75) && (windDirection <= 326.25)) {
									windDirection = "NW";
								}
								else if ((windDirection >= 326.25) && (windDirection <= 348.75)) {
									windDirection = "NNW";
								}

							/* post to page */
								$("#place_data").text(city.toLowerCase() + ", " + countryCode.toLowerCase());
								$("#coordinates_data").text(Math.abs(latitude) + " " + latitudeDirection + ", " + Math.abs(longitude) + " " + longitudeDirection);

								$("#temperature_data").text(temperature);
								$("#pressure_data").text(pressure);
								$("#humidity_data").text(humidity);
								$("#wind_data").text(windSpeed);
								$("#wind_direction").text(windDirection);
								$("#clouds_data").text(clouds);
								$("#precipitation_data").text(precipitation);
								if (type == "snow") {
									$("#precipitation_type").removeClass("fa-umbrella").addClass("fa-snowflake-o");
								}

							/* background */
								var center = new google.maps.LatLng(latitude,longitude);
								var map = new google.maps.Map(document.getElementById("map"), {
									center: center,
									zoom: 15
								});

								var request = {
									location: center,
									radius: "1000"
								}

								var service = new google.maps.places.PlacesService(map);
								service.nearbySearch({location: center, radius: "50000"}, function (places, status) {
									if ((status == google.maps.places.PlacesServiceStatus.OK) && (places) && (places.length > 0)) {
										var placesWithPhotos = places.filter(function(x) {
											return ((x.photos !== null) && (x.photos !== undefined));
										});

										console.log(JSON.stringify(placesWithPhotos));

										if ((placesWithPhotos) && (placesWithPhotos.length > 0)) {
											var place = placesWithPhotos[Math.floor(Math.random() * placesWithPhotos.length)];
											console.log(JSON.stringify(place));

											var photo = place.photos[Math.floor(Math.random() * place.photos.length)].getUrl({"maxWidth": 1000, "maxHeight": 600});
											$("body").css("background","url(" + String(photo) + ")");
											$("body").css("background-size","cover").css("background-repeat","no-repeat").css("background-position","center");
										}
										else {
											console.log("NO_PHOTOS");
										}
									}
									else {
										console.log(status);
									}
								});
						
						}
						else {
							window.attempts++;
							fetch();
						}
					},
					error: function(data) {
						window.attempts++;
						fetch();
					}
				});
			}
		}

	/* refresh */
		$(document).on(on.click,"#refresh",function() {
			window.location = window.location;
		});
});