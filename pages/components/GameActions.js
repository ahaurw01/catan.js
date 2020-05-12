import { useState } from 'react'
import { Dropdown } from 'primereact/dropdown'
import cx from 'classnames'
import styles from './GameActions.module.css'

const GameActions = () => {
  const [player, setPlayer] = useState(null)

  const playerTemplate = ({ label, value }) => (
    <span className={styles.playerOption}>
      {value && (
        <span
          className={cx(styles.color, styles.spaceRight)}
          style={{ background: value }}
        />
      )}{' '}
      {label}
    </span>
  )

  return (
    <div className={styles.panel}>
      <h2>Player select</h2>
      <div className={styles.selectedPlayer}>
        {player && (
          <span
            className={cx(styles.color, styles.spaceRight)}
            style={{ background: player }}
          />
        )}
        <Dropdown
          className={styles.dropdown}
          value={player}
          options={[
            { label: 'Spectator', value: null },
            { label: 'Red', value: 'red' },
            { label: 'Blue', value: 'blue' },
            { label: 'White', value: 'white' },
            { label: 'Orange', value: 'orange' },
            { label: 'Green', value: 'green' },
          ]}
          onChange={({ value }) => setPlayer(value)}
          itemTemplate={playerTemplate}
        />
      </div>
    </div>
  )
}

export default GameActions
