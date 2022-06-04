const express = require('express');
const next = require('next');
const mongoose = require('mongoose');

const User = require('./models/User');

require('dotenv').config();

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';

mongoose.connect(process.env.MONGO_URL);

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

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
