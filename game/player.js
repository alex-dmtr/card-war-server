class Player {
  constructor(_id) {
    this._id = _id
    this.mp = 0
  }

  copy() {
    var newPlayer = new Player(this._id)

    newPlayer.mp = this.mp

    return newPlayer
  }
}

module.exports = Player

