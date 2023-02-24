'use strict';
const express = require('express');
const morgan = require('morgan');
const _connect = require('./db/connect');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRouter');
const { isAuthenticated } = require('./middlewares');  

require('dotenv').config();
// mongo connection
_connect();

const app = express()

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(isAuthenticated);

// Routes
app.use('/account', userRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});