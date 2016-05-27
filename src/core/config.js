import Event from '../utils/event';
import Initialize from './initialize';
import BaseSingleton from '../base/base_singleton';
import {SYSTEM_EVENTS} from '../events/events';
import _ from '../utils/__';

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
        _.merge(this, this.CONFIG_DEFAULTS, settings, {width: 1});
        this.logger.debug('Config create fired');
        
        window.og = this;
    }

    
    
    
}

export default Config;