import { useState } from 'react'
import cx from 'classnames'
import styles from './GameActions.module.css'
import { Fieldset, Select, TextField, Window, WindowContent } from 'react95'

const GameActions = () => {
  const [player, setPlayer] = useState('spectator')
  const [screenName, setScreenName] = useState('')

  const playerTemplate = ({ label, value }) => (
    <span className={styles.playerOption}>
      {value !== 'spectator' && (
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
            onChange={(value) => setPlayer(value)}
            width={140}
          />
        </Fieldset>

        {player !== 'spectator' && (
          <Fieldset label="Screen Name">
            <TextField
              value={screenName}
              onChange={(e) => setScreenName(e.target.value)}
              width={140}
            />
          </Fieldset>
        )}
      </WindowContent>
    </Window>
  )
}

export default GameActions
