const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
        //Sirve para eliminar los esapcios en blanco al inicio y al final
        trim: true,
    },
    lastname: {
        type: String,
        required: true,
        //Sirve para eliminar los esapcios en blanco al inicio y al final
        trim: true,
    },
    emailVerified: {
        type: Boolean,
        default: false,
    }
});

mongoose.model('user', userSchema, 'users');