import io from 'socket.io-client'

class GameStateManager {
  constructor() {
    this.socket = io()
    this.socket.on('log', console.log)
    this.socket.on('game', this.updateGame)
  }

  handlers = new Set()

  setName = ({ color, name }) => {
    this.socket.emit('set name', { color, name })
  }

  setPlayer = (player) => {
    this.player = player
    this.updateGame()
  }

  onUpdateGame = (handler) => this.handlers.add(handler)
  offUpdateGame = (handler) => this.handlers.delete(handler)

  updateGame = (game) => {
    if (game) this.game = game
    Array.from(this.handlers).forEach((handler) =>
      handler({
        game: this.game,
        player: this.player,
        hasSettlement: this.hasSettlement,
      })
    )
  }

  buildRoad = (hash) => {
    if (!this.player) return
    this.socket.emit('build road', { color: this.player, sideHash: hash })
  }

  removeRoad = (hash) => {
    if (!this.player) return
    this.socket.emit('remove road', { sideHash: hash })
  }

  buildSettlement = (hash) => {
    if (!this.player) return
    this.socket.emit('build settlement', { color: this.player, sideHash: hash })
  }

  removeBuilding = (hash) => {
    if (!this.player) return
    this.socket.emit('remove building', { sideHash: hash })
  }

  get hasSettlement() {
    console.log('check for', this.player)
    return (
      this.game.vertices.filter(
        ({ building }) =>
          building &&
          building.color === this.player &&
          building.type === 'settlement'
      ).length > 0
    )
  }
}

export default GameStateManager
