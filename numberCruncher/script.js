window.onload = function() {

	/* triggers */
		if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
			var on = { click: "touchstart", mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" }
		}
		else {
			var on = { click:      "click", mousedown:  "mousedown", mousemove: "mousemove", mouseup:  "mouseup" }
		}

	/* updateNumber */
		Array.from(document.querySelectorAll("input[type='range']")).forEach(function(element) {
			element.addEventListener("change", updateNumber)
		})
		function updateNumber(event) {
			var input = event.target
			var value = Number(input.value)
			var place = input.getAttribute("place")

			if (Array.from(document.querySelectorAll(".operator.selected")).length == 0) {
				document.querySelector(".numbers.first .digit[place='" + place + "']").innerText = value
			}
			else {
				document.querySelector(".numbers.second .digit[place='" + place + "']").innerText = value
			}
		}

	/* selectOperator */
		Array.from(document.querySelectorAll(".operator")).forEach(function(element) {
			element.addEventListener(on.click, selectOperator)
		})
		function selectOperator(event) {
			var operator = event.target
			Array.from(document.querySelectorAll(".operator")).forEach(function(element) {
				element.className = element.className.replace(/\s?selected/, "")
			})

			if (operator.className.includes("selected")) {
				document.querySelector("#equals").innerText = "C"

				Array.from(document.querySelectorAll(".numbers.first .digit")).forEach(function(digit) {
					var value = digit.innerText
					var place = digit.getAttribute("place")

					document.querySelector("input[type='range'][place='" + place + "']").value = value
				})
			}
			else {
				operator.className += " selected"
				document.querySelector("#equals").innerText = "="

				Array.from(document.querySelectorAll(".numbers.second .digit")).forEach(function(digit) {
					var value = digit.innerText
					var place = digit.getAttribute("place")

					document.querySelector("input[type='range'][place='" + place + "']").value = value
				})
			}
		}

	/* selectNegative */
		Array.from(document.querySelectorAll(".negative")).forEach(function(element) {
			element.addEventListener(on.click, selectNegative)
		})
		function selectNegative(event) {
			if (!event.target.className.includes("selected")) {
				event.target.className += " selected"
				event.target.innerText = "-"
			}
			else {
				event.target.className = event.target.className.replace(/\s?selected/, "")
				event.target.innerText = "+"
			}
		}

	/* crunchNumbers */
		document.querySelector("#equals").addEventListener(on.click, crunchNumbers)
		function crunchNumbers() {
			var operatorElement = document.querySelector(".operator.selected")
			if (!operatorElement) {
				return
			}
			else {
				var operator = operatorElement.id
			}

			if ((typeof operator == "undefined") || (!operator)) {
				//reset
					Array.from(document.querySelectorAll(".digit")).forEach(function(element) {
						element.innerText = "0"
					})
					Array.from(document.querySelectorAll(".negative")).forEach(function(element) {
						element.className = element.className.replace(/\s?selected/, "")
						element.innerText = "+"
					})
					Array.from(document.querySelectorAll(".operator.selected")).forEach(function(element) {
						element.className = element.className.replace(/\s?selected/, "")
					})
					Array.from(document.querySelectorAll("input[type='range']")).forEach(function(element) {
						element.value = 0
					})
			}
			else {
				//firstNumber
					var millions 			= 1000000 *  (Number(document.querySelector(".numbers.first .digit[place='millions']").innerText) || 0)
					var hundred_thousands 	= 100000 * 	 (Number(document.querySelector(".numbers.first .digit[place='hundred_thousands']").innerText) || 0)
					var ten_thousands 		= 10000 * 	 (Number(document.querySelector(".numbers.first .digit[place='ten_thousands']").innerText) || 0)
					var thousands 			= 1000 * 	 (Number(document.querySelector(".numbers.first .digit[place='thousands']").innerText) || 0)
					var hundreds 			= 100 * 	 (Number(document.querySelector(".numbers.first .digit[place='hundreds']").innerText) || 0)
					var tens 				= 10 * 		 (Number(document.querySelector(".numbers.first .digit[place='tens']").innerText) || 0)
					var ones 				= 1 * 		 (Number(document.querySelector(".numbers.first .digit[place='ones']").innerText) || 0)
					var tenths 				= 0.1 * 	 (Number(document.querySelector(".numbers.first .digit[place='tenths']").innerText) || 0)
					var hundredths 			= 0.01 * 	 (Number(document.querySelector(".numbers.first .digit[place='hundredths']").innerText) || 0)
					var thousandths 		= 0.001 * 	 (Number(document.querySelector(".numbers.first .digit[place='thousandths']").innerText) || 0)
					var ten_thousandths 	= 0.0001 * 	 (Number(document.querySelector(".numbers.first .digit[place='ten_thousandths']").innerText) || 0)
					var hundred_thousandths = 0.00001 *  (Number(document.querySelector(".numbers.first .digit[place='hundred_thousandths']").innerText) || 0)
					var millionths 			= 0.000001 * (Number(document.querySelector(".numbers.first .digit[place='millionths']").innerText) || 0)

					var firstNumber = Number(millions + hundred_thousands + ten_thousands + thousands + hundreds + tens + ones + tenths + hundredths + thousandths + ten_thousandths + hundred_thousandths + millionths)
					if (document.querySelector(".numbers.first .negative").className.includes("selected")) {
						firstNumber = firstNumber * -1
					}

				//secondNumber
					var millions 			= 1000000 *  (Number(document.querySelector(".numbers.second .digit[place='millions']").innerText) || 0)
					var hundred_thousands 	= 100000 * 	 (Number(document.querySelector(".numbers.second .digit[place='hundred_thousands']").innerText) || 0)
					var ten_thousands 		= 10000 * 	 (Number(document.querySelector(".numbers.second .digit[place='ten_thousands']").innerText) || 0)
					var thousands 			= 1000 * 	 (Number(document.querySelector(".numbers.second .digit[place='thousands']").innerText) || 0)
					var hundreds 			= 100 * 	 (Number(document.querySelector(".numbers.second .digit[place='hundreds']").innerText) || 0)
					var tens 				= 10 * 		 (Number(document.querySelector(".numbers.second .digit[place='tens']").innerText) || 0)
					var ones 				= 1 * 		 (Number(document.querySelector(".numbers.second .digit[place='ones']").innerText) || 0)
					var tenths 				= 0.1 * 	 (Number(document.querySelector(".numbers.second .digit[place='tenths']").innerText) || 0)
					var hundredths 			= 0.01 * 	 (Number(document.querySelector(".numbers.second .digit[place='hundredths']").innerText) || 0)
					var thousandths 		= 0.001 * 	 (Number(document.querySelector(".numbers.second .digit[place='thousandths']").innerText) || 0)
					var ten_thousandths 	= 0.0001 * 	 (Number(document.querySelector(".numbers.second .digit[place='ten_thousandths']").innerText) || 0)
					var hundred_thousandths = 0.00001 *  (Number(document.querySelector(".numbers.second .digit[place='hundred_thousandths']").innerText) || 0)
					var millionths 			= 0.000001 * (Number(document.querySelector(".numbers.second .digit[place='millionths']").innerText) || 0)

					var secondNumber = Number(millions + hundred_thousands + ten_thousands + thousands + hundreds + tens + ones + tenths + hundredths + thousandths + ten_thousandths + hundred_thousandths + millionths)
					if (document.querySelector(".numbers.second .negative").className.includes("selected")) {
						secondNumber = secondNumber * -1
					}

				//thirdNumber
					var thirdNumber = 0

					try {
						switch(operator) {
							case "addition":
								thirdNumber = ((firstNumber * 1000000) + (secondNumber * 1000000)) / 1000000
							break

							case "subtraction":
								thirdNumber = ((firstNumber * 1000000) - (secondNumber * 1000000)) / 1000000
							break

							case "multiplication":
								thirdNumber = (firstNumber * secondNumber)
							break

							case "division":
								thirdNumber = (firstNumber / secondNumber)
							break

							case "modulus":
								thirdNumber = (firstNumber % secondNumber)
							break

							case "exponentiation":
								thirdNumber = Math.pow(firstNumber,secondNumber)
							break

							case "root":
								thirdNumber = Math.pow(firstNumber,(1/secondNumber))
							break

							default:
								thirdNumber = 0
							break
						}
					}
					catch (error) {
						console.log(error)
						thirdNumber = 0
					}

				//digits
					if (thirdNumber == Infinity) {
						var digits = String(9999999.999999)
					}
					else if (thirdNumber == -Infinity) {
						var digits = String(9999999.999999)
					}
					else if (isNaN(thirdNumber)) {
						var digits = String(0.000000)
					}
					else {
						var digits = Math.abs(thirdNumber).toFixed(6)
					}

					digits = digits.split("")
					digits.reverse()

					var millions = digits[13] || 0
					var hundred_thousands = digits[12] || 0
					var ten_thousands = digits[11] || 0
					var thousands = digits[10] || 0
					var hundreds = digits[9] || 0
					var tens = digits[8] || 0
					var ones = digits[7] || 0
					var tenths = digits[5] || 0
					var hundredths = digits[4] || 0
					var thousandths = digits[3] || 0
					var ten_thousandths = digits[2] || 0
					var hundred_thousandths = digits[1] || 0
					var millionths = digits[0] || 0

				//display
					document.querySelector("input[type='range'][place='millions']").value = (millions || 0)
					document.querySelector("input[type='range'][place='hundred_thousands']").value = (hundred_thousands || 0)
					document.querySelector("input[type='range'][place='ten_thousands']").value = (ten_thousands || 0)
					document.querySelector("input[type='range'][place='thousands']").value = (thousands || 0)
					document.querySelector("input[type='range'][place='hundreds']").value = (hundreds || 0)
					document.querySelector("input[type='range'][place='tens']").value = (tens || 0)
					document.querySelector("input[type='range'][place='ones']").value = (ones || 0)
					document.querySelector("input[type='range'][place='tenths']").value = (tenths || 0)
					document.querySelector("input[type='range'][place='hundredths']").value = (hundredths || 0)
					document.querySelector("input[type='range'][place='thousandths']").value = (thousandths || 0)
					document.querySelector("input[type='range'][place='ten_thousandths']").value = (ten_thousandths || 0)
					document.querySelector("input[type='range'][place='hundred_thousandths']").value = (hundred_thousandths || 0)
					document.querySelector("input[type='range'][place='millionths']").value = (millionths || 0)

					document.querySelector(".numbers.first .digit[place='millions']").innerText = (millions || 0)
					document.querySelector(".numbers.first .digit[place='hundred_thousands']").innerText = (hundred_thousands || 0)
					document.querySelector(".numbers.first .digit[place='ten_thousands']").innerText = (ten_thousands || 0)
					document.querySelector(".numbers.first .digit[place='thousands']").innerText = (thousands || 0)
					document.querySelector(".numbers.first .digit[place='hundreds']").innerText = (hundreds || 0)
					document.querySelector(".numbers.first .digit[place='tens']").innerText = (tens || 0)
					document.querySelector(".numbers.first .digit[place='ones']").innerText = (ones || 0)
					document.querySelector(".numbers.first .digit[place='tenths']").innerText = (tenths || 0)
					document.querySelector(".numbers.first .digit[place='hundredths']").innerText = (hundredths || 0)
					document.querySelector(".numbers.first .digit[place='thousandths']").innerText = (thousandths || 0)
					document.querySelector(".numbers.first .digit[place='ten_thousandths']").innerText = (ten_thousandths || 0)
					document.querySelector(".numbers.first .digit[place='hundred_thousandths']").innerText = (hundred_thousandths || 0)
					document.querySelector(".numbers.first .digit[place='millionths']").innerText = (millionths || 0)

					if ((thirdNumber < 0) || (isNaN(thirdNumber))) {
						document.querySelector(".numbers.first .negative").className += " selected"
						document.querySelector(".numbers.first .negative").innerText = "-"
					}
					else {
						document.querySelector(".numbers.first .negative").className = document.querySelector(".numbers.first .negative").className.replace(/\s?selected/, "")
						document.querySelector(".numbers.first .negative").innerText = "+"
					}

					Array.from(document.querySelectorAll(".numbers.second .digit")).forEach(function(element) {
						element.innerText = "0"
					})
					document.querySelector(".numbers.second .negative").className = document.querySelector(".numbers.second .negative").className.replace(/\s?selected/, "")
					document.querySelector(".numbers.second .negative").innerText = "+"
					
					Array.from(document.querySelectorAll(".operator.selected")).forEach(function(element) {
						element.className = element.className.replace(/\s?selected/, "")
					})
			}
		}
}
