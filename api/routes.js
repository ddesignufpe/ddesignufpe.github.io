const express   = require('express');

const cadeiraController     = require('./controllers/cadeira');
const professorController   = require('./controllers/professor');
const gradeController       = require('./controllers/grade');
const usuarioController     = require('./controllers/usuario');

const Cadeira   = express.Router();
const Professor = express.Router();
const Grade     = express.Router();
const Usuario   = express.Router();

Cadeira.get('/:cadeiraId', cadeiraController.readOne);
Cadeira.get('/', cadeiraController.readAll);
Cadeira.post('/', cadeiraController.create);
Cadeira.put('/:cadeiraId', cadeiraController.updade);
Cadeira.delete('/:cadeiraId', cadeiraController.delete);

Professor.get('/:professorId', professorController.readOne);
Professor.get('/', professorController.readAll);
Professor.post('/', professorController.create);
Professor.put('/:professorId', professorController.updade);
Professor.delete('/:professorId', professorController.delete);

Grade.get('/', gradeController.readAll);
Grade.post('/', gradeController.create);

Usuario.get('/:usuarioId', usuarioController.readOne);
Usuario.get('/', usuarioController.readAll);
Usuario.post('/', usuarioController.create);
Usuario.put('/:usuarioId', usuarioController.updade);
Usuario.delete('/:usuarioId', usuarioController.delete);

module.exports = {
    Cadeira: Cadeira,
    Professor: Professor,
    Grade: Grade,
    Usuario: Usuario
}