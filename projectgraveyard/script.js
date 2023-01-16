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
				birth: "September 2021",
				death: "?",
				idea: "Some projects work out, and they go live at <a href='https://jamesmayr.com' target='_blank'>jamesmayr.com</a>. Other projects die an early death.",
				obituary: "And thus, this gallery: a graveyard of ideas."
			},
			paypool: {
				name: "PayPool",
				birth: "March 2021",
				death: "July 2021",
				idea: "This was a Slackbot for creating a short-term crowdfunding campaign within your workspace. Contributors don't see one another's pledges, and if the target is met, it's split as an equal percentage of everyone's max pledge.",
				obituary: "The way I was using the Slack bot system prevented messages outside of a 30-minute window, which is far too short a timeframe. This project lives on as a standalone web-app called <a href='https://jamesmayr.com/fundfuser' target='_blank'>FundFuser</a>."
			},
			textbasedrpg: {
				name: "Text-Based RPG",
				birth: "April 2020",
				death: "July 2020",
				idea: "My friend <a href='https://www.echotechaudio.com/' target='_blank'>Alex Berg</a> - who I had collaborated with on <a href='https://jamesmayr.com/rpsrpg' target='_blank'>RPS RPG</a> - and I attempted to learn Unity and build a simple text-based exploration-adventure game.",
				obituary: "As it turns out, Unity is not so simple, nor is coding in C#. We went through some tutorials and successfully made a <a href='https://jamesmayr.com/tictactoe' target='_blank'>tic-tac-toe clone</a>... and then moved on to other projects."
			},
			bluejay: {
				name: "bluejay",
				birth: "December 2019",
				death: "July 2021",
				idea: "An action-voice engine: whistle to turn words into smarthome commands, API searches, math, alarms, content fetching, and more. The <a href='https://github.com/jamesbmayr/bluejay' target='_blank'>bluejay project</a> served as my voice assistant at home.",
				obituary: "Everything works... I just didn't like talking to a robot out loud. I built <a href='https://jamesmayr.com/homecontroller' target='_blank'>homeController</a> instead."
			},
			jobsearchtracker: {
				name: "Job Search Tracker",
				birth: "April 2019",
				death: "November 2019",
				idea: "I wrote a <a href='https://www.themuse.com/advice/job-search-spreadsheet-track-application' target='_blank'>short article</a> for The Muse about tracking your job applications, follow-up emails, and interviews, and created this corresponding spreadsheet template.",
				obituary: "This was the second of only <a href='https://www.themuse.com/author/james-mayr' target='_blank'>two articles</a> I'd write for The Muse. But I did end up using this spreadsheet template when applying for my next role!"
			},
			themusereflekts: {
				name: "The Muse Reflekts",
				birth: "August 2018",
				death: "November 2019",
				idea: "My former employer, The Muse, used a proprietary system, Reflektive, for co-worker shout-outs via Slack. For a Hack Day project, I used the Reflektive API to build a dynamic slideshow of the latest shout-outs, displayed on the office kitchen TV.",
				obituary: "When I left the company, I did provide instructions for maintaining this tool. For all I know, it's still going strong!"
			},
			gamestimeline: {
				name: "GamesTimeline",
				birth: "July 2018",
				death: "October 2020",
				idea: "Using a free video game API, this tool compared all the games given a search term and graphed them across release year and community rating.",
				obituary: "They say all good APIs come to an end... this one was bought out by Twitch."
			},
			wavestacker: {
				name: "waveStacker",
				birth: "October 2017",
				death: "October 2019",
				idea: "All sounds can be split into a near-infinite set of simple sine waves, at least in theory. I built this javascript demo a music/code hackathon to test that theory.",
				obituary: "I suppose it worked, in the technical sense. But I was hosting it via rawgit, which eventually shut down."
			},
			bookvsmovie: {
				name: "Book vs. Movie",
				birth: "September 2017",
				death: "December 2020",
				idea: "Using two APIs - GoodReads and IMDB - my friend <a href='https://maximpekarsky.com' target='_blank'>Max Pekarsky</a> and I built a tool that answered the age-old question: which was better, the book or the movie?",
				obituary: "As you might imagine, these APIs eventually went away, leaving nothing but an empty shell of a website."
			},
			pickupnotes: {
				name: "Pickup Notes",
				birth: "May 2017",
				death: "September 2017",
				idea: "Together with <a href='https://www.echotechaudio.com/' target='_blank'>Alex Berg</a>, Ayelet Kershenbaum, and <a href='https://www.youtube.com/dannymusic' target='_blank'>Danny Romberger</a>, we set out to make a podcast about music - how it works, where it comes from, and why it matters. The name \"Noteworthy\" was taken, so we eventually switched to Pickup Notes.",
				obituary: "After recording a few sample episodes of us basically chatting about some topic in music, we realized that we had no idea what we were doing... and didn't have the time to do it anyway."
			},
			harmony: {
				name: "Harmony",
				birth: "January 2017",
				death: "October 2019",
				idea: "At the NYC Monthly Music Hackathon, I pair-programmed with some complete strangers and came out with a working web music app that let anyone in the audience play along on their phones, all synchronized to the beat via system clocks.",
				obituary: "This project was a huge success! It just never went anywhere, and I sadly never met up with those coders again. Also, it was hosted on rawgit, which eventually shut down."
			},
			ensembler: {
				name: "Ensembler",
				birth: "June 2016",
				death: "October 2016",
				idea: "The ideas here ranged from \"the LinkedIn-Asana for artists\" to \"the Foursquare-OpenTable for music businesses\" to \"the Crunch-Meetup for musicians\" and eventually to a livesteam experience app called \"Beacon\".",
				obituary: "I was a little all over the place on this one. I have no idea how to run any of these businesses, let alone all of them at once."
			},
			bossfight: {
				name: "Boss Fight",
				birth: "April 2016",
				death: "June 2016",
				idea: "My friend <a href='https://maximpekarsky.com' target='_blank'>Max Pekarsky</a> and I collaborated on a fantasy-themed cooperative turn-based web-game - a bunch of fighters working together against a dragon.",
				obituary: "It worked! But we decided to stop maintaining it (and stop coding in PHP)."
			},
			sharewaves: {
				name: "ShareWaves",
				birth: "August 2015",
				death: "December 2015",
				idea: "My first big coding project, ShareWaves was intended to be a creative portfolio profile site, and quickly turned into a link-sharing platform where you clicked through articles, images, webcomics, and videos shared (anonymously) by your friends.",
				obituary: "It was good fun for a little while, but low overall usage led me to shut it down."
			},
			fotofood: {
				name: "fotofood",
				birth: "June 2015",
				death: "July 2015",
				idea: "In the summer of 2015, I found myself looking for a career change. I was interested in tech and product, and I participated in an IDEO community challenge to help people make healthy eating decisions. This is a mock-up of a iPhone app that would track the nutrition of foods you ate.",
				obituary: "I had no intention of ever building this, and no notion of what it would take. I also did not win that IDEO challenge!"
			},
			minimalistgames: {
				name: "Minimalist Games",
				birth: "January 2014",
				death: "June 2014",
				idea: "For a short time, there was Minimalist Games, a proposal to create a set of simple, print-and-play tabletop games using a finite set of materials and a predefined design aesthetic. The hope was to inspire other game-makers someday.",
				obituary: "Too minimal for my fellow game designer friends, Minimalist eventually made way for <a href='https://jamesmayr.com/dreamhatcher' target='_blank'>DreamHatcher</a> and a ton of new game ideas... including <a href='https://jamesmayr.com/chalice' target='_blank'>Chalice</a>."
			},
			stormfront: {
				name: "Stormfront",
				birth: "January 2013",
				death: "February 2014",
				idea: "In this tabletop board game, you play as a storm, raining across Europe and out-competing your opponent storms. I made it in Paintbrush, printed it at home, and got some fishbowl rocks for pieces.",
				obituary: "I still have the game but the sheer number of components made it an unviable option for my <a href='https://www.kickstarter.com/projects/jamesbmayr/chalice-the-card-game' target='_blank'>Kickstarter</a> aspirations."
			},
			linklook: {
				name: "LinkLook",
				birth: "February 2012",
				death: "April 2012",
				idea: "Back before Word Lens and Google Translate's augmented reality text translation, I envisioned a mobile app that turned your phone camera into a text detection system, extracting clickable links, phone numbers, and more from the real world.",
				obituary: "I had no coding experience whatsoever and no concept of what it would take to make this happen. But I am comforted that someone out there had a similar idea, and now cameras can actually do this."
			},
			sounddrawn: {
				name: "Sounddrawn",
				birth: "December 2011",
				death: "May 2016",
				idea: "The beginning of my web development was using drag-and-drop editors like Wix, mostly to make a music website for my custom compositions. I don't remember why I called it sounddrawn, but I thoroughly enjoyed redesigning it every few years.",
				obituary: "Once I learned HTML, CSS, and Javascript, I built a <a href='https://jamesmayr.com/music/?track=sounddrawn' target='_blank'>music site</a> from scratch."
			},
			thoroughthink: {
				name: "Thorough Think",
				birth: "November 2011",
				death: "December 2011",
				idea: "After taking some classes in rhetoric and logic, I naively decided what the world needed was a forum for bold opinions and back-and-forth arguments.",
				obituary: "Looking at these designs now, I'm sure I could actually build this. But... that's okay."
			},
			playinggod: {
				name: "Playing God",
				birth: "June 2011",
				death: "September 2011",
				idea: "My fascination with mythology and love of Risk-like strategy games led to the creation of a board-and-card game in which you play as a pantheon of gods and goddesses, gaining power through conquest and trickery.",
				obituary: "I eventually redesigned this for <a href='https://jamesmayr.com/dreamhatcher' target='_blank'>DreamHatcher Games</a>, but this was only ever played twice. In the end, it was just more rules than fun."
			},
			soulsofwar: {
				name: "Souls of War",
				birth: "December 2010",
				death: "March 2011",
				idea: "I thought this indie game being built by fellow Binghamton University students (led by Alejandro G. Carlstein Ramos Mejia) would be my way into the video game music business, so I composed <a href='https://jamesmayr.com/music/?track=soulsofwartheme' target='_blank'>some soundtracks</a> for each of the main characters.",
				obituary: "As far as I can tell, the rest of the team lost interest, and this game never got off the ground."
			},
			completetakeover: {
				name: "Complete Takeover",
				birth: "May 2007",
				death: "August 2008",
				idea: "My first foray into reusable game components was a set of large colored Lego tiles in an adjustable 5-by-5 grid, with plenty of tokens for up to six players. For a few summers, I created new games of chance and skill for my friends and family to try, including classics like <a href='https://jamesmayr.com/diamondcheckers' target='_blank'>Diamond Checkers</a>.",
				obituary: "Depicted here is a <a href='https://jamesmayr.com/dreamhatcher' target='_blank'>DreamHatcher Games</a> recreation of the board; this concept of shared components carried through to other games and forms, and I left the Legos behind."
			},
			lamppostsoftheworld: {
				name: "Lampposts of the World",
				birth: "August 2006",
				death: "April 2015",
				idea: "I was fortunate enough to travel to several countries in my teen years, and unfortunate enough to take photos of lampposts obscuring famous world landmarks. I compiled them into an album and invited others to share their bad shots too.",
				obituary: "I guess it was kind of funny for a while, but it just got old."
			},
			dragoriumwar: {
				name: "Dragorium War",
				birth: "January 2004",
				death: "October 2004",
				idea: "Like every middleschool kid, I wrote an epic fantasy novel heavily inspired by Lord of the Rings and The Chronicles of Narnia - wizards, dragons, treasures, treaties, all of it. I even started an anthology with a few friends - more short stories set in the same world.",
				obituary: "I put this piece of prose in the past, but the world of the <a href='https://jamesmayr.com/firestormsea' target='_blank'>Firestorm Sea</a> grew into an epic poem, an <a href='https://jamesmayr.com/music?album=thedeathmakerssymphony' target='_blank'>orchestral symphony</a>, and a <a href='https://jamesmayr.com/adventure' target='_blank'>table-top role playing game</a>."
			},
			sparklegalaxyadventures: {
				name: "Sparkle Galaxy Adventures",
				birth: "1998",
				death: "2006",
				idea: "When I was a kid, all the grown-ups played real RPGs, but I combined Star Wars, Pokémon, and other favorite franchises into a surprisingly robust game world / role-playing game rule system that entertained me and some friends for years.",
				obituary: "We grew out of it eventually, but, still dissatisfied by the labyrinthine algebra of traditional RPGs, I created a pen-and-paper rule system (and, more recently, web app) called <a href='https://jamesmayr.com/adventure' target='_blank'>Adventure</a>."
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
								date.innerText = PROJECTS[i].birth + " - " + PROJECTS[i].death
							nameOuter.appendChild(date)

						// create description
							let description = document.createElement("div")
								description.className = "slide-description"
								description.innerHTML = (PROJECTS[i].idea ? ("<p>" + PROJECTS[i].idea + "</p>") : "") + (PROJECTS[i].obituary ? ("<h4>...</h4>" + PROJECTS[i].obituary + "</p>") : "")
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
