const AuthService = require('../services/auth');

exports.userMiddleware = (req, res, next) => {
    let userAuthToken = req.headers['authorization'];

    if (userAuthToken) {
        try {
            AuthService.verifyUserToken(userAuthToken).then((autorizado)=>{
                if (autorizado) {
                    // logar acesso
                    next();
                } else {
                    res.status(403).send({  message: 'Não autorizado' });                    
                }
            });
        } catch (err) {
            res.status(403).send({  message: 'Token inválido' });                                
        }     
    } else {
        res.status(403).send({  message: 'Token não encontrado' });        
    }
}