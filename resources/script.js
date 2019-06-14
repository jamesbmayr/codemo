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
					url: "https://jamesmayr.com/music/?album=eternalhorizon",
					date: "June 1, 2007",
					description: "Eternal Horizon was the first album I composed - entirely orchestral music, in Finale - and it set the standard: 16 songs and 1 hour."
				},
				{
					name: "Skyburst",
					size: "large",
					tags: ["music"],
					url: "https://jamesmayr.com/music/?album=skyburst",
					date: "May 1, 2008",
					description: "I composed Skyburst over the course of a year; this album reflects a wild exploration of melody without much structure."
				},
				{
					featured: true,
					name: "Explorchestra",
					size: "extra-large",
					tags: ["collaborations","music"],
					url: "https://www.facebook.com/buexplorchestra",
					date: "Octboer 1, 2009",
					description: "I co-founded Explorchestra, a student ensemble at SUNY Binghamton where all the music - in every genre and style - is composed by members."
				},
				{
					name: "Shadow Valley",
					size: "large",
					tags: ["music"],
					url: "https://jamesmayr.com/music/?album=shadowvalley",
					date: "December 1, 2009",
					description: "Shadow Valley, with a focus on structure and counterpoint, came at the beginning stages of my music theory and history education."
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
					url: "https://jamesmayr.com/music/?album=draftsadrift",
					date: "December 1, 2010",
					description: "The first Drafts Adrift collection represents my love of video game music, from catchy melodies to looping scenic soundtracks."
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
					url: "https://jamesmayr.com/music/?album=cascade",
					date: "February 15, 2011",
					description: "Cascade, released after completing the titular \"symphony,\" is filled with orchestral music made with the Explorchestra ensemble in mind."
				},
				{
					name: "Epic of Koranames",
					size: "extra-large",
					tags: ["writing"],
					url: "#",
					date: "October 18, 2011",
					description: "I wrote an epic poem - the Epic of Koranames - 5000 lines of rhythmic and rhyming fantasy adventure."
				},
				{
					name: "Drafts Adrift 2",
					size: "large",
					tags: ["music"],
					url: "https://jamesmayr.com/music/?album=draftsadrift2",
					date: "December 1, 2011",
					description: "Drafts Adrift 2 is a combination of various projects - including video game soundtracks, avant garde experiments, and some lyrical tracks."
				},
				{
					featured: true,
					name: "Captain Chrono",
					size: "large",
					tags: ["music"],
					url: "https://jamesmayr.com/music/?album=captainchronosailsthroughtime",
					date: "April 1, 2012",
					description: "After studying musical traditions from all over the world, I created a concept album to explore time and space with Captain Chrono."
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
					featured: true,
					name: "Adventure",
					size: "large",
					tags: ["games","code"],
					url: "https://docs.google.com/document/d/1RQF1dKAb19yVgWsmagPAzSqaGjjm2ZPHnCLDD-FyQXw/edit?usp=sharing",
					date: "September 1, 2012",
					description: "Adventure is a simplified pen-and-paper role playing game set in a fantasy world with a balance of combat, puzzle-solving, and character growth."
				},
				{
					featured: true,
					name: "Penduluminous",
					size: "large",
					tags: ["music","writing"],
					url: "https://jamesmayr.com/music/?album=penduluminous",
					date: "November 1, 2012",
					description: "My first post-college album, Penduluminous is all about swing - with 16 vocal tracks all set in different jazz and pop styles."
				},
				{
					featured: true,
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
					featured: true,
					name: "The Deathmakers' Symphony",
					size: "large",
					tags: ["music","writing"],
					url: "https://jamesmayr.com/music/?album=thedeathmakerssymphony",
					date: "May 1, 2013",
					description: "This is an epic fantasy adventure set to sweeping orchestral music, released with a corresponding poem."
				},
				{
					featured: true,
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
					tags: ["collaborations","design"],
					url: "https://www.facebook.com/apollo.feeney.mayr/",
					date: "July 31, 2014",
					description: "Apollo is such a good boy that he types his own Facebook statuses with his own four paws."
				},
				{
					featured: true,
					name: "Clevernacular",
					size: "large",
					tags: ["writing","design"],
					url: "http://clevernacular.tumblr.com",
					date: "December 2, 2014",
					description: "Clevernacular is a blog about how amazing everyday design can be - a celebration of the brilliance all around us."
				},
				{
					featured: true,
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
					tags: ["design"],
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
					featured: true,
					name: "Portmantoasters",
					size: "medium",
					tags: ["writing"],
					url: "https://portmantoasters.tumblr.com",
					date: "December 2, 2015",
					description: "Portmantoasters are word puzzles with two words overlapped into one - and this was a daily blog challenging readers to figure them out."
				},
				{
					featured: true,
					name: "Underblue",
					size: "extra-large",
					tags: ["collaborations","music","design"],
					url: "https://www.facebook.com/officialunderblue",
					date: "March 30, 2016",
					description: "I composed and played piano and clarinet in Underblue, performing across New York City venues in this 5-person rock and indie pop band."
				},
				{
					featured: true,
					name: "Singles",
					size: "large",
					tags: ["music","writing"],
					url: "https://jamesmayr.com/music/?album=singles",
					date: "May 30, 2016",
					description: "Singles saw my return to lyrical composition with an emotional journey told through 16 alternative rock, pop, and jazz songs."
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
					url: "https://aiarenas.herokuapp.com",
					date: "May 1, 2017",
					description: "AI Arenas is a web game where javascript robots battle for cubes in a competitive coding arena."
				},
				{
					name: "Passenger EP",
					size: "large",
					tags: ["collaborations","music"],
					url: "https://itunes.apple.com/us/album/passenger-ep/id1258446913?app=itunes&ign-mpt=uo%3D4",
					date: "June 1, 2017",
					description: "Underblue's debut EP, featuring me on the keyboard, Passenger includes five pop songs - including one I composed."
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
					featured: true,
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
					featured: true,
					name: "CoColors",
					size: "medium",
					tags: ["design","code"],
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
					featured: true,
					name: "Switchonyms",
					size: "large",
					tags: ["games","code"],
					url: "http://www.switchonyms.com",
					date: "February 1, 2018",
					description: "Switchonyms is a chaotic party game for 4+ players - guess words to get points, but lose them the longer it takes opponents to guess."
				},
				{
					featured: true,
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
					featured: true,
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
					tags: ["design","code"],
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
					tags: ["design","code","music"],
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
					featured: true,
					name: "laserSimulator",
					size: "large",
					tags: ["code","design"],
					url: "https://jamesmayr.com/lasersimulator/",
					date: "June 28, 2018",
					description: "With laserSimulator, manipulate light using prisms, refractors, mirrors, and more."
				},
				{
					featured: true,
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
					tags: ["code","design"],
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
					tags: ["design","code"],
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
					tags: ["design","code"],
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
					featured: true,
					name: "flagMaker",
					size: "medium",
					tags: ["design","code"],
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
					featured: true,
					name: "snowflakeMaker",
					size: "small",
					tags: ["design","code"],
					url: "https://jamesmayr.com/snowflakemaker/",
					date: "January 1, 2019",
					description: "Draw hexagonally symmetrical snowflakes in this canvas-powered web app."
				},
				{
					featured: true,
					name: "spriteMaker",
					size: "small",
					tags: ["design","code"],
					url: "https://jamesmayr.com/spritemaker/",
					date: "January 3, 2019",
					description: "Create colored videogame sprites to export as images or canvas coordinates."
				},
				{
					name: "meteoriteMiner",
					size: "small",
					tags: ["collaborations","games","code"],
					url: "https://jamesmayr.com/meteoriteminer/",
					date: "January 14, 2019",
					description: "Liz Ford & I built a local 2-player minigame where lunar rovers race to collect falling space rocks."
				},
				{
					name: "pitchMatcher",
					size: "small",
					tags: ["code","music"],
					url: "https://jamesmayr.com/pitchmatcher/",
					date: "January 19, 2019",
					description: "Match pure tones by whistling or singing into the mic in this canvas / webaudio demo."
				},
				{
					featured: true,
					name: "polyhedronPlayer",
					size: "small",
					tags: ["code","design"],
					url: "https://jamesmayr.com/polyhedronplayer/",
					date: "January 22, 2019",
					description: "Project 3D down to 2D in this canvas-powered Platonic solids visualizer."
				},
				{
					featured: true,
					name: "nimbusNotes",
					size: "small",
					tags: ["collaborations","code","design","music"],
					url: "https://nimbusnotes.herokuapp.com",
					date: "February 2, 2019",
					description: "This web-audio / canvas / websockets raincloud soundscape was built with Liz Ford at a hackathon."
				}
			]

		/* tags */
			var tags  = {
				"code":           "{}",
				"music":          "&#9835;",
				"writing":        "&#9998;",
				"games":          "&#9816;",
				"collaborations": "&#8258;",
				"design":          "&#8862;"
			}
			
	/*** build ***/
		/* buildGrid */
			buildGrid()
			function buildGrid() {
				// sort
					var sortedProjects = sortProjects(projects)

				// build projects
					for (var p in projects) {
						if (projects[p].featured) {
							document.getElementById(projects[p].tags[0]).querySelector(".section-featured").appendChild(buildProject(projects[p]))
						}
						else {
							document.getElementById(projects[p].tags[0]).querySelector(".section-more"    ).appendChild(buildProject(projects[p]))
						}
					}
			}

		/* sortProjects */
			function sortProjects(arr) {
				return arr.sort(function(a, b) {
					return ((new Date(b.date).getTime()) - (new Date(a.date).getTime()))
				})
			}

		/* buildProject */
			function buildProject(project) {
				// container
					if (project.url && project.url.length > 1) {
						var element = document.createElement("a")
							element.href = project.url
							element.target = "_blank"
					}
					else {
						var element = document.createElement("div")
					}
						element.className = "project"
						element.id = project.name.toLowerCase().replace(/[^A-Za-z0-9]/g,"")

				// image
					var image   = document.createElement("div")
						image.className = "project-image"
						image.style["background-image"] = "url('/resources/logos/" + project.name.toLowerCase().replace(/[^A-Za-z0-9]/g,"") + ".png')"
						image.setAttribute("alt", project.name)
						image.setAttribute("title", project.name)
					element.appendChild(image)

				// content
					var content = document.createElement("div")
						content.className = "project-content"
					element.appendChild(content)

				// name
					var name           = document.createElement("div")
						name.className = "project-name"
						name.innerText = project.name
					content.appendChild(name)

				// summary
					var summary = document.createElement("p")
						summary.className = "project-summary"
						summary.innerText = project.description
					content.appendChild(summary)

				return element
			}

	/*** game ***/
		/* globals */
			var game = {}
			var footer = document.getElementById("footer")

		/* changeGame */
			document.getElementById("j-logo").addEventListener("click", changeGame)
			function changeGame(event) {
				if (game.isPlaying) {
					// reset
						clearInterval(game.loop)
						game.loop = null
						game.score = 0
						game.isPlaying = false

					// fade each j
						Array.from(document.querySelectorAll(".j")).forEach(function(j) {
							j.setAttribute("fade", true)
						})

					// remove each j
						setTimeout(function() {
							Array.from(document.querySelectorAll(".j")).forEach(function(j) {
								j.remove()
							})
						}, 500)
				}
				else {
					// reset
						game.score = 0
						game.isPlaying = true

					// game loop
						game.loop = setInterval(updateGame, 50)
				}
			}

		/* updateGame */
			function updateGame() {
				// update counter
					game.counter = game.counter ? game.counter - 1 : 9

				// create if necessary
					var jArray = Array.from(document.querySelectorAll(".j"))
					if (!game.counter && jArray.length < 100) {
						createJ()
					}

				// update positions
					updatePositions(jArray)
			}

		/* createJ */
			function createJ() {
				// new element above screen, random left and speed
					var j = document.createElement("button")
						j.className = "j"
						j.style.left = (Math.floor(Math.random() * (window.innerWidth - 150)) + 50) + "px"
						j.style.top = "-50px"
						j.setAttribute("speed", Math.min(20, Math.max(5, Math.floor(Math.random() * game.score / 2))))
						j.addEventListener("click", clickJ)
					document.body.appendChild(j)
			}

		/* updatePositions */
			function updatePositions(jArray) {
				// get positions
					var scrollOffset = (window.pageYOffset || document.documentElement.scrollTop)
					var footerRect = footer.getBoundingClientRect()
					var fadePoint = scrollOffset + footerRect.top
					var removePoint = scrollOffset + footerRect.bottom

				// update each j
					for (var i in jArray) {
						var j = jArray[i]
						var jTop = Number(j.style.top.replace("px",""))

						if (jTop > removePoint) {
							j.remove()
						}
						else {
							j.style.top = jTop + Number(j.getAttribute("speed")) + "px"

							if (jTop > fadePoint) {
								j.setAttribute("fade", true)
							}
						}
					}
			}

		/* clickJ */
			function clickJ(event) {
				// remove element
					event.target.remove()

				// increase score
					game.score++
			}

}