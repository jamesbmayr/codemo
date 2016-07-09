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

	/* shuffle function */
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

	/* pick random side of each cube */
		for (var i = 0; i < cubes.length; i++) {
			shuffle(cubes[i]);
			puzzleCubes[i] = cubes[i][0];
		}

	/* shuffle cubes */
		puzzleCubes = shuffle(puzzleCubes);

		for (var j = 0; j < cubes.length; j++) {
			$("#box").append("<div class='frame'><div class='cube'><div class='letter'>" + puzzleCubes[j] + "</div></div></div>");
		}

	/* click listener */
		$(".cube").click(function(){
			console.log(1);
			$(this).toggleClass("selected");
		});

});