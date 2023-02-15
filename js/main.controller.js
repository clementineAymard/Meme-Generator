'use strict'
let gElCanvas
let gCtx

function onInit() {
    console.log('init')

    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    // set active section to render  
    let menuItem = getValFromParam('menu')
    if (!menuItem) {
        menuItem = 'gallery'
        setQueryParams({ gallery: 'images' })
    }
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

//--------------------------------------------------GALLERY----------------------------------------------------------/
function renderGallery() {
    console.log('render gallery')
    const editorStatus = getValFromParam('gallery')
    if (editorStatus === 'images') {
        //  show gallery
        renderImages()
    } else if (editorStatus === 'editor') {
        // show image editor
        renderEditor()
    }
}

function renderImages() {
    console.log('render images')
    document.querySelector('.meme-editor').classList.remove('open')
    let elGal = document.querySelector('.image-gallery')
    elGal.classList.add('open')
    const imgs = getImgs()
    // debugger
    let strHtml = imgs.map((img) => `<img src="${img.url}" alt="img.id:${img.id}" id="${img.id}" onclick="onSelectImg(this)">`)
    const addImgStr = `<div class="upload-img">+</div>`
    elGal.innerHTML = addImgStr + strHtml.join('')

}

function renderEditor(imgId) {
    console.log('render editor')

    let elEditor = document.querySelector('.meme-editor')
    elEditor.classList.add('open')

    // resizeCanvas()
    // window.addEventListener('resize', resizeCanvas)
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight

    drawImg(imgId)
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
//----------------------------------------------------OnClicks------------------------------------------------------------/
function onSelectMenuItem(elMenuItem) {
    // console.log('open', elMenuItem)
    selectItem(elMenuItem)
}

function onSelectImg(elImg) {
    setQueryParams({ gallery: 'editor' })
    document.querySelector('.image-gallery').classList.remove('open')
    let imgId = elImg.id
    renderEditor(imgId)
}