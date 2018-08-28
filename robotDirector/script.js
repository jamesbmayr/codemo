$(document).ready(function() {

	/* * page * */
		/* triggers */
			if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
				var on = { click: "touchstart", mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" }
			}
			else {
				var on = { click:      "click", mousedown:  "mousedown", mousemove: "mousemove", mouseup:  "mouseup" }
			}

		/* load */
			startGame();

			var timer = setInterval(function() {
				//animateLines();
				if (window.playing) {
					moveRobots();
					spawnRobots();
				}
			}, 2000);

		/* listeners */
				$(document).on(on.mousedown,".endpoint",function() {
					if ($(this).hasClass("selected")) {
						$(".endpoint").removeClass("selected");
					}
					else {
						$(".endpoint").removeClass("selected");
						$(this).addClass("selected");
					}
				});

				$(document).on(on.mousedown,".robot",function() {
					console.log("robot")
					if ($(this).find(".endpoint")) {
						var endpoint = $(this).find(".endpoint")
						if ($(endpoint).hasClass("selected")) {
							$(".endpoint").removeClass("selected");
						}
						else {
							$(".endpoint").removeClass("selected");
							$(endpoint).addClass("selected");
						}
					}
				});		

				$(document).on(on.mousemove,".overGrid_cell",function() {
					if (window.playing) {
						var cell_x = Number($(this).attr("x"));
						var cell_y = Number($(this).attr("y"));
						selectCell(cell_x,cell_y);
					}
				});

				$(document).on(on.mousedown,".overGrid_cell",function() {
					if (window.playing) {
						var cell_x = Number($(this).attr("x"));
						var cell_y = Number($(this).attr("y"));
						selectCell(cell_x,cell_y);
					}
				});

				$(document).on(on.click,"#pause",function() {
					if ($("#pause").hasClass("reset")) {
						startGame();

						var timer = setInterval(function() {
							if (window.playing) {
								moveRobots();
								spawnRobots();
							}
						}, 2000);

						$("#pause").removeClass("reset");
					}
					else if ($("#pause").hasClass("playing")) {
						window.playing = false;
						$("#pause").removeClass("playing").html('<span id="pause_glyph" class="glyphicon glyphicon-play">');
					}
					else {
						window.playing = true;
						$("#pause").addClass("playing").html('<span id="pause_glyph" class="glyphicon glyphicon-pause">');
					}
				});

	/* * actions * */
		/* selectCell */
			function selectCell(cell_x,cell_y) {
				//get endpoint
					var unit = Number(String($(".endpoint.selected").attr("id")).replace("endpoint_",""));
					var color = String($(".endpoint.selected").attr("color"));

				//add to path
					if (unit && isEmptyUnderGrid(color, cell_x, cell_y) && !(Number($("#underGrid_cell_" + color + "_" + cell_x + "_" + cell_y).attr("path")) === unit)) {
						//get path endpoint
							var end_x = Number($(".endpoint.selected").attr("x"));
							var end_y = Number($(".endpoint.selected").attr("y"));
							var to = false;
							var from = false;

						//starting?
							if ($("#robot_" + unit + "[x='" + end_x + "'][y='" + end_y + "']").length) {
								$("#underGrid_cell_" + color + "_" + end_x + "_" + end_y).attr("from","center").attr("color",color);
							}

						//past a collector?
							if ($("#underGrid_cell_" + color + "_" + end_x + "_" + end_y).hasClass("underGrid_collector")) {
								// console.log("no going beyond a collector");
							}
							else {
								//direction
									var directions = toFrom(end_x,end_y,cell_x,cell_y);
									var to = directions[0];
									var from = directions[1];

								//adjacent?
									if (to) {
										$("#underGrid_cell_" + color + "_" + end_x + "_" + end_y).attr("to",to);

										var endpoint = $(".endpoint.selected").detach();
										$(endpoint).appendTo("#overGrid_cell_" + cell_x + "_" + cell_y);
										$(endpoint).attr("x",cell_x).attr("y",cell_y);
										$("#underGrid_cell_" + color + "_" + cell_x + "_" + cell_y).attr("path",unit).attr("from",from).attr("to","center").attr("color",color);

										if ($("#overGrid_cell_" + end_x + "_" + end_y).find(".endpoint").length) {
											$("#overGrid_cell_" + end_x + "_" + end_y).find(".endpoint").last().removeClass("underneath");
										}
									}

								//collector?
									if (to && $("#overGrid_cell_" + cell_x + "_" + cell_y).find(".collector[color='" + color + "']").length) {
										var endpoint = $(".endpoint.selected").detach();
										var collector = $("#overGrid_cell_" + cell_x + "_" + cell_y).find(".collector[color='" + color + "']");
										
										if ($(collector).find(".endpoint").length) {
											$(collector).find(".endpoint").addClass("underneath");
										}

										$(endpoint).appendTo(collector);
										$(endpoint).attr("x",cell_x).attr("y",cell_y);

										if ($("#overGrid_cell_" + end_x + "_" + end_y).find(".endpoint").length) {
											$("#overGrid_cell_" + end_x + "_" + end_y).find(".endpoint").last().removeClass("underneath");
										}
									}
							}
					}

				//backtrack path
					else if (unit && (Number($("#underGrid_cell_" + color + "_" + cell_x + "_" + cell_y).attr("path")) === unit)) {
						//get endpoint cell
							var end_x = Number($(".endpoint.selected").attr("x"));
							var end_y = Number($(".endpoint.selected").attr("y"));

						//backing out of a collector?
							if ($("#underGrid_cell_" + color + "_" + end_x + "_" + end_y).hasClass("underGrid_collector")) {
								// console.log("no backing out of a collector");
							}
							else {
								//get previous cell
									var from = $("#underGrid_cell_" + color + "_" + end_x + "_" + end_y).attr("from");

									var coordinates = pathFrom(from, end_x, end_y);
									var previous_x = coordinates[0];
									var previous_y = coordinates[1];

								//go back
									if (from && (cell_x === previous_x) && (cell_y === previous_y)) {
										$("#underGrid_cell_" + color + "_" + end_x + "_" + end_y + ":not(.underGrid_collector)").attr("color","");
										$("#underGrid_cell_" + color + "_" + end_x + "_" + end_y).attr("from","").attr("to","").attr("path","");

										var endpoint = $(".endpoint.selected").detach();
										$(endpoint).appendTo("#overGrid_cell_" + cell_x + "_" + cell_y);
										$(endpoint).attr("x",cell_x).attr("y",cell_y);
										$("#underGrid_cell_" + color + "_" + cell_x + "_" + cell_y).attr("to","center");

										if ($("#overGrid_cell_" + end_x + "_" + end_y).find(".underneath").length) {
											$("#overGrid_cell_" + end_x + "_" + end_y).find(".endpoint").last().removeClass("underneath");
										}

										//collector
											if ($("#overGrid_cell_" + cell_x + "_" + cell_y).find(".collector[color='" + color + "']").length) {
												var endpoint = $(".endpoint.selected").detach();
												var collector = $("#overGrid_cell_" + cell_x + "_" + cell_y).find(".collector[color='" + color + "']");
												
												if ($(collector).find(".endpoint").length) {
													$(collector).find(".endpoint").addClass("underneath");
												}

												$(endpoint).appendTo(collector);
												$(endpoint).attr("x",cell_x).attr("y",cell_y);
											}
									}
							}
					}

				//reset path
					if (unit && (Number($("#robot_" + unit).attr("x")) === cell_x) && (Number($("#robot_" + unit).attr("y")) === cell_y)) {
						//get endpoint cell
							var end_x = Number($(".endpoint.selected").attr("x"));
							var end_y = Number($(".endpoint.selected").attr("y"));

						//backing out of a collector?
							if ($("#underGrid_cell_" + color + "_" + end_x + "_" + end_y).hasClass("underGrid_collector")) {
								// console.log("no backing out of a collector");
							}
							else {
								//reset
								$(".underGrid_cell[path='" + unit + "']:not(.underGrid_collector)").attr("color","");
								$(".underGrid_cell[path='" + unit + "']:not(.underGrid_collector)").attr("path","").attr("from","").attr("to","");
								$("#underGrid_cell_" + color + "_" + cell_x + "_" + cell_y).attr("path",unit).attr("from","center").attr("to","center").attr("color",color);

								var endpoint = $(".endpoint.selected").detach();
								$(endpoint).appendTo("#robot_" + unit);
								$(endpoint).attr("x",cell_x).attr("y",cell_y);

								if ($("#overGrid_cell_" + end_x + "_" + end_y).find(".endpoint").length) {
									$("#overGrid_cell_" + end_x + "_" + end_y).find(".endpoint").last().removeClass("underneath");
								}
							}
					}
			}

	/* * helpers * */
		/* isEmptyUnderGrid */
			function isEmptyUnderGrid(color,x,y) {
				if ($("#overGrid_cell_" + x + "_" + y).find(".endpoint:not([color='" + color + "'])").length) {
					return false;
				}
				else if ($("#overGrid_cell_" + x + "_" + y).find(".endpoint[color='" + color + "']").length && !($("#overGrid_cell_" + x + "_" + y).find(".collector[color='" + color + "']").length)) {
					return false;
				}
				else if ($("#underGrid_cell_" + color + "_" + x + "_" + y).attr("path") && !($("#overGrid_cell_" + x + "_" + y).find(".collector[color='" + color + "']").length)) {
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
				else if ($("#overGrid_cell_" + x + "_" + y).find(".collector:not([color='" + color + "'])").length) {
					return false;
				}
				else if ($(".robot[x='" + x + "'][y='" + y + "']:not([color='" + color + "']").length) {
					return false;
				}
				else if ($(".robot[x='" + x + "'][y='" + y + "'][color='" + color + "']").length && !($("#overGrid_cell_" + x + "_" + y).find(".collector[color='" + color + "']").length)) {
					return false;
				}
				else {
					return true;
				}
			}

		/* pathTo */
			function pathTo(to,x,y) {
				x = Number(x);
				y = Number(y);

				switch (to) {
					case "top":
						x = x;
						y = y + 1;
					break;

					case "right":
						x = x - 1;
						y = y;
					break;

					case "bottom":
						x = x;
						y = y - 1;
					break;

					case "left":
						x = x + 1;
						y = y;
					break;

					default:
						x = x;
						y = y;
					break;
				}
				return [x,y];
			}

		/* pathFrom */
			function pathFrom(from,x,y) {
				x = Number(x);
				y = Number(y);

				switch (from) {
					case "top":
						x = x;
						y = y - 1;
					break;

					case "right":
						x = x + 1;
						y = y;
					break;

					case "bottom":
						x = x;
						y = y + 1;
					break;

					case "left":
						x = x - 1;
						y = y;
					break;

					default:
						x = x;
						y = y;
					break;
				}
				return [x,y];
			}

		/* toFrom */
			function toFrom(start_x,start_y,end_x,end_y) {
				if ((end_x === start_x + 1) && (end_y === start_y)) {
					to = "right";
					from = "left";
				}
				else if ((end_x === start_x - 1) && (end_y === start_y)) {
					to = "left";
					from = "right";
				}
				else if ((end_x === start_x) && (end_y === start_y + 1)) {
					to = "bottom";
					from = "top";
				}
				else if ((end_x === start_x) && (end_y === start_y - 1)) {
					to = "top";
					from = "bottom";
				}
				else {
					to = false;
					from = false;
				}

				return [to,from];
			}

	/* * functions * */
		/* startGame */
			function startGame() {
				//reset
					window.playing = false;
					window.score = 0;
					var colors = ["red","green","blue"];
					$("#scoreInner").text("");
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
						while ((collectorCoordinates.indexOf(x + "_" + y) > -1) || (collectorCoordinates.indexOf((x - 1) + "_" + y) > -1) || (collectorCoordinates.indexOf((x + 1) + "_" + y) > -1) || (collectorCoordinates.indexOf(x + "_" + (y - 1)) > -1) || (collectorCoordinates.indexOf(x + "_" + (y + 1)) > -1));
						
						$("#overGrid_cell_" + x + "_" + y).append("<div class='collector' color='" + colors[i] + "'>");
						$("#underGrid_cell_" + colors[i] + "_" + x + "_" + y).addClass("underGrid_collector").attr("color",colors[i]);
						collectorCoordinates.push(x + "_" + y);
					}

				//begin game
					window.playing = true;
					$("#pause").addClass("playing").html('<span id="pause_glyph" class="glyphicon glyphicon-pause">');
			}

		/* moveRobots */
			function moveRobots() {
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
						var coordinates = pathFrom(newDirection, start_x, start_y);
						var end_x = coordinates[0];
						var end_y = coordinates[1];

					//collected?
						if ($(robot).hasClass("collected")) {
							$(".underGrid_cell[path='" + unit + "']:not(.underGrid_collector)").attr("color","");
							$(".underGrid_cell[path='" + unit + "']").attr("from","").attr("to","").attr("path","");

							var endpoint = $("#endpoint_" + unit).detach();
							$(endpoint).appendTo(robot);
							$(endpoint).attr("x",end_x).attr("y",end_y);

							setTimeout(function() {
								$(".underGrid_cell[path='" + unit + "']:not(.underGrid_collector)").attr("color","");
								$(".underGrid_cell[path='" + unit + "']").attr("from","").attr("to","").attr("path","");
								$(robot).remove();
							},2000);
						}

					//illegal move?
						else if (!isEmptyOverGrid(color,end_x,end_y)) {
							//stop game
								clearInterval(timer);
								window.playing = false;
								$("#pause").removeClass("playing").addClass("reset").html('<span id="pause_glyph" class="glyphicon glyphicon-refresh">');

							//remove line
								var endpoint = $("#endpoint_" + unit).detach();
								$(endpoint).appendTo(robot).attr("x",end_x).attr("y",end_y);
								$(".underGrid_cell[path='" + unit + "']:not(.underGrid_collector)").attr("color","");
								$(".underGrid_cell[path='" + unit + "']").attr("from","").attr("to","").attr("path","");

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
									$("#underGrid_cell_" + color + "_" + start_x + "_" + start_y + ":not(.underGrid_collector)").attr("color","");
									$("#underGrid_cell_" + color + "_" + start_x + "_" + start_y).attr("from","").attr("to","").attr("path","");
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

							//hijacking a path?
								if (Number($("#underGrid_cell_" + color + "_" + end_x + "_" + end_y).attr("path")) && (Number($("#underGrid_cell_" + color + "_" + end_x + "_" + end_y).attr("path")) !== unit) && !$("#underGrid_cell_" + color + "_" + end_x + "_" + end_y).hasClass("underGrid_collector")) {
									//get info on path
										var path = Number($("#underGrid_cell_" + color + "_" + end_x + "_" + end_y).attr("path"));
										var path_endpoint = $("#endpoint_" + path).detach();
										var path_endpoint_x = $(path_endpoint).attr("x");
										var path_endpoint_y = $(path_endpoint).attr("y");

										// console.log(unit + " hijacking " + path + "'s path from " + end_x + "," + end_y + " to " + path_endpoint_x + "," + path_endpoint_y)
									
									//move this robot's endpoint to the hijack spot
										var endpoint = $("#endpoint_" + unit).detach();
										if ($("#overGrid_cell_" + path_endpoint_x + "_" + path_endpoint_y).find(".collector").length) {
											var target = $("#overGrid_cell_" + path_endpoint_x + "_" + path_endpoint_y).find(".collector");
											$(endpoint).appendTo(target);
											$(endpoint).attr("x",path_endpoint_x).attr("y",path_endpoint_y);
										}
										else {
											$(endpoint).appendTo("#overGrid_cell_" + path_endpoint_x + "_" + path_endpoint_y).attr("x",path_endpoint_x).attr("y",path_endpoint_y);
										}

									//move hijacked path's endpoint to previous spot
										var from = $("#underGrid_cell_" + color + "_" + end_x + "_" + end_y).attr("from");
										var coordinates = pathFrom(from, end_x, end_y);
										var previous_x = coordinates[0];
										var previous_y = coordinates[1];

										if ($("#overGrid_cell_" + previous_x + "_" + previous_y).find(".collector").length) {
											var target = $("#overGrid_cell_" + previous_x + "_" + previous_y).find(".collector");
											$(path_endpoint).appendTo(target);
											$(path_endpoint).attr("x",previous_x).attr("y",previous_y);
										}
										else {
											$(path_endpoint).appendTo("#overGrid_cell_" + previous_x + "_" + previous_y).attr("x",previous_x).attr("y",previous_y);
											$("#underGrid_cell_" + color + "_" + previous_x + "_" + previous_y).attr("to","center");
										}

									//eliminate this robot's other path components
										$(".underGrid_cell[path='" + unit + "']").attr("path","").attr("from","").attr("to","");

									//fix clip-path directions for start point and end point
										var hijackedTo = toFrom(start_x,start_y,end_x,end_y)[0];
										var hijackedFrom = toFrom(start_x,start_y,end_x,end_y)[1];
										$("#underGrid_cell_" + color + "_" + end_x + "_" + end_y).attr("from",hijackedFrom);
										$("#underGrid_cell_" + color + "_" + start_x + "_" + start_y).attr("to",hijackedTo).attr("from","center").attr("path",unit);

									//fix owner of endpoint path cell
										$("#underGrid_cell_" + color + "_" + path_endpoint_x + "_" + path_endpoint_y).attr("path",unit);
									
									//if there are additional path cells
										if (!((path_endpoint_x === end_x) && (path_endpoint_y === end_y))) {
											var uproot_x = path_endpoint_x;
											var uproot_y = path_endpoint_y;
											var uproot_from = $("#underGrid_cell_" + color + "_" + uproot_x + "_" + uproot_y).attr("from");
											var abort = 0;
										
											while ((abort < 100) && !((uproot_x === end_x) && (uproot_y === end_y))) {
												var uproot_coordinates = pathFrom(uproot_from, uproot_x, uproot_y);
												var uproot_x = uproot_coordinates[0];
												var uproot_y = uproot_coordinates[1];

												$("#underGrid_cell_" + color + "_" + uproot_x + "_" + uproot_y).attr("path",unit);
												// console.log("uprooting: " + uproot_x + ", " + uproot_y + " ; abort: " + abort);
												var uproot_from = $("#underGrid_cell_" + color + "_" + uproot_x + "_" + uproot_y).attr("from");
												abort++;
											}
										}
								}

							//collector?
								if ($("#overGrid_cell_" + end_x + "_" + end_y).find(".collector[color='" + color + "']").length) {
									window.score++;
									$("#scoreInner").text(window.score);

									$("#endpoint_" + unit).remove();
									$(".underGrid_cell[path='" + unit + "']:not(.underGrid_collector):not([x='" + start_x + "'][y='" + start_y + "'])").attr("color","");
									$(".underGrid_cell[path='" + unit + "']:not([x='" + start_x + "'][y='" + start_y + "'])").attr("path","").attr("from","").attr("to","");
									
									$(robot).attr("direction","collected").addClass("collected");
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
							do {
								var cell = possibleCells[Math.floor(Math.random() * possibleCells.length)];
								var x = cell[0];
								var y = cell[1];
								attempt++;

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
							}
							while (!isEmptyOverGrid(color,x,y) && (!isEmptyOverGrid(color,x - 1,y) || direction === "right") && (!isEmptyOverGrid(color,x + 1,y) || direction === "left") && (!isEmptyOverGrid(color,x,y - 1) || direction === "bottom") && (!isEmptyOverGrid(color,x,y + 1) || direction === "top") && (attempt < 9));
						}
						while ($(".robot[x='" + x + "'][y='" + y + "']").length);

						if (attempt < 10) {
							var lastRobot = Number(String($(".robot").last().attr("id")).replace("robot_",""));
							
							var newRobot = lastRobot + 1;

							if (!newRobot) {
								newRobot = 1;
							}

							var pre_coordinates = pathTo(direction,x,y);
							var pre_x = pre_coordinates[0];
							var pre_y = pre_coordinates[1];
						
							$("#overGrid").append("<div id='robot_" + newRobot + "' class='robot' color='" + color + "' x='" + pre_x + "' y='" + pre_y + "' direction='" + direction + "' style='top: " + (pre_y * 10) + "%; left: " + (pre_x * 10) + "%'><div id='endpoint_" + newRobot + "' class='endpoint' color='" + color + "' x='" + pre_x + "' y='" + pre_y + "'></div></div>");
						}
					}
			}

});