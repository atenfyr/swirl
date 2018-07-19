/*
    You really shouldn't be using anything defined here in your scripts.
    The only reason this file exists is to avoid giving access to the
    Electron API to scripts and instead allow the main process to handle
    all the grunt work.

    That being said, if you still need to use these for some odd reason,
    you can. However, there's probably a better way to do whatever you
    want to do.
*/

const electron = require('electron');
const {ipcRenderer} = require('electron');

const whitelist = ['inspect', 'save', 'load', 'fullscreen', 'devtools'];
window.electronSendMessage = (msg, arg) => {
    if (typeof(msg) !== 'string') throw new Error('Message must be a string');
    msg = msg.toLowerCase();

    /* backwards compatibility */
    if (msg === 'inspectfile') msg = 'inspect';
    if (msg === 'refresh') { return new Promise(r=>{window.location.reload();r(true)}); }
    
    if (!whitelist.includes(msg)) throw new Error('Invalid message');

    return new Promise(resolve => {
        ipcRenderer.send('swirl_' + msg, arg);
        ipcRenderer.on('rswirl_' + msg, (event, result) => {
            resolve(result);
        });
    });
}

window.electronArgs = electron.remote.process.argv;