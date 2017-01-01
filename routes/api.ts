import express = require('express')
let router = express.Router()
import { Game} from "../src/game"


router.get('/newGame', function(req, res) {

  let game = new Game()
  game.startGame()

  res.setHeader('Content-Type', 'application/json')
  res.send(game)
})

export default router
