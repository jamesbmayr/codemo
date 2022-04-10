/*** globals ***/
	/* triggers */
		const TRIGGERS = {
			input: "input",
			click: "click",
			resize: "resize"
		}

	/* constants */
		const CONSTANTS = {
			allowedFilters: ["id", "tags", "since", "before", "search"],
			databaseURL: "https://script.google.com/macros/s/AKfycbwWy5nVYgWr933LQ5Gqm7G5Xs4w8eugCwzqG4XEHbTbjzWzy_e6Q82zu2v5EOUtLjTTzw/exec",
			waitTime: 1000,
			breakpoints: [750, 1050, 1400],
			blogTitle: "James Mayr | blog"
		}

	/* elements */
		const ELEMENTS = {
			title: document.querySelector("#title"),
			home: document.querySelector("#header-home"),
			search: document.querySelector("#header-search"),
			loading: document.querySelector("#loading"),
			error: document.querySelector("#error"),
			cards: document.querySelector("#cards"),
			post: document.querySelector("#post"),
			scrollToTop: document.querySelector("#scroll-to-top")
		}

	/* cache */
		const STATE = {
			columns: (window.innerWidth > CONSTANTS.breakpoints[2] ? 4 : window.innerWidth > CONSTANTS.breakpoints[1] ? 3 : window.innerWidth > CONSTANTS.breakpoints[0] ? 2 : 1),
			cache: [],
			cachedFilters: [],
			filters: {},
			searchWait: null,
			homeWait: null
		}

/*** onload ***/
	/* loadBlog */
		loadBlog()
		function loadBlog() {
			try {
				// hash
					let hash = detectHash()
					if (hash) {
						updateFilters({id: hash})
						updateDisplay()
						return
					}

				// params
					let queryParams = detectQueryParams()
					if (queryParams) {
						updateFilters(queryParams)
						updateDisplay()
						return
					}

				// update display
					updateDisplay()
			} catch (error) {console.log(error)}
		}

	/* detectHash */
		function detectHash() {
			try {
				// get hash
					let hash = (window.location.hash || "").slice(1).trim()

				// no hash
					if (!hash || !hash.length) {
						return
					}

				// clean
					return hash.replace(/\s/g, "-").toLowerCase()
			} catch (error) {console.log(error)}
		}

	/* detectQueryParams */
		function detectQueryParams() {
			try {
				// get query string
					let queryString = (window.location.search || "").slice(1).trim()

				// no query string
					if (!queryString || !queryString.length) {
						return
					}

				// parse
					let queryParams = {}
					queryString = queryString.split("&")
					for (let i in queryString) {
						let pair = queryString[i].split("=")
						queryParams[pair[0].trim().toLowerCase()] = pair[1].trim() || null
					}

				// return
					return queryParams
			} catch (error) {console.log(error)}
		}

/*** interaction ***/
	/* resizeScreen */
		window.addEventListener(TRIGGERS.resize, resizeScreen)
		function resizeScreen() {
			try {
				// get columns
					let previousColumns = STATE.columns
					STATE.columns = (window.innerWidth > CONSTANTS.breakpoints[2] ? 4 : window.innerWidth > CONSTANTS.breakpoints[1] ? 3 : window.innerWidth > CONSTANTS.breakpoints[0] ? 2 : 1)

				// no change
					if (previousColumns == STATE.columns || window.location.hash) {
						return
					}

				// redisplay
					updateDisplay()
			} catch (error) {console.log(error)}
		}

	/* updateSearch */
		ELEMENTS.search.addEventListener(TRIGGERS.input, updateSearch)
		function updateSearch(posts) {
			try {
				// cancel any pending searches
					clearTimeout(STATE.searchWait)
					STATE.searchWait = null

				// get current search string
					let searchString = (ELEMENTS.search.value || "").trim().toLowerCase()

				// split
					searchString = searchString.trim().toLowerCase().replace(/[^a-z0-9\s]/g, "") || null
				
				// update filters
					updateFilters(searchString ? {search: searchString} : null)

				// update display
					STATE.searchWait = setTimeout(function() {
						// stop waiting
							clearTimeout(STATE.searchWait)
							STATE.searchWait = null

						// update
							updateDisplay()
					}, CONSTANTS.waitTime)
			} catch (error) {console.log(error)}
		}

	/* clickHome */
		ELEMENTS.home.addEventListener(TRIGGERS.click, clickHome)
		function clickHome(event) {
			try {
				// no naive link click
					event.stopPropagation()
					event.preventDefault()

				// spin
					clearInterval(CONSTANTS.homeWait)
					ELEMENTS.home.setAttribute("spin", true)

				// reset filters
					updateFilters()

				// redisplay
					updateDisplay()

				// stop spinning
					CONSTANTS.homeWait = setTimeout(function() {
						ELEMENTS.home.removeAttribute("spin")
					}, CONSTANTS.waitTime)
			} catch (error) {console.log(error)}
		}

	/* clickTag */
		function clickTag(event) {
			try {
				// don't click blog post
					event.stopPropagation()
					event.preventDefault()

				// get the tag text
					let tagValue = event.target.getAttribute("data-value")

				// update filter
					updateFilters({tags: [tagValue.trim()]})

				// redisplay
					updateDisplay()
			} catch (error) {console.log(error)}
		}

	/* clickCard */
		function clickCard(event) {
			try {
				// no naive link click
					event.stopPropagation()
					event.preventDefault()

				// get the url
					let card = event.target.closest(".card")
					let id = card.getAttribute("href").slice(1)

				// update filter
					updateFilters({id: id})

				// redisplay
					updateDisplay()
			} catch (error) {console.log(error)}
		}

	/* clickScrollToTop */
		ELEMENTS.scrollToTop.addEventListener(TRIGGERS.click, scrollToTop)
		function scrollToTop(event) {
			try {
				// no naive link click
					event.stopPropagation()
					event.preventDefault()

				// scroll to top of page
					window.scrollTo(0, 0)

				// blur
					ELEMENTS.scrollToTop.blur()
			} catch (error) {console.log(error)}
		}

/*** tools ***/
	/* updateFilters */
		function updateFilters(parameters) {
			try {
				// reset filter
					STATE.filters = {}

				// loop through parameters
					for (let i in parameters) {
						if (CONSTANTS.allowedFilters.includes(i)) {
							STATE.filters[i] = parameters[i]
						}
					}

				// build url
					let currentURL = new URL(window.location.href)
						currentURL.search = ""
						currentURL.hash = ""

					let queryString = ""
					for (let i in STATE.filters) {
						if (i == "id") {
							currentURL = currentURL + "#" + STATE.filters[i]
							break
						}

						queryString += (i + "=" + STATE.filters[i])
					}
					
					if (queryString && queryString.length) {
						currentURL = currentURL + "?" + queryString
					}
				
				// update url
					window.history.pushState({}, "", currentURL)

				// update search
					ELEMENTS.search.value = STATE.filters.search || (STATE.filters.tags ? STATE.filters.tags.join(", ") : "")
			} catch (error) {console.log(error)}
		}

	/* requestPosts */
		function requestPosts(callback) {
			try {
				// build url
					let url = CONSTANTS.databaseURL
					if (Object.keys(STATE.filters).length) {
						url += "?"
						for (let i in STATE.filters) {
							url += (i + "=" + STATE.filters[i])
						}
					}

				// loading spinner
					ELEMENTS.loading.setAttribute("spin", true)

				// request
					let request = new XMLHttpRequest()
						request.open("GET", url, true)
						request.onload = function(data) {
							receivePosts(data)
							callback()
						}
						request.send()
			} catch (error) {console.log(error)}
		}

	/* receivePosts */
		function receivePosts(request) {
			try {
				// no response
					if (!request || !request.target || !request.target.response) {
						return
					}

				// get posts
					let data = JSON.parse(request.target.response)
					let posts = data.posts || []
					let filters = data.filters || {}

				// loading spinner
					ELEMENTS.loading.removeAttribute("spin")

				// add posts to cache
					for (let i in posts) {
						// this one
							let newPost = posts[i]

						// already cached ?
							let cachedPost = STATE.cache.find(function(c) {
								return c.id == newPost.id
							}) || null

						// if already cached, update it
							if (cachedPost) {
								for (let j in newPost) {
									cachedPost[j] = newPost[j]
								}
							}

						// otherwise, just add it wholesale
							else {
								STATE.cache.push(newPost)
							}
					}

				// resort cache
					STATE.cache.sort(function(a, b) {
						return b.date - a.date
					})

				// add current filter to cache
					let stringifiedFilter = JSON.stringify(filters)
					if (!STATE.cachedFilters.includes(stringifiedFilter)) {
						STATE.cachedFilters.push(stringifiedFilter)
					}
			} catch (error) {console.log(error)}
		}

	/* processMarkdown */
		function processMarkdown(html) {
			try {
				// blockquote
					if (html[0] == ">") {
						html = "<blockquote>" + html.replace(/>\s?/, "") + "</blockquote>"
					}

				// newlines
					html = html.replace(/\n/g, "<br>")

				// code
					let codeMatches = html.match(/\`([^\`]*?)\`/g)
					if (codeMatches && codeMatches.length) {
						for (let i in codeMatches) {
							let match = codeMatches[i]
							html = html.replace(match, "<code>" + match.replace(/\`/g, "").replace(/\</g, "&lt;").replace(/\>/g, "&gt;") + "</code>")
						}
					}

				// linked images
					let imageMatches = html.match(/\!\[[^\]]*?\]\([^)]*?\)/g)
					if (imageMatches && imageMatches.length) {
						for (let i in imageMatches) {
							let match = imageMatches[i]
							let text = match.match(/\[(.*?)\]/)[1]
							let url  = match.match(/\((.*?)\)/)[1]
							html = html.replace(match, "<img class='post-image' alt='" + text + "' src='" + url + "'>")
						}
					}

				// links
					let linkMatches = html.match(/\[[^\]]*?\]\([^)]*?\)/g)
					if (linkMatches && linkMatches.length) {
						for (let i in linkMatches) {
							let match = linkMatches[i]
							let text = match.match(/\[(.*?)\]/)[1]
							let url  = match.match(/\((.*?)\)/)[1]
							html = html.replace(match, "<a href='" + url + "' target='_blank'>" + text + "</a>")
						}
					}

				// bold
					let boldMatches = html.match(/\*\*([^\*\*]*?)\*\*/g)
					if (boldMatches && boldMatches.length) {
						for (let i in boldMatches) {
							let match = boldMatches[i]
							html = html.replace(match, "<b>" + match.replace(/\*\*/g, "") + "</b>")
						}
					}

				// italic
					let italicMatches = html.match(/\_([^\_]*?)\_/g)
					if (italicMatches && italicMatches.length) {
						for (let i in italicMatches) {
							let match = italicMatches[i]
							html = html.replace(match, "<i>" + match.replace(/\_/g, "") + "</i>")
						}
					}

				// line
					let lineMatches = html.match(/\-\-\-/g)
					if (lineMatches && lineMatches.length) {
						for (let i in lineMatches) {
							let match = lineMatches[i]
							html = html.replace(match, "<hr>")
						}
					}

				// return
					return html || ""
			} catch (error) {console.log(error)}
		}

/*** display ***/
	/* updateDisplay */
		function updateDisplay() {
			try {
				// stringified filter
					let stringifiedFilter = JSON.stringify(STATE.filters)

				// haven't fetched this before?
					if (!STATE.cachedFilters.includes(stringifiedFilter)) {
						requestPosts(updateDisplay)
						return
					}

				// empty cache?
					if (!STATE.cache.length) {
						displayError()
						return
					}

				// display individual post
					if (STATE.filters.id) {
						// get that post (with body)
							let post = STATE.cache.find(function(c) {
								return c.id == STATE.filters.id && c.body
							}) || null

						// post not found
							if (!post) {
								displayError()
								return
							}

						// display that post
							displayPost(post)
							return
					}

				// display cards
					// get the filtered posts
						let posts = STATE.cache.filter(function(c) {
							// date filters
								if (STATE.filters.since && c.date < STATE.filters.since) {
									return false
								}
								if (STATE.filters.before && c.date > STATE.filters.before) {
									return false
								}

							// tag & search filters
								if (STATE.filters.tags || STATE.filters.search) {
									let allowed = false
									for (let i in c.tags) {
										if (STATE.filters.tags && STATE.filters.tags.includes(c.tags[i])) {
											allowed = true
											break
										}
										if (STATE.filters.search && STATE.filters.search == c.tags[i]	) {
											allowed = true
											break
										}
									}

									if (STATE.filters.search && c.title.trim().toLowerCase().replace(/[^a-z0-9\s]/g, "").includes(STATE.filters.search)) {
										allowed = true
									}

									if (!allowed) {
										return false
									}
								}

							// still here --> allowed
								return true
						}) || null

					// no posts
						if (!posts || !posts.length) {
							displayError()
							return
						}

					// display those cards
						displayCards(posts)
			} catch (error) {console.log(error)}
		}

	/* displayError */
		function displayError() {
			try {
				// hide loading
					ELEMENTS.loading.removeAttribute("spin")

				// clear cards & post
					ELEMENTS.post.innerHTML = ""
					ELEMENTS.cards.innerHTML = ""

				// title
					ELEMENTS.title.innerText = CONSTANTS.blogTitle

				// error
					ELEMENTS.error.setAttribute("visible", true)
			} catch (error) {console.log(error)}
		}

	/* displayCards */
		function displayCards(posts) {
			try {
				// hide error & loading
					ELEMENTS.loading.removeAttribute("spin")
					ELEMENTS.error.removeAttribute("visible")

				// clear cards & post
					ELEMENTS.post.innerHTML = ""
					ELEMENTS.cards.innerHTML = ""

				// title
					ELEMENTS.title.innerText = CONSTANTS.blogTitle

				// columns
					let columns = []
					for (let c = 0; c < STATE.columns; c++) {
						let column = document.createElement("div")
							column.className = "card-column"
							column.id = "card-column-" + c
						ELEMENTS.cards.appendChild(column)
						columns.push(column)
					}

				// loop through
					let currentColumn = 0
					for (let i in posts) {
						displayCard(posts[i], columns[currentColumn])
						
						currentColumn++
						if (currentColumn >= STATE.columns) {
							currentColumn = 0
						}
					}

				// scroll to top of page
					window.scrollTo(0, 0)
			} catch (error) {console.log(error)}
		}

	/* displayCard */
		function displayCard(post, column) {
			try {
				// build card
					let card = document.createElement("a")
						card.className = "card"
						card.href = "#" + post.id
						card.addEventListener(TRIGGERS.click, clickCard)
					column.appendChild(card)

				// image
					if (post.cardImage) {
						let image = document.createElement("img")
							image.className = "card-image"
							image.src = post.cardImage
						card.appendChild(image)
					}

				// title
					let title = document.createElement("h2")
						title.className = "card-title"
						title.innerText = post.title || ""
					card.appendChild(title)

				// date
					let date = document.createElement("p")
						date.className = "card-date"
						date.innerText = new Date(post.date).toLocaleDateString()
					card.appendChild(date)

				// summary
					let summary = document.createElement("p")
						summary.className = "card-summary"
						summary.innerText = post.cardText || ""
					card.appendChild(summary)

				// tags
					let tagsContainer = document.createElement("div")
						tagsContainer.className = "card-tags"
					card.appendChild(tagsContainer)

					for (let i in post.tags) {
						let tag = document.createElement("div")
							tag.className = "card-tag"
							tag.innerText = post.tags[i]
							tag.setAttribute("data-value", post.tags[i])
							tag.addEventListener(TRIGGERS.click, clickTag)
						tagsContainer.appendChild(tag)
					}
			} catch (error) {console.log(error)}
		}

	/* displayPost */
		function displayPost(post) {
			try {
				// hide error & loading
					ELEMENTS.loading.removeAttribute("spin")
					ELEMENTS.error.removeAttribute("visible")

				// clear cards & post
					ELEMENTS.post.innerHTML = ""
					ELEMENTS.cards.innerHTML = ""

				// browser title
					ELEMENTS.title.innerText = (post.title ? (post.title + " | ") : "") + CONSTANTS.blogTitle

				// build header
					let header = document.createElement("div")
						header.className = "post-header"
					ELEMENTS.post.appendChild(header)

					// title
						let title = document.createElement("h1")
							title.className = "post-title"
							title.innerText = post.title || ""
						header.appendChild(title)

					// date
						let date = document.createElement("p")
							date.className = "post-date"
							date.innerText = new Date(post.date).toLocaleDateString()
						header.appendChild(date)

					// tags
						let tagsContainer = document.createElement("div")
							tagsContainer.className = "post-tags"
						header.appendChild(tagsContainer)

						for (let i in post.tags) {
							let tag = document.createElement("div")
								tag.className = "post-tag"
								tag.innerText = post.tags[i]
								tag.setAttribute("data-value", post.tags[i])
								tag.addEventListener(TRIGGERS.click, clickTag)
							tagsContainer.appendChild(tag)
						}

				// body
					let body = document.createElement("div")
						body.className = "post-body"
					ELEMENTS.post.appendChild(body)

					// loop through
						for (let i in post.body) {
							let block = document.createElement("div")
								block.className = "post-block"
							body.appendChild(block)

							// image
								if (post.body[i].type == "image") {
									let image = document.createElement("img")
										image.className = "post-image"
										image.src = post.body[i].content
									block.appendChild(image)
									continue
								}

							// heading
								if (post.body[i].type.includes("heading")) {
									let heading = document.createElement("h" + post.body[i].type.replace("heading", ""))
										heading.className = "post-heading"
										heading.innerHTML = processMarkdown(post.body[i].content)
									block.appendChild(heading)
									continue
								}

							// content
								// replace markdown
									let paragraph = document.createElement("p")
										paragraph.className = "post-paragraph"
										paragraph.innerHTML = processMarkdown(post.body[i].content)
									block.appendChild(paragraph)
						}

				// scroll to top of page
					window.scrollTo(0, 0)
			} catch (error) {console.log(error)}
		}
