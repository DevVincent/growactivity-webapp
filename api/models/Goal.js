const mongoose = require('mongoose');
const { Schema } = mongoose;

const GoalSchema = mongoose.Schema({
    aId: {type:Schema.Types.ObjectId, ref: 'Activity'},  
    title: String,
    details: String,
    date: Date,
    deadline: Date,         
});

const Goal = mongoose.model('Goal', GoalSchema);

module.exports = Goal;