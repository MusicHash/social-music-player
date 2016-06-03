import BaseProvider from '../base_provider';
import YoutubeModel from './youtube_model';
import {PROVIDERS_LIST} from '../../../../constants/providers';

/**
 *
 */
class YoutubeProvider extends BaseProvider {
    static CLASS = 'YoutubeProvider';
    PROVIDER = PROVIDERS_LIST.YOUTUBE;


    el = null;
    player = null;


    init() {
        window.onYouTubeIframeAPIReady = () => {
            this._initPlayer(); // YT events init.
        };

        this.scriptLoad();
    }


    getPlayerContainer() {
        if (null !== this.el) return this.el;

        this.el = document.createElement('div');
        this.el.id = YoutubeProvider.CLASS;

        return this.el;
    }


    render() {
        return this.getPlayerContainer();
    }


    setModel(song) {
        this.model = YoutubeModel.create(song);

        return this;
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
                onReady: this.onPlayerReady,
                onStateChange: this.onPlayerStateChange
            },

            playerVars: {
                enablejsapi: 1,
                controls: 2,
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
    onPlayerStateChange(event) {}


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
        this.player.loadVideoById({
            videoId: this.model.id,
            startSeconds: 0,
            suggestedQuality: 'large'
        });
    }
}

export default YoutubeProvider;