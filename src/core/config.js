import Event from '../utils/event';
import Initialize from './initialize';
import BaseSingleton from '../base/base_singleton';
import {SYSTEM_EVENTS} from '../events/events';
let merge = require('deepmerge');

/**
 *
 */
class Config extends BaseSingleton {
    static CLASS = 'Config';
    
    CONFIG_DEFAULTS = {
        el: '#social-music-player',
        
        loop: false,
        volume: 100,
        fadeoutTime: 2, // seconds
        
        fullscreen: true,
        
        width: '640px',
        height: '480px',
        
        logLevel: 'DEBUG'
    };


    /**
     * 
     */
    init(settings) {
        merge(this, this.CONFIG_DEFAULTS, settings);
        this.logger.debug('Config create fired');
        
        console.log(this);
    }

    
    
    
}

export default Config;