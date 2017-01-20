$(document).ready(function() {

	$('.dice').click(function() {
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

	$('#resetButton').click(function() {
		$('.counter').text('');
		$('.subtotal').text('');
		$('.total').text('');
	});

});