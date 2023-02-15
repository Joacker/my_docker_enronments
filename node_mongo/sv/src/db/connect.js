const mongoose = require('mongoose');

function _connect() {
    const MONGO_HOST = 'mongo';
    const MONGO_DB = 'todo_db';
    const URI = `mongodb://${MONGO_HOST}/${MONGO_DB}`;
    mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(
         () => {
            console.log('Database connection successful')
        })
        .catch(err => {
            console.error('Database connection error => ', err)
        })
}

module.exports = _connect;