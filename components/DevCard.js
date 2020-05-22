import PropTypes from 'prop-types'
import styles from './DevCard.module.css'
import cx from 'classnames'

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

const DevCard = ({ type, subType }) => (
  <div className={cx(styles.card, styles[type])}>
    <div className={styles.type}>{titles[type](subType)}</div>
    <div className={styles.description}>{descriptions[type](subType)}</div>
  </div>
)

DevCard.propTypes = {
  type: PropTypes.oneOf(['knight', 'progress', 'victoryPoint']).isRequired,
  subType: PropTypes.oneOf(['monopoly', 'year of plenty', 'road building']),
}

DevCard.defaultProps = {
  subType: null,
}

export default DevCard