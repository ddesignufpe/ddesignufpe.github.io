const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true, select: false }
}, {
        timestamps: true
    });

UsuarioSchema.pre('save', next => {
    let user = this;
    if (!user.isModified('senha')) { return next() }

    let hash = bcrypt.hashSync(user.senha);
    user.senha = hash;
    next();
});

UsuarioSchema.methods.comparePassword = (senha) => {
    let user = this;
    return bcrypt.compareSync(senha, user.senha);
}

module.exports = mongoose.model('Usuario', UsuarioSchema);