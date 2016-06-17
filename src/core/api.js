import Event from 'event-emitter-js';
import Initialize from './initialize';
import BaseObject from '../base/base_object';
import {SYSTEM_EVENTS} from '../constants/events';
import _ from '../utils/__';


/**
 *
 */
class API extends BaseObject {
    static CLASS = 'API';

    EVENT = SYSTEM_EVENTS;
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


    /********************** GETTERS **********************/


    /**
     *
     */
    isPlaying() {
        return this.INITIALIZE.PROVIDER.isPlaying();
    }


    /**
     *
     */
    getCurrentSecond() {
        return this.INITIALIZE.PROVIDER.getCurrentSecond();
    }


    /**
     *
     */
    getDuration() {
        return this.INITIALIZE.PROVIDER.getDuration();
    }


    /**
     *
     */
    getURL() {
        return this.INITIALIZE.PROVIDER.getURL();
    }


    /**
     *
     */
    getVideoWidth() {
        return this.INITIALIZE.PROVIDER.getVideoWidth();
    }


    /**
     *
     */
    getVideoHeight() {
        return this.INITIALIZE.PROVIDER.getVideoHeight();
    }


    /**
     *
     */
    getVersion() {
        return '1.0'; // fix it?
    }


    /********************** MODIFIERS **********************/


    /**
     *
     */
    play(song) {
        // no new song set.. just play the current one.
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
        Event.fire(SYSTEM_EVENTS.SEEK_TO_SECOND, second);

        return this;
    }


    /**
     *
     */
    setVolume(volume) {
        Event.fire(SYSTEM_EVENTS.VOLUME, volume);

        return this;
    }


    /**
     *
     */
    mute() {
        Event.fire(SYSTEM_EVENTS.MUTE);

        return this;
    }


    /**
     *
     */
    unmute() {
        Event.fire(SYSTEM_EVENTS.UNMUTE);

        return this;
    }


    /**
     *
     */
    on(event, callback) {
        Event.on(event, callback);

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