const express       = require('express');
const bodyParser    = require('body-parser');
const cors          = require('cors')({origin: true});
const mongoose      = require('mongoose');
const routes        = require('./routes');
const appAuth       = require('./middlewares/app.auth');

const jsonParser        = bodyParser.json();
const app               = express();
const appAuthMiddleware = appAuth.appMiddleware;

const port = process.env.PORT || 3000;

mongoose.connect("mongodb://admin:8hq8xba9@cluster0-shard-00-00-mfu9r.mongodb.net:27017,cluster0-shard-00-01-mfu9r.mongodb.net:27017,cluster0-shard-00-02-mfu9r.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin");

mongoose.connection.on('error', function() {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

mongoose.connection.once('open', function() {
    console.log("Successfully connected to the database");
});

app.get('/', (req, res) => {
    res.status(200).send({message: "Bem vindo a API dDesign! ~ Versao: 2.0.0"});
});

app.use(cors);
app.use(bodyParser.json());
app.use(appAuthMiddleware);
app.use('/cadeiras', routes.Cadeira);
app.use('/professores', routes.Professor);
app.use('/grades', routes.Grade);
app.use('/usuarios', routes.Usuario);
app.use('/auth', routes.Auth);
app.use('/aplicativos', routes.Aplicativo);

app.listen(port, function () {
    console.log('Umbler listening on port %s', port);
});

console.log('pegou!');

// exports.backend = app;