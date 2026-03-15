const SFX = window.SFX = {
	initialized: false,
	audio: {}
}

window.addEventListener("click", () => {
	SFX.initialized = true
})

SFX.generateId = function() {
	return Math.floor(Math.random() * 10e16).toString(36).slice(1,9)
}

SFX.play = function({id, name, loop, delay, volume, fadeIn, upsert}) {
	if (!SFX.initialized) { return }

	// upsert
		if (name && upsert) {
			const existingId = (Object.keys(SFX.audio).find(key => SFX.audio[key].src.endsWith("sfx/" + name)))
			if (existingId) {
				return existingId
			}
		}

	// play existing audio
		if (id && SFX.audio[id]) {
			const audio = SFX.audio[id]
			setTimeout(() => {
				audio.currentTime = 0
				audio.volume = Math.min(1, Math.max(0, volume))
				audio.play()
			}, delay || 0)
			return id
		}
	
	// add audio
		if (!name) {
			return null
		}
		id = id || SFX.generateId()
		const audio = document.createElement("audio")
			audio.style.display = "none"
			audio.id = "sfx_" + id
			audio.src = "sfx/" + name
		SFX.audio[id] = audio

	// play
		setTimeout(() => {
			const targetVolume = Math.min(1, Math.max(0, volume ?? 1))

			audio.currentTime = 0
			audio.volume = fadeIn ? 0 : targetVolume
			audio.play()

			if (fadeIn) {
				const intervalTime = fadeIn / (targetVolume * 100)
				const interval = setInterval(() => {
					if (audio.volume < targetVolume) {
						audio.volume = Math.min(1, (audio.volume * 100 + 1) / 100)
					}
					else {
						clearInterval(interval)
					}
				}, intervalTime)
			}
		}, delay || 0)

	// loop or delete
		if (loop) {
			audio.loop = true
		}
		else {
			audio.addEventListener("ended", () => {
				audio.pause()
				audio.remove()
				delete SFX.audio[id]
			})
		}

	// return id
		return id
}

SFX.stop = function({id, name, delay, fadeOut}) {
	if (!SFX.initialized) { return }

	// name
		if (name) {
			for (const i in SFX.audio) {
				if (SFX.audio[i].src.endsWith("sfx/" + name)) {
					SFX.stop({id: i, delay, fadeOut})
				}
			}
			return
		}

	// no id
		if (!id || !SFX.audio[id]) {
			return false
		}
		const audio = SFX.audio[id]

	// stop
		setTimeout(() => {
			// fadeout
				if (fadeOut) {
					const intervalTime = fadeOut / (audio.volume * 100)
					const interval = setInterval(() => {
						if (audio.volume > 0) {
							audio.volume = Math.max(0, (audio.volume * 100 - 1) / 100)
						}
						else {
							clearInterval(interval)
							audio.pause()
							audio.remove()
							delete SFX.audio[id]
						}
					}, intervalTime)
				}

			// delete
				else {
					audio.pause()
					audio.remove()
					delete SFX.audio[id]
				}
		}, delay || 0)

	// success
		return true
}

