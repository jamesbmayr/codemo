$(document).ready(function() {

	/* * page * */
		/* load */
			startGame();

			var timer = setInterval(function() {
				//animateLines();
				moveRobots();
				spawnRobots();
			}, 2000);

		/* listeners */
			$(document).on("click",".endpoint",function() {
				console.log("clicked");
				if ($(this).hasClass("selected")) {
					$(".endpoint").removeClass("selected");
				}
				else {
					$(".endpoint").removeClass("selected");
					$(this).addClass("selected");
				}
			});			

			$(document).on("mouseenter",".overGrid_cell",function() {
				if (window.playing) {
					var cell_x = Number($(this).attr("x"));
					var cell_y = Number($(this).attr("y"));
					selectCell(cell_x,cell_y);
				}
			});

	/* * actions * */
		/* selectCell */
			function selectCell(cell_x,cell_y) {
				console.log("selecting: " + cell_x + ", " + cell_y);

				//get endpoint
					var unit = Number(String($(".endpoint.selected").attr("id")).replace("endpoint_",""));
					var color = String($(".endpoint.selected").attr("color"));

				//add to path
					if (unit && isEmptyUnderGrid(color, cell_x, cell_y)) {
						//get path endpoint
							var end_x = Number($(".endpoint.selected").attr("x"));
							var end_y = Number($(".endpoint.selected").attr("y"));

							console.log("endpoint: " + end_x + ", " + end_y);

						if ((cell_x === end_x + 1) && (cell_y === end_y)) {
							//right
							console.log("right");
							$("#underGrid_cell_" + color + "_" + end_x + "_" + end_y).attr("to","right");

							var endpoint = $(".endpoint.selected").detach();
							$(endpoint).appendTo("#overGrid_cell_" + cell_x + "_" + cell_y);
							$(endpoint).attr("x",cell_x).attr("y",cell_y);
							$("#underGrid_cell_" + color + "_" + cell_x + "_" + cell_y).attr("path",unit).attr("from","left").attr("to","center").attr("color",color);
						}
						else if ((cell_x === end_x - 1) && (cell_y === end_y)) {
							//left
							console.log("left");
							$("#underGrid_cell_" + color + "_" + end_x + "_" + end_y).attr("to","left");

							var endpoint = $(".endpoint.selected").detach();
							$(endpoint).appendTo("#overGrid_cell_" + cell_x + "_" + cell_y);
							$(endpoint).attr("x",cell_x).attr("y",cell_y);
							$("#underGrid_cell_" + color + "_" + cell_x + "_" + cell_y).attr("path",unit).attr("from","right").attr("to","center").attr("color",color);
						}
						else if ((cell_x === end_x) && (cell_y === end_y + 1)) {
							//down
							console.log("down");
							$("#underGrid_cell_" + color + "_" + end_x + "_" + end_y).attr("to","bottom");

							var endpoint = $(".endpoint.selected").detach();
							$(endpoint).appendTo("#overGrid_cell_" + cell_x + "_" + cell_y);
							$(endpoint).attr("x",cell_x).attr("y",cell_y);
							$("#underGrid_cell_" + color + "_" + cell_x + "_" + cell_y).attr("path",unit).attr("from","top").attr("to","center").attr("color",color);
						}
						else if ((cell_x === end_x) && (cell_y === end_y - 1)) {
							//up
							console.log("up");
							$("#underGrid_cell_" + color + "_" + end_x + "_" + end_y).attr("to","top");

							var endpoint = $(".endpoint.selected").detach();
							$(endpoint).appendTo("#overGrid_cell_" + cell_x + "_" + cell_y);
							$(endpoint).attr("x",cell_x).attr("y",cell_y);
							$("#underGrid_cell_" + color + "_" + cell_x + "_" + cell_y).attr("path",unit).attr("from","bottom").attr("to","center").attr("color",color);
						}

						//collector
							if ($("#overGrid_cell_" + cell_x + "_" + cell_y).find(".collector[color='" + color + "']").length) {
								console.log("collector");
								var endpoint = $(".endpoint.selected").detach();
								var collector = $("#overGrid_cell_" + cell_x + "_" + cell_y).find(".collector[color='" + color + "']");
								
								$(endpoint).appendTo(collector);
								$(endpoint).attr("x",cell_x).attr("y",cell_y);
							}

					}

				//reset path
					else if (unit && (Number($("#robot_" + unit).attr("x")) === cell_x) && (Number($("#robot_" + unit).attr("y")) === cell_y)) {
						//reset
						console.log("reset");
						$(".underGrid_cell[path='" + unit + "']").attr("path","").attr("from","").attr("to","").attr("color","");
						$("#underGrid_cell_" + color + "_" + cell_x + "_" + cell_y).attr("path",unit).attr("from","center").attr("to","center").attr("color",color);

						var endpoint = $(".endpoint.selected").detach();
						$(endpoint).appendTo("#robot_" + unit);
						$(endpoint).attr("x",cell_x).attr("y",cell_y);
					}

				//backtrack path
					else if (unit && (Number($("#underGrid_cell_" + color + "_" + cell_x + "_" + cell_y).attr("path")) === unit)) {
						//get previous cell
							var end_x = Number($(".endpoint.selected").attr("x"));
							var end_y = Number($(".endpoint.selected").attr("y"));

							var previous = $("#underGrid_cell_" + color + "_" + end_x + "_" + end_y).attr("from");

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
								$("#underGrid_cell_" + color + "_" + end_x + "_" + end_y).attr("from","").attr("to","").attr("path","").attr("color","");

								var endpoint = $(".endpoint.selected").detach();
								$(endpoint).appendTo("#overGrid_cell_" + cell_x + "_" + cell_y);
								$(endpoint).attr("x",cell_x).attr("y",cell_y);
								$("#underGrid_cell_" + color + "_" + cell_x + "_" + cell_y).attr("to","center");
							}

						//collector
							if ($("#overGrid_cell_" + cell_x + "_" + cell_y).find(".collector[color='" + color + "']").length) {
								console.log("collector");
								var endpoint = $(".endpoint.selected").detach();
								var collector = $("#overGrid_cell_" + cell_x + "_" + cell_y).find(".collector[color='" + color + "']");
								
								$(endpoint).appendTo(collector);
								$(endpoint).attr("x",cell_x).attr("y",cell_y);
							}
					}

			}

	/* * functions * */
		/* isEmptyUnderGrid */
			function isEmptyUnderGrid(color,x,y) {
				if ($("#overGrid_cell_" + x + "_" + y).find(".endpoint").length) {
					return false;
				}
				else if ($("#underGrid_cell_" + color + "_" + x + "_" + y).attr("path")) {
					return false;
				}
				else if ($("#overGrid_cell_" + x + "_" + y).find(".collector:not([color='" + color + "'])").length) {
					return false;
				}
				else {
					return true;
				}
			}

		/* isEmptyOverGrid */
			function isEmptyOverGrid(color,x,y) {
				if ((x < 0) || (x > 9) || (y < 0) || (y > 9)) {
					return false;
				}
				else if ($("#overGrid_cell_" + x + "_" + y).find(".obstacle").length) {
					return false;
				}
				else if ($(".robot[x='" + x + "'][y='" + y + "']").length) {
					return false;
				}
				else if ($("#overGrid_cell_" + x + "_" + y).find(".collector:not([color='" + color + "'])").length) {
					return false;
				}
				else {
					return true;
				}
			}

		/* startGame */
			function startGame() {
				//reset
					window.playing = false;
					window.score = 0;
					var colors = ["red","green","blue"];
					$("#container").empty();
					$("#container").append("<div id='overGrid' class='overGrid'></div>");
					for (i = 0; i < colors.length; i++) {
						$("#container").append("<div id='underGrid_" + colors[i] + "' class='underGrid'></div>");
					}

				//create grid
					for (y = 0; y < 10; y++) {
						$("#overGrid").append("<div id='overGrid_row_" + y + "' class='overGrid_row'></div>");
						for (i = 0; i < colors.length; i++) {
							$("#underGrid_" + colors[i]).append("<div id='underGrid_row_" + colors[i] + "_" + y + "' class='underGrid_row'></div>");
						}
						for (x = 0; x < 10; x++) {
							$("#overGrid_row_" + y).append("<div id='overGrid_cell_" + x + "_" + y + "' class='overGrid_cell' x='" + x + "' y='" + y + "'></div>");
							for (i = 0; i < colors.length; i++) {
								$("#underGrid_row_" + colors[i] + "_" + y).append("<div id='underGrid_cell_" + colors[i] + "_" + x + "_" + y + "' class='underGrid_cell' x='" + x + "' y='" + y + "'></div>");
							}
						}
					}

				//create collectors
					var collectorCoordinates = [];
					for (i = 0; i < colors.length; i++) {
						do {
							var x = Math.floor(Math.random() * 6) + 2;
							var y = Math.floor(Math.random() * 6) + 2;
						}
						while (collectorCoordinates.indexOf(x + "_" + y) > -1);
						
						$("#overGrid_cell_" + x + "_" + y).append("<div class='collector' color='" + colors[i] + "'>");
						collectorCoordinates.push(x + "_" + y);
					}

				window.playing = true;
			}

		/* animateLines */

		/* moveRobots */
			function moveRobots() {
				console.log("moving");
				$(".robot").each(function() {
					//starting point
						var robot = $(this);
						var unit = Number(String($(robot).attr("id").replace("robot_","")));
						var start_x = Number($(robot).attr("x"));
						var start_y = Number($(robot).attr("y"));
						var color = String($(robot).attr("color"));
						var oldDirection = String($(robot).attr("direction"));

					//get newDirection
						var newDirection = $("#underGrid_cell_" + color + "_" + start_x + "_" + start_y + "[path='" + unit + "']").attr("to");

						if (!newDirection) {
							newDirection = oldDirection;
						}
						else if (newDirection === "center") {
							newDirection = oldDirection;
						}

						$(robot).attr("direction",newDirection);
					
					//get new coordinates
						switch (newDirection) {
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

					//collected?
						if (newDirection === "collected") {
							$(".underGrid_cell[path='" + unit + "']").attr("from","").attr("to","").attr("path","").attr("color","");

							var endpoint = $("#endpoint_" + unit).detach();
							$(endpoint).appendTo(robot);
							$(endpoint).attr("x",end_x).attr("y",end_y);

							setTimeout(function() {
								$(robot).remove();
							},2000);
						}

					//illegal move?
						else if (!isEmptyOverGrid(color,end_x,end_y)) {
							//stop game
								clearInterval(timer);
								window.playing = false;

							//remove line
								var endpoint = $("#endpoint_" + unit).detach();
								$(endpoint).appendTo(robot).attr("x",end_x).attr("y",end_y);
								$(".underGrid_cell[path='" + unit + "']").attr("from","").attr("to","").attr("path","").attr("color","");

							//animate robot
								$(robot).attr("x",end_x).attr("y",end_y).animate({
									top: (end_y * 10 + "%"),
									left: (end_x * 10 + "%")
								},2000,'linear');

								var flashCount = 0;
								var flash = setInterval(function() {
									if (flashCount % 2 === 0) {
										$(robot).css("background-color","#ffffff");
									}
									else {
										$(robot).css("background-color","#333333");
									}
									flashCount++;

									if (flashCount > 9) {
										$(robot).addClass("online");
										clearInterval(flash);
									}
								},100);
						}
						else {
							//animate robot
								$(robot).attr("x",end_x).attr("y",end_y).animate({
									top: (end_y * 10 + "%"),
									left: (end_x * 10 + "%")
								},2000,'linear');

							//remove line
								setTimeout(function() {
									$("#underGrid_cell_" + color + "_" + start_x + "_" + start_y).attr("from","").attr("to","").attr("path","").attr("color","");
								},750);

								setTimeout(function() {
									$("#underGrid_cell_" + color + "_" + end_x + "_" + end_y).attr("path",unit).attr("color",color).attr("from","center");
								},1250);

							//online?
								if (Number($("#underGrid_cell_" + color + "_" + end_x + "_" + end_y).attr("path")) === unit) {
									$(robot).addClass("online");
								}
								else {
									$(robot).removeClass("online");
									var endpoint = $("#endpoint_" + unit).detach();
									$(endpoint).appendTo(robot).attr("x",end_x).attr("y",end_y);
									$("#underGrid_cell[path='" + unit + "']").attr("from","").attr("to","").attr("path","");
								}

							//collector?
								if ($("#overGrid_cell_" + end_x + "_" + end_y).find(".collector[color='" + color + "']").length) {
									window.score++;
									console.log("score is now " + window.score);

									$(".underGrid_cell[path='" + unit + "']").attr("path","").attr("from","").attr("to","").attr("color","");
									
									$(robot).attr("direction","collected");
									$(robot).animate({
										border: "0",
										opacity: "0",
										width: "0",
										height: "0",
										top: "+=5%",
										left: "+=5%",
										margin: "-=5px"
									},2000);
								}
						}
				});
			}

		/* spawnRobots */
			function spawnRobots() {
				console.log("spawning");
				
				//parameters
					var colors = ["red","green","blue"];
					var possibleCells = [[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],
										[9,1],[9,2],[9,3],[9,4],[9,5],[9,6],[9,7],[9,8],
										[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],
										[1,9],[2,9],[3,9],[4,9],[5,9],[6,9],[7,9],[8,9]];
				
				//botLimit
					if (window.score < 5) {
						var botLimit = 3;
					}
					else if (window.score < 10) {
						var botLimit = 4;
					}
					else if (window.score < 15) {
						var botLimit = 5;
					}
					else if (window.score < 20) {
						var botLimit = 6;
					}
					else if (window.score < 25) {
						var botLimit = 7;
					}
					else {
						var botLimit = 8;
					}

				//botCount
					var botCount = $(".robot").toArray().length;

					if ((!botCount) || (typeof botCount === "undefined")) {
						botCount = 0;
					}

				//createBots
					if (botCount < botLimit) {
						var color = colors[Math.floor(Math.random() * colors.length)];
						var attempt = 0;
						
						do {
							var cell = possibleCells[Math.floor(Math.random() * possibleCells.length)];
							var x = cell[0];
							var y = cell[1];
							attempt++;
						}
						while (!isEmptyOverGrid(color,x,y) && (attempt < 9));

						if (x === 0) {
							var direction = "right";
						}
						else if (x === 9) {
							var direction = "left";
						}
						else if (y === 0) {
							var direction = "bottom";
						}
						else if (y === 9) {
							var direction = "top";
						}

						if (attempt < 10) {
							var lastRobot = Number(String($(".robot").last().attr("id")).replace("robot_",""));
							console.log("lastRobot:" + lastRobot);
							
							var newRobot = lastRobot + 1;

							if (!newRobot) {
								newRobot = 1;
							}
						
							$("#overGrid").append("<div id='robot_" + newRobot + "' class='robot' color='" + color + "' x='" + x + "' y='" + y + "' direction='" + direction + "' style='top: " + (y * 10) + "%; left: " + (x * 10) + "%'><div id='endpoint_" + newRobot + "' class='endpoint' color='" + color + "' x='" + x + "' y='" + y + "'></div></div>");
							$("#underGrid_cell_" + color + "_" + x + "_" + y).attr("from","center").attr("to","center").attr("path",newRobot).attr("color",color);
						}
					}
			}
});