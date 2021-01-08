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
				response.end(app_factorfinder.getQualities(request.query.number))
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
				response.end(app_wordshuffler.findWords(request.query.word))
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

	/* baseconverter */
		const app_messageencrypter = require("./messageencrypter")
		exports.messageencrypter = functions.https.onRequest(function(request, response) {
			try {
				response.end(app_messageencrypter.submitQuery(request.query))
			}
			catch (error) {
				console.log(error)
				response.end("unknown error in cloud functions for messageencrypter")
			}
		})

	/* baseconverter */
		const app_baseconverter = require("./baseconverter")
		exports.baseconverter = functions.https.onRequest(function(request, response) {
			try {
				response.end(app_baseconverter.submitConvert(request.query))
			}
			catch (error) {
				console.log(error)
				response.end("unknown error in cloud functions for baseconverter")
			}
		})
