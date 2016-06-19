import BaseProvider from '../base_provider';
import VimeoModel from './vimeo_model';
import {PROVIDERS_LIST} from '../../../../constants/providers';
import {PLAYER_STATE} from '../../../../constants/state';


/**
 * @see https://developer.vimeo.com/player/js-api
 * @see https://developer.vimeo.com/player/embedding
 * @see https://player.vimeo.com/playground
 */
class VimeoProvider extends BaseProvider {
    static CLASS = 'VimeoProvider';
    PROVIDER = PROVIDERS_LIST.VIMEO;
    PROVIDER_MODEL = VimeoModel;

    PROVIDER_URL_PATTERN = /vimeo.*\/(\d+)/;

    player = null;
    vimeoPath = '//player.vimeo.com/video/{{VIDEO_ID}}?api=1&player_id=VimeoProvider';

    providerController = null;


    /**
     *
     */
    init(providerController) {
        this.providerController = providerController;

        this.scriptLoad();
    }


    /**
     *
     */
    scriptLoad() {
        let tag = document.createElement('script'),
            firstScriptTag = document.getElementsByTagName('script')[0];

        tag.src = 'https://f.vimeocdn.com/js/froogaloop2.min.js';
        tag.onload = this._initPlayer.bind(this);

        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        return this;
    }


    /**
     *
     */
    getPlayerContainer() {
        if (null !== this.el) return this.el;

        this.el = document.createElement('iframe');
        this.el.id = VimeoProvider.CLASS;
        this.el.width = this.config.widthPlayer;
        this.el.height = this.config.heightPlayer;
        this.hide();

        return this.el;
    }


    /**
     *
     */
    _initPlayer() {
        this.player = window.$f(VimeoProvider.CLASS);
    }


    /********************** GETTERS **********************/


    /**
     *
     */
    isPlaying() {
        return new Promise((resolve, reject) => {
            this.player.api('paused', isPaused => {
                resolve(!isPaused);
            });
        });
    }


    /**
     *
     */
    getCurrentSecond() {
        return new Promise((resolve, reject) => {
            this.player.api('getCurrentTime', second => {
                resolve(second);
            });
        });
    }


    /**
     *
     */
    getVolume() {
        return new Promise((resolve, reject) => {
            this.player.api('getVolume', volume => {
                resolve(volume);
            });
        });
    }


    /**
     *
     */
    getDuration() {
        return new Promise((resolve, reject) => {
            try {
                this.player.api('getDuration', duration => {
                    resolve(duration);
                });
            } catch(e) {
                this.logger.info('No video, duration is set to 0');
                resolve(0);
            }
        });
    }


    /********************** MODIFIERS **********************/


    /**
     *
     */
     onError() {
         this.providerController.onPlayerStateChange(this.PROVIDER, PLAYER_STATE.ERROR);
         this.logger.debug('Error');
     }


    /**
     *
     */
    onReady() {
        this.play();

        this.player.addEvent('loadProgress', this.onLoadProgress.bind(this));
        this.player.addEvent('playProgress', this.onPlayProgress.bind(this));
        this.player.addEvent('play', this.onPlay.bind(this));
        this.player.addEvent('pause', this.onPause.bind(this));
        this.player.addEvent('finish', this.onFinish.bind(this));
    }


    /**
     *
     */
    onPlay() {
        this.providerController.onPlayerStateChange(this.PROVIDER, PLAYER_STATE.PLAYING);
        this.logger.debug('PLAYING');
    }


    /**
     *
     */
    onPause() {
        this.providerController.onPlayerStateChange(this.PROVIDER, PLAYER_STATE.PAUSED);
        this.logger.debug('PAUSED');
    }


    /**
     *
     */
    onFinish() {
        this.providerController.onPlayerStateChange(this.PROVIDER, PLAYER_STATE.ENDED);
        this.logger.debug('ENDED');
    }


    /**
     * @data: data.seconds + ' : ' + data.percent + ' : ' + data.duration
     */
    onPlayProgress(data) {
        let percent = data.percent * 100;

        this.providerController.onPlayerProgressUpdate(this.PROVIDER, percent, data.seconds);
    }


    /**
     * @data: data.percent + ' : ' + data.bytesLoaded + ' : ' + data.bytesTotal + ' : ' + data.duration
     */
    onLoadProgress(data) {}


    /**
     *
     */
    seekTo(second) {
        this.player.api('seekTo', second);
        this.play();

        return this;
    }


    /**
     *
     */
    setVolume(volume) {
        this.player.api('setVolume', volume);

        return this;
    }


    /**
     *
     */
    render() {
        return this.getPlayerContainer();
    }


    /**
     *
     */
    pause() {
        this.player.api('pause');
    }


    /**
     *
     */
    play() {
        this.player.api('play');

        return this;
    }


    /**
     *
     */
     _heartbeatPlayer(delayTime = 2000) {
        let responseSent = false;

        this.getDuration().then(duration => {
            responseSent = true;
        });

        setTimeout(() => {
            if (false === responseSent)
                this.onError();
        }, delayTime);
     }


    /**
     *
     */
    load(song) {
        if (!this.setModel(song))
            return this.seekTo(0);

        this._heartbeatPlayer();
        this.player.addEvent('ready', this.onReady.bind(this));

        this.el.src = this.vimeoPath.replace('{{VIDEO_ID}}', this.model.id);
    }
}

export default VimeoProvider;