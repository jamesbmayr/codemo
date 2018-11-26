$(document).ready(function() {

	/* triggers */
		if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
			var on = { click: "touchstart", mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" }
		}
		else {
			var on = { click:      "click", mousedown:  "mousedown", mousemove: "mousemove", mouseup:  "mouseup" }
		}

	$('.dice').on(on.click, function() {
		$('.dice').removeClass('active');

		var button = $(this);

		var counter = button.next();
		var subtotal = button.next().next();
		var total = $('#total');

		var die = Number($(button).val());
		var result = Math.random() * Number(die);
		result = Math.floor(result) + 1;

		var count = counter.text();
		count = Number(count) + 1;
		counter.text(count);

		subtotal.text(result);

		var totalAmount = total.text();
		totalAmount = Number(totalAmount) + result;
		total.text(totalAmount);
	});

	$('#resetButton').on(on.click, function() {
		$('.counter').text('');
		$('.subtotal').text('');
		$('.total').text('');
	});

});