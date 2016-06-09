import BaseProvider from '../base_provider';
import YoutubeModel from './youtube_model';
import {PROVIDERS_LIST} from '../../../../constants/providers';

/**
 *
 */
class YoutubeProvider extends BaseProvider {
    static CLASS = 'YoutubeProvider';
    PROVIDER = PROVIDERS_LIST.YOUTUBE;
    PROVIDER_MODEL = YoutubeModel;


    player = null;


    /**
     *
     */
    init() {
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
                this.logger.debug('BUFFERING');
                break;

            case window.YT.PlayerState.PLAYING:
                this.logger.debug('PLAYING');
                break;

            case window.YT.PlayerState.PAUSED:
                this.logger.debug('PAUSED');
                break;

            case window.YT.PlayerState.ENDED:
                this.logger.debug('ENDED');
                break;

            default:
                this.logger.error('Other state: '+ event.data);
                break;
        }
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
            return this.play();

        this.player.loadVideoById({
            videoId: this.model.id,
            startSeconds: 0,
            suggestedQuality: 'large'
        });
    }
}

export default YoutubeProvider;