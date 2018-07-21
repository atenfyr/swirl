const args = require('command-line-args')([
    {name: 'integration', alias: 'n', type: Boolean}, // enable node integration
    {name: 'pretend', alias: 'p', type: Boolean}, // pretend we're using the web version
    {name: 'script', alias: 's', type: String} // script to load automatically
]);

const path = require('path');
const fs = require('fs');

const electron = require('electron');
const {app, dialog, shell, ipcMain} = require('electron');
const {autoUpdater} = require('electron-updater');

let mainWindow;
function createWindow() {
    const display = electron.screen.getPrimaryDisplay().workArea;
    mainWindow = new electron.BrowserWindow({webPreferences: {nodeIntegration: args.integration, preload: (args.pretend?(void 0):path.join(__dirname, 'preload.js'))}, width: display.width, height: display.height, title: "Swirl", icon: './assets/images/logo.png', show: false});
    mainWindow.maximize();
    mainWindow.loadURL(`file://${__dirname}/index.html`);
    
    if (!args.pretend) {
        ipcMain.on('inspect', (event) => {
            let selectedPath = process.argv[1];
            if (args.script) selectedPath = args.script;

            fs.readFile(selectedPath, 'utf-8', (err, data) => {
                if (err) {
                    event.sender.send('_inspect', false);
                } else {
                    event.sender.send('_inspect', data);
                }
            });
        });

        ipcMain.on('save', (event, data) => {
            dialog.showSaveDialog(mainWindow, {"filters": [{"name": "Swirl Data File", "extensions": ["swirl"]}]}, function(savePath) {
                if (savePath) {
                    fs.writeFile(savePath, data, 'utf-8', err => {
                        if (err) {
                            event.sender.send('_save', false);
                        } else {
                            event.sender.send('_save', savePath);
                        }
                    });
                }
            });
        });

        ipcMain.on('load', (event) => {
            dialog.showOpenDialog(mainWindow, {"properties": ["openFile"], "filters": [{"name": "Swirl Data File", "extensions": ["swirl"]},{"name": "JavaScript","extensions": ["js"]},{"name": "All Files","extensions": ['*']}]}, function(loadPath) {
                if (loadPath && loadPath[0] && typeof(loadPath) === 'object') {
                    fs.readFile(loadPath[0], 'utf-8', (err, data) => {
                        if (err) {
                            event.sender.send('_load', false);
                        } else {
                            event.sender.send('_load', [data, loadPath[0].split('.').pop()]);
                        }
                    });
                }
            });
        });

        ipcMain.on('fullscreen', (event) => {
            mainWindow.setFullScreen(!(mainWindow.isFullScreen()));
            event.sender.send('_fullscreen', true);
        });

        ipcMain.on('devtools', (event) => {
            mainWindow.webContents.openDevTools();
            event.sender.send('_devtools', true);
        });
    }

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