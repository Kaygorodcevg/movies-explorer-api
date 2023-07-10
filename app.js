require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const validationErrors = require('celebrate').errors;
const helmet = require('helmet');
const cors = require('cors');
const mainRouter = require('./routes/index');
const err = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');

const { DEV_PORT, DATABASE } = require('./utils/config');

const app = express();
const { PORT = 3005 } = process.env;

mongoose.connect(DATABASE || 'mongodb://0.0.0.0:27017/bitfilmsdb');

app.use(requestLogger);
app.use(limiter);
app.use(cookieParser());
app.use(helmet());
app.use(express.json());
app.use(cors(
  {
    origin: ['http://movie.project.nomoredomains.rocks', 'https://movie.project.nomoredomains.rocks', 'http://localhost:3001', 'http://localhost:3000', 'http://localhost:3005'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    preflightContinue: false,
    optionSuccessStatus: 200,
  },
));
app.use('/', mainRouter);
app.use(errorLogger);
app.use(validationErrors());
app.use(err);
app.listen(PORT || DEV_PORT);
