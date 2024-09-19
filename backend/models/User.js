// backend/models/User.js

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['host', 'player'],
    default: 'player',
  },
  heroPreference: {
    type: String,
    default: '',
  },
  aspectPreference: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('User', UserSchema);
