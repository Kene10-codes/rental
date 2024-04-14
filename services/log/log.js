const winston = require('winston')

// LOGGER FUNCTION
module.exports = function () {
    const logger = winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        defaultMeta: { service: 'user-service' },
        transports: [
            new winston.transports.Console({
                colorize: true,
                prettyPrint: true,
            }),
            new winston.transports.File({
                filename: 'error.log',
                level: 'error',
            }),
        ],
    })

    // CATCH UNCAUGHT EXCEPTIONS
    process.on('uncaughtException', (ex) => logger.error(ex.message))

    // CATCH PROMISE BASED ERRORS
    process.on('unhandledRejection', (ex) => logger.error(ex.message))

    if (process.env.NODE_ENV !== 'prodction') {
        logger.add(
            new winston.transports.Console({
                colorize: true,
                prettyPrint: true,
            })
        )
    }

    return logger
}
