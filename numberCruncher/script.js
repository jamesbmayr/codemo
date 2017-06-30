$(document).ready(function() {

	/* updateNumber */
		$("input[type='range']").on("change",function() {
			var input = $(this);
			var value = $(input).val();
			var place = $(input).attr("place");

			if ($(".operator.selected").toArray().length == 0) {
				$(".numbers.first .digit[place='" + place + "']").text(value);	
			}
			else {
				$(".numbers.second .digit[place='" + place + "']").text(value);
			}
		});

	/* selectOperator */
		$(".operator").on("click",function() {
			var operator = $(this);

			if ($(operator).hasClass("selected")) {
				$(".operator").removeClass("selected");
				$("#equals").text("C");

				$(".numbers.first .digit").each(function() {
					var digit = $(this);
					var value = $(digit).text();
					var place = $(digit).attr("place");

					$("input[type='range'][place='" + place + "']").val(value);
				});
			}
			else {
				$(".operator").removeClass("selected");
				$(operator).addClass("selected");
				$("#equals").text("=");

				$(".numbers.second .digit").each(function() {
					var digit = $(this);
					var value = $(digit).text();
					var place = $(digit).attr("place");

					$("input[type='range'][place='" + place + "']").val(value);
				});
			}
		});

	/* selectNegative */
		/* selectOperator */
		$(".negative").on("click",function() {
			if (!$(this).hasClass("selected")) {
				$(this).addClass("selected").text("-");
			}
			else {
				$(this).removeClass("selected").text("+");
			}
		});

	/* crunchNumbers */
		$("#equals").on("click",function() {
			var operator = $(".operator.selected").attr("id");

			if ((typeof operator == "undefined") || (!operator)) {
				//reset
					$(".digit").text("0");
					$(".negative").removeClass("selected").text("+");
					$(".operator.selected").removeClass("selected");
					$("input[type='range']").val(0);
			}
			else {
				//firstNumber
					var millions = 1000000 * (Number($(".numbers.first .digit[place='millions']").text()) || 0);
					var hundred_thousands = 100000 * (Number($(".numbers.first .digit[place='hundred_thousands']").text()) || 0);
					var ten_thousands = 10000 * (Number($(".numbers.first .digit[place='ten_thousands']").text()) || 0);
					var thousands = 1000 * (Number($(".numbers.first .digit[place='thousands']").text()) || 0);
					var hundreds = 100 * (Number($(".numbers.first .digit[place='hundreds']").text()) || 0);
					var tens = 10 * (Number($(".numbers.first .digit[place='tens']").text()) || 0);
					var ones = 1 * (Number($(".numbers.first .digit[place='ones']").text()) || 0);
					var tenths = 0.1 * (Number($(".numbers.first .digit[place='tenths']").text()) || 0);
					var hundredths = 0.01 * (Number($(".numbers.first .digit[place='hundredths']").text()) || 0);
					var thousandths = 0.001 * (Number($(".numbers.first .digit[place='thousandths']").text()) || 0);
					var ten_thousandths = 0.0001 * (Number($(".numbers.first .digit[place='ten_thousandths']").text()) || 0);
					var hundred_thousandths = 0.00001 * (Number($(".numbers.first .digit[place='hundred_thousandths']").text()) || 0);
					var millionths = 0.000001 * (Number($(".numbers.first .digit[place='millionths']").text()) || 0);

					var firstNumber = Number(millions + hundred_thousands + ten_thousands + thousands + hundreds + tens + ones + tenths + hundredths + thousandths + ten_thousandths + hundred_thousandths + millionths);
					if ($(".numbers.first .negative").hasClass("selected")) {
						firstNumber = firstNumber * -1;
					}

				//secondNumber
					var millions = 1000000 * (Number($(".numbers.second .digit[place='millions']").text()) || 0);
					var hundred_thousands = 100000 * (Number($(".numbers.second .digit[place='hundred_thousands']").text()) || 0);
					var ten_thousands = 10000 * (Number($(".numbers.second .digit[place='ten_thousands']").text()) || 0);
					var thousands = 1000 * (Number($(".numbers.second .digit[place='thousands']").text()) || 0);
					var hundreds = 100 * (Number($(".numbers.second .digit[place='hundreds']").text()) || 0);
					var tens = 10 * (Number($(".numbers.second .digit[place='tens']").text()) || 0);
					var ones = 1 * (Number($(".numbers.second .digit[place='ones']").text()) || 0);
					var tenths = 0.1 * (Number($(".numbers.second .digit[place='tenths']").text()) || 0);
					var hundredths = 0.01 * (Number($(".numbers.second .digit[place='hundredths']").text()) || 0);
					var thousandths = 0.001 * (Number($(".numbers.second .digit[place='thousandths']").text()) || 0);
					var ten_thousandths = 0.0001 * (Number($(".numbers.second .digit[place='ten_thousandths']").text()) || 0);
					var hundred_thousandths = 0.00001 * (Number($(".numbers.second .digit[place='hundred_thousandths']").text()) || 0);
					var millionths = 0.000001 * (Number($(".numbers.second .digit[place='millionths']").text()) || 0);

					var secondNumber = Number(millions + hundred_thousands + ten_thousands + thousands + hundreds + tens + ones + tenths + hundredths + thousandths + ten_thousandths + hundred_thousandths + millionths);
					if ($(".numbers.second .negative").hasClass("selected")) {
						secondNumber = secondNumber * -1;
					}

				//thirdNumber
					var thirdNumber = 0;

					try {
						switch(operator) {
							case "addition":
								thirdNumber = ((firstNumber * 1000000) + (secondNumber * 1000000)) / 1000000;
							break;

							case "subtraction":
								thirdNumber = ((firstNumber * 1000000) - (secondNumber * 1000000)) / 1000000;
							break;

							case "multiplication":
								thirdNumber = (firstNumber * secondNumber);
							break;

							case "division":
								thirdNumber = (firstNumber / secondNumber);
							break;

							case "modulus":
								thirdNumber = (firstNumber % secondNumber);
							break;

							case "exponentiation":
								thirdNumber = Math.pow(firstNumber,secondNumber);
							break;

							case "root":
								thirdNumber = Math.pow(firstNumber,(1/secondNumber));
							break;

							default:
								thirdNumber = 0;
							break;
						}
					}
					catch (error) {
						console.log(error);
						thirdNumber = 0;
					}

				//digits
					if (thirdNumber == Infinity) {
						var digits = String(9999999.999999);
					}
					else if (thirdNumber == -Infinity) {
						var digits = String(9999999.999999);
					}
					else if (isNaN(thirdNumber)) {
						var digits = String(0.000000);
					}
					else {
						var digits = Math.abs(thirdNumber).toFixed(6);
					}

					digits = digits.split("");
					digits.reverse();

					var millions = digits[13] || 0;
					var hundred_thousands = digits[12] || 0;
					var ten_thousands = digits[11] || 0;
					var thousands = digits[10] || 0;
					var hundreds = digits[9] || 0;
					var tens = digits[8] || 0;
					var ones = digits[7] || 0;
					var tenths = digits[5] || 0;
					var hundredths = digits[4] || 0;
					var thousandths = digits[3] || 0;
					var ten_thousandths = digits[2] || 0;
					var hundred_thousandths = digits[1] || 0;
					var millionths = digits[0] || 0;

				//display
					$("input[type='range'][place='millions']").val(millions || 0);
					$("input[type='range'][place='hundred_thousands']").val(hundred_thousands || 0);
					$("input[type='range'][place='ten_thousands']").val(ten_thousands || 0);
					$("input[type='range'][place='thousands']").val(thousands || 0);
					$("input[type='range'][place='hundreds']").val(hundreds || 0);
					$("input[type='range'][place='tens']").val(tens || 0);
					$("input[type='range'][place='ones']").val(ones || 0);
					$("input[type='range'][place='tenths']").val(tenths || 0);
					$("input[type='range'][place='hundredths']").val(hundredths || 0);
					$("input[type='range'][place='thousandths']").val(thousandths || 0);
					$("input[type='range'][place='ten_thousandths']").val(ten_thousandths || 0);
					$("input[type='range'][place='hundred_thousandths']").val(hundred_thousandths || 0);
					$("input[type='range'][place='millionths']").val(millionths || 0);

					$(".numbers.first .digit[place='millions']").text(millions || 0);
					$(".numbers.first .digit[place='hundred_thousands']").text(hundred_thousands || 0);
					$(".numbers.first .digit[place='ten_thousands']").text(ten_thousands || 0);
					$(".numbers.first .digit[place='thousands']").text(thousands || 0);
					$(".numbers.first .digit[place='hundreds']").text(hundreds || 0);
					$(".numbers.first .digit[place='tens']").text(tens || 0);
					$(".numbers.first .digit[place='ones']").text(ones || 0);
					$(".numbers.first .digit[place='tenths']").text(tenths || 0);
					$(".numbers.first .digit[place='hundredths']").text(hundredths || 0);
					$(".numbers.first .digit[place='thousandths']").text(thousandths || 0);
					$(".numbers.first .digit[place='ten_thousandths']").text(ten_thousandths || 0);
					$(".numbers.first .digit[place='hundred_thousandths']").text(hundred_thousandths || 0);
					$(".numbers.first .digit[place='millionths']").text(millionths || 0);

					if ((thirdNumber < 0) || (isNaN(thirdNumber))) {
						$(".numbers.first .negative").addClass("selected").text("-");
					}
					else {
						$(".numbers.first .negative").removeClass("selected").text("+");
					}

					$(".numbers.second .digit").text("0");
					$(".numbers.second .negative").removeClass("selected").text("+");
					$(".operator.selected").removeClass("selected");

			}

		});

});