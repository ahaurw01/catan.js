import Head from 'next/head'
import { useRouter } from 'next/router'
import Board from '../../components/Board'
import Tile from '../../components/Tile'
import Building from '../../components/Building'
import Road from '../../components/Road'
import Port from '../../components/Port'
import Robber from '../../components/Robber'
import Layout from '../../components/Layout'
import GameActions from '../../components/GameActions'
import GameResources from '../../components/GameResources'
import { useState, useEffect } from 'react'
import GameStateManager from '../../components/GameStateManager'
import Dice from '../../components/Dice'
import { Tabs, Tab, TabBody } from 'react95/dist/prod'
import PlayersStuff from '../../components/PlayersStuff'
import Help from '../../components/Help'
import SvgDefs from '../../components/SvgDefs'

export default function Game() {
  const [gameStateManager, setGameStateManager] = useState(null)
  const [game, setGame] = useState(null)
  const [player, setPlayer] = useState(null)
  const [hasSettlement, setHasSettlement] = useState(false)
  const [isBuildingRoad, setIsBuildingRoad] = useState(false)
  const [isBuildingSettlement, setIsBuildingSettlement] = useState(false)
  const [isUpgradingToCity, setIsUpgradingToCity] = useState(false)
  const [isMovingRobber, setIsMovingRobber] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [canBuildMoreRoads, setCanBuildMoreRoads] = useState(false)
  const [canBuildMoreSettlements, setCanBuildMoreSettlements] = useState(false)
  const [canUpgradeMoreCities, setCanUpgradeMoreCities] = useState(false)
  const [hasLongestRoad, setHasLongestRoad] = useState(false)
  const [hasLargestArmy, setHasLargestArmy] = useState(false)
  const [myResources, setMyResources] = useState(null)
  const [myDevCardsInHand, setMyDevCardsInHand] = useState(null)
  const [myDevCardsPlayed, setMyDevCardsPlayed] = useState(null)

  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (!id) return
    const gameStateManager = new GameStateManager()

    gameStateManager.onUpdateGame(
      ({
        game,
        player,
        hasSettlement,
        myResources,
        hasLongestRoad,
        hasLargestArmy,
        canBuildMoreRoads,
        canBuildMoreSettlements,
        canUpgradeMoreCities,
        myDevCardsInHand,
        myDevCardsPlayed,
      }) => {
        setPlayer(player)
        setHasSettlement(hasSettlement)
        setMyResources(myResources)
        setHasLongestRoad(hasLongestRoad)
        setHasLargestArmy(hasLargestArmy)
        setCanBuildMoreRoads(canBuildMoreRoads)
        setCanBuildMoreSettlements(canBuildMoreSettlements)
        setCanUpgradeMoreCities(canUpgradeMoreCities)
        setMyDevCardsInHand(myDevCardsInHand)
        setMyDevCardsPlayed(myDevCardsPlayed)
        setGame(game)
      }
    )
    gameStateManager.joinGame(id)
    setGameStateManager(gameStateManager)

    return () => {
      gameStateManager.close()
    }
  }, [id])

  return (
    <div className="container">
      <Head>
        <title>Settlers.exe</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SvgDefs />
      <main style={{ maxWidth: '1280px', margin: 'auto' }}>
        {gameStateManager && game && (
          <Layout
            boardSlot={
              <>
                <Tabs
                  value={activeTab}
                  onChange={(value) => setActiveTab(value)}
                >
                  <Tab value={0}>Board</Tab>
                  <Tab value={1}>Players</Tab>
                  <Tab value={2}>Help</Tab>
                </Tabs>
                {activeTab === 0 && (
                  <TabBody>
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        bottom: '12px',
                        left: '12px',
                      }}
                    >
                      <Board>
                        {game.ports.map(({ side, hash, goods, ratio }) => (
                          <Port
                            side={side}
                            goods={goods}
                            ratio={ratio}
                            key={hash}
                          />
                        ))}
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
                                setIsMovingRobber(false)
                              }}
                            />
                          ) : robber ? (
                            <Robber q={q} r={r} key={hash} />
                          ) : null
                        )}

                        {game.sides.map(({ side, hash, road }) => {
                          if (!road && !isBuildingRoad) return null
                          if (road) {
                            return (
                              <Road
                                side={side}
                                key={hash}
                                color={road.color}
                                onRemove={() => {
                                  if (road.color === player)
                                    gameStateManager.removeRoad(hash)
                                }}
                              />
                            )
                          }
                          return (
                            <Road
                              isBuildable
                              onBuild={() => {
                                gameStateManager.buildRoad(hash)
                                setIsBuildingRoad(false)
                              }}
                              side={side}
                              key={hash}
                            />
                          )
                        })}

                        {game.vertices.map(({ vertex, hash, building }) => {
                          if (!building && !isBuildingSettlement) return null
                          if (building) {
                            return (
                              <Building
                                type={building.type}
                                vertex={vertex}
                                key={hash}
                                color={building.color}
                                onRemove={() => {
                                  if (building.color === player)
                                    gameStateManager.removeBuilding(hash)
                                }}
                                isUpgradeable={
                                  player === building.color && isUpgradingToCity
                                }
                                onUpgrade={() => {
                                  gameStateManager.upgradeToCity(hash)
                                  setIsUpgradingToCity(false)
                                }}
                              />
                            )
                          }
                          return (
                            <Building
                              isBuildable
                              onBuild={() => {
                                gameStateManager.buildSettlement(hash)
                                setIsBuildingSettlement(false)
                              }}
                              vertex={vertex}
                              key={hash}
                              type="settlement"
                            />
                          )
                        })}
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
                {activeTab === 1 && (
                  <TabBody>
                    <PlayersStuff
                      players={game.players}
                      counts={game.counts}
                      resources={game.resources}
                      longestRoad={game.longestRoad}
                      largestArmy={game.largestArmy}
                    />
                  </TabBody>
                )}
                {activeTab === 2 && (
                  <TabBody>
                    <Help />
                  </TabBody>
                )}
              </>
            }
            actionSlot={
              <GameActions
                chosenColor={player}
                onSetPlayer={({ color, name }) => {
                  gameStateManager.setPlayer({ color, name })
                  setPlayer(color)
                }}
                players={game.players}
                onBuildRoad={() => {
                  setIsBuildingRoad(!isBuildingRoad)
                }}
                isBuildingRoad={isBuildingRoad}
                onBuildSettlement={() => {
                  setIsBuildingSettlement(!isBuildingSettlement)
                }}
                isBuildingSettlement={isBuildingSettlement}
                canUpgradeToCity={hasSettlement}
                isUpgradingToCity={isUpgradingToCity}
                onUpgradeToCity={() => {
                  setIsUpgradingToCity(!isUpgradingToCity)
                }}
                isMovingRobber={isMovingRobber}
                onMoveRobber={() => setIsMovingRobber(!isMovingRobber)}
                hasLongestRoad={hasLongestRoad}
                hasLargestArmy={hasLargestArmy}
                onClaimLongestRoad={() => gameStateManager.setLongestRoad()}
                onClaimLargestArmy={() => gameStateManager.setLargestArmy()}
                canBuildMoreRoads={canBuildMoreRoads}
                canBuildMoreSettlements={canBuildMoreSettlements}
                canUpgradeMoreCities={canUpgradeMoreCities}
              />
            }
            itemSlot={
              <GameResources
                player={player}
                players={game.players}
                goods={myResources}
                bankGoods={game.bank.resources}
                onChangeGood={gameStateManager.changeGood}
                devCardsInHand={myDevCardsInHand}
                devCardsPlayed={myDevCardsPlayed}
                onTakeDevCard={gameStateManager.takeDevCard}
                onPlayDevCard={gameStateManager.playDevCard}
                onUndoPlayDevCard={gameStateManager.undoPlayDevCard}
                bankDevCards={game.bank.devCards}
                onGiveRandom={(color) => gameStateManager.giveRandom(color)}
              />
            }
          />
        )}
      </main>
    </div>
  )
}
