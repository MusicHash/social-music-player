import BaseProvider from '../base_provider';
import VimeoModel from './vimeo_model';
import {PROVIDERS_LIST} from '../../../../constants/providers';
import {PLAYER_STATE} from '../../../../constants/state';


/**
 * @see: https://developer.vimeo.com/player/embedding
 * @see: https://player.vimeo.com/playground
 */
class VimeoProvider extends BaseProvider {
    static CLASS = 'VimeoProvider';
    PROVIDER = PROVIDERS_LIST.VIMEO;
    PROVIDER_MODEL = VimeoModel;


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
        this.el.width = this.config.width;
        this.el.height = this.config.height;
        this.hide();

        return this.el;
    }


    /**
     *
     */
    _initPlayer() {
        this.player = window.$f(VimeoProvider.CLASS);
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
        let percent = Math.round(data.percent * 100 * 100) / 100;

        this.providerController.onPlayerProgressUpdate(this.PROVIDER, percent);
    }


    /**
     * @data: data.percent + ' : ' + data.bytesLoaded + ' : ' + data.bytesTotal + ' : ' + data.duration
     */
    onLoadProgress(data) {

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
    load(song) {
        if (!this.setModel(song))
            return this.play();

        this.player.addEvent('ready', this.onReady.bind(this));

        this.el.src = this.vimeoPath.replace('{{VIDEO_ID}}', this.model.id);
    }
}

export default VimeoProvider;