import API from './core/api';

require('./smp.scss');

/**
 * Setups SocialPlayer and binds Core to the actual DOM window.
 * NOTE: This code is self-executing. This is necessary in order to correctly
 * determine the ready status.
 */
window.SocialMusicPlayer = window.SocialMusicPlayer || new API();

/**
 * Load SMP ready method after async loading is completed.
 *
 * Usually will call up initialize which can begin working with the DOM.
 */
window.SMPAsyncInit();