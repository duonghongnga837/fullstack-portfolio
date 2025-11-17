// models/Project.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a project title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a project description']
  },
  imageUrl: {
    type: String,
    default: 'https://via.placeholder.com/400x300'
  },
  repoUrl: {
    type: String,
    trim: true
  },
  liveUrl: {
    type: String,
    trim: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);

