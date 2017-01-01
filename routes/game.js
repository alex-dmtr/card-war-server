var express = require('express')
var router = express.Router()
// var Board = require('../game/board.js')
var Game = require('../game/game.ts').Game

router.get('/newGame', function (req, res) {

  var game = new Game()

  game.startGame()
  game.possibleActions = game.getPossibleActions()
  res.setHeader('Content-Type', 'application/json')
  res.send(game)
})

module.exports = router
