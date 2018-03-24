const Professor = require('../models/professor');

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({message: 'O conteúdo não pode ser vazio'});        
    }

    let query = req.body;
    let ProfessorData = {};
    let pass = false;

    try {
        ProfessorData = {
            nome: query.nome,
            email: query.email,
            bio: query.bio,
            lattes: query.lattes,
            area: query.area
        };
        pass = true;
    } catch (err) {
        pass = false;       
    }
    
    if (pass) {
        let professor = new Professor(ProfessorData);

        professor.save((err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send({message: 'Não foi possível criar este professor', code: 'EP01'});
            } else {
                res.status(201).send(data);
            }
        }); 
    } else {
        res.status(400).send({ message: 'Existem campos não preenchidos' });        
    }
}

exports.readAll = (req, res) => {
    Professor.find((err, professores) => {
        if (err) {
            res.status(500).send({message: 'Error na query', code: 'EP02'});
        } else {
            if (professores.length == 0){
                res.status(200).send({message: 'Não existem professores cadastrados'});                
            } else {
                res.status(200).send(professores);
            }
        }
    });
}

exports.readOne = (req, res) => {
    Professor.findById(req.params.professorId, (err, professor) => {
        if (err) {
            console.log(err);
            if (err.kind === 'ObjectId') {
                res.status(404).send({message: 'Professor não encontrado'});
            } else {
                res.status(500).send({message: 'Erro ao tentar encontrar o professor', code: 'EP03'});
            }
        } else {
            if (!professor) {
                res.status(404).send({message: 'Professor não encontrado'});                    
            } else {
                res.status(200).send(professor);                    
            }
        }
    });
}

exports.updade = (req, res) => {
    Professor.findById(req.params.professorId, (err, professor) => {
        if (err) {
            console.log(err);
            if (err.kind === 'ObjectId') {
                res.status(404).send({message: 'Professor não encontrado'});
            }
            res.status(500).send({message: 'Erro ao tentar encontrar o professor', code: 'EP04'});
        } 

        if (!professor) {
            res.status(404).send({message: 'Professor não encontrado'});
        } 

        let query = req.body;

        professor.nome = query.nome || professor.nome;
        professor.email = query.email || professor.email;
        professor.bio = query.bio || professor.bio;
        professor.lattes = query.lattes || professor.lattes;
        professor.area = query.area || professor.area;
        
        professor.save((err, data) => {
            if (err) {
                res.status(500).send({message: 'Erro ao tentar alterar o professor', code: 'EP05'});
            } else {
                res.status(200).send(data);
            }
        });
    });
}

exports.delete = (req, res) => {
    Professor.findByIdAndRemove(req.params.professorId, (err, professor) => {
        if (err) {
            console.log(err);
            if (err.kind === 'ObjectId') {
                res.status(404).send({message: 'Professor não encontrado'});
            }
            res.status(500).send({message: 'Erro ao tentar encontrar o professor', code: 'EP06'});
        }

        if (!professor) {
            res.status(404).send({message: 'Professor não encontrado'});
        }

        res.status(200).send({message: 'Professor deletado com sucesso'})

    });
}