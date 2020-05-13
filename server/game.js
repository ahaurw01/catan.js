const { shuffle } = require('lodash')
const HILLS = 'hills'
const FOREST = 'forest'
const MOUNTAINS = 'mountains'
const FIELDS = 'fields'
const PASTURE = 'pasture'
const DESERT = 'desert'
const gameState = makeGameState()

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

function makeGameState() {
  const gameState = { players: {} }

  // prettier-ignore
  const tileTypes = shuffle([
    MOUNTAINS, PASTURE, FOREST,
    FIELDS, HILLS, PASTURE, HILLS,
    FIELDS, FOREST, DESERT, FOREST, MOUNTAINS,
    FOREST, MOUNTAINS, FIELDS, PASTURE,
    HILLS, FIELDS, PASTURE,
  ])

  // prettier-ignore
  const dieNumbers = shuffle([
    10, 2, 9,
    12, 6, 4, 10,
    9, 11,    3, 8,
    8, 3, 4, 5,
    5, 6, 11
  ])

  const axial = (q, r) => ({ q, r })

  // prettier-ignore
  const tilePoints = [
    axial(0, -2), axial(1, -2), axial(2, -2),
    axial(-1, -1), axial(0, -1), axial(1, -1), axial(2, -1),
    axial(-2, 0), axial(-1, 0), axial(0, 0), axial(1, 0), axial(2, 0),
    axial(-2, 1), axial(-1, 1), axial(0, 1), axial(1, 1),
    axial(-2, 2), axial(-1, 2), axial(0, 2),
  ]

  let dieNumberIndex = 0
  gameState.tilePoints = tilePoints.map((point, index) => ({
    ...point,
    type: tileTypes[index],
    dieNumber:
      tileTypes[index] === 'desert' ? null : dieNumbers[dieNumberIndex++],
    robber: tileTypes[index] === 'desert',
  }))

  return gameState
}

module.exports = {
  wireItUp,
}
