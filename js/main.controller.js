'use strict'

function onInit() {
    console.log('init')

    // set active section to render  
    let menuItem = getValFromParam('menu')
    if (!menuItem) {
        menuItem = 'image-gallery'
    }
    selectItem(document.querySelector(`.${menuItem}`))
    render(menuItem)
    // let isEditing = getValFromParam('editingImageId')
    // if (isEditing) renderMeme(isEditing)
}

function render(menuItem) {
    if (menuItem === 'image-gallery') renderGallery()
    else if (menuItem === 'memes-gallery') renderMemes()
}

//--------------------------------------------------IMAGES----------------------------------------------------------/
function renderGallery() {
    console.log('render images')
    document.querySelector('.meme-editor').classList.remove('open')

    const imgs = getImgs()
    const addImgStr = `<label class="upload-img" for="file-input">Add image
    <input type="file" class="file-input btn" name="image" onchange="onImgInput(event)" id="file-input"/></label>`

    let strHtml = imgs.map((img) => `<img src="${img.url}" alt="img.id:${img.id}" id="${img.id}" onclick="onSelectImg(this)">`)

    let elGal = document.querySelector('.main-section .image-gallery')
    elGal.innerHTML = addImgStr + strHtml.join('')
}

//----------------------------------------------------MEMES--------------------------------------------------------/
function renderMemes() {
    console.log('render memes')
    // class: memes-gallery
    const memes = getMemes()
    let elMemes = document.querySelector('.main-section .memes-gallery')
    // let linesStr = meme.lines.map((line)=>`<p>${line.txt}</p>`).join('')

    let strHtml = memes.map((meme, idx) => `<div class="saved-meme-${idx}"> 
    <img src="${getImgById(meme.selectedImgId).url}" onclick="onSelectMeme(${idx})">
    ${meme.lines.map((line) => `<p>${line.txt}</p>`).join('')}
    </div>`)

    elMemes.innerHTML = strHtml.join('')
}

//---------------------------------------------click Event Functions------------------------------------------------------------/
function onSelectMenuItem(elMenuItem) {
    selectItem(elMenuItem)
}

function openMenu(){
    document.body.classList.toggle('menu-open') // FOR MOBILE HAMB MENU: OPEN MENU
}
function onSelectImg(elImg) {
    selectItem(document.querySelector('.meme-editor'))

    let imgId = elImg.id
    setQueryParams({ editingImageId: imgId })
    renderEditor()
    startMeme()
}

function onBackToGallery() {
    let elMenuItem = document.querySelector('.main-section .image-gallery')
    selectItem(elMenuItem)
}

function onSelectMeme(memeIdx) {
    let memes = getMemes()
    let meme = memes[memeIdx]
    setQueryParams({ editingImageId: meme.selectedImgId })
    selectItem(document.querySelector('.meme-editor'))
    // document.querySelector('.main-section .memes-gallery').classList.remove('open')
    renderEditor()
    setCurrMeme(meme)
    renderMeme(meme.selectedImgId)
}

//----------------------------------------------------TODO------------------------------------------------------------/
// upload image
function onImgInput(ev) {
    // console.log(ev)
    loadImageFromInput(ev, addImage)
    // addImage(imageSrc)
}
function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()
    // After we read the file
    reader.onload = function (event) {
        let img = new Image() // Create a new html img element
        img.src = event.target.result // Set the img src to the img file we read
        // Run the callBack func, To render the img on the canvas
        // img.onload = onImageReady.bind(null, img)
        // Can also do it this way:
        img.onload = () => onImageReady(img)
    }
    reader.readAsDataURL(ev.target.files[0]) // Read the file we picked
}
function addImage(img) {
    // Add image to images array and render Gallery of images
    var imgs = getImgs()
    imgs.unshift(createImg(img.src))
    setImgs(imgs)
    renderGallery()
}

// FILTER