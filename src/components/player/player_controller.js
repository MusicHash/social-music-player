import BaseController from '../../base/base_controller';
import Config from '../../core/config';
import DOM from '../../utils/dom';
import {PROVIDERS_LIST} from '../../constants/providers';

import YoutubeProvider from './providers/youtube/youtube_provider';
import VimeoProvider from './providers/vimeo/vimeo_provider';
import SoundCloudProvider from './providers/soundcloud/soundcloud_provider';



/**
 *
 */
class PlayerController extends BaseController {
    static CLASS = 'PlayerController';
    static selectorClass = '.smp_player';

    songModel = null;
    Provider = null;


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

        let t = this.getProvider();
        console.log(t);

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

        switch (this.songModel.provider) {
            case PROVIDERS_LIST.YOUTUBE:
                this.Provider = YoutubeProvider.create(this.songModel);
                break;

            case PROVIDERS_LIST.VIMEO:
                this.Provider = VimeoProvider.create(this.songModel);
                break;

            case PROVIDERS_LIST.SOUNDCLOUD:
                this.Provider = SoundCloudProvider.create(this.songModel);
                break;

            default:
                throw new Error('Provider was not found');
                break;
        }

        return this.Provider;
    }
}

export default PlayerController;