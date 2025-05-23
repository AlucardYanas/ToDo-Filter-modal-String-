const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const cors = require('cors');
const cardsRouter = require('./router/cardsrouter'); // Импортируем маршрутизатор для карт

const app = express();

// Enable compression for all responses
app.use(compression());

// Add caching headers
app.use((req, res, next) => {
  // Cache static assets for 1 day
  if (req.url.match(/\.(css|js|jpg|jpeg|png|gif|ico|woff2)$/)) {
    res.setHeader('Cache-Control', 'public, max-age=86400');
  } else {
    // Cache API responses for 5 minutes
    res.setHeader('Cache-Control', 'public, max-age=300');
  }
  next();
});

// Enable CORS with specific options
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),
);

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger
app.use(morgan('dev'));

app.use('/api/cards', cardsRouter);

module.exports = app;
