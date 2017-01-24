$(document).ready(function() {

	/* * page * */
		/* load */
			startGame();

			var timer = setInterval(function() {
				//animateLines();
				moveRobots();
			}, 1000);

		/* listeners */
			$(".endpoint").on("click",function() {
				console.log(this);
				var unit = Number(String($(this).attr("id")).replace("endpoint_",""));
				if ($("#robot_" + unit).hasClass("selected")) {
					$(".robot").removeClass("selected");
				}
				else {
					$(".robot").removeClass("selected");
					$("#robot_" + unit).addClass("selected");
				}
			});			

			$(document).on("mouseenter",".overGrid_cell",function() {
				var cell_x = Number($(this).attr("x"));
				var cell_y = Number($(this).attr("y"));
				selectCell(cell_x,cell_y);
			});

	/* * actions * */
		/* selectCell */
			function selectCell(cell_x,cell_y) {
				console.log("selecting: " + cell_x + ", " + cell_y);

				//get robot
					var unit = Number(String($(".robot.selected").attr("id")).replace("robot_",""));
					var color = String($(".robot.selected").attr("color"));

				//add to path
					if (unit && isEmpty(cell_x,cell_y)) {
						//get path endpoint
							var end_x = Number($("#endpoint_" + unit).attr("x"));
							var end_y = Number($("#endpoint_" + unit).attr("y"));

							console.log("endpoint: " + end_x + ", " + end_y);

						if ((cell_x === end_x + 1) && (cell_y === end_y)) {
							//right
							console.log("right");
							$("#underGrid_cell_" + end_x + "_" + end_y).attr("to","right");

							var endpoint = $("#endpoint_" + unit).detach();
							$(endpoint).appendTo("#overGrid_cell_" + cell_x + "_" + cell_y).attr("x",cell_x).attr("y",cell_y);
							$("#underGrid_cell_" + cell_x + "_" + cell_y).attr("path",unit).attr("from","left").attr("to","center").attr("color",color);
						}
						else if ((cell_x === end_x - 1) && (cell_y === end_y)) {
							//left
							console.log("left");
							$("#underGrid_cell_" + end_x + "_" + end_y).attr("to","left");

							var endpoint = $("#endpoint_" + unit).detach();
							$(endpoint).appendTo("#overGrid_cell_" + cell_x + "_" + cell_y).attr("x",cell_x).attr("y",cell_y);
							$("#underGrid_cell_" + cell_x + "_" + cell_y).attr("path",unit).attr("from","right").attr("to","center").attr("color",color);
						}
						else if ((cell_x === end_x) && (cell_y === end_y + 1)) {
							//down
							console.log("down");
							$("#underGrid_cell_" + end_x + "_" + end_y).attr("to","bottom");

							var endpoint = $("#endpoint_" + unit).detach();
							$(endpoint).appendTo("#overGrid_cell_" + cell_x + "_" + cell_y).attr("x",cell_x).attr("y",cell_y);
							$("#underGrid_cell_" + cell_x + "_" + cell_y).attr("path",unit).attr("from","top").attr("to","center").attr("color",color);
						}
						else if ((cell_x === end_x) && (cell_y === end_y - 1)) {
							//up
							console.log("up");
							$("#underGrid_cell_" + end_x + "_" + end_y).attr("to","top");

							var endpoint = $("#endpoint_" + unit).detach();
							$(endpoint).appendTo("#overGrid_cell_" + cell_x + "_" + cell_y).attr("x",cell_x).attr("y",cell_y);
							$("#underGrid_cell_" + cell_x + "_" + cell_y).attr("path",unit).attr("from","bottom").attr("to","center").attr("color",color);
						}
					}

				//reset path
					else if ((Number($(".robot.selected").attr("x")) === cell_x) && (Number($(".robot.selected").attr("y")) === cell_y)) {
						//reset
						console.log("reset");
						$(".underGrid_cell[path='" + unit + "']").attr("path","").attr("from","").attr("to","").attr("color","");
						$("#underGrid_cell_" + cell_x + "_" + cell_y).attr("path",unit).attr("from","center").attr("to","center").attr("color",color);

						var endpoint = $("#endpoint_" + unit).detach();
						$(endpoint).appendTo("#robot_" + unit).attr("x",cell_x).attr("y",cell_y);
					}

				//backtrack path
					else if (Number($("#underGrid_cell_" + cell_x + "_" + cell_y).attr("path")) === unit) {
						//get previous cell
							var end_x = Number($("#endpoint_" + unit).attr("x"));
							var end_y = Number($("#endpoint_" + unit).attr("y"));

							var previous = $("#underGrid_cell_" + end_x + "_" + end_y).attr("from");
							console.log("previous: " + previous);

							switch (previous) {
								case "top":
									var previous_x = end_x;
									var previous_y = end_y - 1;
								break;

								case "right":
									var previous_x = end_x + 1;
									var previous_y = end_y;
								break;

								case "bottom":
									var previous_x = end_x;
									var previous_y = end_y + 1;
								break;

								case "left":
									var previous_x = end_x - 1;
									var previous_y = end_y;
								break;

								default:
									var previous = false;
								break;
							}

						//go back
							if (previous && (cell_x === previous_x) && (cell_y === previous_y)) {
								console.log("backtrack");
								$("#underGrid_cell_" + end_x + "_" + end_y).attr("from","").attr("to","").attr("path","").attr("color","");

								var endpoint = $("#endpoint_" + unit).detach();
								$(endpoint).appendTo("#overGrid_cell_" + cell_x + "_" + cell_y).attr("x",cell_x).attr("y",cell_y);
								$("#underGrid_cell_" + cell_x + "_" + cell_y).attr("to","center");
							}
					}
			}

		/* isEmpty */
			function isEmpty(x,y) {

				if ($("#overGrid_cell_" + x + "_" + y).html()) {
					return false;
				}
				else if ($("#underGrid_cell_" + x + "_" + y).attr("path")) {
					return false;
				}
				else {
					return true;
				}
			}

	/* * functions * */
		/* startGame */
			function startGame() {
				//reset
					window.score = 0;
					$("#container").empty();
					$("#container").append("<div id='overGrid'></div>").append("<div id='underGrid'></div>");

				//create grid
					for (y = 0; y < 10; y++) {
						$("#overGrid").append("<div id='overGrid_row_" + y + "' class='overGrid_row'></div>");
						$("#underGrid").append("<div id='underGrid_row_" + y + "' class='underGrid_row'></div>");
						for (x = 0; x < 10; x++) {
							$("#overGrid_row_" + y).append("<div id='overGrid_cell_" + x + "_" + y + "' class='overGrid_cell' x='" + x + "' y='" + y + "'></div>");
							$("#underGrid_row_" + y).append("<div id='underGrid_cell_" + x + "_" + y + "' class='underGrid_cell' x='" + x + "' y='" + y + "'></div>");
						}
					}

				//create robots
					$("#overGrid").append("<div id='robot_1' class='robot' color='green' x='0' y='0' style='top: 0%; left: 0%'><div id='endpoint_1' class='endpoint' color='green' x='0' y='0'></div></div>");
					$("#underGrid_cell_0_0").attr("from","center").attr("to","center").attr("path","1").attr("color","blue");

					$("#overGrid").append("<div id='robot_2' class='robot' color='red' x='4' y='5' style='top: 50%; left: 40%'><div id='endpoint_2' class='endpoint' color='red' x='4' y='5'></div></div>");
					$("#underGrid_cell_4_5").attr("from","center").attr("to","center").attr("path","2").attr("color","red");

					$("#overGrid").append("<div id='robot_3' class='robot' color='blue' x='7' y='9' style='top: 90%; left: 70%'><div id='endpoint_3' class='endpoint' color='blue' x='7' y='9'></div></div>");
					$("#underGrid_cell_7_9").attr("from","center").attr("to","center").attr("path","3").attr("color","blue");
			}

		/* animateLines */

		/* moveRobots */
			function moveRobots() {
				console.log("moving");
				$(".robot").each(function() {
					//starting point
						var unit = Number(String($(this).attr("id").replace("robot_","")));
						var start_x = Number($(this).attr("x"));
						var start_y = Number($(this).attr("y"));
						var color = String($(this).attr("color"));
						var direction = $("#underGrid_cell_" + start_x + "_" + start_y + "[path='" + unit + "']").attr("to");

						console.log("direction:" + direction);

					//new coordinates
						if (!direction) {
							var end_x = start_x;
							var end_y = start_y;
						}
						else {
							switch (direction) {
								case "center":
									var end_x = start_x;
									var end_y = start_y;
								break;

								case "top":
									var end_x = start_x;
									var end_y = start_y - 1;
								break;

								case "right":
									var end_x = start_x + 1;
									var end_y = start_y;
								break;

								case "bottom":
									var end_x = start_x;
									var end_y = start_y + 1;
								break;

								case "left":
									var end_x = start_x - 1;
									var end_y = start_y;
								break;

								default:
									var end_x = start_x;
									var end_y = start_y;
								break;
							}
						}

					//animate robot
						$(this).attr("x",end_x).attr("y",end_y).animate({
							top: (end_y * 10 + "%"),
							left: (end_x * 10 + "%")
						},1000);

					//remove line
						$("#underGrid_cell_" + start_x + "_" + start_y).delay('slow').attr("from","").attr("to","").attr("path","").attr("color","");
						$("#underGrid_cell_" + end_x + "_" + end_y).attr("path",unit).attr("color",color).attr("from","center");
				});
			}
});