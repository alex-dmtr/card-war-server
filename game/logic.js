function newBoard() {
  var board = {}

  board.players = []

  for (var i = 0; i <= 1; i++)
    board.players[i] = { id: i, mp: 3 }

  board.cards = []

  board.history = []

  board.activePlayer = 0

  return board
}

module.exports = {


}
