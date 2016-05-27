var logger = require('js-logger');
logger.useDefaults();

/**
 * Logger entry for clientside server log
 */
class Logger {
    _loggerInstance;

    /**
     * 
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
     */
    constructor(name, level) {
        this._loggerInstance = logger.get(name);
        this._loggerInstance.setLevel(Logger.LOG_LEVEL(level));
    }


    /**
     * Fatal errors. Mission critical - application can not run properly when present.
     */
    error(...log) {
        return this._log('error', log);
    }


    /**
     * Warning only. Should be fixed but application been able to recover.
     */
    warn(...log) {
        return this._log('warn', log);
    }


    /**
     * Information only. General info printed.
     */
    info(...log) {
        return this._log('info', log);
    }


    /**
     * Debug mode. Print as much as possible to allow quick and easy debugging when needed.
     */
    debug(...log) {
        return this._log('debug', log);
    }


    /**
     * ULTRA Debug mode, almost silly to use. Print as much as possible to allow quick and easy debugging when needed.
     * But very useful debugging, should contain ALOT of prints via this method.
     */
    silly(...log) {
        return this._log('silly', log);
    }


    /**
     * Private method, provides single point of access to the "console.log" API.
     * Prevents mess around the code and a clean way to prevent the output of the log or the severity level.
     */
    _log(severity, log) {
        if (!this.isConsoleEnabled(severity)) {
            return;
        }

        this._loggerInstance[severity](log);
        // console[severity]([severity, log.join(', ')]); // eslint-disable-line no-console
    }


    /**
     * Checks that console is globally defined and able to use it to print out log data to it.
     */
    isConsoleEnabled(severity) {
        return 'undefined' !== typeof console && 'undefined' !== typeof console[severity]; // eslint-disable-line no-console
    }
}

export default Logger;