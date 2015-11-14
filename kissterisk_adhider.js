// The content_script for Kiss* AdHider

// Comment this out to have log info.
console.log = function(){};

(function kissterisk_adhider() {

	chrome.runtime.sendMessage({from: "kissterisk_adhider"}, function(response) {
		var num_hidden = parseInt(response.num_hidden);
		console.log("clickhiding "+num_hidden+" ads");
		window.onload = window.setTimeout(function() {
			clickhide(num_hidden);
		}, 5000);
	});

	// Loops through all a tags on the page and of the ones
	// that contain "Hide", clicks num_to_click of them.
	function clickhide(num_to_click) {
		var a = document.getElementsByTagName('a');
		var num_clicked = 0;

		// Find num_to_click a tags containing "Hide" and click 'em.
		for (var i = 0; i < a.length; ++i) {
			if (a[i].innerHTML === "Hide") {
				// Decrement i after because the array of a tags actually
				// shrinks once one of the a tags is clicked and removed.
				a[i--].click();
				if (++num_clicked === num_to_click) {
					break;
				}
			}
		}
	}
})();