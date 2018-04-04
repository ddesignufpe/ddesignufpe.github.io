const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true, select: false },
    admin: { type: Boolean, required: false, select: false, default: false },
    token: { type: String, select: false }
}, {
        timestamps: true
    });

UsuarioSchema.pre('save', function(next) {
    let usuario = this;
    if (!usuario.isModified('senha')) { return next() }

    let hash = bcrypt.hashSync(usuario.senha);
    usuario.senha = hash;
    next();
});

UsuarioSchema.methods.comparePassword = function(senha) {
    let usuario = this;
    return bcrypt.compareSync(senha, usuario.senha);
}

module.exports = mongoose.model('Usuario', UsuarioSchema);