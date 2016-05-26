import BaseObject from './base_object';


/**
 *
 */
class BaseSingleton extends BaseObject {
    /**
     */
    static $instance = null;


    static create(params) {
        if (_.isNull(this.$instance)) {
            this.$instance = new this(params);
            return this.$instance;
        }

        if (!params) {
            return this.$instance;
        }

        return this.$instance;
    }


    /**
     */
    constructor(params = {}) {
        super(params);
    }

}

export default BaseSingleton;