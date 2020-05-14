const _ = require('lodash')
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
  const tileTypes = _.shuffle([
    MOUNTAINS, PASTURE, FOREST,
    FIELDS, HILLS, PASTURE, HILLS,
    FIELDS, FOREST, DESERT, FOREST, MOUNTAINS,
    FOREST, MOUNTAINS, FIELDS, PASTURE,
    HILLS, FIELDS, PASTURE,
  ])

  // prettier-ignore
  const dieNumbers = _.shuffle([
    10, 2, 9,
    12, 6, 4, 10,
    9, 11,    3, 8,
    8, 3, 4, 5,
    5, 6, 11
  ])

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

  gameState.vertices = makeAllVertices(tilePoints)
  gameState.sides = makeAllSides(tilePoints)

  return gameState
}

module.exports = {
  wireItUp,
}

function axial(q, r) {
  return { q, r }
}

/**
 * Make an array of all vertices (triples of points) that correspond to all
 * tile points given.
 *
 * @param {Object[]} points q and r coordinates
 */
function makeAllVertices(points) {
  function makeVertices({ q, r }) {
    return [
      // Top
      { vertex: [axial(q, r), axial(q, r - 1), axial(q + 1, r - 1)] },
      // Top/Right
      { vertex: [axial(q, r), axial(q + 1, r - 1), axial(q + 1, r)] },
      // Bottom/Right
      { vertex: [axial(q, r), axial(q + 1, r), axial(q, r + 1)] },
      // Bottom
      { vertex: [axial(q, r), axial(q, r + 1), axial(q - 1, r + 1)] },
      // Botom/Left
      { vertex: [axial(q, r), axial(q - 1, r + 1), axial(q - 1, r)] },
      // Top/Left
      { vertex: [axial(q, r), axial(q - 1, r), axial(q, r - 1)] },
    ].map((o) => ({
      ...o,
      hash: `${avg(..._.map(o.vertex, 'q'))},${avg(..._.map(o.vertex, 'r'))}`,
      building: null,
    }))
  }

  return _(points)
    .map(makeVertices)
    .flatten()
    .sortBy('hash')
    .sortedUniqBy('hash')
    .value()
}

function makeAllSides(points) {
  function makeSides({ q, r }) {
    return [
      // Top/Left
      { side: [axial(q, r), axial(q, r - 1)] },
      // Top/Right
      { side: [axial(q, r), axial(q + 1, r - 1)] },
      // Right
      { side: [axial(q, r), axial(q + 1, r)] },
      // Bottom/Right
      { side: [axial(q, r), axial(q, r + 1)] },
      // Botom/Left
      { side: [axial(q, r), axial(q - 1, r + 1)] },
      // Left
      { side: [axial(q, r), axial(q - 1, r)] },
    ].map((o) => ({
      ...o,
      hash: `${avg(..._.map(o.side, 'q'))},${avg(..._.map(o.side, 'r'))}`,
      road: null,
    }))
  }

  return _(points)
    .map(makeSides)
    .flatten()
    .sortBy('hash')
    .sortedUniqBy('hash')
    .value()
}

function avg(...nums) {
  return nums.reduce((sum, num) => sum + num, 0) / nums.length
}
