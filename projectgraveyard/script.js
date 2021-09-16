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
				overlay: document.querySelector("#gallery-overlay-form")
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
			projectgraveyard: {
				name: "Project Graveyard",
				date: "September 2021",
				idea: "Some projects work out, and they go live at <a href='https://jamesmayr.com' target='_blank'>jamesmayr.com</a>. Other projects die an early death.",
				death: "And thus, this gallery: a graveyard of ideas."
			},
			paypool: {
				name: "PayPool",
				date: "June 2021",
				idea: "This was a Slackbot for creating a short-term crowdfunding campaign within your workspace. Contributors don't see one another's pledges, and if the target is met, it's split as an equal percentage of everyone's max pledge.",
				death: "The way I was using the Slack bot system prevented messages outside of a 30-minute window, which is far too short a timeframe. This project lives on as a standalone web-app called <a href='https://jamesmayr.com/fundfuser' target='_blank'>FundFuser</a>."
			},
			textbasedrpg: {
				name: "Text-Based RPG",
				date: "June 2020",
				idea: "My friend Alex Berg - who I had collaborated with on <a href='https://jamesmayr.com/rpsrpg' target='_blank'>RPS RPG</a> - and I attempted to learn Unity and build a simple text-based exploration-adventure game.",
				death: "As it turns out, Unity is not so simple, nor is coding in C#. We went through some tutorials and successfully made a <a href='https://jamesmayr.com/tictactoe' target='_blank'>tic-tac-toe clone</a>... and then moved on to other projects."
			},
			jobsearchtracker: {
				name: "Job Search Tracker",
				date: "April 2019",
				idea: "I wrote a <a href='https://www.themuse.com/advice/job-search-spreadsheet-track-application' target='_blank'>short article</a> for The Muse about tracking your job applications, follow-up emails, and interviews, and created this corresponding spreadsheet template.",
				death: "This was the second of only <a href='https://www.themuse.com/author/james-mayr' target='_blank'>two articles</a> I'd write for The Muse. But I did end up using this spreadsheet template when applying for my next role!"
			},
			themusereflekts: {
				name: "The Muse Reflekts",
				date: "August 2018",
				idea: "My former employer, The Muse, used a proprietary system, Reflektive, for co-worker shout-outs via Slack. For a Hack Day project, I used the Reflektive API to build a dynamic slideshow of the latest shout-outs, displayed on the office kitchen TV.",
				death: "When I left the company, I did provide instructions for maintaining this tool. For all I know, it's still going strong!"
			},
			gamestimeline: {
				name: "GamesTimeline",
				date: "July 2018",
				idea: "Using a free video game API, this tool compared all the games given a search term and graphed them across release year and community rating.",
				death: "They say all good APIs come to an end... this one was bought out by Twitch."
			},
			bookvsmovie: {
				name: "Book vs. Movie",
				date: "September 2017",
				idea: "Using two APIs - GoodReads and IMDB - my friend <a href='https://maximpekarsky.com' target='_blank'>Max Pekarsky</a> and I built a tool that answered the age-old question: which was better, the book or the movie?",
				death: "As you might imagine, these APIs eventually went away, leaving nothing but an empty shell of a website."
			},
			pickupnotes: {
				name: "Pickup Notes",
				date: "July 2017",
				idea: "Together with Alex Berg, Ayelet Kershenbaum, and <a href='https://www.youtube.com/dannymusic' target='_blank'>Danny Romberger</a>, we set out to make a podcast about music - how it works, where it comes from, and why it matters. The name \"Noteworthy\" was taken, so we eventually switched to Pickup Notes.",
				death: "After recording a few sample episodes of us basically chatting about some topic in music, we realized that we had no idea what we were doing... and didn't have the time to do it anyway."
			},
			wavestacker: {
				name: "waveStacker",
				date: "October 2017",
				idea: "All sounds can be split into a near-infinite set of simple sine waves, at least in theory. I built this javascript demo a music/code hackathon to test that theory.",
				death: "I suppose it works, in the technical sense... but not very well!"
			},
			harmony: {
				name: "Harmony",
				date: "January 2017",
				idea: "At the NYC Monthly Music Hackathon, I pair-programmed with some complete strangers and came out with a working web music app that let anyone in the audience play along on their phones, all synchronized to the beat via system clocks.",
				death: "This project was a huge success! It just never went anywhere, and I sadly never met up with those coders again."
			},
			ensembler: {
				name: "Ensembler",
				date: "August 2016",
				idea: "The ideas here ranged from \"the LinkedIn-Asana for artists\" to \"the Foursquare-OpenTable for music businesses\" to \"the Crunch-Meetup for musicians\" and eventually to a livesteam experience app called \"Beacon\".",
				death: "I was a little all over the place on this one. I have no idea how to run any of these businesses, let alone all of them at once."
			},
			bossfight: {
				name: "Boss Fight",
				date: "June 2016",
				idea: "My friend <a href='https://maximpekarsky.com' target='_blank'>Max Pekarsky</a> and I collaborated on a fantasy-themed cooperative turn-based web-game - a bunch of fighters working together against a dragon.",
				death: "It worked! But we decided to stop maintaining it (and stop coding in PHP)."
			},
			sharewaves: {
				name: "ShareWaves",
				date: "September 2015",
				idea: "My first big coding project, ShareWaves was intended to be a creative portfolio profile site, and quickly turned into a link-sharing platform where you clicked through articles, images, webcomics, and videos shared (anonymously) by your friends.",
				death: "It was good fun for a little while, but low overall usage led me to shut it down."
			},
			minimalistgames: {
				name: "Minimalist Games",
				date: "July 2014",
				idea: "For a short time, there was Minimalist Games, a proposal to create a set of simple, print-and-play tabletop games using a finite set of materials and a predefined design aesthetic. The hope was to inspire other game-makers someday.",
				death: "Too minimal for my fellow game designer friends, Minimalist eventually made way for <a href='https://jamesmayr.com/dreamhatcher' target='_blank'>DreamHatcher</a>, and from that, <a href='https://jamesmayr.com/chalice' target='_blank'>Chalice</a>."
			},
			stormfront: {
				name: "Stormfront",
				date: "January 2013",
				idea: "In this tabletop board game, you play as a storm, raining across Europe and out-competing your opponent storms. I made it in Paintbrush, printed it at home, and got some fishbowl rocks for pieces.",
				death: "I still have the game but the sheer number of components made it an unviable option for my <a href='https://www.kickstarter.com/projects/jamesbmayr/chalice-the-card-game' target='_blank'>Kickstarter</a> aspirations."
			},
			linklook: {
				name: "LinkLook",
				date: "February 2012",
				idea: "Back before Word Lens and Google Translate's augmented reality text translation, I envisioned a mobile app that turned your phone camera into a text detection system, extracting clickable links, phone numbers, and more from the real world.",
				death: "I had no coding experience whatsoever and no concept of what it would take to make this happen. But I am comforted that someone out there had a similar idea, and now cameras can actually do this."
			},
			sounddrawn: {
				name: "Sounddrawn",
				date: "December 2011",
				idea: "The beginning of my web development was using drag-and-drop editors like Wix, mostly to make a music website for my custom compositions. I don't remember why I called it sounddrawn, but I thoroughly enjoyed redesigning it every few years.",
				death: "Once I learned HTML, CSS, and Javascript, I built a <a href='https://jamesmayr.com/music/?track=sounddrawn' target='_blank'>music site</a> from scratch."
			},
			thoroughthink: {
				name: "Thorough Think",
				date: "November 2011",
				idea: "After taking some classes in rhetoric and logic, I naively decided what the world needed was a forum for bold opinions and back-and-forth arguments.",
				death: "Looking at these designs now, I'm sure I could actually build this. But... that's okay."
			},
			soulsofwar: {
				name: "Souls of War",
				date: "December 2010",
				idea: "I thought this indie game being built by fellow Binghamton University students (led by Alejandro G. Carlstein Ramos Mejia) would be my way into the video game music business, so I composed <a href='https://jamesmayr.com/music/?track=soulsofwartheme' target='_blank'>some soundtracks</a> for each of the main characters.",
				death: "As far as I can tell, the rest of the team lost interest, and this game never got off the ground."
			},
			lamppostsoftheworld: {
				name: "Lampposts of the World",
				date: "August 2006",
				idea: "I was fortunate enough to travel to several countries in my teen years, and unfortunate enough to take photos of lampposts obscuring famous world landmarks. I compiled them into an album and invited others to share their bad shots too.",
				death: "I guess it was kind of funny for a while, but it just got old."
			},
			sparklegalaxyadventures: {
				name: "Sparkle Galaxy Adventures",
				date: "2000",
				idea: "When I was a kid, all the grown-ups played real RPGs, but I combined Star Wars, Pokémon, and other favorite franchises into a surprisingly robust game world / role-playing game rule system that entertained me and some friends for years.",
				death: "We grew out of it eventually, but, still dissatisfied by the labyrinthine algebra of traditional RPGs, I created a pen-and-paper rule system (and, more recently, web app) called <a href='https://jamesmayr.com/adventure' target='_blank'>Adventure</a>."
			}
		}

/*** gallery ***/
	/* buildGallery */
		buildGallery()
		function buildGallery() {
			try {
				// loop through projects
					for (let i in PROJECTS) {
						// create slide
							let slide = document.createElement("div")
								slide.className = "slide"
								slide.id = i
							ELEMENTS.gallery.appendChild(slide)
							ELEMENTS.slides[slide.id] = slide

						// create image
							let image = document.createElement("div")
								image.className = "slide-image"
								image.style.backgroundImage = "url(images/" + i + ".png)"
								image.setAttribute("title", PROJECTS[i].name)
							slide.appendChild(image)

						// create text
							let text = document.createElement("div")
								text.className = "slide-text"
							slide.appendChild(text)

						// create name
							let nameOuter = document.createElement("div")
								nameOuter.className = "slide-name-outer"
							text.appendChild(nameOuter)

							let nameInner = document.createElement("h3")
								nameInner.className = "slide-name-inner"
								nameInner.innerText = PROJECTS[i].name
							nameOuter.appendChild(nameInner)

							let date = document.createElement("div")
								date.className = "slide-name-date"
								date.innerText = PROJECTS[i].date
							nameOuter.appendChild(date)

						// create description
							let description = document.createElement("div")
								description.className = "slide-description"
								description.innerHTML = (PROJECTS[i].idea ? ("<p>" + PROJECTS[i].idea + "</p>") : "") + (PROJECTS[i].death ? ("<h4>...</h4>" + PROJECTS[i].death + "</p>") : "")
							text.appendChild(description)

						// add to overlay
							let overlayForm = document.createElement("form")
								overlayForm.setAttribute("project", slide.id)
								overlayForm.setAttribute("action", "javascript:;")
								overlayForm.setAttribute("method", "post")
								overlayForm.addEventListener(TRIGGERS.submit, selectFromOverlay)
							ELEMENTS.overlay.list.appendChild(overlayForm)

							let overlayButton = document.createElement("button")
								overlayButton.className = "overlay-button"
								overlayButton.setAttribute("title", PROJECTS[i].name)
								overlayButton.style.backgroundImage = "url(images/" + i + ".png)"
							overlayForm.appendChild(overlayButton)
					}

				// then jump to slide
					setTimeout(function() {
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
					if (id) {
						id = id.toLowerCase().replace(/\s/g, "")
					}
					else {
						id = Object.keys(ELEMENTS.slides)[0]
					}

				// find project
					if (!ELEMENTS.slides[id]) {
						return
					}

				// offset
					if (offset) {
						// get offset index
							let keys = Object.keys(ELEMENTS.slides)
							let idIndex = keys.indexOf(id)
							let offsetIndex = idIndex + offset
						
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
					if (window.location.hash !== "#" + id) {
						window.location.hash = "#" + id
					}

				// stop sliding when scrolled
					setTimeout(function() {
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
					let styles = window.getComputedStyle(ELEMENTS.gallery)
					let width = Number(styles.width.replace("px", ""))
					let scrollAmount = ELEMENTS.gallery.scrollLeft
					let index = scrollAmount / width

				// still scrolling
					if (index % 1 !== 0) {
						return
					}

				// get id
					let id = Object.keys(ELEMENTS.slides)[index]

				// set hash
					window.location.hash = "#" + id
			} catch (error) {console.log(error)}
		}

/*** overlay ***/
	/* openOverlay */
		ELEMENTS.controls.overlay.addEventListener(TRIGGERS.submit, openOverlay)
		function openOverlay() {
			try {
				// already open?
					let visible = ELEMENTS.overlay.element.getAttribute("visible")
					if (visible) {
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
