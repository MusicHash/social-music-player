import BaseProvider from '../base_provider';


/**
 *
 */
class YoutubeProvider extends BaseProvider {
    static CLASS = 'YoutubeProvider';

    done = true;
    el = null;
    player = null;
    songModel = null;

    init(songModel) {
        this.songModel = songModel;
        console.log('fgg');

        window.onYouTubeIframeAPIReady = () => {
            this._initPlayer(); // YT events init.
        };
    }


    /**
     *
     */
    render() {
        var tag = document.createElement('script'),
            firstScriptTag = document.getElementsByTagName('script')[0];

        tag.src = 'https://www.youtube.com/iframe_api';
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }


    /**
     *
     */
    _initPlayer() {
        this.player = new window.YT.Player(document.querySelector('.smp_player'), {
            width: 145,
            height: 70,

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
    stopVideo() {
        this.player.stopVideo();
    }


    /**
     *
     */
    play() {
        this.player.loadVideoById({
            videoId: this.songModel.id,
            startSeconds: 0,
            suggestedQuality: 'large'
        });
    }
}

export default YoutubeProvider;