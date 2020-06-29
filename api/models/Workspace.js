const mongoose = require('mongoose');
const { Schema } = mongoose;

const WorkspaceSchema = mongoose.Schema({
    id: {type:Schema.Types.ObjectId, ref: 'Activity'},
    description: String,
    sessions: [
        {
        
        type: new mongoose.Schema(
          {
            title: String,
            numMin: Number,
          },
          { timestamps: true }
        ),
      },
    ],
    goals: [
        {
        type: new mongoose.Schema(
          {
            title: String,
            description: String,
            deadline: String,
          },
          { timestamps: true }
        ),
      },
    ],
    todos: [
        {
          type: new mongoose.Schema(
            {
              body: String,
              isCompleted: {
                type: Boolean,
                default: false,
              },
            },
            { timestamps: true }
          ),
        },
      ],
});

const Workspace = mongoose.model('Workspace', WorkspaceSchema);

module.exports = Workspace;