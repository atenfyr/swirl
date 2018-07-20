const path = require('path');
const fs = require('fs');

const electron = require('electron');
const {app, dialog, shell, ipcMain} = require('electron');
const {autoUpdater} = require('electron-updater');

let mainWindow;

function createWindow() {
    const display = electron.screen.getPrimaryDisplay().workArea;
    mainWindow = new electron.BrowserWindow({webPreferences: {nodeIntegration: false, preload: path.join(__dirname, 'preload.js')}, width: display.width, height: display.height, title: "Swirl", icon: './assets/images/logo.png', show: false});
    mainWindow.maximize();
    mainWindow.loadURL(`file://${__dirname}/index.html`);

    ipcMain.on('swirl_inspect', (event) => {
        let selectedPath = process.argv[1];
        try {
            event.sender.send('rswirl_inspect', fs.readFileSync(selectedPath, 'utf-8'));
        } catch(err) {
            event.sender.send('rswirl_inspect', false);
        }
    });

    ipcMain.on('swirl_save', (event, data) => {
        dialog.showSaveDialog(mainWindow, {"filters": [{"name": "Swirl Data File", "extensions": ["swirl"]}]}, function(savePath) {
            try {
                fs.writeFileSync(savePath, data, 'utf-8');
                event.sender.send('rswirl_save', savePath);
            } catch(err) {
                event.sender.send('rswirl_save', false);
            }
        });
    });

    ipcMain.on('swirl_load', (event) => {
        dialog.showOpenDialog(mainWindow, {"properties": ["openFile"], "filters": [{"name": "Swirl Data File", "extensions": ["swirl"]},{"name":"JavaScript", "extensions":["js"]}]}, function(loadPath) {
            try {
                event.sender.send('rswirl_load', [fs.readFileSync(loadPath[0], 'utf-8'), loadPath[0].split('.').pop()]);
            } catch(err) {
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

    mainWindow.webContents.on('new-window', function(event, url) {
        event.preventDefault();
        shell.openExternal(url);
    });

    mainWindow.webContents.on('will-navigate', function(event, url) {
        if (url !== mainWindow.webContents.getURL()) {
            event.preventDefault();
        }
    });
}

let shouldQuit = app.makeSingleInstance(function() {
    if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore();
        mainWindow.focus();
    }
});

if (shouldQuit) {
    app.quit();
    return;
}

app.on('ready', function() {
    autoUpdater.checkForUpdatesAndNotify();
    createWindow();
});

app.on('browser-window-created', function(_,window) {
    return window.setMenu(null);
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