chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.create({'url': chrome.extension.getURL('ui.html')}, function(tab) {
   // Tab opened.
	});
});