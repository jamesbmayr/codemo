/*** globals ***/
	/* triggers */
		const TRIGGERS = {
			input: "input",
			click: "click",
			resize: "resize",
			back: "popstate",
			scroll: "scroll"
		}

	/* constants */
		const CONSTANTS = {
			allowedFilters: ["id", "tags", "since", "before", "search"],
			databaseURL: "https://script.google.com/macros/s/AKfycbyHy7DBOWPbT6oFxCXasuhGcRbwnflGknq6KZGdOVtCWYIiesXJsjnF-xDVVsGZFeDDqQ/exec",
			waitTime: 1000,
			scrollWait: 10,
			breakpoints: [0, 750, 1050, 1400],
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
			columns: (window.innerWidth > CONSTANTS.breakpoints[3] ? 4 : window.innerWidth > CONSTANTS.breakpoints[2] ? 3 : window.innerWidth > CONSTANTS.breakpoints[1] ? 2 : 1),
			cache: [],
			cachedFilters: [],
			filters: {},
			index: 0,
			request: null,
			searchWait: null,
			homeWait: null
		}

/*** onload ***/
	/* loadBlog */
		loadBlog(true)
		window.addEventListener(TRIGGERS.back, loadBlog)
		function loadBlog(event) {
			try {
				// hash & params
					const hash = detectHash()
					const queryParams = detectQueryParams()
						queryParams.id = hash
					updateFilters(queryParams, event ? true : false)

				// update display
					updateDisplay()
			} catch (error) {console.log(error)}
		}

	/* detectHash */
		function detectHash() {
			try {
				// get hash
					const hash = (window.location.hash || "").slice(1).trim()

				// no hash
					if (!hash || !hash.length) {
						return null
					}

				// clean
					return hash.replace(/\s/g, "-").toLowerCase()
			} catch (error) {console.log(error)}
		}

	/* detectQueryParams */
		function detectQueryParams() {
			try {
				// get query string
					const queryString = (window.location.search || "").slice(1).trim()

				// no query string
					if (!queryString || !queryString.length) {
						return {}
					}

				// parse
					const queryParams = {}
					const queryStringList = queryString.split("&")
					for (let i in queryStringList) {
						const pair = queryStringList[i].split("=")
						const key = pair[0].trim().toLowerCase()
						if (key == "tags") {
							queryParams[key] = pair[1].trim().split(/,\s?/g) || []
						}
						else {
							queryParams[key] = pair[1].trim() || null
						}
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
					const previousColumns = STATE.columns
					STATE.columns = (window.innerWidth > CONSTANTS.breakpoints[3] ? 4 : window.innerWidth > CONSTANTS.breakpoints[2] ? 3 : window.innerWidth > CONSTANTS.breakpoints[1] ? 2 : 1)

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

				// update filters / search
					STATE.searchWait = setTimeout(function() {
						// update filters
							updateFilters(searchString ? {search: searchString} : null)

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
					const tagValue = event.target.getAttribute("data-value")

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
					const card = event.target.closest(".card")
					const id = card.getAttribute("href").slice(1)

				// meta key
					if (event.metaKey) {
						const newURL = new URL(window.location.href)
							newURL.search = ""
							newURL.hash = id
						window.open(newURL, "_blank")
						return
					}

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

	/* clickGalleryButton */
		function clickGalleryButton(button) {
			try {
				// type of button
					const direction = button.className.replace("gallery-", "")

				// parent
					const gallery = button.closest(".gallery")
					let position = Number(gallery.getAttribute("data-position")) || 0

				// list of images
					const images = Array.from(gallery.querySelectorAll("img"))

				// unselect image
					images[position].removeAttribute("selected")

				// change position
					if (direction == "left") {
						position -= 1
						if (position < 0) {
							position = images.length - 1
						}
					}
					else if (direction == "right") {
						position += 1
						if (position >= images.length) {
							position = 0
						}
					}
					gallery.setAttribute("data-position", position)

				// select image
					images[position].setAttribute("selected", true)
			} catch (error) {console.log(error)}
		}

/*** tools ***/
	/* updateFilters */
		function updateFilters(parameters, ignoreHistory) {
			try {
				// reset filter
					STATE.filters = {}
					STATE.index = 0

				// loop through parameters
					for (let i in parameters) {
						if (CONSTANTS.allowedFilters.includes(i)) {
							if (parameters[i]) {
								STATE.filters[i] = parameters[i]
							}
							else if (STATE.filters[i]) {
								delete STATE.filters[i]
							}
						}
					}

				// build url
					let currentURL = new URL(window.location.href)
						currentURL.search = ""
						currentURL.hash = ""

					let queryParamsList = []
					for (let i in STATE.filters) {
						if (i == "id") {
							currentURL = currentURL + "#" + STATE.filters[i]
							break
						}
						queryParamsList.push(i + "=" + STATE.filters[i])
					}
					
					if (queryParamsList && queryParamsList.length) {
						currentURL = currentURL + "?" + queryParamsList.join("&")
					}

				// update search
					ELEMENTS.search.value = STATE.filters.search || (STATE.filters.tags ? STATE.filters.tags.join(", ") : "")
				
				// update url
					if (ignoreHistory) {
						return
					}
					window.history.pushState({}, "", currentURL)
			} catch (error) {console.log(error)}
		}

	/* requestPosts */
		function requestPosts(callback, ignoreSpinner) {
			try {
				// already requesting
					if (STATE.request) {
						return
					}

				// build url
					let url = CONSTANTS.databaseURL + "?index=" + STATE.index
					if (Object.keys(STATE.filters).length) {
						let queryParamsList = []
						for (let i in STATE.filters) {
							queryParamsList.push(i + "=" + STATE.filters[i])
						}
						url = url + "&" + queryParamsList.join("&")
					}

				// loading spinner
					ELEMENTS.loading.setAttribute("spin", true)

				// request
					STATE.request = url
					fetch(url, {method: "GET"})
					.then(function(response){ return response.json() })
					.then(function(data) {
						receivePosts(url, data)
						callback()
					})
			} catch (error) {console.log(error)}
		}

	/* receivePosts */
		function receivePosts(url, data) {
			try {
				// clear pending request
					if (STATE.request == url) {
						STATE.request = null
					}

				// get posts
					const posts = data.posts || []
					const filters = data.filters || {}
					const nextIndex = data.nextIndex || 0

				// loading spinner
					ELEMENTS.loading.removeAttribute("spin")

				// add posts to cache
					for (let i in posts) {
						// this one
							const newPost = posts[i]

						// already cached ?
							const cachedPost = STATE.cache.find(function(c) {
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
					const stringifiedFilter = JSON.stringify(filters)
					if (!STATE.cachedFilters.includes(stringifiedFilter)) {
						STATE.cachedFilters.push(stringifiedFilter)
					}

				// more?
					STATE.index = nextIndex || null
					loadMoreIfScrolled()
			} catch (error) {console.log(error)}
		}

	/* processMarkdown */
		function processMarkdown(html) {
			try {
				// wrappers
					// list item
						if (html.indexOf("* ") == 0) {
							html = "<li>" + html.replace(/\*\s?/, "") + "</li>"
						}

					// blockquote
						else if (html.indexOf(">>>>") == 0) {
							html = "<blockquote><blockquote><blockquote><blockquote>" + html.replace(/>>>>\s?/, "") + "</blockquote></blockquote></blockquote></blockquote>"
						}
						else if (html.indexOf(">>>") == 0) {
							html = "<blockquote><blockquote><blockquote>" + html.replace(/>>>\s?/, "") + "</blockquote></blockquote></blockquote>"
						}
						else if (html.indexOf(">>") == 0) {
							html = "<blockquote><blockquote>" + html.replace(/>>\s?/, "") + "</blockquote></blockquote>"
						}
						else if (html.indexOf(">") == 0) {
							html = "<blockquote>" + html.replace(/>\s?/, "") + "</blockquote>"
						}

					// headers
						else if (html.indexOf("######") == 0) {
							html = "<h6>" + html.replace(/^######\s?/, "") + "</h6>"
						}
						else if (html.indexOf("#####") == 0) {
							html = "<h5>" + html.replace(/^#####\s?/, "") + "</h5>"
						}
						else if (html.indexOf("####") == 0) {
							html = "<h4>" + html.replace(/^####\s?/, "") + "</h4>"
						}
						else if (html.indexOf("###") == 0) {
							html = "<h3>" + html.replace(/^###\s?/, "") + "</h3>"
						}
						else if (html.indexOf("##") == 0) {
							html = "<h2>" + html.replace(/^##\s?/, "") + "</h2>"
						}
						else if (html.indexOf("#") == 0) {
							html = "<h1>" + html.replace(/^#\s?/, "") + "</h1>"
						}

				// lines & newlines
					html = html.replace(/\n/g, "<br>")
					html = html.replace(/\-\-\-/g, "<hr>")

				// inline components
					// code
						const codeMatches = html.match(/\`([^\`]*?)\`/g)
						if (codeMatches && codeMatches.length) {
							for (let i in codeMatches) {
								const match = codeMatches[i]
								html = html.replace(match, "<code>" + match.replace(/\`/g, "").replace(/\</g, "&lt;").replace(/\>/g, "&gt;") + "</code>")
							}
						}

					// bold
						const boldMatches = html.match(/\*\*([^\*\*]*?)\*\*/g)
						if (boldMatches && boldMatches.length) {
							for (let i in boldMatches) {
								const match = boldMatches[i]
								html = html.replace(match, "<b>" + match.replace(/\*\*/g, "") + "</b>")
							}
						}

					// italic
						const italicMatches = html.match(/\_([^\_]*?)\_/g)
						if (italicMatches && italicMatches.length) {
							for (let i in italicMatches) {
								const match = italicMatches[i]
								html = html.replace(match, "<i>" + match.replace(/\_/g, "") + "</i>")
							}
						}

					// strikethrough
						const strikethroughMatches = html.match(/\~([^\~]*?)\~/g)
						if (strikethroughMatches && strikethroughMatches.length) {
							for (let i in strikethroughMatches) {
								const match = strikethroughMatches[i]
								html = html.replace(match, "<s>" + match.replace(/\~/g, "") + "</s>")
							}
						}

				// links
					// linked images
						const imageMatches = html.match(/\!\[[^\]]*?\]\([^)]*?\)/g)
						if (imageMatches && imageMatches.length) {
							for (let i in imageMatches) {
								const match = imageMatches[i]
								const text = match.match(/^\!\[(.*?)\]/)[1]
								const url  = match.match(/\]\((.*?)\)/)[1].replace(/\<hr\>/g, "---").replace(/\<code\>/g, "`").replace(/\<\/code\>/g, "`").replace(/\<b\>/g, "**").replace(/\<\/b\>/g, "**").replace(/\<i\>/g, "_").replace(/\<\/i\>/g, "_").replace(/\<s\>/g, "~").replace(/\<\/s\>/g, "~")
								html = html.replace(match, "<img alt='" + (text || "image") + "' src='" + url + "'>" + (text ? ("<figcaption>" + text + "</figcaption>") : ""))
							}
						}

					// links
						const linkMatches = html.match(/\[[^\]]*?\]\([^)]*?\)/g)
						if (linkMatches && linkMatches.length) {
							for (let i in linkMatches) {
								const match = linkMatches[i]
								const text = match.match(/^\[(.*?)\]/)[1]
								const url  = match.match(/\]\((.*?)\)/)[1].replace(/\<hr\>/g, "---").replace(/\<code\>/g, "`").replace(/\<\/code\>/g, "`").replace(/\<b\>/g, "**").replace(/\<\/b\>/g, "**").replace(/\<i\>/g, "_").replace(/\<\/i\>/g, "_").replace(/\<s\>/g, "~").replace(/\<\/s\>/g, "~")
								html = html.replace(match, "<a href='" + url + "' target='_blank'>" + text + "</a>")
							}
						}

					// gallery
						const galleryMatches = html.match(/\<gallery\>.*?\<\/gallery\>/g)
						if (galleryMatches && galleryMatches.length) {
							for (let i in galleryMatches) {
								const match = galleryMatches[i]
								const beforeImages = "<div class='gallery' data-position='0'>"
								const afterImages = "<button class='gallery-left' onclick='clickGalleryButton(this)'>&uarr;</button><button class='gallery-right' onclick='clickGalleryButton(this)'>&uarr;</button></div>"
								html = html.replace(match, beforeImages + match.replace("<gallery>", "").replace("</gallery>", "").replace("<img", "<img selected='true'") + afterImages)
							}
						}

				// return
					return html || ""
			} catch (error) {console.log(error)}
		}

	/* loadMoreIfScrolled */
		window.addEventListener(TRIGGERS.scroll, loadMoreIfScrolled)
		function loadMoreIfScrolled() {
			try {
				setTimeout(function() {
					// no more
						if (!STATE.index) {
							return
						}

					// scrollToTop not in view
						if (ELEMENTS.scrollToTop.getBoundingClientRect().y > window.innerHeight) {
							return
						}

					// request more
						requestPosts(updateDisplay)
				}, 0)
			} catch (error) {console.log(error)}
		}

/*** display ***/
	/* updateDisplay */
		function updateDisplay() {
			try {
				// stringified filter
					const stringifiedFilter = JSON.stringify(STATE.filters)

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
							const post = STATE.cache.find(function(c) {
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
						const posts = STATE.cache.filter(function(c) {
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
					const columns = []
					for (let c = 0; c < STATE.columns; c++) {
						const column = document.createElement("div")
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
			} catch (error) {console.log(error)}
		}

	/* displayCard */
		function displayCard(post, column) {
			try {
				// build card
					const card = document.createElement("a")
						card.className = "card"
						card.href = "#" + post.id
						card.addEventListener(TRIGGERS.click, clickCard)
					column.appendChild(card)

				// image
					if (post.cardImage) {
						const image = document.createElement("img")
							image.className = "card-image"
							image.src = post.cardImage
						card.appendChild(image)
					}

				// title
					const title = document.createElement("h2")
						title.className = "card-title"
						title.innerText = post.title || ""
					card.appendChild(title)

				// date
					const date = document.createElement("p")
						date.className = "card-date"
						date.innerText = new Date(post.date).toLocaleDateString()
					card.appendChild(date)

				// summary
					const summary = document.createElement("p")
						summary.className = "card-summary"
						summary.innerText = post.cardText || ""
					card.appendChild(summary)

				// tags
					const tagsContainer = document.createElement("div")
						tagsContainer.className = "card-tags"
					card.appendChild(tagsContainer)

					for (let i in post.tags) {
						const tag = document.createElement("div")
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
					const header = document.createElement("div")
						header.className = "post-header"
					ELEMENTS.post.appendChild(header)

					// title
						const title = document.createElement("h1")
							title.className = "post-title"
							title.innerText = post.title || ""
						header.appendChild(title)

					// date
						const date = document.createElement("p")
							date.className = "post-date"
							date.innerText = new Date(post.date).toLocaleDateString()
						header.appendChild(date)

					// tags
						const tagsContainer = document.createElement("div")
							tagsContainer.className = "post-tags"
						header.appendChild(tagsContainer)

						for (let i in post.tags) {
							const tag = document.createElement("div")
								tag.className = "post-tag"
								tag.innerText = post.tags[i]
								tag.setAttribute("data-value", post.tags[i])
								tag.addEventListener(TRIGGERS.click, clickTag)
							tagsContainer.appendChild(tag)
						}

				// body
					const body = document.createElement("div")
						body.className = "post-body"
					ELEMENTS.post.appendChild(body)

					// loop through
						for (let i in post.body) {
							const block = document.createElement("div")
								block.className = "post-block"
							body.appendChild(block)

							// image
								if (post.body[i].type == "image") {
									const image = document.createElement("img")
										image.src = post.body[i].content
									block.appendChild(image)
									continue
								}

							// content
								// replace markdown
									block.innerHTML = processMarkdown(post.body[i].content)
						}

				// scroll to top of page
					setTimeout(function() {
						window.scrollTo(0, 0)
					}, CONSTANTS.scrollWait)
			} catch (error) {console.log(error)}
		}
