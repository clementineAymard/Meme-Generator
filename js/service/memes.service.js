'use strict'

// localStorage.clear()
const STORAGE_KEY_MEMES = 'memesDB'
const STORAGE_KEY_CUR_MM = 'currMeme'
const STORAGE_KEY_IMGS = 'imagesDB'

var gMemes = []
var gCurrMeme
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

var gImgs = [{ id: 1, url: 'images/1.jpg', keywords: ['funny', 'cat'] },
{ id: 2, url: 'images/2.jpg', keywords: ['dog', 'cute'] },
{ id: 3, url: 'images/3.jpg', keywords: ['dog', 'baby', 'cute', 'sleep'] },
{ id: 4, url: 'images/4.jpg', keywords: ['cat', 'sleep'] },
{ id: 5, url: 'images/5.jpg', keywords: ['baby'] },
{ id: 6, url: 'images/6.jpg', keywords: ['funny'] },
{ id: 7, url: 'images/7.jpg', keywords: ['baby', 'funny'] },
{ id: 8, url: 'images/8.jpg', keywords: ['funny', 'happy'] },
{ id: 9, url: 'images/9.jpg', keywords: ['baby', 'funny'] },
{ id: 10, url: 'images/10.jpg', keywords: ['funny', 'happy'] },
{ id: 11, url: 'images/11.jpg', keywords: ['happy'] },
{ id: 12, url: 'images/12.jpg', keywords: ['funny'] },
{ id: 13, url: 'images/13.jpg', keywords: ['happy'] },
{ id: 14, url: 'images/14.jpg', keywords: ['angry', 'glasses'] },
{ id: 15, url: 'images/15.jpg', keywords: ['angry'] },
{ id: 16, url: 'images/16.jpg', keywords: ['funny'] },
{ id: 17, url: 'images/17.jpg', keywords: ['funny', 'two'] },
{ id: 18, url: 'images/18.jpg', keywords: ['future', 'funny'] },];
setImgs(gImgs)
var gNextImgId = 19

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 30,
            align: 'center',
            color: 'red',
            font_family: 'Impact',
            stroke_color: 'black',
            style: '',
            weight: '',
        }
    ]
}

function getMemes() { // saved and stored memes
    let memes = loadFromStorage(STORAGE_KEY_MEMES)
    if (!memes) {
        gMemes = [gMeme]
        return gMemes
    }
    return memes
}

function getImgs() {
    const images = loadFromStorage(STORAGE_KEY_IMGS) 
    if (!images) {
        console.log('no current images')
        return
    }
    return images
    // return gImgs
}

function createImg(imgSource) {
    var img = {
        id: gNextImgId,
        url: imgSource,
        keywords: prompt('Please enter keywords describing the image, separated by spaces'),
    }
    gNextImgId++
    return img
}

function setImgs(imgs){
    gImgs = imgs
    saveToStorage(STORAGE_KEY_IMGS, imgs)
}

function getImgById(imgId) {
    let imgs = getImgs()
    let image = imgs.find(img => `${img.id}` === `${imgId}`)
    return image
}

function createMeme(imgId) {
    let meme = {
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'Your Text Here',
                size: 30,
                font_family: 'Impact',
                align: 'center',
                weight: 'normal',
                style: 'normal',
                color: 'black',
                stroke_color: 'black',
                pos: { x: 0, y: 0 }
            }
        ]
    }
    // console.log(meme)
    setCurrMeme(meme)
}

function createLine() {
    return {
        txt: 'Your Text Here',
        size: 30,
        font_family: 'Impact',
        align: 'center',
        weight: 'normal',
        style: 'normal',
        color: 'black',
        stroke_color: 'black',
        pos: { x: 0, y: 0 }
    }
}

function setCurrMeme(meme) {
    gCurrMeme = meme
    console.log('setting gCurrMeme:', gCurrMeme)
    saveCurrMeme()
}

function saveCurrMeme() { // on every change
    saveToStorage(STORAGE_KEY_CUR_MM, gCurrMeme)
    console.log('SAVED TO STORAGE:', gCurrMeme)
}

function getCurrMeme() {
    if (!loadFromStorage(STORAGE_KEY_CUR_MM)) {
        console.log('no current meme')
        return
    }
    return loadFromStorage(STORAGE_KEY_CUR_MM)
}

function saveMeme() { // SAVE TO MEMES -from onSaveMeme at onclick button 
    let isSaved = gMemes.find((meme) => meme === gCurrMeme) //prevent duplicates
    if (!isSaved) {
        gMemes.push(gCurrMeme)
        saveToStorage(STORAGE_KEY_MEMES, gMemes)
        alert('Meme Saved')
    }
    // localStorage.removeItem(STORAGE_KEY_CUR_MM)
}

function getCurrLine() {
    // var currMeme = getCurrMeme()
    return gCurrMeme.lines[gCurrMeme.selectedLineIdx]
}

//Check if the click is inside the line 
function islineClicked(clickedPos) {
    const { pos } = gline
    // Calc the distance between two dots
    const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
    // console.log('distance', distance)
    //If its smaller then the radius of the line we are inside
    return distance <= gline.size
}

function setlineDrag(isDrag) {
    gline.isDrag = isDrag
}

// Move the object in a delta, diff from the pervious pos
function moveline(dx, dy) {
    gline.pos.x += dx
    gline.pos.y += dy
}

