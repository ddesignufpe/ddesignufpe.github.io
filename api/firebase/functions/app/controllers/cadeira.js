const Cadeira   = require('../models/cadeira');

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({message: 'O conteúdo não pode ser vazio'});
    }

    let query = req.body;

    let cadeiraData = {
        codigo: query.codigo,
        nomePerfil: query.nomePerfil,
        nomeCadeira: query.nomeCadeira,
        professor: query.professor,
        eixo: query.eixo,
        ementa: query.ementa,
        nivel: query.nivel,
        vagasMatricula: query.vagasMatricula,
        vagasModificacaoDesign: query.vagasModificacaoDesign,
        vagasModificacaoOutros: query.vagasModificacaoOutros,
        local: query.local
    };

    let cadeira = new Cadeira(cadeiraData);

    cadeira.save((err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send({message: 'Não foi possível criar esta cadeira', code: 'EC01'});
        } else {
            res.status(201).send(data);
        }
    });
}

exports.findAll = (req, res) => {
    Cadeira.find((err, cadeiras) => {
        if (err) {
            res.status(500).send({message: 'Error na query', code: 'EC02'});
        } else {
            if (cadeiras.length == 0){
                res.status(200).send({message: 'Não existem cadeiras cadastradas'});                
            } else {
                res.status(200).send(cadeiras);
            }
        }
    });
}

exports.findOne = (req, res) => {
    Cadeira.findById(req.params.cadeiraId, (err, cadeira) => {
        if (err) {
            console.log(err);
            if (err.kind === 'ObjectId') {
                res.status(404).send({message: 'Cadeira não encontrada'});
            } else {
                res.status(500).send({message: 'Erro ao tentar encontrar a cadeira', code: 'EC03'});
            }
        } else {
            if (!cadeira) {
                res.status(404).send({message: 'Cadeira não encontrada'});                    
            } else {
                res.status(200).send(cadeira);                    
            }
        }
    });
}

exports.updade = (req, res) => {
    Cadeira.findById(req.params.cadeiraId, (err, cadeira) => {
        if (err) {
            console.log(err);
            if (err.kind === 'ObjectId') {
                res.status(404).send({message: 'Cadeira não encontrada'});
            }
            res.status(500).send({message: 'Erro ao tentar encontrar a cadeira', code: 'EC04'});
        } 

        if (!cadeira) {
            res.status(404).send({message: 'Cadeira não encontrada'});
        } 

        let query = req.body;

        cadeira.codigo = query.codigo || cadeira.codigo;
        cadeira.nomePerfil = query.nomePerfil || cadeira.nomePerfil;
        cadeira.nomeCadeira = query.nomeCadeira || cadeira.nomeCadeira;
        cadeira.professor = query.professor || cadeira.professor;
        cadeira.eixo = query.eixo || cadeira.eixo;
        cadeira.ementa = query.ementa || cadeira.ementa;
        cadeira.nivel = query.nivel || cadeira.nivel;
        cadeira.vagasMatricula = query.vagasMatricula || cadeira.vagasMatricula;
        cadeira.vagasModificacaoDesign = query.vagasModificacaoDesign || cadeira.vagasModificacaoDesign;
        cadeira.vagasModificacaoOutros = query.vagasModificacaoOutros || cadeira.vagasModificacaoOutros;
        cadeira.local = query.local || cadeira.local;
        
        cadeira.save((err, data) => {
            if (err) {
                res.status(500).send({message: 'Erro ao tentar alterar a cadeira', code: 'EC05'});                    
            } else {
                res.status(200).send(data);
            }
        });

    });
}

exports.delete = (req, res) => {
    Cadeira.findByIdAndRemove(req.params.cadeiraId, (err, cadeira) => {
        if (err) {
            console.log(err);
            if (err.kind === 'ObjectId') {
                res.status(404).send({message: 'Cadeira não encontrada'});
            }
            res.status(500).send({message: 'Erro ao tentar encontrar a cadeira', code: 'EC06'});
        }

        if (!cadeira) {
            res.status(404).send({message: 'Cadeira não encontrada'});
        }

        res.status(200).send({message: 'Cadeira deletada com sucesso'})

    });
}