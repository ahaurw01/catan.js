import PropTypes from 'prop-types'
import styles from './DevCard.module.css'
import cx from 'classnames'
import { Button } from 'react95'

const titles = {
  knight: () => 'Knight',
  victoryPoint: () => '1 VP',
  progress: (subType) => {
    switch (subType) {
      case 'monopoly':
        return 'Monopoly'
      case 'year of plenty':
        return 'Year of Plenty'
      case 'road building':
        return 'Road Building'
      default:
        return ''
    }
  },
}

const descriptions = {
  knight: () => 'Move the robber. Steal a resource.',
  victoryPoint: () => 'Play on your turn if it wins you the game.',
  progress: (subType) => {
    switch (subType) {
      case 'monopoly':
        return 'Take one type of resource from all players.'
      case 'year of plenty':
        return 'Take two resources of any type.'
      case 'road building':
        return 'Build two roads.'
      default:
        return ''
    }
  },
}

const DevCard = ({ type, subType, onPlay, played, small, onUndo }) => (
  <div
    className={cx(styles.card, styles[type], { [styles.small]: small })}
    onContextMenu={(e) => {
      e.preventDefault()
      onUndo()
    }}
  >
    <div className={styles.type}>{titles[type](subType)}</div>
    <div className={styles.description}>{descriptions[type](subType)}</div>
    {!played && onPlay && (
      <Button className={styles.play} onClick={onPlay}>
        Play
      </Button>
    )}
    {played && <div className={styles.stamp}>Played</div>}
  </div>
)

DevCard.propTypes = {
  type: PropTypes.oneOf(['knight', 'progress', 'victoryPoint']).isRequired,
  subType: PropTypes.oneOf(['monopoly', 'year of plenty', 'road building']),
  onPlay: PropTypes.func,
  onUndo: PropTypes.func,
  played: PropTypes.bool,
  small: PropTypes.bool,
}

DevCard.defaultProps = {
  subType: null,
  onPlay: null,
  onUndo: () => {},
  played: false,
  small: false,
}

export default DevCard

const scores = {
  victoryPoint: 3,
  knight: 2,
  progress: 1,
}

export function compare(devCard1, devCard2) {
  return scores[devCard2.type] - scores[devCard1.type]
}
