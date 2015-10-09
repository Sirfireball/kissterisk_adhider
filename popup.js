// popup.js
var select = document.getElementById("num-hidden");

// Let background.js know popup.js has started and needs current num_hidden value.
chrome.runtime.sendMessage({from: "popup", subject: "init"}, function(response) {
		// Populate select options with current num_hidden as default value.
		var num_hidden = parseInt(response.num_hidden);
		var html = "";
		for (var i = 1; i <= 5; ++i) {
			if (i === num_hidden) {
				html += '<option value="'+i+'" selected="selected">'+i+'</option>'
			}
			else {
				html += '<option value="'+i+'">'+i+'</option>'
			}
		}
		select.innerHTML = html;
});

// Listen for changes on the select tag and let background.js know if there are any.
select.addEventListener('change', function() {
	var num_hidden_str = this.value.toString();
	chrome.runtime.sendMessage({from: "popup", subject: "update", num_hidden: num_hidden_str});
}, false);