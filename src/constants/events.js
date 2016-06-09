/**
 * System event consts, used to notify when interesting things happen in client.
 *
 * @type {Object}
 */
const SYSTEM_EVENTS = {
    PLAYER_INITIALIZED: 'PLAYER_INITIALIZED',
    DO_PLAY: 'DO_PLAY',
    DO_PAUSE: 'DO_PAUSE',
    STATE_CHANGED: 'STATE_CHANGED',
    ON_PROGRESS: 'ON_PROGRESS'
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