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
    updateWithGame(socket)

    socket.on('set player', ({ color, name }) => {
      gameState.players[color] = name
      gameState.logs.push(`${color} set to ${name}`)
      updateWithGame(io)
    })

    socket.on('kick player', ({ color }) => {
      delete gameState.players[color]
      gameState.logs.push(`${color} removed from game`)
      updateWithGame(io)
    })

    socket.on('build road', ({ color, hash }) => {
      _.find(gameState.sides, { hash }).road = { color }
      gameState.logs.push(`${color} built road at ${hash}`)
      updateWithGame(io)
    })

    socket.on('remove road', ({ hash }) => {
      _.find(gameState.sides, { hash }).road = null
      gameState.logs.push(`road removed from ${hash}`)
      updateWithGame(io)
    })

    socket.on('build settlement', ({ color, hash }) => {
      _.find(gameState.vertices, { hash }).building = {
        color,
        type: 'settlement',
      }
      gameState.logs.push(`${color} built settlement at ${hash}`)
      updateWithGame(io)
    })

    socket.on('remove building', ({ hash }) => {
      _.find(gameState.vertices, { hash }).building = null
      gameState.logs.push(`building removed from ${hash}`)
      updateWithGame(io)
    })

    socket.on('upgrade to city', ({ hash }) => {
      const { building } = _.find(gameState.vertices, { hash })
      if (!building) return
      building.type = 'city'
      gameState.logs.push(`settlement upgraded to city at ${hash}`)
      updateWithGame(io)
    })

    socket.on('update good', ({ color, good, diff }) => {
      gameState.resources[color][good] += diff
      gameState.logs.push(`${color} ${diff > 0 ? 'took' : 'spent'} ${good}`)
      updateWithGame(io)
    })

    socket.on('move robber', ({ hash }) => {
      gameState.tilePoints.forEach((point) => {
        point.robber = point.hash === hash
      })
      gameState.logs.push(`robber moved to ${hash}`)
      updateWithGame(io)
    })

    socket.on('roll', ({ color }) => {
      gameState.roll = {
        one: _.random(1, 6),
        two: _.random(1, 6),
        id: gameState.roll.id + 1,
      }
      gameState.logs.push(
        `${color} rolled ${gameState.roll.one}, ${gameState.roll.two}`
      )
      updateWithGame(io)
    })

    socket.on('set longest road', ({ color }) => {
      const prevOwner = gameState.longestRoad
      gameState.longestRoad = color
      gameState.logs.push(
        color
          ? `${color} claimed longest road`
          : `longest road given up by ${prevOwner}`
      )
      updateWithGame(io)
    })

    socket.on('set largest army', ({ color }) => {
      const prevOwner = gameState.largestArmy
      gameState.largestArmy = color
      gameState.logs.push(
        color
          ? `${color} claimed largest army`
          : `largest army given up by ${prevOwner}`
      )
      updateWithGame(io)
    })
  })
}

function makeGameState() {
  const gameState = {
    logs: [],
    players: {
      // red: 'settlerboi',
      // orange: 'crush-it',
      // if color is not used, it is not present here.
    },
    roll: {
      one: 6,
      two: 6,
      id: 0,
    },
    longestRoad: null,
    largestArmy: null,
  }

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
    hash: hash([point]),
  }))

  gameState.vertices = makeAllVertices(tilePoints)
  gameState.sides = makeAllSides(tilePoints)
  gameState.ports = makePorts()
  gameState.resources = makeResources()

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
      hash: hash(o.vertex),
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
      hash: hash(o.side),
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

function makePorts() {
  return [
    { side: [axial(-1, -1), axial(-2, -1)], goods: 'lumber', ratio: 2 },
    { side: [axial(-1, 3), axial(-1, 2)], goods: 'any', ratio: 3 },
  ].map((o) => ({ ...o, hash: hash(o.side) }))
}

function makeResources() {
  return ['red', 'blue', 'white', 'orage', 'green'].reduce(
    (resources, color) => {
      resources[color] = {
        brick: 0,
        grain: 0,
        lumber: 0,
        ore: 0,
        wool: 0,
      }
      return resources
    },
    {}
  )
}

function hash(points) {
  return `${avg(..._.map(points, 'q'))},${avg(..._.map(points, 'r'))}`
}

function avg(...nums) {
  return nums.reduce((sum, num) => sum + num, 0) / nums.length
}
