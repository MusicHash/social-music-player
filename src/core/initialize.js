import Event from 'event-emitter-js';
import _Logger from '../utils/logger';
import {SYSTEM_EVENTS} from '../constants/events';
import BaseObject from '../base/base_object';
import DOM from '../utils/dom';
import Config from './config';
import LayoutController from '../components/layout/layout_controller';
import ControlsController from '../components/controls/controls_controller';
import ProviderController from '../components/provider/provider_controller';


/**
 *
 */
class Initialize extends BaseObject {
    static CLASS = 'Initialize';


    LAYOUT = LayoutController.create();
    CONTROLS = ControlsController.create();
    PROVIDER = ProviderController.create();


    /**
     *
     */
    init(params) {
        Config.create(params);
    }


    /**
     *
     */
    layoutRender() {
        let config = Config.create();

        DOM.append(this.LAYOUT.render(), DOM.$$(config.elID));
        DOM.append(this.CONTROLS.render(), DOM.$$(ControlsController.selectorClass));
        DOM.append(this.PROVIDER.render(), DOM.$$(ProviderController.selectorClass));

        Event.fire(SYSTEM_EVENTS.PLAYER_INITIALIZED);

        return this;
    }

}

export default Initialize;