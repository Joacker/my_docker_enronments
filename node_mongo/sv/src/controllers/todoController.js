const getModelByName = require('../db/getModelByName');

module.exports.create = function (req, res) {
    if(!req.body.todo) return res.status(200).send({success: false, message: 'todo info not found'});

    const Todo = getModelByName('todo');

    try{
        Todo.create(req.body.todo, req.user)
        .then((todo) => {
            res.status(200).send({success: true, data: { todo }});
        }).catch(err => {
             res.status(200).send({success: false, message: err.message})
        })
    }catch(err){
        res.status(500).send({success: false, err: err.message});
    }
};

module.exports.getTodos = function (req, res) {
    const Todo = getModelByName("todo");

    Todo.getAll(req.user)
    .then((todos) => {
        res.status(200).send({success: true, data: { todos }});
    }).catch(err => {
        res.status(200).send({success: false, error: err.message})
    })
};