chrome.runtime.onMessageExternal.addListener(function (request, sender, sendResponse) {
    console.log("Starting up app!")
    if (request.launch) {
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
                            })
                        }) 
                    }
                    else {
                        console.log("root_dir is not restorable, must be reset")
                    }
                })
            }
        })
    }
    if (request.setRoot) {
        chrome.fileSystem.chooseEntry({type: 'openDirectory'}, function(dirEntry) {
            let id = chrome.fileSystem.retainEntry(dirEntry)
            chrome.storage.local.set({root_dir: id}, function() {
                chrome.fileSystem.getDisplayPath(dirEntry, function(path) {
                    console.log("Stored id of root dir to " + path)
                    sendResponse({setRoot: true})
                })
            })
        })
    }
})
