const electron = require('electron');
const {app, dialog, ipcMain} = require('electron');
const {autoUpdater} = require('electron-updater');
const isValid = require('is-valid-path');
const path = require('path');
const fs = require('fs');

let mainWindow;
function createWindow() {
    const display = electron.screen.getPrimaryDisplay().workArea;
    mainWindow = new electron.BrowserWindow({webPreferences: {nodeIntegration: false, preload: path.join(__dirname, 'preload.js')}, width: display.width, height: display.height, icon:'./assets/images/logo.png', show: false});
    mainWindow.maximize();
    mainWindow.loadURL(`file://${__dirname}/index.html`);

    ipcMain.on('swirlInspectFile', (event, arg) => {
        arg = arg || process.argv[1];
        if (arg && isValid(arg) && !fs.lstatSync(arg).isDirectory()) {
            event.sender.send('rswirlInspectFile', fs.readFileSync(arg, 'utf-8'));
        } else {
            event.sender.send('rswirlInspectFile', false);
        }
    });

    ipcMain.on('swirlSave', (event, data) => {
        dialog.showSaveDialog(mainWindow, {"filters": [{"name": "Swirl Data File", "extensions": ["swirl"]}]}, function(savePath) {
            if (savePath) {
                fs.writeFileSync(savePath, data, 'utf-8');
                event.sender.send('rswirlSave', savePath);
            } else {
                event.sender.send('rswirlSave', false);
            }
        });
    });

    ipcMain.on('swirlLoad', (event) => {
        dialog.showOpenDialog(mainWindow, {"properties": ["openFile"], "filters": [{"name": "Swirl Data File", "extensions": ["swirl"]},{"name":"JavaScript", "extensions":["js"]}]}, function(loadPath) {
            if (loadPath && loadPath.length != 0 && isValid(loadPath[0]) && !fs.lstatSync(loadPath[0]).isDirectory()) {
                event.sender.send('rswirlLoad', [fs.readFileSync(loadPath[0], 'utf-8'), loadPath[0].split('.').pop()]);
            } else {
                event.sender.send('rswirlLoad', false);
            }
        });
    });

    ipcMain.on('swirlFullscreen', (event) => {
        mainWindow.setFullScreen(!(mainWindow.isFullScreen()));
        event.sender.send('rswirlFullscreen', true);
    });

    ipcMain.on('swirlRefresh', (event) => {
        mainWindow.reload();
        event.sender.send('rswirlRefresh', true);
    });

    ipcMain.on('swirlDevTools', (event) => {
        mainWindow.webContents.openDevTools();
        event.sender.send('rswirlDevTools', true);
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