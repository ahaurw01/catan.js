import PropTypes from 'prop-types'
import styles from './Good.module.css'
import Brick from './icons/Brick'
import Grain from './icons/Grain'
import Lumber from './icons/Lumber'
import Ore from './icons/Ore'
import Wool from './icons/Wool'
import { Button } from 'react95'

const icons = {
  brick: Brick,
  grain: Grain,
  lumber: Lumber,
  ore: Ore,
  wool: Wool,
}

const Good = ({ type, count, moreInBank, onChange }) => {
  const Icon = icons[type]
  return (
    <div className={styles.good}>
      <Button
        className={styles.button}
        square
        disabled={!moreInBank}
        onClick={() => onChange(1)}
      >
        +
      </Button>
      <div className={styles.icon}>
        <Icon width={35} height={35} />
      </div>
      <span className={styles.name}>
        {count} {type}
      </span>
      <Button
        className={styles.button}
        square
        disabled={count === 0}
        onClick={() => onChange(-1)}
      >
        -
      </Button>
    </div>
  )
}

Good.propTypes = {
  type: PropTypes.oneOf(['lumber', 'grain', 'brick', 'ore', 'wool']).isRequired,
  count: PropTypes.number,
  moreInBank: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
}

Good.defaultProps = {
  count: 0,
  moreInBank: false,
}

export default Good
