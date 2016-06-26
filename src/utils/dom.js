import _ from './__';


/**
 * DOM
 */
class DOM {


    /**
     * jQuery like selector type, $$ for double the fun.
     *
     * @param {String} selector ID, className or a html structure string.
     * @param {Object} Selector's context, able to .find inside HTMLElements to narrow results.
     * @return {HTMLElement|[]}
     */
    $$(selector, context) {
        context = context || document;

        let el;

        if (this.isHTML(selector)) {
            el = this.htmlToHTMLElement(selector);
        } else {
             el = context.querySelectorAll(selector);
             el = el.length === 1 ? el[0] : el;
        }

        return el;
    }


    /**
     * Creates a new DOMElement with properties.
     *
     * @param {String} tag - HTML tag name to create.
     * @param {Object} properties - HTML propreties to apply.
     * @param {Object} attributes - HTML attributes to apply.
     */
    createEl(tag = 'div', properties = {}, attributes = {}) {
        let el  = document.createElement(tag);

        // assign properties.
        Object.getOwnPropertyNames(properties).forEach(propertyName => {
            let property = properties[propertyName];
            el[propertyName] = property;
        });

        // assign attributes.
        Object.getOwnPropertyNames(properties).forEach(attributeName => {
            let attribute = properties[attributeName];
            el.setAttribute(attributeName, attribute);
        });

        return el;
    }


    /**
     * Converts HTMLString to HTMLElement.
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
     * @return {HTMLElement}
     */
    getBody() {
        return this.$$('body');
    }


    /**
     * Check whether the string input is in an valid XML/HTML format.
     *
     * @param {String} input
     * @return {Boolean}
     */
    isHTML(input) {
        let matchHTML = new RegExp('<([A-Za-z][A-Za-z0-9]*)\\b[^>]*>(.*?)</\\1>');

        return matchHTML.test(input);
    }


    /**
     * Appends an html element to another html element.
     *
     * @param {HTMLElement} el
     * @param {HTMLElement} dst
     * @return {DOM} Instance for chaning
     */
    append(el, dst) {
        if (!dst || !_.isElement(dst)) {
            console.log('Err, not a proper selector');
            return this;
        }

        if (_.isArray(el)) {
            for (let i = 0, len = el.length; i < len; i++) {
                this.append(el[i], dst);
            }

            return this;
        }

        if (!el || this.isHTML(el)) {
            el = this.$$(el);
        }

        dst.appendChild(el);

        return this;
    }


    /**
     * Getter for a selectors physical dimensions.
     *
     * @param {String} selector to locate
     * @return {Object}
     */
    getDimensions(selector) {
        let style = this.getStyle(selector);

        return {
            width: Number(style.width.replace('px', '')),
            height: Number(style.height.replace('px', ''))
        };
    }


    /**
     * Getter for a selector's computed style.
     *
     * @param {String} selector to locate
     * @return {Object|null} ComputedStyle properties of the selector
     */
    getStyle(selector) {
        if (0 === this.$$(selector).length) {
            console.log(['ERROR: selector was not found.', selector]);
            return;
        }
        return window.getComputedStyle(this.$$(selector));
    }

}

export default new DOM();