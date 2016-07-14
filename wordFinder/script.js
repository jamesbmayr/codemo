$(document).ready(function() {
	
	/* cubes */
		var cubes = [
			["o","o","o","t","t","u"],
			["h","r","n","l","o","d"],
			["c","c","t","e","s","n"],
			["e","i","t","c","s","p"],
			["e","e","a","e","e","m"],
			["v","r","o","g","r","w"],
			["s","a","y","r","i","f"],
			["m","a","n","e","n","g"],
			["f","a","s","a","a","r"],
			["p","i","t","c","e","l"],
			["r","r","p","i","y","r"],
			["s","a","f","a","i","r"],
			["qu","b","k","j","x","z"],
			["t","i","i","c","e","l"],
			["h","n","d","d","o","t"],
			["e","e","a","e","e","a"],
			["r","o","n","l","d","h"],
			["f","p","s","r","i","y"],
			["e","i","t","i","i","t"],
			["l","o","h","d","r","h"],
			["a","g","e","e","u","m"],
			["n","n","d","n","e","a"],
			["n","u","s","e","s","s"],
			["w","o","u","t","o","n"],
			["t","t","m","o","e","t"],
		];

		var puzzleCubes = [];

	/* functions */
		function shuffle(inputArray) {
			var outputArray = [];

			for (var i = 0; i < inputArray.length; i++) {
				var j = -1;
				
				while ((j === -1) || (typeof(outputArray[j]) !== "undefined")) {
					j = Math.floor(Math.random() * inputArray.length);
				}
			
				outputArray[j] = inputArray[i];
			}

			return outputArray;
		}

		function newGame() {
			/* reset */
				$(".clock").text("3:00");
				$("#game").empty().addClass("active");
				$("#connectors").empty();
				$("#myWords").empty().css("height","100%");
				$("#score").empty().css("height","0%");

				$("#submitWord").addClass("active");
				$("#cancelWord").addClass("active");
				$("#endGame").addClass("active");
				$("#pauseGame").addClass("active");
				$("#newGame").removeClass("active");
				$("#resumeGame").removeClass("active");

			/* words */
				$("#myWords").append("<div class='word'><div class='newWord'></div></div>");
				window.selectedCubes = [];

			/* pick random side of each cube */
				for (var i = 0; i < cubes.length; i++) {
					cubes[i] = shuffle(cubes[i]);
					puzzleCubes[i] = cubes[i][0];
				}

			/* shuffle cubes */
				puzzleCubes = shuffle(puzzleCubes);

			/* display cubes */
				var j = 50;
				for (var i = 0; i < puzzleCubes.length; i++) {
					$("#game").append("<div class='frame'><div id='" + j + "' class='cube'><div class='letter'>" + puzzleCubes[i] + "</div></div></div>");

					j++;
					while (j % 10 > 4) {
						j++;
					}
				}

			/* build connectors */
				for (var i = 100; i < 189; i++) {
					if (i % 10 !== 9) {
						$("#connectors").append("<div class='connector_frame'><div id='" + i + "' class='connector hidden'></div></div>");
					}
				}

			/* start timer */
				resumeGame();
		}

		function resumeGame() {
			/* buttons & overlay */
				$("#overlay").addClass("hidden");

				$("#newGame").addClass("hidden").removeClass("active");
				$("#resumeGame").addClass("hidden").removeClass("active");
				$("#pauseGame").removeClass("hidden").addClass("active");
				$("#submitWord").addClass("active");
				$("#cancelWord").addClass("active");
			
			/* create timer */
				window.gameTimer = setInterval(function() {
					var clock = $("#clock").text();
					clock = clock.split(":");
					var timeLeft = (Number(clock[0]) * 60) + (Number(clock[1])) - 1;

					if (timeLeft > 0) {
						timeLeft = String(Math.floor(timeLeft / 60)) + ":" + String(Math.floor((timeLeft % 60) / 10)) + String(timeLeft % 10);
						$(".clock").text(timeLeft);
					}
					else {
						$(".clock").text("0:00");
						endGame();
					}
				}, 1000);
			}

		function pauseGame() {
			$("#overlay").removeClass("hidden");

			$("#pauseGame").addClass("hidden").removeClass("active");
			$("#resumeGame").removeClass("hidden").addClass("active");
			$("#submitWord").removeClass("active");
			$("#cancelWord").removeClass("active");
			clearInterval(gameTimer);
		}

		function endGame () {
			/* kill clock */
				$(".clock").text("0:00");
				clearInterval(gameTimer);

				$(".active").removeClass("active");
				$(".deleteWord").remove();
				$(".oldWord").css("width","100%");

			/* reset buttons */
				$("#resumeGame").addClass("hidden");
				$("#pauseGame").addClass("hidden");
				$("#newGame").removeClass("hidden").addClass("active");
				$("#overlay").addClass("hidden");

			/* score words */
				var allWordDivs = $(".oldWord");
				var allWords = [];
				var score = "";
				
				for (var i = 0; i < allWordDivs.length; i++) {
					allWords[i] = allWordDivs[i].innerHTML;
					score = score + Number(allWords[i].length) - 2;
					allWordDivs[i].innerHTML = allWords[i] + " (" + (Number(allWords[i].length) - 2) + ")";
				}

			/* display score */
				$("#score").text("score: " + score).css("height","15%");
				$(".oldWord").addClass("completeWord");
				$(".newWord").remove();
				$("#myWords").css("height","85%");
		}

	/* listeners */
		/* start game */
			$(document).on("click", ".active#newGame", function() {
				newGame();
			});

		/* pause game */
			$(document).on("click", ".active#pauseGame", function() {
				pauseGame();
			});

		/* resume game */
			$(document).on("click", ".active#resumeGame", function() {
				resumeGame();
			});

		/* end game */
			$(document).on("click", ".active#endGame", function() {
				endGame();
			});

		/* click letter */
			$(document).on("click", ".active .cube" , function() {

				var oldCube = Number(selectedCubes.slice(-1)[0]);
				var newCube = Number($(this).attr("id"));
				var newLetter = String($(this).text());
				var newWord = String($(".newWord").text());

				if (! oldCube > 0) {
				//new word
					$(".newWord").text(newWord + newLetter);
					$(this).addClass("selected");
					selectedCubes.push(newCube);
				}

				else if (newCube === oldCube) {
				//undo last letter
					$(".newWord").text(newWord.substring(0, newWord.length - 1));
					$(this).removeClass("selected");
					selectedCubes.pop();
					oldCube = Number(selectedCubes.slice(-1)[0]);
					$("#" + (newCube + oldCube)).addClass("hidden");
				}

				else if ($(this).hasClass("selected")) { 
					//illegal - repeated cube
					alert("illegal move - repeated cubes");
				}

				else if ( (newCube === oldCube - 1) || (newCube === oldCube + 1) || (newCube === oldCube - 10) || (newCube === oldCube + 10) || (newCube === oldCube - 11) || (newCube === oldCube + 11) || (newCube === oldCube - 9) || (newCube === oldCube + 9) ) {
					//legal
					$(".newWord").text(newWord + newLetter);
					$(this).addClass("selected");
					$("#" + (newCube + oldCube)).removeClass("hidden");
					selectedCubes.push(newCube);
				}

				else {
					//illegal - not adjacent
					alert("illegal move - not adjacent cubes");
				}

			});

		/* submit word */
			$(document).on("click", "#submitWord.active", function() {

				var allWordDivs = $(".oldWord");
				var allWords = [];
				for (var i = 0; i < allWordDivs.length; i++) {
					allWords[i] = allWordDivs[i].innerHTML;
				}

				var newWord = String($(".newWord").text());

				if (newWord.length < 3) {
					//illegal - too short
					alert("word must be 3+ letters");
				}

				else if (allWords.indexOf(newWord) > -1) {
					//illegal - duplicate word
					alert("duplicate word");
				}

				else {
					//legal word
					var chain = "";
					for (var i = 0; i < selectedCubes.length; i++) 
					{
					chain = chain + selectedCubes[i];

					if (i < selectedCubes.length - 1) {
					chain = chain + ",";
				}

				}

				$(".newWord").parent().append("<div class='deleteWord'><span class='glyphicon glyphicon-remove'></span></div>");
				$(".newWord").removeClass("newWord").addClass("oldWord").attr("value",chain);
				$("#myWords").prepend("<div class='word'><div class='newWord'></div></div>");

				$(".selected").removeClass("selected");
				$(".connector").addClass("hidden");
				window.selectedCubes = [];

				}

			});

		/* cancel word */
			$(document).on("click", "#cancelWord.active", function () {

				$(".newWord").empty();
				$(".selected").removeClass("selected");
				$(".connector").addClass("hidden");
				window.selectedCubes = [];

			});

		/* delete word */
			$(document).on("click", ".deleteWord", function() {
				$(this).closest(".word").remove();
			});

		/* hover over complete words */
			$(document).on("mouseenter", ".completeWord", function() {
				var chain = $(this).attr("value");
				var chainArray = chain.split(",");

				for (var i = 0; i < chainArray.length; i++) {
					$("#" + chainArray[i]).addClass("selected");
					
					var j = i + 1;
					if (typeof chainArray[j] !== "undefined") {
						var k = Number(chainArray[i]) + Number(chainArray[j]);
						$("#" + k).removeClass("hidden");
					}
				}
			});

			$(document).on("mouseleave", ".completeWord", function() {
				var chain = $(this).attr("value");
				var chainArray = chain.split(",");

				for (var i = 0; i < chainArray.length; i++) {
					$("#" + chainArray[i]).removeClass("selected");

					var j = i + 1;
					if (typeof chainArray[j] !== "undefined") {
						var k = Number(chainArray[i]) + Number(chainArray[j]);
						$("#" + k).addClass("hidden");
					}
				}
			});

});