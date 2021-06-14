window.addEventListener("load", function() {
	/*** globals ***/
		/*** bots ***/
			var BOTS = {
				random_bot: function(self, opponent, history) {
					return chooseRandom(Object.keys(CONSTANTS.moves))
				},
				rock_bot: function(self, opponent, history) {
					return "rock"
				},
				paper_bot: function(self, opponent, history) {
					return "paper"
				},
				scissors_bot: function(self, opponent, history) {
					return "scissors"
				},
				mostly_rock_bot: function(self, opponent, history) {
					return Math.floor(Math.random() * 2) ? "rock" : chooseRandom(Object.keys(CONSTANTS.moves))
				},
				mostly_paper_bot: function(self, opponent, history) {
					return Math.floor(Math.random() * 2) ? "paper" : chooseRandom(Object.keys(CONSTANTS.moves))
				},
				mostly_scissors_bot: function(self, opponent, history) {
					return Math.floor(Math.random() * 2) ? "scissors" : chooseRandom(Object.keys(CONSTANTS.moves))
				},
				mirror_bot: function(self, opponent, history) {
					return history.length ? history[history.length - 1][opponent] : chooseRandom(Object.keys(CONSTANTS.moves))
				},
				delayed_mirror_bot: function(self, opponent, history) {
					return (history.length && history.length > 1) ? history[history.length - 2][opponent] : chooseRandom(Object.keys(CONSTANTS.moves))
				},
				counter_bot: function(self, opponent, history) {
					return history.length ? Object.keys(CONSTANTS.moves).find(function(i) { return CONSTANTS.moves[i] == history[history.length - 1][opponent] }) : chooseRandom(Object.keys(CONSTANTS.moves))
				},
				delayed_counter_bot: function(self, opponent, history) {
					return (history.length && history.length > 1) ? Object.keys(CONSTANTS.moves).find(function(i) { return CONSTANTS.moves[i] == history[history.length - 2][opponent] }) : chooseRandom(Object.keys(CONSTANTS.moves))
				},
				cycle_bot: function(self, opponent, history) {
					return history.length ? Object.keys(CONSTANTS.moves).find(function(i) { return CONSTANTS.moves[i] == history[history.length - 1][self] }) : chooseRandom(Object.keys(CONSTANTS.moves))
				},
				reverse_cycle_bot: function(self, opponent, history) {
					return history.length ? CONSTANTS.moves[history[history.length - 1][self]] : chooseRandom(Object.keys(CONSTANTS.moves))
				},
				seconds_bot: function(self, opponent, history) {
					var step = new Date().getSeconds() % 3
					return (step == 0) ? "rock" : (step == 1) ? "paper" : "scissors" 
				},
				minutes_bot: function(self, opponent, history) {
					var step = new Date().getMinutes() % 3
					return (step == 0) ? "rock" : (step == 1) ? "paper" : "scissors" 
				},
				historian_bot: function(self, opponent, history) {
					var counts = {}
					for (var i in history) {
						if (!counts[history[i][opponent]]) {
							counts[history[i][opponent]] = 1
						}
						else {
							counts[history[i][opponent]]++
						}
					}

					var countKeys = Object.keys(counts)
						countKeys.sort(function(a, b) {
							return counts[b] - counts[a]
						})

					return Object.keys(CONSTANTS.moves).find(function(i) { return CONSTANTS.moves[i] == countKeys[0] }) || chooseRandom(Object.keys(CONSTANTS.moves))
				},
				recent_historian_bot: function(self, opponent, history) {
					var counts = {}
					for (var i = Math.max(0, history.length - 5); i < history.length; i++) {
						if (!counts[history[i][opponent]]) {
							counts[history[i][opponent]] = 1
						}
						else {
							counts[history[i][opponent]]++
						}
					}

					var countKeys = Object.keys(counts)
						countKeys.sort(function(a, b) {
							return counts[b] - counts[a]
						})

					return Object.keys(CONSTANTS.moves).find(function(i) { return CONSTANTS.moves[i] == countKeys[0] }) || chooseRandom(Object.keys(CONSTANTS.moves))
				},
				random_pattern_bot: function(self, opponent, history) {
					if (!GAME[self + "Pattern"]) {
						GAME[self + "Pattern"] = []
						var patternSize = Math.floor(Math.random() * 9) + 2
						while (GAME[self + "Pattern"].length < patternSize) {
							GAME[self + "Pattern"].push(chooseRandom(Object.keys(CONSTANTS.moves)))
						}
						GAME[self + "PatternIndex"] = 0
					}

					if (GAME[self + "PatternIndex"] < GAME[self + "Pattern"].length - 1) {
						var move = GAME[self + "Pattern"][GAME[self + "PatternIndex"]]
						GAME[self + "PatternIndex"]++
						return move
					}
					else {
						GAME[self + "PatternIndex"] = 0
						return GAME[self + "Pattern"][GAME[self + "PatternIndex"]]
					}
				}
			}

		/* constants */
			var CONSTANTS = {
				moves: {
					rock: "scissors",
					scissors: "paper",
					paper: "rock"
				},
				loopTime: 1000 * 3
			}

		/* triggers */
			var TRIGGERS = {
				click: "click",
				change: "change"
			}

		/* elements */
			var ELEMENTS = {
				container: document.querySelector("#container"),
				p1: {
					element: document.querySelector("#p1"),
					move: document.querySelector("#p1-move"),
					points: document.querySelector("#p1-points"),
					selection: document.querySelector("#p1-selection"),
					rock: document.querySelector("#p1-rock"),
					paper: document.querySelector("#p1-paper"),
					scissors: document.querySelector("#p1-scissors"),
					custom: document.querySelector("#p1-custom"),
					code: document.querySelector("#p1-custom-code")
				},
				p2: {
					element: document.querySelector("#p2"),
					move: document.querySelector("#p2-move"),
					points: document.querySelector("#p2-points"),
					selection: document.querySelector("#p2-selection"),
					rock: document.querySelector("#p2-rock"),
					paper: document.querySelector("#p2-paper"),
					scissors: document.querySelector("#p2-scissors"),
					custom: document.querySelector("#p2-custom"),
					code: document.querySelector("#p2-custom-code")
				},
				message: document.querySelector("#message"),
				reset: document.querySelector("#reset")
			}

		/* game */
			var GAME = {}

	/*** interaction ***/
		/* resetGame */
			resetGame()
			ELEMENTS.reset.addEventListener(TRIGGERS.click, resetGame)
			function resetGame() {
				try {
					// clear scores & moves
						ELEMENTS.p1.move.innerText = ""
						ELEMENTS.p2.move.innerText = ""

						ELEMENTS.p1.points.innerText = "-"
						ELEMENTS.p2.points.innerText = "-"

						for (var i in CONSTANTS.moves) {
							ELEMENTS.p1[i].removeAttribute("selected")	
							ELEMENTS.p2[i].removeAttribute("selected")	
						}

					// previous game winner
						ELEMENTS.message.innerText = GAME.points ? (
							(GAME.points.p1 > GAME.points.p2) ? (GAME.players.p1 + " wins! " + GAME.players.p2 + " loses!") :
							(GAME.points.p1 < GAME.points.p2) ? (GAME.players.p1 + " loses! " + GAME.players.p2 + " wins!") :
							(GAME.players.p1 + " & " + GAME.players.p2 + " tie!")
						) : "Make a move."

					// clear previous loop
						if (GAME && GAME.loop) {
							clearInterval(GAME.loop)
						}

					// reset game object
						GAME = {
							history: [],
							points: {
								p1: 0,
								p2: 0
							},
							players: {
								p1: null,
								p2: null
							},
							pending: {
								p1: null,
								p2: null
							},
							loop: setInterval(selectBotMoves, CONSTANTS.loopTime)
						}

					// get players from selects
						selectPlayer({target: {id: "p1", value: ELEMENTS.p1.selection.value}})
						selectPlayer({target: {id: "p2", value: ELEMENTS.p2.selection.value}})
				} catch (error) {console.log(error)}
			}

		/* selectPlayer */
			ELEMENTS.p1.selection.addEventListener(TRIGGERS.change, selectPlayer)
			ELEMENTS.p2.selection.addEventListener(TRIGGERS.change, selectPlayer)
			function selectPlayer(event) {
				try {
					// player
						var id = event.target.id.split("-")
						var player = id[0]
						var name = event.target.value

					// human?
						if (name == "!") {
							GAME.players[player] = "human"
							for (var i in CONSTANTS.moves) {
								ELEMENTS[player][i].removeAttribute("disabled")
							}
							ELEMENTS[player].custom.removeAttribute("visible")
							return
						}

					// random
						if (name == "?") {
							GAME.players[player] = chooseRandom(Object.keys(BOTS))
							for (var i in CONSTANTS.moves) {
								ELEMENTS[player][i].setAttribute("disabled", true)
							}
							ELEMENTS[player].custom.removeAttribute("visible")
							return
						}

					// custom
						if (name == "#") {
							GAME.players[player] = "custom"
							for (var i in CONSTANTS.moves) {
								ELEMENTS[player][i].setAttribute("disabled", true)
							}
							ELEMENTS[player].custom.setAttribute("visible", true)
						}

					// specific
						if (Object.keys(BOTS).includes(name)) {
							GAME.players[player] = name
							for (var i in CONSTANTS.moves) {
								ELEMENTS[player][i].setAttribute("disabled", true)	
							}
							ELEMENTS[player].custom.removeAttribute("visible")
						}
				} catch (error) {console.log(error)}
			}

		/* selectMove */
			for (var i in CONSTANTS.moves) {
				ELEMENTS.p1[i].addEventListener(TRIGGERS.click, selectMove)
				ELEMENTS.p2[i].addEventListener(TRIGGERS.click, selectMove)
			}
			function selectMove(event) {
				try {
					// player
						var id = event.target.id.split("-")
						var self = id[0]
						var opponent = (self == "p1" ? "p2" : "p1")

					// player move
						var move = id[1]
						if (!Object.keys(CONSTANTS.moves).includes(move)) {
							return
						}

					// save to pending	
						GAME.pending[self] = move
						for (var i in CONSTANTS.moves) {
							ELEMENTS[self][i].blur()	
							ELEMENTS[self][i].blur()
						}

					// opponent is human?
						if (GAME.players[opponent] == "human") {
							// still waiting
								if (!GAME.pending[opponent]) {
									return
								}

							// both moves submitted
								evaluateRound()
								return
						}

					// opponent is custom bot?
						if (GAME.players[opponent] == "custom") {
							GAME.pending[opponent] = evaluateCustom(opponent, self, duplicateObject(GAME.history), ELEMENTS[opponent].code.value) || chooseRandom(Object.keys(CONSTANTS.moves))
							evaluateRound()
							return
						}

					// opponent is built-in bot?
						GAME.pending[opponent] = BOTS[GAME.players[opponent]](opponent, self, GAME.history)
						evaluateRound()
				} catch (error) {console.log(error)}
			}

		/* selectBotMoves */
			function selectBotMoves() {
				try {
					// human playing?
						if (GAME.players.p1 == "human" || GAME.players.p2 == "human") {
							return
						}

					// p1
						if (GAME.players.p1 == "custom") {
							GAME.pending.p1 = evaluateCustom("p1", "p2", duplicateObject(GAME.history), ELEMENTS.p1.code.value) || chooseRandom(Object.keys(CONSTANTS.moves))
						}
						else {
							GAME.pending.p1 = BOTS[GAME.players.p1]("p1", "p2", GAME.history)
						}

					// p2
						if (GAME.players.p2 == "custom") {
							GAME.pending.p2 = evaluateCustom("p2", "p1", duplicateObject(GAME.history), ELEMENTS.p2.code.value) || chooseRandom(Object.keys(CONSTANTS.moves))
						}
						else {
							GAME.pending.p2 = BOTS[GAME.players.p2]("p2", "p1", GAME.history)
						}

					// evaluate
						evaluateRound()
				} catch (error) {console.log(error)}
			}

	/*** tools ***/
		/* populateBots */
			populateBots()
			function populateBots() {
				try {
					// loop through
						for (var i in BOTS) {
							// p1
								var p1Option = document.createElement("option")
									p1Option.value = p1Option.innerText = i
								ELEMENTS.p1.selection.appendChild(p1Option)

							// p2
								var p2Option = document.createElement("option")
									p2Option.value = p2Option.innerText = i
								ELEMENTS.p2.selection.appendChild(p2Option)
						}
				} catch (error) {console.log(error)}
			}

		/* duplicateObject */
			function duplicateObject(object) {
				try {
					// not an object
						if (typeof object !== "object") {
							return
						}

					// duplicate with JSON
						return JSON.parse(JSON.stringify(object))
				} catch (error) {console.log(error)}
			}

		/* chooseRandom */
			function chooseRandom(array) {
				try {
					// not array
						if (!array || typeof array !== "object" || !Array.isArray(array)) {
							return
						}

					// random element
						return array[Math.floor(Math.random() * array.length)]
				} catch (error) {console.log(error)}
			}

		/* evaluateCustom */
			function evaluateCustom(self, opponent, history, code) {
				try {
					code = eval("function customCode(self, opponent, history) {\n" + code + "\n}")
					return customCode(self, opponent, history)
				} catch (error) {console.log(error)}
			}

		/* evaluateRound */
			function evaluateRound() {
				try {
					// display moves
						ELEMENTS.p1.move.innerText = GAME.pending.p1
						ELEMENTS.p2.move.innerText = GAME.pending.p2

					// light up buttons
						for (var i in CONSTANTS.moves) {
							if (i == GAME.pending.p1) {
								ELEMENTS.p1[i].setAttribute("selected", true)
							}
							else {
								ELEMENTS.p1[i].removeAttribute("selected")	
							}

							if (i == GAME.pending.p2) {
								ELEMENTS.p2[i].setAttribute("selected", true)
							}
							else {
								ELEMENTS.p2[i].removeAttribute("selected")	
							}
						}

					// winner?
						var winner = getWinner(GAME.pending.p1, GAME.pending.p2)
						ELEMENTS.message.innerText = winner ? (winner + " takes round") : "tie round"
						if (winner) {
							GAME.points[winner]++
							ELEMENTS.p1.points.innerText = GAME.points.p1
							ELEMENTS.p2.points.innerText = GAME.points.p2
						}

					// add to history
						GAME.history.push({
							p1: GAME.pending.p1,
							p2: GAME.pending.p2,
							winner: winner
						})

					// clear from pending
						GAME.pending.p1 = null
						GAME.pending.p2 = null
				} catch (error) {console.log(error)}
			}

		/* getWinner */
			function getWinner(p1Move, p2Move) {
				try {
					// tie
						if (p1Move == p2Move) {
							return null
						}

					// sequence
						if (CONSTANTS.moves[p1Move] == p2Move) {
							return "p1"
						}
						else if (CONSTANTS.moves[p2Move] == p1Move) {
							return "p2"
						}
				} catch (error) {console.log(error)}
			}
})
