/*** globals ***/
	/* triggers */
		const TRIGGERS = {
			click: "click",
			submit: "submit",
			scroll: "scroll"
		}

	/* elements */
		const ELEMENTS = {
			gallery: document.querySelector("#gallery"),
			controls: {
				left: document.querySelector("#gallery-left-form"),
				right: document.querySelector("#gallery-right-form"),
				overlay: document.querySelector("#gallery-overlay-form"),
				play: document.querySelector("#gallery-play-form")
			},
			overlay: {
				element: document.querySelector("#overlay"),
				close: document.querySelector("#overlay-close-form"),
				list: document.querySelector("#overlay-list-inner")
			},
			slides: [],
			loaded: false,
			sliding: false
		}

	/* projects */
		const PROJECTS = {
			"sound-horizon": {
				name: "sound horizon",
				image: "sound-horizon.jpg",
				date: "10/28/2023",
				description: ""
			},
			"lake-in-autumn": {
				name: "lake in autumn",
				image: "lake-in-autumn.jpg",
				date: "10/28/2023",
				description: ""
			},
			"lake-in-summer": {
				name: "lake in summer",
				image: "lake-in-summer.jpg",
				date: "8/6/2023",
				description: ""
			},
			"lake-in-spring": {
				name: "lake in spring",
				image: "lake-in-spring.jpg",
				date: "5/5/2023",
				description: ""
			},
			"lake-in-winter": {
				name: "lake in winter",
				image: "lake-in-winter.jpg",
				date: "2/18/2023",
				description: ""
			},
			"upon-reflection": {
				name: "upon reflection",
				image: "upon-reflection.jpg",
				date: "9/18/2022",
				description: ""
			},
			"beach-sunset": {
				name: "beach sunset",
				image: "beach-sunset.png",
				date: "6/25/22",
				description: ""
			},
			"forest-stars": {
				name: "forest stars",
				image: "forest-stars.jpg",
				date: "6/25/22",
				description: ""
			},
			"water-fall": {
				name: "water fall",
				image: "water-fall.jpg",
				date: "5/2/22",
				description: ""
			},
			"lake-mountain": {
				name: "lake mountain",
				image: "lake-mountain.jpg",
				date: "12/11/2021",
				description: ""
			},
			"full-moon-by-the-lakeshore": {
				name: "full moon by the lakeshore",
				image: "full-moon-by-the-lakeshore.jpg",
				date: "12/9/2020",
				description: ""
			}
		}

/*** gallery ***/
	/* buildGallery */
		buildGallery()
		function buildGallery() {
			try {
				// loop through projects
					for (const id in PROJECTS) {
						// get project
							const project = PROJECTS[id]

						// create slide
							const slide = document.createElement("div")
								slide.className = "slide"
								slide.id = id
							ELEMENTS.gallery.appendChild(slide)
							ELEMENTS.slides[id] = slide

						// create image
							const image = document.createElement("div")
								image.className = "slide-image"
								image.style.backgroundImage = `url(images/${project.image})`
								image.setAttribute("title", project.name)
							slide.appendChild(image)

						// create text
							const text = document.createElement("div")
								text.className = "slide-text"
							slide.appendChild(text)

						// create name
							const nameOuter = document.createElement("div")
								nameOuter.className = "slide-name-outer"
							text.appendChild(nameOuter)

							const nameInner = document.createElement("h3")
								nameInner.className = "slide-name-inner"
								nameInner.innerText = project.name
							nameOuter.appendChild(nameInner)

							const date = document.createElement("div")
								date.className = "slide-name-date"
								date.innerText = project.date
							nameOuter.appendChild(date)

						// create description
							const description = document.createElement("div")
								description.className = "slide-description"
								description.innerHTML = project.description?.length ? `<p>${project.description.split("\n").join("</p><p>")}</p>` : ""
							text.appendChild(description)

						// add to overlay
							const overlayForm = document.createElement("form")
								overlayForm.setAttribute("project", id)
								overlayForm.setAttribute("action", "javascript:;")
								overlayForm.setAttribute("method", "post")
								overlayForm.addEventListener(TRIGGERS.submit, selectFromOverlay)
							ELEMENTS.overlay.list.appendChild(overlayForm)

							const overlayButton = document.createElement("button")
								overlayButton.className = "overlay-button"
								overlayButton.setAttribute("title", project.name)
								overlayButton.style.backgroundImage = `url(images/${project.image})`
							overlayForm.appendChild(overlayButton)
					}

				// then jump to slide
					setTimeout(() => {
						ELEMENTS.loaded = true
						jumpToSlide()
					}, 1000)
			} catch (error) {console.log(error)}
		}

/*** gallery ***/
	/* jumpToSlide */
		function jumpToSlide(id, offset) {
			try {
				// get id
					id = id || (window.location.hash ? window.location.hash.slice(1) : null)

				// get project
					id = id ? id.toLowerCase().replace(/\s/g, "") : Object.keys(ELEMENTS.slides)[0]

				// find project
					if (!ELEMENTS.slides[id]) {
						return
					}

				// offset
					if (offset) {
						// get offset index
							const keys = Object.keys(ELEMENTS.slides)
							let offsetIndex = keys.indexOf(id) + offset
						
						// adjust for loop cycling
							if (offsetIndex >= keys.length) {
								offsetIndex = 0
							}
							if (offsetIndex < 0) {
								offsetIndex = keys.length - 1
							}

						// get that project
							id = keys[offsetIndex]
					}

				// scroll into view
					ELEMENTS.sliding = true
					ELEMENTS.slides[id].scrollIntoView({behavior: "smooth", block: "start", inline: "center"})

				// set hash if not set
					if (window.location.hash !== `#${id}`) {
						window.location.hash = `#${id}`
					}

				// stop sliding when scrolled
					setTimeout(() => {
						ELEMENTS.sliding = false
					}, 200)
			} catch (error) {console.log(error)}
		}

	/* slideLeft */
		ELEMENTS.controls.left.addEventListener(TRIGGERS.submit, slideLeft)
		function slideLeft() {
			try {
				// jump at offset - 1
					jumpToSlide(null, -1)
			} catch (error) {console.log(error)}
		}

	/* slideRight */
		ELEMENTS.controls.right.addEventListener(TRIGGERS.submit, slideRight)
		function slideRight() {
			try {
				// jump at offset + 1
					jumpToSlide(null, 1)
			} catch (error) {console.log(error)}
		}

	/* swipeSlides */
		ELEMENTS.gallery.addEventListener(TRIGGERS.scroll, swipeSlides)
		function swipeSlides(event) {
			try {
				// loaded
					if (!ELEMENTS.loaded) {
						return
					}

				// sliding
					if (ELEMENTS.sliding) {
						return
					}

				// get scroll amount
					const width = Number(window.getComputedStyle(ELEMENTS.gallery).width.replace("px", ""))
					const scrollAmount = ELEMENTS.gallery.scrollLeft
					const index = scrollAmount / width

				// still scrolling
					if (index % 1 !== 0) {
						return
					}

				// get id
					const id = Object.keys(ELEMENTS.slides)[index]

				// set hash
					window.location.hash = `#${id}`
			} catch (error) {console.log(error)}
		}

	/* toggleSlideshow */
		ELEMENTS.controls.play.addEventListener(TRIGGERS.submit, toggleSlideshow)
		function toggleSlideshow() {
			try {
				// slideshow happening
					if (ELEMENTS.slideshow) {
						clearInterval(ELEMENTS.slideshow)
						delete ELEMENTS.slideshow
						ELEMENTS.controls.play.removeAttribute("slideshow")
						return
					}

				// start slideshow
					ELEMENTS.controls.play.setAttribute("slideshow", true)
					ELEMENTS.slideshow = setInterval(slideRight, 5000) // ms
			} catch (error) {console.log(error)}
		}

/*** overlay ***/
	/* openOverlay */
		ELEMENTS.controls.overlay.addEventListener(TRIGGERS.submit, openOverlay)
		function openOverlay() {
			try {
				// already open?
					if (ELEMENTS.overlay.element.getAttribute("visible")) {
						closeOverlay()
						return
					}

				// open
					ELEMENTS.overlay.element.setAttribute("visible", true)
			} catch (error) {console.log(error)}
		}

	/* closeOverlay */
		ELEMENTS.overlay.close.addEventListener(TRIGGERS.submit, closeOverlay)
		function closeOverlay() {
			try {
				// close
					ELEMENTS.overlay.element.removeAttribute("visible")
			} catch (error) {console.log(error)}
		}

	/* selectFromOverlay */
		function selectFromOverlay(event) {
			try {
				// close overlay
					ELEMENTS.overlay.element.removeAttribute("visible")

				// get id and jump
					jumpToSlide(event.target.getAttribute("project"))
			} catch (error) {console.log(error)}
		}
