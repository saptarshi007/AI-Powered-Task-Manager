const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    deadline: { type: Date },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' }
});

module.exports = mongoose.model('Task', taskSchema);