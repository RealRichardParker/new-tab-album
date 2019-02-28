window.onload = function() {
    const inputElem = document.getElementById("input")
    inputElem.addEventListener("change", handleFiles, false)
    const pic = document.getElementById("pic")
}



function handleFiles() {
    const fileList = this.files
    let urlList = []
    for (let i = 0; i < fileList.length; i++) {
        objUrl = fileList[i].webkitRelativePath
        urlList.push(objUrl)
    }
    console.log(urlList[0])
    const img = document.createElement("img")
    img.src = window.URL.createObjectURL(fileList[0])
    img.height = 60
    img.onload = function() {
        window.URL.revokeObjectURL(this.src)
        console.log("Succesfully loaded img")
    }
    pic.append(img)

}
