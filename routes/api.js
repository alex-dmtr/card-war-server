var express = require('express')
var  router = express.Router()
var Game = require('../src/game').Game




router.get('/newGame', function(req, res) {

  var game = new Game()
  game.startGame()

  var content = { game: game, possibleActions: game.getPossibleActions()}

  res.setHeader('Content-Type', 'application/json')
  res.send(content)
})

module.exports = router
