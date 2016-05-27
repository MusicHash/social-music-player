import Event from '../utils/event';
import Initialize from './initialize';
import BaseObject from '../base/base_object';
import {SYSTEM_EVENTS} from '../events/events';


/**
 *
 */
class API extends BaseObject {
    static CLASS = 'API';

    /**
     * 
     */
    constructor() {
        super();
        this.logger.debug('API constructor fired');
    }


    /**
     * 
     */
    initialize(params) {
        Initialize.create(params);

        return this;
    }
    
    
    isPlaying() {
        
    }
    
    title() {
        
    }
    
    
    /**
     * 
     */
    duration() {
    }
    
    
    /**
     * 
     */
    getVersion() {
    }
    
    
    /**
     * 
     */
    play() {
    }
    
    
    
    /**
     * 
     */
    pause() {
    }
    
    
    /**
     * 
     */
    seek(seconds) {
    }
    
    
    
}

export default API;