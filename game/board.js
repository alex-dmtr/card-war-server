var Card = require('./card')
var Player = require('./player')

class Board {

  constructor () {
    this.players = []

    for (var i = 0; i <= 1; i++) {
      this.players[i] = new Player(i)
      this.players[i].mp = 3
    }

    this.cards = []

    // this.history = []

    this.activePlayer_id = 0

    this._cardID = 0
  }

  copy () {
    var board = new Board()

    board.players = []

    for (var i = 0; i <= 1; i++) {
      board.players[i] = this.players[i].copy()
    }

    board.cards = []

    for (var i = 0; i < this.cards.length; i++) {
      board.cards[i] = this.cards[i].copy()
    }

    // board.history = []
    //
    // for (var i = 0; i < this.history.length; i++)
    //   board.history[i] = this.history[i]

    board.activePlayer_id = this.activePlayer_id

    board._cardID = this._cardID

    return board
  }

  addCard (card) {
    var board = this.copy()

    var newCard = new Card(board._cardID++)

    newCard.type = card.type
    newCard.player_id = card.player_id
    newCard.status = card.status
    newCard.cardType = card.cardType
    newCard.health = card.health
  
    board.cards.push(newCard)

    return board
  }

  addArmy (army, player) {
    var board = this.copy()

    for (var i = 0; i < army.length; i++) {
      board = board.addCard({type: army[i].type, player_id: player, status: 'DECK', cardType: army[i].cardType})
    }

    return board
  }

  static newArmy () {
    var army = []

    for (var i = 1; i <= 5; i++) {
      army.push({ type: 'CARD_SPEARMAN', cardType: 'SOLDIER'})
      army.push({ type: 'CARD_CROSSBOWMAN', cardType: 'SOLDIER'})
    }

    for (var i = 1; i <= 2; i++) {
      army.push({ type: 'CARD_KNIGHT', cardType: 'SOLDIER'})
    }

    return army
  }

  cardFitsCriteria (card, criteria) {
    var ok = true

    if (criteria != null) {
      if (criteria.hasOwnProperty('type')) {
        if (card.type != criteria.type) {
          ok = false
        }
      }

      if (criteria.hasOwnProperty('player')) {
        if (card.player != criteria.player) { ok = false }
      }

      if (criteria.hasOwnProperty('state')) {
        if (card.state != criteria.state) { ok = false }
      }

      if (criteria.hasOwnProperty('id')) {
        if (card.id != criteria.id) { ok = false }
      }

      if (criteria.hasOwnProperty('position')) {
        if (card.position != criteria.position) {
          ok = false
        }
      }

      return ok
    }
  }

  findCards (criteria) {
    var cards_found = []

    for (var i = 0; i < this.cards.length; i++) {
      if (this.cardFitsCriteria(this.cards[i], criteria)) {
        cards_found.push(i)
      }
    }
    return cards_found
  }

  findCard (criteria) {
    for (var i = 0; i < this.cards.length; i++) {
      if (this.cardFitsCriteria(this.cards[i], criteria)) { return i }
    }
    return null
  }

  // removeCards(criteria) {
  //
  //
  //   for (var i = 0; i < cards.length; i++){
  //     if (cardFitsCriteria(cards[i], criteria)) {
  //       cards.splice(i, 1)
  //       i--
  //     }
  //   }
  // }

  randomizeDeck (player) {
    var board = this.copy()

    var deck_cards = board.findCards({player: player, state: 'DECK'})

    var position = 0
    while (deck_cards.length > 0) {
      var index = Math.floor(Math.random() * deck_cards.length)

      board.cards[deck_cards[index]].position = position++

      deck_cards.splice(index, 1)
    }

    return board
  }

  drawCards (player, amount) {
    var cards_drawn = []

    var deck_cards = this.findCards({player: player, state: 'DECK'})
    deck_cards.sort((a, b) => this.cards[a].position - this.cards[b].position)

    var board = this.copy()

    var howManyCards = Math.min(deck_cards.length, amount)

    for (var i = 0; i < deck_cards.length; i++) {
      if (i < howManyCards) {
        board.cards[deck_cards[i]].state = 'HAND'
      } else {
        board.cards[deck_cards[i]].position -= howManyCards
      }
    }

    return board
  }

  findVacantBoardPositions (player) {
    var board = this

    var positions = []

    for (var flank = 1; flank <= 3; flank++) {
      for (var row = 1; row <= 2; row++) {
        for (var col = 1; col <= (row == 1 ? 2 : 3); col++) {
          var occupant = board.findCard({position: {flank: flank, row: row, col: col}})
          console.log(occupant)
          if (occupant == null) {
            positions.push({flank: flank, row: row, col: col})
          }
        }
      }
    }

    return positions
  }

}

module.exports = Board
