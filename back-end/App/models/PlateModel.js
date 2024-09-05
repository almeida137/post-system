const mongoose = require('mongoose');

const ChapaSchema = new mongoose.Schema({
  rotulo: {
    type: String,
    required: true,
    trim: true,
  },
  descricao: {
    type: String,
    trim: true,
  },
  codigo_saef: {
    type: String,
    required: true,
  }
});

const Chapa = mongoose.model('Chapa', ChapaSchema);

module.exports = Chapa;
