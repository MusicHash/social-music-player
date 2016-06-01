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

    songModel = null;


    /**
     *
     */
    init(songModel) {
        this.songModel = songModel;
        this.render();
    }


    /**
     *
     */
    play() {
        this.logger.info('PLAY CALLED');

        try {
            this.getProvider().play();
        } catch(err) {
            this.logger.error(err);
        }
    }


    /**
     *
     */
    render() {
        this.logger.info('RENDER CALLED');
    }


    /**
     *
     */
    getProvider() {
        if (null !== this.Provider) return this.Provider;

        switch (this.songModel.CLASS) {
            case YoutubeProvider.CLASS:
                this.Provider = YoutubeProvider.create(this.songModel);
                break;

            case VimeoProvider.CLASS:
                this.Provider = VimeoProvider.create(this.songModel);
                break;

            case SoundCloudProvider.CLASS:
                this.Provider = SoundCloudProvider.create(this.songModel);
                break;

            default:
                throw new Error('Provider was not found');

            return null;
        }
    }
}

export default PlayerController;