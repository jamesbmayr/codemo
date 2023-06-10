/* listeners */
	document.getElementById("cost").addEventListener("input", calculateTip)
	document.getElementById("percent").addEventListener("input", calculateTip)
	Array.from(document.querySelectorAll("input[name='denomination']")).forEach(function(denomination) {
		denomination.addEventListener("input", calculateTip)
	})

/* calculateTip */
	function calculateTip() {
		// get data
			var cost = Math.floor(Number(document.getElementById("cost").value) * 100) / 100
			var percent = Number(document.getElementById("percent").value) / 100
			var denomination = Number(document.querySelector("input[name='denomination']:checked").value)

		// math (raw --> rounded --> difference)
			var total = cost * (1 + percent)
				total = Math.ceil(total / denomination) * denomination
				total = Math.ceil(total * 100) / 100
			var tip = total - cost

		// display
			document.getElementById("output-tip").value = tip.toFixed(2)
			document.getElementById("output-total").value = total.toFixed(2)	
	}