/*
Gerard Bringard
NodeJS Homework 3
 */

const Codes = require('http-status-codes');
const Express = require('express');
const BodyParser = require('body-parser');

const app = Express();

app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());

app.use((req, res, next) => {
  if (req.method === 'DELETE') {
    res.status(Codes.StatusCodes.METHOD_NOT_ALLOWED).send(Codes.ReasonPhrases.METHOD_NOT_ALLOWED);
  } else {
    next();
  }
});

app.all('/', (req, res) => {
  res.send('Hello World');
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(Codes.StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
});
app.listen(8080);
