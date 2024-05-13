/*** globals ***/
	/* triggers */
		const TRIGGERS = {
			click: "click",
			end: "ended"
		}

	/* constants */
		const CONSTANTS = {
			artworkPath: "https://raw.githubusercontent.com/jamesbmayr/music/master/artwork/",
			audioPath: "https://raw.githubusercontent.com/jamesbmayr/music/master/music/",
			lyricsPath: "https://raw.githubusercontent.com/jamesbmayr/music/master/lyrics/"
		}

	/* elements */
		const ELEMENTS = {
			discography: document.querySelector("#discography"),
			player: document.querySelector("#player"),
			source: document.querySelector("#source"),
			artwork: document.querySelector("#artwork"),
			lyrics: document.querySelector("#lyrics"),
			nowPlayingTrack: document.querySelector("#now-playing-track"),
			nowPlayingAlbum: document.querySelector("#now-playing-album"),
			logo: document.querySelector("#logo"),
			title: document.querySelector("#title")
		}

	/* state */
		const STATE = {
			album: null,
			index: null
		}

	/* music */
		const MUSIC = {
			alternates: {id: "alternates", image: "alternates.png", name: "Alternates", year: "[left over time]", tracks: [
				{name: "A Drop of Death (Chalice)", audio: "adropofdeathchalice.mp3"},
				{name: "A Drop of Death (Max Pekarsky mix)", audio: "adropofdeathmaxpekarskymix.mp3"},
				{name: "Baroquen Dreams", audio: "baroquendreams.mp3"},
				{name: "Breaking Open the Box (Chalice)", audio: "breakingopenthebox.mp3"},
				{name: "Cerulean Underground", audio: "ceruleanunderground.mp3"},
				{name: "Construction (Explo mix)", audio: "constructionexplomix.mp3"},
				{name: "Consort Concerto for Piano", audio: "consortconcertoforpiano.mp3"},
				{name: "Daydream Come True", audio: "daydreamcometrue.mp3"},
				{name: "Daydream Come True (Jazz Band mix)", audio: "daydreamcometruejazzbandmix.mp3"},
				{name: "Finale (Eternal Horizon)", audio: "finaleeternalhorizon.mp3"},
				{name: "Into the Void (Explo mix)", audio: "intothevoidexplomix.mp3"},
				{name: "Just in Time (Explo mix)", audio: "justintime.mp3"},
				{name: "LinkLook Ad", audio: "linklookad.mp3"},
				{name: "Nightmare Come True", audio: "nightmarecometrue.mp3"},
				{name: "No Control", audio: "nocontrol.mp3"},
				{name: "Octive March", audio: "octivemarch.mp3"},
				{name: "Out of My Heart", audio: "outofmyheart.mp3", lyrics: "outofmyheart.txt"},
				{name: "Parade (Explo mix)", audio: "paradeexplomix.mp3", lyrics: "paradeexplomix.txt"},
				{name: "Pretense (80s mix)", audio: "pretense80smix.mp3", lyrics: "pretense80smix.txt"},
				{name: "Riff", audio: "riff.mp3"},
				{name: "Sharewaves Intro", audio: "sharewavesintro.mp3"},
				{name: "Sitting at a Stone Table (Chalice)", audio: "sittingatastonetablechalice.mp3"},
				{name: "SoW British March", audio: "sowbritishmarch.mp3"},
				{name: "SoW Russian March", audio: "sowrussianmarch.mp3"},
				{name: "Spider Jazz", audio: "spiderjazz.mp3"},
				{name: "Stride (piano)", audio: "stridepiano.mp3"},
				{name: "Wake (Captain Chrono)", audio: "wakecaptainchrono.mp3"},
				{name: "Miracle / Shadow: The Next Generation (Dan Weinstein mix)", audio: "miracleshadowthenextgenerationdanweinsteinmix.mp3"}
			]},
			eternalhorizon: {id: "eternalhorizon", image: "eternalhorizon.png", name: "Eternal Horizon", year: 2007, tracks: [
				{name: "Eternal Horizon", audio: "eternalhorizon.mp3"},
				{name: "Midnight Retreat", audio: "midnightretreat.mp3"},
				{name: "Golden Hope", audio: "goldenhope.mp3"},
				{name: "Epic of Koranames", audio: "epicofkoranames.mp3"},
				{name: "Windwater", audio: "windwater.mp3"},
				{name: "Clifftop Clash", audio: "clifftopclash.mp3"},
				{name: "Paradaze", audio: "paradaze.mp3"},
				{name: "Summer's End", audio: "summersend.mp3"},
				{name: "Pachelbel's Catapult", audio: "pachelbelscatapult.mp3"},
				{name: "March of the Pine Trees", audio: "marchofthepinetrees.mp3"},
				{name: "Frost Rain", audio: "frostrain.mp3"},
				{name: "Another Epic Journey", audio: "anotherepicjourney.mp3"},
				{name: "Seafoam and Sunsets", audio: "seafoamandsunsets.mp3"},
				{name: "Falling Flowers", audio: "fallingflowers.mp3"},
				{name: "Dreamcatcher", audio: "dreamcatcher.mp3"},
				{name: "Morning Dew", audio: "morningdew.mp3"}
			]},
			skyburst: {id: "skyburst", image: "skyburst.png", name: "Skyburst", year: 2008, tracks: [
				{name: "Sunlight Silhouette", audio: "sunlightsilhouette.mp3"},
				{name: "Evergray", audio: "evergray.mp3"},
				{name: "Hot Air Balloons", audio: "hotairballoons.mp3"},
				{name: "Tales of a Nothing Little Town", audio: "talesofanothinglittletown.mp3"},
				{name: "November March", audio: "novemebermarch.mp3"},
				{name: "December March", audio: "decembermarch.mp3"},
				{name: "Tales of the Broken City", audio: "talesofthebrokencity.mp3"},
				{name: "Victorious Valediction", audio: "victoriousvalediction.mp3"},
				{name: "Time", audio: "time.mp3"},
				{name: "Bells and Whistles", audio: "bellsandwhistles.mp3"},
				{name: "Fireplace", audio: "fireplace.mp3"},
				{name: "Terza Rima", audio: "terzarima.mp3"},
				{name: "Firestorm Sea", audio: "firestormsea.mp3"},
				{name: "Clear Blue", audio: "clearblue.mp3", lyrics: "clearblue.txt"},
				{name: "Rebirth", audio: "rebirth.mp3"},
				{name: "Skyburst", audio: "skyburst.mp3"}
			]},
			shadowvalley: {id: "shadowvalley", image: "shadowvalley.png", name: "Shadow Valley", year: 2009, tracks: [
				{name: "Stride", audio: "stride.mp3"},
				{name: "Beforestory", audio: "beforestory.mp3"},
				{name: "January March", audio: "januarymarch.mp3"},
				{name: "The Wall", audio: "thewall.mp3"},
				{name: "Gray Destiny", audio: "graydestiny.mp3"},
				{name: "Snowshade", audio: "snowshade.mp3"},
				{name: "Spirit of Adventure", audio: "spiritofadventure.mp3"},
				{name: "Far-Fading Lights", audio: "farfadinglights.mp3"},
				{name: "Shadow Valley", audio: "shadowvalley.mp3"},
				{name: "October Twilight", audio: "octobertwilight.mp3"},
				{name: "Lullabybye", audio: "lullabybye.mp3"},
				{name: "Jungle Noon", audio: "junglenoon.mp3"},
				{name: "Finding Your Place", audio: "findingyourplace.mp3"},
				{name: "Air", audio: "air.mp3"},
				{name: "Fire", audio: "fire.mp3"},
				{name: "Earth", audio: "earth.mp3"}
			]},
			draftsadrift: {id: "draftsadrift", image: "draftsadrift.png", name: "Drafts Adrift", year: 2010, tracks: [
				{name: "Souls of War Theme", audio: "soulsofwartheme.mp3"},
				{name: "MegaStar RaceWay", audio: "megastarraceway.mp3"},
				{name: "Harmony Hums", audio: "harmonyhums.mp3"},
				{name: "Pretense", audio: "pretense.mp3", lyrics: "pretense.txt"},
				{name: "Quickstep Crash", audio: "quickstepcrash.mp3"},
				{name: "In the Middle of the Month of March", audio: "inthemiddleofthemonthofmarch.mp3"},
				{name: "Tumbleweed Standoff", audio: "tumbleweedstandoff.mp3"},
				{name: "Fanfare Variations", audio: "fanfarevariations.mp3"},
				{name: "Darkness Dungeon", audio: "darknessdungeon.mp3"},
				{name: "Seafarer's Ballad", audio: "seafarersballad.mp3"},
				{name: "Island Jazz", audio: "islandjazz.mp3"},
				{name: "Contemplation", audio: "contemplation.mp3"},
				{name: "Meteor Wasteland", audio: "meteorwasteland.mp3"},
				{name: "Keep Calm and Carry On", audio: "keepcalmandcarryon.mp3"},
				{name: "Robot Waltz", audio: "robotwaltz.mp3"},
				{name: "Clarinet Corral", audio: "clarinetcorral.mp3"}
			]},
			cascade: {id: "cascade", image: "cascade.png", name: "Cascade", year: 2011, tracks: [
				{name: "Uplift", audio: "uplift.mp3"},
				{name: "Freefall", audio: "freefall.mp3"},
				{name: "Plummet", audio: "plummet.mp3"},
				{name: "Marvel at the Sky", audio: "marvelatthesky.mp3"},
				{name: "Yesteryear's July", audio: "yesteryearsjuly.mp3"},
				{name: "I'll Be Fine", audio: "illbefine.mp3", lyrics: "illbefine.txt"},
				{name: "Consort Concerto for Winds", audio: "consortconcertoforwinds.mp3"},
				{name: "Gleam", audio: "gleam.mp3"},
				{name: "Solstice Song", audio: "solsticesong.mp3", lyrics: "solsticesong.txt"},
				{name: "Mistaken Faces", audio: "mistakenfaces.mp3", lyrics: "mistakenfaces.txt"},
				{name: "Quest", audio: "quest.mp3"},
				{name: "Brass Blaster", audio: "brassblaster.mp3"},
				{name: "Modernity", audio: "modernity.mp3"},
				{name: "Ice", audio: "ice.mp3"},
				{name: "Chameleon", audio: "chameleon.mp3"},
				{name: "Into the Void", audio: "intothevoid.mp3"}
			]},
			draftsadrift2: {id: "draftsadrift2", image: "draftsadrift2.png", name: "Drafts Adrift 2", year: 2011, tracks: [
				{name: "Sounddrawn", audio: "sounddrawn.mp3"},
				{name: "Abraham Lincoln", audio: "abrahamlincoln.mp3", lyrics: "abrahamlincoln.txt"},
				{name: "Puzzlement", audio: "puzzlement.mp3"},
				{name: "Snake-a-pede", audio: "snakeapede.mp3"},
				{name: "Pizzicato Pulse", audio: "pizzicatopulse.mp3"},
				{name: "SoW French Theme", audio: "sowfrenchtheme.mp3"},
				{name: "SoW Transitions", audio: "sowtransitions.mp3"},
				{name: "SoW German Theme", audio: "sowgermantheme.mp3"},
				{name: "SoW American March", audio: "sowamericanmarch.mp3"},
				{name: "Wavering Black", audio: "waveringblack.mp3"},
				{name: "Rainscape", audio: "rainscape.mp3"},
				{name: "Don't Touch Me; I Hate You", audio: "donttouchmeihateyou.mp3", lyrics: "donttouchmeihateyou.txt"},
				{name: "Road Crosser", audio: "roadcrosser.mp3"},
				{name: "Ski Slope Theme", audio: "skislopetheme.mp3"},
				{name: "Chromatones", audio: "chromatones.mp3"},
				{name: "Together Again", audio: "togetheragain.mp3", lyrics: "togetheragain.txt"}
			]},
			captainchronosailsthroughtime: {id: "captainchronosailsthroughtime", image: "captainchronosailsthroughtime.png", name: "Captain Chrono Sails Through Time", year: 2012, tracks: [
				{name: "Home", audio: "home.mp3"},
				{name: "Apocalypse", audio: "apocalypse.mp3"},
				{name: "Solemnes", audio: "solemnes.mp3"},
				{name: "Mobster Maze", audio: "mobstermaze.mp3"},
				{name: "Conquistadores", audio: "conquistadores.mp3"},
				{name: "Ragtime Locomotive", audio: "ragtimelocomotive.mp3"},
				{name: "Drums", audio: "drums.mp3"},
				{name: "Gamelan Jazz", audio: "gamelanjazz.mp3"},
				{name: "Celtic Castle", audio: "celticcastle.mp3"},
				{name: "Old West in the Middle East", audio: "oldwestinthemiddleeast.mp3"},
				{name: "Isla del Sol", audio: "isladelsol.mp3"},
				{name: "Shamisen Shimmer", audio: "shamisenshimmer.mp3"},
				{name: "Synthphony", audio: "synthphony.mp3"},
				{name: "Life on Mars", audio: "lifeonmars.mp3"},
				{name: "Frontlines", audio: "frontlines.mp3"},
				{name: "Alexander", audio: "alexander.mp3"}
			]},
			penduluminous: {id: "penduluminous", image: "penduluminous.png", name: "Penduluminous", year: 2012, tracks: [
				{name: "After All", audio: "afterall.mp3", lyrics: "afterall.txt"},
				{name: "Would You Be My Muse?", audio: "wouldyoubemymuse.mp3", lyrics: "wouldyoubemymuse.txt"},
				{name: "Ghost in the Drum Machine", audio: "ghostinthedrummachine.mp3", lyrics: "ghostinthedrummachine.txt"},
				{name: "Where We Left Off", audio: "whereweleftoff.mp3", lyrics: "whereweleftoff.txt"},
				{name: "Flash (Hurry Up and Wait)", audio: "flashhurryupandwait.mp3", lyrics: "flashhurryupandwait.txt"},
				{name: "You Told Me That You Loved Me Too Soon", audio: "youtoldmethatyoulovedmetoosoon.mp3", lyrics: "youtoldmethatyoulovedmetoosoon.txt"},
				{name: "Treasure", audio: "treasure.mp3", lyrics: "treasure.txt"},
				{name: "Moonlight", audio: "moonlight.mp3", lyrics: "moonlight.txt"},
				{name: "Wheels Turning", audio: "wheelsturning.mp3", lyrics: "wheelsturning.txt"},
				{name: "Sorry I'm So Late", audio: "sorryimsolate.mp3", lyrics: "sorryimsolate.txt"},
				{name: "Tell Me", audio: "tellme.mp3", lyrics: "tellme.txt"},
				{name: "Rise", audio: "rise.mp3", lyrics: "rise.txt"},
				{name: "Swing, Pendulum, Swing", audio: "swingpendulumswing.mp3", lyrics: "swingpendulumswing.txt"},
				{name: "One Day", audio: "oneday.mp3", lyrics: "oneday.txt"},
				{name: "Minus Money", audio: "minusmoney.mp3", lyrics: "minusmoney.txt"},
				{name: "365", audio: "365.mp3", lyrics: "365.txt"}
			]},
			thedeathmakerssymphony: {id: "thedeathmakerssymphony", image: "thedeathmakerssymphony.png", name: "The Deathmakers' Symphony", year: 2013, tracks: [
				{name: "Adaptation", audio: "adaptation.mp3", lyrics: "adaptation.txt"},
				{name: "Shipwreck", audio: "shipwreck.mp3", lyrics: "shipwreck.txt"},
				{name: "A Most Peculiar Child", audio: "amostpeculiarchild.mp3", lyrics: "amostpeculiarchild.txt"},
				{name: "Becoming Friends", audio: "becomingfriends.mp3", lyrics: "becomingfriends.txt"},
				{name: "Jailbreak!", audio: "jailbreak.mp3", lyrics: "jailbreak.txt"},
				{name: "The Dragon", audio: "thedragon.mp3", lyrics: "thedragon.txt"},
				{name: "Never Been Home Before", audio: "neverbeenhomebefore.mp3", lyrics: "neverbeenhomebefore.txt"},
				{name: "Maybe Something More", audio: "maybesomethingmore.mp3", lyrics: "maybesomethingmore.txt"},
				{name: "Construction", audio: "construction.mp3", lyrics: "construction.txt"},
				{name: "Bittersweet", audio: "bittersweet.mp3", lyrics: "bittersweet.txt"},
				{name: "Sails on the Horizon", audio: "sailsonthehorizon.mp3", lyrics: "sailsonthehorizon.txt"},
				{name: "Annihilation", audio: "annihilation.mp3", lyrics: "annihilation.txt"},
				{name: "The Lightning Isle", audio: "thelightningisle.mp3", lyrics: "thelightningisle.txt"},
				{name: "Lovelost", audio: "lovelost.mp3", lyrics: "lovelost.txt"},
				{name: "The Cure", audio: "thecure.mp3", lyrics: "thecure.txt"},
				{name: "Forever", audio: "forever.mp3", lyrics: "forever.txt"}
			]},
			singles: {id: "singles", image: "singles.png", name: "Singles", year: 2016, tracks: [
				{name: "Goodbye", audio: "goodbye.mp3", lyrics: "goodbye.txt"},
				{name: "Motion", audio: "motion.mp3", lyrics: "motion.txt"},
				{name: "Engine", audio: "engine.mp3", lyrics: "engine.txt"},
				{name: "Concede", audio: "concede.mp3", lyrics: "concede.txt"},
				{name: "Interconnected", audio: "interconnected.mp3", lyrics: "interconnected.txt"},
				{name: "Sunshine", audio: "sunshine.mp3", lyrics: "sunshine.txt"},
				{name: "Expedition", audio: "expedition.mp3", lyrics: "expedition.txt"},
				{name: "Window", audio: "window.mp3", lyrics: "window.txt"},
				{name: "Villain", audio: "villain.mp3", lyrics: "villain.txt"},
				{name: "Ambition", audio: "ambition.mp3", lyrics: "ambition.txt"},
				{name: "Exhaustion", audio: "exhaustion.mp3", lyrics: "exhaustion.txt"},
				{name: "Facade", audio: "facade.mp3", lyrics: "facade.txt"},
				{name: "Train", audio: "train.mp3", lyrics: "train.txt"},
				{name: "Weight", audio: "weight.mp3", lyrics: "weight.txt"},
				{name: "Doubt", audio: "doubt.mp3", lyrics: "doubt.txt"},
				{name: "Hello", audio: "hello.mp3", lyrics: "hello.txt"}
			]},
			draftsadrift3: {id: "draftsadrift3", image: "draftsadrift3.png", name: "Drafts Adrift 3", year: 2023, tracks: [
				{name: "Prologue", audio: "prologue.mp3"},
				{name: "A Game of Death and Deception", audio: "agameofdeathanddeception.mp3"},
				{name: "Ideation", audio: "ideation.mp3"},
				{name: "Mischief", audio: "mischief.mp3"},
				{name: "Four-oh-Four!", audio: "fourohfour.mp3"},
				{name: "Melodemons", audio: "melodemons.mp3"},
				{name: "Everything Is Reel; Please Do Not Question This", audio: "everythingisreelpleasedonotquestionthis.mp3"},
				{name: "Counting Clouds", audio: "countingclouds.mp3"},
				{name: "Way Out", audio: "wayout.mp3"},
				{name: "Interweave", audio: "interweave.mp3"},
				{name: "Miracle / Shadow: The Next Generation", audio: "miracleshadowthenextgeneration.mp3"},
				{name: "The Tiger's Woods and the Wagon Summoner", audio: "thetigerswoodsandthewagonsummoner.mp3"},
				{name: "Time After Last Time", audio: "timeafterlasttime.mp3", lyrics: "timeafterlasttime.txt"},
				{name: "Cycles", audio: "cycles.mp3"},
				{name: "Ending", audio: "ending.mp3"},
				{name: "Reflections", audio: "reflections.mp3"}
			]}
		}

/*** menu ***/
	/* buildMenu */
		buildMenu()
		function buildMenu() {
			try {
				let keys = Object.keys(MUSIC).reverse()
				
				for (let k in keys) {
					// track
						const album = MUSIC[keys[k]]

					// container
						const albumElement = document.createElement("details")
							albumElement.id = album.id
						ELEMENTS.discography.appendChild(albumElement)
						ELEMENTS[album.id] = albumElement

					// heading
						const summaryElement = document.createElement("summary")
						albumElement.appendChild(summaryElement)

						const coverElement = document.createElement("div")
							coverElement.className = "sidebar-cover"
							coverElement.style["background-image"] = "url(" + CONSTANTS.artworkPath + album.image + ")"
						summaryElement.appendChild(coverElement)

						const infoElement = document.createElement("div")
							infoElement.className = "sidebar-info"
						summaryElement.appendChild(infoElement)

						const nameElement = document.createElement("h2")
							nameElement.className = "sidebar-name"
							nameElement.innerText = album.name
						infoElement.appendChild(nameElement)

						const yearElement = document.createElement("h3")
							yearElement.className = "sidebar-year"
							yearElement.innerText = album.year
						infoElement.appendChild(yearElement)

					// track listing
						const listElement = document.createElement("ol")
							listElement.setAttribute("start", 1)
						albumElement.appendChild(listElement)

						for (let t in album.tracks) {
							const track = album.tracks[t]

							const itemElement = document.createElement("li")
								itemElement.setAttribute("index", t)
							listElement.appendChild(itemElement)

							const buttonElement = document.createElement("button")
								buttonElement.innerText = track.name
								buttonElement.addEventListener(TRIGGERS.click, selectTrack)
							itemElement.appendChild(buttonElement)
						}
				}
			} catch (error) {console.log(error)}
		}

	/* selectTrack */
		function selectTrack(event) {
			try {
				// before
					const beforeSong = {
						album: STATE.album,
						index: STATE.index
					}

				// set current
					STATE.album = event.target.closest("details").id
					STATE.index = Number(event.target.closest("li").getAttribute("index"))

				// same?
					if (beforeSong.album == STATE.album && beforeSong.index == STATE.index) {
						// playing?
							if (ELEMENTS.player.paused) {
								ELEMENTS.player.play()
							}
							else {
								ELEMENTS.player.pause()
							}

						return
					}

				// updatePlayer
					updatePlayer()
			} catch (error) {console.log(error)}
		}

/*** lyrics ***/
	/* toggleLyrics */
		ELEMENTS.lyrics.addEventListener(TRIGGERS.click, toggleLyrics)
		function toggleLyrics(event) {
			try {
				if (ELEMENTS.lyrics.getAttribute("active")) {
					ELEMENTS.lyrics.removeAttribute("active")
					return
				}

				if (ELEMENTS.lyrics.innerHTML.length) {
					ELEMENTS.lyrics.setAttribute("active", true)
				}
			} catch (error) {console.log(error)}
		}

/*** player ***/
	/* playNext */
		ELEMENTS.player.addEventListener(TRIGGERS.end, playNext)
		function playNext() {
			try {
				// set current
					if (STATE.index < MUSIC[STATE.album].tracks.length - 1) {
						STATE.index++
					}
					else {
						STATE.index = 0
						const keys = Object.keys(MUSIC)
						const albumIndex = keys.indexOf(STATE.album)

						if (albumIndex > 0) {
							STATE.album = keys[albumIndex - 1]
						}
						else {
							STATE.album = keys[keys.length - 1]
						}
					}

				// updatePlayer
					updatePlayer()
			} catch (error) {console.log(error)}
		}

	/* loadPlayer */
		loadPlayer()
		function loadPlayer() {
			try {
				// querystring
					const get = {}
					const querystring = location.search.substring(1)
					if (querystring) {
						const querystringPairs = querystring.split("&")
						querystringPairs.forEach(function(pair) {
							pair = pair.split("=")
							get[pair[0]] = pair[1]
						})
					}

				// track?
					if (get.track) {
						const cleanTitle = cleanString(get.track)
						albumLoop: for (let i in MUSIC) {
							const album = MUSIC[i]
							trackLoop: for (let j = 0; j < album.tracks.length; j++) {
								const track = MUSIC[i].tracks[j]
								if (cleanString(track.name) == cleanTitle) {
									STATE.album = i
									STATE.index = j
									break albumLoop
									break trackLoop
								}
							}
						}
					}

				// album?
					if (!STATE.album && get.album && MUSIC[get.album.toLowerCase()]) {
						STATE.album = get.album.toLowerCase()
						STATE.index = 0
						
						if (get.track) {
							const cleanTitle = cleanString(get.track).trim()
							const album = MUSIC[STATE.album]
							trackLoop: for (let j = 0; j < album.tracks.length; j++) {
								const track = album.tracks[j]
								if (cleanString(track.name) == cleanTitle) {
									STATE.index = j
									break trackLoop
								}
							}
						}
					}
				
				// neither
					if (!STATE.album) {
						const keys = Object.keys(MUSIC)
						STATE.album = keys[Math.floor(Math.random() * keys.length)]

						const album = MUSIC[STATE.album]
						STATE.index = Math.floor(Math.random() * album.tracks.length)
					}
				
				// set
					ELEMENTS[STATE.album].setAttribute("open", true)
					ELEMENTS[STATE.album].scrollIntoView()

				// update player
					updatePlayer(true)
			} catch (error) {console.log(error)}
		}

	/* updatePlayer */
		function updatePlayer(firstLoad) {
			try {
				// album
					const album = MUSIC[STATE.album]
					const track = album.tracks[STATE.index]

				// reset music
					ELEMENTS.player.pause()
					ELEMENTS.player.currentTime = 0
					ELEMENTS.source.setAttribute("src", CONSTANTS.audioPath + track.audio)
					ELEMENTS.player.load()

					if (!firstLoad) {
						ELEMENTS.player.play()
					}

				// update text & picture
					ELEMENTS.artwork.style["background-image"] = "url(" + CONSTANTS.artworkPath + album.image + ")"
					ELEMENTS.nowPlayingAlbum.innerText = album.name
					ELEMENTS.nowPlayingTrack.innerText = track.name

				// update meta data
					ELEMENTS.logo.href = CONSTANTS.artworkPath + album.image
					ELEMENTS.title.innerText = "jamesmayr: " + track.name

				// update URL
					let currentURL = new URL(window.location.href)
						currentURL.search = "?album=" + cleanString(album.name) +
											"&track=" + cleanString(track.name)
					window.history.pushState({}, "", currentURL)

				// select track text
					const selected = Array.from(ELEMENTS.discography.querySelectorAll("[selected]"))
					for (let i in selected) {
						selected[i].removeAttribute("selected")
					}

					const tracks = Array.from(ELEMENTS[STATE.album].querySelectorAll("li"))
						tracks[STATE.index].setAttribute("selected", true)
					ELEMENTS[STATE.album].setAttribute("selected", true)

				// lyrics
					ELEMENTS.lyrics.innerHTML = ""
					if (track.lyrics) {
						fetch(CONSTANTS.lyricsPath + track.lyrics, {method: "GET"})
						.then(function(response){ return response.text() })
						.then(function(text) {
							ELEMENTS.lyrics.innerHTML = text.replace(/\n/g, "<br>")
							ELEMENTS.lyrics.setAttribute("active", true)
						})
					}
					else {
						ELEMENTS.lyrics.removeAttribute("active")
					}
			} catch (error) {console.log(error)}
		}

/*** tools ***/
	/* cleanString */
		function cleanString(text) {
			try {
				return String(text).toLowerCase().replace(/[^a-z0-9]/g, "").trim()
			} catch (error) {console.log(error)}
		}
