chrome.runtime.onInstalled.addListener(function() {
    chrome.tabs.create({url:"settings.html"}, function(tab) {
        console.log("created new tab of settings")
    })
});
