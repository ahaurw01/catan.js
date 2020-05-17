import io from 'socket.io-client'

class GameStateManager {
  constructor() {
    this.socket = io()
    this.socket.on('log', console.log)
    this.socket.on('game', this.updateGame)
  }

  close = () => {
    this.socket.close()
  }

  handlers = new Set()

  setPlayer = ({ color, name }) => {
    localStorage.setItem('player', color)
    this.socket.emit('set player', { color, name })
    this.player = color
    this.updateGame()
  }

  onUpdateGame = (handler) => this.handlers.add(handler)
  offUpdateGame = (handler) => this.handlers.delete(handler)

  updateGame = (game) => {
    if (game) this.game = game
    if (!this.player) {
      this.player = localStorage.getItem('player')
    }
    Array.from(this.handlers).forEach((handler) =>
      handler({
        game: this.game,
        player: this.player,
        hasSettlement: this.hasSettlement,
        myResources: this.myResources,
      })
    )
  }

  buildRoad = (hash) => {
    if (!this.player) return
    this.socket.emit('build road', { color: this.player, hash })
  }

  removeRoad = (hash) => {
    if (!this.player) return
    this.socket.emit('remove road', { hash })
  }

  buildSettlement = (hash) => {
    if (!this.player) return
    this.socket.emit('build settlement', { color: this.player, hash })
  }

  removeBuilding = (hash) => {
    if (!this.player) return
    this.socket.emit('remove building', { hash })
  }

  upgradeToCity = (hash) => {
    if (!this.player) return
    this.socket.emit('upgrade to city', { hash })
  }

  changeGood = ({ diff, good }) => {
    if (!this.player) return
    this.socket.emit('update good', { color: this.player, good, diff })
  }

  moveRobber = (hash) => {
    if (!this.player) return
    this.socket.emit('move robber', { hash })
  }

  get hasSettlement() {
    return (
      this.game.vertices.filter(
        ({ building }) =>
          building &&
          building.color === this.player &&
          building.type === 'settlement'
      ).length > 0
    )
  }

  get myResources() {
    if (!this.player) return null

    return this.game.resources[this.player]
  }
}

export default GameStateManager
