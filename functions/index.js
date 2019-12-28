/*** set up ***/
	const functions = require("firebase-functions")

/*** functions ***/
	/* unitconverter */
		const app_unitconverter = require("./unitconverter")
		exports.unitconverter = functions.https.onRequest(function(request, response) {
			try {
				response.end(app_unitconverter.convertQuantity(request.query))
			}
			catch (error) {
				console.log(error)
				response.end("unknown error in cloud functions")
			}
		})