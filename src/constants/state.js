/**
 * Const identifying the player's state.
 *
 * Makes it easier to track the UI when the state is clear.
 */
const PLAYER_STATE = {
    PLAYING: Symbol(),
    PAUSED: Symbol(),
    BUFFERING: Symbol(),
    ENDED: Symbol(),
    ENDING: Symbol()
};

export {PLAYER_STATE};