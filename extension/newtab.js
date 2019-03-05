chrome.runtime.sendMessage("micaiedcolefjeeonpaiimdillehjdph", {launch: true}, function(response) {
    console.log("I got a response yay")
    console.log("response was " + response.success)
    console.log("got url " + response.path)
    const img = document.createElement("IMG")
    img.src = response.path
    document.body.appendChild(img)
})



