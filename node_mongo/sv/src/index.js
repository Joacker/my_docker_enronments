const express = require('express');
const morgan = require('morgan');
const _connect = require('./db/connect');

// mongo connection
_connect();

const app = express()

app.use(morgan('dev'));

app.listen(3000);

console.log('Server on port 3000');
