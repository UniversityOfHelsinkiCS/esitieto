const winston = require('winston');
const { format, transports } = winston;
const { consoleFormat } = require('winston-console-format');

const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    verbose: 3, // I only use this for "success" messages, because issues with padLevels.
    debug: 4,
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    verbose: 'green',
    info: 'white',
    debug: 'cyan',
  },
};

winston.addColors(customLevels.colors);

const level = process.env.LOGGING_LEVEL || 'debug';

const logger = winston.createLogger({
  levels: customLevels.levels,
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
    format.colorize({ all: true }),
    format.padLevels(), // Does NOT like custom message types.
    consoleFormat({
      showMeta: true,
      metaStrip: ['timestamp', 'service'],
      inspectOptions: {
        depth: Infinity,
        colors: true,
        maxArrayLength: Infinity,
        breakLength: 80,
        compact: Infinity,
      },
    })
  ),
  transports: [
    new transports.Console({
      level,
    }),
  ],
});


// Leaving temporarily here if someone wants to adjust the formats, otherwise nuke if you like
/*
logger.verbose('Verboosijäbä');
logger.error('Erroria');
logger.warn('Warnia');
logger.info('Infoa');
logger.debug('Debugia');
logger.debug('Debugging an object with multiple properties', {
  propertyOne: 'Value one',
  propertyTwo: 'Value two',
  nestedObject: {
    nestedPropertyOne: 'Nested value one',
    nestedPropertyTwo: 'Nested value two',
  },
});
*/

module.exports = logger;
