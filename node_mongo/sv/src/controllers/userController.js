const getModelByName = require('../db/getModelByName');

module.exports.signup = function (req, res) {
    if (!req.body.user) return res.status(200).send({ success: false, message: 'Body is required' });
    const User = getModelByName('user');
    try{
        User.signup(req.body.user)
        .then(() => {
            res.status(200).send({success: true, message: 'User created successfully'});
        }).catch(err => res.status(200).send({success: false, message: err.message}))

    }catch(err){
        res.status(200).send({success: false, err: err.message});
    }
};

module.exports.confirmAccount = function (req, res) {
    const User = getModelByName('user');
    try {
        User.confirmAccount(req.params.token)
        .then(() => {
            res.status(200).send({success: true, message: 'User confirmed successfully'});
        }).catch(err => res.status(200).send({success: false, message: err.message}))
    } catch (err) {
        res.status(500).send({success: false, err: err.message});
    }
};

module.exports.login = function (req, res) {
    if (!req.body.email) return res.status(200).send({ success: false, message: 'email is not provided' });
    if (!req.body.password) return res.status(200).send({ success: false, message: 'password is not provided' });
    const User = getModelByName('user');
    try {
        User.login(req.body.email, req.body.password)
        .then((user) => {
            res.status(200).send({success: true, message: 'User logged successfully', user: user});
        }).catch(err => res.status(200).send({success: false, message: err.message}))
    } catch (err) {
        res.status(500).send({success: false, err: err.message});
    }
};