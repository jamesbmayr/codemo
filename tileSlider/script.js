$(document).ready(function() {
	
	/* load */
		createPuzzle();

	/* listeners */
		$(document).on("click",".trigger",function() {
			if (window.playing) {
				var coordinates = $(this).attr("value");
					var x = Number(coordinates.split(",")[0]);
					var y = Number(coordinates.split(",")[1]);

				var emptyCoordinates = $(".trigger.empty").attr("value");
					var emptyX = Number(emptyCoordinates.split(",")[0]);
					var emptyY = Number(emptyCoordinates.split(",")[1]);
				
				slideTile(emptyX,emptyY,x,y);
			}
		});

		$(document).on("click","#refresh",function() {
			createPuzzle();
		});

	/* createPuzzle */
		function createPuzzle() {
			/* reset */
				window.playing = false;
				window.moveCount = 0;
				$("#tiles").empty().css("opacity",1);
				$("#triggers").empty();
				$("#victoryOuter").css("opacity",0);

			/* gridSize */
				var gridSize = $("#gridSize").val();

				if (!(gridSize.length > 0)) {
					gridSize = 4;
				}

				window.gridSize = gridSize;

			/* image */
				var hash = String(location.hash).replace("#","");
				var userInput = $("#url").val();

				if (userInput.length > 0) {
					var image = userInput;
				}
				else if (hash.length > 0) {
					var image = hash;
				}
				else {
					var image = "images/" + gridSize + ".png";
				}

			/* tiles */
				var block = (100 / gridSize);

				for (y = 0; y < gridSize; y++) {
					for (x = 0; x < gridSize; x++) {
						$("#tiles").append("<div class='tile' value='" + x + "," + y + "' home='" + x + "," + y + "' style='clip-path: polygon(" + block * (x) + "% " + block * (y) + "%, " + block * (x + 1) + "% " + block * (y) + "%, " + block * (x + 1) + "% " + block * (y + 1) + "%, " + block * (x) + "% " + block * (y + 1) + "%); background-image: url(" + image + ")'></div>");
					}
				}

			/* triggers */
				for (y = 0; y < gridSize; y++) {
					for (x = 0; x < gridSize; x++) {
						$("#triggers").append("<button class='trigger' value='" + x + "," + y + "' home='" + x + "," + y + "' style='top: calc(100% / " + gridSize + " * " + y + "); left: calc(100% / " + gridSize + " * " + x + ");'></button>");
					}
				}

				$(".trigger").css("width","calc(80vh / " + gridSize + ")").css("height","calc(80vh / " + gridSize + ")");

			/* empty */
				$(".tile[value='" + (gridSize - 1) + "," + (gridSize - 1) + "']").remove();
				$(".trigger[value='" + (gridSize - 1) + "," + (gridSize - 1) + "']").addClass("empty");

			/* slide */
				var emptyX = Number(gridSize - 1);
				var emptyY = Number(gridSize - 1);

				for (i = 0; i < (gridSize * gridSize * gridSize * gridSize); i++) {			
				 	var options = [[emptyX + 1,emptyY],[emptyX - 1,emptyY],[emptyX,emptyY + 1],[emptyX,emptyY - 1]];
				 	do {
				 		var r = Math.floor(Math.random() * options.length);
				 	}
				 	while ((options[r][0] > gridSize - 1) || (options[r][1] > gridSize - 1) || (options[r][0] < 0) || (options[r][1] < 0));

				 	slideTile(emptyX, emptyY, options[r][0], options[r][1]);

				 	emptyX = options[r][0];
				 	emptyY = options[r][1];
				}

				window.playing = true;
		}

	/* slideTile */
		function slideTile(emptyX,emptyY,x,y) {
			/* slideTime */
				if (window.playing) {
					slideTime = 1000;
				}
				else {
					slideTime = 200;
				}

			/* do the sliding */
				if ((x + 1 === emptyX) && (y === emptyY)) {
					//slide right
						console.log("right");

						$(".trigger.empty").removeClass("empty");
						$(".trigger[value='" + x + "," + y + "']").addClass("empty");

						$(".tile[value='" + x + "," + y + "']").attr("value",emptyX + "," + emptyY).animate({
							"left": "+=" + (100 / gridSize) + "%"
						},slideTime);
				}
				else if ((x - 1 === emptyX) && (y === emptyY)) {
					//slide left
						console.log("left");
						
						$(".trigger.empty").removeClass("empty");
						$(".trigger[value='" + x + "," + y + "']").addClass("empty");

						$(".tile[value='" + x + "," + y + "']").attr("value",emptyX + "," + emptyY).animate({
							"left": "-=" + (100 / gridSize) + "%"
						},slideTime);
				}
				else if ((x === emptyX) && (y + 1 === emptyY)) {
					//slide down
						console.log("down");
						
						$(".trigger.empty").removeClass("empty");
						$(".trigger[value='" + x + "," + y + "']").addClass("empty");

						$(".tile[value='" + x + "," + y + "']").attr("value",emptyX + "," + emptyY).animate({
							"top": "+=" + (100 / gridSize) + "%"
						},slideTime);
				}
				else if ((x === emptyX) && (y - 1 === emptyY)) {
					//slide up
						console.log("up");
						
						$(".trigger.empty").removeClass("empty");
						$(".trigger[value='" + x + "," + y + "']").addClass("empty");

						$(".tile[value='" + x + "," + y + "']").attr("value",emptyX + "," + emptyY).animate({
							"top": "-=" + (100 / gridSize) + "%"
						},slideTime);
				}
				else {
					//none
						console.log("none");
				}

			/* victory? */
				if (window.playing) {
					//update moveCount
						window.moveCount = window.moveCount + 1;

					//determine victory
						var victory = true;
						var x = 0;
						var y = 0;

						$(".tile").each(function(){
							if ($(this).attr("value") !== $(this).attr("home")) {
								victory = false;
							}
						});					

					//animate victory
						if (victory) {
							$("#triggers").empty();
							$("#moveCount").text(window.moveCount + " moves");
							
							$("#tiles").animate({
								opacity: 0
							},3000);
							
							$("#victoryOuter").animate({
								opacity: 1
							},3000);
							
							window.playing = false;
						}
				}

		}

});