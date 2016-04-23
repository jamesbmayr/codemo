$(document).ready(function() {

	$('.dice').click(function() {
		$('.dice').removeClass('active');

		var button = $(this);
		button.addClass('active');

		var counter = button.prev();
		var subtotal = button.next();
		var total = $('#total');

		var die = button.text();
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
		$('.dice').removeClass('active');
		$('.counter').text('');
		$('.subtotal').text('');
		$('.total').text('');
	});

});