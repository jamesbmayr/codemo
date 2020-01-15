self.addEventListener("message", function(event) {
	self.postMessage({workers: true, string: event.data.toUpperCase()})
}, false)