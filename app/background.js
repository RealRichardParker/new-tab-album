chrome.runtime.onMessageExternal.addListener(function (request, sender, sendResponse) {
    console.log("Starting up app!")
    let success = false
    if (request.launch) {
        chrome.storage.local.get({root_dir: ""}, function(data) {
            if (data.root_dir == "") {
                console.log("No root dir set!")
                sendResponse({success: success})
            }
            else {
                chrome.fileSystem.isRestorable(data.root_dir, function(isRestorable) {
                    if (isRestorable) {
                        chrome.fileSystem.restoreEntry(data.root_dir, function(dirEntry) {
                            let dirReader = dirEntry.createReader()
                            let entries = []
                            let readEntries = function () {
                                dirReader.readEntries(function (results) {
                                    if(!results.length) {
                                        let index = Math.floor(Math.random() * Math.floor(entries.length))
                                        //TODO: Make recursive
                                        entry = entries[index]
                                        chrome.fileSystem.getDisplayPath(entry, function(path) {
                                            success = true
                                            entry.file(function (file) {
                                                getBase64(file).then(function(response) {
                                                    console.log(index)
                                                    console.log("Sending url " + response)
                                                    sendResponse({success: success, base64: response, path: path})

                                                })

                                            })
                                        })
                                    }
                                    else {
                                        entries = entries.concat(results)
                                        readEntries()
                                    }
                                })
                            }
                            readEntries()
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
        sendResponse({success: success})
    }
})

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
