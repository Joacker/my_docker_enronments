const getModelByName = require('../db/getModelByName');

module.exports.signup = (req, res) => {
    if (!req.body.user) return res.status(400).send('No user data');
    const User = getModelByName('users');
    try{
        User.signup(req.body.user)
        .then(() => {
            res.status(200).send({success: true, message: 'User created successfully'});
        }).catch(err => {
            res.status(500).send({success: false, message: err.message});
        })
    }catch(err){
        res.status(500).send({success: false, message: err.message});
    }
};