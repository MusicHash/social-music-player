/* eslint-enable no-unused-vars */
import _Logger from '../utils/logger';
import {SYSTEM_EVENTS} from '../events/events';
import BaseObject from '../base/base_object';
import Event from '../utils/event';
import LayoutController from '../components/layout/layout_controller';


/**
 *
 */
class Initialize extends BaseObject {
    static CLASS = 'Initialize';

    /**
     * 
     */
    constructor(params) {
        super(params);
        
        this.logger.debug('Initialize constructor fired');
        
        this.start();
    }
    

    start() {
        let layout = LayoutController.create();
        
    }

}

export default Initialize;