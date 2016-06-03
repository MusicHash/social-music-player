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

    PROVIDERS = {};
    _ProviderCurrent = null;


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

            this.PROVIDERS[p.CLASS] = provider;
            out.push(provider.render());
        }

        return out;
    }


    /**
     *
     */
    play(song) {
        this.logger.info('PLAY CALLED');
        try {
            let provider = this.setNewProvider(song);
            console.log(provider);

            provider.play();
        } catch(e) {
            this.logger.error('Failed to execute play. '+ e);
        }

        return this;
    }


    /**
     *
     */
    render() {
        return this.renderProviders();
    }


    getProvider() {
        return this._ProviderCurrent;
    }


    /**
     *
     */
    setNewProvider(song) {
        for (let i in this.PROVIDERS) {
            let provider = this.PROVIDERS[i];
            console.log(provider);
            console.log(provider.PROVIDER);
            console.log(song.provider);

            if (provider.PROVIDER === song.provider) {
                provider.setModel(song);
                this._ProviderCurrent = provider;

                return this.getProvider();
            }

            console.log('setNewProvider ENDED!');
        }

        this.logger.error('Provider not found');

        return null;
    }


    /**
     *
    getModelProvider(song) {
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
    */
}

export default ProvidersController;