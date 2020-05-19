import { useState } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import styles from './GameActions.module.css'
import { Button, Fieldset } from 'react95'
import { omit } from 'lodash'
import PlayerModal from './PlayerModal'

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
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

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
            <span
              className={cx(styles.color, styles.spaceRight)}
              style={{ background: color }}
            />{' '}
            {name}
          </div>
        ))}
        {/* {chosenColor && (
            <div className={styles.chosenColor}>
              <span
                className={cx(styles.color, styles.spaceRight)}
                style={{ background: chosenColor }}
              />{' '}
              {players[chosenColor]}
            </div>
          )} */}
        <Button onClick={() => setIsModalOpen(true)}>
          {chosenColor ? 'Change Player' : 'Choose Player'}
        </Button>
      </Fieldset>

      {chosenColor && (
        <Fieldset label="Build">
          <div className={styles.buttons}>
            <Button
              active={isBuildingRoad}
              onClick={onBuildRoad}
              disabled={allBoolsBut('isBuildingRoad')}
            >
              Build Road
            </Button>

            <Button
              active={isBuildingSettlement}
              onClick={onBuildSettlement}
              disabled={allBoolsBut('isBuildingSettlement')}
            >
              Build Settlement
            </Button>

            {canUpgradeToCity && (
              <Button
                active={isUpgradingToCity}
                onClick={onUpgradeToCity}
                disabled={allBoolsBut('isUpgradingToCity')}
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
}

GameActions.defaultProps = {
  chosenColor: null,
}

export default GameActions
