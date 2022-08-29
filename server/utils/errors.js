const ErrorLog = require('../models/ErrorLog');
const { serverError, validationError } = require('./mongo');

const createError = (msg, where, status) => {
  const error = new Error(msg);
  error.status = status;
  error.where = where;
  return error;
};

const logErorr = async (err) => {
  try {
    const status = err.status || 500;
    const error = err.message || err.toString();
    const obj = { status, error, where: err.where };
    await new ErrorLog(obj).save();
    return obj;
  } catch (error) {
    console.error('Error in: logErorr()');
    console.error(error);
  }
};

const throwError = (...args) => {
  throw createError(...args);
};

const saveError = async (...args) => logErorr(createError(...args));

const checkForMongoErr = (err) => {
  switch (err.name) {
    case 'MongoServerError':
      return serverError(err);
    case 'ValidationError':
      return validationError(err);
    default:
      return err;
  }
};

const catchError = async (res, err) => {
  const error = await logErorr(checkForMongoErr(err));
  return res.status(error.status).json(error);
};

module.exports = {
  createError,
  logErorr,
  saveError,
  throwError,
  catchError,
};
