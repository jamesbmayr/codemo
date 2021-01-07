window.onload = function() {
	/*** globals ***/
		/* projects */
			const PROJECTS = {
				adventure: {
					name: "Adventure",
					size: "large",
					tags: ["games","code","fantasy","node","websockets","mongo","canvas","tabletop","multiplayer"],
					date: "May 15, 2020",
					description: "Adventure is a simplified pen-and-paper role playing game set in a fantasy world with a balance of combat, puzzle-solving, and character growth."
				},
				aiarenas: {
					name: "AI Arenas",
					size: "extra-large",
					tags: ["code","games","scifi","ai","multiplayer","node","websockets","mongo","simulation"],
					date: "May 1, 2017",
					description: "AI Arenas is a web game where javascript robots battle for cubes in a competitive coding arena."
				},
				arrowsmasher: {
					name: "arrowSmasher",
					size: "small",
					tags: ["code","games","arcade"],
					date: "June 5, 2020",
					description: "arrowSmasher is a web game played in the tab title by pressing arrow keys"
				},
				balloonpopper: {
					name: "balloonPopper",
					size: "small",
					tags: ["code","games","arcade"],
					date: "Februray 8, 2017",
					description: "balloonPopper is a simple web game - pop the balloons before they float away!"
				},
				baseconverter: {
					name: "baseConverter",
					size: "small",
					tags: ["code","math","tool"],
					date: "May 29, 2020",
					description: "Convert numbers from one base (from 2 to 36) to any other in an instant."
				},
				beambouncer: {
					name: "beambouncer",
					size: "small",
					tags: ["games","code","arcade","multiplayer","node","websockets","canvas"],
					date: "December 26, 2018",
					description: "BeamBouncer is a 2-player co-op radial pong game - keep the colored beams inside the arena!"
				},
				bladesdodger: {
					name: "bladesDodger",
					size: "small",
					tags: ["code","games","arcade"],
					date: "June 20, 2017",
					description: "bladesDodger is a simple web game - click the dots, but dodge the spinning blades!"
				},
				blockdescender: {
					name: "blockDescender",
					size: "small",
					tags: ["code","games","arcade"],
					date: "October 4, 2017",
					description: "blockDescender is a web clone of Tetris, where players must fit colored blocks together."
				},
				breakout: {
					name: "breakout",
					size: "small",
					tags: ["code","games","arcade","unity"],
					date: "June 7, 2020",
					description: "This is a Unity demo of the classic game, built step-by-step from a Youtube tutorial."
				},
				brickbreaker: {
					name: "brickBreaker",
					size: "small",
					tags: ["code","games","arcade"],
					date: "October 5, 2017",
					description: "The classic ball-and-paddle game, built from scratch as a javascript web demo."
				},
				cableconnector: {
					name: "cableConnector",
					size: "small",
					tags: ["code","games","puzzle"],
					date: "February 14, 2020",
					description: "Pull the cords from start to socket in this puzzle of non-overlapping lines."
				},
				captainchronosailsthroughtime: {
					name: "Captain Chrono Sails Through Time",
					size: "large",
					tags: ["music","fantasy","scifi","synth","orchestral","jazz","piano"],
					date: "April 1, 2012",
					description: "After studying musical traditions from all over the world, I created a concept album to explore time and space with Captain Chrono."
				},
				cascade: {
					name: "Cascade",
					size: "large",
					tags: ["music","fantasy","orchestral","pop","piano","lyric"],
					date: "February 15, 2011",
					description: "Cascade, released after completing the titular \"symphony,\" is filled with orchestral music made with the Explorchestra ensemble in mind."
				},
				catchaser: {
					name: "catChaser",
					size: "small",
					tags: ["code","games","arcade"],
					date: "May 8, 2019",
					description: "A simple javascript game of cat and mouse, with artwork from opengameart.org"
				},
				chalice: {
					name: "Chalice",
					size: "extra-large",
					tags: ["games","collaborations","code","card","tabletop","multiplayer","node","websockets","mongo","fantasy"],
					date: "March 21, 2015",
					description: "Funded on Kickstarter, Chalice is a card game (and web game) of death and deception where players poison their friends for fun."
				},
				checkers: {
					name: "checkers",
					size: "small",
					tags: ["code","games","board","tabletop","multiplayer","unity"],
					date: "June 14, 2020",
					description: "This is a Unity demo of the classic game, built step-by-step from a Youtube tutorial."
				},
				checkersplayer: {
					name: "checkersPlayer",
					size: "medium",
					tags: ["code","games","board","tabletop","ai","multiplayer"],
					date: "November 21, 2017",
					description: "checkersPlayer is a Javascript web clone featuring PVP and AI match-ups."
				},
				chess: {
					name: "Chess",
					size: "large",
					tags: ["collaborations","code","games","tabletop","board","multiplayer"],
					date: "July 5, 2018",
					description: "This PVP chess clone was built in collaboration with Max Pekarsky."
				},
				chordanalyzer: {
					name: "chordAnalyzer",
					size: "medium",
					tags: ["code","music","audio","piano","synth","tool"],
					date: "January 6, 2017",
					description: "Coded now as a playable javascript piano, chordAnalyzer was once a Wolfram Mathematica function made to do my music theory homework."
				},
				chromacreatures: {
					name: "chromaCreatures",
					size: "medium",
					tags: ["code","games","arcade","scifi"],
					date: "January 2, 2018",
					description: "chromaCreatures is a challenging shoot-em-up arcade game - players use a monochromatic blaster to fend off hybrid-hued enemies."
				},
				clevernacular: {
					name: "Clevernacular",
					size: "large",
					tags: ["writing","design","prose","art"],
					date: "December 2, 2014",
					description: "Clevernacular is a blog about how amazing everyday design can be - a celebration of the brilliance all around us."
				},
				clickclique: {
					name: "ClickClique",
					size: "small",
					tags: ["code","websockets","multiplayer"],
					date: "April 25, 2018",
					description: "ClickClique is a PVP real-time clicking competition, built with nodeJS and websockets."
				},
				clippather: {
					name: "clipPather",
					size: "medium",
					tags: ["design","code","draw","tool"],
					date: "April 22, 2016",
					description: "clipPather is a constantly evolving Javascript tool for drawing with CSS clip-paths."
				},
				clouds: {
					name: "clouds",
					size: "small",
					tags: ["code","canvas","art"],
					date: "January 15, 2019",
					description: "A simple animation of cartoon clouds floating by, built for a tech demo at work."
				},
				cocolors: {
					name: "CoColors",
					size: "medium",
					tags: ["design","code","node","websockets","canvas","multiplayer","draw","tool"],
					date: "November 15, 2017",
					description: "CoColors is a real-time collaborative drawing tool. Create a canvas and start making art with friends."
				},
				codebreaker: {
					name: "codeBreaker",
					size: "small",
					tags: ["code","games","puzzle"],
					date: "October 28, 2019",
					description: "In codeBreaker, you must guess the computer's secret combination through guess and check."
				},
				coderunner: {
					name: "codeRunner",
					size: "small",
					tags: ["code","tool","simulation"],
					date: "May 3, 2017",
					description: "Built as part of AI Arenas, this web app evaluates your custom javascript in slow motion."
				},
				colorflooder: {
					name: "colorFlooder",
					size: "small",
					tags: ["code","games","puzzle"],
					date: "January 19, 2017",
					description: "colorFlooder is a web game where players click squares to collapse a grid to one color."
				},
				couplets: {
					name: "couplets",
					size: "medium",
					tags: ["writing","collaborations","api","lyric","poetry"],
					date: "July 22, 2019",
					description: "Couplets is a collaborative poetry project, a timeline of rhyming adventures with Liz Ford."
				},
				diamondcheckers: {
					name: "Diamond Checkers",
					size: "large",
					tags: ["games","code","node","mongo","tabletop","board","multiplayer"],
					date: "March 1, 2017",
					description: "Originally an abstract strategy game I designed long ago, Diamond Checkers is a node.js web game, a battle of wits for two players."
				},
				diceroller: {
					name: "diceRoller",
					size: "small",
					tags: ["code","math","tool"],
					date: "April 26, 2016",
					description: "One of my first coding projects: a random number generator in the form of dice."
				},
				dotconnector: {
					name: "dotConnector",
					size: "small",
					tags: ["code","games","svg","puzzle"],
					date: "September 2, 2017",
					description: "This connect-the-dots game randomly generates points you must connect with non-overlapping lines."
				},
				draftsadrift: {
					name: "Drafts Adrift",
					size: "large",
					tags: ["music","scifi","orchestral","jazz","pop","synth","piano"],
					date: "December 1, 2010",
					description: "The first Drafts Adrift collection represents my love of video game music, from catchy melodies to looping scenic soundtracks."
				},
				draftsadrift2: {
					name: "Drafts Adrift 2",
					size: "large",
					tags: ["music","scifi","orchestral","jazz","pop","synth","piano","lyric"],
					date: "December 1, 2011",
					description: "Drafts Adrift 2 is a combination of various projects - including video game soundtracks, avant garde experiments, and some lyrical tracks."
				},
				dreamhatcher: {
					name: "Dreamhatcher",
					size: "extra-large",
					tags: ["games","tabletop","board","card","puzzle","multiplayer"],
					date: "April 1, 2014",
					description: "DreamHatcher offers dozens of free print-and-play tabletop games - and tons of templates to help aspiring designers craft their own."
				},
				dynasty: {
					name: "Dynasty",
					size: "large",
					tags: ["games","code","node","websockets","tabletop","card","multiplayer"],
					date: "December 30, 2020",
					description: "This multi-player multi-round elimination card game is all about becoming the next king."
				},
				eternalhorizon: {
					name: "Eternal Horizon",
					size: "large",
					tags: ["music","fantasy","orchestral"],
					date: "June 1, 2007",
					description: "Eternal Horizon was the first album I composed - entirely orchestral music, in Finale - and it set the standard: 16 songs and 1 hour."
				},
				explorchestra: {
					name: "Explorchestra",
					size: "extra-large",
					tags: ["collaborations","music","orchestral","jazz","pop","synth","lyric","piano"],
					date: "Octboer 1, 2009",
					description: "I co-founded Explorchestra, a student ensemble at SUNY Binghamton where all the music - in every genre and style - is composed by members."
				},
				factorfinder: {
					name: "factorFinder",
					size: "small",
					tags: ["code","math","tool"],
					date: "April 30, 2019",
					description: "Find the factors and interesting facts of any number you input."
				},
				flagmaker: {
					name: "flagMaker",
					size: "medium",
					tags: ["design","code","canvas","fantasy","scifi","art","tool"],
					date: "November 15, 2018",
					description: "With flagMaker, randomly generate amazing flags - or build your own."
				},
				flashcardmemory: {
					name: "Flash Card Memory",
					size: "medium",
					tags: ["games","code","node","mongo","card","tool"],
					date: "March 20, 2020",
					description: "Build your own deck of flash cards or find a friend's to play the classic matching game."
				},
				firestormsea: {
					name: "Firestorm Sea",
					size: "large",
					tags: ["games","fantasy","art"],
					date: "April 16, 2020",
					description: "An HD world map of a fantasy realm, revised and expanded over more than a decade."
				},
				fourconnector: {
					name: "fourConnector",
					size: "small",
					tags: ["code","games","tabletop","board","multiplayer"],
					date: "December 20, 2018",
					description: "It's four-in-a-row in this popular gravity-based strategy game for 2 players."
				},
				gamestimeline: {
					name: "GamesTimeline",
					size: "medium",
					tags: ["code","node","api","canvas","tool"],
					date: "July 10, 2018",
					description: "See how videogame series perform over time, using <canvas> and the IGDB API."
				},
				goodscounter: {
					name: "goodsCounter",
					size: "small",
					tags: ["code","tool"],
					date: "January 24, 2018",
					description: "This is a companion app for Goods, a multi-player strategy card game."
				},
				graphmaker: {
					name: "graphMaker",
					size: "medium",
					tags: ["code","canvas","math","tool","simulation"],
					date: "November 26, 2017",
					description: "Use graphMaker to plot mathematical functions on a Cartesian grid."
				},
				griddrawer: {
					name: "gridDrawer",
					size: "medium",
					tags: ["design","code","music","canvas","audio","math","tool","draw","simulation"],
					date: "August 7, 2018",
					description: "gridDrawer is a tool for art and music - draw strings on a pegboard, then play them!"
				},
				hexagonplacer: {
					name: "hexagonPlacer",
					size: "medium",
					tags: ["code","games","puzzle"],
					date: "November 14, 2020",
					description: "This puzzle challenges you to fit all the random hexagon chunks back on the board."
				},
				hexsequencer: {
					name: "hexSequencer",
					size: "small",
					tags: ["code","games","audio","arcade"],
					date: "November 20, 2017",
					description: "hexSequencer is a memory game like Simon, with 6 musical colored lights."
				},
				htmlconverter: {
					name: "htmlConverter",
					size: "small",
					tags: ["code","tool","simulation"],
					date: "April 26, 2016",
					description: "This tool renders your text input as actual html elements."
				},
				huematcher: {
					name: "hueMatcher",
					size: "small",
					tags: ["code","games","puzzle"],
					date: "September 14, 2017",
					description: "In hueMatcher, adjust red, green, and blue to match the randomly generated color."
				},
				inputdetector: {
					name: "inputDetector",
					size: "small",
					tags: ["code","tool"],
					date: "January 15, 2020",
					description: "A handy tool for determining which inputs are working on your device / browser / OS."
				},
				itswhoiamb: {
					name: "It's Who Iamb",
					size: "large",
					tags: ["writing","lyric","poetry"],
					date: "December 2, 2012",
					description: "It's Who Iamb was a poetry blog that updated every day for a year, serving now as a series of snapshots of the past."
				},
				keyspinner: {
					name: "keySpinner",
					size: "small",
					tags: ["code","games","puzzle"],
					date: "March 18, 2020",
					description: "In this puzzle, rotate the pieces until they perfectly fit the key slot."
				},
				lasersimulator: {
					name: "laserSimulator",
					size: "large",
					tags: ["code","canvas","simulation"],
					date: "June 28, 2018",
					description: "With laserSimulator, manipulate light using prisms, refractors, mirrors, and more."
				},
				letterguesser: {
					name: "letterGuesser",
					size: "small",
					tags: ["code","games","puzzle","tabletop","multiplayer"],
					date: "December 21, 2020",
					description: "Play hangman against a bank of tens of thousands of common words."
				},
				lexpose: {
					name: "Lexpose",
					size: "extra-large",
					tags: ["writing","prose"],
					date: "May 1, 2015",
					description: "Lexpose is a collection of original short-form fiction I've written, in college and afterwards."
				},
				lockturner: {
					name: "lockTurner",
					size: "small",
					tags: ["code","games","puzzle"],
					date: "January 22, 2020",
					description: "A combination lock puzzle where sensing vibrations helps you know how to rotate a dial."
				},
				magnetmaker: {
					name: "magnetMaker",
					size: "large",
					tags: ["code","canvas","simulation"],
					date: "April 25, 2018",
					description: "magnetMaker is a pseudo-realistic physics simulator with magnetic spheres and tons of forces."
				},
				mazemaker: {
					name: "mazeMaker",
					size: "medium",
					tags: ["code","puzzle","tool","math"],
					date: "September 9, 2018",
					description: "This generates mazes from the outside in, guaranteed to have exactly 1 solution."
				},
				melodemons: {
					name: "melodemons",
					size: "large",
					tags: ["games","code","music","node","websockets","canvas","audio","fantasy","synth","piano","arcade","multiplayer","art"],
					date: "October 9, 2018",
					description: "Melodemons is a real-time multiplayer music-based post-capturing platformer."
				},
				memory: {
					name: "Memory",
					size: "medium",
					tags: ["collaborations","code","games","card","tabletop","multiplayer","tool"],
					date: "August 20, 2017",
					description: "Coded in collaboration with Liz Ford, Memory is a fully customizable card game for two or more brains."
				},
				messageencrypter: {
					name: "messageEncrypter",
					size: "small",
					tags: ["code","puzzle","tool","math"],
					date: "December 7, 2020",
					description: "Encrypt and decrypt secret messages using the Vigenére cipher."
				},
				meteoriteminer: {
					name: "meteoriteMiner",
					size: "small",
					tags: ["collaborations","games","code","canvas","scifi","arcade","multiplayer","art"],
					date: "January 14, 2019",
					description: "Liz Ford & I built a local 2-player minigame where lunar rovers race to collect falling space rocks."
				},
				metromapper: {
					name: "metroMapper",
					size: "medium",
					tags: ["code","svg","art","simulation"],
					date: "October 3, 2017",
					description: "metroMapper is a live map of the NYC subway system, with data sourced from MTA schedules."
				},
				minefinder: {
					name: "mineFinder",
					size: "small",
					tags: ["code","games","puzzle","arcade"],
					date: "December 30, 2017",
					description: "In mineFinder, sweep the randomly generated board flagging mines before you click them!"
				},
				nimbusnotes: {
					name: "nimbusNotes",
					size: "small",
					tags: ["collaborations","code","music","node","websockets","canvas","audio","multiplayer","art"],
					date: "February 2, 2019",
					description: "This web-audio / canvas / websockets raincloud soundscape was built with Liz Ford at a hackathon."
				},
				noughtcrosser: {
					name: "noughtCrosser",
					size: "small",
					tags: ["code","games","ai","multiplayer","tabletop","board"],
					date: "December 20, 2017",
					description: "It's tic-tac-toe, against either another human or an AI opponent."
				},
				numbercruncher: {
					name: "numberCruncher",
					size: "small",
					tags: ["code","math","tool"],
					date: "June 30, 2017",
					description: "This is a strange abacus-like calculator."
				},
				pawnpusher: {
					name: "pawnPusher",
					size: "medium",
					tags: ["games","code","tabletop","board","multiplayer"],
					date: "November 28, 2017",
					description: "An original game, on both cardstock and the web, pawnPusher is about knocking your opponent off the board."
				},
				pegjumper: {
					name: "pegJumper",
					size: "small",
					tags: ["code","games","tabletop","board","puzzle"],
					date: "March 25, 2018",
					description: "This is the classic solitaire game with pegs jumping over each other."
				},
				pencilpather: {
					name: "pencilPather",
					size: "small",
					tags: ["code","design","canvas"],
					date: "November 8, 2017",
					description: "A canvas-powered simple art app for drawing on your screen."
				},
				penduluminous: {
					name: "Penduluminous",
					size: "large",
					tags: ["music","writing","jazz","pop","lyric","piano","poetry"],
					date: "November 1, 2012",
					description: "My first post-college album, Penduluminous is all about swing - with 16 vocal tracks all set in different jazz and pop styles."
				},
				pieceflipper: {
					name: "pieceFlipper",
					size: "small",
					tags: ["code","games","tabletop","board","ai","multiplayer"],
					date: "December 31, 2017",
					description: "An Othello/Reversi clone, pieceFlipper features both PVP and human-vs.-AI games."
				},
				pipestriper: {
					name: "pipeStriper",
					size: "medium",
					tags: ["code","games","puzzle"],
					date: "February 4, 2020",
					description: "This is a puzzle / simulator where you rotate pipes to connect their colors."
				},
				pitchmatcher: {
					name: "pitchMatcher",
					size: "small",
					tags: ["code","music","canvas","audio","puzzle","tool"],
					date: "January 19, 2019",
					description: "Match pure tones by whistling or singing into the mic in this canvas / webaudio demo."
				},
				pitchplayer: {
					name: "pitchPlayer",
					size: "medium",
					tags: ["code","music","audio","piano","synth","tool"],
					date: "September 7, 2017",
					description: "With pitchPlayer and the audio API, composers can sequence notes like a player piano."
				},
				pixelpainter: {
					name: "pixelPainter",
					size: "small",
					tags: ["design","code","draw","art","tool"],
					date: "June 10, 2017",
					description: "With pixelPainter, blocky 8-bit art is just a click-and-drag away."
				},
				pointfinder: {
					name: "pointFinder",
					size: "small",
					tags: ["code","games","canvas","puzzle"],
					date: "April 19, 2020",
					description: "Use an x/y pair of range inputs to drag laser lines and target random points."
				},
				polyhedronplayer: {
					name: "polyhedronPlayer",
					size: "small",
					tags: ["code","canvas","math","art","simulation"],
					date: "January 22, 2019",
					description: "Project 3D down to 2D in this canvas-powered Platonic solids visualizer."
				},
				portmantoasters: {
					name: "Portmantoasters",
					size: "medium",
					tags: ["writing","puzzle"],
					date: "December 2, 2015",
					description: "Portmantoasters are word puzzles with two words overlapped into one - and this was a daily blog challenging readers to figure them out."
				},
				prosandconsole: {
					name: "Pros and Console",
					size: "large",
					tags: ["writing","code","prose"],
					date: "September 30, 2017",
					description: "Pros and Console is a blog that follows the ups and downs of project-oriented programming."
				},
				pulsepather: {
					name: "pulsePather",
					size: "small",
					tags: ["code","music","audio","synth","art","piano"],
					date: "October 22, 2018",
					description: "See a soundboard light up with colors and sounds as you lay out a melody."
				},
				puzzlepatcher: {
					name: "puzzlePatcher",
					size: "medium",
					tags: ["code","games","puzzle"],
					date: "February 22, 2020",
					description: "Random gaps in the grid must be covered by your various patch pieces."
				},
				quotetyper: {
					name: "quoteTyper",
					size: "small",
					tags: ["code","api","tool"],
					date: "September 18, 2017",
					description: "quoteTyper measures your typing speed, pulling text from the Quotes on Design API."
				},
				rectangleplacer: {
					name: "rectanglePlacer",
					size: "small",
					tags: ["code","games","puzzle"],
					date: "August 24, 2020",
					description: "Fit all of the randomly generated rectangles within the available area."
				},
				robotdirector: {
					name: "robotDirector",
					size: "medium",
					tags: ["code","games","scifi","arcade"],
					date: "January 25, 2017",
					description: "In robotDirector, players must guide simple bots to a color-coded collection point."
				},
				rpsrpg: {
					name: "RPS RPG",
					size: "large",
					tags: ["collaborations","code","games","node","websockets","canvas","audio","fantasy","orchestral","synth","multiplayer","ai","arcade","art"],
					date: "November 9, 2019",
					description: "Fight monsters to find the orbs in this 8-bit co-op dungeon crawler. Art by Jenn Levy. Sound by Alex Berg."
				},
				runjumper: {
					name: "runJumper",
					size: "small",
					tags: ["games","code","canvas","scifi","arcade"],
					date: "September 14, 2018",
					description: "Help the robot collect energy orbs in runJumper, a randomly generated platformer."
				},
				shadowvalley: {
					name: "Shadow Valley",
					size: "large",
					tags: ["music","fantasy","orchestral","piano"],
					date: "December 1, 2009",
					description: "Shadow Valley, with a focus on structure and counterpoint, came at the beginning stages of my music theory and history education."
				},
				shapeanimator: {
					name: "shapeAnimator",
					size: "medium",
					tags: ["design","code","art","tool"],
					date: "February 9, 2017",
					description: "Use shapeAnimator to create, style, and sequence animations for polygons."
				},
				singles: {
					name: "Singles",
					size: "large",
					tags: ["music","writing","orchestral","jazz","pop","lyric","piano","poetry"],
					date: "May 30, 2016",
					description: "Singles saw my return to lyrical composition with an emotional journey told through 16 alternative rock, pop, and jazz songs."
				},
				sketchtiler: {
					name: "sketchTiler",
					size: "small",
					tags: ["design","code","canvas","draw","art","tool"],
					date: "December 16, 2020",
					description: "Draw in one area and see your multi-colored design tile across the screen."
				},
				skyburst: {
					name: "Skyburst",
					size: "large",
					tags: ["music","fantasy","orchestral","piano"],
					date: "May 1, 2008",
					description: "I composed Skyburst over the course of a year; this album reflects a wild exploration of melody without much structure."
				},
				snakesnacker: {
					name: "snakeSnacker",
					size: "small",
					tags: ["code","games","arcade"],
					date: "September 26, 2017",
					description: "snakeSnacker is a web clone of the classic arcade game."
				},
				snowflakemaker: {
					name: "snowflakeMaker",
					size: "small",
					tags: ["design","code","canvas","draw","art","tool"],
					date: "January 1, 2019",
					description: "Draw hexagonally symmetrical snowflakes in this canvas-powered web app."
				},
				soundbubbler: {
					name: "soundBubbler",
					size: "small",
					tags: ["code","music","canvas","audio","synth","piano","art","tool"],
					date: "June 15, 2019",
					description: "Built at a music hackathon, soundBubbler is a colorful visualizer for on-screen and MIDI keyboards."
				},
				specterinspectors: {
					name: "Specter Inspectors",
					size: "large",
					tags: ["games","code","node","websockets","mongo","fantasy","tabletop","card","multiplayer"],
					date: "October 27, 2017",
					description: "Specter Inspectors is a game of ghosts and guesses. 5-25 friends gather in-person for a party game of deception and deduction."
				},
				speechrepeater: {
					name: "speechRepeater",
					size: "small",
					tags: ["code","tool","simulation"],
					date: "December 11, 2019",
					description: "Say something and see your device turn your speech into text, then read it back."
				},
				spherecollector: {
					name: "sphereCollector",
					size: "small",
					tags: ["code","games","arcade"],
					date: "June 10, 2017",
					description: "Move your mouse around to collect the bouncing balls before they fade away."
				},
				spritemaker: {
					name: "spriteMaker",
					size: "small",
					tags: ["design","code","canvas","art","draw","tool"],
					date: "January 3, 2019",
					description: "Create colored videogame sprites to export as images or canvas coordinates."
				},
				stocktracker: {
					name: "stockTracker",
					size: "medium",
					tags: ["code","api","canvas","tool"],
					date: "December 25, 2017",
					description: "Use the AlphaVantage API to measure a stock's success over 12 months with stockTracker."
				},
				switchonyms: {
					name: "Switchonyms",
					size: "large",
					tags: ["games","code","node","websockets","multiplayer","tabletop","card"],
					date: "February 1, 2018",
					description: "A chaotic party game for 4+ players - guess words to get points, but lose them the longer it takes opponents to guess."
				},
				thecouncil: {
					name: "The Council",
					size: "medium",
					tags: ["games","code","node","websockets","canvas","fantasy","tabletop","multiplayer"],
					date: "November 30, 2018",
					description: "Keep the republic from crumbling - rule the fantasy realm together in The Council, a game of politics and persuasion."
				},
				thedeathmakerssymphony: {
					name: "The Deathmakers' Symphony",
					size: "large",
					tags: ["music","writing","fantasy","orchestral","lyric","piano","poetry"],
					date: "May 1, 2013",
					description: "This is an epic fantasy adventure set to sweeping orchestral music, released with a corresponding poem."
				},
				ticktocker: {
					name: "tickTocker",
					size: "small",
					tags: ["code","tool"],
					date: "January 22, 2017",
					description: "tickTocker is a clock."
				},
				tictactoe: {
					name: "tictactoe",
					size: "medium",
					tags: ["code","games","unity","tabletop","board","multiplayer"],
					date: "June 20, 2020",
					description: "This is a Unity demo of the classic game, built from scratch with a customizable grid."
				},
				tileslider: {
					name: "tileSlider",
					size: "small",
					tags: ["code","games","puzzle"],
					date: "January 23, 2017",
					description: "tileSlider is an online version of the 15-puzzle sliding game."
				},
				timestopper: {
					name: "timeStopper",
					size: "small",
					tags: ["code","tool"],
					date: "June 6, 2018",
					description: "timestopper is a stopwatch."
				},
				tiprounder: {
					name: "tipRounder",
					size: "small",
					tags: ["code","math","tool"],
					date: "May 31, 2018",
					description: "Use this tool to round your tip to the nearest dollar, quarter, dime, etc."
				},
				tonemaker: {
					name: "toneMaker",
					size: "large",
					tags: ["code","music","audio","synth","piano"],
					date: "February 14, 2018",
					description: "Use the toneMaker synthesizer tool to craft your own sounds, tinkering with parameters in audio visualizations."
				},
				truecolors: {
					name: "True Colors",
					size: "large",
					tags: ["games","code","node","websockets","tabletop","card","multiplayer"],
					date: "October 4, 2020",
					description: "A strategic bluffing asymmetrical card game about colors and symbols and sabotage."
				},
				underblue: {
					name: "Underblue",
					size: "extra-large",
					tags: ["collaborations","music","jazz","pop","lyric","piano"],
					date: "March 30, 2016",
					description: "I composed and played piano and clarinet in Underblue, performing across New York City venues in this 5-person rock and indie pop band."
				},
				unitconverter: {
					name: "unitConverter",
					size: "medium",
					tags: ["code","math","tool"],
					date: "December 24, 2019",
					description: "Convert between all kinds of units measuring all kinds of quantities."
				},
				weatherexplorer: {
					name: "weatherExplorer",
					size: "medium",
					tags: ["code","api","tool"],
					date: "June 10, 2017",
					description: "Use the OpenWeather API and Google Maps API to find the weather for a random location."
				},
				webdepictor: {
					name: "webDepictor",
					size: "small",
					tags: ["code","tool","design"],
					date: "June 19, 2017",
					description: "Generate a web of interconnected items that rearranges itself."
				},
				wheelturner: {
					name: "wheelTurner",
					size: "small",
					tags: ["code","games","puzzle"],
					date: "May 16, 2020",
					description: "Turn one wheel and see it turn another - it's hard to crack, even if you know the code."
				},
				wordcounter: {
					name: "wordCounter",
					size: "small",
					tags: ["code","tool"],
					date: "April 26, 2016",
					description: "One of my first projects; it counts words & characters in any text."
				},
				wordfinder: {
					name: "wordFinder",
					size: "medium",
					tags: ["code","games","tabletop","board","multiplayer"],
					date: "July 9, 2016",
					description: "wordFinder is a web game in the style of Boggle, using an online dictionary."
				},
				wordsblockchain: {
					name: "wordsblockchain",
					size: "large",
					tags: ["games","code","node","websockets","tabletop","multiplayer"],
					date: "November 25, 2018",
					description: "Race your friends to build a chain of connected compound words in this real-time web game."
				},
				wordsearchbuilder: {
					name: "wordsearchBuilder",
					size: "small",
					tags: ["code","puzzle","tool","design"],
					date: "April 14, 2018",
					description: "Generate puzzles in wordsearchBuilder, a web workers-powered Javascript tool."
				},
				wordshuffler: {
					name: "wordShuffler",
					size: "medium",
					tags: ["code","tool"],
					date: "September 18, 2017",
					description: "Get an exhaustive list of anagrams for a word, powered by webworkers."
				},
				wribbon: {
					name: "Wribbon",
					size: "medium",
					tags: ["design","svg","art"],
					date: "June 5, 2015",
					description: "Wribbon is a form of stylized text designed to look like strips of paper folded into letters and numbers."
				},
				xmlParser: {
					name: "xmlParser",
					size: "small",
					tags: ["code","tool"],
					date: "September 10, 2017",
					description: "xmlParser is a Javascript web tool for converting XML into JSON."
				}
			}

		/* elements */
			const ELEMENTS = {
				body: document.body,
				jlogo: document.querySelector("#j-logo"),
				search: document.querySelector("#navigation-search"),
				tags: {
					code: document.querySelector("#info-tag-code"),
					music: document.querySelector("#info-tag-music"),
					writing: document.querySelector("#info-tag-writing"),
					games: document.querySelector("#info-tag-games")
				},
				random: document.querySelector("#info-links-random"),
				projects: document.querySelector("#projects"),
				footer: document.querySelector("#footer")
			}
			
	/*** action ***/
		/* searchOnLoad */
			searchOnLoad()
			function searchOnLoad() {
				try {
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
							searchParameters[searchPairs[i][0]] = searchPairs[i][1] !== undefined ? searchPairs[i][1] : null
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
			function inputSearch(event) {
				try {
					// no search query
						if (!ELEMENTS.search.value || !ELEMENTS.search.value.trim().length) {
							displayProjects(sortProjects(filterProjects(PROJECTS)))
							return
						}

					// invalid search query
						let query = ELEMENTS.search.value.trim().toLowerCase().replace(/[^a-z0-9]/g,"")
						if (!query || !query.length) {
							displayProjects([])
							return
						}

					// filter --> sort --> display
						displayProjects(sortProjects(filterProjects(PROJECTS, {query: query, name: true, tags: true})))
				} catch (error) {}
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
					
					// filter --> sort --> display
						displayProjects(sortProjects(filterProjects(PROJECTS, {query: query, tags: true})))
				} catch (error) {}
			}

		/* clickRandom */
			ELEMENTS.random.addEventListener("click", clickRandom)
			function clickRandom() {
				try {
					// get random key
						let keys = Object.keys(PROJECTS)
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
									projectsArray.push(projectsObject[i])
								}

							// return
								return projectsArray || []
						}

					// add based on search query
						for (let i in projectsObject) {
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
							image.style["background-image"] = "url('" + id + "/banner.png')"
							image.setAttribute("alt", project.name)
							image.setAttribute("title", project.name)
						element.appendChild(image)

					// summary
						let summary = document.createElement("p")
							summary.className = "project-summary"
							summary.innerText = project.description
						element.appendChild(summary)

					// return
						return element
				} catch (error) {}
			}

	/*** game ***/
		/* constants */
			const CONSTANTS = {
				jSize: 50,
				maxCount: 100,
				maxVelocity: 20,
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

							// game loop
								GAME.loop = setInterval(updateGame, CONSTANTS.interval)
								return	
						}

					// playing --> stop
						clearInterval(GAME.loop)
						GAME.loop = null
						GAME.score = 0
						GAME.isPlaying = false

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
							j.addEventListener("click", clickJ)
						document.body.appendChild(j)
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

		/* clickJ */
			function clickJ(event) {
				try {
					// remove element
						fadeJ(event.target)

					// increase score
						GAME.score++
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
}