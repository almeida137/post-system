const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definição do esquema para os detalhes do pedido
const dimensionsSchema = new mongoose.Schema({
  largura: {
    type: Number,
    required: true
  },
  altura: {
    type: Number,
    required: true
  },
  profundidade: {
    type: Number,
    required: true
  }
});

const itemSchema = new Schema({
  ambiente: {
    type: String,
    required: true
  },
  quantidade: {
    type: Number,
    required: true
  },
  descricao: {
    type: String,
    required: true
  },
  dimensoes: {
    type: dimensionsSchema,
    required: true,
  },
  cor: {
    type: String,
    required: true
  },
  cor_borda: {
    type: String,
    required: true
  },
  cor_pintura: {
    type: String,
  },
  cor_borda_pintura: {
    type: String,
  },
  motivo: {
    type: String,
    required: true
  },
  obs: {
    type: String
  },
  anexos: [{
    type: String // Caminho para o arquivo ou URL
  }]
});

// Definição do esquema principal
const solicitacaoSchema = new Schema({
  loja: {
    type: String,
    required: true,
    enum: ['Paulete BSB', 'Paulete GO'],
  },
  dataDoPedido: {
    type: Date,
    required: true
  },
  cliente: {
    type: String,
    required: true
  },
  montador: {
    type: String,
    required: true
  },
  motivoGeral: {
    type: String,
    required: true
  },
  itens: [itemSchema],
  status: {
    type: String,
    enum: [
      'Pendente',
      'Aprovado',
      'Rejeitado',
      'Em Andamento',
      'Concluído',
      'Cancelado'
    ],
    default: 'Pendente'  // Definindo o status padrão, se necessário
  },
});

// Criação do modelo
const SolicitacaoModel = mongoose.model('Solicitacao', solicitacaoSchema);

module.exports = SolicitacaoModel;
