const express   = require('express');
const cadeiraController  = require('./controllers/cadeira');

const Cadeiras  = express.Router();

Cadeiras.get('/:cadeiraId', cadeiraController.findOne);
Cadeiras.get('/', cadeiraController.findAll);
Cadeiras.post('/', cadeiraController.create);
Cadeiras.put('/:cadeiraId', cadeiraController.updade);
Cadeiras.delete('/:cadeiraId', cadeiraController.delete);

module.exports = {
    Cadeiras: Cadeiras
}