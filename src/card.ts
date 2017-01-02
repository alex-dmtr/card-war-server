import { BoardPosition } from './boardPosition'

export class Card {

  _id: number
  health: number
  type: string
  cardType: string
  status: string
  player_id: number
  position: number
  boardPosition: BoardPosition


  constructor(_id) {
    this._id = _id

  }

  copy() {
    let newCard = new Card(this._id)

    newCard.type = this.type
    newCard.cardType = this.cardType
    newCard.health = this.health
    newCard.status = this.status
    newCard.player_id = this.player_id
    newCard.position = this.position
    newCard.boardPosition = this.boardPosition
    
    return newCard
  }
}
