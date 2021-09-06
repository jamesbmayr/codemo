/*** globals ***/
	/* triggers */
		const TRIGGERS = {
			click: "click",
			submit: "submit",
			input: "input"
		}

	/* constants */
		const CONSTANTS = {
			databaseAPI: "https://script.google.com/macros/s/AKfycby1hlF5xrg4QwfPzAHc1Ad2KQpb611K9FY-dbwKqQbQq0GEr30hbyPYY-kelvihE7Xk/exec",
			messageTimeoutTime: 5000,
			messageTimeout: null,
			emailRegex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
		}

	/* data */
		const DATA = {
			parameters: {},
			fund: null,
			pledge: null
		}

	/* elements */
		const ELEMENTS = {
			message: document.querySelector("#message"),
			fund: {
				element: document.querySelector("#fund"),
				name: document.querySelector("#fund-name"),
				nameSaved: document.querySelector("#fund-name + .saved-indicator"),
				amount: document.querySelector("#fund-amount"),
				amountSaved: document.querySelector("#fund-amount + .saved-indicator"),
				timestamp: document.querySelector("#fund-timestamp"),
				timestampSaved: document.querySelector("#fund-timestamp + .saved-indicator"),
				status: document.querySelector("#fund-status"),
				email: document.querySelector("#fund-email"),
				emailSaved: document.querySelector("#fund-email + .saved-indicator"),
				save: {
					form: document.querySelector("#fund-save"),
					button: document.querySelector("#fund-save-button")
				},
				complete: {
					form: document.querySelector("#fund-complete"),
					button: document.querySelector("#fund-complete-button")
				},
				cancel: {
					form: document.querySelector("#fund-cancel"),
					button: document.querySelector("#fund-cancel-button")
				},
				invite: document.querySelector("#fund-invite")
			},
			pledge: {
				element: document.querySelector("#pledge"),
				email: document.querySelector("#pledge-email"),
				emailSaved: document.querySelector("#pledge-email + .saved-indicator"),
				amount: document.querySelector("#pledge-amount"),
				amountSaved: document.querySelector("#pledge-amount + .saved-indicator"),
				share: document.querySelector("#pledge-share"),
				save: {
					form: document.querySelector("#pledge-save"),
					button: document.querySelector("#pledge-save-button")
				},
				cancel: {
					form: document.querySelector("#pledge-cancel"),
					button: document.querySelector("#pledge-cancel-button")
				}
			},
			reset: {
				form: document.querySelector("#reset"),
				button: document.querySelector("#reset-button")
			}
		}

/*** tools ***/
	/* getParameters */
		getParameters()
		function getParameters() {
			try {
				// no query parameters
					if (!window.location.search || !window.location.search.length) {
						return
					}

				// message
					displayMessage(true, "Fetching this Fund...")

				// split parameters
					let parameterList = window.location.search.slice(1).trim()
						parameterList = parameterList.split("&")

				// loop through pairs
					for (let i in parameterList) {
						parameterList[i] = parameterList[i].trim().split("=")
						for (let j in parameterList[i]) {
							parameterList[i][j] = parameterList[i][j].trim()
						}

						DATA.parameters[parameterList[i][0].toLowerCase()] = parameterList[i][1]
					}

				// get data
					sendRequest("getData", DATA.parameters)
			} catch (error) {console.log(error)}
		}
	
	/* sendRequest */
		function sendRequest(action, parameters) {
			try {
				// no action or parameters?
					if (!action || typeof action !== "string"
					 || !parameters || typeof parameters !== "object" || !Object.keys(parameters).length) {
						return
					}

				// build query
					let url = CONSTANTS.databaseAPI + "?action=" + action + "&" +
						Object.keys(parameters).map(function(key) {
							return key + "=" + parameters[key]
						}).join("&")

				// send request
					let request = new XMLHttpRequest()
						request.open("GET", url, true)
						request.onload = receiveData
						request.responseType = "json"
						request.setRequestHeader("Accept", "application/json")
						request.send()
			} catch (error) {console.log(error)}
		}

	/* receiveData */
		function receiveData(event) {
			try {
				// none
					if (!event || !event.target || !event.target.response) {
						displayMessage(false, "unknown error")
					}

				// convert
					let response = event.target.response
					if (typeof response == "string") {
						response = JSON.parse(response)
					}
					if (response.message || !response.success) {
						displayMessage(response.success, response.message || "unknown error")
					}

				// set
					if (typeof response.fund !== "undefined") {
						DATA.fund = response.fund || null
					}
					if (typeof response.pledge !== "undefined") {
						DATA.pledge = response.pledge || null
					}

				// display
					if (DATA.fund) {
						displayFund()
						displayPledge()
					}

				// update query parameters
					let currentURL = new URL(window.location.href)
					if (!DATA.fund) {
						currentURL.search = ""
					}
					else {
						currentURL.search = "?fund_id=" + DATA.fund.fund_id + (DATA.pledge ? "&pledge_id=" + DATA.pledge.pledge_id : "")
					}
					window.history.pushState({}, "", currentURL)
			} catch (error) {console.log(error)}
		}

/*** display ***/
	/* displayFund */
		function displayFund() {
			try {
				// unhide
					ELEMENTS.reset.form.removeAttribute("hidden")

				// set fields
					ELEMENTS.fund.name.value = DATA.fund.name
					ELEMENTS.fund.amount.value = DATA.fund.amount
					ELEMENTS.fund.status.value = DATA.fund.status
					ELEMENTS.fund.email.value = DATA.fund.email
					let date = new Date(DATA.fund.timestamp)
					ELEMENTS.fund.timestamp.value = date.getFullYear() + 
						"-" + ("0" + (1 + date.getMonth())).slice(-2) + 
						"-" + ("0" + date.getDate()).slice(-2) + 
						"T" + ("0" + date.getHours()).slice(-2) + 
						":" + ("0" + date.getMinutes()).slice(-2) + 
						":" + ("0" + date.getSeconds()).slice(-2)

				// ownership
					if (DATA.fund && (!DATA.pledge || !DATA.pledge.isCreator)) {
						ELEMENTS.fund.name.setAttribute("readonly", true)
						ELEMENTS.fund.amount.setAttribute("readonly", true)
						ELEMENTS.fund.timestamp.setAttribute("readonly", true)
						ELEMENTS.fund.email.setAttribute("readonly", true)
						ELEMENTS.fund.save.button.setAttribute("hidden", true)
						ELEMENTS.fund.complete.button.setAttribute("hidden", true)
						ELEMENTS.fund.cancel.button.setAttribute("hidden", true)
					}
					else {
						ELEMENTS.fund.name.removeAttribute("readonly")
						ELEMENTS.fund.nameSaved.removeAttribute("hidden")
						ELEMENTS.fund.amount.removeAttribute("readonly")
						ELEMENTS.fund.amountSaved.removeAttribute("hidden")
						ELEMENTS.fund.timestamp.removeAttribute("readonly")
						ELEMENTS.fund.timestampSaved.removeAttribute("hidden")
						ELEMENTS.fund.email.removeAttribute("readonly")
						ELEMENTS.fund.emailSaved.removeAttribute("hidden")
						ELEMENTS.fund.save.button.removeAttribute("hidden")
						ELEMENTS.fund.complete.button.removeAttribute("hidden")
						ELEMENTS.fund.cancel.button.removeAttribute("hidden")
						ELEMENTS.fund.save.button.removeAttribute("disabled")
						ELEMENTS.fund.complete.button.removeAttribute("disabled")
						ELEMENTS.fund.cancel.button.removeAttribute("disabled")
					}

				// complete vs. open
					if (DATA.fund.status !== "open") {
						ELEMENTS.fund.name.setAttribute("readonly", true)
						ELEMENTS.fund.amount.setAttribute("readonly", true)
						ELEMENTS.fund.timestamp.setAttribute("readonly", true)
						ELEMENTS.fund.email.setAttribute("readonly", true)
						ELEMENTS.fund.save.button.setAttribute("hidden", true)
						ELEMENTS.fund.complete.button.setAttribute("hidden", true)
						ELEMENTS.fund.cancel.button.setAttribute("hidden", true)
						ELEMENTS.fund.save.button.setAttribute("disabled", true)
						ELEMENTS.fund.complete.button.setAttribute("disabled", true)
						ELEMENTS.fund.cancel.button.setAttribute("disabled", true)

						ELEMENTS.fund.status.removeAttribute("hidden")
						ELEMENTS.fund.invite.setAttribute("hidden", true)
						ELEMENTS.fund.invite.href = "#"
					}
					else {
						ELEMENTS.fund.status.setAttribute("hidden", true)
						ELEMENTS.fund.invite.removeAttribute("hidden")
						ELEMENTS.fund.invite.href = 'mailto:?to=&subject=FundFuser:%20' + DATA.fund.name +
							'&body=A fund was created by ' + DATA.fund.email + ': ' + 
							'$' + DATA.fund.amount.toFixed(2) + ' by ' + new Date(DATA.fund.timestamp).toLocaleString() + ' for "' + DATA.fund.name + '" ...' + 
							'Make your pledge now: ' + window.location.origin + window.location.pathname + '?fund_id=' + DATA.fund.fund_id
					}

				// changed

			} catch (error) {console.log(error)}
		}

	/* displayPledge */
		function displayPledge() {
			try {
				// unhide
					ELEMENTS.pledge.element.removeAttribute("hidden")

				// set fields
					ELEMENTS.pledge.email.value = DATA.pledge ? DATA.pledge.email : null
					ELEMENTS.pledge.amount.value = DATA.pledge ? DATA.pledge.amount : null
					ELEMENTS.pledge.share.value = DATA.pledge ? DATA.pledge.share || null : null

					ELEMENTS.pledge.emailSaved.removeAttribute("hidden")
					ELEMENTS.pledge.amountSaved.removeAttribute("hidden")

				// status
					if (DATA.fund.status !== "open") {
						ELEMENTS.pledge.email.setAttribute("readonly", true)
						ELEMENTS.pledge.amount.setAttribute("readonly", true)
						ELEMENTS.pledge.save.button.setAttribute("hidden", true)
						ELEMENTS.pledge.cancel.button.setAttribute("hidden", true)
						ELEMENTS.pledge.save.button.setAttribute("disabled", true)
						ELEMENTS.pledge.cancel.button.setAttribute("disabled", true)
					}
					else {
						ELEMENTS.pledge.email.removeAttribute("readonly")
						ELEMENTS.pledge.amount.removeAttribute("readonly")
						ELEMENTS.pledge.save.button.removeAttribute("hidden")
						ELEMENTS.pledge.cancel.button.removeAttribute("hidden")
						ELEMENTS.pledge.save.button.removeAttribute("disabled")
						ELEMENTS.pledge.cancel.button.removeAttribute("disabled")
					}

				// cancellable?
					if (!DATA.pledge || !DATA.pledge.amount) {
						ELEMENTS.pledge.cancel.button.setAttribute("hidden", true)
					}
			} catch (error) {console.log(error)}
		}

	/* displayMessage */
		function displayMessage(success, message) {
			try {
				// clear existing timeout
					clearTimeout(CONSTANTS.messageTimeout)

				// update content
					ELEMENTS.message.setAttribute("message-type", success ? "success" : "failure")
					ELEMENTS.message.innerText = message || ""

				// clear out in a few seconds
					CONSTANTS.messageTimeout = setTimeout(function() {
						ELEMENTS.message.removeAttribute("message-type")
						ELEMENTS.message.innerText = ""
					}, CONSTANTS.messageTimeoutTime)
			} catch (error) {console.log(error)}
		}

/*** interaction ***/
	/* changeField */
		ELEMENTS.fund.name.addEventListener(TRIGGERS.input, changeField)
		ELEMENTS.fund.amount.addEventListener(TRIGGERS.input, changeField)
		ELEMENTS.fund.timestamp.addEventListener(TRIGGERS.input, changeField)
		ELEMENTS.fund.email.addEventListener(TRIGGERS.input, changeField)
		ELEMENTS.pledge.amount.addEventListener(TRIGGERS.input, changeField)
		ELEMENTS.pledge.email.addEventListener(TRIGGERS.input, changeField)
		function changeField(event) {
			try {
				// get field
					let id = event.target.id.split("-")
					let thing = id[0]
					let field = id[1]

				// get cached value
					let cachedValue = DATA[thing] ? DATA[thing][field] : null || null
					let inputValue = event.target.value

				// different
					if (cachedValue != inputValue) {
						ELEMENTS[thing][field + "Saved"].setAttribute("hidden", true)
					}
					else {
						ELEMENTS[thing][field + "Saved"].removeAttribute("hidden")	
					}
			} catch (error) {console.log(error)}
		}

	/* saveFund */
		ELEMENTS.fund.save.form.addEventListener(TRIGGERS.submit, saveFund)
		function saveFund() {
			try {
				// get data
					let name = ELEMENTS.fund.name.value.trim()
					let amount = Number(ELEMENTS.fund.amount.value)
					let timestamp = ELEMENTS.fund.timestamp.value
					let email = ELEMENTS.fund.email.value.trim()

				// validate
					if (DATA.fund && (DATA.fund.status == "complete" || DATA.fund.status == "cancelled"
					 || new Date().getTime() > new Date(DATA.fund.timestamp).getTime())) {
						displayMessage(false, "This fund already ended.")
						return
					}

					if (!name || !name.length) {
						displayMessage(false, "What is this fund for?")
						return
					}
					if (!amount || isNaN(amount) || amount < 0) {
						displayMessage(false, "How much money are you funding?")
						return
					}
					if (!timestamp || new Date().getTime() > new Date(timestamp).getTime()) {
						displayMessage(false, "This fund must have a target date in the future.")
						return
					}
					if (!email || !email.length || !CONSTANTS.emailRegex.test(email)) {
						displayMessage(false, "Provide your email so you can edit this later.")
						return
					}

					if (DATA.fund && (!DATA.pledge || !DATA.pledge.isCreator)) {
						displayMessage(false, "Only the creator can update the fund.")
						return
					}

				// message
					ELEMENTS.fund.save.button.setAttribute("disabled", true)
					ELEMENTS.fund.complete.button.setAttribute("disabled", true)
					ELEMENTS.fund.cancel.button.setAttribute("disabled", true)
					displayMessage(true, "Saving...")

				// query
					sendRequest("saveFund", {
						fund_id: DATA.fund ? DATA.fund.fund_id : null,
						name: name,
						amount: amount,
						timestamp: timestamp,
						email: email,
						pledge_id: DATA.pledge ? DATA.pledge.pledge_id : null
					})
			} catch (error) {console.log(error)}
		}

	/* completeFund */
		ELEMENTS.fund.complete.form.addEventListener(TRIGGERS.submit, completeFund)
		function completeFund() {
			try {
				// validate fund
					if (!DATA.fund || !DATA.fund.fund_id) {
						displayMessage(false, "No fund yet!")
						return
					}
					if (DATA.fund.status == "complete" || DATA.fund.status == "cancelled"
					 || new Date().getTime() > new Date(DATA.fund.timestamp).getTime()) {
						displayMessage(false, "This fund already ended.")
						return
					}
					if (!DATA.pledge || !DATA.pledge.isCreator) {
						displayMessage(false, "Only the creator can complete the fund.")
						return
					}

				// message
					ELEMENTS.fund.save.button.setAttribute("disabled", true)
					ELEMENTS.fund.complete.button.setAttribute("disabled", true)
					ELEMENTS.fund.cancel.button.setAttribute("disabled", true)
					displayMessage(true, "Completing...")

				// query
					sendRequest("completeFund", {
						fund_id: DATA.fund.fund_id,
						pledge_id: DATA.pledge.pledge_id
					})
			} catch (error) {console.log(error)}
		}

	/* cancelFund */
		ELEMENTS.fund.cancel.form.addEventListener(TRIGGERS.submit, cancelFund)
		function cancelFund() {
			try {
				// validate fund
					if (!DATA.fund || !DATA.fund.fund_id) {
						displayMessage(false, "No fund yet!")
						return
					}
					if (DATA.fund.status == "complete" || DATA.fund.status == "cancelled"
					 || new Date().getTime() > new Date(DATA.fund.timestamp).getTime()) {
						displayMessage(false, "This fund already ended.")
						return
					}
					if (!DATA.pledge || !DATA.pledge.isCreator) {
						displayMessage(false, "Only the creator can cancel the fund.")
						return
					}

				// message
					ELEMENTS.fund.save.button.setAttribute("disabled", true)
					ELEMENTS.fund.complete.button.setAttribute("disabled", true)
					ELEMENTS.fund.cancel.button.setAttribute("disabled", true)
					displayMessage(true, "Cancelling...")

				// query
					sendRequest("cancelFund", {
						fund_id: DATA.fund.fund_id,
						pledge_id: DATA.pledge.pledge_id
					})
			} catch (error) {console.log(error)}
		}

	/* savePledge */
		ELEMENTS.pledge.save.form.addEventListener(TRIGGERS.submit, savePledge)
		function savePledge() {
			try {
				// get data
					let email = ELEMENTS.pledge.email.value.trim()
					let amount = Number(ELEMENTS.pledge.amount.value)

				// validate fund
					if (!DATA.fund || !DATA.fund.fund_id) {
						displayMessage(false, "No fund yet!")
						return
					}
					if (DATA.fund.status == "complete" || DATA.fund.status == "cancelled"
					 || new Date().getTime() > new Date(DATA.fund.timestamp).getTime()) {
						displayMessage(false, "This fund already ended.")
						return
					}

				// validate pledge
					if (!email || !email.length || !CONSTANTS.emailRegex.test(email)) {
						displayMessage(false, "Enter your email so you'll know your share!'")
						return
					}
					if (isNaN(amount) || amount < 0) {
						displayMessage(false, "How much money are you pledging?")
						return
					}

				// message
					ELEMENTS.pledge.save.button.setAttribute("disabled", true)
					ELEMENTS.pledge.cancel.button.setAttribute("disabled", true)
					displayMessage(true, "Saving...")

				// query
					sendRequest("savePledge", {
						fund_id: DATA.fund.fund_id,
						pledge_id: DATA.pledge ? DATA.pledge.pledge_id : null,
						email: email,
						amount: amount
					})
			} catch (error) {console.log(error)}
		}

	/* cancelPledge */
		ELEMENTS.pledge.cancel.form.addEventListener(TRIGGERS.submit, cancelPledge)
		function cancelPledge() {
			try {
				// validate fund
					if (!DATA.fund || !DATA.fund.fund_id) {
						displayMessage(false, "No fund yet!")
						return
					}
					if (DATA.fund.status == "complete" || DATA.fund.status == "cancelled"
					 || new Date().getTime() > new Date(DATA.fund.timestamp).getTime()) {
						displayMessage(false, "This fund already ended.")
						return
					}

				// validate pledge
					if (!DATA.pledge || !DATA.pledge.pledge_id) {
						displayMessage(false, "No pledge yet!")
						return
					}

				// message
					ELEMENTS.pledge.save.button.setAttribute("disabled", true)
					ELEMENTS.pledge.cancel.button.setAttribute("disabled", true)
					displayMessage(true, "Cancelling...")

				// query
					sendRequest("cancelPledge", {
						fund_id: DATA.fund.fund_id,
						pledge_id: DATA.pledge.pledge_id
					})
			} catch (error) {console.log(error)}
		}

	/* resetPage */
		ELEMENTS.reset.form.addEventListener(TRIGGERS.submit, resetPage)
		function resetPage() {
			try {
				// clear all query parameters
					let currentURL = new URL(window.location.href)
						currentURL.search = ""
					window.location = currentURL
			} catch (error) {console.log(error)}
		}
