/*** globals ***/
	/* constants */
		const CONSTANTS = {
			transitionDelay: 1000,
			firstEventId: "welcome",
			lastEventId: "admithub",
			corruptedTimelineEventId: "dinosaurs",
			backPhrases: ["Go back.", "Maybe that didn't happen.", "Try that again.", "Back in time.", "Undo that.", "Do something different.", "Previous event."],
			previousEventCountdown: 5
		}

	/* state */
		const STATE = {
			previousEventCount: 0,
			thisTimeline: [CONSTANTS.firstEventId],
			currentEvent: null,
			transitionedEvent: null,
			transitioning: false,
			transitionTimeout: null
		}

	/* elements */
		const ELEMENTS = {
			body: document.body,
			line: document.querySelector("#line"),
			viewer: document.querySelector("#viewer"),
			reset: document.querySelector("#reset-events")
		}

	/* events */
		const EVENTS = {
			// linear
				welcome: {
					actual: true,
					title: "",
					time: "I am what I make.",
					description: "Chance leads to choice. Options arise out of opportunities. Decisions determine destiny. \n\nThe \"me\" you see today is a reflection of all the \"me\"s who came before... and all the \"me\"s who could have been. \n\n\n\nAre they any less real?",
					image: null,
					options: [
						{
							id: "childhood",
							text: "In the beginning..."
						}
					]
				},
				childhood: {
					actual: true,
					title: "childhood",
					time: "1990 - 2004",
					description: "I'm born in 1990 to Rebecca and Gregory (and a cat named Dorie). A few years later, I acquire a brother, Tom (and some more cats, Mac and Poly). We grow up in a suburban beach town on Long Island and I spend my childhood writing poems and stories, playing board games and video games, and learning clarinet and piano.",
					image: "images/childhood.jpg",
					options: [
						{
							id: "highschool",
							text: "Then I attend high school."
						}
					]
				},
				highschool: {
					actual: true,
					title: "high school",
					time: "2004 - 2008",
					description: "In high school, I'm all about extracurriculars: jazz band, marching band, pit orchestra, theater, volunteer club, poetry jam, math team, science olympiad, student council, the local Congressman's \"High School Advisory Council\"... It ends with a graduation speech where I encourage people to \"Find what you love and go do it.\"",
					image: "images/highschool.jpg",
					options: [
						{
							id: "travel",
							text: "I also get to travel the world."
						}
					]
				},
				travel: {
					actual: true,
					title: "travel",
					time: "2004 - 2008",
					description: "I'm incredibly fortunate to participate in the \"People to People Student Ambassador\" program, through which I visit Australia and New Zealand, and later England and Ireland. Before high school, one grandmother takes me to the Grand Canyon. After high school, my other grandmother takes me to Greece.",
					image: "images/travel.jpg",
					options: [
						{
							id: "binghamton",
							text: "Back to New York - and forward to Binghamton University."
						}
					]
				},
				binghamton: {
					actual: true,
					title: "Binghamton University",
					time: "2008 - 2012",
					description: "I apply to Binghamton University in upstate New York. I meet some people at orientation who I never see again. I take a ton of electives and try a ton of clubs, and start to see the many possible life paths open up before me.",
					image: "images/binghamton.jpg",
					options: [
						{
							id: "pipedream",
							text: "I write for the school paper."
						},
						{
							id: "tourguide",
							text: "I become a campus tour guide."
						},
						{
							id: "svc",
							text: "I join the student volunteer center."
						}
					]
				},

			// 2009-2012
				tourguide: {
					actual: true,
					title: "BU Tour Guide",
					time: "2009 - 2012",
					description: "Loving my experience at Binghamton - and looking for a flexible job to make some pizza money - I apply to be a college tour guide. Over the next three years, I meet countless high school kids visiting campus - and sometimes I run into them as freshmen.",
					image: "images/tourguide.jpg",
					options: [
						{
							id: "explorchestra",
							text: "My music friends and I start a student composers' orchestra."
						},
						{
							id: "gamemakersguild",
							text: "My gaming friends and I start a student gamemakers' guild."
						}
					]
				},
				pipedream: {
					title: "Pipe Dream",
					time: "2009 - 2012",
					description: "My favorite class in high school was always English, so I try to find an outlet for writing. Pipe Dream, Binghamton University's oldest and most-read student paper, brings me on as a regular columnist and occasional photographer.",
					image: "images/pipedream.jpg",
					options: [
						{
							id: "gamemakersguild",
							text: "My gaming friends and I start a student gamemakers' guild."
						},
						{
							id: "writerspace",
							text: "My writer friends and I start a student writers' collective."
						}
					]
				},
				svc: {
					title: "Student Volunteer Center",
					time: "2009 - 2012",
					description: "Hoping to give back to the community and make new friends along the way, I join the Student Volunteer Center. I participate in dozens of events and charity fundraisers on campus and downtown - even at the local zoo!",
					image: "images/svc.jpg",
					options: [
						{
							id: "explorchestra",
							text: "My music friends and I start a student composers' orchestra."
						},
						{
							id: "writerspace",
							text: "My writer friends and I start a student writers' collective."
						}
					]
				},

			// 2009-2010
				explorchestra: {
					actual: true,
					title: "Explorchestra",
					time: "2009 - 2012",
					description: "Explorchestra: Every Saturday afternoon, a full orchestra meets to rehearse music composed by members in any and every genre.",
					image: "images/explorchestra.jpg",
					options: [
						{
							id: "englishmajor",
							text: "I pursue a degree in English."
						},
						{
							id: "musicmajor",
							text: "I pursue a degree in music."
						},
						{
							id: "mathmajor",
							text: "I pursue a degree in math."
						}
					]
				},
				gamemakersguild: {
					title: "Gamemakers Guild",
					time: "2009 - 2012",
					description: "Gamemakers Guild: Every Thursday night, an ever-growing group of tabletop gaming creators meet up to playtest new experiences.",
					image: "images/gamemakersguild.jpg",
					options: [
						{
							id: "mathmajor",
							text: "I pursue a degree in math."
						},
						{
							id: "engineeringmajor",
							text: "I pursue a degree in engineering."
						},
						{
							id: "graphicdesignmajor",
							text: "I pursue a degree in graphic design."
						}
					]
				},
				writerspace: {
					title: "WriterSpace",
					time: "2009 - 2012",
					description: "WriterSpace: Every Friday afternoon, a collective of four to forty poets and authors meets up to read selections and workshop drafts.",
					image: "images/writerspace.jpg",
					options: [
						{
							id: "englishmajor",
							text: "I pursue a degree in English."
						},
						{
							id: "journalismmajor",
							text: "I pursue a degree in journalism."
						},
						{
							id: "poliscimajor",
							text: "I pursue a degree in political science."
						}
					]
				},

			// 2010-2012
				englishmajor: {
					actual: true,
					title: "English",
					time: "2010 - 2012",
					description: "Not quite knowing where my degree will take me, I major in English and creative writing.",
					image: "images/major.jpg",
					options: [
						{
							id: "petco_tfcu",
							text: "My career starts in retail on Long Island."
						},
						{
							id: "tfa_az",
							text: "Teach for America takes me to Arizona."
						},
						{
							id: "harpercollins",
							text: "I land a job in publishing in NYC."
						}
					]
				},
				musicmajor: {
					title: "music",
					time: "2010 - 2012",
					description: "Not quite knowing where my degree will take me, I major in music composition and performance.",
					image: "images/major.jpg",
					options: [
						{
							id: "binghamton_tourcoordinator",
							text: "I stick around for Explorchestra and a job with the school."
						},
						{
							id: "blitwise",
							text: "I compose soundtracks for a local videogame company."
						},
						{
							id: "boardwalk_dreamhatcher",
							text: "I find a job at a local board game store."
						}
					]
				},
				mathmajor: {
					title: "math",
					time: "2010 - 2012",
					description: "Not quite knowing where my degree will take me, I major in applied mathematics.",
					image: "images/major.jpg",
					options: [
						{
							id: "tfa_az",
							text: "Teach for America offers a spot in the Arizona math corps."
						},
						{
							id: "ibm",
							text: "IBM, once based in Binghamton, still recruits BU math grads."
						},
						{
							id: "boardwalk_dreamhatcher",
							text: "I decide to start a small board game business with friends."
						}
					]
				},
				engineeringmajor: {
					title: "engineering",
					time: "2010 - 2012",
					description: "Not quite knowing where my degree will take me, I major in engineering and computer science.",
					image: "images/major.jpg",
					options: [
						{
							id: "blitwise",
							text: "A local indie videogame developer is hiring."
						},
						{
							id: "tfa_az",
							text: "Teach for America wants STEM grads for Arizona educators."
						},
						{
							id: "ibm",
							text: "IBM has a special internship program for BU engineering graduates."
						}
					]
				},
				graphicdesignmajor: {
					title: "graphic design",
					time: "2010 - 2012",
					description: "Not quite knowing where my degree will take me, I major in graphic design.",
					image: "images/major.jpg",
					options: [
						{
							id: "blitwise",
							text: "A local indie videogame developer is hiring."
						},
						{
							id: "petco_tfcu",
							text: "I take a gap year to focus on photography and writing."
						},
						{
							id: "boardwalk_dreamhatcher",
							text: "My passion for board games leads to two small businesses."
						}
					]
				},
				journalismmajor: {
					title: "journalism",
					time: "2010 - 2012",
					description: "Not quite knowing where my degree will take me, I major in rhetoric and journalism.",
					image: "images/major.jpg",
					options: [
						{
							id: "binghamton_tourcoordinator",
							text: "I stay in Binghamton and get a job with the university."
						},
						{
							id: "harpercollins",
							text: "I network with alumni and find a way into publishing."
						},
						{
							id: "press_sun",
							text: "The BU career center points me to a journalism internship."
						}
					]
				},
				poliscimajor: {
					title: "political science",
					time: "2010 - 2012",
					description: "Not quite knowing where my degree will take me, I major in political science.",
					image: "images/major.jpg",
					options: [
						{
							id: "binghamton_tourcoordinator",
							text: "I try to get involved in local politics, but my first job is working for the school."
						},
						{
							id: "press_sun",
							text: "I apply to write - and end up copy-editing - at Binghamton's local paper."
						},
						{
							id: "gillibrand",
							text: "I go to Albany, NY, to work on Senator Gillibrand's reelection campaign."
						}
					]
				},

			// 2012-2013
				petco_tfcu: {
					actual: true,
					title: "Petco & TFCU",
					time: "2012 - 2013",
					description: "I struggle to find work, spending free time with friends and projects. I start at a nearby Petco, and soon move on to be a bank teller.",
					image: "images/petco_tfcu.jpg",
					options: [
						{
							id: "tfa_nyc",
							text: "Teach for America accepts me to the New York City corps."
						},
						{
							id: "tfa_az2",
							text: "Teach for America accepts me to the Phoenix, Arizona corps."
						},
						{
							id: "mcgrawhill",
							text: "After 180 applications, I finally get some interviews in publishing."
						}
					]
				},
				binghamton_tourcoordinator: {
					title: "BU Tour Coordinator",
					time: "2012 - 2013",
					description: "I work as a Tour Coordinator for the university and continue to see friends and participate in the student group I started.",
					image: "images/binghamton_tourcoordinator.jpg",
					options: [
						{
							id: "tfa_nyc",
							text: "I reapply for Teach for America and move to New York City to teach."
						},
						{
							id: "binghamton_recruiter",
							text: "I get to travel the country, promoting Binghamton at college fairs."
						},
						{
							id: "mcgrawhill",
							text: "Alumni connections lead to an chance interview for editorial assistant."
						}
					]
				},
				blitwise: {
					title: "Blitwise",
					time: "2012 - 2013",
					description: "I discover a small nearby videogame developer, Blitwise, and contribute sound design, play-testing, and more to some mobile games.",
					image: "images/blitwise.jpg",
					options: [
						{
							id: "binghamton_recruiter",
							text: "Looking for something stable, I reconnect with my alma mater nearby."
						},
						{
							id: "harmonix",
							text: "I break into the professional videogame industry at Harmonix."
						},
						{
							id: "nyu_mfa",
							text: "Indie experience is good, but what I need is an master's in game design."
						}
					]
				},
				tfa_az: {
					title: "Teach for America: Arizona",
					time: "2012 - 2013",
					description: "It's a rough year, teaching high schoolers and being far from home, but I learn a lot, including conversational Spanish.",
					image: "images/tfa_az.jpg",
					options: [
						{
							id: "tfa_nyc",
							text: "I successfully petition TFA to re-place me back home in New York."
						},
						{
							id: "tfa_az2",
							text: "Things start to turn around in the spring, and I stay on for several years."
						},
						{
							id: "tfa_hq",
							text: "Teaching high school isn't for me, so I wind up at TFA headquarters."
						}
					]
				},
				ibm: {
					title: "IBM",
					time: "2012 - 2013",
					description: "I'm truly fortunate to start my career at a pioneer of technology and computer science - and to stay close to so many friends.",
					image: "images/ibm.jpg",
					options: [
						{
							id: "harmonix",
							text: "Big Blue is too big. I find a medium-size videogame maker instead."
						},
						{
							id: "skillshare",
							text: "My passion for education takes me to a ed-tech company."
						},
						{
							id: "nyu_mfa",
							text: "I build on my engineering experience with a master's in game design."
						}
					]
				},
				harpercollins: {
					title: "HarperCollins",
					time: "2012 - 2013",
					description: "My professional career begins in New York City, as an editorial assistant reviewing music history textbooks at HarperCollins.",
					image: "images/harpercollins.jpg",
					options: [
						{
							id: "mcgrawhill",
							text: "Next up, a lateral transfer to another publisher."
						},
						{
							id: "newsday",
							text: "I start looking to break out of books and into articles."
						},
						{
							id: "tfa_hq",
							text: "Working on educational content leads me to consider educators themselves."
						}
					]
				},
				boardwalk_dreamhatcher: {
					title: "Boardwalk Games & Dreamhatcher",
					time: "2012 - 2013",
					description: "I start working at Boardwalk Games, a small family-run gaming store on Long Island, and start my own company with some friends, self-publishing our own card games.",
					image: "images/boardwalk_dreamhatcher.jpg",
					options: [
						{
							id: "tfa_nyc",
							text: "I apply to Teach for America and get a teaching job in New York."
						},
						{
							id: "nyu_mfa",
							text: "I take my game business to the next level with a master's in game design."
						},
						{
							id: "newsday",
							text: "Networking and blogging experience helps me land a job at a local paper."
						}
					]
				},
				press_sun: {
					title: "Press & Sun Bulletin",
					time: "2012 - 2013",
					description: "At Binghamton's local paper, the \"Press & Sun Bulletin\", I review local and national stories for copy, styling, and factual mistakes.",
					image: "images/press_sun.jpg",
					options: [
						{
							id: "tfa_az2",
							text: "Teach for America offers a spot in Arizona - and I'm ready to leave home."
						},
						{
							id: "mcgrawhill",
							text: "Budget cuts and a hiring freeze mean I switch to publishing."
						},
						{
							id: "newsday",
							text: "This internship prepares me for a full-time copy editing position."
						}
					]
				},
				gillibrand: {
					title: "Gillibrand campaign",
					time: "2012 - 2013",
					description: "In Albany, NY, I do phone banking for Kirsten Gillibrand's successful Senate campaign, followed by some office work for the state Democratic Party.",
					image: "images/gillibrand.jpg",
					options: [
						{
							id: "binghamton_recruiter",
							text: "After an exhausting campaign, it's back to Binghamton to work for the school."
						},
						{
							id: "newsday",
							text: "I spend so much time reading the news that I vow to start writing it."
						},
						{
							id: "tfa_hq",
							text: "Invigorated by the campaign, I apply to TFA's National Marketing team."
						}
					]
				},

			// 2013-2015
				tfa_nyc: {
					actual: true,
					title: "Teach for America: NYC",
					time: "2013 - 2015",
					description: "I teach English and technology classes at a specialized high school in New York City for immigrants from Spanish-speaking countries who are pursuing careers in tech.",
					image: "images/tfa_nyc.jpg",
					options: [
						{
							id: "themuse_writer",
							text: "I apply to a freelance copy writing job and end up full-time editing."
						},
						{
							id: "binghamton_admissions",
							text: "A class fieldtrip touring colleges leads to a fortuitous opportunity."
						},
						{
							id: "nytimes",
							text: "I network my way to a dream job copy-editing at the New York Times."
						}
					]
				},
				binghamton_recruiter: {
					title: "BU Recruiter",
					time: "2013 - 2015",
					description: "Binghamton University sends me to high schools in towns and cities all across America, to meet students at college fairs and in-school presentations.",
					image: "images/binghamton_recruiter.jpg",
					options: [
						{
							id: "binghamton_admissions",
							text: "I switch from constant travel to the university admissions office."
						},
						{
							id: "codecademy",
							text: "A friend gets really into coding and encourages me to do the same."
						},
						{
							id: "clinton",
							text: "I decide the best way to make a difference is to get involved in politics."
						}
					]
				},
				harmonix: {
					title: "Harmonix",
					time: "2013 - 2015",
					description: "At Harmonix, a Boston game developer famous for Rock Band, I get to work on an online arena shooter with music mechanics... until its untimely cancelation.",
					image: "images/harmonix.jpg",
					options: [
						{
							id: "underblue_gigs",
							text: "I'm inspired to work on my own games - and start my own rock band."
						},
						{
							id: "codecademy",
							text: "I see how many doors coding can unlock, and I want to help others learn."
						},
						{
							id: "ideo",
							text: "My mixed bag of experiences intrigues IDEO enough to offer me a junior role."
						}
					]
				},
				tfa_az2: {
					title: "Teach for America: Arizona",
					time: "2013 - 2015",
					description: "In Phoenix, I teach a variety of high school math classes - algebra, trigonometry, and precalculus - and find a small center for SAT and ACT tutoring on the side.",
					image: "images/tfa_az2.jpg",
					options: [
						{
							id: "asu_admissions",
							text: "Preparing kids for college leads me to consider working for one."
						},
						{
							id: "hmh_nyc",
							text: "My time in education helps me break into educational content publishing."
						},
						{
							id: "clinton",
							text: "The political climate in Arizona compels me to keep Republicans out of office."
						}
					]
				},
				skillshare: {
					title: "Skillshare",
					time: "2013 - 2015",
					description: "I truly hone my collaborative coding skills on the SkillShare product engineering team. I also develop my artistic hobbies through the company's \"free SkillShare membership\" perk.",
					image: "images/skillshare.jpg",
					options: [
						{
							id: "underblue_gigs",
							text: "I take Skillshare courses on piano, sound editing, & web-dev."
						},
						{
							id: "codecademy",
							text: "I love working on tools that help people learn and grow."
						},
						{
							id: "ideo",
							text: "IDEO is hiring technical project managers for client work."
						}
					]
				},
				mcgrawhill: {
					title: "McGraw Hill",
					time: "2013 - 2015",
					description: "At McGraw Hill, a New York publishing house, I find myself editing textbooks and curriculum materials for history, math, and science courses.",
					image: "images/mcgrawhill.jpg",
					options: [
						{
							id: "underblue_gigs",
							text: "I drop of out publishing to start a band and write on the side."
						},
						{
							id: "hmh_nyc",
							text: "The only way I can advance is by finding a new employer."
						},
						{
							id: "nytimes",
							text: "I head uptown 10 blocks and find a different kind of editing job."
						}
					]
				},
				nyu_mfa: {
					title: "NYU MFA in game design",
					time: "2013 - 2015",
					description: "NYU's masters in game design changes the way I play and make games. I learn a lot from indie game-makers in the city, and even run a Kickstarter campaign.",
					image: "images/nyu_mfa.jpg",
					options: [
						{
							id: "underblue_gigs",
							text: "I put my degree to work making videogames. Also, I join a rock band."
						},
						{
							id: "hmh_nyc",
							text: "A master's and my alumni network help me find a position in publishing."
						},
						{
							id: "ideo",
							text: "IDEO recruiters attend our thesis project showcase event..."
						}
					]
				},
				newsday: {
					title: "Newsday",
					time: "2013 - 2015",
					description: "Over time, I graduate from exclusively editing articles to occasionally writing some - obituaries, financials, sometimes even New York politics.",
					image: "images/newsday.jpg",
					options: [
						{
							id: "themuse_writer",
							text: "I stumble across a career advice start-up recruiting writers."
						},
						{
							id: "nytimes",
							text: "With a few years of writing experience, I get a job at my dream paper."
						},
						{
							id: "clinton",
							text: "You can't cover the news and not see what's happening to this country."
						}
					]
				},
				tfa_hq: {
					title: "Teach for America: HQ",
					time: "2013 - 2015",
					description: "At Teach for America's New York City headquarters, I help create materials used for recruiting and training corps members and contribute to alumni outreach.",
					image: "images/tfa_hq.jpg",
					options: [
						{
							id: "binghamton_admissions",
							text: "An environment all about education leads me back to my alma mater."
						},
						{
							id: "themuse_writer",
							text: "Some TFA alumni point out a career advice start-up looking for writers."
						},
						{
							id: "clinton",
							text: "When programs like TFA are on the chopping block, it's time to fight."
						}
					]
				},

			// 2015-2017
				themuse_writer: {
					actual: true,
					title: "The Muse",
					time: "2015 - 2017",
					description: "At this fast-growing b2b/b2c start-up, I start as a writer and switch to managing a team of writers - creating behind-the-scenes content for company clients.",
					image: "images/themuse_writer.jpg",
					options: [
						{
							id: "themuse_pm",
							text: "The Muse gives me a shot managing some internal projects."
						},
						{
							id: "hmh_boston",
							text: "I finally get a job in the publishing industry, but not in New York."
						},
						{
							id: "bostonglobe",
							text: "I bring my writing and editing experience to The Boston Globe."
						}
					]
				},
				binghamton_admissions: {
					title: "BU Admissions",
					time: "2015 - 2017",
					description: "The fast-growing university is at once familiar and full of change. I work in the Admissions department, bringing in the next cohort of college students.",
					image: "images/binghamton_admissions.jpg",
					options: [
						{
							id: "boston_admissions",
							text: "All my Binghamton friends move to Boston, so I switch to the other BU."
						},
						{
							id: "apple",
							text: "Sick of Bing, I head west for warm weather and the promise of tech."
						},
						{
							id: "warren",
							text: "I'm captivated by Warren's policies and vow to help her campaign(s)."
						}
					]
				},
				underblue_gigs: {
					title: "Underblue + gigs",
					time: "2015 - 2017",
					description: "I play keys in a rock band, and make ends meet by freelancing: writing blog articles, building simple websites, and editing audio for musicians and games.",
					image: "images/underblue_gigs.jpg",
					options: [
						{
							id: "noteflight",
							text: "My love of music takes me to a small music-tech company."
						},
						{
							id: "apple",
							text: "I travel to San Francisco and decide to stay a while."
						},
						{
							id: "learninggamesnetwork",
							text: "I rediscover gaming and design as tools for education."
						}
					]
				},
				asu_admissions: {
					title: "ASU Admissions",
					time: "2015 - 2017",
					description: "On the Applicant Services team within Admissions at Arizona State University, I help highschool students and transfers alike join this college community.",
					image: "images/asu_admissions.jpg",
					options: [
						{
							id: "boston_admissions",
							text: "I care passionately about college admissions yet truly loathe Arizona."
						},
						{
							id: "apple",
							text: "My journey west continues, to the Apple Education team."
						},
						{
							id: "ellevation",
							text: "I enroll in ASU's online CS degree - and move back east."
						}
					]
				},
				codecademy: {
					title: "Codecademy",
					time: "2015 - 2017",
					description: "Codecademy wants to teach the world to code - for free - and I want to be a part of that. Their free interactive courses and quizzes are how I got started programming too!",
					image: "images/codecademy.jpg",
					options: [
						{
							id: "themuse_pm",
							text: "Another Y-Combinator company down the road is looking for a technical PM."
						},
						{
							id: "noteflight",
							text: "My music hobbies and coding resume make me a great fit for Noteflight."
						},
						{
							id: "ellevation",
							text: "Teaching people to code is one thing, but ed-tech can be so much more."
						}
					]
				},
				hmh_nyc: {
					title: "Houghton Mifflin Harcourt",
					time: "2015 - 2017",
					description: "Houghton Mifflin Harcourt creates both traditional print content and digital media for K-12 learners - some of which I edit, for accuracy and consistency.",
					image: "images/hmh_nyc.jpg",
					options: [
						{
							id: "apple",
							text: "I gain experience selling to schools, and take that to Apple Education."
						},
						{
							id: "ellevation",
							text: "After a coding bootcamp, I'm back in educational content... as a developer."
						},
						{
							id: "hmh_nyc",
							text: "I switch to HMH's Boston office and take on a role in educational content."
						}
					]
				},
				ideo: {
					title: "IDEO",
					time: "2015 - 2017",
					description: "From the \"Teachers Know Best\" digital platform for educators to the launch of the interactive city site Boston.gov, I get to learn, collaborate, and build awesome stuff.",
					image: "images/ideo.jpg",
					options: [
						{
							id: "themuse_pm",
							text: "Client-specific projects prepare me for project management at a start-up."
						},
						{
							id: "learninggamesnetwork",
							text: "I discover a Boston start-up building \"game-based learning tools\"."
						},
						{
							id: "noteflight",
							text: "A short stint at IDEO Boston, then on to a Boston-based music-tech tool."
						}
					]
				},
				nytimes: {
					title: "The New York Times",
					time: "2015 - 2017",
					description: "My time at the New York Times is spent mostly fact-checking and copy editing. A few short pieces on current events in New York and New England make the website!",
					image: "images/nytimes.jpg",
					options: [
						{
							id: "hmh_boston",
							text: "A focus on educational news prepares me to make digital textbook content."
						},
						{
							id: "bostonglobe",
							text: "With no room for growth (and friends in Boston) I head over to the Globe."
						},
						{
							id: "warren",
							text: "I write articles on Elizabeth Warren and see she has a solution for everything."
						}
					]
				},
				clinton: {
					title: "Clinton campaign",
					time: "2015 - 2017",
					description: "As Hillary Clinton campaigns in the primaries and then for the presidency, I'm part of a digital-first marketing team, learning tons about social media strategy and SEO.",
					image: "images/clinton.jpg",
					options: [
						{
							id: "learninggamesnetwork",
							text: "I stumble across a company gamifying learning near friends in Boston."
						},
						{
							id: "bostonglobe",
							text: "The Boston Globe is hiring a political columnist, and I somehow get the job."
						},
						{
							id: "warren",
							text: "There's always another fight - this time, in Massachusetts."
						}
					]
				},

			// 2017-2019
				themuse_pm: {
					actual: true,
					title: "The Muse",
					time: "2017 - 2019",
					description: "From infrastructure and databases to SEO and account management, from internal tooling to content recommendation, I get to work with incredible teams at The Muse.",
					image: "images/themuse_pm.jpg",
					options: [
						{
							id: "admithub",
							text: "I follow some friends to Boston and join AdmitHub as a Product Manager."
						}
					]
				},
				boston_admissions: {
					title: "BU Admissions",
					time: "2017 - 2019",
					description: "Working in Admissions at Boston University - a school twice the size of Binghamton - presents a new challenge, but supportive teammates guide me through these two years.",
					image: "images/boston_admissions.jpg",
					options: [
						{
							id: "admithub",
							text: "I take my admissions experience to AdmitHub as a Partner Support Manager."
						}
					]
				},
				noteflight: {
					title: "Noteflight",
					time: "2017 - 2019",
					description: "At Noteflight, a Somerville start-up making music notation tools, I lead a college partnerships project - and continue composing my own music.",
					image: "images/noteflight.jpg",
					options: [
						{
							id: "admithub",
							text: "My experience creating and promoting products leads me to AdmitHub's Workforce initiative."
						}
					]
				},
				apple: {
					title: "Apple: Education",
					time: "2017 - 2019",
					description: "From Silicon Valley, I network with schools all across the country to sell Apple devices and services to higher-ed institutions... and I get to explore California.",
					image: "images/apple.jpg",
					options: [
						{
							id: "admithub",
							text: "I take my sales skills and network of higher-ed contacts to AdmitHub as an account executive."
						}
					]
				},
				ellevation: {
					title: "Ellevation Education",
					time: "2017 - 2019",
					description: "At Ellevation Education, I'm motivated by the mission to empower teachers, administrators, and English language learners with tools for differentiated instruction.",
					image: "images/ellevation.jpg",
					options: [
						{
							id: "admithub",
							text: "I follow some Ellevation teammates a few floors to join AdmitHub as an engineer."
						}
					]
				},
				hmh_boston: {
					title: "Houghton Mifflin Harcourt",
					time: "2017 - 2019",
					description: "At Houghton Mifflin Harcourt in Boston, I create and edit curriculum content for student-centric literacy and math tools on digital devices.",
					image: "images/hmh_boston.jpg",
					options: [
						{
							id: "admithub",
							text: "After writing formal educational content for years, I apply to join AdmitHub's Content team."
						}
					]
				},
				learninggamesnetwork: {
					title: "Learning Games Network",
					time: "2017 - 2019",
					description: "Through the Learning Games Network, I help build an iPad app used by schools to assess literacy skills and screen for dyslexia in young learners.",
					image: "images/learninggamesnetwork.jpg",
					options: [
						{
							id: "admithub",
							text: "My experience with web and app interfaces helps me get a job with AdmitHub as a designer."
						}
					]
				},
				bostonglobe: {
					title: "The Boston Globe",
					time: "2017 - 2019",
					description: "I write mainly online articles for The Boston Globe, especially current events, politics, and education stories in the greater Boston area.",
					image: "images/bostonglobe.jpg",
					options: [
						{
							id: "admithub",
							text: "Years of formal writing and investigative journalism bring me to the AdmitHub Research team."
						}
					]
				},
				warren: {
					title: "Warren campaign",
					time: "2017 - 2019",
					description: "I work on Elizabeth Warren's reelection campaign for Senate and her primary run for president as a member of the digital marketing and fundraising team.",
					image: "images/warren.jpg",
					options: [
						{
							id: "admithub",
							text: "Politics never ends, but I find a new calling in ed-tech, and join AdmitHub's Marketing team."
						}
					]
				},

			// 2019-2021
				admithub: {
					actual: true,
					title: "AdmitHub / Mainstay",
					time: "2019 - present",
					description: "One way or another, I end up at AdmitHub (now Mainstay), \"The Engagement Platform Powered by Behavioral Intelligence\", and I share this personal history with my team.",
					image: "images/admithub.jpg",
					options: []
				},

			// alternate
				dinosaurs: {
					corrupted: true,
					title: "Uh-oh",
					time: "Late Cretaceous",
					description: "Agh! Look what you've done! You broke the time machine! When even are we!?",
					image: "images/dinosaur.jpg",
					options: [
						{
							id: "steampunk",
							text: "RUN!"
						}
					]
				},
				steampunk: {
					corrupted: true,
					title: "Captain Chrono",
					time: "1895",
					description: "Ah, a fellow traveler of time and space! Ahoy! Climb aboard my incredible quasi-chronological machine and we'll have you back to your timeline in no... ehhh... time.",
					image: "images/steampunk.jpg",
					options: [
						{
							id: "squarewheels",
							text: "Jolly good then."
						}
					]
				},
				squarewheels: {
					corrupted: true,
					title: "Wrong Timeline",
					time: "2017a",
					description: "I say, this may be off the mark, but it's not half bad, yes? Only a spot of difference. Square wheel in a round hole, and all that. Perhaps no one will notice you.",
					image: "images/squarewheels.jpg",
					options: [
						{
							id: "wizard",
							text: "Roll on, shall we?"
						}
					]
				},
				wizard: {
					corrupted: true,
					title: "I wish none of this had happened.",
					time: "The Third Age",
					description: "So do all who live to see such times. But that is not for them to decide. All we have to decide is what to do with the time that is given to us.",
					image: "images/wizard.jpg",
					options: [
						{
							id: "tunnel",
							text: "Not all those who wander are lost."
						}
					]
				},
				tunnel: {
					corrupted: true,
					title: "Time Tunnel",
					time: "[NaN]",
					description: "All right, then, it's only through that tunnel, and you'll be back to your own time. And we can all pretend like none of this had ever happened.",
					image: "images/tunnel.jpg",
					options: [
						{
							id: "admithub",
							text: "YOLO"
						}
					]
				}
		}

/*** on load ***/
	/* display starting event */
		displayEvent()

/*** selections ***/
	/* displayEvent */
		function displayEvent(options) {
			try {
				// already transitioning?
					if (STATE.transitioning) {
						return
					}
					STATE.transitioning = true

				// get options
					if (!options) { options = {} }
					options.id = options.id || CONSTANTS.firstEventId
					options.transition = options.transition || "fade-in" // direction of camera

				// id not found?
					let eventData = EVENTS[options.id]
					if (!eventData) {
						return
					}

				// adjust line?
					if (ELEMENTS.line.hasAttribute("no-event")) {
						setTimeout(function() {
							ELEMENTS.line.removeAttribute("no-event")
						}, 0)
					}
					if (STATE.thisTimeline[STATE.thisTimeline.length - 1] !== CONSTANTS.firstEventId) {
						ELEMENTS.line.removeAttribute("first-event")
					}
					if (STATE.thisTimeline[STATE.thisTimeline.length - 1] !== CONSTANTS.lastEventId) {
						ELEMENTS.line.removeAttribute("last-event")
					}

				// move current event to opposite direction
					if (STATE.currentEvent) {
						STATE.transitionedEvent = STATE.currentEvent
						STATE.transitionedEvent.setAttribute("transition", 
							options.transition == "fade-in" ? "fade-out" :
							options.transition == "left" ? "right" : "left"
						)
						STATE.currentEvent = null
					}

				// create new event
					let currentEvent = document.createElement("div")
						currentEvent.className = "event-card"
						currentEvent.setAttribute("transition", options.transition)
					ELEMENTS.viewer.appendChild(currentEvent)
					STATE.currentEvent = currentEvent

					let currentEventLine = document.createElement("div")
						currentEventLine.className = "event-line"
					currentEvent.appendChild(currentEventLine)

					let currentEventNode = document.createElement("div")
						currentEventNode.className = "event-node"
					currentEvent.appendChild(currentEventNode)

				// actual event?
					if (eventData.actual) {
						ELEMENTS.body.setAttribute("timeline", "actual")
						currentEvent.setAttribute("timeline", "actual")
					}
					else if (eventData.corrupted) {
						ELEMENTS.body.setAttribute("timeline", "corrupted")
						currentEvent.setAttribute("timeline", "corrupted")
					}
					else {
						ELEMENTS.body.setAttribute("timeline", "alternate")
						currentEvent.setAttribute("timeline", "alternate")
					}

				// add details
					let currentEventImage = document.createElement("div")
						currentEventImage.className = "event-image"
						if (eventData.image) {
							currentEventImage.style.backgroundImage = "url(" + eventData.image + ")"
						}
					currentEvent.appendChild(currentEventImage)

					let currentEventText = document.createElement("div")
						currentEventText.className = "event-text"
					currentEvent.appendChild(currentEventText)

					let currentEventTitle = document.createElement("h2")
						currentEventTitle.className = "event-title"
						currentEventTitle.innerText = eventData.title || ""
					currentEventText.appendChild(currentEventTitle)

					let currentEventTime = document.createElement("h3")
						currentEventTime.className = "event-time"
						currentEventTime.innerText = eventData.time || ""
					currentEventText.appendChild(currentEventTime)

					let currentEventDescription = document.createElement("p")
						currentEventDescription.className = "event-description"
						currentEventDescription.innerText = eventData.description || ""
					currentEventText.appendChild(currentEventDescription)

				// previous event (unless first event)
					if (options.id !== CONSTANTS.firstEventId) {
						let previousEventButton = document.createElement("button")
							previousEventButton.className = "event-previous"
							previousEventButton.innerHTML = "<span class='left-arrow'>&larr;</span>" + CONSTANTS.backPhrases[Math.floor(Math.random() * CONSTANTS.backPhrases.length)]
							previousEventButton.addEventListener("click", previousEvent)
						currentEvent.appendChild(previousEventButton)
					}

				// next event options
					let nextEventList = document.createElement("div")
						nextEventList.className = "event-options"
					currentEvent.appendChild(nextEventList)

					for (let i in eventData.options) {
						let nextEventButton = document.createElement("button")
							nextEventButton.className = "event-next"
							nextEventButton.innerHTML = (eventData.options[i].text || "") + "<span class='right-arrow'>&rarr;</span>"
							nextEventButton.setAttribute("event-id", eventData.options[i].id)
							nextEventButton.addEventListener("click", nextEvent)

						// randomize order
							if (Math.floor(Math.random() * 2)) {
								nextEventList.appendChild(nextEventButton)
							}
							else {
								nextEventList.prepend(nextEventButton)
							}
					}

				// start sliding in
					setTimeout(function() {
						// first or last event
							if (STATE.thisTimeline[STATE.thisTimeline.length - 1] == CONSTANTS.firstEventId) {
								ELEMENTS.line.setAttribute("first-event", true)
							}
							if (STATE.thisTimeline[STATE.thisTimeline.length - 1] == CONSTANTS.lastEventId) {
								ELEMENTS.line.setAttribute("last-event", true)
							}

						// move in from opposite direction
							STATE.currentEvent.removeAttribute("transition")
							STATE.transitioning = false
						}, 0)

				// delay
					clearTimeout(STATE.transitionTimeout)
					STATE.transitionTimeout = setTimeout(function() {
						// remove old event
							if (STATE.transitionedEvent) {
								STATE.transitionedEvent.remove()
								STATE.transitionedEvent = null
							}
					}, CONSTANTS.transitionDelay)
			} catch (error) {console.log(error)}
		}

	/* previousEvent */
		function previousEvent(event) {
			try {
				// first event?
					if (STATE.thisTimeline.length <= 1) {
						return
					}

				// increase previousEventCount
					STATE.previousEventCount++

				// crazy timeline
					if (STATE.previousEventCount >= CONSTANTS.previousEventCountdown) {
						STATE.previousEventCount = 0
						STATE.thisTimeline = [CONSTANTS.firstEventId, CONSTANTS.corruptedTimelineEventId]
						displayEvent({id: CONSTANTS.corruptedTimelineEventId, transition: "left"})
						return
					}

				// get id
					let previousEventId = STATE.thisTimeline[STATE.thisTimeline.length - 2]
					STATE.thisTimeline.pop()

				// slide
					displayEvent({id: previousEventId, transition: "left"})
			} catch (error) {console.log(error)}
		}

	/* nextEvent */
		function nextEvent(event) {
			try {
				// get id from button
					let nextEventId = event.target.getAttribute("event-id")
					if (!nextEventId) {
						return
					}

				// add to timeline
					STATE.thisTimeline.push(nextEventId)

				// slide
					displayEvent({id: nextEventId, transition: "right"})
			} catch (error) {console.log(error)}
		}

	/* resetEvents */
		ELEMENTS.reset.addEventListener("click", resetEvents)
		function resetEvents(event) {
			try {
				// already on first event?
					if (STATE.thisTimeline.length == 1) {
						return
					}
					
				// clear timeline
					STATE.thisTimeline = [CONSTANTS.firstEventId]
					STATE.previousEventCount = 0

				// animate left to 0
					displayEvent({id: CONSTANTS.firstEventId, transition: "left"})
			} catch (error) {console.log(error)}
		}
