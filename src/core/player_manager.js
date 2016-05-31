import Config from './config';
import _Logger from '../utils/logger';
import {SYSTEM_EVENTS} from '../constants/events';
import {PROVIDERS_LIST} from '../constants/providers';
import BaseSingleton from '../base/base_singleton';
import Event from '../utils/event';
import DOM from '../utils/dom';

import YoutubeModel from '../components/player/providers/youtube/youtube_model';
import VimeoModel from '../components/player/providers/vimeo/vimeo_model';
import SoundCloudModel from '../components/player/providers/soundcloud/soundcloud_model';


/**
 *
 */
class PlayerManager extends BaseSingleton {
    static CLASS = 'PlayerManager';

    _playerComponent = null;


    /**
     *
     */
    init() {
        this.subscribe();
    }


    subscribe() {

    }


    play(song) {
        let songModel = this.songJSONToModel(song);
        console.log(songModel);
    }


    songJSONToModel(song) {
        let model = null;

        switch (song.provider) {
            case PROVIDERS_LIST.YOUTUBE:
                model = YoutubeModel.create(song);
                break;

            case PROVIDERS_LIST.VIMEO:
                model = VimeoModel.create(song);
                break;

            case PROVIDERS_LIST.SOUNDCLOUD:
                model = SoundCloudModel.create(song);
                break;

            default:
                break;
        }

        return model;
    }


}

export default PlayerManager;