const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const windowStateKeeper = require('electron-window-state');
const config = require('./config.json');

let win;

function createWindow() {
  let mainWindowState = windowStateKeeper({
    defaultWidth: 800,
    defaultHeight: 600
  });

  win = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    webPreferences: {
      nodeIntegration: false
    }
  });

  mainWindowState.manage(win);

  win.loadURL(config.url);
  win.focus();
  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
