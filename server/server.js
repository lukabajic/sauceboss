const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
const setupGoogle = require('./google');
const { sessionName, sessionSecret, mongoUrl, port, nodeEnv } = require('./variables');
const dynamicRouter = require('./routes');
require('dotenv').config();

const portInUse = parseInt(port, 10) || 3000;
const dev = nodeEnv !== 'production';

mongoose.connect(mongoUrl);

const app = next({ dev });
const handle = app.getRequestHandler();

const sess = {
  name: sessionName,
  secret: sessionSecret,
  store: new MongoStore({
    mongoUrl,
    ttl: 14 * 24 * 60 * 60,
  }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 14 * 24 * 60 * 60 * 1000,
    domain: 'localhost',
  },
};

const rootUrl = `http://localhost:${portInUse}`;

app.prepare().then(() => {
  const server = express();

  server.use(session(sess));
  server.use(bodyParser.json());
  setupGoogle({ server, rootUrl });
  server.use('/api/dynamic', dynamicRouter);
  server.get('*', (req, res) => handle(req, res));

  server.listen(portInUse, () => {
    console.log(`> Ready on ${rootUrl}`);
  });
});
