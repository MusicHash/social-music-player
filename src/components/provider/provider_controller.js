import BaseController from '../../base/base_controller';
import _ from '../../utils/__';
import DOM from '../../utils/dom';
import Config from '../../core/config';
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
    volume = 1;


    /**
     *
     */
    init() {
        this.subscribe();
    }


    /**
     *
     */
    subscribe() {
        Event.on(SYSTEM_EVENTS.SEEK_TO_SECOND, this.seekToSecond.bind(this));
        Event.on(SYSTEM_EVENTS.SEEK_TO_PERCENT, this.seekToPercent.bind(this));
        Event.on(SYSTEM_EVENTS.PLAY, this.play.bind(this));
        Event.on(SYSTEM_EVENTS.PAUSE, this.pause.bind(this));
        Event.on(SYSTEM_EVENTS.VOLUME, this.setVolume.bind(this));
    }


    /********************** GETTERS **********************/


    /**
     *
     */
    isPlaying() {
        return this._ensurePromise(this.getProvider().isPlaying, playingState => {
            return 'undefined' !== typeof playingState && null !== playingState;
        });
    }



    /**
     *
     */
    getCurrentSecond() {
        return this._ensurePromise(this.getProvider().getCurrentSecond, second => {
            return 'undefined' !== typeof second && null !== second && 0 <= second;
        });
    }


    /**
     *
     */
    getVolume() {
        return this._ensurePromise(this.getProvider().getVolume, volume => {
            return 'undefined' !== typeof volume && null !== volume && 0 <= volume;
        });
    }


    /**
     *
     */
    getDuration() {
        return this._ensurePromise(this.getProvider().getDuration, duration => {
            return 'undefined' !== typeof duration && null !== duration && 0 <= duration;
        });
    }


    /**
     *
     */
    getURL() {
        let url = this.getProvider().getModel().getURL();

        return new Promise((resolve, reject) => {
            resolve(url);
        });
    }


    /**
     *
     */
    getVideoWidth() {
        let config = Config.create(),
            width = DOM.getDimensions(config.elID).width;

        return new Promise((resolve, reject) => {
            resolve(width);
        });
    }


    /**
     *
     */
    getVideoHeight() {
        let config = Config.create(),
            height = DOM.getDimensions(config.elID).height;

        return new Promise((resolve, reject) => {
            resolve(height);
        });
    }


    /********************** MODIFIERS **********************/


    /**
     *
     */
    seekToPercent(percent) {
        this.getDuration().then(duration => {
            let second = percent * duration;

            return this.seekToSecond(second);
        });
    }


    /**
     *
     */
    seekToSecond(second) {
        return this.getProvider().seekTo(second);
    }


    /**
     *
     */
    setVolume(volume) {
        this.volume = volume;

        this.getProvider().setVolume(this.volume);

        return this;
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

        // handle URL loading
        if (_.isURL(song)) {
            return this.loadByURL(song);
        }

        try {
            let provider = this._setNewProvider(song);

            this.pauseAll();

            this._hideInactiveOnly();
            provider.load(song);
            this.setVolume(this.volume);

            this.broadcastProviderSong();
        } catch(e) {
            this.logger.error('Failed to execute play. '+ e);
        }

        return this;
    }


    /**
     *
     */
    loadByURL(url) {
        this.logger.info('LOAD BY URL CALLED: '+ url);

        for (let i in this.PROVIDERS) {
            let ID = this.PROVIDERS[i].getIDFromURL(url);

            if (false !== ID)
                return this.load(this.PROVIDERS[i].getModelByURL(url));
        }

        this.logger.error('Failed to translate URL to provider. URL submitted: '+ url);

        return this;
    }


    /**
     *
     */
    broadcastProviderSong() {
        let songModel = this.getProvider().getModel();

        this.getDuration().then(duration => {
            Event.fire(SYSTEM_EVENTS.NEW_SONG_PLAYING, {
                provider: songModel.getProvider(),
                title: songModel.getTitle(),
                duration: duration,
                url: songModel.getURL()
            });
        });
    }


    /**
     *
     */
    onPlayerStateChange(provider, playerState) {
        if (this.getProvider().PROVIDER !== provider) {
            this.logger.info('Called from an inactive provider, ignoring: ' + provider);

            return;
        }

        this.logger.debug('Provider reported a state change: '+ playerState);

        Event.fire(SYSTEM_EVENTS.STATE_CHANGED, playerState);
    }


    /**
     *
     */
    onPlayerProgressUpdate(provider, percent, seconds) {
        if (this.getProvider().PROVIDER !== provider) {
            this.logger.info('Called from an inactive provider, ignoring: ' + provider);

            return;
        }

        Event.fire(SYSTEM_EVENTS.PLAY_PROGRESS, {
            percent: percent,
            seconds: seconds
        });
    }


    /**
     *
     */
    render() {
        return this._renderProviders();
    }


    /**
     *
     */
    pauseAll() {
        this._executeAllProviders(provider => {
            provider.pause();
        });
    }


    /**
     *
     */
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
        this.logger.debug('Changing provider..');

        for (let i in this.PROVIDERS) {
            let provider = this.PROVIDERS[i];

            if (provider.PROVIDER === song.provider) {
                this._ProviderCurrent = provider;
                this.logger.debug('New provider set.');

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


    /**
     *
     */
    _ensurePromise(promisedFunc, assert, timeout = 250) {
        let waitingForResponse = false,
            verifyResponseTimeout,
            executeAsyncAPI = callback => {
                promisedFunc.bind(this.getProvider())().then(response => {
                    if (!assert(response))
                        return;

                    clearInterval(verifyResponseTimeout);

                    waitingForResponse = false;

                    callback(response);
                });
            };

        return new Promise((resolve, reject) => {
            waitingForResponse = true;

            // Seems like a bug. Some sort of racing condition. Promise is lost, no return and no error
            executeAsyncAPI(resolve);

            verifyResponseTimeout = setInterval(() => {
                if (true === waitingForResponse)
                    executeAsyncAPI(resolve);
            }, timeout);
        });
    }
}

export default ProviderController;