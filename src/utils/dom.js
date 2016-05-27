import _ from './__';


/**
 * DOM
 */
class DOM {
    $$(selector) {
        return document.querySelectorAll(selector);
    }


    /**
     * Getter for the body
     *
     * @returns {HTMLElement}
     */
    getBody() {
        return document.getElementsByTagName('body')[0];
    }


    /**
     * Appends an html element to another html element
     *
     * @param {HTMLElement} el
     * @param {HTMLElement} dst
     * @returns {DOM} Instance for chaning
     */
    append(el, dst) {
        if (!dst || !_.isElement(dst)) {
            return this;
        }

        if (!el || !_.isElement(el)) {
            return this;
        }

        dst.appendChild(el);

        return this;
    }

}

export default new DOM();