const express = require('express');
const bodyParser = require('body-parser');
const ethRouter = require('./routes/ethRouter');
const helmet = require('helmet');

const app = express();

app.use(helmet({ crossOriginEmbedderPolicy: false, contentSecurityPolicy: false }));

const apiPort = 3001;

let session = require('express-session')({
  secret: 'csc301-savifinance',
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: false, //testing
    maxAge: 1000 * 60 * 30, // testing: 30 minutes
  },
});
app.use(session);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', ethRouter);

app.use('/', express.static('src/views'));
app.use('*', express.static('src/views'));
app.use('/*', express.static('src/views'));

app.listen(apiPort, () => console.log(`Server listening at http://localhost:${apiPort}`));

module.exports = app;
