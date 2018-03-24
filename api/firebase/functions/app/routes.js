const express   = require('express');

const cadeiraController     = require('./controllers/cadeira');
const professorController   = require('./controllers/professor');
const gradeController       = require('./controllers/grade');

const Cadeira   = express.Router();
const Professor = express.Router();
const Grade     = express.Router();

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

module.exports = {
    Cadeira: Cadeira,
    Professor: Professor,
    Grade: Grade
}