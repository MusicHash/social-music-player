/**
 * DOM
 */
class DOM {
    $$(selector) {
        return document.querySelectorAll(selector);
    }

}

export default new DOM();