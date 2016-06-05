import BaseSingleton from '../../base/base_singleton';
import Event from 'event-emitter-js';

import {SYSTEM_EVENTS} from '../../constants/events';
import {PLAYER_STATE} from '../../constants/state';


/**
 *
 */
class ProviderState extends BaseSingleton {
    static CLASS = 'ProviderState';

}

export default ProviderState;