import Event from 'event-emitter-js';
import Initialize from './initialize';
import BaseObject from '../base/base_object';
import {SYSTEM_EVENTS} from '../constants/events';


/**
 *
 */
class API extends BaseObject {
    static CLASS = 'API';

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
        if ('undefined' === typeof(song)) {
            Event.fire(SYSTEM_EVENTS.PLAY);

            return this;
        }

        this.INITIALIZE.PROVIDER.load(song);

        return this;
    }



    /**
     *
     */
    pause() {
        Event.fire(SYSTEM_EVENTS.PAUSE);

        return this;
    }


    /**
     *
     */
    seek(second) {
        Event.fire(SYSTEM_EVENTS.SEEK_TO, second);

        return this;
    }


    /**
     *
     */
    render() {
        this.INITIALIZE.layoutRender();

        return this;
    }
}

export default API;