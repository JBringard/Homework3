const Winston = require('winston');

const winstonLogger = Winston.createLogger({
  transports: [
    new Winston.transports.Console({
      format: Winston.format.simple(),
    }),
  ],
});

const log = (search) => {
  Object.keys(search).forEach((key) => {
    winstonLogger.info(`${key} ${search[key]}`);
  });
};
module.exports = (req, res, next) => {
  winstonLogger.info(Math.floor(Date.now() / 1000));
  winstonLogger.info(`Method: ${req.method}`);
  winstonLogger.info(`Original Url: ${req.originalUrl}`);
  winstonLogger.info('Body:');
  log(req.body);
  winstonLogger.info('Query Parameters:');
  log(req.query);
  winstonLogger.info('Headers:');
  log(req.headers);
  winstonLogger.info(`Date Validation: ${req.dateValidation}`);
  next();
};
