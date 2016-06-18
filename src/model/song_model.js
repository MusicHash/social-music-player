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

    /**
     *
     */
    init(data) {
        // init defaults.
        _.merge(this, _DEFAULTS, data);
    }


    /**
    *
    */
    getID() {
        return this.id;
    }


    /**
     *
     */
    getTitle() {
        return this.title;
    }


    /**
     *
     */
    getProvider() {
        return this.provider;
    }


    /**
     *
     */
    getURL() {
        return this.PROVIDER_URL + this.getID();
    }
}

export default SongModel;