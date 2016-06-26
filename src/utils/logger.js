var logger = require('js-logger');
logger.useDefaults();

/**
 * Logger entry for clientside server log
 */
class Logger {
    _loggerInstance;

    /**
     * Mapper function converts the desired log string to the proper constant provided by the js-logger lib.
     *
     * @param {String} level - for the log level, in text.
     * @return {String} Referance for the log level by js-logger.
     */
    static LOG_LEVEL(level = 'DEBUG') {
        switch (level.toString().toUpperCase()) {
            case 'OFF':
                return logger.OFF;

            case 'DEBUG':
                return logger.DEBUG;

            case 'INFO':
                return logger.INFO;

            case 'WARN':
                return logger.WARN;

            case 'ERROR':
            default:
                return logger.ERROR;
        }
    }


    /**
     * Creates an instance of the logger, with a specific name and log level.
     *
     * @param {String} name of a class or any other name.
     * @param {String} level of the log that is expected to report.
     */
    constructor(name, level) {
        this._loggerInstance = logger.get(name);
        this._loggerInstance.setLevel(Logger.LOG_LEVEL(level));
    }


    /**
     * Fatal errors. Mission critical - application can not run properly when present.
     *
     * @param {*} log description.
     * @return {Logger} this.
     */
    error(...log) {
        return this._log('error', log);
    }


    /**
     * Warning only. Should be fixed but application been able to recover.
     *
     * @param {*} log description.
     * @return {Logger} this.
     */
    warn(...log) {
        return this._log('warn', log);
    }


    /**
     * Information only. General info printed.
     *
     * @param {*} log description.
     * @return {Logger} this.
     */
    info(...log) {
        return this._log('info', log);
    }


    /**
     * Debug mode. Print as much as possible to allow quick and easy debugging when needed.
     *
     * @param {*} log description.
     * @return {Logger} this.
     */
    debug(...log) {
        return this._log('debug', log);
    }


    /**
     * ULTRA Debug mode, almost silly to use. Print as much as possible to allow quick and easy debugging when needed.
     * But very useful debugging, should contain ALOT of prints via this method.
     *
     * @param {*} log description.
     * @return {Logger} this.
     */
    silly(...log) {
        return this._log('silly', log);
    }


    /**
     * Private method, provides single point of access to the "console.log" API.
     * Prevents mess around the code and a clean way to prevent the output of the log or the severity level.
     *
     * @param {String} severity log level
     * @param {*} log description.
     * @return {Logger} this.
     */
    _log(severity, log) {
        if (!this.isConsoleEnabled(severity)) {
            return;
        }

        this._loggerInstance[severity](log);
        // console[severity]([severity, log.join(', ')]); // eslint-disable-line no-console

        return this;
    }


    /**
     * Checks that console is globally defined and able to use it to print out log data to it.
     *
     * @param {String} severity
     * @return {Boolean} Enabled if console exists on window.
     */
    isConsoleEnabled(severity) {
        return 'undefined' !== typeof console && 'undefined' !== typeof console[severity]; // eslint-disable-line no-console
    }
}

export default Logger;