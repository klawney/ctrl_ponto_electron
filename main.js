const { app, BrowserWindow } = require('electron')
//const ponto = require( "./ponto.js")
//const settings = require('electron-settings');

//console.log(ponto);
//console.log( settings.file())

const  createWindow = async () => {
    const win = new BrowserWindow({
      width: 555,
      height: 400
    })
  
    await win.loadFile('./src/index.html')
  }

  app.whenReady().then(() => {
    createWindow()
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })