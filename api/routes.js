const express   = require('express');

const userAuth           = require('./middlewares/user.auth');
const userAuthMiddleware = userAuth.userMiddleware;

const cadeiraController     = require('./controllers/cadeira');
const professorController   = require('./controllers/professor');
const gradeController       = require('./controllers/grade');
const usuarioController     = require('./controllers/usuario');
const authController        = require('./controllers/auth');
const aplicativoController  = require('./controllers/aplicativo');

const Cadeira       = express.Router();
const Professor     = express.Router();
const Grade         = express.Router();
const Usuario       = express.Router();
const Auth          = express.Router();
const Aplicativo    = express.Router();

Cadeira.get('/:cadeiraId', cadeiraController.readOne);
Cadeira.get('/', cadeiraController.readAll);
Cadeira.post('/', userAuthMiddleware, cadeiraController.create);
Cadeira.put('/:cadeiraId', userAuthMiddleware, cadeiraController.updade);
Cadeira.delete('/:cadeiraId', userAuthMiddleware, cadeiraController.delete);

Professor.get('/:professorId', professorController.readOne);
Professor.get('/', professorController.readAll);
Professor.post('/', userAuthMiddleware, professorController.create);
Professor.put('/:professorId', userAuthMiddleware, professorController.updade);
Professor.delete('/:professorId', userAuthMiddleware, professorController.delete);

Grade.get('/', gradeController.readAll);
Grade.post('/', userAuthMiddleware, gradeController.create);

Usuario.get('/:usuarioId', userAuthMiddleware, usuarioController.readOne);
Usuario.get('/', userAuthMiddleware, usuarioController.readAll);
Usuario.post('/', userAuthMiddleware, usuarioController.create);
Usuario.put('/:usuarioId', userAuthMiddleware, usuarioController.updade);
Usuario.delete('/:usuarioId', userAuthMiddleware, usuarioController.delete);

Auth.post('/login', authController.login);

Aplicativo.get('/:aplicativoId', aplicativoController.readOne);
Aplicativo.get('/', aplicativoController.readAll);
Aplicativo.post('/', userAuthMiddleware, aplicativoController.create);
Aplicativo.put('/:aplicativoId', userAuthMiddleware, aplicativoController.updade);
Aplicativo.delete('/:aplicativoId', userAuthMiddleware, aplicativoController.delete);

module.exports = {
    Cadeira: Cadeira,
    Professor: Professor,
    Grade: Grade,
    Usuario: Usuario,
    Auth: Auth, 
    Aplicativo, Aplicativo
}