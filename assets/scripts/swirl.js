const isClient = (navigator.userAgent.toLowerCase().indexOf('electron') > -1);
var fs, electron, dialog, thisWindow, isValid; // please don't override these
if (isClient) {
    fs = require('fs');
    electron = require('electron');
    dialog = electron.remote.dialog;
    thisWindow = electron.remote.getCurrentWindow();
    isValid = require('is-valid-path');
}

const debug = ((isClient && electron.remote.process.argv[2] === 'debug')?true:false);

window.addEventListener('load', function(){
    var swirl = {}

    /**
     * Returns the size of the screen.
     *
     * @returns {number} The width of the screen.
     * @returns {number} The height of the screen.
     */
    swirl.getDisplaySize = function() {
        return W, H;
    }

    /**
     * Returns the bounds of the map.
     * 
     * @returns {number} The width of the bounding box.
     * @returns {number} The height of the bounding box.
     */
    swirl.getBounds = function() {
        let thisRectangle = game.world.getBounds();
        return thisRectangle.width, thisRectangle.height;
    }

    /**
     * Returns an array of valid tracks which can be passed to [setTrack]{@link swirl.setTrack}.
     * 
     * @returns {Array} Valid tracks.
     */
    swirl.getTracks = function() {
        return [
            'none',
            'mii',
            'game',
        ]
    }

    /**
     * Switches the track to another song. See [getTracks]{@link swirl.getTracks} for a list of valid songs.
     * 
     * @param {string} [key] - The song to switch to. If unspecified, calls [stopMusic]{@link swirl.stopMusic}.
     */
    swirl.setTrack = function(key) {
        if (key === 'none' || !key) return swirl.stopMusic();
        if (music) music.stop();
        music = game.add.audio(key);
        music.play('', 0, 0.75, true);
        currentTrack = key;
    }
    
    /**
     * Stops any music that is currently playing, if there is any.
     */
    swirl.stopMusic = function() {
        if (music) {
            music.stop();
        }
        music = null;
        currentTrack = null;
    }

    /**
     * Moves a sprite towards another sprite.
     * 
     * @param {Phaser.Sprite} obj1 
     * @param {Phaser.Sprite} obj2 
     * @param {number} speed - The speed of attraction, where 25 is roughly the speed at which black holes attract sprites.
     */
    swirl.moveTowards = function(obj1, obj2, speed) {
        return moveTowards(obj1, obj2, speed, false);
    }

    /**
     * Encodes a string of text in Swirl's save format.
     * 
     * @param {string} text
     * @returns {string} Encoded text.
     */
    swirl.encode = function(text) {
        for (var i in saveLibrary) {
            text = replaceAll(text, saveLibrary[i][0], saveLibrary[i][1]);
        }
        return text;
    }

    /**
     * Decodes a string of text in Swirl's save format.
     * 
     * @param {string} text
     * @returns {string} Decoded text.
     */
    swirl.decode = function(text) {
        for (var j in saveLibrary) {
            text = replaceAll(text, saveLibrary[j][1], saveLibrary[j][0]);
        }
        return text;
    }

    /**
     * Decodes a string of text encoded in the URL-safe variant of Base64 that Swirl uses for storing scripts.
     * 
     * @param {string} text
     * @returns {string} Decoded text.
     */
    swirl.base64 = function(text) {
        return atob(text.replace(/\./g, '+').replace(/\_/g, '/').replace(/\-/g, '='));
    }

    /**
     * @typedef {Array} SavedSprite
     * @property {number} 0 - The X-value of this sprite.
     * @property {number} 1 - The Y-value of this sprite.
     * @property {number} 2 - The horizontal velocity of this sprite.
     * @property {number} 3 - The vertical velocity of this sprite.
     */

    /**
     * @typedef {Array} SavedSpriteExtended
     * @property {number} 0 - The X-value of this sprite.
     * @property {number} 1 - The Y-value of this sprite.
     * @property {number} 2 - The horizontal velocity of this sprite.
     * @property {number} 3 - The vertical velocity of this sprite.
     * @property {number} 4 - The angle of this sprite.
     * @property {number} 5 - The angular velocity of this sprite.
     */

    /**
     * @typedef {Array} SavedSpriteWithScale
     * @property {number} 0 - The X-value of this sprite.
     * @property {number} 1 - The Y-value of this sprite.
     * @property {number} 2 - The horizontal scale of this sprite.
     * @property {number} 3 - The vertical scale of this sprite.
     */

    /**
     * @typedef {Array} WorldDataArray
     * @property {number} 0 - The current friction number.
     * @property {number} 1 - The width of the map, or -1 if this is Infinity.
     * @property {number} 2 - The height of the map, or -1 if this is Infinity.
     * @property {number} 3 - Whether or not building mode is on. (0 if not, 1 if so)
     * @property {number} 4 - The physics engine's restitution (the "bounciness").
     * @property {number} 5 - Whether or not the konami code effect has been activated. (0 if not, 1 if so)
     * @property {number} 6 - The X value of the camera.
     * @property {number} 7 - The Y value of the camera.
     * @property {number} 8 - The number (defined in [getTracks]{@link swirl.getTracks}) of the track currently playing.
     * @property {number} 9 - Whether or not entering black holes will trigger the "die" sound effect to play. (0 if not, 1 if so)
     * @property {number} 10 - Whether or not grid locking is enabled. (0 if not, 1 if so)
     */

    /**
     * @typedef {Object} Save
     * @property {Array<SavedSprite>} o - All the boxes in the world.
     * @property {Array<SavedSpriteExtended>} c - All the balls in the world.
     * @property {Array<SavedSpriteExtended>} d - All the cats in the world.
     * @property {Array<SavedSpriteWithScale>} b - All the black holes in the world.
     * @property {Array<SavedSprite>} i - All the immovable objects in the world.
     * @property {SavedSprite} p - Data about the player.
     * @property {WorldDataArray} g - Data about the world.
     * @property {number} f - Set to 0 if this save was generated in a browser, 1 if it was generated in the desktop app.
     */

    /**
     * Generates a save file.
     * 
     * @returns {Save} A save file that represents the world when the function was called.
     */
    swirl.save = function() {
        let saveData = {};
        saveData["o"] = [];
        for (var i in obstacles) {
            if (!((Math.abs(obstacles[i].position.x) >= 100000) || (Math.abs(obstacles[i].position.y) >= 100000)) && obstacles[i].body) {
                saveData["o"].push([Math.round(obstacles[i].position.x), Math.round(obstacles[i].position.y), Math.floor(obstacles[i].body.velocity.x), Math.floor(obstacles[i].body.velocity.y)]);
            }
        }
        saveData["c"] = [];
        for (var i in circles) {
            if (!((Math.abs(circles[i].position.x) >= 100000) || (Math.abs(circles[i].position.y) >= 100000)) && circles[i].body) {
                saveData["c"].push([Math.floor(circles[i].position.x), Math.floor(circles[i].position.y), Math.floor(circles[i].body.velocity.x), Math.floor(circles[i].body.velocity.y), Math.floor(circles[i].angle), Math.floor(circles[i].body.angularVelocity)]);
            }
        }
        saveData["d"] = [];
        for (var i in cats) {
            if (!((Math.abs(cats[i].position.x) >= 100000) || (Math.abs(cats[i].position.y) >= 100000)) && cats[i].body) {
                saveData["d"].push([Math.floor(cats[i].position.x), Math.floor(cats[i].position.y), Math.floor(cats[i].body.velocity.x), Math.floor(cats[i].body.velocity.y), Math.floor(cats[i].angle), Math.floor(cats[i].body.angularVelocity)]);
            }
        }
        saveData["b"] = [];
        for (var i in holes) {
            if (!((Math.abs(holes[i].position.x) >= 100000) || (Math.abs(holes[i].position.y) >= 100000)) && holes[i].body) {
                saveData["b"].push([Math.floor(holes[i].position.x), Math.floor(holes[i].position.y), roundToHundredths(holes[i].scale.x), roundToHundredths(holes[i].scale.y)]);
            }
        }
        saveData['i'] = [];
        for (var i in objects) {
            if (!((Math.abs(objects[i].position.x) >= 100000) || (Math.abs(objects[i].position.y) >= 100000)) && objects[i].body) {
                saveData['i'].push([Math.round(objects[i].position.x), Math.round(objects[i].position.y), Math.floor(objects[i].body.velocity.x), Math.floor(objects[i].body.velocity.y)]);
            }
        }

        let trackNumber = swirl.getTracks().indexOf(currentTrack);
        if (trackNumber === -1) { trackNumber = 0; }

        saveData["p"] = [Math.floor(player.position.x), Math.floor(player.position.y), Math.floor(player.body.velocity.x), Math.floor(player.body.velocity.y)];
        saveData["g"] = [friction, ((game.world.bounds["width"] == Infinity)?-1:game.world.bounds.width), ((game.world.bounds.height == Infinity)?-1:game.world.bounds["height"]), ((buildingMode)?1:0), game.physics.p2.restitution, ((suckable)?1:0), game.camera.x, game.camera.y, trackNumber, ((dieSound)?1:0), ((gridLock)?1:0)];
        saveData["f"] = 0;
        if (isClient) saveData["f"] = 1;

        return saveData;
    }

    /**
     * Loads an object representing a save file. 
     * 
     * @param {Save} saveData 
     */
    swirl.load = function(saveData) {
        swirl.resetCanvas();
        for (var i in saveData["o"]) {
            if (saveData["o"][i]) {
                swirl.create('box', saveData['o'][i][0], saveData['o'][i][1], false, false, saveData['o'][i][2], saveData['o'][i][3]);
            }
        }
        for (var i in saveData["c"]) {
            if (saveData["c"][i]) {
                swirl.create('ball', saveData['c'][i][0], saveData['c'][i][1], false, false, saveData['c'][i][2], saveData['c'][i][3]);
            }
        }
        for (var i in saveData["d"]) {
            if (saveData["d"][i]) {
                swirl.create('cat', saveData['d'][i][0], saveData['d'][i][1], false, false, saveData['d'][i][2], saveData['d'][i][3]);
            }
        }
        for (var i in saveData["b"]) {
            if (saveData["b"][i]) {
                hole = game.add.sprite(saveData['b'][i][0], saveData['b'][i][1], 'blackhole');
                hole.name = 'hole';
                hole.scale.setTo(saveData['b'][i][2], saveData['b'][i][3]);
                game.physics.p2.enable(hole);
                hole.body.kinematic = true;
                hole.anchor.setTo(0.5, 0.5);
                hole.body.setCircle(hole.width/1.85);
                holes.push(hole);
            }
        }
        if (saveData['i']) {
            for (var i in saveData['i']) {
                if (saveData['i'][i]) {
                    swirl.create('immovable object', saveData['i'][i][0], saveData['i'][i][1], false, false, saveData['i'][i][2], saveData['i'][i][3]);
                }
            }
        }
        player.body.x = saveData["p"][0];
        player.body.y = saveData["p"][1];
        player.body.velocity.x = saveData["p"][2];
        player.body.velocity.y = saveData["p"][3];
        friction = saveData["g"][0];
        if (saveData["g"][1] == -1 || saveData["g"][1] > W) {
            game.world.setBounds(-Infinity, -Infinity, Infinity, Infinity);
        } else {
            game.world.setBounds(0, 0, saveData["g"][1], saveData["g"][2]);
        }
        buildingMode = (saveData["g"][3] == 1);
        if (saveData["g"][4]) {
            game.physics.p2.restitution = saveData["g"][4];
        }
        suckable = (saveData["g"][5] == 1);
        if (saveData["g"][6]) {
            game.camera.x = saveData["g"][6];
            game.camera.y = saveData["g"][7];
        }
        swirl.setTrack(swirl.getTracks()[saveData["g"][8]]);
        dieSound = (saveData["g"][9] == 1);
        gridLock = (saveData['g'][10] == 1);
        player.tint = gridLock?'0xADD8E6':'0xFFFFFF';
    }

    /**
     * Runs a function on a set of sprites in the world.
     * If the selector is an object, the function will be ran on all sprites in that object.
     * If the selector is a string, the function will be ran on all sprites of that type.
     * If the selector is a function, the second parameter will be ignored and the function will be ran on all objects that exist.
     * 
     * @param {(Object|Function|string)} selector 
     * @param {Function} [func]
     */
    swirl.onAll = function(selector, func) {
        if (typeof(selector) === 'object') {
            for (var i in selector) {
                func(selector[i]);
            }
        } else if (typeof(selector) === 'string') {
            switch(selector.replace(/s$/, "")) {
                case 'circle':
                case 'sphere':
                case 'ball':
                    selector = circles;
                    break;
                case 'box':
                case 'square':
                case 'obstacle':
                    selector = obstacles;
                    break;
                case 'cat':
                case 'kitten':
                    selector = cats;
                    break;
                case 'immovable':
                case 'object':
                case 'immovable object':
                    selector = objects;
                    break;
                case 'hole':
                case 'blackhole':
                case 'black hole':
                    selector = holes;
                    break;
                case 'player':
                    selector = [player];
                    break;
                default:
                    selector = [];
                    break;
            }
            for (var i in selector) {
                func(selector[i]);
            }
        } else if (typeof(selector) === 'function') {
            game.world.forEachExists(selector, this);
        }
    }

    /**
     * Resets the canvas.
     */
    swirl.resetCanvas = function() {
        swirl.resetPlayer();
        for (var i in circles) {
            circles[i].destroy();
        }
        for (var i in obstacles) {
            obstacles[i].destroy();
        }
        for (var i in cats) {
            cats[i].destroy();
        }
        for (var i in holes) {
            holes[i].destroy();
        }
        for (var i in objects) {
            objects[i].destroy();
        }
        obstacles = [];
        circles = [];
        cats = [];
        holes = [];
        objects = [];
        actions = [];
        lastAction = undefined;
        friction = 4;
    }

    /**
     * Resets the camera and the player.
     * 
     * @param {boolean} randomly - Whether or not to place the player at a random spot on the map rather than the center.
     */
    swirl.resetPlayer = function(randomly) {
        player.kill();
        if (randomly) {
            let newPlayerX = game.world.randomX;
            let newPlayerY = game.world.randomY;
            player.reset(newPlayerX, newPlayerY);
            game.camera.reset(newPlayerX, newPlayerY);
        } else {
            player.reset(W/2, H/2);
            game.camera.reset(W/2, H/2);
        }
        game.camera.follow(player);
        game.camera.deadzone = new Phaser.Rectangle(0, 0, W, H);
    }

    /**
     * Creates a brand new sprite.
     * 
     * @param {string} type - The type of sprite to spawn.
     * @param {number} [atx=player.x] - The X value of the new sprite.
     * @param {number} [aty=player.y] - The Y value of the new sprite.
     * @param {boolean} [lockOntoGrid=false] - Whether or not to automatically lock this sprite on the grid.
     * @param {boolean} [dontAssociate=false] - Whether or not to avoid including this sprite in the global pool of all of its kind. 
     * @param {number} [vx=0] - The horizontal velocity to start the new sprite with.
     * @param {number} [vy=0] - The vertical velocity to start the new sprite with.
     * @returns {Phaser.Sprite} - The sprite that was created.
     */
    swirl.create = function(type, atx, aty, lockOntoGrid, dontAssociate, vx, vy) {
        atx = atx || player.x;
        aty = aty || player.y;

        if (isChasing && type !== 'hole' && type !== 'blackhole' && type !== 'black hole') {
            atx = game.world.randomX;
            aty = game.world.randomY;
        }

        if (type == 'random') {
            switch(game.rnd.integerInRange(1,4)) {
                case 1:
                    type = 'box';
                    break;
                case 2:
                    type = 'cat';
                    break;
                case 3:
                    type = 'immovable object';
                    break;
                default:
                    type = 'ball';
                    break;
            }
        }

        switch(type) {
            case 'circle':
            case 'sphere':
            case 'ball':
                if (lockOntoGrid) {
                    atx = Math.round(atx/35)*35;
                    aty = Math.round(player.y/35)*35;
                }
                lastAction = game.add.sprite(atx, aty, 'circle');
                lastAction.name = 'circle';
                game.physics.p2.enable(lastAction);
                lastAction.anchor.setTo(0.5, 0.5);
                lastAction.body.setCircle(lastAction.width/2);
                if (vx && vy) {
                    lastAction.body.velocity.x = vx;
                    lastAction.body.velocity.y = vy;
                }
                if (!dontAssociate) {
                    circles.push(lastAction);
                }
                actions.push(lastAction);
                break;
            case 'box':
            case 'square':
            case 'rectangle':
            case 'obstacle':
                if (lockOntoGrid) {
                    atx = Math.round(atx/40)*40;
                    aty = Math.round(player.y/40)*40;
                }
                lastAction = game.add.sprite(atx, aty, 'box');
                lastAction.name = 'obstacle';
                game.physics.p2.enable(lastAction);
                lastAction.body.kinematic = true;
                if (vx && vy) {
                    lastAction.body.velocity.x = vx;
                    lastAction.body.velocity.y = vy;
                }
                if (!dontAssociate) {
                    obstacles.push(lastAction);
                }
                actions.push(lastAction);
                break;
            case 'cat':
            case 'kitten':
                if (lockOntoGrid) {
                    atx = Math.round(atx/100)*100;
                    aty = Math.round(player.y/100)*100;
                }
                lastAction = game.add.sprite(atx, aty, 'cat');
                lastAction.name = 'cat';
                lastAction.scale.setTo(0.4, 0.4);
                game.physics.p2.enable(lastAction);
                if (vx && vy) {
                    lastAction.body.velocity.x = vx;
                    lastAction.body.velocity.y = vy;
                }
                if (!dontAssociate) {
                    cats.push(lastAction);
                }
                actions.push(lastAction);
                break;
            case 'immovable':
            case 'object':
            case 'immovable object':
                if (lockOntoGrid) {
                    atx = Math.round(atx/40)*40;
                    aty = Math.round(player.y/40)*40;
                }
                lastAction = game.add.sprite(atx, aty, 'immovable');
                lastAction.name = 'object';
                game.physics.p2.enable(lastAction);
                lastAction.body.kinematic = true;
                if (vx && vy) {
                    lastAction.body.velocity.x = vx;
                    lastAction.body.velocity.y = vy;
                }
                if (!dontAssociate) {
                    objects.push(lastAction);
                }
                actions.push(lastAction);
                break;
            case 'hole':
            case 'blackhole':
            case 'black hole':
                if (lockOntoGrid) {
                    atx = Math.round(atx/55)*55;
                    aty = Math.round(player.y/55)*55;
                }
                lastAction = game.add.sprite((atx || player.x), (aty || player.y), 'blackhole');
                lastAction.name = 'hole';
                lastAction.scale.setTo(0.055, 0.055);
                game.physics.p2.enable(lastAction);
                lastAction.body.kinematic = true;
                lastAction.anchor.setTo(0.5, 0.5);
                lastAction.body.setCircle(lastAction.width/1.85);
                if (vx && vy) {
                    lastAction.body.velocity.x = vx;
                    lastAction.body.velocity.y = vy;
                }
                if (!dontAssociate) {
                    holes.push(lastAction);
                }
                actions.push(lastAction);
                break;
        }
        if (isChasing) {
            if (lastAction.name != 'hole') {
                lastAction.tint = 0xFF0000;
                lastAction.name = 'dangerous';
            }
        }
        return lastAction;
    }

    /**
     * A callback which is tied to a sprite through [tieScript]{@link swirl.tieScript}.
     * 
     * @callback tiedScript
     * @param {Phaser.Sprite} - The sprite this callback is tied to.
     */

    /**
     * Ties a callback to a sprite which executes upon impact with the player. Note that only one script may be tied to a sprite at a time.

     * @param {Phaser.Sprite} sprite - The sprite to tie this script to.
     * @param {tiedScript} script - The script to tie to this sprite.
     */
    swirl.tieScript = function(sprite, script) {
        if (!sprite.data) sprite.data = {};
        sprite.data.script = script;
        sprite.data.scriptEnabled = true;
    }

    /**
     * Unties a script tied to a sprite, if there is one.
     * 
     * @param {Phaser.Sprite} sprite 
     */
    swirl.untieScript = function(sprite) {
        if (!sprite.data) sprite.data = {};
        sprite.data.script = null;
        sprite.data.scriptEnabled = null;
    }

    /**
     * Returns the script tied to a sprite, if there is one.
     * 
     * @param {Phaser.Sprite} sprite
     * @returns {tiedScript}
     */
    swirl.getScript = function(sprite) {
        if (!sprite.data) sprite.data = {};
        return sprite.data.script;
    }

    /**
     * @typedef {Array} CustomKey
     * @property {Phaser.Key} 0 - A key created by Phaser.Keyboard.
     * @property {boolean} 1 - Whether or not the key can be held down.
     * @property {Function} 2 - A callback with no parameters to be executed whenever the key is pressed.
     */

    /**
     * An array of bound keys created by [registerKey]{@link swirl.registerKey}.
     * 
     * @type {Array<CustomKey>}
     */
    swirl.keys = [];

    /**
     * Registers a key. Will unbind any previously existing keys bound to the key specified.
     * 
     * @param {(string|number)} key - Either a string defined by Phaser.KeyCode or a JavaScript keycode.
     * @param {boolean} allowHolding - Whether or not the key can be held down.
     * @param {Function} cb - A callback with no parameters to be executed whenever the key is pressed.
     */
    swirl.registerKey = function(key, allowHolding, cb) {
        key = Phaser.KeyCode[key] || key;
        swirl.unbindKey(key);
        swirl.keys.push([game.input.keyboard.addKey(key), allowHolding, cb]);
    }
    swirl.bindKey = function(k,a,f) { return swirl.registerKey(k,a,f) }

    /**
     * Unbinds all pre-existing keys bound to the key specified.
     * 
     * @param {(string|number)} key - Either a string defined by Phaser.KeyCode or a JavaScript keycode.
     */
    swirl.unbindKey = function(key) {
        key = Phaser.KeyCode[key] || key;
        Object.keys(keylist).forEach(function(k) {
            if (keylist[k]['keyCode'] === key) {
                keylist[k] = {justDown:false,isDown:false}
            }
        });

        for (var i = 0; i < swirl.keys.length; i++) {
            let currentKey = swirl.keys[i];
            if (currentKey[0]['keyCode'] === key) {
                swirl.keys.splice(i, 1);
            }
        }
    }

    /**
     * Formats a time specified in seconds to the format MM:SS.
     * 
     * @param {number} s - Time in seconds.
     */
    swirl.formatTime = function(s) {
        var minutes = "0" + Math.floor(s / 60);
        var seconds = "0" + (s - minutes * 60);
        return minutes.substr(-2) + ":" + seconds.substr(-2);   
    }

    let W = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    let H = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    let currentURL = new URL(window.location.href);
    let defaultFont = {font: "15px Consolas", fill: "#fff"};
                    
    let obstacles = [];
    let circles = []
    let cats = [];
    let holes = [];
    let objects = []; // immovable objects
    let actions = [];
    let lines = [];
    let player, obstacle, circle, hole, keylist, mobile, music, currentTrack, dieAudio, lastAction, tipText, lives, livesText, timerText, textGroup, countdown, countdownEvent, hasWon, graphics, cheatMode, disableTransform;

    let friction = 4;
    let buildingMode, suckable, isChasing, dieSound, gridLock = false;
    
    let game = new Phaser.Game(W, H, Phaser.CANVAS, 'game', {preload, create, update, render});
    
    function roundToHundredths(x) {
        return Math.round(100*x)/100;
    }

    function konamiCode() {
        if (buildingMode) {
            buildingMode = false;
        }
        suckable = true;
    }
    
    // based off of https://phaser.io/examples/v2/p2-physics/accelerate-to-object
    function moveTowards(obj1, obj2, speed, filterDangerous) {
        if (obj1.body && obj2.body && obj1 !== obj2 && (!filterDangerous || obj1.name === 'dangerous')) {
            var angle = Math.atan2(obj2.y-obj1.y, obj2.x-obj1.x);
            obj1.body.velocity.x = (Math.cos(angle)*speed)+obj1.body.velocity.x;
            obj1.body.velocity.y = (Math.sin(angle)*speed)+obj1.body.velocity.y;
            return true;
        }
        return false;
    }

    function isChasingLoop(obj) {
        if (obj.name == 'dangerous' && (Phaser.Math.distance(obj.x, obj.y, player.x, player.y) <= (5+(obj.width*0.75)+player.offsetX))) {
            obj.destroy();
            new Audio('assets/audio/beep.mp3').play(); // we're not using phaser's audio system here because the game is permanently paused at zero lives, meaning it wouldn't play the sound
            lives--;
            if (lives === 0) {
                livesText.setText('0 lives remaining');
                game.paused = true;
                game.input.keyboard.stop();
                return;
            } else {
                swirl.resetPlayer(true);
                switch(lives) {
                    case 1:
                        livesText.setText('1 life remaining');
                        break;
                    default:
                        livesText.setText(lives + ' lives remaining');
                        break;
                }
            }
        }
    }
                    
    function moveToHole(obj) {
        if (isChasing) {
            return;
        }
        if ((obj["name"] != 'player') || suckable) {
            if (obj.body) {
                for (var i in holes) {
                    if ((holes[i] != obj) && holes[i].alive) {
                        if (obj['name'] != 'object') {
                            moveTowards(obj, holes[i], (holes[i].width/15)+19);
                        }
                        if ((Phaser.Math.distance(holes[i].x, holes[i].y, obj.x, obj.y) <= (10+(holes[i].width*0.75)+obj.offsetX))) {
                            if (dieSound) {
                                dieAudio.play('', 0, 1);
                            }
                            if (suckable) {
                                obj.body.x = game.rnd.integerInRange(5, W-5);
                                obj.body.y = game.rnd.integerInRange(5, H-5);
                            } else if (obj["name"] == "hole") {
                                if ((holes[i].width < obj.width) && obj.body) {
                                    obj.width += (holes[i].width/(obj.width/5));
                                    obj.height += (holes[i].height/(obj.height/5));
                                    obj.body.setCircle(obj.width/1.85);
                                    holes[i].destroy();
                                } else if (obj.body) {
                                    holes[i].width += (obj.width/(holes[i].width/5));
                                    holes[i].height += (obj.height/(holes[i].height/5));
                                    holes[i].body.setCircle(holes[i].width/1.85);
                                    obj.destroy();
                                }
                            } else {
                                obj.destroy();
                            }
                        }
                    }
                }
            }
        }
    }

    function clientLoadSave(data) {
        let result, didErr = false;
        let save = data.split('\n');
        try {
            result = JSON.parse(swirl.decode(save[0]));
        } catch(err) {
            didErr = true;
        }

        if (!didErr && result) {
            swirl.load(result);
        }

        if (save[1] && isClient) {
            game.paused = true;
            game.input.keyboard.stop();
            swal({
                type: 'warning',
                title: 'Bundled Script',
                text: 'A script has been found in this save file. Would you like to run it?',
                showCancelButton: true,
                confirmButtonText: 'Run',
                reverseButtons: true
            }).then(r => {
                game.paused = false;
                game.input.keyboard.start();
                if (r.value) {
                    try {
                        let d = swirl.base64(save[1]);
                        eval(d);
                    } catch(err) {
                        errorInScript(err);
                    }
                }
            });
        } else if (save[1]) {
            try {
                let d = swirl.base64(save[1]);
                eval(d);
            } catch(err) {
                errorInScript(err);
            }
        }
    }

    function scriptCheck(obj) {
        if (obj.data && obj.data.script && obj.data.scriptEnabled && (Phaser.Math.distance(obj.x, obj.y, player.x, player.y) <= (5+(obj.width*0.75)+player.offsetX))) {
            obj.data.script(obj);
            obj.data.scriptEnabled = false;
        } else if (obj.data && obj.data.script && !obj.data.scriptEnabled && !(Phaser.Math.distance(obj.x, obj.y, player.x, player.y) <= (5+(obj.width*0.75)+player.offsetX))) {
            obj.data.scriptEnabled = true;
        }

        for (var i = 0; i < swirl.keys.length; i++) {
            let currentKey = swirl.keys[i];
            if (currentKey && (currentKey[1] && currentKey[0].isDown
                || !currentKey[1] && currentKey[0].justDown)) {
                currentKey[2]();
            }
        }
    }
    
    function frictionCheck(spr, noFriction) {
        if (spr.body) {
            if (spr['name'] == 'object') {
                spr.body.velocity.x = 0;
                spr.body.velocity.y = 0;
                spr.body.angularVelocity = 0;
                return;
            }
            if (spr.anchor) {
                spr.anchor.setTo(0.5, 0.5);
            }
            if ((Math.abs(spr.body.x) >= Math.abs((game.world.bounds["width"])+500)) || (Math.abs(spr.body.y) >= (Math.abs(game.world.bounds["height"])+500))) {
                if (spr["name"] == "player") {
                    spr.kill();
                    spr.reset(W/2, H/2);
                    game.camera.reset(W/2, H/2);
                    game.camera.follow(spr);
                    game.camera.deadzone = new Phaser.Rectangle(0, 0, w, h);
                } else {
                    spr.destroy();
                    return;
                }
            }
        }
                            
        if (buildingMode && spr && spr.body) {
            spr.body.velocity.x = 0;
            spr.body.velocity.y = 0;
            if (spr["name"] != "player") {
                spr.body.angularVelocity = 0;
            }
        } else if (spr && spr.body && (friction != 0)) {
            if (!noFriction) {
                if (spr.body.velocity.x > 0) {
                    spr.body.velocity.x -= (friction);
                } else if (spr.body.velocity.x < 0) {
                    spr.body.velocity.x += (friction);
                } else {
                    spr.body.velocity.x = 0;
                }
            }
            if (Math.abs(spr.body.velocity.x) <= 10) {
                spr.body.velocity.x = 0;
            }
            
            if (!noFriction) {
                if (spr.body.velocity.y > 0) {
                    spr.body.velocity.y -= (friction);
                } else if (spr.body.velocity.y < 0) {
                    spr.body.velocity.y += (friction);
                } else {
                    spr.body.velocity.y = 0;
                }
            }
            if (Math.abs(spr.body.velocity.y) <= 10) {
                spr.body.velocity.y = 0;
            }
            
            if (spr["name"] != "player") {
                if (spr.body.angularVelocity > 0) {
                    spr.body.angularVelocity -= 0.01;
                } else if (spr.body.angularVelocity < 0) {
                    spr.body.angularVelocity += 0.01;
                } else {
                    spr.body.angularVelocity = 0;
                }
            }
            
            if (spr["name"] == "hole") {
                if (spr.body.x >= (game.world.bounds["width"]-(spr.width/2)-25)) {
                    spr.body.velocity.x = -45;
                }
                if (spr.body.y >= (game.world.bounds["height"]-(spr.height/2)-25)) {
                    spr.body.velocity.y = -45;
                }
                if ((spr.body.x <= (game.world.bounds["x"]+(spr.width/2)+25))) {
                    spr.body.velocity.x = 45;
                }
                if (spr.body.y <= (game.world.bounds["y"]+(spr.height/2)+25)) {
                    spr.body.velocity.y = 45;
                }	
            }
        }
    }

    function refreshText() {
        textGroup.removeAll(true);
        if (!mobile) {
            game.add.text(5, 5, "WASD or arrow keys: moves the tiny square", defaultFont, textGroup).sendToBack();
            game.add.text(5, 25, "IJKL: increases momentum in the four cardinal directions", defaultFont, textGroup).sendToBack();
            game.add.text(5, 45, "Q: summons a box", defaultFont, textGroup).sendToBack();
            game.add.text(5, 65, "E: summons a ball", defaultFont, textGroup).sendToBack();
            game.add.text(5, 85, "DEL: undo the previous action", defaultFont, textGroup).sendToBack();
            game.add.text(5, 105, "R: resets the canvas", defaultFont, textGroup).sendToBack();
            
            game.add.text(5, 135, "C: summons a cat", defaultFont, textGroup).sendToBack();
            game.add.text(5, 155, "X: summons a black hole", defaultFont, textGroup).sendToBack();
            game.add.text(5, 175, "Z: summons an immovable object", defaultFont, textGroup).sendToBack();
            game.add.text(5, 195, "P: remove world borders", defaultFont, textGroup).sendToBack();
            game.add.text(5, 215, "F: increases friction", defaultFont, textGroup).sendToBack();
            game.add.text(5, 235, "G: decreases friction", defaultFont, textGroup).sendToBack();
            game.add.text(5, 255, "T: toggle building mode", defaultFont, textGroup).sendToBack();
            game.add.text(5, 275, "V: lock objects to grid upon summon", defaultFont, textGroup).sendToBack();
            if (!isClient) {
                game.add.text(5, 295, "U: save current game state", defaultFont, textGroup).sendToBack();
                game.add.text(5, 315, "H: move the tiny square a little bit to make it unstuck", defaultFont, textGroup).sendToBack();
                game.add.text(5, 335, "Y: reset the tiny square", defaultFont, textGroup).sendToBack();
            } else {
                game.add.text(5, 295, "H: move the tiny square a little bit to make it unstuck", defaultFont, textGroup).sendToBack();
                game.add.text(5, 315, "Y: reset the tiny square", defaultFont, textGroup).sendToBack();
                game.add.text(5, 345, "U: save current game state", defaultFont, textGroup).sendToBack();
                game.add.text(5, 365, "M: load save data", defaultFont, textGroup).sendToBack();
                game.add.text(5, 385, "F12: toggle fullscreen mode", defaultFont, textGroup).sendToBack();
            }
        } else {
            defaultFont = {font: "25px Consolas", fill: "#fff"};
            game.add.text(10, 5, "swiping in any direction: moves the tiny square", defaultFont, textGroup).sendToBack();
            game.add.text(10, 35, "hold for four seconds: resets character", defaultFont, textGroup).sendToBack();
            game.add.text(10, 65, "two fingers: save game", defaultFont, textGroup).sendToBack();
            game.add.text(10, 115, "this mode is mostly intended for viewing creations others have made", defaultFont, textGroup).sendToBack();
            game.add.text(10, 145, "please open this link on a computer to edit", defaultFont, textGroup).sendToBack();
            game.world.setBounds(0, 0, Infinity, Infinity);
            player.body.x = 50;
            player.body.y = 250;
        }
    }

    function errorInScript(err) {
        game.paused = true;
        game.input.keyboard.stop();
        swal({
            title: 'Error in Script',
            html: '<textarea readonly=true rows="3" cols="40">' + err + '</textarea>',
            type: 'error'
        }).then(() => {
            game.paused = false;
            game.input.keyboard.start();
        });
    }

    function openDeveloperTools() {
        if (isClient) {
            return thisWindow.webContents.openDevTools();
        }
        return false;
    }
    function openDebugTools() { return openDeveloperTools() };
    
    function replaceAll(target, search, replacement) {
        return target.replace(new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), 'g'), replacement);
    }
    
    // the key used to decode and encode save data
    // the first one specified in each array is the one to replace, and the second one is the one to replace it with
    // numbers are left unchanged when decoding and encoding
    let saveLibrary = [
        // shortens the keys for each of the sections
        ['"o":', 'o'], // (o)bstacles
        ['"c":', 'c'], // (c)ircles
        ['"b":', 'b'], // (b)lack holes
        ['"d":', 'd'], // cats, c was taken so next letter (d)
        ['"i":', 'i'], // (i)mmovable objects
        ['"p":', 'p'], // (p)layer
        ['"g":', 'g'], // (g)eneral
        ['"f":', 'f'], // (f)lag (1 if generated in swirl client, 0 if not)
        
        // shortens some of the structure
        ['],[', 'J'], // inter(J)ection
        ['[[', 'E'], // opening doubl(E) bracket
        [']]', 'U'], // closing do(U)ble bracket
        ['[]', 'N'], // (N)one (no contents for this section of the JSON)
        [']}', 'R'], // (R)ight close
        ['{[', 'L'], // (L)eft close
        ['0,0', 'Z'], // two (Z)eros
        
        // just characters switched around to make sure the URL is valid
        ['[', 'B'], // opening (B)racket
        [']', 'C'], // (C)losing bracket
        ['{', 'Y'], // opening curl(Y) bracket
        ['}', 'T'], // closing curly bracke(T)
        ['"', 'Q'], // (Q)uote
        [',', 'M'], // co(M)ma
        [':', 'O'], // c(O)lon
        ['-', 'P'], // o(P)posite
        ['.', 'D'], // (D)ecimal
    ]

    function preload() {
        console.log("%cTry pressing the tilde key!", "font-size: 14pt");
        game.load.image('player', 'assets/images/player.png');
        game.load.image('box', 'assets/images/box.png');
        game.load.image('circle', 'assets/images/circle.png');
        game.load.image('cat', 'assets/images/cat.png');
        game.load.image('blackhole', 'assets/images/blackhole.png');
        game.load.image('immovable', 'assets/images/immovable.png');
        
        game.load.audio('mii', 'assets/audio/music/mii.mp3');
        game.load.audio('die', 'assets/audio/die.mp3');
        game.load.audio('game', 'assets/audio/game.mp3');
        game.load.audio('glass', 'assets/audio/glass.mp3');
        textGroup = game.add.group();
    }

    function render() {
        game.renderer.renderSession.roundPixels = true;
        if (countdown.running) {
            timerText.setText(swirl.formatTime(Math.round((countdownEvent.delay - countdown.ms) / 1000)));
        } else if (timerText) {
            timerText.setText('Victory!');
            tipText.destroy();
            isChasing = false;
            hasWon = true;
            textGroup.visible = true;
            swirl.onAll(function(element) {
                if (element.name == 'dangerous' && element.body) {
                    element.body.velocity.x = -1000;
                    element.body.velocity.y = 0;
                    element.body.kinematic = true;
                }
            });
        }
    }
    
    function create() {
        document.addEventListener('dragover', function(e){
            e.stopPropagation();
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
        });

        document.addEventListener('drop', function(e){
            e.stopPropagation();
            e.preventDefault();
            
            let files = e.dataTransfer.files;
            if (files && files[0] && files[0].name) {
                var reader = new FileReader();
                reader.onload = function(e2) {
                    let thisData = e2.target.result;
                    let fileExtension = files[0].name.split('.').pop();
                    if (fileExtension === 'swirl') {
                        clientLoadSave(thisData);
                    } else {
                        try {
                            eval(thisData);
                        } catch(err) {
                            errorInScript(err);
                        }
                    }
                }
                reader.readAsText(files[0]);
            }

            if (e.dataTransfer.items) {
                e.dataTransfer.items.clear();
            } else {
                e.dataTransfer.clearData();
            }
        });

        window.addEventListener('resize', function(){ // handle resizing
            W = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            H = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
            game.width = W;
            game.height = H;
            game.camera.setSize(W, H);
            if (game.world.bounds.width !== Infinity) {
                game.world.setBounds(0, 0, W, H);
            }

            if (game.renderType === 1) {
                game.renderer.resize(W, H);
            }
        });

        /*      					
        game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        game.scale.parentIsWindow = true;
        */

        countdown = game.time.create();
        countdownEvent = countdown.add(Phaser.Timer.MINUTE * 2.5, function(){countdown.stop()}, this);
        graphics = game.add.graphics(0, 0);
        graphics.lineStyle(3, 0x00FF00, 1);

        mobile = !(game.device.desktop);
        if ((currentURL.searchParams.get("mobile")) !== null) {
            mobile = true;
        } else if ((currentURL.searchParams.get("desktop")) !== null) {
            mobile = false;
        }
        
        dieAudio = game.add.audio('die');
        this.swipe = new Swipe(this.game);
        
        game.world.setBounds(0, 0, W, H);					
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.stage.backgroundColor = '#404040';
                            
        player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
        player.name = 'player';
        game.physics.p2.enable(player);
        
        game.physics.p2.restitution = 1.5;

        if (isClient) {
            keylist = game.input.keyboard.addKeys({'undo': Phaser.KeyCode.DELETE, 'vacuum': Phaser.KeyCode.ONE, 'gridlock': Phaser.KeyCode.V, 'object': Phaser.KeyCode.Z, 'hole': Phaser.KeyCode.X, 'preset': Phaser.KeyCode.Y, 'unstuck': Phaser.KeyCode.H, 'toggle': Phaser.KeyCode.T, 'save': Phaser.KeyCode.U, 'easter': Phaser.KeyCode.C, 'expand': Phaser.KeyCode.P, 'friction': Phaser.KeyCode.F, 'friction2': Phaser.KeyCode.G, 'run': Phaser.KeyCode.TILDE, 'move': Phaser.KeyCode.Q, 'move2': Phaser.KeyCode.E, 'reset': Phaser.KeyCode.R, 'speed1': Phaser.KeyCode.I, 'speed2': Phaser.KeyCode.J, 'speed3': Phaser.KeyCode.K, 'speed4': Phaser.KeyCode.L, 'up': Phaser.KeyCode.W, 'down': Phaser.KeyCode.S, 'left': Phaser.KeyCode.A, 'right': Phaser.KeyCode.D, 'up2': Phaser.KeyCode.UP, 'down2': Phaser.KeyCode.DOWN, 'left2': Phaser.KeyCode.LEFT, 'right2': Phaser.KeyCode.RIGHT, 'fullscreen': Phaser.KeyCode.F12, 'refreshPage': Phaser.KeyCode.F5, 'loadSave': Phaser.KeyCode.M});
        } else {
            keylist = game.input.keyboard.addKeys({'undo': Phaser.KeyCode.DELETE, 'vacuum': Phaser.KeyCode.ONE, 'gridlock': Phaser.KeyCode.V, 'object': Phaser.KeyCode.Z, 'hole': Phaser.KeyCode.X, 'preset': Phaser.KeyCode.Y, 'unstuck': Phaser.KeyCode.H, 'toggle': Phaser.KeyCode.T, 'save': Phaser.KeyCode.U, 'easter': Phaser.KeyCode.C, 'expand': Phaser.KeyCode.P, 'friction': Phaser.KeyCode.F, 'friction2': Phaser.KeyCode.G, 'run': Phaser.KeyCode.TILDE, 'move': Phaser.KeyCode.Q, 'move2': Phaser.KeyCode.E, 'reset': Phaser.KeyCode.R, 'speed1': Phaser.KeyCode.I, 'speed2': Phaser.KeyCode.J, 'speed3': Phaser.KeyCode.K, 'speed4': Phaser.KeyCode.L, 'up': Phaser.KeyCode.W, 'down': Phaser.KeyCode.S, 'left': Phaser.KeyCode.A, 'right': Phaser.KeyCode.D, 'up2': Phaser.KeyCode.UP, 'down2': Phaser.KeyCode.DOWN, 'left2': Phaser.KeyCode.LEFT, 'right2': Phaser.KeyCode.RIGHT});
        }

        game.camera.follow(player);
        game.camera.deadzone = new Phaser.Rectangle(0, 0, W, H);
        
        cheet('↑ ↑ ↓ ↓ ← → ← → b a', konamiCode);
        cheet('d i e', function() {
            dieSound = !dieSound;
            dieAudio.play('', 0, 1);
        });
        cheet('w i i', function() {
            swirl.setTrack('mii');
        });
        cheet(', .', function() {
            if (isChasing || hasWon) {
                return;
            }
            game.world.setBounds(0, 0, W, H);
            isChasing = true;
            buildingMode = false;
            dieSound = false;
            friction = 4;
            if (music) {
                music.stop();
            }
            if (!disableTransform) {
                swirl.onAll(function(sprite) { // make all pre-existing sprites dangerous
                    if (sprite.name != 'hole' && sprite.name != 'player' && sprite.body) {
                        sprite.tint = 0xFF0000;
                        sprite.name = 'dangerous';
                        sprite.body.dynamic = true;
                        game.physics.p2.enable(sprite);
                    }
                });
            }
            lives = 5;
            tipText = game.add.text(5, 5, "Tip: Black holes will fight off enemies.", defaultFont);
            livesText = game.add.text(5, H-30, "5 lives remaining", {font: "20px Consolas", fill: "#fff"});
            timerText = game.add.text(5, H-60, "2:30", {font: "20px Consolas", fill: "#fff"});
            countdown.start();
            textGroup.visible = false;
            game.add.audio('glass').play('', 0, 0.75);
        });
        
        game.camera.follow(player);
        game.camera.deadzone = new Phaser.Rectangle(0, 0, W, H);

        refreshText();

        if (isClient) {
            if (electron.remote.process.argv[1] && isValid(electron.remote.process.argv[1]) && !fs.lstatSync(electron.remote.process.argv[1]).isDirectory()) {
                let thisData = fs.readFileSync(electron.remote.process.argv[1], 'utf-8');
                let fileExtension = electron.remote.process.argv[1].split('.').pop();
                if (fileExtension === 'swirl') {
                    clientLoadSave(thisData);
                } else {
                    try {
                        eval(thisData);
                    } catch(err) {
                        errorInScript(err);
                    }
                }
            }
        } else {
            let result, didErr = false;
            let save = currentURL.searchParams.get("load");
            let script = currentURL.searchParams.get("script");
            if (save) {
                try {
                    result = JSON.parse(swirl.decode(save));
                } catch(err) {
                    didErr = true;
                }

                if (!didErr && result) {
                    swirl.load(result);
                } else {
                    game.paused = true;
                    game.input.keyboard.stop();
                    swal({
                        type: 'error',
                        title: 'Corrupted Save',
                        text: 'The save file you have attempted to load is corrupted or invalid.'
                    }).then(() => {
                        game.paused = false;
                        game.input.keyboard.start();
                    });
                }
            }
            if (script) {
                try {
                    eval(swirl.base64(script));
                } catch(err) {
                    errorInScript(err);
                }
            }
        }
    }

    function update() {
        if (holes.length > 0) {
            game.world.forEachAlive(moveToHole, this);
        }
        
        if (player.body == null) {
            player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
            player.name = 'player';
            game.physics.p2.enable(player);
            game.physics.p2.restitution = 1.5;
            player.kill();
        }
        
        player.body.angularVelocity = 8;
        game.world.forEachExists(frictionCheck, this);
        game.world.forEachExists(scriptCheck, this);

        if (isChasing) {
            game.world.forEachExists(moveTowards, this, player, 25, true);
            game.world.forEachExists(isChasingLoop, this);
            swirl.onAll('hole', function(hole) {
                if (actions.length >= 0 && hole.visible && hole.exists) {
                    let randomAction = actions[game.rnd.integerInRange(0, actions.length-1)];
                    if (randomAction.body && (Phaser.Math.distance(randomAction.x, randomAction.y, hole.x, hole.y) <= 300) && !lines[randomAction] && randomAction.exists && randomAction.name != 'player' && randomAction.name != 'hole' && game.rnd.integerInRange(1, 20) == 1) {
                        graphics = game.add.graphics(0, 0);
                        graphics.lineStyle(3, 0xFFFF00, 1);
                        graphics.moveTo(hole.x, hole.y);
                        lines[randomAction] = graphics.lineTo(randomAction.x, randomAction.y);
                        graphics.endFill();

                        randomAction.name = 'safe';
                        randomAction.body.kinematic = true;
                        randomAction.body.velocity.x = 0;
                        randomAction.body.velocity.y = 0;
                        randomAction.body.angularVelocity = 10;
                        setTimeout(function() {
                            if (lines[randomAction]) {
                                lines[randomAction].destroy();
                                delete lines[randomAction];
                            }
                            randomAction.destroy();
                            if (game.rnd.integerInRange(1, 5) == 1) {
                                hole.destroy();
                            }
                        }, 2000);
                    }
                }
            });
            let spawnrate = 120;
            if (countdown.seconds >= 140) {
                spawnrate = 1;
            } else if (countdown.seconds >= 120) {
                spawnrate = 20;
            } else if (countdown.seconds >= 90) {
                spawnrate = 40;
            } else if (countdown.seconds >= 60) {
                spawnrate = 60;
            } else if (countdown.seconds >= 30) {
                spawnrate = 80;
            } else if (countdown.seconds >= 10) {
                spawnrate = 100;
            }
            if (game.rnd.integerInRange(1, spawnrate) == 1) {
                let newX = game.world.randomX;
                let newY = game.world.randomY;
                if ((Phaser.Math.distance(newX, newY, player.x, player.y) >= 300)) {
                    swirl.create('random', newX, newY, false, true);
                    lastAction.tint = 0xFF0000;
                    lastAction.name = 'dangerous';
                    lastAction.body.dynamic = true;
                    game.physics.p2.enable(lastAction);
                }
            }
        }
        
        if (game.input.pointer1.duration >= 4000 && (game.input.pointer2.isUp)) {
            player.body.x = 50;
            player.body.y = 250;
            player.body.velocity.x = 0;
            player.body.velocity.y = 0;
        }

        if (mobile) {
            buildingMode = false;
            var direction = this.swipe.check();
            if (direction !== null) {
                switch(direction.direction) {
                    case this.swipe.DIRECTION_LEFT:
                        player.body.moveLeft(((buildingMode)?250:450));
                        break;
                    case this.swipe.DIRECTION_RIGHT:
                        player.body.moveRight(((buildingMode)?250:450));
                        break;
                    case this.swipe.DIRECTION_UP:
                        player.body.moveUp(((buildingMode)?250:450));
                        break;
                    case this.swipe.DIRECTION_DOWN:
                        player.body.moveDown(((buildingMode)?250:450));
                        break;
                    case this.swipe.DIRECTION_UP_LEFT:
                        player.body.moveUp(((buildingMode)?250:450));
                        player.body.moveLeft(((buildingMode)?250:450));
                        break;
                    case this.swipe.DIRECTION_UP_RIGHT:
                        player.body.moveUp(((buildingMode)?250:450));
                        player.body.moveRight(((buildingMode)?250:450));
                        break;
                    case this.swipe.DIRECTION_DOWN_LEFT:
                        player.body.moveDown(((buildingMode)?250:450));
                        player.body.moveLeft(((buildingMode)?250:450));
                        break;
                    case this.swipe.DIRECTION_DOWN_RIGHT:
                        player.body.moveDown(((buildingMode)?250:450));
                        player.body.moveRight(((buildingMode)?250:450));
                        break;
                }
            }
        }
                
        if (keylist.up.isDown || keylist.up2.isDown) {
            player.body.moveUp(((buildingMode)?250:350));
        } else if (keylist.down.isDown || keylist.down2.isDown) {
            player.body.moveDown(((buildingMode)?250:350));
        }
    
        if (keylist.left.isDown || keylist.left2.isDown) {
            player.body.moveLeft(((buildingMode)?250:350));
        } else if (keylist.right.isDown || keylist.right2.isDown) {
            player.body.moveRight(((buildingMode)?250:350));
        }

        if (keylist.undo.justDown && !isChasing) {
            if (actions.length > 0) {
                actions[actions.length-1].destroy();
                actions.splice(-1,1);
            }
        }
        
        if (keylist.easter.justDown && !(keylist.easter.ctrlKey)) {
            swirl.create('cat', player.x, player.y, gridLock);
        } else if (keylist.object.justDown && !(keylist.object.ctrlKey)) {
            swirl.create('immovable object', player.x, player.y, gridLock);
        } else if (keylist.vacuum.isDown) {
            game.world.forEachExists(moveTowards, this, player, 25);
        } else if (keylist.expand.justDown && !(keylist.expand.ctrlKey) && !isChasing) {
            game.world.setBounds(-Infinity, -Infinity, Infinity, Infinity);
        } else if (keylist.friction.isDown && !isChasing) {
            friction++;
        } else if (keylist.friction2.isDown && !isChasing) {
            friction--;
        } else if (keylist.toggle.justDown && !isChasing) {
            buildingMode = !(buildingMode);
        } else if (keylist.gridlock.justDown && !(keylist.gridlock.ctrlKey)) {
            gridLock = !gridLock;
            player.tint = gridLock?'0xADD8E6':'0xFFFFFF';
        } else if ((keylist.save.justDown) || (game.input.pointer1.justPressed() && game.input.pointer2.justPressed())) {
            var b64data = swirl.encode(JSON.stringify(swirl.save()));
            if (isClient) {
                dialog.showSaveDialog({"filters": [{"name": "Swirl Data File", "extensions": ["swirl"]}]}, function(savePath) {
                    if (savePath) {
                        fs.writeFileSync(savePath, b64data, 'utf-8');
                    }
                });
            } else {
                var prefix = "https://atenfyr.github.io/swirl/?load="
                game.input.keyboard.stop();
                swal({
                    type: 'success',
                    title: 'Saved',
                    html: 'Copy and paste this link.<br><textarea readonly=true rows="3" cols="40">' + prefix + b64data + '</textarea>'
                }).then(() => {
                    game.paused = false;
                    game.input.keyboard.start();
                });
            }
        }

        if (isClient) {
            if (keylist.fullscreen.justDown) {
                thisWindow.setFullScreen(!(thisWindow.isFullScreen()));
                thisWindow.reload();
            } else if (keylist.refreshPage.justDown) {
                thisWindow.reload();
            } else if (keylist.loadSave.justDown) {
                dialog.showOpenDialog({"properties": ["openFile"], "filters": [{"name": "Swirl Data File", "extensions": ["swirl"]},{"name":"JavaScript", "extensions":["js"]}]}, function(loadPath) {
                    if (loadPath && loadPath.length != 0 && isValid(loadPath[0]) && !fs.lstatSync(loadPath[0]).isDirectory()) {
                        let thisData = fs.readFileSync(loadPath[0], 'utf-8');
                        let fileExtension = loadPath[0].split('.').pop();
                        if (fileExtension === 'swirl') {
                            clientLoadSave(thisData);
                        } else {
                            try {
                                eval(thisData);
                            } catch(err) {
                                errorInScript(err);
                            }
                        }
                    }
                });
            }
        }
        
        if (keylist.move.justDown && player.alive) {
            swirl.create('box', player.x, player.y, gridLock);
        } else if (keylist.unstuck.isDown && !isChasing) {
            player.body.x -= 10;
            player.body.y -= 10;
        }
        
        if ((keylist.hole.justDown && player.alive) || (cheatMode && isChasing && keylist.hole.isDown && player.alive)) {
            swirl.create('black hole', player.x, player.y, gridLock);
        } else if (keylist.move2.justDown && player.alive) {
            swirl.create('ball', player.x, player.y, gridLock);
        } else if (keylist.speed1.isDown) {
            player.body.velocity.y -= 20;
        } else if (keylist.speed2.isDown) {
            player.body.velocity.x -= 20;
        } else if (keylist.speed3.isDown) {
            player.body.velocity.y += 20;
        } else if (keylist.speed4.isDown) {
            player.body.velocity.x += 20;
        } else if (keylist.reset.isDown && !isChasing) {
            swirl.resetCanvas();
        } else if (keylist.preset.isDown && !isChasing) {
            swirl.resetPlayer();
        }
        
        if (keylist.run.justDown) {
            game.paused = true;
            game.input.keyboard.stop();
            swal({
                title: "hacking skills",
                html: "don't put anything here if you don't know what you're doing",
                input: "text",
                showCancelButton: true,
                confirmButtonText: 'hack',
                cancelButtonText: 'cancel'
            }).then(input => {
                if (input["value"]) {
                    let resp, mode = "success";
                    if (input["value"].charAt(input["value"].length-1) == ";") {
                        input["value"] = input["value"].slice(0, -1);
                    }
                    try {
                        resp = eval(input["value"]);
                    } catch(err) {
                        mode = "error";
                        resp = err;
                    }
                    swal({
                        title: (mode === "success")?"you did a good hack":"you did a bad hack",
                        html: '<textarea readonly=true rows="3" cols="40">' + resp + '</textarea>',
                        type: mode
                    }).then(() => {
                        game.paused = false;
                        game.input.keyboard.start();
                    });
                } else {
                    game.paused = false;
                    game.input.keyboard.start();
                }
            });
        }
        
        if (player.body.velocity.x >= 12000) {
            player.body.velocity.x -= 5000;
        }
        if (player.body.velocity.y >= 12000) {
            player.body.velocity.y -= 5000;
        }
    }
});