$(document).ready(function() {

	//---data---//
		//---redo---//
			var maxRedo = 3; //set how many times should the program try to redo a shift with not enough skill coverage

		//---people---//
			/* 	arrayPeople[0] is the name;
				arrayPeople[1] are the shifts available (in this case, I only created 7 shifts);
				arrayPeople[2] are languages (in this case, I only did 4 languages);
				arrayPeople[3] is number of scheduled shifts (starts at 0);
				arrayPeople[4] is color */
			
			var arrayPeople = [
				["max",[0,1,2,3,4],["ruby","javascript","html/css"],0,"red"],
				["james",[0,1,2,3,4,5,6],["php","javascript","html/css"],0,"lightblue"],
				["dan",[0,2,3,4,5],["html/css"],0,"orange"],
				["liz",[2,3,4,5,6],["php","html/css"],0,"purple"],
				["alex",[0,1,3,4,5,6],["javascript","html/css"],0,"maroon"],
				["jon",[0,3,4,6],["html/css"],0,"green"],
				["jenn",[1,2,3,4,5],["html/css","php","javascript"],0,"lightgreen"],
				["felicia",[2,3,4,6],["ruby"],0,"blue"],
				["ayelet",[0,1,2,3],["javascript"],0,"magenta"],
				["lyndsey",[0,1,4,5],["php"],0,"yellow"]
			];



		//---shifts---//
			var maxShifts = 3; //set maximum number of shifts per person

			/* 	arrayShifts[0] is a boolean for each language (which we'll set 0);
				arrayShifts[1] represents the open slots during that shift */
			
			var arrayShifts = [
				[[],["","","",""]], //shift 0
				[[],["","",""]], //shift 1
				[[],["","",""]], //shift 2
				[[],["","",""]], //shift 3
				[[],["","",""]], //shift 4
				[[],["","","",""]], //shift 5
				[[],["","","","",""]] //shift 6
			];

		//---languages---//
			var arrayLanguages = ["html/css","javascript","ruby","php"];

			/* 	in order to ensure the number of language booleans in arrayShifts[0] reflects the number of languages,
				we'll cycle through both loops and create a whole bunch of zeroes */

		
			for (var a = 0; a < arrayShifts.length; a++) { //for each shift
				for (var b = 0; b < arrayLanguages.length; b++) { //create a 0 for each language		
					arrayShifts[a][0][b] = 0; //basically, an array of zeroes within each arrayShift[?][0]
				}
			}
			
			var blankSchedule = arrayShifts.toString();
				console.log(blankSchedule);

	//---scheduling---//
		for (var i = 0; i < arrayShifts.length; i++) { //go through each shift
			var redo = 0; //set a count to know how many times we've tried to redo the whole shift

			while (redo < maxRedo) { //we'll try up to 3 times to get this shift right
			
			//---try to schedule---//
				for (var j = 0; j < arrayShifts[i][1].length; j++) { //go through each open slot during that shift
						console.log("SHIFT #" + i + ", SLOT #" + j + " (DO #" + redo + ")");

					var person = Math.floor(Math.random() * arrayPeople.length); //choose randomly between 0 and the # of people
						console.log("random selection; attempt #0 :\nperson " + person);
					var count = 0; //set a count to know when we've checked all people

					while ((arrayShifts[i][1][j].length === 0) && (count < arrayPeople.length)) { //while the slot is empty and there are still people to check

						//---availability-based scheduling---//
							var arrayAvailability = arrayPeople[person][1]; //get person's availability
							var arraySkills = arrayPeople[person][2]; //get person's skills

							if (!(arrayAvailability.indexOf(j) > -1)) { //if person is not available then
								person = person + 1; //go to next person
								if (person > (arrayPeople.length - 1)) { //or cycle back to the beginning
									person = 0;
								}
								count = count + 1; //increase the count
									console.log("not available; attempt #" + count + " :\nperson " + person);
							}

							else if (arrayShifts[i][1].indexOf(person) > -1) { //if the person is already working
								person = person + 1; //go to next person
								if (person > (arrayPeople.length - 1)) { //or cycle back to the beginning
									person = 0;
								}
								count = count + 1; //increase the count
									console.log("already working; attempt #" + count + " :\nperson " + person);
							}

							else if (arrayPeople[person][3] > (maxShifts - 1)) { //if the person is working X or more shifts already
								person = person + 1; //go to next person
								if (person > (arrayPeople.length - 1)) { //or cycle back to the beginning
									person = 0;
								}
								count = count + 1; //increase the count
									console.log("works too much; attempt #" + count + " :\nperson " + person);
							}

						//---skills-based scheduling---//
							else if (redo < (maxRedo - 1)) { //let's look at their skills, unless this is the final redo

								var allCovered = 1; //assume every language is covered
								for (var c = 0; c < arrayLanguages.length; c++) { //then go through the languages
									if (arrayShifts[i][0][c] === 0) { //if any of them aren't covered
										allCovered = 0; //we have a problem
											console.log("(we need " + arrayLanguages[c] + ")");
									}
								}

								if (allCovered === 0) { //if there are still languages not covered during this shift
									var isGood = 0; //assume the person can't help

									for (var d = 0; d < arrayLanguages.length; d++) { //cycle through the languages
										if ((arrayShifts[i][0][d] === 0) && (arraySkills.indexOf(arrayLanguages[d]) > -1)) { //if the person knows a language not covered
											isGood = 1; //person is good
												console.log("knows " + arrayLanguages[d]);
										}
									}
								}

								else {
									isGood = 1; //otherwise, anybody can do it
										console.log("all languages covered");
								}

								if (isGood === 0) { //if we need somebody else
									person = person + 1; //go to next person
									if (person > (arrayPeople.length - 1)) { //or cycle back to the beginning
										person = 0;
									}
									count = count + 1; //increase the count
										console.log("can't help us; attempt #" + count + " :\nperson " + person);
								}

								else { //but if we're successful
									arrayShifts[i][1][j] = person; //put that person on the shift!
									arrayPeople[person][3] = arrayPeople[person][3] + 1; //add 1 to their # of scheduled shifts

									for (var e = 0; e < arrayLanguages.length; e++) { //for each language
										if (arraySkills.indexOf(arrayLanguages[e]) > -1) { //if that language is in the person's skillset
											arrayShifts[i][0][e] = 1; //switch the boolean to true to show that language is accounted for during this shift
										}
									}
										console.log("is working!");
								}
							}

							else { //final redo, we'll take anyone available
								arrayShifts[i][1][j] = person; //put that person on the shift!
								arrayPeople[person][3] = arrayPeople[person][3] + 1; //add 1 to their # of scheduled shifts

								for (var e = 0; e < arrayLanguages.length; e++) { //for each language
									if (arraySkills.indexOf(arrayLanguages[e]) > -1) { //if that language is in the person's skillset
										arrayShifts[i][0][e] = 1; //switch the boolean to true to show that language is accounted for during this shift
									}
								}
									console.log("is working! (desperate final redo)");
							}
					}

					if (arrayShifts[i][1][j].length === 0) { //if we couldn't find anyone
						arrayShifts[i][1][j] = -1; //set that shift to -1
							console.log("no one can take it");
					}
				}

			//---check skill coverage---//
				var coveredCount = 0; //let's see if all languages are covered

				for (var r = 0; r < arrayLanguages.length; r++) { //for each language
					if(arrayShifts[i][0][r] === 1) { //if it's covered
						coveredCount = coveredCount + 1; //add to the count
					}
				}

					console.log(coveredCount + " out of " + arrayLanguages.length + " languages covered");

				if ((coveredCount < arrayLanguages.length) && (redo < (maxRedo - 1))) { //if there are fewer languages covered than languages total (and this isn't the final redo)
					for (var s = 0; s < arrayLanguages.length; s++) { //reset the language booleans
						arrayShifts[i][0][s] = 0;
					}

					for (var t = 0; t < arrayShifts[i][1].length; t++) { //for each slot within that shift
						var unPerson = arrayShifts[i][1][t]; //get the person working that slot
							console.log("unPerson is " + unPerson);
						if(unPerson > -1) { //if it's a real person
							arrayPeople[unPerson][3] = arrayPeople[unPerson][3] - 1; //take one away from their # scheduled shifts
						}
						arrayShifts[i][1][t] = ""; //empty that slot
					}

					redo = redo + 1; //redo it!
						console.log("scrapping all of shift " + i);
				}
				else { //otherwise, take whatever we've got
					redo = maxRedo; //moving on
				}

			}
		}

	//---displaying---//
		for (var k = 0; k < arrayShifts.length; k++) { //for each shift

			var coveredLanguages = [];

			for (var l = 0; l < arrayLanguages.length; l++) {
				if (arrayShifts[k][0][l] === 1) {
					coveredLanguages.push(arrayLanguages[l]);
				}
			}

			$("#schedule").append('<div class="shift" id="shift_' + k + '"><div class="title">SHIFT ' + k + ': <span class="skills">' + coveredLanguages.toString() + '</span></div></div>'); //create a block with shift # and covered languages

			for (var m = 0; m < arrayShifts[k][1].length; m++) { //for each slot
				var worker = arrayShifts[k][1][m]; //get # of worker

				if (worker === -1) { //nobody
					var name = "???";
					var languages = "???";
					var color = "white";
				}
				else { //somebody
					var name = arrayPeople[worker][0];
					var languages = arrayPeople[worker][2].toString();
					var color = arrayPeople[worker][4];
				}

				$("#shift_" + k).append('<div class="slot" style="background-color:' + color + '"><span class="name">' + name + '</span><span class="languages">' + languages + '</span></div>'); //create a slot with the person's name and languages
			}
		}

});