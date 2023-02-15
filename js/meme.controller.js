'use strict'
let gElCanvas
let gCtx

// function resizeCanvas() {
//     const elContainer = document.querySelector('.canvas-container')
//     gElCanvas.width = elContainer.offsetWidth
//     gElCanvas.height = elContainer.offsetHeight
// }

function renderEditor(imgId) {
    console.log('render editor')
    setQueryParams({ editingImageId: imgId })

    let elEditor = document.querySelector('.meme-editor')
    elEditor.classList.add('open')

    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight

    startMeme()
}

function startMeme() {
    const imgId = getValFromParam('editingImageId')
    createMeme(imgId)
    drawImg(imgId)
}

function drawImg(id) {
    const image = getImgById(id)
    // console.log('image',image)
    const img = new Image() 
    const src = image.url
    // console.log(src);
    img.src = src 
    img.onload = () => {    
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}

function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-meme'

    // saveMeme()
}