function doAction(_board, action) {
  var board = _board.copy()

  if (action.type == 'START_TURN') {
    board = board.drawCards(board.activePlayer, 0)

    board.history.push({action: action, state: board})
  }

  return board
}

function getPossibleActions(board) {

}
