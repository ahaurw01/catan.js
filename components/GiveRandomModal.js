import { useState } from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import Draggable from 'react-draggable'
import {
  Window,
  WindowContent,
  WindowHeader,
  Button,
  Fieldset,
  Radio,
} from 'react95'
import styles from './PlayerModal.module.css'
import cx from 'classnames'

const GiveRandomModal = ({ players, isOpen, onRequestClose, onGiveRandom }) => {
  const [targetColor, setTargetColor] = useState(null)
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
                      label={name}
                      onChange={() => setTargetColor(color)}
                    />
                  ))}
                </div>
              </Fieldset>
              <div className={styles.buttons}>
                <Button type="submit" disabled={!targetColor}>
                  OK
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
