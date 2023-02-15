const mongoose = require('mongoose');

function _connect() {
    const URI = `mongodb://${process.env.MONGO_HOST}/${process.env.MONGO_DB}`;
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