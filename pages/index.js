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
    const { gameStateManager, game } = this.state
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

                  <Building
                    vertex={[axial(0, 0), axial(1, 0), axial(0, 1)]}
                    color="orange"
                    type="settlement"
                  />
                  <Building
                    vertex={[axial(1, 1), axial(0, 1), axial(0, 2)]}
                    color="orange"
                    type="city"
                  />

                  <Road color="orange" side={[axial(-1, -1), axial(-1, 0)]} />
                  <Road color="red" side={[axial(0, 0), axial(0, -1)]} />

                  <Port
                    side={[axial(-1, -1), axial(-2, -1)]}
                    goods="lumber"
                    ratio={2}
                  />
                  <Port
                    side={[axial(-1, 3), axial(-1, 2)]}
                    goods="any"
                    ratio={3}
                  />
                </Board>
              }
              actionSlot={
                <GameActions
                  onSetName={gameStateManager.setName}
                  players={game.players}
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
