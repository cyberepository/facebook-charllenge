

var express = require('express');
var app = express();
var path = require('path');
var test_route = require('./server/routes');

app.use(express.static(path.join(__dirname, 'public'))); //  "public" off of current is root
app.use('/rest',  test_route);

app.listen(3000);