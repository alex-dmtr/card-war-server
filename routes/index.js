var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    
    var request = require('request');
    request.get('https://www.dropbox.com/s/7w0d299ds0e63qe/version.json?dl=1', function (error, response, body) {
        
      res.render('index', { data: JSON.parse(body)});
    });
    
});

router.get('/query', function(req, res, next) {
  var table = req.query.table;
  
  console.log(table);

  global.db.query("SELECT * FROM " + table, null, function(err, result) {
    res.setHeader('Content-Type', 'application/json');
    res.send(result);
  });
  
});

module.exports = router;
