const mongoose = require('mongoose');

const BordaSchema = new mongoose.Schema({
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

const Borda = mongoose.model('Borda', BordaSchema);

module.exports = Borda;
