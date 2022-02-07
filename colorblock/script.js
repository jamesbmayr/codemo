window.addEventListener("load",runprogram)
function runprogram() {

	var score = 0 
	var timeremaining = 0 
	var timer = null

	document.getElementById("StartButton").addEventListener("click", showtime)
	document.getElementById("Reset").addEventListener("click", showtime)
	function showtime () {
		document.getElementById("Startscreen").style.display = "none"
		document.getElementById("endscreen").style.display = "none"
		document.getElementById("Timemenu").style.display = "block"

	} 

	document.getElementById("Time30").addEventListener("click", showgame)
	document.getElementById("Time60").addEventListener("click", showgame)
	document.getElementById("Timeinfinite").addEventListener("click", showgame)
	function showgame(event) {
		score = 0 
		document.getElementById("scorenumber").innerText = score
		document.getElementById("Timemenu").style.display = "none"
		document.getElementById("game").style.display = "block"
		buildgrid()
		document.getElementById("ScoreandTime").style.display = "block"
		document.getElementById("return1").style.display = "block"

		var buttonid = event.target.id
		if (buttonid == "Time30"){
			var timelimit = 30 * 1000
			document.getElementById("time").style.display = "inline-block"
		}

		if (buttonid == "Time60"){
			var timelimit = 60 * 1000
			document.getElementById("time").style.display = "inline-block"
		}


		if (buttonid == "Timeinfinite"){
			var timelimit = 9999999999999999 * 1000
			document.getElementById("time").style.display = "none"
		}

		timeremaining = timelimit
		document.getElementById("seconds").innerText = timeremaining/1000
		timer = setInterval(displaytimer,1000)

		/*setTimeout(endgame, timelimit)*/
		/*var buttonid = event.target.id 
		document.getElementById("game").innerText = "You Picked " + buttonid*/ 
	}

	function buildgrid(){
		var numberofrows = 7
		var numberofcolumns = 7

		var game = document.getElementById("game")
		game.innerHTML = ""

		var slider = document.getElementById("coloroffset")
		var offset= Number(slider.value)
		var colors = generatecolors(offset)
		/*var row = document.createElement("div")
		row.className = "row"
		game.appendChild(row)*/


		for (var y = 0; y < numberofrows; y = y + 1){
			var row = document.createElement("div")
			row.className = "row"
			game.appendChild(row)

			for(var x = 0; x < numberofcolumns; x = x + 1){
				var cell = document.createElement("div")
				cell.className = "cell"
				cell.style.background = colors[0]
				row.appendChild(cell)
			}

		}

		var allcells = document.getElementsByClassName("cell")
		var specialcell = pickrandom(allcells)
		specialcell.style.background = colors[1]
		specialcell.addEventListener("click", clickdifferent)
	}

	function generatecolors(offset){ 
		var red = generatenumber(0+offset,255-offset)
		var green = generatenumber(0+offset,255-offset)
		var blue = generatenumber(0+offset,255-offset)
		var randomcolor = "rgb(" + red + "," + green + "," + blue + ")"

		var otherred = red + pickrandom([offset , -offset])
		var othergreen = green + pickrandom([offset , -offset])
		var otherblue = blue + pickrandom([offset , -offset])
		var othercolor = "rgb(" + otherred + "," + othergreen + "," + otherblue + ")"
		return [randomcolor, othercolor]
	}

	function generatenumber(start,end){
		var range = end - start
		var randomnumber = Math.random() * range 
		randomnumber = Math.floor(randomnumber)
		randomnumber = randomnumber + start
		return randomnumber 
	}

	function pickrandom(list){
		var randomnumber = Math.random() * list.length
		randomnumber = Math.floor(randomnumber)
		return list[randomnumber]

	}

	function displaytimer(){
		if (timeremaining > 0) {
			timeremaining = timeremaining - 1000
			document.getElementById("seconds").innerText = timeremaining/1000
		}
		else{
			endgame()
			clearInterval(timer)
		} 
	}

	function clickdifferent(){
		score = score + 1
		document.getElementById("scorenumber").innerText = score
		buildgrid()
		/*console.log("You did it")*/
	}

	function endgame(){
		document.getElementById("endscreen").style.display = "block"
		document.getElementById("finalscore").innerText = score
		document.getElementById("game").style.display = "none"
		document.getElementById("ScoreandTime").style.display = "none"
		document.getElementById("return1").style.display = "none"
	}

	function goback(){
		clearInterval(timer)
		endgame()
		showtime()
	}

	document.getElementById("Return2").addEventListener("click", goback)


}
