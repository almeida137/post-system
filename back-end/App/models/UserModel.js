const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  type: {
    type: String, 
    required: true
  },
  active: {
    type: Number
  },
  data_criacao: {
    type: Date,
    default: Date.now
  },
  ultima_atualizacao: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre('save', function (next) {
  this.ultima_atualizacao = Date.now();
  next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
