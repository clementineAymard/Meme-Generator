'use strict'

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

function drawImg(id) {
    const image = getImgById(id)
    console.log('image',image)
    const img = new Image() // Create a new html img element
    const src = image.url
    console.log(src);
    img.src = image.url // Send a network req to get that image, define the img src
    // When the image ready draw it on the canvas
    
    img.onload = () => {    
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}
