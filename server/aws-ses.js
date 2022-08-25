const aws = require('aws-sdk');
const { awsRegion, awsAccessKeyId, awsSecretAccessKey } = require('./variables');
const { logErorr } = require('./utils/errors');

const ses = new aws.SES({
  apiVersion: 'latest',
  region: awsRegion,
  accessKeyId: awsAccessKeyId,
  secretAccessKey: awsSecretAccessKey,
});

module.exports = async (options) => {
  try {
    const result = await ses
      .sendEmail({
        Destination: {
          ToAddresses: options.to,
        },
        Message: {
          Body: options.body,
          Subject: options.subject,
        },
        Source: options.from,
        ReplyToAddresses: [options.replyTo],
      })
      .promise();
    console.log('result', result);
  } catch (error) {
    error.where = 'sendEmail';
    logErorr(error);
  }
};
