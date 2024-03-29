const { Router } = require('express');
const { catchError, throwError } = require('../utils/errors');
const models = require('../models');

const router = Router();

const ERROR_WHERE = {
  create: (model) => `POST /api/dynamic/${model}`,
  edit: (model) => `PUT /api/dynamic/${model}/:_id`,
  paginate: (model) => `GET /api/dynamic/${model}`,
  get: (model) => `GET /api/dynamic/${model}/:_id`,
  delete: (model) => `DELETE /api/dynamic/${model}/:_id`,
};

const ERROR_MSG = {
  create: 'CREATE_FAILED',
  edit: 'EDIT_FAILED',
  notFound: 'NOT_FOUND',
  delete: 'DELETE_FAILED',
  modelNotFound: 'MODEL_NOT_FOUND',
};

const checkModel = (model, where) =>
  !models[model] && throwError(ERROR_MSG.modelNotFound, where, 404);

router.post('/:model', async (req, res) => {
  const { model } = req.params;
  try {
    checkModel(model, ERROR_WHERE.create(model));
    const doc = await new models[model](req.body).save();
    if (!doc) return throwError(ERROR_MSG.create, ERROR_WHERE.create(model), 400);
    res.status(200).json({ doc });
  } catch (error) {
    error.where = ERROR_WHERE.create(model);
    catchError(res, error);
  }
});

router.put('/:model/:_id', async (req, res) => {
  const { _id, model } = req.params;
  try {
    checkModel(model, ERROR_WHERE.edit(model));
    const doc = await models[model].findById(_id);
    if (!doc) return throwError(ERROR_MSG.notFound, ERROR_WHERE.get(model), 404);
    Object.assign(doc, req.body);
    await doc.save();
    res.status(200).json({ doc });
  } catch (error) {
    error.where = ERROR_WHERE.edit(model);
    catchError(res, error);
  }
});

router.get('/:model/:_id', async (req, res) => {
  const { _id, model } = req.params;
  try {
    checkModel(model, ERROR_WHERE.get(model));
    const doc = await models[model].findById(_id);
    if (!doc) return throwError(ERROR_MSG.notFound, ERROR_WHERE.get(model), 404);
    res.status(200).json({ doc });
  } catch (error) {
    error.where = ERROR_WHERE.get(model);
    catchError(res, error);
  }
});

router.get('/:model', async (req, res) => {
  const { model } = req.params;
  try {
    checkModel(model, ERROR_WHERE.paginate(model));
    const { rowsPerPage = '10', pageNumber = '0' } = req.query;
    const limit = Number(rowsPerPage) || 10;
    const skip = Number(rowsPerPage) * Number(pageNumber) || 0;
    const docs = await models[model].find().limit(limit).skip(skip);
    if (!docs) return throwError(ERROR_MSG.notFound, ERROR_WHERE.paginate(model), 404);
    res.status(200).json({ docs });
  } catch (error) {
    error.where = ERROR_WHERE.paginate(model);
    catchError(res, error);
  }
});

router.delete('/:model/:_id', async (req, res) => {
  const { _id, model } = req.params;
  try {
    checkModel(model, ERROR_WHERE.delete(model));
    const { deletedCount } = await models[model].deleteOne({ _id });
    if (!deletedCount) return throwError(ERROR_MSG.delete, ERROR_WHERE.delete(model), 400);
    res.sendStatus(200);
  } catch (error) {
    error.where = ERROR_WHERE.delete(model);
    catchError(res, error);
  }
});

module.exports = router;
