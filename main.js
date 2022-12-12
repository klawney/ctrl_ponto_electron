const { app, BrowserWindow } = require('electron')
//const ponto = require( "./ponto.js")
//const settings = require('electron-settings');

//console.log(ponto);
//console.log( settings.file())

const  createWindow = async () => {
    const win = new BrowserWindow({
      width: 555,
      height: 400,
      //show:false
      //fullscreenable:false
      //resizable:false
      //frame:false
    })
    
    await win.loadFile('./src/index.html')
  }
  
  app.whenReady().then(() => {
    const tray = require ('./traymode.js')
    tray.on('click',()=>
 
      createWindow()
    )
    //tray()
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })