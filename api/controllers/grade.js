const Grade = require('../models/grade');

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: 'O conteúdo não pode ser vazio' });
    }

    let query = req.body;
    let gradeData = {};
    let pass = false;

    try {
        gradeData = {
            semestre: query.semestre,
            dados: {
                manha: query.dados.manha,
                tarde: query.dados.tarde
            },
            periodoModificacao: query.periodoModificacao || false
        };
        pass = true;
    } catch (err) {
        pass = false;
    }

    if (pass) {
        let grade = new Grade(gradeData);

        grade.save((err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send({ message: 'Não foi possível criar esta grade', code: 'EG01' });
            } else {
                res.status(201).send(data);
            }
        });
    } else {
        res.status(400).send({ message: 'Existem campos não preenchidos' });        
    }
}

exports.readAll = (req, res) => {
    Grade.find()
        .populate([
            'dados.manha.segunda',
            'dados.manha.terca',
            'dados.manha.quarta',
            'dados.manha.quinta',
            'dados.manha.sexta',
            'dados.tarde.segunda',
            'dados.tarde.terca',
            'dados.tarde.quarta',
            'dados.tarde.quinta',
            'dados.tarde.sexta'
        ])
        .exec((err, grades) => {
            if (err) {
                console.log(err);
                res.status(500).send({ message: 'Error na query', code: 'EG02' });
            } else {
                if (grades.length === 0) {
                    res.status(200).send({ message: 'Não existem cadeiras cadastradas' });
                } else {
                    res.status(200).send(grades);
                }
            }
        });
}