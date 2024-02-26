require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

//Connection database
require('./mongo');

//Middleware
const corsOptions = {
    origin: 'http://localhost:5173'
  };
  
app.use(cors(corsOptions));

app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
  });
  
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());

//Middleware to limit the amount of request done
const limiter = rateLimit({
  window: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

//Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

app.use('/piiquante/api/auth', authRoutes);
app.use('/piiquante/api/user', userRoutes);
app.use('/piiquante/api/sauces', sauceRoutes);
app.use('/piiquante/api/images', express.static(path.join(__dirname, 'images')));

module.exports = app;