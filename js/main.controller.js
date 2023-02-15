'use strict'
// let gElCanvas
// let gCtx

function onInit() {
    console.log('init')

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
    if (editorStatus === 'images') renderImages()
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
    console.log('selected: ', elImg);
    deleteQueryParam('gallery')
    document.querySelector('.image-gallery').classList.remove('open')

    let imgId = elImg.id
    renderEditor(imgId)
}