import BaseObject from '../../base/base_object';

/**
 *
 */
class LayoutController extends BaseObject {
    static CLASS = 'LayoutController';

    /**
     */
    constructor(params) {
        super(params);
        
        this.logger.debug('LayoutController constructor fired');
    }


}

export default LayoutController;