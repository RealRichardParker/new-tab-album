chrome.runtime.onInstalled.addListener(function() {
    chrome.runtime.sendMessage("micaiedcolefjeeonpaiimdillehjdph", {setRoot: true}, function(response) {
        console.log("I got a response yay")
    })
});
