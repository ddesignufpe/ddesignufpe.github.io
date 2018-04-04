const Usuario = require('../models/usuario');

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: 'O conteúdo não pode ser vazio' });
    }

    let query = req.body;
    let usuarioData = {};
    let pass = false;

    try {
        usuarioData = {
            nome: query.nome,
            email: query.email,
            senha: query.senha
        };
        pass = true;
    } catch (err) {
        pass = false;
    }

    if (pass) {
        let usuario = new Usuario(usuarioData);

        usuario.save((err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send({ message: 'Não foi possível criar este usuário', code: 'EU01' });
            } else {
                res.status(201).send(data);
            }
        });
    } else {
        res.status(400).send({ message: 'Existem campos não preenchidos' });
    }
}

exports.readAll = (req, res) => {
    Usuario.find((err, usuarios) => {
        if (err) {
            res.status(500).send({ message: 'Error na query', code: 'EU02' });            
        } else {
            if (usuarios.length === 0) {
                res.status(200).send({ message: 'Não existem usuários cadastrados' });
            } else {
                res.status(200).send({ lenght: usuarios.length, data: usuarios });
            }
        }
    });
}

exports.readOne = (req, res) => {
    Usuario.findById(req.params.usuarioId, (err, usuario) => {
        if (err) {
            console.log(err);
            if (err.kind === 'ObjectId') {
                res.status(404).send({ message: 'Usuário não encontrado' });
            } else {
                res.status(500).send({ message: 'Erro ao tentar encontrar o usuário', code: 'EU03' });
            }
        } else {
            if (!usuario) {
                res.status(404).send({ message: 'Usuário não encontrado' });
            } else {
                res.status(200).send(usuario);
            }
        }
    });
}

exports.updade = (req, res) => {
    Usuario.findById(req.params.usuarioId)
        .select('+senha')    
        .exec((err, usuario) => {
            if (err) {
                console.log(err);
                if (err.kind === 'ObjectId') {
                    res.status(404).send({ message: 'Usuário não encontrado' });
                }
                res.status(500).send({ message: 'Erro ao tentar encontrar o usuário', code: 'EU04' });
            }

            if (!usuario) {
                res.status(404).send({ message: 'Usuário não encontrado' });
            }

            let query = req.body;

            usuario.nome = query.nome || usuario.nome;
            usuario.email = query.email || usuario.email;
            usuario.senha = query.senha || usuario.senha;
            
            usuario.save((err, data) => {
                if (err) {
                    res.status(500).send({ message: 'Erro ao tentar alterar o usuário', code: 'EU05' });
                } else {
                    res.status(200).send({ message: 'Usuário modificado com sucesso' });
                }
            });

        });
}

exports.delete = (req, res) => {
    Usuario.findByIdAndRemove(req.params.usuarioId, (err, usuario) => {
        if (err) {
            console.log(err);
            if (err.kind === 'ObjectId') {
                res.status(404).send({ message: 'Usuário não encontrado' });
            }
            res.status(500).send({ message: 'Erro ao tentar encontrar o usuário', code: 'EU06' });
        }

        if (!usuario) {
            res.status(404).send({ message: 'Usuário não encontrado' });
        }

        res.status(200).send({ message: 'Usuário deletado com sucesso' });

    });
}