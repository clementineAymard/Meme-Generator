'use strict'

// localStorage.clear()
const STORAGE_KEY_MM = 'memesDB'
const STORAGE_KEY_IMG = 'imagesDB'

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

var gImgs = [{ id: 1, url: '/images/1.jpg', keywords: ['funny', 'cat'] },
{ id: 2, url: '/images/2.jpg', keywords: ['dog', 'cute'] }];

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            align: 'left',
            color: 'red'
        }
    ]
}


function getImgs() {
    return gImgs
}

function getImgById(imgId) {
    let imgs = getImgs()
    let image = imgs.find(img => `${img.id}` === `${imgId}`)
    return image
}

function getMeme() {
    return gMeme
}

function createMeme(imgId) {
    gMeme = {
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: [{
            txt: '',
            size: 20,
            align: 'left',
            color: 'black'
        }]
    }
    return gMeme
}

