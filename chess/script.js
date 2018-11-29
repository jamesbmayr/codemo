/*** GLOBAL ***/
	/* variables */
		var lastSelectedPiece
		var game
		var shadowBoard
		var trigger = (/Android|webOS|iPhone|iPad|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ? "touchstart" : "click"

	/* start up functions */
		initializeGame()

	/* listeners */
		// picking a piece or square to move to
			document.querySelectorAll(".square").forEach(function(square) {
				square.addEventListener(trigger, selectSquare)
			})

		// reset game
			document.getElementById("reset").addEventListener(trigger, initializeGame)

		// undo last move
			document.getElementById("undo").addEventListener(trigger, undoMove)

		// promoting a pawn
			document.querySelectorAll(".promote-button").forEach(function(button) {
				button.addEventListener(trigger, promotePawn)
			})

		// resign
			document.getElementById("resign").addEventListener(trigger, resignGame)

		// back and forward buttons
			document.getElementById("history-back").addEventListener(trigger, showPreviousMove)
			document.getElementById("history-forward").addEventListener(trigger, showNextMove)

/*** CREATION ***/
	/* initializeGame */
		function initializeGame() {
			createGame()
			drawBoard()
			drawPieces()
			makeShadowBoard()
			game.status.history.push(JSON.stringify(shadowBoard))

			lastSelectedPiece = null
			document.getElementById("message-panel").className = ""
			document.getElementById("message-heading").innerText = "white's turn"
			document.getElementById("message-body").innerText = ""
			document.getElementById("turn-current").innerText = 1
			document.getElementById("turn-count").innerText = 1
		}

	/* createGame */
		function createGame() {
			// create the game object (status, player1, player2)
				game = {
					status: {
						turn: 1,
						possiblesMoves: [],
						check: null,
						over: null,
						winner: null,
						needToPromote: false,
						currentlyDisplayedMove: null,
						history: []
					},
					player1: {
						pawn1: {
							type: "pawn1",
							symbol: "&#9823;",
							x: 1,
							y: 2,
			 				player: 1,
			 				alive: true,
			 				movedTwoSquares: false
						},
						pawn2: {
							type: "pawn2",
							symbol: "&#9823;",
							x: 2,
							y: 2,
							player: 1,
							alive: true,
							movedTwoSquares: false
						},
						pawn3: {
							type: "pawn3",
							symbol: "&#9823;",
							x: 3,
							y: 2,
							player: 1,
							alive: true,
							movedTwoSquares: false
						},
						pawn4: {
							type: "pawn4",
							symbol: "&#9823;",
							x: 4,
							y: 2,
							player: 1,
							alive: true,
							movedTwoSquares: false
						},
						pawn5: {
							type: "pawn5",
							symbol: "&#9823;",
							x: 5,
							y: 2,
							player: 1,
							alive: true,
							movedTwoSquares: false
						},
						pawn6: {
							type: "pawn6",
							symbol: "&#9823;",
							x: 6,
							y: 2,
							player: 1,
							alive: true,
							movedTwoSquares: false
						},
						pawn7: {
							type: "pawn7",
							symbol: "&#9823;",
							x: 7,
							y: 2,
							player: 1,
							alive: true,
							movedTwoSquares: false
						},
						pawn8: {
							type: "pawn8",
							symbol: "&#9823;",
							x: 8,
							y: 2,
							player: 1,
							alive: true,
							movedTwoSquares: false
						},
						rook1: {
							type: "rook1",
							symbol: "&#9820;",
							x: 1,
							y: 1,
							player: 1,
							alive: true,
							hasMoved: false
						},
						rook2: {
							type: "rook2",
							symbol: "&#9820;",
							x: 8,
							y: 1,
							player: 1,
							alive: true,
							hasMoved: false
						},
						knight1: {
							type: "knight1",
							symbol: "&#9822;",
							x: 2,
							y: 1,
							player: 1,
							alive: true
						},
						knight2: {
							type: "knight2",
							symbol: "&#9822;",
							x: 7,
							y: 1,
							player: 1,
							alive: true
						},
						bishop1: {
							type: "bishop1",
							symbol: "&#9821;",
							x: 3,
							y: 1,
							player: 1,
							alive: true
						},
						bishop2: {
							type: "bishop2",
							symbol: "&#9821;",
							x: 6,
							y: 1,
							player: 1,
							alive: true
						},
						queen1: {
							type: "queen1",
							symbol: "&#9819;",
							x: 4,
							y: 1,
							player: 1,
							alive: true
						},
						king1: {
							type: "king1",
							symbol: "&#9818;",
							x: 5,
							y: 1,
							player: 1,
							alive: true,
							hasMoved: false
						}
					},
					player2: {
						pawn1: {
							type: "pawn1",
							symbol: "&#9823;",
							x: 1,
							y: 7,
							player: 2,
							alive: true,
							movedTwoSquares: false
						},
						pawn2: {
							type: "pawn2",
							symbol: "&#9823;",
							x: 2,
							y: 7,
							player: 2,
							alive: true,
							movedTwoSquares: false
						},
						pawn3: {
							type: "pawn3",
							symbol: "&#9823;",
							x: 3,
							y: 7,
							player: 2,
							alive: true,
							movedTwoSquares: false
						},
						pawn4: {
							type: "pawn4",
							symbol: "&#9823;",
							x: 4,
							y: 7,
							player: 2,
							alive: true,
							movedTwoSquares: false
						},
						pawn5: {
							type: "pawn5",
							symbol: "&#9823;",
							x: 5,
							y: 7,
							player: 2,
							alive: true,
							movedTwoSquares: false
						},
						pawn6: {
							type: "pawn6",
							symbol: "&#9823;",
							x: 6,
							y: 7,
							player: 2,
							alive: true,
							movedTwoSquares: false
						},
						pawn7: {
							type: "pawn7",
							symbol: "&#9823;",
							x: 7,
							y: 7,
							player: 2,
							alive: true,
							movedTwoSquares: false
						},
						pawn8: {
							type: "pawn8",
							symbol: "&#9823;",
							x: 8,
							y: 7,
							player: 2,
							alive: true,
							movedTwoSquares: false
						},
						rook1: {
							type: "rook1",
							symbol: "&#9820;",
							x: 1,
							y: 8,
							player: 2,
							alive: true,
							hasMoved: false
						},
						rook2: {
							type: "rook2",
							symbol: "&#9820;",
							x: 8,
							y: 8,
							player: 2,
							alive: true,
							hasMoved: false
						},
						knight1: {
							type: "knight1",
							symbol: "&#9822;",
							x: 2,
							y: 8,
							player: 2,
							alive: true
						},
						knight2: {
							type: "knight2",
							symbol: "&#9822;",
							x: 7,
							y: 8,
							player: 2,
							alive: true
						},
						bishop1: {
							type: "bishop1",
							symbol: "&#9821;",
							x: 3,
							y: 8,
							player: 2,
							alive: true
						},
						bishop2: {
							type: "bishop2",
							symbol: "&#9821;",
							x: 6,
							y: 8,
							player: 2,
							alive: true
						},
						queen1: {
							type: "queen1",
							symbol: "&#9819;",
							x: 4,
							y: 8,
							player: 2,
							alive: true
						},
						king1: {
							type: "king1",
							symbol: "&#9818;",
							x: 5,
							y: 8,
							player: 2,
							alive: true,
							hasMoved: false
						}
					}
				}
		}

	/* drawBoard */
		function drawBoard() {
			// erase previous boards
				document.getElementById("board").innerHTML = ""
				document.getElementById("graveyard-player1").innerHTML = ""
				document.getElementById("graveyard-player2").innerHTML = ""
				document.body.className = ""

			// loop through all coordinates (top-down, left-to-right)
				for (y = 8; y >= 1; y--) {
					for(x = 1; x <= 8; x++) {

						// light or dark square?
							var thisColor = (x + y)%2 != 0 ? "white" : "dark"

						// build square and add to board // <span class = 'coords'>(" + x + ", " + y + ")</span>
							document.getElementById("board").innerHTML += ("<div class = 'square' data-x = " + x + " data-y = " + y + " data-color = '" + thisColor + "'></div>")
						
					}	

					// add a line break after each row
						document.getElementById("board").innerHTML += ("<br>")		
				}
		}

/*** GAMELOOP ***/	
	/* switchTurn */
		function switchTurn(){
			// remove square styling
				unhighlightSquares()

			// check if the opponent is in check or checkmate
				var opponent = (game.status.turn == 1) ? 2 : 1
				var opponentColor = (opponent == 1 ? "white" : "black")
				if (!game.status.over) {
					var turnStatus = inCheckOrCheckmateOrDraw(opponent)
				} else {
					var turnStatus = "gameover"
				}

			
			// set by status
				if (turnStatus == "checkmate") {
					// checkmate
						var winnerColor = (game.status.turn == 1 ? "white" : "black")

						document.getElementById("message-panel").className = "checkmate"
						document.getElementById("message-heading").innerText = "checkmate"
						document.getElementById("message-body").innerText = winnerColor + " wins"
						
						game.status.over = "checkmate"
						game.status.winner = winnerColor
						document.body.className = "gameover"
						game.status.currentlyDisplayedMove = game.status.history.length	
						var justEnded = true
				} else if (turnStatus == "draw") {
					// draw
						document.getElementById("message-panel").className = "draw"
						document.getElementById("message-heading").innerText = "draw"
						document.getElementById("message-body").innerText = ""
						
						game.status.over = "draw"
						game.status.winner = null
						document.body.className = "gameover"
						game.status.currentlyDisplayedMove = game.status.history.length
						var justEnded = true

				} else if (turnStatus == "check") {
					// check
						document.getElementById("message-panel").className = "check"
						document.getElementById("message-heading").innerText = "check"
						document.getElementById("message-body").innerText = opponentColor + "'s turn"
				} else if (turnStatus == "gameover") {
					// gameover
						if (game.status.winner) {
							var loserColor = (game.status.winner == 1) ? "black" : "white"
						} else {
							var loserColor = ""
						}
						
						document.getElementById("message-panel").className = "checkmate"
						document.getElementById("message-heading").innerText = (game.status.over == "resign") ? (loserColor + " resigns") : game.status.over
						document.getElementById("message-body").innerText = game.status.winner ? (game.status.winner + " wins") : ""
				} else {
					// other
						document.getElementById("message-panel").className = ""
						document.getElementById("message-heading").innerText = opponentColor + "'s turn"
						document.getElementById("message-body").innerText = ""
				}

			// game over?
				if (!game.status.over && !game.status.needToPromote) {
					game.status.turn = (game.status.turn == 1) ? 2 : 1

					// reset the pawns' "movedTwoSquares" attribute in order to keep track of en passant captures
						for (key in game["player" + game.status.turn]){
							var piece = game["player" + game.status.turn][key]

							if(piece.type.slice(0, piece.type.length - 1) == "pawn"){
								piece.movedTwoSquares = false
							}
						}

					// change border color
						var playerColor = (game.status.turn == 1) ? "white" : "black"
						document.getElementById("board").dataset.turn = playerColor
				}

			// record current position
				makeShadowBoard()
				
				if (!game.status.over || justEnded) {
					game.status.history.push(JSON.stringify(shadowBoard))
					document.getElementById("turn-current").innerText = Math.ceil((game.status.history.length) / 2)
					document.getElementById("turn-count").innerText = Math.ceil((game.status.history.length) / 2)
				}
				else {
					document.getElementById("turn-current").innerText = Math.ceil((game.status.currentlyDisplayedMove + 1) / 2)
					document.getElementById("turn-count").innerText = Math.ceil((game.status.history.length) / 2)
				}

		}

	/* makeShadowBoard */
		function makeShadowBoard(){
			shadowBoard = {}

			// check player 1
				for (piece in game.player1) {
					if (game.player1[piece].alive) {
						var thisPiece = game.player1[piece]

						shadowBoard[thisPiece.x + ", " + thisPiece.y] = JSON.parse(JSON.stringify(thisPiece))			// shadowBoard["7,6"] = { ... }
					}
				}

			// check player 2
				for (piece in game.player2) {
					if (game.player2[piece].alive) {
						var thisPiece = game.player2[piece]

						shadowBoard[thisPiece.x + ", " + thisPiece.y] = JSON.parse(JSON.stringify(thisPiece))
					}
				}
		}		

	/* drawPieces */
		function drawPieces() {
			//remove pieces
				document.querySelectorAll(".piece").forEach(function(piece){
					piece.remove()
				})

			// player 1 (build the pieces, add the unicode symbol)
				for (piece in game.player1) {
					if (game.player1[piece].alive) {
						var thisPiece = game.player1[piece]
						var cell = document.querySelector("[data-x='" + thisPiece.x + "'][data-y='" + thisPiece.y + "']") // select square by piece x and y
						cell.innerHTML = "<span class='piece' data-player='1' data-name='" + piece + "'>" + thisPiece.symbol + "</span>"
					}
				}

			// player 2 (same)
				for (piece in game.player2) {
					if (game.player2[piece].alive) {
						var thisPiece = game.player2[piece]
						var cell = document.querySelector("[data-x='" + thisPiece.x + "'][data-y='" + thisPiece.y + "']") // select square by piece x and y
						cell.innerHTML = "<span class='piece' data-player='2' data-name='" + piece + "'>" + thisPiece.symbol + "</span>"
					}
				}
		}

/*** USER INTERACTION ***/
	/* selectSquare */
		function selectSquare(event) {
			// make sure it's a square
				if (event.target.className.includes("square")  && !game.status.needToPromote && !game.status.over) {
					// get the (x, y) of the square selected
						var thisSquareX = event.target.dataset.x
						var thisSquareY = event.target.dataset.y

					if(lastSelectedPiece){
						// if you have a piece selected

						if(lastSelectedPiece.parentNode.dataset.x == thisSquareX && lastSelectedPiece.parentNode.dataset.y == thisSquareY){
							// unselect piece
								unhighlightSquares()
								lastSelectedPiece = null
								event.target.className = "square"
						} else if(event.target.firstChild && event.target.firstChild.dataset.player == game.status.turn) {
							// if the square you clicked on has a piece on it AND it's your piece, select that piece instead
								lastSelectedPiece.parentNode.className = "square"
								lastSelectedPiece = null
								selectPiece(event.target.firstChild)
						} else {
							// move piece
								movePieceToSquare(event)
						}
					} else {
						// if you don't have a piece selected...
							if(event.target.firstChild){							// if this square HAS a child node - which would be a piece		
								selectPiece(event.target.firstChild)				// get the piece DOM element and select the piece 
							}
					}
				}
		}

	/* selectPiece */
		function selectPiece(boardPiece){
			// check whose turn it is
				if (game.status.turn == boardPiece.dataset.player && !game.status.over){
					
					// set global
						lastSelectedPiece = boardPiece

					// unhighlights other squares
						unhighlightSquares()

					// highlight this square
						boardPiece.parentNode.className += " selected"

					// get piece object and get possible moves			
						var piece = game["player" + boardPiece.dataset.player][boardPiece.dataset.name]
						game.status.possibleMoves = getPossibleMoves(piece)

						for(var i = 0; i < game.status.possibleMoves.length; i++){
							highlightSquare(game.status.possibleMoves[i])
						}
				}
		}

	/* movePieceToSquare */
		function movePieceToSquare(event){
			if(!game.status.over && !game.status.needToPromote){
				var destination = event.target			// target.dataset.x && y

				// if the piece belongs to the player whose turn it is
					if (game.status.turn == lastSelectedPiece.dataset.player){

						// loop through the possible moves
							game.status.possibleMoves.forEach(function(possibleMove){

								// if the possible move square (x, y) MATCHES the selected square (x, y)
								// if the square we clicked on is one of the possible moves
									if(possibleMove[0] == destination.dataset.x && possibleMove[1] == destination.dataset.y){
										/*

										Ensure that we're not moving into check:
										
											1. make NEW shadow board (copy current shadow board) 
											2. execute move on shadow board
											3. run inCheck? on shadow board
											4. if (#3) NOT in check, move piece
										*/


										/*
											1. save a copy of the current shadow board before making changes to it
											2. check if the current player is STILL in check with the move we just made on the shadow board
										*/

										var tempShadowBoard = JSON.parse(JSON.stringify(shadowBoard))
										

										// make a copy of the currently selected piece
											var currentPiece = JSON.parse(JSON.stringify(game["player" + lastSelectedPiece.dataset.player][lastSelectedPiece.dataset.name]))
										
										// place the copy of the piece we made at the new coordinate
											shadowBoard[destination.dataset.x + ", " + destination.dataset.y]  = currentPiece

										// remove the piece at the current coordinate on the shadow board
											delete shadowBoard[currentPiece.x + ", " + currentPiece.y]			// remove that key

											currentPiece.x = Number(destination.dataset.x)
											currentPiece.y = Number(destination.dataset.y)

										if(!inCheck(game.status.turn)){
											// switch the shadow board to current state
												shadowBoard = tempShadowBoard
										
											// capture
												if (possibleMove[2]) {				
													possibleMove[2].alive = false
												}

											// set the new x and y
												var thisPiece = game["player" + lastSelectedPiece.dataset.player][lastSelectedPiece.dataset.name]
												
												var row = game.status.turn == 1 ? 1 : 8

											// if a pawn has moved two squares, note this for en passant captures

											if(thisPiece.type.slice(0,4) == "pawn" && Math.abs(thisPiece.y - Number(destination.dataset.y)) == 2){
												thisPiece.movedTwoSquares = true
											}

											// if the king is attempting to castle, move the rook
												// check if this king is attempting to castle (moving from starting square to castle square)
												
												// short castle
													if (thisPiece.type == "king1" && thisPiece.x == 5 && thisPiece.y == row && Number(destination.dataset.x) == 3 && Number(destination.dataset.y) == row){
														// then ALSO move the rook 
														game["player" + game.status.turn].rook1.x = 4
														game["player" + game.status.turn].rook1.y = row
													}

													//long castle
													if(thisPiece.type == "king1" && thisPiece.x == 5 && thisPiece.y == row && Number(destination.dataset.x) == 7 && Number(destination.dataset.y) == row){
														// then ALSO move the rook 
														game["player" + game.status.turn].rook2.x = 6
														game["player" + game.status.turn].rook2.y = row
													}

													thisPiece.x =  Number(destination.dataset.x)
													thisPiece.y =  Number(destination.dataset.y)

												// king or rook? note that it moved (for castling)
													if (thisPiece.type == "king1" || thisPiece.type == "rook1" || thisPiece.type == "rook2") {
														thisPiece.hasMoved = true
													}

											// if it's a pawn reaching the opponent's home row, displaying promote buttons
												if (thisPiece.type.slice(0,4) == "pawn" && thisPiece.y == (game.status.turn == 1 ? 8 : 1)) {
													game.status.needToPromote = thisPiece
													drawPieces()
													drawGraveyard()
													unhighlightSquares()


													event.target.className += " selected"


													// display promotion form

													displayPromotionPanel(game.status.turn)
												} else {
													// redraw the board and update the turn
														makeShadowBoard()
														switchTurn()
														drawPieces()
														drawGraveyard()

													// unselect the piece from last move
														if (document.querySelector(".last-moved")) {
															document.querySelector(".last-moved").className = "square"
														}
														
													// highlight the piece from this move
														var pieceJustMoved = document.querySelector("[data-player='" + lastSelectedPiece.dataset.player + "'][data-name='" + lastSelectedPiece.dataset.name + "']") || null
														pieceJustMoved.parentNode.className += " last-moved"

													// set selection to null
														lastSelectedPiece = null

												}
										} else {
											// set the shadow board to current state
											shadowBoard = tempShadowBoard
											
										}										
									} 
							})
					}
			}
		}

	/* promotePawn */
		function promotePawn(event) {
			/*
				1. check that needToPromote is true
				2. remove pawn from game object
				3. add new piece to game object based on the button clicked
				4. set needToPromote to false
			*/
				var pawnToBePromoted = game.status.needToPromote
				if (pawnToBePromoted && Number(event.target.dataset.player) == pawnToBePromoted.player) {
					// actually remove the reference to the pawn from the game object
					delete game["player" + pawnToBePromoted.player][pawnToBePromoted.type]

					// figure out how many pieces of that type exist (either alive or dead)

					var pieceCount = 1

					// cycle through the game object, look at each piece's type, and increment pieceCount by 1 for each piece
					// this ensures that the piece naming ("queen" + number) works
					for (key in game["player" + pawnToBePromoted.player]) {
						var thisPiece = game["player" + pawnToBePromoted.player][key]
						if(thisPiece.type.slice(0, thisPiece.type.length -1) == event.target.dataset.name){
							pieceCount++
						}
					}

					var pieceSymbol

					switch (event.target.dataset.name){
						case "queen":
							pieceSymbol = "&#9819"
							break
						case "rook":
							pieceSymbol = "&#9820"
							break
						case "bishop":
							pieceSymbol = "&#9821"
							break
						case "knight":
							pieceSymbol = "&#9822"
							break
					}

					game["player" + pawnToBePromoted.player][event.target.dataset.name + pieceCount] = {
						type: event.target.dataset.name + pieceCount,
						symbol: pieceSymbol,
						x: pawnToBePromoted.x,
						y: pawnToBePromoted.y,
						player: pawnToBePromoted.player,
						alive: true,
						hasMoved: true
					}
				
					game.status.needToPromote = false
					displayPromotionPanel(false)

					// regular turn switch stuff
						// unselect the piece
							lastSelectedPiece = null

						// redraw the board and update the turn
							makeShadowBoard()
							switchTurn()
							drawPieces()
							drawGraveyard()
				}
		}

	/* undoMove */
		function undoMove() {
			if (!game.status.over && game.status.history.length > 1) {
				// status
					var turnCount = game.status.history.length - 1;
					var previousTurn = JSON.parse(game.status.history[turnCount - 1])

				// assume everyone's dead
					for (var piece in game.player1) {
						game.player1[piece].alive = false
					}

					for (var piece in game.player2) {
						game.player2[piece].alive = false
					}

				// loop through history shadowboard and set pieces in game file
					for (var square in previousTurn) {
						var player = previousTurn[square].player
						var type = previousTurn[square].type

						game["player" + player][type] = JSON.parse(JSON.stringify(previousTurn[square]))
					}

				// remove latest history
					game.status.history.pop()
					game.status.history.pop()

				// switch turn
					switchTurn()
					drawPieces()
					drawGraveyard()
					var lastMoved = document.querySelector(".last-moved")
						lastMoved.className = lastMoved.className.replace("last-moved", "")
			}
		}

	/* resignGame */
		function resignGame() {
			if (!game.status.over) {
				var loserColor  = (game.status.turn == 1 ? "white" : "black")
				var winnerColor = (game.status.turn == 1 ? "black" : "white")

				document.getElementById("message-panel").className = "checkmate"
				document.getElementById("message-heading").innerText = loserColor + " resigns"
				document.getElementById("message-body").innerText = winnerColor + " wins"
				
				game.status.over = "resign"
				game.status.winner = winnerColor
				document.body.className = "gameover"
				game.status.currentlyDisplayedMove = game.status.history.length
			}
		}

	/* previous move*/
		function showPreviousMove() {
			if (game.status.over && game.status.currentlyDisplayedMove > 0) {
			
				// status
					game.status.currentlyDisplayedMove--
					var previousTurn = JSON.parse(game.status.history[game.status.currentlyDisplayedMove])

				// assume everyone's dead
					for (var piece in game.player1) {
						game.player1[piece].alive = false
					}

					for (var piece in game.player2) {
						game.player2[piece].alive = false
					}

				// loop through history shadowboard and set pieces in game file
					for (var square in previousTurn) {
						var player = previousTurn[square].player
						var type = previousTurn[square].type

						game["player" + player][type] = JSON.parse(JSON.stringify(previousTurn[square]))
					}

				// switch turn
					switchTurn()
					drawPieces()
					drawGraveyard()

				// remove the last moved selector
					var lastMoved = document.querySelector(".last-moved")
					if (lastMoved) {
						lastMoved.className = lastMoved.className.replace("last-moved", "")
					}
			}
		}

		function showNextMove() {
			if (game.status.over && game.status.currentlyDisplayedMove < (game.status.history.length - 1)) {
			
				// status
					game.status.currentlyDisplayedMove++
					var nextTurn = JSON.parse(game.status.history[game.status.currentlyDisplayedMove])

				// assume everyone's dead
					for (var piece in game.player1) {
						game.player1[piece].alive = false
					}

					for (var piece in game.player2) {
						game.player2[piece].alive = false
					}

				// loop through history shadowboard and set pieces in game file
					for (var square in nextTurn) {
						var player = nextTurn[square].player
						var type = nextTurn[square].type

						game["player" + player][type] = JSON.parse(JSON.stringify(nextTurn[square]))
					}

				// switch turn
					switchTurn()
					drawPieces()
					drawGraveyard()

				// remove the last moved selector
					var lastMoved = document.querySelector(".last-moved")
					if (lastMoved) {
						lastMoved.className = lastMoved.className.replace("last-moved", "")
					}
			}
		}


/*** VISUALS ***/
	/* highlightSquare */
		function highlightSquare(coord){

			document.querySelector("[data-x='" + coord[0] + "'][data-y='" + coord[1] + "']").className += " legalMove"
		}

	/* unhighlightSquares */
		function unhighlightSquares(){
			document.querySelectorAll(".square").forEach(function(square){
				square.className = square.className.replace("selected", "").replace("legalMove", "")
			})
		}

	/* drawGraveyard */
		function drawGraveyard() {
			// clear out graveyards
				document.getElementById("graveyard-player1").innerHTML = ""
				document.getElementById("graveyard-player2").innerHTML = ""

			// loop through game file
				for (var p in game.player1) {
					var piece = game.player1[p]
					if (!piece.alive) {
						document.getElementById("graveyard-player1").innerHTML += ("<span>" + piece.symbol + "</span>")	
					}
				}

				for (var p in game.player2) {
					var piece = game.player2[p]
					if (!piece.alive) {
						document.getElementById("graveyard-player2").innerHTML += ("<span>" + piece.symbol + "</span>")	
					}
				}
		}

	/* displayPromotionPanel */
		function displayPromotionPanel(player) {
			document.getElementById("promotion-panel-1").style.display = "none"
			document.getElementById("promotion-panel-2").style.display = "none"

			if (player) {
				document.getElementById("promotion-panel-" + player).style.display = "flex"
				document.getElementById("message-panel").style.display = "none"
			}
			else {
				document.getElementById("message-panel").style.display = "flex"
			}
		}
	
/*** GETTING MOVES ***/
	/* getPossibleMoves  */
		function getPossibleMoves(piece) {
			piece.x = Number(piece.x)
			piece.y = Number(piece.y)
			var turn = piece.player

			// get the moves based on the type of piece
				switch (piece.type.substring(0, piece.type.length - 1)) {
					case "pawn":
						return getPawnMoves(piece.x, piece.y, turn)
						break
					case "knight":
						return getKnightMoves(piece.x, piece.y, turn)
						break
					case "bishop":
						return getBishopMoves(piece.x, piece.y, turn)
						break
					case "rook":
						return getRookMoves(piece.x, piece.y, turn)
						break
					case "queen":
						return getQueenMoves(piece.x, piece.y, turn)
						break
					case "king":
						return getKingMoves(piece.x, piece.y, turn)
						break
				}
		}

	/* getRookMoves */
		function getRookMoves(x1, y1, turn) {
			var validMoves = []

			// up
				var x2 = x1
				var y2 = y1
				var occupant = false

				while (y2 < 8 && !occupant){
					y2++
					occupant = getOccupant(x2, y2)

					//if the square is not occupied OR the square is occupied by an opponent's piece, then this is a valid move
					if(!occupant || turn != occupant.player){			
						validMoves.push([x2, y2, occupant, x1, y1])			// x1, y1 is the current piece location
					} 
				}

			// down
				x2 = x1
				y2 = y1
				occupant = false

				while (y2 > 1 && !occupant){
					y2--
					occupant = getOccupant(x2, y2)

					//if the square is not occupied OR the square is occupied by an opponent's piece, then this is a valid move
					if(!occupant || turn != occupant.player){			
						validMoves.push([x2, y2, occupant, x1, y1])			// x1, y1 is the current piece location
					} 
				}

			// right
				x2 = x1
				y2 = y1
				occupant = false

				while (x2 < 8 && !occupant){
					x2++
					occupant = getOccupant(x2, y2)

					//if the square is not occupied OR the square is occupied by an opponent's piece, then this is a valid move
					if(!occupant || turn != occupant.player){			
						validMoves.push([x2, y2, occupant, x1, y1])			// x1, y1 is the current piece location
					} 
				}

			// left
				x2 = x1
				y2 = y1
				occupant = false

				while (x2 > 1 && !occupant){
					x2--
					occupant = getOccupant(x2, y2)

					//if the square is not occupied OR the square is occupied by an opponent's piece, then this is a valid move
					if(!occupant || turn != occupant.player){			
						validMoves.push([x2, y2, occupant, x1, y1])			// x1, y1 is the current piece location
					} 
				}

			return validMoves
		}

	/* getBishopMoves */
		function getBishopMoves(x1, y1, turn) {
			var validMoves = []

			// up-left
				var x2 = x1
				var y2 = y1
				var occupant = false

				while (y2 < 8 && x2 > 1 && !occupant){
					y2++
					x2--
					occupant = getOccupant(x2, y2)

					//if the square is not occupied OR the square is occupied by an opponent's piece, then this is a valid move
					if(!occupant || turn != occupant.player){			
						validMoves.push([x2, y2, occupant, x1, y1])			// x1, y1 is the current piece location
					} 
				}

			// down-left
				x2 = x1
				y2 = y1
				occupant = false

				while (y2 > 1 && x2 > 1 && !occupant){
					y2--
					x2--
					occupant = getOccupant(x2, y2)

					//if the square is not occupied OR the square is occupied by an opponent's piece, then this is a valid move
					if(!occupant || turn != occupant.player){			
						validMoves.push([x2, y2, occupant, x1, y1])			// x1, y1 is the current piece location
					} 
				}

			// up-right
				x2 = x1
				y2 = y1
				occupant = false

				while (y2 < 8 && x2 < 8 && !occupant){
					y2++
					x2++
					occupant = getOccupant(x2, y2)

					//if the square is not occupied OR the square is occupied by an opponent's piece, then this is a valid move
					if(!occupant || turn != occupant.player){			
						validMoves.push([x2, y2, occupant, x1, y1])			// x1, y1 is the current piece location
					} 
				}

			// down-right
				x2 = x1
				y2 = y1
				occupant = false

				while (y2 > 1 && x2 < 8 && !occupant){
					x2++
					y2--
					occupant = getOccupant(x2, y2)

					//if the square is not occupied OR the square is occupied by an opponent's piece, then this is a valid move
					if(!occupant || turn != occupant.player){			
						validMoves.push([x2, y2, occupant, x1, y1])			// x1, y1 is the current piece location
					} 
				}


			return validMoves
		}

	/* getKingMoves */
		function getKingMoves(x1, y1, turn) {
			var validMoves = []

			for (var x2 = (x1-1); x2 <= (x1+1); x2++) {
				for (var y2 = (y1-1); y2 <= (y1+1); y2++) {
					// if (1) this isn't the square the king is on (2) & (3) we're still on the board
					if (!(x2 == x1 && y2 == y1) && (x2 <= 8 && x2 >= 1) && (y2 <= 8 && y2 >= 1) ) {
						var occupant = getOccupant(x2, y2)
						if(!occupant || turn != occupant.player){			
							validMoves.push([x2, y2, occupant, x1, y1])
						}
					}
				}
			}

			// add castling moves (or [])

				if(game.status.turn == turn){
					validMoves = validMoves.concat(getCastlingMoves(turn))
				}
				

			return validMoves
		}

	/* getQueenMoves */
		function getQueenMoves(x1, y1, turn) {
			var rookMoves = getRookMoves(x1, y1, turn)
			var bishopMoves = getBishopMoves(x1, y1, turn)

			return rookMoves.concat(bishopMoves)
		}

	/* getPawnMoves */
		function getPawnMoves(x1, y1, turn) {
			var validMoves = []
			var opponent = turn == 1 ? 2 : 1

			if(turn == 1){

				// check if the pawns next to this pawn have just moved en passant
				if(y1 == 5){
					var pieceToTheRight = getOccupant(x1 + 1, y1)

					// read the function
					if(pieceToTheRight && pieceToTheRight.type.slice(0, pieceToTheRight.type.length - 1) == "pawn" && pieceToTheRight.player == opponent && pieceToTheRight.movedTwoSquares){
						validMoves.push([x1+1, y1+1, pieceToTheRight, x1, y1])
					}
				}

				if(y1 == 5){
					var pieceToTheLeft = getOccupant(x1 - 1, y1)

					// read the function
					if(pieceToTheLeft && pieceToTheLeft.type.slice(0, pieceToTheLeft.type.length - 1) == "pawn" && pieceToTheLeft.player == opponent && pieceToTheLeft.movedTwoSquares){
						validMoves.push([x1-1, y1+1, pieceToTheLeft, x1, y1])
					}
				}

				// move 1
				if(y1 + 1 <= 8){
					var occupant = getOccupant(x1, y1 + 1)
					if(!occupant){			
						validMoves.push([x1, y1 + 1, occupant, x1, y1])
					}
				}

				// capture
				if(y1 + 1 <= 8 && x1 + 1 <= 8){
					var occupant = getOccupant(x1 + 1, y1 + 1)
					if(occupant && turn != occupant.player){			
						validMoves.push([x1 + 1, y1 + 1, occupant, x1, y1])
					}
				}

				// capture
				if(y1 + 1 <= 8 && x1 - 1 >= 1){
					var occupant = getOccupant(x1 - 1, y1 + 1)
					if(occupant && turn != occupant.player){			
						validMoves.push([x1 - 1, y1 + 1, occupant, x1, y1])
					}
				}

				// if we're on row 2, then we don't need to check if (2+2)  < 8
				if(y1 == 2 && !shadowBoard[x1 + ", 3"]){
					var occupant = getOccupant(x1, y1 + 2)
					if(!occupant){			
						validMoves.push([x1, y1 + 2, occupant, x1, y1])
					}
				
				}
			}

			if(turn == 2){

				// check if the pawns next to this pawn have just moved en passant
				if(y1 == 4){
					var pieceToTheRight = getOccupant(x1 + 1, y1)

					// read the function
					if(pieceToTheRight && pieceToTheRight.type.slice(0, pieceToTheRight.type.length - 1) == "pawn" && pieceToTheRight.player == opponent && pieceToTheRight.movedTwoSquares){
						validMoves.push([x1+1, y1-1, pieceToTheRight, x1, y1])
					}
				}

				if(y1 == 5){
					var pieceToTheLeft = getOccupant(x1 - 1, y1	)

					// read the function
					if(pieceToTheLeft && pieceToTheLeft.type.slice(0, pieceToTheLeft.type.length - 1) == "pawn" && pieceToTheLeft.player == opponent && pieceToTheLeft.movedTwoSquares){
						validMoves.push([x1-1, y1-1, pieceToTheLeft, x1, y1])
					}
				}


				// move 1
				if(y1 - 1 >= 1){
					var occupant = getOccupant(x1, y1 - 1)
					if(!occupant){			
						validMoves.push([x1, y1 - 1, occupant, x1, y1])
					}
				}

				// capture
				if(y1 - 1 >= 1 && x1 + 1 <= 8){
					var occupant = getOccupant(x1 + 1, y1 - 1)
					if(occupant && turn != occupant.player){			
						validMoves.push([x1 + 1, y1 - 1, occupant, x1, y1])
					}
				}

				// capture
				if(y1 - 1 >= 1 && x1 - 1 >= 1){
					var occupant = getOccupant(x1 - 1, y1 - 1)
					if(occupant && turn != occupant.player){			
						validMoves.push([x1 - 1, y1 - 1, occupant, x1, y1])
					}
				}

				// if we're on row 7, then we don't need to check if (7 - 2) > 1
				if(y1 == 7 && !shadowBoard[x1 + ", 6"]){	
					var occupant = getOccupant(x1, y1 - 2)
					if(!occupant){			
						validMoves.push([x1, y1 - 2, occupant, x1, y1])
					}
				
				}
			}

			return validMoves
		}

	/* getKnightMoves */
		function getKnightMoves(x1, y1, turn) {
			var validMoves = []
			
			if(x1 - 1 >= 1 && y1 + 2 <= 8){
				var occupant = getOccupant(x1 - 1, y1 + 2)
				if(!occupant || turn != occupant.player){			
					validMoves.push([x1 - 1, y1 + 2, occupant, x1, y1])
				}
			}

			if(x1 + 1 <= 8 && y1 + 2 <= 8){
				var occupant = getOccupant(x1 + 1, y1 + 2)
				if(!occupant || turn != occupant.player){			
					validMoves.push([x1 + 1, y1 + 2, occupant, x1, y1])
				}
			}

			if(x1 + 2 <= 8 && y1 + 1 <= 8){
				var occupant = getOccupant(x1 + 2, y1 + 1)
				if(!occupant || turn != occupant.player){			
					validMoves.push([x1 + 2, y1 + 1, occupant, x1, y1])
				}
			}

			if(x1 + 2 <= 8 && y1 - 1 >= 1){
				var occupant = getOccupant(x1 + 2, y1 - 1)
				if(!occupant || turn != occupant.player){			
					validMoves.push([x1 + 2, y1 - 1, occupant, x1, y1])
				}
			}

			if(x1 + 1 <= 8 && y1 - 2 >= 1){
				var occupant = getOccupant(x1 + 1, y1 - 2)
				if(!occupant || turn != occupant.player){			
					validMoves.push([x1 + 1, y1 - 2, occupant, x1, y1])
				}
			}

			if(x1 - 1 >= 1 && y1 - 2 >= 1){
				var occupant = getOccupant(x1 - 1, y1 - 2)
				if(!occupant || turn != occupant.player){			
					validMoves.push([x1 - 1, y1 - 2, occupant, x1, y1])
				}
			}

			if(x1 - 2 >= 1 && y1 - 1 >= 1){
				var occupant = getOccupant(x1 - 2, y1 - 1)
				if(!occupant || turn != occupant.player){			
					validMoves.push([x1 - 2, y1 - 1, occupant, x1, y1])
				}
			}

			if(x1 - 2 >= 1 && y1 + 1 <= 8){
				var occupant = getOccupant(x1 - 2, y1 + 1)
				if(!occupant || turn != occupant.player){			
					validMoves.push([x1 - 2, y1 + 1, occupant, x1, y1])
				}
			}

			return validMoves
		}

	/* getCastlingMoves */
		function getCastlingMoves(turn) {

			var row = turn == 1 ? 1 : 8
			var opponent = turn == 1 ? 2 : 1

			var castlingMoves = []

			// already moved the king?
				if (!game["player" + turn].king1.hasMoved) {
					var opponentMoves = allPossibleMoves(opponent)
					
					// rook1 (long castle)
						if (!game["player" + turn].rook1.hasMoved) {

							// row is determined by whose turn it is 
							// if the spaces between the rook and king are empty
							if (!(shadowBoard["2, " + row]) && !(shadowBoard["3, " + row]) && !(shadowBoard["4, " + row])){
								var ableToCastle = true

								opponentMoves.forEach(function(move){
									// move is an array, so we access destination x & y with indeces
									if(move[0] <= 5 && move[1] == row){
										ableToCastle = false
										return   // or break?
									}
								})

								if(ableToCastle){
									castlingMoves.push([3, row, false, 5, row])
								}	

							}
						}

					// rook2 (short castle)
						if (!game["player" + turn].rook2.hasMoved) {

							// row is determined by whose turn it is 
							// if the spaces between the rook and king are empty
							if (!(shadowBoard["6, " + row]) && !(shadowBoard["7, " + row])){
								var ableToCastle = true

								opponentMoves.forEach(function(move){
									// move is an array, so we access destination x & y with indeces
									if(move[0] >= 5 && move[1] == row){
										ableToCastle = false
										return   // or break?
									}
								})

								if(ableToCastle){
									castlingMoves.push([7, row, false, 5, row])
								}	

							}
						}
				}

			return castlingMoves
		}

	/* getOccupant */
		function getOccupant(x, y) {
			if( (x >= 1 && x <= 8) && (y >= 1 && y <= 8) && typeof(shadowBoard[x + ", " + y]) != "undefined"){		// if there's a piece at this square...	
				var shadowPiece = shadowBoard[x + ", " + y] || null
				return game["player" + shadowPiece.player][shadowPiece.type]
			} else {
				return false
			}
		}

	/* allPossibleMoves */
		function allPossibleMoves(player){
			/*
				1. get all pieces for player
				2. create "all moves" array
				3. loop through every piece and run getPossibleMoves for that piece
				4. add those moves to "all moves" array
				5. from those moves, get all the possible captures
			*/


			// for each of a player's pieces
			var allMoves = []

				for(piece in shadowBoard){
					if(shadowBoard[piece].player == player){			// if this piece belongs to the player whose moves we're getting
						allMoves = allMoves.concat(getPossibleMoves(shadowBoard[piece]))
					}			
				}

			return allMoves
		}

	/* allPossibleCaptures */
		function allPossibleCaptures(moves){
			// 0,1 is x,y - 2 is the piece
				var allCaptures = moves.filter(function(move){
					return move[2]
				})

			// return the pieces, not the moves
				allCaptures = allCaptures.map(function(move){
					return move[2]
				})

			return allCaptures
		}

/*** CHECK / CHECKMATE / Draw ***/
	/* inCheckOrCheckmate */	
		function inCheckOrCheckmateOrDraw(player){
			/*
				1. player in check?
					a. if no, switch turns
					b. if yes, check for checkmate
						i. if checkmate, end game
						ii. if no checkmate, note the check in some sort of global var
			*/

			if(inCheck(player)){
				if(inCheckmate(player)){
					return "checkmate"
				} else {
					return "check"
				}
			} else if (isDraw()) {
				return "draw"
			} else {
				return false
			}
		}

	/* inCheck */
		function inCheck(player){			// check if the a player is in check
			var opponent = player == 1 ? 2 : 1
			var isInCheck = false

			var allMoves = allPossibleMoves(opponent)
			var allCaptures = allPossibleCaptures(allMoves)

			// loop through captures to see if one of them is a king

			for(capture in allCaptures){
				if (allCaptures[capture].type == "king1"){
					isInCheck = true
				}
			}

			return isInCheck
		}

	/* inCheckmate */
		function inCheckmate(player){
			var isCheckmate = true

			/*
				1. get all of the opponent's possible moves
				2. build a shadow board for every single move the opponent can make
				3. for every shadow board built this way, run all possible player moves and if a signle one gets you out of checkmate, it's uh ... not checkmate
					a. so... stop

			*/
			var opponent = player == 1 ? 2 : 1
			var allMoves = allPossibleMoves(player)

			for(move in allMoves){
				var thisMove = allMoves[move]
				
				// reset shadowBoard
				makeShadowBoard()

				// execute move
				var currentPiece = JSON.parse(JSON.stringify(shadowBoard[thisMove[3] + ", " + thisMove[4]]))
				
				// place the copy of the piece we made at the new coordinate
				shadowBoard[thisMove[0] + ", " + thisMove[1]]  = currentPiece

				// remove the piece at the current coordinate on the shadow board
				delete shadowBoard[thisMove[3] + ", " + thisMove[4]]			// remove that key
				
				if(!inCheck(player)){ 
					isCheckmate = false
					break
				}			
			}

			return isCheckmate
		}

	/* isDraw */
		function isDraw() {
			// 3 repeat moves 
				if (game.status.history.length > 8) {
					var history = game.status.history
					if (JSON.stringify(shadowBoard) == history[history.length - 4] && history[history.length - 4] == history[history.length - 8]) {
						return true
					}
				}

			// piece combinations
				if (Object.keys(shadowBoard).length <= 4) { // if there are more than 4 pieces on the board, no draw combinations are possible
					// separate pieces by player
						var white = []
						var black = []
						for (piece in shadowBoard) {
							if (shadowBoard[piece].player == 1) {
								white.push(shadowBoard[piece].type.slice(0, shadowBoard[piece].type.length - 1)) // grab name of piece without number
							} else {
								black.push(shadowBoard[piece].type.slice(0, shadowBoard[piece].type.length - 1)) // grab name of piece without number
							}
						}

					// king          | king
						if (white.length == 1 && black.length == 1) { // only kings left - if you only have 1 piece left, it must be a king
							return true
						}

					// king          | king, bishop
						else if ((white.length == 1 && black.length == 2 && black.indexOf("bishop") != -1) ||
								 (black.length == 1 && white.length == 2 && white.indexOf("bishop") != -1)) { // if you have 2 pieces left, 1 of them must be a king
							return true
						}


					// king, bishop  | king, bishop
						else if ((white.length == 2 && white.indexOf("bishop") != -1 && black.length == 2 && black.indexOf("bishop") != -1)) {
							return true
						}

					// king          | king, knight
						else if ((white.length == 1 && black.length == 2 && black.indexOf("knight") != -1) ||
								 (black.length == 1 && white.length == 2 && white.indexOf("knight") != -1)) {
							return true
						}

					// king, knight  | king, knight
						else if ((white.length == 2 && white.indexOf("knight") != -1 && black.length == 2 && black.indexOf("knight") != -1)) {
							return true
						}
				}

			// no legal moves
				var opponent = (game.status.turn == 1) ? 2 : 1
				if (!allPossibleMoves(opponent).length) {
					return true
				}

			// no draw
				return false
		}
