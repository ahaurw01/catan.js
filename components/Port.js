import PropTypes from 'prop-types'
import {
  radius,
  sidePropType,
  axialSideToPortCartesian,
  anglePerpendicularToSide,
} from './utils'
import styles from './Port.module.css'

const Port = ({ side, ratio, goods }) => {
  const { x, y } = axialSideToPortCartesian(side)
  const width = radius / 2
  return (
    <g
      transform={`translate(${x}, ${y}) rotate(${anglePerpendicularToSide(
        side
      )})`}
    >
      <rect
        x={-width / 2}
        y={-width / 2}
        width={width}
        height={width}
        stroke="black"
        fill="white"
      />
      <text textAnchor="middle" y="0" className={styles.ratio}>
        {ratio}:1
      </text>
      <text textAnchor="middle" y="15" className={styles.goods}>
        {goods}
      </text>
    </g>
  )
}

Port.propTypes = {
  side: sidePropType,
  goods: PropTypes.oneOf(['lumber', 'grain', 'brick', 'ore', 'wool', 'any'])
    .isRequired,
  ratio: PropTypes.number.isRequired,
}

export default Port
