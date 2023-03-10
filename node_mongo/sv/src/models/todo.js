const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
});

TodoSchema.statics.create = create;
TodoSchema.statics.getTodos = getTodos;
TodoSchema.statics.getOne = getOne;
TodoSchema.statics.updateTodo = updateTodo;
TodoSchema.statics.deleteTodo = deleteTodo;

mongoose.model('todo', TodoSchema, 'todos');

// methods
function create(todoInfo, user) {
    console.log(todoInfo)
    if (!todoInfo.title) throw new Error('Title is required');

    todoInfo.userId = user._id;
    
    //console.log(todoInfo.userId)
    const todo = new this(todoInfo);
    return todo.save();
};

function getTodos(user) {
    return this.find({ userId: user._id });
}

function getOne(id, user) {
    return this.findOne({ _id: id, userId: user._id })
    .then(todo => {
        if (!todo) throw new Error('Todo not found');

        return todo;
    })
}

function updateTodo(id, todoInfo = {}, user) {
    const update = {};
    if (todoInfo.title) update.title = todoInfo.title;
    if (todoInfo.description) update.description = todoInfo.description;

    return this.findOne({ _id: id, userId: user._id })
    .then(todo => {
        if (!todo) throw new Error('Todo not found');
        if (Object.keys(update).length === 0) throw new Error('Nothing to update');
        
        todo.set(update);

        return todo.save();
    });
};

function deleteTodo(id, user) {
    return this.findOne({ _id: id, userId: user._id })
    .then(todo => {
        if (!todo) throw new Error('Todo not found');

        return todo.remove();
    })
};