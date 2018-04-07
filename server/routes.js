var express = require('express');
var fs = require('fs');
var router = express.Router();

var username_base = __dirname+"/username.txt"

router.get('/', function(req, res) {
    
    res.send('GET handler for / route.');
});

router.post('/', function(req, res) {
    res.send('POST handler for / route.');
});

router.post('/login', function(req, res) {
    fs.writeFile(username_base, req.body.user, function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
    res.send('Login success');
});

router.get('/getuser', function(req, res) {
  fs.readFile(username_base, {encoding: 'utf-8'}, function(err,data){
    if (!err) {
        res.send(data);
    } else {
        res.send("error in server : " + err);
    }
  });
});

router.post('/search', function(req, res) {
    //connect server python
    // recuper nouvelle 
    //res.send('/login.');
});


module.exports = router;
