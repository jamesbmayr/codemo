/*** globals ***/
	/* triggers */
		const TRIGGERS = {
			click: "click",
			input: "input",
			change: "change",
			keydown: "keydown",
			keyup: "keyup"
		}

	/* elements */
		const ELEMENTS = {
			controls: {
				element: document.querySelector("#controls"),
				sizeInput: document.querySelector("#controls-size-input"),
				sizeRange: document.querySelector("#controls-size-range"),
				color: document.querySelector("#controls-color"),
				glowCheckbox: document.querySelector("#controls-glow-checkbox"),
				glowColor: document.querySelector("#controls-glow-color"),
				bold: document.querySelector("#controls-bold"),
				italic: document.querySelector("#controls-italic"),
				overline: document.querySelector("#controls-overline"),
				strikethrough: document.querySelector("#controls-strikethrough"),
				underline: document.querySelector("#controls-underline"),
				background: document.querySelector("#controls-background"),
				alignment: document.querySelector("#controls-alignment"),
				lineheight: document.querySelector("#controls-lineheight"),
				text: document.querySelector("#controls-text")
			},
			glyphs: {
				element: document.querySelector("#glyphs"),
				keyboard: document.querySelector("#keyboard"),
				arrows: document.querySelector("#arrows"),
				keys: Array.from(document.querySelectorAll(".key"))
			}
		}

	/* state */
		const STATE = {
			caps: false,
			capsHeld: false,
			shift: false,
			shiftHeld: false,
			alt: false,
			altHeld: false
		}

/*** styling ***/
	/* changeSize */
		ELEMENTS.controls.sizeInput.addEventListener(TRIGGERS.input, changeSize)
		ELEMENTS.controls.sizeRange.addEventListener(TRIGGERS.input, changeSize)
		function changeSize(event) {
			try {
				// get size
					const size = Math.max(1, Math.floor(event.target.value))

				// set size
					ELEMENTS.controls.text.style.fontSize = size + "px"

				// set inputs
					ELEMENTS.controls.sizeInput.value = size
					ELEMENTS.controls.sizeRange.value = size
			} catch (error) {console.log(error)}
		}

	/* changeColor */
		ELEMENTS.controls.color.addEventListener(TRIGGERS.input, changeColor)
		function changeColor(event) {
			try {
				// get color
					const color = ELEMENTS.controls.color.value

				// set color
					ELEMENTS.controls.text.style.color = color
			} catch (error) {console.log(error)}
		}

	/* changeGlow */
		ELEMENTS.controls.glowCheckbox.addEventListener(TRIGGERS.input, changeGlow)
		ELEMENTS.controls.glowColor.addEventListener(TRIGGERS.input, changeGlow)
		function changeGlow(event) {
			try {
				// get glowColor
					const glowColor = ELEMENTS.controls.glowColor.value
					const glow = ELEMENTS.controls.glowCheckbox.checked

				// set glowColor
					ELEMENTS.controls.text.style.textShadow = glow ? ("0 0 var(--shadow-size) " + glowColor) : "none"
			} catch (error) {console.log(error)}
		}

	/* changeBold */
		ELEMENTS.controls.bold.addEventListener(TRIGGERS.input, changeBold)
		function changeBold(event) {
			try {
				// get styles
					const bold = ELEMENTS.controls.bold.checked || false

				// set styles
					ELEMENTS.controls.text.style.fontWeight = bold ? "bold" : "normal"
			} catch (error) {console.log(error)}
		}

	/* changeItalic */
		ELEMENTS.controls.italic.addEventListener(TRIGGERS.input, changeItalic)
		function changeItalic(event) {
			try {
				// get styles
					const italic = ELEMENTS.controls.italic.checked || false

				// set styles
					ELEMENTS.controls.text.style.fontStyle = italic ? "italic" : "normal"
			} catch (error) {console.log(error)}
		}

	/* changeLine */
		ELEMENTS.controls.overline.addEventListener(TRIGGERS.input, changeLine)
		ELEMENTS.controls.strikethrough.addEventListener(TRIGGERS.input, changeLine)
		ELEMENTS.controls.underline.addEventListener(TRIGGERS.input, changeLine)
		function changeLine(event) {
			try {
				// get styles
					const overline = ELEMENTS.controls.overline.checked || false
					const strikethrough = ELEMENTS.controls.strikethrough.checked || false
					const underline = ELEMENTS.controls.underline.checked || false
					
				// set styles
					const styles = []
					if (overline) { styles.push("overline") }
					if (strikethrough) { styles.push("line-through") }
					if (underline) { styles.push("underline") }
					ELEMENTS.controls.text.style.textDecoration = styles.length ? styles.join(" ") : "none"
			} catch (error) {console.log(error)}
		}

	/* changeBackground */
		ELEMENTS.controls.background.addEventListener(TRIGGERS.input, changeBackground)
		function changeBackground(event) {
			try {
				// get background
					const background = ELEMENTS.controls.background.value

				// set background
					ELEMENTS.controls.text.style.background = background
			} catch (error) {console.log(error)}
		}

	/* changeAlignment */
		ELEMENTS.controls.alignment.addEventListener(TRIGGERS.input, changeAlignment)
		function changeAlignment(event) {
			try {
				// get alignment
					const alignment = ELEMENTS.controls.alignment.value

				// set alignment
					ELEMENTS.controls.text.style.textAlign = alignment
					ELEMENTS.controls.alignment.style.textAlign = alignment
			} catch (error) {console.log(error)}
		}

	/* changeLineHeight */
		ELEMENTS.controls.lineheight.addEventListener(TRIGGERS.input, changeLineHeight)
		function changeLineHeight(event) {
			try {
				// get lineheight
					const lineheight = Math.max(0.1, ELEMENTS.controls.lineheight.value)

				// set lineheight
					ELEMENTS.controls.text.style.lineHeight = lineheight
			} catch (error) {console.log(error)}
		}

/*** keyboard ***/
	/* pressKeyButton */
		for (let i in ELEMENTS.glyphs.keys) {
			ELEMENTS.glyphs.keys[i].addEventListener(TRIGGERS.click, pressKeyButton)
		}
		function pressKeyButton(event) {
			try {
				// key
					const key = event.target.closest(".key")
					const special = key.getAttribute("special")

				// shift
					if (special == "shift") {
						if (!STATE.shift) {
							STATE.shift = true
							ELEMENTS.glyphs.element.setAttribute("shift", true)
						}
						else {
							STATE.shift = false
							ELEMENTS.glyphs.element.removeAttribute("shift")
						}
						return
					}

				// caps
					if (special == "caps") {
						if (!STATE.caps) {
							STATE.caps = true
							ELEMENTS.glyphs.element.setAttribute("caps", true)
						}
						else {
							STATE.caps = false
							ELEMENTS.glyphs.element.removeAttribute("caps")
						}
						return
					}

				// alt
					if (special == "alt") {
						if (!STATE.alt) {
							STATE.alt = true
							ELEMENTS.glyphs.element.setAttribute("alt", true)
						}
						else {
							STATE.alt = false
							ELEMENTS.glyphs.element.removeAttribute("alt")
						}
						return
					}

				// get glyph
					const glyph = 	special == "space" ? " " :
									special == "tab" ? "\t" :
									special == "enter" ? "\n" :
									special == "del" ? "" :
									key.querySelector((STATE.shiftHeld || STATE.shift || STATE.capsHeld || STATE.caps ? ".uppercase" : ".lowercase") + (STATE.altHeld || STATE.alt ? ".alt" : "")).innerText

				// add to input at cursor
					let text = ELEMENTS.controls.text.value
					let selectionEnd = ELEMENTS.controls.text.selectionEnd
					let selectionStart = ELEMENTS.controls.text.selectionStart == "none" ? ELEMENTS.controls.text.selectionEnd : ELEMENTS.controls.text.selectionStart

				// new text
					text = text.slice(0, (special == "del" && selectionStart == selectionEnd) ? selectionStart - 1 : selectionStart) + glyph + text.slice(selectionEnd, text.length)
					ELEMENTS.controls.text.value = text
					ELEMENTS.controls.text.focus()
					ELEMENTS.controls.text.selectionEnd = selectionStart + (special == "del" ? (selectionStart == selectionEnd ? -1 : 0) : 1)

				// release shift / alt (hold caps)
					if (STATE.shift) {
						STATE.shift = false
						if (!STATE.shiftHeld) {
							ELEMENTS.glyphs.element.removeAttribute("shift")
						}
					}

					if (STATE.alt) {
						STATE.alt = false
						if (!STATE.altHeld) {
							ELEMENTS.glyphs.element.removeAttribute("alt")
						}
					}
			} catch (error) {console.log(error)}
		}

	/* shift */
		window.addEventListener(TRIGGERS.keydown, pressKey)
		function pressKey(event) {
			try {
				// shift
					if (event.key.toLowerCase() == "shift") {
						STATE.shiftHeld = true
						ELEMENTS.glyphs.element.setAttribute("shift", true)
					}

				// capslock
					if (event.key.toLowerCase() == "capslock" || event.getModifierState("CapsLock")) {
						STATE.capsHeld = true
						ELEMENTS.glyphs.element.setAttribute("caps", true)
					}

				// alt
					if (event.key.toLowerCase() == "alt") {
						STATE.altHeld = true
						ELEMENTS.glyphs.element.setAttribute("alt", true)
					}
			} catch (error) {console.log(error)}
		}

		window.addEventListener(TRIGGERS.keyup, liftKey)
		function liftKey(event) {
			try {
				// shift
					if (event.key.toLowerCase() == "shift") {
						STATE.shiftHeld = false
						ELEMENTS.glyphs.element.removeAttribute("shift")
					}

				// capslock
					if (!event.getModifierState("CapsLock")) {
						STATE.capsHeld = false
						ELEMENTS.glyphs.element.removeAttribute("caps")
					}

				// alt
					if (event.key.toLowerCase() == "alt") {
						STATE.altHeld = false
						ELEMENTS.glyphs.element.removeAttribute("alt")
					}
			} catch (error) {console.log(error)}
		}
