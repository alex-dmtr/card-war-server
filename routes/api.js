var express = require('express')
var  router = express.Router()
var Game = require('../src/game').Game
var debug = require('debug')('rc-server:api')



router.get('/newGame', function(req, res) {

  global.game = new Game()
  global.game.startGame()

  var content = { game: global.game, possibleActions: global.game.getPossibleActions()}

  res.setHeader('Content-Type', 'application/json')
  res.send(content)
})

router.get('/game/action', function(req, res)  {

  var actionData = req.query
  debug('sent action request: ' + JSON.stringify(actionData))


  global.game.doAction(actionData)

  var content = { game: global.game, possibleActions: global.game.getPossibleActions()}

  res.setHeader('Content-Type', 'application/json')
  res.send(content)
})

module.exports = router
