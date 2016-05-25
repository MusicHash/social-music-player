import API from './core/api';

/**
 * Setups CGP and binds Core to the actual DOM window.
 * NOTE: This code is self-executing. This is necessary in order to correctly
 * determine the ready status.
 */
window.CGP = window.CGP || new API();