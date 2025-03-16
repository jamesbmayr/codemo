/*** globals ***/
	/* months */
		const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]

	/* elements */
		const ELEMENTS = {
			body: document.body,
			jlogo: document.querySelector("#j-logo"),
			navigation: document.querySelector("#navigation"),
			search: document.querySelector("#navigation-search"),
			searchIcon: document.querySelector("#navigation-search-icon"),
			reset: document.querySelector("#navigation-reset"),
			tags: {
				code: document.querySelector("#info-tag-code"),
				music: document.querySelector("#info-tag-music"),
				writing: document.querySelector("#info-tag-writing"),
				games: document.querySelector("#info-tag-game")
			},
			random: document.querySelector("#info-links-random"),
			projects: document.querySelector("#projects"),
			backToTop: document.querySelector("#back-to-top-outer"),
			footer: document.querySelector("#footer")
		}

	/* constants */
		const OBSERVER = new IntersectionObserver(observeProjects)
		const SEARCHWAIT = {
			waitTime: 300, // ms
			timeout: null
		}
		const PIN_SVG = `<svg viewBox="10 10 80 80"><path d="M 63 65 C 62 64 60 64 59 65 C 58 66 56 68 53 71 C 50 74 50 74 49 70 C 48 66 48 66 47 62 C 46 58 46 55 43 52 C 40 49 37 49 33 48 C 29 47 29 47 25 46 C 21 45 21 45 24 42 C 30 36 36 30 42 24 C 45 21 45 21 46 25 C 47 29 47 29 48 33 C 49 37 49 40 52 43 C 55 46 58 46 62 47 C 66 48 66 48 70 49 C 74 50 74 50 71 53 C 68 56 66 58 65 59 C 64 60 64 62 65 63 C 65 63 66 64 66 64 C 66 65 65 66 64 66 C 64 66 63 65 63 65 Z"></path></svg>`
		
/*** action ***/
	/* searchOnLoad */
		searchOnLoad()
		function searchOnLoad() {
			try {
				// path --> 404
					if (window.location.protocol !== "file:" && window.location.pathname.length > 1) {
						return
					}

				// no search string --> show all
					let searchString = window.location.search
					if (!searchString || searchString.length < 4) {
						displayProjects(sortProjects(filterProjects(PROJECTS)))
						return
					}

				// parse search string
					let searchParameters = {}
					let searchPairs = searchString.split("?")[1].split("&")
					for (let i in searchPairs) {
						searchPairs[i] = searchPairs[i].split("=")
						searchParameters[searchPairs[i][0].toLowerCase()] = searchPairs[i][1] !== undefined ? searchPairs[i][1] : null
					}

				// random
					if (searchParameters.random) {
						clickRandom()
						return
					}

				// no query
					if (!searchParameters.q || !searchParameters.q.length) {
						displayProjects(sortProjects(filterProjects(PROJECTS)))
						return
					}

				// show search
					ELEMENTS.search.value = searchParameters.q

				// filter --> sort --> display
					displayProjects(sortProjects(filterProjects(PROJECTS, {query: searchParameters.q, name: true, tags: true})))
			} catch (error) {}
		}

	/* inputSearch */
		ELEMENTS.search.addEventListener("input", inputSearch)
		ELEMENTS.reset.addEventListener("click", inputSearch)
		function inputSearch(event) {
			try {
				// wait
					clearInterval(SEARCHWAIT.timeout)
					SEARCHWAIT.timeout = setTimeout(function() {
						// get query
							let query = (ELEMENTS.search.value || "").trim()
							let currentURL = new URL(window.location.href)

						// no search query
							if (!query || !query.length) {
								currentURL.search = ""
								window.history.pushState({}, "", currentURL)
								displayProjects(sortProjects(filterProjects(PROJECTS)))
								return
							}

						// invalid search query
							query = query.toLowerCase().replace(/[^a-z0-9]/g,"")
							if (!query || !query.length) {
								currentURL.search = ""
								window.history.pushState({}, "", currentURL)
								displayProjects([])
								return
							}

						// update url
							currentURL.search = "?q=" + query
							window.history.pushState({}, "", currentURL)

						// filter --> sort --> display
							displayProjects(sortProjects(filterProjects(PROJECTS, {query: query, name: true, tags: true})))
					}, SEARCHWAIT.waitTime)
			} catch (error) {}
		}

	/* focusSearch */
		ELEMENTS.searchIcon.addEventListener("click", focusSearch)
		function focusSearch(event) {
			try {
				ELEMENTS.search.focus()
			} catch (error) {console.log(error)}
		}

	/* clickTag */
		for (let i in ELEMENTS.tags) { ELEMENTS.tags[i].addEventListener("click", clickTag) }
		function clickTag(event) {
			try {
				// not a tag
					if (!event.target || event.target.className !== "tag-button") {
						return
					}

				// get tag
					let query = event.target.getAttribute("data-tag")
					if (!query || !query.length) {
						return
					}

				// add to search
					ELEMENTS.search.value = query
					let currentURL = new URL(window.location.href)
						currentURL.search = "?q=" + query
					window.history.pushState({}, "", currentURL)
				
				// filter --> sort --> display
					displayProjects(sortProjects(filterProjects(PROJECTS, {query: query, tags: true})))
			} catch (error) {}
		}

	/* clickRandom */
		ELEMENTS.random.addEventListener("click", clickRandom)
		function clickRandom() {
			try {
				// get random key
					let keys = Object.keys(PROJECTS).filter(function(p) {
						return !PROJECTS[p].skipRandom && !PROJECTS[p].hidden
					}) || []
					let index = Math.floor(Math.random() * keys.length)

				// navigate
					window.location = keys[index]
			} catch (error) {}
		}

/*** display ***/
	/* filterProjects */
		function filterProjects(projectsObject, options) {
			try {
				// empty array
					let projectsArray = []

				// no query?
					if (!options || !options.query || !options.query.length) {
						// add all
							for (let i in projectsObject) {
								if (!projectsObject[i].hidden) {
									projectsArray.push(projectsObject[i])
								}
							}

						// return
							return projectsArray || []
					}

				// add based on search query
					for (let i in projectsObject) {
						// hidden
							if (projectsObject[i].hidden && options.query !== i) {
								continue
							}

						// name (id)
							if (options.name && i.includes(options.query)) {
								projectsArray.push(projectsObject[i])
							}

						// tags
							else if (options.tags && projectsObject[i].tags.includes(options.query)) {
								projectsArray.push(projectsObject[i])
							}
					}

				// return
					return projectsArray || []
			} catch (error) {}
		}

	/* sortProjects */
		function sortProjects(projectsArray) {
			try {
				// empty array
					if (!projectsArray || !projectsArray.length) {
						return []
					}

				// sort by date
					projectsArray = projectsArray.sort(function(a, b) {
						if (a.pinned && !b.pinned) {
							return -1
						}
						if (b.pinned && !a.pinned) {
							return 1
						}
						return ((new Date(b.date).getTime()) - (new Date(a.date).getTime()))
					})

				// return
					return projectsArray
			} catch (error) {}
		}

	/* displayProjects */
		function displayProjects(projectsArray) {
			try {
				// clear projects
					ELEMENTS.projects.innerHTML = ""

				// no projects
					if (!projectsArray || !projectsArray.length) {
						return
					}

				// build projects
					for (let p in projectsArray) {
						ELEMENTS.projects.appendChild(buildProject(projectsArray[p]))
					}
			} catch (error) {}
		}

	/* buildProject */
		function buildProject(project) {
			try {
				// id
					let id = project.name.toLowerCase().replace(/[^a-z0-9]/g,"")

				// container link
					let element = document.createElement("a")
						element.href = id + "/"
						element.target = "_blank"
						element.className = "project"
						element.id = id
						element.setAttribute("image-url", id + "/banner.png")
					if (project.hidden) {
						element.setAttribute("rel", "nofollow noopener noreferrer")
					}

				// pin
					if (project.pinned) {
						let pin = document.createElement("div")
							pin.className = "project-pin"
							pin.innerHTML = PIN_SVG
						element.appendChild(pin)
					}

				// name
					let nameOuter           = document.createElement("div")
						nameOuter.className = "project-name-outer"
					element.appendChild(nameOuter)

					let name           = document.createElement("div")
						name.className = "project-name"
						name.innerText = project.name
					nameOuter.appendChild(name)

				// image
					let image   = document.createElement("div")
						image.className = "project-image"
						image.setAttribute("alt", project.name)
						image.setAttribute("title", project.name)
					element.appendChild(image)

				// date
					let date = document.createElement("p") 
						date.className = "project-date"
						date.innerText = project.date ? (MONTHS[new Date(project.date).getMonth()] + " " + new Date(project.date).getFullYear()) : "-"
					element.appendChild(date)

				// summary
					let summary = document.createElement("p")
						summary.className = "project-summary"
						summary.innerText = project.description
					element.appendChild(summary)

				// observer
					OBSERVER.observe(element)

				// return
					return element
			} catch (error) {}
		}

	/* observeProjects */
		function observeProjects(projects) {
			try {
				// loop through projects in this intersection event
					for (let i in projects) {
						if (projects[i].isIntersecting) {
							// get image url
								let projectElement = projects[i].target
								let imageURL = projectElement.getAttribute("image-url")

							// set image
								if (imageURL) {
									projectElement.removeAttribute("image-url")
									projectElement.querySelector(".project-image").style.backgroundImage = "url(" + imageURL + ")"
								}
						}
					}
			} catch (error) {}
		}

/*** game ***/
	/* constants */
		const CONSTANTS = {
			jSize: 50,
			maxCount: 100,
			maxVelocity: 15,
			minVelocity: 5,
			scoreVelocityFactor: 0.5,
			counter: 10,
			interval: 50,
			fadeTime: 500,
		}

	/* game */
		const GAME = {}

	/* changeGame */
		ELEMENTS.jlogo.addEventListener("click", changeGame)
		function changeGame(event) {
			try {
				// not playing --> start
					if (!GAME.isPlaying) {
						// reset
							GAME.score = 0
							GAME.isPlaying = true

						// change cursor
							ELEMENTS.body.setAttribute("game", true)

						// display score
							ELEMENTS.search.placeholder = "catch the Js!"

						// game loop
							GAME.loop = setInterval(updateGame, CONSTANTS.interval)
							return	
					}

				// playing --> stop
					clearInterval(GAME.loop)
					GAME.loop = null
					GAME.score = 0
					GAME.isPlaying = false
					ELEMENTS.search.placeholder = "search..."
					ELEMENTS.body.removeAttribute("game")

				// fade each j
					Array.from(document.querySelectorAll(".j")).forEach(function(j) {
						fadeJ(j)
					})
			} catch (error) {}
		}

	/* updateGame */
		function updateGame() {
			try {
				// update counter
					GAME.counter = GAME.counter ? GAME.counter - 1 : CONSTANTS.counter - 1

				// create if necessary
					let jArray = Array.from(document.querySelectorAll(".j"))
					if (!GAME.counter && jArray.length < CONSTANTS.maxCount) {
						createJ()
					}

				// update positions
					updatePositions(jArray)
			} catch (error) {}
		}

	/* createJ */
		function createJ() {
			try {
				// new element above screen, random left and speed
					let j = document.createElement("button")
						j.className = "j"
						j.style.left = (Math.floor(Math.random() * (window.innerWidth - 3 * CONSTANTS.jSize)) + CONSTANTS.jSize) + "px"
						j.style.top = "-" + CONSTANTS.jSize + "px"
						j.setAttribute("speed", Math.min(CONSTANTS.maxVelocity, Math.max(CONSTANTS.minVelocity, Math.floor(Math.random() * GAME.score * CONSTANTS.scoreVelocityFactor))))
						j.addEventListener("mouseenter", captureJ)
						j.addEventListener("touchstart", captureJ)
					document.body.appendChild(j)

					let jSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg")
						jSVG.setAttribute("viewBox", "10 10 80 80")
					j.appendChild(jSVG)

					let jPath = document.createElementNS("http://www.w3.org/2000/svg", "path")
						jPath.setAttribute("d", "M 60 27 C 60 42 60 58 60 73 C 60 74 60 74 61 74 C 64 74 68 74 70 74 C 71 74 72 73 72 72 C 72 58 72 42 72 28 C 72 27 71 26 70 26 C 68 26 64 26 61 26 C 60 26 60 26 60 27 Z M 30 74 C 32 74 36 74 38 74 C 39 74 39 74 38 73 C 35 70 32 67 29 64 C 28 63 28 63 28 64 C 28 67 28 70 28 72 C 28 73 29 74 30 74 Z M 43 74 C 46 74 54 74 57 74 C 58 74 58 74 58 73 C 58 66 58 34 58 27 C 58 26 58 26 57 26 C 54 26 46 26 44 26 C 42 26 42 26 40 24 C 38 22 30 14 28 12 C 27 11 26 10 28 10 C 30 10 54 10 56 10 C 58 10 58 10 60 12 C 62 14 69 21 72 24 C 74 26 74 26 74 29 C 74 34 74 66 74 71 C 74 74 74 74 72 76 C 70 78 62 86 60 88 C 58 90 58 90 56 90 C 54 90 46 90 44 90 C 42 90 42 90 40 88 C 38 86 30 78 28 76 C 26 74 26 74 26 71 C 26 70 26 62 26 60 C 26 58 27 59 28 60 C 30 62 38 70 40 72 C 42 74 42 74 43 74 Z")
					jSVG.appendChild(jPath)
			} catch (error) {}
		}

	/* updatePositions */
		function updatePositions(jArray) {
			try {
				// get positions
					let scrollOffset = (window.pageYOffset || document.documentElement.scrollTop)
					let footerRect = ELEMENTS.footer.getBoundingClientRect()
					let fadePoint = scrollOffset + footerRect.top
					let removePoint = scrollOffset + footerRect.bottom

				// update each j
					for (let i in jArray) {
						let j = jArray[i]
						let jTop = Number(j.style.top.replace("px",""))

						if (jTop > removePoint) {
							fadeJ(j)
						}
						else {
							j.style.top = jTop + Number(j.getAttribute("speed")) + "px"

							if (jTop > fadePoint) {
								fadeJ(j)
							}
						}
					}
			} catch (error) {}
		}

	/* captureJ */
		function captureJ(event) {
			try {
				// don't double-count
					event.preventDefault()

				// already captured?
					if (event.target.getAttribute("fade")) {
						return
					}

				// remove element
					fadeJ(event.target)

				// increase score
					GAME.score++

				// display score
					ELEMENTS.search.placeholder = GAME.score + (GAME.score == 1 ? " point" : " points")
			} catch (error) {}
		}

	/* fadeJ */
		function fadeJ(j) {
			try {
				// apply fade now
					j.setAttribute("fade", true)

				// remove in a second
					setTimeout(function() {
						j.remove()
					}, CONSTANTS.fadeTime)
			} catch (error) {}
		}
