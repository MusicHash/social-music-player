import BaseController from '../../base/base_controller';
import DOM from '../../utils/dom';
import FullScreenBarHTML from './view/fullscreen_bar.html';

/**
 *
 */
class FullscreenController extends BaseController {
    static CLASS = 'FullscreenController';
    static selectorClass = '.smp_fullscreen';

    /**
     *
     */
    init(params) {
        this.logger.debug('FullscreenController INIT fired');
    }


    getTemplate() {
        return FullScreenBarHTML;
    }

    /**
     *
     */
    render() {
        return this.getTemplate();
    }

}

export default FullscreenController;