const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
let mainWindow;

function createWindow() {
    const display = electron.screen.getPrimaryDisplay().workArea;
    mainWindow = new BrowserWindow({width: display.width, height: display.height, icon:'./assets/images/logo.png'});
    mainWindow.maximize();

    //mainWindow.webContents.openDevTools();

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('browser-window-created', function(_,window) {
    window.setMenu(null);
});

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function() {
    if (mainWindow === null) {
        createWindow();
    }
});