import BaseProvider from '../base_provider';
import SoundCloudModel from './soundcloud_model';
import {PROVIDERS_LIST} from '../../../../constants/providers';
import {PLAYER_STATE} from '../../../../constants/state';


/**
 * @see https://developers.soundcloud.com/docs/api/html5-widget
 * @see https://w.soundcloud.com/player/api_playground.html
 */
class SoundCloudProvider extends BaseProvider {
    static CLASS = 'SoundCloudProvider';
    PROVIDER = PROVIDERS_LIST.SOUNDCLOUD;
    PROVIDER_MODEL = SoundCloudModel;

    PROVIDER_URL_PATTERN = '^(http|https)://api.soundcloud.com/tracks/(.*)$';

    widget = null;
    SCPath = '//w.soundcloud.com/player/?url=';
    SCTracks = 'http://api.soundcloud.com/tracks/';

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
    getPlayerContainer() {
        if (null !== this.el) return this.el;

        this.el = document.createElement('iframe');
        this.el.id = SoundCloudProvider.CLASS;
        this.el.src = this.SCPath;
        this.el.width = this.config.widthPlayer;
        this.el.height = this.config.heightPlayer;
        this.hide();

        return this.el;
    }


    /**
     *
     */
    scriptLoad() {
        let tag = document.createElement('script'),
            firstScriptTag = document.getElementsByTagName('script')[0];

        tag.src = 'https://w.soundcloud.com/player/api.js';
        tag.onload = this._initPlayer.bind(this);


        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

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
    _initPlayer() {
        this.widget = window.SC.Widget(this.getPlayerContainer());

        this.widget.bind(window.SC.Widget.Events.READY, this.onReady.bind(this));
        this.widget.bind(window.SC.Widget.Events.PLAY, this.onPlay.bind(this));
        this.widget.bind(window.SC.Widget.Events.PAUSE, this.onPause.bind(this));
        this.widget.bind(window.SC.Widget.Events.FINISH, this.onFinish.bind(this));
        this.widget.bind(window.SC.Widget.Events.LOAD_PROGRESS, this.onLoadProgress.bind(this));
        this.widget.bind(window.SC.Widget.Events.PLAY_PROGRESS, this.onPlayProgress.bind(this));

        return this;
    }


    /********************** GETTERS **********************/


    /**
     *
     */
    isPlaying() {
        return new Promise((resolve, reject) => {
            this.widget.isPaused(isPaused => {
                resolve(!isPaused);
            });
        });
    }



    /**
     *
     */
    getCurrentSecond() {
        return new Promise((resolve, reject) => {
            this.widget.getPosition(second => {
                resolve(second / 1000);
            });
        });
    }


    /**
     *
     */
    getVolume() {
        return new Promise((resolve, reject) => {
            this.widget.getVolume(volume => {
                resolve(volume);
            });
        });
    }


    /**
     *
     */
    getDuration() {
        return new Promise((resolve, reject) => {
            this.widget.getDuration(duration => {
                resolve(duration / 1000);
            });
        });
    }


    /********************** MODIFIERS **********************/


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
     * @data: data.loadedProgress + ' : ' + data.currentPosition + ' : ' + data.relativePosition
     */
    onPlayProgress(data) {
        let percent = data.relativePosition * 100;

        this.providerController.onPlayerProgressUpdate(this.PROVIDER, percent, data.currentPosition / 1000);
    }


    /**
     * @data: data.percent + ' : ' + data.bytesLoaded + ' : ' + data.bytesTotal + ' : ' + data.duration
     */
    onLoadProgress(data) {}


    /**
     *
     */
    seekTo(second) {
        this.widget.seekTo(second * 1000);

        this.widget.isPaused(() => {
            this.play();
        });


        return this;
    }


    /**
     *
     */
    setVolume(volume) {
        this.widget.setVolume(volume);

        return this;
    }


    /**
     *
     */
    onReady() {
        console.log('READY?');
    }


    /**
     *
     */
    pause() {
        this.widget.pause();
    }


    /**
     *
     */
    play() {
        this.widget.play();

        return this;
    }


    /**
     *
     */
    load(song) {
        if (!this.setModel(song))
            return this.seekTo(0);

        this.widget.load(this.SCTracks + this.model.id, {
            auto_play: true,
            buying: false,
            liking: false,
            download: false,
            sharing: false,
            show_artwork: true,
            show_comments: true,
            show_playcount: true,
            show_user: true,
            hide_related: true,
            visual: true,
            start_track: 0
        });
    }
}

export default SoundCloudProvider;