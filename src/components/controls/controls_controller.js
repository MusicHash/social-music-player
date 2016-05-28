import BaseController from '../../base/base_controller';
import Config from '../../core/config';
import DOM from '../../utils/dom';
import PlayerMarkupHTML from './view/controls_markup.html';

/**
 *
 */
class ControlsController extends BaseController {
    static CLASS = 'ControlsController';

    _parentClass = '.smp_controller';

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

        DOM.append(this.getTemplate(), DOM.$$(this._parentClass));
    }

}

export default ControlsController;