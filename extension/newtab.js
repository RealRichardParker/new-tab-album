chrome.runtime.sendMessage("micaiedcolefjeeonpaiimdillehjdph", {launch: true}, function(response) {
    console.log("I got a response yay")
    console.log("response was " + response.success)
    if(response.success) {
        console.log("got url " + response.path)
        const img = document.createElement("IMG")
        img.src = response.base64
        document.body.style.backgroundImage = "url('" + img.src + "')"
    }
    else {
        document.body.style.backgroundColor = "white"
        let heading = document.createElement("H1")
        let child = document.createTextNode("There was an error finding the image. Is the root folder set?")
        heading.appendChild(child)
        document.body.appendChild(heading)
    }
})



