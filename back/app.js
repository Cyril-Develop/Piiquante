require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');

//Connection database
require('./mongo');

//Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet({
    crossOriginResourcePolicy: { policy: "same-site"}
  }));

//Routes
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;