const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const CadeiraSchema = new Schema({
    codigo: String,
    nomePerfil: String,
    nomeCadeira: String,
    professor: String,
    eixo: String,
    ementa: String,
    nivel: String,
    vagasMatricula: Number,
    vagasModificacaoDesign: Number,
    vagasModificacaoOutros: Number,
    local: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Cadeira', CadeiraSchema);