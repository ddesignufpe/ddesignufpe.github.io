const momment = require('moment');

exports.debugMiddleware = (req, res, next) => {
    let caminho = req.originalUrl;
    let metodo = req.method;
    let t0 = momment().valueOf();
    next();
    let t1 = momment().valueOf();
    let tempoFinal = momment(t1 - t0);
    console.log('>> log - req => | '+ caminho + ' | ' + metodo + ' | ' + tempoFinal + 'ms')
}