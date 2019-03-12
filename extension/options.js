chrome.runtime.sendMessage("nnlcbkkamhemebnfgjojcabnomfdfmnh", {setRoot: true}, function(response) {
    console.log("I got a response yay");
    console.log("response was " + response.success);
})

window.onload = function() {
    window.close();
}
