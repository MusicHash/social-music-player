import _Logger from '../utils/logger';
import {SYSTEM_EVENTS} from '../constants/events';
import BaseObject from '../base/base_object';
import Event from '../utils/event';
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


    /**
     *
     */
    init(params) {
        console.log('init called??');
        Config.create(params);

        this.start();
    }


    /**
     *
     */
    start() {
        this.logger.debug('Initialize start fired');

        this.layoutRender();
    }


    /**
     *
     */
    layoutRender() {
        let config = Config.create(),
            layout = LayoutController.create(),
            controls = ControlsController.create(),
            provider = ProviderController.create();

        DOM.append(layout.render(), DOM.$$(config.el));
        DOM.append(controls.render(), DOM.$$(ControlsController.selectorClass));
        DOM.append(provider.render(), DOM.$$(ProviderController.selectorClass));

        return this;
    }

}

export default Initialize;