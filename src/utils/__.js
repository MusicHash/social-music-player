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
     * @see http://jsperf.com/isobject4
     * @returns {boolean}
     */
    isObject(input) {
        return input && 'object' === typeof input && !Array.isArray(input) && null !== input;
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


    merge(target, source) {
        // _mergeRecursive does the actual job with two arguments.
        let _mergeRecursive = (dst, src) => {
            if (!this.isObject(src) || this.isNull(src)) {
                return dst;
            }

            for (let p in src) {
                if (!src.hasOwnProperty(p) || !this.isDefined(src[p])) continue;

                if (!this.isObject(src[p]) || this.isNull(src[p])) {
                    dst[p] = src[p];
                } else
                if (!this.isObject(dst[p]) || this.isNull(dst[p])) {
                    dst[p] = _mergeRecursive(this.isArray(src[p].constructor) ? [] : {}, src[p]);
                } else {
                    _mergeRecursive(dst[p], src[p]);
                }
            }

            return dst;
        }

        // Loop through arguments and merge them into the first argument.
        let out = arguments[0];
        if (!this.isObject(out) || this.isNull(out)) return out;

        for (let i=1, len = arguments.length; i < len; i++) {
            _mergeRecursive(out, arguments[i]);
        }

        return out;
    }


    /**
     * @returns {*}
     */
    isFullScreen() {
        return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
    }
}

export default new __();