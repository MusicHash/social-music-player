/* eslint-enable no-unused-vars */
import _Logger from '../utils/logger';
import {SYSTEM_EVENTS} from '../events/events';
import BaseObject from '../base/base_object';
import Event from '../utils/event';
import Config from './config';
import LayoutController from '../components/layout/layout_controller';


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
    

    start() {
        this.logger.debug('Initialize start fired');
        let layout = LayoutController.create();
        Config.create();
    }

}

export default Initialize;