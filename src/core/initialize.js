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


    LAYOUT = LayoutController.create();
    CONTROLS = ControlsController.create();
    PROVIDER = ProviderController.create();


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
        let config = Config.create();

        DOM.append(this.LAYOUT.render(), DOM.$$(config.el));
        DOM.append(this.CONTROLS.render(), DOM.$$(ControlsController.selectorClass));
        DOM.append(this.PROVIDER.render(), DOM.$$(ProviderController.selectorClass));

        return this;
    }

}

export default Initialize;