import BaseController from '../../base/base_controller';
import DOM from '../../utils/dom';
import PlayerMarkupHTML from './view/player_markup.html';

/**
 *
 */
class LayoutController extends BaseController {
    static CLASS = 'LayoutController';

    /**
     *
     */
    init(params) {
        this.logger.debug('LayoutController INIT fired');
    }


    getTemplate() {
        return PlayerMarkupHTML;
    }

    /**
     *
     */
    render() {
        return this.getTemplate();
    }

}

export default LayoutController;