import io from 'socket.io-client'

class GameStateManager {
  constructor() {
    this.socket = io('http://localhost:3000')
    this.socket.on('log', console.log)
    this.socket.on('game', this.updateGame)
  }

  handlers = new Set()

  setName = ({ color, name }) => {
    this.socket.emit('set name', { color, name })
  }

  setPlayer = (player) => {
    this.player = player
  }

  onUpdateGame = (handler) => this.handlers.add(handler)
  offUpdateGame = (handler) => this.handlers.delete(handler)

  updateGame = (game) =>
    Array.from(this.handlers).forEach((handler) => handler(game))

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
}

export default GameStateManager
