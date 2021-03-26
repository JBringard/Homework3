/*
Gerard Bringard
NodeJS Homework 3
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
