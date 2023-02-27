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

mongoose.model('todo', TodoSchema, 'todos');

// methods
function create(todoInfo, user) {
    //print the todoInfo object key value pairs
    // for (const [key, value] of Object.entries(todoInfo)) {
    //     console.log(`${key}: ${value}`);
    //     todoInfo[key] = value;
    //     console.log(todoInfo[key])
    // }    
    console.log(todoInfo.title)

    if (!todoInfo.title) throw new Error('Title is required');

    todoInfo.userId = user._id;
    //console.log(todoInfo.userId)
    const todo = new this(todoInfo);
    return todo.save(); 
};