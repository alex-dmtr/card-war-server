class Board {

  constructor() {
    this.players = []

    for (var i = 0; i <= 1; i++)
      this.players[i] = { id: i, mp: 3 }

    this.cards = []

    this.history = []

    this.activePlayer = 0

    this._cardID = 0
  }

  copy() {
    var board = new Board()

    board.players = []

    for (var i = 0; i <= 1; i++)
      board.players[i] = this.players[i]

    board.cards = []

    for (var i = 0; i < this.cards.length; i++)
      board.cards[i] = this.cards[i]

    board.history = []

    for (var i = 0; i < this.history.length; i++)
      board.history[i] = this.history[i]

    board.activePlayer = this.activePlayer

    board._cardID = this._cardID

    return board
  }

  addCard(type, player, state) {

    var board = this.copy()

    var card = { id: board._cardID++, type: type, player: player, state: state }

    board.cards.push(card)

    return board

  }


}

module.exports = Board
