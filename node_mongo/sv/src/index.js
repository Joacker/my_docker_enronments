const express = require('express');
const morgan = require('morgan');
const _connect = require('./db/connect');
const bodyParser = require('body-parser');
const userRouter = require('./routes/userRouter');    

require('dotenv').config();
// mongo connection
_connect();

const app = express()

app.use(morgan('dev'));

// Routes
app.use('/account', userRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});