const functions = require('firebase-functions');

// API
const app = require('./app/app');

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

exports.api = functions.https.onRequest(app.backend);