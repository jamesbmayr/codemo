window.onload = function() {

	/* triggers */
		if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
			var on = { click: "touchstart", mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" }
		}
		else {
			var on = { click:      "click", mousedown:  "mousedown", mousemove: "mousemove", mouseup:  "mouseup" }
		}

	/* elements */
		var dice = Array.from(document.querySelectorAll('.dice'))
	
	/* rollDie */
		dice.forEach(function(element) {
			element.addEventListener(on.click, rollDie)
		})
		function rollDie(event) {
			dice.forEach(function(element) {
				element.className = 'dice'
			})

			var button = event.target
			var row = button.closest('.row')

			var counter = row.querySelector('.counter')
			var subtotal = row.querySelector('.subtotal')
			var total = document.querySelector('#total')

			var die = Number(button.value)
			var result = Math.random() * Number(die)
			result = Math.floor(result) + 1

			var count = counter.innerText
			count = Number(count) + 1
			counter.innerText = count

			subtotal.innerText = result

			var totalAmount = total.innerText
			totalAmount = Number(totalAmount) + result
			total.innerText = totalAmount
		}

	/* resetBoard */
		document.querySelector('#resetButton').addEventListener(on.click, resetBoard)
		function resetBoard() {
			dice.forEach(function(element) {
				var row = element.closest('.row')
				row.querySelector('.counter').innerText = ''
				row.querySelector('.subtotal').innerText = ''
			})
			
			document.querySelector('#total').innerText = ''
		}
}