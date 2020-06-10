const mongoose = require('mongoose');

const WorkspaceSchema = mongoose.Schema({
    owner: {type:Schema.Types.ObjectId, ref: 'Activity'},
    description: String,   
});

module.exports = mongoose.model('Workspace', WorkspaceSchema);