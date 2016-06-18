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
    PROVIDER = ProviderController.create();


    /**
     *
     */
    init(params) {
        this.config = Config.create(params);
    }


    /**
     *
     */
    layoutRender() {
        this._renderLayout()
            ._renderProvider()
            ._renderControls();

        Event.fire(SYSTEM_EVENTS.PLAYER_INITIALIZED);

        return this;
    }


    /**
     *
     */
    _renderLayout() {
        DOM.append(this.LAYOUT.render(), DOM.$$(this.config.elID));

        return this;
    }


    /**
     *
     */
    _renderProvider() {
        DOM.append(this.PROVIDER.render(), DOM.$$(ProviderController.selectorClass));

        DOM.$$(this.config.elID).style.width = this.config.width;
        DOM.$$(this.config.elID).style.height = this.config.height;

        return this;
    }


    /**
     *
     */
    _renderControls() {
        if (true !== this.config.controls) return this;

        DOM.append(ControlsController.create().render(), DOM.$$(ControlsController.selectorClass));

        return this;
    }

}

export default Initialize;