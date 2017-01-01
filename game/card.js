class Card {

  constructor(_id) {
    this._id = _id
    this.health = 0
    this.type = ""
    this.cardType = ""
    this.status = ""
    this.player_id = "";

  }

  copy() {
    var newCard = new Card(this._id)

    newCard.type = this.type
    newCard.cardType = this.cardType
    newCard.health = this.health
    newCard.status = this.status
    newCard.player_id = this.player_id

    return newCard
  }
}

module.exports = Card
