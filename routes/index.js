var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    
    var request = require('request');
    request.get('https://www.dropbox.com/s/7w0d299ds0e63qe/version.json?dl=1', function (error, response, body) {
        
      res.render('pages/index', { data: JSON.parse(body)});
    });
    
});

router.get('/signup', function(req, res, next) {
  res.render('pages/signup');
});

router.post('/signup', function(req, res, next) {
  console.log(req.body.username);

  res.redirect("/");
});

router.get('/login', function(req, res, next) {
  res.render('pages/login');
});

router.post('/login', function(req, res, next) {
  res.redirect("/");
});

router.get('/query', function(req, res, next) {
  var table = req.query.table;
  
  console.log(table);

  var result = global.db.get().collection(table);
  
  result.find().toArray(function(error, result) {

    res.setHeader('Content-Type', 'application/json');
    res.send(result);
  });
  
});

module.exports = router;
