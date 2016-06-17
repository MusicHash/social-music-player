/**
 * System event consts, used to notify when interesting things happen in client.
 *
 * @type {Object}
 */
const SYSTEM_EVENTS = {
    PLAYER_INITIALIZED: 'PLAYER_INITIALIZED',
    PLAY: 'PLAY',
    PAUSE: 'PAUSE',
    VOLUME: 'VOLUME',
    MUTE: 'MUTE',
    UNMUTE: 'UNMUTE',
    SEEK_TO_PERCENT: 'SEEK_TO_PERCENT',
    SEEK_TO_SECOND: 'SEEK_TO_SECOND',
    STATE_CHANGED: 'STATE_CHANGED',
    PLAY_PROGRESS: 'PLAY_PROGRESS',
    NEW_SONG_PLAYING: 'NEW_SONG_PLAYING'
};


/**
 * DOM events mapping for actions.
 *
 * @type {Object}
 */
const DOM_EVENTS = {
    ON_CLICK: 'click',
    ON_MOUSE_UP: 'mouseup',
    ON_MOUSE_DOWN: 'mousedown',
    ON_MOUSE_WHEEL: 'mousewheel',
    ON_TOUCH_MOVE: 'touchmove',
    ON_RESIZE: 'resize',
    ON_ORIENTATION_CHANGE: 'orientationchange'
};


export {SYSTEM_EVENTS, DOM_EVENTS};