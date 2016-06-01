import BaseController from '../../base/base_controller';
import Config from '../../core/config';
import DOM from '../../utils/dom';
import {PROVIDERS_LIST} from '../../constants/providers';

import YoutubeProvider from './providers/youtube/youtube_provider';
import YoutubeModel from './providers/youtube/youtube_model';

import VimeoProvider from './providers/vimeo/vimeo_provider';
import VimeoModel from './providers/vimeo/vimeo_model';

import SoundCloudProvider from './providers/soundcloud/soundcloud_provider';
import SoundCloudModel from './providers/soundcloud/soundcloud_model';


/**
 *
 */
class PlayerController extends BaseController {
    static CLASS = 'PlayerController';
    static selectorClass = '.smp_player';

    _Provider = null;
    songModel = null;


    init(songModel) {
        this._Provider = this.getProvider(songModel);
        this.render();
    }


    play() {
        this.logger.info('PLAY CALLED');
        this._Provider.play();
    }


    /**
     *
     */
    render() {
        this.logger.info('RENDER CALLED');
    }


    getProvider(songModel) {
        let provider = null;

        switch (songModel.CLASS) {
            case YoutubeProvider.CLASS:
                provider = YoutubeProvider.create(songModel);
                break;

            case VimeoProvider.CLASS:
                provider = VimeoProvider.create(songModel);
                break;

            case SoundCloudProvider.CLASS:
                provider = SoundCloudProvider.create(songModel);
                break;

            default:
                break;
        }

        return provider;
    }
}

export default PlayerController;