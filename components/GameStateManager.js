import { last } from 'lodash'
import io from 'socket.io-client'

class GameStateManager {
  constructor() {
    this.socket = io()
    this.socket.on('log', console.log)
    this.socket.on('game', this.updateGame)

    window.overwriteGame = (game) => {
      this.emit('overwrite game', game)
    }
  }

  emit = (type, msgObj) => {
    this.socket.emit(type, { id: this.id, ...msgObj })
  }

  joinGame = (id) => {
    this.id = id
    this.emit('join game', { id })
  }

  close = () => {
    this.socket.close()
  }

  handlers = new Set()

  setPlayer = ({ color, name }) => {
    localStorage.setItem('player', color)
    if (this.player && this.player !== color) {
      this.emit('kick player', { color: this.player })
    }
    this.player = color
    this.emit('set player', { color, name })
  }

  onUpdateGame = (handler) => this.handlers.add(handler)
  offUpdateGame = (handler) => this.handlers.delete(handler)

  updateGame = (game) => {
    localStorage.setItem('game', JSON.stringify(game))
    if (game) this.game = game
    if (!this.player) {
      this.player = localStorage.getItem('player')
    }
    if (game.logs && game.logs.length) {
      console.log('>>>', last(game.logs))
    }

    Array.from(this.handlers).forEach((handler) =>
      handler({
        game: this.game,
        player: this.player,
        hasSettlement: this.hasSettlement,
        myResources: this.myResources,
        myDevCardsInHand: this.myDevCardsInHand,
        myDevCardsPlayed: this.myDevCardsPlayed,
        hasLongestRoad: this.hasLongestRoad,
        hasLargestArmy: this.hasLargestArmy,
        canBuildMoreRoads: this.canBuildMoreRoads,
        canBuildMoreSettlements: this.canBuildMoreSettlements,
        canUpgradeMoreCities: this.canUpgradeMoreCities,
      })
    )
  }

  buildRoad = (hash) => {
    if (!this.player) return
    this.emit('build road', { color: this.player, hash })
  }

  removeRoad = (hash) => {
    if (!this.player) return
    this.emit('remove road', { hash })
  }

  buildSettlement = (hash) => {
    if (!this.player) return
    this.emit('build settlement', { color: this.player, hash })
  }

  removeBuilding = (hash) => {
    if (!this.player) return
    this.emit('remove building', { hash })
  }

  upgradeToCity = (hash) => {
    if (!this.player) return
    this.emit('upgrade to city', { hash })
  }

  changeGood = ({ diff, good }) => {
    if (!this.player) return
    this.emit('update good', { color: this.player, good, diff })
  }

  moveRobber = (hash) => {
    if (!this.player) return
    this.emit('move robber', { hash })
  }

  roll = () => {
    if (!this.player) return
    this.emit('roll', { color: this.player })
  }

  setLongestRoad = () => {
    if (!this.player) return
    const color = this.hasLongestRoad ? null : this.player
    this.emit('set longest road', { color })
  }

  setLargestArmy = () => {
    if (!this.player) return
    const color = this.hasLargestArmy ? null : this.player
    this.emit('set largest army', { color })
  }

  takeDevCard = () => {
    if (!this.player) return
    this.emit('take dev card', { color: this.player })
  }

  playDevCard = (index) => {
    if (!this.player) return
    this.emit('play dev card', { color: this.player, index })
  }

  undoPlayDevCard = (index) => {
    if (!this.player) return
    this.emit('undo play dev card', { color: this.player, index })
  }

  giveRandom = (color) => {
    if (!this.player) return
    this.emit('give random', { from: this.player, to: color })
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

  get hasLongestRoad() {
    return this.player && this.game.longestRoad === this.player
  }

  get hasLargestArmy() {
    return this.player && this.game.largestArmy === this.player
  }

  get myResources() {
    if (!this.player) return null

    return this.game.resources[this.player]
  }

  get myDevCardsInHand() {
    if (!this.player) return null

    return this.game.resources[this.player].devCardsInHand
  }

  get myDevCardsPlayed() {
    if (!this.player) return null

    return this.game.resources[this.player].devCardsPlayed
  }

  get canBuildMoreRoads() {
    if (!this.player) return false

    return (this.game.counts.roads[this.player] || 0) < 15
  }

  get canBuildMoreSettlements() {
    if (!this.player) return false

    return (this.game.counts.settlements[this.player] || 0) < 5
  }

  get canUpgradeMoreCities() {
    if (!this.player) return false

    return (this.game.counts.cities[this.player] || 0) < 4
  }
}

export default GameStateManager
