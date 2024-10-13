/*** globals ***/
	/* triggers */
		const TRIGGERS = {
			click: "click",
			keydown: "keydown",
			keyup: "keyup",
			submit: "submit"
		}

	/* elements */
		const ELEMENTS = {
			body: document.body,
			menu: {
				element: document.querySelector("#menu"),
				about: document.querySelector("#menu-about"),
				game: document.querySelector("#menu-game"),
				highscores: document.querySelector("#menu-highscores")
			},
			about: {
				element: document.querySelector("#about"),
				menu: document.querySelector("#about-menu")
			},
			game: {
				element: document.querySelector("#game"),
				audio: document.querySelector("#game-audio"),
				background: document.querySelector("#game-background"),
				player: document.querySelector("#game-player"),
				score: document.querySelector("#game-score"),
				streak: document.querySelector("#game-streak"),
				tracker: document.querySelector("#game-tracker"),
				health: document.querySelector("#game-health"),
				powerups: {
					element: document.querySelector("#game-powerups"),
					x: document.querySelector("#game-powerups-x"),
					y: document.querySelector("#game-powerups-y"),
					z: document.querySelector("#game-powerups-z"),
				},
				projectiles: document.querySelector("#game-projectiles"),
				gameover: {
					element: document.querySelector("#game-gameover"),
					message: document.querySelector("#game-gameover-message"),
					score: document.querySelector("#game-gameover-score"),
					form: document.querySelector("#game-gameover-form"),
					name: document.querySelector("#game-gameover-name"),
					save: document.querySelector("#game-gameover-save"),
				}
			},
			highscores: {
				element: document.querySelector("#highscores"),
				menu: document.querySelector("#highscores-menu"),
				inner: document.querySelector("#highscores-inner")
			}
		}

	/* constants */
		const CONSTANTS = {
			minute: 1000 * 60, // ms
			subdivisions: 4, // sixteenth notes
			apiURL: "https://script.google.com/macros/s/AKfycbzQ1AWe6nIAmavlXyTNac8k7TZulqepulhMDISwC3n6KR8VHuAPwxO0p29WQbTR-upc/exec",
			health: 100,
			lookaheadMeasures: 4, // measures
			projectileSpeed: 10, // pixels per tick
			playerSize: 40, // pixels
			projectileSize: 20, // pixels
			leniency: 2, // ticks
			points: 100, // points
			perfectPoints: 200, // points
			directions: ["up", "right", "down", "left"],
			types: [null, "arrow", "rock", "fireball", "icicle", "lightning"],
			tracks: window.TRACKS
		}

	/* state */
		const STATE = {
			playing: false,
			gameloop: null,
			track: {
				tick: 0,
				measure: 0,
				beat: 0,
				subdivision: 0,
				path: "",
				tempo: 0, // bpm; avoid drift with a factor of 15000 (1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 24, 25, 30, 40, 50, 60, 75, 100, 120, 125, 150, 200, 250, 300, 375, 500, 600, 625, 750, 1000, 1250, 1500, 1875, 2500, 3000, 3750, 5000, 7500, 15000)
				measures: []
			},
			player: {
				score: 0,
				streak: 0,
				health: 0,
				powerups: {
					x: false,
					y: false,
					z: false
				}
			},
			projectiles: [],
			keys: {
				up: false,
				upTick: 0,
				right: false,
				rightTick: 0,
				down: false,
				downTick: 0,
				left: false,
				leftTick: 0,
			}
		}

/*** interaction ***/
	/* switchScreen */
		ELEMENTS.menu.about.addEventListener(TRIGGERS.click, switchScreen)
		ELEMENTS.menu.highscores.addEventListener(TRIGGERS.click, switchScreen)
		ELEMENTS.about.menu.addEventListener(TRIGGERS.click, switchScreen)
		ELEMENTS.highscores.menu.addEventListener(TRIGGERS.click, switchScreen)
		function switchScreen(event) {
			try {
				// get target
					const target = event.target.value

				// switch
					ELEMENTS.body.setAttribute("screen", target)

				// highscores?
					if (target == "highscores") {
						ELEMENTS.highscores.inner.innerHTML = "loading..."

						fetch(CONSTANTS.apiURL, {method: "GET"})
						.then(response => response.json())
						.then(data => {
							displayScores(data)
						})
					}
			} catch (error) {console.log(error)}
		}

	/* pressKey */
		window.addEventListener(TRIGGERS.keydown, pressKey)
		function pressKey(event) {
			try {
				// not gameplay
					if (!STATE.playing) {
						return
					}

				// current directions
					const currentDirections = 0 +
						(STATE.keys.up    ? 1 : 0) + 
						(STATE.keys.right ? 1 : 0) + 
						(STATE.keys.down  ? 1 : 0) + 
						(STATE.keys.left  ? 1 : 0)
					if (currentDirections >= 2) {
						return
					}

				// directions
					const key = event.key.toLowerCase()
					switch (key) {
						case "arrowup":
						case "w":
							if (!STATE.keys.up) {
								STATE.keys.up = true
								STATE.keys.upTick = STATE.track.tick
								ELEMENTS.game.player.setAttribute("up", STATE.keys.up)
							}
						break
						case "arrowright":
						case "d":
							if (!STATE.keys.right) {
								STATE.keys.right = true
								STATE.keys.rightTick = STATE.track.tick
								ELEMENTS.game.player.setAttribute("right", STATE.keys.right)
							}
						break
						case "arrowdown":
						case "s":
							if (!STATE.keys.down) {
								STATE.keys.down = true
								STATE.keys.downTick = STATE.track.tick
								ELEMENTS.game.player.setAttribute("down", STATE.keys.down)
							}
						break
						case "arrowleft":
						case "a":
							if (!STATE.keys.left) {
								STATE.keys.left = true
								STATE.keys.leftTick = STATE.track.tick
								ELEMENTS.game.player.setAttribute("left", STATE.keys.left)
							}
						break
					}
			} catch (error) {console.log(error)}
		}

	/* liftKey */
		window.addEventListener(TRIGGERS.keyup, liftKey)
		function liftKey(event) {
			try {
				// not gameplay
					if (!STATE.playing) {
						return
					}

				// directions
					switch (event.key.toLowerCase()) {
						case "arrowup":
						case "w":
							STATE.keys.up = false
							ELEMENTS.game.player.setAttribute("up", STATE.keys.up)
						break
						case "arrowright":
						case "d":
							STATE.keys.right = false
							ELEMENTS.game.player.setAttribute("right", STATE.keys.right)
						break
						case "arrowdown":
						case "s":
							STATE.keys.down = false
							ELEMENTS.game.player.setAttribute("down", STATE.keys.down)
						break
						case "arrowleft":
						case "a":
							STATE.keys.left = false
							ELEMENTS.game.player.setAttribute("left", STATE.keys.left)
						break
					}
			} catch (error) {console.log(error)}
		}

	/* startGame */
		ELEMENTS.menu.game.addEventListener(TRIGGERS.click, startGame)
		function startGame() {
			try {
				// clear gameover
					ELEMENTS.game.gameover.element.removeAttribute("type")
					ELEMENTS.body.setAttribute("screen", "game")

				// reset player
					STATE.player.score = 0
					STATE.player.streak = 0
					STATE.player.health = CONSTANTS.health
					STATE.player.powerups.x = STATE.player.powerups.y = STATE.player.powerups.z = false

				// reset keys
					STATE.keys.up = STATE.keys.right = STATE.keys.down = STATE.keys.left = false
					STATE.keys.upTick = STATE.keys.rightTick = STATE.keys.downTick = STATE.keys.leftTick = 0

				// reset track
					const track = CONSTANTS.tracks[Math.floor(Math.random() * CONSTANTS.tracks.length)]
					STATE.track.path = track.path
					STATE.track.tempo = track.tempo
					STATE.track.measures = track.measures
					STATE.track.measure = -CONSTANTS.lookaheadMeasures
					STATE.track.beat = 0
					STATE.track.subdivision = 0
					STATE.track.tick = 0
					ELEMENTS.game.audio.src = STATE.track.path

				// reset projectiles
					ELEMENTS.game.projectiles.innerHTML = []

				// lookahead first X measures
					while (STATE.track.measure <= 0) {
						createProjectiles()
						STATE.track.measure++
					}

				// start counting
					STATE.track.measure = 0
					STATE.track.beat = 0
					STATE.track.subdivision = -1
					STATE.track.tick = -1

				// loop					
					clearInterval(STATE.gameloop)
					const interval = CONSTANTS.minute / STATE.track.tempo / CONSTANTS.subdivisions
					STATE.gameloop = setInterval(updateGame, interval)
					updateGame()

				// start
					ELEMENTS.game.audio.play()
					STATE.playing = true
			} catch (error) {console.log(error)}
		}

/*** game ***/
	/* updateGame */
		function updateGame() {
			try {
				// dead?
					if (STATE.player.health <= 0) {
						endGame()
					}

				// advance beat
					STATE.track.tick++
					STATE.track.subdivision++
					if (STATE.track.subdivision >= CONSTANTS.subdivisions) {
						STATE.track.subdivision = 0
						STATE.track.beat++
						if (!STATE.track.measures[STATE.track.measure][STATE.track.beat]) {
							STATE.track.beat = 0
							STATE.track.measure++
							if (!STATE.track.measures[STATE.track.measure]) {
								endGame(true)
							}
							else {
								createProjectiles()
							}
						}
					}

				// move projectiles
					for (let p = 0; p < STATE.projectiles.length; p++) {
						if (!moveProjectile(STATE.projectiles[p])) { // persist?
							STATE.projectiles.splice(p, 1)
							p--
						}
					}

				// display
					displayUI()
			} catch (error) {console.log(error)}
		}

	/* createProjectiles */
		function createProjectiles() {
			try {
				// lookahead
					const lookaheadMeasureNumber = STATE.track.measure + CONSTANTS.lookaheadMeasures
					const lookaheadMeasure = STATE.track.measures[lookaheadMeasureNumber]
					if (!lookaheadMeasure) {
						return
					}

				// ticks until then
					let ticksUntilMeasure = 0
					for (let m = STATE.track.measure; m < lookaheadMeasureNumber; m++) {
						ticksUntilMeasure += STATE.track.measures[m] ? (STATE.track.measures[m].length * CONSTANTS.subdivisions) : 0
					}

				// loop through beats
					for (let beat = 0; beat < lookaheadMeasure.length; beat++) {
						for (const d in lookaheadMeasure[beat]) {
							if (lookaheadMeasure[beat][d]) {
								// object
									const projectile = {
										direction: CONSTANTS.directions[d],
										type: CONSTANTS.types[lookaheadMeasure[beat][d]],
										measure: lookaheadMeasureNumber,
										beat: beat,
										tick: STATE.track.tick + ticksUntilMeasure + (beat * CONSTANTS.subdivisions) // +4
									}
									STATE.projectiles.push(projectile)

								// element
									const projectileElement = document.createElement("div")
										projectileElement.className = "game-projectile"
										projectileElement.setAttribute("direction", projectile.direction)
										projectileElement.setAttribute("type", projectile.type)
										projectileElement.setAttribute("tick", projectile.tick)
									ELEMENTS.game.projectiles.appendChild(projectileElement)
									projectile.element = projectileElement

								// distance
									moveProjectile(projectile)
							}
						}
					}
			} catch (error) {console.log(error)}
		}

	/* moveProjectile */
		function moveProjectile(projectile) {
			try {
				// post-post-collision
					if (projectile.type == "disappear") {
						projectile.element.remove()
						return false
					}

				// post-collision
					if (projectile.type == "block") {
						STATE.player.score += CONSTANTS.points
						STATE.player.streak++
						projectile.type = "disappear"
						return true
					}
					if (projectile.type == "block-perfect") {
						STATE.player.score += CONSTANTS.perfectPoints
						STATE.player.streak++
						projectile.type = "disappear"
						return true
					}
					if (projectile.type == "hit") {
						STATE.player.streak = 0
						STATE.player.health--
						projectile.type = "disappear"
						return true
					}

				// distance
					const distanceOut = (projectile.tick - STATE.track.tick) * CONSTANTS.projectileSpeed + (CONSTANTS.playerSize / 2) + CONSTANTS.projectileSize

				// block
					if (distanceOut <= 0 && distanceOut > -CONSTANTS.projectileSpeed) {
						// points
							if (STATE.keys[projectile.direction]) {
								if (Math.abs(STATE.keys[`${projectile.direction}Tick`] - STATE.track.tick) <= CONSTANTS.leniency) {
									projectile.type = "block-perfect"
								}
								else {
									projectile.type = "block"
								}
								projectile.element.setAttribute("type", projectile.type)
								return true
							}
					}

				// hit (or saving throw)
					if (distanceOut <= -CONSTANTS.projectileSpeed) {
						// points
							if (STATE.keys[projectile.direction]) { // saving throw
								projectile.type = "block"
								projectile.element.setAttribute("type", projectile.type)
								return true
							}

						// damage
							else {
								projectile.type = "hit"
								projectile.element.setAttribute("type", projectile.type)
								return true
							}
					}

				// otherwise
					if (projectile.direction == "up") {
						projectile.element.style.top =  `calc(50% - ${distanceOut}px - var(--projectile-size))`
					}
					else if (projectile.direction == "right") {
						projectile.element.style.left = `calc(50% + ${distanceOut}px + var(--projectile-size))`
					}
					else if (projectile.direction == "down") {
						projectile.element.style.top  = `calc(50% + ${distanceOut}px + var(--projectile-size))`
					}
					else if (projectile.direction == "left") {
						projectile.element.style.left = `calc(50% - ${distanceOut}px - var(--projectile-size))`
					}

				// persist
					return true
			} catch (error) {console.log(error)}
		}

	/* displayUI */
		function displayUI() {
			try {
				// tracker
					ELEMENTS.game.tracker.innerHTML = `${STATE.track.measure + 1}:${STATE.track.beat + 1}:${STATE.track.subdivision + 1} / ${STATE.track.measures.length}`

				// score
					ELEMENTS.game.score.innerHTML = STATE.player.score

				// streak
					ELEMENTS.game.streak.innerHTML = STATE.player.streak

				// health
					ELEMENTS.game.health.innerHTML = STATE.player.health

				// powerups
					ELEMENTS.game.powerups.x.setAttribute("current", STATE.player.powerups.x)
					ELEMENTS.game.powerups.y.setAttribute("current", STATE.player.powerups.y)
					ELEMENTS.game.powerups.z.setAttribute("current", STATE.player.powerups.z)

				// background
					ELEMENTS.game.element.setAttribute("beat", STATE.track.beat)
			} catch (error) {console.log(error)}
		}

	/* endGame */
		function endGame(victory) {
			try {
				// stop playing
					STATE.playing = false
					ELEMENTS.game.audio.pause()
					clearInterval(STATE.gameloop)

				// type
					const endType = victory ? "victory" : "defeat"
					ELEMENTS.game.gameover.element.setAttribute("type", endType)
					ELEMENTS.game.gameover.message.innerText = endType

				// score
					ELEMENTS.game.gameover.score.innerHTML = STATE.player.score
					ELEMENTS.game.gameover.name.value = ""
			} catch (error) {console.log(error)}
		}

/*** highscores ***/
	/* submitScore */
		ELEMENTS.game.gameover.form.addEventListener(TRIGGERS.submit, submitScore)
		function submitScore(event) {
			try {
				// get name & score
					const name = ELEMENTS.game.gameover.name.value.trim()
					if (!name || !name.length) {
						return
					}
					const score = STATE.player.score

					ELEMENTS.game.gameover.save.setAttribute("saving", true)

				// request
					fetch(`${CONSTANTS.apiURL}?score=${score}&name=${name}`, {method: "GET"})
					.then(response => response.json())
					.then(data => {
						ELEMENTS.body.setAttribute("screen", "highscores")
						ELEMENTS.game.gameover.save.removeAttribute("saving")
						displayScores(data)
					})
			} catch (error) {console.log(error)}
		}

	/* displayScores */
		function displayScores(data) {
			try {
				// invalid
					if (!data.highscores) {
						return
					}

				// reset
					ELEMENTS.highscores.inner.innerHTML = ""

				// sort
					const highscores = data.highscores.sort((a, b) => b.score - a.score)

				// loop through
					for (const s in highscores) {
						const rowElement = document.createElement("p")
							rowElement.className = "highscores-row"
						ELEMENTS.highscores.inner.appendChild(rowElement)

						const nameElement = document.createElement("div")
							nameElement.className = "highscores-name"
							nameElement.innerHTML = highscores[s].name
						rowElement.appendChild(nameElement)

						const scoreElement = document.createElement("div")
							scoreElement.className = "highscores-score"
							scoreElement.innerHTML = highscores[s].score
						rowElement.appendChild(scoreElement)
					}
			} catch (error) {console.log(error)}
		}
