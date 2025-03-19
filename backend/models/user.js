const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const resultSchema = require('./results');

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    results: [resultSchema],
  },
  {
    timestamps: true, // mongoose will add 2 options: createdAt and updatedAt
  },
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('User', userSchema);
