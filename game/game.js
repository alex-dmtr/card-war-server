var Board = require('./board.js')
var assert = require('assert')

class Game {

  constructor () {
    this.board = new Board()
    this.history = []
  }

  doAction (action) {
    var board = this.board.copy()

    if (action.type == 'START_TURN') {
      board = board.drawCards(board.activePlayer, 0)
      this.history.push({action: action, state: board})

      this.board = board
    }
    if (action.type == 'END_TURN') {
      if (board.activePlayer == 0) {
        board.activePlayer = 1
      } else {
        board.activePlayer = 0
      }

      this.board = board
      this.history.push({action: action, state: board})
      this.doAction({type: 'START_TURN'})
    }
    if (action.type == 'PLAY_SOLDIER') {
      assert(board.players[action.player].mp > 0)

      var occupant = board.findCard({player: action.player, state: 'BOARD', position: action.position})

      assert(occupant == null)

      var cardIndex = board.findCard({id: action.card})

      board.cards[cardIndex].position = action.position
      board.cards[cardIndex].state = 'BOARD'

      this.board = board
      this.history.push({action: action, state: board})
    }
  }
  //
  // canDoAction(action) {
  //   var board = this.board
  //
  //   if (action.type == 'PLAY_SOLDIER') {
  //     if (board.players[action.player].mp < 1)
  //       return false
  //
  //     var occupant = board.findCard({player: action.player, state: 'BOARD', position: action.position)
  //
  //     if (occupant != null)
  //       return false
  //
  //     return true
  //   }
  // }

  startGame () {
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
    // this.doAction({type: 'END_TURN'})
  }
  getPossibleActions () {
    var board = this.board

    var hand_soldier_cards = board.findCards({player: board.activePlayer, state: 'HAND', cardType: 'SOLDIER'})

    var possibleActions = []
    if (board.players[board.activePlayer].mp > 0) {
      var emptyPositions = board.findVacantBoardPositions(board.activePlayer)
      for (var i = 0; i < hand_soldier_cards.length; i++) {
        var card = board.cards[hand_soldier_cards[i]]

        for (var j = 0; j < emptyPositions.length; j++) {
          var position = emptyPositions[j]

          possibleActions.push({type: 'PLAY_SOLDIER', card: card.id, player: board.activePlayer, position: position})
        }
      }
    }

    possibleActions.push({type: 'END_TURN', player: board.activePlayer})
    return possibleActions
  }

}

module.exports = Game
