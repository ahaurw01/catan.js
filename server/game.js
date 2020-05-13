const gameState = { players: {} }

function updateWithGame(io) {
  io.emit('game', gameState)
}

function wireItUp(io) {
  io.on('connection', (socket) => {
    console.log('a user connected')
    socket.emit('log', 'yo dawg')
    updateWithGame(socket)

    socket.on('set name', ({ color, name }) => {
      gameState.players[color] = name
      updateWithGame(io)
    })
  })
}

module.exports = {
  wireItUp,
}
