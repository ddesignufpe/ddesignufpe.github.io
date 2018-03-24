const express   = require('express');

const cadeiraController     = require('./controllers/cadeira');
const professorController   = require('./controllers/professor');

const Cadeira   = express.Router();
const Professor = express.Router();

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

module.exports = {
    Cadeira: Cadeira,
    Professor: Professor
}