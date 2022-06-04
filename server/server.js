const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const User = require('./models/User');

require('dotenv').config();

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';

mongoose.connect(process.env.MONGO_URL);

const app = next({ dev });
const handle = app.getRequestHandler();

const sess = {
  name: process.env.SESSION_NAME,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    mongoUrl: process.env.MONGO_URL,
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

app.prepare().then(() => {
  const server = express();

  server.use(session(sess));

  server.get('/', async (req, res) => {
    // const user = { email: 'team@builderbook.org' };
    const user = await User.findOne({ slug: 'team-builder-book' });
    app.render(req, res, '/', { user });
  });

  server.get('*', (req, res) => handle(req, res));

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
