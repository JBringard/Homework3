const Codes = require('http-status-codes');
const Express = require('express');

const router = Express.Router();

function getRandomNumber() {
  return Math.floor(Math.random() * (10 - 1 + 1) + 1);
}

router.all('/', (req, res) => {
  if (getRandomNumber() % 2 === 0) {
    res.status(Codes.StatusCodes.OK).send('Hello World');
  } else {
    throw Error('Oops');
  }
});

module.exports = router;
