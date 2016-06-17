import BaseObject from './base_object';

/**
 *
 */
class BaseController extends BaseObject {

    /**
     *
     */
    ensurePromise(promisedFunc, assert) {
        let waitingForResponse = false,
            verifyResponseTimeout,
            executeAsyncAPI = callback => {
                promisedFunc.bind(this.getProvider())().then(response => {
                    if (assert(response))
                        return;

                    clearInterval(verifyResponseTimeout);

                    waitingForResponse = false;

                    callback(response);
                });
            };

        return new Promise((resolve, reject) => {
            waitingForResponse = true;

            // Seems like a bug. Some sort of racing condition. Promise is lost, no return and no error
            executeAsyncAPI(resolve);

            verifyResponseTimeout = setInterval(() => {
                if (true === waitingForResponse)
                    executeAsyncAPI(resolve);
            }, 250);
        });
    }
}

export default BaseController;