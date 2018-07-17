# Swirl
A sandbox game that allows you to create and save structures with boxes, circles, and more.
# Installation
Swirl is available on the web [here.](https://atenfyr.github.io/swirl/) Alternatively, there is an offline Windows desktop app available [here.](https://github.com/atenfyr/swirl/releases)
# Scripting
If you'd like, you can write a custom script for Swirl to do whatever you want. Check the index.html file for some functions you can use to manipulate the canvas. Once you've written a script, pump it through [this](https://atenfyr.github.io/swirl/encoder.html) URL-safe base64 encoder and specify it as a URL parameter named "script." Alternatively, you can modify a swirl file saved using the desktop app to have a script by placing the same URL-safe base64 in a second line in the file.
# Building
While index.html should run out of the box, you can also build your own copy of the Windows desktop app. You'll need to install global copies of electron and electron-builder with npm. After that, just run `npm install` to install all the dependencies and `npm start` to boot it up or `npm dist` to build an installer.