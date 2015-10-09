// The content_script for Kiss* AdHider
(function kissterisk_adhider() {
	var a = document.getElementsByTagName('a');

	// Find all the a tags containing "Hide" and click 'em.
	for (var i = 0; i < a.length; ++i) {
		if (a[i].innerHTML === "Hide") {
			a[i].click();
		}
	}
})();