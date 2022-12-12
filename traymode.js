const {Tray}  = require('electron')
//const {resolve} = require('path')

//const dirimg = resolve(__dirname ,'/src','x.png')
function createTray() {
    const tray = new Tray("./src/x.png")
    return tray
}

module.exports = createTray()