import BaseProvider from '../base_provider';
import YoutubeModel from './youtube_model';
import {PROVIDERS_LIST} from '../../../../constants/providers';
import {PLAYER_STATE} from '../../../../constants/state';


/**
 *
 */
class YoutubeProvider extends BaseProvider {
    static CLASS = 'YoutubeProvider';
    PROVIDER = PROVIDERS_LIST.YOUTUBE;
    PROVIDER_MODEL = YoutubeModel;

    // @see http://stackoverflow.com/a/10315969/624466
    PROVIDER_URL_PATTERN = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

    player = null;
    providerController = null;
    progressUpdateTimer = null;
    youtubeProgressInterval = 200;


    /**
     *
     */
    init(providerController) {
        this.providerController = providerController;

        window.onYouTubeIframeAPIReady = () => {
            this._initPlayer(); // YT events init.
        };

        this.scriptLoad();
    }


    /**
     *
     */
    getPlayerContainer() {
        if (null !== this.el) return this.el;

        this.el = document.createElement('div');
        this.el.id = YoutubeProvider.CLASS;
        this.hide();

        return this.el;
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
    scriptLoad() {
        let tag = document.createElement('script'),
            firstScriptTag = document.getElementsByTagName('script')[0];

        tag.src = 'https://www.youtube.com/iframe_api';
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        return this;
    }


    /**
     *
     */
    _initPlayer() {
        this.player = new window.YT.Player(this.getPlayerContainer(), {
            width: this.config.width,
            height: this.config.height,

            events: {
                onReady: this.onPlayerReady.bind(this),
                onStateChange: this.onPlayerStateChange.bind(this)
            },

            playerVars: {
                enablejsapi: 1,
                controls: 0,
                showinfo: 0,
                disablekb: 1,
                fs: 0,
                iv_load_policy: 3,
                modestbranding: 1,
                loop: 0,
                playinline: 1,
                theme: 'light',
                rel: 0
            }
        });

        this.el = this.player.getIframe(); // YT loses the refrance by replacing the container
    }


    /********************** GETTERS **********************/


    /**
     *
     */
    isPlaying() {
        let state = this.player.getPlayerState();

        return new Promise((resolve, reject) => {
            resolve(window.YT.PlayerState.PLAYING === state);
        });
    }


    /**
     *
     */
    getCurrentSecond() {
        let second = this.player.getCurrentTime();

        return new Promise((resolve, reject) => {
            resolve(second);
        });
    }


    /**
     *
     */
    getVolume() {
        let volume = this.player.getVolume();

        return new Promise((resolve, reject) => {
            resolve(volume);
        });
    }


    /**
     *
     */
    getDuration() {
        let duration = this.player.getDuration();

        return new Promise((resolve, reject) => {
            resolve(duration);
        });
    }


    /**
     * @has a bug.. not a promise?
     */
    getProgressPercentage() {
        let percent = (this.player.getCurrentTime() / this.player.getDuration()) * 100;

        if (isNaN(percent))
            percent = 0;

        return percent;
    }


    /**
     *
     */
    getURL() {
        console.log('getURL');
    }


    /**
     *
     */
    getVideoWidth() {
        console.log('getVideoWidth');
    }


    /**
     *
     */
    getVideoHeight() {
        console.log('getVideoHeight');
    }


    /********************** MODIFIERS **********************/


    /**
     *
     */
    seekTo(second) {
        this.player.seekTo(second);
        this.play();

        return this;
    }


    /**
     *
     */
    setVolume(volume) {
        this.player.setVolume(volume * 100);

        return this;
    }


    /**
     *
     */
    onPlayerReady(event) {
        event.target.playVideo();
    }


    /**
     *
     */
    onPlayerStateChange(event) {
        switch(event.data) {
            case window.YT.PlayerState.BUFFERING:
                this.providerController.onPlayerStateChange(this.PROVIDER, PLAYER_STATE.BUFFERING);
                this.logger.debug('BUFFERING');
                this.progressTimeStart();
                break;

            case window.YT.PlayerState.PLAYING:
                this.providerController.onPlayerStateChange(this.PROVIDER, PLAYER_STATE.PLAYING);
                this.logger.debug('PLAYING');
                this.progressTimeStart();
                break;

            case window.YT.PlayerState.PAUSED:
                this.providerController.onPlayerStateChange(this.PROVIDER, PLAYER_STATE.PAUSED);
                this.logger.debug('PAUSED');
                this.progressTimeStop();
                break;

            case window.YT.PlayerState.ENDED:
                this.providerController.onPlayerStateChange(this.PROVIDER, PLAYER_STATE.ENDED);
                this.logger.debug('ENDED');
                this.progressTimeStop();
                break;

            default:
                this.logger.error('Other state: '+ event.data);
                this.progressTimeStop();
                break;
        }
    }


    /**
     *
     */
    progressTimeStart() {
        if (null !== this.progressUpdateTimer) return;

        this.progressUpdateTimer = setInterval(() => {
            this.providerController.onPlayerProgressUpdate(this.PROVIDER, this.getProgressPercentage(), this.getCurrentTime());
        }, this.youtubeProgressInterval);
    }


    /**
     *
     */
    getCurrentTime() {
        return this.player.getCurrentTime();
    }


    /**
     *
     */
    progressTimeStop() {
        if (null === this.progressUpdateTimer) return;

        clearInterval(this.progressUpdateTimer);
        this.progressUpdateTimer = null;

        return this;
    }



    /**
     *
     */
    pause() {
        this.player.pauseVideo();
    }


    /**
     *
     */
    stop() {
        this.player.stopVideo();
    }


    /**
     *
     */
    play() {
        this.player.playVideo();
    }


    /**
     *
     */
    load(song) {
        if (!this.setModel(song))
            return this.seekTo(0);

        this.player.loadVideoById({
            videoId: this.model.id,
            startSeconds: 0,
            suggestedQuality: 'large'
        });
    }
}

export default YoutubeProvider;