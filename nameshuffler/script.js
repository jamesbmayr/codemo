/*** globals ***/
	/* triggers */
		const TRIGGERS = {
			input: "input",
			click: "click"
		}

	/* elements */
		const ELEMENTS = {
			names: document.querySelector("#names"),
			shuffle: document.querySelector("#shuffle"),
			generator: document.querySelector("#generator"),
			components: [],
			copy: document.querySelector("#copy")
		}

	/* state */
		const STATE = {
			copyWait: 2 * 1000, // ms
			copyTimeout: null
		}

/*** helpers ***/
	function chooseRandom(list) {
		try {
			// not an array
				if (!list || !Array.isArray(list)) {
					return list
				}

			// random
				return list[Math.floor(Math.random() * list.length)]
		} catch (error) {console.log(error)}
	}

/*** page actions ***/
	/* shuffleName */
		ELEMENTS.shuffle.addEventListener(TRIGGERS.click, shuffleName)
		function shuffleName(event) {
			try {
				// clear out unlocked names
					for (const component of ELEMENTS.components) {
						if (component.lock.checked) {
							continue
						}

						component.text.value = ""
					}

				// shuffle individual components
					for (const component of ELEMENTS.components) {
						shuffleComponent({component: component})
					}
			} catch (error) {console.log(error)}
		}

	/* copyName */
		ELEMENTS.copy.addEventListener(TRIGGERS.click, copyName)
		function copyName(event) {
			try {
				// just copied
					if (STATE.copyTimeout) {
						return
					}

				// check
					ELEMENTS.copy.setAttribute("copied", true)

				// copy to clipboard
					const fullName = Array.from(ELEMENTS.generator.querySelectorAll(".generator-text")).map(input => input.value.trim()).join(" ")
					navigator.clipboard.writeText(fullName)

				// uncheck
					STATE.copyTimeout = setTimeout(() => {
						ELEMENTS.copy.removeAttribute("copied")
						STATE.copyTimeout = null
					}, STATE.copyWait)
			} catch (error) {console.log(error)}
		}

/*** component actions ***/
	/* addComponent */
		addComponent()
		addComponent()
		addComponent()
		function addComponent(event) {
			try {
				// get parent
					const parent = event?.target?.closest(".generator-component")

				// html
					const row = document.createElement("div")
						row.className = "generator-component"
					if (parent) {
						parent.after(row)
					}
					else {
						ELEMENTS.generator.appendChild(row)
					}

					const shuffle = document.createElement("button")
						shuffle.className = "generator-shuffle"
						shuffle.addEventListener(TRIGGERS.click, shuffleComponent)
						shuffle.innerHTML = "&#x1F500;"
					row.appendChild(shuffle)

					const text = document.createElement("input")
						text.className = "generator-text"
						text.placeholder = "name"
						text.type = "text"
						text.setAttribute("spellcheck", "false")
						text.setAttribute("autocomplete", "off")
						text.setAttribute("autocapitalize", "off")
					row.appendChild(text)

					const lockLabel = document.createElement("label")
						lockLabel.className = "generator-lock-label"
					row.appendChild(lockLabel)

						const lock = document.createElement("input")
							lock.className = "generator-lock"
							lock.type = "checkbox"
						lockLabel.appendChild(lock)

						const locked = document.createElement("span")
							locked.className = "generator-locked"
							locked.innerHTML = "&#x1F512;"
						lockLabel.appendChild(locked)

						const unlocked = document.createElement("span")
							unlocked.className = "generator-unlocked"
							unlocked.innerHTML = "&#x1F513;"
						lockLabel.appendChild(unlocked)

					const up = document.createElement("button")
						up.className = "generator-up"
						up.addEventListener(TRIGGERS.click, upComponent)
						up.innerHTML = "&uarr;"
					row.appendChild(up)

					const down = document.createElement("button")
						down.className = "generator-down"
						down.addEventListener(TRIGGERS.click, downComponent)
						down.innerHTML = "&darr;"
					row.appendChild(down)

					const add = document.createElement("button")
						add.className = "generator-add"
						add.addEventListener(TRIGGERS.click, addComponent)
						add.innerHTML = "+"
					row.appendChild(add)

					const remove = document.createElement("button")
						remove.className = "generator-remove"
						remove.addEventListener(TRIGGERS.click, removeComponent)
						remove.innerHTML = "-"
					row.appendChild(remove)

				// component
					ELEMENTS.components.push({
						row,
						text,
						lock,
						shuffle,
						remove,
						add
					})
			} catch (error) {console.log(error)}
		}

	/* removeComponent */
		function removeComponent(event) {
			try {
				// get parent
					const parent = event.target.closest(".generator-component")

				// first?
					if (ELEMENTS.generator.querySelector(".generator-component:first-child") == parent) {
						return
					}

				// remove
					parent.remove()
			} catch (error) {console.log(error)}
		}

	/* shuffleComponent */
		function shuffleComponent(event) {
			try {
				// get elements
					const parent = event.target ? event.target.closest(".generator-component") : null
					const component = event.component ?? ELEMENTS.components.find(candidate => candidate.row == parent)
					const lock = component.lock
					const text = component.text

				// locked?
					if (lock.checked) {
						return
					}

				// get other names
					const namesInUse = ELEMENTS.components.map(component => component.text.value)
					const availableNames = ELEMENTS.names.value.split(/\s?,\s?/g).filter(name => !namesInUse.includes(name))

				// no names
					if (!availableNames.length) {
						text.value = ""
						return
					}

				// pick a name
					const name = chooseRandom(availableNames)
					text.value = name
			} catch (error) {console.log(error)}
		}

	/* upComponent */
		function upComponent(event) {
			try {
				// get parent
					const component = event.target.closest(".generator-component")

				// get previous
					const previousComponent = component.previousSibling
					if (!previousComponent) {
						return
					}

				// move
					ELEMENTS.generator.insertBefore(component, previousComponent)
					event.target.focus()
			} catch (error) {console.log(error)}
		}

	/* downComponent */
		function downComponent(event) {
			try {
				// get parent
					const component = event.target.closest(".generator-component")

				// get next
					const nextComponent = component.nextSibling
					if (!nextComponent) {
						return
					}

				// move
					nextComponent.after(component)
					event.target.focus()
			} catch (error) {console.log(error)}
		}
