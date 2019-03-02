chrome.runtime.sendMessage("micaiedcolefjeeonpaiimdillehjdph", {launch: true}, function(response) {
    console.log("I got a response yay")
    console.log("response was " + response.success)
    console.log("got url " + response.path)
    const img = document.createElement("img")
    img.src = response.path
    img.load = function () {
        document.getElementById("pic").append(img)
    }
    
})



