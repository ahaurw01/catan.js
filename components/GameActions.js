import { useState } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import styles from './GameActions.module.css'
import {
  Button,
  Fieldset,
  Select,
  TextField,
  Window,
  WindowContent,
} from 'react95'

const GameActions = ({
  onSetName,
  onSetPlayer,
  players,
  isBuildingRoad,
  onBuildRoad,
  isBuildingSettlement,
  onBuildSettlement,
}) => {
  const [player, setPlayer] = useState('spectator')
  const [screenName, setScreenName] = useState('')

  const playerTemplate = ({ label, value }) => (
    <span className={styles.playerOption}>
      {value === 'spectator' ? (
        <span className={styles.spaceRight}>👀</span>
      ) : (
        <span
          className={cx(styles.color, styles.spaceRight)}
          style={{ background: value }}
        />
      )}
      <span>{label}</span>
    </span>
  )

  return (
    <Window shadow={false}>
      <WindowContent>
        <Fieldset label="Player Select">
          <Select
            items={[
              { label: 'Spectator', value: 'spectator' },
              { label: 'Red', value: 'red' },
              { label: 'Blue', value: 'blue' },
              { label: 'White', value: 'white' },
              { label: 'Orange', value: 'orange' },
              { label: 'Green', value: 'green' },
            ].map((i) => ({ label: playerTemplate(i), value: i.value }))}
            onChange={(value) => {
              setPlayer(value)
              onSetPlayer(value)
              setScreenName('')
            }}
            width={150}
          />
        </Fieldset>

        {player !== 'spectator' && (
          <Fieldset label="Screen Name">
            <TextField
              value={screenName || players[player] || ''}
              onChange={(e) => {
                const { value } = e.target
                setScreenName(e.target.value)
                onSetName({ color: player, name: value })
              }}
              width={150}
            />
          </Fieldset>
        )}

        {player !== 'spectator' && (
          <Fieldset label="Build">
            <div className={styles.buttons}>
              <Button
                active={isBuildingRoad}
                onClick={onBuildRoad}
                disabled={isBuildingSettlement}
              >
                Build Road
              </Button>

              <Button
                active={isBuildingSettlement}
                onClick={onBuildSettlement}
                disabled={isBuildingRoad}
              >
                Build Settlement
              </Button>
            </div>
          </Fieldset>
        )}
      </WindowContent>
    </Window>
  )
}

GameActions.propTypes = {
  onSetName: PropTypes.func.isRequired,
  onSetPlayer: PropTypes.func.isRequired,
  players: PropTypes.shape().isRequired,
  isBuildingRoad: PropTypes.bool.isRequired,
  onBuildRoad: PropTypes.func.isRequired,
  isBuildingSettlement: PropTypes.bool.isRequired,
  onBuildSettlement: PropTypes.func.isRequired,
}

export default GameActions
