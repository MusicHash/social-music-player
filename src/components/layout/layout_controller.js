import BaseController from '../../base/base_controller';
import Config from '../../core/config';
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


    /**
     *
     */
    render() {
        console.log(PlayerMarkupHTML);
    }

}

export default LayoutController;