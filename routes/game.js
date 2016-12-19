var express = require('express')
var router = express.Router()
var Board = require('../game/board.js')

router.get('/newGame', function(req, res) {

		var board = new Board()

		board = board.addCard('CARD_CROSSBOWMAN', 0, 'DECK')

    res.setHeader('Content-Type', 'application/json');
    res.send(board);
})




module.exports = router
