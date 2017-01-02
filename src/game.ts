import {Board} from "./board"
import {HistoryVar} from './historyVar'
import {Action} from './action'
import assert = require('assert')

export class Game {

  board: Board
  history: HistoryVar[] 

  constructor () {
    this.board = new Board()
    this.history = []
  }

  doAction (action: Action) {
    let board = this.board.copy()

    if (action.type == 'START_TURN') {
      board.drawCards(board.activePlayer_id, 0)
      this.history.push(new HistoryVar(action, board))

      this.board = board
    }
    if (action.type == 'END_TURN') {
      if (board.activePlayer_id == 0) {
        board.activePlayer_id = 1
      } else {
        board.activePlayer_id = 0
      }

      this.history.push(new HistoryVar(action, board))
      this.board = board
      this.doAction(new Action("START_TURN", null))
    }
    if (action.type == 'PLAY_SOLDIER') {
      assert(board.players[action.player_id].mp > 0)

      let occupant = board.findCard({player: action.player_id, state: 'BOARD', position: action.position})

      assert(occupant == null)

      let  card= board.findCard({id: action.card})

      card.position = action.position
      card.status = 'BOARD'

      this.board = board
      this.history.push(new HistoryVar(action, board))
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

    this.board.addArmy(Board.newArmy(), 0)
    this.board.addArmy(Board.newArmy(), 1)

    // randomize decks
    this.board.randomizeDeck(0)
    this.board.randomizeDeck(1)

    // take out 4 for each player
    this.board.drawCards(0, 4)
    this.board.drawCards(1, 4)

    this.board.activePlayer_id = 0

    this.doAction(new Action('START_TURN', null))
    // this.doAction({type: 'END_TURN'})
  }
  getPossibleActions () {
    let board = this.board

    let hand_soldier_cards = board.findCards({player: board.activePlayer_id, state: 'HAND', cardType: 'SOLDIER'})

    let possibleActions = []
    if (board.players[board.activePlayer_id].mp > 0) {
      let emptyPositions = board.findVacantBoardPositions(board.activePlayer_id)
      for (let i = 0; i < hand_soldier_cards.length; i++) {
        let card = hand_soldier_cards[i]

        for (let j = 0; j < emptyPositions.length; j++) {
          let position = emptyPositions[j]

          possibleActions.push({type: 'PLAY_SOLDIER', card: card._id, player: board.activePlayer_id, position: position})
        }
      }
    }

    possibleActions.push({type: 'END_TURN', player: board.activePlayer_id})
    return possibleActions
  }

}
