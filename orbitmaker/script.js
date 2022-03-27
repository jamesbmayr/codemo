/*** globals ***/
	/* triggers */
		const TRIGGERS = {
			click: "click",
			input: "input",
			resize: "resize",
			mousedown: "mousedown",
			mouseup: "mouseup",
			mousemove: "mousemove",
			scroll: "wheel",
			keydown: "keydown"
		}

		if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
			TRIGGERS.click = "touchstart"
			TRIGGERS.mousedown = "touchstart"
			TRIGGERS.mousemove = "touchmove"
			TRIGGERS.mouseup = "touchend"
		}

	/* constants */
		const CONSTANTS = {
			rounding: 1000000,
			"4π^2": 4 * Math.PI ** 2, // radians --> for calculating orbits
			G: 6.67 * (10 ** -11), // N * m^2 / kg^2
			convert: {
				circle_to_radian: 2 * Math.PI, // radians
				quarterCircle_to_radian: Math.PI / 2, // radians
				circle_to_degree: 360, // degrees
				AU_to_meter: 1.496 * (10 ** 11), // meters
				year_to_day: 365, // days
				day_to_hour: 24, // hours
				hour_to_second: 3600, // seconds
				second_to_ms: 1000, // ms
				second_to_loop: 25, // loops
				solarMass_to_kg: 1.989 * (10 ** 30), // kg
			},
			limit: {
				minimumAngle: 0.0001 / 360 * (2 * Math.PI), // radians --> for calculateEccentricAnomaly
				minimumEccentricity: 0, // circle
				maximumEccentricity: 1, // parabola / hyperbola
				minimumDistanceForSelection: 10, // pixels
				minimumZoomPower: 0, // 10^x
				stepZoomPower: 0.1, // 10^x
				maximumZoomPower: 5, // 10^x
				minimumRatePower: 0, // 10^x
				stepRatePower: 0.1, // 10^x
				maximumRatePower: 5, // 10^x
				stepOffset: 0.1, // AU
			},
			canvas: {
				star_log_kg_to_pixel: 0.1, // pixels
				planet_log_kg_to_pixel: 0.05, // pixels
				moon_log_kg_to_pixel: 0.05, // pixels
				scroll_to_zoom: 0.05, // 10^x
				orbitThickness: 2, // pixels
				orbitAboveOpacity: 0.75, // ratio
				orbitBelowOpacity: 0.25, // ratio
				starOpacity: 1, // ratio
				planetOpacity: 1, // ratio
				moonOpacity: 0.75, // ratio
				glowThickness: 10, // pixels
				spaceColor: "#111111", // #hex
				habitableZoneColor: "#2cdd6a", // #hex
				habitableZoneOpacity: 0.05, // ratio
				habitableZoneThickness: 0.8, // ratio
				habitableZoneShadowBlur: 0.5, // ratio
				starFontSize: 16, // pixels
				planetFontSize: 12, // pixels
				moonFontSize: 8, // pixels
				fontFamily: "monospace"
			},
			field: {
				starCount: 1000, // count
				starRadius: 1, // px
				starOpacity: 0.1, // ratio
				starColors: ["#7ffeff", "#ffffff", "#ffffff", "#fdff99", "#fdff99", "#f9ef22", "#f9ef22", "#f9ef22", "#ed991c", "#ed991c", "#ed991c", "#be102e", "#be102e", "#be102e", "#be102e"], // #hex
			},
			star: {
				name: null,
				description: null,
				color: null, // #hex
				massFactor: 0, // kg
				massPower: 0, // 10^x
				radius: 0, // AU
				day: 0, // d
				period: 0, // d
				habitableZone: 0, // AU
				position: {
					x: 0, // AU
					y: 0, // AU
					invariableX: 0, // px
					invariableY: 0, // px
					tracking: false,
					visible: true
				},
				elements: {},
				planets: {}
			},
			planet: {
				name: null,
				description: null,
				color: null, // #hex
				massFactor: 0, // kg
				massPower: 0, // 10^x
				day: 0, // d
				period: 0, // d
				semiMajorAxis: 0, // AU
				retrograde: false,
				inclination: 0, // radians
				longitudeOfAscendingNode: 0, // radians
				eccentricity: 0, // ratio
				apoapsis: 0, // AU
				periapsis: 0, // AU
				argumentOfPeriapsis: 0, // radians
				computed: {
					semiMinorAxis: 0, // AU
					focalDistance: 0, // AU
					longitudeOfPeriapsis: 0, // radians
					ascendingNode: {
						x: 0, // AU
						y: 0, // AU
						a: 0 // radians
					},
					descendingNode: {
						x: 0, // AU
						y: 0, // AU
						a: 0 // radians
					}
				},
				position: {
					x: 0, // AU
					y: 0, // AU
					invariableX: 0, // px
					invariableY: 0, // px
					trueAnomaly: 0, // radians
					tracking: false,
					visible: true
				},
				elements: {},
				moons: {}
			},
			moon: {
				name: null,
				description: null,
				color: null, // #hex
				massFactor: 0, // kg
				massPower: 0, // 10^x
				day: 0, // d
				period: 0, // d
				semiMajorAxis: 0, // AU
				retrograde: false,
				inclination: 0, // radians
				longitudeOfAscendingNode: 0, // radians
				eccentricity: 0, // ratio
				apoapsis: 0, // AU
				periapsis: 0, // AU
				argumentOfPeriapsis: 0, // radians
				computed: {
					semiMinorAxis: 0, // AU
					focalDistance: 0, // AU
					longitudeOfPeriapsis: 0, // radians
					ascendingNode: {
						x: 0, // AU
						y: 0, // AU
						a: 0 // radians
					},
					descendingNode: {
						x: 0, // AU
						y: 0, // AU
						a: 0 // radians
					}
				},
				position: {
					x: 0, // AU
					y: 0, // AU
					invariableX: 0, // px
					invariableY: 0, // px
					trueAnomaly: 0, // radians
					tracking: false,
					visible: true
				},
				elements: {}
			},
			classes: {
				stars: {
					"black-hole": {
						name: "black hole",
						color: "#000000", // #hex
						massFactor: 4.21668, // kg
						massPower: 31, //10^x
						radius: 0.098590, // AU
						habitableZone: 441.816477, // AU
					},
					"blue-supergiant": {
						name: "blue supergiant (Rigel)",
						color: "#b7bfe5", // #hex
						massFactor: 4.176900, // kg
						massPower: 31, // 10^x
						radius: 0.366922, // AU
						habitableZone: 437.987065, // AU
					},
					"red-supergiant": {
						name: "red supergiant (Betelgeuse)",
						color: "#dca562", // #hex
						massFactor: 3.58020, // kg
						massPower: 31, // 10^x
						radius: 4.124964, // AU
						habitableZone: 375.710190, // AU
					},
					"blue-giant": {
						name: "blue giant (Bellatrix)",
						color: "#cad0ff", // #hex
						massFactor: 1.53153, // kg
						massPower: 31, // 10^x
						radius: 0.026740, // AU
						habitableZone: 44.420546, // AU
					},
					"yellow-giant": {
						name: "yellow giant (Polaris)",
						color: "#fdffc0", // #hex
						massFactor: 1.07406, // kg
						massPower: 31, // 10^x
						radius: 0.174393, // AU
						habitableZone: 23.20526, // AU
					},
					"red-giant": {
						name: "red giant (Arcturus)",
						color: "#e63d09", // #hex
						massFactor: 2.148120, // kg
						massPower: 30, // 10^x
						radius: 0.118122, // AU
						habitableZone: 1.220313, // AU
					},
					"main-sequence-o": {
						name: "Main Sequence O (blue)",
						color: "#92b5ff", // #hex
						massFactor: 1.1934, // kg
						massPower: 32, // 10^x
						radius: 0.055806, // AU
						habitableZone: 862.115203, // AU
					},
					"main-sequence-b": {
						name: "Main Sequence B (blue)",
						color: "#a2c0ff", // #hex
						massFactor: 1.1934, // kg
						massPower: 31, // 10^x
						radius: 0.018602, // AU
						habitableZone: 28.139907, // AU
					},
					"main-sequence-a": {
						name: "Main Sequence A (white)",
						color: "#d5e0ff", // #hex
						massFactor: 3.978, // kg
						massPower: 30, // 10^x
						radius: 0.007906, // AU
						habitableZone: 3.768693, // AU
					},
					"main-sequence-f": {
						name: "Main Sequence F (pale)",
						color: "#fdffbe", // #hex
						massFactor: 2.5857, // kg
						massPower: 30, // 10^x
						radius: 0.006046, // AU
						habitableZone: 1.713256, // AU
					},
					"main-sequence-g": {
						name: "Main Sequence G (yellow) (Sun)",
						color: "#f6fa78", // #hex
						massFactor: 1.989, // kg
						massPower: 30, // 10^x
						radius: 0.004650, // AU
						habitableZone: 1.06, // AU
					},
					"main-sequence-k": {
						name: "Main Sequence K (orange dwarf)",
						color: "#d58838", // #hex
						massFactor: 1.33263, // kg
						massPower: 30, // 10^x
						radius: 0.003348, // AU
						habitableZone: 0.509358, // AU
					},
					"main-sequence-m": {
						name: "Main Sequence M (red dwarf)",
						color: "#e63d09", // #hex
						massFactor: 4.1769, // kg
						massPower: 29, // 10^x
						radius: 0.001256, // AU
						habitableZone: 0.060949, // AU
					},
					"white-dwarf": {
						name: "white dwarf",
						color: "#ffffff", // #hex
						massFactor: 1.989, // kg
						massPower: 30, // 10^x
						radius: 0.000047, // AU
						habitableZone: 0.01, // AU
					}
				},
				planets: {
					"jovian": {
						name: "Jovian",
						color: "#ff7700", // #hex
						massFactor: 2, // kg
						massPower: 27, // 10^x
						semiMajorAxis: 5, // AU
						retrograde: false,
						eccentricity: 0, // ratio
						apoapsis: 5, // AU
						periapsis: 5, // AU
					},
					"neptunian": {
						name: "Neptunian",
						color: "#7777ff", // #hex
						massFactor: 1, // kg
						massPower: 26, // 10^x
						semiMajorAxis: 5, // AU
						retrograde: false,
						eccentricity: 0, // ratio
						apoapsis: 5, // AU
						periapsis: 5, // AU
					},
					"superterran": {
						name: "Superterran (Super Earth)",
						color: "#0077ff", // #hex
						massFactor: 3, // kg
						massPower: 25, // 10^x
						semiMajorAxis: 2, // AU
						retrograde: false,
						eccentricity: 0, // ratio
						apoapsis: 2, // AU
						periapsis: 2, // AU
					},
					"terran": {
						name: "Terran (Earth-like)",
						color: "#0077ff", // #hex
						massFactor: 6, // kg
						massPower: 24, // 10^x
						semiMajorAxis: 1, // AU
						retrograde: false,
						eccentricity: 0, // ratio
						apoapsis: 1, // AU
						periapsis: 1, // AU
					},
					"subterran": {
						name: "Subterran (Sub Earth)",
						color: "#0077ff", // #hex
						massFactor: 1.5, // kg
						massPower: 24, // 10^x
						semiMajorAxis: 0.75, // AU
						retrograde: false,
						eccentricity: 0, // ratio
						apoapsis: 0.75, // AU
						periapsis: 0.75, // AU
					},
					"mercurian": {
						name: "Mercurian",
						color: "#555555", // #hex
						massFactor: 5, // kg
						massPower: 23, // 10^x
						semiMajorAxis: 0.25, // AU
						retrograde: false,
						eccentricity: 0.25, // ratio
						apoapsis: 0.3125, // AU
						periapsis: 0.1875, // AU
					},
					"asteroidan": {
						name: "Asteroid / Comet",
						color: "#ff7777", // #hex
						massFactor: 5, // kg
						massPower: 15, // 10^x
						semiMajorAxis: 3, // AU
						retrograde: false,
						eccentricity: 0.75, // ratio
						apoapsis: 5.25, // AU
						periapsis: 0.75, // AU
					}
				},
				moons: {
					"superlunar": {
						name: "superlunar (Titan-like)",
						color: "#ff7700",
						massFactor: 2, // kg
						massPower: 23, // 10^x
						semiMajorAxis: 0.0075, // AU
						retrograde: false,
						eccentricity: 0, // ratio
						apoapsis: 0.0075, // AU
						periapsis: 0.0075, // AU
					},
					"lunar": {
						name: "lunar (Moon-like)",
						color: "#cccccc",
						massFactor: 7, // kg
						massPower: 22, // 10^x
						semiMajorAxis: 0.0025, // AU
						retrograde: false,
						eccentricity: 0, // ratio
						apoapsis: 0.0025, // AU
						periapsis: 0.0025, // AU
					},
					"sublunar": {
						name: "sublunar (Charon-like)",
						color: "#ccccff",
						massFactor: 2, // kg
						massPower: 21, // 10^x
						semiMajorAxis: 0.0005, // AU
						retrograde: false,
						eccentricity: 0, // ratio
						apoapsis: 0.0005, // AU
						periapsis: 0.0005, // AU
					},
					"subsublunar": {
						name: "sublunar (Enceladus-like)",
						color: "#ffffff",
						massFactor: 1, // kg
						massPower: 20, // 10^x
						semiMajorAxis: 0.001, // AU
						retrograde: false,
						eccentricity: 0, // ratio
						apoapsis: 0.001, // AU
						periapsis: 0.001, // AU
					},
					"asteroidal": {
						name: "asteroidal (Asteroid-like)",
						color: "#555555",
						massFactor: 5, // kg
						massPower: 17, // 10^x
						semiMajorAxis: 0.0001, // AU
						retrograde: false,
						eccentricity: 0.8, // ratio
						apoapsis: 0.00018, // AU
						periapsis: 0.00002, // AU
					}
				}
			}
		}

	/* default simulation */
		// from https://ssd.jpl.nasa.gov/sats/elem and also wikipedia
		CONSTANTS.defaults = {
			stars: {
				"star-0": {
					name: "Sun",
					class: "main-sequence-g",
					description: "",
					color: "#f6fa78", // #hex
					massFactor: 1.989, // kg
					massPower: 30, // 10^x
					radius: 0.004650, // AU
					day: 0, // d
					period: 0, // d
					habitableZone: 1.06, // AU
					position: {tracking: true},
					planets: {
						"star-0-planet-0": {
							name: "Mercury",
							description: "",
							color: "#8e8888", // #hex
							massFactor: 3.3011, // kg
							massPower: 23, // 10^x
							day: calculateDayFromPeriapsis(87.9691, "2022-10-06T00:00"), // d
							period: 87.9691, // d
							semiMajorAxis: 0.387098, // AU
							retrograde: false,
							inclination: 6.35 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							longitudeOfAscendingNode: 48.331 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							eccentricity: 0.205630, // ratio
							apoapsis: 0.466697, // AU
							periapsis: 0.307499, // AU
							argumentOfPeriapsis: 29.124 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							moons: {}
						},
						"star-0-planet-1": {
							name: "Venus",
							description: "",
							color: "#f1e9dc", // #hex
							massFactor: 4.8675, // kg
							massPower: 24, // 10^x
							day: calculateDayFromPeriapsis(224.701, "2022-01-22T00:00"), // d
							period: 224.701, // d
							semiMajorAxis: 0.723332, // AU
							retrograde: false,
							inclination: 2.15 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							longitudeOfAscendingNode: 76.680 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							eccentricity: 0.006772, // ratio
							apoapsis: 0.728213, // AU
							periapsis: 0.718440, // AU
							argumentOfPeriapsis: 54.884 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							moons: {}
						},
						"star-0-planet-2": {
							name: "Earth",
							description: "",
							color: "#516e8d", // #hex
							massFactor: 5.97237, // kg
							massPower: 24, // 10^x
							day: calculateDayFromPeriapsis(365.256363, "2022-01-03T00:00"), // d
							period: 365.256363, // d
							semiMajorAxis: 1.000001, // AU
							retrograde: false,
							inclination: 1.57869 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							longitudeOfAscendingNode: 0 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians // coordinate system is based on earth's ascending node !!!
							eccentricity: 0.016709, // ratio
							apoapsis: 1.016726, // AU
							periapsis: 0.983269, // AU
							argumentOfPeriapsis: -114.20783 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							moons: {
								"star-0-planet-2-moon-0": {
									name: "Moon",
									description: "",
									color: "#cabcb7",
									massFactor: 7.342, // kg
									massPower: 22, // 10^x
									day: calculateDayFromPeriapsis(27.321661, "2021-12-04T00:00"), // d
									period: 27.321661, // d
									semiMajorAxis: 0.002570, // AU
									retrograde: false,
									inclination: 5.16 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians // already measured from ecliptic !!!
									longitudeOfAscendingNode: 125.08 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									eccentricity: 0.0549, // ratio
									apoapsis: 0.002710, // AU
									periapsis: 0.002424, // AU
									argumentOfPeriapsis: 318.15 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
								},
							}
						},
						"star-0-planet-3": {
							name: "Mars",
							description: "",
							color: "#ea7a56", // #hex
							massFactor: 6.4171, // kg
							massPower: 23, // 10^x
							day: calculateDayFromPeriapsis(686.980, "2022-06-21T00:00"), // d
							period: 686.980, // d
							semiMajorAxis: 1.523679, // AU
							retrograde: false,
							inclination: 1.63 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							longitudeOfAscendingNode: -49.558 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians // positive value made orbit cross Earth !!!
							eccentricity: 0.0934, // ratio
							apoapsis: 1.666, // AU
							periapsis: 1.382, // AU
							argumentOfPeriapsis: 286.502 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							moons: {
								"star-0-planet-3-moon-0": {
									name: "Phobos",
									description: "",
									color: "#958075",
									massFactor: 1.0659, // kg
									massPower: 16, // 10^x
									day: 0, // d
									period: 0.318910, // d
									semiMajorAxis: 0.000063, // AU
									retrograde: false,
									inclination: (-1.63 + 1.1) * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians // subtract out planet inclination !!!
									longitudeOfAscendingNode: 169.2 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									eccentricity: 0.0151, // ratio
									apoapsis: 0.000064, // AU
									periapsis: .000062, // AU
									argumentOfPeriapsis: 216.3 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
								},
								"star-0-planet-3-moon-1": {
									name: "Deimos",
									description: "",
									color: "#bfa78d",
									massFactor: 1.4762, // kg
									massPower: 15, // 10^x
									day: 0, // d
									period: 1.263, // d
									semiMajorAxis: 0.000157, // AU
									retrograde: false,
									inclination: (-1.63 + 1.8) * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									longitudeOfAscendingNode: 54.4 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									eccentricity: 0.00033, // ratio
									apoapsis: 0.000157, // AU
									periapsis: 0.000157, // AU
									argumentOfPeriapsis: 0.0 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
								},
							}
						},
						"star-0-planet-4": {
							name: "Vesta",
							description: "",
							color: "#8c877b", // #hex
							massFactor: 2.59076, // kg
							massPower: 20, // 10^x
							day: calculateDayFromPeriapsis(686.98, "2021-12-26T00:00"), // d
							period: 1325.75, // d
							semiMajorAxis: 2.36179, // AU
							retrograde: false,
							inclination: 5.58 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							longitudeOfAscendingNode: 103.85136 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							eccentricity: 0.08874, // ratio
							apoapsis: 2.57138, // AU
							periapsis: 2.15221, // AU
							argumentOfPeriapsis: 151.19853 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							position: {visible: false},
							moons: {}
						},
						"star-0-planet-5": {
							name: "Ceres",
							description: "",
							color: "#847d77", // #hex
							massFactor: 9.3835, // kg
							massPower: 20, // 10^x
							day: calculateDayFromPeriapsis(686.98, "2022-12-07T00:00"), // d
							period: 1680, // d
							semiMajorAxis: 2.77, // AU
							retrograde: false,
							inclination: 9.20 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							longitudeOfAscendingNode: 80.3 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							eccentricity: 0.0785, // ratio
							apoapsis: 2.98, // AU
							periapsis: 2.55, // AU
							argumentOfPeriapsis: 73.6 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							position: {visible: false},
							moons: {}
						},
						"star-0-planet-6": {
							name: "Pallas",
							description: "",
							color: "#dedede", // #hex
							massFactor: 2.04, // kg
							massPower: 20, // 10^x
							day: calculateDayFromPeriapsis(686.98, "2023-03-06T00:00"), // d
							period: 1684.9, // d
							semiMajorAxis: 2.77, // AU
							retrograde: false,
							inclination: 34.43 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							longitudeOfAscendingNode: 172.9 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							eccentricity: 0.23, // ratio
							apoapsis: 3.41, // AU
							periapsis: 2.13, // AU
							argumentOfPeriapsis: 310.7 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							position: {visible: false},
							moons: {}
						},
						"star-0-planet-7": {
							name: "Jupiter",
							description: "",
							color: "#ba9779", // #hex
							massFactor: 1.8982, // kg
							massPower: 27, // 10^x
							day: calculateDayFromPeriapsis(4332.59, "2023-01-21T00:00"), // d
							period: 4332.59, // d
							semiMajorAxis: 5.2044, // AU
							retrograde: false,
							inclination: 0.32 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							longitudeOfAscendingNode: 100.464 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							eccentricity: 0.0489, // ratio
							apoapsis: 5.4588, // AU
							periapsis: 4.9501, // AU
							argumentOfPeriapsis: 273.867 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							moons: {
								"star-0-planet-7-moon-0": {
									name: "Io",
									description: "",
									color: "#fbf690",
									massFactor: 8.931938, // kg
									massPower: 22, // 10^x
									day: 0, // d
									period: 1.769138, // d
									semiMajorAxis: 0.002819, // AU
									retrograde: false,
									inclination: (-0.32 + 0) * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									longitudeOfAscendingNode: 0 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									eccentricity: 0.0041, // ratio
									apoapsis: 0.002830, // AU
									periapsis: 0.002807, // AU
									argumentOfPeriapsis: 49.1 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
								},
								"star-0-planet-7-moon-1": {
									name: "Europa",
									description: "",
									color: "#8c6438",
									massFactor: 4.799844, // kg
									massPower: 22, // 10^x
									day: 0, // d
									period: 3.551181, // d
									semiMajorAxis: 0.004485, // AU
									retrograde: false,
									inclination: (-0.32 + 0.5) * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									longitudeOfAscendingNode: 184.0 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									eccentricity: 0.0094, // ratio
									apoapsis: 0.004525, // AU
									periapsis: 0.004444, // AU
									argumentOfPeriapsis: 45.0 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
								},
								"star-0-planet-7-moon-2": {
									name: "Ganymede",
									description: "",
									color: "#9c8b79",
									massFactor: 1.4819, // kg
									massPower: 23, // 10^x
									day: 0, // d
									period: 7.154553, // d
									semiMajorAxis: 0.007155, // AU
									retrograde: false,
									inclination: (-0.32 + 0.2) * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									longitudeOfAscendingNode: 58.5 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									eccentricity: 0.0013, // ratio
									apoapsis: 0.007163, // AU
									periapsis: 0.007147, // AU
									argumentOfPeriapsis: 198.3 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
								},
								"star-0-planet-7-moon-3": {
									name: "Callisto",
									description: "",
									color: "#5a523b",
									massFactor: 1.075938, // kg
									massPower: 23, // 10^x
									day: 0, // d
									period: 16.689018, // d
									semiMajorAxis: 0.012585, // AU
									retrograde: false,
									inclination: (-0.32 + 0.3) * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									longitudeOfAscendingNode: 309.1 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									eccentricity: 0.0074, // ratio
									apoapsis: 0.0126807, // AU
									periapsis: 0.012493, // AU
									argumentOfPeriapsis: 43.8 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
								},
							}
						},
						"star-0-planet-8": {
							name: "Saturn",
							description: "",
							color: "#e2c17f", // #hex
							massFactor: 5.6834, // kg
							massPower: 26, // 10^x
							day: calculateDayFromPeriapsis(10759.22, "2032-11-29T00:00"), // d
							period: 10759.22, // d
							semiMajorAxis: 9.5826, // AU
							retrograde: false,
							inclination: 0.93 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							longitudeOfAscendingNode: 113.665 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							eccentricity: 0.054, // ratio
							apoapsis: 10.1238, // AU
							periapsis: 9.0412, // AU
							argumentOfPeriapsis: 339.392 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							moons: {
								"star-0-planet-8-moon-0": {
									name: "Mimas",
									description: "",
									color: "#7D7D7D",
									massFactor: 3.7493, // kg
									massPower: 19, // 10^x
									day: 0, // d
									period: 0.942422, // d
									semiMajorAxis: 0.001240, // AU
									retrograde: false,
									inclination: (-0.93 + 1.6) * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									longitudeOfAscendingNode: 66.2 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									eccentricity: 0.0196, // ratio
									apoapsis: 0.001265, // AU
									periapsis: 0.001216, // AU
									argumentOfPeriapsis: 160.4 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
								},
								"star-0-planet-8-moon-1": {
									name: "Enceladus",
									description: "",
									color: "#F2F2F2",
									massFactor: 1.08022, // kg
									massPower: 20, // 10^x
									day: 0, // d
									period: 1.37022, // d
									semiMajorAxis: 0.001591, // AU
									retrograde: false,
									inclination: (-0.93 + 0) * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									longitudeOfAscendingNode: 0 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									eccentricity: 0.0047, // ratio
									apoapsis: 0.001598, // AU
									periapsis: 0.001584, // AU
									argumentOfPeriapsis: 119.5 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
								},
								"star-0-planet-8-moon-2": {
									name: "Tethys",
									description: "",
									color: "#BEBEBE",
									massFactor: 6.17449, // kg
									massPower: 20, // 10^x
									day: 0, // d
									period: 1.887802, // d
									semiMajorAxis: 0.001969, // AU
									retrograde: false,
									inclination: (-0.93 + 1.1) * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									longitudeOfAscendingNode: 273.0 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									eccentricity: 0.0001, // ratio
									apoapsis: 0.001969, // AU
									periapsis: 0.001969, // AU
									argumentOfPeriapsis: 335.3 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
								},
								"star-0-planet-8-moon-3": {
									name: "Dione",
									description: "",
									color: "#C1C1C1",
									massFactor: 1.095452, // kg
									massPower: 21, // 10^x
									day: 0, // d
									period: 2.736915, // d
									semiMajorAxis: 0.002523, // AU
									retrograde: false,
									inclination: (-0.93 + 0) * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									longitudeOfAscendingNode: 0 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									eccentricity: 0.0022, // ratio
									apoapsis: 0.002529, // AU
									periapsis: 0.002517, // AU
									argumentOfPeriapsis: 116.0 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
								},
								"star-0-planet-8-moon-4": {
									name: "Rhea",
									description: "",
									color: "#D7D2BF",
									massFactor: 2.306518, // kg
									massPower: 21, // 10^x
									day: 0, // d
									period: 4.518212, // d
									semiMajorAxis: 0.003523, // AU
									retrograde: false,
									inclination: (-0.93 + 0.3) * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									longitudeOfAscendingNode: 133.7	* CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									eccentricity: 0.001258, // ratio
									apoapsis: 0.003528, // AU
									periapsis: 0.003518, // AU
									argumentOfPeriapsis: 44.3 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
								},
								"star-0-planet-8-moon-5": {
									name: "Titan",
									description: "",
									color: "#765A32",
									massFactor: 1.345200, // kg
									massPower: 23, // 10^x
									day: 0, // d
									period: 15.9454, // d
									semiMajorAxis: 0.008168, // AU
									retrograde: false,
									inclination: (-0.93 + 0.3) * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									longitudeOfAscendingNode: 78.6 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									eccentricity: 0.0288, // ratio
									apoapsis: 0.008403, // AU
									periapsis: 0.007932, // AU
									argumentOfPeriapsis: 78.3 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
								},
								"star-0-planet-8-moon-6": {
									name: "Iapetus",
									description: "",
									color: "#5C5A47",
									massFactor: 1.805635, // kg
									massPower: 21, // 10^x
									day: 0, // d
									period: 79.3215, // d
									semiMajorAxis: 0.023803, // AU
									retrograde: false,
									inclination: (-0.93 + 7.6) * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									longitudeOfAscendingNode: 86.5 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									eccentricity: 0.027681, // ratio
									apoapsis: 0.024462, // AU
									periapsis: 0.023144, // AU
									argumentOfPeriapsis: 254.5 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
								},
							}
						},
						"star-0-planet-9": {
							name: "Uranus",
							description: "",
							color: "#6c7e87", // #hex
							massFactor: 8.6810, // kg
							massPower: 25, // 10^x
							day: calculateDayFromPeriapsis(30688.5, "2050-08-18T00:00"), // d
							period: 30688.5, // d
							semiMajorAxis: 19.19126, // AU
							retrograde: false,
							inclination: 0.99 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							longitudeOfAscendingNode: 74.006 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							eccentricity: 0.04717, // ratio
							apoapsis: 20.0965, // AU
							periapsis: 18.2861, // AU
							argumentOfPeriapsis: 96.998857 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							moons: {
								"star-0-planet-9-moon-0": {
									name: "Miranda",
									description: "",
									color: "#bababa",
									massFactor: 6.400, // kg
									massPower: 19, // 10^x
									day: 0, // d
									period: 1.413479, // d
									semiMajorAxis: 0.000865, // AU
									retrograde: false,
									inclination: (-0.99 + 4.4) * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									longitudeOfAscendingNode: 100.7 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									eccentricity: 0.0013, // ratio
									apoapsis: 0.000866, // AU
									periapsis: 0.000864, // AU
									argumentOfPeriapsis: 155.6 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
								},
								"star-0-planet-9-moon-1": {
									name: "Ariel",
									description: "",
									color: "#d6d6d6",
									massFactor: 1.25100, // kg
									massPower: 21, // 10^x
									day: 0, // d
									period: 2.52038, // d
									semiMajorAxis: 0.001277, // AU
									retrograde: false,
									inclination: (-0.99 + 0) * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									longitudeOfAscendingNode: 0 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									eccentricity: 0.0012, // ratio
									apoapsis: 0.001279, // AU
									periapsis: 0.001275, // AU
									argumentOfPeriapsis: 83.3 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
								},
								"star-0-planet-9-moon-2": {
									name: "Umbriel",
									description: "",
									color: "#5b5b5b",
									massFactor: 1.275, // kg
									massPower: 21, // 10^x
									day: 0, // d
									period: 4.14418, // d
									semiMajorAxis: 0.001778, // AU
									retrograde: false,
									inclination: (-0.99 + 0.1) * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									longitudeOfAscendingNode: 195.5 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									eccentricity: 0.0039, // ratio
									apoapsis: 0.001785, // AU
									periapsis: 0.001771, // AU
									argumentOfPeriapsis: 157.5 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
								},
								"star-0-planet-9-moon-3": {
									name: "Titania",
									description: "",
									color: "#c8bfb2",
									massFactor: 3.40000, // kg
									massPower: 21, // 10^x
									day: 0, // d
									period: 8.706234, // d
									semiMajorAxis: 0.002914, // AU
									retrograde: false,
									inclination: (-0.99 + 0.1) * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									longitudeOfAscendingNode: 26.4 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									eccentricity: 0.0011, // ratio
									apoapsis: 0.002917, // AU
									periapsis: 0.002911, // AU
									argumentOfPeriapsis: 202.0 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
								},
								"star-0-planet-9-moon-4": {
									name: "Oberon",
									description: "",
									color: "#b0a299",
									massFactor: 3.07600, // kg
									massPower: 21, // 10^x
									day: 0, // d
									period: 13.463234, // d
									semiMajorAxis: 0.003901, // AU
									retrograde: false,
									inclination: (-0.99 + 0.1) * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									longitudeOfAscendingNode: 30.5 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									eccentricity: 0.0014, // ratio
									apoapsis: 0.003906, // AU
									periapsis: 0.003896, // AU
									argumentOfPeriapsis: 182.4 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
								},
							}
						},
						"star-0-planet-10": {
							name: "Neptune",
							description: "",
							color: "#6280af", // #hex
							massFactor: 1.02413, // kg
							massPower: 26, // 10^x
							day: calculateDayFromPeriapsis(60195, "2042-09-04T00:00"), // d
							period: 60195, // d
							semiMajorAxis: 30.07, // AU
							retrograde: false,
							inclination: 0.74 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							longitudeOfAscendingNode: 131.783 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							eccentricity: 0.008678, // ratio
							apoapsis: 30.33, // AU
							periapsis: 29.81, // AU
							argumentOfPeriapsis: 273.187 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							moons: {
								"star-0-planet-10-moon-0": {
									name: "Proteus",
									description: "",
									color: "#e4e4e4",
									massFactor: 4.400, // kg
									massPower: 19, // 10^x
									day: 0, // d
									period: 1.122315, // d
									semiMajorAxis: 0.000786, // AU
									retrograde: false,
									inclination: (-0.74 + 0) * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									longitudeOfAscendingNode: 0 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									eccentricity: 0.00053, // ratio
									apoapsis: 0.000787, // AU
									periapsis: 0.000786, // AU
									argumentOfPeriapsis: 0 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
								},
								"star-0-planet-10-moon-1": {
									name: "Triton",
									description: "",
									color: "#6f6457",
									massFactor: 2.1390, // kg
									massPower: 22, // 10^x
									day: 0, // d
									period: 5.876854, // d
									semiMajorAxis: 0.002371, // AU
									inclination: (-0.74 + 157.3) * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									longitudeOfAscendingNode: 178.1 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									retrograde: true,
									eccentricity: 0.000016, // ratio
									apoapsis: 0.002371, // AU
									periapsis: 0.002371, // AU
									argumentOfPeriapsis: 0 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
								},
								"star-0-planet-10-moon-2": {
									name: "Nereid",
									description: "",
									color: "#e2e2e2",
									massFactor: 2.700, // kg
									massPower: 19, // 10^x
									day: 0, // d
									period: 360.11, // d
									semiMajorAxis: 0.036858, // AU
									retrograde: false,
									inclination: (-0.74 + 5.0) * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									longitudeOfAscendingNode: 321.6 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									eccentricity: 0.741748, // ratio
									apoapsis: 0.064197, // AU
									periapsis: 0.009519, // AU
									argumentOfPeriapsis: 295.3 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
								},
							}
						},
						"star-0-planet-11": {
							name: "Pluto",
							description: "",
							color: "#d8cab7", // #hex
							massFactor: 1.303, // kg
							massPower: 22, // 10^x
							day: calculateDayFromPeriapsis(90560, "1989-09-05T00:00"), // d
							period: 90560, // d
							semiMajorAxis: 39.482, // AU
							retrograde: false,
							inclination: -15.58 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							longitudeOfAscendingNode: 110.299 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							eccentricity: 0.2488, // ratio
							apoapsis: 49.305, // AU
							periapsis: 29.658, // AU
							argumentOfPeriapsis: 113.834 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							moons: {
								"star-0-planet-11-moon-0": {
									name: "Charon",
									description: "",
									color: "#979596",
									massFactor: 1.586, // kg
									massPower: 21, // 10^x
									day: 0, // d
									period: 6.387230, // d
									semiMajorAxis: 0.000131, // AU
									retrograde: false,
									inclination: (-15.58 + 0) * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									longitudeOfAscendingNode: 0 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									eccentricity: 0.0002, // ratio
									apoapsis: 0.000131, // AU
									periapsis: 0.000131, // AU
									argumentOfPeriapsis: 0 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
								},
							}
						},
						"star-0-planet-12": {
							name: "Encke",
							description: "",
							color: "#cbcbcb", // #hex
							massFactor: 2.0, // kg
							massPower: 13, // 10^x
							period: 3.30 * 365.25, // d
							day: calculateDayFromPeriapsis(3.30 * 365.25, "2023-10-22T00:00"), // d
							semiMajorAxis: 2.2178, // AU
							retrograde: false,
							inclination: 10.18 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							longitudeOfAscendingNode: 334.49 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							eccentricity: 0.8471, // ratio
							apoapsis: 4.11, // AU
							periapsis: 0.3302, // AU
							argumentOfPeriapsis: 186.5665 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							position: {visible: false},
							moons: {}
						},
						"star-0-planet-13": {
							name: "Tempel 1",
							description: "",
							color: "#494949", // #hex
							massFactor: 2.0, // kg
							massPower: 14, // 10^x
							period: 5.58 * 365.25, // d
							day: calculateDayFromPeriapsis(5.58 * 365.25, "2022-03-04T00:00"), // d
							semiMajorAxis: 3.145, // AU
							retrograde: false,
							inclination: 8.894 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							longitudeOfAscendingNode: 68.75 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							eccentricity: 0.5096, // ratio
							apoapsis: 4.748, // AU
							periapsis: 1.542, // AU
							argumentOfPeriapsis: 179.21 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							position: {visible: false},
							moons: {}
						},
						"star-0-planet-14": {
							name: "Wild 2",
							description: "",
							color: "#a2a2a2", // #hex
							massFactor: 2.3, // kg
							massPower: 13, // 10^x
							period: 6.408 * 365.25, // d
							day: calculateDayFromPeriapsis(6.408 * 365.25, "2022-12-15T00:00"), // d
							semiMajorAxis: 3.45, // AU
							retrograde: false,
							inclination: 1.66 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							longitudeOfAscendingNode: 136.098138 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							eccentricity: 0.5384, // ratio
							apoapsis: 5.308, // AU
							periapsis: 1.592, // AU
							argumentOfPeriapsis: 41.731965 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							position: {visible: false},
							moons: {}
						},
						"star-0-planet-15": {
							name: "Borrelly",
							description: "",
							color: "#929292", // #hex
							massFactor: 2.0, // kg
							massPower: 13, // 10^x
							period: 6.8 * 365.25, // d
							day: calculateDayFromPeriapsis(6.8 * 365.25, "2022-02-01T00:00"), // d
							semiMajorAxis: 3.59, // AU
							retrograde: false,
							inclination: 28.7 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							longitudeOfAscendingNode: 74.25 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							eccentricity: 0.624, // ratio
							apoapsis: 5.86, // AU
							periapsis: 1.35, // AU
							argumentOfPeriapsis: 351.92 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							position: {visible: false},
							moons: {}
						},
						"star-0-planet-16": {
							name: "Tempel-Tuttle",
							description: "",
							color: "#a2a2a2", // #hex
							massFactor: 1.2, // kg
							massPower: 13, // 10^x
							period: 33.2226 * 365.25, // d
							day: calculateDayFromPeriapsis(33.2226 * 365.25, "2031-05-20T00:00"), // d
							semiMajorAxis: 10.3345, // AU
							retrograde: false,
							inclination: 160.91 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							longitudeOfAscendingNode: 235.41 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							eccentricity: 0.9055, // ratio
							apoapsis: 19.6924, // AU
							periapsis: 0.9766, // AU
							argumentOfPeriapsis: 172.5893 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							position: {visible: false},
							moons: {}
						},
						"star-0-planet-17": {
							name: "Halley's Comet",
							description: "",
							color: "#da671b", // #hex
							massFactor: 2.2, // kg
							massPower: 14, // 10^x
							period: 75.32 * 365.25, // d
							day: calculateDayFromPeriapsis(75.32 * 365.256, "2061-07-28T00:00"), // d
							semiMajorAxis: 17.834, // AU
							retrograde: false,
							inclination: 160.68 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							longitudeOfAscendingNode: 58.98 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							eccentricity: 0.96714, // ratio
							apoapsis: 35.082, // AU
							periapsis: 0.586, // AU
							argumentOfPeriapsis: 111.33 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							moons: {}
						},
						"star-0-planet-18": {
							name: "Hale-Bopp",
							description: "",
							color: "#7698d8", // #hex
							massFactor: 1.3, // kg
							massPower: 19, // 10^x
							period: 2525 * 365.25, // d
							day: calculateDayFromPeriapsis(2525 * 365.25, "1997-04-01T00:00"), // d
							semiMajorAxis: 186, // AU
							retrograde: false,
							inclination: 87.8 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							longitudeOfAscendingNode: 58.98 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							eccentricity: 0.995086, // ratio
							apoapsis: 370.8, // AU
							periapsis: 0.914, // AU
							argumentOfPeriapsis: 282.47 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							position: {visible: false},
							moons: {}
						},
					}
				}
			}
		}

	/* elements */
		const ELEMENTS = {
			options: {
				button: document.querySelector("#options-button"),
				overlay: document.querySelector("#options-overlay"),
				header: document.querySelector("#options-header"),
			},
			controls: {
				element: document.querySelector("#controls"),
				play: document.querySelector("#controls-play"),
				rate: document.querySelector("#controls-rate"),
				ratePower: document.querySelector("#controls-rate-power"),
				zoom: document.querySelector("#controls-zoom"),
				zoomPower: document.querySelector("#controls-zoom-power"),
				tracking: document.querySelector("#controls-tracking"),
				x: document.querySelector("#controls-x"),
				y: document.querySelector("#controls-y"),
				upload: document.querySelector("#controls-upload"),
				download: document.querySelector("#controls-download")
			},
			stars: document.querySelector("#stars"),
			planets: document.querySelector("#planets"),
			planetsAdd: document.querySelector("#planets-add"),
			planetsClear: document.querySelector("#planets-clear"),
			simulation: {
				canvas: document.querySelector("#simulation"),
				context: document.querySelector("#simulation").getContext("2d")
			}
		}

	/* state */
		const STATE = {
			loop: null,
			grab: {
				grabbing: false,
				x: null,
				y: null
			},
			controls: {
				play: true,
				rate: 2, // d/s
				zoom: 100, // AU/px
				x: 0, // AU
				y: 0, // AU
				tracking: {
					star: null,
					planet: null,
					moon: null
				}
			},
			field: {
				stars: []
			},
			stars: {}
		}

/*** inputs - controls menu ***/
	/* setDefaults */
		setDefaults()
		function setDefaults() {
			try {
				// set control limits
					ELEMENTS.controls.ratePower.min  = CONSTANTS.limit.minimumRatePower // 10^x
					ELEMENTS.controls.ratePower.max  = CONSTANTS.limit.maximumRatePower // 10^x
					ELEMENTS.controls.ratePower.step = CONSTANTS.limit.stepRatePower // 10^x

					ELEMENTS.controls.zoomPower.min  = CONSTANTS.limit.minimumZoomPower // 10^x
					ELEMENTS.controls.zoomPower.max  = CONSTANTS.limit.maximumZoomPower // 10^x
					ELEMENTS.controls.zoomPower.step = CONSTANTS.limit.stepZoomPower // 10^x

					ELEMENTS.controls.x.step = CONSTANTS.limit.stepOffset // AU
					ELEMENTS.controls.y.step = CONSTANTS.limit.stepOffset // AU

				// set controls
					ELEMENTS.controls.rate.value = STATE.controls.rate // d/s
					ELEMENTS.controls.ratePower.value = roundNumber(Math.log10(STATE.controls.rate)) // 10^x
					ELEMENTS.controls.zoom.value = STATE.controls.zoom // AU/px
					ELEMENTS.controls.zoomPower.value = roundNumber(Math.log10(STATE.controls.zoom)) // 10^x
					ELEMENTS.controls.x.value = STATE.controls.x // AU
					ELEMENTS.controls.y.value = STATE.controls.y // AU
					ELEMENTS.controls.play.setAttribute("play", STATE.controls.play || false)

				// loop through stars
					for (let i in CONSTANTS.defaults.stars) {
						let star = createStar(CONSTANTS.defaults.stars[i])
						STATE.stars[star.id] = star
						ELEMENTS.stars.appendChild(star.elements.section)
					}

				// no tracking
					STATE.controls.tracking.star = null
					STATE.controls.tracking.planet = null
					STATE.controls.tracking.moon = null

				// begin loop
					resizeCanvas()
					simulateSystem()
					STATE.loop = setInterval(simulateSystem, CONSTANTS.convert.second_to_ms / CONSTANTS.convert.second_to_loop)
			} catch (error) {console.log(error)}
		}

	/* toggleOverlay */
		ELEMENTS.options.button.addEventListener(TRIGGERS.click, toggleOverlay)
		function toggleOverlay(event) {
			try {
				// open --> close
					if (ELEMENTS.options.overlay.getAttribute("active")) {
						ELEMENTS.options.button.removeAttribute("active")
						ELEMENTS.options.overlay.removeAttribute("active")
						return
					}

				// close --> open
					ELEMENTS.options.button.setAttribute("active", true)
					ELEMENTS.options.overlay.setAttribute("active", true)
			} catch (error) {console.log(error)}
		}

	/* scrollToTop */
		ELEMENTS.options.header.addEventListener(TRIGGERS.click, scrollToTop)
		function scrollToTop(event) {
			try {
				// change scroll position
					ELEMENTS.options.overlay.scrollTop = 0
			} catch (error) {console.log(error)}
		}

	/* changePlay */
		ELEMENTS.controls.play.addEventListener(TRIGGERS.click, changePlay)
		function changePlay(event) {
			try {
				// flip current state
					STATE.controls.play = !STATE.controls.play

				// update button
					ELEMENTS.controls.play.setAttribute("play", STATE.controls.play || false)
			} catch (error) {console.log(error)}
		}

	/* changeRate */
		ELEMENTS.controls.rate.addEventListener(TRIGGERS.input, changeRate)
		function changeRate(event) {
			try {
				// days per second
					// get rate
						let rate = Number(ELEMENTS.controls.rate.value) // d/s

					// errors
						if (!rate) {
							return
						}

					// save new value
						STATE.controls.rate = roundNumber(rate) // d/s

					// set value
						ELEMENTS.controls.ratePower.value = roundNumber(Math.log10(rate)) // 10^x
			} catch (error) {console.log(error)}
		}

	/* changeRatePower */
		ELEMENTS.controls.ratePower.addEventListener(TRIGGERS.input, changeRatePower)
		function changeRatePower(event) {
			try {
				// days per second (logarithmic)
					// get ratePower
						let ratePower = Number(ELEMENTS.controls.ratePower.value) // 10^x

					// get rate
						let rate = roundNumber(10 ** ratePower) // d/s

					// set & save value
						ELEMENTS.controls.rate.value = STATE.controls.rate = rate // d/s
			} catch (error) {console.log(error)}
		}

	/* changeZoom */
		ELEMENTS.controls.zoom.addEventListener(TRIGGERS.input, changeZoom)
		function changeZoom(event) {
			try {
				// days per second
					// get zoom
						let zoom = Number(ELEMENTS.controls.zoom.value) // AU/px

					// errors
						if (!zoom) {
							return
						}

					// save new value
						STATE.controls.zoom = roundNumber(zoom) // AU/px

					// set value
						ELEMENTS.controls.zoomPower.value = roundNumber(Math.log10(zoom)) // 10^x
			} catch (error) {console.log(error)}
		}

	/* changeZoomPower */
		ELEMENTS.controls.zoomPower.addEventListener(TRIGGERS.input, changeZoomPower)
		function changeZoomPower(event) {
			try {
				// days per second (logarithmic)
					// get zoomPower
						let zoomPower = Number(ELEMENTS.controls.zoomPower.value) // 10^x

					// get zoom
						let zoom = roundNumber(10 ** zoomPower) // AU/px

					// set & save value
						ELEMENTS.controls.zoom.value = STATE.controls.zoom = zoom // AU/px
			} catch (error) {console.log(error)}
		}

	/* changeOffset */
		ELEMENTS.controls.x.addEventListener(TRIGGERS.input, changeOffset)
		ELEMENTS.controls.y.addEventListener(TRIGGERS.input, changeOffset)
		function changeOffset(event) {
			try {
				// get x & y
					let x = Number(ELEMENTS.controls.x.value) // AU
					let y = Number(ELEMENTS.controls.y.value) // AU

				// set state
					STATE.controls.x = roundNumber(x) // AU
					STATE.controls.y = roundNumber(y) // AU

				// stop tracking
					if (STATE.controls.tracking.star || STATE.controls.tracking.planet || STATE.controls.tracking.moon) {
						changeTracking(false)
					}
			} catch (error) {console.log(error)}
		}

	/* changeTracking */
		function changeTracking(event) {
			try {
				// previous tracking
					if (STATE.controls.tracking.star) {
						if (STATE.controls.tracking.planet) {
							if (STATE.controls.tracking.moon) {
								STATE.stars[STATE.controls.tracking.star].planets[STATE.controls.tracking.planet].moons[STATE.controls.tracking.moon].position.tracking = false
							}
							else {
								STATE.stars[STATE.controls.tracking.star].planets[STATE.controls.tracking.planet].position.tracking = false
							}
						}
						else {
							STATE.stars[STATE.controls.tracking.star].position.tracking = false
						}
					}

				// clear tracking
					STATE.controls.tracking.star = null
					STATE.controls.tracking.planet = null
					STATE.controls.tracking.moon = null

				// no event
					if (!event) {
						ELEMENTS.controls.tracking.checked = true
						return
					}

				// new tracking
					let current = event.target.value
					STATE.controls.tracking.star   = current.includes("star-")   ? current.split("-planet-")[0] : null
					STATE.controls.tracking.planet = current.includes("planet-") ? current.split("-moon-")[0] : null
					STATE.controls.tracking.moon   = current.includes("moon-")   ? current : null

					if (STATE.controls.tracking.star) {
						if (STATE.controls.tracking.planet) {
							if (STATE.controls.tracking.moon) {
								STATE.stars[STATE.controls.tracking.star].planets[STATE.controls.tracking.planet].moons[STATE.controls.tracking.moon].position.tracking = true
								STATE.stars[STATE.controls.tracking.star].planets[STATE.controls.tracking.planet].moons[STATE.controls.tracking.moon].elements.visible.checked = STATE.stars[STATE.controls.tracking.star].planets[STATE.controls.tracking.planet].moons[STATE.controls.tracking.moon].position.visible = true
							}
							else {
								STATE.stars[STATE.controls.tracking.star].planets[STATE.controls.tracking.planet].position.tracking = true
								STATE.stars[STATE.controls.tracking.star].planets[STATE.controls.tracking.planet].elements.visible.checked = STATE.stars[STATE.controls.tracking.star].planets[STATE.controls.tracking.planet].position.visible = true
							}
						}
						else {
							STATE.stars[STATE.controls.tracking.star].position.tracking = true
							STATE.stars[STATE.controls.tracking.star].elements.visible.checked = STATE.stars[STATE.controls.tracking.star].position.visible = true
						}
					}

			} catch (error) {console.log(error)}
		}

	/* uploadFile */
		ELEMENTS.controls.upload.addEventListener(TRIGGERS.input, uploadFile)
		function uploadFile() {
			try {
				// get file
					let file = ELEMENTS.controls.upload.files[0]

				// no file
					if (!file) {
						return
					}

				// read file
					let reader = new FileReader()
						reader.readAsText(file)
						reader.onload = function(event) {
							try {
								// try to parse data
									let data = String(event.target.result)
									if (!data || !data.length) {
										return
									}
									data = JSON.parse(data)

								// clear existing data
									for (let starId in STATE.stars) {
										for (let planetId in STATE.stars[starId].planets) {
											STATE.stars[starId].planets[planetId].elements.section.remove()
										}
										STATE.stars[starId].elements.section.remove()
									}
									STATE.stars = {}

								// loop through data to create stars
									for (let i in data) {
										let star = createStar(data[i])
										STATE.stars[star.id] = star
										ELEMENTS.stars.appendChild(star.elements.section)
									}
							} catch (error) {console.log(error)}
							ELEMENTS.controls.upload.value = null
						}
			} catch (error) {console.log(error)}
		}

	/* downloadFile */
		ELEMENTS.controls.download.addEventListener(TRIGGERS.click, downloadFile)
		function downloadFile() {
			try {
				// copy
					let stars = duplicateObject(STATE.stars)

				// loop through stars
					for (let starId in stars) {
						// remove elements & computed
							delete stars[starId].elements
							delete stars[starId].computed

						// loop through planets
							for (let planetId in stars[starId].planets) {
								// remove elements & computed
									delete stars[starId].planets[planetId].elements
									delete stars[starId].planets[planetId].computed

								// loop through moons
									for (let moonId in stars[starId].planets[planetId].moons) {
										// remove elements & computed
											delete stars[starId].planets[planetId].moons[moonId].elements
											delete stars[starId].planets[planetId].moons[moonId].computed
									}
							}
					}

				// package up
					let link = document.createElement("a")
						link.id = "controls-download-link"
						link.setAttribute("href", "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(stars)))
						link.setAttribute("download", "orbitMaker_" + (new Date().getTime()) + ".json")
						link.addEventListener(TRIGGERS.click, function() {
							var link = document.getElementById("controls-download-link")
							document.body.removeChild(link)
						})
				
				// click
					document.body.appendChild(link)
					link.click()
			} catch (error) {console.log(error)}
		}

/*** inputs - outside of menu ***/
	/* pressKey */
		window.addEventListener(TRIGGERS.keydown, pressKey)
		function pressKey(event) {
			try {
				// activeElement
					if (document.activeElement && document.activeElement !== document.body && document.activeElement !== ELEMENTS.simulation.canvas) {
						return
					}

				// space --> play/pause
					if (event.key == " " || event.keyCode == 32 || event.code == "Space") {
						changePlay()
						return
					}

				// plus/minus --> zoom
					if (event.key == "-" || event.key == "_" || event.keyCode == 189 || event.code == "Minus") {
						let zoomPower = Math.log10(STATE.controls.zoom) // 10^x
							zoomPower = roundNumber(Math.max(CONSTANTS.limit.minimumZoomPower, zoomPower - CONSTANTS.limit.stepZoomPower)) // 10^x
						ELEMENTS.controls.zoomPower.value = zoomPower
						ELEMENTS.controls.zoom.value = STATE.controls.zoom = roundNumber(10 ** zoomPower) // d/s
						return
					}
					if (event.key == "+" || event.key == "=" || event.keyCode == 187 || event.code == "Plus" || event.code == "Equal") {
						let zoomPower = Math.log10(STATE.controls.zoom) // 10^x
							zoomPower = roundNumber(Math.min(CONSTANTS.limit.maximumZoomPower, zoomPower + CONSTANTS.limit.stepZoomPower)) // 10^x
						ELEMENTS.controls.zoomPower.value = zoomPower
						ELEMENTS.controls.zoom.value = STATE.controls.zoom = roundNumber(10 ** zoomPower) // d/s
						return
					}

				// brackets --> rate
					if (event.key == "[" || event.keyCode == 91 || event.code == "BracketLeft" || event.key == "," || event.key == "<" || event.keyCode == 188 || event.code == "Comma") {
						let ratePower = Math.log10(STATE.controls.rate) // 10^x
							ratePower = roundNumber(Math.max(CONSTANTS.limit.minimumRatePower, ratePower - CONSTANTS.limit.stepRatePower)) // 10^x
						ELEMENTS.controls.ratePower.value = ratePower
						ELEMENTS.controls.rate.value = STATE.controls.rate = roundNumber(10 ** ratePower) // d/s
						return
					}
					if (event.key == "]" || event.keyCode == 93 || event.code == "BracketRight" || event.key == "." || event.key == ">" || event.keyCode == 190 || event.code == "Period") {
						let ratePower = Math.log10(STATE.controls.rate) // 10^x
							ratePower = roundNumber(Math.min(CONSTANTS.limit.maximumRatePower, ratePower + CONSTANTS.limit.stepRatePower)) // 10^x
						ELEMENTS.controls.ratePower.value = ratePower
						ELEMENTS.controls.rate.value = STATE.controls.rate = roundNumber(10 ** ratePower) // d/s
						return
					}

				// arrows --> offset
					if (event.key == "ArrowLeft" || event.keyCode == 37 || event.code == "ArrowLeft") {
						ELEMENTS.controls.x.value = STATE.controls.x = STATE.controls.x - CONSTANTS.limit.stepOffset
						ELEMENTS.controls.tracking.checked = true
						STATE.controls.tracking.star = null
						STATE.controls.tracking.planet = null
						STATE.controls.tracking.moon = null
						return
					}
					if (event.key == "ArrowRight" || event.keyCode == 39 || event.code == "ArrowRight") {
						ELEMENTS.controls.x.value = STATE.controls.x = STATE.controls.x + CONSTANTS.limit.stepOffset
						ELEMENTS.controls.tracking.checked = true
						STATE.controls.tracking.star = null
						STATE.controls.tracking.planet = null
						STATE.controls.tracking.moon = null
						return
					}
					if (event.key == "ArrowUp" || event.keyCode == 38 || event.code == "ArrowUp") {
						ELEMENTS.controls.y.value = STATE.controls.y = STATE.controls.y + CONSTANTS.limit.stepOffset
						ELEMENTS.controls.tracking.checked = true
						STATE.controls.tracking.star = null
						STATE.controls.tracking.planet = null
						STATE.controls.tracking.moon = null
						return
					}
					if (event.key == "ArrowDown" || event.keyCode == 40 || event.code == "ArrowDown") {
						ELEMENTS.controls.y.value = STATE.controls.y = STATE.controls.y - CONSTANTS.limit.stepOffset
						ELEMENTS.controls.tracking.checked = true
						STATE.controls.tracking.star = null
						STATE.controls.tracking.planet = null
						STATE.controls.tracking.moon = null
						return
					}
			} catch (error) {console.log(error)}
		}

	/* scrollMouse */
		ELEMENTS.simulation.canvas.addEventListener(TRIGGERS.scroll, scrollMouse)
		function scrollMouse(event) {
			try {
				// prevent scroll while grabbing
					if (STATE.grab.grabbing) {
						return
					}

				// get direction
					let direction = Math.sign(event.deltaY)
					if (direction == 0) {
						return
					}
					direction = -direction

				// zoom by a constant amount
					let zoomPower = Math.log10(STATE.controls.zoom) // 10^x
						zoomPower = roundNumber(zoomPower + (CONSTANTS.canvas.scroll_to_zoom * direction)) // 10^x

				// get new zoom
					let zoom = roundNumber(10 ** zoomPower) // AU/px

				// set & save value
					ELEMENTS.controls.zoom.value = STATE.controls.zoom = zoom // AU/px
					ELEMENTS.controls.zoomPower.value = zoomPower // 10^x
			} catch (error) {console.log(error)}
		}

	/* downMouse */
		ELEMENTS.simulation.canvas.addEventListener(TRIGGERS.mousedown, downMouse)
		function downMouse(event) {
			try {
				// right click
					if (event.button !== undefined && event.button !== 0) {
						return
					}
					if (event.ctrlKey) {
						return
					}

				// get position
					let x = (event.touches ? event.touches[0].clientX : event.clientX) // px
					let y = (event.touches ? event.touches[0].clientY : event.clientY) // px

				// set grab offset
					STATE.grab.grabbing = true
					STATE.grab.x = x // px
					STATE.grab.y = y // px
					STATE.grab.offsetX = -STATE.controls.x // AU
					STATE.grab.offsetY = -STATE.controls.y // AU

				// set cursor
					ELEMENTS.simulation.canvas.setAttribute("grabbing", true)

				// anything there?
					selectCelestialBody(x, y)
			} catch (error) {console.log(error)}
		}

	/* moveMouse */
		window.addEventListener(TRIGGERS.mousemove, moveMouse)
		function moveMouse(event) {
			try {
				// not grabbing
					if (!STATE.grab.grabbing) {
						return
					}

				// get new position
					let x = (event.touches ? event.touches[0].clientX : event.clientX) // px
					let y = (event.touches ? event.touches[0].clientY : event.clientY) // px

				// calculate difference
					let deltaX = x - STATE.grab.x
					let deltaY = y - STATE.grab.y

				// convert into AU
					deltaX = deltaX / STATE.controls.zoom // AU/px
					deltaY = deltaY / STATE.controls.zoom // AU/px

				// new offset
					let offsetX = roundNumber(STATE.grab.offsetX + deltaX) // AU/px
					let offsetY = roundNumber(STATE.grab.offsetY - deltaY) // AU/px

				// set & save values
					ELEMENTS.controls.x.value = STATE.controls.x = -offsetX // AU/px
					ELEMENTS.controls.y.value = STATE.controls.y = -offsetY // AU/px

				// stop tracking
					if (STATE.controls.tracking.star || STATE.controls.tracking.planet || STATE.controls.tracking.moon) {
						changeTracking(false)
					}
			} catch (error) {console.log(error)}
		}

	/* upMouse */
		window.addEventListener(TRIGGERS.mouseup, upMouse)
		function upMouse(event) {
			try {
				// not grabbing
					if (!STATE.grab.grabbing) {
						return
					}

				// stop grabbing
					STATE.grab.grabbing = false
					STATE.grab.x = null
					STATE.grab.y = null

				// set cursor
					ELEMENTS.simulation.canvas.removeAttribute("grabbing")
			} catch (error) {console.log(error)}
		}

	/* selectCelestialBody */
		function selectCelestialBody(x, y) {
			try {
				// get position
					let invariableX = x - (ELEMENTS.simulation.canvas.width / 2)
						invariableX /= STATE.controls.zoom
						invariableX += STATE.controls.x
					let invariableY = (ELEMENTS.simulation.canvas.height - y) - (ELEMENTS.simulation.canvas.height / 2)
						invariableY /= STATE.controls.zoom
						invariableY += STATE.controls.y

				// loop through to find something
					for (let starId in STATE.stars) {
						// star
							let star = STATE.stars[starId]
						
						// if visible, get distance
							if (star.position.visible) {
								let distance = getDistance({x: star.position.invariableX, y: star.position.invariableY}, {x: invariableX, y: invariableY}) // AU
								if (distance < CONSTANTS.limit.minimumDistanceForSelection / STATE.controls.zoom) { // AU
									star.position.tracking = true
									star.elements.tracking.checked = true
									STATE.controls.tracking.star = starId
									STATE.controls.tracking.planet = null
									STATE.controls.tracking.moon = null
									return
								}
							}

						// loop through planets
							for (let planetId in star.planets) {
								// planet
									let planet = star.planets[planetId]
								
								// if visible, get distance
									if (planet.position.visible) {
										let distance = getDistance({x: planet.position.invariableX, y: planet.position.invariableY}, {x: invariableX, y: invariableY}) // AU
										if (distance < CONSTANTS.limit.minimumDistanceForSelection / STATE.controls.zoom) { // AU
											planet.position.tracking = true
											planet.elements.tracking.checked = true
											STATE.controls.tracking.star = starId
											STATE.controls.tracking.planet = planetId
											STATE.controls.tracking.moon = null
											return
										}
									}

								// loop through moons
									for (let moonId in planet.moons) {
										// moon
											let moon = planet.moons[moonId]

										// if visible, get distance
											if (moon.position.visible) {
												let distance = getDistance({x: moon.position.invariableX, y: moon.position.invariableY}, {x: invariableX, y: invariableY}) // AU
												if (distance < CONSTANTS.limit.minimumDistanceForSelection / STATE.controls.zoom) { // AU
													moon.position.tracking = true
													moon.elements.tracking.checked = true
													STATE.controls.tracking.star = starId
													STATE.controls.tracking.planet = planetId
													STATE.controls.tracking.moon = moonId
													return
												}
											}
									}
							}
					}
			} catch (error) {console.log(error)}
		}

/*** inputs - star ***/
	/* createStar */
		function createStar(starSeed) {
			try {
				// values
					let star = duplicateObject(CONSTANTS.star)
					for (let i in starSeed) {
						if (i !== "planets" && i !== "position") {
							star[i] = starSeed[i]
						}
					}

				// id
					star.id = "star-" + generateRandom()

				// tracking / visible
					if (starSeed && starSeed.position && starSeed.position.tracking !== undefined) {
						star.position.tracking = starSeed.position.tracking
					}
					if (starSeed && starSeed.position && starSeed.position.visible !== undefined) {
						star.position.visible = starSeed.position.visible
					}

				// form
					var section = document.createElement("details")
						section.id = star.id
						section.className = "star"
					ELEMENTS.stars.appendChild(section)
					star.elements.section = section

					var summary = document.createElement("summary")
					section.appendChild(summary)

					var header = document.createElement("h3")
						header.innerText = star.name
					summary.appendChild(header)
					star.elements.summary = header

				// track
					var label = document.createElement("label")
					summary.appendChild(label)

					var input = document.createElement("input")
						input.type = "radio"
						input.name = "tracking"
						input.value = star.id
						input.checked = star.position.tracking
						input.addEventListener(TRIGGERS.input, changeTracking)
					label.appendChild(input)
					star.elements.tracking = input

					var span = document.createElement("span")
						span.innerText = "tracking"
					label.appendChild(span)

				// visible
					var label = document.createElement("label")
					summary.appendChild(label)

					var input = document.createElement("input")
						input.type = "checkbox"
						input.checked = star.position.visible
						input.addEventListener(TRIGGERS.input, changeStarVisible)
					label.appendChild(input)
					star.elements.visible = input

					var span = document.createElement("span")
						span.innerText = "visible"
					label.appendChild(span)

				// name
					var label = document.createElement("label")
					section.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "name"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "text"
						input.className = "star-name"
						input.placeholder = "name"
						input.value = star.name
						input.addEventListener(TRIGGERS.input, changeStarName)
					label.appendChild(input)
					star.elements.name = input

				// class
					var label = document.createElement("label")
					section.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "class"
					label.appendChild(heading)

					var select = document.createElement("select")
						select.className = "star-class"

						var option = document.createElement("option")
							option.value = option.innerText = "custom"
						select.appendChild(option)

						for (let i in CONSTANTS.classes.stars) {
							var option = document.createElement("option")
								option.value = i
								option.innerText = CONSTANTS.classes.stars[i].name
							select.appendChild(option)
						}
						
						select.value = star.class || "custom"
						select.addEventListener(TRIGGERS.input, changeStarClass)
					label.appendChild(select)
					star.elements.class = select

				// description
					var label = document.createElement("label")
					section.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "description"
					label.appendChild(heading)

					var textarea = document.createElement("textarea")
						textarea.className = "star-description"
						textarea.placeholder = "description"
						textarea.value = star.description
						textarea.addEventListener(TRIGGERS.input, changeStarDescription)
					label.appendChild(textarea)
					star.elements.description = textarea

				// color
					var label = document.createElement("label")
					section.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "color"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "color"
						input.className = "star-color"
						input.value = star.color
						input.addEventListener(TRIGGERS.input, changeStarColor)
					label.appendChild(input)
					star.elements.color = input

				// mass
					var label = document.createElement("label")
					section.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "mass"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "star-mass-factor"
						input.min = 1
						input.max = 10 - (1 / CONSTANTS.rounding)
						input.step = 0.01
						input.placeholder = "n"
						input.value = star.massFactor
						input.addEventListener(TRIGGERS.input, changeStarMass)
					label.appendChild(input)
					star.elements.massFactor = input

					var span = document.createElement("span")
						span.innerText = "x10^"
					label.appendChild(span)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "star-mass-power"
						input.min = 0
						input.step = 1
						input.placeholder = "exponent"
						input.value = star.massPower
						input.addEventListener(TRIGGERS.input, changeStarMass)
					label.appendChild(input)
					star.elements.massPower = input

					var span = document.createElement("span")
						span.innerText = "kg"
					label.appendChild(span)

				// radius
					var label = document.createElement("label")
					section.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "radius"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "star-radius"
						input.min = 0
						input.step = 0.01
						input.placeholder = "radius"
						input.value = star.radius
						input.addEventListener(TRIGGERS.input, changeStarRadius)
					label.appendChild(input)
					star.elements.radius = input

					var span = document.createElement("span")
						span.innerText = "AU"
					label.appendChild(span)

				// habitableZone
					var label = document.createElement("label")
					section.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "habitable zone"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "star-habitablezone"
						input.min = 0
						input.step = 0.1
						input.placeholder = "distance"
						input.value = star.habitableZone
						input.addEventListener(TRIGGERS.input, changeStarHabitableZone)
					label.appendChild(input)
					star.elements.habitableZone = input

					var span = document.createElement("span")
						span.innerText = "AU"
					label.appendChild(span)

				// planets
					if (starSeed && starSeed.planets) {
						for (let i in starSeed.planets) {
							var planet = createPlanet(star.id, starSeed.planets[i])
							star.planets[planet.id] = planet
							ELEMENTS.planets.appendChild(planet.elements.section)
						}
					}

				// return star
					return star
			} catch (error) {console.log(error)}
		}

	/* changeStarVisible */
		function changeStarVisible(event) {
			try {
				// get id
					let starId = event.target.closest(".star").id

				// get visible
					let visible = STATE.stars[starId].elements.visible.checked || false

				// save new value
					STATE.stars[starId].position.visible = visible
			} catch (error) {console.log(error)}
		}

	/* changeStarName */
		function changeStarName(event) {
			try {
				// get id
					let starId = event.target.closest(".star").id

				// get name
					let name = STATE.stars[starId].elements.name.value

				// save new value
					STATE.stars[starId].name = name
					STATE.stars[starId].elements.summary.innerText = name
			} catch (error) {console.log(error)}
		}

	/* changeStarClass */
		function changeStarClass(event) {
			try {
				// get id
					let starId = event.target.closest(".star").id

				// update class
					// get class
						let starClass = STATE.stars[starId].class = STATE.stars[starId].elements.class.value
						if (!CONSTANTS.classes.stars[starClass]) {
							return
						}

					// set & save values
						STATE.stars[starId].elements.color.value = STATE.stars[starId].color = CONSTANTS.classes.stars[starClass].color // #hex
						STATE.stars[starId].elements.massFactor.value = STATE.stars[starId].massFactor = CONSTANTS.classes.stars[starClass].massFactor // kg
						STATE.stars[starId].elements.massPower.value = STATE.stars[starId].massPower = CONSTANTS.classes.stars[starClass].massPower // kg
						STATE.stars[starId].elements.radius.value = STATE.stars[starId].radius = CONSTANTS.classes.stars[starClass].radius // kg
						STATE.stars[starId].elements.habitableZone.value = STATE.stars[starId].habitableZone = CONSTANTS.classes.stars[starClass].habitableZone // AU

				// mass & semiMajorAxis --> period
					// get mass
						let mass = STATE.stars[starId].massFactor * Math.pow(10, STATE.stars[starId].massPower) // kg

					// loop through planets
						for (let planetId in STATE.stars[starId].planets) {
							// get orbitalFraction
								let day = STATE.stars[starId].planets[planetId].day // d
								let period = STATE.stars[starId].planets[planetId].period // d
								let orbitalFraction = (day / period) || 0 // ratio

							// get semiMajorAxis
								let semiMajorAxis = STATE.stars[starId].planets[planetId].semiMajorAxis // AU

							// convert to SI
								semiMajorAxis = semiMajorAxis * CONSTANTS.convert.AU_to_meter // m

							// get period
								period = calculateOrbit(mass, null, semiMajorAxis) // s

							// convert from SI
								period = period / CONSTANTS.convert.hour_to_second / CONSTANTS.convert.day_to_hour // d

							// get equivalent day in new period
								day = roundNumber(orbitalFraction * period) // d

							// set & save values
								STATE.stars[starId].planets[planetId].elements.period.value = STATE.stars[starId].planets[planetId].period = period // d
								STATE.stars[starId].planets[planetId].elements.day.value = STATE.stars[starId].planets[planetId].day = day // d
						}
			} catch (error) {console.log(error)}
		}

	/* changeStarDescription */
		function changeStarDescription(event) {
			try {
				// get id
					let starId = event.target.closest(".star").id

				// get description
					let description = STATE.stars[starId].elements.description.value

				// save new value
					STATE.stars[starId].description = description
			} catch (error) {console.log(error)}
		}

	/* changeStarColor */
		function changeStarColor(event) {
			try {
				// get id
					let starId = event.target.closest(".star").id

				// get color
					let color = STATE.stars[starId].elements.color.value // #hex

				// save new value
					STATE.stars[starId].color = color // #hex

				// custom class
					STATE.stars[starId].elements.class.value = STATE.stars[starId].class = "custom"
			} catch (error) {console.log(error)}
		}

	/* changeStarMass */
		function changeStarMass(event) {
			try {
				// get id
					let starId = event.target.closest(".star").id

				// update values
					// get star mass
						let massFactor = Number(STATE.stars[starId].elements.massFactor.value) // kg
						let massPower = Number(STATE.stars[starId].elements.massPower.value) // 10^x

					// errors
						if (!massFactor || !massPower) {
							return
						}

					// save new values
						STATE.stars[starId].massFactor = massFactor // kg
						STATE.stars[starId].massPower = massPower // 10^x

				// mass & semiMajorAxis --> period
					// get mass
						let mass = massFactor * Math.pow(10, massPower) // kg

					// loop through planets
						for (let planetId in STATE.stars[starId].planets) {
							// get orbitalFraction
								let day = STATE.stars[starId].planets[planetId].day // d
								let period = STATE.stars[starId].planets[planetId].period // d
								let orbitalFraction = (day / period) || 0 // ratio

							// get semiMajorAxis
								let semiMajorAxis = STATE.stars[starId].planets[planetId].semiMajorAxis // AU

							// convert to SI
								semiMajorAxis = semiMajorAxis * CONSTANTS.convert.AU_to_meter // m

							// get period
								period = calculateOrbit(mass, null, semiMajorAxis) // s

							// convert from SI
								period = period / CONSTANTS.convert.hour_to_second / CONSTANTS.convert.day_to_hour // d

							// get equivalent day in new period
								day = roundNumber(orbitalFraction * period) // d

							// set & save values
								STATE.stars[starId].planets[planetId].elements.period.value = STATE.stars[starId].planets[planetId].period = period // d
								STATE.stars[starId].planets[planetId].elements.day.value = STATE.stars[starId].planets[planetId].day = day // d
						}

				// mass --> habitable zone
					// get habitable zone
						let habitableZone = calculateHabitableZone(mass, null) // AU

					// set & save value
						STATE.stars[starId].elements.habitableZone.value = STATE.stars[starId].habitableZone = habitableZone // AU

				// custom class
					STATE.stars[starId].elements.class.value = STATE.stars[starId].class = "custom"
			} catch (error) {console.log(error)}
		}

	/* changeStarRadius */
		function changeStarRadius(event) {
			try {
				// get id
					let starId = event.target.closest(".star").id

				// update values
					// get star radius
						let radius = Number(STATE.stars[starId].elements.radius.value) // AU

					// errors
						if (!radius) {
							return
						}

					// save new values
						STATE.stars[starId].radius = radius // AU

				// custom class
					STATE.stars[starId].elements.class.value = STATE.stars[starId].class = "custom"
			} catch (error) {console.log(error)}
		}

	/* changeStarHabitableZone */
		function changeStarHabitableZone(event) {
			try {
				// save value
					// get id
						let starId = event.target.closest(".star").id

					// get habitableZone
						let habitableZone = Number(STATE.stars[starId].elements.habitableZone.value) // AU

					// errors
						if (!habitableZone) {
							return
						}

					// save new value
						STATE.stars[starId].habitableZone = habitableZone // AU

				// habitable zone --> mass
					// get mass
						let mass = calculateHabitableZone(null, habitableZone) // kg

					// split
						let massPower = 1 // 10^x
						while (mass / (10 ** massPower) > 10) {
							massPower += 1
						}
						massFactor = roundNumber(mass / (10 ** massPower)) // kg

					// set & save values
						STATE.stars[starId].elements.massFactor.value = STATE.stars[starId].massFactor = massFactor // kg
						STATE.stars[starId].elements.massPower.value = STATE.stars[starId].massPower = massPower // kg

				// mass & semiMajorAxis --> period
					// get mass
						mass = massFactor * Math.pow(10, massPower) // kg

					// loop through planets
						for (let planetId in STATE.stars[starId].planets) {
							// get orbitalFraction
								let day = STATE.stars[starId].planets[planetId].day // d
								let period = STATE.stars[starId].planets[planetId].period // d
								let orbitalFraction = (day / period) || 0 // ratio

							// get semiMajorAxis
								let semiMajorAxis = STATE.stars[starId].planets[planetId].semiMajorAxis // AU

							// convert to SI
								semiMajorAxis = semiMajorAxis * CONSTANTS.convert.AU_to_meter // m

							// get period
								period = calculateOrbit(mass, null, semiMajorAxis) // s

							// convert from SI
								period = period / CONSTANTS.convert.hour_to_second / CONSTANTS.convert.day_to_hour // d

							// get equivalent day in new period
								day = roundNumber(orbitalFraction * period) // d

							// set & save values
								STATE.stars[starId].planets[planetId].elements.period.value = STATE.stars[starId].planets[planetId].period = period // d
								STATE.stars[starId].planets[planetId].elements.day.value = STATE.stars[starId].planets[planetId].day = day // d
						}

				// custom class
					STATE.stars[starId].elements.class.value = STATE.stars[starId].class = "custom"
			} catch (error) {console.log(error)}
		}

/*** inputs - planet ***/
	/* addPlanet */
		ELEMENTS.planetsAdd.addEventListener(TRIGGERS.click, addPlanet)
		function addPlanet(event) {
			try {
				// get starId
					let starId = Object.keys(STATE.stars)[0]

				// createPlanet
					let planet = createPlanet(starId)
					STATE.stars[starId].planets[planet.id] = planet
					ELEMENTS.planets.appendChild(planet.elements.section)

				// jump
					planet.elements.section.setAttribute("open", true)
					planet.elements.name.focus()
			} catch (error) {console.log(error)}
		}

	/* clearPlanets */
		ELEMENTS.planetsClear.addEventListener(TRIGGERS.click, clearPlanets)
		function clearPlanets(event) {
			try {
				// get starId
					let starId = Object.keys(STATE.stars)[0]

				// remove all planets from HTML
					for (let i in STATE.stars[starId].planets) {
						STATE.stars[starId].planets[i].elements.section.remove()
					}

				// remove from object
					STATE.stars[starId].planets = {}
			} catch (error) {console.log(error)}
		}

	/* createPlanet */
		function createPlanet(starId, planetSeed) {
			try {
				// values
					let planet = duplicateObject(CONSTANTS.planet)
					for (let i in planetSeed) {
						if (i !== "moons" && i !== "position") {
							planet[i] = planetSeed[i]
						}
					}

				// id
					planet.id = starId + "-planet-" + generateRandom()

				// computed
					planet.computed = calculateComputedValues(planet.semiMajorAxis, planet.eccentricity, planet.longitudeOfAscendingNode, planet.argumentOfPeriapsis, planet.inclination)

				// tracking / visible
					if (planetSeed && planetSeed.position && planetSeed.position.tracking !== undefined) {
						planet.position.tracking = planetSeed.position.tracking
					}
					if (planetSeed && planetSeed.position && planetSeed.position.visible !== undefined) {
						planet.position.visible = planetSeed.position.visible
					}

				// form
					var section = document.createElement("details")
						section.id = planet.id
						section.className = "planet"
					planet.elements.section = section

					var summary = document.createElement("summary")
					section.appendChild(summary)

					var header = document.createElement("h3")
						header.innerText = planet.name
					summary.appendChild(header)
					planet.elements.summary = header

				// track
					var label = document.createElement("label")
					summary.appendChild(label)

					var input = document.createElement("input")
						input.type = "radio"
						input.name = "tracking"
						input.value = planet.id
						input.checked = planet.position.tracking
						input.addEventListener(TRIGGERS.input, changeTracking)
					label.appendChild(input)
					planet.elements.tracking = input

					var span = document.createElement("span")
						span.innerText = "tracking"
					label.appendChild(span)

				// visible
					var label = document.createElement("label")
					summary.appendChild(label)

					var input = document.createElement("input")
						input.type = "checkbox"
						input.checked = planet.position.visible
						input.addEventListener(TRIGGERS.input, changePlanetVisible)
					label.appendChild(input)
					planet.elements.visible = input

					var span = document.createElement("span")
						span.innerText = "visible"
					label.appendChild(span)

				// name
					var label = document.createElement("label")
					section.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "name"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "text"
						input.className = "planet-name"
						input.placeholder = "name"
						input.value = planet.name
						input.addEventListener(TRIGGERS.input, changePlanetName)
					label.appendChild(input)
					planet.elements.name = input

					var button = document.createElement("button")
						button.className = "planet-remove"
						button.innerHTML = "&#x2715;"
						button.addEventListener(TRIGGERS.click, removePlanet)
					section.appendChild(button)
					planet.elements.remove = button

				// class
					var label = document.createElement("label")
					section.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "class"
					label.appendChild(heading)

					var select = document.createElement("select")
						select.className = "planet-class"
						
						var option = document.createElement("option")
							option.value = option.innerText = "custom"
						select.appendChild(option)

						for (let i in CONSTANTS.classes.planets) {
							var option = document.createElement("option")
								option.value = i
								option.innerText = CONSTANTS.classes.planets[i].name
							select.appendChild(option)
						}

						select.value = planet.class || "custom"
						select.addEventListener(TRIGGERS.input, changePlanetClass)
					label.appendChild(select)
					planet.elements.class = select

				// description
					var label = document.createElement("label")
					section.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "description"
					label.appendChild(heading)

					var textarea = document.createElement("textarea")
						textarea.className = "planet-description"
						textarea.placeholder = "description"
						textarea.value = planet.description
						textarea.addEventListener(TRIGGERS.input, changePlanetDescription)
					label.appendChild(textarea)
					planet.elements.description = textarea

				// color
					var label = document.createElement("label")
					section.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "color"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "color"
						input.className = "planet-color"
						input.value = planet.color
						input.addEventListener(TRIGGERS.input, changePlanetColor)
					label.appendChild(input)
					planet.elements.color = input

				// mass
					var label = document.createElement("label")
					section.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "mass"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "planet-mass-factor"
						input.min = 1
						input.max = 10 - (1 / CONSTANTS.rounding)
						input.step = 0.01
						input.placeholder = "n"
						input.value = planet.massFactor
						input.addEventListener(TRIGGERS.input, changePlanetMass)
					label.appendChild(input)
					planet.elements.massFactor = input

					var span = document.createElement("span")
						span.innerText = "x10^"
					label.appendChild(span)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "planet-mass-power"
						input.min = 0
						input.step = 1
						input.placeholder = "exponent"
						input.value = planet.massPower
						input.addEventListener(TRIGGERS.input, changePlanetMass)
					label.appendChild(input)
					planet.elements.massPower = input

					var span = document.createElement("span")
						span.innerText = "kg"
					label.appendChild(span)

				// orbit
					var label = document.createElement("label")
					section.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "orbit"
					label.appendChild(heading)

					var span = document.createElement("span")
						span.innerText = "day"
					label.appendChild(span)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "planet-day"
						input.min = 0
						input.step = 1
						input.placeholder = "day"
						input.value = planet.day
						input.addEventListener(TRIGGERS.input, changePlanetDay)
					label.appendChild(input)
					planet.elements.day = input

					var span = document.createElement("span")
						span.innerText = "/"
					label.appendChild(span)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "planet-period"
						input.min = 0
						input.step = 1
						input.placeholder = "period"
						input.value = planet.period
						input.addEventListener(TRIGGERS.input, changePlanetPeriod)
					label.appendChild(input)
					planet.elements.period = input

				// distance
					var label = document.createElement("label")
					section.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "distance"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "planet-semimajoraxis"
						input.min = 0
						input.placeholder = "distance"
						input.value = planet.semiMajorAxis
						input.addEventListener(TRIGGERS.input, changePlanetSemiMajorAxis)
					label.appendChild(input)
					planet.elements.semiMajorAxis = input

					var span = document.createElement("span")
						span.innerText = "AU"
					label.appendChild(span)

				// advanced
					var details = document.createElement("details")
					section.appendChild(details)

					var summary = document.createElement("summary")
					details.appendChild(summary)

					var heading = document.createElement("h3")
						heading.innerText = "advanced"
					summary.appendChild(heading)

					var inner = document.createElement("div")
						inner.className = "planet-advanced"
					details.appendChild(inner)

				// retrograde
					var label = document.createElement("label")
					inner.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "retrograde"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "checkbox"
						input.checked = planet.retrograde
						input.addEventListener(TRIGGERS.input, changePlanetRetrograde)
					label.appendChild(input)
					planet.elements.retrograde = input

				// eccentricity
					var label = document.createElement("label")
					inner.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "eccentricity"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "planet-eccentricity"
						input.min = 0
						input.max = 1 - (1 / CONSTANTS.rounding)
						input.step = 0.01
						input.placeholder = "eccentricity"
						input.value = planet.eccentricity
						input.addEventListener(TRIGGERS.input, changePlanetEccentricity)
					label.appendChild(input)
					planet.elements.eccentricity = input

					var span = document.createElement("span")
						span.innerText = " /1"
					label.appendChild(span)

				// apoapsis
					var label = document.createElement("label")
					inner.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "aphelion"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "planet-apoapsis"
						input.min = 0
						input.step = 0.01
						input.placeholder = "apoapsis"
						input.value = planet.apoapsis
						input.addEventListener(TRIGGERS.input, changePlanetApoapsisOrPeriapsis)
					label.appendChild(input)
					planet.elements.apoapsis = input

					var span = document.createElement("span")
						span.innerText = "AU"
					label.appendChild(span)

				// periapsis
					var label = document.createElement("label")
					inner.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "perihelion"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "planet-periapsis"
						input.min = 0
						input.step = 0.01
						input.placeholder = "periapsis"
						input.value = planet.periapsis
						input.addEventListener(TRIGGERS.input, changePlanetApoapsisOrPeriapsis)
					label.appendChild(input)
					planet.elements.periapsis = input

					var span = document.createElement("span")
						span.innerText = "AU"
					label.appendChild(span)

				// inclination
					var label = document.createElement("label")
					inner.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "inclination"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "planet-inclination"
						input.min = 0
						input.max = CONSTANTS.convert.circle_to_degree - (1 / CONSTANTS.rounding)
						input.step = 0.1
						input.placeholder = "inclination"
						input.value = roundNumber(planet.inclination * CONSTANTS.convert.circle_to_degree / CONSTANTS.convert.circle_to_radian)
						input.addEventListener(TRIGGERS.input, changePlanetInclination)
					label.appendChild(input)
					planet.elements.inclination = input

					var span = document.createElement("span")
						span.innerText = "°"
					label.appendChild(span)

				// longitude of ascending node
					var label = document.createElement("label")
					inner.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "longitude of ascending node"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "planet-longitudeofascendingnode"
						input.min = 0
						input.max = CONSTANTS.convert.circle_to_degree - (1 / CONSTANTS.rounding)
						input.step = 0.1
						input.placeholder = "angle"
						input.value = roundNumber(planet.longitudeOfAscendingNode * CONSTANTS.convert.circle_to_degree / CONSTANTS.convert.circle_to_radian)
						input.addEventListener(TRIGGERS.input, changePlanetLongitudeOfAscendingNode)
					label.appendChild(input)
					planet.elements.longitudeOfAscendingNode = input

					var span = document.createElement("span")
						span.innerText = "°"
					label.appendChild(span)

				// argument of periapsis
					var label = document.createElement("label")
					inner.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "argument of perihelion"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "planet-argumentofperiapsis"
						input.min = 0
						input.max = CONSTANTS.convert.circle_to_degree - (1 / CONSTANTS.rounding)
						input.step = 0.1
						input.placeholder = "angle"
						input.value = roundNumber(planet.argumentOfPeriapsis * CONSTANTS.convert.circle_to_degree / CONSTANTS.convert.circle_to_radian)
						input.addEventListener(TRIGGERS.input, changePlanetArgumentOfPeriapsis)
					label.appendChild(input)
					planet.elements.argumentOfPeriapsis = input

					var span = document.createElement("span")
						span.innerText = "°"
					label.appendChild(span)

				// moons
					var details = document.createElement("details")
					section.appendChild(details)

					var summary = document.createElement("summary")
					details.appendChild(summary)

					var heading = document.createElement("h3")
						heading.innerText = "moons"
					summary.appendChild(heading)

					var inner = document.createElement("div")
						inner.className = "planet-moons"
					details.appendChild(inner)
					planet.elements.moons = inner

				// moon buttons
					var button = document.createElement("button")
						button.className = "planet-addmoon"
						button.innerText = "+ add moon"
						button.addEventListener(TRIGGERS.click, addMoon)
					inner.appendChild(button)
					planet.elements.addMoon = button

					var button = document.createElement("button")
						button.className = "planet-clearmoons"
						button.innerHTML = "&#x2715; clear all"
						button.addEventListener(TRIGGERS.click, clearMoons)
					inner.appendChild(button)
					planet.elements.clearMoons = button

				// moons
					if (planetSeed && planetSeed.moons) {
						for (let i in planetSeed.moons) {
							var moon = createMoon(planet.id, planetSeed.moons[i])
							planet.moons[moon.id] = moon
							planet.elements.moons.appendChild(moon.elements.section)
						}
					}

				// return planet
					return planet
			} catch (error) {console.log(error)}
		}

	/* removePlanet */
		function removePlanet(event) {
			try {
				// get id
					let planetId = event.target.closest(".planet").id
					let starId = planetId.split("-planet-")[0]

				// remove elements
					STATE.stars[starId].planets[planetId].elements.section.remove()

				// remove from state
					delete STATE.stars[starId].planets[planetId]
			} catch (error) {console.log(error)}
		}

	/* changePlanetVisible */
		function changePlanetVisible(event) {
			try {
				// get id
					let planetId = event.target.closest(".planet").id
					let starId = planetId.split("-planet-")[0]

				// get visible
					let visible = STATE.stars[starId].planets[planetId].elements.visible.checked || false

				// save new value
					STATE.stars[starId].planets[planetId].position.visible = visible
			} catch (error) {console.log(error)}
		}

	/* changePlanetName */
		function changePlanetName(event) {
			try {
				// get id
					let planetId = event.target.closest(".planet").id
					let starId = planetId.split("-planet-")[0]

				// get name
					let name = STATE.stars[starId].planets[planetId].elements.name.value

				// save new value
					STATE.stars[starId].planets[planetId].name = name
					STATE.stars[starId].planets[planetId].elements.summary.innerText = name
			} catch (error) {console.log(error)}
		}

	/* changePlanetClass */
		function changePlanetClass(event) {
			try {
				// get id
					let planetId = event.target.closest(".planet").id
					let starId = planetId.split("-planet-")[0]

				// update class
					// get class
						let planetClass = STATE.stars[starId].planets[planetId].class = STATE.stars[starId].planets[planetId].elements.class.value
						if (!CONSTANTS.classes.planets[planetClass]) {
							return
						}

					// get orbitalFraction
						let day = STATE.stars[starId].planets[planetId].day // d
						let period = STATE.stars[starId].planets[planetId].period // d
						let orbitalFraction = (day / period) || 0 // ratio
						let retrograde = STATE.stars[starId].planets[planetId].retrograde

					// set & save values
						STATE.stars[starId].planets[planetId].elements.color.value = STATE.stars[starId].planets[planetId].color = CONSTANTS.classes.planets[planetClass].color // #hex
						STATE.stars[starId].planets[planetId].elements.massFactor.value = STATE.stars[starId].planets[planetId].massFactor = CONSTANTS.classes.planets[planetClass].massFactor // kg
						STATE.stars[starId].planets[planetId].elements.massPower.value = STATE.stars[starId].planets[planetId].massPower = CONSTANTS.classes.planets[planetClass].massPower // kg
						STATE.stars[starId].planets[planetId].elements.semiMajorAxis.value = STATE.stars[starId].planets[planetId].semiMajorAxis = CONSTANTS.classes.planets[planetClass].semiMajorAxis // AU
						STATE.stars[starId].planets[planetId].elements.retrograde.checked = STATE.stars[starId].planets[planetId].retrograde = CONSTANTS.classes.planets[planetClass].retrograde
						STATE.stars[starId].planets[planetId].elements.eccentricity.value = STATE.stars[starId].planets[planetId].eccentricity = CONSTANTS.classes.planets[planetClass].eccentricity // ratio
						STATE.stars[starId].planets[planetId].elements.apoapsis.value = STATE.stars[starId].planets[planetId].apoapsis = CONSTANTS.classes.planets[planetClass].apoapsis // AU
						STATE.stars[starId].planets[planetId].elements.periapsis.value = STATE.stars[starId].planets[planetId].periapsis = CONSTANTS.classes.planets[planetClass].periapsis // AU

					// computed
						STATE.stars[starId].planets[planetId].computed = calculateComputedValues(STATE.stars[starId].planets[planetId].semiMajorAxis, STATE.stars[starId].planets[planetId].eccentricity, STATE.stars[starId].planets[planetId].longitudeOfAscendingNode, STATE.stars[starId].planets[planetId].argumentOfPeriapsis, STATE.stars[starId].planets[planetId].inclination)

				// update period
					// get star mass
						let starMass = STATE.stars[starId].massFactor * (10 ** STATE.stars[starId].massPower) // kg

					// convert to SI
						let semiMajorAxis = STATE.stars[starId].planets[planetId].semiMajorAxis * CONSTANTS.convert.AU_to_meter // m

					// get period
						period = calculateOrbit(starMass, null, semiMajorAxis) // s

					// convert from SI
						period = period / CONSTANTS.convert.hour_to_second / CONSTANTS.convert.day_to_hour // d

					// set & save period
						STATE.stars[starId].planets[planetId].elements.period.value = STATE.stars[starId].planets[planetId].period = period // d

				// update day
					// get equivalent day in new period
						day = roundNumber(orbitalFraction * period) // d

					// flip
						if (retrograde != STATE.stars[starId].planets[planetId].retrograde) {
							day = roundNumber((period - day + period) % period) // d
						}

					// set & save values
						STATE.stars[starId].planets[planetId].elements.day.value = STATE.stars[starId].planets[planetId].day = day // d

				// mass & semiMajorAxis --> period
					// get mass
						let planetMass = STATE.stars[starId].planets[planetId].massFactor * Math.pow(10, STATE.stars[starId].planets[planetId].massPower) // kg

					// loop through moons
						for (let moonId in STATE.stars[starId].planets[planetId].moons) {
							// get orbitalFraction
								let day = STATE.stars[starId].planets[planetId].moons[moonId].day // d
								let period = STATE.stars[starId].planets[planetId].moons[moonId].period // d
								let orbitalFraction = (day / period) || 0 // ratio

							// get semiMajorAxis
								let semiMajorAxis = STATE.stars[starId].planets[planetId].moons[moonId].semiMajorAxis // AU

							// convert to SI
								semiMajorAxis = semiMajorAxis * CONSTANTS.convert.AU_to_meter // m

							// get period
								period = calculateOrbit(planetMass, null, semiMajorAxis) // s

							// convert from SI
								period = period / CONSTANTS.convert.hour_to_second / CONSTANTS.convert.day_to_hour // d

							// get equivalent day in new period
								day = roundNumber(orbitalFraction * period) // d

							// set & save values
								STATE.stars[starId].planets[planetId].moons[moonId].elements.period.value = STATE.stars[starId].planets[planetId].moons[moonId].period = period // d
								STATE.stars[starId].planets[planetId].moons[moonId].elements.day.value = STATE.stars[starId].planets[planetId].moons[moonId].day = day // d
						}
			} catch (error) {console.log(error)}
		}

	/* changePlanetDescription */
		function changePlanetDescription(event) {
			try {
				// get id
					let planetId = event.target.closest(".planet").id
					let starId = planetId.split("-planet-")[0]

				// get description
					let description = STATE.stars[starId].planets[planetId].elements.description.value

				// save new value
					STATE.stars[starId].planets[planetId].description = description
			} catch (error) {console.log(error)}
		}

	/* changePlanetColor */
		function changePlanetColor(event) {
			try {
				// get id
					let planetId = event.target.closest(".planet").id
					let starId = planetId.split("-planet-")[0]

				// get color
					let color = STATE.stars[starId].planets[planetId].elements.color.value // #hex

				// save new value
					STATE.stars[starId].planets[planetId].color = color // #hex
			} catch (error) {console.log(error)}
		}

	/* changePlanetMass */
		function changePlanetMass(event) {
			try {
				// get id
					let planetId = event.target.closest(".planet").id
					let starId = planetId.split("-planet-")[0]

				// mass
					// get planet mass
						let massFactor = Number(STATE.stars[starId].planets[planetId].elements.massFactor.value) // kg
						let massPower = Number(STATE.stars[starId].planets[planetId].elements.massPower.value) // 10^x

					// errors
						if (!massFactor || !massPower) {
							return
						}

					// save new values
						STATE.stars[starId].planets[planetId].massFactor = massFactor // kg
						STATE.stars[starId].planets[planetId].massPower = massPower // 10^x

				// mass & semiMajorAxis --> period
					// get mass
						let mass = massFactor * Math.pow(10, massPower) // kg

					// loop through moons
						for (let moonId in STATE.stars[starId].planets[planetId].moons) {
							// get orbitalFraction
								let day = STATE.stars[starId].planets[planetId].moons[moonId].day // d
								let period = STATE.stars[starId].planets[planetId].moons[moonId].period // d
								let orbitalFraction = (day / period) || 0 // ratio

							// get semiMajorAxis
								let semiMajorAxis = STATE.stars[starId].planets[planetId].moons[moonId].semiMajorAxis // AU

							// convert to SI
								semiMajorAxis = semiMajorAxis * CONSTANTS.convert.AU_to_meter // m

							// get period
								period = calculateOrbit(mass, null, semiMajorAxis) // s

							// convert from SI
								period = period / CONSTANTS.convert.hour_to_second / CONSTANTS.convert.day_to_hour // d

							// get equivalent day in new period
								day = roundNumber(orbitalFraction * period) // d

							// set & save values
								STATE.stars[starId].planets[planetId].moons[moonId].elements.period.value = STATE.stars[starId].planets[planetId].moons[moonId].period = period // d
								STATE.stars[starId].planets[planetId].moons[moonId].elements.day.value = STATE.stars[starId].planets[planetId].moons[moonId].day = day // d
						}

				// custom class
					STATE.stars[starId].planets[planetId].elements.class.value = STATE.stars[starId].planets[planetId].class = "custom"
			} catch (error) {console.log(error)}
		}

	/* changePlanetDay */
		function changePlanetDay(event) {
			try {
				// get id
					let planetId = event.target.closest(".planet").id
					let starId = planetId.split("-planet-")[0]

				// day
					// get planet day
						let day = Number(STATE.stars[starId].planets[planetId].elements.day.value) // d

					// save new values
						STATE.stars[starId].planets[planetId].day = roundNumber(day) // d
			} catch (error) {console.log(error)}
		}

	/* changePlanetPeriod */
		function changePlanetPeriod(event) {
			try {
				// get id
					let planetId = event.target.closest(".planet").id
					let starId = planetId.split("-planet-")[0]

				// update value
					// get period
						let period = Number(STATE.stars[starId].planets[planetId].elements.period.value) // d

					// errors
						if (!period) {
							return
						}

					// save new value
						STATE.stars[starId].planets[planetId].period = period // d

				// mass & period --> semiMajorAxis
					// get star mass
						let massFactor = STATE.stars[starId].massFactor // kg
						let massPower = STATE.stars[starId].massPower // 10^x

					// errors
						if (!massFactor || !massPower) {
							return
						}

					// convert to SI
						let mass = massFactor * Math.pow(10, massPower) // kg
						period = period * CONSTANTS.convert.day_to_hour * CONSTANTS.convert.hour_to_second // s

					// get semiMajorAxis
						let semiMajorAxis = calculateOrbit(mass, period, null) // m

					// convert from SI
						semiMajorAxis = semiMajorAxis / CONSTANTS.convert.AU_to_meter // AU

					// set & save value
						STATE.stars[starId].planets[planetId].elements.semiMajorAxis.value = STATE.stars[starId].planets[planetId].semiMajorAxis = semiMajorAxis // AU

				// semiMajorAxis & eccentricity --> apoapsis & periapsis
					// get eccentricity
						let eccentricity = STATE.stars[starId].planets[planetId].eccentricity // ratio

					// errors
						if (CONSTANTS.limit.minimumEccentricity > eccentricity || eccentricity >= CONSTANTS.limit.maximumEccentricity || !semiMajorAxis) {
							return
						}

					// get apoapsis & periapsis
						let [apoapsis, periapsis] = calculateEllipse(semiMajorAxis, eccentricity, [null, null]) // AU, AU

					// set & save values
						STATE.stars[starId].planets[planetId].elements.apoapsis.value   = STATE.stars[starId].planets[planetId].apoapsis   = apoapsis // AU
						STATE.stars[starId].planets[planetId].elements.periapsis.value = STATE.stars[starId].planets[planetId].periapsis = periapsis // AU

				// computed values
					STATE.stars[starId].planets[planetId].computed = calculateComputedValues(STATE.stars[starId].planets[planetId].semiMajorAxis, STATE.stars[starId].planets[planetId].eccentricity, STATE.stars[starId].planets[planetId].longitudeOfAscendingNode, STATE.stars[starId].planets[planetId].argumentOfPeriapsis, STATE.stars[starId].planets[planetId].argumentOfPeriapsis)
			} catch (error) {console.log(error)}
		}

	/* changePlanetSemiMajorAxis */
		function changePlanetSemiMajorAxis(event) {
			try {
				// get id
					let planetId = event.target.closest(".planet").id
					let starId = planetId.split("-planet-")[0]

				// update value
					// get semiMajorAxis
						let semiMajorAxis = Number(STATE.stars[starId].planets[planetId].elements.semiMajorAxis.value) // AU

					// errors
						if (!semiMajorAxis) {
							return
						}

					// save new value
						STATE.stars[starId].planets[planetId].semiMajorAxis = semiMajorAxis // AU

				// semiMajorAxis & eccentricity --> apoapsis & periapsis
					// get eccentricity
						let eccentricity = STATE.stars[starId].planets[planetId].eccentricity // ratio

					// errors
						if (CONSTANTS.limit.minimumEccentricity > eccentricity || eccentricity >= CONSTANTS.limit.maximumEccentricity) {
							return
						}

					// get apoapsis & periapsis
						let [apoapsis, periapsis] = calculateEllipse(semiMajorAxis, eccentricity, [null, null]) // AU, AU

					// set & save values
						STATE.stars[starId].planets[planetId].elements.apoapsis.value   = STATE.stars[starId].planets[planetId].apoapsis   = apoapsis // AU
						STATE.stars[starId].planets[planetId].elements.periapsis.value = STATE.stars[starId].planets[planetId].periapsis = periapsis // AU

				// semiMajorAxis & mass --> period
					// get star mass
						let massFactor = STATE.stars[starId].massFactor // kg
						let massPower = STATE.stars[starId].massPower // 10^x

					// errors
						if (!massFactor || !massPower) {
							return
						}

					// convert to SI
						let mass = massFactor * Math.pow(10, massPower) // kg
						semiMajorAxis = semiMajorAxis * CONSTANTS.convert.AU_to_meter // m

					// get period
						let period = calculateOrbit(mass, null, semiMajorAxis) // s

					// convert from SI
						period = period / CONSTANTS.convert.hour_to_second / CONSTANTS.convert.day_to_hour // d

					// set & save value
						STATE.stars[starId].planets[planetId].elements.period.value = STATE.stars[starId].planets[planetId].period = period // d

				// computed
					STATE.stars[starId].planets[planetId].computed = calculateComputedValues(STATE.stars[starId].planets[planetId].semiMajorAxis, STATE.stars[starId].planets[planetId].eccentricity, STATE.stars[starId].planets[planetId].longitudeOfAscendingNode, STATE.stars[starId].planets[planetId].argumentOfPeriapsis, STATE.stars[starId].planets[planetId].argumentOfPeriapsis)
			} catch (error) {console.log(error)}
		}

	/* changePlanetRetrograde */
		function changePlanetRetrograde(event) {
			try {
				// retrograde
					// get id
						let planetId = event.target.closest(".planet").id
						let starId = planetId.split("-planet-")[0]

					// get retrograde
						let retrograde = STATE.stars[starId].planets[planetId].elements.retrograde.checked || false

					// save new value
						STATE.stars[starId].planets[planetId].retrograde = retrograde

				// update day
					// current
						let day = STATE.stars[starId].planets[planetId].day // d
						let period = STATE.stars[starId].planets[planetId].period // d

					// flip
						day = roundNumber((period - day + period) % period) // d

					// set & save value
						STATE.stars[starId].planets[planetId].elements.day.value = STATE.stars[starId].planets[planetId].day = day // d
			} catch (error) {console.log(error)}
		}

	/* changePlanetInclination */
		function changePlanetInclination(event) {
			try {
				// get id
					let planetId = event.target.closest(".planet").id
					let starId = planetId.split("-planet-")[0]

				// angle
					// get angle
						let angle = Number(STATE.stars[starId].planets[planetId].elements.inclination.value) // °

					// convert to SI
						angle = roundNumber(angle * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree) // radians

					// save new values
						STATE.stars[starId].planets[planetId].inclination = angle // radians
			} catch (error) {console.log(error)}
		}

	/* changePlanetEccentricity */
		function changePlanetEccentricity(event) {
			try {
				// get id
					let planetId = event.target.closest(".planet").id
					let starId = planetId.split("-planet-")[0]

				// update new value
					// get eccentricity
						let eccentricity = Number(STATE.stars[starId].planets[planetId].elements.eccentricity.value) // ratio

					// errors
						if (CONSTANTS.limit.minimumEccentricity > eccentricity || eccentricity >= CONSTANTS.limit.maximumEccentricity) {
							return
						}

					// save new value
						STATE.stars[starId].planets[planetId].eccentricity = eccentricity // ratio

				// semiMajorAxis & eccentricity --> apoapsis & periapsis
					// get semiMajorAxis
						let semiMajorAxis = STATE.stars[starId].planets[planetId].semiMajorAxis // AU

					// errors
						if (!semiMajorAxis) {
							return
						}

					// get apoapsis & periapsis
						let [apoapsis, periapsis] = calculateEllipse(semiMajorAxis, eccentricity, [null, null]) // AU, AU

					// set & save values
						STATE.stars[starId].planets[planetId].elements.apoapsis.value   = STATE.stars[starId].planets[planetId].apoapsis   = apoapsis // AU
						STATE.stars[starId].planets[planetId].elements.periapsis.value = STATE.stars[starId].planets[planetId].periapsis = periapsis // AU

				// computed
					STATE.stars[starId].planets[planetId].computed = calculateComputedValues(STATE.stars[starId].planets[planetId].semiMajorAxis, STATE.stars[starId].planets[planetId].eccentricity, STATE.stars[starId].planets[planetId].longitudeOfAscendingNode, STATE.stars[starId].planets[planetId].argumentOfPeriapsis, STATE.stars[starId].planets[planetId].argumentOfPeriapsis)
			} catch (error) {console.log(error)}
		}

	/* changePlanetApoapsisOrPeriapsis */
		function changePlanetApoapsisOrPeriapsis(event) {
			try {
				// get id
					let planetId = event.target.closest(".planet").id
					let starId = planetId.split("-planet-")[0]

				// update new values
					// get apoapsis & periapsis
						let apoapsis   = Number(STATE.stars[starId].planets[planetId].elements.apoapsis.value) // AU
						let periapsis = Number(STATE.stars[starId].planets[planetId].elements.periapsis.value) // AU

					// errors
						if (!apoapsis || !periapsis) {
							return
						}

					// save new values
						STATE.stars[starId].planets[planetId].apoapsis   = apoapsis // AU
						STATE.stars[starId].planets[planetId].periapsis = periapsis // AU

				// apoapsis & periapsis --> semiMajorAxis
					// get semiMajorAxis
						let semiMajorAxis = calculateEllipse(null, null, [apoapsis, periapsis]) // AU

					// set & save value
						STATE.stars[starId].planets[planetId].elements.semiMajorAxis.value = STATE.stars[starId].planets[planetId].semiMajorAxis = semiMajorAxis // AU

				// semiMajorAxis & apoapsis & periapsis --> eccentricity
					// calculate eccentricity
						let eccentricity = calculateEllipse(semiMajorAxis, null, [apoapsis, periapsis]) // ratio

					// set & save value
						STATE.stars[starId].planets[planetId].elements.eccentricity.value = STATE.stars[starId].planets[planetId].eccentricity = eccentricity // ratio

				// semiMajorAxis & mass --> period
					// get star mass
						let massFactor = STATE.stars[starId].massFactor // kg
						let massPower = STATE.stars[starId].massPower // 10^x

					// errors
						if (!massFactor || !massPower) {
							return
						}

					// convert to SI
						let mass = massFactor * Math.pow(10, massPower) // kg
						semiMajorAxis = semiMajorAxis * CONSTANTS.convert.AU_to_meter // m

					// get period
						let period = calculateOrbit(mass, null, semiMajorAxis) // s

					// convert from SI
						period = period / CONSTANTS.convert.hour_to_second / CONSTANTS.convert.day_to_hour // d

					// set & save value
						STATE.stars[starId].planets[planetId].elements.period.value = STATE.stars[starId].planets[planetId].period = period // d

				// computed
					STATE.stars[starId].planets[planetId].computed = calculateComputedValues(STATE.stars[starId].planets[planetId].semiMajorAxis, STATE.stars[starId].planets[planetId].eccentricity, STATE.stars[starId].planets[planetId].longitudeOfAscendingNode, STATE.stars[starId].planets[planetId].argumentOfPeriapsis, STATE.stars[starId].planets[planetId].argumentOfPeriapsis)
			} catch (error) {console.log(error)}
		}

	/* changePlanetLongitudeOfAscendingNode */
		function changePlanetLongitudeOfAscendingNode(event) {
			try {
				// get id
					let planetId = event.target.closest(".planet").id
					let starId = planetId.split("-planet-")[0]

				// angle
					// get angle
						let angle = Number(STATE.stars[starId].planets[planetId].elements.longitudeOfAscendingNode.value) // °

					// convert to SI
						angle = roundNumber(angle * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree) // radians

					// save new values
						STATE.stars[starId].planets[planetId].longitudeOfAscendingNode = angle // radians

				// computed
					STATE.stars[starId].planets[planetId].computed = calculateComputedValues(STATE.stars[starId].planets[planetId].semiMajorAxis, STATE.stars[starId].planets[planetId].eccentricity, STATE.stars[starId].planets[planetId].longitudeOfAscendingNode, STATE.stars[starId].planets[planetId].argumentOfPeriapsis, STATE.stars[starId].planets[planetId].argumentOfPeriapsis)
			} catch (error) {console.log(error)}
		}

	/* changePlanetArgumentOfPeriapsis */
		function changePlanetArgumentOfPeriapsis(event) {
			try {
				// get id
					let planetId = event.target.closest(".planet").id
					let starId = planetId.split("-planet-")[0]

				// angle
					// get angle
						let angle = Number(STATE.stars[starId].planets[planetId].elements.argumentOfPeriapsis.value) // °

					// convert to SI
						angle = roundNumber(angle * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree) // radians

					// save new values
						STATE.stars[starId].planets[planetId].argumentOfPeriapsis = angle // radians

				// computed
					STATE.stars[starId].planets[planetId].computed = calculateComputedValues(STATE.stars[starId].planets[planetId].semiMajorAxis, STATE.stars[starId].planets[planetId].eccentricity, STATE.stars[starId].planets[planetId].longitudeOfAscendingNode, STATE.stars[starId].planets[planetId].argumentOfPeriapsis, STATE.stars[starId].planets[planetId].argumentOfPeriapsis)
			} catch (error) {console.log(error)}
		}

/*** inputs - moon ***/
	/* addMoon */
		function addMoon(event) {
			try {
				// get ids
					let planetId = event.target.closest(".planet").id
					let starId = planetId.split("-planet-")[0]

				// createMoon
					let moon = createMoon(planetId)
					STATE.stars[starId].planets[planetId].moons[moon.id] = moon
					STATE.stars[starId].planets[planetId].elements.moons.appendChild(moon.elements.section)

				// jump
					moon.elements.section.setAttribute("open", true)
					moon.elements.name.focus()
			} catch (error) {console.log(error)}
		}

	/* clearMoons */
		function clearMoons(event) {
			try {
				// get ids
					let planetId = event.target.closest(".planet").id
					let starId = planetId.split("-planet-")[0]

				// remove all moons from HTML
					for (let i in STATE.stars[starId].planets[planetId].moons) {
						STATE.stars[starId].planets[planetId].moons[i].elements.section.remove()
					}

				// remove from object
					STATE.stars[starId].planets[planetId].moons = {}
			} catch (error) {console.log(error)}
		}

	/* createMoon */
		function createMoon(planetId, moonSeed) {
			try {
				// values
					let moon = duplicateObject(CONSTANTS.moon)
					for (let i in moonSeed) {
						if (i !== "position") {
							moon[i] = moonSeed[i]
						}
					}

				// id
					moon.id = planetId + "-moon-" + generateRandom()

				// computed
					moon.computed = calculateComputedValues(moon.semiMajorAxis, moon.eccentricity, moon.longitudeOfAscendingNode, moon.argumentOfPeriapsis, moon.inclination)

				// tracking / visible
					if (moonSeed && moonSeed.position && moonSeed.position.tracking !== undefined) {
						moon.position.tracking = moonSeed.position.tracking
					}
					if (moonSeed && moonSeed.position && moonSeed.position.visible !== undefined) {
						moon.position.visible = moonSeed.position.visible
					}

				// form
					var section = document.createElement("details")
						section.id = moon.id
						section.className = "moon"
					moon.elements.section = section

					var summary = document.createElement("summary")
					section.appendChild(summary)

					var header = document.createElement("h3")
						header.innerText = moon.name
					summary.appendChild(header)
					moon.elements.summary = header

				// track
					var label = document.createElement("label")
					summary.appendChild(label)

					var input = document.createElement("input")
						input.type = "radio"
						input.name = "tracking"
						input.value = moon.id
						input.checked = moon.position.tracking
						input.addEventListener(TRIGGERS.input, changeTracking)
					label.appendChild(input)
					moon.elements.tracking = input

					var span = document.createElement("span")
						span.innerText = "tracking"
					label.appendChild(span)

				// visible
					var label = document.createElement("label")
					summary.appendChild(label)

					var input = document.createElement("input")
						input.type = "checkbox"
						input.checked = moon.position.visible
						input.addEventListener(TRIGGERS.input, changeMoonVisible)
					label.appendChild(input)
					moon.elements.visible = input

					var span = document.createElement("span")
						span.innerText = "visible"
					label.appendChild(span)

				// name
					var label = document.createElement("label")
					section.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "name"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "text"
						input.className = "moon-name"
						input.placeholder = "name"
						input.value = moon.name
						input.addEventListener(TRIGGERS.input, changeMoonName)
					label.appendChild(input)
					moon.elements.name = input

					var button = document.createElement("button")
						button.className = "moon-remove"
						button.innerHTML = "&#x2715;"
						button.addEventListener(TRIGGERS.click, removeMoon)
					section.appendChild(button)
					moon.elements.remove = button

				// class
					var label = document.createElement("label")
					section.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "class"
					label.appendChild(heading)

					var select = document.createElement("select")
						select.className = "moon-class"
						
						var option = document.createElement("option")
							option.value = option.innerText = "custom"
						select.appendChild(option)

						for (let i in CONSTANTS.classes.moons) {
							var option = document.createElement("option")
								option.value = i
								option.innerText = CONSTANTS.classes.moons[i].name
							select.appendChild(option)
						}
						
						select.value = moon.class || "custom"
						select.addEventListener(TRIGGERS.input, changeMoonClass)
					label.appendChild(select)
					moon.elements.class = select

				// description
					var label = document.createElement("label")
					section.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "description"
					label.appendChild(heading)

					var textarea = document.createElement("textarea")
						textarea.className = "moon-description"
						textarea.placeholder = "description"
						textarea.value = moon.description
						textarea.addEventListener(TRIGGERS.input, changeMoonDescription)
					label.appendChild(textarea)
					moon.elements.description = textarea

				// color
					var label = document.createElement("label")
					section.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "color"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "color"
						input.className = "moon-color"
						input.value = moon.color
						input.addEventListener(TRIGGERS.input, changeMoonColor)
					label.appendChild(input)
					moon.elements.color = input

				// mass
					var label = document.createElement("label")
					section.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "mass"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "moon-mass-factor"
						input.min = 1
						input.max = 10 - (1 / CONSTANTS.rounding)
						input.step = 0.01
						input.placeholder = "n"
						input.value = moon.massFactor
						input.addEventListener(TRIGGERS.input, changeMoonMass)
					label.appendChild(input)
					moon.elements.massFactor = input

					var span = document.createElement("span")
						span.innerText = "x10^"
					label.appendChild(span)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "moon-mass-power"
						input.min = 0
						input.step = 1
						input.placeholder = "exponent"
						input.value = moon.massPower
						input.addEventListener(TRIGGERS.input, changeMoonMass)
					label.appendChild(input)
					moon.elements.massPower = input

					var span = document.createElement("span")
						span.innerText = "kg"
					label.appendChild(span)

				// orbit
					var label = document.createElement("label")
					section.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "orbit"
					label.appendChild(heading)

					var span = document.createElement("span")
						span.innerText = "day"
					label.appendChild(span)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "moon-day"
						input.min = 0
						input.step = 0.1
						input.placeholder = "day"
						input.value = moon.day
						input.addEventListener(TRIGGERS.input, changeMoonDay)
					label.appendChild(input)
					moon.elements.day = input

					var span = document.createElement("span")
						span.innerText = "/"
					label.appendChild(span)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "moon-period"
						input.min = 0
						input.step = 0.1
						input.placeholder = "period"
						input.value = moon.period
						input.addEventListener(TRIGGERS.input, changeMoonPeriod)
					label.appendChild(input)
					moon.elements.period = input

				// distance
					var label = document.createElement("label")
					section.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "distance"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "moon-semimajoraxis"
						input.min = 0
						input.step = 0.001
						input.placeholder = "distance"
						input.value = moon.semiMajorAxis
						input.addEventListener(TRIGGERS.input, changeMoonSemiMajorAxis)
					label.appendChild(input)
					moon.elements.semiMajorAxis = input

					var span = document.createElement("span")
						span.innerText = "AU"
					label.appendChild(span)

				// advanced
					var details = document.createElement("details")
					section.appendChild(details)

					var summary = document.createElement("summary")
					details.appendChild(summary)

					var heading = document.createElement("h3")
						heading.innerText = "advanced"
					summary.appendChild(heading)

					var inner = document.createElement("div")
						inner.className = "moon-advanced"
					details.appendChild(inner)

				// retrograde
					var label = document.createElement("label")
					inner.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "retrograde"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "checkbox"
						input.checked = moon.retrograde
						input.addEventListener(TRIGGERS.input, changeMoonRetrograde)
					label.appendChild(input)
					moon.elements.retrograde = input

				// eccentricity
					var label = document.createElement("label")
					inner.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "eccentricity"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "moon-eccentricity"
						input.min = 0
						input.max = 1 - (1 / CONSTANTS.rounding)
						input.step = 0.01
						input.placeholder = "eccentricity"
						input.value = moon.eccentricity
						input.addEventListener(TRIGGERS.input, changeMoonEccentricity)
					label.appendChild(input)
					moon.elements.eccentricity = input

					var span = document.createElement("span")
						span.innerText = " /1"
					label.appendChild(span)

				// apoapsis
					var label = document.createElement("label")
					inner.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "apoapsis"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "moon-apoapsis"
						input.min = 0
						input.step = 0.001
						input.placeholder = "apoapsis"
						input.value = moon.apoapsis
						input.addEventListener(TRIGGERS.input, changeMoonApoapsisOrPeriapsis)
					label.appendChild(input)
					moon.elements.apoapsis = input

					var span = document.createElement("span")
						span.innerText = "AU"
					label.appendChild(span)

				// periapsis
					var label = document.createElement("label")
					inner.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "periapsis"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "moon-periapsis"
						input.min = 0
						input.step = 0.001
						input.placeholder = "periapsis"
						input.value = moon.periapsis
						input.addEventListener(TRIGGERS.input, changeMoonApoapsisOrPeriapsis)
					label.appendChild(input)
					moon.elements.periapsis = input

					var span = document.createElement("span")
						span.innerText = "AU"
					label.appendChild(span)

				// inclination
					var label = document.createElement("label")
					inner.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "inclination"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "moon-inclination"
						input.min = 0
						input.max = CONSTANTS.convert.circle_to_degree - (1 / CONSTANTS.rounding)
						input.step = 0.1
						input.placeholder = "inclination"
						input.value = roundNumber(moon.inclination * CONSTANTS.convert.circle_to_degree / CONSTANTS.convert.circle_to_radian)
						input.addEventListener(TRIGGERS.input, changeMoonInclination)
					label.appendChild(input)
					moon.elements.inclination = input

					var span = document.createElement("span")
						span.innerText = "°"
					label.appendChild(span)

				// longitude of ascending node
					var label = document.createElement("label")
					inner.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "longitude of ascending node"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "moon-longitudeofascendingnode"
						input.min = 0
						input.max = CONSTANTS.convert.circle_to_degree - (1 / CONSTANTS.rounding)
						input.step = 0.1
						input.placeholder = "angle"
						input.value = roundNumber(moon.longitudeOfAscendingNode * CONSTANTS.convert.circle_to_degree / CONSTANTS.convert.circle_to_radian)
						input.addEventListener(TRIGGERS.input, changeMoonLongitudeOfAscendingNode)
					label.appendChild(input)
					moon.elements.longitudeOfAscendingNode = input

					var span = document.createElement("span")
						span.innerText = "°"
					label.appendChild(span)

				// argument of periapsis
					var label = document.createElement("label")
					inner.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "argument of periapsis"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "moon-argumentofperiapsis"
						input.min = 0
						input.max = CONSTANTS.convert.circle_to_degree - (1 / CONSTANTS.rounding)
						input.step = 0.1
						input.placeholder = "angle"
						input.value = roundNumber(moon.argumentOfPeriapsis * CONSTANTS.convert.circle_to_degree / CONSTANTS.convert.circle_to_radian)
						input.addEventListener(TRIGGERS.input, changeMoonArgumentOfPeriapsis)
					label.appendChild(input)
					moon.elements.argumentOfPeriapsis = input

					var span = document.createElement("span")
						span.innerText = "°"
					label.appendChild(span)

				// return moon
					return moon
			} catch (error) {console.log(error)}
		}

	/* removeMoon */
		function removeMoon(event) {
			try {
				// get id
					let moonId = event.target.closest(".moon").id
					let planetId = moonId.split("-moon-")[0]
					let starId = planetId.split("-planet-")[0]

				// remove elements
					STATE.stars[starId].planets[planetId].moons[moonId].elements.section.remove()

				// remove from state
					delete STATE.stars[starId].planets[planetId].moons[moonId]
			} catch (error) {console.log(error)}
		}

	/* changeMoonVisible */
		function changeMoonVisible(event) {
			try {
				// get id
					let moonId = event.target.closest(".moon").id
					let planetId = moonId.split("-moon-")[0]
					let starId = planetId.split("-planet-")[0]

				// get visible
					let visible = STATE.stars[starId].planets[planetId].moons[moonId].elements.visible.checked || false

				// save new value
					STATE.stars[starId].planets[planetId].moons[moonId].position.visible = visible
			} catch (error) {console.log(error)}
		}

	/* changeMoonName */
		function changeMoonName(event) {
			try {
				// get id
					let moonId = event.target.closest(".moon").id
					let planetId = moonId.split("-moon-")[0]
					let starId = planetId.split("-planet-")[0]

				// get name
					let name = STATE.stars[starId].planets[planetId].moons[moonId].elements.name.value

				// save new value
					STATE.stars[starId].planets[planetId].moons[moonId].name = name
					STATE.stars[starId].planets[planetId].moons[moonId].elements.summary.innerText = name
			} catch (error) {console.log(error)}
		}

	/* changeMoonClass */
		function changeMoonClass(event) {
			try {
				// get id
					let moonId = event.target.closest(".moon").id
					let planetId = moonId.split("-moon-")[0]
					let starId = planetId.split("-planet-")[0]

				// update class
					// get class
						let moonClass = STATE.stars[starId].planets[planetId].moons[moonId].class = STATE.stars[starId].planets[planetId].moons[moonId].elements.class.value
						if (!CONSTANTS.classes.moons[moonClass]) {
							return
						}

					// get orbitalFraction
						let day = STATE.stars[starId].planets[planetId].moons[moonId].day // d
						let period = STATE.stars[starId].planets[planetId].moons[moonId].period // d
						let orbitalFraction = (day / period) || 0 // ratio
						let retrograde = STATE.stars[starId].planets[planetId].moons[moonId].retrograde

					// set & save values
						STATE.stars[starId].planets[planetId].moons[moonId].elements.color.value = STATE.stars[starId].planets[planetId].moons[moonId].color = CONSTANTS.classes.moons[moonClass].color // #hex
						STATE.stars[starId].planets[planetId].moons[moonId].elements.massFactor.value = STATE.stars[starId].planets[planetId].moons[moonId].massFactor = CONSTANTS.classes.moons[moonClass].massFactor // kg
						STATE.stars[starId].planets[planetId].moons[moonId].elements.massPower.value = STATE.stars[starId].planets[planetId].moons[moonId].massPower = CONSTANTS.classes.moons[moonClass].massPower // kg
						STATE.stars[starId].planets[planetId].moons[moonId].elements.semiMajorAxis.value = STATE.stars[starId].planets[planetId].moons[moonId].semiMajorAxis = CONSTANTS.classes.moons[moonClass].semiMajorAxis // AU
						STATE.stars[starId].planets[planetId].moons[moonId].elements.retrograde.checked = STATE.stars[starId].planets[planetId].moons[moonId].retrograde = CONSTANTS.classes.moons[moonClass].retrograde
						STATE.stars[starId].planets[planetId].moons[moonId].elements.eccentricity.value = STATE.stars[starId].planets[planetId].moons[moonId].eccentricity = CONSTANTS.classes.moons[moonClass].eccentricity // ratio
						STATE.stars[starId].planets[planetId].moons[moonId].elements.apoapsis.value = STATE.stars[starId].planets[planetId].moons[moonId].apoapsis = CONSTANTS.classes.moons[moonClass].apoapsis // AU
						STATE.stars[starId].planets[planetId].moons[moonId].elements.periapsis.value = STATE.stars[starId].planets[planetId].moons[moonId].periapsis = CONSTANTS.classes.moons[moonClass].periapsis // AU

					// computed
						STATE.stars[starId].planets[planetId].moons[moonId].computed = calculateComputedValues(STATE.stars[starId].planets[planetId].moons[moonId].semiMajorAxis, STATE.stars[starId].planets[planetId].moons[moonId].eccentricity, STATE.stars[starId].planets[planetId].moons[moonId].longitudeOfAscendingNode, STATE.stars[starId].planets[planetId].moons[moonId].argumentOfPeriapsis, STATE.stars[starId].planets[planetId].moons[moonId].inclination)

				// update period
					// get planet mass
						let planetMass = STATE.stars[starId].planets[planetId].massFactor * (10 ** STATE.stars[starId].planets[planetId].massPower) // kg

					// convert to SI
						let semiMajorAxis = STATE.stars[starId].planets[planetId].moons[moonId].semiMajorAxis * CONSTANTS.convert.AU_to_meter // m

					// get period
						period = calculateOrbit(planetMass, null, semiMajorAxis) // s

					// convert from SI
						period = period / CONSTANTS.convert.hour_to_second / CONSTANTS.convert.day_to_hour // d

					// set & save period
						STATE.stars[starId].planets[planetId].moons[moonId].elements.period.value = STATE.stars[starId].planets[planetId].moons[moonId].period = period // d

				// update day
					// get equivalent day in new period
						day = roundNumber(orbitalFraction * period) // d

					// flip
						if (retrograde != STATE.stars[starId].planets[planetId].retrograde) {
							day = roundNumber((period - day + period) % period) // d
						}

					// set & save values
						STATE.stars[starId].planets[planetId].moons[moonId].elements.day.value = STATE.stars[starId].planets[planetId].moons[moonId].day = day // d
			} catch (error) {console.log(error)}
		}

	/* changeMoonDescription */
		function changeMoonDescription(event) {
			try {
				// get id
					let moonId = event.target.closest(".moon").id
					let planetId = moonId.split("-moon-")[0]
					let starId = planetId.split("-planet-")[0]

				// get description
					let description = STATE.stars[starId].planets[planetId].moons[moonId].elements.description.value

				// save new value
					STATE.stars[starId].planets[planetId].moons[moonId].description = description
			} catch (error) {console.log(error)}
		}

	/* changeMoonColor */
		function changeMoonColor(event) {
			try {
				// get id
					let moonId = event.target.closest(".moon").id
					let planetId = moonId.split("-moon-")[0]
					let starId = planetId.split("-planet-")[0]

				// get color
					let color = STATE.stars[starId].planets[planetId].moons[moonId].elements.color.value // #hex

				// save new value
					STATE.stars[starId].planets[planetId].moons[moonId].color = color // #hex
			} catch (error) {console.log(error)}
		}

	/* changeMoonMass */
		function changeMoonMass(event) {
			try {
				// get id
					let moonId = event.target.closest(".moon").id
					let planetId = moonId.split("-moon-")[0]
					let starId = planetId.split("-planet-")[0]

				// mass
					// get moon mass
						let massFactor = Number(STATE.stars[starId].planets[planetId].moons[moonId].elements.massFactor.value) // kg
						let massPower = Number(STATE.stars[starId].planets[planetId].moons[moonId].elements.massPower.value) // 10^x

					// errors
						if (!massFactor || !massPower) {
							return
						}

					// save new values
						STATE.stars[starId].planets[planetId].moons[moonId].massFactor = massFactor // kg
						STATE.stars[starId].planets[planetId].moons[moonId].massPower = massPower // 10^x

				// custom class
					STATE.stars[starId].planets[planetId].moons[moonId].elements.class.value = STATE.stars[starId].planets[planetId].moons[moonId].class = "custom"
			} catch (error) {console.log(error)}
		}

	/* changeMoonDay */
		function changeMoonDay(event) {
			try {
				// get id
					let moonId = event.target.closest(".moon").id
					let planetId = moonId.split("-moon-")[0]
					let starId = planetId.split("-planet-")[0]

				// day
					// get moon day
						let day = Number(STATE.stars[starId].planets[planetId].moons[moonId].elements.day.value) // d

					// save new values
						STATE.stars[starId].planets[planetId].moons[moonId].day = roundNumber(day) // d
			} catch (error) {console.log(error)}
		}

	/* changeMoonPeriod */
		function changeMoonPeriod(event) {
			try {
				// get id
					let moonId = event.target.closest(".moon").id
					let planetId = moonId.split("-moon-")[0]
					let starId = planetId.split("-planet-")[0]

				// update value
					// get period
						let period = Number(STATE.stars[starId].planets[planetId].moons[moonId].elements.period.value) // d

					// errors
						if (!period) {
							return
						}

					// save new value
						STATE.stars[starId].planets[planetId].moons[moonId].period = period // d

				// mass & period --> semiMajorAxis
					// get planet mass
						let massFactor = STATE.stars[starId].planets[planetId].massFactor // kg
						let massPower = STATE.stars[starId].planets[planetId].massPower // 10^x

					// errors
						if (!massFactor || !massPower) {
							return
						}

					// convert to SI
						let mass = massFactor * Math.pow(10, massPower) // kg
						period = period * CONSTANTS.convert.day_to_hour * CONSTANTS.convert.hour_to_second // s

					// get semiMajorAxis
						let semiMajorAxis = calculateOrbit(mass, period, null) // m

					// convert from SI
						semiMajorAxis = semiMajorAxis / CONSTANTS.convert.AU_to_meter // AU

					// set & save value
						STATE.stars[starId].planets[planetId].moons[moonId].elements.semiMajorAxis.value = STATE.stars[starId].planets[planetId].moons[moonId].semiMajorAxis = semiMajorAxis // AU

				// semiMajorAxis & eccentricity --> apoapsis & periapsis
					// get eccentricity
						let eccentricity = STATE.stars[starId].planets[planetId].moons[moonId].eccentricity // ratio

					// errors
						if (CONSTANTS.limit.minimumEccentricity > eccentricity || eccentricity >= CONSTANTS.limit.maximumEccentricity || !semiMajorAxis) {
							return
						}

					// get apoapsis & periapsis
						let [apoapsis, periapsis] = calculateEllipse(semiMajorAxis, eccentricity, [null, null]) // AU, AU

					// set & save values
						STATE.stars[starId].planets[planetId].moons[moonId].elements.apoapsis.value   = STATE.stars[starId].planets[planetId].moons[moonId].apoapsis   = apoapsis // AU
						STATE.stars[starId].planets[planetId].moons[moonId].elements.periapsis.value = STATE.stars[starId].planets[planetId].moons[moonId].periapsis = periapsis // AU

				// computed
					STATE.stars[starId].planets[planetId].moons[moonId].computed = calculateComputedValues(STATE.stars[starId].planets[planetId].moons[moonId].semiMajorAxis, STATE.stars[starId].planets[planetId].moons[moonId].eccentricity, STATE.stars[starId].planets[planetId].moons[moonId].longitudeOfAscendingNode, STATE.stars[starId].planets[planetId].moons[moonId].argumentOfPeriapsis, STATE.stars[starId].planets[planetId].moons[moonId].inclination)
			} catch (error) {console.log(error)}
		}

	/* changeMoonSemiMajorAxis */
		function changeMoonSemiMajorAxis(event) {
			try {
				// get id
					let moonId = event.target.closest(".moon").id
					let planetId = moonId.split("-moon-")[0]
					let starId = planetId.split("-planet-")[0]

				// update value
					// get semiMajorAxis
						let semiMajorAxis = Number(STATE.stars[starId].planets[planetId].moons[moonId].elements.semiMajorAxis.value) // AU

					// errors
						if (!semiMajorAxis) {
							return
						}

					// save new value
						STATE.stars[starId].planets[planetId].moons[moonId].semiMajorAxis = semiMajorAxis // AU

				// semiMajorAxis & eccentricity --> apoapsis & periapsis
					// get eccentricity
						let eccentricity = STATE.stars[starId].planets[planetId].moons[moonId].eccentricity // ratio

					// errors
						if (CONSTANTS.limit.minimumEccentricity > eccentricity || eccentricity >= CONSTANTS.limit.maximumEccentricity) {
							return
						}

					// get apoapsis & periapsis
						let [apoapsis, periapsis] = calculateEllipse(semiMajorAxis, eccentricity, [null, null]) // AU, AU

					// set & save values
						STATE.stars[starId].planets[planetId].moons[moonId].elements.apoapsis.value   = STATE.stars[starId].planets[planetId].moons[moonId].apoapsis   = apoapsis // AU
						STATE.stars[starId].planets[planetId].moons[moonId].elements.periapsis.value = STATE.stars[starId].planets[planetId].moons[moonId].periapsis = periapsis // AU

				// semiMajorAxis & mass --> period
					// get planet mass
						let massFactor = STATE.stars[starId].planets[planetId].massFactor // kg
						let massPower = STATE.stars[starId].planets[planetId].massPower // 10^x

					// errors
						if (!massFactor || !massPower) {
							return
						}

					// convert to SI
						let mass = massFactor * Math.pow(10, massPower) // kg
						semiMajorAxis = semiMajorAxis * CONSTANTS.convert.AU_to_meter // m

					// get period
						let period = calculateOrbit(mass, null, semiMajorAxis) // s

					// convert from SI
						period = period / CONSTANTS.convert.hour_to_second / CONSTANTS.convert.day_to_hour // d

					// set & save value
						STATE.stars[starId].planets[planetId].moons[moonId].elements.period.value = STATE.stars[starId].planets[planetId].moons[moonId].period = period // d

				// computed
					STATE.stars[starId].planets[planetId].moons[moonId].computed = calculateComputedValues(STATE.stars[starId].planets[planetId].moons[moonId].semiMajorAxis, STATE.stars[starId].planets[planetId].moons[moonId].eccentricity, STATE.stars[starId].planets[planetId].moons[moonId].longitudeOfAscendingNode, STATE.stars[starId].planets[planetId].moons[moonId].argumentOfPeriapsis, STATE.stars[starId].planets[planetId].moons[moonId].inclination)
			} catch (error) {console.log(error)}
		}

	/* changeMoonRetrograde */
		function changeMoonRetrograde(event) {
			try {
				// retrograde
					// get id
						let moonId = event.target.closest(".moon").id
						let planetId = moonId.split("-moon-")[0]
						let starId = planetId.split("-planet-")[0]

					// get retrograde
						let retrograde = STATE.stars[starId].planets[planetId].moons[moonId].elements.retrograde.checked || false

					// save new value
						STATE.stars[starId].planets[planetId].moons[moonId].retrograde = retrograde

				// update day
					// current
						let day = STATE.stars[starId].planets[planetId].moons[moonId].day // d
						let period = STATE.stars[starId].planets[planetId].moons[moonId].period // d

					// flip
						day = roundNumber((period - day + period) % period) // d

					// set & save value
						STATE.stars[starId].planets[planetId].moons[moonId].elements.day.value = STATE.stars[starId].planets[planetId].moons[moonId].day = day // d
			} catch (error) {console.log(error)}
		}

	/* changeMoonInclination */
		function changeMoonInclination(event) {
			try {
				// get id
					let moonId = event.target.closest(".moon").id
					let planetId = moonId.split("-moon-")[0]
					let starId = planetId.split("-planet-")[0]

				// angle
					// get angle
						let angle = Number(STATE.stars[starId].planets[planetId].moons[moonId].elements.inclination.value) // °

					// convert to SI
						angle = roundNumber(angle * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree) // radians

					// save new values
						STATE.stars[starId].planets[planetId].moons[moonId].inclination = angle // radians
			} catch (error) {console.log(error)}
		}

	/* changeMoonEccentricity */
		function changeMoonEccentricity(event) {
			try {
				// get id
					let moonId = event.target.closest(".moon").id
					let planetId = moonId.split("-moon-")[0]
					let starId = planetId.split("-planet-")[0]

				// update new value
					// get eccentricity
						let eccentricity = Number(STATE.stars[starId].planets[planetId].moons[moonId].elements.eccentricity.value) // ratio

					// errors
						if (CONSTANTS.limit.minimumEccentricity > eccentricity || eccentricity >= CONSTANTS.limit.maximumEccentricity) {
							return
						}

					// save new value
						STATE.stars[starId].planets[planetId].moons[moonId].eccentricity = eccentricity // ratio

				// semiMajorAxis & eccentricity --> apoapsis & periapsis
					// get semiMajorAxis
						let semiMajorAxis = STATE.stars[starId].planets[planetId].moons[moonId].semiMajorAxis // AU

					// errors
						if (!semiMajorAxis) {
							return
						}

					// get apoapsis & periapsis
						let [apoapsis, periapsis] = calculateEllipse(semiMajorAxis, eccentricity, [null, null]) // AU, AU

					// set & save values
						STATE.stars[starId].planets[planetId].moons[moonId].elements.apoapsis.value   = STATE.stars[starId].planets[planetId].moons[moonId].apoapsis   = apoapsis // AU
						STATE.stars[starId].planets[planetId].moons[moonId].elements.periapsis.value = STATE.stars[starId].planets[planetId].moons[moonId].periapsis = periapsis // AU

				// computed
					STATE.stars[starId].planets[planetId].moons[moonId].computed = calculateComputedValues(STATE.stars[starId].planets[planetId].moons[moonId].semiMajorAxis, STATE.stars[starId].planets[planetId].moons[moonId].eccentricity, STATE.stars[starId].planets[planetId].moons[moonId].longitudeOfAscendingNode, STATE.stars[starId].planets[planetId].moons[moonId].argumentOfPeriapsis, STATE.stars[starId].planets[planetId].moons[moonId].inclination)
			} catch (error) {console.log(error)}
		}

	/* changeMoonApoapsisOrPeriapsis */
		function changeMoonApoapsisOrPeriapsis(event) {
			try {
				// get id
					let moonId = event.target.closest(".moon").id
					let planetId = moonId.split("-moon-")[0]
					let starId = planetId.split("-planet-")[0]

				// update new values
					// get apoapsis & periapsis
						let apoapsis   = Number(STATE.stars[starId].planets[planetId].moons[moonId].elements.apoapsis.value) // AU
						let periapsis = Number(STATE.stars[starId].planets[planetId].moons[moonId].elements.periapsis.value) // AU

					// errors
						if (!apoapsis || !periapsis) {
							return
						}

					// save new values
						STATE.stars[starId].planets[planetId].moons[moonId].apoapsis   = apoapsis // AU
						STATE.stars[starId].planets[planetId].moons[moonId].periapsis = periapsis // AU

				// apoapsis & periapsis --> semiMajorAxis
					// get semiMajorAxis
						let semiMajorAxis = calculateEllipse(null, null, [apoapsis, periapsis]) // AU

					// set & save value
						STATE.stars[starId].planets[planetId].moons[moonId].elements.semiMajorAxis.value = STATE.stars[starId].planets[planetId].moons[moonId].semiMajorAxis = semiMajorAxis // AU

				// semiMajorAxis & apoapsis & periapsis --> eccentricity
					// calculate eccentricity
						let eccentricity = calculateEllipse(semiMajorAxis, null, [apoapsis, periapsis]) // ratio

					// set & save value
						STATE.stars[starId].planets[planetId].moons[moonId].elements.eccentricity.value = STATE.stars[starId].planets[planetId].moons[moonId].eccentricity = eccentricity // ratio

				// semiMajorAxis & mass --> period
					// get planet mass
						let massFactor = STATE.stars[starId].moons[moonId].massFactor // kg
						let massPower = STATE.stars[starId].moons[moonId].massPower // 10^x

					// errors
						if (!massFactor || !massPower) {
							return
						}

					// convert to SI
						let mass = massFactor * Math.pow(10, massPower) // kg
						semiMajorAxis = semiMajorAxis * CONSTANTS.convert.AU_to_meter // m

					// get period
						let period = calculateOrbit(mass, null, semiMajorAxis) // s

					// convert from SI
						period = period / CONSTANTS.convert.hour_to_second / CONSTANTS.convert.day_to_hour // d

					// set & save value
						STATE.stars[starId].planets[planetId].moons[moonId].elements.period.value = STATE.stars[starId].planets[planetId].moons[moonId].period = period // d

				// computed
					STATE.stars[starId].planets[planetId].moons[moonId].computed = calculateComputedValues(STATE.stars[starId].planets[planetId].moons[moonId].semiMajorAxis, STATE.stars[starId].planets[planetId].moons[moonId].eccentricity, STATE.stars[starId].planets[planetId].moons[moonId].longitudeOfAscendingNode, STATE.stars[starId].planets[planetId].moons[moonId].argumentOfPeriapsis, STATE.stars[starId].planets[planetId].moons[moonId].inclination)
			} catch (error) {console.log(error)}
		}
	
	/* changeMoonLongitudeOfAscendingNode */
		function changeMoonLongitudeOfAscendingNode(event) {
			try {
				// get id
					let moonId = event.target.closest(".moon").id
					let planetId = moonId.split("-moon-")[0]
					let starId = planetId.split("-planet-")[0]

				// angle
					// get angle
						let angle = Number(STATE.stars[starId].planets[planetId].moons[moonId].elements.longitudeOfAscendingNode.value) // °

					// convert to SI
						angle = roundNumber(angle * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree) // radians

					// save new values
						STATE.stars[starId].planets[planetId].moons[moonId].longitudeOfAscendingNode = angle // radians

				// computed
					STATE.stars[starId].planets[planetId].moons[moonId].computed = calculateComputedValues(STATE.stars[starId].planets[planetId].moons[moonId].semiMajorAxis, STATE.stars[starId].planets[planetId].moons[moonId].eccentricity, STATE.stars[starId].planets[planetId].moons[moonId].longitudeOfAscendingNode, STATE.stars[starId].planets[planetId].moons[moonId].argumentOfPeriapsis, STATE.stars[starId].planets[planetId].moons[moonId].inclination)
			} catch (error) {console.log(error)}
		}

	/* changeMoonArgumentOfPeriapsis */
		function changeMoonArgumentOfPeriapsis(event) {
			try {
				// get id
					let moonId = event.target.closest(".moon").id
					let planetId = moonId.split("-moon-")[0]
					let starId = planetId.split("-planet-")[0]

				// angle
					// get angle
						let angle = Number(STATE.stars[starId].planets[planetId].moons[moonId].elements.argumentOfPeriapsis.value) // °

					// convert to SI
						angle = roundNumber(angle * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree) // radians

					// save new values
						STATE.stars[starId].planets[planetId].moons[moonId].argumentOfPeriapsis = angle // radians

				// computed
					STATE.stars[starId].planets[planetId].moons[moonId].computed = calculateComputedValues(STATE.stars[starId].planets[planetId].moons[moonId].semiMajorAxis, STATE.stars[starId].planets[planetId].moons[moonId].eccentricity, STATE.stars[starId].planets[planetId].moons[moonId].longitudeOfAscendingNode, STATE.stars[starId].planets[planetId].moons[moonId].argumentOfPeriapsis, STATE.stars[starId].planets[planetId].moons[moonId].inclination)
			} catch (error) {console.log(error)}
		}

/*** simulation ***/
	/* simulateSystem */
		function simulateSystem() {
			try {
				// recompute positions
					for (let i in STATE.stars) {
						computeStar(STATE.stars[i], 0, 0)
					}

				// tracking
					computeTracking()

				// clear canvas
					clearCanvas(ELEMENTS.simulation.canvas, ELEMENTS.simulation.context)

				// origin at center of screen
					translateCanvas(ELEMENTS.simulation.canvas, ELEMENTS.simulation.context, (ELEMENTS.simulation.canvas.width / 2), (ELEMENTS.simulation.canvas.height / -2), function() {
						// background field
							simulateField()

						// move to user offset (pan * zoom)
							translateCanvas(ELEMENTS.simulation.canvas, ELEMENTS.simulation.context, (-STATE.controls.x * STATE.controls.zoom), (-STATE.controls.y * STATE.controls.zoom), function() {
								// loop through stars
									for (let i in STATE.stars) {
										simulateStar(STATE.stars[i])
									}
							})
					})
			} catch (error) {console.log(error)}
		}

	/* computeStar */
		function computeStar(star, x, y) {
			try {
				// get localPoint
					let starPoint = {
						x: star.position.x,
						y: star.position.y
					}

				// move to point
					x -= starPoint.x
					y -= starPoint.y

				// save
					star.position.invariableX = x
					star.position.invariableY = y

				// loop through planets
					for (let i in star.planets) {
						computePlanet(star.planets[i], x, y)
					}

				// increment day
					iterateDay(star)
			} catch (error) {console.log(error)}
		}

	/* computePlanet */
		function computePlanet(planet, x, y) {
			try {
				// calculate planet's position at day
					planet.position.trueAnomaly = calculateTrueAnomaly(planet.day, planet.period, planet.retrograde, planet.eccentricity)
					let position = calculatePositionOnEllipse(planet.semiMajorAxis, planet.computed.semiMinorAxis, planet.position.trueAnomaly)
					planet.position.x = position.x - planet.computed.focalDistance
					planet.position.y = position.y

				// get local point
					let planetPoint = {
						x: planet.position.x * Math.abs(Math.cos(planet.inclination)),
						y: planet.position.y
					}

				// rotate around orbit & move to point
					planetPoint = rotatePoint(planetPoint.x, planetPoint.y, planet.computed.longitudeOfPeriapsis)
					x += planetPoint.x
					y += planetPoint.y

				// save
					planet.position.invariableX = x
					planet.position.invariableY = y

				// loop through moons
					for (let i in planet.moons) {
						computeMoon(planet.moons[i], x, y, planet.inclination)
					}

				// increment day
					iterateDay(planet)
			} catch (error) {console.log(error)}
		}

	/* computeMoon */
		function computeMoon(moon, x, y, i) {
			try {
				// calculate moon's position at day
					moon.position.trueAnomaly = calculateTrueAnomaly(moon.day, moon.period, moon.retrograde, moon.eccentricity)
					let position = calculatePositionOnEllipse(moon.semiMajorAxis, moon.computed.semiMinorAxis, moon.position.trueAnomaly)
					moon.position.x = position.x - moon.computed.focalDistance
					moon.position.y = position.y

				// get local point
					let moonPoint = {
						x: moon.position.x * Math.abs(Math.cos(i + moon.inclination)),
						y: moon.position.y
					}

				// rotate around orbit & move to point
					moonPoint = rotatePoint(moonPoint.x, moonPoint.y, moon.computed.longitudeOfPeriapsis)
					x += moonPoint.x
					y += moonPoint.y

				// save
					moon.position.invariableX = x
					moon.position.invariableY = y

				// increment day
					iterateDay(moon)
			} catch (error) {console.log(error)}
		}

	/* computeTracking */
		function computeTracking() {
			try {
				// star
					if (STATE.controls.tracking.star) {
						// star does not exist
							if (!STATE.stars[STATE.controls.tracking.star]) {
								STATE.controls.tracking.star = null
								ELEMENTS.controls.tracking.checked = true
								return
							}

						// planet
							if (STATE.controls.tracking.planet) {
								// planet does not exist --> switch to star
									if (!STATE.stars[STATE.controls.tracking.star].planets[STATE.controls.tracking.planet]) {
										STATE.controls.tracking.planet = null
										STATE.stars[STATE.controls.tracking.star].position.tracking = true
										STATE.stars[STATE.controls.tracking.star].elements.tracking.checked = true
									}

								// moon
									else if (STATE.controls.tracking.moon) {
										// moon does not exist --> switch to planet
											if (!STATE.stars[STATE.controls.tracking.star].planets[STATE.controls.tracking.planet].moons[STATE.controls.tracking.moon]) {
												STATE.controls.tracking.moon = null
												STATE.stars[STATE.controls.tracking.star].planets[STATE.controls.tracking.planet].position.tracking = true
												STATE.stars[STATE.controls.tracking.star].planets[STATE.controls.tracking.planet].elements.tracking.checked = true
											}

										// track to moon
											else {
												STATE.controls.x = STATE.stars[STATE.controls.tracking.star].planets[STATE.controls.tracking.planet].moons[STATE.controls.tracking.moon].position.invariableX
												STATE.controls.y = STATE.stars[STATE.controls.tracking.star].planets[STATE.controls.tracking.planet].moons[STATE.controls.tracking.moon].position.invariableY
												ELEMENTS.controls.x.value = STATE.controls.x
												ELEMENTS.controls.y.value = STATE.controls.y
												return
											}
									}

								// track to planet
									if (STATE.stars[STATE.controls.tracking.star].planets[STATE.controls.tracking.planet]) {
										STATE.controls.x = STATE.stars[STATE.controls.tracking.star].planets[STATE.controls.tracking.planet].position.invariableX
										STATE.controls.y = STATE.stars[STATE.controls.tracking.star].planets[STATE.controls.tracking.planet].position.invariableY
										ELEMENTS.controls.x.value = STATE.controls.x
										ELEMENTS.controls.y.value = STATE.controls.y
										return
									}
							}

						// track to star
							STATE.controls.x = STATE.stars[STATE.controls.tracking.star].position.invariableX
							STATE.controls.y = STATE.stars[STATE.controls.tracking.star].position.invariableY
							ELEMENTS.controls.x.value = STATE.controls.x
							ELEMENTS.controls.y.value = STATE.controls.y
							return
					}
			} catch (error) {console.log(error)}
		}

	/* simulateField */
		function simulateField() {
			try {
				// remove at least 1 star
					STATE.field.stars.shift()

				// always have enough stars
					while (STATE.field.stars.length < CONSTANTS.field.starCount) {
						STATE.field.stars.push({
							x: generateRandom(0, ELEMENTS.simulation.canvas.width ) - (ELEMENTS.simulation.canvas.width  / 2),
							y: generateRandom(0, ELEMENTS.simulation.canvas.height) - (ELEMENTS.simulation.canvas.height / 2),
							color: chooseRandom(CONSTANTS.field.starColors)
						})
					}

				// loop through distant stars
					for (let i in STATE.field.stars) {
						drawEllipse(ELEMENTS.simulation.canvas, ELEMENTS.simulation.context, {
							x: STATE.field.stars[i].x,
							y: STATE.field.stars[i].y,
							eccentricity: 0,
							semiMajorAxis: CONSTANTS.field.starRadius,
							fill: STATE.field.stars[i].color,
							opacity: CONSTANTS.field.starOpacity
						})
					}
			} catch (error) {console.log(error)}
		}

	/* simulateStar */
		function simulateStar(star) {
			try {
				// move to star's perspective
					translateCanvas(ELEMENTS.simulation.canvas, ELEMENTS.simulation.context, star.position.x * STATE.controls.zoom, star.position.y * STATE.controls.zoom, function() {
						// draw habitable zone
							if (star.position.visible) {
								drawEllipse(ELEMENTS.simulation.canvas, ELEMENTS.simulation.context, {
									x: 0,
									y: 0,
									eccentricity: 0,
									semiMajorAxis: star.habitableZone * STATE.controls.zoom,
									stroke: CONSTANTS.canvas.habitableZoneColor,
									lineWidth: CONSTANTS.canvas.habitableZoneThickness * star.habitableZone * STATE.controls.zoom,
									opacity: CONSTANTS.canvas.habitableZoneOpacity,
									shadowColor: CONSTANTS.canvas.habitableZoneColor,
									shadowBlur: CONSTANTS.canvas.habitableZoneShadowBlur * star.habitableZone * STATE.controls.zoom
								})
							}

						// draw star
							if (star.position.visible) {
								drawEllipse(ELEMENTS.simulation.canvas, ELEMENTS.simulation.context, {
									x: 0,
									y: 0,
									eccentricity: 0,
									semiMajorAxis: star.radius * STATE.controls.zoom,
									fill: star.color,
									opacity: CONSTANTS.canvas.starOpacity,
									shadowColor: star.color,
									shadowBlur: CONSTANTS.canvas.glowThickness
								})
							}

						// draw text
							if (star.position.visible) {
								drawText(ELEMENTS.simulation.canvas, ELEMENTS.simulation.context, {
									x: 0,
									y: CONSTANTS.canvas.starFontSize,
									body: star.name,
									fill: star.color,
									opacity: CONSTANTS.canvas.starOpacity,
									fontSize: CONSTANTS.canvas.starFontSize,
									fontFamily: CONSTANTS.canvas.fontFamily
								})
							}

						// loop through planets
							for (let i in star.planets) {
								simulatePlanet(star.planets[i])
							}
					})
			} catch (error) {console.log(error)}
		}

	/* simulatePlanet */
		function simulatePlanet(planet) {
			try {
				// rotate planet's orbit
					rotateCanvas(ELEMENTS.simulation.canvas, ELEMENTS.simulation.context, planet.computed.longitudeOfPeriapsis, function() {
						// save
							ELEMENTS.simulation.context.save()

						// stretch
							ELEMENTS.simulation.context.scale(Math.abs(Math.cos(planet.inclination)), 1)

						// draw orbit
							if (planet.position.visible) {
								drawEllipse(ELEMENTS.simulation.canvas, ELEMENTS.simulation.context, {
									x: -planet.computed.focalDistance * STATE.controls.zoom,
									y: 0,
									eccentricity: planet.eccentricity,
									semiMajorAxis: planet.semiMajorAxis * STATE.controls.zoom,
									startAngle: planet.computed.ascendingNode.a,
									endAngle: planet.computed.descendingNode.a,
									stroke: planet.color,
									lineWidth: CONSTANTS.canvas.orbitThickness,
									opacity: CONSTANTS.canvas.orbitAboveOpacity
								})

								drawEllipse(ELEMENTS.simulation.canvas, ELEMENTS.simulation.context, {
									x: -planet.computed.focalDistance * STATE.controls.zoom,
									y: 0,
									eccentricity: planet.eccentricity,
									semiMajorAxis: planet.semiMajorAxis * STATE.controls.zoom,
									startAngle: planet.computed.descendingNode.a,
									endAngle: planet.computed.ascendingNode.a,
									stroke: planet.color,
									lineWidth: CONSTANTS.canvas.orbitThickness,
									opacity: CONSTANTS.canvas.orbitBelowOpacity
								})
							}

						// move to planet
							translateCanvas(ELEMENTS.simulation.canvas, ELEMENTS.simulation.context, planet.position.x * STATE.controls.zoom, planet.position.y * STATE.controls.zoom, function() {
								ELEMENTS.simulation.context.scale(1 / Math.abs(Math.cos(planet.inclination)), 1)
								rotateCanvas(ELEMENTS.simulation.canvas, ELEMENTS.simulation.context, -planet.computed.longitudeOfPeriapsis, function() {
									// draw planet
										if (planet.position.visible) {
											drawEllipse(ELEMENTS.simulation.canvas, ELEMENTS.simulation.context, {
												x: 0,
												y: 0,
												eccentricity: 0,
												semiMajorAxis: Math.log10(planet.massFactor * (10 ** planet.massPower)) * CONSTANTS.canvas.planet_log_kg_to_pixel,
												fill: planet.color,
												opacity: CONSTANTS.canvas.planetOpacity,
												shadowColor: planet.color,
												shadowBlur: CONSTANTS.canvas.glowThickness
											})
										}
								
									// draw text
										if (planet.position.visible) {
											drawText(ELEMENTS.simulation.canvas, ELEMENTS.simulation.context, {
												x: 0,
												y: CONSTANTS.canvas.planetFontSize,
												body: planet.name,
												fill: planet.color,
												opacity: CONSTANTS.canvas.planetOpacity,
												fontSize: CONSTANTS.canvas.planetFontSize,
												fontFamily: CONSTANTS.canvas.fontFamily
											})
										}

									// loop through moons
										for (let i in planet.moons) {
											simulateMoon(planet, planet.moons[i])
										}
								})
							})

						// restore
							ELEMENTS.simulation.context.restore()
					})
			} catch (error) {console.log(error)}
		}

	/* simulateMoon */
		function simulateMoon(planet, moon) {
			try {
				// rotate moon's orbit
					rotateCanvas(ELEMENTS.simulation.canvas, ELEMENTS.simulation.context, moon.computed.longitudeOfPeriapsis, function() {
						// save
							ELEMENTS.simulation.context.save()

						// stretch
							ELEMENTS.simulation.context.scale(Math.abs(Math.cos(-planet.inclination + moon.inclination)), 1)

						// draw orbit
							if (moon.position.visible) {
								drawEllipse(ELEMENTS.simulation.canvas, ELEMENTS.simulation.context, {
									x: -moon.computed.focalDistance * STATE.controls.zoom,
									y: 0,
									eccentricity: moon.eccentricity,
									semiMajorAxis: moon.semiMajorAxis * STATE.controls.zoom,
									startAngle: moon.computed.ascendingNode.a,
									endAngle: moon.computed.descendingNode.a,
									stroke: moon.color,
									lineWidth: CONSTANTS.canvas.orbitThickness,
									opacity: CONSTANTS.canvas.orbitAboveOpacity
								})

								drawEllipse(ELEMENTS.simulation.canvas, ELEMENTS.simulation.context, {
									x: -moon.computed.focalDistance * STATE.controls.zoom,
									y: 0,
									eccentricity: moon.eccentricity,
									semiMajorAxis: moon.semiMajorAxis * STATE.controls.zoom,
									startAngle: moon.computed.descendingNode.a,
									endAngle: moon.computed.ascendingNode.a,
									stroke: moon.color,
									lineWidth: CONSTANTS.canvas.orbitThickness,
									opacity: CONSTANTS.canvas.orbitBelowOpacity
								})
							}

						// move to moon
							translateCanvas(ELEMENTS.simulation.canvas, ELEMENTS.simulation.context, moon.position.x * STATE.controls.zoom, moon.position.y * STATE.controls.zoom, function() {
								ELEMENTS.simulation.context.scale(1 / Math.abs(Math.cos(planet.inclination + -moon.inclination)), 1)
								rotateCanvas(ELEMENTS.simulation.canvas, ELEMENTS.simulation.context, -moon.computed.longitudeOfPeriapsis, function() {
									// draw moon
										if (moon.position.visible) {
											drawEllipse(ELEMENTS.simulation.canvas, ELEMENTS.simulation.context, {
												x: 0,
												y: 0,
												eccentricity: 0,
												semiMajorAxis: Math.log10(moon.massFactor * (10 ** moon.massPower)) * CONSTANTS.canvas.moon_log_kg_to_pixel,
												fill: moon.color,
												opacity: CONSTANTS.canvas.moonOpacity,
												shadowColor: moon.color,
												shadowBlur: CONSTANTS.canvas.glowThickness
											})
										}
								
									// draw text
										if (moon.position.visible) {
											drawText(ELEMENTS.simulation.canvas, ELEMENTS.simulation.context, {
												x: 0,
												y: CONSTANTS.canvas.moonFontSize,
												body: moon.name,
												fill: moon.color,
												opacity: CONSTANTS.canvas.moonOpacity,
												fontSize: CONSTANTS.canvas.moonFontSize,
												fontFamily: CONSTANTS.canvas.fontFamily
											})
										}
								})
							})

						// restore
							ELEMENTS.simulation.context.restore()
					})
			} catch (error) {console.log(error)}
		}

	/* iterateDay */
		function iterateDay(celestialBody) {
			try {
				// paused
					if (!STATE.controls.play) {
						return
					}

				// invalid day
					if (!celestialBody.day || isNaN(celestialBody.day)) {
						celestialBody.day = 0
					}

				// iterate day
					celestialBody.day += (STATE.controls.rate / CONSTANTS.convert.second_to_loop) // d/l
					celestialBody.day = roundNumber(celestialBody.day)

				// restart
					if (celestialBody.day > celestialBody.period) {
						celestialBody.day = 0
					}

				// set value
					if (celestialBody.elements.day && document.activeElement !== celestialBody.elements.day) {
						celestialBody.elements.day.value = celestialBody.day
					}
			} catch (error) {console.log(error)}
		}

/*** tools ***/
	/* generateRandom */
		function generateRandom(a, b) {
			try {
				// bounds
					if (a !== undefined && b !== undefined) {
						return roundNumber(Math.floor(Math.random() * (b - a)) + a) // random number [a - b)
					}

				// random number
					return String(Math.floor(Math.random() * 1000000000000000)).slice(3, 13) // middle 10 digits of a ~15 digit number
			} catch (error) {console.log(error)}
		}

	/* duplicateObject */
		function duplicateObject(obj) {
			try {
				// not an object
					if (!obj || typeof obj !== "object") {
						return obj
					}

				// stringify -> parse
					return JSON.parse(JSON.stringify(obj))
			} catch (error) {console.log(error)}
		}

	/* chooseRandom */
		function chooseRandom(arr) {
			try {
				// not an array
					if (!Array.isArray(arr)) {
						return arr
					}

				// random element from list
					return duplicateObject(arr[Math.floor(Math.random() * arr.length)])
			} catch (error) {console.log(error)}
		}

	/* roundNumber */
		function roundNumber(number) {
			try {
				return Math.round(number * CONSTANTS.rounding) / CONSTANTS.rounding
			} catch (error) {console.log(error)}
		}

	/* rotatePoint */
		function rotatePoint(x, y, a) {
			try {
				let newX = x * Math.cos(a) - y * Math.sin(a)
				let newY = y * Math.cos(a) + x * Math.sin(a)
				return {x: newX, y: newY}
			} catch (error) {console.log(error)}
		}

	/* getDistnace */
		function getDistance(a, b) {
			try {
				return Math.sqrt(((a.x - b.x) ** 2) + ((a.y - b.y) ** 2))
			} catch (error) {console.log(error)}
		}

/*** calculations ***/
	/* calculateHabitableZone */
		function calculateHabitableZone(mass, habitableZone) {
			try {
				// formula for habitable zone      // derived from https://www.zmescience.com/other/feature-post/the-types-of-stars
					// HZ = 1.06 * m^1.83          // [m < 8*sun] [HZ < 48 AU]
					// HZ = -792 + 404 * log(m)    // [m > 8*sun] [HZ > 48 AU]

				// missing habitableZone
					if (!habitableZone) {
						// convert from SI
							mass = mass / CONSTANTS.convert.solarMass_to_kg // solarMass

						// get habitable zone (from functions of best fit)
							if (mass <= 8) { // solarMass
								return 1.06 * (mass ** 1.83) // AU
							}
							else {
								return -792 + 404 * Math.log(mass) // AU
							}
					}

				// missing mass
					if (!mass) {
						// get mass (from functions of best fit)
							if (habitableZone <= 48) { // AU
								mass = Math.pow(habitableZone / 1.06, 1 / 1.83) // solarMass
							}
							else {
								mass = Math.pow(Math.E, (habitableZone + 792) / 404) // solarMass
							}

						// convert to SI
							return mass * CONSTANTS.convert.solarMass_to_kg // kg
					}
			} catch (error) {console.log(error)}
		}

	/* calculateEllipse */
		function calculateEllipse(semiMajorAxis, eccentricity, [apoapsis, periapsis]) {
			try {
				// formula for semimajor axis
					// a = (A+P)/2
					// semiMajorAxis = (apoapsis + periapsis) / 2

				// missing semiMajorAxis
					if (!semiMajorAxis) {
						return roundNumber((apoapsis + periapsis) / 2) // AU
					}

				// formula for apoapsis and periapsis (focal points)
					// A = a(1+e)
					// P = a(1-e)

				// missing eccentricity
					if (eccentricity == null) {
						if (periapsis) {
							return roundNumber(1 - (periapsis / semiMajorAxis)) // ratio
						}
						if (apoapsis) {
							return roundNumber((apoapsis / semiMajorAxis) - 1) // ratio
						}
					}

				// missing apoapsis & periapsis
					if (!apoapsis || !periapsis) {
						return [
							roundNumber(semiMajorAxis * (1 + eccentricity)), // AU
							roundNumber(semiMajorAxis * (1 - eccentricity)), // AU
						]
					}
			} catch (error) {console.log(error)}
		}

	/* calculateComputedValues */
		function calculateComputedValues(semiMajorAxis, eccentricity, longitudeOfAscendingNode, argumentOfPeriapsis, inclination) {
			try {
				// empty computed object
					let computed = {}

				// semiMinorAxis & focalDistance
					computed.semiMinorAxis = calculateSemiMinorAxis(semiMajorAxis, eccentricity) // AU
					computed.focalDistance = calculateFocalDistance(semiMajorAxis, computed.semiMinorAxis) // AU

				// inclination --> flip ascending / descending
					let inclinationFlip = 1
					if (inclination) {
						while (inclination < 0) {
							inclination += CONSTANTS.convert.circle_to_radian
						}
						inclination = inclination % CONSTANTS.convert.circle_to_radian

						if (inclination > CONSTANTS.convert.circle_to_radian / 2) {
							inclinationFlip = -1
						}
					}

				// nodes
					// ascending node
						computed.ascendingNode = calculatePositionOnEllipse(semiMajorAxis, computed.semiMinorAxis, argumentOfPeriapsis * inclinationFlip) // AU, AU
						computed.ascendingNode.a = Math.atan2(computed.ascendingNode.y, (computed.ascendingNode.x + computed.focalDistance)) // radians

					// descending node
						computed.descendingNode = calculatePositionOnEllipse(semiMajorAxis, computed.semiMinorAxis, argumentOfPeriapsis * inclinationFlip + (CONSTANTS.convert.circle_to_radian / 2)) // AU, AU
						computed.descendingNode.a = Math.atan2(computed.descendingNode.y, (computed.descendingNode.x + computed.focalDistance)) // radians

					// longitude of periapsis
						computed.longitudeOfPeriapsis = longitudeOfAscendingNode + argumentOfPeriapsis

				// return values
					return computed
			} catch (error) {console.log(error)}
		}

	/* calculateSemiMinorAxis */
		function calculateSemiMinorAxis(semiMajorAxis, eccentricity) {
			try {
				// circle
					if (!eccentricity) {
						return semiMajorAxis // AU
					}

				// formula for semiminor axis
					// e = sqrt(a^2 - b^2) / a
					// ea = sqrt(a^2 - b^2)
					// (ea)^2 = a^2 - b^2
					// b^2 = a^2 - (ea)^2
					// b = sqrt(a^2 - (ea)^2)
					// b = sqrt(a^2(1 - e))

				// calculate
					let semiMinorAxis = Math.sqrt( ((semiMajorAxis ** 2) * (1 - eccentricity)) ) // AU
					return roundNumber(semiMinorAxis) // AU
			} catch (error) {console.log(error)}
		}

	/* calculateOrbit */
		function calculateOrbit(mass, period, semiMajorAxis) {
			try {
				// formula for orbital period
					// T^2 = (4π^2/GM) * a^3
					// period^2 = ((4π^2) / (G * mass)) * semiMajorAxis^3

				// missing mass
					if (!mass) {
						return roundNumber( ((CONSTANTS['4π^2'] / (CONSTANTS.G * (period ** 2))) * (semiMajorAxis ** 3)) ) // kg
					}

				// missing period
					if (!period) {
						return roundNumber(Math.sqrt( ((CONSTANTS['4π^2'] / (CONSTANTS.G * mass)) * (semiMajorAxis ** 3)) )) // days
					}

				// missing semiMajorAxis
					if (!semiMajorAxis) {
						return roundNumber(Math.cbrt( (((CONSTANTS.G * mass) / CONSTANTS['4π^2']) * (period ** 2)) )) // m
					}
			} catch (error) {console.log(error)}
		}

	/* calculateEccentricAnomaly */
		function calculateEccentricAnomaly(day, period, eccentricity, retrograde, previousGuess) {
			try {
				// formula for mean motion
					// n = 2π/P
				
				// meanMotion
					let meanMotion = CONSTANTS.convert.circle_to_radian / period // radians

				// formula for eccentric anomaly
					// E = (t * n) + (e * sin(E))

				// generate a new guess
					let nextGuess = (day * meanMotion) + (eccentricity * Math.sin(previousGuess || 0)) // radians
					if (retrograde) {
						nextGuess *= -1
					}

				// not good enough --> recursive calculation
					if (Math.abs(nextGuess - previousGuess) > CONSTANTS.limit.minimumAngle) {
						return calculateEccentricAnomaly(day, period, eccentricity, retrograde, previousGuess) // radians
					}

				// good enough
					return nextGuess // radians
			} catch (error) {console.log(error)}
		}

	/* calculateTrueAnomaly */
		function calculateTrueAnomaly(day, period, retrograde, eccentricity) {
			try {
				// formula for true anomaly
					// E = eccentricAnomaly
					// tan(v / 2) = sqrt(1+e/1-e) * tan(E / 2)
					// v = 2 * arctan(sqrt(1+e/1-e) * tan(E / 2))

				// calculate
					let eccentricAnomaly = calculateEccentricAnomaly(day, period, eccentricity, retrograde) // radians
					let trueAnomaly = 2 * Math.atan( Math.sqrt((1 + eccentricity) / (1 - eccentricity)) * Math.tan(eccentricAnomaly / 2) ) // radians

				// ensure positive
					trueAnomaly = (trueAnomaly + CONSTANTS.convert.circle_to_radian) % CONSTANTS.convert.circle_to_radian // radians
					return trueAnomaly // radians
			} catch (error) {console.log(error)}
		}

	/* calculateFocalDistance */
		function calculateFocalDistance(semiMajorAxis, semiMinorAxis) {
			try {
				// formula for focal radii (f & g) to semimajoraxis (a)
					// f+g = 2a

				// formula for focal radii (f&g) to semiminoraxis (b) and focal distance (c)
					// f+g = 2*sqrt(b^2+c^2)

				// combined
					// 2a = 2*sqrt(b^2 + c^2)
					// a^2 = b^2 + c^2
					// c = sqrt(a^2 - b^2)

				// calculate
					let focalDistance = Math.sqrt((semiMajorAxis ** 2) - (semiMinorAxis ** 2)) // AU
					return roundNumber(focalDistance) // AU
			} catch (error) {console.log(error)}
		}

	/* calculatePositionOnEllipse */
		function calculatePositionOnEllipse(semiMajorAxis, semiMinorAxis, trueAnomaly) {
			try {
				// formula for a line
					// y = mx + c // c = 0, m = tanθ
					// y = tanθ * x

				// formula for an ellipse
					// (x^2 / a^2) + (y^2 / b^2) = 1
					// y = b * sqrt(1 - (x^2 / a^2))

				// combined
					// tanθ * x = b * sqrt(1 - (x^2 / a^2))
					// (x^2 * (tanθ)^2) / b^2 = 1 - (x^2 / a^2)
					// ((x^2 * (tanθ)^2) / b^2) + (x^2 / a^2) = 1
					// x^2 * (((tanθ)^2 / b^2) + (1 / a^2)) = 1
					// x = sqrt(1 / (((tanθ)^2 / b^2) + (1 / a^2)))

				// get coordinates
					while (trueAnomaly < 0) {
						trueAnomaly = (trueAnomaly + CONSTANTS.convert.circle_to_radian)
					}
					trueAnomaly = trueAnomaly % CONSTANTS.convert.circle_to_radian // radian
					let tanA = Math.tan(trueAnomaly) // ratio
					let x = Math.sqrt(1 / (((tanA ** 2) / (semiMinorAxis ** 2)) + (1 / (semiMajorAxis ** 2)))) // AU
					let y = tanA * x // AU

				// adjust for quadrants 2 & 3
					if (CONSTANTS.convert.quarterCircle_to_radian <= trueAnomaly && trueAnomaly < 3 * CONSTANTS.convert.quarterCircle_to_radian) {
						x = -x // AU
						y = -y // AU
					}

				// round
					x = roundNumber(x) // AU
					y = roundNumber(y) // AU

				// return coordinates (relative to center of ellipse)
					return {x: x, y: y} // AU, AU
			} catch (error) {console.log(error)}
		}

	/* calculateDayFromPeriapsis */
		function calculateDayFromPeriapsis(period, dateOfPeriapsis) {
			try {
				// get days from now
					let daysFromNow = new Date(dateOfPeriapsis).getTime() - new Date().getTime() // ms
					daysFromNow = daysFromNow / CONSTANTS.convert.second_to_ms / CONSTANTS.convert.hour_to_second / CONSTANTS.convert.day_to_hour // d

				// convert to day within period
					daysFromNow = period - daysFromNow
					while (daysFromNow < 0) {
						daysFromNow += period
					}
					daysFromNow = daysFromNow % period

				// round and return
					return roundNumber(daysFromNow)
			} catch (error) {console.log(error)}
		}

/*** canvas ***/
	/* resizeCanvas */
		window.addEventListener(TRIGGERS.resize, resizeCanvas)
		function resizeCanvas() {
			try {
				// set height and width
					ELEMENTS.simulation.canvas.width  = window.innerWidth
					ELEMENTS.simulation.canvas.height = window.innerHeight

				// clear canvas
					clearCanvas(ELEMENTS.simulation.canvas, ELEMENTS.simulation.context)
			} catch (error) {console.log(error)}
		}

	/* clearCanvas */
		function clearCanvas(canvas, context) {
			try {
				// clear
					context.globalAlpha = 1
					context.clearRect(0, 0, canvas.width, canvas.height)

				// redraw
					context.fillStyle = CONSTANTS.canvas.spaceColor
					context.globalAlpha = 1
					context.fillRect(0, 0, canvas.width, ELEMENTS.simulation.canvas.height)
			} catch (error) {console.log(error)}
		}

	/* translateCanvas */
		function translateCanvas(canvas, context, x, y, callback) {
			try {
				// slide
					context.translate(x, -y)

				// do stuff
					callback()

				// slide back
					context.translate(-x, y)
			} catch (error) {console.log(error)}
		}

	/* rotateCanvas */
		function rotateCanvas(canvas, context, a, callback) {
			try {
				// slide
					context.rotate(-a)

				// do stuff
					callback()

				// slide back
					context.rotate(a)
			} catch (error) {console.log(error)}
		}

	/* drawEllipse */
		function drawEllipse(canvas, context, ellipse) {
			try {
				// set values
					context.strokeStyle = ellipse.stroke || "transparent"
					context.lineWidth = ellipse.lineWidth || 0
					context.fillStyle = ellipse.fill || "transparent"
					context.globalAlpha = ellipse.opacity || 0
					context.shadowColor = ellipse.shadowColor || "transparent"
					context.shadowBlur = ellipse.shadowBlur || 0

				// get variables
					let radiusX = ellipse.semiMajorAxis
					let radiusY = calculateSemiMinorAxis(ellipse.semiMajorAxis, ellipse.eccentricity)
					let startAngle = ellipse.startAngle !== undefined ? ellipse.startAngle : 0
					let endAngle   = ellipse.endAngle   !== undefined ? ellipse.endAngle : CONSTANTS.convert.circle_to_radian

				// draw
					context.beginPath()
					context.ellipse(ellipse.x, -ellipse.y, radiusX, radiusY, 0, startAngle, endAngle, true)

					if (context.strokeStyle !== "transparent" && context.lineWidth) {
						context.stroke()
					}
					if (context.fillStyle !== "transparent") {
						context.fill()
					}
			} catch (error) {console.log(error)}
		}

	/* drawText */
		function drawText(canvas, context, text) {
			try {
				// no body
					if (!text.body) {
						return
					}

				// set values
					context.strokeStyle = text.stroke || "transparent"
					context.lineWidth = text.lineWidth || 0
					context.fillStyle = text.fill || "transparent"
					context.globalAlpha = text.opacity || 0
					context.shadowColor = text.shadowColor || "transparent"
					context.shadowBlur = text.shadowBlur || 0
					context.font = (text.fontSize || 0) + "px " + (text.fontFamily || "monospace")
					context.textAlign = "center"
					context.textBaseline = "middle"

				// draw
					if (context.fillStyle !== "transparent") {
						context.fillText(text.body, text.x, -text.y)
					}
					if (context.strokeStyle !== "transparent" && context.lineWidth) {
						context.strokeText(text.body, text.x, -text.y)
					}
			} catch (error) {console.log(error)}
		}
