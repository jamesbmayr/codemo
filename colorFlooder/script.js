$(document).ready(function() {

	/* on load */
		/* create page */
			var colors = ["blue","red","green","yellow","magenta","cyan","black"];
			newPuzzle();

		/* listeners */
			$(document).on("click",".button",function() {
				changeColor($(this));
			});

			$(document).on("click",".cell",function() {
				floodArea($(this));
			});

			$(document).on("click","#refreshOuter",function() {
				newPuzzle();
			});

	/* actions */
		/* changeColor */
			function changeColor(button) {
				if ($(button).hasClass("active")) {
					$(".button").removeClass("active");
				}
				else {
					$(".button").removeClass("active");
					$(button).addClass("active");
				}
			}

		/* floodArea */
			function floodArea(cell) {
				var activeColor = $(".button.active").attr("value");

				if ((activeColor !== undefined) && (!$(cell).hasClass(activeColor))) {
					/* identify starting area and areaColor */
						var areaColor = $(cell).attr("value");
						var area = [String($(cell).attr("id"))];

					/* identify floodable area */
						for (i = 0; i < area.length; i++) {
							var row = Number(area[i].substring(area[i].indexOf("row_") + 4,area[i].indexOf("_column_")));
							var column = Number(area[i].substring(area[i].indexOf("column_") + 7,area[i].length));

							if (($("#row_" + (row + 1) + "_column_" + column).hasClass(areaColor)) && (!(area.indexOf("row_" + (row + 1) + "_column_" + column) > -1))) {
								area.push("row_" + (row + 1) + "_column_" + column);
							}

							if (($("#row_" + (row - 1) + "_column_" + column).hasClass(areaColor)) && (!(area.indexOf("row_" + (row - 1) + "_column_" + column) > -1))) {
								area.push("row_" + (row - 1) + "_column_" + column);
							}

							if (($("#row_" + row + "_column_" + (column + 1)).hasClass(areaColor)) && (!(area.indexOf("row_" + row + "_column_" + (column + 1)) > -1))) {
								area.push("row_" + row + "_column_" + (column + 1));
							}

							if (($("#row_" + row + "_column_" + (column - 1)).hasClass(areaColor)) && (!(area.indexOf("row_" + row + "_column_" + (column - 1)) > -1))) {
								area.push("row_" + row + "_column_" + (column - 1));
							}
						}

					/* flood area with activeColor */
						for (i = 0; i < area.length; i++) {
							$("#" + area[i]).removeClass(areaColor).addClass(activeColor).attr("value",activeColor);
						}

					/* update counter */
						var counter = $("#counterInner").text();
						if (!(counter > 0)) {
							counter = 0;
						}
						$("#counterInner").text(Number(counter) + 1);

					/* victory? */
						var victory = false;
						var i = 0;
						while ((!victory) && (i < colors.length)) {
							cellsArray = $(".cell." + colors[i]).toArray();
							if (cellsArray.length === Number(totalRows * totalColumns)) {
								victory = true;
							}
							i++;
						}

						if (victory) {
							$("#puzzle").empty().append("<div id='victory'>\
								<span id='message'>victory!</span>\
								<div id='parametersOuter'>\
									<div id='parametersInner'>\
										<input id='newColorCount' type='number' min='2' max='7' placeholder='colors'></input>\
										<input id='newGridCount' type='number' min='2' max='25' placeholder='grid'></input>\
										<div id='refreshOuter'>\
											<span id='refreshInner' class='glyphicon glyphicon-refresh'></span>\
										</div>\
									</div>\
								</div>\
							</div>");

							$("#puzzle").addClass(activeColor);
						}
				}

			}

		/* newPuzzle */
			function newPuzzle() {
				$("#puzzle").removeClass();

				var newColorCount = $("#newColorCount").val();
				var newGridCount = $("#newGridCount").val();

				if ((!(newColorCount > 1)) || (!(newColorCount < 8))) {
					window.colorCount = 3;
				}
				else {
					window.colorCount = newColorCount;
				}

				if ((!(newGridCount > 1)) || (!(newGridCount < 26))) {
					window.totalColumns = 5;
					window.totalRows = 5;
				}
				else {
					window.totalColumns = newGridCount;
					window.totalRows = newGridCount;
				}

				makePuzzle(window.totalColumns, window.totalRows, window.colorCount);
				makeButtons(window.colorCount);
			}

	/* functions */
		/* randomColor */
			function randomColor(colorCount) {
				var number = Math.floor(Math.random() * colorCount);
				return colors[number];
			}

		/* makePuzzle */
			function makePuzzle(totalColumns, totalRows, colorCount) {
				$("#puzzle").empty();

				for (row = 0; row < totalRows; row++) {
					$("#puzzle").append("<div id='row_" + row + "' class='row' style='height: " + 100 / totalRows + "%'></div>");
					
					for (column = 0; column < totalColumns; column++) {
						var color = randomColor(colorCount);
						$("#row_" + row).append("<div id='row_" + row + "_column_" + column + "' class='cell " + color + "' style='width: " + 100 / totalColumns + "%' value='" + color + "'></div>");
					}
				}
			}

		/* makeButtons */
			function makeButtons(colorCount) {
				$("#buttons").empty().append("<div id='counterOuter'>\
					<span id='counterInner'>?</span>\
				</div>");

				for (i = 0; i < colorCount; i++) {
					$("#buttons").append("<div id='button_" + colors[i] + "' class='button " + colors[i] + "' value='" + colors[i] + "'></div>");
				}

				$(".button").first().addClass("active");
			}

});