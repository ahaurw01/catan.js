const _ = require('lodash')
const shortid = require('shortid')
const HILLS = 'hills'
const FOREST = 'forest'
const MOUNTAINS = 'mountains'
const FIELDS = 'fields'
const PASTURE = 'pasture'
const DESERT = 'desert'
const games = {}

function makeNewGame() {
  const id = shortid.generate()
  const gameState = makeGameState()
  games[id] = gameState
  return id
}

function updateWithGame(io, id) {
  io.to(id).emit('game', games[id])
}

function wireItUp(io) {
  io.on('connection', (socket) => {
    socket.on('join game', ({ id }) => {
      socket.join(id)
      socket.emit('game', games[id])
    })

    // Only to be used manually for testing or crisis management.
    socket.on('overwrite game', ({ id, game }) => {
      games[id] = game
      games[id].logs.push('game overridden')
      updateWithGame(io, id)
    })

    socket.on('set player', ({ id, color, name }) => {
      const gameState = games[id]
      gameState.players[color] = name
      gameState.logs.push(`${color} set to ${name}`)
      updateWithGame(io, id)
    })

    socket.on('kick player', ({ id, color }) => {
      const gameState = games[id]
      delete gameState.players[color]
      gameState.logs.push(`${color} removed from game`)
      updateWithGame(io, id)
    })

    socket.on('build road', ({ id, color, hash }) => {
      const gameState = games[id]
      _.find(gameState.sides, { hash }).road = { color }
      updateCount(gameState, 'roads', color, 1)
      gameState.logs.push(`${color} built road at ${hash}`)
      updateWithGame(io, id)
    })

    socket.on('remove road', ({ id, hash }) => {
      const gameState = games[id]
      const side = _.find(gameState.sides, { hash })
      const color = _.get(side, 'road.color')
      if (!color) return

      side.road = null
      updateCount(gameState, 'roads', color, -1)
      gameState.logs.push(`${color} removed road from ${hash}`)
      updateWithGame(io, id)
    })

    socket.on('build settlement', ({ id, color, hash }) => {
      const gameState = games[id]
      _.find(gameState.vertices, { hash }).building = {
        color,
        type: 'settlement',
      }
      updateCount(gameState, 'settlements', color, 1)
      gameState.logs.push(`${color} built settlement at ${hash}`)
      updateWithGame(io, id)
    })

    socket.on('remove building', ({ id, hash }) => {
      const gameState = games[id]
      const vertex = _.find(gameState.vertices, { hash })
      const color = _.get(vertex, 'building.color')
      const type = _.get(vertex, 'building.type')
      if (!color || !type) return

      vertex.building = null
      if (type === 'settlement') {
        updateCount(gameState, 'settlements', color, -1)
      } else {
        updateCount(gameState, 'cities', color, -1)
      }
      gameState.logs.push(`${color} removed ${type} from ${hash}`)
      updateWithGame(io, id)
    })

    socket.on('upgrade to city', ({ id, hash }) => {
      const gameState = games[id]
      const { building } = _.find(gameState.vertices, { hash })
      if (!building) return
      building.type = 'city'
      const color = building.color
      updateCount(gameState, 'cities', color, 1)
      updateCount(gameState, 'settlements', color, -1)
      gameState.logs.push(`settlement upgraded to city at ${hash}`)
      updateWithGame(io, id)
    })

    socket.on('update good', ({ id, color, good, diff }) => {
      const gameState = games[id]
      if (diff > 0 && gameState.bank.resources[good] <= 0) return

      gameState.resources[color][good] += diff
      gameState.bank.resources[good] -= diff
      updateCount(gameState, 'resources', color, diff)
      gameState.logs.push(`${color} ${diff > 0 ? 'took' : 'spent'} ${good}`)
      updateWithGame(io, id)
    })

    socket.on('move robber', ({ id, hash }) => {
      const gameState = games[id]
      gameState.tilePoints.forEach((point) => {
        point.robber = point.hash === hash
      })
      gameState.logs.push(`robber moved to ${hash}`)
      updateWithGame(io, id)
    })

    socket.on('roll', ({ id, color }) => {
      const gameState = games[id]
      gameState.roll = {
        one: _.random(1, 6),
        two: _.random(1, 6),
        id: gameState.roll.id + 1,
      }
      gameState.logs.push(
        `${color} rolled ${gameState.roll.one}, ${gameState.roll.two}`
      )
      updateWithGame(io, id)
    })

    socket.on('set longest road', ({ id, color }) => {
      const gameState = games[id]
      const prevOwner = gameState.longestRoad
      gameState.longestRoad = color
      gameState.logs.push(
        color
          ? `${color} claimed longest road`
          : `longest road given up by ${prevOwner}`
      )
      updateWithGame(io, id)
    })

    socket.on('set largest army', ({ id, color }) => {
      const gameState = games[id]
      const prevOwner = gameState.largestArmy
      gameState.largestArmy = color
      gameState.logs.push(
        color
          ? `${color} claimed largest army`
          : `largest army given up by ${prevOwner}`
      )
      updateWithGame(io, id)
    })

    socket.on('take dev card', ({ id, color }) => {
      const gameState = games[id]
      const numDevCardsInBank = gameState.bank.devCards.length
      if (numDevCardsInBank === 0) return
      const index = _.random(0, numDevCardsInBank - 1)
      const card = gameState.bank.devCards[index]
      gameState.resources[color].devCardsInHand.push(card)
      gameState.bank.devCards.splice(index, 1)
      updateCount(gameState, 'devCardsInHand', color, 1)

      gameState.logs.push(`${color} took a dev card`)
      updateWithGame(io, id)
    })

    socket.on('play dev card', ({ id, color, index }) => {
      const gameState = games[id]
      const card = gameState.resources[color].devCardsInHand[index]
      if (!card) return

      gameState.resources[color].devCardsInHand.splice(index, 1)
      gameState.resources[color].devCardsPlayed.push(card)
      updateCount(gameState, 'devCardsInHand', color, -1)
      updateCount(gameState, 'devCardsPlayed', color, 1)

      gameState.logs.push(
        `${color} played a dev card - ${card.type}${
          card.subType ? ` ${card.subType}` : ''
        }`
      )
      updateWithGame(io, id)
    })

    socket.on('undo play dev card', ({ id, color, index }) => {
      const gameState = games[id]
      const card = gameState.resources[color].devCardsPlayed[index]
      if (!card) return

      gameState.resources[color].devCardsPlayed.splice(index, 1)
      gameState.resources[color].devCardsInHand.push(card)
      updateCount(gameState, 'devCardsInHand', color, 1)
      updateCount(gameState, 'devCardsPlayed', color, -1)

      gameState.logs.push(
        `${color} took back a dev card - ${card.type}${
          card.subType ? ` ${card.subType}` : ''
        }`
      )
      updateWithGame(io, id)
    })

    socket.on('give random', ({ id, from, to }) => {
      const gameState = games[id]
      const goodToSteal = _(
        ['brick', 'grain', 'lumber', 'ore', 'wool'].reduce((hand, good) => {
          return [
            ...hand,
            ..._.fill(Array(gameState.resources[from][good]), good),
          ]
        }, [])
      )
        .shuffle()
        .head()

      gameState.resources[from][goodToSteal] -= 1
      updateCount(gameState, 'resources', from, -1)
      gameState.resources[to][goodToSteal] += 1
      updateCount(gameState, 'resources', to, 1)
      gameState.logs.push(`${to} stole from ${from}`)
      updateWithGame(io, id)
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
    counts: {
      roads: {},
      settlements: {},
      cities: {},
      devCardsInHand: {},
      devCardsPlayed: {},
      resources: {},
    },
    bank: {
      resources: {
        brick: 19,
        grain: 19,
        lumber: 19,
        ore: 19,
        wool: 19,
      },
      devCards: makeDevCards(),
    },
  }
  gameState.resources = makeResources()

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

  return gameState
}

module.exports = {
  wireItUp,
  makeNewGame,
  games,
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
    { side: [axial(-1, 2), axial(-1, 3)], goods: 'lumber', ratio: 2 },
    { side: [axial(-2, 2), axial(-3, 3)], goods: 'any', ratio: 3 },
    { side: [axial(-2, 1), axial(-3, 1)], goods: 'grain', ratio: 2 },
    { side: [axial(-1, -1), axial(-2, -1)], goods: 'ore', ratio: 2 },
    { side: [axial(0, -2), axial(0, -3)], goods: 'any', ratio: 3 },
    { side: [axial(1, -2), axial(2, -3)], goods: 'wool', ratio: 2 },
    { side: [axial(2, -1), axial(3, -2)], goods: 'any', ratio: 3 },
    { side: [axial(2, 0), axial(3, 0)], goods: 'any', ratio: 3 },
    { side: [axial(1, 1), axial(1, 2)], goods: 'brick', ratio: 3 },
  ].map((o) => ({ ...o, hash: hash(o.side) }))
}

function makeResources() {
  return ['red', 'blue', 'white', 'orange', 'green'].reduce(
    (resources, color) => {
      resources[color] = {
        brick: 0,
        grain: 0,
        lumber: 0,
        ore: 0,
        wool: 0,
        devCardsInHand: [],
        devCardsPlayed: [],
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

function updateCount(gameState, field, color, diff) {
  gameState.counts[field][color] = gameState.counts[field][color] || 0
  gameState.counts[field][color] += diff
}

function makeDevCards() {
  return [
    ..._.fill(Array(14), {
      type: 'knight',
    }),
    ..._.fill(Array(5), {
      type: 'victoryPoint',
    }),
    ..._.fill(Array(2), {
      type: 'progress',
      subType: 'road building',
    }),
    ..._.fill(Array(2), {
      type: 'progress',
      subType: 'year of plenty',
    }),
    ..._.fill(Array(2), {
      type: 'progress',
      subType: 'monopoly',
    }),
  ]
}
