var express = require('express')
var router = express.Router()

router.get('/newGame', function (req, res) {
  res.render('pages/game.ejs')
})

module.exports = router
