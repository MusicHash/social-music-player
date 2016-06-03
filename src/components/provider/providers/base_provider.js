import BaseObject from '../../../base/base_object';
import _ from '../../../utils/__';
import Config from '../../../core/config';

/**
 *
 */
class BaseProvider extends BaseObject {
    static CLASS = 'BaseProvider';

    config = Config.create();

    render() {
        let el = document.createElement('div');
        el.id = BaseProvider.CLASS;
        el.innerHTML = '<div>Provider is has no rendering '+ BaseProvider.CLASS +'</div>';

        return el;
    }
}

export default BaseProvider;