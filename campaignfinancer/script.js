/*** globals ***/
	/* elements */
		const ELEMENTS = {
			form: document.querySelector("#form"),
			search: document.querySelector("#search"),
			cycle: document.querySelector("#cycle"),
			minimum: document.querySelector("#minimum"),
			candidateList: document.querySelector("#candidate-list"),
			aboutButton: document.querySelector("#about-button"),
			aboutOverlay: document.querySelector("#about-overlay"),
			aboutClose: document.querySelector("#about-close")
		}

	/* configs */
		const CONFIGS = {
			startingYear: 2000,
			api_url: "https://api.open.fec.gov/v1/",
			api_key: "R8VsEKxynUmTpiTZbDBIvVBkzipp8TISITLNgfFc",
			api_endpoints: {
				candidates: {
					path: "candidates/search",
					currentCycle: Math.ceil(new Date().getFullYear() / 2) * 2
				},
				committees: {
					path: "committees"
				},
				contributions: {
					path: "schedules/schedule_a",
					per_page: 100,
					min_amount: 2901,
					default_amount: 10000,
					is_individual: false,
					sort: "-contribution_receipt_amount"
				}
			},
			empties: ["none", "null", "unknown", "undefined", "not employed", "unemployed", "self", "retired", "", "?"],
			contributionTypes: {
				"contributions from individuals/persons other than political committees": "individual",
				"transfers from other authorized committees": "organization",
				"transfers from authorized committees": "organization",
				"contributions from other political committees": "organization",
				"loans received from the candidate": "self",
				"contributions from the candidate": "self",
				"loans received from or guaranteed by candidate	": "self",
				"total amount of other receipts": "other receipts",
				"offsets to operating expenditures": "reimbursement",
				"offsets to expenditures - operating": "reimbursement"
			},
			contributionColumns: ["amount", "name", "type", "info", "memo", "via", "date", "city", "state"],
			alphanumeric: 36,
			arbitrarilyLarge: 1000000000000000000,
			numberPrecision: 100,
			defaultSort: {
				column: "amount",
				direction: "descending"
			},
			filterDelay: 1000
		}

	/* state */
		const STATE = {
			search: {
				timestamp: null,
				query: null,
				cycle: null,
				min_amount: null
			},
			candidates: {}
		}

/*** interaction ***/
	/* createYears */
		createYears()
		function createYears() {
			try {
				// current year
					let currentYear = new Date().getFullYear()
					if (currentYear % 2) {
						currentYear += 1
					}

				// loop through
					for (let year = currentYear; year >= CONFIGS.startingYear; year -= 2) {
						const option = document.createElement("option")
							option.value = option.innerText = year
						ELEMENTS.cycle.appendChild(option)
					}
			} catch (error) {console.log(error)}
		}

	/* requestCandidateOrCommittee */
		ELEMENTS.form.addEventListener("submit", requestCandidateOrCommittee)
		function requestCandidateOrCommittee(event) {
			try {
				// validate
					let query = (ELEMENTS.search.value || "").trim()
					if (!query || !query.length) {
						ELEMENTS.search.setAttribute("invalid", true)
						return
					}
					ELEMENTS.search.removeAttribute("invalid")
					
					let cycle = ELEMENTS.cycle.value || CONFIGS.api_endpoints.candidates.currentCycle
					
					let min_amount = ELEMENTS.minimum.value.toString() || ""
					if (!min_amount.length) {
						ELEMENTS.minimum.setAttribute("invalid", true)
						return
					}
					ELEMENTS.minimum.removeAttribute("invalid")
					min_amount = Math.max(Math.floor(min_amount * CONFIGS.numberPrecision) / CONFIGS.numberPrecision, CONFIGS.api_endpoints.contributions.min_amount)

				// update state
					STATE.search = {
						timestamp: new Date().getTime(),
						query: query,
						cycle: Number(cycle),
						min_amount: Number(min_amount)
					}

				// loading spinner
					ELEMENTS.candidateList.innerHTML = ""
					let loadingSpinner = document.createElement("div")
						loadingSpinner.innerHTML = "&orarr;"
						loadingSpinner.className = "loading-spinner"
					ELEMENTS.candidateList.appendChild(loadingSpinner)

					let loadingCounter = document.createElement("div")
						loadingCounter.innerHTML = ""
						loadingCounter.className = "loading-counter"
					ELEMENTS.candidateList.appendChild(loadingCounter)

				// API request for candidates
					sendGet(STATE.search.timestamp, CONFIGS.api_endpoints.candidates.path, {
						q: 		STATE.search.query,
						cycle: 	STATE.search.cycle,
						page: 	1
					}, loadingCounter, function(candidateData) {
						// loading spinner
							ELEMENTS.candidateList.innerHTML = ""
							let loadingSpinner = document.createElement("div")
								loadingSpinner.innerHTML = "&orarr;"
								loadingSpinner.className = "loading-spinner"
							ELEMENTS.candidateList.appendChild(loadingSpinner)

							let loadingCounter = document.createElement("div")
								loadingCounter.innerHTML = ""
								loadingCounter.className = "loading-counter"
							ELEMENTS.candidateList.appendChild(loadingCounter)

						// API request for committees
							sendGet(STATE.search.timestamp, CONFIGS.api_endpoints.committees.path, {
								q: STATE.search.query
							}, loadingCounter, function(committeeData) {
								// combine
									receiveCandidatesAndCommittees(candidateData, committeeData)
							})
					})
			} catch (error) {console.log(error)}
		}

	/* requestContributions */
		function requestContributions(event) {
			try {
				// get committee_id
					let committeeElement = event.target.closest(".committee-details")
					if (!committeeElement) {
						return
					}
					let committee_id = committeeElement.getAttribute("committee_id")
					let candidate_id = committeeElement.closest(".candidate-section").getAttribute("candidate_id")

				// get committee
					if (!STATE.candidates[candidate_id] || !STATE.candidates[candidate_id].committees[committee_id]) {
						return
					}
					let committee = STATE.candidates[candidate_id].committees[committee_id]

				// already fetched?
					if (committee.fetched) {
						return
					}

				// update search time
					STATE.search.timestamp = new Date().getTime()

				// get cycle
					let cycle = committee.cycle || CONFIGS.api_endpoints.candidates.currentCycle
					let min_amount = committee.min_amount || CONFIGS.api_endpoints.contributions.default_amount

				// loading spinner
					let loadingSpinner = document.createElement("div")
						loadingSpinner.className = "loading-spinner"
						loadingSpinner.innerHTML = "&orarr;"
					committee.element.appendChild(loadingSpinner)

					let loadingCounter = document.createElement("div")
						loadingCounter.className = "loading-counter"
						loadingCounter.innerText = ""
					committee.element.appendChild(loadingCounter)

				// API request
					sendGet(STATE.search.timestamp, CONFIGS.api_endpoints.contributions.path, {
						committee_id: 	committee_id,
						candidate_id: 	candidate_id,
						two_year_transaction_period: cycle,
						min_amount: 	min_amount,
						is_individual: 	CONFIGS.api_endpoints.contributions.is_individual,
						per_page: 		CONFIGS.api_endpoints.contributions.per_page,
						sort: 			CONFIGS.api_endpoints.contributions.sort,
						page: 			1
					}, loadingCounter, receiveContributions)
			} catch (error) {console.log(error)}
		}

/*** API ***/
	/* sendGet */
		function sendGet(timestamp, path, parameters, loadingCounter, callback, results) {
			try {
				// no longer the most relevant search?
					if (STATE.search.timestamp !== timestamp) {
						let loadingSpinner = loadingCounter.parentNode.querySelector(".loading-spinner")
						if (loadingSpinner) {
							loadingSpinner.remove()
						}
						loadingCounter.remove()
						return
					}

				// initialize results
					results = results || []

				// parameters
					let parameterArray = []
					for (let i in parameters) {
						parameterArray.push(i + "=" + parameters[i])
					}

				// url
					let url = CONFIGS.api_url + path + "?api_key=" + CONFIGS.api_key + "&" + parameterArray.join("&")

				// request
					let request = new XMLHttpRequest()
						request.open("GET", url, true)
						request.onload = function() {
							if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
								// parse response
									let response = JSON.parse(request.response)

								// no results this time
									if (!response || !response.results || !response.results.length) {
										// no results at all
											if (!results.length) {
												callback({success: false, message: "no results", results: null, request: {path: path, parameters: parameters}})
												return
											}

										// results from before
											callback({success: true, results: results, request: {path: path, parameters: parameters}})
											return
									}

								// add to existing results
									results = results.concat(response.results)

								// update loading counter
									if (loadingCounter) {
										loadingCounter.innerText = parameters.page + " / " + response.pagination.pages
									}

								// more results?
									if (parameters.page < response.pagination.pages) {
										// update counters
											parameters.page += 1
											parameters.last_index = response.pagination.last_indexes ? response.pagination.last_indexes.last_index : null
											parameters.last_contribution_receipt_amount = response.pagination.last_indexes ? response.pagination.last_indexes.last_contribution_receipt_amount : null

										// recursion
											sendGet(timestamp, path, parameters, loadingCounter, callback, results)
											return
									}

								// done
									setTimeout(function() {
										callback({success: true, results: results, request: {path: path, parameters: parameters}})
									}, 0)
							}
						}
						request.send()
			} catch (error) {console.log(error)}
		}

/*** receives ***/
	/* receiveCandidatesAndCommittees */
		function receiveCandidatesAndCommittees(candidatesResponse, committeesResponse) {
			try {
				// clear
					STATE.candidates = {}

				// errors
					let errorMessages = []
					if (!candidatesResponse || !candidatesResponse.success) {
						errorMessages.push(candidatesResponse && candidatesResponse.message ? "candidate search: " + candidatesResponse.message : "could not fetch candidates")
					}
					if (!committeesResponse || !committeesResponse.success) {
						errorMessages.push(committeesResponse && committeesResponse.message ? "committee search: " + committeesResponse.message : "could not fetch other committees")
					}
					if (errorMessages.length) {
						ELEMENTS.candidateList.innerHTML = "<div class='error-message'>" + errorMessages.join("<br>") + "</div>"
					}

				// loop through candidates --> add to state
					let committeeIDs = []
					if (candidatesResponse && candidatesResponse.results && candidatesResponse.results.length) {
						for (let i in candidatesResponse.results) {
							// result
								let result = candidatesResponse.results[i]

							// remap
								let candidate = {
									id: 		result.candidate_id || ("unknown-" + Math.floor(Math.random() * CONFIGS.arbitrarilyLarge).toString(CONFIGS.alphanumeric)),
									cycle: 		STATE.search.cycle,
									name: 		(result.name || "").toLowerCase(),
									incumbency: result.incumbent_challenge_full || "",
									office: 	result.office_full || "",
									state: 		result.state || "",
									party: 		(result.party_full || "").toLowerCase(),
									committees: {}
								}

							// loop through committees
								for (let j in result.principal_committees) {
									// subresult
										let subresult = result.principal_committees[j]

									// not in cycle?
										if (!subresult.cycles.includes(STATE.search.cycle)) {
											continue
										}

									// remap
										let committee = {
											id: 			subresult.committee_id,
											name: 			(subresult.affiliated_committee_name && !CONFIGS.empties.includes(subresult.affiliated_committee_name.toLowerCase())) ? subresult.affiliated_committee_name.toLowerCase() : subresult.name.toLowerCase(),
											cycle: 			STATE.search.cycle,
											type: 			subresult.committee_type_full,
											min_amount: 	STATE.search.min_amount,
											fetched: 		false,
											sortColumn: 	CONFIGS.defaultSort.column,
											sortDirection: 	CONFIGS.defaultSort.direction,
											filters: 		{},
											includes: 		{},
											contributions: 	[]
										}

									// add to candidate
										candidate.committees[committee.id] = committee

									// log ID
										committeeIDs.push(committee.id)
								}

							// add to state
								if (Object.keys(candidate.committees).length) {
									STATE.candidates[candidate.id] = candidate
								}
						}
					}

				// other committees
					if (committeesResponse && committeesResponse.results && committeesResponse.results.length) {
						// non-candidate to hold them
							let nonCandidate = {
								id: 		("other-" + Math.floor(Math.random() * CONFIGS.arbitrarilyLarge).toString(CONFIGS.alphanumeric)),
								cycle: 		STATE.search.cycle,
								name: 		"other committees",
								nonCandidate: true,
								committees: {}
							}

						// loop through
							for (let i in committeesResponse.results) {
								// result
									let subresult = committeesResponse.results[i]

								// already in a candidate bucket?
									if (committeeIDs.includes(subresult.committee_id)) {
										continue
									}

								// not in cycle?
									if (!subresult.cycles.includes(STATE.search.cycle)) {
										continue
									}

								// remap
									let committee = {
										id: 			subresult.committee_id,
										name: 			(subresult.affiliated_committee_name && !CONFIGS.empties.includes(subresult.affiliated_committee_name.toLowerCase())) ? subresult.affiliated_committee_name.toLowerCase() : subresult.name.toLowerCase(),
										type: 			subresult.committee_type_full,
										cycle: 			STATE.search.cycle,
										min_amount: 	STATE.search.min_amount,
										fetched: 		false,
										sortColumn: 	CONFIGS.defaultSort.column,
										sortDirection: 	CONFIGS.defaultSort.direction,
										filters: 		{},
										includes: 		{},
										contributions: 	[]
									}

								// add to nonCandidate
									nonCandidate.committees[committee.id] = committee
							}

						// add to state (only if results)
							if (Object.keys(nonCandidate.committees).length) {
								STATE.candidates[nonCandidate.id] = nonCandidate
							}
					}

				// display
					displayCandidates()
			} catch (error) {console.log(error)}
		}

	/* receiveContributions */
		function receiveContributions(contributionsResponse) {
			try {
				// get committee
					let candidate_id = contributionsResponse.request.parameters.candidate_id
					let committee_id = contributionsResponse.request.parameters.committee_id
					if (!candidate_id || !committee_id) {
						return
					}

				// set fetched
					let committee = STATE.candidates[candidate_id].committees[committee_id]
						committee.fetched = true

				// get contributionsList
					let contributionsList = committee.contributions

				// errors
					if (!contributionsResponse.success) {
						let loadingSpinner = committee.element.querySelector(".loading-spinner")
						if (loadingSpinner) {
							loadingSpinner.remove()
						}
						let loadingCounter = committee.element.querySelector(".loading-counter")
						if (loadingCounter) {
							loadingCounter.remove()
						}
						committee.table.innerHTML = "<div class='error-message'>" + (contributionsResponse && contributionsResponse.message ? "contributions search: " + contributionsResponse.message : "could not fetch contributions") + "</div>"
						return
					}
				
				// loop through --> add to state
					for (let i in contributionsResponse.results) {
						// result
							let result = contributionsResponse.results[i]

						// remap
							let contribution = {
								id: 		result.sub_id || ("unknown-" + Math.floor(Math.random() * CONFIGS.arbitrarilyLarge).toString(CONFIGS.alphanumeric)),
								amount: 	result.contribution_receipt_amount || "",
								name: 		(result.contributor_first_name && result.contributor_last_name) ? (result.contributor_first_name.toLowerCase() + " " + result.contributor_last_name.toLowerCase()) : (result.contributor_name || "").toLowerCase(),
								info: 		((result.contributor_occupation ? result.contributor_occupation.toLowerCase() : "") + 
												(result.contributor_occupation && result.contributor_employer && !CONFIGS.empties.includes(result.contributor_employer.toLowerCase()) ? ", " : "") +
												(result.contributor_employer && !CONFIGS.empties.includes(result.contributor_employer.toLowerCase()) ? result.contributor_employer.toLowerCase() : ""))
												|| (result.entity_type_desc || "").toLowerCase(),
								memo: 		result.memo_text ? result.memo_text.toLowerCase() : "",
								via: 		result.contributor ? result.contributor.name.toLowerCase() : "",
								city: 		result.contributor_city ? result.contributor_city.toLowerCase() : "",
								state: 		result.contributor_state ? result.contributor_state.toLowerCase() : "",
								date: 		result.contribution_receipt_date ? new Date(result.contribution_receipt_date).toLocaleDateString() : "",
								type: 		(CONFIGS.contributionTypes[(result.line_number_label || "").toLowerCase()] || (result.line_number_label || "").toLowerCase()) + 
												(result.receipt_type_desc && result.receipt_type_desc.trim().toLowerCase() == "transfer in affiliated" ? " - affiliated" : "")
							}

						// add to state
							contributionsList.push(contribution)
					}

				// display
					displayContributions({candidate_id: candidate_id, committee_id: committee_id})
			} catch (error) {console.log(error)}
		}

/*** displays ***/
	/* displayCandidates */
		function displayCandidates() {
			try {
				// clear previous results & loading spinner
					ELEMENTS.candidateList.innerHTML = ""

				// loop through candidates
					for (let i in STATE.candidates) {
						// candidate
							let candidate = STATE.candidates[i]

						// section
							let candidateElement = document.createElement("section")
								candidateElement.className = "candidate-section"
								candidateElement.setAttribute("candidate_id", candidate.id)
							ELEMENTS.candidateList.appendChild(candidateElement)

							let sectionHeader = document.createElement("h2")
								sectionHeader.className = "candidate-section-header"
								sectionHeader.innerText = candidate.name
							candidateElement.appendChild(sectionHeader)

							let sectionSubheader = document.createElement("h3")
								sectionSubheader.className = "candidate-section-subheader"
								sectionSubheader.innerHTML = candidate.nonCandidate ? ("<span class='candidate-section-candidacy'>not affiliated directly</span>")
								 : ("<span class='candidate-section-candidacy'>" + candidate.incumbency + "</span> candidate - " + 
									"<span class='candidate-section-office'>" + candidate.office + "</span>" +
									(candidate.state ? " - " : "") + (candidate.state ? ("<span class='candidate-section-state'>" + candidate.state + "</span>") : "") + " - " + 
									"<span class='candidate-section-party'>" + candidate.party + "</span>")
							candidateElement.appendChild(sectionSubheader)

						// attach element
							candidate.element = candidateElement

						// committees
							displayCommittees({candidate_id: candidate.id})

						// divider
							let divider = document.createElement("hr")
								divider.className = "candidate-section-divider"
							candidateElement.appendChild(divider)
					}
			} catch (error) {console.log(error)}
		}

	/* displayCommittees */
		function displayCommittees(options) {
			try {
				// no candidate_id
					if (!options || !options.candidate_id) {
						return
					}

				// get candidate element
					let candidateElement = STATE.candidates[options.candidate_id].element

				// loop through committees
					for (let i in STATE.candidates[options.candidate_id].committees) {
						// item
							let committee = STATE.candidates[options.candidate_id].committees[i]

						// summary
							let committeeDetails = document.createElement("details")
								committeeDetails.className = "committee-details"
								committeeDetails.setAttribute("committee_id", committee.id)
								committeeDetails.setAttribute("cycle", committee.cycle)
							candidateElement.appendChild(committeeDetails)

							let committeeSummary = document.createElement("summary")
								committeeSummary.addEventListener("click", requestContributions)
								committeeSummary.className = "committee-summary"
								committeeSummary.innerText = committee.name + "(" + committee.type + ")"
							committeeDetails.appendChild(committeeSummary)
							committee.element = committeeDetails

						// options
							let contributionsOptions = document.createElement("div")
								contributionsOptions.className = "contributions-options"
							committeeDetails.appendChild(contributionsOptions)

							// count
								let countLabel = document.createElement("label")
								contributionsOptions.appendChild(countLabel)

								let countLabelText = document.createElement("div")
									countLabelText.innerText = "count: "
								countLabel.appendChild(countLabelText)

								let contributionsCount = document.createElement("output")
									contributionsCount.className = "contributions-count"
									contributionsCount.value = "?"
								countLabel.appendChild(contributionsCount)
								committee.contributionsCount = contributionsCount

							// transfers
								let transfersLabel = document.createElement("label")
								contributionsOptions.appendChild(transfersLabel)

								let transfersCheckbox = document.createElement("input")
									transfersCheckbox.type = "checkbox"
									transfersCheckbox.setAttribute("include", "transfers")
									transfersCheckbox.addEventListener("input", setInclude)
								transfersLabel.appendChild(transfersCheckbox)

								let transfersLabelText = document.createElement("div")
									transfersLabelText.innerText = "include transfers"
								transfersLabel.appendChild(transfersLabelText)

							// reimbursements
								let reimbursementsLabel = document.createElement("label")
								contributionsOptions.appendChild(reimbursementsLabel)

								let reimbursementsCheckbox = document.createElement("input")
									reimbursementsCheckbox.type = "checkbox"
									reimbursementsCheckbox.setAttribute("include", "reimbursements")
									reimbursementsCheckbox.addEventListener("input", setInclude)
								reimbursementsLabel.appendChild(reimbursementsCheckbox)

								let reimbursementsLabelText = document.createElement("div")
									reimbursementsLabelText.innerText = "include reimbursements"
								reimbursementsLabel.appendChild(reimbursementsLabelText)

						// header table
							let headerTable = document.createElement("table")
								headerTable.className = "contributions-header-table"
							committeeDetails.appendChild(headerTable)
							committee.headers = headerTable

							// rows
								let headerRow = document.createElement("tr")
									headerRow.className = "contributions-header-row"
								headerTable.appendChild(headerRow)

								let filterRow = document.createElement("tr")
									filterRow.className = "contributions-filter-row"
								headerTable.appendChild(filterRow)

							// cells
								for (let j in CONFIGS.contributionColumns) {
									// header cell
										let headerCell = document.createElement("th")
											headerCell.innerText = CONFIGS.contributionColumns[j]
											headerCell.setAttribute("column", CONFIGS.contributionColumns[j])
											headerCell.addEventListener("click", setSort)
										headerRow.appendChild(headerCell)

									// filter cell
										let filterCell = document.createElement("td")
											filterCell.setAttribute("column", CONFIGS.contributionColumns[j])
										filterRow.appendChild(filterCell)

										let filterInput = document.createElement("input")
											filterInput.type = "text"
											filterInput.placeholder = "all"
											filterInput.setAttribute("column", CONFIGS.contributionColumns[j])
											filterInput.addEventListener("input", setFilter)
										filterCell.appendChild(filterInput)
								}

						// data table
							let contributionsTable = document.createElement("table")
								contributionsTable.className = "contributions-table"
							committeeDetails.appendChild(contributionsTable)
							committee.table = contributionsTable
					}
			} catch (error) {console.log(error)}
		}

	/* displayContributions */
		function displayContributions(options) {
			try {
				// no candidate_id or committee_id
					if (!options || !options.candidate_id || !options.committee_id) {
						return
					}

				// get committee & contributions
					let committee = STATE.candidates[options.candidate_id].committees[options.committee_id]
					let contributions = Array.from(committee.contributions)
					let contributionsCount = committee.contributionsCount

				// includes
					if (!committee.includes.reimbursements) {
						contributions = contributions.filter(function(c) {
							return c.type !== "reimbursement"
						})
					}
					if (!committee.includes.transfers) {
						contributions = contributions.filter(function(c) {
							return !c.type.includes("affiliated")
						})
					}

				// filter
					for (let key in committee.filters) {
						if ("amount" == key) {
							let searchNumber = committee.filters[key]
							contributions = contributions.filter(function(c) {
								return c[key] == searchNumber
							})
						}
						else if ("date" == key) {
							let searchDate = new Date(committee.filters[key]).toLocaleDateString()
							contributions = contributions.filter(function(c) {
								return (new Date(c[key]).toLocaleDateString() == searchDate)
							})
						}
						else {
							let searchString = committee.filters[key].toLowerCase()
							contributions = contributions.filter(function(c) {
								return c[key].toLowerCase().includes(searchString)
							})
						}
					}

				// set count
					contributionsCount.value = contributions.length || 0

				// sort
					if (contributions.length) {
						// amount
							if (committee.sortColumn == "amount") {
								if (committee.sortDirection == "ascending") {
									contributions = contributions.sort(function(a, b) {
										return a.amount - b.amount
									})
								}
								else if (committee.sortDirection == "descending") {
									contributions = contributions.sort(function(a, b) {
										return b.amount - a.amount
									})
								}
							}

						// date
							else if (committee.sortColumn == "date") {
								if (committee.sortDirection == "ascending") {
									contributions = contributions.sort(function(a, b) {
										return new Date(a.date).getTime() - new Date(b.date).getTime()
									})
								}
								else if (committee.sortDirection == "descending") {
									contributions = contributions.sort(function(a, b) {
										return new Date(b.date).getTime() - new Date(a.date).getTime()
									})
								}
							}

						// name
							else {
								if (committee.sortDirection == "ascending") {
									contributions = contributions.sort(function(a, b) {
										return b[committee.sortColumn].localeCompare(a[committee.sortColumn])
									})
								}
								else if (committee.sortDirection == "descending") {
									contributions = contributions.sort(function(a, b) {
										return a[committee.sortColumn].localeCompare(b[committee.sortColumn])
									})
								}
							}
					}

				// display header sort
					let headerCells = Array.from(committee.headers.querySelectorAll("th"))
					for (let i in headerCells) {
						if (headerCells[i].getAttribute("column") == committee.sortColumn) {
							headerCells[i].setAttribute("sort", "true")
							headerCells[i].setAttribute("sort-direction", committee.sortDirection)
						}
						else {
							headerCells[i].removeAttribute("sort")
							headerCells[i].removeAttribute("sort-direction")
						}
					}

				// get & clear table
					let contributionsTable = committee.table
						contributionsTable.innerHTML = ""

				// loop through & display
					for (let i = 0; i < contributions.length; i++) {
						// contribution
							let contribution = contributions[i]

						// list item
							let row = document.createElement("tr")
								row.className = "contribution-row"
								row.setAttribute("contribution-id", contribution.id)
								row.style.order = i
							contributionsTable.appendChild(row)

						// info
							for (let j in CONFIGS.contributionColumns) {
								let cell = document.createElement("td")
									cell.setAttribute("column", CONFIGS.contributionColumns[j])
									cell.innerHTML = (CONFIGS.contributionColumns[j] == "amount") ? contribution[CONFIGS.contributionColumns[j]].toFixed(2) : contribution[CONFIGS.contributionColumns[j]]
								row.appendChild(cell)
							}
					}

				// no contributions
					if (!contributions.length) {
						contributionsTable.innerHTML = "<div class='error-message'>no contributions match this filter criteria</div>"
					}

				// remove loading spinner
					let loadingSpinner = committee.element.querySelector(".loading-spinner")
					if (loadingSpinner) {
						loadingSpinner.remove()
					}

				// remove loading counter
					let loadingCounter = committee.element.querySelector(".loading-counter")
					if (loadingCounter) {
						loadingCounter.remove()
					}
			} catch (error) {console.log(error)}
		}

/*** interaction ***/
	/* setSort */
		function setSort(event) {
			try {
				// get values
					let headerCell = event.target
					let sortColumn = headerCell.getAttribute("column")
					let isCurrentSort = headerCell.getAttribute("sort")
					let currentSortDirection = headerCell.getAttribute("sort-direction")

				// current sort? flip direction
					let newSortDirection = null
					if (isCurrentSort) {
						newSortDirection = (currentSortDirection == "descending" ? "ascending" : "descending")
					}
					else {
						newSortDirection = CONFIGS.defaultSort.direction
					}

				// get candidate & committee
					let committeeElement = headerCell.closest(".committee-details")
					let committee_id = committeeElement.getAttribute("committee_id")

					let candidateElement = headerCell.closest(".candidate-section")
					let candidate_id = candidateElement.getAttribute("candidate_id")

				// update state
					STATE.candidates[candidate_id].committees[committee_id].sortColumn = sortColumn
					STATE.candidates[candidate_id].committees[committee_id].sortDirection = newSortDirection

				// set loading spinner
					let loadingSpinner = document.createElement("div")
						loadingSpinner.innerHTML = "&orarr;"
						loadingSpinner.className = "loading-spinner"
					committeeElement.insertBefore(loadingSpinner, STATE.candidates[candidate_id].committees[committee_id].table)

				// redisplay
					setTimeout(function() {
						displayContributions({candidate_id: candidate_id, committee_id: committee_id})
					}, 0)
			} catch (error) {console.log(error)}
		}

	/* setFilter */
		function setFilter(event) {
			try {
				// get values
					let filterInput = event.target
					let filterColumn = filterInput.getAttribute("column")

				// get candidate & committee
					let committeeElement = filterInput.closest(".committee-details")
					let committee_id = committeeElement.getAttribute("committee_id")

					let candidateElement = filterInput.closest(".candidate-section")
					let candidate_id = candidateElement.getAttribute("candidate_id")

				// get filter value
					let filterValue = filterInput.value.trim()

				// update state
					if (filterValue !== null && filterValue.toString().length) {
						STATE.candidates[candidate_id].committees[committee_id].filters[filterColumn] = filterValue
					}
					else {
						delete STATE.candidates[candidate_id].committees[committee_id].filters[filterColumn]
					}

				// clear existing delays
					if (STATE.candidates[candidate_id].committees[committee_id].filterDelay) {
						clearTimeout(STATE.candidates[candidate_id].committees[committee_id].filterDelay)
					}

				// delay while typing
					STATE.candidates[candidate_id].committees[committee_id].filterDelay = setTimeout(function() {
						// set loading spinner
							let loadingSpinner = document.createElement("div")
								loadingSpinner.innerHTML = "&orarr;"
								loadingSpinner.className = "loading-spinner"
							committeeElement.insertBefore(loadingSpinner, STATE.candidates[candidate_id].committees[committee_id].table)

						// redisplay
							setTimeout(function() {
								displayContributions({candidate_id: candidate_id, committee_id: committee_id})
							}, 0)
					}, CONFIGS.filterDelay)
			} catch (error) {console.log(error)}
		}

	/* setInclude */
		function setInclude(event) {
			try {
				// get values
					let includeInput = event.target
					let includeType = includeInput.getAttribute("include")

				// get candidate & committee
					let committeeElement = includeInput.closest(".committee-details")
					let committee_id = committeeElement.getAttribute("committee_id")

					let candidateElement = includeInput.closest(".candidate-section")
					let candidate_id = candidateElement.getAttribute("candidate_id")

				// update state
					STATE.candidates[candidate_id].committees[committee_id].includes[includeType] = includeInput.checked || false
				
				// set loading spinner
					let loadingSpinner = document.createElement("div")
						loadingSpinner.innerHTML = "&orarr;"
						loadingSpinner.className = "loading-spinner"
					committeeElement.insertBefore(loadingSpinner, STATE.candidates[candidate_id].committees[committee_id].table)

				// redisplay
					setTimeout(function() {
						displayContributions({candidate_id: candidate_id, committee_id: committee_id})
					}, 0)
			} catch (error) {console.log(error)}
		}
	
	/* toggleAbout */
		ELEMENTS.aboutButton.addEventListener("click", toggleAbout)
		ELEMENTS.aboutClose.addEventListener("click", toggleAbout)
		function toggleAbout(event) {
			try {
				// get state
					let overlayState = ELEMENTS.aboutOverlay.getAttribute("selected") || false
					let newState = !overlayState

				// set state
					if (newState) {
						ELEMENTS.aboutButton.setAttribute("selected", true)
						ELEMENTS.aboutOverlay.setAttribute("selected", true)
					}
					else {
						ELEMENTS.aboutButton.removeAttribute("selected")
						ELEMENTS.aboutOverlay.removeAttribute("selected")
					}

				// blur
					ELEMENTS.aboutButton.blur()
			} catch (error) {console.log(error)}
		}
