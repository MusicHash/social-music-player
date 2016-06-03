import BaseProvider from '../base_provider';
import VimeoModel from './vimeo_model';
import {PROVIDERS_LIST} from '../../../../constants/providers';

/**
 * @see: https://developer.vimeo.com/player/embedding
 * @see: https://player.vimeo.com/playground
 */
class VimeoProvider extends BaseProvider {
    static CLASS = 'VimeoProvider';

    playerOrigin = '*';
    player = null;
    el = null;
    PROVIDER = PROVIDERS_LIST.VIMEO;
    vimeoPath = '//player.vimeo.com/video/{{VIDEO_ID}}?api=1&player_id=VimeoProvider';

    init() {
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

    getPlayerContainer() {
        if (null !== this.el) return this.el;

        this.el = document.createElement('iframe');
        this.el.id = VimeoProvider.CLASS;
        this.el.src = this.vimeoPath;
        this.el.width = this.config.width;
        this.el.height = this.config.height;

        return this.el;
    }


    _initPlayer() {
        if (window.addEventListener) {
            window.addEventListener('message', this.onMessageReceived.bind(this), false);
        }
        else {
            window.attachEvent('onmessage', this.onMessageReceived.bind(this), false);
        }

        this.player = $f(VimeoProvider.CLASS);
    }

    onMessageReceived(event) {
        // Handle messages from the vimeo player only
        if (!(/^https?:\/\/player.vimeo.com/).test(event.origin)) {
            return false;
        }

        if (this.playerOrigin === '*') {
            this.playerOrigin = event.origin;
        }

        var data = JSON.parse(event.data);

        switch (data.event) {
            case 'ready':
                this.onReady();
                break;

            case 'playProgress':
                this.onPlayProgress(data.data);
                break;

            case 'pause':
                this.onPause();
                break;

            case 'finish':
                this.onFinish();
                break;
        }
    }

    // Helper function for sending a message to the player
    post(action, value) {
        var data = {
          method: action
        };

        if (value) {
            data.value = value;
        }

        var message = JSON.stringify(data);
        this.getPlayerContainer().contentWindow.postMessage(message, this.playerOrigin);
    }

    onReady() {
        console.log('ready');
        this.player.api('play');

        this.post('addEventListener', 'pause');
        this.post('addEventListener', 'finish');
        this.post('addEventListener', 'playProgress');
    }

    onPause() {
        console.log('paused');
    }

    onFinish() {
        console.log('finished');
    }

    onPlayProgress(data) {
        console.log(data.seconds + 's played');
    }




    render() {
        return this.getPlayerContainer();
    }


    setModel(song) {
        this.model = VimeoModel.create(song);

        return this;
    }

    /**
     *
     */
    play() {
        this.el.src = this.vimeoPath.replace('{{VIDEO_ID}}', this.model.id);
    }
}

export default VimeoProvider;