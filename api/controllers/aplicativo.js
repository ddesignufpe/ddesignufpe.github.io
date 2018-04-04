const Aplicativo = require('../models/aplicativo');

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: 'O conteúdo não pode ser vazio' });
    }

    let query = req.body;
    let aplicativoData = {};
    let pass = false;

    try {
        aplicativoData = {
            emailAutor: query.emailAutor,
            nome: query.nome,
            url: query.url,
            token: query.token || ""
        };
        pass = true;
    } catch (err) {
        pass = false;
    }

    if (pass) {
        let aplicativo = new Aplicativo(aplicativoData);

        aplicativo.save((err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send({ message: 'Não foi possível criar este aplicativo', code: 'EAP01' });
            } else {
                res.status(201).send(data);
            }
        });
    } else {
        res.status(400).send({ message: 'Existem campos não preenchidos' });
    }
}

exports.readAll = (req, res) => {
    Aplicativo.find((err, aplicativos) => {
        if (err) {
            res.status(500).send({ message: 'Error na query', code: 'EAP02' });            
        } else {
            if (aplicativos.length === 0) {
                res.status(200).send({ message: 'Não existem aplicativos cadastrados' });
            } else {
                res.status(200).send({ lenght: aplicativos.length, data: aplicativos });
            }
        }
    });
}

exports.readOne = (req, res) => {
    Aplicativo.findById(req.params.aplicativoId, (err, aplicativo) => {
        if (err) {
            console.log(err);
            if (err.kind === 'ObjectId') {
                res.status(404).send({ message: 'Aplicativo não encontrado' });
            } else {
                res.status(500).send({ message: 'Erro ao tentar encontrar o aplicativo', code: 'EAP03' });
            }
        } else {
            if (!aplicativo) {
                res.status(404).send({ message: 'Aplicativo não encontrado' });
            } else {
                res.status(200).send(aplicativo);
            }
        }
    });
}

exports.updade = (req, res) => {
    Aplicativo.findById(req.params.aplicativoId, (err, aplicativo) => {
        if (err) {
            console.log(err);
            if (err.kind === 'ObjectId') {
                res.status(404).send({ message: 'Aplicativo não encontrado' });
            }
            res.status(500).send({ message: 'Erro ao tentar encontrar o aplicativo', code: 'EAP04' });
        }

        if (!aplicativo) {
            res.status(404).send({ message: 'Aplicativo não encontrado' });
        }

        let query = req.body;

        aplicativo.emailAutor = query.emailAutor || aplicativo.emailAutor;
        aplicativo.nome = query.nome || aplicativo.nome;
        aplicativo.url = query.url || aplicativo.url;
        aplicativo.token = query.token || aplicativo.token;
        
        aplicativo.save((err, data) => {
            if (err) {
                res.status(500).send({ message: 'Erro ao tentar alterar o aplicativo', code: 'EAP05' });
            } else {
                res.status(200).send(data);
            }
        });

    });
}

exports.delete = (req, res) => {
    Aplicativo.findByIdAndRemove(req.params.aplicativoId, (err, aplicativo) => {
        if (err) {
            console.log(err);
            if (err.kind === 'ObjectId') {
                res.status(404).send({ message: 'Aplicativo não encontrado' });
            }
            res.status(500).send({ message: 'Erro ao tentar encontrar o aplicativo', code: 'EAP06' });
        }

        if (!aplicativo) {
            res.status(404).send({ message: 'Aplicativo não encontrado' });
        }

        res.status(200).send({ message: 'Aplicativo deletado com sucesso' });

    });
}