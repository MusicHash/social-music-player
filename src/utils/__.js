/**
 * This providers helper methods for global utilities, named after Underscore.
 *
 * Cherry picked related things that matters here.
 */
class __ {

    /**
     * Injects isTypes on creation.
     */
    constructor() {
        this._initTypes();
    }


    /**
     * Is a given input equal to null?
     *
     * @param {*} input
     * @return {Boolean}
     */
    isNull(input) {
        return input === null;
    }


    /**
     * Is a given input an Array?
     *
     * @param {*} input
     * @return {Boolean}
     */
    isArray(expectedArray) {
        return Array.isArray(expectedArray);
    }


    /**
     * Is a given input a boolean?
     *
     * @param {*} input
     * @return {Boolean}
     */
    isBoolean(input) {
        return true === input || false === input || '[object Boolean]' === toString.call(input);
    }


    /**
     * Is a given input an HTMLEelement?
     *
     * @param {*} el of an HTMLElement
     * @return {Boolean}
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
     * Deep merges items from source into target, recursively, overrides if exists.
     *
     * @param {Object} target object.
     * @param {Object} source object.
     * @return {Object} Merged object.
     */
    merge(target, source) {
        // _mergeRecursive does the actual job with two arguments.
        let _mergeRecursive = (dst, src) => {
            if (!this.isObject(src) || this.isNull(src)) {
                return dst;
            }

            for (let p in src) {
                if (!src.hasOwnProperty(p) || this.isUnefined(src[p])) continue;

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
     * Check to see if a string is a valid url
     *
     * @param {String} url
     * @example http://www.smp.com // true
     * @see http://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-an-url
     * @return {Boolean}
     */
    isURL(url) {
      let pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
          '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

      return pattern.test(url);
    }


    /**
     * Given a seconds value, this function formats the seconds
     * to minutes:seconds format.
     *
     * @param {Number} sec - Seconds to convert to minutes.
     * @return {String} MINUTES:SECONDS format.
     */
    formatTime(sec) {
        sec = Math.round(sec);

        let minutes = Math.floor(sec / 60),
            seconds = sec - (minutes * 60);

        seconds = seconds < 10 ? '0' + seconds : seconds;

        return minutes + ':' + seconds;
    }


    /**
     * RegExp match, returns the first bit found.
     *
     * @param {Object} pattern
     * @param {String} string to match
     * @return {String} of the matched part
     */
    matchPattern(pattern, string) {
        return string.match(pattern) ? RegExp.$1 : false;
    }


    /**
     * Adds some isTypes methods to the class, called during instantiation.
     * Methods: isArguments, isFunction, isString, isNumber, isObject, isDate, isError, isSymbol, isUndefined.
     */
    _initTypes() {
        let types = ['Arguments', 'Function', 'String', 'Number', 'Object', 'Date', 'Error', 'Symbol', 'Undefined'];

        types.forEach((type) => {
            this['is'+ type] = function(typeName) {
                return input => {
                    return '[object '+ typeName +']' === toString.call(input);
                };
            }(type);
        });
    }
}

export default new __();