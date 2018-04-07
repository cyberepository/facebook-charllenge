

var express = require('express');
var app = express();
var path = require('path');
var routes = require('./server/routes');
var bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, 'public'))); //  "public" off of current is root
// parse application/json
app.use(bodyParser.json())
app.use('/rest',  routes);


app.listen(3000);