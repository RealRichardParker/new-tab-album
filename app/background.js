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
                            let dirReader = dirEntry.createReader()
                            let entries = []
                            let readEntries = function () {
                                dirReader.readEntries(function (results) {
                                    if(!results.length) {
                                        let index = Math.floor(Math.random() * Math.floor(entries.length))
                                        entry = entries[index]
                                        chrome.fileSystem.getDisplayPath(entry, function(path) {
                                            success = true
                                            entry.file(function (file) {
                                                getBase64(file).then(function(response) {
                                                    console.log(index)
                                                    console.log("Sending url " + response)
                                                    sendResponse({success: success, path: response})

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
