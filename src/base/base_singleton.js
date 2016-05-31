import BaseObject from './base_object';
import _ from '../utils/__';

/**
 *
 */
class BaseSingleton extends BaseObject {
    /**
     *
     */
    static $instance = null;


    static create(params) {
        if (!_.isNull(this.$instance))
            return this.$instance;

        this.$instance = new this();

        if (_.isFunction(this.$instance.init))
            this.$instance.init(params);

        return this.$instance;
    }


    /**
     */
    constructor(params = {}) {
        super(params);
    }

}

export default BaseSingleton;