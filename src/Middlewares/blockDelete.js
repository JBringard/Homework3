const Codes = require('http-status-codes');

module.exports = (req, res, next) => {
  if (req.method === 'DELETE') {
    res.status(Codes.StatusCodes.METHOD_NOT_ALLOWED).send(Codes.ReasonPhrases.METHOD_NOT_ALLOWED);
  } else {
    next();
  }
};
