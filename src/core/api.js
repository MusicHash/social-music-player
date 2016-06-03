import Event from '../utils/event';
import Initialize from './initialize';
import BaseObject from '../base/base_object';
import {SYSTEM_EVENTS} from '../constants/events';
import {PROVIDERS_LIST} from '../constants/providers';


/**
 *
 */
class API extends BaseObject {
    static CLASS = 'API';


    PROVIDERS = PROVIDERS_LIST;
    INITIALIZE = null;


    /**
     *
     */
    init() {
        this.logger.debug('API constructor fired');
    }


    /**
     *
     */
    initialize(settings) {
        this.INITIALIZE = Initialize.create(settings);

        return this;
    }


    /**
     *
     */
    isPlaying() {
        //return PlayerManager.create().isPlaying();
    }


    /**
     *
     */
    duration() {
        //return PlayerManager.create().duration();
    }


    /**
     *
     */
    getVersion() {
        return '1.0'; // fix it?
    }


    /**
     *
     */
    play(song) {
        this.INITIALIZE.PROVIDER.play(song);

        return this;
    }



    /**
     *
     */
    pause() {
        //return PlayerManager.create().pause();
    }


    /**
     *
     */
    seek(second) {
        //return PlayerManager.create().seek(second);
    }

}

export default API;