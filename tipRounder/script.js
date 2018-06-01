window.onload = function() {
	
	/* listeners */
		document.getElementById("cost").addEventListener("change", calculateTip)
		document.getElementById("percent").addEventListener("change", calculateTip)
		Array.from(document.querySelectorAll("input[name='coin']")).forEach(function(coin) {
			coin.addEventListener("change", selectCoin)
		})

	/* selectCoin */
		function selectCoin(event) {
			// unselect all coins
				Array.from(document.querySelectorAll("[name='coin']")).forEach(function(coin) {
					coin.parentNode.removeAttribute("selected")
				})

			// select this coin
				event.target.parentNode.setAttribute("selected", true)
				calculateTip()
		}

	/* calculateTip */
		function calculateTip() {
			// get data
				var cost = Math.floor(Number(document.getElementById("cost").value) * 100) / 100
				var percent = Number(document.getElementById("percent").value) / 100
				var coin = Number(document.querySelector("label[selected]").querySelector("input[name='coin']").value)

			// math (raw --> rounded --> difference)
				var total = cost * (1 + percent)
					total = Math.round(total / coin) * coin
					total = Math.round(total * 100) / 100
				var tip = total - cost

			// display
				document.getElementById("output-tip").value = tip.toFixed(2)
				document.getElementById("output-total").value = total.toFixed(2)
			
		}
}
