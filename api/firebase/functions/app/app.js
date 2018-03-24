const express       = require('express');
const bodyParser    = require('body-parser');
const mongoose      = require('mongoose');
const routes        = require('./routes');

const jsonParser    = bodyParser.json();

const app           = express();

mongoose.connect("mongodb://admin:8hq8xba9@cluster0-shard-00-00-mfu9r.mongodb.net:27017,cluster0-shard-00-01-mfu9r.mongodb.net:27017,cluster0-shard-00-02-mfu9r.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin");

mongoose.connection.on('error', function() {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

mongoose.connection.once('open', function() {
    console.log("Successfully connected to the database");
})

app.get('/', (req, res) => {
    res.status(200).send({menssage: "Bem vindo a API dDesign! ~ Versao: 2.0.0"});
});

app.use('/cadeiras', routes.Cadeiras);

exports.backend = app;