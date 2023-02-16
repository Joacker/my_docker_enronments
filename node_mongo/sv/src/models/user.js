const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isValidEmail } = require('../helpers');

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

userSchema.statics.signup = signup;

mongoose.model('user', userSchema, 'users');

function signup(userInfo){
    if(!userInfo.email || !isValidEmail(userInfo.email)) throw new Error('Email is invalid');
    if(!userInfo.password ) throw new Error('Password is required');
    if(!userInfo.firstname) throw new Error('Firstname is required');
    if(!userInfo.lastname) throw new Error('Lastname is required');

    return this.findOne({email: userInfo.email})
    .then(user => {
        if(user) throw new Error('Email already exists');
        
        const newUser = new this({
            email: userInfo.email,
            password: bcrypt.hashSync(userInfo.password, 10),
            firstname: userInfo.firstname,
            lastname: userInfo.lastname,
    })
    return this.create(newUser);
    })
    .then (userCreated => userCreated)
    .then (user => user)
}