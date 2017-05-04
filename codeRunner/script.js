$(document).ready(function() {

	/* colorText */		
		window.colorText = function(text) {
			if (text.length) {
				text = text.replace(/(\<br\>|\<\/br\>)/g,"\n");
				
				function grayizer(text) {
					text = " " + text;

					var position = 0;
					var startPosition = Number(text.indexOf("/*",position)); // find next comment start
					if (startPosition < 0) { startPosition = false; }
					var loop = 0;

					while ((startPosition > position) && (loop < 100)) { //loop through up to 100 times
						endPosition = text.indexOf("*/", startPosition + 2); //find the comment end
						if (endPosition < 0) {
							endPosition = text.length;
						}
						var before = text.slice(0, startPosition) || ""; //split into before...
						var between = text.slice(startPosition, Math.min(endPosition + 2, text.length)) || ""; //...between...
						var after = text.slice(endPosition + 2, text.length) || ""; //and after sections
						text = before + "<span graytext>" + between + "</span graytext>" + after; //recombine them with <span>
						position = endPosition + 32;

						if (position >= text.length) {
							break;
						}
						else {
							startPosition = text.indexOf("/*",position) || false; //find next comment start
							loop++;
						}
					}

					text = text.replace(/\/\/(.*?)(\n|\<br\>|$)/g,"<span graytext>//$1</span graytext>$2"); //regex for regular double-slash comments

					return text.substring(1);
				}

				function yellowizer (text) {
					text = " " + text;

					var position = 0;
					var dqPosition = Number(text.indexOf("\"",position)); // find next double quote
					if (dqPosition < 0) { dqPosition = false; }
					var sqPosition = Number(text.indexOf("\'",position)); // find next single quote
					if (sqPosition < 0) { sqPosition = false; }
					var loop = 0;

					while (((dqPosition > position) || (sqPosition > position)) && (loop < 100)) { //loop through up to 100 times
						if ((dqPosition > position) && (sqPosition > position)) { //determine which is closer
							if (dqPosition < sqPosition) { //double quote
								var type = "double";							
							}
							else if (sqPosition < dqPosition) { //single quote
								var type = "single";
							}
						}
						else if (dqPosition > position) { //double quote (same as above)
							var type = "double";	
						}
						else if (sqPosition > position) { //single quote (same as above)
							var type = "single";
						}
						else {
							var type = "none";
						}

						if (type === "double") {
							if ((text.indexOf("</span graytext>", dqPosition) < text.indexOf("<span graytext>", dqPosition)) || ((text.indexOf("<span graytext>", dqPosition) === -1) && (text.indexOf("</span graytext>", dqPosition) > 0))) { //if quote is within a graytext section
								type = "none";
								position = dqPosition + 1;
							}
						}
						else if (type === "single") {
							if ((text.indexOf("</span graytext>", sqPosition) < text.indexOf("<span graytext>", sqPosition)) || ((text.indexOf("<span graytext>", sqPosition) === -1) && (text.indexOf("</span graytext>", sqPosition) > 0))) { //if quote is within a graytext section
								type = "none";
								position = sqPosition + 1;
							}
						}

						if (type === "double") {
							var attempt = dqPosition;
							do {
								eqPosition = text.indexOf("\"", attempt + 1); //get the next end quote
								if (eqPosition < 0) {
									eqPosition = text.length; //default to the end of the text
								}

								var close = text.indexOf("</span graytext>", eqPosition);
								if (close < 0) {
									close = text.length;
								}

								var open = text.indexOf("<span graytext>", eqPosition);
								if (open < 0) {
									open = text.length;
								}

								attempt = eqPosition;
							}
							while ((close < open) && (attempt < text.length))

							var before = text.slice(0, dqPosition); //split into before...
							var between = text.slice(dqPosition, eqPosition + 1); //...between...
							var after = text.slice(eqPosition + 1, text.length); //...and after sections
							text = before + "<span yellowtext>" + between + "</span>" + after; //recombine them with <span>
							position = eqPosition + 25; //move up 25 characters (length of <span yellowtext></span>, plus 1)
						}
						else if (type === "single") {
							var attempt = sqPosition;
							do {
								eqPosition = text.indexOf("\'", attempt + 1); //get the next end quote
								if (eqPosition < 0) {
									eqPosition = text.length; //default to the end of the text
								}

								var close = text.indexOf("</span graytext>", eqPosition);
								if (close < 0) {
									close = text.length;
								}

								var open = text.indexOf("<span graytext>", eqPosition);
								if (open < 0) {
									open = text.length;
								}

								attempt = eqPosition;
							}
							while ((close < open) && (attempt < text.length))

							var before = text.slice(0, sqPosition); //split into before...
							var between = text.slice(sqPosition, eqPosition + 1); //...between...
							var after = text.slice(eqPosition + 1, text.length); //...and after sections
							text = before + "<span yellowtext>" + between + "</span>" + after; //recombine them with <span>
							position = eqPosition + 25; //move up 25 characters (length of <span yellowtext></span>, plus 1)
						}


						dqPosition = text.indexOf("\"",position) || false; //find next double quote
						sqPosition = text.indexOf("\'",position) || false; //find next single quote
						loop++;
					}

					return text.substring(1);
				}

				function rgbopizer(text) {
					/* math(old) */	//text = text.replace(/(^|\{|\[|\(|\.|\s|\d|\w|\n)(\%|\-|\-\-|\+|\+\+|\*|\*\*|\-\=|\+\=|\*\=|\/\=|\%\=|\!|\!\=|\!\=\=|\=|\=\=|\=\=\=|\&\&|\|\||\\+)(\d|\w|\s|\.|\,|\)|\]|\}|\;|\:|$)/g,"$1<span redtext>$2</span>$3");
					/* math */		text = text.replace(/(\%|\-|\-\-|\+|\+\+|\*|\*\*|\-\=|\+\=|\*\=|\/\=|\%\=|\!|\!\=|\!\=\=|\=|\=\=|\=\=\=|\&\&|\|\||\\+)/g,"<span redtext>$1</span>");
					/* < = > */ 	text = text.replace(/(^|\{|\[|\(|\.|\s|\n)(\<+|\>+|&amp;|&amp;&amp;|&lt;|&gt;|&lt;&lt;|&gt;&gt;|&lt;&lt;&lt;|&gt;&gt;&gt;|\=&lt;|\=&gt;|&lt;\=|&gt;\=|&lt;\=\=|\=\=&gt;)(\s|\.|\,|\)|\]|\}|\;|\:|$)/g,"$1<span redtext>$2</span>$3");
					/* logic */		text = text.replace(/(^|\{|\[|\(|\.|\s|\n)(else\ if|if|else|return|typeof|switch|case|break|default|new|for|while|\$|const|do|continue|try|catch|throw|finally|this|in|instanceof)(\s|\.|\,|\)|\]|\}|\;|\:|$)/g,"$1<span redtext>$2</span>$3");
					/* booleans */	text = text.replace(/(^|\{|\[|\(|\s|\n)(true|false|null)(\s|\.|\,|\)|\(|\]|\}|\;|\:|$)/g,"$1<span purpletext>$2</span>$3");
					/* types */		text = text.replace(/(^|\{|\[|\(|\s|\n)(Math|Number|String|Object|function|var|eval|Date|Error|Array)(\s|\.|\,|\)|\(|\]|\}|\;|\:|$)/g,"$1<span bluetext>$2</span>$3");

					/* misc */		text = text.replace(/(\.)(caller|callee|decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|escape|eval|exec|length|log|parse|parseFloat|parseInt|pull|test|toArray)(\s|\.|\,|\)|\(|\]|\}|\;|\:|$)/g,"$1<span bluetext>$2</span>$3");
					/* arrays */	text = text.replace(/(\.)(concat|copyWithin|every|fill|filter|find|findIndex|forEach|indexOf|isArray|join|lastIndexOf|map|pop|push|reduce|reduceRight|reverse|shift|slice|some|sort|splice|toString|unshift|valueOf)(\s|\.|\,|\)|\(|\]|\}|\;|\:|$)/g,"$1<span bluetext>$2</span>$3");
					/* numbers */	text = text.replace(/(\.)(isFinite|isInteger|isNaN|isSafeInteger|toExponential|toFixed|toPrecision|toString|valueOf)(\s|\.|\,|\)|\(|\]|\}|\;|\:|$)/g,"$1<span bluetext>$2</span>$3");
					/* math */		text = text.replace(/(\.)(abs|acos|asin|atan|atan2|ceil|cos|exp|floor|log|max|min|pow|random|round|sin|sqrt|tan)(\s|\.|\,|\)|\(|\]|\}|\;|\:|$)/g,"$1<span bluetext>$2</span>$3");
					/* strings */	text = text.replace(/(\.)(charAt|charCodeAt|concat|endsWith|fromCharCode|includes|indexOf|lastIndexOf|localeCompare|match|repeat|replace|search|slice|split|startsWith|substr|substring|toLocaleLowerCase|toLocaleUpperCase|toLowerCase|toString|toUpperCase|trim|valueOf)(\s|\.|\,|\)|\(|\]|\}|\;|\:|$)/g,"$1<span bluetext>$2</span>$3");
					/* dates */		text = text.replace(/(\.)(getDate|getDay|getFullYear|getHours|getMilliseconds|getMinutes|getMonth|getSeconds|getTime|setDate|setFullYear|setHours|setMilliseconds|setMinutes|setMonth|setSeconds|setTime|getUTCDate|getUTCDay|getUTCFullYear|getUTCHours|getUTCMilliseconds|getUTCMinutes|getUTCMonth|getUTCSeconds)(\s|\.|\,|\)|\(|\]|\}|\;|\:|$)/g,"$1<span bluetext>$2</span>$3");
				
					/* numbers */	text = text.replace(/(^|-|\-|\{|\[|\(|\s|\,|[\-|\+|\!|\/|\*|\=]\<\/span\>|\n)(\d*\.)?(\d+)(\s|\.|\,|\)|\]|\}|\;|\:|$)/g,"$1<span purpletext>$2$3</span>$4");
					/* again */		text = text.replace(/(^|-|\-|\{|\[|\(|\s|\,|[\-|\+|\!|\/|\*|\=]\<\/span\>|\n)(\d*\.)?(\d+)(\s|\.|\,|\)|\]|\}|\;|\:|$)/g,"$1<span purpletext>$2$3</span>$4");
					
					/* functions */	text = text.replace(/([a-zA-Z0-9_]+)(\s?\<span\ redtext\>\=\<\/span\>\s?)(\<span\ bluetext\>function\<\/span\>\s?)\((\s?[a-zA-Z0-9_,\s]*?\s?)\)/g,"<span greentext>$1</span>$2$3(<span orangetext>$4</span>)");
					/* functions */	text = text.replace(/(\s?\<span\ bluetext\>function\<\/span\>\s?)([a-zA-Z0-9_]*\s?)\((\s?[a-zA-Z0-9_,\s]*?\s?)\)/g,"$1<span greentext>$2</span>(<span orangetext>$3</span>)");
					/* functions */ text = text.replace(/([a-zA-Z0-9_]+)(\s?\:\s?)(\<span\ bluetext\>function\<\/span\>\s?)/g,"<span greentext>$1</span>$2$3");

					return text;
				}
				
				text = rgbopizer(yellowizer(grayizer(text)));
				return text;

			}
			else {
				return "";
			}
		}

	/* eval_code */
		window.logs = [];
		window.consoleLog = function(line, log) {
			window.logs.push(line + ":: " + log);
		}

		window.lines = [];
		window.lineLog = function(log) {
			window.lines.push(log);
		}

		window.evaluating = false;
		window.eval_code = function() {
			if (!window.evaluating) {
				//reset
					window.evaluating = true;
					$("#console").empty();

				//get code and inputs
					window.code = $("#code").html().replace(/<\\? ?br ?\\?>/g,"\n").replace(/<\/([^>]+)>/ig,"").replace(/(<([^>]+)>)/ig,"\n").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
					window.code = window.code.split("\n");

					window.inputs = $("#inputs").html().replace(/<\\? ?br ?\\?>/g,"\n").replace(/(<([^>]+)>)/ig,"").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/\s/g,"");
					window.values = $("#values").html().replace(/<\\? ?br ?\\?>/g,"\n").replace(/(<([^>]+)>)/ig,"").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");

				//clean up code and add path following logs
					for (var line = 0; line < window.code.length; line++) {
						if (window.code[line].replace(/[\n\s\t\}\;\)\,\]]/g,"").length === 0) {
							//no executable code - just space / close brackets
						}
						else if (window.code[line].replace(/[\s]*?\/\/.*?$/g,"").length === 0) {
							//no executable code - just //comments
						}
						else if (window.code[line].replace(/[\s]*?\/\*[^\*\/]*?\*\/[\s]*?$/g,"").length === 0) {
							//no executable code - just /* comments */
						}
						else if ((/^[\s]*[a-zA-Z0-9_\"\']*\:[\s]*[a-zA-Z0-9_\"\']\,?[\s]*$/g).test(window.code[line])) {
							//object
						}
						else if ((/^[\s]*catch/g).test(window.code[line])) {
							//catch block
							window.code[line] = window.code[line].replace(/catch[\s]*\(([a-zA-Z0-9_\"\'])\)[\s]*\{/g, "catch ($1) { \nwindow.lineLog(" + line + ");\n").replace(/console\.log\(/g,"window.consoleLog(" + line + ",");
						}
						else if ((/^[\s]*finally/g).test(window.code[line])) {
							//finally block
							window.code[line] = window.code[line].replace(/finally[\s]*\{/g, "finally { \nwindow.lineLog(" + line + ");\n").replace(/console\.log\(/g,"window.consoleLog(" + line + ",");
						}
						else if ((/^[\s]*else/).test(window.code[line])) {
							//else or else if
							window.code[line] = ("else if (window.lineLog(" + line + ")) {}\n") + window.code[line].replace(/console\.log\(/g,"window.consoleLog(" + line + ",");
						}
						else if ((/^[\s]*(case|default)/).test(window.code[line])) {
							// case or default
							window.code[line] = ("case (window.lineLog(" + line + ")):\nbreak;\n") + window.code[line].replace(/console\.log\(/g,"window.consoleLog(" + line + ",");
						}
						else {
							//normal code
							window.code[line] = ("window.lineLog(" + line + ");\n") + window.code[line].replace(/console\.log\(/g,"window.consoleLog(" + line + ",");
						}
					}

				//execute code
					try {
						window.output = eval("function codeRunner(" + window.inputs + ") {" + window.code.join("\n") + "} \n " + "codeRunner(" + window.values + ");");
						console.log(window.output);
					}
					catch (error) {
						window.output = "";
						$("#console").html("//" + error + "<br>");
					}

				//display code, logs, output, errors
					console.log(window.lines);
					console.log(window.logs);
					console.log(window.code);
					window.code = window.code.join("\n").replace(/else\ if\ \(window\.lineLog\([\d]*\)\)\ \{\}\n/g,"").replace(/case\ \(window\.lineLog\([\d]*\)\):\nbreak\;\n/g,"").replace(/window\.lineLog\([\d]*\);\n/g,"").replace(/window\.consoleLog\([\d]*\,/g,"console.log(");
					window.code = window.code.split("\n");

					$("#code").prop("contenteditable",false).closest(".field_frame").removeClass("active");
					$("#inputs").prop("contenteditable",false).closest(".field_frame").removeClass("active");
					$("#values").prop("contenteditable",false).closest(".field_frame").removeClass("active");

					window.loop = setInterval(function() {
						if (window.lines.length > 0) {
							console.log(window.code[window.lines[0]]);
							$("#code").html(window.colorText(window.code.slice(0,window.lines[0]).join("\n").replace(/\n/g,"<br>")) + (window.lines[0] > 0 ? "<br>" : "") + "<div class='live_line'>" + window.colorText(window.code[window.lines[0]]) + "</div>");
							
							var log = window.logs.find(function(l) { return Number(l.substring(0,l.indexOf("::"))) === window.lines[0];});
							if ((typeof log !== "undefined") && (log !== null)) {
								$("#console").html($("#console").html() + "//" + log + "<br>");
								window.logs.splice(window.logs.indexOf(log),1);
							}
							
							window.lines.shift();
						}
						else {
							$("#code").html(window.colorText(window.code.join("\n")));
							$("#output").text(window.output || "");

							window.logs = [];
							window.lines = [];
							clearInterval(window.loop);

							setTimeout(function() {
								$("#inputs").text(window.inputs).prop("contenteditable",true).closest(".field_frame").addClass("active");
								$("#values").text(window.values).prop("contenteditable",true).closest(".field_frame").addClass("active");
								$("#code").text(window.code.join("\n")).prop("contenteditable",true).closest(".field_frame").addClass("active");
								window.evaluating = false;
							},3000);
						}
					},1000);
			}
		}

});