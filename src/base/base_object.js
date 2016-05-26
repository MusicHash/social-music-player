import Logger from '../utils/logger';
import _ from '../utils/__';

/**
 *
 */
class BaseObject {
    
    static create(params) {
        return new this(params);
    }


    /**
     *
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