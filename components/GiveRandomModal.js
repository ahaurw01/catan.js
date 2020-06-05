import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import Draggable from 'react-draggable'
import PlayerSwatch from './PlayerSwatch'
import {
  Window,
  WindowContent,
  WindowHeader,
  Button,
  Fieldset,
  Radio,
} from 'react95'
import styles from './PlayerModal.module.css'
import WindowButtons, { CloseButton } from './WindowButtons'

const GiveRandomModal = ({ players, isOpen, onRequestClose, onGiveRandom }) => {
  const [targetColor, setTargetColor] = useState(null)
  // Reset when opened.
  useEffect(() => setTargetColor(null), [isOpen])

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
            <span>Give Random Good</span>
            <WindowButtons>
              <CloseButton onClick={onRequestClose} />
            </WindowButtons>
          </WindowHeader>
          <WindowContent>
            <form
              className={styles.fieldsets}
              onSubmit={(e) => {
                e.preventDefault()
                if (targetColor) {
                  onGiveRandom(targetColor)
                }
              }}
            >
              <Fieldset label="Player">
                <div className={styles.radios}>
                  {Object.entries(players).map(([color, name]) => (
                    <Radio
                      key={color}
                      name="colors"
                      checked={targetColor === color}
                      value={color}
                      label={
                        <span className={styles.playerOption}>
                          <PlayerSwatch color={color} size={25} />{' '}
                          <span className={styles.spaceLeft}>{name}</span>
                        </span>
                      }
                      onChange={() => setTargetColor(color)}
                    />
                  ))}
                </div>
              </Fieldset>
              <div className={styles.buttons}>
                <Button type="submit" disabled={!targetColor}>
                  Get Robbed
                </Button>
                <Button onClick={onRequestClose}>Cancel</Button>
              </div>
            </form>
          </WindowContent>
        </Window>
      </Draggable>
    </ReactModal>
  )
}

GiveRandomModal.propTypes = {
  players: PropTypes.shape({
    red: PropTypes.string,
    blue: PropTypes.string,
    white: PropTypes.string,
    green: PropTypes.string,
    orange: PropTypes.string,
  }),
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onGiveRandom: PropTypes.func.isRequired,
}

export default GiveRandomModal
