$(document).ready(function() {

	//---projects---//
		var projectsArray = [
			["Underblue","underblue","http://officialunderblue.com"],
			["Sounddrawn","sounddrawn","http://rawgit.com/jamesbmayr/music/master/"],
			["Clevernacular","clevernacular","http://clevernacular.tumblr.com"],
			["Lexpose","lexpose","http://www.writerscafe.org/jamesbmayr/writing"],
			["Chalice","chalice","https://www.kickstarter.com/projects/jamesbmayr/chalice-the-card-game/description"],
			["It's Who Iamb","itswhoiamb","http://itswhoiamb.tumblr.com/"],
			["The Deathmakers' Symphony","thedeathmakerssymphony","https://soundcloud.com/jamesmayr/sets/the-deathmakers-symphony"],
			["Wribbon","wribbon","https://drive.google.com/folderview?id=0B3Pd_099FSXVQlZ3LWpoR0hQVmc&usp=sharing"],
			["Lampposts of the World","lamppostsoftheworld","http://www.panoramio.com/group/586700/photos"],
			["DreamHatcher Games","dreamhatchergames","http://sites.google.com/site/dreamhatchergames"],
			["Portmantoasters","portmantoasters","http://portmantoasters.tumblr.com"],
			["Explorchestra","explorchestra","http://facebook.com/buexplorchestra"],
			["Apollo","apollo","http://facebook.com/apollo.feeney.mayr"],
			["Codemo","codemo","https://rawgit.com/jamesbmayr/codemo/master/"]
		];

	//---social---//
		var socialArray = [
			["Gmail","email","mailto:jamesbmayr@gmail.com"],
			["LinkedIn","linkedin","https://linkedin.com/in/jamesbmayr"],
			["Soundcloud","soundcloud","https://soundcloud.com/jamesmayr"],
			["Github","github","https://github.com/jamesbmayr"]
		];

	//---shuffle---//
		var shuffle = function(inputArray) {
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

	//---display---//
		var display = function(inputArray, displayClass) {
			for (var i = 0; i < inputArray.length; i++) {
				$("#container").append('<a class="' + displayClass + '" id="' + inputArray[i][1] + '" href="' + inputArray[i][2] + '" target="_blank" style="background-image: url(images/' + inputArray[i][1] + '.png)"></a>');
			}
		}
	
	//---execute---//
		display(shuffle(socialArray), "social");
		display(shuffle(projectsArray), "project");

});