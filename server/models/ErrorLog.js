const mongoose = require('mongoose');

const { Schema } = mongoose;

const mongoSchema = new Schema(
  {
    message: {
      type: String,
      required: false,
    },
    statusCode: {
      type: Number,
      required: false,
    },
    where: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

const ErrorLog = mongoose.model('ErrorLog', mongoSchema);

module.exports = ErrorLog;
