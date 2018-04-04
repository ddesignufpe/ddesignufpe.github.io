const jwt = require('jsonwebtoken');
const moment = require('moment');
const Usuario = require('../models/usuario');
const Aplicativo = require('../models/aplicativo');

const secret = '19fa61d75522a4669b44e39c1d2e1726c530232130d407f89afee0964997f7a73e83be698b288febcf88e3e03c4f0757ea8964e59b63d93708b138cc42a66eb3';
const secret2 = 'rwRSqnkVSzERVRv0gjQ3VW4Q8wrcD3nF';

exports.genUserToken = (usuario) => {
    let expires = moment().add(1, 'h').valueOf();
    let payload = {
        iss: usuario._id,
        iat: expires,
        adm: usuario.admin
    }
    let token = jwt.sign(payload, secret);
    return token;
}

exports.verifyUserToken = (token) => {
    return jwt.verify(token, secret, (err, decoded) => {
        if (decoded) {
            let usuarioId = decoded.iss;
            let expires = decoded.iat;
            let admin = decoded.adm;

            return Usuario.findById(usuarioId)
                .select(['+senha','+admin', '+token'])
                .exec()
                .then((usuario)=>{
                    if (usuario.token === token) {
                        if (usuario.admin === admin){
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        return false;
                    }
                });
        } else {
            return false;
        }
    });
}

// APP AUTH -------------------------------------

exports.genAppToken = (aplicativo) => {
    let expires = moment().add(1, 'y').valueOf();
    let payload = {
        iss: aplicativo._id,
        iat: expires,
    }
    let token = jwt.sign(payload, secret2);
    return token;
}

exports.verifyAppToken = (token) => {
    return jwt.verify(token, secret2, (err, decoded) => {
        if (decoded) {
            let aplicativoId = decoded.iss;
            let expires = decoded.iat;

            return Aplicativo.findById(aplicativoId)
                .count()
                .exec()
                .then((count) => {
                    if (count === 1) {
                        return true;
                    } else {
                        return false;
                    }
                })
                .catch((reason)=>{
                    return false
                });
        } else {
            return false;
        }
    });
}