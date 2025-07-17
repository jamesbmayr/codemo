/*** globals ***/
	const TRIGGERS = {
		input: "input",
		dragover: "dragover",
		drop: "drop"
	}

	const ELEMENTS = {
		upload1: document.querySelector("#input-upload-1"),
		upload2: document.querySelector("#input-upload-2"),
		input1: document.querySelector("#input-1"),
		input2: document.querySelector("#input-2"),
		inputOptionsSpacing: document.querySelector("#input-options-checkbox-spacing"),
		inputOptionsCasing: document.querySelector("#input-options-checkbox-casing"),
		inputOptionsPlacing: document.querySelector("#input-options-checkbox-placing"),
		outputSummaryDeletionsCount: document.querySelector("#output-summary-deletions-count"),
		outputSummaryMatchesCount: document.querySelector("#output-summary-matches-count"),
		outputSummaryInsertionsCount: document.querySelector("#output-summary-insertions-count"),
		outputOptionsDeletions: document.querySelector("#output-options-checkbox-deletion"),
		outputOptionsMatches: document.querySelector("#output-options-checkbox-match"),
		outputOptionsInsertions: document.querySelector("#output-options-checkbox-insertion"),
		outputOptionsFormatting: document.querySelector("#output-options-checkbox-formatting"),
		output: document.querySelector("#output")
	}

	const STATE = {
		casing: true,
		spacing: true,
		placing: true,
		deletion: true,
		match: true,
		insertion: true,
		formatting: false,
		waitTime: 1000, // ms
		waitLoop: null
	}

/*** user actions ***/
	/* uploadFile */
		ELEMENTS.upload1.addEventListener(TRIGGERS.input, uploadFile)
		ELEMENTS.upload2.addEventListener(TRIGGERS.input, uploadFile)
		function uploadFile(event) {
			try {
				// textarea
					const fileInput = event.target
					const textarea = fileInput == ELEMENTS.upload1 ? ELEMENTS.input1 : ELEMENTS.input2

				// reader
					const reader = new FileReader()
						reader.onload = event => {
							try {
								const fileString = String(event.target.result)
								textarea.value = fileString
								
								fileInput.value = null
								fileInput.blur()

								compareInputs()
							} catch (error) {console.log(error)}
						}
						reader.readAsText(fileInput.files[0])
			} catch (error) {console.log(error)}
		}

	/* dragFile */
		ELEMENTS.input1.addEventListener("dragover", dragFile)
		ELEMENTS.input2.addEventListener("dragover", dragFile)
		function dragFile(event) {
			try {
				// prevent default
					event.preventDefault()
			} catch (error) {console.log(error)}
		}

	/* dropFile */
		ELEMENTS.input1.addEventListener("drop", dropFile)
		ELEMENTS.input2.addEventListener("drop", dropFile)
		function dropFile(event) {
			try {
				// prevent default
					event.preventDefault()

				// get target
					const textarea = event.target.closest("textarea")

				// get file contents
					if (!event.dataTransfer || !event.dataTransfer.items) {
						return
					}
					const file = [...event.dataTransfer.items][0].getAsFile()
					if (!file) {
						return
					}
				
				// get contents
					const reader = new FileReader()
						reader.readAsText(file)
						reader.onload = event => {
							const fileString = String(event.target.result) || ""
							textarea.value = fileString

							compareInputs()
						}
			} catch (error) {console.log(error)}
		}

	/* updateInputs */
		ELEMENTS.input1.addEventListener(TRIGGERS.input, updateInputs)
		ELEMENTS.input2.addEventListener(TRIGGERS.input, updateInputs)
		function updateInputs(event) {
			try {
				// wait --> compare
					clearInterval(STATE.waitLoop)
					STATE.waitLoop = setTimeout(compareInputs, STATE.waitTime)
			} catch (error) {console.log(error)}
		}

	/* updateCheckbox */
		ELEMENTS.inputOptionsSpacing.addEventListener(TRIGGERS.input, updateCheckbox)
		ELEMENTS.inputOptionsCasing.addEventListener( TRIGGERS.input, updateCheckbox)
		ELEMENTS.inputOptionsPlacing.addEventListener(TRIGGERS.input, updateCheckbox)
		ELEMENTS.outputOptionsDeletions.addEventListener(TRIGGERS.input, updateCheckbox)
		ELEMENTS.outputOptionsMatches.addEventListener(TRIGGERS.input, updateCheckbox)
		ELEMENTS.outputOptionsInsertions.addEventListener(TRIGGERS.input, updateCheckbox)
		ELEMENTS.outputOptionsFormatting.addEventListener(TRIGGERS.input, updateCheckbox)
		function updateCheckbox(event) {
			try {
				// get checkbox
					const checkbox = event.target.closest("input")
					const id = checkbox.id.split("-")
					const option = id[id.length - 1]

				// update
					STATE[option] = Boolean(checkbox.checked)

				// compare
					compareInputs()
			} catch (error) {console.log(error)}
		}

/*** comparison ***/
	/* compareInputs */
		function compareInputs() {
			try {
				// get text
					const text1 = ELEMENTS.input1.value
					const text2 = ELEMENTS.input2.value

				// empty
					if (!text1.trim().length || !text2.trim().length) {
						displayOutputs([], [])
						return
					}

				// split at newlines
					const rows1 = text1.split(/\n/g).map((text, index) => {
						return {text: text, index: index + 1, type: "match"}
					})
					const rows2 = text2.split(/\n/g).map((text, index) => {
						return {text: text, index: index + 1, type: "match"}
					})

				// find matches
					let rows1Index = 0
					let rows2Index = 0
					matchLoop: while (rows1Index < rows1.length && rows2Index < rows2.length) {
						// match
							if (isMatch(rows1[rows1Index]?.text, rows2[rows2Index]?.text)) {
								rows1[rows1Index].type = "match"
								rows2[rows2Index].type = "match"
								rows1Index++
								rows2Index++
								continue matchLoop
							}

						// offset
							let offset = 1
							offsetLoop: while (rows1Index + offset < rows1.length || rows2Index + offset < rows2.length) {

								// insertion
									if (isMatch(rows1[rows1Index]?.text, rows2[rows2Index + offset]?.text)) {
										// match found
											rows1[rows1Index].type = "match"
											rows2[rows2Index + offset].type = "match"

										// insert blank rows in rows1
											for (let i = 0; i < offset; i++) {
												rows1.splice(rows1Index, 0, {type: "insertion", text: "", index: "+"})
											}

										// mark in-between rows in rows2 as insertions
											for (let i = 0; i < offset; i++) {
												rows2[rows2Index + i].type = "insertion"
											}

										// catch up
											rows2Index += (offset + 1)
											rows1Index = rows2Index
											continue matchLoop
									}

								// deletion
									if (isMatch(rows1[rows1Index + offset]?.text, rows2[rows2Index]?.text)) {
										// match found
											rows1[rows1Index + offset].type = "match"
											rows2[rows2Index].type = "match"

										// insert blank rows in rows2
											for (let i = 0; i < offset; i++) {
												rows2.splice(rows2Index, 0, {type: "deletion", text: "", index: "-"})
											}

										// mark in-between rows in rows1 as deletions
											for (let i = 0; i < offset; i++) {
												rows1[rows1Index + i].type = "deletion"
											}

										// catch up
											rows1Index += (offset + 1)
											rows2Index = rows1Index
											continue matchLoop
									}

								// increment
									offset++
							}

						// still no match --> change
							rows1[rows1Index].type = "deletion"
							rows2[rows2Index].type = "insertion"
							rows2.splice(rows2Index, 0, {type: "deletion", text: "", index: "-"})
							rows1.splice(rows1Index + 1, 0, {type: "insertion", text: "", index: "+"})
							rows1Index += 2
							rows2Index += 2
							continue matchLoop
					}

				// remaining rows in rows1 --> all deletions
					if (rows1Index < rows1.length) {
						for (let r = rows1Index; r < rows1.length; r++) {
							rows1[r].type = "deletion"
							rows2[r] = {type: "deletion", text: "", index: "-"}
							rows2Index++
						}
					}

				// remaining rows in rows2 --> all insertions
					if (rows2Index < rows2.length) {
						for (let r = rows2Index; r < rows2.length; r++) {
							rows1[r] = {type: "insertion", text: "", index: "+"}
							rows2[r].type = "insertion"
							rows1Index++
						}
					}

				// display
					displayOutputs(rows1, rows2)
			} catch (error) {console.log(error)}
		}
	
	/* isMatch */
		function isMatch(text1, text2) {
			try {
				// no line
					if (typeof text1 !== "string" || typeof text2 !== "string") {
						return false
					}

				// text to check
					let textToCheck1 = text1
					let textToCheck2 = text2

				// options: casing
					if (!STATE.casing) {
						textToCheck1 = textToCheck1.toLowerCase()
						textToCheck2 = textToCheck2.toLowerCase()
					}

				// options: spacing
					if (!STATE.spacing) {
						textToCheck1 = textToCheck1.trim()
						textToCheck2 = textToCheck2.trim()
					}

				// options: placing
					if (!STATE.placing) {
						textToCheck1 = textToCheck1.split(/\s/).sort().join(" ")
						textToCheck2 = textToCheck2.split(/\s/).sort().join(" ")
					}

				// check
					return textToCheck1 == textToCheck2
			} catch (error) {console.log(error)}
		}

	/* displayOutputs */
		function displayOutputs(rows1, rows2) {
			try {
				// clear
					ELEMENTS.output.innerHTML = ""

				// summary
					ELEMENTS.outputSummaryMatchesCount.innerText = rows2.filter(row => row.type == "match").length || 0
					ELEMENTS.outputSummaryDeletionsCount.innerText = rows2.filter(row => row.type == "deletion").length || 0
					ELEMENTS.outputSummaryInsertionsCount.innerText = rows2.filter(row => row.type == "insertion").length || 0

				// loop through to create table
					for (let rowNumber = 0; rowNumber < rows1.length && rowNumber < rows2.length; rowNumber++) {
						displayRow(rows1[rowNumber], rows2[rowNumber])
					}
			} catch (error) {console.log(error)}
		}

	/* displayRow */
		function displayRow(column1Data, column2Data) {
			try {
				// type
					if (!STATE[column1Data.type] && !STATE[column2Data.type]) {
						return
					}

				// element
					const rowElement = document.createElement("tr")
						rowElement.className = "row"
					ELEMENTS.output.appendChild(rowElement)

				// left
					const column1 = document.createElement("td")
						column1.className = "row-cell"
						column1.setAttribute("row-type", column1Data.type)
					rowElement.appendChild(column1)

						const column1Number = document.createElement("div")
							column1Number.className = "row-number"
							column1Number.innerText = column1Data.index
						column1.appendChild(column1Number)

						const column1Text = document.createElement("div")
							column1Text.className = "row-text"
							column1Text.innerText = STATE.formatting ? column1Data.text.replace(/ /g, "·").replace(/\t/g, "───►") : column1Data.text
						column1.appendChild(column1Text)

				// middle
					const middle = document.createElement("td")
						middle.className = "row-middle"
					rowElement.appendChild(middle)

				// right
					const column2 = document.createElement("td")
						column2.className = "row-cell"
						column2.setAttribute("row-type", column2Data.type)
					rowElement.appendChild(column2)

						const column2Number = document.createElement("div")
							column2Number.className = "row-number"
							column2Number.innerText = column2Data.index
						column2.appendChild(column2Number)

						const column2Text = document.createElement("div")
							column2Text.className = "row-text"
							column2Text.innerText = STATE.formatting ? column2Data.text.replace(/ /g, "·").replace(/\t/g, "───►") : column2Data.text
						column2.appendChild(column2Text)
			} catch (error) {console.log(error)}
		}
