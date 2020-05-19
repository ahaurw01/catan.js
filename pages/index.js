import Head from 'next/head'
import Board from '../components/Board'
import Tile from '../components/Tile'
import Building from '../components/Building'
import Road from '../components/Road'
import Port from '../components/Port'
import Robber from '../components/Robber'
import Layout from '../components/Layout'
import GameActions from '../components/GameActions'
import GameResources from '../components/GameResources'
import { Component } from 'react'
import GameStateManager from '../components/GameStateManager'
import Dice from '../components/Dice'
import { Tabs, Tab, TabBody } from 'react95/dist/prod'

export default class Home extends Component {
  state = {
    gameStateManager: null,
    game: null,
    player: null,
    hasSettlement: false,
    isBuildingRoad: false,
    isBuildingSettlement: false,
    isUpgradingToCity: false,
    isMovingRobber: false,
    activeTab: 0,
  }

  componentDidMount() {
    const gameStateManager = new GameStateManager()
    gameStateManager.onUpdateGame(
      ({
        game,
        player,
        hasSettlement,
        myResources,
        hasLongestRoad,
        hasLargestArmy,
      }) => {
        this.setState({
          game,
          player,
          hasSettlement,
          myResources,
          hasLongestRoad,
          hasLargestArmy,
        })
      }
    )
    this.setState({
      gameStateManager,
    })
  }

  componentWillUnmount() {
    this.state.gameStateManager.close()
  }

  render() {
    const {
      gameStateManager,
      game,
      isBuildingRoad,
      isBuildingSettlement,
      isUpgradingToCity,
      isMovingRobber,
      player,
      hasSettlement,
      myResources,
      activeTab,
      hasLongestRoad,
      hasLargestArmy,
    } = this.state
    return (
      <div className="container">
        <Head>
          <title>Settlers.exe</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main style={{ maxWidth: '1280px', margin: 'auto' }}>
          {gameStateManager && game && (
            <Layout
              boardSlot={
                <>
                  <Tabs
                    value={activeTab}
                    onChange={(value) => this.setState({ activeTab: value })}
                  >
                    <Tab value={0}>Board</Tab>
                    <Tab value={1}>Opponents</Tab>
                  </Tabs>
                  {activeTab === 0 && (
                    <TabBody>
                      <div
                        style={{
                          position: 'relative',
                          width: '100%',
                          height: '100%',
                        }}
                      >
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

                          {game.tilePoints.map(({ q, r, robber, hash }) =>
                            isMovingRobber ? (
                              <Robber
                                key={hash}
                                q={q}
                                r={r}
                                isMoveable={!robber}
                                onMove={() => {
                                  gameStateManager.moveRobber(hash)
                                  this.setState({ isMovingRobber: false })
                                }}
                              />
                            ) : robber ? (
                              <Robber q={q} r={r} key={hash} />
                            ) : null
                          )}

                          {game.vertices.map(({ vertex, hash, building }) => {
                            if (!building && !isBuildingSettlement) return null
                            if (building) {
                              return (
                                <Building
                                  type={building.type}
                                  vertex={vertex}
                                  key={hash}
                                  color={building.color}
                                  onRemove={() =>
                                    gameStateManager.removeBuilding(hash)
                                  }
                                  isUpgradeable={
                                    player === building.color &&
                                    isUpgradingToCity
                                  }
                                  onUpgrade={() => {
                                    gameStateManager.upgradeToCity(hash)
                                    this.setState({ isUpgradingToCity: false })
                                  }}
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
                                  onRemove={() =>
                                    gameStateManager.removeRoad(hash)
                                  }
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
                            <Port
                              side={side}
                              goods={goods}
                              ratio={ratio}
                              key={hash}
                            />
                          ))}
                        </Board>
                        <Dice
                          roll1={game.roll.one}
                          roll2={game.roll.two}
                          id={game.roll.id}
                          onRoll={() => gameStateManager.roll()}
                        />
                      </div>
                    </TabBody>
                  )}
                  {activeTab === 1 && <TabBody>Opponents</TabBody>}
                </>
              }
              actionSlot={
                <GameActions
                  chosenColor={player}
                  onSetPlayer={({ color, name }) => {
                    gameStateManager.setPlayer({ color, name })
                    this.setState({ player: color })
                  }}
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
                  isMovingRobber={isMovingRobber}
                  onMoveRobber={() =>
                    this.setState(({ isMovingRobber }) => ({
                      isMovingRobber: !isMovingRobber,
                    }))
                  }
                  hasLongestRoad={hasLongestRoad}
                  hasLargestArmy={hasLargestArmy}
                  onClaimLongestRoad={() => gameStateManager.setLongestRoad()}
                  onClaimLargestArmy={() => gameStateManager.setLargestArmy()}
                />
              }
              itemSlot={
                <GameResources
                  player={player}
                  goods={myResources}
                  onChangeGood={gameStateManager.changeGood}
                />
              }
            />
          )}
        </main>
      </div>
    )
  }
}
