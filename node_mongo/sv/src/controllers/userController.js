const getModelByName = require('../db/getModelByName');

module.exports.signup = function (req, res) {
    if (!req.body.user) return res.status(200).send({ success: false, message: 'Body is required' });
    //if (req.body.user == undefined) return res.status(200).send({ success: false, message: 'User is required' });
    const User = getModelByName('user');
    try{
        //User.signup(req.body)
        User.signup(req.body.user)
        .then(() => {
            res.status(200).send({success: true, message: 'User created successfully'});
        }).catch(err => res.status(200).send({success: false, message: err.message}))

    }catch(err){
        res.status(200).send({success: false, err: err.message});
    }
};