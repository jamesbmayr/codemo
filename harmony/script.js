$(document).ready(function() {
	
	/* execute */
		var progression = getProgression();
		createKeyboard();

		var timer = setInterval(function() {
			var beat = getBeat();
			changeBackground(beat);
			var chord = getChord(beat,progression);
			var pitches = make_chord(chord[1],note2num(chord[0]));
			$("#chordInner").text(String(chord).replace(","," "));
			activateNotes(pitches);
		}, 10);

	/* backup listener */
		$(".key").click(function() {
			if ($(this).hasClass("active")) {
				var audio = $(this).find("audio")[0];
				audio.pause();
				audio.currentTime = 0;
				audio.play();
			}
		});

	/* createKeyboard */
		function createKeyboard() {
			var keyboardKeys = ["C","C#","D","Eb","E","F","F#","G","Ab","A","Bb","B"];

			for (octave = 0; octave < 4; octave++) {
				for (i = 0; i < keyboardKeys.length; i++) {
					var pitch = note2num(keyboardKeys[i]);
					var absolutePitch = (12 * octave) + pitch;
					var playbackRate = Math.pow(2, ((absolutePitch - 9) / 12));
					var newKey = 
						"<button class='key pitch_" + pitch + "' pitch='" + pitch + "' absolutePitch='" + absolutePitch + "' data-rate='" + playbackRate + "'>"
						 + "<audio><source src='tones/" + absolutePitch + ".mp3' type='audio/mpeg'></source></audio>"
						 + keyboardKeys[i] + 
						"</button>";
					$("#keyboard").append(newKey);
				}
				i = 0;
			}
		}

	/* getBeat */
		function getBeat() {
			var date = new Date();
			var time = date.getUTCSeconds() + (date.getUTCMilliseconds() / 1000);
			var beat = Math.floor((128 / 60) * time);
			return beat;
		}

	/* changeBackground */
		function changeBackground(beat) {
			if (beat % 4 === 0) {
				$("body").css("background-color","white");
			}
			else if (beat % 4 === 1) {
				$("body").css("background-color","lightgray");
			}
			else if (beat % 4 === 2) {
				$("body").css("background-color","darkgray");
			}
			else if (beat % 4 === 3) {
				$("body").css("background-color","gray");
			}
		}

	/* getProgression */
		function getProgression() {
			var hash = String(location.hash).replace("#","");
			var progression = [];
			
			switch (Number(hash)) {
				case 1:
					progression = [["D","min7"],["D","min7"],["A","7"],["A","7"],["D","min7"],["D","min7"],["Bb","maj7"],["C","maj7"]];
				break;

				case 2:
					progression = [["C","min"],["G","7"],["Ab","maj"],["Eb","maj"],["C","maj"],["G","7"],["Ab","maj"],["Eb","maj"]];
				break;

				case 3:
					progression = [["A","min"],["F","maj"],["C","maj"],["G","maj"],["A","min"],["F","maj"],["D","maj"],["D","maj"]];
				break;

				case 4:
					progression = [["C","maj"],["Eb","major"],["F","maj"],["Bb","maj"],["C","maj"],["Bb","maj"],["F","maj"],["G","7"]];
				break;

				case 5:
					progression = [["G","min"],["Bb","maj"],["C","min"],["D","maj7"],["G","min"],["Bb","maj"],["C","min"],["D","maj7"]];
				break;

				case 6:
					progression = [["F","maj"],["Bb","min"],["F","maj"],["C","7"],["F","maj"],["Bb","min"],["F","maj"],["C","7"]];
				break;

				case 7:
					progression = [["D","maj7"],["A","7"],["B","min7"],["F#","min7"],["G","maj7"],["D","maj7"],["G","maj7"],["A","7"]];
				break;

				case 8:
					progression = [["G","7"],["D","7"],["E","min7"],["C","7"],["G","7"],["D","7"],["E","min7"],["C","7"]];
				break;

				case 9:
					progression = [["C","maj7"],["E","7"],["F","maj7"],["C","maj7"],["F","maj7"],["F","min7"],["C","maj7"],["G","7"]];
				break;

				default:
					progression = [["G","maj7"],["B","min7"],["G","maj7"],["B","min7"],["E","min7"],["C","maj7"],["G","maj7"],["D","7"]];
			}

			return progression;
		}

	/* getChord */
		function getChord(beat,progression) {
			if ((beat >= 0) && (beat < 8)) {
				var chord = progression[0];
			}
			else if ((beat >= 8) && (beat < 16)) {
				var chord = progression[1];
			}
			else if ((beat >= 16) && (beat < 24)) {
				var chord = progression[2];
			}
			else if ((beat >= 24) && (beat < 32)) {
				var chord = progression[3];
			}
			else if ((beat >= 32) && (beat < 40)) {
				var chord = progression[4];
			}
			else if ((beat >= 40) && (beat < 48)) {
				var chord = progression[5];
			}
			else if ((beat >= 48) && (beat < 56)) {
				var chord = progression[6];
			}
			else if ((beat >= 56) && (beat < 64)) {
				var chord = progression[7];
			}
			else if ((beat >= 64) && (beat < 72)) {
				var chord = progression[0];
			}
			else if ((beat >= 72) && (beat < 80)) {
				var chord = progression[1];
			}
			else if ((beat >= 80) && (beat < 88)) {
				var chord = progression[2];
			}
			else if ((beat >= 88) && (beat < 96)) {
				var chord = progression[3];
			}
			else if ((beat >= 96) && (beat < 104)) {
				var chord = progression[4];
			}
			else if ((beat >= 104) && (beat < 112)) {
				var chord = progression[5];
			}
			else if ((beat >= 112) && (beat < 120)) {
				var chord = progression[6];
			}
			else if ((beat >= 120) && (beat < 128)) {
				var chord = progression[7];
			}

			return chord;
		}

	/* note2num */
		function note2num(note) {
		    switch (note) {
		        case "C":
		            return 0;
		        case "C#":
		        case "Db":
		            return 1;
		        case "D":
		            return 2;
		        case "D#":
		        case "Eb":
		            return 3;
		        case "E":
		            return 4;
		        case "F":
		            return 5; 
		        case "F#":
		        case "Gb":
		            return 6;
		        case "G":
		            return 7;
		        case "G#":
		        case "Ab":
		            return 8;
		        case "A":
		            return 9;
		        case "A#":
		        case "Bb":
		            return 10;
		        case "B":
		            return 11;
		    }
		}

	/* make_chord */
		function make_chord(chord_type, tonic) {
		    // fill out chord
		    var chord = [];
		    switch (chord_type) {
		        case "dim":
		            chord = [0,3,6];
		            break;
		        case "min":
		            chord = [0,3,7];
		            break;
		        case "maj":
		            chord = [0,4,7];
		            break;
		        case "aug":
		            chord = [0,4,8];
		            break;
		        case "dim7":
		            chord = [0,3,6,9];
		            break;
	        	case "halfdim":
		            chord = [0,3,6,10];
		            break;    
		        case "min7":
		            chord = [0,3,7,10];
		            break;    
		        case "minmaj7":
		            chord = [0,3,7,11];
		            break;    
		        case "7":
		            chord = [0,4,7,10];
		            break;    
		        case "maj7":
		            chord = [0,4,7,11];
		            break;    
		        case "aug7":
		            chord = [0,4,8,11];
		            break;    
		        default:
		            chord = [0,4,7];                      
		    }  

		    // transpose chord to correct tonic
		    chord = chord.map(function(note) {
		        return (note + tonic) % 12;
		    })

    		return chord;
		}

	/* activateNotes */
		function activateNotes(pitches) {
			$(".key").removeClass("active");
			for (i = 0; i < pitches.length; i++) {
				$(".key[pitch=" + pitches[i] + "]").addClass("active");
			}

			$(".key").css("width","calc((100vw / " + pitches.length + ") - 10px)");
		}

});
