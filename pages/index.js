import Head from 'next/head'
import Board from '../components/Board'
import Tile from '../components/Tile'
import Building from '../components/Building'
import Road from '../components/Road'
import Port from '../components/Port'
import Robber from '../components/Robber'
import Layout from '../components/Layout'
import GameActions from '../components/GameActions'
import { Component } from 'react'
import GameStateManager from '../components/GameStateManager'

export default class Home extends Component {
  state = {
    gameStateManager: null,
    game: null,
    player: null,
    hasSettlement: false,
    isBuildingRoad: false,
    isBuildingSettlement: false,
    isUpgradingToCity: false,
  }

  componentDidMount() {
    const gameStateManager = new GameStateManager()
    gameStateManager.onUpdateGame(({ game, player, hasSettlement }) => {
      console.log(game)
      this.setState({ game, player, hasSettlement })
    })
    this.setState({
      gameStateManager,
    })
  }

  render() {
    const {
      gameStateManager,
      game,
      isBuildingRoad,
      isBuildingSettlement,
      isUpgradingToCity,
      player,
      hasSettlement,
    } = this.state
    return (
      <div className="container">
        <Head>
          <title>Catan</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          {gameStateManager && game && (
            <Layout
              boardSlot={
                <Board>
                  {game.tilePoints.map(({ type, q, r, dieNumber }) => (
                    <Tile
                      key={`${q},${r}`}
                      type={type}
                      q={q}
                      r={r}
                      dieNumber={dieNumber}
                    />
                  ))}
                  <Robber
                    {...game.tilePoints.filter(({ robber }) => robber)[0]}
                  />

                  {game.vertices.map(({ vertex, hash, building }) => {
                    if (!building && !isBuildingSettlement) return null
                    if (building) {
                      return (
                        <Building
                          type={building.type}
                          vertex={vertex}
                          key={hash}
                          color={building.color}
                          onRemove={() => gameStateManager.removeBuilding(hash)}
                          isUpgradeable={
                            player === building.color && isUpgradingToCity
                          }
                        />
                      )
                    }
                    return (
                      <Building
                        isBuildable
                        onBuild={() => {
                          gameStateManager.buildSettlement(hash)
                          this.setState({ isBuildingSettlement: false })
                        }}
                        vertex={vertex}
                        key={hash}
                        type="settlement"
                      />
                    )
                  })}

                  {game.sides.map(({ side, hash, road }) => {
                    if (!road && !isBuildingRoad) return null
                    if (road) {
                      return (
                        <Road
                          side={side}
                          key={hash}
                          color={road.color}
                          onRemove={() => gameStateManager.removeRoad(hash)}
                        />
                      )
                    }
                    return (
                      <Road
                        isBuildable
                        onBuild={() => {
                          gameStateManager.buildRoad(hash)
                          this.setState({ isBuildingRoad: false })
                        }}
                        side={side}
                        key={hash}
                      />
                    )
                  })}

                  {game.ports.map(({ side, hash, goods, ratio }) => (
                    <Port side={side} goods={goods} ratio={ratio} key={hash} />
                  ))}
                </Board>
              }
              actionSlot={
                <GameActions
                  onSetName={gameStateManager.setName}
                  onSetPlayer={gameStateManager.setPlayer}
                  players={game.players}
                  onBuildRoad={() => {
                    this.setState(({ isBuildingRoad }) => ({
                      isBuildingRoad: !isBuildingRoad,
                    }))
                  }}
                  isBuildingRoad={isBuildingRoad}
                  onBuildSettlement={() => {
                    this.setState(({ isBuildingSettlement }) => ({
                      isBuildingSettlement: !isBuildingSettlement,
                    }))
                  }}
                  isBuildingSettlement={isBuildingSettlement}
                  canUpgradeToCity={hasSettlement}
                  isUpgradingToCity={isUpgradingToCity}
                  onUpgradeToCity={() => {
                    this.setState(({ isUpgradingToCity }) => ({
                      isUpgradingToCity: !isUpgradingToCity,
                    }))
                  }}
                />
              }
              itemSlot={<div />}
            />
          )}
        </main>
      </div>
    )
  }
}
