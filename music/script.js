window.onload = function() {

	/*** globals ***/
		/* triggers */
			if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
				var on = { click: "touchstart", mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" }
			}
			else {
				var on = { click:      "click", mousedown:  "mousedown", mousemove: "mousemove", mouseup:  "mouseup" }
			}

		/* elements */
			var discography = document.getElementById("discography")
			var player = document.getElementById("player")
			var source = document.getElementById("source")
			
			var artwork = document.getElementById("artwork")
			var nowPlayingTrack = document.getElementById("now-playing-track")
			var nowPlayingAlbum = document.getElementById("now-playing-album")

			var logo = document.getElementById("logo")
			var title = document.getElementById("title")
			var currentSong = {
				album: null,
				index: null
			}

		/* music */
			var music = {
				forwhateverreason: {id: "forwhateverreason", image: "forwhateverreason.png", name: "For Whatever Reason", year: 2010, tracks: [
					{name: "Octive March", audio: "octivemarch.mp3"},
					{name: "Daydream Come True 2", audio: "daydreamcometrue2.mp3"},
					{name: "Riff", audio: "riff.mp3"},
					{name: "Parade", audio: "parade.mp3"},
					{name: "Just in Time", audio: "justintime.mp3"},
					{name: "Spider Jazz", audio: "spiderjazz.mp3"},
					{name: "Baroquen Dreams", audio: "baroquendreams.mp3"},
					{name: "Cerulean Underground", audio: "ceruleanunderground.mp3"},
					{name: "SoW British March", audio: "sowbritishmarch.mp3"},
					{name: "SoW Russian March", audio: "sowrussianmarch.mp3"},
					{name: "Into the Void 2", audio: "intothevoid2.mp3"},
					{name: "Stride Piano", audio: "stridepiano.mp3"},
					{name: "A Drop of Death", audio: "adropofdeath.mp3"},
					{name: "Sitting at a Stone Table", audio: "sittingatastonetable.mp3"},
					{name: "Breaking Open the Box", audio: "breakingopenthebox.mp3"},
					{name: "Mischief", audio: "mischief.mp3"},
					{name: "Four-oh-Four!", audio: "fourohfour.mp3"},
					{name: "Melodemons soundtrack", audio: "melodemonssoundtrack.mp3"},
					{name: "Everything Is Reel; Please Do Not Question This", audio: "everythingisreelpleasedonotquestionthis.mp3"}
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
					{name: "Clear Blue", audio: "clearblue.mp3"},
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
					{name: "Pretense", audio: "pretense.mp3"},
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
					{name: "I'll Be Fine", audio: "illbefine.mp3"},
					{name: "Consort Concerto for Winds", audio: "consortconcertoforwinds.mp3"},
					{name: "Gleam", audio: "gleam.mp3"},
					{name: "Solstice Song", audio: "solsticesong.mp3"},
					{name: "Mistaken Faces", audio: "mistakenfaces.mp3"},
					{name: "Quest", audio: "quest.mp3"},
					{name: "Brass Blaster", audio: "brassblaster.mp3"},
					{name: "Modernity", audio: "modernity.mp3"},
					{name: "Ice", audio: "ice.mp3"},
					{name: "Chameleon", audio: "chameleon.mp3"},
					{name: "Into the Void", audio: "intothevoid.mp3"}
				]},
				draftsadrift2: {id: "draftsadrift2", image: "draftsadrift2.png", name: "Drafts Adrift 2", year: 2011, tracks: [
					{name: "Sounddrawn", audio: "sounddrawn.mp3"},
					{name: "Abraham Lincoln", audio: "abrahamlincoln.mp3"},
					{name: "Puzzlement", audio: "puzzlement.mp3"},
					{name: "Snake-a-pede", audio: "snakeapede.mp3"},
					{name: "Pizzicato Pulse", audio: "pizzicatopulse.mp3"},
					{name: "SoW French Theme", audio: "sowfrenchtheme.mp3"},
					{name: "SoW Transitions", audio: "sowtransitions.mp3"},
					{name: "SoW German Theme", audio: "sowgermantheme.mp3"},
					{name: "SoW American March", audio: "sowamericanmarch.mp3"},
					{name: "Wavering Black", audio: "waveringblack.mp3"},
					{name: "Rainscape", audio: "rainscape.mp3"},
					{name: "Don't Touch Me; I Hate You", audio: "donttouchmeihateyou.mp3"},
					{name: "Road Crosser", audio: "roadcrosser.mp3"},
					{name: "Ski Slope Theme", audio: "skislopetheme.mp3"},
					{name: "Chromatones", audio: "chromatones.mp3"},
					{name: "Together Again", audio: "togetheragain.mp3"}
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
					{name: "After All", audio: "afterall.mp3"},
					{name: "Would You Be My Muse?", audio: "wouldyoubemymuse.mp3"},
					{name: "Ghost in the Drum Machine", audio: "ghostinthedrummachine.mp3"},
					{name: "Where We Left Off", audio: "whereweleftoff.mp3"},
					{name: "Flash (Hurry Up and Wait)", audio: "flashhurryupandwait.mp3"},
					{name: "You Told Me That You Loved Me Too Soon", audio: "youtoldmethatyoulovedmetoosoon.mp3"},
					{name: "Treasure", audio: "treasure.mp3"},
					{name: "Moonlight", audio: "moonlight.mp3"},
					{name: "Wheels Turning", audio: "wheelsturning.mp3"},
					{name: "Sorry I'm So Late", audio: "sorryimsolate.mp3"},
					{name: "Tell Me", audio: "tellme.mp3"},
					{name: "Rise", audio: "rise.mp3"},
					{name: "Swing, Pendulum, Swing", audio: "swingpendulumswing.mp3"},
					{name: "One Day", audio: "oneday.mp3"},
					{name: "Minus Money", audio: "minusmoney.mp3"},
					{name: "365", audio: "365.mp3"}
				]},
				thedeathmakerssymphony: {id: "thedeathmakerssymphony", image: "thedeathmakerssymphony.png", name: "The Deathmakers' Symphony", year: 2013, tracks: [
					{name: "Adaptation", audio: "adaptation.mp3"},
					{name: "Shipwreck", audio: "shipwreck.mp3"},
					{name: "A Most Peculiar Child", audio: "amostpeculiarchild.mp3"},
					{name: "Becoming Friends", audio: "becomingfriends.mp3"},
					{name: "Jailbreak!", audio: "jailbreak.mp3"},
					{name: "The Dragon", audio: "thedragon.mp3"},
					{name: "Never Been Home Before", audio: "neverbeenhomebefore.mp3"},
					{name: "Maybe Something More", audio: "maybesomethingmore.mp3"},
					{name: "Construction", audio: "construction.mp3"},
					{name: "Bittersweet", audio: "bittersweet.mp3"},
					{name: "Sails on the Horizon", audio: "sailsonthehorizon.mp3"},
					{name: "Annihilation", audio: "annihilation.mp3"},
					{name: "The Lightning Isle", audio: "thelightningisle.mp3"},
					{name: "Lovelost", audio: "lovelost.mp3"},
					{name: "The Cure", audio: "thecure.mp3"},
					{name: "Forever", audio: "forever.mp3"}
				]},
				singles: {id: "singles", image: "singles.png", name: "Singles", year: 2016, tracks: [
					{name: "Goodbye", audio: "goodbye.mp3"},
					{name: "Motion", audio: "motion.mp3"},
					{name: "Engine", audio: "engine.mp3"},
					{name: "Concede", audio: "concede.mp3"},
					{name: "Interconnected", audio: "interconnected.mp3"},
					{name: "Sunshine", audio: "sunshine.mp3"},
					{name: "Expedition", audio: "expedition.mp3"},
					{name: "Window", audio: "window.mp3"},
					{name: "Villain", audio: "villain.mp3"},
					{name: "Ambition", audio: "ambition.mp3"},
					{name: "Exhaustion", audio: "exhaustion.mp3"},
					{name: "Facade", audio: "facade.mp3"},
					{name: "Train", audio: "train.mp3"},
					{name: "Weight", audio: "weight.mp3"},
					{name: "Doubt", audio: "doubt.mp3"},
					{name: "Hello", audio: "hello.mp3"}
				]}
			}

	/*** menu ***/
		/* buildMenu */
			buildMenu()
			function buildMenu() {
				var keys = Object.keys(music)
					keys = keys.reverse()
				for (var k in keys) {
					// container
						var album = document.createElement("details")
							album.id = music[keys[k]].id
						discography.appendChild(album)

					// heading
						var summary = document.createElement("summary")
						album.appendChild(summary)

						var cover = document.createElement("div")
							cover.className = "cover"
							cover.style["background-image"] = "url(https://raw.githubusercontent.com/jamesbmayr/music/master/artwork/" + music[keys[k]].image + ")"
						summary.appendChild(cover)

						var name = document.createElement("h2")
							name.innerText = music[keys[k]].name
						summary.appendChild(name)

						var year = document.createElement("h3")
							year.innerText = music[keys[k]].year
						summary.appendChild(year)

					// track listing
						var list = document.createElement("ol")
							list.setAttribute("start", 1)
						album.appendChild(list)

						for (var t in music[keys[k]].tracks) {
							var item = document.createElement("li")
								item.setAttribute("index", t)
							list.appendChild(item)

							var button = document.createElement("button")
								button.innerText = music[keys[k]].tracks[t].name
								button.addEventListener(on.click, selectTrack)
							item.appendChild(button)
						}
				}
			}

		/* selectTrack */
			function selectTrack(event) {
				// before
					var beforeSong = {
						album: currentSong.album,
						index: currentSong.index
					}

				// set current
					currentSong.album = event.target.parentNode.parentNode.parentNode.id
					currentSong.index = Number(event.target.parentNode.getAttribute("index"))

				// same?
					if (beforeSong.album == currentSong.album && beforeSong.index == currentSong.index) {
						// playing?
							if (player.paused) {
								player.play()
							}
							else {
								player.pause()
							}

						return
					}

				// updatePlayer
					updatePlayer()
			}

	/*** player ***/
		/* playNext */
			player.addEventListener("ended", playNext)
			function playNext() {
				// set current
					if (currentSong.index < music[currentSong.album].tracks.length - 1) {
						currentSong.index++
					}
					else {
						currentSong.index = 0
						var keys = Object.keys(music)
						var albumIndex = keys.indexOf(currentSong.album)

						if (albumIndex > 0) {
							currentSong.album = keys[albumIndex - 1]
						}
						else {
							currentSong.album = keys[keys.length - 1]
						}
					}

				// updatePlayer
					updatePlayer()
			}

		/* loadPlayer */
			loadPlayer()
			function loadPlayer() {
				// querystring
					var get = {}
					var querystring = location.search.substring(1)
					if (querystring) {
						querystring = querystring.split("&")
						querystring.forEach(function(pair) {
							pair = pair.split("=")
							get[pair[0]] = pair[1]
						})
					}

				// track?
					if (get.track) {
						var cleanTitle = get.track.toLowerCase().replace(/[^a-z0-9]/g, "").trim()
						albumLoop: for (var i in music) {
							trackLoop: for (var j = 0; j < music[i].tracks.length; j++) {
								if (music[i].tracks[j].name.toLowerCase().replace(/[^a-z0-9]/g, "") == cleanTitle) {
									currentSong.album = i
									currentSong.index = j
									break albumLoop
									break trackLoop
								}
							}
						}
					}

				// album?
					if (!currentSong.album && get.album && music[get.album.toLowerCase()]) {
						currentSong.album = get.album.toLowerCase()
						currentSong.index = 0
						
						if (get.track) {
							var cleanTitle = get.track.toLowerCase().replace(/[^a-z0-9]/g, "").trim()
							trackLoop: for (var j = 0; j < music[currentSong.album].tracks.length; j++) {
								if (music[currentSong.album].tracks[j].name.toLowerCase().replace(/[^a-z0-9]/g, "") == cleanTitle) {
									currentSong.index = j
									break trackLoop
								}
							}
						}
					}
				
				// neither
					if (!currentSong.album) {
						var albums = Object.keys(music)
						currentSong.album = albums[Math.floor(Math.random() * albums.length)]
						currentSong.index = Math.floor(Math.random() * music[currentSong.album].tracks.length)
					}
					
					document.getElementById(currentSong.album).setAttribute("open", true)
					discography.scrollTop = 105 * Object.keys(music).reverse().indexOf(currentSong.album)

				// update player
					updatePlayer(true)
			}

		/* updatePlayer */
			function updatePlayer(firstLoad) {
				// reset music
					player.pause()
					player.currentTime = 0
					source.setAttribute("src", "https://raw.githubusercontent.com/jamesbmayr/music/master/music/" + music[currentSong.album].tracks[currentSong.index].audio)
					player.load()

					if (!firstLoad) {
						player.play()
					}

				// update text & picture
					artwork.style["background-image"] = "url(https://raw.githubusercontent.com/jamesbmayr/music/master/artwork/" + music[currentSong.album].image + ")"
					nowPlayingAlbum.innerText = music[currentSong.album].name
					nowPlayingTrack.innerText = music[currentSong.album].tracks[currentSong.index].name

				// update meta data
					logo.href = "https://raw.githubusercontent.com/jamesbmayr/music/master/artwork/" + music[currentSong.album].image
					title.innerText = "jamesmayr: " + music[currentSong.album].tracks[currentSong.index].name

				// update URL
					var currentURL = new URL(window.location.href)
						currentURL.search = "?album=" + music[currentSong.album].name.toLowerCase().replace(/[^a-z0-9]/g, "").trim() +
											"&track=" + music[currentSong.album].tracks[currentSong.index].name.toLowerCase().replace(/[^a-z0-9]/g, "").trim()
					window.history.pushState({}, "", currentURL)

				// select track text
					document.querySelectorAll("[selected]").forEach(function (element) {
						element.removeAttribute("selected")
					})
					var tracks = document.getElementById(currentSong.album).firstChild.nextSibling.childNodes
					tracks[currentSong.index].setAttribute("selected", true)
			}

}
