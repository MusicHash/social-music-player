import Event from '../utils/event';
import _Logger from '../utils/logger';
import Initialize from './initialize';
import BaseObject from '../base/base_object';
import {SYSTEM_EVENTS} from '../events/events';


/**
 *
 */
class API extends BaseObject {

    /**
     * 
     */
    constructor() {
        super();
    }


    /**
     * 
     */
    initialize(params) {
        new Initialize(params);

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