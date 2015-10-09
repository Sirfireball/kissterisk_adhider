chrome.webNavigation.onDOMContentLoaded.addListener(function(e) {
	chrome.tabs.executeScript(e.tabId, { file: "kissterisk_adhider.js" });
	chrome.pageAction.show(e.tabId);
},
{ url: [
		{
			hostEquals: 'kisscartoon.me',
			pathContains: 'Cartoon',
			queryContains: 'id='
		},
		{
			hostEquals: 'kissasian.com',
			pathContains: 'Drama',
			queryContains: 'id='
		},
		{
			hostEquals: 'kissanime.com',
			pathContains: 'Anime',
			queryContains: 'id='
		},
	]
});

//chrome.runtime.onInstalled.addListener(function() {
//  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
//		chrome.declarativeContent.onPageChanged.addRules([{
//			conditions: [
//				// If we're on kissanime.com/Anime/Show/Episode-XX-Title?id=XXXXX
//				//new chrome.declarativeContent.PageStateMatcher({
//				//	pageUrl: {
//				//		hostEquals: 'www.kissanime.com',
//				//		pathContains: 'Anime',
//				//		queryContains: 'id=' }
//				//}),
//				// or kissasian.com/Drama/Show/Episode-XX-Title?id=XXXXX
//				//new chrome.declarativeContent.PageStateMatcher({
//				//	pageUrl: {
//				//		hostEquals: 'www.kissasian.com',
//				//		pathContains: 'Drama',
//				//		queryContains: 'id=' }
//				//}),
//				// or kisscartoon.me/Cartoon/Show/Episode-XX-Title?id=XXXXX
//				new chrome.declarativeContent.PageStateMatcher({
//					pageUrl: {
//						hostEquals: '.kisscartoon.me',
//						pathContains: 'Cartoon',
//						queryContains: 'id='
//					}
//				})
//			],
//			// ... show the page action.
//			actions: [
//				new chrome.declarativeContent.ShowPageAction()
//		 		//chrome.tabs.executeScript({})
//		 	]
//		}]);
//	});
//});