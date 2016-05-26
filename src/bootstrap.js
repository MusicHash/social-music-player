import API from './core/api';

/**
 * Setups SocialPlayer and binds Core to the actual DOM window.
 * NOTE: This code is self-executing. This is necessary in order to correctly
 * determine the ready status.
 */
window.SocialMusicPlayer = window.SocialMusicPlayer || new API();