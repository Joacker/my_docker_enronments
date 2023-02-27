const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isValidEmail } = require('../helpers');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

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
userSchema.statics.sendConfirmationEmail = sendConfirmationEmail;
userSchema.statics.confirmAccount = confirmAccount;
userSchema.statics.login = login;
userSchema.statics.findUserById = findUserById;

mongoose.model('user', userSchema, 'users');

//static methods
function signup(userInfo){
    console.log(userInfo.email)
    console.log(userInfo)
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
    //.then (userCreated => userCreated)
    .then (userCreated => this.sendConfirmationEmail(userCreated))
    .then (user => user)
}

async function sendConfirmationEmail(user){
    let transported = nodemailer.createTransport({
        host:  process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    var token = jwt.sign({email: user.email}, process.env.JWT_SECRET);

    const urlConfirm = `${process.env.API_GATEWAY_URL}/account/confirm/${token}`;
    return transported.sendMail({
        from: process.env.EMAIL_ADMIN_ADDRESS,
        to: user.email,
        subject: 'Please confirm your email',
        html: `<h1>Confirm your email <a href="${urlConfirm}">Confirm</a></h1>`
    }).then(() => user);
}

async function confirmAccount(token){
    var email = null;
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        email = payload.email;
    }catch(err){
        throw new Error('Invalid token');
    }
    
    return this.findOne({ email })
    .then(user => {
        if(!user) throw new Error('User not found');
        if(user.emailVerified) throw new Error('user already verified')
        
        user.emailVerified = true;
        return user.save();
    })
}

async function login(email, password){
    if (!isValidEmail(email)) throw new Error('Email is invalid');

    return this.findOne({ email })
    .then(user => {
        if(!user) throw new Error('User not found');
        if(!user.emailVerified) throw new Error('User not verified');
        
        const isMatch = bcrypt.compareSync(password, user.password);
        if(!isMatch) throw new Error('Incorrect credentials');

        const userObject = {
            _id: user._id,
            email: user.email,
            emailVerified: user.emailVerified,
            firstname: user.firstname,
            lastname: user.lastname,
        };
        const access_token = jwt.sign(Object.assign({},userObject), process.env.JWT_SECRET, { 
            expiresIn: '4h' 
        });
        return {
            access_token,
        };
    })
}

async function findUserById(_id) {
    return this.findById(_id)
    .then(user => {
        return {
            _id: user._id,
            email: user.email,
            emailVerified: user.emailVerified,
            firstname: user.firstname,
            lastname: user.lastname,
        }
    });
}