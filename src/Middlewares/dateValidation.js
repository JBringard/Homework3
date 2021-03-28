const Codes = require('http-status-codes');

const THREE_HUNDRED = 300;
const TEN = 10;
const ONE_THOUSAND = 1000;

const findDate = (search) => {
  let result = null;
  Object.keys(search).forEach((key) => {
    if (key.toLowerCase() === 'date-validation') {
      result = search[key];
    }
  });
  return result;
};

const validateDate = (date) => {
  const epochTime = Number.parseInt(date, TEN);
  const currEpochTime = Math.floor(Date.now() / ONE_THOUSAND);

  if (Number.isNaN(epochTime)) {
    return false;
  }

  if (epochTime >= currEpochTime - THREE_HUNDRED && epochTime <= currEpochTime + THREE_HUNDRED) {
    return true;
  }
  return false;
};

module.exports = (req, res, next) => {
  let queryDate = findDate(req.query);
  let headerDate = findDate(req.headers);

  if (queryDate === null) {
    queryDate = 'not given';
  } else if (!validateDate(queryDate)) {
    queryDate = 'invalid';
  }
  if (headerDate === null) {
    headerDate = 'not given';
  } else if (!validateDate(headerDate)) {
    headerDate = 'invalid';
  }

  if (queryDate === 'invalid' || headerDate === 'invalid') {
    res.status(Codes.StatusCodes.UNAUTHORIZED).send(Codes.ReasonPhrases.UNAUTHORIZED);
  } else if (queryDate !== 'not given' && headerDate !== 'not given' && (queryDate === headerDate)) {
    req.dateValidation = queryDate;
    next();
  } else if (queryDate !== 'not given' && headerDate === 'not given') {
    req.dateValidation = queryDate;
    next();
  } else if (headerDate !== 'not given' && queryDate === 'not given') {
    req.dateValidation = headerDate;
    next();
  } else {
    res.status(Codes.StatusCodes.UNAUTHORIZED).send(Codes.ReasonPhrases.UNAUTHORIZED);
  }
};
