# Swirl
A sandbox game that allows you to create and save structures with boxes, circles, and more.
# Installation
Swirl is available on the web [here.](https://atenfyr.github.io/swirl/) Alternatively, there is an offline Windows desktop app available [here.](https://github.com/atenfyr/swirl/releases)
# Scripting
If you'd like, you can write a custom script for Swirl to do whatever you want. There's [some documentary](https://github.com/atenfyr/swirl/blob/experimental/DOCUMENTARY.md) for the swirl API available to scripts, but you're also welcome to look at the [source](https://github.com/atenfyr/swirl/blob/experimental/assets/scripts/swirl.js).
# Building
While index.html should run out of the box, you can also build your own copy of the Windows desktop app. You'll need to install global copies of electron and electron-builder with npm. After that, just run `npm install` to install all the dependencies and `npm start` to boot it up or `npm run-script make` to build an installer.