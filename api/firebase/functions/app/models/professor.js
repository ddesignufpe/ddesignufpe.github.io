const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const ProfessorSchema = new Schema({
    nome: String,
    email: String,
    bio: String,
    lattes: String,
    area: String,
    foto: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Professor', ProfessorSchema);