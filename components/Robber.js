import PropTypes from 'prop-types'
import { radius, axialToCartesian } from './utils'
import RobberIcon from './icons/Robber'
import styles from './Robber.module.css'
import cx from 'classnames'

const Robber = ({ q, r, isMoveable, onMove }) => {
  const { x, y } = axialToCartesian({ q, r })

  const width = radius * 1.5

  return (
    <g transform={`translate(${x}, ${y})`}>
      <g
        transform={`translate(${-width / 2}, ${-width / 1.75})`}
        onClick={onMove}
        className={cx({ [styles.moveable]: isMoveable })}
      >
        <RobberIcon width={width} height={width} />
      </g>
    </g>
  )
}
Robber.propTypes = {
  q: PropTypes.number.isRequired,
  r: PropTypes.number.isRequired,
  isMoveable: PropTypes.bool,
  onMove: PropTypes.func,
}

Robber.defaultProps = {
  isMoveable: false,
  onMove: () => {},
}

export default Robber
