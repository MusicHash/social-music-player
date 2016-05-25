import Logger from '../utils/logger';
import _ from '../utils/__';

/**
 *
 */
class BaseObject {

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

        this.$instance._setLogLevel(params.logLevel);

        return this.$instance;
    }


    /**
     */
    constructor(params = {}) {
        this._setLogLevel(params.logLevel || 'INFO');
    }


    /**
     */
    _setLogLevel(logLevel) {
        if (!logLevel) {
            return this;
        }

        this.logger = new Logger(this.constructor.CLASS, logLevel);
        
        return this;
    }
}

export default BaseObject;