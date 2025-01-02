/*** globals ***/
	/* triggers */
		const TRIGGERS = {
			click: "click",
			input: "input"
		}

	/* elements */
		const ELEMENTS = {
			csv: {
				upload: document.querySelector("#csv-upload"),
				textarea: document.querySelector("#csv-textarea"),
				convert: document.querySelector("#csv-convert"),
				message: document.querySelector("#csv-message")
			},
			json: {
				textarea: document.querySelector("#json-textarea"),
				copy: document.querySelector("#json-copy"),
				export: document.querySelector("#json-export")
			}
		}

	/* constants */
		const CONSTANTS = {
			copyDelay: 1000, // ms
			newlineRegex: /(?<=^[^"]*(?:"[^"]*"[^"]*)*)\r?\n/g,
			commaRegex: /(?<=^[^"]*(?:"[^"]*"[^"]*)*),/g
		}

/*** interaction ***/
	/* uploadCSV */
		ELEMENTS.csv.upload.addEventListener(TRIGGERS.input, uploadCSV)
		function uploadCSV() {
			try {
				// get file
					let file = ELEMENTS.csv.upload.files[0]

				// no file
					if (!file) {
						return
					}

				// read file into textarea
					const reader = new FileReader()
						reader.onload = event => {
							const fileString = String(event.target.result) || ""
							ELEMENTS.csv.textarea.value = fileString
							
							ELEMENTS.csv.upload.value = null
							ELEMENTS.csv.textarea.focus()
						}
						reader.readAsText(file)
			} catch (error) {console.log(error)}
		}

	/* convertCSV */
		ELEMENTS.csv.convert.addEventListener(TRIGGERS.click, convertCSV)
		function convertCSV() {
			try {
				// clear error
					ELEMENTS.csv.message.innerText = ""

				// get text
					const text = ELEMENTS.csv.textarea.value.trim()
					if (!text) {
						ELEMENTS.csv.message.innerText = "no CSV"
						return
					}

				// get rows
					const rows = text.split(CONSTANTS.newlineRegex)
					if (rows.length < 2) {
						ELEMENTS.csv.message.innerText = `CSV has no rows`
						return
					}

				// get headers
					const headerRow = rows[0].split(CONSTANTS.commaRegex)
					const headers = headerRow.map(header => header.trim())
					for (const h in headers) {
						if (headers[h].slice(0, 1) == '"' && headers[h].slice(-1) == '"') {
							headers[h] = headers[h].slice(1, -1)
						}
					}

				// empty json
					const json = []

				// loop through rows
					for (let r = 1; r < rows.length; r++) {
						const row = rows[r].split(CONSTANTS.commaRegex)
						if (row.length !== headers.length) {
							ELEMENTS.csv.message.innerText = `row ${r + 1} has a different column count`
							return
						}

						const obj = {}
						for (let c = 0; c < headers.length; c++) {
							obj[headers[c]] = row[c]
							if (obj[headers[c]].slice(0, 1) == '"' && obj[headers[c]].slice(-1) == '"') {
								obj[headers[c]] = obj[headers[c]].slice(1, -1)
							}
						}
						json.push(obj)
					}

				// display
					ELEMENTS.json.textarea.value = JSON.stringify(json, null, 2)
			} catch (error) {console.log(error)}
		}

	/* copyJSON */
		ELEMENTS.json.copy.addEventListener(TRIGGERS.click, copyJSON)
		function copyJSON() {
			try {
				// get text
					const text = ELEMENTS.json.textarea.value.trim()
					if (!text) {
						return
					}

				// copy to clipboard
					navigator.clipboard.writeText(text).then(() => {
						ELEMENTS.json.copy.setAttribute("checkmark", true)
					})

				// uncheck
					setTimeout(() => {
						ELEMENTS.json.copy.removeAttribute("checkmark")
					}, CONSTANTS.copyDelay)
			} catch (error) {console.log(error)}
		}

	/* exportJSON */
		ELEMENTS.json.export.addEventListener(TRIGGERS.click, exportJSON)
		function exportJSON() {
			try {
				// get text
					const fileString = ELEMENTS.json.textarea.value
					if (!fileString || !fileString.trim().length) {
						return
					}

				// package up
					const link = document.createElement("a")
						link.id = "json-file-link"
						link.setAttribute("href", "data:application/json;charset=utf-8," + encodeURIComponent(fileString))
						link.setAttribute("download", `csvConverter_${new Date().getTime()}.json`)
						link.onclick = () => {
							link.remove()
						}
					
				// click
					document.body.appendChild(link)
					link.click()
			} catch (error) {console.log(error)}
		}
