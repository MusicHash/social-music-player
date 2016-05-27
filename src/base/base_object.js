import Logger from '../utils/logger';
import _ from '../utils/__';

/**
 *
 */
class BaseObject {

    static create(params) {
        let $instance = new this();

        if (_.isFunction($instance.init)) {
            $instance.init(params);
        }

        return $instance;
    }


    /**
     * Constructor should not do anything, not arguments should be passed here.
     * Arguments are passed via init method only.
     */
    constructor() {
        this._setLogLevel('DEBUG'); //move out?!
        this.logger.debug(this.constructor.CLASS + ' CONSTRUCTOR CALLED');
    }


    /**
     */
    _setLogLevel(logLevel) {
        this.logger = new Logger(this.constructor.CLASS, logLevel);

        return this;
    }
}

export default BaseObject;