// Express things
const express = require('express');
const cors = require('cors')({origin: true});
const bodyParser = require('body-parser');

const app = express();
const cadeiras = express.Router();
const jsonParser = bodyParser.json();

// Firebase
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const db = admin.database();

// Middlewares
app.use(cors);
app.use('/cadeiras', cadeiras);

// Api Hello World
app.get('/', function(req, res){
    res.status(200).send({menssage: "Welcome to dDesign API! ~ Version: 1.0.0"});
});

// Routes - Cadeiras
cadeiras.get('/', function(req, res) {
    db.ref('/cadeiras').once('value', snapshot => {
        var data = snapshot.val();
        res.status(200).send(data);
    }, errorObject => {
        console.log("GET /cadeiras -> The read failed: " + errorObject.code);
        menssage = {error: 'Courses can not be loaded', code: 'ECF01'};
        res.status(500).send(menssage);
    });  
});

cadeiras.get('/:id', function(req, res) {
    var reqParams = req.params;
    var dbRef = '/cadeiras/' + reqParams.id;
    db.ref(dbRef).once('value', snapshot =>{
        var data = snapshot.val();
        if (data === null){
            menssage = {error: 'Course not found'};
            res.status(404).send(menssage);
        } else {
            res.status(200).send(data);
        }
    }, errorObject => {
        console.log("GET /cadeiras -> The read failed: " + errorObject.code);
        menssage = {error: 'Course can not be loaded', code: 'ECF02'};
        res.status(500).send(menssage);
    });
});

// Export express
exports.backend = app;
