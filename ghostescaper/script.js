/*** globals ***/
	/* triggers */
		const TRIGGERS = {
			mousedown: "mousedown",
			mousemove: "mousemove",
			mouseup: "mouseup",
			keydown: "keydown",
			keyup: "keyup",
			click: "click"
		}
		if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
			TRIGGERS.mousedown = "touchstart"
			TRIGGERS.mousemove = "touchmove"
			TRIGGERS.mouseup = "touchend"
		}

	/* elements */
		const ELEMENTS = {
			body: document.body,
			menu: {
				element: document.querySelector("#menu"),
				play: document.querySelector("#menu-play")
			},
			controls: {
				left: document.querySelector("#mobile-controls-left"),
				jump: document.querySelector("#mobile-controls-jump"),
				right: document.querySelector("#mobile-controls-right")
			},
			game: {
				element: document.querySelector("#game"),
				tower: {
					element: document.querySelector("#game-tower"),
					background: document.querySelector("#game-tower-background"),
					platforms: document.querySelector("#game-tower-platforms"),
					bricks: document.querySelector("#game-tower-bricks"),
					ghosts: document.querySelector("#game-tower-ghosts")
				}
			},
			player: {
				container: document.querySelector("#player-container"),
				element: document.querySelector("#player"),
				blue: document.querySelector("#player-blue"),
				red: document.querySelector("#player-red"),
				light: document.querySelector("#player-light"),
				flashlight: document.querySelector("#player-flashlight"),
				lightOrb: document.querySelector("#player-light-orb"),
			},
			clouds: document.querySelector("#clouds")
		}

	/* constants */
		const CONSTANTS = {
			radiansToDegrees: 180 / Math.PI, // factor
			degreesToRadians: Math.PI / 180, // factor
			circleDegrees: 360, // °
			percent: 100, // %
			maxX: 10000, // units,
			maxY: 10000, // units
			timeStep: 10, // ms
			gravity: -5, // units per step per step
			accelerationX: 4, // units per step per step
			decelerationX: 8, // units per step per step
			accelerationY: 150, // units per step per step
			maxVx: 75, // units per step
			maxVy: 1500, // units per step
			playerWidth: 300, // units
			playerHeight: 1000, // units
			playerOffset: 2500, // units
			playerRegenerationRate: 20, // health units
			playerMaxHealth: 20000, // health units
			playerFallMultiplier: 20, // health units per vy unit
			playerLightAngle: 45, // °
			playerMinLightRadius: 500, // units
			playerMaxLightRadius: 3000, // units
			playerLightFadeRate: 1, // units
			playerRocketJumpVy: 350, // units per step per step
			towerWidth: 7500, // units
			platformSize: 2500, // units
			platformThreshold: 200, // units
			platformSpacing: 2000, // units
			platformLookahead: 10, // count
			bonusGap: [ // count
				{from: 0, to: 60, gap: 5}, 
				{from: 60, to: 120, gap: 10},
				{from: 120, to: 180, gap: 15},
				{from: 180, to: 280, gap: 20},
				{from: 300, to: 1000, gap: 25}
			],
			bonusFadeDelay: 500, // ms
			brickSize: 500, // units
			brickSpacing: 1000, // units
			brickLookahead: 20, // count
			ghostMinVx: 10, // %
			ghostMaxVx: 15, // %
			ghostMaxVy: 20, // %
			ghostAccelerationY: 1, // %
			ghostSize: 1000, // %
			ghostMargin: 200, // %
			ghostRange: 20000, // units
			ghostFadeDelay: 500, // ms
			ghostSpawnWait: 20, // steps
			minGhostCount: 3, // count
			maxGhostCount: 200, // count
			cloudMinVx: 0.01, // %
			cloudMaxVx: 0.04, // %
			cloudSize: 10, // %
			maxCloudCount: 10, // count
			bonuses: ["battery", "battery", "battery", "battery", "battery", "health", "health", "health", "jump", "jump", "lightbulb", "flash"],
			svg: {
				cloud: `<svg viewBox="10 10 80 80"><path d="M 80 70 C 60 70 40 70 20 70 C 14 70 10 66 10 60 C 10 54 14 50 20 50 C 20 39 29 30 40 30 C 48 30 55.5 34.5 58.5 42.5 C 61 41 63 40 66 40 C 73 40 79 45 80 50 C 86 50 90 54 90 60 C 90 66 86 70 80 70 Z"></path></svg>`,
				ghost: `<svg viewBox="20 20 60 60"><path d="M 54 40 C 54 42 56 44 58 44 C 60 44 62 42 62 40 C 62 38 60 36 58 36 C 56 36 54 38 54 40 Z M 38 40 C 38 42 40 44 42 44 C 44 44 46 42 46 40 C 46 38 44 36 42 36 C 40 36 38 38 38 40 Z M 36 70 C 36 70 34 75 34 75 C 32 80 32 80 31 75 C 30 70 30 60 30 40 C 30 29 39 20 50 20 C 61 20 70 29 70 40 C 70 60 70 70 69 75 C 68 80 68 80 66 75 C 66 75 64 70 64 70 C 62 65 62 65 60 70 C 60 70 58 75 58 75 C 56 80 56 80 54 75 C 54 75 52 70 52 70 C 50 65 50 65 48 70 C 48 70 48 70 46 75 C 44 80 44 80 42 75 C 42 75 40 70 40 70 C 38 65 38 65 36 70 Z"></path></svg>`,
				bricks: `<svg viewBox="10 10 80 80"><path d="M 62 77 C 62 79 62 81 62 83 C 62 85 62 85 64 85 C 69 85 75 85 80 85 C 82 85 82 85 82 83 C 82 81 82 79 82 77 C 82 75 82 75 80 75 C 75 75 69 75 64 75 C 62 75 62 75 62 77 Z M 17 57 C 17 59 17 61 17 63 C 17 65 17 65 19 65 C 24 65 30 65 35 65 C 37 65 37 65 37 63 C 37 61 37 59 37 57 C 37 55 37 55 35 55 C 30 55 24 55 19 55 C 17 55 17 55 17 57 Z M 32 37 C 32 39 32 41 32 43 C 32 45 32 45 34 45 C 39 45 45 45 50 45 C 52 45 52 45 52 43 C 52 41 52 39 52 37 C 52 35 52 35 50 35 C 45 35 39 35 34 35 C 32 35 32 35 32 37 Z M 17 17 C 17 19 17 21 17 23 C 17 25 17 25 19 25 C 24 25 30 25 35 25 C 37 25 37 25 37 23 C 37 21 37 19 37 17 C 37 15 37 15 35 15 C 30 15 24 15 19 15 C 17 15 17 15 17 17 Z M 47 17 C 47 19 47 21 47 23 C 47 25 47 25 49 25 C 54 25 60 25 65 25 C 67 25 67 25 67 23 C 67 21 67 19 67 17 C 67 15 67 15 65 15 C 60 15 54 15 49 15 C 47 15 47 15 47 17 Z M 62 37 C 62 39 62 41 62 43 C 62 45 62 45 64 45 C 69 45 75 45 80 45 C 82 45 82 45 82 43 C 82 41 82 39 82 37 C 82 35 82 35 80 35 C 75 35 69 35 64 35 C 62 35 62 35 62 37 Z M 47 57 C 47 59 47 61 47 63 C 47 65 47 65 49 65 C 54 65 60 65 65 65 C 67 65 67 65 67 63 C 67 61 67 59 67 57 C 67 55 67 55 65 55 C 60 55 54 55 49 55 C 47 55 47 55 47 57 Z M 12 13 C 12 11 13 10 15 10 C 23 10 31 10 39 10 C 41 10 42 11 42 13 C 42 18 42 23 42 27 C 42 29 41 30 39 30 C 31 30 23 30 15 30 C 13 30 12 29 12 27 C 12 23 12 18 12 13 Z M 42 13 C 42 11 43 10 45 10 C 53 10 61 10 69 10 C 71 10 72 11 72 13 C 72 18 72 23 72 27 C 72 29 71 30 69 30 C 61 30 53 30 45 30 C 43 30 42 29 42 27 C 42 23 42 18 42 13 Z M 27 33 C 27 31 28 30 30 30 C 38 30 46 30 54 30 C 56 30 57 31 57 33 C 57 38 57 43 57 47 C 57 49 56 50 54 50 C 46 50 38 50 30 50 C 28 50 27 49 27 47 C 27 43 27 38 27 33 Z M 57 33 C 57 31 58 30 60 30 C 68 30 76 30 84 30 C 86 30 87 31 87 33 C 87 38 87 43 87 47 C 87 49 86 50 84 50 C 76 50 68 50 60 50 C 58 50 57 49 57 47 C 57 43 57 38 57 33 Z M 12 53 C 12 51 13 50 15 50 C 23 50 31 50 39 50 C 41 50 42 51 42 53 C 42 58 42 63 42 67 C 42 69 41 70 39 70 C 31 70 23 70 15 70 C 13 70 12 69 12 67 C 12 63 12 58 12 53 Z M 42 53 C 42 51 43 50 45 50 C 53 50 61 50 69 50 C 71 50 72 51 72 53 C 72 58 72 63 72 67 C 72 69 71 70 69 70 C 61 70 53 70 45 70 C 43 70 42 69 42 67 C 42 63 42 58 42 53 Z M 57 73 C 57 71 58 70 60 70 C 68 70 76 70 84 70 C 86 70 87 71 87 73 C 87 78 87 83 87 87 C 87 89 86 90 84 90 C 76 90 68 90 60 90 C 58 90 57 89 57 87 C 57 83 57 78 57 73 Z M 32 77 C 32 79 32 81 32 83 C 32 85 32 85 34 85 C 39 85 45 85 50 85 C 52 85 52 85 52 83 C 52 81 52 79 52 77 C 52 75 52 75 50 75 C 45 75 39 75 34 75 C 32 75 32 75 32 77 Z M 27 73 C 27 71 28 70 30 70 C 38 70 46 70 54 70 C 56 70 57 71 57 73 C 57 78 57 83 57 87 C 57 89 56 90 54 90 C 46 90 38 90 30 90 C 28 90 27 89 27 87 C 27 83 27 78 27 73 Z"></path></svg>`,
				battery: `<svg viewBox="0 0 100 100"><path d="M 10 0 C 5 0 0 5 0 10 C 0 37 0 63 0 90 C 0 95 5 100 10 100 C 37 100 63 100 90 100 C 95 100 100 95 100 90 C 100 63 100 37 100 10 C 100 5 95 0 90 0 C 63 0 37 0 10 0 Z M 51 39 C 49 41 47 43 45 45 C 43 47 43 47 45 49 C 46 50 47 51 48 52 C 50 54 50 54 48 57 C 48 57 46 60 46 60 C 42 66 45 65 49 61 C 51 59 53 57 55 55 C 57 53 57 53 55 51 C 54 50 53 49 52 48 C 50 46 50 46 52 43 C 52 43 54 40 54 40 C 58 34 55 35 51 39 Z M 80 61 C 80 62 80 63 80 64 C 80 67 77 70 74 70 C 58 70 42 70 26 70 C 23 70 20 67 20 64 C 20 55 20 45 20 36 C 20 33 23 30 26 30 C 42 30 58 30 74 30 C 77 30 80 33 80 36 C 80 37 80 38 80 39 C 80 40 80 40 81 40 C 83 40 85 42 85 45 C 85 48 85 52 85 55 C 85 58 83 60 81 60 C 80 60 80 60 80 61 Z"></path></svg>`,
				health: `<svg viewBox="0 0 100 100"><path d="M 10 0 C 5 0 0 5 0 10 C 0 37 0 63 0 90 C 0 95 5 100 10 100 C 37 100 63 100 90 100 C 95 100 100 95 100 90 C 100 63 100 37 100 10 C 100 5 95 0 90 0 C 63 0 37 0 10 0 Z M 55 45 C 62 45 69 45 75 45 C 78 45 80 47 80 50 C 80 53 78 55 75 55 C 69 55 62 55 55 55 C 55 62 55 69 55 75 C 55 78 53 80 50 80 C 47 80 45 78 45 75 C 45 69 45 62 45 55 C 38 55 31 55 25 55 C 22 55 20 53 20 50 C 20 47 22 45 25 45 C 31 45 38 45 45 45 C 45 38 45 31 45 25 C 45 22 47 20 50 20 C 53 20 55 22 55 25 C 55 31 55 38 55 45 Z"></path></svg>`,
				jump: `<svg viewBox="0 0 100 100"><path d="M 10 0 C 5 0 0 5 0 10 C 0 37 0 63 0 90 C 0 95 5 100 10 100 C 37 100 63 100 90 100 C 95 100 100 95 100 90 C 100 63 100 37 100 10 C 100 5 95 0 90 0 C 63 0 37 0 10 0 Z M 55 80 C 62 80 69 80 75 80 C 78 80 80 82 80 85 C 80 88 78 90 75 90 C 60 90 40 90 25 90 C 22 90 20 88 20 85 C 20 82 22 80 25 80 C 31 80 38 80 45 80 C 45 65 45 39 45 27 C 42 30 40 32 38 34 C 36 36 33 36 31 34 C 29 32 29 29 31 27 C 35 23 40 18 45 13 C 47 11 48 10 50 10 C 52 10 53 11 55 13 C 60 18 65 23 69 27 C 71 29 71 32 69 34 C 67 36 64 36 62 34 C 60 32 58 30 55 27 C 55 39 55 65 55 80 Z"></path></svg>`,
				lightbulb: `<svg viewBox="0 0 100 100"><path d="M 10 0 C 5 0 0 5 0 10 C 0 37 0 63 0 90 C 0 95 5 100 10 100 C 37 100 63 100 90 100 C 95 100 100 95 100 90 C 100 63 100 37 100 10 C 100 5 95 0 90 0 C 63 0 37 0 10 0 Z M 35 65 C 36 66 36 68 35 69 C 34 70 30 74 29 75 C 28 76 26 76 25 75 C 24 74 24 72 25 71 C 26 70 30 66 31 65 C 32 64 34 64 35 65 Z M 26 47 C 30 47 30 53 26 53 C 23 53 21 53 18 53 C 14 53 14 47 18 47 C 21 47 23 47 26 47 Z M 44 77 C 44 74 42 71 40 69 C 38 67 38 67 35 63 C 32 59 30 55 30 50 C 30 39 39 30 50 30 C 61 30 70 39 70 50 C 70 55 68 59 65 63 C 62 67 62 67 60 69 C 58 71 56 74 56 77 C 56 78 56 79 56 80 C 56 82 54 85 52 85 C 50 85 50 85 48 85 C 46 85 44 82 44 80 C 44 79 44 78 44 77 Z M 75 75 C 74 76 72 76 71 75 C 70 74 66 70 65 69 C 64 68 64 66 65 65 C 66 64 68 64 69 65 C 70 66 74 70 75 71 C 76 72 76 74 75 75 Z M 74 53 C 70 53 70 47 74 47 C 77 47 79 47 82 47 C 86 47 86 53 82 53 C 79 53 77 53 74 53 Z M 75 25 C 76 26 76 28 75 29 C 74 30 70 34 69 35 C 68 36 66 36 65 35 C 64 34 64 32 65 31 C 66 30 70 26 71 25 C 72 24 74 24 75 25 Z M 53 26 C 53 30 47 30 47 26 C 47 23 47 21 47 18 C 47 14 53 14 53 18 C 53 21 53 23 53 26 Z M 35 35 C 34 36 32 36 31 35 C 30 34 26 30 25 29 C 24 28 24 26 25 25 C 26 24 28 24 29 25 C 30 26 34 30 35 31 C 36 32 36 34 35 35 Z"></path></svg>`,
				flash: `<svg viewBox="0 0 100 100"><path d="M 10 0 C 5 0 0 5 0 10 C 0 37 0 63 0 90 C 0 95 5 100 10 100 C 37 100 63 100 90 100 C 95 100 100 95 100 90 C 100 63 100 37 100 10 C 100 5 95 0 90 0 C 63 0 37 0 10 0 Z M 60 54 C 60 54 65 52 70 50 C 65 48 60 46 60 46 C 60 46 62 41 64 36 C 59 38 54 40 54 40 C 54 40 52 35 50 30 C 48 35 46 40 46 40 C 46 40 41 38 36 36 C 38 41 40 46 40 46 C 40 46 35 48 30 50 C 35 52 40 54 40 54 C 40 54 38 59 36 64 C 41 62 46 60 46 60 C 46 60 48 65 50 70 C 52 65 54 60 54 60 C 54 60 59 62 64 64 C 62 59 60 54 60 54 Z M 55 52 C 55 52 55 52 57 57 C 52 55 52 55 52 55 C 52 55 52 55 50 60 C 48 55 48 55 48 55 C 48 55 48 55 43 57 C 45 52 45 52 45 52 C 45 52 45 52 40 50 C 45 48 45 48 45 48 C 45 48 45 48 43 43 C 48 45 48 45 48 45 C 48 45 48 45 50 40 C 52 45 52 45 52 45 C 52 45 52 45 57 43 C 55 48 55 48 55 48 C 55 48 55 48 60 50 C 55 52 55 52 55 52 Z M 65 56 C 65 56 67 61 71 71 C 61 67 56 65 56 65 C 56 65 52 75 50 80 C 48 75 44 65 44 65 C 44 65 39 67 29 71 C 33 61 35 56 35 56 C 35 56 25 52 20 50 C 25 48 35 44 35 44 C 35 44 33 39 29 29 C 39 33 44 35 44 35 C 44 35 48 25 50 20 C 52 25 56 35 56 35 C 56 35 61 33 71 29 C 67 39 65 44 65 44 C 65 44 75 48 80 50 C 75 52 65 56 65 56 Z"></path></svg>`
			}
		}

	/* state */
		const STATE = {
			play: false,
			gameloop: null,
			keys: {
				left: false,
				right: false,
				jump: false
			},
			player: {
				x: CONSTANTS.maxX / 2, // units
				y: CONSTANTS.playerHeight / 2, // units
				width: CONSTANTS.playerWidth, // units
				height: CONSTANTS.playerHeight, // units
				vx: 0, // units per step
				vy: 0, // units per step
				onPlatform: true,
				health: 10000, // health units
				lightAngle: 0, // degrees
				lightRadius: CONSTANTS.playerMaxLightRadius, // units
				lightOrbRadius: 0, // units
			},
			ghostSpawnWait: 0, // steps
			platforms: {},
			bricks: {},
			ghosts: [],
			clouds: []
		}

/*** user input ***/
	/* pressPlay */
		ELEMENTS.menu.play.addEventListener(TRIGGERS.click, pressPlay)
		function pressPlay(event) {
			try {
				// playing
					if (STATE.play) {	
						return
					}

				// hide menu
					ELEMENTS.menu.element.setAttribute("invisible", true)
					ELEMENTS.menu.play.blur()

				// clear
					clearInterval(STATE.gameloop)
					resetPlayer()
					STATE.platforms = {}
					STATE.bricks = {}
					STATE.ghosts = []
					ELEMENTS.game.tower.platforms.innerHTML = ""
					ELEMENTS.game.tower.bricks.innerHTML = ""
					ELEMENTS.game.tower.ghosts.innerHTML = ""
					ELEMENTS.body.setAttribute("state", "gameplay")

				// start
					generatePlatforms()
					STATE.play = true
					STATE.gameloop = setInterval(iterateGame, CONSTANTS.timeStep)
			} catch (error) {console.log(error)}
		}

	/* pressKey */
		window.addEventListener(TRIGGERS.keydown, pressKey)
		function pressKey(event) {
			try {
				if (!STATE.play) {
					return
				}

				if (event.code == "ArrowLeft" || event.code == "KeyA") {
					STATE.keys.left = true
				}
				if (event.code == "ArrowRight" || event.code == "KeyD") {
					STATE.keys.right = true
				}
				if (event.code == "Space" || event.code == "ArrowUp" || event.code == "KeyW") {
					STATE.keys.jump = true
				}
			} catch (error) {console.log(error)}
		}

	/* liftKey */
		window.addEventListener(TRIGGERS.keyup, liftKey)
		function liftKey(event) {
			try {
				if (!STATE.play) {
					return
				}

				if (event.code == "ArrowLeft" || event.code == "KeyA") {
					STATE.keys.left = false
				}
				if (event.code == "ArrowRight" || event.code == "KeyD") {
					STATE.keys.right = false
				}
				if (event.code == "Space" || event.code == "ArrowUp" || event.code == "KeyW") {
					STATE.keys.jump = false
				}
			} catch (error) {console.log(error)}
		}

	/* moveMouse */
		window.addEventListener(TRIGGERS.mousemove, moveMouse)
		function moveMouse(event) {
			try {
				// get coordinates
					const cursorX = (event.touches ? event.touches[0].clientX : event.clientX)
					const cursorY = (event.touches ? event.touches[0].clientY : event.clientY) * -1 + window.innerHeight

					const playerBox = ELEMENTS.player.element.getBoundingClientRect()
					const playerX = (playerBox.x + (playerBox.width / 2))
					const playerY = (playerBox.y + (playerBox.height / 2)) * -1 + window.innerHeight

				// get angle
					const radians = Math.atan2(cursorY - playerY, cursorX - playerX)
					STATE.player.lightAngle = Math.round(radians * CONSTANTS.radiansToDegrees) % CONSTANTS.circleDegrees
					while (STATE.player.lightAngle < 0) {
						STATE.player.lightAngle += CONSTANTS.circleDegrees
					}
			} catch (error) {console.log(error)}
		}

	/* pressButton */
		ELEMENTS.controls.left.addEventListener(TRIGGERS.mousedown, pressButton)
		ELEMENTS.controls.jump.addEventListener(TRIGGERS.mousedown, pressButton)
		ELEMENTS.controls.right.addEventListener(TRIGGERS.mousedown, pressButton)
		function pressButton(event) {
			try {
				if (!STATE.play) {
					return
				}

				if (event.target == ELEMENTS.controls.left) {
					STATE.keys.left = true
				}
				if (event.target == ELEMENTS.controls.right) {
					STATE.keys.right = true
				}
				if (event.target == ELEMENTS.controls.jump) {
					STATE.keys.jump = true
				}
			} catch (error) {console.log(error)}
		}

	/* liftButton */
		ELEMENTS.controls.left.addEventListener(TRIGGERS.mouseup, liftButton)
		ELEMENTS.controls.jump.addEventListener(TRIGGERS.mouseup, liftButton)
		ELEMENTS.controls.right.addEventListener(TRIGGERS.mouseup, liftButton)
		function liftButton(event) {
			try {
				if (!STATE.play) {
					return
				}

				if (event.target == ELEMENTS.controls.left) {
					STATE.keys.left = false
				}
				if (event.target == ELEMENTS.controls.right) {
					STATE.keys.right = false
				}
				if (event.target == ELEMENTS.controls.jump) {
					STATE.keys.jump = false
				}

				event.target.blur()
			} catch (error) {console.log(error)}
		}

/*** gameplay ***/
	/* iterateGame */
		function iterateGame() {
			try {
				// player
					updatePlayerStatus()
					updatePlayerVelocity()
					updatePlayerPosition()

				// tower
					generateBricks()
					generatePlatforms()

				// ghosts
					updateGhosts()

				// display
					displayGame()
			} catch (error) {console.log(error)}
		}

	/* generatePlatforms */
		function generatePlatforms() {
			try {
				// from player up
					const startY = Math.floor(STATE.player.y / CONSTANTS.platformSpacing) * CONSTANTS.platformSpacing
					for (let y = startY; y < startY + (CONSTANTS.platformSpacing * CONSTANTS.platformLookahead); y += CONSTANTS.platformSpacing) {
						// already exists
							if (STATE.platforms[`_${y}`] || !y) {
								continue
							}

						// generate
							const towerLeft = (CONSTANTS.maxX - CONSTANTS.towerWidth) / 2
							const towerRight = CONSTANTS.maxX - towerLeft
							const platformLeft = Math.floor(Math.random() * (towerRight - towerLeft - CONSTANTS.platformSize)) + towerLeft
							STATE.platforms[`_${y}`] = {
								y: y,
								x: platformLeft + (CONSTANTS.platformSize / 2),
								x1: platformLeft,
								x2: platformLeft + CONSTANTS.platformSize
							}

						// display
							const platformNumber = (y / CONSTANTS.platformSpacing)
							const platformElement = document.createElement("div")
								platformElement.className = "platform"
								platformElement.style.left   = `${STATE.platforms[`_${y}`].x / CONSTANTS.maxX * CONSTANTS.percent}%`
								platformElement.style.bottom = `${y / CONSTANTS.maxY * CONSTANTS.percent}%`
								platformElement.style.width  = `${CONSTANTS.platformSize / CONSTANTS.maxX * CONSTANTS.percent}%`
								platformElement.innerHTML = platformNumber
							ELEMENTS.game.tower.platforms.appendChild(platformElement)
							STATE.platforms[`_${y}`].element = platformElement

						// bonus?
							const bonusGap = (CONSTANTS.bonusGap.find(range => (range.from <= platformNumber && platformNumber <= range.to)) || CONSTANTS.bonusGap[CONSTANTS.bonusGap.length - 1]).gap
							if (platformNumber % bonusGap == 0) {
								STATE.platforms[`_${y}`].bonus = CONSTANTS.bonuses[Math.floor(Math.random() * CONSTANTS.bonuses.length)]
								platformElement.setAttribute("bonus", true)

								const bonusElement = document.createElement("div")
									bonusElement.className = "platform-bonus"
									bonusElement.innerHTML = CONSTANTS.svg[STATE.platforms[`_${y}`].bonus]
								platformElement.appendChild(bonusElement)
								STATE.platforms[`_${y}`].bonusElement = bonusElement
							}
					}
			} catch (error) {console.log(error)}
		}

	/* generateBricks */
		function generateBricks() {
			try {
				// from player up
					const startY = Math.floor(STATE.player.y / CONSTANTS.brickSpacing) * CONSTANTS.brickSpacing
					for (let y = startY; y < startY + (CONSTANTS.brickSpacing * CONSTANTS.brickLookahead); y += CONSTANTS.brickSpacing) {
						// already exists
							if (STATE.bricks[`_${y}`] || !y) {
								continue
							}

						// generate
							const towerLeft = (CONSTANTS.maxX - CONSTANTS.towerWidth) / 2
							const towerRight = CONSTANTS.maxX - towerLeft
							const x = Math.floor(Math.random() * (towerRight - towerLeft - 3 * CONSTANTS.brickSize)) + towerLeft + CONSTANTS.brickSize
							STATE.bricks[`_${y}`] = {
								y: y,
								x: x
							}

						// display
							const brickElement = document.createElement("div")
								brickElement.className = "brick"
								brickElement.style.left   = `${STATE.bricks[`_${y}`].x / CONSTANTS.maxX * CONSTANTS.percent}%`
								brickElement.style.bottom = `${y / CONSTANTS.maxY * CONSTANTS.percent}%`
								brickElement.innerHTML = CONSTANTS.svg.bricks
							ELEMENTS.game.tower.bricks.appendChild(brickElement)
							STATE.bricks[`_${y}`].element = brickElement
					}
			} catch (error) {console.log(error)}
		}

	/* isIntersection */
		function isIntersection(a, b) {
			try {
				// get sides
					const aLeft = a.x - (a.width / 2)
					const aRight = a.x + (a.width / 2)
					const bLeft = b.x - (b.width / 2)
					const bRight = b.x + (b.width / 2)

					const aBottom = a.y - (a.height / 2)
					const aTop = a.y + (a.height / 2)
					const bBottom = b.y - (b.height / 2)
					const bTop = b.y + (b.height / 2)

				// intersection
					if ((
						(bLeft < aLeft && aLeft < bRight) ||
						(bLeft < aRight && aRight < bRight) ||
						(aLeft < bLeft && bLeft < aRight) ||
						(aLeft < bRight && bRight < aRight)
					  ) && (
					  	(bBottom < aBottom && aBottom < bTop) ||
						(bBottom < aTop && aTop < bTop) ||
						(aBottom < bBottom && bBottom < aTop) ||
						(aBottom < bTop && bTop < aTop)
					)) {
						return true
					}
				
				// no
					return false
			} catch (error) {console.log(error)}
		}

	/* displayGame */
		function displayGame() {
			try {
				// player
					ELEMENTS.player.element.style.left   = `${STATE.player.x / CONSTANTS.maxX * CONSTANTS.percent}%`
					ELEMENTS.player.blue.style.opacity = STATE.player.health / CONSTANTS.playerMaxHealth
					ELEMENTS.player.red.style.opacity = 1 - (STATE.player.health / CONSTANTS.playerMaxHealth)
					ELEMENTS.player.light.style.transform = `translateX(0%) translateY(-100%) rotate(${-STATE.player.lightAngle + CONSTANTS.playerLightAngle}deg)`
					ELEMENTS.player.flashlight.style.transform = `translateX(-50%) translateY(-50%) rotate(${-STATE.player.lightAngle}deg)`
					ELEMENTS.player.light.style.width = `calc(var(--light-size) * ${STATE.player.lightRadius / CONSTANTS.playerMaxLightRadius})`
					ELEMENTS.player.light.style.height = `calc(var(--light-size) / 2 * ${STATE.player.lightRadius / CONSTANTS.playerMaxLightRadius})`
					ELEMENTS.player.lightOrb.style.width = `calc(var(--light-size) * ${STATE.player.lightOrbRadius * 2 / CONSTANTS.playerMaxLightRadius})`
					ELEMENTS.player.lightOrb.style.height = `calc(var(--light-size) / 2 * ${STATE.player.lightOrbRadius * 2 / CONSTANTS.playerMaxLightRadius})`

				// tower
					ELEMENTS.game.tower.background.style.height = `${STATE.player.y  / CONSTANTS.maxX * CONSTANTS.percent + CONSTANTS.percent}%`
					ELEMENTS.game.tower.element.style.bottom = `${(CONSTANTS.playerOffset - STATE.player.y) / CONSTANTS.maxY * CONSTANTS.percent}%`
			} catch (error) {console.log(error)}
		}

	/* endGame */
		function endGame() {
			try {
				// menu
					ELEMENTS.menu.element.removeAttribute("invisible")
					ELEMENTS.body.setAttribute("state", "gameover")

				// stop
					clearInterval(STATE.gameloop)
					STATE.play = false
			} catch (error) {console.log(error)}
		}

/*** player ***/
	/* resetPlayer */
		function resetPlayer() {
			try {
				// position
					STATE.player.x = CONSTANTS.maxX / 2
					STATE.player.y = CONSTANTS.playerHeight / 2
					STATE.player.vx = 0
					STATE.player.vy = 0

				// status
					STATE.player.onPlatform = true
					STATE.player.health = CONSTANTS.playerMaxHealth
					STATE.player.lightRadius = CONSTANTS.playerMaxLightRadius

				// keys
					STATE.keys.left = false
					STATE.keys.right = false
					STATE.keys.jump = false
			} catch (error) {console.log(error)}
		}

	/* updatePlayerVelocity */
		function updatePlayerVelocity() {
			try {
				// vx
					if (STATE.keys.left && !STATE.keys.right) {
						STATE.player.vx = Math.max(STATE.player.vx - CONSTANTS.accelerationX, -CONSTANTS.maxVx)
					}
					else if (STATE.keys.right && !STATE.keys.left) {
						STATE.player.vx = Math.min(STATE.player.vx + CONSTANTS.accelerationX, CONSTANTS.maxVx)
					}
					else {
						STATE.player.vx = Math.sign(STATE.player.vx) * Math.max(0, Math.abs(STATE.player.vx) - CONSTANTS.decelerationX)
					}

				// vy
					if (STATE.player.rocketJump) {
						STATE.keys.jump = false
						STATE.player.onPlatform = false
						STATE.player.vy = CONSTANTS.playerRocketJumpVy
						STATE.player.rocketJump = false
					}
					else if (STATE.keys.jump && STATE.player.onPlatform) {
						STATE.keys.jump = false
						STATE.player.onPlatform = false
						STATE.player.vy = CONSTANTS.accelerationY
					}
					else if (!STATE.player.onPlatform) {
						STATE.player.vy = Math.max(STATE.player.vy + CONSTANTS.gravity, -CONSTANTS.maxVy)
					}
					else {
						STATE.player.vy = 0
					}
			} catch (error) {console.log(error)}
		}

	/* updatePlayerPosition */
		function updatePlayerPosition() {
			try {
				// x
					STATE.player.x = Math.max(Math.min(STATE.player.x + STATE.player.vx, CONSTANTS.maxX - CONSTANTS.playerWidth / 2), CONSTANTS.playerWidth / 2)

				// y
					STATE.player.y = Math.max(STATE.player.y + STATE.player.vy, CONSTANTS.playerHeight / 2)

				// floor
					if (STATE.player.y <= CONSTANTS.playerHeight / 2) {
						STATE.player.y = CONSTANTS.playerHeight / 2

						if (!STATE.player.onPlatform) {
							STATE.player.onPlatform = true
							STATE.player.health = Math.max(0, Math.min(CONSTANTS.playerMaxHealth, STATE.player.health + STATE.player.vy * CONSTANTS.playerFallMultiplier))
						}
						return
					}
				
				// no platform nearby
					const platform = STATE.platforms[`_${Math.floor((STATE.player.y - CONSTANTS.playerHeight / 2) / CONSTANTS.platformThreshold) * CONSTANTS.platformThreshold}`]
					if (!platform || !(STATE.player.x + (CONSTANTS.playerWidth / 2) >= platform.x1 && STATE.player.x - (CONSTANTS.playerWidth / 2) <= platform.x2)) {
						STATE.player.onPlatform = false
						return
					}

				// on a platform
					if (STATE.player.y + STATE.player.vy <= platform.y + CONSTANTS.playerHeight / 2) {
						STATE.player.y = platform.y + CONSTANTS.playerHeight / 2

						// on platform with bonus
							if (platform.bonus && Math.abs(STATE.player.x - platform.x) < CONSTANTS.playerWidth) {
								updatePlayerBonus(platform.bonus)
								delete platform.bonus

								platform.element.removeAttribute("bonus")
								platform.bonusElement.setAttribute("fade", true)
								setTimeout(() => {
									platform.bonusElement.remove()
									delete platform.bonusElement
								}, CONSTANTS.bonusFadeDelay)
							}

						// hitting platform
							if (!STATE.player.onPlatform) {
								STATE.player.onPlatform = true
								STATE.player.health = Math.max(0, Math.min(CONSTANTS.playerMaxHealth, STATE.player.health + STATE.player.vy * CONSTANTS.playerFallMultiplier))
							}
						return
					}

				// not on a platform
					STATE.player.onPlatform = false
			} catch (error) {console.log(error)}
		}

	/* updatePlayerStatus */
		function updatePlayerStatus() {
			try {
				// dead?
					if (STATE.player.health <= 0) {
						return endGame()
					}

				// health
					STATE.player.health = Math.max(0, Math.min(CONSTANTS.playerMaxHealth, STATE.player.health + CONSTANTS.playerRegenerationRate))

				// light
					STATE.player.lightRadius = Math.max(CONSTANTS.playerMinLightRadius, Math.min(CONSTANTS.playerMaxLightRadius, STATE.player.lightRadius - CONSTANTS.playerLightFadeRate))
					STATE.player.lightOrbRadius = Math.max(0, Math.min(CONSTANTS.playerMaxLightRadius, STATE.player.lightOrbRadius - CONSTANTS.playerLightFadeRate))
			} catch (error) {console.log(error)}
		}

	/* updatePlayerBonus */
		function updatePlayerBonus(bonusType) {
			try {
				// battery
					if (bonusType == "battery") {
						STATE.player.lightRadius = CONSTANTS.playerMaxLightRadius
					}

				// health
					if (bonusType == "health") {
						STATE.player.health = CONSTANTS.playerMaxHealth
					}

				// jump
					if (bonusType == "jump") {
						STATE.player.rocketJump = true
					}

				// lightbulb
					if (bonusType == "lightbulb") {
						STATE.player.lightOrbRadius = CONSTANTS.playerMaxLightRadius / 2
					}

				// flash
					if (bonusType == "flash") {
						while (STATE.ghosts.length) {
							STATE.ghosts[0].element.setAttribute("fade", true)
						 	setTimeout(() => {
								STATE.ghosts[0].element.remove()
							}, CONSTANTS.ghostFadeDelay)
							STATE.ghosts.shift()
						}
						STATE.ghostSpawnWait += CONSTANTS.ghostSpawnWait

						ELEMENTS.clouds.setAttribute("flash", true)
						ELEMENTS.clouds.style.transition = `${CONSTANTS.ghostFadeDelay / 1000}s`
						setTimeout(() => {
							ELEMENTS.clouds.removeAttribute("flash")
							ELEMENTS.clouds.style.removeProperty("transition")
						}, CONSTANTS.ghostFadeDelay)
					}
			} catch (error) {console.log(error)}
		}

/*** ghosts ***/
	/* updateGhosts */
		function updateGhosts() {
			try {
				// level
					const level = Math.floor(STATE.player.y / CONSTANTS.platformSpacing)

				// create
					const desiredGhostCount = Math.min(CONSTANTS.maxGhostCount, Math.max(CONSTANTS.minGhostCount, level))
					if (STATE.ghosts.length < desiredGhostCount && !STATE.ghostSpawnWait) {
						STATE.ghosts.push(createGhost())
						STATE.ghostSpawnWait += CONSTANTS.ghostSpawnWait
					}
					else {
						STATE.ghostSpawnWait = Math.max(0, STATE.ghostSpawnWait - 1)
					}

				// move
					for (let g = 0; g < STATE.ghosts.length; g++) {
						// out of bounds
							if (!moveGhost(STATE.ghosts[g])) {
								STATE.ghosts.splice(g, 1)
								g--
							}

						// intersects player
							else if (isIntersection(STATE.player, STATE.ghosts[g])) {
								const ghostOpacity = Math.round(STATE.ghosts[g].element.style.opacity * CONSTANTS.percent)
								STATE.player.health = Math.max(0, STATE.player.health - ghostOpacity)
							}
					}
			} catch (error) {console.log(error)}
		}

	/* createGhost */
		function createGhost() {
			try {
				// object
					const side = Math.floor(Math.random() * 2)
					const ghost = {
						y: STATE.player.y + (Math.random() * CONSTANTS.ghostRange),
						x: side ? -CONSTANTS.ghostSize : (CONSTANTS.maxX + CONSTANTS.ghostSize),
						width: CONSTANTS.ghostSize - 2 * CONSTANTS.ghostMargin,
						height: CONSTANTS.ghostSize,
						vx: (side ? 1 : -1) * (Math.random() * (CONSTANTS.ghostMaxVx - CONSTANTS.ghostMinVx) + CONSTANTS.ghostMinVx),
						vy: 0,
						element: document.createElement("div")
					}

				// html
					ghost.element.className = "ghost"
					ghost.element.innerHTML = CONSTANTS.svg.ghost
					ghost.element.style.left = `${ghost.x}%`
					ghost.element.style.bottom = `${ghost.y}%`
					ELEMENTS.game.tower.ghosts.appendChild(ghost.element)

				// return
					return ghost
			} catch (error) {console.log(error)}
		}

	/* moveGhost */
		function moveGhost(ghost) {
			try {
				// velocity
					if (ghost.y < STATE.player.y) {
						ghost.vy = Math.min(CONSTANTS.ghostMaxVy, ghost.vy + CONSTANTS.ghostAccelerationY)
					}
					else if (ghost.y > STATE.player.y) {
						ghost.vy = Math.max(-CONSTANTS.ghostMaxVy, ghost.vy - CONSTANTS.ghostAccelerationY)
					}

				// position
					ghost.x += ghost.vx
					ghost.y += ghost.vy
					ghost.element.style.left = `${ghost.x / CONSTANTS.maxX * CONSTANTS.percent}%`
					ghost.element.style.bottom = `${ghost.y / CONSTANTS.maxY * CONSTANTS.percent}%`

				// opacity
					const ghostDistanceFromCenter = Math.abs(ghost.x - (CONSTANTS.maxX / 2))
					const ghostPercentFromCenter = ghostDistanceFromCenter / (CONSTANTS.maxX / 2 - CONSTANTS.ghostSize / 2)
					ghost.element.style.opacity = Math.min(1, Math.max(0, 1 - ghostPercentFromCenter))

				// out of bounds
					if (ghost.vx > 0 && ghost.x > CONSTANTS.maxX + CONSTANTS.ghostSize) {
						ghost.element.remove()
						return false
					}
					if (ghost.vx < 0 && ghost.x < -CONSTANTS.ghostSize) {
						ghost.element.remove()
						return false
					}

				// light --> kill ghost
					const distanceToPlayer = ((ghost.x - STATE.player.x) ** 2 + (ghost.y - STATE.player.y) ** 2) ** (1 / 2)
					if (distanceToPlayer < STATE.player.lightRadius) {
						const radians = Math.atan2(ghost.y - STATE.player.y, ghost.x - STATE.player.x)
						let ghostAngle = Math.round(radians * CONSTANTS.radiansToDegrees) % CONSTANTS.circleDegrees
						while (ghostAngle < 0) {
							ghostAngle += CONSTANTS.circleDegrees
						}

						if (Math.abs(STATE.player.lightAngle - ghostAngle) < CONSTANTS.playerLightAngle) {
							STATE.ghostSpawnWait += CONSTANTS.ghostSpawnWait
							ghost.element.setAttribute("fade", true)
						 	setTimeout(() => {
								ghost.element.remove()
							}, CONSTANTS.ghostFadeDelay)
							return false
						}
					}

				// light orb --> kill ghost
					if (distanceToPlayer < STATE.player.lightOrbRadius) {
						STATE.ghostSpawnWait += CONSTANTS.ghostSpawnWait
						ghost.element.setAttribute("fade", true)
					 	setTimeout(() => {
							ghost.element.remove()
						}, CONSTANTS.ghostFadeDelay)
						return false
					}

				// still exists
					return true
			} catch (error) {console.log(error)}
		}

/*** background ***/
	/* iterateClouds */
		CONSTANTS.cloudLoop = setInterval(iterateClouds, CONSTANTS.timeStep)
		function iterateClouds() {
			try {
				// create
					if (STATE.clouds.length < CONSTANTS.maxCloudCount) {
						STATE.clouds.push(createCloud())
					}

				// move
					for (let c = 0; c < STATE.clouds.length; c++) {
						if (!moveCloud(STATE.clouds[c])) {
							STATE.clouds.splice(c, 1)
							c--
						}
					}
			} catch (error) {console.log(error)}
		}

	/* createCloud */
		function createCloud() {
			try {
				// object
					const side = Math.floor(Math.random() * 2)
					const cloud = {
						y: Math.random() * CONSTANTS.percent,
						x: (side ? -CONSTANTS.cloudSize : (CONSTANTS.percent + CONSTANTS.cloudSize)),
						vx: (Math.random() * (CONSTANTS.cloudMaxVx - CONSTANTS.cloudMinVx) + CONSTANTS.cloudMinVx) * (side ? 1 : -1),
						element: document.createElement("div")
					}

				// html
					cloud.element.className = "cloud"
					cloud.element.innerHTML = CONSTANTS.svg.cloud
					cloud.element.style.left = `${cloud.x}%`
					cloud.element.style.top  = `${cloud.y}%`
					ELEMENTS.clouds.appendChild(cloud.element)

				// return
					return cloud
			} catch (error) {console.log(error)}
		}

	/* moveCloud */
		function moveCloud(cloud) {
			try {
				// move
					cloud.x += cloud.vx
					cloud.element.style.left = `${cloud.x}%`

				// out of bounds
					if (cloud.vx > 0 && cloud.x > CONSTANTS.percent + CONSTANTS.cloudSize) {
						cloud.element.remove()
						return false
					}
					if (cloud.vx < 0 && cloud.x < -CONSTANTS.cloudSize) {
						cloud.element.remove()
						return false
					}

				// still exists
					return true
			} catch (error) {console.log(error)}
		}
