'use strict'
// localStorage.clear()

const STORAGE_KEY_MENU = 'menuItemDB'

function selectItem(elMenuItem) {
    // console.log('f selectItem')
    elMenuItem.classList.add('selected') // NAV BAR
    const menuItem = elMenuItem.classList[0]
    console.log(menuItem)
    document.querySelector(`.main-section .${menuItem}`).classList.add('open') // MAIN SECTIONS
    setQueryParams({ menu: menuItem })

    saveToStorage(STORAGE_KEY_MENU, menuItem)

    unSelectRest(menuItem)
    render(menuItem)
}

function unSelectRest(menuItem) {
    var items = ['image-gallery', 'memes-gallery', 'about', 'meme-editor']
    var currItemIdx = items.findIndex((item) => item === menuItem)
    items.splice(currItemIdx, 1)
    items.forEach(item => {document.querySelector(`li.${item}`).classList.remove('selected')}) // NAV BAR
    items.forEach(item => {document.querySelector(`.main-section .${item}`).classList.remove('open')}) // MAIN SECTIONS
    // console.log(items)
}


