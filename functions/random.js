/*** request ***/
	/* submitQuery */
		exports.submitQuery = submitQuery
		function submitQuery(query) {
			try {
				// color
					if (query.type == "color") {
						return randomizeColor(query)
					}

				// dice
					if (query.dice != undefined || query.type == "dice") {
						return randomizeDice(query)
					}

				// string
					if (query.set != undefined || query.size != undefined || query.type == "string") {
						return randomizeString(query)
					}

				// item from list
					if (query.list != undefined || query.selections != undefined || query.groups != undefined || query.type == "selection") {
						return randomizeSelection(query)
					}

				// number in range
					if (query.min != undefined || query.max != undefined || query.type == "number") {
						return randomizeRange(query)
					}

				// no specifications
					return JSON.stringify({
						success: true,
						output: Math.random()
					})
			}
			catch (error) { console.log(error) }
		}

/*** actions ***/
	/* randomizeColor */
		function randomizeColor(query) {
			try {
				// rgb
					var red = Math.floor(Math.random() * 256)
					var green = Math.floor(Math.random() * 256)
					var blue = Math.floor(Math.random() * 256)

					var rgb = "rgb(" + red + "," + green + "," + blue + ")"
					var hex = "#" + Number(red).toString(16) + Number(green).toString(16) + Number(blue).toString(16)

				// return
					return JSON.stringify({
						success: true,
						output: rgb + " | " + hex
					})
			}
			catch (error) { console.log(error) }
		}

	/* randomizeDice */
		function randomizeDice(query) {
			try {
				// commands
					var commands = String(query.dice).toLowerCase().replace(/%20/g," ").split(/\s/)
					var diceRegex = /^[\d]+d[\d]+$/

				// roll dice
					for (var i in commands) {
						// ndx
							if (diceRegex.test(commands[i])) {
								var count = commands[i].split("d")[0]
								var sides = commands[i].split("d")[1]
								commands[i] = rollDice(count, sides)
								continue
							}

						// number
							if (!isNaN(Number(commands[i]))) {
								continue
							}

						// plus / multiply
							if (commands[i] == "+" || commands[i] == "*" || commands[i] == "-") {
								continue
							}

						// invalid
							return JSON.stringify({success: false, message: "invalid command in random dice: '" + commands[i] + "'"})
					}

				// calculate total
					var output = 0
					var nextOperator = "+"
					for (var i in commands) {
						// operator
							if (commands[i] == "+") {
								nextOperator = "+"
								continue
							}
							if (commands[i] == "*") {
								nextOperator = "*"
								continue
							}
							if (commands[i] == "-") {
								nextOperator = "-"
								continue
							}

						// number
							if (!isNaN(Number(commands[i]))) {
								if (nextOperator == "+") {
									output += Number(commands[i])
									continue
								}

								if (nextOperator == "*") {
									output *= Number(commands[i])
									continue
								}

								if (nextOperator == "-") {
									output -= Number(commands[i])
									continue
								}
							}
					}

				// return
					return JSON.stringify({
						success: true,
						output: output
					})
			}
			catch (error) { console.log(error) }
		}

	/* randomizeString */
		function randomizeString(query) {
			try {
				// no set
					var set = query.set || "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

				// no length
					var size = Number(query.size) || 16

				// build output
					var output = ""
					while (output.length < size) {
						output += chooseRandom(set)
					}

				// return
					return JSON.stringify({
						success: true,
						output: output
					})
			}
			catch (error) { console.log(error) }
		}

	/* randomizeSelection */
		function randomizeSelection(query) {
			try {
				// no list
					if (!query.list || String(query.list).split(/\s?,\s?/).length < 2) {
						return JSON.stringify({success: false, message: "random selection requires list of 2 or more comma-separated items in string parameter 'list'"})
					}
					var list = String(query.list).split(/\s?,\s?/)

				// groups
					if (query.groups != undefined) {
						// invalid groups
							if (isNaN(Number(query.groups)) || Number(query.groups) == 0 || Number(query.groups) % 1 !== 0) {
								return JSON.stringify({success: false, message: "random selection into groups requires positive whole number parameter 'groups'"})	
							}

						// number of groups
							var groupCount = Number(query.groups)
							var groups = []
							for (var i = 0; i < groupCount; i++) {
								groups.push([])
							}

						// shuffle list
							var shuffledList = sortRandom(list)

						// distribute list
							var groupIndex = 0
							while (shuffledList.length) {
								var nextItem = shuffledList.pop()
								groups[groupIndex].push(nextItem)

								groupIndex++
								if (groupIndex >= groups.length) {
									groupIndex = 0
								}
							}

						// output string
							var output = ""
							for (var i in groups) {
								output += ("[" + groups[i].join(", ") + "] ")
							}

						// return
							return JSON.stringify({
								success: true,
								output: output.trim()
							})
					}

				// invalid selections
					if (query.selections != undefined && (isNaN(Number(query.selections)) || Number(query.selections) == 0 || Number(query.selections) % 1 !== 0)) {
						return JSON.stringify({success: false, message: "random selection requires positive whole number parameter 'selections'"})	
					}

				// valid selection
					var selections = Number(query.selections) || 1

				// get list
					var output = []
					while (output.length < selections && list.length) {
						list = sortRandom(list)
						output.push(list.pop())
					}

				// return
					return JSON.stringify({
						success: true,
						output: output.join(", ")
					})
			}
			catch (error) { console.log(error) }
		}

	/* randomizeRange */
		function randomizeRange(query) {
			try {
				// no minimum
					if (query.min == undefined || isNaN(Number(query.min))) {
						return JSON.stringify({success: false, message: "random in range requires number parameter 'min'"})
					}

				// no maximum
					if (query.max == undefined || isNaN(Number(query.max))) {
						return JSON.stringify({success: false, message: "random in range requires number parameter 'max'"})
					}

				// get range
					var minimum = Number(query.min)
					var maximum = Number(query.max)
					var range = maximum - minimum

				// negative range
					if (range <= 0) {
						return JSON.stringify({success: false, message: "'max' must be greater than 'min'"})
					}

				// get random
					var output = Math.floor(Math.random() * range) + minimum
					return JSON.stringify({
						success: true,
						output: output
					})
			}
			catch (error) { console.log(error) }
		}

/*** tools ***/
	/* sortRandom */
		function sortRandom(input) {
			try {
				// duplicate array
					var array = []
					for (var i in input) {
						array[i] = input[i]
					}

				// fisher-yates shuffle
					var x = array.length
					while (x > 0) {
						var y = Math.floor(Math.random() * x)
						x = x - 1
						var temp = array[x]
						array[x] = array[y]
						array[y] = temp
					}

				// return
					return array
			} 
			catch (error) { console.log(error) }
		}

	/* chooseRandom */
		function chooseRandom(input) {
			try {
				// random item from list
					return input[Math.floor(Math.random() * input.length)]
			} 
			catch (error) { console.log(error) }
		}

	/* rollDice */
		function rollDice(count, sides) {
			try {
				// roll each die
					var rolls = []
					while (rolls.length < count) {
						rolls.push(Math.floor(Math.random() * sides) + 1)
					}

				// sum rolls
					var total = 0
					for (var i in rolls) {
						total += rolls[i]
					}

				// return
					return total
			}
			catch (error) { console.log(error) }
		}

