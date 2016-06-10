import Event from 'event-emitter-js';
import BaseController from '../../base/base_controller';
import Config from '../../core/config';
import {SYSTEM_EVENTS, DOM_EVENTS} from '../../constants/events';
import {PLAYER_STATE} from '../../constants/state';
import {PROVIDERS_LIST} from '../../constants/providers';
import DOM from '../../utils/dom';
import _ from '../../utils/__';
import PlayerMarkupHTML from './view/controls_markup.html';
import PlayerButtons from './svg/player_buttons.svg';

import YoutubeLogo from '../../components/provider/providers/youtube/logo/youtube.logo.svg';
import VimeoLogo from '../../components/provider/providers/vimeo/logo/vimeo.logo.svg';
import SoundCloudLogo from '../../components/provider/providers/soundcloud/logo/soundcloud.logo.svg';


/**
 *
 */
class ControlsController extends BaseController {
    static CLASS = 'ControlsController';
    static selectorClass = '.smp_controller';

    /**
     *
     */
    init(params) {
        this.logger.debug('ControlsController INIT fired');
        this.subscribe();
        this._loadShapes();
    }


    /**
     *
     */
    _loadShapes() {
        DOM.append(PlayerButtons, DOM.getBody());
        DOM.append(YoutubeLogo, DOM.getBody());
        DOM.append(VimeoLogo, DOM.getBody());
        DOM.append(SoundCloudLogo, DOM.getBody());

        return this;
    }


    /**
     *
     */
    subscribe() {
        Event.on(SYSTEM_EVENTS.PLAY, () => {
            console.log('CONTROLLER PLAY ARRIVED!!');
        });

        Event.on(SYSTEM_EVENTS.STATE_CHANGED, this.onStateChange.bind(this));
        Event.on(SYSTEM_EVENTS.ON_PROGRESS, this.onProgressUpdate.bind(this));
        Event.on(SYSTEM_EVENTS.NEW_SONG_PLAYING, this.onSongChange.bind(this));
        Event.on(SYSTEM_EVENTS.PLAYER_INITIALIZED, this.onInitialize.bind(this));
        window.addEventListener(DOM_EVENTS.ON_RESIZE, this.onResize.bind(this), true);
    }


    /**
     *
     */
    onSongChange(song) {
        this.onResize();

        this.onProgressUpdate({
            percent: 0,
            seconds: 0
        });

        DOM.$$('.controls-list .title').innerHTML = song.title;
        DOM.$$('.controls-list .duration').innerHTML = _.formatTime(song.duration);

        this.showActiveProvider(song.provider);
    }


    /**
     *
     */
     showActiveProvider(provider) {
         let activeProviderClass = this.getProviderClassName(provider),
             providersClassNames = ['youtube', 'vimeo', 'soundcloud'];

        providersClassNames.forEach(className => {
            if (className === activeProviderClass)
                return DOM.$$('.controls-list .providers .'+className).classList.remove('hide');

            DOM.$$('.controls-list .providers .'+className).classList.add('hide');
        });

     }


    /**
     *
     */
    onInitialize() {
        this.onResize();

        DOM.$$('.progress-bar').addEventListener('click', event => {
            this.mouseScrubbar(event);
        });

        DOM.$$('.play-pause .play').addEventListener('click', event => {
            Event.fire(SYSTEM_EVENTS.DO_PLAY);
        });

        DOM.$$('.play-pause .pause').addEventListener('click', event => {
            Event.fire(SYSTEM_EVENTS.DO_PAUSE);
        });
    }


    /**
     *
     */
    mouseScrubbar(e) {
        let mouseX = e.pageX,
            scrubber = DOM.$$('.progress-bar'),
            scrubberWidth = DOM.getWidth('.progress-bar');

        switch(e.type) {
           	case 'click':
                let position = (mouseX - scrubber.offsetLeft) / scrubberWidth;
                position = Math.round(position * 100) / 100;

                Event.fire(SYSTEM_EVENTS.SEEK_TO, position);
                break;

            default:
                break;
        }
    }


    /**
     *
     */
    onProgressUpdate(progress) {
        DOM.$$('.progress-bar .play-bar').style.width = progress.percent + '%';
        DOM.$$('.controls-list .current-time').innerHTML = _.formatTime(progress.seconds);
    }


    /**
     *
     */
    onStateChange(playerState) {
        switch(playerState) {
            case PLAYER_STATE.BUFFERING:
            case PLAYER_STATE.PLAYING:
                this.showPauseButton();
                break;

            case PLAYER_STATE.PAUSED:
            case PLAYER_STATE.ENDED:
                this.showPlayButton();
                break;

            default:
                break;
        }
    }


    /**
     *
     *
     */
    showPlayButton() {
        DOM.$$('.play-pause .play').classList.remove('hide');
        DOM.$$('.play-pause .pause').classList.add('hide');

        console.log('SHOW PLAY');
    }


    /**
     *
     *
     */
    showPauseButton() {
        DOM.$$('.play-pause .play').classList.add('hide');
        DOM.$$('.play-pause .pause').classList.remove('hide');

        console.log('SHOW PAUSE');
    }


    /**
     *
     *
     */
    onResize() {
        this.setPlayerWidth();

        return this;
    }


    /**
     *
     *
     */
    setPlayerWidth() {
        let playerEl = DOM.getWidth('#social-music-player'),
            playPauseEl = DOM.getWidth('#social-music-player .play-pause'),
            currentTimeEl = DOM.getWidth('#social-music-player .current-time'),
            durationEl = DOM.getWidth('#social-music-player .duration'),
            slack = 44;

        DOM.$$('#social-music-player .controls-list').style.width = playerEl - playPauseEl - 20 + 'px';

        DOM.$$('#social-music-player .scrabber .progress-bar').style.width = playerEl - playPauseEl - currentTimeEl - durationEl - slack + 'px';

        return this;
    }



    /**
     *
     */
    getTemplate() {
        return PlayerMarkupHTML;
    }


    /**
     *
     */
    render() {
        let config = Config.create();

        return this.getTemplate();
    }


    /**
     *
     */
    getProviderClassName(provider) {
        switch(provider) {
            case PROVIDERS_LIST.YOUTUBE:
                return 'youtube';

            case PROVIDERS_LIST.VIMEO:
                return 'vimeo';

            case PROVIDERS_LIST.SOUNDCLOUD:
                return 'soundcloud';
        }

        return 'no_provider';
    }

}

export default ControlsController;