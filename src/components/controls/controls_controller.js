import BaseController from '../../base/base_controller';
import Config from '../../core/config';
import DOM from '../../utils/dom';
import PlayerMarkupHTML from './view/controls_markup.html';

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
    }


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