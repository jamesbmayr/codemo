/*** request ***/
	/* calculateTip */
		exports.calculateTip = calculateTip
		function calculateTip(query) {
			try {
				// validate
					if (!query) {
						return JSON.stringify({success: false, message: "expecting number parameters 'amount' and 'percentage'"})
					}
					if (!query.amount || isNaN(Number(query.amount))) {
						return JSON.stringify({success: false, message: "expecting number parameter 'amount'"})
					}
					if (!query.percentage || isNaN(Number(query.percentage))) {
						return JSON.stringify({success: false, message: "expecting number parameter 'percentage'"})
					}
					if (!query.coin || isNaN(Number(query.coin))) {
						query.coin = 1
					}


				// get data
					var amount = Math.floor(Number(query.amount) * 100) / 100
					var percentage = Number(query.percentage) / 100
					var coin = Math.floor(Number(query.coin) * 100) / 100

				// math (raw --> rounded --> difference)
					var total = amount * (1 + percentage)
						total = Math.round(total / coin) * coin
						total = Math.round(total * 100) / 100
					var tip = total - amount

				// return data
					return JSON.stringify({
						success: true,
						tip: tip.toFixed(2),
						total: total.toFixed(2)
					})
			}
			catch (error) { console.log(error) }
		}