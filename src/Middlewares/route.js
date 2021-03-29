const Codes = require('http-status-codes');
const Express = require('express');

const router = Express.Router();

const MAX = 10;
const MIN = 1;
const ZERO = 0;
const ONE = 1;
const TWO = 2;

function getRandomNumber() {
  return Math.floor(Math.random() * (MAX - MIN + ONE) + MIN);
}

router.all('/', (req, res) => {
  if (getRandomNumber() % TWO === ZERO) {
    res.status(Codes.StatusCodes.OK).send('Hello World');
  } else {
    throw Error('Oops');
  }
});

module.exports = router;
