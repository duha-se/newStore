const {findRestaurants} = require('./server/controllers/restaurants');
const {findMeals} = require('./server/controllers/meals');
const {findUserDestinations, findUser, saveUserDestination, deleteUserDestination, saveUser, findTokens} = require('./server/controllers/user');
const {findCities} = require('./server/controllers/cities');const {getAllProducts} = require('./server/controllers/prod');
const { sendOrder } = require('./server/controllers/order');
const fs = require("fs");
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const serverApp = express();
var router = express.Router();
const prodData = require("./server/prodJson.json");
var cors = require('cors');

serverApp.use(cors({
  origin: '*'
}));

///////////////////////////////////////////DataBase////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const dbConfig = require('./server/config/database.config');
// const mongoose = require('mongoose');

// mongoose.Promise = global.Promise;
// mongoose.connect(dbConfig.url, {
//     useNewUrlParser: true, useUnifiedTopology: true 
// }).then(() => {
//     console.log("Successfully connected to the database");    
// }).catch(err => {
//     console.log('Could not connect to the database. Exiting now...', err);
//     process.exit();
// });
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
serverApp.use(express.static('./dist/ma3zoom-node'));
serverApp.use(bodyParser.json());
serverApp.use(bodyParser.urlencoded({ extended: false }));

serverApp.get('/node/cities', function (request, response) {
  findCities(request, response);
});

serverApp.get('/node/restaurants', function (request, response) {
  findRestaurants(request, response);
});
serverApp.get('/node/goodluck', function (request, response) {
  findTokens(request, response);
});

serverApp.get('/node/prod', function (request, response) {
 response.send(prodData);
});

 serverApp.get('/node/meals/:restaurantId', function (request, response) {
  findMeals(request, response);
});

serverApp.get('/node/user/destinations/:email', function (request, response) {
  findUserDestinations(request, response);
});
serverApp.get('/node/user/:email', function (request, response) {
  findUser(request, response);
});

serverApp.post('/node/user/destination/:email', function (request, response) {
  saveUserDestination(request, response);
});

serverApp.post('/node/user/save', function (request, response) {
  saveUser(request, response);
});

serverApp.delete('/node/user/deleteUserDestination/:destinationId', function (request, response) {
  deleteUserDestination(request, response);
});

serverApp.post('/node/order', function (request, response) {
  sendOrder(request, response);
});


serverApp.get('/*', function (request, response) {
    response.sendFile(path.join(__dirname, '/dist/ma3zoom-node/index.html'));
});

module.exports = router;

serverApp.listen(process.env.PORT || 8080);
