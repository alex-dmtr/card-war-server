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
      assert(action.player.mp > 0)

      let occupant = board.findCard({player: action.player._id, state: 'BOARD', boardPosition: action.boardPosition})
      let boardPosition = action.boardPosition


      let  card= board.findCard({id: action.card._id})

      card.boardPosition = boardPosition
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
  getPossibleActions () : Action[] {
    let board = this.board

    let hand_soldier_cards = board.findCards({player: board.activePlayer_id, state: 'HAND', cardType: 'SOLDIER'})

    let possibleActions = new Array<Action>()
    if (board.players[board.activePlayer_id].mp > 0) {
      let emptyPositions = board.findVacantBoardPositions(board.activePlayer_id)
      for (let i = 0; i < hand_soldier_cards.length; i++) {
        let card = hand_soldier_cards[i]

        for (let j = 0; j < emptyPositions.length; j++) {
          let position = emptyPositions[j]

          let action = new Action('PLAY_SOLDIER', board.players[board.activePlayer_id])
          action.card = card
          action.boardPosition = position
          possibleActions.push(action)
        }
      }
    }

    let action = new Action('END_TURN', board.players[board.activePlayer_id])
    possibleActions.push(action)
    return possibleActions
  }

}
