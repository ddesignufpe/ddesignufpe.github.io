const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthService = require('../services/auth');

const AplicativoSchema = new Schema({
    emailAutor: { type: String, required: true },
    nome: { type: String, required: true },
    url: { type: String, required: true },
    token: { type: String }
}, {
        timestamps: true
    });

AplicativoSchema.pre('save', function(next) {
    let aplicativo = this;
    if (!aplicativo.isModified('token')) { return next() }
    
    aplicativo.token = AuthService.genAppToken(aplicativo);
    next();
});

AplicativoSchema.methods.compareToken = function(token) {
    let aplicativo = this;
    return token === aplicativo.token;
}

module.exports = mongoose.model('Aplicativo', AplicativoSchema);