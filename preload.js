/*
    You really shouldn't be using anything defined here in your scripts.
    Everything here is used internally in order to prevent giving the
    Electron API to scripts, and that's about it.

    That being said, if you still need to use these for some odd reason,
    you can. However, there's probably a better way to do whatever you
    want to do, and I'm not going to make any promises regarding
    backwards-compatibility.
*/

const e = require('electron');
const p = e.ipcRenderer;

window.swirlDesktopApp = {};

const w = ['inspect', 'save', 'load', 'fullscreen', 'devtools'];
window.swirlDesktopApp.send = (m, a) => {
    if (!w.includes(m)) throw new Error('Invalid message');
    return new Promise(r => {
        p.send(m, a);
        p.on('_'+m, (_, v) => {r(v)});
    });
}

window.swirlDesktopApp.argv = e.remote.process.argv;
window.swirlDesktopApp.version = e.remote.app.getVersion();