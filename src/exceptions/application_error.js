/**
 * Application Error, generic error catcher
 */
class ApplicationError {
    
    static CLASS = 'ApplicationError';


    /**
     * @param params
     * @returns {ApplicationError}
     */
    static create(params) {
        return new this(params);
    }


    /**
     * @param params
     */
    constructor(params) {}


    /**
     * Global error binder
     */
    onGlobalError() {
        window.onerror = (msg, url, lineNumber, columnNumber, error) => {
            console.error('Error: ' + msg + ' Script: ' + url + ' Line: ' + lineNumber
                + ' Column: ' + columnNumber + ' StackTrace: ' +  error);
        }
    }
}

export default ApplicationError;