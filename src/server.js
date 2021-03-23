/*
Gerard Bringard
NodeJS Homework 3
 */

const Codes = require('http-status-codes');
const Winston = require('winston');
const expressWinston = require('express-winston');
const Express = require('express');
const BodyParser = require('body-parser');

const app = Express();

const winstonLogger = Winston.createLogger({
  transports: [
    new Winston.transports.Console({
      format: Winston.format.simple(),
    }),
  ],
});

function getRandomNumber() {
  return Math.floor(Math.random() * (10 - 1 + 1) + 1);
}

app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());

app.use((req, res, next) => {
  if (req.method === 'DELETE') {
    res.status(Codes.StatusCodes.METHOD_NOT_ALLOWED).send(Codes.ReasonPhrases.METHOD_NOT_ALLOWED);
  } else {
    next();
  }
});

app.use((req, res, next) => {
  winstonLogger.info(req.method);
  winstonLogger.info(req.originalUrl);
  winstonLogger.info(req.body);
  winstonLogger.info(req.params.toString());
  winstonLogger.info(req.headers.toString());
  winstonLogger.info(req.dateValidation);
  next();
});

app.all('/', (req, res) => {
  if (getRandomNumber() % 2 === 0) {
    res.status(Codes.StatusCodes.OK).send('Hello World');
  } else {
    throw Error('Oops');
  }
});

app.use((err, req, res, next) => {
  res.status(Codes.StatusCodes.INTERNAL_SERVER_ERROR).send(`We're sorry, the error was: ${err.message}`);
});

app.listen(8080);
