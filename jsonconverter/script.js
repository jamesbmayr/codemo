/*** globals ***/
	/* triggers */
		const TRIGGERS = {
			click: "click",
			input: "input"
		}

	/* elements */
		const ELEMENTS = {
			mappingName: document.querySelector("#mapping-name"),
			mappingSave: document.querySelector("#mapping-save"),
			mappingSuggestions: document.querySelector("#mapping-suggestions"),
			mappingList: document.querySelector("#mapping-list"),
			mappingAdd: document.querySelector("#mapping-add"),
			inputMessage: document.querySelector("#input-message"),
			inputUpload: document.querySelector("#input-upload"),
			inputText: document.querySelector("#input-text"),
			inputConvert: document.querySelector("#input-convert"),
			outputTable: document.querySelector("#output-table"),
			outputTableCopy: document.querySelector("#output-table-copy"),
			outputText: document.querySelector("#output-text"),
			outputTextCopy: document.querySelector("#output-text-copy"),
			outputDownload: document.querySelector("#output-download")
		}

	/* constants */
		const CONSTANTS = {
			copyDelay: 1000 // ms
		}

/*** mapping ***/
	/* addMapping */
		ELEMENTS.mappingAdd.addEventListener(TRIGGERS.click, addMapping)
		addMapping()
		function addMapping() {
			try {
				// new row
					const row = document.createElement("div")
						row.className = "mapping-row"
					ELEMENTS.mappingList.appendChild(row)

						const jsonPath = document.createElement("input")
							jsonPath.className = "mapping-json"
							jsonPath.type = "text"
							jsonPath.placeholder = "path.to.field"
							jsonPath.setAttribute("autocomplete", "off")
							jsonPath.setAttribute("autocapitalize", "off")
							jsonPath.setAttribute("spellcheck", "false")
						row.appendChild(jsonPath)

						const arrow = document.createElement("span")
							arrow.className = "mapping-arrow"
							arrow.innerHTML = "&rarr;"
						row.appendChild(arrow)

						const csvColumn = document.createElement("input")
							csvColumn.className = "mapping-csv"
							csvColumn.type = "text"
							csvColumn.placeholder = "column"
							csvColumn.setAttribute("autocomplete", "off")
							csvColumn.setAttribute("autocapitalize", "off")
							csvColumn.setAttribute("spellcheck", "false")
						row.appendChild(csvColumn)

						const moveUp = document.createElement("button")
							moveUp.className = "mapping-up"
							moveUp.innerHTML = "&uarr;"
							moveUp.title = "move mapping up"
							moveUp.addEventListener(TRIGGERS.click, moveMappingUp)
						row.appendChild(moveUp)

						const moveDown = document.createElement("button")
							moveDown.className = "mapping-down"
							moveDown.innerHTML = "&darr;"
							moveDown.title = "move mapping down"
							moveDown.addEventListener(TRIGGERS.click, moveMappingDown)
						row.appendChild(moveDown)

						const deleteButton = document.createElement("button")
							deleteButton.className = "mapping-delete"
							deleteButton.innerHTML = "&times;"
							deleteButton.title = "delete mapping"
							deleteButton.addEventListener(TRIGGERS.click, deleteMapping)
						row.appendChild(deleteButton)

				// focus
					jsonPath.focus()

				// return
					return row
			} catch (error) {console.log(error)}
		}

	/* moveMappingUp */
		function moveMappingUp(event) {
			try {
				// get parent & sibling
					const row = event.target.closest(".mapping-row")
					const previous = row.previousSibling
					if (!previous) {
						return
					}

				// move
					ELEMENTS.mappingList.insertBefore(row, previous)
			} catch (error) {console.log(error)}
		}

	/* moveMappingDown */
		function moveMappingDown(event) {
			try {
				// get parent & sibling
					const row = event.target.closest(".mapping-row")
					const next = row.nextSibling
					if (!next) {
						return
					}

				// move
					ELEMENTS.mappingList.insertBefore(next, row)
			} catch (error) {console.log(error)}
		}

	/* deleteMapping */
		function deleteMapping(event) {
			try {
				// get parent
					const row = event.target.closest(".mapping-row")

				// delete
					row.remove()
			} catch (error) {console.log(error)}
		}

	/* searchMapping */
		ELEMENTS.mappingName.addEventListener(TRIGGERS.input, searchMapping)
		ELEMENTS.mappingName.addEventListener(TRIGGERS.click, searchMapping)
		function searchMapping(event) {
			try {
				// access localstorage
					const savedData = getLocalstorage() || null
					if (!savedData) {
						return
					}

				// clear suggestions
					ELEMENTS.mappingSuggestions.innerHTML = ""

				// get search text
					const searchText = ELEMENTS.mappingName.value.trim()
					const lowercaseSearch = searchText.toLowerCase()

				// filter
					const keys = Object.keys(savedData) || []
					const filteredKeys = (searchText ? keys.filter(key => key.trim().toLowerCase().includes(lowercaseSearch)) : keys).sort()

				// create suggestions
					for (const i in filteredKeys) {
						const suggestionElement = document.createElement("button")
							suggestionElement.className = "mapping-suggestion"
							suggestionElement.title = 
							suggestionElement.innerHTML = 
							suggestionElement.value = filteredKeys[i]
							suggestionElement.addEventListener(TRIGGERS.click, loadMapping)
						ELEMENTS.mappingSuggestions.append(suggestionElement)
					}
			} catch (error) {console.log(error)}
		}

	/* loadMapping */
		function loadMapping(event) {
			try {
				// get name
					const name = event.target.value

				// access localstorage
					const savedData = getLocalstorage() || {}

				// find in savedData
					const mapping = savedData[name]
					if (!mapping) {
						ELEMENTS.inputMessage.innerHTML = "Mapping not found."
						return
					}

				// delete mappings
					ELEMENTS.mappingList.innerHTML = ""

				// add mapping
					for (const i in mapping) {
						const row = addMapping()
						row.querySelector(".mapping-json").value = i
						row.querySelector(".mapping-csv").value = mapping[i]
					}

				// set name
					ELEMENTS.mappingName.value = name
					ELEMENTS.mappingSave.focus()
			} catch (error) {console.log(error)}
		}

	/* saveMapping */
		ELEMENTS.mappingSave.addEventListener(TRIGGERS.click, saveMapping)
		function saveMapping() {
			try {
				// get name
					const name = ELEMENTS.mappingName.value.trim()
					if (!name) {
						ELEMENTS.inputMessage.innerHTML = "Name this mapping."
						return
					}

				// get mapping
					const mapping = getMapping()

				// access localstorage
					const savedData = getLocalstorage() || {}

				// update
					if (!mapping || !Object.keys(mapping).length) {
						delete savedData[name]
					}
					else {
						savedData[name] = mapping
					}

				// save
					window.localStorage.jsonconverter = JSON.stringify(savedData)

				// check
					ELEMENTS.mappingSave.setAttribute("checkmark", true)

				// uncheck
					setTimeout(() => {
						ELEMENTS.mappingSave.removeAttribute("checkmark")
					}, CONSTANTS.copyDelay)
			} catch (error) {console.log(error)}
		}

	/* getLocalstorage */
		function getLocalstorage() {
			try {
				return JSON.parse(window.localStorage.jsonconverter ?? {})
			} catch (error) {
				return null
			}
		}

/*** data ***/
	/* uploadFile */
		ELEMENTS.inputUpload.addEventListener(TRIGGERS.input, uploadFile)
		function uploadFile(event) {
			try {
				// get file
					let file = ELEMENTS.inputUpload.files[0]

				// no file
					if (!file) {
						return
					}

				// read file into textarea
					const reader = new FileReader()
						reader.onload = event => {
							const fileString = String(event.target.result) || ""
							ELEMENTS.inputText.value = fileString
							
							ELEMENTS.inputUpload.value = null
							ELEMENTS.inputText.focus()
						}
						reader.readAsText(file)
			} catch (error) {console.log(error)}
		}

	/* convertText */
		ELEMENTS.inputConvert.addEventListener(TRIGGERS.click, convertText)
		function convertText() {
			try {
				// clear results
					ELEMENTS.inputMessage.innerHTML = ""
					ELEMENTS.outputText.value = null
					ELEMENTS.outputTable.innerHTML = ""

				// get text
					const text = ELEMENTS.inputText.value.trim() || ""
					if (!text || !text.length) {
						ELEMENTS.inputMessage.innerHTML = "Upload or enter JSON to convert."
						return
					}

					let json = null
					try {
						json = JSON.parse(text)
					} catch (error) {
						ELEMENTS.inputMessage.innerHTML = "Invalid JSON."
						return
					}

				// get mapping
					const mapping = getMapping()
					if (!mapping) {
						return
					}

				// get header row
					const headerRow = ["#"]
					for (const i in mapping) {
						headerRow.push(mapping[i])
					}

				// csvRows
					const csvRows = []				
					for (const j in json) {
						const row = [j]
						for (const m in mapping) {
							const value = getValue(json[j], m)
							row.push(value)
						}
						csvRows.push(row)
					}

				// no rows
					if (!csvRows.length) {
						ELEMENTS.inputMessage.innerHTML = "No CSV results."
						return
					}

				// add header
					csvRows.unshift(headerRow)

				// display results
					displayResults(csvRows)
			} catch (error) {console.log(error)}
		}

	/* getMapping */
		function getMapping() {
			try {
				// no mapping
					const mappingRows = Array.from(ELEMENTS.mappingList.querySelectorAll(".mapping-row")) || []
					if (!mappingRows) {
						ELEMENTS.inputMessage.innerHTML = "Add one or more JSON &rarr; CSV mappings."
						return
					}

				// get mapping
					const mapping = {}
					for (const i in mappingRows) {
						// get values
							const jsonPath = mappingRows[i].querySelector(".mapping-json").value.trim() || ""
							const csvColumn = mappingRows[i].querySelector(".mapping-csv").value.trim() || ""

						// no json path
							if (!jsonPath || !jsonPath.length) {
								ELEMENTS.inputMessage.innerHTML = "One or more mappings are missing a JSON field."
								return
							}

						// no csv column
							if (!csvColumn || !csvColumn.length) {
								ELEMENTS.inputMessage.innerHTML = "One or more mappings are missing a CSV column."
								return
							}

						// save
							mapping[jsonPath] = csvColumn
					}

				// return
					return mapping
			} catch (error) {console.log(error)}
		}

	/* getValue */
		function getValue(data, jsonPath) {
			try {
				// break down
					const pathArray = jsonPath.split(".")

				// recursion
					if (pathArray.length > 1) {
						const subData = data[pathArray[0]]
						if (subData !== undefined) {
							return getValue(subData, pathArray.slice(1).join("."))
						}
						return ""
					}

				// grab value
					let value = data[jsonPath]
					if (value === null || value === undefined) {
						return undefined
					}
					if (typeof value == "object") {
						value = JSON.stringify(value)
					}
					return value
			} catch (error) {console.log(error)}
		}

/*** results ***/
	/* displayResults */
		function displayResults(csvRows) {
			try {
				// table
					const tableElement = document.createElement("table")
					ELEMENTS.outputTable.appendChild(tableElement)

					const tableBody = document.createElement("tbody")
					tableElement.appendChild(tableBody)

						const headerRowElement = document.createElement("tr")
						tableBody.appendChild(headerRowElement)
						for (const i in csvRows[0]) {
							const headerCellElement = document.createElement("th")
								headerCellElement.innerText = csvRows[0][i]
							headerRowElement.appendChild(headerCellElement)
						}

						for (let j = 1; j < csvRows.length; j++) {
							const rowElement = document.createElement("tr")
							tableBody.appendChild(rowElement)

							for (let k = 0; k < csvRows[j].length; k++) {
								const cellElement = document.createElement(k ? "td" : "th")
									cellElement.innerText = csvRows[j][k]
								rowElement.appendChild(cellElement)
							}
						}

				// text
					const csvRowsEscaped = csvRows.map(row => 
						row.map(value => {
							if (typeof value == "string") {
								value = value.replace(/"/g, `""`)
								if (value.includes(",")) {
									value = `"${value}"`
								}
							}
							return value
						}).join(",")
					).join("\n")
					

					ELEMENTS.outputText.value = csvRowsEscaped
			} catch (error) {console.log(error)}
		}

	/* copyText */
		ELEMENTS.outputTextCopy.addEventListener(TRIGGERS.click, copyText)
		function copyText() {
			try {
				// get text
					const text = ELEMENTS.outputText.value.trim()
					if (!text) {
						return
					}

				// copy to clipboard
					navigator.clipboard.writeText(text).then(() => {
						ELEMENTS.outputTextCopy.setAttribute("checkmark", true)
					})

				// uncheck
					setTimeout(() => {
						ELEMENTS.outputTextCopy.removeAttribute("checkmark")
					}, CONSTANTS.copyDelay)
			} catch (error) {console.log(error)}
		}

	/* copyTable */
		ELEMENTS.outputTableCopy.addEventListener(TRIGGERS.click, copyTable)
		function copyTable() {
			try {
				// get table
					const tableHTML = ELEMENTS.outputTable.innerHTML
					if (!tableHTML) {
						return
					}

				// copy to clipboard
					try {
						// chrome, edge, safari
							navigator.clipboard.write([
								new ClipboardItem({
									"text/html": new Blob([tableHTML], {type: "/text/html"})
								})
							]).then(() => {
								ELEMENTS.outputTableCopy.setAttribute("checkmark", true)
							}).catch(error => {
								ELEMENTS.inputMessage.innerHTML = "Unable to copy table."
							})
					} catch (error) {
						// firefox
							try {
								window.getSelection().selectAllChildren(ELEMENTS.outputTable)
								document.execCommand("copy")
								ELEMENTS.outputTableCopy.setAttribute("checkmark", true)
							} catch (error) {
								ELEMENTS.inputMessage.innerHTML = "Unable to copy table."
							}
					}

				// uncheck
					setTimeout(() => {
						ELEMENTS.outputTableCopy.removeAttribute("checkmark")
					}, CONSTANTS.copyDelay)
			} catch (error) {console.log(error)}
		}

	/* downloadFile */
		ELEMENTS.outputDownload.addEventListener(TRIGGERS.click, downloadFile)
		function downloadFile() {
			try {
				// get text
					const fileString = ELEMENTS.outputText.value
					if (!fileString || !fileString.trim().length) {
						return
					}

				// get name
					const name = ELEMENTS.mappingName.value.trim() || "jsonConverter"

				// package up
					const link = document.createElement("a")
						link.id = "output-file-link"
						link.setAttribute("href", "data:text/csv;charset=utf-8," + encodeURIComponent(fileString))
						link.setAttribute("download", `${name}_${new Date().getTime()}.csv`)
						link.onclick = () => {
							link.remove()
						}
					
				// click
					document.body.appendChild(link)
					link.click()
			} catch (error) {console.log(error)}
		}


