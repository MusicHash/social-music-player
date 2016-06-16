class __ {
    /**
     * Determines if a reference is a `Number`.
     *
     * @returns {Boolean}
     */
    isNumber(input) {
        return 'number' === typeof input;
    }


    /**
     * Determines if a reference is a `Function`.
     *
     * @returns {Boolean}
     */
    isFunction(input) {
        return 'function' === typeof input;
    }


    /**
     * Determines if a reference is an `Object`. Unlike `typeof` in JavaScript, `null`s are not
     * considered to be objects. Note: that JavaScript arrays are objects.
     *
     * @see http://jsperf.com/isobject4
     * @returns {Boolean}
     */
    isObject(input) {
        return input && 'object' === typeof input && !Array.isArray(input) && null !== input;
    }


    /**
     * Determines if a reference is defined.
     *
     * @returns {Boolean}
     */
    isDefined(input) {
        return 'undefined' !== typeof input;
    }


    /**
     * Determines if a reference is undefined.
     *
     * @returns {Boolean}
     */
    isDefined(input) {
        return 'undefined' !== typeof input;
    }


    /**
     * Determines if a value is a null object.
     *
     * @returns {Boolean}
     */
    isNull(input) {
        return input === null;
    }


    /**
     * Determines if a value is a array.
     *
     * @returns {Boolean}
     */
    isArray(expectedArray) {
        return Array.isArray(expectedArray);
    }


    /**
     * Determines if a value is a boolean.
     *
     * @returns {Boolean}
     */
    isBoolean(input) {
        return 'boolean' === typeof input;
    }


    /**
     * Determines if a value is a string.
     *
     * @returns {Boolean}
     */
    isString(input) {
        return 'string' === typeof input;
    }


    /**
     * Determines if a value is a element.
     *
     * @returns {Boolean}
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
     * Deep merges unlimited numbers of Objects
     *
     * @param {Object} target
     * @param {Object} source
     * @returns {Object}
     */
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
     * Determines if the user enter the browser in full screen mode.
     *
     * @returns {Boolean}
     */
    isFullScreen() {
        return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
    }


    /**
     *
     *
     * @see http://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-an-url
     * @returns {Boolean}
     */
    isURL(str) {
      let pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
          '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

      return pattern.test(str);
    }


    /**
     *
     */
    formatTime(sec) {
        sec = Math.round(sec);

        let minutes = Math.floor(sec / 60),
            seconds = sec - (minutes * 60);

        seconds = seconds < 10 ? '0' + seconds : seconds;

        return minutes + ':' + seconds;
    }
}

export default new __();