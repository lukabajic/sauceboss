require('dotenv').config();

module.exports = {
  mongoUrl: process.env.MONGO_URL,
  sessionName: process.env.SESSION_NAME,
  sessionSecret: process.env.SESSION_SECRET,
  googleClientId: process.env.GOOGLE_CLIENTID,
  googleClientSecret: process.env.GOOGLE_CLIENTSECRET,
  awsAccessKeyId: process.env.AWS_ACCESSKEYID,
  awsSecretAccessKey: process.env.AWS_SECRETACCESSKEY,
  awsRegion: process.env.AWS_REGION,
  emailAddressFrom: process.env.EMAIL_ADDRESS_FROM,
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
};
