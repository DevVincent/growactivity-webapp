const mongoose = require('mongoose');
const { Schema } = mongoose;

const TodoSchema = mongoose.Schema({
    aId: {type:Schema.Types.ObjectId, ref: 'Activity'},   
    body: String,
    isCompleted: {
        type: Boolean,
        default: false,
    }            
});

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;