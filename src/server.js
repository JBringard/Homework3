/*
Gerard Bringard
NodeJS Homework 3
This program takes a request and sends it
through middlewares. The body is parsed to
json, then the verb used is checked to see
if it was DELETE. Then we validate the request
by checking a "date-validation" field. Then we
log the request using winston, and then we have
a 50/50 chance of getting "Hello World" or throwing
an error which is caught by the custom error handler.
 */

const Express = require('express');
const BodyParser = require('body-parser');
const BlockDelete = require('./Middlewares/blockDelete');
const ErrorHandler = require('./Middlewares/errorHandler');
const RandomResponse = require('./Middlewares/randomResponse');
const Logging = require('./Middlewares/logging');
const DateValidation = require('./Middlewares/dateValidation');

const app = Express();

app.use(BodyParser.urlencoded({ extended: true }));

app.use(BodyParser.json());

app.use(BlockDelete);

app.use(DateValidation);

app.use(Logging);

app.use(RandomResponse);

app.use(ErrorHandler);

app.listen(8080);
