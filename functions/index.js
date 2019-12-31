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
				response.end("unknown error in cloud functions for unitconvert")
			}
		})

	/* factorfinder */
		const app_factorfinder = require("./factorfinder")
		exports.factorfinder = functions.https.onRequest(function(request, response) {
			try {
				response.end(app_factorfinder.getQualitites(request.query.n))
			}
			catch (error) {
				console.log(error)
				response.end("unknown error in cloud functions for factorfinder")
			}
		})

	/* wordshuffler */
		const app_wordshuffler = require("./wordshuffler")
		exports.wordshuffler = functions.https.onRequest(function(request, response) {
			try {
				response.end(app_wordshuffler.getQualitites(request.query.word))
			}
			catch (error) {
				console.log(error)
				response.end("unknown error in cloud functions for wordshuffler")
			}
		})

	/* chordanalyzer */
		const app_chordanalyzer = require("./chordanalyzer")
		exports.chordanalyzer = functions.https.onRequest(function(request, response) {
			try {
				response.end(app_chordanalyzer.analyzeChord(request.query.notes.split(",") || []))
			}
			catch (error) {
				console.log(error)
				response.end("unknown error in cloud functions for chordanalyzer")
			}
		})
