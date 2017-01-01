export class Player {


  _id: number
  mp: number

  constructor(_id) {
    this._id = _id
    this.mp = 0
  }

  copy() {
    let newPlayer = new Player(this._id)

    newPlayer.mp = this.mp

    return newPlayer
  }
}


