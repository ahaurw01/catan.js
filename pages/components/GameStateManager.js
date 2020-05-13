import io from 'socket.io-client'

class GameStateManager {
  constructor() {
    this.socket = io('http://localhost:3000')
    this.socket.on('log', console.log)
  }
}

export default GameStateManager
