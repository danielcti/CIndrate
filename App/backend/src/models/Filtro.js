const mongoose = require('mongoose')

const FiltroSchema = new mongoose.Schema({
  bloco: String,
  andar: String,
  descricao: String,
  nivel: Number,
  trocaSolicitada: Boolean,
  trocaAceita: Boolean,
  trocaEfetuada: Boolean,
}, {
  timestamps: true,
});

module.exports = mongoose.model('Filtro', FiltroSchema)