/*** globals ***/
	/* elements */
		const ELEMENTS = {
			overviewLinksPlay: document.querySelector("#overview-links-play"),
			gallery: {
				viewer: document.querySelector("#gallery-viewer"),
				images: Array.from(document.querySelectorAll("#gallery-viewer img")),
				left: document.querySelector("#gallery-left"),
				right: document.querySelector("#gallery-right")
			},
		}

	/* state */
		const STATE = {
			playOnlineURL: "https://playingcards.io/import",
			galleryPosition: 0
		}

/*** actions ***/
	/* playOnline */
		// ELEMENTS.overviewLinksPlay.addEventListener("click", playOnline)
		// function playOnline(event) {
		// 	setTimeout(() => {
		// 		window.location = STATE.playOnlineURL
		// 	}, 0)
		// }

	/* moveGalleryLeft */
		ELEMENTS.gallery.left.addEventListener("click", moveGalleryLeft)
		function moveGalleryLeft(event) {
			STATE.galleryPosition -= 1
			if (STATE.galleryPosition < 0) {
				STATE.galleryPosition = ELEMENTS.gallery.images.length - 1
			}
			updateGallery()
		}

	/* moveGalleryRight */
		ELEMENTS.gallery.right.addEventListener("click", moveGalleryRight)
		function moveGalleryRight(event) {
			STATE.galleryPosition += 1
			if (STATE.galleryPosition > ELEMENTS.gallery.images.length - 1) {
				STATE.galleryPosition = 0
			}
			updateGallery()
		}

	/* updateGallery */
		function updateGallery() {
			for (let i = 0; i < ELEMENTS.gallery.images.length; i++) {
				if (i == STATE.galleryPosition) {
					ELEMENTS.gallery.images[i].setAttribute("visible", true)
				}
				else {
					ELEMENTS.gallery.images[i].removeAttribute("visible")
				}
			}
		}
