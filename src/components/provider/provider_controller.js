import BaseController from '../../base/base_controller';
import Config from '../../core/config';
import DOM from '../../utils/dom';
import {PROVIDERS_LIST} from '../../constants/providers';

import YoutubeProvider from './providers/youtube/youtube_provider';
import VimeoProvider from './providers/vimeo/vimeo_provider';
import SoundCloudProvider from './providers/soundcloud/soundcloud_provider';


//import YoutubeModel from '../components/player/providers/youtube/youtube_model';
//import VimeoModel from '../components/player/providers/vimeo/vimeo_model';
//import SoundCloudModel from '../components/player/providers/soundcloud/soundcloud_model';


/**
 *
 */
class ProvidersController extends BaseController {
    static CLASS = 'ProvidersController';
    static selectorClass = '.smp_providers';

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
        return '<div>aaaaaaaaaaa</div>';
        /**
try {
            let HTML = this.getProvider().getHTML();


        } catch(err) {
            this.logger.error(err);
        }
         */
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
        }

        return this.Provider;
    }


    /**
     *
     */
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

export default ProvidersController;