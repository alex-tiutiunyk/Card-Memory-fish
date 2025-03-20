const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  gameDate: { type: Date, required: true, default: Date.now },
  failed: { type: Number, required: true },
  difficulty: {
    type: String,
    required: true,
    enum: ['Easy', 'Normal', 'Hard'],
  },
  completed: { type: Number, required: true },
  timeTaken: { type: Number, required: true },
});

module.exports = resultSchema;
