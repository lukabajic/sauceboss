exports.validationError = (err) => {
  if (err.message.includes('validation failed')) {
    if (err.message.includes('required')) {
      const arr = err.message.split(': ');
      return {
        message: `REQUIRED--${arr[[1]]}`,
        status: 400,
        where: err.where,
      };
    }

    if (err.message.includes('cast to')) {
      const words = err.message.split(' ');
      const field = words[words.length - 1].replace(/"/g, '');
      return {
        message: `VALIDATION_FAILED--${field}`,
        status: 400,
        where: err.where,
      };
    }
  }

  return err;
};

exports.serverError = (err) => {
  if (err.code === 11000)
    return {
      message: 'DUPLICATE_KEY',
      status: 409,
      where: err.where,
    };

  return err;
};
