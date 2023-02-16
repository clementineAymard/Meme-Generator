'use strict'
let gElCanvas
let gCtx
let gPos = [{ x: 225, y: 50 }, { x: 225, y: 400 }, { x: 225, y: 225 }]

function renderEditor() {
    console.log('render editor')
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    gCtx.beginPath()
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

function startMeme() {
    console.log('start meme')
    const imgId = getValFromParam('editingImageId')
    createMeme(imgId)
    renderMeme(imgId)
}

function renderMeme(imgId) {
    drawImg(imgId)
    const currMeme = getCurrMeme()
    const { lines, selectedLineIdx } = currMeme

    lines.forEach((line, idx) => {
        setTimeout(() => {
        drawText(line, idx)
    }, 1)
    })
    // const line = lines[selectedLineIdx]
    console.log('curr:', currMeme)
    
    // setCurrMeme(currMeme)
}

function onAddText(key, val) {
    const imgId = getValFromParam('editingImageId')
    const currMeme = getCurrMeme()
    const lineIdx = currMeme.selectedLineIdx
    if (key === 'size') currMeme.lines[lineIdx][key] += val
    else if (key === 'weight') { // || key === 'style'
        if (currMeme.lines[lineIdx][key] === 'normal') { currMeme.lines[lineIdx][key] = val }
        else currMeme.lines[lineIdx][key] = 'normal'
    } else currMeme.lines[lineIdx][key] = val
    setCurrMeme(currMeme)
    console.log(key, currMeme.lines[lineIdx][key], val)
    renderMeme(imgId)
}

function drawImg(id) {
    const image = getImgById(id)
    // console.log('drawing image', image)
    const img = new Image()
    const src = image.url
    // console.log(src);
    img.src = src
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}

function drawText({ txt, size, align, color, font_family, stroke_color, weight }, lineIdx) {
    const { x, y } = gPos[lineIdx]
    gCtx.lineWidth = 1
    gCtx.strokeStyle = stroke_color
    gCtx.fillStyle = color
    gCtx.font = `${weight} ${size}px ${font_family}` // ${style}
    gCtx.textAlign = align
    gCtx.textBaseline = 'middle'
    console.log('DRAW:', txt);
    // console.log('drawing:', text, x, y)
    gCtx.fillText(txt, x, y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(txt, x, y) // Draws (strokes) a given text at the given (x, y) position.

}

function onAddLine() {
    let currMeme = getCurrMeme()
    if (currMeme.lines.length === 3 ) return
    currMeme.lines.push(createLine())
    currMeme.selectedLineIdx = currMeme.lines.length - 1
    console.log('added line, currMeme:', currMeme)
    const imgId = getValFromParam('editingImageId')
    setCurrMeme(currMeme)
    renderMeme(imgId)
}

function onNextLine(){
    console.log('on next line')

}

// download to computer
function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-meme'

    // saveMeme()
}

// upload to FB
function onUploadImg() {
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg') // Gets the canvas content as an image format

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        // Encode the instance of certain characters in the url
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        console.log(encodedUploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)
    }
    // Send the image to the server
    doUploadImg(imgDataUrl, onSuccess)
}
function doUploadImg(imgDataUrl, onSuccess) {
    // Pack the image for delivery
    const formData = new FormData()
    formData.append('img', imgDataUrl)

    // Send a post req with the image to the server
    const XHR = new XMLHttpRequest()
    XHR.onreadystatechange = () => {
        // If the request is not done, we have no business here yet, so return
        if (XHR.readyState !== XMLHttpRequest.DONE) return
        // if the response is not ok, show an error
        if (XHR.status !== 200) return console.error('Error uploading image')
        const { responseText: url } = XHR
        // Same as
        // const url = XHR.responseText

        // If the response is ok, call the onSuccess callback function, 
        // that will create the link to facebook using the url we got
        console.log('Got back live url:', url)
        onSuccess(url)
    }
    XHR.onerror = (req, ev) => {
        console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
    }
    XHR.open('POST', '//ca-upload.com/here/upload.php')
    XHR.send(formData)
}

//save to memes and local strorage db
function onSaveMeme() {
    saveMeme()
}