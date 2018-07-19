const electron = require('electron');
const {app, dialog, ipcMain} = require('electron');
const {autoUpdater} = require('electron-updater');
const isValid = require('is-valid-path');
const path = require('path');
const fs = require('fs');

let mainWindow;
function createWindow() {
    const display = electron.screen.getPrimaryDisplay().workArea;
    mainWindow = new electron.BrowserWindow({webPreferences: {nodeIntegration: true, preload: path.join(__dirname, 'preload.js')}, width: display.width, height: display.height, title:"Swirl", icon:'./assets/images/logo.png', show: false});
    mainWindow.maximize();
    mainWindow.loadURL(`file://${__dirname}/index.html`);

    ipcMain.on('swirl_inspect', (event) => {
        let selectedPath = process.argv[1];
        if (selectedPath && isValid(selectedPath) && !fs.lstatSync(selectedPath).isDirectory()) {
            event.sender.send('rswirl_inspect', fs.readFileSync(selectedPath, 'utf-8'));
        } else {
            event.sender.send('rswirl_inspect', false);
        }
    });

    ipcMain.on('swirl_save', (event, data) => {
        dialog.showSaveDialog(mainWindow, {"filters": [{"name": "Swirl Data File", "extensions": ["swirl"]}]}, function(savePath) {
            if (savePath) {
                fs.writeFileSync(savePath, data, 'utf-8');
                event.sender.send('rswirl_save', savePath);
            } else {
                event.sender.send('rswirl_save', false);
            }
        });
    });

    ipcMain.on('swirl_load', (event) => {
        dialog.showOpenDialog(mainWindow, {"properties": ["openFile"], "filters": [{"name": "Swirl Data File", "extensions": ["swirl"]},{"name":"JavaScript", "extensions":["js"]}]}, function(loadPath) {
            if (loadPath && loadPath.length != 0 && isValid(loadPath[0]) && !fs.lstatSync(loadPath[0]).isDirectory()) {
                event.sender.send('rswirl_load', [fs.readFileSync(loadPath[0], 'utf-8'), loadPath[0].split('.').pop()]);
            } else {
                event.sender.send('rswirl_load', false);
            }
        });
    });

    ipcMain.on('swirl_fullscreen', (event) => {
        mainWindow.setFullScreen(!(mainWindow.isFullScreen()));
        event.sender.send('rswirl_fullscreen', true);
    });

    ipcMain.on('swirl_devtools', (event) => {
        mainWindow.webContents.openDevTools();
        event.sender.send('rswirl_devtools', true);
    });

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
}

app.on('ready', function() {
    autoUpdater.checkForUpdatesAndNotify();
    createWindow();
});

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