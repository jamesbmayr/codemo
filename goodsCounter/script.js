window.onload = function () {
	
	/* plusOne */
		var pluses = Array.from(document.querySelectorAll(".plus"))
		for (var p in pluses) { pluses[p].addEventListener("click", plusOne) }
		function plusOne(event) {
			var parent = event.target.parentNode
			var input = parent.querySelectorAll("input")[0]
			input.value = Math.max(Number(input.value) + 1, 0)
		}

	/* minusOne */
		var minuses = Array.from(document.querySelectorAll(".minus"))
		for (var m in minuses) { minuses[m].addEventListener("click", minusOne) }
		function minusOne(event) {
			var parent = event.target.parentNode
			var input = parent.querySelectorAll("input")[0]
			input.value = Math.max(Number(input.value) - 1, 0)
		}
}