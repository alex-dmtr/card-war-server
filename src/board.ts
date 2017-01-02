import { Card } from './card'
import { Player } from './player'
import Debug = require('debug') 
let debug = Debug('rc-server:board')


export class Board {

  players: Player[]
  cards: Card[]
  activePlayer_id: number
  _cardID: number


  constructor () {
    this.players = []

    for (let i = 0; i <= 1; i++) {
      this.players[i] = new Player(i)
      this.players[i].mp = 3
    }

    this.cards = []

    // this.history = []

    this.activePlayer_id = 0

    this._cardID = 0
  }

  copy () {
    let board = new Board()

    board.players = []

    for (let i = 0; i <= 1; i++) {
      board.players[i] = this.players[i].copy()
    }

    board.cards = []

    for (let i = 0; i < this.cards.length; i++) {
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

    let newCard = new Card(this._cardID++)

    newCard.type = card.type
    newCard.player_id = card.player_id
    newCard.status = card.status
    newCard.cardType = card.cardType
    newCard.health = card.health
  
    this.cards.push(newCard)

    return newCard  
  }

  addArmy (army, player) {

    for (let i = 0; i < army.length; i++) {
      this.addCard({type: army[i].type, player_id: player, status: 'DECK', cardType: army[i].cardType})
    }
  }

  static newArmy () {
    let army = []

    for (let i = 1; i <= 5; i++) {
      army.push({ type: 'CARD_SPEARMAN', cardType: 'SOLDIER'})
      army.push({ type: 'CARD_CROSSBOWMAN', cardType: 'SOLDIER'})
    }

    for (let i = 1; i <= 2; i++) {
      army.push({ type: 'CARD_KNIGHT', cardType: 'SOLDIER'})
    }

    return army
  }

  cardFitsCriteria (card : Card, criteria) {
    let ok = true

    if (criteria != null) {
      if (criteria.hasOwnProperty('type')) {
        if (card.type != criteria.type) {
          ok = false
        }
      }

      if (criteria.hasOwnProperty('player')) {
        if (card.player_id != criteria.player) { ok = false }
      }

      if (criteria.hasOwnProperty('state')) {
        if (card.status != criteria.state) { ok = false }
      }

      if (criteria.hasOwnProperty('id')) {
        if (card._id != criteria.id) { ok = false }
      }

      if (criteria.hasOwnProperty('position')) {
        if (card.position != criteria.position) {
          ok = false
        }
      }

      return ok
    }
  }

  findCards (criteria): Card[] {
    let cards_found = new Array<Card>()

    for (let i = 0; i < this.cards.length; i++) {
      if (this.cardFitsCriteria(this.cards[i], criteria)) {
        cards_found.push(this.cards[i])
      }
    }
    return cards_found
  }

  findCard (criteria): Card {
    for (let i = 0; i < this.cards.length; i++) {
      if (this.cardFitsCriteria(this.cards[i], criteria)) { return this.cards[i] }
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

    let deck_cards = this.findCards({player: player, state: 'DECK'})

    let position = 0

    for (position = 0; position < deck_cards.length; position++)
        deck_cards[position].position = position;

    for (position = 0; position < deck_cards.length; position++) {
      let index = position + Math.floor(Math.random() * (deck_cards.length - position))

      let tmp = deck_cards[index].position;
      deck_cards[index].position = deck_cards[position].position;
      deck_cards[position].position = tmp; 
      }

  }

  drawCards (player_id : number, amount : number) {
    let cards_drawn = []

    let deck_cards = this.findCards({player: player_id, state: 'DECK'})
    deck_cards.sort((a, b) => a.position - b.position)


    let howManyCards = Math.min(deck_cards.length, amount)

    for (let i = 0; i < deck_cards.length; i++) {
      if (i < howManyCards) {
        deck_cards[i].status = 'HAND'
      } else {
        deck_cards[i].position -= howManyCards
      }
    }
  }

  findVacantBoardPositions (player) {
    let board = this

    let positions = []

    // for (let flank = 1; flank <= 3; flank++) {
    //   for (let row = 1; row <= 2; row++) {
    //     for (let col = 1; col <= (row == 1 ? 2 : 3); col++) {
    //       let occupant = board.findCard({position: {flank: flank, row: row, col: col}})
    //       // console.log(occupant)
    //       if (occupant == null) {
    //         positions.push({flank: flank, row: row, col: col})
    //       }
    //     }
    //   }
    // }

    return positions
  }

}
