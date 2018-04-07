const Usuario = require('../models/usuario');
const AuthService = require('../services/auth');

exports.login = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: 'O conteúdo não pode ser vazio' });
    }

    let query = req.body;
    let usuarioData = {};
    let pass = false;

    try {
        usuarioData = {
            email: query.email,
            senha: query.senha
        };
        pass = true;
    } catch (err) {
        pass = false;
    }

    if (pass) {
        Usuario.findOne()
            .where('email').equals(usuarioData.email)
            .select(['+senha', '+token'])
            .exec((err, usuario) => {
                if (err) {
                    res.status(500).send({ message: 'Não foi possível realizar o login', code: 'EA01' });                    
                } else if (usuario != null) {
                    let senhaCerta = usuario.comparePassword(usuarioData.senha);
                    if (senhaCerta) {
                        let token = AuthService.genUserToken(usuario);
                        
                        usuario.token = token;

                        usuario.save((err, data) => {
                            if (err) {
                                res.status(500).send({ message: 'Erro ao fazer login', code: 'EC05' });
                            } else {
                                res.status(200).send({ token: token });
                            }
                        });   

                    } else {
                        res.status(403).send({ message: 'Usuário ou senha incorreto' });
                    }
                } else {
                    res.status(404).send({ message: 'Usuário não encontrado' });                    
                }
            });
    } else {
        res.status(400).send({ message: 'Existem campos não preenchidos' });
    }

}