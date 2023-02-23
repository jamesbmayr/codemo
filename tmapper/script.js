/*** globals ***/
	/* triggers */
		const TRIGGERS = {
			scroll: "wheel",
			resize: "resize",
		}
		if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
			TRIGGERS.click = "touchstart"
			TRIGGERS.mousedown = "touchstart"
			TRIGGERS.mousemove = "touchmove"
			TRIGGERS.mouseup = "touchend"
		}
		else {
			TRIGGERS.click = "click"
			TRIGGERS.mousedown = "mousedown"
			TRIGGERS.mousemove = "mousemove"
			TRIGGERS.mouseup = "mouseup"
		}

	/* constants */
		const CONSTANTS = {
			circleRadians: Math.PI * 2,
			backgroundImage: "background.png",
			backgroundWidth: 1700,
			backgroundHeight: 800,
			"dark-gray": "#111111",
			"medium-gray": "#777777",
			"light-gray": "#dddddd",
			shadowBlur: 0,
			border: 0,
			lineWidth: 7,
			font: "sans-serif",
			"font-size": 1,
			alignment: "center",
			textBaseline: "middle",
			stopRadius: 3,
			vehicleRadius: 8,
			stopTextSize: 3,
			vehicleTextSize: 12,
			zoomStep: 0.125,
			zoomMin: 0.125,
			geoZoom: 3125,
			geoOffsetLongitude: -71.08139639872547, // x
			geoOffsetLatitude: 42.31910913644465, // y
			hoverOffset: 2, // px
			displayLoopTime: 1000,
			apiLoopTime: 1000 * 5,
			rounding: 1000,
			moveAmount: 100
		}

	/* API */
		const API = {
			url: "https://api-v3.mbta.com/vehicles?filter[route]=Red,Mattapan,Orange,Green-B,Green-C,Green-D,Green-E,Blue,741,742,743,746,751,749",
			lines: {
				"Red": {id: "Red", color: "#DA291C", display: "Red Line A", indicator: "R", stops: ["Alewife", "Davis", "Porter", "Harvard", "Central", "Kendall/MIT", "Charles/MGH", "Park Street", "Downtown Crossing", "South Station", "Broadway", "Andrew", "JFK/UMass", "Savin Hill", "Fields Corner", "Shawmut", "Ashmont"]},
				"Red-B": {id: "Red-B", color: "#DA291C", display: "Red Line B", indicator: "R", stops: ["Alewife", "Davis", "Porter", "Harvard", "Central", "Kendall/MIT", "Charles/MGH", "Park Street", "Downtown Crossing", "South Station", "Broadway", "Andrew", "JFK/UMass", "North Quincy", "Wollaston", "Quincy Center", "Quincy Adams", "Braintree"]},
				"Mattapan": {id: "Mattapan", color: "#DA291C", display: "Mattapan Trolley", indicator: "M", stops: ["Ashmont", "Cedar Grove", "Butler", "Milton", "Central Avenue", "Valley Road", "Capen Street", "Mattapan"]},
				"Orange": {id: "Orange", color: "#ED8B00", display: "Orange Line", indicator: "O", stops: ["Oak Grove", "Malden Center", "Wellington", "Assembly", "Sullivan Square", "Community College", "North Station", "Haymarket", "State", "Downtown Crossing", "Chinatown", "Tufts Medical Center", "Back Bay", "Massachusetts Avenue", "Ruggles", "Roxbury Crossing", "Jackson Square", "Stony Brook", "Green Street", "Forest Hills"]},
				"Green-B": {id: "Green-B", color: "#00843D", display: "Green Line B", indicator: "B", stops: ["Government Center", "Park Street", "Boylston", "Arlington", "Copley", "Hynes Convention Center", "Kenmore", "Blandford Street", "Boston University East", "Boston University Central", "Boston University West", "Saint Paul Street (B)", "Babcock Street", "Packards Corner", "Harvard Avenue", "Griggs Street", "Allston Street", "Warren Street", "Washington Street", "Sutherland Road", "Chiswick Road", "Chestnut Hill Avenue", "South Street", "Boston College"]},
				"Green-C": {id: "Green-C", color: "#00843D", display: "Green Line C", indicator: "C", stops: ["Government Center", "Park Street", "Boylston", "Arlington", "Copley", "Hynes Convention Center", "Kenmore", "Saint Mary's Street", "Hawes Street", "Kent Street", "Saint Paul Street (C)", "Coolidge Corner", "Summit Avenue", "Brandon Hall", "Fairbanks Street", "Washington Square", "Tappan Street", "Dean Road", "Englewood Avenue", "Cleveland Circle"]},
				"Green-D": {id: "Green-D", color: "#00843D", display: "Green Line D", indicator: "D", stops: ["Union", "Lechmere", "Science Park/West End", "North Station", "Haymarket", "Government Center", "Park Street", "Boylston", "Arlington", "Copley", "Hynes Convention Center", "Kenmore", "Fenway", "Longwood", "Brookline Village", "Brookline Hills", "Beaconsfield", "Reservoir", "Chestnut Hill", "Newton Centre", "Newton Highlands", "Eliot", "Waban", "Woodland", "Riverside"]},
				"Green-E": {id: "Green-E", color: "#00843D", display: "Green Line E", indicator: "E", stops: ["Medford/Tufts", "Ball", "Magoun", "Gilman", "East Somerville", "Lechmere", "Science Park/West End", "North Station", "Haymarket", "Government Center", "Park Street", "Boylston", "Arlington", "Copley", "Prudential", "Symphony", "Northeastern University", "Museum of Fine Arts", "Longwood Medical Area", "Brigham Circle", "Fenwood Road", "Mission Park", "Riverway", "Back of the Hill", "Heath Street"]},
				"Blue": {id: "Blue", color: "#003DA5", display: "Blue Line", indicator: "B", stops: ["Wonderland", "Revere Beach", "Beachmont", "Suffolk Downs", "Orient Heights", "Wood Island", "Airport", "Maverick", "Aquarium", "State", "Government Center", "Bowdoin"]},
				"741": {id: "741", color: "#7C878E", display: "Silver Line 1", indicator: "1", stops: ["South Station", "Courthouse", "World Trade Center", "Silver Line Way", "Terminal A", "Terminal B", "Terminal C", "Terminal E", "Terminal A"]},
				"742": {id: "742", color: "#7C878E", display: "Silver Line 2", indicator: "2", stops: ["South Station", "Courthouse", "World Trade Center", "Silver Line Way", "Northern Ave @ Harbor St", "Northern Ave @ Tide St", "23 Drydock Ave", "27 Drydock Ave", "Drydock Ave @ Black Falcon Ave", "88 Black Falcon", "Drydock Ave @ Design Center Place", "Northern Ave @ Tide St"]},
				"743": {id: "743", color: "#7C878E", display: "Silver Line 3", indicator: "3", stops: ["South Station", "Courthouse", "World Trade Center", "Silver Line Way", "Terminal A", "Airport", "Eastern Avenue", "Box District", "Bellingham Square", "Chelsea"]},
				"746": {id: "746", color: "#7C878E", display: "Silver Line 3", indicator: "3", stops: ["South Station", "Courthouse", "World Trade Center", "Silver Line Way"]},
				"751": {id: "751", color: "#7C878E", display: "Silver Line 4", indicator: "4", stops: ["Essex St @ Atlantic Ave", "Washington St @ Tufts Med Ctr", "Washington St @ Herald St", "Washington St @ E Berkeley St", "Washington St @ W Dedham St", "Washington St @ W Newton St", "Washington St @ Worcester St", "Washington St @ Massachusetts Ave", "Washington St @ Lenox St", "Washington St @ Melnea Cass Blvd", "Nubian"]},
				"749": {id: "749", color: "#7C878E", display: "Silver Line 5", indicator: "5", stops: ["Temple Pl @ Washington St", "Tremont St @ Boylston Station", "Washington St @ Tufts Med Ctr", "Washington St @ Herald St", "Washington St @ E Berkeley St", "Washington St @ W Dedham St", "Washington St @ W Newton St", "Washington St @ Worcester St", "Washington St @ Massachusetts Ave", "Washington St @ Lenox St", "Washington St @ Melnea Cass Blvd", "Nubian"]},
			},
			stops: {
				"Cedar Grove": {latitude:42.279629,longitude:-71.060394},
				"Copley": {latitude:42.349974,longitude:-71.077447},
				"Waban": {latitude:42.325845,longitude:-71.230609},
				"Washington Square": {latitude:42.339394,longitude:-71.135330},
				"Cleveland Circle": {latitude:42.336142,longitude:-71.149326},
				"Fenway": {latitude:42.345403,longitude:-71.104213},
				"Allston Street": {latitude:42.348701,longitude:-71.137955},
				"Green Street": {latitude:42.310525,longitude:-71.107414},
				"Saint Paul Street (C)": {latitude:42.343327,longitude:-71.116997},
				"Capen Street": {latitude:42.267563,longitude:-71.087338},
				"Quincy Adams": {latitude:42.233391,longitude:-71.007153},
				"Harvard Avenue": {latitude:42.350243,longitude:-71.131355},
				"Longwood": {latitude:42.341702,longitude:-71.109956},
				"Tufts Medical Center": {latitude:42.349662,longitude:-71.063917},
				"Brookline Village": {latitude:42.332608,longitude:-71.116857},
				"Hynes Convention Center": {latitude:42.347888,longitude:-71.087903},
				"Blandford Street": {latitude:42.349293,longitude:-71.100258},
				"Reservoir": {latitude:42.335088,longitude:-71.148758},
				"Dean Road": {latitude:42.337807,longitude:-71.141853},
				"Riverside": {latitude:42.337352,longitude:-71.252685},
				"Fenwood Road": {latitude:42.333706,longitude:-71.105728},
				"Downtown Crossing": {latitude:42.355518,longitude:-71.060225},
				"Chestnut Hill": {latitude:42.326753,longitude:-71.164699},
				"Government Center": {latitude:42.359705,longitude:-71.059215},
				"Newton Highlands": {latitude:42.322381,longitude:-71.205509},
				"Bellingham Square": {latitude:42.395438,longitude:-71.033884},
				"Museum of Fine Arts": {latitude:42.337711,longitude:-71.095512},
				"Haymarket": {latitude:42.363021,longitude:-71.058290},
				"Community College": {latitude:42.373622,longitude:-71.069533},
				"Boston University East": {latitude:42.349735,longitude:-71.103889},
				"Sullivan Square": {latitude:42.383975,longitude:-71.076994},
				"Airport": {latitude:42.374262,longitude:-71.030395},
				"Beachmont": {latitude:42.397542,longitude:-70.992319},
				"Babcock Street": {latitude:42.351820,longitude:-71.121650},
				"Wollaston": {latitude:42.266514,longitude:-71.020337},
				"Riverway": {latitude:42.331684,longitude:-71.111931},
				"Mission Park": {latitude:42.333195,longitude:-71.109756},
				"Boston University West": {latitude:42.350941,longitude:-71.113876},
				"Bowdoin": {latitude:42.361365,longitude:-71.062037},
				"Griggs Street": {latitude:42.348545,longitude:-71.134949},
				"Shawmut": {latitude:42.293126,longitude:-71.065738},
				"Northeastern University": {latitude:42.340401,longitude:-71.088806},
				"Wonderland": {latitude:42.413420,longitude:-70.991648},
				"Kenmore": {latitude:42.348949,longitude:-71.095169},
				"Suffolk Downs": {latitude:42.390501,longitude:-70.997123},
				"Newton Centre": {latitude:42.329443,longitude:-71.192414},
				"Andrew": {latitude:42.330154,longitude:-71.057655},
				"State": {latitude:42.358978,longitude:-71.057598},
				"Oak Grove": {latitude:42.436680,longitude:-71.071097},
				"Silver Line Way": {latitude:42.347154,longitude:-71.038385},
				"Brookline Hills": {latitude:42.331316,longitude:-71.126683},
				"Valley Road": {latitude:42.268347,longitude:-71.081343},
				"Chinatown": {latitude:42.352547,longitude:-71.062752},
				"Tappan Street": {latitude:42.338459,longitude:-71.138702},
				"Harvard": {latitude:42.373362,longitude:-71.118956},
				"Charles/MGH": {latitude:42.361166,longitude:-71.070628},
				"Symphony": {latitude:42.342687,longitude:-71.085056},
				"Pleasant Street": {latitude:42.351521,longitude:-71.118889},
				"Stony Brook": {latitude:42.317062,longitude:-71.104248},
				"Milton": {latitude:42.270349,longitude:-71.067266},
				"Science Park/West End": {latitude:42.366664,longitude:-71.067666},
				"Woodland": {latitude:42.332902,longitude:-71.243362},
				"Courthouse": {latitude:42.352450,longitude:-71.046850},
				"Longwood Medical Area": {latitude:42.335960,longitude:-71.100052},
				"Boylston": {latitude:42.353020,longitude:-71.064590},
				"Fairbanks Street": {latitude:42.339725,longitude:-71.131073},
				"Packards Corner": {latitude:42.351967,longitude:-71.125031},
				"Maverick": {latitude:42.369119,longitude:-71.039530},
				"Jackson Square": {latitude:42.323132,longitude:-71.099592},
				"Eliot": {latitude:42.319045,longitude:-71.216684},
				"World Trade Center": {latitude:42.348630,longitude:-71.042460},
				"Heath Street": {latitude:42.328316,longitude:-71.110252},
				"Park Street": {latitude:42.356395,longitude:-71.062424},
				"Fields Corner": {latitude:42.300093,longitude:-71.061667},
				"Wellington": {latitude:42.402370,longitude:-71.077082},
				"Summit Avenue": {latitude:42.341110,longitude:-71.125610},
				"Orient Heights": {latitude:42.386867,longitude:-71.004736},
				"Aquarium": {latitude:42.359784,longitude:-71.051652},
				"Warren Street": {latitude:42.348343,longitude:-71.140457},
				"Kendall/MIT": {latitude:42.362491,longitude:-71.086177},
				"Alewife": {latitude:42.395428,longitude:-71.142483},
				"Brigham Circle": {latitude:42.334229,longitude:-71.104609},
				"Savin Hill": {latitude:42.311290,longitude:-71.053331},
				"Broadway": {latitude:42.342622,longitude:-71.056967},
				"Chiswick Road": {latitude:42.340805,longitude:-71.150711},
				"Massachusetts Avenue": {latitude:42.341512,longitude:-71.083423},
				"Chestnut Hill Avenue": {latitude:42.338169,longitude:-71.153160},
				"Saint Paul Street (B)": {latitude:42.351200,longitude:-71.116104},
				"Coolidge Corner": {latitude:42.342116,longitude:-71.121263},
				"Kent Street": {latitude:42.344074,longitude:-71.114197},
				"Sutherland Road": {latitude:42.341614,longitude:-71.146202},
				"Boston College": {latitude:42.340081,longitude:-71.166769},
				"South Street": {latitude:42.339600,longitude:-71.157661},
				"Eastern Avenue": {latitude:42.388374,longitude:-71.023859},
				"Arlington": {latitude:42.351902,longitude:-71.070893},
				"Washington Street": {latitude:42.343864,longitude:-71.142853},
				"Back of the Hill": {latitude:42.330139,longitude:-71.111313},
				"Lechmere": {latitude:42.370772,longitude:-71.076536},
				"Union": {latitude:42.377359,longitude:-71.094761},
				"East Somerville": {latitude:42.379467,longitude:-71.086625},
				"Gilman": {latitude:42.387928,longitude:-71.096766},
				"Magoun": {latitude:42.393682,longitude:-71.106388},
				"Ball": {latitude:42.399889,longitude:-71.111003},
				"Medford/Tufts": {latitude:42.407975,longitude:-71.117044},
				"Assembly": {latitude:42.392811,longitude:-71.077257},
				"Boston University Central": {latitude:42.350082,longitude:-71.106865},
				"North Quincy": {latitude:42.275275,longitude:-71.029583},
				"Hawes Street": {latitude:42.344906,longitude:-71.111145},
				"Davis": {latitude:42.396740,longitude:-71.121815},
				"Box District": {latitude:42.394049,longitude:-71.028365},
				"Butler": {latitude:42.272429,longitude:-71.062519},
				"Englewood Avenue": {latitude:42.336971,longitude:-71.145660},
				"Wood Island": {latitude:42.379640,longitude:-71.022865},
				"Ashmont": {latitude:42.284520,longitude:-71.063777},
				"Beaconsfield": {latitude:42.335765,longitude:-71.140455},
				"Mattapan": {latitude:42.267620,longitude:-71.092486},
				"Brandon Hall": {latitude:42.340023,longitude:-71.129082},
				"Nubian": {latitude:42.329544,longitude:-71.083982},
				"Chelsea": {latitude:42.397071,longitude:-71.042102},
				"Central Avenue": {latitude:42.270027,longitude:-71.073444},
				"Central": {latitude:42.365486,longitude:-71.103802},
				"Saint Mary's Street": {latitude:42.345974,longitude:-71.107353},
				"Revere Beach": {latitude:42.407843,longitude:-70.992533},
				"Roxbury Crossing": {latitude:42.331397,longitude:-71.095451},
				"Prudential": {latitude:42.345570,longitude:-71.081696},
				"Porter": {latitude:42.388397,longitude:-71.118850},
				"South Station": {latitude:42.350778,longitude:-71.054938},
				"JFK/UMass": {latitude:42.320493,longitude:-71.052468},
				"Quincy Center": {latitude:42.251593,longitude:-71.005255},
				"Braintree": {latitude:42.207966,longitude:-71.001287},
				"Malden Center": {latitude:42.426896,longitude:-71.074026},
				"North Station": {latitude:42.365577,longitude:-71.061290},
				"Back Bay": {latitude:42.347283,longitude:-71.075312},
				"Ruggles": {latitude:42.336339,longitude:-71.089517},
				"Forest Hills": {latitude:42.300686,longitude:-71.113634},
				"Terminal A": {latitude:42.364612,longitude:-71.020862},
				"Terminal B": {latitude:42.361657,longitude:-71.017833},
				"Terminal C": {latitude:42.366635,longitude:-71.017167},
				"Terminal E": {latitude:42.369344,longitude:-71.020238},
				"Northern Ave @ Harbor St": {latitude:42.346634,longitude:-71.035301},
				"Northern Ave @ Tide St": {latitude:42.345192,longitude:-71.031996},
				"23 Drydock Ave": {latitude:42.344649,longitude:-71.030268},
				"27 Drydock Ave": {latitude:42.344706,longitude:-71.028419},
				"Drydock Ave @ Black Falcon Ave": {latitude:42.344232,longitude:-71.027213},
				"88 Black Falcon": {latitude:42.343753,longitude:-71.026335},
				"Drydock Ave @ Design Center Place": {latitude:42.344600,longitude:-71.034476},
				"Essex St @ Atlantic Ave": {latitude:42.351760,longitude:-71.056003},
				"Washington St @ Tufts Med Ctr": {latitude:42.349970,longitude:-71.063413},
				"Washington St @ Herald St": {latitude:42.346457,longitude:-71.064695},
				"Washington St @ E Berkeley St": {latitude:42.343824,longitude:-71.065927},
				"Washington St @ W Dedham St": {latitude:42.340497,longitude:-71.071317},
				"Washington St @ W Newton St": {latitude:42.338788,longitude:-71.073825},
				"Washington St @ Worcester St": {latitude:42.337524,longitude:-71.075479},
				"Washington St @ Massachusetts Ave": {latitude:42.336339,longitude:-71.077070},
				"Washington St @ Lenox St": {latitude:42.335164,longitude:-71.078518},
				"Washington St @ Melnea Cass Blvd": {latitude:42.332781,longitude:-71.081246},
				"Temple Pl @ Washington St": {latitude:42.355385,longitude:-71.062211},
				"Tremont St @ Boylston Station": {latitude:42.353247,longitude:-71.064353},
			},
			vehicles: [],
			loop: null
		}
		window.API = API

	/* elements */
		const ELEMENTS = {
			body: document.body,
			canvas: document.querySelector("#canvas"),
			context: document.querySelector("#canvas").getContext("2d"),
			backgroundImage: document.createElement("img"),
			controls: {
				element: document.querySelector("#controls"),
				zoomIn: document.querySelector("#controls-zoom-in"),
				zoomOut: document.querySelector("#controls-zoom-out"),
				zoomReset: document.querySelector("#controls-zoom-reset"),
				moveUp: document.querySelector("#controls-move-up"),
				moveLeft: document.querySelector("#controls-move-left"),
				moveCenter: document.querySelector("#controls-move-center"),
				moveRight: document.querySelector("#controls-move-right"),
				moveDown: document.querySelector("#controls-move-down"),
			},
			loop: null,
			grabbing: null,
			offset: {
				x: 0,
				y: 0,
				z: 1,
			},
			cursor: {
				x: 0,
				y: 0
			},
			closestStation: document.querySelector("#closest-station")
		}
		ELEMENTS.backgroundImage.src = CONSTANTS.backgroundImage
		ELEMENTS.backgroundImage.onload = displayMap

/*** interaction ***/
	/* grabMap */
		window.addEventListener(TRIGGERS.mousedown, grabMap)
		function grabMap(event) {
			try {
				// already grabbing?
					if (ELEMENTS.grabbing) {
						return
					}

				// get cursor
					ELEMENTS.cursor = {
						x: (event.touches ? event.touches[0].clientX : event.clientX),
						y: (event.touches ? event.touches[0].clientY : event.clientY)
					}

				// set grab position
					ELEMENTS.canvas.setAttribute("grabbing", true)
					ELEMENTS.grabbing = {
						x: ELEMENTS.cursor.x - ELEMENTS.offset.x,
						y: ELEMENTS.cursor.y - ELEMENTS.offset.y
					}
			} catch (error) {console.log(error)}
		}

	/* moveMap */
		window.addEventListener(TRIGGERS.mousemove, moveMap)
		function moveMap(event) {
			try {
				// get cursor
					ELEMENTS.cursor = {
						x: (event.touches ? event.touches[0].clientX : event.clientX),
						y: (event.touches ? event.touches[0].clientY : event.clientY)
					}

				// not grabbing?
					if (!ELEMENTS.grabbing) {
						// distance from center
							const pixelsFromCenter = {
								x: (ELEMENTS.cursor.x - ((ELEMENTS.canvas.width  / 2) + ELEMENTS.offset.x)) / ELEMENTS.offset.z,
								y: (ELEMENTS.cursor.y - ((ELEMENTS.canvas.height / 2) + ELEMENTS.offset.y)) / -ELEMENTS.offset.z
							}
							const cursorCoordinates = {
								x: pixelsFromCenter.x / CONSTANTS.geoZoom + CONSTANTS.geoOffsetLongitude,
								y: pixelsFromCenter.y / CONSTANTS.geoZoom + CONSTANTS.geoOffsetLatitude,
							}
						
						// find station
							setStation(cursorCoordinates)
							return
					}

				// set center
					ELEMENTS.offset.x = ELEMENTS.cursor.x - ELEMENTS.grabbing.x
					ELEMENTS.offset.y = ELEMENTS.cursor.y - ELEMENTS.grabbing.y

				// redisplay
					displayMap()
			} catch (error) {console.log(error)}
		}

	/* ungrabMap */
		window.addEventListener(TRIGGERS.mouseup, ungrabMap)
		function ungrabMap(event) {
			try {
				// stop grabbing
					ELEMENTS.grabbing = null
					ELEMENTS.canvas.removeAttribute("grabbing")
			} catch (error) {console.log(error)}
		}

	/* zoomCanvas */
		window.addEventListener(TRIGGERS.scroll, zoomCanvas)
		function zoomCanvas(event) {
			try {
				// get scroll amount
					let modifier = 0
					if (event.wheelDelta) {
						modifier = (event.wheelDelta > 0) ? CONSTANTS.zoomStep : -CONSTANTS.zoomStep
					}
					else if (event.deltaY) {
						modifier = (event.deltaY < 0) ? CONSTANTS.zoomStep : -CONSTANTS.zoomStep
					}

				// update zoom
					ELEMENTS.offset.z = Math.max(CONSTANTS.zoomMin, ((ELEMENTS.offset.z * CONSTANTS.rounding) + (modifier * CONSTANTS.rounding)) / CONSTANTS.rounding)

				// redisplay
					displayMap()
			} catch (error) {console.log(error)}
		}

	/* zoom buttons */
		ELEMENTS.controls.zoomIn.addEventListener(TRIGGERS.click, setZoom)
		ELEMENTS.controls.zoomOut.addEventListener(TRIGGERS.click, setZoom)
		ELEMENTS.controls.zoomReset.addEventListener(TRIGGERS.click, setZoom)
		function setZoom(event) {
			try {
				// zoom in
					if (event.target == ELEMENTS.controls.zoomIn) {
						zoomCanvas({deltaY: -1})
						return
					}

				// zoom out
					if (event.target == ELEMENTS.controls.zoomOut) {
						zoomCanvas({deltaY: 1})
						return
					}

				// reset zoom
					if (event.target == ELEMENTS.controls.zoomReset) {
						ELEMENTS.offset.z = 1
						displayMap()
					}
			} catch (error) {console.log(error)}
		}

	/* move buttons */
		ELEMENTS.controls.moveUp.addEventListener(TRIGGERS.click, setPosition)
		ELEMENTS.controls.moveLeft.addEventListener(TRIGGERS.click, setPosition)
		ELEMENTS.controls.moveCenter.addEventListener(TRIGGERS.click, setPosition)
		ELEMENTS.controls.moveRight.addEventListener(TRIGGERS.click, setPosition)
		ELEMENTS.controls.moveDown.addEventListener(TRIGGERS.click, setPosition)
		function setPosition(event) {
			try {
				// up
					if (event.target == ELEMENTS.controls.moveUp) {
						ELEMENTS.offset.y += CONSTANTS.moveAmount / ELEMENTS.offset.z
						displayMap()
						return
					}

				// left
					if (event.target == ELEMENTS.controls.moveLeft) {
						ELEMENTS.offset.x += CONSTANTS.moveAmount / ELEMENTS.offset.z
						displayMap()
						return
					}

				// right
					if (event.target == ELEMENTS.controls.moveRight) {
						ELEMENTS.offset.x -= CONSTANTS.moveAmount / ELEMENTS.offset.z
						displayMap()
						return
					}

				// down
					if (event.target == ELEMENTS.controls.moveDown) {
						ELEMENTS.offset.y -= CONSTANTS.moveAmount / ELEMENTS.offset.z
						displayMap()
						return
					}

				// reset position
					if (event.target == ELEMENTS.controls.moveCenter) {
						ELEMENTS.offset.x = 0
						ELEMENTS.offset.y = 0
						displayMap()
					}
			} catch (error) {console.log(error)}
		}

	/* setStation */
		function setStation(cursorCoordinates) {
			try {
				// offset at zoom
					const offsetAtZoom = CONSTANTS.hoverOffset * Math.sqrt(ELEMENTS.offset.z) / CONSTANTS.geoZoom
					let smallestDistance = 1 // arbitrarily large
					let closestStation = null

				// loop through
					for (let i in API.stops) {
						const distanceX = Math.abs(API.stops[i].longitude - cursorCoordinates.x)
						const distanceY = Math.abs(API.stops[i].latitude  - cursorCoordinates.y)

						const scalarDistance = Math.sqrt(distanceX ** 2 + distanceY ** 2)
						if (scalarDistance < smallestDistance && scalarDistance < offsetAtZoom) {
							smallestDistance = scalarDistance
							closestStation = i
						}
					}

				// display
					ELEMENTS.closestStation.innerText = closestStation || ""
					ELEMENTS.closestStation.style.top = ELEMENTS.cursor.y + "px"
					ELEMENTS.closestStation.style.left = ELEMENTS.cursor.x + "px"
			} catch (error) {console.log(error)}
		}

/*** API ***/
	/* fetchData */
		API.loop = setInterval(fetchData, CONSTANTS.apiLoopTime)
		fetchData()
		function fetchData() {
			try {
				fetch(API.url, {method: "GET"})
					.then(function(response){ return response.json() })
					.then(function(data) {
						API.vehicles = data.data
					})
			} catch (error) {console.log(error)}
		}

	/* displayMap */
		ELEMENTS.loop = setInterval(displayMap, CONSTANTS.displayLoopTime)
		displayMap()
		function displayMap() {
			try {
				// clear
					clearCanvas(ELEMENTS.canvas, ELEMENTS.context)

				// slide
					translateCanvas(ELEMENTS.canvas, ELEMENTS.context, {
						x: (ELEMENTS.canvas.width  /  2) + ELEMENTS.offset.x,
						y: (ELEMENTS.canvas.height / -2) + ELEMENTS.offset.y,
					}, function() {
						// displayBackground
							displayBackground()

						// display lines
							displayLines()

						// display stops
							displayStops()

						// display trains
							displayVehicles()
					})
			} catch (error) {console.log(error)}
		}

	/* displayBackground */
		function displayBackground() {
			try {
				// draw
					drawImage(ELEMENTS.canvas, ELEMENTS.context, {
						x: 0,
						y: 0,
						width: CONSTANTS.backgroundWidth * ELEMENTS.offset.z,
						height: CONSTANTS.backgroundHeight * ELEMENTS.offset.z,
						image: ELEMENTS.backgroundImage
					})
			} catch (error) {console.log(error)}
		}

	/* dipslayLines */
		function displayLines() {
			try {
				// loop through lines
					for (let i in API.lines) {
						// loop through stops
							const line = API.lines[i]
							for (let j = 1; j < line.stops.length; j++) {
								// get stops
									const fromStop = API.stops[line.stops[j - 1]] || null
									const toStop   = API.stops[line.stops[j]    ] || null

								// draw line connecting points, in color of train
									drawLine(ELEMENTS.canvas, ELEMENTS.context, {
										x1: (fromStop.longitude * CONSTANTS.geoZoom * ELEMENTS.offset.z) - (CONSTANTS.geoOffsetLongitude 	* CONSTANTS.geoZoom * ELEMENTS.offset.z),
										y1: (fromStop.latitude 	* CONSTANTS.geoZoom * ELEMENTS.offset.z) - (CONSTANTS.geoOffsetLatitude 	* CONSTANTS.geoZoom * ELEMENTS.offset.z),
										x2: (toStop.longitude 	* CONSTANTS.geoZoom * ELEMENTS.offset.z) - (CONSTANTS.geoOffsetLongitude 	* CONSTANTS.geoZoom * ELEMENTS.offset.z),
										y2: (toStop.latitude 	* CONSTANTS.geoZoom * ELEMENTS.offset.z) - (CONSTANTS.geoOffsetLatitude 	* CONSTANTS.geoZoom * ELEMENTS.offset.z),
										color: line.color,
										border: CONSTANTS.lineWidth
									})
							}
					}
			} catch (error) {console.log(error)}
		}

	/* displayStops */
		function displayStops() {
			try {
				// loop through stops
					for (let i in API.stops) {
						// get stop coordinates
							const x = (API.stops[i].longitude * CONSTANTS.geoZoom * ELEMENTS.offset.z) - (CONSTANTS.geoOffsetLongitude 	* CONSTANTS.geoZoom * ELEMENTS.offset.z) 
							const y = (API.stops[i].latitude 	* CONSTANTS.geoZoom * ELEMENTS.offset.z) - (CONSTANTS.geoOffsetLatitude 	* CONSTANTS.geoZoom * ELEMENTS.offset.z)

						// draw circle for stop
							drawCircle(ELEMENTS.canvas, ELEMENTS.context, {
								x: x,
								y: y,
								color: CONSTANTS["light-gray"],
								radius: CONSTANTS.stopRadius
							})

						// label stop
							drawText(ELEMENTS.canvas, ELEMENTS.context, {
								x: x,
								y: y + CONSTANTS.stopTextSize * ELEMENTS.offset.z,
								color: CONSTANTS["medium-gray"],
								size: CONSTANTS.stopTextSize * ELEMENTS.offset.z,
								text: i
							})
					}
			} catch (error) {console.log(error)}
		}

	/* displayVehicles */
		function displayVehicles() {
			try {
				// loop through vehicles
					for (let i in API.vehicles) {
						// get vehicle coordinates
							const vehicle = API.vehicles[i]
							const x = (vehicle.attributes.longitude 	* CONSTANTS.geoZoom * ELEMENTS.offset.z) - (CONSTANTS.geoOffsetLongitude 	* CONSTANTS.geoZoom * ELEMENTS.offset.z) 
							const y = (vehicle.attributes.latitude 	* CONSTANTS.geoZoom * ELEMENTS.offset.z) - (CONSTANTS.geoOffsetLatitude 	* CONSTANTS.geoZoom * ELEMENTS.offset.z)
							
							let color = CONSTANTS["dark-gray"]
							if (vehicle.relationships && vehicle.relationships.route && vehicle.relationships.route.data && vehicle.relationships.route.data.id) {
								color = API.lines[vehicle.relationships.route.data.id] ? API.lines[vehicle.relationships.route.data.id].color : CONSTANTS["dark-gray"]
							}

						// draw circle for vehicle
							drawCircle(ELEMENTS.canvas, ELEMENTS.context, {
								x: x,
								y: y,
								color: color,
								radius: CONSTANTS.vehicleRadius
							})

						// draw indicator
							if (vehicle.relationships && vehicle.relationships.route && vehicle.relationships.route.data && vehicle.relationships.route.data.id) {
								const routeName = vehicle.relationships.route.data.id
								const indicator = API.lines[routeName].indicator || ""
								drawText(ELEMENTS.canvas, ELEMENTS.context, {
									x: x,
									y: y,
									color: CONSTANTS["light-gray"],
									size: CONSTANTS.vehicleTextSize,
									text: indicator
								})
							}
							
					}
			} catch (error) {console.log(error)}
		}

/*** canvas ***/
	/* resizeCanvas */
		resizeCanvas()
		window.addEventListener(TRIGGERS.resize, resizeCanvas)
		function resizeCanvas() {
			try {
				// resize to window
					ELEMENTS.canvas.height = window.innerHeight
					ELEMENTS.canvas.width = window.innerWidth

				// redraw
					displayMap()
			} catch (error) {console.log(error)}
		}

	/* clearCanvas */
		function clearCanvas(canvas, context) {
			try {
				// clear all
					context.clearRect(0, 0, canvas.width, canvas.height)
			} catch (error) {console.log(error)}
		}

	/* translateCanvas */
		function translateCanvas(canvas, context, options, callback) {
			try {
				// options
					options.x = options.x || 0
					options.y = options.y || 0

				// slide
					context.translate(options.x, options.y)

				// do stuff
					callback()

				// slide back
					context.translate(-options.x, -options.y)
			} catch (error) {console.log(error)}
		}

	/* drawLine */
		function drawLine(canvas, context, options) {
			try {
				// options
					options = options || {}
					context.beginPath()
					context.strokeStyle = options.color || CONSTANTS["dark-gray"]
					context.lineWidth = options.border ? options.border : CONSTANTS.border
					context.shadowBlur = options.blur ? options.blur : CONSTANTS.shadowBlur
					context.shadowColor = options.shadow ? options.shadow : CONSTANTS["dark-gray"]
					context.globalAlpha = options.opacity !== undefined ? options.opacity : 1

				// draw
					context.moveTo(options.x1, canvas.height - options.y1)
					context.lineTo(options.x2, canvas.height - options.y2)
					context.stroke()
			} catch (error) {console.log(error)}
		}

	/* drawCircle */
		function drawCircle(canvas, context, options) {
			try {
				// options
					options = options || {}
					context.beginPath()
					context.fillStyle = options.color || CONSTANTS["dark-gray"]
					context.strokeStyle = options.color || CONSTANTS["dark-gray"]
					context.lineWidth = options.border ? options.border : CONSTANTS.border
					context.shadowBlur = options.blur ? options.blur : CONSTANTS.shadowBlur
					context.shadowColor = options.shadow ? options.shadow : CONSTANTS["dark-gray"]
					context.globalAlpha = options.opacity !== undefined ? options.opacity : 1

				// draw
					context.moveTo(options.x, canvas.height - options.y)
					context.arc(options.x, canvas.height - options.y, options.radius, 0, CONSTANTS.circleRadians, true)
					context.fill()
			} catch (error) {console.log(error)}
		}

	/* drawText */
		function drawText(canvas, context, options) {
			try {
				// variables
					options = options || {}
					context.textBaseline = options.baseline || CONSTANTS.textBaseline
					context.font         = (options.style ? options.style + " " : "") + (options.size > 0 ? options.size : CONSTANTS["font-size"]) + "px " + (options.font || CONSTANTS.font)
					context.fillStyle    = options.color || CONSTANTS["dark-gray"]
					context.textAlign    = options.alignment || CONSTANTS.alignment
					context.shadowBlur   = options.blur ? options.blur : CONSTANTS.shadowBlur
					context.shadowColor  = options.shadow ? options.shadow : CONSTANTS["dark-gray"]
					context.globalAlpha  = options.opacity !== undefined ? options.opacity : 1

				// draw
					context.fillText((options.text || ""), options.x, canvas.height - options.y)
			} catch (error) {console.log(error)}
		}

	/* drawImage */
		function drawImage(canvas, context, options) {
			try {
				// save
					context.save()

				// parameters
					options = options || {}
					context.beginPath()
					context.fillStyle   = options.color || CONSTANTS["light-gray"]
					context.lineWidth   = options.border || CONSTANTS.border
					context.shadowBlur  = options.blur ? options.blur : CONSTANTS.shadowBlur
					context.shadowColor = options.shadow ? options.shadow : CONSTANTS["dark-gray"]
					context.globalAlpha = options.opacity !== undefined ? options.opacity : 1

				// image
					context.drawImage(options.image, options.x - options.width / 2, canvas.height - options.y - options.height / 2, options.width, options.height)

				// restore
					context.restore()
			} catch (error) {console.log(error)}
		}
