window.onload = function() {
    const pic = document.getElementById("pic")
    const button = document.getElementById("root")
    button.addEventListener("click", setRoot())
}

function setRoot() {
    console.log("Setting root!")
    chrome.runtime.sendMessage("micaiedcolefjeeonpaiimdillehjdph", {setRoot: true}, function(response) {
        if(response.setRoot) {
            console.log("Successfully set root dir")
        }
    })
}
