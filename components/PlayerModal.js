import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import Draggable from 'react-draggable'
import {
  Window,
  WindowContent,
  WindowHeader,
  Button,
  TextField,
  Fieldset,
  Radio,
} from 'react95'
import styles from './PlayerModal.module.css'
import cx from 'classnames'
import PlayerSwatch from './PlayerSwatch'

const PlayerModal = ({
  players,
  chosenColor,
  isOpen,
  onRequestClose,
  onSetPlayer,
}) => {
  const [newColor, setNewColor] = useState(chosenColor)
  const [screenName, setScreenName] = useState(
    chosenColor && players[chosenColor] ? players[chosenColor] : ''
  )
  useEffect(() => {
    setNewColor(chosenColor)
  }, [isOpen])

  useEffect(() => {
    setScreenName(players[newColor] || '')
  }, [players, newColor])

  const playerTemplate = ({ label, value }) => (
    <span className={styles.playerOption}>
      <PlayerSwatch size={25} color={value} />
      <span className={styles.spaceLeft}>
        {label}
        {players[value] && ` (${players[value]})`}
      </span>
    </span>
  )

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          zIndex: 2,
        },
        content: { border: 'none', background: 'none' },
      }}
    >
      <Draggable handle={`.${styles.windowHeader}`}>
        <Window>
          <WindowHeader className={styles.windowHeader}>
            <span>Choose Player</span>
            <Button
              className={styles.close}
              size="sm"
              square
              onClick={onRequestClose}
            >
              <span className={styles.x}>x</span>
            </Button>
          </WindowHeader>
          <WindowContent>
            <form
              className={styles.fieldsets}
              onSubmit={(e) => {
                e.preventDefault()
                if (newColor && screenName.trim()) {
                  onSetPlayer({
                    color: newColor,
                    name: screenName.trim(),
                  })
                }
              }}
            >
              <Fieldset label="Color">
                <div className={styles.radios}>
                  {['red', 'blue', 'white', 'orange', 'green'].map((color) => (
                    <Radio
                      key={color}
                      name="colors"
                      checked={newColor === color}
                      value={color}
                      label={playerTemplate({ label: color, value: color })}
                      onChange={() => setNewColor(color)}
                    />
                  ))}
                </div>
              </Fieldset>
              <div className={styles.rightFields}>
                <Fieldset label="Screen Name" disabled={!newColor}>
                  <TextField
                    value={screenName}
                    onChange={({ target: { value } }) => setScreenName(value)}
                    disabled={!newColor}
                  />
                </Fieldset>
                <div className={styles.buttons}>
                  <Button
                    type="submit"
                    disabled={!newColor || !screenName.trim()}
                  >
                    OK
                  </Button>
                  <Button onClick={onRequestClose}>Cancel</Button>
                </div>
              </div>
            </form>
          </WindowContent>
        </Window>
      </Draggable>
    </ReactModal>
  )
}

PlayerModal.propTypes = {
  players: PropTypes.shape({
    red: PropTypes.string,
    blue: PropTypes.string,
    green: PropTypes.string,
    white: PropTypes.string,
    orange: PropTypes.string,
  }),
  chosenColor: PropTypes.oneOf(['red', 'blue', 'green', 'white', 'orange']),
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
}

export default PlayerModal
