import Head from 'next/head'
import Board from './components/Board'
import Tile from './components/Tile'
import Building from './components/Building'
import { axial } from './utils'
import Road from './components/Road'
import Port from './components/Port'
import Robber from './components/Robber'
import Layout from './components/Layout'
import GameActions from './components/GameActions'
import { Component } from 'react'
import GameStateManager from './components/GameStateManager'

export default class Home extends Component {
  state = {
    gameStateManager: null,
    game: null,
    isBuildingRoad: false,
  }

  componentDidMount() {
    const gameStateManager = new GameStateManager()
    gameStateManager.onUpdateGame((game) => {
      console.log(game)
      this.setState({ game })
    })
    this.setState({
      gameStateManager,
    })
  }

  render() {
    const { gameStateManager, game, isBuildingRoad } = this.state
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

                  {game.vertices.map(({ vertex, hash }) => (
                    <Building
                      key={hash}
                      vertex={vertex}
                      color="red"
                      type="settlement"
                    />
                  ))}

                  {game.sides.map(({ side, hash, road }) => {
                    if (!road && !isBuildingRoad) return null
                    if (road) {
                      return <Road side={side} key={hash} color={road.color} />
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
                        color={road ? road.color : undefined}
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
