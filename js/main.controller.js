'use strict'

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

    const editorStat = getValFromParam('editingImageId')
    if (editorStat) renderEditor()
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
    const addImgStr = `<div><label class="upload-img" for="file-input">Add image</label>
    <input type="file" class="file-input btn" name="image" onchange="onImgInput(event)" id="file-input"/></div>`

    let strHtml = imgs.map((img) => `<img src="${img.url}" alt="img.id:${img.id}" id="${img.id}" onclick="onSelectImg(this)">`)
    
    elGal.innerHTML = addImgStr + strHtml.join('')
}

//------------------------------------------------------------------------------------------------------------/
function renderMemes() {
    console.log('render memes')
    // class: memes-gallery
    const memes = getMemes()
    let elMemes = document.querySelector('.memes-gallery')

    let strHtml = imgs.map((img) => `<img src="${img.url}" alt="img.id:${img.id}" id="${img.id}" onclick="onSelectImg(this)">`)
    
    elMemes.innerHTML = addImgStr + strHtml.join('')
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
    setQueryParams({ editingImageId: imgId })
    renderEditor(imgId)
}

function onBackToGallery() {
    document.querySelector('.image-gallery').classList.add('open')
    setQueryParams({ gallery: 'images' })
    document.querySelector('.meme-editor').classList.remove('open')
    deleteQueryParam('editingImageId')
}

// upload image
function onImgInput(ev) {
    console.log(ev)
    loadImageFromInput(ev, renderImg)
    // addImage(imageSrc)
}
function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()
    // After we read the file
    reader.onload = function (event) {
        let img = new Image() // Create a new html img element
        img.src = event.target.result // Set the img src to the img file we read
        // Run the callBack func, To render the img on the canvas
        img.onload = onImageReady.bind(null, img)
        // Can also do it this way:
        // img.onload = () => onImageReady(img)
    }
    reader.readAsDataURL(ev.target.files[0]) // Read the file we picked
}
function renderImg(img) {
    // Draw the img on the canvas
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}