const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

let env = process.env.NODE_ENV || 'dev';
const config = require('./config/' + env + '.config');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// create express app
const app = express();
app.use(morgan('dev'));
// parse requests for content-type -application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

// parse requests for content-type -application/json
app.use(bodyParser.json());


mongoose.connect(config.url)
    .then(() => {
        console.log('Successfully connected to the database');
        console.log(`DbUrl: ${config.url}`);
    }).catch(err => {
        console.log('Could not connect to the database. Exiting now...');
        process.exit();
    });

//define a simple route
// app.get('/', (req, res) => {
//     res.json({
//         "message": "Welcome to link api. Organise and keep track of all your links."
//     });
// });
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
    next();
  });
  
require('./app/routes/link.routes.js')(app);
// listen for requests 
app.listen(3001, () => {
    console.log("Server is listening on port 3001");
});

module.exports = app;