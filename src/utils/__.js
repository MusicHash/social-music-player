class __ {
    /**
     * Determines if a reference is a `Number`.
     * 
     * @returns {boolean}
     */
    isNumber(input) {
        return 'number' === typeof input;
    }


    /**
     * Determines if a reference is a `Function`.
     * 
     * @returns {boolean}
     */
    isFunction(input) {
        return 'function' === typeof input;
    }


    /**
     * Determines if a reference is an `Object`. Unlike `typeof` in JavaScript, `null`s are not
     * considered to be objects. Note that JavaScript arrays are objects.
     * 
     * @returns {boolean}
     */
    isObject(input) {
        // http://jsperf.com/isobject4
        return input !== null && typeof input === 'object';
    }


    /**
     * Determines if a reference is defined.
     * 
     * @returns {boolean}
     */
    isDefined(input) {
        return 'undefined' !== typeof input;
    }


    /**
     * Determines if a reference is undefined.
     * 
     * @returns {boolean}
     */
    isDefined(input) {
        return 'undefined' !== typeof input;
    }


    /**
     * Determines if a value is a null object.
     *
     * @returns {boolean}
     */
    isNull(input) {
        return input === null;
    }


    /**
     * Determines if a value is a array.
     *
     * @returns {boolean}
     */
    isArray(expectedArray) {
        return Array.isArray(expectedArray);
    }


    /**
     * Determines if a value is a boolean.
     *
     * @returns {boolean}
     */
    isBoolean(input) {
        return 'boolean' === typeof input;
    }


    /**
     * Determines if a value is a string.
     *
     * @returns {boolean}
     */
    isString(input) {
        return 'string' === typeof input;
    }


    /**
     * Determines if a value is a element.
     *
     * @returns {boolean}
     */
    isElement(el) {
        try {
            return el instanceof HTMLElement;
        }
        catch (e) {
            return (this.isObject(el)) &&
                (el.nodeType === 1) && (this.isObject(el.style)) &&
                (this.isObject(el.ownerDocument));
        }
    }


    /**
     * @returns {*}
     */
    isFullScreen() {
        return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
    }
}

export default new __();