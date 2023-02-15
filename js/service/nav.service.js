'use strict'
// localStorage.clear()

const STORAGE_KEY_MENU = 'menuItemDB'

// var gMenuItem
// function getCurrMenuItem() {
//     var currMenuItem = loadFromStorage(STORAGE_KEY)
//     if (!gMenuItem) {
//         currMenuItem = 'gallery'
//         saveToStorage(STORAGE_KEY, currMenuItem)
//     }
//     return currMenuItem
// }

// function setCurrMenuItem() {
//     gMenuItem = getCurrMenuItem()
//     document.querySelector(`.${gMenuItem}`).classList.add('open')
//     unSelectRest()
// }

function selectItem(elMenuItem) {
    // console.log('hi')
    elMenuItem.classList.add('open')
    const menuItem = elMenuItem.classList[0]
    setQueryParams({ menu: menuItem })

    saveToStorage(STORAGE_KEY_MENU, menuItem)

    unSelectRest(menuItem)
}

function unSelectRest(menuItem) {
    var items = ['gallery', 'memes', 'about']
    var currItemIdx = items.findIndex((item) => item === menuItem)
    items.splice(currItemIdx, 1)
    items.forEach(item => document.querySelector(`.${item}`).classList.remove('open'))
    // console.log(items)
}