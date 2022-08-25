const mongoose = require('mongoose');

const { Schema } = mongoose;

const mongoSchema = new Schema(
  {
    error: {
      type: String,
      required: false,
    },
    status: {
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
