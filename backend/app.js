const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middlewares/errorHandler');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const { globalLimiter } = require('./utils/rateLimiters');
const notFound = require('./middlewares/notFound');

const app = express();

// Security Middlewares
app.use(helmet({
     crossOriginResourcePolicy: false,
}));
app.use(cors({
  origin: process.env.CLIENT_URL, 
  credentials: true
}));
app.use(globalLimiter);

// Body Parser and Cookies
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/users', userRoutes);
app.use('/images', express.static('public/images'))
app.use('/products', productRoutes); 


// 404 Handler
app.use(notFound); 

// Error Handler
app.use(errorHandler);

module.exports = app;
