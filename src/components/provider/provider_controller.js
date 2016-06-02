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
class ProvidersController extends BaseController {
    static CLASS = 'ProvidersController';
    static selectorClass = '.smp_providers';

    Providers = {};


    /**
     *
     */
    init() {}


    /**
     *
     */
    renderProviders() {
        let out = [],
            providers = [
                YoutubeProvider,
                VimeoProvider,
                SoundCloudProvider
            ];

        for (let i = 0, len = providers.length; i < len; i++) {
            let p = providers[i],
                provider = p.create();

            this.Providers[p.CLASS] = provider;
            out.push(provider.render());
        }

        return out;
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
        return this.renderProviders();
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