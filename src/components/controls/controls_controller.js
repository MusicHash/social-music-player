import Event from 'event-emitter-js';
import BaseController from '../../base/base_controller';
import Config from '../../core/config';
import {SYSTEM_EVENTS} from '../../constants/events';
import DOM from '../../utils/dom';
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

}

export default ControlsController;