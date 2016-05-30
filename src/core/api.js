import Event from '../utils/event';
import Initialize from './initialize';
import BaseObject from '../base/base_object';
import {SYSTEM_EVENTS} from '../events/events';

import YoutubeModel from '../components/player/providers/youtube/youtube_model';
import VimeoModel from '../components/player/providers/vimeo/vimeo_model';
import SoundCloudModel from '../components/player/providers/soundcloud/soundcloud_model';


/**
 *
 */
class API extends BaseObject {
    static CLASS = 'API';


    YoutubeModel = YoutubeModel;
    VimeoModel = VimeoModel;
    SoundCloudModel = SoundCloudModel;


    /**
     *
     */
    init() {
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