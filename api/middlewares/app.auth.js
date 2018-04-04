const AuthService = require('../services/auth');

exports.appMiddleware = (req, res, next) => {
    let appAuthToken = req.headers['x-access-token'];

    if (appAuthToken) {
        try{
            AuthService.verifyAppToken(appAuthToken).then((autorizado)=>{
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