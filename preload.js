/*
    You really shouldn't be using anything defined here in your scripts.
    Everything here is used internally in order to prevent giving the
    Electron API to scripts, and that's about it.

    That being said, if you still need to use these for some odd reason,
    you can. However, there's probably a better way to do whatever you
    want to do, and I'm not going to make any promises regarding
    backwards-compatibility.
*/

const electron = require('electron');
const {ipcRenderer} = require('electron');

window.swirlDesktopApp = {};

const messageWhitelist = ['inspect', 'save', 'load', 'fullscreen', 'devtools'];
window.swirlDesktopApp.send = (msg, arg) => {
    if (typeof(msg) !== 'string') throw new Error('Message must be a string');
    msg = msg.toLowerCase();
    
    if (!messageWhitelist.includes(msg)) throw new Error('Invalid message');

    return new Promise(resolve => {
        ipcRenderer.send('swirl_' + msg, arg);
        ipcRenderer.on('rswirl_' + msg, (event, result) => {
            resolve(result);
        });
    });
}

window.swirlDesktopApp.argv = electron.remote.process.argv;
window.swirlDesktopApp.version = electron.remote.app.getVersion();