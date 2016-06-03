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
    play(song) {
        this.logger.info('PLAY CALLED');
        try {
            let provider = this._setNewProvider(song);
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
        return this._renderProviders();
    }


    hideAll() {
        this._executeAllProviders(provider => {
            provider.hide();
        });
    }


    pauseAll() {
        this._executeAllProviders(provider => {
            provider.pause();
        });
    }


    getProvider() {
        return this._ProviderCurrent;
    }


    /**
     *
     */
    _setNewProvider(song) {
        for (let i in this.PROVIDERS) {
            let provider = this.PROVIDERS[i];

            if (provider.PROVIDER === song.provider) {
                provider.setModel(song);
                this._ProviderCurrent = provider;

                return this.getProvider();
            }
        }

        this.logger.error('Provider not found');

        return null;
    }


    /**
     *
     */
    _renderProviders() {
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


    _executeAllProviders(callback) {
        try {
            for (let i in this.PROVIDERS) {
                let provider = this.PROVIDERS[i];
                callback(provider);
            }
        } catch(e) {
            this.logger.error('Failed to execute');
        }
    }

}

export default ProvidersController;