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

  onUpdateGame = (handler) => this.handlers.add(handler)
  offUpdateGame = (handler) => this.handlers.delete(handler)

  updateGame = (game) =>
    Array.from(this.handlers).forEach((handler) => handler(game))
}

export default GameStateManager
