## Objects

<dl>
<dt><a href="#swirl">swirl</a> : <code>object</code></dt>
<dd><p>Swirl API for scripts.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#SavedSprite">SavedSprite</a> : <code>Array</code></dt>
<dd></dd>
<dt><a href="#SavedSpriteExtended">SavedSpriteExtended</a> : <code>Array</code></dt>
<dd></dd>
<dt><a href="#SavedSpriteWithScale">SavedSpriteWithScale</a> : <code>Array</code></dt>
<dd></dd>
<dt><a href="#WorldDataArray">WorldDataArray</a> : <code>Array</code></dt>
<dd></dd>
<dt><a href="#Save">Save</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#CustomKey">CustomKey</a> : <code>Array</code></dt>
<dd></dd>
</dl>

<a name="swirl"></a>

## swirl : <code>object</code>
Swirl API for scripts.

**Kind**: global namespace  

* [swirl](#swirl) : <code>object</code>
    * [.keys](#swirl.keys) : [<code>Array.&lt;CustomKey&gt;</code>](#CustomKey)
    * [.getDisplaySize()](#swirl.getDisplaySize) ⇒ <code>number</code> \| <code>number</code>
    * [.getBounds()](#swirl.getBounds) ⇒ <code>number</code> \| <code>number</code>
    * [.getTracks()](#swirl.getTracks) ⇒ <code>Array</code>
    * [.setTrack([key])](#swirl.setTrack)
    * [.stopMusic()](#swirl.stopMusic)
    * [.moveTowards(obj1, obj2, speed)](#swirl.moveTowards) ⇒ <code>boolean</code>
    * [.encode(text)](#swirl.encode) ⇒ <code>string</code>
    * [.decode(text)](#swirl.decode) ⇒ <code>string</code>
    * [.base64(text)](#swirl.base64) ⇒ <code>string</code>
    * [.save()](#swirl.save) ⇒ [<code>Save</code>](#Save)
    * [.load(saveData)](#swirl.load)
    * [.onAll(selector, [func])](#swirl.onAll)
    * [.resetCanvas()](#swirl.resetCanvas)
    * [.resetPlayer(randomly)](#swirl.resetPlayer)
    * [.create(type, [atx], [aty], [lockOntoGrid], [dontAssociate], [vx], [vy])](#swirl.create) ⇒ <code>Phaser.Sprite</code>
    * [.tieScript(sprite, script)](#swirl.tieScript)
    * [.untieScript(sprite)](#swirl.untieScript)
    * [.getScript(sprite)](#swirl.getScript) ⇒ <code>tiedScript</code>
    * [.registerKey(key, allowHolding, cb)](#swirl.registerKey)
    * [.unbindKey(key)](#swirl.unbindKey)
    * [.formatTime(s)](#swirl.formatTime)
    * [.tiedScript](#swirl.tiedScript) : <code>function</code>

<a name="swirl.keys"></a>

### swirl.keys : [<code>Array.&lt;CustomKey&gt;</code>](#CustomKey)
An array of bound keys created by [registerKey](registerKey).

**Kind**: static property of [<code>swirl</code>](#swirl)  
<a name="swirl.getDisplaySize"></a>

### swirl.getDisplaySize() ⇒ <code>number</code> \| <code>number</code>
Returns the size of the screen.

**Kind**: static method of [<code>swirl</code>](#swirl)  
**Returns**: <code>number</code> - The width of the screen.<code>number</code> - The height of the screen.  
<a name="swirl.getBounds"></a>

### swirl.getBounds() ⇒ <code>number</code> \| <code>number</code>
Returns the bounds of the map.

**Kind**: static method of [<code>swirl</code>](#swirl)  
**Returns**: <code>number</code> - The width of the bounding box.<code>number</code> - The height of the bounding box.  
<a name="swirl.getTracks"></a>

### swirl.getTracks() ⇒ <code>Array</code>
Returns an array of valid tracks which can be passed to [setTrack](#swirl.setTrack).

**Kind**: static method of [<code>swirl</code>](#swirl)  
**Returns**: <code>Array</code> - Valid tracks.  
<a name="swirl.setTrack"></a>

### swirl.setTrack([key])
Switches the track to another song. See [getTracks](#swirl.getTracks) for a list of valid songs.

**Kind**: static method of [<code>swirl</code>](#swirl)  

| Param | Type | Description |
| --- | --- | --- |
| [key] | <code>string</code> | The song to switch to. If unspecified, calls [stopMusic](#swirl.stopMusic). |

<a name="swirl.stopMusic"></a>

### swirl.stopMusic()
Stops any music that is currently playing, if there is any.

**Kind**: static method of [<code>swirl</code>](#swirl)  
<a name="swirl.moveTowards"></a>

### swirl.moveTowards(obj1, obj2, speed) ⇒ <code>boolean</code>
Moves a sprite towards another sprite.

**Kind**: static method of [<code>swirl</code>](#swirl)  
**Returns**: <code>boolean</code> - - Whether or not the operation succeeded.  

| Param | Type | Description |
| --- | --- | --- |
| obj1 | <code>Phaser.Sprite</code> |  |
| obj2 | <code>Phaser.Sprite</code> |  |
| speed | <code>number</code> | The speed of attraction, where 25 is roughly the speed at which black holes attract sprites. |

<a name="swirl.encode"></a>

### swirl.encode(text) ⇒ <code>string</code>
Encodes a string of text in Swirl's save format.

**Kind**: static method of [<code>swirl</code>](#swirl)  
**Returns**: <code>string</code> - Encoded text.  

| Param | Type |
| --- | --- |
| text | <code>string</code> | 

<a name="swirl.decode"></a>

### swirl.decode(text) ⇒ <code>string</code>
Decodes a string of text in Swirl's save format.

**Kind**: static method of [<code>swirl</code>](#swirl)  
**Returns**: <code>string</code> - Decoded text.  

| Param | Type |
| --- | --- |
| text | <code>string</code> | 

<a name="swirl.base64"></a>

### swirl.base64(text) ⇒ <code>string</code>
Decodes a string of text encoded in the URL-safe variant of Base64 that Swirl uses for storing scripts.

**Kind**: static method of [<code>swirl</code>](#swirl)  
**Returns**: <code>string</code> - Decoded text.  

| Param | Type |
| --- | --- |
| text | <code>string</code> | 

<a name="swirl.save"></a>

### swirl.save() ⇒ [<code>Save</code>](#Save)
Generates a save file.

**Kind**: static method of [<code>swirl</code>](#swirl)  
**Returns**: [<code>Save</code>](#Save) - A save file that represents the world when the function was called.  
<a name="swirl.load"></a>

### swirl.load(saveData)
Loads an object representing a save file.

**Kind**: static method of [<code>swirl</code>](#swirl)  

| Param | Type |
| --- | --- |
| saveData | [<code>Save</code>](#Save) | 

<a name="swirl.onAll"></a>

### swirl.onAll(selector, [func])
Runs a function on a set of sprites in the world.
If the selector is an object, the function will be ran on all sprites in that object.
If the selector is a string, the function will be ran on all sprites of that type.
If the selector is a function, the second parameter will be ignored and the function will be ran on all objects that exist.

**Kind**: static method of [<code>swirl</code>](#swirl)  

| Param | Type |
| --- | --- |
| selector | <code>Object</code> \| <code>function</code> \| <code>string</code> | 
| [func] | <code>function</code> | 

<a name="swirl.resetCanvas"></a>

### swirl.resetCanvas()
Resets the canvas.

**Kind**: static method of [<code>swirl</code>](#swirl)  
<a name="swirl.resetPlayer"></a>

### swirl.resetPlayer(randomly)
Resets the camera and the player.

**Kind**: static method of [<code>swirl</code>](#swirl)  

| Param | Type | Description |
| --- | --- | --- |
| randomly | <code>boolean</code> | Whether or not to place the player at a random spot on the map rather than the center. |

<a name="swirl.create"></a>

### swirl.create(type, [atx], [aty], [lockOntoGrid], [dontAssociate], [vx], [vy]) ⇒ <code>Phaser.Sprite</code>
Creates a brand new sprite.

**Kind**: static method of [<code>swirl</code>](#swirl)  
**Returns**: <code>Phaser.Sprite</code> - - The sprite that was created.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| type | <code>string</code> |  | The type of sprite to spawn. |
| [atx] | <code>number</code> | <code>player.x</code> | The X value of the new sprite. |
| [aty] | <code>number</code> | <code>player.y</code> | The Y value of the new sprite. |
| [lockOntoGrid] | <code>boolean</code> | <code>false</code> | Whether or not to automatically lock this sprite on the grid. |
| [dontAssociate] | <code>boolean</code> | <code>false</code> | Whether or not to avoid including this sprite in the global pool of all of its kind. |
| [vx] | <code>number</code> | <code>0</code> | The horizontal velocity to start the new sprite with. |
| [vy] | <code>number</code> | <code>0</code> | The vertical velocity to start the new sprite with. |

<a name="swirl.tieScript"></a>

### swirl.tieScript(sprite, script)
Ties a callback to a sprite which executes upon impact with the player. Note that only one script may be tied to a sprite at a time.

**Kind**: static method of [<code>swirl</code>](#swirl)  

| Param | Type | Description |
| --- | --- | --- |
| sprite | <code>Phaser.Sprite</code> | The sprite to tie this script to. |
| script | <code>tiedScript</code> | The script to tie to this sprite. |

<a name="swirl.untieScript"></a>

### swirl.untieScript(sprite)
Unties a script tied to a sprite, if there is one.

**Kind**: static method of [<code>swirl</code>](#swirl)  

| Param | Type |
| --- | --- |
| sprite | <code>Phaser.Sprite</code> | 

<a name="swirl.getScript"></a>

### swirl.getScript(sprite) ⇒ <code>tiedScript</code>
Returns the script tied to a sprite, if there is one.

**Kind**: static method of [<code>swirl</code>](#swirl)  

| Param | Type |
| --- | --- |
| sprite | <code>Phaser.Sprite</code> | 

<a name="swirl.registerKey"></a>

### swirl.registerKey(key, allowHolding, cb)
Registers a key. Will unbind any previously existing keys bound to the key specified.

**Kind**: static method of [<code>swirl</code>](#swirl)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> \| <code>number</code> | Either a string defined by Phaser.KeyCode or a JavaScript keycode. |
| allowHolding | <code>boolean</code> | Whether or not the key can be held down. |
| cb | <code>function</code> | A callback with no parameters to be executed whenever the key is pressed. |

<a name="swirl.unbindKey"></a>

### swirl.unbindKey(key)
Unbinds all pre-existing keys bound to the key specified.

**Kind**: static method of [<code>swirl</code>](#swirl)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> \| <code>number</code> | Either a string defined by Phaser.KeyCode or a JavaScript keycode. |

<a name="swirl.formatTime"></a>

### swirl.formatTime(s)
Formats a time specified in seconds to the format MM:SS.

**Kind**: static method of [<code>swirl</code>](#swirl)  

| Param | Type | Description |
| --- | --- | --- |
| s | <code>number</code> | Time in seconds. |

<a name="swirl.tiedScript"></a>

### swirl.tiedScript : <code>function</code>
A callback which is tied to a sprite through [tieScript](#swirl.tieScript).

**Kind**: static typedef of [<code>swirl</code>](#swirl)  

| Type | Description |
| --- | --- |
| <code>Phaser.Sprite</code> | The sprite this callback is tied to. |

<a name="SavedSprite"></a>

## SavedSprite : <code>Array</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>number</code> | The X-value of this sprite. |
| 1 | <code>number</code> | The Y-value of this sprite. |
| 2 | <code>number</code> | The horizontal velocity of this sprite. |
| 3 | <code>number</code> | The vertical velocity of this sprite. |

<a name="SavedSpriteExtended"></a>

## SavedSpriteExtended : <code>Array</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>number</code> | The X-value of this sprite. |
| 1 | <code>number</code> | The Y-value of this sprite. |
| 2 | <code>number</code> | The horizontal velocity of this sprite. |
| 3 | <code>number</code> | The vertical velocity of this sprite. |
| 4 | <code>number</code> | The angle of this sprite. |
| 5 | <code>number</code> | The angular velocity of this sprite. |

<a name="SavedSpriteWithScale"></a>

## SavedSpriteWithScale : <code>Array</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>number</code> | The X-value of this sprite. |
| 1 | <code>number</code> | The Y-value of this sprite. |
| 2 | <code>number</code> | The horizontal scale of this sprite. |
| 3 | <code>number</code> | The vertical scale of this sprite. |

<a name="WorldDataArray"></a>

## WorldDataArray : <code>Array</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>number</code> | The current friction number. |
| 1 | <code>number</code> | The width of the map, or -1 if this is Infinity. |
| 2 | <code>number</code> | The height of the map, or -1 if this is Infinity. |
| 3 | <code>number</code> | Whether or not building mode is on. (0 if not, 1 if so) |
| 4 | <code>number</code> | The physics engine's restitution (the "bounciness"). |
| 5 | <code>number</code> | Whether or not the konami code effect has been activated. (0 if not, 1 if so) |
| 6 | <code>number</code> | The X value of the camera. |
| 7 | <code>number</code> | The Y value of the camera. |
| 8 | <code>number</code> | The number (defined in [getTracks](#swirl.getTracks)) of the track currently playing. |
| 9 | <code>number</code> | Whether or not entering black holes will trigger the "die" sound effect. (0 if not, 1 if so) |
| 10 | <code>number</code> | Whether or not grid locking is enabled. (0 if not, 1 if so) |

<a name="Save"></a>

## Save : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| o | [<code>Array.&lt;SavedSprite&gt;</code>](#SavedSprite) | All the boxes in the world. |
| c | [<code>Array.&lt;SavedSpriteExtended&gt;</code>](#SavedSpriteExtended) | All the balls in the world. |
| d | [<code>Array.&lt;SavedSpriteExtended&gt;</code>](#SavedSpriteExtended) | All the cats in the world. |
| b | [<code>Array.&lt;SavedSpriteWithScale&gt;</code>](#SavedSpriteWithScale) | All the black holes in the world. |
| i | [<code>Array.&lt;SavedSprite&gt;</code>](#SavedSprite) | All the immovable objects in the world. |
| p | [<code>SavedSprite</code>](#SavedSprite) | Data about the player. |
| g | [<code>WorldDataArray</code>](#WorldDataArray) | Data about the world. |
| f | <code>number</code> | Set to 0 if this save was generated in a browser, 1 if it was generated in the desktop app. |

<a name="CustomKey"></a>

## CustomKey : <code>Array</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>Phaser.Key</code> | A key created by Phaser.Keyboard. |
| 1 | <code>boolean</code> | Whether or not the key can be held down. |
| 2 | <code>function</code> | A callback with no parameters to be executed whenever the key is pressed. |