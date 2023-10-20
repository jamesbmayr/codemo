/*** globals ***/
	/* tags */
		const TAGS = [
			"code","ai","api","extension","math","money","mongo","node","simulation","tool","websockets",
			"music","audio","jazz","orchestral","piano","pop","synth",
			"writing","autobiography","fantasy","lyric","poetry","prose","scifi",
			"game","arcade","board","card","multiplayer","puzzle","tabletop","unity",
			"design","art","canvas","draw","photography","svg",
			"collaboration"
		]

	/* months */
		const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]

	/* projects */
		const PROJECTS = {
			adventure: {
				skipRandom: true,
				name: "Adventure",
				size: "large",
				tags: ["game","code","fantasy","node","websockets","mongo","canvas","tabletop","multiplayer"],
				date: "May 15, 2020",
				description: "Adventure is a simplified pen-and-paper role playing game set in a fantasy world with a balance of combat, puzzle-solving, and character growth."
			},
			aiarenas: {
				skipRandom: true,
				name: "AI Arenas",
				size: "extra-large",
				tags: ["code","game","scifi","ai","multiplayer","node","websockets","mongo","simulation"],
				date: "May 1, 2017",
				description: "AI Arenas is a web game where javascript robots battle for cubes in a competitive coding arena."
			},
			api: {
				skipRandom: true,
				name: "API",
				size: "medium",
				tags: ["code","api","node","tool","math"],
				date: "December 27, 2019",
				description: "Custom APIs derived from other projects, like chordAnalyzer, messageEncrypter, baseConverter, and more."
			},
			arenamapper: {
				skipRandom: true,
				name: "arenaMapper",
				size: "small",
				tags: ["code","fantasy","scifi","canvas","tabletop","tool"],
				date: "January 23, 2021",
				description: "Generate arena maps with customizable size, background, walls types, and features."
			},
			arrowsmasher: {
				name: "arrowSmasher",
				size: "small",
				tags: ["code","game","arcade"],
				date: "June 5, 2020",
				description: "arrowSmasher is a web game played in the tab title by pressing arrow keys."
			},
			artreflector: {
				name: "artReflector",
				size: "small",
				tags: ["code","tool","design","art","canvas","draw"],
				date: "January 14, 2023",
				description: "Paint colored dots, reflected around the center to create rotational designs."
			},
			balloonpopper: {
				name: "balloonPopper",
				size: "small",
				tags: ["code","game","arcade"],
				date: "February 8, 2017",
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
				skipRandom: true,
				name: "beambouncer",
				size: "small",
				tags: ["game","code","arcade","multiplayer","node","websockets","canvas"],
				date: "December 26, 2018",
				description: "BeamBouncer is a 2-player co-op radial pong game - keep the colored beams inside the arena!"
			},
			bladesdodger: {
				name: "bladesDodger",
				size: "small",
				tags: ["code","game","arcade"],
				date: "June 20, 2017",
				description: "bladesDodger is a simple web game - click the dots, but dodge the spinning blades!"
			},
			blockdescender: {
				name: "blockDescender",
				size: "small",
				tags: ["code","game","arcade"],
				date: "October 4, 2017",
				description: "blockDescender is a web clone of Tetris, where players must fit colored blocks together."
			},
			blog: {
				skipRandom: true,
				name: "blog",
				size: "small",
				tags: ["code","api","writing","autobiography"],
				date: "April 17, 2022",
				description: "An ongoing blog about making projects with and for people."
			},
			breakout: {
				skipRandom: true,
				hidden: true,
				name: "breakout",
				size: "small",
				tags: ["code","game","arcade","unity"],
				date: "June 7, 2020",
				description: "This is a Unity demo of the classic game, built step-by-step from a Youtube tutorial."
			},
			brickbreaker: {
				name: "brickBreaker",
				size: "small",
				tags: ["code","game","arcade"],
				date: "October 5, 2017",
				description: "The classic ball-and-paddle game, built from scratch as a javascript web demo."
			},
			cableconnector: {
				name: "cableConnector",
				size: "small",
				tags: ["code","game","puzzle"],
				date: "February 14, 2020",
				description: "Pull the cords from start to socket in this puzzle of non-overlapping lines."
			},
			campaignfinancer: {
				skipRandom: true,
				name: "campaignFinancer",
				size: "medium",
				tags: ["code","tool","api","money"],
				date: "October 2, 2021",
				description: "Search the FEC's data to see who's financing the political campaigns of federal candidates."
			},
			captainchronosailsthroughtime: {
				skipRandom: true,
				name: "Captain Chrono Sails Through Time",
				size: "large",
				tags: ["music","fantasy","scifi","synth","orchestral","jazz","piano"],
				date: "April 1, 2012",
				description: "After studying musical traditions from all over the world, I created a concept album to explore time and space with Captain Chrono."
			},
			carnival: {
				skipRandom: true,
				hidden: true,
				name: "Carnival",
				size: "small",
				tags: [],
				date: "March 8, 2022",
				description: "A Renaissance Amusement Park by Gregory Mayr."
			},
			cascade: {
				skipRandom: true,
				name: "Cascade",
				size: "large",
				tags: ["music","fantasy","orchestral","pop","piano","lyric"],
				date: "February 15, 2011",
				description: "Cascade, released after completing the titular \"symphony,\" is filled with orchestral music made with the Explorchestra ensemble in mind."
			},
			catchaser: {
				name: "catChaser",
				size: "small",
				tags: ["code","game","arcade"],
				date: "May 8, 2019",
				description: "A simple javascript game of cat and mouse, with artwork from opengameart.org"
			},
			catgame: {
				skipRandom: true,
				hidden: true,
				name: "catgame",
				size: "small",
				tags: [],
				date: "January 16, 2022",
				description: "A touchscreen swatting game for cats."
			},
			catgpt: {
				name: "CatGPT",
				size: "small",
				tags: ["code","ai","simulation","tool","writing","autobiography","prose","scifi","design"],
				date: "March 5, 2023",
				description: "A breakthrough generative chat AI* able to provide novel responses to any prompt. Inspired by Apollo.\n*(not actually AI)"
			},
			cellsimulator: {
				name: "cellSimulator",
				size: "small",
				tags: ["code","simulation","tool","math"],
				date: "March 2, 2021",
				description: "Customize Conway's Game of Life in this simple simulation of cellular automata."
			},
			chalice: {
				skipRandom: true,
				name: "Chalice",
				size: "extra-large",
				tags: ["game","collaboration","code","card","tabletop","multiplayer","node","websockets","mongo","fantasy"],
				date: "March 21, 2015",
				description: "Funded on Kickstarter, Chalice is a card game (and web game) of death and deception where players poison their friends for fun."
			},
			changechecker: {
				skipRandom: true,
				name: "changeChecker",
				size: "small",
				tags: ["code","tool"],
				date: "July 29, 2023",
				description: "Identify the differences between two documents, with options to ignore spaces, casing, and placement within a line."
			},
			checkers: {
				skipRandom: true,
				hidden: true,
				name: "checkers",
				size: "small",
				tags: ["code","game","board","tabletop","multiplayer","unity"],
				date: "June 14, 2020",
				description: "This is a Unity demo of the classic game, built step-by-step from a Youtube tutorial."
			},
			checkersplayer: {
				name: "checkersPlayer",
				size: "medium",
				tags: ["code","game","board","tabletop","ai","multiplayer"],
				date: "November 21, 2017",
				description: "checkersPlayer is a Javascript web clone featuring PVP and AI match-ups."
			},
			chess: {
				name: "Chess",
				size: "large",
				tags: ["collaboration","code","game","tabletop","board","multiplayer"],
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
				tags: ["code","game","arcade","scifi"],
				date: "January 2, 2018",
				description: "chromaCreatures is a challenging shoot-em-up arcade game - players use a monochromatic blaster to fend off hybrid-hued enemies."
			},
			clevernacular: {
				skipRandom: true,
				name: "Clevernacular",
				size: "large",
				tags: ["writing","design","prose","art","photography"],
				date: "December 2, 2014",
				description: "Clevernacular is a blog about how amazing everyday design can be - a celebration of the brilliance all around us."
			},
			clickclique: {
				skipRandom: true,
				name: "ClickClique",
				size: "small",
				tags: ["code","websockets","multiplayer"],
				date: "April 25, 2018",
				description: "ClickClique is a PVP real-time clicking competition, built with nodeJS and websockets."
			},
			clippather: {
				name: "clipPather",
				size: "medium",
				tags: ["design","code","draw","tool","art"],
				date: "April 22, 2016",
				description: "clipPather is a constantly evolving Javascript tool for drawing with CSS clip-paths."
			},
			clouds: {
				skipRandom: true,
				hidden: true,
				name: "clouds",
				size: "small",
				tags: ["code","canvas","art"],
				date: "January 15, 2019",
				description: "A simple animation of cartoon clouds floating by, built for a tech demo at work."
			},
			cochords: {
				skipRandom: true,
				name: "CoChords",
				size: "large",
				tags: ["code","api","mongo","node","tool","websockets","music","audio","jazz","orchestral","piano","pop","synth","multiplayer","design"],
				date: "October 25, 2022",
				description: "CoChords is a real-time collaborative music composition tool, supporting musicXML, audio export, and custom synths."
			},
			cocolors: {
				name: "CoColors",
				size: "medium",
				tags: ["design","code","node","websockets","canvas","multiplayer","draw","tool","art"],
				date: "November 15, 2017",
				description: "CoColors is a real-time collaborative drawing tool. Create a canvas and start making art with friends."
			},
			codebreaker: {
				name: "codeBreaker",
				size: "small",
				tags: ["code","game","puzzle"],
				date: "October 28, 2019",
				description: "In codeBreaker, you must guess the computer's secret combination through guess and check."
			},
			coderunner: {
				skipRandom: true,
				hidden: true,
				name: "codeRunner",
				size: "small",
				tags: ["code","tool","simulation"],
				date: "May 3, 2017",
				description: "Built as part of AI Arenas, this web app evaluates your custom javascript in slow motion."
			},
			colorblock: {
				skipRandom: true,
				hidden: true,
				name: "Color Block",
				size: "medium",
				tags: [],
				date: "October 1, 2020",
				description: "Find the one square that's a slightly different color in this web game by Tom Mayr."
			},
			colorflooder: {
				name: "colorFlooder",
				size: "small",
				tags: ["code","game","puzzle"],
				date: "January 19, 2017",
				description: "colorFlooder is a web game where players click squares to collapse a grid to one color."
			},
			couplets: {
				skipRandom: true,
				name: "couplets",
				size: "medium",
				tags: ["writing","collaboration","api","lyric","poetry","autobiography"],
				date: "July 22, 2019",
				description: "Couplets is a collaborative poetry project, a timeline of rhyming adventures with Liz Ford."
			},
			cubesolver: {
				name: "cubeSolver",
				size: "medium",
				tags: ["code","math","simulation","game","puzzle","tabletop","canvas"],
				date: "March 4, 2023",
				description: "Shuffle and solve a color puzzle cube... or watch it solve itself."
			},
			decisionmaker: {
				name: "decisionMaker",
				size: "large",
				tags: ["code","tool","canvas"],
				date: "June 24, 2022",
				description: "Why choose wisely when you can choose randomly?"
			},
			demofont: {
				skipRandom: true,
				name: "demofont",
				size: "medium",
				tags: ["code","writing","design","svg"],
				date: "November 27, 2022",
				description: "A custom font based on smooth curves."
			},
			diamondcheckers: {
				skipRandom: true,
				name: "Diamond Checkers",
				size: "large",
				tags: ["game","code","node","mongo","tabletop","board","multiplayer"],
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
				skipRandom: true,
				hidden: true,
				name: "dotConnector",
				size: "small",
				tags: ["code","game","svg","puzzle"],
				date: "September 2, 2017",
				description: "This connect-the-dots game randomly generates points you must connect with non-overlapping lines."
			},
			draftsadrift: {
				skipRandom: true,
				name: "Drafts Adrift",
				size: "large",
				tags: ["music","scifi","orchestral","jazz","pop","synth","piano"],
				date: "December 1, 2010",
				description: "The first Drafts Adrift collection represents my love of video game music, from catchy melodies to looping scenic soundtracks."
			},
			draftsadrift2: {
				skipRandom: true,
				name: "Drafts Adrift 2",
				size: "large",
				tags: ["music","scifi","orchestral","jazz","pop","synth","piano","lyric"],
				date: "December 1, 2011",
				description: "Drafts Adrift 2 is a combination of various projects - including video game soundtracks, avant garde experiments, and some lyrical tracks."
			},
			dreamhatcher: {
				skipRandom: true,
				name: "Dreamhatcher",
				size: "extra-large",
				tags: ["game","tabletop","board","card","puzzle","multiplayer"],
				date: "April 1, 2014",
				description: "DreamHatcher offers dozens of free print-and-play tabletop games - and tons of templates to help aspiring designers craft their own."
			},
			dynasty: {
				skipRandom: true,
				name: "Dynasty",
				size: "large",
				tags: ["game","code","node","websockets","tabletop","card","multiplayer"],
				date: "December 30, 2020",
				description: "This multi-player multi-round elimination card game is all about becoming the next king."
			},
			eternalhorizon: {
				skipRandom: true,
				hidden: true,
				name: "Eternal Horizon",
				size: "large",
				tags: ["music","fantasy","orchestral"],
				date: "June 1, 2007",
				description: "Eternal Horizon was the first album I composed - entirely orchestral music, in Finale - and it set the standard: 16 songs and 1 hour."
			},
			explorchestra: {
				skipRandom: true,
				hidden: true,
				name: "Explorchestra",
				size: "extra-large",
				tags: ["collaboration","music","orchestral","jazz","pop","synth","lyric","piano"],
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
			flaggravation: {
				skipRandom: true,
				name: "Flaggravation",
				size: "medium",
				tags: ["code","game","card","tabletop","multiplayer"],
				date: "October 29, 2021",
				description: "In this vexillological drafting card game, players collect components to form flags from all around the world."
			},
			flagmaker: {
				name: "flagMaker",
				size: "medium",
				tags: ["design","code","canvas","fantasy","scifi","art","tool"],
				date: "November 15, 2018",
				description: "With flagMaker, randomly generate amazing flags - or build your own."
			},
			flappyword: {
				name: "flappy word",
				size: "small",
				tags: ["code","game","arcade"],
				date: "April 5, 2022",
				description: "Type quickly to keep the words flapping between the ever-encroaching clouds and mountains."
			},
			firestormsea: {
				skipRandom: true,
				name: "Firestorm Sea",
				size: "large",
				tags: ["game","fantasy","art"],
				date: "April 16, 2020",
				description: "An HD world map of a fantasy realm, revised and expanded over more than a decade."
			},
			fourconnector: {
				name: "fourConnector",
				size: "small",
				tags: ["code","game","tabletop","board","multiplayer"],
				date: "December 20, 2018",
				description: "It's four-in-a-row in this popular gravity-based strategy game for 2 players."
			},
			fraystraitor: {
				name: "fraysTraitor",
				size: "small",
				tags: ["code","tool","writing"],
				date: "January 8, 2022",
				description: "Yule sea, strait aweigh. Four shore."
			},
			fundfuser: {
				skipRandom: true,
				name: "FundFuser",
				size: "medium",
				tags: ["code","tool","math","multiplayer","money","api"],
				date: "September 3, 2021",
				description: "FundFuser calculates an equitable split for your next group gift or shared expense."
			},
			ghostescaper: {
				name: "ghostEscaper",
				size: "medium",
				tags: ["code","fantasy","game","arcade","svg"],
				date: "October 19, 2023",
				description: "Climb the endless tower while keeping ghosts at bay with light."
			},
			goodscounter: {
				skipRandom: true,
				hidden: true,
				name: "goodsCounter",
				size: "small",
				tags: ["code","tool"],
				date: "January 24, 2018",
				description: "This is a companion app for Goods, a multi-player strategy card game."
			},
			graphmaker: {
				skipRandom: true,
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
			harmony: {
				skipRandom: true,
				hidden: true,
				name: "harmony",
				size: "small",
				tags: ["code","music","audio","piano","synth","multiplayer","collaboration"],
				date: "January 21, 2017",
				description: "A collaborative music-making experience built with some cool dudes at the Monthly Music Hackathon."
			},
			hexagonplacer: {
				name: "hexagonPlacer",
				size: "medium",
				tags: ["code","game","puzzle"],
				date: "November 14, 2020",
				description: "This puzzle challenges you to fit all the random hexagon chunks back on the board."
			},
			hexdefender: {
				name: "hexDefender",
				size: "medium",
				tags: ["code","scifi","game","arcade","canvas"],
				date: "July 5, 2022",
				description: "Pilot a spacecraft, blast some asteroids, defend the stations... in hexagonal space."
			},
			hexsequencer: {
				name: "hexSequencer",
				size: "small",
				tags: ["code","game","audio","arcade"],
				date: "November 20, 2017",
				description: "hexSequencer is a memory game like Simon, with 6 musical colored lights."
			},
			homecontroller: {
				skipRandom: true,
				name: "homeController",
				size: "medium",
				tags: ["code","tool","api","design"],
				date: "August 21, 2021",
				description: "A map of my place with smart lights, speakers, and outlets, all connected to IFTTT applets that trigger device APIs."
			},
			htmlconverter: {
				skipRandom: true,
				name: "htmlConverter",
				size: "small",
				tags: ["code","tool","simulation"],
				date: "April 26, 2016",
				description: "This tool renders your text input as actual html elements."
			},
			huematcher: {
				name: "hueMatcher",
				size: "small",
				tags: ["code","game","puzzle"],
				date: "September 14, 2017",
				description: "In hueMatcher, adjust red, green, and blue to match the randomly generated color."
			},
			icondesigner: {
				name: "iconDesigner",
				size: "large",
				tags: ["code","math","tool","design","art","canvas","svg"],
				date: "August 13, 2023",
				description: "A full SVG editor for creating custom icons and logos built on Bézier curves."
			},
			iconlibrary: {
				name: "icon library",
				size: "large",
				tags: ["code","math","tool","design","art","canvas","svg"],
				date: "September 25, 2023",
				description: "A searchable set of SVG icons, with shaped borders, PNG export, and one-click editor access."
			},
			imageredactor: {
				name: "imageRedactor",
				size: "small",
				tags: ["code","tool","design","art","canvas","draw","photography"],
				date: "March 20, 2022",
				description: "Draw on an image to blur sections and cover up sensitive information."
			},
			imagespinner: {
				name: "imageSpinner",
				size: "small",
				tags: ["code","game","puzzle","api","photography"],
				date: "January 15, 2022",
				description: "Transform a random image - or your own selection - into a simple rotation puzzle."
			},
			imagetextifier: {
				name: "imageTextifier",
				size: "small",
				tags: ["code","tool","design","art","canvas","photography"],
				date: "January 19, 2023",
				description: "A picture's worth 10,000 letters in this image-to-text converter. It's real-time ASCII art for your camera."
			},
			infinitesnake: {
				name: "Infinite Snake",
				size: "small",
				tags: ["code","game","arcade","unity"],
				date: "April 14, 2022",
				description: "This is a Unity clone of the classic arcade game, modified from a tutorial to a wrap-around plane."
			},
			inputdetector: {
				skipRandom: true,
				name: "inputDetector",
				size: "small",
				tags: ["code","tool"],
				date: "January 15, 2020",
				description: "A handy tool for determining which inputs are working on your device / browser / OS."
			},
			itswhoiamb: {
				skipRandom: true,
				name: "It's Who Iamb",
				size: "large",
				tags: ["writing","lyric","poetry","autobiography"],
				date: "December 2, 2012",
				description: "It's Who Iamb was a poetry blog that updated every day for a year, serving now as a series of snapshots of the past."
			},
			jamrandomizer: {
				name: "jamRandomizer",
				size: "medium",
				tags: ["code","tool","music","audio","jazz","orchestral","piano","pop","synth","multiplayer"],
				date: "April 17, 2023",
				description: "Generate a chord progression, arrange your backing synths, and jam out."
			},
			jigsawpuzzler: {
				name: "jigsawPuzzler",
				size: "small",
				tags: ["code","game","api","puzzle","photography"],
				date: "November 9, 2021",
				description: "Use any image on the web, your device, or the Metropolitan Museum of Art website to make - and solve - a jigsaw puzzle."
			},
			jobweb: {
				skipRandom: true,
				hidden: true,
				name: "jobweb",
				size: "medium",
				tags: [],
				date: "November 30, 2021",
				description: "A choose-your-own-adventure autobiography depicting alternate timelines of my professional career."
			},
			jsonconverter: {
				skipRandom: true,
				name: "jsonConverter",
				size: "small",
				tags: ["code","tool"],
				date: "August 19, 2023",
				description: "Convert an array of objects into a table or CSV file by mapping JSON paths to columns."
			},
			kaleidoscopemaker: {
				name: "kaleidoscopeMaker",
				size: "small",
				tags: ["code","tool","design","art","canvas","photography"],
				date: "April 7, 2023",
				description: "Upload your artwork or photo into this fully customizable canvas of mirrors."
			},
			keyspinner: {
				name: "keySpinner",
				size: "small",
				tags: ["code","game","puzzle"],
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
				tags: ["code","game","puzzle","tabletop","multiplayer"],
				date: "December 21, 2020",
				description: "Play hangman against a bank of tens of thousands of common words."
			},
			lexpose: {
				hidden: true,
				skipRandom: true,
				name: "Lexpose",
				size: "extra-large",
				tags: [],
				date: "May 1, 2015",
				description: "Lexpose is a collection of original short-form fiction I've written, in college and afterwards."
			},
			lockturner: {
				name: "lockTurner",
				size: "small",
				tags: ["code","game","puzzle"],
				date: "January 22, 2020",
				description: "A combination lock puzzle where sensing vibrations helps you know how to rotate a dial."
			},
			logicevaluator: {
				skipRandom: true,
				name: "logicEvaluator",
				size: "small",
				tags: ["code","tool","math"],
				date: "June 6, 2022",
				description: "Submit statements of symbolic logic to calculate truth tables and evaluate conclusions."
			},
			magnetmaker: {
				name: "magnetMaker",
				size: "large",
				tags: ["code","canvas","simulation"],
				date: "April 25, 2018",
				description: "magnetMaker is a pseudo-realistic physics simulator with magnetic spheres and tons of forces."
			},
			mayrhockey: {
				skipRandom: true,
				name: "MayrHockey",
				size: "medium",
				tags: ["game","arcade","multiplayer","code","canvas","websockets","node"],
				date: "May 26, 2021",
				description: "A 2-6 player air hockey arena where the goals change every time someone scores."
			},
			mazemaker: {
				skipRandom: true,
				name: "mazeMaker",
				size: "medium",
				tags: ["code","puzzle","tool","math"],
				date: "September 9, 2018",
				description: "This generates mazes from the outside in, guaranteed to have exactly 1 solution."
			},
			mazertag: {
				skipRandom: true,
				name: "MazerTag",
				size: "large",
				tags: ["game","arcade","multiplayer","scifi","code","canvas","simulation","websockets","node","collaboration"],
				date: "February 7, 2021",
				description: "A top-down multiplayer arcade game with 5 laser tag modes in randomly generated arenas. Music & SFX by Alex Berg. Visuals by Liz Ford."
			},
			melodemons: {
				skipRandom: true,
				name: "melodemons",
				size: "large",
				tags: ["game","code","music","node","websockets","canvas","audio","fantasy","synth","piano","arcade","multiplayer","art"],
				date: "October 9, 2018",
				description: "Melodemons is a real-time multiplayer music-based post-capturing platformer."
			},
			melodyplayer: {
				name: "melodyPlayer",
				size: "medium",
				tags: ["code","music","audio","piano","synth","game","arcade","collaboration"],
				date: "September 16, 2022",
				description: "A music & rhythm game with web audio synths - play your own custom compositions (and mine)."
			},
			memory: {
				name: "Memory",
				size: "medium",
				tags: ["collaboration","code","game","card","tabletop","multiplayer","tool"],
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
				tags: ["collaboration","game","code","canvas","scifi","arcade","multiplayer","art"],
				date: "January 14, 2019",
				description: "Liz Ford & I built a local 2-player minigame where lunar rovers race to collect falling space rocks."
			},
			metromapper: {
				skipRandom: true,
				name: "metroMapper",
				size: "medium",
				tags: ["code","svg","art","simulation"],
				date: "October 3, 2017",
				description: "metroMapper is a live map of the NYC subway system, with data sourced from MTA schedules."
			},
			minefinder: {
				name: "mineFinder",
				size: "small",
				tags: ["code","game","puzzle","arcade"],
				date: "December 30, 2017",
				description: "In mineFinder, sweep the randomly generated board flagging mines before you click them!"
			},
			morsemessager: {
				name: "morseMessager",
				size: "small",
				tags: ["code","tool"],
				date: "February 28, 2021",
				description: "-... .     ... ..- .-. .     - ---     -.. .-. .. -. -.-     -.-- --- ..- .-.     .-. . ..-. . .-. . -. -.-. . ... .-.-.-"
			},
			mosaicmaker: {
				name: "mosaicMaker",
				size: "small",
				tags: ["design","code","canvas","art","tool","photography"],
				date: "November 5, 2021",
				description: "Transform any image into a grid of colored tiles - or tile tons of tiny pictures to make a mosaic of a big one."
			},
			musicchallenge: {
				skipRandom: true,
				name: "Music Challenge",
				size: "medium",
				tags: ["code","music","audio","jazz","orchestral","piano","pop","synth","lyric","collaboration"],
				date: "October 2, 2022",
				description: "A collection of compositions from a few musical friends; each event challenged us to make music in a new way."
			},
			nameshuffler: {
				name: "nameShuffler",
				size: "small",
				tags: ["code","tool","writing","autobiography","collaboration"],
				date: "June 10, 2023",
				description: "Shuffle up a list of names in this simple tool commissioned by my friend Zephyr."
			},
			nimbusnotes: {
				skipRandom: true,
				name: "nimbusNotes",
				size: "small",
				tags: ["collaboration","code","music","node","websockets","canvas","audio","multiplayer","art"],
				date: "February 2, 2019",
				description: "This web-audio / canvas / websockets raincloud soundscape was built with Liz Ford at a hackathon."
			},
			noughtcrosser: {
				name: "noughtCrosser",
				size: "small",
				tags: ["code","game","ai","multiplayer","tabletop","board"],
				date: "December 20, 2017",
				description: "It's tic-tac-toe, against either another human or an AI opponent."
			},
			numbercruncher: {
				skipRandom: true,
				hidden: true,
				name: "numberCruncher",
				size: "small",
				tags: ["code","math","tool"],
				date: "June 30, 2017",
				description: "This is a strange abacus-like calculator."
			},
			orbitmaker: {
				name: "orbitMaker",
				size: "medium",
				tags: ["code","extension","math","simulation","tool","scifi","design","canvas"],
				date: "March 27, 2022",
				description: "Customize or randomly generate a solar system with real orbital mechanics - planets, moons, and more."
			},
			paintings: {
				skipRandom: true,
				hidden: true,
				name: "paintings",
				size: "medium",
				tags: ["code","design","art","draw","photography","collaboration"],
				date: "October 29, 2023",
				description: "A gallery of original artwork, often inspired by tutorials and guided by friends."
			},
			pawnpusher: {
				name: "pawnPusher",
				size: "medium",
				tags: ["game","code","tabletop","board","multiplayer"],
				date: "November 28, 2017",
				description: "An original game, on both cardstock and the web, pawnPusher is about knocking your opponent off the board."
			},
			pegjumper: {
				name: "pegJumper",
				size: "small",
				tags: ["code","game","tabletop","board","puzzle"],
				date: "March 25, 2018",
				description: "This is the classic solitaire game with pegs jumping over each other."
			},
			pencilpather: {
				name: "pencilPather",
				size: "small",
				tags: ["code","design","canvas","art","draw"],
				date: "November 8, 2017",
				description: "A canvas-powered simple art app for drawing on your screen."
			},
			penduluminous: {
				skipRandom: true,
				name: "Penduluminous",
				size: "large",
				tags: ["music","writing","jazz","pop","lyric","piano","poetry","autobiography"],
				date: "November 1, 2012",
				description: "My first post-college album, Penduluminous is all about swing - with 16 vocal tracks all set in different jazz and pop styles."
			},
			photofilterer: {
				name: "photoFilterer",
				size: "small",
				tags: ["code","art","design","canvas","tool","photography"],
				date: "January 1, 2022",
				description: "Apply a color pass filter to the device's live camera feed and export the resulting photographs."
			},
			photoshots: {
				skipRandom: true,
				name: "PhotoShots",
				size: "large",
				tags: ["code","mongo","node","websockets","game","multiplayer","canvas","photography"],
				date: "June 12, 2023",
				description: "Photography hide and seek - phone tag reimagined."
			},
			pieceflipper: {
				name: "pieceFlipper",
				size: "small",
				tags: ["code","game","tabletop","board","ai","multiplayer"],
				date: "December 31, 2017",
				description: "An Othello/Reversi clone, pieceFlipper features both PVP and human-vs.-AI games."
			},
			piecetalks: {
				skipRandom: true,
				name: "Piece Talks",
				size: "large",
				tags: ["code","game","tool","design","multiplayer","puzzle","mongo","node","websockets","collaboration"],
				date: "March 9, 2022",
				description: "A virtual barrier task game about communication - a collaboration with Ayelet Kershenbaum."
			},
			pipestriper: {
				name: "pipeStriper",
				size: "medium",
				tags: ["code","game","puzzle"],
				date: "February 4, 2020",
				description: "This is a puzzle / simulator where you rotate pipes to connect their colors."
			},
			pitchmatcher: {
				skipRandom: true,
				name: "pitchMatcher",
				size: "small",
				tags: ["code","music","canvas","audio","puzzle","tool"],
				date: "January 19, 2019",
				description: "Match pure tones by whistling or singing into the mic in this canvas / webaudio demo."
			},
			pitchplayer: {
				skipRandom: true,
				name: "pitchPlayer",
				size: "medium",
				tags: ["code","music","audio","piano","synth","tool"],
				date: "September 7, 2017",
				description: "With pitchPlayer and the audio API, composers can sequence notes like a player piano."
			},
			pixellistener: {
				name: "pixelListener",
				size: "small",
				tags: ["code","tool","music","audio","synth","design","art","canvas","photography"],
				date: "April 9, 2023",
				description: "Hear images by mapping color and coordinates to audio attributes like pitch, volume, and effects."
			},
			pixelpainter: {
				name: "pixelPainter",
				size: "small",
				tags: ["design","code","draw","art","tool"],
				date: "June 10, 2017",
				description: "With pixelPainter, blocky 8-bit art is just a click-and-drag away."
			},
			poemmaker: {
				name: "poemMaker",
				size: "large",
				tags: ["code","tool","writing","autobiography","lyric","poetry"],
				date: "June 22, 2022",
				description: "Randomly generate poetry in dozens of forms from thousands of original lines."
			},
			pointfinder: {
				name: "pointFinder",
				size: "small",
				tags: ["code","game","canvas","puzzle"],
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
			pongpaddler: {
				skipRandom: true,
				name: "pongPaddler",
				size: "small",
				tags: ["code","game","arcade","multiplayer"],
				date: "June 4, 2021",
				description: "Play the classic table-tennis arcade game against a friend."
			},
			portmantoasters: {
				skipRandom: true,
				name: "Portmantoasters",
				size: "medium",
				tags: ["writing","puzzle"],
				date: "December 2, 2015",
				description: "Portmantoasters are word puzzles with two words overlapped into one - and this was a daily blog challenging readers to figure them out."
			},
			projectgraveyard: {
				skipRandom: true,
				name: "Project Graveyard",
				size: "small",
				tags: ["code","autobiography"],
				date: null,
				description: "Some projects don't work out. Think of this gallery as a graveyard of old ideas."
			},
			prosandconsole: {
				skipRandom: true,
				name: "Pros and Console",
				size: "large",
				tags: ["writing","code","prose","autobiography"],
				date: "September 30, 2017",
				description: "Pros and Console is a blog that follows the ups and downs of project-oriented programming."
			},
			pulsepather: {
				skipRandom: true,
				name: "pulsePather",
				size: "small",
				tags: ["code","music","audio","synth","art","piano"],
				date: "October 22, 2018",
				description: "See a soundboard light up with colors and sounds as you lay out a melody."
			},
			puzzlepatcher: {
				name: "puzzlePatcher",
				size: "medium",
				tags: ["code","game","puzzle"],
				date: "February 22, 2020",
				description: "Random gaps in the grid must be covered by your various patch pieces."
			},
			qrcoder: {
				skipRandom: true,
				name: "qrCoder",
				size: "small",
				tags: ["code","api","tool","canvas"],
				date: "May 20, 2023",
				description: "Scan and generate QR Codes in this tiny tech demo powered by two QR Code libraries."
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
				tags: ["code","game","puzzle"],
				date: "August 24, 2020",
				description: "Fit all of the randomly generated rectangles within the available area."
			},
			rephraiser: {
				skipRandom: true,
				name: "rephrAIser",
				size: "small",
				tags: ["code","ai","api","extension","tool","writing"],
				date: "August 7, 2023",
				description: "A Chrome extension to rephrase text on any webpage in any style, via OpenAI's API."
			},
			robotdirector: {
				name: "robotDirector",
				size: "medium",
				tags: ["code","game","scifi","arcade"],
				date: "January 25, 2017",
				description: "In robotDirector, players must guide simple bots to a color-coded collection point."
			},
			rpsrpg: {
				skipRandom: true,
				name: "RPS RPG",
				size: "large",
				tags: ["collaboration","code","game","node","websockets","canvas","audio","fantasy","orchestral","synth","multiplayer","ai","arcade","art"],
				date: "November 9, 2019",
				description: "Fight monsters to find the orbs in this 8-bit co-op dungeon crawler. Art by Jenn Levy. Sound by Alex Berg."
			},
			rpsthrower: {
				name: "RPSthrower",
				size: "small",
				tags: ["code","game","ai","multiplayer"],
				date: "June 14, 2021",
				description: "Rock-Paper-Scissors; human-v-human or human-v-bot or bot-v-bot... you can even code your own bots!"
			},
			runjumper: {
				name: "runJumper",
				size: "small",
				tags: ["game","code","canvas","scifi","arcade"],
				date: "September 14, 2018",
				description: "Help the robot collect energy orbs in runJumper, a randomly generated platformer."
			},
			scalemaker: {
				name: "scaleMaker",
				size: "small",
				tags: ["code","tool","music","audio","jazz","orchestral","piano","synth","design"],
				date: "April 30, 2023",
				description: "Discover musical scales from all around the world - and invent your own."
			},
			shadowvalley: {
				skipRandom: true,
				name: "Shadow Valley",
				size: "large",
				tags: ["music","fantasy","orchestral","piano"],
				date: "December 1, 2009",
				description: "Shadow Valley, with a focus on structure and counterpoint, came at the beginning stages of my music theory and history education."
			},
			shapeanimator: {
				skipRandom: true,
				hidden: true,
				name: "shapeAnimator",
				size: "medium",
				tags: ["design","code","art","tool"],
				date: "February 9, 2017",
				description: "Use shapeAnimator to create, style, and sequence animations for polygons."
			},
			singles: {
				skipRandom: true,
				name: "Singles",
				size: "large",
				tags: ["music","writing","orchestral","jazz","pop","lyric","piano","poetry","autobiography"],
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
				skipRandom: true,
				name: "Skyburst",
				size: "large",
				tags: ["music","fantasy","orchestral","piano"],
				date: "May 1, 2008",
				description: "I composed Skyburst over the course of a year; this album reflects a wild exploration of melody without much structure."
			},
			snakesnacker: {
				name: "snakeSnacker",
				size: "small",
				tags: ["code","game","arcade"],
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
			soundfinder: {
				name: "soundFinder",
				size: "small",
				tags: ["code","music","audio","synth","game","board","card","multiplayer"],
				date: "November 15, 2022",
				description: "An audio take on the classic memory game, where every tile is a tone."
			},
			specterinspectors: {
				skipRandom: true,
				name: "Specter Inspectors",
				size: "large",
				tags: ["game","code","node","websockets","mongo","fantasy","tabletop","card","multiplayer"],
				date: "October 27, 2017",
				description: "Specter Inspectors is a game of ghosts and guesses. 5-25 friends gather in-person for a party game of deception and deduction."
			},
			speechrepeater: {
				skipRandom: true,
				hidden: true,
				name: "speechRepeater",
				size: "small",
				tags: ["code","tool","simulation","api"],
				date: "December 11, 2019",
				description: "Say something and see your device turn your speech into text, then read it back."
			},
			spherecollector: {
				name: "sphereCollector",
				size: "small",
				tags: ["code","game","arcade"],
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
				tags: ["code","api","canvas","tool","money"],
				date: "December 25, 2017",
				description: "Use the AlphaVantage API to measure a stock's success over 12 months with stockTracker."
			},
			switchonyms: {
				skipRandom: true,
				name: "Switchonyms",
				size: "large",
				tags: ["game","code","node","websockets","multiplayer","tabletop","card"],
				date: "February 1, 2018",
				description: "A chaotic party game for 4+ players - guess words to get points, but lose them the longer it takes opponents to guess."
			},
			tempotapper: {
				name: "tempoTapper",
				size: "small",
				tags: ["code","tool","music"],
				date: "April 22, 2021",
				description: "Use your mouse, keyboard, or touchscreen to tap a tempo and detect the beats per minute."
			},
			tempoticker: {
				name: "tempoTicker",
				size: "small",
				tags: ["code","tool","music"],
				date: "May 1, 2021",
				description: "A simple audio-visual metronome with customizable beat count and tempo."
			},
			thecouncil: {
				skipRandom: true,
				name: "The Council",
				size: "medium",
				tags: ["game","code","node","websockets","canvas","fantasy","tabletop","multiplayer"],
				date: "November 30, 2018",
				description: "Keep the republic from crumbling - rule the fantasy realm together in The Council, a game of politics and persuasion."
			},
			thedeathmakerssymphony: {
				skipRandom: true,
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
				tags: ["code","game","unity","tabletop","board","multiplayer"],
				date: "June 20, 2020",
				description: "This is a Unity demo of the classic game, built from scratch with a customizable grid."
			},
			tilecycler: {
				name: "tileCycler",
				size: "small",
				tags: ["code","api","photography"],
				date: "June 29, 2022",
				description: "A cycling gallery of random photos from Unsplash. Customize with query params: x, y, & interval."
			},
			tileslider: {
				name: "tileSlider",
				size: "small",
				tags: ["code","game","puzzle"],
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
				tags: ["code","math","tool","money"],
				date: "May 31, 2018",
				description: "Use this tool to round your tip to the nearest dollar, quarter, dime, etc."
			},
			tmapper: {
				name: "tMapper",
				size: "medium",
				tags: ["code","canvas","art","simulation","api"],
				date: "March 28, 2021",
				description: "Track the trains of the Boston metro system, updating in real-time with actual vehicle data from the MBTA API."
			},
			tokenturner: {
				name: "tokenTurner",
				size: "small",
				tags: ["code","game","board","multiplayer"],
				date: "February 12, 2023",
				description: "A literal twist on a classic game. Get 4 in a row, but you can rotate gravity instead of dropping a token."
			},
			tonemaker: {
				name: "toneMaker",
				size: "large",
				tags: ["code","music","audio","tool","synth","piano","jazz","orchestral","scifi"],
				date: "November 6, 2022",
				description: "A synth creator built in 2018, overhauled in 2022. Build your own web audio sounds with limitless customization."
			},
			truecolors: {
				skipRandom: true,
				name: "True Colors",
				size: "large",
				tags: ["game","code","node","websockets","tabletop","card","multiplayer"],
				date: "October 4, 2020",
				description: "A strategic bluffing asymmetrical card game about colors and symbols and sabotage."
			},
			underblue: {
				skipRandom: true,
				hidden: true,
				name: "Underblue",
				size: "extra-large",
				tags: ["collaboration","music","jazz","pop","lyric","piano"],
				date: "March 30, 2016",
				description: "I composed and played piano and clarinet in Underblue, performing across New York City venues in this 5-person rock and indie pop band."
			},
			unitconverter: {
				skipRandom: true,
				name: "unitConverter",
				size: "medium",
				tags: ["code","math","tool"],
				date: "December 24, 2019",
				description: "Convert between all kinds of units measuring all kinds of quantities."
			},
			voicetranscriber: {
				name: "voiceTranscriber",
				size: "small",
				tags: ["code","tool","simulation","api"],
				date: "February 5, 2022",
				description: "Use the Google Chrome Speech Recognition API to output a continuous stream of speech-to-text."
			},
			wavestacker: {
				skipRandom: true,
				hidden: true,
				name: "waveStacker",
				size: "small",
				tags: ["code","music","audio","piano","synth"],
				date: "October 14, 2017",
				description: "An experiment in stacking simple waves to build custom synthesizer sounds."
			},
			weatherexplorer: {
				skipRandom: true,
				name: "weatherExplorer",
				size: "medium",
				tags: ["code","api","tool","photography"],
				date: "June 10, 2017",
				description: "Use the OpenWeather API and Google Maps API to find the weather for a random location."
			},
			webdepictor: {
				skipRandom: true,
				hidden: true,
				name: "webDepictor",
				size: "small",
				tags: ["code","tool","design"],
				date: "June 19, 2017",
				description: "Generate a web of interconnected items that rearranges itself."
			},
			wheelturner: {
				name: "wheelTurner",
				size: "small",
				tags: ["code","game","puzzle"],
				date: "May 16, 2020",
				description: "Turn one wheel and see it turn another - it's hard to crack, even if you know the code."
			},
			windowtinter: {
				skipRandom: true,
				name: "windowTinter",
				size: "medium",
				tags: ["code","tool","design","extension"],
				date: "January 6, 2021",
				description: "See the world through any-color glasses with this Chrome extension that adds a colored overlay to any website."
			},
			wordchainer: {
				name: "wordChainer",
				size: "small",
				tags: ["code","tool"],
				date: "May 2, 2021",
				description: "Build branching chains of words that differ by letter insertion, deletion, substitution, or transposition."
			},
			wordcompleter: {
				name: "wordCompleter",
				size: "small",
				tags: ["code","game","puzzle"],
				date: "February 13, 2022",
				description: "Find as many words as you can that contain the given letters in order."
			},
			wordcounter: {
				skipRandom: true,
				name: "wordCounter",
				size: "small",
				tags: ["code","tool","writing"],
				date: "April 26, 2016",
				description: "One of my first projects; it counts words & characters in any text."
			},
			wordfinder: {
				name: "wordFinder",
				size: "medium",
				tags: ["code","game","tabletop","board","multiplayer"],
				date: "July 9, 2016",
				description: "wordFinder is a web game in the style of Boggle, using an online dictionary."
			},
			wordsblockchain: {
				skipRandom: true,
				name: "wordsblockchain",
				size: "large",
				tags: ["game","code","node","websockets","tabletop","multiplayer"],
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
			wordsgenerator: {
				name: "wordsGenerator",
				size: "medium",
				tags: ["code","tool","writing"],
				date: "January 11, 2021",
				description: "Generate random words with customizable controls over allowed letter and syllable combinations."
			},
			wordshuffler: {
				skipRandom: true,
				name: "wordShuffler",
				size: "medium",
				tags: ["code","tool"],
				date: "September 18, 2017",
				description: "Get an exhaustive list of anagrams for a word, powered by webworkers."
			},
			wribbon: {
				skipRandom: true,
				name: "Wribbon",
				size: "medium",
				tags: ["design","svg","art"],
				date: "June 5, 2015",
				description: "Wribbon is a form of stylized text designed to look like strips of paper folded into letters and numbers."
			},
			xmlparser: {
				skipRandom: true,
				name: "xmlParser",
				size: "small",
				tags: ["code","tool"],
				date: "September 10, 2017",
				description: "xmlParser is a Javascript web tool for converting XML into JSON."
			},
			zeroblaster: {
				name: "zeroBlaster",
				size: "small",
				tags: ["code","math","game","arcade"],
				date: "May 7, 2023",
				description: "Numbers spiral ever closer - can you blast them back to zero?"
			}
		}

	/* elements */
		const ELEMENTS = {
			body: document.body,
			jlogo: document.querySelector("#j-logo"),
			navigation: document.querySelector("#navigation"),
			search: document.querySelector("#navigation-search"),
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
						j.addEventListener("click", captureJ)
					document.body.appendChild(j)

					let jSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg")
						jSVG.setAttribute("viewBox", "10 10 80 80")
					j.appendChild(jSVG)

					let jPath = document.createElementNS("http://www.w3.org/2000/svg", "path")
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
