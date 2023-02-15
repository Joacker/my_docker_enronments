const mongoose = require('mongoose');

require('../models/users');

function getModelByName(name) {
    return mongoose.model(name);
}

module.exports = getModelByName;