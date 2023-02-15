'use strict'
let gElCanvas
let gCtx

function onInit() {
    console.log('init')

    const menuItem = getValFromParam('menu')
    selectItem(document.querySelector(`.${menuItem}`))

    render(menuItem)
}

function render(menuItem) {
    switch (menuItem) {
        case 'gallery':
            renderGallery()
            break;
        case 'memes':
            renderMemes()
            break;
        case 'about':
            renderAbout()
            break;
    }
}

function renderGallery() {
    console.log('render gallery')
    const editorStatus = getValFromParam('gallery')
    if (editorStatus === 'images') {
        //  show gallery
        renderImages()
    } else if (editorStatus === 'editor') {
        // show image editor
        renderEditor()
        gElCanvas = document.querySelector('canvas')
        gCtx = gElCanvas.getContext('2d')

        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)

        drawImg(src)
    }


}

function renderImages() {
    console.log('render images')
    document.querySelector('.image-gallery').style.opacity = 1
    

}

//--------------------------------------------------IMAGE EDITOR----------------------------------------------------------/
function renderEditor() {
console.log('render editor')
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}
function drawImg(src) {
    const img = new Image() // Create a new html img element
    img.src = src // Send a network req to get that image, define the img src
    // When the image ready draw it on the canvas
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}

//------------------------------------------------------------------------------------------------------------/
function renderMemes() {
    console.log('render memes')
    // class: memes-gallery

}

function renderAbout() {
    console.log('render about')
    // class: modal
}

function onSelectMenuItem(elMenuItem) {
    // console.log('open', elMenuItem)
    selectItem(elMenuItem)
}


