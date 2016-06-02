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
        Initialize.create(settings);

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
    title() {
        //return PlayerManager.create().title();
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
        //return PlayerManager.create().play(song);
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