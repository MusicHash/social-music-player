import _ from './__';


/**
 * DOM
 */
class DOM {
    $$(selector) {
        let el;

        if (this.isHTML(selector)) {
            el = this.htmlToHTMLElement(selector);
        } else {
             el = document.querySelectorAll(selector);
             el = el.length === 1 ? el[0] : el;
        }

        return el;
    }


    /**
     *
     * @param {String} HTML representing a single element
     * @return {HTMLElement}
     */
    htmlToHTMLElement(html) {
        var template = document.createElement('template');
        template.innerHTML = html;

        return template.content.firstChild;
    }


    /**
     * Getter for the body
     *
     * @returns {HTMLElement}
     */
    getBody() {
        return this.$$('body');
    }


    /**
     *
     * @param {String} input
     * @returns {Boolean}
     */
    isHTML(input) {
        let matchHTML = new RegExp('<([A-Za-z][A-Za-z0-9]*)\\b[^>]*>(.*?)</\\1>');

        return matchHTML.test(input);
    }


    /**
     *
     * @param {String} input
     * @returns {Boolean}
     */
    isID(input) {
        return 0 === input.search(/^#\w+$/);
    }

    /**
     * Appends an html element to another html element
     *
     * @param {HTMLElement} el
     * @param {HTMLElement} dst
     * @returns {DOM} Instance for chaning
     */
    append(el, dst) {
        if (!el || this.isHTML(el)) {
            el = this.$$(el);
        }

        if (!dst || !_.isElement(dst)) {
            console.log('Err, not a proper selector');
            return this;
        }



        dst.appendChild(el);

        return this;
    }

}

export default new DOM();