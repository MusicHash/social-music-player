/**
 * Const identifying the player's state.
 * 
 * Makes it easier to track the UI when the state is clear.
 */
const PLAYER_STATE = {
    IDLE: Symbol(),
    BUFFERING: Symbol(),
    ENDING: Symbol(),
    PLAYING: Symbol()
};

export {PLAYER_STATE};