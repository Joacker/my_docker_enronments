const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

function signup(user){
    if(!user.email || !isValidEmail(user.email)) throw new Error('Email is invalid');
    if(!user.password ) throw new Error('Password is required');
    if(!user.firstname) throw new Error('Firstname is required');
    if(!user.lastname) throw new Error('Lastname is required');

    return this.findOne({email: user.email})
    .then(user => {
        if(user) throw new Error('Email already exists');
        
        const newUser = new this({
            email: user.email,
            password: bcrypt.hashSync(user.password, 9),
            firstname: user.firstname,
            lastname: user.lastname,
    })
    return this.create(newUser);
    })
    .then (user => {
        return user;
    })
}