const electron = require('electron');
const {ipcRenderer} = require('electron');

const whitelist = ['inspectFile', 'save', 'load', 'fullscreen', 'refresh', 'devTools'];
window.electronSendMessage = (msg, arg) => {
    if (typeof(msg) !== 'string') return false;
    if (!whitelist.includes(msg)) return false;
    msg = msg.charAt(0).toUpperCase() + msg.slice(1);

    return new Promise(resolve => {
        ipcRenderer.send('swirl' + msg, arg);
        ipcRenderer.on('rswirl' + msg, (event, result) => {
            resolve(result);
        });
    });
}

window.electronArgs = electron.remote.process.argv;