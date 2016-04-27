$(document).ready(function(){
	//---GET---//
		var GET = function GET(index) {
			var urlquery = decodeURIComponent(window.location.search.substring(1)),
				urlvariables = urlquery.split('&'),
				index,
				k;

			for (k = 0; k < urlvariables.length; k++) {
				urlparameter = urlvariables[k].split('=');

				if (urlparameter[0] === index) {
					return urlparameter[1] === undefined ? true : urlparameter[1];
				}
			}
		};

	//---dimensions---//
		if(Number(GET("x")) > 0) {
			var x = Number(GET("x"));
		}
		else {
			var x = 20;
		}

		if(Number(GET("y")) > 0) {
			var y = Number(GET("y"));
		}
		else {
			var y = 12;
		}

		if(Number(GET("z")) > 0) {
			var z = Number(GET("z"));
		}
		else {
			var z = 40;
		}

	//---build the maze---//
		$('#outerwall').append('<div id="player" class="1010" style="height: '+z+'px; width: '+z+'px; line-height: '+z+'px; font-size: '+(z/2)+'px"><div id="keyCounter"></div></div>')
		var j = 10;
		while (j <= (y+9)) {
			var i = 10;
			while(i <= (x+9)) {
				var chance = Math.floor(Math.random()*10);
				if (chance < 3.5) {
					color = "black";
				}
				else {
					color = "white";
				}

				$('#outerwall').append('<div id="'+j+i+'" class="maze '+color+'" style="height: '+z+'px; width: '+z+'px"></div>');
				i++;
			};
			j++;
		};

		var startSquare = 1010;
		var endSquare = ((y+9)*100) + (x+9);
		$('#'+startSquare).removeClass('black').addClass('white').css('background-color','blue');
		$('#'+endSquare).removeClass('black').addClass('white').css('background-color','green').css('line-height', z+'px').append('<div id="clickCounter" style="font-size: '+(z/2)+'px"></div>');
		$('#outerwall').css('width',x*z);

	//---control the ball---//
		$(document).keyup(function() {
			var keyCount = $('#keyCounter').text();
			keyCount = Number(keyCount) + 1;
			
			var position = $('#player').attr('class');
			switch (event.which) {
				case 37:
					var oneLeft = Number(position) - 1;
					if($('#'+oneLeft).attr('class') == "maze black") {
						//
					}
					else if (oneLeft % 100 < 10) {
						//
					}
					else {
						var newPosition = oneLeft;
						$('#player').css('left', '-='+z+'px');
						$('#player').attr('class',newPosition);
						$('#keyCounter').text(keyCount);
					}
					break;
				case 38:
					var oneUp = Number(position) - 100;
					if($('#'+oneUp).attr('class') == "maze black") {
						//
					}
					else if (oneUp <= 1000) {
						//
					}
					else {
						var newPosition = oneUp;
						$('#player').css('top', '-='+z+'px');
						$('#player').attr('class',newPosition);
						$('#keyCounter').text(keyCount);
					}
					break;
				case 39:
					var oneRight = Number(position) + 1;
					if($('#'+oneRight).attr('class') == "maze black") {
						//
					}
					else if (oneRight % 100 > (x+9)) {
						//
					}
					else {
						var newPosition = oneRight;
						$('#player').css('left', '+='+z+'px');
						$('#player').attr('class',newPosition);
						$('#keyCounter').text(keyCount);
					}
					break;
				case 40:
					var oneDown = Number(position) + 100;
					if($('#'+oneDown).attr('class') == "maze black") {
						//
					}
					else if (oneDown >= ((y+10)*100)) {
						//
					}
					else {
						var newPosition = oneDown;
						$('#player').css('top', '+='+z+'px');
						$('#player').attr('class',newPosition);
						$('#keyCounter').text(keyCount);
					}
					break;
			};

			if ($('#player').attr('class') == (((y+9)*100) + (x+9))) {
				var keyCount = $('#keyCounter').text();
				var clickCount = $('#clickCounter').text();
				$('#outerwall').empty();
				$('#outerwall').css('width','100%');
				$('#outerwall').append('<a id="victory" href="index.html?x='+x+'&y='+y+'&z='+z+'">you won in '+keyCount+' moves & '+clickCount+' clicks!</a>');
			}
		});

	//---click a wall---//
		$('.maze').click(function() {
			var clickCount = $('#clickCounter').text();
			clickCount = Number(clickCount) + 1;
			$(this).toggleClass('black');
			$(this).toggleClass('white');
			$('#clickCounter').text(clickCount);
		});
});