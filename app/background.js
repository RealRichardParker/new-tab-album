chrome.runtime.onMessageExternal.addListener(function (request, sender, sendResponse) {
    console.log("Starting up app!")
    if (request.launch) {
        let success = false
        chrome.storage.local.get({root_dir: ""}, function(data) {
            if (data.root_dir == "") {
                console.log("No root dir set!")
            }
            else {
                chrome.fileSystem.isRestorable(data.root_dir, function(isRestorable) {
                    if (isRestorable) {
                        chrome.fileSystem.restoreEntry(data.root_dir, function(dirEntry) {
                            chrome.fileSystem.getDisplayPath(dirEntry, function(path) {
                                console.log("Root dir path: " + path)
                                success = true
                                sendResponse({success: success})
                            })
                        }) 
                    }
                    else {
                        console.log("root_dir is not restorable, must be reset")
                        sendResponse({success: success})
                    }
                })
            }
        })
    }
    if (request.setRoot) {
        chrome.app.window.create("index.html")
    }
})
