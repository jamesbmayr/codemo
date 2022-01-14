/*** set up ***/
	const functions = require("firebase-functions")

/*** functions ***/
	/* baseconverter */
		const app_baseconverter = require("./baseconverter")
		exports.baseconverter = functions.https.onRequest(function(request, response) {
			try {
				response.end(app_baseconverter.submitConvert(request.query))
			}
			catch (error) {
				console.log(error)
				response.end("unknown error in cloud functions for baseconverter; expecting string parameter 'numberString', number parameters 'oldBase', 'newBase'")
			}
		})

	/* chordanalyzer */
		const app_chordanalyzer = require("./chordanalyzer")
		exports.chordanalyzer = functions.https.onRequest(function(request, response) {
			try {
				response.end(app_chordanalyzer.analyzeChord(request.query.notes))
			}
			catch (error) {
				console.log(error)
				response.end("unknown error in cloud functions for chordanalyzer; expecting string parameter 'notes'")
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
				response.end("unknown error in cloud functions for factorfinder; expecting number parameter 'number'")
			}
		})

	/* messageencrypter */
		const app_messageencrypter = require("./messageencrypter")
		exports.messageencrypter = functions.https.onRequest(function(request, response) {
			try {
				response.end(app_messageencrypter.submitQuery(request.query))
			}
			catch (error) {
				console.log(error)
				response.end("unknown error in cloud functions for messageencrypter; expecting string parameters 'action', 'message', 'keyword'")
			}
		})

	/* morsemessager */
		const app_morsemessager = require("./morsemessager")
		exports.morsemessager = functions.https.onRequest(function(request, response) {
			try {
				response.end(app_morsemessager.submitQuery(request.query))
			}
			catch (error) {
				console.log(error)
				response.end("unknown error in cloud functions for morsemessager; expecting string parameter 'text' OR string parameter 'code'")
			}
		})

	/* random */
		const app_random = require("./random")
		exports.random = functions.https.onRequest(function(request, response) {
			try {
				response.end(app_random.submitQuery(request.query))
			}
			catch (error) {
				console.log(error)
				response.end("unknown error in cloud functions for random")
			}
		})

	/* tiprounder */
		const app_tiprounder = require("./tiprounder")
		exports.tiprounder = functions.https.onRequest(function(request, response) {
			try {
				response.end(app_tiprounder.calculateTip(request.query))
			}
			catch (error) {
				console.log(error)
				response.end("unknown error in cloud functions for tiprounder; expecting number parameters 'amount' and 'percentage'; optional number parameter 'coin'")
			}
		})

	/* unitconverter */
		const app_unitconverter = require("./unitconverter")
		exports.unitconverter = functions.https.onRequest(function(request, response) {
			try {
				response.end(app_unitconverter.convertQuantity(request.query))
			}
			catch (error) {
				console.log(error)
				response.end("unknown error in cloud functions for unitconverter; expecting number parameter 'quantity', expecting string parameters 'from', 'to'")
			}
		})

	/* wordcounter */
		const app_wordcounter = require("./wordcounter")
		exports.wordcounter = functions.https.onRequest(function(request, response) {
			try {
				response.end(app_wordcounter.countWords(request.query.text))
			}
			catch (error) {
				console.log(error)
				response.end("unknown error in cloud functions for wordcounter; expecting string parameter 'text'")
			}
		})

	/* wordsgenerator */
		const app_wordsgenerator = require("./wordsgenerator")
		exports.wordsgenerator = functions.https.onRequest(function(request, response) {
			try {
				response.end(app_wordsgenerator.submitGenerate(request.query))
			}
			catch (error) {
				console.log(error)
				response.end("unknown error in cloud functions for wordsgenerator; optional number parameter 'numberOfWords', optional text parameter 'type'; optional array parameters 'syllableCounts', 'syllableTypes', 'letterGroups'")
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
				response.end("unknown error in cloud functions for wordshuffler; expecting string parameter 'word'")
			}
		})

