const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const resultSchema = require('./results');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required!'],
      trim: true,
      unique: [true, 'Email must be unique!'],
      minLength: [5, 'Email must have 5 characters!'],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Password mast be provided!'],
      trim: true,
      select: false,
    },
    username: { type: String },
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
