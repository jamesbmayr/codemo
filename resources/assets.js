/*** globals ***/
	/* constants */
		const ASSETS_J = {
			storeAsset: (type) => { return {name: "", type: "", data: ""} },
			retrieveAsset: (name, type, data) => {},
			imports: [],
			exports: [],
			script: null,
			button: null,
			overlay: null,
			initialized: false
		}
		window.ASSETS_J = ASSETS_J

/*** setup ***/
	/* initializeAssetsManager */
		ASSETS_J.initializeAssetsManager = initializeAssetsManager
		initializeAssetsManager()
		function initializeAssetsManager() {
			try {
				// script
					ASSETS_J.script = document.querySelector("#assets_j_script")
					if (!ASSETS_J.script) {
						ASSETS_J.script = document.querySelector("script[src='../resources/assets.js']")
					}
					if (ASSETS_J.script) {
						const dataImports = ASSETS_J.script.getAttribute("data-imports") || null
						const dataExports = ASSETS_J.script.getAttribute("data-exports") || null
						ASSETS_J.imports = dataImports ? dataImports.split(/\s?,\s?/g) : []
						ASSETS_J.exports = dataExports ? dataExports.split(/\s?,\s?/g) : []
					}

				// styling
					ASSETS_J.styling = document.createElement("style")
						ASSETS_J.styling.id = "assets_j_styling"
					document.head.appendChild(ASSETS_J.styling)

				// overlay
					ASSETS_J.overlay = document.createElement("iframe")
						ASSETS_J.overlay.id = "assets_j_overlay"
						ASSETS_J.styling.innerText += `#assets_j_overlay {
							position: fixed;
							top: 0px;
							left: 0px;
							border: none;
							width: 100%;
							height: 100%;
							z-index: 1000001;
							display: none;
						}`
					document.body.appendChild(ASSETS_J.overlay)

				// button
					ASSETS_J.button = document.querySelector("#assets_j_button")
					if (!ASSETS_J.button) {
						ASSETS_J.button = document.createElement("div")
							ASSETS_J.button.id = "assets_j_button"
							ASSETS_J.button.title = "asset manager"
							ASSETS_J.button.addEventListener("click", displayOverlay)
							ASSETS_J.button.innerHTML = `<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><path fill="currentColor" d="M 38 18 C 38 20 38 30 38 32 C 40 33 47 36 49 37 C 49 35 49 25 49 23 C 47 22 40 19 38 18 Z M 62 18 C 60 19 53 22 51 23 C 51 25 51 35 51 37 C 53 36 60 33 62 32 C 62 30 62 20 62 18 Z M 50 8 C 54 10 60 13 64 15 C 64 21 64 27 64 33 C 60 35 54 38 50 40 C 46 38 40 35 36 33 C 36 27 36 21 36 15 C 40 13 46 10 50 8 Z M 23 44 C 23 46 23 56 23 58 C 25 59 32 62 34 63 C 34 61 34 51 34 49 C 32 48 25 45 23 44 Z M 47 44 C 45 45 38 48 36 49 C 36 51 36 61 36 63 C 38 62 45 59 47 58 C 47 56 47 46 47 44 Z M 35 34 C 39 36 45 39 49 41 C 49 47 49 53 49 59 C 45 61 39 64 35 66 C 31 64 25 61 21 59 C 21 53 21 47 21 41 C 25 39 31 36 35 34 Z M 53 44 C 53 46 53 56 53 58 C 55 59 62 62 64 63 C 64 61 64 51 64 49 C 62 48 55 45 53 44 Z M 77 44 C 75 45 68 48 66 49 C 66 51 66 61 66 63 C 68 62 75 59 77 58 C 77 56 77 46 77 44 Z M 65 34 C 69 36 75 39 79 41 C 79 47 79 53 79 59 C 75 61 69 64 65 66 C 61 64 55 61 51 59 C 51 53 51 47 51 41 C 55 39 61 36 65 34 Z M 8 70 C 8 72 8 82 8 84 C 10 85 17 88 19 89 C 19 87 19 77 19 75 C 17 74 10 71 8 70 Z M 32 70 C 30 71 23 74 21 75 C 21 77 21 87 21 89 C 23 88 30 85 32 84 C 32 82 32 72 32 70 Z M 20 60 C 24 62 30 65 34 67 C 34 73 34 79 34 85 C 30 87 24 90 20 92 C 16 90 10 87 6 85 C 6 79 6 73 6 67 C 10 65 16 62 20 60 Z M 38 70 C 38 72 38 82 38 84 C 40 85 47 88 49 89 C 49 87 49 77 49 75 C 47 74 40 71 38 70 Z M 62 70 C 60 71 53 74 51 75 C 51 77 51 87 51 89 C 53 88 60 85 62 84 C 62 82 62 72 62 70 Z M 50 60 C 54 62 60 65 64 67 C 64 73 64 79 64 85 C 60 87 54 90 50 92 C 46 90 40 87 36 85 C 36 79 36 73 36 67 C 40 65 46 62 50 60 Z M 68 70 C 68 72 68 82 68 84 C 70 85 77 88 79 89 C 79 87 79 77 79 75 C 77 74 70 71 68 70 Z M 92 70 C 90 71 83 74 81 75 C 81 77 81 87 81 89 C 83 88 90 85 92 84 C 92 82 92 72 92 70 Z M 80 60 C 84 62 90 65 94 67 C 94 73 94 79 94 85 C 90 87 84 90 80 92 C 76 90 70 87 66 85 C 66 79 66 73 66 67 C 70 65 76 62 80 60 Z"></path></svg>`
							ASSETS_J.styling.innerText += `#assets_j_button {
								position: absolute;
								top: 14px;
								right: 48px;
								height: 32px;
								width: 32px;
								background: transparent;
								opacity: 1;
								color: #dddddd;
								padding: 0px;
								border: none;
								cursor: pointer;
								outline: none;
								z-index: 1000000;
								transition: 0.5s;
							}`
							ASSETS_J.styling.innerText += `#assets_j_button:hover, #assets_j_button:focus {
								color: #04b1ff;
							}`
							ASSETS_J.styling.innerText += `#assets_j_button svg {
								height: 100% !important;
								width: 100% !important;
								fill: currentColor;
							}`

						const jLogo = document.body.querySelector("#j-logo")
						if (jLogo) {
							jLogo.parentNode.insertBefore(ASSETS_J.button, jLogo)
						}
						else {
							document.body.appendChild(ASSETS_J.button)
						}
					}
			} catch (error) {}
		}

	/* displayOverlay */
		ASSETS_J.displayOverlay = displayOverlay
		function displayOverlay() {
			try {
				// initialized --> show
					if (ASSETS_J.initialized) {
						ASSETS_J.overlay.style.display = "block"
						return
					}

				// initialize
					ASSETS_J.initialized = true
					ASSETS_J.overlay.src = "../assetmanager/index.html"
					ASSETS_J.overlay.onload = () => {
						ASSETS_J.overlay.contentWindow.postMessage({
							action: "initialize",
							imports: ASSETS_J.imports,
							exports: ASSETS_J.exports
						}, "*")
						ASSETS_J.overlay.style.display = "block"
					}
			} catch (error) {}
		}

	/* hideOverlay */
		ASSETS_J.hideOverlay = hideOverlay
		function hideOverlay() {
			try {
				ASSETS_J.overlay.style.display = "none"
			} catch (error) {}
		} 

/*** messages ***/
	/* handleMessage */
		ASSETS_J.handleMessage = handleMessage
		window.addEventListener("message", handleMessage)
		async function handleMessage(event) {
			try {
				// no action
					if (!event.data || !event.data.action) {
						return
					}

				// close overlay
					if (event.data.action == "close") {
						hideOverlay()
						return
					}

				// store data
					if (event.data.action == "store") {
						const {name, type, data} = await ASSETS_J.storeAsset(event.data.type || null)
						if (data) {
							ASSETS_J.overlay.contentWindow.postMessage({
								action: "store",
								name: name || `export_${new Date().getTime()}`,
								type: type || "txt",
								data: data,
							}, "*")
						}
						return
					}

				// retrieve data
					if (event.data.action == "retrieve") {
						const reader = new FileReader()
							reader.onload = readEvent => {
								ASSETS_J.retrieveAsset(event.data.name, event.data.type, readEvent.target.result)
							}
							reader.readAsText(event.data.file)
						hideOverlay()
					}
			} catch (error) {}
		}
