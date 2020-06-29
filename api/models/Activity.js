const mongoose = require('mongoose');
const { Schema } = mongoose;

const ActivitySchema = mongoose.Schema({
    owner: {type: Schema.Types.ObjectId, ref: 'User'},
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Activity', ActivitySchema);