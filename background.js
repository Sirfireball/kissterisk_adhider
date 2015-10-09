// background.js

// Store default num_hidden in localStorage if it's not there already.
if (localStorage.getItem('kissterisk_adhider_num_hidden') === null) {
	localStorage.setItem('kissterisk_adhider_num_hidden', '5');
}

// See if user navigates to a url we care about.
chrome.webNavigation.onDOMContentLoaded.addListener(function(e) {
	// Show the page_action
	chrome.pageAction.show(e.tabId);
},
{ url: [
		{
			// E.g. http://kisscartoon.me/Cartoon/Rick-and-Morty/Episode-011-Ricksy-Business?id=16132
			hostEquals: 'kisscartoon.me',
			pathContains: 'Cartoon',
			queryContains: 'id='
		},
		{
			// E.g. http://kissasian.com/Drama/The-Merchant-Gaekju-2015/Episode-4?id=17267
			hostEquals: 'kissasian.com',
			pathContains: 'Drama',
			queryContains: 'id='
		},
		{
			// E.g. http://kissanime.com/Anime/Psycho-Pass/Episode-019?id=23611
			hostEquals: 'kissanime.com',
			pathContains: 'Anime',
			queryContains: 'id='
		},
	]
});

// Await messages
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		var num_hidden = "";
		switch(request.from) {
			case "popup":
				switch(request.subject) {
					// The user just clicked the page_action, send num_hidden to popup.js
					// so it can populate its select tag with the correct default value.
					case "init":
						num_hidden = localStorage.getItem('kissterisk_adhider_num_hidden');
						console.log("Sending num_hidden="+num_hidden+" to popup.js");
						sendResponse({num_hidden: num_hidden});
						break;
					// The number of ads to hide was updated by the user in popup.js
					case "update":
						console.log("Setting kissterisk_adhider_num_hidden="+request.num_hidden);
						localStorage.setItem('kissterisk_adhider_num_hidden', request.num_hidden);
						break;
				}
				break;
			// kissterisk_adhider.js needs to know how many ads to hide.
			case "kissterisk_adhider":
				num_hidden = localStorage.getItem('kissterisk_adhider_num_hidden');
				console.log("Sending num_hidden="+num_hidden+" to kissterisk_adhider.js");
				sendResponse({num_hidden: num_hidden});
				break;
		}
});
