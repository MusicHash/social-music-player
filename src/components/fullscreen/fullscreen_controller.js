import Event from 'event-emitter-js';
import BaseController from '../../base/base_controller';
import DOM from '../../utils/dom';
import FullScreenBarHTML from './view/fullscreen_bar.html';
import {SYSTEM_EVENTS, DOM_EVENTS} from '../../constants/events';

/**
 *
 */
class FullscreenController extends BaseController {
    static CLASS = 'FullscreenController';
    static selectorClass = '.smp_fullscreen';

    /**
     *
     */
    init(params) {
        this.logger.debug('FullscreenController INIT fired');
        this.subscribe();
    }


    /**
     *
     */
    subscribe() {
        Event.on(SYSTEM_EVENTS.PLAYER_INITIALIZED, this.onInitialize.bind(this));
        Event.on(SYSTEM_EVENTS.FULLSCREEN_OPEN, this.onFullsreenOpen.bind(this));
        Event.on(SYSTEM_EVENTS.FULLSCREEN_CLOSE, this.onFullsreenClose.bind(this));
    }



    /**
     *
     */
    onFullsreenOpen() {
        DOM.$$('.smp.social_music_player').classList.add('fullscreen');
    }


    /**
     *
     */
    onFullsreenClose() {
        DOM.$$('.smp.social_music_player').classList.remove('fullscreen');
    }


    /**
     *
     */
    onInitialize() {
        DOM.$$('.fullscreen_bar .close').addEventListener('click', event => {
            Event.fire(SYSTEM_EVENTS.FULLSCREEN_CLOSE);
        });
    }


    /**
     *
     */
    getTemplate() {
        return FullScreenBarHTML;
    }



    /**
     *
     */
    render() {
        return this.getTemplate();
    }

}

export default FullscreenController;