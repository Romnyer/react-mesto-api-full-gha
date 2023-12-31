require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const hemlet = require('helmet');
const rateLimit = require('express-rate-limit');

// Environment vars
const { PORT = 3000 } = process.env;

// Request limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Function imports
const router = require('./routes/index');
const errorCatcher = require('./middlewares/errorCatcher');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

// Safety
app.use(hemlet());
app.use(limiter);
app.use(cors());

// Connect to data base
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {});

// Parser
app.use(express.json());

// Request logging
app.use(requestLogger);

// Crash test
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// Routing
app.use('/', router);

// Error logging
app.use(errorLogger);

// Errors catch middlewares
app.use(errors());
app.use(errorCatcher);

// Set port
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
