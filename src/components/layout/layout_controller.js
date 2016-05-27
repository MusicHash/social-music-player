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


    getTemplate() {
        return PlayerMarkupHTML;
    }

    /**
     *
     */
    render() {
        DOM.append(this.getTemplate(), DOM.$$(Config.el));

        console.log(PlayerMarkupHTML);
    }

}

export default LayoutController;