function javascript() {	
	
	/* data */
		var projects = [	
			{
				id: "p2pnzau",
				title: "People 2 People: New Zealand & Australia",
				tags: "more",
				image: "logos/people2people.png",
				url: "https://www.peopletopeople.com/",
				date: "July 5, 2004",
				description: "In 2004, I had the fortune of traveling to Australia and New Zealand as a People 2 People Student Ambassador."
			},
			{
				id: "lamppostsoftheworld",
				title: "Lampposts of the World",
				tags: "more",
				image: "logos/lamppostsoftheworld.png",
				url: "#",
				date: "August 1, 2004",
				description: "After failing at photography, I started a tradition of snapping shots with famous landmarks obscured by lampposts."
			},
			{
				id: "rockypointhighschool",
				title: "Rocky Point High School",
				tags: "school",
				image: "logos/rphs.png",
				url: "http://rockypointschools.org/soaring/summer_08nl.pdf",
				date: "November 1, 2004",
				description: "I attended Rocky Point High School, graduating salutatorian in 2008 after roles in student council, honor society, and more."
			},
			{
				id: "rpconcertmarchingband",
				title: "Rocky Point Concert & Marching Band",
				tags: "school music",
				image: "logos/rpmusic.png",
				url: "http://rpfriendsofmusic.org/grads.html",
				date: "March 1, 2005",
				description: "I took up clarinet in 5th grade and continued honing my craft in concert and marching band through high school."
			},
			{
				id: "rpjazzband",
				title: "Rocky Point Jazz Band",
				tags: "school music",
				image: "logos/rpmusic.png",
				url: "http://rpfriendsofmusic.org/grads.html",
				date: "October 15, 2005",
				description: "In Jazz Band, I expanded my musical repertoire to learn entirely new styles - and even composed my first solo."
			},
			{
				id: "p2pukir",
				title: "People 2 People: UK & Ireland",
				tags: "more",
				image: "logos/people2people.png",
				url: "https://www.peopletopeople.com/",
				date: "July 5, 2006",
				description: "In 2006, I again traveled through People 2 People, this time to the United Kingdom and Ireland."
			},
			{
				id: "singingsantas",
				title: "Singing Santas",
				tags: "more",
				image: "logos/rpmusic.png",
				url: "#",
				date: "December 1, 2006",
				description: "I was an actor and musician in the Singing Santas, my high school's charity-minded holiday entertainment club."
			},
			{
				id: "completetakeover",
				title: "Complete Takeover",
				tags: "games",
				image: "logos/completetakeover.png",
				url: "https://sites.google.com/site/dreamhatchergames/",
				date: "March 1, 2007",
				description: "Complete Takeover was a system of board games played on a 5x5 grid with a set of pieces reused between two dozen different games."
			},
			{
				id: "eternalhorizon",
				title: "Eternal Horizon",
				tags: "music",
				image: "logos/eternalhorizon.png",
				url: "http://rawgit.com/jamesbmayr/music/master/",
				date: "June 1, 2007",
				description: "Eternal Horizon was the first album I composed - in 2007 - and it set the standard: 16 songs and 1 hour."
			},
			{
				id: "rppitorchestra",
				title: "Rocky Point Pit Orchestra",
				tags: "school music",
				image: "logos/rpmusic.png",
				url: "http://rpfriendsofmusic.org/grads.html",
				date: "October 15, 2007",
				description: "I played clarinet in the pit orchestra for my high school's main stage production of Annie."
			},
			{
				id: "pockettheatre",
				title: "Pocket Theatre",
				tags: "more",
				image: "logos/rpeagle.png",
				url: "#",
				date: "February 15, 2008",
				description: "I took on the role of Grandpa Vanderhoff in my high school's pocket theater production of You Can't Take It With You."
			},
			{
				id: "skyburst",
				title: "Skyburst",
				tags: "music",
				image: "logos/skyburst.png",
				url: "http://rawgit.com/jamesbmayr/music/master/",
				date: "May 1, 2008",
				description: "I composed Skyburst in 2008; this album reflects a wild exploration of melody without much structure."
			},
			{
				id: "binghamtonuniversity",
				title: "Binghamton University",
				tags: "school",
				image: "logos/binghamtonuniversity.png",
				url: "https://www.binghamton.edu/",
				date: "August 25, 2008",
				description: "I studied English and music at Binghamton University and graduated summa cum laude in May 2012."
			},
			{
				id: "pepband",
				title: "BU Pep Band",
				tags: "music",
				image: "logos/bupepband.png",
				url: "https://bengaged.binghamton.edu/organization/pep-band",
				date: "October 15, 2008",
				description: "I continued to play clarinet in college, both in the student-run Pep Band and the University Wind Ensemble."
			},
			{
				id: "clue",
				title: "Clue",
				tags: "more",
				image: "logos/clue.png",
				url: "https://bengaged.binghamton.edu/organization/dcp",
				date: "December 6, 2008",
				description: "In college, I played the part of Mr. Green in the Dickinson Players production of the cult classic Clue."
			},
			{
				id: "tourguide",
				title: "BU Tour Guide Program",
				tags: "school career",
				image: "logos/bu.png",
				url: "https://www.binghamton.edu/admissions/visit/index.html",
				date: "March 1, 2009",
				description: "For 7 semesters, I was a university tour guide, helping prospective students learn about their future at Binghamton."
			},
			{
				id: "reslife",
				title: "BU ResLife",
				tags: "school career",
				image: "logos/bureslife.png",
				url: "https://www.binghamton.edu/residential-life/",
				date: "August 15, 2009",
				description: "As a resident assistant, I hosted events and served as a resource for dozens of students for three years."
			},
			{
				id: "explorchestra",
				title: "Explorchestra",
				tags: "music",
				image: "logos/explorchestra.png",
				url: "https://www.facebook.com/buexplorchestra",
				date: "Octboer 1, 2009",
				description: "I co-founded Explorchestra, a student ensemble where all the music - in every genre and style - is composed by members."
			},
			{
				id: "shadowvalley",
				title: "Shadow Valley",
				tags: "music",
				image: "logos/shadowvalley.png",
				url: "http://rawgit.com/jamesbmayr/music/master/",
				date: "December 1, 2009",
				description: "Shadow Valley, completed in 2009, was composed at the beginning stages of my music theory and history education."
			},
			{
				id: "seveneleven",
				title: "7-Eleven",
				tags: "career",
				image: "logos/seveneleven.png",
				url: "#",
				date: "May 20, 2010",
				description: "In the summer of 2010, I worked as a sales associate at my local 7-Eleven."
			},
			{
				id: "octavio",
				title: "Octavio",
				tags: "music games",
				image: "logos/octavio.png",
				url: "https://sites.google.com/site/dreamhatchergames/games/octavio",
				date: "October 1, 2010",
				description: "Octavio is an Uno-style card game featuring chord progressions as a primary mechanic, with cards placed according to tonal harmony."
			},
			{
				id: "draftsadrift",
				title: "Drafts Adrift",
				tags: "music",
				image: "logos/draftsadrift.png",
				url: "http://rawgit.com/jamesbmayr/music/master/",
				date: "December 1, 2010",
				description: "The first Drafts Adrift, in 2010, represents my love of video game music, from catchy melodies to looping scenic soundtracks."
			},
			{
				id: "playinggod",
				title: "Playing God",
				tags: "games",
				image: "logos/playinggod.png",
				url: "https://sites.google.com/site/dreamhatchergames/games/playing-god",
				date: "January 1, 2011",
				description: "Playing God is a Risk-style board game where players recruit ancient deities to their pantheon as they seek to rule the world."
			},
			{
				id: "cascade",
				title: "Cascade",
				tags: "music",
				image: "logos/cascade.png",
				url: "http://rawgit.com/jamesbmayr/music/master/",
				date: "February 15, 2011",
				description: "Cascade, released in 2011 after completing the titular \"symphony,\" shows music composed with a particular ensemble in mind: Explorchestra."
			},
			{
				id: "soulsofwar",
				title: "Souls of War",
				tags: "music",
				image: "logos/soulsofwar.png",
				url: "https://twitter.com/soulsofwar",
				date: "April 20, 2011",
				description: "I composed a soundtrack for Souls of War, a never-built mobile game set in WWII with different themes for each nation."
			},
			{
				id: "writinginitiativecenter",
				title: "Writing Initiative Center",
				tags: "school",
				image: "logos/bu.png",
				url: "https://www.binghamton.edu/writing/",
				date: "July 1, 2011",
				description: "I spent a year as a writing tutor for my peers at the school's Writing Initiative Center."
			},
			{
				id: "pipedream",
				title: "BU Pipe Dream",
				tags: "writing",
				image: "logos/pipedream.png",
				url: "https://www.bupipedream.com/",
				date: "September 15, 2011",
				description: "I served as a copy editor for the Pipe Dream, the primary student-run newspaper at Binghamton University."
			},
			{
				id: "epicofkoranames",
				title: "Epic of Koranames",
				tags: "writing",
				image: "logos/epicofkoranames.png",
				url: "#",
				date: "October 18, 2011",
				description: "I wrote (and rewrote) an epic poem - the Epic of Koranames - 5000 lines of rhythmic and rhyming fantasy adventure."
			},
			{
				id: "draftsadrift2",
				title: "Drafts Adrift 2",
				tags: "music",
				image: "logos/draftsadrift2.png",
				url: "http://rawgit.com/jamesbmayr/music/master/",
				date: "December 1, 2011",
				description: "2011's Drafts Adrift 2 is a combination of various projects - including video game soundtracks and avant garde experiments."
			},
			{
				id: "sounddrawn",
				title: "Sounddrawn",
				tags: "music code",
				image: "logos/sounddrawn.png",
				url: "http://rawgit.com/jamesbmayr/music/master/",
				date: "February 13, 2012",
				description: "I designed a music website for my compositions using Wix, then overhauled it, then coded it myself in javascript."
			},
			{
				id: "captainchrono",
				title: "Captain Chrono Sails Through Time",
				tags: "music",
				image: "logos/captainchronosailsthroughtime.png",
				url: "http://rawgit.com/jamesbmayr/music/master/",
				date: "April 1, 2012",
				description: "In 2012, I put my ethnomusicology knowledge to the test, setting out to explore time and space with Captain Chrono."
			},
			{
				id: "wilinloug",
				title: "wi[lin][loug]",
				tags: "more",
				image: "logos/wilinloug.png",
				url: "#",
				date: "May 31, 2012",
				description: "wɪ[lin][loug] is a constructive language that builds complex words out of classical roots in predictable patterns"
			},
			{
				id: "petco",
				title: "Petco",
				tags: "career",
				image: "logos/petco.png",
				url: "#",
				date: "July 11, 2012",
				description: "I worked at Petco as a sales expert, taking care of humans and animals alike at my local store."
			},
			{
				id: "adventure",
				title: "Adventure",
				tags: "games",
				image: "logos/adventure.png",
				url: "#",
				date: "September 1, 2012",
				description: "Adventure is a simplified pen-and-paper role playing game set in a fantasy world with a balance of combat, puzzle-solving, and character growth."
			},
			{
				id: "penduluminous",
				title: "Penduluminous",
				tags: "music writing",
				image: "logos/penduluminous.png",
				url: "http://rawgit.com/jamesbmayr/music/master/",
				date: "November 1, 2012",
				description: "The 2012 album Penduluminous is all about swing - with 16 vocal tracks all set in different genres."
			},
			{
				id: "itswhoiamb",
				title: "It's Who Iamb",
				tags: "writing",
				image: "logos/itswhoiamb.png",
				url: "https://itswhoiamb.tumblr.com",
				date: "December 2, 2012",
				description: "It's Who Iamb was a poetry blog that updated every day for a year, serving now as a series of snapshots of the past."
			},
			{
				id: "tfcu",
				title: "Teachers Federal Credit Union",
				tags: "career",
				image: "logos/tfcu.png",
				url: "https://www.teachersfcu.org",
				date: "January 1, 2013",
				description: "At Teachers Federal Credit Union, I served members by handling financial transactions as a teller."
			},
			{
				id: "stormfront",
				title: "Stormfront",
				tags: "games",
				image: "logos/stormfront.png",
				url: "https://sites.google.com/site/dreamhatchergames/games/stormfront",
				date: "February 10, 2013",
				description: "Stormfront is a weather-themed Euro game in which players collect cards to spread their storms across a continent."
			},
			{
				id: "dosvidaniya",
				title: "Do Svidaniya, Mr. President",
				tags: "games",
				image: "logos/dosvidaniya.png",
				url: "https://sites.google.com/site/dreamhatchergames/games/do-svidaniya",
				date: "March 20, 2013",
				description: "Do Svidaniya, Mr. President is a Resistance-style card game of secrets and deduction that pits Soviets against Americans."
			},
			{
				id: "thedeathmakerssymphony",
				title: "The Deathmakers' Symphony",
				tags: "music writing",
				image: "logos/thedeathmakerssymphony.png",
				url: "http://rawgit.com/jamesbmayr/music/master/",
				date: "May 1, 2013",
				description: "The Deathmakers' Symphony is an epic adventure set to sweeping orchestral music, released in 2013 with a corresponding poem."
			},
			{
				id: "teachforamerica",
				title: "Teach For America",
				tags: "school",
				image: "logos/tfa.png",
				url: "https://www.teachforamerica.org/",
				date: "June 1, 2013",
				description: "Through Teach for America, I received training and financial assistance that helped me become a high school teacher."
			},
			{
				id: "nycdoe",
				title: "NYC Department of Education",
				tags: "school career",
				image: "logos/nycdoe.png",
				url: "http://schools.nyc.gov/SchoolPortals/09/X365/default.htm",
				date: "August 15, 2013",
				description: "I taught 11th and 12th grade English and technology at the Academy for Language and Technology, a Bronx public high school."
			},
			{
				id: "fordhamuniversity",
				title: "Fordham University",
				tags: "school",
				image: "logos/fordhamuniversity.png",
				url: "https://www.fordham.edu/info/20990/graduate_school_of_education",
				date: "November 1, 2013",
				description: "While working full-time as an educator, I attended Fordham University to earn Master's of Science in Teaching."
			},
			{
				id: "dreamhatcher",
				title: "Dreamhatcher",
				tags: "games",
				image: "logos/dreamhatcher.png",
				url: "https://sites.google.com/site/dreamhatchergames/",
				date: "April 1, 2014",
				description: "DreamHatcher offers dozens of free print-and-play tabletop games - and tons of templates to help aspiring designers craft their own."
			},
			{
				id: "ddaywalk",
				title: "D-Day Walk",
				tags: "more",
				image: "logos/ddaywalk.png",
				url: "#",
				date: "July 11, 2014",
				description: "The D-Day Walk was a 30-mile trek through the heart of New York along the D subway line, stopping at every station."
			},
			{
				id: "apollo",
				title: "Apollo",
				tags: "more",
				image: "logos/apollo.png",
				url: "https://www.facebook.com/apollo.feeney.mayr/",
				date: "July 31, 2014",
				description: "Apollo is such a good boy that he types his own Facebook statuses with his own four paws."
			},
			{
				id: "clevernacular",
				title: "Clevernacular",
				tags: "writing",
				image: "logos/clevernacular.png",
				url: "http://clevernacular.tumblr.com",
				date: "December 2, 2014",
				description: "Clevernacular is a blog about how amazing everyday design can be - a celebration of the brilliance all around us."
			},
			{
				id: "chalice",
				title: "Chalice",
				tags: "games",
				image: "logos/chalice.png",
				url: "https://www.kickstarter.com/projects/jamesbmayr/chalice-the-card-game/description",
				date: "March 21, 2015",
				description: "Funded on Kickstarter, Chalice is a card game of death and deception where players poison their friends for fun."
			},
			{
				id: "lexpose",
				title: "Lexpose",
				tags: "writing",
				image: "logos/lexpose.png",
				url: "http://www.writerscafe.org/jamesbmayr/writing",
				date: "May 1, 2015",
				description: "Lexpose is a collection of original short-form fiction I've written, in college and afterwards."
			},
			{
				id: "wribbon",
				title: "Wribbon",
				tags: "more",
				image: "logos/wribbon.png",
				url: "https://drive.google.com/drive/folders/0B3Pd_099FSXVQlZ3LWpoR0hQVmc",
				date: "June 5, 2015",
				description: "Wribbon is a form of stylized text designed to look like strips of paper folded into letters and numbers."
			},
			{
				id: "sharewaves",
				title: "Sharewaves",
				tags: "code",
				image: "logos/sharewaves.png",
				url: "https://github.com/jamesbmayr/sharewaves",
				date: "August 15, 2015",
				description: "Sharewaves was a content-driven social network I coded in which close friends shared cool things they came across on the web."
			},
			{
				id: "themuse",
				title: "The Muse",
				tags: "career",
				image: "logos/themuse.png",
				url: "https://www.themuse.com/team",
				date: "September 29, 2015",
				description: "After 2 years as a writer and editor, I'm now on the Product Team at The Muse, a NYC tech startup that helps people find their dream careers."
			},
			{
				id: "portmantoasters",
				title: "Portmantoasters",
				tags: "writing",
				image: "logos/portmantoasters.png",
				url: "https://portmantoasters.tumblr.com",
				date: "December 2, 2015",
				description: "Portmantoasters are word puzzles with two words overlapped into one - and this was a daily blog challenging readers to figure them out."
			},
			{
				id: "underblue",
				title: "Underblue",
				tags: "music",
				image: "logos/underblue.png",
				url: "https://www.facebook.com/officialunderblue",
				date: "March 30, 2016",
				description: "I composed and played piano and clarinet in Underblue, rocking out on New York City stages for a year."
			},
			{
				id: "codemo",
				title: "Codemo",
				tags: "code",
				image: "logos/codemo.png",
				url: "https://rawgit.com/jamesbmayr/codemo/master/",
				date: "April 22, 2016",
				description: "Codemo is a collection of small, standalone web apps and games coded entirely in html, css, and front-end javascript."
			},
			{
				id: "singles",
				title: "Singles",
				tags: "music writing",
				image: "logos/singles.png",
				url: "http://rawgit.com/jamesbmayr/music/master/",
				date: "May 30, 2016",
				description: "After a long hiatus, 2016's Singles saw my return to composition with an emotional journey told through 16 alternative rock songs."
			},
			{
				id: "bossfight",
				title: "Boss Fight",
				tags: "code games",
				image: "logos/bossfight.png",
				url: "http://bossfightgame.com/",
				date: "June 26, 2016",
				description: "Coded in collaboration with Max Pekarsky, Boss Fight is a turn-based co-op game where players must stay a dragon."
			},
			{
				id: "theanthologysymphony",
				title: "The Anthology Symphony",
				tags: "music more",
				image: "logos/theanthologysymphony.png",
				url: "#",
				date: "November 1, 2016",
				description: "A musical experiment, the Anthology Symphony challenged 10 friends to write, rehearse, and record a symphony built on common themes."
			},
			{
				id: "pickupnotes",
				title: "Pickup Notes",
				tags: "music",
				image: "logos/pickupnotes.png",
				url: "http://rawgit.com/jamesbmayr/pickupnotes/master/",
				date: "December 20, 2016",
				description: "Pickup Notes is a podcast about music - where it comes from, how it's made, and why it matters."
			},
			{
				id: "chordanalyzer",
				title: "chordAnalyzer",
				tags: "music code",
				image: "logos/chordanalyzer.png",
				url: "https://rawgit.com/jamesbmayr/codemo/master/chordAnalyzer/",
				date: "January 15, 2017",
				description: "Coded now as a playable javascript piano, chordAnalyzer was once a Wolfram Mathematica function made to do my music theory homework."
			},
			{
				id: "harmony",
				title: "Harmony",
				tags: "code more",
				image: "logos/harmony.png",
				url: "http://rawgit.com/jamessullivan77/Spotify-Group-Sharing/master/",
				date: "January 21, 2017",
				description: "Coded in collaboration with many others at a Spotify hackathon, Harmony is a collaborative music experience where chords are tied to time."
			},
			{
				id: "diamondcheckers",
				title: "Diamond Checkers",
				tags: "games code",
				image: "logos/diamondcheckers.png",
				url: "https://diamondcheckers.herokuapp.com",
				date: "March 1, 2017",
				description: "Originally an abstract strategy game I designed long ago, Diamond Checkers is a node.js web game, a battle of wits for two players."
			},
			{
				id: "aiarenas",
				title: "AI Arenas",
				tags: "games code",
				image: "logos/aiarenas.png",
				url: "https://www.aiarenas.com",
				date: "May 1, 2017",
				description: "AI Arenas is a web game where javascript robots battle for cubes in a competitive coding arena."
			},
			{
				id: "passenger",
				title: "Passenger EP",
				tags: "music",
				image: "logos/passenger.png",
				url: "https://itunes.apple.com/us/album/passenger-ep/id1258446913?app=itunes&ign-mpt=uo%3D4",
				date: "June 1, 2017",
				description: "Underblue's debut EP, Passenger includes five songs, including one I composed, in which I play piano."
			},
			{
				id: "graphemecolorer",
				title: "graphemecolorer",
				tags: "code",
				image: "logos/synesthesia.png",
				url: "#",
				date: "July 13, 2017",
				description: "graphemeColorer is a Google Chrome extension that displays text as a grapheme-color synesthete might see it."
			},
			{
				id: "memory",
				title: "Memory",
				tags: "code games",
				image: "logos/memory.png",
				url: "http://rawgit.com/eef22/memory/master/",
				date: "August 20, 2017",
				description: "Coded in collaboration with Liz Ford, Memory is a fully customizable card game for two or more brains."
			},
			{
				id: "bookvsmovie",
				title: "Book vs. Movie",
				tags: "code",
				image: "logos/bookvsmovie.png",
				url: "https://bookvsmovie.herokuapp.com",
				date: "September 9, 2017",
				description: "Coded in collaboration with Max Pekarsky, Book vs. Movie is a simple tool to answer the age old question: which was better?"
			},
			{
				id: "prosandconsole",
				title: "Pros & Console",
				tags: "code writing",
				image: "logos/prosandconsole.png",
				url: "https://prosandconsole.tumblr.com",
				date: "September 30, 2017",
				description: "Pros & Console is a blog that follows the ups and downs of project-oriented programming."
			},
			{
				id: "specterinspectors",
				title: "Specter Inspectors",
				tags: "code game",
				image: "logos/specterinspectors.png",
				url: "http://www.specterinspectors.com",
				date: "October 27, 2017",
				description: "Specter Inspectors is a game of ghosts and guesses. 5-25 friends gather in-person for a party game of deceptiona and deduction."
			}
		]

	/* buildYearDot(year) */
		function buildYearDot(yearCount) {
			var yearDot = document.createElement("div")
				yearDot.className = "year-dot"
				yearDot.style.top = "calc(60px + var(--factor) * " + (new Date().getTime() - new Date("January 1, " + (2004 + yearCount)).getTime()) / (1000 * 60 * 60 * 24) + "px)"

			var yearDotInner = document.createElement("div")
				yearDotInner.className = "year-dot-inner"

			var yearText = document.createTextNode(Number(2004 + yearCount))
				yearDotInner.appendChild(yearText)
				yearDot.appendChild(yearDotInner)

			document.getElementById("years").appendChild(yearDot)
		}

	/* buildBlock(project, lane) */
		function buildBlock(project, lane) {
			/* lane */
				if (lane > 3) {
					lane = 0
				}

			/* block */
				var block = document.createElement("div")
					block.className = "project-block " +  "lane-" + lane + " " + project.tags.replace(/(writing|music|games|code)/gi,"$1-selected").replace(/(school|career|more)/gi,"$1-unselected")
					block.id = project.id
					block.style.top = "calc(100px + var(--factor) * (" + Number((new Date().getTime() - new Date(project.date).getTime()) / (1000 * 60 * 60 * 24)) + "px))"
					block.style["background-color"] = project.color

				var image = document.createElement("div")
					image.className = "project-image"
					image.style["background-image"] = "url(" + project.image + ")"
					block.appendChild(image)

				if ((project.url.length > 0) && (project.url !== "#")) {
					var link = document.createElement("a")
						link.className = "project-link"
						link.href = project.url
						link.target = "_blank"
				}

				var description = document.createElement("div")
					description.className = "project-description"
				var descriptionInner = document.createElement("div")
					descriptionInner.className = "project-description-inner"
				var descriptionText = document.createTextNode(project.description)
					descriptionInner.appendChild(descriptionText)
					description.appendChild(descriptionInner)
					if (link) {
						description.appendChild(link)
					}
					block.appendChild(description)

				var point = document.createElement("div")
					point.className = "project-point " + "lane-" + lane
					block.appendChild(point)

				var line = document.createElement("div")
					line.className = "project-line " + "lane-" + lane 
					block.appendChild(line)

				block.addEventListener("click",function() {
					clickBlock(this)
				})
	
			/* output */
				document.getElementById("projects").appendChild(block)
				return lane + 1
		}

	/* clickBlock(project) */
		function clickBlock(project) {
			if (project.className.indexOf("active") > -1) {
				var activeList = document.getElementsByClassName("active")
				for (var x in activeList) {
					if (activeList[x].className !== undefined) {
						activeList[x].className = activeList[x].className.replace(" active","")
					}
				}
			}
			else {
				var activeList = document.getElementsByClassName("active")
				for (var x in activeList) {
					if (activeList[x].className !== undefined) {
						activeList[x].className = activeList[x].className.replace(" active","")
					}
				}

				project.className = project.className + " active"
			}
		}

	/* filterBlocks(button) */
		window.filterBlocks = function(button) {
			var projectBlocks = document.getElementsByClassName("project-block")

			if (button.className.indexOf("selected") == -1) {
				button.className += " selected"

				for (var x in projectBlocks) {
					if (projectBlocks[x].className !== undefined && projectBlocks[x].className.indexOf(button.value) !== -1) {
						projectBlocks[x].className = projectBlocks[x].className.replace(button.value + "-unselected", button.value + "-selected")
					}
				}
			}
			else {
				button.className = button.className.replace(" selected","")
				
				for (var x in projectBlocks) {
					if (projectBlocks[x].className !== undefined && projectBlocks[x].className.indexOf(button.value) !== -1) {
						projectBlocks[x].className = projectBlocks[x].className.replace(button.value + "-selected", button.value + "-unselected")
					}
				}
			}
			
		}
	
	/* on page load */
		/* mainline height */
			document.getElementById("mainline").style.height = "calc(var(--factor) * " + (new Date().getTime() - new Date("January 1, 2004").getTime()) / (1000 * 60 * 60 * 24) + "px)"

		/* yearDots */
			for (var yearCount = Math.floor( (new Date().getTime() - new Date("January 1, 2004").getTime()) / (1000 * 60 * 60 * 24 * 365.25) ); yearCount > 0; yearCount--) {
				buildYearDot(yearCount)
			}

		/* projectBlocks */
			var lane = 0
			for (var x in projects) {
				lane = buildBlock(projects[x], lane)
			}
			
}
