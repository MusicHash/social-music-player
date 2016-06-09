import BaseController from '../../base/base_controller';
import DOM from '../../utils/dom';
import Event from 'event-emitter-js';
import {PROVIDERS_LIST} from '../../constants/providers';
import {SYSTEM_EVENTS} from '../../constants/events';
import {PLAYER_STATE} from '../../constants/state';

import YoutubeProvider from './providers/youtube/youtube_provider';
import VimeoProvider from './providers/vimeo/vimeo_provider';
import SoundCloudProvider from './providers/soundcloud/soundcloud_provider';


/**
 *
 */
class ProviderController extends BaseController {
    static CLASS = 'ProvidersController';
    static selectorClass = '.smp_providers';


    PROVIDERS = {};
    _ProviderCurrent = null;


    init() {
        this.subscribe();
    }


    /**
     *
     */
    subscribe() {
        //Event.on(SYSTEM_EVENTS.PLAY, this.play.bind(this));
        //Event.on(SYSTEM_EVENTS.PAUSE, this.pause.bind(this));
    }


    /**
     *
     */
    pause() {
        return this.getProvider().pause();
    }


    /**
     *
     */
    play() {
        return this.getProvider().play();
    }


    /**
     *
     */
    load(song) {
        this.logger.info('LOAD CALLED');

        try {
            let provider = this._setNewProvider(song);

            this.pauseAll();

            this._hideInactiveOnly();
            provider.load(song);

            Event.fire(SYSTEM_EVENTS.PLAY);
        } catch(e) {
            this.logger.error('Failed to execute play. '+ e);
        }

        return this;
    }


    onPlayerStateChange(provider, playerState) {
        if (this.getProvider() === provider) {
            this.logger.info('Called from an inactive provider, ignoring...');

            return;
        }

        this.logger.debug('Provider reported a state change: '+ playerState);

        Event.on(SYSTEM_EVENTS.STATE_CHANGED, playerState);
    }


    /**
     *
     */
    render() {
        return this._renderProviders();
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
    _hideInactiveOnly() {
        let activeProvider = this.getProvider();

        this._executeAllProviders(provider => {
            if ('undefined' !== activeProvider && provider.PROVIDER === activeProvider.PROVIDER)
                return provider.show();

            provider.hide();
        });
    }


    /**
     *
     */
    _setNewProvider(song) {
        for (let i in this.PROVIDERS) {
            let provider = this.PROVIDERS[i];

            if (provider.PROVIDER === song.provider) {
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
                provider = p.create(this);

            this.PROVIDERS[p.CLASS] = provider;
            out.push(provider.render());
        }

        return out;
    }


    /**
     *
     */
    _executeAllProviders(callback) {
        try {
            for (let i in this.PROVIDERS) {
                let provider = this.PROVIDERS[i];
                callback(provider);
            }
        } catch(e) {
            this.logger.error('Failed to execute ' + e);
        }
    }

}

export default ProviderController;