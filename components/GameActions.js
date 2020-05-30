import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styles from './GameActions.module.css'
import { Button, Fieldset } from 'react95'
import { omit } from 'lodash'
import PlayerModal from './PlayerModal'
import PlayerSwatch from './PlayerSwatch'

const GameActions = ({
  chosenColor,
  onSetPlayer,
  players,
  isBuildingRoad,
  onBuildRoad,
  isBuildingSettlement,
  onBuildSettlement,
  canUpgradeToCity,
  isUpgradingToCity,
  onUpgradeToCity,
  isMovingRobber,
  onMoveRobber,
  hasLongestRoad,
  onClaimLongestRoad,
  hasLargestArmy,
  onClaimLargestArmy,
  canBuildMoreRoads,
  canBuildMoreSettlements,
  canUpgradeMoreCities,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [justClickedLongestRoad, setJustClickedLongestRoad] = useState(false)
  const [justClickedLargestArmy, setJustClickedLargestArmy] = useState(false)

  useEffect(() => {
    if (justClickedLongestRoad)
      setTimeout(() => setJustClickedLongestRoad(false), 1000)
  }, [justClickedLongestRoad])

  useEffect(() => {
    if (justClickedLargestArmy)
      setTimeout(() => setJustClickedLargestArmy(false), 1000)
  }, [justClickedLargestArmy])

  const allBoolsBut = (ignore) => {
    return Object.values(
      omit(
        {
          isBuildingRoad,
          isBuildingSettlement,
          isUpgradingToCity,
          isMovingRobber,
        },
        ignore
      )
    ).reduce((result, bool) => result || bool, false)
  }

  return (
    <div className={styles.wrapper}>
      <Fieldset label="Players">
        <PlayerModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          players={players}
          chosenColor={chosenColor}
          onSetPlayer={(details) => {
            onSetPlayer(details)
            setIsModalOpen(false)
          }}
        />
        {/* Players */}
        {Object.entries(players).map(([color, name]) => (
          <div key={color} className={styles.chosenColor}>
            <PlayerSwatch size={30} color={color} />
            &nbsp;&nbsp;{name}
          </div>
        ))}

        <Button onClick={() => setIsModalOpen(true)}>
          {chosenColor ? 'Change Player' : 'Choose Player'}
        </Button>
      </Fieldset>

      {chosenColor && (
        <>
          <Fieldset label="Build">
            <div className={styles.buttons}>
              <Button
                active={isBuildingRoad}
                onClick={onBuildRoad}
                disabled={allBoolsBut('isBuildingRoad') || !canBuildMoreRoads}
              >
                Build Road
              </Button>

              <Button
                active={isBuildingSettlement}
                onClick={onBuildSettlement}
                disabled={
                  allBoolsBut('isBuildingSettlement') ||
                  !canBuildMoreSettlements
                }
              >
                Build Settlement
              </Button>

              {canUpgradeToCity && (
                <Button
                  active={isUpgradingToCity}
                  onClick={onUpgradeToCity}
                  disabled={
                    allBoolsBut('isUpgradingToCity') || !canUpgradeMoreCities
                  }
                >
                  Upgrade to City
                </Button>
              )}

              <Button
                active={isMovingRobber}
                onClick={onMoveRobber}
                disabled={allBoolsBut('isMovingRobber')}
              >
                Move Robber
              </Button>
            </div>
          </Fieldset>

          <Fieldset label="Accomplishments">
            <div className={styles.buttons}>
              <Button
                active={hasLongestRoad || justClickedLongestRoad}
                onClick={() => {
                  if (!hasLongestRoad) setJustClickedLongestRoad(true)
                  onClaimLongestRoad()
                }}
              >
                Claim Longest Road
              </Button>
              <Button
                active={hasLargestArmy || justClickedLargestArmy}
                onClick={() => {
                  if (!hasLargestArmy) setJustClickedLargestArmy(true)
                  onClaimLargestArmy()
                }}
              >
                Claim Largest Army
              </Button>
            </div>
          </Fieldset>
        </>
      )}
    </div>
  )
}

GameActions.propTypes = {
  chosenColor: PropTypes.string,
  onSetPlayer: PropTypes.func.isRequired,
  players: PropTypes.shape().isRequired,
  isBuildingRoad: PropTypes.bool.isRequired,
  onBuildRoad: PropTypes.func.isRequired,
  isBuildingSettlement: PropTypes.bool.isRequired,
  onBuildSettlement: PropTypes.func.isRequired,
  canUpgradeToCity: PropTypes.bool.isRequired,
  isUpgradingToCity: PropTypes.bool.isRequired,
  onUpgradeToCity: PropTypes.func.isRequired,
  isMovingRobber: PropTypes.bool.isRequired,
  onMoveRobber: PropTypes.func.isRequired,
  hasLongestRoad: PropTypes.bool.isRequired,
  onClaimLongestRoad: PropTypes.func.isRequired,
  hasLargestArmy: PropTypes.bool.isRequired,
  onClaimLargestArmy: PropTypes.func.isRequired,
  canBuildMoreRoads: PropTypes.bool.isRequired,
  canBuildMoreSettlements: PropTypes.bool.isRequired,
  canUpgradeMoreCities: PropTypes.bool.isRequired,
}

GameActions.defaultProps = {
  chosenColor: null,
}

export default GameActions
