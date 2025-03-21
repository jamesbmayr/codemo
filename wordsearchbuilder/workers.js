/*** data tree ***/
	/* on message */
		self.onmessage = function(message) {
			var words = message.data.words || []
				words = sortRandom(words)
			var diagonal = message.data.diagonal || false

			results = []
			boards = {
				"0": {
					words: words
				}
			}

			for (var w in words) {
				buildBoards("0", w, words[w], diagonal)
			}

			results = sortRandom(results)
			postMessage(results)
		}

	/* buildBoards */
		function buildBoards(oldKey, newKey, word, diagonal) {
			if (results.length < 10000) {
				// get existing base board
					var oldBoard = boards[oldKey]
					
				// fresh board
					if (oldBoard && Object.keys(oldBoard).length == 1) {
						// right
							// new board
								var rightBoard = {}
									rightBoard.words = oldBoard.words.filter(function(w) {
										return (w !== word)
									})

							// add words (start at 0,0)
								for (var l in word) {
									rightBoard[l + ",0"] = word[l]
								}

							// add to boards object
								var k = oldKey + "-" + newKey + "_x"
								boards[k] = rightBoard

							// build branching boards for each remaining word
								if (rightBoard.words.length) {
									for (var w in rightBoard.words) {
										buildBoards(k, w, rightBoard.words[w], diagonal)
									}
								}

							// add to results
								else {
									results.push(rightBoard)
								}

						// down
							// new board
								var downBoard = {}
									downBoard.words = oldBoard.words.filter(function(w) {
										return (w !== word)
									})

							// add words (start at 0,0)
								for (var l in word) {
									downBoard["0," + l] = word[l]
								}

							// add to boards object
								var k = oldKey + "-" + newKey + "_y"
								boards[k] = downBoard

							// build branching boards for each remaining word
								if (downBoard.words.length) {
									for (var w in downBoard.words) {
										buildBoards(k, w, downBoard.words[w], diagonal)
									}
								}

							// add to results
								else {
									results.push(downBoard)
								}

						// diagonal
						if (diagonal) {
							// new board
								var diagonalBoard = {}
									diagonalBoard.words = oldBoard.words.filter(function(w) {
										return (w !== word)
									})

							// add words (start at 0,0)
								for (var l in word) {
									diagonalBoard[l + "," + l] = word[l]
								}

							// add to boards object
								var k = oldKey + "-" + newKey + "_xy"
								boards[k] = diagonalBoard

							// build branching boards for each remaining word
								if (diagonalBoard.words.length) {
									for (var w in diagonalBoard.words) {
										buildBoards(k, w, diagonalBoard.words[w], diagonal)
									}
								}

							// add to results
								else {
									results.push(diagonalBoard)
								}
						}

						// clean up
							delete boards[oldKey]
					}

				// add to existing board
					else if (oldBoard) {
						// find overlapping letters
							var overlaps = []
							for (var cell in oldBoard) {
								if (cell !== "words" && word.includes(oldBoard[cell])) {
									overlaps.push(cell)
								}
							}
							overlaps = sortRandom(overlaps)

						// for each overlapping letter...
							var branchFund = Math.min(oldBoard.words.length, 9)
							for (var o in overlaps) {
								for (var l in word) { // ...cycle through the word 
									if (branchFund < 0) { break } // (if there are already 3 branches on this oldBoard)
									else if (oldBoard[overlaps[o]] == word[l]) { // ...and find the overlap
										// x and y
											var x = overlaps[o].split(",")[0]
											var y = overlaps[o].split(",")[1]

										// right
											// assume it's possible; copy the board and filter out this word
												var possible = true
												var rightBoard = copyObject(oldBoard)
													rightBoard.words = rightBoard.words.filter(function(w) {
														return (w !== word)
													})

											// loop through the letters of the word
												var start = x - l
												var end = x - l + word.length
												var i = 0
												for (var tx = start; tx < end; tx++, i++) {
													// if there's already a (different) letter there...
														if (oldBoard[tx + "," + y] && oldBoard[tx + "," + y] !== word[i]) {
															possible = false
															break
														}

													// otherwise, add this to the board
														else {
															rightBoard[tx + "," + y] = word[i]
														}
												}

											// if that didn't error out...
												if (possible) {
													rightBoard = rezeroBoard(rightBoard)
													if (!isDuplicate(rightBoard)) {
														// add this to the boards object
															var k = oldKey + "-" + newKey + "_" + overlaps[o] + "_" + l + "_x"
															boards[k] = rightBoard
															branchFund -= 1

														// build branching boards for each remaining word
															if (rightBoard.words.length) {
																rightBoard.words = sortRandom(rightBoard.words)
																for (var w in rightBoard.words) {
																	buildBoards(k, w, rightBoard.words[w], diagonal)
																}
															}

														// add to results
															else {
																results.push(rightBoard)
															}
													}
												}

										// down
											// assume it's possible; copy the board and filter out this word
												var possible = true
												var downBoard = copyObject(oldBoard)
													downBoard.words = downBoard.words.filter(function(w) {
														return (w !== word)
													})

											// loop through the letters of the word
												var start = y - l
												var end = y - l + word.length
												var i = 0
												for (var ty = start; ty < end; ty++, i++) {
													// if there's already a (different) letter there...
														if (oldBoard[x + "," + ty] && oldBoard[x + "," + ty] !== word[i]) {
															possible = false
															break
														}

													// otherwise, add this to the board
														else {
															downBoard[x + "," + ty] = word[i]
														}
												}

											// if that didn't error out...
												if (possible) {
													downBoard = rezeroBoard(downBoard)
													if (!isDuplicate(downBoard)) {
														// add this to the boards object
															var k = oldKey + "-" + newKey + "_" + overlaps[o] + "_" + l + "_y"
															boards[k] = downBoard
															branchFund -= 1

														// build branching boards for each remaining word
															if (downBoard.words.length) {
																downBoard.words = sortRandom(downBoard.words)
																for (var w in downBoard.words) {
																	buildBoards(k, w, downBoard.words[w], diagonal)
																}
															}

														// add to results
															else {
																results.push(downBoard)
															}
													}
												}

										// diagonal
										if (diagonal) {
											// assume it's possible; copy the board and filter out this word
												var possible = true
												var diagonalBoard = copyObject(oldBoard)
													diagonalBoard.words = diagonalBoard.words.filter(function(w) {
														return (w !== word)
													})

											// loop through the letters of the word
												var startx = x - l
												var starty = y - l
												var endx = x - l + word.length
												var i = 0
												var tx, ty
												for (tx = startx, ty = starty; tx < endx; tx++, ty++, i++) {
													// if there's already a (different) letter there...
														if (oldBoard[tx + "," + ty] && oldBoard[tx + "," + ty] !== word[i]) {
															possible = false
															break
														}

													// otherwise, add this to the board
														else {
															diagonalBoard[tx + "," + ty] = word[i]
														}
												}

											// if that didn't error out...
												if (possible) {
													diagonalBoard = rezeroBoard(diagonalBoard)
													if (!isDuplicate(diagonalBoard)) {
														// add this to the boards object
															var k = oldKey + "-" + newKey + "_" + overlaps[o] + "_" + l + "_xy"
															boards[k] = diagonalBoard
															branchFund -= 1

														// build branching boards for each remaining word
															if (diagonalBoard.words.length) {
																diagonalBoard.words = sortRandom(diagonalBoard.words)
																for (var w in diagonalBoard.words) {
																	buildBoards(k, w, diagonalBoard.words[w], diagonal)
																}
															}

														// add to results
															else {
																results.push(diagonalBoard)
															}
													}
												}
										}
									}
								}
							}

						// clean up
							delete boards[oldKey]
					}
			}
		}

	/* copyObject */
		function copyObject(oldObject) {
			// json trick
				var newObject = JSON.parse(JSON.stringify(oldObject))
				return newObject
		}

	/* sortRandom */
		function sortRandom(oldArray) {
			// duplicate array
				var array = []
				for (var o in oldArray) {
					array[o] = oldArray[o]
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

			return array || []
		}

	/* rezeroBoard */
		function rezeroBoard(oldBoard) {
			// get x and y
				var minX = 0
				var maxX = 0
				var minY = 0
				var maxY = 0

				for (var cell in oldBoard) {
					if (cell !== "words") {
						var x = Number(cell.split(",")[0])
						var y = Number(cell.split(",")[1])

						if (x < minX) {
							minX = x
						}
						if (x > maxX) {
							maxX = x
						}
						if (y < minY) {
							minY = y
						}
						if (y > maxY) {
							maxY = y
						}
					}
				}

			// create copy with adjusted coordinates
				var newBoard = {words: oldBoard.words}
				for (var y = minY; y <= maxY; y++) {
					for (var x = minX; x <= maxX; x++) {
						if (oldBoard[x + "," + y]) {
							newBoard[(x - minX) + "," + (y - minY)] = oldBoard[x + "," + y]
						}
					}
				}

				return newBoard
		}

	/* isDuplicate */
		function isDuplicate(oldObject) {
			// get as a string
				var stringO = JSON.stringify(oldObject)
				var wordsO  = oldObject.words.join("")
				var keysO   = Object.keys(oldObject)

			// find a copy
				for (var b in boards) {
					var keysB = Object.keys(boards[b])

					if (keysB.length !== keysO.length) {
						break
					}
					else if (boards[b].words.join("") !== wordsO) {
						break
					}
					else {
						for (var k = 0; k < keysB.length; k++) {
							if (keysB[k] !== keysO[k]) {
								break
							}
							else if (k && (boards[b][keysB[k]] !== oldObject[keysB[k]])) {
								break
							}
							else {
								return true
							}
						}
					}
				}
			
			// no repeat?
				return false
		}
