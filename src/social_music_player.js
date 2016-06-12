import API from './core/api';
import {PROVIDERS_LIST} from './constants/providers';

require('./smp.scss');


/**
 * Setups SocialPlayer and binds Core to the actual DOM window.
 * NOTE: This code is self-executing. This is necessary in order to correctly
 * determine the ready status.
 */
window.SocialMusicPlayer = window.SocialMusicPlayer || {
    PROVIDERS: PROVIDERS_LIST,


    /**
     *
     */
    create: settings => {
        console.log('PLAYER CREATE SET');

        return new API().initialize(settings);
    }
};

/**
 * Load SMP ready method after async loading is completed.
 *
 * Usually will call up initialize which can begin working with the DOM.
 */
window.SMPAsyncInit();