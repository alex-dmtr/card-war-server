var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('pages/index', { page_name: 'Home'})
})

router.get('/download', function (req, res, next) {
  var request = require('request')
  request.get('https://www.dropbox.com/s/7w0d299ds0e63qe/version.json?dl=1', function (error, response, body) {
    res.render('pages/download', { data: JSON.parse(body), page_name: 'Download'})
  })
})

router.get('/signup', function (req, res, next) {
  res.render('pages/signup', { page_name: 'Sign up'})
})

router.post('/signup', function (req, res, next) {
  var username = req.body.username
  global.db.getUser(username, function (err, result) {
    if (result != null) {
      req.flash('error', 'User ' + username + ' already exists!')
      res.redirect('/signup')
    } else {
      global.db.addUser(username, function (err, result) {
        if (err != null) {
          req.flash('info', 'User ' + username + 'succesfully registered')
        }

        res.redirect('/')
      })
    }
  })
})

router.get('/players', function (req, res) {
  global.db.get().collection('users').find().toArray(function (err, result) {
    res.render('pages/players', {data: result, page_name: 'Players'})
  })
})

router.get('/login', function (req, res) {
  res.render('pages/login', { page_name: 'Log in'})
})

router.post('/login', function (req, res) {
  var username = req.body.username
  global.db.login(username, function (err, result) {
    if (result != null) {
      req.flash('info', 'Login succesful.')
      req.session.user = username
      res.redirect('/')
    } else {
      req.flash('error', 'Username and password combination not recognised.')
      res.redirect('/')
    }
  })
})

router.get('/query', function (req, res, next) {
  var table = req.query.table

  console.log(table)

  var result = global.db.get().collection(table)

  result.find().toArray(function (error, result) {
    res.setHeader('Content-Type', 'application/json')
    res.send(result)
  })
})

module.exports = router
