var Board = require('./board.js')

class Game {

  constructor() {
    this.board = new Board()
    this.history = []
  }

  doAction(action) {
    var board = this.board.copy()

    if (action.type == 'START_TURN') {
      board = board.drawCards(board.activePlayer, 0)
      this.history.push({action: action, state: board})

      this.board = board


    }
    if (action.type == 'END_TURN') {
      if (board.activePlayer == 0)
        board.activePlayer = 1
      else
        board.activePlayer = 0

      this.board = board
      this.history.push({action: action, state: board})
      this.doAction({type: 'START_TURN'})
    }

  }

  startGame() {
    var board = this.board


		board = board.addArmy(Board.newArmy(), 0)
		board = board.addArmy(Board.newArmy(), 1)

    // randomize decks
    board = board.randomizeDeck(0)
    board = board.randomizeDeck(1)

    // take out 4 for each player
    board = board.drawCards(0, 4)
    board = board.drawCards(1, 4)

    board.activePlayer = 0

        this.board = board
    this.doAction({type: 'START_TURN'})
    this.doAction({type: 'END_TURN'})

  }
  getPossibleActions() {

  }

}

module.exports = Game
