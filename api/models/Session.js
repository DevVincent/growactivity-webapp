const mongoose = require('mongoose');
const { Schema } = mongoose;

const SessionSchema = mongoose.Schema({
    aId: {type:Schema.Types.ObjectId, ref: 'Activity'},  
    numHrs: Number,
    date: Date,         
});

const Session = mongoose.model('Session', SessionSchema);

module.exports = Session;