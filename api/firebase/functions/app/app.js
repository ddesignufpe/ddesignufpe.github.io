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

// Routes
app.get('/', function(req, res){
    res.status(200).send({menssage: "Welcome to dDesign API!"});
});

cadeiras.get('/', function(req, res) {
    db.ref('/cadeiras').once('value', snapshot => {
        var data = snapshot.val();
        res.status(200).send(data);
    }, errorObject => {
        console.log("GET /cadeiras -> The read failed: " + errorObject.code);
        res.sendStatus(404);
    });  
});

cadeiras.get('/:id', function(req, res) {
    var reqParams = req.params;
    var dbRef = '/cadeiras/' + reqParams.id;
    db.ref(dbRef).once('value', snapshot =>{
        var data = snapshot.val();
        if (data === null){
            res.sendStatus(404);
        } else {
            res.status(200).send(data);
        }
    }, errorObject => {
        console.log("GET /cadeiras -> The read failed: " + errorObject.code);
        res.sendStatus(404);
    });
});

// Export express
exports.backend = app;
