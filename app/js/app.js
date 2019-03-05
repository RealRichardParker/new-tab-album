let id = ""

window.onload = function() {
    const button = document.getElementById("root")
    button.addEventListener("click", setRoot)
    const output = document.getElementById("output")
    const submit = document.getElementById("submit")
    submit.addEventListener("click", submitSettings)
    chrome.storage.local.get({root_dir:""}, function(data) {
        if (data.root_dir != "") {
            console.log("Found a given root dir!")
            id = data.root_dir
            chrome.fileSystem.isRestorable(id, function(isRestorable) {
                if (isRestorable) {
                    chrome.fileSystem.restoreEntry(data.root_dir, function(dirEntry) {
                        chrome.fileSystem.getDisplayPath(dirEntry, function(path) {
                            console.log("Loaded path " + path)
                            output.innerHTML = path
                        })  
                    })
                }
                else {
                    console.log("path is not restorable. Set path again")
                    output.innerHTML = "Set path again"
                }
            })
        }
        else {
            console.log("No root dir found")
            output.innerHTML = "No root folder set!"
        }
    })
}

function setRoot() {
    console.log("Setting root!")
    chrome.fileSystem.chooseEntry({type: 'openDirectory'}, function(dirEntry) {
        console.log(typeof dirEntry)
        id = chrome.fileSystem.retainEntry(dirEntry)
        chrome.fileSystem.getDisplayPath(dirEntry, function(path) {
            console.log("Stored id of root dir to " + path)
            output.innerHTML = path
        })
    })
}

function submitSettings() {
    console.log("What is id??" + id)
    if (id !== "") {
        chrome.storage.local.set({root_dir: id}, function() {
            console.log("Saved root_dir")
        })
    }
    window.close()
}
