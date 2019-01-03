window.onload = function() {
	/*** globals ***/
		/* projects */
			var projects = [	
				{
					name: "Complete Takeover",
					size: "large",
					tags: ["games"],
					url: "https://sites.google.com/site/dreamhatchergames/",
					date: "March 1, 2007",
					description: "Complete Takeover was a system of board games played on a 5x5 grid with a set of pieces reused between two dozen different games."
				},
				{
					name: "Eternal Horizon",
					size: "large",
					tags: ["music"],
					url: "http://rawgit.com/jamesbmayr/music/master/",
					date: "June 1, 2007",
					description: "Eternal Horizon was the first album I composed - in 2007 - and it set the standard: 16 songs and 1 hour."
				},
				{
					name: "Skyburst",
					size: "large",
					tags: ["music"],
					url: "http://rawgit.com/jamesbmayr/music/master/",
					date: "May 1, 2008",
					description: "I composed Skyburst in 2008; this album reflects a wild exploration of melody without much structure."
				},
				{
					name: "Explorchestra",
					size: "extra-large",
					tags: ["collaborations","music"],
					url: "https://www.facebook.com/buexplorchestra",
					date: "Octboer 1, 2009",
					description: "I co-founded Explorchestra, a student ensemble where all the music - in every genre and style - is composed by members."
				},
				{
					name: "Shadow Valley",
					size: "large",
					tags: ["music"],
					url: "http://rawgit.com/jamesbmayr/music/master/",
					date: "December 1, 2009",
					description: "Shadow Valley, completed in 2009, was composed at the beginning stages of my music theory and history education."
				},
				{
					name: "Octavio",
					size: "small",
					tags: ["games","music"],
					url: "https://sites.google.com/site/dreamhatchergames/games/octavio",
					date: "October 1, 2010",
					description: "Octavio is an Uno-style card game featuring chord progressions as a primary mechanic, with cards placed according to tonal harmony."
				},
				{
					name: "Drafts Adrift",
					size: "large",
					tags: ["music"],
					url: "http://rawgit.com/jamesbmayr/music/master/",
					date: "December 1, 2010",
					description: "The first Drafts Adrift, in 2010, represents my love of video game music, from catchy melodies to looping scenic soundtracks."
				},
				{
					name: "Playing God",
					size: "medium",
					tags: ["games"],
					url: "https://sites.google.com/site/dreamhatchergames/games/playing-god",
					date: "January 1, 2011",
					description: "Playing God is a Risk-style board game where players recruit ancient deities to their pantheon as they seek to rule the world."
				},
				{
					name: "Cascade",
					size: "large",
					tags: ["music"],
					url: "http://rawgit.com/jamesbmayr/music/master/",
					date: "February 15, 2011",
					description: "Cascade, released in 2011 after completing the titular \"symphony,\" shows music composed with a particular ensemble in mind: Explorchestra."
				},
				{
					name: "Souls of War",
					size: "medium",
					tags: ["music","collaborations"],
					url: "https://twitter.com/soulsofwar",
					date: "April 20, 2011",
					description: "I composed a soundtrack for Souls of War, a never-built mobile game set in WWII with different themes for each nation."
				},
				{
					name: "Epic of Koranames",
					size: "extra-large",
					tags: ["writing"],
					url: "#",
					date: "October 18, 2011",
					description: "I wrote (and rewrote) an epic poem - the Epic of Koranames - 5000 lines of rhythmic and rhyming fantasy adventure."
				},
				{
					name: "Drafts Adrift 2",
					size: "large",
					tags: ["music"],
					url: "http://rawgit.com/jamesbmayr/music/master/",
					date: "December 1, 2011",
					description: "2011's Drafts Adrift 2 is a combination of various projects - including video game soundtracks and avant garde experiments."
				},
				{
					name: "Captain Chrono",
					size: "large",
					tags: ["music"],
					url: "http://rawgit.com/jamesbmayr/music/master/",
					date: "April 1, 2012",
					description: "In 2012, I put my ethnomusicology knowledge to the test, setting out to explore time and space with Captain Chrono."
				},
				{
					name: "wi[lin][loug]",
					size: "medium",
					tags: ["writing"],
					url: "#",
					date: "May 31, 2012",
					description: "wɪ[lin][loug] is a constructive language that builds complex words out of classical roots in predictable patterns."
				},
				{
					name: "Adventure",
					size: "large",
					tags: ["games"],
					url: "https://docs.google.com/document/d/1RQF1dKAb19yVgWsmagPAzSqaGjjm2ZPHnCLDD-FyQXw/edit?usp=sharing",
					date: "September 1, 2012",
					description: "Adventure is a simplified pen-and-paper role playing game set in a fantasy world with a balance of combat, puzzle-solving, and character growth."
				},
				{
					name: "Penduluminous",
					size: "large",
					tags: ["music","writing"],
					url: "http://rawgit.com/jamesbmayr/music/master/",
					date: "November 1, 2012",
					description: "The 2012 album Penduluminous is all about swing - with 16 vocal tracks all set in different genres."
				},
				{
					name: "It's Who Iamb",
					size: "large",
					tags: ["writing"],
					url: "https://itswhoiamb.tumblr.com",
					date: "December 2, 2012",
					description: "It's Who Iamb was a poetry blog that updated every day for a year, serving now as a series of snapshots of the past."
				},
				{
					name: "Stormfront",
					size: "medium",
					tags: ["games"],
					url: "https://sites.google.com/site/dreamhatchergames/games/stormfront",
					date: "February 10, 2013",
					description: "Stormfront is a weather-themed Euro game in which players collect cards to spread their storms across a continent."
				},
				{
					name: "Do Svidaniya, Mr. President",
					size: "medium",
					tags: ["games"],
					url: "https://sites.google.com/site/dreamhatchergames/games/do-svidaniya",
					date: "March 20, 2013",
					description: "Do Svidaniya, Mr. President is a Resistance-style card game of secrets and deduction that pits Soviets against Americans."
				},
				{
					name: "The Deathmakers' Symphony",
					size: "large",
					tags: ["music","writing"],
					url: "http://rawgit.com/jamesbmayr/music/master/",
					date: "May 1, 2013",
					description: "The Deathmakers' Symphony is an epic adventure set to sweeping orchestral music, released in 2013 with a corresponding poem."
				},
				{
					name: "Dreamhatcher",
					size: "extra-large",
					tags: ["games"],
					url: "https://sites.google.com/site/dreamhatchergames/",
					date: "April 1, 2014",
					description: "DreamHatcher offers dozens of free print-and-play tabletop games - and tons of templates to help aspiring designers craft their own."
				},
				{
					name: "Apollo",
					size: "medium",
					tags: ["art"],
					url: "https://www.facebook.com/apollo.feeney.mayr/",
					date: "July 31, 2014",
					description: "Apollo is such a good boy that he types his own Facebook statuses with his own four paws."
				},
				{
					name: "Clevernacular",
					size: "large",
					tags: ["writing","art"],
					url: "http://clevernacular.tumblr.com",
					date: "December 2, 2014",
					description: "Clevernacular is a blog about how amazing everyday design can be - a celebration of the brilliance all around us."
				},
				{
					name: "Chalice",
					size: "extra-large",
					tags: ["games","collaborations","code"],
					url: "https://www.kickstarter.com/projects/jamesbmayr/chalice-the-card-game/description",
					date: "March 21, 2015",
					description: "Funded on Kickstarter, Chalice is a card game (and web game) of death and deception where players poison their friends for fun."
				},
				{
					name: "Lexpose",
					size: "extra-large",
					tags: ["writing"],
					url: "http://www.writerscafe.org/jamesbmayr/writing",
					date: "May 1, 2015",
					description: "Lexpose is a collection of original short-form fiction I've written, in college and afterwards."
				},
				{
					name: "Wribbon",
					size: "medium",
					tags: ["art"],
					url: "https://drive.google.com/drive/folders/0B3Pd_099FSXVQlZ3LWpoR0hQVmc",
					date: "June 5, 2015",
					description: "Wribbon is a form of stylized text designed to look like strips of paper folded into letters and numbers."
				},
				{
					name: "Sharewaves",
					size: "extra-large",
					tags: ["code"],
					url: "https://github.com/jamesbmayr/sharewaves",
					date: "August 15, 2015",
					description: "Sharewaves was a content-driven social network I coded in which close friends shared cool things they came across on the web."
				},
				{
					name: "Portmantoasters",
					size: "medium",
					tags: ["writing"],
					url: "https://portmantoasters.tumblr.com",
					date: "December 2, 2015",
					description: "Portmantoasters are word puzzles with two words overlapped into one - and this was a daily blog challenging readers to figure them out."
				},
				{
					name: "Underblue",
					size: "extra-large",
					tags: ["collaborations","music","art"],
					url: "https://www.facebook.com/officialunderblue",
					date: "March 30, 2016",
					description: "I composed and played piano and clarinet in Underblue, rocking out on New York City stages for a year."
				},
				{
					name: "Singles",
					size: "large",
					tags: ["music","writing"],
					url: "http://rawgit.com/jamesbmayr/music/master/",
					date: "May 30, 2016",
					description: "After a long hiatus, 2016's Singles saw my return to composition with an emotional journey told through 16 alternative rock songs."
				},
				{
					name: "The Anthology Symphony",
					size: "large",
					tags: ["collaborations","music"],
					url: "#",
					date: "November 1, 2016",
					description: "A musical experiment, the Anthology Symphony challenged 10 friends to write, rehearse, and record a symphony built on common themes."
				},
				{
					name: "chordAnalyzer",
					size: "medium",
					tags: ["code","music"],
					url: "https://jamesmayr.com/chordanalyzer/",
					date: "January 6, 2017",
					description: "Coded now as a playable javascript piano, chordAnalyzer was once a Wolfram Mathematica function made to do my music theory homework."
				},
				{
					name: "Harmony",
					size: "small",
					tags: ["collaborations","code","music"],
					url: "http://rawgit.com/jamessullivan77/Spotify-Group-Sharing/master/",
					date: "January 21, 2017",
					description: "Coded in collaboration with many others at a Spotify hackathon, Harmony is a collaborative music experience where chords are tied to time."
				},
				{
					name: "Diamond Checkers",
					size: "large",
					tags: ["games","code"],
					url: "https://diamondcheckers.herokuapp.com",
					date: "March 1, 2017",
					description: "Originally an abstract strategy game I designed long ago, Diamond Checkers is a node.js web game, a battle of wits for two players."
				},
				{
					name: "AI Arenas",
					size: "extra-large",
					tags: ["code","games"],
					url: "http://www.aiarenas.com",
					date: "May 1, 2017",
					description: "AI Arenas is a web game where javascript robots battle for cubes in a competitive coding arena."
				},
				{
					name: "Passenger EP",
					size: "large",
					tags: ["collaborations","music"],
					url: "https://itunes.apple.com/us/album/passenger-ep/id1258446913?app=itunes&ign-mpt=uo%3D4",
					date: "June 1, 2017",
					description: "Underblue's debut EP, Passenger includes five songs, including one I composed, in which I play piano."
				},
				{
					name: "Memory",
					size: "medium",
					tags: ["collaborations","code","games"],
					url: "https://jamesmayr.com/memory",
					date: "August 20, 2017",
					description: "Coded in collaboration with Liz Ford, Memory is a fully customizable card game for two or more brains."
				},
				{
					name: "Book vs. Movie",
					size: "medium",
					tags: ["collaborations","code"],
					url: "https://bookvsmovie.herokuapp.com",
					date: "September 9, 2017",
					description: "Coded in collaboration with Max Pekarsky, Book vs. Movie is a simple tool to answer the age old question: which was better?"
				},
				{
					name: "Pros & Console",
					size: "large",
					tags: ["writing","code"],
					url: "https://prosandconsole.tumblr.com",
					date: "September 30, 2017",
					description: "Pros & Console is a blog that follows the ups and downs of project-oriented programming."
				},
				{
					name: "Specter Inspectors",
					size: "large",
					tags: ["games","code"],
					url: "http://www.specterinspectors.com",
					date: "October 27, 2017",
					description: "Specter Inspectors is a game of ghosts and guesses. 5-25 friends gather in-person for a party game of deception and deduction."
				},
				{
					name: "CoColors",
					size: "medium",
					tags: ["code","art"],
					url: "https://cocolors.herokuapp.com",
					date: "November 15, 2017",
					description: "CoColors is a real-time collaborative drawing tool. Create a canvas and start making art with friends."
				},
				{
					name: "chromaCreatures",
					size: "medium",
					tags: ["code","games"],
					url: "https://jamesmayr.com/chromacreatures/",
					date: "January 2, 2018",
					description: "chromaCreatures is a challenging shoot-em-up arcade game - players use a monochromatic blaster to fend off hybrid-hued enemies."
				},
				{
					name: "Switchonyms",
					size: "large",
					tags: ["games","code"],
					url: "http://www.switchonyms.com",
					date: "February 1, 2018",
					description: "Switchonyms is a chaotic party game for 4+ players - guess words to get points, but lose them the longer it takes opponents to guess."
				},
				{
					name: "toneMaker",
					size: "large",
					tags: ["code","music"],
					url: "https://jamesmayr.com/tonemaker/",
					date: "February 14, 2018",
					description: "Use the toneMaker synthesizer tool to craft your own sounds, tinkering with parameters in audio visualizations."
				},
				{
					name: "GamesTimeline",
					size: "medium",
					tags: ["code"],
					url: "https://gamestimeline.herokuapp.com",
					date: "July 10, 2018",
					description: "See how videogame series perform over time, using <canvas> and the IGDB API."
				},
				{
					name: "ClickClique",
					size: "small",
					tags: ["code"],
					url: "https://clickclique.herokuapp.com",
					date: "April 25, 2018",
					description: "ClickClique is a PVP real-time clicking competition, built with nodeJS and websockets."
				},
				{
					name: "Chess",
					size: "large",
					tags: ["collaborations","code","games"],
					url: "https://jamesmayr.com/chess/",
					date: "July 5, 2018",
					description: "This PVP chess clone was built in collaboration with Max Pekarsky."
				},
				{
					name: "Cuber",
					size: "medium",
					tags: ["games"],
					url: "https://drive.google.com/drive/folders/0B3Pd_099FSXVOXhvc2hESFRwa0U?usp=sharing",
					date: "February 22, 2014",
					description: "Cüber is a dice-building game for 2-6 players who rig their dice to collect coins."
				},
				{
					name: "Chromatiles",
					size: "small",
					tags: ["games"],
					url: "https://docs.google.com/document/d/11bzNpYlffOmfkxHDRcfDiMHxOXMEcvxSS3_ZTlP4k00/edit?usp=sharing",
					date: "December 13, 2016",
					description: "A strategy game for 2-6 players, Chromatiles is all about overlapping colored squares."
				},
				{
					name: "balloonPopper",
					size: "small",
					tags: ["code","games"],
					url: "https://jamesmayr.com/balloonpopper/",
					date: "Februray 8, 2017",
					description: "balloonPopper is a simple web game - pop the balloons before they float away!"
				},
				{
					name: "bladesDodger",
					size: "small",
					tags: ["code","games"],
					url: "https://jamesmayr.com/bladesdodger/",
					date: "June 20, 2017",
					description: "bladesDodger is a simple web game - click the dots, but dodge the spinning blades!"
				},
				{
					name: "blockDescender",
					size: "small",
					tags: ["code"],
					url: "https://jamesmayr.com/blockdescender/",
					date: "October 4, 2017",
					description: "blockDescender is a web clone of Tetris, where players must fit colored blocks together."
				},
				{
					name: "checkersPlayer",
					size: "medium",
					tags: ["code","games"],
					url: "https://jamesmayr.com/checkersplayer/",
					date: "November 21, 2017",
					description: "checkersPlayer is a Javascript web clone featuring PVP and AI match-ups."
				},
				{
					name: "clipPather",
					size: "medium",
					tags: ["code","art"],
					url: "https://jamesmayr.com/clippather/",
					date: "April 22, 2016",
					description: "clipPather is a constantly evolving Javascript tool for drawing with CSS clip-paths."
				},
				{
					name: "colorFlooder",
					size: "small",
					tags: ["code","games"],
					url: "https://jamesmayr.com/colorflooder/",
					date: "January 19, 2017",
					description: "colorFlooder is a web game where players click squares to collapse a grid to one color."
				},
				{
					name: "graphMaker",
					size: "medium",
					tags: ["code"],
					url: "https://jamesmayr.com/graphmaker/",
					date: "November 26, 2017",
					description: "Use graphMaker to plot mathematical functions on a Cartesian grid."
				},
				{
					name: "gridDrawer",
					size: "medium",
					tags: ["code","art","music"],
					url: "https://jamesmayr.com/griddrawer/",
					date: "August 7, 2018",
					description: "gridDrawer is a tool for art and music - draw strings on a pegboard, then play them!"
				},
				{
					name: "hexSequencer",
					size: "small",
					tags: ["code","games"],
					url: "https://jamesmayr.com/hexsequencer/",
					date: "November 20, 2017",
					description: "hexSequencer is a memory game like Simon, with 6 musical colored lights."
				},
				{
					name: "hueMatcher",
					size: "small",
					tags: ["code","games"],
					url: "https://jamesmayr.com/huematcher/",
					date: "September 14, 2017",
					description: "In hueMatcher, adjust red, green, and blue to match the randomly generated color."
				},
				{
					name: "laserSimulator",
					size: "large",
					tags: ["code","art"],
					url: "https://jamesmayr.com/lasersimulator/",
					date: "June 28, 2018",
					description: "With laserSimulator, manipulate light using prisms, refractors, mirrors, and more."
				},
				{
					name: "magnetMaker",
					size: "large",
					tags: ["code"],
					url: "https://jamesmayr.com/magnetmaker/",
					date: "April 25, 2018",
					description: "magnetMaker is a pseudo-realistic physics simulator with magnetic spheres and tons of forces."
				},
				{
					name: "metroMapper",
					size: "medium",
					tags: ["code","art"],
					url: "https://jamesmayr.com/metromapper/",
					date: "October 3, 2017",
					description: "metroMapper is a live map of the NYC subway system, with data sourced from MTA schedules."
				},
				{
					name: "mineFinder",
					size: "small",
					tags: ["code","games"],
					url: "https://jamesmayr.com/minefinder/",
					date: "December 30, 2017",
					description: "In mineFinder, sweep the randomly generated board flagging mines before you click them!"
				},
				{
					name: "pawnPusher",
					size: "medium",
					tags: ["games","code"],
					url: "https://jamesmayr.com/pawnpusher/",
					date: "November 28, 2017",
					description: "An original game, on both cardstock and the web, pawnPusher is about knocking your opponent off the board."
				},
				{
					name: "pieceFlipper",
					size: "small",
					tags: ["code","games"],
					url: "https://jamesmayr.com/pieceflipper/",
					date: "December 31, 2017",
					description: "An Othello/Reversi clone, pieceFlipper features both PVP and human-vs.-AI games."
				},
				{
					name: "pitchPlayer",
					size: "medium",
					tags: ["code","music"],
					url: "https://jamesmayr.com/pitchplayer/",
					date: "September 7, 2017",
					description: "With pitchPlayer and the audio API, composers can sequence notes like a player piano."
				},
				{
					name: "pixelPainter",
					size: "small",
					tags: ["code","art"],
					url: "https://jamesmayr.com/pixelpainter/",
					date: "June 10, 2017",
					description: "With pixelPainter, blocky 8-bit art is just a click-and-drag away."
				},
				{
					name: "quoteTyper",
					size: "small",
					tags: ["code"],
					url: "https://jamesmayr.com/quotetyper/",
					date: "September 18, 2017",
					description: "quoteTyper measures your typing speed, pulling text from the Quotes on Design API."
				},
				{
					name: "robotDirector",
					size: "medium",
					tags: ["code","games"],
					url: "https://jamesmayr.com/robotdirector/",
					date: "January 25, 2017",
					description: "In robotDirector, players must guide simple bots to a color-coded collection point."
				},
				{
					name: "runJumper",
					size: "small",
					tags: ["games","code"],
					url: "https://jamesmayr.com/runjumper/",
					date: "September 14, 2018",
					description: "Help the robot collect energy orbs in runJumper, a randomly generated platformer."
				},
				{
					name: "shapeAnimator",
					size: "medium",
					tags: ["code","art"],
					url: "https://jamesmayr.com/shapeanimator/",
					date: "February 9, 2017",
					description: "Use shapeAnimator to create, style, and sequence animations for polygons."
				},
				{
					name: "snakeSnacker",
					size: "small",
					tags: ["code","games"],
					url: "https://jamesmayr.com/snakesnacker/",
					date: "September 26, 2017",
					description: "snakeSnacker is a web clone of the classic arcade game."
				},
				{
					name: "stockTracker",
					size: "medium",
					tags: ["code"],
					url: "https://jamesmayr.com/stocktracker/",
					date: "December 25, 2017",
					description: "Use the AlphaVantage API to measure a stock's success over 12 months with stockTracker."
				},
				{
					name: "tickTocker",
					size: "small",
					tags: ["code"],
					url: "https://jamesmayr.com/ticktocker/",
					date: "January 22, 2017",
					description: "tickTocker is a clock."
				},
				{
					name: "tileSlider",
					size: "small",
					tags: ["code","games"],
					url: "https://jamesmayr.com/tileslider/",
					date: "January 23, 2017",
					description: "tileSlider is an online version of the 15-puzzle sliding game."
				},
				{
					name: "weatherExplorer",
					size: "medium",
					tags: ["code"],
					url: "https://jamesmayr.com/weatherexplorer/",
					date: "June 10, 2017",
					description: "Using the OpenWeather and Google Places APIs, weatherExplorer can take you anywhere in the world - randomly."
				},
				{
					name: "wordFinder",
					size: "medium",
					tags: ["code","games"],
					url: "https://jamesmayr.com/wordfinder/",
					date: "July 9, 2016",
					description: "wordFinder is a web game in the style of Boggle, using an online dictionary."
				},
				{
					name: "wordsearchBuilder",
					size: "small",
					tags: ["code"],
					url: "https://jamesmayr.com/wordsearchbuilder/",
					date: "April 14, 2018",
					description: "Generate puzzles in wordsearchBuilder, a web workers-powered Javascript tool."
				},
				{
					name: "xmlParser",
					size: "small",
					tags: ["code"],
					url: "https://jamesmayr.com/xmlparser/",
					date: "September 10, 2017",
					description: "xmlParser is a Javascript web tool for converting XML into JSON."
				},
				{
					name: "melodemons",
					size: "large",
					tags: ["games","code","music"],
					url: "http://www.melodemons.com",
					date: "October 9, 2018",
					description: "Melodemons is a real-time multiplayer music-based post-capturing platformer."
				},
				{
					name: "flagMaker",
					size: "medium",
					tags: ["art","code"],
					url: "https://jamesmayr.com/flagmaker/",
					date: "November 15, 2018",
					description: "With flagMaker, randomly generate amazing flags - or build your own."
				},
				{
					name: "The Council",
					size: "medium",
					tags: ["games","code"],
					url: "https://thecouncilgame.herokuapp.com",
					date: "November 30, 2018",
					description: "Keep the republic from crumbling - rule the fantasy realm together in The Council, a game of politics and persuasion."
				},
				{
					name: "beambouncer",
					size: "small",
					tags: ["games","code"],
					url: "https://beambouncer.herokuapp.com",
					date: "December 26, 2018",
					description: "BeamBouncer is a 2-player co-op radial pong game - keep the colored beams inside the arena!"
				},
				{
					name: "snowflakeMaker",
					size: "small",
					tags: ["art","code"],
					url: "https://jamesmayr.com/snowflakemaker/",
					date: "January 1, 2019",
					description: "Draw hexagonally symmetrical snowflakes in this canvas-powered web app."
				}
			]

		/* controls */
			var tags  = {
				"code":           "{}",
				"music":          "&#9835;",
				"games":          "&#9816;",
				"writing":        "&#9998;",
				"art":            "&#8862;",
				"collaborations": "&#8258;"
			}
			
	/*** build ***/
		/* buildGrid */
			buildGrid()
			function buildGrid() {
				// clear grid
					Array.from(document.querySelectorAll(".project")).forEach(function (project) {
						project.remove()
					})

				// sort
					var sortedProjects = chronologicalSort(projects)

				// tags
					var selectedTags  = Array.from(document.querySelectorAll("#controls-tags  .filter[selected]")) || []
						selectedTags  =  selectedTags.map(function(button) {
							return button.value
						}) || Object.keys(tags)

				// build projects
					for (var p in projects) {
						var tagged = false
						for (var t in projects[p].tags) {
							if (selectedTags.includes(projects[p].tags[t])) {
								tagged = true
								break
							}
						}

						if (tagged) {
							document.body.appendChild(buildProject(projects[p]))
						}
					}
			}

		/* buildProject */
			function buildProject(project) {
				// container
					var element = document.createElement("div")
						element.className = "project"
						element.id = project.name.toLowerCase().replace(/[^A-Za-z0-9]/g,"")

				// image
					var image   = document.createElement("div")
						image.className = "image"
						image.style["background-image"] = "url('resources/logos/" + project.name.toLowerCase().replace(/[^A-Za-z0-9]/g,"") + ".png')"
					element.appendChild(image)

				// content
					var content = document.createElement("div")
						content.className = "content"
					element.appendChild(content)

				// name
					var name    = document.createElement("div")
						name.className = "name"
					content.appendChild(name)

					var innerN  = document.createElement("h2")
						innerN.className = "name-inner"
						innerN.innerText = project.name
					name.appendChild(innerN)

				// summary
					var summary = document.createElement("div")
						summary.className = "summary"
					content.appendChild(summary)

					var innerS  = document.createElement("p")
						innerS.className = "summary-inner"
						innerS.innerText = project.description
					summary.appendChild(innerS)

				// tags
					var tagBlock = document.createElement("div")
						tagBlock.className = "tags"
					content.appendChild(tagBlock)

					for (var t in project.tags) {
						var tag = document.createElement("div")
							tag.className = "tag " + project.tags[t]
							tag.innerHTML = tags[project.tags[t]]
							tag.title     = project.tags[t]
						tagBlock.appendChild(tag)
					}

					var date = document.createElement("div")
						date.className = "date"
						date.innerHTML = ("0" + String(new Date(project.date).getMonth() + 1)).slice(-2) + "/" + String(new Date(project.date).getYear() + 1900)
						date.title     = project.date
					tagBlock.appendChild(date)

				// link
					if (project.url && project.url.length > 1) {
						var link = document.createElement("a")
							link.className = "link"
							link.innerHTML = "&#10140;"
							link.href      = project.url
							link.target    = "_blank"
						content.appendChild(link)
					}

				return element
			}

	/*** filter ***/
		/* selectFilter */
			var filterArray = Array.from(document.querySelectorAll("#controls-tags .filter"))
				filterArray.forEach(function(element) {
					element.addEventListener("click", selectFilter)
				})
			function selectFilter(event) {
				if (event.target.getAttribute("selected")) {
					event.target.removeAttribute("selected")
				}
				else {
					event.target.setAttribute("selected", true)
				}

				buildGrid()
			}

	/*** sort ***/
		/* chronologicalSort */
			function chronologicalSort(arr) {
				return arr.sort(function(a, b) {
					return ((new Date(b.date).getTime()) - (new Date(a.date).getTime()))
				})
			}

}