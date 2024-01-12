/*** globals ***/
	/* triggers */
		const TRIGGERS = {
			click: "click",
			mousedown: "mousedown",
			mousemove: "mousemove",
			mouseup: "mouseup",
			input: "input",
		}
		if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
			TRIGGERS.mousedown = "touchstart"
			TRIGGERS.mousemove = "touchmove"
			TRIGGERS.mouseup = "touchend"
		}
		
	/* elements */
		const ELEMENTS = {
			body: document.body,
			container: document.querySelector("#container"),
			switch: document.querySelector("#switch"),
			import: document.querySelector("#import-input"),
			export: document.querySelector("#export"),
			addTimeline: document.querySelector("#add-timeline"),
			undo: document.querySelector("#undo"),
			timelines: {},
		}

	/* constants */
		const CONSTANTS = {
			largeNumber: 10e20, // n
			randomStringLength: 10, // n
			waitTime: 1000, // ms
			moveWait: 50, // ms
			plusWidth: 30, // px
			arrowWidth: 40, // px
			branchGapHeight: 80, // px
			connectionThreshold: 15, // px
			connectionXoffset: 12, // px
			connectionY2offset: 8, // px
			defaultTimeline: {
				x: 25, // px
				y: 275, // px
				w: window.innerWidth - 65, // px
				color: "#111111", // hex
				icon: "tech-location-marker-circle"
			},
			svg: {
				arrow: `<svg viewBox="29 29 42 42"><path d="M 49 50 C 49 48 48 47 46 45 C 43 42 41 40 39 38 C 37 36 37 33 39 31 C 41 29 44 29 46 31 C 50 35 55 40 60 45 C 62 47 63 48 63 50 C 63 52 62 53 60 55 C 55 60 50 65 46 69 C 44 71 41 71 39 69 C 37 67 37 64 39 62 C 41 60 43 58 46 55 C 48 53 49 52 49 50 Z"></path></svg>`,
				plus: `<svg viewBox="0 0 100 100"><path d="M 0 50 C 0 77.5 22.5 100 50 100 C 77.5 100 100 77.5 100 50 C 100 22.5 77.5 0 50 0 C 22.5 0 0 22.5 0 50 Z M 55 45 C 62 45 69 45 75 45 C 78 45 80 47 80 50 C 80 53 78 55 75 55 C 69 55 62 55 55 55 C 55 62 55 69 55 75 C 55 78 53 80 50 80 C 47 80 45 78 45 75 C 45 69 45 62 45 55 C 38 55 31 55 25 55 C 22 55 20 53 20 50 C 20 47 22 45 25 45 C 31 45 38 45 45 45 C 45 38 45 31 45 25 C 45 22 47 20 50 20 C 53 20 55 22 55 25 C 55 31 55 38 55 45 Z"></path></svg>`,
				trashcan: `<svg viewBox="10 10 80 80"><path d="M 67 30 C 70 30 73 30 76 30 C 78 30 80 32 80 34 C 80 35 80 35 80 36 C 80 38 78 40 76 40 C 72 40 70 40 70 41 C 70 51 70 63 70 74 C 70 77 67 80 64 80 C 55 80 45 80 36 80 C 33 80 30 77 30 74 C 30 63 30 51 30 41 C 30 40 28 40 24 40 C 22 40 20 38 20 36 C 20 35 20 35 20 34 C 20 32 22 30 24 30 C 27 30 30 30 33 30 C 36 30 37 29 37 26 C 37 23 40 20 43 20 C 47 20 53 20 57 20 C 60 20 63 23 63 26 C 63 29 64 30 67 30 Z"></path></svg>`,
				check: `<svg viewBox="10 10 80 80"><path d="M 40 60 C 47 53 63 37 72 28 C 74 26 77 26 79 28 C 81 30 81 33 79 35 C 70 44 54 60 44 70 C 42 72 38 72 36 70 C 26 60 24 58 21 55 C 19 53 19 50 21 48 C 23 46 26 46 28 48 C 31 51 33 53 40 60 Z"></path></svg>`,
				eyedropper: `<svg viewBox="10 10 80 80"><path d="M 61 42 C 64 39 61 36 58 39 C 50 47 47 50 43 54 C 42 55 45 58 46 57 C 50 53 53 50 61 42 Z M 53 54 C 46 61 35 72 30 77 C 23 84 16 77 23 70 C 28 65 39 54 46 47 C 51 42 56 37 57 36 C 58 35 58 34 57 33 C 55 31 54 29 56 27 C 58 25 60 26 62 28 C 63 29 65 31 65 26 C 65 19 75 19 78 22 C 81 25 81 35 74 35 C 69 35 71 37 72 38 C 74 40 75 42 73 44 C 71 46 69 45 67 43 C 66 42 65 42 64 43 C 63 44 58 49 53 54 Z"></path></svg>`,
				branch: `<svg viewBox="20 0 80 80"><path d="M 50 10 C 53 10 55 12 55 15 C 55 20 55 30 55 40 C 55 43 57 45 60 45 C 65 45 70 45 73 45 C 70 42 68 40 66 38 C 64 36 64 33 66 31 C 68 29 71 29 73 31 C 77 35 82 40 87 45 C 89 47 90 48 90 50 C 90 52 89 53 87 55 C 82 60 77 65 73 69 C 71 71 68 71 66 69 C 64 67 64 64 66 62 C 68 60 70 58 73 55 C 70 55 65 55 60 55 C 51 55 45 49 45 40 C 45 30 45 20 45 15 C 45 12 47 10 50 10 Z"></path></svg>`,
				connect: `<svg viewBox="0 0 100 100"><path d="M 62 55 C 57 55 52 60 47 65 C 42 70 37 75 27 75 C 24 75 20 75 15 75 C 12 75 10 73 10 70 C 10 67 12 65 15 65 C 20 65 23 65 26 65 C 35 65 44 56 44 50 C 44 44 35 35 26 35 C 24 35 20 35 15 35 C 12 35 10 33 10 30 C 10 27 12 25 15 25 C 20 25 25 25 27 25 C 37 25 42 30 47 35 C 52 40 57 45 62 45 C 65 45 70 45 73 45 C 70 42 68 40 66 38 C 64 36 64 33 66 31 C 68 29 71 29 73 31 C 77 35 82 40 87 45 C 89 47 90 48 90 50 C 90 52 89 53 87 55 C 82 60 77 65 73 69 C 71 71 68 71 66 69 C 64 67 64 64 66 62 C 68 60 70 58 73 55 C 70 55 65 55 62 55 Z"></path></svg>`,
				x: `<svg viewBox="10 10 80 80"><path d="M 50 43 C 55 38 60 33 64 29 C 66 27 69 27 71 29 C 73 31 73 34 71 36 C 67 40 62 45 57 50 C 62 55 67 60 71 64 C 73 66 73 69 71 71 C 69 73 66 73 64 71 C 60 67 55 62 50 57 C 45 62 40 67 36 71 C 34 73 31 73 29 71 C 27 69 27 66 29 64 C 33 60 38 55 43 50 C 38 45 33 40 29 36 C 27 34 27 31 29 29 C 31 27 34 27 36 29 C 40 33 45 38 50 43 Z"></path></svg>`,
				target: `<svg viewBox="20 20 60 60"><path d="M 30 50 C 30 61 39 70 50 70 C 61 70 70 61 70 50 C 70 39 61 30 50 30 C 39 30 30 39 30 50 Z M 40 50 C 40 44.5 44.5 40 50 40 C 55.5 40 60 44.5 60 50 C 60 55.5 55.5 60 50 60 C 44.5 60 40 55.5 40 50 Z M 20 50 C 20 33 33 20 50 20 C 67 20 80 33 80 50 C 80 67 67 80 50 80 C 33 80 20 67 20 50 Z"></path></svg>`,
				marker: `<svg viewBox="20 20 60 60"><path d="M 39 40 C 39 46 44 51 50 51 C 56 51 61 46 61 40 C 61 34 56 29 50 29 C 44 29 39 34 39 40 Z M 65 54 C 59 64 55 71 54 73 C 50 80 50 80 46 73 C 45 71 41 64 35 54 C 32 49 30 45 30 40 C 30 29 39 20 50 20 C 61 20 70 29 70 40 C 70 45 68 49 65 54 Z"></path></svg>`
			}
		}

	/* state */
		const STATE = {
			mode: "edit",
			cursor: {
				x: 0, // px
				y: 0, // px
			},
			selected: {
				timelineId: null,
				happeningId: null,
			},
			saveWait: null,
			history: []
		}

/*** tools ***/
	/* getRandom */
		function getRandom() {
			try {
				// random alphanumeric
					return Number(Math.random() * CONSTANTS.largeNumber).toString(36).slice(1, 1 + CONSTANTS.randomStringLength)
			} catch (error) {console.log(error)}
		}

	/* saveState */
		function saveState() {
			try {
				// wait
					clearTimeout(STATE.saveWait)
					STATE.saveWait = setTimeout(() => {
						// get latest state
							const timelines = {}
							for (const t in ELEMENTS.timelines) {
								timelines[t] = {
									id: ELEMENTS.timelines[t].id,
									parentTimeline: ELEMENTS.timelines[t].parentTimeline,
									parentHappening: ELEMENTS.timelines[t].parentHappening,
									name: ELEMENTS.timelines[t].name,
									x:  ELEMENTS.timelines[t].x,
									y:  ELEMENTS.timelines[t].y,
									w:  ELEMENTS.timelines[t].w,
									color: ELEMENTS.timelines[t].color,
									connectionY: ELEMENTS.timelines[t].connectionY,
									connectionX: ELEMENTS.timelines[t].connectionX,
									connectionY2: ELEMENTS.timelines[t].connectionY2,
									happenings: {}
								}

								for (const h in ELEMENTS.timelines[t].happenings) {
									timelines[t].happenings[h] = {
										id:    ELEMENTS.timelines[t].happenings[h].id,
										x:     ELEMENTS.timelines[t].happenings[h].x,
										color: ELEMENTS.timelines[t].happenings[h].color,
										icon:  ELEMENTS.timelines[t].happenings[h].icon,
										name:  ELEMENTS.timelines[t].happenings[h].name,
										time:  ELEMENTS.timelines[t].happenings[h].time,
										info:  ELEMENTS.timelines[t].happenings[h].info,
										branches: {}
									}

									for (const b in ELEMENTS.timelines[t].happenings[h].branches) {
										timelines[t].happenings[h].branches[b] = {
											id: ELEMENTS.timelines[t].happenings[h].branches[b].id,
											h: ELEMENTS.timelines[t].happenings[h].branches[b].h,
											color: ELEMENTS.timelines[t].happenings[h].branches[b].color
										}
									}
								}
							}

						// save to history
							STATE.history.push(JSON.stringify(timelines))

						// enable undo
							if (STATE.history.length > 1) {
								ELEMENTS.undo.removeAttribute("unavailable")
							}
					}, CONSTANTS.waitTime)
			} catch (error) {console.log(error)}
		}

	/* setState */
		function setState(timelines) {
			try {
				// clear existing
					for (const t in ELEMENTS.timelines) {
						ELEMENTS.timelines[t].element.remove()
						delete ELEMENTS.timelines[t]
					}

				// loop through data to create map
					for (const t in timelines) {
						ELEMENTS.timelines[t] = buildTimeline(timelines[t])

						for (const h in timelines[t].happenings) {
							ELEMENTS.timelines[t].happenings[h] = buildHappening(timelines[t].happenings[h], ELEMENTS.timelines[t].happeningsContainer)

							for (const b in timelines[t].happenings[h].branches) {
								ELEMENTS.timelines[t].happenings[h].branches[b] = buildBranch(timelines[t].happenings[h].branches[b], ELEMENTS.timelines[t].happenings[h].branchesContainer)
							}
						}
					}
			} catch (error) {console.log(error)}
		}

/*** menu ***/
	/* switchMode */
		ELEMENTS.switch.addEventListener(TRIGGERS.click, switchMode)
		function switchMode(event) {
			try {
				// view --> edit
					if (ELEMENTS.body.getAttribute("mode") == "view") {
						STATE.mode = "edit"
						ELEMENTS.body.setAttribute("mode", "edit")
						ELEMENTS.addTimeline.removeAttribute("disabled")
						ELEMENTS.undo.removeAttribute("disabled")

						for (const t in ELEMENTS.timelines) {
							const timeline = ELEMENTS.timelines[t]
								timeline.nameInput.removeAttribute("disabled")
								timeline.deleteButton.removeAttribute("disabled")
								timeline.colorLabel.removeAttribute("disabled")
								timeline.colorInput.removeAttribute("disabled")

							for (const h in timeline.happenings) {
								const happening = timeline.happenings[h]
									happening.nameInput.removeAttribute("disabled")
									happening.timeInput.removeAttribute("disabled")
									happening.infoInput.removeAttribute("disabled")
									happening.iconInput.removeAttribute("disabled")
									happening.deleteButton.removeAttribute("disabled")
									happening.colorLabel.removeAttribute("disabled")
									happening.colorInput.removeAttribute("disabled")
							}
						}
						return
					}

				// edit --> view
					STATE.mode = "view"
					ELEMENTS.body.setAttribute("mode", "view")
					ELEMENTS.addTimeline.setAttribute("disabled", true)
					ELEMENTS.undo.setAttribute("disabled", true)
					Array.from(ELEMENTS.container.querySelectorAll("[expanded]")).forEach(element => {
						element.removeAttribute("expanded")
					})

					for (const t in ELEMENTS.timelines) {
						const timeline = ELEMENTS.timelines[t]
							timeline.nameInput.setAttribute("disabled", true)
							timeline.deleteButton.setAttribute("disabled", true)
							timeline.colorLabel.setAttribute("disabled", true)
							timeline.colorInput.setAttribute("disabled", true)

						for (const h in timeline.happenings) {
							const happening = timeline.happenings[h]
								happening.nameInput.setAttribute("disabled", true)
								happening.timeInput.setAttribute("disabled", true)
								happening.infoInput.setAttribute("disabled", true)
								happening.iconInput.setAttribute("disabled", true)
								happening.deleteButton.setAttribute("disabled", true)
								happening.colorLabel.setAttribute("disabled", true)
								happening.colorInput.setAttribute("disabled", true)
						}
					}
			} catch (error) {console.log(error)}
		}

	/* importFile */
		ELEMENTS.import.addEventListener(TRIGGERS.input, importFile)
		function importFile(event) {
			try {
				// get file
					const file = ELEMENTS.import.files[0]

				// no file
					if (!file) {
						return
					}

				// read file
					const reader = new FileReader()
						reader.readAsText(file)
						reader.onload = event => {
							try {
								// try to parse data
									const content = String(event.target.result)
									if (!content || !content.length) {
										return
									}

								// set state
									setState(JSON.parse(content))

								// save
									saveState()

								// switch to edit mode
									if (ELEMENTS.body.getAttribute("mode") == "view") {
										switchMode()
									}
							} catch (error) {console.log(error)}
							
							ELEMENTS.import.value = null
						}
			} catch (error) {console.log(error)}
		}

	/* exportFile */
		ELEMENTS.export.addEventListener(TRIGGERS.click, exportFile)
		function exportFile(event) {
			try {
				// disable button
					ELEMENTS.export.setAttribute("downloading", true)

				// download
					const link = document.createElement("a")
						link.id = "download-link"
						link.setAttribute("href", "data:text/json;charset=utf-8," + encodeURIComponent(STATE.history[STATE.history.length - 1]))
						link.setAttribute("download", "timelineMaker_" + (new Date().getTime()) + ".json")
						link.addEventListener(TRIGGERS.click, () => link.remove())
					link.click()

				// async enable
					setTimeout(() => {
						ELEMENTS.export.removeAttribute("downloading")
					}, CONSTANTS.waitTime)
			} catch (error) {console.log(error)}
		}

	/* addTimeline */
		addTimeline()
		ELEMENTS.addTimeline.addEventListener(TRIGGERS.click, addTimeline)
		function addTimeline(event) {
			try {
				// not editing
					if (STATE.mode !== "edit") {
						return
					}

				// get min y
					let minY = CONSTANTS.defaultTimeline.y - CONSTANTS.branchGapHeight
					for (const t in ELEMENTS.timelines) {
						if (ELEMENTS.timelines[t].y > minY) {
							minY = ELEMENTS.timelines[t].y
						}
					}

				// parameters
					const x = CONSTANTS.defaultTimeline.x
					const y = minY + CONSTANTS.branchGapHeight
					const w = CONSTANTS.defaultTimeline.w
					const color = CONSTANTS.defaultTimeline.color

				// build default
					const timeline = buildTimeline({x, y, w, color})
					ELEMENTS.timelines[timeline.id] = timeline

				// save 
					saveState()
			} catch (error) {console.log(error)}
		}

	/* undoChange */
		ELEMENTS.undo.addEventListener(TRIGGERS.click, undoChange)
		function undoChange(event) {
			try {
				// no history
					if (STATE.history.length <= 1) {
						return
					}

				// remove current state
					STATE.history.pop()

				// set previous state
					setState(JSON.parse(STATE.history[STATE.history.length - 1]))

				// no more history?
					if (STATE.history.length <= 1) {
						ELEMENTS.undo.setAttribute("unavailable", true)
					}
			} catch (error) {console.log(error)}
		}

/*** cursor ***/
	/* moveCursor */
		window.addEventListener(TRIGGERS.mousemove, moveCursor)
		function moveCursor(event) {
			try {
				// get cursor position
					const cursorX = (event.touches ? event.touches[0].clientX : event.clientX)
					const cursorY = (event.touches ? event.touches[0].clientY : event.clientY)

				// update
					STATE.cursor.x = cursorX + ELEMENTS.container.scrollLeft
					STATE.cursor.y = cursorY + ELEMENTS.container.scrollTop

				// move pluses
					movePluses()

				// selected arrow
					moveArrow()

				// selected connection
					moveConnection()

				// selected happening
					moveHappening()
			} catch (error) {console.log(error)}
		}

	/* liftCursor */
		window.addEventListener(TRIGGERS.mouseup, liftCursor)
		function liftCursor(event) {
			try {
				// unselect everything
					unselectArrow()
					unselectConnection()
					unselectHappening()
			} catch (error) {console.log(error)}
		}

/*** branches ***/
	/* addBranch */
		function addBranch(event) {
			try {
				// not editing
					if (STATE.mode !== "edit") {
						return
					}

				// get happening & timeline
					const happeningElement = event.target.closest(".timeline-happening")
					const happeningId = happeningElement.id.replace("happening-", "")
					
					const timelineElement = happeningElement.closest(".timeline")
					const timelineId = timelineElement.id.replace("timeline-", "")

				// get farthest-down branch
					let minY = 0
					for (const b in ELEMENTS.timelines[timelineId].happenings[happeningId].branches) {
						if (ELEMENTS.timelines[timelineId].happenings[happeningId].branches[b].h > minY) {
							minY = ELEMENTS.timelines[timelineId].happenings[happeningId].branches[b].h
						}
					}

				// get position
					const x = ELEMENTS.timelines[timelineId].x + ELEMENTS.timelines[timelineId].happenings[happeningId].x
					const y = ELEMENTS.timelines[timelineId].y + minY + CONSTANTS.branchGapHeight
					const w = window.innerWidth - CONSTANTS.arrowWidth - x
					const color = ELEMENTS.timelines[timelineId].happenings[happeningId].color

				// build timeline
					const newTimeline = buildTimeline({x, y, w, color, parentTimeline: timelineId, parentHappening: happeningId})
					ELEMENTS.timelines[newTimeline.id] = newTimeline

				// attach to parent
					const h = newTimeline.y - ELEMENTS.timelines[timelineId].y
					const branch = buildBranch({id: newTimeline.id, h: h, color: newTimeline.color}, ELEMENTS.timelines[timelineId].happenings[happeningId].branchesContainer)
					ELEMENTS.timelines[timelineId].happenings[happeningId].branches[newTimeline.id] = branch

				// close all others
					Array.from(ELEMENTS.container.querySelectorAll("[expanded]")).forEach(element => {
						element.removeAttribute("expanded")
					})

				// focus
					newTimeline.element.setAttribute("expanded", true)
					newTimeline.controls.setAttribute("expanded", true)
					newTimeline.nameInput.focus()

				// save 
					saveState()
			} catch (error) {console.log(error)}
		}

	/* moveBranches */
		function moveBranches({dx, dy}, branches) {
			try {
				// happenings --> branches
					for (const b in branches) {
						// timeline
							const timeline = ELEMENTS.timelines[b]
								timeline.x += dx
								timeline.y += dy
								timeline.element.style.left = `${timeline.x}px`
								timeline.element.style.top  = `${timeline.y}px`

						// connectionX
							if (Math.abs(timeline.connectionX)) {
								timeline.connectionX -= dx
								timeline.connection2.style.width = `${Math.abs(timeline.connectionX)}px`
								timeline.connection2.style.transform = `translateX(${Math.min(0, timeline.connectionX)}px)`
								timeline.connection2.setAttribute("direction", timeline.connectionX < 0 ? "left" : timeline.connectionX > 0 ? "right" : "none")
							}

						// loop through happenings
							for (const h in timeline.happenings) {
								moveBranches({dx, dy}, timeline.happenings[h].branches)
							}
					}
			} catch (error) {console.log(error)}
		}

	/* toggleTimelineControls */
		function toggleTimelineControls(event) {
			try {
				// just moved
					if (STATE.moved) {
						delete STATE.moved
						return
					}

				// get timeline
					const timelineElement = event.target.closest(".timeline")
					const timelineId = timelineElement.id.replace("timeline-", "")
					const timeline = ELEMENTS.timelines[timelineId]

				// opened --> close
					if (timeline.controls.getAttribute("expanded")) {
						timeline.controls.removeAttribute("expanded")
						return
					}

				// prevent selection
					event.preventDefault()
					STATE.selected = {timelineId: null, happeningId: null}
					clearTimeout(STATE.saveWait)

				// close all others
					Array.from(ELEMENTS.container.querySelectorAll("[expanded]")).forEach(element => {
						element.removeAttribute("expanded")
					})

				// close --> open
					timelineElement.setAttribute("expanded", true)
					timeline.controls.setAttribute("expanded", true)
					timeline.nameInput.focus()
					timeline.closeButton.focus()
			} catch (error) {console.log(error)}
		}

	/* updateBranch */
		function updateBranch(event) {
			try {
				// get timeline
					const timelineElement = event.target.closest(".timeline")
					const timelineId = timelineElement.id.replace("timeline-", "")
					const timeline = ELEMENTS.timelines[timelineId]

				// by field
					if (event.target.className == "timeline-controls-name") {
						timeline.name = event.target.value
						timeline.nameLabel.innerHTML = timeline.name
					}
					else if (event.target.className == "timeline-controls-color") {
						timeline.color = event.target.value
						timeline.line.style.background = timeline.color
						timeline.arrow.style.color = timeline.color
						timeline.controls.style.background = timeline.color
						timeline.controlsToggle.style.color = timeline.color
						timeline.nameLabel.style.color = timeline.color
						timeline.connection.style.background = timeline.color
						timeline.connection2.style.background = timeline.color
						timeline.connection3.style.background = timeline.color

						if (timeline.parentTimeline && timeline.parentHappening) {
							const parentBranch = ELEMENTS.timelines[timeline.parentTimeline].happenings[timeline.parentHappening].branches[timeline.id]
							parentBranch.color = timeline.color
							parentBranch.element.style.borderColor = timeline.color
						}
					}

				// save 
					saveState()
			} catch (error) {console.log(error)}
		}

	/* deleteBranch */
		function deleteBranch(timeline) {
			try {
				// parent branch
					if (timeline.parentTimeline && timeline.parentHappening) {
						ELEMENTS.timelines[timeline.parentTimeline].happenings[timeline.parentHappening].branches[timeline.id].element.remove()
						delete ELEMENTS.timelines[timeline.parentTimeline].happenings[timeline.parentHappening].branches[timeline.id]
					}

				// loop through happenings
					for (const h in timeline.happenings) {
						for (const b in timeline.happenings[h].branches) {
							deleteBranch(ELEMENTS.timelines[b])
						}
					}

				// delete
					timeline.element.remove()
					delete ELEMENTS.timelines[timeline.id]
			} catch (error) {console.log(error)}
		}

	/* deleteTimeline */
		function deleteTimeline(event) {
			try {
				// not editing
					if (STATE.mode !== "edit") {
						return
					}

				// get timeline
					const timelineElement = event.target.closest(".timeline")
					const timelineId = timelineElement.id.replace("timeline-", "")
					const timeline = ELEMENTS.timelines[timelineId]

				// delete
					deleteBranch(timeline)

				// save 
					saveState()
			} catch (error) {console.log(error)}
		}

/*** plus ***/
	/* movePluses */
		function movePluses() {
			try {
				// not editing
					if (STATE.mode !== "edit") {
						return
					}

				// loop through timelines
					for (const t in ELEMENTS.timelines) {
						const timeline = ELEMENTS.timelines[t]
						const newX = Math.max(CONSTANTS.plusWidth, Math.min(timeline.w - CONSTANTS.arrowWidth, STATE.cursor.x - timeline.x))
						timeline.plus.style.left = `${newX}px`
					}
			} catch (error) {console.log(error)}
		}

	/* clickPlus */
		function clickPlus() {
			try {
				// not editing
					if (STATE.mode !== "edit") {
						return
					}

				// get timeline
					const id = event.target.closest(".timeline").id.replace("timeline-", "")
					const timeline = ELEMENTS.timelines[id]
					if (!timeline) {
						return
					}

				// build happening
					const x = Number(timeline.plus.style.left.replace("px", ""))
					const color = timeline.color
					const happening = buildHappening({x, color}, timeline.happeningsContainer)
					timeline.happenings[happening.id] = happening

				// close all others
					Array.from(ELEMENTS.container.querySelectorAll("[expanded]")).forEach(element => {
						element.removeAttribute("expanded")
					})

				// focus
					timeline.element.setAttribute("expanded", true)
					happening.element.setAttribute("expanded", true)
					happening.nameInput.focus()

				// save 
					saveState()
			} catch (error) {console.log(error)}
		}

/*** arrow ***/
	/* selectArrow */
		function selectArrow(event) {
			try {
				// not editing
					if (STATE.mode !== "edit") {
						return
					}

				// something selected
					if (STATE.selected.timelineId) {
						return
					}

				// close all others
					Array.from(ELEMENTS.container.querySelectorAll("[expanded]")).forEach(element => {
						element.removeAttribute("expanded")
					})

				// select
					STATE.selected.timelineId = event.target.closest(".timeline").id.replace("timeline-", "")
					if (event.target.closest(".timeline-controls-toggle")) {
						STATE.selected.controls = true
					}
			} catch (error) {console.log(error)}
		}

	/* moveArrow */
		function moveArrow() {
			try {
				// not editing
					if (STATE.mode !== "edit") {
						return
					}

				// no arrow selected
					if (!STATE.selected.timelineId || STATE.selected.happeningId || STATE.selected.connection) {
						return
					}

				// get timeline
					const timeline = ELEMENTS.timelines[STATE.selected.timelineId]
					if (!timeline) {
						return
					}

				// get farthest-right happening
					let minX = CONSTANTS.plusWidth
					for (const h in timeline.happenings) {
						const x = timeline.happenings[h].x
						if (x > minX) {
							minX = x
						}
					}

				// moved
					STATE.moved = true

				// get parent timeline
					const minY = timeline.parentTimeline ? ELEMENTS.timelines[timeline.parentTimeline].y : (CONSTANTS.defaultTimeline.y - CONSTANTS.branchGapHeight)

				// get change
					const line = timeline.element
					const newW = Math.max(minX + CONSTANTS.arrowWidth, STATE.cursor.x - timeline.x)
					const newY = Math.max(minY + CONSTANTS.branchGapHeight, STATE.cursor.y)

					const oldY = timeline.y
					const dy = newY - oldY
				
				// move arrow (and timeline)
					timeline.y = newY
					line.style.top  = `${timeline.y}px`
					if (!STATE.selected.controls) {
						timeline.w = newW
						line.style.width = `${timeline.w}px`
					}

				// update connection
					if (Math.abs(timeline.connectionY)) {
						timeline.connectionY -= dy
						timeline.connection.style.height = `${Math.abs(timeline.connectionY)}px`
						timeline.connection.style.transform = `translateY(${Math.min(0, timeline.connectionY)}px)`
						timeline.connection.setAttribute("direction", timeline.connectionY < 0 ? "up" : timeline.connectionY > 0 ? "down" : "none")
					}

					if (!Math.abs(timeline.connectionY) && Math.abs(timeline.connectionY2)) {
						timeline.connectionY2 -= dy
						timeline.connection3.style.height = `${Math.abs(timeline.connectionY2)}px`
						timeline.connection3.style.transform = `translateY(${Math.min(0, timeline.connectionY2)}px)`
					}

				// update parent branch
					if (timeline.parentTimeline && timeline.parentHappening) {
						const parentBranch = ELEMENTS.timelines[timeline.parentTimeline].happenings[timeline.parentHappening].branches[timeline.id]
							parentBranch.h += dy
							parentBranch.element.style.height = `${parentBranch.h}px`
					}

				// update children branches
					for (const h in timeline.happenings) {
						moveBranches({dx: 0, dy: dy}, timeline.happenings[h].branches)
					}
			} catch (error) {console.log(error)}
		}

	/* unselectArrow */
		function unselectArrow() {
			try {
				// no arrow selected
					if (!STATE.selected.timelineId || STATE.selected.happeningId || STATE.selected.connection) {
						return
					}

				// unselect
					STATE.selected.timelineId = null
					delete STATE.selected.controls
					setTimeout(() => {
						delete STATE.moved
					}, CONSTANTS.moveWait)

				// save 
					saveState()
			} catch (error) {console.log(error)}
		}

/*** connections ***/
	/* selectConnection */
		function selectConnection(event) {
			try {
				// not editing
					if (STATE.mode !== "edit") {
						return
					}

				// something selected
					if (STATE.selected.timelineId) {
						return
					}

				// close all others
					Array.from(ELEMENTS.container.querySelectorAll("[expanded]")).forEach(element => {
						element.removeAttribute("expanded")
					})

				// select
					STATE.selected.timelineId = event.target.closest(".timeline").id.replace("timeline-", "")
					if (event.target.closest(".timeline-connection-3")) {
						STATE.selected.connection = 3
						ELEMENTS.timelines[STATE.selected.timelineId]?.connection3.setAttribute("selected", true)
						ELEMENTS.timelines[STATE.selected.timelineId]?.connection2.setAttribute("selected", true)
						ELEMENTS.timelines[STATE.selected.timelineId]?.connection.setAttribute("selected", true)
					}
					else if (event.target.closest(".timeline-connection-2")) {
						STATE.selected.connection = 2
						ELEMENTS.timelines[STATE.selected.timelineId]?.connection2.setAttribute("selected", true)
						ELEMENTS.timelines[STATE.selected.timelineId]?.connection.setAttribute("selected", true)
					}
					else {
						STATE.selected.connection = 1
						ELEMENTS.timelines[STATE.selected.timelineId]?.connection.setAttribute("selected", true)
					}
			} catch (error) {console.log(error)}
		}

	/* moveConnection */
		function moveConnection() {
			try {
				// not editing
					if (STATE.mode !== "edit") {
						return
					}

				// no connection selected
					if (!STATE.selected.timelineId || !STATE.selected.connection) {
						return
					}

				// get timeline
					const timeline = ELEMENTS.timelines[STATE.selected.timelineId]
					if (!timeline) {
						return
					}

				// get connection
					if (!timeline.connection || !timeline.connection2 || !timeline.connection3) {
						return
					}

				// move
					STATE.moved = true

				// move endpoint to cursor
					if (STATE.selected.connection == 1) {
						const newY = STATE.cursor.y - timeline.y
						timeline.connectionY = Math.abs(newY) > CONSTANTS.connectionThreshold ? newY : 0
						timeline.connection.style.height = `${Math.abs(timeline.connectionY)}px`
						timeline.connection.style.transform = `translateY(${Math.min(0, timeline.connectionY)}px)`
						timeline.connection.setAttribute("direction", timeline.connectionY < 0 ? "up" : timeline.connectionY > 0 ? "down" : "none")
					}
					else if (STATE.selected.connection == 2) {
						const newY = STATE.cursor.y - timeline.y
						timeline.connectionY = Math.abs(newY) > CONSTANTS.connectionThreshold ? newY : 0
						timeline.connection.style.height = `${Math.abs(timeline.connectionY)}px`
						timeline.connection.style.transform = `translateY(${Math.min(0, timeline.connectionY)}px)`
						timeline.connection.setAttribute("direction", timeline.connectionY < 0 ? "up" : timeline.connectionY > 0 ? "down" : "none")

						const newX = STATE.cursor.x - timeline.x - timeline.w - CONSTANTS.connectionXoffset
						timeline.connectionX = Math.abs(newX) > CONSTANTS.connectionThreshold ? newX : 0
						timeline.connection2.style.width = `${Math.abs(timeline.connectionX)}px`
						timeline.connection2.style.transform = `translateX(${Math.min(0, timeline.connectionX)}px)`
						timeline.connection2.setAttribute("direction", timeline.connectionX < 0 ? "left" : timeline.connectionX > 0 ? "right" : "none")
					}
					else if (STATE.selected.connection == 3) {
						const newX = STATE.cursor.x - timeline.x - timeline.w - CONSTANTS.connectionXoffset
						timeline.connectionX = Math.abs(newX) > CONSTANTS.connectionThreshold ? newX : 0
						timeline.connection2.style.width = `${Math.abs(timeline.connectionX)}px`
						timeline.connection2.style.transform = `translateX(${Math.min(0, timeline.connectionX)}px)`
						timeline.connection2.setAttribute("direction", timeline.connectionX < 0 ? "left" : timeline.connectionX > 0 ? "right" : "none")

						const newY = STATE.cursor.y - timeline.y - timeline.connectionY
						timeline.connectionY2 = Math.abs(newY) > CONSTANTS.connectionThreshold ? newY : 0
						timeline.connection3.style.height = `${Math.abs(timeline.connectionY2) + CONSTANTS.connectionY2offset}px`
						timeline.connection3.style.transform = `translateY(${Math.min(0, timeline.connectionY2)}px)`						
					}
			} catch (error) {console.log(error)}
		}

	/* unselectConnection */
		function unselectConnection() {
			try {
				// no endpoint selected
					if (!STATE.selected.connection) {
						return
					}

				// unselect
					ELEMENTS.timelines[STATE.selected.timelineId]?.connection.removeAttribute("selected")
					ELEMENTS.timelines[STATE.selected.timelineId]?.connection2.removeAttribute("selected")
					ELEMENTS.timelines[STATE.selected.timelineId]?.connection3.removeAttribute("selected")
					STATE.selected.timelineId = null
					delete STATE.selected.connection
					setTimeout(() => {
						delete STATE.moved
					}, CONSTANTS.moveWait)

				// save 
					saveState()
			} catch (error) {console.log(error)}
		}

/*** happenings ***/
	/* selectHappening */
		function selectHappening(event) {
			try {
				// not editing
					if (STATE.mode !== "edit") {
						return
					}

				// something selected
					if (STATE.selected.timelineId) {
						return
					}

				// select
					STATE.selected.timelineId = event.target.closest(".timeline").id.replace("timeline-", "")
					STATE.selected.happeningId = event.target.closest(".timeline-happening").id.replace("happening-", "")

				// close all others
					Array.from(ELEMENTS.container.querySelectorAll("[expanded]")).forEach(element => {
						element.removeAttribute("expanded")
					})

				// style
					ELEMENTS.timelines[STATE.selected.timelineId]?.happenings[STATE.selected.happeningId]?.element.setAttribute("selected", true)
			} catch (error) {console.log(error)}
		}

	/* moveHappening */
		function moveHappening() {
			try {
				// not editing
					if (STATE.mode !== "edit") {
						return
					}

				// no happening selected
					if (!STATE.selected.happeningId) {
						return
					}

				// get timeline & happening
					const timeline = ELEMENTS.timelines[STATE.selected.timelineId]
					if (!timeline) {
						return
					}

					const happening = timeline.happenings[STATE.selected.happeningId]
					if (!happening) {
						return
					}

				// move wait
					STATE.moved = true

				// move happening to cursor
					const line = timeline.element
					const newX = Math.min(timeline.w - CONSTANTS.arrowWidth, Math.max(CONSTANTS.plusWidth, STATE.cursor.x - timeline.x))
					happening.element.style.left = `${newX}px`

				// update happening
					const oldX = happening.x
					happening.x = newX

				// branches
					moveBranches({dx: newX - oldX, dy: 0}, happening.branches)
			} catch (error) {console.log(error)}
		}

	/* unselectHappening */
		function unselectHappening() {
			try {
				// no happening selected
					if (!STATE.selected.happeningId) {
						return
					}

				// style
					ELEMENTS.timelines[STATE.selected.timelineId]?.happenings[STATE.selected.happeningId]?.element.removeAttribute("selected")

				// unselect
					STATE.selected.happeningId = null
					STATE.selected.timelineId = null
					setTimeout(() => {
						delete STATE.moved
					}, CONSTANTS.moveWait)

				// save 
					saveState()
			} catch (error) {console.log(error)}
		}

	/* toggleHappening */
		function toggleHappening(event) {
			try {
				// just moved
					if (STATE.moved) {
						delete STATE.moved
						return
					}

				// get happening & timeline
					const happeningElement = event.target.closest(".timeline-happening")
					const happeningId = happeningElement.id.replace("happening-", "")
					
					const timelineElement = happeningElement.closest(".timeline")
					const timelineId = timelineElement.id.replace("timeline-", "")

					const happening = ELEMENTS.timelines[timelineId].happenings[happeningId]

				// hide suggestions
					happening.iconSuggestions.innerHTML = ""
					happening.iconInput.value = happening.icon

				// opened --> close
					if (happeningElement.getAttribute("expanded")) {
						happeningElement.removeAttribute("expanded")
						return
					}

				// prevent selection
					event.preventDefault()
					STATE.selected = {timelineId: null, happeningId: null}
					clearTimeout(STATE.saveWait)

				// close all others
					Array.from(ELEMENTS.container.querySelectorAll("[expanded]")).forEach(element => {
						element.removeAttribute("expanded")
					})

				// close --> open
					timelineElement.setAttribute("expanded", true)
					happeningElement.setAttribute("expanded", true)
					happening.nameInput.focus()
					happening.closeButton.focus()
			} catch (error) {console.log(error)}
		}

	/* updateHappening */
		function updateHappening(event) {
			try {
				// not editing
					if (STATE.mode !== "edit") {
						return
					}

				// get happening & timeline
					const happeningElement = event.target.closest(".timeline-happening")
					const happeningId = happeningElement.id.replace("happening-", "")
					
					const timelineElement = happeningElement.closest(".timeline")
					const timelineId = timelineElement.id.replace("timeline-", "")

					const happening = ELEMENTS.timelines[timelineId].happenings[happeningId]

				// by field
					if (event.target.className == "timeline-happening-name") {
						happening.name = event.target.value
						happening.nameLabel.innerHTML = happening.name
					}
					else if (event.target.className == "timeline-happening-time") {
						happening.time = event.target.value
						happening.timeLabel.innerHTML = happening.time
					}
					else if (event.target.className == "timeline-happening-info") {
						happening.info = event.target.value
					}
					else if (event.target.className == "timeline-happening-icon") {
						const iconSVG = buildIcon(event.target.value)
						if (iconSVG) {
							happening.icon = event.target.value
							happening.marker.innerHTML = iconSVG
							happening.iconPreview.innerHTML = iconSVG
						}
					}
					else if (event.target.className == "timeline-happening-color") {
						happening.color = event.target.value
						happening.marker.style.color = happening.color
						happening.iconPreview.style.color = happening.color
						happening.iconSuggestions.style.color = happening.color
						happening.details.style.background = happening.color
						happening.nameLabel.style.color = happening.color
						happening.timeLabel.style.color = happening.color
					}

				// save 
					saveState()
			} catch (error) {console.log(error)}
		}

	/* deleteHappening */
		function deleteHappening(event) {
			try {
				// not editing
					if (STATE.mode !== "edit") {
						return
					}

				// get happening & timeline
					const happeningElement = event.target.closest(".timeline-happening")
					const happeningId = happeningElement.id.replace("happening-", "")
					
					const timelineElement = happeningElement.closest(".timeline")
					const timelineId = timelineElement.id.replace("timeline-", "")

				// delete branches
					for (const b in ELEMENTS.timelines[timelineId].happenings[happeningId].branches) {
						deleteBranch(ELEMENTS.timelines[b])
					}

				// remove
					ELEMENTS.timelines[timelineId].happenings[happeningId].element.remove()
					delete ELEMENTS.timelines[timelineId].happenings[happeningId]

				// save 
					saveState()
			} catch (error) {console.log(error)}
		}

	/* searchIcons */
		function searchIcons(event) {
			try {
				// not editing
					if (STATE.mode !== "edit") {
						return
					}

				// get happening & timeline
					const happeningElement = event.target.closest(".timeline-happening")
					const happeningId = happeningElement.id.replace("happening-", "")
					
					const timelineElement = happeningElement.closest(".timeline")
					const timelineId = timelineElement.id.replace("timeline-", "")

					const happening = ELEMENTS.timelines[timelineId].happenings[happeningId]

				// clear out suggestions
					happening.iconSuggestions.innerHTML = ""

				// clear?
					if (event.target.closest(".timeline-happening-icon-clear")) {
						happening.iconInput.value = ""
						happening.iconInput.focus()
					}

				// search
					const lowercasedSearch = happening.iconInput.value.toLowerCase().trim().replace(/-/g, " ")
					const iconKeys = lowercasedSearch ? 
						Object.keys(SVG.icons).filter(key => key.trim().toLowerCase().replace(/-/g, " ").includes(lowercasedSearch)) : 
						Object.keys(SVG.icons)

				// list
					for (const k in iconKeys) {
						const suggestion = document.createElement("button")
							suggestion.className = "timeline-happening-icon-suggestion"
							suggestion.style.color = happening.color
							suggestion.innerHTML = buildIcon(iconKeys[k])
							suggestion.title = iconKeys[k].replace(/-/g, " ")
							suggestion.value = iconKeys[k]
							suggestion.addEventListener(TRIGGERS.click, selectIcon)
						happening.iconSuggestions.appendChild(suggestion)
					}
			} catch (error) {console.log(error)}
		}

	/* selectIcon */
		function selectIcon(event) {
			try {
				// not editing
					if (STATE.mode !== "edit") {
						return
					}

				// get happening & timeline
					const happeningElement = event.target.closest(".timeline-happening")
					const happeningId = happeningElement.id.replace("happening-", "")
					
					const timelineElement = happeningElement.closest(".timeline")
					const timelineId = timelineElement.id.replace("timeline-", "")

					const happening = ELEMENTS.timelines[timelineId].happenings[happeningId]

				// get icon
					const iconKey = event.target.closest(".timeline-happening-icon-suggestion").value

				// build
					const iconSVG = buildIcon(iconKey)
					if (!iconSVG) {
						return
					}

				// update icons
					happening.iconInput.value = iconKey
					happening.icon = iconKey
					happening.marker.innerHTML = iconSVG
					happening.iconPreview.innerHTML = iconSVG
					happening.iconSuggestions.innerHTML = ""

				// save
					saveState()
			} catch (error) {console.log(error)}
		}

/*** builds ***/
	/* buildTimeline */
		function buildTimeline({id, x, y, w, connectionY, connectionX, connectionY2, name, color, parentTimeline, parentHappening}) {
			try {
				// create timeline object
					const timeline = {
						id: id ?? getRandom(),
						parentTimeline: parentTimeline ?? null,
						parentHappening: parentHappening ?? null,
						x: x ?? 0,
						y: y ?? 0,
						w: w ?? 0,
						connectionY:  connectionY ?? 0,
						connectionX:  connectionX ?? 0,
						connectionY2: connectionY2 ?? 0,
						name: name ?? "",
						color: color ?? CONSTANTS.defaultTimeline.color,
						happenings: {}
					}

				// create line
					timeline.element = document.createElement("div")
						timeline.element.id = `timeline-${timeline.id}`
						timeline.element.className = "timeline"
						timeline.element.style.left = `${x}px`
						timeline.element.style.top = `${y}px`
						timeline.element.style.width = `${w}px`
					ELEMENTS.container.appendChild(timeline.element)

					timeline.line = document.createElement("div")
						timeline.line.className = "timeline-line"
						timeline.line.style.background = timeline.color
					timeline.element.appendChild(timeline.line)

				// controls
					timeline.controls = document.createElement("div")
						timeline.controls.className = "timeline-controls"
						timeline.controls.style.background = timeline.color
					timeline.line.appendChild(timeline.controls)

						timeline.nameInput = document.createElement("input")
							timeline.nameInput.className = "timeline-controls-name"
							timeline.nameInput.type = "text"
							timeline.nameInput.placeholder = "name"
							timeline.nameInput.value = timeline.name
							timeline.nameInput.setAttribute("autocomplete", "off")
							timeline.nameInput.setAttribute("autocapitalize", "off")
							timeline.nameInput.setAttribute("spellcheck", "false")
							timeline.nameInput.addEventListener(TRIGGERS.input, updateBranch)
						timeline.controls.appendChild(timeline.nameInput)

						timeline.deleteButton = document.createElement("button")
							timeline.deleteButton.className = "timeline-controls-delete"
							timeline.deleteButton.title = "delete branch"
							timeline.deleteButton.innerHTML = CONSTANTS.svg.trashcan
							timeline.deleteButton.addEventListener(TRIGGERS.click, deleteTimeline)
						timeline.controls.appendChild(timeline.deleteButton)

						timeline.colorLabel = document.createElement("label")
							timeline.colorLabel.className = "timeline-controls-color-label pseudobutton"
							timeline.colorLabel.title = "timeline color"
							timeline.colorLabel.innerHTML = CONSTANTS.svg.eyedropper
						timeline.controls.appendChild(timeline.colorLabel)

							timeline.colorInput = document.createElement("input")
							timeline.colorInput.className = "timeline-controls-color"
								timeline.colorInput.type = "color"
								timeline.colorInput.value = timeline.color
								timeline.colorInput.addEventListener(TRIGGERS.input, updateBranch)
							timeline.colorLabel.appendChild(timeline.colorInput)

						timeline.closeButton = document.createElement("button")
							timeline.closeButton.className = "timeline-controls-close"
							timeline.closeButton.title = "close controls"
							timeline.closeButton.innerHTML = CONSTANTS.svg.check
							timeline.closeButton.addEventListener(TRIGGERS.click, toggleTimelineControls)
						timeline.controls.appendChild(timeline.closeButton)

					timeline.controlsToggle = document.createElement("button")
						timeline.controlsToggle.className = "timeline-controls-toggle"
						timeline.controlsToggle.innerHTML = CONSTANTS.svg.target
						timeline.controlsToggle.title = "timeline controls"
						timeline.controlsToggle.style.color = timeline.color
						timeline.controlsToggle.addEventListener(TRIGGERS.mousedown, selectArrow)
						timeline.controlsToggle.addEventListener(TRIGGERS.click, toggleTimelineControls)
					timeline.line.appendChild(timeline.controlsToggle)

				// label
					timeline.label = document.createElement("div")
						timeline.label.className = "timeline-label"
					timeline.line.appendChild(timeline.label)

						timeline.nameLabel = document.createElement("div")
							timeline.nameLabel.className = "timeline-label-name"
							timeline.nameLabel.innerHTML = timeline.name
							timeline.nameLabel.style.color = timeline.color
						timeline.label.appendChild(timeline.nameLabel)

				// create arrow
					timeline.arrow = document.createElement("div")
						timeline.arrow.innerHTML = CONSTANTS.svg.arrow
						timeline.arrow.className = "timeline-arrow"
						timeline.arrow.style.color = timeline.color
						timeline.arrow.addEventListener(TRIGGERS.mousedown, selectArrow)
					timeline.line.appendChild(timeline.arrow)

				// create connection
					timeline.connection = document.createElement("div")
						timeline.connection.className = "timeline-connection"
						timeline.connection.style.height = `${Math.abs(timeline.connectionY)}px`
						timeline.connection.style.transform = `translateY(${Math.min(0, timeline.connectionY)}px)`
						timeline.connection.style.background = timeline.color
						timeline.connection.setAttribute("direction", timeline.connectionY < 0 ? "up" : timeline.connectionY > 0 ? "down" : "none")
						timeline.connection.addEventListener(TRIGGERS.mousedown, selectConnection)
					timeline.line.appendChild(timeline.connection)

						timeline.connectionTop = document.createElement("div")
							timeline.connectionTop.className = "timeline-connection-endpoint-top"
						timeline.connection.appendChild(timeline.connectionTop)

						timeline.connectionBottom = document.createElement("div")
							timeline.connectionBottom.className = "timeline-connection-endpoint-bottom"
						timeline.connection.appendChild(timeline.connectionBottom)

						timeline.connection2 = document.createElement("div")
							timeline.connection2.className = "timeline-connection-2"
							timeline.connection2.style.width = `${Math.abs(timeline.connectionX)}px`
							timeline.connection2.style.transform = `translateX(${Math.min(0, timeline.connectionX)}px)`
							timeline.connection2.style.background = timeline.color
							timeline.connection2.setAttribute("direction", timeline.connectionX < 0 ? "left" : timeline.connectionX > 0 ? "right" : "none")
							timeline.connection2.addEventListener(TRIGGERS.mousedown, selectConnection)
						timeline.connection.appendChild(timeline.connection2)

							timeline.connectionLeft = document.createElement("div")
								timeline.connectionLeft.className = "timeline-connection-endpoint-left"
							timeline.connection2.appendChild(timeline.connectionLeft)

							timeline.connectionRight = document.createElement("div")
								timeline.connectionRight.className = "timeline-connection-endpoint-right"
							timeline.connection2.appendChild(timeline.connectionRight)

							timeline.connection3 = document.createElement("div")
								timeline.connection3.className = "timeline-connection-3"
								timeline.connection3.style.height = `${Math.abs(timeline.connectionY2)}px`
								timeline.connection3.style.transform = `translateY(${Math.min(0, timeline.connectionY2)}px)`
								timeline.connection3.style.background = timeline.color
								timeline.connection3.addEventListener(TRIGGERS.mousedown, selectConnection)
							timeline.connection2.appendChild(timeline.connection3)

				// create plus
					timeline.plus = document.createElement("div")
						timeline.plus.innerHTML = CONSTANTS.svg.plus
						timeline.plus.className = "timeline-plus"
						timeline.plus.addEventListener(TRIGGERS.click, clickPlus)
					timeline.line.appendChild(timeline.plus)

				// create happenings container
					timeline.happeningsContainer = document.createElement("div")
						timeline.happeningsContainer.className = "timeline-happenings"
					timeline.element.appendChild(timeline.happeningsContainer)

				// return object
					return timeline
			} catch (error) {console.log(error)}
		}

	/* buildHappening */
		function buildHappening({id, x, color, name, time, info, icon}, parentContainer) {
			try {
				// info
					const happening = {
						id: id ?? getRandom(),
						x: x,
						color: color ?? CONSTANTS.defaultTimeline.color,
						name: name ?? "",
						time: time ?? "",
						info: info ?? "",
						icon: icon ?? CONSTANTS.defaultTimeline.icon,
						branches: {}
					}

				// element
					happening.element = document.createElement("div")
						happening.element.id = `happening-${happening.id}`
						happening.element.className = "timeline-happening"
						happening.element.style.left = `${happening.x}px`
					parentContainer.appendChild(happening.element)

						happening.marker = document.createElement("div")
							happening.marker.innerHTML = buildIcon(happening.icon) || buildIcon(CONSTANTS.defaultTimeline.icon)
							happening.marker.className = "timeline-happening-marker"
							happening.marker.title = "event details"
							happening.marker.style.color = happening.color
							happening.marker.addEventListener(TRIGGERS.click, toggleHappening)
							happening.marker.addEventListener(TRIGGERS.mousedown, selectHappening)
						happening.element.appendChild(happening.marker)

				// details
					happening.details = document.createElement("div")
						happening.details.className = "timeline-happening-details"
						happening.details.style.background = happening.color
					happening.element.appendChild(happening.details)

						happening.nameInput = document.createElement("input")
							happening.nameInput.className = "timeline-happening-name"
							happening.nameInput.type = "text"
							happening.nameInput.placeholder = "name"
							happening.nameInput.value = happening.name
							happening.nameInput.setAttribute("autocomplete", "off")
							happening.nameInput.setAttribute("autocapitalize", "off")
							happening.nameInput.setAttribute("spellcheck", "false")
							happening.nameInput.addEventListener(TRIGGERS.input, updateHappening)
						happening.details.appendChild(happening.nameInput)

						happening.timeInput = document.createElement("input")
							happening.timeInput.className = "timeline-happening-time"
							happening.timeInput.type = "text"
							happening.timeInput.placeholder = "time"
							happening.timeInput.value = happening.time
							happening.timeInput.setAttribute("autocomplete", "off")
							happening.timeInput.setAttribute("autocapitalize", "off")
							happening.timeInput.setAttribute("spellcheck", "false")
							happening.timeInput.addEventListener(TRIGGERS.input, updateHappening)
						happening.details.appendChild(happening.timeInput)

						happening.infoInput = document.createElement("textarea")
							happening.infoInput.className = "timeline-happening-info"
							happening.infoInput.placeholder = "info"
							happening.infoInput.value = happening.info
							happening.infoInput.setAttribute("autocomplete", "off")
							happening.infoInput.setAttribute("autocapitalize", "off")
							happening.infoInput.setAttribute("spellcheck", "false")
							happening.infoInput.addEventListener(TRIGGERS.input, updateHappening)
						happening.details.appendChild(happening.infoInput)

						happening.iconInput = document.createElement("input")
							happening.iconInput.className = "timeline-happening-icon"
							happening.iconInput.type = "text"
							happening.iconInput.placeholder = "icon"
							happening.iconInput.value = happening.icon
							happening.iconInput.setAttribute("autocomplete", "off")
							happening.iconInput.setAttribute("autocapitalize", "off")
							happening.iconInput.setAttribute("spellcheck", "false")
							happening.iconInput.addEventListener(TRIGGERS.mousedown, searchIcons)
							happening.iconInput.addEventListener(TRIGGERS.input, searchIcons)
						happening.details.appendChild(happening.iconInput)

							happening.iconClear = document.createElement("div")
								happening.iconClear.className = "timeline-happening-icon-clear"
								happening.iconClear.title = "clear search"
								happening.iconClear.innerHTML = CONSTANTS.svg.x
								happening.iconClear.addEventListener(TRIGGERS.click, searchIcons)
							happening.details.appendChild(happening.iconClear)

							happening.iconPreview = document.createElement("div")
								happening.iconPreview.className = "timeline-happening-icon-preview"
								happening.iconPreview.style.color = happening.color
								happening.iconPreview.innerHTML = buildIcon(happening.icon)
							happening.details.appendChild(happening.iconPreview)

							happening.iconSuggestions = document.createElement("div")
								happening.iconSuggestions.className = "timeline-happening-icon-suggestions"
							happening.details.appendChild(happening.iconSuggestions)

						happening.deleteButton = document.createElement("button")
							happening.deleteButton.className = "timeline-happening-delete"
							happening.deleteButton.title = "delete event"
							happening.deleteButton.innerHTML = CONSTANTS.svg.trashcan
							happening.deleteButton.addEventListener(TRIGGERS.click, deleteHappening)
						happening.details.appendChild(happening.deleteButton)

						happening.colorLabel = document.createElement("label")
							happening.colorLabel.className = "timeline-happening-color-label pseudobutton"
							happening.colorLabel.title = "marker color"
							happening.colorLabel.innerHTML = CONSTANTS.svg.eyedropper
						happening.details.appendChild(happening.colorLabel)

							happening.colorInput = document.createElement("input")
							happening.colorInput.className = "timeline-happening-color"
								happening.colorInput.type = "color"
								happening.colorInput.value = happening.color
								happening.colorInput.addEventListener(TRIGGERS.input, updateHappening)
							happening.colorLabel.appendChild(happening.colorInput)

						happening.closeButton = document.createElement("button")
							happening.closeButton.className = "timeline-happening-close"
							happening.closeButton.title = "close event"
							happening.closeButton.innerHTML = CONSTANTS.svg.check
							happening.closeButton.addEventListener(TRIGGERS.click, toggleHappening)
						happening.details.appendChild(happening.closeButton)

				// branches
					happening.branchesContainer = document.createElement("div")
						happening.branchesContainer.className = "timeline-happening-branches"
					happening.element.appendChild(happening.branchesContainer)

					happening.branchButton = document.createElement("button")
						happening.branchButton.className = "timeline-happening-add-branch"
						happening.branchButton.title = "add branch"
						happening.branchButton.innerHTML = CONSTANTS.svg.branch
						happening.branchButton.addEventListener(TRIGGERS.click, addBranch)
					happening.element.appendChild(happening.branchButton)

				// text
					happening.label = document.createElement("div")
						happening.label.className = "timeline-happening-label"
					happening.element.appendChild(happening.label)

						happening.nameLabel = document.createElement("div")
							happening.nameLabel.className = "timeline-happening-label-name"
							happening.nameLabel.innerHTML = happening.name
							happening.nameLabel.style.color = happening.color
						happening.label.appendChild(happening.nameLabel)

						happening.timeLabel = document.createElement("div")
							happening.timeLabel.className = "timeline-happening-label-time"
							happening.timeLabel.innerHTML = happening.time
							happening.timeLabel.style.color = happening.color
						happening.label.appendChild(happening.timeLabel)

				// return object
					return happening
			} catch (error) {console.log(error)}
		}

	/* buildBranch */
		function buildBranch({id, h, color}, parentContainer) {
			try {
				// branch object
					const branch = {
						id: id,
						h: h,
						color: color ?? CONSTANTS.defaultTimeline.color
					}

				// element
					branch.element = document.createElement("div")
						branch.element.className = "timeline-happening-branch"
						branch.element.style.borderColor = color
						branch.element.style.height = `${h}px`
					parentContainer.appendChild(branch.element)

				// return
					return branch
			} catch (error) {console.log(error)}
		}

	/* buildIcon */
		function buildIcon(iconName) {
			try {
				// get path
					const iconPath = SVG.icons[iconName]
					if (!iconPath) {
						return null
					}

				// build SVG
					return `<svg viewBox="10 10 80 80"><path d="${iconPath}"></path></svg>`
			} catch (error) {console.log(error)}
		}
