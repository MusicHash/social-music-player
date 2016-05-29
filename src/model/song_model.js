import BaseModel from '../base/base_model';
import _ from '../utils/__';

let _DEFAULTS = {
    id: '',
    title: ''
};

/**
 *
 */
class SongModel extends BaseModel {
    static CLASS = 'SongModel';

    init(data) {
        // init defaults.
        _.merge(this, _DEFAULTS, data);
    }
}

export default SongModel;